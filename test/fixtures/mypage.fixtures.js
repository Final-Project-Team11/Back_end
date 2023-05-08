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
    type: "2",
    userId: "test1",
};
exports.mapMyScheduleResultSchema = [
    {
        Id: 1,
        userName: "testman",
        title: "test title",
        files: '{"fileName":"gitactons.png","fileLocation":"https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"}|{"fileName":"image.png","fileLocation":"https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"}',
        enroll: "04/25",
        status: "accept"
    },
    {
        Id: 2,
        userName: "testman",
        title: "test title",
        files: '{"fileName":"gitactons.png","fileLocation":"https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"}|{"fileName":"image.png","fileLocation":"https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"}',
        enroll: "04/25",
        status: "accept"
    },
    {
        Id: 3,
        userName: "testman",
        title: "test title",
        files: '{"fileName":"gitactons.png","fileLocation":"https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"}|{"fileName":"image.png","fileLocation":"https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"}',
        enroll: "04/25",
        status: "accept"
    },
];
exports.MyScheduleResultSchema = [
    {
        Id: 1,
        userName: "testman",
        title: "test title",
        files: [
            {
                "fileName": "gitactons.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"
            },
            {
                "fileName": "image.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"
            }
        ],
        enroll: "04/25",
        status: "accept"
    },
    {
        Id: 2,
        userName: "testman",
        title: "test title",
        files: [
            {
                "fileName": "gitactons.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"
            },
            {
                "fileName": "image.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"
            }
        ],
        enroll: "04/25",
        status: "accept"
    },
    {
        Id: 3,
        userName: "testman",
        title: "test title",
        files: [
            {
                "fileName": "gitactons.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"
            },
            {
                "fileName": "image.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"
            }
        ],
        enroll: "04/25",
        status: "accept"
    },
];

