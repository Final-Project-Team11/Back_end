const MainPageController = require('../../../controllers/mainPage.controller')
const CustomError = require('../../../middlewares/errorHandler')

const mockMainPageService = () => ({
    findTotalVacation: jest.fn(),
    findTotalschedule: jest.fn(),
});

// mockRequest
let req = {
    params: {
        teamId : 2
    },
    query: {
        year: 2023,
        month: 4
    }
};

// mockResponse
let res = {
    status: jest.fn(),
    json: jest.fn(),
};

let next = jest.fn()

describe("MainPageController Test", () => {
    let mainPageController = new MainPageController()
    mainPageController.mainPageService = mockMainPageService();

    beforeEach(() => {
        // 모든 mock을 초기화 합니다.
        jest.resetAllMocks();
    })

    test('findTotalVacation이 성공하였을 때', async() => {
        res.status = jest.fn(() => {
            return res;
        });
        let findTotalVacationReturnValue;
        mainPageController.mainPageService.findTotalVacation = jest.fn(() => {
            return findTotalVacationReturnValue
        })

        await mainPageController.findTotalVacation(req, res, next);

        // findTotalVacation은 몇번 호출 되었는가
        expect(
            mainPageController.mainPageService.findTotalVacation
        ).toHaveBeenCalledTimes(1)

        // findTotalVacation은 어떤 값으로 호출되었는가
        expect(
            mainPageController.mainPageService.findTotalVacation
        ).toHaveBeenCalledWith({
            teamId: 2, 
            year: 2023, 
            month: 4
        })

        // findTotalVacation의 status의 반환값은 무었인가
        expect(res.status).toHaveBeenCalledWith(200)
        // findTotalVacation의 json의 반환값을 무엇인가.
        expect(res.json).toHaveBeenCalledWith({ main: findTotalVacationReturnValue})
        // findTotalVacation은 next를 호출하지 않음
        expect(next).not.toHaveBeenCalled();
    })
})