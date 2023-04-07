const express = require("express");
const router = express.Router();

const submitRouter = require("./submit.route");

router.use("/", submitRouter);

module.exports = router;
