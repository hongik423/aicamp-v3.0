/**
 * 🧪 AI 시대 SWOT 분석 및 업종별 벤치마크 개선 테스트
 * 2025년 1월 29일
 */

const CONFIG = {
  API_BASE_URL: 'https://aicamp-v3-0-n7eu82zwb-hongik423-3087s-projects.vercel.app',
  LOCAL_URL: 'http://localhost:3000',
  USE_LOCAL: true // 로컬 테스트로 변경
};

const BASE_URL = CONFIG.USE_LOCAL ? CONFIG.LOCAL_URL : CONFIG.API_BASE_URL;

/**
 * 🎯 테스트 시나리오
 */
const TEST_SCENARIOS = [
  {
    name: '제조업 AI 트렌드 및 SWOT 분석',
    data: {
      companyName: 'AI스마트제조(주)',
      industry: '제조업',
      contactManager: '김대표',
      phone: '010-1234-5678',
      email: 'test-manufacturing@aicamp.club',
      employeeCount: '11-30명',
      growthStage: '성장기',
      businessLocation: '경기도',
      mainConcerns: '스마트팩토리 구축과 AI 품질검사 시스템 도입',
      expectedBenefits: 'AI로 불량률 감소와 생산성 향상',
      privacyConsent: true,
      // 점수 데이터 (제조업 특성 반영)
      planning_level: 4,
      differentiation_level: 3,
      pricing_level: 4,
      expertise_level: 5,
      quality_level: 5,
      customer_greeting: 3,
      customer_service: 3,
      complaint_management: 4,
      customer_retention: 3,
      customer_understanding: 3,
      marketing_planning: 2,
      offline_marketing: 2,
      online_marketing: 2,
      sales_strategy: 3,
      purchase_management: 4,
      inventory_management: 4,
      exterior_management: 4,
      interior_management: 4,
      cleanliness: 5,
      work_flow: 4
    }
  },
  {
    name: 'IT업종 AI 전략 분석',
    data: {
      companyName: 'AI솔루션스(주)',
      industry: 'IT/소프트웨어',
      contactManager: '이개발',
      phone: '010-2345-6789',
      email: 'test-it@aicamp.club',
      employeeCount: '10-50명',
      growthStage: '확장기',
      businessLocation: '서울',
      mainConcerns: 'GPT 기반 개발 자동화와 AI 테스팅 도입',
      expectedBenefits: 'AI로 개발 속도 향상과 품질 개선',
      privacyConsent: true,
      // IT업종 특성 반영 점수
      planning_level: 5,
      differentiation_level: 5,
      pricing_level: 4,
      expertise_level: 5,
      quality_level: 4,
      customer_greeting: 4,
      customer_service: 4,
      complaint_management: 4,
      customer_retention: 4,
      customer_understanding: 5,
      marketing_planning: 3,
      offline_marketing: 2,
      online_marketing: 5,
      sales_strategy: 4,
      purchase_management: 3,
      inventory_management: 3,
      exterior_management: 3,
      interior_management: 3,
      cleanliness: 4,
      work_flow: 5
    }
  },
  {
    name: '서비스업 AI 혁신 전략',
    data: {
      companyName: 'AI서비스센터',
      industry: '서비스업',
      contactManager: '박서비스',
      phone: '010-3456-7890',
      email: 'test-service@aicamp.club',
      employeeCount: '1-10명',
      growthStage: '창업기',
      businessLocation: '부산',
      mainConcerns: 'AI 챗봇 도입과 고객 데이터 분석',
      expectedBenefits: '24/7 고객응대와 맞춤형 서비스 제공',
      privacyConsent: true,
      // 서비스업 특성 반영 점수
      planning_level: 3,
      differentiation_level: 3,
      pricing_level: 3,
      expertise_level: 4,
      quality_level: 4,
      customer_greeting: 5,
      customer_service: 5,
      complaint_management: 4,
      customer_retention: 4,
      customer_understanding: 4,
      marketing_planning: 3,
      offline_marketing: 3,
      online_marketing: 3,
      sales_strategy: 3,
      purchase_management: 2,
      inventory_management: 2,
      exterior_management: 4,
      interior_management: 4,
      cleanliness: 5,
      work_flow: 3
    }
  }
];

/**
 * 🔧 API 호출 함수
 */
