// ================================================================================
// 🔍 배포 오류 디버깅
// ================================================================================

const https = require('https');

const DEPLOYMENT_URL = 'https://aicampv30-m4p5n9fun-hongik423-3087s-projects.vercel.app';

/**
 * 상세한 HTTP 요청 함수 (응답 내용 포함)
 */
function makeDetailedHttpRequest(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const requestOptions = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'GET',
      headers: {
        'User-Agent': 'AICAMP-Debug-Bot/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    };

    const req = https.request(requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          headers: res.headers,
          body: data,
          ok: res.statusCode >= 200 && res.statusCode < 300
        });
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

/**
 * 배포 오류 디버깅 실행
 */
async function debugDeploymentError() {
  console.log('🔍 배포 오류 디버깅 시작');
  console.log('=' .repeat(80));
  console.log(`🌐 대상 URL: ${DEPLOYMENT_URL}`);
  console.log('');
  
  try {
    // 메인 페이지 상세 분석
    console.log('📄 메인 페이지 상세 분석 중...');
    const response = await makeDetailedHttpRequest(`${DEPLOYMENT_URL}/`);
    
    console.log(`📊 응답 분석:`);
    console.log(`- 상태 코드: ${response.statusCode} ${response.statusMessage}`);
    console.log(`- Content-Type: ${response.headers['content-type'] || 'N/A'}`);
    console.log(`- Content-Length: ${response.headers['content-length'] || response.body.length}`);
    console.log(`- Server: ${response.headers['server'] || 'N/A'}`);
    console.log(`- X-Vercel-Cache: ${response.headers['x-vercel-cache'] || 'N/A'}`);
    console.log(`- X-Vercel-Id: ${response.headers['x-vercel-id'] || 'N/A'}`);
    
    console.log('\\n📝 응답 내용 (처음 500자):');
    console.log('-'.repeat(50));
    console.log(response.body.substring(0, 500));
    console.log('-'.repeat(50));
    
    // HTML 구조 분석
    if (response.body.includes('<html')) {
      console.log('\\n🔍 HTML 구조 분석:');
      console.log(`- DOCTYPE 선언: ${response.body.includes('<!DOCTYPE') ? '✅' : '❌'}`);
      console.log(`- HTML 태그: ${response.body.includes('<html') ? '✅' : '❌'}`);
      console.log(`- HEAD 섹션: ${response.body.includes('<head') ? '✅' : '❌'}`);
      console.log(`- BODY 섹션: ${response.body.includes('<body') ? '✅' : '❌'}`);
      console.log(`- TITLE 태그: ${response.body.includes('<title') ? '✅' : '❌'}`);
      
      // 제목 추출
      const titleMatch = response.body.match(/<title[^>]*>([^<]*)<\/title>/i);
      if (titleMatch) {
        console.log(`- 페이지 제목: "${titleMatch[1]}"`);
      }
      
      // 오류 메시지 확인
      const errorPatterns = [
        'Application error',
        'Runtime Error',
        'Internal Server Error',
        '500',
        '404',
        'Not Found',
        'Error:',
        'TypeError:',
        'ReferenceError:'
      ];
      
      const foundErrors = errorPatterns.filter(pattern => 
        response.body.toLowerCase().includes(pattern.toLowerCase())
      );
      
      if (foundErrors.length > 0) {
        console.log(`\\n🚨 발견된 오류 패턴:`);
        foundErrors.forEach(error => {
          console.log(`- ${error}`);
        });
      }
      
    } else {
      console.log('\\n❌ 유효한 HTML 응답이 아닙니다');
    }
    
    // Next.js 관련 확인
    console.log('\\n🔍 Next.js 관련 확인:');
    console.log(`- _next 스크립트: ${response.body.includes('_next') ? '✅' : '❌'}`);
    console.log(`- React 하이드레이션: ${response.body.includes('__NEXT_DATA__') ? '✅' : '❌'}`);
    
    // 추가 페이지들도 간단히 테스트
    console.log('\\n🔄 추가 페이지 간단 테스트:');
    const additionalPages = ['/about', '/api/system-health'];
    
    for (const page of additionalPages) {
      try {
        const pageResponse = await makeDetailedHttpRequest(`${DEPLOYMENT_URL}${page}`);
        console.log(`📄 ${page}: ${pageResponse.statusCode} (${pageResponse.body.length} bytes)`);
        
        if (pageResponse.statusCode !== 200) {
          console.log(`   ⚠️ 오류 응답 내용 (처음 200자):`);
          console.log(`   ${pageResponse.body.substring(0, 200)}`);
        }
      } catch (error) {
        console.log(`📄 ${page}: ERROR - ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('🚨 디버깅 중 오류 발생:', error.message);
    console.error('Stack:', error.stack);
  }
  
  console.log('\\n🏁 배포 오류 디버깅 완료');
  console.log('=' .repeat(80));
}

// 디버깅 실행
debugDeploymentError().catch(console.error);
