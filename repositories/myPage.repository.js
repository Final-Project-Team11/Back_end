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
    MeetingReports,
    Sequelize,
} = require("../models");
class MypageRepository {
    constructor() {}

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
        const schedule = await Schedules.findAll({
            raw: true,
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

    findMyMeetingfile = async ({ userId }) => {
        const myfile = await Events.findAll({
            raw: true,
            attributes: [
                "eventId", 
                [Sequelize.fn("date_format",Sequelize.col("MeetingReport.enrollDay"),"%Y/%m/%d"),"enrollDay"],
                "User.userName", 
                "MeetingReport.title",
                "MeetingReport.file",
                "eventType"
            ],
            where: { userId, hasFile: true ,eventType : "MeetingReports"},
            include: [
                {
                    model: Users,
                    attributes: [],
                },
                {
                    model: MeetingReports,
                    attributes: [],
                },
            ],
            order: [["EventId", "DESC"]],
        });
        myfile.map((event) => {
            event.fileName = (event.file ?? "").split("/")[3];
            return event
        })
        return myfile
    };

    findMyReportfile = async ({ userId }) => {
        const report = await Events.findAll({
            raw: true,
            attributes: [
                "eventId", 
                [Sequelize.fn("date_format",Sequelize.col("Report.enrollDay"),"%Y/%m/%d"),"enrollDay"],
                "User.userName", 
                "Report.title",
                "Report.file",
                "eventType"
            ],
            where: { userId, hasFile: true,eventType : "Reports" },
            include: [
                {
                    model: Users,
                    attributes: [],
                },
                {
                    model: Reports,
                    attributes: [],
                },
            ],
            order: [["EventId", "DESC"]],
        });
        report.map((event) => {
            event.fileName = (event.file ?? "").split("/")[3];
            return event
        })
        return report
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
                        [
                            Sequelize.fn(
                                "date_format",
                                Sequelize.col("MeetingReport.enrollDay"),
                                "%Y/%m/%d"
                            ),
                            "enrollDay",
                        ],
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
                });
            })
        );
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
                        [
                            Sequelize.fn(
                                "date_format",
                                Sequelize.col("Report.enrollDay"),
                                "%Y/%m/%d"
                            ),
                            "enrollDay",
                        ],
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
                });
            })
        );
        return list.flat().map((event) => {
            event.fileName = (event.file ?? "").split("/")[3];
            return event;
        });
    };

    getDetailMeetingFile = async ({ eventId, userId }) => {
        const meetingReport =  await Events.findOne({
            raw : true,
            where : {eventId, userId},
            attributes : [
                "eventId",
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("MeetingReport.enrollDay"),
                        "%Y/%m/%d"
                    ),
                    "enrollDay",
                ],
                "User.userName",
                "MeetingReport.title",
                "MeetingReport.content",
                "MeetingReport.file",
            ],
            include: [
                {
                    model: MeetingReports,
                    attributes: [],
                },
                {
                    model: Users,
                    attributes: [],
                },
            ]
        })
        meetingReport.fileName = meetingReport.file.split("/")[3];
        return meetingReport;
    };

    getDetailReportFile = async ({ eventId, userId }) => {
        const Report = await Events.findOne({
            raw: true,
            where: { eventId, userId },
            attributes: [
                "eventId",
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("Report.enrollDay"),
                        "%Y/%m/%d"
                    ),
                    "enrollDay",
                ],
                "User.userName",
                "Report.title",
                "Report.content",
                "Report.file",
            ],
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
        console.log(Report);
        // Report.fileName = Report.file.split("/")[3];
        return Report;
    };
}

module.exports = MypageRepository;
