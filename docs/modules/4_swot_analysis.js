// ================================================================================
// 💡 AICAMP AI 역량진단 시스템 - SWOT 분석 및 전략 모듈
// ================================================================================

/**
 * 심층 SWOT 분석 수행
 */
function performDeepSWOTAnalysis(applicationData, evaluationData) {
  console.log('🔄 심층 SWOT 분석 시작');
  updateProgress(applicationData.diagnosisId, 'SWOT 분석', 'processing', '전략적 분석 진행 중');
  
  try {
    const swot = {
      // SWOT 요소 분석
      strengths: identifyStrengths(applicationData, evaluationData),
      weaknesses: identifyWeaknesses(applicationData, evaluationData),
      opportunities: identifyOpportunities(applicationData, evaluationData),
      threats: identifyThreats(applicationData, evaluationData)
    };
    
    // SWOT 매트릭스 전략
    const strategies = {
      SO: generateSOStrategies(swot, applicationData),
      WO: generateWOStrategies(swot, applicationData),
      ST: generateSTStrategies(swot, applicationData),
      WT: generateWTStrategies(swot, applicationData)
    };
    
    // 우선순위 액션
    const priorityActions = extractPriorityActions(strategies, applicationData, evaluationData);
    
    updateProgress(applicationData.diagnosisId, 'SWOT 분석', 'completed', '분석 완료');
    console.log('✅ SWOT 분석 완료');
    
    return {
      swot: swot,
      strategies: strategies,
      priorityActions: priorityActions
    };
    
  } catch (error) {
    updateProgress(applicationData.diagnosisId, 'SWOT 분석', 'error', error.toString());
    throw error;
  }
}

/**
 * 강점 식별
 */
function identifyStrengths(appData, evalData) {
  const strengths = [];
  const scores = evalData.scores;
  
  // 1. 점수 기반 강점
  Object.entries(scores.aiCapability.scores).forEach(([key, score]) => {
    if (score >= 80) {
      const capabilityName = getCapabilityName(key);
      strengths.push({
        area: capabilityName,
        score: score,
        type: 'capability',
        description: `${capabilityName} 분야에서 업계 선도 수준의 역량 보유 (${score}점)`,
        impact: 'high'
      });
    } else if (score >= 70) {
      const capabilityName = getCapabilityName(key);
      strengths.push({
        area: capabilityName,
        score: score,
        type: 'capability',
        description: `${capabilityName} 분야에서 우수한 역량 보유 (${score}점)`,
        impact: 'medium'
      });
    }
  });
  
  // 2. 사업 특성 기반 강점
  if (appData.businessDescription) {
    strengths.push({
      area: '도메인 전문성',
      type: 'business',
      description: `${appData.industry} 분야의 깊은 이해와 ${appData.establishedYear ? `${new Date().getFullYear() - parseInt(appData.establishedYear)}년의` : ''} 경험`,
      impact: 'high'
    });
  }
  
  // 3. 조직 규모 강점
  if (appData.employeeCount && parseInt(appData.employeeCount) > 100) {
    strengths.push({
      area: '조직 규모',
      type: 'organization',
      description: `${appData.employeeCount}명 규모의 안정적인 조직 구조`,
      impact: 'medium'
    });
  }
  
  // 4. AI 도입 경험
  if (appData.currentAIUsage && appData.currentAIUsage !== '사용안함') {
    strengths.push({
      area: 'AI 도입 경험',
      type: 'experience',
      description: `이미 ${appData.aiToolsList || 'AI 도구'}를 활용한 경험 보유`,
      impact: 'medium'
    });
  }
  
  // 5. 리더십 강점
  if (appData.decisionMaker && (appData.decisionMaker.includes('대표') || appData.decisionMaker.includes('CEO'))) {
    strengths.push({
      area: '경영진 의지',
      type: 'leadership',
      description: '최고 경영진의 강력한 AI 전환 의지',
      impact: 'high'
    });
  }
  
  return strengths.sort((a, b) => {
    const impactOrder = { high: 3, medium: 2, low: 1 };
    return impactOrder[b.impact] - impactOrder[a.impact];
  });
}