exports.MyOtherResultSchema = [
    {
        Id: 4,
        userName: "testman",
        title: "test title",
        files: [
            {
                "fileName": "gitactons.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"
            },
            {
                "fileName": "image.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"
            }
        ],
        enroll: "04/25",
        status: "accept"
    },
    {
        Id: 5,
        userName: "testman",
        title: "test title",
        files: [
            {
                "fileName": "gitactons.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"
            },
            {
                "fileName": "image.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"
            }
        ],
        enroll: "04/25",
        status: "accept"
    },
    {
        Id: 6,
        userName: "testman",
        title: "test title",
        files: [
            {
                "fileName": "gitactons.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"
            },
            {
                "fileName": "image.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"
            }
        ],
        enroll: "04/25",
        status: "accept"
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
        eventId: 10,
        mentionId: 10,
        userName: "test1",
        title: "test title",
        eventType: "Issues",
        isChecked: false,
    },
    {
        eventId: 10,
        mentionId: 10,
        userName: "test2",
        title: "test title",
        eventType: "Issues",
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
    Id: 1,
};

exports.MentionCheckInsertSchema = {
    mentionId: 1,
    userId: "test1",
};

exports.MentionCheckResultSchema = {
    mentionId: 1,
    userId: "test1",
    Id: 4,
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

exports.MyfileMeetingReportResultSchema = [
    {
        Id: 1,
        userName: "testman",
        calendarId: "5",
        enroll: "2023-04-05",
        title: "test title",
        files: [
            {
                "fileName": "gitactons.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"
            },
            {
                "fileName": "image.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"
            }
        ],
    },
    {
        Id: 2,
        userName: "testman",
        calendarId: "5",
        enroll: "2023-04-05",
        title: "test title",
        files: [
            {
                "fileName": "gitactons.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"
            },
            {
                "fileName": "image.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"
            }
        ],
    },
    {
        Id: 3,
        userName: "testman",
        calendarId: "5",
        enroll: "2023-04-05",
        title: "test title",
        files: [
            {
                "fileName": "gitactons.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"
            },
            {
                "fileName": "image.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"
            }
        ],
    },
];

exports.mapMyfileMeetingReportResultSchema = [
    {
        Id: 1,
        userName: "testman",
        calendarId: "5",
        enroll: "2023-04-05",
        title: "test title",
        files: '{"fileName":"gitactons.png","fileLocation":"https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"}|{"fileName":"image.png","fileLocation":"https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"}',
    },
    {
        Id: 2,
        userName: "testman",
        calendarId: "5",
        enroll: "2023-04-05",
        title: "test title",
        files: '{"fileName":"gitactons.png","fileLocation":"https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"}|{"fileName":"image.png","fileLocation":"https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"}',
    },
    {
        Id: 3,
        userName: "testman",
        calendarId: "5",
        enroll: "2023-04-05",
        title: "test title",
        files: '{"fileName":"gitactons.png","fileLocation":"https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"}|{"fileName":"image.png","fileLocation":"https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"}',
    },
];

exports.mapMyfileReportResultSchema = [
    {
        Id: 4,
        userName: "testman",
        calendarId: "6",
        enroll: "2023-04-05",
        title: "test title",
        files: '{"fileName":"gitactons.png","fileLocation":"https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"}|{"fileName":"image.png","fileLocation":"https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"}',
    },
    {
        Id: 5,
        userName: "testman",
        calendarId: "6",
        enroll: "2023-04-05",
        title: "test title",
        files: '{"fileName":"gitactons.png","fileLocation":"https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"}|{"fileName":"image.png","fileLocation":"https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"}',
    },
    {
        Id: 6,
        userName: "testman",
        calendarId: "6",
        enroll: "2023-04-05",
        title: "test title",
        files: '{"fileName":"gitactons.png","fileLocation":"https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"}|{"fileName":"image.png","fileLocation":"https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"}',
    },
];

exports.MyfileReportResultSchema = [
    {
        Id: 4,
        userName: "testman",
        calendarId: "6",
        enroll: "2023-04-05",
        title: "test title",
        files: [
            {
                "fileName": "gitactons.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"
            },
            {
                "fileName": "image.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"
            }
        ],
    },
    {
        Id: 5,
        userName: "testman",
        calendarId: "6",
        enroll: "2023-04-05",
        title: "test title",
        files: [
            {
                "fileName": "gitactons.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"
            },
            {
                "fileName": "image.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"
            }
        ],
    },
    {
        Id: 6,
        userName: "testman",
        calendarId: "6",
        enroll: "2023-04-05",
        title: "test title",
        files: [
            {
                "fileName": "gitactons.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"
            },
            {
                "fileName": "image.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"
            }
        ],
    },
];

exports.MyfileAllResultSchema = [
    {
        Id: 6,
        calendarId: "6",
        enroll: "2023-04-05",
        files: [
            {
                "fileName": "gitactons.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"
            },
            {
                "fileName": "image.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"
            }
        ],
        title: "test title",
        userName: "testman",
    },
    {
        Id: 5,
        calendarId: "6",
        enroll: "2023-04-05",
        files: [
            {
                "fileName": "gitactons.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"
            },
            {
                "fileName": "image.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"
            }
        ],
        title: "test title",
        userName: "testman",
    },
    {
        Id: 4,
        calendarId: "6",
        enroll: "2023-04-05",
        files: [
            {
                "fileName": "gitactons.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"
            },
            {
                "fileName": "image.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"
            }
        ],
        title: "test title",
        userName: "testman",
    },
    {
        Id: 3,
        calendarId: "5",
        enroll: "2023-04-05",
        files: [
            {
                "fileName": "gitactons.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"
            },
            {
                "fileName": "image.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"
            }
        ],
        title: "test title",
        userName: "testman",
    },
    {
        Id: 2,
        calendarId: "5",
        enroll: "2023-04-05",
        files: [
            {
                "fileName": "gitactons.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"
            },
            {
                "fileName": "image.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"
            }
        ],
        title: "test title",
        userName: "testman",
    },
    {
        Id: 1,
        calendarId: "5",
        enroll: "2023-04-05",
        files: [
            {
                "fileName": "gitactons.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"
            },
            {
                "fileName": "image.png",
                "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"
            }
        ],
        title: "test title",
        userName: "testman",
    },
]

exports.TeamIdInsertSchema = { teamId: 2 }

exports.TeamMemberInsertSchema = [
    {
        authLevel: 3,
        birthDay: null,
        companyId: "sparta",
        createdAt: "2023 - 04 - 26T16: 13: 46.000Z",
        job: "Software Engineer",
        joinDay: "2023 - 04 - 13T00: 00: 00.000Z",
        password: "aaaa1111",
        phoneNum: null,
        profileImg: null,
        rank: "Senior",
        remainDay: 15,
        salaryDay: 25,
        teamId: 2,
        updatedAt: "2023 - 04 - 26T16: 13: 46.000Z",
        userId: "test1",
        userName: "testman"
    },
    {
        authLevel: 3,
        birthDay: null,
        companyId: "sparta",
        createdAt: "2023 - 04 - 26T16: 13: 46.000Z",
        job: "Software Engineer",
        joinDay: "2023 - 04 - 13T00: 00: 00.000Z",
        password: "aaaa1111",
        phoneNum: null,
        profileImg: null,
        rank: "Senior",
        remainDay: 15,
        salaryDay: 25,
        teamId: 2,
        updatedAt: "2023 - 04 - 26T16: 13: 46.000Z",
        userId: "test2",
        userName: "testman2"
    },
    {
        authLevel: 3,
        birthDay: null,
        companyId: "sparta",
        createdAt: "2023 - 04 - 26T16: 13: 46.000Z",
        job: "Software Engineer",
        joinDay: "2023 - 04 - 13T00: 00: 00.000Z",
        password: "aaaa1111",
        phoneNum: null,
        profileImg: null,
        rank: "Senior",
        remainDay: 15,
        salaryDay: 25,
        teamId: 2,
        updatedAt: "2023 - 04 - 26T16: 13: 46.000Z",
        userId: "test3",
        userName: "testman3"
    }
]

exports.teamMeetingOneResultSchema = {
    Id: 1,
    calendarId: "5",
    enroll: "2023/04/27",
    userName: "testman2",
    userId: "test2",
    title: "test title1",
    files: '{"fileName":"gitactons.png","fileLocation":"https://meer2.s3.ap-northeast-2.amazonaws.com/c3719689-9b1b-440c-952c-e6e15d78909d_gitactons.png"}|{"fileName":"image.png","fileLocation":"https://meer2.s3.ap-northeast-2.amazonaws.com/77126bd1-3fbb-4159-a1ec-342826391308_image.png"}',

}

exports.TeamMeetingResultSchema = [
    {
        Id: 1,
        calendarId: "5",
        enroll: "2023/04/27",
        userName: "testman2",
        userId: "test2",
        title: "test title1",
        files: [
            {
                fileName: "img.png",
                fileLocation: "https://meer2.s3.ap-northeast-2.amazonaws.com/add65151-3037-468c-bb99-21f3bd132d52_img.png"
            },
            {
                fileName: "multerr.png",
                fileLocation: "https://meer2.s3.ap-northeast-2.amazonaws.com/66f0d5ea-6d38-42f5-8554-33bd2b91a319_multerr.png"
            }
        ]
    },
    {
        Id: 2,
        calendarId: "5",
        enroll: "2023/04/27",
        userName: "testman3",
        userId: "test3",
        title: "test title2",
        files: [
            {
                fileName: "img.png",
                fileLocation: "https://meer2.s3.ap-northeast-2.amazonaws.com/add65151-3037-468c-bb99-21f3bd132d52_img.png"
            },
            {
                fileName: "multerr.png",
                fileLocation: "https://meer2.s3.ap-northeast-2.amazonaws.com/66f0d5ea-6d38-42f5-8554-33bd2b91a319_multerr.png"
            }
        ]
    },
    {
        Id: 3,
        calendarId: "5",
        enroll: "2023/04/27",
        userName: "testman3",
        userId: "test3",
        title: "test title3",
        files: [
            {
                fileName: "img.png",
                fileLocation: "https://meer2.s3.ap-northeast-2.amazonaws.com/add65151-3037-468c-bb99-21f3bd132d52_img.png"
            },
            {
                fileName: "multerr.png",
                fileLocation: "https://meer2.s3.ap-northeast-2.amazonaws.com/66f0d5ea-6d38-42f5-8554-33bd2b91a319_multerr.png"
            }
        ]
    },
];

exports.TeamResultSchema = [
    {
        Id: 1,
        calendarId: "6",
        enroll: "2023/04/27",
        userName: "testman2",
        userId: "test2",
        title: "test title1",
        files: [
            {
                fileName: "img.png",
                fileLocation: "https://meer2.s3.ap-northeast-2.amazonaws.com/add65151-3037-468c-bb99-21f3bd132d52_img.png"
            },
            {
                fileName: "multerr.png",
                fileLocation: "https://meer2.s3.ap-northeast-2.amazonaws.com/66f0d5ea-6d38-42f5-8554-33bd2b91a319_multerr.png"
            }
        ]
    },
    {
        Id: 2,
        calendarId: "6",
        enroll: "2023/04/27",
        userName: "testman3",
        userId: "test3",
        title: "test title2",
        files: [
            {
                fileName: "img.png",
                fileLocation: "https://meer2.s3.ap-northeast-2.amazonaws.com/add65151-3037-468c-bb99-21f3bd132d52_img.png"
            },
            {
                fileName: "multerr.png",
                fileLocation: "https://meer2.s3.ap-northeast-2.amazonaws.com/66f0d5ea-6d38-42f5-8554-33bd2b91a319_multerr.png"
            }
        ]
    },
    {
        Id: 3,
        calendarId: "6",
        enroll: "2023/04/27",
        userName: "testman3",
        userId: "test3",
        title: "test title3",
        files: [
            {
                fileName: "img.png",
                fileLocation: "https://meer2.s3.ap-northeast-2.amazonaws.com/add65151-3037-468c-bb99-21f3bd132d52_img.png"
            },
            {
                fileName: "multerr.png",
                fileLocation: "https://meer2.s3.ap-northeast-2.amazonaws.com/66f0d5ea-6d38-42f5-8554-33bd2b91a319_multerr.png"
            }
        ]
    },
];

exports.updateMentionInsertSchema = {
    existMention: {
        mentionId: 1,
        userId: "test1",
        eventId: 4,
        isChecked: false,
        createdAt: "2023-04-08",
        updatedAt: "2023-04-08",
    },
    mentionId: 1
}

exports.DetailEvnetTypeResultSchema = {
    Id: 1,
    calendarId: "5"
}

exports.IdInsertSchema = {Id : 1}

exports.DetailMeetingReportResultSchema = {
    "Id": 1,
    "start": "2023/05/09",
    "end": "2023/05/09",
    "userName": "testman",
    "title": "test title",
    "body": "test content",
    "attendees": [
        "other test man"
    ],
    "files": [
        {
            "fileName": "img.png",
            "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/add65151-3037-468c-bb99-21f3bd132d52_img.png"
        },
        {
            "fileName": "multerr.png",
            "fileLocation": "https://meer2.s3.ap-northeast-2.amazonaws.com/66f0d5ea-6d38-42f5-8554-33bd2b91a319_multerr.png"
        }
    ]
}

exports.weeklyScheduleInsertSchema = {
    teamId : 1,
    year : 2023,
    month : 4,
    day : 20
}

exports.WeeklyMeetingResultSchema = [
    {
        "Id": 1,
        "userName": "testman1",
        "userId": "test1",
        "title": "test title1",
        "body": null,
        "start": "2023/05/01",
        "end": "2023/05/01",
        "calendarId": "0"
    },
    {
        "Id": 2,
        "userName": "testman2",
        "userId": "test2",
        "title": "test title1",
        "body": null,
        "start": "2023/05/01",
        "end": "2023/05/01",
        "calendarId": "0"
    },
]

exports.WeeklyOtherResultSchema = [
    {
        "Id": 3,
        "userName": "testman1",
        "userId": "test1",
        "title": "test title1",
        "body": null,
        "start": "2023/05/01",
        "end": "2023/05/01",
        "calendarId": "1"
    },
    {
        "Id": 4,
        "userName": "testman2",
        "userId": "test2",
        "title": "test title1",
        "body": null,
        "start": "2023/05/01",
        "end": "2023/05/01",
        "calendarId": "1"
    },
]

exports.WeeklyScheduleResultSchema = [
    {
        "Id": 5,
        "userName": "testman1",
        "userId": "test1",
        "title": "test title1",
        "body": null,
        "start": "2023/05/01",
        "end": "2023/05/01",
        "calendarId": "2"
    },
    {
        "Id": 6,
        "userName": "testman2",
        "userId": "test2",
        "title": "test title1",
        "body": null,
        "start": "2023/05/01",
        "end": "2023/05/01",
        "calendarId": "2"
    },
]

exports.WeeklyIssueResultSchema = [
    {
        "Id": 7,
        "userName": "testman1",
        "userId": "test1",
        "title": "test title1",
        "body": null,
        "start": "2023/05/01",
        "end": "2023/05/01",
        "calendarId": "3"
    },
    {
        "Id": 8,
        "userName": "testman2",
        "userId": "test2",
        "title": "test title1",
        "body": null,
        "start": "2023/05/01",
        "end": "2023/05/01",
        "calendarId": "3"
    },
]

