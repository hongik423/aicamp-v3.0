/**
 * 🎯 McKinsey 45개 행동지표 워크플로우 통합 컨트롤러
 * 전체 시스템을 조율하여 완전 자동화된 맥킨지 수준 컨설팅 보고서 생성
 */

import {
  LeeKyoJang45QuestionsRequest,
  LeeKyoJang45QuestionsResult,
  executeLeeKyoJang45QuestionsWorkflow
} from '@/lib/workflow/mckinsey-45-questions-workflow';

// GEMINI 보고서 생성 로직 제거 (Ollama 전용 모드)

import { 
  McKinseyHTMLReportRequest,
  generateMcKinseyHTMLReport 
} from '@/lib/reports/mckinsey-html-generator';

export interface WorkflowExecutionRequest {
  // 기본 정보
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  contactPosition?: string;
  
  // 회사 정보
  businessRegistration?: string;
  industry: string;
  employeeCount: string;
  annualRevenue?: string;
  establishmentYear?: string;
  
  // 사업 내용
  businessContent?: string;
  mainProducts?: string;
  targetCustomers?: string;
  currentChallenges?: string;
  
  // 45개 질문 응답
  responses: Record<string, number>;
  
  // 옵션
  options?: {
    reportType?: 'executive' | 'detailed' | 'presentation';
    includeGeminiAnalysis?: boolean;
    includeHTMLReport?: boolean;
    sendEmail?: boolean;
    saveToSheets?: boolean;
  };
}

export interface WorkflowExecutionResult {
  success: boolean;
  executionId: string;
  timestamp: string;
  
  // 분석 결과
  analysisResult?: LeeKyoJang45QuestionsResult;
  
  // AI 보고서 (Ollama 전용: 텍스트 기반)
  ollamaReportText?: string;
  
  // HTML 보고서
  htmlReport?: string;
  
  // 처리 상태
  processingStatus: {
    dataAnalysis: 'completed' | 'failed' | 'skipped';
    ollamaGeneration: 'completed' | 'failed' | 'skipped';
    htmlGeneration: 'completed' | 'failed' | 'skipped';
    emailSending: 'completed' | 'failed' | 'skipped' | 'pending';
    sheetsSaving: 'completed' | 'failed' | 'skipped' | 'pending';
  };
  
  // 품질 메트릭
  qualityMetrics: {
    overallQuality: number;
    processingTime: number;
    dataCompleteness: number;
    aiAnalysisDepth: number;
  };
  
  // 오류 정보
  errors?: Array<{
    stage: string;
    error: string;
    timestamp: string;
  }>;
  
  // 메타데이터
  metadata: {
    version: string;
    processingTime: number;
    totalSteps: number;
    completedSteps: number;
  };
}

/**
 * 메인 워크플로우 실행 함수
 */
