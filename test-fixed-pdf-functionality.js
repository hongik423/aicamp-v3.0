/**
 * 🎉 PDF 오류 수정 완료 테스트 스크립트
 * 수정된 Google Apps Script 검증
 */

// 새 Google Apps Script URL (사용자가 새 배포 후 업데이트)
let SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec';

// 샘플 PDF 데이터
const SAMPLE_PDF = 'JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSA4IFRKADE0IDM5MiBUZAooSGVsbG8gV29ybGQhKSBUagpFVApkdHJlYW0KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMDY2IDAwMDAwIG4gCjAwMDAwMDAxMjMgMDAwMDAgbiAKMDAwMDAwMDI2OSAwMDAwMCBuIAowMDAwMDAwMzM2IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDMwCiUlRU9G';

console.log('🎉 PDF 오류 수정 완료 테스트 시작!');
console.log('📊 총 3,781줄의 완전 수정된 코드 검증');

/**
 * 1. 기본 연결 테스트
 */
async function testConnection() {
    console.log('\n📡 1단계: Google Apps Script 연결 테스트');
    
    try {
        const response = await fetch(SCRIPT_URL);
        const data = await response.json();
        
        console.log('✅ 연결 성공!');
        console.log('📋 버전:', data.version);
        console.log('📋 상태:', data.status?.substring(0, 50) + '...');
        
        // 수정된 버전 확인
        if (data.version?.includes('PDF_오류_완전수정완료')) {
            console.log('🎉 수정된 버전이 정상 적용되었습니다!');
            return { success: true, version: data.version };
        } else {
            console.log('⚠️ 아직 이전 버전이 사용 중입니다.');
            console.log('🔧 Google Apps Script에 수정된 코드를 다시 적용해주세요.');
            return { success: false, message: '버전 업데이트 필요' };
        }
    } catch (error) {
        console.log('❌ 연결 실패:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * 2. PDF 첨부 이메일 기능 테스트 (수정된 로직)
 */
async function testPdfEmailFixed() {
    console.log('\n📧 2단계: PDF 첨부 이메일 기능 테스트 (수정 완료)');
    
    const testData = {
        action: 'sendDiagnosisPdfEmail',
        to_email: 'hongik423@gmail.com',
        to_name: '김PDF수정완료',
        company_name: '오류수정완료테스트회사',
        total_score: 95,
        overall_grade: 'A+',
        industry_type: 'IT/소프트웨어',
        diagnosis_date: new Date().toLocaleDateString('ko-KR'),
        pdf_attachment: SAMPLE_PDF,
        pdf_filename: `AI진단보고서_오류수정완료_${new Date().toISOString().split('T')[0]}.pdf`,
        consultant_name: '이후경 경영지도사',
        consultant_phone: '010-9251-9743',
        consultant_email: 'hongik423@gmail.com'
    };
    
    console.log('🔧 테스트 데이터 준비 완료');
    console.log('📧 수신자:', testData.to_email);
    console.log('🏢 회사명:', testData.company_name);
    console.log('📄 PDF 크기:', Math.round(testData.pdf_attachment.length / 1024) + 'KB');
    
    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testData)
        });
        
        console.log('📊 응답 상태:', response.status);
        
        if (response.status === 200) {
            const result = await response.json();
            
            if (result.success) {
                console.log('🎉 PDF 첨부 이메일 발송 성공!');
                console.log('✅ PDF Blob 오류가 완전히 해결되었습니다!');
                console.log('📧 이메일 발송 완료:', result.data?.sent_time || 'N/A');
                console.log('📄 PDF 크기:', result.data?.pdf_size || 'N/A');
                return { success: true, result };
            } else {
                console.log('❌ PDF 이메일 발송 실패:');
                console.log('🔍 오류:', result.error);
                
                // 특정 오류 패턴 확인
                if (result.error?.includes('pdfBlob.getSize')) {
                    console.log('⚠️ 아직 기존 오류가 남아있습니다!');
                    console.log('🔧 Google Apps Script에 최신 수정 코드를 다시 적용해주세요.');
                } else if (result.error?.includes('PDF 첨부파일 처리')) {
                    console.log('🎯 PDF 처리 로직이 개선되었습니다 (더 안전한 오류 처리).');
                }
                
                return { success: false, error: result.error, details: result.details };
            }
        } else {
            console.log('❌ HTTP 오류:', response.status);
            const text = await response.text();
            console.log('📋 오류 내용:', text.substring(0, 300));
            return { success: false, error: `HTTP ${response.status}` };
        }
    } catch (error) {
        console.log('❌ 네트워크 오류:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * 3. 진단신청 + PDF 통합 테스트
 */
async function testDiagnosisIntegrated() {
    console.log('\n🎯 3단계: 진단신청 + PDF 통합 테스트');
    
    const diagnosisData = {
        회사명: '통합테스트완료회사',
        업종: 'IT/소프트웨어',
        담당자명: '김통합완료',
        연락처: '010-1234-5678',
        이메일: 'hongik423@gmail.com',
        직원수: '10-50명',
        사업성장단계: '성장기',
        주요고민사항: 'PDF 오류 수정 완료 테스트',
        개인정보동의: true,
        폼타입: 'AI_무료진단_레벨업시트',
        종합점수: 94,
        문항별점수: {
            기획수준: 5, 차별화정도: 5, 가격설정: 4, 전문성: 5, 품질: 5,
            고객맞이: 5, 고객응대: 5, 불만관리: 4, 고객유지: 5,
            고객이해: 4, 마케팅계획: 5, 오프라인마케팅: 4, 온라인마케팅: 5, 판매전략: 4,
            구매관리: 4, 재고관리: 4, 외관관리: 5, 인테리어관리: 5, 청결도: 5, 작업동선: 4
        },
        카테고리점수: {
            productService: { score: 4.8 },
            customerService: { score: 4.8 },
            marketing: { score: 4.5 },
            procurement: { score: 4.0 },
            storeManagement: { score: 4.8 }
        },
        진단보고서요약: 'PDF 오류 수정 완료 테스트입니다. 모든 카테고리에서 우수한 성과를 보이고 있으며, PDF 첨부 이메일이 정상적으로 발송되어야 합니다.'
    };
    
    console.log('🔧 통합 테스트 데이터 준비 완료');
    console.log('🏢 회사명:', diagnosisData.회사명);
    console.log('📧 이메일:', diagnosisData.이메일);
    console.log('🎯 종합점수:', diagnosisData.종합점수);
    
    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(diagnosisData)
        });
        
        console.log('📊 진단신청 응답 상태:', response.status);
        
        if (response.status === 200) {
            const result = await response.json();
            
            if (result.success) {
                console.log('✅ 진단신청 처리 성공!');
                console.log('📊 저장된 행:', result.row);
                console.log('🎯 진단점수:', result.진단점수);
                console.log('📧 PDF 발송 활성화:', result.pdfSendingEnabled ? '✅' : '❌');
                
                if (result.pdfSendingEnabled) {
                    console.log('🎉 PDF 첨부 이메일 시스템이 완전히 수정되어 활성화되었습니다!');
                }
                
                return { success: true, result };
            } else {
                console.log('❌ 진단신청 처리 실패:', result.error);
                return { success: false, error: result.error };
            }
        } else {
            console.log('❌ HTTP 오류:', response.status);
            return { success: false, error: `HTTP ${response.status}` };
        }
    } catch (error) {
        console.log('❌ 진단신청 처리 오류:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * 전체 테스트 실행
 */
async function runCompleteTest() {
    console.log('🚀 PDF 오류 수정 완료 전체 테스트 시작');
    console.log('⏰ 시작 시간:', new Date().toLocaleString('ko-KR'));
    console.log('🔧 수정 사항: PDF Blob getSize() 오류 완전 해결');
    console.log('📊 코드 상태: 3,781줄 완전 수정 코드');
    console.log('=' .repeat(60));
    
    // 테스트 실행
    const results = {
        connection: await testConnection(),
        pdfEmail: null,
        diagnosis: null
    };
    
    if (results.connection.success) {
        results.pdfEmail = await testPdfEmailFixed();
        results.diagnosis = await testDiagnosisIntegrated();
    } else {
        console.log('⚠️ 연결 실패로 인해 나머지 테스트를 건너뜁니다.');
    }
    
    // 결과 요약
    console.log('\n' + '=' .repeat(60));
    console.log('📊 PDF 오류 수정 완료 테스트 결과');
    console.log('=' .repeat(60));
    
    let successCount = 0;
    let totalCount = 0;
    
    Object.entries(results).forEach(([testName, result]) => {
        if (result !== null) {
            totalCount++;
            const status = result.success ? '✅' : '❌';
            console.log(`${status} ${testName}: ${result.success ? '성공' : '실패'}`);
            if (result.success) successCount++;
            else if (result.error) console.log(`   └─ 오류: ${result.error}`);
        }
    });
    
    console.log(`\n📈 성공률: ${Math.round((successCount / totalCount) * 100)}% (${successCount}/${totalCount})`);
    console.log('⏰ 완료 시간:', new Date().toLocaleString('ko-KR'));
    
    if (successCount === totalCount) {
        console.log('\n🎉 모든 PDF 오류가 완전히 수정되었습니다!');
        console.log('✅ AI 무료진단 신청자에게 PDF 보고서가 정상적으로 발송됩니다.');
        console.log('📧 [AI CAMP] 브랜딩으로 이메일이 발송됩니다.');
        console.log('\n🎯 최종 확인:');
        console.log('1. hongik423@gmail.com에서 테스트 이메일 확인');
        console.log('2. PDF 첨부파일이 정상적으로 포함되어 있는지 확인');
        console.log('3. 이메일 제목에 [AI CAMP]가 포함되어 있는지 확인');
    } else {
        console.log('\n⚠️ 일부 문제가 남아있습니다.');
        console.log('🔧 Google Apps Script에 최신 수정 코드를 다시 적용해주세요.');
        console.log('📋 docs/google_apps_script_with_pdf_email_integrated_FIXED.js (3,781줄)');
    }
    
    return results;
}

// 테스트 시작
runCompleteTest().catch(error => {
    console.error('🚨 테스트 중 치명적 오류:', error);
});

// URL 업데이트 함수
function updateScriptUrl(newUrl) {
    SCRIPT_URL = newUrl;
    console.log('🔄 스크립트 URL 업데이트:', newUrl);
}

// 내보내기 (필요시)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runCompleteTest, updateScriptUrl };
} 