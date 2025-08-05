// ================================================================================
// 🎯 AICAMP AI 역량진단 시스템 - AI 역량 평가 모듈
// ================================================================================

/**
 * 신청서 데이터 기반 AI 역량 자동 평가
 */
function autoEvaluateAICapabilities(applicationData) {
  console.log('🤖 AI 역량 자동 평가 시작');
  updateProgress(applicationData.diagnosisId, 'AI 역량 평가', 'processing', '자동 평가 진행 중');
  
  try {
    const evaluation = {
      // 5대 AI 역량 평가
      aiCapabilities: evaluateAICapabilities(applicationData),
      
      // 실무 역량 평가
      practicalCapabilities: evaluatePracticalCapabilities(applicationData),
      
      // 종합 점수 계산
      scores: null,
      
      // AI 성숙도 레벨
      maturityLevel: null,
      
      // 업계 벤치마크 비교
      benchmark: null
    };
    
    // 종합 점수 계산
    evaluation.scores = calculateComprehensiveScores(evaluation);
    
    // AI 성숙도 레벨 판정
    evaluation.maturityLevel = getAIMaturityLevel(evaluation.scores.totalScore);
    
    // 업계 벤치마크 비교
    if (ENV.ENABLE_BENCHMARKING) {
      evaluation.benchmark = compareToBenchmark(applicationData.industry, evaluation.scores);
    }
    
    updateProgress(applicationData.diagnosisId, 'AI 역량 평가', 'completed', '평가 완료');
    console.log('✅ AI 역량 자동 평가 완료:', evaluation);
    
    return evaluation;
    
  } catch (error) {
    updateProgress(applicationData.diagnosisId, 'AI 역량 평가', 'error', error.toString());
    throw error;
  }
}

/**
 * 5대 AI 역량 평가
 */
function evaluateAICapabilities(data) {
  const capabilities = {};
  
  // 1. AI 이해 및 활용 전략
  capabilities.aiUnderstanding = {
    aiTechUnderstanding: evaluateAITechUnderstanding(data),
    aiStrategyPlanning: evaluateAIStrategyPlanning(data),
    aiInvestmentDecision: evaluateAIInvestmentDecision(data)
  };
  
  // 2. 데이터 관리 및 분석
  capabilities.dataManagement = {
    dataCollection: evaluateDataCollection(data),
    dataQuality: evaluateDataQuality(data),
    dataAnalysis: evaluateDataAnalysis(data)
  };
  
  // 3. 프로세스 혁신 및 자동화
  capabilities.processOptimization = {
    processAnalysis: evaluateProcessAnalysis(data),
    automationAssessment: evaluateAutomationAssessment(data),
    aiProcessImprovement: evaluateAIProcessImprovement(data)
  };
  
  // 4. 인재 육성 및 조직 문화
  capabilities.talentDevelopment = {
    aiEducation: evaluateAIEducation(data),
    changeManagement: evaluateChangeManagement(data),
    innovationCulture: evaluateInnovationCulture(data)
  };
  
  // 5. 고객 경험 및 가치 창출
  capabilities.customerExperience = {
    customerDataUsage: evaluateCustomerDataUsage(data),
    aiServiceDevelopment: evaluateAIServiceDevelopment(data),
    customerSatisfaction: evaluateCustomerSatisfaction(data)
  };
  
  return capabilities;
}

/**
 * AI 기술 이해도 평가
 */
