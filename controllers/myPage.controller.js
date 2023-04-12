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
        //meeting reports
        const meetingReport = await this.MypageService.getMentionedMeetingReports({userId})
        //others
        const other = await this.MypageService.getMentionedOther({ userId });
        //하나로 합쳐서 필터링하기
        const issue = await this.MypageService.filterIssue({
            schedule,
            meeting,
            report,
            meetingReport,
            other,
        });

        res.status(200).json({ issue });
    };

    completeMentioned = async (req, res, next) => {
        const { mentionId } = req.params;
        const { userId } = res.locals.user;
        //멘션에 대한 권한체크
        const existMention = await this.MypageService.checkMention({mentionId,userId})
        //check 값 바꾸기
        await this.MypageService.completeMentioned({existMention,mentionId})
        res.status(200).json({message : "멘션된 해당 일정을 확인하였습니다."});
    };

    getFiles = async (req,res,next) => {
        const {userId} = res.locals.user;
        const myfile = await this.MypageService.getMyfile({userId})
        res.status(200).json({issue})
    }
}

module.exports = MypageController;
