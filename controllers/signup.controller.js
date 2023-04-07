const SignupService = require("../services/signup.service.js");
const CustomError = require("../middlewares/errorHandler");
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
        const regex = /^[a-zA-Z0-9]{4,}$/;
        const schema = Joi.object({
            companyName: Joi.string().required().messages({
                "string.base": "companyName 필드는 문자열로 이루어져야 합니다.",
                "string.empty": "회사명을 입력해 주세요.",
                "any.required": "이 필드는 필수입니다.",
            }),
            address: Joi.string().required().messages({
                "string.base": "address 필드는 문자열로 이루어져야 합니다.",
                "string.empty": "회사 주소를 입력해 주세요.",
                "any.required": "이 필드는 필수입니다.",
            }),
            ceoName: Joi.string().required().messages({
                "string.base": "ceoName 필드는 문자열로 이루어져야 합니다.",
                "string.empty": "대표자 이름을 입력해 주세요.",
                "any.required": "이 필드는 필수입니다.",
            }),
            companyNum: Joi.number().required().messages({
                "number.base": "companyNum 필드는 숫자로 이루어져야 합니다.",
                "string.empty": "사업자 등록 번호를 입력해 주세요.",
                "any.required": "이 필드는 필수입니다.",
            }),
            ceoNum: Joi.number().required().messages({
                "number.base": "ceoNum 필드는 숫자로 이루어져야 합니다.",
                "string.empty": "대표자 연락처를 입력해 주세요.",
                "any.required": "이 필드는 필수입니다.",
            }),
            companyId: Joi.string().pattern(regex).required().messages({
                "string.base": "companyId 필드는 문자열로 이루어져야 합니다.",
                "string.pattern.base": "아이디의 형식에 맞지 않습니다.",
                "string.empty": "대표자 Id를 입력해 주세요.",
                "any.required": "이 필드는 필수입니다.",
            }),
            password: Joi.string().pattern(regex).required().messages({
                "string.base": "password 필드는 문자열로 이루어져야 합니다.",
                "string.pattern.base": "패스워드의 형식에 맞지 않습니다.",
                "string.empty": "비밀번호를 입력해 주세요.",
                "any.required": "이 필드는 필수입니다.",
            }),
        });

        try {
            const validate = schema.validate({
                companyName: companyName,
                address: address,
                ceoName: ceoName,
                companyNum: companyNum,
                ceoNum: ceoNum,
                companyId: companyId,
                password: password,
            });
    
            if (validate.error) {
                throw new CustomError(validate.error.message, 400);
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
