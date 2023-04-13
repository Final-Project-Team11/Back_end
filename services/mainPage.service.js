const MainPageRepository = require("../repositories/mainPage.repository");
const CustomError = require("../middlewares/errorHandler");

class MainPageService {
    mainPageRepository = new MainPageRepository()

    // 휴가 전체 조회
    findTotalVacation = async(teamId) => {
        const findTeamName = await this.mainPageRepository.findTeamName(teamId)
        const vacation = await this.mainPageRepository.findTotalVacation(teamId)
        // console.log(findTeamVacation)
        // console.log(findTeamName)

        const findTotalVacation = Object.assign({}, findTeamName, {vacation});
        console.log("-------------------",findTotalVacation)

        return findTotalVacation
    }
}

module.exports = MainPageService