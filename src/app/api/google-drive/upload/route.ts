import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

function getGoogleDriveClient() {
  // 환경변수 검증
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  
  if (!credentials) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS 환경변수가 설정되지 않았습니다.');
  }
  
  if (!folderId) {
    throw new Error('GOOGLE_DRIVE_FOLDER_ID 환경변수가 설정되지 않았습니다.');
  }
  
  let auth;
  try {
    const serviceAccount = JSON.parse(credentials);
    auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
  } catch (parseError) {
    throw new Error(`Google 서비스 계정 인증 정보 파싱 실패: ${parseError}`);
  }

  return google.drive({ version: 'v3', auth });
}

export async function POST(request: NextRequest) {
  try {
    console.log('📁 Google Drive 업로드 API 시작');
    
    // Content-Type 확인 및 처리
    const contentType = request.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      // JSON 요청 처리 (테스트용)
      const jsonData = await request.json();
      console.log('JSON 테스트 요청:', jsonData);
      return NextResponse.json({
        success: true,
        message: 'Google Drive API 엔드포인트 정상 작동',
        testData: jsonData
      });
    }
    
    // FormData 요청 처리
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileName = formData.get('fileName') as string;
    const folderId = formData.get('folderId') as string;

    if (!file || !fileName) {
      return NextResponse.json(
        { error: '파일과 파일명이 필요합니다.' },
        { status: 400 }
      );
    }

    // 파일을 Buffer로 변환
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const drive = getGoogleDriveClient();

    // 파일 메타데이터 설정
    const fileMetadata = {
      name: fileName,
      parents: folderId ? [folderId] : [process.env.GOOGLE_DRIVE_FOLDER_ID!],
      mimeType: file.type || 'application/octet-stream',
    };

    // 미디어 설정
    const media = {
      mimeType: file.type || 'application/octet-stream',
      body: require('stream').Readable.from(buffer),
    };

    console.log('📤 파일 업로드 시작:', fileName);

    // 파일 업로드
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id,name,size,webViewLink',
    });

    console.log('✅ 파일 업로드 성공:', response.data.name);

    return NextResponse.json({
      success: true,
      fileId: response.data.id,
      fileName: response.data.name,
      fileSize: response.data.size,
      webViewLink: response.data.webViewLink,
    });

  } catch (error: any) {
    console.error('❌ Google Drive 업로드 오류:', error);
    
    // 구체적인 오류 메시지 제공
    let errorMessage = '파일 업로드에 실패했습니다.';
    let errorDetails = '';
    
    if (error.message.includes('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS')) {
      errorMessage = 'Google 서비스 계정 인증 정보가 설정되지 않았습니다.';
      errorDetails = '관리자에게 문의하세요.';
    } else if (error.message.includes('GOOGLE_DRIVE_FOLDER_ID')) {
      errorMessage = 'Google Drive 폴더 ID가 설정되지 않았습니다.';
      errorDetails = '관리자에게 문의하세요.';
    } else if (error.code === 401) {
      errorMessage = 'Google API 인증에 실패했습니다.';
      errorDetails = '서비스 계정 권한을 확인하세요.';
    } else if (error.code === 403) {
      errorMessage = 'Google Drive 접근 권한이 없습니다.';
      errorDetails = '폴더 접근 권한을 확인하세요.';
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: errorDetails || error.message,
        code: error.code || 'UNKNOWN_ERROR'
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
