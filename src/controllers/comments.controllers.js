const CommentService = require("../services/comments.service");
const commentService = new CommentService();

class CommentController {
  async getComments(req, res) {
    try {
      const getCommentsData = await commentService.getComment();

      res.status(200).json({ data: getCommentsData });
    } catch (error) {
      if (error.message === "NotFoundComments") {
        res.status(404).json({ errorMessage: "댓글이 존재하지 않습니다." });
      };
    };
  };

  async createComment(req, res) {
    const { id } = res.locals.user;
    const cardId = parseInt(req.params.cardId, 10);
    const { comment } = req.body;
    try {
      await commentService.createComment(id, cardId, comment);

      res.status(201).json({ message: "댓글이 작성되었습니다." })
    } catch (error) {
      if (error.message === "Error") {
        res.status(400).json({ errorMessage: "댓글 생성에 실패하였습니다." });
      } else if (error.message === "NotFoundCard") {
        res.status(404).json({ errorMessage: "카드가 존재하지 않습니다." });
      } else if (error.message === "Empty") {
        res.status(400).json({ errorMessage: "댓글을 작성해주세요." });
      };
    };
  };

  async updateComment(req, res) {
    const { id } = res.locals.user;
    const { commentId } = req.params;
    const { comment } = req.body;
    try {
      await commentService.updateComment(commentId, id, comment);

      res.status(200).json({ message: "댓글이 수정되었습니다." });
    } catch (error) {
      if (error.message === "Error") {
        res.status(400).json({ errorMessage: "댓글 수정에 실패하였습니다." });
      } else if (error.message === "Empty") {
        res.status(400).json({ errorMessage: "수정하실 댓글을 작성해주세요." });
      } else if (error.message === "Unauthorized") {
        res.status(401).json({ errorMessage: "댓글 수정권한이 없습니다." });
      };
    };
  };

  async deleteComment(req, res) {
    const { id } = res.locals.user;
    const { commentId } = req.params;
    try {
      const deleteCommentData = await commentService.deleteComment(commentId, id);

      res.status(200).json({ message: "댓글이 삭제되었습니다", data: deleteCommentData });
    } catch (error) {
      if (error.message === "Unauthorized") {
        res.status(401).json({ errorMessage: "댓글 삭제권한이 없습니다." });
      };
    };
  };
};

module.exports = new CommentController();