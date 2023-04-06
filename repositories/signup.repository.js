const { Companys, Users, Teams} = require("../models/index.js");
class SignupRepository {
    constructor() {}
    findCompanyById = async ({ companyId }) => {
        return await Companys.findOne({
            where: { companyId: companyId },
        });
    };
    findCompanyByName = async ({ companyName }) => {
        return await Companys.findOne({
            where: { companyName: companyName },
        });
    };
    createCompany = async ({
        companyId,
        companyName,
        companyNum,
        address,
        ceoName,
        ceoNum,
    }) => {
        await Companys.create({
            companyId,
            companyName,
            companyNum,
            address,
            ceoName,
            ceoNum,
        },{ transaction: t });
    };
    createTeam = async ({ teamName, companyId }) => {
        return await Teams.create({
            teamName,
            companyId,
        },{ transaction: t });
    };
    createUser = async ({
        companyId,
        teamId,
        userId,
        userName,
        password,
        remainDay,
        authLevel,
        job,
    }) => {
        await Users.create({
            userId,
            teamId,
            userName,
            password,
            companyId,
            remainDay,
            authLevel,
            job,
        },{ transaction: t });
    };
}

module.exports = SignupRepository;
