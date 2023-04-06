const UserManageService = require("../services/userManage.service");

class UserManageController {
    constructor() {
        this.userManageService = new UserManageService();
    }
    // 회사 유저 전체 리스트
    usersList = async (req, res, next) => {
        try {
            const userInfo = res.locals.user;
            const companyId = userInfo.companyId;
            const usersList = await this.userManageService.companyUserList({
                companyId,
            });

            res.status(200).json({ users: usersList });
        } catch (err) {
            next(err);
        }
    };

    // 유저 검색
    searchUser = async (req, res, next) => {
        try {
            const { userName } = req.params;
            const userInfo = res.locals.user;
            const users = await this.userManageService.searchUser({
                userName,
                userInfo,
            });
            res.status(200).json({ users: users });
        } catch (err) {
            next(err);
        }
    };
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
