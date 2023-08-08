const express = require("express");
const router = express.Router();

const usersRouter = require("./users.routes");
router.use("/user", usersRouter);

// const boardsRouter = require("./boards.routes");
// router.use("/", boardsRouter);

// const columnsRouter = require("./columns.routes");
// router.use("/", columnsRouter);

const cardsRouter = require("./cards.routes");
router.use("/card", cardsRouter);

// const commentsRouter = require("./comments.routes");
// router.use("/", commentsRouter);

module.exports = router;
