// ================================================================================
// 📋 AICAMP AI 역량진단 시스템 - ENHANCED 버전 V11.0 (45개 질문 대응)
// ================================================================================
// 
// 🎯 45개 질문 기반 고품질 보고서 생성 시스템
// - 6개 섹션 × 다양한 질문 타입 (45개 총 질문)
// - GEMINI 2.5 FLASH 기반 심층 분석 (최신 모델)
// - 이후경 교장 톤앤매너 적용
// - 폴백 제거, 실제 AI 분석 필수
// - 통합 보고서 시스템 (이메일/웹/다운로드 동일)
// - Vercel 800초 타임아웃 최적화
// - 재시도 로직 및 지수 백오프
// - 향상된 에러 핸들링
// - 새로운 질문 구조 완전 대응
// ================================================================================

// ================================================================================
// MODULE 1: 환경설정 및 초기화
// ================================================================================

/**
 * 환경변수 가져오기 (보안 강화 + 기본값 설정)
 */
function getEnvironmentVariables() {
  // 캐싱된 환경변수 사용
  if (this.cachedEnv) return this.cachedEnv;
  
  const scriptProperties = PropertiesService.getScriptProperties();
  
  // 필수 환경변수 기본값 (실제 값은 스크립트 속성에 설정해야 함)
  const requiredEnv = {
    SPREADSHEET_ID: '',
    GEMINI_API_KEY: '',
    ADMIN_EMAIL: ''
  };
  
  this.cachedEnv = {
    // 필수 설정 (스크립트 속성 우선, 없으면 필수값 사용)
    SPREADSHEET_ID: scriptProperties.getProperty('SPREADSHEET_ID') || requiredEnv.SPREADSHEET_ID,
    GEMINI_API_KEY: scriptProperties.getProperty('GEMINI_API_KEY') || requiredEnv.GEMINI_API_KEY,
    ADMIN_EMAIL: scriptProperties.getProperty('ADMIN_EMAIL') || requiredEnv.ADMIN_EMAIL,
    
    // AICAMP 정보
    AICAMP_WEBSITE: scriptProperties.getProperty('AICAMP_WEBSITE') || 'aicamp.club',
    
    // Gemini 설정 - 2.5 FLASH 모델로 최신 업그레이드 (사실 기반 분석 특화)
    AI_MODEL: scriptProperties.getProperty('AI_MODEL') || 'gemini-2.5-flash',
    MAX_OUTPUT_TOKENS: parseInt(scriptProperties.getProperty('MAX_OUTPUT_TOKENS')) || 8192,
    TEMPERATURE: parseFloat(scriptProperties.getProperty('TEMPERATURE')) || 0.3,
    
    // 타임아웃 설정 (Vercel 800초 제한 고려)
    TIMEOUT_GEMINI: parseInt(scriptProperties.getProperty('TIMEOUT_GEMINI')) || 800000, // 800초
    TIMEOUT_EMAIL: parseInt(scriptProperties.getProperty('TIMEOUT_EMAIL')) || 120000, // 2분
    TIMEOUT_DATA_SAVE: parseInt(scriptProperties.getProperty('TIMEOUT_DATA_SAVE')) || 60000, // 1분
    
    // 성능 설정
    MAX_RETRIES: parseInt(scriptProperties.getProperty('MAX_RETRIES')) || 3,
    RETRY_DELAY: parseInt(scriptProperties.getProperty('RETRY_DELAY')) || 1000,
    
    // 개발/운영 모드 (폴백 완전 금지)
    DEBUG_MODE: scriptProperties.getProperty('DEBUG_MODE') === 'true' || false,
    ENVIRONMENT: scriptProperties.getProperty('ENVIRONMENT') || 'production',
    FALLBACK_DISABLED: true,
    REPORT_UNIFIED: true
  };
  
  // 환경변수 유효성 검증
  const validationErrors = [];
  
  if (!this.cachedEnv.SPREADSHEET_ID || this.cachedEnv.SPREADSHEET_ID.length < 20) {
    validationErrors.push('SPREADSHEET_ID가 유효하지 않습니다');
  }
  
  if (!this.cachedEnv.GEMINI_API_KEY || this.cachedEnv.GEMINI_API_KEY.length < 20) {
    validationErrors.push('GEMINI_API_KEY가 유효하지 않습니다');
  }
  
  if (!this.cachedEnv.ADMIN_EMAIL || !this.cachedEnv.ADMIN_EMAIL.includes('@')) {
    validationErrors.push('ADMIN_EMAIL이 유효하지 않습니다');
  }
  
  if (validationErrors.length > 0) {
    console.warn('⚠️ 환경변수 검증 경고:', validationErrors);
    // 필수 항목 미설정 시 명확한 예외 발생 (운영 안전)
    if (!this.cachedEnv.SPREADSHEET_ID || !this.cachedEnv.GEMINI_API_KEY || !this.cachedEnv.ADMIN_EMAIL) {
      throw new Error('필수 환경변수가 설정되지 않았습니다. GAS 스크립트 속성에 SPREADSHEET_ID, GEMINI_API_KEY, ADMIN_EMAIL을 설정하세요.');
    }
  }
  
  // 디버그 모드에서만 환경변수 로그 출력
  if (this.cachedEnv.DEBUG_MODE) {
    console.log('🔧 환경변수 로드 완료:', {
      SPREADSHEET_ID: this.cachedEnv.SPREADSHEET_ID ? '설정됨' : '미설정',
      GEMINI_API_KEY: this.cachedEnv.GEMINI_API_KEY ? '설정됨' : '미설정',
      ADMIN_EMAIL: this.cachedEnv.ADMIN_EMAIL ? '설정됨' : '미설정',
      AI_MODEL: this.cachedEnv.AI_MODEL,
      ENVIRONMENT: this.cachedEnv.ENVIRONMENT,
      hasScriptProperties: Object.keys(scriptProperties.getProperties()).length > 0
    });
  }
  
  return this.cachedEnv;
}

// ================================================================================
// MODULE 2: 45개 질문 구조 정의 (프론트엔드와 동일한 구조)
// ================================================================================

/**
 * 45개 질문 구조 정의
 * 프론트엔드 questions.ts와 완전히 동일한 구조로 설계
 */
function getQuestionStructure() {
  return {
    sections: [
      {
        id: 'company-info',
        title: '기업 기본정보 및 사업현황',
        questionGroups: [
          {
            id: 'company_basic',
            title: '기업 기본정보',
            questions: [
              'companyName', 'businessRegistration', 'establishmentYear',
              'industry', 'businessType', 'location', 'employeeCount', 'annualRevenue'
            ]
          }
        ]
      },
      {
        id: 'current-ai-usage',
        title: '현재 AI/디지털 활용 현황',
        questionGroups: [
          {
            id: 'ai_awareness_usage',
            title: 'AI 인식 및 활용',
            questions: [
              'aiFamiliarity', 'currentAiTools', 'aiUsageDepartments'
            ]
          },
          {
            id: 'automation_current_state',
            title: '업무 자동화 현황',
            questions: [
              'automationLevelByFunction', 'dataDigitalization'
            ]
          },
          {
            id: 'digital_infrastructure',
            title: '디지털 인프라',
            questions: [
              'currentSystems', 'systemIntegration', 'dataManagement'
            ]
          }
        ]
      },
      {
        id: 'ai-capabilities',
        title: 'AI 역량 및 준비도',
        questionGroups: [
          {
            id: 'organizational_readiness',
            title: '조직 준비도',
            questions: [
              'changeReadiness', 'leadershipSupport', 'employeeAttitude',
              'changeManagementExperience'
            ]
          },
          {
            id: 'resource_capability',
            title: '자원 및 역량',
            questions: [
              'budgetAllocation', 'technicalPersonnel', 'externalPartnership',
              'trainingInvestment'
            ]
          },
          {
            id: 'data_analytics_maturity',
            title: '데이터 및 분석 성숙도',
            questions: [
              'dataQuality', 'analyticsCapability', 'decisionMaking'
            ]
          }
        ]
      },
      {
        id: 'tech-infrastructure',
        title: '기술 인프라 및 보안',
        questionGroups: [
          {
            id: 'infrastructure_assessment',
            title: '인프라 평가',
            questions: [
              'cloudAdoption', 'systemScalability', 'integrationCapability'
            ]
          },
          {
            id: 'security_compliance',
            title: '보안 및 컴플라이언스',
            questions: [
              'securityMeasures', 'complianceRequirements', 'riskManagement'
            ]
          }
        ]
      },
      {
        id: 'ai-goals',
        title: 'AI 도입 목표 및 기대효과',
        questionGroups: [
          {
            id: 'primary_objectives',
            title: '주요 목표',
            questions: [
              'aiTransformationGoals', 'specificImprovements'
            ]
          },
          {
            id: 'success_metrics',
            title: '성공 지표',
            questions: [
              'expectedROI', 'successMetrics', 'timeframe'
            ]
          }
        ]
      },
      {
        id: 'implementation-plan',
        title: '실행 계획 및 우선순위',
        questionGroups: [
          {
            id: 'priority_areas',
            title: '우선순위 영역',
            questions: [
              'priorityFunctions', 'implementationApproach', 'resourceAllocation'
            ]
          },
          {
            id: 'support_requirements',
            title: '지원 요구사항',
            questions: [
              'challengesAnticipated', 'supportNeeds'
            ]
          }
        ]
      }
    ]
  };
}

// ================================================================================
// MODULE 3: 데이터 수집 및 정규화
// ================================================================================

/**
 * 45개 질문 데이터 정규화
 * @param {Object} rawData - 프론트엔드에서 전송된 원시 데이터
 * @returns {Object} 정규화된 데이터
 */
