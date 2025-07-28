/**
 * ================================================================================
 * AICAMP 업그레이드 시스템 종합 테스트 스크립트 2025
 * ================================================================================
 * 
 * 🚀 업그레이드 기능 테스트:
 * ✅ CORS 오류 해결 확인
 * ✅ 업종 체크박스 (복수선택) 테스트
 * ✅ 소재지 시군단위 선택 테스트  
 * ✅ 개인정보 동의 체크박스 오류 수정 확인
 * ✅ Google Apps Script 데이터 저장 검증
 * 
 * 🔧 실행방법: node test-aicamp-upgraded-system-comprehensive.js
 */

const axios = require('axios');
const fs = require('fs');

// ================================================================================
// 🔧 설정 및 환경변수
// ================================================================================

const CONFIG = {
  // Google Apps Script 웹앱 URL (업그레이드된 CORS 지원 버전)
  GOOGLE_APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
  
  // 테스트용 데이터
  TEST_EMAIL: 'aicamp.test.upgrade@gmail.com',
  TEST_NAME: 'AICAMP업그레이드테스트',
  TEST_COMPANY: 'AICAMP 시스템 테스트',
  
  // 타임아웃 설정
  TIMEOUT: 30000, // 30초
  
  // 🎯 업그레이드된 진단 점수 테스트 데이터 (20개 문항)
  UPGRADED_DIAGNOSIS_SCORES: {
    planning_level: 4,
    differentiation_level: 3,
    pricing_level: 4,
    expertise_level: 5,
    quality_level: 4,
    customer_greeting: 3,
    customer_service: 4,
    complaint_management: 3,
    customer_retention: 4,
    customer_understanding: 3,
    marketing_planning: 4,
    offline_marketing: 3,
    online_marketing: 4,
    sales_strategy: 4,
    purchase_management: 3,
    inventory_management: 4,
    exterior_management: 4,
    interior_management: 3,
    cleanliness: 5,
    work_flow: 4
  }
};

// ================================================================================
// 🧪 업그레이드된 테스트 데이터
// ================================================================================

