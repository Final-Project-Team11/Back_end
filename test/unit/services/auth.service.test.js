const AuthService = require("../../../services/auth.service")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CustomError = require("../../../middlewares/errorHandler");
const {
    checkIdResultSchema,
    AdminAuthvalidData,
    UsercheckIdResultSchema,
    TokenResultSchema,
    TeamResultSchema,
    AdminAuthinvalidData,
    CheckCompanyResultSchema,
} = require("../../fixtures/auth.fixtures")

const mockAuthRepository = () => ({
    findByCompanyId: jest.fn(),
    findByUserId: jest.fn(),
    findTeamById: jest.fn(),
    findCompanyById: jest.fn(),
    updateUser: jest.fn()
})

describe("checkIdPassword test", () => {
    beforeEach(() => {
        // restore the spy created with spyOn
        jest.resetAllMocks();
    });
    test("성공 시 user 반환", async () => {
        jest.mock('bcrypt');
        const bcryptPassword = "$2b$10$u9aMl.83FJ4meLsr9uSFXu.moaB1iVOWItmXKOyAmpP1kQIjdDPdC"
        const user = { userId: AdminAuthvalidData.companyId, password: bcryptPassword };
        let authservice = new AuthService();
        authservice.AuthRepository = Object.assign(
            {},
            mockAuthRepository
        )
        bcrypt.compare = jest.fn(
            () => true
        );
        authservice.AuthRepository.findByCompanyId = jest.fn(
            () => checkIdResultSchema
        )
        const users = await authservice.checkIdPassword(
            AdminAuthvalidData
        )

        expect(bcrypt.compare).toHaveBeenCalledWith(AdminAuthvalidData.password, user.password);

        expect(
            authservice.AuthRepository.findByCompanyId
        ).toHaveBeenCalledWith({ companyId: AdminAuthvalidData.companyId });
        expect(
            authservice.AuthRepository.findByCompanyId
        ).toHaveBeenCalledTimes(1);
        expect(users).toBe(checkIdResultSchema)
    })

    test("아이디 오류", async () => {
        let authservice = new AuthService();
        authservice.AuthRepository = Object.assign(
            {},
            mockAuthRepository
        )
        try {
            bcrypt.compare = jest.fn(
                () => true
            );
            authservice.AuthRepository.findByCompanyId = jest.fn(
                () => UsercheckIdResultSchema
            )
            const users = await authservice.checkIdPassword(
                AdminAuthvalidData
            )

        } catch (err) {
            expect(
                authservice.AuthRepository.findByCompanyId
            ).toHaveBeenCalledWith({ companyId: AdminAuthvalidData.companyId });
            expect(
                authservice.AuthRepository.findByCompanyId
            ).toHaveBeenCalledTimes(1);
            expect(err).toBeInstanceOf(CustomError);
            expect(err.message).toEqual("아이디 혹은 비밀번호를 확인해주세요.");
        }
    })
    test("비밀번호 오류", async () => {
        jest.mock('bcrypt');
        const bcryptPassword = "$2b$10$u9aMl.83FJ4meLsr9uSFXu.moaB1iVOWItmXKOyAmpP1kQIjdDPdC"
        const user = { userId: AdminAuthvalidData.companyId, password: bcryptPassword };
        let authservice = new AuthService();
        authservice.AuthRepository = Object.assign(
            {},
            mockAuthRepository
        )
        try {
            bcrypt.compare = jest.fn(
                () => false
            );
            authservice.AuthRepository.findByCompanyId = jest.fn(
                () => checkIdResultSchema
            )
            const users = await authservice.checkIdPassword(
                AdminAuthvalidData
            )

        } catch (err) {
            expect(bcrypt.compare).toHaveBeenCalledWith(AdminAuthvalidData.password, user.password);
            expect(bcrypt.compare).toBeCalledTimes(1)
            expect(err).toBeInstanceOf(CustomError);
            expect(err.message).toEqual("아이디 혹은 비밀번호를 확인해주세요.");
        }
    })
})