function normalizeFormData(rawData) {
  const env = getEnvironmentVariables();
  
  try {
    console.log('📊 45개 질문 데이터 정규화 시작');
    
    // 기본 구조 생성
    const normalized = {
      timestamp: new Date().toISOString(),
      submissionId: `AICAMP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      
      // 섹션 1: 기업 기본정보
      companyInfo: {
        companyName: rawData.companyName || '미입력',
        businessRegistration: rawData.businessRegistration || '',
        establishmentYear: rawData.establishmentYear || '',
        industry: rawData.industry || '기타',
        businessType: rawData.businessType || '기타',
        location: rawData.location || '',
        employeeCount: rawData.employeeCount || '정보 없음',
        annualRevenue: rawData.annualRevenue || '비공개'
      },
      
      // 섹션 2: 현재 AI/디지털 활용 현황
      currentAIUsage: {
        aiFamiliarity: parseInt(rawData.aiFamiliarity) || 1,
        currentAiTools: Array.isArray(rawData.currentAiTools) ? rawData.currentAiTools : [],
        aiUsageDepartments: Array.isArray(rawData.aiUsageDepartments) ? rawData.aiUsageDepartments : [],
        automationLevelByFunction: rawData.automationLevelByFunction || {},
        dataDigitalization: parseInt(rawData.dataDigitalization) || 1,
        currentSystems: Array.isArray(rawData.currentSystems) ? rawData.currentSystems : [],
        systemIntegration: parseInt(rawData.systemIntegration) || 1,
        dataManagement: parseInt(rawData.dataManagement) || 1
      },
      
      // 섹션 3: AI 역량 및 준비도
      aiCapabilities: {
        changeReadiness: parseInt(rawData.changeReadiness) || 1,
        leadershipSupport: parseInt(rawData.leadershipSupport) || 1,
        employeeAttitude: parseInt(rawData.employeeAttitude) || 1,
        changeManagementExperience: parseInt(rawData.changeManagementExperience) || 1,
        budgetAllocation: rawData.budgetAllocation || '정보 없음',
        technicalPersonnel: parseInt(rawData.technicalPersonnel) || 1,
        externalPartnership: parseInt(rawData.externalPartnership) || 1,
        trainingInvestment: parseInt(rawData.trainingInvestment) || 1,
        dataQuality: parseInt(rawData.dataQuality) || 1,
        analyticsCapability: parseInt(rawData.analyticsCapability) || 1,
        decisionMaking: parseInt(rawData.decisionMaking) || 1
      },
      
      // 섹션 4: 기술 인프라 및 보안
      techInfrastructure: {
        cloudAdoption: parseInt(rawData.cloudAdoption) || 1,
        systemScalability: parseInt(rawData.systemScalability) || 1,
        integrationCapability: parseInt(rawData.integrationCapability) || 1,
        securityMeasures: Array.isArray(rawData.securityMeasures) ? rawData.securityMeasures : [],
        complianceRequirements: Array.isArray(rawData.complianceRequirements) ? rawData.complianceRequirements : [],
        riskManagement: parseInt(rawData.riskManagement) || 1
      },
      
      // 섹션 5: AI 도입 목표
      aiGoals: {
        aiTransformationGoals: Array.isArray(rawData.aiTransformationGoals) ? rawData.aiTransformationGoals : [],
        specificImprovements: rawData.specificImprovements || '',
        expectedROI: rawData.expectedROI || '정보 없음',
        successMetrics: Array.isArray(rawData.successMetrics) ? rawData.successMetrics : [],
        timeframe: rawData.timeframe || '정보 없음'
      },
      
      // 섹션 6: 실행 계획
      implementationPlan: {
        priorityFunctions: Array.isArray(rawData.priorityFunctions) ? rawData.priorityFunctions : [],
        implementationApproach: rawData.implementationApproach || '정보 없음',
        resourceAllocation: rawData.resourceAllocation || {},
        challengesAnticipated: Array.isArray(rawData.challengesAnticipated) ? rawData.challengesAnticipated : [],
        supportNeeds: Array.isArray(rawData.supportNeeds) ? rawData.supportNeeds : []
      },
      
      // 연락처 정보
      contactInfo: {
        name: rawData.contactName || rawData.name || '미입력',
        email: rawData.contactEmail || rawData.email || '',
        phone: rawData.contactPhone || rawData.phone || '',
        position: rawData.contactPosition || rawData.position || ''
      }
    };
    
    // 데이터 유효성 검증
    const validationErrors = [];
    
    if (!normalized.companyInfo.companyName || normalized.companyInfo.companyName === '미입력') {
      validationErrors.push('회사명이 누락되었습니다');
    }
    
    if (!normalized.contactInfo.email || !normalized.contactInfo.email.includes('@')) {
      validationErrors.push('유효한 이메일 주소가 누락되었습니다');
    }
    
    if (validationErrors.length > 0) {
      console.warn('⚠️ 데이터 검증 경고:', validationErrors);
    }
    
    console.log('✅ 데이터 정규화 완료:', {
      submissionId: normalized.submissionId,
      companyName: normalized.companyInfo.companyName,
      contactEmail: normalized.contactInfo.email,
      sectionsProcessed: 6
    });
    
    return normalized;
    
  } catch (error) {
    console.error('❌ 데이터 정규화 실패:', error);
    throw new Error(`데이터 정규화 중 오류 발생: ${error.message}`);
  }
}

// ================================================================================
// MODULE 4: AI 분석 엔진 (GEMINI 2.5 FLASH)
// ================================================================================

/**
 * 고도화된 AI 역량진단 평가 시스템
 * - 점수 기반 평가
 * - SWOT 분석
 * - 우선순위 매트릭스
 * - 단계별 로드맵
 */
function calculateDiagnosisScores(normalizedData) {
  console.log('📊 AI 역량진단 점수 계산 시작');
  
  const scores = {
    currentAI: 0,
    readiness: 0,
    infrastructure: 0,
    goals: 0,
    implementation: 0
  };
  
  // 1. 현재 AI 활용 현황 점수 (0-100)
  scores.currentAI = Math.round(
    (normalizedData.currentAIUsage.aiFamiliarity * 10) +
    (normalizedData.currentAIUsage.currentAiTools.length * 5) +
    (normalizedData.currentAIUsage.dataDigitalization * 10) +
    (normalizedData.currentAIUsage.systemIntegration * 10)
  );
  
  // 2. 조직 준비도 점수 (0-100)
  scores.readiness = Math.round(
    (normalizedData.aiCapabilities.changeReadiness * 15) +
    (normalizedData.aiCapabilities.leadershipSupport * 15) +
    (normalizedData.aiCapabilities.employeeAttitude * 10) +
    (normalizedData.aiCapabilities.trainingInvestment * 10)
  );
  
  // 3. 기술 인프라 점수 (0-100)
  scores.infrastructure = Math.round(
    (normalizedData.techInfrastructure.cloudAdoption * 15) +
    (normalizedData.techInfrastructure.systemScalability * 15) +
    (normalizedData.techInfrastructure.integrationCapability * 15) +
    (normalizedData.techInfrastructure.riskManagement * 5)
  );
  
  // 4. 목표 명확성 점수 (0-100)
  scores.goals = Math.round(
    (normalizedData.aiGoals.aiTransformationGoals.length * 10) +
    (normalizedData.aiGoals.successMetrics.length * 10) +
    (normalizedData.aiGoals.specificImprovements ? 30 : 0)
  );
  
  // 5. 실행 역량 점수 (0-100)
  scores.implementation = Math.round(
    (normalizedData.implementationPlan.priorityFunctions.length * 8) +
    (normalizedData.implementationPlan.supportNeeds.length * 6) +
    (normalizedData.implementationPlan.resourceAllocation ? 20 : 0)
  );
  
  // 전체 평균 점수
  const totalScore = Math.round(
    (scores.currentAI + scores.readiness + scores.infrastructure + scores.goals + scores.implementation) / 5
  );
  
  return {
    ...scores,
    total: totalScore,
    level: getMaturityLevel(totalScore)
  };
}

/**
 * 성숙도 레벨 결정
 */
function getMaturityLevel(score) {
  if (score >= 80) return 'Advanced (고도화)';
  if (score >= 60) return 'Intermediate (중급)';
  if (score >= 40) return 'Basic (기초)';
  return 'Beginner (초급)';
}

/**
 * SWOT 분석 생성
 */
function generateSWOTAnalysis(normalizedData, scores) {
  const swot = {
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: []
  };
  
  // 강점 분석
  if (scores.readiness >= 70) swot.strengths.push('강력한 조직 변화 의지와 리더십 지원');
  if (scores.infrastructure >= 70) swot.strengths.push('견고한 IT 인프라와 클라우드 기반');
  if (normalizedData.aiCapabilities.technicalPersonnel >= 4) swot.strengths.push('충분한 기술 인력 보유');
  if (normalizedData.companyInfo.employeeCount.includes('100명') || normalizedData.companyInfo.employeeCount.includes('300명')) {
    swot.strengths.push('적정 규모의 조직으로 변화 관리 용이');
  }
  
  // 약점 분석
  if (scores.currentAI < 50) swot.weaknesses.push('현재 AI 활용 수준이 낮음');
  if (scores.infrastructure < 50) swot.weaknesses.push('IT 인프라 및 시스템 통합 부족');
  if (normalizedData.aiCapabilities.dataQuality < 3) swot.weaknesses.push('데이터 품질 및 관리 체계 미흡');
  if (normalizedData.aiCapabilities.analyticsCapability < 3) swot.weaknesses.push('데이터 분석 역량 부족');
  
  // 기회 분석
  swot.opportunities.push('AI 기술 발전으로 인한 새로운 비즈니스 모델 창출');
  swot.opportunities.push('정부의 디지털 전환 지원 정책 활용');
  if (normalizedData.companyInfo.industry.includes('제조')) {
    swot.opportunities.push('스마트팩토리 구축을 통한 생산성 혁신');
  }
  if (normalizedData.companyInfo.industry.includes('서비스')) {
    swot.opportunities.push('고객 경험 개선을 통한 경쟁우위 확보');
  }
  
  // 위협 분석
  swot.threats.push('경쟁사의 빠른 디지털 전환');
  swot.threats.push('AI 기술 변화 속도에 따른 뒤처짐 위험');
  if (normalizedData.aiCapabilities.changeReadiness < 3) {
    swot.threats.push('조직 내 변화 저항으로 인한 도입 지연');
  }
  
  return swot;
}

/**
 * 우선순위 매트릭스 생성 (중요도 × 긴급성 × 실현가능성)
 */
function generatePriorityMatrix(normalizedData, scores) {
  const matrix = {
    highPriority: [],
    mediumPriority: [],
    lowPriority: []
  };
  
  // 우선순위 항목들과 점수
  const items = [
    { task: '리더십 및 조직문화 개선', importance: 5, urgency: scores.readiness < 50 ? 5 : 3, feasibility: 4 },
    { task: 'IT 인프라 현대화', importance: 4, urgency: scores.infrastructure < 50 ? 5 : 2, feasibility: 3 },
    { task: '데이터 품질 관리 체계 구축', importance: 5, urgency: 4, feasibility: 4 },
    { task: 'AI 도구 도입 및 활용', importance: 4, urgency: 3, feasibility: 5 },
    { task: '직원 AI 교육 및 훈련', importance: 5, urgency: 4, feasibility: 5 },
    { task: '프로세스 자동화 구현', importance: 4, urgency: 3, feasibility: 4 },
    { task: '고객 서비스 AI 도입', importance: 3, urgency: 2, feasibility: 4 },
    { task: '예측 분석 시스템 구축', importance: 3, urgency: 2, feasibility: 2 }
  ];
  
  // 우선순위 계산 및 분류
  items.forEach(item => {
    const priority = (item.importance * 0.4) + (item.urgency * 0.4) + (item.feasibility * 0.2);
    
    if (priority >= 4.2) {
      matrix.highPriority.push(item.task);
    } else if (priority >= 3.0) {
      matrix.mediumPriority.push(item.task);
    } else {
      matrix.lowPriority.push(item.task);
    }
  });
  
  return matrix;
}

/**
 * 단계별 로드맵 생성
 */
function generateRoadmap(normalizedData, scores, matrix) {
  const roadmap = [];
  
  // Phase 1: 기반 구축 (1-3개월)
  roadmap.push({
    phase: 1,
    title: '기반 구축 및 준비',
    period: '1-3개월',
    objectives: '조직 준비도 향상 및 기본 인프라 정비',
    tasks: [
      '경영진 AI 전략 수립 워크숍',
      '현재 시스템 및 데이터 현황 정밀 진단',
      '직원 AI 인식 개선 교육',
      '기본 클라우드 환경 구축'
    ],
    investment: normalizedData.aiCapabilities.budgetAllocation.includes('1000만원') ? '1,000-3,000만원' : '3,000-5,000만원',
    expectedOutcome: 'AI 도입을 위한 조직 및 기술적 기반 마련'
  });
  
  // Phase 2: 핵심 자동화 (3-6개월)
  roadmap.push({
    phase: 2,
    title: '핵심 업무 자동화',
    period: '3-6개월',
    objectives: '우선순위 업무 영역의 AI 도입 및 자동화',
    tasks: matrix.highPriority.slice(0, 3),
    investment: '5,000만원-1억원',
    expectedOutcome: '핵심 업무의 효율성 30% 이상 향상'
  });
  
  // Phase 3: 고도화 및 확산 (6-12개월)
  roadmap.push({
    phase: 3,
    title: '고도화 및 전사 확산',
    period: '6-12개월',
    objectives: 'AI 활용 고도화 및 전 부서 확산',
    tasks: [
      '예측 분석 시스템 구축',
      '고객 대응 AI 고도화',
      '전사 데이터 통합 플랫폼 구축',
      'AI 기반 의사결정 시스템 도입'
    ],
    investment: '1억원-3억원',
    expectedOutcome: '디지털 네이티브 조직으로 전환 완료'
  });
  
  return roadmap;
}

/**
 * GEMINI 2.5 FLASH를 사용한 45개 질문 기반 AI 분석 (고도화)
 * 폴백 응답 완전 금지, 실제 신청서 데이터 기반 분석만 수행
 */
function generateAIAnalysisReport(normalizedData) {
  const env = getEnvironmentVariables();
  
  console.log('🚀 GEMINI 2.5 FLASH AI 분석 시작 (45개 질문 기반)');
  
  // 1. 점수 계산
  const scores = calculateDiagnosisScores(normalizedData);
  console.log('📊 진단 점수:', scores);
  
  // 2. SWOT 분석
  const swot = generateSWOTAnalysis(normalizedData, scores);
  console.log('🔍 SWOT 분석:', swot);
  
  // 3. 우선순위 매트릭스
  const matrix = generatePriorityMatrix(normalizedData, scores);
  console.log('📋 우선순위 매트릭스:', matrix);
  
  // 4. 로드맵 생성
  const roadmap = generateRoadmap(normalizedData, scores, matrix);
  console.log('🗺️ 로드맵:', roadmap);
  
  // 45개 질문 기반 분석 프롬프트 생성 (고도화)
  const analysisPrompt = `
당신은 AICAMP의 AI 전문 컨설턴트 이후경입니다. 
45개 질문 기반 AI 역량진단 결과를 바탕으로 전문적이고 실용적인 분석 보고서를 작성해주세요.

## 신청 기업 정보:
- 회사명: ${normalizedData.companyInfo.companyName}
- 업종: ${normalizedData.companyInfo.industry}
- 규모: ${normalizedData.companyInfo.employeeCount} (설립: ${normalizedData.companyInfo.establishmentYear})
- 담당자: ${normalizedData.contactInfo.name} (${normalizedData.contactInfo.position})

## 진단 점수 결과:
- 전체 점수: ${scores.total}/100 (성숙도: ${scores.level})
- 현재 AI 활용: ${scores.currentAI}/100
- 조직 준비도: ${scores.readiness}/100
- 기술 인프라: ${scores.infrastructure}/100
- 목표 명확성: ${scores.goals}/100
- 실행 역량: ${scores.implementation}/100

## SWOT 분석 결과:
### 강점 (Strengths):
${swot.strengths.map(s => `- ${s}`).join('\n')}

### 약점 (Weaknesses):
${swot.weaknesses.map(w => `- ${w}`).join('\n')}

### 기회 (Opportunities):
${swot.opportunities.map(o => `- ${o}`).join('\n')}

### 위협 (Threats):
${swot.threats.map(t => `- ${t}`).join('\n')}

## 우선순위 매트릭스:
### 최우선 과제:
${matrix.highPriority.map(h => `- ${h}`).join('\n')}

### 중간 우선순위:
${matrix.mediumPriority.map(m => `- ${m}`).join('\n')}

## 단계별 로드맵:
${roadmap.map(phase => `
### Phase ${phase.phase}: ${phase.title} (${phase.period})
- 목표: ${phase.objectives}
- 투자 규모: ${phase.investment}
- 주요 과제: ${phase.tasks.join(', ')}
- 기대 효과: ${phase.expectedOutcome}
`).join('\n')}

## 45개 질문 응답 데이터:

### 1. 기업 기본정보 및 사업현황
- 사업 유형: ${normalizedData.companyInfo.businessType}
- 위치: ${normalizedData.companyInfo.location}
- 매출 규모: ${normalizedData.companyInfo.annualRevenue}

### 2. 현재 AI/디지털 활용 현황
- AI 이해도: ${normalizedData.currentAIUsage.aiFamiliarity}/5
- 현재 사용 AI 도구: ${normalizedData.currentAIUsage.currentAiTools.join(', ')}
- AI 활용 부서: ${normalizedData.currentAIUsage.aiUsageDepartments.join(', ')}
- 데이터 디지털화 수준: ${normalizedData.currentAIUsage.dataDigitalization}/5
- 시스템 통합도: ${normalizedData.currentAIUsage.systemIntegration}/5
- 현재 시스템: ${normalizedData.currentAIUsage.currentSystems.join(', ')}

### 3. AI 역량 및 준비도
- 변화 준비도: ${normalizedData.aiCapabilities.changeReadiness}/5
- 리더십 지원: ${normalizedData.aiCapabilities.leadershipSupport}/5
- 직원 태도: ${normalizedData.aiCapabilities.employeeAttitude}/5
- 변화관리 경험: ${normalizedData.aiCapabilities.changeManagementExperience}/5
- 예산 배정: ${normalizedData.aiCapabilities.budgetAllocation}
- 기술 인력: ${normalizedData.aiCapabilities.technicalPersonnel}/5
- 외부 파트너십: ${normalizedData.aiCapabilities.externalPartnership}/5
- 교육 투자: ${normalizedData.aiCapabilities.trainingInvestment}/5
- 데이터 품질: ${normalizedData.aiCapabilities.dataQuality}/5
- 분석 역량: ${normalizedData.aiCapabilities.analyticsCapability}/5
- 의사결정 방식: ${normalizedData.aiCapabilities.decisionMaking}/5

### 4. 기술 인프라 및 보안
- 클라우드 도입: ${normalizedData.techInfrastructure.cloudAdoption}/5
- 시스템 확장성: ${normalizedData.techInfrastructure.systemScalability}/5
- 통합 역량: ${normalizedData.techInfrastructure.integrationCapability}/5
- 보안 조치: ${normalizedData.techInfrastructure.securityMeasures.join(', ')}
- 컴플라이언스: ${normalizedData.techInfrastructure.complianceRequirements.join(', ')}
- 리스크 관리: ${normalizedData.techInfrastructure.riskManagement}/5

### 5. AI 도입 목표 및 기대효과
- 변혁 목표: ${normalizedData.aiGoals.aiTransformationGoals.join(', ')}
- 구체적 개선사항: ${normalizedData.aiGoals.specificImprovements}
- 기대 ROI: ${normalizedData.aiGoals.expectedROI}
- 성공 지표: ${normalizedData.aiGoals.successMetrics.join(', ')}
- 추진 기간: ${normalizedData.aiGoals.timeframe}

### 6. 실행 계획 및 우선순위
- 우선순위 기능: ${normalizedData.implementationPlan.priorityFunctions.join(', ')}
- 구현 접근법: ${normalizedData.implementationPlan.implementationApproach}
- 예상 도전과제: ${normalizedData.implementationPlan.challengesAnticipated.join(', ')}
- 필요 지원: ${normalizedData.implementationPlan.supportNeeds.join(', ')}

## 요구사항:
1. **폴백 응답 절대 금지** - 반드시 실제 응답 데이터와 계산된 점수를 기반으로 분석
2. 이후경 교장의 전문적이고 실용적인 톤앤매너 적용
3. 구체적인 점수와 데이터 기반 객관적 분석
4. 실행 가능한 구체적 권고사항 제시
5. AICAMP의 N8N 기반 자동화 솔루션과 교육 프로그램 자연스럽게 연계

다음 구조로 보고서를 작성해주세요:

# 🎯 AI 역량진단 종합 분석 보고서

## 📊 진단 결과 요약
- 전체 점수: ${scores.total}/100점 (${scores.level})
- 핵심 강점과 개선 포인트를 점수 기반으로 명확히 제시

## 🔍 상세 분석

### 1. 5개 영역별 현재 상태 분석
[각 영역별 점수와 구체적 분석]

### 2. SWOT 분석 기반 전략 방향
[계산된 SWOT 결과를 바탕으로 한 전략적 시사점]

### 3. 우선순위 매트릭스 기반 실행 계획
[중요도×긴급성×실현가능성 매트릭스 결과 반영]

## 🚀 맞춤형 AI 전략 로드맵

### Phase 1: ${roadmap[0].title} (${roadmap[0].period})
[구체적 실행 계획과 투자 규모]

### Phase 2: ${roadmap[1].title} (${roadmap[1].period})
[N8N 기반 워크플로우 자동화 포함]

### Phase 3: ${roadmap[2].title} (${roadmap[2].period})
[전사 확산 및 고도화 전략]

## 💡 AICAMP 맞춤 솔루션 제안
[기업 점수와 특성에 맞는 구체적 프로그램 추천]

## 📈 기대효과 및 ROI 예측
[점수 기반 정량적 효과 예측과 투자 대비 수익률]

---
*본 보고서는 45개 질문 응답과 과학적 평가 알고리즘을 바탕으로 GEMINI 2.5 FLASH AI가 분석한 결과입니다.*
*AICAMP 전문 컨설턴트와의 상담을 통해 더욱 구체적인 실행 계획을 수립하실 수 있습니다.*
- 업종: ${normalizedData.companyInfo.industry}
- 규모: ${normalizedData.companyInfo.employeeCount} (설립: ${normalizedData.companyInfo.establishmentYear})
- 연락처: ${normalizedData.contactInfo.name} (${normalizedData.contactInfo.position})

## 45개 질문 응답 데이터:

### 1. 기업 기본정보 및 사업현황
- 사업 유형: ${normalizedData.companyInfo.businessType}
- 위치: ${normalizedData.companyInfo.location}
- 매출 규모: ${normalizedData.companyInfo.annualRevenue}

### 2. 현재 AI/디지털 활용 현황
- AI 이해도: ${normalizedData.currentAIUsage.aiFamiliarity}/5
- 현재 사용 AI 도구: ${normalizedData.currentAIUsage.currentAiTools.join(', ')}
- AI 활용 부서: ${normalizedData.currentAIUsage.aiUsageDepartments.join(', ')}
- 데이터 디지털화 수준: ${normalizedData.currentAIUsage.dataDigitalization}/5
- 시스템 통합도: ${normalizedData.currentAIUsage.systemIntegration}/5
- 현재 시스템: ${normalizedData.currentAIUsage.currentSystems.join(', ')}

### 3. AI 역량 및 준비도
- 변화 준비도: ${normalizedData.aiCapabilities.changeReadiness}/5
- 리더십 지원: ${normalizedData.aiCapabilities.leadershipSupport}/5
- 직원 태도: ${normalizedData.aiCapabilities.employeeAttitude}/5
- 변화관리 경험: ${normalizedData.aiCapabilities.changeManagementExperience}/5
- 예산 배정: ${normalizedData.aiCapabilities.budgetAllocation}
- 기술 인력: ${normalizedData.aiCapabilities.technicalPersonnel}/5
- 외부 파트너십: ${normalizedData.aiCapabilities.externalPartnership}/5
- 교육 투자: ${normalizedData.aiCapabilities.trainingInvestment}/5
- 데이터 품질: ${normalizedData.aiCapabilities.dataQuality}/5
- 분석 역량: ${normalizedData.aiCapabilities.analyticsCapability}/5
- 의사결정 방식: ${normalizedData.aiCapabilities.decisionMaking}/5

### 4. 기술 인프라 및 보안
- 클라우드 도입: ${normalizedData.techInfrastructure.cloudAdoption}/5
- 시스템 확장성: ${normalizedData.techInfrastructure.systemScalability}/5
- 통합 역량: ${normalizedData.techInfrastructure.integrationCapability}/5
- 보안 조치: ${normalizedData.techInfrastructure.securityMeasures.join(', ')}
- 컴플라이언스: ${normalizedData.techInfrastructure.complianceRequirements.join(', ')}
- 리스크 관리: ${normalizedData.techInfrastructure.riskManagement}/5

### 5. AI 도입 목표 및 기대효과
- 변혁 목표: ${normalizedData.aiGoals.aiTransformationGoals.join(', ')}
- 구체적 개선사항: ${normalizedData.aiGoals.specificImprovements}
- 기대 ROI: ${normalizedData.aiGoals.expectedROI}
- 성공 지표: ${normalizedData.aiGoals.successMetrics.join(', ')}
- 추진 기간: ${normalizedData.aiGoals.timeframe}

### 6. 실행 계획 및 우선순위
- 우선순위 기능: ${normalizedData.implementationPlan.priorityFunctions.join(', ')}
- 구현 접근법: ${normalizedData.implementationPlan.implementationApproach}
- 예상 도전과제: ${normalizedData.implementationPlan.challengesAnticipated.join(', ')}
- 필요 지원: ${normalizedData.implementationPlan.supportNeeds.join(', ')}

## 요구사항:
1. **폴백 응답 절대 금지** - 반드시 실제 응답 데이터를 기반으로 분석
2. 이후경 교장의 전문적이고 실용적인 톤앤매너 적용
3. 구체적인 점수와 데이터 기반 객관적 분석
4. 실행 가능한 구체적 권고사항 제시
5. AICAMP의 N8N 기반 자동화 솔루션 자연스럽게 연계

다음 구조로 보고서를 작성해주세요:

# 🎯 AI 역량진단 종합 분석 보고서

## 📊 진단 결과 요약
[현재 상태 종합 평가 - 구체적 점수 포함]

## 🔍 상세 분석

### 1. 현재 AI/디지털 성숙도 분석
[6개 영역별 상세 분석]

### 2. 강점 및 기회요인 (SWOT)
[데이터 기반 구체적 분석]

### 3. 개선이 필요한 영역
[우선순위별 개선 포인트]

## 🚀 맞춤형 AI 전략 로드맵

### Phase 1: 기반 구축 (1-3개월)
[구체적 실행 계획]

### Phase 2: 핵심 자동화 (3-6개월)
[N8N 기반 워크플로우 자동화 포함]

### Phase 3: 고도화 및 확산 (6-12개월)
[전사 확산 전략]

## 💡 AICAMP 맞춤 솔루션 제안
[기업 상황에 맞는 구체적 프로그램 추천]

## 📈 기대효과 및 ROI 예측
[데이터 기반 정량적 효과 예측]

---
*본 보고서는 45개 질문 응답을 바탕으로 GEMINI 2.5 FLASH AI가 분석한 결과입니다.*
*AICAMP 전문 컨설턴트와의 상담을 통해 더욱 구체적인 실행 계획을 수립하실 수 있습니다.*
`;

  try {
    // GEMINI API 호출
    const response = callGeminiAPI(analysisPrompt, {
      maxRetries: env.MAX_RETRIES,
      timeout: env.TIMEOUT_GEMINI
    });
    
    if (!response || response.trim().length < 100) {
      throw new Error('AI 분석 응답이 너무 짧거나 비어있습니다');
    }
    
    console.log('✅ GEMINI 2.5 FLASH 분석 완료');
    return response;
    
  } catch (error) {
    console.error('❌ AI 분석 실패:', error);
    
    // 폴백 응답 완전 금지 - 오류 발생 시 예외 처리
    if (env.FALLBACK_DISABLED) {
      throw new Error(`AI 분석 실패: ${error.message}. 폴백 응답이 비활성화되어 있습니다.`);
    }
    
    // 이 부분은 실행되지 않음 (FALLBACK_DISABLED = true)
    return null;
  }
}

/**
 * GEMINI API 호출 (재시도 로직 포함)
 */
function callGeminiAPI(prompt, options = {}) {
  const env = getEnvironmentVariables();
  const maxRetries = options.maxRetries || env.MAX_RETRIES;
  const timeout = options.timeout || env.TIMEOUT_GEMINI;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🤖 GEMINI API 호출 시도 ${attempt}/${maxRetries}`);
      
      const payload = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          maxOutputTokens: env.MAX_OUTPUT_TOKENS,
          temperature: env.TEMPERATURE,
          topP: 0.8,
          topK: 40
        }
      };
      
      const response = UrlFetchApp.fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${env.AI_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          payload: JSON.stringify(payload),
          muteHttpExceptions: true
        }
      );
      
      const responseText = response.getContentText();
      const responseData = JSON.parse(responseText);
      
      if (response.getResponseCode() !== 200) {
        throw new Error(`API 오류 (${response.getResponseCode()}): ${responseText}`);
      }
      
      if (!responseData.candidates || !responseData.candidates[0] || !responseData.candidates[0].content) {
        throw new Error('API 응답 형식이 올바르지 않습니다');
      }
      
      const generatedText = responseData.candidates[0].content.parts[0].text;
      
      if (!generatedText || generatedText.trim().length < 50) {
        throw new Error('생성된 텍스트가 너무 짧습니다');
      }
      
      console.log(`✅ GEMINI API 호출 성공 (시도 ${attempt})`);
      return generatedText;
      
    } catch (error) {
      console.error(`❌ GEMINI API 호출 실패 (시도 ${attempt}):`, error);
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // 지수 백오프
      const delay = env.RETRY_DELAY * Math.pow(2, attempt - 1);
      console.log(`⏳ ${delay}ms 후 재시도...`);
      Utilities.sleep(delay);
    }
  }
}

