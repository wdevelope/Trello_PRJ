const { DataTypes } = require("sequelize");
const sequelize = require("../mysql");

const card = sequelize.define("Cards", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
  },
  deadline: {
    type: DataTypes.DATE,
  },
});

module.exports = card;
