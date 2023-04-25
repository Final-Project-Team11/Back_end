const Joi = require('joi')

const scheduleSchema = Joi.object({
    start: Joi.date().required().messages({
        "date.base": "start 필드는 날짜로 이루어져야 합니다.",
        "string.empty": "일정을 입력해 주세요.",
        "any.required": "start이 필드는 필수입니다.",
    }),
    end: Joi.date().required().messages({
        "date.base": "end 필드는 날짜로 이루어져야 합니다.",
        "string.empty": "일정을 입력해 주세요.",
        "any.required": "end이 필드는 필수입니다.",
    }),
    title: Joi.string().required().messages({
        "string.base": "title 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "제목을 입력해 주세요.",
        "any.required": "title이 필드는 필수입니다.",
    }),
    attendees: Joi.array().items(Joi.string()).messages({
        "string.base": "attendees 필드는 문자열로 이루어져야 합니다.",
    }),
    location: Joi.string().required().messages({
        "string.base": "location 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "장소를 입력해 주세요.",
        "any.required": "location이 필드는 필수입니다.",
    }),
    body: Joi.string().messages({
        "string.base": "body 필드는 문자열로 이루어져야 합니다.",
    }),
});

const vacationSchema = Joi.object({
    start: Joi.date().required().messages({
        'date.base' : 'start 필드는 날짜로 이루어져야 합니다.',
        'date.empty' : '일정을 입력해 주세요.',
        'any.required' : 'start이 필드는 필수입니다.'
    }),
    end: Joi.date().required().messages({
        'date.base' : 'end 필드는 날짜로 이루어져야 합니다.',
        'date.empty' : '일정을 입력해 주세요.',
        'any.required' : 'end이 필드는 필수입니다.'
    }),
    typeDetail: Joi.string().required().messages({
        'string.base' : 'typeDetail 필드는 날짜로 이루어져야 합니다.',
        'string.empty' : '휴가 종류를 입력해 주세요.',
        'any.required' : 'typeDetail이 필드는 필수입니다.'
    }),
})

const otherSchema = Joi.object({
    start: Joi.date().required().messages({
        'date.base' : 'start 필드는 날짜로 이루어져야 합니다.',
        'date.empty' : '일정을 입력해 주세요.',
        'any.required' : 'start이 필드는 필수입니다.'
    }),
    end: Joi.date().required().messages({
        'date.base' : 'end 필드는 날짜로 이루어져야 합니다.',
        'date.empty' : '일정을 입력해 주세요.',
        'any.required' : 'end이 필드는 필수입니다.'
    }),
    title: Joi.string().required().messages({
        'string.base' : 'title 필드는 문자열로 이루어져야 합니다.',
        'string.empty' : '제목을 입력해 주세요.',
        'any.required' : 'title이 필드는 필수입니다.'
    }),
    attendees: Joi.array().items(Joi.string()).messages({
        "string.base": "attendees 필드는 문자열로 이루어져야 합니다.",
    }),
    body: Joi.string().messages({
        'string.base' : 'body 필드는 문자열로 이루어져야 합니다.',
    }),
})

const meetingSchema = Joi.object({
    start: Joi.date().required().messages({
        'date.base' : 'start 필드는 날짜로 이루어져야 합니다.',
        'date.empty' : '일정을 입력해 주세요.',
        'any.required' : 'start이 필드는 필수입니다.'
    }),
    end: Joi.date().required().messages({
        'string.base' : 'end 필드는 날짜로 이루어져야 합니다.',
        'string.empty' : '일정을 입력해 주세요.',
        'any.required' : 'end 필드는 필수입니다.'
    }),
    calendarId: Joi.string().required().messages({
        'string.base' : 'calendarId 필드는 문자열로 이루어져야 합니다.',
        'string.empty' : 'calendarId 입력해주세요.',
        'any.required' : 'calendarId 필드는 필수입니다.'
    }),
    title: Joi.string().required().messages({
        'string.base' : 'title 필드는 문자열로 이루어져야 합니다.',
        'string.empty' : '제목을 입력해 주세요.',
        'any.required' : 'title이 필드는 필수입니다.'
    }),
    attendees: Joi.array().items(Joi.string()).messages({
        "string.base": "attendees 필드는 문자열로 이루어져야 합니다.",
    }),
    location: Joi.string().required().messages({
        'string.base' : 'location 필드는 문자열로 이루어져야 합니다.',
        'string.empty' : '장소를 입력해 주세요.',
        'any.required' : 'location이 필드는 필수입니다.'
    }),
    body: Joi.string().messages({
        'string.base' : 'body 필드는 문자열로 이루어져야 합니다.',
    }),
})

const reportSchema = Joi.object({
    start: Joi.date().required().messages({
        'date.base' : 'start 필드는 날짜로 이루어져야 합니다.',
        'date.empty' : '일정을 입력해 주세요.',
        'any.required' : 'start이 필드는 필수입니다.'
    }),
    end: Joi.date().required().messages({
        'string.base' : 'end 필드는 날짜로 이루어져야 합니다.',
        'string.empty' : '일정을 입력해 주세요.',
        'any.required' : 'end 필드는 필수입니다.'
    }),
    title: Joi.string().required().messages({
        'string.base' : 'title 필드는 문자열로 이루어져야 합니다.',
        'string.empty' : '제목을 입력해 주세요.',
        'any.required' : 'title이 필드는 필수입니다.'
    }),
    attendees: Joi.array().items(Joi.string()).messages({
        "string.base": "attendees 필드는 문자열로 이루어져야 합니다.",
    }),
    body: Joi.string().messages({
        'string.base' : 'body 필드는 문자열로 이루어져야 합니다.',
    }),
})

const meetingReportSchema = Joi.object({
    start: Joi.date().required().messages({
        'date.base' : 'start 필드는 날짜로 이루어져야 합니다.',
        'date.empty' : '일정을 입력해 주세요.',
        'any.required' : 'start이 필드는 필수입니다.'
    }),
    end: Joi.date().required().messages({
        'string.base' : 'end 필드는 날짜로 이루어져야 합니다.',
        'string.empty' : '일정을 입력해 주세요.',
        'any.required' : 'end 필드는 필수입니다.'
    }),
    title: Joi.string().required().messages({
        'string.base' : 'title 필드는 문자열로 이루어져야 합니다.',
        'string.empty' : '제목을 입력해 주세요.',
        'any.required' : 'title이 필드는 필수입니다.'
    }),
    attendees: Joi.array().items(Joi.string()).messages({
        "string.base": "ref 필드는 문자열로 이루어져야 합니다.",
    }),
    body: Joi.string().messages({
        'string.base' : 'content 필드는 문자열로 이루어져야 합니다.',
    }),
})

module.exports = {scheduleSchema, vacationSchema, otherSchema, meetingSchema, reportSchema, meetingReportSchema}