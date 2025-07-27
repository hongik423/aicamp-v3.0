/**
 * ================================================================================
 * AI CAMP 시스템 종합 진단 및 테스트 스크립트
 * ================================================================================
 * 
 * 🎯 목적:
 * - 상담신청, 무료진단 시스템 전체 오류 진단
 * - 302 오류 원인 분석 및 해결방안 제시
 * - 구글시트 데이터 저장 테스트
 * - 이메일 발송 시스템 테스트
 * - PDF 첨부 이메일 발송 테스트
 * 
 * 🔧 실행방법: node test-ai-camp-system-comprehensive.js
 */

const axios = require('axios');
const fs = require('fs');

// ================================================================================
// 🔧 설정 및 환경변수
// ================================================================================

const CONFIG = {
  // Google Apps Script 웹앱 URL (현재 설정된 URL)
  GOOGLE_APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB/exec',
  
  // 테스트용 이메일 (실제 테스트에서 사용)
  TEST_EMAIL: 'hongik423@gmail.com',
  TEST_NAME: '테스트사용자',
  TEST_COMPANY: 'AI CAMP 테스트',
  
  // 타임아웃 설정
  TIMEOUT: 30000, // 30초
  
  // 진단 점수 테스트 데이터
  TEST_DIAGNOSIS_SCORES: {
    기획수준: 4,
    차별화정도: 3,
    가격설정: 4,
    전문성: 5,
    품질: 4,
    고객맞이: 3,
    고객응대: 4,
    불만관리: 3,
    고객유지: 4,
    고객이해: 3,
    마케팅계획: 4,
    오프라인마케팅: 3,
    온라인마케팅: 4,
    판매전략: 4,
    구매관리: 3,
    재고관리: 4,
    외관관리: 4,
    인테리어관리: 3,
    청결도: 5,
    작업동선: 4
  }
};

// ================================================================================
// 🧪 테스트 함수들
// ================================================================================

/**
 * 🏥 1. 시스템 건강상태 점검
 */
async function testSystemHealth() {
  console.log('🏥 1. 시스템 건강상태 점검 시작...');
  
  try {
    const response = await axios.get(CONFIG.GOOGLE_APPS_SCRIPT_URL, {
      timeout: CONFIG.TIMEOUT,
      params: {
        action: 'health_check'
      }
    });
    
    console.log('✅ 시스템 접근 성공:', {
      status: response.status,
      contentType: response.headers['content-type'],
      dataLength: response.data ? JSON.stringify(response.data).length : 0
    });
    
    return {
      success: true,
      status: response.status,
      data: response.data,
      message: '시스템 접근 정상'
    };
    
  } catch (error) {
    console.error('❌ 시스템 접근 실패:', {
      status: error.response?.status,
      message: error.message,
      url: CONFIG.GOOGLE_APPS_SCRIPT_URL
    });
    
    return {
      success: false,
      error: error.message,
      status: error.response?.status,
      is302Error: error.response?.status === 302,
      message: error.response?.status === 302 ? '302 리다이렉트 오류 감지' : '시스템 접근 실패'
    };
  }
}

/**
 * 📞 2. 상담신청 테스트
 */
async function testConsultationSubmission() {
  console.log('📞 2. 상담신청 테스트 시작...');
  
  const testData = {
    상담유형: '일반상담',
    성명: CONFIG.TEST_NAME,
    연락처: '010-1234-5678',
    이메일: CONFIG.TEST_EMAIL,
    회사명: CONFIG.TEST_COMPANY,
    직책: '테스트담당자',
    상담분야: 'AI 자동화',
    문의내용: 'AI CAMP 시스템 테스트용 상담신청입니다.',
    희망상담시간: '오전 10시-12시',
    개인정보동의: true,
    진단연계여부: 'N',
    timestamp: new Date().toISOString()
  };
  
  try {
    const response = await axios.post(CONFIG.GOOGLE_APPS_SCRIPT_URL, testData, {
      timeout: CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ 상담신청 성공:', {
      status: response.status,
      responseData: response.data
    });
    
    return {
      success: true,
      status: response.status,
      data: response.data,
      message: '상담신청 정상 처리'
    };
    
  } catch (error) {
    console.error('❌ 상담신청 실패:', {
      status: error.response?.status,
      message: error.message,
      responseData: error.response?.data
    });
    
    return {
      success: false,
      error: error.message,
      status: error.response?.status,
      is302Error: error.response?.status === 302,
      message: '상담신청 처리 실패'
    };
  }
}

