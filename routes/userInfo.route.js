const express = require("express");
const authmiddleware = require("../middlewares/auth-middleware.js");
const UserInfoController = require("../controllers/userInfo.controller.js")
const userinfocontroller = new UserInfoController();
const router = express.Router();

//유저정보조회
//localhost:3003/usersInfo
router.get("/", authmiddleware, userinfocontroller.getUserInfo);

module.exports = router;