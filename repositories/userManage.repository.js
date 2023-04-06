const { Users, Companys, Teams } = require("../models");

class UserManageRepository {
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
        return newTeam.dataValues;
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
    }) => {
        await Users.create({
            teamId,
            authLevel,
            rank,
            userName,
            userId,
            password: userId,
            joinDay,
            job,
            companyId,
            salaryDay: 23,
        });
    };
}

module.exports = UserManageRepository;
