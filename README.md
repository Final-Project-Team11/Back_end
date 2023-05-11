# Meer_catlender_BE

![KakaoTalk_20230419_143803835](https://user-images.githubusercontent.com/124577620/232977444-f818b638-3d25-49b8-bc76-494c7564f95e.jpg)

<div align=center><h1>📚 Front-End STACKS</h1></div>
<div align=center> 
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
  <br>
  
  <img src="https://img.shields.io/badge/react query-FF4154?style=for-the-badge&logo=react query&logoColor=white">
  <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled components&logoColor=white">
  <img src="https://img.shields.io/badge/react hook form-EC5990?style=for-the-badge&logo=react hook form&logoColor=white">
  <br>
  
  <img src="https://img.shields.io/badge/react router-CA4245?style=for-the-badge&logo=react router&logoColor=white">
  <img src="https://img.shields.io/badge/recoil-000000?style=for-the-badge&logo=recoli&logoColor=white">
  <img src="https://img.shields.io/badge/toast ui calendar-FF6618?style=for-the-badge&logo=toast ui calendar&logoColor=white">
</div>

<div align=center><h1>📚 Back-End STACKS</h1></div>
<div align=center> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/amazon ec2-FF9900?style=for-the-badge&logo=amazon ec2&logoColor=white">
  <img src="https://img.shields.io/badge/pm2-2B037A?style=for-the-badge&logo=pm2&logoColor=white">
  <br>
  
  <img src="https://img.shields.io/badge/json web tokens-000000?style=for-the-badge&logo=json web tokens&logoColor=white">
  <img src="https://img.shields.io/badge/sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white">
  <img src="https://img.shields.io/badge/jest-C21325?style=for-the-badge&logo=jest&logoColor=white">
  <br>
  
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/github actions-2088FF?style=for-the-badge&logo=github actions&logoColor=white">
  <img src="https://img.shields.io/badge/multer-F46519?style=for-the-badge&logo=multer&logoColor=white">
  <img src="https://img.shields.io/badge/amazon rds-527FFF?style=for-the-badge&logo=amazon rds&logoColor=white">
  <br>
  
  <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/amazon s3-569A31?style=for-the-badge&logo=amazon s3&logoColor=white">
</div>

# 💻ERD
<details>
<summary style="font-size: 20px;">ERD</summary>

![drawSQL-final-export-2023-05-05](https://github.com/Final-Project-Team11/Meer_catlender_BE/assets/70690690/0592d0d4-6398-4ece-be27-bf444222b154)
  
</details>

# 🔫TroubleShooting
<details>
  <summary style="font-size: 20px;">BE</summary>
  <details>
    <summary style="font-size: 20px;">Transaction</summary>
      **문제점1**

- try-catch 구문을 사용해서 트랜잭션을 적용해주었는데 commit은 잘 되지만 rollback이 적용되지 않는다

```jsx
try {
    const { 받아올 내용 } = req.body;
    const t = await sequelize.transaction({
    	isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED, // 트랜잭션 격리 수준을 설정합니다.
	});
   
    await Companys.create({
	// 생성할 내용
    },{ transaction: t })

    await Users.create({
	// 생성할 내용
    },{ transaction: t })

    await t.commit();
    return res.status(200).json({ message: "회원가입에 성공하였습니다." })
} catch (err) {
    await t.rollback();
    next(err)
}
```

**해결 방법**

- try - catch 문에서 트렌젝션을 사용해줄 때 트렌젝션의 정의가 try 구문안에 들어가 있어서 catch 구문에서 사용할 수 없어진게 원인이었다

```jsx
const t = await sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED, // 트랜잭션 격리 수준을 설정합니다.
});
try {
    const { 받아올 내용 } = req.body;
    await Companys.create({
	// 생성할 내용
    },{ transaction: t })

    await Users.create({
	// 생성할 내용
    },{ transaction: t })

    await t.commit();
    return res.status(200).json({ message: "회원가입에 성공하였습니다." })
} catch (err) {
    await t.rollback();
    next(err)
}
```

**문제점 2**

- 3 layer architecture pattern 을 적용해 준 이후에 다시 트랜잭션을 적용하려고 service 단에서 트랜잭션을 설정해주었다.service 단에서 try-catch 구문을 사용해서 정리를 해줬더니 에러가 생겼을 때 **Executing (690518fe-dd6b-406b-90eb-57ee0b951f0c): ROLLBACK;** 이라는 쿼리문이 날아가는 것을 확인할 수 있었다.하지만!!! 쿼리문만 날아가고 실제로 롤백이 되지 않고 있었다.

**해결 방법 2**

- 코드의 흐름이 route → controller → service → repository → service → controller → route 방향으로 움직이기 때문에 아무리 트렌젝션 설정을 service에서 해줘도 repository 에서 실행이 되버린것이다. repository 에서 해당 메소드들에 { transaction: t } 설정을 해주었더니 repository 의 메소드들도 다 트랜젝션으로 묶여서 정상 작동하는 것을 확인할 수 있었다
  </details>
  <details>
    <summary style="font-size: 20px;">한글 제목 파일 업로드</summary>
    **문제점**

업로드하려고 하는 파일의 제목이 한글일 경우 자동으로 **한글 문자열이 인코딩**되어 등록이 됩니다. 하지만 윈도우와 맥의 한글을 만드는 방식의 차이점으로 인해 맥에서 파일을 업로드하면 인코딩 할때 한글이 깨져서 아래와 같이 **인코딩 문자열이 길어지는 현상**이 있었습니다.

![https://user-images.githubusercontent.com/70690690/234678174-cf74c9e6-ab36-41a3-bed6-8dd038076a01.png](https://user-images.githubusercontent.com/70690690/234678174-cf74c9e6-ab36-41a3-bed6-8dd038076a01.png)

하지만 업로드 하려고 하는 파일의 url이 너무길어졌을 때 데이터 베이스에 저장하는 과정에서  마지막 부분이 누락되어 다시 해당 파일을 조회하는 과정에서 SyntaxError: Unexpected end of JSON input 에러가 발생하였습니다. 해당 에러는 JSON.parse() 메소드가 파싱할 JSON 문자열이 유효하지 않은 형식의 JSON 문자열인 경우 발생합니다. 

**해결 방안**

기존에는 FileLocation을 지정해줄 때 아래와 같이 UUID + 파일 이름의 형식으로 지정해주었었다. 저장 되는 File Location에 파일 이름을 함께 넣어주는 이유는 FileLocation에서 **파일 이름만 split()**으로 잘라서 사용하기 위해서 였습니다. 

```jsx
key(req, file, cb) {
    cb(null, `${v4()}_${path.basename(file.originalname)}`); // v4 = uuid 랜덤값
},
```

하지만 ${path.basename(file.originalname)}의 길이가 너무 길어지면 뒷 부분이 잘리는 문제가 생기기 때문에 아래의 코드 처럼 UUID 만으로 File Location을 지정해주고 File Name은 따로 컬럼을 추가해서 저장을 해주었습니다. 

```jsx
key(req, file, cb) {
    cb(null, cb(null, `${v4()}`); // v4 = uuid 랜덤값
},
```
  </details>
  <details>
    <summary style="font-size: 20px;">문자열 글자수 제한 이슈</summary>
    **문제점**

기존에 fileName과 fileLocation 을 조회할 때 아래처럼 GROUP_CONCAT으로 객체 모양의 문자열을 만든 후JSON.parse()로 객체로 바꿔주었다. 하지만 이 경우 Sequelize의 **문자열 제한** 때문에 파일을 여러 개 올리게 되면 조회하는 문자열이 길어져서 뒷부분이 생략되어 조회되는 문제점이 있었다.

```jsx
[
    Sequelize.literal("(SELECT GROUP_CONCAT('{\"fileName\":\"', Files.fileName, '\",\"fileLocation\":\"', Files.fileLocation, '\"}'SEPARATOR '|') FROM Events JOIN Files ON Events.Id = Files.Id WHERE Files.Id = Schedules.Id)"
         ),"files"
     ],
...
...
...
schedules.map((schedule) => {
            if (schedule.files) {
                schedule.files = schedule.files.split("|").map((item) => {
                    return JSON.parse(item)
                })
            }
            return;
        })
```

**해결방법**

1. 첫 번째로 떠오른 해결 방법은 문자열의 제한을 없애거나 엄청 큰 숫자로 만들어주는 것이었다. 하지만 **변수의 값이 클수록 메모리 사용량도 증가**하기 때문에 적절한 방법은 아니라는 판단으로 다른 방법을 찾기로 했다.
2. **JSON_OBJECT** 함수를 사용하면 지정된 키와 값을 가진 JSON 객체를 생성할 수 있다. 해당 함수를 이용해서 배열을 만들면 될 것 같았다.
    
    ```jsx
    JSON_OBJECT('name', name, 'age', age)
    ```
    
3. 가장 처음 찾은 함수는 JSON_OBJECTAGG 함수이다.
    
    JSON_OBJECTAGG 함수를 사용해서 아래처럼 그룹화된 데이터를 JSON 객체 형태로 결합하는 방법을 찾았다. 하지만 해당 함수 꼭 키 값을 지정해야 했기 때문에 {key:{객체}, key:{객체}} 형태로 데이터를 구성하게 되어서 원하는 모양을 만들 수 없었다.
    
    ```jsx
    SELECT JSON_OBJECTAGG(id, JSON_OBJECT('name', name, 'age', age)) as data FROM users
    ```
    
    생성되는 데이터 형태 👇
    
    ```jsx
    {"1":{"name":"Alice","age":30},"2":{"name":"Bob","age":25},"3":{"name":"Charlie","age":35}}
    ```
    
4. 두 번째로 찾은 함수는 **JSON_ARRAYAGG** 함수이다.
    
    JSON_ARRAYAGG 함수는 생성된 모든 JSON 객체들을 **배열 형태**로 묶어서 반환하며 아래와 같이 작성할 수 있다.
    
    ```jsx
    SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'name', name, 'age', age)) as data FROM users
    ```
    
    생성되는 데이터 형태 👇
    
    ```jsx
    [{"id":1, "name":"Alice", "age":30},  {"id":2, "name":"Bob", "age":25},  {"id":3, "name":"Charlie", "age":35}]
    ```
    

🌟 **위에서 찾은 2개의 함수를 이용해서 아래와 같이 코드를 작성해주었다.**🌟

```jsx
[
    Sequelize.literal( "(SELECT JSON_ARRAYAGG(JSON_OBJECT('fileName', Files.fileName, 'fileLocation', Files.fileLocation)) AS files FROM Events JOIN Files ON Events.Id = Files.Id WHERE Files.Id = Schedules.Id)"),"files"
]
```

### **성능개선**

코드수정 후 GROUP_CONCAT으로 만든 문자열을 map()함수를 사용해서 배열을 만들어 주고 JSON.parse()를 해주던 과정이 생략되어서 **클라이언트와 서버 간의 통신 시간을 최적화**할 수 있게 되었다.

**수정 전**

![mypage-1.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5c5912d2-5f21-4c3d-9688-e7a93726ad2d/mypage-1.jpg)

![mypage-3.PNG](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/63dbdbb2-a992-4523-a965-4d6faacdfaab/mypage-3.png)

**수정 후**

![mypage-1_코드수정 후.PNG](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/61d960e1-c32c-4310-8ebe-b2ef4c2c2823/mypage-1_%EC%BD%94%EB%93%9C%EC%88%98%EC%A0%95_%ED%9B%84.png)

![mypage-3.PNG](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8deabd36-b638-406c-ba19-025da9cb3441/mypage-3.png)
  </details>

</details>
