const { DataTypes } = require("sequelize");
const sequelize = require("../mysql");

const column = sequelize.define(
  "columns",
  {
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
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  { timestamps: false },
);

module.exports = column;
