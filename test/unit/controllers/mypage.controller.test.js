const CustomError = require("../../../middlewares/errorHandler");
const MypageController = require("../../../controllers/myPage.controller");
const {
    MypageUserInfoSchemaByController,
    MypageUserSchemaByController,
    MyScheduleResultSchema,
    MentionScheduleResultSchema,
    MentionMeetingResultSchema,
    MentionIssueResultSchema,
    MentionReportResultSchema,
    MentionMeetingReportsResultSchema,
    MentionOtherResultSchema,
    TotalMentionResultSchema,
    MentionCheckInsertSchema,
    MentionCheckResultSchema,
    MyfileAllResultSchema,
    TeamMenberResultSchema
} = require("../../fixtures/mypage.fixtures");

const mockMypageService = () => ({
    checkUserById: jest.fn(),
    getUserInfo: jest.fn(),
    getUserSchedule: jest.fn(),
    getMentionedSchedules: jest.fn(),
    getMentionedMeeting: jest.fn(),
    getMentionedIssue: jest.fn(),
    getMentionedReport: jest.fn(),
    getMentionedMeetingReports: jest.fn(),
    getMentionedOther: jest.fn(),
    filterIssue: jest.fn(),
    checkMention: jest.fn(),
    completeMentioned: jest.fn(),
    getMyfile: jest.fn(),
    TeamMeetingReport: jest.fn(),
    TeamReport: jest.fn(),
});
let mockNext = jest.fn();

