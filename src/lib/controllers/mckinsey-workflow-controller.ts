/**
 * 🎯 McKinsey 45개 행동지표 워크플로우 통합 컨트롤러
 * 전체 시스템을 조율하여 완전 자동화된 맥킨지 수준 컨설팅 보고서 생성
 */

import { 
  McKinsey45QuestionsRequest, 
  McKinsey45QuestionsResult,
  executeMcKinsey45QuestionsWorkflow 
} from '@/lib/workflow/mckinsey-45-questions-workflow';

import { 
  GeminiReportRequest,
  GeminiReportResponse,
  generateGeminiMcKinseyReport 
} from '@/lib/ai/gemini-mckinsey-report-generator';

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
  analysisResult?: McKinsey45QuestionsResult;
  
  // AI 보고서
  geminiReport?: GeminiReportResponse;
  
  // HTML 보고서
  htmlReport?: string;
  
  // 처리 상태
  processingStatus: {
    dataAnalysis: 'completed' | 'failed' | 'skipped';
    geminiGeneration: 'completed' | 'failed' | 'skipped';
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
      geminiGeneration: 'skipped',
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
      const analysisRequest: McKinsey45QuestionsRequest = {
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
      
      result.analysisResult = executeMcKinsey45QuestionsWorkflow(analysisRequest);
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
    
    // Step 2: GEMINI AI 보고서 생성 (옵션)
    if (request.options?.includeGeminiAnalysis !== false) {
      console.log('🤖 Step 2: GEMINI AI 보고서 생성 시작');
      
      try {
        const geminiRequest: GeminiReportRequest = {
          analysisResult: result.analysisResult!,
          reportType: request.options?.reportType || 'detailed',
          language: 'ko',
          customization: {
            industryContext: `${request.industry} 업종 특성을 고려한 맞춤형 분석`,
            timeframe: '12개월',
            focusAreas: ['AI 도입', '디지털 전환', '조직 혁신']
          }
        };
        
        result.geminiReport = await generateGeminiMcKinseyReport(geminiRequest);
        result.processingStatus.geminiGeneration = 'completed';
        result.metadata.completedSteps++;
        
        console.log('✅ Step 2 완료: GEMINI AI 보고서 생성 성공', {
          reportId: result.geminiReport.reportId,
          wordCount: result.geminiReport.metadata.wordCount
        });
        
      } catch (error: any) {
        console.error('❌ Step 2 실패: GEMINI AI 보고서 생성 오류', error);
        result.processingStatus.geminiGeneration = 'failed';
        result.errors?.push({
          stage: 'geminiGeneration',
          error: error.message,
          timestamp: new Date().toISOString()
        });
        
        // GEMINI 실패 시 기본 보고서로 대체
        result.geminiReport = {
          success: false,
          reportId: `FALLBACK_${Date.now()}`,
          content: {
            executiveSummary: '고품질 AI 분석 보고서 생성을 위해 처리 중입니다.',
            situationAnalysis: '상세한 현황 분석이 진행 중입니다.',
            strategicRecommendations: '전략적 권고사항을 수립 중입니다.',
            implementationPlan: '실행 계획을 작성 중입니다.',
            riskAssessment: '리스크 평가를 진행 중입니다.',
            financialProjection: '재무 분석을 완료하는 중입니다.',
            conclusion: '종합 결론을 도출 중입니다.'
          },
          metadata: {
            generatedAt: new Date().toISOString(),
            wordCount: 0,
            analysisDepth: 0,
            confidence: 0,
            version: 'FALLBACK'
          },
          error: error.message
        };
      }
    } else {
      result.processingStatus.geminiGeneration = 'skipped';
      console.log('⏭️ Step 2 건너뜀: GEMINI AI 보고서 생성 비활성화');
    }
    
    // Step 3: HTML 보고서 생성 (옵션)
    if (request.options?.includeHTMLReport !== false) {
      console.log('📄 Step 3: HTML 보고서 생성 시작');
      
      try {
        const htmlRequest: McKinseyHTMLReportRequest = {
          analysisResult: result.analysisResult!,
          geminiReport: result.geminiReport!,
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
      aiAnalysisDepth: result.geminiReport?.metadata.analysisDepth || 0
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
  
  if (processingStatus.geminiGeneration === 'completed') {
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
