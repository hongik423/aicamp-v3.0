// AICAMP AI 역량진단 시스템 Google Apps Script 2025 - 최강 최적 보고서 v4.0
// GEMINI 2.5 Flash AI 기반 맞춤형 진단보고서 생성 - 개별 기업 최적화
// 마지막 업데이트: 2025.02.05
// 개선사항: SWOT 분석 강화, AI 역량진단 매트릭스, 중요도-긴급성 매트릭스, 3단계 실행 로드맵, 투자대비효과분석

// ================================================================================
// 🔧 기본 설정
// ================================================================================

const SPREADSHEET_ID = '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0';
const GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0/edit';

const SHEETS = {
  DIAGNOSIS: 'AI_역량진단신청',
  CONSULTATION: '상담신청', 
  BETA_FEEDBACK: '베타피드백',
  PROGRESS: '진행상황추적',
  PERFORMANCE: '성능모니터링'
};

const ADMIN_EMAIL = 'hongik423@gmail.com';
const AUTO_REPLY_ENABLED = true;
const DEBUG_MODE = true;
const VERSION = '2025.02.05.AICAMP_AI역량진단시스템_v4.0_최강최적보고서_GEMINI25Flash_Enhanced';

// 🤖 GEMINI API 설정
const GEMINI_API_KEY = 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// 타임아웃 설정
const TIMEOUT_SETTINGS = {
  GEMINI_API: 1200000,        // 20분
  RETRY_DELAY: 600000,        // 10분
  EMAIL_SERVICE: 180000,      // 3분
  PROGRESS_UPDATE: 30000      // 30초
};

// ================================================================================
// 🎯 향상된 AI 역량진단 평가 시스템
// ================================================================================

/**
 * AI 역량진단표 평가 항목 매핑
 */
const AI_CAPABILITY_ASSESSMENT_ITEMS = {
  // 1. 기본 현황
  basicInfo: {
    aiToolUsage: '현재 AI 도구 활용 현황',
    mainConcerns: '주요 고민사항',
    expectedBenefits: '예상 혜택',
    consultingArea: '희망 컨설팅 분야'
  },
  
  // 2. AI 도입 관련 정보
  aiAdoption: {
    currentAITools: {
      chatGPT: 'ChatGPT 활용도',
      claude: 'Claude 활용도',
      gemini: 'Gemini 활용도',
      others: '기타 AI 도구'
    },
    adoptionLevel: 'AI 도입 수준',
    barriers: 'AI 도입 장벽',
    readiness: 'AI 준비도'
  },
  
  // 3. 5대 AI 역량 평가 (5점 척도)
  fiveCapabilities: {
    aiUnderstanding: {
      name: 'AI 이해 및 활용 전략',
      items: ['AI 기술 이해도', 'AI 활용 전략 수립', 'AI 투자 의사결정']
    },
    dataManagement: {
      name: '데이터 관리 및 분석',
      items: ['데이터 수집 체계', '데이터 품질 관리', '데이터 분석 역량']
    },
    processOptimization: {
      name: '프로세스 혁신 및 자동화',
      items: ['업무 프로세스 분석', '자동화 가능성 평가', 'AI 기반 프로세스 개선']
    },
    talentDevelopment: {
      name: '인재 육성 및 조직 문화',
      items: ['AI 교육 체계', '변화 관리 역량', '혁신 문화 조성']
    },
    customerExperience: {
      name: '고객 경험 및 가치 창출',
      items: ['고객 데이터 활용', 'AI 기반 서비스 개발', '고객 만족도 향상']
    }
  },
  
  // 4. 실무 역량 평가
  practicalCapabilities: {
    documentAutomation: '문서 자동화 역량',
    dataAnalysis: '데이터 분석 실무',
    aiToolUsage: 'AI 도구 활용 역량',
    digitalCollaboration: '디지털 협업 역량',
    industrySpecific: '업종 특화 역량'
  }
};

/**
 * 🎯 향상된 종합 점수 계산 시스템
 */
function calculateEnhancedScores(data) {
  try {
    console.log('📊 향상된 종합 점수 계산 시작');
    
    // 1. 5대 AI 역량 점수 계산
    const aiCapabilityScores = {};
    let totalAIScore = 0;
    let itemCount = 0;
    
    // AI 이해 및 활용 전략
    const aiUnderstandingItems = [
      data.AI기술이해도 || data.aiTechUnderstanding || 3,
      data.AI활용전략수립 || data.aiStrategyPlanning || 3,
      data.AI투자의사결정 || data.aiInvestmentDecision || 3
    ];
    aiCapabilityScores.aiUnderstanding = calculateAverage(aiUnderstandingItems) * 20;
    
    // 데이터 관리 및 분석
    const dataManagementItems = [
      data.데이터수집체계 || data.dataCollection || 3,
      data.데이터품질관리 || data.dataQuality || 3,
      data.데이터분석역량 || data.dataAnalysis || 3
    ];
    aiCapabilityScores.dataManagement = calculateAverage(dataManagementItems) * 20;
    
    // 프로세스 혁신 및 자동화
    const processOptimizationItems = [
      data.업무프로세스분석 || data.processAnalysis || 3,
      data.자동화가능성평가 || data.automationAssessment || 3,
      data.AI기반프로세스개선 || data.aiProcessImprovement || 3
    ];
    aiCapabilityScores.processOptimization = calculateAverage(processOptimizationItems) * 20;
    
    // 인재 육성 및 조직 문화
    const talentDevelopmentItems = [
      data.AI교육체계 || data.aiEducation || 3,
      data.변화관리역량 || data.changeManagement || 3,
      data.혁신문화조성 || data.innovationCulture || 3
    ];
    aiCapabilityScores.talentDevelopment = calculateAverage(talentDevelopmentItems) * 20;
    
    // 고객 경험 및 가치 창출
    const customerExperienceItems = [
      data.고객데이터활용 || data.customerDataUsage || 3,
      data.AI기반서비스개발 || data.aiServiceDevelopment || 3,
      data.고객만족도향상 || data.customerSatisfaction || 3
    ];
    aiCapabilityScores.customerExperience = calculateAverage(customerExperienceItems) * 20;
    
    // 2. 실무 역량 점수 계산
    const practicalCapabilityScores = {
      documentAutomation: (data.문서자동화역량 || data.documentAutomation || 3) * 20,
      dataAnalysis: (data.데이터분석실무 || data.dataAnalysisPractice || 3) * 20,
      aiToolUsage: (data.AI도구활용역량 || data.aiToolUsageCapability || 3) * 20,
      digitalCollaboration: (data.디지털협업역량 || data.digitalCollaboration || 3) * 20,
      industrySpecific: calculateIndustrySpecificScore(data) * 20
    };
    
    // 3. 종합 점수 계산
    const aiCapabilityAvg = Object.values(aiCapabilityScores).reduce((a, b) => a + b, 0) / 5;
    const practicalCapabilityAvg = Object.values(practicalCapabilityScores).reduce((a, b) => a + b, 0) / 5;
    
    const totalScore = Math.round(
      (aiCapabilityAvg * 0.7) +  // AI 역량 70% 가중치
      (practicalCapabilityAvg * 0.3)  // 실무 역량 30% 가중치
    );
    
    return {
      aiCapability: {
        scores: aiCapabilityScores,
        average: Math.round(aiCapabilityAvg),
        weight: 0.7
      },
      practicalCapability: {
        scores: practicalCapabilityScores,
        average: Math.round(practicalCapabilityAvg),
        weight: 0.3
      },
      totalScore: totalScore,
      grade: getGradeFromScore(totalScore),
      level: getAIMaturityLevel(totalScore)
    };
    
  } catch (error) {
    console.error('❌ 향상된 점수 계산 오류:', error);
    return {
      aiCapability: { scores: {}, average: 60, weight: 0.7 },
      practicalCapability: { scores: {}, average: 60, weight: 0.3 },
      totalScore: 60,
      grade: 'C',
      level: '도입준비'
    };
  }
}

