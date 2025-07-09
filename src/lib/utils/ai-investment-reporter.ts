import {
  InvestmentResult,
  InvestmentInput,
  InvestmentGrade,
  InvestmentScaleInfo,
  AIEvaluation,
  MetricAnalysis,
  NPVThresholds
} from '@/types/investment.types';
import { 
  getInvestmentScaleInfo, 
  calculateInvestmentGrade,
  getNPVThresholds,
  getDynamicGradingCriteria
} from './investment-grade';
import { calculateAverageDSCR } from './investment-analysis';

// NPV 지표 분석
function analyzeNPVMetric(npv: number, scaleInfo: InvestmentScaleInfo): MetricAnalysis {
  const npvInBillion = npv / 100000000;
  
  let score = 0;
  let analysis = '';
  let recommendation = '';
  
  // 투자규모별 NPV 기준 적용
  const thresholds = getNPVThresholds(scaleInfo.scale);
  
  if (npvInBillion >= thresholds.excellent) {
    score = 100;
    analysis = `NPV ${npvInBillion.toFixed(1)}억원으로 ${scaleInfo.description} 대비 탁월한 수준`;
    recommendation = '즉시 투자 실행 권장';
  } else if (npvInBillion >= thresholds.good) {
    score = 80;
    analysis = `NPV ${npvInBillion.toFixed(1)}억원으로 ${scaleInfo.description} 대비 양호한 수준`;
    recommendation = '투자 실행 권장';
  } else if (npvInBillion >= thresholds.fair) {
    score = 60;
    analysis = `NPV ${npvInBillion.toFixed(1)}억원으로 ${scaleInfo.description} 대비 보통 수준`;
    recommendation = '신중한 검토 후 투자 고려';
  } else if (npvInBillion >= thresholds.poor) {
    score = 40;
    analysis = `NPV ${npvInBillion.toFixed(1)}억원으로 ${scaleInfo.description} 대비 미흡한 수준`;
    recommendation = '투자 계획 재검토 필요';
  } else {
    score = 20;
    analysis = `NPV ${npvInBillion.toFixed(1)}억원으로 마이너스 수익 예상`;
    recommendation = '투자 중단 권고';
  }
  
  return { score, analysis, recommendation };
}

// IRR 지표 분석
function analyzeIRRMetric(irr: number, scaleInfo: InvestmentScaleInfo): MetricAnalysis {
  let score = 0;
  let analysis = '';
  let recommendation = '';
  
  if (irr >= scaleInfo.minIRR * 1.5) {
    score = 100;
    analysis = `IRR ${irr.toFixed(1)}%로 ${scaleInfo.description} 요구수익률 대비 매우 우수`;
    recommendation = '높은 수익성 확보, 적극 투자 권장';
  } else if (irr >= scaleInfo.minIRR * 1.2) {
    score = 80;
    analysis = `IRR ${irr.toFixed(1)}%로 ${scaleInfo.description} 요구수익률 상회`;
    recommendation = '양호한 수익성, 투자 권장';
  } else if (irr >= scaleInfo.minIRR) {
    score = 60;
    analysis = `IRR ${irr.toFixed(1)}%로 ${scaleInfo.description} 요구수익률 충족`;
    recommendation = '적정 수익성, 조건부 투자 가능';
  } else if (irr >= scaleInfo.minIRR * 0.7) {
    score = 40;
    analysis = `IRR ${irr.toFixed(1)}%로 ${scaleInfo.description} 요구수익률 미달`;
    recommendation = '수익성 개선 방안 마련 필요';
  } else {
    score = 20;
    analysis = `IRR ${irr.toFixed(1)}%로 수익성 매우 부족`;
    recommendation = '투자 재검토 필요';
  }
  
  return { score, analysis, recommendation };
}

