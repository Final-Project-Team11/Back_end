const AuthController = require("../../../controllers/auth.controller")
const CustomError = require("../../../middlewares/errorHandler");

const {
    checkIdResultSchema,
    TokenResultSchema,
    AdminAuthinvalidData,
    AdminAuthvalidData,
    UsercheckIdResultSchema,
    UserAuthinvalidData,
    UserAuthvalidData,
    UserTokenResultSchema,
    ModifyinvalidData,
    ModifyvalidData
} = require("../../fixtures/auth.fixtures")
const {
    adminLoginSchema,
    userLoginSchema,
    modifySchema
} = require("../../../schemas/auth.schema")
const mockAuthService = () => ({
    checkIdPassword: jest.fn(),
    adminLogin: jest.fn(),
    checkUserIdPassword: jest.fn(),
    checkCompanyId: jest.fn(),
    userLogin: jest.fn(),
    updateUser: jest.fn()
})

let mockNext = jest.fn()

describe("adminLogin test", () => {
    let authcontroller = new AuthController();
    authcontroller.AuthService = mockAuthService();
    let mockResponse = {
        status: jest.fn(),
        json: jest.fn()
    }
    let mockRequest = {
        body: {
            companyId: "testcompany",
            password: "aaaa1111!!"
        }
    }

    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    test("adminLogin 성공 시 token 반환", async () => {
        authcontroller.AuthService.checkIdPassword = jest.fn(
            () => checkIdResultSchema
        )
        authcontroller.AuthService.adminLogin = jest.fn(
            () => TokenResultSchema
        )
        mockResponse.status = jest.fn(() => {
            return mockResponse;
        });

        await authcontroller.adminLogin(
            mockRequest,
            mockResponse,
            mockNext
        );

        //Joi 테스트
        expect(adminLoginSchema.validateAsync(AdminAuthinvalidData, { abortEarly: false }))
            .rejects
            .toThrow(new CustomError("password 필드는 문자열로 이루어져야 합니다.", 401));

        // ResisterSchema에 맞는 데이터를 전달할 경우
        await expect(adminLoginSchema.validateAsync(AdminAuthvalidData, { abortEarly: false })).resolves.not.toThrow();

        expect(
            authcontroller.AuthService.checkIdPassword
        ).toHaveBeenCalledTimes(1);
        expect(
            authcontroller.AuthService.checkIdPassword
        ).toHaveBeenCalledWith(mockRequest.body);

        expect(
            authcontroller.AuthService.adminLogin
        ).toHaveBeenCalledTimes(1);
        expect(
            authcontroller.AuthService.adminLogin
        ).toHaveBeenCalledWith({ user: checkIdResultSchema });

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "로그인에 성공했습니다",
            token: `Bearer ${TokenResultSchema}`
        });
        expect(mockNext).not.toHaveBeenCalled();
    })

    test("checkIdPassword 실패 시 에러반환", async () => {
        const checkIdPasswordErrorMessage = "강제로 발생시킨 에러입니다.";
        authcontroller.AuthService.checkIdPassword = jest.fn(() => {
            throw new CustomError(checkIdPasswordErrorMessage);
        });

        await authcontroller.adminLogin(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(
            new CustomError(checkIdPasswordErrorMessage)
        );

    })
    test("adminLogin 실패 시 에러반환", async () => {
        const adminLoginErrorMessage = "강제로 발생시킨 에러입니다.";
        authcontroller.AuthService.adminLogin = jest.fn(() => {
            throw new CustomError(adminLoginErrorMessage);
        });

        await authcontroller.adminLogin(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(
            new CustomError(adminLoginErrorMessage)
        );
    })
})

