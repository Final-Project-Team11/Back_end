const express = require("express");
const router = express.Router();
const UserManageController = require("../controllers/userManage.controller");
const managermiddleware = require("../middlewares/managerMiddleware");
const userManageController = new UserManageController();

// 유저 생성
// 미들웨어 추가해야함.
router.post("/", managermiddleware, userManageController.createUser);

module.exports = router;