// DSCR 지표 분석
function analyzeDSCRMetric(avgDSCR: number, scaleInfo: InvestmentScaleInfo): MetricAnalysis {
  let score = 0;
  let analysis = '';
  let recommendation = '';
  
  if (avgDSCR >= scaleInfo.minDSCR * 1.3) {
    score = 100;
    analysis = `평균 DSCR ${avgDSCR.toFixed(2)}로 매우 안정적인 상환능력`;
    recommendation = '부채상환 리스크 매우 낮음';
  } else if (avgDSCR >= scaleInfo.minDSCR) {
    score = 80;
    analysis = `평균 DSCR ${avgDSCR.toFixed(2)}로 양호한 상환능력`;
    recommendation = '부채상환 리스크 낮음';
  } else if (avgDSCR >= scaleInfo.minDSCR * 0.8) {
    score = 60;
    analysis = `평균 DSCR ${avgDSCR.toFixed(2)}로 보통 수준의 상환능력`;
    recommendation = '부채상환 리스크 관리 필요';
  } else if (avgDSCR >= 1.0) {
    score = 40;
    analysis = `평균 DSCR ${avgDSCR.toFixed(2)}로 최소 상환능력 확보`;
    recommendation = '부채상환 리스크 주의 필요';
  } else {
    score = 20;
    analysis = `평균 DSCR ${avgDSCR.toFixed(2)}로 상환능력 부족`;
    recommendation = '부채구조 개선 필수';
  }
  
  return { score, analysis, recommendation };
}

// 회수기간 지표 분석
function analyzePaybackMetric(payback: number, scaleInfo: InvestmentScaleInfo): MetricAnalysis {
  let score = 0;
  let analysis = '';
  let recommendation = '';
  
  if (payback <= scaleInfo.maxPayback * 0.7) {
    score = 100;
    analysis = `회수기간 ${payback.toFixed(1)}년으로 매우 빠른 투자금 회수`;
    recommendation = '유동성 리스크 매우 낮음';
  } else if (payback <= scaleInfo.maxPayback) {
    score = 80;
    analysis = `회수기간 ${payback.toFixed(1)}년으로 적정 수준`;
    recommendation = '유동성 리스크 낮음';
  } else if (payback <= scaleInfo.maxPayback * 1.3) {
    score = 60;
    analysis = `회수기간 ${payback.toFixed(1)}년으로 다소 긴 편`;
    recommendation = '유동성 리스크 관리 필요';
  } else if (payback <= scaleInfo.maxPayback * 1.5) {
    score = 40;
    analysis = `회수기간 ${payback.toFixed(1)}년으로 장기간 소요`;
    recommendation = '유동성 리스크 높음';
  } else {
    score = 20;
    analysis = `회수기간 ${payback.toFixed(1)}년으로 과도하게 장기간`;
    recommendation = '투자 재검토 필요';
  }
  
  return { score, analysis, recommendation };
}

// 수익성 지표 분석
function analyzeProfitabilityMetric(result: InvestmentResult, input: InvestmentInput): MetricAnalysis {
  const profitabilityIndex = result.profitabilityIndex;
  let score = 0;
  let analysis = '';
  let recommendation = '';
  
  if (profitabilityIndex >= 1.5) {
    score = 100;
    analysis = `수익성 지수 ${profitabilityIndex.toFixed(2)}로 매우 우수한 투자 효율성`;
    recommendation = '투자 대비 수익성 매우 높음';
  } else if (profitabilityIndex >= 1.3) {
    score = 80;
    analysis = `수익성 지수 ${profitabilityIndex.toFixed(2)}로 우수한 투자 효율성`;
    recommendation = '투자 대비 수익성 높음';
  } else if (profitabilityIndex >= 1.1) {
    score = 60;
    analysis = `수익성 지수 ${profitabilityIndex.toFixed(2)}로 양호한 투자 효율성`;
    recommendation = '투자 대비 적정 수익';
  } else if (profitabilityIndex >= 1.0) {
    score = 40;
    analysis = `수익성 지수 ${profitabilityIndex.toFixed(2)}로 최소 수익성 확보`;
    recommendation = '수익성 개선 여지 있음';
  } else {
    score = 20;
    analysis = `수익성 지수 ${profitabilityIndex.toFixed(2)}로 수익성 부족`;
    recommendation = '투자 타당성 재검토 필요';
  }
  
  return { score, analysis, recommendation };
}

