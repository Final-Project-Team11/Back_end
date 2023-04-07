const AuthService = require("../services/auth.service.js");
const CustomError = require("../middlewares/errorHandler");
const Joi = require("joi");
class AuthController {
    constructor() {
        this.AuthService = new AuthService();
    }
    adminLogin = async (req, res, next) => {
        const { companyId, password } = req.body;
        //Joi
        const schema = Joi.object({
            companyId: Joi.string().required().messages({
                "string.base": "companyId 필드는 문자열로 이루어져야 합니다.",
                "string.empty": "아이디을 입력해 주세요.",
                "any.required": "필수입력값을 입력해주세요",
            }),
            password: Joi.string().required().messages({
                "string.base": "password 필드는 문자열로 이루어져야 합니다.",
                "string.empty": "비밀번호을 입력해 주세요.",
                "any.required": "필수입력값을 입력해주세요",
            }),
        });
        try {
            const validate = schema.validate({
                companyId: companyId,
                password: password,
            });

            if (validate.error) {
                throw new CustomError(validate.error.message, 401);
            } else {
                console.log("Valid input!");
            }
            //아이디패스워드 체크
            const user = await this.AuthService.checkIdPassword({
                companyId,
                password,
            });
            //토근생성
            const token = await this.AuthService.adminLogin({ user });
            res.cookie("authorization", `Bearer ${token}`); //개발단계에서 확인용
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
        //Joi
        const schema = Joi.object({
            companyId: Joi.string().required().messages({
                "string.base": "companyId 필드는 문자열로 이루어져야 합니다.",
                "string.empty": "회사 아이디를 입력해 주세요.",
                "any.required": "필수입력값을 입력해주세요",
            }),
            userId: Joi.string().required().messages({
                "string.base": "userId 필드는 문자열로 이루어져야 합니다.",
                "string.empty": "아이디를 입력해 주세요.",
                "any.required": "필수입력값을 입력해주세요",
            }),
            password: Joi.string().required().messages({
                "string.base": "pasword 필드는 문자열로 이루어져야 합니다.",
                "string.empty": "비밀번호를 입력해 주세요.",
                "any.required": "필수입력값을 입력해주세요",
            }),
        });
        try {
            const validate = schema.validate({
                companyId: companyId,
                userId: userId,
                password: password,
            });

            if (validate.error) {
                throw new CustomError(validate.error.message, 401);
            } else {
                console.log("Valid input!");
            }
            //아이디 비밀번호 확인
            const user = await this.AuthService.checkIdPassword({
                companyId: userId,
                password,
            });
            //회사코드 확인
            await this.AuthService.checkCompanyId({ companyId });

            const token = await this.AuthService.userLogin({ user, userId });
            res.cookie("authorization", `Bearer ${token}`); //개발단계에서 확인용
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
        //Joi
        const regex = /^[a-zA-Z0-9]{5,}$/;
        const schema = Joi.object({
            password: Joi.string().min(5).pattern(regex).required().messages({
                "string.base": "pasword 필드는 문자열로 이루어져야 합니다.",
                "string.pattern.base": "비밀번호는 영문 대/소문자와 숫자만 포함 가능합니다.",
                "string.min": "비밀번호는 최소 5글자여야 합니다.",
                "string.empty": "비밀번호를 입력해 주세요.",
                "any.required": "필수입력값을 입력해주세요",
            }),
        });
        try {
            const validate = schema.validate({
                password: password,
            });

            if (validate.error) {
                throw new CustomError(validate.error.message, 401);
            } else {
                console.log("Valid input!");
            }
            await this.AuthService.updateUser({ userId, password });
            res.status(200).json({ message: "비밀번호 변경에 성공했습니다" });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = AuthController;
