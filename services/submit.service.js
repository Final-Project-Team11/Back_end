const SubmitRepository = require("../repositories/submit.repository");
const CustomError = require("../middlewares/errorHandler");
const aws = require('aws-sdk');
const s3 = new aws.S3();
require('dotenv').config()

class SubmitService {
    submitRepository = new SubmitRepository();

    // 출장 신청
    scheduleSubmit =  async({userId, teamId, start, end, title, attendees, location, body, fileLocation, fileName}) => {
        const isRef = await this.submitRepository.findRef(teamId)
        let REF;
        if (attendees === null) {
            // ref가 null인 경우
            REF = isRef.map((item) => {
                return item.userId;
            });
        } else if(attendees !== undefined && attendees !== null) {
            const attendeesId = attendees.map((item) => {
                return item.split('-')[1]
            })
            console.log('###########attendeesId##########', attendeesId)
            // ref가 undefined가 아니고, null이 아닌 경우.
            REF = attendeesId.concat(isRef.map((item) => {
                return item.userId;
            }));
        } else {
            // ref가 undefined인 경우
            REF = isRef.map((item) => {
                return item.userId;
            });
        }
        // console.log(REF)
        
        const createScheduleSubmit = await this.submitRepository.scheduleSubmit(
            {
                userId,
                start,
                end,
                title,
                attendees: REF,
                location,
                body,
                fileLocation,
                fileName,
            }
        );
        return createScheduleSubmit
    }

    // 일정 수정
    scheduleModify = async({userId, Id, teamId, start, end, title, attendees, location, body, fileLocation, fileName}) => {
        const schedule = await this.submitRepository.findOneSchedule(Id)
        // console.log("aaaaaaaaaa", schedule)
        if(!schedule) {
            throw new CustomError("해당 일정이 존재하지 않습니다.", 401)
        }
        if(schedule.userId != userId) {
            throw new CustomError("일정 수정 권한이 존재하지 않습니다.", 401)
        }
        const file = await this.submitRepository.findOneFile(Id)

        const bucketName = process.env.BUCKET_NAME
        let fileKey = [];
        if(file) {
            fileKey = file.map(file => {
                const key = file.fileLocation.split('/')[3]
                return key
            })
        }
        console.log("asdfdasfdsafdsa", fileKey)

        // 다중 파일 삭제
        const objectParams_del = {
            Bucket: bucketName,
            Delete: {
                Objects: fileKey.map(key => ({ Key: key }))
            }
        }

        await s3
        .deleteObjects(objectParams_del)
        .promise()
        .then((data) => {
            console.log('Delete Success! : ', data)
        })
        .catch((error) => {
            console.log(error)
        })

        const isRef = await this.submitRepository.findRef(teamId)
        let REF;
        if (attendees === null) {
            // ref가 null인 경우
            REF = isRef.map((item) => {
                return item.userId;
            });
        } else if(attendees !== undefined && attendees !== null) {
            const attendeesId = attendees.map((item) => {
                return item.split('-')[1]
            })
            console.log('###########attendeesId##########', attendeesId)
            // ref가 undefined가 아니고, null이 아닌 경우.
            REF = attendeesId.concat(isRef.map((item) => {
                return item.userId;
            }));
        } else {
            // ref가 undefined인 경우
            REF = isRef.map((item) => {
                return item.userId;
            });
        }

        const createScheduleSubmit = await this.submitRepository.scheduleModify(
            {
                userId,
                Id,
                start,
                end,
                title,
                attendees: REF,
                location,
                body,
                fileLocation,
                fileName,
            }
        );
        return createScheduleSubmit
    }

    // 휴가 신청
    vacationSubmit = async({userId, start, end, typeDetail}) => {
        if(typeDetail == "반차" && start !== end){
            throw new CustomError('날짜를 확인해 주세요')
        }

        const createVacationSubmit = await this.submitRepository.vacationSubmit({userId, start, end, typeDetail})

        return createVacationSubmit
    }

