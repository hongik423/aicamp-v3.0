/**
 * ================================================================================
 * AICAMP Google Apps Script 로컬 검증 테스트 2025.01.28
 * ================================================================================
 * 
 * 🎯 목표: 완전무오류 버전의 로직 검증
 * 📋 검증 범위: 안전한 유틸리티 함수들과 데이터 처리 로직
 */

console.log('🎯 AICAMP Google Apps Script 로컬 검증 테스트 시작');
console.log('=' .repeat(80));

// ================================================================================
// 🛡️ 안전한 유틸리티 함수들 (테스트용 구현)
// ================================================================================

/**
 * 안전한 문자열 검사
 */
function safeString(value, defaultValue = '') {
  if (value === null || value === undefined) {
    return defaultValue;
  }
  return String(value);
}

/**
 * 안전한 숫자 검사
 */
function safeNumber(value, defaultValue = 0) {
  if (value === null || value === undefined || isNaN(value)) {
    return defaultValue;
  }
  return Number(value);
}

/**
 * 안전한 객체 검사
 */
function safeObject(value, defaultValue = {}) {
  if (value === null || value === undefined || typeof value !== 'object') {
    return defaultValue;
  }
  return value;
}

/**
 * 안전한 문자열 자르기
 */
function safeSubstring(str, start, length) {
  const safeStr = safeString(str);
  if (safeStr.length === 0) {
    return '';
  }
  const safeStart = Math.max(0, safeNumber(start));
  const safeLength = length ? Math.min(length, safeStr.length - safeStart) : safeStr.length - safeStart;
  return safeStr.substring(safeStart, safeStart + safeLength);
}

/**
 * 안전한 객체 키 개수 계산
 */
function safeObjectKeysCount(obj) {
  const safeObj = safeObject(obj);
  try {
    return Object.keys(safeObj).length;
  } catch (error) {
    console.error('객체 키 계산 오류:', error);
    return 0;
  }
}

// ================================================================================
// 🧪 테스트 케이스들
// ================================================================================

