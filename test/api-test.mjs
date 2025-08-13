/**
 * AI 역량진단 API 시뮬레이션 테스트 (ES Module)
 */

import fetch from 'node-fetch';

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

async function testDiagnosisAPI() {
  console.log('🧪 AI 역량진단 API 시뮬레이션 테스트 시작...');
  console.log('=' .repeat(60));
  
  try {
    const startTime = Date.now();
    
    console.log('📤 API 호출 중...');
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
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}\n${errorText}`);
    }
    
    const result = await response.json();
    
    // 기본 응답 검증
    console.log('\n✅ API 호출 성공!');
    console.log('📊 기본 진단 결과:');
    console.log(`- 성공 여부: ${result.success}`);
    console.log(`- 진단 ID: ${result.diagnosisId || 'N/A'}`);
    console.log(`- 총점: ${result.totalScore || 'N/A'}점`);
    console.log(`- 성숙도: ${result.maturityLevel || 'N/A'}`);
    console.log(`- 백분위: ${result.percentile || 'N/A'}%`);
    console.log(`- 시스템 버전: ${result.version || 'N/A'}`);
    
    // 새로운 기능 검증
    console.log('\n🔍 고급 기능 검증:');
    
    // 1. 3차원 우선순위 매트릭스
    if (result.priorityMatrix) {
      console.log('✅ 3차원 우선순위 매트릭스: 생성됨');
      console.log(`   - 액션 아이템: ${result.actionItems?.length || 0}개`);
      console.log(`   - 실행 로드맵: ${Object.keys(result.executionRoadmap || {}).length}단계`);
    } else {
      console.log('❌ 3차원 우선순위 매트릭스: 누락');
    }
    
    // 2. AI CAMP 프로그램 추천
    if (result.programRecommendations) {
      console.log('✅ AI CAMP 프로그램 추천: 완료');
      console.log(`   - 총 투자액: ${result.totalInvestment?.toLocaleString() || 0}원`);
      console.log(`   - 예상 ROI: ${result.expectedROI || 'N/A'}`);
    } else {
      console.log('❌ AI CAMP 프로그램 추천: 누락');
    }
    
    // 3. 고몰입조직 지표
    if (result.engagementMetrics) {
      console.log('✅ 고몰입조직 지표: 분석 완료');
      console.log(`   - 전체 몰입도: ${result.overallEngagement || 0}점`);
      console.log(`   - 인지적 몰입: ${result.engagementMetrics?.cognitiveEngagement || 0}점`);
      console.log(`   - 정서적 몰입: ${result.engagementMetrics?.emotionalEngagement || 0}점`);
      console.log(`   - 행동적 몰입: ${result.engagementMetrics?.behavioralEngagement || 0}점`);
    } else {
      console.log('❌ 고몰입조직 지표: 누락');
    }
    
    // 4. 품질 모니터링
    if (result.qualityReport) {
      console.log('✅ 품질 모니터링: 완료');
      console.log(`   - 품질 점수: ${result.qualityScore || 0}점`);
      console.log(`   - 알림 수: ${result.qualityAlerts?.length || 0}개`);
      console.log(`   - 권고사항: ${result.qualityRecommendations?.length || 0}개`);
    } else {
      console.log('❌ 품질 모니터링: 누락');
    }
    
    // 5. 보고서 생성
    console.log('\n📄 보고서 생성 상태:');
    console.log(`- HTML 보고서: ${result.htmlReportGenerated ? '✅ 생성됨' : '❌ 실패'}`);
    console.log(`- 이메일 발송: ${result.emailSent ? '✅ 성공' : '❌ 실패'}`);
    console.log(`- 보고서 패스워드: ${result.reportPassword || 'N/A'}`);
    
    // 6. 시스템 성능 지표
    if (result.systemStability) {
      console.log('\n⚡ 시스템 성능 지표:');
      console.log(`- 처리 시간: ${result.systemStability.processingTime || responseTime}ms`);
      console.log(`- 메모리 사용량: ${Math.round((result.systemStability.memoryUsage?.heapUsed || 0) / 1024 / 1024)}MB`);
      console.log(`- 품질 점수: ${result.systemStability.qualityScore || 0}점`);
      console.log(`- 오류 수: ${result.systemStability.errorCount || 0}개`);
      console.log(`- 경고 수: ${result.systemStability.warningCount || 0}개`);
      console.log(`- 치명적 오류: ${result.systemStability.criticalCount || 0}개`);
    }
    
    // 전체 평가
    console.log('\n' + '=' .repeat(60));
    console.log('📋 시뮬레이션 테스트 결과 요약');
    console.log('=' .repeat(60));
    
    const features = [
      { name: '기본 진단', status: result.success },
      { name: '3차원 매트릭스', status: !!result.priorityMatrix },
      { name: '프로그램 추천', status: !!result.programRecommendations },
      { name: '몰입도 지표', status: !!result.engagementMetrics },
      { name: '품질 모니터링', status: !!result.qualityReport },
      { name: 'HTML 보고서', status: result.htmlReportGenerated },
      { name: '이메일 발송', status: result.emailSent }
    ];
    
    const successCount = features.filter(f => f.status).length;
    const totalFeatures = features.length;
    
    console.log(`✅ 성공한 기능: ${successCount}/${totalFeatures}`);
    console.log(`❌ 실패한 기능: ${totalFeatures - successCount}/${totalFeatures}`);
    console.log(`⏱️ 전체 처리 시간: ${responseTime}ms`);
    
    features.forEach(feature => {
      console.log(`${feature.status ? '✅' : '❌'} ${feature.name}`);
    });
    
    if (successCount === totalFeatures) {
      console.log('\n🎉 모든 기능이 정상 작동합니다! 시스템이 완벽하게 구축되었습니다.');
    } else {
      console.log('\n⚠️ 일부 기능에서 문제가 발견되었습니다. 오류를 분석하고 수정이 필요합니다.');
      
      // 실패한 기능들 상세 분석
      const failedFeatures = features.filter(f => !f.status);
      console.log('\n🔍 실패한 기능 상세:');
      failedFeatures.forEach(feature => {
        console.log(`❌ ${feature.name}: 구현 확인 필요`);
      });
    }
    
    return {
      success: true,
      responseTime,
      result,
      features: { success: successCount, total: totalFeatures }
    };
    
  } catch (error) {
    console.error('\n❌ API 호출 실패:');
    console.error(`오류 메시지: ${error.message}`);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 해결 방법:');
      console.error('1. 개발 서버가 실행 중인지 확인하세요: npm run dev');
      console.error('2. 포트 3000이 사용 가능한지 확인하세요');
      console.error('3. 방화벽 설정을 확인하세요');
    }
    
    return {
      success: false,
      error: error.message
    };
  }
}

// 테스트 실행
testDiagnosisAPI().then(result => {
  process.exit(result.success ? 0 : 1);
});
