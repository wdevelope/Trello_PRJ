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

  async createComment(id, comment) {
    const createCommentData = await Comment.create({
      userId: id,
      comment,
    });

    return createCommentData;
  };

  async updateComment(commentId, id, comment) {
    const updateCommentData = await Comment.update(
      { comment },
      { where: { id: commentId, userId: id } },
    );
    return updateCommentData;
  };

  async deleteComment(commentId, id) {
    const deleteCommentData = await Comment.destroy({ where: { id: commentId, userId: id } });

    return deleteCommentData;
  };
};

module.exports = CommentReopository;