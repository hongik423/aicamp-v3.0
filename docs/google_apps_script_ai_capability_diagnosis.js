/**
 * 이후경 교장의 AI 역량 고몰입조직구축 진단시스템
 * Google Apps Script 추가 함수
 * 
 * 이 코드는 기존 google_apps_script_simplified_NO_PDF.js에 추가되어야 합니다.
 */

// ===== AI 역량진단 시스템 전용 함수들 =====

/**
 * AI 역량진단 신청 처리
 */
function handleAICapabilityDiagnosisSubmission(data) {
  try {
    // 개인정보 동의 확인
    if (!data.privacyConsent) {
      return createErrorResponse('개인정보 처리 동의가 필요합니다');
    }
    
    // 필수 필드 검증
    if (!data.email || !data.companyName || !data.applicantName) {
      return createErrorResponse('필수 정보가 누락되었습니다');
    }
    
    // 이메일 유효성 검증
    if (!isValidEmail(data.email)) {
      return createErrorResponse('유효하지 않은 이메일 주소입니다');
    }
    
    // AI 역량 평가 응답 검증
    if (!data.assessmentResponses || Object.keys(data.assessmentResponses).length < 24) {
      return createErrorResponse('AI 역량 평가를 모두 완료해주세요');
    }
    
    // 진단 ID 생성
    const diagnosisId = data.diagnosisId || generateAICapabilityDiagnosisId();
    const timestamp = getCurrentKoreanTime();
    
    // 진단 데이터 저장
    saveAICapabilityDiagnosisApplication(diagnosisId, data, timestamp);
    
    // 확인 이메일 발송
    sendAICapabilityDiagnosisConfirmationEmail(data.email, data.companyName, diagnosisId);
    
    // 관리자 알림
    sendAICapabilityDiagnosisAdminNotification(data, diagnosisId);
    
    // AI 분석 트리거 설정 (5초 후 실행)
    setAICapabilityDiagnosisTrigger(diagnosisId, data);
    
    // 진단 진행 상태 업데이트
    updateAICapabilityDiagnosisProgress(diagnosisId, 'processing', 10, '분석을 시작합니다');
    
    return createSuccessResponse({
      diagnosisId: diagnosisId,
      message: 'AI 역량진단이 시작되었습니다. 결과는 이메일로 발송됩니다.'
    });
    
  } catch (error) {
    console.error('AI 역량진단 처리 오류:', error);
    notifyAdminAICapabilityDiagnosisError(data.diagnosisId || 'Unknown', error);
    return createErrorResponse('진단 신청 중 오류가 발생했습니다: ' + error.toString());
  }
}

/**
 * AI 역량진단 ID 생성
 */
function generateAICapabilityDiagnosisId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `ACD-${timestamp}-${random}`;
}

/**
 * AI 역량진단 신청 데이터 저장
 */
function saveAICapabilityDiagnosisApplication(diagnosisId, data, timestamp) {
  const sheet = getOrCreateSheet('AI_역량진단신청', 'ai-capability-diagnosis');
  
  // 헤더가 없으면 설정
  if (sheet.getLastRow() === 0) {
    setupAICapabilityDiagnosisHeaders(sheet);
  }
  
  // 데이터 행 추가
  const row = [
    timestamp,
    diagnosisId,
    data.companyName,
    data.industry,
    data.companySize,
    data.region,
    data.applicantName,
    data.position,
    data.email,
    data.phone,
    data.businessDetails,
    data.mainConcerns ? data.mainConcerns.join(', ') : '',
    data.expectedBenefits ? data.expectedBenefits.join(', ') : '',
    data.currentAIUsage || '',
    data.aiInvestmentPlan || '',
    data.additionalRequests || '',
    JSON.stringify(data.assessmentResponses),
    calculateAICapabilityTotalScore(data.assessmentResponses),
    'processing',
    data.privacyConsent ? 'Y' : 'N',
    data.marketingConsent ? 'Y' : 'N'
  ];
  
  sheet.appendRow(row);
}

/**
 * AI 역량진단 헤더 설정
 */
