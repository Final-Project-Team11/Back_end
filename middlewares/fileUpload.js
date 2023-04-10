// multer 모듈
const multer = require("multer");
// path 모듈 불러오기
const path = require("path");
// aws sdk v2 버젼을 사용하기에 multer-s3도 v2용으로
const AWS = require("aws-sdk");
// AWS S3 버킷에 이미지 파일을 저장하고, DB엔 그 버킷의 이미지 파일 경로(이미지 주소)를 저장하고, 서버는 이 경로를 클라이언트로 응답하는 식으로 프로세스를 구축하여야 한다.
const multerS3 = require("multer-s3");
require("dotenv").config();

//* aws region 및 자격증명 설정
AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: "ap-northeast-2",
});

//* AWS S3 multer 설정
const upload = multer({
    //* 저장공간
    // s3에 저장
    storage: multerS3({
        // 저장 위치
        s3: new AWS.S3(),
        bucket: "meer2",
        // public-read : AllUsers그룹이 액세스 READ권한을 얻습니다.
        acl: "public-read", // 보통 게시글의 이미지는 브라우저에 바로 검색해서 볼수 있는 것이 일반적이니 public-read 로 설정하였다.
        //multer-s3가 파일의 내용 유형을 자동으로 찾도록 multerS3.AUTO_CONTENT_TYPE 상수를 사용하여 contentType을 지정하도록 해야 된다.
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key(req, file, cb) {
            cb(null, `${Date.now()}_${path.basename(file.originalname)}`); // original 폴더안에다 파일을 저장
        },
    }),
    //* 용량 제한
    limits: { fileSize: 5 * 1024 * 1024 }, // 5메가로 용량 제한
});

exports.upload = multer(upload);
