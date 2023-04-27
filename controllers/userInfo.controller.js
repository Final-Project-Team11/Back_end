
const { userInfo } = require("os");
const UserInfoService = require("../services/userInfo.service")
class UserInfoController {
    constructor() {
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

    updateProfile = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const { birthDay, phoneNum } = req.body; //joi 
            let fileLocation;
            if (req.file) {
                fileLocation = req.file.transforms[0].location
                //users 테이블에 올라가있는 파일이 있으면 지우기
                // await this.UserInfoService.getUserProfile({ userId })
            }
            //프로필 정보 업데이트
            await this.UserInfoService.updateProfile({ userId, birthDay, phoneNum, fileLocation })

            res.status(200).json({ message: "프로필 정보가 수정되었습니다." })
        } catch (err) {
            next(err)
        }
    }

    getProfile = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const userInfo = await this.UserInfoService.getProfile({ userId })
            res.status(200).json(userInfo)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserInfoController;