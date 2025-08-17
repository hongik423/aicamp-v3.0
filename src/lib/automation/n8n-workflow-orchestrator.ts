/**
 * 🔄 n8n 워크플로우 오케스트레이션 시스템
 * 이교장의 AI역량진단보고서 생성 자동화 엔진
 */

import { AdvancedScoreResult } from '../analysis/advanced-scoring-engine';
import { StrategicAnalysisResult } from '../analysis/ai-strategic-analyzer';

export interface N8nWorkflowConfig {
  n8nBaseUrl: string;
  apiKey: string;
  webhookUrl: string;
  workflowIds: {
    dataProcessing: string;
    aiAnalysis: string;
    reportGeneration: string;
    qualityAssurance: string;
    emailDelivery: string;
  };
}

export interface WorkflowExecutionRequest {
  workflowId: string;
  inputData: any;
  executionMode: 'sync' | 'async';
  timeout?: number;
  retryConfig?: RetryConfig;
}

export interface RetryConfig {
  maxAttempts: number;
  delayMs: number;
  exponentialBackoff: boolean;
}

export interface WorkflowExecutionResult {
  executionId: string;
  status: 'success' | 'error' | 'running' | 'waiting';
  data?: any;
  error?: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
}

export interface ReportGenerationPipeline {
  stages: PipelineStage[];
  currentStage: number;
  overallProgress: number;
  estimatedTimeRemaining: number;
  errors: PipelineError[];
}

export interface PipelineStage {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
  startTime?: Date;
  endTime?: Date;
  dependencies: string[];
  outputs: any;
  errors: string[];
}

export interface PipelineError {
  stage: string;
  error: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  resolved: boolean;
}

/**
 * n8n 워크플로우 오케스트레이터
 */
export class N8nWorkflowOrchestrator {
  private config: N8nWorkflowConfig;
  private executionHistory: Map<string, WorkflowExecutionResult> = new Map();
  
  constructor(config: N8nWorkflowConfig) {
    this.config = config;
  }
  
  /**
   * 메인 보고서 생성 파이프라인 실행
   */
  async executeReportGenerationPipeline(
    diagnosisData: any,
    progressCallback?: (pipeline: ReportGenerationPipeline) => void
  ): Promise<{
    success: boolean;
    reportData?: any;
    pipeline: ReportGenerationPipeline;
    error?: string;
  }> {
    
    console.log('🔄 n8n 보고서 생성 파이프라인 시작...');
    
    // 파이프라인 초기화
    const pipeline = this.initializePipeline();
    
    try {
      // Stage 1: 데이터 전처리 및 검증
      await this.executeStage(
        pipeline,
        'data_processing',
        '데이터 전처리 및 검증',
        async () => {
          return await this.executeDataProcessingWorkflow(diagnosisData);
        },
        progressCallback
      );
      
      // Stage 2: AI 분석 실행
      await this.executeStage(
        pipeline,
        'ai_analysis',
        'AI 기반 전략 분석',
        async () => {
          const processedData = pipeline.stages[0].outputs;
          return await this.executeAIAnalysisWorkflow(processedData);
        },
        progressCallback
      );
      
      // Stage 3: 보고서 생성
      await this.executeStage(
        pipeline,
        'report_generation',
        'McKinsey 스타일 보고서 생성',
        async () => {
          const analysisData = pipeline.stages[1].outputs;
          return await this.executeReportGenerationWorkflow(analysisData);
        },
        progressCallback
      );
      
      // Stage 4: 품질 검증
      await this.executeStage(
        pipeline,
        'quality_assurance',
        '보고서 품질 검증',
        async () => {
          const reportData = pipeline.stages[2].outputs;
          return await this.executeQualityAssuranceWorkflow(reportData);
        },
        progressCallback
      );
      
      // Stage 5: 이메일 발송
      await this.executeStage(
        pipeline,
        'email_delivery',
        '결과 보고서 이메일 발송',
        async () => {
          const validatedReport = pipeline.stages[3].outputs;
          return await this.executeEmailDeliveryWorkflow(validatedReport, diagnosisData);
        },
        progressCallback
      );
      
      // 파이프라인 완료
      pipeline.overallProgress = 100;
      pipeline.estimatedTimeRemaining = 0;
      
      if (progressCallback) {
        progressCallback(pipeline);
      }
      
      console.log('✅ n8n 보고서 생성 파이프라인 완료');
      
      return {
        success: true,
        reportData: pipeline.stages[4].outputs,
        pipeline
      };
      
    } catch (error) {
      console.error('❌ n8n 파이프라인 실행 실패:', error);
      
      pipeline.errors.push({
        stage: 'pipeline',
        error: error instanceof Error ? error.message : '알 수 없는 오류',
        severity: 'critical',
        timestamp: new Date(),
        resolved: false
      });
      
      return {
        success: false,
        pipeline,
        error: error instanceof Error ? error.message : '알 수 없는 오류'
      };
    }
  }
  
