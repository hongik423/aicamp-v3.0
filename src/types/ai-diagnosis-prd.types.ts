/**
 * ================================================================================
 * 🚀 AI 역량진단결과보고서 작성 시스템 - PRD 기반 타입 정의
 * ================================================================================
 * 
 * @fileoverview PRD 요구사항에 완벽히 부합하는 TypeScript 타입 정의
 * @version 1.0.0
 * @encoding UTF-8
 */

// ================================================================================
// 📋 PART 1: 핵심 기능 타입 정의
// ================================================================================

/**
 * AI 역량 진단 엔진 - 45문항 AI 역량 평가
 */
export interface AICapabilityAssessment {
  businessFoundation: ScoreRange[];    // Q1-Q8: 사업 기반 AI 이해도
  currentAIUsage: ScoreRange[];        // Q9-Q16: 현재 AI 활용 수준
  organizationalReadiness: ScoreRange[]; // Q17-Q24: 조직 준비도
  technicalInfrastructure: ScoreRange[]; // Q25-Q32: 기술 인프라
  strategicClarity: ScoreRange[];      // Q33-Q40: AI 전략 명확성
  implementationCapability: ScoreRange[]; // Q41-Q45: 실행 역량
}

export type ScoreRange = 1 | 2 | 3 | 4 | 5; // 5점 척도

/**
 * 보고서 생성 시스템
 */
export interface ReportGenerationSystem {
  templateEngine: ReportTemplate;
  dataAnalysisEngine: AnalysisEngine;
  customizationEngine: CustomizationEngine;
  exportEngine: ExportEngine;
}

export interface ReportTemplate {
  structure: PageStructure[];
  industrySpecificContent: IndustryContent[];
  visualComponents: ChartComponent[];
}

export interface PageStructure {
  pageNumber: number;
  title: string;
  content: PageContent;
  layout: PageLayout;
  elements: PageElement[];
}

export interface PageContent {
  type: 'cover' | 'toc' | 'executive-summary' | 'analysis' | 'recommendations' | 'appendix';
  sections: ContentSection[];
  charts?: ChartComponent[];
  tables?: TableComponent[];
}

export interface ContentSection {
  id: string;
  title: string;
  content: string;
  subsections?: ContentSection[];
  visualizations?: VisualizationComponent[];
}

export interface ChartComponent {
  id: string;
  type: 'bar' | 'line' | 'pie' | 'radar' | 'scatter' | 'heatmap';
  title: string;
  data: ChartData;
  options: ChartOptions;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string[];
  borderColor?: string[];
  borderWidth?: number;
}

export interface ChartOptions {
  responsive: boolean;
  maintainAspectRatio: boolean;
  plugins?: any;
  scales?: any;
}

export interface TableComponent {
  id: string;
  title: string;
  headers: string[];
  rows: (string | number)[][];
  styling?: TableStyling;
}

export interface TableStyling {
  headerStyle?: string;
  rowStyle?: string;
  alternatingRows?: boolean;
  borders?: boolean;
}

export interface VisualizationComponent {
  id: string;
  type: 'chart' | 'table' | 'infographic' | 'diagram';
  title: string;
  data: any;
  config: any;
}

export interface PageLayout {
  type: 'single-column' | 'two-column' | 'three-column' | 'grid';
  margins: Margins;
  spacing: number;
}

export interface Margins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface PageElement {
  id: string;
  type: 'text' | 'image' | 'chart' | 'table' | 'divider' | 'callout';
  position: Position;
  size: Size;
  content: any;
  styling?: ElementStyling;
}

export interface Position {
  x: number;
  y: number;
  z?: number; // z-index
}

export interface Size {
  width: number | 'auto' | 'full';
  height: number | 'auto';
}

export interface ElementStyling {
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  padding?: Margins;
  margin?: Margins;
  border?: BorderStyling;
}

export interface BorderStyling {
  width: number;
  style: 'solid' | 'dashed' | 'dotted';
  color: string;
  radius?: number;
}

