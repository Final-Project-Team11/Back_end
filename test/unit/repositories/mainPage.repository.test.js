const MainPageRepository = require('../../../repositories/mainPage.repository')
const {Users, Schedules, Events, Mentions, Vacations, Meetings, Teams} = require('../../../models')
const { Op, Sequelize } = require('sequelize')
const sinon = require('sinon')
const {
    mockData,
    vacationData,
    scheduleData,
    issueData,
    meetingData,
    eventData,
} = require('../../fixtures/mainPage.fixtures')

describe('findTotalVacation function', () => {
    let mainPageRepository = new MainPageRepository()

    // stub 기능을 사용하여 Sequelize 모델의 메소드를 임시로 대체합니다.
    let eventsFindAllStub;
    beforeEach(() => { // Events.findAll() 메소드를 대체합니다.
        eventsFindAllStub = sinon.stub(Events, 'findAll');
    });
    afterEach(() => { // 스텁을 복원하여 원래의 동작으로 복구합니다.
        eventsFindAllStub.restore();
    });
    
    test('should call Events.findAll method with the correct parameters', async () => {
        const startDate = new Date(mockData.year, mockData.month - 1, 1);
        const endDate = new Date(mockData.year, mockData.month, 0);
        
        eventsFindAllStub.resolves([]);
    
        const result = await mainPageRepository.findTotalVacation(mockData);
    
        expect(result).toEqual([]);
        expect(eventsFindAllStub.calledOnce).toBe(true);
        expect(eventsFindAllStub.args[0][0]).toEqual({
            raw: true,
            where: {
                calendarId: '4',
                [Op.and]: [
                    {
                        '$Vacation.start$': {
                            [Op.between]: [startDate, endDate],
                        },
                    },
                    {
                    '$Vacation.end$': {
                            [Op.between]: [startDate, endDate],
                        },
                    },
                ],
            },
            attributes: [
                'Id',
                [Sequelize.col('User.userName'), 'userName'],
                [Sequelize.col('Vacation.userId'), 'userId'],
                [Sequelize.col('Vacation.start'), 'start'],
                [Sequelize.col('Vacation.end'), 'end'],
                [Sequelize.col('Vacation.typeDetail'), 'typeDetail'],
                'isReadOnly',
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                    where: {
                        teamId: mockData.teamId,
                    },
                },
                {
                    model: Vacations,
                    attributes: [],
                    as: 'Vacation',
                },
            ],
        });
    });
});