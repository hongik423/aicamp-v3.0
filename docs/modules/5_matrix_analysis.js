// ================================================================================
// 📊 AICAMP AI 역량진단 시스템 - 매트릭스 분석 모듈
// ================================================================================

/**
 * AI 역량진단 매트릭스 생성
 */
function generateAICapabilityMatrix(evaluationData, applicationData) {
  console.log('📊 AI 역량 매트릭스 생성 시작');
  
  const matrix = {
    title: 'AI 역량진단 결과 매트릭스',
    dimensions: {
      x: {
        name: 'AI 활용 수준',
        description: 'AI 기술 이해도 및 활용 역량',
        min: 0,
        max: 100
      },
      y: {
        name: '비즈니스 영향도',
        description: 'AI가 비즈니스에 미치는 실질적 영향',
        min: 0,
        max: 100
      }
    },
    quadrants: defineQuadrants(),
    currentPosition: null,
    trajectory: null,
    recommendations: []
  };
  
  // 현재 위치 계산
  matrix.currentPosition = calculateMatrixPosition(evaluationData, applicationData);
  
  // 미래 궤적 예측
  matrix.trajectory = predictFutureTrajectory(matrix.currentPosition, applicationData);
  
  // 권장사항 생성
  matrix.recommendations = generateMatrixRecommendations(matrix.currentPosition, applicationData);
  
  console.log('✅ AI 역량 매트릭스 생성 완료');
  return matrix;
}

/**
 * 매트릭스 4분면 정의
 */
function defineQuadrants() {
  return {
    leaders: {
      name: 'AI 리더',
      position: { x: [70, 100], y: [70, 100] },
      description: 'AI 활용 수준과 비즈니스 영향도 모두 높음',
      characteristics: [
        '혁신적 AI 활용으로 시장 선도',
        '높은 ROI 달성',
        '지속적 AI 혁신',
        '업계 벤치마크'
      ],
      color: '#4CAF50',
      icon: '🏆'
    },
    potentials: {
      name: '잠재력 보유',
      position: { x: [0, 70], y: [70, 100] },
      description: 'AI 활용 수준은 낮지만 비즈니스 영향도 높음',
      characteristics: [
        '높은 성장 잠재력',
        'AI 투자 시 빠른 성과 예상',
        '전략적 지원 필요',
        '빠른 개선 가능'
      ],
      color: '#2196F3',
      icon: '🚀'
    },
    experimenters: {
      name: '실험 단계',
      position: { x: [70, 100], y: [0, 70] },
      description: 'AI 활용 수준은 높지만 비즈니스 영향도 낮음',
      characteristics: [
        '기술 중심 접근',
        'ROI 개선 필요',
        '비즈니스 연계 강화 필요',
        '전략 재정립 필요'
      ],
      color: '#FF9800',
      icon: '🔬'
    },
    beginners: {
      name: '초기 단계',
      position: { x: [0, 70], y: [0, 70] },
      description: 'AI 활용 수준과 비즈니스 영향도 모두 낮음',
      characteristics: [
        'AI 기초 구축 필요',
        '교육 우선 필요',
        '단계적 접근 필요',
        '장기적 관점 필요'
      ],
      color: '#9E9E9E',
      icon: '🌱'
    }
  };
}

/**
 * 매트릭스 상 현재 위치 계산
 */
function calculateMatrixPosition(evalData, appData) {
  // X축: AI 활용 수준
  const aiLevel = calculateAILevel(evalData);
  
  // Y축: 비즈니스 영향도
  const businessImpact = calculateBusinessImpact(evalData, appData);
  
  // 현재 분면 판단
  const quadrant = determineQuadrant(aiLevel, businessImpact);
  
  return {
    coordinates: {
      x: aiLevel,
      y: businessImpact
    },
    quadrant: quadrant,
    interpretation: generatePositionInterpretation(quadrant, aiLevel, businessImpact, appData)
  };
}

/**
 * AI 활용 수준 계산
 */
