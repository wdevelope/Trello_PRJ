const ColumnsRepository = require("../repositories/columns.repositories");

class ColumnsService {
  columnsRepository = new ColumnsRepository();

  createColumn = async (title, position, boardId) => {
    const board = await this.columnsRepository.findOneBoard(boardId);
    if (!board) {
      throw new Error("UndefinedeBoard");
    }
    try {
      await this.columnsRepository.createColumn(title, position);
      return `${title} 컬럼을 생성하였습니다.`;
    } catch (error) {
      throw new Error("Error");
    }
  };

  updateColumn = async (columnId, title, position, boardId) => {
    const board = await this.columnsRepository.findOneBoard(boardId);
    const column = await this.columnsRepository.findOneColumn(columnId);
    if (!board) {
      throw new Error("UndefinedeBoard");
    }
    if (!column) {
      throw new Error("UndefinedeColumn");
    }
    try {
      await this.columnsRepository.updateColumn(
        columnId,
        title,
        position,
        boardId,
      );
      return `boardId: ${boardId} 의  columnId: ${columnId} 을 수정하였습니다.`;
    } catch (error) {
      throw new Error("Error");
    }
  };

  deleteColumn = async (columnId, boardId) => {
    const board = await this.columnsRepository.findOneBoard(boardId);
    const column = await this.columnsRepository.findOneColumn(columnId);
    if (!board) {
      throw new Error("UndefinedeBoard");
    }
    if (!column) {
      throw new Error("UndefinedeColumn");
    }
    try {
      const column = await this.columnsRepository.deleteColumn(columnId);
      return `boardId: ${boardId} 의  columnId: ${columnId} 을 삭제하였습니다.`;
    } catch (error) {
      throw new Error("Error");
    }
  };
}

module.exports = ColumnsService;

// /
