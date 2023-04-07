const { Users, Schedules, Sequelize } = require("../models");
class ScheduleManageRepository {
    // 팀 유저 스케줄 ( 출장만 ) , 기능 확장 가능성 있음
    findTeamSchedule = async ({ size, page, teamId }) => {
        page ? page : 1;
        const offset = (page - 1) * size;
        const teamScheduleList = await Schedules.findAll({
            limit: size ? size : 10,
            offset: offset ? offset : 0,
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
