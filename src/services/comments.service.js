const CommentRepository = require("../repositories/comments.repositories");
const commentRepository = new CommentRepository();

class CommentService {
  async getComment() {
    const getCommentData = await commentRepository.getComments();

    if (!getCommentData) {
      throw new Error("댓글이 존재하지 않습니다.");
    };

    return getCommentData.map((comment) => {
      return {
        id: comment.id,
        comment: comment.comment,
      };
    });
  };

  async createComment(comment) {
    if (comment.length <= 0) {
      throw new Error("댓글 내용을 입력해주세요.")
    };

    const createCommentData = await commentRepository.createComment(comment);

    return {
      comment: createCommentData.comment,
    };
  };

  async updateComment(commentId, comment) {
    await commentRepository.updateComment(commentId, comment);

    const updatedCommentData = await commentRepository.findCommentById(commentId);
    
    return {
      id: updatedCommentData.id,
      comment: updatedCommentData.comment,
    };
  };

  async deleteComment(commentId) {
    const deletedCommentData = await commentRepository.findCommentById(commentId);

    await commentRepository.deleteComment(commentId);

    return {
      id: deletedCommentData.id,
      comment: deletedCommentData.comment,
    };
  };
};

module.exports = CommentService;