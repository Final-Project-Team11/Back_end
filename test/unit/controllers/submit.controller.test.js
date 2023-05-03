const SubmitController = require('../../../controllers/submit.controller')
const CustomError = require('../../../middlewares/errorHandler')
const sinon = require('sinon')

const {
    scheduleSchema,
    vacationSchema,
} = require("../../../schemas/submit.schema")

const {
    mockFiles,
    scheduleData,
    vacationData,
} = require('../../fixtures/submit.fixtures')

const mockSubmitService = () => ({
    scheduleSubmit : jest.fn(),
    vacationSubmit : jest.fn(),
})

describe("scheduleSubmit Test", () => {
    let submtiController;
    const submitService = mockSubmitService();

    beforeEach(() => {
        submtiController = new SubmitController();
        submtiController.submitService = submitService;

        // 모든 mock을 초기화 합니다.
        jest.resetAllMocks();
    })
    test("scheduleSubmit이 성공하였을 때", async() => {
        const req = {
            body: {
                start: scheduleData.start,
                end: scheduleData.end,
                title: scheduleData.title,
                location: scheduleData.location,
                attendees: scheduleData.attendees,
                body: scheduleData.body
            },
            files: mockFiles
        }
        // 스텁(Stub): 특정 함수를 임의의 값을 반환하도록 대체하여 함수의 동작을 제어할 수 있습니다.
        const res = {
            locals: {
                user: {
                    userId: 'test1',
                    teamId: 'test11'
                }
            },
            status: sinon.stub().returnsThis(),
            send: sinon.stub()
        }
        const next = sinon.stub()

        // 스파이(Spy): 함수 호출 정보를 수집하고 기록하여 함수 호출 정보를 검증할 수 있습니다.
        const scheduleSubmitSpy = sinon.spy(submtiController.submitService, 'scheduleSubmit')

        await submtiController.scheduleSubmit(req, res, next)

        sinon.assert.calledWith(scheduleSubmitSpy, {
            userId: res.locals.user.userId,
            teamId: res.locals.user.teamId,
            start: scheduleData.start,
            end: scheduleData.end,
            title: scheduleData.title,
            location: scheduleData.location,
            attendees: scheduleData.attendees,
            body: scheduleData.body,
            fileLocation: ['fake-location-1', 'fake-location-2'],
            fileName: ['fake-name-1', 'fake-name-2']
        })

        // 함수가 한 번 호출되었는지 검증합니다.
        sinon.assert.calledOnce(res.status);
        // 함수가 200이라는 인자로 호출되었는지 검증합니다.
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledOnce(res.send);
        sinon.assert.calledWith(res.send, { message: '출장 신청이 성공적으로 완료되었습니다.' });
        // 함수가 호출되지 않았는지 검증합니다.
        sinon.assert.notCalled(next);

    })

    test("scheduleSubmit Joi 실패시", async() => {
        const req = {
            body: {
                start: "aaaaa",
                end: scheduleData.end,
                title: scheduleData.title,
                location: scheduleData.location,
                attendees: scheduleData.attendees,
                body: scheduleData.body
            },
            files: mockFiles
        }

        try {
            const result = await scheduleSchema.validateAsync(req.body, { abortEarly: false })
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
            // expect(error.status).toBe(401);
            expect(error.message).toMatch(/start 필드는 날짜로 이루어져야 합니다./);
        }
    })

    test("vacationSubmit이 성공하였을 때", async() => {
        const req = {
            body: {
                start: vacationData.start,
                end: vacationData.end,
                typeDetail: vacationData.typeDetail,
            }
        }
        const res = {
            locals: {
                user: {
                    userId : "test1"
                }
            },
            status: sinon.stub().returnsThis(),
            send: sinon.stub()
        }
        const next = sinon.stub()

        const vacationSubmitSpy = sinon.spy(submtiController.submitService, 'vacationSubmit')

        await submtiController.vacationSubmit(req, res, next)

        sinon.assert.calledWith(vacationSubmitSpy, {
            userId : res.locals.user.userId,
            start: req.body.start,
            end: req.body.end,
            typeDetail: req.body.typeDetail,
        })
        sinon.assert.calledOnce(res.status)
        sinon.assert.calledWith(res.status, 200)
        sinon.assert.calledOnce(res.send)
        sinon.assert.calledWith(res.send, { message : '휴가 신청이 성공적으로 완료되었습니다.'})
        sinon.assert.notCalled(next)
    })

    test("vacationSubmit Joi 실패시", async() => {
        const req = {
            body: {
                start: "aaaaaa",
                end: vacationData.end,
                typeDetail: vacationData.typeDetail,
            }
        }

        try {
            const result = await vacationSchema.validateAsync(req.body, { abortEarly: false })
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toMatch(/start 필드는 날짜로 이루어져야 합니다./);
        }
    })
})