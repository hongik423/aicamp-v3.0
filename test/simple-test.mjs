/**
 * 간단한 API 테스트 - 오류 위치 파악용
 */

import fetch from 'node-fetch';

const minimalTestData = {
  contactName: '테스트',
  contactEmail: 'test@test.com',
  companyName: '테스트회사',
  industry: 'IT/소프트웨어',
  employeeCount: '10-30명',
  
  // 최소한의 필수 데이터만 포함
  aiFamiliarity: 3,
  currentAiTools: 2,
  changeReadiness: 3,
  leadershipSupport: 3,
  dataQuality: 3,
  aiTransformationGoals: ['업무 효율성 향상'],
  
  timestamp: new Date().toISOString()
};

async function simpleTest() {
  console.log('🔧 간단한 API 테스트 시작...');
  
  try {
    const response = await fetch('http://localhost:3000/api/ai-diagnosis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(minimalTestData),
    });
    
    console.log(`📡 응답 상태: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ 오류 응답:', errorText);
      
      // JSON 파싱 시도
      try {
        const errorJson = JSON.parse(errorText);
        console.log('🔍 오류 상세:', errorJson.error);
      } catch (parseError) {
        console.log('📝 원시 오류:', errorText);
      }
      
      return false;
    }
    
    const result = await response.json();
    console.log('✅ API 호출 성공!');
    console.log(`📊 진단 ID: ${result.diagnosisId}`);
    console.log(`📊 총점: ${result.totalScore}`);
    
    return true;
    
  } catch (error) {
    console.error('❌ 네트워크 오류:', error.message);
    return false;
  }
}

simpleTest().then(success => {
  console.log(`\n🏁 테스트 결과: ${success ? '성공' : '실패'}`);
  process.exit(success ? 0 : 1);
});
