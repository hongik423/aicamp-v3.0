// Google Drive 업로드 최종 테스트
const testData = {
  type: 'drive_upload',
  fileName: `AI역량진단보고서_테스트_${Date.now()}.html`,
  content: `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이교장의AI역량진단보고서 - 테스트</title>
    <style>
        body {
            font-family: 'Malgun Gothic', sans-serif;
            line-height: 1.8;
            margin: 0;
            padding: 40px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 60px 40px;
            text-align: center;
        }
        .content {
            padding: 50px 40px;
        }
        .score-section {
            background: linear-gradient(135deg, #4285f4 0%, #34a853 100%);
            color: white;
            padding: 50px 40px;
            border-radius: 20px;
            text-align: center;
            margin: 40px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 이교장의AI역량진단보고서</h1>
            <p>AICAMP - Google Drive 업로드 테스트</p>
        </div>
        
        <div class="content">
            <div class="score-section">
                <h2>✅ Google Drive 업로드 테스트 성공!</h2>
                <p>생성 시간: ${new Date().toLocaleString('ko-KR')}</p>
                <p>GEMINI 2.5 Flash 모델 연동 완료</p>
                <p>V15.0 ULTIMATE 시스템 정상 작동</p>
            </div>
            
            <h3>📊 테스트 결과</h3>
            <ul>
                <li>✅ Google Apps Script V15.0 배포 완료</li>
                <li>✅ Google Drive API 연동 성공</li>
                <li>✅ HTML 보고서 자동 업로드</li>
                <li>✅ 공유 링크 생성 완료</li>
            </ul>
            
            <h3>🚀 시스템 정보</h3>
            <p><strong>버전:</strong> V15.0 ULTIMATE MCKINSEY</p>
            <p><strong>AI 모델:</strong> GEMINI 2.5 Flash</p>
            <p><strong>도메인:</strong> aicamp.club</p>
            <p><strong>Google Drive 폴더:</strong> 1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj</p>
        </div>
    </div>
</body>
</html>
  `,
  mimeType: 'text/html',
  description: 'Google Drive 업로드 테스트용 AI 역량진단 보고서'
};

console.log('🚀 Google Drive 업로드 최종 테스트 시작...');
console.log('📁 폴더 ID:', '1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj');
console.log('📄 파일명:', testData.fileName);
console.log('📏 HTML 크기:', testData.content.length, '글자');

fetch('https://aicamp.club/api/google-script-proxy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData)
}).then(async res => {
  console.log('\n📡 응답 상태:', res.status, res.statusText);
  
  const result = await res.json();
  console.log('\n📋 업로드 결과:');
  console.log('✅ 성공 여부:', result.success ? '성공' : '실패');
  
  if (result.success && result.driveResult) {
    console.log('\n🎉 Google Drive 업로드 성공!');
    console.log('🆔 파일 ID:', result.driveResult.fileId);
    console.log('📄 파일명:', result.driveResult.fileName);
    console.log('🔗 공유 링크:', result.driveResult.webViewLink);
    console.log('📁 폴더 확인: https://drive.google.com/drive/u/0/folders/1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj');
    console.log('\n✨ 이제 Google Drive 폴더에서 보고서를 확인할 수 있습니다!');
  } else {
    console.log('\n❌ 업로드 실패');
    console.log('🔍 오류 내용:', result.error || 'Unknown error');
    console.log('📝 상세 정보:', JSON.stringify(result, null, 2));
  }
  
}).catch(err => {
  console.error('❌ 요청 실패:', err.message);
});
