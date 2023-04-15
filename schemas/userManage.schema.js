const Joi = require('joi')

const userCreateSchema = Joi.object({
    userId:Joi.string().min(5).pattern(/^[a-zA-Z0-9]$/).required().messages({
        "string.pattern.base": "문자열은 영문 대/소문자와 숫자만 포함 가능합니다.",
        "string.empty": "userId 필드는 비어 있을 수 없습니다.",
        "string.min": "문자열은 최소 {{#limit}}글자 이상이어야 합니다.",
        "any.required": "userId 필드는 필수입니다.",
    }),
    userName: Joi.string().required().messages({
        "string.base": "userName 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "userName 필드는 비어 있을 수 없습니다.",
        "any.required": "userName 필드는 필수입니다.",
    }),
    authLevel: Joi.number().required().messages({
        "number.base": "authLevel 필드는 숫자로 이루어져야 합니다.",
        "number.empty": "authLevel 필드는 비어 있을 수 없습니다.",
        "any.required": "authLevel 필드는 필수입니다.",
    }),
    team: Joi.string().required().messages({
        "string.base": "team 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "team 필드는 비어 있을 수 없습니다.",
        "any.required": "team 필드는 필수입니다.",
    }),
    joinDay: Joi.date().required().messages({
        "date.base": "joinDay 필드는 date형식으로 이루어져야 합니다.",
        "date.empty": "joinDay 필드는 비어 있을 수 없습니다.",
        "any.required": "joinDay 필드는 필수입니다.",
    }),
    job: Joi.string().required().messages({
        "string.base": "job 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "job 필드는 비어 있을 수 없습니다.",
        "any.required": "job 필드는 필수입니다.",
    }),
    rank: Joi.string().required().messages({
        "string.base": "rank 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "rank 필드는 비어 있을 수 없습니다.",
        "any.required": "rank 필드는 필수입니다.",
    }),
    salaryDay: Joi.number().required().messages({
        "number.base": "salaryDay 필드는 숫자로 이루어져야 합니다.",
        "number.empty": "salaryDay 필드는 비어 있을 수 없습니다.",
        "any.required": "salaryDay 필드는 필수입니다.",
    })
})
const userUpdateSchema = Joi.object({
    authLevel: Joi.number().required().messages({
        "number.base": "authLevel 필드는 숫자로 이루어져야 합니다.",
        "number.empty": "authLevel 필드는 비어 있을 수 없습니다.",
        "any.required": "authLevel 필드는 필수입니다.",
    }),
    team: Joi.string().required().messages({
        "string.base": "team 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "team 필드는 비어 있을 수 없습니다.",
        "any.required": "team 필드는 필수입니다.",
    }),
    rank: Joi.string().required().messages({
        "string.base": "rank 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "rank 필드는 비어 있을 수 없습니다.",
        "any.required": "rank 필드는 필수입니다.",
    }),
    job: Joi.string().required().messages({
        "string.base": "job 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "job 필드는 비어 있을 수 없습니다.",
        "any.required": "job 필드는 필수입니다.",
    }),
})
const options = {
    abortEarly: false
};

module.exports = {userCreateSchema,userUpdateSchema,options}