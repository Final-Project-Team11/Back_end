const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const CustomError = require("../middlewares/errorHandler");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        // 나중에 지울 콘솔
        console.log(authorization);
        const [authType, authToken] = (authorization ?? "").split(" ");

        if (authType !== "Bearer" || !authToken) {
            throw new CustomError("로그인이 필요한 기능입니다.", 401);
        }

        const { userId, authLevel, teamName } = jwt.verify(
            authToken,
            "tempKey"
        );
        if (authLevel > 2) {
            throw new CustomError("해당 권한이 존재하지 않습니다.", 401);
        }
        const user = await Users.findOne({ where: { userId } });
        console.log(user);
        res.locals.user = user;
        next();
    } catch (err) {
        console.error(err);
        (err.message = !err.expect
            ? err.message
            : "전달된 쿠키에서 오류가 발생하였습니다."),
            (err.status = !err.expect ? err.status : 403);
        next(err);
    }
};
