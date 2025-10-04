# 🚀 Google Apps Script 배포 가이드 (V17.0 간소화 시스템)

## 📋 개요

이 가이드는 **이교장의AI역량진단시스템 V17.0 간소화** 버전을 Google Apps Script에 배포하는 방법을 설명합니다.

**⚠️ 중요**: V17.0-SIMPLIFIED-FIXED 버전은 AI 분석을 완전히 제거한 오프라인 처리 시스템입니다.

---

## 🎯 배포 목표

### ✅ **배포 후 달성할 기능**

1. **AI 역량진단 워크플로우** (45문항 BARS 시스템)
2. **상담신청 워크플로우**
3. **오류신고 워크플로우**
4. **시스템 헬스체크**
5. **오류 처리 및 복구 메커니즘**

### 🔧 **핵심 개선사항 검증**

- **AI 분석 완전 제거** (이교장 오프라인 처리) ✅
- 45문항 BARS 행동지표 시스템 ✅
- 3개 시트 완전 분리 저장 ✅
- 이메일 워크플로우 자동화 ✅
- 진행상황 실시간 모니터링 ✅
- 오류 처리 및 로깅 시스템 강화 ✅

---

## 🛠️ 배포 단계

### 1단계: Google Apps Script 콘솔 접속

```bash
# 1. 브라우저에서 다음 URL 접속
https://script.google.com/

# 2. Google 계정으로 로그인
# 3. 새 프로젝트 생성 버튼 클릭
```

### 2단계: 프로젝트 설정

```bash
# 1. 프로젝트 이름 변경
# 기본: "Untitled project"
# 변경: "AICAMP_V17_Simplified_System"

# 2. Code.gs 파일 선택 (기본 파일)
# 3. 기존 코드 전체 삭제 (Ctrl+A, Delete)
```

### 3단계: V17.0 코드 업로드

```bash
# 1. docs/250821_aicamp_simplified_v17.js 파일 열기
# 2. 전체 내용 복사 (Ctrl+A, Ctrl+C)
# 3. Google Apps Script Code.gs에 붙여넣기 (Ctrl+V)
# 4. 저장 (Ctrl+S)
```

### 4단계: 환경변수 설정

```bash
# 1. Google Apps Script 편집기에서 "설정" 클릭
# 2. "스크립트 속성" 탭 선택
# 3. 다음 환경변수 추가:

# 필수 환경변수:
SPREADSHEET_ID = 1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ
ADMIN_EMAIL = hongik423@gmail.com
AICAMP_WEBSITE = aicamp.club

# 선택적 환경변수:
DEBUG_MODE = false
ENVIRONMENT = production
SYSTEM_VERSION = V17.0-SIMPLIFIED-FIXED
```

### 5단계: 웹 앱 배포

```bash
# 1. "배포" 버튼 클릭
# 2. "새 배포" 선택
# 3. "유형 선택" → "웹 앱" 선택
# 4. 설정:
#    - 새 설명: "V17.0-SIMPLIFIED-FIXED"
#    - 실행 대상: "나"
#    - 액세스 권한: "모든 사용자"
# 5. "배포" 버튼 클릭
```

### 6단계: 권한 승인

```bash
# 1. "권한 검토" 클릭
# 2. Google 계정 선택
# 3. "고급" → "안전하지 않은 앱으로 이동" 클릭
# 4. "허용" 클릭
```

---

## 🔧 **API 키 오류 해결 방법**

### ❌ **오류 상황**
```
API Key not found. Please pass a valid API key.
service: generativelanguage.googleapis.com
```

### ✅ **해결 방법**

1. **V17.0-SIMPLIFIED-FIXED 버전 확인**
   - AI 분석이 완전히 제거된 버전인지 확인
   - `generateAIAnalysisReport` 함수가 없는지 확인

2. **잘못된 스크립트 배포 확인**
   - 이전 버전의 스크립트가 배포되어 있을 수 있음
   - 새로운 V17.0-SIMPLIFIED-FIXED 버전으로 재배포

3. **클라이언트 요청 확인**
   - 클라이언트에서 올바른 엔드포인트 호출
   - `handleAIDiagnosisRequest` 함수 사용 확인

### 🔍 **디버깅 방법**

```javascript
// Google Apps Script에서 실행하여 버전 확인
function checkVersion() {
  const config = getEnvironmentConfig();
  console.log('시스템 버전:', config.SYSTEM_VERSION);
  console.log('AI 분석 제거 여부:', config.SYSTEM_VERSION.includes('SIMPLIFIED'));
}
```

---

## 🧪 **배포 후 테스트**

### 1. 헬스체크 테스트

```bash
# 배포된 URL로 GET 요청
curl "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```

### 2. 진단 신청 테스트

```bash
# POST 요청으로 진단 신청 테스트
curl -X POST "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "diagnosis",
    "companyName": "테스트회사",
    "contactName": "테스트",
    "contactEmail": "test@example.com",
    "contactPhone": "010-0000-0000",
    "industry": "제조업",
    "employeeCount": "1-10명",
    "annualRevenue": "10억원 미만",
    "location": "서울특별시",
    "privacyConsent": true,
    "assessmentResponses": {"1": 3, "2": 3, "3": 3}
  }'
```

### 3. 예상 결과

```json
{
  "success": true,
  "type": "ai_diagnosis",
  "diagnosisId": "DIAG_45Q_...",
  "message": "AI역량진단 신청이 성공적으로 접수되었습니다. 24시간 내에 이교장이 직접 작성한 보고서를 발송해드리겠습니다.",
  "version": "V17.0-SIMPLIFIED-FIXED",
  "processingMode": "offline_manual_analysis",
  "aiAnalysisRemoved": true
}
```

---

## 🚨 **문제 해결**

### 1. 권한 오류
- Google Sheets API 권한 확인
- 스크립트 속성에서 SPREADSHEET_ID 확인

### 2. 이메일 발송 오류
- Gmail API 권한 확인
- ADMIN_EMAIL 환경변수 확인

### 3. 데이터 저장 오류
- Google Sheets 접근 권한 확인
- 시트 이름 및 구조 확인

### 4. API 키 오류 (V17.0에서는 발생하지 않아야 함)
- V17.0-SIMPLIFIED-FIXED 버전 재배포
- AI 분석 함수 완전 제거 확인

---

## 📞 **지원 및 문의**

- **이메일**: hongik423@gmail.com
- **웹사이트**: aicamp.club
- **시스템 버전**: V17.0-SIMPLIFIED-FIXED
- **처리 방식**: 오프라인 수동 분석

---

**✅ V17.0 간소화 시스템은 AI 분석을 완전히 제거하고 이교장의 오프라인 수동 처리 방식으로 운영됩니다.**