function calculateAILevel(evalData) {
  const scores = evalData.scores;
  
  // AI 역량 점수 (70% 가중치)
  const aiCapabilityScore = scores.aiCapability.average * 0.7;
  
  // 실무 활용 점수 (30% 가중치)
  const practicalScore = scores.practicalCapability.average * 0.3;
  
  return Math.round(aiCapabilityScore + practicalScore);
}

/**
 * 비즈니스 영향도 계산
 */
function calculateBusinessImpact(evalData, appData) {
  let impact = 50; // 기본값
  
  // 1. 예상 혜택 기반 (30%)
  if (appData.expectedBenefits) {
    const benefits = appData.expectedBenefits.toLowerCase();
    if (benefits.includes('매출') || benefits.includes('성장')) impact += 10;
    if (benefits.includes('비용') || benefits.includes('절감')) impact += 8;
    if (benefits.includes('효율') || benefits.includes('생산성')) impact += 7;
    if (benefits.includes('고객') || benefits.includes('만족')) impact += 5;
  }
  
  // 2. 현재 AI 활용 성과 (20%)
  if (appData.currentAIUsage && appData.currentAIUsage !== '사용안함') {
    impact += 10;
    if (appData.aiToolsList && appData.aiToolsList.split(',').length > 2) {
      impact += 5;
    }
  }
  
  // 3. 업종별 AI 영향도 (20%)
  const industryImpact = {
    'IT/소프트웨어': 15,
    '금융업': 12,
    '제조업': 10,
    '유통/도소매': 10,
    '의료/헬스케어': 12,
    '서비스업': 8,
    '교육': 7,
    '기타': 5
  };
  impact += industryImpact[appData.industry] || 5;
  
  // 4. 조직 준비도 (15%)
  if (appData.decisionMaker && appData.decisionMaker.includes('대표')) impact += 8;
  if (appData.budgetRange && appData.budgetRange !== '미정') impact += 7;
  
  // 5. 점수 조정 (15%)
  const totalScore = evalData.scores.totalScore;
  if (totalScore >= 80) impact += 10;
  else if (totalScore >= 60) impact += 5;
  else if (totalScore < 40) impact -= 10;
  
  return Math.min(100, Math.max(0, impact));
}

/**
 * 분면 판단
 */
function determineQuadrant(x, y) {
  if (x >= 70 && y >= 70) return 'leaders';
  if (x < 70 && y >= 70) return 'potentials';
  if (x >= 70 && y < 70) return 'experimenters';
  return 'beginners';
}

/**
 * 위치 해석 생성
 */
function generatePositionInterpretation(quadrant, x, y, appData) {
  const interpretations = {
    leaders: `${appData.companyName}는 AI 활용 수준(${x}점)과 비즈니스 영향도(${y}점) 모두에서 우수한 성과를 보이고 있습니다. 업계를 선도하는 AI 리더로서의 위치를 확고히 하고 있습니다.`,
    
    potentials: `${appData.companyName}는 높은 비즈니스 영향도(${y}점)를 보이지만 AI 활용 수준(${x}점)은 개선이 필요합니다. AI 역량 강화 시 빠른 성장이 예상됩니다.`,
    
    experimenters: `${appData.companyName}는 AI 활용 수준(${x}점)은 높지만 비즈니스 영향도(${y}점)가 상대적으로 낮습니다. AI 투자의 비즈니스 가치 연계 강화가 필요합니다.`,
    
    beginners: `${appData.companyName}는 AI 활용 수준(${x}점)과 비즈니스 영향도(${y}점) 모두 개선이 필요합니다. 체계적인 AI 도입 전략 수립이 시급합니다.`
  };
  
  return interpretations[quadrant];
}

/**
 * 미래 궤적 예측
 */
