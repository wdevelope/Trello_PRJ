const { DataTypes } = require("sequelize");
const sequelize = require("../mysql");

const boardMember = sequelize.define("BoardMember", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = boardMember;
