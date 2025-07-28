/**
 * 🌐 실제 웹사이트에서 AI 무료진단 시스템 테스트
 * 
 * 테스트 대상:
 * 1. 진단 페이지 로드
 * 2. 폼 데이터 입력
 * 3. 진단 실행
 * 4. 결과 표시
 * 5. 이메일 발송 기능
 * 
 * 목표: 실제 사용자 경험 검증
 */

const https = require('https');

// 테스트 설정
const TEST_CONFIG = {
  baseUrl: 'https://aicamp-v3-0.vercel.app',
  diagnosisPage: '/services/diagnosis',
  timeout: 60000
};

/**
 * 1. 진단 페이지 접근성 테스트
 */
async function testDiagnosisPageAccess() {
  console.log('🌐 [1단계] 진단 페이지 접근성 테스트...\n');

  return new Promise((resolve) => {
    const options = {
      hostname: 'aicamp-v3-0.vercel.app',
      port: 443,
      path: '/services/diagnosis',
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      timeout: 15000
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`페이지 로드 상태: ${res.statusCode}`);
        console.log(`응답 크기: ${data.length} bytes`);
        
        // 중요한 요소들 확인
        const checks = {
          hasNextData: data.includes('__NEXT_DATA__'),
          hasTitle: data.includes('AI 무료진단') || data.includes('진단'),
          hasForm: data.includes('form') || data.includes('input'),
          hasReact: data.includes('react') || data.includes('_app'),
          hasCSS: data.includes('css') || data.includes('style'),
          hasScript: data.includes('script'),
          hasDiagnosisKeyword: data.includes('진단') || data.includes('diagnosis'),
          hasCompanyField: data.includes('회사명') || data.includes('company'),
          hasSubmitButton: data.includes('제출') || data.includes('submit') || data.includes('시작')
        };

        console.log('\n페이지 구성 요소 확인:');
        Object.entries(checks).forEach(([key, value]) => {
          console.log(`   ${key}: ${value ? '✅' : '❌'}`);
        });

        // 페이지 콘텐츠 일부 출력 (디버깅용)
        if (data.length > 0) {
          console.log('\n페이지 내용 샘플 (처음 500자):');
          console.log(data.substring(0, 500).replace(/\s+/g, ' '));
        }

        resolve({
          success: res.statusCode === 200,
          statusCode: res.statusCode,
          contentLength: data.length,
          checks: checks,
          hasEssentialElements: checks.hasNextData && checks.hasForm && checks.hasDiagnosisKeyword
        });
      });
    });

    req.on('error', (error) => {
      console.log(`❌ 페이지 로드 실패: ${error.message}`);
      resolve({ success: false, error: error.message });
    });

    req.on('timeout', () => {
      console.log('❌ 페이지 로드 타임아웃');
      req.destroy();
      resolve({ success: false, error: 'Page load timeout' });
    });

    req.end();
  });
}

/**
 * 2. API 호출 시뮬레이션 테스트
 */
