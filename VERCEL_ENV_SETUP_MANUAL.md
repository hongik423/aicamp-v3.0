# 🚀 Vercel 환경변수 수동 설정 가이드

## 📋 설정해야 할 환경변수 (V14.2 ULTIMATE INTEGRATED)

### 1. Vercel 대시보드 접속
- https://vercel.com/dashboard
- aicamp_v3.0 프로젝트 선택
- Settings → Environment Variables

### 2. 필수 환경변수 설정

```bash
# Google Apps Script 연동 (V14.2 ULTIMATE)
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj/exec
NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj/exec

# Google Sheets 연동
NEXT_PUBLIC_GOOGLE_SHEETS_ID=1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ

# GEMINI AI API (서버 사이드 전용)
GEMINI_API_KEY=AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM

# 도메인 설정
NEXT_PUBLIC_BASE_URL=https://aicamp.club

# 시스템 설정
NODE_ENV=production
```

### 3. 설정 방법

각 환경변수를 다음과 같이 설정:
1. **Name**: 환경변수 이름 입력
2. **Value**: 해당 값 입력  
3. **Environment**: Production 선택
4. **Save** 클릭

### 4. 설정 완료 후

- **Redeploy** 버튼 클릭하여 새로운 환경변수로 재배포
- 약 2-3분 후 https://aicamp.club 에서 확인

## ✅ 설정 확인 방법

배포 완료 후 다음 URL로 확인:
- 메인 사이트: https://aicamp.club
- AI 진단: https://aicamp.club/ai-diagnosis
- 오류 차단 상태: https://aicamp.club/api/error-shield
- Manifest: https://aicamp.club/api/manifest

## 🎯 중요사항

- 모든 환경변수는 **Production** 환경에 설정
- 설정 후 반드시 **Redeploy** 실행
- Google Apps Script V14.2 ULTIMATE와 완전 동기화됨
