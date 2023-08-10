const express = require("express");
const router = express.Router();
//유저 라우터
const usersRouter = require("./users.routes");
router.use("/user", usersRouter);
//보드 라우터
const boardsRouter = require("./boards.routes");
router.use("/board", boardsRouter);
//컬럼 라우터
const columnsRouter = require("./columns.routes");
router.use("/board", columnsRouter);
//카드 라우터
const cardsRouter = require("./cards.routes");
router.use("/board", cardsRouter);
//댓글 라우터
const commentsRouter = require("./comments.routes");
router.use("/board", commentsRouter);
//카드 멤버 라우터
const cardMemberRouter = require("./cardMenber.routes");
router.use("/cardMember", cardMemberRouter);
//맴버 초대 라우터
const boardMemberRouter = require("./boardMember.routes");
router.use("/boardMember", boardMemberRouter);

module.exports = router;
