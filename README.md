## 원티드 프리온보딩 프론트엔드 - 선발과제

### 프로젝트 실행 방법
1. git clone <repo URL>
2. npm install 
3. npm start

### 사용한 라이브러리
axios, styled-components

### 구현 기능

* useEffect를 이용하여 token 없이 '/todo' 에 접속시 '/' 경로로 이동하고 토큰이 있다면 '/todo'로 이동하게끔 구현
* 회원가입시 유효성검사에 부적합할시 UI에 빨간글씨로 경고 출력하고 회원가입에 성공시 성공 메시지 alert창으로 띄우게끔 구현
* 로그인에 성공시 로컬스토리지에 토큰을 저장하고 '/todo' 로 이동하고 로그인에 실패시 alert창으로 경고 출력
* RESTAPI방식의 통신방식으로 투두리스트 구현
