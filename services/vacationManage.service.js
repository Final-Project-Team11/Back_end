const VacationManageRepository = require("../repositories/vacationManage.repository");
const CustomError = require("../middlewares/errorHandler");
const moment = require('moment')
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

    // 휴가 반려
    vacationDeny = async ({ eventId, userInfo }) => {
        const vacation = await this.vacationManageRepository.findVacationById({
            eventId,
        });
        if (!vacation) {
            throw new CustomError("신청서가 존재하지 않습니다.",401)
        }
        const vacationStatus = vacation.status
        if (vacationStatus === 'accept' || vacationStatus === 'deny') {
            throw new CustomError("이미 결제가 완료되었습니다.",400)
        }
        const status = 'deny'
        await this.vacationManageRepository.updateVacationStaus({ eventId, status })
    }
    // 휴가 승인
    vacationAccept = async ({ eventId, userInfo }) => {
        const vacation = await this.vacationManageRepository.findVacationById({
            eventId,
        });
        if (!vacation) {
            throw new CustomError("신청서가 존재하지 않습니다.",401)
        }
        const vacationStatus = vacation.status
        if (vacationStatus === 'accept' || vacationStatus === 'deny') {
            throw new CustomError("이미 결제가 완료되었습니다.",400)
        }
        const { teamId } = userInfo
        const eventInfo = await this.vacationManageRepository.findEventInfo({ eventId })
        // 이벤트를 쓴 유저 아이디를 찾아서 teamId와 userId로 유저 인포를 찾음. 그걸로 연차일수 차감 하는 업데이트
        const { userId } = eventInfo.dataValues
        // 해당 매니저팀의 유저만 승인할 수 있음
        const writerInfo = await this.vacationManageRepository.findUserById({ userId, teamId })
        const { remainDay } = writerInfo.dataValues
        const endDay = moment(vacation.endDay)
        const startDay = moment(vacation.startDay)
        console.log("스타트",startDay.day())
        console.log("엔드", endDay.day())

        // 남은 연차일수 변수
        let afterRemainDay
        if (vacation.typeDetail == '반차') {
            if (startDay !== endDay) {
                throw new CustomError('반차 신청 시 시작일과 종료일을 같은 날짜로 설정해 주세요.')
            }
            if ([6, 0].includes(startDay.day())) {
                throw new CustomError('주말에는 반차사용이 불가합니다.')
            }
            afterRemainDay = remainDay - 0.5
            console.log(afterRemainDay)
        } else {
            let weekendsCount = 0;
            const currentDay = startDay.clone(); // 복사본 생성

            while (currentDay <= endDay) {
                const dayOfWeek = currentDay.day();
            // 주말이면 카운트 증가
                if ([6, 0].includes(dayOfWeek)) {
                    weekendsCount++;
                }   
                currentDay.add(1, 'days'); // 날짜를 1일씩 증가
            }
            const daysDifference = endDay.diff(startDay, 'days') + 1;
            afterRemainDay = remainDay - daysDifference + weekendsCount
        }
        if (afterRemainDay < 0) {
            throw new CustomError("남은 연차 일수가 부족합니다.",400)
        }
        const status = 'accept'
        await this.vacationManageRepository.updateVacationStaus({ eventId, status })
        await this.vacationManageRepository.updateUserRemainDay({ userId, afterRemainDay })
    
    }
}
module.exports = VacationManageService;