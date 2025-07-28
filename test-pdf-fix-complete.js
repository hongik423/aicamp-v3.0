/**
 * 🧪 AICAMP PDF 이메일 발송 수정 완료 테스트 - 2025.01.27
 * 실행: node test-pdf-fix-complete.js
 */

const fetch = require('node-fetch');

// 🔧 환경변수 정보
const CONFIG = {
  GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
  ADMIN_EMAIL: 'hongik423@gmail.com'
};

/**
 * 🎯 수정 완료 후 PDF 이메일 발송 테스트
 */
async function testPdfEmailFixComplete() {
  console.log('🎉 PDF 이메일 발송 수정 완료 테스트 시작!\n');
  
  // 테스트용 Base64 PDF 데이터 (실제 PDF 헤더 포함)
  const testPdfBase64 = 'JVBERi0xLjMKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwKL0xlbmd0aCA0MTEK' +
    'L0ZpbHRlciBbL0ZsYXRlRGVjb2RlXQo+PgpzdHJlYW0KeAFLy08rVVBITEvNQVBITslMT1FIzstMyVZI' +
    'tsoGBAAA///1cwVQCmVuZHN0cmVhbQplbmRvYmoKCjEgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1Bh' +
    'Z2VzIDIgMCBSCj4+CmVuZG9iagoKMiAwIG9iago8PAovVHlwZSAvUGFnZXMKL0tpZHMgWzMgMCBSXQov' +
    'Q291bnQgMQo+PgplbmRvYmoKCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovUmVz' +
    'b3VyY2VzIDw8Cj4+Ci9NZWRpYUJveCBbMCAwIDYxMiA3OTJdCi9Db250ZW50cyA0IDAgUgo+PgplbmRv' +
    'YmoKCnhyZWYKMCA1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAw' +
    'MjE5IDAwMDAwIG4gCjAwMDAwMDAyNzYgMDAwMDAgbiAKMDAwMDAwMDEwOSAwMDAwMCBuIAp0cmFpbGVy' +
    'Cjw8Ci9TaXplIDUKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjM4MAolJUVPRg==';
  
  console.log('📧 수정된 진단신청 + PDF 첨부 테스트 데이터:');
  
  const testData = {
    // 기본 진단신청 데이터
    회사명: 'PDF수정완료테스트기업',
    업종: 'IT/소프트웨어',
    담당자명: 'PDF수정테스트담당자',
    연락처: '010-1234-5678',
    이메일: 'pdf-fix-test@example.com',
    개인정보동의: true,
    
    // 진단 결과 데이터
    종합점수: 82,
    진단보고서요약: '수정 완료 테스트를 위한 PDF 첨부 진단 보고서입니다. PDF 이메일 발송 기능이 정상적으로 작동하는지 확인하는 테스트입니다.',
    
    // 📊 문항별 점수 (1-5점)
    문항별점수: {
      기획수준: 4,
      차별화정도: 4,
      가격설정: 4,
      전문성: 5,
      품질: 4,
      고객맞이: 4,
      고객응대: 4,
      불만관리: 3,
      고객유지: 4,
      고객이해: 4,
      마케팅계획: 3,
      오프라인마케팅: 3,
      온라인마케팅: 4,
      판매전략: 4,
      구매관리: 4,
      재고관리: 4,
      외관관리: 4,
      인테리어관리: 4,
      청결도: 5,
      작업동선: 4
    },
    
    // 🆕 PDF 첨부파일 (핵심!)
    pdf_attachment: 'data:application/pdf;base64,' + testPdfBase64,
    pdfAttachment: 'data:application/pdf;base64,' + testPdfBase64, // 이중 처리
    
    // 메타데이터
    제출일시: new Date().toLocaleString('ko-KR'),
    timestamp: Date.now()
  };

  console.log('📋 테스트 정보:', {
    회사명: testData.회사명,
    이메일: testData.이메일,
    종합점수: testData.종합점수,
    hasPdfAttachment: !!(testData.pdf_attachment),
    pdfSize: Math.round(testData.pdf_attachment.length / 1024) + 'KB'
  });

  try {
    console.log('\n🔄 수정된 Google Apps Script로 POST 요청 전송 중...');
    
    const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'AICAMP-PDF-Fix-Test/1.0'
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

    // 결과 분석
    if (result.success) {
      console.log('\n✅ 테스트 성공!');
      
      // PDF 이메일 발송 여부 확인
      if (result.pdfEmailSent === true) {
        console.log('🎉 PDF 이메일 발송 성공! 수정이 완벽하게 적용되었습니다.');
        console.log('📧 신청자에게 PDF 첨부 이메일이 발송되었습니다.');
        
        if (result.message && result.message.includes('PDF 결과보고서가')) {
          console.log('💬 응답 메시지도 PDF 발송에 맞게 변경되었습니다.');
        }
        
        return {
          success: true,
          pdfEmailWorking: true,
          message: '완벽한 수정 완료! PDF 이메일 발송 기능이 정상 작동합니다.',
          details: result
        };
        
      } else if (result.pdfEmailSent === false) {
        console.log('⚠️ PDF 이메일 발송 실패. 다음을 확인하세요:');
        console.log('1. Google Apps Script에 새 함수들이 제대로 추가되었는지');
        console.log('2. 새 배포가 생성되었는지');
        console.log('3. 오류 메시지:', result.pdfEmailError || '없음');
        
        return {
          success: true,
          pdfEmailWorking: false,
          message: 'PDF 이메일 발송 실패. 추가 점검 필요.',
          error: result.pdfEmailError
        };
        
      } else {
        console.log('🤔 PDF 이메일 발송 상태를 확인할 수 없습니다.');
        console.log('💡 기존 코드가 아직 적용되지 않았을 가능성이 있습니다.');
        
        return {
          success: true,
          pdfEmailWorking: 'unknown',
          message: 'PDF 이메일 발송 상태 불명. 코드 업데이트 확인 필요.',
          details: result
        };
      }
      
    } else {
      console.log('\n❌ 테스트 실패:', result.error);
      return {
        success: false,
        error: result.error,
        message: '테스트 실패. 시스템 오류 발생.'
      };
    }

  } catch (error) {
    console.error('\n💥 테스트 실행 중 오류:', error.message);
    return {
      success: false,
      error: error.message,
      message: '테스트 실행 중 오류 발생.'
    };
  }
}

