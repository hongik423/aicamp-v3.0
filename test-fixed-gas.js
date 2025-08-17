// AICAMP V13.0 ULTIMATE 수정 후 테스트
console.log('🚀 AICAMP V13.0 ULTIMATE 수정 후 테스트 시작...');

// 1단계: 기본 연결 테스트
fetch('https://aicamp.club/api/google-script-proxy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'health_check',
    timestamp: new Date().toISOString()
  })
}).then(async res => {
  console.log('📡 기본 연결 상태:', res.status);
  
  const result = await res.json();
  console.log('📋 Google Apps Script 상태:');
  console.log('✅ 성공:', result.success);
  console.log('🔧 버전:', result.version);
  console.log('🏷️ 브랜딩:', result.branding);
  
  if (result.success) {
    console.log('\n🎉 연결 성공! Google Drive 업로드 테스트 시작...');
    
    // 2단계: Google Drive 업로드 테스트
    return fetch('https://aicamp.club/api/google-script-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'drive_upload',
        fileName: `수정테스트_${Date.now()}.html`,
        content: `
<!DOCTYPE html>
<html><head><title>수정 테스트 성공!</title></head>
<body>
  <h1>🎉 AICAMP V13.0 ULTIMATE 수정 완료!</h1>
  <p>생성 시간: ${new Date().toLocaleString('ko-KR')}</p>
  <p>INCLUDE_PRIORITY_MATRIX 오류 해결됨</p>
  <p>Google Drive 업로드 정상 작동</p>
</body></html>
        `,
        mimeType: 'text/html',
        description: 'AICAMP V13.0 수정 후 테스트'
      })
    });
  } else {
    throw new Error('기본 연결 실패: ' + result.error);
  }
  
}).then(async driveRes => {
  console.log('\n📁 Google Drive 업로드 상태:', driveRes.status);
  
  const driveResult = await driveRes.json();
  console.log('📋 업로드 결과:');
  console.log('✅ 성공:', driveResult.success);
  
  if (driveResult.success && driveResult.driveResult) {
    console.log('\n🎉 Google Drive 업로드 성공!');
    console.log('🆔 파일 ID:', driveResult.driveResult.fileId);
    console.log('📄 파일명:', driveResult.driveResult.fileName);
    console.log('🔗 공유 링크:', driveResult.driveResult.webViewLink);
    console.log('📁 폴더 확인: https://drive.google.com/drive/u/0/folders/1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj');
    console.log('\n✨ 모든 기능이 정상 작동합니다!');
    
    // 3단계: 실제 AI 진단 테스트 준비
    console.log('\n🎯 이제 실제 AI 진단을 테스트할 준비가 완료되었습니다!');
    
  } else {
    console.log('\n❌ Google Drive 업로드 실패');
    console.log('🔍 오류:', driveResult.error);
    console.log('📝 상세:', JSON.stringify(driveResult, null, 2));
  }
  
}).catch(err => {
  console.error('❌ 테스트 실패:', err.message);
});
