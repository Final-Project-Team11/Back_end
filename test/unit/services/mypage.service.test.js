const MypageService = require("../../../services/myPage.service");
const CustomError = require("../../../middlewares/errorHandler");
const {
    MypageonlyUserIdInsertSchema,
    MypageUserIdInsertSchema,
    MyScheduleResultSchema,
    MentionScheduleResultSchema,
    MentionFindAllResultSchema,
    MyMentionInsertSchema,
    MentionCheckInsertSchema,
    MentionCheckResultSchema,
    MyOtherResultSchema,
    updateMentionInsertSchema,
    MyfileMeetingReportResultSchema,
    MyfileReportResultSchema,
    MyfileAllResultSchema,
    TeamMemberInsertSchema,
    TeamIdInsertSchema,
    TeamMeetingResultSchema,
    TeamResultSchema,
    DetailEvnetTypeResultSchema,
    DetailMeetingReportResultSchema,
    IdInsertSchema,
    weeklyScheduleInsertSchema,
    WeeklyIssueResultSchema,
    WeeklyScheduleResultSchema,
    WeeklyOtherResultSchema,
    WeeklyMeetingResultSchema
} = require("../../fixtures/mypage.fixtures");

const mockMypageRepository = () => ({
    findUserById: jest.fn(),
    getUserSchedule: jest.fn(),
    getUserOther: jest.fn(),
    getMention: jest.fn(),
    getScheduleById: jest.fn(),
    getMeetingById: jest.fn(),
    getIssueById: jest.fn(),
    getReportById: jest.fn(),
    getOtherById: jest.fn(),
    getMeetingReportsById: jest.fn(),
    findMention: jest.fn(),
    updateMention: jest.fn(),
    findMyfile: jest.fn(),
    findTeamMeetingFile: jest.fn(),
    findTeamReportFile: jest.fn(),
});

//userInfo 파일로 이동
// describe("checkUserById test", () => {
//     beforeEach(() => {
//         // restore the spy created with spyOn
//         jest.resetAllMocks();
//     });

//     test("findUserById 성공 시 user 정보 반환", async () => {
//         let mypageservice = new MypageService();
//         mypageservice.MypageRepository = Object.assign(
//             {},
//             mockMypageRepository
//         );

//         mypageservice.MypageRepository.findUserById = jest.fn(
//             () => MypageUserSchemaByController
//         );
//         const user = await mypageservice.checkUserById(
//             MypageonlyUserIdInsertSchema
//         );

//         expect(
//             mypageservice.MypageRepository.findUserById
//         ).toHaveBeenCalledWith(MypageonlyUserIdInsertSchema);
//         expect(
//             mypageservice.MypageRepository.findUserById
//         ).toHaveBeenCalledTimes(1);
//         expect(user).toBe(MypageUserSchemaByController);
//     });
//     test("해당 유저가 존재하지 않습니다", async () => {
//         let mypageservice = new MypageService();
//         mypageservice.MypageRepository = Object.assign(
//             {},
//             mockMypageRepository
//         );
//         try {
//             mypageservice.MypageRepository.findUserById = jest.fn(
//                 () => undefined
//             );
//             const user = await mypageservice.checkUserById(
//                 MypageonlyUserIdInsertSchema
//             );
//         } catch (err) {
//             expect(
//                 mypageservice.MypageRepository.findUserById
//             ).toHaveBeenCalledWith(MypageonlyUserIdInsertSchema);
//             expect(
//                 mypageservice.MypageRepository.findUserById
//             ).toHaveBeenCalledTimes(1);
//             expect(err).toBeInstanceOf(CustomError);
//             expect(err.message).toEqual("해당 유저가 존재하지 않습니다.");
//         }
//     });
//     test("유저정보에 대한 권한이 존재하지 않습니다", async () => {
//         const ErrorByNotexistIdSchema = {
//             userId: "test111",
//             userName: "testman11",
//             team: "dev",
//             remainDay: 15,
//             salaryDay: 4,
//         };
//         let mypageservice = new MypageService();
//         mypageservice.MypageRepository = Object.assign(
//             {},
//             mockMypageRepository
//         );
//         try {
//             mypageservice.MypageRepository.findUserById = jest.fn(
//                 () => ErrorByNotexistIdSchema
//             );
//             const user = await mypageservice.checkUserById(
//                 MypageonlyUserIdInsertSchema
//             );
//         } catch (err) {
//             expect(
//                 mypageservice.MypageRepository.findUserById
//             ).toHaveBeenCalledWith(MypageonlyUserIdInsertSchema);
//             expect(
//                 mypageservice.MypageRepository.findUserById
//             ).toHaveBeenCalledTimes(1);
//             expect(err).toBeInstanceOf(CustomError);
//             expect(err.message).toEqual("유저 정보에 대한 권한이 존재하지 않습니다.");
//         }

