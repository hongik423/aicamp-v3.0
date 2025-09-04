/**
 * 🛡️ 무오류 시스템 구축: 단계별 완전 수행 검증 시스템
 * 각 단계의 완전한 수행을 확인한 후에만 다음 단계로 진행
 */

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
  warningMessage?: string;
  data?: any;
  completionPercentage: number;
  nextStepReady: boolean;
}

export interface StepValidation {
  stepId: string;
  stepName: string;
  validationFunction: () => Promise<ValidationResult>;
  requiredFields: string[];
  criticalChecks: string[];
  maxRetries: number;
  retryDelay: number; // milliseconds
}

export class ErrorFreeValidator {
  private static validationSteps: StepValidation[] = [
    {
      stepId: 'data-validation',
      stepName: '데이터 검증',
      validationFunction: async () => await ErrorFreeValidator.validateDataIntegrity(),
      requiredFields: ['diagnosisId'],
      criticalChecks: ['ID_FORMAT', 'ID_LENGTH', 'ID_PREFIX'],
      maxRetries: 3,
      retryDelay: 1000
    },
    {
      stepId: 'data-retrieval',
      stepName: '실제 데이터 조회',
      validationFunction: async () => await ErrorFreeValidator.validateDataRetrieval(),
      requiredFields: ['gasResponse', 'diagnosisData'],
      criticalChecks: ['GAS_CONNECTION', 'DATA_EXISTS', 'DATA_COMPLETE'],
      maxRetries: 5,
      retryDelay: 2000
    },
    {
      stepId: 'score-calculation',
      stepName: '점수 계산',
      validationFunction: async () => await ErrorFreeValidator.validateScoreCalculation(),
      requiredFields: ['totalScore', 'categoryScores', 'percentage'],
      criticalChecks: ['SCORE_RANGE', 'CATEGORY_COMPLETE', 'PERCENTAGE_VALID'],
      maxRetries: 2,
      retryDelay: 500
    },
    {
      stepId: 'report-generation',
      stepName: '24페이지 보고서 생성',
      validationFunction: async () => await ErrorFreeValidator.validateReportGeneration(),
      requiredFields: ['htmlReport'],
      criticalChecks: ['HTML_VALID', 'PAGE_COUNT', 'CONTENT_COMPLETE'],
      maxRetries: 3,
      retryDelay: 3000
    },
    {
      stepId: 'quality-check',
      stepName: '품질 검증',
      validationFunction: async () => await ErrorFreeValidator.validateQuality(),
      requiredFields: ['reportContent', 'reportInfo'],
      criticalChecks: ['CONTENT_INTEGRITY', 'DATA_ACCURACY', 'USER_READY'],
      maxRetries: 2,
      retryDelay: 1000
    }
  ];

  private static currentData: any = {};
  private static validationHistory: Array<{
    stepId: string;
    timestamp: Date;
    result: ValidationResult;
    retryCount: number;
  }> = [];

  /**
   * 데이터 설정
   */
  static setData(key: string, value: any): void {
    this.currentData[key] = value;
  }

