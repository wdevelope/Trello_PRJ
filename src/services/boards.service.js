const BoardsRepository = require("../repositories/boards.repositories");
const boardsRepository = new BoardsRepository();

class BoardsService {
  //보드 생성
  async createBoard(title, description, color, userId){
    const newBoard = await boardsRepository.createBoard(
        title,
        description,
        color,
        userId,
    );
    //에러 캐치 뭐?

    return newBoard;
  }


  //보드 조회
  //보드 수정
  //보드 삭제
  //보드 초대
}

module.exports = BoardsService;
