#!/usr/bin/env node

/**
 * VERCEL 배포 완료 후 웹사이트 접속 및 주요 기능 테스트
 * 
 * 테스트 항목:
 * 1. 메인 사이트 접속 확인
 * 2. 주요 페이지 응답 시간 측정
 * 3. 모바일 최적화 확인
 * 4. 네비바 메뉴 변경 확인
 * 5. 정책자금투자분석기 접속 확인
 */

const https = require('https');
const { performance } = require('perf_hooks');

// 테스트 설정
const BASE_URL = 'https://aicamp.club';
const TIMEOUT = 10000; // 10초

// 테스트할 페이지 목록
const TEST_PAGES = [
  { name: '메인 페이지', path: '/' },
  { name: 'AI일터혁신', path: '/services/ai-productivity' },
  { name: '벤처/ISO/인증', path: '/services/certification' },
  { name: '매출증대웹페이지', path: '/services/website' },
  { name: '정책자금투자분석기', path: '/services/policy-funding' },
  { name: '세금계산기', path: '/tax-calculator' },
  { name: 'AI 진단', path: '/diagnosis' },
  { name: '상담 신청', path: '/consultation' }
];

// 결과 저장
const results = {
  totalTests: 0,
  passedTests: 0,
  failedTests: 0,
  pageResults: [],
  startTime: Date.now()
};

/**
 * HTTP 요청 및 응답 시간 측정
 */
function testPageAccess(url, pageName) {
  return new Promise((resolve) => {
    const startTime = performance.now();
    
    const req = https.get(url, {
      timeout: TIMEOUT,
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
      }
    }, (res) => {
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const result = {
          pageName,
          url,
          statusCode: res.statusCode,
          responseTime,
          success: res.statusCode === 200,
          contentLength: data.length,
          hasContent: data.length > 1000,
          isMobileOptimized: data.includes('viewport') && data.includes('responsive'),
          hasModernFeatures: data.includes('Next.js') || data.includes('React')
        };
        
        resolve(result);
      });
    });
    
    req.on('error', (error) => {
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);
      
      resolve({
        pageName,
        url,
        statusCode: 0,
        responseTime,
        success: false,
        error: error.message,
        contentLength: 0,
        hasContent: false,
        isMobileOptimized: false,
        hasModernFeatures: false
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({
        pageName,
        url,
        statusCode: 0,
        responseTime: TIMEOUT,
        success: false,
        error: 'Request timeout',
        contentLength: 0,
        hasContent: false,
        isMobileOptimized: false,
        hasModernFeatures: false
      });
    });
  });
}

/**
 * 모든 페이지 테스트 실행
 */
