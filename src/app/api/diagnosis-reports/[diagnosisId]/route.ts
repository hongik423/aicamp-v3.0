/**
 * V22.0 진단 보고서 조회 API
 */

import { NextRequest, NextResponse } from 'next/server';
// import { ReportStorage } from '@/lib/diagnosis/report-storage';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ diagnosisId: string }> }
) {
  try {
    const { diagnosisId } = await params;
    
    console.log('🔍 V22.0 보고서 조회 요청:', diagnosisId);
    
    // V22.0 보고서 저장소에서 조회 - 임시 비활성화
    const reportContent = null; // await ReportStorage.getReport(diagnosisId);
    
    if (reportContent) {
      console.log('✅ V22.0 보고서 조회 성공:', diagnosisId);
      
      return new NextResponse(reportContent, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    } else {
      console.log('❌ V22.0 보고서 없음:', diagnosisId);
      
      return NextResponse.json(
        { 
          success: false, 
          error: '보고서를 찾을 수 없습니다.',
          diagnosisId 
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('❌ V22.0 보고서 조회 실패:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: '보고서 조회 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