/**
 * 📊 3. 무료진단 테스트
 */
async function testDiagnosisSubmission() {
  console.log('📊 3. 무료진단 테스트 시작...');
  
  // 종합점수 계산
  const totalScore = Object.values(CONFIG.TEST_DIAGNOSIS_SCORES).reduce((sum, score) => sum + score, 0);
  
  const testData = {
    회사명: CONFIG.TEST_COMPANY,
    업종: '정보통신업',
    사업담당자: CONFIG.TEST_NAME,
    직원수: '10-50명',
    사업성장단계: '성장기',
    주요고민사항: 'AI 도입',
    예상혜택: '업무 자동화',
    진행사업장: '서울',
    담당자명: CONFIG.TEST_NAME,
    연락처: '010-1234-5678',
    이메일: CONFIG.TEST_EMAIL,
    개인정보동의: true,
    종합점수: totalScore,
    문항별점수: CONFIG.TEST_DIAGNOSIS_SCORES,
    진단보고서요약: 'AI CAMP 시스템 테스트를 위한 진단보고서입니다. 전체적으로 양호한 수준의 디지털 역량을 보유하고 있으며, AI 도입을 통한 업무 자동화 효과를 기대할 수 있습니다.',
    추천서비스: 'AI 프로세스 자동화 컨설팅',
    timestamp: new Date().toISOString()
  };
  
  try {
    const response = await axios.post(CONFIG.GOOGLE_APPS_SCRIPT_URL, testData, {
      timeout: CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ 무료진단 성공:', {
      status: response.status,
      responseData: response.data,
      totalScore: totalScore,
      scoreCount: Object.keys(CONFIG.TEST_DIAGNOSIS_SCORES).length
    });
    
    return {
      success: true,
      status: response.status,
      data: response.data,
      totalScore: totalScore,
      message: '무료진단 정상 처리'
    };
    
  } catch (error) {
    console.error('❌ 무료진단 실패:', {
      status: error.response?.status,
      message: error.message,
      responseData: error.response?.data
    });
    
    return {
      success: false,
      error: error.message,
      status: error.response?.status,
      is302Error: error.response?.status === 302,
      message: '무료진단 처리 실패'
    };
  }
}

/**
 * 📧 4. PDF 이메일 발송 테스트
 */
async function testPdfEmailSending() {
  console.log('📧 4. PDF 이메일 발송 테스트 시작...');
  
  // 테스트용 PDF 데이터 (Base64 인코딩된 더미 PDF)
  const testPdfBase64 = 'JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgNCAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0xlbmd0aCA0NAo+PgpzdHJlYW0KQVQKL0YxIDEyIFRmCjcyIDcyMCBUZAooVGVzdCBQREYpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgo=';
  
  const testData = {
    to_email: CONFIG.TEST_EMAIL,
    to_name: CONFIG.TEST_NAME,
    company_name: CONFIG.TEST_COMPANY,
    total_score: 75,
    overall_grade: 'B+',
    industry_type: '정보통신업',
    pdf_attachment: testPdfBase64,
    pdf_filename: `AI_진단보고서_${CONFIG.TEST_COMPANY}_${new Date().toISOString().split('T')[0]}.pdf`,
    consultant_name: '이후경 경영지도사',
    consultant_phone: '010-9251-9743',
    consultant_email: 'hongik423@gmail.com',
    diagnosis_date: new Date().toLocaleDateString('ko-KR')
  };
  
  try {
    const response = await axios.post(CONFIG.GOOGLE_APPS_SCRIPT_URL, testData, {
      timeout: CONFIG.TIMEOUT * 2, // PDF 처리는 시간이 더 걸릴 수 있음
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ PDF 이메일 발송 성공:', {
      status: response.status,
      responseData: response.data,
      pdfSize: Math.round(testPdfBase64.length / 1024) + 'KB'
    });
    
    return {
      success: true,
      status: response.status,
      data: response.data,
      pdfSize: Math.round(testPdfBase64.length / 1024) + 'KB',
      message: 'PDF 이메일 발송 정상'
    };
    
  } catch (error) {
    console.error('❌ PDF 이메일 발송 실패:', {
      status: error.response?.status,
      message: error.message,
      responseData: error.response?.data
    });
    
    return {
      success: false,
      error: error.message,
      status: error.response?.status,
      is302Error: error.response?.status === 302,
      message: 'PDF 이메일 발송 실패'
    };
  }
}

