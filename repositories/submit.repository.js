const {Users, Schedules, Events} = require('../models')
const CustomError = require('../middlewares/errorHandler')

class SubmitRepository {
    // 출장 신청
    scheduleSubmit = async({userId, startDay, endDay, title, ref, location, content, file}) => {
        // console.log(typeof userId)
        let hasFile = (file) ? true : false;
        const event = await Events.create({
            userId,
            eventType: 'Scehdules',
            hasFile : hasFile,
        })
        
        const {eventId} = event;
        console.log("aaaaaaaaaaaaaa",event)
        const createScheduleSubmit = await Schedules.create({
            eventId: eventId,
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

    findRef = async(teamId) => {
        const findRef = await Users.findAll({where : {teamId, authLevel:2}})

        return findRef
    }
}

module.exports = SubmitRepository;
