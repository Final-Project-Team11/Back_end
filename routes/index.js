const express = require("express");
const router = express.Router();
const AuthRouter = require("../routes/auth.route.js")
const UserRouter = require("../routes/signup.route.js");
const submitRouter = require("./submit.route");


router.use("/", [UserRouter,AuthRouter,submitRouter]);

module.exports = router;