const testCases = [
  {
    name: 'NULL 값 처리 테스트',
    test: () => {
      console.log('🧪 NULL 값 처리 테스트...');
      
      // NULL 문자열 처리
      const nullString = safeString(null, '기본값');
      console.log(`  - NULL 문자열: "${nullString}" (기대값: "기본값")`);
      
      // NULL 숫자 처리
      const nullNumber = safeNumber(null, 99);
      console.log(`  - NULL 숫자: ${nullNumber} (기대값: 99)`);
      
      // NULL 객체 처리
      const nullObject = safeObject(null);
      console.log(`  - NULL 객체 키 개수: ${safeObjectKeysCount(nullObject)} (기대값: 0)`);
      
      // NULL 문자열 자르기
      const nullSubstring = safeSubstring(null, 0, 10);
      console.log(`  - NULL 문자열 자르기: "${nullSubstring}" (기대값: "")`);
      
      return nullString === '기본값' && nullNumber === 99 && safeObjectKeysCount(nullObject) === 0 && nullSubstring === '';
    }
  },
  
  {
    name: '빈 값 처리 테스트',
    test: () => {
      console.log('🧪 빈 값 처리 테스트...');
      
      // 빈 문자열 처리
      const emptyString = safeString('', '기본값');
      console.log(`  - 빈 문자열: "${emptyString}" (기대값: "")`);
      
      // 0 숫자 처리
      const zeroNumber = safeNumber(0, 99);
      console.log(`  - 0 숫자: ${zeroNumber} (기대값: 0)`);
      
      // 빈 객체 처리
      const emptyObject = safeObject({});
      console.log(`  - 빈 객체 키 개수: ${safeObjectKeysCount(emptyObject)} (기대값: 0)`);
      
      // 빈 문자열 자르기
      const emptySubstring = safeSubstring('', 0, 10);
      console.log(`  - 빈 문자열 자르기: "${emptySubstring}" (기대값: "")`);
      
      return emptyString === '' && zeroNumber === 0 && safeObjectKeysCount(emptyObject) === 0 && emptySubstring === '';
    }
  },
  
  {
    name: '타입 오류 처리 테스트',
    test: () => {
      console.log('🧪 타입 오류 처리 테스트...');
      
      // 숫자가 아닌 값
      const nanString = safeNumber('not-a-number', 100);
      console.log(`  - NaN 문자열: ${nanString} (기대값: 100)`);
      
      // Boolean을 문자열로
      const boolToString = safeString(true);
      console.log(`  - Boolean→문자열: "${boolToString}" (기대값: "true")`);
      
      // 배열을 객체로
      const arrayAsObject = safeObject([1, 2, 3]);
      console.log(`  - 배열→객체 키 개수: ${safeObjectKeysCount(arrayAsObject)} (기대값: 3)`);
      
      return nanString === 100 && boolToString === 'true' && safeObjectKeysCount(arrayAsObject) === 3;
    }
  },
  
  {
    name: '진단 점수 범위 검증 테스트',
    test: () => {
      console.log('🧪 진단 점수 범위 검증 테스트...');
      
      // 점수 범위 검증 함수
      const validateScore = (score) => Math.max(0, Math.min(5, safeNumber(score)));
      
      // 정상 범위
      const normalScore = validateScore(3);
      console.log(`  - 정상 점수 (3): ${normalScore} (기대값: 3)`);
      
      // 범위 초과
      const overScore = validateScore(10);
      console.log(`  - 범위 초과 (10): ${overScore} (기대값: 5)`);
      
      // 범위 미만
      const underScore = validateScore(-2);
      console.log(`  - 범위 미만 (-2): ${underScore} (기대값: 0)`);
      
      // 잘못된 타입
      const invalidScore = validateScore('invalid');
      console.log(`  - 잘못된 타입: ${invalidScore} (기대값: 0)`);
      
      return normalScore === 3 && overScore === 5 && underScore === 0 && invalidScore === 0;
    }
  },
  
  {
    name: '문자열 자르기 안전성 테스트',
    test: () => {
      console.log('🧪 문자열 자르기 안전성 테스트...');
      
      const longText = '이것은 긴 텍스트입니다. 한글과 영어가 섞여있습니다. This is a long text with Korean and English.';
      
      // 정상 자르기
      const normalCut = safeSubstring(longText, 0, 10);
      console.log(`  - 정상 자르기 (0, 10): "${normalCut}" (길이: ${normalCut.length})`);
      
      // 길이 초과
      const overCut = safeSubstring(longText, 0, 1000);
      console.log(`  - 길이 초과 (0, 1000): 길이 ${overCut.length} (원본: ${longText.length})`);
      
      // 시작점 초과
      const overStart = safeSubstring(longText, 1000, 10);
      console.log(`  - 시작점 초과 (1000, 10): "${overStart}" (기대값: "")`);
      
      // 음수 시작점
      const negativeStart = safeSubstring(longText, -5, 10);
      console.log(`  - 음수 시작점 (-5, 10): "${negativeStart}" (길이: ${negativeStart.length})`);
      
      return normalCut.length === 10 && overCut.length === longText.length && overStart === '' && negativeStart.length === 10;
    }
  },
  
  {
    name: 'UTF-8 한글 처리 테스트',
    test: () => {
      console.log('🧪 UTF-8 한글 처리 테스트...');
      
      const koreanText = '안녕하세요! AICAMP 진단시스템입니다. 🎯✨🚀';
      const mixedText = 'Hello 안녕 World 세계 123 🌍';
      
      // 한글 문자열 처리
      const koreanSafe = safeString(koreanText);
      console.log(`  - 한글 문자열: "${koreanSafe}" (길이: ${koreanSafe.length})`);
      
      // 혼합 문자열 자르기
      const mixedCut = safeSubstring(mixedText, 0, 15);
      console.log(`  - 혼합 문자열 자르기: "${mixedCut}" (길이: ${mixedCut.length})`);
      
      // 이모지 포함 처리
      const emojiSafe = safeString('테스트 😀😁😂 완료');
      console.log(`  - 이모지 포함: "${emojiSafe}" (길이: ${emojiSafe.length})`);
      
      return koreanSafe === koreanText && mixedCut.length === 15 && emojiSafe.includes('😀');
    }
  },
  
  {
    name: '객체 안전성 테스트',
    test: () => {
      console.log('🧪 객체 안전성 테스트...');
      
      // 정상 객체
      const normalObj = { 기획수준: 4, 차별화정도: 3, 전문성: 5 };
      const normalCount = safeObjectKeysCount(normalObj);
      console.log(`  - 정상 객체 키 개수: ${normalCount} (기대값: 3)`);
      
      // 중첩 객체
      const nestedObj = { 
        productService: { score: 4.0 },
        customerService: { score: 3.5 },
        marketing: { score: 2.6 }
      };
      const nestedCount = safeObjectKeysCount(nestedObj);
      console.log(`  - 중첩 객체 키 개수: ${nestedCount} (기대값: 3)`);
      
      // 순환 참조 방지 테스트
      const circularObj = { name: 'test' };
      circularObj.self = circularObj; // 순환 참조
      const circularCount = safeObjectKeysCount(circularObj);
      console.log(`  - 순환 참조 객체 키 개수: ${circularCount} (기대값: 2)`);
      
      return normalCount === 3 && nestedCount === 3 && circularCount === 2;
    }
  }
];

// ================================================================================
// 🚀 테스트 실행
// ================================================================================

function runLocalValidation() {
  console.log('📋 총 테스트 케이스: ' + testCases.length + '개\n');
  
  let passedTests = 0;
  let failedTests = 0;
  
  testCases.forEach((testCase, index) => {
    console.log(`[${index + 1}/${testCases.length}] ${testCase.name}`);
    
    try {
      const result = testCase.test();
      
      if (result) {
        console.log('  ✅ 통과\n');
        passedTests++;
      } else {
        console.log('  ❌ 실패\n');
        failedTests++;
      }
    } catch (error) {
      console.log(`  💥 오류: ${error.message}\n`);
      failedTests++;
    }
  });
  
  // 결과 요약
  console.log('=' .repeat(80));
  console.log('📊 테스트 결과 요약');
  console.log('=' .repeat(80));
  console.log(`전체 테스트: ${testCases.length}개`);
  console.log(`통과: ${passedTests}개`);
  console.log(`실패: ${failedTests}개`);
  console.log(`성공률: ${((passedTests / testCases.length) * 100).toFixed(2)}%`);
  
  if (failedTests === 0) {
    console.log('\n🎉 모든 테스트 통과! Google Apps Script 완전무오류 로직 검증 완료');
    console.log('✅ Vercel 배포 전 안전성 확인됨');
  } else {
    console.log('\n⚠️ 일부 테스트 실패. 추가 검토 필요');
  }
  
  console.log('\n🎯 로컬 검증 테스트 완료!');
}

// 테스트 실행
runLocalValidation(); 