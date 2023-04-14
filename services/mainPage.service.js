const MainPageRepository = require("../repositories/mainPage.repository");
const CustomError = require("../middlewares/errorHandler");

class MainPageService {
    constructor() {
        this.mainPageRepository = new MainPageRepository ();
    }

    // 휴가 전체 조회
    findTotalVacation = async(teamId) => {
        const findTeamName = await this.mainPageRepository.findTeamName(teamId)
        const vacation = await this.mainPageRepository.findTotalVacation(teamId)
        // console.log(findTeamVacation)
        // console.log(findTeamName)

        const findTotalVacation = Object.assign({}, findTeamName, {vacation});
        // console.log("-------------------",findTotalVacation)

        return findTotalVacation
    }

    // 전체 일정 조회
    findTotalSchedule = async(teamId) => {
        const findTeamName = await this.mainPageRepository.findTeamName(teamId)
        // 출장 조회
        const schedule = await this.mainPageRepository.findTotalSchedule(teamId)
        // 보고서 조회
        const report = await this.mainPageRepository.findTotalReport(teamId)

        const findTotalVacation = Object.assign({}, findTeamName, {schedule}, {report});
        // console.log("-------------------",findTotalVacation)

        return findTotalVacation
    }
}

module.exports = MainPageService