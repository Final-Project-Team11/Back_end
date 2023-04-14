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
        const pageInfo = req.query;
        try {
            const pageNum = parseInt(pageInfo.pageNum);
            const pageSize = parseInt(pageInfo.pageSize);
            if (!pageInfo || !pageSize || !pageNum) {
                throw new CustomError("pagenation 정보를 입력해주세요", 410);
            }
            let start = 0;

            if (pageNum <= 0) {
                pageNum = 1;
            } else {
                start = (pageNum - 1) * pageSize;
            }
            const schedule = await this.MypageService.getUserSchedule({
                userId,
                start,
                pageSize

            });
            res.status(200).json({ schedule });
        } catch (err) {
            next(err);
        }
    };

    getMentionedSchedules = async (req, res, next) => {
        const { userId } = res.locals.user;
        const pageInfo = req.query;
        const page = parseInt(pageInfo.pageNum);
        const pageSize = parseInt(pageInfo.pageSize);
        if (!pageInfo || !pageSize || !page) {
            throw new CustomError("pagenation 정보를 입력해주세요", 410);
        }

        //schedule
        const schedule = await this.MypageService.getMentionedSchedules({
            userId,
        });
        //meeting
        const meeting = await this.MypageService.getMentionedMeeting({
            userId,
        });
        //issue
        const issues = await this.MypageService.getMentionedIssue({
            userId,
        });
        //reports
        const report = await this.MypageService.getMentionedReport({ userId });
        //meeting reports
        const meetingReport =
            await this.MypageService.getMentionedMeetingReports({ userId });
        //others
        const other = await this.MypageService.getMentionedOther({ userId });
        //하나로 합쳐서 필터링하기
        const issue = await this.MypageService.filterIssue({
            schedule,
            meeting,
            issues,
            report,
            meetingReport,
            other,
        });
        const mention = issue.slice(pageSize * (page - 1), pageSize * page);
        res.status(200).json({ mention });
    };

    completeMentioned = async (req, res, next) => {
        const { mentionId } = req.params;
        const { userId } = res.locals.user;
        try {
            //멘션에 대한 권한체크
            const existMention = await this.MypageService.checkMention({
                mentionId,
                userId,
            });
            //check 값 바꾸기
            await this.MypageService.completeMentioned({
                existMention,
                mentionId,
            });
            res.status(200).json({
                message: "멘션된 해당 일정을 확인하였습니다.",
            });
        } catch (err) {
            next(err);
        }
    };

    getMyFiles = async (req, res, next) => {
        const { userId } = res.locals.user;
        const pageInfo = req.query;
        const pageNum = parseInt(pageInfo.pageNum);
        const pageSize = parseInt(pageInfo.pageSize);
        if (!pageInfo || !pageSize) {
            throw new CustomError("pagenation 정보를 입력해주세요", 410)
        }

        try {
            const myfile = await this.MypageService.getMyfile({ userId });
            const myfiles = myfile.slice(pageSize * (pageNum - 1), pageSize * pageNum);
            res.status(200).json({ myfiles });
        } catch (err) {
            next(err);
        }
    };

    getMeetingFiles = async (req, res, next) => {
        const { userId } = res.locals.user;
        const pageInfo = req.query;
        const pageNum = parseInt(pageInfo.pageNum);
        const pageSize = parseInt(pageInfo.pageSize);
        if (!pageInfo || !pageSize) {
            throw new CustomError("pagenation 정보를 입력해주세요", 410)
        }
        try {
            const meeting = await this.MypageService.TeamMeetingReport({
                userId,
            });
            const meetings = meeting.slice(pageSize * (pageNum - 1), pageSize * pageNum);
            res.status(200).json({ meetings });
        } catch (err) {
            next(err);
        }
    };

    getReportFiles = async (req, res, next) => {
        const { userId } = res.locals.user;
        const pageInfo = req.query;
        const pageNum = parseInt(pageInfo.pageNum);
        const pageSize = parseInt(pageInfo.pageSize);
        if (!pageInfo || !pageSize) {
            throw new CustomError("pagenation 정보를 입력해주세요", 410)
        }
        try {
            const report = await this.MypageService.TeamReport({
                userId,
            });
            const reports = report.slice(pageSize * (pageNum - 1), pageSize * pageNum);
            res.status(200).json({ reports });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = MypageController;
