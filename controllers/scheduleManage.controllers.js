const CustomError = require("../middlewares/errorHandler");
const ScheduleManageService = require("../services/ScheduleManage.service");

class ScheduleManageController {
    constructor() {
        this.scheduleManageService = new ScheduleManageService();
    }
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
