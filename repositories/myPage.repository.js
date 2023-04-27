const moment = require("moment");
const { Op } = require('sequelize')
const {
    Users,
    Teams,
    Schedules,
    Mentions,
    Events,
    Meetings,
    Reports,
    Others,
    Vacations,
    MeetingReports,
    Sequelize,
} = require("../models");
class MypageRepository {
    constructor() { }

    findUserById = async ({ userId }) => {
        return await Users.findOne({
            raw: true,
            where: { userId },
            attributes: [
                "userId",
                "userName",
                "Team.teamName",
                "remainDay",
                "salaryDay",
                "profileImg"
            ],
            include: [
                {
                    model: Teams,
                    attributes: [],
                },
            ],
        });
    };

    getUserSchedule = async ({ userId }) => {
        const schedules = await Schedules.findAll({
            raw: true,
            where: { userId },
            attributes: [
                "Id",
                "User.userName",
                "title",
                [
                    Sequelize.literal(
                        "(SELECT GROUP_CONCAT('{\"fileName\":\"', Files.fileName, '\",\"fileLocation\":\"', Files.fileLocation, '\"}'SEPARATOR '|') FROM Events JOIN Files ON Events.Id = Files.Id WHERE Files.Id = Schedules.Id)"
                    ),
                    "files"
                ],
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("Schedules.createdAt"),
                        "%m/%d"
                    ),
                    "enroll",
                ],
                "status",
            ],
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Users,
                    attributes: [],
                },
            ],
        })
        schedules.map((schedule) => {
            if (schedule.files) {
                schedule.files = schedule.files.split("|").map((item) => {
                    return JSON.parse(item)
                })
            }
            return;
        })
        return schedules
    };

    getUserOther = async ({ userId }) => {
        const others = await Others.findAll({
            raw: true,
            where: { userId },
            attributes: [
                "Id",
                "User.userName",
                "title",
                [
                    Sequelize.literal(
                        "(SELECT GROUP_CONCAT('{\"fileName\":\"', Files.fileName, '\",\"fileLocation\":\"', Files.fileLocation, '\"}'SEPARATOR '|') FROM Events JOIN Files ON Events.Id = Files.Id WHERE Files.Id = Others.Id)"
                    ),
                    "files"
                ],
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("Others.createdAt"),
                        "%m/%d"
                    ),
                    "enroll",
                ],
                "status",
            ],
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Users,
                    attributes: [],
                },
            ],
        })
        others.map((other) => {
            if (other.files) {
                other.files = other.files.split("|").map((item) => {
                    return JSON.parse(item)
                })
            }
            return;
        })
        return others
    }

    getMention = async ({ userId, type }) => {
        const mentions = await Mentions.findAll({
            raw: true,
            where: { userId },
            attributes: ["Id"],
            include: [
                {
                    model: Events,
                    attributes: [],
                    where: { calendarId: type }
                },
            ],
        });
        return [...mentions].map(item => item.Id);
    };

    getScheduleById = async ({ Id, userId }) => {
        //schedule 테이블과 mention 테이블 합치기
        return await Events.findOne({
            raw: true,
            where: { Id },
            attributes: [
                "Id",
                "Mentions.mentionId",
                "User.userName",
                "Schedule.title",
                "calendarId",
                "Mentions.isChecked",
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                },
                {
                    model: Schedules,
                    attributes: [],
                },
                {
                    model: Mentions,
                    attributes: [],
                    where: { userId },
                },
            ],
        });
    };

    getMeetingById = async ({ Id, userId }) => {
        //meeting 테이블과 mention 테이블 합치기
        return await Events.findOne({
            raw: true,
            where: { Id },
            attributes: [
                "Id",
                "Mentions.mentionId",
                "User.userName",
                "Meeting.title",
                "calendarId",
                "Mentions.isChecked",
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                },
                {
                    model: Meetings,
                    attributes: [],
                },
                {
                    model: Mentions,
                    attributes: [],
                    where: { userId },
                },
            ],
        });
    };

    getReportById = async ({ Id, userId }) => {
        //report 테이블과 mention 테이블 합치기
        return await Events.findOne({
            raw: true,
            where: { Id },
            attributes: [
                "Id",
                "Mentions.mentionId",
                "User.userName",
                "Report.title",
                "calendarId",
                "Mentions.isChecked",
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                },
                {
                    model: Reports,
                    attributes: [],
                },
                {
                    model: Mentions,
                    attributes: [],
                    where: { userId },
                },
            ],
        });
    };

    getOtherById = async ({ Id, userId }) => {
        //other 테이블과 mention 테이블 합치기
        return await Events.findOne({
            raw: true,
            where: { Id },
            attributes: [
                "Id",
                "Mentions.mentionId",
                "User.userName",
                "Other.title",
                "calendarId",
                "Mentions.isChecked",
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                },
                {
                    model: Others,
                    attributes: [],
                },
                {
                    model: Mentions,
                    attributes: [],
                    where: { userId },
                },
            ],
        });
    };

    getMeetingReportsById = async ({ Id, userId }) => {
        //meetingreport 테이블과 mention 테이블 합치기
        return await Events.findOne({
            raw: true,
            where: { Id },
            attributes: [
                "Id",
                "Mentions.mentionId",
                "User.userName",
                "MeetingReport.title",
                "calendarId",
                "Mentions.isChecked",
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                },
                {
                    model: MeetingReports,
                    attributes: [],
                },
                {
                    model: Mentions,
                    attributes: [],
                    where: { userId },
                },
            ],
        });
    };

    findMention = async ({ mentionId }) => {
        return await Mentions.findOne({ where: { mentionId } });
    };

    updateMention = async ({ mentionId, check }) => {
        await Mentions.update(
            {
                isChecked: check,
            },
            {
                where: { mentionId },
            }
        );
    };

    findMyMeetingfile = async ({ userId }) => {
        const meetingReports = await MeetingReports.findAll({
            raw: true,
            attributes: [
                "Id",
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("MeetingReports.createdAt"),
                        "%Y/%m/%d"
                    ),
                    "enroll",
                ],
                "User.userName",
                "title",
                [
                    Sequelize.literal(
                        "(SELECT GROUP_CONCAT('{\"fileName\":\"', Files.fileName, '\",\"fileLocation\":\"', Files.fileLocation, '\"}'SEPARATOR '|') FROM Events JOIN Files ON Events.Id = Files.Id WHERE Files.Id = MeetingReports.Id)"
                    ),
                    "files"
                ],
                "Event.calendarId",
            ],
            where: { userId },
            include: [
                {
                    model: Users,
                    attributes: [],
                },
                {
                    model: Events,
                    attributes: [],
                    where: { calendarId: "5", hasFile: true }
                },
            ],
            order: [["Id", "DESC"]],
        });
        meetingReports.map((meetingReport) => {
            meetingReport.files = (meetingReport.files ?? "").split("|").map((item) => {
                return JSON.parse(item)
            })
        })
        return meetingReports
    };

    findMyReportfile = async ({ userId }) => {
        const reports = await Reports.findAll({
            raw: true,
            attributes: [
                "Id",
                "Event.calendarId",
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("Reports.createdAt"),
                        "%Y/%m/%d"
                    ),
                    "enroll",
                ],
                "User.userName",
                "title",
                [
                    Sequelize.literal(
                        "(SELECT GROUP_CONCAT('{\"fileName\":\"', Files.fileName, '\",\"fileLocation\":\"', Files.fileLocation, '\"}'SEPARATOR '|') FROM Events JOIN Files ON Events.Id = Files.Id WHERE Files.Id = Reports.Id)"
                    ),
                    "files"
                ],
            ],
            where: { userId },
            include: [
                {
                    model: Users,
                    attributes: [],
                },
                {
                    model: Events,
                    attributes: [],
                    where: { calendarId: "6", hasFile: true }
                },
            ],
            order: [["Id", "DESC"]],
        });
        reports.map((report) => {
            report.files = (report.files ?? "").split("|").map((item) => {
                return JSON.parse(item)
            })
        })
        return reports
    };

    findTeam = async ({ teamId }) => {
        return await Users.findAll({ where: { teamId } });
    };

    findTeamMeetingFile = async ({ team }) => {
        const list = await Promise.all(
            team.map(async (team) => {
                return await MeetingReports.findAll({
                    raw: true,
                    attributes: [
                        "Id",
                        "Event.calendarId",
                        [
                            Sequelize.fn(
                                "date_format",
                                Sequelize.col("MeetingReports.createdAt"),
                                "%Y/%m/%d"
                            ),
                            "enroll",
                        ],
                        "User.userName",
                        "User.userId",
                        "title",
                        [
                            Sequelize.literal(
                                "(SELECT GROUP_CONCAT('{\"fileName\":\"', Files.fileName, '\",\"fileLocation\":\"', Files.fileLocation, '\"}'SEPARATOR '|') FROM Events JOIN Files ON Events.Id = Files.Id WHERE Files.Id = MeetingReports.Id)"
                            ),
                            "files"
                        ],
                    ],
                    where: {
                        userId: team.userId,
                    },
                    include: [
                        {
                            model: Events,
                            attributes: [],
                            where: {
                                hasFile: true,
                                calendarId: "5",
                            }
                        },
                        {
                            model: Users,
                            attributes: [],
                        },
                    ],
                    order: [["Id", "DESC"]],
                });
            })
        );
        const lists = list.flat()
        lists.map((event) => {
            event.files = (event.files ?? "").split("|").map((item) => {
                return JSON.parse(item)
            })
        })
        return lists
    };

    findTeamReportFile = async ({ team }) => {
        const list = await Promise.all(
            team.map(async (team) => {
                return await Reports.findAll({
                    raw: true,
                    attributes: [
                        "Id",
                        "Event.calendarId",
                        [
                            Sequelize.fn(
                                "date_format",
                                Sequelize.col("Reports.createdAt"),
                                "%Y/%m/%d"
                            ),
                            "enroll",
                        ],
                        "User.userName",
                        "User.userId",
                        "title",
                        [
                            Sequelize.literal(
                                "(SELECT GROUP_CONCAT('{\"fileName\":\"', Files.fileName, '\",\"fileLocation\":\"', Files.fileLocation, '\"}'SEPARATOR '|') FROM Events JOIN Files ON Events.Id = Files.Id WHERE Files.Id = Reports.Id)"
                            ),
                            "files"
                        ],
                    ],
                    where: {
                        userId: team.userId,
                    },
                    include: [
                        {
                            model: Events,
                            attributes: [],
                            where: {
                                hasFile: true,
                                calendarId: "6",
                            }
                        },
                        {
                            model: Users,
                            attributes: [],
                        },
                    ],
                    order: [["Id", "DESC"]],
                });
            })
        );
        const lists = list.flat()
        lists.map((event) => {
            event.files = (event.files ?? "").split("|").map((item) => {
                return JSON.parse(item)
            })
        })
        return lists
    };

    getUserId = async ({ userName }) => {
        return await Users.findOne({
            attributes: ["userId"],
            where: { userName },
        });
    };

    getcalendarId = async ({ Id }) => {
        return await Events.findOne({
            attributes: ["Id", "calendarId"],
            where: { Id },
        });
    };
    findEvent = async ({ Id}) => {
        return await Events.findOne({
            where: {
                Id,
            }
        })
    }
    findEventdetail = async ({ Id, eventType }) => {
        return await Events.findOne({
            where: {
                Id,
                calendarId : eventType
            }
        })
    }
    getDetailMyfile = async ({
        Id,
        event,
    }) => {
        if (event.calendarId === "5") {
            return await this.getDetailMeetingFile({ Id })
        } else if (event.calendarId === "6") {
            return await this.getDetailReportFile({ Id })
        }
    };

    getDetailMeetingFile = async ({ Id }) => {
        const meetingReport = await MeetingReports.findOne({
            raw: true,
            where: { Id },
            attributes: [
                "Id",
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("start"),
                        "%Y/%m/%d"
                    ),
                    "start",
                ],
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("end"),
                        "%Y/%m/%d"
                    ),
                    "end",
                ],
                "User.userName",
                "title",
                "body",
                [
                    Sequelize.literal(
                        "(SELECT GROUP_CONCAT(DISTINCT Users.userName SEPARATOR ',') FROM Mentions JOIN Users ON Mentions.userId = Users.userId WHERE Mentions.Id = MeetingReports.Id)"
                    ),
                    "attendees",
                ],
                [
                    Sequelize.literal(
                        "(SELECT GROUP_CONCAT('{\"fileName\":\"', Files.fileName, '\",\"fileLocation\":\"', Files.fileLocation, '\"}'SEPARATOR '|') FROM Events JOIN Files ON Events.Id = Files.Id WHERE Files.Id = MeetingReports.Id)"
                    ),
                    "files"
                ],
            ],
            include: [
                {
                    model: Events,
                    attributes: [],
                },
                {
                    model: Users,
                    attributes: [],
                },
            ],
        });
        if (meetingReport.files) {
            meetingReport.files = (meetingReport.files ?? "").split("|").map((item) => {
                return JSON.parse(item)
            })
        }
        meetingReport.attendees = (meetingReport.attendees ?? "").split(",");
        return meetingReport;
    };

    getDetailReportFile = async ({ Id }) => {
        const Report = await Reports.findOne({
            raw: true,
            where: { Id },
            attributes: [
                "Id",
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("start"),
                        "%Y/%m/%d"
                    ),
                    "start",
                ],
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("end"),
                        "%Y/%m/%d"
                    ),
                    "end",
                ],
                "User.userName",
                "title",
                "body",
                [
                    Sequelize.literal(
                        "(SELECT GROUP_CONCAT(DISTINCT Users.userName SEPARATOR ',') FROM Mentions JOIN Users ON Mentions.userId = Users.userId WHERE Mentions.Id = Reports.Id)"
                    ),
                    "attendees",
                ],
                [
                    Sequelize.literal(
                        "(SELECT GROUP_CONCAT('{\"fileName\":\"', Files.fileName, '\",\"fileLocation\":\"', Files.fileLocation, '\"}'SEPARATOR '|') FROM Events JOIN Files ON Events.Id = Files.Id WHERE Files.Id = Reports.Id)"
                    ),
                    "files"
                ],
            ],
            include: [
                {
                    model: Events,
                    attributes: [],
                },
                {
                    model: Users,
                    attributes: [],
                },
            ],
        });
        if (Report.files) {
            Report.files = Report.files.split("|").map((item) => {
                return JSON.parse(item)
            })
        }
        Report.attendees = (Report.attendees ?? "").split(",");
        return Report;
    };

    getVacationProgress = async ({ userId }) => {
        return await Vacations.findOne({
            attributes: ["status"],
            where: { userId }
        })
    }

    getWeeklyMeeting = async({teamId,year,month,day}) => {
        const startDate = new Date(year, month - 1,Number(day) + 1);
        const endDate = new Date(year, month -1, Number(day) + 7)
        return await Events.findAll({
            raw: true,
            where: {
                calendarId: "0", // Meeting
                [Op.and]: [
                    {
                        "$Meeting.start$": { // Meetings.start 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                    {
                        "$Meeting.end$": { // Meetings.end 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                ],
            },
            attributes: [
                "Id",
                "User.userName",
                "Meeting.userId",
                "Meeting.title",
                "Meeting.body",
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("Meeting.start"),
                        "%Y/%m/%d"
                    ),
                    "start",
                ],
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("Meeting.end"),
                        "%Y/%m/%d"
                    ),
                    "end",
                ],
                "calendarId",
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
                },
            ],
        })
    }

    getWeeklyOther = async({teamId,year,month,day}) => {
        const startDate = new Date(year, month - 1,Number(day) + 1);
        const endDate = new Date(year, month -1, Number(day) + 7)
        return await Events.findAll({
            raw: true,
            where: {
                calendarId: "1", // 기타일정
                [Op.and]: [
                    {
                        "$Meeting.start$": { // Meetings.start 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                    {
                        "$Meeting.end$": { // Meetings.end 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                ],
            },
            attributes: [
                "Id",
                "User.userName",
                "Meeting.userId",
                "Meeting.title",
                "Meeting.body",
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("Meeting.start"),
                        "%Y/%m/%d"
                    ),
                    "start",
                ],
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("Meeting.end"),
                        "%Y/%m/%d"
                    ),
                    "end",
                ],
                "calendarId",
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
                },
            ],
        })
    }

    getWeeklySchedule = async({teamId,year,month,day}) => {
        const startDate = new Date(year, month - 1,Number(day) + 1);
        const endDate = new Date(year, month -1, Number(day) + 7)
        return await Events.findAll({
            raw: true,
            where: {
                calendarId: "2", // schedule
                [Op.and]: [
                    {
                        "$Schedule.start$": { // Meetings.start 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                    {
                        "$Schedule.end$": { // Meetings.end 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                ],
            },
            attributes: [
                "Id",
                "User.userName",
                "Schedule.userId",
                "Schedule.title",
                "Schedule.body",
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("Schedule.start"),
                        "%Y/%m/%d"
                    ),
                    "start",
                ],
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("Schedule.end"),
                        "%Y/%m/%d"
                    ),
                    "end",
                ],
                "calendarId",
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
    }

    getWeeklyIssue = async({teamId,year,month,day}) => {
        const startDate = new Date(year, month - 1,Number(day) + 1);
        const endDate = new Date(year, month -1, Number(day) + 7)
        return await Events.findAll({
            raw: true,
            where: {
                calendarId: "3", // issue
                [Op.and]: [
                    {
                        "$Meeting.start$": { // Meetings.start 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                    {
                        "$Meeting.end$": { // Meetings.end 컬럼 참조
                            [Op.between]: [startDate, endDate],
                        },
                    },
                ],
            },
            attributes: [
                "Id",
                "User.userName",
                "Meeting.userId",
                "Meeting.title",
                "Meeting.body",
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("Meeting.start"),
                        "%Y/%m/%d"
                    ),
                    "start",
                ],
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("Meeting.end"),
                        "%Y/%m/%d"
                    ),
                    "end",
                ],
                "calendarId",
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
                },
            ],
        })
    }
}

module.exports = MypageRepository;
