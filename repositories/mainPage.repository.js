const {Users, Schedules, Events, Mentions, sequelize, Files, Vacations, Meetings, Reports, Others, MeetingReports, Teams, Sequelize} = require('../models')
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
                calendarId: "Vacations",
                [Op.and]: [
                    {
                        "$Vacation.start$": { // Schedule.startDay 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                    {
                        "$Vacation.end$": { // Schedule.endDay 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                ],
            },
            attributes: [
                "Id",
                [Sequelize.col("User.userName"), "userName"],
                [Sequelize.col("Vacation.userId"), "userId"],
                [Sequelize.col("Vacation.start"), "start"],
                [Sequelize.col("Vacation.end"), "end"],
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

        // console.log("=================",start, end)
        const findTotalSchedule = await Events.findAll({
            raw: true,
            where: {
                calendarId: "Schedules",
                [Op.and]: [
                    {
                        "$Schedule.start$": { // Schedule.start 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                    {
                        "$Schedule.end$": { // Schedule.end 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                ],
            },
            attributes: [
                "Id",
                [Sequelize.col("User.userName"), "userName"],
                [Sequelize.col("Schedule.userId"), "userId"],
                [Sequelize.col("Schedule.title"), "title"],
                [Sequelize.col("Schedule.body"), "body"],
                [
                    Sequelize.literal(
                    "(SELECT GROUP_CONCAT('{\"fileName\":\"', Files.fileName, '\",\"fileLocation\":\"', Files.fileLocation, '\"}'SEPARATOR '|') FROM Events JOIN Files ON Events.Id = Files.Id WHERE Files.Id = Schedule.Id)"
                    ),
                    "files"
                ],
                [Sequelize.col("Schedule.start"), "start"],
                [Sequelize.col("Schedule.end"), "end"],
                "calendarId",
                [
                    Sequelize.literal(
                        "(SELECT GROUP_CONCAT(DISTINCT Users.userName SEPARATOR ', ') FROM Mentions JOIN Users ON Mentions.userId = Users.userId WHERE Mentions.Id = Events.Id)"
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

        findTotalSchedule.map((item) => {
            if(item.files) {
                item.files = item.files.split("|").map((item) => {
                    return JSON.parse(item)
                })
            }
        })
        const result = findTotalSchedule.map((item) => ({
            ...item,
            mentions: item.mentions.split(", "),
        }));
        // console.log("=====================",result);

        return result
    }

    // // 보고서 전체 조회
    // findTotalReport = async({teamId, year, month}) => {
    //     // 시작일은 해당 년도와 달의 1일
    //     const startDate = new Date(year, month - 1, 1);
    //     // 종료일은 해당 년도와 달의 마지막 일
    //     const endDate = new Date(year, month, 0)

    //     const findTotalReport = await Events.findAll({
    //         raw: true,
    //         where: { 
    //             eventType: "Reports",
    //             [Op.and]: [
    //                 {
    //                     "$Report.enrollDay$": { // Report.startDay 컬럼 참조
    //                         [Op.between]: [startDate, endDate],
    //                     },
    //                 },
    //             ],
    //         },
    //         attributes: [
    //             "eventId",
    //             [Sequelize.col("User.userName"), "userName"],
    //             [Sequelize.col("Report.userId"), "userId"],
    //             [Sequelize.col("Report.title"), "title"],
    //             [Sequelize.col("Report.content"), "content"],
    //             [Sequelize.col("Report.fileName"), "fileName"],
    //             [Sequelize.col("Report.fileLocation"), "fileLocation"],
    //             [Sequelize.col("Report.enrollDay"), "enrollDay"],
    //             "eventType",
    //             [
    //                 Sequelize.literal(
    //                     "(SELECT GROUP_CONCAT(DISTINCT Users.userName SEPARATOR ', ') FROM Mentions JOIN Users ON Mentions.userId = Users.userId WHERE Mentions.eventId = Events.eventId)"
    //                 ),
    //                 "mentions",
    //             ],
    //         ],
    //         include: [
    //             {
    //                 model: Users,
    //                 attributes: [],
    //                 where: {
    //                     teamId: teamId,
    //                 },
    //             },
    //             {
    //                 model: Reports,
    //                 attributes: [],
    //                 as: "Report"
    //             },
    //         ],
    //         group: ["eventId"],
    //     });
    //     // console.log(findTotalReport);

    //     const result = findTotalReport.map((item) => ({
    //         ...item,
    //         mentions: item.mentions.split(", "),
    //     }));
    //     // console.log(result);

    //     return result
    // }

    // // 기타 조회
    // findTotalOther = async({teamId, year, month}) => {
    //     // 시작일은 해당 년도와 달의 1일
    //     const startDate = new Date(year, month - 1, 1);
    //     // 종료일은 해당 년도와 달의 마지막 일
    //     const endDate = new Date(year, month, 0)

    //     const findTotalOther = await Events.findAll({
    //         raw: true,
    //         where: { 
    //             eventType: "Others",
    //             [Op.and]: [
    //                 {
    //                     "$Other.startDay$": { // Others.startDay 컬럼 참조
    //                         [Op.between]: [startDate, endDate],
    //                     },
    //                 },
    //                 {
    //                     "$Other.endDay$": { // Others.endDay 컬럼 참조
    //                         [Op.between]: [startDate, endDate],
    //                     },
    //                 },
    //             ],
    //         },
    //         attributes: [
    //             "eventId",
    //             [Sequelize.col("User.userName"), "userName"],
    //             [Sequelize.col("Other.userId"), "userId"],
    //             [Sequelize.col("Other.title"), "title"],
    //             [Sequelize.col("Other.content"), "content"],
    //             [Sequelize.col("Other.fileName"), "fileName"],
    //             [Sequelize.col("Other.fileLocation"), "fileLocation"],
    //             [Sequelize.col("Other.startDay"), "startDay"],
    //             [Sequelize.col("Other.endDay"), "endDay"],
    //             "eventType",
    //             [
    //                 Sequelize.literal(
    //                     "(SELECT GROUP_CONCAT(DISTINCT Users.userName SEPARATOR ', ') FROM Mentions JOIN Users ON Mentions.userId = Users.userId WHERE Mentions.eventId = Events.eventId)"
    //                 ),
    //                 "mentions",
    //             ],
    //         ],
    //         include: [
    //             {
    //                 model: Users,
    //                 attributes: [],
    //                 where: {
    //                     teamId: teamId,
    //                 },
    //             },
    //             {
    //                 model: Others,
    //                 attributes: [],
    //                 as: "Other"
    //             },
    //         ],
    //     })

    //     const result = findTotalOther.map((item) => ({
    //         ...item,
    //         mentions: item.mentions.split(", "),
    //     }));
    //     // console.log("=====================",result);

    //     return result
    // }
    
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
                calendarId: "Issues",
                [Op.and]: [
                    {
                        "$Meeting.start$": {
                            [Op.between]: [startDate, endDate],
                        },
                    },
                    {
                        "$Meeting.end$": {
                            [Op.between]: [startDate, endDate],
                        },
                    },
                ],
            },
            attributes: [
                "Id",
                [Sequelize.col("User.userName"), "userName"],
                [Sequelize.col("Meeting.userId"), "userId"],
                [Sequelize.col("Meeting.title"), "title"],
                [Sequelize.col("Meeting.body"), "body"],
                [
                    Sequelize.literal(
                    "(SELECT GROUP_CONCAT('{\"fileName\":\"', Files.fileName, '\",\"fileLocation\":\"', Files.fileLocation, '\"}'SEPARATOR '|') FROM Events JOIN Files ON Events.Id = Files.Id WHERE Files.Id = Meeting.Id)"
                    ),
                    "files"
                ],
                [Sequelize.col("Meeting.location"), "location"],
                [Sequelize.col("Meeting.start"), "start"],
                [Sequelize.col("Meeting.end"), "end"],
                "calendarId",
                [
                    Sequelize.literal(
                        "(SELECT GROUP_CONCAT(DISTINCT Users.userName SEPARATOR ', ') FROM Mentions JOIN Users ON Mentions.userId = Users.userId WHERE Mentions.Id = Events.Id)"
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
        findTotalIssue.map((item) => {
            if(item.files) {
                item.files = item.files.split("|").map((item) => {
                    return JSON.parse(item)
                })
            }
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
                calendarId: "Meetings",
                [Op.and]: [
                    {
                        "$Meeting.start$": {
                            [Op.between]: [startDate, endDate],
                        },
                    },
                    {
                        "$Meeting.end$": {
                            [Op.between]: [startDate, endDate],
                        },
                    },
                ],
            },
            attributes: [
                "Id",
                [Sequelize.col("User.userName"), "userName"],
                [Sequelize.col("Meeting.userId"), "userId"],
                [Sequelize.col("Meeting.title"), "title"],
                [Sequelize.col("Meeting.body"), "body"],
                [
                    Sequelize.literal(
                    "(SELECT GROUP_CONCAT('{\"fileName\":\"', Files.fileName, '\",\"fileLocation\":\"', Files.fileLocation, '\"}'SEPARATOR '|') FROM Events JOIN Files ON Events.Id = Files.Id WHERE Files.Id = Meeting.Id)"
                    ),
                    "files"
                ],
                [Sequelize.col("Meeting.location"), "location"],
                [Sequelize.col("Meeting.start"), "start"],
                [Sequelize.col("Meeting.end"), "end"],
                "calendarId",
                [
                    Sequelize.literal(
                        "(SELECT GROUP_CONCAT(DISTINCT Users.userName SEPARATOR ', ') FROM Mentions JOIN Users ON Mentions.userId = Users.userId WHERE Mentions.Id = Events.Id)"
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
        findTotalMeeting.map((item) => {
            if(item.files) {
                item.files = item.files.split("|").map((item) => {
                    return JSON.parse(item)
                })
            }
        })

        const result = findTotalMeeting.map((item) => ({
            ...item,
            mentions: item.mentions.split(", "),
        }));
        console.log("=====================",result);

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