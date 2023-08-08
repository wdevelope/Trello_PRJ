const BoardsService = require("../services/boards.service");
const UserService = require("../services/user.service");
const boardsService = new BoardsService();

class BoardsController {
  //보드 생성
  async createBoard(req, res) {
    const { title, description, color } = req.body;
    const userId = res.locals.user.id;
    console.log(userId);
    console.log(title, description, color);

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
      const { boardId } = req.params;
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
  async updateBoard(req, res) {
    try {
      const { boardId } = req.params;
      const { title, description, color } = req.body;
      await boardsService.updateBoard(boardId, title, description, color);
      console.log("cont", boardId, title, description, color);
      res.json({ message: "보드 정보가 수정되었습니다." });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }

  //보드 삭제
  async deleteBoard(req, res) {
    try {
      //const userId = res.locals.user.id;
      const { boardId } = req.params;
      console.log(boardId);
      

      await UserService.deleteBoard(boardId);
      res.json({ message: "보드 삭제 성공." });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }

  //보드 초대
}

module.exports = new BoardsController();
