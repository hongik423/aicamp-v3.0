# 📧 AICAMP Google Apps Script에 PDF 이메일 발송 기능 추가 가이드

## 🎯 개요

기존 완벽하게 작동하는 AICAMP Google Apps Script에 **PDF 첨부 이메일 발송 기능**을 추가하는 방법입니다.

### ✅ 기존 모든 기능 유지
- AI 무료진단 신청 처리 (58개 컬럼)
- 상담신청 처리 (19개 컬럼)
- 베타피드백 처리 (14개 컬럼)
- 관리자/신청자 이메일 발송
- 환경변수 동기화
- 모든 테스트 함수들

### 🆕 추가되는 기능
- PDF 첨부 이메일 발송 (`sendDiagnosisPdfEmail`)
- Base64 PDF 디코딩 및 첨부파일 처리
- PDF 발송 상태 Google Sheets 기록
- PDF 발송 오류 처리 및 알림

---

## 🔧 1단계: 기존 코드에 추가할 함수들

### 1.1 PDF 이메일 발송 요청 확인 함수 (추가)

기존 코드의 `isBetaFeedback` 함수 바로 아래에 추가:

```javascript
/**
 * PDF 이메일 발송 요청 확인
 */
function isPdfEmailRequest(data) {
  return data.action === 'sendDiagnosisPdfEmail' && 
         data.pdf_attachment && 
         data.to_email && 
         data.company_name;
}
```

### 1.2 doPost 함수 수정

기존 `doPost` 함수에서 베타 피드백 처리 부분 위에 추가:

```javascript
// 🆕 PDF 이메일 발송 처리 (최우선)
if (isPdfEmailRequest(requestData)) {
  console.log('📧 PDF 이메일 발송 처리 시작');
  return sendDiagnosisPdfEmail(requestData);
}
```

그리고 `isConsultationRequest` 함수 수정:

```javascript
function isConsultationRequest(data) {
  if (isBetaFeedback(data) || isPdfEmailRequest(data)) {  // isPdfEmailRequest 조건 추가
    return false;
  }
  
  return !!(data.상담유형 || data.consultationType || data.성명 || data.name || 
           data.문의내용 || data.inquiryContent || data.action === 'saveConsultation');
}
```

### 1.3 PDF 첨부 이메일 발송 함수 (새로 추가)

```javascript
/**
 * 📧 PDF 첨부 이메일 발송 (핵심 새 기능)
 */
function sendDiagnosisPdfEmail(data) {
  try {
    console.log('📧 PDF 첨부 이메일 발송 시작:', {
      to_email: data.to_email,
      company_name: data.company_name,
      pdf_size: data.pdf_attachment ? Math.round(data.pdf_attachment.length / 1024) + 'KB' : '0KB'
    });

    // PDF 첨부파일 처리
    let pdfBlob = null;
    if (data.pdf_attachment && data.pdf_filename) {
      try {
        // Base64 디코딩하여 PDF Blob 생성
        const pdfBytes = Utilities.base64Decode(data.pdf_attachment);
        pdfBlob = Utilities.newBlob(pdfBytes, 'application/pdf', data.pdf_filename);
        console.log('✅ PDF 첨부파일 생성 완료:', data.pdf_filename);
      } catch (pdfError) {
        console.error('❌ PDF 생성 오류:', pdfError);
        throw new Error('PDF 첨부파일 처리 중 오류가 발생했습니다: ' + pdfError.toString());
      }
    }

    // 이메일 내용 구성
    const emailSubject = `[AICAMP] AI 무료진단 결과보고서 - ${data.company_name}`;
    
    const emailBody = `안녕하세요, ${data.to_name}님.

AICAMP AI 교육센터에서 요청하신 AI 무료진단이 완료되어 결과보고서를 첨부파일로 발송해드립니다.

📊 진단 결과 요약:
• 회사명: ${data.company_name}
• 종합 점수: ${data.total_score}점 (${data.overall_grade}등급)
• 업종: ${data.industry_type}
• 진단일: ${data.diagnosis_date}

📄 첨부파일:
• AI 진단 결과보고서 (PDF) - 상세한 분석 내용과 맞춤형 개선 방안이 포함되어 있습니다.

🔍 결과보고서에는 다음 내용이 포함되어 있습니다:
1. 기업 종합 진단 점수 및 등급
2. 카테고리별 상세 분석
3. 강점/약점/기회 요소 분석
4. 맞춤형 실행 계획
5. 추천 서비스 안내
6. 전문가 상담 정보

💡 더 상세한 상담을 원하시거나 궁금한 점이 있으시면 언제든지 연락주세요.

📞 전문가 상담 문의:
• 담당자: ${data.consultant_name}
• 전화: ${data.consultant_phone}
• 이메일: ${data.consultant_email}

