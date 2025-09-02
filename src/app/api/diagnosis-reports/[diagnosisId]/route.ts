/**
 * 🔥 실제 35페이지 보고서 생성 API - 사실기반 1원칙
 * Ultimate35PageGenerator만 사용 (검증 완료)
 */

import { NextRequest, NextResponse } from 'next/server';
import { Ultimate35PageGenerator, DiagnosisData } from '@/lib/diagnosis/ultimate-35-page-generator';
import { queryDiagnosisFromGAS } from '@/lib/gas/gas-connector';
import { getGasUrl } from '@/lib/config/env';

// 등급 계산 함수
function calculateGrade(percentage: number): string {
  if (percentage >= 90) return 'S';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  return 'F';
}

// 성숙도 레벨 계산 함수
function calculateMaturityLevel(percentage: number): string {
  if (percentage >= 90) return 'AI 선도기업';
  if (percentage >= 80) return 'AI 활용기업';
  if (percentage >= 70) return 'AI 도입기업';
  if (percentage >= 60) return 'AI 관심기업';
  if (percentage >= 50) return 'AI 준비기업';
  return 'AI 미도입기업';
}

interface RouteParams {
  params: Promise<{ diagnosisId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { diagnosisId } = await params;
    
    console.log('🔥 실제 35페이지 보고서 생성 요청:', diagnosisId);
    
    // 진단ID 검증
    if (!diagnosisId || typeof diagnosisId !== 'string' || diagnosisId.length < 10) {
      return NextResponse.json(
        { 
          success: false, 
          error: '유효하지 않은 진단ID입니다.',
          diagnosisId
        },
        { status: 400 }
      );
    }

    // 진단 ID 형식 정규화
    let normalizedDiagnosisId = diagnosisId;
    if (!diagnosisId.startsWith('DIAG_45Q_AI_') && diagnosisId.startsWith('DIAG_')) {
      if (diagnosisId.startsWith('DIAG_45Q_')) {
        normalizedDiagnosisId = diagnosisId.replace('DIAG_45Q_', 'DIAG_45Q_AI_');
      } else if (diagnosisId.startsWith('DIAG_AI_')) {
        normalizedDiagnosisId = diagnosisId.replace('DIAG_AI_', 'DIAG_45Q_AI_');
      } else if (diagnosisId.startsWith('DIAG_')) {
        const baseId = diagnosisId.replace('DIAG_', '');
        normalizedDiagnosisId = `DIAG_45Q_AI_${baseId}`;
      }
      console.log('🔄 진단 ID 정규화:', diagnosisId, '=>', normalizedDiagnosisId);
    }

    // 🔥 실제 데이터 조회 (사실기반 1원칙)
    console.log('🔥 실제 데이터 조회 시작:', normalizedDiagnosisId);
    const result = await queryDiagnosisFromGAS(normalizedDiagnosisId);
    
    if (!result.success || !result.data) {
      return NextResponse.json(
        { 
          success: false, 
          error: '🔥 실제 진단 데이터를 찾을 수 없습니다.',
          details: `사실기반 보고서 작성을 위해 실제 진단 데이터가 필요합니다.\n\n진단서 제출이 완료되었는지 확인해주세요.`,
          diagnosisId: normalizedDiagnosisId
        },
        { status: 404 }
      );
    }

    console.log('✅ 실제 데이터 조회 성공');

    // DiagnosisData 구조로 변환
    const diagnosisData: DiagnosisData = {
      diagnosisId,
      companyInfo: {
        name: String(result.data.companyName) || '기업명',
        industry: result.data.industry || 'IT/소프트웨어',
        size: result.data.employeeCount || '중소기업',
        revenue: result.data.annualRevenue,
        employees: result.data.employeeCount,
        position: result.data.position || '담당자',
        location: result.data.location || '서울'
      },
      responses: result.data.responses || result.data.assessmentResponses || {},
      scores: {
        total: Number(result.data.totalScore) || 0,
        percentage: Number(result.data.percentage) || 0,
        categoryScores: {
          businessFoundation: Number(result.data.categoryScores?.businessFoundation) || 0,
          currentAI: Number(result.data.categoryScores?.currentAI) || 0,
          organizationReadiness: Number(result.data.categoryScores?.organizationReadiness) || 0,
          technologyInfrastructure: Number(result.data.categoryScores?.techInfrastructure) || 0,
          dataManagement: Number(result.data.categoryScores?.goalClarity) || 0,
          humanResources: Number(result.data.categoryScores?.executionCapability) || 0
        }
      },
      timestamp: result.data.timestamp || new Date().toISOString(),
      grade: result.data.grade || calculateGrade(Number(result.data.percentage) || 0),
      maturityLevel: result.data.maturityLevel || calculateMaturityLevel(Number(result.data.percentage) || 0),
      isVirtualData: false
    };

    // 🚀 실제 35페이지 보고서 생성
    const htmlReport = Ultimate35PageGenerator.generateUltimate35PageReport(diagnosisData);
    
    console.log('✅ 실제 35페이지 보고서 생성 완료');

    return NextResponse.json({
      success: true,
      message: '🔥 실제 데이터 기반 35페이지 AI 역량진단 보고서 생성 성공',
      diagnosisId,
      htmlReport: htmlReport,
      reportInfo: {
        diagnosisId,
        fileName: `AI역량진단보고서_${diagnosisData.companyInfo.name}_${diagnosisId}_실제35페이지.html`,
        createdAt: new Date().toISOString(),
        version: 'V27.0-ULTIMATE-35PAGE-REAL',
        reportType: '실제_데이터_35페이지',
        totalScore: diagnosisData.scores.total,
        grade: diagnosisData.grade,
        maturityLevel: diagnosisData.maturityLevel,
        industry: diagnosisData.companyInfo.industry,
        reportGenerated: true,
        actualScoreReflected: true,
        pages: 35,
        factBasedSystem: true,
        isVirtualData: false
      }
    });
    
  } catch (error: any) {
    const { diagnosisId } = await params;
    console.error('❌ 35페이지 보고서 생성 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: '보고서 생성 중 오류가 발생했습니다.',
      details: error.message,
      diagnosisId,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}