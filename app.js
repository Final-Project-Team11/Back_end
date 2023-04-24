const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const logger = require("./config/logger");
const { sequelize } = require("./models/index.js");
const morganMiddleware = require("./middlewares/morgan-middleware.js");
const slackMiddleware = require("./middlewares/slack-middleware")
const indexRouter = require("./routes/index");

app.use(
    cors({
        origin: "*",
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

sequelize
    .sync({ force: false }) // alter: true
    .then(() => {
        console.log("Sync success");
    })
    .catch((error) => {
        console.error("Sync error", error);
    });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morganMiddleware);
app.use("/", indexRouter);

//에러핸들러
app.use((err, req, res, next) => {
    //에러로그파일 생성 및 저장
    const errorstack = err.stack;
    logger.error(errorstack);
    //슬랙에 메세지 전송
    const message = {
        color : '#DC3545',
        title : "에러가 발생했습니다.",
        text : `errorMessage : *[${err.status}]* ${err.message}`,
    }
    slackMiddleware(message)

    return res.status(err.status || 400).json({
        success: false,
        errorMessage: err.message || "예상치 못한 에러가 발생했습니다.",
    });
});

app.listen(3003, () => {
    logger.info("3003 포트로 서버가 열렸어요!");
});
