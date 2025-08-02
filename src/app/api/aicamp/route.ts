import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { z } from 'zod';

// API 응답 타입 정의
interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  timestamp: string;
}

// CORS 헤더 설정
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// 한국 시간 가져오기
function getCurrentKoreanTime(): string {
  const now = new Date();
  const kstTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
  return kstTime.toISOString();
}

// 성공 응답 생성
function createSuccessResponse(data: any): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
      timestamp: getCurrentKoreanTime(),
      version: '2025.02.03.Next.js'
    },
    { 
      status: 200,
      headers: corsHeaders 
    }
  );
}

// 에러 응답 생성
function createErrorResponse(message: string, status: number = 400): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: message,
      timestamp: getCurrentKoreanTime()
    },
    { 
      status,
      headers: corsHeaders 
    }
  );
}

// OPTIONS 요청 처리 (CORS Preflight)
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { 
    status: 200, 
    headers: corsHeaders 
  });
}

// GET 요청 처리
export async function GET(request: NextRequest) {
  try {
    return createSuccessResponse({
      service: 'AICAMP 최고수준 AI 경영진단 시스템',
      version: '2025.02.03.Next.js',
      status: '정상 운영 중',
      features: [
        '✅ GEMINI 2.5 Flash AI 분석',
        '✅ AI 역량진단',
        '✅ 전문가 상담신청',
        '✅ 베타 피드백',
        '✅ CORS 최적화'
      ]
    });
  } catch (error) {
    console.error('❌ GET 요청 처리 오류:', error);
    return createErrorResponse('서버 오류가 발생했습니다', 500);
  }
}

// POST 요청 처리
export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    // 요청 데이터 유효성 검증
    if (!requestData || Object.keys(requestData).length === 0) {
      return createErrorResponse('요청 데이터가 없습니다.');
    }

    console.log('📥 요청 수신:', requestData.action);

    // 액션별 처리
    switch (requestData.action) {
      case 'submitFreeDiagnosis':
        const { handleFreeDiagnosisSubmission } = await import('./handlers/freeDiagnosis');
        return await handleFreeDiagnosisSubmission(requestData.data);

      case 'getDiagnosisResult':
        const { handleGetFreeDiagnosisResult } = await import('./handlers/freeDiagnosis');
        return await handleGetFreeDiagnosisResult(requestData.diagnosisId);

      case 'submitConsultation':
        const { processConsultationForm } = await import('./handlers/consultation');
        return await processConsultationForm(requestData);

      case 'submitBetaFeedback':
        const { processBetaFeedback } = await import('./handlers/betaFeedback');
        return await processBetaFeedback(requestData);

      case 'checkSheetStructure':
        const { checkSheetStructure } = await import('./services/googleSheets');
        return await checkSheetStructure();

      case 'initializeSheets':
        const { initializeAllSheets } = await import('./services/googleSheets');
        return await initializeAllSheets();

      case 'getLatestDiagnosisData':
        const { getLatestDiagnosisData } = await import('./services/googleSheets');
        return await getLatestDiagnosisData();

      default:
        // 기본 진단 처리
        if (requestData.companyName && requestData.industry) {
          const { processDiagnosisForm } = await import('./handlers/diagnosis');
          return await processDiagnosisForm(requestData);
        }
        
        return createErrorResponse('알 수 없는 액션입니다.');
    }
  } catch (error) {
    console.error('❌ POST 요청 처리 오류:', error);
    return createErrorResponse('서버 처리 중 오류가 발생했습니다', 500);
  }
}