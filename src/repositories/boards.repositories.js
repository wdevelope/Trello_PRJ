//const { Model } = require("sequelize");
const Board = require("../database/models/board");

class BoardsRepository {
  //보드 생성
  async createBoard(title, description, color, userId) {
    const existingBoard = await Board.findOne({ where: { title } });

    if (existingBoard) {
      return null;
    }
    return Board.create({
      title,
      description,
      color,
      UserId: userId,
    });
  }

  //보드 상세 조회
  async getBoardDetail(boardId) {
    return await Board.findOne({ where: { id: boardId } });
  }

  //보드 조회
  //보드 수정
  async updateBoard(boardId, title, description, color) {
    console.log("repo", boardId, title, description, color);
    return await Board.update(
      { title, description, color },
      { where: { id: boardId } },
    );
  }

  //삭제 권한 확인
  compareBoard = async (boardId) => {
    const compareBoardData = await Board.findOne({
      attributes: ["userId"],
      where: { id: boardId },
    });
    return compareBoardData;
  };

  //보드 삭제
  async deleteBoard(boardId) {
    return await Board.destroy({ where: { id: boardId } });
  }

  //보드 초대
}

module.exports = BoardsRepository;