async function testDiagnosisAPI(testData) {
  try {
    console.log(`\n🚀 테스트 시작: ${testData.name}`);
    console.log('📊 업종:', testData.data.industry);
    console.log('🏢 기업명:', testData.data.companyName);
    
    const response = await fetch(`${BASE_URL}/api/simplified-diagnosis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData.data)
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ 진단 완료!');
      console.log('📊 종합점수:', result.diagnosisResult?.totalScore);
      console.log('🎯 결과 ID:', result.resultId);
      
      // SWOT 분석 확인
      if (result.diagnosisResult?.swotAnalysis) {
        const swot = result.diagnosisResult.swotAnalysis;
        console.log('\n📋 SWOT 분석:');
        console.log('- 강점:', swot.strengths?.length || 0, '개');
        console.log('- 약점:', swot.weaknesses?.length || 0, '개');
        console.log('- 기회:', swot.opportunities?.length || 0, '개');
        console.log('- 위협:', swot.threats?.length || 0, '개');
        
        // SO/WO/ST/WT 전략 확인
        if (swot.strategies) {
          console.log('\n🎯 SWOT 매트릭스 전략:');
          console.log('- SO 전략:', swot.strategies.SO?.length || 0, '개');
          console.log('- WO 전략:', swot.strategies.WO?.length || 0, '개');
          console.log('- ST 전략:', swot.strategies.ST?.length || 0, '개');
          console.log('- WT 전략:', swot.strategies.WT?.length || 0, '개');
        }
        
        // AI 트렌드 분석 확인
        if (swot.aiAnalysis) {
          console.log('\n🤖 AI 트렌드 분석:');
          console.log('- 현재 AI 트렌드:', swot.aiAnalysis.currentAITrends?.length || 0, '개');
          console.log('- 미래 변화:', swot.aiAnalysis.futureChanges?.length || 0, '개');
          console.log('- 적응 전략:', swot.aiAnalysis.adaptationStrategies?.length || 0, '개');
          console.log('- 경쟁 우위:', swot.aiAnalysis.competitiveAdvantages?.length || 0, '개');
        }
      }
      
      // 업종별 벤치마크 확인
      if (result.diagnosisResult?.industryInsights?.benchmarkScores) {
        const benchmarks = result.diagnosisResult.industryInsights.benchmarkScores;
        console.log('\n📊 업종별 벤치마크:');
        Object.entries(benchmarks).forEach(([metric, score]) => {
          console.log(`- ${metric}: ${score}점`);
        });
      }
      
      // 보고서 내용 확인
      if (result.aiReport) {
        console.log('\n📄 AI 보고서 생성:', result.aiReport.length, '자');
        
        // SO/WO/ST/WT 전략이 보고서에 포함되었는지 확인
        const hasSOStrategy = result.aiReport.includes('SO 전략');
        const hasWOStrategy = result.aiReport.includes('WO 전략');
        const hasSTStrategy = result.aiReport.includes('ST 전략');
        const hasWTStrategy = result.aiReport.includes('WT 전략');
        const hasAITrends = result.aiReport.includes('AI 트렌드');
        
        console.log('\n📝 보고서 내용 검증:');
        console.log('- SO 전략 포함:', hasSOStrategy ? '✅' : '❌');
        console.log('- WO 전략 포함:', hasWOStrategy ? '✅' : '❌');
        console.log('- ST 전략 포함:', hasSTStrategy ? '✅' : '❌');
        console.log('- WT 전략 포함:', hasWTStrategy ? '✅' : '❌');
        console.log('- AI 트렌드 포함:', hasAITrends ? '✅' : '❌');
      }
      
      // 결과 페이지 URL
      console.log(`\n🌐 결과 확인: ${BASE_URL}/diagnosis/results/${result.resultId}`);
      
      return result;
    } else {
      console.error('❌ 진단 실패:', result.error);
      return null;
    }
    
  } catch (error) {
    console.error('❌ API 호출 오류:', error);
    return null;
  }
}

/**
 * 🎯 메인 테스트 실행
 */
async function runAllTests() {
  console.log('🏁 AI 시대 SWOT 분석 시스템 테스트 시작');
  console.log('📍 테스트 서버:', BASE_URL);
  console.log('📅 테스트 시간:', new Date().toLocaleString('ko-KR'));
  console.log('=' .repeat(60));
  
  const results = [];
  
  for (const scenario of TEST_SCENARIOS) {
    const result = await testDiagnosisAPI(scenario);
    results.push({
      scenario: scenario.name,
      success: !!result?.success,
      result
    });
    
    // API 부하 방지를 위한 대기
    console.log('\n⏳ 다음 테스트까지 3초 대기...');
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  // 전체 결과 요약
  console.log('\n' + '='.repeat(60));
  console.log('📊 전체 테스트 결과 요약');
  console.log('='.repeat(60));
  
  const successCount = results.filter(r => r.success).length;
  console.log(`✅ 성공: ${successCount}/${results.length}`);
  console.log(`❌ 실패: ${results.length - successCount}/${results.length}`);
  
  results.forEach((r, index) => {
    console.log(`\n${index + 1}. ${r.scenario}: ${r.success ? '✅ 성공' : '❌ 실패'}`);
    if (r.success && r.result) {
      console.log(`   - 종합점수: ${r.result.diagnosisResult?.totalScore}점`);
      console.log(`   - 결과 ID: ${r.result.resultId}`);
    }
  });
  
  console.log('\n🎉 테스트 완료!');
}

// 테스트 실행
runAllTests().catch(error => {
  console.error('💥 테스트 실행 중 오류:', error);
  process.exit(1);
}); 