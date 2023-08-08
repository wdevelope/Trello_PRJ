const Column = require("../dataBase/models/column");
const Board = require("../dataBase/models/board");
const { Op } = require("sequelize");

class ColumnsRepository {
  ////보더 파인드 생기면 그걸로 대체
  findOneBoard = async (boardId) => {
    await Board.findOne({ where: { id: boardId } });
  };

  findOneColumn = async (columnId) => {
    await Column.findOne({ where: { id: columnId } });
  };

  createColumn = async (title, position) => {
    const column = await Column.create({
      title: title,
      position: position,
    });
    return column;
  };

  updateColumn = async (columnId, title, position, boardId) => {
    const column = await Column.update(
      { title, position },
      { where: { [Op.and]: [{ id: columnId }, { boardId }] } },
    );
    return column;
  };

  deleteColumn = async (columnId, boardId) => {
    const column = await Column.destroy({
      where: { [Op.and]: [{ id: columnId }, { boardId }] },
    });
    return column;
  };
}

module.exports = ColumnsRepository;
