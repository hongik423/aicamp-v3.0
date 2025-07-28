/**
 * 🚀 AICAMP Vercel 배포 테스트 스크립트
 * 
 * 테스트 대상:
 * 1. 안정 배포 URL 접근성
 * 2. 진단 시스템 정상 동작
 * 3. API 엔드포인트 응답
 * 4. 전체 시스템 무결성
 */

const https = require('https');

// Vercel 배포 URL들
const DEPLOYMENT_URLS = {
  latest: 'https://aicamp-v3-0-lxk2x3aq2-hongik423-3087s-projects.vercel.app',
  stable: 'https://aicamp-v3-0-6eppsg947-hongik423-3087s-projects.vercel.app',
  fallback: 'https://aicamp-v3-0.vercel.app'
};

/**
 * URL 접근성 테스트
 */
async function testUrlAccess(url, name) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'GET',
      headers: {
        'User-Agent': 'AICAMP-Vercel-Test/1.0'
      },
      timeout: 15000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          name: name,
          url: url,
          success: res.statusCode === 200,
          statusCode: res.statusCode,
          contentLength: data.length,
          hasAicamp: data.includes('AICAMP') || data.includes('AI 캠프'),
          responseTime: Date.now()
        });
      });
    });

    req.on('error', () => {
      resolve({
        name: name,
        url: url,
        success: false,
        error: 'Connection failed'
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        name: name,
        url: url,
        success: false,
        error: 'Timeout'
      });
    });

    req.end();
  });
}

/**
 * 진단 API 테스트
 */
