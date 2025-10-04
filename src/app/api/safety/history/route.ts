import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Zod 스키마 정의
const LearningHistorySchema = z.object({
  userId: z.string().min(1, '사용자 ID는 필수입니다'),
  sessionAt: z.string().datetime(),
  studied: z.number().min(0, '학습 문제 수는 0 이상이어야 합니다'),
  correct: z.number().min(0, '정답 수는 0 이상이어야 합니다'),
  durationSec: z.number().min(0, '학습 시간은 0 이상이어야 합니다'),
  mode: z.enum(['card', 'immersive', 'slide', 'test']).default('card'),
  metadata: z.record(z.string(), z.any()).optional()
});

const HistoryQuerySchema = z.object({
  userId: z.string().min(1, '사용자 ID는 필수입니다'),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 50),
  offset: z.string().optional().transform(val => val ? parseInt(val) : 0)
});

// 학습 이력 저장
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = LearningHistorySchema.parse(body);

    // TODO: Supabase에 저장
    // const { data, error } = await supabase
    //   .from('user_learning_history')
    //   .insert({
    //     user_id: validatedData.userId,
    //     session_at: validatedData.sessionAt,
    //     studied: validatedData.studied,
    //     correct: validatedData.correct,
    //     duration_sec: validatedData.durationSec,
    //     mode: validatedData.mode,
    //     metadata: validatedData.metadata
    //   });

    // 임시 로컬 스토리지 시뮬레이션
    const learningHistory = JSON.parse(
      request.headers.get('x-learning-history') || '[]'
    );

    const historyEntry = {
      ...validatedData,
      id: Date.now().toString(),
      accuracy: validatedData.studied > 0 
        ? Math.round((validatedData.correct / validatedData.studied) * 100)
        : 0
    };

    learningHistory.push(historyEntry);

    return NextResponse.json({
      success: true,
      data: historyEntry,
      message: '학습 이력이 저장되었습니다.'
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: '유효성 검사 실패',
        details: error.issues
      }, { status: 400 });
    }

    console.error('학습 이력 저장 오류:', error);
    return NextResponse.json({
      success: false,
      error: '서버 오류가 발생했습니다.'
    }, { status: 500 });
  }
}

// 학습 이력 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = Object.fromEntries(searchParams.entries());
    const validatedQuery = HistoryQuerySchema.parse(query);

    // TODO: Supabase에서 조회
    // const { data, error } = await supabase
    //   .from('user_learning_history')
    //   .select('*')
    //   .eq('user_id', validatedQuery.userId)
    //   .order('session_at', { ascending: false })
    //   .range(validatedQuery.offset, validatedQuery.offset + validatedQuery.limit - 1);

    // 임시 로컬 스토리지 시뮬레이션
    const learningHistory = JSON.parse(
      request.headers.get('x-learning-history') || '[]'
    );

    let userHistory = learningHistory.filter((h: any) => h.userId === validatedQuery.userId);

    // 날짜 필터링
    if (validatedQuery.startDate) {
      userHistory = userHistory.filter((h: any) => 
        new Date(h.sessionAt) >= new Date(validatedQuery.startDate!)
      );
    }
    if (validatedQuery.endDate) {
      userHistory = userHistory.filter((h: any) => 
        new Date(h.sessionAt) <= new Date(validatedQuery.endDate!)
      );
    }

    userHistory = userHistory
      .sort((a: any, b: any) => new Date(b.sessionAt).getTime() - new Date(a.sessionAt).getTime())
      .slice(validatedQuery.offset, validatedQuery.offset + validatedQuery.limit);

    // 통계 계산
    const totalStudied = userHistory.reduce((sum: number, h: any) => sum + h.studied, 0);
    const totalCorrect = userHistory.reduce((sum: number, h: any) => sum + h.correct, 0);
    const totalDuration = userHistory.reduce((sum: number, h: any) => sum + h.durationSec, 0);
    const averageAccuracy = totalStudied > 0 ? Math.round((totalCorrect / totalStudied) * 100) : 0;

    return NextResponse.json({
      success: true,
      data: userHistory,
      statistics: {
        totalSessions: userHistory.length,
        totalStudied,
        totalCorrect,
        totalDuration,
        averageAccuracy
      },
      pagination: {
        limit: validatedQuery.limit,
        offset: validatedQuery.offset,
        total: learningHistory.filter((h: any) => h.userId === validatedQuery.userId).length
      }
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: '유효성 검사 실패',
        details: error.issues
      }, { status: 400 });
    }

    console.error('학습 이력 조회 오류:', error);
    return NextResponse.json({
      success: false,
      error: '서버 오류가 발생했습니다.'
    }, { status: 500 });
  }
}

// 학습 이력 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const historyId = searchParams.get('historyId');

    if (!userId) {
      return NextResponse.json({
        success: false,
        error: '사용자 ID가 필요합니다.'
      }, { status: 400 });
    }

    // TODO: Supabase에서 삭제
    // if (historyId) {
    //   const { error } = await supabase
    //     .from('user_learning_history')
    //     .delete()
    //     .eq('id', historyId)
    //     .eq('user_id', userId);
    // } else {
    //   // 모든 이력 삭제
    //   const { error } = await supabase
    //     .from('user_learning_history')
    //     .delete()
    //     .eq('user_id', userId);
    // }

    return NextResponse.json({
      success: true,
      message: historyId ? '학습 이력이 삭제되었습니다.' : '모든 학습 이력이 삭제되었습니다.'
    });

  } catch (error) {
    console.error('학습 이력 삭제 오류:', error);
    return NextResponse.json({
      success: false,
      error: '서버 오류가 발생했습니다.'
    }, { status: 500 });
  }
}
