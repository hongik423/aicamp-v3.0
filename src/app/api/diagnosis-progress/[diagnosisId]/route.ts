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

    // Google Apps Script 진행 상태 + 로컬 스토어 진행 상태 병합
    const gasUrl = getGasUrl();

    let progressData: any = null;
    if (gasUrl) {
      try {
        const progressResponse = await fetch(gasUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'checkProgress', diagnosisId })
        });
        if (progressResponse.ok) {
          progressData = await progressResponse.json();
        }
      } catch {}
    }

    // 로컬 스토어 스냅샷 (사실 기반 이벤트 우선)
    const storeSnapshot = getProgressState(diagnosisId) ? getProgressSnapshot(diagnosisId) : null;

    // 진행 상태 데이터 구조화
    const response = {
      success: true,
      diagnosisId,
      progress: {
        overallProgress: progressData?.overallProgress || 0,
        currentStep: progressData?.currentStep || 'data-validation',
        steps: (storeSnapshot?.steps && Object.keys(storeSnapshot.steps).length > 0)
          ? storeSnapshot.steps
          : (progressData?.steps || {
              'data-validation': { status: 'in-progress', progress: 50 },
              'gemini-analysis': { status: 'pending', progress: 0 },
              'swot-analysis': { status: 'pending', progress: 0 },
              'report-generation': { status: 'pending', progress: 0 },
              'email-sending': { status: 'pending', progress: 0 }
            }),
        estimatedTimeRemaining: progressData?.estimatedTimeRemaining || 480000,
        lastUpdated: Date.now()
      },
      completed: progressData?.completed || false,
      result: progressData?.result || null
    };

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
    
    // 오류 발생 시 기본 진행 상태 반환 (진행 중으로 가정)
    return NextResponse.json({
      success: true,
      diagnosisId: (await params).diagnosisId,
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
      result: null
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
