const SignupController = require("../../../controllers/signup.controller")
const CustomError = require("../../../middlewares/errorHandler");

const {
    SignupinvalidData,
    SignupvalidData,
    SignupInsertSchema,
    CheckIDinvalidData,
    CheckIDvalidData
} = require("../../fixtures/signup.fixtures")
const { ResisterSchema, checkIdSchema } = require("../../../schemas/signup.schema")

const mockSignupService = () => ({
    existCompanyName: jest.fn(),
    existCompanyId: jest.fn(),
    companySignup: jest.fn(),
    existCompanyId: jest.fn()
})

let mockNext = jest.fn();

describe("companySignup test", () => {
    let signupcontroller = new SignupController();
    signupcontroller.SignupService = mockSignupService();

    let mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
    };
    let mockRequest = {
        body: {
            companyName: "testcompany",
            address: "서울시 어쩌고",
            ceoName: "testman",
            companyNum: "1234567899",
            ceoNum: "01012345678",
            companyId: "test1",
            password: "1234aaaa!!",
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    test("성공 시 성공메세지 반환", async () => {
        signupcontroller.SignupService.existCompanyName = jest.fn()
        signupcontroller.SignupService.existCompanyId = jest.fn()
        signupcontroller.SignupService.companySignup = jest.fn()
        mockResponse.status = jest.fn(() => {
            return mockResponse;
        });

        await signupcontroller.companySignup(
            mockRequest,
            mockResponse,
            mockNext
        );
        //Joi 테스트
        expect(ResisterSchema.validateAsync(SignupinvalidData, { abortEarly: false }))
            .rejects
            .toThrow(new CustomError("비밀번호는 숫자와 특수문자가 1개이상 포함되어 있어야 합니다.", 401));

        // ResisterSchema에 맞는 데이터를 전달할 경우
        await expect(ResisterSchema.validateAsync(SignupvalidData, { abortEarly: false })).resolves.not.toThrow();

        expect(
            signupcontroller.SignupService.existCompanyName
        ).toHaveBeenCalledTimes(1);
        expect(
            signupcontroller.SignupService.existCompanyName
        ).toHaveBeenCalledWith({ companyName: mockRequest.body.companyName });

        expect(
            signupcontroller.SignupService.existCompanyId
        ).toHaveBeenCalledTimes(1);
        expect(
            signupcontroller.SignupService.existCompanyId
        ).toHaveBeenCalledWith({ companyId: mockRequest.body.companyId });

        expect(
            signupcontroller.SignupService.companySignup
        ).toHaveBeenCalledTimes(1);
        expect(
            signupcontroller.SignupService.companySignup
        ).toHaveBeenCalledWith(SignupInsertSchema);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "회원가입에 성공하였습니다."
        });
        expect(mockNext).not.toHaveBeenCalled();
    })

    test("existCompanyName 실패시 에러 반환", async () => {
        const companySignupErrorMessage = "강제로 발생시킨 에러입니다.";
        signupcontroller.SignupService.existCompanyName = jest.fn(() => {
            throw new CustomError(companySignupErrorMessage);
        });
        // Error가 발생합니다.
        await signupcontroller.companySignup(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(
            new CustomError(companySignupErrorMessage)
        );
    })
    test("existCompanyId 실패시 에러 반환", async () => {
        const companySignupErrorMessage = "강제로 발생시킨 에러입니다.";
        signupcontroller.SignupService.existCompanyId = jest.fn(() => {
            throw new CustomError(companySignupErrorMessage);
        });
        // Error가 발생합니다.
        await signupcontroller.companySignup(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(
            new CustomError(companySignupErrorMessage)
        );
    })
    test("companySignup 실패시 에러 반환", async () => {
        const companySignupErrorMessage = "강제로 발생시킨 에러입니다.";
        signupcontroller.SignupService.companySignup = jest.fn(() => {
            throw new CustomError(companySignupErrorMessage);
        });
        // Error가 발생합니다.
        await signupcontroller.companySignup(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(
            new CustomError(companySignupErrorMessage)
        );
    })
})

describe("checkId test", () => {
    let signupcontroller = new SignupController();
    signupcontroller.SignupService = mockSignupService();

    let mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
    };
    let mockRequest = {
        body: {
            companyId: "test1",
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    test("성공시 성공 메세지 반환", async () => {
        signupcontroller.SignupService.existCompanyId = jest.fn()
        mockResponse.status = jest.fn(() => {
            return mockResponse;
        });

        await signupcontroller.checkId(
            mockRequest,
            mockResponse,
            mockNext
        );
        //Joi 테스트
        expect(checkIdSchema.validateAsync(CheckIDinvalidData, { abortEarly: false }))
            .rejects
            .toThrow(new CustomError("아이디는 영문 대/소문자와 숫자만 포함 가능합니다.", 401));

        // ResisterSchema에 맞는 데이터를 전달할 경우
        await expect(checkIdSchema.validateAsync(CheckIDvalidData, { abortEarly: false })).resolves.not.toThrow();

        expect(
            signupcontroller.SignupService.existCompanyId
        ).toHaveBeenCalledTimes(1);
        expect(
            signupcontroller.SignupService.existCompanyId
        ).toHaveBeenCalledWith(mockRequest.body);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "사용할 수 있는 아이디입니다."
        });
        expect(mockNext).not.toHaveBeenCalled();
    })

    test("existCompanyId 실패시 에러 반환", async () => {
        const existCompanyIdErrorMessage = "강제로 발생시킨 에러입니다.";
        signupcontroller.SignupService.existCompanyId = jest.fn(() => {
            throw new CustomError(existCompanyIdErrorMessage);
        });
        // Error가 발생합니다.
        await signupcontroller.checkId(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(
            new CustomError(existCompanyIdErrorMessage)
        );
    })
})