function predictFutureTrajectory(currentPosition, appData) {
  const trajectory = {
    sixMonths: { x: 0, y: 0 },
    oneYear: { x: 0, y: 0 },
    twoYears: { x: 0, y: 0 },
    factors: [],
    confidence: 'medium'
  };
  
  // 성장 요인 분석
  const growthFactors = analyzeGrowthFactors(appData);
  
  // 6개월 후 예측
  trajectory.sixMonths = {
    x: Math.min(100, currentPosition.coordinates.x + growthFactors.aiGrowth * 0.5),
    y: Math.min(100, currentPosition.coordinates.y + growthFactors.businessGrowth * 0.5)
  };
  
  // 1년 후 예측
  trajectory.oneYear = {
    x: Math.min(100, currentPosition.coordinates.x + growthFactors.aiGrowth),
    y: Math.min(100, currentPosition.coordinates.y + growthFactors.businessGrowth)
  };
  
  // 2년 후 예측
  trajectory.twoYears = {
    x: Math.min(100, currentPosition.coordinates.x + growthFactors.aiGrowth * 1.5),
    y: Math.min(100, currentPosition.coordinates.y + growthFactors.businessGrowth * 1.5)
  };
  
  trajectory.factors = growthFactors.factors;
  trajectory.confidence = calculateConfidence(growthFactors);
  
  return trajectory;
}

/**
 * 성장 요인 분석
 */
function analyzeGrowthFactors(appData) {
  const factors = [];
  let aiGrowth = 10; // 기본 성장률
  let businessGrowth = 8;
  
  // 긍정적 요인
  if (appData.aiInvestmentPlan && appData.aiInvestmentPlan !== '없음') {
    aiGrowth += 5;
    factors.push({ type: 'positive', factor: 'AI 투자 계획 보유', impact: 'high' });
  }
  
  if (appData.decisionMaker && appData.decisionMaker.includes('대표')) {
    aiGrowth += 3;
    businessGrowth += 5;
    factors.push({ type: 'positive', factor: '경영진 의지', impact: 'high' });
  }
  
  if (appData.currentAIUsage !== '사용안함') {
    aiGrowth += 3;
    factors.push({ type: 'positive', factor: 'AI 도입 경험', impact: 'medium' });
  }
  
  // 부정적 요인
  if (!appData.budgetRange || appData.budgetRange === '미정') {
    aiGrowth -= 3;
    factors.push({ type: 'negative', factor: '예산 미확정', impact: 'medium' });
  }
  
  if (appData.employeeCount && parseInt(appData.employeeCount) < 20) {
    aiGrowth -= 2;
    factors.push({ type: 'negative', factor: '소규모 조직', impact: 'low' });
  }
  
  return {
    aiGrowth: Math.max(0, aiGrowth),
    businessGrowth: Math.max(0, businessGrowth),
    factors: factors
  };
}

/**
 * 신뢰도 계산
 */
function calculateConfidence(growthFactors) {
  const positiveFactors = growthFactors.factors.filter(f => f.type === 'positive').length;
  const totalFactors = growthFactors.factors.length;
  
  if (positiveFactors / totalFactors >= 0.7) return 'high';
  if (positiveFactors / totalFactors >= 0.4) return 'medium';
  return 'low';
}

/**
 * 매트릭스 기반 권장사항 생성
 */
