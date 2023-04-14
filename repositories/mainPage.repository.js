const {Users, Schedules, Events, Mentions, sequelize, Vacations, Meetings, Reports, Others, MeetingReports, Teams, Sequelize} = require('../models')
const CustomError = require('../middlewares/errorHandler')

class MainPageRepository {
    // 휴가 전체 조회
    findTotalVacation = async(teamId) => {
        const findTotalVacation = await Vacations.findAll({
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
        return findTotalVacation
    }

    // 출장 전체 조회
    findTotalSchedule = async(teamId) => {
        const findTotalSchedule = await Events.findAll({
            raw: true,
            where: {eventType: "Schedules"},
            attributes: [
                "eventId",
                [Sequelize.col("User.userName"), "userName"],
                [Sequelize.col("Schedule.title"), "title"],
                [Sequelize.col("Schedule.content"), "content"],
                [Sequelize.col("Schedule.file"), "file"],
                [Sequelize.col("Schedule.startDay"), "startDay"],
                [Sequelize.col("Schedule.endDay"), "endtDay"],
                "eventType",
                [
                    Sequelize.literal(
                        "(SELECT GROUP_CONCAT(DISTINCT Users.userName SEPARATOR ', ') FROM Mentions JOIN Users ON Mentions.userId = Users.userId WHERE Mentions.eventId = Events.eventId)"
                    ),
                    "mentions",
                ],
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                    where: {
                        teamId: teamId,
                    },
                },
                {
                    model: Schedules,
                    attributes: [],
                },
            ],
        })
        // console.log(findTotalSchedule);

        const result = findTotalSchedule.map((report) => ({
            ...report,
            mentions: report.mentions.split(", "),
        }));
        console.log("=====================",result);

        return result
    }

    // 보고서 전체 조회
    findTotalReport = async(teamId) => {
        const findTotalReport = await Events.findAll({
            raw: true,
            where: { eventType: "Reports" },
            attributes: [
                "eventId",
                [Sequelize.col("User.userName"), "userName"],
                [Sequelize.col("Report.title"), "title"],
                [Sequelize.col("Report.content"), "content"],
                [Sequelize.col("Report.file"), "file"],
                "eventType",
                [
                    Sequelize.literal(
                        "(SELECT GROUP_CONCAT(DISTINCT Users.userName SEPARATOR ', ') FROM Mentions JOIN Users ON Mentions.userId = Users.userId WHERE Mentions.eventId = Events.eventId)"
                    ),
                    "mentions",
                ],
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                    where: {
                        teamId: teamId,
                    },
                },
                {
                    model: Reports,
                    attributes: [],
                },
            ],
            group: ["eventId"],
        });
        // console.log(findTotalReport);

        const result = findTotalReport.map((report) => ({
            ...report,
            mentions: report.mentions.split(", "),
        }));
        // console.log(result);

        return result
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