const express = require("express");
const router = express.Router();
const UserManageController = require("../controllers/userManage.controller");
const managermiddleware = require("../middlewares/managerMiddleware");
const userManageController = new UserManageController();

// 유저 생성
router.post("/", managermiddleware, userManageController.createUser);
// 전체 유저 조회
router.get("/", managermiddleware, userManageController.usersList);
// 유저 검색
router.get("/:userName", managermiddleware, userManageController.searchUser);
// 유저 삭제
router.delete("/:userId", managermiddleware, userManageController.deleteUser);
// 유저 수정
router.patch("/:userId", managermiddleware, userManageController.updateUser);

module.exports = router;
