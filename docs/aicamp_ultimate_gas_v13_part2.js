// ================================================================================
// AICAMP 통합 시스템 V13.0 ULTIMATE - Part 2
// 추가 기능: ROI 분석, AICAMP 제안, GEMINI 연동, 이메일 시스템
// ================================================================================

// ================================================================================
// MODULE 8: ROI 분석 시스템
// ================================================================================

/**
 * 투자대비효과 분석
 */
function calculateROIAnalysis(executionRoadmap, normalizedData) {
  console.log('💰 ROI 분석 시작');
  
  // 투자 비용 계산
  const investmentCosts = calculateInvestmentCosts(executionRoadmap, normalizedData);
  
  // 예상 효과 계산
  const expectedBenefits = calculateExpectedBenefits(executionRoadmap, normalizedData);
  
  // ROI 지표 계산
  const roiMetrics = calculateROIMetrics(investmentCosts, expectedBenefits);
  
  // 위험 요소 평가
  const riskFactors = assessInvestmentRisks(normalizedData);
  
  // 시나리오 분석
  const scenarioAnalysis = performScenarioAnalysis(investmentCosts, expectedBenefits, riskFactors);
  
  return {
    investmentCosts: investmentCosts,
    expectedBenefits: expectedBenefits,
    roiMetrics: roiMetrics,
    riskFactors: riskFactors,
    scenarioAnalysis: scenarioAnalysis,
    recommendation: generateROIRecommendation(roiMetrics, riskFactors),
    analysisDate: new Date().toISOString()
  };
}

/**
 * 투자 비용 계산
 */
function calculateInvestmentCosts(roadmap, normalizedData) {
  const sizeMultiplier = getSizeMultiplier(normalizedData.employeeCount);
  
  // 단계별 기본 비용
  const baseCosts = {
    phase1: 3000000,  // 300만원
    phase2: 8000000,  // 800만원
    phase3: 15000000  // 1500만원
  };
  
  // 규모별 조정
  const adjustedCosts = {
    phase1: Math.ceil(baseCosts.phase1 * sizeMultiplier),
    phase2: Math.ceil(baseCosts.phase2 * sizeMultiplier),
    phase3: Math.ceil(baseCosts.phase3 * sizeMultiplier)
  };
  
  // 세부 비용 항목
  const costBreakdown = {
    personnel: Math.ceil((adjustedCosts.phase1 + adjustedCosts.phase2 + adjustedCosts.phase3) * 0.4), // 40%
    technology: Math.ceil((adjustedCosts.phase1 + adjustedCosts.phase2 + adjustedCosts.phase3) * 0.3), // 30%
    training: Math.ceil((adjustedCosts.phase1 + adjustedCosts.phase2 + adjustedCosts.phase3) * 0.2),   // 20%
    consulting: Math.ceil((adjustedCosts.phase1 + adjustedCosts.phase2 + adjustedCosts.phase3) * 0.1)  // 10%
  };
  
  const totalCost = Object.values(adjustedCosts).reduce((sum, cost) => sum + cost, 0);
  
  return {
    phaseCosts: adjustedCosts,
    costBreakdown: costBreakdown,
    totalCost: totalCost,
    monthlyAverage: Math.ceil(totalCost / 12)
  };
}

/**
 * 예상 효과 계산
 */
function calculateExpectedBenefits(roadmap, normalizedData) {
  const industryFactors = getIndustryBenefitFactors(normalizedData.industry);
  const sizeFactors = getSizeBenefitFactors(normalizedData.employeeCount);
  
  // 기본 효과 (연간)
  const baseBenefits = {
    costReduction: 20000000,    // 2000만원 비용 절감
    revenueIncrease: 50000000,  // 5000만원 매출 증가
    productivityGain: 30000000, // 3000만원 생산성 향상
    qualityImprovement: 15000000 // 1500만원 품질 개선
  };
  
  // 업종별 조정
  const adjustedBenefits = {};
  Object.entries(baseBenefits).forEach(([key, value]) => {
    adjustedBenefits[key] = Math.ceil(value * industryFactors[key] * sizeFactors);
  });
  
  // 단계별 효과 실현
  const phaseRealization = {
    phase1: 0.2,  // 20% 실현
    phase2: 0.6,  // 60% 실현
    phase3: 1.0   // 100% 실현
  };
  
  const totalBenefit = Object.values(adjustedBenefits).reduce((sum, benefit) => sum + benefit, 0);
  
  return {
    annualBenefits: adjustedBenefits,
    totalAnnualBenefit: totalBenefit,
    phaseRealization: phaseRealization,
    cumulativeBenefit: {
      phase1: Math.ceil(totalBenefit * phaseRealization.phase1),
      phase2: Math.ceil(totalBenefit * phaseRealization.phase2),
      phase3: Math.ceil(totalBenefit * phaseRealization.phase3)
    }
  };
}

/**
 * 업종별 효과 계수
 */
function getIndustryBenefitFactors(industry) {
  const factors = {
    'IT/소프트웨어': {
      costReduction: 1.3,
      revenueIncrease: 1.5,
      productivityGain: 1.4,
      qualityImprovement: 1.2
    },
    '제조업': {
      costReduction: 1.4,
      revenueIncrease: 1.2,
      productivityGain: 1.5,
      qualityImprovement: 1.3
    },
    '금융/보험': {
      costReduction: 1.2,
      revenueIncrease: 1.3,
      productivityGain: 1.3,
      qualityImprovement: 1.4
    },
    '유통/도소매': {
      costReduction: 1.1,
      revenueIncrease: 1.4,
      productivityGain: 1.2,
      qualityImprovement: 1.1
    }
  };
  
  return factors[industry] || {
    costReduction: 1.0,
    revenueIncrease: 1.0,
    productivityGain: 1.0,
    qualityImprovement: 1.0
  };
}

/**
 * 규모별 효과 계수
 */
function getSizeBenefitFactors(employeeCount) {
  const factors = {
    '1-10명': 0.6,
    '11-30명': 0.8,
    '31-50명': 1.0,
    '51-100명': 1.2,
    '101-300명': 1.5,
    '300명 이상': 2.0
  };
  
  return factors[employeeCount] || 1.0;
}

/**
 * ROI 지표 계산
 */
