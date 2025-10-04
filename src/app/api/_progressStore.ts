export type DiagnosisStepStatus = 'pending' | 'in-progress' | 'completed' | 'error';

export interface DiagnosisProgressEvent {
  diagnosisId: string;
  stepId?: string; // e.g., 'data-validation' | 'ollama-analysis' | 'swot-analysis' | 'report-generation' | 'email-sending'
  stepName?: string;
  status?: DiagnosisStepStatus;
  progressPercent?: number; // 0-100
  message?: string;
  timestamp?: string;
  meta?: Record<string, unknown>;
}

interface DiagnosisProgressState {
  lastUpdateTs: number;
  events: DiagnosisProgressEvent[];
  latestByStep: Record<string, DiagnosisProgressEvent | undefined>;
}

const globalAny = global as unknown as { __AICAMP_PROGRESS_STORE__?: Map<string, DiagnosisProgressState>, __AICAMP_LOCAL_RESULTS__?: Map<string, any> };

const store: Map<string, DiagnosisProgressState> =
  globalAny.__AICAMP_PROGRESS_STORE__ || new Map<string, DiagnosisProgressState>();
const localResultsStore: Map<string, any> =
  globalAny.__AICAMP_LOCAL_RESULTS__ || new Map<string, any>();

if (!globalAny.__AICAMP_PROGRESS_STORE__) {
  globalAny.__AICAMP_PROGRESS_STORE__ = store;
}
if (!globalAny.__AICAMP_LOCAL_RESULTS__) {
  globalAny.__AICAMP_LOCAL_RESULTS__ = localResultsStore;
}

export function addProgressEvent(event: DiagnosisProgressEvent) {
  const now = Date.now();
  const current = store.get(event.diagnosisId) || {
    lastUpdateTs: now,
    events: [],
    latestByStep: {},
  };

  const withTs: DiagnosisProgressEvent = {
    ...event,
    timestamp: event.timestamp || new Date().toISOString(),
  };

  current.events.push(withTs);
  if (event.stepId) {
    current.latestByStep[event.stepId] = withTs;
  }
  current.lastUpdateTs = now;
  store.set(event.diagnosisId, current);
}

export function getProgressState(diagnosisId: string): DiagnosisProgressState | undefined {
  return store.get(diagnosisId);
}

export function getProgressSnapshot(diagnosisId: string) {
  try {
    const state = store.get(diagnosisId);
    if (!state) {
      // 🛡️ 상태가 없을 때 기본 스냅샷 반환 (500 오류 방지)
      return {
        lastUpdateTs: Date.now(),
        events: [],
        latestByStep: {},
        steps: {
          'data-validation': { status: 'in-progress', progress: 20 },
          'ollama-analysis': { status: 'pending', progress: 0 },
          'swot-analysis': { status: 'pending', progress: 0 },
          'report-generation': { status: 'pending', progress: 0 },
          'email-sending': { status: 'pending', progress: 0 }
        }
      };
    }
    // 최신 이벤트 기반으로 단계 구성
    const stepKeys = ['data-validation','ollama-analysis','swot-analysis','report-generation','email-sending'] as const;
    const composedSteps: Record<string, { status: string; progress: number }> = {};
    stepKeys.forEach((key) => {
      const ev = state.latestByStep[key as string];
      if (ev) {
        composedSteps[key as string] = {
          status: (ev.status as string) || 'in-progress',
          progress: typeof ev.progressPercent === 'number' ? Math.max(0, Math.min(100, Math.round(ev.progressPercent))) : 0,
        };
      }
    });

    return {
      lastUpdateTs: state.lastUpdateTs,
      events: state.events.slice(-50), // 최근 50개만 노출
      latestByStep: state.latestByStep,
      steps: Object.keys(composedSteps).length > 0 ? composedSteps : {
        'data-validation': { status: 'in-progress', progress: 20 },
        'ollama-analysis': { status: 'pending', progress: 0 },
        'swot-analysis': { status: 'pending', progress: 0 },
        'report-generation': { status: 'pending', progress: 0 },
        'email-sending': { status: 'pending', progress: 0 }
      }
    };
  } catch (error) {
    console.error('🛡️ 진행상황 스냅샷 생성 오류 차단:', error);
    // 🛡️ 오류 발생 시에도 기본 스냅샷 반환
    return {
      lastUpdateTs: Date.now(),
      events: [],
      latestByStep: {},
      steps: {
        'data-validation': { status: 'in-progress', progress: 20 },
        'ollama-analysis': { status: 'pending', progress: 0 },
        'swot-analysis': { status: 'pending', progress: 0 },
        'report-generation': { status: 'pending', progress: 0 },
        'email-sending': { status: 'pending', progress: 0 }
      }
    };
  }
}