// ================================================================================
// MODULE 5: 이메일 발송 시스템
// ================================================================================

/**
 * 신청자에게 진단 결과 이메일 발송
 */
function sendResultEmail(normalizedData, analysisReport) {
  const env = getEnvironmentVariables();
  
  try {
    console.log('📧 진단 결과 이메일 발송 시작');
    
    const subject = `[AICAMP] ${normalizedData.companyInfo.companyName} AI 역량진단 결과 보고서`;
    
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Malgun Gothic', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .report-section { background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #667eea; }
        .highlight { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .footer { text-align: center; margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 5px; }
        .btn { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
        .company-info { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 AI 역량진단 결과 보고서</h1>
            <p>AICAMP 전문 AI 컨설턴트 분석 결과</p>
        </div>
        
        <div class="content">
            <div class="company-info">
                <h3>📋 진단 대상 기업 정보</h3>
                <p><strong>회사명:</strong> ${normalizedData.companyInfo.companyName}</p>
                <p><strong>업종:</strong> ${normalizedData.companyInfo.industry}</p>
                <p><strong>규모:</strong> ${normalizedData.companyInfo.employeeCount}</p>
                <p><strong>담당자:</strong> ${normalizedData.contactInfo.name} ${normalizedData.contactInfo.position}</p>
                <p><strong>진단일:</strong> ${new Date().toLocaleDateString('ko-KR')}</p>
            </div>
            
            <div class="highlight">
                <h3>🚀 45개 질문 기반 종합 분석 완료!</h3>
                <p>귀하의 기업에 특화된 AI 전략 로드맵이 준비되었습니다.</p>
            </div>
            
            <div class="report-section">
                <h3>📊 AI 분석 보고서</h3>
                <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.8;">
${analysisReport}
                </div>
            </div>
            
            <div class="highlight">
                <h3>💡 다음 단계 안내</h3>
                <p>1. <strong>무료 전략 상담:</strong> 30분 화상 상담으로 구체적 실행 계획 수립</p>
                <p>2. <strong>맞춤형 교육:</strong> 임직원 대상 AI 역량 강화 프로그램</p>
                <p>3. <strong>실행 지원:</strong> N8N 기반 워크플로우 자동화 구현</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://${env.AICAMP_WEBSITE}/consultation" class="btn">🗓️ 무료 상담 신청</a>
                <a href="https://${env.AICAMP_WEBSITE}/services" class="btn">📚 교육 프로그램 보기</a>
            </div>
            
            <div class="footer">
                <h4>🎓 AICAMP - AI 전문 교육 및 컨설팅</h4>
                <p>📞 문의: ${env.ADMIN_EMAIL} | 🌐 웹사이트: ${env.AICAMP_WEBSITE}</p>
                <p style="font-size: 12px; color: #666;">
                    본 보고서는 GEMINI 2.5 FLASH AI 분석 엔진을 통해 생성되었습니다.<br>
                    더 자세한 분석과 맞춤형 솔루션은 전문 컨설턴트와의 상담을 통해 제공됩니다.
                </p>
            </div>
        </div>
    </div>
</body>
</html>`;
    
    // 이메일 발송
    MailApp.sendEmail({
      to: normalizedData.contactInfo.email,
      subject: subject,
      htmlBody: htmlBody
    });
    
    console.log('✅ 신청자 이메일 발송 완료:', normalizedData.contactInfo.email);
    
  } catch (error) {
    console.error('❌ 신청자 이메일 발송 실패:', error);
    throw error;
  }
}

/**
 * 관리자에게 알림 이메일 발송
 */
function sendAdminNotification(normalizedData, analysisReport) {
  const env = getEnvironmentVariables();
  
  try {
    console.log('📧 관리자 알림 이메일 발송 시작');
    
    const subject = `[AICAMP 진단] ${normalizedData.companyInfo.companyName} - 새로운 AI 역량진단 완료`;
    
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Malgun Gothic', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .info-box { background: #f8f9fa; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #dc3545; }
        .data-section { background: #e9ecef; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .urgent { background: #fff3cd; padding: 15px; border: 2px solid #ffc107; border-radius: 5px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚨 새로운 AI 역량진단 완료</h1>
            <p>관리자 알림 - 즉시 확인 필요</p>
        </div>
        
        <div class="content">
            <div class="urgent">
                <h3>⚡ 신규 진단 접수 알림</h3>
                <p><strong>접수 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
                <p><strong>진단 ID:</strong> ${normalizedData.submissionId}</p>
            </div>
            
            <div class="info-box">
                <h3>🏢 기업 정보</h3>
                <p><strong>회사명:</strong> ${normalizedData.companyInfo.companyName}</p>
                <p><strong>업종:</strong> ${normalizedData.companyInfo.industry}</p>
                <p><strong>규모:</strong> ${normalizedData.companyInfo.employeeCount}</p>
                <p><strong>매출:</strong> ${normalizedData.companyInfo.annualRevenue}</p>
                <p><strong>설립:</strong> ${normalizedData.companyInfo.establishmentYear}</p>
                <p><strong>위치:</strong> ${normalizedData.companyInfo.location}</p>
            </div>
            
            <div class="info-box">
                <h3>👤 담당자 정보</h3>
                <p><strong>이름:</strong> ${normalizedData.contactInfo.name}</p>
                <p><strong>직책:</strong> ${normalizedData.contactInfo.position}</p>
                <p><strong>이메일:</strong> ${normalizedData.contactInfo.email}</p>
                <p><strong>전화:</strong> ${normalizedData.contactInfo.phone}</p>
            </div>
            
            <div class="data-section">
                <h3>📊 진단 데이터 요약</h3>
                <p><strong>AI 이해도:</strong> ${normalizedData.currentAIUsage.aiFamiliarity}/5</p>
                <p><strong>변화 준비도:</strong> ${normalizedData.aiCapabilities.changeReadiness}/5</p>
                <p><strong>리더십 지원:</strong> ${normalizedData.aiCapabilities.leadershipSupport}/5</p>
                <p><strong>클라우드 도입:</strong> ${normalizedData.techInfrastructure.cloudAdoption}/5</p>
                <p><strong>주요 목표:</strong> ${normalizedData.aiGoals.aiTransformationGoals.slice(0, 3).join(', ')}</p>
            </div>
            
            <div class="info-box">
                <h3>🎯 즉시 조치 필요 사항</h3>
                <p>1. 24시간 내 담당자에게 개별 연락</p>
                <p>2. 맞춤형 상담 일정 조율</p>
                <p>3. 적합한 교육 프로그램 매칭</p>
                <p>4. CRM 시스템에 리드 등록</p>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 5px;">
                <p style="text-align: center; margin: 0;">
                    <strong>스프레드시트에서 상세 데이터 확인:</strong><br>
                    <a href="https://docs.google.com/spreadsheets/d/${env.SPREADSHEET_ID}" 
                       style="color: #dc3545; text-decoration: none; font-weight: bold;">
                       📊 진단 데이터 스프레드시트 열기
                    </a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>`;
    
    // 관리자 이메일 발송
    MailApp.sendEmail({
      to: env.ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });
    
    console.log('✅ 관리자 알림 이메일 발송 완료:', env.ADMIN_EMAIL);
    
  } catch (error) {
    console.error('❌ 관리자 이메일 발송 실패:', error);
    throw error;
  }
}

// ================================================================================
// MODULE 6: 구글 시트 데이터 저장
// ================================================================================

/**
 * 45개 질문 데이터를 구글 시트에 저장 (점수, SWOT, 로드맵 포함)
 */
function saveToGoogleSheets(normalizedData, analysisReport, htmlReport, scores, swot, roadmap) {
  const env = getEnvironmentVariables();
  
  try {
    console.log('💾 구글 시트 데이터 저장 시작 (고도화)');
    
    const spreadsheet = SpreadsheetApp.openById(env.SPREADSHEET_ID);
    
    // 1. 메인 진단 데이터 시트 (점수 포함)
    saveMainDiagnosisData(spreadsheet, normalizedData, scores);
    
    // 2. 상세 분석 데이터 시트  
    saveDetailedAnalysisData(spreadsheet, normalizedData);
    
    // 3. AI 분석 보고서 시트
    saveAnalysisReport(spreadsheet, normalizedData, analysisReport);
    
    // 4. HTML 보고서 시트
    saveHTMLReport(spreadsheet, normalizedData, htmlReport);
    
    // 5. 점수 분석 시트 (새로 추가)
    saveScoreAnalysis(spreadsheet, normalizedData, scores, swot, roadmap);
    
    console.log('✅ 구글 시트 저장 완료 (점수/SWOT/로드맵 포함)');
    
  } catch (error) {
    console.error('❌ 구글 시트 저장 실패:', error);
    throw error;
  }
}

/**
 * 메인 진단 데이터 저장
 */
function saveMainDiagnosisData(spreadsheet, data) {
  let sheet = spreadsheet.getSheetByName('AI역량진단_45문항');
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet('AI역량진단_45문항');
    
    // 헤더 생성
    const headers = [
      '제출일시', '진단ID', '회사명', '사업자번호', '설립연도', '업종', '사업유형', '위치',
      '직원수', '매출규모', '담당자명', '직책', '이메일', '전화번호',
      'AI이해도', '현재AI도구', 'AI활용부서', '데이터디지털화', '시스템통합도', '현재시스템',
      '변화준비도', '리더십지원', '직원태도', '변화관리경험', '예산배정', '기술인력', '외부파트너십',
      '교육투자', '데이터품질', '분석역량', '의사결정', '클라우드도입', '시스템확장성', '통합역량',
      '보안조치', '컴플라이언스', '리스크관리', 'AI변혁목표', '구체적개선사항', '기대ROI',
      '성공지표', '추진기간', '우선순위기능', '구현접근법', '예상도전과제', '필요지원'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#4285f4').setFontColor('white');
  }
  
  // 데이터 행 추가
  const rowData = [
    data.timestamp,
    data.submissionId,
    data.companyInfo.companyName,
    data.companyInfo.businessRegistration,
    data.companyInfo.establishmentYear,
    data.companyInfo.industry,
    data.companyInfo.businessType,
    data.companyInfo.location,
    data.companyInfo.employeeCount,
    data.companyInfo.annualRevenue,
    data.contactInfo.name,
    data.contactInfo.position,
    data.contactInfo.email,
    data.contactInfo.phone,
    data.currentAIUsage.aiFamiliarity,
    data.currentAIUsage.currentAiTools.join(', '),
    data.currentAIUsage.aiUsageDepartments.join(', '),
    data.currentAIUsage.dataDigitalization,
    data.currentAIUsage.systemIntegration,
    data.currentAIUsage.currentSystems.join(', '),
    data.aiCapabilities.changeReadiness,
    data.aiCapabilities.leadershipSupport,
    data.aiCapabilities.employeeAttitude,
    data.aiCapabilities.changeManagementExperience,
    data.aiCapabilities.budgetAllocation,
    data.aiCapabilities.technicalPersonnel,
    data.aiCapabilities.externalPartnership,
    data.aiCapabilities.trainingInvestment,
    data.aiCapabilities.dataQuality,
    data.aiCapabilities.analyticsCapability,
    data.aiCapabilities.decisionMaking,
    data.techInfrastructure.cloudAdoption,
    data.techInfrastructure.systemScalability,
    data.techInfrastructure.integrationCapability,
    data.techInfrastructure.securityMeasures.join(', '),
    data.techInfrastructure.complianceRequirements.join(', '),
    data.techInfrastructure.riskManagement,
    data.aiGoals.aiTransformationGoals.join(', '),
    data.aiGoals.specificImprovements,
    data.aiGoals.expectedROI,
    data.aiGoals.successMetrics.join(', '),
    data.aiGoals.timeframe,
    data.implementationPlan.priorityFunctions.join(', '),
    data.implementationPlan.implementationApproach,
    data.implementationPlan.challengesAnticipated.join(', '),
    data.implementationPlan.supportNeeds.join(', ')
  ];
  
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);
}

/**
 * 상세 분석 데이터 저장
 */
function saveDetailedAnalysisData(spreadsheet, data) {
  let sheet = spreadsheet.getSheetByName('상세분석_45문항');
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet('상세분석_45문항');
    
    // 헤더 생성
    const headers = [
      '제출일시', '진단ID', '회사명', '분석영역', '세부항목', '점수/응답', '분석내용'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#34a853').setFontColor('white');
  }
  
  const detailRows = [];
  
  // 각 섹션별 상세 데이터 생성
  const sections = [
    { name: '현재AI활용현황', data: data.currentAIUsage },
    { name: 'AI역량준비도', data: data.aiCapabilities },
    { name: '기술인프라', data: data.techInfrastructure },
    { name: 'AI도입목표', data: data.aiGoals },
    { name: '실행계획', data: data.implementationPlan }
  ];
  
  sections.forEach(section => {
    Object.entries(section.data).forEach(([key, value]) => {
      detailRows.push([
        data.timestamp,
        data.submissionId,
        data.companyInfo.companyName,
        section.name,
        key,
        Array.isArray(value) ? value.join(', ') : value,
        `${key}: ${Array.isArray(value) ? value.join(', ') : value}`
      ]);
    });
  });
  
  if (detailRows.length > 0) {
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, detailRows.length, 7).setValues(detailRows);
  }
}

/**
 * AI 분석 보고서 저장
 */
function saveAnalysisReport(spreadsheet, data, report) {
  let sheet = spreadsheet.getSheetByName('AI분석보고서');
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet('AI분석보고서');
    
    // 헤더 생성
    const headers = [
      '제출일시', '진단ID', '회사명', '담당자', '이메일', 'AI분석보고서', '보고서길이', '생성모델'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#ff6d01').setFontColor('white');
  }
  
  // 보고서 데이터 추가
  const reportData = [
    data.timestamp,
    data.submissionId,
    data.companyInfo.companyName,
    data.contactInfo.name,
    data.contactInfo.email,
    report,
    report.length,
    'GEMINI-2.5-FLASH'
  ];
  
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow + 1, 1, 1, reportData.length).setValues([reportData]);
}

