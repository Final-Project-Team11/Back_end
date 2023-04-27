const CustomError = require("../middlewares/errorHandler");
const OtherManageService = require("../services/otherManage.service");

class OtherManageController {
    constructor() {
        this.otherManageService = new OtherManageService();
    }
    // 기타 결제 반려 
    otherDeny = async (req, res, next) => {
        try{
            const userInfo = res.locals.user;
            const { Id } = req.params;
            await this.otherManageService.otherDeny({ Id, userInfo })
            res.status(200).json({ message: '일정 결제 승인 거절되었습니다.' })    
        } catch (err) {
            next(err)
    }
    }
    // 기타 결제 승인
    otherAccept = async (req, res, next) => {
        try{
            const userInfo = res.locals.user;
            const { Id } = req.params;
            await this.otherManageService.otherAccept({ Id, userInfo })
            res.status(200).json({ message: '일정 결제 수락했습니다.' })    
        } catch (err) {
            next(err)
    }
    }
    // 팀 기타 결제 요청 상세 조회
    otherDetail = async (req, res, next) => {
        try {
            const { Id } = req.params;
            const otherDetail =
                await this.otherManageService.otherDetail({ Id });
            res.status(200).json(otherDetail);
        } catch (err) {
            next(err);
        }
    };
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
