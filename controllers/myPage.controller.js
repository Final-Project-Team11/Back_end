const MypageService = require("../services/myPage.service.js");
const Joi = require("joi");
const CustomError = require("../middlewares/errorHandler");
class MypageController {
    constructor() {
        this.MypageService = new MypageService();
    }

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

    getSchedules = async (req, res, next) => {
        const { userId } = res.locals.user;
        const schedule = await this.MypageService.getUserSchedule({ userId });
        res.status(200).json({ schedule });
    };

    getMentionedSchedules = async (req, res, next) => {
        const { userId } = res.locals.user;
        //해당 일정이 없을 때는 빈 객체
        //schedule
        const schedule = await this.MypageService.getMentionedSchedules({
            userId,
        });
        //meeting
        const meeting = await this.MypageService.getMentionedMeeting({
            userId,
        });
        //reports
        const report = await this.MypageService.getMentionedReport({ userId });
        //others
        const other = await this.MypageService.getMentionedOther({ userId });
        //하나로 합쳐서 필터링하기
        const issue = await this.MypageService.filterIssue({
            schedule,
            meeting,
            report,
            other,
        });

        res.status(200).json({ issue });
    };
}

module.exports = MypageController;
