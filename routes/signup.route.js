const express = require("express");
const UserController = require("../controllers/signup.controller.js");
const usercontroller = new UserController();
const router = express.Router();

//사업자 회원가입 API
//localhost:3003/members
router.post("/", usercontroller.companySignup);

//사업자아이디 중복 검사
//localhost:3003/members/exists
router.post("/exists", usercontroller.checkId);

module.exports = router;
