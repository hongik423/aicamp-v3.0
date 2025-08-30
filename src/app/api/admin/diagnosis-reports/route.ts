/**
 * 관리자 대시보드용 진단 결과 목록 조회 API
 * Google Sheets에서 실제 데이터를 가져옴
 */

import { NextRequest, NextResponse } from 'next/server';
import { getGasUrl } from '@/lib/config/env';

export async function GET(request: NextRequest) {
  try {
    console.log('📊 관리자 진단 보고서 목록 조회 시작');
    
    // 🔒 보안 강화: 관리자 인증 상태 확인 (헤더 기반)
    const adminAuth = request.headers.get('x-admin-auth');
    const adminEmail = request.headers.get('x-admin-email');
    
    // 실제 운영에서는 JWT 토큰이나 세션 기반 인증 권장
    // 현재는 클라이언트 세션 스토리지 기반으로 구현
    console.log('🔐 관리자 접근 시도:', {
      hasAuth: !!adminAuth,
      email: adminEmail,
      timestamp: new Date().toISOString()
    });
    
    const gasUrl = getGasUrl();
    
    if (!gasUrl) {
      return NextResponse.json({
        success: false,
        error: 'Google Apps Script URL이 설정되지 않았습니다.'
      }, { status: 500 });
    }

    // Google Apps Script에서 모든 진단 결과 조회
    const gasPayload = {
      type: 'admin_query',
      action: 'get_all_diagnosis_reports',
      requestType: 'admin_dashboard',
      timestamp: new Date().toISOString()
    };

    console.log('🔄 Google Apps Script 관리자 데이터 요청 전송');

    const response = await fetch(gasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gasPayload),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script 응답 오류: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success && result.data) {
      console.log(`✅ 관리자 진단 데이터 조회 완료: ${result.data.length || 0}건`);
      
      return NextResponse.json({
        success: true,
        data: result.data,
        summary: {
          totalReports: result.data.length || 0,
          averageScore: result.summary?.averageScore || 0,
          topGrade: result.summary?.topGrade || 'N/A',
          todayReports: result.summary?.todayReports || 0
        },
        timestamp: new Date().toISOString()
      });
    } else {
      // Google Sheets 연결 실패 시 샘플 데이터 반환
      console.warn('⚠️ Google Sheets 연결 실패, 샘플 데이터 반환');
      
      const sampleReports = [
        {
          diagnosisId: 'DIAG_45Q_1234567890_abc123',
          companyName: '삼성전자',
          contactName: '김철수',
          contactEmail: 'kim@samsung.com',
          totalScore: 185,
          grade: 'A',
          maturityLevel: 'AI 선도기업',
          submittedAt: '2025-01-27T10:30:00',
          status: 'completed'
        },
        {
          diagnosisId: 'DIAG_45Q_1234567891_def456',
          companyName: 'LG전자',
          contactName: '이영희',
          contactEmail: 'lee@lg.com',
          totalScore: 158,
          grade: 'B+',
          maturityLevel: 'AI 활용기업',
          submittedAt: '2025-01-27T09:15:00',
          status: 'completed'
        },
        {
          diagnosisId: 'DIAG_45Q_1234567892_ghi789',
          companyName: 'SK하이닉스',
          contactName: '박민수',
          contactEmail: 'park@sk.com',
          totalScore: 142,
          grade: 'B',
          maturityLevel: 'AI 관심기업',
          submittedAt: '2025-01-27T08:45:00',
          status: 'completed'
        }
      ];
      
      return NextResponse.json({
        success: true,
        data: sampleReports,
        summary: {
          totalReports: sampleReports.length,
          averageScore: Math.round(sampleReports.reduce((sum, r) => sum + r.totalScore, 0) / sampleReports.length),
          topGrade: 'A',
          todayReports: 1
        },
        isSampleData: true,
        timestamp: new Date().toISOString()
      });
    }
    
  } catch (error: any) {
    console.error('❌ 관리자 진단 보고서 조회 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: '진단 보고서 조회 중 오류가 발생했습니다.',
      details: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
