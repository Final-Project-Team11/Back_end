const Joi = require("joi");
const CustomError = require("../middlewares/errorHandler");
const UserManageService = require("../services/userManage.service");

const userIdSchema = Joi.string()
    .pattern(/^[a-zA-Z0-9]{5,}$/)
    .required()
    .messages({
        "string.pattern.base":
        "문자열은 영문 대/소문자와 숫자만 포함 가능합니다.",
        "string.empty": "이 필드는 비어 있을 수 없습니다.",
        "string.min": "문자열은 최소 5글자 이상이어야 합니다.",
        "any.required": "이 필드는 필수입니다.",
    });

const options = {
    // 삭제할 부분
    abortEarly: false,
    messages: {
        "string.pattern.base":
        "문자열은 영문 대/소문자와 숫자만 포함 가능합니다.",
        "string.empty": "이 필드는 비어 있을 수 없습니다.",
        "string.min": "문자열은 최소 5글자 이상이어야 합니다.",
        "any.required": "이 필드는 필수입니다.",
    },
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
    // 회사 유저 전체 리스트
    usersList = async (req, res, next) => {
        try {
            const userInfo = res.locals.user;
            const companyId = userInfo.companyId;
            const usersList = await this.userManageService.companyUserList({
                companyId,
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
            const { team, authLevel, rank, userName, userId, joinDay, job } =
                req.body;
            try {
                await userIdSchema.validateAsync(userId, options);
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
                userInfo,
            });

            res.status(200).json({ message: "유저생성에 성공했습니다." });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = UserManageController;