// 안정성 지표 분석
function analyzeStabilityMetric(result: InvestmentResult, input: InvestmentInput): MetricAnalysis {
  // 부채비율 계산
  const debtRatio = (input.policyLoanAmount + input.otherDebtAmount) / input.initialInvestment;
  const avgDSCR = calculateAverageDSCR(result);
  
  let score = 0;
  let analysis = '';
  let recommendation = '';
  
  if (debtRatio <= 0.3 && avgDSCR >= 2.0) {
    score = 100;
    analysis = `부채비율 ${(debtRatio * 100).toFixed(0)}%로 매우 안정적인 재무구조`;
    recommendation = '재무 안정성 매우 우수';
  } else if (debtRatio <= 0.5 && avgDSCR >= 1.5) {
    score = 80;
    analysis = `부채비율 ${(debtRatio * 100).toFixed(0)}%로 안정적인 재무구조`;
    recommendation = '재무 안정성 우수';
  } else if (debtRatio <= 0.7 && avgDSCR >= 1.2) {
    score = 60;
    analysis = `부채비율 ${(debtRatio * 100).toFixed(0)}%로 보통 수준의 재무구조`;
    recommendation = '재무 안정성 관리 필요';
  } else if (debtRatio <= 1.0 && avgDSCR >= 1.0) {
    score = 40;
    analysis = `부채비율 ${(debtRatio * 100).toFixed(0)}%로 다소 높은 부채 의존도`;
    recommendation = '재무구조 개선 필요';
  } else {
    score = 20;
    analysis = `부채비율 ${(debtRatio * 100).toFixed(0)}%로 과도한 부채 의존`;
    recommendation = '재무구조 대폭 개선 필요';
  }
  
  return { score, analysis, recommendation };
}

// 성장성 지표 분석
function analyzeGrowthMetric(result: InvestmentResult, input: InvestmentInput): MetricAnalysis {
  const revenueGrowth = input.revenueGrowthRate;
  const avgROI = result.averageROI;
  
  let score = 0;
  let analysis = '';
  let recommendation = '';
  
  if (revenueGrowth >= 15 && avgROI >= 20) {
    score = 100;
    analysis = `매출성장률 ${revenueGrowth}%, 평균 ROI ${avgROI.toFixed(1)}%로 높은 성장 잠재력`;
    recommendation = '지속 성장 가능성 매우 높음';
  } else if (revenueGrowth >= 10 && avgROI >= 15) {
    score = 80;
    analysis = `매출성장률 ${revenueGrowth}%, 평균 ROI ${avgROI.toFixed(1)}%로 양호한 성장 전망`;
    recommendation = '안정적 성장 예상';
  } else if (revenueGrowth >= 5 && avgROI >= 10) {
    score = 60;
    analysis = `매출성장률 ${revenueGrowth}%, 평균 ROI ${avgROI.toFixed(1)}%로 적정 성장 수준`;
    recommendation = '점진적 성장 가능';
  } else if (revenueGrowth >= 0 && avgROI >= 5) {
    score = 40;
    analysis = `매출성장률 ${revenueGrowth}%, 평균 ROI ${avgROI.toFixed(1)}%로 제한적 성장`;
    recommendation = '성장 전략 재검토 필요';
  } else {
    score = 20;
    analysis = `매출성장률 ${revenueGrowth}%, 평균 ROI ${avgROI.toFixed(1)}%로 성장성 부족`;
    recommendation = '성장 동력 확보 필요';
  }
  
  return { score, analysis, recommendation };
}

// 위험도 지표 분석
function analyzeRiskMetric(
  result: InvestmentResult, 
  input: InvestmentInput, 
  scaleInfo: InvestmentScaleInfo
): MetricAnalysis {
  // 종합 위험도 평가
  const npvRisk = result.npv < 0 ? 40 : 0;
  const irrRisk = result.irr < scaleInfo.minIRR ? 30 : 0;
  const dscrRisk = calculateAverageDSCR(result) < 1.2 ? 30 : 0;
  
  const totalRisk = npvRisk + irrRisk + dscrRisk;
  
  let score = 0;
  let analysis = '';
  let recommendation = '';
  
  if (totalRisk <= 10) {
    score = 100;
    analysis = '투자 위험도 매우 낮음';
    recommendation = '안전한 투자안';
  } else if (totalRisk <= 30) {
    score = 80;
    analysis = '투자 위험도 낮음';
    recommendation = '적정 수준의 위험';
  } else if (totalRisk <= 50) {
    score = 60;
    analysis = '투자 위험도 보통';
    recommendation = '위험 관리 필요';
  } else if (totalRisk <= 70) {
    score = 40;
    analysis = '투자 위험도 높음';
    recommendation = '위험 완화 전략 필요';
  } else {
    score = 20;
    analysis = '투자 위험도 매우 높음';
    recommendation = '투자 재검토 권고';
  }
  
  return { score, analysis, recommendation };
}

