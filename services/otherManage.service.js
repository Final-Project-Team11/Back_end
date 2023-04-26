const OtherManageRepository = require("../repositories/otherManage.repository");
const CustomError = require("../middlewares/errorHandler");

class OtherManageService {
    constructor() {
        this.otherManageRepository = new OtherManageRepository();
    }
    
    // 기타 결제 상세 조회
    otherDetail = async ({ Id }) => {
        let otherDetail =
            await this.otherManageRepository.findOtherById({
                Id,
            })
        if (!otherDetail) {
            throw new CustomError("신청서가 존재하지 않습니다.", 401)
        }
        otherDetail = otherDetail.dataValues
        const attendees = otherDetail.Mentions.map(
            (mention) => mention.User.userName
        );

        otherDetail.files = otherDetail.Files;
        delete otherDetail.Files;

        otherDetail.attendees = attendees;
        delete otherDetail.Mentions;
        return otherDetail;
    };


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
                const newItem = item.toJSON()
                newItem.files = item.Event.Files
                delete newItem.Event;
                return newItem
            }
        )
        return newOtherList;
    };
}
module.exports = OtherManageService;
