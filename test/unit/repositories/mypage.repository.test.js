const MypageRepository = require("../../../repositories/myPage.repository");
const {
    MypageonlyUserIdInsertSchema,
    MyScheduleResultSchema,
    mapMyScheduleResultSchema,
    MypageUserIdInsertSchema,
    MentionFindAllResultSchema,
    MentionScheduleResultSchema,
    MyMentionInsertSchema,
    MentionCheckInsertSchema,
    MentionCheckResultSchema,
    MentionUpdateInsertSchema,
    mapMyfileMeetingReportResultSchema,
    MyfileMeetingReportResultSchema,
    mapMyfileReportResultSchema,
    MyfileReportResultSchema,
    TeamIdInsertSchema,
    TeamMemberInsertSchema,
    TeamMeetingResultSchema,
    teamMeetingOneResultSchema
} = require("../../fixtures/mypage.fixtures");
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
} = require("../../../models");
const sinon = require('sinon')
const { Op } = require('sequelize')


describe("getUserSchedule test ", () => {
    let mypagerepository = new MypageRepository();
    let SchedulesFindAllStub;
    beforeEach(() => {
        jest.resetAllMocks();
        SchedulesFindAllStub = sinon.stub(Schedules, "findAll");
    });
    afterEach(() => { // 스텁을 복원하여 원래의 동작으로 복구합니다.
        SchedulesFindAllStub.restore();
    });

    test("getUserSchedule test", async () => {
        //schedulefindall이 어떤 값을 반환할지 정해줌
        SchedulesFindAllStub.resolves(mapMyScheduleResultSchema);
        const schedules = await mypagerepository.getUserSchedule(
            MypageonlyUserIdInsertSchema
        );

        //findAll 메소드는 몇번 호출되는지
        expect(SchedulesFindAllStub.calledOnce).toBe(true);
        //findAll 메소드는 어떤 인자와 함께 호출되는지
        expect(SchedulesFindAllStub.calledWith({
            raw: true,
            where: MypageonlyUserIdInsertSchema,
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
        })).toBe(true);

        //findAll 메소드의 return 값이 일치하는지
        expect(schedules).toEqual(MyScheduleResultSchema);
    });
});
describe("내가 언급된 스케줄 가져오기", () => {
    let mypagerepository = new MypageRepository();
    let MentionsFindAllStub;
    let EventsfindOneStub;
    beforeEach(() => {
        jest.resetAllMocks();
        MentionsFindAllStub = sinon.stub(Mentions, "findAll");
        EventsfindOneStub = sinon.stub(Events, "findOne");
    });
    afterEach(() => { // 스텁을 복원하여 원래의 동작으로 복구합니다.
        MentionsFindAllStub.restore();
        EventsfindOneStub.restore();
    });
    test("getMention 성공시 Id 배열 반환", async () => {
        //MentionsFindAllStub 어떤 값을 반환할지 정해줌
        MentionsFindAllStub.resolves([
            { Id: 1, eventType: "1" },
            { Id: 2, eventType: "1" },
        ]);
        const mentions = await mypagerepository.getMention(
            MypageUserIdInsertSchema
        );

        expect(MentionsFindAllStub.calledOnce).toBe(true);
        expect(MentionsFindAllStub.calledWith({
            raw: true,
            where: { userId: MypageUserIdInsertSchema.userId },
            attributes: ["Id"],
            include: [
                {
                    model: Events,
                    attributes: [],
                    where: { calendarId: MypageUserIdInsertSchema.type }
                },
            ],
        }))
        expect(mentions).toEqual(MentionFindAllResultSchema);
    })
    test("getMentiont실패 시 빈 배열 반환", async () => {
        MentionsFindAllStub.resolves([]);
        const mentions = await mypagerepository.getMention(
            MypageUserIdInsertSchema
        );
        expect(MentionsFindAllStub.calledOnce).toBe(true);
        expect(MentionsFindAllStub.calledWith({
            raw: true,
            where: { userId: MypageUserIdInsertSchema.userId },
            attributes: ["Id"],
            include: [
                {
                    model: Events,
                    attributes: [],
                    where: { calendarId: MypageUserIdInsertSchema.type }
                },
            ],
        }))
        expect(mentions).toEqual([]);
    });
    test("getScheduleById 성공시 스케줄 반환", async () => {
        EventsfindOneStub.resolves(MentionScheduleResultSchema)
        const schedule = await mypagerepository.getScheduleById(
            MyMentionInsertSchema
        )

        expect(EventsfindOneStub.calledOnce).toBe(true);
        expect(EventsfindOneStub.calledWith({
            raw: true,
            where: { Id: MyMentionInsertSchema.Id },
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
                    where: { userId: MyMentionInsertSchema.userId },
                },
            ],
        }))
        expect(schedule).toEqual(MentionScheduleResultSchema);
    })
})

