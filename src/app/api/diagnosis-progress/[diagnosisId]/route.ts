import { NextRequest, NextResponse } from 'next/server';
import { getGasUrl } from '@/lib/config/env';
import { getProgressSnapshot, getProgressState } from '../../_progressStore';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ diagnosisId: string }> }
) {
  try {
    const { diagnosisId } = await params;
    
    console.log('📊 진행상황 조회 요청:', diagnosisId);
    
    if (!diagnosisId) {
      console.warn('⚠️ 진단 ID 누락');
      return NextResponse.json(
        { success: false, error: '진단 ID가 필요합니다' },
        { status: 400 }
      );
    }
    
    // diagnosisId 유효성 검증
    if (typeof diagnosisId !== 'string' || diagnosisId.trim().length === 0) {
      console.warn('⚠️ 유효하지 않은 진단 ID:', diagnosisId);
      return NextResponse.json(
        { success: false, error: '유효하지 않은 진단 ID입니다' },
        { status: 400 }
      );
    }

    // 로컬 스토어 우선 확인 (즉시 사용 가능)
    const storeSnapshot = getProgressState(diagnosisId) ? getProgressSnapshot(diagnosisId) : null;
    
    // Google Apps Script 진행 상태 (보조적으로 사용)
    const gasUrl = getGasUrl();
    let progressData: any = null;
    
    if (gasUrl) {
      try {
        console.log('🔄 GAS 진행상황 조회 시도:', diagnosisId);
        const progressResponse = await fetch(gasUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'checkProgress', diagnosisId }),
          signal: AbortSignal.timeout(5000) // 5초 타임아웃
        });
        
        if (progressResponse.ok) {
          progressData = await progressResponse.json();
          console.log('✅ GAS 진행상황 조회 성공');
        } else {
          console.log('⚠️ GAS 진행상황 조회 실패 (HTTP):', progressResponse.status);
        }
      } catch (error) {
        console.log('⚠️ GAS 진행상황 조회 실패 (Network):', error);
      }
    }

    // 🎯 진행 상태 데이터 구조화 (404 타이밍 문제 해결)
    const hasGasData = progressData && progressData.success;
    const hasLocalData = storeSnapshot && Object.keys(storeSnapshot.steps || {}).length > 0;
    
    // 데이터 소스 우선순위: 1) GAS 실제 데이터, 2) 로컬 스토어, 3) 기본값
    const response = {
      success: true,
      diagnosisId,
      progress: {
        overallProgress: hasGasData ? progressData.overallProgress : 
                        hasLocalData ? calculateOverallProgress(storeSnapshot.steps) : 15,
        currentStep: hasGasData ? progressData.currentStep : 
                    hasLocalData ? getCurrentStep(storeSnapshot.steps) : 'gemini-analysis',
        steps: hasGasData ? progressData.steps :
               hasLocalData ? storeSnapshot.steps : {
                 'data-validation': { status: 'completed', progress: 100 },
                 'gemini-analysis': { status: 'in-progress', progress: 30 },
                 'swot-analysis': { status: 'pending', progress: 0 },
                 'report-generation': { status: 'pending', progress: 0 },
                 'email-sending': { status: 'pending', progress: 0 }
               },
        estimatedTimeRemaining: hasGasData ? progressData.estimatedTimeRemaining : 
                               hasLocalData ? 420000 : 480000,
        lastUpdated: Date.now(),
        dataSource: hasGasData ? 'gas' : hasLocalData ? 'local' : 'fallback'
      },
      completed: hasGasData ? progressData.completed : false,
      result: hasGasData ? progressData.result : null,
      timing: {
        gasAvailable: hasGasData,
        localAvailable: hasLocalData,
        fallbackMode: !hasGasData && !hasLocalData
      }
    };

// 헬퍼 함수들
function calculateOverallProgress(steps) {
  if (!steps) return 0;
  const stepValues = Object.values(steps);
  const totalProgress = stepValues.reduce((sum, step) => sum + (step.progress || 0), 0);
  return Math.round(totalProgress / stepValues.length);
}

function getCurrentStep(steps) {
  if (!steps) return 'data-validation';
  for (const [stepName, stepData] of Object.entries(steps)) {
    if (stepData.status === 'in-progress') return stepName;
  }
  return 'data-validation';
}

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

  } catch (error) {
    console.error('진단 진행 상태 확인 오류:', error);
    
    // params를 안전하게 처리
    let safeDiagnosisId: string;
    try {
      const resolvedParams = await params;
      safeDiagnosisId = resolvedParams.diagnosisId;
    } catch (paramError) {
      console.error('params 처리 오류:', paramError);
      safeDiagnosisId = 'unknown';
    }
    
    // 오류 발생 시 기본 진행 상태 반환 (진행 중으로 가정)
    return NextResponse.json({
      success: true,
      diagnosisId: safeDiagnosisId,
      progress: {
        overallProgress: 25,
        currentStep: 'gemini-analysis',
        steps: {
          'data-validation': { status: 'completed', progress: 100 },
          'gemini-analysis': { status: 'in-progress', progress: 30 },
          'swot-analysis': { status: 'pending', progress: 0 },
          'report-generation': { status: 'pending', progress: 0 },
          'email-sending': { status: 'pending', progress: 0 }
        },
        estimatedTimeRemaining: 360000, // 6분
        lastUpdated: Date.now()
      },
      completed: false,
      result: null,
      fallback: true // 폴백 모드임을 표시
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
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
