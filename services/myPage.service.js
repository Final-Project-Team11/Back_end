const MypageRepository = require("../repositories/myPage.repository.js");
const CustomError = require("../middlewares/errorHandler");
class MypageService {
    constructor() {
        this.MypageRepository = new MypageRepository();
    }
    getTodos = async ({ userId }) => {
        const existCategory = await this.MypageRepository.findAllCategory({
            userId,
        });

        const list = await Promise.all(
            existCategory.map(async (todo) => {
                const categoryId = todo.categoryId;
                const existTodos = await this.MypageRepository.findAlltodos({
                    userId,
                    categoryId,
                });
                return {
                    categoryId: todo.categoryId,
                    categoryName: todo.categoryName,
                    todos: existTodos,
                };
            })
        );
        return list;
    };

    createCategory = async ({ userId, category }) => {
        await this.MypageRepository.createCategory({ userId, category });
    };
    checkCategory = async ({ categoryId, userId }) => {
        const existCategory = await this.MypageRepository.findOneCategory({
            categoryId,
        });
        if (!existCategory) {
            throw new CustomError("존재하지 않는 카테고리입니다.", 401);
        } else if (existCategory.userId !== userId) {
            throw new CustomError("해당 카테고리에 대한 권한이 없습니다.", 401);
        }
    };
    checkTodo = async ({ todoId, userId }) => {
        const existTodos = await this.MypageRepository.findOneTodo({ todoId });
        if (!existTodos) {
            throw new CustomError("존재하지 않는 투두리스트입니다.", 401);
        } else if (existTodos.userId !== userId) {
            throw new CustomError(
                "해당 투두리스트에 대한 권한이 없습니다.",
                401
            );
        }
        return existTodos;
    };
    createTodo = async ({ userId, categoryId, content, isDone }) => {
        await this.MypageRepository.createTodo({
            userId,
            categoryId,
            content,
            isDone,
        });
    };
    deleteCategory = async ({ categoryId, userId }) => {
        await this.MypageRepository.deleteCategory({ categoryId, userId });
    };
    deleteTodo = async ({ todoId, userId }) => {
        await this.MypageRepository.deleteTodo({ todoId, userId });
    };
    completeTodo = async ({ userId, todoId, existTodos }) => {
        let message;
        let isDone;
        if (existTodos.isDone === false) {
            isDone = true;
            await this.MypageRepository.updateTodo({ userId, todoId, isDone });
            message = "투두 리스트가 체크되었습니다.";
            return message;
        } else if (existTodos.isDone === true) {
            isDone = false;
            await this.MypageRepository.updateTodo({ userId, todoId, isDone });
            message = "투두 리스트가 체크 해제되었습니다.";
            return message;
        }
    };
}

module.exports = MypageService;
