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
      userId,
    });
  }

  //보드 상세 조회
  async getBoardDetail(boardid){
    return await Board.findOne({ where: {id: boardid}});
  }

  //보드 조회
  //보드 수정
  //보드 삭제
  //보드 초대
}

module.exports = BoardsRepository;