/**
 * 약점 식별
 */
function identifyWeaknesses(appData, evalData) {
  const weaknesses = [];
  const scores = evalData.scores;
  
  // 1. 점수 기반 약점
  Object.entries(scores.aiCapability.scores).forEach(([key, score]) => {
    if (score < 40) {
      const capabilityName = getCapabilityName(key);
      weaknesses.push({
        area: capabilityName,
        score: score,
        type: 'capability',
        urgency: 'critical',
        description: `${capabilityName} 역량 심각한 부족 (${score}점)`,
        impact: 'high'
      });
    } else if (score < 60) {
      const capabilityName = getCapabilityName(key);
      weaknesses.push({
        area: capabilityName,
        score: score,
        type: 'capability',
        urgency: 'high',
        description: `${capabilityName} 역량 개선 필요 (${score}점)`,
        impact: 'medium'
      });
    }
  });
  
  // 2. AI 도입 장벽
  if (appData.aiBarriers) {
    const barriers = Array.isArray(appData.aiBarriers) ? appData.aiBarriers : [appData.aiBarriers];
    barriers.forEach(barrier => {
      weaknesses.push({
        area: 'AI 도입 장벽',
        type: 'barrier',
        urgency: 'high',
        description: barrier,
        impact: 'high'
      });
    });
  }
  
  // 3. 예산 제약
  if (!appData.budgetRange || appData.budgetRange === '미정') {
    weaknesses.push({
      area: '투자 계획',
      type: 'resource',
      urgency: 'medium',
      description: 'AI 투자 예산 미확정',
      impact: 'medium'
    });
  }
  
  // 4. 조직 규모 약점
  if (appData.employeeCount && parseInt(appData.employeeCount) < 20) {
    weaknesses.push({
      area: '조직 역량',
      type: 'organization',
      urgency: 'medium',
      description: '소규모 조직으로 인한 전문 인력 부족',
      impact: 'medium'
    });
  }
  
  // 5. 데이터 관련 약점
  if (scores.aiCapability.scores.dataManagement < 60) {
    weaknesses.push({
      area: '데이터 인프라',
      type: 'infrastructure',
      urgency: 'high',
      description: '데이터 관리 체계 미흡',
      impact: 'high'
    });
  }
  
  return weaknesses.sort((a, b) => {
    const urgencyOrder = { critical: 3, high: 2, medium: 1, low: 0 };
    return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
  });
}

/**
 * 기회 식별
 */
function identifyOpportunities(appData, evalData) {
  const opportunities = [];
  const industry = appData.industry || '기타';
  const industryConfig = INDUSTRY_CONFIG[industry];
  
  // 1. 업종별 AI 트렌드 기회
  if (industryConfig && industryConfig.aiTrends) {
    industryConfig.aiTrends.forEach(trend => {
      opportunities.push({
        area: 'AI 트렌드',
        type: 'market',
        description: `${industry} 분야 ${trend} 도입 기회`,
        timeframe: '6-12개월',
        potential: 'high'
      });
    });
  }
  
  // 2. 정부 지원 기회
  opportunities.push({
    area: '정부 지원',
    type: 'funding',
    description: 'AI 바우처, 디지털 전환 지원금 등 정부 지원 사업 (최대 3억원)',
    timeframe: '즉시 신청 가능',
    potential: 'high'
  });
  
  // 3. 시장 확대 기회
  if (appData.expectedBenefits) {
    opportunities.push({
      area: '시장 기회',
      type: 'growth',
      description: `${appData.expectedBenefits} 달성을 통한 시장 확대`,
      timeframe: '3-6개월',
      potential: 'high'
    });
  }
  
  // 4. 경쟁 우위 기회
  if (evalData.benchmark && evalData.benchmark.percentile < 50) {
    opportunities.push({
      area: '경쟁 우위',
      type: 'competitive',
      description: '현재 업계 평균 이하로 빠른 개선 시 경쟁 우위 확보 가능',
      timeframe: '6-9개월',
      potential: 'medium'
    });
  }
  
  // 5. 파트너십 기회
  opportunities.push({
    area: '전략적 파트너십',
    type: 'partnership',
    description: 'AI 전문 기업과의 협력을 통한 빠른 역량 확보',
    timeframe: '1-3개월',
    potential: 'medium'
  });
  
  // 6. 신규 서비스 기회
  if (appData.consultingArea === '고객 서비스 혁신') {
    opportunities.push({
      area: '신규 서비스',
      type: 'innovation',
      description: 'AI 기반 신규 고객 서비스 개발',
      timeframe: '6-12개월',
      potential: 'high'
    });
  }
  
  return opportunities.sort((a, b) => {
    const potentialOrder = { high: 3, medium: 2, low: 1 };
    return potentialOrder[b.potential] - potentialOrder[a.potential];
  });
}

