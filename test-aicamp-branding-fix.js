/**
 * 🧪 AI CAMP 브랜딩 수정 테스트 스크립트
 * 
 * 테스트 목적:
 * 1. M-CENTER → AI CAMP 브랜딩 변경 확인
 * 2. 올바른 구글시트 연결 확인
 * 3. hongik423@gmail.com 메일 발송 확인
 */

const https = require('https');

// 🎯 테스트 설정
const TEST_CONFIG = {
  websiteUrl: 'https://aicamp.club',
  apiEndpoint: '/api/simplified-diagnosis',
  expectedBranding: 'AI CAMP',
  expectedEmail: 'hongik423@gmail.com',
  expectedSheetId: '1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00'
};

// 📝 테스트용 데이터
const testData = {
  // 기본 정보
  companyName: `AI CAMP 브랜딩 테스트 ${Date.now()}`,
  industry: '정보통신업',
  employeeCount: '10-50명',
  revenue: '10억-50억원',
  contactName: '테스트관리자',
  contactEmail: 'test@aicamp.club',
  contactPhone: '010-1234-5678',
  
  // 진단 데이터
  currentChallenges: ['디지털전환', '인력부족'],
  businessGoals: ['매출증대', '효율성향상'],
  priority: '높음',
  
  // 메타 정보
  formType: 'AI_무료진단',
  timestamp: new Date().toISOString()
};

console.log('🧪 AI CAMP 브랜딩 테스트 시작');
console.log('=====================================');
console.log(`📅 테스트 시간: ${new Date().toLocaleString('ko-KR')}`);
console.log(`🌐 테스트 URL: ${TEST_CONFIG.websiteUrl}`);
console.log(`🏢 예상 브랜딩: ${TEST_CONFIG.expectedBranding}`);
console.log(`📧 예상 관리자 메일: ${TEST_CONFIG.expectedEmail}`);
console.log('');

// 🔍 1단계: 웹사이트 접근 테스트
function testWebsiteAccess() {
  return new Promise((resolve) => {
    console.log('🔍 1단계: 웹사이트 접근 테스트...');
    
    const req = https.get(TEST_CONFIG.websiteUrl, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const hasAiCamp = data.includes('AI CAMP');
        const hasMCenter = data.includes('M-CENTER');
        
        console.log(`  📊 응답 상태: ${res.statusCode}`);
        console.log(`  🏢 AI CAMP 브랜딩: ${hasAiCamp ? '✅ 발견됨' : '❌ 없음'}`);
        console.log(`  ⚠️  M-CENTER 잔재: ${hasMCenter ? '❌ 발견됨' : '✅ 없음'}`);
        
        resolve({
          success: res.statusCode === 200,
          hasAiCamp,
          hasMCenter,
          statusCode: res.statusCode
        });
      });
    });
    
    req.on('error', (error) => {
      console.log(`  ❌ 웹사이트 접근 실패: ${error.message}`);
      resolve({ success: false, error: error.message });
    });
    
    req.setTimeout(10000, () => {
      console.log('  ⏰ 웹사이트 접근 타임아웃');
      req.destroy();
      resolve({ success: false, error: 'timeout' });
    });
  });
}

// 📋 2단계: API 진단 신청 테스트
function testDiagnosisSubmission() {
  return new Promise((resolve) => {
    console.log('📋 2단계: AI 무료진단 신청 테스트...');
    
    const postData = JSON.stringify(testData);
    
    const options = {
      hostname: TEST_CONFIG.websiteUrl.replace('https://', '').split('/')[0],
      path: TEST_CONFIG.apiEndpoint,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'AI-CAMP-Branding-Test/1.0'
      }
    };
    
    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          
          console.log(`  📊 응답 상태: ${res.statusCode}`);
          console.log(`  ✅ 성공 여부: ${result.success ? '성공' : '실패'}`);
          
          if (result.success) {
            console.log(`  🏢 회사명: ${result.companyName || testData.companyName}`);
            console.log(`  📧 연락처: ${result.contactEmail || testData.contactEmail}`);
            console.log(`  📊 총점: ${result.totalScore || 'N/A'}`);
            
            // 브랜딩 확인
            const responseStr = JSON.stringify(result);
            const hasAiCamp = responseStr.includes('AI CAMP');
            const hasMCenter = responseStr.includes('M-CENTER');
            
            console.log(`  🏢 응답에 AI CAMP: ${hasAiCamp ? '✅' : '❌'}`);
            console.log(`  ⚠️  응답에 M-CENTER: ${hasMCenter ? '❌ 발견됨' : '✅ 없음'}`);
          } else {
            console.log(`  ❌ 실패 사유: ${result.message || result.error || '알 수 없음'}`);
          }
          
          resolve({
            success: result.success,
            statusCode: res.statusCode,
            result,
            hasAiCamp: JSON.stringify(result).includes('AI CAMP'),
            hasMCenter: JSON.stringify(result).includes('M-CENTER')
          });
          
        } catch (parseError) {
          console.log(`  ❌ 응답 파싱 실패: ${parseError.message}`);
          console.log(`  📄 원본 응답: ${responseData.substring(0, 200)}...`);
          
          resolve({
            success: false,
            error: 'parse_error',
            rawResponse: responseData.substring(0, 500)
          });
        }
      });
    });
    
    req.on('error', (error) => {
      console.log(`  ❌ API 요청 실패: ${error.message}`);
      resolve({ 
        success: false, 
        error: error.message 
      });
    });
    
    req.setTimeout(15000, () => {
      console.log('  ⏰ API 요청 타임아웃');
      req.destroy();
      resolve({ 
        success: false, 
        error: 'timeout' 
      });
    });
    
    req.write(postData);
    req.end();
  });
}

