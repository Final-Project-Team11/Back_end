const express = require("express");
const router = express.Router();

const userManageRouter = require("./userManage.route");
const AuthRouter = require("../routes/auth.route.js");
const UserRouter = require("../routes/signup.route.js");
const submitRouter = require("./submit.route");

router.use("/", [UserRouter, AuthRouter, submitRouter]);
router.use("/users", userManageRouter);

module.exports = router;