    // 기타 신청
    otherSubmit = async({userId, teamId, start, end, title, attendees, body, fileLocation, fileName}) => {
        const isRef = await this.submitRepository.findRef(teamId)
        let REF;
        if (attendees === null) {
            // ref가 null인 경우
            REF = isRef.map((item) => {
                return item.userId;
            });
        } else if(attendees !== undefined && attendees !== null) {
            const attendeesId = attendees.map((item) => {
                return item.split('-')[1]
            })
            console.log('###########attendeesId##########', attendeesId)
            // ref가 undefined가 아니고, null이 아닌 경우.
            REF = attendeesId.concat(isRef.map((item) => {
                return item.userId;
            }));
        } else {
            // ref가 undefined인 경우
            REF = isRef.map((item) => {
                return item.userId;
            });
        }

        const createOtherSubmit = await this.submitRepository.otherSubmit({userId, start, end, title, attendees:REF, body, fileLocation, fileName})

        return createOtherSubmit
    }

    // 회의 신청
    meetingSubmit = async({userId, teamId, calendarId, start, end, title, attendees, location, body, fileLocation, fileName}) => {
        // console.log("service",typeof userId)
        const isRef = await this.submitRepository.findRef(teamId)
        console.log("aaaaaaaaaaaaaa",attendees)
        let REF;
        if (attendees === null) {
            // ref가 null인 경우
            REF = isRef.map((item) => {
                return item.userId;
            });
        } else if(attendees !== undefined && attendees !== null) {
            const attendeesId = attendees.map((item) => {
                return item.split('-')[1]
            })
            console.log('###########attendeesId##########', attendeesId)
            // ref가 undefined가 아니고, null이 아닌 경우.
            REF = attendeesId.concat(isRef.map((item) => {
                return item.userId;
            }));
        } else {
            // ref가 undefined인 경우
            REF = isRef.map((item) => {
                return item.userId;
            });
        }
        console.log("11111111111111111",REF)
        const createMeetingSubmit = await this.submitRepository.meetingSubmit({userId, calendarId, start, end, title, attendees:REF, location, body, fileLocation, fileName})

        return createMeetingSubmit
    }

    // 보고서 등록
    reportSubmit = async({userId, teamId, title, body, attendees, fileLocation, fileName, start, end}) => {
        const isRef = await this.submitRepository.findRef(teamId)
        let REF;
        if (attendees === null) {
            // ref가 null인 경우
            REF = isRef.map((item) => {
                return item.userId;
            });
        } else if(attendees !== undefined && attendees !== null) {
            const attendeesId = attendees.map((item) => {
                return item.split('-')[1]
            })
            console.log('###########attendeesId##########', attendeesId)
            // ref가 undefined가 아니고, null이 아닌 경우.
            REF = attendeesId.concat(isRef.map((item) => {
                return item.userId;
            }));
        } else {
            // ref가 undefined인 경우
            REF = isRef.map((item) => {
                return item.userId;
            });
        }

        await this.submitRepository.reportSubmit({userId, title, body, attendees: REF, fileLocation, fileName, start, end})
    }

    // 보고서 수정
    reportModify = async({userId, Id, teamId, title, body, attendees, fileLocation, fileName, start, end}) => {
        const report = await this.submitRepository.findOneReport(Id)
        if(!report) {
            throw new CustomError("해당 보고서가 존재하지 않습니다.", 401)
        }
        if(report.userId != userId) {
            throw new CustomError("보고서 수정 권한이 존재하지 않습니다.", 401)
        }
        const file = await this.submitRepository.findOneFile(Id)

        const bucketName = process.env.BUCKET_NAME
        let fileKey = [];
        if(file) {
            fileKey = file.map(file => {
                const key = file.fileLocation.split('/')[3]
                return key
            })
        }
        console.log("asdfdasfdsafdsa", fileKey)

        // 다중 파일 삭제
        const objectParams_del = {
            Bucket: bucketName,
            Delete: {
                Objects: fileKey.map(key => ({ Key: key }))
            }
        }

        await s3
        .deleteObjects(objectParams_del)
        .promise()
        .then((data) => {
            console.log('Delete Success! : ', data)
        })
        .catch((error) => {
            console.log(error)
        })


        const isRef = await this.submitRepository.findRef(teamId)
        let REF;
        if (attendees === null) {
            // ref가 null인 경우
            REF = isRef.map((item) => {
                return item.userId;
            });
        } else if(attendees !== undefined && attendees !== null) {
            const attendeesId = attendees.map((item) => {
                return item.split('-')[1]
            })
            console.log('###########attendeesId##########', attendeesId)
            // ref가 undefined가 아니고, null이 아닌 경우.
            REF = attendeesId.concat(isRef.map((item) => {
                return item.userId;
            }));
        } else {
            // ref가 undefined인 경우
            REF = isRef.map((item) => {
                return item.userId;
            });
        }

        await this.submitRepository.reportModify({userId, Id, title, body, attendees: REF, fileLocation, fileName, start, end})
    }