/**
 * 업종별 맞춤화 엔진
 */
export enum IndustryType {
  MANUFACTURING = "제조업",
  SERVICE = "서비스업",
  RETAIL = "유통업",
  IT_SOFTWARE = "IT/소프트웨어",
  FINANCE = "금융업",
  CONSTRUCTION = "건설업",
  EDUCATION = "교육업",
  HEALTHCARE = "의료업",
  LOGISTICS = "운송업",
  AGRICULTURE = "농업"
}

export interface IndustrySpecificAnalysis {
  keyAIUseCases: AIUseCase[];
  benchmarkData: BenchmarkMetrics;
  recommendedSolutions: AIToolRecommendation[];
  implementationPriority: Priority[];
}

export interface AIUseCase {
  id: string;
  title: string;
  description: string;
  industry: IndustryType;
  difficulty: 'low' | 'medium' | 'high';
  roi: ROIEstimate;
  implementationTime: string;
  requiredResources: Resource[];
  successCriteria: string[];
}

export interface BenchmarkMetrics {
  industryAverage: number;
  topQuartile: number;
  medianScore: number;
  bottomQuartile: number;
  sampleSize: number;
  dataSource: string;
  lastUpdated: Date;
}

export interface AIToolRecommendation {
  id: string;
  name: string;
  category: 'automation' | 'analysis' | 'communication' | 'productivity' | 'security';
  description: string;
  suitability: number; // 0-100
  cost: CostEstimate;
  implementationComplexity: 'low' | 'medium' | 'high';
  roi: ROIEstimate;
  prerequisites: string[];
}

export interface Priority {
  id: string;
  title: string;
  description: string;
  importance: 1 | 2 | 3 | 4 | 5;
  urgency: 1 | 2 | 3 | 4 | 5;
  feasibility: 1 | 2 | 3 | 4 | 5;
  impact: 'low' | 'medium' | 'high' | 'very-high';
  timeframe: 'immediate' | 'short-term' | 'medium-term' | 'long-term';
  resources: Resource[];
}

export interface Resource {
  type: 'human' | 'financial' | 'technical' | 'external';
  description: string;
  quantity?: number;
  cost?: CostEstimate;
  availability?: 'available' | 'partial' | 'unavailable';
}

export interface CostEstimate {
  initial: number;
  monthly?: number;
  annual?: number;
  currency: 'KRW' | 'USD';
  breakdown?: CostBreakdown[];
}

export interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
  description?: string;
}

export interface ROIEstimate {
  timeToBreakeven: number; // months
  firstYearROI: number; // percentage
  threeYearROI: number; // percentage
  assumptions: string[];
  riskFactors: string[];
}

// ================================================================================
// 📋 PART 2: 사용자 입력 데이터 타입
// ================================================================================

export interface UserInputData {
  basicInfo: {
    companyName: string;
    industry: IndustryType;
    employeeCount: EmployeeRange;
    annualRevenue: RevenueRange;
    location: LocationType;
    contactPerson: string;
    email: string;
    phone?: string;
    position?: string;
    department?: string;
  };
  
  assessmentScores: {
    q1_to_q8: number[];   // 사업 기반 (8문항)
    q9_to_q16: number[];  // 현재 AI 활용 (8문항)
    q17_to_q24: number[]; // 조직 준비도 (8문항)
    q25_to_q32: number[]; // 기술 인프라 (8문항)
    q33_to_q40: number[]; // 전략 명확성 (8문항)
    q41_to_q45: number[]; // 실행 역량 (5문항)
  };
  
  privacyConsent: {
    dataProcessingConsent: boolean;
    marketingConsent: boolean;
    consentTimestamp: Date;
    ipAddress: string;
    consentVersion: string;
  };
  
  sessionMetadata: {
    sessionId: string;
    startTime: Date;
    completionTime: Date;
    deviceInfo: string;
    browserInfo: string;
    userAgent: string;
    referrer?: string;
  };
}

