const express = require("express");
const router = express.Router();
const auth = require("../middleWares/auth.middleware");

const BoardsController = require("../controllers/boards.controller");

//보드 생성
router.post("/", auth ,BoardsController.createBoard);
//보드 조회
//router.get("/", BoardsController.getBoard);
// //보드 상세조회
// router.get("/:boardid", BoardsController.getBoardDetail);
// //보드 수정
// router.post("/:boardid", BoardsController.updateBoard);
// //보드 삭제
// router.delete("/:boardid", BoardsController.deleteBoard);

//보드 초대

module.exports = router;

//기능 보드 생성 조회, 수정, 삭제, 초대
