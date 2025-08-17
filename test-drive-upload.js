// Google Drive 업로드 테스트
const testData = {
  type: 'drive_upload',
  action: 'uploadHTMLReport',
  folderId: '1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj',
  fileName: `테스트보고서_${Date.now()}.html`,
  content: `
<!DOCTYPE html>
<html>
<head>
    <title>테스트 AI 역량진단 보고서</title>
    <meta charset="utf-8">
</head>
<body>
    <h1>🎯 이교장의AI역량진단보고서</h1>
    <h2>테스트 기업</h2>
    <p>생성 시간: ${new Date().toLocaleString('ko-KR')}</p>
    <p>이것은 Google Drive 업로드 테스트용 HTML 보고서입니다.</p>
    
    <h3>📊 진단 결과</h3>
    <ul>
        <li>총점: 85점</li>
        <li>등급: B</li>
        <li>성숙도: Advanced</li>
    </ul>
    
    <h3>🚀 GEMINI 2.5 Flash 분석</h3>
    <p>이 보고서는 GEMINI 2.5 Flash 모델을 통해 생성되었습니다.</p>
</body>
</html>
  `,
  mimeType: 'text/html',
  description: '테스트용 AI 역량진단 보고서'
};

console.log('🚀 Google Drive 업로드 테스트 시작...');
console.log('📁 폴더 ID:', testData.folderId);
console.log('📄 파일명:', testData.fileName);

fetch('https://aicamp.club/api/google-script-proxy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData)
}).then(async res => {
  console.log('\n📡 응답 상태:', res.status, res.statusText);
  
  const result = await res.json();
  console.log('\n📋 응답 결과:');
  console.log(JSON.stringify(result, null, 2));
  
  if (result.success && result.driveResult) {
    console.log('\n✅ Google Drive 업로드 성공!');
    console.log('🆔 파일 ID:', result.driveResult.fileId);
    console.log('🔗 공유 링크:', result.driveResult.webViewLink);
    console.log('📁 폴더 확인: https://drive.google.com/drive/u/0/folders/1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj');
  } else {
    console.log('\n❌ 업로드 실패:', result.error);
  }
  
}).catch(err => {
  console.error('❌ 요청 실패:', err.message);
});
