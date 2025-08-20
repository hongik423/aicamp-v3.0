'use client'

export interface DiagnosisProgressStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  startTime?: number;
  endTime?: number;
  estimatedTime: string;
  progress?: number; // 0-100
  message?: string;
}

export interface DiagnosisProgressState {
  diagnosisId: string;
  companyName: string;
  currentStep: string;
  overallProgress: number; // 0-100
  steps: DiagnosisProgressStep[];
  startTime: number;
  estimatedCompletionTime?: number;
  isCompleted: boolean;
  hasError: boolean;
  errorMessage?: string;
  lastUpdated: number;
}

export class DiagnosisProgressTracker {
  private static instance: DiagnosisProgressTracker;
  private progressState: Map<string, DiagnosisProgressState> = new Map();
  private listeners: Map<string, ((state: DiagnosisProgressState) => void)[]> = new Map();
  private pollingIntervals: Map<string, NodeJS.Timeout> = new Map();

  private constructor() {}

  static getInstance(): DiagnosisProgressTracker {
    if (!DiagnosisProgressTracker.instance) {
      DiagnosisProgressTracker.instance = new DiagnosisProgressTracker();
    }
    return DiagnosisProgressTracker.instance;
  }

  // 진단 시작
  startTracking(diagnosisId: string, companyName: string): DiagnosisProgressState {
    const initialSteps: DiagnosisProgressStep[] = [
      {
        id: 'data-validation',
        name: '데이터 검증 및 전처리',
        description: '제출된 정보의 완성도와 유효성을 검증합니다',
        status: 'in-progress',
        estimatedTime: '30초',
        startTime: Date.now(),
        progress: 0
      },
      {
        id: 'ollama-analysis',
        name: 'Ollama GPT-OSS 20B AI 분석',
        description: 'AI 역량 6분야 종합 평가 및 업종별 벤치마크 비교',
        status: 'pending',
        estimatedTime: '2-3분'
      },
      {
        id: 'swot-analysis',
        name: 'SWOT 전략 분석',
        description: '강점/약점/기회/위협 요인 분석 및 전략 도출',
        status: 'pending',
        estimatedTime: '1-2분'
      },
      {
        id: 'report-generation',
        name: '맞춤형 보고서 생성',
        description: '실행 로드맵 및 개선방안 포함 종합 보고서 작성',
        status: 'pending',
        estimatedTime: '2-3분'
      },
      {
        id: 'email-sending',
        name: '완성된 보고서 이메일 전송',
        description: 'PDF 형태의 최종 진단보고서 이메일 발송',
        status: 'pending',
        estimatedTime: '30-60초'
      }
    ];

    const state: DiagnosisProgressState = {
      diagnosisId,
      companyName,
      currentStep: 'data-validation',
      overallProgress: 5,
      steps: initialSteps,
      startTime: Date.now(),
      estimatedCompletionTime: Date.now() + (8 * 60 * 1000), // 8분 후 예상 완료
      isCompleted: false,
      hasError: false,
      lastUpdated: Date.now()
    };

    this.progressState.set(diagnosisId, state);
    this.startPolling(diagnosisId);
    this.notifyListeners(diagnosisId, state);
    
    return state;
  }

  // 리스너 추가
  addListener(diagnosisId: string, callback: (state: DiagnosisProgressState) => void): void {
    if (!this.listeners.has(diagnosisId)) {
      this.listeners.set(diagnosisId, []);
    }
    this.listeners.get(diagnosisId)!.push(callback);
  }