describe("userLogin test", () => {
    let authcontroller = new AuthController();
    authcontroller.AuthService = mockAuthService();
    let mockRequest = {
        body: {
            companyId: "testcompany",
            userId: "test1",
            password: "aaaa1111!!"
        }
    }
    beforeEach(() => {
        jest.resetAllMocks();
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    test("userLogin 성공시 토큰 반환", async () => {
        authcontroller.AuthService.checkUserIdPassword = jest.fn(
            () => UsercheckIdResultSchema
        )
        authcontroller.AuthService.checkCompanyId = jest.fn()
        authcontroller.AuthService.userLogin = jest.fn(
            () => UserTokenResultSchema
        )
        mockResponse.status = jest.fn(() => {
            return mockResponse;
        });
        await authcontroller.userLogin(
            mockRequest,
            mockResponse,
            mockNext
        )
        //Joi 테스트
        expect(userLoginSchema.validateAsync(UserAuthinvalidData, { abortEarly: false }))
            .rejects
            .toThrow(new CustomError("pasword 필드는 문자열로 이루어져야 합니다.", 401));

        // ResisterSchema에 맞는 데이터를 전달할 경우
        await expect(userLoginSchema.validateAsync(UserAuthvalidData, { abortEarly: false })).resolves.not.toThrow();
        expect(
            authcontroller.AuthService.checkUserIdPassword
        ).toHaveBeenCalledTimes(1);
        expect(
            authcontroller.AuthService.checkUserIdPassword
        ).toHaveBeenCalledWith({
            userId: mockRequest.body.userId,
            password: mockRequest.body.password
        });

        expect(authcontroller.AuthService.checkCompanyId).toHaveBeenCalledTimes(1)
        expect(authcontroller.AuthService.checkCompanyId).toHaveBeenCalledWith({ companyId: mockRequest.body.companyId })

        expect(authcontroller.AuthService.userLogin).toHaveBeenCalledTimes(1)
        expect(authcontroller.AuthService.userLogin).toHaveBeenCalledWith({
            user: UsercheckIdResultSchema,
            userId: mockRequest.body.userId
        })
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "로그인에 성공했습니다",
            token: `Bearer ${UserTokenResultSchema}`
        });
        expect(mockNext).not.toHaveBeenCalled();
    })

    test("checkUserIdPassword 실패시 에러반환", async () => {
        const checkUserIdPasswordErrorMessage = "강제로 발생시킨 에러입니다.";
        authcontroller.AuthService.checkUserIdPassword = jest.fn(() => {
            throw new CustomError(checkUserIdPasswordErrorMessage);
        });

        await authcontroller.userLogin(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(
            new CustomError(checkUserIdPasswordErrorMessage)
        );
    })
    test("checkCompanyId 실패시 에러반환", async () => {
        const checkCompanyIdErrorMessage = "강제로 발생시킨 에러입니다.";
        authcontroller.AuthService.checkCompanyId = jest.fn(() => {
            throw new CustomError(checkCompanyIdErrorMessage);
        });

        await authcontroller.userLogin(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(
            new CustomError(checkCompanyIdErrorMessage)
        );
    })
    test("userLogin 실패시 에러반환", async () => {
        const userLoginErrorMessage = "강제로 발생시킨 에러입니다.";
        authcontroller.AuthService.userLogin = jest.fn(() => {
            throw new CustomError(userLoginErrorMessage);
        });

        await authcontroller.userLogin(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(
            new CustomError(userLoginErrorMessage)
        );
    })
})

// describe("modifyPassword test", () => {
//     let authcontroller = new AuthController();
//     authcontroller.AuthService = mockAuthService();

//     let mockResponse = {
//         status: jest.fn(),
//         json: jest.fn(),
//         locals: {
//             user: {
//                 userId: "test1",
//             },
//         },
//     };
//     let mockRequest = {
//         body: {
//             password: "aaaa1111!!"
//         },
//         locals: {
//             user: {
//                 userId: "test1",
//             },
//         },
//     }
//     let mockNext = jest.fn()

//     beforeEach(() => {
//         jest.resetAllMocks();
//     });

//     test("modifyPassword 성공시 성공 메세지 반환", async () => {
//         authcontroller.AuthService.updateUser = jest.fn()
//         mockResponse.status = jest.fn(() => {
//             return mockResponse;
//         });
//         console.log(mockResponse.locals)
//         await authcontroller.modifyPassword(
//             mockResponse,
//             mockRequest,
//             mockNext
//         )
//         //Joi 테스트
//         expect(modifySchema.validateAsync(ModifyinvalidData, { abortEarly: false }))
//             .rejects
//             .toThrow(new CustomError("password 필드는 문자열로 이루어져야 합니다.", 401));

//         // ResisterSchema에 맞는 데이터를 전달할 경우
//         await expect(modifySchema.validateAsync(ModifyvalidData, { abortEarly: false })).resolves.not.toThrow();
//         expect(authcontroller.AuthService.updateUser).toHaveBeenCalledTimes(1)
//     })
// })