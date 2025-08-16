# 🔧 AICAMP v3.0 환경변수 설정 가이드

## 📋 문제 진단 결과

현재 시스템에서 발생하는 문제들:

1. **❌ 진단 결과 저장 실패**: `hasData: false` 반복 발생
2. **❌ 이메일 발송 실패**: 신청 확인 및 결과 이메일 미발송
3. **❌ Google Drive 업로드 실패**: 공유 폴더에 보고서 미저장
4. **❌ 환경변수 누락**: `.env.local` 파일 없음

## 🛠️ 해결 방법

### 1단계: 환경변수 파일 생성

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# AICAMP v3.0 환경변수 설정

# 🔑 Google AI (Gemini) API 설정
GEMINI_API_KEY=AIzaSy[여기에_실제_API_키_입력]

# 📊 Google Apps Script 설정
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxlwpifmXQEmFlR0QBV6NbTemzxTxvWwbaXNGmtH4Ok-a0PDEqmtaKBjQ1VvZxpLnPz/exec
NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/AKfycbxlwpifmXQEmFlR0QBV6NbTemzxTxvWwbaXNGmtH4Ok-a0PDEqmtaKBjQ1VvZxpLnPz/exec
NEXT_PUBLIC_GOOGLE_SHEETS_ID=1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ

# 🗂️ Google Drive 설정
GOOGLE_DRIVE_FOLDER_ID=1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj

# 📧 이메일 발송 설정
EMAIL_USER=hongik423@gmail.com
EMAIL_APP_PASSWORD=[Gmail_앱_비밀번호]
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=hongik423@gmail.com
SMTP_PASS=[Gmail_앱_비밀번호]

# 🌐 웹사이트 설정
NEXT_PUBLIC_BASE_URL=https://aicamp.club
NODE_ENV=development
ADMIN_EMAIL=hongik423@gmail.com
```

### 2단계: Google Apps Script 권한 확인

현재 사용 중인 GAS URL이 올바른지 확인:
- URL: `https://script.google.com/macros/s/AKfycbxlwpifmXQEmFlR0QBV6NbTemzxTxvWwbaXNGmtH4Ok-a0PDEqmtaKBjQ1VvZxpLnPz/exec`
- 상태: 응답은 받지만 `hasData: false` 반환

### 3단계: Gmail 앱 비밀번호 설정

1. Gmail 계정 설정 → 보안 → 2단계 인증 활성화
2. 앱 비밀번호 생성 → "AICAMP 시스템" 이름으로 생성
3. 생성된 16자리 비밀번호를 `EMAIL_APP_PASSWORD`에 입력

### 4단계: Google Drive 권한 확인

공유 폴더 접근 권한 확인:
- 폴더 ID: `1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj`
- 현재 상태: 빈 폴더 (파일 업로드 실패)

## 🔍 문제 원인 분석

### 진단 결과 저장 실패
```
⚠️ 빈 응답 또는 실패 응답: {
  success: undefined,
  hasData: false,
  diagnosisId: 'DIAG_1755332087748_cngr377x7'
}
```

**원인**: Google Apps Script에서 데이터 저장 후 조회 시 데이터가 없음
**해결**: GAS 스크립트의 데이터 저장 로직 점검 필요

### 이메일 발송 실패
**원인**: 환경변수 누락으로 SMTP 설정 불완전
**해결**: Gmail 앱 비밀번호 설정 및 환경변수 추가

### Google Drive 업로드 실패
**원인**: Drive API 권한 또는 폴더 접근 권한 문제
**해결**: GAS 스크립트의 Drive 권한 재설정

## 🚀 즉시 실행 명령어

```bash
# 1. 환경변수 파일 생성
touch .env.local

# 2. 개발 서버 재시작
npm run dev

# 3. API 테스트
npm run test:api

# 4. 시스템 상태 확인
curl http://localhost:3000/api/health/check
```

## 📞 긴급 연락처

문제가 지속될 경우:
- 관리자: hongik423@gmail.com
- 시스템 버전: V15.0-ULTIMATE-INTEGRATED-APPLE-STYLE
- 브랜딩: 이교장의AI역량진단보고서
