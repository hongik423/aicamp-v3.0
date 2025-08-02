# AI 진단 시스템 V5.0 테스트 가이드

## 1. 시스템 개요

### 1.1 구현된 기능
- ✅ 20개 AI 역량 진단 항목 완벽 구현
- ✅ 업종별 벤치마크 데이터 비교
- ✅ GAP 분석 및 개선 권고사항
- ✅ Gemini 2.5 Flash AI 보고서 생성
- ✅ 이메일 자동 발송 (관리자/신청자)
- ✅ Google Sheets 데이터 저장

### 1.2 주요 파일
- `google_apps_script_AICAMP_OPTIMIZED_V4.js` - 메인 Google Apps Script
- `src/features/free-diagnosis/components/FreeDiagnosisForm.tsx` - 프론트엔드 폼
- `src/features/free-diagnosis/api.ts` - API 연동

## 2. 테스트 시나리오

### 2.1 AI 역량 진단 테스트
```javascript
// Google Apps Script에서 실행
function testAICapabilityAnalysis() {
  const testData = {
    // 경영진 리더십 (5개)
    ceoAIVision: 4,
    aiInvestment: 3,
    aiStrategy: 4,
    changeManagement: 3,
    riskTolerance: 4,
    
    // 인프라/시스템 (5개)
    itInfrastructure: 4,
    dataManagement: 3,
    securityLevel: 4,
    aiToolsAdopted: 3,
    systemIntegration: 3,
    
    // 직원 역량 (4개)
    digitalLiteracy: 4,
    aiToolUsage: 3,
    learningAgility: 4,
    dataAnalysis: 4,
    
    // 조직 문화 (4개)
    innovationCulture: 4,
    collaborationLevel: 3,
    experimentCulture: 4,
    continuousLearning: 4,
    
    // 실무 적용도 (3개)
    processAutomation: 3,
    decisionMaking: 3,
    customerService: 4,
    
    // 기본 정보
    industry: 'IT/소프트웨어'
  };
  
  const result = performAICapabilityAnalysis(testData);
  console.log('AI 역량 분석 결과:', result);
  console.log('총점:', result.totalScore);
  console.log('등급:', result.grade);
  console.log('업종 대비 GAP:', result.gap);
  console.log('개별 점수:', result.individualScores);
}
```

### 2.2 보고서 생성 테스트
```javascript
function testReportGeneration() {
  const testData = {
    회사명: '테스트기업',
    업종: '제조업',
    담당자명: '김대표',
    이메일: 'test@company.com',
    직원수: '50명',
    사업상세설명: 'AI 기반 스마트팩토리 구축',
    주요고민사항: '생산성 향상 및 품질 관리',
    예상혜택: '불량률 감소 및 생산성 30% 향상',
    희망컨설팅분야: 'AI 자동화 및 예측 정비',
    // 20개 AI 역량 점수
    ceoAIVision: 3,
    aiInvestment: 4,
    // ... 나머지 18개 항목
  };
  
  const result = processDiagnosisForm(testData);
  console.log('진단 처리 결과:', result);
}
```

### 2.3 업종별 벤치마크 테스트
```javascript
function testIndustryBenchmark() {
  const industries = ['제조업', 'IT/소프트웨어', '서비스업', '유통/도소매', '음식/외식업'];
  
  industries.forEach(industry => {
    const benchmark = getIndustryAIBenchmark(industry);
    console.log(`${industry} 벤치마크:`, benchmark);
  });
}
```

## 3. 데이터 검증

### 3.1 Google Sheets 헤더 구조
```
A-R: 기본 정보 (18개)
S-BL: AI 역량 분석 (20개 항목 + 분석 결과)
BM-CG: 20개 AI 역량 개별 점수
CH-CK: AI 도입 장벽 및 계획
CL-CY: SWOT 분석
CZ-DI: 실행 전략
DJ-DV: 산업 분석
DW-EC: 고급 AI 분석
```

### 3.2 필수 검증 항목
1. **개인정보 동의**: 반드시 true여야 함
2. **필수 필드**: 회사명, 업종, 이메일, 담당자명
3. **AI 역량 점수**: 1-5점 범위
4. **이메일 형식**: 유효한 이메일 주소

## 4. 오류 처리

### 4.1 일반적인 오류
- **"GEMINI AI 보고서 생성 실패"**: API 키 확인
- **"필수 정보가 누락되었습니다"**: 필수 필드 확인
- **"개인정보 동의 필요"**: agreeToTerms가 true인지 확인

### 4.2 디버깅 방법
```javascript
// Google Apps Script 에디터에서
function debugSystem() {
  // 1. 환경 변수 확인
  console.log('GEMINI_API_KEY:', GEMINI_API_KEY ? '설정됨' : '미설정');
  console.log('SPREADSHEET_ID:', SPREADSHEET_ID);
  
  // 2. 시트 구조 확인
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('AI진단신청');
  console.log('헤더 개수:', sheet.getLastColumn());
  
  // 3. 테스트 데이터로 전체 프로세스 실행
  testFullSystem();
}
```

## 5. 프론트엔드 연동

### 5.1 API 호출 예시
```typescript
import { submitDiagnosis } from '@/features/free-diagnosis/api';

const handleSubmit = async (formData: DiagnosisFormData) => {
  try {
    const result = await submitDiagnosis({
      ...formData,
      // 20개 AI 역량 점수가 모두 포함되어야 함
    });
    
    if (result.success) {
      console.log('진단 신청 성공:', result.diagnosisId);
    }
  } catch (error) {
    console.error('진단 신청 실패:', error);
  }
};
```

### 5.2 응답 처리
```typescript
interface DiagnosisResponse {
  success: boolean;
  diagnosisId?: string;
  message: string;
  resultUrl?: string;
  isTimeout?: boolean;
  estimatedTime?: string;
}
```

## 6. 성능 최적화

### 6.1 권장 사항
- Gemini API 타임아웃: 60초
- 보고서 최소 길이: 4,000자
- 동시 요청 제한: 10개
- 캐싱 전략: 업종별 벤치마크 데이터

### 6.2 모니터링
```javascript
function monitorSystemPerformance() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('AI진단신청');
  const lastRow = sheet.getLastRow();
  
  // 최근 100건 분석
  const recentData = sheet.getRange(Math.max(2, lastRow - 99), 1, 100, sheet.getLastColumn()).getValues();
  
  let successCount = 0;
  let totalScore = 0;
  
  recentData.forEach(row => {
    if (row[14] === '진단완료') successCount++;
    if (row[18]) totalScore += Number(row[18]);
  });
  
  console.log('성공률:', (successCount / 100 * 100).toFixed(2) + '%');
  console.log('평균 AI 역량 점수:', (totalScore / 100).toFixed(2));
}
```

## 7. 체크리스트

### 7.1 배포 전 확인사항
- [ ] GEMINI_API_KEY 설정 확인
- [ ] SPREADSHEET_ID 설정 확인
- [ ] Google Apps Script 배포 URL 업데이트
- [ ] CORS 설정 확인
- [ ] 이메일 발송 테스트
- [ ] 20개 AI 역량 항목 매핑 확인
- [ ] 업종별 벤치마크 데이터 정확도
- [ ] 보고서 품질 확인 (6,000자 이상)
- [ ] 개인정보 동의 처리 확인
- [ ] 오류 메시지 사용자 친화성

### 7.2 운영 중 모니터링
- [ ] 일일 신청 건수 확인
- [ ] 오류 발생률 모니터링
- [ ] 평균 응답 시간 측정
- [ ] 사용자 피드백 수집
- [ ] Google Sheets 용량 관리