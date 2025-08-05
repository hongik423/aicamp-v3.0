// ================================================================================
// 📈 AICAMP AI 역량진단 시스템 - 실행 로드맵 및 ROI 분석 모듈
// ================================================================================

/**
 * AI 역량강화 3단계 실행 로드맵 생성
 */
function generateExecutionRoadmap(applicationData, evaluationData, analysisData) {
  console.log('🗺️ AI 역량강화 실행 로드맵 생성 시작');
  updateProgress(applicationData.diagnosisId, '로드맵 생성', 'processing', '맞춤형 로드맵 생성 중');
  
  try {
    const roadmap = {
      overview: {
        title: `${applicationData.companyName} AI 역량강화 3단계 실행 로드맵`,
        duration: '12개월',
        totalInvestment: calculateTotalInvestment(applicationData, evaluationData),
        expectedROI: '180%',
        startDate: getStartDate()
      },
      phases: {
        phase1: generatePhase1(applicationData, evaluationData, analysisData),
        phase2: generatePhase2(applicationData, evaluationData, analysisData),
        phase3: generatePhase3(applicationData, evaluationData, analysisData)
      },
      milestones: generateMilestones(applicationData, evaluationData),
      kpis: generateKPIs(applicationData, evaluationData),
      risks: identifyRisks(applicationData, evaluationData),
      successFactors: identifySuccessFactors(applicationData, evaluationData)
    };
    
    updateProgress(applicationData.diagnosisId, '로드맵 생성', 'completed', '로드맵 생성 완료');
    console.log('✅ 실행 로드맵 생성 완료');
    
    return roadmap;
    
  } catch (error) {
    updateProgress(applicationData.diagnosisId, '로드맵 생성', 'error', error.toString());
    throw error;
  }
}

/**
 * Phase 1: Quick Win & Foundation (1-2개월)
 */
function generatePhase1(appData, evalData, analysisData) {
  const urgentTasks = analysisData.importanceUrgencyMatrix?.executionPriority?.slice(0, 3) || [];
  
  return {
    name: 'Quick Win & 기반 구축',
    duration: '1-2개월',
    objective: '즉시 가시적 성과 창출 및 AI 도입 기반 마련',
    investment: calculatePhaseInvestment(1, appData),
    
    activities: [
      {
        week: '1주차',
        title: 'AI 전환 킥오프 및 조직 정렬',
        tasks: [
          'CEO 주도 AI 비전 선포식',
          'AI 추진 TF팀 구성 (5-7명)',
          '전직원 AI 인식 조사',
          'Quick Win 프로젝트 선정'
        ],
        deliverables: ['AI 비전 선언문', 'TF팀 구성표', '프로젝트 차터'],
        budget: '500만원'
      },
      {
        week: '2-3주차',
        title: 'AI 기초 교육 및 Quick Win 착수',
        tasks: [
          '전직원 AI 기초 교육 (8시간)',
          '핵심 인력 심화 교육 (16시간)',
          `${appData.mainChallenges?.split(',')[0] || '핵심 문제'} 해결 파일럿`,
          'ChatGPT 업무 활용 가이드 배포'
        ],
        deliverables: ['교육 수료증', '파일럿 계획서', '활용 가이드'],
        budget: '1,000만원'
      },
      {
        week: '4-6주차',
        title: 'Quick Win 실행 및 성과 측정',
        tasks: [
          'AI 도구 시범 도입 (ChatGPT Team 등)',
          '업무 자동화 파일럿 실행',
          '초기 성과 측정 및 공유',
          '확산 계획 수립'
        ],
        deliverables: ['파일럿 결과 보고서', '성과 대시보드', '확산 계획'],
        budget: '1,500만원'
      },
      {
        week: '7-8주차',
        title: '1단계 성과 정리 및 2단계 준비',
        tasks: [
          'Quick Win 성과 전사 공유',
          '개선점 도출 및 반영',
          '2단계 상세 계획 수립',
          '추가 예산 확보'
        ],
        deliverables: ['1단계 종합 보고서', '2단계 실행 계획'],
        budget: '300만원'
      }
    ],
    
    expectedOutcomes: [
      `업무 효율성 15-20% 향상`,
      `${urgentTasks[0]?.name || '핵심 과제'} 해결`,
      'AI 도입 공감대 형성',
      '초기 성공 사례 3개 확보'
    ],
    
    keySuccessFactors: [
      'CEO의 강력한 스폰서십',
      '빠른 의사결정',
      '작은 성공의 빠른 확산',
      '저항 관리'
    ]
  };
}

