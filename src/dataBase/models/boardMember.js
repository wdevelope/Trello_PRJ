const { DataTypes } = require("sequelize");
const sequelize = require("../mysql");

const boardMember = sequelize.define(
  "boardMember",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false },
);

module.exports = boardMember;
