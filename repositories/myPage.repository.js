const moment = require("moment");
const {
    Users,
    Schedules,
    Mentions,
    Events,
    Meetings,
    Reports,
    Others,
    MeetingReports,
    Sequelize,
} = require("../models");
class MypageRepository {
    constructor() {}

    findUserById = async ({ userId }) => {
        return await Users.findOne({ where: { userId } });
    };

    getUserSchedule = async ({ userId, start, pageSize }) => {
        const schedule = await Schedules.findAll({
            raw: true,
            limit: pageSize,
            offset: start,
            where: { userId },
            attributes: [
                "eventId",
                "User.userName",
                "title",
                "file",
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("startDay"),
                        "%m/%d"
                    ),
                    "startDay",
                ],
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("endDay"),
                        "%m/%d"
                    ),
                    "endDay",
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
        });
        schedule.map((event) => {
            event.fileName = (event.file ?? "").split("/")[3];
        });
        return schedule;
    };
    getMention = async ({ userId, type }) => {
        const mentions = await Mentions.findAll({
            raw: true,
            where: { userId },
            attributes: ["eventId", "Event.eventType"],
            include: [
                {
                    model: Events,
                    attributes: [],
                },
            ],
        });
        let result = [];
        mentions.map((mention) => {
            if (mention.eventType === type) {
                result.push(mention.eventId);
            }
        });
        return result;
    };

    getScheduleById = async ({ eventId, userId }) => {
        //schedule 테이블과 mention 테이블 합치기
        return await Events.findOne({
            raw: true,
            where: { eventId },
            attributes: [
                "eventId",
                "Mentions.mentionId",
                "User.userName",
                "Schedule.title",
                "eventType",
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

    getMeetingById = async ({ eventId, userId }) => {
        //meeting 테이블과 mention 테이블 합치기
        return await Events.findOne({
            raw: true,
            where: { eventId },
            attributes: [
                "eventId",
                "Mentions.mentionId",
                "User.userName",
                "Meeting.title",
                "eventType",
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

    getIssueById = async ({ eventId, userId }) => {
        //meeting 테이블과 mention 테이블 합치기
        return await Events.findOne({
            raw: true,
            where: { eventId },
            attributes: [
                "eventId",
                "Mentions.mentionId",
                "User.userName",
                "Meeting.title",
                "eventType",
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

    getReportById = async ({ eventId, userId }) => {
        //report 테이블과 mention 테이블 합치기
        return await Events.findOne({
            raw: true,
            where: { eventId },
            attributes: [
                "eventId",
                "Mentions.mentionId",
                "User.userName",
                "Report.title",
                "eventType",
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

    getOtherById = async ({ eventId, userId }) => {
        //other 테이블과 mention 테이블 합치기
        return await Events.findOne({
            raw: true,
            where: { eventId },
            attributes: [
                "eventId",
                "Mentions.mentionId",
                "User.userName",
                "Other.title",
                "eventType",
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

    getMeetingReportsById = async ({ eventId, userId }) => {
        //meetingreport 테이블과 mention 테이블 합치기
        return await Events.findOne({
            raw: true,
            where: { eventId },
            attributes: [
                "eventId",
                "Mentions.mentionId",
                "User.userName",
                "MeetingReport.title",
                "eventType",
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

    findMyfile = async ({ userId }) => {
        const myfile = await Events.findAll({
            raw: true,
            attributes: ["eventId", "User.userName", "eventType"],
            where: { userId, hasFile: true },
            include: [
                {
                    model: Users,
                    attributes: [],
                },
            ],
            order: [["EventId", "DESC"]],
        });
        return await Promise.all(
            myfile.map(async (event) => {
                if (event.eventType === "Schedules") {
                    const schedule = await Schedules.findOne({
                        raw: true,
                        attributes: [
                            "title",
                            "file",
                            [
                                Sequelize.fn(
                                    "date_format",
                                    Sequelize.col("createdAt"),
                                    "%Y/%m/%d"
                                ),
                                "enrollDay",
                            ],
                        ],
                        where: { userId, eventId: event.eventId },
                    });
                    schedule.fileName = schedule.file.split("/")[3];
                    return Object.assign(event, schedule);
                } else if (event.eventType === "Meetings") {
                    const meeting = await Meetings.findOne({
                        raw: true,
                        attributes: [
                            "title",
                            "file",
                            [
                                Sequelize.fn(
                                    "date_format",
                                    Sequelize.col("createdAt"),
                                    "%Y/%m/%d"
                                ),
                                "enrollDay",
                            ],
                        ],
                        where: { userId, eventId: event.eventId },
                    });
                    meeting.fileName = meeting.file.split("/")[3];
                    return Object.assign(event, meeting);
                } else if (event.eventType === "Issues") {
                    const meeting = await Meetings.findOne({
                        raw: true,
                        attributes: [
                            "title",
                            "file",
                            [
                                Sequelize.fn(
                                    "date_format",
                                    Sequelize.col("createdAt"),
                                    "%Y/%m/%d"
                                ),
                                "enrollDay",
                            ],
                        ],
                        where: { userId, eventId: event.eventId },
                    });
                    meeting.fileName = meeting.file.split("/")[3];
                    return Object.assign(event, meeting);
                } else if (event.eventType === "Reports") {
                    const report = await Reports.findOne({
                        raw: true,
                        attributes: [
                            "title",
                            "file",
                            [
                                Sequelize.fn(
                                    "date_format",
                                    Sequelize.col("createdAt"),
                                    "%Y/%m/%d"
                                ),
                                "enrollDay",
                            ],
                        ],
                        where: { userId, eventId: event.eventId },
                    });
                    report.fileName = report.file.split("/")[3];
                    return Object.assign(event, report);
                } else if (event.eventType === "Others") {
                    const other = await Others.findOne({
                        raw: true,
                        attributes: [
                            "title",
                            "file",
                            [
                                Sequelize.fn(
                                    "date_format",
                                    Sequelize.col("createdAt"),
                                    "%Y/%m/%d"
                                ),
                                "enrollDay",
                            ],
                        ],
                        where: { userId, eventId: event.eventId },
                    });
                    other.fileName = other.file.split("/")[3];
                    return Object.assign(event, other);
                } else if (event.eventType === "MeetingReports") {
                    const MeetingReport = await MeetingReports.findOne({
                        raw: true,
                        attributes: [
                            "title",
                            "file",
                            [
                                Sequelize.fn(
                                    "date_format",
                                    Sequelize.col("createdAt"),
                                    "%Y/%m/%d"
                                ),
                                "enrollDay",
                            ],
                        ],
                        where: { userId, eventId: event.eventId },
                    });
                    MeetingReport.fileName = MeetingReport.file.split("/")[3];
                    return Object.assign(event, MeetingReport);
                }
            })
        );
    };

    findTeam = async ({ userId }) => {
        const user = await Users.findOne({ where: { userId } });
        return await Users.findAll({ where: { teamId: user.teamId } });
    };
    findTeamMeetingFile = async ({ team }) => {
        const list = await Promise.all(
            team.map(async (team) => {
                return await Events.findAll({
                    raw: true,
                    attributes: [
                        "eventId",
                        "User.userName",
                        "MeetingReport.title",
                        "MeetingReport.file",
                        "MeetingReport.enrollDay",
                    ],
                    where: {
                        userId: team.userId,
                        hasFile: true,
                        eventType: "MeetingReports",
                    },
                    include: [
                        {
                            model: MeetingReports,
                            attributes: [],
                        },
                        {
                            model: Users,
                            attributes: [],
                        },
                    ],
                    order: [["eventId", "DESC"]],
                }).then((data) => {
                    return data.map((item) => {
                        let enrollDay = moment(item.enrollDay);
                        enrollDay = enrollDay.format("YYYY/MM/DD");
                        return {
                            eventId: item.eventId,
                            userName: item.userName,
                            title: item.title,
                            file: item.file,
                            enrollDay: enrollDay,
                        };
                    });
                });
            })
        );
        console.log(list);
        return list.flat().map((event) => {
            event.fileName = (event.file ?? "").split("/")[3];
            return event;
        });
    };

    findTeamReportFile = async ({ team }) => {
        const list = await Promise.all(
            team.map(async (team) => {
                return await Events.findAll({
                    raw: true,
                    attributes: [
                        "eventId",
                        "User.userName",
                        "Report.title",
                        "Report.file",
                        "Report.enrollDay",
                    ],
                    where: {
                        userId: team.userId,
                        hasFile: true,
                        eventType: "Reports",
                    },
                    include: [
                        {
                            model: Reports,
                            attributes: [],
                        },
                        {
                            model: Users,
                            attributes: [],
                        },
                    ],
                    order: [["eventId", "DESC"]],
                }).then((data) => {
                    return data.map((item) => {
                        let enrollDay = moment(item.enrollDay);
                        enrollDay = enrollDay.format("YYYY/MM/DD");
                        return {
                            eventId: item.eventId,
                            userName: item.userName,
                            title: item.title,
                            file: item.file,
                            enrollDay: enrollDay,
                        };
                    });
                });
            })
        );
        return list.flat().map((event) => {
            event.fileName = (event.file ?? "").split("/")[3];
            return event;
        });
    };
}

module.exports = MypageRepository;
