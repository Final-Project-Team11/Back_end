const SignupService = require("../services/signup.service.js");
const CustomError = require("../middlewares/errorHandler");
const {checkIdSchema , ResisterSchema} = require("../schemas/signup.schema.js")

class SignupController {
    constructor() {
        this.SignupService = new SignupService();
    }
    companySignup = async (req, res, next) => {
        const {
            companyName,
            address,
            ceoName,
            companyNum,
            ceoNum,
            companyId,
            password,
        } = req.body;
        try {
            await ResisterSchema
            .validateAsync(req.body,{ abortEarly: false })
            .catch((err) => {
                throw new CustomError(err.message, 401)
            })
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
        const { companyId } = req.body;
        try {
            await checkIdSchema
            .validateAsync(req.body)
            .catch((err) => {
                throw new CustomError(err.message, 401)
            })
            await this.SignupService.existCompanyId({
                companyId,
            });

            return res
                .status(200)
                .json({ message: "사용할 수 있는 아이디입니다." });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = SignupController;
