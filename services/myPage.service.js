const MypageRepository = require("../repositories/myPage.repository.js");
const CustomError = require("../middlewares/errorHandler");
const moment = require("moment");
class MypageService {
    constructor() {
        this.MypageRepository = new MypageRepository();
    }

    checkUserById = async ({ userId }) => {
        const user = await this.MypageRepository.findUserById({ userId });
        if (!user) {
            throw new CustomError("해당 유저가 존재하지 않습니다.", 401);
        } else if (user.userId !== userId) {
            throw new CustomError(
                "유저 정보에 대한 권한이 존재하지 않습니다.",
                401
            );
        }
        return user;
    };
    getUserInfo = async ({ user }) => {
        const userSalaryDay = user.salaryDay;
        const date = moment();
        let month, year;
        month = moment().format("MM");
        year = moment().format("YYYY");

        if (Number(date.format("MM")) === 12) {
            year = moment().add(1, "year").format("YYYY");
        }
        if (Number(date.format("DD")) > userSalaryDay) {
            month = moment().add(1, "month").format("MM");
        }

        const Dday = `${year}-${month}-${userSalaryDay}`;
        const Ddate = moment(Dday);

        const payDay = Ddate.diff(date, "days");

        const userInfo = {
            userName: user.userName,
            team: user.teamName,
            remainDay: user.remainDay,
            salaryDay: payDay,
            profileImg : user.profileImg
        };
        return userInfo;
    };

    getUserSchedule = async ({ userId }) => {
        //출장조회
        const schedule = await this.MypageRepository.getUserSchedule({
            userId,
        });
        //결제요청서 조회
        const other = await this.MypageRepository.getUserOther({
            userId
        })
        //배열 합치기
        let list =[]
        const result = list.concat(schedule,other).sort((a,b) => b.Id - a.Id)
        return result
            .filter((event) => event.status === "submit")
            .concat(
                result.filter(
                    (event) =>
                        event.status === "accept" || event.status === "deny"
                ).reverse()
            );
    };

    getMentionedSchedules = async ({ userId }) => {
        //멘션테이블에서 내 아이디가 들어있는 값 가져오기
        const schedule = await this.MypageRepository.getMention({
            userId,
            type: "2",
        });
        //내가 언급된 스케줄 가져오기
        return await Promise.all(
            schedule.map(async (event) => {
                return await this.MypageRepository.getScheduleById({
                    Id: event,
                    userId,
                });
            })
        );
    };

    getMentionedMeeting = async ({ userId }) => {
        //멘션테이블에서 내 아이디가 들어있는 값 가져오기
        const meeting = await this.MypageRepository.getMention({
            userId,
            type: "0",
        });

        //내가 언급된 미팅 가져오기
        return await Promise.all(
            meeting.map(async (event) => {
                return await this.MypageRepository.getMeetingById({
                    Id: event,
                    userId,
                });
            })
        );
    };
    getMentionedEvent = async ({ userId }) => {
        //멘션테이블에서 내 아이디가 들어있는 값 가져오기
        const meeting = await this.MypageRepository.getMention({
            userId,
            type: "1",
        });

        //내가 언급된 이벤트 가져오기
        return await Promise.all(
            meeting.map(async (event) => {
                return await this.MypageRepository.getMeetingById({
                    Id: event,
                    userId,
                });
            })
        );
    };

    getMentionedIssue = async ({ userId }) => {
        //멘션테이블에서 내 아이디가 들어있는 값 가져오기
        const meeting = await this.MypageRepository.getMention({
            userId,
            type: "3",
        });

        //내가 언급된 미팅 가져오기
        return await Promise.all(
            meeting.map(async (event) => {
                return await this.MypageRepository.getMeetingById({
                    Id: event,
                    userId,
                });
            })
        );
    };