export enum EmployeeRange {
  UNDER_10 = "10명 이하",
  E11_TO_50 = "11-50명",
  E51_TO_100 = "51-100명",
  E101_TO_300 = "101-300명",
  E301_TO_1000 = "301-1000명",
  OVER_1000 = "1000명 이상"
}

export enum RevenueRange {
  UNDER_100M = "1억 미만",
  R100M_TO_1B = "1-10억",
  R1B_TO_5B = "10-50억",
  R5B_TO_10B = "50-100억",
  R10B_TO_50B = "100-500억",
  OVER_50B = "500억 이상"
}

export enum LocationType {
  SEOUL = "서울",
  GYEONGGI = "경기",
  BUSAN = "부산",
  DAEGU = "대구",
  INCHEON = "인천",
  GWANGJU = "광주",
  DAEJEON = "대전",
  ULSAN = "울산",
  SEJONG = "세종",
  GANGWON = "강원",
  CHUNGBUK = "충북",
  CHUNGNAM = "충남",
  JEONBUK = "전북",
  JEONNAM = "전남",
  GYEONGBUK = "경북",
  GYEONGNAM = "경남",
  JEJU = "제주",
  OTHER = "기타"
}

// ================================================================================
// 📋 PART 3: 분석 결과 데이터 타입
// ================================================================================

export interface AnalysisResult {
  overallScore: {
    total: number;
    categoryScores: CategoryScore[];
    percentile: number;
    maturityLevel: AIMaturityLevel;
    grade: GradeLevel;
  };
  
  industryComparison: {
    industryAverage: number;
    positionInIndustry: number;
    topPerformersGap: number;
    regionalComparison: number;
    benchmarkData: BenchmarkMetrics;
  };
  
  strengthsAndWeaknesses: {
    topStrengths: StrengthArea[];
    keyWeaknesses: WeaknessArea[];
    improvementPriorities: Priority[];
  };
  
  aiReadinessIndex: {
    technicalReadiness: number;
    organizationalReadiness: number;
    strategicReadiness: number;
    overallReadiness: AIReadinessLevel;
  };
  
  recommendedActions: {
    immediate: ActionItem[];
    shortTerm: ActionItem[];
    longTerm: ActionItem[];
  };
  
  industrySpecificInsights: IndustrySpecificAnalysis;
  
  reportMetadata: {
    generatedAt: Date;
    version: string;
    processingTime: number;
    qualityScore: number;
    dataIntegrity: boolean;
  };
}

export interface CategoryScore {
  category: string;
  score: number;
  maxScore: number;
  percentage: number;
  weightedScore: number;
  questionCount: number;
  analysis: CategoryAnalysis;
}

export interface CategoryAnalysis {
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  benchmarkComparison: {
    industryAverage: number;
    gap: number;
    ranking: 'top' | 'above-average' | 'average' | 'below-average' | 'bottom';
  };
}

export enum AIMaturityLevel {
  BEGINNER = "AI 초보 단계",
  DEVELOPING = "AI 개발 단계", 
  ADVANCING = "AI 발전 단계",
  OPTIMIZING = "AI 최적화 단계",
  LEADING = "AI 선도 단계"
}

export enum GradeLevel {
  S = "S",
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  F = "F"
}

export enum AIReadinessLevel {
  NOT_READY = "준비 부족",
  BASIC_READY = "기초 준비",
  WELL_PREPARED = "준비 완료",
  ADVANCED_READY = "고도 준비"
}

export interface StrengthArea {
  category: string;
  score: number;
  description: string;
  examples: string[];
  leverageOpportunities: string[];
}

export interface WeaknessArea {
  category: string;
  score: number;
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  improvementActions: string[];
  timeline: string;
  resources: Resource[];
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 1 | 2 | 3 | 4 | 5;
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high' | 'very-high';
  timeline: string;
  prerequisites: string[];
  resources: Resource[];
  successMetrics: string[];
  risks: string[];
}

// ================================================================================
// 📋 PART 4: 24페이지 보고서 구조 타입
// ================================================================================

