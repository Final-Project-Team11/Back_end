const moment = require("moment");
const {
    Users,
    Teams,
    Schedules,
    Mentions,
    Events,
    Meetings,
    Reports,
    Others,
    Files,
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
                        Sequelize.col("start"),
                        "%m/%d"
                    ),
                    "start",
                ],
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("end"),
                        "%m/%d"
                    ),
                    "end",
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
            schedule.files = (schedule.files?? "").split("|").map((item) => {
                return JSON.parse(item)
            })
        })
        return schedules

    };
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

    getIssueById = async ({ Id, userId }) => {
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
            meetingReport.files = (meetingReport.files?? "").split("|").map((item) => {
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
                [
                    Sequelize.literal(
                        "(SELECT GROUP_CONCAT('{\"fileName\":\"', Files.fileName, '\",\"fileLocation\":\"', Files.fileLocation, '\"}'SEPARATOR '|') FROM Events JOIN Files ON Events.Id = Files.Id WHERE Files.Id = Reports.Id)"
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
                    where: { calendarId: "6", hasFile: true }
                },
            ],
            order: [["Id", "DESC"]],
        });
        reports.map((report) => {
            report.files = (report.files.split("|") ?? "").map((item) => {
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
                        "User.userName",
                        "User.userId",
                        "title",
                        [
                            Sequelize.literal(
                                "(SELECT GROUP_CONCAT('{\"fileName\":\"', Files.fileName, '\",\"fileLocation\":\"', Files.fileLocation, '\"}'SEPARATOR '|') FROM Events JOIN Files ON Events.Id = Files.Id WHERE Files.Id = MeetingReports.Id)"
                            ),
                            "files"
                        ],
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
            event.files = (event.files.split("|")?? "").map((item) => {
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
                        "User.userName",
                        "User.userId",
                        "title",
                        [
                            Sequelize.literal(
                                "(SELECT GROUP_CONCAT('{\"fileName\":\"', Files.fileName, '\",\"fileLocation\":\"', Files.fileLocation, '\"}'SEPARATOR '|') FROM Events JOIN Files ON Events.Id = Files.Id WHERE Files.Id = Reports.Id)"
                            ),
                            "files"
                        ],
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
            event.files = (event.files?? "").split("|").map((item) => {
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

        meetingReport.files = (meetingReport.files?? "").split("|").map((item) => {
            return JSON.parse(item)
        })
        meetingReport.attendees = (meetingReport.attendees?? "").split(",");
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
        Report.files = (Report.files?? "").split("|").map((item) => {
            return JSON.parse(item)
        })
        Report.attendees = (Report.attendees?? "").split(",");
        return Report;
    };

    getVacationProgress = async ({ userId }) => {
        return await Vacations.findOne({
            attributes: ["status"],
            where: { userId }
        })
    }
}

module.exports = MypageRepository;
