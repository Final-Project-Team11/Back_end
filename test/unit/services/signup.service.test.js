const SignupService = require("../../../services/signup.service")
const CustomError = require("../../../middlewares/errorHandler");
const bcrypt = require("bcrypt");
const {
    CheckCompanyInsertSchema,
    checkCompanyErrorResultSchema,
    CheckCompanyIdInsertSchema,
    SignupInsertSchema
} = require("../../fixtures/signup.fixtures")

const mockSignupRepository = () => ({
    findCompanyByName: jest.fn(),
    findCompanyById: jest.fn(),
    companySignup: jest.fn(),
})

describe("existCompanyName test", () => {
    beforeEach(() => {
        // restore the spy created with spyOn
        jest.resetAllMocks();
    });
    test("existCompanyName 성공 test", async () => {
        let signupservice = new SignupService();
        signupservice.SignupRepository = Object.assign(
            {},
            mockSignupRepository
        )

        signupservice.SignupRepository.findCompanyByName = jest.fn(
            () => []
        )

        await signupservice.existCompanyName(
            CheckCompanyInsertSchema
        );

        expect(
            signupservice.SignupRepository.findCompanyByName
        ).toHaveBeenCalledWith(CheckCompanyInsertSchema);
        expect(
            signupservice.SignupRepository.findCompanyByName
        ).toHaveBeenCalledTimes(1);
    })

    test("이미 등록된 회사입니다.", async () => {
        let signupservice = new SignupService();
        signupservice.SignupRepository = Object.assign(
            {},
            mockSignupRepository
        )

        try {
            signupservice.SignupRepository.findCompanyByName = jest.fn(
                () => checkCompanyErrorResultSchema
            )

            await signupservice.existCompanyName(
                CheckCompanyInsertSchema
            );

        } catch (err) {
            expect(
                signupservice.SignupRepository.findCompanyByName
            ).toHaveBeenCalledWith(CheckCompanyInsertSchema);
            expect(
                signupservice.SignupRepository.findCompanyByName
            ).toHaveBeenCalledTimes(1);
            expect(err).toBeInstanceOf(CustomError);
            expect(err.message).toEqual("이미 등록된 회사입니다.");
        }
    });

})

describe("existCompanyId test", () => {
    beforeEach(() => {
        // restore the spy created with spyOn
        jest.resetAllMocks();
    });
    test("existCompanyId 성공 test", async () => {
        let signupservice = new SignupService();
        signupservice.SignupRepository = Object.assign(
            {},
            mockSignupRepository
        )

        signupservice.SignupRepository.findCompanyById = jest.fn(
            () => []
        )

        await signupservice.existCompanyId(
            CheckCompanyIdInsertSchema
        );

        expect(
            signupservice.SignupRepository.findCompanyById
        ).toHaveBeenCalledWith(CheckCompanyIdInsertSchema);
        expect(
            signupservice.SignupRepository.findCompanyById
        ).toHaveBeenCalledTimes(1);
    })

    test("이미 등록된 회사입니다.", async () => {
        let signupservice = new SignupService();
        signupservice.SignupRepository = Object.assign(
            {},
            mockSignupRepository
        )

        try {
            signupservice.SignupRepository.findCompanyById = jest.fn(
                () => checkCompanyErrorResultSchema
            )

            await signupservice.existCompanyId(
                CheckCompanyIdInsertSchema
            );

        } catch (err) {
            expect(
                signupservice.SignupRepository.findCompanyById
            ).toHaveBeenCalledWith(CheckCompanyIdInsertSchema);
            expect(
                signupservice.SignupRepository.findCompanyById
            ).toHaveBeenCalledTimes(1);
            expect(err).toBeInstanceOf(CustomError);
            expect(err.message).toEqual("이미 등록된 아이디입니다.");
        }
    });

})

describe("companySignup test", () => {
    beforeEach(() => {
        // restore the spy created with spyOn
        jest.resetAllMocks();
    });
    test("companySignup 성공 test", async () => {
        let signupservice = new SignupService();
        signupservice.SignupRepository = Object.assign(
            {},
            mockSignupRepository
        )

        signupservice.SignupRepository.companySignup = jest.fn()
        const saltRounds = 10;
        const mockEncryptedPW = 'mockEncryptedPW'; // Set a mock encrypted password

        jest.spyOn(bcrypt, 'hash').mockImplementation((password, salt, callback) => {
            callback(null, mockEncryptedPW);
        }); // Mock the bcrypt hash function to return the mock encrypted password

        await signupservice.companySignup(
            SignupInsertSchema
        );

        expect(signupservice.SignupRepository.companySignup).toHaveBeenCalledWith({
            ...SignupInsertSchema,
            password: mockEncryptedPW,
        })
        expect(
            signupservice.SignupRepository.companySignup
        ).toHaveBeenCalledTimes(1);
    })
    test("bcrypt 오류 발생 시 에러 반환", async () => {
        let signupservice = new SignupService();
        signupservice.SignupRepository = Object.assign(
            {},
            mockSignupRepository
        )

        try {
            signupservice.SignupRepository.companySignup = jest.fn()
            const saltRounds = 10;
            const mockEncryptedPW = 'mockEncryptedPW'; // Set a mock encrypted password

            jest.spyOn(bcrypt, 'hash').mockImplementation((password, salt, callback) => {
                new Error('회원가입이 실패했습니다.')
            }); // Mock the bcrypt hash function to return the mock encrypted password

            await signupservice.companySignup(
                SignupInsertSchema
            );

        } catch (err) {
            expect(
                signupservice.SignupRepository.companySignup
            ).toHaveBeenCalledWith({...SignupInsertSchema,
                password: mockEncryptedPW,});
            expect(
                signupservice.SignupRepository.companySignup
            ).toHaveBeenCalledTimes(1);
            expect(err).toBeInstanceOf(CustomError);
            expect(err.message).toEqual("회원가입이 실패했습니다.");
        }
    })
})