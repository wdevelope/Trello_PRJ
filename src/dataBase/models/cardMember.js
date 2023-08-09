const { DataTypes } = require("sequelize");
const sequelize = require("../mysql");

const cardMember = sequelize.define(
  "cardMember",
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

module.exports = cardMember;