export interface ReportStructure {
  pages: ReportPage[];
  metadata: ReportMetadata;
  styling: ReportStyling;
}

export interface ReportPage {
  pageNumber: number;
  title: string;
  content: PageContent;
  visualElements: VisualElement[];
  layout: PageLayout;
}

export interface VisualElement {
  id: string;
  type: 'chart' | 'table' | 'image' | 'infographic' | 'callout' | 'quote';
  position: Position;
  size: Size;
  data: any;
  styling?: ElementStyling;
}

export interface ReportMetadata {
  reportId: string;
  diagnosisId: string;
  title: string;
  subtitle?: string;
  companyName: string;
  industry: IndustryType;
  generatedAt: Date;
  version: string;
  pageCount: number;
  language: 'ko' | 'en';
  format: 'html' | 'pdf';
  qualityScore: number;
  processingTime: number;
  dataIntegrity: boolean;
  author: string;
  reviewer?: string;
  approvalStatus?: 'draft' | 'reviewed' | 'approved' | 'published';
}

export interface ReportStyling {
  theme: 'professional' | 'modern' | 'minimal' | 'corporate';
  colorScheme: ColorScheme;
  typography: Typography;
  layout: LayoutSettings;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  success: string;
  warning: string;
  error: string;
  neutral: string;
}

export interface Typography {
  headingFont: string;
  bodyFont: string;
  codeFont: string;
  baseFontSize: number;
  lineHeight: number;
  headingScale: number[];
}

export interface LayoutSettings {
  maxWidth: number;
  gridColumns: number;
  spacing: number;
  borderRadius: number;
  shadowLevel: number;
}

// ================================================================================
// 📋 PART 5: 분석 엔진 타입
// ================================================================================

export interface AnalysisEngine {
  scoreCalculation: (scores: number[]) => CalculatedScores;
  industryBenchmarking: (industry: IndustryType, scores: CalculatedScores) => BenchmarkResult;
  maturityAssessment: (scores: CalculatedScores) => AIMaturityLevel;
  recommendationEngine: (profile: UserProfile, analysis: AnalysisResult) => Recommendations;
  swotAnalysis: (data: UserInputData, scores: CalculatedScores) => SWOTAnalysis;
  priorityMatrix: (weaknesses: WeaknessArea[], opportunities: string[]) => PriorityMatrix;
  roadmapGeneration: (analysis: AnalysisResult, profile: UserProfile) => RoadmapPlan;
}

export interface CalculatedScores {
  total: number;
  percentage: number;
  categoryScores: CategoryScore[];
  weightedScores: WeightedScore[];
  normalizedScores: NormalizedScore[];
  confidenceLevel: number;
}

export interface WeightedScore {
  category: string;
  rawScore: number;
  weight: number;
  weightedScore: number;
  contribution: number; // percentage of total
}

export interface NormalizedScore {
  category: string;
  score: number;
  industryNormalized: number;
  sizeNormalized: number;
  regionNormalized: number;
}

export interface BenchmarkResult {
  overallRanking: number;
  categoryRankings: CategoryRanking[];
  industryPosition: 'top-10%' | 'top-25%' | 'top-50%' | 'below-average';
  improvementPotential: number;
  competitiveGaps: CompetitiveGap[];
}

export interface CategoryRanking {
  category: string;
  score: number;
  industryAverage: number;
  ranking: number;
  percentile: number;
  gap: number;
}

export interface CompetitiveGap {
  area: string;
  currentLevel: number;
  industryBest: number;
  gap: number;
  closingStrategy: string[];
  timeToClose: string;
  investmentRequired: CostEstimate;
}

export interface UserProfile {
  basicInfo: UserInputData['basicInfo'];
  aiMaturity: AIMaturityLevel;
  industryContext: IndustryContext;
  organizationalContext: OrganizationalContext;
}

export interface IndustryContext {
  type: IndustryType;
  characteristics: string[];
  aiAdoptionTrends: string[];
  keySuccessFactors: string[];
  commonChallenges: string[];
  regulatoryConsiderations: string[];
}

