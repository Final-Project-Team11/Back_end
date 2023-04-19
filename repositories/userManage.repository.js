const { Users, Companys, Teams, Sequelize } = require("../models");
const { Op } = require("sequelize");
const { boolean } = require("joi");

class UserManageRepository {
    //유저 수정
    updateUser = async ({ userId, teamId, job, authLevel, rank }) => {
        await Users.update(
            {
                teamId,
                authLevel,
                rank,
                job
            },
            {
                where: { userId },
            }
        );
    };
    // 유저 삭제
    deleteUser = async (existUser) => {
        console.log(existUser);
        await existUser.destroy();
    };
    
    // 유저 검색
    findUserByName = async ({ userName, companyId }) => {
        console.log("레포", userName);
        const users = await Users.findAll({
            attributes: [
                "userId",
                "userName",
                "rank",
                [Sequelize.fn("date_format",Sequelize.col("joinDay"),"%Y/%m/%d"),"joinDay"],
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
    // 회사 팀 리스트
    // 들어오는 인자에 따라 다른값 리턴
    findTeamsByCompanyId = async ({ companyId, team }) => {
        const where = { companyId };
        if (team) {
            where.teamName = team;
        }
        const teams = await Teams.findAll({
            raw:true,
            where: where,
            attributes: ["teamId", ["teamName", "team"]],
        });
        return teams;
    };
    // 회사 전체 유저 리스트, 부서별 유저 조회
    findAllCompanyUser = async ({ companyId, teamId }) => {
        const where = { companyId };
        
        // teamId 가 있을 경우에만 where 객체에 teamId 속성 추가
        if (teamId) {
            where.teamId = teamId;
        }
        const companyUserList = await Users.findAll({
            raw: true,
            attributes: [
                "userId",
                "userName",
                "rank",
                [Sequelize.fn("date_format",Sequelize.col("joinDay"),"%Y/%m/%d"),"joinDay"],
                "job",
                [Sequelize.col("Team.teamName"), "team"],
            ],
            where: where,
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
    findUserById = async (userId) => {
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
        salaryDay,
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
            salaryDay,
        });
    };
}

module.exports = UserManageRepository;
