const CustomError = require("../middlewares/errorHandler");
const moment = require("moment");
const UserInfoRepository = require("../repositories/userInfo.repository")
class UserInfoService {
    constructor(){
        this.UserInfoRepository = new UserInfoRepository();
    }
    checkUserById = async ({ userId }) => {
        const user = await this.UserInfoRepository.findUserById({ userId });
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
            year = moment().add(1, "year").format("YYYY");
        }
        if (Number(date.format("DD")) > userSalaryDay) {
            month = moment().add(1, "month").format("MM");
        }

        const Dday = `${year}-${month}-${userSalaryDay}`;
        const Ddate = moment(Dday);

        const payDay = Ddate.diff(date, "days");

        const userInfo = {
            userName: user.userName,
            team: user.teamName,
            remainDay: user.remainDay,
            salaryDay: payDay,
            profileImg : user.profileImg
        };
        return userInfo;
    };
}

module.exports = UserInfoService;