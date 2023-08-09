const express = require("express");
const router = express.Router();

const usersRouter = require("./users.routes");
router.use("/user", usersRouter);

const boardsRouter = require("./boards.routes");
router.use("/board", boardsRouter);

const columnsRouter = require("./columns.routes");
router.use("/board", columnsRouter);
//카드 라우터
const cardsRouter = require("./cards.routes");
router.use("/board", cardsRouter);

const commentsRouter = require("./comments.routes");
router.use("/", commentsRouter);

module.exports = router;
