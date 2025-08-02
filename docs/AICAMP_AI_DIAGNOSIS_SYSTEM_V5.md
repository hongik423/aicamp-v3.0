# AICAMP AI 진단 시스템 V5.0 - 완벽한 구조화 문서

## 1. 시스템 아키텍처

### 1.1 전체 구조
```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                      │
├─────────────────────────────────────────────────────────────┤
│  1. AI 진단 신청 폼 (20개 AI 역량 항목 포함)                │
│  2. 기본 정보 수집 (기업명, 대표자명, 업종, 지역 등)        │
│  3. 사업 내용 및 고민사항 입력                              │
│  4. AI 역량 5점 척도 평가 (20개 항목)                       │
├─────────────────────────────────────────────────────────────┤
│                     API Layer (Next.js API)                  │
├─────────────────────────────────────────────────────────────┤
│  1. 데이터 검증 및 전처리                                   │
│  2. Google Apps Script 프록시                              │
│  3. 타임아웃 및 오류 처리                                   │
├─────────────────────────────────────────────────────────────┤
│                Google Apps Script (Backend)                  │
├─────────────────────────────────────────────────────────────┤
│  1. 데이터 수신 및 검증                                     │
│  2. AI 역량 분석 (20개 항목 기반)                           │
│  3. 업종별 벤치마크 비교                                    │
│  4. SWOT 분석 및 전략 수립                                  │
│  5. Gemini 2.5 Flash AI 보고서 생성                         │
│  6. Google Sheets 저장                                      │
│  7. 이메일 자동 발송                                        │
└─────────────────────────────────────────────────────────────┘
```

## 2. AI 역량 진단 20개 항목 (이미지 기반)

### 2.1 경영진 리더십 (5개 항목)
1. **CEO의 AI비전과 추진 의지** (ceoAIVision)
2. **AI 투자 의지와 예산 확보** (aiInvestment)
3. **AI 전략 수립 수준** (aiStrategy)
4. **변화 관리** (changeManagement)
5. **리스크 수용도** (riskTolerance)

### 2.2 인프라/시스템 (5개 항목)
6. **IT 인프라** (itInfrastructure)
7. **데이터 관리** (dataManagement)
8. **보안 수준** (securityLevel)
9. **AI 도구 도입** (aiToolsAdopted)
10. **시스템 통합** (systemIntegration)

### 2.3 직원 역량 (4개 항목)
11. **디지털 리터러시** (digitalLiteracy)
12. **AI 도구 활용** (aiToolUsage)
13. **학습 민첩성** (learningAgility)
14. **데이터 분석 능력** (dataAnalysis)

### 2.4 조직 문화 (4개 항목)
15. **혁신 문화** (innovationCulture)
16. **협업 수준** (collaborationLevel)
17. **실험 문화** (experimentCulture)
18. **지속 학습** (continuousLearning)

### 2.5 실무 적용도 (2개 항목)
19. **프로세스 자동화** (processAutomation)
20. **의사결정 활용** (decisionMaking)
21. **고객 서비스 적용** (customerService)

## 3. 데이터 처리 흐름

### 3.1 Frontend → API
```typescript
interface DiagnosisSubmissionData {
  // 기본 정보
  companyName: string;
  representativeName: string;
  position: string;
  industry: string;
  region: string;
  businessContent: string;
  
  // 고민사항
  concerns: string[];
  expectations: string;
  
  // 기업 규모
  employeeCount?: string;
  annualRevenue?: string;
  businessHistory?: string;
  
  // AI 역량 진단 (20개 항목)
  ceoAIVision: number;        // 1-5점
  aiInvestment: number;       // 1-5점
  aiStrategy: number;         // 1-5점
  changeManagement: number;   // 1-5점
  riskTolerance: number;      // 1-5점
  itInfrastructure: number;   // 1-5점
  dataManagement: number;     // 1-5점
  securityLevel: number;      // 1-5점
  aiToolsAdopted: number;     // 1-5점
  systemIntegration: number;  // 1-5점
  digitalLiteracy: number;    // 1-5점
  aiToolUsage: number;        // 1-5점
  learningAgility: number;    // 1-5점
  dataAnalysis: number;       // 1-5점
  innovationCulture: number;  // 1-5점
  collaborationLevel: number; // 1-5점
  experimentCulture: number;  // 1-5점
  continuousLearning: number; // 1-5점
  processAutomation: number;  // 1-5점
  decisionMaking: number;     // 1-5점
  customerService: number;    // 1-5점
  
  // 연락처 및 동의
  email: string;
  phone?: string;
  agreeToTerms: boolean;
}
```

