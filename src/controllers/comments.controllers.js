const CommentService = require("../services/comments.service");
const commentService = new CommentService();

class CommentController {
  async getComments(req, res) {
    try {
      const getCommentsData = await commentService.getComment();

      res.status(200).json({ data: getCommentsData });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    };
  };

  async createComment(req, res) {
    const { comment } = req.body;
    try {
      await commentService.createComment(comment);

      res.status(201).json({ message: "댓글이 작성되었습니다." })
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    };
  };

  async updateComment(req, res) {
    const { commentId } = req.params;
    const { comment } = req.body;
    try {
      const updateCommentData = await commentService.updateComment(commentId, comment);

      res.status(200).json({ data: updateCommentData });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    };
  };

  async deleteComment(req, res) {
    const { commentId } = req.params;
    try {
      const deleteCommentData = await commentService.deleteComment(commentId);

      res.status(200).json({ data: deleteCommentData });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };
};

module.exports = new CommentController();