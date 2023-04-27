const MainPageRepository = require('../../../repositories/mainPage.repository')
const CustomError = require('../../../middlewares/errorHandler')
const { Op } = require('sequelize');

const mockNaverUsersModel = () => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
});