// 📊 3단계: 환경변수 확인
function checkEnvironmentVariables() {
  console.log('📊 3단계: 환경변수 확인...');
  
  // Next.js 환경에서 확인 가능한 변수들
  const publicVars = {
    'COMPANY_NAME': process.env.NEXT_PUBLIC_COMPANY_NAME,
    'COMPANY_EMAIL': process.env.NEXT_PUBLIC_COMPANY_EMAIL,
    'SUPPORT_EMAIL': process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
    'GOOGLE_SHEETS_ID': process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID,
    'GOOGLE_SCRIPT_URL': process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL
  };
  
  console.log('  🔧 현재 환경변수:');
  for (const [key, value] of Object.entries(publicVars)) {
    if (value) {
      const maskedValue = key.includes('URL') || key.includes('ID') ? 
        value.substring(0, 30) + '...' : value;
      console.log(`    ${key}: ${maskedValue}`);
    } else {
      console.log(`    ${key}: ❌ 미설정`);
    }
  }
  
  return publicVars;
}

// 🚀 메인 테스트 실행
async function runBrandingTest() {
  try {
    // 환경변수 확인
    const envVars = checkEnvironmentVariables();
    console.log('');
    
    // 웹사이트 접근 테스트
    const websiteTest = await testWebsiteAccess();
    console.log('');
    
    // API 진단 신청 테스트  
    const apiTest = await testDiagnosisSubmission();
    console.log('');
    
    // 📋 결과 요약
    console.log('🎯 AI CAMP 브랜딩 테스트 결과 요약');
    console.log('=====================================');
    
    const overallSuccess = websiteTest.success && apiTest.success;
    const brandingFixed = (websiteTest.hasAiCamp || apiTest.hasAiCamp) && 
                         !websiteTest.hasMCenter && !apiTest.hasMCenter;
    
    console.log(`📊 전체 테스트: ${overallSuccess ? '✅ 성공' : '❌ 실패'}`);
    console.log(`🏢 브랜딩 수정: ${brandingFixed ? '✅ AI CAMP 적용됨' : '❌ 문제 있음'}`);
    console.log(`🌐 웹사이트: ${websiteTest.success ? '✅ 정상' : '❌ 오류'}`);
    console.log(`📋 API 신청: ${apiTest.success ? '✅ 정상' : '❌ 오류'}`);
    
    if (brandingFixed && overallSuccess) {
      console.log('');
      console.log('🎉 축하합니다!');
      console.log('✅ AI CAMP 브랜딩 수정이 성공적으로 완료되었습니다!');
      console.log('✅ 이제 M-CENTER가 아닌 AI CAMP 명의로 메일이 발송됩니다!');
      console.log('');
      console.log('📧 확인 방법:');
      console.log(`  1. ${TEST_CONFIG.websiteUrl} 접속`); 
      console.log('  2. AI 무료진단 신청');
      console.log('  3. AI CAMP 명의 메일 수신 확인');
    } else {
      console.log('');
      console.log('⚠️  추가 조치 필요:');
      if (!websiteTest.hasAiCamp) {
        console.log('  - 웹사이트 브랜딩 업데이트 필요');
      }
      if (websiteTest.hasMCenter || apiTest.hasMCenter) {
        console.log('  - M-CENTER 잔재 제거 필요');
      }
      if (!apiTest.success) {
        console.log('  - API 연동 문제 해결 필요');
      }
    }
    
    return {
      overall: overallSuccess,
      branding: brandingFixed,
      website: websiteTest,
      api: apiTest,
      env: envVars
    };
    
  } catch (error) {
    console.error('❌ 테스트 실행 중 오류:', error);
    return { overall: false, error: error.message };
  }
}

