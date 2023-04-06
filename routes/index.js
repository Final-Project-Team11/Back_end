const express = require("express");
const router = express.Router();
const UserRouter = require("../routes/signup.route.js");

router.use("/", [UserRouter]);

module.exports = router;
