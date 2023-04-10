const express = require("express");
const router = express.Router();
const scheduleManageRouter = require("./scheduleManage.route");
const userManageRouter = require("./userManage.route");
const AuthRouter = require("../routes/auth.route.js");
const UserRouter = require("../routes/signup.route.js");
const submitRouter = require("./submit.route");
const myPageRputer = require("./myPage.route.js")

router.use("/", [UserRouter,AuthRouter,submitRouter,myPageRputer]);
router.use("/users", userManageRouter);
router.use("/schedule", scheduleManageRouter);
module.exports = router;
