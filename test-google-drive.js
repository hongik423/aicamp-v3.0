/**
 * Google Drive API 연결 테스트 스크립트
 * 
 * 사용법:
 * 1. .env.local 파일에 Google Drive API 설정 추가
 * 2. node test-google-drive.js 실행
 */

require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

// Google Drive API 설정
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

function getGoogleDriveClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_id: process.env.GOOGLE_CLIENT_ID,
    },
    scopes: SCOPES,
  });

  return google.drive({ version: 'v3', auth });
}

async function testGoogleDriveConnection() {
  try {
    console.log('🔍 Google Drive API 연결 테스트 시작...');
    
    // 환경변수 확인
    console.log('\n📋 환경변수 확인:');
    console.log('- GOOGLE_SERVICE_ACCOUNT_EMAIL:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? '✅ 설정됨' : '❌ 누락');
    console.log('- GOOGLE_PRIVATE_KEY:', process.env.GOOGLE_PRIVATE_KEY ? '✅ 설정됨' : '❌ 누락');
    console.log('- GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✅ 설정됨' : '❌ 누락');
    console.log('- DRIVE_FOLDER_ID:', process.env.DRIVE_FOLDER_ID || '1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj');
    
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error('필수 환경변수가 설정되지 않았습니다. .env.local 파일을 확인하세요.');
    }
    
    // Google Drive 클라이언트 초기화
    console.log('\n🚀 Google Drive 클라이언트 초기화...');
    const drive = getGoogleDriveClient();
    
    // 폴더 정보 확인
    const folderId = process.env.DRIVE_FOLDER_ID || '1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj';
    console.log('\n📁 폴더 정보 확인:', folderId);
    
    const folderResponse = await drive.files.get({
      fileId: folderId,
      fields: 'id,name,mimeType,permissions'
    });
    
    console.log('✅ 폴더 접근 성공:');
    console.log('- 폴더 ID:', folderResponse.data.id);
    console.log('- 폴더 이름:', folderResponse.data.name);
    console.log('- MIME 타입:', folderResponse.data.mimeType);
    
    // 폴더 권한 확인
    if (folderResponse.data.permissions) {
      console.log('\n🔐 폴더 권한:');
      folderResponse.data.permissions.forEach(permission => {
        console.log(`- ${permission.emailAddress}: ${permission.role}`);
      });
    }
    
    // 테스트 파일 업로드
    console.log('\n📤 테스트 파일 업로드...');
    const testContent = 'AI 역량진단 시스템 Google Drive API 테스트 파일입니다.';
    const testBuffer = Buffer.from(testContent, 'utf-8');
    
    const fileMetadata = {
      name: `test-${Date.now()}.txt`,
      parents: [folderId],
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
    
    console.log('✅ 테스트 파일 업로드 성공:');
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
    console.log('모든 기능이 정상적으로 작동합니다.');
    
  } catch (error) {
    console.error('\n❌ Google Drive API 연결 테스트 실패:');
    console.error('오류:', error.message);
    
    if (error.code === 403) {
      console.error('\n💡 해결 방법:');
      console.error('1. Google Cloud Console에서 Google Drive API가 활성화되었는지 확인');
      console.error('2. 서비스 계정에 적절한 권한이 부여되었는지 확인');
      console.error('3. 폴더에 서비스 계정 이메일이 공유되었는지 확인');
    } else if (error.code === 401) {
      console.error('\n💡 해결 방법:');
      console.error('1. 서비스 계정 키가 올바른지 확인');
      console.error('2. 환경변수 설정이 정확한지 확인');
    } else if (error.code === 404) {
      console.error('\n💡 해결 방법:');
      console.error('1. 폴더 ID가 올바른지 확인');
      console.error('2. 폴더가 존재하는지 확인');
    }
    
    process.exit(1);
  }
}

// 스크립트 실행
if (require.main === module) {
  testGoogleDriveConnection();
}

module.exports = { testGoogleDriveConnection, getGoogleDriveClient };
