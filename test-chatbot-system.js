// AI CAMP 챗봇 시스템 종합 테스트
const fetch = require('node-fetch');

console.log('🔍 AI CAMP 챗봇 시스템 종합 테스트 시작...\n');

const BASE_URL = 'http://localhost:3000';

const testAPIs = [
  { 
    name: '기본 챗봇 API', 
    endpoint: '/api/chat',
    description: '이후경 경영지도사 직접 작성 응답 시스템'
  },
  { 
    name: 'AI 챗봇 API', 
    endpoint: '/api/chat-ai',
    description: 'Google Gemini 기반 AI 응답 시스템'
  },
  { 
    name: '이후경 고급 챗봇 API', 
    endpoint: '/api/chat-lee-hukyung',
    description: 'AI 연계 고도화 응답 시스템'
  }
];

const testMessages = [
  '안녕하세요',
  'AI 생산성향상에 대해 알고 싶습니다',
  'BM ZEN 사업분석이 뭔가요?',
  '상담받고 싶어요',
  '비용은 얼마나 드나요?'
];

async function testAPI(api, message) {
  try {
    console.log(`📡 ${api.name} 테스트 중...`);
    console.log(`🔗 엔드포인트: ${api.endpoint}`);
    console.log(`💬 테스트 메시지: "${message}"`);
    
    // GET 헬스체크
    try {
      const getResponse = await fetch(`${BASE_URL}${api.endpoint}`, {
        method: 'GET',
        timeout: 10000
      });
      
      if (getResponse.ok) {
        const getResult = await getResponse.json();
        console.log('✅ GET 헬스체크 성공');
        console.log(`📊 상태: ${getResult.status || '정상'}`);
      } else {
        console.log(`⚠️ GET 상태코드: ${getResponse.status}`);
      }
    } catch (getError) {
      console.log(`❌ GET 헬스체크 실패: ${getError.message}`);
    }
    
    // POST 메시지 테스트
    const postResponse = await fetch(`${BASE_URL}${api.endpoint}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ message }),
      timeout: 15000
    });
    
    if (postResponse.ok) {
      const result = await postResponse.json();
      console.log('✅ POST 메시지 테스트 성공');
      console.log(`📝 응답 길이: ${result.response ? result.response.length : 0}자`);
      console.log(`🔘 버튼 개수: ${result.buttons ? result.buttons.length : 0}개`);
      console.log(`🏷️ 소스: ${result.source || 'N/A'}`);
      
      if (result.response) {
        const preview = result.response.substring(0, 100) + (result.response.length > 100 ? '...' : '');
        console.log(`📄 응답 미리보기: ${preview}`);
      }
      
      return { success: true, result };
    } else {
      const errorText = await postResponse.text();
      console.log(`❌ POST 실패 (${postResponse.status}): ${errorText}`);
      return { success: false, error: `HTTP ${postResponse.status}` };
    }
    
  } catch (error) {
    console.log(`❌ ${api.name} 연결 실패: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('=' * 80);
  console.log('🚀 AI CAMP 챗봇 시스템 종합 동작 테스트');
  console.log('=' * 80);
  
  const results = {
    total: 0,
    success: 0,
    failed: 0,
    apis: {}
  };
  
  for (const api of testAPIs) {
    console.log(`\n🔍 ${api.name} 테스트 시작`);
    console.log(`📋 설명: ${api.description}`);
    console.log('-' * 60);
    
    const apiResults = [];
    
    for (const message of testMessages) {
      const testResult = await testAPI(api, message);
      apiResults.push(testResult);
      results.total++;
      
      if (testResult.success) {
        results.success++;
        console.log('✅ 테스트 성공\n');
      } else {
        results.failed++;
        console.log('❌ 테스트 실패\n');
      }
      
      // 다음 테스트까지 잠시 대기
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    results.apis[api.name] = {
      total: apiResults.length,
      success: apiResults.filter(r => r.success).length,
      failed: apiResults.filter(r => !r.success).length
    };
    
    console.log(`\n📊 ${api.name} 테스트 결과:`);
    console.log(`   ✅ 성공: ${results.apis[api.name].success}/${results.apis[api.name].total}`);
    console.log(`   ❌ 실패: ${results.apis[api.name].failed}/${results.apis[api.name].total}`);
    console.log('=' * 80);
  }
  
  console.log('\n🎯 전체 테스트 결과 요약:');
  console.log(`📊 총 테스트: ${results.total}개`);
  console.log(`✅ 성공: ${results.success}개 (${Math.round(results.success/results.total*100)}%)`);
  console.log(`❌ 실패: ${results.failed}개 (${Math.round(results.failed/results.total*100)}%)`);
  
  console.log('\n📋 API별 성공률:');
  for (const [apiName, apiResult] of Object.entries(results.apis)) {
    const successRate = Math.round(apiResult.success/apiResult.total*100);
    console.log(`   ${apiName}: ${successRate}% (${apiResult.success}/${apiResult.total})`);
  }
  
  if (results.success === results.total) {
    console.log('\n🎉 모든 챗봇 API가 정상 동작합니다!');
  } else {
    console.log('\n⚠️ 일부 챗봇 API에 문제가 있습니다. 로그를 확인해주세요.');
  }
  
  return results;
}

// 테스트 실행
runTests()
  .then(results => {
    console.log('\n✅ 챗봇 시스템 테스트 완료');
    process.exit(results.success === results.total ? 0 : 1);
  })
  .catch(error => {
    console.error('\n❌ 테스트 실행 중 오류:', error);
    process.exit(1);
  }); 