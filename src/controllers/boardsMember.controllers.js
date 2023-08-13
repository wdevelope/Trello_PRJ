const BoardsMemberService = require("../services/boardsMember.service");
const boardsMemberService = new BoardsMemberService();

class BoardsMemberController {
  //보드 맴버 추가
  async createBoardMember(req, res) {
    const { userId } = req.body;
    const { boardId } = req.params;
    const currentUserId = res.locals.userId;

    console.log("cont boardId", boardId);
    console.log("cont userId", userId);
    try {
      await boardsMemberService.createBoardMember(
        boardId,
        userId,
        currentUserId,
      );
      res.status(201).json({ message: "보드 맴버 추가 완료" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //보드 맴버 삭제
  async deleteBoardMember(req, res) {
    const { memberId } = req.body;
    const { boardId } = req.params;
    const userId = res.locals.userId;
    console.log("cont memberId", memberId);
    console.log("cont boardId", boardId);
    console.log("cont userId", userId);

    try {
      await boardsMemberService.deleteBoardMember(memberId, boardId, userId);
      res.json({ message: "보드 맴버 삭제 성공" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  //보드 맴버 조회
  async getBoardMember(req, res) {
    const { boardId } = req.params;
    console.log("cont boardId", boardId);

    try {
      const getBoardMember = await boardsMemberService.getBoardMember(boardId);
      res.json(getBoardMember);
    } catch {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }

  // 주어진 userId에 속한 모든 보드들의 정보를 반환합니다.
  async getBoardsOfUser(req, res) {
    const { userId } = req.params;
    try {
      const boards = await boardsMemberService.getBoardsByUserId(userId);
      res.json(boards);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = BoardsMemberController;
