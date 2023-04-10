const SubmitRepository = require("../repositories/submit.repository");
const CustomError = require("../middlewares/errorHandler");

class SubmitService {
    submitRepository = new SubmitRepository();

    // 출장 신청
    scheduleSubmit =  async(userId, teamId, startDay, endDay, title, ref, location, content, file) => {
        // console.log("service",typeof userId)
        const isRef = await this.submitRepository.findRef(teamId)
        const REF = ref + isRef;
        if (!isRef) {
            throw new CustomError("유저가 존재하지 않습니다", 401);
        }

        const createScheduleSubmit = await this.submitRepository.scheduleSubmit(
            {
                userId,
                startDay,
                endDay,
                title,
                ref: REF,
                location,
                content,
                file,
            }
        );
        return createScheduleSubmit
    }

    // 휴가 신청
    vacationSubmit = async(userId, startDay, endDay, typeDetail) => {

        const createVacationSubmit = await this.submitRepository.vacationSubmit(userId, startDay, endDay, typeDetail)

        return createVacationSubmit
    }

    // 기타 신청
    otherSubmit = async(userId, teamId, startDay, endDay, title, ref, content, file) => {
        const isRef = await this.submitRepository.findRef(teamId)
        const REF = ref + isRef;
        if(!isRef) {
            throw new CustomError('유저가 존재하지 않습니다', 401)
        }

        const createOtherSubmit = await this.submitRepository.otherSubmit({userId, startDay, endDay, title, ref:REF, content, file})

        return createOtherSubmit
    }

    // 회의 신청
    meetingSubmit = async(userId, teamId, startDay, endDay, title, ref, location, content, file) => {
        // console.log("service",typeof userId)
        const isRef = await this.submitRepository.findRef(teamId)
        const REF = ref + isRef;
        if(!isRef) {
            throw new CustomError('유저가 존재하지 않습니다', 401)
        }

        const createMeetingSubmit = await this.submitRepository.meetingSubmit({userId, startDay, endDay, title, ref:REF, location, content, file})

        return createMeetingSubmit
    }
}

module.exports = SubmitService;
