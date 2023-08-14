const boardMember = require("../dataBase/models/boardMember");
const user = require("../dataBase/models/user");
const board = require("../dataBase/models/board");

const { Op } = require("sequelize");

class BoardsMemberRepository {
  //보드 맴버 추가
  async createBoardMember(userId, boardId) {
    return boardMember.create({ userId, boardId });
  }

  // 보드의 생성자를 찾는 메소드
  async findBoardCreator(boardId) {
    return board.findOne({
      where: {
        id: boardId,
      },
      attributes: ["userId"], // 보드의 생성 유저 ID를 가져옵니다.
    });
  }

  //보드 멤버 추가시 중복 찾기
  async findBoardMember(userId, boardId) {
    return boardMember.findOne({
      where: {
        userId,
        boardId,
      },
    });
  }
  //보드 멤버 추가시 유저 찾기
  async findUserById(userId) {
    return user.findOne({
      where: { id: userId },
    });
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

  // 사용자의 userId에 해당하는 모든 board 조회
  async findBoardsByUserId(userId) {
    return boardMember.findAll({
      where: { userId },
      include: [{ model: board, required: true }],
    });
  }
}

module.exports = BoardsMemberRepository;
