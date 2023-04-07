const SignupRepository = require("../repositories/signup.repository.js");
const CustomError = require("../middlewares/errorHandler.js");
const { sequelize } = require("../models/index.js");
const { Transaction } = require("sequelize");
const bcrypt = require("bcrypt");

class SignupService {
    constructor() {
        this.SignupRepository = new SignupRepository();
        this.t = null;
    }
    async startTransaction() {
        this.t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
    }

    async commitTransaction() {
        await this.t.commit();
    }

    async rollbackTransaction() {
        await this.t.rollback();
    }

    existCompanyName = async ({ companyName }) => {
        const existCompany = await this.SignupRepository.findCompanyByName({
            companyName,
        });
        if (existCompany) {
            throw new CustomError("이미 등록된 회사입니다.", 401);
        }
    };
    existCompanyId = async ({ companyId }) => {
        const existCompanyId = await this.SignupRepository.findCompanyById({
            companyId,
        });
        if (existCompanyId) {
            throw new CustomError("이미 등록된 아이디입니다.", 401);
        }
    };
    companySignup = async ({
        companyName,
        address,
        ceoName,
        companyNum,
        ceoNum,
        teamName,
        companyId,
        userId,
        userName,
        password,
        remainDay,
        authLevel,
        job,
    }) => {
        await this.startTransaction();
        try {
            //사업자비밀번호 암호화
            bcrypt.hash(password, 10, async (err, encryptedPW) => {
                if (err) {
                    throw new CustomError("회원가입이 실패했습니다.", 412);
                } else {
                    //회사 생성
                    await this.SignupRepository.createCompany(
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
                    //팀생성
                    const team = await this.SignupRepository.createTeam(
                        {
                            teamName,
                            companyId,
                        },
                        { transaction: this.t }
                    );
                    //유저생성
                    await this.SignupRepository.createUser(
                        {
                            companyId,
                            teamId: team.teamId,
                            userId,
                            userName,
                            password: encryptedPW,
                            remainDay,
                            authLevel,
                            job,
                        },
                        { transaction: this.t }
                    );
                }
            });

            await this.commitTransaction();
        } catch (err) {
            if (err) {
                // rollback()을 호출하여 트랜잭션 전체를 롤백
                await this.rollbackTransaction();
                throw new CustomError(err.message, 400);
            }
        }
    };
}

module.exports = SignupService;
