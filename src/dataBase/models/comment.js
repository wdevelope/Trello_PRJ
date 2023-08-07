const { DataTypes } = require("sequelize");
const sequelize = require("../mysql");

const comment = sequelize.define("Comments", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = comment;
