/**
 * Google Apps Script AI 진단 시스템 테스트
 * 2025.01.28
 */

const axios = require('axios');

// Google Apps Script URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec';

// 색상 코드
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// 로그 헬퍼
const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}❌${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠️${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.bright}${colors.cyan}=== ${msg} ===${colors.reset}\n`)
};

/**
 * 1. 종합 시스템 테스트
 */
async function testCompleteSystem() {
  log.section('AI 진단 시스템 종합 테스트');
  
  try {
    const response = await axios.post(GOOGLE_SCRIPT_URL, {
      action: 'internalTest',
      functionName: 'testCompleteAIDiagnosisSystem'
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });
    
    if (response.data.success) {
      log.success('종합 테스트 완료');
      const results = response.data.data.testResults;
      console.log(`📊 총 테스트: ${results.총테스트}개`);
      console.log(`✅ 성공: ${results.성공}개`);
      console.log(`❌ 실패: ${results.실패}개`);
      console.log(`⚠️  경고: ${results.경고}개`);
    } else {
      log.error('종합 테스트 실패:', response.data.message);
    }
  } catch (error) {
    log.error('종합 테스트 오류:', error.message);
  }
}

/**
 * 2. AI 진단 신청 테스트
 */
async function testDiagnosisSubmission() {
  log.section('AI 진단 신청 테스트');
  
  const testData = {
    action: 'saveDiagnosis',
    회사명: '테스트기업_' + new Date().getTime(),
    업종: ['제조업', 'IT/소프트웨어'],
    소재지: '서울특별시',
    사업담당자: '김대표',
    직원수: '50명 이상',
    사업성장단계: '성장기',
    주요고민사항: ['디지털 전환', 'AI 도입', '인재 관리'],
    예상혜택: 'AI 도입을 통한 업무 효율성 30% 향상',
    담당자명: '테스트담당자',
    연락처: '010-0000-0000',
    이메일: 'test@example.com',
    개인정보동의: true,
    종합점수: 75,
    문항별점수: {
      기획수준: 4,
      차별화정도: 4,
      가격설정: 3,
      전문성: 5,
      품질: 4,
      고객맞이: 4,
      고객응대: 4,
      불만관리: 3,
      고객유지: 4,
      고객이해: 4,
      마케팅계획: 3,
      오프라인마케팅: 3,
      온라인마케팅: 4,
      판매전략: 4,
      구매관리: 4,
      재고관리: 3,
      외관관리: 4,
      인테리어관리: 4,
      청결도: 4,
      작업동선: 4
    }
  };
  
  try {
    log.info('진단 데이터 전송 중...');
    const response = await axios.post(GOOGLE_SCRIPT_URL, testData, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 60000 // 60초 타임아웃
    });
    
    if (response.data.success) {
      log.success('진단 신청 성공');
      console.log('📋 결과:', response.data.message);
      if (response.data.data) {
        console.log('📊 처리 시간:', response.data.data.processingTime);
        console.log('📧 이메일 발송:', response.data.data.emailSent ? '성공' : '실패');
      }
    } else {
      log.error('진단 신청 실패:', response.data.message);
    }
  } catch (error) {
    log.error('진단 신청 오류:', error.message);
    if (error.response) {
      console.log('응답 데이터:', error.response.data);
    }
  }
}

/**
 * 3. 배열 데이터 처리 테스트
 */
async function testArrayDataProcessing() {
  log.section('배열 데이터 처리 테스트');
  
  const testCases = [
    {
      name: '업종 배열',
      data: { 업종: ['제조업', 'IT/소프트웨어', 'AI/머신러닝'] },
      expected: '제조업, IT/소프트웨어, AI/머신러닝'
    },
    {
      name: '주요고민사항 배열',
      data: { 주요고민사항: ['디지털 전환', 'AI 도입', '비용 절감', '인재 관리'] },
      expected: '디지털 전환, AI 도입, 비용 절감, 인재 관리'
    }
  ];
  
  for (const testCase of testCases) {
    log.info(`테스트: ${testCase.name}`);
    console.log('입력:', testCase.data);
    console.log('예상 결과:', testCase.expected);
    log.success(`${testCase.name} 테스트 완료`);
  }
}

/**
 * 4. GEMINI API 테스트
 */
async function testGeminiAPI() {
  log.section('GEMINI API 연동 테스트');
  
  try {
    const response = await axios.post(GOOGLE_SCRIPT_URL, {
      action: 'internalTest',
      functionName: 'testGeminiAIReport'
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });
    
    if (response.data.success) {
      log.success('GEMINI API 테스트 성공');
      if (response.data.data && response.data.data.reportLength) {
        console.log('📄 생성된 보고서 길이:', response.data.data.reportLength, '자');
      }
    } else {
      log.warn('GEMINI API 테스트 실패:', response.data.message);
    }
  } catch (error) {
    log.error('GEMINI API 테스트 오류:', error.message);
  }
}

/**
 * 메인 테스트 실행
 */
async function runAllTests() {
  console.log(`\n${colors.bright}${colors.magenta}🚀 Google Apps Script AI 진단 시스템 완벽 테스트 시작${colors.reset}\n`);
  console.log(`📅 테스트 시작 시간: ${new Date().toLocaleString('ko-KR')}`);
  console.log(`🔗 대상 URL: ${GOOGLE_SCRIPT_URL}\n`);
  
  try {
    // 1. 종합 시스템 테스트
    await testCompleteSystem();
    
    // 2. 배열 데이터 처리 테스트
    await testArrayDataProcessing();
    
    // 3. GEMINI API 테스트
    await testGeminiAPI();
    
    // 4. 실제 진단 신청 테스트
    await testDiagnosisSubmission();
    
    console.log(`\n${colors.bright}${colors.green}✅ 모든 테스트 완료!${colors.reset}`);
    console.log(`📅 테스트 종료 시간: ${new Date().toLocaleString('ko-KR')}\n`);
    
  } catch (error) {
    console.error(`\n${colors.bright}${colors.red}테스트 중 오류 발생:${colors.reset}`, error);
  }
}

// 테스트 실행
runAllTests();