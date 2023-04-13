const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { sequelize } = require("./models/index.js");

const indexRouter = require("./routes/index");

app.use(
    cors({
        origin: "*",
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

sequelize
    .sync({ force: false }) //alter :true
    .then(() => {
        console.log("Sync success");
    })
    .catch((error) => {
        console.error("Sync error", error);
    });

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //배포전에 삭제하기
app.use(express.json());

app.use("/", indexRouter);

app.use((err, req, res, next) => {
    console.log(err);
    return res.status(err.status || 400).json({
        success: false,
        errorMessage: err.message || "예상치 못한 에러가 발생했습니다.",
    });
});

app.listen(3003, () => {
    console.log(3003, "포트로 서버가 열렸어요!");
});


