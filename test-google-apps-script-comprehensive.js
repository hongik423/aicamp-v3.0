/**
 * ================================================================================
 * AICAMP Google Apps Script 완전 테스트 시스템
 * ================================================================================
 * 
 * 🎯 테스트 목표:
 * 1. AI 챗봇 시스템 오류 진단과 답변시스템 점검
 * 2. 무료 AI 진단시스템 최고수준 경영진단보고서 테스트
 * 3. Google Apps Script 이메일 발송 시스템 완전 테스트
 * 4. 전체 시스템 무오류 검증
 * 
 * 📅 테스트 일시: 2025년 1월 28일
 * 🔗 Web App URL: https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 테스트 설정
const TEST_CONFIG = {
  GAS_WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
  TEST_TIMEOUT: 30000,
  MAX_RETRIES: 3,
  RESULTS_FILE: 'google-apps-script-test-results.json'
};

// 테스트 결과 저장
let testResults = {
  timestamp: new Date().toISOString(),
  testSuite: 'AICAMP Google Apps Script 완전 테스트',
  version: '2025.01.28_무오류_시스템',
  tests: [],
  summary: {
    total: 0,
    passed: 0,
    failed: 0,
    errors: []
  }
};

/**
 * 테스트 결과 기록
 */
function recordTest(testName, success, data, error = null) {
  const startTime = Date.now();
  const result = {
    testName,
    success,
    timestamp: new Date().toISOString(),
    data: data || {},
    error: error ? error.toString() : null,
    duration: 0 // 초기값으로 0 설정
  };
  
  testResults.tests.push(result);
  testResults.summary.total++;
  
  if (success) {
    testResults.summary.passed++;
    console.log(`✅ ${testName} - 성공`);
  } else {
    testResults.summary.failed++;
    testResults.summary.errors.push(`${testName}: ${error || '알 수 없는 오류'}`);
    console.log(`❌ ${testName} - 실패: ${error || '알 수 없는 오류'}`);
  }
  
  return result;
}

/**
 * HTTP 요청 공통 함수
 */
