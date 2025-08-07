# 🚀 AI 역량진단 시스템 완전 배포 가이드

## 📋 시스템 개요

### ✅ 구축 완료된 시스템
- **Google Apps Script V10.0 PREMIUM**: GEMINI 2.5 FLASH 기반 고품질 분석
- **프론트엔드**: Next.js 14 + TypeScript + Tailwind CSS
- **백엔드**: Vercel Serverless Functions
- **데이터베이스**: Google Sheets (4개 시트 자동 저장)
- **이메일**: Gmail API 자동 발송

### 🎯 주요 기능
1. **24개 항목 AI 역량진단** (6개 카테고리 × 4문항)
2. **GEMINI AI 심층 분석** (실제 신청서 데이터 기반)
3. **N8N 자동화 중심 SWOT 전략 매트릭스**
4. **3단계 실행 로드맵** (업종별 특화)
5. **6자리 패스워드 보안 시스템**
6. **통합 보고서** (이메일/웹/다운로드 동일)

## 🔧 배포 준비사항

### 1. Google Apps Script 설정

#### 📝 스크립트 배포
```javascript
// 1. Google Apps Script 콘솔 접속
// https://script.google.com/

// 2. 새 프로젝트 생성 후 전체 코드 복사
// docs/modules/google_apps_script_perfect_V10.0.js

// 3. 웹 앱으로 배포
// - 실행: 모든 사용자
// - 액세스: 누구나
```

#### 🔑 환경변수 설정 (스크립트 속성)
```javascript
// Google Apps Script > 설정 > 스크립트 속성
SPREADSHEET_ID: "1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0"
GEMINI_API_KEY: "AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM"
ADMIN_EMAIL: "hongik423@gmail.com"
AI_MODEL: "gemini-2.5-flash"
MAX_OUTPUT_TOKENS: "8192"
TEMPERATURE: "0.3"
DEBUG_MODE: "false"
ENVIRONMENT: "production"
```

### 2. Vercel 배포 설정

#### 📦 환경변수 (.env.local)
```bash
# Google Apps Script 연동
NEXT_PUBLIC_GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
NEXT_PUBLIC_GOOGLE_SHEETS_ID="1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0"

# AI 분석 (서버 전용)
GEMINI_API_KEY="AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM"

# 기본 설정
NEXT_PUBLIC_BASE_URL="https://your-domain.vercel.app"
NODE_ENV="production"
```

#### ⚙️ Vercel 설정 (vercel.json)
```json
{
  "functions": {
    "src/app/api/**/*": {
      "maxDuration": 800
    }
  }
}
```

### 3. Google Sheets 설정

#### 📊 스프레드시트 구조
- **시트1: AI역량진단** - 메인 결과 요약
- **시트2: 상세분석** - SWOT, 전략, AI 인사이트
- **시트3: 실행로드맵** - 3단계 실행 계획
- **시트4: 보고서JSON** - 전체 보고서 백업

## 🚀 배포 단계

### Step 1: Google Apps Script 배포
```bash
# 1. Google Apps Script 콘솔에서 새 프로젝트 생성
# 2. docs/modules/google_apps_script_perfect_V10.0.js 전체 복사
# 3. 스크립트 속성에 환경변수 설정
# 4. 웹 앱으로 배포 (모든 사용자 액세스)
# 5. 배포 URL 복사 보관
```

### Step 2: Vercel 배포
```bash
# 프로젝트 루트에서 실행
npm install
npm run build

# Vercel CLI 배포
npx vercel --prod

# 환경변수 설정
npx vercel env add NEXT_PUBLIC_GOOGLE_SCRIPT_URL
npx vercel env add GEMINI_API_KEY
# ... 기타 환경변수 추가
```

### Step 3: 시스템 검증
```bash
# 헬스체크 API 호출
curl -X GET https://your-domain.vercel.app/api/system-health

# 응답 예시
{
  "status": "healthy",
  "components": [
    {"component": "Google Apps Script", "status": "healthy"},
    {"component": "Environment Variables", "status": "healthy"},
    {"component": "System Resources", "status": "healthy"},
    {"component": "API Endpoints", "status": "healthy"}
  ]
}
```

## 🔍 시스템 모니터링

