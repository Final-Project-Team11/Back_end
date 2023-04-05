const express = require("express");
const router = express.Router();
const UserRouter = require("../routes/user.route.js");

router.use("/", [UserRouter]);

module.exports = router;
