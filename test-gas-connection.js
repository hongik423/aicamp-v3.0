// Google Apps Script 연결 및 버전 확인 테스트
console.log('🚀 Google Apps Script V15.0 연결 테스트 시작...');

fetch('https://aicamp.club/api/google-script-proxy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'health_check',
    timestamp: new Date().toISOString()
  })
}).then(async res => {
  console.log('📡 응답 상태:', res.status, res.statusText);
  
  const result = await res.json();
  console.log('\n📋 Google Apps Script 상태:');
  console.log('✅ 성공 여부:', result.success ? '성공' : '실패');
  console.log('🔧 버전:', result.version || 'Unknown');
  console.log('🤖 모델:', result.model || 'Unknown');
  console.log('📊 브랜딩:', result.branding || 'Unknown');
  
  if (result.success && result.version) {
    console.log('\n🎉 Google Apps Script V15.0 연결 성공!');
    console.log('📝 상세 정보:', JSON.stringify(result, null, 2));
  } else {
    console.log('\n❌ 연결 실패 또는 구버전:', result.error || 'Unknown error');
  }
  
}).catch(err => {
  console.error('❌ 연결 테스트 실패:', err.message);
});
