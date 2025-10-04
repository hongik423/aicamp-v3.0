# 🚀 Vercel 환경변수 V22.0 설정 가이드

## 📋 V22.0 강화된 안정 버전 환경변수 설정

### 1. Vercel 대시보드 접속
- https://vercel.com/dashboard
- aicamp_v3.0 프로젝트 선택
- Settings → Environment Variables

### 2. V22.0 필수 환경변수 설정

```bash
# Google Apps Script V22.0 연동 (aicamp_enhanced_stable_v22.js)
# ⚠️ 중요: V22 스크립트 배포 후 새로운 URL로 업데이트 필요
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/[V22_DEPLOYMENT_ID]/exec
NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/[V22_DEPLOYMENT_ID]/exec

# Google Sheets 연동 (V22 5개 시트 시스템)
NEXT_PUBLIC_GOOGLE_SHEETS_ID=1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ

# V22 스크립트 속성 (Google Apps Script 내부에서 설정)
# 다음 값들은 Google Apps Script의 "스크립트 속성"에서 설정해야 함:
# ADMIN_EMAIL=hongik423@gmail.com
# SYSTEM_NAME=AICAMP 통합 시스템
# VERSION=V22.0
# SPREADSHEET_ID=1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ
# MAIN_SHEET_NAME=AI역량진단_메인데이터
# DETAIL_SHEET_NAME=AI역량진단_45문항상세
# CATEGORY_SHEET_NAME=AI역량진단_카테고리분석
# TAX_ERROR_SHEET_NAME=세금계산기_오류신고
# CONSULTATION_SHEET_NAME=상담신청_데이터
# ENABLE_EMAIL=true

# 도메인 설정
NEXT_PUBLIC_BASE_URL=https://aicamp.club

# 시스템 설정
NODE_ENV=production
```

### 3. Google Apps Script V22 배포 단계

#### 3.1 Google Apps Script 프로젝트 생성/업데이트
1. [Google Apps Script](https://script.google.com/) 접속
2. 기존 프로젝트 열기 또는 새 프로젝트 생성
3. 프로젝트명: "AICAMP_V22_Enhanced_Stable"

#### 3.2 V22 코드 배포
1. 기본 `Code.gs` 파일에 `aicamp_enhanced_stable_v22.js` 내용 전체 복사
2. 파일 저장 (Ctrl+S)

#### 3.3 스크립트 속성 설정
좌측 메뉴 "설정" → "스크립트 속성"에서 다음 값들 추가:

```
ADMIN_EMAIL: hongik423@gmail.com
SYSTEM_NAME: AICAMP 통합 시스템
VERSION: V22.0
SPREADSHEET_ID: 1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ
MAIN_SHEET_NAME: AI역량진단_메인데이터
DETAIL_SHEET_NAME: AI역량진단_45문항상세
CATEGORY_SHEET_NAME: AI역량진단_카테고리분석
TAX_ERROR_SHEET_NAME: 세금계산기_오류신고
CONSULTATION_SHEET_NAME: 상담신청_데이터
ENABLE_EMAIL: true
```

#### 3.4 웹 앱으로 배포
1. 우측 상단 "배포" → "새 배포" 클릭
2. 유형: "웹 앱" 선택
3. 설정:
   - 설명: "AICAMP V22.0 강화된 안정 버전"
   - 실행 대상: "나"
   - 액세스 권한: "모든 사용자"
4. "배포" 클릭
5. **웹 앱 URL 복사** (예: https://script.google.com/macros/s/AKfycby...../exec)

#### 3.5 Vercel 환경변수 업데이트
위에서 복사한 웹 앱 URL로 다음 환경변수들을 업데이트:
- `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
- `NEXT_PUBLIC_GAS_URL`

### 4. V22 시스템 검증 방법

#### 4.1 Google Apps Script 테스트
```javascript
// Google Apps Script 콘솔에서 실행
function testV22System() {
  const testData = {
    type: 'diagnosis',
    companyName: '테스트회사',
    contactName: '테스트담당자',
    contactEmail: 'test@example.com',
    responses: {1: 4, 2: 3, 3: 5, 4: 2, 5: 4}
  };
  
  const result = processDiagnosis(testData);
  console.log('V22 테스트 결과:', result);
}
```

#### 4.2 프론트엔드 연동 테스트
배포 완료 후 다음 URL로 확인:
- 메인 사이트: https://aicamp.club
- AI 진단: https://aicamp.club/ai-diagnosis
- GAS 연결 상태: https://aicamp.club/api/google-script-proxy (GET 요청)

### 5. V22 특징 및 개선사항

#### ✅ 강화된 기능들
- 🛡️ 무오류 품질 보장 시스템
- 📊 5개 시트 저장 시스템
- 📧 강화된 이메일 템플릿
- 📝 45문항 질문 텍스트 및 행동지표 자동 저장
- ⚡ 빠른 처리 속도
- 🔍 강화된 데이터 검증

#### 📊 5개 시트 구조
1. **AI역량진단_메인데이터**: 기본정보 + 점수
2. **AI역량진단_45문항상세**: 문항별 응답 + 질문텍스트 + 행동지표
3. **AI역량진단_카테고리분석**: 카테고리별 점수
4. **세금계산기_오류신고**: 오류신고 데이터
5. **상담신청_데이터**: 상담신청 정보

### 6. 문제 해결

#### 6.1 일반적인 오류
- **403 Forbidden**: 스크립트 권한 설정 확인
- **500 Internal Error**: 스크립트 속성 설정 확인
- **타임아웃**: 스크립트 실행 시간 최적화 필요

#### 6.2 디버깅 방법
Google Apps Script 콘솔에서 로그 확인:
```javascript
console.log('🚀 V22.0 AICAMP 통합 시스템 - 강화된 안정 버전 로드 시작');
```

## 🎯 중요사항

- ⚠️ **V22 스크립트 배포 후 반드시 새로운 URL로 환경변수 업데이트**
- 📊 **5개 시트가 자동으로 생성되는지 확인**
- 📧 **이메일 발송 기능 테스트 필수**
- 🛡️ **모든 함수에 try-catch 적용으로 무오류 보장**

배포 완료 후 실제 신청서 제출 테스트를 통해 V22 시스템이 정상 작동하는지 확인하세요.
