const httpMocks = require('node-mocks-http');
const managerMiddleware = require('../../../middlewares/managerMiddleware');
const CustomError = require('../../../middlewares/errorHandler');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Users } = require('../../../models');
const { managerUser, user } = require('../../fixtures/userManage.fixtures');

jest.mock('../../../models', () => ({
    Users: {
        findOne: jest.fn(),
    },
}));
// jsonwebtoken 모듈 모킹
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
}));

describe('managerMiddleware', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('managerMiddleware는 authorization 헤더가 없을시 401을 반환해야 합니다.', async () => {
        // given
        const req = httpMocks.createRequest({
            method: 'get',
            url: '/users',
        });

        const res = httpMocks.createResponse();
        const next = jest.fn();

        // when
        await managerMiddleware(req, res, next);
        console.log(req)
        // then
        expect(next).not.toHaveBeenCalledWith();
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next).toHaveBeenCalledWith(new CustomError('로그인이 필요한 기능입니다.', 401));
    });

    it('토큰이 들어왔을시 jwt.verify는 한번 호출 되어야 합니다.', async () => {
        // given
        const req = httpMocks.createRequest({
            method: 'get',
            url: '/users',
            headers: {
                authorization: 'Bearer test_token',
            },
        });
        Users.findOne.mockResolvedValue(managerUser);

        const res = httpMocks.createResponse();
        const next = jest.fn();

        jwt.verify.mockReturnValue(managerUser);

        // when
        await managerMiddleware(req, res, next);

        // then
        expect(jwt.verify).toHaveBeenCalled();
        expect(jwt.verify).toHaveBeenCalledTimes(1);
    });

    it('managerMiddleware 는 권한레벨 3일때 에러를 발생시켜야 합니다.', async () => {
        // given
        const req = httpMocks.createRequest({
            method: 'get',
            url: '/users',
            headers: {
                authorization: 'Bearer test_token',
            },
        });

        const res = httpMocks.createResponse();
        const next = jest.fn();

        jwt.verify.mockReturnValue(user);

        // when
        await managerMiddleware(req, res, next);

        // then
        expect(next).not.toHaveBeenCalledWith();
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next).toHaveBeenCalledWith(new CustomError("해당 권한이 존재하지 않습니다.", 401));
    });
    it('정상토큰이 들어왔을시 res.locals.user가 존재하며, userId, authLevel, teamName, companyId 속성을 가진 객체여야 합니다.', async () => {
        // given
        const req = httpMocks.createRequest({
            method: 'get',
            url: '/users',
            headers: {
                authorization: 'Bearer test_token',
            },
        });
        
        Users.findOne.mockResolvedValue(managerUser);

        const res = httpMocks.createResponse();
        const next = jest.fn();

        jwt.verify.mockReturnValue(managerUser);

        // when
        await managerMiddleware(req, res, next);

        // then
        expect(res.locals.user).toMatchObject(managerUser);
    });
});
