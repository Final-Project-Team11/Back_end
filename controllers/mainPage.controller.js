const MainPageService = require("../services/mainPage.service");
const CustomError = require("../middlewares/errorHandler");
const Joi = require("joi");

class MainPageController {
    constructor() {
        this.mainPageService = new MainPageService()
    }
    // 휴가 전체 조회
    findTotalVacation = async(req, res, next) => {
        try {
            const {teamId} = req.params

            const findTotalVacation = await this.mainPageService.findTotalVacation(teamId)

            res.status(200).json({ main: findTotalVacation})
        } catch (error) {
            next(error)
        }
    }
    
    // 전체 일정 조회
    findTotalSchedule = async(req, res, next) => {
        try {
            const {teamId} = req.params

            const findTotalSchedule = await this.mainPageService.findTotalSchedule(teamId)

            res.status(200).json({ main: findTotalSchedule})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = MainPageController