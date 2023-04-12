const {
    Users,
    Schedules,
    Mentions,
    Events,
    Meetings,
    Reports,
    Others,
    MeetingReports,
} = require("../models");
class MypageRepository {
    constructor() {}

    findUserById = async ({ userId }) => {
        return await Users.findOne({ where: { userId } });
    };
    getUserSchedule = async ({ userId }) => {
        const schedule = await Schedules.findAll({
            raw: true,
            where: { userId },
            attributes: [
                "eventId",
                "User.userName",
                "title",
                "file",
                "startDay",
                "endDay",
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
        })
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
        const schedule = await Schedules.findOne({
            raw: true,
            where: { eventId },
            attributes: [
                "eventId",
                "startDay",
                "endDay",
                "User.userName",
                "title",
                "file",
                "Event.eventType",
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                },
                {
                    model: Events,
                    attributes: [],
                },
            ],
        });
        schedule.map((event) => {
            event.fileName = (event.file ?? "").split("/")[3];
        })
        const mention = await Mentions.findOne({
            raw: true,
            where: { eventId, userId },
            attributes: ["mentionId", "isChecked"],
        });
        return Object.assign({}, schedule, mention);
    };

    getMeetingById = async ({ eventId, userId }) => {
        //meeting 테이블과 mention 테이블 합치기
        const meeting = await Meetings.findOne({
            raw: true,
            where: { eventId },
            attributes: [
                "eventId",
                "startDay",
                "startTime",
                "User.userName",
                "title",
                "file",
                "Event.eventType",
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                },
                {
                    model: Events,
                    attributes: [],
                },
            ],
        });
        meeting.map((event) => {
            event.fileName = (event.file ?? "").split("/")[3];
        })
        const mention = await Mentions.findOne({
            raw: true,
            where: { eventId, userId },
            attributes: ["mentionId", "isChecked"],
        });
        return Object.assign({}, meeting, mention);
    };

    getReportById = async ({ eventId, userId }) => {
        //meeting 테이블과 mention 테이블 합치기
        const report = await Reports.findOne({
            raw: true,
            where: { eventId },
            attributes: [
                "eventId",
                "enrollDay",
                "User.userName",
                "title",
                "file",
                "Event.eventType",
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                },
                {
                    model: Events,
                    attributes: [],
                },
            ],
        });
        report.map((event) => {
            event.fileName = (event.file ?? "").split("/")[3];
        })
        const mention = await Mentions.findOne({
            raw: true,
            where: { eventId, userId },
            attributes: ["mentionId", "isChecked"],
        });
        return Object.assign({}, report, mention);
    };

    getOtherById = async ({ eventId, userId }) => {
        //meeting 테이블과 mention 테이블 합치기
        const other = await Others.findOne({
            raw: true,
            where: { eventId },
            attributes: [
                "eventId",
                "startDay",
                "endDay",
                "User.userName",
                "title",
                "file",
                "Event.eventType",
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                },
                {
                    model: Events,
                    attributes: [],
                },
            ],
        });
        other.map((event) => {
            event.fileName = (event.file ?? "").split("/")[3];
        })
        const mention = await Mentions.findOne({
            raw: true,
            where: { eventId, userId },
            attributes: ["mentionId", "isChecked"],
        });
        return Object.assign({}, other, mention);
    };

    getMeetingReportsById = async ({ eventId, userId }) => {
        //meeting 테이블과 mention 테이블 합치기
        const meetingReports = await MeetingReports.findOne({
            raw: true,
            where: { eventId },
            attributes: [
                "eventId",
                "enrollDay",
                "User.userName",
                "title",
                "file",
                "Event.eventType",
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                },
                {
                    model: Events,
                    attributes: [],
                },
            ],
        });
        meetingReports.map((event) => {
            event.fileName = (event.file ?? "").split("/")[3];
        })
        const mention = await Mentions.findOne({
            raw: true,
            where: { eventId, userId },
            attributes: ["mentionId", "isChecked"],
        });
        return Object.assign({}, meetingReports, mention);
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
        });
        return await Promise.all(
            myfile.map(async (event) => {
                if (event.eventType === "Schedules") {
                    const schedule = await Schedules.findOne({
                        raw: true,
                        attributes: ["title", "file"],
                        where: { userId, eventId: event.eventId },
                    });
                    schedule.fileName = schedule.file.split("/")[3];
                    return Object.assign(event, schedule);
                } else if (event.eventType === "Meetings") {
                    const meeting = await Meetings.findOne({
                        raw: true,
                        attributes: ["title", "file"],
                        where: { userId, eventId: event.eventId },
                    });
                    meeting.fileName = meeting.file.split("/")[3];
                    return Object.assign(event, meeting);
                } else if (event.eventType === "Reports") {
                    const report = await Reports.findOne({
                        raw: true,
                        attributes: ["title", "file"],
                        where: { userId, eventId: event.eventId },
                    });
                    report.fileName = report.file.split("/")[3];
                    return Object.assign(event, report);
                } else if (event.eventType === "Others") {
                    const other = await Others.findOne({
                        raw: true,
                        attributes: ["title", "file"],
                        where: { userId, eventId: event.eventId },
                    });
                    other.fileName = other.file.split("/")[3];
                    return Object.assign(event, other);
                } else if (event.eventType === "MeetingReports") {
                    const MeetingReport = await MeetingReports.findOne({
                        raw: true,
                        attributes: ["title", "file"],
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
                });
            })
        )
        return list.flat().map((event) => {
            event.fileName = (event.file ?? "").split("/")[3];
            return event
        })
    };

    findTeamReportFile = async ({team}) => {
        const list = await Promise.all(
            team.map(async (team) => {
                return await Events.findAll({
                    raw: true,
                    attributes: [
                        "eventId",
                        "User.userName",
                        "Report.title",
                        "Report.file",
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
                });
            })
        )
        return list.flat().map((event) => {
            event.fileName = (event.file ?? "").split("/")[3];
            return event
        })
    }
}

module.exports = MypageRepository;