    getMentionedReport = async ({ userId }) => {
        //멘션테이블에서 내 아이디가 들어있는 값 가져오기
        const report = await this.MypageRepository.getMention({
            userId,
            type: "6",
        });
        //내가 언급된 report 가져오기
        return await Promise.all(
            report.map(async (event) => {
                return await this.MypageRepository.getReportById({
                    Id: event,
                    userId,
                });
            })
        );
    };
    getMentionedOther = async ({ userId }) => {
        //멘션테이블에서 내 아이디가 들어있는 값 가져오기
        const other = await this.MypageRepository.getMention({
            userId,
            type: "7",
        });
        //내가 언급된 other 가져오기
        return await Promise.all(
            other.map(async (event) => {
                return await this.MypageRepository.getOtherById({
                    Id: event,
                    userId,
                });
            })
        );
    };
    getMentionedMeetingReports = async ({ userId }) => {
        //멘션테이블에서 내 아이디가 들어있는 값 가져오기
        const meetingreport = await this.MypageRepository.getMention({
            userId,
            type: "5",
        });
        //내가 언급된 meetingreport 가져오기
        return await Promise.all(
            meetingreport.map(async (event) => {
                return await this.MypageRepository.getMeetingReportsById({
                    Id: event,
                    userId,
                });
            })
        );
    };

    filterIssue = async ({
        schedule,
        meeting,
        issues,
        event,
        report,
        meetingReport,
        other,
    }) => {
        const issue = schedule
            .concat(meeting, issues,event, report, meetingReport, other)
            .sort((a, b) => b.Id - a.Id);
        return issue
            .filter((event) => event.isChecked == false)
            .concat(issue.filter((event) => event.isChecked == true).reverse());
    };

    checkMention = async ({ mentionId, userId }) => {
        const existMention = await this.MypageRepository.findMention({
            mentionId,
        });
        if (!existMention) {
            throw new CustomError("존재하지 않는 일정입니다.", 401);
        } else if (existMention.userId !== userId) {
            throw new CustomError("해당 일정에 권한이 존재하지 않습니다.", 401);
        }
        return existMention;
    };
    completeMentioned = async ({ existMention, mentionId }) => {
        if (existMention.isChecked == false) {
            const check = true;
            return await this.MypageRepository.updateMention({
                mentionId,
                check,
            });
        }
    };

    getMyfile = async ({ userId }) => {
        const meeting = await this.MypageRepository.findMyMeetingfile({
            userId,
        });
        const report = await this.MypageRepository.findMyReportfile({ userId });
        let result = [];
        return result.concat(meeting, report).sort((a, b) => b.Id - a.Id);
    };
    TeamMeetingReport = async ({ teamId }) => {
        //팀원의 배열
        const team = await this.MypageRepository.findTeam({ teamId });
        return await this.MypageRepository.findTeamMeetingFile({ team });
    };
    TeamReport = async ({ teamId }) => {
        //팀원의 배열
        const team = await this.MypageRepository.findTeam({ teamId });
        return await this.MypageRepository.findTeamReportFile({ team });
    };
    getUserId = async ({ userName }) => {
        return await this.MypageRepository.getUserId({ userName });
    };

    getDatailMyfile = async ({ Id }) => {
        const event = await this.MypageRepository.getcalendarId({ Id });
        
        return await this.MypageRepository.getDetailMyfile({
            Id,
            event,
        });
    };
    getDetailMeetingFile = async ({ Id }) => {
        return await this.MypageRepository.getDetailMeetingFile({ Id });
    };
    getDetailReportFile = async ({ Id }) => {
        return await this.MypageRepository.getDetailReportFile({ Id });
    };

    getVacationProgress = async({userId}) => {
        return await this.MypageRepository.getVacationProgress({userId})
    }
    
    getWeeklySchedule = async({teamId,year,month,day}) => {
        //팀에 해당하는 회의(0)
        const meeting = await this.MypageRepository.getWeeklyMeeting({teamId,year,month,day})
        //팀에 해당하는 기타일정(1)
        const other = await this.MypageRepository.getWeeklyOther({teamId,year,month,day})
        //팀에 해당하는 출장(2)
        const schedule = await this.MypageRepository.getWeeklySchedule({teamId,year,month,day})
        //팀에 해당하는 미팅(3)
        const issue = await this.MypageRepository.getWeeklyIssue({teamId,year,month,day})
        let result = []
        //스케쥴하나로 합쳐서 리턴
        const data = Object.assign({}, {meeting}, {other}, {schedule}, {issue});
        return data
    }
}

module.exports = MypageService;
