const express = require("express");
const { Users, Teams, Companys } = require("../models");
const CustomError = require("../middlewares/errorhandler.js")
const jwt = require("jsonwebtoken");
const env = process.env
const router = express.Router();

//대표자 로그인
//localhost:3003/adminlogin
router.post("/adminlogin", async (req, res, next) => {
    try {
        const { companyId, password } = req.body;
        const user = await Users.findOne({ where: { companyId } })
        console.log(user)
        const team = await Teams.findOne({ where: { teamId: user.teamId } })
        if (user.userId !== companyId || user.password !== password) {
            throw new CustomError("아이디 혹은 비밀번호를 확인해주세요.", 401)
        }
        const token = jwt.sign({
            userId: user.userId,
            teamName: team.teamName,
            authLevel: user.authLevel
        }, env.SECRET_KEY);

        res.status(200).json({ "message": "로그인에 성공했습니다", "token": `Bearer ${token}` })
    } catch (err) {
        next(err)
    }
})

//일반 유저 로그인
//localhost:3003/login
router.post("/login", async (req, res, next) => {
    try {
        const { companyId, userId, password } = req.body;
        const user = await Users.findOne({ where: { userId } })
        const team = await Teams.findOne({ where: { teamId: user.teamId } })
        const company = await Companys.findOne({ where: { companyId: companyId } })

        if (user.userId !== userId || user.password !== password) {
            throw new CustomError("아이디 혹은 비밀번호를 확인해주세요.", 401)
        } else if (!company) {
            throw new CustomError("회사코드를 확인해주세요.", 401)
        }

        const token = jwt.sign({
            userId: user.userId,
            teamName: team.teamName,
            authLevel: user.authLevel
        }, env.SECRET_KEY);

        res.status(200).json({ "message": "로그인에 성공했습니다", "token": `Bearer ${token}` })

    } catch (err) {
        next(err)
    }
})

//초기 비밀번호 변경
//localhost:3003/login/rePassword
router.post("/login/rePassword", async (req, res, next) => {
    const { password } = req.body;
    try{
        await Users.update({ password },{where: { userId }})
        res.status(200).json({"message" : "비밀번호 변경에 성공했습니다"})
    }catch(err){
        next(err)
    }
})


module.exports = router;