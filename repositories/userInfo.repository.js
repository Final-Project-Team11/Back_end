const {Users,Teams,Sequelize} = require("../models")
class UserInfoRepository {
    constructor(){}

    findUserById = async ({ userId }) => {
        return await Users.findOne({
            raw: true,
            where: { userId },
            attributes: [
                "userId",
                "userName",
                "Team.teamName",
                "remainDay",
                "salaryDay",
                "profileImg"
            ],
            include: [
                {
                    model: Teams,
                    attributes: [],
                },
            ],
        });
    };

    updateProfile = async({userId,birthDay, phoneNum,fileLocation}) => {
        await Users.update(
            {
                birthDay : birthDay,
                phoneNum : phoneNum,
                profileImg : fileLocation
            },
            {
                where : {userId}
            }
        )
    }

    getProfile = async({userId}) => {
        return await Users.findOne({
            raw : true,
            where : {userId},
            attributes : [
                "userId",
                "userName",
                "profileImg",
                [
                    Sequelize.fn(
                        "date_format",
                        Sequelize.col("birthDay"),
                        "%Y/%m/%d"
                    ),
                    "birthDay",
                ],
                "phoneNum"
            ]
        })
    }
}

module.exports=UserInfoRepository;