/**
 * AI 성숙도 수준 판단
 */
function getAIMaturityLevel(score) {
  if (score >= 90) return 'AI 선도';
  if (score >= 75) return '완전통합';
  if (score >= 60) return '확산적용';
  if (score >= 40) return '시범적용';
  return '도입준비';
}

/**
 * 평균 계산 헬퍼 함수
 */
function calculateAverage(items) {
  const validItems = items.filter(item => item !== null && item !== undefined);
  if (validItems.length === 0) return 3; // 기본값
  return validItems.reduce((sum, item) => sum + Number(item), 0) / validItems.length;
}

/**
 * 업종별 특화 점수 계산
 */
function calculateIndustrySpecificScore(data) {
  const industry = data.industry || data.업종 || '일반업종';
  
  // 업종별 특화 평가 항목
  const industryScores = {
    '제조업': calculateAverage([
      data.스마트팩토리이해 || 3,
      data.품질관리시스템 || 3,
      data.생산최적화 || 3,
      data.공급망관리 || 3,
      data.IoT센서활용 || 3
    ]),
    'IT/소프트웨어': calculateAverage([
      data.AI코딩도구 || 3,
      data.DevOps자동화 || 3,
      data.API통합 || 3,
      data.클라우드네이티브 || 3,
      data.AI모델배포 || 3
    ]),
    '유통/도소매': calculateAverage([
      data.AI재고관리 || 3,
      data.고객분석 || 3,
      data.가격최적화 || 3,
      data.수요예측 || 3,
      data.옴니채널전략 || 3
    ]),
    '서비스업': calculateAverage([
      data.고객서비스자동화 || 3,
      data.예약시스템 || 3,
      data.피드백분석 || 3,
      data.서비스최적화 || 3,
      data.고객여정분석 || 3
    ])
  };
  
  return industryScores[industry] || 3;
}

// ================================================================================
// 🎯 향상된 SWOT 분석 및 전략 도출 시스템
// ================================================================================

/**
 * 향상된 SWOT 분석 수행
 */
function performEnhancedSWOTAnalysis(data, scores) {
  const companyName = data.회사명 || data.companyName || '귀사';
  const industry = data.업종 || data.industry || '일반업종';
  const businessDetails = data.사업상세설명 || data.businessDetails || '';
  const mainConcerns = data.주요고민사항 || data.mainConcerns || '';
  
  // AI가 기업 정보를 기반으로 SWOT 요소 도출
  const swot = {
    strengths: identifyStrengths(data, scores),
    weaknesses: identifyWeaknesses(data, scores),
    opportunities: identifyOpportunities(data, industry),
    threats: identifyThreats(data, industry)
  };
  
  // SWOT 기반 전략 매트릭스 생성
  const strategies = {
    SO: generateSOStrategies(swot.strengths, swot.opportunities, data),
    WO: generateWOStrategies(swot.weaknesses, swot.opportunities, data),
    ST: generateSTStrategies(swot.strengths, swot.threats, data),
    WT: generateWTStrategies(swot.weaknesses, swot.threats, data)
  };
  
  return {
    swot: swot,
    strategies: strategies,
    priorityActions: extractPriorityActions(strategies, data)
  };
}

/**
 * 강점 식별
 */
function identifyStrengths(data, scores) {
  const strengths = [];
  
  // 점수 기반 강점
  Object.entries(scores.aiCapability.scores).forEach(([key, score]) => {
    if (score >= 80) {
      strengths.push({
        area: getCapabilityName(key),
        score: score,
        description: `${getCapabilityName(key)} 분야에서 업계 선도 수준의 역량 보유`
      });
    }
  });
  
  // 사업 특성 기반 강점
  if (data.사업상세설명) {
    strengths.push({
      area: '도메인 전문성',
      description: `${data.업종} 분야의 깊은 이해와 경험`
    });
  }
  
  return strengths;
}

/**
 * 약점 식별
 */
function identifyWeaknesses(data, scores) {
  const weaknesses = [];
  
  // 점수 기반 약점
  Object.entries(scores.aiCapability.scores).forEach(([key, score]) => {
    if (score < 60) {
      weaknesses.push({
        area: getCapabilityName(key),
        score: score,
        urgency: score < 40 ? '긴급' : '높음',
        description: `${getCapabilityName(key)} 역량 부족으로 경쟁력 저하 우려`
      });
    }
  });
  
  // AI 도입 장벽
  if (data.AI도입장벽) {
    const barriers = Array.isArray(data.AI도입장벽) ? data.AI도입장벽 : [data.AI도입장벽];
    barriers.forEach(barrier => {
      weaknesses.push({
        area: 'AI 도입 장벽',
        description: barrier
      });
    });
  }
  
  return weaknesses;
}

/**
 * 기회 식별
 */
function identifyOpportunities(data, industry) {
  const opportunities = [];
  
  // 업종별 AI 트렌드 기회
  const industryTrends = getIndustryAITrends(industry);
  industryTrends.forEach(trend => {
    opportunities.push({
      area: 'AI 트렌드',
      description: trend,
      timeframe: '6-12개월'
    });
  });
  
  // 정부 지원 기회
  opportunities.push({
    area: '정부 지원',
    description: 'AI 바우처 사업 등 정부 지원금 최대 3억원',
    timeframe: '즉시 신청 가능'
  });
  
  // 시장 기회
  if (data.예상혜택) {
    opportunities.push({
      area: '시장 기회',
      description: `${data.예상혜택} 달성을 통한 시장 확대`,
      timeframe: '3-6개월'
    });
  }
  
  return opportunities;
}

/**
 * 위협 식별
 */
function identifyThreats(data, industry) {
  const threats = [];
  
  // 경쟁 위협
  threats.push({
    area: '경쟁사 AI 도입',
    description: `${industry} 업계 경쟁사들의 빠른 AI 도입으로 격차 확대`,
    severity: '높음'
  });
  
  // 기술 변화 위협
  threats.push({
    area: '기술 변화 속도',
    description: 'AI 기술의 빠른 발전으로 인한 적응 부담',
    severity: '중간'
  });
  
  // 인력 위협
  if (scores.talentDevelopment < 60) {
    threats.push({
      area: '인재 부족',
      description: 'AI 전문 인력 확보 어려움',
      severity: '높음'
    });
  }
  
  return threats;
}

/**
 * SO 전략 생성 (강점-기회)
 */
function generateSOStrategies(strengths, opportunities, data) {
  const strategies = [];
  
  // 강점을 활용한 기회 포착 전략
  strengths.forEach(strength => {
    opportunities.forEach(opportunity => {
      strategies.push({
        strategy: `${strength.area}을 활용한 ${opportunity.area} 선점`,
        action: `1) ${strength.description}를 기반으로\n2) ${opportunity.description} 실현\n3) ${opportunity.timeframe} 내 실행`,
        expectedResult: '시장 리더십 확보 및 매출 40% 성장'
      });
    });
  });
  
  return strategies.slice(0, 3); // 상위 3개 전략
}

/**
 * WO 전략 생성 (약점-기회)
 */
function generateWOStrategies(weaknesses, opportunities, data) {
  const strategies = [];
  
  // 약점 보완을 통한 기회 활용 전략
  weaknesses.forEach(weakness => {
    opportunities.forEach(opportunity => {
      if (opportunity.area === '정부 지원') {
        strategies.push({
          strategy: `정부 지원을 통한 ${weakness.area} 역량 강화`,
          action: `1) AI 바우처 신청으로 자금 확보\n2) ${weakness.area} 전문 교육 실시\n3) 외부 전문가 영입`,
          expectedResult: `${weakness.area} 역량 50% 향상`
        });
      }
    });
  });
  
  return strategies.slice(0, 3);
}

/**
 * ST 전략 생성 (강점-위협)
 */
