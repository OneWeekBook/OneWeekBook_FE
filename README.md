<h1 align="center">📖 생각을 함께 공유해요 OneWeekBook 📖</h1>
<div>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux Saga-47A248?style=flat-square&logo=Redux-Saga&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=Webpack&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon S3-232F3E?style=flat-square&logo=Amazon AWS&logoColor=white"/>
<div>
<img alt="React" src="https://img.shields.io/badge/React-18.2.0-red.svg"> <img alt="Redux" src="https://img.shields.io/badge/Redux-7.2.6-9cf.svg"> <img alt="ReduxSaga" src="https://img.shields.io/badge/Redux Saga-1.1.3-9cf.svg">  <img alt="Axios" src="https://img.shields.io/badge/Axios-0.26.1-red.svg"> <img alt="Styled Components" src="https://img.shields.io/badge/Styled Components-5.3.5-green.svg"> <img alt="typescript" src="https://img.shields.io/badge/typescript-4.7.4-blue.svg"> <img alt="platform" src="https://img.shields.io/badge/platform-Web-orange.svg">
  
## 👦 서비스 소개

> 책을 읽고 다른 사람들과 후기를 공유하기 위해 만든 서비스입니다.
  
개발 기간 : 2023.03.02 ~ 2023.06.28  
**version 2.0**  
디자인 수정 : 2023.02.03 ~ 2023.02.15  
1차 리팩토링 : 2023.04.14 ~ 2023.04.30  
2차 리팩토링 : 2023.05.27 ~ 2023.05.30  

### [OneWeekBook 서비스 바로가기](http://oneweekbook.s3-website.ap-northeast-2.amazonaws.com/)

## 💻 UI

### Main

|<p align="center">메인 페이지</p>|<p align="center">반응형</p>|
|------|------|
|<p align="center"><img src="https://github.com/OneWeekBook/OneWeekBook_FE/assets/49552804/ce308004-1aa8-4491-b6ec-2d6578874747.gif" width=60%/></p> |<p align="center"><img src="https://github.com/OneWeekBook/OneWeekBook_FE/assets/49552804/9a06ef3e-8c2a-446a-9710-a098aa8ce709.gif" width=60%/></p> |

- 이벤트 이미지를 슬라이드하는 이미지 슬라이드 기능 구현  
  자동 슬라이드, 호버시 슬라이드 멈춤 기능, 반응형 구현
- 추천순/신규 리뷰 리스트 
  
### Search
  
|<p align="center">검색 페이지</p>|<p align="center">전체 검색 결과 페이지</p>|
|------|------|
|<p align="center"><img src="https://github.com/OneWeekBook/OneWeekBook_FE/assets/49552804/dd00aefb-26a4-48d8-9c71-3f4adb05409a.gif" width=60%/></p> |<p align="center"><img src="https://github.com/OneWeekBook/OneWeekBook_FE/assets/49552804/82d84c5c-c7d1-4b66-ba46-a89b9ae34ba8.gif" width=60%/></p> |
  
- 1차, 2차 카테고리 검색 및 검색어 입력 시 책 검색 기능 구현
- 모두보기 클릭 시 해당 검색 정보에 대한 전체 책 검색 결과를 보여주며 더보기 버튼을 누르면 다음 검색 결과를 출력
- 찜 버튼을 눌러 내 서재에 책 소장 가능
  
### Review
|<p align="center">전체 리뷰 페이지</p>|<p align="center">책 상세 페이지</p>|
|------|------|
|<p align="center"><img src="https://github.com/OneWeekBook/OneWeekBook_FE/assets/49552804/14df81ef-79f2-4df7-9463-be297e8b3cf9.gif" width=60%/></p> |<p align="center"><img src="https://github.com/OneWeekBook/OneWeekBook_FE/assets/49552804/69170cb4-6368-4dc6-889d-cec7d552556c.gif" width=60%/></p> |
  