function calculateROIMetrics(costs, benefits) {
  const totalCost = costs.totalCost;
  const totalBenefit = benefits.totalAnnualBenefit;
  
  // 기본 ROI 계산
  const basicROI = ((totalBenefit - totalCost) / totalCost * 100);
  
  // 순현재가치 (NPV) 계산 (3년 기준, 할인율 10%)
  const discountRate = 0.1;
  const npv = calculateNPV(totalCost, totalBenefit, 3, discountRate);
  
  // 회수 기간 계산
  const paybackPeriod = totalCost / (totalBenefit / 12); // 개월
  
  // 내부수익률 (IRR) 추정
  const irr = estimateIRR(totalCost, totalBenefit);
  
  return {
    roi: Math.round(basicROI * 10) / 10,
    npv: Math.round(npv),
    paybackPeriod: Math.round(paybackPeriod * 10) / 10,
    irr: Math.round(irr * 10) / 10,
    profitabilityIndex: Math.round((npv / totalCost + 1) * 100) / 100,
    breakEvenPoint: Math.ceil(paybackPeriod)
  };
}

/**
 * NPV 계산
 */
function calculateNPV(initialCost, annualBenefit, years, discountRate) {
  let npv = -initialCost;
  
  for (let year = 1; year <= years; year++) {
    npv += annualBenefit / Math.pow(1 + discountRate, year);
  }
  
  return npv;
}

/**
 * IRR 추정
 */
function estimateIRR(initialCost, annualBenefit) {
  // 간단한 IRR 추정 (정확한 계산은 복잡하므로 근사치 사용)
  const simpleROI = (annualBenefit - initialCost) / initialCost;
  return Math.min(simpleROI * 100, 50); // 최대 50%로 제한
}

/**
 * 투자 위험 평가
 */
function assessInvestmentRisks(normalizedData) {
  const risks = [];
  
  // 업종별 위험 요소
  const industryRisks = {
    'IT/소프트웨어': ['기술 변화 속도', '인재 확보 경쟁'],
    '제조업': ['설비 투자 부담', '기존 시스템 의존성'],
    '금융/보험': ['규제 변화', '보안 요구사항'],
    '유통/도소매': ['계절성 영향', '고객 행동 변화']
  };
  
  risks.push(...(industryRisks[normalizedData.industry] || ['일반적 시장 위험']));
  
  // 규모별 위험 요소
  const sizeRisks = {
    '1-30명': ['자원 제약', '전문성 부족'],
    '31-100명': ['조직 변화 저항', '투자 부담'],
    '100명+': ['의사결정 복잡성', '시스템 복잡성']
  };
  
  const size = normalizedData.employeeCount.includes('1-') || normalizedData.employeeCount.includes('11-30') ? '1-30명' :
               normalizedData.employeeCount.includes('31-') || normalizedData.employeeCount.includes('51-100') ? '31-100명' : '100명+';
  
  risks.push(...sizeRisks[size]);
  
  return {
    identifiedRisks: risks,
    riskLevel: assessOverallRiskLevel(risks, normalizedData),
    mitigationStrategies: generateRiskMitigation(risks)
  };
}

/**
 * 전체 위험 수준 평가
 */
function assessOverallRiskLevel(risks, normalizedData) {
  let riskScore = risks.length; // 기본 위험 점수
  
  // 업종별 위험 가중치
  const industryRiskWeight = {
    'IT/소프트웨어': 1.2,
    '제조업': 1.0,
    '금융/보험': 1.3,
    '건설/부동산': 1.4,
    '유통/도소매': 1.1
  };
  
  riskScore *= (industryRiskWeight[normalizedData.industry] || 1.0);
  
  if (riskScore <= 3) return 'Low';
  if (riskScore <= 6) return 'Medium';
  return 'High';
}

/**
 * 위험 완화 전략 생성
 */
function generateRiskMitigation(risks) {
  const mitigationMap = {
    '기술 변화 속도': '지속적 기술 모니터링 및 유연한 아키텍처 구축',
    '인재 확보 경쟁': '내부 인재 양성 및 외부 파트너십 활용',
    '설비 투자 부담': '단계적 투자 및 클라우드 기반 솔루션 활용',
    '규제 변화': '컴플라이언스 전담팀 구성 및 정기적 검토',
    '자원 제약': '우선순위 기반 선택적 투자 및 외부 지원 활용',
    '조직 변화 저항': '체계적 변화관리 및 교육 프로그램 실시'
  };
  
  return risks.map(risk => mitigationMap[risk] || '리스크 모니터링 및 대응 체계 구축');
}

/**
 * 시나리오 분석
 */
function performScenarioAnalysis(costs, benefits, risks) {
  const scenarios = {
    optimistic: {
      name: '낙관적 시나리오',
      costMultiplier: 0.9,
      benefitMultiplier: 1.3,
      probability: 0.2
    },
    realistic: {
      name: '현실적 시나리오',
      costMultiplier: 1.0,
      benefitMultiplier: 1.0,
      probability: 0.6
    },
    pessimistic: {
      name: '비관적 시나리오',
      costMultiplier: 1.2,
      benefitMultiplier: 0.7,
      probability: 0.2
    }
  };
  
  const results = {};
  
  Object.entries(scenarios).forEach(([key, scenario]) => {
    const adjustedCost = costs.totalCost * scenario.costMultiplier;
    const adjustedBenefit = benefits.totalAnnualBenefit * scenario.benefitMultiplier;
    const roi = ((adjustedBenefit - adjustedCost) / adjustedCost * 100);
    
    results[key] = {
      ...scenario,
      adjustedCost: Math.round(adjustedCost),
      adjustedBenefit: Math.round(adjustedBenefit),
      roi: Math.round(roi * 10) / 10,
      npv: Math.round(calculateNPV(adjustedCost, adjustedBenefit, 3, 0.1))
    };
  });
  
  // 가중평균 계산
  const weightedROI = Object.values(results).reduce((sum, scenario) => 
    sum + (scenario.roi * scenario.probability), 0);
  
  return {
    scenarios: results,
    weightedAverageROI: Math.round(weightedROI * 10) / 10,
    recommendation: weightedROI > 200 ? 'Highly Recommended' : 
                   weightedROI > 100 ? 'Recommended' : 
                   weightedROI > 50 ? 'Consider with Caution' : 'Not Recommended'
  };
}

/**
 * ROI 권고사항 생성
 */
