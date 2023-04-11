const CommentService = require("../services/comment.service")
const CustomError = require("../middlewares/errorHandler");
const Joi = require("joi");

class CommentController{
    commentService = new CommentService()

    // 댓글 작성
    createComments = async(req, res, next) => {
        const {eventId} = req.params
        const {comment} = req.body
        const {userId} = res.locals.user


        const schema = Joi.object({
            comment: Joi.string().required().messages({
                "string.base": "comment 필드는 날짜로 이루어져야 합니다.",
                "string.empty": "댓글을 입력해 주세요.",
                "any.required": "이 필드는 필수입니다.",
            }),
        });

        const validate = schema.validate(
            {
                comment : comment
            },
            // 한 번에 모든 에러를 확인하고 싶으면 validate 시점에 동작을 제어할 수 있는 validate()의 세 번째 파라미터로 {abortEarly: false}를 설정하면 된다.
            { abortEarly: false }
        );

        if (validate.error) {
            throw new CustomError(validate.error.message, 401);
        } else {
            console.log("Valid input!");
        }

        try {
            await this.commentService.createComments(
                eventId,
                comment,
                userId
            )

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