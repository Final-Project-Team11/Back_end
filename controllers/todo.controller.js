const Joi = require("joi");
const CustomError = require("../middlewares/errorHandler");
const TodoService = require("../services/todo.service.js");
class TodoController {
    constructor() {
        this.TodoService = new TodoService();
    }
    getTodos = async (req, res, next) => {
        const { userId } = res.locals.user;
        try {
            //투두리스트 가져오기
            const list = await this.TodoService.getTodos({ userId });
            res.status(200).json({ feed: list });
        } catch (err) {
            next(err);
        }
    };

    createCategory = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { category } = req.body;
        //Joi
        const schema = Joi.object({
            category: Joi.string().required().messages({
                "string.base": "category 필드는 문자열로 이루어져야 합니다.",
                "string.empty": "카테고리를 입력해 주세요.",
                "any.required": "필수입력값을 입력해주세요",
            }),
        });
        try {
            const validate = schema.validate({ category });

            if (validate.error) {
                throw new CustomError(validate.error.message, 401);
            } else {
                console.log("Valid input!");
            }
            //카테고리 생성
            await this.TodoService.createCategory({ userId, category });
            res.status(200).json({ message: "카테고리가 추가되었습니다." });
        } catch (err) {
            next(err);
        }
    };

    createTodo = async (req, res, next) => {
        const { categoryId } = req.params;
        const { userId } = res.locals.user;
        const { content } = req.body;
        //Joi
        const schema = Joi.object({
            content: Joi.string().required().messages({
                "string.base": "content 필드는 문자열로 이루어져야 합니다.",
                "string.empty": "투드리스트를 입력해 주세요.",
                "any.required": "필수입력값을 입력해주세요",
            }),
        });
        try {
            const validate = schema.validate({ content });
            if (validate.error) {
                throw new CustomError(validate.error.message, 401);
            } else {
                console.log("Valid input!");
            }
            //카테고리에 대한 권한 체크
            await this.TodoService.checkCategory({ categoryId, userId });
            //투두리스트 생성
            await this.TodoService.createTodo({
                userId,
                categoryId,
                content,
                isDone: false,
            });
            res.status(200).json({ message: "투두리스트가 추가되었습니다." });
        } catch (err) {
            next(err);
        }
    };

    deleteCategory = async (req, res, next) => {
        const { categoryId } = req.params;
        const { userId } = res.locals.user;
        try {
            //카테고리에 대한 권한 체크
            await this.TodoService.checkCategory({ categoryId, userId });
            //카테고리 삭제
            await this.TodoService.deleteCategory({ categoryId, userId });
            res.status(200).json({ message: "카테고리가 삭제되었습니다." });
        } catch (err) {
            next(err);
        }
    };

    deleteTodo = async (req, res, next) => {
        const { todoId } = req.params;
        const { userId } = res.locals.user;
        try {
            //투두리스트 권한 체크
            await this.TodoService.checkTodo({ todoId, userId });
            //투두리스트 삭제
            await this.TodoService.deleteTodo({ todoId, userId });
            res.status(200).json({ message: "투두리스트가 삭제되었습니다." });
        } catch (err) {
            next(err);
        }
    };

    completeTodo = async (req, res, next) => {
        const { todoId } = req.params;
        const { userId } = res.locals.user;
        try {
            //투두리스트 권한 체크
            const existTodos = await this.TodoService.checkTodo({
                todoId,
                userId,
            });
            //체크, 체크해제 처리
            const message = await this.TodoService.completeTodo({
                userId,
                todoId,
                existTodos,
            });
            res.status(200).json({ message: message });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = TodoController;