async function testDiagnosisAPI(baseUrl) {
  const testData = {
    companyName: 'VERCEL_TEST_COMPANY',
    industry: 'IT서비스',
    contactManager: 'Vercel테스트담당자',
    phone: '010-0000-0000',
    email: 'verceltest@aicamp.co.kr',
    employeeCount: '10-50명',
    businessLocation: '서울특별시',
    growthStage: 'growth',
    
    // 간단한 평가 항목
    planning_level: 4,
    differentiation_level: 4,
    pricing_level: 4,
    expertise_level: 4,
    quality_level: 4,
    customer_greeting: 4,
    customer_service: 4,
    complaint_management: 4,
    customer_retention: 4,
    customer_understanding: 4,
    marketing_planning: 4,
    offline_marketing: 4,
    online_marketing: 4,
    sales_strategy: 4,
    purchase_management: 4,
    inventory_management: 4,
    exterior_management: 4,
    interior_management: 4,
    cleanliness: 4,
    work_flow: 4,
    
    mainConcerns: 'Vercel 배포 테스트를 위한 AI 진단 시스템 검증',
    expectedBenefits: '배포된 시스템의 정상 동작 확인',
    privacyConsent: true,
    submitDate: new Date().toISOString()
  };

  return new Promise((resolve) => {
    const urlObj = new URL(baseUrl);
    const postData = JSON.stringify(testData);
    
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: '/api/simplified-diagnosis',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'AICAMP-Vercel-Test/1.0',
        'Origin': baseUrl
      },
      timeout: 60000
    };

    const startTime = Date.now();

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        const processingTime = Date.now() - startTime;
        
        try {
          const jsonResponse = JSON.parse(responseData);
          resolve({
            success: true,
            statusCode: res.statusCode,
            processingTime: processingTime,
            apiSuccess: jsonResponse.success,
            hasDiagnosis: !!(jsonResponse.data && jsonResponse.data.diagnosis),
            totalScore: jsonResponse.data?.diagnosis?.totalScore,
            reportLength: jsonResponse.data?.summaryReport?.length
          });
        } catch (parseError) {
          resolve({
            success: false,
            statusCode: res.statusCode,
            processingTime: processingTime,
            error: 'JSON parsing failed',
            rawResponse: responseData.substring(0, 200)
          });
        }
      });
    });

    req.on('error', (error) => {
      resolve({
        success: false,
        error: error.message,
        processingTime: Date.now() - startTime
      });
    });

    req.on('timeout', () => {
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
 * 각 배포 URL 종합 테스트
 */
async function testDeployment(url, name) {
  console.log(`\n🔍 [${name}] 배포 테스트 시작...`);
  console.log(`URL: ${url}\n`);

  // 1. 기본 접근성 테스트
  console.log('   1. 웹사이트 접근성 테스트...');
  const accessResult = await testUrlAccess(url, name);
  
  console.log(`      상태: ${accessResult.success ? '✅ 성공' : '❌ 실패'} (${accessResult.statusCode})`);
  if (accessResult.contentLength) {
    console.log(`      콘텐츠: ${accessResult.contentLength} bytes`);
  }
  console.log(`      AICAMP 브랜딩: ${accessResult.hasAicamp ? '✅ 확인됨' : '❌ 없음'}`);

  if (!accessResult.success) {
    return {
      name: name,
      url: url,
      websiteAccess: false,
      apiTest: false,
      overall: false,
      error: accessResult.error
    };
  }

  // 2. 진단 API 테스트
  console.log('   2. 진단 API 테스트...');
  const apiResult = await testDiagnosisAPI(url);
  
  console.log(`      API 응답: ${apiResult.success ? '✅ 성공' : '❌ 실패'} (${apiResult.statusCode})`);
  console.log(`      처리 시간: ${apiResult.processingTime}ms`);
  
  if (apiResult.success && apiResult.apiSuccess) {
    console.log(`      진단 성공: ${apiResult.hasDiagnosis ? '✅' : '❌'}`);
    console.log(`      총점: ${apiResult.totalScore || 'N/A'}점`);
    console.log(`      보고서: ${apiResult.reportLength || 0}자`);
  }

  const overallSuccess = accessResult.success && apiResult.success && apiResult.apiSuccess;

  return {
    name: name,
    url: url,
    websiteAccess: accessResult.success,
    apiTest: apiResult.success && apiResult.apiSuccess,
    overall: overallSuccess,
    processingTime: apiResult.processingTime,
    totalScore: apiResult.totalScore,
    reportLength: apiResult.reportLength
  };
}

/**
 * 모든 배포 URL 테스트
 */
async function testAllDeployments() {
  console.log('🚀 AICAMP Vercel 배포 종합 테스트 시작');
  console.log('=' .repeat(60));
  console.log(`📅 테스트 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}\n`);

  // 각 배포 테스트
  const deploymentTests = [
    { url: DEPLOYMENT_URLS.stable, name: '안정 배포' },
    { url: DEPLOYMENT_URLS.latest, name: '최신 배포' },
    { url: DEPLOYMENT_URLS.fallback, name: '메인 도메인' }
  ];

  const results = [];
  
  for (const deployment of deploymentTests) {
    const result = await testDeployment(deployment.url, deployment.name);
    results.push(result);
  }

  // 최종 결과 분석
  console.log('\n' + '='.repeat(60));
  console.log('📊 AICAMP Vercel 배포 테스트 결과 요약');
  console.log('='.repeat(60));

  results.forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.name}:`);
    console.log(`   URL: ${result.url}`);
    console.log(`   웹사이트: ${result.websiteAccess ? '✅ 정상' : '❌ 오류'}`);
    console.log(`   진단 API: ${result.apiTest ? '✅ 정상' : '❌ 오류'}`);
    console.log(`   종합 평가: ${result.overall ? '✅ 성공' : '❌ 실패'}`);
    
    if (result.processingTime) {
      console.log(`   응답 시간: ${result.processingTime}ms`);
    }
    if (result.totalScore) {
      console.log(`   진단 점수: ${result.totalScore}점`);
    }
    if (result.error) {
      console.log(`   오류: ${result.error}`);
    }
  });

  // 권장사항
  const successfulDeployments = results.filter(r => r.overall);
  const totalDeployments = results.length;

  console.log(`\n🏆 배포 성공률: ${successfulDeployments.length}/${totalDeployments} (${Math.round((successfulDeployments.length / totalDeployments) * 100)}%)`);

  if (successfulDeployments.length > 0) {
    console.log('\n💡 권장 사용 URL:');
    successfulDeployments.forEach((deployment, index) => {
      console.log(`   ${index + 1}. ${deployment.name}: ${deployment.url}`);
    });
  } else {
    console.log('\n⚠️ 모든 배포에 문제가 있습니다. 재배포가 필요합니다.');
  }

  console.log('\n🏁 Vercel 배포 테스트 완료');

  return {
    totalDeployments,
    successfulDeployments: successfulDeployments.length,
    successRate: Math.round((successfulDeployments.length / totalDeployments) * 100),
    recommendedUrls: successfulDeployments.map(d => ({ name: d.name, url: d.url }))
  };
}

// 테스트 실행
testAllDeployments()
  .then(report => {
    process.exit(report.successRate >= 50 ? 0 : 1);
  })
  .catch(error => {
    console.error('Vercel 배포 테스트 실행 실패:', error);
    process.exit(2);
  }); 