- 사용자들의 리뷰 정보를 보여주는 페이지
- 전체 리뷰에서 해당 도서 선택 시 해당 도서의 정보 및 리뷰를 모두 볼 수 있음
- 마음에 드는 리뷰가 있다면 좋아요를 누를 수 있는 기능 구현
  
### Sign
|<p align="center">로그인 페이지</p>|<p align="center">회원가입 페이지</p>|
|------|------|
|<p align="center"><img src="https://github.com/OneWeekBook/OneWeekBook_FE/assets/49552804/7be05ca2-583a-4167-bc57-1563defa988e.gif" width=60%/></p> |<p align="center"><img src="https://github.com/OneWeekBook/OneWeekBook_FE/assets/49552804/c2570930-2a39-4b79-9308-97f5f8013843.gif" width=60%/></p> |
  
- 로그인 및 회원 가입, 로그아웃 기능 구현
- 회원 가입 시 이메일 인증 기능을 통해 인증 코드를 받고 해당 코드로 인증을 진행하는 기능 구현

### Library
|<p align="center">내서재 페이지</p>|<p align="center">구문 & 리뷰 기능</p>|
|------|------|
|<p align="center"><img src="https://github.com/OneWeekBook/OneWeekBook_FE/assets/49552804/d0edbf2a-d333-4d89-9042-a570bd1c6d72.gif" width=60%/></p> |<p align="center"><img src="https://github.com/OneWeekBook/OneWeekBook_FE/assets/49552804/a5af71cf-9260-4574-a0e3-4ac6ee33575b.gif" width=60%/></p> |
  
- 내서재의 책들은 좋아요/읽는중/다읽은 세 가지 상태로 구분하며 내서재에 등록된 책 삭제 가능
- 읽는중 책에서 기억에 남는 책 구절을 입력 및 삭제하는 모달 구현, 독서 완료 누르면 다읽은 책으로 이동
- 다읽은 책에서 책의 리뷰를 입력/수정/삭제할 수 있는 모달 구현, 리뷰 작성 시 자신이 작성한 리뷰를 다른 사람과 공유 가능

### User
|<p align="center">마이 페이지</p>|<p align="center">닉네임 & 비밀번호 변경 기능</p>|
|------|------|
|<p align="center"><img src="https://github.com/OneWeekBook/OneWeekBook_FE/assets/49552804/173b24ed-c66d-4c3c-bc2c-8377c259c754.gif" width=60%/></p> |<p align="center"><img src="https://github.com/OneWeekBook/OneWeekBook_FE/assets/49552804/d7002130-79eb-4a63-bd00-939cb682faf6.gif" width=60%/></p> |
  
- 유저의 정보 및 등급을 확인할 수 있음
- 닉네임 변경, 비밀번호 변경, 회원 가입 탈퇴 기능 구현
- 유저가 지금까지 다읽은 책들을 리스트 형태로 볼 수 있음
  
## 🛠 활용 기술

- React + TypeScript를 이용하여 서비스를 구현했습니다.
- 전역 상태 관리 및 미들웨어를 구현하기 위해 Redux, Redux-Saga를 이용했습니다.  
- Atomic 디자인 패턴을 이용하여 컴포넌트 구조화했습니다. (atom, module, page)  
- 자주 사용하는 컴포넌트(Button, Input, Items 등)들을 모듈화하여 재사용성 높였습니다.
- 자주 사용하는 기능(ErrorCheck, Auth, Debounce, Toggle, Input 등)들을 Custom Hooks를 이용하여 재사용성 높였습니다.
- CSS in JS 라이브러리인 styled-components를 이용하여 React 컴포넌트를 스타일링 했습니다.
- react-toastify를 이용하여 토스트 메시지 기능을 추가했습니다. 
- media-query를 이용하여 반응형 디자인을 구현했습니다.
- AWS S3를 이용하여 정적 웹사이트 호스팅을 하며 AWS EC2에 있는 서버에서 데이터를 받아옵니다.

### [개발 시나리오 및 리팩토링 내용 등 더 자세한 내용을 보고싶다면? - 개발 위키](https://github.com/OneWeekBook/OneWeekBook_FE/wiki)
