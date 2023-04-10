const { Users, Schedules , Events, Mentions, sequelize} = require("../models");
const CustomError = require('../middlewares/errorHandler')
const {Transaction} = require('sequelize')

class SubmitRepository {

    // 출장 신청
    scheduleSubmit = async (
        {userId,
        startDay,
        endDay,
        title,
        ref,
        location,
        content,
        file
    }) => {
        // console.log(typeof userId)
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (file) ? true : false;
            const event = await Events.create({
                userId,
                eventType: 'Scehdules',
                hasFile : hasFile,
            }, {transaction : t})
            
            const {eventId} = event;
            // console.log("aaaaaaaaaaaaaa",event)

            const createScheduleSubmit = await Schedules.create({
                eventId: eventId,
                userId,
                startDay,
                endDay,
                title,
                location,
                content,
                file,
            }, {transaction : t})

            const isRef = ref.split(',')
            console.log(isRef)
            isRef.forEach(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})
                // console.log('aaaaaaaaaaaaaaa',userId)

                await Mentions.create({
                    eventId : eventId,
                    userId : userId,
                    isChecked : false
                });
            }, {transaction : t})

            await t.commit()
            return createScheduleSubmit;
        }catch(transactionError) {
            await t.rollback()
            throw new CustomError('유저생성에 실패하였습니다.', 400)
        }
        
    };

    findRef = async (teamId) => {
        const findRef = await Users.findAll({
            where: { teamId, authLevel: 2 },
        });

        return findRef
    }

    findRef = async(teamId) => {
        const findRef = await Users.findAll({where : {teamId, authLevel:2}})

        return findRef
    };
}

module.exports = SubmitRepository;