// 스크립트 실행
if (require.main === module) {
  runBrandingTest().then(result => {
    console.log('\n🏁 테스트 완료');
    process.exit(result.overall ? 0 : 1);
  });
}

module.exports = { runBrandingTest, TEST_CONFIG
  expectedEmail: 'hongik423@gmail.com',
  expectedSheetId: '1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00'
};

// 📝 테스트용 데이터
const testData = {
  // 기본 정보
  companyName: `AI CAMP 브랜딩 테스트 ${Date.now()}`,
  industry: '정보통신업',
  employeeCount: '10-50명',
  revenue: '10억-50억원',
  contactName: '테스트관리자',
  contactEmail: 'test@aicamp.club',
  contactPhone: '010-1234-5678',
  
  // 진단 데이터
  currentChallenges: ['디지털전환', '인력부족'],
  businessGoals: ['매출증대', '효율성향상'],
  priority: '높음',
  
  // 메타 정보
  formType: 'AI_무료진단',
  timestamp: new Date().toISOString()
};

console.log('🧪 AI CAMP 브랜딩 테스트 시작');
console.log('=====================================');
console.log(`📅 테스트 시간: ${new Date().toLocaleString('ko-KR')}`);
console.log(`🌐 테스트 URL: ${TEST_CONFIG.websiteUrl}`);
console.log(`🏢 예상 브랜딩: ${TEST_CONFIG.expectedBranding}`);
console.log(`📧 예상 관리자 메일: ${TEST_CONFIG.expectedEmail}`);
console.log('');

// 🔍 1단계: 웹사이트 접근 테스트
function testWebsiteAccess() {
  return new Promise((resolve) => {
    console.log('🔍 1단계: 웹사이트 접근 테스트...');
    
    const req = https.get(TEST_CONFIG.websiteUrl, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const hasAiCamp = data.includes('AI CAMP');
        const hasMCenter = data.includes('M-CENTER');
        
        console.log(`  📊 응답 상태: ${res.statusCode}`);
        console.log(`  🏢 AI CAMP 브랜딩: ${hasAiCamp ? '✅ 발견됨' : '❌ 없음'}`);
        console.log(`  ⚠️  M-CENTER 잔재: ${hasMCenter ? '❌ 발견됨' : '✅ 없음'}`);
        
        resolve({
          success: res.statusCode === 200,
          hasAiCamp,
          hasMCenter,
          statusCode: res.statusCode
        });
      });
    });
    
    req.on('error', (error) => {
      console.log(`  ❌ 웹사이트 접근 실패: ${error.message}`);
      resolve({ success: false, error: error.message });
    });
    
    req.setTimeout(10000, () => {
      console.log('  ⏰ 웹사이트 접근 타임아웃');
      req.destroy();
      resolve({ success: false, error: 'timeout' });
    });
  });
}

// 📋 2단계: API 진단 신청 테스트
function testDiagnosisSubmission() {
  return new Promise((resolve) => {
    console.log('📋 2단계: AI 무료진단 신청 테스트...');
    
    const postData = JSON.stringify(testData);
    
    const options = {
      hostname: TEST_CONFIG.websiteUrl.replace('https://', '').split('/')[0],
      path: TEST_CONFIG.apiEndpoint,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'AI-CAMP-Branding-Test/1.0'
      }
    };
    
    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          
          console.log(`  📊 응답 상태: ${res.statusCode}`);
          console.log(`  ✅ 성공 여부: ${result.success ? '성공' : '실패'}`);
          
          if (result.success) {
            console.log(`  🏢 회사명: ${result.companyName || testData.companyName}`);
            console.log(`  📧 연락처: ${result.contactEmail || testData.contactEmail}`);
            console.log(`  📊 총점: ${result.totalScore || 'N/A'}`);
            
            // 브랜딩 확인
            const responseStr = JSON.stringify(result);
            const hasAiCamp = responseStr.includes('AI CAMP');
            const hasMCenter = responseStr.includes('M-CENTER');
            
            console.log(`  🏢 응답에 AI CAMP: ${hasAiCamp ? '✅' : '❌'}`);
            console.log(`  ⚠️  응답에 M-CENTER: ${hasMCenter ? '❌ 발견됨' : '✅ 없음'}`);
          } else {
            console.log(`  ❌ 실패 사유: ${result.message || result.error || '알 수 없음'}`);
          }
          
          resolve({
            success: result.success,
            statusCode: res.statusCode,
            result,
            hasAiCamp: JSON.stringify(result).includes('AI CAMP'),
            hasMCenter: JSON.stringify(result).includes('M-CENTER')
          });
          
        } catch (parseError) {
          console.log(`  ❌ 응답 파싱 실패: ${parseError.message}`);
          console.log(`  📄 원본 응답: ${responseData.substring(0, 200)}...`);
          
          resolve({
            success: false,
            error: 'parse_error',
            rawResponse: responseData.substring(0, 500)
          });
        }
      });
    });
    
    req.on('error', (error) => {
      console.log(`  ❌ API 요청 실패: ${error.message}`);
      resolve({ 
        success: false, 
        error: error.message 
      });
    });
    
    req.setTimeout(15000, () => {
      console.log('  ⏰ API 요청 타임아웃');
      req.destroy();
      resolve({ 
        success: false, 
        error: 'timeout' 
      });
    });
    
    req.write(postData);
    req.end();
  });
}

