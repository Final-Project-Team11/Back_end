const { Users, Schedules, Mentions, Events, Sequelize, Files, Others } = require("../models");
class OtherManageRepository {

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