async function testDiagnosisAPISimulation() {
  console.log('\n🎯 [2단계] 진단 API 호출 시뮬레이션...\n');

  const testData = {
    // 기본 정보
    companyName: 'WEB_TEST_COMPANY',
    industry: 'IT서비스',
    contactManager: '웹테스트담당자',
    phone: '010-8888-9999',
    email: 'webtest@aicamp.co.kr',
    employeeCount: '10-50명',
    businessLocation: '서울특별시',
    growthStage: 'growth',
    
    // 20개 평가 항목
    planning_level: 4,
    differentiation_level: 4,
    pricing_level: 3,
    expertise_level: 4,
    quality_level: 5,
    customer_greeting: 4,
    customer_service: 4,
    complaint_management: 3,
    customer_retention: 4,
    customer_understanding: 4,
    marketing_planning: 4,
    offline_marketing: 3,
    online_marketing: 4,
    sales_strategy: 4,
    purchase_management: 4,
    inventory_management: 3,
    exterior_management: 4,
    interior_management: 4,
    cleanliness: 5,
    work_flow: 4,
    
    // 추가 정보
    mainConcerns: '웹사이트에서 직접 테스트하는 AI 진단 시스템의 완전한 동작을 확인하기 위한 테스트입니다.',
    expectedBenefits: '실제 사용자가 겪을 수 있는 모든 상황을 시뮬레이션하여 시스템의 안정성을 검증합니다.',
    privacyConsent: true,
    submitDate: new Date().toISOString()
  };

  const postData = JSON.stringify(testData);
  
  return new Promise((resolve) => {
    const options = {
      hostname: 'aicamp-v3-0.vercel.app',
      port: 443,
      path: '/api/simplified-diagnosis',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Origin': 'https://aicamp-v3-0.vercel.app',
        'Referer': 'https://aicamp-v3-0.vercel.app/services/diagnosis',
        'X-Requested-With': 'XMLHttpRequest'
      },
      timeout: 60000
    };

    console.log('API 요청 전송 중...');
    console.log(`데이터 크기: ${postData.length} bytes`);

    const startTime = Date.now();

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', chunk => {
        responseData += chunk;
      });

      res.on('end', () => {
        const processingTime = Date.now() - startTime;
        
        console.log(`\nAPI 응답 수신:`);
        console.log(`   상태 코드: ${res.statusCode}`);
        console.log(`   처리 시간: ${processingTime}ms`);
        console.log(`   응답 크기: ${responseData.length} bytes`);

        try {
          const jsonResponse = JSON.parse(responseData);
          console.log(`   JSON 파싱: ✅ 성공`);
          console.log(`   성공 여부: ${jsonResponse.success ? '✅' : '❌'}`);
          
          if (jsonResponse.success && jsonResponse.data) {
            const diagnosis = jsonResponse.data.diagnosis;
            console.log(`\n진단 결과 확인:`);
            console.log(`   회사명: ${diagnosis?.companyName || 'N/A'}`);
            console.log(`   총점: ${diagnosis?.totalScore || 'N/A'}점`);
            console.log(`   등급: ${diagnosis?.overallGrade || 'N/A'}`);
            console.log(`   신뢰도: ${diagnosis?.reliabilityScore || 'N/A'}%`);
            console.log(`   보고서: ${jsonResponse.data.summaryReport ? '✅ 생성됨' : '❌ 없음'}`);
            
            if (jsonResponse.data.summaryReport) {
              console.log(`   보고서 길이: ${jsonResponse.data.summaryReport.length}자`);
            }
          }

          resolve({
            success: true,
            statusCode: res.statusCode,
            processingTime: processingTime,
            data: jsonResponse,
            isValidResponse: !!(jsonResponse.success && jsonResponse.data)
          });

        } catch (parseError) {
          console.log(`   JSON 파싱: ❌ 실패`);
          console.log(`   원본 응답: ${responseData.substring(0, 200)}...`);
          
          resolve({
            success: false,
            statusCode: res.statusCode,
            processingTime: processingTime,
            error: 'JSON 파싱 실패',
            rawResponse: responseData.substring(0, 500)
          });
        }
      });
    });

    req.on('error', (error) => {
      console.log(`❌ API 요청 실패: ${error.message}`);
      resolve({
        success: false,
        error: error.message,
        processingTime: Date.now() - startTime
      });
    });

    req.on('timeout', () => {
      console.log('❌ API 요청 타임아웃');
      req.destroy();
      resolve({
        success: false,
        error: 'API timeout',
        processingTime: Date.now() - startTime
      });
    });

    req.write(postData);
    req.end();
  });
}

/**
 * 3. 정적 자원 로드 테스트
 */
async function testStaticAssets() {
  console.log('\n📦 [3단계] 정적 자원 로드 테스트...\n');

  const staticPaths = [
    '/_next/static/css/',
    '/_next/static/chunks/',
    '/favicon.ico'
  ];

  const results = await Promise.allSettled(staticPaths.map(path => {
    return new Promise((resolve) => {
      const options = {
        hostname: 'aicamp-v3-0.vercel.app',
        port: 443,
        path: path,
        method: 'HEAD',
        timeout: 10000
      };

      const req = https.request(options, (res) => {
        resolve({
          path: path,
          success: res.statusCode < 400,
          statusCode: res.statusCode
        });
      });

      req.on('error', () => {
        resolve({
          path: path,
          success: false,
          statusCode: 'ERROR'
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          path: path,
          success: false,
          statusCode: 'TIMEOUT'
        });
      });

      req.end();
    });
  }));

  console.log('정적 자원 상태:');
  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      const { path, success, statusCode } = result.value;
      console.log(`   ${path}: ${success ? '✅' : '❌'} (${statusCode})`);
    }
  });

  const successCount = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
  
  return {
    totalAssets: staticPaths.length,
    successfulAssets: successCount,
    successRate: Math.round((successCount / staticPaths.length) * 100)
  };
}

/**
 * 4. 최종 결과 분석 및 보고서
 */
