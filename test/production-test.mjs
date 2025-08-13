/**
 * 프로덕션 환경 테스트
 */

import fetch from 'node-fetch';

const PRODUCTION_URLS = [
  'https://aicamp.club',
  'https://aicamp-v3-0.vercel.app'
];

const testData = {
  contactName: '배포 테스트',
  contactEmail: 'test@aicamp.club',
  companyName: '테스트 기업',
  industry: 'IT/소프트웨어',
  employeeCount: '10-30명',
  aiFamiliarity: 3,
  currentAiTools: 2,
  changeReadiness: 3,
  timestamp: new Date().toISOString()
};

async function testProductionAPI(baseUrl) {
  console.log(`\n🌐 ${baseUrl} 테스트 시작...`);
  
  try {
    // 1. 홈페이지 접근 테스트
    console.log('📱 홈페이지 접근 테스트...');
    const homeResponse = await fetch(baseUrl, { timeout: 10000 });
    console.log(`   상태: ${homeResponse.status} ${homeResponse.statusText}`);
    
    if (!homeResponse.ok) {
      throw new Error(`홈페이지 접근 실패: ${homeResponse.status}`);
    }
    
    // 2. AI 진단 페이지 테스트
    console.log('🧠 AI 진단 페이지 테스트...');
    const diagnosisPageResponse = await fetch(`${baseUrl}/ai-diagnosis`, { timeout: 10000 });
    console.log(`   상태: ${diagnosisPageResponse.status} ${diagnosisPageResponse.statusText}`);
    
    // 3. API 엔드포인트 테스트
    console.log('⚡ API 엔드포인트 테스트...');
    const apiResponse = await fetch(`${baseUrl}/api/ai-diagnosis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData),
      timeout: 30000
    });
    
    console.log(`   상태: ${apiResponse.status} ${apiResponse.statusText}`);
    
    if (apiResponse.ok) {
      const result = await apiResponse.json();
      console.log(`   ✅ API 성공: 진단 ID ${result.diagnosisId}, 점수 ${result.totalScore}점`);
      return { success: true, url: baseUrl, diagnosisId: result.diagnosisId, score: result.totalScore };
    } else {
      const errorText = await apiResponse.text();
      console.log(`   ❌ API 실패: ${errorText.substring(0, 200)}...`);
      return { success: false, url: baseUrl, error: errorText };
    }
    
  } catch (error) {
    console.log(`   ❌ 오류: ${error.message}`);
    return { success: false, url: baseUrl, error: error.message };
  }
}

async function runProductionTests() {
  console.log('🚀 AICAMP V14.0 프로덕션 환경 테스트 시작');
  console.log('=' .repeat(60));
  
  const results = [];
  
  for (const url of PRODUCTION_URLS) {
    const result = await testProductionTests(url);
    results.push(result);
    
    // 각 테스트 사이에 잠시 대기
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log('📋 프로덕션 테스트 결과 요약');
  console.log('=' .repeat(60));
  
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  
  console.log(`✅ 성공: ${successCount}/${totalCount} 도메인`);
  console.log(`❌ 실패: ${totalCount - successCount}/${totalCount} 도메인`);
  
  results.forEach(result => {
    if (result.success) {
      console.log(`✅ ${result.url}: 정상 작동 (진단 ID: ${result.diagnosisId})`);
    } else {
      console.log(`❌ ${result.url}: ${result.error}`);
    }
  });
  
  if (successCount === totalCount) {
    console.log('\n🎉 모든 도메인에서 정상 작동합니다!');
    console.log('🌐 AICAMP V14.0 ULTIMATE ENHANCED SYSTEM 배포 완료!');
  } else {
    console.log('\n⚠️ 일부 도메인에서 문제가 있습니다. 확인이 필요합니다.');
  }
  
  return successCount === totalCount;
}

// 스크립트 실행 시 함수명 수정
runProductionTests().then(success => {
  process.exit(success ? 0 : 1);
});

// 함수명 수정
async function testProductionTests(url) {
  return await testProductionAPI(url);
}
