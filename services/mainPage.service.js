const MainPageRepository = require("../repositories/mainPage.repository");
const CustomError = require("../middlewares/errorHandler");

class MainPageService {
    constructor() {
        this.mainPageRepository = new MainPageRepository ();
    }

    // 휴가 전체 조회
    findTotalVacation = async({teamId, year, month, companyId}) => {
        const companyCheck = await this.mainPageRepository.findCompanyId(teamId)
        if(companyCheck.companyId != companyId) {
            throw new CustomError('권한이 존재하지않습니다.', 401)
        }
        const findTeamName = await this.mainPageRepository.findTeamName(teamId)
        const vacation = await this.mainPageRepository.findTotalVacation({teamId, year, month})
        // console.log(findTeamVacation)
        // console.log(findTeamName)

        const findTotalVacation = Object.assign({}, findTeamName, {vacation});
        // console.log("-------------------",findTotalVacation)

        return findTotalVacation
    }

    // 전체 일정 조회
    findTotalSchedule = async({teamId, year, month, companyId}) => {
        const companyCheck = await this.mainPageRepository.findCompanyId(teamId)
        if(companyCheck.companyId != companyId) {
            throw new CustomError('권한이 존재하지않습니다.', 401)
        }
        const findTeamName = await this.mainPageRepository.findTeamName(teamId)
        // 출장(schedule) 조회
        const schedule = await this.mainPageRepository.findTotalSchedule({teamId, year, month})
        // // 보고서 조회
        // const report = await this.mainPageRepository.findTotalReport({teamId, year, month})
        // // 기타 조회
        // const other = await this.mainPageRepository.findTotalOther({teamId, year, month})
        // 회의(Issue) 조회
        const issue = await this.mainPageRepository.findTotalIssue({teamId, year, month})
        // 회의(Meeting) 조회
        const meeting = await this.mainPageRepository.findTotalMeeting({teamId, year, month})
        // 기타일정(program) 조회
        const program = await this.mainPageRepository.findTotalProgram({teamId, year, month})
        // // 회의록 조회
        // const meetingReport = await this.mainPageRepository.findTotalMeetingReport({teamId, year, month})

        const findTotalSchedule = Object.assign({}, findTeamName, {schedule}, {issue}, {meeting}, {program});
        // // console.log("-------------------",findTotalSchedule)

        return findTotalSchedule
    }
}

module.exports = MainPageService