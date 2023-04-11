const express = require("express");
const MypageController = require("../controllers/myPage.controller.js");
const mypagecontroller = new MypageController();

const authmiddleware = require("../middlewares/auth-middleware.js");
const router = express.Router();

//유저정보조회
//localhost:3003/usersInfo
router.get("/usersInfo", authmiddleware, mypagecontroller.getUserInfo);

//출장 조회
//localhost:3003/mySchedule
router.get("/mySchedule",authmiddleware,mypagecontroller.getSchedules)

//언급된 일정 조회
//localhost:3003/mentionedSchedule
router.get("/mentionedSchedule",authmiddleware,mypagecontroller.getMentionedSchedules)

//언급된 일정 확인후 상태 변경 

module.exports = router;