export interface OrganizationalContext {
  size: EmployeeRange;
  structure: 'flat' | 'hierarchical' | 'matrix' | 'network';
  culture: 'traditional' | 'innovative' | 'agile' | 'conservative';
  changeReadiness: number;
  techSavviness: number;
  leadershipSupport: number;
}

export interface Recommendations {
  immediate: ActionItem[];
  shortTerm: ActionItem[];
  longTerm: ActionItem[];
  quickWins: QuickWin[];
  strategicInitiatives: StrategicInitiative[];
}

export interface QuickWin {
  id: string;
  title: string;
  description: string;
  effort: 'low' | 'medium';
  impact: 'medium' | 'high';
  timeframe: string;
  cost: CostEstimate;
  steps: string[];
  successMetrics: string[];
}

export interface StrategicInitiative {
  id: string;
  title: string;
  description: string;
  scope: 'department' | 'division' | 'company-wide';
  timeline: string;
  phases: InitiativePhase[];
  totalInvestment: CostEstimate;
  expectedROI: ROIEstimate;
  riskAssessment: RiskAssessment;
}

export interface InitiativePhase {
  phase: number;
  title: string;
  duration: string;
  objectives: string[];
  deliverables: string[];
  resources: Resource[];
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  criteria: string[];
  dependencies: string[];
}

export interface RiskAssessment {
  technicalRisks: Risk[];
  organizationalRisks: Risk[];
  marketRisks: Risk[];
  financialRisks: Risk[];
  mitigationStrategies: MitigationStrategy[];
}

export interface Risk {
  id: string;
  description: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high' | 'critical';
  category: 'technical' | 'organizational' | 'market' | 'financial';
  mitigationActions: string[];
}

export interface MitigationStrategy {
  riskId: string;
  strategy: string;
  actions: string[];
  timeline: string;
  responsibleParty: string;
  monitoringMetrics: string[];
}

export interface SWOTAnalysis {
  strengths: SWOTItem[];
  weaknesses: SWOTItem[];
  opportunities: SWOTItem[];
  threats: SWOTItem[];
  strategicRecommendations: StrategicRecommendation[];
}

export interface SWOTItem {
  id: string;
  title: string;
  description: string;
  category: string;
  impact: 'low' | 'medium' | 'high';
  evidence: string[];
  actionable: boolean;
}

export interface StrategicRecommendation {
  id: string;
  title: string;
  description: string;
  swotBasis: {
    leverageStrengths: string[];
    addressWeaknesses: string[];
    captureOpportunities: string[];
    mitigateThreats: string[];
  };
  priority: 1 | 2 | 3;
  timeline: string;
  resources: Resource[];
}

export interface PriorityMatrix {
  doFirst: Priority[];      // 긴급하고 중요
  schedule: Priority[];     // 중요하지만 긴급하지 않음
  delegate: Priority[];     // 긴급하지만 중요하지 않음
  eliminate: Priority[];    // 긴급하지도 중요하지도 않음
}

export interface RoadmapPlan {
  phases: RoadmapPhase[];
  timeline: Timeline;
  dependencies: Dependency[];
  resources: ResourcePlan;
  riskManagement: RiskManagementPlan;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  objectives: string[];
  deliverables: Deliverable[];
  successCriteria: string[];
  budget: CostEstimate;
}

export interface Timeline {
  totalDuration: string;
  phases: TimelinePhase[];
  milestones: TimelineMilestone[];
  criticalPath: string[];
}

export interface TimelinePhase {
  phaseId: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  dependencies: string[];
}

export interface TimelineMilestone {
  id: string;
  title: string;
  date: Date;
  description: string;
  deliverables: string[];
  approvalRequired: boolean;
}

export interface Dependency {
  id: string;
  from: string; // phase or task id
  to: string;   // phase or task id
  type: 'finish-to-start' | 'start-to-start' | 'finish-to-finish' | 'start-to-finish';
  lag?: number; // days
}

