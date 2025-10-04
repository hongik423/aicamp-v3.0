/**
 * Google Drive 폴더 문제 해결 스크립트
 * AICAMP_REPORTS 폴더를 찾거나 생성하고 올바른 폴더 ID를 설정합니다.
 */

function fixDriveFolderIssue() {
  console.log('🔧 Google Drive 폴더 문제 해결 시작...');
  
  try {
    // 1. 현재 설정된 폴더 ID 확인
    const env = getEnvironmentConfig();
    const currentFolderId = env.DRIVE_FOLDER_ID;
    console.log('📋 현재 설정된 폴더 ID:', currentFolderId);
    
    // 2. 현재 폴더 ID로 폴더 접근 시도
    let targetFolder = null;
    try {
      targetFolder = DriveApp.getFolderById(currentFolderId);
      console.log('✅ 현재 폴더 ID로 폴더 접근 성공');
      console.log('📁 폴더명:', targetFolder.getName());
      console.log('🔗 폴더 URL:', targetFolder.getUrl());
      return { success: true, folderId: currentFolderId, folderName: targetFolder.getName() };
    } catch (folderError) {
      console.log('❌ 현재 폴더 ID로 접근 실패:', folderError.message);
    }
    
    // 3. AICAMP_REPORTS 폴더 이름으로 검색
    console.log('🔍 AICAMP_REPORTS 폴더 검색 중...');
    const folders = DriveApp.getFoldersByName('AICAMP_REPORTS');
    
    if (folders.hasNext()) {
      targetFolder = folders.next();
      console.log('✅ AICAMP_REPORTS 폴더 발견');
      console.log('📁 폴더 ID:', targetFolder.getId());
      console.log('📁 폴더명:', targetFolder.getName());
      console.log('🔗 폴더 URL:', targetFolder.getUrl());
      
      // 4. 환경변수 업데이트
      const properties = PropertiesService.getScriptProperties();
      properties.setProperty('DRIVE_FOLDER_ID', targetFolder.getId());
      console.log('✅ DRIVE_FOLDER_ID 환경변수 업데이트 완료');
      
      return { 
        success: true, 
        folderId: targetFolder.getId(), 
        folderName: targetFolder.getName(),
        updated: true 
      };
    }
    
    // 5. AICAMP_REPORTS 폴더가 없으면 새로 생성
    console.log('📁 AICAMP_REPORTS 폴더가 없어 새로 생성합니다');
    targetFolder = DriveApp.createFolder('AICAMP_REPORTS');
    
    // 6. 폴더 공유 설정
    targetFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    console.log('✅ AICAMP_REPORTS 폴더 생성 완료');
    console.log('📁 폴더 ID:', targetFolder.getId());
    console.log('📁 폴더명:', targetFolder.getName());
    console.log('🔗 폴더 URL:', targetFolder.getUrl());
    
    // 7. 환경변수 업데이트
    const properties = PropertiesService.getScriptProperties();
    properties.setProperty('DRIVE_FOLDER_ID', targetFolder.getId());
    console.log('✅ DRIVE_FOLDER_ID 환경변수 업데이트 완료');
    
    return { 
      success: true, 
      folderId: targetFolder.getId(), 
      folderName: targetFolder.getName(),
      created: true 
    };
    
  } catch (error) {
    console.error('❌ Google Drive 폴더 문제 해결 실패:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Google Drive 폴더 상태 확인
 */
function checkDriveFolderStatus() {
  console.log('🔍 Google Drive 폴더 상태 확인...');
  
  try {
    const env = getEnvironmentConfig();
    const folderId = env.DRIVE_FOLDER_ID;
    
    console.log('📋 설정된 폴더 ID:', folderId);
    
    if (!folderId) {
      console.log('❌ DRIVE_FOLDER_ID가 설정되지 않음');
      return { success: false, error: 'DRIVE_FOLDER_ID not set' };
    }
    
    // 폴더 접근 테스트
    const folder = DriveApp.getFolderById(folderId);
    console.log('✅ 폴더 접근 성공');
    console.log('📁 폴더명:', folder.getName());
    console.log('🔗 폴더 URL:', folder.getUrl());
    console.log('👥 공유 설정:', folder.getSharingAccess());
    
    // 폴더 내 파일 수 확인
    const files = folder.getFiles();
    let fileCount = 0;
    while (files.hasNext()) {
      files.next();
      fileCount++;
    }
    console.log('📄 폴더 내 파일 수:', fileCount);
    
    return { 
      success: true, 
      folderId: folderId,
      folderName: folder.getName(),
      folderUrl: folder.getUrl(),
      fileCount: fileCount,
      sharingAccess: folder.getSharingAccess()
    };
    
  } catch (error) {
    console.error('❌ 폴더 상태 확인 실패:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 테스트 파일 업로드
 */
function testFileUpload() {
  console.log('🧪 테스트 파일 업로드 시작...');
  
  try {
    const env = getEnvironmentConfig();
    const folderId = env.DRIVE_FOLDER_ID;
    
    if (!folderId) {
      throw new Error('DRIVE_FOLDER_ID가 설정되지 않음');
    }
    
    const folder = DriveApp.getFolderById(folderId);
    
    // 테스트 HTML 내용
    const testHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>테스트 보고서</title>
</head>
<body>
    <h1>이교장의AI역량진단보고서 - 테스트</h1>
    <p>생성 시간: ${new Date().toISOString()}</p>
    <p>이 파일은 Google Drive 업로드 테스트용입니다.</p>
</body>
</html>`;
    
    const fileName = `테스트_보고서_${new Date().getTime()}.html`;
    const blob = Utilities.newBlob(testHtml, 'text/html', fileName);
    const file = folder.createFile(blob);
    
    // 파일 공유 설정
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    console.log('✅ 테스트 파일 업로드 성공');
    console.log('📄 파일명:', fileName);
    console.log('🔗 파일 URL:', file.getUrl());
    console.log('📁 파일 ID:', file.getId());
    
    return { 
      success: true, 
      fileName: fileName,
      fileUrl: file.getUrl(),
      fileId: file.getId()
    };
    
  } catch (error) {
    console.error('❌ 테스트 파일 업로드 실패:', error);
    return { success: false, error: error.message };
  }
}

// 실행 방법:
// 1. fixDriveFolderIssue() - 폴더 문제 해결
// 2. checkDriveFolderStatus() - 폴더 상태 확인
// 3. testFileUpload() - 테스트 파일 업로드
