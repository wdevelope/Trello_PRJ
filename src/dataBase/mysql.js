const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const { MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_HOST } =
  process.env;

const sequelize = new Sequelize(
  MYSQL_DATABASE,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  {
    host: MYSQL_HOST,
    dialect: "mysql",
  },
);

module.exports = sequelize;
