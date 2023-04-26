const OtherManageRepository = require("../repositories/otherManage.repository");
const CustomError = require("../middlewares/errorHandler");

class OtherManageService {
    constructor() {
        this.otherManageRepository = new OtherManageRepository();
    }
    
    // 팀 기타 결제 요청 전체 조회
    otherList = async ({ size, page, teamId }) => {
        let otherList =
            await this.otherManageRepository.findTeamOther({
                size,
                page,
                teamId,
            });
        const newOtherList = otherList.map(
            (item) => {
                const newItem =item.toJSON()
                newItem.files = item.Event.Files
                delete newItem.Event;
                return newItem
            }
        )
        return newOtherList;
    };
}
module.exports = OtherManageService;