  /**
   * 파이프라인 초기화
   */
  private initializePipeline(): ReportGenerationPipeline {
    return {
      stages: [
        {
          id: 'data_processing',
          name: '데이터 전처리',
          description: '진단 데이터 검증, 정제, 구조화',
          status: 'pending',
          progress: 0,
          dependencies: [],
          outputs: null,
          errors: []
        },
        {
          id: 'ai_analysis',
          name: 'AI 분석',
          description: 'GEMINI + GPT-4 하이브리드 분석',
          status: 'pending',
          progress: 0,
          dependencies: ['data_processing'],
          outputs: null,
          errors: []
        },
        {
          id: 'report_generation',
          name: '보고서 생성',
          description: 'McKinsey 스타일 HTML 보고서 생성',
          status: 'pending',
          progress: 0,
          dependencies: ['ai_analysis'],
          outputs: null,
          errors: []
        },
        {
          id: 'quality_assurance',
          name: '품질 검증',
          description: '보고서 품질 검증 및 최적화',
          status: 'pending',
          progress: 0,
          dependencies: ['report_generation'],
          outputs: null,
          errors: []
        },
        {
          id: 'email_delivery',
          name: '이메일 발송',
          description: '결과 보고서 이메일 발송',
          status: 'pending',
          progress: 0,
          dependencies: ['quality_assurance'],
          outputs: null,
          errors: []
        }
      ],
      currentStage: 0,
      overallProgress: 0,
      estimatedTimeRemaining: 600000, // 10분
      errors: []
    };
  }
  
  /**
   * 파이프라인 스테이지 실행
   */
  private async executeStage(
    pipeline: ReportGenerationPipeline,
    stageId: string,
    stageName: string,
    executor: () => Promise<any>,
    progressCallback?: (pipeline: ReportGenerationPipeline) => void
  ): Promise<void> {
    
    const stage = pipeline.stages.find(s => s.id === stageId);
    if (!stage) {
      throw new Error(`스테이지를 찾을 수 없습니다: ${stageId}`);
    }
    
    console.log(`🔄 ${stageName} 시작...`);
    
    // 스테이지 시작
    stage.status = 'running';
    stage.startTime = new Date();
    pipeline.currentStage = pipeline.stages.indexOf(stage);
    
    // 진행률 업데이트
    this.updatePipelineProgress(pipeline, progressCallback);
    
    try {
      // 스테이지 실행
      stage.outputs = await executor();
      
      // 스테이지 완료
      stage.status = 'completed';
      stage.progress = 100;
      stage.endTime = new Date();
      
      console.log(`✅ ${stageName} 완료`);
      
    } catch (error) {
      console.error(`❌ ${stageName} 실패:`, error);
      
      stage.status = 'error';
      stage.errors.push(error instanceof Error ? error.message : '알 수 없는 오류');
      
      pipeline.errors.push({
        stage: stageId,
        error: error instanceof Error ? error.message : '알 수 없는 오류',
        severity: 'high',
        timestamp: new Date(),
        resolved: false
      });
      
      throw error;
    }
    
    // 진행률 업데이트
    this.updatePipelineProgress(pipeline, progressCallback);
  }
  
  /**
   * 파이프라인 진행률 업데이트
   */
  private updatePipelineProgress(
    pipeline: ReportGenerationPipeline,
    progressCallback?: (pipeline: ReportGenerationPipeline) => void
  ): void {
    
    const completedStages = pipeline.stages.filter(s => s.status === 'completed').length;
    const totalStages = pipeline.stages.length;
    
    pipeline.overallProgress = (completedStages / totalStages) * 100;
    
    // 남은 시간 추정
    const remainingStages = totalStages - completedStages;
    const avgTimePerStage = 120000; // 2분
    pipeline.estimatedTimeRemaining = remainingStages * avgTimePerStage;
    
    if (progressCallback) {
      progressCallback(pipeline);
    }
  }
  
  /**
   * 데이터 전처리 워크플로우 실행
   */
  private async executeDataProcessingWorkflow(diagnosisData: any): Promise<any> {
    const workflowRequest: WorkflowExecutionRequest = {
      workflowId: this.config.workflowIds.dataProcessing,
      inputData: {
        rawDiagnosisData: diagnosisData,
        validationRules: this.getValidationRules(),
        transformationRules: this.getTransformationRules()
      },
      executionMode: 'sync',
      timeout: 120000, // 2분
      retryConfig: {
        maxAttempts: 3,
        delayMs: 5000,
        exponentialBackoff: true
      }
    };
    
    const result = await this.executeWorkflow(workflowRequest);
    
    if (result.status !== 'success') {
      throw new Error(`데이터 전처리 실패: ${result.error}`);
    }
    
    return result.data;
  }
  
