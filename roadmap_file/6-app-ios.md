## 서울디지텍고등학교 학생을 위한 iOS 앱 개발 6개월 로드맵: "스마트 급식 도우미" 앱 개발

> 목표: Swift, SwiftUI, Firebase를 활용하여 학교 급식 메뉴를 효과적으로 보여주고 학생들의 의견을 수렴하는 "스마트 급식 도우미" 앱을 개발하며, iOS 개발 전반에 대한 이해도를 높인다.

### 기술 스택:

*   **언어:** Swift
*   **UI 프레임워크:** SwiftUI
*   **데이터베이스:** Firebase (Firestore, Authentication)
*   **기타:** Combine (비동기 처리), MVVM 디자인 패턴

---

**1개월차: iOS 개발 환경 구축 및 Swift 기초 다지기**

*   **1주차:**
    *   iOS 개발 환경 (Xcode) 설치 및 설정
    *   Swift 문법 기초 학습 (변수, 상수, 데이터 타입, 연산자, 조건문, 반복문)
    *   Playground를 활용한 Swift 코드 실습
*   **2주차:**
    *   Swift의 함수, 구조체, 클래스 개념 학습 및 활용
    *   옵셔널 (Optional) 타입 이해 및 안전한 코드 작성 방법 학습
    *   컬렉션 타입 (Array, Dictionary, Set) 학습 및 활용
*   **3주차:**
    *   SwiftUI 기초 학습 (View, Modifier, State)
    *   간단한 UI 만들기 (Text, Image, Button 등)
    *   Stack을 이용한 UI 레이아웃 구성
*   **4주차:**
    *   UI 컴포넌트 배치 및 스타일링 연습
    *   NavigationLink를 사용한 화면 전환 구현
    *   간단한 데이터 모델 정의 및 UI에 바인딩
    *   **프로젝트:** 간단한 "미니 계산기" 앱 SwiftUI로 구현

---

**2개월차: SwiftUI 심화 학습 및 Firebase 연동 준비**

*   **5주차:**
    *   SwiftUI의 List, ForEach를 이용한 데이터 목록 표시
    *   ScrollView를 이용한 스크롤 가능한 콘텐츠 구현
    *   State, Binding을 이용한 데이터 흐름 관리 심화 학습
*   **6주차:**
    *   ObservableObject, @ObservedObject를 이용한 MVVM 패턴 적용 준비
    *   Combine 프레임워크 기초 학습 (Publisher, Subscriber)
    *   Future, Promise를 이용한 비동기 처리 맛보기
*   **7주차:**
    *   Firebase 프로젝트 생성 및 설정
    *   Firebase Authentication을 이용한 사용자 인증 기능 연동 준비
    *   Firebase Firestore를 이용한 데이터베이스 연동 준비
*   **8주차:**
    *   앱 디자인 및 UI/UX 설계 (스마트 급식 도우미 앱 컨셉 구체화)
    *   Firestore 데이터 구조 설계 (메뉴, 리뷰, 좋아요 등)
    *   **프로젝트:** 급식 메뉴 항목을 보여주는 간단한 UI Mockup 구현 (더미 데이터 활용)

---

**3개월차: Firebase 연동 및 데이터 관리 기능 구현**

*   **9주차:**
    *   Firebase Authentication을 이용한 로그인/회원가입 기능 구현
    *   사용자 인증 상태 관리 및 UI 업데이트
*   **10주차:**
    *   Firestore에 급식 메뉴 데이터 저장 및 읽기 기능 구현
    *   날짜별 메뉴 표시 기능 구현
*   **11주차:**
    *   Firestore 데이터 모델링 (메뉴, 리뷰, 사용자 정보)
    *   사용자가 급식 메뉴에 대한 리뷰를 작성하고 저장하는 기능 구현
*   **12주차:**
    *   Firestore에 저장된 리뷰 데이터 읽어와 UI에 표시하는 기능 구현
    *   **프로젝트:** Firebase 연동 로그인/회원가입 기능 구현 완료

---

**4개월차: MVVM 패턴 적용 및 사용자 인터랙션 강화**

*   **13주차:**
    *   앱 전체에 MVVM 패턴 적용
    *   View, ViewModel, Model 레이어 분리 및 데이터 흐름 관리
*   **14주차:**
    *   사용자가 메뉴에 '좋아요'를 누르는 기능 구현
    *   Firestore 데이터 업데이트 (좋아요 수 증가/감소)
*   **15주차:**
    *   Combine을 이용한 비동기 데이터 처리 및 UI 업데이트
    *   에러 핸들링 및 사용자에게 피드백 제공
*   **16주차:**
    *   검색 기능을 구현하여 특정 메뉴를 쉽게 찾을 수 있도록 개선
    *   **프로젝트:** MVVM 패턴 기반 급식 메뉴 상세 화면 구현 및 "좋아요" 기능 연동

---

**5개월차: UI/UX 개선 및 추가 기능 개발**

*   **17주차:**
    *   앱 디자인 개선 (색상, 폰트, 레이아웃 등)
    *   사용자 경험 개선 (애니메이션, 전환 효과 등)
*   **18주차:**
    *   학생들이 급식 메뉴에 대한 의견을 투표하는 기능 구현
    *   투표 결과 실시간 업데이트
*   **19주차:**
    *   학교 공지사항 게시판 연동 (Firestore or 외부 API 활용)
    *   푸시 알림을 이용한 급식 메뉴 업데이트 알림 기능 구현 (Firebase Cloud Messaging)
*   **20주차:**
    *   Core Data를 이용하여 사용자 선호 메뉴 저장 기능 구현 (optional)
    *   **프로젝트:** 투표 기능 및 공지사항 게시판 구현

---

**6개월차: 최종 마무리 및 배포 준비**

*   **21주차:**
    *   코드 리팩토링 및 가독성 향상
    *   테스트 코드 작성 (Unit Test, UI Test)
*   **22주차:**
    *   앱 성능 최적화 (이미지 로딩, 데이터 처리 등)
    *   다양한 화면 크기 및 iOS 버전에서 앱 테스트
*   **23주차:**
    *   앱 아이콘, 스크린샷, 앱 설명 작성
    *   App Store Connect 계정 설정 및 앱 등록 준비
*   **24주차:**
    *   **최종:** 앱 빌드 및 App Store에 배포
    *   README.md 파일 작성 (프로젝트 설명, 사용 기술, 설치 및 실행 방법 등)
    *   Git/GitHub를 통한 최종 코드 관리 및 포트폴리오 준비
    *   발표 자료 제작 및 발표 준비 (프로젝트 소개, 개발 과정, 느낀점 등)

[🔗 IOS 앱 개발자 로드맵](https://roadmap.sh/ios)