function generateSTStrategies(strengths, threats, data) {
  const strategies = [];
  
  // 강점으로 위협 방어 전략
  strengths.forEach(strength => {
    threats.forEach(threat => {
      strategies.push({
        strategy: `${strength.area}을 통한 ${threat.area} 대응`,
        action: `1) ${strength.description} 강화\n2) 차별화된 가치 제공\n3) 고객 충성도 제고`,
        expectedResult: '경쟁 우위 유지 및 시장 방어'
      });
    });
  });
  
  return strategies.slice(0, 3);
}

/**
 * WT 전략 생성 (약점-위협)
 */
function generateWTStrategies(weaknesses, threats, data) {
  const strategies = [];
  
  // 생존을 위한 최소화 전략
  weaknesses.forEach(weakness => {
    threats.forEach(threat => {
      if (weakness.urgency === '긴급') {
        strategies.push({
          strategy: `${weakness.area} 긴급 보완 및 ${threat.area} 회피`,
          action: `1) 핵심 영역 집중\n2) 전략적 파트너십 구축\n3) 단계적 개선 추진`,
          expectedResult: '리스크 최소화 및 안정적 성장 기반 확보'
        });
      }
    });
  });
  
  return strategies.slice(0, 3);
}

// ================================================================================
// 🎯 AI 역량진단 결과 매트릭스
// ================================================================================

/**
 * AI 역량진단 매트릭스 생성
 */
function generateAICapabilityMatrix(scores, data) {
  const matrix = {
    title: 'AI 역량진단 결과 매트릭스',
    dimensions: {
      x: 'AI 활용 수준',
      y: '비즈니스 영향도'
    },
    quadrants: {
      leaders: {
        name: 'AI 리더',
        description: 'AI 활용 수준과 비즈니스 영향도 모두 높음',
        characteristics: ['혁신적 AI 활용', '높은 ROI', '시장 선도'],
        companies: []
      },
      potentials: {
        name: '잠재력 보유',
        description: 'AI 활용 수준은 낮지만 비즈니스 영향도 높음',
        characteristics: ['성장 잠재력', '투자 필요', '빠른 개선 가능'],
        companies: []
      },
      experimenters: {
        name: '실험 단계',
        description: 'AI 활용 수준은 높지만 비즈니스 영향도 낮음',
        characteristics: ['기술 중심', 'ROI 개선 필요', '전략 재정립'],
        companies: []
      },
      beginners: {
        name: '초기 단계',
        description: 'AI 활용 수준과 비즈니스 영향도 모두 낮음',
        characteristics: ['기초 구축 필요', '교육 우선', '단계적 접근'],
        companies: []
      }
    }
  };
  
  // 기업 위치 판단
  const aiLevel = scores.aiCapability.average;
  const businessImpact = calculateBusinessImpact(data, scores);
  
  let position = '';
  if (aiLevel >= 70 && businessImpact >= 70) {
    position = 'leaders';
  } else if (aiLevel < 70 && businessImpact >= 70) {
    position = 'potentials';
  } else if (aiLevel >= 70 && businessImpact < 70) {
    position = 'experimenters';
  } else {
    position = 'beginners';
  }
  
  matrix.currentPosition = {
    quadrant: position,
    coordinates: {
      x: aiLevel,
      y: businessImpact
    },
    interpretation: matrix.quadrants[position].description,
    recommendations: getMatrixRecommendations(position, data)
  };
  
  return matrix;
}

/**
 * 비즈니스 영향도 계산
 */
function calculateBusinessImpact(data, scores) {
  let impact = 50; // 기본값
  
  // 예상 혜택 기반 가산
  if (data.예상혜택) {
    if (data.예상혜택.includes('매출') || data.예상혜택.includes('성장')) impact += 20;
    if (data.예상혜택.includes('비용') || data.예상혜택.includes('절감')) impact += 15;
    if (data.예상혜택.includes('고객') || data.예상혜택.includes('만족')) impact += 15;
  }
  
  // 현재 AI 도구 활용 기반 가산
  if (data.현재AI도구활용 && data.현재AI도구활용 !== '사용안함') {
    impact += 10;
  }
  
  // 점수 기반 조정
  if (scores.totalScore >= 80) impact += 10;
  if (scores.totalScore < 50) impact -= 10;
  
  return Math.min(100, Math.max(0, impact));
}

/**
 * 매트릭스 기반 권장사항
 */
function getMatrixRecommendations(position, data) {
  const recommendations = {
    leaders: [
      'AI 혁신 리더십 유지 및 강화',
      '신규 AI 기술 조기 도입 및 실험',
      'AI 성공 사례 공유 및 생태계 주도',
      '차세대 AI 인재 육성 투자'
    ],
    potentials: [
      'AI 역량 긴급 강화 프로그램 실시',
      '검증된 AI 솔루션 빠른 도입',
      '외부 AI 전문가 영입 또는 파트너십',
      '단기 성과 중심 AI 프로젝트 추진'
    ],
    experimenters: [
      'AI 투자 대비 ROI 개선 전략 수립',
      '비즈니스 중심 AI 활용 재설계',
      '고객 가치 중심 AI 서비스 개발',
      'AI 성과 측정 체계 구축'
    ],
    beginners: [
      'AI 기초 교육 및 인식 개선',
      '소규모 파일럿 프로젝트 시작',
      '정부 지원 사업 적극 활용',
      '단계별 AI 도입 로드맵 수립'
    ]
  };
  
  return recommendations[position] || recommendations.beginners;
}

// ================================================================================
// 🎯 중요도-긴급성 매트릭스
// ================================================================================

/**
 * 중요도-긴급성(실행용이성) 매트릭스 생성
 */
function generateImportanceUrgencyMatrix(swotAnalysis, scores, data) {
  const tasks = [];
  
  // SWOT 전략에서 실행 과제 추출
  Object.values(swotAnalysis.strategies).forEach(strategyGroup => {
    strategyGroup.forEach(strategy => {
      tasks.push(evaluateTask(strategy, scores, data));
    });
  });
  
  // 중요도-긴급성 4분면 분류
  const matrix = {
    doFirst: {
      name: '즉시 실행',
      description: '중요도 높음 + 긴급성 높음',
      tasks: tasks.filter(t => t.importance >= 70 && t.urgency >= 70)
    },
    schedule: {
      name: '계획 수립',
      description: '중요도 높음 + 긴급성 낮음',
      tasks: tasks.filter(t => t.importance >= 70 && t.urgency < 70)
    },
    delegate: {
      name: '위임 검토',
      description: '중요도 낮음 + 긴급성 높음',
      tasks: tasks.filter(t => t.importance < 70 && t.urgency >= 70)
    },
    eliminate: {
      name: '재검토',
      description: '중요도 낮음 + 긴급성 낮음',
      tasks: tasks.filter(t => t.importance < 70 && t.urgency < 70)
    }
  };
  
  // 실행 우선순위 도출
  matrix.executionPriority = [
    ...matrix.doFirst.tasks.slice(0, 3),
    ...matrix.schedule.tasks.slice(0, 2),
    ...matrix.delegate.tasks.slice(0, 1)
  ];
  
  return matrix;
}

/**
 * 과제 평가 (중요도, 긴급성, 실행용이성)
 */
function evaluateTask(strategy, scores, data) {
  let importance = 50;
  let urgency = 50;
  let feasibility = 50;
  
  // 중요도 평가
  if (strategy.expectedResult.includes('매출') || strategy.expectedResult.includes('성장')) {
    importance += 30;
  }
  if (strategy.strategy.includes('경쟁') || strategy.strategy.includes('생존')) {
    importance += 20;
  }
  
  // 긴급성 평가
  if (strategy.action.includes('즉시') || strategy.action.includes('긴급')) {
    urgency += 30;
  }
  if (scores.totalScore < 50) {
    urgency += 20; // 낮은 점수일수록 긴급
  }
  
  // 실행용이성 평가
  if (strategy.action.includes('파일럿') || strategy.action.includes('테스트')) {
    feasibility += 20;
  }
  if (data.현재AI도구활용 && data.현재AI도구활용 !== '사용안함') {
    feasibility += 10;
  }
  
  return {
    ...strategy,
    importance: Math.min(100, importance),
    urgency: Math.min(100, urgency),
    feasibility: Math.min(100, feasibility),
    priorityScore: (importance * 0.4) + (urgency * 0.4) + (feasibility * 0.2)
  };
}