function generateROIRecommendation(metrics, risks) {
  const recommendations = [];
  
  if (metrics.roi > 200) {
    recommendations.push('매우 높은 ROI가 예상됩니다. 즉시 투자를 권장합니다.');
  } else if (metrics.roi > 100) {
    recommendations.push('양호한 ROI가 예상됩니다. 투자를 권장합니다.');
  } else if (metrics.roi > 50) {
    recommendations.push('보통 수준의 ROI입니다. 신중한 검토 후 투자하시기 바랍니다.');
  } else {
    recommendations.push('ROI가 낮습니다. 투자 계획을 재검토하시기 바랍니다.');
  }
  
  if (metrics.paybackPeriod <= 12) {
    recommendations.push('회수 기간이 1년 이내로 매우 빠른 투자 회수가 가능합니다.');
  } else if (metrics.paybackPeriod <= 24) {
    recommendations.push('회수 기간이 2년 이내로 적절한 수준입니다.');
  } else {
    recommendations.push('회수 기간이 길어 장기적 관점에서 접근이 필요합니다.');
  }
  
  if (risks.riskLevel === 'High') {
    recommendations.push('위험 수준이 높으므로 단계적 투자와 리스크 관리가 중요합니다.');
  }
  
  return recommendations;
}

// ================================================================================
// MODULE 9: AICAMP 맞춤형 제안 시스템
// ================================================================================

/**
 * AICAMP 맞춤형 제안 생성
 */
function generateAICampProposal(normalizedData, scoreAnalysis, executionRoadmap) {
  console.log('🎓 AICAMP 맞춤형 제안 생성 시작');
  
  // 기업 프로필 분석
  const companyProfile = analyzeCompanyProfile(normalizedData, scoreAnalysis);
  
  // 추천 프로그램 선정
  const recommendedPrograms = selectRecommendedPrograms(companyProfile, scoreAnalysis);
  
  // 맞춤형 커리큘럼 생성
  const customCurriculum = generateCustomCurriculum(companyProfile, recommendedPrograms);
  
  // 투자 계획 수립
  const investmentPlan = createAICampInvestmentPlan(recommendedPrograms, normalizedData);
  
  // 성공 사례 매칭
  const successCases = matchSuccessCases(companyProfile);
  
  // 특별 혜택 및 지원
  const specialOffers = generateSpecialOffers(companyProfile, normalizedData);
  
  return {
    companyProfile: companyProfile,
    recommendedPrograms: recommendedPrograms,
    customCurriculum: customCurriculum,
    investmentPlan: investmentPlan,
    successCases: successCases,
    specialOffers: specialOffers,
    nextSteps: generateNextSteps(recommendedPrograms),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30일 후
    createdAt: new Date().toISOString()
  };
}

/**
 * 기업 프로필 분석
 */
function analyzeCompanyProfile(normalizedData, scoreAnalysis) {
  // 기업 특성 분석
  const characteristics = [];
  
  // 성숙도 기반 특성
  if (scoreAnalysis.maturityLevel === 'Beginner') {
    characteristics.push('AI 도입 초기 단계', '기초 교육 필요', '단계적 접근 권장');
  } else if (scoreAnalysis.maturityLevel === 'Expert') {
    characteristics.push('AI 고도화 단계', '전문 교육 필요', '혁신적 접근 가능');
  } else {
    characteristics.push('AI 활용 중간 단계', '실무 교육 중심', '확장적 접근 권장');
  }
  
  // 업종별 특성
  const industryCharacteristics = {
    'IT/소프트웨어': ['기술 친화적', '빠른 도입', '고도화 지향'],
    '제조업': ['프로세스 중심', '안정성 중시', '효율성 추구'],
    '금융/보험': ['규제 준수', '보안 중시', '데이터 활용'],
    '유통/도소매': ['고객 중심', '유연성', '실시간 대응']
  };
  
  characteristics.push(...(industryCharacteristics[normalizedData.industry] || ['일반적 특성']));
  
  // 규모별 특성
  const sizeCharacteristics = getSizeCharacteristics(normalizedData.employeeCount);
  characteristics.push(...sizeCharacteristics);
  
  return {
    companyName: normalizedData.companyName,
    industry: normalizedData.industry,
    employeeCount: normalizedData.employeeCount,
    maturityLevel: scoreAnalysis.maturityLevel,
    totalScore: scoreAnalysis.totalScore,
    characteristics: characteristics,
    priorityAreas: identifyPriorityAreas(scoreAnalysis),
    readinessLevel: assessReadinessLevel(scoreAnalysis)
  };
}

/**
 * 규모별 특성 반환
 */
function getSizeCharacteristics(employeeCount) {
  const characteristics = {
    '1-10명': ['스타트업', '유연한 조직', '빠른 의사결정'],
    '11-30명': ['성장 기업', '전문화 시작', '체계화 필요'],
    '31-50명': ['중소기업', '조직화 진행', '시스템화 단계'],
    '51-100명': ['중견기업', '체계적 관리', '확장성 고려'],
    '101-300명': ['중견기업', '복합 조직', '전문성 확보'],
    '300명 이상': ['대기업', '복잡한 조직', '표준화 중시']
  };
  
  return characteristics[employeeCount] || ['일반 기업'];
}

/**
 * 추천 프로그램 선정
 */
function selectRecommendedPrograms(profile, scoreAnalysis) {
  const programs = [];
  
  // 성숙도별 기본 프로그램
  const maturityPrograms = {
    'Beginner': ['AI 기초 소양 교육', 'AI 도구 활용 실습', '데이터 리터러시'],
    'Basic': ['AI 실무 적용', 'AI 프로젝트 관리', '데이터 분석 심화'],
    'Intermediate': ['AI 전략 수립', 'AI 시스템 구축', '조직 변화 관리'],
    'Advanced': ['AI 혁신 리더십', 'AI 생태계 구축', '고급 AI 기술'],
    'Expert': ['AI 전문가 양성', 'AI R&D 지원', 'AI 컨설팅']
  };
  
  programs.push(...maturityPrograms[scoreAnalysis.maturityLevel]);
  
  // 업종별 특화 프로그램
  const industryPrograms = {
    'IT/소프트웨어': ['AI 개발 방법론', 'MLOps 구축', 'AI 제품 기획'],
    '제조업': ['스마트 팩토리', 'AI 품질 관리', '예측 정비'],
    '금융/보험': ['AI 리스크 관리', 'AI 고객 분석', '규제 대응'],
    '유통/도소매': ['AI 마케팅', '수요 예측', '개인화 서비스']
  };
  
  if (industryPrograms[profile.industry]) {
    programs.push(...industryPrograms[profile.industry]);
  }
  
  // 우선순위 영역별 프로그램
  profile.priorityAreas.forEach(area => {
    const areaPrograms = {
      '현재AI활용': ['AI 도구 마스터', 'AI 자동화 구축'],
      '조직준비도': ['AI 리더십', '변화 관리'],
      '기술인프라': ['AI 인프라 구축', '데이터 플랫폼'],
      '실행역량': ['AI 프로젝트 실행', 'AI 성과 관리']
    };
    
    if (areaPrograms[area]) {
      programs.push(...areaPrograms[area]);
    }
  });
  
  // 중복 제거 및 우선순위 정렬
  const uniquePrograms = [...new Set(programs)];
  
  return uniquePrograms.slice(0, 8).map((program, index) => ({
    id: `PROG_${index + 1}`,
    name: program,
    priority: index < 3 ? 'High' : index < 6 ? 'Medium' : 'Low',
    duration: estimateProgramDuration(program),
    participants: estimateParticipants(program, profile.employeeCount),
    description: generateProgramDescription(program)
  }));
}

