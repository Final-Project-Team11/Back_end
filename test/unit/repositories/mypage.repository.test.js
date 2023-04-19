// const MypageRepository = require("../../../repositories/myPage.repository");
// const {
//     MypageUserInfoSchemaByController,
//     MypageUserIdInsertSchema,
//     MyScheduleResultSchema,
//     MentionScheduleResultSchema,
//     MyMentionInsertSchema,
//     MentionCheckInsertSchema,
//     MentionCheckResultSchema,
//     MentionUpdateResultSchema,
//     MentionUpdateInsertSchema,
//     MyfileInsertSchema,
//     MyfileResultSchema,
//     MyfileAllResultSchema,
//     TeamMemberInsertSchema,
//     TeamMenberResultSchema,
// } = require("../../fixtures/mypage.fixtures");
// const { beforeEach } = require("node:test");

// const mockMypageModel = () => ({
//     findOne: jest.fn(),
//     findAll: jest.fn(),
//     update: jest.fn(),
// });

// describe("mypage repository test ", () => {
//     let mypagerepository = new MypageRepository();
//     mypagerepository.Users = mockMypageModel();
//     mypagerepository.Schedules = mockMypageModel();
//     mypagerepository.Meetings = mockMypageModel();
//     mypagerepository.Reports = mockMypageModel();
//     mypagerepository.Mentions = mockMypageModel();
//     mypagerepository.Events = mockMypageModel();

