const Comment = require("../dataBase/models/comment.js");

class CommentReopository {
  async findCommentById(commentId) {
    const findCommentById = await Comment.findByPk(commentId);

    return findCommentById;
  };

  async getComments() {
    const getCommentsData = await Comment.findAll()

    return getCommentsData;
  };

  async createComment(comment) {
    const createCommentData = await Comment.create({
      comment,
    });

    return createCommentData;
  };

  async updateComment(commentId, comment) {
    const updateCommentData = await Comment.update(
      { comment },
      { where: { id: commentId } }
    );
    return updateCommentData;
  };

  async deleteComment(commentId) {
    const deleteCommentData = await Comment.destroy({ where: { id: commentId } });

    return deleteCommentData;
  };
};

module.exports = CommentReopository;