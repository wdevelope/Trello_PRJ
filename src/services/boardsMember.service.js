const BoardsMemberRepository = require("../repositories/boardsMember.repositories");
const boardsMemberRepository = new BoardsMemberRepository();

class BoardsService {
  //보드 맴버 추가
  async createBoardMember(boardId, userId) {
    console.log("ser userId", userId);
    console.log("ser boardId", boardId);
    const newBoardMember = await boardsMemberRepository.createBoardMember(
      boardId,
      userId,
    );
    return newBoardMember;
  }

  //보드 맴버 삭제
  async deleteBoardMember(MemberId, boardId, userId){
    console.log("ser MemberId", MemberId);
    console.log("ser boardId", boardId);
    console.log("ser userId", userId);

    //comparBoardMemberData 따로 만들어서 boardId == userId가 같은지 비교

    const deleteBoardMember = await boardsMemberRepository.deleteBoardMember(MemberId, boardId);
    if(!deleteBoardMember){
        throw new Error("삭제할 보드 맴버가 없습니다.");
    }
    return deleteBoardMember;
  }
}

module.exports = BoardsService;
