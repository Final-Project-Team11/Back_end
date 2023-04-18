const CustomError = require('../../../middlewares/errorHandler')
const MypageController = require("../../../controllers/myPage.controller");
const {
    MypageUserInfoSchemaByController,
    MypageUserSchemaByController,
    MyScheduleResultSchema
} = require("../fixtures/mypage.fixtures");

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
    let mockRequest = {
        body: {},
    };

    let mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        locals: {
            user: {
                userId: "test1",
            },
        },
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
        expect(
            mypagecontroller.MypageService.getUserInfo
        ).toHaveBeenCalledWith({user : MypageUserSchemaByController});

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({
            user: MypageUserInfoSchemaByController,
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    test("checkUserById 실패시 에러 반환", async () => {
        const checkUserByIdErrorMessage = '강제로 발생시킨 에러입니다.';
        mypagecontroller.MypageService.checkUserById = jest.fn(() => {
            throw Error(checkUserByIdErrorMessage)
        })
        // Error가 발생합니다.
        await mypagecontroller.getUserInfo(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalledWith(new CustomError(checkUserByIdErrorMessage))
    })

    test("getUserInfo 실패시 에러 반환", async () => {
        const getUserInfoErrorMessage = '강제로 발생시킨 에러입니다.';
        mypagecontroller.MypageService.getUserInfo = jest.fn(() => {
            throw Error(getUserInfoErrorMessage)
        })
        // Error가 발생합니다.
        await mypagecontroller.getUserInfo(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalledWith(new CustomError(getUserInfoErrorMessage))
    })
});

describe ("getSchedules test", () => {
    let mypagecontroller = new MypageController();
    mypagecontroller.MypageService = mockMypageService();
    let mockRequest = {
        body: {},
        query:{
            pageNum :1,
            pageSize : 5
        }
    };

    let mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        locals: {
            user: {
                userId: "test1",
            },
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    test("성공시 my schedules 반환", async() => {
        mypagecontroller.MypageService.getUserSchedule = jest.fn(() => {
            return MyScheduleResultSchema
        });
        mockResponse.status = jest.fn(() => {
            return mockResponse;
        });
        await mypagecontroller.getSchedules(mockRequest, mockResponse, mockNext);

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
    })
})