/**
 * 위협 식별
 */
function identifyThreats(appData, evalData) {
  const threats = [];
  const industry = appData.industry || '기타';
  
  // 1. 경쟁사 AI 도입 위협
  threats.push({
    area: '경쟁사 AI 도입',
    type: 'competition',
    description: `${industry} 업계 경쟁사들의 빠른 AI 도입으로 인한 경쟁력 격차`,
    severity: 'high',
    timeframe: '현재 진행중'
  });
  
  // 2. 기술 변화 속도
  threats.push({
    area: '기술 변화',
    type: 'technology',
    description: 'AI 기술의 급속한 발전으로 인한 지속적인 투자 부담',
    severity: 'medium',
    timeframe: '지속적'
  });
  
  // 3. 인재 확보 어려움
  if (evalData.scores.aiCapability.scores.talentDevelopment < 60) {
    threats.push({
      area: '인재 부족',
      type: 'resource',
      description: 'AI 전문 인력 확보의 어려움과 높은 인건비',
      severity: 'high',
      timeframe: '현재'
    });
  }
  
  // 4. 규제 리스크
  if (['금융업', '의료/헬스케어'].includes(industry)) {
    threats.push({
      area: '규제 강화',
      type: 'regulatory',
      description: 'AI 관련 규제 강화로 인한 컴플라이언스 부담',
      severity: 'medium',
      timeframe: '1-2년 내'
    });
  }
  
  // 5. 투자 리스크
  if (appData.annualRevenue && parseInt(appData.annualRevenue) < 50) {
    threats.push({
      area: '투자 부담',
      type: 'financial',
      description: '제한된 재무 자원으로 인한 AI 투자 리스크',
      severity: 'medium',
      timeframe: '즉시'
    });
  }
  
  // 6. 고객 기대치
  threats.push({
    area: '고객 기대치',
    type: 'market',
    description: 'AI 서비스에 대한 고객의 높아진 기대치',
    severity: 'medium',
    timeframe: '현재'
  });
  
  return threats.sort((a, b) => {
    const severityOrder = { high: 3, medium: 2, low: 1 };
    return severityOrder[b.severity] - severityOrder[a.severity];
  });
}

/**
 * SO 전략 생성 (강점-기회)
 */
function generateSOStrategies(swot, appData) {
  const strategies = [];
  const topStrengths = swot.strengths.slice(0, 3);
  const topOpportunities = swot.opportunities.slice(0, 3);
  
  topStrengths.forEach(strength => {
    topOpportunities.forEach(opportunity => {
      if (isStrategicMatch(strength, opportunity)) {
        strategies.push({
          type: 'SO',
          name: '공격적 성장 전략',
          strategy: `${strength.area}을 활용한 ${opportunity.area} 선점`,
          description: `${strength.description}를 기반으로 ${opportunity.description}을 실현`,
          action: generateActionPlan(strength, opportunity, appData),
          expectedResult: generateExpectedResult('SO', strength, opportunity),
          investment: estimateInvestment('SO', appData),
          timeline: opportunity.timeframe,
          priority: calculateStrategyPriority(strength.impact, opportunity.potential)
        });
      }
    });
  });
  
  return strategies
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3);
}

