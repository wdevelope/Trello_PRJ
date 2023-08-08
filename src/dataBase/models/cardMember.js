const { DataTypes } = require("sequelize");
const sequelize = require("../mysql");

const cardMember = sequelize.define("CardMember", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = cardMember;
