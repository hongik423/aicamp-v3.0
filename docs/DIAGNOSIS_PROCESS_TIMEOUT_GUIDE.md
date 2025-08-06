# 🚀 AICAMP 진단 프로세스 타임아웃 최적화 가이드

## 📊 **진단 프로세스 개요**

AICAMP AI 역량진단은 다음 5단계로 구성되며, 각 단계별 예상 시간과 최적화 방안을 제시합니다.

### 🔄 **단계별 프로세스**

| 단계 | 프로세스 | 예상 시간 | 타임아웃 설정 | 주요 작업 |
|------|----------|-----------|---------------|-----------|
| 1️⃣ | **GEMINI 2.5 Flash AI 분석** | 2-3분 | 800초 | AI 역량 6분야 종합 평가 및 업종별 벤치마크 비교 |
| 2️⃣ | **SWOT 전략 분석** | 1-2분 | 180초 | 강점/약점/기회/위협 요인 분석 및 전략 도출 |
| 3️⃣ | **맞춤형 보고서 생성** | 2-3분 | 300초 | 실행 로드맵 및 개선방안 포함 종합 보고서 작성 |
| 4️⃣ | **완성된 보고서 이메일 전송** | 30-60초 | 180초 | PDF 형태의 최종 진단보고서 이메일 발송 |
| **전체** | **총 진단 프로세스** | **6-9분** | **800초** | **전체 프로세스 완료** |

---

## ⚙️ **타임아웃 설정 현황**

### 🔧 **시스템별 타임아웃 설정**

#### **1. Vercel 배포 환경**
```json
// vercel.json
{
  "functions": {
    "src/app/api/**/*": {
      "maxDuration": 800  // 13분 20초 (Vercel Pro 최대 제한)
    }
  }
}
```

#### **2. Google Apps Script**
```javascript
// V5.1 타임아웃 설정
const ENV = {
  TIMEOUT_GEMINI: 800000,        // 13분 20초 (800초)
  TIMEOUT_EMAIL: 180000,         // 3분
  TIMEOUT_RETRY_DELAY: 600000,   // 10분
  TIMEOUT_TOTAL_PROCESS: 780000  // 13분 (여유 20초)
};
```

#### **3. 프론트엔드 API**
```typescript
// src/app/api/google-script-proxy/route.ts
const timeoutId = setTimeout(() => controller.abort(), 800000); // 800초
```

---

## 🚨 **발견된 문제점 및 해결책**

### ❌ **문제점 1: Google Apps Script V5.0 타임아웃 설정 누락**

**문제:**
- `TIMEOUT_GEMINI`, `TIMEOUT_EMAIL` 등 타임아웃 환경변수 미정의
- `callGeminiAPI` 함수에서 타임아웃 미적용
- 무제한 대기로 인한 실행 시간 초과 가능성

**해결책:**
- ✅ **Google Apps Script V5.1 업데이트** 파일 생성
- ✅ 타임아웃 모니터링 클래스 추가
- ✅ 단계별 타임아웃 적용

### ❌ **문제점 2: GEMINI API 호출 시 타임아웃 미적용**

**문제:**
```javascript
// 기존 V5.0 코드 (타임아웃 없음)
const response = UrlFetchApp.fetch(apiUrl, {
  method: 'post',
  contentType: 'application/json',
  payload: JSON.stringify(requestData),
  muteHttpExceptions: true
  // timeout 설정 없음
});
```

**해결책:**
```javascript
// V5.1 개선 코드 (타임아웃 적용)
const response = UrlFetchApp.fetch(apiUrl, {
  method: 'post',
  contentType: 'application/json',
  payload: JSON.stringify(requestData),
  muteHttpExceptions: true,
  timeout: Math.min(timeoutMs, 300000) // Google Apps Script 최대 5분 제한
});
```

### ❌ **문제점 3: 단계별 진행 상황 불투명**

**문제:**
- 사용자가 현재 어떤 단계가 진행되고 있는지 알 수 없음
- 타임아웃 발생 시 원인 파악 어려움

**해결책:**
- ✅ **DiagnosisProgressModal** 컴포넌트 추가
- ✅ 단계별 상세 진행 상황 표시
- ✅ 예상 시간 및 남은 시간 표시

---

## 🔧 **V5.1 주요 개선사항**

### 1. **타임아웃 모니터링 클래스**

```javascript
class TimeoutMonitor {
  constructor(totalTimeoutMs = ENV.TIMEOUT_TOTAL_PROCESS) {
    this.startTime = new Date().getTime();
    this.totalTimeout = totalTimeoutMs;
    this.stepTimeouts = new Map();
  }
  
  startStep(stepName, timeoutMs) {
    // 단계별 타임아웃 모니터링
  }
  
  checkStep(stepName) {
    // 타임아웃 체크
  }
  
  getRemainingTime() {
    // 남은 시간 계산
  }
}
```

### 2. **향상된 GEMINI API 호출**

```javascript
function callGeminiAPI(prompt, retryCount = 0, timeoutMs = ENV.TIMEOUT_GEMINI) {
  // 타임아웃이 적용된 API 호출
  // 지수 백오프 재시도 로직
  // 남은 시간 기반 타임아웃 조정
}
```

### 3. **백그라운드 이메일 발송**

```javascript
function scheduleBackgroundEmailSend(orchestrationResult, reportData, savedId) {
  // 타임아웃 시 백그라운드에서 이메일 발송
  // 트리거 기반 지연 실행
}
```