/**
 * HTML 보고서 저장
 */
function saveHTMLReport(spreadsheet, data, htmlReport) {
  let sheet = spreadsheet.getSheetByName('HTML보고서');
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet('HTML보고서');
    
    // 헤더 생성
    const headers = [
      '제출일시', '진단ID', '회사명', '담당자', '이메일', 'HTML보고서', 'HTML크기', '생성버전', '배너형식'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#9c27b0').setFontColor('white');
    
    // 열 너비 조정
    sheet.setColumnWidth(6, 300); // HTML보고서 열 너비 확장
  }
  
  // HTML 보고서 데이터 추가
  const htmlData = [
    data.timestamp,
    data.submissionId,
    data.companyInfo.companyName,
    data.contactInfo.name,
    data.contactInfo.email,
    htmlReport,
    htmlReport.length,
    'V11.0-ENHANCED-45Q',
    '배너광고형식'
  ];
  
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow + 1, 1, 1, htmlData.length).setValues([htmlData]);
  
  console.log('✅ HTML 보고서 구글 시트 저장 완료');
}

/**
 * 점수 분석 데이터 저장 (새로 추가)
 */
function saveScoreAnalysis(spreadsheet, data, scores, swot, roadmap) {
  let sheet = spreadsheet.getSheetByName('점수분석_SWOT_로드맵');
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet('점수분석_SWOT_로드맵');
    
    // 헤더 생성
    const headers = [
      '제출일시', '진단ID', '회사명', '담당자', '이메일',
      '전체점수', '성숙도레벨', '현재AI활용점수', '조직준비도점수', '기술인프라점수', '목표명확성점수', '실행역량점수',
      '강점목록', '약점목록', '기회목록', '위협목록',
      '최우선과제', '중간우선순위', '낮은우선순위',
      'Phase1제목', 'Phase1기간', 'Phase1목표', 'Phase1투자', 'Phase1과제',
      'Phase2제목', 'Phase2기간', 'Phase2목표', 'Phase2투자', 'Phase2과제',
      'Phase3제목', 'Phase3기간', 'Phase3목표', 'Phase3투자', 'Phase3과제'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#8b5cf6').setFontColor('white');
  }
  
  // 데이터 행 추가
  const rowData = [
    data.timestamp,
    data.submissionId,
    data.companyInfo.companyName,
    data.contactInfo.name,
    data.contactInfo.email,
    scores.total,
    scores.level,
    scores.currentAI,
    scores.readiness,
    scores.infrastructure,
    scores.goals,
    scores.implementation,
    swot.strengths.join('; '),
    swot.weaknesses.join('; '),
    swot.opportunities.join('; '),
    swot.threats.join('; '),
    matrix.highPriority.join('; '),
    matrix.mediumPriority.join('; '),
    matrix.lowPriority.join('; '),
    roadmap[0].title,
    roadmap[0].period,
    roadmap[0].objectives,
    roadmap[0].investment,
    roadmap[0].tasks.join(', '),
    roadmap[1].title,
    roadmap[1].period,
    roadmap[1].objectives,
    roadmap[1].investment,
    roadmap[1].tasks.join(', '),
    roadmap[2].title,
    roadmap[2].period,
    roadmap[2].objectives,
    roadmap[2].investment,
    roadmap[2].tasks.join(', ')
  ];
  
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);
  
  console.log('✅ 점수 분석 데이터 구글 시트 저장 완료');
}

