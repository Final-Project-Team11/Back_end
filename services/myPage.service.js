const MypageRepository = require("../repositories/myPage.repository.js");
const CustomError = require("../middlewares/errorHandler");
const moment = require("moment");
class MypageService {
    constructor() {
        this.MypageRepository = new MypageRepository();
    }
    
    checkUserById = async ({ userId }) => {
        const user = await this.MypageRepository.findUserById({ userId });
        if (!user) {
            throw new CustomError("해당 유저가 존재하지 않습니다.", 401);
        } else if (user.userId !== userId) {
            throw new CustomError(
                "유저 정보에 대한 권한이 존재하지 않습니다.",
                401
            );
        }
        return user;
    };
    getUserInfo = async ({ user }) => {
        const userSalaryDay = user.salaryDay;
        const date = moment();
        let month, year;
        month = moment().format("MM");
        year = moment().format("YYYY");

        if (Number(date.format("MM")) === 12) {
            year = moment().add(1, 'year').format("YYYY");
        }
        if (Number(date.format("DD")) > userSalaryDay) {
            month = moment().add(1, "month").format("MM");
        } 

        const Dday = `${year}-${month}-${userSalaryDay}`;
        const Ddate = moment(Dday);

        const payDay = Ddate.diff(date, "days")

        const userInfo = {
            userName: user.userName,
            remainDay: user.remainDay,
            salaryDay: payDay,
        };
        return userInfo;
    };

    getUserSchedule = async ({ userId }) => {
        return await this.MypageRepository.getUserSchedule({ userId })
    }
}

module.exports = MypageService;
