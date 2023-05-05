const { Users, Teams, Companys } = require("../models");
class AuthRepository {
    constructor() { }
    findByCompanyId = async ({ companyId }) => {
        return await Users.findOne({
            where: {
                companyId,
                authLevel: 1,
            },
        });
    };
    findByUserId = async ({ userId }) => {
        return await Users.findOne({
            raw: true,
            attributes: ["userId", "userName", "password", "teamId", "authLevel"],
            where: { userId }
        });
    };

    findTeamById = async ({ user }) => {
        return await Teams.findOne({ where: { teamId: user.teamId } });
    };
    findTeam = async ({ teamId }) => {
        return await Teams.findOne({
            raw: true,
            attributes: ["teamName"],
            where: { teamId }
        });
    };

    findCompanyById = async ({ companyId }) => {
        return await Companys.findOne({
            raw: true,
            attributes: ["companyId", "companyName"],
            where: { companyId: companyId },
        });
    };
    updateUser = async ({ userId, password }) => {
        await Users.update({ password }, { where: { userId } });
    };
}

module.exports = AuthRepository;
