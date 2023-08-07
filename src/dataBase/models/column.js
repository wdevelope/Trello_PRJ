const { DataTypes } = require("sequelize");
const sequelize = require("../mysql");

const column = sequelize.define("Columns", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  position: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = column;
