const ScheduleManageController = require("../../../controllers/scheduleManage.controllers");
const CustomError = require("../../../middlewares/errorHandler");
const httpMocks = require('node-mocks-http');
const { scheduleDetailData, scheduleListData } = require('../../fixtures/scheduleManage.fixtures');


const mockScheduleManageService = () => ({
    scheduleDeny: jest.fn(),
    scheduleAccept: jest.fn(),
    scheduleDetail: jest.fn(),
    scheduleList: jest.fn(),
})
let next = jest.fn()
let req = httpMocks.createRequest();
let res = httpMocks.createResponse();

describe('scheduleManageController', () => {
    let scheduleManageController = new ScheduleManageController()
    scheduleManageController.scheduleManageService = mockScheduleManageService()

    afterEach(() => {
        jest.resetAllMocks()
    })
    beforeEach(() => {
        jest.clearAllMocks();
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        res.locals.user = {
            companyId: 'sparta',
        }
    })

    test('팀 출장 전체조회 성공시 scheduleList 반환', async () => {
        // given
        scheduleManageController.scheduleManageService.scheduleList = jest.fn(() => {
            return scheduleListData
        })

        // when
        await scheduleManageController.scheduleList(req, res, next)

        // then
        expect(scheduleManageController.scheduleManageService.scheduleList).toHaveBeenCalledTimes(1)
    })

    test('팀 출장 전체조회 실패시 next(err) 호출', async () => {
        // given
        scheduleManageController.scheduleManageService.scheduleList = jest.fn(() => {
            throw new CustomError("예상하지 못한 에러")
        })

        // when
        await scheduleManageController.scheduleList(req, res, next)

        // then
        expect(next).toHaveBeenCalled()
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next).toHaveBeenCalledWith(new CustomError("예상하지 못한 에러"));

    })

    test('출장 상세조회 성공시 scheduleDetail 반환', async () => {
        // given
        req.params = { Id: 192 }
        scheduleManageController.scheduleManageService.scheduleDetail = jest.fn(() => {
            return scheduleDetailData
        })

        // when
        await scheduleManageController.scheduleDetail(req, res, next)

        // then
        expect(scheduleManageController.scheduleManageService.scheduleDetail).toHaveBeenCalledTimes(1)
        expect(res._getJSONData()).toEqual(scheduleDetailData)
        expect(res._getStatusCode()).toBe(200);
    })

    test('출장 상세조회 실패시 next(err) 호출', async () => {
        // given
        req.params = { Id: 192 }
        scheduleManageController.scheduleManageService.scheduleDetail = jest.fn(() => {
            throw new CustomError("예상하지 못한 에러")
        })

        // when
        await scheduleManageController.scheduleDetail(req, res, next)

        // then
        expect(next).toHaveBeenCalled()
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next).toHaveBeenCalledWith(new CustomError("예상하지 못한 에러"));
    })

    test('출장 수락 성공시 성공메세지 반환', async () => {
        // given
        req.params = { Id: 192 }
        scheduleManageController.scheduleManageService.scheduleAccept = jest.fn(() => {
        })

        // when
        await scheduleManageController.scheduleAccept(req, res, next)

        //then
        expect(res._getJSONData()).toEqual({ message: '일정 결제 수락했습니다.' })
        expect(next).not.toHaveBeenCalled()

    })

    test('출장 수락 실패시 next(err) 호출', async () => {
        // given
        req.params = { Id: 192 }
        scheduleManageController.scheduleManageService.scheduleAccept = jest.fn(() => {
            throw new CustomError("예상하지 못한 에러")
        })

        // when
        await scheduleManageController.scheduleAccept(req, res, next)

        // then
        expect(next).toHaveBeenCalled()
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next).toHaveBeenCalledWith(new CustomError("예상하지 못한 에러"));

    })

    test('출장 반려 성공시 성공메세지 반환', async () => {
        // given
        req.params = { Id: 192 }
        scheduleManageController.scheduleManageService.scheduleDeny = jest.fn(() => {
        })

        // when
        await scheduleManageController.scheduleDeny(req, res, next)

        //then
        expect(res._getJSONData()).toEqual({ message: '일정 결제 승인 거절되었습니다.' })
        expect(next).not.toHaveBeenCalled()

    })

    test('출장 반려 실패시 next(err) 호출', async () => {
        // given
        req.params = { Id: 192 }
        scheduleManageController.scheduleManageService.scheduleDeny = jest.fn(() => {
            throw new CustomError("예상하지 못한 에러")
        })

        // when
        await scheduleManageController.scheduleDeny(req, res, next)

        // then
        expect(next).toHaveBeenCalled()
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next).toHaveBeenCalledWith(new CustomError("예상하지 못한 에러"));

    })
})