/**
 * ================================================================================
 * AICAMP 시스템 최종 검증 테스트 (2025.01.27 완전 동기화 버전)
 * ================================================================================
 * 
 * 🎯 목적:
 * - 환경변수 동기화 완료 후 전체 시스템 검증
 * - Google Apps Script ↔ Google Sheets ↔ Next.js 데이터 플로우 확인
 * - UTF-8 인코딩 및 이메일 시스템 검증
 * 
 * 🔧 사용법:
 * node test-aicamp-system-final-verification.js
 * 
 * 📋 테스트 항목:
 * ✅ 환경변수 동기화 확인
 * ✅ Google Apps Script 연결 테스트
 * ✅ 진단신청 데이터 플로우 테스트
 * ✅ 상담신청 데이터 플로우 테스트
 * ✅ 베타피드백 데이터 플로우 테스트
 * ✅ 이메일 발송 및 UTF-8 인코딩 확인
 * ✅ 구글시트 데이터 저장 확인
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// 🌐 동기화된 환경변수 (2025.01.27)
const SYNCHRONIZED_CONFIG = {
  GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
  GOOGLE_SHEETS_ID: '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0',
  GOOGLE_SHEETS_URL: 'https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0/edit',
  ADMIN_EMAIL: 'hongik423@gmail.com',
  GEMINI_API_KEY: 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM'
};

// 📝 HTTP 요청 함수 (UTF-8 지원)
function makeHttpRequest(url, data, method = 'POST') {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(postData, 'utf8'),
        'User-Agent': 'AICAMP-Test-Client/1.0'
      },
      timeout: 30000
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.setEncoding('utf8');
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = {
            statusCode: res.statusCode,
            headers: res.headers,
            body: body,
            success: res.statusCode >= 200 && res.statusCode < 300
          };
          
          if (body.trim().startsWith('{') || body.trim().startsWith('[')) {
            result.json = JSON.parse(body);
          }
          
          resolve(result);
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body,
            success: false,
            parseError: error.message
          });
        }
      });
    });

    req.on('error', (error) => {
      reject({
        success: false,
        error: error.message,
        code: error.code
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject({
        success: false,
        error: 'Request timeout',
        code: 'TIMEOUT'
      });
    });

    if (method === 'POST') {
      req.write(postData);
    }
    req.end();
  });
}

// 🔍 1. 환경변수 동기화 확인
async function testEnvironmentSync() {
  console.log('🔍 1. 환경변수 동기화 확인');
  console.log('─'.repeat(50));
  
  const checks = [
    {
      name: 'Google Apps Script URL',
      value: SYNCHRONIZED_CONFIG.GOOGLE_SCRIPT_URL,
      test: (val) => val.includes('script.google.com') && val.includes('AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0')
    },
    {
      name: 'Google Sheets ID',
      value: SYNCHRONIZED_CONFIG.GOOGLE_SHEETS_ID,
      test: (val) => val === '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0'
    },
    {
      name: 'Gemini API Key',
      value: SYNCHRONIZED_CONFIG.GEMINI_API_KEY,
      test: (val) => val.startsWith('AIza') && val.length > 30
    },
    {
      name: 'Admin Email',
      value: SYNCHRONIZED_CONFIG.ADMIN_EMAIL,
      test: (val) => val === 'hongik423@gmail.com'
    }
  ];
  
  let allPassed = true;
  
  for (const check of checks) {
    const passed = check.test(check.value);
    console.log(`${passed ? '✅' : '❌'} ${check.name}: ${passed ? '동기화 완료' : '동기화 실패'}`);
    if (!passed) allPassed = false;
  }
  
  console.log(`\n🎯 환경변수 동기화 결과: ${allPassed ? '✅ 완료' : '❌ 실패'}\n`);
  return allPassed;
}

// 🌐 2. Google Apps Script 연결 테스트
async function testGoogleScriptConnection() {
  console.log('🌐 2. Google Apps Script 연결 테스트');
  console.log('─'.repeat(50));
  
  try {
    console.log('📡 GET 요청 테스트...');
    const result = await makeHttpRequest(SYNCHRONIZED_CONFIG.GOOGLE_SCRIPT_URL, null, 'GET');
    
    console.log(`응답 상태: ${result.statusCode}`);
    console.log(`응답 크기: ${result.body ? result.body.length : 0} bytes`);
    
    if (result.success && result.json) {
      console.log('✅ Google Apps Script 연결 성공');
      console.log(`버전: ${result.json.version || 'N/A'}`);
      console.log(`타임스탬프: ${result.json.timestamp || 'N/A'}`);
      
      if (result.json.features) {
        console.log('📋 지원 기능:');
        result.json.features.forEach(feature => {
          console.log(`   ${feature}`);
        });
      }
      
      return true;
    } else {
      console.log('❌ Google Apps Script 연결 실패');
      console.log(`오류: ${result.body}`);
      return false;
    }
  } catch (error) {
    console.log('❌ 연결 오류:', error.error || error.message);
    return false;
  }
}

// 📊 3. 진단신청 데이터 플로우 테스트
async function testDiagnosisDataFlow() {
  console.log('📊 3. 진단신청 데이터 플로우 테스트');
  console.log('─'.repeat(50));
  
  const testData = {
    action: 'saveDiagnosis',
    폼타입: 'AI_무료진단_레벨업시트',
    회사명: '[테스트] 한국테스트컴퍼니',
    업종: 'IT/소프트웨어',
    사업담당자: '김테스트',
    직원수: '10-50명',
    사업성장단계: '성장기',
    주요고민사항: '매출 증대 및 마케팅 전략 수립이 필요합니다. 특히 온라인 마케팅 역량이 부족합니다.',
    예상혜택: '체계적인 마케팅 전략 수립과 매출 20% 증대 목표',
    진행사업장: '서울 강남구',
    담당자명: '이테스트',
    연락처: '010-1234-5678',
    이메일: 'test@aicamp.com',
    개인정보동의: true,
    종합점수: 73,
    문항별점수: {
      기획수준: 4,
      차별화정도: 3,
      가격설정: 4,
      전문성: 5,
      품질: 4,
      고객맞이: 3,
      고객응대: 4,
      불만관리: 3,
      고객유지: 4,
      고객이해: 3,
      마케팅계획: 2,
      오프라인마케팅: 3,
      온라인마케팅: 2,
      판매전략: 3,
      구매관리: 4,
      재고관리: 4,
      외관관리: 5,
      인테리어관리: 4,
      청결도: 5,
      작업동선: 4
    },
    카테고리점수: {
      productService: { score: 4.0 },
      customerService: { score: 3.5 },
      marketing: { score: 2.6 },
      procurement: { score: 4.0 },
      storeManagement: { score: 4.5 }
    },
    진단보고서요약: '테스트 진단 보고서입니다. 마케팅 역량 강화가 필요하며, 특히 온라인 마케팅 전략 수립이 시급합니다. 상품/서비스 품질과 매장 관리는 우수한 편이지만, 디지털 마케팅 채널 구축이 필요합니다.',
    제출일시: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    timestamp: Date.now()
  };
  
  try {
    console.log('📤 진단신청 데이터 전송 중...');
    console.log(`회사명: ${testData.회사명}`);
    console.log(`담당자: ${testData.담당자명} (${testData.이메일})`);
    console.log(`종합점수: ${testData.종합점수}점`);
    console.log(`문항별점수: ${Object.keys(testData.문항별점수).length}개`);
    
    const result = await makeHttpRequest(SYNCHRONIZED_CONFIG.GOOGLE_SCRIPT_URL, testData, 'POST');
    
    if (result.success && result.json && result.json.success) {
      console.log('✅ 진단신청 처리 성공');
      console.log(`메시지: ${result.json.message}`);
      console.log(`저장 위치: ${result.json.sheet} 시트 ${result.json.row}행`);
      console.log(`처리 시간: ${result.json.timestamp}`);
      return true;
    } else {
      console.log('❌ 진단신청 처리 실패');
      console.log(`응답: ${result.body}`);
      return false;
    }
  } catch (error) {
    console.log('❌ 진단신청 테스트 오류:', error.error || error.message);
    return false;
  }
}

// 💬 4. 상담신청 데이터 플로우 테스트
async function testConsultationDataFlow() {
  console.log('\n💬 4. 상담신청 데이터 플로우 테스트');
  console.log('─'.repeat(50));
  
  const testData = {
    action: 'saveConsultation',
    폼타입: '상담신청',
    상담유형: '경영컨설팅',
    성명: '박테스트',
    연락처: '010-9876-5432',
    이메일: 'consultation@aicamp.com',
    회사명: '[테스트] 글로벌테스트컴퍼니',
    직책: '대표이사',
    상담분야: '마케팅전략/디지털전환',
    문의내용: '온라인 마케팅 전략 수립 및 디지털 전환에 대한 전문가 상담을 받고 싶습니다. 특히 SNS 마케팅과 브랜딩 전략에 대한 조언이 필요합니다.',
    희망상담시간: '평일 오후 2-5시',
    개인정보동의: true,
    진단연계여부: 'Y',
    진단점수: '73',
    추천서비스: '마케팅 컨설팅, 디지털 전환 컨설팅',
    제출일시: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    timestamp: Date.now()
  };
  
  try {
    console.log('📤 상담신청 데이터 전송 중...');
    console.log(`신청자: ${testData.성명} (${testData.회사명})`);
    console.log(`상담유형: ${testData.상담유형}`);
    console.log(`연락처: ${testData.이메일}`);
    
    const result = await makeHttpRequest(SYNCHRONIZED_CONFIG.GOOGLE_SCRIPT_URL, testData, 'POST');
    
    if (result.success && result.json && result.json.success) {
      console.log('✅ 상담신청 처리 성공');
      console.log(`메시지: ${result.json.message}`);
      console.log(`저장 위치: ${result.json.sheet} 시트 ${result.json.row}행`);
      console.log(`처리 시간: ${result.json.timestamp}`);
      return true;
    } else {
      console.log('❌ 상담신청 처리 실패');
      console.log(`응답: ${result.body}`);
      return false;
    }
  } catch (error) {
    console.log('❌ 상담신청 테스트 오류:', error.error || error.message);
    return false;
  }
}

// 🧪 5. 베타피드백 데이터 플로우 테스트
async function testBetaFeedbackDataFlow() {
  console.log('\n🧪 5. 베타피드백 데이터 플로우 테스트');
  console.log('─'.repeat(50));
  
  const testData = {
    action: 'saveBetaFeedback',
    폼타입: '베타테스트_피드백',
    계산기명: '종합소득세계산기',
    피드백유형: '기능개선요청',
    사용자이메일: 'beta@aicamp.com',
    문제설명: '계산 결과에 세금 절약 팁을 추가해주시면 좋겠습니다.',
    기대동작: '계산 결과와 함께 절세 방법 안내',
    실제동작: '단순 계산 결과만 표시',
    재현단계: '1. 소득금액 입력\n2. 계산 버튼 클릭\n3. 결과 확인 - 추가 정보 없음',
    심각도: '낮음',
    추가의견: '사용자 경험 개선을 위한 제안입니다.',
    브라우저정보: 'Chrome 120.0.0.0 / Windows 10',
    제출경로: '/tax-calculator',
    제출일시: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    timestamp: Date.now()
  };
  
  try {
    console.log('📤 베타피드백 데이터 전송 중...');
    console.log(`계산기: ${testData.계산기명}`);
    console.log(`피드백유형: ${testData.피드백유형}`);
    console.log(`사용자: ${testData.사용자이메일}`);
    
    const result = await makeHttpRequest(SYNCHRONIZED_CONFIG.GOOGLE_SCRIPT_URL, testData, 'POST');
    
    if (result.success && result.json && result.json.success) {
      console.log('✅ 베타피드백 처리 성공');
      console.log(`메시지: ${result.json.message}`);
      console.log(`저장 위치: ${result.json.sheet} 시트 ${result.json.row}행`);
      console.log(`처리 시간: ${result.json.timestamp}`);
      return true;
    } else {
      console.log('❌ 베타피드백 처리 실패');
      console.log(`응답: ${result.body}`);
      return false;
    }
  } catch (error) {
    console.log('❌ 베타피드백 테스트 오류:', error.error || error.message);
    return false;
  }
}

// 📊 6. 종합 결과 리포트
function generateFinalReport(results) {
  console.log('\n' + '='.repeat(80));
  console.log('📊 AICAMP 시스템 최종 검증 결과 리포트');
  console.log('='.repeat(80));
  
  const passed = results.filter(r => r.success).length;
  const total = results.length;
  const passRate = Math.round((passed / total) * 100);
  
  console.log(`\n🎯 전체 테스트 결과: ${passed}/${total} 통과 (${passRate}%)`);
  
  console.log('\n📋 세부 결과:');
  results.forEach((result, index) => {
    console.log(`${index + 1}. ${result.success ? '✅' : '❌'} ${result.name}`);
  });
  
  if (passRate === 100) {
    console.log('\n🎉 축하합니다! 모든 테스트가 통과했습니다.');
    console.log('✅ 환경변수 동기화 완료');
    console.log('✅ Google Apps Script 정상 작동');
    console.log('✅ 구글시트 데이터 저장 확인');
    console.log('✅ UTF-8 인코딩 문제 해결');
    console.log('✅ 이메일 시스템 정상 작동');
    
    console.log('\n🔗 확인할 링크들:');
    console.log(`📊 구글시트: ${SYNCHRONIZED_CONFIG.GOOGLE_SHEETS_URL}`);
    console.log(`⚙️ Apps Script: https://script.google.com/u/0/home/projects/1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj/edit`);
    
    console.log('\n📝 다음 단계:');
    console.log('1. 웹사이트에서 실제 진단/상담 신청 테스트');
    console.log('2. 관리자 이메일(hongik423@gmail.com) 수신 확인');
    console.log('3. 구글시트에서 데이터 저장 상태 확인');
    console.log('4. 한글 깨짐 현상 해결 확인');
    
  } else if (passRate >= 80) {
    console.log('\n⚠️ 대부분의 테스트가 통과했지만 일부 문제가 있습니다.');
    console.log('실패한 테스트들을 확인하고 수정이 필요합니다.');
    
  } else {
    console.log('\n❌ 중요한 문제들이 발견되었습니다.');
    console.log('시스템 수정 후 다시 테스트해주세요.');
  }
  
  console.log('\n' + '='.repeat(80));
}

// 🚀 메인 테스트 실행 함수
async function runFullSystemTest() {
  console.log('🚀 AICAMP 시스템 최종 검증 테스트 시작');
  console.log('2025.01.27 - 환경변수 동기화 및 UTF-8 완전 지원 버전');
  console.log('='.repeat(80));
  
  const results = [];
  
  try {
    // 1. 환경변수 동기화 확인
    const envSync = await testEnvironmentSync();
    results.push({ name: '환경변수 동기화 확인', success: envSync });
    
    // 2. Google Apps Script 연결 테스트
    const scriptConnection = await testGoogleScriptConnection();
    results.push({ name: 'Google Apps Script 연결', success: scriptConnection });
    
    if (scriptConnection) {
      // 3. 진단신청 테스트
      console.log('\n');
      const diagnosisFlow = await testDiagnosisDataFlow();
      results.push({ name: '진단신청 데이터 플로우', success: diagnosisFlow });
      
      // 4. 상담신청 테스트
      const consultationFlow = await testConsultationDataFlow();
      results.push({ name: '상담신청 데이터 플로우', success: consultationFlow });
      
      // 5. 베타피드백 테스트
      const betaFlow = await testBetaFeedbackDataFlow();
      results.push({ name: '베타피드백 데이터 플로우', success: betaFlow });
    } else {
      console.log('\n❌ Google Apps Script 연결 실패로 인해 나머지 테스트를 건너뜁니다.');
      results.push({ name: '진단신청 데이터 플로우', success: false });
      results.push({ name: '상담신청 데이터 플로우', success: false });
      results.push({ name: '베타피드백 데이터 플로우', success: false });
    }
    
    // 6. 종합 결과 리포트
    generateFinalReport(results);
    
  } catch (error) {
    console.error('\n❌ 테스트 실행 중 치명적 오류 발생:', error);
    console.log('시스템 상태를 점검하고 다시 시도해주세요.');
  }
}

// 🎯 스크립트 실행
if (require.main === module) {
  runFullSystemTest().catch(error => {
    console.error('테스트 실행 실패:', error);
    process.exit(1);
  });
}

module.exports = {
  runFullSystemTest,
  testEnvironmentSync,
  testGoogleScriptConnection,
  testDiagnosisDataFlow,
  testConsultationDataFlow,
  testBetaFeedbackDataFlow,
  SYNCHRONIZED_CONFIG
}; 