/**
 * WO 전략 생성 (약점-기회)
 */
function generateWOStrategies(swot, appData) {
  const strategies = [];
  const topWeaknesses = swot.weaknesses.slice(0, 3);
  const topOpportunities = swot.opportunities.slice(0, 3);
  
  topWeaknesses.forEach(weakness => {
    topOpportunities.forEach(opportunity => {
      if (opportunity.type === 'funding' || opportunity.type === 'partnership') {
        strategies.push({
          type: 'WO',
          name: '전환 전략',
          strategy: `${opportunity.area}를 통한 ${weakness.area} 역량 강화`,
          description: `${opportunity.description}를 활용하여 ${weakness.description} 극복`,
          action: generateWeaknessImprovementPlan(weakness, opportunity, appData),
          expectedResult: generateExpectedResult('WO', weakness, opportunity),
          investment: estimateInvestment('WO', appData),
          timeline: '3-6개월',
          priority: calculateStrategyPriority(weakness.urgency, opportunity.potential)
        });
      }
    });
  });
  
  return strategies
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3);
}

/**
 * ST 전략 생성 (강점-위협)
 */
function generateSTStrategies(swot, appData) {
  const strategies = [];
  const topStrengths = swot.strengths.slice(0, 3);
  const topThreats = swot.threats.slice(0, 3);
  
  topStrengths.forEach(strength => {
    topThreats.forEach(threat => {
      strategies.push({
        type: 'ST',
        name: '방어적 차별화 전략',
        strategy: `${strength.area}을 통한 ${threat.area} 대응`,
        description: `${strength.description}를 강화하여 ${threat.description} 방어`,
        action: generateDefenseStrategy(strength, threat, appData),
        expectedResult: generateExpectedResult('ST', strength, threat),
        investment: estimateInvestment('ST', appData),
        timeline: '즉시 착수',
        priority: calculateStrategyPriority(strength.impact, threat.severity)
      });
    });
  });
  
  return strategies
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3);
}

/**
 * WT 전략 생성 (약점-위협)
 */
function generateWTStrategies(swot, appData) {
  const strategies = [];
  const criticalWeaknesses = swot.weaknesses.filter(w => w.urgency === 'critical' || w.urgency === 'high').slice(0, 2);
  const criticalThreats = swot.threats.filter(t => t.severity === 'high').slice(0, 2);
  
  criticalWeaknesses.forEach(weakness => {
    criticalThreats.forEach(threat => {
      strategies.push({
        type: 'WT',
        name: '생존 전략',
        strategy: `${weakness.area} 긴급 보완 및 ${threat.area} 회피`,
        description: `${weakness.description}를 최소화하고 ${threat.description}의 영향 축소`,
        action: generateSurvivalStrategy(weakness, threat, appData),
        expectedResult: generateExpectedResult('WT', weakness, threat),
        investment: estimateInvestment('WT', appData),
        timeline: '즉시 착수',
        priority: 10 // 최우선
      });
    });
  });
  
  return strategies
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 2);
}

/**
 * 우선순위 액션 추출
 */
function extractPriorityActions(strategies, appData, evalData) {
  const allStrategies = [
    ...strategies.SO,
    ...strategies.WO,
    ...strategies.ST,
    ...strategies.WT
  ];
  
  // 우선순위 점수 계산
  const prioritizedStrategies = allStrategies.map(strategy => {
    const score = calculateActionPriority(strategy, appData, evalData);
    return { ...strategy, priorityScore: score };
  });
  
  // 상위 5개 선정
  return prioritizedStrategies
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 5)
    .map((strategy, index) => ({
      rank: index + 1,
      ...strategy,
      implementation: generateImplementationPlan(strategy, appData)
    }));
}