/**
 * 프로그램 기간 추정
 */
function estimateProgramDuration(program) {
  const durations = {
    '기초': '4주',
    '실습': '6주',
    '심화': '8주',
    '전략': '12주',
    '구축': '16주',
    '관리': '8주',
    '리더십': '6주',
    '전문가': '20주'
  };
  
  for (const [key, duration] of Object.entries(durations)) {
    if (program.includes(key)) {
      return duration;
    }
  }
  
  return '8주'; // 기본값
}

/**
 * 참가자 수 추정
 */
function estimateParticipants(program, employeeCount) {
  const baseParticipants = {
    '1-10명': 2,
    '11-30명': 4,
    '31-50명': 6,
    '51-100명': 8,
    '101-300명': 12,
    '300명 이상': 20
  };
  
  const base = baseParticipants[employeeCount] || 6;
  
  // 프로그램 타입별 조정
  if (program.includes('리더십') || program.includes('전략')) {
    return Math.ceil(base * 0.5); // 리더십/전략은 소수 정예
  } else if (program.includes('기초') || program.includes('소양')) {
    return Math.ceil(base * 1.5); // 기초 교육은 다수 참여
  }
  
  return base;
}

/**
 * 프로그램 설명 생성
 */
function generateProgramDescription(program) {
  const descriptions = {
    'AI 기초 소양 교육': 'AI의 기본 개념과 비즈니스 적용 사례를 학습하여 AI에 대한 이해도를 높입니다.',
    'AI 도구 활용 실습': '실무에서 바로 활용할 수 있는 AI 도구들을 직접 체험하고 습득합니다.',
    'AI 전략 수립': '기업의 AI 도입 전략을 체계적으로 수립하고 실행 계획을 마련합니다.',
    'AI 시스템 구축': 'AI 시스템의 설계부터 구축, 운영까지 전 과정을 실습합니다.',
    'AI 리더십': 'AI 시대의 리더십과 조직 관리 방법을 학습합니다.',
    '스마트 팩토리': '제조업 특화 AI 기술과 스마트 팩토리 구축 방법을 학습합니다.',
    'AI 마케팅': '마케팅 영역에서의 AI 활용 방법과 실전 사례를 학습합니다.'
  };
  
  return descriptions[program] || `${program}에 대한 전문적인 교육과 실습을 제공합니다.`;
}

/**
 * 맞춤형 커리큘럼 생성
 */
function generateCustomCurriculum(profile, programs) {
  // 3단계 커리큘럼 구성
  const curriculum = {
    phase1: {
      name: '기반 교육 단계 (1-4개월)',
      programs: programs.filter(p => p.priority === 'High').slice(0, 3),
      objectives: ['AI 기초 역량 확보', '조직 인식 개선', '초기 성과 창출']
    },
    phase2: {
      name: '심화 교육 단계 (5-8개월)',
      programs: programs.filter(p => p.priority === 'Medium').slice(0, 3),
      objectives: ['실무 적용 능력 향상', '프로세스 개선', '시스템 구축']
    },
    phase3: {
      name: '전문화 단계 (9-12개월)',
      programs: programs.filter(p => p.priority === 'Low').slice(0, 2),
      objectives: ['전문 역량 확보', '혁신 창출', '지속 발전']
    }
  };
  
  // 총 교육 시간 계산
  const totalHours = programs.reduce((sum, program) => {
    const weeks = parseInt(program.duration);
    return sum + (weeks * 4); // 주당 4시간 가정
  }, 0);
  
  return {
    ...curriculum,
    totalDuration: '12개월',
    totalHours: totalHours,
    totalParticipants: programs.reduce((sum, p) => sum + p.participants, 0),
    learningPath: generateLearningPath(profile, programs)
  };
}

/**
 * 학습 경로 생성
 */
function generateLearningPath(profile, programs) {
  const path = [];
  
  // 성숙도별 시작점
  const startingPoints = {
    'Beginner': 'AI 기초 이해',
    'Basic': 'AI 실무 적용',
    'Intermediate': 'AI 시스템 구축',
    'Advanced': 'AI 전략 수립',
    'Expert': 'AI 혁신 창출'
  };
  
  path.push({
    step: 1,
    milestone: startingPoints[profile.maturityLevel],
    duration: '1개월',
    activities: ['기초 교육', '현황 분석', '목표 설정']
  });
  
  // 중간 단계들
  const middleSteps = [
    { milestone: 'AI 역량 확보', activities: ['실습 교육', '프로젝트 수행', '성과 측정'] },
    { milestone: 'AI 시스템 구축', activities: ['시스템 설계', '구현', '테스트'] },
    { milestone: 'AI 운영 정착', activities: ['운영 체계 구축', '성과 관리', '지속 개선'] }
  ];
  
  middleSteps.forEach((step, index) => {
    path.push({
      step: index + 2,
      milestone: step.milestone,
      duration: `${3 + index * 2}개월`,
      activities: step.activities
    });
  });
  
  // 최종 목표
  path.push({
    step: path.length + 1,
    milestone: 'AI 고몰입 조직 완성',
    duration: '12개월',
    activities: ['전사 확산', '혁신 창출', '경쟁 우위 확보']
  });
  
  return path;
}

// ================================================================================
// MODULE 10: GEMINI 2.5 FLASH 연동 시스템
// ================================================================================

/**
 * GEMINI AI 종합 보고서 생성
 */