  /**
   * GEMINI 통합 AI 분석 워크플로우 실행
   */
  private async executeAIAnalysisWorkflow(processedData: any): Promise<any> {
    const workflowRequest: WorkflowExecutionRequest = {
      workflowId: this.config.workflowIds.aiAnalysis,
      inputData: {
        processedData,
        analysisConfig: {
          useGemini: true,
          geminiApiKey: 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM',
          analysisModel: 'GEMINI-2.5-FLASH-INTEGRATED',
          analysisDepth: 'comprehensive',
          includeQuantitativeAnalysis: true,
          includeQualitativeAnalysis: true,
          includeCompetitorAnalysis: true,
          includeBenchmarking: true
        }
      },
      executionMode: 'sync',
      timeout: 300000, // 5분
      retryConfig: {
        maxAttempts: 3,
        delayMs: 10000,
        exponentialBackoff: true
      }
    };
    
    const result = await this.executeWorkflow(workflowRequest);
    
    if (result.status !== 'success') {
      throw new Error(`AI 분석 실패: ${result.error}`);
    }
    
    return result.data;
  }
  
  /**
   * 보고서 생성 워크플로우 실행
   */
  private async executeReportGenerationWorkflow(analysisData: any): Promise<any> {
    const workflowRequest: WorkflowExecutionRequest = {
      workflowId: this.config.workflowIds.reportGeneration,
      inputData: {
        analysisData,
        reportConfig: {
          style: 'mckinsey',
          format: 'html',
          includeCharts: true,
          includeRoadmap: true,
          includeROIAnalysis: true,
          branding: '이교장의AI역량진단보고서'
        }
      },
      executionMode: 'sync',
      timeout: 180000, // 3분
      retryConfig: {
        maxAttempts: 3,
        delayMs: 5000,
        exponentialBackoff: true
      }
    };
    
    const result = await this.executeWorkflow(workflowRequest);
    
    if (result.status !== 'success') {
      throw new Error(`보고서 생성 실패: ${result.error}`);
    }
    
    return result.data;
  }
  
  /**
   * 품질 검증 워크플로우 실행
   */
  private async executeQualityAssuranceWorkflow(reportData: any): Promise<any> {
    const workflowRequest: WorkflowExecutionRequest = {
      workflowId: this.config.workflowIds.qualityAssurance,
      inputData: {
        reportData,
        qualityChecks: {
          contentLength: { min: 5000, max: 50000 },
          chartValidation: true,
          linkValidation: true,
          htmlValidation: true,
          accessibilityCheck: true,
          brandingConsistency: true
        }
      },
      executionMode: 'sync',
      timeout: 60000, // 1분
      retryConfig: {
        maxAttempts: 2,
        delayMs: 3000,
        exponentialBackoff: false
      }
    };
    
    const result = await this.executeWorkflow(workflowRequest);
    
    if (result.status !== 'success') {
      throw new Error(`품질 검증 실패: ${result.error}`);
    }
    
    return result.data;
  }
  
  /**
   * 이메일 발송 및 Google Drive 저장 워크플로우 실행
   */
  private async executeEmailDeliveryWorkflow(
    validatedReport: any,
    originalData: any
  ): Promise<any> {
    const workflowRequest: WorkflowExecutionRequest = {
      workflowId: this.config.workflowIds.emailDelivery,
      inputData: {
        reportData: validatedReport,
        recipientInfo: {
          applicantEmail: originalData.contactEmail,
          applicantName: originalData.contactName,
          companyName: originalData.companyName,
          adminEmail: 'hongik423@gmail.com'
        },
        emailConfig: {
          sendToApplicant: true,
          sendToAdmin: true,
          attachReport: true,
          includeNextSteps: true
        },
        driveConfig: {
          uploadToDrive: true,
          folderId: '1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj',
          generateShareLink: true
        }
      },
      executionMode: 'sync',
      timeout: 180000, // 3분 (Drive 업로드 포함)
      retryConfig: {
        maxAttempts: 3,
        delayMs: 5000,
        exponentialBackoff: true
      }
    };
    
    const result = await this.executeWorkflow(workflowRequest);
    
    if (result.status !== 'success') {
      throw new Error(`이메일 발송 실패: ${result.error}`);
    }
    
    return result.data;
  }
  
