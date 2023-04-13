const express = require("express");
const router = express.Router();
const scheduleManageRouter = require("./scheduleManage.route");
const vacationManageRouter = require("./vacationManage.route");
const userManageRouter = require("./userManage.route");
const AuthRouter = require("../routes/auth.route");
const UserRouter = require("../routes/signup.route");
const submitRouter = require("./submit.route");
const todoRouter = require("../routes/todo.route");
const myPageRouter = require("./myPage.route");
const commentRouter = require("./comment.route");


router.use("/", [
    UserRouter,
    AuthRouter,
    submitRouter,
    myPageRouter,
    commentRouter,
]);
router.use("/users", userManageRouter);
router.use("/schedule", scheduleManageRouter);
router.use("/vacation", vacationManageRouter);
router.use("/feed", todoRouter);

module.exports = router;
