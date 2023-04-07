const express = require("express");
const { CategoryTodos, Todos } = require("../models");
const CustomError = require("../middlewares/errorHandler")
const authmiddleware = require("../middlewares/auth-middleware.js");
const router = express.Router();

//카테고리 생성
//localhost:3003/feed/category
router.post("/feed/category", authmiddleware, async (req, res, next) => {
    const { userId } = res.locals.user;
    const { category } = req.body;
    try {
        await CategoryTodos.create({
            categoryName: category,
            userId,
        });
        res.status(200).json({ message: "카테고리가 추가되었습니다." });
    } catch (err) {
        next(err);
    }
});

//투두리스트 생성
//localhost:3003/feed/category/{categoryId}/todo
router.post(
    "/feed/category/:categoryId/todo",
    authmiddleware,
    async (req, res, next) => {
        const { categoryId } = req.params;
        const { userId } = res.locals.user;
        const { content, isDone } = req.body;
        try {
            const existCategory = await CategoryTodos.findOne({
                where: { categoryId },
            });
            if (!existCategory) {
                throw new CustomError("존재하지 않는 카테고리입니다.", 401);
            } else if (existCategory.userId !== userId) {
                throw new CustomError(
                    "해당 카테고리에 대한 권한이 없습니다.",
                    401
                );
            }

            await Todos.create({
                userId,
                categoryId,
                todo: content,
                isDone: false,
            });

            res.status(200).json({ message: "투두리스트가 추가되었습니다." });
        } catch (err) {
            next(err);
        }
    }
);

//카테고리 삭제
//localhost:3003/feed/category/{categoryId}
router.delete(
    "/feed/category/:categoryId",
    authmiddleware,
    async (req, res, next) => {
        const { categoryId } = req.params;
        const { userId } = res.locals.user;
        try {
            const existCategory = await CategoryTodos.findOne({
                where: { categoryId },
            });
            if (!existCategory) {
                throw new CustomError("존재하지 않는 카테고리입니다.", 401);
            } else if (existCategory.userId !== userId) {
                throw new CustomError(
                    "해당 카테고리에 대한 권한이 없습니다.",
                    401
                );
            }
            await CategoryTodos.destroy({ where: { categoryId, userId } });
            res.status(200).json({ message: "카테고리가 삭제되었습니다." });
        } catch (err) {
            next(err);
        }
    }
);
//투두리스트 삭제
//localhost:3003/feed/todo/{todoId}
router.delete("/feed/todo/:todoId", authmiddleware, async (req, res, next) => {
    const { todoId } = req.params;
    const { userId } = res.locals.user;
    try {
        const existTodos = await Todos.findOne({
            where: { todoId },
        });
        if (!existTodos) {
            throw new CustomError("존재하지 않는 투두리스트입니다.", 401);
        } else if (existTodos.userId !== userId) {
            throw new CustomError(
                "해당 투두리스트에 대한 권한이 없습니다.",401
            );
        }
        await Todos.destroy({ where: { todoId, userId } });
        res.status(200).json({ message: "투두리스트가 삭제되었습니다." });
    } catch (err) {
        next(err);
    }
});
module.exports = router;
