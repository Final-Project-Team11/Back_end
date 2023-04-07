const express = require("express");
const router = express.Router();
const ScheduleManageController = require("../controllers/scheduleManage.controllers");
const managerMiddleware = require("../middlewares/managerMiddleware");
const authMiddleware = require("../middlewares/auth-middleware");
const scheduleManageController = new ScheduleManageController();

router.get("/", managerMiddleware, scheduleManageController.scheduleList);
module.exports = router;
