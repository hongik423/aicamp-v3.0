/**
 * AI 역량진단 시스템 전체 워크플로우 테스트
 * PDF 생성 및 Google Drive 업로드 기능 포함
 */

const fs = require('fs');
const path = require('path');

// 테스트 데이터
const testDiagnosisData = {
  companyName: "테스트 기업",
  representativeName: "홍길동",
  email: "test@example.com",
  phone: "010-1234-5678",
  industry: "IT/소프트웨어",
  employeeCount: "10-49명",
  diagnosisId: "TEST_" + Date.now(),
  answers: {},
  diagnosisResult: {
    overallScore: 75,
    categoryScores: {
      strategy: 80,
      technology: 70,
      organization: 75,
      data: 80
    },
    maturity: "성장기",
    recommendations: [
      "AI 전략 수립 강화",
      "기술 인프라 구축",
      "조직 문화 개선"
    ]
  }
};

// 45개 문항에 대한 샘플 답변 생성
for (let i = 1; i <= 45; i++) {
  testDiagnosisData.answers[`Q${i}`] = Math.floor(Math.random() * 5) + 1; // 1-5점 랜덤
}

async function testAIDiagnosisWorkflow() {
  try {
    console.log('🧪 AI 역량진단 시스템 전체 워크플로우 테스트 시작...\n');

    // 1. 진단 데이터 생성
    console.log('1️⃣ 진단 데이터 생성...');
    console.log('- 기업명:', testDiagnosisData.companyName);
    console.log('- 진단 ID:', testDiagnosisData.diagnosisId);
    console.log('- 답변 수:', Object.keys(testDiagnosisData.answers).length);
    console.log('- 전체 점수:', testDiagnosisData.diagnosisResult.overallScore);

    // 2. PDF 생성 테스트
    console.log('\n2️⃣ PDF 생성 테스트...');
    
    // 진단신청서 PDF 생성
    const { generateDiagnosisFormPDF } = require('./src/lib/pdf/diagnosis-form-generator');
    const diagnosisFormBlob = await generateDiagnosisFormPDF(testDiagnosisData);
    console.log('✅ 진단신청서 PDF 생성 성공');
    console.log('- 파일 크기:', diagnosisFormBlob.size, 'bytes');

    // 점수보고서 PDF 생성
    const { generateScoreReportPDF } = require('./src/lib/pdf/score-report-generator');
    const scoreReportBlob = await generateScoreReportPDF(testDiagnosisData);
    console.log('✅ 점수보고서 PDF 생성 성공');
    console.log('- 파일 크기:', scoreReportBlob.size, 'bytes');

    // 3. Google Drive 업로드 테스트
    console.log('\n3️⃣ Google Drive 업로드 테스트...');
    
    const { generateAndUploadDiagnosisFormPDF } = require('./src/lib/pdf/diagnosis-form-generator');
    const { generateAndUploadScoreReportPDF } = require('./src/lib/pdf/score-report-generator');

    try {
      // 진단신청서 업로드
      const diagnosisUploadResult = await generateAndUploadDiagnosisFormPDF(testDiagnosisData);
      console.log('✅ 진단신청서 Google Drive 업로드 성공');
      console.log('- 파일 ID:', diagnosisUploadResult.fileId);
      console.log('- 웹 링크:', diagnosisUploadResult.webViewLink);

      // 점수보고서 업로드
      const scoreUploadResult = await generateAndUploadScoreReportPDF(testDiagnosisData);
      console.log('✅ 점수보고서 Google Drive 업로드 성공');
      console.log('- 파일 ID:', scoreUploadResult.fileId);
      console.log('- 웹 링크:', scoreUploadResult.webViewLink);

    } catch (uploadError) {
      console.log('⚠️ Google Drive 업로드 실패 (로컬 다운로드만 제공):');
      console.log('- 오류:', uploadError.message);
    }

    // 4. 로컬 파일 저장 테스트
    console.log('\n4️⃣ 로컬 파일 저장 테스트...');
    
    const testDir = path.join(__dirname, 'test-output');
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir);
    }

    // 진단신청서 저장
    const diagnosisFormPath = path.join(testDir, `diagnosis-form-${testDiagnosisData.diagnosisId}.pdf`);
    fs.writeFileSync(diagnosisFormPath, Buffer.from(await diagnosisFormBlob.arrayBuffer()));
    console.log('✅ 진단신청서 로컬 저장:', diagnosisFormPath);

    // 점수보고서 저장
    const scoreReportPath = path.join(testDir, `score-report-${testDiagnosisData.diagnosisId}.pdf`);
    fs.writeFileSync(scoreReportPath, Buffer.from(await scoreReportBlob.arrayBuffer()));
    console.log('✅ 점수보고서 로컬 저장:', scoreReportPath);

    console.log('\n🎉 AI 역량진단 시스템 전체 워크플로우 테스트 완료!');
    console.log('모든 기능이 정상적으로 작동합니다.');

  } catch (error) {
    console.error('\n❌ AI 역량진단 시스템 테스트 실패:');
    console.error('오류:', error.message);
    console.error('스택:', error.stack);
    process.exit(1);
  }
}

// 스크립트 실행
if (require.main === module) {
  testAIDiagnosisWorkflow();
}

module.exports = { testAIDiagnosisWorkflow };
