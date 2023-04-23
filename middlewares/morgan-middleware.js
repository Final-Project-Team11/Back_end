const morgan = require('morgan');
const logger = require('../config/logger');

// 로그 작성을 위한 Output stream옵션.
const stream = {
   write: (message) => {logger.http(message)} 
};
//에러가 아닐때는 스킵
const skip = (req, res) => res.statusCode < 400

//적용될 moran 미들웨어 형태
const morganMiddleware = morgan("tiny", { stream, skip });

module.exports = morganMiddleware;