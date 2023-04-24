const MypageService = require("../../../services/myPage.service");
const CustomError = require("../../../middlewares/errorHandler");
const {
    MypageUserSchemaByController,
    MypageonlyUserIdInsertSchema,
    MypageUserIdInsertSchema,
    MyScheduleResultSchema,
    MentionScheduleResultSchema,
    MentionFindAllResultSchema,
    MyMentionInsertSchema,
    MentionCheckInsertSchema,
    MentionCheckResultSchema
} = require("../../fixtures/mypage.fixtures");

const mockMypageRepository = () => ({
    findUserById: jest.fn(),
    getUserSchedule: jest.fn(),
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

describe("checkUserById test", () => {
    beforeEach(() => {
        // restore the spy created with spyOn
        jest.resetAllMocks();
    });

    test("findUserById 성공 시 user 정보 반환", async () => {
        let mypageservice = new MypageService();
        mypageservice.MypageRepository = Object.assign(
            {},
            mockMypageRepository
        );

        mypageservice.MypageRepository.findUserById = jest.fn(
            () => MypageUserSchemaByController
        );
        const user = await mypageservice.checkUserById(
            MypageonlyUserIdInsertSchema
        );

        expect(
            mypageservice.MypageRepository.findUserById
        ).toHaveBeenCalledWith(MypageonlyUserIdInsertSchema);
        expect(
            mypageservice.MypageRepository.findUserById
        ).toHaveBeenCalledTimes(1);
        expect(user).toBe(MypageUserSchemaByController);
    });
    test("해당 유저가 존재하지 않습니다", async () => {
        let mypageservice = new MypageService();
        mypageservice.MypageRepository = Object.assign(
            {},
            mockMypageRepository
        );
        try {
            mypageservice.MypageRepository.findUserById = jest.fn(
                () => undefined
            );
            const user = await mypageservice.checkUserById(
                MypageonlyUserIdInsertSchema
            );
        } catch (err) {
            expect(
                mypageservice.MypageRepository.findUserById
            ).toHaveBeenCalledWith(MypageonlyUserIdInsertSchema);
            expect(
                mypageservice.MypageRepository.findUserById
            ).toHaveBeenCalledTimes(1);
            expect(err).toBeInstanceOf(CustomError);
            expect(err.message).toEqual("해당 유저가 존재하지 않습니다.");
        }
    });
    test("유저정보에 대한 권한이 존재하지 않습니다", async () => {
        const ErrorByNotexistIdSchema = {
            userId: "test111",
            userName: "testman11",
            team: "dev",
            remainDay: 15,
            salaryDay: 4,
        };
        let mypageservice = new MypageService();
        mypageservice.MypageRepository = Object.assign(
            {},
            mockMypageRepository
        );
        try {
            mypageservice.MypageRepository.findUserById = jest.fn(
                () => ErrorByNotexistIdSchema
            );
            const user = await mypageservice.checkUserById(
                MypageonlyUserIdInsertSchema
            );
        } catch (err) {
            expect(
                mypageservice.MypageRepository.findUserById
            ).toHaveBeenCalledWith(MypageonlyUserIdInsertSchema);
            expect(
                mypageservice.MypageRepository.findUserById
            ).toHaveBeenCalledTimes(1);
            expect(err).toBeInstanceOf(CustomError);
            expect(err.message).toEqual("유저 정보에 대한 권한이 존재하지 않습니다.");
        }

    })
});

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
        const schedule = await mypageservice.getUserSchedule(
            MypageonlyUserIdInsertSchema
        );
        expect(
            mypageservice.MypageRepository.getUserSchedule
        ).toHaveBeenCalledWith(MypageonlyUserIdInsertSchema);
        expect(
            mypageservice.MypageRepository.getUserSchedule
        ).toHaveBeenCalledTimes(1);
        expect(schedule).toStrictEqual(MyScheduleResultSchema);
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
            const existMention = await mypageservice.checkMention(
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
            const existMention = await mypageservice.checkMention(
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