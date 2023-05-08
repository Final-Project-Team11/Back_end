const nodemailer = require('nodemailer');
const env = process.env;

const smtpTransport = nodemailer.createTransport({
    service: "Naver",
    host: 'smtp.naver.com',
    port: 587,
    secure: false,
    auth: {
        user: env.EMAIL_ID,
        pass: env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false //보안인증서 검사 수행안함
    }
});

module.exports = {
    smtpTransport
}