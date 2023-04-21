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
        fileLocation,
        fileName,
    }) => {
        // console.log(typeof userId)
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (fileName) ? true : false;
            const event = await Events.create({
                userId,
                eventType: 'Schedules',
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
                fileLocation,
                fileName,
            }, {transaction : t})

            await Promise.all(ref.map(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})
                // console.log('aaaaaaaaaaaaaaa',item)

                await Mentions.create({
                    eventId : eventId,
                    userId : userId,
                    isChecked : false
                }, {transaction : t});
            }))

            await t.commit()
            return createScheduleSubmit;
        }catch(transactionError) {
            console.log(transactionError)
            await t.rollback()
            throw new CustomError('출장 신청서 생성에 실패하였습니다.', 400)
        }
        
    };

    // 일정 수정
    scheduleModify = async({
        userId,
        eventId,
        startDay,
        endDay,
        title,
        ref,
        location,
        content,
        fileLocation,
        fileName,
    }) => {
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (fileName) ? true : false;
            const event = await Events.update({
                userId,
                hasFile : hasFile,
            }, {
                where : {eventId}
            }, {transaction : t})
            
            const createScheduleSubmit = await Schedules.update({
                userId,
                startDay,
                endDay,
                title,
                location,
                content,
                fileLocation,
                fileName,
            },{
                where: {eventId}
            }, {transaction : t})

            await Promise.all(ref.map(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})
                // console.log('aaaaaaaaaaaaaaa',userId)

                await Mentions.update({
                    userId : userId,
                    isChecked : false
                }, {
                    where : {eventId}
                }, {transaction : t});
            }))

            await t.commit()
            return createScheduleSubmit;
        }catch(transactionError) {
            await t.rollback()
            throw new CustomError('출장 신청서 생성에 실패하였습니다.', 400)
        }
    };
    
    // 휴가 신청
    vacationSubmit = async({userId, startDay, endDay, typeDetail}) => {
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            const event = await Events.create({
                userId,
                eventType: 'Vacations'
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
    otherSubmit = async({userId, startDay, endDay, title, ref, content, fileLocation, fileName}) => {
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (fileName) ? true : false;
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
                fileLocation,
                fileName,
            }, {transaction : t})

            await Promise.all(ref.map(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})
                
                await Mentions.create({
                    eventId : eventId,
                    userId : userId,
                    isChecked : false
                }, {transaction : t})
            }))

            await t.commit()
            return createOtherSubmit
        }catch(transactionError) {
            await t.rollback()
            throw new CustomError('기타 신청서 생성에 실패하였습니다.', 400)
        }
    }

    // 회의 신청
    meetingSubmit = async({userId, eventType, startDay, startTime, title, ref, location, content, fileLocation, fileName}) => {
        // console.log(typeof userId)
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (fileName) ? true : false;
            const event = await Events.create({
                userId,
                eventType,
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
                fileLocation,
                fileName,
            }, {transaction : t})

            await Promise.all(ref.map(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})
                
                await Mentions.create({
                    eventId : eventId,
                    userId : userId,
                    isChecked : false
                }, {transaction : t})
            }))

            await t.commit()
        }catch(transactionError) {
            await t.rollback()
            throw new CustomError('회의 신청서 생성에 실패하였습니다.', 400)
        }
    }

    // 보고서 등록
    reportSubmit = async({userId, title, ref, content, fileLocation, fileName}) => {
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (fileName) ? true : false;
            const event = await Events.create({
                userId,
                eventType: 'Reports',
                hasFile : hasFile,
            }, {transaction : t})
            
            const {eventId} = event;
            
            await Reports.create({
                eventId: eventId,
                userId,
                title,
                content,
                fileLocation,
                fileName,
                enrollDay : event.createdAt
            }, {transaction : t})

            await Promise.all(ref.map(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})
                // console.log("---------------------------")
                // console.log(await Users.findOne({where : {userName : item}}))
                // console.log("---------------------------")
                
                await Mentions.create({
                    eventId : eventId,
                    userId : userId,
                    isChecked : false
                }, {transaction : t})
            }))

            await t.commit()
        }catch(transactionError) {
            await t.rollback()
            throw new CustomError('보고서 등록에 실패하였습니다.', 400)
        }
    }

    // 보고서 수정
    reportModify = async({userId, eventId, title, ref, content, fileLocation, fileName}) => {
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (fileName) ? true : false;
            const event = await Events.update({
                userId,
                hasFile : hasFile,
            }, {
                where: {eventId}
            }, {transaction : t})
            
            await Reports.update({
                userId,
                title,
                content,
                fileLocation,
                fileName,
                enrollDay : event.createdAt
            }, {
                where: {eventId}
            }, {transaction : t})

            await Promise.all(ref.map(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})
                
                await Mentions.update({
                    userId : userId,
                    isChecked : false
                }, {
                    where: {eventId}
                }, {transaction : t})
            }))

            await t.commit()
        }catch(transactionError) {
            await t.rollback()
            throw new CustomError('보고서 등록에 실패하였습니다.', 400)
        }
    }

    // 회의록 등록
    meetingReportSubmit = async({userId, meetingId, title, ref, content, fileLocation, fileName}) => {
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (fileName) ? true : false;
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
                fileLocation,
                fileName,
                enrollDay : event.createdAt
            }, {transaction : t})

            await Promise.all(ref.map(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})
                
                await Mentions.create({
                    eventId : eventId,
                    userId : userId,
                    isChecked : false
                }, {transaction : t})
            }))

            await t.commit()
        }catch(transactionError) {
            await t.rollback()
            throw new CustomError('회의록 등록에 실패하였습니다.', 400)
        }
    }

    // 회의록 수정
    meetingReportModify = async({userId, eventId, meetingId, title, ref, content, fileLocation, fileName}) => {
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (fileName) ? true : false;
            const event = await Events.update({
                userId,
                hasFile : hasFile,
            }, {
                where: {eventId}
            }, {transaction : t})

            await MeetingReports.update({
                userId,
                title,
                content,
                fileLocation,
                fileName,
                enrollDay : event.createdAt
            }, {
                where: {eventId, meetingId}
            }, {transaction : t})

            await Promise.all(ref.map(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})

                await Mentions.update({
                    userId : userId,
                    isChecked : false
                }, {
                    where: {eventId}
                }, {transaction : t})
            }))

            await t.commit()
        }catch(transactionError) {
            await t.rollback()
            throw new CustomError('회의록 등록에 실패하였습니다.', 400)
        }
    }

    // 팀원 목록 조회
    teamUsersList = async(teamId) => {
        const findTeamUsers = await Users.findAll({
            raw: true,
            where: {teamId, authLevel: 3}
        })

        return findTeamUsers
    }

    // 관리자 조회
    findRef = async(teamId) => {
        const findRef = await Users.findAll({where : {teamId, authLevel: 2}})

        return findRef
    };

    findOneSchedule = async(eventId) => {
        const schedule = await Schedules.findOne({
            raw : true,
            where : {eventId},
        })

        return schedule
    }

    findOneReport = async(eventId) => {
        const report = await Reports.findOne({
            raw: true,
            where: {eventId}
        })

        console.log('aaaaaaaaa', report)
        return report
    }

    findOneMeetingReport = async(meetingId) => {
        const meetingReport = await MeetingReports.findOne({
            raw: true,
            where: {meetingId}
        })

        return meetingReport
    }
}

module.exports = SubmitRepository;
