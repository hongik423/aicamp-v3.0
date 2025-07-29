'use client';

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { reportId, pdfData, fileName } = await request.json();
    
    if (!reportId || !pdfData || !fileName) {
      return NextResponse.json(
        { success: false, error: '필수 데이터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // report 폴더 경로 설정
    const reportDir = path.join(process.cwd(), 'report');
    
    // 폴더가 없으면 생성
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    // PDF 파일 저장
    const filePath = path.join(reportDir, fileName);
    const pdfBuffer = Buffer.from(pdfData, 'base64');
    fs.writeFileSync(filePath, pdfBuffer);

    return NextResponse.json({
      success: true,
      message: 'PDF 보고서가 성공적으로 저장되었습니다.',
      filePath: filePath,
      reportId: reportId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('PDF 저장 오류:', error);
    return NextResponse.json(
      { success: false, error: 'PDF 저장 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'PDF 보고서 저장 API 활성화',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
} 