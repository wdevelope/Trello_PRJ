const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/comments.controllers");
const auth = require("../middleWares/auth.middleware");

router.get("/:cardId/comment", CommentController.getComments);
router.post("/:cardId/comment", auth, CommentController.createComment);
router.put(
  "/:cardId/comment/:commentId",
  auth,
  CommentController.updateComment,
);
router.delete(
  "/:cardId/comment/:commentId",
  auth,
  CommentController.deleteComment,
);

module.exports = router;
