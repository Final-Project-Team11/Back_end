const CommentService = require("../services/comment.service")
const CustomError = require("../middlewares/errorHandler");
const {commentSchema} = require('../schemas/comment.shcema')
const Joi = require("joi");

class CommentController{
    commentService = new CommentService()

    // 댓글 작성
    createComments = async(req, res, next) => {
        const {eventId} = req.params
        const {comment} = req.body
        const {userId} = res.locals.user

        try {
            await commentSchema
            .validateAsync(req.body)
            .catch((err) => {
                throw new CustomError(err.message, 401)
            })

            await this.commentService.createComments({
                eventId: Number(eventId),
                comment,
                userId
            })

            res.status(200).send({ message : "댓글 작성이 성공적을 완료되었습니다."})
        }catch(err) {
            next(err)
        }
    }

    // 댓글 조회
    findCommentAll = async(req, res, next) => {
        try {
            const { eventId } = req.params
            const findCommentAll = await this.commentService.findCommentAll(eventId)
            res.status(200).json(findCommentAll)
        } catch (err) {
            next(err)
        }
    }

    // 댓글 삭제
    deleteComment = async(req, res, next) => {
        try {
            const {commentId} = req.params
            const deleteComment = await this.commentService.deleteComment(commentId)

            res.status(200).send({ message : "댓글 삭제에 성공하였습니다."})
        } catch (err) {
            
        }
    }
}

module.exports = CommentController