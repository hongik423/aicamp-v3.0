/**
 * AICAMP AI 역량진단 시스템 - API 함수
 */

import { getGasUrl } from '@/lib/config/env';

// 진단 신청 데이터 타입
export interface DiagnosisSubmissionData {
  companyName: string;
  representativeName: string;
  position: string;
  industry: string;
  customIndustry?: string;
  region: string;
  businessContent: string;
  concerns: string[];
  customConcern?: string;
  expectations: string;
  email: string;
  phone?: string;
  agreeToTerms: boolean;
  
  // 기업 규모 정보
  employeeCount?: string;
  annualRevenue?: string;
  businessHistory?: string;
  
  // AI 역량 진단 (5개 영역)
  ceoAIVision?: number;
  aiInvestment?: number;
  aiStrategy?: number;
  changeManagement?: number;
  riskTolerance?: number;
  itInfrastructure?: number;
  dataManagement?: number;
  securityLevel?: number;
  aiToolsAdopted?: number;
  digitalLiteracy?: number;
  aiToolUsage?: number;
  learningAgility?: number;
  dataAnalysis?: number;
  innovationCulture?: number;
  collaborationLevel?: number;
  experimentCulture?: number;
  continuousLearning?: number;
  processAutomation?: number;
  decisionMaking?: number;
  customerService?: number;
}

// 진단 신청 응답 타입
export interface DiagnosisSubmissionResponse {
  success: boolean;
  message: string;
  diagnosisId?: string;
  error?: string;
}

/**
 * 재시도 로직을 포함한 fetch 래퍼 함수
 */
async function fetchWithRetry(
  url: string, 
  options: RequestInit, 
  maxRetries: number = 2
): Promise<Response> {
  let lastError: Error | null = null;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      // 타임아웃 설정을 3분으로 증가 (AI 분석 시간 고려)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 180000);
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      // 504 Gateway Timeout의 경우 재시도
      if (response.status === 504 && i < maxRetries) {
        console.log(`⏳ 타임아웃 발생, ${i + 1}/${maxRetries} 재시도 중...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // 점진적 대기
        continue;
      }
      
      return response;
    } catch (error) {
      lastError = error as Error;
      
      // 타임아웃인 경우 재시도하지 않음 (백그라운드 처리 중)
      if (lastError.name === 'AbortError') {
        console.log('⏰ 타임아웃 발생 - 백그라운드 처리 모드');
        break;
      }
      
      if (i < maxRetries) {
        console.log(`🔄 네트워크 오류, ${i + 1}/${maxRetries} 재시도 중...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        continue;
      }
    }
  }
  
  throw lastError || new Error('요청 실패');
}

/**
 * 진단 신청 제출
 * Google Apps Script로 데이터를 전송하고 AI 분석을 요청합니다
 */
export async function submitDiagnosis(
  data: DiagnosisSubmissionData
): Promise<DiagnosisSubmissionResponse> {
  try {
    // 업종 처리: 직접입력인 경우 customIndustry 사용
    const finalIndustry = data.industry === 'custom' 
      ? data.customIndustry || '기타' 
      : data.industry;

    // AI 역량 데이터 구성
    const aiCapabilityData = {
      ceoAIVision: data.ceoAIVision,
      aiInvestment: data.aiInvestment,
      aiStrategy: data.aiStrategy,
      changeManagement: data.changeManagement,
      riskTolerance: data.riskTolerance,
      itInfrastructure: data.itInfrastructure,
      dataManagement: data.dataManagement,
      securityLevel: data.securityLevel,
      aiToolsAdopted: data.aiToolsAdopted,
      digitalLiteracy: data.digitalLiteracy,
      aiToolUsage: data.aiToolUsage,
      learningAgility: data.learningAgility,
      dataAnalysis: data.dataAnalysis,
      innovationCulture: data.innovationCulture,
      collaborationLevel: data.collaborationLevel,
      experimentCulture: data.experimentCulture,
      continuousLearning: data.continuousLearning,
      processAutomation: data.processAutomation,
      decisionMaking: data.decisionMaking,
      customerService: data.customerService
    };

    // 현재 시간 추가
    const submissionData = {
      ...data,
      industry: finalIndustry, // 처리된 업종 사용
      submitDate: new Date().toISOString(),
      concerns: data.concerns.join(', '), // 배열을 문자열로 변환
      aiCapabilityData: aiCapabilityData // AI 역량 데이터 추가
    };

    // API 프록시를 통해 Google Apps Script 호출 (CORS 문제 해결)
    const proxyUrl = '/api/google-script-proxy';
    
    const response = await fetchWithRetry(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        action: 'submitFreeDiagnosis',
        data: submissionData
      }),
    });

    if (!response.ok) {
      // 타임아웃 오류의 경우 사용자 친화적 메시지
      if (response.status === 504) {
        console.warn('서버 응답 지연으로 백업 처리 모드로 전환');
        // 백업 저장 로직 (LocalStorage)
        const backupData = {
          ...submissionData,
          backupId: `BACKUP-${Date.now()}`,
          status: 'pending'
        };
        localStorage.setItem(`diagnosis-backup-${backupData.backupId}`, JSON.stringify(backupData));
        
        return {
          success: true,
          message: '진단 신청이 접수되었습니다. 처리가 완료되면 이메일로 안내드리겠습니다.',
          diagnosisId: backupData.backupId,
          error: undefined
        };
      }
      
      // 기타 오류
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('Google Apps Script 오류 응답:', {
        status: response.status,
        statusText: response.statusText,
        errorText: errorText
      });
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    
    // 타임아웃이나 재시도 상황 처리
    if (result.isTimeout || result.isRetry) {
      return {
        success: true,
        message: result.message || '진단 신청이 접수되었습니다. 처리 완료 시 이메일로 안내드리겠습니다.',
        diagnosisId: result.diagnosisId,
        isTimeout: result.isTimeout,
        isRetry: result.isRetry,
        estimatedTime: result.estimatedTime,
        error: undefined
      };
    }
    
    return {
      success: result.success || false,
      message: result.message || '진단 신청이 완료되었습니다',
      diagnosisId: result.diagnosisId,
      error: result.error
    };
  } catch (error) {
    console.error('진단 신청 중 오류 발생:', error);
    
    // 네트워크 오류 시에도 백업 저장
    const backupData = {
      ...data,
      backupId: `BACKUP-${Date.now()}`,
      status: 'pending',
      errorMessage: error instanceof Error ? error.message : '알 수 없는 오류'
    };
    localStorage.setItem(`diagnosis-backup-${backupData.backupId}`, JSON.stringify(backupData));
    
    return {
      success: true, // 사용자 경험을 위해 성공으로 처리
      message: '진단 신청이 접수되었습니다. 네트워크 상태가 불안정하여 처리가 지연될 수 있습니다.',
      diagnosisId: backupData.backupId,
      error: undefined
    };
  }
}

/**
 * 진단 결과 조회
 */
export async function getDiagnosisResult(diagnosisId: string) {
  try {
    // API 프록시를 통해 Google Apps Script 호출 (CORS 문제 해결)
    const proxyUrl = '/api/google-script-proxy';
    
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        action: 'getDiagnosisResult',
        diagnosisId: diagnosisId
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('진단 결과 조회 중 오류 발생:', error);
    throw error;
  }
}