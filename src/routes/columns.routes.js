const express = require("express");
const router = express.Router();
const auth = require("../middleWares/auth.middleware");
const ColumnController = require("../controllers/columns.controllers");
const columnController = new ColumnController();

//컬럼 생성
router.post("/", auth, columnController.createColumn);
//컬럼 수정
router.put("/:columnId", auth, columnController.updateColumn);
//컬럼 삭제
router.delete("/:columnId", auth, columnController.deleteColumn);
//테스트 후 boardId 추가
module.exports = router;
