const AuthRepository = require("../repositories/auth.repository.js");
const CustomError = require("../middlewares/errorhandler.js");
const jwt = require("jsonwebtoken");
const env = process.env;
class AuthService {
    constructor() {
        this.AuthRepository = new AuthRepository();
    }
    checkIdPassword = async ({ companyId, password }) => {
        const user = await this.AuthRepository.findByCompanyId({ companyId });
        if (user.userId !== companyId || user.password !== password) {
            throw new CustomError("아이디 혹은 비밀번호를 확인해주세요.", 401);
        }
        return user;
    };
    adminLogin = async ({ user }) => {
        const team = await this.AuthRepository.findTeamById({ user });
        const token = jwt.sign(
            {
                userId: user.userId,
                companyId :user.companyId ,
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
                companyId : user.companyId,
                teamName: team.teamName,
                authLevel: user.authLevel,
            },
            env.SECRET_KEY
        );
        return token;
    };
    updateUser = async ({ userId, password }) => {
        await this.AuthRepository.updateUser({ userId, password });
    };
}
module.exports = AuthService;