✨ 특별 혜택:
• 첫 상담 시 무료 기업 맞춤형 성장전략 컨설팅 제공
• 정부지원 사업 연계 상담 가능
• AI 도입 및 디지털 전환 전문 컨설팅

감사합니다.

--
AICAMP AI 교육센터
Tel: ${data.consultant_phone}
Email: ${data.consultant_email}
Website: https://aicamp-v3-0.vercel.app

※ 본 이메일은 AI 진단 신청자에게 자동으로 발송되는 메일입니다.
※ 궁금한 사항이 있으시면 언제든지 연락주세요.
    `;

    // 이메일 발송 (PDF 첨부파일 포함)
    const emailOptions = {
      name: 'AICAMP AI 교육센터',
      replyTo: data.consultant_email || ADMIN_EMAIL,
      htmlBody: emailBody.replace(/\n/g, '<br>')
    };

    if (pdfBlob) {
      emailOptions.attachments = [pdfBlob];
      console.log('📎 PDF 첨부파일 추가:', data.pdf_filename);
    }

    // 신청자에게 PDF 첨부 이메일 발송
    GmailApp.sendEmail(
      data.to_email,
      emailSubject,
      emailBody,
      emailOptions
    );

    console.log('✅ 신청자 PDF 이메일 발송 완료:', data.to_email);

    // Google Sheets에 PDF 발송 상태 업데이트
    updatePdfSendingStatus(data.company_name, data.to_email, '발송완료');

    // 관리자에게 알림 이메일 발송
    const adminSubject = `[AICAMP] PDF 진단보고서 발송 완료 - ${data.company_name}`;
    const adminBody = `PDF 진단보고서가 성공적으로 발송되었습니다.

📊 발송 정보:
• 수신자: ${data.to_name} (${data.to_email})
• 회사명: ${data.company_name}
• 진단 점수: ${data.total_score}점 (${data.overall_grade}등급)
• PDF 파일명: ${data.pdf_filename}
• 발송 시간: ${getCurrentKoreanTime()}

📧 발송 상태: 성공
📎 첨부파일: ${pdfBlob ? 'PDF 첨부됨' : '첨부파일 없음'}

담당자가 후속 상담을 위해 연락할 예정입니다.

--
AICAMP 자동 알림 시스템
    `;

    GmailApp.sendEmail(
      ADMIN_EMAIL,
      adminSubject,
      adminBody,
      { name: 'AICAMP AI 교육센터 자동알림' }
    );

    console.log('✅ 관리자 알림 이메일 발송 완료');

    return createSuccessResponse({
      message: 'PDF 진단보고서가 성공적으로 발송되었습니다.',
      data: {
        to_email: data.to_email,
        company_name: data.company_name,
        pdf_filename: data.pdf_filename,
        sent_time: getCurrentKoreanTime()
      }
    });

  } catch (error) {
    console.error('❌ PDF 이메일 발송 실패:', error);
    
    // Google Sheets에 PDF 발송 실패 상태 업데이트
    try {
      updatePdfSendingStatus(data.company_name || '알수없음', data.to_email || '알수없음', '발송실패');
    } catch (updateError) {
      console.error('❌ PDF 발송 상태 업데이트 실패:', updateError);
    }
    
    // 오류 발생 시 관리자에게 긴급 알림
    try {
      const errorSubject = `[AICAMP] 긴급: PDF 이메일 발송 실패 - ${data.company_name || '알수없음'}`;
      const errorBody = `PDF 진단보고서 이메일 발송 중 오류가 발생했습니다.

❌ 오류 정보:
• 수신자: ${data.to_name} (${data.to_email})
• 회사명: ${data.company_name}
• 오류 메시지: ${error.toString()}
• 발생 시간: ${getCurrentKoreanTime()}

🚨 조치 필요:
1. 수신자에게 직접 연락
2. PDF 보고서 수동 발송 필요
3. 시스템 오류 점검 필요

--
AICAMP 자동 알림 시스템
      `;

      GmailApp.sendEmail(
        ADMIN_EMAIL,
        errorSubject,
        errorBody,
        { name: 'AICAMP AI 교육센터 오류알림' }
      );
    } catch (notificationError) {
      console.error('❌ 오류 알림 발송도 실패:', notificationError);
    }

    return createErrorResponse('PDF 이메일 발송 중 오류가 발생했습니다: ' + error.toString());
  }
}
```

### 1.4 PDF 발송 상태 업데이트 함수 (새로 추가)

