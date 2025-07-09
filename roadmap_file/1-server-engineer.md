## 서버 엔지니어: Docker를 이용한 웹 서버 배포 및 자동화 스크립트 작성
> 목표: Docker를 사용하여 Nginx 웹 서버를 컨테이너화하고 배포하며, 쉘 스크립트를 통해 웹 서버 설정 변경 및 로그 백업을 자동화합니다.

### 1주차: Docker 기초 및 Nginx 컨테이너화
- Docker 설치 및 기본 명령어 학습 (docker run, docker ps, docker images, docker stop, docker rm)
- Nginx 웹 서버의 개념 및 기본 설정 이해
- 간단한 HTML 파일을 제공하는 Nginx 웹 서버 Dockerfile 작성
- Dockerfile 빌드 및 Docker 이미지 생성 (docker build)
- 생성된 Docker 이미지로 Nginx 컨테이너 실행 (docker run -p 80:80)
- Git/GitHub 저장소 생성 및 초기 커밋

### 2주차: Nginx 설정 파일 변경 및 이미지 재빌드 자동화
- Nginx 설정 파일 (nginx.conf)을 Docker 이미지에 포함시키는 방법 학습 (COPY 명령어)
- 웹 서버 설정 파일을 변경하고, 변경된 설정으로 Docker 이미지를 재빌드하는 쉘 스크립트 작성
- 스크립트를 통해 기존 컨테이너 중지 및 삭제 후 새로운 컨테이너 실행 자동화
- 볼륨 마운트 개념 이해 및 Nginx 설정 파일을 호스트 머신과 공유하는 방법 학습 (선택 사항)

### 3주차: 웹 서버 로그 관리 및 백업 자동화
- Nginx 로그 파일의 위치 및 형식 이해
- Docker 컨테이너 내부의 Nginx 로그를 호스트 머신으로 가져오는 방법 학습 (Docker logs 또는 볼륨 마운트)
- Nginx 접근 로그 및 에러 로그를 주기적으로 백업하는 쉘 스크립트 작성 (예: cron을 이용한 스케줄링)
- 백업된 로그 파일을 압축하고 날짜별로 관리하는 기능 추가

### 4주차: 프로젝트 마무리 및 문서화
- 작성된 쉘 스크립트의 가독성 및 견고성 향상
- 스크립트 실행 권한 설정 및 테스트
- README.md 파일 작성 (프로젝트 설명, Dockerfile 설명, 쉘 스크립트 사용법, 결과 확인 방법 등)
- Git/GitHub를 통한 최종 코드 관리 및 포트폴리오 준비

[🔗 서버 엔지니어 로드맵](https://roadmap.sh/docker)