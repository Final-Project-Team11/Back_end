const express = require("express");
const router = express.Router();
const scheduleManageRouter = require("./scheduleManage.route");
const vacationManageRouter = require("./vacationManage.route");
const userManageRouter = require("./userManage.route");
const otherManageRouter = require('./othersManage.route')
const authRouter = require("../routes/auth.route");
const userRouter = require("../routes/signup.route");
const submitRouter = require("./submit.route");
const myPageRputer = require("./myPage.route.js")
const commentRouter = require('./comment.route')
const mainPageRouter = require('./mainPage.route')
const todoRouter = require("../routes/todo.route");
const userInfoRouter = require("../routes/userInfo.route")

router.use("/", [authRouter,submitRouter,myPageRputer,commentRouter,mainPageRouter]);
router.use("/members", userRouter);
router.use("/users", userManageRouter);
router.use("/schedule", scheduleManageRouter);
router.use("/vacation", vacationManageRouter);
router.use("/other",otherManageRouter)
router.use("/feed", todoRouter);
router.use("/usersInfo", userInfoRouter);
router.get("/health", (req, res) => {
    res.status(200).json("health Check")
})
module.exports = router;
