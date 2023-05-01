const SubmitController = require('../../../controllers/submit.controller')
const sinon = require('sinon')

const {scheduleSchema} = require("../../../schemas")

const {
    mockFiles,
    locals,
    scheduleData,
} = require('../../fixtures/submit.fixtures')

const mockSubmitService = () => ({
    scheduleSubmit : jest.fn()
})

describe("scheduleSubmit Test", () => {
    let submtiController = new SubmitController()
    submtiController.submitService = mockSubmitService()

    beforeEach(() => {
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
})