export async function executeMcKinseyWorkflow(
  request: WorkflowExecutionRequest
): Promise<WorkflowExecutionResult> {
  const startTime = Date.now();
  const executionId = `WORKFLOW_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  console.log('🚀 McKinsey 45개 행동지표 워크플로우 실행 시작:', {
    executionId,
    companyName: request.companyName,
    industry: request.industry
  });
  
  const result: WorkflowExecutionResult = {
    success: false,
    executionId,
    timestamp: new Date().toISOString(),
    processingStatus: {
      dataAnalysis: 'skipped',
      ollamaGeneration: 'skipped',
      htmlGeneration: 'skipped',
      emailSending: 'skipped',
      sheetsSaving: 'skipped'
    },
    qualityMetrics: {
      overallQuality: 0,
      processingTime: 0,
      dataCompleteness: 0,
      aiAnalysisDepth: 0
    },
    errors: [],
    metadata: {
      version: 'V15.0-ULTIMATE-45Q',
      processingTime: 0,
      totalSteps: 5,
      completedSteps: 0
    }
  };
  
  try {
    // Step 1: 45개 질문 데이터 분석
    console.log('📊 Step 1: 45개 질문 데이터 분석 시작');
    result.processingStatus.dataAnalysis = 'completed';
    
    try {
      const analysisRequest: LeeKyoJang45QuestionsRequest = {
        companyName: request.companyName,
        contactName: request.contactName,
        contactEmail: request.contactEmail,
        contactPhone: request.contactPhone,
        contactPosition: request.contactPosition,
        businessRegistration: request.businessRegistration,
        industry: request.industry,
        employeeCount: request.employeeCount,
        annualRevenue: request.annualRevenue,
        establishmentYear: request.establishmentYear,
        businessContent: request.businessContent,
        mainProducts: request.mainProducts,
        targetCustomers: request.targetCustomers,
        currentChallenges: request.currentChallenges,
        responses: request.responses
      };
      
      result.analysisResult = await executeLeeKyoJang45QuestionsWorkflow(analysisRequest);
      result.metadata.completedSteps++;
      
      console.log('✅ Step 1 완료: 데이터 분석 성공', {
        totalScore: result.analysisResult.scoreAnalysis.totalScore,
        grade: result.analysisResult.scoreAnalysis.grade
      });
      
    } catch (error: any) {
      console.error('❌ Step 1 실패: 데이터 분석 오류', error);
      result.processingStatus.dataAnalysis = 'failed';
      result.errors?.push({
        stage: 'dataAnalysis',
        error: error.message,
        timestamp: new Date().toISOString()
      });
      throw error;
    }
    
    // Step 2: Ollama AI 보고서 생성 (요약 텍스트) - 항상 실행
    console.log('🤖 Step 2: Ollama AI 보고서 생성 시작');
    try {
      const { callAI } = await import('@/lib/ai/ai-provider');
      const aiPrompt = `이하 분석 결과를 바탕으로 300자 이내 경영진 요약을 작성:
총점: ${result.analysisResult!.scoreAnalysis.totalScore}
성숙도: ${result.analysisResult!.scoreAnalysis.maturityLevel}
우선과제: ${Object.keys(result.analysisResult!.scoreAnalysis.categoryScores).slice(0,3).join(', ')}`;
      const text = await callAI({ prompt: aiPrompt, maxTokens: 800, temperature: 0.3 });
      result.ollamaReportText = text;
      result.processingStatus.ollamaGeneration = 'completed';
      result.metadata.completedSteps++;
      console.log('✅ Step 2 완료: Ollama AI 보고서 생성 성공');
    } catch (error: any) {
      console.error('❌ Step 2 실패: Ollama AI 보고서 생성 오류', error);
      result.processingStatus.ollamaGeneration = 'failed';
      result.errors?.push({
        stage: 'ollamaGeneration',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
    
    // Step 3: HTML 보고서 생성 (옵션)
    if (request.options?.includeHTMLReport !== false) {
      console.log('📄 Step 3: HTML 보고서 생성 시작');
      
      try {
        const htmlRequest: McKinseyHTMLReportRequest = {
          analysisResult: result.analysisResult!,
          branding: {
            companyName: 'AICAMP',
            colors: {
              primary: '#1f2937',
              secondary: '#6b7280',
              accent: '#3b82f6'
            }
          },
          options: {
            includeCharts: true,
            includeAppendix: true,
            language: 'ko',
            format: 'web'
          }
        };
        
        result.htmlReport = generateMcKinseyHTMLReport(htmlRequest);
        result.processingStatus.htmlGeneration = 'completed';
        result.metadata.completedSteps++;
        
        console.log('✅ Step 3 완료: HTML 보고서 생성 성공', {
          reportLength: result.htmlReport.length
        });
        
      } catch (error: any) {
        console.error('❌ Step 3 실패: HTML 보고서 생성 오류', error);
        result.processingStatus.htmlGeneration = 'failed';
        result.errors?.push({
          stage: 'htmlGeneration',
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    } else {
      result.processingStatus.htmlGeneration = 'skipped';
      console.log('⏭️ Step 3 건너뜀: HTML 보고서 생성 비활성화');
    }
    
    // Step 4: 이메일 발송 (옵션)
    if (request.options?.sendEmail !== false) {
      console.log('📧 Step 4: 이메일 발송 준비');
      result.processingStatus.emailSending = 'pending';
      result.metadata.completedSteps++;
      
      // 실제 이메일 발송은 Google Apps Script에서 처리
      console.log('✅ Step 4 완료: 이메일 발송 준비 완료 (GAS에서 처리)');
    } else {
      result.processingStatus.emailSending = 'skipped';
      console.log('⏭️ Step 4 건너뜀: 이메일 발송 비활성화');
    }
    
    // Step 5: Google Sheets 저장 (옵션)
    if (request.options?.saveToSheets !== false) {
      console.log('📊 Step 5: Google Sheets 저장 준비');
      result.processingStatus.sheetsSaving = 'pending';
      result.metadata.completedSteps++;
      
      // 실제 저장은 Google Apps Script에서 처리
      console.log('✅ Step 5 완료: Google Sheets 저장 준비 완료 (GAS에서 처리)');
    } else {
      result.processingStatus.sheetsSaving = 'skipped';
      console.log('⏭️ Step 5 건너뜀: Google Sheets 저장 비활성화');
    }
    
    // 품질 메트릭 계산
    const endTime = Date.now();
    const processingTime = endTime - startTime;
    
    result.qualityMetrics = {
      overallQuality: result.analysisResult?.qualityMetrics.overallQuality || 0,
      processingTime,
      dataCompleteness: result.analysisResult?.qualityMetrics.dataCompleteness || 0,
      aiAnalysisDepth: 0.85
    };
    
    result.metadata.processingTime = processingTime;
    result.success = true;
    
    console.log('🎉 McKinsey 45개 행동지표 워크플로우 실행 완료:', {
      executionId: result.executionId,
      processingTime: `${processingTime}ms`,
      completedSteps: result.metadata.completedSteps,
      totalSteps: result.metadata.totalSteps,
      overallQuality: result.qualityMetrics.overallQuality
    });
    
    return result;
    
  } catch (error: any) {
    console.error('❌ McKinsey 워크플로우 실행 실패:', error);
    
    const endTime = Date.now();
    result.metadata.processingTime = endTime - startTime;
    result.qualityMetrics.processingTime = endTime - startTime;
    result.success = false;
    
    if (!result.errors?.some(e => e.error === error.message)) {
      result.errors?.push({
        stage: 'workflow',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
    
    return result;
  }
}

/**
 * 워크플로우 상태 검증
 */
export function validateWorkflowRequest(request: WorkflowExecutionRequest): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  // 필수 필드 검증
  if (!request.companyName?.trim()) {
    errors.push('회사명이 필요합니다.');
  }
  
  if (!request.contactName?.trim()) {
    errors.push('담당자명이 필요합니다.');
  }
  
  if (!request.contactEmail?.trim()) {
    errors.push('담당자 이메일이 필요합니다.');
  }
  
  if (!request.industry?.trim()) {
    errors.push('업종 정보가 필요합니다.');
  }
  
  if (!request.employeeCount?.trim()) {
    errors.push('직원 수 정보가 필요합니다.');
  }
  
  // 이메일 형식 검증
  if (request.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(request.contactEmail)) {
    errors.push('올바른 이메일 형식이 아닙니다.');
  }
  
  // 45개 질문 응답 검증
  if (!request.responses || typeof request.responses !== 'object') {
    errors.push('45개 질문 응답이 필요합니다.');
  } else {
    const responseCount = Object.keys(request.responses).length;
    if (responseCount < 45) {
      errors.push(`45개 질문 응답이 완료되지 않았습니다. (${responseCount}/45개 완료)`);
    }
    
    // 점수 범위 검증
    Object.entries(request.responses).forEach(([key, value]) => {
      if (typeof value !== 'number' || value < 1 || value > 5) {
        errors.push(`질문 ${key}의 응답이 올바르지 않습니다. (1-5점 범위)`);
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * 워크플로우 진행 상황 추적
 */
export function getWorkflowProgress(result: WorkflowExecutionResult): {
  percentage: number;
  currentStep: string;
  estimatedTimeRemaining: number;
} {
  const { processingStatus, metadata } = result;
  
  let completedSteps = 0;
  let currentStep = '시작 대기 중';
  
  if (processingStatus.dataAnalysis === 'completed') {
    completedSteps++;
    currentStep = 'AI 보고서 생성 중';
  }
  
  if (processingStatus.ollamaGeneration === 'completed') {
    completedSteps++;
    currentStep = 'HTML 보고서 생성 중';
  }
  
  if (processingStatus.htmlGeneration === 'completed') {
    completedSteps++;
    currentStep = '이메일 발송 준비 중';
  }
  
  if (processingStatus.emailSending === 'completed' || processingStatus.emailSending === 'pending') {
    completedSteps++;
    currentStep = 'Google Sheets 저장 중';
  }
  
  if (processingStatus.sheetsSaving === 'completed' || processingStatus.sheetsSaving === 'pending') {
    completedSteps++;
    currentStep = '완료';
  }
  
  const percentage = Math.round((completedSteps / metadata.totalSteps) * 100);
  const averageStepTime = metadata.processingTime / Math.max(completedSteps, 1);
  const remainingSteps = metadata.totalSteps - completedSteps;
  const estimatedTimeRemaining = remainingSteps * averageStepTime;
  
  return {
    percentage,
    currentStep,
    estimatedTimeRemaining
  };
}

/**
 * 워크플로우 결과 요약
 */
export function summarizeWorkflowResult(result: WorkflowExecutionResult): string {
  if (!result.success) {
    return `워크플로우 실행 실패: ${result.errors?.[0]?.error || '알 수 없는 오류'}`;
  }
  
  const { analysisResult, qualityMetrics, metadata } = result;
  
  return `
🎯 McKinsey 45개 행동지표 분석 완료

📊 진단 결과:
- 총점: ${analysisResult?.scoreAnalysis.totalScore || 0}점/100점
- 등급: ${analysisResult?.scoreAnalysis.grade || 'N/A'}
- 성숙도: ${analysisResult?.scoreAnalysis.maturityLevel || 'N/A'}

⚡ 처리 성과:
- 처리 시간: ${Math.round(metadata.processingTime / 1000)}초
- 완료 단계: ${metadata.completedSteps}/${metadata.totalSteps}
- 전체 품질: ${qualityMetrics.overallQuality}%

📧 다음 단계: 이메일로 상세 보고서가 발송됩니다.
  `.trim();
}
