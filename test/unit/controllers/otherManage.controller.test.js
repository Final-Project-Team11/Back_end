const OtherManageController = require("../../../controllers/otherManage.controller");
const CustomError = require("../../../middlewares/errorHandler");
const httpMocks = require('node-mocks-http');
const { otherDetailData, otherListData } = require('../../fixtures/otherManage.fixtures');


const mockOtherManageService = () => ({
    otherDeny: jest.fn(),
    otherAccept: jest.fn(),
    otherDetail: jest.fn(),
    otherList: jest.fn(),
})
let next = jest.fn()
let req = httpMocks.createRequest();
let res = httpMocks.createResponse();

describe('otherManageController', () => {
    let otherManageController = new OtherManageController()
    otherManageController.otherManageService = mockOtherManageService()

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

    test('기타 결제  전체조회 성공시 otherList 반환', async () => {
        // given
        otherManageController.otherManageService.otherList = jest.fn(() => {
            return otherListData
        })

        // when
        await otherManageController.otherList(req, res, next)

        // then
        expect(otherManageController.otherManageService.otherList).toHaveBeenCalledTimes(1)
    })

    test('기타 결제 전체조회 실패시 next(err) 호출', async () => {
        // given
        otherManageController.otherManageService.otherList = jest.fn(() => {
            throw new CustomError("예상하지 못한 에러")
        })

        // when
        await otherManageController.otherList(req, res, next)

        // then
        expect(next).toHaveBeenCalled()
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next).toHaveBeenCalledWith(new CustomError("예상하지 못한 에러"));

    })

    test('기타 결제 상세조회 성공시 otherDetail 반환', async () => {
        // given
        req.params = { Id: 192 }
        otherManageController.otherManageService.otherDetail = jest.fn(() => {
            return otherDetailData
        })

        // when
        await otherManageController.otherDetail(req, res, next)

        // then
        expect(otherManageController.otherManageService.otherDetail).toHaveBeenCalledTimes(1)
        expect(res._getJSONData()).toEqual(otherDetailData)
        expect(res._getStatusCode()).toBe(200);
    })

    test('기타 결제 상세조회 실패시 next(err) 호출', async () => {
        // given
        req.params = { Id: 192 }
        otherManageController.otherManageService.otherDetail = jest.fn(() => {
            throw new CustomError("예상하지 못한 에러")
        })

        // when
        await otherManageController.otherDetail(req, res, next)

        // then
        expect(next).toHaveBeenCalled()
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next).toHaveBeenCalledWith(new CustomError("예상하지 못한 에러"));
    })

    test('기타 결제 수락 성공시 성공메세지 반환', async () => {
        // given
        req.params = { Id: 192 }
        otherManageController.otherManageService.otherAccept = jest.fn(() => {
        })

        // when
        await otherManageController.otherAccept(req, res, next)

        //then
        expect(res._getJSONData()).toEqual({ message: '일정 결제 수락했습니다.' })
        expect(next).not.toHaveBeenCalled()

    })

    test('기타 결제 수락 실패시 next(err) 호출', async () => {
        // given
        req.params = { Id: 192 }
        otherManageController.otherManageService.otherAccept = jest.fn(() => {
            throw new CustomError("예상하지 못한 에러")
        })

        // when
        await otherManageController.otherAccept(req, res, next)

        // then
        expect(next).toHaveBeenCalled()
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next).toHaveBeenCalledWith(new CustomError("예상하지 못한 에러"));

    })

    test('기타 결제 반려 성공시 성공메세지 반환', async () => {
        // given
        req.params = { Id: 192 }
        otherManageController.otherManageService.otherDeny = jest.fn(() => {
        })

        // when
        await otherManageController.otherDeny(req, res, next)

        //then
        expect(res._getJSONData()).toEqual({ message: '일정 결제 승인 거절되었습니다.' })
        expect(next).not.toHaveBeenCalled()

    })

    test('기타 결제 반려 실패시 next(err) 호출', async () => {
        // given
        req.params = { Id: 192 }
        otherManageController.otherManageService.otherDeny = jest.fn(() => {
            throw new CustomError("예상하지 못한 에러")
        })

        // when
        await otherManageController.otherDeny(req, res, next)

        // then
        expect(next).toHaveBeenCalled()
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next).toHaveBeenCalledWith(new CustomError("예상하지 못한 에러"));

    })
})