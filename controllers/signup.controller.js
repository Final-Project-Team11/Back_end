const SignupService = require("../services/signup.service.js");
const CustomError = require("../middlewares/errorHandler");
const authEmail = require("../authEmail/authEmail.js")
const bcrypt = require("bcrypt");
const { checkIdSchema, ResisterSchema } = require("../schemas/signup.schema.js")
const { smtpTransport } = require('../config/email');
const env = process.env;

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
            email
        } = req.body;
        try {
            await ResisterSchema
                .validateAsync(req.body, { abortEarly: false })
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
                email,
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
                .validateAsync(req.body, { abortEarly: false })
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

    authEmail = async (req, res, next) => {
        const generateRandom = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        try {
            const { email } = req.body;
            const number = String(generateRandom(111111, 999999))
            //번호 암호화
            bcrypt.hash(number, 10, async (err, encryptednumber) => {
                if (err) {
                    throw new CustomError("인증번호 생성에 실패했습니다.", 412);
                } else {
                    const mailOptions = {
                        from: env.EMAIL_ID,
                        to: email,
                        subject: "[Meer:캣린더]회원가입 인증 이메일 입니다",
                        html: authEmail(number)
                    };

                    smtpTransport.sendMail(mailOptions, (error, responses) => {
                        if (error) {
                            console.log(error)
                            throw new CustomError("이메일 전송을 실패했습니다.", 401)
                        } else {
                            res.status(200).json({ authNumber : encryptednumber })
                        }
                        smtpTransport.close();
                    });
                }
            })

        } catch (err) {
            next(err)
        }
    }

    checkEmail = async (req, res, next) => {
        const { authNumber, checkNumber } = req.body;
        try {
            await this.SignupService.checkEmail({ authNumber, checkNumber })
            res.status(200).json({ message: "인증되었습니다." })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = SignupController;
