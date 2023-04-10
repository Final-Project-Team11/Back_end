const express = require("express");
const router = express.Router();
const ScheduleManageController = require("../controllers/scheduleManage.controllers");
const managerMiddleware = require("../middlewares/managerMiddleware");
const authMiddleware = require("../middlewares/auth-middleware");
const scheduleManageController = new ScheduleManageController();

// 팀 출장 요청 전체조회
router.get("/", managerMiddleware, scheduleManageController.scheduleList);
// 출장 상세 조회
router.get(
    "/:eventId",
    authMiddleware,
    scheduleManageController.scheduleDetail
);
// 출장 승인
router.put(
    "/:eventId/accept",
    managerMiddleware,
    scheduleManageController.scheduleAccept
);
module.exports = router;
