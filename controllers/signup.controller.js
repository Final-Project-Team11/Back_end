const SignupService = require("../services/signup.service.js");
const CustomError = require("../middlewares/errorHandler");
const regexId = /^[a-zA-Z0-9]{5,}$/
const regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*()_+\-={};':"\\|,.<>?~])[A-Za-z\d!@#$%^&*()_+\-={};':"\\|,.<>?~]{8,15}$/
const Joi = require("joi");

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

        //Joi

        const schema = Joi.object({
            companyName: Joi.string().required().messages({
                "string.base": "companyName 필드는 문자열로 이루어져야 합니다.",
                "string.empty": "회사명을 입력해 주세요.",
                "any.required": "필수입력값을 입력해주세요",
            }),
            address: Joi.string().required().messages({
                "string.base": "address 필드는 문자열로 이루어져야 합니다.",
                "string.empty": "회사 주소를 입력해 주세요.",
                "any.required": "필수입력값을 입력해주세요",
            }),
            ceoName: Joi.string().required().messages({
                "string.base": "ceoName 필드는 문자열로 이루어져야 합니다.",
                "string.empty": "대표자 이름을 입력해 주세요.",
                "any.required": "필수입력값을 입력해주세요",
            }),
            companyNum: Joi.string().required().messages({
                "number.base": "companyNum 필드는 숫자로 이루어져야 합니다.",
                "string.empty": "사업자 등록 번호를 입력해 주세요.",
                "any.required": "필수입력값을 입력해주세요",
            }),
            ceoNum: Joi.string().required().messages({
                "number.base": "ceoNum 필드는 숫자로 이루어져야 합니다.",
                "string.empty": "대표자 연락처를 입력해 주세요.",
                "any.required": "필수입력값을 입력해주세요",
            }),
            companyId: Joi.string().min(5).pattern(regexId).required().messages({
                "string.base": "companyId 필드는 문자열로 이루어져야 합니다.",
                "string.pattern.base": "아이디는 영문 대/소문자와 숫자만 포함 가능합니다.",
                "string.min": "아이디는 최소 5글자여야 합니다.",
                "string.empty": "대표자 Id를 입력해 주세요.",
                "any.required": "필수입력값을 입력해주세요",
            }),
            password: Joi.string().min(8).max(15).pattern(regexPassword).required().messages({
                "string.base": "password 필드는 문자열로 이루어져야 합니다.",
                "string.pattern.base": "비밀번호는 숫자와 특수문자가 1개이상 포함되어 있어야 합니다.",
                "string.min": "비밀번호는 최소 5글자여야 합니다.",
                "string.max": "비밀번호는 최대 15글자여야 합니다.",
                "string.empty": "비밀번호를 입력해 주세요.",
                "any.required": "필수입력값을 입력해주세요",
            }),
        });

        try {
            const validate = schema.validate({
                companyName,
                address,
                ceoName,
                companyNum,
                ceoNum,
                companyId,
                password,
            });
    
            if (validate.error) {
                throw new CustomError(validate.error.message, 401);
            } else {
                console.log("Valid input!");
            }
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
        //Joi
        const schema = Joi.object({
            companyId: Joi.string().min(5).pattern(regexId).required().messages({
                "string.base": "companyId 필드는 문자열로 이루어져야 합니다.",
                "string.pattern.base": "아이디는 영문 대/소문자와 숫자만 포함 가능합니다.",
                "string.min": "아이디는 최소 5글자여야 합니다.",
                "string.empty": "대표자 Id를 입력해 주세요.",
                "any.required": "필수입력값을 입력해주세요",
            }),
        });
        try {
            const validate = schema.validate({
                companyId: companyId,
            });
    
            if (validate.error) {
                throw new CustomError(validate.error.message, 401);
            } else {
                console.log("Valid input!");
            }
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
