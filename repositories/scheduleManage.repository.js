const { Users, Schedules, Mentions, Events, Sequelize } = require("../models");
class ScheduleManageRepository {

    // 출장 승인/반려
    updateScheduleStaus = async ({ eventId, status }) => {
        const result = await Schedules.update(
            {
            status: status,
            },
            {
            where: { eventId },  
            })
        return result
    }
    // 출장 상세 조회
    findScheduleById = async ({ eventId }) => {
        const schedule = await Events.findOne({
            where: { eventId },
            attributes: [
                "eventId",
                [Sequelize.col("User.userName"), "userName"],
                [Sequelize.col("Schedule.title"), "title"],
                [Sequelize.col("Schedule.content"), "content"],
                [Sequelize.col("Schedule.file"), "file"],
                [Sequelize.col("Schedule.startDay"), "startDay"],
                [Sequelize.col("Schedule.endDay"), "endDay"],
                [Sequelize.col("Schedule.status"), "status"],
            ],
            include: [
                {
                    model: Schedules,
                    attributes: [],
                },
                {
                    model: Users,
                    attributes: [],
                },
                {
                    model: Mentions,
                    required: true,
                    attributes: ["userId"],
                    include: [
                        {
                            model: Users,
                            attributes: ["userName"],
                        },
                    ],
                },
            ],
        });
        // console.log(schedule)
        return schedule
    };

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
