/**
 * 🎯 Google Apps Script - 45개 행동지표 처리 핸들러
 * McKinsey 스타일 보고서 생성을 위한 통합 시스템
 */

/**
 * 45개 질문 응답 데이터 정규화
 */
function normalize45QuestionsData(requestData) {
  console.log('📋 45개 질문 데이터 정규화 시작');
  
  const normalizedData = {
    // 기본 정보
    timestamp: new Date().toISOString(),
    diagnosisId: `MCKINSEY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    version: 'V15.0-ULTIMATE-45Q',
    
    // 회사 정보
    companyInfo: {
      name: requestData.companyName || '미입력',
      industry: requestData.industry || '기타',
      size: requestData.employeeCount || '미입력',
      contact: {
        name: requestData.contactName || '미입력',
        email: requestData.contactEmail || '',
        phone: requestData.contactPhone || '',
        position: requestData.contactPosition || ''
      }
    },
    
    // 45개 질문 응답 (1-5점 척도)
    responses: {},
    
    // 메타데이터
    metadata: {
      responseCount: 0,
      completionRate: 0,
      averageScore: 0,
      submissionTime: new Date().toISOString()
    }
  };
  
  // 응답 데이터 정규화
  if (requestData.responses && typeof requestData.responses === 'object') {
    const responses = requestData.responses;
    let totalScore = 0;
    let responseCount = 0;
    
    // 1-45번 질문 처리
    for (let i = 1; i <= 45; i++) {
      const questionKey = `q${i}`;
      const altKey = i.toString();
      
      let score = responses[questionKey] || responses[altKey] || 0;
      
      // 점수 유효성 검증 (1-5점 범위)
      if (typeof score === 'string') {
        score = parseInt(score, 10);
      }
      
      if (isNaN(score) || score < 1 || score > 5) {
        score = 3; // 기본값 (보통)
      }
      
      normalizedData.responses[questionKey] = score;
      totalScore += score;
      responseCount++;
    }
    
    // 메타데이터 계산
    normalizedData.metadata.responseCount = responseCount;
    normalizedData.metadata.completionRate = Math.round((responseCount / 45) * 100);
    normalizedData.metadata.averageScore = responseCount > 0 ? Math.round((totalScore / responseCount) * 20) : 0; // 100점 만점으로 변환
  }
  
  console.log('✅ 45개 질문 데이터 정규화 완료:', {
    diagnosisId: normalizedData.diagnosisId,
    companyName: normalizedData.companyInfo.name,
    responseCount: normalizedData.metadata.responseCount,
    completionRate: normalizedData.metadata.completionRate,
    averageScore: normalizedData.metadata.averageScore
  });
  
  return normalizedData;
}

/**
 * 45개 질문 기반 점수 분석
 */
function analyze45QuestionsScores(normalizedData) {
  console.log('📊 45개 질문 점수 분석 시작');
  
  const responses = normalizedData.responses;
  
  // 카테고리별 질문 매핑 (45개 질문)
  const categoryMapping = {
    businessFoundation: [1, 2, 3, 4, 5, 6, 7, 8], // 사업 기반 (8문항)
    currentAI: [9, 10, 11, 12, 13, 14, 15, 16], // 현재 AI 활용 (8문항)
    organizationReadiness: [17, 18, 19, 20, 21, 22, 23, 24], // 조직 준비도 (8문항)
    techInfrastructure: [25, 26, 27, 28, 29, 30, 31, 32], // 기술 인프라 (8문항)
    goalClarity: [33, 34, 35, 36, 37, 38, 39, 40], // 목표 명확성 (8문항)
    executionCapability: [41, 42, 43, 44, 45] // 실행 역량 (5문항)
  };
  
  // 카테고리별 가중치
  const categoryWeights = {
    businessFoundation: 1.0,
    currentAI: 1.2,
    organizationReadiness: 1.3,
    techInfrastructure: 1.3,
    goalClarity: 1.4,
    executionCapability: 1.5
  };
  
  // 카테고리별 점수 계산
  const categoryScores = {};
  let totalWeightedScore = 0;
  let totalWeight = 0;
  
  Object.entries(categoryMapping).forEach(([category, questionIds]) => {
    let categorySum = 0;
    let categoryCount = 0;
    
    questionIds.forEach(questionId => {
      const score = responses[`q${questionId}`] || 3;
      categorySum += score;
      categoryCount++;
    });
    
    const categoryAverage = categorySum / categoryCount;
    const categoryScore = Math.round(categoryAverage * 20); // 100점 만점으로 변환
    categoryScores[category] = categoryScore;
    
    // 가중 점수 계산
    const weight = categoryWeights[category];
    totalWeightedScore += categoryAverage * weight;
    totalWeight += weight;
  });
  
  // 전체 점수 계산
  const totalScore = Math.round((totalWeightedScore / totalWeight) * 20); // 100점 만점
  const averageScore = Object.values(categoryScores).reduce((sum, score) => sum + score, 0) / Object.keys(categoryScores).length;
  
  // 성숙도 레벨 결정
  let maturityLevel = 'AI 준비 단계';
  if (totalScore >= 90) maturityLevel = 'AI 혁신 리더';
  else if (totalScore >= 80) maturityLevel = 'AI 전문가';
  else if (totalScore >= 70) maturityLevel = 'AI 활용자';
  else if (totalScore >= 60) maturityLevel = 'AI 학습자';
  else if (totalScore >= 50) maturityLevel = 'AI 입문자';
  
  // 등급 결정
  let grade = 'F';
  if (totalScore >= 90) grade = 'S';
  else if (totalScore >= 80) grade = 'A';
  else if (totalScore >= 70) grade = 'B';
  else if (totalScore >= 60) grade = 'C';
  else if (totalScore >= 50) grade = 'D';
  
  // 업계 백분위 계산 (간단한 근사)
  const industryAverages = {
    'IT/소프트웨어': 72,
    '제조업(전자/기계)': 65,
    '제조업(화학/소재)': 63,
    '금융/보험': 68,
    '유통/도소매': 60,
    '서비스업(B2B)': 58,
    '서비스업(B2C)': 55,
    '의료/헬스케어': 62,
    '교육/연구': 59,
    '건설/부동산': 52,
    '물류/운송': 57,
    '미디어/콘텐츠': 64,
    '농업/식품': 48,
    '에너지/환경': 61,
    '기타': 58
  };
  
  const industryAverage = industryAverages[normalizedData.companyInfo.industry] || 58;
  const percentile = Math.max(1, Math.min(99, Math.round(50 + ((totalScore - industryAverage) / 15) * 30)));
  
  const scoreAnalysis = {
    totalScore,
    averageScore: Math.round(averageScore),
    categoryScores: {
      businessFoundation: categoryScores.businessFoundation || 0,
      currentAI: categoryScores.currentAI || 0,
      organizationReadiness: categoryScores.organizationReadiness || 0,
      techInfrastructure: categoryScores.techInfrastructure || 0,
      goalClarity: categoryScores.goalClarity || 0,
      executionCapability: categoryScores.executionCapability || 0
    },
    weightedScore: totalScore,
    percentile,
    grade,
    maturityLevel
  };
  
  console.log('✅ 45개 질문 점수 분석 완료:', {
    totalScore: scoreAnalysis.totalScore,
    grade: scoreAnalysis.grade,
    maturityLevel: scoreAnalysis.maturityLevel,
    percentile: scoreAnalysis.percentile
  });
  
  return scoreAnalysis;
}

/**
 * 45개 질문 기반 SWOT 분석
 */
function generateAdvanced45QuestionsSWOT(normalizedData, scoreAnalysis) {
  console.log('🎯 45개 질문 기반 SWOT 분석 시작');
  
  const { categoryScores } = scoreAnalysis;
  const companyInfo = normalizedData.companyInfo;
  
  // 강점 (70점 이상 카테고리)
  const strengths = [];
  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score >= 70) {
      const categoryNames = {
        businessFoundation: '사업 기반',
        currentAI: 'AI 활용 역량',
        organizationReadiness: '조직 준비도',
        techInfrastructure: '기술 인프라',
        goalClarity: '목표 설정',
        executionCapability: '실행 역량'
      };
      
      strengths.push({
        category: categoryNames[category] || category,
        score,
        description: `${categoryNames[category]} 영역에서 우수한 성과를 보이고 있습니다 (${score}점)`
      });
    }
  });
  
  // 약점 (60점 미만 카테고리)
  const weaknesses = [];
  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score < 60) {
      const categoryNames = {
        businessFoundation: '사업 기반',
        currentAI: 'AI 활용 역량',
        organizationReadiness: '조직 준비도',
        techInfrastructure: '기술 인프라',
        goalClarity: '목표 설정',
        executionCapability: '실행 역량'
      };
      
      weaknesses.push({
        category: categoryNames[category] || category,
        score,
        description: `${categoryNames[category]} 영역에서 개선이 필요합니다 (${score}점)`
      });
    }
  });
  
  // 기회 요인 (업종별 맞춤)
  const industryOpportunities = {
    'IT/소프트웨어': [
      'AI 네이티브 서비스 개발 기회',
      '글로벌 시장 진출 가능성',
      '플랫폼 비즈니스 모델 확장'
    ],
    '제조업(전자/기계)': [
      '스마트팩토리 구축을 통한 생산성 혁신',
      'IoT 기반 예측 정비 도입',
      '품질 관리 자동화 시스템 구축'
    ],
    '금융/보험': [
      '개인화된 금융 서비스 제공',
      'AI 기반 리스크 관리 고도화',
      '디지털 금융 플랫폼 구축'
    ],
    '기타': [
      'AI 기반 업무 자동화 확산',
      '데이터 기반 의사결정 체계 구축',
      '고객 경험 개선을 통한 경쟁우위 확보'
    ]
  };
  
  const opportunities = industryOpportunities[companyInfo.industry] || industryOpportunities['기타'];
  
  // 위협 요인
  const threats = [
    '경쟁사의 빠른 AI 도입으로 인한 경쟁 격화',
    'AI 전문 인력 확보의 어려움',
    '기술 변화 속도에 따른 적응 지연 리스크',
    '데이터 보안 및 개인정보보호 규제 강화'
  ];
  
  const swotAnalysis = {
    strengths,
    weaknesses,
    opportunities,
    threats,
    summary: {
      strengthCount: strengths.length,
      weaknessCount: weaknesses.length,
      overallAssessment: scoreAnalysis.totalScore >= 70 ? '강점 기반 성장 전략' : 
                        scoreAnalysis.totalScore >= 50 ? '균형적 개선 전략' : '약점 보완 집중 전략'
    }
  };
  
  console.log('✅ 45개 질문 기반 SWOT 분석 완료:', {
    strengths: swotAnalysis.strengths.length,
    weaknesses: swotAnalysis.weaknesses.length,
    assessment: swotAnalysis.summary.overallAssessment
  });
  
  return swotAnalysis;
}

/**
 * 45개 질문 기반 우선순위 매트릭스 생성
 */
function generate45QuestionsPriorityMatrix(swotAnalysis, scoreAnalysis, normalizedData) {
  console.log('📈 45개 질문 기반 우선순위 매트릭스 생성 시작');
  
  const { categoryScores, totalScore } = scoreAnalysis;
  const { companyInfo } = normalizedData;
  
  // 중요도-긴급성 매트릭스 항목들
  const matrixItems = [];
  
  // 카테고리별 우선순위 결정
  Object.entries(categoryScores).forEach(([category, score]) => {
    const categoryInfo = {
      businessFoundation: { name: '사업 기반 강화', urgency: 3, importance: 4 },
      currentAI: { name: 'AI 도구 활용 확산', urgency: 5, importance: 5 },
      organizationReadiness: { name: '조직 변화 관리', urgency: 4, importance: 5 },
      techInfrastructure: { name: '기술 인프라 구축', urgency: 3, importance: 4 },
      goalClarity: { name: 'AI 전략 수립', urgency: 4, importance: 5 },
      executionCapability: { name: '실행 역량 강화', urgency: 5, importance: 4 }
    };
    
    const info = categoryInfo[category];
    if (info && score < 70) { // 70점 미만인 경우만 개선 과제로 포함
      // 점수가 낮을수록 긴급성 증가
      const adjustedUrgency = Math.min(5, info.urgency + Math.floor((70 - score) / 15));
      
      matrixItems.push({
        task: info.name,
        category,
        currentScore: score,
        importance: info.importance,
        urgency: adjustedUrgency,
        priority: info.importance * adjustedUrgency,
        timeline: adjustedUrgency >= 4 ? '1-3개월' : '3-6개월',
        resources: getRequiredResources(category, companyInfo.size)
      });
    }
  });
  
  // 우선순위별 정렬 (priority 높은 순)
  matrixItems.sort((a, b) => b.priority - a.priority);
  
  // 상위 5개 과제 선별
  const topPriorities = matrixItems.slice(0, 5);
  
  const priorityMatrix = {
    items: matrixItems,
    topPriorities,
    summary: {
      totalTasks: matrixItems.length,
      highPriority: matrixItems.filter(item => item.priority >= 20).length,
      mediumPriority: matrixItems.filter(item => item.priority >= 15 && item.priority < 20).length,
      lowPriority: matrixItems.filter(item => item.priority < 15).length
    }
  };
  
  console.log('✅ 45개 질문 기반 우선순위 매트릭스 생성 완료:', {
    totalTasks: priorityMatrix.summary.totalTasks,
    highPriority: priorityMatrix.summary.highPriority,
    topTask: topPriorities[0]?.task || 'N/A'
  });
  
  return priorityMatrix;
}

/**
 * 카테고리별 필요 자원 반환
 */
function getRequiredResources(category, companySize) {
  const resourceMap = {
    businessFoundation: ['전략 컨설팅', '시장 조사', '비즈니스 모델 워크숍'],
    currentAI: ['AI 도구 라이선스', 'AI 교육 프로그램', '활용 가이드라인'],
    organizationReadiness: ['변화 관리 전문가', '리더십 교육', '커뮤니케이션 플랫폼'],
    techInfrastructure: ['클라우드 플랫폼', 'IT 인프라 업그레이드', '보안 솔루션'],
    goalClarity: ['전략 기획 전문가', 'KPI 설계', '성과 관리 시스템'],
    executionCapability: ['프로젝트 매니저', '실행 도구', '모니터링 시스템']
  };
  
  const baseResources = resourceMap[category] || ['전문가 지원', '교육 프로그램', '관리 도구'];
  
  // 회사 규모에 따른 자원 조정
  if (companySize && companySize.includes('10명 미만')) {
    return baseResources.slice(0, 2); // 소규모 기업은 자원 제한
  } else if (companySize && (companySize.includes('100명') || companySize.includes('300명'))) {
    return [...baseResources, '전담 팀 구성']; // 중대규모 기업은 자원 확대
  }
  
  return baseResources;
}

/**
 * 45개 질문 기반 3단계 로드맵 생성
 */
function generate45Questions3PhaseRoadmap(priorityMatrix, swotAnalysis, normalizedData) {
  console.log('🗺️ 45개 질문 기반 3단계 로드맵 생성 시작');
  
  const { companyInfo } = normalizedData;
  const { topPriorities } = priorityMatrix;
  
  // Phase 1: AI 기반 구축 (1-3개월)
  const phase1 = {
    title: 'AI 기반 구축 단계',
    duration: '1-3개월',
    objectives: [
      'AI 도구 도입 및 기본 활용 체계 구축',
      '조직 변화 관리 프로세스 수립',
      '데이터 기초 인프라 정비'
    ],
    keyActivities: [
      'ChatGPT, Claude 등 생성형 AI 도구 도입',
      'AI 활용 가이드라인 및 정책 수립',
      '전 직원 대상 AI 기초 교육 실시',
      '데이터 현황 분석 및 품질 개선'
    ],
    milestones: [
      '전 직원 AI 도구 활용 시작 (100%)',
      'AI 정책 문서 완성 및 배포',
      'AI 기초 교육 완료율 90% 달성',
      '핵심 데이터 정리 및 접근성 개선'
    ],
    budget: getBudgetBySize(companyInfo.size, 'phase1'),
    successMetrics: [
      'AI 도구 일일 활용률 70% 이상',
      '업무 효율성 20% 향상',
      '직원 AI 만족도 4.0/5.0 이상'
    ]
  };
  
  // Phase 2: AI 활용 확산 (3-6개월)
  const phase2 = {
    title: 'AI 활용 확산 단계',
    duration: '3-6개월',
    objectives: [
      '업무 프로세스 AI 통합 및 자동화',
      '데이터 기반 의사결정 체계 구축',
      'AI 성과 측정 및 최적화 시스템 도입'
    ],
    keyActivities: [
      '부서별 맞춤형 AI 솔루션 도입',
      '워크플로우 자동화 프로세스 구현',
      'BI 도구 및 데이터 분석 역량 강화',
      'AI 성과 KPI 설정 및 모니터링 체계 구축'
    ],
    milestones: [
      '핵심 업무 프로세스 50% AI 통합',
      '자동화 워크플로우 10개 이상 구축',
      '데이터 기반 의사결정 비율 70% 달성',
      'AI ROI 측정 체계 완성'
    ],
    budget: getBudgetBySize(companyInfo.size, 'phase2'),
    successMetrics: [
      '업무 처리 시간 40% 단축',
      '의사결정 속도 50% 향상',
      'AI 투자 ROI 150% 이상'
    ]
  };
  
  // Phase 3: AI 전문 조직 (6-12개월)
  const phase3 = {
    title: 'AI 전문 조직 단계',
    duration: '6-12개월',
    objectives: [
      'AI 센터 오브 엑셀런스 구축',
      '고도화된 맞춤형 AI 솔루션 개발',
      'AI 기반 비즈니스 모델 혁신 추진'
    ],
    keyActivities: [
      'AI 전담 조직 신설 및 전문 인력 확보',
      '업종 특화 AI 솔루션 자체 개발',
      'AI 기반 신규 서비스 및 제품 출시',
      '업계 AI 리더십 확보 및 생태계 구축'
    ],
    milestones: [
      'AI 전담팀 구성 완료 (5명 이상)',
      '자체 개발 AI 솔루션 3개 이상 완성',
      'AI 기반 신규 서비스 정식 출시',
      '업계 AI 성숙도 상위 10% 달성'
    ],
    budget: getBudgetBySize(companyInfo.size, 'phase3'),
    successMetrics: [
      'AI 성숙도 80점 이상 달성',
      '신규 AI 서비스 매출 기여도 20% 이상',
      '업계 AI 혁신 사례로 인정'
    ]
  };
  
  const roadmap = {
    phase1,
    phase2,
    phase3,
    summary: {
      totalDuration: '12개월',
      totalBudget: calculateTotalBudget([phase1.budget, phase2.budget, phase3.budget]),
      expectedROI: '300% 이상 (3년 기준)',
      riskLevel: '중간',
      successProbability: '85%'
    }
  };
  
  console.log('✅ 45개 질문 기반 3단계 로드맵 생성 완료:', {
    phase1Duration: roadmap.phase1.duration,
    phase2Duration: roadmap.phase2.duration,
    phase3Duration: roadmap.phase3.duration,
    totalBudget: roadmap.summary.totalBudget
  });
  
  return roadmap;
}

/**
 * 회사 규모별 예산 계산
 */
function getBudgetBySize(companySize, phase) {
  const budgetMatrix = {
    '10명 미만': {
      phase1: '1,000만원 - 2,000만원',
      phase2: '2,000만원 - 3,000만원',
      phase3: '3,000만원 - 5,000만원'
    },
    '10-30명': {
      phase1: '2,000만원 - 3,000만원',
      phase2: '3,000만원 - 5,000만원',
      phase3: '5,000만원 - 8,000만원'
    },
    '31-50명': {
      phase1: '3,000만원 - 5,000만원',
      phase2: '5,000만원 - 8,000만원',
      phase3: '8,000만원 - 1억 2,000만원'
    },
    '51-100명': {
      phase1: '5,000만원 - 8,000만원',
      phase2: '8,000만원 - 1억 2,000만원',
      phase3: '1억 2,000만원 - 2억원'
    },
    '101명 이상': {
      phase1: '8,000만원 - 1억 2,000만원',
      phase2: '1억 2,000만원 - 2억원',
      phase3: '2억원 - 3억원'
    }
  };
  
  // 회사 규모 매칭
  let sizeKey = '31-50명'; // 기본값
  if (companySize) {
    if (companySize.includes('10명 미만')) sizeKey = '10명 미만';
    else if (companySize.includes('10-30명')) sizeKey = '10-30명';
    else if (companySize.includes('31-50명')) sizeKey = '31-50명';
    else if (companySize.includes('51-100명')) sizeKey = '51-100명';
    else if (companySize.includes('100명') || companySize.includes('300명') || companySize.includes('500명') || companySize.includes('1000명')) {
      sizeKey = '101명 이상';
    }
  }
  
  return budgetMatrix[sizeKey]?.[phase] || budgetMatrix['31-50명'][phase];
}

/**
 * 총 예산 계산
 */
function calculateTotalBudget(budgets) {
  // 예산 문자열에서 숫자 추출하여 평균 계산
  let totalMin = 0;
  let totalMax = 0;
  
  budgets.forEach(budget => {
    const matches = budget.match(/(\d+(?:,\d+)*)/g);
    if (matches && matches.length >= 2) {
      const min = parseInt(matches[0].replace(/,/g, ''));
      const max = parseInt(matches[1].replace(/,/g, ''));
      totalMin += min;
      totalMax += max;
    }
  });
  
  if (totalMax >= 10000) { // 1억 이상
    return `${Math.round(totalMin/10000)}억원 - ${Math.round(totalMax/10000)}억원`;
  } else {
    return `${totalMin.toLocaleString()}만원 - ${totalMax.toLocaleString()}만원`;
  }
}