  /**
   * n8n 워크플로우 실행
   */
  private async executeWorkflow(request: WorkflowExecutionRequest): Promise<WorkflowExecutionResult> {
    const startTime = new Date();
    const executionId = `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      console.log(`🔄 n8n 워크플로우 실행: ${request.workflowId}`);
      
      // n8n API 호출
      const response = await fetch(
        `${this.config.n8nBaseUrl}/api/v1/workflows/${request.workflowId}/execute`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-N8N-API-KEY': this.config.apiKey
          },
          body: JSON.stringify({
            data: request.inputData,
            mode: request.executionMode
          }),
          signal: AbortSignal.timeout(request.timeout || 300000)
        }
      );
      
      if (!response.ok) {
        throw new Error(`n8n API 오류: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      const endTime = new Date();
      
      const executionResult: WorkflowExecutionResult = {
        executionId,
        status: 'success',
        data: result.data,
        startTime,
        endTime,
        duration: endTime.getTime() - startTime.getTime()
      };
      
      this.executionHistory.set(executionId, executionResult);
      
      console.log(`✅ n8n 워크플로우 완료: ${request.workflowId} (${executionResult.duration}ms)`);
      
      return executionResult;
      
    } catch (error) {
      console.error(`❌ n8n 워크플로우 실패: ${request.workflowId}`, error);
      
      const executionResult: WorkflowExecutionResult = {
        executionId,
        status: 'error',
        error: error instanceof Error ? error.message : '알 수 없는 오류',
        startTime,
        endTime: new Date(),
        duration: Date.now() - startTime.getTime()
      };
      
      this.executionHistory.set(executionId, executionResult);
      
      // 재시도 로직
      if (request.retryConfig && request.retryConfig.maxAttempts > 1) {
        return await this.retryWorkflow(request, executionResult);
      }
      
      return executionResult;
    }
  }
  
  /**
   * 워크플로우 재시도
   */
  private async retryWorkflow(
    request: WorkflowExecutionRequest,
    lastResult: WorkflowExecutionResult
  ): Promise<WorkflowExecutionResult> {
    
    const retryConfig = request.retryConfig!;
    
    for (let attempt = 2; attempt <= retryConfig.maxAttempts; attempt++) {
      console.log(`🔄 n8n 워크플로우 재시도 ${attempt}/${retryConfig.maxAttempts}: ${request.workflowId}`);
      
      // 재시도 지연
      const delay = retryConfig.exponentialBackoff 
        ? retryConfig.delayMs * Math.pow(2, attempt - 2)
        : retryConfig.delayMs;
      
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // 재시도 실행
      const retryRequest = { ...request, retryConfig: undefined }; // 무한 재시도 방지
      const result = await this.executeWorkflow(retryRequest);
      
      if (result.status === 'success') {
        console.log(`✅ n8n 워크플로우 재시도 성공: ${request.workflowId}`);
        return result;
      }
    }
    
    console.error(`❌ n8n 워크플로우 재시도 모두 실패: ${request.workflowId}`);
    return lastResult;
  }
  
  /**
   * 실행 상태 조회
   */
  async getExecutionStatus(executionId: string): Promise<WorkflowExecutionResult | null> {
    return this.executionHistory.get(executionId) || null;
  }
  
  /**
   * 데이터 검증 규칙
   */
  private getValidationRules(): any {
    return {
      required: ['companyName', 'contactEmail', 'contactName'],
      scoreRange: { min: 1, max: 5 },
      questionCount: 45,
      categoryCount: 9
    };
  }
  
  /**
   * 데이터 변환 규칙
   */
  private getTransformationRules(): any {
    return {
      normalizeScores: true,
      calculateWeights: true,
      generateBenchmarks: true,
      structureForAI: true
    };
  }
}

/**
 * n8n 워크플로우 설정 생성
 */
export function createN8nConfig(): N8nWorkflowConfig {
  return {
    n8nBaseUrl: process.env.N8N_BASE_URL || 'http://localhost:5678',
    apiKey: process.env.N8N_API_KEY || '',
    webhookUrl: process.env.N8N_WEBHOOK_URL || '',
    workflowIds: {
      dataProcessing: process.env.N8N_WORKFLOW_DATA_PROCESSING || 'workflow_data_processing',
      aiAnalysis: process.env.N8N_WORKFLOW_AI_ANALYSIS || 'workflow_ai_analysis',
      reportGeneration: process.env.N8N_WORKFLOW_REPORT_GENERATION || 'workflow_report_generation',
      qualityAssurance: process.env.N8N_WORKFLOW_QUALITY_ASSURANCE || 'workflow_quality_assurance',
      emailDelivery: process.env.N8N_WORKFLOW_EMAIL_DELIVERY || 'workflow_email_delivery'
    }
  };
}

export const n8nOrchestrator = new N8nWorkflowOrchestrator(createN8nConfig());