describe("멘션 체크 test", () => {
    let mypagerepository = new MypageRepository();
    let MentionsFindOneStub;
    beforeEach(() => {
        jest.resetAllMocks();
        MentionsFindOneStub = sinon.stub(Mentions, "findOne");
        MentionsUpdateStub = sinon.stub(Mentions, "update");
    });
    afterEach(() => { // 스텁을 복원하여 원래의 동작으로 복구합니다.
        MentionsFindOneStub.restore();
        MentionsUpdateStub.restore();
    });
    test("findMention 성공시 해당 mention 반환", async () => {
        MentionsFindOneStub.resolves(MentionCheckResultSchema)
        const mention = await mypagerepository.findMention(
            { mentionId: MentionCheckInsertSchema.mentionId }
        )

        expect(MentionsFindOneStub.calledOnce).toBe(true);
        expect(MentionsFindOneStub.calledWith({ where: { mentionId: MentionCheckInsertSchema.mentionId } }))
        expect(mention).toEqual(MentionCheckResultSchema);
    })
    test("updateMantion test", async () => {
        MentionsUpdateStub.resolves()
        const mention = await mypagerepository.updateMention(
            MentionUpdateInsertSchema
        )
        expect(MentionsUpdateStub.calledOnce).toBe(true);
        expect(MentionsUpdateStub.calledWith(
            {
                isChecked: MentionUpdateInsertSchema.check,
            },
            {
                where: { mentionId: MentionUpdateInsertSchema.mentionId },
            }
        ))
    });
})

describe("getMyfile test", () => {
    let mypagerepository = new MypageRepository();
    let MeetingReportsFindAllStub;
    let MyReportfilefindAllStub;
    beforeEach(() => {
        jest.resetAllMocks();
        MeetingReportsFindAllStub = sinon.stub(MeetingReports, "findAll");
        MyReportfilefindAllStub = sinon.stub(Reports,"findAll")
    });
    afterEach(() => { // 스텁을 복원하여 원래의 동작으로 복구합니다.
        MeetingReportsFindAllStub.restore();
        MyReportfilefindAllStub.restore();
    });
    test("findMyMeetingfile test", async () => {
        MeetingReportsFindAllStub.resolves(mapMyfileMeetingReportResultSchema)
        const myfiles = await mypagerepository.findMyMeetingfile(
            MypageonlyUserIdInsertSchema
        )
        expect(MeetingReportsFindAllStub.calledOnce).toBe(true);
        expect(MeetingReportsFindAllStub.calledWith(
            {
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
                where: { userId: MypageonlyUserIdInsertSchema.userId },
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
            }
        ))
        expect(myfiles).toEqual(MyfileMeetingReportResultSchema);
    })
    test("findMyReportfile test", async () => {
        MyReportfilefindAllStub.resolves(mapMyfileReportResultSchema)
        const myfiles = await mypagerepository.findMyReportfile(
            MypageonlyUserIdInsertSchema
        )
        expect(MyReportfilefindAllStub.calledOnce).toBe(true);
        expect(MyReportfilefindAllStub.calledWith(
            {
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
                where: { userId : MypageonlyUserIdInsertSchema.userId },
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
            }
        ))
        expect(myfiles).toEqual(MyfileReportResultSchema);
    })

})

describe("TeamMeetingReport test",() => {
    let mypagerepository = new MypageRepository();
    let UsersFindAllStub;
    let MeetingReportsFindAllStub;
    beforeEach(() => {
        jest.resetAllMocks();
        UsersFindAllStub = sinon.stub(Users, "findAll");
        MeetingReportsFindAllStub = sinon.stub(MeetingReports,"findAll")
    });
    afterEach(() => { // 스텁을 복원하여 원래의 동작으로 복구합니다.
        UsersFindAllStub.restore();
        MeetingReportsFindAllStub.restore();
    });
    test("findTeam test",async() => {
        UsersFindAllStub.resolves(TeamMemberInsertSchema)
        const myteam = await mypagerepository.findTeam(
            TeamIdInsertSchema
        )

        expect(UsersFindAllStub.calledOnce).toBe(true)
        expect(UsersFindAllStub.calledWith({
            where : {teamId : TeamIdInsertSchema.teamId}
        }))
        expect(myteam).toEqual(TeamMemberInsertSchema)
    })
    test("findTeamMeetingFile이 존재할 때 test",async() => {
        MeetingReportsFindAllStub.resolves(teamMeetingOneResultSchema)
        const meeting = await mypagerepository.findTeamMeetingFile(
            {team : TeamMemberInsertSchema}
        )
        expect(MeetingReportsFindAllStub.callCount).toBe(3)
        expect(MeetingReportsFindAllStub.calledWith({
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
                userId: TeamMemberInsertSchema.userId,
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
        }))
        expect(meeting).toEqual()

    })
    test("findTeamMeetingFile이 빈배열일 때 test",async() => {
        MeetingReportsFindAllStub.resolves([])
    })
})