export interface Deliverable {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'system' | 'training' | 'process' | 'tool';
  owner: string;
  reviewers: string[];
  dueDate: Date;
  acceptanceCriteria: string[];
}

export interface ResourcePlan {
  humanResources: HumanResource[];
  technicalResources: TechnicalResource[];
  financialResources: FinancialResource[];
  externalResources: ExternalResource[];
}

export interface HumanResource {
  role: string;
  skillsRequired: string[];
  effort: number; // person-days
  timeline: string;
  cost: CostEstimate;
  availability: 'internal' | 'external' | 'hybrid';
}

export interface TechnicalResource {
  type: 'hardware' | 'software' | 'infrastructure' | 'platform';
  name: string;
  specifications: string[];
  cost: CostEstimate;
  procurementTime: string;
  maintenanceCost?: CostEstimate;
}

export interface FinancialResource {
  category: string;
  amount: number;
  currency: 'KRW' | 'USD';
  timing: 'upfront' | 'monthly' | 'annual' | 'milestone-based';
  source: 'internal' | 'external' | 'government-support';
}

export interface ExternalResource {
  type: 'consultant' | 'vendor' | 'partner' | 'training-provider';
  name: string;
  services: string[];
  cost: CostEstimate;
  selectionCriteria: string[];
  contractTerms: string[];
}

export interface RiskManagementPlan {
  riskRegister: Risk[];
  mitigationStrategies: MitigationStrategy[];
  contingencyPlans: ContingencyPlan[];
  monitoringPlan: MonitoringPlan;
}

export interface ContingencyPlan {
  triggerId: string;
  scenario: string;
  actions: string[];
  resources: Resource[];
  timeline: string;
  decisionCriteria: string[];
}

export interface MonitoringPlan {
  kpis: KPI[];
  reviewCycles: ReviewCycle[];
  escalationProcedures: EscalationProcedure[];
  reportingStructure: ReportingStructure;
}

export interface KPI {
  id: string;
  name: string;
  description: string;
  metric: string;
  target: number;
  threshold: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  owner: string;
  dataSource: string;
}

export interface ReviewCycle {
  frequency: 'weekly' | 'monthly' | 'quarterly';
  participants: string[];
  agenda: string[];
  deliverables: string[];
  decisionAuthority: string;
}

export interface EscalationProcedure {
  level: number;
  trigger: string;
  responsible: string;
  timeline: string;
  actions: string[];
}

export interface ReportingStructure {
  stakeholders: Stakeholder[];
  reportTypes: ReportType[];
  distributionChannels: string[];
  frequency: string;
}

export interface Stakeholder {
  role: string;
  name: string;
  interests: string[];
  reportingNeeds: string[];
  communicationPreferences: string[];
}

export interface ReportType {
  name: string;
  purpose: string;
  content: string[];
  format: 'dashboard' | 'document' | 'presentation' | 'email';
  audience: string[];
  frequency: string;
}

// ================================================================================
// 📋 PART 6: API 및 서비스 타입
// ================================================================================

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: APIError;
  metadata?: ResponseMetadata;
}

export interface APIError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  requestId: string;
}

export interface ResponseMetadata {
  requestId: string;
  timestamp: Date;
  processingTime: number;
  version: string;
  cached?: boolean;
  rateLimitRemaining?: number;
}

export interface CreateAssessmentRequest {
  basicInfo: UserInputData['basicInfo'];
  assessmentScores: UserInputData['assessmentScores'];
  privacyConsent: UserInputData['privacyConsent'];
  sessionMetadata: UserInputData['sessionMetadata'];
}

export interface GenerateReportRequest {
  assessmentId?: number;
  diagnosisId?: string;
  reportFormat: 'pdf' | 'html';
  language: 'ko' | 'en';
  customizations?: ReportCustomizations;
}

export interface ReportCustomizations {
  includeBenchmarks: boolean;
  includeDetailedAnalysis: boolean;
  includeActionPlans: boolean;
  includeROIAnalysis: boolean;
  includeRiskAssessment: boolean;
  customSections?: CustomSection[];
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
  position: number;
  type: 'text' | 'chart' | 'table' | 'mixed';
}

