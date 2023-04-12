const CustomError = require('../middlewares/errorHandler')
const CommentRepository = require('../repositories/comment.repository')
const {Users} = require('../models')

class CommentService {
    commentRepository = new CommentRepository()

    // 댓글 작성
    createComments = async({userId, eventId, comment}) => {
        await this.commentRepository.createComments({
            eventId,
            userId,
            comment
        })
    }

    // 댓글 조회
    findCommentAll = async(eventId) => {
        const findCommentAll = await this.commentRepository.findCommentAll(eventId)
        
        return findCommentAll
    }

    // 댓글 삭제
    deleteComment = async(commentId) => {
        const existComment = await this.commentRepository.findCommentOne(commentId)
        if(!existComment) {
            throw new CustomError("존재하지 않은 댓글입니다.", 400)
        }

        const deleteComment = await this.commentRepository.deleteComment(commentId)

        return deleteComment
    }
}

module.exports = CommentService