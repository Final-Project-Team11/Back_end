const bcrypt = require("bcrypt");
const UserManageRepository = require("../repositories/userManage.repository");
const CustomError = require("../middlewares/errorHandler");

class UserManageService {
    constructor() {
        this.userManageRepository = new UserManageRepository();
    }
    // 유저 검색
    searchUser = async ({ userName, userInfo }) => {
        const companyId = userInfo.companyId;

        const users = await this.userManageRepository.findUserByName({
            userName,
            companyId,
        });
        return users;
    };

    // 회사 전체 유저 조회
    companyUserList = async ({ companyId }) => {
        const companyUserList =
            await this.userManageRepository.findAllCompanyUser({ companyId });

        return companyUserList;
    };
    // 유저 생성
    createUser = async ({
        team,
        authLevel,
        rank,
        userName,
        userId,
        joinDay,
        job,
        userInfo,
    }) => {
        if (!team | !authLevel | !rank | !userName | !userId | !job) {
            throw new CustomError("입력 형식을 채워주세요");
        }
        // 아이디 중복체크
        const existUser = await this.userManageRepository.duplicateCheck(
            userId
        );
        console.log("유저 존재 유무", existUser);
        if (existUser) {
            throw new CustomError("중복된 아이디입니다.", 401);
        }

        // 팀 존재 유무 확인
        const companyId = userInfo.companyId;
        const existTeam = await this.userManageRepository.findTeamId({
            team,
            companyId,
        });

        const teamInfo = existTeam
            ? existTeam
            : await this.userManageRepository.createTeam({
                  team,
                  companyId,
              });

        const salt = await bcrypt.genSalt();
        const encryptPwd = await bcrypt.hash(userId, salt);

        await this.userManageRepository.createUser({
            teamId: teamInfo.teamId,
            authLevel,
            rank,
            userName,
            userId,
            joinDay,
            job,
            companyId,
            encryptPwd,
        });
    };
}

module.exports = UserManageService;
