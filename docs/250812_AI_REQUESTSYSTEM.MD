# AI 역량진단 및 고몰입조직구축 컨설팅 시스템 PRD (고도화 버전)

## 📋 프로젝트 개요

### 🎯 프로젝트 명
**"AI 역량진단 기반 고몰입조직구축 전략 수립 플랫폼"**

### 🎯 프로젝트 목적
- 기업별 맞춤형 AI 역량 종합 진단 및 SWOT 분석 제공
- GEMINI 2.5 FLASH 기반 개인화된 전략 보고서 자동 생성
- 고몰입조직구축을 위한 3단계 실행로드맵 및 투자계획 수립
- 폴백답변 배제한 100% 맞춤형 AI 컨설팅 보고서 시스템

### 💼 비즈니스 목표
- **주요 KPI**: 진단 완료율 85% 이상, 보고서 만족도 95% 이상
- **전환 목표**: 상담신청 전환율 35% 이상, 계약전환율 60% 이상
- **매출 기여**: 월 5,000만원 이상의 고품질 컨설팅 매출 달성
- **데이터 품질**: 업종별 AI 성숙도 벤치마크 DB 구축

---

## 👥 타겟 사용자 정의

### 🎯 주요 타겟
- **DT 추진 책임자**: 디지털 전환 담당 임원/팀장 (의사결정권자)
- **현업 부서장**: 각 부서별 프로세스 혁신 담당자 (실행 책임자)
- **AI 도입 검토자**: 스타트업 CEO, 중소기업 경영진 (예산 결정권자)

### 👤 사용자 페르소나

#### 1. 디지털 혁신 담당 임원 (45-60세)
- **특징**: 조직 전체 AI 도입 전략 수립 책임, ROI 및 리스크 중시
- **니즈**: 현재 조직 수준 객관적 진단, 단계별 도입 로드맵
- **행동패턴**: 체계적 분석 선호, 동종업계 벤치마킹 중시

#### 2. 실무 프로세스 혁신자 (35-50세)
- **특징**: 부서별 업무 자동화 필요성 인식, 실용적 솔루션 추구
- **니즈**: 부서 특화 AI 활용 방안, 구체적 구현 가이드라인
- **행동패턴**: 즉시 적용 가능한 사례 선호, 교육 연계 관심

#### 3. 스타트업/중소기업 CEO (30-45세)
- **특징**: 제한된 자원으로 최대 효과 추구, 빠른 의사결정
- **니즈**: 비용 대비 효과적인 AI 도입 방안, 경쟁 우위 확보
- **행동패턴**: 간단명료한 정보 선호, 즉시 실행 가능한 솔루션

---

## 🏗️ 시스템 아키텍처 (GAS 기반)

### 📊 전체 시스템 구조
```
Frontend (HTML/CSS/JS + GEMINI 2.5 FLASH)
    ↓
Google Apps Script (Backend)
    ↓
Google Workspace Ecosystem
    ├── Google Sheets (진단데이터 + 상담신청 + 오류신고)
    ├── Gmail (자동 이메일 발송)
    ├── Google Drive (보고서 HTML 파일 저장)
    ├── GEMINI API (맞춤형 진단 보고서 생성)
    └── Google Analytics (사용자 행동 분석)
```

### 🔧 GAS 백엔드 모듈 구조

#### 1. Core Modules
```javascript
// 📁 src/core/
├── main.gs              // 메인 라우팅 및 초기화
├── config.gs            // API 키 및 설정 관리
├── utils.gs             // 공통 유틸리티 함수
└── auth.gs              // GEMINI API 인증 관리
```

#### 2. Assessment Modules
```javascript
// 📁 src/assessment/
├── assessmentHandler.gs    // AI 역량진단 처리
├── geminiService.gs       // GEMINI 2.5 FLASH 연동
├── reportGenerator.gs     // 진단 보고서 생성
└── gapAnalyzer.gs        // 성공사례 GAP 분석
```

#### 3. Data Management Modules
```javascript
// 📁 src/data/
├── sheetManager.gs       // Google Sheets 데이터 관리
├── reportStorage.gs      // HTML 보고서 저장 관리
├── userDataHandler.gs    // 사용자 데이터 처리
└── emailService.gs       // 이메일 발송 서비스
```

#### 4. Consultation Modules
```javascript
// 📁 src/consultation/
├── consultationHandler.gs  // 상담신청 처리
├── errorReportHandler.gs   // 오류신고 처리
├── leadNurturing.gs        // 리드 너처링 자동화
└── notificationService.gs  // 알림 발송 서비스
```

---

## 🗂️ Google Sheets 데이터베이스 설계

### 📊 Sheet 구조

#### 1. `ai_assessment_data` (AI 역량진단 데이터)
```
컬럼: timestamp | email | name | company | industry | department | 
      company_size | current_ai_usage | automation_level | budget_range |
      key_challenges | expected_outcome | urgency_level | contact_preference |
      gemini_report_id | gap_score | consultation_interest | status
```

#### 2. `consultation_requests` (상담신청)
```
컬럼: timestamp | email | name | company | industry | phone |
      consultation_type | preferred_date | preferred_time | specific_needs |
      budget_info | decision_timeline | assessment_reference | status |
      assigned_consultant | follow_up_date
```

#### 3. `error_reports` (오류신고)
```
컬럼: timestamp | reporter_email | reporter_name | error_type | 
      error_description | page_url | browser_info | severity_level |
      screenshot_url | reproduction_steps | status | assigned_developer |
      resolution_date | resolution_note
```

#### 4. `assessment_benchmarks` (진단 벤치마크 데이터)
```
컬럼: industry_code | company_size_range | avg_ai_maturity | 
      avg_automation_level | top_use_cases | success_metrics |
      implementation_timeline | investment_range | roi_expectations
```

#### 5. `gemini_reports` (GEMINI 생성 보고서)
```
컬럼: report_id | user_email | generation_timestamp | report_html |
      gap_analysis | recommendations | next_steps | consultation_cta |
      view_count | download_count | last_accessed
```

---

## 🤖 GEMINI 2.5 FLASH 연동 시스템

### 🔧 AI 진단 보고서 생성 로직

#### 1. 개인화 프롬프트 생성
```javascript
function generatePersonalizedPrompt(userData, benchmarkData) {
  const prompt = `
당신은 AI 프로세스 자동화 컨설팅 전문가입니다. 
다음 정보를 바탕으로 맞춤형 AI 역량 진단 보고서를 HTML 형식으로 작성해주세요.

[신청자 정보]
- 회사: ${userData.company}
- 업종: ${userData.industry}
- 규모: ${userData.companySize}
- 부서: ${userData.department}
- 현재 AI 활용도: ${userData.currentAiUsage}
- 자동화 수준: ${userData.automationLevel}
- 주요 과제: ${userData.keyChallenges}

[업종별 벤치마크]
- 동종업계 평균 AI 성숙도: ${benchmarkData.avgAiMaturity}
- 권장 자동화 수준: ${benchmarkData.recommendedLevel}
- 성공사례 ROI: ${benchmarkData.successRoi}

