const ScheduleManageRepository = require("../repositories/scheduleManage.repository");
const CustomError = require("../middlewares/errorHandler");

class ScheduleManageService {
    constructor() {
        this.scheduleManageRepository = new ScheduleManageRepository();
    }
    scheduleList = async ({ teamId }) => {
        const scheduleList =
            await this.scheduleManageRepository.findTeamSchedule({ teamId });
        return scheduleList;
    };
}
module.exports = ScheduleManageService;