### 1. 헬스체크 엔드포인트
- `GET /api/system-health` - 전체 시스템 상태
- `GET /api/ai-capability-diagnosis/status` - 진단 시스템 상태
- `GET /api/google-script-proxy` - Google Script 연결 상태

### 2. 로그 모니터링
```bash
# Vercel 로그 확인
npx vercel logs

# Google Apps Script 로그
# Google Apps Script 콘솔 > 실행 > 로그 확인
```

### 3. 성능 지표
- **응답 시간**: < 13분 (Vercel 800초 제한)
- **성공률**: > 95%
- **메모리 사용량**: < 500MB
- **동시 처리**: 최대 10개 요청

## 🛠️ 문제 해결

### 일반적인 오류

#### 1. Google Apps Script 연결 실패
```bash
# 원인: URL 설정 오류 또는 권한 문제
# 해결: 
# 1. NEXT_PUBLIC_GOOGLE_SCRIPT_URL 확인
# 2. 웹 앱 배포 권한 "누구나" 설정
# 3. 새 버전으로 재배포
```

#### 2. GEMINI API 오류
```bash
# 원인: API 키 오류 또는 할당량 초과
# 해결:
# 1. GEMINI_API_KEY 유효성 확인
# 2. Google Cloud Console에서 할당량 확인
# 3. API 활성화 상태 확인
```

#### 3. 타임아웃 오류
```bash
# 원인: 처리 시간 초과 (800초)
# 해결:
# 1. Google Apps Script 최적화
# 2. GEMINI 프롬프트 단순화
# 3. 재시도 로직 활용
```

### 디버깅 도구

#### 1. 개발자 도구 활용
```javascript
// 브라우저 콘솔에서 확인
console.log('진단 데이터:', diagnosisData);
console.log('API 응답:', response);
```

#### 2. 서버 로그 확인
```bash
# Vercel 함수 로그
npx vercel logs --follow

# Google Apps Script 로그
# 콘솔 > 실행 > 로그 탭
```

## 📈 성능 최적화

### 1. Google Apps Script 최적화
- **캐싱**: 환경변수 캐싱으로 속도 향상
- **배치 처리**: 여러 작업을 한 번에 처리
- **오류 처리**: 재시도 로직으로 안정성 확보

### 2. 프론트엔드 최적화
- **지연 로딩**: 컴포넌트 lazy loading
- **메모이제이션**: React.memo, useMemo 활용
- **번들 최적화**: 불필요한 라이브러리 제거

### 3. API 최적화
- **타임아웃 설정**: 적절한 타임아웃 시간 설정
- **재시도 로직**: 지수 백오프 적용
- **에러 핸들링**: 사용자 친화적 오류 메시지

## 🔐 보안 고려사항

### 1. API 키 보안
- 서버 사이드 환경변수만 사용
- 클라이언트에 민감 정보 노출 금지
- 정기적인 API 키 로테이션

### 2. 데이터 보안
- HTTPS 통신 강제
- 입력 데이터 검증
- SQL 인젝션 방지

### 3. 접근 제어
- CORS 정책 적용
- Rate limiting 구현
- 악성 요청 필터링

## 📞 지원 및 유지보수

### 연락처
- **개발팀**: hongik423@gmail.com
- **시스템 관리**: AICAMP 기술팀
- **긴급 상황**: 24/7 모니터링 시스템

### 정기 점검 항목
1. **주간 점검**
   - 시스템 헬스체크 실행
   - 로그 분석 및 오류 점검
   - 성능 지표 모니터링

2. **월간 점검**
   - Google Apps Script 성능 최적화
   - 데이터베이스 정리
   - 보안 업데이트 적용

3. **분기별 점검**
   - 전체 시스템 성능 평가
   - 사용자 피드백 반영
   - 새로운 기능 업데이트

---

## 🎉 배포 완료 체크리스트

- [ ] Google Apps Script V10.0 배포 완료
- [ ] Vercel 프로덕션 배포 완료
- [ ] 환경변수 모든 설정 완료
- [ ] Google Sheets 연동 확인
- [ ] GEMINI API 연동 확인
- [ ] 이메일 발송 기능 확인
- [ ] 시스템 헬스체크 통과
- [ ] 실제 진단 테스트 완료
- [ ] 모니터링 시스템 구축
- [ ] 문서화 완료

**축하합니다! 🎊 AI 역량진단 시스템이 성공적으로 배포되었습니다.**
