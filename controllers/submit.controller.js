const SubmitService = require("../services/submit.service");
const CustomError = require("../middlewares/errorHandler");
const {scheduleSchema, vacationSchema, otherSchema, meetingSchema, reportSchema, meetingReportSchema} = require('../schemas/submit.schema')
const Joi = require("joi");

class SubmitController {
    submitService = new SubmitService();

    // 출장 신청
    scheduleSubmit = async (req, res, next) => {
        const {startDay, endDay, title, location, ref, content} = req.body
        const {userId, teamId} = res.locals.user

        console.log("req.file: ", req.file); // 테스트 => req.file.location에 이미지 링크(s3-server)가 담겨있음, 다중이라면 file => files로 변경

        // 파일이 있을때와 없을때
        const fileLocation = req.file ? await req.file.location : null
        const fileName = req.file ? await req.file.originalname : null

        try{
            await scheduleSchema
            .validateAsync({startDay, endDay, title, location, ref, content}, { abortEarly: false })
            .catch((err) => {
                throw new CustomError(err.message, 401)
            })

            const ScheduleSubmit = await this.submitService.scheduleSubmit({
                userId,
                teamId: teamId,
                startDay,
                endDay,
                title,
                ref: ref,
                location,
                content,
                fileLocation,
                fileName,
            });

            return res.status(200).send({ message : '출장 신청이 성공적으로 완료되었습니다.'})
        }catch(error) {
            next(error)
        }
    }

    // 일정 수정
    scheduleModify = async(req, res, next) => {
        const {startDay, endDay, title, location, ref, content} = req.body
        const {userId, teamId} = res.locals.user
        const {eventId} = req.params

        console.log("req.file: ", req.file); // 테스트 => req.file.location에 이미지 링크(s3-server)가 담겨있음, 다중이라면 file => files로 변경

        // 파일이 있을때와 없을때
        const fileLocation = req.file ? await req.file.location : null
        const fileName = req.file ? await req.file.originalname : null

        try {
            await scheduleSchema
            .validateAsync({startDay, endDay, title, location, ref, content}, { abortEarly: false })
            .catch((err) => {
                throw new CustomError(err.message, 401)
            })

            const ScheduleSubmit = await this.submitService.scheduleModify({
                userId,
                eventId,
                teamId: teamId,
                startDay,
                endDay,
                title,
                ref: ref,
                location,
                content,
                fileLocation,
                fileName,
            });

            return res.status(200).send({ message : '일정 수정이 성공적으로 완료되었습니다.'})
        }catch(error) {
            next(error)
        }
    }

    // 휴가 신청
    vacationSubmit = async(req, res, next) => {
        const {typeDetail, startDay, endDay} = req.body
        const {userId} = res.locals.user

        try {
            await vacationSchema
            .validateAsync({typeDetail, startDay, endDay}, { abortEarly: false })
            .catch((err) => {
                throw new CustomError(err.message, 401)
            })

            const vacationSubmit = await this.submitService.vacationSubmit({
                userId,
                startDay,
                endDay,
                typeDetail,
            })

            return res.status(200).send({ message : '휴가 신청이 성공적으로 완료되었습니다.'})
        }catch(error) {
            next(error);
        }
    }

    // 기타 신청
    otherSubmit = async(req, res, next) => {
        const {startDay, endDay, title, content, ref} = req.body
        const {userId, teamId} = res.locals.user
        console.log('파일 객체',req.file)
        console.log("req.file: ", req.file); // 테스트 => req.file.location에 이미지 링크(s3-server)가 담겨있음, 다중이라면 file => files로 변경

        // 파일이 있을때와 없을때
        const fileLocation = req.file ? await req.file.location : null
        const fileName = req.file ? await req.file.originalname : null

        try{
            await otherSchema
            .validateAsync({startDay, endDay, title, content, ref}, { abortEarly: false })
            .catch((err) => {
                throw new CustomError(err.message, 401)
            })

            const OtherSubmit = await this.submitService.otherSubmit({
                userId,
                teamId: teamId,
                startDay,
                endDay,
                title,
                ref: ref,
                content,
                fileLocation,
                fileName,
            })

            return res.status(200).send({ message : '기타 신청이 성공적으로 완료되었습니다.'})
        }catch(err) {
            next(err);
        }
    }

    // 회의 신청
    meetingSubmit = async(req, res, next) => {
        const {startDay, startTime, eventType, title, location, ref, content} = req.body
        const {userId, teamId} = res.locals.user

        console.log("req.file: ", req.file); // 테스트 => req.file.location에 이미지 링크(s3-server)가 담겨있음, 다중이라면 file => files로 변경

        // 파일이 있을때와 없을때
        const fileLocation = req.file ? await req.file.location : null
        const fileName = req.file ? await req.file.originalname : null

        try{
            await meetingSchema
            // .validateAsync(req.body)
            .validateAsync({startDay, startTime, eventType, title, location, ref, content}, { abortEarly: false })
            .catch((err) => {
                throw new CustomError(err.message, 401)
            })

            const MeetingSubmit = await this.submitService.meetingSubmit({
                userId,
                teamId: teamId,
                eventType,
                startDay,
                startTime,
                title,
                ref: ref,
                location,
                content,
                fileLocation,
                fileName,
            })

            return res.status(200).send({ message : '회의 신청이 성공적으로 완료되었습니다.'})
        }catch(error) {
            next(error)
        }
    }

