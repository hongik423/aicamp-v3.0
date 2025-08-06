import { NextRequest, NextResponse } from 'next/server';

// 진행상황 공유 데이터 저장소 (실제 서비스에서는 Redis나 DB 사용)
interface SharedProgress {
  shareCode: string;
  responses: Record<string, number>;
  progress: number;
  totalScore: number;
  timestamp: string;
  participants: number;
  lastUpdate: number;
}

const sharedProgressStore = new Map<string, SharedProgress>();

// CORS 헤더
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

/**
 * 공유 코드별 진행상황 조회
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;

    if (!code) {
      return NextResponse.json({
        success: false,
        error: '공유 코드가 필요합니다.'
      }, { status: 400, headers: corsHeaders });
    }

    const sharedProgress = sharedProgressStore.get(code);

    if (!sharedProgress) {
      return NextResponse.json({
        success: false,
        error: '공유된 진행상황을 찾을 수 없습니다.',
        code: code
      }, { status: 404, headers: corsHeaders });
    }

    // 참여자 수 증가 (중복 방지)
    const now = Date.now();
    if (now - sharedProgress.lastUpdate > 30000) { // 30초마다 한 번씩만 증가
      sharedProgress.participants += 1;
    }
    sharedProgress.lastUpdate = now;

    console.log('📊 공유 진행상황 조회:', {
      shareCode: code,
      progress: `${sharedProgress.progress}%`,
      totalScore: `${sharedProgress.totalScore}점`,
      participants: sharedProgress.participants,
      responsesCount: Object.keys(sharedProgress.responses).length
    });

    return NextResponse.json({
      success: true,
      shareCode: sharedProgress.shareCode,
      progress: sharedProgress.progress,
      totalScore: sharedProgress.totalScore,
      responses: sharedProgress.responses,
      participants: sharedProgress.participants,
      timestamp: sharedProgress.timestamp,
      lastUpdate: sharedProgress.lastUpdate,
      message: '진행상황이 성공적으로 조회되었습니다.'
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('❌ 공유 진행상황 조회 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: '진행상황 조회 중 오류가 발생했습니다.',
      details: error instanceof Error ? error.message : '알 수 없는 오류'
    }, { status: 500, headers: corsHeaders });
  }
} 