/**
 * 🆘 5. 302 오류 진단
 */
async function diagnose302Error() {
  console.log('🆘 5. 302 오류 진단 시작...');
  
  const diagnosis = {
    timestamp: new Date().toISOString(),
    currentUrl: CONFIG.GOOGLE_APPS_SCRIPT_URL,
    tests: {},
    issues: [],
    recommendations: []
  };
  
  // URL 형식 검사
  const urlPattern = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/;
  diagnosis.tests.urlFormat = {
    valid: urlPattern.test(CONFIG.GOOGLE_APPS_SCRIPT_URL),
    expected: 'https://script.google.com/macros/s/[DEPLOYMENT_ID]/exec',
    actual: CONFIG.GOOGLE_APPS_SCRIPT_URL
  };
  
  if (!diagnosis.tests.urlFormat.valid) {
    diagnosis.issues.push('웹앱 URL 형식이 올바르지 않습니다.');
    diagnosis.recommendations.push('새로운 웹앱 배포를 생성하여 올바른 URL을 받으세요.');
  }
  
  // Deployment ID 추출 및 검사
  const deploymentIdMatch = CONFIG.GOOGLE_APPS_SCRIPT_URL.match(/\/s\/([A-Za-z0-9_-]+)\//);
  const deploymentId = deploymentIdMatch ? deploymentIdMatch[1] : null;
  
  diagnosis.tests.deploymentId = {
    extracted: deploymentId,
    valid: deploymentId && deploymentId.startsWith('AKfycb') && deploymentId.length > 70,
    length: deploymentId ? deploymentId.length : 0
  };
  
  if (!diagnosis.tests.deploymentId.valid) {
    diagnosis.issues.push('Deployment ID가 유효하지 않습니다.');
    diagnosis.recommendations.push('Google Apps Script에서 새 배포를 생성하세요.');
  }
  
  // 간단한 GET 요청 테스트
  try {
    const response = await axios.get(CONFIG.GOOGLE_APPS_SCRIPT_URL, {
      timeout: 10000,
      maxRedirects: 0 // 리다이렉트 방지
    });
    
    diagnosis.tests.getRequest = {
      success: true,
      status: response.status,
      contentType: response.headers['content-type']
    };
    
  } catch (error) {
    diagnosis.tests.getRequest = {
      success: false,
      status: error.response?.status,
      error: error.message,
      is302: error.response?.status === 302
    };
    
    if (error.response?.status === 302) {
      diagnosis.issues.push('302 리다이렉트 오류가 발생했습니다.');
      diagnosis.recommendations.push('웹앱 배포를 다시 활성화하고 "모든 사용자" 권한으로 설정하세요.');
    }
  }
  
  console.log('🆘 302 오류 진단 완료:', diagnosis);
  return diagnosis;
}

// ================================================================================
// 🎯 메인 실행 함수
// ================================================================================

/**
 * 전체 시스템 종합 테스트 실행
 */
async function runComprehensiveTest() {
  console.log('================================================================================');
  console.log('🔥 AI CAMP 시스템 종합 진단 및 테스트 시작');
  console.log('================================================================================');
  console.log('📅 테스트 시간:', new Date().toLocaleString('ko-KR'));
  console.log('🌐 테스트 URL:', CONFIG.GOOGLE_APPS_SCRIPT_URL);
  console.log('📧 테스트 이메일:', CONFIG.TEST_EMAIL);
  console.log('');
  
  const testResults = {
    timestamp: new Date().toISOString(),
    url: CONFIG.GOOGLE_APPS_SCRIPT_URL,
    tests: {}
  };
  
  try {
    // 1. 시스템 건강상태 점검
    testResults.tests.healthCheck = await testSystemHealth();
    console.log('');
    
    // 2. 상담신청 테스트
    testResults.tests.consultation = await testConsultationSubmission();
    console.log('');
    
    // 3. 무료진단 테스트
    testResults.tests.diagnosis = await testDiagnosisSubmission();
    console.log('');
    
    // 4. PDF 이메일 발송 테스트
    testResults.tests.pdfEmail = await testPdfEmailSending();
    console.log('');
    
    // 5. 302 오류 진단
    testResults.tests.error302Diagnosis = await diagnose302Error();
    console.log('');
    
    // ================================================================================
    // 📊 결과 요약
    // ================================================================================
    
    console.log('================================================================================');
    console.log('📊 AI CAMP 시스템 테스트 결과 요약');
    console.log('================================================================================');
    
    const successCount = Object.values(testResults.tests).filter(test => test.success).length;
    const totalCount = Object.keys(testResults.tests).length - 1; // 진단은 제외
    const error302Count = Object.values(testResults.tests).filter(test => test.is302Error).length;
    
    console.log(`✅ 성공: ${successCount}/${totalCount}`);
    console.log(`❌ 실패: ${totalCount - successCount}/${totalCount}`);
    console.log(`🆘 302 오류: ${error302Count}개`);
    console.log('');
    
    // 각 테스트 결과 출력
    Object.entries(testResults.tests).forEach(([testName, result]) => {
      const status = result.success ? '✅' : (result.is302Error ? '🆘' : '❌');
      console.log(`${status} ${testName}: ${result.message}`);
    });
    
    console.log('');
    
    // ================================================================================
    // 🔧 문제 해결 가이드
    // ================================================================================
    
    if (error302Count > 0) {
      console.log('================================================================================');
      console.log('🆘 302 오류 긴급 해결 가이드');
      console.log('================================================================================');
      
      const diagnosis = testResults.tests.error302Diagnosis;
      if (diagnosis.issues.length > 0) {
        console.log('📋 발견된 문제점:');
        diagnosis.issues.forEach((issue, index) => {
          console.log(`${index + 1}. ${issue}`);
        });
        console.log('');
      }
      
      if (diagnosis.recommendations.length > 0) {
        console.log('🔧 권장 해결방법:');
        diagnosis.recommendations.forEach((rec, index) => {
          console.log(`${index + 1}. ${rec}`);
        });
        console.log('');
      }
      
      console.log('🚨 긴급 조치사항:');
      console.log('1. Google Apps Script 에디터 열기');
      console.log('   → https://script.google.com/home');
      console.log('2. "배포" → "웹 앱으로 배포" 클릭');
      console.log('3. "새 배포" 생성 (기존 배포 수정 아님!)');
      console.log('4. 액세스 권한: "모든 사용자"로 설정');
      console.log('5. "배포" 버튼 클릭하여 활성화');
      console.log('6. 새로 생성된 웹앱 URL을 환경변수에 업데이트');
      console.log('');
    }
    
    // ================================================================================
    // 💾 결과 저장
    // ================================================================================
    
    const reportFileName = `ai-camp-system-test-report-${new Date().toISOString().split('T')[0]}.json`;
    fs.writeFileSync(reportFileName, JSON.stringify(testResults, null, 2), 'utf8');
    console.log(`📄 상세 테스트 결과가 저장되었습니다: ${reportFileName}`);
    
    console.log('');
    console.log('================================================================================');
    console.log('🎯 AI CAMP 시스템 종합 진단 완료');
    console.log('================================================================================');
    
    return testResults;
    
  } catch (error) {
    console.error('❌ 전체 테스트 실행 중 오류:', error);
    testResults.fatalError = error.message;
    return testResults;
  }
}

// ================================================================================
// 🚀 스크립트 실행
// ================================================================================

if (require.main === module) {
  runComprehensiveTest()
    .then(results => {
      const successRate = Object.values(results.tests).filter(test => test.success).length / 
                         (Object.keys(results.tests).length - 1) * 100;
      
      console.log(`\n🎯 최종 성공률: ${Math.round(successRate)}%`);
      
      if (successRate < 50) {
        console.log('🚨 시스템에 심각한 문제가 있습니다. 즉시 점검이 필요합니다.');
        process.exit(1);
      } else if (successRate < 80) {
        console.log('⚠️ 시스템에 일부 문제가 있습니다. 개선이 필요합니다.');
        process.exit(0);
      } else {
        console.log('✅ 시스템이 정상적으로 작동하고 있습니다.');
        process.exit(0);
      }
    })
    .catch(error => {
      console.error('❌ 테스트 실행 실패:', error);
      process.exit(1);
    });
}

module.exports = {
  runComprehensiveTest,
  testSystemHealth,
  testConsultationSubmission,
  testDiagnosisSubmission,
  testPdfEmailSending,
  diagnose302Error
}; 