const {Users, Schedules, Events, Mentions, Files, sequelize, Vacations, Meetings, Reports, Others, MeetingReports} = require('../models')
const CustomError = require('../middlewares/errorHandler')
const {Transaction} = require('sequelize');
const { date } = require('joi');

class SubmitRepository {

    // 출장 신청
    scheduleSubmit = async (
        {userId,
        start,
        end,
        title,
        attendees,
        location,
        body,
        fileLocation,
        fileName,
    }) => {
        // console.log(typeof userId)
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (fileName.length === 0) ? false : true;
            const event = await Events.create({
                userId,
                calendarId: '2', // Schedules
                hasFile : hasFile,
            }, {transaction : t})
            
            const {Id} = event;
            // console.log("aaaaaaaaaaaaaa",event)

            const createScheduleSubmit = await Schedules.create({
                Id: Id,
                userId,
                start,
                end,
                title,
                location,
                body,
            }, {transaction : t})

            await Promise.all(fileName.map(async(item, index) => {
                await Files.create({
                    Id : Id,
                    fileName : item,
                    fileLocation : fileLocation[index]
                }, {transaction : t});
            }))

            await Promise.all(attendees.map(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})
                // console.log('aaaaaaaaaaaaaaa',item)

                await Mentions.create({
                    Id : Id,
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
        Id,
        start,
        end,
        title,
        attendees,
        location,
        body,
        fileLocation,
        fileName,
    }) => {
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (fileName.length === 0) ? false : true;
            const event = await Events.update({
                userId,
                hasFile : hasFile,
            }, {
                where : {Id}
            }, {transaction : t})
            
            const createScheduleSubmit = await Schedules.update({
                userId,
                start,
                end,
                title,
                location,
                body,
                fileLocation,
                fileName,
            },{
                where: {Id}
            }, {transaction : t})

            await Promise.all(fileName.map(async(item, index) => {
                await Files.update({
                    fileName : item,
                    fileLocation : fileLocation[index]
                }, {
                    where: {Id}
                }, {transaction : t});
            }))

            await Promise.all(attendees.map(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})
                // console.log('aaaaaaaaaaaaaaa',userId)

                await Mentions.update({
                    userId : userId,
                    isChecked : false
                }, {
                    where : {Id}
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
    
    // 휴가 신청
    vacationSubmit = async({userId, start, end, typeDetail}) => {
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            // console.log('aaaaaa',userId, startDay, endDay, typeDetail)
            const event = await Events.create({
                userId,
                calendarId: '4', //Vacations
                hasFile: 0
            }, {transaction : t})

            const {Id} = event

            const createVacationSubmit = await Vacations.create({
                userId,
                Id,
                start,
                end,
                typeDetail // 휴가 : 0, 반차 : 1, 월차 : 2, 병가 : 3
            }, {transaction : t})

            await t.commit()
            return createVacationSubmit

        }catch(transactionError) {
            console.error(transactionError)
            await t.rollback()
            throw new CustomError('휴가 신청서 생성에 실패하였습니다.', 400)
        }
    }

    // 기타 신청
    otherSubmit = async({userId, start, end, title, attendees, body, fileLocation, fileName}) => {
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (fileName.length === 0) ? false : true;
            const event = await Events.create({
                userId,
                calendarId: '7', // Others
                hasFile : hasFile,
            }, {transaction : t})
            
            const {Id} = event;
            
            const createOtherSubmit = await Others.create({
                Id: Id,
                userId,
                start,
                end,
                title,
                body,
                fileLocation,
                fileName,
            }, {transaction : t})

            await Promise.all(fileName.map(async(item, index) => {
                await Files.create({
                    Id : Id,
                    fileName : item,
                    fileLocation : fileLocation[index]
                }, {transaction : t});
            }))

            await Promise.all(attendees.map(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})
                
                await Mentions.create({
                    Id : Id,
                    userId : userId,
                    isChecked : false
                }, {transaction : t})
            }))

            await t.commit()
            return createOtherSubmit
        }catch(transactionError) {
            console.log(transactionError)
            await t.rollback()
            throw new CustomError('기타 신청서 생성에 실패하였습니다.', 400)
        }
    }

    // 회의 신청
    meetingSubmit = async({userId, calendarId, start, end, title, attendees, location, body, fileLocation, fileName}) => {
        // console.log(typeof userId)
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (fileName.length === 0) ? false : true;
            const event = await Events.create({
                userId,
                calendarId, // Issues("3"), Meeting("0"), 기타일정("1")
                hasFile : hasFile,
            }, {transaction : t})
            
            const {Id} = event;
            
            const createMeetingSubmit = await Meetings.create({
                Id: Id,
                userId,
                start,
                end,
                title,
                location,
                body,
            }, {transaction : t})

            await Promise.all(fileName.map(async(item, index) => {
                await Files.create({
                    Id : Id,
                    fileName : item,
                    fileLocation : fileLocation[index]
                }, {transaction : t});
            }))

            await Promise.all(attendees.map(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})
                
                await Mentions.create({
                    Id : Id,
                    userId : userId,
                    isChecked : false
                }, {transaction : t})
            }))

            await t.commit()
        }catch(transactionError) {
            console.log(transactionError)
            await t.rollback()
            throw new CustomError('회의 신청서 생성에 실패하였습니다.', 400)
        }
    }

    // 보고서 등록
    reportSubmit = async({userId, title, attendees, body, fileLocation, fileName, start, end}) => {
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (fileName.length === 0) ? false : true;
            const event = await Events.create({
                userId,
                calendarId: '6', // Reports
                hasFile : hasFile,
            }, {transaction : t})
            
            const {Id} = event;
            
            await Reports.create({
                Id: Id,
                userId,
                title,
                body,
                start,
                end,
            }, {transaction : t})

            await Promise.all(fileName.map(async(item, index) => {
                await Files.create({
                    Id : Id,
                    fileName : item,
                    fileLocation : fileLocation[index]
                }, {transaction : t});
            }))

            await Promise.all(attendees.map(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})
                
                await Mentions.create({
                    Id : Id,
                    userId : userId,
                    isChecked : false
                }, {transaction : t})
            }))

            await t.commit()
        }catch(transactionError) {
            console.log(transactionError)
            await t.rollback()
            throw new CustomError('보고서 등록에 실패하였습니다.', 400)
        }
    }

    // 보고서 수정
    reportModify = async({userId, Id, title, attendees, body, fileLocation, fileName, start, end}) => {
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (fileName.length === 0) ? false : true;
            const event = await Events.update({
                userId,
                hasFile : hasFile,
            }, {
                where: {Id}
            }, {transaction : t})
            
            await Reports.update({
                userId,
                title,
                body,
                start,
                end,
            }, {
                where: {Id}
            }, {transaction : t})

            await Promise.all(fileName.map(async(item, index) => {
                await Files.update({
                    fileName : item,
                    fileLocation : fileLocation[index]
                }, {
                    where: {Id}
                }, {transaction : t});
            }))

            await Promise.all(attendees.map(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})
                
                await Mentions.update({
                    userId : userId,
                    isChecked : false
                }, {
                    where: {Id}
                }, {transaction : t})
            }))

            await t.commit()
        }catch(transactionError) {
            console.log(transactionError)
            await t.rollback()
            throw new CustomError('보고서 등록에 실패하였습니다.', 400)
        }
    }

    // 회의록 등록
    meetingReportSubmit = async({userId, meetingId, title, attendees, body, fileLocation, fileName, start, end}) => {
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (fileName.length === 0) ? false : true;
            const event = await Events.create({
                userId,
                calendarId: '5', //MeetingReports
                hasFile : hasFile,
            }, {transaction : t})

            const {Id} = event;
            
            const createReportSubmit = await MeetingReports.create({
                Id: Id,
                meetingId,
                userId,
                title,
                body,
                start,
                end,
            }, {transaction : t})

            await Promise.all(fileName.map(async(item, index) => {
                await Files.create({
                    Id : Id,
                    fileName : item,
                    fileLocation : fileLocation[index]
                }, {transaction : t});
            }))

            await Promise.all(attendees.map(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})
                
                await Mentions.create({
                    Id : Id,
                    userId : userId,
                    isChecked : false
                }, {transaction : t})
            }))

            await t.commit()
        }catch(transactionError) {
            console.log(transactionError)
            await t.rollback()
            throw new CustomError('회의록 등록에 실패하였습니다.', 400)
        }
    }

    // 회의록 수정
    meetingReportModify = async({userId, Id, meetingId, title, attendees, body, fileLocation, fileName, start, end}) => {
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        try {
            let hasFile = (fileName.length === 0) ? false : true;
            const event = await Events.update({
                userId,
                hasFile : hasFile,
            }, {
                where: {Id}
            }, {transaction : t})

            await MeetingReports.update({
                userId,
                title,
                body,
                start,
                end
            }, {
                where: {Id, meetingId}
            }, {transaction : t})

            await Promise.all(fileName.map(async(item, index) => {
                await Files.update({
                    fileName : item,
                    fileLocation : fileLocation[index]
                }, {
                    where: {Id}
                }, {transaction : t});
            }))

            await Promise.all(attendees.map(async(item) => {
                const {userId} = await Users.findOne({where : {userName : item}})

                await Mentions.update({
                    userId : userId,
                    isChecked : false
                }, {
                    where: {Id}
                }, {transaction : t})
            }))

            await t.commit()
        }catch(transactionError) {
            console.log(transactionError)
            await t.rollback()
            throw new CustomError('회의록 등록에 실패하였습니다.', 400)
        }
    }

    // 팀원 목록 조회
    teamUsersList = async(teamId) => {
        const findTeamUsers = await Users.findAll({
            raw: true,
            where: {teamId, authLevel: 3},
            attributes: [
                "userName",
                "userId"
            ]
        })

        return findTeamUsers
    }

    // 관리자 조회
    findRef = async(teamId) => {
        const findRef = await Users.findAll({where : {teamId, authLevel: 2}})

        return findRef
    };

    findOneSchedule = async(Id) => {
        const schedule = await Schedules.findOne({
            raw : true,
            where : {Id},
        })

        return schedule
    }

    findOneReport = async(Id) => {
        const report = await Reports.findOne({
            raw: true,
            where: {Id}
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

    findOneFile = async(Id) => {
        const file = await Files.findAll({
            raw: true,
            where: {Id},
            attributes: [
                "fileLocation"
            ]
        })

        return file
    }
}

module.exports = SubmitRepository;
