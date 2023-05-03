const VacationManageController = require("../../../controllers/vacationManage.controllers");
const CustomError = require("../../../middlewares/errorHandler");
const httpMocks = require('node-mocks-http');
const { vacationDetailData, vacationListData } = require('../../fixtures/vacationManage.fixtures');


const mockVacationManageService = () => ({
    vacationDeny: jest.fn(),
    vacationAccept: jest.fn(),
    vacationDetail: jest.fn(),
    vacationList: jest.fn(),
})
let next = jest.fn()
let req = httpMocks.createRequest();
let res = httpMocks.createResponse();

describe('vacationManageController', () => {
    let vacationManageController = new VacationManageController()
    vacationManageController.vacationManageService = mockVacationManageService()

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

    test('휴가 결제  전체조회 성공시 vacationList 반환', async () => {
        // given
        vacationManageController.vacationManageService.vacationList = jest.fn(() => {
            return vacationListData
        })

        // when
        await vacationManageController.vacationList(req, res, next)

        // then
        expect(vacationManageController.vacationManageService.vacationList).toHaveBeenCalledTimes(1)
    })

    test('휴가 결제 전체조회 실패시 next(err) 호출', async () => {
        // given
        vacationManageController.vacationManageService.vacationList = jest.fn(() => {
            throw new CustomError("예상하지 못한 에러")
        })

        // when
        await vacationManageController.vacationList(req, res, next)

        // then
        expect(next).toHaveBeenCalled()
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next).toHaveBeenCalledWith(new CustomError("예상하지 못한 에러"));

    })

    test('휴가 결제 상세조회 성공시 vacationDetail 반환', async () => {
        // given
        req.params = { Id: 192 }
        vacationManageController.vacationManageService.vacationDetail = jest.fn(() => {
            return vacationDetailData
        })

        // when
        await vacationManageController.vacationDetail(req, res, next)

        // then
        expect(vacationManageController.vacationManageService.vacationDetail).toHaveBeenCalledTimes(1)
        expect(res._getJSONData()).toEqual(vacationDetailData)
        expect(res._getStatusCode()).toBe(200);
    })

    test('휴가 결제 상세조회 실패시 next(err) 호출', async () => {
        // given
        req.params = { Id: 192 }
        vacationManageController.vacationManageService.vacationDetail = jest.fn(() => {
            throw new CustomError("예상하지 못한 에러")
        })

        // when
        await vacationManageController.vacationDetail(req, res, next)

        // then
        expect(next).toHaveBeenCalled()
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next).toHaveBeenCalledWith(new CustomError("예상하지 못한 에러"));
    })

    test('휴가 결제 수락 성공시 성공메세지 반환', async () => {
        // given
        req.params = { Id: 192 }
        vacationManageController.vacationManageService.vacationAccept = jest.fn(() => {
        })

        // when
        await vacationManageController.vacationAccept(req, res, next)

        //then
        expect(res._getJSONData()).toEqual({ message: '휴가가 등록되었습니다.' })
        expect(next).not.toHaveBeenCalled()

    })

    test('휴가 결제 수락 실패시 next(err) 호출', async () => {
        // given
        req.params = { Id: 192 }
        vacationManageController.vacationManageService.vacationAccept = jest.fn(() => {
            throw new CustomError("예상하지 못한 에러")
        })

        // when
        await vacationManageController.vacationAccept(req, res, next)

        // then
        expect(next).toHaveBeenCalled()
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next).toHaveBeenCalledWith(new CustomError("예상하지 못한 에러"));

    })

    test('휴가 결제 반려 성공시 성공메세지 반환', async () => {
        // given
        req.params = { Id: 192 }
        vacationManageController.vacationManageService.vacationDeny = jest.fn(() => {
        })

        // when
        await vacationManageController.vacationDeny(req, res, next)

        //then
        expect(res._getJSONData()).toEqual({ message: '휴가 승인 거절되었습니다.' })
        expect(next).not.toHaveBeenCalled()

    })

    test('휴가 결제 반려 실패시 next(err) 호출', async () => {
        // given
        req.params = { Id: 192 }
        vacationManageController.vacationManageService.vacationDeny = jest.fn(() => {
            throw new CustomError("예상하지 못한 에러")
        })

        // when
        await vacationManageController.vacationDeny(req, res, next)

        // then
        expect(next).toHaveBeenCalled()
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next).toHaveBeenCalledWith(new CustomError("예상하지 못한 에러"));

    })
})