//     })
// });

describe("getUserSchedule test", () => {
    beforeEach(() => {
        // restore the spy created with spyOn
        jest.resetAllMocks();
    });
    test("getUserSchedule 성공 시 schedule 반환", async () => {
        let mypageservice = new MypageService();
        mypageservice.MypageRepository = Object.assign(
            {},
            mockMypageRepository
        );

        mypageservice.MypageRepository.getUserSchedule = jest.fn(
            () => MyScheduleResultSchema
        );
        mypageservice.MypageRepository.getUserOther = jest.fn(
            () => MyOtherResultSchema
        );
        const schedule = await mypageservice.getUserSchedule(
            MypageonlyUserIdInsertSchema
        );
        expect(
            mypageservice.MypageRepository.getUserSchedule
        ).toHaveBeenCalledWith(MypageonlyUserIdInsertSchema);
        expect(
            mypageservice.MypageRepository.getUserOther
        ).toHaveBeenCalledTimes(1);
        expect(
            mypageservice.MypageRepository.getUserOther
        ).toHaveBeenCalledWith(MypageonlyUserIdInsertSchema);
        expect(
            mypageservice.MypageRepository.getUserSchedule
        ).toHaveBeenCalledTimes(1);
        expect(schedule).toStrictEqual(MyScheduleResultSchema.concat(MyOtherResultSchema));
    })
})

describe("mentioned All Schedule test", () => {
    beforeEach(() => {
        // restore the spy created with spyOn
        jest.resetAllMocks();
    });
    test("getMentionedSchedules 성공 시 schedule 반환", async () => {
        let mypageservice = new MypageService();
        mypageservice.MypageRepository = Object.assign(
            {},
            mockMypageRepository
        );

        mypageservice.MypageRepository.getMention = jest.fn(
            () => MentionFindAllResultSchema
        );
        mypageservice.MypageRepository.getScheduleById = jest.fn(
            () => MentionScheduleResultSchema
        );
        const schedule = await mypageservice.getMentionedSchedules(
            MypageonlyUserIdInsertSchema
        );
        expect(
            mypageservice.MypageRepository.getMention
        ).toHaveBeenCalledWith(MypageUserIdInsertSchema);
        expect(
            mypageservice.MypageRepository.getMention
        ).toHaveBeenCalledTimes(1);

        expect(
            mypageservice.MypageRepository.getScheduleById
        ).toHaveBeenCalledWith(MyMentionInsertSchema);
        expect(
            mypageservice.MypageRepository.getScheduleById
        ).toHaveBeenCalledTimes(2);
        expect(schedule).toStrictEqual([MentionScheduleResultSchema, MentionScheduleResultSchema]);
    })
})

