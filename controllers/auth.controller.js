const AuthService = require("../services/auth.service.js");
const CustomError = require("../middlewares/errorHandler");
const {adminLoginSchema,userLoginSchema,modifySchema} = require("../schemas/auth.schema.js")
const Joi = require("joi");
class AuthController {
    constructor() {
        this.AuthService = new AuthService();
    }
    adminLogin = async (req, res, next) => {
        const { companyId, password } = req.body;
        try {
            await adminLoginSchema
            .validateAsync(req.body)
            .catch((err) => {
                throw new CustomError(err.message, 401)
            })
            //아이디패스워드 체크
            const user = await this.AuthService.checkIdPassword({
                companyId,
                password,
            });
            //토근생성
            const token = await this.AuthService.adminLogin({ user });
            res.status(200).json({
                message: "로그인에 성공했습니다",
                token: `Bearer ${token}`,
            });
        } catch (err) {
            next(err);
        }
    };

    userLogin = async (req, res, next) => {
        const { companyId, userId, password } = req.body;
        try {
            await userLoginSchema
            .validateAsync(req.body)
            .catch((err) => {
                throw new CustomError(err.message, 401)
            })
            //아이디 비밀번호 확인
            const user = await this.AuthService.checkUserIdPassword({
                userId,
                password,
            });
            //회사코드 확인
            await this.AuthService.checkCompanyId({ companyId });

            const token = await this.AuthService.userLogin({ user, userId });
            // res.cookie("authorization", `Bearer ${token}`); //개발단계에서 확인용
            res.status(200).json({
                message: "로그인에 성공했습니다",
                token: `Bearer ${token}`,
            });
        } catch (err) {
            next(err);
        }
    };

    modifyPassword = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { password } = req.body;
        try {
            await modifySchema
            .validateAsync(req.body)
            .catch((err) => {
                throw new CustomError(err.message, 401)
            })
            await this.AuthService.updateUser({ userId, password });
            res.status(200).json({ message: "비밀번호 변경에 성공했습니다" });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = AuthController;
