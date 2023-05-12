![bottom](https://github.com/Final-Project-Team11/Meer_catlender_FE/assets/124993422/c7aac152-34cd-40f2-ac32-2528b76f06c5)

---
# 🗓️ Meer : 캣린더
![image](https://github.com/Final-Project-Team11/Meer_catlender_FE/assets/124577334/eb462824-687b-485c-9223-0399ef3c82a4)

### Together : 2023.03.31 ~ 2023.05.12

---
## 🔗 Link

### Meer : [캣린더 Notion](https://magical-puppy-b7f.notion.site/Final_Project_Team11-Meer-71cb657348d24b188150a5e12df42b86)
### Meer : [캣린더 Domain](https://meercatlendar.store)
---
## 🔗  Github

> FE : https://github.com/Final-Project-Team11/Meer_catlender_FE 

> BE : https://github.com/Final-Project-Team11/Meer_catlender_BE

---

## 🙋🏼‍♀️🙋🏼 팀원 소개 


| 역할 | 이름   | 기술 스택 |  Github 링크              |
| --- | ------ | --------- | ------------------------ |
| 팀장 | 최다현 | React     |  https://github.com/choidami5126 |
| 팀원 | 박찬우 | React     |  https://github.com/chanw9503 |
| 팀원 | 송철환 | React     |  https://github.com/SsongCh94 |
| 팀장 | 류현주 | Node      |  https://github.com/ryu820 |
| 팀원 | 주영성 | Node      |  https://github.com/wndudtjd |
| 팀원 | 민수현 | Node      |  https://github.com/SuHyeon-Eleven |
| 귀하신 분 | 이미현 | Designer   | -                        |

| 이름 | 맡은 파트 |
| --- | --------- |
| 최다현 | 로그인, 회원가입, 유저 조회, 유저 생성, 공용 컴포넌트 제작 |
| 박찬우 | 메인페이지, DropDown hooks 구현, 미니 캘린더 제작 |
| 송철환 | 업로드된 파일 조회, 메니저페이지, 투두리스트, 프로필 카드 |
| 류현주 | 로그인, 회원가입, 마이페이지, 개인 투두리스트, 서버 부하 테스트, 테스트 코드 작성, 에러로깅 시스템 구축 |
| 주영성 | 신청서 파트, 전체 휴가 조회, 전체 일정 조회, 댓글, 테스트 코드 작성 |
| 민수현 | 유저 관리, 휴가 관리, 출장 관리, 기타 결제 관리, CI/CD, HTTPS적용 |
| 이미현 | 웹페이지 전체적인 디자인 |

---

## 💡 프로젝트 소개 
Meer : 캣린더는 팀원들이 회사를 다니며 겪었던 불편했던 경험들에 시작되었습니다.

- 여러 상급자에게 결제를 받아야하는 결재 프로세스
- 일정관리, 휴가관리, 사내업무 등을 통합적인 사이트에서 사용하지 못하던 경험
- 휴가를 겹치지 않게 사용하기 위해서 여러 팀원에게 묻고 다녔던 경험
겪었던 불편함들을 개선하고 통합적인 일정&업무 관리 서비스를 기획하게 되었습니다.

---

## ⚙️ 기능 소개

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
  
## 🧩 서비스 아키택쳐

<img width="992" alt="스크린샷 2023-05-12 오후 1 46 25" src="https://github.com/Final-Project-Team11/Meer_catlender_BE/assets/70690690/1125a232-e058-45c5-80b0-167642138016">

---


<div align=left><h1>📚 Front-End STACKS</h1></div>
<div align=left> 
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

<div align=left><h1>📚 Back-End STACKS</h1></div>
<div align=left> 
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

# 🧠 기술적 의사 결정
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
<summary>BE</summary>	

<details>
<summary>express</summary>	
	
- 정해진 기간안에 기능 개발을 위해 빠르고 유연성이 높은 express를 사용하게 되었습니다.
- 미들웨어 구조를 사용하여 필요한 기능만 선택적으로 사용할 수 있어 가볍고 유연한 특징을 갖고 있습니다. 
	이를 통해 개발자는 웹 애플리케이션을 더욱 쉽게 개발하고, 필요한 기능을 자유롭게 조합하여 사용할 수 있습니다. 
	또한 Express는 간단하고 빠른 개발을 위해 필요한 다양한 기능과 구조를 제공하며, 이를 활용하여 생산성을 높일 수 있습니다.
</details>

<details>
<summary>Sequelize</summary>
	
- Sequelize는 Node.js에서 사용할 수 있는 ORM(Object-Relational Mapping) 중 하나입니다. 
	Sequelize를 사용하면 SQL 데이터베이스와 JavaScript 객체 간의 변환을 자동화할 수 있으며, PostgreSQL, MySQL, SQLite, MSSQL 등 다양한 데이터베이스를 지원합니다. 
	Sequelize는 강력한 기능과 높은 수준의 유연성을 제공하며 Promise와 async/await 패턴을 지원하여 비동기 처리를 간편하게 할 수 있습니다. 
	Sequelize는 대규모 개발자 커뮤니티가 존재하며, 많은 사용자들이 지속적으로 업데이트하고 개선하고 있습니다.
    	이를 통해 데이터베이스 쿼리 작성을 간소화하고, 코드의 가독성과 유지보수성을 높일 수 있습니다. 
</details>

	
<details>
<summary>EC2</summary>
	
- EC2는 가상 머신 인스턴스를 제공하여 다양한 운영 체제와 애플리케이션을 지원하며, 
	보안 기능, 스케일링 기능, 통합 기능 등을 제공하여 유연하고 확장성 있는 클라우드 서비스를 제공합니다. 
	특히, AWS의 다양한 서비스와 통합되어 있어 다양한 어플리케이션 아키텍처를 구축할 수 있으며, 에코시스템과 커뮤니티가 성숙하여 지원과 협업이 용이합니다.
</details>

<details>
<summary>RDS</summary>
	
- EC2로 데이터베이스 서버를 직접 관리시 설정, 패치, 백업 등의 관리 작업이 번거롭고 안정성을 보장하기 어렵습니다. 
	반면, RDS는 콘솔이나 API를 통해 쉽게 백업과 복구를 할 수 있으며 인스턴스 크기를 쉽게 조정하며 클릭 한 번으로 높은 가용성 확보할 수 있습니다.
	이러한 장점들을 통해 데이터베이스 도입 및 관리 시간과 노력을 줄여줍니다.
</details>
	

<details>
<summary>S3 / S3-bucket</summary>
	
- S3 (Simple Storage Service)은 AWS에서 제공하는 객체 스토리지 서비스로, 안정성, 확장성, 비용 효율성, 보안성, 유연성 등 다양한 용도를 제공합니다.
	S3는 데이터를 안전하게 저장하고 필요한 만큼 데이터를 저장할 수 있으며, 비용을 절감할 수 있습니다. 또한, 다양한 용도로 사용할 수 있어 유연성이 높으며,
	업계 최고 수준의 내구성을 제공하여 데이터 손실의 위험이 거의 없습니다.
</details>

<details>
<summary>MySQL</summary>
	
- MySQL은 관계형 데이터베이스로 복잡한 데이터 구조를 가진 프로젝트에 접합합니다. 
	저희의 프로젝트는 데이터 구조가 복잡하고 테이블간의 관계성이 중요해서 MySQL을 선택하게 되었습니다. 
	MySQL은 테이블 간의 관계를 효율적으로 나타내어 데이터 조작을 용이하게 하며 SQL 언어를 사용하여 데이터를 쉽게 검색하고 관리할 수 있습니다. 
</details>    

<details>
<summary>Jest</summary>
	
- Jest는 자바스크립트 코드를 테스트하기 위한 강력한 프레임워크로, 다양한 장점을 가지고 있습니다. 
	첫째, 간단한 설정만으로도 쉽게 테스트 환경을 구성할 수 있습니다. 
	둘째, 코드 커버리지 측정, 스냅샷 테스트, 모킹, 비동기 코드 테스트 등 다양한 기능을 제공합니다. 
	셋째, Facebook에서 개발하고 관리하는 프로젝트로 널리 사용되며, 다양한 커뮤니티에서 지원하고 있어서 문제 발생 시 대처하기가 쉽습니다. 
	** 넷째, 병렬로 테스트를 실행하여 실행 속도가 빠르며, 코드 변경에 대한 피드백을 빠르게 받을 수 있습니다.
	** 다섯째, 테스트 결과를 직관적으로 파악할 수 있는 기능을 제공하여 사용성이 좋습니다. 
	이전에는 여러 테스트 라이브러리를 조합해서 사용하는 번거로움이 있었지만, Jest를 사용하면 이러한 문제점을 간편하게 해결할 수 있습니다.
</details> 
	
<details>
<summary>GitHub Action</summary>
	
- 깃허브액션은 깃허브와 긴밀하게 통합되어 있어 깃허브 리포지토리에서 CI/CD 파이프라인을 구성하고 실행할 수 있으며, 
	다양한 빌드 및 배포 옵션을 제공하고 높은 확장성을 가지며 무료로 제공됩니다. 
	또한, 많은 개발자들이 사용하고 있어 다양한 템플릿 및 예제 코드가 공유되어 있어 새로운 프로젝트를 시작할 때 편리하게 활용할 수 있습니다.

</details> 

<details>
<summary>Slack Webhook</summary>	
	
- 에러 로그 확인의 불편함이 있었습니다. 
	기존 사용하던 pm2 log, winston 은 로그를 실시간으로 확인하기 어려웠고, 팀원들이 수동으로 로그를 확인해야 했기 때문에 불편하고 시간이 많이 소요되었습니다.
	이러한 기존 방식의 불편함을 개선하고자 Slack Webhook으로 알림 기능을 도입하였습니다. 
	팀원들이 실시간으로 에러 알림을 받을 수 있게 함으로써, 문제 상황을 즉시 인지하고 빠르게 원인을 파악할 수 있게되었고. 
	발생한 이슈에 대해 신속하게 대응할 수 있어 개발 및 유지보수 과정에서 시간과 노력을 절약할 수 있게 되었습니다.
	
</details> 	
</details>

---

# 🔫  TroubleShooting

<details>
<summary>FE</summary>	

<details>
<summary>이벤트 버블링</summary>		
	
<aside>
	    
## 💡 문제 인식
    
- 모달을 띄운 뒤, 모달 내부의 닫기 버튼이나 모달의 백그라운드를 누르면 모달이 닫히게 closeModal 함수를 등록해주었는데, 모달이 닫히지 않음.
- 아래는 문제의 코드. closeModal 함수가 modal을 닫게하는 기능을 하고, 백그라운드와 닫기 버튼에 함수를 등록하였지만 동작안함.
- code(문제가 발생한 곳)
            
```tsx
    return (
       <UI.StUploadedFileBlock key={file.eventId} onClick={modalOpenHandler}> // modal 내에서 click 이벤트 발생시, 해당위치의 click 이벤트도 발생
            {modalOpen && (
            	<Modal closeModal={closeModal}>
            	<UploadedDetail
            		 data={data}
            		 isLoading={isLoading}
            		 type={type}
            		 closeModal={closeModal}
            	/>
            	</Modal>
            	)}
                <UI.StNameDateBlock>
                    <UI.StContentSpan>😵‍💫 | {file.userName}</UI.StContentSpan>
                    UI.StDateSpan className="date"> {file.enrollDay}</UI.StDateSpan>
                    </UI.StNameDateBlock>
                    <UI.StContentSpan>📎 | {file.fileName}</UI.StContentSpan>
               </UI.StUploadedFileBlock>
    );
```
            
- Modal Open/Close 관련 코드
	1. `closeModal`, `Modal` 나오는 조건
                
 ```tsx
    const closeModal = () => {
    setModalOpen(false);
    console.log('test');
    };
                
    {modalOpen && (
          <Modal closeModal={closeModal}>
          <UploadedDetail
                data={data}
                isLoading={isLoading}
                type={type}
                closeModal={closeModal}
           />
           </Modal>
    )}
 ```
                
            
 2. `Modal` 컴포넌트내에서  백그라운드 클릭 시 `closeModal()` 호출
            
 ```tsx
    <StModalBackground
          background={background}
          onClick={() => closeModal()}
    ></StModalBackground>
 ```
            
 - `Modal` 은 `UploadedDetail` 을 `children`으로 받아서 모달에서 보여준다.
 - `UploadedDetail`에서 `props`로 `closeModal`을 받아서 `button` 의 `onClick`에 넣어주었다.
	    
 </aside>
    
---	
	
 <aside>  
	 
 ## 🚫 문제 분석
    
 - Modal의 Open/Close 관련된 내용에 Log를 찍어 전반적인 흐름 파악
	 - **closeModal**에 **console.log**(’test’) 를 넣어줘서, closeModal이 실행된다면 콘솔에서 확인할 수 있게 세팅했다.
 - 문제가 되는 부분 분석
	 - `onMouseClick()`(백그라운트 클릭)으로 인한 `closeModal` 시 정상 작동 확인
	 - `button` 으로 인한 `closeModal()` 시, `modalOpen` `State` 값이 변경되지 않아, `Modal`이 `Close` 되지 않는 현상 파악
	 - 실제적으로 `button`으로 `Click`으로 `closeModal()`을 해서 `State`의 변화를 일으켰지만, **부모**에 있는 `onClick()`이 실행되서
	 `closeModal()`이 재호출되 `State` 값이 안바뀐것처럼 보이는 문제 발견
 </aside>
    
---
	
 <aside>
	 
 ## ⚙ 시도
    
 - closeModal을 실행시키는 이벤트를 onClick이 아닌 onMouseDown 으로 바꿔봄
	 - closeModal이 실행되고, setModalOpen(false)도 실행되며 모달이 정상적으로 닫힘.
        
 - onClick 시, 왜 부모에 있는 Click 이벤트가 작동하는지에 대한 원인파악
	 - 이벤트 버블링 분석
 </aside>
   
---
	
<aside>
	
## 🛠 해결
	
이벤트 버블링 - Event Bubbling
   
이벤트 버블링은 특정 화면 요소에서 이벤트가 발생했을 때 해당 이벤트가 더 상위의 화면 요소들로 전달되어 가는 특성을 의미한다.
    
![https://user-images.githubusercontent.com/122278657/233428841-b58f5dc6-1aa2-4fce-9b70-4a3e3cbb3c4f.png](https://user-images.githubusercontent.com/122278657/233428841-b58f5dc6-1aa2-4fce-9b70-4a3e3cbb3c4f.png)
    
해결 코드 1
    
    - `stopPropagation()` 메서드로 이벤트의 전파를 방지한다.
    
    ```jsx
    const closeModal = (event) => {
    event.stopPropagation(); //stopPropagation()을 사용해 버블링 방지 
    setModalOpen(false);
    };
    ```
    
    해결 코드 2
    
    - `Modal` 은 `StUploadedFileBlock` 안에 들어가 있을 필요가 없으니 따로 빼준다.
    - 더이상 `StUploadedFileBlock`는 `Modal`의 상위태그가 아니기 때문에 이벤트 전파가 일어나지 않는다.
    
    ```tsx
    return (
          <UI.StUploadedFileBlock key={file.eventId} onClick={modalOpenHandler}>
            <UI.StNameDateBlock>
              <UI.StContentSpan>😵‍💫 | {file.userName}</UI.StContentSpan>
              <UI.StDateSpan className="date"> {file.enrollDay}</UI.StDateSpan>
            </UI.StNameDateBlock>
            <UI.StContentSpan>📎 | {file.fileName}</UI.StContentSpan>
          </UI.StUploadedFileBlock>
    		{modalOpen && (
            <Modal closeModal={closeModal}>
              <UploadedDetail
                data={data}
                isLoading={isLoading}
                type={type}
                closeModal={closeModal}
    	        />
            </Modal>
          )}
      );
    ```
    
    </aside>
    
---	
	    
## ❓ 궁금했던 부분
<aside>
'useEffect`로 `modalOpen state`가 바뀔 시 상태값을 `Log`로 찍었는데,  상태변화 (false→true→false) 가 찍혀야 되지않나?
    
    답 :
     `setState`는 비동기 함수이기 때문에 `state`의 변화는 렌더링이 일어난 이후에 바뀌게 된다. 현재 상황은 렌더링 되기전에 일어나는 상황이기 때문에, `state`상태 변화는 버블링의 마지막 부분인
    `true` 값이 되는것이고 `useEffect`는 상태값이 변화가 일어나지 않아 `Log`가 남지 않았다. 
    
    `button 에서 onClick 이벤트 발생` → `콘솔에 ‘test’ 출력` → `상위 div로 onClick 이벤트 전달, 동작` → 
    `button의 onClick이벤트인 closeModal이 비동기로 동작` → `상위 div의 openModal도 비동기로 동작` → `비동기로 실행된 결과값인 true만 돌아오게됨.`
    
    - modalOpen 의 상태 업데이트가 일어나기 전에 비동기로 false로 만들고 다시 true로 만들어서 내보냈으니 true인 결과만 보게 된다.
</aside>

</details>
   
	
<details>
<summary>onClick이벤트와 onMouseDown이벤트, onBlur이벤트</summary>	
	
<aside>
	
## 💡 문제 인식
    
- **조건**
	- `todo 탭`에서 `category`, `todo` 를 추가하기 위해서 `+` 버튼을 누르면 `input`이 생긴다.
        - `input`에 내용물이 있을 때 `+` 버튼을 누르면 `input`의 내용이 `category` 또는 `todo`에 저장된다.
        - `input`에서 `focus`가 사라질 시 `input`은 사라져야 한다.
- **문제**
        - `input`이 열려있을 때 `+` 버튼을 누르면 `input`이 닫혔다가 곧바로 다시 열린다.
- 코드

 ```tsx
       const categoryPlusHandler = () => {
        // input이 닫혀있다면 열림
        if (openCategoryInput === false) {
             setOpenCategoryInput(true);
             console.log('열렸다');
           }
       // 인풋이 열려있고, input이 비어있지 않다면 post 동작, input 비움
        else if (openCategoryInput && categoryState.length !== 0) {
            setCategoryState('');
            setOpenCategoryInput(false);
            console.log('닫히냐?');
          }
       // 인풋이 열려있지만, 비어있다면 인풋 닫음
       else {
      setOpenCategoryInput(false);
      console.log('닫혀라');
    }
   };
 ```
        
```tsx
// 인풋에서 포커스 사라지면 input 닫힘
    const blurHandler = () => {
      setValue('');
      console.log('블러');
      inputHandler(false);
   };
        
    return (
     <UI.StCategoryInputBlock>
     <UI.StCircleBlock />
     <UI.StCategoryInput
          ref={inputRef}
          type="text"
          maxLength={10}
          value={value}
          onChange={onChange}
          onKeyPress={handleKeyPress}
          onBlur={blurHandler}
     />
     </UI.StCategoryInputBlock>
  );
 ```
        
</aside>

---
	
<aside>
	
## 🚫 시도, 문제 원인
    
- 시도
        - `input`을 열고 닫는 `state`를 콘솔로 찍어보니, `input`이 열려있을 때 `+` 버튼을 누르면 `false`가 되며 `‘블러’` 가 찍히고, 곧바로 다시 `true`가 되며 `'열렸다'`가 찍히는걸 볼 수 있었다.
- 문제 원인
        - 콘솔을 찍힌걸 보면 `blurHandler`가 먼저 발동해서 `input`을 닫고, 그 뒤 `onClick`이 발동하며 `input`이 닫혀있으니 다시 열어버린 걸 볼 수 있다.
</aside>

---
	
<aside>
	
## 🛠 해결
    
- `onClick`으로 등록되어있던 `+` 버튼의 기능을 `onMouseDown` 으로 바꿔주었다.
        
`<UI.StPlusSpan *onMouseDown*={clickFn}>+</UI.StPlusSpan>`
        
</aside>

---
	
<aside>
	
## ❗ 알게 된 점
    
 ### `onBlur` 이벤트와 `onClick`이벤트, `mousedown`, `mouseup` 이벤트
    
- **onBlur**
	- `onBlur` 이벤트는 어떠한 요소가 `focus` 를 잃을 때 발동한다. 마우스를 클릭하든 탭을 누르든 `focus`만 잃으면 그 순간 바로 발동한다.
- **onClick**
        - `onClick` 이벤트는 `mousedown` 이벤트와 `mouseup` 이벤트를 합친 이벤트의 형태로, `onClick` 이벤트가 적용된 요소의 위에서 마우스를 누르는 것과 떼는 것이 이루어 져야 발동하는 이벤트이다.
- **mousedown**
        - `mousedown` 이벤트가 등록된 요소의 위에서 마우스를 누르면 발동하는 이벤트. 드래그 앤 드롭, 마우스 상호작용 추적 기능을 위해 이용되는 경우가 많으며, 마우스를 떼는것에 대한 조건은 없다.
- **mouseup**
        - `mouseup` 이벤트가 등록된 요소 위에서 커서를 떼기만 하면 될 것 같지만, 아니다.
        - `onClick`과 같이 요소 위에서 마우스를 누르고, 떼는 동작을 해야한다.
        - 다른 위치에서 클릭을 하고, 클릭을 유지한 상태에서 `mouseup` 이벤트가 등록된 요소에 커서를 위치시키고 마우스를 떼도 `mouseup` 이벤트는 발생하지 않는다.
        - 드래그 앤 드롭 기능등을 이용할 때 `mousedown` 이벤트와 함께 사용한다.
</aside>

---
	
<aside>
	
## 👍 배운 점
    
## `mousedown` 이벤트는 `onBlur` 이벤트보다 우선순위를 가진다.
    
- `onBlur` 이벤트는 `focus`가 사라지는 순간에 동작한다.
- `focus`가 사라지는 이유는 마우스가 클릭되었기 때문이다.
- 위와 같은 인과관계를 볼 때 `mousedown` 이벤트는 `onBlur` 이벤트보다 우선순위를 가지게된다.
    
## `onClick` 이벤트의 발생 시점
    
- `onClick` 이벤트는 `mousedown` 과 `mouseup` 이벤트의 조합이다.
- 따라서 한 요소에 세 개의 이벤트가 모두 등록되어 있다면 `mousedown` → `mouseup` → `onClick` 순으로 이벤트가 동작한다.
	
</aside>
</details>

<details>
<summary>DropDown hooks 구현하기</summary>
   
## DropDown hooks 만들기

---
	
<aside>
	
## 💡 문제 인식
    
- DropDown hooks 사용시 발생하는 문제
	
1. DropDown 사용 중, 화면을 움직이면 DropDown 위치가 변경된다.

2. DropDown 사용 중, 화면을 확대 축소하게 되면 DropDown 위치가 변경된다.

3. scroll에 따른 DropDown 위치 변경

4. Modal 창에서 DropDown, 사용 시, DropDown이 보이지 않는다.

5. DropDown이 브라우저 범위를 벗어나게 된다면 list가 보이지 않는다.

6. DropDown position값은 어떻게 설정할것인가?
	
</aside>
 
---
	
<aside>
	
## 🚫 문제 분석
	
- 브라우저의 변경에 따라 DropDown이 왜 변경되는지 확인
        - DropDown은 `position`을 `absolute` 로 사용중이기 때문에 브라우저가 변경될 때 마다 position 정보를 update 해줘야됨.
	
- Modal 창에서 DropDown 안뜨는 이유 확인
        - Modal 생성 방식 분석
        - 현재 Modal은 `position` 을 `fixed` 로 사용하고 있고 `z-index`를 `1500`을 주고 있는 상태
        - DropDown은 `position` 을 `absolute` 를 쓰고 있지만, `z-index` 값이 없기 때문에 현재는 Modal 창 뒤쪽으로 나타나고 있는 상황
        
- DropDown이 브라우저 범위를 벗어나는 문제
        - DropDown에게 position 정보를 넘겨 줄때, 브라우저의 높이값을 고려하지 않고 주었기 때문에 브라우저 범위를 벗어나게 됨
        - DropDown이 브라우저 범위를 벗어나게 될 상황에 대한 예외처리 필요
	
- DropDown position 문제
        - useRef를 사용해 내가 DropDown으로 사용할 Dom 요소에 접근해서 해당 요소의 position 값을 불러온다.
        - 값은 2가지를 가져올 것이고, input창을 감싸고있는 div 태그와 li 태그를 감싸고 있는 ul태그를 가져온다.
	
</aside>
    
---
	
<aside>
	
## ⚙ 시도한 것
    
- 브라우저의 상대좌표 / 절대좌표 구하는 방법 알아보기
	- 상대좌표 / 절대좌표
            > **screent 객체 화면 크기 구하기**
            > 
            
            screen.width : 화면(모니터 해상도)의 너비
            
            screen.availWidth : 모니터 화면의 작업 표시줄을 제외한 너비
            
            screen.height : 화면(모니터 해상도)의 높이
            
            screen.availHeight : 모니터 화면의 작업 표시줄을 제외한 높이
            
            > **브라우저 크기 구하기**
            > 
            
            브라우저 크기를 구하고 싶은 경우
            
            //실제 사용하는 브라우저 안쪽 너비
            
            document.body.offsetWidth: 이속성은 요소의 가장 바깥쪽 경계를 포함한 크기를 나타내며, 즉, 요소의 테두리(border), 패딩(padding), 스크롤바 등의 크기를 모두 포함.
            
            document.body.scrollWidth : 스크롤바를 포함한 콘텐츠의 실제 가로 크기. 즉, 화면에 보이지 않는 부분까지 모두 포함한 전체 너비
            
            document.body.clientWidth : 내부 콘텐츠의 영역의 너비를 나타내는 속성입니다. 이 속성은, 요소의 내부 콘텐츠 영역에서 스크롤바와 패딩을 제외한 실제 가로 길이를 나타내며, 즉, 스크롤바를 제외한 너비
            
            > **HTML5 표준**
            > 
            
            window.outerWidth  : 브라우저 창의 너비
            
            window.innerWidth  : 브라우저 두께를 제외한 너비
            
            window.outerHeight  *:* 브라우저 창의 높이
            
            window.innerHeight : **브라우저 두께를 제외한 높이
            
    
- 코드 분석 & 문제 접근
    
```tsx
    useEffect(() => {
        //input 태그를 감싸는 div
        const { current } = divRef;
    
        //팀목록을 li를 감싸고 있는 UI
        const ulCurrent = ulRef.current;
    
        if (current !== null && ulCurrent !== null) {
          const { top, left, height, width } = current.getBoundingClientRect();
          const absoluteTop = window.pageYOffset + current.getBoundingClientRect().top;
          const absoluteLeft = window.pageXOffset + current.getBoundingClientRect().left;
    
          //브라우저 전체 높이값보다 input을 감싸고 있는 div 태그 + UI 높이값보다 클때, UL 태그를 위로 올리기
          if (top + height + ulCurrent.getBoundingClientRect().height > window.innerHeight) {
            const ulHeight = ulCurrent.getBoundingClientRect().height;
            const newTop = absoluteTop - height - ulHeight;
            setInputPosition({ top: newTop, left: absoluteLeft, height, width });
          } else {
            setInputPosition({ top: absoluteTop, left: absoluteLeft, height, width });
          }
        }
      }, [isOpen, width]);
 ```
    
 1. 화면에 넘어갔냐 안넘어갔냐를 판별할 조건 필요.
 2. 화면이 넘어갔다면, DropList를 위로 펼쳐야됨.(가로로 펼치는경우는 못봤음)
 3. 넘어가지 않는다면, 그대로 아래로 내려오게 해야된다.
 4. 화면에서 좌측 스크롤이 있을 경우도 있으니, 좌측 스크롤을 고려해서 left를 설정한다.
 </aside>
 
---
	
 <aside>
	 
 ## 🛠 해결
    
### 1️⃣ 브라우저 크기 변경에 따른 DropDown position 값 reset 
    
### 해결 코드 
    
```tsx
    const [width, setWidth] = useState(window.innerWidth);
    
      const resizeHandler = () => {
        setWidth(window.innerWidth);
      };
    
      useEffect(() => {
        window.addEventListener('resize', resizeHandler);
    
        return () => {
          //cleanUp
          window.removeEventListener('resize', resizeHandler);
        };
      }, []);
    
    useEffect(() => {
    ...
    }, [isOpen, width]);
 ```
    
 1. addEventListener()를 통해서 ‘resize’ 크기 변화를 감지한다. 
 2. 변화값을 useState에 넣는다.
 3. useState값을 position 값을 세팅해주는 useEffect dependency array에 넣어서
 값 변경에 따라 position 값을 reset 해주도록 한다. 
    
 ### 2️⃣ scroll을 고려한 DropDown position 값 설정하기 
    
 ```tsx
    const { top, left, height, width } = current.getBoundingClientRect();
    const absoluteTop = window.pageYOffset + current.getBoundingClientRect().top;
    const absoluteLeft = window.pageXOffset + current.getBoundingClientRect().left;
 ```
    
 1. 스크롤 x, y 로 2가지 경우가 생길 수 있다는 것을 인지한다.
 2. 스크롤 변화값에 따른 좌표값을 `window.pageYOffset` 로 불러온다.
 3. 내가 기준이 잡은 좌표 top 값과 left 값에 scroll에 따른 offset값을 더해준다. 
    
 ### 3️⃣ Modal 창에서 DropDown, 사용 시, DropDown이 보이지 않는다.
	 DropDown에서 Ul태그의 z-index 값을 2000 으로 설정함으로써, Modal 보다 높게 설정한다.
    
 ### 4️⃣ DropDown이 브라우저 범위를 벗어나게 된다면 list가 보이지 않는다. 
    1. 브라우저의 범위를 벗어났을 때 예외처리를 생각한다.
    - 브라우저의 범위를 벗어나게 되면 DropDown 된 List를 기준 div의 아래가 아닌 위로 나타나게 한다.
    - 계산 방식은, 현재 브라우저의 높이값을 구한 뒤, 기준 div의 top + height 값에 list의 height 값을 
    더 했을 때, 브라우저의 높이값보다 큰지를 확인하는 조건을 형성한다.
    
 ```tsx
    if (top + height + ulCurrent.getBoundingClientRect().height > window.innerHeight
 ```
    
 - 조건이 true 일 경우
    
 ```tsx
     const ulHeight = ulCurrent.getBoundingClientRect().height;
     const newTop = absoluteTop - height - ulHeight;
     setInputPosition({ top: newTop, left: absoluteLeft, height, width });
 ```
    
    조건이 true가 된다면, list가 기준 div의 아래가 아닌 위로 나타나게 해야되기 때문에 기준 top 값에서
    높이값과 list의 높이값을 빼줌으로써  위로 나타나게 한다.
    
 - 조건이 false 일 경우
    
 ```tsx
    setInputPosition({ top: absoluteTop, left: absoluteLeft, height, width });
 ```
    
 ### 5️⃣ DropDown position값은 어떻게 설정할것인가
    
 ```tsx
    const [divRef, ulRef, setIsOpen, isOpen, inputPosition] = useDropDown();
    
    ... 
    
    <styles.StInputBlock ref={divRef}>
            {tagList?.map(item => {
              return (
                <styles.StTagBlock key={item}>
                  <styles.StProfileBlock>
                    <styles.StImageBlock />
                    {item}
                  </styles.StProfileBlock>
                  {props.disable === false && (
                    <styles.StDeleteBlock id={item} onClick={deleteClickHandler}>
                      x
                    </styles.StDeleteBlock>
                  )}
                </styles.StTagBlock>
              );
            })}
            <styles.StInput
              onMouseDown={mouseDownHandler}
              onKeyPress={onInputKeyDownHandler}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              disabled={props.disable}
            />
          </styles.StInputBlock>
  ```
    
  기준이 되는 div태그의 DOM 요소에 접근할 수 있게 Ref값을 설정해 주고, 
    
  list가 되는 ul태그도 ref값을 설정해준다. 
    
  ```tsx
    //item list 값이 바뀔때마다, 위치를 재확인한다.
      //포탈은 position을 이용하기 때문에 위치 정보값이 필요하다.
      // getBoundingClientRect은 해당 요소의 상태좌표값을 가져오고,
      // 절대 좌표를 얻기 위해서는 window.pageYOffset을 더해주어야 한다.
      useEffect(() => {
        //input 태그를 감싸는 div
        const { current } = divRef;
    
        //팀목록을 li를 감싸고 있는 UI
        const ulCurrent = ulRef.current;
    
        if (current !== null && ulCurrent !== null) {
          const { top, left, height, width } = current.getBoundingClientRect();
          const absoluteTop = window.pageYOffset + current.getBoundingClientRect().top;
          const absoluteLeft = window.pageXOffset + current.getBoundingClientRect().left;
    
          //브라우저 전체 높이값보다 input을 감싸고 있는 div 태그 + UI 높이값보다 클때, UL 태그를 위로 올리기
          if (top + height + ulCurrent.getBoundingClientRect().height > window.innerHeight) {
            const ulHeight = ulCurrent.getBoundingClientRect().height;
            const newTop = absoluteTop - height - ulHeight;
            setInputPosition({ top: newTop, left: absoluteLeft, height, width });
          } else {
            setInputPosition({ top: absoluteTop, left: absoluteLeft, height, width });
          }
        }
      }, [isOpen, width]);
  ```
    
  그다음 Ref로 설정한 요소들의 `top`,`left`,`width`,`height` 값을 가져와 `position` 값을 setting 해준 뒤 그 값을 `return` 해준다.
    
  </aside>
	 
 ---
	 
<aside>
	    
## ❓ 궁금했던 부분 
    
     ****현재 문제가 되고 있는 것이, `ul`태그의 `dom` 요소에 접근해서 `getBoundingClientRect()` 메서드를 통해 `ul` 태그의 높이값을 불러오고 있는데,  ****초기 태그의 높이값과 그 이후의 높이값이 다른 문제가 생겼다. 초기값의 높이값이 ul태그의 높이값만을 포함하고있는 것이 아닌, div태그와의 거리값도 포함이 되어 있어서, 
    
     list가 브라우저를 벗어났을때, 즉 위로 열리게 되면 문제가 생긴다.
    
    문제는 해결방안을 찾고 있고, 해결하는 즉시 내용을 공유할 예정이다.
    
    </aside>
	    
 </details>

<details>
<summary>비밀번호 입력에 따른 비밀번호 확인의 유효성</summary>

---
	
### ❗ 문제 인식
    
![image](https://github.com/Final-Project-Team11/Meer_catlender_FE/assets/124577334/d7af8a02-d70e-4bf2-badf-99757f2753ca)
    
비밀번호 확인을 먼저 입력하고, 비밀번호 입력 시
일치하는 값을 비밀번호에 입력했음에도,
비밀번호 확인의 유효성 메세지가 사라지지 않는 문제가 발생함
    
---
	
### ❓ 원인
    
```tsx
    const password = watch('password');
    
    ****(...)****
    
    <CustomLabel>
            <Wrapper_Row>
              비밀번호 확인&nbsp;<span style={{ color: `${COLOR.POINT_C}` }}>*</span>
            </Wrapper_Row>
            <CustomInput
              inputType="signup"
              type="password"
              placeholder="비밀번호를 한 번 더 입력해주세요."
              {...register('confirmPassword', {
                required: '비밀번호 확인을 진행해주세요',
                validate: value => value === password || '비밀번호가 일치하지 않습니다',
              })}
            />
          </CustomLabel>
          {errors.confirmPassword && <ErrorP>{errors.confirmPassword.message}</ErrorP>}
 ```
    
[**React-Hook-Form 라이브러리를 사용중]**
순서대로 비밀번호 > 비밀번호 확인 입력 시는 문제가 없지만,
비밀번호 확인을 먼저 입력 시 해당 칸의 `입력된 값의 유효성 검사가 진행`되는데
이때는 비밀번호 입력란이 비어 있음으로 `false로 종결`된다.
그 후 비밀번호 입력란을 기입해도, 이미 유효성 검사는 종결되었기에,
동일한 값을 입력해도 에러 메세지는 사라지지 않는 것

---
	    
### 🔧 해결방안
    
비밀번호의 값의 변경에 따라 액션을 취해,
비밀번호 확인의 유효성 검사를 재진행 하도록 로직 수정이 필요
    
---
    
1. 비밀번호 Input이 변경되면 비밀번호 확인 Input 초기화
    
```tsx
    const password = watch('password');
    
    const resetPasswordCheck = () => {
          setValue('confirmPassword', '')
    }
     useEffect(()=> {
          resetPasswordCheck()
    },[password])
```
    
    추적하고 있던 비밀번호 값을, useEffect의 의존성 배열에 넣어,
    값이 변동될 때마다, 비밀번호 확인 Input을 초기화 한다.
    이때, 한 번의 타자마다, 리셋 함수를 계속 호출함으로 디바운싱을 사용하여,
    
```tsx
    const useDebouncedEffect = (effect: () => void, delay: number, deps: string[]) => {
        const callback = React.useRef<() => void>();
        useEffect(() => {
          callback.current = effect;
        }, [effect]);
    
        useEffect(() => {
          const handler = setTimeout(() => {
            callback.current && callback.current();
          }, delay);
    
          return () => {
            clearTimeout(handler);
          };
        }, [...deps, delay]);
      };
    
      useDebouncedEffect(resetPasswordCheck , 300, [password]);
 ```
    
 비밀번호 Input의 입력이 종료 되었을 때 설정 딜레이 후
 비밀번호 확인 Input을 리셋한다.
 하지만 비밀번호 확인 Input을 리셋하는 것이 UX를 저하시킨다고 판단되었다.
    
 ---
    
 1. focus 상태에 따라 유효성 검사 재실행 하도록 구현
    
 ```tsx
    const passwordBlur: React.FocusEventHandler<HTMLInputElement> = () => {
        trigger('confirmPassword');
    
    const useDebouncedEffect = (effect: () => void, delay: number, deps: string[]) => {
        const callback = React.useRef<() => void>();
        useEffect(() => {
          callback.current = effect;
        }, [effect]);
    
        useEffect(() => {
          const handler = setTimeout(() => {
            callback.current && callback.current();
          }, delay);
    
          return () => {
            clearTimeout(handler);
          };
        }, [...deps, delay]);
      };
    
      useDebouncedEffect(passwordBlur, 300, [password]);
 ```
    
 Input을 리셋 시키는 것이 아닌 자연스러운 UX 형성을 위해
 비밀번호 칸의 포커스(커서가 있는 상태)가 해제 되면(다른 영역 클릭 or tab 버튼 등)
 비밀번호 확인의 Input 유효성 검사를 재실행해,
 에러 메세지가 지워지는 것은 확인 했으나, 이 또한 매끄럽지 않은 느낌을 받았다.
    
 ---
    
 1. trigger 함수 사용
    
 ```tsx
    const password = watch('password');
    
      const reValidPasswordCheck = () => {
        trigger('confirmPassword');
      };
    
      const useDebouncedEffect = (effect: () => void, delay: number, deps: string[]) => {
        const callback = React.useRef<() => void>();
        useEffect(() => {
          callback.current = effect;
        }, [effect]);
    
        useEffect(() => {
          const handler = setTimeout(() => {
            callback.current && callback.current();
          }, delay);
    
          return () => {
            clearTimeout(handler);
          };
        }, [...deps, delay]);
      };
    
      useDebouncedEffect(reValidPasswordCheck, 300, [password]);
 ```
    
    어떤 것이 더 자연스러운 경험일까를 고민하다가 문득,
    유효성 검사만 한 번 더 실행시키면 되는 것을
    너무 어렵게 접근하고 있다는 생각이 들었다.
    
    React-Hook-Form 공식 문서를 참고해, 유효성 검사를 수동으로 호출하는
    내장 함수 `trigger` 를 사용하여, 간단하게 해결할 수 있던 문제였다.
    
    위 로직에서는 비밀번호 Input 값에 변화가 생기고, 값 변동을 마치면
    0.3초 후 비밀번호 확인 Input의 유효성 검사를 재진행한다. 

 ---
 ### 🌈 종합
    
    - 문제에 대해서 가볍게 접근하는 시선 역시 필요하다고 느껴짐
    - React-Hook-Form에는 아직 경험하지 못한 수많은 유용한 기능이 더 남아있어
    한 번 손을 댄 이상 더 깊은 탐구가 필요하다고 느껴짐

</details>
	  
<details>
<summary>onClick이벤트와 onMouseDown이벤트, onBlur이벤트</summary>	
	
- Type별 디자인 지정
    
    ### ❗ 문제 인식
    
    ```tsx
    export interface InputStyle {
      [key: string]: {
        width: string;
        height?: string;
        fontSize?: string;
        boxShadow?: string;
        border?: string;
        padding?: string;
        margin?: string;
      };
    }
    
    const inputStyle: InputStyle = {
      login: {
        width: '430px',
        height: '50px',
        boxShadow: '0 4px 4px rgba(201, 201, 201, 0.25)',
        fontSize: '15px',
        border: 'none',
        padding: '15px',
      },
      signup: {
        width: '595px',
        height: '50px',
        boxShadow: '0 4px 4px rgba(201, 201, 201, 0.25)',
        fontSize: '15px',
        border: 'none',
        padding: '15px',
        margin: '15px 165px 25px 0',
      }
    };
    ```
    
    기존 type별 스타일 지정을 위해서는 필요한 props를
    InputStyle에 하나하나 지정해주어야 하는 번거로움이 발생하기에,
    
    ```tsx
    type InputStyle = {
      [key in InputProps['types']]: React.CSSProperties;
    };
    
    const inputStyle: InputStyle = {
      login: {
         width: '430px',
         height: '50px',
         boxShadow: '0 4px 4px rgba(201, 201, 201, 0.25)',
         fontSize: '15px',
         border: 'none',
         padding: '15px',
      },
      signup: {
         width: '595px',
         height: '50px',
         boxShadow: '0 4px 4px rgba(201, 201, 201, 0.25)',
         fontSize: '15px',
         border: 'none',
         padding: '15px',
         margin: '15px 165px 25px 0',
      },
    };
    ```
    
    코드를 위와 같이 수정했다.
    
    interface > type으로 변경된 이유는 interface의 경우 `맵핑된 타입`을 생성할 수 없기에,
    이미 InputProps에 ‘login’ | ‘sign’으로 매핑된 키에 새로운 타입을 지정하기 위해서는
    type으로의 변경이 필수적이다.
    
    ```tsx
    export const StColumnInput = styled.input<InputProps>`
      ${({ types }) =>
        types &&
        css`
          ${inputStyle[types]} // 오버로드 미일치 오류 발생
        `};
    
      box-sizing: border-box;
      outline: none;
    `;
    ```
    
    이후 스타일을 지정하는 부분에서 계속 타입 에러가 발생했다.
    
	
    ---
	
    ### ❓ 원인
    
    styled-component를 깊이 분석하다가 발견한 점은, 해당 문제가 발생한 부분은
    types에 따른 스타일을 지정할 때 types && css 부분에서
    css 함수가 문자열이나 스타일 객체를 직접 받지 않고 `css구문(문자열)`을 입력받도록 설계된 함수이기 때문입니다.
    
    따라서 `스타일 객체`를 전달하면 타입 에러가 발생하게 됩니다.
    
	
    ---
	
    ### 🔧 해결방안
    
    해결책으로는 `attrs 메서드`를 사용하는 것입니다.
    attrs 메서드는 styled-component에서 제공하는 메서드로,
    컴포넌트에 동적이나 정적인 `속성을 할당` 할 수 있게 해줍니다.
    
    따라서 attrs 메서드를 활용하면 스타일 객체를 전달할 수 있게 되며,
    인터페이스에 스타일 속성을 추가하는 수고를 덜 수 있습니다.
    
    ```tsx
    export const StInput = styled.input.attrs<InputProps>(props => ({
    style: inputStyle[props.types],
    }))<InputProps>`box-sizing: border-box`;
    ```
    
    styled-component에 적용할 때 `attrs` 메서드를 사용해 속성을 정의하고,
    props => ({ style: inputStyle[props.types] }) 부분에서 함수를 전달하는데,
    `InputProps` 타입의 `props`를 인수로 받고,
    `props.types`에 따라 `inputStyle`객체에서 스타일을 선택하고,
    이를 `style`속성으로 지정합니다.
    
    ```tsx
    export const StInput = styled.input.attrs<InputProps>(props => ({
      style: { ...inputTypes[props.inputType], ...props.style },
    }))<InputProps>`
      box-sizing: border-box;
    `;
    ```
    
    추가적으로 타입별로 지정한 스타일만 사용할 경우,
    디자인이 조금만 달라져도, 타입을 매번 만들어줘야해 `재사용성`이 저하되기에,
    사용하는 컴포넌트에서 입력한 스타일이 최종적으로 덮어쓰게 하면서,
    오류를 해결하였습니다.

    ---
    
    ### 🌈 종합
    
    - TypeScript를 사용하기에 위와 같은 문제가 타입에러라는 것을 바로 알 수 있었습니다.
    - 라이브러리마다 내장하고 있는 기능들에 대해서 다시 생각해보는 계기가 되었고
    styled-component를 더 탐구하는 계기가 되었습니다.
    - 재사용성과 코드 간소화에 대해서 고민해보는 계기가 되었습니다.
	
</details>
	
<summary>성능개선</summary>	
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
