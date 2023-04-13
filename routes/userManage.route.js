const express = require("express");
const router = express.Router();
const UserManageController = require("../controllers/userManage.controller");
const managerMiddleware = require("../middlewares/managerMiddleware");
const authMiddleware = require("../middlewares/auth-middleware");
const userManageController = new UserManageController();

// 팀 드롭다운 목록
router.get("/teams", authMiddleware, userManageController.teamsList);
// 유저 생성
router.post("/", managerMiddleware, userManageController.createUser);
// 전체 유저 조회
router.get("/", managerMiddleware, userManageController.usersList);
// 유저 검색
router.get("/:userName", managerMiddleware, userManageController.searchUser);
// 유저 삭제
router.delete("/:userId", managerMiddleware, userManageController.deleteUser);
// 유저 수정
router.patch("/:userId", managerMiddleware, userManageController.updateUser);
module.exports = router;
