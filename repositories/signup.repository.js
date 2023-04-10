const { Companys, Users, Teams } = require("../models/index.js");
const { sequelize } = require("../models/index.js");
const { Transaction } = require("sequelize");
const CustomError = require("../middlewares/errorHandler");


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
    companySignup = async ({
        companyId,
        companyName,
        companyNum,
        address,
        ceoName,
        ceoNum,
        teamName,
        userId,
        userName,
        password,
        remainDay,
        authLevel,
        job,
    }) => {
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED, // 트랜잭션 격리 수준을 설정합니다.
        });

        try {
            //회사생성
            await Companys.create(
                {
                    companyId,
                    companyName,
                    companyNum,
                    address,
                    ceoName,
                    ceoNum,
                },
                { transaction: t }
            );

            //팀생성
            const team = await Teams.create(
                {
                    teamName,
                    companyId,
                },
                { transaction: t }
            );
            //유저생성
            await Users.create(
                {
                    userId,
                    teamId: team.teamId,
                    userName,
                    password,
                    companyId,
                    remainDay,
                    authLevel,
                    job,
                },
                { transaction: t }
            );
            await t.commit();
        } catch (err) {
            if (err) {
                // rollback()을 호출하여 트랜잭션 전체를 롤백
                await t.rollback();
                throw new CustomError(err.message, 400);
            }
        }
    };
}

module.exports = SignupRepository;
