# 📋 Google Apps Script V10.0 테스트 가이드

## 🚀 V10.0 주요 특징
- **GEMINI 2.5 FLASH** 모델 적용
- **Vercel 800초** 타임아웃 최적화
- **재시도 로직** 및 지수 백오프
- **향상된 에러 핸들링**

## 📌 Step 1: Google Apps Script 배포

### 1.1 새 프로젝트 생성
1. [Google Apps Script](https://script.google.com) 접속
2. "새 프로젝트" 클릭
3. 프로젝트명: "AICAMP_V10_PREMIUM"

### 1.2 코드 복사
```javascript
// docs/modules/google_apps_script_perfect_V10.0.js 파일의 전체 내용을 복사
// Apps Script 에디터에 붙여넣기
```

### 1.3 환경변수 확인
코드에 이미 포함된 기본값:
```javascript
SPREADSHEET_ID: '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0'
GEMINI_API_KEY: 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM'
ADMIN_EMAIL: 'hongik423@gmail.com'
```

### 1.4 웹 앱 배포
1. **배포** → **새 배포**
2. 설정:
   - 유형: **웹 앱**
   - 실행: **나**
   - 액세스 권한: **모든 사용자**
3. **배포** 클릭
4. 권한 승인 (Gmail, Sheets, URL Fetch)
5. **웹 앱 URL 복사** (중요!)

## 📌 Step 2: 테스트 실행

### 2.1 브라우저 테스트
1. `public/test-gas-v10.html` 파일 열기
2. GAS 웹 앱 URL 입력
3. 테스트 실행

### 2.2 Apps Script 에디터 테스트

#### 환경변수 테스트
```javascript
function runTest1() {
  const result = testEnvironmentVariables();
  console.log(result);
}
```

#### 시스템 상태 테스트
```javascript
function runTest2() {
  const result = checkSystemStatus();
  console.log(result);
}
```

#### 진단 시뮬레이션 테스트
```javascript
function runTest3() {
  const testData = {
    action: 'diagnosis',
    companyName: 'V10 테스트',
    industry: 'IT',
    employeeCount: 50,
    contactName: '테스터',
    email: 'test@test.com',
    assessmentResponses: {
      strategy1: 4, strategy2: 3, strategy3: 4, strategy4: 3,
      culture1: 3, culture2: 4, culture3: 3, culture4: 4,
      process1: 4, process2: 3, process3: 4, process4: 3,
      data1: 3, data2: 4, data3: 3, data4: 4,
      technology1: 4, technology2: 3, technology3: 4, technology4: 3,
      talent1: 3, talent2: 4, talent3: 3, talent4: 4
    }
  };
  
  const result = handleEnhancedAIDiagnosisSubmission(testData);
  console.log(result);
}
```

## 📌 Step 3: CURL 테스트

### 3.1 시스템 상태 확인
```bash
curl -X POST "YOUR_GAS_URL" \
  -H "Content-Type: application/json" \
  -d '{"action":"status"}'
```

### 3.2 AI 역량진단 테스트
```bash
curl -X POST "YOUR_GAS_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "diagnosis",
    "companyName": "테스트 기업",
    "industry": "IT",
    "employeeCount": 50,
    "contactName": "홍길동",
    "email": "test@example.com",
    "assessmentResponses": {
      "strategy1": 4, "strategy2": 3, "strategy3": 4, "strategy4": 3,
      "culture1": 3, "culture2": 4, "culture3": 3, "culture4": 4,
      "process1": 4, "process2": 3, "process3": 4, "process4": 3,
      "data1": 3, "data2": 4, "data3": 3, "data4": 4,
      "technology1": 4, "technology2": 3, "technology3": 4, "technology4": 3,
      "talent1": 3, "talent2": 4, "talent3": 3, "talent4": 4
    }
  }'
```

## 📌 Step 4: 검증 체크리스트

### ✅ 기본 기능
- [ ] 환경변수 로드 확인
- [ ] Google Sheets 연결 확인
- [ ] Gmail 권한 확인

### ✅ GEMINI API
- [ ] API 키 유효성
- [ ] 모델 버전 (gemini-2.5-flash)
- [ ] 응답 파싱
- [ ] 재시도 로직 작동

### ✅ 타임아웃 설정
- [ ] GEMINI: 360초 (6분)
- [ ] 이메일: 180초 (3분)
- [ ] 저장: 60초 (1분)

### ✅ 데이터 처리
- [ ] 진단 ID 생성
- [ ] 패스워드 생성 (6자리)
- [ ] 점수 계산
- [ ] SWOT 분석
- [ ] AI 보고서 생성

### ✅ 이메일 발송
- [ ] 신청자 이메일
- [ ] 관리자 이메일
- [ ] HTML 템플릿 렌더링

### ✅ 데이터 저장
- [ ] Google Sheets 저장
- [ ] 타임스탬프
- [ ] 진단 결과 기록

## 🔍 트러블슈팅

### 문제 1: CORS 오류
**해결**: 웹 앱 배포시 "모든 사용자" 액세스 설정

### 문제 2: 권한 오류
**해결**: Gmail, Sheets, URL Fetch 권한 승인

### 문제 3: API 키 오류
**해결**: GEMINI API 키 확인 및 재발급

### 문제 4: 타임아웃
**해결**: 
- 처리 시간 모니터링
- 필요시 타임아웃 값 조정
- 재시도 로직 확인

### 문제 5: JSON 파싱 오류
**해결**: 
- GEMINI 응답 형식 확인
- Markdown 코드 블록 제거 로직 확인

## 📊 예상 결과

### 성공 응답
```json
{
  "success": true,
  "diagnosisId": "DIAG-20241217-XXXX",
  "reportPassword": "123456",
  "processingTime": 15000,
  "message": "AI 역량진단이 성공적으로 완료되었습니다.",
  "report": {
    "ceoMessage": "...",
    "keyFindings": [...],
    "strategicMatrix": {...},
    // ... 기타 분석 결과
  }
}
```

### 실패 응답
```json
{
  "success": false,
  "error": "오류 메시지",
  "message": "처리 중 오류가 발생했습니다.",
  "diagnosisId": "ERROR",
  "adminNotified": true
}
```

## 🎯 성능 목표

| 항목 | 목표 | 최대 |
|------|------|------|
| 전체 처리 | 30초 | 750초 |
| GEMINI API | 10초 | 360초 |
| 이메일 발송 | 5초 | 180초 |
| 시트 저장 | 3초 | 60초 |

## 📱 프론트엔드 연동

### Next.js 환경변수 설정
`.env.local`:
```
NEXT_PUBLIC_GAS_URL=YOUR_GAS_URL
```

### API 호출 예시
```javascript
const response = await fetch(process.env.NEXT_PUBLIC_GAS_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(diagnosisData)
});

const result = await response.json();
```

## 🔐 보안 고려사항

1. **API 키 보호**: 프로덕션에서는 환경변수 사용
2. **접근 제어**: 필요시 특정 도메인만 허용
3. **데이터 검증**: 입력 데이터 유효성 검사
4. **로깅**: 모든 요청/응답 기록

## 📞 지원

문제 발생시:
- 관리자 이메일: hongik423@gmail.com
- 시스템 로그 확인: Apps Script 에디터 → 실행 → 로그

---
*Last Updated: 2024-12-17*
*Version: V10.0 PREMIUM*