describe("checkMention test", () => {
    beforeEach(() => {
        // restore the spy created with spyOn
        jest.resetAllMocks();
    });

    test("성공 시 존재하는 Mention data 반환", async () => {
        let mypageservice = new MypageService();
        mypageservice.MypageRepository = Object.assign(
            {},
            mockMypageRepository
        );

        mypageservice.MypageRepository.findMention = jest.fn(
            () => MentionCheckResultSchema
        );
        const existMention = await mypageservice.checkMention(
            MentionCheckInsertSchema
        );

        expect(
            mypageservice.MypageRepository.findMention
        ).toHaveBeenCalledWith({"mentionId":MentionCheckInsertSchema.mentionId});
        expect(
            mypageservice.MypageRepository.findMention
        ).toHaveBeenCalledTimes(1);
        expect(existMention).toStrictEqual(MentionCheckResultSchema);

    })

    test("존재하지 않는 일정입니다.", async () => {
        let mypageservice = new MypageService();
        mypageservice.MypageRepository = Object.assign(
            {},
            mockMypageRepository
        );

        try {
            mypageservice.MypageRepository.findMention = jest.fn(
                () => undefined
            );
            await mypageservice.checkMention(
                MentionCheckInsertSchema
            );
        } catch (err) {
            expect(
                mypageservice.MypageRepository.findMention
            ).toHaveBeenCalledWith({"mentionId":MentionCheckInsertSchema.mentionId});
            expect(
                mypageservice.MypageRepository.findMention
            ).toHaveBeenCalledTimes(1);
            expect(err).toBeInstanceOf(CustomError);
            expect(err.message).toEqual("존재하지 않는 일정입니다.");
        }
    });
    test("해당 일정에 권한이 존재하지 않습니다.", async () => {
        const ErrorByNotexistIdSchema = {
            mentionId: 1,
            userId: "test2",
            eventId: 4,
            isChecked: false,
            createdAt: "2023-04-08",
            updatedAt: "2023-04-08",
        };
        let mypageservice = new MypageService();
        mypageservice.MypageRepository = Object.assign(
            {},
            mockMypageRepository
        );
        try {
            mypageservice.MypageRepository.findMention = jest.fn(
                () => ErrorByNotexistIdSchema
            );
            await mypageservice.checkMention(
                MentionCheckInsertSchema
            );
        } catch (err) {
            expect(
                mypageservice.MypageRepository.findMention
            ).toHaveBeenCalledWith({"mentionId":MentionCheckInsertSchema.mentionId});
            expect(
                mypageservice.MypageRepository.findMention
            ).toHaveBeenCalledTimes(1);
            expect(err).toBeInstanceOf(CustomError);
            expect(err.message).toEqual("해당 일정에 권한이 존재하지 않습니다.");
        }

    })
})

describe ("completeMentioned test",() => {
    beforeEach(() => {
        // restore the spy created with spyOn
        jest.resetAllMocks();
    });
    test("성공 시 mention의 ischecked 상태 업데이트", async() => {
        let mypageservice = new MypageService();
        mypageservice.MypageRepository = Object.assign(
            {},
            mockMypageRepository
        );
        mypageservice.MypageRepository.updateMention = jest.fn();
        await mypageservice.completeMentioned(
            updateMentionInsertSchema
        );
        expect(
            mypageservice.MypageRepository.updateMention
        ).toHaveBeenCalledWith({mentionId : updateMentionInsertSchema.mentionId,
            check : true
        });
        expect(
            mypageservice.MypageRepository.updateMention
        ).toHaveBeenCalledTimes(1);

    })
})

describe ("getMyfile test",() => {
    beforeEach(() => {
        // restore the spy created with spyOn
        jest.resetAllMocks();
    });
    test("성공 시 내가 올린 파일 배열 반환", async() => {
        let mypageservice = new MypageService();
        mypageservice.MypageRepository = Object.assign(
            {},
            mockMypageRepository
        );

        mypageservice.MypageRepository.findMyMeetingfile = jest.fn(
            () => MyfileMeetingReportResultSchema
        );
        mypageservice.MypageRepository.findMyReportfile = jest.fn(
            () => MyfileReportResultSchema
        );
        const result = await mypageservice.getMyfile(
            MypageonlyUserIdInsertSchema
        );

        expect(
            mypageservice.MypageRepository.findMyMeetingfile
        ).toHaveBeenCalledWith(MypageonlyUserIdInsertSchema);
        expect(
            mypageservice.MypageRepository.findMyMeetingfile
        ).toHaveBeenCalledTimes(1);

        expect(
            mypageservice.MypageRepository.findMyReportfile
        ).toHaveBeenCalledWith(MypageonlyUserIdInsertSchema);
        expect(
            mypageservice.MypageRepository.findMyReportfile
        ).toHaveBeenCalledTimes(1);
        expect(result).toStrictEqual(MyfileAllResultSchema);
    })
})

