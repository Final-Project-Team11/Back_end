const express = require("express");
const AuthController = require("../controllers/auth.controller.js")
const authcontroller = new AuthController();
const authMiddleware = require("../middlewares/auth-middleware.js")



const router = express.Router();

//대표자 로그인
//localhost:3003/adminlogin
router.post("/adminlogin",authcontroller.adminLogin )

//일반 유저 로그인
//localhost:3003/login
router.post("/login",authcontroller.userLogin )

//초기 비밀번호 변경
//localhost:3003/login/rePassword
router.post("/login/rePassword",authMiddleware, authcontroller.modifyPassword )


module.exports = router;