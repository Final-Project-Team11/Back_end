const MypageService = require("../services/myPage.service.js");
const CustomError = require("../middlewares/errorHandler");
class MypageController {
    constructor() {
        this.MypageService = new MypageService();
    }

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
            //기타 일정(워크샵, 회식 등등)
            const event = await this.MypageService.getMentionedEvent({
                userId,
            })
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
                event,
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
            const { teamId } = res.locals.user;
            const pageNum = parseInt(pageInfo.pageNum);
            const pageSize = parseInt(pageInfo.pageSize);
            if (!pageInfo || !pageSize) {
                throw new CustomError("pagenation 정보를 입력해주세요", 410);
            }
            const meeting = await this.MypageService.TeamMeetingReport({
                teamId,
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
            const { teamId } = res.locals.user;
            const pageNum = parseInt(pageInfo.pageNum);
            const pageSize = parseInt(pageInfo.pageSize);
            if (!pageInfo || !pageSize) {
                throw new CustomError("pagenation 정보를 입력해주세요", 410);
            }
            const report = await this.MypageService.TeamReport({
                teamId,
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

    getDetailMyfile = async (req, res, next) => {
        try {
            const { Id } = req.params;
            const { userId } = res.locals.user;
            //권한 체크
            await this.MypageService.checkSchedule({ userId, Id })
            const detail = await this.MypageService.getDatailMyfile({ Id })
            res.status(200).json({ detail })
        } catch (err) {
            next(err)
        }
    }

    getDetailMeetingFile = async (req, res, next) => {
        try {
            const { Id } = req.params;
            const { userId } = res.locals.user;
            //권한 체크
            const eventType = "5"
            await this.MypageService.checkdetailSchedule({ userId, Id,eventType })
            const detail = await this.MypageService.getDetailMeetingFile({
                Id,
            });

            res.status(200).json({ meetingfile: detail });
        } catch (err) {
            next(err);
        }
    };

    getDetailReportFile = async (req, res, next) => {
        try {
            const { Id } = req.params;
            const { userId } = res.locals.user;
            //권한 체크
            const eventType = "5"
            await this.MypageService.checkdetailSchedule({ userId, Id,eventType })
            const detail = await this.MypageService.getDetailReportFile({
                Id,
            });

            res.status(200).json({ reportfile: detail });
        } catch (err) {
            next(err);
        }
    };

    getVacationProgress = async (req, res, next) => {
        try {
            const { userId } = res.locals.user
            const {status} = await this.MypageService.getVacationProgress({ userId })
            res.status(200).json({status})
        } catch (err) {
            next(err)
        }
    }

    getWeeklySchedule = async(req,res,next) => {
        try{
            const {year,month,day} = req.query;
            const {teamId} = res.locals.user;

            const data = await this.MypageService.getWeeklySchedule({teamId,year,month,day})
            res.status(200).json(data)
        }catch(err){
            next(err)
        }
    }
}

module.exports = MypageController;