// 신뢰도 계산
function calculateConfidence(
  metrics: any,
  grade: InvestmentGrade
): number {
  // 각 지표의 점수를 가중 평균하여 신뢰도 계산
  const scores = [
    metrics.npv.score,
    metrics.irr.score,
    metrics.dscr.score,
    metrics.payback.score,
    metrics.profitability.score,
    metrics.stability.score,
    metrics.growth.score,
    metrics.risk.score
  ];
  
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  
  // 등급에 따른 보정
  let gradeBonus = 0;
  if (grade.grade === 'AA') gradeBonus = 10;
  else if (grade.grade === 'A') gradeBonus = 5;
  else if (grade.grade === 'B') gradeBonus = 0;
  else if (grade.grade === 'C') gradeBonus = -5;
  else if (grade.grade === 'D') gradeBonus = -10;
  
  return Math.max(0, Math.min(100, avgScore + gradeBonus));
}

// AI 추천 생성
function generateAIRecommendation(
  grade: InvestmentGrade,
  metrics: any,
  scaleInfo: InvestmentScaleInfo
): string {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const actions: string[] = [];
  
  // 강점 분석
  if (metrics.npv.score >= 80) strengths.push('높은 순현재가치');
  if (metrics.irr.score >= 80) strengths.push('우수한 내부수익률');
  if (metrics.dscr.score >= 80) strengths.push('안정적인 부채상환능력');
  if (metrics.payback.score >= 80) strengths.push('빠른 투자금 회수');
  
  // 약점 분석
  if (metrics.npv.score < 60) weaknesses.push('낮은 순현재가치');
  if (metrics.irr.score < 60) weaknesses.push('부족한 수익률');
  if (metrics.dscr.score < 60) weaknesses.push('부채상환 리스크');
  if (metrics.payback.score < 60) weaknesses.push('긴 회수기간');
  
  // 액션 아이템
  if (grade.grade === 'AA' || grade.grade === 'A') {
    actions.push('즉시 투자 실행 권장');
    actions.push('정책자금 신청 절차 진행');
  } else if (grade.grade === 'B') {
    actions.push('조건부 투자 검토');
    actions.push('리스크 완화 방안 수립');
  } else {
    actions.push('투자 계획 재검토');
    actions.push('사업 모델 개선 필요');
  }
  
  let recommendation = `【${scaleInfo.description} 투자 종합 평가】\n\n`;
  recommendation += `✅ 투자 등급: ${grade.grade} (${grade.gradeDesc})\n`;
  recommendation += `✅ 종합 점수: ${grade.score.toFixed(1)}점 (리스크 조정: ${grade.adjustedScore.toFixed(1)}점)\n\n`;
  
  if (strengths.length > 0) {
    recommendation += `💪 강점:\n`;
    strengths.forEach(s => recommendation += `• ${s}\n`);
    recommendation += '\n';
  }
  
  if (weaknesses.length > 0) {
    recommendation += `⚠️ 개선 필요사항:\n`;
    weaknesses.forEach(w => recommendation += `• ${w}\n`);
    recommendation += '\n';
  }
  
  recommendation += `📋 권장 조치사항:\n`;
  actions.forEach(a => recommendation += `• ${a}\n`);
  
  return recommendation;
}

// AI 종합 투자 평가 생성
export function generateAIInvestmentEvaluation(
  result: InvestmentResult, 
  input: InvestmentInput
): AIEvaluation {
  const scaleInfo = getInvestmentScaleInfo(input.initialInvestment);
  const grade = calculateInvestmentGrade(result, input.initialInvestment);
  
  // 8개 핵심 지표 분석
  const metrics = {
    npv: analyzeNPVMetric(result.npv, scaleInfo),
    irr: analyzeIRRMetric(result.irr, scaleInfo),
    dscr: analyzeDSCRMetric(calculateAverageDSCR(result), scaleInfo),
    payback: analyzePaybackMetric(result.paybackPeriod, scaleInfo),
    profitability: analyzeProfitabilityMetric(result, input),
    stability: analyzeStabilityMetric(result, input),
    growth: analyzeGrowthMetric(result, input),
    risk: analyzeRiskMetric(result, input, scaleInfo)
  };
  
  // 종합 신뢰도 계산
  const confidence = calculateConfidence(metrics, grade);
  
  // AI 추천 생성
  const recommendation = generateAIRecommendation(grade, metrics, scaleInfo);
  
  return {
    overallGrade: grade,
    metrics,
    confidence,
    recommendation,
    scaleAnalysis: scaleInfo,
    timestamp: new Date().toISOString()
  };
} 