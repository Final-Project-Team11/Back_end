const CustomError = require("../middlewares/errorHandler");
const VacationManageService = require("../services/vacationManage.service");

class VacationManageController {
    constructor() {
        this.vacationManageService = new VacationManageService();
    }
    // 휴가 상세 조회
    vacationDetail = async (req, res, next) => {
        try {
            const { eventId } = req.params;
            const vacationDetail =
                await this.vacationManageService.vacationDetail({ eventId });
            res.status(200).json(vacationDetail);
        } catch (err) {
            next(err);
        }
    };
    // 팀 휴가 요청 전체 조회
    vacationList = async (req, res, next) => {
        try {
            const userInfo = res.locals.user;
            const { size, page } = req.query;
            const { teamId } = userInfo;
            const vacationList = await this.vacationManageService.vacationList({
                size: Number(size),
                page: Number(page),
                teamId,
            });

            res.status(200).json({ vacation: vacationList });
        } catch (err) {
            next(err);
        }
    };
}
module.exports = VacationManageController;
