const { Companys, Users, Teams } = require("../models/index.js");
const { sequelize } = require("../models/index.js");
const { Transaction } = require("sequelize");

class SignupRepository {
    constructor() {
        this.t = null;
    }
    async startTransaction() {
        this.t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
    }

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
        await Companys.create(
            {
                companyId,
                companyName,
                companyNum,
                address,
                ceoName,
                ceoNum,
            },
            { transaction: this.t }
        );
    };
    createTeam = async ({ teamName, companyId }) => {
        return await Teams.create(
            {
                teamName,
                companyId,
            },
            { transaction: this.t }
        );
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
        await Users.create(
            {
                userId,
                teamId,
                userName,
                password,
                companyId,
                remainDay,
                authLevel,
                job,
            },
            { transaction: this.t }
        );
    };
}

module.exports = SignupRepository;