describe ("팀원이 올린 파일 확인 test",() => {
    beforeEach(() => {
        // restore the spy created with spyOn
        jest.resetAllMocks();
    });
    test("TeamMeetingReport 성공 시 TeamMeetingFile 반환", async() => {
        let mypageservice = new MypageService();
        mypageservice.MypageRepository = Object.assign(
            {},
            mockMypageRepository
        );

        mypageservice.MypageRepository.findTeam = jest.fn(
            () => TeamMemberInsertSchema
        );
        mypageservice.MypageRepository.findTeamMeetingFile = jest.fn(
            () => TeamMeetingResultSchema
        );
        const result = await mypageservice.TeamMeetingReport(
            TeamIdInsertSchema
        );

        expect(
            mypageservice.MypageRepository.findTeam
        ).toHaveBeenCalledWith(TeamIdInsertSchema);
        expect(
            mypageservice.MypageRepository.findTeam
        ).toHaveBeenCalledTimes(1);

        expect(
            mypageservice.MypageRepository.findTeamMeetingFile
        ).toHaveBeenCalledWith({"team" :TeamMemberInsertSchema });
        expect(
            mypageservice.MypageRepository.findTeamMeetingFile
        ).toHaveBeenCalledTimes(1);

        expect(result).toStrictEqual(TeamMeetingResultSchema);
    })
    test("TeamReport 성공 시 TeamReportFile 반환", async() => {
        let mypageservice = new MypageService();
        mypageservice.MypageRepository = Object.assign(
            {},
            mockMypageRepository
        );

        mypageservice.MypageRepository.findTeam = jest.fn(
            () => TeamMemberInsertSchema
        );
        mypageservice.MypageRepository.findTeamReportFile = jest.fn(
            () => TeamResultSchema
        );
        const result = await mypageservice.TeamReport(
            TeamIdInsertSchema
        );

        expect(
            mypageservice.MypageRepository.findTeam
        ).toHaveBeenCalledWith(TeamIdInsertSchema);
        expect(
            mypageservice.MypageRepository.findTeam
        ).toHaveBeenCalledTimes(1);

        expect(
            mypageservice.MypageRepository.findTeamReportFile
        ).toHaveBeenCalledWith({"team" :TeamMemberInsertSchema });
        expect(
            mypageservice.MypageRepository.findTeamReportFile
        ).toHaveBeenCalledTimes(1);

        expect(result).toStrictEqual(TeamResultSchema);
    })
})

