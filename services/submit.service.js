const SubmitRepository = require("../repositories/submit.repository");
const CustomError = require('../middlewares/errorHandler')

class SubmitService {
    submitRepository = new SubmitRepository()

    // 출장 신청
    scheduleSubmit =  async(userId, teamName, authLevel, startDay, endDay, title, ref, location, content, file) => {
        // 
        const isRef = await this.submitRepository.findRef(teamName, authLevel)
        const REF = ref + isRef;
        if(!isRef) {
            throw new CustomError('유저가 존재하지 않습니다', 401)
        }

        const createScheduleSubmit = await this.submitRepository.scheduleSubmit({userId, startDay, endDay, title, ref:REF, location, content, file})

        return createScheduleSubmit
    }
}

module.exports = SubmitService;
