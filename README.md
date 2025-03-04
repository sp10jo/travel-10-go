# 🛫 Travel-10-Go

> _"국내여행을 보다 쉽게, 한눈에!"_

## 📌 프로젝트 소개

**Travel-10-Go**는 사용자가 선택한 지역에 대한 정보를 **지도, YouTube 영상, 사용자 리뷰**를 통해 한눈에 확인할 수 있도록 도와주는 여행 정보 제공 플랫폼입니다.

이제 여행지 정보를 이곳저곳에서 찾을 필요 없이 **한 곳에서** 쉽게 확인하세요!

## 🎯 주요 기능

### 🔹 지역 기반 여행 정보 제공

- 사용자가 선택한 **지역의 지도**를 표시
- 해당 지역과 관련된 **YouTube 영상** 제공
- 지도에 **마커**를 추가하여 사용자 리뷰 확인 가능

### 🔹 사용자 리뷰 시스템

- 지역에 대한 **리뷰 작성** 가능
- 리뷰에 **최대 3장의 사진** 첨부 가능
- 작성한 리뷰를 **수정 및 삭제** 가능

### 🔹 회원 관리 기능

- **회원가입 / 로그인 / 회원정보 수정** 지원

## 🛠 기술 스택

| 기술                            | 사용 목적              |
| ------------------------------- | ---------------------- |
| **React**                       | UI 개발                |
| **React Router**                | 페이지 라우팅          |
| **TanStack Query**              | 데이터 비동기 관리     |
| **React Mutation**              | 데이터 변경 처리       |
| **Zustand**                     | 전역 상태 관리         |
| **Supabase**                    | 백엔드 및 데이터베이스 |
| **YouTube API**                 | 여행 관련 영상 제공    |
| **카카오맵 API**                | 지도 및 마커 표시      |
| **커스텀 컴포넌트 / 커스텀 훅** | 코드 재사용성 향상     |

## 📷 프로젝트 미리보기

> (스크린샷 또는 GIF 추가 예정)

## 🚀 시작하기

### 1️⃣ 프로젝트 클론

```sh
git clone https://github.com/your-repo/travel-10-go.git
cd travel-10-go
```

### 2️⃣ 패키지 설치

```sh
pnpm install
```

### 3️⃣ 환경 변수 설정

`.env` 파일을 생성하고 아래와 같이 API 키 추가해야합니다! 문의주세요!

```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_KEY=your_supabase_key
REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key
REACT_APP_KAKAO_MAP_KEY=your_kakao_map_key
```

### 4️⃣ 프로젝트 실행

```sh
pnpm dev
```

## 🛤 프로젝트 구조

```plaintext
📂 travel-10-go
 ┣ 📂 src
 ┃ ┣ 📂 api          # API 관련 함수
 ┃ ┣ 📂 components   # 공통 컴포넌트
 ┃ ┣ 📂 hooks        # 커스텀 훅
 ┃ ┣ 📂 pages        # 주요 페이지
 ┃ ┣ 📂 shared       # 라우터 작성
 ┃ ┣ 📂 supabase     # 클라이언트
 ┃ ┣ 📂 utils        #
 ┃ ┣ 📂 zustand      # Zustand 상태 관리
 ┃ ┣ 📜 App.js       # 라우팅 및 전체 레이아웃
 ┃ ┗ 📜 main.js      # 프로젝트 진입점
 ┣ 📜 README.md
 ┣ 📜 package.json
 ┗ 📜 .gitignore
```

## 👏 기여 방법

1. 레포지토리를 포크합니다.
2. 새로운 브랜치를 생성합니다. (`feature/새로운-기능`)
3. 변경 사항을 커밋하고 푸시합니다.
4. PR을 생성합니다.

## 📜 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자유롭게 사용하고 기여해주세요!
