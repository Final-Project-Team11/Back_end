const { Users, Schedules, Sequelize } = require("../models");
class ScheduleManageRepository {
    // 팀 유저 스케줄 ( 출장만 ) , 기능 확장 가능성 있음
    findTeamSchedule = async ({ teamId }) => {
        const teamScheduleList = await Schedules.findAll({
            attributes: [
                "eventId",
                [Sequelize.col("User.userName"), "userName"],
                "title",
                "file",
                "startDay",
                "endDay",
                "status",
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                    where: {
                        teamId: teamId,
                    },
                },
            ],
        });
        return teamScheduleList;
    };
}
module.exports = ScheduleManageRepository;