/**
 * Phase 2: Scale Up & Integration (3-6개월)
 */
function generatePhase2(appData, evalData, analysisData) {
  const capabilities = evalData.scores.aiCapability.scores;
  const weakAreas = Object.entries(capabilities)
    .filter(([_, score]) => score < 60)
    .map(([area, _]) => area);
  
  return {
    name: 'Scale Up & 통합',
    duration: '3-6개월',
    objective: 'AI 활용 확대 및 핵심 프로세스 혁신',
    investment: calculatePhaseInvestment(2, appData),
    
    activities: [
      {
        month: '3개월차',
        title: '핵심 프로세스 AI 전환',
        tasks: [
          `${weakAreas[0] ? getCapabilityName(weakAreas[0]) : '데이터 관리'} 체계 구축`,
          'AI 기반 의사결정 프로세스 도입',
          '부서별 AI 활용 목표 설정',
          'AI 거버넌스 체계 수립'
        ],
        deliverables: ['프로세스 개선안', 'AI 거버넌스 규정', 'KPI 대시보드'],
        budget: '3,000만원'
      },
      {
        month: '4개월차',
        title: 'AI 솔루션 본격 도입',
        tasks: [
          `${appData.consultingArea || 'AI 자동화'} 솔루션 선정`,
          'PoC(Proof of Concept) 실행',
          '데이터 통합 및 정제',
          '중간 관리자 AI 리더십 교육'
        ],
        deliverables: ['솔루션 도입 계획', 'PoC 결과', '데이터 품질 보고서'],
        budget: '5,000만원'
      },
      {
        month: '5개월차',
        title: 'AI 활용 고도화',
        tasks: [
          'AI 분석 대시보드 구축',
          '예측 모델 개발 및 적용',
          '프로세스 자동화 확대',
          'AI 활용 베스트 프랙티스 정립'
        ],
        deliverables: ['AI 대시보드', '예측 모델', '자동화 매뉴얼'],
        budget: '4,000만원'
      },
      {
        month: '6개월차',
        title: '중간 평가 및 조정',
        tasks: [
          '6개월 성과 종합 평가',
          'ROI 분석 및 보고',
          '3단계 전략 수정',
          '성과 보상 및 인센티브'
        ],
        deliverables: ['중간 평가 보고서', 'ROI 분석서', '수정 전략'],
        budget: '500만원'
      }
    ],
    
    expectedOutcomes: [
      `${appData.expectedBenefits || '생산성 30% 향상'}`,
      'AI 활용률 70% 달성',
      '핵심 프로세스 자동화율 50%',
      '데이터 기반 의사결정 정착'
    ],
    
    keySuccessFactors: [
      '체계적 변화 관리',
      '지속적 교육 훈련',
      '부서 간 협업',
      '성과 측정 및 개선'
    ]
  };
}

/**
 * Phase 3: Transform & Innovate (7-12개월)
 */
function generatePhase3(appData, evalData, analysisData) {
  const industry = appData.industry || '기타';
  const industryTrends = INDUSTRY_CONFIG[industry]?.aiTrends || [];
  
  return {
    name: 'Transform & 혁신',
    duration: '7-12개월',
    objective: 'AI 기반 비즈니스 혁신 및 새로운 가치 창출',
    investment: calculatePhaseInvestment(3, appData),
    
    activities: [
      {
        month: '7-8개월차',
        title: 'AI 기반 신규 서비스 개발',
        tasks: [
          `${industryTrends[0] || 'AI 서비스'} 개발 착수`,
          '고객 경험 혁신 프로젝트',
          'AI 제품/서비스 로드맵 수립',
          '외부 파트너십 구축'
        ],
        deliverables: ['신규 서비스 프로토타입', '파트너십 계약', '서비스 로드맵'],
        budget: '7,000만원'
      },
      {
        month: '9-10개월차',
        title: 'AI 생태계 구축',
        tasks: [
          'AI 플랫폼 구축',
          '데이터 생태계 확장',
          'AI 인재 육성 프로그램',
          '혁신 문화 정착'
        ],
        deliverables: ['AI 플랫폼', '인재 육성 체계', '혁신 프로세스'],
        budget: '8,000만원'
      },
      {
        month: '11-12개월차',
        title: 'AI 리더십 확보',
        tasks: [
          '업계 AI 벤치마크 달성',
          'AI 성공 사례 대외 공유',
          '차년도 AI 전략 수립',
          'AI 투자 확대 계획'
        ],
        deliverables: ['벤치마크 보고서', '사례집', '차년도 전략'],
        budget: '3,000만원'
      }
    ],
    
    expectedOutcomes: [
      '신규 AI 서비스 출시',
      '매출 20% 증대',
      '업계 AI 리더 포지션',
      '지속가능한 AI 혁신 체계'
    ],
    
    keySuccessFactors: [
      '혁신적 사고',
      '리스크 관리',
      '지속적 투자',
      '생태계 협력'
    ]
  };
}

