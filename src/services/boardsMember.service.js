const BoardsMemberRepository = require("../repositories/boardsMember.repositories");
const boardsMemberRepository = new BoardsMemberRepository();

class BoardsService {
  //보드 맴버 추가
  async createBoardMember(boardId, userId) {
    const user = await boardsMemberRepository.findUserById(userId);
    if (!user) {
      throw new Error("존재하지 않는 유저입니다.");
    }

    const existingMember = await boardsMemberRepository.findBoardMember(
      userId,
      boardId,
    );
    if (existingMember) {
      throw new Error("해당 유저는 이미 보드의 멤버입니다.");
    }

    const newBoardMember = await boardsMemberRepository.createBoardMember(
      userId,
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

  // 주어진 userId에 속한 모든 보드들의 정보를 가져옴
  async getBoardsByUserId(userId) {
    const boardMemberships = await boardsMemberRepository.findBoardsByUserId(
      userId,
    );

    if (boardMemberships.length === 0) {
      throw new Error("해당 유저가 속한 보드가 없습니다.");
    }

    return boardMemberships.map((bm) => bm.board);
  }
}

module.exports = BoardsService;
