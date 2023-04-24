const CustomError = require("../middlewares/errorHandler");
const TodoService = require("../services/todo.service.js");
const {
    createCategorySchema,
    createTodoSchema,
} = require("../schemas/todo.schema");
class TodoController {
    constructor() {
        this.TodoService = new TodoService();
    }
    getTodos = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            //투두리스트 가져오기
            const list = await this.TodoService.getTodos({ userId });
            res.status(200).json({ feed: list });
        } catch (err) {
            next(err);
        }
    };

    createCategory = async (req, res, next) => {
        const { category } = req.body;
        try {
            const { userId } = res.locals.user;
            await createCategorySchema.validateAsync(req.body).catch((err) => {
                throw new CustomError(err.message, 401);
            });
            //카테고리 생성
            await this.TodoService.createCategory({ userId, category });
            res.status(200).json({ message: "카테고리가 추가되었습니다." });
        } catch (err) {
            next(err);
        }
    };

    createTodo = async (req, res, next) => {
        const { categoryId } = req.params;
        const { content } = req.body;
        try {
            const { userId } = res.locals.user;
            await createTodoSchema.validateAsync(req.body).catch((err) => {
                throw new CustomError(err.message, 401);
            });
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
        try {
            const { userId } = res.locals.user;
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
        try {
            const { todoId } = req.params;
            const { userId } = res.locals.user;
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
        try {
            const { todoId } = req.params;
            const { userId } = res.locals.user;
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

    modifyCategory = async (req, res, next) => {
        const { categoryId } = req.params;
        const { category } = req.body;
        try {
            const { userId } = res.locals.user;
            //카테고리에 대한 권한 체크
            await this.TodoService.checkCategory({ categoryId, userId });
            //카테고리 수정
            await this.TodoService.modifyCategory({ categoryId, userId, category })
            res.status(200).json({ message: "카테고리가 수정되었습니다." })
        } catch (err) {
            next(err)
        }
    }

    modifyTodos = async (req, res, next) => {
        const { todoId } = req.params;
        const { content } = req.body;
        try {
            const { userId } = res.locals.user;
            //투두리스트 권한체크
            await this.TodoService.checkTodo({ todoId, userId });
            //투두리스트 수정
            await this.TodoService.modifyTodos({ todoId, userId, content })
            res.status(200).json({ message: "투두리스트가 수정되었습니다." })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TodoController;