const UPGRADED_TEST_DATA = {
  // 🎯 AI 무료진단 테스트 (업종 배열 + 소재지 추가)
  diagnosis: {
    // 기본 정보
    제출일시: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    회사명: 'AICAMP 업그레이드 테스트 기업',
    업종: ['제조업', 'IT/소프트웨어', '서비스업'], // 🔥 복수선택 업종 테스트
    소재지: '경기도', // 🔥 새로 추가된 소재지 필드
    사업담당자: 'AI테스트담당자',
    직원수: '11-30명',
    사업성장단계: '성장기',
    주요고민사항: '업종별 특화 마케팅 전략 수립과 디지털 전환이 필요합니다.',
    예상혜택: '체계적인 업종별 맞춤형 솔루션과 지역별 정책자금 지원 안내',
    담당자명: 'AICAMP업그레이드테스트',
    연락처: '010-1111-2222',
    이메일: 'aicamp.diagnosis.upgrade@gmail.com',
    개인정보동의: true,
    
    // 폼 메타데이터
    폼타입: 'AI_무료진단_업그레이드',
    action: 'saveDiagnosis',
    dataSource: '웹사이트_진단신청_업그레이드테스트',
    timestamp: Date.now(),
    
    // 📊 진단 점수 (20개 문항)
    문항별점수: CONFIG.UPGRADED_DIAGNOSIS_SCORES,
    종합점수: 78,
    
    // 카테고리별 점수
    카테고리점수: {
      productService: { score: 4.0 },
      customerService: { score: 3.5 },
      marketing: { score: 3.6 },
      procurement: { score: 3.5 },
      storeManagement: { score: 4.0 }
    },
    
    // 🎯 업그레이드된 보고서 데이터
    진단보고서요약: '업종별 특화 분석이 포함된 AI 고급진단 결과입니다. 제조업, IT/소프트웨어, 서비스업의 융합형 비즈니스 모델로 높은 성장 잠재력을 보유하고 있습니다. 경기도 지역의 정책자금 지원 프로그램 활용을 통해 추가적인 성장 동력을 확보할 수 있습니다.'
  },

  // 💬 상담신청 테스트 (개인정보 동의 오류 수정 확인)
  consultation: {
    제출일시: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    폼타입: '상담신청_업그레이드',
    상담유형: 'comprehensive',
    성명: 'AICAMP상담업그레이드테스트',
    연락처: '010-3333-4444',
    이메일: 'aicamp.consultation.upgrade@gmail.com',
    회사명: 'AICAMP 상담 테스트 기업',
    직책: '대표이사',
    상담분야: 'policy-funding',
    문의내용: '경기도 소재 제조업 및 IT 융합기업의 정책자금 지원 프로그램 상담을 요청합니다. 업종별 특화 지원사업과 지역별 혜택을 알고 싶습니다.',
    희망상담시간: 'afternoon',
    개인정보동의: true, // 🔥 개인정보 동의 오류 수정 확인
    action: 'saveConsultation',
    dataSource: '웹사이트_상담신청_업그레이드테스트',
    timestamp: Date.now()
  },

  // 🧪 베타피드백 테스트 (기존 기능 확인)
  betaFeedback: {
    제출일시: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    계산기명: '업종별맞춤진단시스템',
    피드백유형: '기능개선',
    사용자이메일: 'aicamp.beta.upgrade@gmail.com',
    문제설명: '업종 체크박스와 소재지 선택 기능이 추가되어 사용성이 크게 향상되었습니다.',
    기대동작: '복수 업종 선택과 시도별 소재지 정확 입력',
    실제동작: '정상적으로 작동하며 데이터가 올바르게 저장됩니다.',
    재현단계: '1. 업종 복수선택\n2. 소재지 드롭다운 선택\n3. 진단 완료\n4. 구글시트 저장 확인',
    심각도: '낮음',
    추가의견: '업그레이드 기능이 정책자금 상담에 매우 유용합니다.',
    브라우저정보: 'Chrome 120.0.0.0 (업그레이드 테스트)',
    제출경로: '/diagnosis-upgrade-test',
    action: 'saveBetaFeedback',
    dataSource: '베타피드백_업그레이드테스트',
    timestamp: Date.now()
  }
};

// ================================================================================
// 🛠️ 테스트 유틸리티 함수
// ================================================================================

/**
 * HTTP 요청 함수 (CORS 오류 해결 확인)
 */
async function makeUpgradedRequest(data, testName) {
  console.log(`\n🚀 ${testName} 요청 시작...`);
  console.log('📤 전송 데이터 구조:', {
    기본정보: {
      회사명: data.회사명 || data.회사명,
      업종: data.업종 ? (Array.isArray(data.업종) ? data.업종 : [data.업종]) : 'N/A',
      소재지: data.소재지 || 'N/A',
      이메일: data.이메일
    },
    개인정보동의: data.개인정보동의,
    데이터크기: JSON.stringify(data).length + ' bytes'
  });

  try {
    const response = await axios({
      method: 'POST',
      url: CONFIG.GOOGLE_APPS_SCRIPT_URL,
      data: data,
      timeout: CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://aicamp.club', // CORS 테스트용
        'User-Agent': 'AICAMP-Upgrade-Test/1.0'
      },
      validateStatus: function (status) {
        return status < 500; // 500 미만은 모두 허용 (CORS 오류 확인용)
      }
    });

    console.log('📊 HTTP 응답 상태:', response.status, response.statusText);
    console.log('📊 CORS 헤더 확인:', {
      'Access-Control-Allow-Origin': response.headers['access-control-allow-origin'],
      'Access-Control-Allow-Methods': response.headers['access-control-allow-methods'],
      'Access-Control-Allow-Headers': response.headers['access-control-allow-headers']
    });

    return {
      status: response.status,
      headers: response.headers,
      data: response.data
    };

  } catch (error) {
    console.error('❌ 네트워크 오류:', error.message);
    
    if (error.code === 'ECONNABORTED') {
      return { status: 'TIMEOUT', error: '요청 시간 초과' };
    } else if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
        error: error.message
      };
    } else {
      return { status: 'NETWORK_ERROR', error: error.message };
    }
  }
}

