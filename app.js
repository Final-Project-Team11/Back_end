const express = require("express");
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
    .sync({ force: false })
    .then(() => {
        console.log("Sync success");
    })
    .catch((error) => {
        console.error("Sync error", error);
    });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRouter);

app.use((err, req, res, next) => {
    console.log(err);
    return res.status(err.status || 500).json({
        success: err.expect,
        errorMessage: err.message || "서버 에러가 발생했습니다.",
    });
});

app.listen(3003, () => {
    console.log(3003, "포트로 서버가 열렸어요!");
});
