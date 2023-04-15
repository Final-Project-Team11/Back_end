const Joi = require("joi");
const CustomError = require("../middlewares/errorHandler");
const UserManageService = require("../services/userManage.service");
// , , , , , job
const userCreateSchema = Joi.object({
    userId:Joi.string().pattern(/^[a-zA-Z0-9]{5,}$/).required().messages({
        "string.pattern.base": "문자열은 영문 대/소문자와 숫자만 포함 가능합니다.",
        "string.empty": "userId 필드는 비어 있을 수 없습니다.",
        "string.min": "문자열은 최소 5글자 이상이어야 합니다.",
        "any.required": "userId 필드는 필수입니다.",
    }),
    userName: Joi.string().required().messages({
        "string.base": "userName 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "userName 필드는 비어 있을 수 없습니다.",
        "any.required": "userName 필드는 필수입니다.",
    }),
    authLevel: Joi.number().required().messages({
        "number.base": "authLevel 필드는 숫자로 이루어져야 합니다.",
        "number.empty": "authLevel 필드는 비어 있을 수 없습니다.",
        "any.required": "authLevel 필드는 필수입니다.",
    }),
    team: Joi.string().required().messages({
        "string.base": "team 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "team 필드는 비어 있을 수 없습니다.",
        "any.required": "team 필드는 필수입니다.",
    }),
    joinDay: Joi.date().required().messages({
        "date.base": "joinDay 필드는 date형식으로 이루어져야 합니다.",
        "date.empty": "joinDay 필드는 비어 있을 수 없습니다.",
        "any.required": "joinDay 필드는 필수입니다.",
    }),
    job: Joi.string().required().messages({
        "string.base": "job 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "job 필드는 비어 있을 수 없습니다.",
        "any.required": "job 필드는 필수입니다.",
    }),
    rank: Joi.string().required().messages({
        "string.base": "rank 필드는 문자열로 이루어져야 합니다.",
    }),
    salaryDay: Joi.number().required().messages({
        "number.base": "salaryDay 필드는 숫자로 이루어져야 합니다.",
        "number.empty": "salaryDay 필드는 비어 있을 수 없습니다.",
        "any.required": "salaryDay 필드는 필수입니다.",
    })
})
const userUpdateSchema = Joi.object({
    authLevel: Joi.number().required().messages({
        "number.base": "authLevel 필드는 숫자로 이루어져야 합니다.",
        "number.empty": "authLevel 필드는 비어 있을 수 없습니다.",
        "any.required": "authLevel 필드는 필수입니다.",
    }),
    team: Joi.string().required().messages({
        "string.base": "team 필드는 문자열로 이루어져야 합니다.",
        "string.empty": "team 필드는 비어 있을 수 없습니다.",
        "any.required": "team 필드는 필수입니다.",
    }),
    rank: Joi.string().required().messages({
        "string.base": "rank 필드는 문자열로 이루어져야 합니다.",
    }),
})
const options = {
    abortEarly: false
};
class UserManageController {
    constructor() {
        this.userManageService = new UserManageService();
    }
    // 팀 목록
    teamsList = async (req, res, next) => {
        try {
            const userInfo = res.locals.user;
            console.log("유저인포", userInfo);
            const companyId = userInfo.companyId;
            const teams = await this.userManageService.findTeamsList({
                companyId,
            });
            res.status(200).json({ team: teams });
        } catch (err) {
            next(err);
        }
    };
    // 유저 수정
    updateUser = async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { team, authLevel, rank } = req.body;

            const userInfo = res.locals.user;
            const companyId = userInfo.companyId;
            try {
                await userUpdateSchema.validateAsync({ team, authLevel, rank}, options);
            } catch (err) {
                throw new CustomError(err.details[0].message, 401);
            }
            await this.userManageService.updateUser({
                userId,
                team,
                authLevel,
                rank,
                companyId,
            });
            res.status(200).json({
                message: "해당 유저의 정보가 수정되었습니다.",
            });
        } catch (err) {
            next(err);
        }
    };
    // 회사 유저 전체 리스트 , 부서별 유저 리스트
    // teamId 쿼리로 없을시 유저 전체, 쿼리 있을시 팀유저 조회
    usersList = async (req, res, next) => {
        try {
            const { teamId } = req.query
            const userInfo = res.locals.user;
            const companyId = userInfo.companyId;
            const usersList = await this.userManageService.companyUserList({
                companyId,
                teamId
            });

            res.status(200).json({ users: usersList });
        } catch (err) {
            next(err);
        }
    };
    //유저 삭제
    deleteUser = async (req, res, next) => {
        try {
            const { userId } = req.params;
            await this.userManageService.deleteUser({ userId });
            res.status(200).json({ message: "해당 유저가 삭제되었습니다." });
        } catch (err) {
            next(err);
        }
    };
    // 유저 검색
    searchUser = async (req, res, next) => {
        try {
            const { userName } = req.params;
            const userInfo = res.locals.user;
            const users = await this.userManageService.searchUser({
                userName,
                userInfo,
            });
            res.status(200).json({ users: users });
        } catch (err) {
            next(err);
        }
    };
    // 유저 생성
    createUser = async (req, res, next) => {
        try {
            const userInfo = res.locals.user;
            const { team, authLevel, rank, userName, userId, joinDay, job, salaryDay } =
                req.body;
            try {
                await userCreateSchema.validateAsync({ team, authLevel, rank, userName, userId, joinDay, job, salaryDay }, options);
            } catch (err) {
                throw new CustomError(err.details[0].message, 401);
            }
            await this.userManageService.createUser({
                team,
                authLevel,
                rank,
                userName,
                userId,
                joinDay,
                job,
                salaryDay,
                userInfo,
            });

            res.status(200).json({ message: "유저생성에 성공했습니다." });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = UserManageController;
