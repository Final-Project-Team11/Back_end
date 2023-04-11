const { CategoryTodos, Todos } = require("../models");
class TodoRepository {
    constructor() {}
    findAllCategory = async ({ userId }) => {
        return await CategoryTodos.findAll({
            where: { userId },
        });
    };

    findAlltodos = async ({ userId, categoryId }) => {
        return await Todos.findAll({
            attributes: ["todoId", "todo", "isDone"],
            where: { userId, categoryId },
        });
    };

    findOneCategory = async ({ categoryId }) => {
        return await CategoryTodos.findOne({
            where: { categoryId },
        });
    };
    findOneTodo = async ({ todoId }) => {
        return await Todos.findOne({
            where: { todoId },
        });
    };

    createCategory = async ({ userId, category }) => {
        await CategoryTodos.create({
            categoryName: category,
            userId,
        });
    };

    createTodo = async ({ userId, categoryId, content, isDone }) => {
        await Todos.create({
            userId,
            categoryId,
            todo: content,
            isDone: false,
        });
    };

    deleteCategory = async ({ categoryId, userId }) => {
        await CategoryTodos.destroy({ where: { categoryId, userId } });
    };

    deleteTodo = async ({ todoId, userId }) => {
        await Todos.destroy({ where: { todoId, userId } });
    };

    updateTodo = async ({ userId, todoId, isDone }) => {
        await Todos.update(
            {
                isDone: isDone,
            },
            {
                where: { userId, todoId },
            }
        );
    };
}

module.exports = TodoRepository;