// 헬퍼 함수들
function getCapabilityName(key) {
  const names = {
    aiUnderstanding: 'AI 이해 및 활용 전략',
    dataManagement: '데이터 관리 및 분석',
    processOptimization: '프로세스 혁신 및 자동화',
    talentDevelopment: '인재 육성 및 조직 문화',
    customerExperience: '고객 경험 및 가치 창출'
  };
  return names[key] || key;
}

function isStrategicMatch(strength, opportunity) {
  // 전략적 매칭 로직
  if (strength.type === 'capability' && opportunity.type === 'market') return true;
  if (strength.type === 'business' && opportunity.type === 'growth') return true;
  if (strength.type === 'leadership' && opportunity.type === 'funding') return true;
  return false;
}

function calculateStrategyPriority(factor1, factor2) {
  const scoreMap = {
    high: 3, critical: 3,
    medium: 2,
    low: 1
  };
  return (scoreMap[factor1] || 1) * (scoreMap[factor2] || 1);
}

function generateActionPlan(strength, opportunity, appData) {
  return `1) ${strength.area} 역량을 기반으로 전담팀 구성
2) ${opportunity.timeframe} 내 ${opportunity.area} 진입 전략 수립
3) 파일럿 프로젝트 실행 및 성과 측정
4) 성공 사례 기반 전사 확산`;
}

function generateWeaknessImprovementPlan(weakness, opportunity, appData) {
  return `1) ${opportunity.area} 활용하여 즉시 자금/자원 확보
2) ${weakness.area} 개선을 위한 전문가 영입 또는 교육
3) 3개월 내 집중 개선 프로그램 실행
4) 성과 측정 및 지속적 개선`;
}

function generateDefenseStrategy(strength, threat, appData) {
  return `1) ${strength.area} 중심의 차별화 포인트 강화
2) 고객 대상 가치 제안 명확화
3) 경쟁사 대비 우위 요소 지속적 개발
4) 브랜드 포지셔닝 강화`;
}

function generateSurvivalStrategy(weakness, threat, appData) {
  return `1) ${weakness.area} 최소 수준 확보 (Quick Fix)
2) 핵심 사업 영역 집중 및 비핵심 영역 축소
3) 전략적 파트너십을 통한 역량 보완
4) 단계적 개선 로드맵 수립`;
}

function generateExpectedResult(strategyType, factor1, factor2) {
  const results = {
    SO: '시장 점유율 확대 및 매출 30-40% 성장',
    WO: '핵심 역량 50% 향상 및 경쟁력 확보',
    ST: '시장 방어율 90% 및 차별화 우위 확보',
    WT: '생존 기반 확보 및 안정적 성장 준비'
  };
  return results[strategyType];
}

function estimateInvestment(strategyType, appData) {
  const baseInvestment = {
    SO: '5,000만원',
    WO: '3,000만원',
    ST: '2,000만원',
    WT: '1,000만원'
  };
  return baseInvestment[strategyType];
}

function calculateActionPriority(strategy, appData, evalData) {
  let score = strategy.priority || 5;
  
  // 긴급성 가중치
  if (strategy.timeline === '즉시 착수') score += 3;
  
  // 전략 유형 가중치
  if (strategy.type === 'WT') score += 5; // 생존 전략 최우선
  if (strategy.type === 'WO') score += 3; // 약점 보완 우선
  
  // 예상 효과 가중치
  if (strategy.expectedResult.includes('50%') || strategy.expectedResult.includes('40%')) score += 2;
  
  return score;
}

function generateImplementationPlan(strategy, appData) {
  return {
    week1_2: '현황 분석 및 팀 구성',
    week3_4: '세부 실행 계획 수립',
    month2: '파일럿 실행 및 초기 성과 측정',
    month3: '본격 실행 및 확산',
    ongoing: '지속적 모니터링 및 개선'
  };
}