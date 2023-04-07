const SignupService = require("../services/signup.service.js");

class SignupController {
    constructor() {
        this.SignupService = new SignupService();
    }

    companySignup = async (req, res, next) => {
        try {
            const {
                companyName,
                address,
                ceoName,
                companyNum,
                ceoNum,
                companyId,
                password,
            } = req.body;

            //회사, 회사아이디 중복검사
            await this.SignupService.existCompanyName({ companyName });
            await this.SignupService.existCompanyId({ companyId });

            //회사등록
            await this.SignupService.companySignup({
                companyName,
                address,
                ceoName,
                companyNum,
                ceoNum,
                teamName: "CEO",
                companyId,
                userId: companyId,
                userName: ceoName,
                password,
                remainDay: 15,
                authLevel: 1,
                job: "CEO",
            });
            return res
                .status(200)
                .json({ message: "회원가입에 성공하였습니다." });
        } catch (err) {
            next(err);
        }
    };

    checkId = async (req, res, next) => {
        try {
            const { companyId } = req.body;
            await this.SignupService.existCompanyId({
                companyId,
            });

            return res
                .status(200)
                .json({ message: "아이디 중복 검사에 성공했습니다" });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = SignupController;
