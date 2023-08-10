const { comment } = require("../dataBase/models");
const CommentRepository = require("../repositories/comments.repositories");
const commentRepository = new CommentRepository();
const CardRepository = require("../repositories/cards.repositories");
const cardRepository = new CardRepository();

class CommentService {
  async getComment() {
    const getCommentData = await commentRepository.getComments();

    if (getCommentData <= 0) {
      throw new Error("NotFoundComments");
    };
    try {
      return getCommentData.map((comment) => {
        return {
          id: comment.id,
          comment: comment.comment,
        };
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error");
    };
  };

  async createComment(id, cardId, comment) {
    const existCard = await cardRepository.findCardById(cardId);
    if (!existCard) {
      throw new Error("NotFoundCard");
    };

    if (comment.length <= 0) {
      throw new Error("Empty");
    };
    try {
      const createCommentData = await commentRepository.createComment(id, cardId, comment);

      return {
        userId: createCommentData.userId,
        cardId: createCommentData.cardId,
        comment: createCommentData.comment,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error");
    };
  };

  async updateComment(commentId, id, comment) {

    const matchCommentInfo = await commentRepository.findCommentById(commentId);

    if (comment.length <= 0) {
      throw new Error("Empty");
    };

    if (matchCommentInfo.userId !== id) {
      throw new Error("Unauthorized");
    };

    try {
      await commentRepository.updateComment(commentId, id, comment);

      const updatedCommentData = await commentRepository.findCommentById(commentId);

      return {
        id: updatedCommentData.id,
        comment: updatedCommentData.comment,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error");
    };
  };
  //댓글삭제
  async deleteComment(commentId, id) {
    const matchUser = await commentRepository.findCommentById(commentId);

    if (matchUser.userId !== id) {
      throw new Error("Unauthorized");
    };
    try {
      const deletedCommentData = await commentRepository.findCommentById(commentId);

      await commentRepository.deleteComment(commentId, id);

      return {
        id: deletedCommentData.id,
        comment: deletedCommentData.comment,
      };
    } catch (error) {
      console.log(error)
      throw new Error("Error");
    };
  };
};

module.exports = CommentService;