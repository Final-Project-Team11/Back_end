const AuthRepository = require("../repositories/auth.repository.js");
const CustomError = require("../middlewares/errorHandler.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const env = process.env;

class AuthService {
    constructor() {
        this.AuthRepository = new AuthRepository();
    }
    checkIdPassword = async ({ companyId, password }) => {
        const user = await this.AuthRepository.findByCompanyId({ companyId });
        if (!user || user.userId !== companyId) {
            throw new CustomError("아이디 혹은 비밀번호를 확인해주세요.", 401);
        }
        const checkpassword = await bcrypt.compare(password, user.password);
        if (!checkpassword) {
            throw new CustomError("아이디 혹은 비밀번호를 확인해주세요.", 401);
        }
        return user;
    };
    checkUserIdPassword = async ({ userId, password }) => {
        const user = await this.AuthRepository.findByUserId({ userId });
        if (!user || user.userId !== userId) {
            throw new CustomError("아이디 혹은 비밀번호를 확인해주세요.", 401);
        }
        const checkpassword = await bcrypt.compare(password, user.password);
        if (!checkpassword) {
            throw new CustomError("아이디 혹은 비밀번호를 확인해주세요.", 401);
        }
        return user;
    };
    adminLogin = async ({ user }) => {
        const team = await this.AuthRepository.findTeamById({ user });
        const token = jwt.sign(
            {
                userId: user.userId,
                userName : user.userName,
                companyId: user.companyId,
                teamId : user.teamId,
                teamName: team.teamName,
                authLevel: user.authLevel,
            },
            env.SECRET_KEY
        );
        return token;
    };

    checkCompanyId = async ({ companyId }) => {
        const company = await this.AuthRepository.findCompanyById({
            companyId,
        });
        if (!company) {
            throw new CustomError("회사코드를 확인해주세요.", 401);
        }
    };
    userLogin = async ({ user, userId }) => {
        const team = await this.AuthRepository.findTeamById({ user });
        const token = jwt.sign(
            {
                userId,
                userName : user.userName,
                companyId: user.companyId,
                teamName: team.teamName,
                teamId : user.teamId,
                authLevel: user.authLevel,
            },
            env.SECRET_KEY
        );
        return token;
    };
    updateUser = async ({ userId, password }) => {
        bcrypt.hash(password, 10, async (err, encryptedPW) => {
            if (err) {
                throw new CustomError("회원가입이 실패했습니다.", 412);
            } else {
                await this.AuthRepository.updateUser({
                    userId,
                    password: encryptedPW,
                });
            }
        });
    };
}
module.exports = AuthService;
