const UserManageRepository = require("../repositories/userManage.repository");
const CustomError = require("../middlewares/errorHandler");

class UserManageService {
    constructor() {
        this.userManageRepository = new UserManageRepository();
    }
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
        if (team | authLevel | rank | userName | userId | joinDay | job) {
        }
        // 아이디 중복체크
        const companyId = userInfo.companyId;
        const existUser = await this.userManageRepository.duplicateCheck(
            userId
        );
        console.log("유저 존재 유무", existUser);
        if (existUser) {
            throw new CustomError("중복된 아이디입니다.", 401);
        }

        // 팀 존재 유무 확인
        const existTeam = await this.userManageRepository.findTeamId({
            team,
            companyId,
        });

        const teamId = existTeam
            ? existTeam.teamId
            : await this.userManageRepository.createTeam({
                  team,
                  companyId,
              }).teamId;

        await this.userManageRepository.createUser({
            teamId,
            authLevel,
            rank,
            userName,
            userId,
            joinDay,
            job,
            companyId,
        });
    };
}

module.exports = UserManageService;