### 3.2 Google Apps Script 처리
```javascript
function performAICapabilityAnalysis(data) {
  // 20개 항목 개별 점수 추출
  const scores = {
    // 경영진 리더십
    ceoAIVision: data.ceoAIVision || 3,
    aiInvestment: data.aiInvestment || 3,
    aiStrategy: data.aiStrategy || 3,
    changeManagement: data.changeManagement || 3,
    riskTolerance: data.riskTolerance || 3,
    
    // 인프라/시스템
    itInfrastructure: data.itInfrastructure || 3,
    dataManagement: data.dataManagement || 3,
    securityLevel: data.securityLevel || 3,
    aiToolsAdopted: data.aiToolsAdopted || 3,
    systemIntegration: data.systemIntegration || 3,
    
    // 직원 역량
    digitalLiteracy: data.digitalLiteracy || 3,
    aiToolUsage: data.aiToolUsage || 3,
    learningAgility: data.learningAgility || 3,
    dataAnalysis: data.dataAnalysis || 3,
    
    // 조직 문화
    innovationCulture: data.innovationCulture || 3,
    collaborationLevel: data.collaborationLevel || 3,
    experimentCulture: data.experimentCulture || 3,
    continuousLearning: data.continuousLearning || 3,
    
    // 실무 적용도
    processAutomation: data.processAutomation || 3,
    decisionMaking: data.decisionMaking || 3,
    customerService: data.customerService || 3
  };
  
  // 카테고리별 평균 계산
  const categoryAverages = {
    leadership: (scores.ceoAIVision + scores.aiInvestment + scores.aiStrategy + 
                scores.changeManagement + scores.riskTolerance) / 5,
    infrastructure: (scores.itInfrastructure + scores.dataManagement + 
                    scores.securityLevel + scores.aiToolsAdopted + 
                    scores.systemIntegration) / 5,
    workforce: (scores.digitalLiteracy + scores.aiToolUsage + 
               scores.learningAgility + scores.dataAnalysis) / 4,
    culture: (scores.innovationCulture + scores.collaborationLevel + 
             scores.experimentCulture + scores.continuousLearning) / 4,
    implementation: (scores.processAutomation + scores.decisionMaking + 
                    scores.customerService) / 3
  };
  
  // 총점 계산 (100점 만점)
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / 20 * 20;
  
  // 업종별 벤치마크와 비교
  const industryBenchmark = getIndustryBenchmark(data.industry);
  const gap = totalScore - industryBenchmark.average;
  
  return {
    individualScores: scores,
    categoryAverages,
    totalScore,
    industryBenchmark,
    gap,
    recommendations: generateRecommendations(scores, gap)
  };
}
```

## 4. AI 보고서 생성 프롬프트

### 4.1 Gemini 2.5 Flash 프롬프트 구조
```javascript
const prompt = `
당신은 이후경 교장(AI CAMP 대표)입니다. 
다음 정보를 바탕으로 최고수준의 AI 경영진단 보고서를 작성해주세요.

[기업 정보]
- 기업명: ${data.companyName}
- 업종: ${data.industry}
- 규모: ${data.employeeCount}
- 지역: ${data.region}
- 사업 내용: ${data.businessContent}
- 주요 고민사항: ${data.concerns}
- 기대 효과: ${data.expectations}

