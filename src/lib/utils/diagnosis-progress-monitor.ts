/**
 * 🔍 AI 역량진단 진행과정 실시간 모니터링 시스템
 * 실제 진행 상황을 추적하여 사용자에게 신뢰할 수 있는 상태 정보 제공
 */

export interface DiagnosisStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
  startTime?: number;
  endTime?: number;
  progress?: number;
  details?: string;
  estimatedDuration?: number; // 예상 소요 시간 (초)
}

export interface DiagnosisProgress {
  sessionId: string;
  currentStep: number;
  totalSteps: number;
  overallProgress: number;
  steps: DiagnosisStep[];
  startTime: number;
  estimatedCompletionTime?: number;
  actualCompletionTime?: number;
}

export class DiagnosisProgressMonitor {
  private static instance: DiagnosisProgressMonitor;
  private progressMap: Map<string, DiagnosisProgress> = new Map();
  private listeners: Map<string, ((progress: DiagnosisProgress) => void)[]> = new Map();

  static getInstance(): DiagnosisProgressMonitor {
    if (!DiagnosisProgressMonitor.instance) {
      DiagnosisProgressMonitor.instance = new DiagnosisProgressMonitor();
    }
    return DiagnosisProgressMonitor.instance;
  }

  /**
   * 진단 프로세스 초기화
   */
  initializeDiagnosis(sessionId: string): DiagnosisProgress {
    const steps: DiagnosisStep[] = [
      {
        id: 'validation',
        title: '📋 데이터 검증',
        description: '제출하신 정보를 검증하고 있습니다',
        status: 'pending',
        estimatedDuration: 3
      },
      {
        id: 'analysis',
        title: '🧠 AI 분석',
        description: '45개 문항을 바탕으로 AI가 종합 분석 중입니다',
        status: 'pending',
        estimatedDuration: 120
      },
      {
        id: 'scoring',
        title: '📊 점수 계산',
        description: '카테고리별 점수를 계산하고 있습니다',
        status: 'pending',
        estimatedDuration: 15
      },
      {
        id: 'benchmark',
        title: '📈 벤치마크 분석',
        description: '업종별/규모별 벤치마킹을 진행하고 있습니다',
        status: 'pending',
        estimatedDuration: 20
      },
      {
        id: 'swot',
        title: '🎯 SWOT 분석',
        description: '강점, 약점, 기회, 위협 요소를 분석하고 있습니다',
        status: 'pending',
        estimatedDuration: 25
      },
      {
        id: 'recommendations',
        title: '💡 맞춤형 권고사항',
        description: '귀하의 기업에 특화된 개선 방안을 생성하고 있습니다',
        status: 'pending',
        estimatedDuration: 30
      },
      {
        id: 'report_generation',
        title: '📄 보고서 생성',
        description: '이교장의AI역량진단보고서를 작성하고 있습니다',
        status: 'pending',
        estimatedDuration: 40
      },
      {
        id: 'quality_check',
        title: '✅ 품질 검증',
        description: '보고서 품질을 최종 검증하고 있습니다',
        status: 'pending',
        estimatedDuration: 10
      },
      {
        id: 'email_preparation',
        title: '📧 이메일 준비',
        description: 'HTML 보고서를 첨부하여 이메일을 준비하고 있습니다',
        status: 'pending',
        estimatedDuration: 8
      },
      {
        id: 'delivery',
        title: '🚀 보고서 발송',
        description: '이교장의AI역량진단보고서를 이메일로 발송하고 있습니다',
        status: 'pending',
        estimatedDuration: 5
      }
    ];

    const totalEstimatedTime = steps.reduce((sum, step) => sum + (step.estimatedDuration || 0), 0);
    
    const progress: DiagnosisProgress = {
      sessionId,
      currentStep: 0,
      totalSteps: steps.length,
      overallProgress: 0,
      steps,
      startTime: Date.now(),
      estimatedCompletionTime: Date.now() + (totalEstimatedTime * 1000)
    };

    this.progressMap.set(sessionId, progress);
    this.notifyListeners(sessionId, progress);
    
    return progress;
  }

  /**
   * 단계 시작
   */
  startStep(sessionId: string, stepId: string, details?: string): void {
    const progress = this.progressMap.get(sessionId);
    if (!progress) return;

    const stepIndex = progress.steps.findIndex(s => s.id === stepId);
    if (stepIndex === -1) return;

    const step = progress.steps[stepIndex];
    step.status = 'in_progress';
    step.startTime = Date.now();
    step.progress = 0;
    if (details) step.details = details;

    progress.currentStep = stepIndex;
    this.updateOverallProgress(progress);
    
    this.progressMap.set(sessionId, progress);
    this.notifyListeners(sessionId, progress);

    console.log(`🔄 [${sessionId}] 단계 시작: ${step.title}`);
  }

  /**
   * 단계 진행률 업데이트
   */
  updateStepProgress(sessionId: string, stepId: string, progressPercent: number, details?: string): void {
    const progress = this.progressMap.get(sessionId);
    if (!progress) return;

    const step = progress.steps.find(s => s.id === stepId);
    if (!step || step.status !== 'in_progress') return;

    step.progress = Math.min(100, Math.max(0, progressPercent));
    if (details) step.details = details;

    this.updateOverallProgress(progress);
    
    this.progressMap.set(sessionId, progress);
    this.notifyListeners(sessionId, progress);
  }