  /**
   * 🔒 단계별 완전 수행 검증 실행
   */
  static async executeStepWithValidation(
    stepId: string, 
    stepFunction: () => Promise<any>,
    data?: any
  ): Promise<ValidationResult> {
    console.log(`🛡️ 무오류 검증 시작: ${stepId}`);
    
    const stepConfig = this.validationSteps.find(step => step.stepId === stepId);
    if (!stepConfig) {
      return {
        isValid: false,
        errorMessage: `알 수 없는 단계: ${stepId}`,
        completionPercentage: 0,
        nextStepReady: false
      };
    }

    // 데이터 업데이트
    if (data) {
      this.currentData = { ...this.currentData, ...data };
    }

    let retryCount = 0;
    let lastError: string | undefined;

    while (retryCount <= stepConfig.maxRetries) {
      try {
        console.log(`🔄 ${stepConfig.stepName} 실행 시도 ${retryCount + 1}/${stepConfig.maxRetries + 1}`);
        
        // 1. 사전 검증 (필수 필드 확인)
        const preValidation = await this.validateRequiredFields(stepConfig.requiredFields);
        if (!preValidation.isValid) {
          throw new Error(`사전 검증 실패: ${preValidation.errorMessage}`);
        }

        // 2. 실제 단계 함수 실행
        const stepResult = await stepFunction();
        this.currentData = { ...this.currentData, [`${stepId}_result`]: stepResult };

        // 3. 사후 검증 (완료 상태 확인)
        const postValidation = await stepConfig.validationFunction();
        
        if (postValidation.isValid && postValidation.nextStepReady) {
          console.log(`✅ ${stepConfig.stepName} 완전 수행 확인 완료`);
          
          // 검증 히스토리 기록
          this.validationHistory.push({
            stepId,
            timestamp: new Date(),
            result: postValidation,
            retryCount
          });
          
          return {
            ...postValidation,
            data: stepResult
          };
        } else {
          throw new Error(postValidation.errorMessage || '단계 완료 검증 실패');
        }
        
      } catch (error: any) {
        lastError = error.message;
        retryCount++;
        
        console.warn(`⚠️ ${stepConfig.stepName} 시도 ${retryCount} 실패: ${error.message}`);
        
        if (retryCount <= stepConfig.maxRetries) {
          console.log(`🔄 ${stepConfig.retryDelay}ms 후 재시도...`);
          await new Promise(resolve => setTimeout(resolve, stepConfig.retryDelay));
        }
      }
    }

    // 모든 재시도 실패
    const failureResult: ValidationResult = {
      isValid: false,
      errorMessage: `${stepConfig.stepName} 최대 재시도 초과: ${lastError}`,
      completionPercentage: 0,
      nextStepReady: false
    };

    this.validationHistory.push({
      stepId,
      timestamp: new Date(),
      result: failureResult,
      retryCount: retryCount - 1
    });

    return failureResult;
  }

  /**
   * 필수 필드 검증
   */
  private static async validateRequiredFields(requiredFields: string[]): Promise<ValidationResult> {
    const missingFields = requiredFields.filter(field => !this.currentData[field]);
    
    if (missingFields.length > 0) {
      return {
        isValid: false,
        errorMessage: `필수 필드 누락: ${missingFields.join(', ')}`,
        completionPercentage: 0,
        nextStepReady: false
      };
    }

    return {
      isValid: true,
      completionPercentage: 100,
      nextStepReady: true
    };
  }

  /**
   * 데이터 무결성 검증
   */
  private static async validateDataIntegrity(): Promise<ValidationResult> {
    const { diagnosisId } = this.currentData;
    
    if (!diagnosisId) {
      return {
        isValid: false,
        errorMessage: '진단ID가 없습니다.',
        completionPercentage: 0,
        nextStepReady: false
      };
    }

    // ID 형식 검증
    if (typeof diagnosisId !== 'string' || diagnosisId.length < 10) {
      return {
        isValid: false,
        errorMessage: '진단ID 형식이 올바르지 않습니다.',
        completionPercentage: 25,
        nextStepReady: false
      };
    }

    // ID 접두사 검증
    if (!diagnosisId.includes('DIAG_')) {
      return {
        isValid: false,
        errorMessage: '진단ID 접두사가 올바르지 않습니다.',
        completionPercentage: 50,
        nextStepReady: false
      };
    }

    return {
      isValid: true,
      completionPercentage: 100,
      nextStepReady: true
    };
  }

  /**
   * 실제 데이터 조회 검증
   */
  private static async validateDataRetrieval(): Promise<ValidationResult> {
    const { gasResponse, data_retrieval_result } = this.currentData;
    
    if (!gasResponse && !data_retrieval_result) {
      return {
        isValid: false,
        errorMessage: 'GAS 응답 데이터가 없습니다.',
        completionPercentage: 0,
        nextStepReady: false
      };
    }

    const result = gasResponse || data_retrieval_result;
    
    // 성공 여부 확인
    if (!result.success) {
      return {
        isValid: false,
        errorMessage: `데이터 조회 실패: ${result.error || '알 수 없는 오류'}`,
        completionPercentage: 30,
        nextStepReady: false
      };
    }

    // 실제 데이터 존재 확인
    if (!result.data) {
      return {
        isValid: false,
        errorMessage: '실제 진단 데이터가 없습니다.',
        completionPercentage: 60,
        nextStepReady: false
      };
    }

    // 필수 데이터 필드 확인
    const requiredDataFields = ['companyName', 'totalScore', 'categoryScores'];
    const missingDataFields = requiredDataFields.filter(field => !result.data[field]);
    
    if (missingDataFields.length > 0) {
      return {
        isValid: false,
        errorMessage: `필수 데이터 필드 누락: ${missingDataFields.join(', ')}`,
        completionPercentage: 80,
        nextStepReady: false
      };
    }

    return {
      isValid: true,
      completionPercentage: 100,
      nextStepReady: true
    };
  }

