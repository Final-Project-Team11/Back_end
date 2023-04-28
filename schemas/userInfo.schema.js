const Joi = require('joi')

const userInfoSchema = Joi.object({
    birthDay: Joi.date().messages({
        "date.base": "birthDay 필드는 날짜로 이루어져야 합니다.",
    }),
    phoneNum: Joi.string().messages({
        "string.base": "phoneNum 필드는 문자열로 이루어져야 합니다.",
    }),
});

module.exports = {userInfoSchema}