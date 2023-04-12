const express = require("express");
const router = express.Router();
const scheduleManageRouter = require("./scheduleManage.route");
const vacationManageRouter = require("./vacationManage.route");
const userManageRouter = require("./userManage.route");
const AuthRouter = require("../routes/auth.route.js");
const UserRouter = require("../routes/signup.route.js");
const submitRouter = require("./submit.route");
const myPageRputer = require("./myPage.route.js")
const commentRouter = require('./comment.route')
const mainPageRouter = require('./mainPage.route')

router.use("/", [UserRouter,AuthRouter,submitRouter,myPageRputer,commentRouter,mainPageRouter]);
router.use("/users", userManageRouter);
router.use("/schedule", scheduleManageRouter);
router.use("/vacation", vacationManageRouter);
// router.use("/feed", todoRouter);

module.exports = router;
