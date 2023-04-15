const { Users, Events, Vacations, Sequelize } = require("../models");
class VacationManageRepository {

    updateUserRemainDay = async ({ userId, afterRemainDay }) => {
        await Users.update(
            {
            remainDay : afterRemainDay
            },
            {
                where: { userId }
            },)
    
    }
    findVacationInfo = async ({ eventId }) => {
        const vacationInfo = await Vacations.findOne({
            where: { eventId }
        })
        return vacationInfo
    }
    findEventInfo = async ({ eventId }) => {
        const eventInfo =  await Events.findOne({
            where: { eventId }
        })
        return eventInfo
    }
    findUserById = async ({ userId, teamId }) => {
        const userInfo = await Users.findOne({
            where: {
                userId,
                teamId
            }
        })
        return userInfo
    }

// 휴가  승인/반려
    updateVacationStaus = async ({ eventId, status }) => {
        const result = await Vacations.update(
            {
            status: status,
            },
            {
            where: { eventId },  
            })
        return result
    }

    // 휴가 상세조회
    findVacationById = async ({ eventId }) => {
        const vacation = await Vacations.findOne({
            where: { eventId },
            attributes: [
                "eventId",
                [Sequelize.col("User.userName"), "userName"],
                "typeDetail",
                "startDay",
                "endDay",
                "status"
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                    
                },
            ],
        });
        return vacation
    };
    // 팀 유저 휴가
    findTeamVacation = async ({ size, page, teamId }) => {
        page ? page : 1;
        const offset = (page - 1) * size;
        const teamVacationList = await Vacations.findAll({
            limit: size ? size : 10,
            offset: offset ? offset : 0,
            attributes: [
                "eventId",
                [Sequelize.col("User.userName"), "userName"],
                "typeDetail",
                [Sequelize.fn("date_format",Sequelize.col("startDay"),"%m/%d"),"startDay"],
                [Sequelize.fn("date_format",Sequelize.col("endDay"),"%m/%d"),"endDay"],
                "status",
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                    where: {
                        teamId: teamId,
                    },
                },
            ],
        });
        return teamVacationList;
    };
}
module.exports = VacationManageRepository;
