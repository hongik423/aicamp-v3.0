/**
 * 하이브리드 AI 프로바이더 타입 정의
 */

export interface HybridAIResponse {
  response: string;
  source: 'local' | 'fallback';
  processingTime: number;
  modelUsed: string;
  metadata?: {
    localOllamaAvailable: boolean;
    fallbackReason?: string;
  };
}

export interface OllamaStatus {
  isRunning: boolean;
  modelAvailable: boolean;
  modelName: string;
  lastChecked: string;
  responseTime?: number;
  error?: string;
}

export interface CallAIParams {
  prompt: string;
  system?: string;
  temperature?: number;
  maxTokens?: number;
  model?: string;
  history?: Array<{ role: string; content: string }>;
}

export interface ServiceStatus {
  localOllamaAvailable: boolean;
  modelName: string;
  lastChecked: string;
  responseTime?: number;
  error?: string;
}
