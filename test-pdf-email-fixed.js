/**
 * 🧪 AICAMP PDF 이메일 발송 긴급 테스트 - 2025.01.27
 * 실행: node test-pdf-email-fixed.js
 */

const fetch = require('node-fetch');

// 🔧 환경변수 정보
const CONFIG = {
  GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
  ADMIN_EMAIL: 'hongik423@gmail.com'
};

/**
 * 📧 PDF 이메일 발송 오류 테스트
 */
async function testPdfEmailSendingError() {
  console.log('🚨 PDF 이메일 발송 오류 테스트 시작...\n');
  
  // 🔴 현재 문제점: sendDiagnosisPdfEmail 액션이 처리되지 않음
  console.log('❌ 예상 오류: sendDiagnosisPdfEmail 액션을 처리하는 코드가 Google Apps Script에 없음');
  
  // 테스트용 간단한 Base64 PDF 데이터 (실제 PDF가 아닌 더미 데이터)
  const testPdfBase64 = 'JVBERi0xLjMKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwKL0xlbmd0aCA0MTEK';
  
  const testData = {
    action: 'sendDiagnosisPdfEmail',
    폼타입: 'AI_진단결과_PDF발송',
    
    // 수신자 정보
    to_email: 'test@example.com',
    to_name: '테스트고객',
    company_name: 'PDF발송테스트기업',
    
    // PDF 첨부파일
    pdf_attachment: 'data:application/pdf;base64,' + testPdfBase64,
    pdf_filename: 'AI진단보고서_테스트.pdf',
    
    // 이메일 내용
    diagnosis_date: new Date().toLocaleString('ko-KR'),
    total_score: 85,
    overall_grade: 'B+',
    industry_type: 'IT/소프트웨어',
    
    // 컨설턴트 정보
    consultant_name: '이후경 교장 (경영지도사)',
    consultant_phone: '010-9251-9743',
    consultant_email: CONFIG.ADMIN_EMAIL,
    
    // 메타데이터
    제출일시: new Date().toLocaleString('ko-KR'),
    timestamp: Date.now()
  };

  console.log('📝 전송할 데이터:', {
    action: testData.action,
    to_email: testData.to_email,
    company_name: testData.company_name,
    pdf_size: Math.round(testData.pdf_attachment.length / 1024) + 'KB'
  });

  try {
    console.log('\n🔄 Google Apps Script로 POST 요청 전송 중...');
    
    const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'AICAMP-PDF-Test-Agent/1.0'
      },
      body: JSON.stringify(testData)
    });

    console.log('📡 응답 상태:', response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    
    console.log('\n📊 응답 결과:');
    console.log(JSON.stringify(result, null, 2));

    if (result.success) {
      console.log('\n✅ 예상외로 성공했습니다! PDF 이메일 발송이 정상 작동합니다.');
      return result;
    } else {
      console.log('\n❌ 예상된 오류 발생:', result.error);
      
      // 오류 분석
      if (result.error && result.error.includes('sendDiagnosisPdfEmail')) {
        console.log('\n🎯 오류 원인 확인: sendDiagnosisPdfEmail 액션을 처리하는 코드가 없습니다.');
        console.log('💡 해결방안: Google Apps Script에 PDF 이메일 발송 기능을 추가해야 합니다.');
      } else if (result.error && result.error.includes('PDF')) {
        console.log('\n🎯 오류 원인 확인: PDF 처리 관련 오류입니다.');
        console.log('💡 해결방안: Base64 PDF 데이터 처리 로직을 추가해야 합니다.');
      } else {
        console.log('\n🤔 알 수 없는 오류가 발생했습니다. 추가 분석이 필요합니다.');
      }
      
      return result;
    }

  } catch (error) {
    console.error('\n💥 테스트 실행 중 오류:', error.message);
    
    if (error.message.includes('404')) {
      console.log('\n🎯 오류 원인: Google Apps Script URL이 잘못되었습니다.');
    } else if (error.message.includes('403')) {
      console.log('\n🎯 오류 원인: Google Apps Script 권한 문제입니다.');
    } else if (error.message.includes('500')) {
      console.log('\n🎯 오류 원인: Google Apps Script 내부 오류입니다.');
    }
    
    return { success: false, error: error.message };
  }
}

/**
 * 📊 현재 시스템 상태 확인
 */
