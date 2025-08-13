# Vercel 환경변수 설정 가이드

## 🔧 설정할 환경변수

### 1. Vercel 대시보드 접속
- URL: https://vercel.com/hongik423-3087s-projects/aicamp_v3.0/settings/environment-variables

### 2. 환경변수 추가 (Production 환경)

```bash
# GEMINI API 설정
GEMINI_API_KEY = AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM
NEXT_PUBLIC_GEMINI_API_KEY = AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM

# 관리자 정보
NEXT_PUBLIC_ADMIN_EMAIL = hongik423@gmail.com

# Google Apps Script URL
NEXT_PUBLIC_GOOGLE_SCRIPT_URL = https://script.google.com/macros/s/AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj/exec
NEXT_PUBLIC_GAS_URL = https://script.google.com/macros/s/AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj/exec

# 사이트 정보
NEXT_PUBLIC_SITE_URL = https://aicamp.club

# 개발 환경
NODE_ENV = production
```

### 3. 환경변수 설정 후 재배포
- 환경변수 설정 완료 후 자동으로 재배포됩니다.
- 또는 `vercel --prod` 명령으로 수동 재배포 가능합니다.
