const { Users, Schedules, Mentions, Events, Sequelize, Files } = require("../models");
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
    findScheduleById = async ({ Id }) => {
        const schedule = await Events.findOne({
            where: { Id },
            attributes: [
                "Id",
                [Sequelize.col("User.userName"), "userName"],
                [Sequelize.col("Schedule.title"), "title"],
                [Sequelize.col("Schedule.body"), "body"],
                [Sequelize.col("Schedule.start"), "start"],
                [Sequelize.col("Schedule.end"), "end"],
                [Sequelize.col("Schedule.status"), "status"],
            ],
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Files,
                    where: { Id },
                    attributes: ["fileName", "fileLocation"],
                    required: false
                },
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
        console.log(schedule)
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
                "Id",
                "title",
                "status",
                [Sequelize.col("User.userName"), "userName"],
                [Sequelize.fn("date_format", Sequelize.col("Schedules.createdAt"), "%Y/%m/%d"), "enrollDay"],
                "createdAt", 
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                    where: {
                        teamId: teamId,
                    },
                },
                {
                    model: Events,
                    attributes: ["Id"],
                    required: true,
                    include: [
                        {
                            model: Files,
                            as: 'Files',
                            attributes: ['fileName',"fileLocation"]
                            
                        }
                    ]
                },
            ],
            order: [
                [
                    Sequelize.fn("FIELD", Sequelize.col("status"), "submit"),
                    "DESC",
                ],
                ["createdAt", "DESC"], // 수정된 부분
            ],
        });
        return await teamScheduleList;
    };

}
module.exports = ScheduleManageRepository;