  /**
   * 점수 계산 검증
   */
  private static async validateScoreCalculation(): Promise<ValidationResult> {
    const { diagnosisData, score_calculation_result } = this.currentData;
    
    const data = diagnosisData || score_calculation_result;
    if (!data) {
      return {
        isValid: false,
        errorMessage: '점수 계산 결과가 없습니다.',
        completionPercentage: 0,
        nextStepReady: false
      };
    }

    // 총점 검증
    const totalScore = Number(data.scores?.total);
    if (isNaN(totalScore) || totalScore < 0 || totalScore > 225) {
      return {
        isValid: false,
        errorMessage: `총점이 유효하지 않습니다: ${totalScore}`,
        completionPercentage: 25,
        nextStepReady: false
      };
    }

    // 퍼센트 검증
    const percentage = Number(data.scores?.percentage);
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      return {
        isValid: false,
        errorMessage: `퍼센트가 유효하지 않습니다: ${percentage}`,
        completionPercentage: 50,
        nextStepReady: false
      };
    }

    // 카테고리별 점수 검증
    const categoryScores = data.scores?.categoryScores;
    if (!categoryScores) {
      return {
        isValid: false,
        errorMessage: '카테고리별 점수가 없습니다.',
        completionPercentage: 75,
        nextStepReady: false
      };
    }

    const requiredCategories = [
      'businessFoundation', 'currentAI', 'organizationReadiness',
      'technologyInfrastructure', 'dataManagement', 'humanResources'
    ];
    
    const invalidCategories = requiredCategories.filter(category => {
      const score = Number(categoryScores[category]);
      return isNaN(score) || score < 0 || score > 45;
    });

    if (invalidCategories.length > 0) {
      return {
        isValid: false,
        errorMessage: `카테고리 점수 오류: ${invalidCategories.join(', ')}`,
        completionPercentage: 85,
        nextStepReady: false
      };
    }