    // 보고서 등록
    reportSubmit = async(req, res, next) => {
        const {title, content, ref} = req.body
        const {userId, teamId} = res.locals.user

        console.log("req.file: ", req.file); // 테스트 => req.file.location에 이미지 링크(s3-server)가 담겨있음, 다중이라면 file => files로 변경
        // 파일이 있을때와 없을때
        const fileLocation = req.file ? await req.file.location : null
        const fileName = req.file ? await req.file.originalname : null

        try{
            await reportSchema
            .validateAsync({title, content, ref}, { abortEarly: false })
            .catch((err) => {
                throw new CustomError(err.message, 401)
            })

            await this.submitService.reportSubmit({
                userId,
                teamId : teamId,
                title,
                ref : ref,
                content,
                fileLocation,
                fileName,
            })

            return res.status(200).send({ message : '보고서 등록이 성공적으로 완료되었습니다.'})
        }catch(error) {
            next(error)
        }
    }

    // 보고서 수정
    reportModify = async(req ,res, next) => {
        const {title, content, ref} = req.body
        const {userId, teamId} = res.locals.user
        const {eventId} = req.params

        console.log("req.file: ", req.file); // 테스트 => req.file.location에 이미지 링크(s3-server)가 담겨있음, 다중이라면 file => files로 변경
        // 파일이 있을때와 없을때
        const fileLocation = req.file ? await req.file.location : null
        const fileName = req.file ? await req.file.originalname : null

        try{
            await reportSchema
            .validateAsync({title, content, ref}, { abortEarly: false })
            .catch((err) => {
                throw new CustomError(err.message, 401)
            })

            await this.submitService.reportModify({
                userId,
                eventId,
                teamId : teamId,
                title,
                ref : ref,
                content,
                fileLocation,
                fileName,
            })

            return res.status(200).send({ message : '보고서 수정이 성공적으로 완료되었습니다.'})
        }catch(error) {
            next(error)
        }
    }

    // 회의록 등록
    meetingReportSubmit = async(req, res, next) => {
        const {title, content, ref} = req.body
        const {userId, teamId} = res.locals.user
        const {eventId} = req.params

        console.log("req.file: ", req.file); // 테스트 => req.file.location에 이미지 링크(s3-server)가 담겨있음, 다중이라면 file => files로 변경
        // 파일이 있을때와 없을때
        const fileLocation = req.file ? await req.file.location : null
        const fileName = req.file ? await req.file.originalname : null

        try{
            await meetingReportSchema
            .validateAsync({title, content, ref}, { abortEarly: false })
            .catch((err) => {
                throw new CustomError(err.message, 401)
            })

            await this.submitService.meetingReportSubmit({
                userId,
                meetingId : eventId,
                teamId : teamId,
                title,
                ref : ref,
                content,
                fileLocation,
                fileName,
            })

            return res.status(200).send({ message : '회의록 등록이 성공적으로 완료되었습니다.'})
        }catch(error) {
            next(error)
        }
    }

    // 회의록 수정
    meetingReportModify = async(req, res, next) => {
        const {title, content, ref} = req.body
        const {userId, teamId} = res.locals.user
        const {meetingId} = req.params

        console.log("req.file: ", req.file); // 테스트 => req.file.location에 이미지 링크(s3-server)가 담겨있음, 다중이라면 file => files로 변경
        // 파일이 있을때와 없을때
        const fileLocation = req.file ? await req.file.location : null
        const fileName = req.file ? await req.file.originalname : null

        try{
            await meetingReportSchema
            .validateAsync({title, content, ref}, { abortEarly: false })
            .catch((err) => {
                throw new CustomError(err.message, 401)
            })
            
            await this.submitService.meetingReportModify({
                userId,
                meetingId,
                teamId : teamId,
                title,
                ref : ref,
                content,
                fileLocation,
                fileName,
            })

            return res.status(200).send({ message : '회의록 수정이 성공적으로 완료되었습니다.'})
        }catch(error) {
            next(error)
        }
    }

    // 팀원 목록 조회
    teamUsersList = async(req, res, next) => {
        try {
            const {teamId} = res.locals.user

            const findTeamUsers = await this.submitService.teamUsersList(teamId)

            return res.status(200).json(findTeamUsers)
        } catch (error) {
            next(error)
        }
        
    }
}

module.exports = SubmitController;