---

## 📊 **성능 최적화 전략**

### 🎯 **1단계: GEMINI 2.5 Flash AI 분석 (2-3분)**

**최적화 방법:**
- **프롬프트 최적화**: 구체적이고 간결한 프롬프트 작성
- **토큰 제한**: maxOutputTokens를 65536으로 설정
- **재시도 로직**: 지수 백오프로 효율적인 재시도
- **병렬 처리**: 가능한 경우 독립적인 분석 병렬 실행

**예상 문제 및 해결:**
- **API 응답 지연**: 재시도 로직으로 해결
- **토큰 제한 초과**: 프롬프트 분할 처리
- **네트워크 오류**: 자동 재시도 및 폴백

### 🎯 **2단계: SWOT 전략 분석 (1-2분)**

**최적화 방법:**
- **템플릿 기반 분석**: 미리 정의된 SWOT 템플릿 활용
- **업종별 최적화**: 업종별 특화된 분석 로직
- **캐싱 전략**: 유사한 업종/규모 기업 결과 캐싱

### 🎯 **3단계: 맞춤형 보고서 생성 (2-3분)**

**최적화 방법:**
- **템플릿 엔진**: 사전 정의된 보고서 템플릿
- **동적 콘텐츠**: 분석 결과 기반 동적 섹션 생성
- **PDF 최적화**: 효율적인 PDF 생성 라이브러리

### 🎯 **4단계: 이메일 전송 (30-60초)**

**최적화 방법:**
- **첨부파일 최적화**: PDF 크기 최적화
- **이메일 템플릿**: HTML 이메일 템플릿 최적화
- **배치 처리**: 필요시 배치로 이메일 발송

---

## 🚀 **배포 및 적용 가이드**

### **1. Google Apps Script 업데이트**

```bash
# V5.1 스크립트 배포
1. docs/google_apps_script_COMPLETE_V5.1_TIMEOUT_FIXED.js 복사
2. Google Apps Script 편집기에 붙여넣기
3. 환경변수 설정 확인:
   - TIMEOUT_GEMINI: 800000
   - TIMEOUT_EMAIL: 180000  
   - TIMEOUT_TOTAL_PROCESS: 780000
4. 배포 및 테스트
```

### **2. 프론트엔드 업데이트**

```bash
# 진행 상황 모달 컴포넌트 추가
1. src/components/diagnosis/DiagnosisProgressModal.tsx 확인
2. SimplifiedDiagnosisForm에 통합
3. 사용자 경험 테스트
```

### **3. 환경변수 설정**

```javascript
// Google Apps Script Properties 설정
function updateTimeoutSettings() {
  const scriptProperties = PropertiesService.getScriptProperties();
  
  scriptProperties.setProperties({
    TIMEOUT_GEMINI: '800000',        // 13분 20초
    TIMEOUT_EMAIL: '180000',         // 3분  
    TIMEOUT_RETRY_DELAY: '600000',   // 10분
    TIMEOUT_TOTAL_PROCESS: '780000'  // 13분
  });
}
```

---

## 🧪 **테스트 및 모니터링**

### **타임아웃 테스트 함수**

```javascript
// Google Apps Script에서 실행
function testTimeoutSettings() {
  console.log('🧪 타임아웃 설정 테스트 시작');
  // 타임아웃 모니터 테스트
}

function testGeminiTimeout() {
  console.log('🤖 GEMINI API 타임아웃 테스트');
  // GEMINI API 호출 테스트
}
```

### **모니터링 대시보드**

- **진행 시간 추적**: 각 단계별 실제 소요 시간 모니터링
- **성공률 측정**: 타임아웃 발생률 및 성공률 추적
- **오류 분석**: 타임아웃 원인별 분류 및 분석

---

## 📈 **성능 지표 목표**

| 지표 | 현재 | 목표 | 개선 방안 |
|------|------|------|-----------|
| **전체 완료율** | 85% | 95% | 타임아웃 최적화 |
| **평균 처리 시간** | 8분 | 6분 | 병렬 처리 도입 |
| **GEMINI API 응답률** | 90% | 98% | 재시도 로직 개선 |
| **이메일 발송 성공률** | 95% | 99% | 백그라운드 처리 |

---

## 🔍 **트러블슈팅 가이드**

### **자주 발생하는 오류**

#### **1. GEMINI API 타임아웃**
```
오류: GEMINI API 타임아웃: 800000ms 초과
해결: 재시도 로직 확인, 프롬프트 길이 점검
```

#### **2. 전체 프로세스 타임아웃**
```
오류: 전체 프로세스 타임아웃: 780000ms 초과
해결: 단계별 소요 시간 분석, 병목 지점 최적화
```

#### **3. 이메일 발송 실패**
```
오류: 이메일 발송 타임아웃
해결: 백그라운드 발송 확인, Gmail API 상태 점검
```

---

## 📞 **지원 및 문의**

**개발팀 연락처:**
- 이메일: hongik423@gmail.com
- 전화: 010-9251-9743

**긴급 상황 대응:**
1. Google Apps Script 로그 확인
2. Vercel 함수 로그 분석  
3. 타임아웃 설정 재확인
4. 필요시 수동 이메일 발송

---

*본 문서는 AICAMP V3.0 시스템의 진단 프로세스 최적화를 위해 작성되었습니다.*
*최종 업데이트: 2024년 12월*