describe("getUserInfo test", () => {
    let mypagecontroller = new MypageController();
    mypagecontroller.MypageService = mockMypageService();
    let mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        locals: {
            user: {
                userId: "test1",
            },
        },
    };
    let mockRequest = {
        body: {},
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    test("성공 시 userInfo 반환", async () => {
        mypagecontroller.MypageService.checkUserById = jest.fn(() => {
            return MypageUserSchemaByController;
        });
        mypagecontroller.MypageService.getUserInfo = jest.fn(() => {
            return MypageUserInfoSchemaByController;
        });
        mockResponse.status = jest.fn(() => {
            return mockResponse;
        });
        await mypagecontroller.getUserInfo(mockRequest, mockResponse, mockNext);

        expect(
            mypagecontroller.MypageService.checkUserById
        ).toHaveBeenCalledTimes(1);
        expect(
            mypagecontroller.MypageService.checkUserById
        ).toHaveBeenCalledWith(mockResponse.locals.user);

        expect(
            mypagecontroller.MypageService.getUserInfo
        ).toHaveBeenCalledTimes(1);
        expect(mypagecontroller.MypageService.getUserInfo).toHaveBeenCalledWith(
            { user: MypageUserSchemaByController }
        );

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({
            user: MypageUserInfoSchemaByController,
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    test("checkUserById 실패시 에러 반환", async () => {
        const checkUserByIdErrorMessage = "강제로 발생시킨 에러입니다.";
        mypagecontroller.MypageService.checkUserById = jest.fn(() => {
            throw Error(checkUserByIdErrorMessage);
        });
        // Error가 발생합니다.
        await mypagecontroller.getUserInfo(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalledWith(
            new CustomError(checkUserByIdErrorMessage)
        );
    });

    test("getUserInfo 실패시 에러 반환", async () => {
        const getUserInfoErrorMessage = "강제로 발생시킨 에러입니다.";
        mypagecontroller.MypageService.getUserInfo = jest.fn(() => {
            throw Error(getUserInfoErrorMessage);
        });
        // Error가 발생합니다.
        await mypagecontroller.getUserInfo(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalledWith(
            new CustomError(getUserInfoErrorMessage)
        );
    });
});

describe("getSchedules test", () => {
    let mypagecontroller = new MypageController();
    mypagecontroller.MypageService = mockMypageService();
    let mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        locals: {
            user: {
                userId: "test1",
            },
        },
    };
    let mockRequest = {
        body: {},
        query: {
            pageNum: 1,
            pageSize: 5,
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    test("성공시 my schedules 반환", async () => {
        mypagecontroller.MypageService.getUserSchedule = jest.fn(() => {
            return MyScheduleResultSchema;
        });
        mockResponse.status = jest.fn(() => {
            return mockResponse;
        });
        await mypagecontroller.getSchedules(
            mockRequest,
            mockResponse,
            mockNext
        );

        expect(
            mypagecontroller.MypageService.getUserSchedule
        ).toHaveBeenCalledTimes(1);
        expect(
            mypagecontroller.MypageService.getUserSchedule
        ).toHaveBeenCalledWith(mockResponse.locals.user);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({
            schedule: MyScheduleResultSchema,
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    test("getSchedules 실패 시 에러 반환", async () => {
        const getSchedulesErrorMessage = "강제로 발생시킨 에러입니다.";
        mypagecontroller.MypageService.getUserSchedule = jest.fn(() => {
            throw new CustomError(getSchedulesErrorMessage);
        });
        // Error가 발생합니다.
        await mypagecontroller.getSchedules(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(
            new CustomError(getSchedulesErrorMessage)
        );
    });
});

describe("getMentionedSchedules test", () => {
    let mypagecontroller = new MypageController();
    mypagecontroller.MypageService = mockMypageService();
    let mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        locals: {
            user: {
                userId: "test1",
            },
        },
    };
    let mockRequest = {
        body: {},
        query: {
            pageNum: 1,
            pageSize: 5,
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    test("성공 시 MentionedSchedules 반환", async () => {
        mypagecontroller.MypageService.getMentionedSchedules = jest.fn(() => {
            return MentionScheduleResultSchema;
        });
        mypagecontroller.MypageService.getMentionedMeeting = jest.fn(() => {
            return MentionMeetingResultSchema;
        });
        mypagecontroller.MypageService.getMentionedIssue = jest.fn(() => {
            return MentionIssueResultSchema;
        });
        mypagecontroller.MypageService.getMentionedReport = jest.fn(() => {
            return MentionReportResultSchema;
        });
        mypagecontroller.MypageService.getMentionedMeetingReports = jest.fn(
            () => {
                return MentionMeetingReportsResultSchema;
            }
        );
        mypagecontroller.MypageService.getMentionedOther = jest.fn(() => {
            return MentionOtherResultSchema;
        });
        mypagecontroller.MypageService.filterIssue = jest.fn(() => {
            return TotalMentionResultSchema;
        });
        mockResponse.status = jest.fn(() => {
            return mockResponse;
        });

        await mypagecontroller.getMentionedSchedules(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(
            mypagecontroller.MypageService.getMentionedSchedules
        ).toHaveBeenCalledTimes(1);
        expect(
            mypagecontroller.MypageService.getMentionedSchedules
        ).toHaveBeenCalledWith(mockResponse.locals.user);

        expect(
            mypagecontroller.MypageService.getMentionedMeeting
        ).toHaveBeenCalledTimes(1);
        expect(
            mypagecontroller.MypageService.getMentionedMeeting
        ).toHaveBeenCalledWith(mockResponse.locals.user);

        expect(
            mypagecontroller.MypageService.getMentionedIssue
        ).toHaveBeenCalledTimes(1);
        expect(
            mypagecontroller.MypageService.getMentionedIssue
        ).toHaveBeenCalledWith(mockResponse.locals.user);

        expect(
            mypagecontroller.MypageService.getMentionedReport
        ).toHaveBeenCalledTimes(1);
        expect(
            mypagecontroller.MypageService.getMentionedReport
        ).toHaveBeenCalledWith(mockResponse.locals.user);

        expect(
            mypagecontroller.MypageService.getMentionedMeetingReports
        ).toHaveBeenCalledTimes(1);
        expect(
            mypagecontroller.MypageService.getMentionedMeetingReports
        ).toHaveBeenCalledWith(mockResponse.locals.user);

        expect(
            mypagecontroller.MypageService.getMentionedOther
        ).toHaveBeenCalledTimes(1);
        expect(
            mypagecontroller.MypageService.getMentionedOther
        ).toHaveBeenCalledWith(mockResponse.locals.user);

        expect(
            mypagecontroller.MypageService.filterIssue
        ).toHaveBeenCalledTimes(1);
        expect(mypagecontroller.MypageService.filterIssue).toHaveBeenCalledWith(
            {
                schedule: MentionScheduleResultSchema,
                meeting: MentionMeetingResultSchema,
                issues: MentionIssueResultSchema,
                report: MentionReportResultSchema,
                meetingReport: MentionMeetingReportsResultSchema,
                other: MentionOtherResultSchema,
            }
        );

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({
            mention: TotalMentionResultSchema,
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    test("getMentionedSchedules 실패 시 에러 반환", async () => {
        const getMentionedSchedulesErrorMessage = "강제로 발생시킨 에러입니다.";
        mypagecontroller.MypageService.getMentionedSchedules = jest.fn(() => {
            throw new CustomError(getMentionedSchedulesErrorMessage);
        });
        // Error가 발생합니다.
        await mypagecontroller.getMentionedSchedules(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(
            new CustomError(getMentionedSchedulesErrorMessage)
        );
    });
    //나머지 에러반환 테스트는 나중에!
});

describe("completeMentioned test", () => {
    let mypagecontroller = new MypageController();
    mypagecontroller.MypageService = mockMypageService();
    let mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        locals: {
            user: {
                userId: "test1",
            },
        },
    };
    let mockRequest = {
        body: {},
        params: {
            mentionId: 1,
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    test("completeMentioned 성공 시 일정 메세지 반환", async () => {
        mypagecontroller.MypageService.checkMention = jest.fn(() => {
            return MentionCheckResultSchema;
        });
        mypagecontroller.MypageService.completeMentioned = jest.fn(() => {
            return;
        });
        mockResponse.status = jest.fn(() => {
            return mockResponse;
        });

        await mypagecontroller.completeMentioned(
            mockRequest,
            mockResponse,
            mockNext
        );

        expect(
            mypagecontroller.MypageService.checkMention
        ).toHaveBeenCalledTimes(1);
        expect(
            mypagecontroller.MypageService.checkMention
        ).toHaveBeenCalledWith(MentionCheckInsertSchema);

        expect(
            mypagecontroller.MypageService.completeMentioned
        ).toHaveBeenCalledTimes(1);
        expect(
            mypagecontroller.MypageService.completeMentioned
        ).toHaveBeenCalledWith({ existMention: MentionCheckResultSchema,mentionId : 1});

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message : "멘션된 해당 일정을 확인하였습니다.",
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    test("checkMention 실패시 에러 반환",async () => {
        const getcheckMentionErrorMessage = "강제로 발생시킨 에러입니다.";
        mypagecontroller.MypageService.checkMention = jest.fn(() => {
            throw new CustomError(getcheckMentionErrorMessage);
        });
        // Error가 발생합니다.
        await mypagecontroller.completeMentioned(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(
            new CustomError(getcheckMentionErrorMessage)
        );
    })

    test("completeMentioned 실패시 에러 반환",async () => {
        const getcompleteMentionedErrorMessage = "강제로 발생시킨 에러입니다.";
        mypagecontroller.MypageService.completeMentioned = jest.fn(() => {
            throw new CustomError(getcompleteMentionedErrorMessage);
        });
        // Error가 발생합니다.
        await mypagecontroller.completeMentioned(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(
            new CustomError(getcompleteMentionedErrorMessage)
        );
    })
});

describe("getMyFiles test",() => {
    let mypagecontroller = new MypageController();
    mypagecontroller.MypageService = mockMypageService();
    let mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        locals: {
            user: {
                userId: "test1",
            },
        },
    };
    let mockRequest = {
        body: {},
        query: {
            pageNum: 1,
            pageSize: 5,
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    test("getMyFiles 성공 시 myfiles 반환", async() => {
        mypagecontroller.MypageService.getMyfile = jest.fn(() => {
            return MyfileAllResultSchema;
        });
        mockResponse.status = jest.fn(() => {
            return mockResponse;
        });

        await mypagecontroller.getMyFiles(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(
            mypagecontroller.MypageService.getMyfile
        ).toHaveBeenCalledTimes(1);
        expect(
            mypagecontroller.MypageService.getMyfile
        ).toHaveBeenCalledWith(mockResponse.locals.user);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({
            myfiles : MyfileAllResultSchema,
        });
        expect(mockNext).not.toHaveBeenCalled();
    })  
    
    test("getMyfile 실패시 에러 반환",async () => {
        const getMyfileErrorMessage = "강제로 발생시킨 에러입니다.";
        mypagecontroller.MypageService.getMyfile = jest.fn(() => {
            throw new CustomError(getMyfileErrorMessage);
        });
        // Error가 발생합니다.
        await mypagecontroller.getMyFiles(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(
            new CustomError(getMyfileErrorMessage)
        );
    })
})

describe ("getMeetingFiles test" ,() => {
    let mypagecontroller = new MypageController();
    mypagecontroller.MypageService = mockMypageService();
    let mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        locals: {
            user: {
                teamId: "testteam",
            },
        },
    };
    let mockRequest = {
        body: {},
        query: {
            pageNum: 1,
            pageSize: 3,
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    test("getMeetingFiles 성공 시 meetingfiles 반환", async () => {
        mypagecontroller.MypageService.TeamMeetingReport = jest.fn(() => {
            return TeamMenberResultSchema;
        });
        mockResponse.status = jest.fn(() => {
            return mockResponse;
        });

        await mypagecontroller.getMeetingFiles(
            mockRequest,
            mockResponse,
            mockNext
        )

        expect(
            mypagecontroller.MypageService.TeamMeetingReport
        ).toHaveBeenCalledTimes(1);
        expect(
            mypagecontroller.MypageService.TeamMeetingReport
        ).toHaveBeenCalledWith(mockResponse.locals.user);//

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({meetingfiles :TeamMenberResultSchema});
        expect(mockNext).not.toHaveBeenCalled();
    })

    test("TeamMeetingReport 실패했을 때 에러반환", async () => {
        const getTeamMeetingReportErrorMessage = "강제로 발생시킨 에러입니다.";
        mypagecontroller.MypageService.TeamMeetingReport = jest.fn(() => {
            throw new CustomError(getTeamMeetingReportErrorMessage);
        });
        // Error가 발생합니다.
        await mypagecontroller.getMeetingFiles(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(
            new CustomError(getTeamMeetingReportErrorMessage)
        );
    })
})
