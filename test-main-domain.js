/**
 * 🌐 AICAMP 메인 도메인 정상 동작 확인
 * 
 * URL: https://aicamp-v3-0.vercel.app
 */

const https = require('https');

const MAIN_DOMAIN = 'https://aicamp-v3-0.vercel.app';

async function testMainDomain() {
  console.log('🌐 AICAMP 메인 도메인 테스트');
  console.log('=' .repeat(50));
  console.log(`📅 테스트 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`);
  console.log(`🔗 대상 URL: ${MAIN_DOMAIN}\n`);

  // 1. 메인 페이지 접근
  console.log('🏠 1. 메인 페이지 접근 테스트...');
  
  const pageResult = await new Promise((resolve) => {
    const options = {
      hostname: 'aicamp-v3-0.vercel.app',
      port: 443,
      path: '/',
      method: 'GET',
      timeout: 15000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          success: res.statusCode === 200,
          statusCode: res.statusCode,
          contentLength: data.length,
          hasAicamp: data.includes('AICAMP') || data.includes('AI 캠프'),
          hasNavigation: data.includes('진단') || data.includes('상담'),
          hasFooter: data.includes('footer') || data.includes('copyright')
        });
      });
    });

    req.on('error', () => resolve({ success: false, error: 'Connection failed' }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ success: false, error: 'Timeout' });
    });

    req.end();
  });

  console.log(`   상태: ${pageResult.success ? '✅ 성공' : '❌ 실패'} (${pageResult.statusCode})`);
  console.log(`   콘텐츠: ${pageResult.contentLength} bytes`);
  console.log(`   AICAMP 브랜딩: ${pageResult.hasAicamp ? '✅' : '❌'}`);
  console.log(`   네비게이션: ${pageResult.hasNavigation ? '✅' : '❌'}`);

  // 2. 진단 페이지 접근
  console.log('\n🔬 2. 진단 페이지 접근 테스트...');
  
  const diagnosisPage = await new Promise((resolve) => {
    const options = {
      hostname: 'aicamp-v3-0.vercel.app',
      port: 443,
      path: '/services/diagnosis',
      method: 'GET',
      timeout: 15000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          success: res.statusCode === 200,
          statusCode: res.statusCode,
          contentLength: data.length,
          hasDiagnosisForm: data.includes('form') || data.includes('진단')
        });
      });
    });

    req.on('error', () => resolve({ success: false }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ success: false });
    });

    req.end();
  });

  console.log(`   상태: ${diagnosisPage.success ? '✅ 성공' : '❌ 실패'} (${diagnosisPage.statusCode})`);
  console.log(`   진단 폼: ${diagnosisPage.hasDiagnosisForm ? '✅ 확인됨' : '❌ 없음'}`);

  // 3. API 테스트 (간단한 시스템 체크)
  console.log('\n🚀 3. API 시스템 테스트...');
  
  const apiResult = await new Promise((resolve) => {
    const testData = {
      companyName: 'QUICK_TEST',
      industry: 'IT서비스',
      contactManager: '테스트',
      phone: '010-0000-0000',
      email: 'test@aicamp.co.kr',
      employeeCount: '10-50명',
      businessLocation: '서울특별시',
      growthStage: 'growth',
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
      mainConcerns: '메인 도메인 테스트',
      expectedBenefits: '시스템 정상 동작 확인',
      privacyConsent: true,
      submitDate: new Date().toISOString()
    };

    const postData = JSON.stringify(testData);
    const options = {
      hostname: 'aicamp-v3-0.vercel.app',
      port: 443,
      path: '/api/simplified-diagnosis',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 30000
    };

    const startTime = Date.now();
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const processingTime = Date.now() - startTime;
        try {
          const result = JSON.parse(data);
          resolve({
            success: true,
            statusCode: res.statusCode,
            apiSuccess: result.success,
            processingTime: processingTime,
            totalScore: result.data?.diagnosis?.totalScore,
            hasReport: !!result.data?.summaryReport
          });
        } catch {
          resolve({ success: false, statusCode: res.statusCode, processingTime });
        }
      });
    });

    req.on('error', () => resolve({ success: false, processingTime: Date.now() - startTime }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ success: false, processingTime: Date.now() - startTime });
    });

    req.write(postData);
    req.end();
  });

  console.log(`   API 응답: ${apiResult.success ? '✅ 성공' : '❌ 실패'} (${apiResult.statusCode})`);
  console.log(`   처리 시간: ${apiResult.processingTime}ms`);
  if (apiResult.apiSuccess) {
    console.log(`   진단 점수: ${apiResult.totalScore}점`);
    console.log(`   보고서 생성: ${apiResult.hasReport ? '✅' : '❌'}`);
  }

  // 최종 결과
  const allSuccess = pageResult.success && diagnosisPage.success && apiResult.success && apiResult.apiSuccess;
  
  console.log('\n' + '='.repeat(50));
  console.log('🏆 최종 결과');
  console.log('='.repeat(50));
  console.log(`메인 페이지: ${pageResult.success ? '✅ 정상' : '❌ 오류'}`);
  console.log(`진단 페이지: ${diagnosisPage.success ? '✅ 정상' : '❌ 오류'}`);
  console.log(`진단 API: ${apiResult.success && apiResult.apiSuccess ? '✅ 정상' : '❌ 오류'}`);
  console.log(`\n🎯 종합 평가: ${allSuccess ? '✅ 완벽!' : '⚠️ 일부 문제 있음'}`);

  if (allSuccess) {
    console.log('\n🎉 AICAMP AI 무료진단 시스템이 메인 도메인에서 완벽하게 작동합니다!');
    console.log(`🌐 서비스 URL: ${MAIN_DOMAIN}`);
    console.log(`📋 진단 페이지: ${MAIN_DOMAIN}/services/diagnosis`);
  }

  console.log('\n🏁 테스트 완료');
  
  return allSuccess;
}

testMainDomain()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('테스트 실행 실패:', error);
    process.exit(2);
  }); 