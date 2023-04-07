const {Users, Schedules} = require('../models')

class SubmitRepository {
    // 출장 신청
    scheduleSubmit = async(userId, startDay, endDay, title, ref, location, content, file) => {
        const createScheduleSubmit = await Schedules.create({
            userId,
            startDay,
            endDay,
            title,
            ref,
            location,
            content,
            file
        })

        return createScheduleSubmit
    }

    findRef = async(teamName) => {
        const findRef = await Users.findALl({where : {teamName, authLevel:2}})

        return findRef
    }
}

module.exports = SubmitRepository;
