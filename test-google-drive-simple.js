/**
 * 간단한 Google Drive API 연결 테스트
 * 폴더 접근 대신 기본 API 연결만 테스트
 */

require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');
const path = require('path');

// Google Drive API 설정
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

function getGoogleDriveClient() {
  const keyFilePath = path.join(__dirname, 'm-center-landingpage-465fd212fb6c.json');
  
  const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: SCOPES,
  });

  return google.drive({ version: 'v3', auth });
}

async function testGoogleDriveConnection() {
  try {
    console.log('🔍 Google Drive API 기본 연결 테스트 시작...');
    
    // Google Drive 클라이언트 초기화
    console.log('\n🚀 Google Drive 클라이언트 초기화...');
    const drive = getGoogleDriveClient();
    
    // 사용자 정보 확인 (기본 API 테스트)
    console.log('\n👤 사용자 정보 확인...');
    const aboutResponse = await drive.about.get({
      fields: 'user,storageQuota'
    });
    
    console.log('✅ Google Drive API 연결 성공!');
    console.log('- 사용자 이메일:', aboutResponse.data.user.emailAddress);
    console.log('- 사용자 이름:', aboutResponse.data.user.displayName);
    console.log('- 저장소 총 용량:', aboutResponse.data.storageQuota.limit, 'bytes');
    console.log('- 사용된 용량:', aboutResponse.data.storageQuota.usage, 'bytes');
    
    // 폴더 접근 테스트 (선택적)
    console.log('\n📁 폴더 접근 테스트...');
    const folderId = process.env.DRIVE_FOLDER_ID || '1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj';
    
    try {
      const folderResponse = await drive.files.get({
        fileId: folderId,
        fields: 'id,name,mimeType'
      });
      
      console.log('✅ 폴더 접근 성공:');
      console.log('- 폴더 ID:', folderResponse.data.id);
      console.log('- 폴더 이름:', folderResponse.data.name);
      console.log('- MIME 타입:', folderResponse.data.mimeType);
      
    } catch (folderError) {
      console.log('⚠️ 폴더 접근 실패 (권한 문제일 수 있음):');
      console.log('- 오류:', folderError.message);
      console.log('- 폴더 ID:', folderId);
      console.log('- 서비스 계정 이메일:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    }
    
    // 테스트 파일 생성 (내 드라이브에)
    console.log('\n📤 테스트 파일 생성...');
    const testContent = 'AI 역량진단 시스템 Google Drive API 테스트 파일입니다.';
    const testBuffer = Buffer.from(testContent, 'utf-8');
    
    const fileMetadata = {
      name: `test-${Date.now()}.txt`,
      mimeType: 'text/plain',
    };
    
    const media = {
      mimeType: 'text/plain',
      body: require('stream').Readable.from(testBuffer),
    };
    
    const uploadResponse = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id,name,webViewLink,size',
    });
    
    console.log('✅ 테스트 파일 생성 성공:');
    console.log('- 파일 ID:', uploadResponse.data.id);
    console.log('- 파일 이름:', uploadResponse.data.name);
    console.log('- 파일 크기:', uploadResponse.data.size, 'bytes');
    console.log('- 웹 링크:', uploadResponse.data.webViewLink);
    
    // 테스트 파일 삭제
    console.log('\n🗑️ 테스트 파일 삭제...');
    await drive.files.delete({
      fileId: uploadResponse.data.id
    });
    console.log('✅ 테스트 파일 삭제 완료');
    
    console.log('\n🎉 Google Drive API 연결 테스트 완료!');
    console.log('기본 API 기능이 정상적으로 작동합니다.');
    
  } catch (error) {
    console.error('\n❌ Google Drive API 연결 테스트 실패:');
    console.error('오류:', error.message);
    
    if (error.code === 'ENOENT') {
      console.error('\n💡 해결 방법:');
      console.error('1. JSON 키 파일이 프로젝트 루트에 있는지 확인');
      console.error('2. 파일명: m-center-landingpage-465fd212fb6c.json');
    } else if (error.code === 403) {
      console.error('\n💡 해결 방법:');
      console.error('1. Google Cloud Console에서 Google Drive API가 활성화되었는지 확인');
      console.error('2. 서비스 계정에 적절한 권한이 부여되었는지 확인');
    } else if (error.code === 401) {
      console.error('\n💡 해결 방법:');
      console.error('1. 서비스 계정 키가 올바른지 확인');
      console.error('2. JSON 파일이 손상되지 않았는지 확인');
    }
    
    process.exit(1);
  }
}

// 스크립트 실행
if (require.main === module) {
  testGoogleDriveConnection();
}

module.exports = { testGoogleDriveConnection, getGoogleDriveClient };
