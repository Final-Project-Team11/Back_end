const express = require("express");
const router = express.Router();
const { upload } = require('../middlewares/fileUpload');

const SubmitController = require("../controllers/submit.controller");
const submitController = new SubmitController();

// 유저 목록
router.get("/teamUsers",  submitController.findTeamUsers)

// 출장 신청
router.post("/schedule", upload.single('file'), submitController.scheduleSubmit); // 단일파일이라면 single => 다중파일이라면 array 프론트에서는 multiple

module.exports = router;
