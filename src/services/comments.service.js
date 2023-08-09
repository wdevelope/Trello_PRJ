const CommentRepository = require("../repositories/comments.repositories");
const commentRepository = new CommentRepository();

class CommentService {
  async getComment() {
    const getCommentData = await commentRepository.getComments();

    if (getCommentData <= 0) {
      throw new Error("댓글이 존재하지 않습니다.");
    };

    return getCommentData.map((comment) => {
      return {
        id: comment.id,
        comment: comment.comment,
      };
    });
  };

  async createComment(id, comment) {

    if (comment.length <= 0) {
      throw new Error("댓글 내용을 입력해주세요.");
    };

    const createCommentData = await commentRepository.createComment(id, comment);

    return {
      userId: createCommentData.userId,
      comment: createCommentData.comment,
    };
  };

  async updateComment(commentId, id, comment) {
    const matchUser = await commentRepository.findCommentById(commentId);

    if (matchUser.userId !== id) {
      throw new Error("댓글 수정 권한이 없습니다.");
    };

    await commentRepository.updateComment(commentId, id, comment);

    const updatedCommentData = await commentRepository.findCommentById(commentId);

    return {
      id: updatedCommentData.id,
      comment: updatedCommentData.comment,
    };
  };
  //댓글삭제
  async deleteComment(commentId, id) {
    const matchUser = await commentRepository.findCommentById(commentId);

    if (matchUser.userId !== id) {
      throw new Error("댓글 삭제 권한이 없습니다.");
    };

    const deletedCommentData = await commentRepository.findCommentById(commentId);

    await commentRepository.deleteComment(commentId, id);

    return {
      id: deletedCommentData.id,
      comment: deletedCommentData.comment,
    };
  };
};

module.exports = CommentService;