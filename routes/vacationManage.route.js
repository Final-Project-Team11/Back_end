const express = require("express");
const router = express.Router();
const VacationManageController = require("../controllers/vacationManage.controllers");
const managerMiddleware = require("../middlewares/managerMiddleware");
const authMiddleware = require("../middlewares/auth-middleware");
const vacationManageController = new VacationManageController();

// 팀 휴가 요청 전체조회
router.get("/", managerMiddleware, vacationManageController.vacationList);

// 휴가 상세 조회
router.get(
    "/:eventId",
    authMiddleware,
    vacationManageController.vacationDetail
);

module.exports = router;
