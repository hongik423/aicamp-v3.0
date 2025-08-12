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
 * GEMINI 2.5 FLASH를 사용한 45개 질문 기반 AI 분석
 * 폴백 응답 완전 금지, 실제 신청서 데이터 기반 분석만 수행
 */
function generateAIAnalysisReport(normalizedData) {
  const env = getEnvironmentVariables();
  
  console.log('🚀 GEMINI 2.5 FLASH AI 분석 시작 (45개 질문 기반)');
  
  // 45개 질문 기반 분석 프롬프트 생성
  const analysisPrompt = `
당신은 AICAMP의 AI 전문 컨설턴트 이후경입니다. 
45개 질문 기반 AI 역량진단 결과를 바탕으로 전문적이고 실용적인 분석 보고서를 작성해주세요.

## 신청 기업 정보:
- 회사명: ${normalizedData.companyInfo.companyName}
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
 * 45개 질문 데이터를 구글 시트에 저장 (HTML 보고서 포함)
 */
function saveToGoogleSheets(normalizedData, analysisReport, htmlReport) {
  const env = getEnvironmentVariables();
  
  try {
    console.log('💾 구글 시트 데이터 저장 시작');
    
    const spreadsheet = SpreadsheetApp.openById(env.SPREADSHEET_ID);
    
    // 1. 메인 진단 데이터 시트
    saveMainDiagnosisData(spreadsheet, normalizedData);
    
    // 2. 상세 분석 데이터 시트  
    saveDetailedAnalysisData(spreadsheet, normalizedData);
    
    // 3. AI 분석 보고서 시트
    saveAnalysisReport(spreadsheet, normalizedData, analysisReport);
    
    // 4. HTML 보고서 시트 (새로 추가)
    saveHTMLReport(spreadsheet, normalizedData, htmlReport);
    
    console.log('✅ 구글 시트 저장 완료 (HTML 보고서 포함)');
    
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
        result = handleConsultationRequest(requestData);
        break;
        
      case 'error_report':
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
    
    // 2. AI 분석 수행
    const analysisReport = generateAIAnalysisReport(normalizedData);
    
    // 3. HTML 보고서 생성
    const htmlReport = generateHTMLReport(normalizedData, analysisReport);
    
    // 4. 데이터 저장
    saveToGoogleSheets(normalizedData, analysisReport, htmlReport);
    
    // 5. 이메일 발송
    sendResultEmail(normalizedData, analysisReport, htmlReport);
    sendAdminNotification(normalizedData, analysisReport);
    
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
 * 상담신청 처리
 */
function handleConsultationRequest(data) {
  console.log('📞 상담신청 처리 시작');
  
  try {
    const id = generateSubmissionId('CONSULT');
    
    // 데이터 저장
    saveConsultationData({
      id: id,
      timestamp: new Date().toISOString(),
      companyName: data.companyName || '',
      contactName: data.contactName || data.name || '',
      email: data.email || data.contactEmail || '',
      phone: data.phone || data.contactPhone || '',
      position: data.position || data.contactPosition || '',
      content: data.content || data.consultationContent || '',
      consultationType: data.consultationType || '일반상담',
      preferredTime: data.preferredTime || '',
      urgency: data.urgency || '보통'
    });
    
    // 이메일 발송
    sendConsultationEmails(data, id);
    
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
 * 오류신고 처리
 */
function handleErrorReport(data) {
  console.log('🚨 오류신고 처리 시작');
  
  try {
    const id = generateSubmissionId('ERROR');
    
    // 데이터 저장
    saveErrorReportData({
      id: id,
      timestamp: new Date().toISOString(),
      reporterName: data.reporterName || data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      errorType: data.errorType || '세금계산기',
      errorCategory: data.errorCategory || '계산오류',
      errorDescription: data.errorDescription || data.description || '',
      stepsToReproduce: data.stepsToReproduce || '',
      expectedResult: data.expectedResult || '',
      actualResult: data.actualResult || '',
      browserInfo: data.browserInfo || '',
      deviceInfo: data.deviceInfo || '',
      screenshot: data.screenshot || '',
      urgency: data.urgency || '보통'
    });
    
    // 이메일 발송
    sendErrorReportEmails(data, id);
    
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
 * HTML 보고서 생성 (배너 광고 형식)
 */
function generateHTMLReport(normalizedData, analysisReport) {
  console.log('📄 HTML 보고서 생성 시작');
  
  try {
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
        
        @media (max-width: 768px) {
            .banner-container {
                margin: 10px;
                border-radius: 10px;
            }
            
            .banner-header h1 {
                font-size: 2rem;
            }
            
            .info-grid {
                grid-template-columns: 1fr;
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
        
        <div class="report-content">
            <div class="highlight-box">
                <h3>🚀 45개 질문 기반 종합 분석 완료!</h3>
                <p>귀하의 기업에 특화된 AI 전략 로드맵이 준비되었습니다.</p>
                <p><strong>분석 모델:</strong> GEMINI 2.5 FLASH | <strong>버전:</strong> V11.0-ENHANCED-45Q</p>
            </div>
            
            <div class="report-section">
                <h3>📊 AI 분석 보고서</h3>
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