/**
 * 투자대비효과(ROI) 분석
 */
function generateROIAnalysis(applicationData, evaluationData, roadmap) {
  console.log('💰 ROI 분석 시작');
  
  const roiAnalysis = {
    summary: {
      totalInvestment: calculateTotalInvestment(applicationData, evaluationData),
      expectedReturns: calculateExpectedReturns(applicationData, evaluationData),
      roi: null,
      paybackPeriod: null,
      npv: null
    },
    
    investmentBreakdown: {
      phase1: {
        amount: roadmap.phases.phase1.investment,
        categories: {
          education: '30%',
          tools: '40%',
          consulting: '20%',
          others: '10%'
        }
      },
      phase2: {
        amount: roadmap.phases.phase2.investment,
        categories: {
          solution: '50%',
          integration: '25%',
          training: '15%',
          others: '10%'
        }
      },
      phase3: {
        amount: roadmap.phases.phase3.investment,
        categories: {
          development: '40%',
          platform: '35%',
          ecosystem: '20%',
          others: '5%'
        }
      }
    },
    
    benefitsBreakdown: {
      tangible: calculateTangibleBenefits(applicationData, evaluationData),
      intangible: calculateIntangibleBenefits(applicationData, evaluationData)
    },
    
    cashFlow: generateCashFlowProjection(applicationData, evaluationData, roadmap),
    
    scenarios: {
      conservative: generateScenario('conservative', applicationData, evaluationData),
      realistic: generateScenario('realistic', applicationData, evaluationData),
      optimistic: generateScenario('optimistic', applicationData, evaluationData)
    },
    
    riskAnalysis: analyzeROIRisks(applicationData, evaluationData),
    
    recommendations: generateROIRecommendations(applicationData, evaluationData)
  };
  
  // ROI 계산
  roiAnalysis.summary.roi = calculateROI(
    roiAnalysis.summary.totalInvestment,
    roiAnalysis.summary.expectedReturns
  );
  
  // 투자회수기간 계산
  roiAnalysis.summary.paybackPeriod = calculatePaybackPeriod(
    roiAnalysis.cashFlow,
    roiAnalysis.summary.totalInvestment
  );
  
  // NPV 계산
  roiAnalysis.summary.npv = calculateNPV(roiAnalysis.cashFlow, 0.1); // 10% 할인율
  
  console.log('✅ ROI 분석 완료');
  return roiAnalysis;
}

/**
 * 총 투자금액 계산
 */
function calculateTotalInvestment(appData, evalData) {
  let baseInvestment = 5000; // 기본 5천만원
  
  // 기업 규모에 따른 조정
  const employeeCount = parseInt(appData.employeeCount) || 50;
  if (employeeCount > 200) baseInvestment *= 2;
  else if (employeeCount > 100) baseInvestment *= 1.5;
  else if (employeeCount < 30) baseInvestment *= 0.7;
  
  // 현재 AI 수준에 따른 조정
  const aiScore = evalData.scores.totalScore;
  if (aiScore < 40) baseInvestment *= 1.3; // 더 많은 투자 필요
  else if (aiScore > 70) baseInvestment *= 0.8; // 기존 인프라 활용
  
  // 업종별 조정
  const industryMultiplier = {
    '제조업': 1.2,
    'IT/소프트웨어': 0.9,
    '금융업': 1.3,
    '서비스업': 0.8,
    '유통/도소매': 1.0,
    '의료/헬스케어': 1.4,
    '교육': 0.7,
    '기타': 1.0
  };
  
  baseInvestment *= industryMultiplier[appData.industry] || 1.0;
  
  return Math.round(baseInvestment) + '만원';
}

/**
 * 기대 수익 계산
 */