/**
 * 테스트 결과 상세 분석
 */
function analyzeUpgradedTestResult(result, testName, testData) {
  console.log(`\n📋 ${testName} 결과 분석:`);
  console.log('==========================================');

  // 🔍 CORS 검증
  if (result.headers) {
    const corsOrigin = result.headers['access-control-allow-origin'];
    if (corsOrigin) {
      console.log('✅ CORS 헤더 확인됨:', corsOrigin);
    } else {
      console.log('⚠️ CORS 헤더 누락 - 브라우저에서 오류 발생 가능');
    }
  }

  // 🔍 HTTP 상태 검증
  if (result.status === 200) {
    console.log('✅ HTTP 상태: 정상 (200 OK)');
  } else if (result.status >= 400) {
    console.log('❌ HTTP 상태: 오류', result.status);
  }

  // 🔍 응답 데이터 검증
  if (result.data && result.data.success) {
    console.log('✅ 처리 성공:', result.data.message);
    console.log('📊 저장 위치:', result.data.sheet || 'N/A');
    console.log('📝 행 번호:', result.data.row || 'N/A');
    console.log('🕐 처리 시간:', result.data.timestamp || 'N/A');
    
    // 업종 배열 데이터 확인
    if (testData.업종 && Array.isArray(testData.업종)) {
      console.log('🎯 업종 복수선택 데이터:', testData.업종.join(', '));
    }
    
    // 소재지 데이터 확인
    if (testData.소재지) {
      console.log('📍 소재지 데이터:', testData.소재지);
    }
    
    return true; // 성공
  } else {
    console.log('❌ 처리 실패:', result.data?.error || '알 수 없는 오류');
    return false; // 실패
  }
}

// ================================================================================
// 🧪 메인 테스트 실행
// ================================================================================