export interface GetReportStatusResponse {
  reportId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number; // 0-100
  estimatedTimeRemaining?: number; // seconds
  downloadUrl?: string;
  previewUrl?: string;
  errorMessage?: string;
  qualityScore?: number;
}

// ================================================================================
// 📋 PART 7: 업종별 분석 타입
// ================================================================================

export interface IndustryContent {
  industry: IndustryType;
  characteristics: IndustryCharacteristics;
  aiUseCases: AIUseCase[];
  benchmarks: IndustryBenchmarks;
  successStories: SuccessStory[];
  challenges: IndustryChallenges;
  recommendations: IndustryRecommendations;
}

export interface IndustryCharacteristics {
  description: string;
  keyFeatures: string[];
  businessModel: string[];
  valueChain: string[];
  competitiveLandscape: string[];
  regulatoryEnvironment: string[];
}

export interface IndustryBenchmarks {
  aiAdoptionRate: number;
  averageMaturityLevel: AIMaturityLevel;
  topPerformers: TopPerformer[];
  investmentTrends: InvestmentTrend[];
  emergingTechnologies: EmergingTechnology[];
}

export interface TopPerformer {
  companyName: string;
  score: number;
  keySuccessFactors: string[];
  aiImplementations: string[];
  results: string[];
}

export interface InvestmentTrend {
  year: number;
  totalInvestment: number;
  growthRate: number;
  focusAreas: string[];
  averageROI: number;
}

export interface EmergingTechnology {
  name: string;
  description: string;
  maturity: 'experimental' | 'emerging' | 'growing' | 'mature';
  relevanceScore: number;
  adoptionTimeline: string;
  potentialImpact: 'low' | 'medium' | 'high' | 'transformative';
}

export interface SuccessStory {
  id: string;
  companyName: string;
  industry: IndustryType;
  challenge: string;
  solution: string;
  implementation: string[];
  results: SuccessMetrics;
  lessonsLearned: string[];
  applicability: number; // 0-100
}

export interface SuccessMetrics {
  costSavings?: number;
  timeReduction?: number;
  qualityImprovement?: number;
  revenueIncrease?: number;
  customerSatisfaction?: number;
  employeeProductivity?: number;
  other?: Record<string, number>;
}

