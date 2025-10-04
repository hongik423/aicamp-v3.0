// 투자 입력 인터페이스
export interface InvestmentInput {
  // 기본 투자 정보
  initialInvestment: number;        // 초기 투자금 (원)
  policyFundAmount: number;         // 정책자금 규모 (원)
  annualRevenue: number;            // 연간 매출 (원)
  operatingProfitRate: number;      // 영업이익률 (%)
  discountRate: number;             // 할인율 (%)
  analysisYears: number;            // 분석 기간 (년)
  
  // 대출 조건
  policyLoanAmount: number;         // 정책자금 대출액
  policyLoanRate: number;           // 정책자금 이자율
  gracePeriod: number;              // 거치기간
  repaymentPeriod: number;          // 원금상환기간
  
  // 기타 채무
  otherDebtAmount: number;          // 기타채무액
  otherDebtRate: number;            // 기타채무 이자율
  otherDebtGracePeriod: number;     // 기타채무 거치기간
  otherDebtRepaymentPeriod: number; // 기타채무 상환기간
  
  // 고급 설정
  revenueGrowthRate: number;        // 매출성장률
  costInflationRate: number;        // 비용상승률
  taxRate: number;                  // 법인세율
  scenarioType: 'pessimistic' | 'neutral' | 'optimistic';
}

// 현금흐름 데이터
export interface CashFlow {
  year: number;
  revenue: number;
  operatingCost: number;
  ebit: number;
  tax: number;
  netIncome: number;
  depreciation: number;
  loanPrincipal: number;
  loanInterest: number;
  netCashFlow: number;
  cumulativeCashFlow: number;
  presentValue: number;
  cumulativePV: number;
  operatingProfitRate: number;
  roic: number;
  fcf: number;
  discountedFCF: number;
}

// DSCR 상세 데이터
export interface DSCRDetailedData {
  year: number;
  revenue: number;
  operatingProfit: number;
  policyLoanPrincipal: number;
  policyLoanInterest: number;
  remainingPolicyLoan: number;
  otherDebtPrincipal: number;
  otherDebtInterest: number;
  remainingOtherDebt: number;
  totalDebtService: number;
  dscr: number;
  isGracePeriod: boolean;
  isRepaymentPeriod: boolean;
  isPostRepayment: boolean;
  scenarioType: string;
  scenarioAdjustment: number;
}

// 투자 결과 타입
export interface InvestmentResult {
  npv: number;
  irr: number;
  paybackPeriod: number;
  simplePaybackPeriod: number;
  breakEvenPoint: number;
  dscr: number[];
  roi: number;
  profitabilityIndex: number;
  cashFlows: CashFlow[];
  
  // 고급 지표
  averageROI: number;
  cumulativeROI: number;
  riskAdjustedReturn: number;
  marketValueAdded: number;
  economicValueAdded: number;
  
  // 상세 데이터
  npvDetails?: NPVDetailedCalculation;
  dscrData?: DSCRDetailedData[];
}

// NPV 상세 계산
export interface NPVDetailedCalculation {
  totalInvestment: number;
  totalCashInflows: number;
  totalPresentValue: number;
  netPresentValue: number;
  yearlyPresentValues: number[];
  discountFactors: number[];
}

// 투자 규모 정보
export interface InvestmentScaleInfo {
  scale: 'mega' | 'large' | 'medium' | 'small' | 'micro';
  riskPremium: number;
  description: string;
  minIRR: number;
  minDSCR: number;
  maxPayback: number;
}

// 투자 등급 타입
export interface InvestmentGrade {
  grade: string;
  score: number;
  recommendation: string;
  color: string;
  bgColor: string;
  borderColor: string;
  gradeDesc: string;
  details: {
    npvScore: number;
    irrScore: number;
    dscrScore: number;
    paybackScore: number;
  };
  investmentScale: 'mega' | 'large' | 'medium' | 'small' | 'micro';
  riskPremium: number;
  adjustedScore: number;
}

// 지표 분석
export interface MetricAnalysis {
  score: number;
  analysis: string;
  recommendation: string;
}

// AI 평가 타입
export interface AIEvaluation {
  overallGrade: InvestmentGrade;
  metrics: {
    npv: MetricAnalysis;
    irr: MetricAnalysis;
    dscr: MetricAnalysis;
    payback: MetricAnalysis;
    profitability: MetricAnalysis;
    stability: MetricAnalysis;
    growth: MetricAnalysis;
    risk: MetricAnalysis;
  };
  confidence: number;
  recommendation: string;
  scaleAnalysis: InvestmentScaleInfo;
  timestamp: string;
}

// 대출 상환 정보
export interface DebtPayment {
  principal: number;
  interest: number;
  remainingBalance: number;
}

// 점수 범위
export interface ScoreRange {
  min: number;
  max: number;
  score: number;
  label: string;
}

// 등급 기준
export interface GradingCriteria {
  npv: {
    weight: number;
    ranges: ScoreRange[];
  };
  irr: {
    weight: number;
    ranges: ScoreRange[];
  };
  dscr: {
    weight: number;
    ranges: ScoreRange[];
  };
  payback: {
    weight: number;
    ranges: ScoreRange[];
  };
}

// NPV 임계값
export interface NPVThresholds {
  excellent: number;
  good: number;
  fair: number;
  poor: number;
}

// 성과 지표
export interface PerformanceMetric {
  value: number;
  unit: string;
  trend?: string;
  icon: string;
}

// AI 기능
export interface AIFeature {
  title: string;
  description: string;
  icon: string;
}

// 차트 데이터
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    tension?: number;
  }[];
} 