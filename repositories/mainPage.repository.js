const {Users, Schedules, Events, Mentions, sequelize, Files, Vacations, Meetings, Reports, Others, MeetingReports, Teams, Sequelize} = require('../models')
const CustomError = require('../middlewares/errorHandler')
const { Op } = require('sequelize')

class MainPageRepository {
    // 휴가 전체 조회
    findTotalVacation = async({teamId, year, month}) => {
        console.log("111111111111111111111111",year, month)
        // 시작일은 해당 년도와 달의 1일
        const startDate = new Date(year, month - 1, 1);
        // 종료일은 해당 년도와 달의 마지막 일
        const endDate = new Date(year, month, 0)

        console.log("===========================",startDate, endDate)
        const findTotalVacation = await Events.findAll({
            raw: true,
            where: {
                calendarId: "4", // Vacations
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
                "isReadOnly",
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
        console.log("=======================", year, month)
        // 시작일은 해당 년도와 달의 1일
        const startDate = new Date(year, month - 1, 1);
        // 종료일은 해당 년도와 달의 마지막 일
        const endDate = new Date(year, month, 0)

        console.log("=======================",startDate, endDate)
        const findTotalSchedule = await Events.findAll({
            raw: true,
            where: {
                calendarId: "2", // Schedules
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
                [Sequelize.col("Schedule.location"), "location"],
                [
                    Sequelize.literal(
                    "(SELECT JSON_ARRAYAGG(JSON_OBJECT('fileName', Files.fileName, 'fileLocation', Files.fileLocation)) AS files FROM Events JOIN Files ON Events.Id = Files.Id WHERE Files.Id = Schedule.Id)"
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
                    "attendees",
                ],
                "isReadOnly",
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
        console.log("###########findTotalSchedule##########", findTotalSchedule)
        const result = (findTotalSchedule || []).map((item) => {
            const newItem = {...item};
            if(newItem.attendees) {
                newItem.attendees = newItem.attendees.split(', ')
            }
            return newItem
        })
        console.log("@@@@@@@@@@@result@@@@@@@@@@", result)

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
                calendarId: "3", // Issues
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
                    "(SELECT JSON_ARRAYAGG(JSON_OBJECT('fileName', Files.fileName, 'fileLocation', Files.fileLocation)) AS files FROM Events JOIN Files ON Events.Id = Files.Id WHERE Files.Id = Meeting.Id)"
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
                    "attendees",
                ],
                "isReadOnly",
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
        const result = (findTotalIssue || []).map((item) => {
            const newItem = {...item};
            if(newItem.attendees) {
                newItem.attendees = newItem.attendees.split(', ')
            }
            return newItem
        })
        console.log("@@@@@@@@@@@result@@@@@@@@@@", result)

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
                calendarId: "0", // Meetings
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
                    "(SELECT JSON_ARRAYAGG(JSON_OBJECT('fileName', Files.fileName, 'fileLocation', Files.fileLocation)) AS files FROM Events JOIN Files ON Events.Id = Files.Id WHERE Files.Id = Meeting.Id)"
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
                    "attendees",
                ],
                "isReadOnly",
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
        const result = (findTotalMeeting || []).map((item) => {
            const newItem = {...item};
            if(newItem.attendees) {
                newItem.attendees = newItem.attendees.split(', ')
            }
            return newItem
        })
        console.log("@@@@@@@@@@@result@@@@@@@@@@", result)

        return result
    }

    // 기타일정
    findTotalEvent = async({teamId, year, month}) => {
        // 시작일은 해당 년도와 달의 1일
        const startDate = new Date(year, month - 1, 1);
        // 종료일은 해당 년도와 달의 마지막 일
        const endDate = new Date(year, month, 0)

        // console.log("=================",startDate, endDate)
        const findTotalEvent = await Events.findAll({
            raw: true,
            where: {
                calendarId: "1", // event
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
                    "(SELECT JSON_ARRAYAGG(JSON_OBJECT('fileName', Files.fileName, 'fileLocation', Files.fileLocation)) AS files FROM Events JOIN Files ON Events.Id = Files.Id WHERE Files.Id = Meeting.Id)"
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
                    "attendees",
                ],
                "isReadOnly",
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

        const result = (findTotalEvent || []).map((item) => {
            const newItem = {...item};
            if(newItem.attendees) {
                newItem.attendees = newItem.attendees.split(', ')
            }
            return newItem
        })
        console.log("@@@@@@@@@@@result@@@@@@@@@@", result)

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