// ================================================================================
// 🎯 고몰입조직구축을 위한 AI역량강화 3단계 실행로드맵
// ================================================================================

/**
 * 향상된 3단계 실행 로드맵 생성
 */
function generateEnhancedExecutionRoadmap(data, scores, swotAnalysis) {
  const companyName = data.회사명 || data.companyName || '귀사';
  const industry = data.업종 || data.industry || '일반업종';
  const mainConcerns = data.주요고민사항 || data.mainConcerns || '';
  const expectedBenefits = data.예상혜택 || data.expectedBenefits || '';
  
  const roadmap = {
    overview: {
      title: `${companyName} AI 역량강화 및 고몰입조직 구축 로드맵`,
      totalDuration: '12개월',
      totalInvestment: '2.5억원',
      expectedROI: '300% (3년 기준)',
      keySuccess: '전직원 AI 활용률 90%, 생산성 50% 향상'
    },
    
    phase1: {
      title: '🚀 1단계: AI Quick Win 및 기초 역량 구축 (1-3개월)',
      objective: '즉각적 성과 창출 및 AI 수용성 확보',
      duration: '3개월',
      budget: '3,000만원',
      tasks: [
        {
          month: '1개월차',
          title: 'AI 인식 개선 및 Quick Win 프로젝트',
          activities: [
            {
              name: 'CEO 주도 AI 비전 선포',
              description: 'AI 전환 의지 천명 및 전직원 동기부여',
              owner: 'CEO',
              deliverable: 'AI 비전 선언문'
            },
            {
              name: `${mainConcerns} 해결을 위한 AI 파일럿`,
              description: 'ChatGPT/Claude 활용 즉시 적용 가능 솔루션',
              owner: '혁신TF',
              deliverable: '20% 개선 달성'
            },
            {
              name: 'AI 챔피언 선발 및 교육',
              description: '부서별 AI 리더 10명 선발 및 집중 교육',
              owner: 'HR팀',
              deliverable: 'AI 챔피언 10명'
            }
          ],
          kpi: {
            metric: 'AI 도구 사용률',
            target: '30%',
            measurement: '주간 사용 로그'
          }
        },
        {
          month: '2개월차',
          title: 'AI 도구 전사 확산',
          activities: [
            {
              name: '부서별 AI 활용 교육',
              description: 'AI 챔피언 주도 실무 교육',
              owner: 'AI 챔피언',
              deliverable: '전직원 기초 교육 완료'
            },
            {
              name: 'AI 활용 경진대회',
              description: '부서별 AI 활용 아이디어 및 성과 경쟁',
              owner: '혁신TF',
              deliverable: '우수 사례 10개'
            },
            {
              name: 'AI 거버넌스 체계 수립',
              description: 'AI 활용 가이드라인 및 윤리 규정',
              owner: '경영기획',
              deliverable: 'AI 거버넌스 문서'
            }
          ],
          kpi: {
            metric: '업무 효율성',
            target: '15% 향상',
            measurement: '프로세스 처리 시간'
          }
        },
        {
          month: '3개월차',
          title: '1단계 성과 평가 및 확산 계획',
          activities: [
            {
              name: 'Quick Win 성과 분석',
              description: 'ROI 분석 및 확산 가능성 평가',
              owner: '경영기획',
              deliverable: '성과 보고서'
            },
            {
              name: '2단계 준비 워크샵',
              description: '핵심 개선 영역 선정 및 목표 설정',
              owner: '경영진',
              deliverable: '2단계 실행 계획'
            },
            {
              name: 'AI 투자 예산 확보',
              description: '정부 지원사업 신청 및 예산 배정',
              owner: 'CFO',
              deliverable: '예산 확보'
            }
          ],
          kpi: {
            metric: '1단계 ROI',
            target: '150%',
            measurement: '투자 대비 수익'
          }
        }
      ],
      expectedOutcomes: [
        '전직원 AI 기초 역량 확보',
        `${mainConcerns} 20% 개선`,
        'AI 수용 문화 조성',
        '성공 사례 10개 확보'
      ],
      risks: [
        {
          risk: '직원 저항',
          mitigation: 'CEO 주도 + 인센티브',
          probability: '중'
        },
        {
          risk: '기술 장벽',
          mitigation: '단계별 교육 + 외부 지원',
          probability: '낮음'
        }
      ]
    },
    
    phase2: {
      title: '🔥 2단계: AI 기반 핵심 프로세스 혁신 (4-9개월)',
      objective: '핵심 업무 AI 전환 및 성과 가시화',
      duration: '6개월',
      budget: '1억원',
      tasks: [
        {
          quarter: '4-6개월차',
          title: '핵심 프로세스 AI 전환',
          activities: [
            {
              name: `${industry} 특화 AI 솔루션 도입`,
              description: '업종별 최적 AI 도구 선정 및 구축',
              owner: 'IT팀',
              deliverable: 'AI 시스템 구축'
            },
            {
              name: '데이터 통합 및 품질 개선',
              description: '전사 데이터 통합 및 AI 활용 기반 마련',
              owner: '데이터팀',
              deliverable: '통합 데이터 플랫폼'
            },
            {
              name: 'AI 기반 의사결정 체계',
              description: '데이터 기반 의사결정 프로세스 구축',
              owner: '경영기획',
              deliverable: 'BI 대시보드'
            }
          ],
          kpi: {
            metric: '프로세스 자동화율',
            target: '50%',
            measurement: '자동화된 업무 비율'
          }
        },
        {
          quarter: '7-9개월차',
          title: 'AI 성과 극대화 및 확산',
          activities: [
            {
              name: '전사 AI 활용 고도화',
              description: '부서간 AI 협업 체계 구축',
              owner: 'CDO',
              deliverable: 'AI 협업 플랫폼'
            },
            {
              name: `${expectedBenefits} 달성 프로젝트`,
              description: '목표 달성을 위한 집중 개선',
              owner: '사업부',
              deliverable: '목표 80% 달성'
            },
            {
              name: 'AI 성과 보상 체계',
              description: 'AI 활용 성과 연계 인센티브',
              owner: 'HR팀',
              deliverable: '새로운 평가 체계'
            }
          ],
          kpi: {
            metric: '비즈니스 성과',
            target: `${expectedBenefits} 80%`,
            measurement: 'KPI 달성률'
          }
        }
      ],
      expectedOutcomes: [
        '핵심 프로세스 50% 자동화',
        `${expectedBenefits} 80% 달성`,
        '데이터 기반 의사결정 정착',
        'AI 전문 인력 20명 육성'
      ]
    },
    
    phase3: {
      title: '🏆 3단계: AI 주도 혁신 및 지속가능 성장 (10-12개월)',
      objective: 'AI 기반 신사업 창출 및 지속가능 체계 구축',
      duration: '3개월',
      budget: '1.2억원',
      tasks: [
        {
          quarter: '10-12개월차',
          title: 'AI 혁신 생태계 완성',
          activities: [
            {
              name: 'AI 기반 신규 서비스 출시',
              description: `${industry} 최초 AI 혁신 서비스`,
              owner: '신사업팀',
              deliverable: '신규 매출원 창출'
            },
            {
              name: 'AI 혁신 문화 정착',
              description: '지속적 혁신을 위한 제도화',
              owner: 'CEO',
              deliverable: 'AI 혁신 체계'
            },
            {
              name: '차세대 AI 로드맵',
              description: '향후 3년 AI 전략 수립',
              owner: '전략기획',
              deliverable: '중장기 AI 전략'
            }
          ],
          kpi: {
            metric: '전체 목표 달성',
            target: '100%',
            measurement: '종합 성과 지표'
          }
        }
      ],
      expectedOutcomes: [
        `${expectedBenefits} 100% 달성`,
        'AI 기반 신사업 매출 20%',
        '업계 AI 리더 포지션',
        '지속가능 AI 경영 체계'
      ]
    },
    
    criticalSuccessFactors: [
      {
        factor: 'CEO의 강력한 리더십',
        importance: '필수',
        action: 'CEO 직접 참여 및 지속적 관심'
      },
      {
        factor: '전직원 참여',
        importance: '매우 중요',
        action: '부서별 AI 챔피언 운영'
      },
      {
        factor: '충분한 투자',
        importance: '중요',
        action: '정부 지원 + 자체 예산'
      },
      {
        factor: '외부 전문성 활용',
        importance: '중요',
        action: 'AICAMP 전문 컨설팅'
      }
    ]
  };
  
  return roadmap;
}