describe("adminLogin test", () => {
    beforeEach(() => {
        // restore the spy created with spyOn
        jest.resetAllMocks();
    });
    test("adminLogin 성공 시 token 반환", async () => {
        const secretKet = "meercatlender_secertkey"
        const payloadInsertSchema = {
            userId: checkIdResultSchema.userId,
            userName: checkIdResultSchema.userName,
            companyId: checkIdResultSchema.companyId,
            teamId: checkIdResultSchema.teamId,
            teamName: TeamResultSchema.teamName,
            authLevel: checkIdResultSchema.authLevel,
        }
        let authservice = new AuthService();
        authservice.AuthRepository = Object.assign(
            {},
            mockAuthRepository
        )
        authservice.AuthRepository.findTeamById = jest.fn(
            () => TeamResultSchema
        )
        jwt.sign = jest.fn(
            () => TokenResultSchema
        );

        const token = await authservice.adminLogin(
            { user: checkIdResultSchema }
        )

        expect(jwt.sign).toHaveBeenCalledWith(payloadInsertSchema, secretKet);

        expect(
            authservice.AuthRepository.findTeamById
        ).toHaveBeenCalledWith({ user: checkIdResultSchema });
        expect(
            authservice.AuthRepository.findTeamById
        ).toHaveBeenCalledTimes(1);
        expect(token).toBe(TokenResultSchema)

    })
})

describe("checkCompanyId test", () => {
    beforeEach(() => {
        // restore the spy created with spyOn
        jest.resetAllMocks();
    });
    test("checkCompanyId 성공", async () => {
        let authservice = new AuthService();
        authservice.AuthRepository = Object.assign(
            {},
            mockAuthRepository
        )
        authservice.AuthRepository.findCompanyById = jest.fn(
            () => CheckCompanyResultSchema
        )
        await authservice.checkCompanyId({ companyId: AdminAuthinvalidData.companyId })

        expect(
            authservice.AuthRepository.findCompanyById
        ).toHaveBeenCalledWith({ companyId: AdminAuthinvalidData.companyId });
        expect(
            authservice.AuthRepository.findCompanyById
        ).toHaveBeenCalledTimes(1);
    })
    test("checkCompanyId 실패 시 에러메세지 반환", async () => {
        let authservice = new AuthService();
        authservice.AuthRepository = Object.assign(
            {},
            mockAuthRepository
        )
        try {
            authservice.AuthRepository.findCompanyById = jest.fn(
                () => { }
            )
            await authservice.checkCompanyId({ companyId: AdminAuthinvalidData.companyId })
        } catch (err) {
            expect(
                authservice.AuthRepository.findCompanyById
            ).toHaveBeenCalledWith({ companyId: AdminAuthvalidData.companyId });
            expect(
                authservice.AuthRepository.findCompanyById
            ).toHaveBeenCalledTimes(1);
            expect(err).toBeInstanceOf(CustomError);
            expect(err.message).toEqual("회사코드를 확인해주세요.");
        }
    })
})

describe("updateUser test", () => {
    beforeEach(() => {
        // restore the spy created with spyOn
        jest.resetAllMocks();
    });
    test("updateUser 성공", async () => {
        const userId = "testuser";
        const password = "testpassword";
        const encryptedPW = 'mockEncryptedPW'
        let authservice = new AuthService();
        authservice.AuthRepository = Object.assign(
            {},
            mockAuthRepository
        )
        jest.spyOn(bcrypt, 'hash').mockImplementation((password, salt, callback) => {
            callback(null, encryptedPW);
        });
        authservice.AuthRepository.updateUser = jest.fn()
        await expect(authservice.updateUser({ userId, password })).resolves.toBeUndefined();
    
        expect(authservice.AuthRepository.updateUser).toHaveBeenCalledTimes(1); // AuthRepository.updateUser 메서드가 한 번 호출되었는지 확인합니다.
        expect(authservice.AuthRepository.updateUser).toHaveBeenCalledWith({
          userId,
          password: encryptedPW,
        });
    })
    test("bcrypt 실패 시 에러메세지 반환", async () => {
        const userId = "testuser";
        const password = "testpassword";
        let authservice = new AuthService();
        authservice.AuthRepository = Object.assign(
            {},
            mockAuthRepository
        )
        try{
            jest.spyOn(bcrypt, 'hash').mockImplementation((password, salt, callback) => {
                new Error('회원가입이 실패했습니다.')
            });
            authservice.AuthRepository.updateUser = jest.fn()
            await authservice.updateUser({ userId, password })
        }catch(err){
            expect(
                authservice.AuthRepository.updateUser
            ).toHaveBeenCalledWith({ userId, password });
            expect(
                authservice.AuthRepository.updateUser
            ).toHaveBeenCalledTimes(1);
            expect(err).toBeInstanceOf(CustomError);
            expect(err.message).toEqual("회원가입이 실패했습니다.");
        }
    })
})