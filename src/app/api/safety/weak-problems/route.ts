import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Zod 스키마 정의
const WeakProblemSchema = z.object({
  userId: z.string().min(1, '사용자 ID는 필수입니다'),
  cardId: z.string().min(1, '카드 ID는 필수입니다'),
  score: z.number().min(0).max(100, '점수는 0-100 사이여야 합니다'),
  needsReview: z.boolean().default(true),
  attempts: z.number().min(1).default(1),
  lastAttemptAt: z.string().datetime().optional(),
  metadata: z.record(z.string(), z.any()).optional()
});

const WeakProblemQuerySchema = z.object({
  userId: z.string().min(1, '사용자 ID는 필수입니다'),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 50),
  offset: z.string().optional().transform(val => val ? parseInt(val) : 0)
});

// 취약문제 저장
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = WeakProblemSchema.parse(body);

    // TODO: Supabase에 저장
    // const { data, error } = await supabase
    //   .from('user_weak_problems')
    //   .upsert({
    //     user_id: validatedData.userId,
    //     card_id: validatedData.cardId,
    //     last_score: validatedData.score,
    //     attempts: validatedData.attempts,
    //     needs_review: validatedData.needsReview,
    //     updated_at: new Date().toISOString()
    //   });

    // 임시 로컬 스토리지 시뮬레이션
    const weakProblems = JSON.parse(
      request.headers.get('x-weak-problems') || '[]'
    );
    
    const existingIndex = weakProblems.findIndex(
      (p: any) => p.userId === validatedData.userId && p.cardId === validatedData.cardId
    );

    const weakProblem = {
      ...validatedData,
      id: existingIndex >= 0 ? weakProblems[existingIndex].id : Date.now().toString(),
      createdAt: existingIndex >= 0 ? weakProblems[existingIndex].createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      weakProblems[existingIndex] = weakProblem;
    } else {
      weakProblems.push(weakProblem);
    }

    return NextResponse.json({
      success: true,
      data: weakProblem,
      message: '취약문제가 저장되었습니다.'
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: '유효성 검사 실패',
        details: error.issues
      }, { status: 400 });
    }

    console.error('취약문제 저장 오류:', error);
    return NextResponse.json({
      success: false,
      error: '서버 오류가 발생했습니다.'
    }, { status: 500 });
  }
}

// 취약문제 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = Object.fromEntries(searchParams.entries());
    const validatedQuery = WeakProblemQuerySchema.parse(query);

    // TODO: Supabase에서 조회
    // const { data, error } = await supabase
    //   .from('user_weak_problems')
    //   .select('*')
    //   .eq('user_id', validatedQuery.userId)
    //   .order('updated_at', { ascending: false })
    //   .range(validatedQuery.offset, validatedQuery.offset + validatedQuery.limit - 1);

    // 임시 로컬 스토리지 시뮬레이션
    const weakProblems = JSON.parse(
      request.headers.get('x-weak-problems') || '[]'
    );

    const userWeakProblems = weakProblems
      .filter((p: any) => p.userId === validatedQuery.userId)
      .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(validatedQuery.offset, validatedQuery.offset + validatedQuery.limit);

    return NextResponse.json({
      success: true,
      data: userWeakProblems,
      pagination: {
        limit: validatedQuery.limit,
        offset: validatedQuery.offset,
        total: weakProblems.filter((p: any) => p.userId === validatedQuery.userId).length
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

    console.error('취약문제 조회 오류:', error);
    return NextResponse.json({
      success: false,
      error: '서버 오류가 발생했습니다.'
    }, { status: 500 });
  }
}

// 취약문제 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const cardId = searchParams.get('cardId');

    if (!userId || !cardId) {
      return NextResponse.json({
        success: false,
        error: '사용자 ID와 카드 ID가 필요합니다.'
      }, { status: 400 });
    }

    // TODO: Supabase에서 삭제
    // const { error } = await supabase
    //   .from('user_weak_problems')
    //   .delete()
    //   .eq('user_id', userId)
    //   .eq('card_id', cardId);

    return NextResponse.json({
      success: true,
      message: '취약문제가 삭제되었습니다.'
    });

  } catch (error) {
    console.error('취약문제 삭제 오류:', error);
    return NextResponse.json({
      success: false,
      error: '서버 오류가 발생했습니다.'
    }, { status: 500 });
  }
}
