const express = require("express");
const router = express.Router();

const BoardsController = require("../controllers/boards.controller");
const auth = require("../middleWares/auth.middleware");

//보드 생성
router.post("/", auth, BoardsController.createBoard);
//보드 조회
router.get("/", BoardsController.getBoard);
//보드 상세조회
router.get("/:userId", BoardsController.getBoardDetail);
//보드 수정
router.put("/:boardId", auth, BoardsController.updateBoard);
//보드 삭제
router.delete("/:boardId", auth, BoardsController.deleteBoard);

//보드 초대

module.exports = router;

//기능 보드 생성 조회, 수정, 삭제, 초대
