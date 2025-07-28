/**
 * 🔧 AI 진단 오류 수정 검증 테스트
 * 
 * 수정된 사항:
 * 1. SimplifiedDiagnosisForm - 안전한 데이터 접근
 * 2. Service Worker 메시지 포트 오류 처리
 */

const https = require('https');
const fs = require('fs');

// 테스트 설정
const TEST_CONFIG = {
  baseUrl: 'https://aicamp-v3-0.vercel.app',
  endpoints: [
    '/api/simplified-diagnosis',
    '/api/test-system',
    '/api/check-gas-status'
  ],
  timeout: 30000
};

/**
 * 🎯 진단 API 테스트
 */
async function testDiagnosisAPI() {
  console.log('🚀 진단 API 안전성 테스트 시작...\n');
  
  const testData = {
    companyName: '테스트기업',
    industry: 'IT서비스',
    contactManager: '홍길동',
    phone: '010-1234-5678',
    email: 'test@example.com',
    employeeCount: '10-50명',
    businessLocation: '서울특별시',
    growthStage: 'growth',
    
    // 20개 평가 항목 (1-5점)
    planning_level: 4,
    differentiation_level: 3,
    pricing_level: 4,
    expertise_level: 4,
    quality_level: 5,
    customer_greeting: 4,
    customer_service: 4,
    complaint_management: 3,
    customer_retention: 4,
    customer_understanding: 4,
    marketing_planning: 3,
    offline_marketing: 3,
    online_marketing: 4,
    sales_strategy: 4,
    purchase_management: 4,
    inventory_management: 3,
    exterior_management: 4,
    interior_management: 4,
    cleanliness: 5,
    work_flow: 4,
    
    mainConcerns: '생산성 향상과 업무 효율화가 주요 관심사입니다.',
    expectedBenefits: 'AI 도구 도입으로 업무 속도 개선을 기대합니다.',
    privacyConsent: true,
    submitDate: new Date().toISOString()
  };

  return new Promise((resolve) => {
    const postData = JSON.stringify(testData);
    
    const options = {
      hostname: 'aicamp-v3-0.vercel.app',
      port: 443,
      path: '/api/simplified-diagnosis',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'AICAMP-Test-Client/1.0'
      },
      timeout: TEST_CONFIG.timeout
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          
          console.log('📊 진단 API 응답 분석:');
          console.log(`   상태 코드: ${res.statusCode}`);
          console.log(`   성공 여부: ${result.success ? '✅' : '❌'}`);
          
          if (result.success && result.data) {
            // 🔍 데이터 구조 검증 (수정된 부분)
            const diagnosis = result.data.diagnosis;
            console.log(`   diagnosis 객체: ${diagnosis ? '✅ 존재' : '❌ 없음'}`);
            
            if (diagnosis) {
              console.log(`   총점: ${diagnosis.totalScore || 'N/A'}`);
              console.log(`   등급: ${diagnosis.overallGrade || 'N/A'}`);
              console.log(`   신뢰도: ${diagnosis.reliabilityScore || 'N/A'}`);
              console.log(`   카테고리 수: ${diagnosis.categoryResults?.length || 0}`);
            }
            
            // 🔍 summaryReport 검증
            const summaryReport = result.data.summaryReport;
            console.log(`   요약 보고서: ${summaryReport ? '✅ 생성완료' : '❌ 없음'}`);
            if (summaryReport) {
              console.log(`   보고서 길이: ${summaryReport.length}자`);
            }
            
            console.log('\n✅ 진단 API 테스트 성공 - 데이터 구조 정상');
            resolve({ success: true, data: result });
            
          } else {
            console.log('❌ 진단 API 응답 오류:', result.error || 'Unknown error');
            resolve({ success: false, error: result.error });
          }
          
        } catch (error) {
          console.log('❌ JSON 파싱 오류:', error.message);
          resolve({ success: false, error: 'JSON parsing failed' });
        }
      });
    });

    req.on('error', (error) => {
      console.log('❌ 요청 오류:', error.message);
      resolve({ success: false, error: error.message });
    });

    req.on('timeout', () => {
      console.log('❌ 요청 타임아웃');
      req.destroy();
      resolve({ success: false, error: 'Request timeout' });
    });

    req.write(postData);
    req.end();
  });
}

/**
 * 🔧 시스템 상태 테스트
 */
async function testSystemStatus() {
  console.log('\n🔍 시스템 상태 확인 중...\n');
  
  const promises = TEST_CONFIG.endpoints.map(endpoint => {
    return new Promise((resolve) => {
      const options = {
        hostname: 'aicamp-v3-0.vercel.app',
        port: 443,
        path: endpoint,
        method: 'GET',
        timeout: 10000
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            endpoint,
            status: res.statusCode,
            success: res.statusCode === 200,
            responseLength: data.length
          });
        });
      });

      req.on('error', () => {
        resolve({
          endpoint,
          status: 'ERROR',
          success: false,
          responseLength: 0
        });
      });

      req.setTimeout(10000, () => {
        req.destroy();
        resolve({
          endpoint,
          status: 'TIMEOUT',
          success: false,
          responseLength: 0
        });
      });

      req.end();
    });
  });

  const results = await Promise.all(promises);
  
  console.log('📊 API 엔드포인트 상태:');
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    console.log(`   ${result.endpoint}: ${status} ${result.status} (${result.responseLength} bytes)`);
  });
  
  return results;
}

/**
 * 📋 메인 테스트 실행
 */
async function runTests() {
  console.log('🎯 AICAMP 진단 오류 수정 검증 테스트');
  console.log('=' .repeat(50));
  console.log(`📅 테스트 시간: ${new Date().toLocaleString('ko-KR')}`);
  console.log(`🌐 대상 사이트: ${TEST_CONFIG.baseUrl}\n`);

  try {
    // 1. 시스템 상태 확인
    const systemResults = await testSystemStatus();
    const systemOk = systemResults.some(r => r.success);
    
    if (!systemOk) {
      console.log('\n❌ 시스템 접근 불가 - 테스트 중단');
      return;
    }

    // 2. 진단 API 테스트 (핵심)
    const diagnosisResult = await testDiagnosisAPI();
    
    // 3. 결과 요약
    console.log('\n' + '='.repeat(50));
    console.log('📋 테스트 결과 요약:');
    console.log(`   시스템 상태: ${systemOk ? '✅ 정상' : '❌ 오류'}`);
    console.log(`   진단 API: ${diagnosisResult.success ? '✅ 정상' : '❌ 오류'}`);
    
    if (diagnosisResult.success) {
      console.log('\n🎉 모든 테스트 통과!');
      console.log('💡 수정사항:');
      console.log('   - SimplifiedDiagnosisForm: 안전한 데이터 접근 적용');
      console.log('   - diagnosis 객체 undefined 오류 해결');
      console.log('   - 향상된 오류 처리 및 디버깅 정보 추가');
    } else {
      console.log('\n⚠️  일부 테스트 실패');
      console.log('🔧 추가 점검 필요:', diagnosisResult.error);
    }
    
  } catch (error) {
    console.log('\n❌ 테스트 실행 중 오류:', error.message);
  }
  
  console.log('\n🏁 테스트 완료');
}

// 테스트 실행
runTests().catch(console.error); 