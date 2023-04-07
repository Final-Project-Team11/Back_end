const ScheduleManageRepository = require("../repositories/scheduleManage.repository");
const CustomError = require("../middlewares/errorHandler");

class ScheduleManageService {
    constructor() {
        this.scheduleManageRepository = new ScheduleManageRepository();
    }
    scheduleDetail = async ({ eventId }) => {
        const scheduleDetail =
            await this.scheduleManageRepository.findScheduleById({
                eventId,
            });

        const ref = scheduleDetail.Mentions.map(
            (mention) => mention.User.userName
        );
        scheduleDetail.ref = ref;

        // scheduleDetail객체 Mentions속성 삭제
        delete scheduleDetail.Mentions;
        return scheduleDetail;
    };
    // 팀 출장 요청 전체 조회
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
