const MypageService = require("../services/myPage.service.js");
const Joi = require("joi");
const CustomError = require("../middlewares/errorHandler");
class MypageController {
    constructor() {
        this.MypageService = new MypageService();
    }

    getUserInfo = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const user = await this.MypageService.checkUserById({ userId });
            const userInfo = await this.MypageService.getUserInfo({ user });
            res.status(200).json({ user: userInfo });
        } catch (err) {
            next(err);
        }
    };

    getSchedules = async (req, res, next) => {
        const pageInfo = req.query;
        try {
            const { userId } = res.locals.user;
            const pageNum = parseInt(pageInfo.pageNum);
            const pageSize = parseInt(pageInfo.pageSize);
            if (!pageInfo || !pageSize || !pageNum) {
                throw new CustomError("pagenation 정보를 입력해주세요", 410);
            }
            const schedule = await this.MypageService.getUserSchedule({
                userId,
            });
            const schedules = schedule.slice(
                pageSize * (pageNum - 1),
                pageSize * pageNum
            );
            res.status(200).json({ schedule: schedules });
        } catch (err) {
            next(err);
        }
    };

    getMentionedSchedules = async (req, res, next) => {
        const pageInfo = req.query;
        try {
            const { userId } = res.locals.user;
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
            const report = await this.MypageService.getMentionedReport({
                userId,
            });
            //meeting reports
            const meetingReport =
                await this.MypageService.getMentionedMeetingReports({ userId });
            //others
            const other = await this.MypageService.getMentionedOther({
                userId,
            });
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
        } catch (err) {
            next(err);
        }
    };

    completeMentioned = async (req, res, next) => {
        const { mentionId } = req.params;
        try {
            const { userId } = res.locals.user;
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
        const pageInfo = req.query;
        try {
            const { userId } = res.locals.user;
            const pageNum = parseInt(pageInfo.pageNum);
            const pageSize = parseInt(pageInfo.pageSize);
            if (!pageInfo || !pageSize) {
                throw new CustomError("pagenation 정보를 입력해주세요", 410);
            }

            const myfile = await this.MypageService.getMyfile({ userId });
            const myfiles = myfile.slice(
                pageSize * (pageNum - 1),
                pageSize * pageNum
            );
            res.status(200).json({ myfiles });
        } catch (err) {
            next(err);
        }
    };

    getMeetingFiles = async (req, res, next) => {
        const pageInfo = req.query;
        try {
            const { userId } = res.locals.user;
            const pageNum = parseInt(pageInfo.pageNum);
            const pageSize = parseInt(pageInfo.pageSize);
            if (!pageInfo || !pageSize) {
                throw new CustomError("pagenation 정보를 입력해주세요", 410);
            }
            const meeting = await this.MypageService.TeamMeetingReport({
                userId,
            });
            const meetingfiles = meeting.slice(
                pageSize * (pageNum - 1),
                pageSize * pageNum
            );
            res.status(200).json({ meetingfiles });
        } catch (err) {
            next(err);
        }
    };

    getReportFiles = async (req, res, next) => {
        const pageInfo = req.query;
        try {
            const { userId } = res.locals.user;
            const pageNum = parseInt(pageInfo.pageNum);
            const pageSize = parseInt(pageInfo.pageSize);
            if (!pageInfo || !pageSize) {
                throw new CustomError("pagenation 정보를 입력해주세요", 410);
            }
            const report = await this.MypageService.TeamReport({
                userId,
            });
            const reportfiles = report.slice(
                pageSize * (pageNum - 1),
                pageSize * pageNum
            );
            res.status(200).json({ reportfiles });
        } catch (err) {
            next(err);
        }
    };

    getDetailMeetingFile = async (req, res, next) => {
        try {
            const {userId,eventId} = req.query;
            const detail = await this.MypageService.getDetailMeetingFile({ eventId, userId });

            res.status(200).json({meetingfile : detail});
        } catch (err) {
            next(err);
        }
    };

    getDetailReportFile = async (req, res, next) => {
        try {
            const {userId,eventId} = req.query;
            const detail = await this.MypageService.getDetailReportFile({ eventId, userId });

            res.status(200).json({reportfile : detail});
        } catch (err) {
            next(err);
        }
    };

    getVacationProgress = async (req,res,next) => {
        try{
            const {userId} = res.locals.user
            const status = await this.MypageService.getVacationProgress({userId})
            res.status(200).json(status)
        }catch(err){
            next(err)
        }
    }
}

module.exports = MypageController;