function evaluateAITechUnderstanding(data) {
  let score = 3; // 기본값
  
  // 현재 AI 활용 현황
  if (data.currentAIUsage && data.currentAIUsage !== '사용안함') {
    score += 0.5;
  }
  
  // AI 도구 사용 개수
  if (data.aiToolsList) {
    const tools = data.aiToolsList.split(',').filter(t => t.trim()).length;
    if (tools >= 3) score += 1;
    else if (tools >= 1) score += 0.5;
  }
  
  // 사업 설명에 AI 언급
  if (data.businessDescription && data.businessDescription.toLowerCase().includes('ai')) {
    score += 0.5;
  }
  
  // 직원 수와 업종 고려
  if (data.employeeCount && parseInt(data.employeeCount) > 100) {
    score += 0.3;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

/**
 * AI 전략 수립 역량 평가
 */
function evaluateAIStrategyPlanning(data) {
  let score = 2.5;
  
  // AI 투자 계획
  if (data.aiInvestmentPlan && data.aiInvestmentPlan !== '없음') {
    score += 1;
  }
  
  // 희망 컨설팅 분야 명확성
  if (data.consultingArea && data.consultingArea !== '기타') {
    score += 0.5;
  }
  
  // 예상 혜택 구체성
  if (data.expectedBenefits) {
    const benefits = data.expectedBenefits.toLowerCase();
    if (benefits.includes('%') || benefits.includes('향상') || benefits.includes('절감')) {
      score += 0.5;
    }
  }
  
  // 목표 달성 기간 설정
  if (data.targetTimeframe) {
    score += 0.3;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

/**
 * AI 투자 의사결정 역량 평가
 */
function evaluateAIInvestmentDecision(data) {
  let score = 3;
  
  // 예산 범위 명시
  if (data.budgetRange && data.budgetRange !== '미정') {
    score += 0.8;
  }
  
  // 의사결정권자 레벨
  if (data.decisionMaker) {
    if (data.decisionMaker.includes('대표') || data.decisionMaker.includes('CEO')) {
      score += 1;
    } else if (data.decisionMaker.includes('임원') || data.decisionMaker.includes('이사')) {
      score += 0.5;
    }
  }
  
  // 연매출 규모
  if (data.annualRevenue) {
    const revenue = parseInt(data.annualRevenue.replace(/[^0-9]/g, ''));
    if (revenue >= 100) score += 0.2; // 100억 이상
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

/**
 * 데이터 수집 체계 평가
 */
function evaluateDataCollection(data) {
  let score = 3;
  
  // 업종별 데이터 활용도
  const dataIntensiveIndustries = ['IT/소프트웨어', '금융업', '유통/도소매'];
  if (dataIntensiveIndustries.includes(data.industry)) {
    score += 0.5;
  }
  
  // 사업 규모
  if (data.employeeCount && parseInt(data.employeeCount) > 50) {
    score += 0.3;
  }
  
  // 주요 고민사항에 데이터 관련 언급
  if (data.mainChallenges) {
    const challenges = data.mainChallenges.toLowerCase();
    if (challenges.includes('데이터') || challenges.includes('분석')) {
      score += 0.7;
    }
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

/**
 * 데이터 품질 관리 평가
 */
function evaluateDataQuality(data) {
  let score = 2.8;
  
  // 현재 AI 도구 사용 (데이터 품질 인식)
  if (data.currentAIUsage && data.currentAIUsage !== '사용안함') {
    score += 0.5;
  }
  
  // 품질 관련 언급
  if (data.mainChallenges && data.mainChallenges.includes('품질')) {
    score += 0.7;
  }
  
  // 업종별 품질 중요도
  if (['제조업', '의료/헬스케어', '금융업'].includes(data.industry)) {
    score += 0.5;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

/**
 * 데이터 분석 역량 평가
 */
function evaluateDataAnalysis(data) {
  let score = 3;
  
  // AI 도구 사용 중 분석 도구
  if (data.aiToolsList && data.aiToolsList.includes('분석')) {
    score += 0.8;
  }
  
  // 예상 혜택에 분석 관련
  if (data.expectedBenefits && data.expectedBenefits.includes('분석')) {
    score += 0.5;
  }
  
  // 컨설팅 분야
  if (data.consultingArea === '데이터 분석') {
    score += 0.7;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

/**
 * 실무 역량 평가
 */
function evaluatePracticalCapabilities(data) {
  return {
    documentAutomation: evaluateDocumentAutomation(data),
    dataAnalysisPractice: evaluateDataAnalysisPractice(data),
    aiToolUsage: evaluateAIToolUsage(data),
    digitalCollaboration: evaluateDigitalCollaboration(data),
    industrySpecific: evaluateIndustrySpecific(data)
  };
}

/**
 * 문서 자동화 역량 평가
 */
function evaluateDocumentAutomation(data) {
  let score = 3;
  
  // ChatGPT 사용
  if (data.aiToolsList && data.aiToolsList.includes('ChatGPT')) {
    score += 0.8;
  }
  
  // 업무 효율성 관련 언급
  if (data.mainChallenges && data.mainChallenges.includes('효율')) {
    score += 0.5;
  }
  
  // 서비스업/사무직 비중이 높은 업종
  if (['서비스업', '금융업', '교육'].includes(data.industry)) {
    score += 0.3;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

/**
 * 종합 점수 계산
 */
function calculateComprehensiveScores(evaluation) {
  // AI 역량 점수 계산
  const aiScores = {};
  let aiTotal = 0;
  let aiCount = 0;
  
  Object.entries(AI_CAPABILITY_STRUCTURE.aiCapabilities).forEach(([key, config]) => {
    const items = evaluation.aiCapabilities[key];
    const itemScores = Object.values(items);
    const average = calculateAverage(itemScores);
    
    aiScores[key] = Math.round(average * 20); // 5점 만점을 100점으로 변환
    aiTotal += aiScores[key] * config.weight;
    aiCount += config.weight;
  });
  
  const aiCapabilityAverage = Math.round(aiTotal / aiCount);
  
  // 실무 역량 점수 계산
  const practicalScores = {};
  Object.entries(evaluation.practicalCapabilities).forEach(([key, score]) => {
    practicalScores[key] = Math.round(score * 20); // 5점 만점을 100점으로 변환
  });
  
  const practicalCapabilityAverage = Math.round(
    calculateAverage(Object.values(practicalScores))
  );
  
  // 종합 점수 (AI 역량 70%, 실무 역량 30%)
  const totalScore = Math.round(
    (aiCapabilityAverage * 0.7) + (practicalCapabilityAverage * 0.3)
  );
  
  return {
    aiCapability: {
      scores: aiScores,
      average: aiCapabilityAverage,
      weight: 0.7
    },
    practicalCapability: {
      scores: practicalScores,
      average: practicalCapabilityAverage,
      weight: 0.3
    },
    totalScore: totalScore,
    grade: getGradeFromScore(totalScore)
  };
}

/**
 * 업계 벤치마크 비교
 */
function compareToBenchmark(industry, scores) {
  const industryConfig = INDUSTRY_CONFIG[industry] || INDUSTRY_CONFIG['기타'];
  const benchmarkScore = industryConfig.benchmarkScore;
  
  const comparison = {
    industry: industry,
    benchmarkScore: benchmarkScore,
    companyScore: scores.totalScore,
    gap: scores.totalScore - benchmarkScore,
    gapPercentage: Math.round(((scores.totalScore - benchmarkScore) / benchmarkScore) * 100),
    position: getCompetitivePosition(scores.totalScore, benchmarkScore),
    
    // 세부 비교
    categoryComparison: {},
    
    // 업계 상위 퍼센타일
    percentile: calculatePercentile(scores.totalScore, industry)
  };
  
  // 카테고리별 비교
  Object.entries(scores.aiCapability.scores).forEach(([key, score]) => {
    comparison.categoryComparison[key] = {
      companyScore: score,
      industryAverage: getBenchmarkForCategory(industry, key),
      gap: score - getBenchmarkForCategory(industry, key)
    };
  });
  
  return comparison;
}

/**
 * 경쟁적 위치 판단
 */
function getCompetitivePosition(companyScore, benchmarkScore) {
  const gap = ((companyScore - benchmarkScore) / benchmarkScore) * 100;
  
  if (gap >= 20) return '업계 선도';
  if (gap >= 0) return '업계 평균 이상';
  if (gap >= -20) return '업계 평균';
  if (gap >= -40) return '업계 평균 이하';
  return '개선 시급';
}

/**
 * 업계 내 퍼센타일 계산
 */
function calculatePercentile(score, industry) {
  // 실제로는 DB에서 업계 데이터를 가져와 계산
  // 여기서는 간단한 추정 공식 사용
  const industryConfig = INDUSTRY_CONFIG[industry] || INDUSTRY_CONFIG['기타'];
  const benchmark = industryConfig.benchmarkScore;
  
  if (score >= benchmark + 20) return 90; // 상위 10%
  if (score >= benchmark + 10) return 75; // 상위 25%
  if (score >= benchmark) return 50; // 상위 50%
  if (score >= benchmark - 10) return 25; // 상위 75%
  return 10; // 하위 10%
}

/**
 * 카테고리별 벤치마크 점수
 */
function getBenchmarkForCategory(industry, category) {
  // 실제로는 DB에서 가져옴
  const industryConfig = INDUSTRY_CONFIG[industry] || INDUSTRY_CONFIG['기타'];
  const baseScore = industryConfig.benchmarkScore;
  
  // 카테고리별 가중치 적용
  const categoryWeights = {
    aiUnderstanding: 0.9,
    dataManagement: 1.0,
    processOptimization: 1.1,
    talentDevelopment: 0.95,
    customerExperience: 1.05
  };
  
  return Math.round(baseScore * (categoryWeights[category] || 1));
}

// 나머지 평가 함수들...
function evaluateProcessAnalysis(data) {
  let score = 3;
  
  if (data.mainChallenges && data.mainChallenges.includes('프로세스')) {
    score += 0.7;
  }
  
  if (data.consultingArea === '프로세스 자동화') {
    score += 0.8;
  }
  
  if (['제조업', 'IT/소프트웨어'].includes(data.industry)) {
    score += 0.5;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateAutomationAssessment(data) {
  let score = 3.2;
  
  if (data.expectedBenefits && data.expectedBenefits.includes('자동화')) {
    score += 0.8;
  }
  
  if (data.currentAIUsage !== '사용안함') {
    score += 0.5;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateAIProcessImprovement(data) {
  let score = 2.8;
  
  if (data.aiInvestmentPlan && data.aiInvestmentPlan !== '없음') {
    score += 0.7;
  }
  
  if (data.consultingArea && data.consultingArea.includes('AI')) {
    score += 0.5;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateAIEducation(data) {
  let score = 2.5;
  
  if (data.currentAIUsage !== '사용안함') {
    score += 0.5;
  }
  
  if (data.employeeCount && parseInt(data.employeeCount) > 50) {
    score += 0.5;
  }
  
  if (data.consultingArea === 'AI 교육') {
    score += 1;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateChangeManagement(data) {
  let score = 3;
  
  if (data.decisionMaker && data.decisionMaker.includes('대표')) {
    score += 0.7;
  }
  
  if (data.mainChallenges && data.mainChallenges.includes('변화')) {
    score += 0.5;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateInnovationCulture(data) {
  let score = 3;
  
  if (data.businessDescription && data.businessDescription.includes('혁신')) {
    score += 0.5;
  }
  
  if (data.aiInvestmentPlan !== '없음') {
    score += 0.5;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateCustomerDataUsage(data) {
  let score = 3;
  
  if (['유통/도소매', '서비스업', '금융업'].includes(data.industry)) {
    score += 0.5;
  }
  
  if (data.expectedBenefits && data.expectedBenefits.includes('고객')) {
    score += 0.7;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateAIServiceDevelopment(data) {
  let score = 2.8;
  
  if (data.consultingArea === '고객 서비스 혁신') {
    score += 0.8;
  }
  
  if (data.aiToolsList && data.aiToolsList.includes('ChatGPT')) {
    score += 0.4;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateCustomerSatisfaction(data) {
  let score = 3.2;
  
  if (data.expectedBenefits && data.expectedBenefits.includes('만족')) {
    score += 0.6;
  }
  
  if (data.mainChallenges && data.mainChallenges.includes('고객')) {
    score += 0.4;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateDataAnalysisPractice(data) {
  return evaluateDataAnalysis(data); // 동일한 로직 사용
}

function evaluateAIToolUsage(data) {
  let score = 3;
  
  if (data.aiToolsList) {
    const tools = data.aiToolsList.split(',').filter(t => t.trim()).length;
    score += Math.min(tools * 0.5, 2);
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateDigitalCollaboration(data) {
  let score = 3;
  
  if (data.currentAIUsage !== '사용안함') {
    score += 0.5;
  }
  
  if (data.employeeCount && parseInt(data.employeeCount) > 30) {
    score += 0.3;
  }
  
  if (['IT/소프트웨어', '서비스업'].includes(data.industry)) {
    score += 0.4;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}

function evaluateIndustrySpecific(data) {
  const industry = data.industry || '기타';
  const industryConfig = INDUSTRY_CONFIG[industry];
  
  let score = 3;
  
  // 업종별 핵심 요소 평가
  if (industryConfig && data.mainChallenges) {
    const challenges = data.mainChallenges.toLowerCase();
    industryConfig.keyFactors.forEach(factor => {
      if (challenges.includes(factor.toLowerCase())) {
        score += 0.5;
      }
    });
  }
  
  // AI 도구 사용 여부
  if (data.currentAIUsage !== '사용안함') {
    score += 0.3;
  }
  
  return Math.min(5, Math.round(score * 10) / 10);
}