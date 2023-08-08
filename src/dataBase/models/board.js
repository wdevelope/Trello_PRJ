const { DataTypes } = require("sequelize");
const sequelize = require("../mysql");

const board = sequelize.define("Boards", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING(7),
    allowNull: true,
    defaultValue: "#FFFFFF",
  },
});

module.exports = board;
