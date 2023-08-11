const BoardsMemberRepository = require("../repositories/boardsMember.repositories");
const boardsMemberRepository = new BoardsMemberRepository();

class BoardsService {
  //보드 맴버 추가
  async createBoardMember(memberId, boardId, userId) {
    console.log("ser userId", userId);
    console.log("ser boardId", boardId);
    console.log("ser memberId", memberId);

    const newBoardMember = await boardsMemberRepository.createBoardMember(
      memberId,
      boardId,
    );
    return newBoardMember;
  }

  //보드 맴버 삭제
  async deleteBoardMember(memberId, boardId, userId) {
    console.log("ser memberId", memberId);
    console.log("ser boardId", boardId);
    console.log("ser userId", userId);

    //comparBoardMemberData 따로 만들어서 boardId == userId가 같은지 비교
    // const compareBoardMamberData =
    //   await boardsMemberRepository.compareBoardMamber(boardId);
    // if (!compareBoardMamberData) {
    //   throw new Error("보드 맴버 삭제 권한 없음");
    // }
    // if (compareBoardMamberData.userId !== userId) {
    //   throw new Error("보드 맴버 삭제 권한 없음");
    // }

    const deleteBoardMember = await boardsMemberRepository.deleteBoardMember(
      memberId,
      boardId,
    );
    if (!deleteBoardMember) {
      throw new Error("삭제할 보드 맴버가 없습니다.");
    }
    return deleteBoardMember;
  }

  //보드 맴버 조회
  async getBoardMember(boardId) {
    console.log("ser boardId", boardId);
    const getBoardMember = await boardsMemberRepository.getBoardMember(boardId);

    if (!boardId) {
      throw new Error("보드 맴버가 없습니다.");
    }

    return getBoardMember;
  }
}

module.exports = BoardsService;
