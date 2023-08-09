const { DataTypes } = require("sequelize");
const sequelize = require("../mysql");

const card = sequelize.define("cards", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING(7),
    allowNull: true,
    defaultValue: "#FFFFFF",
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = card;
