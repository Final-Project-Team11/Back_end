const express = require("express");
const router = express.Router();
const OtherManageController = require("../controllers/otherManage.controller");
const managerMiddleware = require("../middlewares/managerMiddleware");
const authMiddleware = require("../middlewares/auth-middleware");
const otherManageController = new OtherManageController();

// 팀 기타 결제 요청 전체조회
router.get("/", managerMiddleware, otherManageController.otherList);

// 기타 결제 상세 조회
router.get(
    "/:Id",
    authMiddleware,
    otherManageController.otherDetail
);

module.exports = router;
