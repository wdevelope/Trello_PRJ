const boardMember = require("../dataBase/models/boardMember");
const { Op } = require("sequelize");

class BoardsMemberRepository {
  //보드 맴버 추가
  async createBoardMember(memberId, boardId) {
    console.log("repo boardId", boardId);
    console.log("repo memberId", memberId);
    const userId = memberId;

    return boardMember.create({ userId, boardId });
  }

  //보드 맴버 삭제
  async deleteBoardMember(memberId, boardId) {
    // 보드 맴버 안에 특정 맴버찾고 삭제
    return await boardMember.destroy({
      where: { [Op.and]: [{ userId: memberId }, { boardId }] },
    });
  }

  //보드 맴버 삭제 권한 확인
  //   async compareBoardMamber(boardId){
  //     const compareBoardMamberData = await boardMember.findOne({
  //       attributes: ["userId"],
  //       where: { id: boardId },
  //     });
  //     return compareBoardData;
  //   }

  //보드 맴버 조회
  async getBoardMember(boardId) {
    console.log("repo", boardId);
    return boardMember.findAll({ where: { boardId } });
  }
}

module.exports = BoardsMemberRepository;
