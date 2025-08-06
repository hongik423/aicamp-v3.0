import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

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
 * 진행상황 공유 시작
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { responses, progress, totalScore, timestamp } = body;

    // 공유 코드 생성
    const shareCode = nanoid(8).toUpperCase();
    
    // 진행상황 저장
    const sharedProgress: SharedProgress = {
      shareCode,
      responses,
      progress,
      totalScore,
      timestamp,
      participants: 1,
      lastUpdate: Date.now()
    };

    sharedProgressStore.set(shareCode, sharedProgress);

    // 1시간 후 자동 삭제
    setTimeout(() => {
      sharedProgressStore.delete(shareCode);
    }, 60 * 60 * 1000);

    console.log('✅ 진행상황 공유 시작:', {
      shareCode,
      progress: `${progress}%`,
      totalScore: `${totalScore}점`,
      responsesCount: Object.keys(responses).length
    });

    return NextResponse.json({
      success: true,
      shareCode,
      shareUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/diagnosis/share/${shareCode}`,
      participants: 1,
      message: '진행상황 공유가 시작되었습니다.'
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('❌ 진행상황 공유 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: '진행상황 공유 중 오류가 발생했습니다.',
      details: error instanceof Error ? error.message : '알 수 없는 오류'
    }, { status: 500, headers: corsHeaders });
  }
}

/**
 * 공유된 진행상황 조회
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const shareCode = searchParams.get('code');

    if (!shareCode) {
      return NextResponse.json({
        success: false,
        error: '공유 코드가 필요합니다.'
      }, { status: 400, headers: corsHeaders });
    }

    const sharedProgress = sharedProgressStore.get(shareCode);

    if (!sharedProgress) {
      return NextResponse.json({
        success: false,
        error: '공유된 진행상황을 찾을 수 없습니다.'
      }, { status: 404, headers: corsHeaders });
    }

    // 참여자 수 증가
    sharedProgress.participants += 1;
    sharedProgress.lastUpdate = Date.now();

    console.log('📊 공유 진행상황 조회:', {
      shareCode,
      progress: `${sharedProgress.progress}%`,
      totalScore: `${sharedProgress.totalScore}점`,
      participants: sharedProgress.participants
    });

    return NextResponse.json({
      success: true,
      data: {
        shareCode: sharedProgress.shareCode,
        progress: sharedProgress.progress,
        totalScore: sharedProgress.totalScore,
        responses: sharedProgress.responses,
        participants: sharedProgress.participants,
        timestamp: sharedProgress.timestamp,
        lastUpdate: sharedProgress.lastUpdate
      }
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