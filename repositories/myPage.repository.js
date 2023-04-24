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
    Vacations,
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
        return await Schedules.findAll({
            raw: true,
            where: { userId },
            attributes: [
                "Id",
                "User.userName",
                "title",
                [Sequelize.col("fileLocation"), "file"],
                "fileName",
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
    };
    getMention = async ({ userId, type }) => {
        const mentions = await Mentions.findAll({
            raw: true,
            where: { userId },
            attributes: ["Id", "Event.calenderId"],
            include: [
                {
                    model: Events,
                    attributes: [],
                },
            ],
        });
        let result = [];
        mentions.map((mention) => {
            if (mention.calenderId === type) {
                result.push(mention.Id);
            }
        });
        result = new Set(result); //중복제거
        return [...result];
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
                "calenderId",
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
                "calenderId",
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
                "calenderId",
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
                "calenderId",
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
                "calenderId",
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
                "calenderId",
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
        return await Events.findAll({
            raw: true,
            attributes: [
                "Id",
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
                [Sequelize.col("MeetingReport.fileLocation"), "file"],
                "MeetingReport.fileName",
                "calenderId",
            ],
            where: { userId, hasFile: true, calenderId: "MeetingReports" },
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
            order: [["Id", "DESC"]],
        });
    };

    findMyReportfile = async ({ userId }) => {
        return await Events.findAll({
            raw: true,
            attributes: [
                "Id",
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
                [Sequelize.col("Report.fileLocation"), "file"],
                "Report.fileName",
                "calenderId",
            ],
            where: { userId, hasFile: true, calenderId: "Reports" },
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
            order: [["Id", "DESC"]],
        });
    };

    findTeam = async ({ teamId }) => {
        return await Users.findAll({ where: { teamId } });
    };

    findTeamMeetingFile = async ({ team }) => {
        const list = await Promise.all(
            team.map(async (team) => {
                return await Events.findAll({
                    raw: true,
                    attributes: [
                        "Id",
                        "User.userName",
                        "User.userId",
                        "MeetingReport.title",
                        [Sequelize.col("MeetingReport.fileLocation"), "file"],
                        "MeetingReport.fileName",
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
                        calenderId: "MeetingReports",
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
                    order: [["Id", "DESC"]],
                });
            })
        );
        return list.flat()
    };

    findTeamReportFile = async ({ team }) => {
        const list = await Promise.all(
            team.map(async (team) => {
                return await Events.findAll({
                    raw: true,
                    attributes: [
                        "Id",
                        "User.userName",
                        "User.userId",
                        "Report.title",
                        [Sequelize.col("Report.fileLocation"), "file"],
                        "Report.fileName",
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
                        calenderId: "Reports",
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
                    order: [["Id", "DESC"]],
                });
            })
        );
        return list.flat()
    };

    getUserId = async ({ userName }) => {
        return await Users.findOne({
            attributes: ["userId"],
            where: { userName },
        });
    };

    getcalenderId = async ({Id}) => {
        return await Events.findOne({
            attributes: ["Id","calenderId"],
            where: { Id },
        });
    };
    getDetailMyfile = async ({
        Id,
        event,
    }) => {
       if(event.calenderId === "MeetingReports"){
        return await this.getDetailMeetingFile({Id})
       }else if(event.calenderId === "Reports"){
        return await this.getDetailReportFile({Id})
       }
    };

    getDetailMeetingFile = async ({ Id }) => {
        const meetingReport = await Events.findOne({
            raw: true,
            where: { Id: Id },
            attributes: [
                "Id",
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
                [
                    Sequelize.literal(
                        "(SELECT GROUP_CONCAT(DISTINCT Users.userName SEPARATOR ',') FROM Mentions JOIN Users ON Mentions.userId = Users.userId WHERE Mentions.Id = Events.Id)"
                    ),
                    "ref",
                ],
                [Sequelize.col("MeetingReport.fileLocation"), "file"],
                "MeetingReport.fileName",
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
            ],
        });
        meetingReport.ref = meetingReport.ref.split(",");
        return meetingReport;
    };

    getDetailReportFile = async ({ Id }) => {
        const Report = await Events.findOne({
            raw: true,
            where: { Id },
            attributes: [
                "Id",
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
                [
                    Sequelize.literal(
                        "(SELECT GROUP_CONCAT(DISTINCT Users.userName SEPARATOR ',') FROM Mentions JOIN Users ON Mentions.userId = Users.userId WHERE Mentions.Id = Events.Id)"
                    ),
                    "ref",
                ],
                [Sequelize.col("Report.fileLocation"), "file"],
                "Report.fileName",
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
        Report.ref = Report.ref.split(",");
        return Report;
    };

    getVacationProgress = async({userId}) => {
        return await Vacations.findOne({
            attributes : ["status"],
            where : {userId}
        })
    }
}

module.exports = MypageRepository;
