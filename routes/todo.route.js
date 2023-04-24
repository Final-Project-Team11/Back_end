const express = require("express");
const TodoController = require("../controllers/todo.controller.js");
const todocontroller = new TodoController();

const authmiddleware = require("../middlewares/auth-middleware.js");
const router = express.Router();

//투두리스트 전체 조회
//localhost:3003/feed
router.get("/", authmiddleware, todocontroller.getTodos);

//카테고리 생성
//localhost:3003/feed/category
router.post("/category", authmiddleware, todocontroller.createCategory);

//투두리스트 생성
//localhost:3003/feed/category/{categoryId}/todo
router.post(
    "/category/:categoryId/todo",
    authmiddleware,
    todocontroller.createTodo
);

//카테고리 삭제
//localhost:3003/feed/category/{categoryId}
router.delete(
    "/category/:categoryId",
    authmiddleware,
    todocontroller.deleteCategory
);
//투두리스트 삭제
//localhost:3003/feed/todo/{todoId}
router.delete(
    "/todo/:todoId",
    authmiddleware,
    todocontroller.deleteTodo
);

//투두리스트 체크
//localhost:3003/feed/todo/check/{todoId}
router.patch(
    "/todo/check/:todoId",
    authmiddleware,
    todocontroller.completeTodo
);

//카테고리 수정
//localhost:3003/feed/category/:categoryId
router.patch("/category/:categoryId",authmiddleware,todocontroller.modifyCategory)

//투두리스트 수정
//localhost:3003/feed/todo/:todoId
router.patch("/todo/:todoId",authmiddleware,todocontroller.modifyTodos)


module.exports = router;