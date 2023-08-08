require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const sequelize = require("./database/mysql");
require("./database/models/index");

const app = express();
const router = require("./routes");

app.use(cookieParser());
app.use(express.json());
app.use("/", router);

// db sync
(async () => {
  try {
    await sequelize.sync();
    app.listen(process.env.PORT, () => {
      console.log(
        `${process.env.PORT} 서버가 켜졌습니다 :ok_손_모양::ok_손_모양:`,
      );
    });
  } catch (error) {
    console.error("DB 연결 오류:", error);
  }
})();
