#!/usr/bin/env node

/**
 * 🔧 Google Sheets 시트 구조 확인 및 수정 가이드
 * Google Sheets에서 올바른 시트명을 찾고 수정 방안 제시
 */

console.log('🔧 Google Sheets 시트 구조 문제 해결');
console.log('='.repeat(50));

console.log('📊 현재 상황 분석:');
console.log('✅ Google Apps Script 배포 완료');
console.log('✅ action=getResult 처리 로직 작동');
console.log('❌ "진단 결과 시트를 찾을 수 없습니다" 오류 발생');

console.log('\n🔍 문제 원인:');
console.log('Google Sheets에서 다음 시트들을 찾을 수 없음:');
console.log('- AI_진단결과');
console.log('- AI진단결과');
console.log('- 진단결과');
console.log('- AI_DIAGNOSIS_RESULTS');
console.log('- DIAGNOSIS_RESULTS');

console.log('\n📋 해결 방안:');

console.log('\n1️⃣ Google Sheets 수동 확인');
console.log('🔗 URL: https://docs.google.com/spreadsheets/d/1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ/edit');
console.log('👀 확인사항:');
console.log('   - 현재 존재하는 시트명들 확인');
console.log('   - 진단 데이터가 저장된 시트 찾기');
console.log('   - 시트명이 다를 수 있음 (예: "AI_진단신청", "Sheet1" 등)');

console.log('\n2️⃣ 시트명 수정 방법 A: Google Sheets에서 시트명 변경');
console.log('📝 단계:');
console.log('   1. Google Sheets 접속');
console.log('   2. 진단 데이터가 있는 시트 찾기');
console.log('   3. 시트 탭 우클릭 → "이름 바꾸기"');
console.log('   4. "AI_진단결과"로 변경');

console.log('\n3️⃣ 시트명 수정 방법 B: Google Apps Script 코드 수정');
console.log('📝 현재 검색하는 시트명들:');
console.log('   const alternativeNames = [');
console.log('     "AI진단결과",');
console.log('     "진단결과", ');
console.log('     "AI_DIAGNOSIS_RESULTS",');
console.log('     "DIAGNOSIS_RESULTS",');
console.log('     "AI_진단신청"  // 이미 추가됨');
console.log('   ];');

console.log('\n4️⃣ 추가 시트명 후보들:');
console.log('   - "Sheet1" (기본 시트)');
console.log('   - "AI진단신청"');
console.log('   - "진단신청"');
console.log('   - "데이터"');
console.log('   - "Results"');

console.log('\n🛠️ 즉시 해결 방법:');

console.log('\n방법 1: Google Sheets에서 시트명 확인 후 변경');
console.log('1. https://docs.google.com/spreadsheets/d/1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ/edit');
console.log('2. 하단 시트 탭들 확인');
console.log('3. 진단 데이터가 있는 시트를 "AI_진단결과"로 이름 변경');

console.log('\n방법 2: Google Apps Script 코드에 더 많은 시트명 추가');
console.log('getDiagnosisResultIntegrated 함수의 alternativeNames 배열에 추가:');
console.log('const alternativeNames = [');
console.log('  "AI진단결과", "진단결과", "AI_DIAGNOSIS_RESULTS",');
console.log('  "DIAGNOSIS_RESULTS", "AI_진단신청", "Sheet1",');
console.log('  "진단신청", "데이터", "Results", "AI진단신청"');
console.log('];');

console.log('\n🎯 권장 해결책:');
console.log('1. Google Sheets 접속하여 실제 시트명 확인');
console.log('2. 진단 데이터가 저장된 시트를 "AI_진단결과"로 이름 변경');
console.log('3. 테스트 재실행: node test-gas-data.js');

console.log('\n📞 추가 지원:');
console.log('- Google Sheets: https://docs.google.com/spreadsheets/d/1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ/edit');
console.log('- 관리자: hongik423@gmail.com');
console.log('- 시트명 확인 후 알려주시면 코드 수정 가능');

console.log('\n✨ 이 문제만 해결되면 전체 시스템이 완벽하게 작동합니다!');
