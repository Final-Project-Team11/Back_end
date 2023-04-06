const express = require("express");
const UserController = require("../controllers/signup.controller.js");
const usercontroller = new UserController();
const router = express.Router();

//사업자 회원가입 API
//localhost:3003/signUp
router.post("/signUp", usercontroller.companySignup);

//사업자아이디 중복 검사
//localhost:3003/idCheck
router.post("/idCheck", async (req, res, next) => {
    try {
        const { companyId } = req.body;
        const existCompanyId = await Companys.findOne({
            where: { companyId: companyId },
        });
        if (existCompanyId) {
            throw new CustomError("이미 등록된 아이디입니다.", 401);
        } else {
            return res
                .status(200)
                .json({ message: "아이디 중복 검사에 성공했습니다" });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
