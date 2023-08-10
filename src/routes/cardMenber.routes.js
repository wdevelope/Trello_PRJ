const express = require("express");
const router = express.Router();

const CardMemberController = require("../controllers/cardMember.controller");
const auth = require("../middleWares/auth.middleware");

// 카드 멤버 생성
router.post("/", CardMemberController.createCardMember);
// 모든 카드 멤버 조회
router.get("/", CardMemberController.getAllCardMembers);
// 특정 ID의 카드 멤버 조회
router.get("/:id", CardMemberController.getCardMemberById);
// 카드 멤버 삭제
router.delete("/:id", CardMemberController.deleteCardMember);

module.exports = router;