function generateMatrixRecommendations(position, appData) {
  const recommendations = {
    leaders: [
      {
        priority: 'high',
        area: 'AI 혁신 리더십',
        action: 'AI 혁신 리더십 유지 및 강화',
        details: '업계 최고 수준의 AI 역량을 바탕으로 신규 AI 기술 조기 도입 및 혁신 주도',
        timeline: '지속적',
        expectedOutcome: '시장 리더십 강화'
      },
      {
        priority: 'medium',
        area: '생태계 주도',
        action: 'AI 생태계 구축 및 파트너십 확대',
        details: 'AI 성공 사례 공유, 파트너사 AI 역량 강화 지원',
        timeline: '6개월',
        expectedOutcome: '생태계 영향력 확대'
      },
      {
        priority: 'medium',
        area: '인재 육성',
        action: '차세대 AI 인재 육성 투자',
        details: '내부 AI 전문가 양성 및 외부 인재 영입',
        timeline: '1년',
        expectedOutcome: '지속가능한 AI 역량'
      }
    ],
    
    potentials: [
      {
        priority: 'critical',
        area: 'AI 역량 강화',
        action: 'AI 역량 긴급 강화 프로그램',
        details: 'AI 기초 교육, 전문가 영입, 파일럿 프로젝트 실행',
        timeline: '3개월',
        expectedOutcome: 'AI 활용 수준 20점 향상'
      },
      {
        priority: 'high',
        area: 'Quick Win',
        action: '검증된 AI 솔루션 빠른 도입',
        details: '즉시 적용 가능한 AI 도구 도입으로 빠른 성과 창출',
        timeline: '1개월',
        expectedOutcome: '단기 성과 가시화'
      },
      {
        priority: 'high',
        area: '전문가 지원',
        action: '외부 AI 전문가 지원 확보',
        details: 'AICAMP 등 전문 기관과의 파트너십',
        timeline: '즉시',
        expectedOutcome: '전문성 확보'
      }
    ],
    
    experimenters: [
      {
        priority: 'critical',
        area: 'ROI 개선',
        action: 'AI 투자 대비 ROI 개선 전략',
        details: '비즈니스 KPI와 AI 프로젝트 연계 강화',
        timeline: '3개월',
        expectedOutcome: 'ROI 50% 개선'
      },
      {
        priority: 'high',
        area: '비즈니스 연계',
        action: '비즈니스 중심 AI 활용 재설계',
        details: '고객 가치 중심의 AI 서비스 개발',
        timeline: '6개월',
        expectedOutcome: '비즈니스 영향도 향상'
      },
      {
        priority: 'medium',
        area: '성과 측정',
        action: 'AI 성과 측정 체계 구축',
        details: '명확한 KPI 설정 및 대시보드 구축',
        timeline: '2개월',
        expectedOutcome: '성과 가시화'
      }
    ],
    
    beginners: [
      {
        priority: 'critical',
        area: 'AI 기초',
        action: 'AI 기초 교육 및 인식 개선',
        details: '전직원 AI 기초 교육, 경영진 AI 리더십 교육',
        timeline: '1개월',
        expectedOutcome: 'AI 이해도 향상'
      },
      {
        priority: 'high',
        area: '파일럿',
        action: '소규모 파일럿 프로젝트',
        details: '저위험 고효과 영역에서 AI 파일럿 실행',
        timeline: '3개월',
        expectedOutcome: '초기 성공 사례'
      },
      {
        priority: 'high',
        area: '정부 지원',
        action: '정부 지원 사업 활용',
        details: 'AI 바우처 등 정부 지원금 신청',
        timeline: '즉시',
        expectedOutcome: '재무 부담 경감'
      }
    ]
  };
  
  return recommendations[position.quadrant] || recommendations.beginners;
}

/**
 * 3D AI 역량 매트릭스 생성 (고급)
 */
function generate3DCapabilityMatrix(evaluationData, applicationData) {
  console.log('📊 3D AI 역량 매트릭스 생성 시작');
  
  const matrix3D = {
    title: '3D AI 역량 매트릭스',
    dimensions: {
      x: {
        name: 'AI 기술 역량',
        description: 'AI 기술 이해 및 활용 능력',
        value: evaluationData.scores.aiCapability.average
      },
      y: {
        name: '비즈니스 가치 창출',
        description: '실질적 비즈니스 성과',
        value: calculateBusinessImpact(evaluationData, applicationData)
      },
      z: {
        name: '조직 준비도',
        description: '조직의 AI 수용 및 실행 역량',
        value: calculateOrganizationalReadiness(evaluationData, applicationData)
      }
    },
    position: null,
    space: null,
    trajectory: null
  };
  
  // 3D 공간에서의 위치
  matrix3D.position = {
    x: matrix3D.dimensions.x.value,
    y: matrix3D.dimensions.y.value,
    z: matrix3D.dimensions.z.value
  };
  
  // 3D 공간 분류
  matrix3D.space = determine3DSpace(matrix3D.position);
  
  // 3D 궤적 예측
  matrix3D.trajectory = predict3DTrajectory(matrix3D.position, applicationData);
  
  console.log('✅ 3D AI 역량 매트릭스 생성 완료');
  return matrix3D;
}

/**
 * 조직 준비도 계산
 */
