const ScheduleManageRepository = require("../repositories/scheduleManage.repository");
const CustomError = require("../middlewares/errorHandler");

class ScheduleManageService {
    constructor() {
        this.scheduleManageRepository = new ScheduleManageRepository();
    }
    scheduleList = async ({ size, page, teamId }) => {
        const scheduleList =
            await this.scheduleManageRepository.findTeamSchedule({
                size,
                page,
                teamId,
            });
        return scheduleList;
    };
}
module.exports = ScheduleManageService;
