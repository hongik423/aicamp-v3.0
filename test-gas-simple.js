// Google Apps Script 간단 테스트
const testData = {
  type: 'drive_upload',
  fileName: 'test.html',
  content: '<html><body>Test</body></html>',
  mimeType: 'text/html'
};

console.log('🚀 Google Apps Script 간단 테스트...');
console.log('📊 요청 데이터:', testData);

fetch('https://aicamp.club/api/google-script-proxy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData)
}).then(async res => {
  console.log('\n📡 응답 상태:', res.status, res.statusText);
  
  const result = await res.json();
  console.log('\n📋 전체 응답:');
  console.log(JSON.stringify(result, null, 2));
  
}).catch(err => {
  console.error('❌ 요청 실패:', err.message);
});