  /**
   * 단계 완료
   */
  completeStep(sessionId: string, stepId: string, details?: string): void {
    const progress = this.progressMap.get(sessionId);
    if (!progress) return;

    const step = progress.steps.find(s => s.id === stepId);
    if (!step) return;

    step.status = 'completed';
    step.endTime = Date.now();
    step.progress = 100;
    if (details) step.details = details;

    this.updateOverallProgress(progress);
    
    this.progressMap.set(sessionId, progress);
    this.notifyListeners(sessionId, progress);

    console.log(`✅ [${sessionId}] 단계 완료: ${step.title} (${step.endTime! - step.startTime!}ms)`);
  }

  /**
   * 단계 오류 처리
   */
  errorStep(sessionId: string, stepId: string, error: string): void {
    const progress = this.progressMap.get(sessionId);
    if (!progress) return;

    const step = progress.steps.find(s => s.id === stepId);
    if (!step) return;

    step.status = 'error';
    step.endTime = Date.now();
    step.details = `오류 발생: ${error}`;

    this.progressMap.set(sessionId, progress);
    this.notifyListeners(sessionId, progress);

    console.error(`❌ [${sessionId}] 단계 오류: ${step.title} - ${error}`);
  }

  /**
   * 전체 진단 완료
   */
  completeDiagnosis(sessionId: string): void {
    const progress = this.progressMap.get(sessionId);
    if (!progress) return;

    progress.actualCompletionTime = Date.now();
    progress.overallProgress = 100;

    // 미완료 단계들을 완료로 표시
    progress.steps.forEach(step => {
      if (step.status === 'pending' || step.status === 'in_progress') {
        step.status = 'completed';
        step.progress = 100;
        if (!step.endTime) step.endTime = Date.now();
      }
    });

    this.progressMap.set(sessionId, progress);
    this.notifyListeners(sessionId, progress);

    const totalTime = progress.actualCompletionTime - progress.startTime;
    console.log(`🎉 [${sessionId}] 진단 완료 (총 소요시간: ${Math.round(totalTime/1000)}초)`);
  }

  /**
   * 전체 진행률 계산
   */
  private updateOverallProgress(progress: DiagnosisProgress): void {
    const completedSteps = progress.steps.filter(s => s.status === 'completed').length;
    const currentStep = progress.steps.find(s => s.status === 'in_progress');
    const currentStepProgress = currentStep?.progress || 0;

    progress.overallProgress = Math.round(
      ((completedSteps + (currentStepProgress / 100)) / progress.totalSteps) * 100
    );

    // 예상 완료 시간 재계산
    if (progress.overallProgress > 0) {
      const elapsedTime = Date.now() - progress.startTime;
      const estimatedTotalTime = (elapsedTime / progress.overallProgress) * 100;
      progress.estimatedCompletionTime = progress.startTime + estimatedTotalTime;
    }
  }

  /**
   * 진행 상황 조회
   */
  getProgress(sessionId: string): DiagnosisProgress | undefined {
    return this.progressMap.get(sessionId);
  }

  /**
   * 진행 상황 리스너 등록
   */
  addListener(sessionId: string, callback: (progress: DiagnosisProgress) => void): void {
    if (!this.listeners.has(sessionId)) {
      this.listeners.set(sessionId, []);
    }
    this.listeners.get(sessionId)!.push(callback);
  }

  /**
   * 진행 상황 리스너 제거
   */
  removeListener(sessionId: string, callback: (progress: DiagnosisProgress) => void): void {
    const listeners = this.listeners.get(sessionId);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  /**
   * 리스너들에게 알림
   */
  private notifyListeners(sessionId: string, progress: DiagnosisProgress): void {
    const listeners = this.listeners.get(sessionId);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(progress);
        } catch (error) {
          console.error('Progress listener error:', error);
        }
      });
    }
  }

  /**
   * 세션 정리
   */
  cleanup(sessionId: string): void {
    this.progressMap.delete(sessionId);
    this.listeners.delete(sessionId);
  }

  /**
   * 진행 상황을 사용자 친화적 메시지로 변환
   */
  getProgressMessage(progress: DiagnosisProgress): string {
    const currentStep = progress.steps[progress.currentStep];
    if (!currentStep) return '진단을 준비하고 있습니다...';

    const remainingTime = progress.estimatedCompletionTime 
      ? Math.max(0, Math.round((progress.estimatedCompletionTime - Date.now()) / 1000))
      : 0;

    let message = `${currentStep.title}: ${currentStep.description}`;
    
    if (currentStep.status === 'in_progress' && currentStep.progress) {
      message += ` (${currentStep.progress}%)`;
    }

    if (remainingTime > 0 && remainingTime < 300) { // 5분 미만일 때만 표시
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      if (minutes > 0) {
        message += ` - 예상 완료: ${minutes}분 ${seconds}초 후`;
      } else {
        message += ` - 예상 완료: ${seconds}초 후`;
      }
    }

    return message;
  }
}
