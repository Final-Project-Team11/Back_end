const SubmitRepository = require("../repositories/submit.repository");
const CustomError = require("../middlewares/errorHandler");
const aws = require('aws-sdk');
const s3 = new aws.S3();
require('dotenv').config()

class SubmitService {
    submitRepository = new SubmitRepository();

    // 출장 신청
    scheduleSubmit =  async({userId, teamId, startDay, endDay, title, ref, location, content, file}) => {
        const isRef = await this.submitRepository.findRef(teamId)

        let REF;
        if (ref === null) {
            // ref가 null인 경우
            REF = isRef.map((item) => {
                return item.userName;
            });
        } else if(ref !== undefined && ref !== null) {
            // ref가 undefined가 아니고, null이 아닌 경우.
            REF = ref.concat(isRef.map((item) => {
                return item.userName;
            }));
        } else {
            // ref가 undefined인 경우
            REF = isRef.map((item) => {
                return item.userName;
            });
        }
        // console.log(REF)
        
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

    // 일정 수정
    scheduleModify = async({userId, eventId, teamId, startDay, endDay, title, ref, location, content, file}) => {
        const schedule = await this.submitRepository.findOneSchedule(eventId)
        // console.log("aaaaaaaaaa", schedule)
        if(!schedule) {
            throw new CustomError("해당 일정이 존재하지 않습니다.", 401)
        }
        if(schedule.userId != userId) {
            throw new CustomError("수정 권한이 존재하지 않습니다.", 401)
        }
        const bucketName = process.env.BUCKET_NAME
        const fileKey = schedule.file.split('/')[3]

        // 단일 파일 삭제
        const objectParams_del = {
            Bucket: bucketName,
            Key: `${fileKey}`
        }

        await s3
        .deleteObject(objectParams_del)
        .promise()
        .then((data) => {
            console.log('Delete Success! : ', data)
        })
        .catch((error) => {
            console.log(error)
        })

        const isRef = await this.submitRepository.findRef(teamId)
        
        let REF;
        if (ref === null) {
            // ref가 null인 경우
            REF = isRef.map((item) => {
                return item.userName;
            });
        } else if(ref !== undefined && ref !== null) {
            // ref가 undefined가 아니고, null이 아닌 경우.
            REF = ref.concat(isRef.map((item) => {
                return item.userName;
            }));
        } else {
            // ref가 undefined인 경우
            REF = isRef.map((item) => {
                return item.userName;
            });
        }

        const createScheduleSubmit = await this.submitRepository.scheduleModify(
            {
                userId,
                eventId,
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

        const createVacationSubmit = await this.submitRepository.vacationSubmit({userId, startDay, endDay, typeDetail})

        return createVacationSubmit
    }

    // 기타 신청
    otherSubmit = async({userId, teamId, startDay, endDay, title, ref, content, file}) => {
        const isRef = await this.submitRepository.findRef(teamId)
        
        let REF;
        if (ref === null) {
            // ref가 null인 경우
            REF = isRef.map((item) => {
                return item.userName;
            });
        } else if(ref !== undefined && ref !== null) {
            // ref가 undefined가 아니고, null이 아닌 경우.
            REF = ref.concat(isRef.map((item) => {
                return item.userName;
            }));
        } else {
            // ref가 undefined인 경우
            REF = isRef.map((item) => {
                return item.userName;
            });
        }

        const createOtherSubmit = await this.submitRepository.otherSubmit({userId, startDay, endDay, title, ref:REF, content, file})

        return createOtherSubmit
    }

    // 회의 신청
    meetingSubmit = async({userId, teamId, eventType, startDay, startTime, title, ref, location, content, file}) => {
        // console.log("service",typeof userId)
        const isRef = await this.submitRepository.findRef(teamId)
        let REF;
        if (ref === null) {
            // ref가 null인 경우
            REF = isRef.map((item) => {
                return item.userName;
            });
        } else if(ref !== undefined && ref !== null) {
            // ref가 undefined가 아니고, null이 아닌 경우.
            REF = ref.concat(isRef.map((item) => {
                return item.userName;
            }));
        } else {
            // ref가 undefined인 경우
            REF = isRef.map((item) => {
                return item.userName;
            });
        }

        const createMeetingSubmit = await this.submitRepository.meetingSubmit({userId, eventType, startDay, startTime, title, ref:REF, location, content, file})

        return createMeetingSubmit
    }

    // 보고서 등록
    reportSubmit = async({userId, teamId, title, content, ref, file}) => {
        const isRef = await this.submitRepository.findRef(teamId)
        
        let REF;
        if (ref === null) {
            // ref가 null인 경우
            REF = isRef.map((item) => {
                return item.userName;
            });
        } else if(ref !== undefined && ref !== null) {
            // ref가 undefined가 아니고, null이 아닌 경우.
            REF = ref.concat(isRef.map((item) => {
                return item.userName;
            }));
        } else {
            // ref가 undefined인 경우
            REF = isRef.map((item) => {
                return item.userName;
            });
        }

        await this.submitRepository.reportSubmit({userId, title, content, ref: REF, file})
    }

    // 보고서 수정
    reportModify = async({userId, eventId, teamId, title, content, ref, file}) => {
        const report = await this.submitRepository.findOneReport(eventId)

        const bucketName = process.env.BUCKET_NAME
        const fileKey = report.file.split('/')[3]

        // 단일 파일 삭제
        const objectParams_del = {
            Bucket: bucketName,
            Key: `${fileKey}`
        }

        await s3
        .deleteObject(objectParams_del)
        .promise()
        .then((data) => {
            console.log('Delete Success! : ', data)
        })
        .catch((error) => {
            console.log(error)
        })

        const isRef = await this.submitRepository.findRef(teamId)
        let REF;
        if (ref === null) {
            // ref가 null인 경우
            REF = isRef.map((item) => {
                return item.userName;
            });
        } else if(ref !== undefined && ref !== null) {
            // ref가 undefined가 아니고, null이 아닌 경우.
            REF = ref.concat(isRef.map((item) => {
                return item.userName;
            }));
        } else {
            // ref가 undefined인 경우
            REF = isRef.map((item) => {
                return item.userName;
            });
        }

        await this.submitRepository.reportModify({userId, eventId, title, content, ref: REF, file})
    }

    // 회의록 등록
    meetingReportSubmit = async({userId, meetingId, teamId, title, ref, content, file}) => {
        
        const isRef = await this.submitRepository.findRef(teamId)
        
        let REF;
        if (ref === null) {
            // ref가 null인 경우
            REF = isRef.map((item) => {
                return item.userName;
            });
        } else if(ref !== undefined && ref !== null) {
            // ref가 undefined가 아니고, null이 아닌 경우.
            REF = ref.concat(isRef.map((item) => {
                return item.userName;
            }));
        } else {
            // ref가 undefined인 경우
            REF = isRef.map((item) => {
                return item.userName;
            });
        }

        await this.submitRepository.meetingReportSubmit({userId, meetingId, title, content, ref: REF, file})
    }

    // 회의록 수정
    meetingReportModify = async({userId, meetingId, teamId, title, ref, content, file}) => {
        const meetingReport = await this.submitRepository.findOneMeetingReport(meetingId)

        const bucketName = process.env.BUCKET_NAME
        const fileKey = meetingReport.file.split('/')[3]

        // 단일 파일 삭제
        const objectParams_del = {
            Bucket: bucketName,
            Key: `${fileKey}`
        }

        await s3
        .deleteObject(objectParams_del)
        .promise()
        .then((data) => {
            console.log('Delete Success! : ', data)
        })
        .catch((error) => {
            console.log(error)
        })

        const isRef = await this.submitRepository.findRef(teamId)
        
        let REF;
        if (ref === null) {
            // ref가 null인 경우
            REF = isRef.map((item) => {
                return item.userName;
            });
        } else if(ref !== undefined && ref !== null) {
            // ref가 undefined가 아니고, null이 아닌 경우.
            REF = ref.concat(isRef.map((item) => {
                return item.userName;
            }));
        } else {
            // ref가 undefined인 경우
            REF = isRef.map((item) => {
                return item.userName;
            });
        }

        await this.submitRepository.meetingReportModify({userId, eventId: meetingReport.eventId, meetingId, title, content, ref: REF, file})
    } 

    // 팀원 목록 조회
    teamUsersList = async(teamId) => {
        const findTeamUsers = await this.submitRepository.teamUsersList(teamId)
        console.log("-----------------",findTeamUsers)
        const findTeamUsersName = findTeamUsers.map((item) => {
            return item.userName
        })


        return findTeamUsersName
    }
}

module.exports = SubmitService;
