const { createLogger, transports, format } = require("winston");
require("winston-daily-rotate-file");
const { combine, colorize, timestamp, printf } = format;

const printLogformat = combine(
    timestamp({
        format: "HH:mm:dd",
    }),
    printf(({ timestamp, level, message }) => {
        //message는 app.js에서 넣어준 message
        return `${timestamp} [${level}] ${message}`;
    })
);

const ConsoleprintLogformat = combine(
    colorize(),
    printf(({ level, message }) => {
        return `[${level}]${message} `;
    })
);
const transport = new transports.DailyRotateFile({
    filename: "errorlogs-%DATE%.log",
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    dirname: "./logs",
    level: "http",
    format: printLogformat,
});

const logger = createLogger({
    transports: [
        transport,
        new transports.Console({  //test환경으로 계속 돌아가는 문제 때문에 여기에
            level: "http",
            format: ConsoleprintLogformat,
        }),
    ],
});

//환경이 production이 아닐때 error로그를 콘솔로도 찍어보자!
//서비스 서버와 개발용 서버를 구분해서 설정하기
// if (process.env.NODE_ENV !== "production") {
//   logger.add(
//     new transports.Console({
//       level: "info",
//       format: ConsoleprintLogformat,
//     })
//   );
// }

module.exports = logger;
