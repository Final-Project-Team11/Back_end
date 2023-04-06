const { Users, Companys, Teams, Sequelize } = require("../models");
const { Op } = require("sequelize");

class UserManageRepository {
    // 유저 검색
    findUserByName = async ({ userName, companyId }) => {
        console.log("레포", userName);
        const users = await Users.findAll({
            attributes: [
                "userId",
                "userName",
                "rank",
                "joinDay",
                "job",
                [Sequelize.col("Team.teamName"), "team"],
            ],
            where: {
                companyId,
                userName: {
                    [Op.like]: `%${userName}%`,
                },
            },
            include: [
                {
                    model: Teams,
                    attributes: [],
                },
            ],
        });
        return users;
    };
    // 회사 전체 유저 리스트
    findAllCompanyUser = async ({ companyId }) => {
        const companyUserList = await Users.findAll({
            raw: true,
            attributes: [
                "userId",
                "userName",
                "rank",
                "joinDay",
                "job",
                [Sequelize.col("Team.teamName"), "team"],
            ],
            where: {
                companyId,
            },
            include: [
                {
                    model: Teams,
                    attributes: [],
                },
            ],
        });
        return companyUserList;
    };

    // 아이디 중복 체크
    duplicateCheck = async (userId) => {
        const existUser = await Users.findOne({
            where: { userId },
        });
        return existUser;
    };
    // 팀 생성
    createTeam = async ({ team, companyId }) => {
        const newTeam = await Teams.create({
            teamName: team,
            companyId,
        });
        return newTeam;
    };
    // 팀 아이디 찾기
    findTeamId = async ({ team, companyId }) => {
        const existTeam = await Teams.findOne({
            where: {
                teamName: team,
                companyId,
            },
        });
        return existTeam;
    };
    // 유저 생성
    createUser = async ({
        teamId,
        authLevel,
        rank,
        userName,
        userId,
        joinDay,
        job,
        companyId,
        encryptPwd,
    }) => {
        await Users.create({
            teamId,
            authLevel,
            rank,
            userName,
            userId,
            password: encryptPwd,
            joinDay,
            job,
            companyId,
            salaryDay: 23,
        });
    };
}

module.exports = UserManageRepository;
