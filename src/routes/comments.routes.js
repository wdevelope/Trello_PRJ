const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/comments.controllers");
const auth = require("../middleWares/auth.middleware");

router.get("/:boardId/column/:columnId/card/:cardId/comment", CommentController.getComments);
router.post("/:boardId/column/:columnId/card/:cardId/comment", auth, CommentController.createComment);
router.put("/:boardId/column/:columnId/card/:cardId/comment/:commentId", auth, CommentController.updateComment);
router.delete("/:boardId/column/:columnId/card/:cardId/comment/:commentId", auth, CommentController.deleteComment);

module.exports = router;