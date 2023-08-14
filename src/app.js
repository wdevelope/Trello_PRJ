require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const sequelize = require("./database/mysql");
const cors = require("cors");
require("./database/models/index");

const app = express();
const router = require("./routes");

app.use(cookieParser());
app.use(express.json());
app.use("/", router);
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.static(__dirname + "/public"));

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// db sync
if (process.env.NODE_ENV !== "test") {
  (async () => {
    try {
      await sequelize.sync();
      app.listen(process.env.PORT, () => {
        console.log(`${process.env.PORT} 서버가 켜졌습니다 👌👌`);
      });
    } catch (error) {
      console.error("DB 연결 오류:", error);
    }
  })();
}

module.exports = app; // app 객체를 모듈로 export
