const express = require("express");
const router = express.Router();

const CardsController = require("../controllers/cards.controllers");
const auth = require("../middleWares/auth.middleware");

// 카드 생성
router.post("/:columnId/card", auth, CardsController.createCard);
// 전체 카드 조회
router.get("/:columnId/card", CardsController.getAllCards);
// 상세 카드 조회
router.get("/:columnId/card/:id", CardsController.getCardById);
// 카드 수정
router.put("/:columnId/card/:id", auth, CardsController.updateCard);
// 카드 삭제
router.delete("/:columnId/card/:id", auth, CardsController.deleteCard);
// 카드 이동
router.put("/:columnId/card/:id", CardsController.moveCard);

module.exports = router;
