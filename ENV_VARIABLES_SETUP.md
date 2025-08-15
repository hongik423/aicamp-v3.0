# 🎓 이교장의AI역량진단보고서 시스템 V14.0 ULTIMATE 환경변수 설정 가이드

## 📋 필수 환경변수 설정

### 1. 로컬 개발 환경 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 입력하세요:

```env
# 이교장의AI역량진단보고서 시스템 V14.0 ULTIMATE 환경변수
# ================================================================================

# GEMINI AI API 설정 (필수)
GEMINI_API_KEY=AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM

# Google Apps Script 설정 (필수)
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbyVGnIRPm8vg6NKoABjJo6x3aUUTALKPcMuUTf0LfOgNlW-tOZ-Yt3BKz3vGGn_Ks0h/exec

# Google Sheets 데이터베이스 (필수)
SPREADSHEET_ID=1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ

# Google Drive 저장소 (필수)
DRIVE_FOLDER_ID=1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj

# 관리자 설정 (필수)
ADMIN_EMAIL=hongik423@gmail.com

# 도메인 설정
AICAMP_WEBSITE=aicamp.club
NEXT_PUBLIC_SITE_URL=https://aicamp.club

# 시스템 설정
DEBUG_MODE=false
ENVIRONMENT=production
VERSION=V14.0-ULTIMATE

# 타임아웃 설정 (Vercel 800초 제한 고려)
TIMEOUT_GEMINI=600000
TIMEOUT_EMAIL=60000
TIMEOUT_SHEET=30000
TIMEOUT_TOTAL=720000

# 재시도 설정
MAX_RETRY_ATTEMPTS=3
RETRY_DELAY_MS=2000

# Next.js 설정
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### 2. Vercel 배포 환경 설정

Vercel 대시보드에서 다음 환경변수를 설정하세요:

#### 🔑 필수 환경변수
```
GEMINI_API_KEY=AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbyVGnIRPm8vg6NKoABjJo6x3aUUTALKPcMuUTf0LfOgNlW-tOZ-Yt3BKz3vGGn_Ks0h/exec
SPREADSHEET_ID=1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ
DRIVE_FOLDER_ID=1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj
ADMIN_EMAIL=hongik423@gmail.com
```

#### 🌐 도메인 설정
```
AICAMP_WEBSITE=aicamp.club
NEXT_PUBLIC_SITE_URL=https://aicamp.club
```

#### ⚙️ 시스템 설정
```
DEBUG_MODE=false
ENVIRONMENT=production
VERSION=V14.0-ULTIMATE
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### 3. Google Apps Script 환경변수 설정

GAS 에디터에서 **설정 → 스크립트 속성**에 다음 환경변수를 설정하세요:

```
SPREADSHEET_ID: 1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ
GEMINI_API_KEY: AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM
ADMIN_EMAIL: hongik423@gmail.com
AICAMP_WEBSITE: aicamp.club
DRIVE_FOLDER_ID: 1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj
DEBUG_MODE: false
ENVIRONMENT: production
```

## 🚀 환경변수 설정 방법

### 로컬 환경
1. 프로젝트 루트에 `.env.local` 파일 생성
2. 위의 환경변수 내용 복사
3. 개발 서버 재시작: `npm run dev`

### Vercel 환경
1. Vercel 대시보드 → 프로젝트 선택
2. Settings → Environment Variables
3. 위의 환경변수들을 하나씩 추가
4. 재배포 트리거

### Google Apps Script 환경
1. GAS 에디터 열기
2. 설정(⚙️) → 스크립트 속성
3. 위의 환경변수들을 하나씩 추가
4. 저장 및 배포

## ✅ 환경변수 검증

### API 테스트
```bash
# GEMINI API 테스트
curl -X POST "https://aicamp.club/api/test-gemini" \
  -H "Content-Type: application/json" \
  -d '{"test": true}'

# 시스템 상태 확인
curl "https://aicamp.club/api/health"
```

### 로그 확인
```bash
# 개발 환경에서 로그 확인
npm run dev

# 환경변수 로드 확인
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✅ 설정됨' : '❌ 누락');
```

## 🔒 보안 주의사항

1. **API 키 보호**: GEMINI_API_KEY는 절대 공개하지 마세요
2. **환경변수 파일**: `.env.local`은 Git에 커밋하지 마세요
3. **권한 관리**: Google Sheets/Drive 권한을 적절히 설정하세요
4. **정기 갱신**: API 키를 정기적으로 갱신하세요

## 🆘 문제 해결

### 환경변수 로드 실패
```bash
# 환경변수 확인
echo $GEMINI_API_KEY

# Next.js 캐시 클리어
rm -rf .next
npm run build
```

### API 호출 실패
1. API 키 유효성 확인
2. 네트워크 연결 상태 점검
3. 할당량 사용량 확인
4. 로그에서 상세 오류 확인

이 설정을 완료하면 **이교장의AI역량진단보고서 시스템 V14.0 ULTIMATE**가 완벽하게 작동합니다! 🌟
