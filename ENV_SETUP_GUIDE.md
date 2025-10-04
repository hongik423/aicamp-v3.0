# 🔧 환경변수 설정 가이드

## 필수 환경변수 설정

### 1. GEMINI API 키 설정
1. https://makersuite.google.com/app/apikey 접속
2. API 키 생성
3. GEMINI_API_KEY에 설정

### 2. Google Drive API 설정
1. Google Cloud Console에서 서비스 계정 생성
2. 서비스 계정 키 다운로드
3. GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY 설정

### 3. 환경변수 파일 생성
```bash
# Windows
copy .env.example .env.local

# Linux/Mac
cp .env.example .env.local
```

### 4. 실제 값으로 교체
- GEMINI_API_KEY: 실제 API 키
- Google Drive 관련 설정: 실제 서비스 계정 정보
- SMTP 설정: 실제 이메일 서버 정보

## 테스트 실행
```bash
npm run dev
```
