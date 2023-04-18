const MainPageService = require('../../../services/mainPage.service')
const CustomError = require('../../../middlewares/errorHandler')

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

const mockData = {
    teamId: 2,
    year: 2023,
    month: 4
}

const teamName = '개발팀'

describe('MainPageService Test', () => {
    let mainPageService = new MainPageService()
    mainPageService.mainPageRepository = mockMainPageRepository()

    beforeEach(() => {
        // 모든 mock을 초기화 합니다.
        jest.resetAllMocks();
    })

    test('findTotalVacation', async() => {
        const vacationData = [
            {
                "eventId": 8,
                "userName": "ju3",
                "startDay": "2023-05-13T00:00:00.000Z",
                "endDay": "2023-05-13T00:00:00.000Z",
                "typeDetail": "반차"
            }
        ]

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
})