function setupAICapabilityDiagnosisHeaders(sheet) {
  const headers = [
    '신청일시',
    '진단ID',
    '기업명',
    '업종',
    '기업규모',
    '지역',
    '신청자명',
    '직책',
    '이메일',
    '연락처',
    '사업내용',
    '주요고민사항',
    '기대효과',
    '현재AI사용수준',
    'AI투자계획',
    '추가요청사항',
    'AI역량평가응답',
    '종합점수',
    '진단상태',
    '개인정보동의',
    '마케팅동의'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

/**
 * AI 역량 종합 점수 계산
 */
function calculateAICapabilityTotalScore(assessmentResponses) {
  const categories = {
    L: [], // Leadership
    I: [], // Infrastructure
    E: [], // Employee Capability
    C: [], // Culture
    P: [], // Practical Application
    D: []  // Data Capability
  };
  
  // 응답을 카테고리별로 분류
  Object.entries(assessmentResponses).forEach(([questionId, score]) => {
    const category = questionId.charAt(0);
    if (categories[category]) {
      categories[category].push(score);
    }
  });
  
  // 카테고리별 평균 계산
  const categoryScores = {};
  let totalScore = 0;
  let categoryCount = 0;
  
  Object.entries(categories).forEach(([category, scores]) => {
    if (scores.length > 0) {
      const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      const percentScore = Math.round((avgScore / 5) * 100);
      categoryScores[category] = percentScore;
      totalScore += percentScore;
      categoryCount++;
    }
  });
  
  return categoryCount > 0 ? Math.round(totalScore / categoryCount) : 0;
}

/**
 * AI 역량진단 확인 이메일 발송
 */
function sendAICapabilityDiagnosisConfirmationEmail(email, companyName, diagnosisId) {
  const subject = `[AICAMP] ${companyName}님의 AI 역량진단이 시작되었습니다`;
  
  const htmlBody = `
    <div style="font-family: 'Noto Sans KR', sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">AI 역량진단 시작</h1>
        <p style="color: #e0e0e0; margin-top: 10px;">이후경 교장의 AI 역량 고몰입조직구축 진단시스템</p>
      </div>
      
      <div style="padding: 40px 20px; background: white;">
        <p style="font-size: 18px; color: #333; margin-bottom: 20px;">
          안녕하세요, <strong>${companyName}</strong>님
        </p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <p style="margin: 0; color: #666;">진단 ID</p>
          <p style="margin: 5px 0 0 0; font-size: 20px; font-weight: bold; color: #1a73e8;">
            ${diagnosisId}
          </p>
        </div>
        
        <p style="color: #666; line-height: 1.8;">
          AI 역량진단이 시작되었습니다. GEMINI AI가 귀사의 데이터를 분석하여 
          맞춤형 진단 보고서를 생성하고 있습니다.
        </p>
        
        <div style="background: #e8f0fe; padding: 20px; border-radius: 8px; margin: 30px 0;">
          <h3 style="color: #1a73e8; margin: 0 0 15px 0;">진단 진행 과정</h3>
          <ol style="margin: 0; padding-left: 20px; color: #666;">
            <li>AI 역량 수준 분석 (6개 영역)</li>
            <li>업계 벤치마크 비교</li>
            <li>SWOT 분석 및 전략 도출</li>
            <li>AI 고몰입 조직구축 방안 수립</li>
            <li>맞춤형 실행 로드맵 생성</li>
          </ol>
        </div>
        
        <p style="color: #666;">
          진단은 약 5-10분 소요되며, 완료되면 상세한 결과 보고서를 이메일로 발송해드립니다.
        </p>
        
        <div style="text-align: center; margin-top: 40px;">
          <a href="https://aicamp.co.kr/diagnosis/result/${diagnosisId}" 
             style="display: inline-block; background: #1a1a1a; color: white; padding: 15px 30px; 
                    text-decoration: none; border-radius: 5px; font-weight: bold;">
            진단 결과 확인하기
          </a>
        </div>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px 20px; text-align: center; color: #666;">
        <p style="margin: 0 0 10px 0;">문의사항이 있으시면 언제든지 연락주세요</p>
        <p style="margin: 0;">
          <a href="mailto:support@aicamp.co.kr" style="color: #1a73e8;">support@aicamp.co.kr</a> | 
          <a href="tel:02-6952-7787" style="color: #1a73e8;">02-6952-7787</a>
        </p>
      </div>
    </div>
  `;
  
  try {
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (error) {
    console.error('이메일 발송 오류:', error);
  }
}

/**
 * AI 역량진단 관리자 알림
 */
function sendAICapabilityDiagnosisAdminNotification(data, diagnosisId) {
  const adminEmail = 'hongik423@gmail.com';
  const subject = `[AI역량진단] ${data.companyName} - 신규 진단 신청`;
  
  const htmlBody = `
    <h2>AI 역량진단 신규 신청</h2>
    <p><strong>진단 ID:</strong> ${diagnosisId}</p>
    <p><strong>기업명:</strong> ${data.companyName}</p>
    <p><strong>업종:</strong> ${data.industry}</p>
    <p><strong>규모:</strong> ${data.companySize}</p>
    <p><strong>신청자:</strong> ${data.applicantName} ${data.position}</p>
    <p><strong>이메일:</strong> ${data.email}</p>
    <p><strong>연락처:</strong> ${data.phone}</p>
    <p><strong>주요 고민사항:</strong> ${data.mainConcerns ? data.mainConcerns.join(', ') : ''}</p>
    <p><strong>기대 효과:</strong> ${data.expectedBenefits ? data.expectedBenefits.join(', ') : ''}</p>
    <hr>
    <p><a href="https://docs.google.com/spreadsheets/d/${SpreadsheetApp.getActiveSpreadsheet().getId()}/edit">스프레드시트 확인</a></p>
  `;
  
  try {
    MailApp.sendEmail({
      to: adminEmail,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (error) {
    console.error('관리자 알림 오류:', error);
  }
}

/**
 * AI 역량진단 분석 트리거 설정
 */
function setAICapabilityDiagnosisTrigger(diagnosisId, data) {
  // 5초 후 AI 분석 실행
  const triggerFunction = function() {
    performAICapabilityDiagnosisAnalysis(diagnosisId, data);
  };
  
  // Google Apps Script의 시간 기반 트리거 사용
  ScriptApp.newTrigger('performAICapabilityDiagnosisAnalysis')
    .timeBased()
    .after(5 * 1000) // 5초
    .create();
    
  // 트리거에 전달할 데이터를 PropertiesService에 임시 저장
  PropertiesService.getScriptProperties().setProperty(
    `diagnosis_${diagnosisId}`,
    JSON.stringify(data)
  );
}

/**
 * AI 역량진단 분석 수행
 */
function performAICapabilityDiagnosisAnalysis(diagnosisId, data) {
  try {
    // 진행 상태 업데이트
    updateAICapabilityDiagnosisProgress(diagnosisId, 'processing', 20, '데이터 분석 중');
    
    // 1. AI 역량 점수 계산
    const capabilityScores = calculateDetailedAICapabilityScores(data.assessmentResponses);
    updateAICapabilityDiagnosisProgress(diagnosisId, 'processing', 30, '역량 평가 완료');
    
    // 2. 벤치마크 분석
    const benchmarkAnalysis = performAICapabilityBenchmarkAnalysis(
      capabilityScores,
      data.industry,
      data.companySize
    );
    updateAICapabilityDiagnosisProgress(diagnosisId, 'processing', 40, '벤치마크 분석 완료');
    
    // 3. SWOT 분석
    const swotAnalysis = generateAICapabilitySWOT(
      capabilityScores,
      benchmarkAnalysis,
      data
    );
    updateAICapabilityDiagnosisProgress(diagnosisId, 'processing', 50, 'SWOT 분석 완료');
    
    // 4. 전략 생성
    const strategies = generateAICapabilityStrategies(swotAnalysis);
    updateAICapabilityDiagnosisProgress(diagnosisId, 'processing', 60, '전략 수립 완료');
    
    // 5. 실행 로드맵 생성
    const roadmap = generateAICapabilityRoadmap(
      capabilityScores,
      benchmarkAnalysis,
      strategies,
      data
    );
    updateAICapabilityDiagnosisProgress(diagnosisId, 'processing', 70, '로드맵 생성 완료');
    
    // 6. AI 고몰입 조직구축 방안
    const highEngagementPlan = generateHighEngagementOrganizationPlan(
      capabilityScores,
      swotAnalysis,
      data
    );
    updateAICapabilityDiagnosisProgress(diagnosisId, 'processing', 80, '조직구축 방안 완료');
    
    // 7. GEMINI AI를 통한 고급 보고서 생성
    const analysisData = {
      capabilityScores,
      benchmarkAnalysis,
      swotAnalysis,
      strategies,
      roadmap,
      highEngagementPlan
    };
    
    const premiumReport = generatePremiumAICapabilityReport(data, analysisData);
    updateAICapabilityDiagnosisProgress(diagnosisId, 'processing', 90, '보고서 생성 완료');
    
    // 8. 결과 저장
    saveAICapabilityDiagnosisResult(diagnosisId, premiumReport);
    
    // 9. 결과 이메일 발송
    sendAICapabilityDiagnosisResultEmail(
      data.email,
      data.companyName,
      diagnosisId,
      premiumReport
    );
    
    // 10. 완료 상태 업데이트
    updateAICapabilityDiagnosisProgress(diagnosisId, 'completed', 100, '진단 완료');
    
    // 임시 데이터 삭제
    PropertiesService.getScriptProperties().deleteProperty(`diagnosis_${diagnosisId}`);
    
  } catch (error) {
    console.error('AI 역량진단 분석 오류:', error);
    updateAICapabilityDiagnosisProgress(diagnosisId, 'failed', 0, error.toString());
    notifyAdminAICapabilityDiagnosisError(diagnosisId, error);
  }
}

/**
 * 상세 AI 역량 점수 계산
 */
function calculateDetailedAICapabilityScores(assessmentResponses) {
  const categories = {
    leadership: { scores: [], weight: 1.2, name: '경영진 리더십' },
    infrastructure: { scores: [], weight: 1.0, name: 'AI 인프라' },
    employeeCapability: { scores: [], weight: 1.1, name: '직원 역량' },
    culture: { scores: [], weight: 1.0, name: '조직 문화' },
    practicalApplication: { scores: [], weight: 1.1, name: '실무 적용' },
    dataCapability: { scores: [], weight: 1.0, name: '데이터 역량' }
  };
  
  const categoryMap = {
    'L': 'leadership',
    'I': 'infrastructure',
    'E': 'employeeCapability',
    'C': 'culture',
    'P': 'practicalApplication',
    'D': 'dataCapability'
  };
  
  // 응답을 카테고리별로 분류
  Object.entries(assessmentResponses).forEach(([questionId, score]) => {
    const categoryKey = categoryMap[questionId.charAt(0)];
    if (categoryKey && categories[categoryKey]) {
      categories[categoryKey].scores.push(score);
    }
  });
  
  // 카테고리별 점수 계산
  const categoryScores = {};
  let weightedTotal = 0;
  let totalWeight = 0;
  
  Object.entries(categories).forEach(([key, data]) => {
    if (data.scores.length > 0) {
      const avgScore = data.scores.reduce((sum, score) => sum + score, 0) / data.scores.length;
      const percentScore = Math.round((avgScore / 5) * 100);
      categoryScores[key] = percentScore;
      weightedTotal += percentScore * data.weight;
      totalWeight += data.weight;
    }
  });
  
  const totalScore = Math.round(weightedTotal / totalWeight);
  
  // 등급 계산
  let grade = 'F';
  if (totalScore >= 90) grade = 'S';
  else if (totalScore >= 80) grade = 'A';
  else if (totalScore >= 70) grade = 'B';
  else if (totalScore >= 60) grade = 'C';
  else if (totalScore >= 50) grade = 'D';
  
  return {
    totalScore,
    grade,
    categoryScores,
    categoryDetails: categories
  };
}

/**
 * AI 역량 벤치마크 분석
 */
function performAICapabilityBenchmarkAnalysis(capabilityScores, industry, companySize) {
  // 업종별 벤치마크
  const industryBenchmarks = {
    'it': 75,
    'manufacturing': 65,
    'finance': 78,
    'retail': 68,
    'service': 62,
    'healthcare': 70,
    'education': 58,
    'construction': 55,
    'logistics': 67,
    'media': 72,
    'other': 60
  };
  
  // 규모별 조정 계수
  const sizeAdjustments = {
    '1-9': 0.85,
    '10-49': 0.90,
    '50-199': 0.95,
    '200-999': 1.0,
    '1000+': 1.05
  };
  
  const baseBenchmark = industryBenchmarks[industry] || 60;
  const sizeAdjustment = sizeAdjustments[companySize] || 1.0;
  const adjustedBenchmark = Math.round(baseBenchmark * sizeAdjustment);
  
  const gap = capabilityScores.totalScore - adjustedBenchmark;
  const percentile = calculatePercentile(capabilityScores.totalScore, industry);
  
  let competitivePosition = '';
  if (gap >= 20) competitivePosition = '업계 선도';
  else if (gap >= 10) competitivePosition = '상위권';
  else if (gap >= 0) competitivePosition = '평균 이상';
  else if (gap >= -10) competitivePosition = '평균 수준';
  else competitivePosition = '개선 필요';
  
  return {
    industryAverage: adjustedBenchmark,
    gap,
    percentile,
    competitivePosition,
    analysis: generateBenchmarkAnalysis(gap, industry)
  };
}

/**
 * 백분위 계산
 */
function calculatePercentile(score, industry) {
  // 간단한 백분위 계산 (실제로는 더 정교한 통계 필요)
  if (score >= 90) return 95;
  if (score >= 80) return 85;
  if (score >= 70) return 70;
  if (score >= 60) return 50;
  if (score >= 50) return 30;
  return 15;
}

/**
 * 벤치마크 분석 텍스트 생성
 */
function generateBenchmarkAnalysis(gap, industry) {
  if (gap >= 20) {
    return `귀사는 ${industry} 업계에서 AI 역량 선도 기업입니다. 혁신적인 AI 활용으로 경쟁 우위를 확보하고 있습니다.`;
  } else if (gap >= 10) {
    return `${industry} 업계 평균을 상회하는 우수한 AI 역량을 보유하고 있습니다. 지속적인 혁신으로 선도 기업으로 도약할 수 있습니다.`;
  } else if (gap >= 0) {
    return `${industry} 업계 평균 이상의 AI 역량을 갖추고 있습니다. 핵심 영역 강화를 통해 경쟁력을 더욱 높일 수 있습니다.`;
  } else if (gap >= -10) {
    return `${industry} 업계 평균 수준의 AI 역량을 보유하고 있습니다. 전략적 투자와 역량 강화가 필요합니다.`;
  } else {
    return `${industry} 업계 대비 AI 역량 강화가 시급합니다. 체계적인 AI 도입 전략과 집중적인 투자가 필요합니다.`;
  }
}

/**
 * AI 역량 SWOT 분석
 */
function generateAICapabilitySWOT(capabilityScores, benchmarkAnalysis, data) {
  const strengths = [];
  const weaknesses = [];
  const opportunities = [];
  const threats = [];
  
  // 강점 분석
  Object.entries(capabilityScores.categoryScores).forEach(([category, score]) => {
    if (score >= 80) {
      strengths.push(getCategoryStrength(category, score));
    } else if (score < 60) {
      weaknesses.push(getCategoryWeakness(category, score));
    }
  });
  
  // 기회 분석
  if (data.expectedBenefits && data.expectedBenefits.length > 0) {
    data.expectedBenefits.forEach(benefit => {
      opportunities.push(getOpportunityFromBenefit(benefit));
    });
  }
  
  // 위협 분석
  if (benchmarkAnalysis.gap < 0) {
    threats.push('경쟁사 대비 AI 역량 격차로 인한 시장 경쟁력 약화');
  }
  if (data.mainConcerns && data.mainConcerns.includes('talent_shortage')) {
    threats.push('AI 전문 인력 부족으로 인한 성장 제약');
  }
  
  // 기본 항목 추가
  if (strengths.length === 0) strengths.push('AI 도입에 대한 경영진의 관심과 의지');
  if (weaknesses.length === 0) weaknesses.push('체계적인 AI 전략 및 로드맵 부재');
  if (opportunities.length === 0) opportunities.push('AI 기술 도입을 통한 업무 효율성 향상 기회');
  if (threats.length === 0) threats.push('급변하는 AI 기술 환경에 대한 대응 지연 위험');
  
  return {
    strengths,
    weaknesses,
    opportunities,
    threats
  };
}

/**
 * 카테고리별 강점 텍스트
 */
function getCategoryStrength(category, score) {
  const strengthMap = {
    'leadership': `경영진의 강력한 AI 리더십과 비전 (${score}점)`,
    'infrastructure': `우수한 AI 인프라 및 시스템 구축 (${score}점)`,
    'employeeCapability': `높은 수준의 직원 AI 활용 역량 (${score}점)`,
    'culture': `AI 혁신을 지원하는 조직 문화 (${score}점)`,
    'practicalApplication': `실무에서의 활발한 AI 활용 (${score}점)`,
    'dataCapability': `체계적인 데이터 관리 및 활용 역량 (${score}점)`
  };
  return strengthMap[category] || `${category} 영역의 우수한 역량`;
}

/**
 * 카테고리별 약점 텍스트
 */
function getCategoryWeakness(category, score) {
  const weaknessMap = {
    'leadership': `경영진의 AI 이해도 및 리더십 부족 (${score}점)`,
    'infrastructure': `AI 인프라 및 시스템 미비 (${score}점)`,
    'employeeCapability': `직원들의 AI 활용 역량 부족 (${score}점)`,
    'culture': `AI 도입에 대한 조직 저항 (${score}점)`,
    'practicalApplication': `실무 AI 적용 미흡 (${score}점)`,
    'dataCapability': `데이터 관리 체계 미흡 (${score}점)`
  };
  return weaknessMap[category] || `${category} 영역의 개선 필요`;
}

/**
 * 기대효과별 기회 텍스트
 */
function getOpportunityFromBenefit(benefit) {
  const opportunityMap = {
    'cost_savings': '운영 비용 절감을 통한 수익성 개선 기회',
    'revenue_growth': 'AI 기반 신규 비즈니스 모델로 매출 성장 기회',
    'efficiency': '업무 자동화를 통한 생산성 대폭 향상 기회',
    'innovation': 'AI 기술을 활용한 혁신적인 제품/서비스 개발 기회',
    'decision_making': '데이터 기반 의사결정으로 경영 효율성 향상',
    'customer_satisfaction': 'AI 기반 개인화 서비스로 고객 만족도 향상',
    'competitive_advantage': 'AI 선도 기업으로의 포지셔닝 기회'
  };
  return opportunityMap[benefit] || 'AI를 통한 새로운 성장 기회';
}

/**
 * AI 역량 전략 생성
 */
function generateAICapabilityStrategies(swotAnalysis) {
  const strategies = {
    SO: [], // 강점-기회
    WO: [], // 약점-기회  
    ST: [], // 강점-위협
    WT: []  // 약점-위협
  };
  
  // SO 전략 (공격적 전략)
  strategies.SO = [
    '강점 영역의 AI 역량을 활용한 신규 비즈니스 모델 개발',
    'AI 우수 사례를 전사적으로 확산하여 혁신 가속화',
    '선도적 AI 기업 이미지 구축을 통한 시장 리더십 확보'
  ];
  
  // WO 전략 (개선 전략)
  strategies.WO = [
    '취약 영역에 대한 집중적인 AI 교육 프로그램 실시',
    '외부 AI 전문가 영입 및 파트너십을 통한 역량 보완',
    '단계적 AI 도입 전략으로 조직 저항 최소화'
  ];
  
  // ST 전략 (다각화 전략)
  strategies.ST = [
    '핵심 AI 역량을 활용한 차별화된 경쟁 우위 구축',
    'AI 인재 양성 프로그램으로 내부 전문가 육성',
    '선제적 AI 투자로 기술 격차 확대 방지'
  ];
  
  // WT 전략 (방어 전략)
  strategies.WT = [
    'AI 기초 역량 강화를 위한 전사적 교육 체계 구축',
    '리스크가 낮은 영역부터 단계적 AI 도입',
    '전문 컨설팅을 통한 AI 전략 수립 및 실행'
  ];
  
  return strategies;
}

/**
 * AI 역량 로드맵 생성
 */
function generateAICapabilityRoadmap(capabilityScores, benchmarkAnalysis, strategies, data) {
  const roadmap = {
    immediate: [],    // 0-3개월
    shortTerm: [],    // 3-6개월  
    midTerm: [],      // 6-12개월
    longTerm: []      // 1년 이상
  };
  
  // 즉시 실행 (0-3개월)
  roadmap.immediate = [
    {
      title: 'AI 역량진단 결과 공유 및 전사 공감대 형성',
      description: '진단 결과를 경영진 및 핵심 부서와 공유하고 AI 도입의 필요성에 대한 공감대 형성',
      priority: 'high',
      estimatedDuration: '1개월',
      expectedImpact: '조직 내 AI 도입 동력 확보'
    },
    {
      title: 'AI 추진 TF팀 구성',
      description: '각 부서별 핵심 인력으로 구성된 AI 추진 태스크포스 구성 및 역할 정의',
      priority: 'high',
      estimatedDuration: '2주',
      expectedImpact: 'AI 도입 추진체계 구축'
    },
    {
      title: '우선순위 AI 프로젝트 선정',
      description: '즉시 효과를 볼 수 있는 파일럿 프로젝트 2-3개 선정 및 실행 계획 수립',
      priority: 'high',
      estimatedDuration: '1개월',
      expectedImpact: 'Quick Win을 통한 성공 경험 축적'
    }
  ];
  
  // 단기 목표 (3-6개월)
  roadmap.shortTerm = [
    {
      title: 'AI 기초 교육 프로그램 실시',
      description: '전 직원 대상 AI 기초 이해도 향상을 위한 교육 프로그램 진행',
      priority: 'high',
      estimatedDuration: '3개월',
      expectedImpact: '조직 전반의 AI 이해도 향상'
    },
    {
      title: '파일럿 프로젝트 실행 및 성과 측정',
      description: '선정된 파일럿 프로젝트 실행 및 ROI 분석',
      priority: 'medium',
      estimatedDuration: '3개월',
      expectedImpact: 'AI 도입 효과 검증'
    }
  ];
  
  // 중기 전략 (6-12개월)
  roadmap.midTerm = [
    {
      title: 'AI 인프라 구축 및 고도화',
      description: '클라우드 기반 AI 플랫폼 구축 및 데이터 통합 관리 체계 수립',
      priority: 'high',
      estimatedDuration: '6개월',
      expectedImpact: '확장 가능한 AI 기반 마련'
    },
    {
      title: 'AI 전문 인력 확보',
      description: '핵심 AI 인재 영입 및 내부 전문가 양성 프로그램 운영',
      priority: 'medium',
      estimatedDuration: '지속',
      expectedImpact: 'AI 역량 내재화'
    }
  ];
  
  // 장기 비전 (1년 이상)
  roadmap.longTerm = [
    {
      title: 'AI 기반 비즈니스 모델 혁신',
      description: 'AI를 활용한 새로운 제품/서비스 개발 및 비즈니스 모델 전환',
      priority: 'high',
      estimatedDuration: '1-2년',
      expectedImpact: '지속가능한 경쟁 우위 확보'
    },
    {
      title: 'AI 중심 조직문화 정착',
      description: '데이터 기반 의사결정과 AI 활용이 일상화된 조직문화 구축',
      priority: 'medium',
      estimatedDuration: '지속',
      expectedImpact: 'AI 네이티브 조직으로의 전환'
    }
  ];
  
  return roadmap;
}

/**
 * AI 고몰입 조직구축 방안 생성
 */
function generateHighEngagementOrganizationPlan(capabilityScores, swotAnalysis, data) {
  const plan = {
    vision: `AI를 통해 혁신하고 성장하는 고몰입 조직 구현`,
    coreValues: [
      '지속적 학습과 성장',
      '데이터 기반 의사결정',
      '혁신적 실험 문화',
      '협업과 공유'
    ],
    keyInitiatives: [],
    expectedOutcomes: []
  };
  
  // 핵심 이니셔티브
  plan.keyInitiatives = [
    {
      name: 'AI 챔피언 프로그램',
      objective: '각 부서별 AI 전도사 양성을 통한 자발적 AI 확산',
      keyActions: [
        '부서별 AI 챔피언 선발 및 집중 교육',
        'AI 활용 우수사례 공유회 정기 개최',
        'AI 챔피언 주도의 부서별 AI 프로젝트 추진'
      ],
      kpis: ['AI 챔피언 수', '부서별 AI 프로젝트 수', '직원 참여율'],
      timeline: '6개월'
    },
    {
      name: 'AI 혁신 Lab 운영',
      objective: 'AI 실험과 혁신을 위한 전담 조직 운영',
      keyActions: [
        'AI Lab 조직 구성 및 운영 체계 수립',
        '실패를 허용하는 실험적 프로젝트 추진',
        '외부 스타트업/대학과의 협업 프로그램 운영'
      ],
      kpis: ['혁신 프로젝트 수', '아이디어 실행률', 'ROI'],
      timeline: '1년'
    },
    {
      name: 'AI 성과 보상 체계',
      objective: 'AI 활용 성과에 대한 명확한 인센티브 제공',
      keyActions: [
        'AI 활용 성과 측정 지표 개발',
        'AI 기여도 기반 보상 체계 설계',
        'AI 혁신상 제도 도입'
      ],
      kpis: ['AI 성과 지표', '보상 수혜자 수', '직원 만족도'],
      timeline: '3개월'
    }
  ];
  
  // 기대 성과
  plan.expectedOutcomes = [
    '전 직원의 AI 활용 역량 50% 향상',
    '업무 생산성 30% 증대',
    'AI 기반 신규 매출 20% 창출',
    '직원 몰입도 및 만족도 향상',
    '업계 AI 선도 기업으로의 포지셔닝'
  ];
  
  return plan;
}

/**
 * 프리미엄 AI 역량 보고서 생성 (GEMINI 활용)
 */
function generatePremiumAICapabilityReport(data, analysisData) {
  const prompt = `
당신은 이후경 교장입니다. 28년간의 교육 전문가 경험과 AI 전문 지식을 바탕으로 
기업의 AI 역량을 진단하고 고몰입 조직 구축을 위한 맞춤형 전략을 제시해주세요.

[기업 정보]
- 기업명: ${data.companyName}
- 업종: ${data.industry}
- 규모: ${data.companySize}
- 주요 사업: ${data.businessDetails}
- 주요 고민사항: ${data.mainConcerns ? data.mainConcerns.join(', ') : ''}
- 기대 효과: ${data.expectedBenefits ? data.expectedBenefits.join(', ') : ''}

[AI 역량 평가 결과]
- 종합 점수: ${analysisData.capabilityScores.totalScore}점
- 등급: ${analysisData.capabilityScores.grade}
- 영역별 점수:
  * 경영진 리더십: ${analysisData.capabilityScores.categoryScores.leadership}점
  * AI 인프라: ${analysisData.capabilityScores.categoryScores.infrastructure}점
  * 직원 역량: ${analysisData.capabilityScores.categoryScores.employeeCapability}점
  * 조직 문화: ${analysisData.capabilityScores.categoryScores.culture}점
  * 실무 적용: ${analysisData.capabilityScores.categoryScores.practicalApplication}점
  * 데이터 역량: ${analysisData.capabilityScores.categoryScores.dataCapability}점

[벤치마크 분석]
- 업계 평균: ${analysisData.benchmarkAnalysis.industryAverage}점
- GAP: ${analysisData.benchmarkAnalysis.gap}점
- 경쟁 포지션: ${analysisData.benchmarkAnalysis.competitivePosition}

다음 형식으로 상세한 진단 보고서를 작성해주세요:

1. 종합 진단 의견 (이후경 교장의 관점)
2. 핵심 강점과 개선 영역
3. AI 고몰입 조직 구축을 위한 전략적 제언
4. 맞춤형 실행 방안
5. 기대 효과 및 성공 지표
6. 이후경 교장의 특별 조언

각 섹션은 구체적이고 실행 가능한 내용으로 작성하되, 
교육 전문가의 통찰력과 따뜻한 격려가 담긴 톤으로 작성해주세요.
`;

  try {
    const geminiResponse = callGeminiAPI(prompt);
    
    // GEMINI 응답을 구조화된 보고서로 변환
    const report = {
      diagnosisId: data.diagnosisId,
      companyName: data.companyName,
      submittedAt: getCurrentKoreanTime(),
      totalScore: analysisData.capabilityScores.totalScore,
      grade: analysisData.capabilityScores.grade,
      gradeDescription: getGradeDescription(analysisData.capabilityScores.grade),
      categoryScores: analysisData.capabilityScores.categoryScores,
      benchmarkAnalysis: analysisData.benchmarkAnalysis,
      swotAnalysis: analysisData.swotAnalysis,
      strategies: analysisData.strategies,
      roadmap: analysisData.roadmap,
      recommendedPrograms: generateRecommendedPrograms(analysisData),
      highEngagementPlan: analysisData.highEngagementPlan,
      expertInsight: geminiResponse,
      nextSteps: generateNextSteps(analysisData)
    };
    
    return report;
    
  } catch (error) {
    console.error('GEMINI API 오류:', error);
    // 폴백: 기본 보고서 생성
    return generateFallbackReport(data, analysisData);
  }
}

/**
 * 등급 설명
 */
function getGradeDescription(grade) {
  const descriptions = {
    'S': 'AI 선도 기업 - 업계 최고 수준의 AI 역량 보유',
    'A': 'AI 우수 기업 - 높은 수준의 AI 활용 역량 보유',
    'B': 'AI 활용 기업 - 평균 이상의 AI 역량 보유',
    'C': 'AI 도입 기업 - 기초적인 AI 활용 시작',
    'D': 'AI 초기 기업 - AI 도입 준비 단계',
    'F': 'AI 준비 단계 - 체계적인 AI 도입 필요'
  };
  return descriptions[grade] || '';
}

/**
 * 추천 교육 프로그램 생성
 */
function generateRecommendedPrograms(analysisData) {
  const programs = [];
  const scores = analysisData.capabilityScores.categoryScores;
  
  // 점수가 낮은 영역에 대한 교육 추천
  if (scores.leadership < 60) {
    programs.push({
      name: 'AI 시대의 리더십',
      category: '경영진 과정',
      level: '고급',
      duration: '2일 (16시간)',
      description: 'CEO/임원을 위한 AI 전략 수립 및 리더십 역량 강화',
      relevanceScore: 95
    });
  }
  
  if (scores.employeeCapability < 60) {
    programs.push({
      name: 'ChatGPT & AI 도구 활용 실무',
      category: '실무자 과정',
      level: '초중급',
      duration: '1일 (8시간)',
      description: '실무에 바로 적용 가능한 AI 도구 활용법 마스터',
      relevanceScore: 90
    });
  }
  
  if (scores.dataCapability < 60) {
    programs.push({
      name: '데이터 분석과 AI 활용',
      category: '전문가 과정',
      level: '중급',
      duration: '3일 (24시간)',
      description: '데이터 기반 의사결정을 위한 분석 역량 강화',
      relevanceScore: 88
    });
  }
  
  // 기본 추천 프로그램
  programs.push({
    name: 'AI 고몰입 조직문화 구축',
    category: '조직개발 과정',
    level: '전사',
    duration: '맞춤형',
    description: '전사적 AI 문화 정착을 위한 맞춤형 프로그램',
    relevanceScore: 85
  });
  
  return programs;
}

/**
 * 다음 단계 제안
 */
function generateNextSteps(analysisData) {
  return [
    '진단 결과를 경영진과 공유하고 AI 추진 의지 확인',
    'AI 추진 TF팀 구성 및 실행 계획 수립',
    'AICAMP 전문가와의 심층 상담을 통한 맞춤형 전략 수립',
    '우선순위가 높은 교육 프로그램부터 단계적 실시',
    '3개월 후 진전 사항 점검 및 계획 조정'
  ];
}

/**
 * 폴백 보고서 생성
 */
function generateFallbackReport(data, analysisData) {
  return {
    diagnosisId: data.diagnosisId,
    companyName: data.companyName,
    submittedAt: getCurrentKoreanTime(),
    totalScore: analysisData.capabilityScores.totalScore,
    grade: analysisData.capabilityScores.grade,
    gradeDescription: getGradeDescription(analysisData.capabilityScores.grade),
    categoryScores: analysisData.capabilityScores.categoryScores,
    benchmarkAnalysis: analysisData.benchmarkAnalysis,
    swotAnalysis: analysisData.swotAnalysis,
    strategies: analysisData.strategies,
    roadmap: analysisData.roadmap,
    recommendedPrograms: generateRecommendedPrograms(analysisData),
    highEngagementPlan: analysisData.highEngagementPlan,
    expertInsight: generateBasicExpertInsight(data, analysisData),
    nextSteps: generateNextSteps(analysisData)
  };
}

/**
 * 기본 전문가 인사이트 생성
 */
function generateBasicExpertInsight(data, analysisData) {
  const score = analysisData.capabilityScores.totalScore;
  const grade = analysisData.capabilityScores.grade;
  
  return `
### 이후경 교장의 종합 진단 의견

${data.companyName}의 AI 역량 진단 결과, 종합 점수 ${score}점으로 ${grade}등급에 해당합니다.

귀사는 AI 전환의 중요한 시점에 있으며, 체계적인 접근을 통해 AI를 활용한 
혁신적인 성장을 이룰 수 있는 잠재력을 보유하고 있습니다.

### 핵심 제언

1. **즉시 실행 사항**: AI 추진 TF팀을 구성하고 전사적 공감대를 형성하세요.
2. **역량 강화**: 가장 취약한 영역부터 단계적으로 교육과 시스템을 보완하세요.
3. **문화 혁신**: AI를 두려워하지 않고 적극 활용하는 조직문화를 만들어가세요.

AI는 도구일 뿐, 진정한 혁신은 사람에게서 나옵니다. 
구성원 모두가 AI와 함께 성장하는 고몰입 조직을 만들어가시길 응원합니다.

### 특별 조언

28년의 교육 경험을 통해 배운 것은, 변화는 작은 성공에서 시작된다는 것입니다.
완벽을 추구하기보다는 빠르게 시작하고, 실패를 통해 배우며, 
지속적으로 개선해 나가는 것이 중요합니다.

AICAMP가 귀사의 AI 여정에 든든한 동반자가 되겠습니다.
  `;
}

/**
 * AI 역량진단 결과 저장
 */
function saveAICapabilityDiagnosisResult(diagnosisId, result) {
  const sheet = getOrCreateSheet('AI_역량진단결과', 'ai-capability-diagnosis-results');
  
  // 헤더가 없으면 설정
  if (sheet.getLastRow() === 0) {
    const headers = [
      '진단ID',
      '기업명',
      '진단일시',
      '종합점수',
      '등급',
      '업계평균',
      'GAP',
      '경쟁포지션',
      '보고서데이터'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  
  // 결과 저장
  const row = [
    diagnosisId,
    result.companyName,
    result.submittedAt,
    result.totalScore,
    result.grade,
    result.benchmarkAnalysis.industryAverage,
    result.benchmarkAnalysis.gap,
    result.benchmarkAnalysis.competitivePosition,
    JSON.stringify(result)
  ];
  
  sheet.appendRow(row);
}

/**
 * AI 역량진단 결과 이메일 발송
 */
function sendAICapabilityDiagnosisResultEmail(email, companyName, diagnosisId, result) {
  const subject = `[AICAMP] ${companyName}님의 AI 역량진단 결과입니다`;
  
  const htmlBody = `
    <div style="font-family: 'Noto Sans KR', sans-serif; max-width: 800px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">AI 역량진단 결과</h1>
        <p style="color: #e0e0e0; margin-top: 10px;">이후경 교장의 AI 역량 고몰입조직구축 진단시스템</p>
      </div>
      
      <div style="padding: 40px 20px; background: white;">
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="display: inline-block; width: 120px; height: 120px; border-radius: 50%; 
                      background: ${getGradeColorCode(result.grade)}; color: white; 
                      line-height: 120px; font-size: 48px; font-weight: bold;">
            ${result.grade}
          </div>
          <h2 style="margin-top: 20px; color: #333;">${result.gradeDescription}</h2>
          <p style="font-size: 24px; color: #666; margin-top: 10px;">
            종합 점수: <strong>${result.totalScore}점</strong>
          </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="color: #333; margin-bottom: 20px;">영역별 AI 역량 점수</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">경영진 리더십</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">
                <strong>${result.categoryScores.leadership}점</strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">AI 인프라</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">
                <strong>${result.categoryScores.infrastructure}점</strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">직원 역량</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">
                <strong>${result.categoryScores.employeeCapability}점</strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">조직 문화</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">
                <strong>${result.categoryScores.culture}점</strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">실무 적용</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">
                <strong>${result.categoryScores.practicalApplication}점</strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px;">데이터 역량</td>
              <td style="padding: 10px; text-align: right;">
                <strong>${result.categoryScores.dataCapability}점</strong>
              </td>
            </tr>
          </table>
        </div>
        
        <div style="background: #e8f0fe; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="color: #1a73e8; margin-bottom: 20px;">벤치마크 분석</h3>
          <p style="margin: 10px 0;">
            <strong>업계 평균:</strong> ${result.benchmarkAnalysis.industryAverage}점
          </p>
          <p style="margin: 10px 0;">
            <strong>귀사와의 차이:</strong> 
            <span style="color: ${result.benchmarkAnalysis.gap >= 0 ? '#0d9488' : '#dc2626'};">
              ${result.benchmarkAnalysis.gap > 0 ? '+' : ''}${result.benchmarkAnalysis.gap}점
            </span>
          </p>
          <p style="margin: 10px 0;">
            <strong>경쟁 포지션:</strong> ${result.benchmarkAnalysis.competitivePosition}
          </p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; margin-bottom: 20px;">이후경 교장의 핵심 제언</h3>
          <div style="background: #fffbeb; padding: 20px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e; font-style: italic;">
              "${result.expertInsight ? result.expertInsight.split('\n')[0] : 
                'AI는 도구일 뿐, 진정한 혁신은 사람에게서 나옵니다.'}"
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 40px;">
          <a href="https://aicamp.co.kr/diagnosis/result/${diagnosisId}" 
             style="display: inline-block; background: #1a1a1a; color: white; 
                    padding: 15px 40px; text-decoration: none; border-radius: 5px; 
                    font-weight: bold; margin: 0 10px;">
            상세 보고서 확인
          </a>
          <a href="https://aicamp.co.kr/consultation" 
             style="display: inline-block; background: white; color: #1a1a1a; 
                    padding: 15px 40px; text-decoration: none; border-radius: 5px; 
                    font-weight: bold; border: 2px solid #1a1a1a; margin: 0 10px;">
            전문가 상담 신청
          </a>
        </div>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px 20px; text-align: center; color: #666;">
        <p style="margin: 0 0 10px 0;">
          이 진단 결과는 GEMINI AI와 이후경 교장의 전문 지식을 결합하여 생성되었습니다.
        </p>
        <p style="margin: 0;">
          <a href="mailto:support@aicamp.co.kr" style="color: #1a73e8;">support@aicamp.co.kr</a> | 
          <a href="tel:02-6952-7787" style="color: #1a73e8;">02-6952-7787</a>
        </p>
      </div>
    </div>
  `;
  
  try {
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (error) {
    console.error('결과 이메일 발송 오류:', error);
  }
}

/**
 * 등급별 색상 코드
 */
function getGradeColorCode(grade) {
  const colors = {
    'S': '#8b5cf6',  // 보라색
    'A': '#3b82f6',  // 파란색
    'B': '#10b981',  // 초록색
    'C': '#f59e0b',  // 노란색
    'D': '#f97316',  // 주황색
    'F': '#ef4444'   // 빨간색
  };
  return colors[grade] || '#6b7280';
}

/**
 * AI 역량진단 진행 상태 업데이트
 */
function updateAICapabilityDiagnosisProgress(diagnosisId, status, progress, message) {
  try {
    const sheet = getOrCreateSheet('AI_역량진단상태', 'ai-capability-diagnosis-status');
    
    // 헤더가 없으면 설정
    if (sheet.getLastRow() === 0) {
      const headers = ['진단ID', '상태', '진행률', '메시지', '업데이트시간'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    }
    
    // 기존 상태 찾기
    const data = sheet.getDataRange().getValues();
    let rowIndex = -1;
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === diagnosisId) {
        rowIndex = i + 1;
        break;
      }
    }
    
    const rowData = [diagnosisId, status, progress, message, getCurrentKoreanTime()];
    
    if (rowIndex > 0) {
      // 기존 행 업데이트
      sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
    } else {
      // 새 행 추가
      sheet.appendRow(rowData);
    }
  } catch (error) {
    console.error('진행 상태 업데이트 오류:', error);
  }
}

/**
 * AI 역량진단 오류 관리자 알림
 */
function notifyAdminAICapabilityDiagnosisError(diagnosisId, error) {
  const adminEmail = 'hongik423@gmail.com';
  const subject = `[긴급] AI 역량진단 오류 발생 - ${diagnosisId}`;
  
  const htmlBody = `
    <h2 style="color: red;">AI 역량진단 처리 중 오류 발생</h2>
    <p><strong>진단 ID:</strong> ${diagnosisId}</p>
    <p><strong>오류 시간:</strong> ${getCurrentKoreanTime()}</p>
    <p><strong>오류 내용:</strong></p>
    <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px;">
${error.toString()}
${error.stack || ''}
    </pre>
    <p><strong>조치 사항:</strong> 시스템 로그를 확인하고 필요시 수동으로 처리해주세요.</p>
  `;
  
  try {
    MailApp.sendEmail({
      to: adminEmail,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (mailError) {
    console.error('오류 알림 발송 실패:', mailError);
  }
}

/**
 * AI 역량진단 결과 조회 (GET 요청용)
 */
function handleGetAICapabilityDiagnosisResult(diagnosisId) {
  try {
    const sheet = getOrCreateSheet('AI_역량진단결과', 'ai-capability-diagnosis-results');
    const data = sheet.getDataRange().getValues();
    
    // 헤더 제외하고 검색
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === diagnosisId) {
        const resultJson = data[i][8]; // 보고서데이터 컬럼
        const result = JSON.parse(resultJson);
        
        return createSuccessResponse({
          data: result
        });
      }
    }
    
    return createErrorResponse('진단 결과를 찾을 수 없습니다', 404);
    
  } catch (error) {
    console.error('진단 결과 조회 오류:', error);
    return createErrorResponse('결과 조회 중 오류가 발생했습니다');
  }
}

/**
 * AI 역량진단 상태 조회 (GET 요청용)
 */
function handleGetAICapabilityDiagnosisStatus(diagnosisId) {
  try {
    const sheet = getOrCreateSheet('AI_역량진단상태', 'ai-capability-diagnosis-status');
    const data = sheet.getDataRange().getValues();
    
    // 헤더 제외하고 검색
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === diagnosisId) {
        return createSuccessResponse({
          status: data[i][1],
          progress: data[i][2],
          message: data[i][3],
          updatedAt: data[i][4]
        });
      }
    }
    
    // 상태가 없으면 기본값 반환
    return createSuccessResponse({
      status: 'pending',
      progress: 0,
      message: '진단 준비 중'
    });
    
  } catch (error) {
    console.error('상태 조회 오류:', error);
    return createErrorResponse('상태 조회 중 오류가 발생했습니다');
  }
}

// ===== 메인 라우터에 추가할 코드 =====
// 기존 doPost 함수에 다음 케이스 추가:
/*
if (data.formType === 'ai-capability-diagnosis') {
  return handleAICapabilityDiagnosisSubmission(data);
}
*/

// 기존 doGet 함수에 다음 코드 추가:
/*
const path = e.parameter.path;
if (path === 'status' && diagnosisId) {
  return handleGetAICapabilityDiagnosisStatus(diagnosisId);
}
if (diagnosisId && diagnosisId.startsWith('ACD-')) {
  return handleGetAICapabilityDiagnosisResult(diagnosisId);
}
*/