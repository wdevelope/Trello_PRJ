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

module.exports = router;

//기능  회원가입, 로그인, 로그아웃, 유저조회, 유저정보수정, 유저삭제(탈퇴)
