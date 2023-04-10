const { Users, Vacations, Sequelize } = require("../models");
class VacationManageRepository {

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
                "startDay",
                "endDay",
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
