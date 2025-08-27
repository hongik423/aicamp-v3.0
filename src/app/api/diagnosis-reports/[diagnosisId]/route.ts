/**
 * V22.0 진단 보고서 조회 API
 * 저장된 보고서를 조회하는 엔드포인트
 */

import { NextRequest, NextResponse } from 'next/server';
import { ReportStorage } from '@/lib/diagnosis/report-storage';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ diagnosisId: string }> }
) {
  try {
    const { diagnosisId } = await params;
    
    console.log('🔍 보고서 조회 요청:', diagnosisId);
    
    if (!diagnosisId) {
      return NextResponse.json(
        { error: '진단 ID가 필요합니다.' },
        { status: 400 }
      );
    }
    
    // V22.0 보고서 저장 시스템에서 조회
    const reportContent = await ReportStorage.getReport(diagnosisId);
    
    if (!reportContent) {
      return NextResponse.json(
        { error: '보고서를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    
    // Google Drive 링크인 경우 리다이렉트
    if (reportContent.startsWith('http')) {
      return NextResponse.redirect(reportContent);
    }
    
    // HTML 콘텐츠 직접 반환
    return new NextResponse(reportContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // 1시간 캐시
      },
    });
    
  } catch (error: any) {
    console.error('❌ 보고서 조회 오류:', error);
    
    return NextResponse.json(
      { 
        error: '보고서 조회 중 오류가 발생했습니다.',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

/**
 * 보고서 메타데이터 조회
 */
export async function HEAD(
  request: NextRequest,
  { params }: { params: Promise<{ diagnosisId: string }> }
) {
  try {
    const { diagnosisId } = await params;
    
    if (!diagnosisId) {
      return new NextResponse(null, { status: 400 });
    }
    
    const reportContent = await ReportStorage.getReport(diagnosisId);
    
    if (!reportContent) {
      return new NextResponse(null, { status: 404 });
    }
    
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': reportContent.length.toString(),
        'Last-Modified': new Date().toUTCString(),
      },
    });
    
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}