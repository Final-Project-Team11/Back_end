const {Comments, Users} = require('../models')

class CommentRepository{

    // 댓글 작성
    createComments = async({userId, eventId, comment}) => {
        await Comments.create({
            userId,
            eventId,
            comment
        })
    }

    // 댓글 조회
    findCommentAll = async(eventId) => {
        const findCommentAll = await Comments.findAll({
            raw: true,
            where: {eventId},
            attributes: [
                "commentId",
                "comment",
                "User.userName"
            ],
            include: [
                {
                    model: Users,
                    attributes : []
                }
            ]
        })
        
        return findCommentAll
    }

    // 댓글 삭제
    deleteComment = async(commentId) => {
        const deleteComment = await Comments.destroy({
            where : {commentId}
        })

        return deleteComment
    }

    findCommentOne = async(commentId) => {
        const findCommentOne = await Comments.findOne({
            where: {commentId}
        })

        return findCommentOne
    }
}

module.exports = CommentRepository