
const UserManageController = require("../../../controllers/userManage.controller");
const CustomError = require("../../../middlewares/errorHandler");
const httpMocks = require('node-mocks-http');
const { invalidCreateUserData,createUserData,searchUsersListData,usersListData,invalidUserUpdateData, teamsList, userUpdateData } = require('../../fixtures/userManage.fixtures');
jest.mock('../../../schemas/userManage.schema')
const { userCreateSchema, userUpdateSchema, options } = require('../../../schemas/userManage.schema')

const mockUserManageService = () => ({
    findTeamsList: jest.fn(),
    updateUser: jest.fn(),
    companyUserList: jest.fn(),
    deleteUser: jest.fn(),
    searchUser: jest.fn(),
    checkUserId: jest.fn(),
    createUser: jest.fn()

})
let next = jest.fn()
let req = httpMocks.createRequest();
let res = httpMocks.createResponse();

describe("userManageController", () => {
    let userManageController = new UserManageController()
    userManageController.userManageService = mockUserManageService()
    console.log(userManageController)
    afterEach(() => {
        jest.resetAllMocks();
    });
    beforeEach(() => {
        jest.clearAllMocks();
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        res.locals.user = {
            companyId: 'sparta',
        }
    });


    test("팀목록 조회 성공시 teamList 반환", async () => {
        console.log(teamsList)
        userManageController.userManageService.findTeamsList = jest.fn(() => {
            return teamsList
        })
        await userManageController.teamsList(req, res, next)
        console.log(res._getStatusCode())
        console.log(res._getJSONData())
        expect(
            userManageController.userManageService.findTeamsList
        ).toHaveBeenCalledTimes(1);
        expect(
            res._getStatusCode()
        ).toBe(200);

        expect(next).not.toHaveBeenCalled()

    })


    test("팀목록 조회 실패시 next(err) 호출", async () => {
        // given
        console.log(teamsList)
        userManageController.userManageService.findTeamsList = jest.fn(() => {
            throw new CustomError("예상하지 못한 에러")
        })

        // when
        await userManageController.teamsList(req, res, next)
        console.log("Raw response data:", res._getData());

        // then
        expect(
            userManageController.userManageService.findTeamsList
        ).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalled()
        // expect(next).toThrow(new CustomError("예상하지 못한 에러"))
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next).toHaveBeenCalledWith(new CustomError("예상하지 못한 에러"));


    })
    test('updateUser 성공시 성공메세지를 반환해야 합니다.', async () => {
        // given
        console.log(userUpdateData)
        const req = httpMocks.createRequest({
            params: { userId: "myelin23" },
            body: userUpdateData
        });
        console.log(req.params)

        res.locals.user = {
            companyId: 'sparta'
        }
        userManageController.userManageService.updateUser = jest.fn(() => { return res })

        // when
        await userManageController.updateUser(req, res, next);
        console.log("Raw response data:", res._getData());
        // then
        expect(next).not.toHaveBeenCalledWith(expect.any(CustomError));
        // expect(userManageController.userManageService.updateUser).toHaveBeenCalled();

        // 정상적으로 성공했을대 joi validation 검사
        expect(userUpdateSchema.validateAsync).toHaveBeenCalledTimes(1);
        expect(userUpdateSchema.validateAsync).not.toThrow();

        expect(userManageController.userManageService.updateUser).toHaveBeenCalledWith({
            userId: 'myelin23',
            team: '개발팀',
            authLevel: 3,
            rank: '사원',
            job: '개발자',
            companyId: 'sparta',
        });
        expect(res.statusCode).toBe(200);
        console.log("Raw response data:", res._getData());
        console.log("JSON response data:", res._getJSONData());
        expect(res._getJSONData()).toEqual({
            message: '해당 유저의 정보가 수정되었습니다.',
        });
    });

    test('updateUser 실패 시 에러 메세지를 반환해야 합니다.', async () => {
        // given
        const req = httpMocks.createRequest({
            params: { userId: "myelin23" },
            body: invalidUserUpdateData
        });

        res.locals.user = {
            companyId: 'sparta'
        };
        userManageController.userManageService.updateUser = jest.fn(() => {
            return res;
        });

        userUpdateSchema.validateAsync = jest.fn(() => {
            throw new Error("Validation Error");
        });

        // when
        await userManageController.updateUser(req, res, next);


        // then
        expect(userManageController.userManageService.updateUser).not.toHaveBeenCalled();
        expect(userUpdateSchema.validateAsync).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
    });


    test("usersList 성공 시 유저 리스트를 반환해야 합니다.", async () => {
        // given
        req.query = { teamId: 1 };
        userManageController.userManageService.companyUserList = jest.fn(() => {
            return usersListData;
        });

        // when
        await userManageController.usersList(req, res, next);
        console.log("Raw response data:", res._getData());

        // then
        expect(userManageController.userManageService.companyUserList).toHaveBeenCalledTimes(1);
        expect(userManageController.userManageService.companyUserList).toHaveBeenCalledWith({
            companyId: 'sparta',
            teamId: 1,
        });
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({ users: usersListData });
        expect(next).not.toHaveBeenCalled();
    });

    test("usersList 실패 시 next(err) 호출", async () => {
        // given
        req.query = { teamId: 1 };
        userManageController.userManageService.companyUserList = jest.fn(() => {
            throw new CustomError("예상하지 못한 에러");
        });

        // when
        await userManageController.usersList(req, res, next);

        // then
        expect(userManageController.userManageService.companyUserList).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next).toHaveBeenCalledWith(new CustomError("예상하지 못한 에러"));
    });

    test("deleteUser 성공 시 성공 메시지를 반환해야 합니다.", async () => {
        // given
        req.params = { userId: "testUser1" };
        userManageController.userManageService.deleteUser = jest.fn();

        // when
        await userManageController.deleteUser(req, res, next);

        // then
        expect(userManageController.userManageService.deleteUser).toHaveBeenCalledTimes(1);
        expect(userManageController.userManageService.deleteUser).toHaveBeenCalledWith({ userId: 'testUser1' });
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({ message: "해당 유저가 삭제되었습니다." });
        expect(next).not.toHaveBeenCalled();
    });
    test("deleteUser 실패 시 next(err) 호출", async () => {
        // given
        req.params = { userId: "testUser1" };
        userManageController.userManageService.deleteUser = jest.fn(() => {
            throw new CustomError("예상하지 못한 에러");
        });

        // when
        await userManageController.deleteUser(req, res, next);

        // then
        expect(userManageController.userManageService.deleteUser).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next).toHaveBeenCalledWith(new CustomError("예상하지 못한 에러"));
    });
    test("searchUser 성공 시 사용자 목록을 반환해야 합니다.", async () => {
        // given
        req.params = { userName: "김" };
        
        userManageController.userManageService.searchUser = jest.fn(() => searchUsersListData);

        // when
        await userManageController.searchUser(req, res, next);

        // then
        expect(userManageController.userManageService.searchUser).toHaveBeenCalledTimes(1);
        expect(userManageController.userManageService.searchUser).toHaveBeenCalledWith({
            userName: '김',
            userInfo: res.locals.user,
        });
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({ users: searchUsersListData });
        expect(next).not.toHaveBeenCalled();
    });

    test("searchUser 실패 시 next(err) 호출", async () => {
        // given
        req.params = { userName: "김" };
        userManageController.userManageService.searchUser = jest.fn(() => {
            throw new CustomError("예상하지 못한 에러");
        });

        // when
        await userManageController.searchUser(req, res, next);

        // then
        expect(userManageController.userManageService.searchUser).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next).toHaveBeenCalledWith(new CustomError("예상하지 못한 에러"));
    });

    test("checkUserId 성공 시 메시지를 반환해야 합니다.", async () => {
        // given
        req.params = { userId: "test1" };
        userManageController.userManageService.checkUserId = jest.fn();

        // when
        await userManageController.checkUserId(req, res, next);

        // then
        expect(userManageController.userManageService.checkUserId).toHaveBeenCalledTimes(1);
        expect(userManageController.userManageService.checkUserId).toHaveBeenCalledWith({
            userId: 'test1',
        });
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({ message: "사용가능한 아이디입니다.." });
        expect(next).not.toHaveBeenCalled();
    });
    test("checkUserId 실패 시 next(err) 호출", async () => {
        // given
        req.params = { userId: "test1" };
        userManageController.userManageService.checkUserId = jest.fn(() => {
            throw new CustomError("예상하지 못한 에러");
        });

        // when
        await userManageController.checkUserId(req, res, next);

        // then
        expect(userManageController.userManageService.checkUserId).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next).toHaveBeenCalledWith(new CustomError("예상하지 못한 에러"));
    });

    test("createUser 성공 시 메시지를 반환해야 합니다.", async () => {
        // given
        req.body = {
            ...createUserData
        };
        userManageController.userManageService.createUser = jest.fn();

        // when
        await userManageController.createUser(req, res, next);

        // then
        expect(userManageController.userManageService.createUser).toHaveBeenCalledTimes(1);
        expect(userManageController.userManageService.createUser).toHaveBeenCalledWith({
            ...req.body,
            userInfo: res.locals.user,
        });
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({ message: "유저생성에 성공했습니다." });
        expect(next).not.toHaveBeenCalled();
    });

    test('createUser 실패 시 에러 메세지를 반환해야 합니다.', async () => {
        // given
        req.body = invalidCreateUserData

        res.locals.user = {
            companyId: 'sparta'
        };
        userManageController.userManageService.createUser = jest.fn(() => {
            return res;
        });

        userCreateSchema.validateAsync = jest.fn(() => {
            throw new Error("Validation Error");
        });

        // when
        await userManageController.createUser(req, res, next);


        // then
        expect(userManageController.userManageService.createUser).not.toHaveBeenCalled();
        expect(userCreateSchema.validateAsync).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
    });
})