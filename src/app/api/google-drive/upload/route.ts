import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Google Drive API 클라이언트 초기화 (OAuth 위임 방식)
function getGoogleDriveClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_id: process.env.GOOGLE_CLIENT_ID,
    },
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });

  return google.drive({ version: 'v3', auth });
}

export async function POST(request: NextRequest) {
  try {
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
      parents: folderId ? [folderId] : undefined,
      mimeType: file.type || 'application/octet-stream',
    };

    // 미디어 설정
    const media = {
      mimeType: file.type || 'application/octet-stream',
      body: require('stream').Readable.from(buffer),
    };

    // 파일 업로드
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id,name,size,webViewLink',
    });

    return NextResponse.json({
      success: true,
      fileId: response.data.id,
      fileName: response.data.name,
      fileSize: response.data.size,
      webViewLink: response.data.webViewLink,
    });

  } catch (error: any) {
    console.error('Google Drive 업로드 오류:', error);
    
    return NextResponse.json(
      { 
        error: '파일 업로드에 실패했습니다.',
        details: error.message 
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
