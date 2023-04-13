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
            remainDay: user.remainDay,
            salaryDay: payDay,
        };
        return userInfo;
    };

    getUserSchedule = async ({ userId, start, pageSize }) => {
        return await this.MypageRepository.getUserSchedule({
            userId,
            start,
            pageSize,
        });
    };

    getMentionedSchedules = async ({ userId }) => {
        //멘션테이블에서 내 아이디가 들어있는 값 가져오기
        const schedule = await this.MypageRepository.getMention({
            userId,
            type: "Schedules",
        });
        //내가 언급된 스케줄 가져오기
        return await Promise.all(
            schedule.map(async (event) => {
                return await this.MypageRepository.getScheduleById({
                    eventId: event,
                    userId,
                });
            })
        );
    };

    getMentionedMeeting = async ({ userId }) => {
        //멘션테이블에서 내 아이디가 들어있는 값 가져오기
        const meeting = await this.MypageRepository.getMention({
            userId,
            type: "Meetings",
        });
        //내가 언급된 미팅 가져오기
        return await Promise.all(
            meeting.map(async (event) => {
                return await this.MypageRepository.getMeetingById({
                    eventId: event,
                    userId,
                });
            })
        );
    };

    getMentionedReport = async ({ userId }) => {
        //멘션테이블에서 내 아이디가 들어있는 값 가져오기
        const meeting = await this.MypageRepository.getMention({
            userId,
            type: "Reports",
        });
        //내가 언급된 미팅 가져오기
        return await Promise.all(
            meeting.map(async (event) => {
                return await this.MypageRepository.getReportById({
                    eventId: event,
                    userId,
                });
            })
        );
    };
    getMentionedOther = async ({ userId }) => {
        //멘션테이블에서 내 아이디가 들어있는 값 가져오기
        const meeting = await this.MypageRepository.getMention({
            userId,
            type: "Others",
        });
        //내가 언급된 미팅 가져오기
        return await Promise.all(
            meeting.map(async (event) => {
                return await this.MypageRepository.getOtherById({
                    eventId: event,
                    userId,
                });
            })
        );
    };
    getMentionedMeetingReports = async ({ userId }) => {
        //멘션테이블에서 내 아이디가 들어있는 값 가져오기
        const meeting = await this.MypageRepository.getMention({
            userId,
            type: "MeetingReports",
        });
        //내가 언급된 미팅 가져오기
        return await Promise.all(
            meeting.map(async (event) => {
                return await this.MypageRepository.getMeetingReportsById({
                    eventId: event,
                    userId,
                });
            })
        );
    };

    filterIssue = async ({
        schedule,
        meeting,
        report,
        meetingReport,
        other,
    }) => {
        const issue = schedule
            .concat(meeting, report, meetingReport, other)
            .sort((a, b) => b.eventId - a.eventId);

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
        console.log(existMention.isChecked)
        if (existMention.isChecked == false) {
            const check = true;
            return await this.MypageRepository.updateMention({ mentionId, check });
        }
    };

    getMyfile = async ({ userId }) => {
        return await this.MypageRepository.findMyfile({ userId });
    };
    TeamMeetingReport = async ({ userId }) => {
        //팀원의 배열
        const team = await this.MypageRepository.findTeam({ userId });
        return await this.MypageRepository.findTeamMeetingFile({ team });
    };
    TeamReport = async ({ userId }) => {
        //팀원의 배열
        const team = await this.MypageRepository.findTeam({ userId });
        return await this.MypageRepository.findTeamReportFile({ team });
    };
}

module.exports = MypageService;