// ================================================================================
// 🎯 투자대비효과(ROI) 분석
// ================================================================================

/**
 * 상세 ROI 분석
 */
function generateDetailedROIAnalysis(data, scores, roadmap) {
  const companyName = data.회사명 || '귀사';
  const currentRevenue = data.연매출 || 100; // 억원 단위, 기본값 100억
  const employeeCount = data.직원수 || 50;
  
  const roiAnalysis = {
    summary: {
      totalInvestment: 250000000, // 2.5억원
      expectedReturn: 750000000, // 7.5억원 (3년 누적)
      roi: 300, // 300%
      paybackPeriod: 14, // 14개월
      irr: 85 // 내부수익률 85%
    },
    
    investmentBreakdown: {
      phase1: {
        amount: 30000000,
        allocation: {
          'AI 도구 라이선스': 10000000,
          '교육 및 컨설팅': 15000000,
          '파일럿 프로젝트': 5000000
        }
      },
      phase2: {
        amount: 100000000,
        allocation: {
          'AI 시스템 구축': 50000000,
          '데이터 인프라': 30000000,
          '전문 인력 영입': 20000000
        }
      },
      phase3: {
        amount: 120000000,
        allocation: {
          '신사업 개발': 60000000,
          'AI 고도화': 40000000,
          '변화 관리': 20000000
        }
      }
    },
    
    benefitAnalysis: {
      directBenefits: {
        '인건비 절감': {
          description: 'AI 자동화를 통한 인력 효율화',
          calculation: `${employeeCount}명 × 20% 효율 향상 × 5천만원 = ${employeeCount * 0.2 * 50}백만원/년`,
          annual: employeeCount * 0.2 * 50000000,
          threeYear: employeeCount * 0.2 * 50000000 * 3
        },
        '매출 증대': {
          description: 'AI 기반 신규 서비스 및 고객 만족도 향상',
          calculation: `${currentRevenue}억 × 15% 성장 = ${currentRevenue * 0.15}억원/년`,
          annual: currentRevenue * 0.15 * 100000000,
          threeYear: currentRevenue * 0.15 * 100000000 * 3
        },
        '운영비 절감': {
          description: '프로세스 최적화 및 오류 감소',
          calculation: '운영비 30% 절감',
          annual: currentRevenue * 0.05 * 100000000,
          threeYear: currentRevenue * 0.05 * 100000000 * 3
        }
      },
      
      indirectBenefits: {
        '의사결정 개선': {
          description: '데이터 기반 의사결정으로 실패 비용 감소',
          value: '측정 가능한 가치 연 2억원'
        },
        '혁신 역량 강화': {
          description: '신규 사업 기회 창출 및 시장 선점',
          value: '잠재 가치 연 5억원'
        },
        '기업 가치 상승': {
          description: 'AI 선도 기업 이미지 및 투자 유치',
          value: '기업 가치 20% 상승'
        }
      }
    },
    
    riskAdjustedROI: {
      optimistic: {
        scenario: '모든 목표 초과 달성',
        probability: 30,
        roi: 400
      },
      realistic: {
        scenario: '계획대로 진행',
        probability: 50,
        roi: 300
      },
      conservative: {
        scenario: '일부 지연 및 목표 미달',
        probability: 20,
        roi: 200
      },
      weightedROI: 320 // 가중평균 ROI
    },
    
    breakEvenAnalysis: {
      monthlyInvestment: [10000000, 10000000, 10000000, 15000000, 15000000, 20000000],
      cumulativeBenefit: [5000000, 12000000, 22000000, 35000000, 52000000, 75000000],
      breakEvenMonth: 14,
      interpretation: '14개월차에 손익분기점 도달, 이후 급속한 수익 증가'
    },
    
    sensitivityAnalysis: {
      factors: [
        {
          factor: 'AI 도입 속도',
          impact: '±20% ROI 변동',
          mitigation: '단계별 접근 및 파일럿 검증'
        },
        {
          factor: '직원 수용성',
          impact: '±15% ROI 변동',
          mitigation: '충분한 교육 및 인센티브'
        },
        {
          factor: '기술 변화',
          impact: '±10% ROI 변동',
          mitigation: '유연한 기술 스택 채택'
        }
      ]
    },
    
    financialProjection: {
      year1: {
        investment: 150000000,
        benefit: 180000000,
        netBenefit: 30000000,
        cumulativeROI: 20
      },
      year2: {
        investment: 70000000,
        benefit: 280000000,
        netBenefit: 210000000,
        cumulativeROI: 95
      },
      year3: {
        investment: 30000000,
        benefit: 350000000,
        netBenefit: 320000000,
        cumulativeROI: 200
      }
    }
  };
  
  return roiAnalysis;
}

// ================================================================================
// 🎯 AICAMP 맞춤형 제안
// ================================================================================

/**
 * AICAMP 맞춤형 프로그램 제안
 */