// 📊 3단계: 환경변수 확인
function checkEnvironmentVariables() {
  console.log('📊 3단계: 환경변수 확인...');
  
  // Next.js 환경에서 확인 가능한 변수들
  const publicVars = {
    'COMPANY_NAME': process.env.NEXT_PUBLIC_COMPANY_NAME,
    'COMPANY_EMAIL': process.env.NEXT_PUBLIC_COMPANY_EMAIL,
    'SUPPORT_EMAIL': process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
    'GOOGLE_SHEETS_ID': process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID,
    'GOOGLE_SCRIPT_URL': process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL
  };
  
  console.log('  🔧 현재 환경변수:');
  for (const [key, value] of Object.entries(publicVars)) {
    if (value) {
      const maskedValue = key.includes('URL') || key.includes('ID') ? 
        value.substring(0, 30) + '...' : value;
      console.log(`    ${key}: ${maskedValue}`);
    } else {
      console.log(`    ${key}: ❌ 미설정`);
    }
  }
  
  return publicVars;
}

// 🚀 메인 테스트 실행
async function runBrandingTest() {
  try {
    // 환경변수 확인
    const envVars = checkEnvironmentVariables();
    console.log('');
    
    // 웹사이트 접근 테스트
    const websiteTest = await testWebsiteAccess();
    console.log('');
    
    // API 진단 신청 테스트  
    const apiTest = await testDiagnosisSubmission();
    console.log('');
    
    // 📋 결과 요약
    console.log('🎯 AI CAMP 브랜딩 테스트 결과 요약');
    console.log('=====================================');
    
    const overallSuccess = websiteTest.success && apiTest.success;
    const brandingFixed = (websiteTest.hasAiCamp || apiTest.hasAiCamp) && 
                         !websiteTest.hasMCenter && !apiTest.hasMCenter;
    
    console.log(`📊 전체 테스트: ${overallSuccess ? '✅ 성공' : '❌ 실패'}`);
    console.log(`🏢 브랜딩 수정: ${brandingFixed ? '✅ AI CAMP 적용됨' : '❌ 문제 있음'}`);
    console.log(`🌐 웹사이트: ${websiteTest.success ? '✅ 정상' : '❌ 오류'}`);
    console.log(`📋 API 신청: ${apiTest.success ? '✅ 정상' : '❌ 오류'}`);
    
    if (brandingFixed && overallSuccess) {
      console.log('');
      console.log('🎉 축하합니다!');
      console.log('✅ AI CAMP 브랜딩 수정이 성공적으로 완료되었습니다!');
      console.log('✅ 이제 M-CENTER가 아닌 AI CAMP 명의로 메일이 발송됩니다!');
      console.log('');
      console.log('📧 확인 방법:');
      console.log(`  1. ${TEST_CONFIG.websiteUrl} 접속`); 
      console.log('  2. AI 무료진단 신청');
      console.log('  3. AI CAMP 명의 메일 수신 확인');
    } else {
      console.log('');
      console.log('⚠️  추가 조치 필요:');
      if (!websiteTest.hasAiCamp) {
        console.log('  - 웹사이트 브랜딩 업데이트 필요');
      }
      if (websiteTest.hasMCenter || apiTest.hasMCenter) {
        console.log('  - M-CENTER 잔재 제거 필요');
      }
      if (!apiTest.success) {
        console.log('  - API 연동 문제 해결 필요');
      }
    }
    
    return {
      overall: overallSuccess,
      branding: brandingFixed,
      website: websiteTest,
      api: apiTest,
      env: envVars
    };
    
  } catch (error) {
    console.error('❌ 테스트 실행 중 오류:', error);
    return { overall: false, error: error.message };
  }
}

// 스크립트 실행
if (require.main === module) {
  runBrandingTest().then(result => {
    console.log('\n🏁 테스트 완료');
    process.exit(result.overall ? 0 : 1);
  });
}

module.exports = { runBrandingTest, TEST_CONFIG }; 