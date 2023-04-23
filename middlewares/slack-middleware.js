const axios = require("axios");
require("dotenv").config();
const env = process.env;

const getChannels = () => {
    return {
        production: env.SLACK_ALARM_URI
    };
};

module.exports = async (message) => {
    if (!message) {
        console.log('메시지 포멧이 없습니다.');
        return;
    }
    // 보내줄 메세지 형태 작성
    const data = {
        mrkdwn: true,
        text: '',
        attachments: []
    };
    if (!message.title && !message.text) {
        console.log('메시지 내용이 없습니다.');
        return;
    }
    message.footer = "From Meer API Server";
    data.attachments.push(message);
    // 슬랙에 전송
    axios({
        url: getChannels().production,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    });
};

