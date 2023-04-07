const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const env = process.env;

module.exports = async (req, res,next) => {
  try {
    // const token = req.headers.authorization;
    const {authorization} = req.cookies; //개발단계에서 확인용
    // console.log("!!!!authorization!!!! : ", authorization);
    const [tokenType, tokendata] = (authorization ?? "").split(" ");
    // console.log("!!!!tokendata!!!! : ", tokendata);

    if (tokenType !== "Bearer" || !tokendata) {
      return res
        .status(401)
        .json({ message: "로그인이 필요한 기능입니다" });
    }
    const decodedToken = jwt.verify(tokendata, env.SECRET_KEY);
    console.log(decodedToken);

    const userId = decodedToken.userId;
    const user = await Users.findOne({ where: { userId } });

    res.locals.user = user;
    console.log(user);
    next();
  } catch (err) {
    next(err)
  }
};
