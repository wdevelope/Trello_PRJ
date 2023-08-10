const BoardsMemberService = require("../services/boardsMember.service");
const boardsMemberService = new BoardsMemberService();

class BoardsMemberController {
  //보드 맴버 추가
  async createBoardMember(req, res) {
    const { userId } = req.body;
    const { boardId } = req.params;
    console.log("cont userId", userId);
    console.log("cont boardId", boardId);
    try {
      await boardsMemberService.createBoardMember(boardId, userId);
      res.status(201).json({ message: "보드 맴버 추가 완료" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //보드 맴버 삭제
  async deleteBoardMember(req, res) {
    const { MemberId } = req.body;
    const { boardId } = req.params;
    const userId = res.locals.userId;
    console.log("cont MemberId", MemberId);
    console.log("cont boardId", boardId);
    console.log("cont userId", userId);

    try {
      await boardsMemberService.deleteBoardMember(MemberId, boardId, userId);
      res.json({ message: "보드 맴버 삭제 성공" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = BoardsMemberController;
