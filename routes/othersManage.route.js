const express = require("express");
const router = express.Router();
const OtherManageController = require("../controllers/otherManage.controller");
const managerMiddleware = require("../middlewares/managerMiddleware");
const authMiddleware = require("../middlewares/auth-middleware");
const otherManageController = new OtherManageController();

// 팀 출장 요청 전체조회
router.get("/", managerMiddleware, otherManageController.otherList);

module.exports = router;
