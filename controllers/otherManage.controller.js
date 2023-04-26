const CustomError = require("../middlewares/errorHandler");
const OtherManageService = require("../services/otherManage.service");

class OtherManageController {
    constructor() {
        this.otherManageService = new OtherManageService();
    }

    // 팀 결제 요청 전체 조회
    otherList = async (req, res, next) => {
        try {
            const userInfo = res.locals.user;
            const { size, page } = req.query;
            const { teamId } = userInfo;
            const otherList = await this.otherManageService.otherList({
                size: Number(size),
                page: Number(page),
                teamId,
            });

            res.status(200).json({ other: otherList });
        } catch (err) {
            next(err);
        }
    };
}
module.exports = OtherManageController;