function calculateExpectedReturns(appData, evalData) {
  let annualReturns = 0;
  
  // 1. 비용 절감 효과
  const costSavings = calculateCostSavings(appData, evalData);
  annualReturns += costSavings;
  
  // 2. 매출 증대 효과
  const revenueIncrease = calculateRevenueIncrease(appData, evalData);
  annualReturns += revenueIncrease;
  
  // 3. 생산성 향상 효과
  const productivityGains = calculateProductivityGains(appData, evalData);
  annualReturns += productivityGains;
  
  return Math.round(annualReturns) + '만원';
}

/**
 * 비용 절감 효과 계산
 */
function calculateCostSavings(appData, evalData) {
  let savings = 0;
  const annualRevenue = parseInt(appData.annualRevenue?.replace(/[^0-9]/g, '') || '10') * 100; // 억원 -> 만원
  
  // 운영비 절감 (매출의 2-5%)
  savings += annualRevenue * 0.03;
  
  // 인건비 절감 (자동화)
  const employeeCount = parseInt(appData.employeeCount) || 50;
  const avgSalary = 5000; // 평균 연봉 5천만원
  const automationRate = 0.2; // 20% 업무 자동화
  savings += employeeCount * avgSalary * automationRate * 0.3; // 30% 인력 효율화
  
  return savings;
}

/**
 * 매출 증대 효과 계산
 */
function calculateRevenueIncrease(appData, evalData) {
  const annualRevenue = parseInt(appData.annualRevenue?.replace(/[^0-9]/g, '') || '10') * 100;
  let increaseRate = 0.1; // 기본 10% 증가
  
  // AI 활용 수준에 따른 조정
  const aiScore = evalData.scores.totalScore;
  if (aiScore >= 80) increaseRate = 0.2;
  else if (aiScore >= 60) increaseRate = 0.15;
  
  // 업종별 조정
  if (['IT/소프트웨어', '금융업'].includes(appData.industry)) {
    increaseRate *= 1.2;
  }
  
  return annualRevenue * increaseRate;
}

/**
 * 생산성 향상 효과 계산
 */
function calculateProductivityGains(appData, evalData) {
  const employeeCount = parseInt(appData.employeeCount) || 50;
  const avgProductivityValue = 10000; // 직원당 연간 생산가치 1억원
  const productivityIncrease = 0.3; // 30% 생산성 향상
  
  return employeeCount * avgProductivityValue * productivityIncrease;
}

/**
 * 유형 효익 계산
 */
function calculateTangibleBenefits(appData, evalData) {
  return {
    costReduction: {
      operational: '연간 운영비 15% 절감',
      labor: '인건비 20% 효율화',
      error: '오류 감소로 인한 비용 절감 10%'
    },
    revenueGrowth: {
      newServices: '신규 AI 서비스 매출 창출',
      customerRetention: '고객 유지율 향상 25%',
      marketShare: '시장 점유율 5%p 증가'
    },
    efficiency: {
      processTime: '프로세스 처리 시간 40% 단축',
      decisionSpeed: '의사결정 속도 50% 향상',
      accuracy: '정확도 30% 개선'
    }
  };
}

/**
 * 무형 효익 계산
 */
function calculateIntangibleBenefits(appData, evalData) {
  return {
    strategic: [
      '업계 AI 리더십 확보',
      '혁신 역량 강화',
      '미래 경쟁력 확보'
    ],
    organizational: [
      '직원 만족도 향상',
      'AI 문화 정착',
      '학습 조직 구축'
    ],
    brand: [
      '기업 이미지 개선',
      '혁신 기업 인식',
      '인재 유치 경쟁력'
    ]
  };
}

/**
 * 현금흐름 예측
 */
function generateCashFlowProjection(appData, evalData, roadmap) {
  const projection = [];
  const totalInvestment = parseInt(calculateTotalInvestment(appData, evalData).replace(/[^0-9]/g, ''));
  const annualReturns = parseInt(calculateExpectedReturns(appData, evalData).replace(/[^0-9]/g, ''));
  
  // 월별 현금흐름 (12개월)
  for (let month = 1; month <= 12; month++) {
    let investment = 0;
    let returns = 0;
    
    // 단계별 투자
    if (month <= 2) {
      investment = totalInvestment * 0.15 / 2; // Phase 1
    } else if (month <= 6) {
      investment = totalInvestment * 0.45 / 4; // Phase 2
    } else {
      investment = totalInvestment * 0.40 / 6; // Phase 3
    }
    
    // 수익 실현 (점진적 증가)
    if (month >= 2) {
      returns = annualReturns * (month - 1) / 12 / 6; // 6개월 후 완전 실현
    }
    
    projection.push({
      month: month,
      investment: -investment,
      returns: returns,
      netCashFlow: returns - investment,
      cumulativeCashFlow: (projection[month - 2]?.cumulativeCashFlow || 0) + returns - investment
    });
  }
  
  return projection;
}

