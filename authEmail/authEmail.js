module.exports = function getEmailVerificationTemplate(number) {
    return `
    <html>
    <head></head>
    <body>
    <div
    style="
    width: 600px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 1px 1px 1px 1px #E64042;
    border-radius: 10px;
    overflow: hidden;
    " >
    <div style="
    width: 100%;
    height: 80px;
    color: white;
    background: #E64042;
    padding-left: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content:
    flex-start;
    font-size: 40px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    ">Meer : 캣린더</div>
    <p style="font-size: 20px; margin: 40px auto 0;">아래 인증 코드를 입력하여</p>
    <p style="font-size: 20px; margin: 0 auto;" >이메일 인증을 완료할 수 있습니다.</p>
    <div style="width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    margin-top: 30px;
    box-shadow: 1px 1px 1px 1px #E64042;
    border-radius: 10px;
    ">
    <strong style="font-size: 30px;">${number}</strong>
    </div>
    <img style="margin-top: auto; width: 100%; height: 85px;" src="https://github.com/Final-Project-Team11/Meer_catlender_FE/assets/124993422/c7aac152-34cd-40f2-ac32-2528b76f06c5"/>
    </div>
    </body>
    </html>
    `;
}



