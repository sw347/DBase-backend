## AI 엔지니어: 이미지 분류 모델 개발 (TensorFlow/Keras)
> 목표: TensorFlow/Keras를 사용하여 Fashion MNIST 데이터셋을 분류하는 딥러닝 모델을 개발하고, 모델 학습, 평가, 예측 과정을 경험합니다.

### 1주차: Python 및 TensorFlow/Keras 환경 설정, 데이터 로드
- Python 설치 및 가상 환경 설정 (Anaconda 또는 venv)
- TensorFlow 및 Keras 라이브러리 설치
- Jupyter Notebook 또는 Google Colab 사용법 학습
- Fashion MNIST 데이터셋 로드 및 데이터 구조 파악 (이미지, 라벨)
- 데이터 시각화 (matplotlib을 사용하여 이미지 몇 개 출력)
- Git/GitHub 저장소 생성 및 초기 커밋

### 2주차: 데이터 전처리 및 기본 모델 구축
- 이미지 데이터 정규화 (픽셀 값을 0~1 사이로 스케일링)
- 라벨 데이터 원-핫 인코딩 (필요시)
- 간단한 신경망 모델 설계 (Sequential API 사용, Dense 레이어 여러 개)
- 모델 컴파일 (옵티마이저, 손실 함수, 지표 설정)
- 모델 학습 (model.fit()) 및 학습 과정 시각화 (손실, 정확도 그래프)

### 3주차: 모델 성능 개선 및 평가
- CNN(Convolutional Neural Network) 레이어 추가하여 모델 구조 개선
- 드롭아웃(Dropout) 레이어 추가하여 과적합 방지
- 다양한 옵티마이저 (Adam, SGD 등) 및 학습률(Learning Rate) 실험
- 모델 평가 (model.evaluate()) 및 분류 보고서 확인 (Precision, Recall, F1-score)
- 오분류된 이미지 확인 및 분석

### 4주차: 프로젝트 마무리 및 예측 기능 구현
- 학습된 모델 저장 및 불러오기
- 새로운 이미지에 대한 예측 기능 구현 (model.predict())
- 예측 결과 시각화 (이미지와 예측 라벨 함께 출력)
- README.md 파일 작성 (프로젝트 설명, 데이터셋, 모델 구조, 결과, 실행 방법 등)
- Git/GitHub를 통한 최종 코드 관리 및 포트폴리오 준비

[🔗 AI 엔지니어 로드맵](https://roadmap.sh/ai-engineer)