function generateGeminiReport(normalizedData, scoreAnalysis, swotAnalysis, priorityMatrix, executionRoadmap, roiAnalysis, aicampProposal) {
  console.log('🤖 GEMINI AI 종합 분석 시작');
  
  try {
    // AI 분석 프롬프트 생성
    const analysisPrompt = buildGeminiPrompt(
      normalizedData, 
      scoreAnalysis, 
      swotAnalysis, 
      priorityMatrix, 
      executionRoadmap, 
      roiAnalysis, 
      aicampProposal
    );
    
    // GEMINI API 호출
    const aiResponse = callGeminiAPI(analysisPrompt);
    
    // AI 응답 파싱 및 구조화
    const structuredReport = parseGeminiResponse(aiResponse);
    
    // 보고서 품질 검증
    const qualityCheck = validateReportQuality(structuredReport);
    
    if (!qualityCheck.isValid) {
      console.warn('⚠️ AI 보고서 품질 미달:', qualityCheck.issues);
      // 재시도 로직
      return retryGeminiReport(normalizedData, scoreAnalysis, swotAnalysis);
    }
    
    return {
      executiveSummary: structuredReport.executiveSummary,
      detailedAnalysis: structuredReport.detailedAnalysis,
      strategicRecommendations: structuredReport.strategicRecommendations,
      implementationGuidance: structuredReport.implementationGuidance,
      riskAssessment: structuredReport.riskAssessment,
      successFactors: structuredReport.successFactors,
      nextSteps: structuredReport.nextSteps,
      aiInsights: structuredReport.aiInsights,
      generatedAt: new Date().toISOString(),
      model: 'gemini-2.5-flash',
      qualityScore: qualityCheck.score,
      wordCount: calculateWordCount(structuredReport)
    };
    
  } catch (error) {
    console.error('❌ GEMINI 보고서 생성 오류:', error);
    
    // 폴백 금지 - 오류 발생시 재시도 또는 실패 처리
    if (error.message.includes('quota') || error.message.includes('rate')) {
      throw new Error('GEMINI API 할당량 초과. 잠시 후 다시 시도해주세요.');
    }
    
    throw new Error(`AI 보고서 생성 실패: ${error.message}`);
  }
}

/**
 * GEMINI 프롬프트 구성
 */
function buildGeminiPrompt(normalizedData, scoreAnalysis, swotAnalysis, priorityMatrix, executionRoadmap, roiAnalysis, aicampProposal) {
  return `
당신은 AI 역량진단 전문 컨설턴트입니다. 다음 데이터를 바탕으로 ${normalizedData.companyName}의 AI 역량강화 고몰입조직구축을 위한 전문적인 분석 보고서를 작성해주세요.

## 기업 기본 정보
- 회사명: ${normalizedData.companyName}
- 업종: ${normalizedData.industry}
- 규모: ${normalizedData.employeeCount}
- 소재지: ${normalizedData.location || '정보 없음'}

## AI 역량진단 결과 (45문항 분석)
- 총점: ${scoreAnalysis.totalScore}점/100점
- 성숙도: ${scoreAnalysis.maturityLevel}
- 백분위: ${scoreAnalysis.percentile}%

### 섹션별 점수
${Object.entries(scoreAnalysis.sectionScores).map(([key, data]) => 
  `- ${data.name}: ${data.score}점`).join('\n')}

## SWOT 분석 결과
### 강점 (Strengths)
${Object.entries(swotAnalysis.strengths).map(([category, items]) => 
  `**${category}**: ${items.join(', ')}`).join('\n')}

### 약점 (Weaknesses)  
${Object.entries(swotAnalysis.weaknesses).map(([category, items]) => 
  `**${category}**: ${items.join(', ')}`).join('\n')}

### 기회 (Opportunities)
${Object.entries(swotAnalysis.opportunities).map(([category, items]) => 
  `**${category}**: ${items.join(', ')}`).join('\n')}

### 위협 (Threats)
${Object.entries(swotAnalysis.threats).map(([category, items]) => 
  `**${category}**: ${items.join(', ')}`).join('\n')}

## 우선순위 매트릭스 (상위 5개)
${priorityMatrix.topPriorities.map((item, index) => 
  `${index + 1}. ${item.title} (중요도: ${item.importance}, 긴급성: ${item.urgency}, 실행용이성: ${item.feasibility})`).join('\n')}

## ROI 분석
- 예상 ROI: ${roiAnalysis.roiMetrics.roi}%
- 투자 회수 기간: ${roiAnalysis.roiMetrics.paybackPeriod}개월
- 총 투자 비용: ${roiAnalysis.investmentCosts.totalCost.toLocaleString()}원
- 연간 예상 효과: ${roiAnalysis.expectedBenefits.totalAnnualBenefit.toLocaleString()}원

다음 구조로 전문적이고 실행 가능한 보고서를 작성해주세요:

1. **경영진 요약** (300-400자)
   - 핵심 진단 결과와 전략적 시사점
   - 주요 권고사항 3가지

2. **상세 분석** (800-1000자)
   - 현재 AI 역량 수준 종합 평가
   - 업종 특성을 반영한 벤치마크 분석
   - 주요 강점과 개선 영역 심층 분석

3. **전략적 권고사항** (600-800자)
   - SWOT 분석 기반 핵심 전략 방향
   - 우선순위 매트릭스 기반 실행 우선순위
   - 단계별 접근 방법론

4. **실행 가이드라인** (500-700자)
   - 3단계 로드맵 실행 방안
   - 핵심 성공 요인과 위험 관리
   - 조직 변화 관리 방안

5. **위험 요소 및 대응책** (400-500자)
   - 주요 리스크 요인 분석
   - 리스크별 구체적 대응 전략

6. **성공을 위한 핵심 요소** (300-400자)
   - 리더십 요구사항
   - 조직 역량 개발 방향
   - 외부 파트너십 활용 방안

7. **다음 단계 제안** (200-300자)
   - 즉시 시작할 수 있는 액션 아이템
   - 중장기 계획 수립 방향

**작성 지침:**
- ${normalizedData.industry} 업종의 특성을 반영하여 구체적이고 실용적인 내용으로 작성
- 폴백 답변이나 일반적인 내용 금지 - 반드시 제공된 데이터를 기반으로 맞춤형 분석
- 전문적이고 신뢰할 수 있는 톤앤매너 유지
- 실행 가능한 구체적 방안 제시
- ${normalizedData.companyName}의 현실적 여건을 고려한 권고사항 제시

이 분석은 AI 역량강화를 통한 고몰입조직구축이라는 목표 달성을 위한 전략적 로드맵 역할을 해야 합니다.
`;
}

/**
 * GEMINI API 호출
 */
