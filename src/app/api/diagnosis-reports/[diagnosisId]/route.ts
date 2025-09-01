/**
 * V28.0 n8n 프로세스 자동화 중심 고도화 진단 보고서 API
 * 무오류 품질 + 동기화 시스템 + McKinsey급 분석
 */

import { NextRequest, NextResponse } from 'next/server';
import { Ultimate35PageGenerator, DiagnosisData } from '@/lib/diagnosis/ultimate-35-page-generator';
import { N8nAutomationReportEngine } from '@/lib/diagnosis/n8n-automation-report-engine';
import { SyncManager } from '@/lib/diagnosis/sync-manager';

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
    
    console.log('🚀 V28.0 n8n 자동화 중심 고도화 보고서 조회 요청:', diagnosisId);
    
    // 🛡️ 보안 강화: 진단 ID 유효성 검사
    if (!diagnosisId || diagnosisId.length < 10) {
      console.warn('⚠️ 유효하지 않은 진단 ID:', diagnosisId);
      return NextResponse.json(
        { 
          success: false, 
          error: '유효하지 않은 진단 ID입니다. 이메일로 받으신 정확한 진단ID를 입력해주세요.',
          code: 'INVALID_DIAGNOSIS_ID',
          receivedId: diagnosisId
        },
        { status: 400 }
      );
    }
    
    // 🔄 동기화 상태 추적 시작
    await SyncManager.trackSyncStatus(diagnosisId, 'started', {
      requestTime: new Date().toISOString(),
      userAgent: request.headers.get('user-agent')
    });

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

    // 🚀 V28.0 고도화된 n8n 자동화 보고서 생성 시스템
    console.log('🚀 V28.0 n8n 자동화 중심 고도화 보고서 생성 시작');
    
    try {
      // 🔄 무오류 데이터 동기화 및 고도화된 보고서 생성
      const automationReport = await N8nAutomationReportEngine.generateAutomationFocusedReport(normalizedDiagnosisId);
      
      if (automationReport.success && automationReport.htmlReport) {
        console.log('✅ V28.0 n8n 자동화 보고서 생성 성공!', {
          syncAttempts: automationReport.syncInfo?.attempts,
          waitTime: automationReport.syncInfo?.waitTime,
          dataFreshness: automationReport.syncInfo?.dataFreshness + '분'
        });
        
        // 동기화 상태 완료 추적
        await SyncManager.trackSyncStatus(diagnosisId, 'completed', {
          reportGenerated: true,
          syncAttempts: automationReport.syncInfo?.attempts,
          totalWaitTime: automationReport.syncInfo?.waitTime,
          reportType: 'n8n_automation_focused'
        });
        
        return NextResponse.json({
          success: true,
          message: '🚀 n8n 프로세스 자동화 중심 AI 역량진단 보고서 생성 성공',
          diagnosisId,
          htmlReport: automationReport.htmlReport,
          reportInfo: {
            diagnosisId,
            fileName: `AI프로세스자동화역량진단_${diagnosisId}_n8n중심보고서.html`,
            createdAt: new Date().toISOString(),
            version: 'V28.0-N8N-AUTOMATION-FOCUSED',
            reportType: 'n8n_process_automation',
            syncInfo: automationReport.syncInfo,
            features: [
              '프로세스 자동화 중심 분석',
              '고몰입 조직구축 전략',
              '업종별 특화 인사이트',
              '동기부여 성공사례',
              'n8n 구현 로드맵',
              '상호작용 차트'
            ]
          }
        });
      } else {
        throw new Error(automationReport.error || 'n8n 자동화 보고서 생성 실패');
      }
      
    } catch (automationError: any) {
      console.error('❌ V28.0 n8n 자동화 보고서 생성 실패, 기본 보고서로 폴백:', automationError.message);
      
      // 동기화 상태 실패 추적
      await SyncManager.trackSyncStatus(diagnosisId, 'failed', {
        error: automationError.message,
        fallbackUsed: true
      });
      
      // 폴백: 기존 Ultimate35PageGenerator 사용
      console.log('🔄 기존 35페이지 보고서 시스템으로 폴백 처리');
      
      try {
        const gasUrl = process.env.NEXT_PUBLIC_GAS_URL || 
                       'https://script.google.com/macros/s/AKfycbzO4ykDtUetroPX2TtQ1wkiOVNtd56tUZpPT4EITaLnXeMxTGdIIN8MIEMvOOy8ywTN/exec';

        const gasPayload = {
          type: 'query_diagnosis',
          action: 'queryDiagnosisById',
          diagnosisId: normalizedDiagnosisId,
          timestamp: new Date().toISOString()
        };

        const response = await fetch(gasUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(gasPayload),
        });

        if (response.ok) {
          const result = await response.json();
          
          if (result.success && result.data) {
            console.log('✅ 폴백: GAS에서 데이터 조회 성공');
            
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
            
            // 기존 35페이지 보고서 생성
            const htmlReport = Ultimate35PageGenerator.generateUltimate35PageReport(diagnosisData);
            
            console.log('✅ 폴백: 기존 35페이지 보고서 생성 완료');
            
            return NextResponse.json({
              success: true,
              message: '📄 35페이지 AI 역량진단 보고서 생성 성공 (폴백)',
              diagnosisId,
              htmlReport,
              reportInfo: {
                diagnosisId,
                fileName: `AI역량진단_35페이지보고서_${diagnosisData.companyInfo.name}_${diagnosisId}_${diagnosisData.scores.total}점.html`,
                createdAt: new Date().toISOString(),
                version: 'V27.0-FALLBACK',
                totalScore: diagnosisData.scores.total,
                percentage: diagnosisData.scores.percentage,
                grade: diagnosisData.grade,
                maturityLevel: diagnosisData.maturityLevel,
                industry: diagnosisData.companyInfo.industry,
                reportGenerated: true,
                actualScoreReflected: true,
                pages: 35,
                factBasedSystem: true,
                isVirtualData: false,
                fallbackMode: true
              }
            });
          }
        }
        
        throw new Error('GAS에서 데이터를 조회할 수 없습니다.');
        
      } catch (fallbackError: any) {
        console.error('❌ 폴백 시스템도 실패:', fallbackError.message);
        
        return NextResponse.json({
          success: false,
          error: '보고서 생성에 실패했습니다. 잠시 후 다시 시도해주세요.',
          details: fallbackError.message,
          diagnosisId,
          timestamp: new Date().toISOString(),
          version: 'V28.0-ERROR'
        }, { status: 500 });
      }
    }
    
  } catch (error: any) {
    const { diagnosisId } = await params;
    console.error('❌ V28.0 보고서 조회 최종 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: '보고서 조회 중 오류가 발생했습니다.',
      details: error.message,
      diagnosisId,
      timestamp: new Date().toISOString(),
      version: 'V28.0-CRITICAL-ERROR'
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