/**
 * 시나리오 생성
 */
function generateScenario(type, appData, evalData) {
  const baseReturns = parseInt(calculateExpectedReturns(appData, evalData).replace(/[^0-9]/g, ''));
  const scenarios = {
    conservative: {
      name: '보수적 시나리오',
      probability: '30%',
      returns: baseReturns * 0.7,
      roi: '120%',
      payback: '14개월',
      assumptions: [
        'AI 도입 지연',
        '예상보다 낮은 효율성',
        '일부 저항 발생'
      ]
    },
    realistic: {
      name: '현실적 시나리오',
      probability: '50%',
      returns: baseReturns,
      roi: '180%',
      payback: '10개월',
      assumptions: [
        '계획대로 진행',
        '예상 수준의 성과',
        '정상적인 도입'
      ]
    },
    optimistic: {
      name: '낙관적 시나리오',
      probability: '20%',
      returns: baseReturns * 1.5,
      roi: '250%',
      payback: '7개월',
      assumptions: [
        '예상보다 빠른 도입',
        '시너지 효과 극대화',
        '전직원 적극 참여'
      ]
    }
  };
  
  return scenarios[type];
}

/**
 * ROI 계산
 */
function calculateROI(investment, returns) {
  const investmentNum = parseInt(investment.replace(/[^0-9]/g, ''));
  const returnsNum = parseInt(returns.replace(/[^0-9]/g, ''));
  
  const roi = ((returnsNum - investmentNum) / investmentNum) * 100;
  return Math.round(roi) + '%';
}

/**
 * 투자회수기간 계산
 */
function calculatePaybackPeriod(cashFlow, investment) {
  const investmentNum = parseInt(investment.replace(/[^0-9]/g, ''));
  
  for (let i = 0; i < cashFlow.length; i++) {
    if (cashFlow[i].cumulativeCashFlow >= 0) {
      return `${i + 1}개월`;
    }
  }
  
  return '12개월 이상';
}

/**
 * NPV 계산
 */
function calculateNPV(cashFlow, discountRate) {
  let npv = 0;
  
  cashFlow.forEach((cf, index) => {
    const monthlyRate = discountRate / 12;
    const discountFactor = Math.pow(1 + monthlyRate, -(index + 1));
    npv += cf.netCashFlow * discountFactor;
  });
  
  return Math.round(npv) + '만원';
}

/**
 * ROI 리스크 분석
 */
function analyzeROIRisks(appData, evalData) {
  return {
    high: [
      {
        risk: '기술 도입 실패',
        probability: '낮음',
        impact: '높음',
        mitigation: '단계적 도입 및 파일럿 테스트'
      },
      {
        risk: '조직 저항',
        probability: '중간',
        impact: '높음',
        mitigation: '변화 관리 프로그램 및 인센티브'
      }
    ],
    medium: [
      {
        risk: '예산 초과',
        probability: '중간',
        impact: '중간',
        mitigation: '단계별 예산 관리 및 모니터링'
      },
      {
        risk: '인재 부족',
        probability: '높음',
        impact: '중간',
        mitigation: '외부 전문가 활용 및 교육 강화'
      }
    ],
    low: [
      {
        risk: '경쟁사 대응',
        probability: '높음',
        impact: '낮음',
        mitigation: '차별화된 AI 전략 수립'
      }
    ]
  };
}

/**
 * ROI 권장사항 생성
 */
function generateROIRecommendations(appData, evalData) {
  return [
    {
      priority: 'high',
      recommendation: 'Quick Win 프로젝트로 조기 성과 창출',
      rationale: '투자 대비 빠른 회수 및 조직 동기부여'
    },
    {
      priority: 'high',
      recommendation: '정부 지원 사업 적극 활용',
      rationale: '초기 투자 부담 경감 (최대 3억원)'
    },
    {
      priority: 'medium',
      recommendation: '단계별 투자 및 성과 측정',
      rationale: '리스크 최소화 및 투자 효율성 극대화'
    },
    {
      priority: 'medium',
      recommendation: 'AI 전문 파트너십 구축',
      rationale: '전문성 확보 및 구축 기간 단축'
    }
  ];
}

