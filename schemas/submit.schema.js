const Joi = require('joi')

const scheduleSchema = Joi.object({
    startDay: Joi.date().required().messages({
        "date.base": "startDay 필드는 날짜로 이루어져야 합니다.",
        "string.empty": "일정을 입력해 주세요.",
        "any.required": "startDay이 필드는 필수입니다.",
    }),
    endDay: Joi.date().required().messages({
        "date.base": "endDay 필드는 날짜로 이루어져야 합니다.",
        "string.empty": "일정을 입력해 주세요.",
        "any.required": "endDay이 필드는 필수입니다.",
    }),
    title: Joi.string().required().messages({
        "string.base": "title 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "제목을 입력해 주세요.",
        "any.required": "title이 필드는 필수입니다.",
    }),
    ref: Joi.array().items(Joi.string()).messages({
        "string.base": "ref 필드는 문자열로 이루어져야 합니다.",
    }),
    location: Joi.string().required().messages({
        "string.base": "location 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "장소를 입력해 주세요.",
        "any.required": "location이 필드는 필수입니다.",
    }),
    content: Joi.string().messages({
        "string.base": "content 필드는 문자열로 이루어져야 합니다.",
    }),
});

const vacationSchema = Joi.object({
    startDay: Joi.date().required().messages({
        'date.base' : 'startDay 필드는 날짜로 이루어져야 합니다.',
        'date.empty' : '일정을 입력해 주세요.',
        'any.required' : 'startDay이 필드는 필수입니다.'
    }),
    endDay: Joi.date().required().messages({
        'date.base' : 'endDay 필드는 날짜로 이루어져야 합니다.',
        'date.empty' : '일정을 입력해 주세요.',
        'any.required' : 'endDay이 필드는 필수입니다.'
    }),
    typeDetail: Joi.string().required().messages({
        'string.base' : 'typeDetail 필드는 날짜로 이루어져야 합니다.',
        'string.empty' : '휴가 종류를 입력해 주세요.',
        'any.required' : 'typeDetail이 필드는 필수입니다.'
    }),
})

const otherSchema = Joi.object({
    startDay: Joi.date().required().messages({
        'date.base' : 'startDay 필드는 날짜로 이루어져야 합니다.',
        'date.empty' : '일정을 입력해 주세요.',
        'any.required' : 'startDay이 필드는 필수입니다.'
    }),
    endDay: Joi.date().required().messages({
        'date.base' : 'endDay 필드는 날짜로 이루어져야 합니다.',
        'date.empty' : '일정을 입력해 주세요.',
        'any.required' : 'endDay이 필드는 필수입니다.'
    }),
    title: Joi.string().required().messages({
        'string.base' : 'title 필드는 문자열로 이루어져야 합니다.',
        'string.empty' : '제목을 입력해 주세요.',
        'any.required' : 'title이 필드는 필수입니다.'
    }),
    ref: Joi.array().items(Joi.string()).messages({
        "string.base": "ref 필드는 문자열로 이루어져야 합니다.",
    }),
    content: Joi.string().messages({
        'string.base' : 'content 필드는 문자열로 이루어져야 합니다.',
    }),
})

const meetingSchema = Joi.object({
    startDay: Joi.date().required().messages({
        'date.base' : 'startDay 필드는 날짜로 이루어져야 합니다.',
        'date.empty' : '일정을 입력해 주세요.',
        'any.required' : 'startDay이 필드는 필수입니다.'
    }),
    startTime: Joi.string().required().messages({
        'string.base' : 'startTime 필드는 날짜로 이루어져야 합니다.',
        'string.empty' : '일정을 입력해 주세요.',
        'any.required' : 'startTime이 필드는 필수입니다.'
    }),
    eventType: Joi.string().required().messages({
        'string.base' : 'eventType 필드는 문자열로 이루어져야 합니다.',
        'string.empty' : 'eventType을 입력해주세요.',
        'any.required' : 'eventType이 필드는 필수입니다.'
    }),
    title: Joi.string().required().messages({
        'string.base' : 'title 필드는 문자열로 이루어져야 합니다.',
        'string.empty' : '제목을 입력해 주세요.',
        'any.required' : 'title이 필드는 필수입니다.'
    }),
    ref: Joi.array().items(Joi.string()).messages({
        "string.base": "ref 필드는 문자열로 이루어져야 합니다.",
    }),
    location: Joi.string().required().messages({
        'string.base' : 'location 필드는 문자열로 이루어져야 합니다.',
        'string.empty' : '장소를 입력해 주세요.',
        'any.required' : 'location이 필드는 필수입니다.'
    }),
    content: Joi.string().messages({
        'string.base' : 'content 필드는 문자열로 이루어져야 합니다.',
    }),
})

const reportSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.base' : 'title 필드는 문자열로 이루어져야 합니다.',
        'string.empty' : '제목을 입력해 주세요.',
        'any.required' : 'title이 필드는 필수입니다.'
    }),
    ref: Joi.array().items(Joi.string()).messages({
        "string.base": "ref 필드는 문자열로 이루어져야 합니다.",
    }),
    content: Joi.string().messages({
        'string.base' : 'content 필드는 문자열로 이루어져야 합니다.',
    }),
})

const meetingReportSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.base' : 'title 필드는 문자열로 이루어져야 합니다.',
        'string.empty' : '제목을 입력해 주세요.',
        'any.required' : 'title이 필드는 필수입니다.'
    }),
    ref: Joi.array().items(Joi.string()).messages({
        "string.base": "ref 필드는 문자열로 이루어져야 합니다.",
    }),
    content: Joi.string().messages({
        'string.base' : 'content 필드는 문자열로 이루어져야 합니다.',
    }),
})

module.exports = {scheduleSchema, vacationSchema, otherSchema, meetingSchema, reportSchema, meetingReportSchema}