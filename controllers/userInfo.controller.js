
const UserInfoService = require("../services/userInfo.service")
class UserInfoController {
    constructor(){
        this.UserInfoService = new UserInfoService();
    }

    getUserInfo = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const user = await this.UserInfoService.checkUserById({ userId });
            const userInfo = await this.UserInfoService.getUserInfo({ user });
            res.status(200).json({ user: userInfo });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = UserInfoController;