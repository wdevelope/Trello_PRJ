const Column = require("../dataBase/models/column");
const Board = require("../dataBase/models/board");
const { Op } = require("sequelize");

class ColumnsRepository {
  findOneBoard = async (boardId) => {
    const board = await Board.findOne({ where: { id: boardId } });
    return board;
  };

  findAllColumn = async (boardId) => {
    const column = await Column.findAll({ where: { BoardId: boardId } });
    return column;
  };

  findOneColumn = async (columnId) => {
    const column = await Column.findOne({ where: { id: columnId } });
    return column;
  };

  createColumn = async (title, position, boardId) => {
    const column = await Column.create({
      title,
      position,
      BoardId: boardId,
    });
    console.log(column.dataValues);
    return column;
  };

  updateColumn = async (columnId, title, position, boardId) => {
    const column = await Column.update(
      { title, position },
      { where: { [Op.and]: [{ id: columnId }, { BoardId: boardId }] } },
    );
    return column;
  };

  deleteColumn = async (columnId, boardId) => {
    console.log(boardId);
    const column = await Column.destroy({
      where: { [Op.and]: [{ id: columnId }, { BoardId: boardId }] },
    });
    return column;
  };
}

module.exports = ColumnsRepository;
