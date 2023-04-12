const {Users, Schedules, Events, Mentions, sequelize, Vacations, Meetings, Reports, Others, MeetingReports, Teams, Sequelize} = require('../models')
const CustomError = require('../middlewares/errorHandler')

class MainPageRepository {
    findTotalVacation = async(teamId) => {
        const findTeamUsers = await Vacations.findAll({
            raw: true,
            // where: {teamId},
            attributes: [
                "eventId",
                [Sequelize.col("User.userName"), "userName"],
                "typeDetail",
                "startDay",
                "endDay",
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
        })
        return findTeamUsers
    }

    findTeamName = async(teamId) => {
        const teamName = await Teams.findOne({
            raw: true,
            where: {teamId},
            attributes: ["teamName"]
        })

        return teamName
    }
}

module.exports = MainPageRepository