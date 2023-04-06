const UserManageService = require("../services/userManage.service");

class UserManageController {
    constructor() {
        this.userManageService = new UserManageService();
    }
    // 유저 생성
    createUser = async (req, res, next) => {
        try {
            const userInfo = res.locals.user;
            const { team, authLevel, rank, userName, userId, joinDay, job } =
                req.body;
            await this.userManageService.createUser({
                team,
                authLevel,
                rank,
                userName,
                userId,
                joinDay,
                job,
                userInfo,
            });

            res.status(200).json({ message: "유저생성에 성공했습니다." });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = UserManageController;
