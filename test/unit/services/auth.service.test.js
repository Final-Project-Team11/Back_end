const AuthService = require("../../../services/auth.service")
const CustomError = require("../../../middlewares/errorHandler");
const {
    checkIdResultSchema,
    AdminAuthvalidData
} = require("../../fixtures/auth.fixtures")

const mockAuthRepository = () => ({
    findByCompanyId : jest.fn(),
    findByUserId: jest.fn(),
    findTeamById: jest.fn(),
    findCompanyById: jest.fn(),
    updateUser: jest.fn()
})

describe("checkIdPassword test",() => {
    beforeEach(() => {
        // restore the spy created with spyOn
        jest.resetAllMocks();
    });
    test("성공 시 user 반환",async() => {
        let authservice = new AuthService();
        authservice.AuthRepository = Object.assign(
            {},
            mockAuthRepository
        )

        authservice.AuthRepository.findByCompanyId = jest.fn(
            () => checkIdResultSchema
        )
        await authservice.checkIdPassword(
            AdminAuthvalidData
        )

        expect(
            authservice.AuthRepository.findByCompanyId
        ).toHaveBeenCalledWith({conpanyId : AdminAuthvalidData.companyId});
        expect(
            authservice.AuthRepository.findByCompanyId
        ).toHaveBeenCalledTimes(1);
    })
})