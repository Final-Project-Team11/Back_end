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
    "/:Id",
    authMiddleware,
    vacationManageController.vacationDetail
);
// 휴가 승인
router.put(
    "/:Id/accept",
    managerMiddleware,
    vacationManageController.vacationAccept
);
// 휴가 반려
router.put(
    "/Id/deny",
    managerMiddleware,
    vacationManageController.vacationDeny
);
module.exports = router;
