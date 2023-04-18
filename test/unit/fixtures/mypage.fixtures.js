const { file } = require("@babel/types");
const { createDeflate } = require("zlib");

exports.MypageUserInfoSchemaByController = {
    user: {
        userName: "test1",
        team: "dev",
        remainDay: 15,
        salaryDay: 4,
    },
};

exports.MypageUserIdInsertSchema = {
    userId: "test1",
};

exports.MyScheduleResultSchema = {
    schedule: {
        eventId: 1,
        userName: "test1",
        title: "test title",
        file: "http://asd.png",
        startDay: "2023-04-04",
        endDay: "2024-04-05",
        status: "submit",
        fileName: "asd.png",
    },
};

exports.MentionScheduleResultSchema = {
    eventId: 1,
    mentionId: 1,
    userName: "test1",
    title: "test title",
    eventType: "Schedules",
    isChecked: false,
};

exports.MyMentionInsertSchema = {
    userId: "test1",
    eventId: 1,
};

exports.MentionCheckInsertSchema = {
    mentionId: 1,
};

exports.MentionCheckResultSchema = {
    mentionId: 1,
    userId: "test1",
    eventId: 4,
    isChecked: false,
    createdAt: "2023-04-08",
    updatedAt: "2023-04-08",
};

exports.MentionUpdateInsertSchema = {
    mentionId: 1,
    check: true,
};

exports.MentionUpdateResultSchema = {
    mentionId: 1,
    userId: "test1",
    eventId: 4,
    isChecked: true,
    createdAt: "2023-04-08",
    updatedAt: "2023-04-08",
};

exports.MyfileInsertSchema = {
    userId: "test1",
    eventType: "Schedules",
};

exports.MyfileResultSchema = {
    title: "test title",
    file: "http://asd.png",
    enrollDay: "2023-04-05",
    fileName: "asd.png",
};

exports.MyfileAllResultSchema = [
    {
        eventId: 1,
        userName: "testman",
        eventType: "Schedules",
        title: "test title",
        file: "http://asd.png",
        enrollDay: "2023-04-05",
        fileName: "asd.png",
    },
    {
        eventId: 2,
        userName: "testman",
        eventType: "Meetings",
        title: "test title",
        file: "http://asd.png",
        enrollDay: "2023-04-05",
        fileName: "asd.png",
    },
    {
        eventId: 3,
        userName: "testman",
        eventType: "Reports",
        title: "test title",
        file: "http://asd.png",
        enrollDay: "2023-04-05",
        fileName: "asd.png",
    },
];

exports.TeamMemberInsertSchema = [
    {
        teamId: 1,
        userId: "test1",
    },
    {
        teamId: 1,
        userId: "test2",
    },
    {
        teamId: 1,
        userId: "test3",
    },
];

exports.TeamMenberResultSchema = [
    {
        eventId : 1,
        userName : "test1",
        title: "test title",
        file: "http://asd.png",
        enrollDay: "2023-04-05",
        fileName: "asd.png",
    },
    {
        eventId : 2,
        userName : "test2",
        title: "test title",
        file: "http://asd.png",
        enrollDay: "2023-04-05",
        fileName: "asd.png",
    },
    {
        eventId : 3,
        userName : "test3",
        title: "test title",
        file: "http://asd.png",
        enrollDay: "2023-04-05",
        fileName: "asd.png",
    }
]
