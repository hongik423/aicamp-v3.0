// 무료 AI 진단 시스템 종합 테스트
const fetch = require('node-fetch');

console.log('🎯 AI CAMP 무료 AI 진단 시스템 종합 테스트 시작...\n');

const BASE_URL = 'http://localhost:3000';

// 테스트용 진단 데이터 (다양한 업종 및 시나리오)
const testDiagnosisData = [
  {
    name: '제조업체 테스트',
    data: {
      companyName: '테스트제조㈜',
      industry: '기계 제조업',
      contactManager: '김철수',
      phone: '010-1234-5678',
      email: 'test@testcompany.com',
      employeeCount: '20-50명',
      growthStage: '성장기',
      businessLocation: '경기도 안산시',
      mainConcerns: 'AI 생산성 향상을 통한 효율성 증대, 품질 관리 자동화',
      expectedBenefits: '생산성 40% 향상, 품질 불량률 50% 감소',
      privacyConsent: true,
      submitDate: new Date().toISOString(),
      
      // 5점 척도 평가표 (20개 항목)
      planning_level: 3,
      differentiation_level: 4,
      pricing_level: 3,
      expertise_level: 4,
      quality_level: 3,
      customer_greeting: 3,
      customer_service: 4,
      complaint_management: 3,
      customer_retention: 4,
      customer_understanding: 3,
      marketing_planning: 2,
      offline_marketing: 3,
      online_marketing: 2,
      sales_strategy: 3,
      purchase_management: 4,
      inventory_management: 3,
      exterior_management: 3,
      interior_management: 3,
      cleanliness: 4,
      work_flow: 3
    }
  },
  {
    name: 'IT서비스업체 테스트',
    data: {
      companyName: '스마트솔루션㈜',
      industry: 'IT 서비스업',
      contactManager: '박영희',
      phone: '010-9876-5432',
      email: 'park@smartsolution.com',
      employeeCount: '10-20명',
      growthStage: '초기성장기',
      businessLocation: '서울시 강남구',
      mainConcerns: '디지털 마케팅 강화, 온라인 고객 확보',
      expectedBenefits: '온라인 매출 300% 증대, 브랜드 인지도 향상',
      privacyConsent: true,
      submitDate: new Date().toISOString(),
      
      // 5점 척도 평가표 (IT업체 특성 반영)
      planning_level: 4,
      differentiation_level: 4,
      pricing_level: 3,
      expertise_level: 5,
      quality_level: 4,
      customer_greeting: 4,
      customer_service: 4,
      complaint_management: 3,
      customer_retention: 3,
      customer_understanding: 4,
      marketing_planning: 3,
      offline_marketing: 2,
      online_marketing: 4,
      sales_strategy: 4,
      purchase_management: 3,
      inventory_management: 2,
      exterior_management: 3,
      interior_management: 4,
      cleanliness: 4,
      work_flow: 4
    }
  },
  {
    name: '음식점업체 테스트',
    data: {
      companyName: '맛있는식당',
      industry: '음식점업',
      contactManager: '이요리',
      phone: '010-5555-7777',
      email: 'chef@delicious.com',
      employeeCount: '5-10명',
      growthStage: '성숙기',
      businessLocation: '부산시 해운대구',
      mainConcerns: '고객 서비스 품질 향상, 온라인 주문 시스템 도입',
      expectedBenefits: '고객 만족도 증대, 매출 20% 증가',
      privacyConsent: true,
      submitDate: new Date().toISOString(),
      
      // 5점 척도 평가표 (음식점 특성 반영)
      planning_level: 3,
      differentiation_level: 4,
      pricing_level: 4,
      expertise_level: 4,
      quality_level: 5,
      customer_greeting: 5,
      customer_service: 4,
      complaint_management: 4,
      customer_retention: 4,
      customer_understanding: 4,
      marketing_planning: 2,
      offline_marketing: 3,
      online_marketing: 2,
      sales_strategy: 3,
      purchase_management: 4,
      inventory_management: 4,
      exterior_management: 4,
      interior_management: 5,
      cleanliness: 5,
      work_flow: 4
    }
  }
];

