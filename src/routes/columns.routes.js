const express = require("express");
const router = express.Router();
const auth = require("../middleWares/auth.middleware");
const ColumnController = require("../controllers/columns.controllers");
const columnController = new ColumnController();
//테이블 컬럼 조회
router.get("/:boardId/column", auth, columnController.findAllColumn);
//컬럼 생성
router.post("/:boardId/column", auth, columnController.createColumn);
//컬럼 수정
router.put("/:boardId/column/:columnId", auth, columnController.updateColumn);
//컬럼 삭제
router.delete(
  "/:boardId/column/:columnId",
  auth,
  columnController.deleteColumn,
);
//테스트 후 boardId 추가
module.exports = router;
