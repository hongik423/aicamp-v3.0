/**
 * 🔬 간단한 API 테스트 스크립트
 * GEMINI API 키 확인 및 기본 API 동작 테스트
 */

const http = require('http');

// 테스트 데이터 (최소한의 필수 필드만)
const testData = {
  companyName: '테스트기업',
  contactName: '홍길동',
  contactEmail: 'test@aicamp.club',
  contactPhone: '010-1234-5678',
  industry: 'IT/소프트웨어',
  employeeCount: '51-100명',
  
  // 몇 개의 기본 진단 데이터
  q1_leadership_vision: 4,
  q2_leadership_support: 3,
  q9_current_tools: 3,
  q17_org_culture: 4,
  q25_tech_infrastructure: 3,
  q33_goal_clarity: 4,
  q41_execution_planning: 3
};

function testAPI() {
  const postData = JSON.stringify(testData);
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/ai-diagnosis',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
    timeout: 30000 // 30초 타임아웃
  };

  console.log('🔬 AICAMP API 간단 테스트 시작...');
  console.log('📊 테스트 데이터:', testData.companyName);
  
  const startTime = Date.now();

  const req = http.request(options, (res) => {
    let data = '';
    
    console.log(`📡 응답 상태: ${res.statusCode}`);
    console.log(`📋 응답 헤더:`, res.headers);

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const duration = Date.now() - startTime;
      console.log(`⏱️ 응답 시간: ${duration}ms`);
      
      try {
        if (res.statusCode === 200) {
          const result = JSON.parse(data);
          console.log('✅ API 테스트 성공!');
          console.log('📊 응답 데이터 키:', Object.keys(result));
          
          if (result.success) {
            console.log('🎯 진단 처리 성공');
          } else {
            console.log('⚠️ 진단 처리 실패:', result.error);
          }
        } else {
          console.log('❌ API 오류 응답:');
          console.log('📄 응답 내용:', data.substring(0, 500));
        }
      } catch (parseError) {
        console.log('❌ JSON 파싱 오류:', parseError.message);
        console.log('📄 원본 응답:', data.substring(0, 500));
      }
    });
  });

  req.on('error', (error) => {
    console.log('❌ 요청 오류:', error.message);
  });

  req.on('timeout', () => {
    console.log('⏰ 요청 시간 초과');
    req.destroy();
  });

  req.write(postData);
  req.end();
}

// 환경변수 확인
console.log('🔍 환경변수 확인:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- GEMINI_API_KEY 설정됨:', !!process.env.GEMINI_API_KEY);

// 서버 상태 확인
const checkServer = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET',
  timeout: 5000
}, (res) => {
  console.log('✅ 서버 응답 확인됨');
  console.log('🚀 API 테스트 시작...\n');
  testAPI();
});

checkServer.on('error', (error) => {
  console.log('❌ 서버 연결 실패:', error.message);
  console.log('💡 npm run dev로 서버를 먼저 시작하세요.');
});

checkServer.on('timeout', () => {
  console.log('⏰ 서버 응답 시간 초과');
});

checkServer.end();

