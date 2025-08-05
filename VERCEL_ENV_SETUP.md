# Vercel 환경 변수 설정 가이드

## 필수 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수들을 설정해야 합니다:

### 1. 프로젝트 설정 접속
- Vercel 대시보드 → 프로젝트 선택 → Settings → Environment Variables

### 2. 환경 변수 추가

#### GEMINI_API_KEY
- **Name**: `GEMINI_API_KEY`
- **Value**: `AIzaSyDc8hKTL5wFzQm7_your_actual_gemini_api_key_here`
- **Environment**: Production, Preview, Development

#### NEXT_PUBLIC_GOOGLE_SCRIPT_URL
- **Name**: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
- **Value**: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`
- **Environment**: Production, Preview, Development

#### GEMINI_MODEL
- **Name**: `GEMINI_MODEL`
- **Value**: `gemini-2.5-flash`
- **Environment**: Production, Preview, Development

#### ADMIN_EMAIL
- **Name**: `ADMIN_EMAIL`
- **Value**: `mcampus2020@gmail.com`
- **Environment**: Production, Preview, Development

### 3. Google Apps Script URL 업데이트

현재 사용 중인 GAS URL:
```
https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec
```

### 4. 배포 후 확인사항

1. **환경 변수 확인**: Vercel 대시보드에서 모든 환경 변수가 올바르게 설정되었는지 확인
2. **GAS 스크립트 배포**: 최신 `google_apps_script_CLEAN_V2.js` 코드를 Google Apps Script에 배포
3. **API 테스트**: `/api/ai-capability-diagnosis` 엔드포인트 테스트
4. **전체 시스템 테스트**: AI 역량진단 전체 플로우 테스트

### 5. 문제 해결

#### 500 오류 발생 시
1. GAS 스크립트 로그 확인
2. 환경 변수 값 재확인
3. API 요청 데이터 형식 확인

#### 환경 변수 미인식 시
1. Vercel 프로젝트 재배포
2. 환경 변수 이름 대소문자 확인
3. 캐시 클리어 후 재시도