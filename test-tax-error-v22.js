// 세금계산기 오류신고 V22.0 테스트 스크립트
console.log('🚀 세금계산기 오류신고 V22.0 테스트 시작...');

const testData = {
  type: 'tax-error',
  name: '테스트신고자',
  email: 'error@test.com',
  phone: '010-2222-3333',
  calculatorType: 'vat',
  errorDescription: '부가가치세 계산 시 오류가 발생합니다. 입력값이 정상인데도 계산 결과가 0으로 나옵니다.',
  expectedBehavior: '정상적으로 부가가치세가 계산되어야 합니다.',
  actualBehavior: '계산 결과가 항상 0으로 표시됩니다.',
  stepsToReproduce: '1. 부가가치세 계산기 페이지 접속\n2. 매출액 입력: 1,000,000원\n3. 계산 버튼 클릭\n4. 결과 확인: 0원으로 표시됨',
  browserInfo: 'Chrome 120.0.6099.109',
  deviceInfo: 'Windows 10 PC',
  additionalInfo: '이 오류는 모든 입력값에서 동일하게 발생합니다.'
};

console.log('📊 테스트 데이터 준비 완료:');
console.log('- 신고자:', testData.name);
console.log('- 이메일:', testData.email);
console.log('- 계산기 유형:', testData.calculatorType);
console.log('- 오류 설명:', testData.errorDescription.substring(0, 50) + '...');

fetch('https://aicamp.club/api/google-script-proxy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData)
}).then(async res => {
  console.log('\n📡 응답 상태:', res.status, res.statusText);
  
  const result = await res.json();
  console.log('\n📋 세금계산기 오류신고 결과:');
  console.log('✅ 성공 여부:', result.success ? '성공' : '실패');
  
  if (result.success) {
    console.log('🆔 신고 ID:', result.reportId);
    console.log('📧 이메일 발송:', result.emailResults ? '시도됨' : '실패');
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