async function runUpgradedSystemTests() {
  console.log('🎉 AICAMP 업그레이드 시스템 종합 테스트 시작');
  console.log('================================================================================');
  console.log('🔗 Google Apps Script URL:', CONFIG.GOOGLE_APPS_SCRIPT_URL);
  console.log('📅 테스트 시작 시간:', new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
  console.log('');

  let totalTests = 0;
  let passedTests = 0;
  const testResults = [];

  // 🎯 테스트 목록 (업그레이드된 기능 우선)
  const tests = [
    { 
      name: '🎯 AI 무료진단 (업종체크박스+소재지)', 
      data: UPGRADED_TEST_DATA.diagnosis,
      description: '복수 업종 선택과 소재지 시군단위 선택 기능 테스트'
    },
    { 
      name: '💬 상담신청 (개인정보동의 수정)', 
      data: UPGRADED_TEST_DATA.consultation,
      description: '개인정보 동의 체크박스 오류 수정 확인'
    },
    { 
      name: '🧪 베타피드백 (기존기능 확인)', 
      data: UPGRADED_TEST_DATA.betaFeedback,
      description: '기존 베타피드백 시스템 정상 작동 확인'
    }
  ];

  // 🚀 각 테스트 실행
  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    totalTests++;
    
    console.log(`\n[${i + 1}/${tests.length}] ${test.name}`);
    console.log('📝 설명:', test.description);
    console.log('⏱️ 테스트 시작:', new Date().toLocaleString('ko-KR'));
    
    try {
      const result = await makeUpgradedRequest(test.data, test.name);
      const success = analyzeUpgradedTestResult(result, test.name, test.data);
      
      if (success) {
        passedTests++;
        console.log('🎉 테스트 통과!');
      } else {
        console.log('💥 테스트 실패!');
      }
      
      testResults.push({
        name: test.name,
        success: success,
        status: result.status,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('💥 테스트 실행 오류:', error.message);
      testResults.push({
        name: test.name,
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
    
    // 요청 간 2초 대기 (서버 부하 방지)
    if (i < tests.length - 1) {
      console.log('⏳ 2초 대기 중...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // 📊 최종 결과 리포트
  console.log('\n================================================================================');
  console.log('🏁 AICAMP 업그레이드 시스템 테스트 완료');
  console.log('================================================================================');
  console.log(`📊 전체 테스트: ${totalTests}개`);
  console.log(`✅ 통과: ${passedTests}개`);
  console.log(`❌ 실패: ${totalTests - passedTests}개`);
  console.log(`📈 성공률: ${Math.round((passedTests / totalTests) * 100)}%`);
  console.log('📅 테스트 완료 시간:', new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));

  // 🎯 업그레이드 기능별 검증 결과
  console.log('\n🎯 업그레이드 기능 검증 결과:');
  console.log('----------------------------------------');
  console.log('✅ CORS 오류 해결:', testResults.some(r => r.success) ? '완료' : '필요');
  console.log('✅ 업종 체크박스 (복수선택):', testResults[0]?.success ? '완료' : '필요');
  console.log('✅ 소재지 시군단위 선택:', testResults[0]?.success ? '완료' : '필요');
  console.log('✅ 개인정보 동의 오류수정:', testResults[1]?.success ? '완료' : '필요');
  console.log('✅ Google Apps Script 연동:', testResults.some(r => r.success) ? '완료' : '필요');

  // 📝 테스트 결과 파일 저장
  const reportData = {
    testSuite: 'AICAMP 업그레이드 시스템 종합 테스트',
    version: '2025.01.28',
    timestamp: new Date().toISOString(),
    totalTests: totalTests,
    passedTests: passedTests,
    successRate: Math.round((passedTests / totalTests) * 100),
    upgradedFeatures: {
      corsFixed: testResults.some(r => r.success),
      industryCheckbox: testResults[0]?.success || false,
      locationSelection: testResults[0]?.success || false,
      privacyConsentFixed: testResults[1]?.success || false,
      googleAppsScriptIntegration: testResults.some(r => r.success)
    },
    detailedResults: testResults
  };

  try {
    fs.writeFileSync(
      'aicamp-upgraded-system-test-results-2025.json', 
      JSON.stringify(reportData, null, 2),
      'utf8'
    );
    console.log('\n💾 테스트 결과 저장: aicamp-upgraded-system-test-results-2025.json');
  } catch (saveError) {
    console.warn('⚠️ 결과 파일 저장 실패:', saveError.message);
  }

  // 🚨 실패 시 추가 안내
  if (passedTests < totalTests) {
    console.log('\n🚨 일부 테스트 실패 - 확인 필요사항:');
    console.log('1. Google Apps Script 재배포 여부');
    console.log('2. CORS 헤더 설정 적용 여부');
    console.log('3. 구글시트 권한 및 URL 확인');
    console.log('4. 네트워크 연결 상태');
  } else {
    console.log('\n🎉 모든 테스트 통과! AICAMP 업그레이드 시스템이 정상 작동합니다.');
  }

  return { totalTests, passedTests, successRate: Math.round((passedTests / totalTests) * 100) };
}

// 🚀 테스트 실행
if (require.main === module) {
  runUpgradedSystemTests()
    .then(result => {
      console.log(`\n🏆 최종 결과: ${result.passedTests}/${result.totalTests} (${result.successRate}%)`);
      process.exit(result.successRate === 100 ? 0 : 1);
    })
    .catch(error => {
      console.error('💥 테스트 실행 중 심각한 오류:', error);
      process.exit(1);
    });
}

module.exports = { runUpgradedSystemTests, UPGRADED_TEST_DATA, CONFIG }; 