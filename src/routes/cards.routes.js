const express = require("express");
const router = express.Router();

const CardsController = require("../controllers/cards.controllers");
const auth = require("../middleWares/auth.middleware");

// 카드 생성
router.post("/:boardId/column/:columnId/card", CardsController.createCard);
// 전체 카드 조회
router.get("/:boardId/column/:columnId/card", CardsController.getAllCards);
// 상세 카드 조회
router.get("/:boardId/column/:columnId/card/:id", CardsController.getCardById);
// 카드 수정
router.put("/:boardId/column/:columnId/card/:id", CardsController.updateCard);
// 카드 삭제
router.delete(
  "/:boardId/column/:columnId/card/:id",
  CardsController.deleteCard,
);
// 카드 이동
router.put("/:boardId/column/:columnId/card/:id", CardsController.moveCard);

module.exports = router;
