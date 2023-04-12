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
    getUserSchedule = async ({ userId, start, pageSize }) => {
        return await Schedules.findAll({
            raw: true,
            limit: pageSize,
            offset: start,
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
}

module.exports = MypageRepository;
