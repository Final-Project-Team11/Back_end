const express = require("express");
const router = express.Router();
const userManageRouter = require("./userManage.route");

router.use("/users", userManageRouter);
module.exports = router;
