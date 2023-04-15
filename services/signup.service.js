const SignupRepository = require("../repositories/signup.repository.js");
const CustomError = require("../middlewares/errorHandler.js");

const bcrypt = require("bcrypt");

class SignupService {
    constructor() {
        this.SignupRepository = new SignupRepository();
    }

    existCompanyName = async ({ companyName }) => {
        const existCompany = await this.SignupRepository.findCompanyByName({
            companyName,
        });
        if (existCompany.length !== 0) {
            throw new CustomError("이미 등록된 회사입니다.", 401);
        }
    };
    existCompanyId = async ({ companyId }) => {
        const existCompanyId = await this.SignupRepository.findCompanyById({
            companyId,
        });
        if (existCompanyId.length !== 0) {
            throw new CustomError("이미 등록된 아이디입니다.", 401);
        }
    };
    companySignup = async ({
        companyName,
        address,
        ceoName,
        companyNum,
        ceoNum,
        teamName,
        companyId,
        userId,
        userName,
        password,
        remainDay,
        authLevel,
        job,
    }) => {
        //사업자비밀번호 암호화
        bcrypt.hash(password, 10, async (err, encryptedPW) => {
            if (err) {
                throw new CustomError("회원가입이 실패했습니다.", 412);
            } else {
                await this.SignupRepository.companySignup({
                    companyId,
                    companyName,
                    companyNum,
                    address,
                    ceoName,
                    ceoNum,
                    teamName,
                    userId,
                    userName,
                    password: encryptedPW,
                    remainDay,
                    authLevel,
                    job,
                });
            }
        });
    };
}

module.exports = SignupService;
