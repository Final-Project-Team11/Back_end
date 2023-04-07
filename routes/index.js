const express = require("express");
const router = express.Router();
const UserRouter = require("../routes/signup.route.js");

router.use("/", [UserRouter]);

const submitRouter = require("./submit.route");

router.use("/", submitRouter);

module.exports = router;
