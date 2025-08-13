/**
 * AI 역량진단 시스템 시뮬레이션 테스트
 * 실제 API 호출을 통한 전체 시스템 검증
 */

const sampleDiagnosisData = {
  // 기본 정보
  contactName: '홍길동',
  contactEmail: 'test@aicamp.club',
  contactPhone: '010-1234-5678',
  contactPosition: '대표이사',
  companyName: '테스트 기업',
  businessRegistration: '123-45-67890',
  establishmentYear: 2020,
  
  // 사업 현황
  industry: 'IT/소프트웨어',
  businessType: ['B2B 서비스'],
  location: '서울',
  employeeCount: '10-30명',
  annualRevenue: '10억-50억',
  marketPosition: '시장 진입 단계',
  competitiveAdvantage: '기술력 우위',
  
  // 현재 AI/디지털 현황 (8문항)
  aiFamiliarity: 3,
  currentAiTools: 2,
  aiUsageDepartments: 1,
  aiInvestmentHistory: 2,
  dataDigitalization: 3,
  currentSystems: 2,
  systemIntegration: 2,
  dataManagement: 3,
  
  // 조직 준비도 (8문항)
  changeReadiness: 4,
  leadershipSupport: 4,
  employeeAttitude: 3,
  changeManagementExperience: 2,
  budgetAllocation: 3,
  technicalPersonnel: 2,
  externalPartnership: 3,
  trainingInvestment: 3,
  
  // 기술 인프라 (9문항)
  dataQuality: 3,
  analyticsCapability: 2,
  decisionMaking: 3,
  cloudAdoption: 3,
  systemScalability: 2,
  integrationCapability: 2,
  securityMeasures: ['방화벽', '암호화'],
  complianceRequirements: ['개인정보보호법'],
  riskManagement: 3,
  
  // AI 목표 및 전략 (10문항)
  aiTransformationGoals: ['업무 효율성 향상', '고객 서비스 개선'],
  specificImprovements: '반복 업무 자동화를 통한 생산성 향상',
  expectedROI: '30-50%',
  successMetrics: ['생산성 지표', '고객 만족도'],
  timeframe: '6-12개월',
  priorityFunctions: ['마케팅', '고객서비스'],
  implementationApproach: '단계적 도입',
  resourceAllocation: {
    budget: '1,000-3,000만원',
    personnel: '2-3명',
    timeline: '6개월'
  },
  challengesAnticipated: ['직원 저항', '기술적 복잡성'],
  supportNeeds: ['전문가 컨설팅', '교육 프로그램'],
  
  timestamp: new Date().toISOString()
};

/**
 * API 호출 테스트 함수
 */
