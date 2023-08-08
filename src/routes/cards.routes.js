const express = require("express");
const router = express.Router();

const CardsController = require("../controllers/cards.controllers");
const auth = require("../middleWares/auth.middleware");

// 카드 생성
router.post("/", CardsController.createCard);
// 전체 카드 조회
router.get("/", CardsController.getAllCards);
// 상세 카드 조회
router.get("/:id", CardsController.getCardById);
// 카드 수정
router.put("/:id", CardsController.updateCard);
// 카드 삭제
router.delete("/:id", CardsController.deleteCard);
// 카드 이동
router.post("/:id", CardsController.moveCard);

module.exports = router;
