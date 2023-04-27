const MainPageService = require('../../../services/mainPage.service')
const CustomError = require('../../../middlewares/errorHandler')
const {
    mockData,
    vacationData,
    scheduleData,
    issueData,
    meetingData,
    eventData,
} = require('../../fixtures/mainPage.fixtures')

const mockMainPageRepository = () => ({
    findTotalVacation: jest.fn(),
    findTotalSchedule: jest.fn(),
    findTotalReport: jest.fn(),
    findTotalOther: jest.fn(),
    findTotalIssue: jest.fn(),
    findTotalMeeting: jest.fn(),
    findTotalMeetingReport: jest.fn(),
    findTeamName: jest.fn(),
    findTotalEvent: jest.fn(),
    findCompanyId: jest.fn()
});

const teamName = '개발팀'

const expectedError = {
    status: 401,
    message: '권한이 존재하지않습니다.'
};

describe('MainPageService Test', () => {
    let mainPageService = new MainPageService()
    mainPageService.mainPageRepository = mockMainPageRepository()

    beforeEach(() => {
        // 모든 mock을 초기화 합니다.
        jest.resetAllMocks();
    })

    test('findTotalVacation', async() => {
        mainPageService.mainPageRepository.findCompanyId.mockResolvedValue({companyId: 2})
        // mockMainPageRepository에서 findTeamName 메소드가 호출될 때 반환될 가짜 데이터를 설정한다.
        mainPageService.mainPageRepository.findTeamName.mockResolvedValue({teamName});

        // mockMainPageRepository에서 findTotalVacation 메소드가 호출될 때 반환될 가짜 데이터를 설정한다.
        mainPageService.mainPageRepository.findTotalVacation.mockResolvedValue(vacationData);

        const result = await mainPageService.findTotalVacation(mockData);

        expect(result).toEqual({
            teamName,
            vacation: vacationData
        })
    })

    test('findTotalVacation 사용자 권한이 존재하지 않을 때', async() => {
        mainPageService.mainPageRepository.findCompanyId.mockResolvedValue({companyId: 4})

        // rejects.toThrow() 메소드를 사용하여 해당 메소드가 에러를 throw하는지 검증합니다.
        expect(mainPageService.findTotalVacation(mockData)).rejects.toThrow(CustomError);
        expect(mainPageService.findTotalVacation(mockData)).rejects.toMatchObject(expectedError);

        expect(mainPageService.mainPageRepository.findCompanyId).toHaveBeenCalledWith(mockData.teamId);
    })

    test('findTotalSchedule', async() => {
        mainPageService.mainPageRepository.findCompanyId.mockResolvedValue({companyId: 2})
        // mockMainPageRepository에서 findTeamName 메소드가 호출될 때 반환될 가짜 데이터를 설정한다.
        mainPageService.mainPageRepository.findTeamName.mockResolvedValue({teamName});
        mainPageService.mainPageRepository.findTotalSchedule.mockResolvedValue(scheduleData);
        mainPageService.mainPageRepository.findTotalIssue.mockResolvedValue(issueData);
        mainPageService.mainPageRepository.findTotalMeeting.mockResolvedValue(meetingData);
        mainPageService.mainPageRepository.findTotalEvent.mockResolvedValue(eventData);

        const result = await mainPageService.findTotalSchedule(mockData)

        expect(result).toEqual({
            teamName,
            schedule: scheduleData,
            issue: issueData,
            meeting: meetingData,
            event: eventData
        })
    })
})