async function testDiagnosisAPI() {
  console.log('🧪 AI 역량진단 API 시뮬레이션 테스트 시작...');
  
  try {
    const startTime = Date.now();
    
    const response = await fetch('http://localhost:3000/api/ai-diagnosis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sampleDiagnosisData),
    });
    
    const responseTime = Date.now() - startTime;
    console.log(`⏱️ API 응답 시간: ${responseTime}ms`);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    
    // 응답 검증
    console.log('✅ API 호출 성공!');
    console.log('📊 진단 결과 검증:');
    console.log(`- 진단 ID: ${result.diagnosisId}`);
    console.log(`- 총점: ${result.totalScore}점`);
    console.log(`- 성숙도: ${result.maturityLevel}`);
    console.log(`- 백분위: ${result.percentile}%`);
    
    // 새로운 기능 검증
    if (result.priorityMatrix) {
      console.log('✅ 3차원 우선순위 매트릭스 생성됨');
      console.log(`- 액션 아이템: ${result.actionItems?.length || 0}개`);
    } else {
      console.log('❌ 3차원 우선순위 매트릭스 누락');
    }
    
    if (result.programRecommendations) {
      console.log('✅ AI CAMP 프로그램 추천 완료');
      console.log(`- 총 투자액: ${result.totalInvestment?.toLocaleString() || 0}원`);
      console.log(`- 예상 ROI: ${result.expectedROI || 'N/A'}`);
    } else {
      console.log('❌ AI CAMP 프로그램 추천 누락');
    }
    
    if (result.engagementMetrics) {
      console.log('✅ 고몰입조직 지표 분석 완료');
      console.log(`- 전체 몰입도: ${result.overallEngagement || 0}점`);
    } else {
      console.log('❌ 고몰입조직 지표 누락');
    }
    
    if (result.qualityReport) {
      console.log('✅ 품질 모니터링 완료');
      console.log(`- 품질 점수: ${result.qualityScore || 0}점`);
      console.log(`- 알림 수: ${result.qualityAlerts?.length || 0}개`);
    } else {
      console.log('❌ 품질 모니터링 누락');
    }
    
    if (result.htmlReport && result.htmlReportGenerated) {
      console.log('✅ HTML 보고서 생성 완료');
    } else {
      console.log('❌ HTML 보고서 생성 실패');
    }
    
    console.log(`📧 이메일 발송: ${result.emailSent ? '성공' : '실패'}`);
    console.log(`🔐 보고서 패스워드: ${result.reportPassword || 'N/A'}`);
    
    return {
      success: true,
      responseTime,
      result
    };
    
  } catch (error) {
    console.error('❌ API 호출 실패:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 시스템 헬스체크 테스트
 */
async function testSystemHealth() {
  console.log('🏥 시스템 헬스체크 테스트 시작...');
  
  try {
    const response = await fetch('http://localhost:3000/api/system-health');
    
    if (!response.ok) {
      throw new Error(`Health Check Failed: ${response.status}`);
    }
    
    const healthData = await response.json();
    console.log('✅ 시스템 헬스체크 완료');
    console.log(`- 시스템 상태: ${healthData.status}`);
    console.log(`- 업타임: ${healthData.uptime}`);
    console.log(`- 메모리 사용량: ${Math.round(healthData.memory?.heapUsed / 1024 / 1024)}MB`);
    
    return { success: true, healthData };
    
  } catch (error) {
    console.error('❌ 시스템 헬스체크 실패:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * 전체 시뮬레이션 테스트 실행
 */
async function runFullSimulationTest() {
  console.log('🚀 AI 역량진단 시스템 전체 시뮬레이션 테스트 시작');
  console.log('=' .repeat(60));
  
  const results = {
    startTime: new Date().toISOString(),
    tests: []
  };
  
  // 1. 시스템 헬스체크
  console.log('\n1️⃣ 시스템 헬스체크...');
  const healthResult = await testSystemHealth();
  results.tests.push({ name: 'System Health', ...healthResult });
  
  if (!healthResult.success) {
    console.log('❌ 시스템이 준비되지 않았습니다. 서버를 시작하세요.');
    return results;
  }
  
  // 2. API 진단 테스트
  console.log('\n2️⃣ AI 역량진단 API 테스트...');
  const apiResult = await testDiagnosisAPI();
  results.tests.push({ name: 'Diagnosis API', ...apiResult });
  
  // 3. 결과 요약
  console.log('\n' + '=' .repeat(60));
  console.log('📋 시뮬레이션 테스트 결과 요약');
  console.log('=' .repeat(60));
  
  const successCount = results.tests.filter(test => test.success).length;
  const totalTests = results.tests.length;
  
  console.log(`✅ 성공: ${successCount}/${totalTests}`);
  console.log(`❌ 실패: ${totalTests - successCount}/${totalTests}`);
  
  if (apiResult.success) {
    console.log(`⏱️ API 응답 시간: ${apiResult.responseTime}ms`);
    console.log(`🎯 시스템 버전: ${apiResult.result?.version || 'N/A'}`);
    console.log(`📊 분석 깊이: ${apiResult.result?.analysisDepth || 'N/A'}`);
  }
  
  results.endTime = new Date().toISOString();
  results.success = successCount === totalTests;
  
  if (results.success) {
    console.log('\n🎉 모든 테스트 통과! 시스템이 정상 작동합니다.');
  } else {
    console.log('\n⚠️ 일부 테스트 실패. 오류를 확인하고 수정이 필요합니다.');
  }
  
  return results;
}

// Node.js 환경에서 실행
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    testDiagnosisAPI,
    testSystemHealth,
    runFullSimulationTest,
    sampleDiagnosisData
  };
}

// 브라우저 환경에서 바로 실행
if (typeof window !== 'undefined') {
  runFullSimulationTest();
}
