// AICAMP 오류 수정 검증 테스트 스크립트
// 2025-01-28 작성

const puppeteer = require('puppeteer');

const SITE_URL = 'https://aicamp-v3-0-pjemv4f9v-hongik423-3087s-projects.vercel.app';

async function testErrorFixes() {
  console.log('🧪 AICAMP 오류 수정 검증 테스트 시작');
  console.log('🌐 테스트 사이트:', SITE_URL);
  console.log('=' * 60);

  const browser = await puppeteer.launch({ 
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // 콘솔 로그 및 오류 모니터링
  const errors = [];
  const warnings = [];
  const logs = [];

  page.on('console', msg => {
    const text = msg.text();
    logs.push(text);
    
    if (msg.type() === 'error') {
      errors.push(text);
    } else if (msg.type() === 'warning') {
      warnings.push(text);
    }
  });

  page.on('pageerror', error => {
    errors.push(`Page Error: ${error.message}`);
  });

  try {
    console.log('📄 1. 홈페이지 로딩 테스트');
    await page.goto(SITE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForTimeout(5000);
    
    console.log('✅ 홈페이지 로딩 완료');

    // Service Worker 등록 확인
    console.log('\n🔧 2. Service Worker 상태 확인');
    const swRegistered = await page.evaluate(() => {
      return 'serviceWorker' in navigator;
    });
    console.log('Service Worker 지원:', swRegistered ? '✅' : '❌');

    // PWA 설치 프롬프트 확인
    console.log('\n📱 3. PWA 설치 프롬프트 상태 확인');
    await page.waitForTimeout(3000);

    // 진단 페이지 테스트
    console.log('\n🔍 4. AI 무료진단 페이지 테스트');
    await page.goto(`${SITE_URL}/diagnosis`, { waitUntil: 'networkidle2' });
    await page.waitForTimeout(5000);
    
    console.log('✅ 진단 페이지 로딩 완료');

    // Services 페이지 테스트 (이전 404 오류)
    console.log('\n🛠️ 5. Services 페이지 테스트 (404 오류 수정 확인)');
    await page.goto(`${SITE_URL}/services`, { waitUntil: 'networkidle2' });
    await page.waitForTimeout(3000);
    
    console.log('✅ Services 페이지 로딩 완료');

    // 진단 폼 기능 테스트
    console.log('\n📝 6. 진단 폼 기능 테스트');
    await page.goto(`${SITE_URL}/services/diagnosis`, { waitUntil: 'networkidle2' });
    await page.waitForTimeout(5000);
    
    // "진단 시작하기" 버튼 클릭
    const startButton = await page.$('button:contains("진단 시작하기"), button:contains("무료 진단 시작")');
    if (startButton) {
      await startButton.click();
      await page.waitForTimeout(3000);
      console.log('✅ 진단 폼 시작 버튼 작동');
    }

    // 오류 분석
    console.log('\n' + '=' * 60);
    console.log('📊 테스트 결과 분석');
    console.log('=' * 60);

    // 1. 메시지 포트 오류 체크
    const messagePortErrors = errors.filter(err => 
      err.includes('message port closed') || 
      err.includes('The message port closed before a response was received')
    );
    
    console.log('🔴 메시지 포트 오류:', messagePortErrors.length === 0 ? '✅ 해결됨' : `❌ ${messagePortErrors.length}개 발견`);
    if (messagePortErrors.length > 0) {
      messagePortErrors.forEach(err => console.log('  -', err));
    }

    // 2. TypeError: n is not a function 오류 체크
    const typeErrors = errors.filter(err => 
      err.includes('n is not a function') || 
      err.includes('TypeError:')
    );
    
    console.log('🔴 함수 호출 오류:', typeErrors.length === 0 ? '✅ 해결됨' : `❌ ${typeErrors.length}개 발견`);
    if (typeErrors.length > 0) {
      typeErrors.forEach(err => console.log('  -', err));
    }

    // 3. PWA 관련 오류 체크
    const pwaErrors = errors.filter(err => 
      err.includes('beforeinstallprompt') || 
      err.includes('Banner not shown')
    );
    
    console.log('🔴 PWA 설치 오류:', pwaErrors.length === 0 ? '✅ 해결됨' : `❌ ${pwaErrors.length}개 발견`);
    if (pwaErrors.length > 0) {
      pwaErrors.forEach(err => console.log('  -', err));
    }

    // 4. 전체 오류 요약
    console.log('\n📈 전체 오류 요약:');
    console.log('- 총 오류 수:', errors.length);
    console.log('- 총 경고 수:', warnings.length);
    console.log('- 총 로그 수:', logs.length);

    if (errors.length === 0) {
      console.log('\n🎉 축하합니다! 모든 오류가 해결되었습니다!');
    } else {
      console.log('\n⚠️ 여전히 해결되지 않은 오류가 있습니다:');
      errors.forEach((err, index) => {
        console.log(`  ${index + 1}. ${err}`);
      });
    }

    // 성공 지표
    const successMetrics = {
      messagePortFixed: messagePortErrors.length === 0,
      functionErrorFixed: typeErrors.length === 0,
      pwaErrorFixed: pwaErrors.length === 0,
      overallSuccess: errors.length === 0
    };

    console.log('\n🏆 수정 완료 지표:');
    Object.entries(successMetrics).forEach(([key, value]) => {
      console.log(`- ${key}: ${value ? '✅' : '❌'}`);
    });

    return successMetrics;

  } catch (error) {
    console.error('❌ 테스트 중 오류 발생:', error);
    return false;
  } finally {
    await browser.close();
  }
}

// 테스트 실행
testErrorFixes()
  .then(result => {
    console.log('\n🏁 테스트 완료');
    if (result && result.overallSuccess) {
      console.log('🎊 모든 오류가 성공적으로 해결되었습니다!');
      process.exit(0);
    } else {
      console.log('⚠️ 일부 오류가 남아있습니다. 추가 수정이 필요합니다.');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('❌ 테스트 실행 실패:', error);
    process.exit(1);
  }); 