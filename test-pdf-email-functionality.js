/**
 * 🧪 AI CAMP PDF 첨부 이메일 발송 기능 테스트
 * 새 Google Apps Script 배포 연동 테스트
 */

const NEW_GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec';

// 샘플 PDF 데이터 (Base64 인코딩된 작은 PDF)
const SAMPLE_PDF_BASE64 = 'JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSA4IFRKIDE0IDM5MiBUZAooSGVsbG8gV29ybGQhKSBUagpFVApkdHJlYW0KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMDY2IDAwMDAwIG4gCjAwMDAwMDAxMjMgMDAwMDAgbiAKMDAwMDAwMDI2OSAwMDAwMCBuIAowMDAwMDAwMzM2IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDMwCiUlRU9G';

console.log('🧪 PDF 첨부 이메일 발송 기능 테스트 시작...');
console.log('🎯 새 Google Apps Script URL:', NEW_GOOGLE_SCRIPT_URL);

/**
 * 1단계: Google Apps Script 연결 테스트
 */
async function testGoogleScriptConnection() {
    console.log('\n📡 1단계: Google Apps Script 연결 테스트');
    
    try {
        const response = await fetch(NEW_GOOGLE_SCRIPT_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('📊 응답 상태:', response.status);
        console.log('📊 응답 상태 텍스트:', response.statusText);
        
        if (response.status === 200) {
            const data = await response.json();
            console.log('✅ Google Apps Script 연결 성공!');
            console.log('📋 응답 데이터:', JSON.stringify(data, null, 2));
            return { success: true, data };
        } else {
            console.log('❌ Google Apps Script 연결 실패:', response.status);
            const text = await response.text();
            console.log('📋 오류 내용:', text.substring(0, 500));
            return { success: false, error: `HTTP ${response.status}`, details: text };
        }
    } catch (error) {
        console.error('❌ 연결 테스트 중 오류:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * 2단계: PDF 첨부 이메일 발송 테스트
 */
async function testPdfEmailSending() {
    console.log('\n📧 2단계: PDF 첨부 이메일 발송 테스트');
    
    const testData = {
        action: 'sendDiagnosisPdfEmail',
        to_email: 'hongik423@gmail.com', // 관리자 이메일로 테스트
        to_name: '김테스트',
        company_name: 'PDF테스트회사',
        total_score: 85,
        overall_grade: 'A',
        industry_type: 'IT/소프트웨어',
        diagnosis_date: new Date().toLocaleDateString('ko-KR'),
        pdf_attachment: SAMPLE_PDF_BASE64,
        pdf_filename: `AI진단보고서_PDF테스트회사_${new Date().toISOString().split('T')[0]}.pdf`,
        consultant_name: '이후경 경영지도사',
        consultant_phone: '010-9251-9743',
        consultant_email: 'hongik423@gmail.com'
    };
    
    console.log('🔧 테스트 데이터 준비 완료');
    console.log('📧 수신자:', testData.to_email);
    console.log('🏢 회사명:', testData.company_name);
    console.log('📄 PDF 크기:', Math.round(testData.pdf_attachment.length / 1024) + 'KB');
    
    try {
        const response = await fetch(NEW_GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        });
        
        console.log('📊 PDF 이메일 발송 응답 상태:', response.status);
        
        if (response.status === 200) {
            const result = await response.json();
            console.log('✅ PDF 첨부 이메일 발송 성공!');
            console.log('📋 발송 결과:', JSON.stringify(result, null, 2));
            return { success: true, result };
        } else {
            console.log('❌ PDF 이메일 발송 실패:', response.status);
            const errorText = await response.text();
            console.log('📋 오류 내용:', errorText.substring(0, 500));
            return { success: false, error: `HTTP ${response.status}`, details: errorText };
        }
    } catch (error) {
        console.error('❌ PDF 이메일 발송 중 오류:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * 3단계: 진단신청 + PDF 발송 통합 테스트
 */
async function testDiagnosisWithPdf() {
    console.log('\n🎯 3단계: 진단신청 + PDF 발송 통합 테스트');
    
    const diagnosisData = {
        회사명: 'PDF통합테스트회사',
        업종: 'IT/소프트웨어',
        담당자명: '김통합테스트',
        연락처: '010-1234-5678',
        이메일: 'hongik423@gmail.com', // 관리자 이메일로 테스트
        직원수: '10-50명',
        사업성장단계: '성장기',
        주요고민사항: 'AI 도입 및 PDF 기능 테스트',
        개인정보동의: true,
        폼타입: 'AI_무료진단_레벨업시트',
        종합점수: 88,
        문항별점수: {
            기획수준: 4,
            차별화정도: 5,
            가격설정: 4,
            전문성: 5,
            품질: 4,
            고객맞이: 4,
            고객응대: 5,
            불만관리: 4,
            고객유지: 4,
            고객이해: 4,
            마케팅계획: 5,
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
        카테고리점수: {
            productService: { score: 4.4 },
            customerService: { score: 4.3 },
            marketing: { score: 4.0 },
            procurement: { score: 4.0 },
            storeManagement: { score: 4.3 }
        },
        진단보고서요약: 'PDF 통합 테스트를 위한 진단 보고서입니다. 전반적으로 우수한 점수를 보이고 있으며, 특히 고객 서비스와 제품 품질 부분에서 강점을 보입니다. AI 도입을 통해 더욱 효율적인 운영이 가능할 것으로 예상됩니다.'
    };
    
    console.log('🔧 진단 데이터 준비 완료');
    console.log('🏢 회사명:', diagnosisData.회사명);
    console.log('📧 이메일:', diagnosisData.이메일);
    console.log('🎯 종합점수:', diagnosisData.종합점수);
    
    try {
        const response = await fetch(NEW_GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(diagnosisData)
        });
        
        console.log('📊 진단신청 응답 상태:', response.status);
        
        if (response.status === 200) {
            const result = await response.json();
            console.log('✅ 진단신청 처리 성공!');
            console.log('📋 처리 결과:', JSON.stringify(result, null, 2));
            
            // PDF 발송 가능 여부 확인
            if (result.pdfSendingEnabled) {
                console.log('🎉 PDF 발송 기능이 활성화되어 있습니다!');
                console.log('📧 다음 단계: PDF 이메일 자동 발송 또는 수동 발송 가능');
            }
            
            return { success: true, result };
        } else {
            console.log('❌ 진단신청 처리 실패:', response.status);
            const errorText = await response.text();
            console.log('📋 오류 내용:', errorText.substring(0, 500));
            return { success: false, error: `HTTP ${response.status}`, details: errorText };
        }
    } catch (error) {
        console.error('❌ 진단신청 처리 중 오류:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * 전체 PDF 기능 테스트 실행
 */
async function runFullPdfTest() {
    console.log('🚀 AI CAMP PDF 기능 전체 테스트 시작');
    console.log('⏰ 시작 시간:', new Date().toLocaleString('ko-KR'));
    console.log('=' .repeat(60));
    
    const results = {
        timestamp: new Date().toISOString(),
        tests: {}
    };
    
    // 1단계: 연결 테스트
    results.tests.connection = await testGoogleScriptConnection();
    
    if (results.tests.connection.success) {
        // 2단계: PDF 이메일 발송 테스트
        results.tests.pdfEmail = await testPdfEmailSending();
        
        // 3단계: 통합 테스트
        results.tests.diagnosisWithPdf = await testDiagnosisWithPdf();
    } else {
        console.log('⚠️ Google Apps Script 연결 실패로 인해 나머지 테스트를 건너뜁니다.');
        console.log('🔧 먼저 Google Apps Script 배포 상태를 확인해주세요.');
    }
    
    // 전체 결과 요약
    console.log('\n' + '=' .repeat(60));
    console.log('📊 PDF 기능 테스트 결과 요약');
    console.log('=' .repeat(60));
    
    const testNames = Object.keys(results.tests);
    const successCount = testNames.filter(name => results.tests[name].success).length;
    const totalCount = testNames.length;
    
    console.log(`✅ 성공: ${successCount}/${totalCount}`);
    console.log(`❌ 실패: ${totalCount - successCount}/${totalCount}`);
    console.log(`📈 성공률: ${Math.round((successCount / totalCount) * 100)}%`);
    
    testNames.forEach(testName => {
        const test = results.tests[testName];
        const status = test.success ? '✅' : '❌';
        console.log(`${status} ${testName}: ${test.success ? '성공' : '실패'}`);
        if (!test.success) {
            console.log(`   └─ 오류: ${test.error}`);
        }
    });
    
    console.log('\n⏰ 완료 시간:', new Date().toLocaleString('ko-KR'));
    
    if (successCount === totalCount) {
        console.log('\n🎉 모든 PDF 기능 테스트가 성공적으로 완료되었습니다!');
        console.log('📧 이제 AI 무료진단 신청자에게 PDF 보고서가 자동으로 발송됩니다.');
    } else if (successCount > 0) {
        console.log('\n⚠️ 일부 기능에서 문제가 발견되었습니다.');
        console.log('🔧 Google Apps Script 설정을 다시 확인해주세요.');
    } else {
        console.log('\n🚨 모든 테스트가 실패했습니다.');
        console.log('🔧 즉시 Google Apps Script 배포 상태를 확인하고 새 배포를 생성해주세요.');
    }
    
    return results;
}

// 테스트 실행
runFullPdfTest().catch(error => {
    console.error('🚨 PDF 기능 테스트 중 치명적 오류:', error);
}); 