    // 회의록 등록
    meetingReportSubmit = async({userId, meetingId, teamId, title, attendees, body, fileLocation, fileName, start, end}) => {
        
        const isRef = await this.submitRepository.findRef(teamId)
        let REF;
        if (attendees === null) {
            // ref가 null인 경우
            REF = isRef.map((item) => {
                return item.userId;
            });
        } else if(attendees !== undefined && attendees !== null) {
            const attendeesId = attendees.map((item) => {
                return item.split('-')[1]
            })
            console.log('###########attendeesId##########', attendeesId)
            // ref가 undefined가 아니고, null이 아닌 경우.
            REF = attendeesId.concat(isRef.map((item) => {
                return item.userId;
            }));
        } else {
            // ref가 undefined인 경우
            REF = isRef.map((item) => {
                return item.userId;
            });
        }

        await this.submitRepository.meetingReportSubmit({userId, meetingId, title, body, attendees: REF, fileLocation, fileName, start, end})
    }

    // 회의록 수정
    meetingReportModify = async({userId, Id, meetingId, teamId, title, attendees, body, fileLocation, fileName, start, end}) => {
        const meetingReport = await this.submitRepository.findOneMeetingReport(meetingId)
        if(!meetingReport) {
            throw new CustomError("해당 보고서가 존재하지 않습니다.", 401)
        }
        if(meetingReport.userId != userId) {
            throw new CustomError("보고서 수정 권한이 존재하지 않습니다.", 401)
        }
        const file = await this.submitRepository.findOneFile(Id)

        const bucketName = process.env.BUCKET_NAME
        let fileKey = [];
        if(file) {
            fileKey = file.map(file => {
                const key = file.fileLocation.split('/')[3]
                return key
            })
        }
        console.log("asdfdasfdsafdsa", fileKey)

        // 다중 파일 삭제
        const objectParams_del = {
            Bucket: bucketName,
            Delete: {
                Objects: fileKey.map(key => ({ Key: key }))
            }
        }

        await s3
        .deleteObjects(objectParams_del)
        .promise()
        .then((data) => {
            console.log('Delete Success! : ', data)
        })
        .catch((error) => {
            console.log(error)
        })

        const isRef = await this.submitRepository.findRef(teamId)
        let REF;
        if (attendees === null) {
            // ref가 null인 경우
            REF = isRef.map((item) => {
                return item.userId;
            });
        } else if(attendees !== undefined && attendees !== null) {
            const attendeesId = attendees.map((item) => {
                return item.split('-')[1]
            })
            console.log('###########attendeesId##########', attendeesId)
            // ref가 undefined가 아니고, null이 아닌 경우.
            REF = attendeesId.concat(isRef.map((item) => {
                return item.userId;
            }));
        } else {
            // ref가 undefined인 경우
            REF = isRef.map((item) => {
                return item.userId;
            });
        }

        await this.submitRepository.meetingReportModify({userId, Id, meetingId, title, body, attendees: REF, fileLocation, fileName, start, end})
    } 

    // 팀원 목록 조회
    teamUsersList = async(teamId) => {
        const findTeamUsers = await this.submitRepository.teamUsersList(teamId)
        console.log("-----------------",findTeamUsers)
        // const findTeamUsersName = findTeamUsers.map((item) => {
        //     return item.userName
        // })

        return findTeamUsers
    }
}

module.exports = SubmitService;
