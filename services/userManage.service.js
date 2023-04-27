const bcrypt = require("bcrypt");
const UserManageRepository = require("../repositories/userManage.repository");
const CustomError = require("../middlewares/errorHandler");

class UserManageService {
    constructor() {
        this.userManageRepository = new UserManageRepository();
    }

    // 팀 목록
    findTeamsList = async ({ companyId }) => {
        const teams = await this.userManageRepository.findTeamsByCompanyId({
            companyId,
        });
        return teams;
    };

    // 유저 수정
    updateUser = async ({ userId, team, authLevel, rank, job, companyId }) => {
        console.log(companyId);
        const existUser = await this.userManageRepository.findUserById(userId);
        if (!existUser) {
            throw new CustomError("해당 유저가 존재하지 않습니다.", 401);
        }
        if (!team | !authLevel | !rank) {
            throw new CustomError("입력 형식을 채워주세요", 400);
        }
        const teams = await this.userManageRepository.findTeamsByCompanyId({
            companyId,
            team,
        });
        // teams 가 빈배열일때
        if (!teams.length) {
            throw new CustomError("해당 부서가 존재하지 않습니다", 401);
        }
        if (authLevel !== 1 && authLevel !== 2 && authLevel !== 3) {
            throw new CustomError(
                "존재하지 않는 권한입니다.",
                401
                );
            }
        const teamId = teams[0].teamId

        await this.userManageRepository.updateUser({
            userId,
            teamId,
            authLevel,
            rank,
            job
        });
    };
    // 유저 삭제
    deleteUser = async ({ userId }) => {
        const existUser = await this.userManageRepository.findUserById(userId);
        if (!existUser) {
            throw new CustomError("해당 유저가 존재하지 않습니다", 401);
        }
        await this.userManageRepository.deleteUser(existUser);
    };
    // 유저 검색
    searchUser = async ({ userName, userInfo }) => {
        const companyId = userInfo.companyId;

        const users = await this.userManageRepository.findUserByName({
            userName,
            companyId,
        });
        return users;
    };

    // 회사 전체 유저 조회, 드롭다운 부서별 유저 조회
    // teamId 넘어올시 팀유저 조회
    companyUserList = async ({ companyId, teamId }) => {
        const companyUserList =
            await this.userManageRepository.findAllCompanyUser({ companyId, teamId });

        return companyUserList;
    };
    
    checkUserId = async({ userId }) => {
        const existUser = await this.userManageRepository.findUserById(userId);
        if (existUser) {
            throw new CustomError("중복된 아이디입니다.", 401);
        }

    }
    // 유저 생성
    createUser = async ({
        team,
        authLevel,
        rank,
        userName,
        userId,
        joinDay,
        job,
        salaryDay,
        userInfo,
    }) => {
        // 아이디 중복체크
        const existUser = await this.userManageRepository.findUserById(userId);

        if (existUser) {
            throw new CustomError("중복된 아이디입니다.", 401);
        }
        if (authLevel !== 1 && authLevel !== 2 && authLevel !== 3) {
            throw new CustomError(
                "존재하지 않는 권한입니다.",
                401
                );
        }
        
        // 팀 존재 유무 확인
        const companyId = userInfo.companyId;
        const existTeam = await this.userManageRepository.findTeamId({
            team,
            companyId,
        });
        
        const salt = await bcrypt.genSalt();
        const encryptPwd = await bcrypt.hash(userId, salt);

            // console.log(t)
        const teamInfo = existTeam
        if (!existTeam) {
            await this.userManageRepository.createTeamAndUser({
                team,
                companyId,
                authLevel,
                rank,
                userName,
                userId,
                joinDay,
                job,
                salaryDay,
                encryptPwd,
            });
        } else {
            await this.userManageRepository.createUser({
                teamId: teamInfo.teamId,
                authLevel,
                rank,
                userName,
                userId,
                joinDay,
                job,
                salaryDay,
                companyId,
                encryptPwd,
            });
        }
        
    };
}

module.exports = UserManageService;
