const MypageService = require("../services/myPage.service.js");
class MypageController {
    constructor() {
        this.MypageService = new MypageService();
    }
    getTodos = async (req, res, next) => {
        const { userId } = res.locals.user;
        try {
            //투두리스트 가져오기
            const list = await this.MypageService.getTodos({ userId });
            res.status(200).json({ feed: list });
        } catch (err) {
            next(err);
        }
    };

    createCategory = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { category } = req.body;
        try {
            //카테고리 생성
            await this.MypageService.createCategory({ userId, category });
            res.status(200).json({ message: "카테고리가 추가되었습니다." });
        } catch (err) {
            next(err);
        }
    };

    createTodo = async (req, res, next) => {
        const { categoryId } = req.params;
        const { userId } = res.locals.user;
        const { content, isDone } = req.body;
        try {
            //카테고리에 대한 권한 체크
            await this.MypageService.checkCategory({ categoryId, userId });
            //투두리스트 생성
            await this.MypageService.createTodo({
                userId,
                categoryId,
                content,
                isDone,
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
            await this.MypageService.checkCategory({ categoryId, userId });
            //카테고리 삭제
            await this.MypageService.deleteCategory({ categoryId, userId });
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
            await this.MypageService.checkTodo({ todoId, userId });
            //투두리스트 삭제
            await this.MypageService.deleteTodo({ todoId, userId });
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
            const existTodos = await this.MypageService.checkTodo({
                todoId,
                userId,
            });
            //체크, 체크해제 처리
            const message = await this.MypageService.completeTodo({
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

module.exports = MypageController;
