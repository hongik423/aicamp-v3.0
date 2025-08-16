#!/usr/bin/env node

/**
 * 🔍 Google Sheets 데이터 저장 위치 디버깅
 * 어느 시트에 진단 데이터가 실제로 저장되고 있는지 확인
 */

console.log('🔍 Google Sheets 데이터 저장 위치 디버깅');
console.log('='.repeat(50));

console.log('📊 현재 상황:');
console.log('✅ AI_진단결과 시트 찾기 성공');
console.log('❌ "저장된 진단 결과가 없습니다" - 시트가 비어있음');

console.log('\n🔍 문제 분석:');
console.log('1. 진단 신청은 성공적으로 처리됨');
console.log('2. AI_진단결과 시트는 존재하지만 비어있음');
console.log('3. 데이터가 다른 시트에 저장되고 있을 가능성');

console.log('\n📋 확인해야 할 시트들:');
console.log('🔗 Google Sheets: https://docs.google.com/spreadsheets/d/1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ/edit');

console.log('\n👀 각 시트별 확인 사항:');

console.log('\n1️⃣ AI_진단결과 시트:');
console.log('   - 현재 상태: 존재하지만 비어있음');
console.log('   - 확인 필요: 헤더가 있는지, 데이터 행이 있는지');

console.log('\n2️⃣ AI역량진단_보고서 시트:');
console.log('   - 확인 필요: 진단 데이터가 여기에 저장되는지');
console.log('   - 컬럼: 진단ID, 회사명, 업종, 분석결과 등');

console.log('\n3️⃣ 상담신청_데이터 시트:');
console.log('   - 확인 필요: 신청 데이터만 저장되는지');

console.log('\n4️⃣ 진행상황_모니터링 시트:');
console.log('   - 확인 필요: 진행 상황만 저장되는지');

console.log('\n5️⃣ AI역량진단_메인데이터 시트:');
console.log('   - 확인 필요: 메인 데이터가 여기에 저장되는지');

console.log('\n🛠️ 해결 방법:');

console.log('\n방법 1: 데이터가 저장된 실제 시트 찾기');
console.log('1. Google Sheets의 모든 시트 탭 확인');
console.log('2. 각 시트에서 최근 진단 ID 검색:');
console.log('   - DIAG_1755334818751_Z5I5HC9Z4');
console.log('   - DIAG_1755334545106_LHWTAA0LK');
console.log('   - DIAG_1755334305632_6JB7ZFPL0');

console.log('\n방법 2: Google Apps Script 코드 수정');
console.log('실제 데이터가 저장된 시트명을 찾은 후:');
console.log('getDiagnosisResultIntegrated 함수의 alternativeNames에 추가');

console.log('\n🎯 즉시 확인 단계:');
console.log('1. Google Sheets 접속');
console.log('2. 각 시트에서 Ctrl+F로 "DIAG_1755334818751" 검색');
console.log('3. 데이터가 발견된 시트명 확인');
console.log('4. 해당 시트명을 알려주시면 코드 수정');

console.log('\n💡 예상 시나리오:');
console.log('- 데이터가 "AI역량진단_보고서" 시트에 저장되고 있을 가능성');
console.log('- 또는 "AI역량진단_메인데이터" 시트에 저장');
console.log('- 시트명 불일치로 인한 조회 실패');

console.log('\n📞 다음 단계:');
console.log('실제 데이터가 저장된 시트명을 찾아서 알려주시면');
console.log('Google Apps Script 코드를 즉시 수정하여 문제를 해결하겠습니다!');

console.log('\n✨ 이제 정말 마지막 단계입니다! 🚀');
