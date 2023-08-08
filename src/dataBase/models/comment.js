const { DataTypes } = require("sequelize");
const sequelize = require("../mysql");

const comment = sequelize.define("Comments", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = comment;