다음 구조로 HTML 보고서를 생성해주세요:
1. 현재 AI 역량 진단 결과 (점수 및 레벨)
2. 동종업계 대비 GAP 분석
3. 우선순위별 개선 권고사항
4. 단계별 구현 로드맵
5. 예상 투자 규모 및 ROI
6. 맞춤형 상담 신청 CTA

HTML은 반응형으로 작성하고, 차트는 Chart.js를 활용해주세요.
`;
  
  return prompt;
}
```

#### 2. GEMINI API 호출 및 보고서 생성
```javascript
async function generateAssessmentReport(userData) {
  try {
    // 벤치마크 데이터 조회
    const benchmarkData = getBenchmarkData(userData.industry, userData.companySize);
    
    // 개인화 프롬프트 생성
    const prompt = generatePersonalizedPrompt(userData, benchmarkData);
    
    // GEMINI API 호출
    const response = await UrlFetchApp.fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getGeminiApiKey()}`,
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          maxOutputTokens: 4096
        }
      })
    });
    
    const data = JSON.parse(response.getContentText());
    const reportHtml = data.candidates[0].content.parts[0].text;
    
    // 보고서 저장 및 ID 생성
    const reportId = saveReportToSheet(userData.email, reportHtml);
    
    // HTML 파일로 저장
    saveReportAsHtml(reportId, reportHtml);
    
    return {
      success: true,
      reportId: reportId,
      reportUrl: getReportUrl(reportId)
    };
    
  } catch (error) {
    console.error('GEMINI API 오류:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
```

---

## 📝 AI 역량진단 설문지 설계

### 🔍 진단 문항 구조

#### 1️⃣ 기업 기본정보 및 사업현황 (8문항)
```javascript
const companyInfoQuestions = [
  {
    id: 'company_basic',
    type: 'group',
    questions: [
      {
        id: 'company_name',
        type: 'text',
        question: '회사명을 입력해주세요',
        required: true,
        validation: 'minLength:2'
      },
      {
        id: 'business_registration',
        type: 'text',
        question: '사업자등록번호 (선택사항)',
        required: false,
        purpose: 'company_verification'
      },
      {
        id: 'establishment_year',
        type: 'select',
        question: '설립연도를 선택해주세요',
        options: generateYearOptions(1980, 2024),
        required: true
      }
    ]
  },
  {
    id: 'business_details',
    type: 'group',
    questions: [
      {
        id: 'industry_main',
        type: 'select',
        question: '주력 업종을 선택해주세요',
        options: [
          'IT/소프트웨어', '제조업(전자/기계)', '제조업(화학/소재)', 
          '금융/보험', '유통/도소매', '서비스업(B2B)', '서비스업(B2C)',
          '의료/헬스케어', '교육/연구', '건설/부동산', '물류/운송',
          '미디어/콘텐츠', '농업/식품', '에너지/환경', '기타'
        ],
        required: true
      },
      {
        id: 'business_model',
        type: 'multiselect',
        question: '주요 비즈니스 모델을 선택해주세요 (복수선택 가능)',
        options: [
          'B2B 제품/서비스 판매', 'B2C 제품/서비스 판매', 'SaaS/구독 서비스',
          '플랫폼/마켓플레이스', '제조/생산', 'OEM/ODM', '유통/중개',
          '컨설팅/전문서비스', '프랜차이즈', '기타'
        ],
        required: true
      },
      {
        id: 'main_products_services',
        type: 'textarea',
        question: '주요 제품/서비스를 구체적으로 설명해주세요 (AI가 업종 특성을 분석하는데 활용됩니다)',
        placeholder: '예: 중소기업 대상 ERP 솔루션 개발 및 공급, 맞춤형 컨설팅 서비스 제공',
        required: true,
        minLength: 20
      },
      {
        id: 'target_customers',
        type: 'textarea',
        question: '주요 고객층을 설명해주세요',
        placeholder: '예: 직원 50-200명 규모의 제조업체, 연매출 100억-500억 중견기업',
        required: true,
        minLength: 15
      }
    ]
  },
  {
    id: 'company_scale',
    type: 'group',
    questions: [
      {
        id: 'employee_count',
        type: 'select',
        question: '전체 직원 수는?',
        options: [
          '10명 미만', '10-30명', '31-50명', '51-100명', 
          '101-300명', '301-500명', '501-1000명', '1000명 이상'
        ],
        required: true
      },
      {
        id: 'annual_revenue',
        type: 'select',
        question: '연간 매출 규모는? (선택사항)',
        options: [
          '10억 미만', '10억-50억', '50억-100억', '100억-500억',
          '500억-1000억', '1000억 이상', '비공개'
        ],
        required: false
      }
    ]
  }
];
```

#### 2️⃣ 현재 AI/디지털 활용 현황 (10문항)
```javascript
const currentAIUsageQuestions = [
  {
    id: 'ai_awareness_usage',
    type: 'group',
    questions: [
      {
        id: 'ai_familiarity',
        type: 'scale',
        question: '경영진의 AI/자동화 기술에 대한 이해도는?',
        scale: {
          min: 1,
          max: 5,
          labels: ['전혀 모름', '기초 개념만', '일반적 이해', '상당한 이해', '전문가 수준']
        },
        required: true
      },
      {
        id: 'current_ai_tools',
        type: 'multiselect',
        question: '현재 조직에서 사용 중인 AI/자동화 도구는?',
        options: [
          'ChatGPT/Copilot 등 생성형 AI', 'RPA(로봇 프로세스 자동화)',
          'BI/데이터 분석 도구', '챗봇/고객응대 AI', 'ERP/CRM 자동화',
          '마케팅 자동화 도구', '문서관리 자동화', '회계/정산 자동화',
          'n8n/Zapier 등 워크플로우 자동화', '아직 사용하지 않음'
        ],
        required: true
      },
      {
        id: 'ai_usage_departments',
        type: 'multiselect',
        question: 'AI/자동화를 가장 많이 활용하는 부서는?',
        options: [
          'IT/개발팀', '마케팅팀', '영업팀', '고객지원팀', 
          '인사/총무팀', '재무/회계팀', '기획/전략팀', '생산/품질팀',
          '연구개발팀', '전 부서 공통', '아직 활용 부서 없음'
        ],
        required: true
      }
    ]
  },
  {
    id: 'automation_current_state',
    type: 'group',
    questions: [
      {
        id: 'automation_level_by_function',
        type: 'matrix',
        question: '업무 기능별 현재 자동화 수준을 평가해주세요',
        functions: [
          '문서 작성/관리', '데이터 입력/처리', '보고서 생성',
          '고객 응대/소통', '일정 관리/알림', '승인/결재 프로세스',
          '재고/발주 관리', '회계/정산', '마케팅/홍보'
        ],
        scale: {
          min: 1,
          max: 5,
          labels: ['수작업', '부분 자동화', '반자동화', '대부분 자동화', '완전 자동화']
        },
        required: true
      },
      {
        id: 'data_digitalization',
        type: 'scale',
        question: '조직의 데이터 디지털화 수준은?',
        scale: {
          min: 1,
          max: 5,
          labels: ['대부분 종이/수기', '일부 디지털화', '반반 수준', '대부분 디지털', '완전 디지털화']
        },
        required: true
      }
    ]
  },
  {
    id: 'digital_infrastructure',
    type: 'group',
    questions: [
      {
        id: 'it_systems',
        type: 'multiselect',
        question: '현재 사용 중인 주요 IT 시스템은?',
        options: [
          'ERP 시스템', 'CRM 시스템', '그룹웨어/협업도구',
          '클라우드 스토리지', 'BI/분석 도구', '프로젝트 관리 도구',
          'API 연동 시스템', '데이터베이스 관리', '보안 솔루션',
          '기본적인 오피스 툴만 사용'
        ],
        required: true
      },
      {
        id: 'cloud_usage',
        type: 'select',
        question: '클라우드 서비스 활용 수준은?',
        options: [
          '전혀 사용하지 않음', '기본적인 클라우드 스토리지만',
          '일부 업무용 클라우드 서비스', '대부분 클라우드 기반',
          '완전한 클라우드 네이티브'
        ],
        required: true
      }
    ]
  }
];
```

#### 3️⃣ 조직 문화 및 변화 준비도 (8문항)
```javascript
const organizationReadinessQuestions = [
  {
    id: 'leadership_commitment',
    type: 'group',
    questions: [
      {
        id: 'ceo_ai_commitment',
        type: 'scale',
        question: 'CEO/경영진의 AI 도입 의지는?',
        scale: {
          min: 1,
          max: 5,
          labels: ['소극적', '관망', '관심있음', '적극적', '최우선 과제']
        },
        required: true
      },
      {
        id: 'digital_transformation_priority',
        type: 'scale',
        question: '디지털 전환이 경영 전략에서 차지하는 우선순위는?',
        scale: {
          min: 1,
          max: 5,
          labels: ['낮음', '보통', '높음', '매우 높음', '최우선']
        },
        required: true
      }
    ]
  },
  {
    id: 'team_readiness',
    type: 'group',
    questions: [
      {
        id: 'employee_tech_acceptance',
        type: 'scale',
        question: '직원들의 새로운 기술 수용도는?',
        scale: {
          min: 1,
          max: 5,
          labels: ['매우 저항적', '저항적', '보통', '수용적', '매우 적극적']
        },
        required: true
      },
      {
        id: 'change_management_experience',
        type: 'multiselect',
        question: '최근 3년간 진행한 변화관리 경험은?',
        options: [
          '새로운 IT 시스템 도입', '업무 프로세스 개선',
          '조직 구조 변경', '디지털 도구 도입', 
          '원격근무 전환', '직원 교육/훈련 강화',
          '특별한 변화 없음'
        ],
        required: true
      },
      {
        id: 'innovation_culture',
        type: 'scale',
        question: '조직의 혁신 문화 수준은?',
        scale: {
          min: 1,
          max: 5,
          labels: ['보수적', '안정 지향', '균형적', '혁신 지향', '매우 혁신적']
        },
        required: true
      }
    ]
  }
];
```

#### 4️⃣ 현재 직면 과제 및 Pain Points (6문항)
```javascript
const currentChallengesQuestions = [
  {
    id: 'operational_challenges',
    type: 'group',
    questions: [
      {
        id: 'biggest_inefficiencies',
        type: 'rank',
        question: '가장 큰 비효율성을 우선순위별로 선택해주세요 (최대 5개)',
        options: [
          '반복적인 수작업 처리', '부서간 정보 공유 부족',
          '의사결정 지연', '고객 응대 지연/품질',
          '데이터 기반 분석 부족', '보고서 작성 시간 과다',
          '일정 관리의 어려움', '품질 관리 어려움',
          '비용 관리/통제 어려움', '인력 부족'
        ],
        maxSelections: 5,
        required: true
      },
      {
        id: 'time_consuming_tasks',
        type: 'textarea',
        question: '가장 많은 시간을 소모하는 반복 업무를 구체적으로 설명해주세요',
        placeholder: '예: 매주 각 부서별 실적 데이터를 수집하여 경영진 보고서 작성, 고객 문의 이메일 분류 및 담당자 배정',
        required: true,
        minLength: 30
      }
    ]
  },
  {
    id: 'competitive_challenges',
    type: 'group',
    questions: [
      {
        id: 'market_pressure',
        type: 'multiselect',
        question: '시장에서 느끼는 주요 압박 요인은?',
        options: [
          '경쟁사의 디지털화 진전', '고객의 빠른 응답 요구',
          '비용 절감 압박', '품질 향상 요구', 
          '신속한 의사결정 필요', '데이터 기반 경영 요구',
          '인력난/채용 어려움', '규제/컴플라이언스 강화'
        ],
        required: true
      },
      {
        id: 'competitive_disadvantages',
        type: 'textarea',
        question: '경쟁사 대비 불리한 점이 있다면 설명해주세요',
        placeholder: '예: 경쟁사들은 이미 AI 챗봇으로 24시간 고객응대를 하는데 우리는 아직 수작업',
        required: false
      }
    ]
  }
];
```

#### 5️⃣ AI 도입 목표 및 기대효과 (7문항)
```javascript
const aiGoalsQuestions = [
  {
    id: 'primary_objectives',
    type: 'group',
    questions: [
      {
        id: 'ai_transformation_goals',
        type: 'rank',
        question: 'AI 도입을 통해 달성하고자 하는 목표를 우선순위별로 선택해주세요 (최대 5개)',
        options: [
          '업무 효율성 향상', '비용 절감', '매출/수익성 증대',
          '고객 만족도 향상', '직원 만족도 향상', '의사결정 품질 개선',
          '경쟁우위 확보', '확장성/성장성 확보', '리스크 관리 강화',
          '혁신 문화 구축'
        ],
        maxSelections: 5,
        required: true
      },
      {
        id: 'specific_improvements',
        type: 'textarea',
        question: 'AI/자동화를 통해 개선하고 싶은 구체적인 업무나 프로세스를 설명해주세요',
        placeholder: '예: 고객 문의 응답 시간을 현재 4시간에서 1시간 이내로 단축, 월말 결산 작업을 3일에서 1일로 단축',
        required: true,
        minLength: 40
      }
    ]
  },
  {
    id: 'success_metrics',
    type: 'group',
    questions: [
      {
        id: 'kpi_priorities',
        type: 'multiselect',
        question: '성공을 측정할 주요 지표는?',
        options: [
          '업무 처리 시간 단축률', '비용 절감액/절감률',
          '매출 증가율', '고객 만족도 점수', '직원 생산성 지수',
          '오류율 감소', '응답 시간 단축', '처리량 증가',
          'ROI(투자대비수익률)', '시장 점유율 증가'
        ],
        required: true
      },
      {
        id: 'target_improvements',
        type: 'matrix',
        question: '다음 영역별로 기대하는 개선 정도를 선택해주세요',
        areas: [
          '업무 처리 속도', '업무 정확도', '비용 효율성',
          '고객 응답성', '의사결정 속도', '데이터 활용도'
        ],
        scale: {
          min: 1,
          max: 5,
          labels: ['약간 개선', '어느정도 개선', '상당한 개선', '대폭 개선', '혁신적 개선']
        },
        required: true
      }
    ]
  }
];
```

#### 6️⃣ 투자 계획 및 실행 역량 (6문항)
```javascript
const investmentCapacityQuestions = [
  {
    id: 'budget_planning',
    type: 'group',
    questions: [
      {
        id: 'ai_budget_range',
        type: 'select',
        question: 'AI/자동화 투자 예산 규모는?',
        options: [
          '1,000만원 미만', '1,000만원-3,000만원', '3,000만원-5,000만원',
          '5,000만원-1억원', '1억원-3억원', '3억원-5억원', '5억원 이상'
        ],
        required: true
      },
      {
        id: 'budget_allocation',
        type: 'percentage',
        question: '예산 배분 계획은?',
        categories: [
          '시스템/도구 도입비', '컨설팅/설계비', '교육/훈련비',
          '인력 충원/개발비', '운영/유지보수비'
        ],
        totalPercentage: 100,
        required: true
      },
      {
        id: 'roi_expectations',
        type: 'select',
        question: '투자대비 회수 기대 기간은?',
        options: [
          '6개월 이내', '6개월-1년', '1년-2년', '2년-3년', '3년 이상'
        ],
        required: true
      }
    ]
  },
  {
    id: 'implementation_readiness',
    type: 'group',
    questions: [
      {
        id: 'implementation_timeline',
        type: 'select',
        question: '실행 희망 시기는?',
        options: [
          '즉시 시작(1개월 내)', '단기(3개월 내)', '중기(6개월 내)',
          '장기(1년 내)', '계획 단계'
        ],
        required: true
      },
      {
        id: 'internal_resources',
        type: 'multiselect',
        question: '내부 보유 역량은?',
        options: [
          'IT 전담 인력', '프로젝트 관리 역량', '데이터 분석 역량',
          '변화관리 경험', '교육/훈련 체계', '외부 파트너 네트워크',
          '특별한 역량 없음'
        ],
        required: true
      },
      {
        id: 'support_needs',
        type: 'multiselect',
        question: '가장 필요한 외부 지원은?',
        options: [
          '전략 수립 컨설팅', '기술 구현 지원', '교육/훈련 프로그램',
          '변화관리 지원', '성과 측정/관리', '지속적 운영 지원'
        ],
        required: true
      }
    ]
  }
];
```

---

## 🤖 GEMINI 2.5 FLASH 고도화 프롬프트 시스템

### 🔧 SWOT 분석 기반 전략 수립 프롬프트

```javascript
function generateAdvancedAnalysisPrompt(userData, industryData, benchmarkData) {
  return `
당신은 20년 경력의 디지털 전환 및 조직 개발 전문 컨설턴트입니다. 
다음 정보를 바탕으로 해당 기업의 AI 역량 강화를 통한 고몰입조직구축 전략을 수립해주세요.

[기업 기본정보]
- 회사명: ${userData.companyName}
- 업종: ${userData.industryMain}
- 사업내용: ${userData.mainProductsServices}
- 고객층: ${userData.targetCustomers}
- 직원수: ${userData.employeeCount}
- 설립연도: ${userData.establishmentYear}

[현재 AI/디지털 활용 현황]
- AI 이해도: ${userData.aiFamiliarity}/5
- 현재 사용 도구: ${userData.currentAiTools.join(', ')}
- 부서별 자동화 수준: ${JSON.stringify(userData.automationLevelByFunction)}
- IT 인프라: ${userData.itSystems.join(', ')}

[조직 문화 및 준비도]
- 경영진 AI 의지: ${userData.ceoAiCommitment}/5
- 직원 기술수용도: ${userData.employeeTechAcceptance}/5
- 혁신문화 수준: ${userData.innovationCulture}/5

[현재 과제 및 목표]
- 주요 비효율성: ${userData.biggestInefficiencies.join(', ')}
- 시간소모 업무: ${userData.timeConsumingTasks}
- AI 도입 목표: ${userData.aiTransformationGoals.join(', ')}
- 기대 개선효과: ${JSON.stringify(userData.targetImprovements)}

[투자 계획]
- 예산 규모: ${userData.aiBudgetRange}
- 예산 배분: ${JSON.stringify(userData.budgetAllocation)}
- 회수 기대기간: ${userData.roiExpectations}
- 실행 시기: ${userData.implementationTimeline}

[업종 벤치마크 데이터]
- 동종업계 평균 AI 성숙도: ${benchmarkData.avgAiMaturity}
- 업종별 주요 자동화 영역: ${benchmarkData.topAutomationAreas.join(', ')}
- 평균 투자규모: ${benchmarkData.avgInvestment}
- 성공사례 ROI: ${benchmarkData.successCaseRoi}

다음 구조의 상세한 HTML 보고서를 작성해주세요:

## 1. 경영진 요약 (Executive Summary)
- 현재 AI 성숙도 진단 결과 (점수 및 레벨)
- 핵심 권고사항 3가지
- 예상 투자대비효과 요약

## 2. AI 역량진단 종합 평가
### 2.1 평가 결과 메트릭스
- 7개 영역별 현재 점수 vs 목표 점수 (레이더 차트)
- 업종 평균 대비 비교 (막대 차트)
- 강점/약점 영역 분석

### 2.2 평가 결과 피드백
- 각 평가 영역별 상세 분석
- 현재 수준에 대한 객관적 평가
- 개선이 시급한 영역 식별

## 3. SWOT 분석 및 전략 수립
### 3.1 SWOT 매트릭스
**Strengths (강점)**
- ${userData.companyName}의 내부 역량 분석
- 기존 IT 인프라 및 조직 문화의 장점
- 업종 특성상 보유한 경쟁우위

**Weaknesses (약점)**  
- 현재 AI/자동화 역량의 부족한 영역
- 조직 내부의 제약 요인
- 개선이 필요한 프로세스

**Opportunities (기회)**
- ${userData.industryMain} 업종의 AI 도입 트렌드
- 디지털 전환을 통한 시장 기회
- 고객 니즈 변화에 따른 기회

**Threats (위협)**
- 경쟁사의 디지털 진전
- 기술 변화 속도에 따른 리스크
- 시장 환경 변화 위협

### 3.2 TOWS 전략 매트릭스
**SO 전략 (강점-기회 활용)**
- 내부 강점을 활용한 시장 기회 포착 방안
- 구체적인 실행 전략 3가지

**WO 전략 (약점-기회 극복)**
- 약점을 보완하여 기회를 활용하는 방안
- 역량 강화 우선순위

**ST 전략 (강점-위협 대응)**
- 강점을 활용한 위협 대응 전략
- 경쟁우위 유지 방안

**WT 전략 (약점-위협 최소화)**
- 약점과 위협을 동시에 해결하는 방안
- 리스크 최소화 전략

## 4. AI 역량강화 실행 로드맵 (3단계)
### 4.1 1단계: 기반 구축 (1-6개월)
**목표**: AI 도입을 위한 조직/기술 기반 마련
**핵심 과제**:
- ${userData.biggestInefficiencies[0]} 해결을 위한 기초 자동화
- 직원 AI 리터러시 교육
- 데이터 정비 및 표준화
**투자 규모**: 전체 예산의 30%
**예상 효과**: 업무 효율성 20% 향상

### 4.2 2단계: 본격 도입 (6-12개월)  
**목표**: 핵심 업무 프로세스 AI 자동화
**핵심 과제**:
- ${userData.aiTransformationGoals[0]} 달성을 위한 AI 솔루션 도입
- 부서별 맞춤형 자동화 구현
- 성과 측정 체계 구축
**투자 규모**: 전체 예산의 50%
**예상 효과**: 생산성 40% 향상, 비용 25% 절감

### 4.3 3단계: 고도화 및 확산 (12-18개월)
**목표**: AI 기반 고몰입조직 완성
**핵심 과제**:
- 전사 AI 플랫폼 구축
- 데이터 기반 의사결정 체계 확립
- 지속적 혁신 문화 정착
**투자 규모**: 전체 예산의 20%
**예상 효과**: 종합 생산성 60% 향상, ROI 300% 달성

## 5. 중요도-긴급성 매트릭스
### 5.1 우선순위 매트릭스
**1사분면 (긴급+중요)**: 즉시 실행 과제
- ${userData.timeConsumingTasks}의 자동화 (3개월 내)
- ${userData.biggestInefficiencies[0]} 해결 (6개월 내)

**2사분면 (중요+비긴급)**: 계획적 추진 과제  
- 전사 AI 전략 수립
- 인력 역량 강화 프로그램

**3사분면 (긴급+비중요)**: 효율화 과제
- 단순 반복업무 자동화
- 레거시 시스템 정리

**4사분면 (비긴급+비중요)**: 장기 검토 과제
- 최신 AI 기술 도입 검토
- 고도화 기능 추가

### 5.2 실행용이성 분석
각 과제별 구현 난이도, 필요 자원, 기대효과를 종합한 실행 우선순위 제시

## 6. 투자대비효과 분석
### 6.1 비용-편익 분석
**총 투자비용**: ${userData.aiBudgetRange}
- 1년차 투자: ${calculateYearlyInvestment(userData.budgetAllocation, 1)}
- 2년차 투자: ${calculateYearlyInvestment(userData.budgetAllocation, 2)}
- 3년차 투자: ${calculateYearlyInvestment(userData.budgetAllocation, 3)}

**예상 효과 (정량)**:
- 연간 인건비 절감: ${calculateLaborSaving(userData)}
- 업무 시간 단축 효과: ${calculateTimeSaving(userData)}
- 오류 감소 효과: ${calculateErrorReduction(userData)}

**예상 효과 (정성)**:
- 직원 만족도 향상
- 고객 서비스 품질 개선  
- 의사결정 품질 향상

### 6.2 ROI 계산
- 1년차 ROI: ${calculateROI(userData, 1)}%
- 3년차 누적 ROI: ${calculateROI(userData, 3)}%
- 투자 회수 기간: ${calculatePaybackPeriod(userData)}개월

## 7. 맞춤형 AICAMP 제안
### 7.1 추천 교육 과정
**우선 권장 과정**:
- ${getRecommendedTraining(userData.department, userData.aiFamiliarity)}
- ${getSecondaryTraining(userData.currentChallenges)}

**단계별 교육 계획**:
- 1단계: 경영진 AI 리더십 과정 (3시간)
- 2단계: ${userData.department} 특화 자동화 교육 (12시간)  
- 3단계: 전직원 AI 활용 교육 (8시간)

### 7.2 컨설팅 서비스 제안
**Phase 1: AI 전략 수립** (4주)
- 상세 현황 분석 및 전략 수립
- 로드맵 구체화 및 실행계획 수립
- 비용: TBD (기업 현황과 정밀진단 後)

**Phase 2: 파일럿 프로젝트** (8주)
- ${userData.biggestInefficiencies[0]} 해결 중심 POC 구현
- 효과 검증 및 확산 방안 수립
- 비용: TBD (기업 현황과 정밀진단 後)

**Phase 3: 본격 구현 지원** (6개월)
- 전사 AI 플랫폼 구축 지원
- 변화관리 및 교육 지원
- 비용: TBD (기업 현황과 정밀진단 後)

### 7.3 성공을 위한 핵심 조건
1. **경영진 리더십**: CEO의 강력한 추진 의지와 지속적 관심
2. **단계적 접근**: 작은 성공부터 시작하여 점진적 확산
3. **직원 참여**: 현업 직원의 적극적 참여와 피드백 수렴
4. **지속적 학습**: 변화하는 AI 기술에 대한 지속적 학습 체계

## 8. 다음 단계 액션 플랜
### 즉시 실행 (1개월 내)
1. AI 추진 TF 구성 및 킥오프
2. 현업 인터뷰를 통한 상세 요구사항 분석
3. 파일럿 프로젝트 대상 업무 확정

### 단기 실행 (3개월 내)  
1. 파일럿 프로젝트 실행 및 효과 측정
2. 전직원 AI 인식 개선 교육
3. 본격 도입을 위한 상세 계획 수립

### 중기 실행 (6개월 내)
1. 성공 사례 기반 확산 전략 실행
2. 조직 문화 변화 프로그램 운영
3. 지속적 개선 체계 구축

---

**중요**: 이 보고서는 ${userData.companyName}의 구체적인 상황을 반영한 맞춤형 분석 결과입니다. 
업종 특성, 조직 규모, 현재 역량 수준을 종합적으로 고려하여 실현 가능한 전략을 제시했습니다.

**컨설팅 비용**: 각 기업의 현황과 정밀진단 결과에 따라 맞춤형 견적을 제시합니다. 
상세한 비용 산정을 위해서는 전문가 상담을 통한 정밀 분석이 필요합니다.

HTML 형식으로 작성하되, Chart.js를 활용한 시각적 차트와 반응형 디자인을 포함해주세요.
모든 수치와 분석은 제공된 정보를 바탕으로 구체적이고 실행 가능하도록 작성해주세요.
`;
}
```

### 🔧 동적 계산 함수들

```javascript
// 투자대비효과 계산 함수들
function calculateLaborSaving(userData) {
  const avgSalary = getIndustrySalary(userData.industryMain);
  const employeeCount = parseEmployeeCount(userData.employeeCount);
  const automationImpact = calculateAutomationImpact(userData.automationLevelByFunction);
  
  return Math.round(avgSalary * employeeCount * automationImpact * 0.3);
}

function calculateTimeSaving(userData) {
  const currentInefficiencies = userData.biggestInefficiencies.length;
  const automationLevel = getAverageAutomationLevel(userData.automationLevelByFunction);
  const timeSavingRate = (5 - automationLevel) * 0.15; // 최대 60% 시간 절약
  
  return `주당 ${Math.round(40 * timeSavingRate)}시간 (직원 1인당)`;
}

function calculateROI(userData, year) {
  const investment = parseInvestmentAmount(userData.aiBudgetRange);
  const yearlySaving = calculateLaborSaving(userData) + calculateProcessSaving(userData);
  const cumulativeSaving = yearlySaving * year;
  const roi = ((cumulativeSaving - investment) / investment) * 100;
  
  return Math.round(roi);
}

function getRecommendedTraining(department, aiFamiliarity) {
  const trainingMatrix = {
    'IT/개발팀': {
      1: 'AI 기초 및 개발자를 위한 생성형 AI 활용',
      2: 'n8n 워크플로우 자동화 심화',
      3: 'AI 플랫폼 아키텍처 설계',
      4: 'AI 서비스 운영 및 최적화',
      5: 'AI 전문가 과정 및 컨설턴트 양성'
    },
    '마케팅팀': {
      1: 'ChatGPT 마케팅 활용 기초',
      2: '마케팅 자동화 도구 활용',
      3: '데이터 기반 마케팅 전략',
      4: 'AI 마케팅 캠페인 고도화',
      5: '마케팅 AI 전략 수립'
    }
    // 다른 부서별 매트릭스...
  };
  
  return trainingMatrix[department]?.[aiFamiliarity] || '기본 AI 활용 교육';
}
```

### 🎨 HTML 보고서 템플릿 시스템

```javascript
function generateReportHTML(analysisData) {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${analysisData.companyName} AI 역량진단 보고서</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8f9fa;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            margin: -20px -20px 40px -20px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .header .subtitle {
            font-size: 1.2em;
            opacity: 0.9;
        }
        
        .executive-summary {
            background: #e3f2fd;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 40px;
            border-left: 5px solid #2196f3;
        }
        
        .section {
            margin-bottom: 50px;
            padding: 30px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        
        .section h2 {
            color: #1a237e;
            border-bottom: 3px solid #3f51b5;
            padding-bottom: 10px;
            margin-bottom: 30px;
            font-size: 1.8em;
        }
        
        .section h3 {
            color: #303f9f;
            margin: 25px 0 15px 0;
            font-size: 1.4em;
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        
        .metric-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            border: 2px solid #e9ecef;
        }
        
        .metric-value {
            font-size: 2.5em;
            font-weight: bold;
            color: #3f51b5;
            margin-bottom: 10px;
        }
        
        .metric-label {
            color: #666;
            font-size: 0.9em;
        }
        
        .swot-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin: 30px 0;
        }
        
        .swot-item {
            padding: 25px;
            border-radius: 10px;
            min-height: 200px;
        }
        
        .swot-strength { background: #e8f5e8; border-left: 5px solid #4caf50; }
        .swot-weakness { background: #fff3e0; border-left: 5px solid #ff9800; }
        .swot-opportunity { background: #e3f2fd; border-left: 5px solid #2196f3; }
        .swot-threat { background: #ffebee; border-left: 5px solid #f44336; }
        
        .roadmap-timeline {
            position: relative;
            margin: 40px 0;
        }
        
        .timeline-item {
            display: flex;
            margin-bottom: 40px;
            padding-left: 60px;
            position: relative;
        }
        
        .timeline-marker {
            position: absolute;
            left: 20px;
            top: 0;
            width: 20px;
            height: 20px;
            background: #3f51b5;
            border-radius: 50%;
            border: 4px solid white;
            box-shadow: 0 0 0 4px #3f51b5;
        }
        
        .timeline-content {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            flex: 1;
        }
        
        .priority-matrix {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin: 30px 0;
        }
        
        .matrix-quadrant {
            padding: 20px;
            border-radius: 8px;
            min-height: 150px;
        }
        
        .quadrant-1 { background: #ffcdd2; border: 2px solid #f44336; }
        .quadrant-2 { background: #c8e6c9; border: 2px solid #4caf50; }
        .quadrant-3 { background: #fff9c4; border: 2px solid #ffeb3b; }
        .quadrant-4 { background: #e1f5fe; border: 2px solid #03a9f4; }
        
        .roi-calculator {
            background: #f8f9fa;
            padding: 30px;
            border-radius: 10px;
            margin: 30px 0;
        }
        
        .roi-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        
        .chart-container {
            position: relative;
            height: 400px;
            margin: 30px 0;
        }
        
        .cta-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            border-radius: 15px;
            text-align: center;
            margin-top: 50px;
        }
        
        .cta-button {
            background: white;
            color: #667eea;
            padding: 15px 30px;
            border: none;
            border-radius: 25px;
            font-size: 1.1em;
            font-weight: bold;
            cursor: pointer;
            margin: 10px;
            transition: transform 0.2s;
        }
        
        .cta-button:hover {
            transform: scale(1.05);
        }
        
        .tbd-notice {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            font-weight: bold;
            color: #856404;
        }
        
        @media (max-width: 768px) {
            .swot-grid { grid-template-columns: 1fr; }
            .priority-matrix { grid-template-columns: 1fr; }
            .metrics-grid { grid-template-columns: repeat(2, 1fr); }
            .header h1 { font-size: 2em; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- 헤더 섹션 -->
        <div class="header">
            <h1>${analysisData.companyName}</h1>
            <div class="subtitle">AI 역량진단 및 고몰입조직구축 전략 보고서</div>
            <div style="margin-top: 20px; font-size: 0.9em;">
                생성일: ${new Date().toLocaleDateString('ko-KR')} | 
                업종: ${analysisData.industryMain} | 
                규모: ${analysisData.employeeCount}
            </div>
        </div>
        
        <!-- 경영진 요약 -->
        <div class="executive-summary">
            <h2 style="color: #1565c0; border: none; margin-bottom: 20px;">📊 경영진 요약 (Executive Summary)</h2>
            
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-value">${analysisData.overallScore}</div>
                    <div class="metric-label">종합 AI 성숙도</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">${analysisData.maturityLevel}</div>
                    <div class="metric-label">현재 단계</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">${analysisData.expectedROI}%</div>
                    <div class="metric-label">3년차 예상 ROI</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">${analysisData.paybackPeriod}개월</div>
                    <div class="metric-label">투자 회수 기간</div>
                </div>
            </div>
            
            <h3>🎯 핵심 권고사항</h3>
            <ol>
                <li><strong>${analysisData.keyRecommendations[0]}</strong></li>
                <li><strong>${analysisData.keyRecommendations[1]}</strong></li>
                <li><strong>${analysisData.keyRecommendations[2]}</strong></li>
            </ol>
        </div>
        
        <!-- AI 역량진단 결과 -->
        <div class="section">
            <h2>📈 AI 역량진단 종합 평가</h2>
            
            <h3>평가 결과 메트릭스</h3>
            <div class="chart-container">
                <canvas id="radarChart"></canvas>
            </div>
            
            <h3>업종 평균 대비 비교</h3>
            <div class="chart-container">
                <canvas id="comparisonChart"></canvas>
            </div>
            
            <h3>평가 결과 피드백</h3>
            ${generateFeedbackHTML(analysisData.assessmentResults)}
        </div>
        
        <!-- SWOT 분석 -->
        <div class="section">
            <h2>🎯 SWOT 분석 및 전략 수립</h2>
            
            <h3>SWOT 매트릭스</h3>
            <div class="swot-grid">
                <div class="swot-item swot-strength">
                    <h4>💪 Strengths (강점)</h4>
                    <ul>
                        ${analysisData.swot.strengths.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="swot-item swot-weakness">
                    <h4>⚠️ Weaknesses (약점)</h4>
                    <ul>
                        ${analysisData.swot.weaknesses.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="swot-item swot-opportunity">
                    <h4>🚀 Opportunities (기회)</h4>
                    <ul>
                        ${analysisData.swot.opportunities.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="swot-item swot-threat">
                    <h4>⚡ Threats (위협)</h4>
                    <ul>
                        ${analysisData.swot.threats.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <h3>TOWS 전략 매트릭스</h3>
            ${generateTOWSHTML(analysisData.towsStrategies)}
        </div>
        
        <!-- 실행 로드맵 -->
        <div class="section">
            <h2>🗺️ AI 역량강화 3단계 실행 로드맵</h2>
            
            <div class="roadmap-timeline">
                ${generateRoadmapHTML(analysisData.roadmap)}
            </div>
        </div>
        
        <!-- 우선순위 매트릭스 -->
        <div class="section">
            <h2>⚡ 중요도-긴급성 매트릭스</h2>
            
            <div class="priority-matrix">
                <div class="matrix-quadrant quadrant-1">
                    <h4>🔥 긴급+중요 (즉시 실행)</h4>
                    <ul>
                        ${analysisData.priorityMatrix.urgent_important.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="matrix-quadrant quadrant-2">
                    <h4>📋 중요+비긴급 (계획적 추진)</h4>
                    <ul>
                        ${analysisData.priorityMatrix.important_not_urgent.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="matrix-quadrant quadrant-3">
                    <h4>⚡ 긴급+비중요 (효율화)</h4>
                    <ul>
                        ${analysisData.priorityMatrix.urgent_not_important.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="matrix-quadrant quadrant-4">
                    <h4>💭 비긴급+비중요 (장기 검토)</h4>
                    <ul>
                        ${analysisData.priorityMatrix.not_urgent_not_important.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
        
        <!-- 투자대비효과 분석 -->
        <div class="section">
            <h2>💰 투자대비효과 분석</h2>
            
            <div class="roi-calculator">
                <h3>비용-편익 분석</h3>
                <div class="roi-grid">
                    <div class="metric-card">
                        <div class="metric-value">${analysisData.investment.total}</div>
                        <div class="metric-label">총 투자비용</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">${analysisData.savings.annual}</div>
                        <div class="metric-label">연간 절감 효과</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">${analysisData.roi.threeYear}%</div>
                        <div class="metric-label">3년차 누적 ROI</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">${analysisData.paybackPeriod}</div>
                        <div class="metric-label">투자 회수 기간</div>
                    </div>
                </div>
                
                <div class="chart-container">
                    <canvas id="roiChart"></canvas>
                </div>
            </div>
        </div>
        
        <!-- AICAMP 맞춤형 제안 -->
        <div class="section">
            <h2>🎓 AICAMP 맞춤형 제안</h2>
            
            <h3>추천 교육 과정</h3>
            ${generateTrainingHTML(analysisData.recommendedTraining)}
            
            <h3>컨설팅 서비스 제안</h3>
            <div class="tbd-notice">
                💡 <strong>컨설팅 비용 안내</strong><br>
                모든 컨설팅 서비스 비용은 기업의 현황과 정밀진단 결과에 따라 맞춤형으로 산정됩니다.<br>
                정확한 견적을 위해서는 전문가 상담을 통한 상세 분석이 필요합니다.
            </div>
            ${generateConsultingHTML(analysisData.consultingProposal)}
        </div>
        
        <!-- CTA 섹션 -->
        <div class="cta-section">
            <h2>🚀 다음 단계로 나아가세요!</h2>
            <p>전문가와 함께 ${analysisData.companyName}의 AI 혁신 여정을 시작하세요</p>
            <div style="margin-top: 30px;">
                <button class="cta-button" onclick="requestConsultation()">
                    💬 전문가 상담 신청
                </button>
                <button class="cta-button" onclick="requestWorkshop()">
                    🎯 무료 워크샵 참여
                </button>
                <button class="cta-button" onclick="downloadReport()">
                    📄 보고서 다운로드
                </button>
            </div>
            
            <div class="tbd-notice" style="margin-top: 20px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); color: white;">
                📞 <strong>상담 예약 안내</strong><br>
                상담을 통해 귀하의 기업 상황에 맞는 정확한 컨설팅 비용을 안내드립니다.
            </div>
        </div>
    </div>
    
    <script>
        // Chart.js 차트 생성 코드
        ${generateChartJavaScript(analysisData)}
        
        // CTA 버튼 이벤트 핸들러
        function requestConsultation() {
            window.open('/consultation?ref=assessment&company=${encodeURIComponent(analysisData.companyName)}', '_blank');
        }
        
        function requestWorkshop() {
            window.open('/workshop-signup?industry=${analysisData.industryMain}', '_blank');
        }
        
        function downloadReport() {
            window.print();
        }
    </script>
</body>
</html>
`;
}
```

---

## 🔄 고도화된 워크플로우 시스템

### 1️⃣ 지능형 진단 처리 워크플로우

```javascript
function processAdvancedAssessment(formData) {
  try {
    // 1. 데이터 전처리 및 검증
    const validatedData = validateAndEnrichData(formData);
    
    // 2. 업종별 벤치마크 데이터 조회
    const benchmarkData = getBenchmarkData(validatedData.industryMain, validatedData.employeeCount);
    
    // 3. 외부 정보 보강 (회사 정보 검색)
    const enrichedCompanyData = await enrichCompanyInformation(validatedData);
    
    // 4. AI 역량 점수 계산
    const assessmentScore = calculateAdvancedAssessmentScore(validatedData, benchmarkData);
    
    // 5. SWOT 분석 데이터 생성
    const swotAnalysis = generateSWOTAnalysis(validatedData, enrichedCompanyData, benchmarkData);
    
    // 6. GEMINI 2.5 FLASH로 종합 보고서 생성
    const reportData = await generateComprehensiveReport({
      userData: validatedData,
      companyData: enrichedCompanyData,
      benchmark: benchmarkData,
      assessment: assessmentScore,
      swot: swotAnalysis
    });
    
    // 7. 보고서 저장 및 ID 생성
    const reportId = saveAdvancedReport(validatedData.email, reportData);
    
    // 8. 데이터베이스 저장
    saveToManagementSheets(validatedData, assessmentScore, reportId);
    
    // 9. 이메일 발송
    await sendAdvancedReportEmail(validatedData, reportId);
    
    return {
      success: true,
      reportId: reportId,
      score: assessmentScore.totalScore,
      level: assessmentScore.maturityLevel
    };
    
  } catch (error) {
    console.error('고도화 진단 처리 오류:', error);
    return { success: false, error: error.message };
  }
}
```

### 2️⃣ 외부 정보 보강 시스템

```javascript
async function enrichCompanyInformation(userData) {
  try {
    // 회사 기본 정보 검색 및 보강
    const companySearchPrompt = `
다음 회사에 대한 정보를 검색하고 분석해주세요:

회사명: ${userData.companyName}
업종: ${userData.industryMain}  
사업내용: ${userData.mainProductsServices}
고객층: ${userData.targetCustomers}

다음 정보를 JSON 형태로 제공해주세요:
{
  "companyProfile": {
    "size": "추정 규모",
    "marketPosition": "시장 내 위치",
    "competitiveAdvantage": "경쟁우위 요소",
    "industryTrends": "업종 트렌드",
    "digitalMaturity": "디지털 성숙도 추정"
  },
  "swotFactors": {
    "strengths": ["강점 요소들"],
    "weaknesses": ["약점 요소들"],  
    "opportunities": ["기회 요소들"],
    "threats": ["위협 요소들"]
  },
  "recommendations": {
    "priorityAreas": ["우선 개선 영역"],
    "quickWins": ["빠른 성과 창출 방안"],
    "longTermStrategy": ["장기 전략 방향"]
  }
}

폴백 답변이 아닌, 제공된 정보를 바탕으로 구체적이고 실행 가능한 분석을 제공해주세요.
`;

    const enrichedData = await callGeminiAPI(companySearchPrompt);
    return JSON.parse(enrichedData);
    
  } catch (error) {
    console.error('회사 정보 보강 실패:', error);
    // 기본 분석 데이터 반환
    return generateDefaultEnrichment(userData);
  }
}
```

### 3️⃣ 고급 점수 계산 시스템

```javascript
function calculateAdvancedAssessmentScore(userData, benchmarkData) {
  // 7개 핵심 영역별 가중치
  const weights = {
    aiAwareness: 0.15,        // AI 인식/이해도
    currentUsage: 0.20,       // 현재 활용 수준
    infrastructure: 0.15,     // IT 인프라
    organizationReadiness: 0.20, // 조직 준비도
    processMaturity: 0.15,    // 프로세스 성숙도
    investmentCapacity: 0.10, // 투자 역량
    strategicAlignment: 0.05  // 전략적 정렬
  };
  
  // 각 영역별 점수 계산
  const scores = {
    aiAwareness: calculateAIAwarenessScore(userData),
    currentUsage: calculateCurrentUsageScore(userData),
    infrastructure: calculateInfrastructureScore(userData),
    organizationReadiness: calculateOrgReadinessScore(userData),
    processMaturity: calculateProcessMaturityScore(userData),
    investmentCapacity: calculateInvestmentScore(userData),
    strategicAlignment: calculateStrategicAlignmentScore(userData)
  };
  
  // 가중 평균 계산
  const totalScore = Object.keys(weights).reduce((sum, key) => {
    return sum + (scores[key] * weights[key]);
  }, 0);
  
  // 업종별 보정 적용
  const industryAdjustment = getIndustryAdjustment(userData.industryMain);
  const adjustedScore = totalScore * industryAdjustment;
  
  // 성숙도 레벨 결정
  const maturityLevel = getMaturityLevel(adjustedScore);
  
  return {
    totalScore: Math.round(adjustedScore * 100),
    breakdown: scores,
    maturityLevel: maturityLevel,
    industryPercentile: calculateIndustryPercentile(adjustedScore, benchmarkData),
    strengths: identifyStrengths(scores),
    weaknesses: identifyWeaknesses(scores),
    gapAnalysis: generateGapAnalysis(scores, benchmarkData)
  };
}

function calculateAIAwarenessScore(userData) {
  const awarenessFactors = [
    { factor: userData.aiFamiliarity, weight: 0.4 },
    { factor: userData.ceoAiCommitment, weight: 0.3 },
    { factor: userData.digitalTransformationPriority, weight: 0.3 }
  ];
  
  return awarenessFactors.reduce((sum, item) => 
    sum + (normalizeToScale(item.factor, 1, 5) * item.weight), 0
  );
}

function getMaturityLevel(score) {
  if (score >= 0.8) return "선도형 (Leading)";
  if (score >= 0.6) return "성장형 (Growing)";
  if (score >= 0.4) return "발전형 (Developing)";
  if (score >= 0.2) return "초기형 (Emerging)";
  return "준비형 (Preparing)";
}
```

---

## 📊 성과 측정 및 품질 관리

### 📈 보고서 품질 지표

```javascript
function assessReportQuality(reportData) {
  const qualityMetrics = {
    personalization: calculatePersonalizationScore(reportData),
    actionability: calculateActionabilityScore(reportData),
    comprehensiveness: calculateComprehensivenessScore(reportData),
    dataAccuracy: calculateDataAccuracyScore(reportData),
    userSatisfaction: 0 // 사용자 피드백으로 업데이트
  };
  
  const overallQuality = Object.values(qualityMetrics).reduce((a, b) => a + b, 0) / 5;
  
  return {
    overall: Math.round(overallQuality * 100),
    breakdown: qualityMetrics,
    improvements: generateQualityImprovements(qualityMetrics)
  };
}

function calculatePersonalizationScore(reportData) {
  const personalizationFactors = [
    reportData.companySpecificAnalysis ? 0.3 : 0,
    reportData.industrySpecificRecommendations ? 0.3 : 0,
    reportData.customizedRoadmap ? 0.2 : 0,
    reportData.specificChallengesAddressed ? 0.2 : 0
  ];
  
  return personalizationFactors.reduce((a, b) => a + b, 0);
}
```

---

## 🎉 결론

이 고도화된 AI 역량진단 시스템은:

1. **완전 개인화**: 폴백답변 없이 100% 맞춤형 분석
2. **전문가 수준**: GEMINI 2.5 FLASH 기반 심화 분석
3. **실행 중심**: 구체적 로드맵과 투자계획 제시
4. **성과 지향**: 측정 가능한 KPI와 ROI 분석
5. **지속적 개선**: 품질 관리 및 피드백 시스템
6. **투명한 비용 체계**: TBD 방식으로 정밀진단 후 맞춤형 견적 제시

이를 통해 기업들이 AI 기반 고몰입조직을 구축하는데 필요한 모든 인사이트와 실행 방안을 제공하며, 정밀진단을 통한 맞춤형 컨설팅 비용 산정으로 신뢰도를 높일 수 있습니다.

---

**📝 문서 정보**
- **작성일**: 2025년 8월 12일
- **버전**: v2.0 (TBD 비용 체계 반영)
- **주요 변경사항**: 컨설팅 서비스 비용을 TBD(기업 현황과 정밀진단 後)로 수정
- **다음 단계**: 개발팀 검토 및 기술 아키텍처 상세 설계