function calculateOrganizationalReadiness(evalData, appData) {
  let readiness = 50;
  
  // 리더십 요인 (30%)
  if (appData.decisionMaker && appData.decisionMaker.includes('대표')) readiness += 15;
  else if (appData.decisionMaker && appData.decisionMaker.includes('임원')) readiness += 8;
  
  // 인재 역량 (25%)
  const talentScore = evalData.scores.aiCapability.scores.talentDevelopment || 50;
  readiness += (talentScore / 100) * 25;
  
  // 예산 준비도 (20%)
  if (appData.budgetRange && appData.budgetRange !== '미정') readiness += 10;
  if (appData.aiInvestmentPlan && appData.aiInvestmentPlan !== '없음') readiness += 10;
  
  // 변화 관리 역량 (15%)
  if (appData.currentAIUsage !== '사용안함') readiness += 10;
  if (appData.employeeCount && parseInt(appData.employeeCount) > 50) readiness += 5;
  
  // 문화적 준비도 (10%)
  if (appData.mainChallenges && appData.mainChallenges.includes('혁신')) readiness += 5;
  if (appData.expectedBenefits) readiness += 5;
  
  return Math.min(100, Math.max(0, readiness));
}

/**
 * 3D 공간 분류
 */
function determine3DSpace(position) {
  const { x, y, z } = position;
  
  if (x >= 70 && y >= 70 && z >= 70) return 'champions';      // AI 챔피언
  if (x >= 70 && y >= 70 && z < 70) return 'performers';      // 성과 창출자
  if (x >= 70 && y < 70 && z >= 70) return 'prepared';        // 준비된 조직
  if (x < 70 && y >= 70 && z >= 70) return 'highPotential';   // 높은 잠재력
  if (x >= 70 && y < 70 && z < 70) return 'technical';        // 기술 중심
  if (x < 70 && y >= 70 && z < 70) return 'valuable';         // 가치 중심
  if (x < 70 && y < 70 && z >= 70) return 'ready';           // 준비 단계
  return 'developing';                                         // 개발 필요
}

/**
 * 3D 궤적 예측
 */
function predict3DTrajectory(position, appData) {
  const growthRates = {
    x: calculateDimensionGrowth('technical', appData),
    y: calculateDimensionGrowth('business', appData),
    z: calculateDimensionGrowth('organizational', appData)
  };
  
  return {
    sixMonths: {
      x: Math.min(100, position.x + growthRates.x * 0.5),
      y: Math.min(100, position.y + growthRates.y * 0.5),
      z: Math.min(100, position.z + growthRates.z * 0.5)
    },
    oneYear: {
      x: Math.min(100, position.x + growthRates.x),
      y: Math.min(100, position.y + growthRates.y),
      z: Math.min(100, position.z + growthRates.z)
    },
    growthRates: growthRates
  };
}

/**
 * 차원별 성장률 계산
 */
function calculateDimensionGrowth(dimension, appData) {
  let growth = 10; // 기본 성장률
  
  switch (dimension) {
    case 'technical':
      if (appData.currentAIUsage !== '사용안함') growth += 5;
      if (appData.consultingArea && appData.consultingArea.includes('AI')) growth += 3;
      break;
      
    case 'business':
      if (appData.expectedBenefits) growth += 5;
      if (appData.mainChallenges) growth += 3;
      break;
      
    case 'organizational':
      if (appData.decisionMaker && appData.decisionMaker.includes('대표')) growth += 5;
      if (appData.budgetRange && appData.budgetRange !== '미정') growth += 3;
      break;
  }
  
  return growth;
}

/**
 * 중요도-긴급성 매트릭스 생성
 */
