/**
 * Report 폴더 초기화 스크립트
 * PDF 보고서 저장을 위한 폴더 구조를 생성합니다.
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Report 폴더 초기화 시작...');

// 폴더 경로 설정
const reportDir = path.join(process.cwd(), 'report');
const publicReportDir = path.join(process.cwd(), 'public', 'reports');

try {
  // report 폴더 생성
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
    console.log('✅ report 폴더 생성 완료');
  } else {
    console.log('✅ report 폴더 이미 존재');
  }

  // public/reports 폴더 생성
  if (!fs.existsSync(publicReportDir)) {
    fs.mkdirSync(publicReportDir, { recursive: true });
    console.log('✅ public/reports 폴더 생성 완료');
  } else {
    console.log('✅ public/reports 폴더 이미 존재');
  }

  // .gitkeep 파일 생성 (빈 폴더를 Git에서 추적하기 위해)
  const gitkeepPath1 = path.join(reportDir, '.gitkeep');
  const gitkeepPath2 = path.join(publicReportDir, '.gitkeep');

  if (!fs.existsSync(gitkeepPath1)) {
    fs.writeFileSync(gitkeepPath1, '');
    console.log('✅ report/.gitkeep 생성 완료');
  }

  if (!fs.existsSync(gitkeepPath2)) {
    fs.writeFileSync(gitkeepPath2, '');
    console.log('✅ public/reports/.gitkeep 생성 완료');
  }

  // README.md 파일 생성
  const readmePath = path.join(reportDir, 'README.md');
  if (!fs.existsSync(readmePath)) {
    const readmeContent = `# AI CAMP 진단 보고서 저장소

이 폴더는 AI 진단 보고서 PDF 파일들이 저장되는 곳입니다.

## 폴더 구조
- \`report/\`: 서버에서 생성된 PDF 보고서 저장
- \`public/reports/\`: 웹에서 다운로드 가능한 공개 보고서

## 보고서 파일 명명 규칙
- 형식: \`AICAMP_진단보고서_[회사명]_[YYYY-MM-DD]_[ID].pdf\`
- 예시: \`AICAMP_진단보고서_테스트기업_2025-01-28_abc123.pdf\`

## 자동 정리
- 30일 이상 된 보고서는 자동으로 정리됩니다.
- 중요한 보고서는 별도 백업을 권장합니다.

---
생성일: ${new Date().toISOString()}
시스템: AI CAMP v3.0
`;

    fs.writeFileSync(readmePath, readmeContent);
    console.log('✅ README.md 생성 완료');
  }

  console.log('🎉 Report 폴더 초기화 완료!');
  
  // 현재 상태 출력
  const reportFiles = fs.readdirSync(reportDir);
  console.log(`📂 report 폴더 파일 수: ${reportFiles.length}개`);
  
  if (fs.existsSync(publicReportDir)) {
    const publicFiles = fs.readdirSync(publicReportDir);
    console.log(`📂 public/reports 폴더 파일 수: ${publicFiles.length}개`);
  }

} catch (error) {
  console.error('❌ Report 폴더 초기화 실패:', error);
  process.exit(1);
} 