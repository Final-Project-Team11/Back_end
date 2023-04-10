const CustomError = require("../middlewares/errorHandler");
const ScheduleManageService = require("../services/ScheduleManage.service");

class ScheduleManageController {
    constructor() {
        this.scheduleManageService = new ScheduleManageService();
    }
    // 출장 수락
    scheduleAccept = async (req, res, next) => {
        try{
            const userInfo = res.locals.user;
            const { eventId } = req.params;
            await this.scheduleManageService.scheduleAccept({ eventId, userInfo })
            res.status(200).json({ message: '일정 결제 수락했습니다.' })    
        } catch (err) {
            next(err)
    }
    }
    // 출장 상세 조회
    scheduleDetail = async (req, res, next) => {
        try {
            const { eventId } = req.params;
            const scheduleDetail =
                await this.scheduleManageService.scheduleDetail({ eventId });
            res.status(200).json(scheduleDetail);
        } catch (err) {
            next(err);
        }
    };
    // 팀 출장 요청 전체 조회
    scheduleList = async (req, res, next) => {
        try {
            const userInfo = res.locals.user;
            const { size, page } = req.query;
            const { teamId } = userInfo;
            const scheduleList = await this.scheduleManageService.scheduleList({
                size: Number(size),
                page: Number(page),
                teamId,
            });

            res.status(200).json({ schedule: scheduleList });
        } catch (err) {
            next(err);
        }
    };
}
module.exports = ScheduleManageController;