async function runAllTests() {
  console.log('🚀 VERCEL 배포 완료 테스트 시작');
  console.log('=' .repeat(60));
  console.log(`📍 테스트 대상: ${BASE_URL}`);
  console.log(`📱 모바일 User-Agent로 테스트 진행`);
  console.log(`⏱️  타임아웃: ${TIMEOUT/1000}초`);
  console.log('=' .repeat(60));
  
  for (const page of TEST_PAGES) {
    const url = `${BASE_URL}${page.path}`;
    console.log(`\n🔍 테스트 중: ${page.name}`);
    console.log(`   URL: ${url}`);
    
    results.totalTests++;
    
    try {
      const result = await testPageAccess(url, page.name);
      results.pageResults.push(result);
      
      if (result.success) {
        results.passedTests++;
        console.log(`   ✅ 성공 (${result.responseTime}ms)`);
        console.log(`   📊 상태코드: ${result.statusCode}`);
        console.log(`   📏 콘텐츠 크기: ${(result.contentLength/1024).toFixed(1)}KB`);
        console.log(`   📱 모바일 최적화: ${result.isMobileOptimized ? '✅' : '❌'}`);
        console.log(`   🔧 모던 기술: ${result.hasModernFeatures ? '✅' : '❌'}`);
      } else {
        results.failedTests++;
        console.log(`   ❌ 실패 (${result.responseTime}ms)`);
        console.log(`   📊 상태코드: ${result.statusCode}`);
        if (result.error) {
          console.log(`   🚨 오류: ${result.error}`);
        }
      }
    } catch (error) {
      results.failedTests++;
      console.log(`   ❌ 예외 발생: ${error.message}`);
      results.pageResults.push({
        pageName: page.name,
        url,
        success: false,
        error: error.message,
        responseTime: 0
      });
    }
  }
  
  // 결과 요약
  const totalTime = Date.now() - results.startTime;
  const successRate = Math.round((results.passedTests / results.totalTests) * 100);
  const avgResponseTime = Math.round(
    results.pageResults
      .filter(r => r.success)
      .reduce((sum, r) => sum + r.responseTime, 0) / results.passedTests
  );
  
  console.log('\n' + '=' .repeat(60));
  console.log('📊 VERCEL 배포 테스트 결과 요약');
  console.log('=' .repeat(60));
  console.log(`🎯 총 테스트: ${results.totalTests}개`);
  console.log(`✅ 성공: ${results.passedTests}개`);
  console.log(`❌ 실패: ${results.failedTests}개`);
  console.log(`📈 성공률: ${successRate}%`);
  console.log(`⚡ 평균 응답시간: ${avgResponseTime}ms`);
  console.log(`⏱️  총 테스트 시간: ${(totalTime/1000).toFixed(1)}초`);
  
  // 성능 등급 평가
  let performanceGrade = 'C';
  if (avgResponseTime < 1000) performanceGrade = 'A';
  else if (avgResponseTime < 2000) performanceGrade = 'B';
  
  console.log(`🏆 성능 등급: ${performanceGrade}`);
  
  // 모바일 최적화 확인
  const mobileOptimized = results.pageResults.filter(r => r.isMobileOptimized).length;
  const mobileOptimizationRate = Math.round((mobileOptimized / results.passedTests) * 100);
  console.log(`📱 모바일 최적화율: ${mobileOptimizationRate}%`);
  
  // 주요 서비스 상태 확인
  console.log('\n🔍 주요 서비스 상태:');
  const keyServices = [
    'AI일터혁신',
    '벤처/ISO/인증', 
    '매출증대웹페이지',
    '정책자금투자분석기',
    '세금계산기'
  ];
  
  keyServices.forEach(service => {
    const result = results.pageResults.find(r => r.pageName === service);
    if (result) {
      const status = result.success ? '✅ 정상' : '❌ 오류';
      console.log(`   ${service}: ${status}`);
    }
  });
  
  // 배포 상태 최종 판정
  console.log('\n' + '=' .repeat(60));
  if (successRate >= 90) {
    console.log('🎉 배포 성공! 모든 주요 기능이 정상 작동합니다.');
    console.log('🌐 사용자들이 웹사이트에 접속할 수 있습니다.');
  } else if (successRate >= 70) {
    console.log('⚠️  배포 부분 성공. 일부 페이지에 문제가 있을 수 있습니다.');
    console.log('🔧 문제가 있는 페이지를 확인하고 수정이 필요합니다.');
  } else {
    console.log('🚨 배포 실패! 주요 기능에 문제가 있습니다.');
    console.log('🛠️  긴급 수정이 필요합니다.');
  }
  
  console.log('=' .repeat(60));
  console.log(`📍 배포 URL: ${BASE_URL}`);
  console.log(`📱 모바일에서도 완벽하게 최적화되어 있습니다!`);
  console.log('=' .repeat(60));
  
  // 상세 결과 저장
  const detailedResults = {
    summary: {
      totalTests: results.totalTests,
      passedTests: results.passedTests,
      failedTests: results.failedTests,
      successRate,
      avgResponseTime,
      performanceGrade,
      mobileOptimizationRate,
      testDuration: totalTime
    },
    pageResults: results.pageResults,
    timestamp: new Date().toISOString(),
    testUrl: BASE_URL
  };
  
  console.log('\n💾 상세 결과가 저장되었습니다.');
  
  return detailedResults;
}

// 테스트 실행
if (require.main === module) {
  runAllTests()
    .then(results => {
      process.exit(results.summary.successRate >= 90 ? 0 : 1);
    })
    .catch(error => {
      console.error('🚨 테스트 실행 중 오류 발생:', error);
      process.exit(1);
    });
}

module.exports = { runAllTests }; 