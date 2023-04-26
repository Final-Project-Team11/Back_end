const { Users, Schedules, Mentions, Events, Sequelize, Files, Others } = require("../models");
class OtherManageRepository {

     // 기타 결제 상세 조회
    findOtherById = async ({ Id }) => {
        const other = await Events.findOne({
            where: { Id },
            attributes: [
                "Id",
                [Sequelize.col("User.userName"), "userName"],
                [Sequelize.col("Other.title"), "title"],
                [Sequelize.col("Other.body"), "body"],
                [Sequelize.col("Other.start"), "start"],
                [Sequelize.col("Other.end"), "end"],
                [Sequelize.col("Other.status"), "status"],
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
                    model: Others,
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
        return other
    };


    // 팀 기타 결제 
    findTeamOther = async ({ size, page, teamId }) => {
        page ? page : 1;
        const offset = (page - 1) * size;
        const teamOtherList = await Others.findAll({
            limit: size ? size : 10,
            offset: offset ? offset : 0,
            attributes: [
                "Id",
                "title",
                "status",
                [Sequelize.col("User.userName"), "userName"],
                [Sequelize.fn("date_format", Sequelize.col("Others.createdAt"), "%Y/%m/%d"), "enrollDay"],
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
        return await teamOtherList;
    };

}
module.exports = OtherManageRepository;
