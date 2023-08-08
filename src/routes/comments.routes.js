const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/comments.controllers");
const auth = require("../middleWares/auth.middleware");

router.get("/comment", CommentController.getComments);
router.post("/comment", CommentController.createComment);
router.put("/comment/:commentId", CommentController.updateComment);
router.delete("/comment/:commentId", CommentController.deleteComment);

module.exports = router;