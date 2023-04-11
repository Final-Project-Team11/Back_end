const SubmitRepository = require("../repositories/submit.repository");
const CustomError = require("../middlewares/errorHandler");

class SubmitService {
    submitRepository = new SubmitRepository();

    // 출장 신청
    scheduleSubmit =  async({userId, teamId, startDay, endDay, title, ref, location, content, file}) => {
        // console.log("service",typeof userId)
        const isRef = await this.submitRepository.findRef(teamId)
        
        // 팀장 참조
        let REF = isRef.map((item) => {
            return item.userName
        })

        // concat() 메서드는 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환합니다.
        REF = ref.concat(REF)

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
    vacationSubmit = async({userId, startDay, endDay, typeDetail}) => {

        const createVacationSubmit = await this.submitRepository.vacationSubmit(userId, startDay, endDay, typeDetail)

        return createVacationSubmit
    }

    // 기타 신청
    otherSubmit = async({userId, teamId, startDay, endDay, title, ref, content, file}) => {
        const isRef = await this.submitRepository.findRef(teamId)
        
        // 팀장 참조
        let REF = isRef.map((item) => {
            return item.userName
        })

        // concat() 메서드는 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환합니다.
        REF = ref.concat(REF)

        const createOtherSubmit = await this.submitRepository.otherSubmit({userId, startDay, endDay, title, ref:REF, content, file})

        return createOtherSubmit
    }

    // 회의 신청
    meetingSubmit = async({userId, teamId, startDay, startTime, title, ref, location, content, file}) => {
        // console.log("service",typeof userId)
        const isRef = await this.submitRepository.findRef(teamId)
        // 팀장 참조
        let REF = isRef.map((item) => {
            return item.userName
        })
        // concat() 메서드는 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환합니다.
        REF = ref.concat(REF)

        const createMeetingSubmit = await this.submitRepository.meetingSubmit({userId, startDay, startTime, title, ref:REF, location, content, file})

        return createMeetingSubmit
    }

    // 보고서 등록
    reportSubmit = async({userId, teamId, title, content, ref, file}) => {
        const isRef = await this.submitRepository.findRef(teamId)
        
        // 팀장 참조
        let REF = isRef.map((item) => {
            return item.userName
        })

        // concat() 메서드는 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환합니다.
        REF = ref.concat(REF)

        await this.submitRepository.reportSubmit({userId, title, content, ref: REF, isRef, file})

    }
}

module.exports = SubmitService;
