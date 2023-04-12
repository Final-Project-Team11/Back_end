const express = require("express");
const router = express.Router();
const scheduleManageRouter = require("./scheduleManage.route");
const vacationManageRouter = require("./vacationManage.route");
const userManageRouter = require("./userManage.route");
const AuthRouter = require("../routes/auth.route.js");
const UserRouter = require("../routes/signup.route.js");
const submitRouter = require("./submit.route");
const myPageRouter = require("./myPage.route.js");
const todoRouter = require("../routes/todo.route.js");

router.use("/", [UserRouter, AuthRouter, submitRouter, myPageRouter]);
router.use("/users", userManageRouter);
router.use("/schedule", scheduleManageRouter);
router.use("/vacation", vacationManageRouter);
router.use("/feed", todoRouter);

module.exports = router;