function generateWebTestReport(pageResult, apiResult, assetsResult) {
  console.log('\n' + '='.repeat(70));
  console.log('🌐 실제 웹사이트 AI 무료진단 시스템 테스트 결과');
  console.log('='.repeat(70));
  console.log(`📅 테스트 완료 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`);
  console.log(`🌍 대상 웹사이트: ${TEST_CONFIG.baseUrl}${TEST_CONFIG.diagnosisPage}\n`);

  // 각 영역별 평가
  const evaluations = [
    {
      name: '페이지 로드',
      success: pageResult.success && pageResult.hasEssentialElements,
      details: `상태: ${pageResult.statusCode}, 필수요소: ${pageResult.hasEssentialElements ? '있음' : '없음'}`
    },
    {
      name: '진단 API',
      success: apiResult.success && apiResult.isValidResponse,
      details: `처리시간: ${apiResult.processingTime}ms, 유효응답: ${apiResult.isValidResponse ? '예' : '아니오'}`
    },
    {
      name: '정적 자원',
      success: assetsResult.successRate >= 70,
      details: `성공률: ${assetsResult.successRate}% (${assetsResult.successfulAssets}/${assetsResult.totalAssets})`
    }
  ];

  console.log('📊 세부 평가 결과:');
  evaluations.forEach((eval, index) => {
    console.log(`   ${index + 1}. ${eval.name}: ${eval.success ? '✅ 성공' : '❌ 실패'}`);
    console.log(`      └─ ${eval.details}`);
  });

  const totalSuccess = evaluations.filter(e => e.success).length;
  const totalTests = evaluations.length;

  console.log(`\n🏆 종합 평가:`);
  console.log(`   통과한 영역: ${totalSuccess}/${totalTests}개`);
  console.log(`   전체 성공률: ${Math.round((totalSuccess / totalTests) * 100)}%`);

  // 시스템 상태 판정
  let systemStatus, recommendation;
  
  if (totalSuccess === totalTests) {
    systemStatus = '✅ 완벽 - 모든 기능이 정상 작동';
    recommendation = '🎉 AICAMP AI 무료진단 시스템이 완벽하게 작동하고 있습니다!';
  } else if (totalSuccess >= 2) {
    systemStatus = '⚠️ 양호 - 주요 기능 정상, 일부 개선 필요';
    recommendation = '🔧 일부 기능을 개선하면 더욱 안정적인 서비스가 됩니다.';
  } else {
    systemStatus = '❌ 개선 필요 - 주요 기능에 문제 있음';
    recommendation = '🚨 중요한 문제들을 우선 해결해야 합니다.';
  }

  console.log(`   시스템 상태: ${systemStatus}`);
  console.log(`\n💡 권장사항:`);
  console.log(`   ${recommendation}`);

  // 사용자 경험 분석
  if (apiResult.processingTime) {
    console.log(`\n⏱️ 사용자 경험 분석:`);
    if (apiResult.processingTime < 5000) {
      console.log(`   응답 속도: ✅ 빠름 (${apiResult.processingTime}ms)`);
    } else if (apiResult.processingTime < 15000) {
      console.log(`   응답 속도: ⚠️ 보통 (${apiResult.processingTime}ms)`);
    } else {
      console.log(`   응답 속도: ❌ 느림 (${apiResult.processingTime}ms) - 최적화 필요`);
    }
  }

  console.log('\n🏁 웹사이트 테스트 완료');

  return {
    totalTests,
    successfulTests: totalSuccess,
    successRate: Math.round((totalSuccess / totalTests) * 100),
    systemStatus: totalSuccess === totalTests ? 'PERFECT' : totalSuccess >= 2 ? 'GOOD' : 'NEEDS_IMPROVEMENT',
    processingTime: apiResult.processingTime,
    recommendations: recommendation
  };
}

/**
 * 메인 웹 테스트 실행
 */
async function runWebDiagnosisTest() {
  console.log('🌐 실제 웹사이트 AI 무료진단 시스템 테스트 시작');
  console.log('목표: 실제 사용자 경험 검증');
  console.log('='.repeat(70));

  try {
    // 각 단계별 테스트 실행
    const pageResult = await testDiagnosisPageAccess();
    const apiResult = await testDiagnosisAPISimulation();
    const assetsResult = await testStaticAssets();

    // 최종 결과 분석
    const report = generateWebTestReport(pageResult, apiResult, assetsResult);
    
    return report;

  } catch (error) {
    console.error('\n❌ 웹 테스트 실행 중 치명적 오류:', error.message);
    return { systemStatus: 'CRITICAL_ERROR', error: error.message };
  }
}

// 테스트 실행
runWebDiagnosisTest()
  .then(report => {
    process.exit(report.systemStatus === 'PERFECT' ? 0 : 1);
  })
  .catch(error => {
    console.error('웹 테스트 실행 실패:', error);
    process.exit(2);
  }); 