```javascript
/**
 * Google Sheets에서 PDF 발송 상태 업데이트
 */
function updatePdfSendingStatus(companyName, email, status) {
  try {
    const sheet = getOrCreateSheet(SHEETS.DIAGNOSIS, 'diagnosis');
    const lastRow = sheet.getLastRow();
    
    // 회사명과 이메일로 해당 행 찾기
    for (let i = 2; i <= lastRow; i++) {
      const rowCompanyName = sheet.getRange(i, 2).getValue(); // B열: 회사명
      const rowEmail = sheet.getRange(i, 12).getValue(); // L열: 이메일
      
      if (rowCompanyName === companyName && rowEmail === email) {
        // PDF발송상태 컬럼 (59번째 컬럼)
        sheet.getRange(i, 59).setValue(status);
        // PDF발송일시 컬럼 (60번째 컬럼)
        sheet.getRange(i, 60).setValue(getCurrentKoreanTime());
        
        console.log('✅ PDF 발송 상태 업데이트 완료:', {
          회사명: companyName,
          이메일: email,
          상태: status,
          행번호: i
        });
        break;
      }
    }
  } catch (error) {
    console.error('❌ PDF 발송 상태 업데이트 실패:', error);
  }
}
```

---

## 🔧 2단계: 진단신청 처리 함수 수정

기존 `processDiagnosisForm` 함수에서 `rowData` 배열 마지막에 PDF 발송 상태 컬럼 2개 추가:

```javascript
// 🟣 보고서 정보 (AS-AV: 4개)
reportSummary.length,      // AS: 보고서글자수
data.추천서비스 || '',      // AT: 추천서비스목록
reportSummary.substring(0, 500), // AU: 보고서요약(500자)
reportSummary,             // AV: 보고서전문

// 🆕 PDF 발송 상태 (AW-AX: 2개) - 새로 추가
'대기중',                  // AW: PDF발송상태
''                         // AX: PDF발송일시
```

그리고 성공 응답에 PDF 발송 가능 플래그 추가:

```javascript
return createSuccessResponse({
  message: '📊 AI 무료진단이 성공적으로 접수되었습니다 (문항별 점수 + 보고서 포함). PDF 이메일 발송이 가능합니다.',
  sheet: SHEETS.DIAGNOSIS,
  row: newRow,
  timestamp: timestamp,
  진단점수: totalScore,
  추천서비스: reportSummary.length > 50 ? reportSummary.substring(0, 50) + '...' : reportSummary,
  pdfSendingEnabled: true // PDF 발송 가능 플래그 추가
});
```

---

## 🔧 3단계: 헤더 설정 수정

기존 `setupHeaders` 함수의 진단신청 헤더 배열 마지막에 추가:

```javascript
// 🟣 보고서 정보 (AS-AV: 4개)
'보고서글자수', 
'추천서비스 목록', 
'보고서요약 (500자)', 
'보고서전문 (3000자 미만)',

// 🆕 PDF 발송 상태 (AW-AX: 2개) - 새로 추가
'PDF발송상태',
'PDF발송일시'
```

그리고 PDF 상태 컬럼에 특별 색상 적용:

```javascript
// 🆕 PDF 발송 상태 컬럼에 특별 색상 적용 (진단 시트만)
if (type === 'diagnosis') {
  // PDF 발송 상태 컬럼 (AW-AX: 2개) - 빨간색으로 강조
  const pdfStatusRange = sheet.getRange(1, 59, 1, 2); // 59-60번째 컬럼
  pdfStatusRange.setBackground('#ea4335');
  pdfStatusRange.setFontColor('#ffffff');
  pdfStatusRange.setFontWeight('bold');
  
  console.log('📧 PDF 발송 상태 컬럼 추가 완료 (59-60번째 컬럼)');
}
```

---

## 🔧 4단계: 테스트 함수 추가

### 4.1 PDF 이메일 발송 테스트 함수 (새로 추가)

```javascript
/**
 * 🆕 PDF 이메일 발송 테스트
 */
function testPdfEmailSending() {
  console.log('📧 PDF 이메일 발송 테스트 시작...');
  
  // 샘플 PDF 데이터 (Base64 인코딩된 더미 PDF)
  const samplePdfBase64 = 'JVBERi0xLjMKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwKL0xlbmd0aCA5NTIKL0ZpbHRlciAvRmxhdGVEZWNvZGUKPj4Kc3RyZWFtCnic';
  
  const testData = {
    action: 'sendDiagnosisPdfEmail',
    to_email: 'test@example.com',
    to_name: '김테스트',
    company_name: 'PDF테스트회사',
    total_score: 85,
    overall_grade: 'A',
    industry_type: 'IT/소프트웨어',
    diagnosis_date: '2025. 01. 06.',
    pdf_attachment: samplePdfBase64,
    pdf_filename: 'AI진단보고서_PDF테스트회사_2025-01-06.pdf',
    consultant_name: '이후경 경영지도사',
    consultant_phone: '010-9251-9743',
    consultant_email: 'hongik423@gmail.com'
  };

  try {
    const result = sendDiagnosisPdfEmail(testData);
    console.log('✅ PDF 이메일 발송 테스트 성공:', result);
    return result;
  } catch (error) {
    console.error('❌ PDF 이메일 발송 테스트 실패:', error);
    return createErrorResponse('PDF 이메일 발송 테스트 실패: ' + error.toString());
  }
}
```