  // 리스너 제거
  removeListener(diagnosisId: string, callback: (state: DiagnosisProgressState) => void): void {
    const callbacks = this.listeners.get(diagnosisId);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  // 상태 업데이트
  updateProgress(diagnosisId: string, updates: Partial<DiagnosisProgressState>): void {
    const currentState = this.progressState.get(diagnosisId);
    if (!currentState) return;

    const newState = {
      ...currentState,
      ...updates,
      lastUpdated: Date.now()
    };

    this.progressState.set(diagnosisId, newState);
    this.notifyListeners(diagnosisId, newState);
  }

  // 단계 업데이트
  updateStep(diagnosisId: string, stepId: string, updates: Partial<DiagnosisProgressStep>): void {
    const currentState = this.progressState.get(diagnosisId);
    if (!currentState) return;

    const updatedSteps = currentState.steps.map(step => {
      if (step.id === stepId) {
        const updatedStep = { ...step, ...updates };
        
        // 상태 변경 시 시간 기록
        if (updates.status === 'in-progress' && !step.startTime) {
          updatedStep.startTime = Date.now();
        }
        if (updates.status === 'completed' && !step.endTime) {
          updatedStep.endTime = Date.now();
        }
        
        return updatedStep;
      }
      return step;
    });

    // 전체 진행률 계산
    const completedSteps = updatedSteps.filter(s => s.status === 'completed').length;
    const inProgressSteps = updatedSteps.filter(s => s.status === 'in-progress').length;
    const overallProgress = Math.min(100, (completedSteps + (inProgressSteps * 0.5)) / updatedSteps.length * 100);

    // 현재 단계 업데이트
    const currentStepObj = updatedSteps.find(s => s.status === 'in-progress');
    const currentStep = currentStepObj?.id || updatedSteps[updatedSteps.length - 1]?.id;

    // 완료 여부 확인
    const isCompleted = completedSteps === updatedSteps.length;

    const newState: DiagnosisProgressState = {
      ...currentState,
      steps: updatedSteps,
      overallProgress,
      currentStep,
      isCompleted,
      lastUpdated: Date.now()
    };

    this.progressState.set(diagnosisId, newState);
    this.notifyListeners(diagnosisId, newState);

    // 완료 시 폴링 중지
    if (isCompleted) {
      this.stopPolling(diagnosisId);
    }
  }

  // 오류 처리
  setError(diagnosisId: string, errorMessage: string, stepId?: string): void {
    const currentState = this.progressState.get(diagnosisId);
    if (!currentState) return;

    let updatedSteps = currentState.steps;
    if (stepId) {
      updatedSteps = currentState.steps.map(step =>
        step.id === stepId ? { ...step, status: 'error' as const, message: errorMessage } : step
      );
    }

    const newState: DiagnosisProgressState = {
      ...currentState,
      steps: updatedSteps,
      hasError: true,
      errorMessage,
      lastUpdated: Date.now()
    };

    this.progressState.set(diagnosisId, newState);
    this.notifyListeners(diagnosisId, newState);
    this.stopPolling(diagnosisId);
  }

  // 현재 상태 조회
  getProgress(diagnosisId: string): DiagnosisProgressState | null {
    return this.progressState.get(diagnosisId) || null;
  }

  // 폴링 시작
  private startPolling(diagnosisId: string): void {
    if (this.pollingIntervals.has(diagnosisId)) return;

    const interval = setInterval(async () => {
      await this.pollProgress(diagnosisId);
    }, 5000); // 5초마다 폴링

    this.pollingIntervals.set(diagnosisId, interval);
  }

  // 폴링 중지
  private stopPolling(diagnosisId: string): void {
    const interval = this.pollingIntervals.get(diagnosisId);
    if (interval) {
      clearInterval(interval);
      this.pollingIntervals.delete(diagnosisId);
    }
  }

  // 진행 상태 폴링
  private async pollProgress(diagnosisId: string): Promise<void> {
    try {
      const response = await fetch(`/api/diagnosis-progress/${diagnosisId}`);
      if (!response.ok) {
        // 404는 정상 (아직 처리 중)
        if (response.status === 404) return;
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.progress) {
        // 서버에서 받은 진행 상태로 업데이트
        this.updateFromServerData(diagnosisId, data.progress);
      }

      // 완료 확인
      if (data.completed) {
        const currentState = this.progressState.get(diagnosisId);
        if (currentState) {
          // 모든 단계 완료 처리
          const completedSteps = currentState.steps.map(step => ({
            ...step,
            status: 'completed' as const,
            endTime: step.endTime || Date.now(),
            progress: 100
          }));

          this.updateProgress(diagnosisId, {
            steps: completedSteps,
            overallProgress: 100,
            isCompleted: true
          });
        }
      }

    } catch (error) {
      console.error('진행 상태 폴링 오류:', error);
      // 네트워크 오류는 무시하고 다음 주기에 재시도
    }
  }

  // 서버 데이터로 상태 업데이트
  private updateFromServerData(diagnosisId: string, serverProgress: any): void {
    const currentState = this.progressState.get(diagnosisId);
    if (!currentState) return;

    // 서버에서 받은 단계별 진행 상태 적용
    if (serverProgress.steps) {
      Object.keys(serverProgress.steps).forEach(stepId => {
        const stepData = serverProgress.steps[stepId];
        this.updateStep(diagnosisId, stepId, {
          status: stepData.status,
          progress: stepData.progress,
          message: stepData.message
        });
      });
    }

    // 전체 진행률 업데이트
    if (serverProgress.overallProgress !== undefined) {
      this.updateProgress(diagnosisId, {
        overallProgress: serverProgress.overallProgress
      });
    }
  }

  // 리스너에게 알림
  private notifyListeners(diagnosisId: string, state: DiagnosisProgressState): void {
    const callbacks = this.listeners.get(diagnosisId);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(state);
        } catch (error) {
          console.error('Progress listener 오류:', error);
        }
      });
    }
  }

  // 추적 중지
  stopTracking(diagnosisId: string): void {
    this.stopPolling(diagnosisId);
    this.progressState.delete(diagnosisId);
    this.listeners.delete(diagnosisId);
  }

  // 모든 추적 중지 (페이지 언로드 시)
  stopAllTracking(): void {
    this.pollingIntervals.forEach((interval, diagnosisId) => {
      this.stopPolling(diagnosisId);
    });
    this.progressState.clear();
    this.listeners.clear();
  }
}

// 전역 인스턴스
export const progressTracker = DiagnosisProgressTracker.getInstance();

// 페이지 언로드 시 정리
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    progressTracker.stopAllTracking();
  });
}