//     beforeEach(() => {
//         jest.resetAllMocks();
//     });
    // afterEach(() => {
    //     jest.resetAllMocks();
    // });

    // test("findUserById test", async () => {
    //     mypagerepository.Users.findOne = jest.fn(() => {
    //         return MypageUserInfoSchemaByController;
    //     });
    //     const Users = await mypagerepository.findUserById(
    //         MypageUserIdInsertSchema
    //     );
    //     //findOne 메소드는 몇번 호출되는지
    //     expect(mypagerepository.Users.findOne).toHaveBeenCalledTimes(1);
    //     //findOne 메소드는 어떤 인자와 함께 호출되는지
    //     expect(mypagerepository.Users.findOne).toHaveBeenCalledWith(
    //         MypageUserIdInsertSchema
    //     );
    //     //findOne 메소드의 return 값이 일치하는지
    //     expect(Users).toBe(MypageUserInfoSchemaByController);
    // });

    // test("getUserSchedule test", async () => {
    //     mypagerepository.Schedules.findAll = jest.fn(() => {
    //         return MyScheduleResultSchema;
    //     });
    //     const schedules = await mypagerepository.Schedules.findAll(
    //         MypageUserIdInsertSchema
    //     );

    //     //findAll 메소드는 몇번 호출되는지
    //     expect(mypagerepository.Schedules.findAll).toHaveBeenCalledTimes(1);
    //     //findAll 메소드는 어떤 인자와 함께 호출되는지
    //     expect(mypagerepository.Schedules.findAll).toHaveBeenCalledWith(
    //         MypageUserIdInsertSchema
    //     );
    //     //findAll 메소드의 return 값이 일치하는지
    //     expect(schedules).toBe(MyScheduleResultSchema);
    // });

    // test("returns an array of event IDs if mentions found and event types match", async () => {
    //     mypagerepository.Mentions.findAll.mockResolvedValue([
    //         { eventId: 1, eventType: "test1" },
    //         { eventId: 2, eventType: "test2" },
    //         { eventId: 3, eventType: "test1" },
    //     ]);
    //     const mentions = await await mypagerepository.Mentions.findAll(
    //         MypageUserIdInsertSchema
    //     );
    //     let result = [];
    //     mentions.map((mention) => {
    //         if (mention.eventType === "test1") {
    //             result.push(mention.eventId);
    //         }
    //     });
    //     //findAll 메소드는 몇번 호출되는지
    //     expect(mypagerepository.Mentions.findAll).toHaveBeenCalledTimes(1);
    //     //findAll 메소드는 어떤 인자와 함께 호출되는지
    //     expect(mypagerepository.Mentions.findAll).toHaveBeenCalledWith(
    //         MypageUserIdInsertSchema
    //     );
    //     expect(result).toEqual([1, 3]);
    // });

    // test("returns an empty array if mentions found but event types do not match", async () => {
    //     mypagerepository.Mentions.findAll.mockResolvedValue([
    //         { eventId: 1, eventType: "test1" },
    //         { eventId: 2, eventType: "test2" },
    //         { eventId: 3, eventType: "test1" },
    //     ]);
    //     const mentions = await await mypagerepository.Mentions.findAll(
    //         MypageUserIdInsertSchema
    //     );
    //     let result = [];
    //     mentions.map((mention) => {
    //         if (mention.eventType === "test3") {
    //             result.push(mention.eventId);
    //         }
    //     });
    //     //findAll 메소드는 몇번 호출되는지
    //     expect(mypagerepository.Mentions.findAll).toHaveBeenCalledTimes(1);
    //     //findAll 메소드는 어떤 인자와 함께 호출되는지
    //     expect(mypagerepository.Mentions.findAll).toHaveBeenCalledWith(
    //         MypageUserIdInsertSchema
    //     );
    //     expect(result).toEqual([]);
    // });

    // test("returns an empty array if no mentions found", async () => {
    //     mypagerepository.Mentions.findAll.mockResolvedValue([]);
    //     const result = await mypagerepository.Mentions.findAll(
    //         MypageUserIdInsertSchema
    //     );
    //     //findAll 메소드는 몇번 호출되는지
    //     expect(mypagerepository.Mentions.findAll).toHaveBeenCalledTimes(1);
    //     //findAll 메소드는 어떤 인자와 함께 호출되는지
    //     expect(mypagerepository.Mentions.findAll).toHaveBeenCalledWith(
    //         MypageUserIdInsertSchema
    //     );
    //     expect(result).toEqual([]);
    // });

    // test("getScheduleById test", async () => {
    //     mypagerepository.Events.findOne = jest.fn(() => {
    //         return MentionScheduleResultSchema;
    //     });
    //     const schedules = await mypagerepository.Events.findOne(
    //         MyMentionInsertSchema
    //     );

    //     //findAll 메소드는 몇번 호출되는지
    //     expect(mypagerepository.Events.findOne).toHaveBeenCalledTimes(1);
    //     //findAll 메소드는 어떤 인자와 함께 호출되는지
    //     expect(mypagerepository.Events.findOne).toHaveBeenCalledWith(
    //         MyMentionInsertSchema
    //     );
    //     //findAll 메소드의 return 값이 일치하는지
    //     expect(schedules).toBe(MentionScheduleResultSchema);
    // });

    // //스케줄과 비슷한 로직을 갖고있는 나머지 테이블들 테스트 생략
    // //-> 추후 시간되면 추가

    // test("findMention test", async () => {
    //     mypagerepository.Mentions.findOne = jest.fn(() => {
    //         return MentionCheckResultSchema;
    //     });
    //     const mention = await mypagerepository.Mentions.findOne(
    //         MentionCheckInsertSchema
    //     );

    //     //findAll 메소드는 몇번 호출되는지
    //     expect(mypagerepository.Mentions.findOne).toHaveBeenCalledTimes(1);
    //     //findAll 메소드는 어떤 인자와 함께 호출되는지
    //     expect(mypagerepository.Mentions.findOne).toHaveBeenCalledWith(
    //         MentionCheckInsertSchema
    //     );
    //     //findAll 메소드의 return 값이 일치하는지
    //     expect(mention).toBe(MentionCheckResultSchema);
    // });

    // test("updateMantion test", async () => {
    //     mypagerepository.Mentions.update = jest.fn(() => {
    //         return MentionUpdateResultSchema;
    //     });
    //     const mention = await mypagerepository.Mentions.update(
    //         MentionUpdateInsertSchema
    //     );
    //     //findAll 메소드는 몇번 호출되는지
    //     expect(mypagerepository.Mentions.update).toHaveBeenCalledTimes(1);
    //     //findAll 메소드는 어떤 인자와 함께 호출되는지
    //     expect(mypagerepository.Mentions.update).toHaveBeenCalledWith(
    //         MentionUpdateInsertSchema
    //     );
    //     //findAll 메소드의 return 값이 일치하는지
    //     expect(mention).toBe(MentionUpdateResultSchema);
    // });

    // test("returns an array of file if Events found and event types match", async () => {
    //     mypagerepository.Events.findAll.mockResolvedValue([
    //         { eventId: 1, userName: "testman", eventType: "Schedules" },
    //         { eventId: 2, userName: "testman", eventType: "Meetings" },
    //         { eventId: 3, userName: "testman", eventType: "Reports" },
    //     ]);
    //     mypagerepository.Schedules.findOne.mockResolvedValue(
    //         MyfileResultSchema
    //     );
    //     mypagerepository.Meetings.findOne.mockResolvedValue(MyfileResultSchema);
    //     mypagerepository.Reports.findOne.mockResolvedValue(MyfileResultSchema);
    //     const result = await mypagerepository.Events.findAll(
    //         MypageUserIdInsertSchema
    //     );
    //     const results = await Promise.all(
    //         result.map(async (event) => {
    //             if (event.eventType === "Schedules") {
    //                 const schedule = await mypagerepository.Schedules.findOne(
    //                     MyfileInsertSchema
    //                 );
    //                 return Object.assign(event, schedule);
    //             } else if (event.eventType === "Meetings") {
    //                 const schedule = await mypagerepository.Meetings.findOne(
    //                     MyfileInsertSchema
    //                 );
    //                 return Object.assign(event, schedule);
    //             } else if (event.eventType === "Reports") {
    //                 const schedule = await mypagerepository.Reports.findOne(
    //                     MyfileInsertSchema
    //                 );
    //                 return Object.assign(event, schedule);
    //             }
    //         })
    //     );
    //     //findAll 메소드는 몇번 호출되는지
    //     expect(mypagerepository.Events.findAll).toHaveBeenCalledTimes(1);
    //     //findAll 메소드는 어떤 인자와 함께 호출되는지
    //     expect(mypagerepository.Events.findAll).toHaveBeenCalledWith(
    //         MypageUserIdInsertSchema
    //     );
    //     //findOne 메소드는 몇번 호출되는지
    //     expect(mypagerepository.Schedules.findOne).toHaveBeenCalledTimes(1);
    //     //findAOne 메소드는 어떤 인자와 함께 호출되는지
    //     expect(mypagerepository.Schedules.findOne).toHaveBeenCalledWith(
    //         MyfileInsertSchema
    //     );
    //     //findOne 메소드는 몇번 호출되는지
    //     expect(mypagerepository.Meetings.findOne).toHaveBeenCalledTimes(1);
    //     //findAOne 메소드는 어떤 인자와 함께 호출되는지
    //     expect(mypagerepository.Meetings.findOne).toHaveBeenCalledWith(
    //         MyfileInsertSchema
    //     );
    //     //findOne 메소드는 몇번 호출되는지
    //     expect(mypagerepository.Reports.findOne).toHaveBeenCalledTimes(1);
    //     //findAOne 메소드는 어떤 인자와 함께 호출되는지
    //     expect(mypagerepository.Reports.findOne).toHaveBeenCalledWith(
    //         MyfileInsertSchema
    //     );
    //     expect(results).toStrictEqual(MyfileAllResultSchema);
    // });

    // test("returns an empty array if Events not found", async () => {
    //     mypagerepository.Events.findAll.mockResolvedValue([]);
    //     const result = await mypagerepository.Events.findAll(
    //         MypageUserIdInsertSchema
    //     );
    //     //findAll 메소드는 몇번 호출되는지
    //     expect(mypagerepository.Events.findAll).toHaveBeenCalledTimes(1);
    //     //findAll 메소드는 어떤 인자와 함께 호출되는지
    //     expect(mypagerepository.Events.findAll).toHaveBeenCalledWith(
    //         MypageUserIdInsertSchema
    //     );
    //     expect(result).toEqual([]);
    // });
    // //팀원 찾기랑 보고서 찾기는 생략
    // //-> 추후에 시간되면 할것
    // test("findTeamMeetingFile test", async () => {
    //     mypagerepository.Events.findAll = jest.fn(() => {
    //         return TeamMenberResultSchema;
    //     });
    //     const result = await mypagerepository.Events.findAll(
    //         TeamMemberInsertSchema
    //     );

    //     //findAll 메소드는 몇번 호출되는지
    //     expect(mypagerepository.Events.findAll).toHaveBeenCalledTimes(1);
    //     //findAll 메소드는 어떤 인자와 함께 호출되는지
    //     expect(mypagerepository.Events.findAll).toHaveBeenCalledWith(
    //         TeamMemberInsertSchema
    //     );
    //     expect(result).toEqual(TeamMenberResultSchema);
    // });
// });
