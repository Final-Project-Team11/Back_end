const express = require("express");
const router = express.Router();
const AuthRouter = require("../routes/auth.route.js")

router.use("/",AuthRouter)

module.exports = router;
