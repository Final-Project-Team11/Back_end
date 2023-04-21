const {Users, Schedules, Events, Mentions, sequelize, Vacations, Meetings, Reports, Others, MeetingReports, Teams, Sequelize} = require('../models')
const CustomError = require('../middlewares/errorHandler')
const { Op } = require('sequelize')

class MainPageRepository {
    // 휴가 전체 조회
    findTotalVacation = async({teamId, year, month}) => {
        // 시작일은 해당 년도와 달의 1일
        const startDate = new Date(year, month - 1, 1);
        // 종료일은 해당 년도와 달의 마지막 일
        const endDate = new Date(year, month, 0)

        // console.log("=================",startDate, endDate)
        const findTotalVacation = await Events.findAll({
            raw: true,
            where: {
                eventType: "Vacations",
                [Op.and]: [
                    {
                        "$Vacation.startDay$": { // Schedule.startDay 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                    {
                        "$Vacation.endDay$": { // Schedule.endDay 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                ],
            },
            attributes: [
                "eventId",
                [Sequelize.col("User.userName"), "userName"],
                [Sequelize.col("Vacation.userId"), "userId"],
                [Sequelize.col("Vacation.startDay"), "startDay"],
                [Sequelize.col("Vacation.endDay"), "endDay"],
                [Sequelize.col("Vacation.typeDetail"), "typeDetail"],
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
                    model: Vacations,
                    attributes: [],
                    as: "Vacation" // Schedules 모델을 Schedule 별칭으로 사용
                },
            ],
        })

        return findTotalVacation
    }

    // 출장 전체 조회
    findTotalSchedule = async({teamId, year, month}) => {
        // 시작일은 해당 년도와 달의 1일
        const startDate = new Date(year, month - 1, 1);
        // 종료일은 해당 년도와 달의 마지막 일
        const endDate = new Date(year, month, 0)

        // console.log("=================",startDate, endDate)
        const findTotalSchedule = await Events.findAll({
            raw: true,
            where: {
                eventType: "Schedules",
                [Op.and]: [
                    {
                        "$Schedule.startDay$": { // Schedule.startDay 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                    {
                        "$Schedule.endDay$": { // Schedule.endDay 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                ],
            },
            attributes: [
                "eventId",
                [Sequelize.col("User.userName"), "userName"],
                [Sequelize.col("Schedule.userId"), "userId"],
                [Sequelize.col("Schedule.title"), "title"],
                [Sequelize.col("Schedule.content"), "content"],
                [Sequelize.col("Schedule.fileName"), "fileName"],
                [Sequelize.col("Schedule.fileLocation"), "fileLocation"],
                [Sequelize.col("Schedule.startDay"), "startDay"],
                [Sequelize.col("Schedule.endDay"), "endDay"],
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
                    as: "Schedule" // Schedules 모델을 Schedule 별칭으로 사용
                },
            ],
        })
        // console.log(findTotalSchedule);

        const result = findTotalSchedule.map((item) => ({
            ...item,
            mentions: item.mentions.split(", "),
        }));
        // console.log("=====================",result);

        return result
    }

    // 보고서 전체 조회
    findTotalReport = async({teamId, year, month}) => {
        // 시작일은 해당 년도와 달의 1일
        const startDate = new Date(year, month - 1, 1);
        // 종료일은 해당 년도와 달의 마지막 일
        const endDate = new Date(year, month, 0)

        const findTotalReport = await Events.findAll({
            raw: true,
            where: { 
                eventType: "Reports",
                [Op.and]: [
                    {
                        "$Report.enrollDay$": { // Report.startDay 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                ],
            },
            attributes: [
                "eventId",
                [Sequelize.col("User.userName"), "userName"],
                [Sequelize.col("Report.userId"), "userId"],
                [Sequelize.col("Report.title"), "title"],
                [Sequelize.col("Report.content"), "content"],
                [Sequelize.col("Report.fileName"), "fileName"],
                [Sequelize.col("Report.fileLocation"), "fileLocation"],
                [Sequelize.col("Report.enrollDay"), "enrollDay"],
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
                    as: "Report"
                },
            ],
            group: ["eventId"],
        });
        // console.log(findTotalReport);

        const result = findTotalReport.map((item) => ({
            ...item,
            mentions: item.mentions.split(", "),
        }));
        // console.log(result);

        return result
    }

    // 기타 조회
    findTotalOther = async({teamId, year, month}) => {
        // 시작일은 해당 년도와 달의 1일
        const startDate = new Date(year, month - 1, 1);
        // 종료일은 해당 년도와 달의 마지막 일
        const endDate = new Date(year, month, 0)

        const findTotalOther = await Events.findAll({
            raw: true,
            where: { 
                eventType: "Others",
                [Op.and]: [
                    {
                        "$Other.startDay$": { // Others.startDay 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                    {
                        "$Other.endDay$": { // Others.endDay 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                ],
            },
            attributes: [
                "eventId",
                [Sequelize.col("User.userName"), "userName"],
                [Sequelize.col("Other.userId"), "userId"],
                [Sequelize.col("Other.title"), "title"],
                [Sequelize.col("Other.content"), "content"],
                [Sequelize.col("Other.fileName"), "fileName"],
                [Sequelize.col("Other.fileLocation"), "fileLocation"],
                [Sequelize.col("Other.startDay"), "startDay"],
                [Sequelize.col("Other.endDay"), "endDay"],
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
                    model: Others,
                    attributes: [],
                    as: "Other"
                },
            ],
        })

        const result = findTotalOther.map((item) => ({
            ...item,
            mentions: item.mentions.split(", "),
        }));
        // console.log("=====================",result);

        return result
    }
    
    // Issue 조회
    findTotalIssue = async({teamId, year, month}) => {
        // 시작일은 해당 년도와 달의 1일
        const startDate = new Date(year, month - 1, 1);
        // 종료일은 해당 년도와 달의 마지막 일
        const endDate = new Date(year, month, 0)

        // console.log("=================",startDate, endDate)
        const findTotalIssue = await Events.findAll({
            raw: true,
            where: {
                eventType: "Issues",
                [Op.and]: [
                    {
                        "$Meeting.startDay$": { // Schedule.startDay 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                ],
            },
            attributes: [
                "eventId",
                [Sequelize.col("User.userName"), "userName"],
                [Sequelize.col("Meeting.userId"), "userId"],
                [Sequelize.col("Meeting.title"), "title"],
                [Sequelize.col("Meeting.content"), "content"],
                [Sequelize.col("Meeting.fileName"), "fileName"],
                [Sequelize.col("Meeting.fileLocation"), "fileLocation"],
                [Sequelize.col("Meeting.location"), "location"],
                [Sequelize.col("Meeting.startDay"), "startDay"],
                [Sequelize.col("Meeting.startTime"), "startTime"],
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
                    model: Meetings,
                    attributes: [],
                    as: "Meeting" // Schedules 모델을 Schedule 별칭으로 사용
                },
            ],
        })

        const result = findTotalIssue.map((item) => ({
            ...item,
            mentions: item.mentions.split(", "),
        }));
        // console.log("=====================",result);

        return result
    }

    // Meeting 조회
    findTotalMeeting = async({teamId, year, month}) => {
        // 시작일은 해당 년도와 달의 1일
        const startDate = new Date(year, month - 1, 1);
        // 종료일은 해당 년도와 달의 마지막 일
        const endDate = new Date(year, month, 0)

        // console.log("=================",startDate, endDate)
        const findTotalMeeting = await Events.findAll({
            raw: true,
            where: {
                eventType: "Meetings",
                [Op.and]: [
                    {
                        "$Meeting.startDay$": { // Schedule.startDay 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                ],
            },
            attributes: [
                "eventId",
                [Sequelize.col("User.userName"), "userName"],
                [Sequelize.col("Meeting.userId"), "userId"],
                [Sequelize.col("Meeting.title"), "title"],
                [Sequelize.col("Meeting.content"), "content"],
                [Sequelize.col("Meeting.fileName"), "fileName"],
                [Sequelize.col("Meeting.fileLocation"), "fileLocation"],
                [Sequelize.col("Meeting.location"), "location"],
                [Sequelize.col("Meeting.startDay"), "startDay"],
                [Sequelize.col("Meeting.startTime"), "startTime"],
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
                    model: Meetings,
                    attributes: [],
                    as: "Meeting" // Schedules 모델을 Schedule 별칭으로 사용
                },
            ],
        })

        const result = findTotalMeeting.map((item) => ({
            ...item,
            mentions: item.mentions.split(", "),
        }));
        // console.log("=====================",result);

        return result
    }

    // 회의록 조회
    findTotalMeetingReport = async({teamId, year, month}) => {
        // 시작일은 해당 년도와 달의 1일
        const startDate = new Date(year, month - 1, 1);
        // 종료일은 해당 년도와 달의 마지막 일
        const endDate = new Date(year, month, 0)

        const findTotalMeetingReport = await Events.findAll({
            raw: true,
            where: { 
                eventType: "MeetingReports",
                [Op.and]: [
                    {
                        "$MeetingReport.enrollDay$": { // Report.startDay 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                ],
            },
            attributes: [
                "eventId",
                [Sequelize.col("MeetingReport.meetingId"), "meetingId"],
                [Sequelize.col("User.userName"), "userName"],
                [Sequelize.col("MeetingReport.userId"), "userId"],
                [Sequelize.col("MeetingReport.title"), "title"],
                [Sequelize.col("MeetingReport.content"), "content"],
                [Sequelize.col("MeetingReport.fileName"), "fileName"],
                [Sequelize.col("MeetingReport.fileLocation"), "fileLocation"],
                [Sequelize.col("MeetingReport.enrollDay"), "enrollDay"],
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
                    model: MeetingReports,
                    attributes: [],
                    as: "MeetingReport"
                },
            ],
            group: ["eventId"],
        });

        const result = findTotalMeetingReport.map((item) => ({
            ...item,
            mentions: item.mentions.split(", "),
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

    findCompanyId = async(teamId) => {
        const companyId = await Teams.findOne({
            raw: true,
            where: {teamId},
            attributes: ["companyId"]
        })
        // console.log("aaaaaaaa", companyId)

        return companyId
    }
}

module.exports = MainPageRepository