describe("파일 상세 조회 test",() => {
    beforeEach(() => {
        // restore the spy created with spyOn
        jest.resetAllMocks();
    });
    test("getDatailMyfile 성공시 MyfileDatail 반환", async() =>{
        let mypageservice = new MypageService();
        mypageservice.MypageRepository = Object.assign(
            {},
            mockMypageRepository
        );

        mypageservice.MypageRepository.getcalendarId = jest.fn(
            () => DetailEvnetTypeResultSchema
        );
        mypageservice.MypageRepository.getDetailMyfile = jest.fn(
            () => DetailMeetingReportResultSchema
        );
        const result = await mypageservice.getDatailMyfile(
            IdInsertSchema
        );

        expect(
            mypageservice.MypageRepository.getcalendarId
        ).toHaveBeenCalledWith(IdInsertSchema);
        expect(
            mypageservice.MypageRepository.getcalendarId
        ).toHaveBeenCalledTimes(1);

        expect(
            mypageservice.MypageRepository.getDetailMyfile
        ).toHaveBeenCalledWith({Id : IdInsertSchema.Id,
            event : DetailEvnetTypeResultSchema });
        expect(
            mypageservice.MypageRepository.getDetailMyfile
        ).toHaveBeenCalledTimes(1);

        expect(result).toStrictEqual(DetailMeetingReportResultSchema);
    })

    test("getDetailMeetingFile 성공시 MeetingFileDatail 반환", async() =>{
        let mypageservice = new MypageService();
        mypageservice.MypageRepository = Object.assign(
            {},
            mockMypageRepository
        );

        mypageservice.MypageRepository.getDetailMeetingFile = jest.fn(
            () => DetailMeetingReportResultSchema
        );
        const result = await mypageservice.getDetailMeetingFile(
            IdInsertSchema
        );

        expect(
            mypageservice.MypageRepository.getDetailMeetingFile
        ).toHaveBeenCalledWith(IdInsertSchema);
        expect(
            mypageservice.MypageRepository.getDetailMeetingFile
        ).toHaveBeenCalledTimes(1);

        expect(result).toStrictEqual(DetailMeetingReportResultSchema);
    })

    test("getDetailReportFile 성공시 ReportFileDatail 반환", async() =>{
        let mypageservice = new MypageService();
        mypageservice.MypageRepository = Object.assign(
            {},
            mockMypageRepository
        );

        mypageservice.MypageRepository.getDetailReportFile = jest.fn(
            () => DetailMeetingReportResultSchema
        );
        const result = await mypageservice.getDetailReportFile(
            IdInsertSchema
        );

        expect(
            mypageservice.MypageRepository.getDetailReportFile
        ).toHaveBeenCalledWith(IdInsertSchema);
        expect(
            mypageservice.MypageRepository.getDetailReportFile
        ).toHaveBeenCalledTimes(1);

        expect(result).toStrictEqual(DetailMeetingReportResultSchema);
    })
})
describe("getWeeklySchedule test",() => {
    beforeEach(() => {
        // restore the spy created with spyOn
        jest.resetAllMocks();
    });
    test("getWeeklySchedule 성공 시 일주일 스케줄 반환", async() => {
        let mypageservice = new MypageService();
        mypageservice.MypageRepository = Object.assign(
            {},
            mockMypageRepository
        );

        mypageservice.MypageRepository.getWeeklyMeeting = jest.fn(
            () => WeeklyMeetingResultSchema
        );
        mypageservice.MypageRepository.getWeeklyOther = jest.fn(
            () => WeeklyOtherResultSchema
        );
        mypageservice.MypageRepository.getWeeklySchedule = jest.fn(
            () => WeeklyScheduleResultSchema
        );
        mypageservice.MypageRepository.getWeeklyIssue = jest.fn(
            () => WeeklyIssueResultSchema
        );
        const result = await mypageservice.getWeeklySchedule(
            weeklyScheduleInsertSchema
        );

        expect(
            mypageservice.MypageRepository.getWeeklyMeeting
        ).toHaveBeenCalledWith(weeklyScheduleInsertSchema);
        expect(
            mypageservice.MypageRepository.getWeeklyMeeting
        ).toHaveBeenCalledTimes(1);

        expect(
            mypageservice.MypageRepository.getWeeklyOther
        ).toHaveBeenCalledWith(weeklyScheduleInsertSchema);
        expect(
            mypageservice.MypageRepository.getWeeklyOther
        ).toHaveBeenCalledTimes(1);

        expect(
            mypageservice.MypageRepository.getWeeklySchedule
        ).toHaveBeenCalledWith(weeklyScheduleInsertSchema);
        expect(
            mypageservice.MypageRepository.getWeeklySchedule
        ).toHaveBeenCalledTimes(1);

        expect(
            mypageservice.MypageRepository.getWeeklyIssue
        ).toHaveBeenCalledWith(weeklyScheduleInsertSchema);
        expect(
            mypageservice.MypageRepository.getWeeklyIssue
        ).toHaveBeenCalledTimes(1);

        expect(result).toStrictEqual({
            meeting : WeeklyMeetingResultSchema,
            other : WeeklyOtherResultSchema,
            schedule : WeeklyScheduleResultSchema,
            issue : WeeklyIssueResultSchema
        });
    })
})