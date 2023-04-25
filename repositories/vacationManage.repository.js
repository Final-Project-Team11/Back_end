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
    findEventInfo = async ({ Id }) => {
        const eventInfo =  await Events.findOne({
            where: { Id }
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
    updateVacationStaus = async ({ Id, status }) => {
        const result = await Vacations.update(
            {
            status: status,
            },
            {
            where: { Id },  
            })
        return result
    }
    findVacationOne = async ({ Id }) => {
        const vacation = await Vacations.findOne({
            where:{Id}
        })
        return vacation
    }
    // 휴가 상세조회
    findVacationById = async ({Id }) => {
        const vacation = await Vacations.findOne({
            where: {Id },
            attributes: [
                "Id",
                [Sequelize.col("User.userName"), "userName"],
                "typeDetail",
                [Sequelize.fn("date_format",Sequelize.col("start"),"%m/%d"),"start"],
                [Sequelize.fn("date_format",Sequelize.col("end"),"%m/%d"),"end"],
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
                "Id",
                [Sequelize.col("User.userName"), "userName"],
                "typeDetail",
                [Sequelize.fn("date_format",Sequelize.col("start"),"%m/%d"),"start"],
                [Sequelize.fn("date_format",Sequelize.col("end"),"%m/%d"),"end"],
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
            order: [
                [
                    Sequelize.fn("FIELD", Sequelize.col("status"), "submit"),
                    "DESC",
                ],
                ["createdAt", "DESC"],
            ],
        });
        return teamVacationList;
    };
}
module.exports = VacationManageRepository;