async function makeRequest(url, data, method = 'POST') {
  try {
    const config = {
      method,
      url,
      timeout: TEST_CONFIG.TEST_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    if (method === 'POST' && data) {
      config.data = data;
    }
    
    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    return { 
      success: false, 
      error: error.message, 
      status: error.response?.status,
      data: error.response?.data 
    };
  }
}

/**
 * 1. AI 진단 시스템 테스트 - 최고수준 경영진단보고서
 */
async function testAIDiagnosisSystem() {
  console.log('\n🚀 AI 진단 시스템 테스트 시작...');
  
  const testData = {
    // 기본 정보
    회사명: 'AICAMP 테스트 기업',
    업종: ['제조업', 'IT서비스'],
    사업담당자: '홍길동 이사',
    직원수: '50-100명',
    사업성장단계: '성장단계',
    주요고민사항: 'AI 도입 및 디지털 전환, 생산성 향상',
    예상혜택: 'AI 자동화를 통한 업무 효율성 30% 개선 기대',
    소재지: '서울특별시 강남구',
    담당자명: '홍길동',
    연락처: '010-1234-5678',
    이메일: 'test@aicamp.club',
    개인정보동의: true,
    
    // 진단 점수 (20개 문항)
    문항별점수: {
      기획수준: 4,
      차별화정도: 5,
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
      청결도: 5,
      작업동선: 4
    },
    
    // 종합 점수
    종합점수: 78,
    
    // 카테고리별 점수
    카테고리점수: {
      상품서비스점수: 84,
      고객응대점수: 75,
      마케팅점수: 70,
      구매재고점수: 70,
      매장관리점수: 85
    },
    
    // 6가지 핵심 지표
    businessModel: 80,
    marketPosition: 75,
    operationalEfficiency: 78,
    growthPotential: 82,
    digitalReadiness: 70,
    financialHealth: 76,
    
    // AI 시대 조직적응 분석 데이터
    AI활용현황: '부분적용',
    AI준비도점수: 65,
    디지털전환단계: '시범적용',
    AI도입장벽: ['경영진의 AI 이해 부족', '전문 인력 부족', 'AI 도입 비용 부담'],
    디지털인프라수준: '중급',
    AI인식수준: '보통',
    데이터활용능력: '초급',
    AI교육필요도: '높음',
    조직변화준비도: '보통',
    AI투자의지: '높음',
    
    // 업종별 특화 분석
    업종특화분석: '제조업 AI 자동화 및 IT서비스 융합 모델',
    시장위치: '중견기업 상위권',
    경쟁력분석: 'AI 기술 융합을 통한 차별화 가능',
    성장잠재력: '높음 - AI 전환 시 시장 선도 가능',
    
    // SWOT 분석
    강점: ['기술 전문성', 'IT 인프라 기반', '혁신 의지'],
    약점: ['AI 전문인력 부족', '데이터 관리 체계 미흡'],
    기회: ['AI 시장 확대', '정부 지원정책', '디지털 전환 수요 증가'],
    위협: ['경쟁사 AI 도입 가속화', '인력 확보 어려움', '기술 변화 속도'],
    
    // 추천 서비스
    추천서비스: ['AI 전환 컨설팅', '정부지원사업 연계', 'AI 교육 프로그램']
  };
  
  try {
    const result = await makeRequest(TEST_CONFIG.GAS_WEB_APP_URL, testData);
    
    if (result.success) {
      const responseData = typeof result.data === 'string' ? JSON.parse(result.data) : result.data;
      
      if (responseData.success) {
        recordTest('AI 진단 시스템', true, {
          status: result.status,
          message: responseData.message,
          sheet: responseData.sheet,
          row: responseData.row,
          진단점수: responseData.진단점수,
          업종: responseData.업종,
          AI준비도: responseData.AI준비도,
          디지털전환단계: responseData.디지털전환단계,
          보고서길이: responseData.보고서길이,
          시스템버전: responseData.시스템버전
        });
      } else {
        recordTest('AI 진단 시스템', false, result.data, responseData.error);
      }
    } else {
      recordTest('AI 진단 시스템', false, result.data, result.error);
    }
  } catch (error) {
    recordTest('AI 진단 시스템', false, {}, error);
  }
}

/**
 * 2. 상담 신청 시스템 테스트
 */
async function testConsultationSystem() {
  console.log('\n💬 상담 신청 시스템 테스트 시작...');
  
  const testData = {
    상담유형: 'AI 도입 컨설팅',
    성명: '김철수',
    회사명: 'AICAMP 테스트 상담기업',
    직책: '대표이사',
    연락처: '010-9876-5432',
    이메일: 'consultation@aicamp.club',
    업종: 'IT서비스',
    직원수: '10-30명',
    문의내용: 'AI 도입을 통한 업무 자동화 및 생산성 향상 방안에 대한 전문 컨설팅을 요청드립니다. 특히 고객 서비스 자동화와 데이터 분석 시스템 구축에 관심이 있습니다.',
    희망일정: '2025년 2월 첫째 주',
    예산범위: '1000만원-3000만원',
    개인정보동의: true,
    action: 'saveConsultation'
  };
  
  try {
    const result = await makeRequest(TEST_CONFIG.GAS_WEB_APP_URL, testData);
    
    if (result.success) {
      const responseData = typeof result.data === 'string' ? JSON.parse(result.data) : result.data;
      
      if (responseData.success) {
        recordTest('상담 신청 시스템', true, {
          status: result.status,
          message: responseData.message,
          sheet: responseData.sheet,
          row: responseData.row,
          timestamp: responseData.timestamp
        });
      } else {
        recordTest('상담 신청 시스템', false, result.data, responseData.error);
      }
    } else {
      recordTest('상담 신청 시스템', false, result.data, result.error);
    }
  } catch (error) {
    recordTest('상담 신청 시스템', false, {}, error);
  }
}

/**
 * 3. 베타 피드백 시스템 테스트
 */
async function testBetaFeedbackSystem() {
  console.log('\n🧪 베타 피드백 시스템 테스트 시작...');
  
  const testData = {
    action: 'saveBetaFeedback',
    폼타입: '베타테스트_피드백',
    피드백유형: '오류신고',
    계산기명: 'AI 진단 시스템',
    사용자이메일: 'beta@aicamp.club',
    사용자명: '베타테스터',
    오류내용: '테스트 오류 신고: 진단 결과 로딩 시 간헐적으로 응답이 지연되는 현상 발생',
    재현단계: '1. AI 진단 폼 작성 완료 2. 제출 버튼 클릭 3. 결과 페이지 로딩 시 5초 이상 지연',
    사용환경: 'Chrome 120.0, Windows 11',
    우선순위: '중간',
    첨부파일: '',
    개선제안: 'API 응답 시간 최적화 및 로딩 상태 표시 개선 필요',
    만족도: 4,
    추가의견: '전반적으로 시스템이 잘 작동하나 응답 속도 개선이 필요합니다.'
  };
  
  try {
    const result = await makeRequest(TEST_CONFIG.GAS_WEB_APP_URL, testData);
    
    if (result.success) {
      const responseData = typeof result.data === 'string' ? JSON.parse(result.data) : result.data;
      
      if (responseData.success) {
        recordTest('베타 피드백 시스템', true, {
          status: result.status,
          message: responseData.message,
          sheet: responseData.sheet,
          row: responseData.row,
          timestamp: responseData.timestamp
        });
      } else {
        recordTest('베타 피드백 시스템', false, result.data, responseData.error);
      }
    } else {
      recordTest('베타 피드백 시스템', false, result.data, result.error);
    }
  } catch (error) {
    recordTest('베타 피드백 시스템', false, {}, error);
  }
}

/**
 * 4. 챗봇 시스템 테스트 (API 엔드포인트)
 */
async function testChatbotSystem() {
  console.log('\n🤖 AI 챗봇 시스템 테스트 시작...');
  
  // Next.js API 엔드포인트 테스트
  const chatbotEndpoints = [
    'http://localhost:3000/api/chat',
    'http://localhost:3000/api/chat-ai',
    'http://localhost:3000/api/chat-lee-hukyung'
  ];
  
  const testMessage = {
    message: 'AICAMP AI 교육센터의 무료 AI 진단 서비스에 대해 설명해주세요.',
    context: 'ai-diagnosis-inquiry'
  };
  
  for (const endpoint of chatbotEndpoints) {
    try {
      const result = await makeRequest(endpoint, testMessage);
      
      if (result.success) {
        recordTest(`챗봇 시스템 - ${endpoint}`, true, {
          status: result.status,
          responseLength: JSON.stringify(result.data).length,
          hasResponse: !!result.data
        });
      } else {
        recordTest(`챗봇 시스템 - ${endpoint}`, false, result.data, result.error);
      }
    } catch (error) {
      recordTest(`챗봇 시스템 - ${endpoint}`, false, {}, error);
    }
  }
}

/**
 * 5. Google Apps Script 내부 테스트 함수 실행
 */
async function testInternalFunctions() {
  console.log('\n🔬 Google Apps Script 내부 함수 테스트 시작...');
  
  const internalTests = [
    'testDiagnosisSubmission',
    'testConsultationSubmission', 
    'testBetaFeedback'
  ];
  
  for (const testFunction of internalTests) {
    try {
      const testData = {
        action: 'internalTest',
        functionName: testFunction
      };
      
      const result = await makeRequest(TEST_CONFIG.GAS_WEB_APP_URL, testData);
      
      if (result.success) {
        const responseData = typeof result.data === 'string' ? JSON.parse(result.data) : result.data;
        
        if (responseData.success) {
          recordTest(`내부 함수 - ${testFunction}`, true, {
            status: result.status,
            message: responseData.message,
            version: responseData.version
          });
        } else {
          recordTest(`내부 함수 - ${testFunction}`, false, result.data, responseData.error);
        }
      } else {
        recordTest(`내부 함수 - ${testFunction}`, false, result.data, result.error);
      }
    } catch (error) {
      recordTest(`내부 함수 - ${testFunction}`, false, {}, error);
    }
  }
}

/**
 * 6. 시스템 연결성 테스트
 */
async function testSystemConnectivity() {
  console.log('\n🌐 시스템 연결성 테스트 시작...');
  
  try {
    // GET 요청 테스트
    const getResult = await makeRequest(TEST_CONFIG.GAS_WEB_APP_URL, null, 'GET');
    
    if (getResult.success) {
      recordTest('GET 요청 연결성', true, { status: getResult.status });
    } else {
      recordTest('GET 요청 연결성', false, getResult.data, getResult.error);
    }
    
    // OPTIONS 요청 테스트 (CORS)
    const optionsResult = await makeRequest(TEST_CONFIG.GAS_WEB_APP_URL, null, 'OPTIONS');
    
    if (optionsResult.success) {
      recordTest('OPTIONS 요청 (CORS)', true, { status: optionsResult.status });
    } else {
      recordTest('OPTIONS 요청 (CORS)', false, optionsResult.data, optionsResult.error);
    }
    
  } catch (error) {
    recordTest('시스템 연결성', false, {}, error);
  }
}

/**
 * 테스트 결과 저장
 */
function saveTestResults() {
  try {
    const resultsPath = path.join(__dirname, TEST_CONFIG.RESULTS_FILE);
    fs.writeFileSync(resultsPath, JSON.stringify(testResults, null, 2), 'utf8');
    console.log(`\n📊 테스트 결과가 저장되었습니다: ${resultsPath}`);
  } catch (error) {
    console.error('❌ 테스트 결과 저장 실패:', error);
  }
}

/**
 * 테스트 결과 요약 출력
 */
function printTestSummary() {
  console.log('\n' + '='.repeat(80));
  console.log('🎯 AICAMP Google Apps Script 완전 테스트 결과 요약');
  console.log('='.repeat(80));
  console.log(`📅 테스트 일시: ${testResults.timestamp}`);
  console.log(`📊 전체 테스트: ${testResults.summary.total}개`);
  console.log(`✅ 성공: ${testResults.summary.passed}개`);
  console.log(`❌ 실패: ${testResults.summary.failed}개`);
  console.log(`📈 성공률: ${((testResults.summary.passed / testResults.summary.total) * 100).toFixed(1)}%`);
  
  if (testResults.summary.errors.length > 0) {
    console.log('\n❌ 실패한 테스트:');
    testResults.summary.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`);
    });
  }
  
  console.log('\n✨ 테스트 완료!');
  console.log('='.repeat(80));
}

/**
 * 메인 테스트 실행 함수
 */
async function runComprehensiveTest() {
  console.log('🚀 AICAMP Google Apps Script 완전 테스트 시작');
  console.log('='.repeat(80));
  
  try {
    // 1. 시스템 연결성 테스트
    await testSystemConnectivity();
    
    // 2. AI 진단 시스템 테스트
    await testAIDiagnosisSystem();
    
    // 3. 상담 신청 시스템 테스트  
    await testConsultationSystem();
    
    // 4. 베타 피드백 시스템 테스트
    await testBetaFeedbackSystem();
    
    // 5. 챗봇 시스템 테스트
    await testChatbotSystem();
    
    // 6. 내부 함수 테스트
    await testInternalFunctions();
    
    // 결과 저장 및 요약
    saveTestResults();
    printTestSummary();
    
  } catch (error) {
    console.error('❌ 테스트 실행 중 치명적 오류:', error);
    recordTest('전체 테스트 실행', false, {}, error);
  }
}

// 테스트 실행
if (require.main === module) {
  runComprehensiveTest();
}

module.exports = {
  runComprehensiveTest,
  testAIDiagnosisSystem,
  testConsultationSystem,
  testBetaFeedbackSystem,
  testChatbotSystem,
  testInternalFunctions,
  testSystemConnectivity
}; 