const {Users, Schedules, Events, Mentions, sequelize, Vacations, Meetings, Reports, Others, MeetingReports} = require('../models')
const CustomError = require('../middlewares/errorHandler')
const {Transaction} = require('sequelize');
const { date } = require('joi');

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

            ref.forEach(async(item) => {
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
            throw new CustomError('출장 신청서 생성에 실패하였습니다.', 400)
        }
        
    };

    findRef = async (teamId) => {
        const findRef = await Users.findAll({
            where: { teamId, authLevel: 2 },
        });

        return findRef
    }

    // 휴가 신청
    vacationSubmit = async(userId, startDay, endDay, typeDetail) => {
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            const event = await Events.create({
                userId,
                eventType: 'Vacations',
                hasFile : false,
            }, {transaction : t})

            const {eventId} = event

            const createVacationSubmit = await Vacations.create({
                userId,
                eventId,
                startDay,
                endDay,
                typeDetail
            }, {transaction : t})

            await t.commit()
            return createVacationSubmit

        }catch(transactionError) {
            await t.rollback()
            throw new CustomError('휴가 신청서 생성에 실패하였습니다.', 400)
        }
    }

    // 기타 신청
    otherSubmit = async({userId, startDay, endDay, title, ref, content, file}) => {
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (file) ? true : false;
            const event = await Events.create({
                userId,
                eventType: 'Others',
                hasFile : hasFile,
            }, {transaction : t})
            
            const {eventId} = event;
            
            const createOtherSubmit = await Others.create({
                eventId: eventId,
                userId,
                startDay,
                endDay,
                title,
                content,
                file
            }, {transaction : t})

            ref.forEach(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})
                
                await Mentions.create({
                    eventId : eventId,
                    userId : userId,
                    isChecked : false
                })
            }, {transaction : t})

            await t.commit()
            return createOtherSubmit
        }catch(transactionError) {
            await t.rollback()
            throw new CustomError('기타 신청서 생성에 실패하였습니다.', 400)
        }
    }

    // 회의 신청
    meetingSubmit = async({userId, startDay, startTime, title, ref, location, content, file}) => {
        // console.log(typeof userId)
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (file) ? true : false;
            const event = await Events.create({
                userId,
                eventType: 'Meeting',
                hasFile : hasFile,
            }, {transaction : t})
            
            const {eventId} = event;
            
            const createMeetingSubmit = await Meetings.create({
                eventId: eventId,
                userId,
                startDay,
                startTime,
                title,
                location,
                content,
                file
            }, {transaction : t})

            ref.forEach(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})
                
                await Mentions.create({
                    eventId : eventId,
                    userId : userId,
                    isChecked : false
                })
            }, {transaction : t})

            await t.commit()
        }catch(transactionError) {
            await t.rollback()
            throw new CustomError('회의 신청서 생성에 실패하였습니다.', 400)
        }
    }

    // 보고서 등록
    reportSubmit = async({userId, title, ref, content, file}) => {
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (file) ? true : false;
            const event = await Events.create({
                userId,
                eventType: 'Meeting',
                hasFile : hasFile,
            }, {transaction : t})
            
            const {eventId} = event;
            
            await Reports.create({
                eventId: eventId,
                userId,
                title,
                content,
                file,
                enrollDay : event.createdAt
            }, {transaction : t})

            ref.forEach(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})
                // console.log("---------------------------")
                // console.log(await Users.findOne({where : {userName : item}}))
                // console.log("---------------------------")
                
                await Mentions.create({
                    eventId : eventId,
                    userId : userId,
                    isChecked : false
                })
            }, {transaction : t})

            await t.commit()
        }catch(transactionError) {
            await t.rollback()
            throw new CustomError('보고서 등록에 실패하였습니다.', 400)
        }
    }

    // 회의록 등록
    meetingReportSubmit = async({userId, meetingId, title, ref, content, file}) => {
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (file) ? true : false;
            const event = await Events.create({
                userId,
                eventType: 'MeetingReports',
                hasFile : hasFile,
            }, {transaction : t})
            
            const {eventId} = event;

            const createReportSubmit = await MeetingReports.create({
                eventId: eventId,
                meetingId,
                userId,
                title,
                content,
                file,
                enrollDay : event.createdAt
            }, {transaction : t})

            ref.forEach(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})

                await Mentions.create({
                    eventId : eventId,
                    userId : userId,
                    isChecked : false
                })
            }, {transaction : t})

            await t.commit()
        }catch(transactionError) {
            await t.rollback()
            throw new CustomError('회의록 등록에 실패하였습니다.', 400)
        }
    }

    findRef = async(teamId) => {
        const findRef = await Users.findAll({where : {teamId, authLevel: 2}})

        return findRef
    };
}

module.exports = SubmitRepository;
