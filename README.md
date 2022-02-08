# Forkie-Player 웹 리뉴얼

- 본 프로젝트는 [yourlist](https://yourlist.me) 웹 리뉴얼을 위해 만들어졌습니다.
  - 구 프로젝트 이름 : Yourlist, 변경된 이름 : Forkie-Player
- 디자인 시안 : https://www.figma.com/file/KHYV1S3QY7xZh0shUpyHhd/Yourlist?node-id=0%3A1

### 스택

- front-end
  - typescript
  - react
  - redux-saga or redux-pender
- css
  - emotion or styled-components
  - tailwindcss
  - material-ui
- test
  - jest
  - esLint
- analytics
  - google-analytics-react

### 디렉터리 구조

- assets : 애니메이션, 이미지 등
- components : 컴포넌트
  - elements : 공통으로 사용하는 작은 컴포넌트들
  - [컴포넌트명] - 주로 페이지 단위로 나뉨
    - index.tsx : 컴포넌트 최상단
    - container : 컴포넌트를 구성하는 작은 단위 컴포넌트들의 컨테이너
    - viwe : 컴포넌트를 구성하는 작은 단위 컴포넌트들의 뷰
    - elements : 컴포넌트 내에서 공통으로 자주 사용되는 작은 컴포넌트
- routes : 네비게이션 최상단. 각 페이지의 최상단이며, 네비게이션 관련 작업들을 함.
- lib
  - api : api 파일들 모음
  - hooks : 커스텀 훅들
  - style : 스타일 관련 파일들 (ex : palette 등)
  - utils : 유틸리티 함수들
  - constants.ts : 상수 관련 파일
  - strings.ts : 문자열 관련 파일
- modules
  - index.ts : 모듈 최상단
  - moduleTypes.ts : 모듈에서 공통으로 사용되는 타입들
  - [모듈명]
    - index.ts : 모듈 최상단. 리듀서 포함
    - saga.ts : 모듈의 리덕스 사가 관련 코드 모음
    - action.ts : 액션 타입, 액션 생성 함수 등 포함
    - types.ts : 모듈에서 사용되는 타입들