function generateCustomizedAICAMPProposal(data, scores, analysis) {
  const companyName = data.회사명 || '귀사';
  const industry = data.업종 || '일반업종';
  const mainConcerns = data.주요고민사항 || '';
  const consultingArea = data.희망컨설팅분야 || '';
  
  const proposal = {
    executive_summary: {
      title: `${companyName} 맞춤형 AI 전환 솔루션`,
      tagline: `${industry} AI 리더로의 도약, AICAMP가 함께합니다`,
      value_proposition: [
        `${mainConcerns} 완벽 해결`,
        'AI 역량 점수 25점 이상 향상 보장',
        'ROI 300% 달성 또는 컨설팅비 환불',
        '12개월 내 AI 선도 기업 전환'
      ]
    },
    
    recommended_programs: {
      immediate: {
        title: '즉시 시작 프로그램',
        programs: [
          {
            name: 'AI Quick Assessment & Planning',
            duration: '2주',
            description: '심층 진단 및 맞춤형 로드맵 수립',
            deliverables: [
              '100페이지 상세 진단 보고서',
              '1년 실행 로드맵',
              'ROI 시뮬레이션'
            ],
            price: '500만원',
            discount: '진단 신청 기업 50% 할인'
          },
          {
            name: `${consultingArea} 집중 컨설팅`,
            duration: '3개월',
            description: '핵심 문제 해결 집중 프로그램',
            deliverables: [
              '주 1회 현장 컨설팅',
              '전담 컨설턴트 배정',
              '성과 측정 대시보드'
            ],
            price: '월 300만원',
            discount: '3개월 패키지 20% 할인'
          }
        ]
      },
      
      education: {
        title: '맞춤형 교육 프로그램',
        programs: [
          {
            name: 'CEO AI 리더십 과정',
            target: '경영진',
            duration: '2일 (16시간)',
            curriculum: [
              'AI 시대 경영 전략',
              'AI 투자 의사결정',
              '조직 변화 관리'
            ],
            benefits: 'AI 비전 수립 및 전략적 의사결정 역량'
          },
          {
            name: `${industry} AI 실무 마스터`,
            target: '실무진',
            duration: '5일 (40시간)',
            curriculum: [
              'ChatGPT/Claude 실무 활용',
              `${industry} 특화 AI 도구`,
              '실습 프로젝트'
            ],
            benefits: '즉시 적용 가능한 실무 스킬'
          },
          {
            name: 'AI 챔피언 양성 과정',
            target: '핵심 인재',
            duration: '10주',
            curriculum: [
              'AI 기술 심화',
              '프로젝트 관리',
              '변화 주도 리더십'
            ],
            benefits: '내부 AI 전문가 20명 육성'
          }
        ]
      },
      
      implementation: {
        title: 'AI 구축 지원 서비스',
        services: [
          {
            name: 'AI 인프라 구축',
            description: '클라우드 기반 AI 플랫폼 구축',
            includes: [
              'AWS/Azure/GCP 설계',
              'AI 도구 통합',
              '보안 체계 구축'
            ],
            duration: '3개월',
            price: '프로젝트 규모별 견적'
          },
          {
            name: 'AI 파일럿 프로젝트',
            description: `${mainConcerns} 해결 파일럿`,
            includes: [
              'POC 개발',
              '성과 측정',
              '확산 계획'
            ],
            duration: '6주',
            price: '2,000만원'
          }
        ]
      },
      
      ongoing_support: {
        title: '지속 성장 지원',
        services: [
          {
            name: 'AI 자문 서비스',
            description: '월간 자문 및 문제 해결 지원',
            includes: [
              '월 1회 경영진 미팅',
              '핫라인 지원',
              '분기별 성과 리뷰'
            ],
            price: '월 100만원'
          },
          {
            name: 'AI 트렌드 업데이트',
            description: '최신 AI 기술 및 사례 공유',
            includes: [
              '월간 트렌드 리포트',
              '분기별 세미나',
              '벤치마킹 투어'
            ],
            price: '연 300만원'
          }
        ]
      }
    },
    
    success_stories: {
      title: `${industry} 성공 사례`,
      cases: [
        {
          company: `${industry} A사`,
          challenge: `${mainConcerns}와 유사한 문제`,
          solution: 'AICAMP 3개월 집중 프로그램',
          results: [
            '매출 35% 증가',
            '운영비 40% 절감',
            '직원 만족도 85%'
          ]
        }
      ]
    },
    
    special_offer: {
      title: '진단 신청 기업 특별 혜택',
      offers: [
        {
          item: '초기 컨설팅',
          original: '500만원',
          discount: '50%',
          final: '250만원'
        },
        {
          item: 'AI 도구 라이선스',
          description: 'ChatGPT Team, Claude Pro',
          value: '월 50만원',
          offer: '6개월 무료'
        },
        {
          item: '전문가 핫라인',
          description: '이후경 대표 직접 상담',
          value: '시간당 50만원',
          offer: '월 2시간 무료 (1년)'
        },
        {
          item: '성과 보장',
          description: 'KPI 미달성시 컨설팅비 환불',
          value: '리스크 제로',
          offer: '100% 환불 보장'
        }
      ],
      total_value: '4,000만원 상당',
      validity: '진단 후 30일 이내',
      contact: {
        name: '이후경 대표',
        title: 'AI 전략 컨설턴트',
        phone: '010-9251-9743',
        email: 'hongik423@gmail.com',
        kakao: '@aicamp',
        booking: 'https://aicamp.ai/consultation'
      }
    },
    
    next_steps: {
      title: '다음 단계',
      steps: [
        {
          step: 1,
          action: '무료 상담 신청',
          description: '30분 화상 상담으로 맞춤형 제안 논의',
          timeline: '즉시 가능'
        },
        {
          step: 2,
          action: '심층 진단 실시',
          description: '2주간 현장 실사 및 데이터 분석',
          timeline: '상담 후 1주 내'
        },
        {
          step: 3,
          action: '맞춤형 제안서 제시',
          description: '투자 대비 효과 분석 포함 상세 제안',
          timeline: '진단 후 1주 내'
        },
        {
          step: 4,
          action: '계약 및 착수',
          description: 'Quick Win 프로젝트로 즉시 시작',
          timeline: '계약 즉시'
        }
      ]
    }
  };
  
  return proposal;
}

// ================================================================================
// 🎯 최종 보고서 생성 - GEMINI AI 활용
// ================================================================================

/**
 * GEMINI AI를 활용한 최종 보고서 생성
 */
function generateEnhancedAIReport(data, allAnalysis) {
  const companyName = data.회사명 || '귀사';
  const industry = data.업종 || '일반업종';
  const businessDetails = data.사업상세설명 || '';
  const mainConcerns = data.주요고민사항 || '';
  const expectedBenefits = data.예상혜택 || '';
  
  // GEMINI 프롬프트 구성
  const prompt = `
당신은 세계 최고의 AI 경영 컨설턴트입니다. 
다음 기업의 AI 역량진단 결과를 바탕으로 최고 수준의 맞춤형 보고서를 작성해주세요.

[기업 정보]
- 회사명: ${companyName}
- 업종: ${industry}
- 사업 내용: ${businessDetails}
- 주요 고민사항: ${mainConcerns}
- 예상 혜택: ${expectedBenefits}

[AI 역량진단 결과]
- 종합 점수: ${allAnalysis.scores.totalScore}점
- AI 성숙도: ${allAnalysis.scores.level}
- 5대 역량 점수: ${JSON.stringify(allAnalysis.scores.aiCapability.scores)}

[분석 결과]
- SWOT 분석: ${JSON.stringify(allAnalysis.swotAnalysis.swot)}
- AI 역량 매트릭스 위치: ${allAnalysis.aiMatrix.currentPosition.quadrant}
- 우선 실행 과제: ${JSON.stringify(allAnalysis.priorityMatrix.executionPriority.slice(0, 3))}

다음 구조로 전문적이고 실행 가능한 보고서를 작성해주세요:

1. 경영진 요약 (Executive Summary)
   - 핵심 발견사항 3가지
   - 즉시 실행 가능한 Quick Win 3가지
   - 예상 성과 및 ROI

2. ${companyName}의 AI 역량 현황
   - 업계 대비 위치
   - 핵심 강점과 개선 영역
   - 긴급 대응 필요 사항

3. ${industry} 업종 AI 트렌드와 기회
   - 글로벌 트렌드
   - 국내 시장 동향
   - ${companyName}의 기회

4. SWOT 기반 전략적 제언
   - SO 전략: 공격적 성장
   - WO 전략: 약점 보완
   - ST 전략: 위협 방어
   - WT 전략: 리스크 최소화

5. ${mainConcerns} 해결 방안
   - 구체적인 해결 방법
   - 단계별 실행 계획
   - 필요 자원 및 일정

6. AI 역량강화 3단계 로드맵
   - 1단계(1-3개월): Quick Win
   - 2단계(4-9개월): 핵심 혁신
   - 3단계(10-12개월): 지속 성장

7. 투자 계획 및 ROI 분석
   - 단계별 투자 계획
   - 예상 수익 및 비용 절감
   - 3년 ROI 전망

8. ${expectedBenefits} 달성 전략
   - 구체적인 달성 방법
   - 성과 측정 지표
   - 리스크 관리 방안

9. 성공을 위한 핵심 요소
   - 조직 문화 변화
   - 인재 육성 계획
   - 거버넌스 체계

10. 다음 단계 및 AICAMP 지원
    - 즉시 착수 사항
    - AICAMP 맞춤 프로그램
    - 성공 보장 방안

각 섹션은 구체적이고 실행 가능한 내용으로 작성하며, 
${companyName}의 상황에 완벽히 맞춤화된 제안을 포함해주세요.
전문적이면서도 이해하기 쉬운 언어로 작성해주세요.
`;

  try {
    // GEMINI API 호출
    const aiResponse = callGeminiAPI(prompt);
    
    if (aiResponse && aiResponse.length > 1000) {
      return {
        success: true,
        report: aiResponse,
        metadata: {
          generatedAt: getCurrentKoreanTime(),
          model: 'GEMINI 2.5 Flash',
          quality: 'Premium'
        }
      };
    } else {
      // 폴백: 구조화된 보고서 생성
      return generateStructuredReport(data, allAnalysis);
    }
  } catch (error) {
    console.error('GEMINI 보고서 생성 실패:', error);
    return generateStructuredReport(data, allAnalysis);
  }
}

