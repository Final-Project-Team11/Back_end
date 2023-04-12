const MypageService = require("../services/myPage.service.js");
const Joi = require("joi");
const CustomError = require("../middlewares/errorHandler");
class MypageController {
    constructor() {
        this.MypageService = new MypageService();
    }

    //조이 적용하기!!
    getUserInfo = async (req, res, next) => {
        const { userId } = res.locals.user;
        try {
            const user = await this.MypageService.checkUserById({ userId });
            const userInfo = await this.MypageService.getUserInfo({ user });
            res.status(200).json({ user: userInfo });
        } catch (err) {
            next(err);
        }
    };

    getSchedules = async (req,res,next) => {
        const { userId } = res.locals.user;
        const schedule = await this.MypageService.getUserSchedule({ userId })
        res.status(200).json({schedule})
    }
}

module.exports = MypageController;
