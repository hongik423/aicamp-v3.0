'use client';

import { DiagnosisApplicationData, DiagnosisApiResponse, DiagnosisResult } from './types';

const API_ENDPOINT = '/api/ai-capability-diagnosis';

/**
 * AI 역량진단 신청 제출 (재시도 로직 포함)
 */
export async function submitDiagnosis(data: DiagnosisApplicationData): Promise<DiagnosisApiResponse> {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔍 AI 역량진단 제출 시작 (시도 ${attempt}/${maxRetries}):`, {
        companyName: data.companyName,
        email: data.email
      });

      // 타임아웃 설정 (780초)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 780000);

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          formType: 'ai-capability-diagnosis',
          submittedAt: new Date().toISOString(),
          // 시뮬레이션 토글: GAS 연결 실패 시에도 결과 흐름 검증 가능
          simulate: false
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error || `HTTP error! status: ${response.status}`;
        
        // 5xx 서버 오류인 경우 재시도
        if (response.status >= 500 && attempt < maxRetries) {
          console.warn(`⚠️ 서버 오류 발생 (${response.status}), 재시도 중... (${attempt}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, 2000 * attempt)); // 지수 백오프
          continue;
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();
      
      console.log('📊 진단 제출 결과:', {
        success: result.success,
        diagnosisId: result.diagnosisId,
        message: result.message
      });

      return result;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('알 수 없는 오류');
      
      // 타임아웃 오류인 경우
      if (error instanceof Error && error.name === 'AbortError') {
        console.warn(`⏰ 요청 타임아웃 (시도 ${attempt}/${maxRetries})`);
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 3000 * attempt));
          continue;
        }
        return {
          success: false,
          error: '진단 처리 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.'
        };
      }

      // 네트워크 오류인 경우 재시도
      if (error instanceof Error && (error.message.includes('fetch') || error.message.includes('network'))) {
        console.warn(`🌐 네트워크 오류 발생 (시도 ${attempt}/${maxRetries}):`, error.message);
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          continue;
        }
      }

      console.error(`❌ 진단 제출 실패 (시도 ${attempt}/${maxRetries}):`, error);
      
      if (attempt === maxRetries) {
        let errorMessage = '진단 신청 중 오류가 발생했습니다';
        
        if (lastError?.message) {
          if (lastError.message.includes('GEMINI API') || lastError.message.includes('JSON 파싱') || lastError.message.includes('Cannot read properties')) {
            errorMessage = '🚨 AI 분석 시스템에 오류가 발생했습니다.\n\n해결 방법:\n1. Google Apps Script를 V10.1 버전으로 새로 배포해주세요\n2. GEMINI API 키를 확인해주세요\n3. 5분 후 다시 시도해주세요';
          } else if (lastError.message.includes('Google Apps Script')) {
            errorMessage = '🔧 Google Apps Script 연결에 문제가 있습니다. 새로운 배포가 필요합니다.';
          } else if (lastError.message.includes('AI 분석 시스템')) {
            errorMessage = lastError.message;
          } else {
            errorMessage = lastError.message;
          }
        }
        
        return {
          success: false,
          error: errorMessage
        };
      }
    }
  }

  return {
    success: false,
    error: lastError?.message || '진단 제출에 실패했습니다.'
  };
}

/**
 * 진단 결과 조회
 */
export async function getDiagnosisResult(diagnosisId: string): Promise<DiagnosisResult | null> {
  try {
    const response = await fetch(`${API_ENDPOINT}?diagnosisId=${diagnosisId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('진단 결과 조회 오류:', error);
    return null;
  }
}

/**
 * 진단 상태 확인
 */
export async function checkDiagnosisStatus(diagnosisId: string): Promise<{
  status: 'pending' | 'processing' | 'completed' | 'failed';
  message?: string;
  progress?: number;
}> {
  try {
    const response = await fetch(`${API_ENDPOINT}/status?diagnosisId=${diagnosisId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('진단 상태 확인 오류:', error);
    return {
      status: 'failed',
      message: '상태 확인 중 오류가 발생했습니다'
    };
  }
}

/**
 * 진단 점수 계산 (클라이언트 사이드 미리보기용)
 */
export function calculatePreviewScore(assessmentResponses: Record<string, number>): {
  totalScore: number;
  categoryScores: Record<string, number>;
  grade: string;
} {
  const categories = ['leadership', 'infrastructure', 'employeeCapability', 'culture', 'practicalApplication', 'dataCapability'];
  const categoryScores: Record<string, number> = {};
  
  // 카테고리별 점수 계산
  categories.forEach(category => {
    const categoryQuestions = Object.entries(assessmentResponses)
      .filter(([key]) => key.startsWith(category.charAt(0).toUpperCase()))
      .map(([, value]) => value);
    
    if (categoryQuestions.length > 0) {
      const avgScore = categoryQuestions.reduce((sum, score) => sum + score, 0) / categoryQuestions.length;
      categoryScores[category] = Math.round((avgScore / 5) * 100);
    } else {
      categoryScores[category] = 0;
    }
  });
  
  // 전체 점수 계산
  const totalScore = Math.round(
    Object.values(categoryScores).reduce((sum, score) => sum + score, 0) / categories.length
  );
  
  // 등급 결정
  let grade = 'F';
  if (totalScore >= 90) grade = 'S';
  else if (totalScore >= 80) grade = 'A';
  else if (totalScore >= 70) grade = 'B';
  else if (totalScore >= 60) grade = 'C';
  else if (totalScore >= 50) grade = 'D';
  
  return {
    totalScore,
    categoryScores,
    grade
  };
}