const express = require("express");
const router = express.Router();
const auth = require("../middleWares/auth.middleware");

const BoardsMemberController = require("../controllers/boardsMember.controllers.js");
const boardMemberController = new BoardsMemberController();

//보드 맴버 초대
router.post("/:boardId", auth, boardMemberController.createBoardMember);
//보드 맴버 삭제
router.delete("/:boardId", auth, boardMemberController.deleteBoardMember);
//보드 맴버 조회
router.get("/:boardId", auth, boardMemberController.getBoardMember);

module.exports = router;
