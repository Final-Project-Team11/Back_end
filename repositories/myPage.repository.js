const { CategoryTodos, Todos, Users, Schedules } = require("../models");
class MypageRepository {
    constructor(){}

    findUserById = async ({ userId }) => {
        return await Users.findOne({ where: { userId } });
    }
    getUserSchedule = async ({ userId }) => {
        return await Schedules.findAll({
            raw: true,
            where : {userId},
            attributes: ['eventId',"User.userName", "title", "file", "startDay", "endDay","status"],
            order: [['createdAt', 'DESC']],
            include: [{
                model: Users,
                attributes: []
            }]
        })
    }
}

module.exports = MypageRepository;