<h1 align="center">📖 생각을 함께 공유해요 OneWeekBook 📖</h1>
<div>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux Saga-47A248?style=flat-square&logo=Redux-Saga&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=Webpack&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon S3-232F3E?style=flat-square&logo=Amazon AWS&logoColor=white"/>
<div>
<img alt="React" src="https://img.shields.io/badge/React-17.0.2-red.svg"> <img alt="Redux" src="https://img.shields.io/badge/Redux-4.1.0-9cf.svg"> <img alt="ReduxSaga" src="https://img.shields.io/badge/Redux Saga-1.1.3-9cf.svg">  <img alt="Axios" src="https://img.shields.io/badge/Axios-0.26.1-red.svg"> <img alt="Styled Components" src="https://img.shields.io/badge/Styled Components-5.3.3-green.svg"> <img alt="typescript" src="https://img.shields.io/badge/typescript-4.17.1-blue.svg"> <img alt="platform" src="https://img.shields.io/badge/platform-Web-orange.svg">
  
### 서비스 소개

> 책을 읽고 다른 사람들과 후기를 공유하기 위해 만든 서비스입니다.

### [OneWeekBook 서비스 바로가기](http://oneweekbook.s3-website.ap-northeast-2.amazonaws.com/)

## 💻 UI

### MainPage
  
<table>
   <tr>
     <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/175851124-782a233b-cd84-4567-bac3-a913a18a2c58.gif"/>
       <br><br>[메인]
     </th>
     <th align="center">
       <img width="400" alt="2" src="https://user-images.githubusercontent.com/49552804/175851135-1f8cf1b8-5112-49b0-9695-e7d23fb95696.gif"/>
       <br><br>[반응형] 
    </th>
  </tr>
</table>

- 이벤트 이미지를 슬라이드하는 이미지 슬라이드 기능 구현  
  자동 슬라이드, 호버시 슬라이드 멈춤 기능, 반응형 구현
- 추천순/신규 리뷰 리스트 
  
### CategoryPage
  
<table>
   <tr>
     <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/175852247-3f1493b9-b7fa-4a97-a239-d55f730d203f.gif"/>
       <br><br>[검색]
     </th>
     <th align="center">
       <img width="400" alt="2" src="https://user-images.githubusercontent.com/49552804/175852252-f83d70be-75f3-4f93-8463-72d2c97970ad.gif"/>
       <br><br>[모두보기 및 찜] 
    </th>
  </tr>
</table>
  
- 1차, 2차 카테고리 검색 및 검색어 입력 시 책 검색 기능 구현
- 모두보기 클릭 시 해당 검색 정보에 대한 전체 책 검색 결과를 보여주며 더보기 버튼을 누르면 다음 검색 결과를 출력
- 찜 버튼을 눌러 내 서재에 책 소장 가능
  
### ReviewPage
 
<table>
   <tr>
     <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/175852441-5f041e88-cb8e-44f7-81c4-710cb6ded791.gif"/>
       <br><br>[전체 리뷰]
     </th>
     <th align="center">
       <img width="400" alt="2" src="https://user-images.githubusercontent.com/49552804/175852446-20ec328d-832a-4e9d-b678-043a3f2ddf0f.gif"/>
       <br><br>[리뷰 상세보기] 
    </th>
  </tr>
</table>
  
- 사용자들의 리뷰 정보를 보여주는 페이지
- 전체 리뷰에서 해당 도서 선택 시 해당 도서의 정보 및 리뷰를 모두 볼 수 있음
- 마음에 드는 리뷰가 있다면 좋아요를 누를 수 있는 기능 구현
  
### SignPage

<table>
   <tr>
     <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/175852527-05ff63b0-6ec1-48fb-9ea4-c83e8bec7b46.gif"/>
       <br><br>[로그인]
     </th>
     <th align="center">
       <img width="400" alt="2" src="https://user-images.githubusercontent.com/49552804/176085077-34ed952f-d1c8-472a-a956-f0bb8012031d.gif"/>
       <br><br>[회원가입] 
    </th>
  </tr>
</table>
  
- 로그인 및 회원 가입, 로그아웃 기능 구현
- 회원 가입 시 이메일 인증 기능을 통해 인증 코드를 받고 해당 코드로 인증을 진행하는 기능 구현

### MyLibraryPage
  
<table>
   <tr>
     <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/175852568-17db5964-38c2-436a-ac32-32180fd5ccc7.gif"/>
       <br><br>[내서재]
     </th>
     <th align="center">
       <img width="400" alt="2" src="https://user-images.githubusercontent.com/49552804/175852572-7439f631-384d-4e3a-8c50-2137ce33d558.gif"/>
       <br><br>[리뷰 작성] 
    </th>
  </tr>
</table>
  
- 내서재의 책들은 좋아요/읽는중/다읽은 세 가지 상태로 구분하며 내서재에 등록된 책 삭제 가능
- 읽는중 책에서 기억에 남는 책 구절을 입력 및 삭제하는 모달 구현, 독서 완료 누르면 다읽은 책으로 넘어감
- 다읽은 책에서 책의 리뷰를 입력/수정/삭제할 수 있는 모달 구현, 리뷰 작성 시 자신이 작성한 리뷰를 다른 사람과 공유 가능
  
## 🛠 활용 기술

1. React + TypeScript를 이용하여 서비스 구현  
2. 상태 관리 라이브러리로 Redux-Saga를 이용  
3. 자주 사용하는 컴포넌트(Button, Input, Items 등)들을 모듈화하여 재사용성 높임  
4. 자주 사용하는 기능(ErrorCheck, Auth, Debounce, Toggle, Input 등)들을 Custom Hooks를 이용하여 재사용성 높임  
5. CSS in JS 라이브러리인 styled-components를 이용하여 React 컴포넌트 스타일링  
6. react-minimal-pie-chart를 이용하여 리뷰 평균 점수를 파이 차트로 구현
7. react-toastify를 이용하여 토스트 메시지 기능 추가
8. media-query를 이용하여 반응형 디자인 구현
9. AWS S3를 이용하여 정적 웹사이트 호스팅, AWS EC2에 있는 서버에서 데이터를 받아옴
