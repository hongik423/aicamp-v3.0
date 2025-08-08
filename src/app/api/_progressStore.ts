export type DiagnosisStepStatus = 'pending' | 'in-progress' | 'completed' | 'error';

export interface DiagnosisProgressEvent {
  diagnosisId: string;
  stepId?: string; // e.g., 'data-validation' | 'gemini-analysis' | 'swot-analysis' | 'report-generation' | 'email-sending'
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

const globalAny = global as unknown as { __AICAMP_PROGRESS_STORE__?: Map<string, DiagnosisProgressState> };

const store: Map<string, DiagnosisProgressState> =
  globalAny.__AICAMP_PROGRESS_STORE__ || new Map<string, DiagnosisProgressState>();

if (!globalAny.__AICAMP_PROGRESS_STORE__) {
  globalAny.__AICAMP_PROGRESS_STORE__ = store;
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
  const state = store.get(diagnosisId);
  if (!state) return undefined;
  return {
    lastUpdateTs: state.lastUpdateTs,
    events: state.events.slice(-50), // 최근 50개만 노출
    latestByStep: state.latestByStep,
  };
}