    return {
      isValid: true,
      completionPercentage: 100,
      nextStepReady: true
    };
  }

  /**
   * 24페이지 보고서 생성 검증
   */
  private static async validateReportGeneration(): Promise<ValidationResult> {
    const { htmlReport, report_generation_result } = this.currentData;
    
    const report = htmlReport || report_generation_result;
    if (!report) {
      return {
        isValid: false,
        errorMessage: '보고서가 생성되지 않았습니다.',
        completionPercentage: 0,
        nextStepReady: false
      };
    }

    // HTML 형식 검증
    if (typeof report !== 'string' || !report.includes('<!DOCTYPE html>')) {
      return {
        isValid: false,
        errorMessage: '유효하지 않은 HTML 보고서입니다.',
        completionPercentage: 20,
        nextStepReady: false
      };
    }

    // 24페이지 검증
    const slideCount = (report.match(/id="slide\d+"/g) || []).length;
    if (slideCount < 24) {
      return {
        isValid: false,
        errorMessage: `페이지 수 부족: ${slideCount}/24 페이지`,
        completionPercentage: 40,
        nextStepReady: false
      };
    }

    // 필수 컨텐츠 검증
    const requiredContent = [
      'totalSlides">24',
      'V22.7 AICAMP',
      'slide24',
      'progress-fill',
      'presentation-controls'
    ];

    const missingContent = requiredContent.filter(content => !report.includes(content));
    if (missingContent.length > 0) {
      return {
        isValid: false,
        errorMessage: `필수 컨텐츠 누락: ${missingContent.join(', ')}`,
        completionPercentage: 70,
        nextStepReady: false
      };
    }

    // 보고서 크기 검증 (최소 크기 확인)
    if (report.length < 50000) {
      return {
        isValid: false,
        errorMessage: '보고서 크기가 너무 작습니다. 완전한 24페이지가 생성되지 않았을 수 있습니다.',
        completionPercentage: 85,
        nextStepReady: false
      };
    }

    return {
      isValid: true,
      completionPercentage: 100,
      nextStepReady: true
    };
  }

  /**
   * 최종 품질 검증
   */
  private static async validateQuality(): Promise<ValidationResult> {
    const { htmlReport, diagnosisData } = this.currentData;
    
    if (!htmlReport || !diagnosisData) {
      return {
        isValid: false,
        errorMessage: '품질 검증을 위한 데이터가 부족합니다.',
        completionPercentage: 0,
        nextStepReady: false
      };
    }

    // 데이터 일관성 검증
    const reportIncludesCompanyName = htmlReport.includes(diagnosisData.companyInfo?.name);
    const reportIncludesTotalScore = htmlReport.includes(String(diagnosisData.scores?.total));
    
    if (!reportIncludesCompanyName || !reportIncludesTotalScore) {
      return {
        isValid: false,
        errorMessage: '보고서와 데이터 간 일관성 오류가 발견되었습니다.',
        completionPercentage: 50,
        nextStepReady: false
      };
    }

    // 사실기반 원칙 검증
    if (diagnosisData.isVirtualData === true) {
      return {
        isValid: false,
        errorMessage: '가상 데이터 사용이 감지되었습니다. 사실기반 원칙 위반입니다.',
        completionPercentage: 30,
        nextStepReady: false
      };
    }

    return {
      isValid: true,
      completionPercentage: 100,
      nextStepReady: true
    };
  }

  /**
   * 전체 프로세스 실행 (무오류 보장)
   */
  static async executeCompleteProcess(
    diagnosisId: string,
    stepFunctions: Record<string, () => Promise<any>>
  ): Promise<{
    success: boolean;
    completedSteps: string[];
    failedStep?: string;
    errorMessage?: string;
    finalData?: any;
  }> {
    console.log('🛡️ 무오류 전체 프로세스 시작:', diagnosisId);
    
    this.currentData = { diagnosisId };
    this.validationHistory = [];
    const completedSteps: string[] = [];

    for (const stepConfig of this.validationSteps) {
      const stepFunction = stepFunctions[stepConfig.stepId];
      if (!stepFunction) {
        return {
          success: false,
          completedSteps,
          failedStep: stepConfig.stepId,
          errorMessage: `단계 함수가 정의되지 않았습니다: ${stepConfig.stepId}`
        };
      }

      const result = await this.executeStepWithValidation(
        stepConfig.stepId,
        stepFunction
      );

      if (!result.isValid || !result.nextStepReady) {
        return {
          success: false,
          completedSteps,
          failedStep: stepConfig.stepId,
          errorMessage: result.errorMessage
        };
      }

      completedSteps.push(stepConfig.stepId);
      console.log(`✅ 단계 완료 확인: ${stepConfig.stepName}`);
    }

    console.log('🎉 무오류 전체 프로세스 완료!');
    return {
      success: true,
      completedSteps,
      finalData: this.currentData
    };
  }

  /**
   * 검증 히스토리 조회
   */
  static getValidationHistory(): Array<{
    stepId: string;
    stepName: string;
    timestamp: Date;
    result: ValidationResult;
    retryCount: number;
  }> {
    return this.validationHistory.map(entry => ({
      ...entry,
      stepName: this.validationSteps.find(step => step.stepId === entry.stepId)?.stepName || entry.stepId
    }));
  }

  /**
   * 현재 데이터 상태 조회
   */
  static getCurrentData(): any {
    return { ...this.currentData };
  }

  /**
   * 시스템 리셋
   */
  static reset(): void {
    this.currentData = {};
    this.validationHistory = [];
    console.log('🔄 무오류 검증 시스템 리셋 완료');
  }
}