async function testAIDiagnosis(testCase) {
  try {
    console.log(`🔍 ${testCase.name} 진단 테스트 시작...`);
    console.log(`🏢 회사명: ${testCase.data.companyName}`);
    console.log(`🏭 업종: ${testCase.data.industry}`);
    console.log(`👤 담당자: ${testCase.data.contactManager}`);
    console.log(`📧 이메일: ${testCase.data.email}`);
    
    const startTime = Date.now();
    
    const response = await fetch(`${BASE_URL}/api/simplified-diagnosis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(testCase.data),
      timeout: 45000 // 45초 타임아웃 (AI 분석 시간 고려)
    });
    
    const duration = Date.now() - startTime;
    
    if (response.ok) {
      const result = await response.json();
      
      console.log('✅ AI 진단 성공!');
      console.log(`⏱️ 처리시간: ${duration}ms (${Math.round(duration/1000)}초)`);
      console.log(`📊 진단 결과:`);
      console.log(`   🎯 총점수: ${result.diagnosis?.totalScore || 'N/A'}점`);
      console.log(`   📈 신뢰도: ${result.diagnosis?.reliabilityScore || 'N/A'}%`);
      console.log(`   🏆 등급: ${result.diagnosis?.overallGrade || 'N/A'}`);
      console.log(`   📋 보고서 길이: ${result.comprehensiveReport?.length || 0}자`);
      console.log(`   🔗 결과 URL: ${result.resultUrl || 'N/A'}`);
      
      if (result.diagnosis?.categoryResults) {
        console.log(`   📊 카테고리별 점수:`);
        result.diagnosis.categoryResults.slice(0, 5).forEach(cat => {
          console.log(`      ${cat.category}: ${cat.score}점 (${cat.grade})`);
        });
      }
      
      if (result.swotAnalysis) {
        console.log(`   🎯 SWOT 분석:`);
        console.log(`      강점: ${result.swotAnalysis.strengths?.length || 0}개`);
        console.log(`      약점: ${result.swotAnalysis.weaknesses?.length || 0}개`);
        console.log(`      기회: ${result.swotAnalysis.opportunities?.length || 0}개`);
        console.log(`      위협: ${result.swotAnalysis.threats?.length || 0}개`);
      }
      
      if (result.comprehensiveReport) {
        const preview = result.comprehensiveReport.substring(0, 200) + '...';
        console.log(`   📄 보고서 미리보기: ${preview}`);
      }
      
      return { 
        success: true, 
        result: result,
        duration: duration,
        testCase: testCase.name
      };
      
    } else {
      const errorText = await response.text();
      console.log(`❌ 진단 실패 (${response.status}): ${errorText}`);
      return { 
        success: false, 
        error: `HTTP ${response.status}: ${errorText}`,
        duration: duration,
        testCase: testCase.name
      };
    }
    
  } catch (error) {
    console.log(`❌ ${testCase.name} 연결 실패: ${error.message}`);
    return { 
      success: false, 
      error: error.message,
      testCase: testCase.name
    };
  }
}

async function runAIDiagnosisTests() {
  console.log('=' * 80);
  console.log('🚀 AI CAMP 무료 AI 진단 시스템 종합 동작 테스트');
  console.log('=' * 80);
  
  const results = {
    total: 0,
    success: 0,
    failed: 0,
    totalDuration: 0,
    testResults: []
  };
  
  for (const testCase of testDiagnosisData) {
    console.log(`\n🔍 ${testCase.name} 시작`);
    console.log('-' * 60);
    
    const testResult = await testAIDiagnosis(testCase);
    results.testResults.push(testResult);
    results.total++;
    
    if (testResult.success) {
      results.success++;
      results.totalDuration += testResult.duration || 0;
      console.log('✅ 테스트 성공\n');
    } else {
      results.failed++;
      console.log('❌ 테스트 실패\n');
    }
    
    console.log('=' * 80);
    
    // 다음 테스트까지 잠시 대기
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n🎯 전체 AI 진단 테스트 결과 요약:');
  console.log(`📊 총 테스트: ${results.total}개`);
  console.log(`✅ 성공: ${results.success}개 (${Math.round(results.success/results.total*100)}%)`);
  console.log(`❌ 실패: ${results.failed}개 (${Math.round(results.failed/results.total*100)}%)`);
  
  if (results.success > 0) {
    const avgDuration = Math.round(results.totalDuration / results.success);
    console.log(`⏱️ 평균 처리시간: ${avgDuration}ms (${Math.round(avgDuration/1000)}초)`);
  }
  
  console.log('\n📋 테스트별 상세 결과:');
  results.testResults.forEach(result => {
    const status = result.success ? '✅' : '❌';
    const duration = result.duration ? `${Math.round(result.duration/1000)}초` : 'N/A';
    console.log(`   ${status} ${result.testCase}: ${duration}`);
  });
  
  if (results.success === results.total) {
    console.log('\n🎉 모든 AI 진단 테스트가 성공했습니다!');
    console.log('📋 AI 진단 시스템이 완벽하게 동작합니다.');
    console.log('🎯 최고수준의 경영진단보고서 작성시스템이 정상 작동 중입니다.');
  } else {
    console.log('\n⚠️ 일부 AI 진단 테스트에 문제가 있습니다.');
    console.log('🔧 실패한 테스트의 로그를 확인하여 문제를 해결해주세요.');
  }
  
  return results;
}

// 테스트 실행
runAIDiagnosisTests()
  .then(results => {
    console.log('\n✅ AI 진단 시스템 테스트 완료');
    process.exit(results.success === results.total ? 0 : 1);
  })
  .catch(error => {
    console.error('\n❌ 테스트 실행 중 오류:', error);
    process.exit(1);
  }); 