const { board, card, column, comment, user, boardMember } = require("./models");

// user 관계
user.hasMany(board);
board.belongsTo(user);

user.hasMany(comment);
comment.belongsTo(user);

user.hasMany(boardMember);
boardMember.belongsTo(user);

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
