const MainPageService = require('../../../services/mainPage.service')
const CustomError = require('../../../middlewares/errorHandler')
const {
    mockData,
    vacationData,
    scheduleData,
    reportData,
    otherData,
    meetingReportData,
    issueData,
    meetingData,
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
});

const teamName = '개발팀'

describe('MainPageService Test', () => {
    let mainPageService = new MainPageService()
    mainPageService.mainPageRepository = mockMainPageRepository()

    beforeEach(() => {
        // 모든 mock을 초기화 합니다.
        jest.resetAllMocks();
    })

    test('findTotalVacation', async() => {

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

    test('findTotalSchedule', async() => {
        // mockMainPageRepository에서 findTeamName 메소드가 호출될 때 반환될 가짜 데이터를 설정한다.
        mainPageService.mainPageRepository.findTeamName.mockResolvedValue({teamName});
        mainPageService.mainPageRepository.findTotalSchedule.mockResolvedValue(scheduleData);
        mainPageService.mainPageRepository.findTotalReport.mockResolvedValue(reportData);
        mainPageService.mainPageRepository.findTotalOther.mockResolvedValue(otherData);
        mainPageService.mainPageRepository.findTotalMeetingReport.mockResolvedValue(meetingReportData);
        mainPageService.mainPageRepository.findTotalIssue.mockResolvedValue(issueData);
        mainPageService.mainPageRepository.findTotalMeeting.mockResolvedValue(meetingData);

        const result = await mainPageService.findTotalSchedule(mockData)

        expect(result).toEqual({
            teamName,
            schedule: scheduleData,
            report: reportData,
            other: otherData,
            issue: issueData,
            meeting: meetingData,
            meetingReport: meetingReportData,
        })
    })
})