function generateImportanceUrgencyMatrix(swotStrategies, evaluationData, applicationData) {
  console.log('📊 중요도-긴급성 매트릭스 생성 시작');
  
  const tasks = extractAllTasks(swotStrategies, evaluationData, applicationData);
  const evaluatedTasks = tasks.map(task => evaluateTask(task, evaluationData, applicationData));
  
  const matrix = {
    title: '중요도-긴급성 매트릭스',
    dimensions: {
      x: { name: '긴급성', min: 0, max: 100 },
      y: { name: '중요도', min: 0, max: 100 }
    },
    quadrants: {
      doFirst: {
        name: '즉시 실행',
        description: '중요도 높음 + 긴급성 높음',
        tasks: evaluatedTasks.filter(t => t.importance >= 70 && t.urgency >= 70),
        color: '#F44336'
      },
      schedule: {
        name: '계획 수립',
        description: '중요도 높음 + 긴급성 낮음',
        tasks: evaluatedTasks.filter(t => t.importance >= 70 && t.urgency < 70),
        color: '#2196F3'
      },
      delegate: {
        name: '위임 검토',
        description: '중요도 낮음 + 긴급성 높음',
        tasks: evaluatedTasks.filter(t => t.importance < 70 && t.urgency >= 70),
        color: '#FF9800'
      },
      eliminate: {
        name: '재검토',
        description: '중요도 낮음 + 긴급성 낮음',
        tasks: evaluatedTasks.filter(t => t.importance < 70 && t.urgency < 70),
        color: '#9E9E9E'
      }
    },
    executionPriority: []
  };
  
  // 실행 우선순위 도출
  matrix.executionPriority = [
    ...matrix.quadrants.doFirst.tasks.slice(0, 3),
    ...matrix.quadrants.schedule.tasks.slice(0, 2),
    ...matrix.quadrants.delegate.tasks.slice(0, 1)
  ].sort((a, b) => b.priorityScore - a.priorityScore);
  
  console.log('✅ 중요도-긴급성 매트릭스 생성 완료');
  return matrix;
}

/**
 * 모든 과제 추출
 */
function extractAllTasks(swotStrategies, evalData, appData) {
  const tasks = [];
  
  // SWOT 전략에서 과제 추출
  Object.values(swotStrategies).forEach(strategyList => {
    strategyList.forEach(strategy => {
      tasks.push({
        source: 'swot',
        type: strategy.type,
        name: strategy.strategy,
        description: strategy.description,
        action: strategy.action,
        expectedResult: strategy.expectedResult,
        timeline: strategy.timeline
      });
    });
  });
  
  // 평가 결과에서 개선 과제 추출
  if (evalData.scores.totalScore < 60) {
    tasks.push({
      source: 'evaluation',
      type: 'improvement',
      name: 'AI 기초 역량 강화',
      description: 'AI 이해도 및 기초 역량 향상 필요',
      action: '전직원 AI 교육 프로그램 실시',
      expectedResult: 'AI 역량 점수 20점 향상',
      timeline: '3개월'
    });
  }
  
  // 주요 고민사항 기반 과제
  if (appData.mainChallenges) {
    tasks.push({
      source: 'challenges',
      type: 'solution',
      name: '핵심 문제 해결',
      description: appData.mainChallenges,
      action: 'AI 기반 솔루션 도입',
      expectedResult: '문제 해결 및 효율성 향상',
      timeline: '6개월'
    });
  }
  
  return tasks;
}

/**
 * 과제 평가
 */
function evaluateTask(task, evalData, appData) {
  let importance = 50;
  let urgency = 50;
  let feasibility = 50;
  
  // 중요도 평가
  if (task.expectedResult.includes('매출') || task.expectedResult.includes('성장')) {
    importance += 30;
  }
  if (task.source === 'challenges') {
    importance += 20;
  }
  if (task.type === 'WT' || task.type === 'WO') {
    importance += 15;
  }
  
  // 긴급성 평가
  if (task.timeline === '즉시' || task.timeline === '1개월') {
    urgency += 30;
  } else if (task.timeline === '3개월') {
    urgency += 20;
  }
  
  if (evalData.scores.totalScore < 50) {
    urgency += 20;
  }
  
  if (task.type === 'WT') {
    urgency += 25; // 생존 전략은 가장 긴급
  }
  
  // 실행용이성 평가
  if (task.action.includes('파일럿') || task.action.includes('테스트')) {
    feasibility += 20;
  }
  if (appData.currentAIUsage !== '사용안함') {
    feasibility += 10;
  }
  if (appData.budgetRange && appData.budgetRange !== '미정') {
    feasibility += 15;
  }
  
  const priorityScore = (importance * 0.4) + (urgency * 0.4) + (feasibility * 0.2);
  
  return {
    ...task,
    importance: Math.min(100, importance),
    urgency: Math.min(100, urgency),
    feasibility: Math.min(100, feasibility),
    priorityScore: Math.round(priorityScore)
  };
}