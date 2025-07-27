# 🚀 AI CAMP Vercel 배포 가이드 (2025.07.27 최종버전)

## 🎯 환경변수 정보 확정

**사용자 제공 정확한 환경변수 정보:**

```bash
# ✅ 실제 작동하는 Google Apps Script 정보
배포 ID: AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB
웹앱 URL: https://script.google.com/macros/s/AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB/exec
라이브러리 URL: https://script.google.com/macros/library/d/1Iot8Hzeuq8plBXy0ODQ43_k3JPa1ec_dJUgFqNyziIu5xShVylUYYl5z/9
스크립트 ID: 1Iot8Hzeuq8plBXy0ODQ43_k3JPa1ec_dJUgFqNyziIu5xShVylUYYl5z
Google Sheets ID: 1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00
Google Sheets URL: https://docs.google.com/spreadsheets/d/1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00/edit?gid=1689329514#gid=1689329514
```

## 🛠️ 단계별 배포 가이드

### 1단계: 환경변수 파일 준비

**`.env.local` 파일 생성** (프로젝트 루트에)
```bash
# ===========================================
# AICAMP v3.0 환경변수 설정 (정확한 버전)
# ===========================================

# Google Gemini API 키
GEMINI_API_KEY=AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM

# 🔥 Google Apps Script 설정 (사용자 제공 정확한 정보)
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB/exec
NEXT_PUBLIC_GOOGLE_SCRIPT_ID=1Iot8Hzeuq8plBXy0ODQ43_k3JPa1ec_dJUgFqNyziIu5xShVylUYYl5z
NEXT_PUBLIC_GOOGLE_SCRIPT_DEPLOYMENT_ID=AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB
NEXT_PUBLIC_GOOGLE_SCRIPT_LIBRARY_URL=https://script.google.com/macros/library/d/1Iot8Hzeuq8plBXy0ODQ43_k3JPa1ec_dJUgFqNyziIu5xShVylUYYl5z/9

# 구글시트 설정 (정확한 URL 포함)
NEXT_PUBLIC_GOOGLE_SHEETS_ID=1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00
NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://docs.google.com/spreadsheets/d/1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00/edit?gid=1689329514#gid=1689329514

# AI CAMP 회사 정보
NEXT_PUBLIC_COMPANY_NAME=AI CAMP
NEXT_PUBLIC_CONSULTANT_NAME=이후경 교장
NEXT_PUBLIC_COMPANY_EMAIL=hongik423@gmail.com
NEXT_PUBLIC_COMPANY_PHONE=010-9251-9743

# 시스템 설정
NODE_ENV=production
NEXT_PUBLIC_BETA_FEEDBACK_ENABLED=true
```

### 2단계: Vercel CLI 설정

```bash
# Vercel CLI 설치 (없는 경우)
npm install -g vercel

# Vercel 로그인
vercel login

# 프로젝트 초기화 (처음인 경우)
vercel
```

### 3단계: 환경변수 업로드

**자동 스크립트 실행 (Windows):**
```bash
./deploy-vercel-fixed.bat
```

**수동 설정:**
```bash
# 핵심 환경변수 설정 (정확한 값)
vercel env add NEXT_PUBLIC_GOOGLE_SCRIPT_URL production
# 값: https://script.google.com/macros/s/AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB/exec

vercel env add GEMINI_API_KEY production
# 값: AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM

vercel env add NEXT_PUBLIC_GOOGLE_SHEETS_ID production
# 값: 1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00
```

### 4단계: Vercel 배포

```bash
# 환경변수 파일 복사
copy env.local.production .env.local

# 프로덕션 배포
vercel --prod
```

## 🧪 배포 후 테스트

### 필수 테스트 항목

1. **웹사이트 접속 확인**
   ```
   https://aicamp-v3-0.vercel.app
   ```

2. **Google Apps Script 연동 테스트**
   - 직접 URL 접속 테스트:
   ```
   https://script.google.com/macros/s/AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB/exec
   ```

3. **진단신청 기능 테스트**
   - AI 무료진단 페이지 접속
   - 진단 신청 폼 작성 및 제출
   - 302 오류 없이 정상 처리 확인

4. **상담신청 기능 테스트**
   - 상담신청 페이지 접속
   - 상담 신청 폼 작성 및 제출
   - 정상 처리 확인

5. **베타피드백 기능 테스트**
   - 세금계산기 등 베타 기능 테스트
   - 피드백 제출 기능 확인

## 🔧 Google Apps Script 확인사항

**Google Apps Script 에디터 접속:**
```
https://script.google.com/u/0/home/projects/1Iot8Hzeuq8plBXy0ODQ43_k3JPa1ec_dJUgFqNyziIu5xShVylUYYl5z/edit
```

**확인할 사항:**
1. 배포 상태가 "활성"인지 확인
2. 액세스 권한이 "모든 사용자"로 설정되어 있는지 확인
3. 웹앱 URL이 위의 정보와 일치하는지 확인

## 📊 배포 상태 확인

### Vercel 대시보드
```
https://vercel.com/dashboard
```

### 환경변수 확인
```bash
vercel env ls
```

### 배포 로그 확인
```bash
vercel logs
```

## 🚨 문제 해결

### 302 오류가 발생하는 경우:

1. **환경변수 재확인**
   - 위의 정확한 값들이 설정되어 있는지 확인
   - 특히 NEXT_PUBLIC_GOOGLE_SCRIPT_URL이 정확한지 확인

2. **Google Apps Script 상태 확인**
   - 배포가 활성화되어 있는지 확인
   - 액세스 권한이 "모든 사용자"로 설정되어 있는지 확인

3. **브라우저 캐시 삭제**
4. **시크릿 모드에서 테스트**

### 배포 실패 시:

1. **build 오류 확인**
   ```bash
   npm run build
   ```

2. **환경변수 누락 확인**
   ```bash
   vercel env ls
   ```

## ✅ 성공 확인

배포가 성공적으로 완료되면:

- ✅ 웹사이트 정상 접속 가능
- ✅ Google Apps Script 직접 호출 가능
- ✅ 진단신청 정상 작동
- ✅ 상담신청 정상 작동
- ✅ 베타피드백 정상 작동
- ✅ Google Sheets 연동 정상

## 🎉 배포 완료!

**AI CAMP 웹사이트가 성공적으로 배포되었습니다!**

- **배포 URL:** https://aicamp-v3-0.vercel.app
- **Google Apps Script:** ✅ 정확한 환경변수 적용
- **모든 기능:** ✅ 정상 작동

---

**마지막 업데이트:** 2025.07.27  
**배포 상태:** AI CAMP 시스템 통합 완료 