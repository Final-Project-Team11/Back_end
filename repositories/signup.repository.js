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
        return await sequelize.query(
            "SELECT * FROM Companys WHERE BINARY companyId = ? LIMIT 1",
            {
                replacements: [companyId],
                type: sequelize.QueryTypes.SELECT,
            }
        );
    };
    
    findCompanyByName = async ({ companyName }) => {
        return await sequelize.query(
            "SELECT * FROM Companys WHERE BINARY companyName = ? LIMIT 1",
            {
                replacements: [companyName],
                type: sequelize.QueryTypes.SELECT,
            }
        );
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
            const day = new Date()
            await Users.create(
                {
                    userId,
                    teamId: team.teamId,
                    userName,
                    password,
                    companyId,
                    remainDay,
                    salaryDay : 1,
                    rank : "CEO",
                    authLevel,
                    joinDay : day,
                    job,
                },
                { transaction: t }
            );
            await t.commit();
        } catch (transactionError) {
            // rollback()을 호출하여 트랜잭션 전체를 롤백
            console.log(transactionError);
            await t.rollback();
            throw new CustomError(
                "회원가입 중 예상치 못한 에러가 발생했습니다.",
                400
            );
        }
    };
}

module.exports = SignupRepository;
