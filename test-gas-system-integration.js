// GAS 시스템 통합 테스트 실행
console.log('🚀 GAS 시스템 통합 테스트 실행...');

const testData = {
  type: 'system_test',
  timestamp: new Date().toISOString()
};

console.log('📊 시스템 통합 테스트 요청...');

fetch('https://aicamp.club/api/google-script-proxy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData)
}).then(async res => {
  console.log('\n📡 응답 상태:', res.status, res.statusText);
  
  const result = await res.json();
  console.log('\n📋 시스템 통합 테스트 결과:');
  console.log('✅ 성공 여부:', result.success ? '성공' : '실패');
  
  if (result.success) {
    console.log('🧪 테스트 결과:', result.message);
    console.log('📊 진단 테스트:', result.results?.diagnosis ? '성공' : '실패');
    console.log('🚨 오류신고 테스트:', result.results?.taxError ? '성공' : '실패');
    console.log('📞 상담신청 테스트:', result.results?.consultation ? '성공' : '실패');
    console.log('🕒 처리 시간:', result.timestamp);
  } else {
    console.log('❌ 오류 메시지:', result.error);
  }
  
  console.log('\n📝 전체 응답:');
  console.log(JSON.stringify(result, null, 2));
  
}).catch(err => {
  console.error('❌ 요청 실패:', err.message);
  console.error('🔍 오류 상세:', err);
});
