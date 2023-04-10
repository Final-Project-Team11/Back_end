const express = require("express");
const router = express.Router();
const { upload } = require('../middlewares/fileUpload');
const authMiddleware = require('../middlewares/auth-middleware')

const SubmitController = require("../controllers/submit.controller");
const submitController = new SubmitController();

// 출장 신청
router.post("/schedule", authMiddleware, upload.single('file'), submitController.scheduleSubmit); // 단일파일이라면 single => 다중파일이라면 array 프론트에서는 multiple

// 휴가 신청
router.post('')

// 기타 신청
router.post('')

// 회의 신청
router.post('')

// 보고서 등록
router.post('')

// 회의록 등록
router.post('')

module.exports = router;
