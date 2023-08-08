const ColumnsService = require("../services/columns.service");
class ColumnController {
  columnsService = new ColumnsService();
  findAllColumn = async (req, res, next) => {
    const { boardId } = req.params;

    const column = await this.columnsService.findAllColumn(boardId);
    return res.json(column);
  };

  //컬럼 생성
  createColumn = async (req, res, next) => {
    const { title, position } = req.body;
    const { boardId } = req.params;
    if (!(title && position)) {
      res
        .status(412)
        .json({ errorMessage: "타이틀 및 포지션을 입력해주세요." });
    }
    try {
      const column = await this.columnsService.createColumn(
        title,
        position,
        boardId,
      );
      return res.status(200).json(column);
    } catch (error) {
      if (error.message === "Error") {
        res.status(400).json({ errorMessage: "컬럼 생성에 실패하였습니다." });
      } else if (error.message === "UndefinedeBoard") {
        res.status(412).json({ errorMessage: "Board가 존재하지 않습니다." });
      }
    }
  };
  //컬럼 수정
  updateColumn = async (req, res, next) => {
    // const { userId } = res.locals;
    const { columnId } = req.params;
    const { boardId } = req.params;
    const { title, position } = req.body;

    if (!(title && position)) {
      res
        .status(412)
        .json({ errorMessage: "타이틀 및 포지션을 입력해주세요." });
    }
    try {
      const column = await this.columnsService.updateColumn(
        columnId,
        title,
        position,
        boardId,
      );
      res.status(200).json(column);
    } catch (error) {
      if (error.message === "Error") {
        res.status(400).json({ errorMessage: "컬럼 생성에 실패하였습니다." });
      } else if (error.message === "UndefinedeBoard") {
        res.status(412).json({ errorMessage: "Board이 존재하지 않습니다." });
      } else if (error.message === "UndefinedeColumn") {
        res.status(412).json({ errorMessage: "Column이 존재하지 않습니다." });
      }
    }
  };
  // 컬럼 삭제
  deleteColumn = async (req, res, next) => {
    // const { userId } = res.locals;
    const { columnId } = req.params;
    const { boardId } = req.params;
    try {
      const column = await this.columnsService.deleteColumn(columnId, boardId);
      res.status(200).json(column);
    } catch (error) {
      if (error.message === "Error") {
        res.status(400).json({ errorMessage: "컬럼 제거에 실패하였습니다." });
      } else if (error.message === "UndefinedeBoard") {
        res.status(412).json({ errorMessage: "Board이 존재하지 않습니다." });
      } else if (error.message === "UndefinedeColumn") {
        res.status(412).json({ errorMessage: "Column이 존재하지 않습니다." });
      }
    }
  };
}

module.exports = ColumnController;
