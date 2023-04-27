const express = require("express");
const MypageController = require("../controllers/myPage.controller.js");
const mypagecontroller = new MypageController();

const authmiddleware = require("../middlewares/auth-middleware.js");
const router = express.Router();

//내 결재 조회
//localhost:3003/mySchedule
router.get("/mySchedule", authmiddleware, mypagecontroller.getSchedules);

//언급된 일정 조회
//localhost:3003/mentionedSchedule
router.get(
    "/mentionedSchedule",
    authmiddleware,
    mypagecontroller.getMentionedSchedules
);

//언급된 일정 확인후 상태 변경
//localhost:3003/mentionedSchedule/:mentionId
router.patch(
    "/mentionedSchedule/:mentionId",
    authmiddleware,
    mypagecontroller.completeMentioned
);

//나의 파일 목록 조회
//localhost:3003/myfiles
router.get("/myfiles", authmiddleware, mypagecontroller.getMyFiles);

//팀 회의록파일 조회
//localhost:3003/meetingfiles
router.get("/meetingfiles", authmiddleware, mypagecontroller.getMeetingFiles);

//팀 보고서 파일 조회
//localhost:3003/reportfiles
router.get("/reportfiles", authmiddleware, mypagecontroller.getReportFiles);

//나의 파일 상세조회
//localhost:3003/myfiles/:Id
router.get("/myfiles/:Id",authmiddleware,mypagecontroller.getDetailMyfile)

//팀 회의록 상세조회
//localhost:3003/meetingfiles/:Id
router.get(
    "/meetingfiles/:Id",
    authmiddleware,
    mypagecontroller.getDetailMeetingFile
);

//팀 보고서 상세조회
//localhost:3003/reportfiles/:Id
router.get(
    "/reportfiles/:Id",
    authmiddleware,
    mypagecontroller.getDetailReportFile
);

//휴가 진행 상황조회
//localhost:3003/vacationProgress
router.get("/vacationProgress",authmiddleware,mypagecontroller.getVacationProgress)

//일주일 팀 일정 조회
//localhost:3003/weeklySchedule
router.get("/weeklySchedule",authmiddleware,mypagecontroller.getWeeklySchedule)

module.exports = router;
