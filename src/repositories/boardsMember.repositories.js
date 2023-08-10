const boardMember = require("../dataBase/models/boardMember");
const { Op } = require("sequelize");

class BoardsMemberRepository {

  //보드 맴버 추가
  async createBoardMember(boardId, userId) {
    console.log("repo userId", userId);
    console.log("repo boardId", boardId);
    return boardMember.create({ boardId, userId, });
  };
  
  //보드 맴버 삭제
  async deleteBoardMember(MemberId, boardId){
    // 보드 맴버 안에 특정 맴버찾고 삭제
    return await boardMember.destroy({
      where: {[Op.and]:[{id: MemberId},{boardId}]},
    });
  }
}

module.exports = BoardsMemberRepository;
