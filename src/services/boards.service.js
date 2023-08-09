const BoardsRepository = require("../repositories/boards.repositories");
const boardsRepository = new BoardsRepository();

class BoardsService {
  //보드 생성
  async createBoard(title, description, color, userId) {
    const newBoard = await boardsRepository.createBoard(
      title,
      description,
      color,
      userId,
    );

    return newBoard;
  }
  //보드 상세 조회
  async getBoardDetail(boardId) {
    console.log(boardId);
    const board = await boardsRepository.getBoardDetail(boardId);
    if (!board) {
      throw new Error("보드를 찾을 수 없습니다.");
    }

    return board;
  }

  //보드 조회
  async getBoard(){
    const getBoard = await boardsRepository.getBoard();

    return getBoard;
  }

  //보드 수정
  async updateBoard(boardId, title, description, color) {
    console.log("serv", boardId, title, description, color);
    const updateBoard = await boardsRepository.updateBoard(
      boardId,
      title,
      description,
      color,
    );
    if (!updateBoard[0]) {
      throw new Error("보드 업데이트 불가.");
    }
    
    return updateBoard;
  }
  //보드 삭제
  async deleteBoard(boardId, userId) {
    console.log("ser bI", boardId);
    console.log("ser uI", userId);

    const compareBoardData = await boardsRepository.compareBoard(boardId);
    if(!compareBoardData){
        throw new Error("보드 삭제 권한 없음");
    }
    if(compareBoardData.userId !== userId){
        throw new Error("보드 삭제 권한 없음");
    }
    const deleteBoard = await boardsRepository.deleteBoard(boardId);

    if (!deleteBoard) {
      throw new Error("보드가 없습니다.");
    }
    return deleteBoard;
  }
  //보드 초대
}

module.exports = BoardsService;
