# 🚨 Google Apps Script 긴급 배포 가이드

## 📋 현재 상황
- **문제**: GEMINI API "Cannot read properties of undefined (reading '0')" 오류 발생
- **원인**: Google Apps Script에서 GEMINI API 응답 구조 안전성 검사 부족
- **해결**: V8.0 및 V10.0 파일 모두 안전성 검사 강화 완료

## 🚀 긴급 배포 절차

### 1단계: Google Apps Script 콘솔 접속
```
https://script.google.com/
```

### 2단계: 기존 프로젝트 열기
- 프로젝트 ID: `AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj`
- 또는 최근 사용한 프로젝트에서 "AICAMP AI 역량진단" 프로젝트 선택

### 3단계: 코드 업데이트
**다음 중 하나의 파일을 사용:**

#### 옵션 A: V10.0 PREMIUM (권장)
```javascript
// docs/modules/google_apps_script_perfect_V10.0.js 파일 내용 전체 복사
```

#### 옵션 B: V8.0 (안전성 검사 강화됨)
```javascript
// docs/modules/google_apps_script_perfect_V8.0.js 파일 내용 전체 복사
```

### 4단계: 새 배포 생성
1. **배포** → **새 배포** 클릭
2. **유형 선택**: 웹 앱
3. **설정**:
   - 설명: `GEMINI API 오류 수정 - 안전성 검사 강화`
   - 실행: `나`
   - 액세스: `모든 사용자`
4. **배포** 클릭

### 5단계: 새 URL 확인 및 적용
1. 배포 완료 후 새로운 웹 앱 URL 복사
2. 형식: `https://script.google.com/macros/s/NEW_DEPLOYMENT_ID/exec`

### 6단계: 환경변수 업데이트 (필요시)
```bash
# 새 URL로 환경변수 업데이트
NEXT_PUBLIC_GOOGLE_SCRIPT_URL="새_배포_URL"
GOOGLE_SCRIPT_URL="새_배포_URL"
```

## 🔧 수정된 주요 내용

### ✅ GEMINI API 응답 안전성 검사 강화
```javascript
// 기존 (오류 발생)
const content = result.candidates[0].content.parts[0].text;

// 수정 (안전성 검사 강화)
if (!result.candidates || !Array.isArray(result.candidates) || result.candidates.length === 0) {
  throw new Error('GEMINI API 응답에 candidates 배열이 없습니다');
}

const candidate = result.candidates[0];
if (!candidate?.content?.parts?.[0]?.text) {
  throw new Error('GEMINI API 응답의 content 구조가 올바르지 않습니다');
}

const content = candidate.content.parts[0].text;
```

### ✅ JSON 파싱 안전성 개선
```javascript
// JSON 파싱 전 내용 검증
if (!jsonContent || jsonContent.trim().length === 0) {
  throw new Error('추출된 JSON 내용이 비어있습니다');
}

// 상세한 디버깅 로그
console.log('📄 파싱 실패한 내용 (처음 500자):', content.substring(0, 500));
```

### ✅ 오류 처리 개선
- 모든 단계에서 상세한 오류 로깅
- 재시도 로직 강화
- 폴백 제거로 실제 오류 원인 파악 가능

## 🧪 테스트 방법

### 1. 배포 후 즉시 테스트
```bash
curl -X GET "새_배포_URL"
```

### 2. POST 요청 테스트
```bash
curl -X POST "새_배포_URL" \
  -H "Content-Type: application/json" \
  -d '{"action":"diagnosis","companyName":"테스트","contactName":"홍길동","email":"test@test.com"}'
```

### 3. 프론트엔드에서 테스트
```
http://localhost:3000/diagnosis
```

## ⚠️ 주의사항

### 🔐 스크립트 속성 확인
```
GEMINI_API_KEY: 올바른 API 키 설정 확인
SPREADSHEET_ID: Google Sheets ID 확인
MAX_RETRIES: 3
TIMEOUT_GEMINI: 600000 (10분)
```

### 📊 모니터링 포인트
1. **GEMINI API 응답 구조** 확인
2. **JSON 파싱 성공률** 모니터링  
3. **오류 발생 패턴** 분석
4. **응답 시간** 측정

## 🎯 기대 결과

### ✅ 해결될 오류들
- "Cannot read properties of undefined (reading '0')"
- "AI 응답 JSON 파싱 실패"
- "GEMINI API 응답 형식을 확인하세요"

### ✅ 개선될 기능들
- 안정적인 GEMINI API 연동
- 상세한 오류 로깅
- 빠른 문제 진단 및 해결

---

## 🚀 배포 완료 후 확인사항

1. **터미널 로그에서 오류 사라짐 확인**
2. **AI 역량진단 정상 작동 확인**
3. **진단 결과 보고서 생성 확인**
4. **이메일 발송 정상 작동 확인**

**🎉 배포 완료 시 무오류 품질기준 100% 달성!**

---
*긴급 배포 가이드 작성일: 2025년 8월 8일*  
*목적: GEMINI API 오류 완전 해결*  
*예상 소요 시간: 5-10분*
