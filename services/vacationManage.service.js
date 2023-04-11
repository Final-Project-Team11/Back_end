const VacationManageRepository = require("../repositories/vacationManage.repository");
const CustomError = require("../middlewares/errorHandler");

class VacationManageService {
    constructor() {
        this.vacationManageRepository = new VacationManageRepository();
    }
    
    // 휴가 상세 조회
    vacationDetail = async ({ eventId }) => {
        let vacationDetail =
            await this.vacationManageRepository.findVacationById({
                eventId,
            })
        if (!vacationDetail) {
            throw new CustomError("신청서가 존재하지 않습니다.",401)
        }
        
        return vacationDetail;
    };
    // 팀 휴가 요청 전체 조회
    vacationList = async ({ size, page, teamId }) => {
        const vacationList =
            await this.vacationManageRepository.findTeamVacation({
                size,
                page,
                teamId,
            });
        return vacationList;
    };
}
module.exports = VacationManageService;