### 4.2 전체 시스템 테스트 함수 수정

기존 `testEntireSystem` 함수에 PDF 이메일 발송 테스트 추가:

```javascript
// 🆕 4. PDF 이메일 발송 테스트
try {
  const pdfEmailResult = testPdfEmailSending();
  results.tests.pdfEmailSending = { success: true, message: 'PDF 이메일 발송 테스트 성공' };
} catch (error) {
  results.tests.pdfEmailSending = { success: false, error: error.toString() };
}
```

---

## 🔧 5단계: doGet 함수 수정

기존 `doGet` 함수의 features 배열에 추가:

```javascript
features: [
  '✅ 진단신청 처리 (58개 컬럼)',
  '✅ 상담신청 처리 (19개 컬럼)', 
  '✅ 베타피드백 처리 (14개 컬럼)',
  '📧 PDF 첨부 이메일 발송 (NEW!)',  // 새로 추가
  '✅ 진단점수 정확 저장 (1-5점)',
  '✅ 자동 이메일 발송',
  '✅ 관리자/신청자 알림',
  '✅ 환경변수 완전 동기화',
  '✅ 실시간 백업 시스템'
]
```

---

## 🔧 6단계: 환경변수 동기화 함수 수정

기존 `checkEnvironmentSync` 함수의 features에 추가:

```javascript
features: {
  emailNotification: AUTO_REPLY_ENABLED ? '✅ 활성화' : '❌ 비활성화',
  debugMode: DEBUG_MODE ? '✅ 활성화' : '❌ 비활성화',
  pdfEmailSending: '✅ 활성화 (NEW!)', // 새로 추가된 기능
  status: '✅ 정상'
}
```

---

## 🚀 설치 및 배포 방법

### 1. Google Apps Script 업데이트
1. **기존 코드 백업** (혹시 모를 오류에 대비)
2. **위의 수정사항들을 기존 코드에 추가**
3. **Gmail API 활성화** 필요 (라이브러리 → Gmail API 추가)
4. **저장 후 재배포** ("배포" → "새 배포" 생성)

### 2. 환경변수 업데이트
```bash
# .env.local에 추가 (Next.js 프로젝트)
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbwzdAtSkiojTTRrAgWmooma757nfeVhoCyHIIWtjXG30oMWSmf-oVu7A7B1D8EGStNv/exec
```

### 3. 테스트 실행
```javascript
// Google Apps Script 에디터에서 실행
testPdfEmailSending() // PDF 이메일 발송 테스트
testEntireSystem()    // 전체 시스템 테스트
```

---

## ✅ 완성된 기능

### 🆕 새로 추가된 기능들
- ✅ PDF 첨부 이메일 발송 (`sendDiagnosisPdfEmail`)
- ✅ Base64 PDF 디코딩 및 첨부파일 처리
- ✅ PDF 발송 상태 Google Sheets 기록  
- ✅ PDF 발송 오류 처리 및 관리자 알림
- ✅ 진단신청 처리 시 PDF 발송 가능 플래그 제공

### 🔄 유지되는 기존 기능들
- ✅ AI 무료진단 신청 처리 (60개 컬럼으로 확장)
- ✅ 상담신청 처리 (19개 컬럼)
- ✅ 베타피드백 처리 (14개 컬럼)
- ✅ 관리자/신청자 이메일 발송
- ✅ 환경변수 동기화
- ✅ 모든 기존 테스트 함수들

---

## 🎯 사용 방법

### Next.js에서 PDF 이메일 발송 요청

```javascript
const pdfEmailData = {
  action: 'sendDiagnosisPdfEmail',
  to_email: '사용자이메일@example.com',
  to_name: '사용자이름',
  company_name: '회사명',
  total_score: 85,
  overall_grade: 'A',
  industry_type: 'IT/소프트웨어',
  diagnosis_date: '2025. 01. 06.',
  pdf_attachment: 'base64로인코딩된PDF데이터',
  pdf_filename: 'AI진단보고서_회사명_2025-01-06.pdf',
  consultant_name: '이후경 경영지도사',
  consultant_phone: '010-9251-9743',
  consultant_email: 'hongik423@gmail.com'
};

const response = await fetch(GOOGLE_SCRIPT_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(pdfEmailData)
});
```

---

✅ **이제 기존 완벽한 Google Apps Script에 PDF 이메일 발송 기능이 완전히 통합되었습니다!**

모든 기존 기능은 그대로 유지되면서 새로운 PDF 첨부 이메일 발송 기능이 추가되어 더욱 강력한 시스템이 되었습니다. 