//const { Model } = require("sequelize");
const board = require("../database/models/board");
const boardMember = require("../dataBase/models/boardMember");

class BoardsRepository {
  //보드 생성
  async createBoard(title, description, color, userId) {
    const existingBoard = await board.findOne({ where: { title } });

    if (existingBoard) {
      return null;
    }
    return board.create({
      title,
      description,
      color,
      userId,
    });
  }

  //보드 상세 조회
  async getBoardDetail(userId) {
    return await board.findAll({
      where: { userId },
      include: [
        {
          model: boardMember, // board와 연관된 boardMember 모델
          as: "boardMembers", // 관계 별칭
          attributes: ["userId"], // userId만 선택적으로 가져옴
        },
      ],
    });
  }

  //보드 조회
  async getBoard() {
    return await board.findAll({
      attributes: ["id", "title", "description", "color", "userId"],
    });
  }

  //보드 수정
  async updateBoard(boardId, title, description, color) {
    console.log("repo", boardId, title, description, color);
    return await board.update(
      { title, description, color },
      { where: { id: boardId } },
    );
  }

  //삭제 권한 확인
  compareBoard = async (boardId) => {
    const compareBoardData = await board.findOne({
      attributes: ["userId"],
      where: { id: boardId },
    });
    return compareBoardData;
  };

  //보드 삭제
  async deleteBoard(boardId) {
    return await board.destroy({ where: { id: boardId } });
  }

  //보드 초대
}

module.exports = BoardsRepository;
