const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware')

const CommentController = require("../controllers/comment.controller");
const commentController = new CommentController();

// 댓글 작성
router.post("/event/:eventId/comment", authMiddleware, commentController.createComments)

// 댓글 조회
router.get("/event/:eventId/comment", authMiddleware, commentController.findCommentAll)

// 댓글 삭제
router.delete("/event/:eventId/comment/:commentId", authMiddleware, commentController.deleteComment)

module.exports = router