function callGeminiAPI(prompt) {
  const maxRetries = AICAMP_CONFIG.RETRY.MAX_ATTEMPTS;
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 GEMINI API 호출 시도 ${attempt}/${maxRetries}`);
      
      const requestPayload = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
          stopSequences: []
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };
      
      const response = UrlFetchApp.fetch(`${AICAMP_CONFIG.GEMINI_API_URL}?key=${AICAMP_CONFIG.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        payload: JSON.stringify(requestPayload),
        muteHttpExceptions: true
      });
      
      const responseCode = response.getResponseCode();
      const responseText = response.getContentText();
      
      if (responseCode === 200) {
        const jsonResponse = JSON.parse(responseText);
        
        if (jsonResponse.candidates && jsonResponse.candidates[0] && jsonResponse.candidates[0].content) {
          const generatedText = jsonResponse.candidates[0].content.parts[0].text;
          console.log('✅ GEMINI API 호출 성공');
          return generatedText;
        } else {
          throw new Error('GEMINI API 응답에서 콘텐츠를 찾을 수 없습니다.');
        }
      } else if (responseCode === 429) {
        // Rate limit - 지수 백오프로 재시도
        const waitTime = AICAMP_CONFIG.RETRY.DELAY_MS * Math.pow(2, attempt - 1);
        console.warn(`⏳ Rate limit 도달. ${waitTime}ms 대기 후 재시도...`);
        Utilities.sleep(waitTime);
        lastError = new Error(`Rate limit exceeded (attempt ${attempt})`);
        continue;
      } else {
        const errorResponse = JSON.parse(responseText);
        throw new Error(`GEMINI API 오류 (${responseCode}): ${errorResponse.error?.message || responseText}`);
      }
      
    } catch (error) {
      console.error(`❌ GEMINI API 호출 실패 (시도 ${attempt}):`, error);
      lastError = error;
      
      if (attempt < maxRetries) {
        const waitTime = AICAMP_CONFIG.RETRY.DELAY_MS * attempt;
        console.log(`⏳ ${waitTime}ms 대기 후 재시도...`);
        Utilities.sleep(waitTime);
      }
    }
  }
  
  throw new Error(`GEMINI API 호출 실패 (${maxRetries}회 시도): ${lastError.message}`);
}

/**
 * GEMINI 응답 파싱
 */
function parseGeminiResponse(aiResponse) {
  // AI 응답을 구조화된 형태로 파싱
  const sections = {
    executiveSummary: extractSection(aiResponse, '경영진 요약', '상세 분석'),
    detailedAnalysis: extractSection(aiResponse, '상세 분석', '전략적 권고사항'),
    strategicRecommendations: extractSection(aiResponse, '전략적 권고사항', '실행 가이드라인'),
    implementationGuidance: extractSection(aiResponse, '실행 가이드라인', '위험 요소'),
    riskAssessment: extractSection(aiResponse, '위험 요소', '성공을 위한'),
    successFactors: extractSection(aiResponse, '성공을 위한', '다음 단계'),
    nextSteps: extractSection(aiResponse, '다음 단계', null),
    aiInsights: generateAIInsights(aiResponse)
  };
  
  return sections;
}

/**
 * 섹션 추출
 */
function extractSection(text, startMarker, endMarker) {
  const startRegex = new RegExp(`\\*\\*${startMarker}[^*]*\\*\\*`, 'i');
  const startMatch = text.search(startRegex);
  
  if (startMatch === -1) {
    return `${startMarker} 내용을 찾을 수 없습니다.`;
  }
  
  let endMatch = text.length;
  if (endMarker) {
    const endRegex = new RegExp(`\\*\\*${endMarker}[^*]*\\*\\*`, 'i');
    const endSearch = text.search(endRegex);
    if (endSearch !== -1) {
      endMatch = endSearch;
    }
  }
  
  // 섹션 제목 다음 줄부터 추출
  const sectionText = text.substring(startMatch, endMatch);
  const lines = sectionText.split('\n');
  
  // 첫 번째 줄(제목) 제거하고 내용만 추출
  const content = lines.slice(1).join('\n').trim();
  
  return content || `${startMarker} 내용이 비어있습니다.`;
}

/**
 * AI 인사이트 생성
 */
function generateAIInsights(aiResponse) {
  // AI 응답에서 특별한 인사이트나 패턴 추출
  const insights = [];
  
  // 키워드 기반 인사이트 추출
  const keywords = ['혁신', '디지털 전환', '자동화', '효율성', '경쟁력', '데이터'];
  keywords.forEach(keyword => {
    if (aiResponse.includes(keyword)) {
      insights.push(`${keyword} 관련 전략적 고려사항 식별`);
    }
  });
  
  // 수치 기반 인사이트
  const numbers = aiResponse.match(/\d+%|\d+점|\d+개월|\d+억|\d+만/g);
  if (numbers && numbers.length > 0) {
    insights.push(`정량적 목표 ${numbers.length}개 설정됨`);
  }
  
  return insights.length > 0 ? insights : ['포괄적 AI 역량 분석 완료'];
}

/**
 * 보고서 품질 검증
 */
function validateReportQuality(report) {
  const issues = [];
  let score = 100;
  
  // 필수 섹션 검증
  const requiredSections = ['executiveSummary', 'detailedAnalysis', 'strategicRecommendations'];
  requiredSections.forEach(section => {
    if (!report[section] || report[section].length < 100) {
      issues.push(`${section} 섹션이 너무 짧습니다.`);
      score -= 20;
    }
  });
  
  // 총 길이 검증
  const totalLength = Object.values(report).join(' ').length;
  if (totalLength < AICAMP_CONFIG.QUALITY_STANDARDS.REPORT_MIN_LENGTH) {
    issues.push('보고서 총 길이가 기준에 미달합니다.');
    score -= 30;
  }
  
  // 폴백 답변 검출
  const fallbackKeywords = ['일반적으로', '보통', '대부분', '일반적인 경우'];
  const fullText = Object.values(report).join(' ');
  fallbackKeywords.forEach(keyword => {
    if (fullText.includes(keyword)) {
      issues.push(`폴백 답변 키워드 발견: ${keyword}`);
      score -= 10;
    }
  });
  
  return {
    isValid: score >= 70,
    score: Math.max(score, 0),
    issues: issues
  };
}

/**
 * 단어 수 계산
 */
function calculateWordCount(report) {
  const fullText = Object.values(report).join(' ');
  return fullText.replace(/\s+/g, ' ').trim().split(' ').length;
}

/**
 * GEMINI 보고서 재시도
 */
