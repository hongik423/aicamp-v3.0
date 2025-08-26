/**
 * ================================================================================
 * 🚀 완벽한 챗봇 답변 시스템 - 타입 정의
 * ================================================================================
 */

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'button';
  metadata?: MessageMetadata;
  buttons?: Button[];
}

export interface MessageMetadata {
  confidence?: number;
  services?: string[];
  intent?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  sourceLabel?: string;
  processingTime?: number;
  fallbackLevel?: number;
  emotionalAnalysis?: any;
  contextAnalysis?: any;
}

export interface Button {
  text: string;
  url: string;
  style: 'primary' | 'secondary' | 'outline' | 'accent';
  icon: string;
  action?: 'navigate' | 'open' | 'download' | 'share';
}

export interface ChatSession {
  id: string;
  messageCount: number;
  startTime: Date;
  lastActivity: Date;
  userPreferences?: string[];
  context?: any;
}

export interface ChatResponse {
  success: boolean;
  response: string;
  buttons?: Button[];
  responseLength: number;
  complexity: 'cached' | 'enhanced' | 'fallback';
  metadata: ResponseMetadata;
}

export interface ResponseMetadata {
  model: string;
  processingTime: number;
  service: string;
  expertise: string;
  isOnDevice: boolean;
  apiCost: number;
  isCached?: boolean;
  qualityScore?: number;
  fallbackLevel?: number;
  emotionalAnalysis?: any;
  contextAnalysis?: any;
  cacheStats?: CacheStats;
  sourceLabel?: string;
  error?: string;
}

export interface CacheStats {
  hits: number;
  misses: number;
  hitRate: number;
}

export interface QuickResponse {
  text: string;
  icon: string;
  category?: string;
}

export interface ChatbotConfig {
  enableVoice: boolean;
  enableQuickResponses: boolean;
  maxMessageLength: number;
  responseTimeout: number;
  cacheEnabled: boolean;
  cacheTTL: number;
  qualityThreshold: number;
}

export interface EmotionalAnalysis {
  primaryEmotion: string;
  secondaryEmotion: string;
  intensity: number;
  suggestedTone: string;
  empathyLevel: number;
  urgencyLevel: number;
}

export interface ContextAnalysis {
  intent: string;
  urgency: 'low' | 'medium' | 'high';
  complexity: 'simple' | 'moderate' | 'complex';
  domain: string;
  keywords: string[];
  entities: Entity[];
  sentiment: 'positive' | 'neutral' | 'negative';
  userType: 'new' | 'returning' | 'expert';
  sessionContext: SessionContext;
}

export interface Entity {
  type: 'service' | 'product' | 'technology' | 'role' | 'industry' | 'problem';
  value: string;
  confidence: number;
}

export interface SessionContext {
  sessionId: string;
  messageCount: number;
  topics: string[];
  mood: string;
  engagement: number;
}

export interface QualityMetrics {
  relevance: number;
  completeness: number;
  clarity: number;
  helpfulness: number;
  overallScore: number;
  improvementSuggestions: string[];
}

export interface PersonalizationData {
  userPreferences: string[];
  interactionHistory: InteractionHistory[];
  learningProgress: LearningProgress;
  customizationLevel: number;
}

export interface InteractionHistory {
  timestamp: Date;
  question: string;
  response: string;
  satisfaction: number;
  category: string;
}

export interface LearningProgress {
  topics: string[];
  proficiency: Record<string, number>;
  interests: string[];
  goals: string[];
}

export interface ResponseMetadata {
  processingTime: number;
  model: string;
  version: string;
  timestamp: Date;
  cacheHit: boolean;
  fallbackLevel?: number;
}

export interface EnhancedResponse {
  answer: string;
  confidence: number;
  category: string;
  tone: string;
  nextSteps: string[];
  contactInfo: string;
  context: ContextAnalysis;
  emotionalAnalysis: EmotionalAnalysis;
  qualityMetrics: QualityMetrics;
  personalization: PersonalizationData;
  metadata: ResponseMetadata;
}