/**
 * 마일스톤 생성
 */
function generateMilestones(appData, evalData) {
  return [
    {
      month: 1,
      milestone: 'AI 전환 킥오프',
      criteria: 'TF팀 구성 및 비전 수립',
      status: 'planned'
    },
    {
      month: 2,
      milestone: 'Quick Win 달성',
      criteria: '첫 성공 사례 및 15% 효율성 개선',
      status: 'planned'
    },
    {
      month: 4,
      milestone: 'AI 솔루션 도입',
      criteria: '핵심 프로세스 AI 적용',
      status: 'planned'
    },
    {
      month: 6,
      milestone: '중간 목표 달성',
      criteria: 'ROI 100% 달성',
      status: 'planned'
    },
    {
      month: 9,
      milestone: 'AI 서비스 출시',
      criteria: '신규 AI 기반 서비스 런칭',
      status: 'planned'
    },
    {
      month: 12,
      milestone: 'AI 전환 완료',
      criteria: '전사 AI 활용률 80%, ROI 180%',
      status: 'planned'
    }
  ];
}

/**
 * KPI 생성
 */
function generateKPIs(appData, evalData) {
  return {
    strategic: [
      {
        name: 'AI 성숙도 레벨',
        current: evalData.maturityLevel,
        target: 'AI 선도',
        measurement: '분기별 평가'
      },
      {
        name: 'ROI',
        current: '0%',
        target: '180%',
        measurement: '월별 측정'
      }
    ],
    operational: [
      {
        name: 'AI 활용률',
        current: '20%',
        target: '80%',
        measurement: '월별 서베이'
      },
      {
        name: '프로세스 자동화율',
        current: '10%',
        target: '50%',
        measurement: '프로세스별 측정'
      }
    ],
    financial: [
      {
        name: '비용 절감률',
        current: '0%',
        target: '20%',
        measurement: '분기별 재무 분석'
      },
      {
        name: '매출 성장률',
        current: '0%',
        target: '15%',
        measurement: '분기별 매출 분석'
      }
    ]
  };
}

/**
 * 성공 요인 식별
 */
function identifySuccessFactors(appData, evalData) {
  return [
    {
      factor: 'CEO 스폰서십',
      importance: 'critical',
      currentStatus: appData.decisionMaker?.includes('대표') ? 'strong' : 'needed',
      action: 'CEO 주도 AI 비전 선포 및 정기 점검'
    },
    {
      factor: '전담 조직',
      importance: 'high',
      currentStatus: 'planned',
      action: 'AI 추진 TF → AI 전담팀 → AI 센터 발전'
    },
    {
      factor: '변화 관리',
      importance: 'high',
      currentStatus: 'needed',
      action: '체계적 변화 관리 프로그램 운영'
    },
    {
      factor: '지속적 투자',
      importance: 'high',
      currentStatus: appData.budgetRange !== '미정' ? 'committed' : 'needed',
      action: '단계별 투자 확대 및 성과 연계'
    }
  ];
}

/**
 * 리스크 식별
 */
function identifyRisks(appData, evalData) {
  const risks = [];
  
  // 조직 규모 리스크
  if (appData.employeeCount && parseInt(appData.employeeCount) < 30) {
    risks.push({
      type: '자원 부족',
      severity: 'high',
      mitigation: '외부 전문가 활용 및 정부 지원'
    });
  }
  
  // AI 준비도 리스크
  if (evalData.scores.totalScore < 50) {
    risks.push({
      type: 'AI 준비도 부족',
      severity: 'medium',
      mitigation: '기초 교육 강화 및 단계적 접근'
    });
  }
  
  // 예산 리스크
  if (!appData.budgetRange || appData.budgetRange === '미정') {
    risks.push({
      type: '예산 불확실성',
      severity: 'high',
      mitigation: 'Quick Win으로 예산 확보 정당화'
    });
  }
  
  return risks;
}

/**
 * 단계별 투자 계산
 */
function calculatePhaseInvestment(phase, appData) {
  const totalInvestment = parseInt(calculateTotalInvestment(appData, {}).replace(/[^0-9]/g, ''));
  
  const phaseRatios = {
    1: 0.15, // 15%
    2: 0.45, // 45%
    3: 0.40  // 40%
  };
  
  return Math.round(totalInvestment * phaseRatios[phase]) + '만원';
}

/**
 * 시작일 계산
 */
function getStartDate() {
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  return nextMonth.toLocaleDateString('ko-KR');
}