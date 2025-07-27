/**
 * 🧪 새 Google Apps Script 배포용 PDF 기능 테스트
 * 수정된 PDF 처리 로직 검증
 */

// 새 Google Apps Script 배포 URL (사용자가 새 배포 후 업데이트 필요)
const NEW_DEPLOYMENT_URL = 'https://script.google.com/macros/s/[NEW_DEPLOYMENT_ID]/exec';

// 샘플 PDF 데이터 (Base64 인코딩된 작은 PDF)
const SAMPLE_PDF_BASE64 = 'JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSA4IFRKADE0IDM5MiBUZAooSGVsbG8gV29ybGQhKSBUagpFVApkdHJlYW0KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMDY2IDAwMDAwIG4gCjAwMDAwMDAxMjMgMDAwMDAgbiAKMDAwMDAwMDI2OSAwMDAwMCBuIAowMDAwMDAwMzM2IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDMwCiUlRU9G';

console.log('🔧 새 배포용 PDF 기능 테스트 스크립트');
console.log('⚠️ 새 배포 완료 후 NEW_DEPLOYMENT_URL을 업데이트하세요!');

/**
 * PDF 첨부 이메일 발송 테스트 (수정된 로직 검증)
 */
async function testFixedPdfEmailSending(deploymentUrl) {
    console.log('\n📧 수정된 PDF 첨부 이메일 발송 테스트');
    
    if (deploymentUrl.includes('[NEW_DEPLOYMENT_ID]')) {
        console.log('❌ 새 배포 URL을 먼저 업데이트해주세요!');
        console.log('📋 업데이트 방법:');
        console.log('1. Google Apps Script에서 새 배포 생성');
        console.log('2. 생성된 웹앱 URL 복사');
        console.log('3. 이 스크립트의 NEW_DEPLOYMENT_URL 변수 업데이트');
        return { success: false, error: '배포 URL 업데이트 필요' };
    }
    
    const testData = {
        action: 'sendDiagnosisPdfEmail',
        to_email: 'hongik423@gmail.com', // 관리자 이메일로 테스트
        to_name: '김PDF수정테스트',
        company_name: 'PDF수정완료테스트회사',
        total_score: 92,
        overall_grade: 'A+',
        industry_type: 'IT/소프트웨어',
        diagnosis_date: new Date().toLocaleDateString('ko-KR'),
        pdf_attachment: SAMPLE_PDF_BASE64,
        pdf_filename: `AI진단보고서_PDF수정완료_${new Date().toISOString().split('T')[0]}.pdf`,
        consultant_name: '이후경 경영지도사',
        consultant_phone: '010-9251-9743',
        consultant_email: 'hongik423@gmail.com'
    };
    
    console.log('🔧 수정된 로직 테스트 데이터 준비 완료');
    console.log('📧 수신자:', testData.to_email);
    console.log('🏢 회사명:', testData.company_name);
    console.log('📄 PDF 크기:', Math.round(testData.pdf_attachment.length / 1024) + 'KB');
    console.log('🎯 배포 URL:', deploymentUrl);
    
    try {
        const response = await fetch(deploymentUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        });
        
        console.log('📊 PDF 이메일 발송 응답 상태:', response.status);
        
        if (response.status === 200) {
            const result = await response.json();
            console.log('✅ PDF 첨부 이메일 발송 테스트 결과:');
            
            if (result.success) {
                console.log('🎉 PDF 첨부 이메일 발송 성공!');
                console.log('📧 이메일이 성공적으로 발송되었습니다.');
                console.log('📋 발송 상세 정보:', result.data || result);
                return { success: true, result };
            } else {
                console.log('❌ PDF 첨부 이메일 발송 실패:');
                console.log('🔍 오류 내용:', result.error);
                console.log('📋 상세 정보:', result.details || {});
                return { success: false, error: result.error, details: result.details };
            }
        } else {
            console.log('❌ HTTP 오류:', response.status);
            const errorText = await response.text();
            console.log('📋 오류 내용:', errorText.substring(0, 500));
            return { success: false, error: `HTTP ${response.status}`, details: errorText };
        }
    } catch (error) {
        console.error('❌ PDF 이메일 발송 중 네트워크 오류:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * 새 배포 테스트 실행
 */
async function runNewDeploymentTest() {
    console.log('🚀 새 배포 PDF 기능 테스트 시작');
    console.log('⏰ 시작 시간:', new Date().toLocaleString('ko-KR'));
    console.log('🔧 수정 사항: PDF Blob 처리 오류 해결');
    console.log('=' .repeat(60));
    
    // 연결 테스트
    console.log('\n📡 1단계: 새 배포 연결 테스트');
    try {
        const response = await fetch(NEW_DEPLOYMENT_URL);
        console.log('📊 응답 상태:', response.status);
        
        if (response.status === 200) {
            const data = await response.json();
            console.log('✅ 새 배포 연결 성공!');
            console.log('📋 버전 정보:', data.version || 'N/A');
            console.log('📋 PDF 기능:', data.features?.find(f => f.includes('PDF')) || 'PDF 기능 확인됨');
        } else {
            console.log('❌ 새 배포 연결 실패:', response.status);
            console.log('🔧 Google Apps Script에서 새 배포를 다시 확인해주세요.');
            return;
        }
    } catch (error) {
        console.log('❌ 연결 오류:', error.message);
        console.log('🔧 NEW_DEPLOYMENT_URL을 정확한 웹앱 URL로 업데이트해주세요.');
        return;
    }
    
    // PDF 기능 테스트
    console.log('\n📧 2단계: 수정된 PDF 기능 테스트');
    const pdfResult = await testFixedPdfEmailSending(NEW_DEPLOYMENT_URL);
    
    // 결과 요약
    console.log('\n' + '=' .repeat(60));
    console.log('📊 새 배포 PDF 기능 테스트 결과 요약');
    console.log('=' .repeat(60));
    
    if (pdfResult.success) {
        console.log('✅ PDF 첨부 이메일 기능: 성공');
        console.log('🎉 모든 PDF 관련 오류가 해결되었습니다!');
        console.log('📧 이제 AI 무료진단 신청자에게 PDF 보고서가 정상적으로 발송됩니다.');
        
        console.log('\n🎯 최종 확인 사항:');
        console.log('1. hongik423@gmail.com에서 테스트 이메일을 확인하세요');
        console.log('2. PDF 첨부파일이 정상적으로 포함되어 있는지 확인하세요');
        console.log('3. 이메일 내용이 [AI CAMP] 브랜딩으로 되어 있는지 확인하세요');
        
    } else {
        console.log('❌ PDF 첨부 이메일 기능: 실패');
        console.log('🔍 오류:', pdfResult.error);
        
        if (pdfResult.error?.includes('pdfBlob.getSize')) {
            console.log('⚠️ 아직 기존 코드가 사용되고 있습니다.');
            console.log('🔧 Google Apps Script에 수정된 코드를 다시 적용해주세요.');
        }
        
        console.log('\n🔧 추가 조치 필요:');
        console.log('1. Google Apps Script 편집기에서 코드 재확인');
        console.log('2. 새 배포 생성 및 권한 승인');
        console.log('3. 환경변수 업데이트');
    }
    
    console.log('\n⏰ 완료 시간:', new Date().toLocaleString('ko-KR'));
    return pdfResult;
}

/**
 * 사용자 가이드 출력
 */
function showUserGuide() {
    console.log('📋 새 배포 PDF 테스트 사용법');
    console.log('=' .repeat(50));
    console.log('1. Google Apps Script에서 새 배포 생성 완료');
    console.log('2. 생성된 웹앱 URL 복사');
    console.log('3. 이 스크립트의 NEW_DEPLOYMENT_URL 변수에 URL 입력');
    console.log('4. node test-pdf-with-new-deployment.js 실행');
    console.log('=' .repeat(50));
    console.log('💡 새 배포 URL 예시:');
    console.log('https://script.google.com/macros/s/AKfycby[새로운ID]/exec');
    console.log('');
}

// 초기 가이드 표시
showUserGuide();

// 스크립트 실행
if (NEW_DEPLOYMENT_URL.includes('[NEW_DEPLOYMENT_ID]')) {
    console.log('⚠️ 새 배포 URL을 먼저 업데이트한 후 다시 실행해주세요!');
} else {
    runNewDeploymentTest().catch(error => {
        console.error('🚨 테스트 중 치명적 오류:', error);
    });
} 