[AI 역량 진단 결과 - 20개 항목]
1. CEO의 AI비전과 추진 의지: ${scores.ceoAIVision}점
2. AI 투자 의지와 예산 확보: ${scores.aiInvestment}점
3. AI 전략 수립 수준: ${scores.aiStrategy}점
4. 변화 관리: ${scores.changeManagement}점
5. 리스크 수용도: ${scores.riskTolerance}점
6. IT 인프라: ${scores.itInfrastructure}점
7. 데이터 관리: ${scores.dataManagement}점
8. 보안 수준: ${scores.securityLevel}점
9. AI 도구 도입: ${scores.aiToolsAdopted}점
10. 시스템 통합: ${scores.systemIntegration}점
11. 디지털 리터러시: ${scores.digitalLiteracy}점
12. AI 도구 활용: ${scores.aiToolUsage}점
13. 학습 민첩성: ${scores.learningAgility}점
14. 데이터 분석 능력: ${scores.dataAnalysis}점
15. 혁신 문화: ${scores.innovationCulture}점
16. 협업 수준: ${scores.collaborationLevel}점
17. 실험 문화: ${scores.experimentCulture}점
18. 지속 학습: ${scores.continuousLearning}점
19. 프로세스 자동화: ${scores.processAutomation}점
20. 의사결정 활용: ${scores.decisionMaking}점
21. 고객 서비스 적용: ${scores.customerService}점

[분석 결과]
- 총점: ${totalScore}점 (100점 만점)
- 업종 평균: ${industryBenchmark.average}점
- GAP: ${gap}점

[업종별 AI 트렌드]
${industryTrends}

[요구사항]
1. 20개 AI 역량 항목을 모두 고려한 종합 분석
2. 업종 특화 인사이트 제공
3. 구체적인 실행 전략 제시
4. SWOT 기반 전략 매트릭스
5. 단계별 로드맵 (3-6-12개월)
6. AICAMP 맞춤 교육과정 추천
7. 투자 효과 분석

보고서는 8,000자 이상으로 작성하되, 실무에 즉시 적용 가능한 구체적인 내용으로 구성하세요.
`;
```

## 5. 업종별 벤치마크 데이터

```javascript
const INDUSTRY_BENCHMARKS = {
  '제조업': {
    average: 65,
    topPerformers: 85,
    aiAdoptionRate: 45,
    keyMetrics: {
      ceoAIVision: 3.5,
      itInfrastructure: 3.8,
      processAutomation: 4.0
    }
  },
  'IT/소프트웨어': {
    average: 78,
    topPerformers: 92,
    aiAdoptionRate: 78,
    keyMetrics: {
      aiToolUsage: 4.2,
      dataAnalysis: 4.3,
      innovationCulture: 4.1
    }
  },
  '서비스업': {
    average: 58,
    topPerformers: 80,
    aiAdoptionRate: 38,
    keyMetrics: {
      customerService: 3.8,
      digitalLiteracy: 3.2,
      changeManagement: 3.3
    }
  },
  '유통/도소매': {
    average: 62,
    topPerformers: 82,
    aiAdoptionRate: 42,
    keyMetrics: {
      dataManagement: 3.6,
      processAutomation: 3.7,
      decisionMaking: 3.5
    }
  },
  '음식/외식업': {
    average: 48,
    topPerformers: 72,
    aiAdoptionRate: 25,
    keyMetrics: {
      customerService: 3.4,
      processAutomation: 2.8,
      digitalLiteracy: 2.9
    }
  }
};
```

## 6. 오류 처리 및 안정성

### 6.1 프론트엔드 검증
- 모든 20개 항목 필수 입력 확인
- 1-5점 범위 검증
- 이메일 형식 검증
- 개인정보 동의 필수 체크

### 6.2 백엔드 검증
- 데이터 타입 검증
- 점수 범위 재검증
- 업종 매칭 확인
- Gemini API 타임아웃 처리 (60초)

### 6.3 이메일 발송
- 관리자 알림 (즉시)
- 신청자 접수 확인 (즉시)
- 결과 보고서 (5-10분 후)

## 7. 테스트 시나리오

### 7.1 단위 테스트
1. 20개 AI 역량 항목 개별 점수 입력 테스트
2. 카테고리별 평균 계산 검증
3. 업종별 벤치마크 매칭 테스트
4. GAP 분석 정확도 검증

### 7.2 통합 테스트
1. 전체 신청 프로세스 테스트
2. 데이터 저장 및 조회 테스트
3. 이메일 발송 테스트
4. 보고서 생성 품질 테스트

### 7.3 부하 테스트
1. 동시 신청 처리 테스트
2. Gemini API 응답 시간 테스트
3. Google Sheets 쓰기 성능 테스트