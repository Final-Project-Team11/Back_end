const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware')

const MainPageController = require("../controllers/mainPage.controller");
const mainPageController = new MainPageController();

// 휴가 전체 조회
router.get('/totalVacation/:teamId', authMiddleware, mainPageController.findTotalVacation)

module.exports = router
