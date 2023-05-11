![bottom](https://github.com/Final-Project-Team11/Meer_catlender_FE/assets/124993422/c7aac152-34cd-40f2-ac32-2528b76f06c5)

---
# Meer : 캣린더
![image](https://github.com/Final-Project-Team11/Meer_catlender_FE/assets/124577334/eb462824-687b-485c-9223-0399ef3c82a4)

### Together : 2023.03.31 ~ 2023.05.12

---
## Link

### Meer : [캣린더 Notion](https://magical-puppy-b7f.notion.site/Final_Project_Team11-Meer-71cb657348d24b188150a5e12df42b86)
### Meer : [캣린더 Domain](https://meercatlendar.store)
---
## Github

> FE : https://github.com/Final-Project-Team11/Meer_catlender_FE 

> BE : https://github.com/Final-Project-Team11/Meer_catlender_BE

---

## 팀원 소개 


| 역할 | 이름   | 기술 스택 |  Github 링크              |
| --- | ------ | --------- | ------------------------ |
| 팀장 | 최다현 | React     |  https://github.com/choidami5126 |
| 팀원 | 박찬우 | React     |  https://github.com/chanw9503 |
| 팀원 | 송철환 | React     |  https://github.com/SsongCh94 |
| 팀장 | 류현주 | Node      |  https://github.com/ryu820 |
| 팀원 | 주영성 | Node      |  https://github.com/wndudtjd |
| 팀원 | 민수현 | Node      |  https://github.com/SuHyeon-Eleven |
| 귀하신 분 | 이미현 | Designer   | -                        |


## 프로젝트 소개 
Meer : 캣린더는 팀원들이 회사를 다니며 겪었던 불편했던 경험들에 시작되었습니다.

- 여러 상급자에게 결제를 받아야하는 결재 프로세스
- 일정관리, 휴가관리, 사내업무 등을 통합적인 사이트에서 사용하지 못하던 경험
- 휴가를 겹치지 않게 사용하기 위해서 여러 팀원에게 묻고 다녔던 경험
겪었던 불편함들을 개선하고 통합적인 일정&업무 관리 서비스를 기획하게 되었습니다.

---

## 기능 소개

<details>
<summary>회원가입&로그인</summary>

- 회원가입은 `대표 관리자`만 가능합니다.
  
- 대표 관리자는 회원가입 후 좌측 상단 카트 박스에 `유저 관리`를 통해 유저 조회&생성 페이지로 이동하여 `기존 유저를 조회` 하거나 `신규 유저를 생성`할 수 있습니다.
  
- 신규 유저 생성 시 비밀번호는 아이디와 같으며, `최초 로그인 시 변경`합니다.
</details>

<details>
<summary>메인 페이지(캘린더)</summary>

- 우측 상단 `Change Icon`을 통해 `일정 ←→ 휴가 탭`을 변경할 수 있습니다.
  
- 캘린더를 `클릭, 드래그` 하여 일정, 휴가를 생성할 수 있습니다.
  
- 일정 탭에서는 `회의, 이벤트, 출장, 미팅` ****중 선택하여 작성합니다.
  
- 파일을 첨부하거나, 팀원을 멘션할 수 있습니다.
  
- 우측 상단 드롭다운을 통해 `문서류(보고서, 회의록, 결제요청서)`를 작성할 수 있습니다.
  
- 휴가 탭에서는 `휴가, 반차, 연차, 병가`를 선택하여 작성할 수 있습니다.
  
- 좌측 Todo 보드를 통해 내 업무 리스트들을 작성하고, 확인할 수 있습니다.
  
  - **(마이페이지와 연동됩니다.)**
  
- 프로필 카드의 `수정 아이콘`을 통해, 유저의 정보를 수정할 수 있습니다.
  
</details>
  
 <details>
<summary>마이페이지(관리자&직원)</summary> 

- 프로필 카드의 기능은 메인 페이지와 동일합니다.
   
- Todo 리스트의 기능은 메인 페이지와 동일합니다.
   
- 상단 미니 캘린더로 `금주의 일정을 확인`할 수 있고 클릭 시 메인 페이지로 이동합니다.
   
- 좌측 하단 내가 올린 최근 휴가의 `승인, 반려, 대기중` 상태에 따라 아이콘이 변경됩니다.

- **언급된 일정** : 내가 멘션된 일정 리스트를 볼 수 있습니다.(관리자의 경우 모든 일정에 태그 됩니다.)
   
- **보고서** : 팀내에 작성된 보고서 리스트를 볼 수 있습니다.
  - 클릭 시 상세 내용 확인이 가능합니다.
   
- **출장관련/내가 올린 결재** : 
  1. `관리자` 직원이 올린 출장 일정을 확인하고 승인/반려 합니다.
  2. `직원` 내가 올린 결재 리스트와 승인/반려 상태를 확인할 수 있습니다.
   
- 휴가 요청 : 
  1. `관리자`의 경우에만 표출 됩니다. 팀원이 올린 휴가에 대해서 승인/반려 할 수 있습니다.
   
- **회의록, 보고서** : 팀내에 작성된 회의록과 보고서 리스트를 볼 수 있습니다.
  - 클릭 시 상세 내용 확인이 가능합니다
   
- **결재요청/ 내가 올린 파일** : 
  1. `관리자`직원이 올린 결재요청을 확인하고 승인/반려 할 수 있습니다. 
  2. `직원` 팀내에 내가 올린 파일 리스트를 볼 수 있습니다.
   
  </details>

 <details>
<summary>대표 관리자 페이지(유저 조회&생성)</summary> 

- 전체 유저를 조회할 수 있고, `팀별로 필터링, 이름으로 특정 유저를 검색`할 수 있습니다.
     
- 특정 유저 클릭 시 `상세 정보를 조회`할 수 있습니다
     
- 상세 조회 중 유저의 정보를 `수정, 삭제`할 수 있습니다.
     
- 신규 유저 계정을 `생성`할 수 있습니다.
 </details>
  
---
  
## 서비스 아키택쳐

![Service-Architecture (1)](https://github.com/Final-Project-Team11/Meer_catlender_FE/assets/124577334/2d549489-3aaf-40d2-902e-ecc28485db05)

![11조_2차 아키텍처](https://github.com/Final-Project-Team11/Meer_catlender_BE/assets/124577620/f99a2439-4c8b-44b9-9e99-deea8b0e47b9)

---


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

---

# 💻 ERD
<details>
<summary style="font-size: 20px;">ERD</summary>

![drawSQL-final-export-2023-05-05](https://github.com/Final-Project-Team11/Meer_catlender_BE/assets/70690690/0592d0d4-6398-4ece-be27-bf444222b154)
  
</details>

---

# 🔫 TroubleShooting
 <details>
<summary>FE</summary> 
  
  
<details>
<summary>TypeScript</summary> 
  
1. JavaScript는 모든 타입을 받을 수 있어 비교적 빠른 작업이 가능하지만, 가독성과 유지 보수 측면에서 단점이 존재
  
2. TypeScript는 JavaScript의 상위 집합 언어로, 정적 타입 검사와 코드 어시스트 기능 등을 제공하여 코드의 안정성과 가독성을 높여주는 장점을 가짐
    - TypeScript의 정적 타입 검사로 인해 코드가 더 안정적이며, 개발자들이 이해하기 쉬운 코드 작성 가능
  
3. TypeScript는 컴파일 타임에 오류를 잡을 수 있어서 런타임에 발생하는 오류를 미리 방지 가능
    - 컴파일 과정에서 발견되는 오류들로 인해 실행 전에 수정 가능하며, 런타임 오류 발생 확률 감소
  
4. TypeScript는 ES6 이상의 기능을 지원하므로 현재 수요되는 모던한 개발에 적합
    - 최신 JavaScript 기능과 함께 사용 가능하며, 더 나은 개발 경험 제공
  
5. 현재 취업 시장에서는 TypeScript 경험자에 대한 수요가 많으며, TypeScript를 경험하고 익히는 것은 취업 시장에서의 경쟁력을 높이는 데 도움이 될 것으로 예상됨
    - 기업들이 프로젝트의 안정성과 유지 보수를 위해 TypeScript를 선호하고, TypeScript에 익숙한 개발자들을 찾기 때문
  
6. TypeScript는 큰 프로젝트와 협업 시 효과적
    - 정적 타입으로 인해 프로젝트 규모가 커지거나 여러 개발자들과 협업할 때 유리함
    - 코드의 의도와 구조를 명확하게 표현하여 다른 개발자들이 이해하기 쉽게 함
  
7. TypeScript는 커뮤니티 지원이 강함
    - 많은 개발자들이 사용하고 지원하므로, 문제 해결이나 새로운 정보를 얻기 쉬움
        - 많은 라이브러리들이 TypeScript 지원을 제공하며, 타입 정의 파일이 다양하게 존재함
  
</details>
  
  
<details>
<summary>tanstack@react-query</summary> 
    
 1. 데이터 동기화 및 배경 업데이트
     - 데이터를 자동으로 동기화하고 배경에서 업데이트할 수 있습니다. 이를 통해 항상 최신 상태의 데이터를 보여줄 수 있습니다.
  
 2. 쿼리 결과 캐싱 및 공유
     - 동일한 쿼리를 여러 컴포넌트에서 사용할 때, 캐시된 결과를 자동으로 공유하여 중복 요청을 방지하고 성능을 향상시킬 수 있습니다.
  
 3. 복잡한 로딩 상태 처리 간소화
     - React Query는 로딩, 에러, 데이터 상태를 쉽게 관리할 수 있는 훅을 제공하여 복잡한 상태 처리를 간소화합니다.
  
 4. 쿼리 반복 및 자동화
     - 쿼리를 자동으로 반복하거나, 원하는 시점에 재요청할 수 있어서 사용자가 새로고침 없이 새로운 데이터를 확인할 수 있습니다.
  
 5. 데이터 패치 및 최적화
     - 데이터를 서버에서 패치한 후, 캐시를 최적화하고 관련 쿼리를 무효화하여 변경된 데이터를 반영할 수 있습니다.
  
 6. 지연 로딩 및 무한 스크롤 지원
     - React Query를 이용해 지연 로딩과 무한 스크롤 기능을 손쉽게 구현할 수 있습니다.
  
 7. 서버에서의 에러 처리
     - 서버에서 발생한 에러를 쉽게 처리할 수 있으며, 에러를 사용자에게 친절하게 전달할 수 있습니다.
  
 8. 개발자도구 지원
     - React Query Devtools 를 사용하면 쿼리와 캐시의 상태를 실시간으로 확인할 수 있어서, 문제를 파악하고 디버깅하기에 용이합니다.
     - 데브툴즈를 통해 쿼리를 강제로 리패치하거나, 캐시를 삭제하거나, 로딩 상태를 유지하며 다양한 상태를 미리 체크할 수 있습니다.
 </details>
   
 <details>
<summary>Recoil</summary> 
   
 - 기존에 React-Query만을 사용하여 데이터를 관리하고 있었습니다.
   - 그러나 **A작업에서는 B데이터의 일부분만 필요한 경우**가 있어서,각각의 쿼리를 사용하여 데이터를 불러오는 것이 번거로웠습니다.
   - 이로 인해 **전역 상태 관리를 도입하여 API 호출 비용을 절감**할 수 있다는 아이디어가 제시되었습니다.
 
 - Redux와 Recoil 중에서 선택을 고민하다가, 기술 매니저님들의 의견과 프로젝트 아키텍쳐를 고려하여 **Recoil**을 도입하기로 결정했습니다.
   - **프로젝트에서 관리해야 할 전역 데이터가 많지 않아서** Redux보다는 상대적으로 가볍고,
     공식문서가 한글화가 잘 되어 있어서 새로운 스택을 접하는 것이 용이할 것으로 판단했습니다.
     또한, 팀원 모두 Redux를 사용해 본 경험이 있어서 새로운 스택을 도입하는 것에 대한 의견 수렴이 가능했습니다.
 </details>
  
 <details>
<summary>TOAST UI CALENDAR</summary> 
     
<details>
<summary>Custom 제작 vs library 제작 비교</summary> 
  
 1. Calendar 사용에 있어서 library vs Custom 비교해보기 
  
- Library를 사용했을 때 필요사항

- [x]  라이브러리를 쓸 수 있는지?

- [x]  라이브러리가 내가 원하는데로 열리는지?

- [x]  Custom으로 CSS 변경이 되는지?

- [x]  서버와 연동해서 데이터를 주고받고 할 수 있는지?

- [x]  기존에 와이어프레임에서 디자인 한 내용이 적용 되는지?

- Custom 했을 때 필요사항

- [x]  달력의 기능을 낼 수 있는지?

- [x]  원하는 기능을 적용할 수 있는지?

- [ ]  기간내에 모든 기능을 적용할 수 있는지?(애매)

- [ ]  Library보다 더 나은 기능을 만들 수 있는지? (애매)

**※ 달력부분은 이번 프로젝트내에 있어 핵심기능이기 때문에**
        
**더 나은 서비스 제공을 위해 library를 사용할 예정**
        
 </details>

### TOAST UI CALENDAR 선정 이유
    
- 무료 및 오픈 소스 :
   “Toast UI Calendar”는 무료이면서 오픈소스 라이센스를 가지고 있어서 자유롭게 사용하고 수정 가능
   
- 다양한 확장 기능 :
   - "Toast UI Calendar"는 다양한 확장 기능을 제공하여 개발자가 쉽게 캘린더를 확장하고 커스터마이징 가능
   - 주간/월간/연간 등 다양한 뷰 모드, 드래그 앤 드롭을 통한 이벤트 이동 및 크기 조절  등의 기능을 제공
   
- 사용성
   - "Toast UI Calendar"는 사용자 친화적인 인터페이스와 직관적인 사용성을 제공
   - 쉽게 이벤트를 추가, 수정, 삭제할 수 있고, 다양한 일정을 시간대별로 표시하고 관리 가능
   
- 유연한 커스터마이징:
   - "Toast UI Calendar"는 날짜와 시간에 대한 포맷, 이벤트의 색상 및 아이콘 등을 커스터마이징
   - 디자인 요구사항에 맞게 캘린더를 변경 가능
   
- 기간내 완성도 :
   - 기간내에 Custom 제작과 libaray 사용을 고려 했을때 더 나은 방향으로 선택
   
 </details>
   <details>
<summary>Vercel</summary> 
     
- 빠른 배포 : Vercel은 글로벌 CDN(Content Delivery NetWork)을 사용하여 전 세계적으로 빠른 속도로 배포 속도로 배포 할 수 있습니다.
     
- 무료 SSL(https:) 인증서 : Vercel  무료 SSL 인증서를 제공하고 있습니다.
     
- CI/CD 지원 : Vercel은 Github과 같은 버전 관리 시스템과 통합하여 자동화된 CI/CD 를 지원합니다.
     
- 무료 호스팅 : Vercel은 매우 높은 수준의 무료 호스팅을 제공합니다.
  
- Vercel은 React로 구축된 웹사이트나 애플리케이션을 배포하고 관리하기에 이상적인 플랫폼
     
 </details>
   
<details>
<summary>React-Hook-Form</summary> 
       
- 특정 페이지들에서 Input 태그를 자주 사용하고 있는데, Commom-Component를 구축하여 사용하고, 컴포넌트를 분리해도 코드 간소화에 한계를 느껴 도입하게 되었습니다.

- 도입하면서 현재까지 얻은 이점은 다음과 같습니다.

1. **state 관리가 필요 없어졌습니다.** 이전에는 각각의 Input 태그에 대해 state를 정의하고, onChange 이벤트 핸들러를 작성하여 값을 업데이트 해주는 작업이 필요했습니다.
       React-Hook-Form을 도입 하면서 이 작업들이 필요 없어졌습니다.

2. Input 태그마다 고정적으로 사용되던 value와 onChange가 빠지면서 **Input 태그마다 코드가 2줄씩 감소하였습니다.**
       
3. **내장 함수를 통해** 유효성 검사, 필드의 값 추출 등 유용한 기능을 사용할 수 있습니다.
       이는 기존에는 각각의 Input 태그에 대해 별도로 구현해야 했던 기능이었습니다.
       또한, 추가적으로 사용 가능한 기능들이 있는지 파악하고 있습니다.
       
4. React-Hook_Form를 사용함으로서 **비제어 컴포넌트**를 다루게 되는데 이때 입력 필드의 상태를 State에 저장하지 않고
       React-Hook-Form이 내부적으로 유지함으로 입력필드가 변경되어도, State가 업데이트 되지 않아 **리렌더링을 줄일 수 있습니다.**
 </details>
  
</details>

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

![mypage-1](https://github.com/Final-Project-Team11/Meer_catlender_FE/assets/70690690/6264b2ae-6359-4534-a77d-65a90acb6c79)

![mypage-3 PNG](https://github.com/Final-Project-Team11/Meer_catlender_FE/assets/70690690/39c43450-d5ef-4872-bb9c-92b6ed4a6ffc)


**수정 후**

![mypage-1_코드수정 후 PNG](https://github.com/Final-Project-Team11/Meer_catlender_FE/assets/70690690/fc2eb977-2d99-4d00-a26d-5f8fb910ff52)

![mypage-3 PNG (1)](https://github.com/Final-Project-Team11/Meer_catlender_FE/assets/70690690/a75403d7-3b02-4e16-8489-d093fd501e6c)


  </details>

</details>
