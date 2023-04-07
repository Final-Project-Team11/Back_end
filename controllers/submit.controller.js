const SubmitService = require("../services/submit.service");
const CustomError = require('../middlewares/errorHandler')
const Joi = require('joi')

class SubmitController {
    submitService = new SubmitService();

    // 유저 목록
    findTeamUsers = async (req, res, next) => {
        try {

        }catch(error) {

        }
    }

    // 출장 신청
    scheduleSubmit = async (req, res, next) => {
        const {startDay, endDay, title, location, ref, content} = req.body
        const {userId, authLevel, teamName} = res.locals.user

        console.log("req.file: ", req.file); // 테스트 => req.file.location에 이미지 링크(s3-server)가 담겨있음, 다중이라면 file => files로 변경

        const file = await req.file.location;

        const schema = Joi.object({
            startDay: Joi.string().required().messages({
                'string.base' : 'startDay 필드는 날짜로 이루어져야 합니다.',
                'string.empty' : '일정을 입력해 주세요.',
                'any.required' : '이 필드는 필수입니다.'
            }),
            endDay: Joi.string().required().messages({
                'string.base' : 'endDay 필드는 날짜로 이루어져야 합니다.',
                'string.empty' : '일정을 입력해 주세요.',
                'any.required' : '이 필드는 필수입니다.'
            }),
            title: Joi.string().required().messages({
                'string.base' : 'title 필드는 문자열로 이루어져야 합니다.',
                'string.empty' : '제목을 입력해 주세요.',
                'any.required' : '이 필드는 필수입니다.'
            }),
            ref: Joi.string().required().messages({
                'string.base' : 'ref 필드는 문자열로 이루어져야 합니다.',
                'string.empty' : '멘션을 입력해 주세요.',
                'any.required' : '이 필드는 필수입니다.'
            }),
            location: Joi.string().required().messages({
                'string.base' : 'location 필드는 문자열로 이루어져야 합니다.',
                'string.empty' : '장소를 입력해 주세요.',
                'any.required' : '이 필드는 필수입니다.'
            }),
            content: Joi.string().required().messages({
                'string.base' : 'content 필드는 문자열로 이루어져야 합니다.',
            }),
            file: Joi.string().required().messages({
                'string.base' : 'file 필드는 문자열로 이루어져야 합니다.',
            })
        })

        const validate = schema.validate(
            {
                startDay : startDay,
                endDay : endDay,
                title : title,
                ref : ref,
                location : location,
                content : content,
                file : file,
            },
            // 한 번에 모든 에러를 확인하고 싶으면 validate 시점에 동작을 제어할 수 있는 validate()의 세 번째 파라미터로 {abortEarly: false}를 설정하면 된다.
            { abortEarly: false }
        )

        if (validate.error) {
            throw new CustomError(validate.error.message, 401)
        }else {
            console.log('Valid input!')
        }

        try{
            const ScheduleSubmit = await this.submitService.scheduleSubmit(
                userId,
                teamName,
                authLevel,
                startDay,
                endDay,
                title,
                ref,
                location,
                content,
                file
            )

            return res.status(200).send({ message : '출장 신청이 성공적으로 완료되었습니다.'})
        }catch(error) {
            throw new CustomError(
                { errorMessage: '예상치 못한 에러가 발생했습니다.'},
                400,
                false
            )
        }
    }
}

module.exports = SubmitController;