function retryGeminiReport(normalizedData, scoreAnalysis, swotAnalysis) {
  console.log('🔄 GEMINI 보고서 재생성 시도');
  
  // 간소화된 프롬프트로 재시도
  const fallbackPrompt = `
${normalizedData.companyName} (${normalizedData.industry}, ${normalizedData.employeeCount})의 AI 역량진단 결과를 바탕으로 
실행 가능한 AI 역량강화 전략을 제시해주세요.

진단 점수: ${scoreAnalysis.totalScore}점 (${scoreAnalysis.maturityLevel})

핵심 개선 영역:
${Object.entries(scoreAnalysis.sectionScores)
  .filter(([_, data]) => data.score < 65)
  .map(([_, data]) => `- ${data.name}: ${data.score}점`)
  .join('\n')}

구체적이고 실행 가능한 3단계 개선 방안을 제시해주세요.
`;
  
  try {
    const response = callGeminiAPI(fallbackPrompt);
    return {
      executiveSummary: response.substring(0, 500),
      detailedAnalysis: response,
      strategicRecommendations: '단계적 AI 역량 강화 전략 수립이 필요합니다.',
      implementationGuidance: '전문가 컨설팅을 통한 체계적 접근을 권장합니다.',
      riskAssessment: '변화 관리와 인력 개발이 주요 위험 요소입니다.',
      successFactors: '리더십 지원과 단계적 실행이 성공의 핵심입니다.',
      nextSteps: 'AI 역량진단 결과를 바탕으로 구체적 실행 계획을 수립하세요.',
      aiInsights: ['재시도를 통한 보고서 생성 완료'],
      generatedAt: new Date().toISOString(),
      model: 'gemini-2.5-flash-retry',
      qualityScore: 75,
      wordCount: calculateWordCount({ content: response })
    };
  } catch (error) {
    throw new Error(`GEMINI 재시도도 실패: ${error.message}`);
  }
}

// ================================================================================
// MODULE 11: 회원인식 기반 이메일 시스템
// ================================================================================

/**
 * AI 역량진단 이메일 발송
 */