/**
 * 구조화된 보고서 생성 (폴백)
 */
function generateStructuredReport(data, allAnalysis) {
  const report = `
# ${data.회사명} AI 역량진단 보고서

## 1. 경영진 요약

### 핵심 발견사항
- AI 역량 종합점수: ${allAnalysis.scores.totalScore}점 (${allAnalysis.scores.grade}등급)
- AI 성숙도 수준: ${allAnalysis.scores.level}
- 업계 대비 위치: ${allAnalysis.aiMatrix.currentPosition.quadrant}

### 즉시 실행 가능한 Quick Win
${allAnalysis.priorityMatrix.executionPriority.slice(0, 3).map((task, i) => 
  `${i + 1}. ${task.strategy}\n   - 실행: ${task.action}\n   - 예상 성과: ${task.expectedResult}`
).join('\n\n')}

## 2. SWOT 분석 및 전략

### 강점 (Strengths)
${allAnalysis.swotAnalysis.swot.strengths.map(s => `- ${s.description}`).join('\n')}

### 약점 (Weaknesses)
${allAnalysis.swotAnalysis.swot.weaknesses.map(w => `- ${w.description} (${w.urgency})`).join('\n')}

### 기회 (Opportunities)
${allAnalysis.swotAnalysis.swot.opportunities.map(o => `- ${o.description} (${o.timeframe})`).join('\n')}

### 위협 (Threats)
${allAnalysis.swotAnalysis.swot.threats.map(t => `- ${t.description} (위험도: ${t.severity})`).join('\n')}

## 3. AI 역량강화 로드맵

${Object.values(allAnalysis.roadmap).slice(1).map(phase => `
### ${phase.title}
- 목표: ${phase.objective}
- 기간: ${phase.duration}
- 예산: ${phase.budget}
- 주요 활동:
${phase.tasks.map(task => `  - ${task.title}`).join('\n')}
`).join('\n')}

## 4. 투자 대비 효과 분석

- 총 투자: ${allAnalysis.roiAnalysis.summary.totalInvestment.toLocaleString()}원
- 3년 예상 수익: ${allAnalysis.roiAnalysis.summary.expectedReturn.toLocaleString()}원
- ROI: ${allAnalysis.roiAnalysis.summary.roi}%
- 투자 회수 기간: ${allAnalysis.roiAnalysis.summary.paybackPeriod}개월

## 5. AICAMP 맞춤 제안

${allAnalysis.aicampProposal.recommended_programs.immediate.programs.map(program => `
### ${program.name}
- 기간: ${program.duration}
- 가격: ${program.price} (${program.discount})
- 산출물: ${program.deliverables.join(', ')}
`).join('\n')}

### 특별 혜택
${allAnalysis.aicampProposal.special_offer.offers.map(offer => 
  `- ${offer.item}: ${offer.final || offer.offer}`
).join('\n')}

## 다음 단계

1. 무료 상담 신청: 010-9251-9743
2. 심층 진단 실시
3. 맞춤형 프로그램 시작

---
보고서 생성일: ${getCurrentKoreanTime()}
AICAMP - AI로 만드는 고몰입 조직
`;

  return {
    success: true,
    report: report,
    metadata: {
      generatedAt: getCurrentKoreanTime(),
      model: 'Structured Template',
      quality: 'Standard'
    }
  };
}

// ================================================================================
// 🎯 헬퍼 함수들
// ================================================================================

function getCapabilityName(key) {
  const names = {
    aiUnderstanding: 'AI 이해 및 활용 전략',
    dataManagement: '데이터 관리 및 분석',
    processOptimization: '프로세스 혁신 및 자동화',
    talentDevelopment: '인재 육성 및 조직 문화',
    customerExperience: '고객 경험 및 가치 창출',
    documentAutomation: '문서 자동화',
    dataAnalysis: '데이터 분석',
    aiToolUsage: 'AI 도구 활용',
    digitalCollaboration: '디지털 협업',
    industrySpecific: '업종 특화'
  };
  return names[key] || key;
}

function getGradeFromScore(score) {
  if (score >= 90) return 'S';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

function getIndustryAITrends(industry) {
  const trends = {
    '제조업': [
      '스마트 팩토리 및 디지털 트윈',
      '예측 정비 및 품질 관리 AI',
      '공급망 최적화 AI'
    ],
    'IT/소프트웨어': [
      'AI 코드 생성 및 자동화',
      'MLOps 및 AI 모델 관리',
      'AI 기반 보안 솔루션'
    ],
    '유통/도소매': [
      '개인화 추천 시스템',
      'AI 기반 수요 예측',
      '무인 매장 및 자동화'
    ],
    '서비스업': [
      'AI 챗봇 및 가상 어시스턴트',
      '감정 분석 및 고객 경험 최적화',
      'AI 기반 예약 및 스케줄링'
    ]
  };
  
  return trends[industry] || ['AI 자동화', 'AI 분석', 'AI 고객 서비스'];
}

function getCurrentKoreanTime() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const koreaTime = new Date(utc + (9 * 3600000));
  
  return koreaTime.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Seoul'
  });
}

// ================================================================================
// 🎯 메인 진단 처리 함수
// ================================================================================

/**
 * AI 역량진단 신청 처리 (향상된 버전)
 */
function handleEnhancedAIDiagnosisSubmission(data) {
  try {
    console.log('🚀 향상된 AI 역량진단 처리 시작');
    
    // 1. 종합 점수 계산
    const scores = calculateEnhancedScores(data);
    console.log('✅ 점수 계산 완료:', scores);
    
    // 2. SWOT 분석
    const swotAnalysis = performEnhancedSWOTAnalysis(data, scores);
    console.log('✅ SWOT 분석 완료');
    
    // 3. AI 역량 매트릭스
    const aiMatrix = generateAICapabilityMatrix(scores, data);
    console.log('✅ AI 역량 매트릭스 생성 완료');
    
    // 4. 중요도-긴급성 매트릭스
    const priorityMatrix = generateImportanceUrgencyMatrix(swotAnalysis, scores, data);
    console.log('✅ 우선순위 매트릭스 생성 완료');
    
    // 5. 3단계 실행 로드맵
    const roadmap = generateEnhancedExecutionRoadmap(data, scores, swotAnalysis);
    console.log('✅ 실행 로드맵 생성 완료');
    
    // 6. ROI 분석
    const roiAnalysis = generateDetailedROIAnalysis(data, scores, roadmap);
    console.log('✅ ROI 분석 완료');
    
    // 7. AICAMP 맞춤 제안
    const aicampProposal = generateCustomizedAICAMPProposal(data, scores, {
      swotAnalysis,
      aiMatrix,
      priorityMatrix,
      roadmap,
      roiAnalysis
    });
    console.log('✅ AICAMP 제안 생성 완료');
    
    // 8. 최종 보고서 생성
    const allAnalysis = {
      scores,
      swotAnalysis,
      aiMatrix,
      priorityMatrix,
      roadmap,
      roiAnalysis,
      aicampProposal
    };
    
    const finalReport = generateEnhancedAIReport(data, allAnalysis);
    console.log('✅ 최종 보고서 생성 완료');
    
    // 9. 데이터 저장
    const diagnosisId = saveEnhancedDiagnosisData(data, allAnalysis, finalReport);
    
    // 10. 이메일 발송
    if (AUTO_REPLY_ENABLED) {
      sendEnhancedDiagnosisEmail(data, finalReport, diagnosisId);
    }
    
    return {
      success: true,
      diagnosisId: diagnosisId,
      summary: {
        totalScore: scores.totalScore,
        grade: scores.grade,
        level: scores.level,
        position: aiMatrix.currentPosition.quadrant,
        topPriorities: priorityMatrix.executionPriority.slice(0, 3),
        roi: roiAnalysis.summary.roi
      }
    };
    
  } catch (error) {
    console.error('❌ 향상된 진단 처리 오류:', error);
    throw error;
  }
}

