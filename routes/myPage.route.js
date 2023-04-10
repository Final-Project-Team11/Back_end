const express = require("express");
const MypageController = require("../controllers/myPage.controller.js");
const mypagecontroller = new MypageController();

const CustomError = require("../middlewares/errorHandler");
const authmiddleware = require("../middlewares/auth-middleware.js");
const router = express.Router();

//투두리스트 전체 조회
//localhost:3003/feed
router.get("/feed", authmiddleware, mypagecontroller.getTodos);

//카테고리 생성
//localhost:3003/feed/category
router.post("/feed/category", authmiddleware, mypagecontroller.createCategory);

//투두리스트 생성
//localhost:3003/feed/category/{categoryId}/todo
router.post(
    "/feed/category/:categoryId/todo",
    authmiddleware,
    mypagecontroller.createTodo
);

//카테고리 삭제
//localhost:3003/feed/category/{categoryId}
router.delete(
    "/feed/category/:categoryId",
    authmiddleware,
    mypagecontroller.deleteCategory
);
//투두리스트 삭제
//localhost:3003/feed/todo/{todoId}
router.delete(
    "/feed/todo/:todoId",
    authmiddleware,
    mypagecontroller.deleteTodo
);

//투두리스트 체크
//localhost:3003/feed/todo/{todoId}
router.patch(
    "/feed/todo/:todoId",
    authmiddleware,
    mypagecontroller.completeTodo
);

//유저정보조회
//localhost:3003/usersInfo
router.get("/usersInfo", authmiddleware, mypagecontroller.getUserInfo);

//출장 조회
//localhost:3003/mySchedule
router.get("/mySchedule",authmiddleware,mypagecontroller.getSchedules)

module.exports = router;