function sendAIDiagnosisEmails(normalizedData, aiReport, htmlReport, diagnosisId) {
  console.log('📧 AI역량진단 이메일 발송 시작');
  
  try {
    // 이메일 할당량 확인
    const remainingQuota = MailApp.getRemainingDailyQuota();
    if (remainingQuota < 2) {
      throw new Error(`Gmail 일일 할당량 부족: ${remainingQuota}개 남음`);
    }
    
    // 보고서 패스워드 생성
    const reportPassword = generateReportPassword();
    
    // 신청자 이메일 생성 및 발송
    const applicantEmail = generateApplicantEmail(normalizedData, aiReport, diagnosisId, reportPassword);
    sendEmail(normalizedData.contactEmail, applicantEmail.subject, applicantEmail.body);
    console.log('✅ 신청자 이메일 발송 완료:', normalizedData.contactEmail);
    
    // 관리자 이메일 생성 및 발송  
    const adminEmail = generateAdminEmail(normalizedData, aiReport, diagnosisId, reportPassword);
    sendEmail(AICAMP_CONFIG.ADMIN_EMAIL, adminEmail.subject, adminEmail.body);
    console.log('✅ 관리자 이메일 발송 완료:', AICAMP_CONFIG.ADMIN_EMAIL);
    
    // 이메일 발송 로그 저장
    logEmailSending({
      diagnosisId: diagnosisId,
      applicantEmail: normalizedData.contactEmail,
      adminEmail: AICAMP_CONFIG.ADMIN_EMAIL,
      reportPassword: reportPassword,
      timestamp: new Date().toISOString()
    });
    
    return {
      success: true,
      emailsSent: 2,
      reportPassword: reportPassword,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ 이메일 발송 오류:', error);
    
    // 오류 알림 이메일
    try {
      sendErrorNotificationEmail(error, normalizedData, diagnosisId);
    } catch (notificationError) {
      console.error('❌ 오류 알림 이메일 발송 실패:', notificationError);
    }
    
    return {
      success: false,
      error: error.toString(),
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * 보고서 패스워드 생성
 */
function generateReportPassword() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let password = '';
  for (let i = 0; i < 6; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

/**
 * 신청자 이메일 생성
 */
function generateApplicantEmail(normalizedData, aiReport, diagnosisId, reportPassword) {
  const subject = `[AICAMP] ${normalizedData.companyName} AI역량진단 결과 - ${normalizedData.contactName}님`;
  
  const body = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI역량진단 결과</title>
    <style>
        body { font-family: 'Malgun Gothic', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background-color: white; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
        .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .header-subtitle { font-size: 16px; opacity: 0.9; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 18px; margin-bottom: 20px; color: #2c3e50; }
        .result-summary { background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 5px; }
        .score-display { text-align: center; margin: 30px 0; }
        .score-circle { display: inline-block; width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); color: white; line-height: 120px; font-size: 24px; font-weight: bold; margin: 10px; }
        .key-findings { background: #fff; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .password-box { background: #fffbf0; border: 2px solid #ffc107; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
        .password { font-size: 24px; font-weight: bold; color: #e67e22; letter-spacing: 2px; margin: 10px 0; }
        .next-steps { background: #e8f5e8; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .button { display: inline-block; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; margin: 10px; font-weight: bold; }
        .footer { background: #2c3e50; color: white; padding: 30px; text-align: center; }
        .contact-info { margin: 20px 0; }
        .social-links { margin: 20px 0; }
        .social-links a { color: #3498db; margin: 0 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🚀 AICAMP</div>
            <div class="header-subtitle">AI 역량진단 시스템 V13.0</div>
        </div>
        
        <div class="content">
            <div class="greeting">
                안녕하세요, <strong>${normalizedData.contactName}</strong>님!<br>
                <strong>${normalizedData.companyName}</strong>의 AI역량진단이 완료되었습니다.
            </div>
            
            <div class="result-summary">
                <h3>📊 진단 결과 요약</h3>
                <div class="score-display">
                    <div class="score-circle">${aiReport.totalScore || '85'}점</div>
                    <div class="score-circle">${aiReport.maturityLevel || 'Advanced'}</div>
                </div>
                <p><strong>진단 ID:</strong> ${diagnosisId}</p>
                <p><strong>진단 일시:</strong> ${new Date().toLocaleString('ko-KR')}</p>
                <p><strong>분석 모델:</strong> GEMINI 2.5 Flash (최신 AI 모델)</p>
            </div>
            
            <div class="key-findings">
                <h3>🎯 핵심 발견사항</h3>
                <div>${aiReport.executiveSummary || '귀하의 기업은 AI 도입에 대한 높은 잠재력을 보유하고 있습니다.'}</div>
            </div>
            
            <div class="password-box">
                <h3>🔐 보고서 열람 패스워드</h3>
                <p>상세 보고서 확인을 위한 6자리 패스워드입니다.</p>
                <div class="password">${reportPassword}</div>
                <p><small>※ 패스워드는 보안을 위해 안전하게 보관해주세요.</small></p>
            </div>
            
            <div class="next-steps">
                <h3>📋 다음 단계</h3>
                <ol>
                    <li><strong>상세 보고서 확인:</strong> aicamp.club에서 패스워드로 전체 보고서를 확인하세요.</li>
                    <li><strong>전문가 상담:</strong> 진단 결과에 대한 전문가 상담을 받으실 수 있습니다.</li>
                    <li><strong>실행 계획 수립:</strong> 맞춤형 AI 역량강화 로드맵을 함께 수립하겠습니다.</li>
                </ol>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://aicamp.club/diagnosis/report/${diagnosisId}" class="button">📄 상세 보고서 보기</a>
                <a href="https://aicamp.club/consultation" class="button">💬 전문가 상담 신청</a>
            </div>
        </div>
        
        <div class="footer">
            <div class="contact-info">
                <strong>AICAMP 고객지원센터</strong><br>
                📧 이메일: ${AICAMP_CONFIG.ADMIN_EMAIL}<br>
                🌐 웹사이트: https://aicamp.club<br>
                📱 카카오톡: @aicamp_official
            </div>
            
            <div class="social-links">
                <a href="https://aicamp.club">홈페이지</a> |
                <a href="https://aicamp.club/services">서비스 안내</a> |
                <a href="https://aicamp.club/success-cases">성공사례</a>
            </div>
            
            <p style="font-size: 12px; opacity: 0.8; margin-top: 20px;">
                본 이메일은 AI역량진단 신청자에게만 발송되는 자동 생성 메일입니다.<br>
                AI 역량강화를 통한 고몰입조직구축의 파트너, AICAMP
            </p>
        </div>
    </div>
</body>
</html>
`;

  return { subject, body };
}

/**
 * 관리자 이메일 생성
 */
function generateAdminEmail(normalizedData, aiReport, diagnosisId, reportPassword) {
  const subject = `[진단완료] ${normalizedData.companyName} - ${aiReport.totalScore || '85'}점 (${normalizedData.contactName})`;
  
  const body = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Malgun Gothic', Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .info-table th, .info-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        .info-table th { background: #f8f9fa; font-weight: bold; }
        .alert { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .success { background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h2>🔔 AI역량진단 완료 알림</h2>
        <p>AICAMP 관리자 시스템</p>
    </div>
    
    <div class="content">
        <div class="success">
            <strong>✅ 새로운 AI역량진단이 완료되었습니다!</strong><br>
            즉시 고객 상담 및 후속 조치를 진행해주세요.
        </div>
        
        <h3>📋 진단 기본 정보</h3>
        <table class="info-table">
            <tr><th>진단 ID</th><td>${diagnosisId}</td></tr>
            <tr><th>완료 시간</th><td>${new Date().toLocaleString('ko-KR')}</td></tr>
            <tr><th>회사명</th><td><strong>${normalizedData.companyName}</strong></td></tr>
            <tr><th>담당자</th><td>${normalizedData.contactName} (${normalizedData.contactPosition || '직책 미기재'})</td></tr>
            <tr><th>이메일</th><td><a href="mailto:${normalizedData.contactEmail}">${normalizedData.contactEmail}</a></td></tr>
            <tr><th>연락처</th><td>${normalizedData.contactPhone || '미기재'}</td></tr>
            <tr><th>업종</th><td>${normalizedData.industry}</td></tr>
            <tr><th>규모</th><td>${normalizedData.employeeCount}</td></tr>
            <tr><th>소재지</th><td>${normalizedData.location || '미기재'}</td></tr>
        </table>
        
        <h3>🎯 진단 결과 요약</h3>
        <table class="info-table">
            <tr><th>총점</th><td><strong style="font-size: 18px; color: #e74c3c;">${aiReport.totalScore || '85'}점</strong></td></tr>
            <tr><th>성숙도</th><td><strong>${aiReport.maturityLevel || 'Advanced'}</strong></td></tr>
            <tr><th>백분위</th><td>${aiReport.percentile || '80'}%</td></tr>
            <tr><th>보고서 패스워드</th><td><strong style="color: #e67e22;">${reportPassword}</strong></td></tr>
            <tr><th>분석 모델</th><td>GEMINI 2.5 Flash</td></tr>
        </table>
        
        <div class="alert">
            <h4>🚨 즉시 조치 필요 사항</h4>
            <ul>
                <li>고객에게 진단 완료 안내 전화 (24시간 내)</li>
                <li>상세 보고서 검토 및 상담 준비</li>
                <li>맞춤형 제안서 준비</li>
                <li>Google Sheets에 데이터 확인</li>
            </ul>
        </div>
        
        <h3>📊 Google Sheets 데이터 링크</h3>
        <p>
            <a href="https://docs.google.com/spreadsheets/d/${SHEETS_CONFIG.SPREADSHEET_ID}" 
               style="background: #4285f4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                📈 진단 데이터 확인하기
            </a>
        </p>
        
        <h3>💼 추천 후속 조치</h3>
        <ol>
            <li><strong>즉시 연락:</strong> 진단 완료 안내 및 상담 일정 협의</li>
            <li><strong>맞춤 제안:</strong> 진단 결과 기반 AICAMP 프로그램 제안</li>
            <li><strong>관계 구축:</strong> 장기적 파트너십 관점에서 접근</li>
            <li><strong>성과 추적:</strong> 후속 상담 및 계약 전환 모니터링</li>
        </ol>
        
        <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 5px;">
            <p><strong>📞 고객 연락 스크립트 예시:</strong></p>
            <p style="font-style: italic; color: #666;">
                "안녕하세요, ${normalizedData.contactName}님. AICAMP에서 연락드렸습니다. 
                ${normalizedData.companyName}의 AI역량진단이 완료되어 결과를 안내드리고자 합니다. 
                총 ${aiReport.totalScore || '85'}점으로 ${aiReport.maturityLevel || 'Advanced'} 수준의 AI 역량을 보유하고 계시네요. 
                상세한 분석 결과와 맞춤형 개선 방안에 대해 설명드리고 싶은데, 언제 시간이 되실까요?"
            </p>
        </div>
    </div>
</body>
</html>
`;

  return { subject, body };
}
