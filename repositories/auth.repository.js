const { Users, Teams, Companys } = require("../models");
class AuthRepository {
    constructor() {}
    findByCompanyId = async ({ companyId }) => {
        return await Users.findOne({
            where: {
                companyId,
                authLevel: 1,
            },
        });
    };
    findByUserId = async ({ userId }) => {
        return await Users.findOne({ where: { userId } });
    };

    findTeamById = async ({ user }) => {
        return await Teams.findOne({ where: { teamId: user.teamId } });
    };

    findCompanyById = async ({ companyId }) => {
        return await Companys.findOne({
            where: { companyId: companyId },
        });
    };
    updateUser = async ({ userId, password }) => {
        await Users.update({ password }, { where: { userId } });
    };
}

module.exports = AuthRepository;
