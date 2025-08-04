'use client';

import { DiagnosisApplicationData, DiagnosisApiResponse, DiagnosisResult } from './types';

const API_ENDPOINT = '/api/ai-capability-diagnosis';

/**
 * AI 역량진단 신청 제출
 */
export async function submitDiagnosis(data: DiagnosisApplicationData): Promise<DiagnosisApiResponse> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        formType: 'ai-capability-diagnosis',
        submittedAt: new Date().toISOString()
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('진단 신청 오류:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '진단 신청 중 오류가 발생했습니다'
    };
  }
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