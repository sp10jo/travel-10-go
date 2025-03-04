# 🛫 Travel-10-Go

> _"국내여행을 보다 쉽게, 한눈에!"_

![image](https://github.com/user-attachments/assets/ce46f821-75b1-4d71-8ccb-ae37482b65ba)

## 🧙🏻‍♂️ 팀원 소개
| 이름 |역할|
| :--: | -------- |
| 🐠 이지은 | 👑팀장👑 메인 페이지, 리뷰 작성 및 수정 페이지, 피그마 관리 |
| 🐈 고용준 | 전체적인 헤더틀, 공통 컴포넌트 작성, 카카오 API |
| 🐈‍⬛ 김선제 | 로그인, 회원가입, 데이터 관리, 회원 정보 수정,  라우터 |
| 🐢 김시헌 | 마이페이지, 나의 리뷰보기|
| 🦔 김태진 | 리뷰 레이아웃, 리뷰 데이터 지역 별로 가져오기 및 보이기, 공통 컴포넌트 작업|
| 🐕 유선영 | 유투브 API, 헤더 마무리, 리뷰 이미지 수정 |


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

| 기술 | 사용 목적 |
| :--: | -------- |
| ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white) | UI 개발 |
| ![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white) | 페이지 라우팅 |
| ![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white) | 데이터 비동기 관리 |
| ![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=zustand&logoColor=white) | 전역 상태 관리 |
| ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) | 백엔드 및 데이터베이스 |
| ![YouTube](https://img.shields.io/badge/YouTube%20API-FF0000?style=for-the-badge&logo=youtube&logoColor=white) | 여행 관련 영상 제공 |
| ![KakaoMap](https://img.shields.io/badge/KakaoMap-FFCD00?style=for-the-badge&logo=kakao&logoColor=black) | 지도 및 마커 표시 |
| ![React Icons](https://img.shields.io/badge/React%20Icons-E91E63?style=for-the-badge&logo=react&logoColor=white) | 아이콘 라이브러리 |
| ![UUID](https://img.shields.io/badge/UUID-007ACC?style=for-the-badge&logo=microsoft&logoColor=white) | 이미지 ID 관리 |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white) | 전체적인 CSS 다듬기 |
| 🛠 **Custom Hooks & Components** | 코드 재사용성 향상 |


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
