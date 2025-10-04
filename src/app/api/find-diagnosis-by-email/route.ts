/**
 * ================================================================================
 * 📧 이메일 기반 진단ID 찾기 API
 * ================================================================================
 * 
 * @fileoverview 이메일 주소로 해당 사용자의 진단ID를 찾는 API
 * @version 1.0.0
 * @encoding UTF-8
 */

import { NextRequest, NextResponse } from 'next/server';
import { APIResponse } from '@/types/ai-diagnosis-prd.types';

// Vercel 설정
export const maxDuration = 30;
export const dynamic = 'force-dynamic';

interface FindDiagnosisRequest {
  email: string;
}

interface FindDiagnosisResponse {
  diagnosisId: string;
  companyName: string;
  contactName: string;
  submissionDate: string;
  totalScore: number;
  grade: string;
}

/**
 * POST: 이메일로 진단ID 찾기
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const requestId = `find_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const startTime = Date.now();
  
  try {
    console.log('📧 이메일 기반 진단ID 찾기 요청 시작', { requestId });
    
    const requestData = await request.json() as FindDiagnosisRequest;
    
    // 1단계: 이메일 검증
    if (!requestData.email || !isValidEmail(requestData.email)) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'INVALID_EMAIL',
          message: '유효한 이메일 주소를 입력해주세요',
          timestamp: new Date(),
          requestId
        }
      }, { status: 400 });
    }
    
    const email = requestData.email.trim().toLowerCase();
    
    // 2단계: GAS API를 통한 진단ID 조회
    console.log('🔍 GAS를 통한 진단ID 조회 시작');
    
    const gasUrl = process.env.NEXT_PUBLIC_GAS_URL;
    if (!gasUrl) {
      throw new Error('GAS URL이 설정되지 않았습니다');
    }
    
    const response = await fetch(gasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'find_diagnosis_by_email',
        email: email
      })
    });
    
    if (!response.ok) {
      throw new Error(`GAS API 호출 실패: ${response.status}`);
    }
    
    const gasResult = await response.json();
    
    if (gasResult.success && gasResult.diagnosisId) {
      console.log('✅ 이메일 기반 진단ID 조회 성공');
      
      const processingTime = Date.now() - startTime;
      
      // 3단계: 성공 응답 반환
      const successResponse: APIResponse<FindDiagnosisResponse> = {
        success: true,
        data: {
          diagnosisId: gasResult.diagnosisId,
          companyName: gasResult.companyName || '회사명',
          contactName: gasResult.contactName || '담당자',
          submissionDate: gasResult.submissionDate || new Date().toISOString(),
          totalScore: gasResult.totalScore || 0,
          grade: gasResult.grade || 'F'
        },
        metadata: {
          requestId,
          timestamp: new Date(),
          processingTime,
          version: 'FIND-DIAGNOSIS-v1.0',
          cached: false
        }
      };
      
      return NextResponse.json(successResponse);
      
    } else {
      // 진단ID를 찾지 못한 경우
      console.log('❌ 해당 이메일로 진단 기록을 찾을 수 없음');
      
      return NextResponse.json({
        success: false,
        error: {
          code: 'DIAGNOSIS_NOT_FOUND',
          message: '해당 이메일로 진단한 기록을 찾을 수 없습니다',
          details: '다음 사항을 확인해주세요:\n1. 진단 신청 시 사용한 정확한 이메일인지 확인\n2. 진단 완료 후 최대 2분의 반영 지연이 있을 수 있음\n3. 잠시 후 다시 시도해주세요',
          timestamp: new Date(),
          requestId
        }
      }, { status: 404 });
    }
    
  } catch (error: any) {
    console.error('❌ 이메일 기반 진단ID 찾기 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: {
        code: 'FIND_DIAGNOSIS_ERROR',
        message: '진단ID 찾기 중 오류가 발생했습니다',
        details: error.message,
        timestamp: new Date(),
        requestId
      }
    }, { status: 500 });
  }
}

/**
 * GET: 이메일 파라미터로 진단ID 찾기
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const requestId = `get_find_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MISSING_EMAIL',
          message: '이메일 파라미터가 필요합니다',
          timestamp: new Date(),
          requestId
        }
      }, { status: 400 });
    }
    
    // POST 메서드와 동일한 로직 사용
    const mockRequest = {
      json: async () => ({ email })
    } as NextRequest;
    
    return await POST(mockRequest);
    
  } catch (error: any) {
    console.error('❌ GET 진단ID 찾기 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: {
        code: 'GET_FIND_ERROR',
        message: error.message,
        timestamp: new Date(),
        requestId
      }
    }, { status: 500 });
  }
}

/**
 * OPTIONS: CORS 처리
 */
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}

// ================================================================================
// 🎯 유틸리티 함수들
// ================================================================================

/**
 * 이메일 유효성 검증
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 이메일 마스킹 (로깅용)
 */
function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (local.length <= 3) {
    return `${local[0]}***@${domain}`;
  }
  return `${local.substring(0, 3)}***@${domain}`;
}
