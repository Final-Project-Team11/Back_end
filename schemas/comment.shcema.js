const Joi = require('joi')

const schema = Joi.object({
    comment: Joi.string().required().messages({
        "string.base": "comment 필드는 날짜로 이루어져야 합니다.",
        "string.empty": "댓글을 입력해 주세요.",
        "any.required": "이 필드는 필수입니다.",
    }),
});