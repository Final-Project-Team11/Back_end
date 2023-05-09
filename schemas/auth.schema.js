const Joi = require("joi");
const regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*()_+\-={};':"\\|,.<>?~])[A-Za-z\d!@#$%^&*()_+\-={};':"\\|,.<>?~]{8,15}$/

const adminLoginSchema = Joi.object({
    companyId: Joi.string().required().messages({
        "string.base": "companyId 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "아이디을 입력해 주세요.",
        "any.required": "필수입력값을 입력해주세요",
    }),
    password: Joi.string().required().messages({
        "string.base": "password 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "비밀번호을 입력해 주세요.",
        "any.required": "필수입력값을 입력해주세요",
    }),
});

const userLoginSchema = Joi.object({
    companyId: Joi.string().required().messages({
        "string.base": "companyId 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "회사 아이디를 입력해 주세요.",
        "any.required": "필수입력값을 입력해주세요",
    }),
    userId: Joi.string().required().messages({
        "string.base": "userId 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "아이디를 입력해 주세요.",
        "any.required": "필수입력값을 입력해주세요",
    }),
    password: Joi.string().required().messages({
        "string.base": "pasword 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "비밀번호를 입력해 주세요.",
        "any.required": "필수입력값을 입력해주세요",
    }),
});

const modifySchema = Joi.object({
    password: Joi.string().min(8).max(15).pattern(regexPassword).required().messages({
        "string.base": "password 필드는 문자열로 이루어져야 합니다.",
        "string.pattern.base": "비밀번호는 숫자와 특수문자가 1개이상 포함되어 있어야 합니다.",
        "string.min": "비밀번호는 최소 5글자여야 합니다.",
        "string.max": "비밀번호는 최대 15글자여야 합니다.",
        "string.empty": "비밀번호를 입력해 주세요.",
        "any.required": "비밀번호 필수입력값을 입력해주세요",
    }),
});

module.exports = {
    adminLoginSchema,
    userLoginSchema,
    modifySchema
}