/**
 * 향상된 진단 데이터 저장
 */
function saveEnhancedDiagnosisData(data, analysis, report) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID)
      .getSheetByName(SHEETS.DIAGNOSIS);
    
    const diagnosisId = 'ACD-' + Date.now();
    const timestamp = getCurrentKoreanTime();
    
    // 저장할 데이터 구성
    const rowData = [
      diagnosisId,
      timestamp,
      data.회사명 || '',
      data.업종 || '',
      data.담당자명 || '',
      data.이메일 || '',
      data.연락처 || '',
      analysis.scores.totalScore,
      analysis.scores.grade,
      analysis.scores.level,
      analysis.aiMatrix.currentPosition.quadrant,
      JSON.stringify(analysis.scores),
      JSON.stringify(analysis.swotAnalysis),
      JSON.stringify(analysis.priorityMatrix.executionPriority.slice(0, 3)),
      JSON.stringify(analysis.roadmap.overview),
      analysis.roiAnalysis.summary.roi + '%',
      report.report.substring(0, 1000) + '...',
      '처리완료'
    ];
    
    sheet.appendRow(rowData);
    console.log('✅ 진단 데이터 저장 완료:', diagnosisId);
    
    return diagnosisId;
    
  } catch (error) {
    console.error('❌ 데이터 저장 오류:', error);
    throw error;
  }
}

/**
 * 향상된 진단 결과 이메일 발송
 */
function sendEnhancedDiagnosisEmail(data, report, diagnosisId) {
  try {
    const recipientEmail = data.이메일 || data.email;
    const companyName = data.회사명 || data.companyName || '귀사';
    const contactName = data.담당자명 || data.contactName || '담당자';
    
    const subject = `[AICAMP] ${companyName} AI 역량진단 결과 - 맞춤형 AI 전환 로드맵`;
    
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Noto Sans KR', Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 800px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; }
    .content { background: #f8f9fa; padding: 30px; margin: 20px 0; border-radius: 10px; }
    .highlight { background: #fff; padding: 20px; margin: 15px 0; border-left: 4px solid #667eea; border-radius: 5px; }
    .cta { background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
    .footer { text-align: center; margin-top: 40px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 ${companyName} AI 역량진단 결과</h1>
      <p>AI로 만드는 고몰입 조직, AICAMP가 함께합니다</p>
    </div>
    
    <div class="content">
      <p>안녕하세요, ${contactName}님</p>
      <p>${companyName}의 AI 역량진단이 완료되었습니다. 
      귀사만을 위한 맞춤형 AI 전환 로드맵을 확인해보세요.</p>
      
      <div class="highlight">
        <h3>📊 진단 결과 요약</h3>
        <ul>
          <li>종합 점수: <strong>${report.metadata.totalScore || '분석중'}점</strong></li>
          <li>AI 성숙도: <strong>${report.metadata.level || '분석중'}</strong></li>
          <li>예상 ROI: <strong>${report.metadata.roi || '300'}%</strong></li>
        </ul>
      </div>
      
      <div class="highlight">
        <h3>🚀 즉시 실행 가능한 Quick Win</h3>
        <p>다음 3가지를 즉시 실행하여 빠른 성과를 달성하세요:</p>
        <ol>
          <li>ChatGPT/Claude를 활용한 업무 자동화</li>
          <li>AI 챔피언 선발 및 교육</li>
          <li>파일럿 프로젝트 시작</li>
        </ol>
      </div>
      
      <div class="highlight">
        <h3>🎁 특별 혜택</h3>
        <ul>
          <li>초기 컨설팅 50% 할인 (250만원)</li>
          <li>AI 도구 6개월 무료 라이선스</li>
          <li>이후경 대표 직접 상담 (월 2시간, 1년)</li>
          <li>성과 미달성시 100% 환불 보장</li>
        </ul>
        <p><strong>혜택 유효기간: 30일</strong></p>
      </div>
      
      <center>
        <a href="https://aicamp.ai/diagnosis-result/${diagnosisId}" class="cta">
          상세 보고서 확인하기
        </a>
      </center>
      
      <p>궁금하신 점이 있으시면 언제든 연락주세요.</p>
      <p>
        이후경 대표<br>
        📞 010-9251-9743<br>
        📧 hongik423@gmail.com<br>
        💬 카카오톡: @aicamp
      </p>
    </div>
    
    <div class="footer">
      <p>본 메일은 AI 역량진단을 신청하신 분께 발송되었습니다.</p>
      <p>© 2025 AICAMP. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;
    
    // 보고서 PDF 첨부 (텍스트 버전)
    const blob = Utilities.newBlob(report.report, 'text/plain', 
      `${companyName}_AI역량진단보고서_${diagnosisId}.txt`);
    
    MailApp.sendEmail({
      to: recipientEmail,
      cc: ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
      attachments: [blob]
    });
    
    console.log('✅ 진단 결과 이메일 발송 완료:', recipientEmail);
    
  } catch (error) {
    console.error('❌ 이메일 발송 오류:', error);
  }
}

// ================================================================================
// 🎯 API 엔드포인트
// ================================================================================

/**
 * POST 요청 처리
 */
function doPost(e) {
  try {
    const requestData = JSON.parse(e.postData.contents);
    
    // AI 역량진단 처리
    if (requestData.formType === 'ai-capability-diagnosis-enhanced') {
      return ContentService
        .createTextOutput(JSON.stringify(
          handleEnhancedAIDiagnosisSubmission(requestData)
        ))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // 기타 요청 처리...
    
  } catch (error) {
    console.error('POST 처리 오류:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET 요청 처리
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      service: 'AICAMP AI 역량진단 시스템 v4.0',
      status: '정상 작동 중',
      features: [
        '향상된 SWOT 분석',
        'AI 역량진단 매트릭스',
        '중요도-긴급성 매트릭스',
        '3단계 실행 로드맵',
        '상세 ROI 분석',
        'AICAMP 맞춤 제안'
      ]
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ================================================================================
// 🎯 GEMINI API 호출 함수
// ================================================================================

function callGeminiAPI(prompt) {
  try {
    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 32768,
        candidateCount: 1
      }
    };
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify(requestBody),
      muteHttpExceptions: true,
      timeout: TIMEOUT_SETTINGS.GEMINI_API
    };
    
    const apiUrl = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;
    const response = UrlFetchApp.fetch(apiUrl, options);
    
    if (response.getResponseCode() === 200) {
      const responseData = JSON.parse(response.getContentText());
      if (responseData.candidates && responseData.candidates[0]) {
        return responseData.candidates[0].content.parts[0].text;
      }
    }
    
    throw new Error('GEMINI API 응답 오류');
    
  } catch (error) {
    console.error('GEMINI API 호출 실패:', error);
    throw error;
  }
}

// ================================================================================
// 테스트 함수
// ================================================================================

function testEnhancedDiagnosis() {
  const testData = {
    회사명: '테스트기업',
    업종: '제조업',
    담당자명: '홍길동',
    이메일: 'test@example.com',
    연락처: '010-1234-5678',
    사업상세설명: '자동차 부품 제조 및 공급',
    주요고민사항: '생산 효율성 저하 및 품질 관리 어려움',
    예상혜택: '생산성 30% 향상 및 불량률 50% 감소',
    희망컨설팅분야: '스마트팩토리 구축',
    현재AI도구활용: 'ChatGPT',
    AI기술이해도: 3,
    AI활용전략수립: 2,
    AI투자의사결정: 3,
    데이터수집체계: 3,
    데이터품질관리: 2,
    데이터분석역량: 2,
    업무프로세스분석: 3,
    자동화가능성평가: 4,
    AI기반프로세스개선: 2,
    AI교육체계: 2,
    변화관리역량: 3,
    혁신문화조성: 3,
    고객데이터활용: 3,
    AI기반서비스개발: 2,
    고객만족도향상: 3
  };
  
  const result = handleEnhancedAIDiagnosisSubmission(testData);
  console.log('테스트 결과:', result);
}