const BoardsMemberRepository = require("../repositories/boardsMember.repositories");
const boardsMemberRepository = new BoardsMemberRepository();

class BoardsService {
  //보드 맴버 추가
  async createBoardMember(boardId, userId, currentUserId) {
    const board = await boardsMemberRepository.findBoardCreator(boardId);
    if (!board || board.userId !== currentUserId) {
      // board.userId로 보드의 생성자 확인
      throw new Error("보드를 만든 유저만 다른 유저를 초대할 수 있습니다.");
    }
    console.log(userId);

    //currentUserId는 접속된 userId이고, id는 현재 생성된 보드의 보드id,
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

    return boardMemberships.map((bm) => bm.board);
  }
}

module.exports = BoardsService;
