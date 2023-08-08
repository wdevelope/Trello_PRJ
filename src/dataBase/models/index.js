const board = require("./board");
const boardMember = require("./boardMember");
const card = require("./card");
const cardMember = require("./cardMember");
const column = require("./column");
const comment = require("./comment");
const user = require("./user");

// user 관계
user.hasMany(board);
board.belongsTo(user);

user.hasMany(comment);
comment.belongsTo(user);

user.hasMany(boardMember);
boardMember.belongsTo(user);

user.hasMany(cardMember);
cardMember.belongsTo(user);

// board 관계
board.hasMany(column);
column.belongsTo(board);

board.hasMany(boardMember);
boardMember.belongsTo(board);

// column 관계
column.hasMany(card);
card.belongsTo(column);

// card 관계
card.hasMany(comment);
comment.belongsTo(card);
card.hasMany(cardMember);
cardMember.belongsTo(card);

module.exports = {
  board,
  card,
  column,
  comment,
  user,
  boardMember,
  cardMember,
};