// ================================================================================
// MODULE 7: API 엔드포인트 (doPost, doGet)
// ================================================================================

/**
 * POST 요청 처리 (통합 액션 처리)
 */
function doPost(e) {
  const env = getEnvironmentVariables();
  
  console.log('='.repeat(80));
  console.log('📥 POST 요청 수신 - V11.0 ENHANCED (45개 질문)');
  console.log('요청 시간:', getCurrentKoreanTime());
  
  try {
    if (!e || !e.postData) {
      throw new Error('POST 데이터가 없습니다');
    }
    
    // JSON 데이터 파싱
    const requestData = JSON.parse(e.postData.contents);
    
    if (!requestData) {
      throw new Error('유효하지 않은 JSON 데이터');
    }
    
    // 액션별 처리
    const action = requestData.action || 'diagnosis';
    console.log('액션:', action);
    
    let result;
    
    switch (action) {
      case 'diagnosis':
      case 'ai_diagnosis':
      case 'submitDiagnosis':
        result = handleAIDiagnosisSubmission(requestData);
        break;
        
      case 'consultation':
      case 'submitConsultation':
        result = handleConsultationRequest(requestData);
        break;
        
      case 'error_report':
      case 'feedback':
      case 'tax_calculator_error':
        result = handleErrorReport(requestData);
        break;
        
      case 'health':
      case 'status':
        result = {
          success: true,
          status: 'operational',
          version: 'V11.0-ENHANCED-45Q',
          message: 'AICAMP 45개 질문 기반 AI 역량진단 시스템',
          model: 'GEMINI-2.5-FLASH',
          features: [
            '45개 질문 6개 섹션 완전 지원',
            'GEMINI 2.5 FLASH AI 분석',
            '폴백 응답 완전 금지',
            '통합 보고서 시스템',
            '실시간 이메일 발송',
            '구글 시트 자동 저장',
            '이후경 교장 톤앤매너',
            'N8N 워크플로우 연계',
            'HTML 보고서 자동 생성'
          ],
          questionsSupported: 45,
          sectionsSupported: 6
        };
        break;
        
      default:
        console.warn('알 수 없는 액션:', action);
        result = {
          success: false,
          error: `Unknown action: ${action}`,
          supportedActions: ['diagnosis', 'consultation', 'error_report', 'health']
        };
    }
    
    console.log('응답 상태:', result.success ? '성공' : '실패');
    console.log('='.repeat(80));
    
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ POST 요청 처리 실패:', error);
    console.error('Stack:', error.stack);
    
    const errorResponse = {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      version: 'V11.0-ENHANCED-45Q'
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * AI 역량진단 제출 처리 (45개 질문)
 */
function handleAIDiagnosisSubmission(requestData) {
  try {
    console.log('🎯 AI 역량진단 처리 시작 (45개 질문)');
    
    // 1. 데이터 정규화
    const normalizedData = normalizeFormData(requestData);
    
    // 2. 점수 계산 및 분석 데이터 생성
    const scores = calculateDiagnosisScores(normalizedData);
    const swot = generateSWOTAnalysis(normalizedData, scores);
    const matrix = generatePriorityMatrix(normalizedData, scores);
    const roadmap = generateRoadmap(normalizedData, scores, matrix);
    
    console.log('📊 분석 데이터 생성 완료:', { scores, swot, matrix, roadmap });
    
    // 3. AI 분석 수행 (고도화된 프롬프트 사용)
    const analysisReport = generateAIAnalysisReport(normalizedData);
    
    // 4. HTML 보고서 생성 (점수/SWOT/로드맵 포함)
    const htmlReport = generateHTMLReport(normalizedData, analysisReport, scores, swot, roadmap);
    
    // 5. 데이터 저장 (점수 데이터 포함)
    saveToGoogleSheets(normalizedData, analysisReport, htmlReport, scores, swot, roadmap);
    
    // 6. 이메일 발송
    sendResultEmail(normalizedData, analysisReport, htmlReport);
    sendAdminNotification(normalizedData, analysisReport, scores);
    
    console.log('✅ AI 역량진단 처리 완료:', normalizedData.submissionId);
    
    return {
      success: true,
      message: '45개 질문 기반 AI 역량진단이 성공적으로 완료되었습니다',
      submissionId: normalizedData.submissionId,
      timestamp: normalizedData.timestamp,
      version: 'V11.0-ENHANCED-45Q',
      model: 'GEMINI-2.5-FLASH',
      htmlReportGenerated: true
    };
    
  } catch (error) {
    console.error('❌ AI 역량진단 처리 실패:', error);
    
    // 오류 알림
    notifyError(error, requestData);
    
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      version: 'V11.0-ENHANCED-45Q'
    };
  }
}

/**
 * GET 요청 처리 (헬스체크)
 */
function doGet(e) {
  const env = getEnvironmentVariables();
  
  try {
    const response = {
      status: 'healthy',
      version: 'V11.0-ENHANCED-45Q',
      model: 'GEMINI-2.5-FLASH',
      timestamp: new Date().toISOString(),
      environment: env.ENVIRONMENT,
      features: {
        questionsSupported: 45,
        sectionsSupported: 6,
        fallbackDisabled: env.FALLBACK_DISABLED,
        unifiedReports: env.REPORT_UNIFIED,
        aiModel: env.AI_MODEL
      },
      endpoints: {
        diagnosis: 'POST /',
        health: 'GET /',
        consultation: 'POST /?action=consultation',
        errorReport: 'POST /?action=error-report'
      }
    };
    
    console.log('🏥 헬스체크 응답:', response.status);
    
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 헬스체크 실패:', error);
    
    const errorResponse = {
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
      version: 'V11.0-ENHANCED-45Q'
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ================================================================================
// 시스템 정보 및 버전
// ================================================================================

/**
 * 시스템 정보 반환
 */
function getSystemInfo() {
  return {
    name: 'AICAMP AI 역량진단 시스템',
    version: 'V11.0-ENHANCED-45Q',
    description: '45개 질문 기반 AI 역량진단 및 전략 수립 시스템',
    model: 'GEMINI-2.5-FLASH',
    features: [
      '45개 질문 6개 섹션 완전 지원',
      'GEMINI 2.5 FLASH AI 분석',
      '폴백 응답 완전 금지',
      '통합 보고서 시스템',
      '실시간 이메일 발송',
      '구글 시트 자동 저장',
      '이후경 교장 톤앤매너',
      'N8N 워크플로우 연계'
    ],
    lastUpdated: '2024-12-19',
    compatibility: 'Frontend V11.0+'
  };
}

// ================================================================================
// MODULE 8: 상담신청 및 오류신고 처리
// ================================================================================

/**
 * 상담신청 처리 (완전 구현)
 */
function handleConsultationRequest(data) {
  console.log('📞 상담신청 처리 시작');
  
  try {
    const id = generateSubmissionId('CONSULT');
    
    // 상담신청 데이터 정규화
    const consultationData = {
      id: id,
      timestamp: new Date().toISOString(),
      companyName: data.companyName || data.company || '',
      contactName: data.contactName || data.name || '',
      email: data.email || data.contactEmail || '',
      phone: data.phone || data.contactPhone || '',
      position: data.position || data.contactPosition || '',
      content: data.content || data.consultationContent || data.inquiryContent || '',
      consultationType: data.consultationType || '일반상담',
      consultationArea: data.consultationArea || data.consultingArea || '',
      preferredTime: data.preferredTime || data.desiredTime || '',
      urgency: data.urgency || '보통',
      
      // 추가 정보
      employeeCount: data.employeeCount || '',
      annualRevenue: data.annualRevenue || '',
      businessHistory: data.businessHistory || '',
      currentIssues: data.currentIssues || '',
      expectedDuration: data.expectedDuration || '',
      budget: data.budget || '',
      howDidYouHear: data.howDidYouHear || '',
      privacyConsent: data.privacyConsent ? 'Y' : 'N',
      marketingConsent: data.marketingConsent ? 'Y' : 'N'
    };
    
    // 구글시트 저장
    saveConsultationData(consultationData);
    
    // 이메일 발송
    sendConsultationEmails(consultationData, id);
    
    console.log('✅ 상담신청 처리 완료:', id);
    
    return {
      success: true,
      consultationId: id,
      message: '상담신청이 성공적으로 접수되었습니다. 24시간 내 연락드리겠습니다.',
      timestamp: new Date().toISOString(),
      version: 'V11.0-ENHANCED-45Q'
    };
    
  } catch (error) {
    console.error('❌ 상담신청 처리 실패:', error);
    
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      version: 'V11.0-ENHANCED-45Q'
    };
  }
}

/**
 * 오류신고 처리 (완전 구현)
 */
function handleErrorReport(data) {
  console.log('🚨 오류신고 처리 시작');
  
  try {
    const id = generateSubmissionId('ERROR');
    
    // 오류신고 데이터 정규화
    const errorData = {
      id: id,
      timestamp: new Date().toISOString(),
      reporterName: data.reporterName || data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      errorType: data.errorType || data.calculatorType || '세금계산기',
      errorCategory: data.errorCategory || '계산오류',
      errorDescription: data.errorDescription || data.description || '',
      stepsToReproduce: data.stepsToReproduce || '',
      expectedResult: data.expectedResult || data.expectedBehavior || '',
      actualResult: data.actualResult || data.actualBehavior || '',
      browserInfo: data.browserInfo || '',
      deviceInfo: data.deviceInfo || '',
      screenshot: data.screenshot || '',
      additionalInfo: data.additionalInfo || '',
      urgency: data.urgency || '보통',
      reportType: data.reportType || 'tax_calculator_error',
      status: '신규'
    };
    
    // 구글시트 저장
    saveErrorReportData(errorData);
    
    // 이메일 발송
    sendErrorReportEmails(errorData, id);
    
    console.log('✅ 오류신고 처리 완료:', id);
    
    return {
      success: true,
      errorReportId: id,
      message: '오류신고가 성공적으로 접수되었습니다. 빠른 시일 내 확인 후 수정하겠습니다.',
      timestamp: new Date().toISOString(),
      version: 'V11.0-ENHANCED-45Q'
    };
    
  } catch (error) {
    console.error('❌ 오류신고 처리 실패:', error);
    
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      version: 'V11.0-ENHANCED-45Q'
    };
  }
}

// ================================================================================
// MODULE 9: HTML 보고서 생성
// ================================================================================

/**
 * HTML 보고서 생성 (고도화된 배너 광고 형식)
 */
function generateHTMLReport(normalizedData, analysisReport, scores, swot, roadmap) {
  console.log('📄 HTML 보고서 생성 시작 (고도화)');
  
  try {
    // 점수 기반 색상 결정
    const getScoreColor = (score) => {
      if (score >= 80) return '#10b981'; // green
      if (score >= 60) return '#3b82f6'; // blue
      if (score >= 40) return '#f59e0b'; // yellow
      return '#ef4444'; // red
    };
    
    const totalColor = getScoreColor(scores.total);
    
    const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI 역량진단 결과 - ${normalizedData.companyInfo.companyName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Malgun Gothic', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .banner-container {
            max-width: 1200px;
            margin: 20px auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
            animation: slideInUp 0.8s ease-out;
        }
        
        @keyframes slideInUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .banner-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            position: relative;
        }
        
        .banner-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
        }
        
        .banner-header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
        }
        
        .banner-header .subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        
        .company-info {
            background: #f8f9fa;
            padding: 25px;
            border-bottom: 3px solid #667eea;
        }
        
        .company-info h2 {
            color: #667eea;
            margin-bottom: 15px;
            font-size: 1.5rem;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
        }
        
        .info-item {
            background: white;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }
        
        .info-item strong {
            color: #667eea;
            display: block;
            margin-bottom: 5px;
        }
        
        .report-content {
            padding: 30px;
            background: white;
        }
        
        .report-section {
            margin-bottom: 30px;
            padding: 25px;
            background: #f8f9fa;
            border-radius: 10px;
            border-left: 5px solid #667eea;
        }
        
        .report-section h3 {
            color: #667eea;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        
        .highlight-box {
            background: linear-gradient(135deg, #e3f2fd 0%, #e8eaf6 100%);
            padding: 20px;
            border-radius: 10px;
            margin: 15px 0;
            border-left: 5px solid #2196f3;
        }
        
        .cta-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        
        .cta-button {
            display: inline-block;
            background: rgba(255,255,255,0.2);
            color: white;
            padding: 15px 30px;
            border-radius: 25px;
            text-decoration: none;
            margin: 10px;
            border: 2px solid rgba(255,255,255,0.3);
            transition: all 0.3s ease;
        }
        
        .cta-button:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-2px);
        }
        
        .footer {
            background: #333;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 0.9rem;
        }
        
        .timestamp {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 0.8rem;
            opacity: 0.7;
        }
        
        /* 점수 대시보드 스타일 */
        .score-dashboard {
            background: white;
            padding: 30px;
            margin: 20px 0;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .score-dashboard h2 {
            color: #667eea;
            margin-bottom: 25px;
            text-align: center;
        }
        
        .score-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            align-items: center;
        }
        
        .score-card {
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
        }
        
        .score-card.total-score {
            grid-row: span 2;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .score-circle {
            width: 120px;
            height: 120px;
            border: 8px solid;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 15px auto;
            background: rgba(255,255,255,0.1);
        }
        
        .score-circle span {
            font-size: 2.5rem;
            font-weight: bold;
        }
        
        .score-level {
            font-size: 1.2rem;
            font-weight: bold;
            margin-top: 10px;
        }
        
        .score-bar {
            width: 100%;
            height: 20px;
            background: #e5e7eb;
            border-radius: 10px;
            overflow: hidden;
            margin: 10px 0;
        }
        
        .score-fill {
            height: 100%;
            transition: width 0.8s ease;
            border-radius: 10px;
        }
        
        /* SWOT 분석 스타일 */
        .swot-analysis {
            background: white;
            padding: 30px;
            margin: 20px 0;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .swot-analysis h2 {
            color: #667eea;
            margin-bottom: 25px;
            text-align: center;
        }
        
        .swot-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .swot-card {
            padding: 20px;
            border-radius: 10px;
            border-left: 5px solid;
        }
        
        .swot-card.strengths {
            background: #f0fdf4;
            border-color: #22c55e;
        }
        
        .swot-card.weaknesses {
            background: #fef2f2;
            border-color: #ef4444;
        }
        
        .swot-card.opportunities {
            background: #eff6ff;
            border-color: #3b82f6;
        }
        
        .swot-card.threats {
            background: #fefce8;
            border-color: #eab308;
        }
        
        .swot-card h3 {
            margin-bottom: 15px;
            font-size: 1.1rem;
        }
        
        .swot-card ul {
            list-style: none;
            padding: 0;
        }
        
        .swot-card li {
            padding: 5px 0;
            padding-left: 20px;
            position: relative;
        }
        
        .swot-card li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: #667eea;
            font-weight: bold;
        }
        
        /* 로드맵 스타일 */
        .roadmap-section {
            background: white;
            padding: 30px;
            margin: 20px 0;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .roadmap-section h2 {
            color: #667eea;
            margin-bottom: 25px;
            text-align: center;
        }
        
        .roadmap-timeline {
            position: relative;
        }
        
        .roadmap-timeline::before {
            content: '';
            position: absolute;
            left: 30px;
            top: 0;
            bottom: 0;
            width: 3px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .roadmap-phase {
            display: flex;
            margin-bottom: 30px;
            position: relative;
        }
        
        .phase-number {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: bold;
            margin-right: 25px;
            z-index: 1;
            position: relative;
        }
        
        .phase-content {
            flex: 1;
            background: #f8f9fa;
            padding: 25px;
            border-radius: 10px;
            border-left: 4px solid #667eea;
        }
        
        .phase-content h3 {
            color: #667eea;
            margin-bottom: 10px;
        }
        
        .phase-period {
            color: #6b7280;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .phase-objective {
            margin-bottom: 15px;
        }
        
        .phase-tasks {
            margin: 15px 0;
        }
        
        .task-tag {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 0.85rem;
            margin: 3px;
        }
        
        .phase-investment, .phase-outcome {
            margin: 10px 0;
            font-weight: 500;
        }
        
        @media (max-width: 768px) {
            .banner-container {
                margin: 10px;
                border-radius: 10px;
            }
            
            .banner-header h1 {
                font-size: 2rem;
            }
            
            .info-grid, .score-grid, .swot-grid {
                grid-template-columns: 1fr;
            }
            
            .score-card.total-score {
                grid-row: span 1;
            }
            
            .roadmap-timeline::before {
                left: 15px;
            }
            
            .phase-number {
                width: 40px;
                height: 40px;
                font-size: 1.2rem;
                margin-right: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="banner-container">
        <div class="banner-header">
            <div class="timestamp">${new Date().toLocaleDateString('ko-KR')}</div>
            <h1>🎯 AI 역량진단 결과</h1>
            <p class="subtitle">AICAMP 전문 AI 컨설턴트 분석 보고서</p>
        </div>
        
        <div class="company-info">
            <h2>📋 진단 대상 기업 정보</h2>
            <div class="info-grid">
                <div class="info-item">
                    <strong>회사명</strong>
                    ${normalizedData.companyInfo.companyName}
                </div>
                <div class="info-item">
                    <strong>업종</strong>
                    ${normalizedData.companyInfo.industry}
                </div>
                <div class="info-item">
                    <strong>규모</strong>
                    ${normalizedData.companyInfo.employeeCount}
                </div>
                <div class="info-item">
                    <strong>담당자</strong>
                    ${normalizedData.contactInfo.name} ${normalizedData.contactInfo.position}
                </div>
                <div class="info-item">
                    <strong>진단일</strong>
                    ${new Date().toLocaleDateString('ko-KR')}
                </div>
                <div class="info-item">
                    <strong>진단 ID</strong>
                    ${normalizedData.submissionId}
                </div>
            </div>
        </div>
        
        <!-- 점수 대시보드 -->
        <div class="score-dashboard">
            <h2>📊 AI 역량 진단 점수</h2>
            <div class="score-grid">
                <div class="score-card total-score">
                    <h3>전체 점수</h3>
                    <div class="score-circle" style="border-color: ${totalColor}">
                        <span style="color: ${totalColor}">${scores.total}</span>
                        <small>/100</small>
                    </div>
                    <p class="score-level">${scores.level}</p>
                </div>
                <div class="score-card">
                    <h4>현재 AI 활용</h4>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${scores.currentAI}%; background-color: ${getScoreColor(scores.currentAI)}"></div>
                    </div>
                    <span>${scores.currentAI}/100</span>
                </div>
                <div class="score-card">
                    <h4>조직 준비도</h4>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${scores.readiness}%; background-color: ${getScoreColor(scores.readiness)}"></div>
                    </div>
                    <span>${scores.readiness}/100</span>
                </div>
                <div class="score-card">
                    <h4>기술 인프라</h4>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${scores.infrastructure}%; background-color: ${getScoreColor(scores.infrastructure)}"></div>
                    </div>
                    <span>${scores.infrastructure}/100</span>
                </div>
                <div class="score-card">
                    <h4>목표 명확성</h4>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${scores.goals}%; background-color: ${getScoreColor(scores.goals)}"></div>
                    </div>
                    <span>${scores.goals}/100</span>
                </div>
                <div class="score-card">
                    <h4>실행 역량</h4>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${scores.implementation}%; background-color: ${getScoreColor(scores.implementation)}"></div>
                    </div>
                    <span>${scores.implementation}/100</span>
                </div>
            </div>
        </div>
        
        <!-- SWOT 분석 -->
        <div class="swot-analysis">
            <h2>🔍 SWOT 분석</h2>
            <div class="swot-grid">
                <div class="swot-card strengths">
                    <h3>💪 강점 (Strengths)</h3>
                    <ul>
                        ${swot.strengths.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
                <div class="swot-card weaknesses">
                    <h3>⚠️ 약점 (Weaknesses)</h3>
                    <ul>
                        ${swot.weaknesses.map(w => `<li>${w}</li>`).join('')}
                    </ul>
                </div>
                <div class="swot-card opportunities">
                    <h3>🚀 기회 (Opportunities)</h3>
                    <ul>
                        ${swot.opportunities.map(o => `<li>${o}</li>`).join('')}
                    </ul>
                </div>
                <div class="swot-card threats">
                    <h3>🛡️ 위협 (Threats)</h3>
                    <ul>
                        ${swot.threats.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
        
        <!-- 로드맵 -->
        <div class="roadmap-section">
            <h2>🗺️ AI 전략 로드맵</h2>
            <div class="roadmap-timeline">
                ${roadmap.map((phase, index) => `
                <div class="roadmap-phase">
                    <div class="phase-number">${phase.phase}</div>
                    <div class="phase-content">
                        <h3>${phase.title}</h3>
                        <p class="phase-period">${phase.period}</p>
                        <p class="phase-objective">${phase.objectives}</p>
                        <div class="phase-tasks">
                            ${phase.tasks.map(task => `<span class="task-tag">${task}</span>`).join('')}
                        </div>
                        <p class="phase-investment">💰 투자 규모: ${phase.investment}</p>
                        <p class="phase-outcome">🎯 기대 효과: ${phase.expectedOutcome}</p>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
        
        <div class="report-content">
            <div class="highlight-box">
                <h3>🚀 45개 질문 기반 종합 분석 완료!</h3>
                <p>귀하의 기업에 특화된 AI 전략 로드맵이 준비되었습니다.</p>
                <p><strong>분석 모델:</strong> GEMINI 2.5 FLASH | <strong>버전:</strong> V11.0-ENHANCED-45Q</p>
            </div>
            
            <div class="report-section">
                <h3>📊 AI 전문 컨설턴트 분석 보고서</h3>
                <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.8; background: white; padding: 20px; border-radius: 8px;">
${analysisReport}
                </div>
            </div>
            
            <div class="highlight-box">
                <h3>💡 다음 단계 안내</h3>
                <p>1. <strong>무료 전략 상담:</strong> 30분 화상 상담으로 구체적 실행 계획 수립</p>
                <p>2. <strong>맞춤형 교육:</strong> 임직원 대상 AI 역량 강화 프로그램</p>
                <p>3. <strong>실행 지원:</strong> N8N 기반 워크플로우 자동화 구현</p>
            </div>
        </div>
        
        <div class="cta-section">
            <h3>🎓 AICAMP와 함께 AI 혁신을 시작하세요!</h3>
            <p>전문 컨설턴트와의 1:1 맞춤 상담으로 구체적인 실행 계획을 수립하실 수 있습니다.</p>
            <a href="https://aicamp.club/consultation" class="cta-button">🗓️ 무료 상담 신청</a>
            <a href="https://aicamp.club/services" class="cta-button">📚 교육 프로그램 보기</a>
            <a href="mailto:${normalizedData.contactInfo.email}" class="cta-button">📧 문의하기</a>
        </div>
        
        <div class="footer">
            <p>🎓 AICAMP - AI 전문 교육 및 컨설팅 | 📞 문의: admin@aicamp.club | 🌐 웹사이트: aicamp.club</p>
            <p style="font-size: 0.8rem; margin-top: 10px; opacity: 0.7;">
                본 보고서는 GEMINI 2.5 FLASH AI 분석 엔진을 통해 생성되었습니다.<br>
                더 자세한 분석과 맞춤형 솔루션은 전문 컨설턴트와의 상담을 통해 제공됩니다.
            </p>
        </div>
    </div>
</body>
</html>`;

    console.log('✅ HTML 보고서 생성 완료');
    return htmlContent;
    
  } catch (error) {
    console.error('❌ HTML 보고서 생성 실패:', error);
    return `<html><body><h1>보고서 생성 오류</h1><p>${error.message}</p></body></html>`;
  }
}

// ================================================================================
// MODULE 10: 데이터 저장 시스템 확장
// ================================================================================

/**
 * 상담신청 데이터 저장
 */
function saveConsultationData(data) {
  const env = getEnvironmentVariables();
  
  try {
    console.log('💾 상담신청 데이터 저장 시작');
    
    const spreadsheet = SpreadsheetApp.openById(env.SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName('상담신청');
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet('상담신청');
      
      // 헤더 자동 생성
      const headers = [
        '상담ID', '접수일시', '회사명', '담당자명', '직책', '이메일', '전화번호', 
        '상담내용', '상담유형', '희망시간', '긴급도', '처리상태', '담당컨설턴트', '상담일정', '비고'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#34a853').setFontColor('white');
      
      // 열 너비 자동 조정
      sheet.autoResizeColumns(1, headers.length);
    }
    
    // 데이터 행 추가
    const rowData = [
      data.id,
      data.timestamp,
      data.companyName,
      data.contactName,
      data.position,
      data.email,
      data.phone,
      data.content,
      data.consultationType,
      data.preferredTime,
      data.urgency,
      '접수완료',
      '',
      '',
      ''
    ];
    
    sheet.appendRow(rowData);
    
    console.log('✅ 상담신청 데이터 저장 완료');
    
  } catch (error) {
    console.error('❌ 상담신청 데이터 저장 실패:', error);
    throw error;
  }
}

/**
 * 오류신고 데이터 저장
 */
function saveErrorReportData(data) {
  const env = getEnvironmentVariables();
  
  try {
    console.log('💾 오류신고 데이터 저장 시작');
    
    const spreadsheet = SpreadsheetApp.openById(env.SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName('오류신고');
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet('오류신고');
      
      // 헤더 자동 생성
      const headers = [
        '신고ID', '신고일시', '신고자명', '이메일', '전화번호', '오류유형', '오류분류',
        '오류설명', '재현단계', '예상결과', '실제결과', '브라우저정보', '디바이스정보', 
        '스크린샷', '긴급도', '처리상태', '담당개발자', '수정예정일', '수정완료일', '비고'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#dc3545').setFontColor('white');
      
      // 열 너비 자동 조정
      sheet.autoResizeColumns(1, headers.length);
    }
    
    // 데이터 행 추가
    const rowData = [
      data.id,
      data.timestamp,
      data.reporterName,
      data.email,
      data.phone,
      data.errorType,
      data.errorCategory,
      data.errorDescription,
      data.stepsToReproduce,
      data.expectedResult,
      data.actualResult,
      data.browserInfo,
      data.deviceInfo,
      data.screenshot,
      data.urgency,
      '신고접수',
      '',
      '',
      '',
      ''
    ];
    
    sheet.appendRow(rowData);
    
    console.log('✅ 오류신고 데이터 저장 완료');
    
  } catch (error) {
    console.error('❌ 오류신고 데이터 저장 실패:', error);
    throw error;
  }
}

// ================================================================================
// MODULE 11: 이메일 발송 시스템 확장
// ================================================================================

/**
 * 상담신청 이메일 발송
 */
function sendConsultationEmails(data, consultationId) {
  const env = getEnvironmentVariables();
  
  try {
    console.log('📧 상담신청 이메일 발송 시작');
    
    // 신청자에게 이메일 발송
    const applicantSubject = `[AICAMP] 상담신청이 접수되었습니다 - ${data.companyName || ''}`;
    const applicantBody = `
안녕하세요, ${data.contactName || data.name || ''}님.

AICAMP 상담신청이 성공적으로 접수되었습니다.

📋 접수 정보:
- 상담 ID: ${consultationId}
- 회사명: ${data.companyName || ''}
- 담당자: ${data.contactName || data.name || ''}
- 연락처: ${data.phone || ''}
- 상담 내용: ${data.content || ''}
- 접수 시간: ${new Date().toLocaleString('ko-KR')}

💡 다음 단계:
1. 24시간 내 담당 컨설턴트가 연락드립니다
2. 상담 일정을 조율하여 확정합니다
3. 맞춤형 AI 전략을 함께 수립합니다

문의사항이 있으시면 언제든 연락주세요.

감사합니다.

🎓 AICAMP 팀
📞 문의: ${env.ADMIN_EMAIL}
🌐 웹사이트: https://${env.AICAMP_WEBSITE}
`;

    MailApp.sendEmail({
      to: data.email || data.contactEmail || '',
      subject: applicantSubject,
      body: applicantBody
    });
    
    // 관리자에게 알림 이메일 발송
    const adminSubject = `[AICAMP 상담신청] ${data.companyName || '신규 상담신청'}`;
    const adminBody = `
새로운 상담신청이 접수되었습니다.

📋 신청 정보:
- 상담 ID: ${consultationId}
- 접수 시간: ${new Date().toLocaleString('ko-KR')}
- 회사명: ${data.companyName || ''}
- 담당자: ${data.contactName || data.name || ''}
- 직책: ${data.position || ''}
- 이메일: ${data.email || ''}
- 전화번호: ${data.phone || ''}
- 상담 유형: ${data.consultationType || '일반상담'}
- 희망 시간: ${data.preferredTime || ''}
- 긴급도: ${data.urgency || '보통'}

📝 상담 내용:
${data.content || ''}

🔗 관리 링크:
https://docs.google.com/spreadsheets/d/${env.SPREADSHEET_ID}

⚡ 조치 사항:
1. 24시간 내 신청자 연락
2. 상담 일정 조율
3. 맞춤형 솔루션 준비
`;

    MailApp.sendEmail({
      to: env.ADMIN_EMAIL,
      subject: adminSubject,
      body: adminBody
    });
    
    console.log('✅ 상담신청 이메일 발송 완료');
    
  } catch (error) {
    console.error('❌ 상담신청 이메일 발송 실패:', error);
    throw error;
  }
}

/**
 * 오류신고 이메일 발송
 */
function sendErrorReportEmails(data, errorReportId) {
  const env = getEnvironmentVariables();
  
  try {
    console.log('📧 오류신고 이메일 발송 시작');
    
    // 신고자에게 이메일 발송
    const reporterSubject = `[AICAMP] 오류신고가 접수되었습니다 - ${data.errorType || ''}`;
    const reporterBody = `
안녕하세요, ${data.reporterName || data.name || ''}님.

오류신고가 성공적으로 접수되었습니다.

📋 신고 정보:
- 신고 ID: ${errorReportId}
- 오류 유형: ${data.errorType || ''}
- 오류 분류: ${data.errorCategory || ''}
- 신고 시간: ${new Date().toLocaleString('ko-KR')}

🔧 처리 과정:
1. 개발팀에서 오류를 확인합니다
2. 우선순위에 따라 수정 일정을 계획합니다
3. 수정 완료 시 안내 메일을 발송합니다

소중한 피드백 감사합니다.

🎓 AICAMP 개발팀
📞 문의: ${env.ADMIN_EMAIL}
🌐 웹사이트: https://${env.AICAMP_WEBSITE}
`;

    MailApp.sendEmail({
      to: data.email || '',
      subject: reporterSubject,
      body: reporterBody
    });
    
    // 관리자에게 긴급 알림
    const adminSubject = `🚨 [긴급] 오류신고 접수 - ${data.errorType || ''} (${data.urgency || '보통'})`;
    const adminBody = `
새로운 오류신고가 접수되었습니다.

🚨 신고 정보:
- 신고 ID: ${errorReportId}
- 신고 시간: ${new Date().toLocaleString('ko-KR')}
- 신고자: ${data.reporterName || ''}
- 이메일: ${data.email || ''}
- 전화번호: ${data.phone || ''}
- 긴급도: ${data.urgency || '보통'}

🐛 오류 상세:
- 오류 유형: ${data.errorType || ''}
- 오류 분류: ${data.errorCategory || ''}
- 오류 설명: ${data.errorDescription || ''}
- 재현 단계: ${data.stepsToReproduce || ''}
- 예상 결과: ${data.expectedResult || ''}
- 실제 결과: ${data.actualResult || ''}

💻 환경 정보:
- 브라우저: ${data.browserInfo || ''}
- 디바이스: ${data.deviceInfo || ''}
- 스크린샷: ${data.screenshot || '없음'}

🔗 관리 링크:
https://docs.google.com/spreadsheets/d/${env.SPREADSHEET_ID}

⚡ 즉시 조치 필요:
1. 오류 재현 및 확인
2. 수정 우선순위 결정
3. 개발 일정 계획
4. 신고자에게 진행상황 안내
`;

    MailApp.sendEmail({
      to: env.ADMIN_EMAIL,
      subject: adminSubject,
      body: adminBody
    });
    
    console.log('✅ 오류신고 이메일 발송 완료');
    
  } catch (error) {
    console.error('❌ 오류신고 이메일 발송 실패:', error);
    throw error;
  }
}

// ================================================================================
// MODULE 12: 유틸리티 함수들
// ================================================================================

/**
 * 제출 ID 생성 (타입별)
 */
function generateSubmissionId(type = 'AICAMP') {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `${type}_${timestamp}_${random}`;
}

/**
 * 한국 시간 반환
 */
function getCurrentKoreanTime() {
  return new Date().toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

/**
 * 오류 알림
 */
function notifyError(error, requestData) {
  const env = getEnvironmentVariables();
  
  try {
    const errorInfo = {
      timestamp: new Date().toISOString(),
      error: error.toString(),
      stack: error.stack || '',
      requestData: JSON.stringify(requestData || {}, null, 2)
    };
    
    MailApp.sendEmail({
      to: env.ADMIN_EMAIL,
      subject: '[AICAMP] 시스템 오류 발생',
      body: `시스템 오류가 발생했습니다:\n\n${JSON.stringify(errorInfo, null, 2)}`
    });
    
  } catch (notifyError) {
    console.error('오류 알림 발송 실패:', notifyError);
  }
}

console.log('🚀 AICAMP AI 역량진단 시스템 V11.0 ENHANCED 로드 완료');
console.log('📋 45개 질문 기반 GEMINI 2.5 FLASH 분석 시스템');
console.log('🔒 폴백 응답 완전 금지 - 실제 AI 분석만 수행');
console.log('✨ 상담신청, 오류신고, HTML 보고서 생성 기능 완료');
