const express = require("express");
const authmiddleware = require("../middlewares/auth-middleware.js");
const { upload } = require('../middlewares/fileUpload');
const UserInfoController = require("../controllers/userInfo.controller.js")
const userinfocontroller = new UserInfoController();
const router = express.Router();

//유저정보조회
//localhost:3003/usersInfo
router.get("/", authmiddleware, userinfocontroller.getUserInfo);

//프로필 정보 업데이트
//localhost:3003/usersInfo/profile
router.patch("/profile", authmiddleware,upload.single('file'), userinfocontroller.updateProfile)

//프로필 정보 조회
//localhost:3003/usersInfo/profile
router.get("/profile", authmiddleware, userinfocontroller.getProfile)

module.exports = router;