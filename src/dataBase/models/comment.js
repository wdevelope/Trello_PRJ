const { DataTypes } = require("sequelize");
const sequelize = require("../mysql");

const comment = sequelize.define("comments", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

module.exports = comment;
