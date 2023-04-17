const Joi = require("joi");

const createCategorySchema = Joi.object({
    category: Joi.string().required().messages({
        "string.base": "category 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "카테고리를 입력해 주세요.",
        "any.required": "필수입력값을 입력해주세요",
    }),
});

const createTodoSchema = Joi.object({
    content: Joi.string().required().messages({
        "string.base": "content 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "투드리스트를 입력해 주세요.",
        "any.required": "필수입력값을 입력해주세요",
    }),
});

module.exports = {
    createCategorySchema,
    createTodoSchema
}