async function checkCurrentSystemStatus() {
  console.log('🔍 현재 시스템 상태 확인 중...\n');
  
  try {
    const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
      method: 'GET',
      headers: {
        'User-Agent': 'AICAMP-Status-Check/1.0'
      }
    });

    console.log('📡 GET 응답 상태:', response.status, response.statusText);

    if (response.ok) {
      const result = await response.json();
      console.log('✅ 시스템 정상 작동 중');
      console.log('📋 지원되는 기능들:');
      if (result.features) {
        result.features.forEach(feature => {
          console.log(`   - ${feature}`);
        });
      }
      
      // PDF 이메일 발송 기능 지원 여부 확인
      const supportsPdfEmail = result.features && 
        result.features.some(f => f.includes('PDF') || f.includes('이메일'));
      
      if (supportsPdfEmail) {
        console.log('\n✅ PDF 이메일 발송 기능이 지원됩니다.');
      } else {
        console.log('\n❌ PDF 이메일 발송 기능이 지원되지 않습니다.');
        console.log('💡 해결 필요: PDF 이메일 발송 기능을 Google Apps Script에 추가해야 합니다.');
      }
      
      return result;
    } else {
      console.log('⚠️ 시스템 상태 확인 실패');
      return { success: false, status: response.status };
    }

  } catch (error) {
    console.error('❌ 시스템 상태 확인 오류:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * 🎯 메인 진단 실행
 */
async function runDiagnosis() {
  console.log('🚨 AICAMP PDF 이메일 발송 오류 진단 시작');
  console.log('⏰ 진단 시작 시간:', new Date().toLocaleString('ko-KR'));
  console.log('🌐 Google Apps Script URL:', CONFIG.GOOGLE_SCRIPT_URL);
  console.log('=' .repeat(80));

  // 1. 현재 시스템 상태 확인
  console.log('📍 1단계: 현재 시스템 상태 확인');
  const systemStatus = await checkCurrentSystemStatus();
  
  console.log('\n' + '=' .repeat(80));
  
  // 2. PDF 이메일 발송 오류 테스트
  console.log('📍 2단계: PDF 이메일 발송 오류 테스트');
  const pdfTestResult = await testPdfEmailSendingError();
  
  console.log('\n' + '=' .repeat(80));
  
  // 3. 진단 결과 요약
  console.log('🎯 진단 결과 요약');
  console.log('⏱️  진단 완료 시간:', new Date().toLocaleString('ko-KR'));
  
  if (systemStatus.success && pdfTestResult.success) {
    console.log('✅ 결과: PDF 이메일 발송 기능이 정상 작동합니다!');
    console.log('🎉 문제가 해결되었거나 이미 수정되었습니다.');
  } else {
    console.log('❌ 결과: PDF 이메일 발송 기능에 문제가 있습니다.');
    console.log('\n🔧 필요한 수정사항:');
    console.log('1. Google Apps Script에 sendDiagnosisPdfEmail 액션 처리 코드 추가');
    console.log('2. Base64 PDF 데이터를 Blob으로 변환하는 함수 추가');
    console.log('3. 신청자에게 PDF 첨부 이메일을 발송하는 함수 추가');
    console.log('4. 관리자에게 발송 완료/오류 알림을 보내는 함수 추가');
    console.log('5. PDF 발송 기록을 구글시트에 저장하는 기능 추가');
    
    console.log('\n💡 해결 방안:');
    console.log('- docs/AICAMP_PDF_EMAIL_ADDON_FIX.js 파일의 코드를 Google Apps Script에 추가');
    console.log('- Google Apps Script에서 새 배포를 생성하여 변경사항 적용');
    console.log('- testPdfEmailSending() 함수로 수정 후 테스트 실행');
  }
  
  console.log('\n📊 상세 진단 결과:');
  console.log('시스템 상태:', systemStatus.success ? '정상' : '오류');
  console.log('PDF 이메일 발송:', pdfTestResult.success ? '정상' : '오류');
  
  console.log('\n🔗 관련 링크:');
  console.log('📊 구글시트:', 'https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0/edit');
  console.log('🌐 Google Apps Script:', 'https://script.google.com/d/1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj/edit');
  
  return {
    systemStatus,
    pdfTestResult,
    diagnosis: {
      timestamp: new Date().toLocaleString('ko-KR'),
      success: systemStatus.success && pdfTestResult.success,
      issues: systemStatus.success && pdfTestResult.success ? [] : [
        'sendDiagnosisPdfEmail 액션 처리 코드 누락',
        'Base64 PDF 데이터 처리 함수 누락', 
        '신청자 PDF 이메일 발송 함수 누락',
        '관리자 알림 함수 누락',
        'PDF 발송 기록 저장 기능 누락'
      ]
    }
  };
}

// 🚀 진단 실행
if (require.main === module) {
  runDiagnosis()
    .then(results => {
      const exitCode = results.diagnosis.success ? 0 : 1;
      console.log(`\n🏁 진단 완료 (종료 코드: ${exitCode})`);
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('💥 진단 실행 중 치명적 오류:', error);
      process.exit(1);
    });
}

module.exports = { runDiagnosis, testPdfEmailSendingError, checkCurrentSystemStatus }; 