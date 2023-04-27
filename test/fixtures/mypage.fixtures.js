exports.MypageUserInfoSchemaByController = {
    user: {
        userName: "testman",
        team: "dev",
        remainDay: 15,
        salaryDay: 4,
    },
};
exports.MypageUserSchemaByController = {
    userId: "test1",
    userName: "testman",
    team: "dev",
    remainDay: 15,
    salaryDay: 4,
};

exports.MypageonlyUserIdInsertSchema = {
    userId: "test1",
};

exports.MypageUserIdInsertSchema = {
    type: "Schedules",
    userId: "test1",
};

exports.MyScheduleResultSchema = [
    {
        eventId: 1,
        userName: "test1",
        title: "test title",
        file: "http://asd.png",
        startDay: "2023-04-04",
        endDay: "2024-04-05",
        status: "submit",
        fileName: "asd.png",
    },
    {
        eventId: 2,
        userName: "test2",
        title: "test title",
        file: "http://asd.png",
        startDay: "2023-04-04",
        endDay: "2024-04-05",
        status: "submit",
        fileName: "asd.png",
    },
    {
        eventId: 3,
        userName: "test3",
        title: "test title",
        file: "http://asd.png",
        startDay: "2023-04-04",
        endDay: "2024-04-05",
        status: "submit",
        fileName: "asd.png",
    },
];

exports.MentionFindAllResultSchema = [1, 2]

exports.MentionScheduleResultSchema =
{
    eventId: 1,
    mentionId: 1,
    userName: "test1",
    title: "test title",
    eventType: "Schedules",
    isChecked: false,
}


exports.MentionMeetingResultSchema = [
    {
        eventId: 3,
        mentionId: 3,
        userName: "test1",
        title: "test title",
        eventType: "Meetings",
        isChecked: false,
    },
    {
        eventId: 4,
        mentionId: 4,
        userName: "test2",
        title: "test title",
        eventType: "Meetings",
        isChecked: false,
    },
];
exports.MentionIssueResultSchema = [
    {
        eventId: 5,
        mentionId: 5,
        userName: "test1",
        title: "test title",
        eventType: "Issues",
        isChecked: false,
    },
    {
        eventId: 5,
        mentionId: 5,
        userName: "test2",
        title: "test title",
        eventType: "Issues",
        isChecked: false,
    },
];
exports.MentionReportResultSchema = [
    {
        eventId: 6,
        mentionId: 6,
        userName: "test1",
        title: "test title",
        eventType: "Reports",
        isChecked: false,
    },
    {
        eventId: 6,
        mentionId: 6,
        userName: "test2",
        title: "test title",
        eventType: "Reports",
        isChecked: false,
    },
];
exports.MentionMeetingReportsResultSchema = [
    {
        eventId: 7,
        mentionId: 7,
        userName: "test1",
        title: "test title",
        eventType: "MeetingReports",
        isChecked: false,
    },
    {
        eventId: 7,
        mentionId: 7,
        userName: "test2",
        title: "test title",
        eventType: "MeetingReports",
        isChecked: false,
    },
];
exports.MentionOtherResultSchema = [
    {
        eventId: 8,
        mentionId: 8,
        userName: "test1",
        title: "test title",
        eventType: "Others",
        isChecked: false,
    },
    {
        eventId: 9,
        mentionId: 9,
        userName: "test2",
        title: "test title",
        eventType: "Others",
        isChecked: false,
    },
];

exports.MentionEvnetResultSchema = [
    {
        eventId: 5,
        mentionId: 5,
        userName: "test1",
        title: "test title",
        eventType: "Issues",
        isChecked: false,
    },
    {
        eventId: 5,
        mentionId: 5,
        userName: "test2",
        title: "test title",
        eventType: "Issues",
        isChecked: false,
    },
];

exports.TotalMentionResultSchema = [
    {
        eventId: 1,
        eventType: "Schedules",
        isChecked: false,
        mentionId: 1,
        title: "test title",
        userName: "test1",
    },
    {
        eventId: 2,
        eventType: "Schedules",
        isChecked: false,
        mentionId: 2,
        title: "test title",
        userName: "test2",
    },
    {
        eventId: 3,
        eventType: "Meetings",
        isChecked: false,
        mentionId: 3,
        title: "test title",
        userName: "test1",
    },
    {
        eventId: 4,
        eventType: "Meetings",
        isChecked: false,
        mentionId: 4,
        title: "test title",
        userName: "test2",
    },
    {
        eventId: 5,
        eventType: "Issues",
        isChecked: false,
        mentionId: 5,
        title: "test title",
        userName: "test1",
    },
];
exports.MyMentionInsertSchema = {
    userId: "test1",
    eventId: 1,
};

exports.MentionCheckInsertSchema = {
    mentionId: 1,
    userId: "test1",
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
        eventId: 1,
        userName: "test1",
        title: "test title",
        file: "http://asd.png",
        enrollDay: "2023-04-05",
        fileName: "asd.png",
    },
    {
        eventId: 2,
        userName: "test2",
        title: "test title",
        file: "http://asd.png",
        enrollDay: "2023-04-05",
        fileName: "asd.png",
    },
    {
        eventId: 3,
        userName: "test3",
        title: "test title",
        file: "http://asd.png",
        enrollDay: "2023-04-05",
        fileName: "asd.png",
    },
];
