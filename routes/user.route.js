const express = require("express");
const { Companys, Users, Teams, sequelize } = require("../models");
const CustomError = require("../middlewares/errorhandler.js")
const { Transaction } = require("sequelize");
const router = express.Router();

//사업자 회원가입 API
//localhost:3003/signUp
router.post('/signUp', async (req, res, next) => {
    const t = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED, // 트랜잭션 격리 수준을 설정합니다.
    });
    try {
        const { companyName, address, ceoName, companyNum, ceoNum, companyId, password } = req.body;
        const existCompany = await Companys.findOne({ where: { companyName: companyName } });
        const existCompanyId = await Companys.findOne({ where: { companyId: companyId } });

        if (existCompany) {
            throw new CustomError("이미 등록된 회사입니다.", 401);
        } else if (existCompanyId) {
            throw new CustomError("이미 등록된 아이디입니다.", 401);
        }
        await Companys.create({
            companyId,
            companyName,
            companyNum,
            address,
            ceoName,
            ceoNum
        },
            { transaction: t })
        await Teams.create({
            teamName: "CEO",
            companyId
        },
            { transaction: t })
        await Users.create({
            userId: companyId,
            userName: ceoName,
            password: password,
            companyId: companyId,
            teamId: "CEO",
            remainDay: 15,
            authLevel: 1,
            job: "CEO"
        },
            { transaction: t })

        await t.commit();
        return res.status(200).json({ message: "회원가입에 성공하였습니다." })
    } catch (err) {
        await t.rollback();
        next(err)
    }
})

//사업자아이디 중복 검사
//localhost:3003/idCheck
router.post("/idCheck", async (req, res, next) => {
    try {
        const { companyId } = req.body;
        const existCompanyId = await Companys.findOne({ where: { companyId: companyId } });
        if (existCompanyId) {
            throw new CustomError("이미 등록된 아이디입니다.", 401);
        } else {
            return res.status(200).json({ message: "아이디 중복 검사에 성공했습니다" })
        }
    } catch (err) {
        next(err)
    }
})


module.exports = router;