export interface IndustryChallenges {
  common: Challenge[];
  emerging: Challenge[];
  regulatory: Challenge[];
  competitive: Challenge[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  frequency: 'rare' | 'occasional' | 'common' | 'universal';
  aiSolutions: string[];
  alternativeSolutions: string[];
}

export interface IndustryRecommendations {
  priorityAreas: string[];
  recommendedTools: AIToolRecommendation[];
  implementationSequence: string[];
  successFactors: string[];
  avoidableFailures: string[];
}

// ================================================================================
// 📋 PART 8: 내보내기 및 유틸리티 타입
// ================================================================================

export interface CustomizationEngine {
  industryCustomization: (industry: IndustryType, template: ReportTemplate) => ReportTemplate;
  sizeCustomization: (employeeCount: EmployeeRange, template: ReportTemplate) => ReportTemplate;
  maturityCustomization: (maturity: AIMaturityLevel, template: ReportTemplate) => ReportTemplate;
}

export interface ExportEngine {
  generatePDF: (htmlContent: string, options: PDFOptions) => Promise<Buffer>;
  generateHTML: (data: AnalysisResult, template: ReportTemplate) => Promise<string>;
  generateJSON: (data: AnalysisResult) => Promise<string>;
  generateExcel: (data: AnalysisResult) => Promise<Buffer>;
}

export interface PDFOptions {
  format: 'A4' | 'Letter';
  orientation: 'portrait' | 'landscape';
  margins: Margins;
  headerFooter: boolean;
  pageNumbers: boolean;
  watermark?: string;
  quality: 'draft' | 'standard' | 'high';
}

// 전역 설정 타입
export interface SystemConfiguration {
  version: string;
  environment: 'development' | 'staging' | 'production';
  features: FeatureFlags;
  performance: PerformanceSettings;
  security: SecuritySettings;
  integrations: IntegrationSettings;
}

export interface FeatureFlags {
  advancedAnalysis: boolean;
  industryBenchmarks: boolean;
  realTimeProcessing: boolean;
  aiEnhancedRecommendations: boolean;
  multiLanguageSupport: boolean;
  mobileOptimization: boolean;
}

export interface PerformanceSettings {
  maxConcurrentReports: number;
  reportGenerationTimeout: number;
  cacheExpiration: number;
  rateLimiting: RateLimitSettings;
}

export interface RateLimitSettings {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests: boolean;
  skipFailedRequests: boolean;
}

export interface SecuritySettings {
  encryption: EncryptionSettings;
  authentication: AuthenticationSettings;
  dataRetention: DataRetentionSettings;
}

export interface EncryptionSettings {
  algorithm: string;
  keyRotation: number; // days
  atRestEncryption: boolean;
  inTransitEncryption: boolean;
}

export interface AuthenticationSettings {
  sessionTimeout: number; // minutes
  maxLoginAttempts: number;
  passwordPolicy: PasswordPolicy;
  twoFactorRequired: boolean;
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  historyLength: number;
}

export interface DataRetentionSettings {
  personalDataRetention: number; // days
  analyticsDataRetention: number; // days
  logRetention: number; // days
  backupRetention: number; // days
}

export interface IntegrationSettings {
  googleDrive: GoogleDriveSettings;
  emailService: EmailServiceSettings;
  analyticsService: AnalyticsSettings;
  monitoringService: MonitoringSettings;
}

export interface GoogleDriveSettings {
  enabled: boolean;
  folderId: string;
  serviceAccountEmail: string;
  maxFileSize: number; // MB
  allowedFileTypes: string[];
}

export interface EmailServiceSettings {
  provider: 'gmail' | 'sendgrid' | 'ses' | 'custom';
  fromAddress: string;
  fromName: string;
  templates: EmailTemplate[];
  rateLimiting: RateLimitSettings;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  variables: string[];
}

export interface AnalyticsSettings {
  enabled: boolean;
  provider: 'google-analytics' | 'mixpanel' | 'amplitude' | 'custom';
  trackingId: string;
  events: AnalyticsEvent[];
}

export interface AnalyticsEvent {
  name: string;
  category: string;
  parameters: string[];
  autoTrack: boolean;
}

export interface MonitoringSettings {
  enabled: boolean;
  alerting: AlertingSettings;
  logging: LoggingSettings;
  metrics: MetricsSettings;
}

export interface AlertingSettings {
  channels: AlertChannel[];
  rules: AlertRule[];
  escalation: EscalationRule[];
}

export interface AlertChannel {
  type: 'email' | 'slack' | 'sms' | 'webhook';
  endpoint: string;
  enabled: boolean;
}

export interface AlertRule {
  id: string;
  name: string;
  condition: string;
  threshold: number;
  severity: 'info' | 'warning' | 'error' | 'critical';
  channels: string[];
}

export interface EscalationRule {
  alertRuleId: string;
  delayMinutes: number;
  escalateTo: string[];
  condition: string;
}

export interface LoggingSettings {
  level: 'debug' | 'info' | 'warn' | 'error';
  retention: number; // days
  structured: boolean;
  sensitiveDataMasking: boolean;
}

export interface MetricsSettings {
  enabled: boolean;
  collection: MetricsCollection;
  dashboard: DashboardSettings;
}

export interface MetricsCollection {
  performance: boolean;
  business: boolean;
  technical: boolean;
  user: boolean;
}

export interface DashboardSettings {
  enabled: boolean;
  refreshInterval: number; // seconds
  widgets: DashboardWidget[];
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'table' | 'alert';
  query: string;
  position: Position;
  size: Size;
}
