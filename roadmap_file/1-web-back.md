## 웹 개발 - 백엔드: 간단한 블로그 API 서버 (Node.js + Express.js + MySQL)
> 목표: Node.js와 Express.js를 사용하여 RESTful API 서버를 구축하고, MySQL 데이터베이스와 연동하여 기본적인 CRUD(생성, 읽기, 수정, 삭제) 기능을 구현합니다.

### 1주차: Node.js 및 Express.js 환경 설정, MySQL 연동
- Node.js 설치 및 npm/yarn 초기화
- Express.js 설치 및 기본 서버 구조 설정 (app.js 또는 index.js)
- MySQL 데이터베이스 설치 및 초기 설정 (데이터베이스, 사용자 생성)
- mysql2 또는 sequelize 라이브러리 설치 및 Node.js와 MySQL 연결 테스트
- 게시글 테이블 (posts) 스키마 설계 (id, title, content, author, created_at 등)
- Git/GitHub 저장소 생성 및 초기 커밋

### 2주차: 게시글 조회 및 생성 API 구현
- 모든 게시글 조회 API (GET /posts) 구현 (데이터베이스에서 모든 게시글 가져오기)
- 특정 ID의 게시글 조회 API (GET /posts/:id) 구현
- 새로운 게시글 생성 API (POST /posts) 구현 (클라이언트로부터 데이터 받아 데이터베이스에 저장)
- API 테스트 도구 사용법 학습 (Postman 또는 VS Code REST Client)

### 3주차: 게시글 수정 및 삭제 API 구현
- 특정 ID의 게시글 수정 API (PUT /posts/:id 또는 PATCH /posts/:id) 구현
- 특정 ID의 게시글 삭제 API (DELETE /posts/:id) 구현
- 데이터베이스 트랜잭션의 개념 이해 (선택 사항, 고급)
- API 에러 핸들링 구현 (예: 게시글이 없을 경우 404 응답)

### 4주차: 프로젝트 마무리 및 문서화
- 코드 리팩토링 및 모듈화 (라우터, 컨트롤러, 서비스 분리)
- 환경 변수 관리 (dotenv 라이브러리 사용)
- API 문서화 (Swagger 또는 간단한 Markdown 파일)
- README.md 파일 작성 (프로젝트 설명, API 엔드포인트, 사용 기술, 설치 및 실행 방법 등)
- Git/GitHub를 통한 최종 코드 관리 및 포트폴리오 준비

[🔗 백엔드 개발자 로드맵](https://roadmap.sh/backend)