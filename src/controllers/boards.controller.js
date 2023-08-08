const BoardsService = require("../services/boards.service");
const boardsService = new BoardsService();

class BoardsController {
  //보드 생성
  async createBoard(req, res) {
    const userId = res.locals.user;
    const { title, description, color } = req.body;
    console.log(userId);

    try {
      await boardsService.createBoard(title, description, color, userId);
      res.status(201).json({ message: "보드 생성 성공" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }

  //보드 상세 조회
  async getBoardDetail(req, res) {
    try {
      const {boardId} = req.params;
      console.log(boardId);
      const board = await boardsService.getBoardDetail(boardId);
      res.json(board);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }

  //보드 조회

  //보드 수정

  //보드 삭제

  //보드 초대
}

module.exports = new BoardsController();
