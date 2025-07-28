/**
 * 🚨 긴급 오류 해결 테스트 - 2025.01.27
 * 실행: node quick-error-test.js
 */

const fetch = require('node-fetch');

const SITE_URL = 'https://ai-camp-landingpage.vercel.app';

async function quickErrorTest() {
  console.log('🚨 긴급 오류 해결 테스트 시작');
  console.log('🌐 사이트:', SITE_URL);
  console.log('=' .repeat(60));

  const tests = [
    {
      name: '홈페이지 접근',
      url: SITE_URL + '/',
      expected: 200
    },
    {
      name: 'AI 무료진단 페이지',
      url: SITE_URL + '/diagnosis',
      expected: 200
    },
    {
      name: '서비스 페이지 (404 해결 확인)',
      url: SITE_URL + '/services',
      expected: 200
    },
    {
      name: 'Google Apps Script 연결',
      url: 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
      expected: 200
    }
  ];

  let successCount = 0;
  let totalCount = tests.length;

  for (const test of tests) {
    try {
      console.log(`📄 테스트: ${test.name}`);
      
      const response = await fetch(test.url, {
        method: 'GET',
        timeout: 10000
      });

      if (response.status === test.expected) {
        console.log(`✅ 성공: ${test.name} (${response.status})`);
        successCount++;
      } else {
        console.log(`❌ 실패: ${test.name} (${response.status})`);
      }
      
    } catch (error) {
      console.log(`💥 오류: ${test.name} - ${error.message}`);
    }
  }

  console.log('\n' + '=' .repeat(60));
  console.log('🎯 테스트 결과');
  console.log(`✅ 성공: ${successCount}/${totalCount}`);
  
  if (successCount === totalCount) {
    console.log('🎉 모든 테스트 통과! 오류가 해결되었습니다.');
  } else {
    console.log('⚠️ 일부 테스트 실패. 추가 확인이 필요합니다.');
  }

  console.log('\n📱 브라우저에서 직접 확인하세요:');
  console.log('🌐', SITE_URL + '/diagnosis');
  
  return successCount === totalCount;
}

// 실행
if (require.main === module) {
  quickErrorTest()
    .then(success => {
      const exitCode = success ? 0 : 1;
      console.log(`\n🏁 테스트 완료 (종료 코드: ${exitCode})`);
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('💥 테스트 실행 오류:', error);
      process.exit(1);
    });
}

module.exports = { quickErrorTest }; 