const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/comments.controllers");
const auth = require("../middleWares/auth.middleware");

router.get("/comment", CommentController.getComments);
router.post("/comment", auth, CommentController.createComment);
router.put("/comment/:commentId", auth, CommentController.updateComment);
router.delete("/comment/:commentId", auth, CommentController.deleteComment);

module.exports = router;