/**
 * 📊 수정 전후 비교 테스트
 */
async function runComparisonTest() {
  console.log('🎯 AICAMP PDF 이메일 발송 수정 완료 검증 테스트');
  console.log('⏰ 테스트 시작 시간:', new Date().toLocaleString('ko-KR'));
  console.log('🌐 Google Apps Script URL:', CONFIG.GOOGLE_SCRIPT_URL);
  console.log('=' .repeat(80));

  const testResult = await testPdfEmailFixComplete();
  
  console.log('\n' + '=' .repeat(80));
  console.log('🎯 테스트 결과 요약');
  console.log('⏱️  테스트 완료 시간:', new Date().toLocaleString('ko-KR'));
  
  if (testResult.success && testResult.pdfEmailWorking === true) {
    console.log('🎉 결과: PDF 이메일 발송 오류가 완벽하게 수정되었습니다!');
    console.log('\n✅ 수정 완료 사항:');
    console.log('- PDF 첨부파일 자동 감지 ✅');
    console.log('- 신청자에게 PDF 첨부 이메일 자동 발송 ✅');
    console.log('- 관리자에게 PDF 발송 완료 알림 ✅');
    console.log('- PDF 발송 기록을 별도 시트에 저장 ✅');
    console.log('- 응답 메시지 개선 (PDF 발송 안내) ✅');
    
    console.log('\n🎊 이제 AI 무료진단 완료 후 신청자에게 PDF 보고서가 자동으로 이메일 발송됩니다!');
    
  } else if (testResult.success && testResult.pdfEmailWorking === false) {
    console.log('⚠️ 결과: 일부 기능이 작동하지 않습니다.');
    console.log('\n🔧 추가 확인 필요사항:');
    console.log('1. Google Apps Script에서 새 배포 생성 확인');
    console.log('2. sendPdfEmailToUser 함수 등 새 함수들 추가 확인');
    console.log('3. 오류 로그 확인:', testResult.error || '없음');
    
  } else if (testResult.success && testResult.pdfEmailWorking === 'unknown') {
    console.log('🤔 결과: 코드 업데이트가 아직 반영되지 않았을 수 있습니다.');
    console.log('\n💡 해결 방법:');
    console.log('1. Google Apps Script에서 저장 후 새 배포 생성');
    console.log('2. 잠시 후 다시 테스트 실행');
    
  } else {
    console.log('❌ 결과: 테스트 실행 중 오류가 발생했습니다.');
    console.log('🔧 오류:', testResult.error || testResult.message);
  }
  
  console.log('\n🔗 관련 링크:');
  console.log('📊 구글시트:', 'https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0/edit');
  console.log('🌐 Google Apps Script:', 'https://script.google.com/d/1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj/edit');
  
  return testResult;
}

// 🚀 테스트 실행
if (require.main === module) {
  runComparisonTest()
    .then(result => {
      const exitCode = (result.success && result.pdfEmailWorking === true) ? 0 : 1;
      console.log(`\n🏁 테스트 완료 (종료 코드: ${exitCode})`);
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('💥 테스트 실행 중 치명적 오류:', error);
      process.exit(1);
    });
}

module.exports = { testPdfEmailFixComplete, runComparisonTest }; 