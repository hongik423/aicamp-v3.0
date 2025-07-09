import {
  InvestmentResult,
  InvestmentGrade,
  InvestmentScaleInfo,
  ScoreRange,
  GradingCriteria,
  NPVThresholds
} from '@/types/investment.types';

// 투자 규모 분류
export function getInvestmentScaleInfo(initialInvestment: number): InvestmentScaleInfo {
  const investmentInBillion = initialInvestment / 100000000; // 억원 단위로 변환
  
  if (investmentInBillion >= 100) {
    return {
      scale: 'mega',
      riskPremium: 0.18,
      description: '메가 투자 (100억원 이상)',
      minIRR: 20,
      minDSCR: 3.0,
      maxPayback: 3.5
    };
  } else if (investmentInBillion >= 75) {
    return {
      scale: 'large',
      riskPremium: 0.15,
      description: '대규모 투자 (75-100억원)',
      minIRR: 18,
      minDSCR: 2.5,
      maxPayback: 4
    };
  } else if (investmentInBillion >= 50) {
    return {
      scale: 'medium',
      riskPremium: 0.12,
      description: '중규모 투자 (50-75억원)',
      minIRR: 15,
      minDSCR: 2.0,
      maxPayback: 5
    };
  } else if (investmentInBillion >= 25) {
    return {
      scale: 'small',
      riskPremium: 0.08,
      description: '소규모 투자 (25-50억원)',
      minIRR: 12,
      minDSCR: 1.5,
      maxPayback: 6
    };
  } else {
    return {
      scale: 'micro',
      riskPremium: 0.05,
      description: '마이크로 투자 (25억원 미만)',
      minIRR: 10,
      minDSCR: 1.25,
      maxPayback: 8
    };
  }
}

// NPV 임계값 가져오기
export function getNPVThresholds(scale: string): NPVThresholds {
  const thresholds: Record<string, NPVThresholds> = {
    mega: { excellent: 50, good: 30, fair: 15, poor: 0 },
    large: { excellent: 30, good: 20, fair: 10, poor: 0 },
    medium: { excellent: 20, good: 12, fair: 6, poor: 0 },
    small: { excellent: 10, good: 6, fair: 3, poor: 0 },
    micro: { excellent: 5, good: 3, fair: 1, poor: 0 }
  };
  
  return thresholds[scale] || thresholds.micro;
}

// 투자규모별 NPV 범위
function getScaleSpecificNPVRanges(scale: string): ScoreRange[] {
  const thresholds = getNPVThresholds(scale);
  
  return [
    { min: thresholds.excellent, max: Infinity, score: 100, label: '탁월' },
    { min: thresholds.good, max: thresholds.excellent, score: 80, label: '우수' },
    { min: thresholds.fair, max: thresholds.good, score: 60, label: '양호' },
    { min: thresholds.poor, max: thresholds.fair, score: 40, label: '보통' },
    { min: -Infinity, max: thresholds.poor, score: 20, label: '미흡' }
  ];
}

// 투자규모별 IRR 범위
function getScaleSpecificIRRRanges(scale: string): ScoreRange[] {
  const baseRanges: Record<string, ScoreRange[]> = {
    mega: [
      { min: 25, max: Infinity, score: 100, label: '탁월' },
      { min: 20, max: 25, score: 80, label: '우수' },
      { min: 15, max: 20, score: 60, label: '양호' },
      { min: 10, max: 15, score: 40, label: '보통' },
      { min: -Infinity, max: 10, score: 20, label: '미흡' }
    ],
    large: [
      { min: 22, max: Infinity, score: 100, label: '탁월' },
      { min: 18, max: 22, score: 80, label: '우수' },
      { min: 14, max: 18, score: 60, label: '양호' },
      { min: 10, max: 14, score: 40, label: '보통' },
      { min: -Infinity, max: 10, score: 20, label: '미흡' }
    ],
    medium: [
      { min: 20, max: Infinity, score: 100, label: '탁월' },
      { min: 15, max: 20, score: 80, label: '우수' },
      { min: 12, max: 15, score: 60, label: '양호' },
      { min: 8, max: 12, score: 40, label: '보통' },
      { min: -Infinity, max: 8, score: 20, label: '미흡' }
    ],
    small: [
      { min: 18, max: Infinity, score: 100, label: '탁월' },
      { min: 14, max: 18, score: 80, label: '우수' },
      { min: 10, max: 14, score: 60, label: '양호' },
      { min: 6, max: 10, score: 40, label: '보통' },
      { min: -Infinity, max: 6, score: 20, label: '미흡' }
    ],
    micro: [
      { min: 15, max: Infinity, score: 100, label: '탁월' },
      { min: 12, max: 15, score: 80, label: '우수' },
      { min: 8, max: 12, score: 60, label: '양호' },
      { min: 4, max: 8, score: 40, label: '보통' },
      { min: -Infinity, max: 4, score: 20, label: '미흡' }
    ]
  };
  
  return baseRanges[scale] || baseRanges.micro;
}

// 투자규모별 DSCR 범위
function getScaleSpecificDSCRRanges(scale: string): ScoreRange[] {
  const baseRanges: Record<string, ScoreRange[]> = {
    mega: [
      { min: 3.5, max: Infinity, score: 100, label: '탁월' },
      { min: 3.0, max: 3.5, score: 80, label: '우수' },
      { min: 2.5, max: 3.0, score: 60, label: '양호' },
      { min: 2.0, max: 2.5, score: 40, label: '보통' },
      { min: -Infinity, max: 2.0, score: 20, label: '미흡' }
    ],
    large: [
      { min: 3.0, max: Infinity, score: 100, label: '탁월' },
      { min: 2.5, max: 3.0, score: 80, label: '우수' },
      { min: 2.0, max: 2.5, score: 60, label: '양호' },
      { min: 1.5, max: 2.0, score: 40, label: '보통' },
      { min: -Infinity, max: 1.5, score: 20, label: '미흡' }
    ],
    medium: [
      { min: 2.5, max: Infinity, score: 100, label: '탁월' },
      { min: 2.0, max: 2.5, score: 80, label: '우수' },
      { min: 1.7, max: 2.0, score: 60, label: '양호' },
      { min: 1.3, max: 1.7, score: 40, label: '보통' },
      { min: -Infinity, max: 1.3, score: 20, label: '미흡' }
    ],
    small: [
      { min: 2.0, max: Infinity, score: 100, label: '탁월' },
      { min: 1.7, max: 2.0, score: 80, label: '우수' },
      { min: 1.4, max: 1.7, score: 60, label: '양호' },
      { min: 1.1, max: 1.4, score: 40, label: '보통' },
      { min: -Infinity, max: 1.1, score: 20, label: '미흡' }
    ],
    micro: [
      { min: 1.5, max: Infinity, score: 100, label: '탁월' },
      { min: 1.3, max: 1.5, score: 80, label: '우수' },
      { min: 1.1, max: 1.3, score: 60, label: '양호' },
      { min: 0.9, max: 1.1, score: 40, label: '보통' },
      { min: -Infinity, max: 0.9, score: 20, label: '미흡' }
    ]
  };
  
  return baseRanges[scale] || baseRanges.micro;
}

// 투자규모별 회수기간 범위
function getScaleSpecificPaybackRanges(scale: string): ScoreRange[] {
  const baseRanges: Record<string, ScoreRange[]> = {
    mega: [
      { min: -Infinity, max: 3, score: 100, label: '탁월' },
      { min: 3, max: 3.5, score: 80, label: '우수' },
      { min: 3.5, max: 4, score: 60, label: '양호' },
      { min: 4, max: 5, score: 40, label: '보통' },
      { min: 5, max: Infinity, score: 20, label: '미흡' }
    ],
    large: [
      { min: -Infinity, max: 3.5, score: 100, label: '탁월' },
      { min: 3.5, max: 4, score: 80, label: '우수' },
      { min: 4, max: 5, score: 60, label: '양호' },
      { min: 5, max: 6, score: 40, label: '보통' },
      { min: 6, max: Infinity, score: 20, label: '미흡' }
    ],
    medium: [
      { min: -Infinity, max: 4, score: 100, label: '탁월' },
      { min: 4, max: 5, score: 80, label: '우수' },
      { min: 5, max: 6, score: 60, label: '양호' },
      { min: 6, max: 7, score: 40, label: '보통' },
      { min: 7, max: Infinity, score: 20, label: '미흡' }
    ],
    small: [
      { min: -Infinity, max: 4.5, score: 100, label: '탁월' },
      { min: 4.5, max: 5.5, score: 80, label: '우수' },
      { min: 5.5, max: 6.5, score: 60, label: '양호' },
      { min: 6.5, max: 8, score: 40, label: '보통' },
      { min: 8, max: Infinity, score: 20, label: '미흡' }
    ],
    micro: [
      { min: -Infinity, max: 5, score: 100, label: '탁월' },
      { min: 5, max: 6, score: 80, label: '우수' },
      { min: 6, max: 7, score: 60, label: '양호' },
      { min: 7, max: 9, score: 40, label: '보통' },
      { min: 9, max: Infinity, score: 20, label: '미흡' }
    ]
  };
  
  return baseRanges[scale] || baseRanges.micro;
}

// 동적 점수 구간 생성
export function getDynamicGradingCriteria(scale: string): GradingCriteria {
  const baseWeight = { npv: 30, irr: 25, dscr: 25, payback: 20 };
  
  const scaleAdjustment: Record<string, any> = {
    mega: { npv: 1.3, irr: 1.2, dscr: 1.4, payback: 0.9 },
    large: { npv: 1.2, irr: 1.1, dscr: 1.3, payback: 1.0 },
    medium: { npv: 1.0, irr: 1.0, dscr: 1.0, payback: 1.0 },
    small: { npv: 0.8, irr: 1.2, dscr: 0.9, payback: 1.1 },
    micro: { npv: 0.7, irr: 1.3, dscr: 0.8, payback: 1.2 }
  };
  
  const adjustment = scaleAdjustment[scale] || scaleAdjustment.micro;
  
  // 가중치 정규화
  const rawWeights = {
    npv: baseWeight.npv * adjustment.npv,
    irr: baseWeight.irr * adjustment.irr,
    dscr: baseWeight.dscr * adjustment.dscr,
    payback: baseWeight.payback * adjustment.payback
  };
  
  const totalWeight = Object.values(rawWeights).reduce((a, b) => a + b, 0);
  
  return {
    npv: {
      weight: Math.round((rawWeights.npv / totalWeight) * 100),
      ranges: getScaleSpecificNPVRanges(scale)
    },
    irr: {
      weight: Math.round((rawWeights.irr / totalWeight) * 100),
      ranges: getScaleSpecificIRRRanges(scale)
    },
    dscr: {
      weight: Math.round((rawWeights.dscr / totalWeight) * 100),
      ranges: getScaleSpecificDSCRRanges(scale)
    },
    payback: {
      weight: Math.round((rawWeights.payback / totalWeight) * 100),
      ranges: getScaleSpecificPaybackRanges(scale)
    }
  };
}

// 지표별 점수 계산
function calculateMetricScore(value: number, ranges: ScoreRange[]): number {
  for (const range of ranges) {
    if (value >= range.min && value < range.max) {
      return range.score;
    }
  }
  return 0;
}

// 평균 DSCR 계산
function calculateAverageDSCR(result: InvestmentResult): number {
  if (!result.dscrData || result.dscrData.length === 0) return 0;
  
  const validDSCRs = result.dscrData.filter(d => d.totalDebtService > 0);
  if (validDSCRs.length === 0) return 0;
  
  const sum = validDSCRs.reduce((acc, d) => acc + d.dscr, 0);
  return sum / validDSCRs.length;
}

// 투자 등급 계산
export function calculateInvestmentGrade(
  result: InvestmentResult,
  initialInvestment: number
): InvestmentGrade {
  const scaleInfo = getInvestmentScaleInfo(initialInvestment);
  const criteria = getDynamicGradingCriteria(scaleInfo.scale);
  
  // NPV 점수 (억원 단위)
  const npvInBillion = result.npv / 100000000;
  const npvScore = calculateMetricScore(npvInBillion, criteria.npv.ranges);
  
  // IRR 점수
  const irrScore = calculateMetricScore(result.irr, criteria.irr.ranges);
  
  // DSCR 점수 (평균값 사용)
  const avgDSCR = calculateAverageDSCR(result);
  const dscrScore = calculateMetricScore(avgDSCR, criteria.dscr.ranges);
  
  // 회수기간 점수
  const paybackScore = calculateMetricScore(result.paybackPeriod, criteria.payback.ranges);
  
  // 가중 평균 점수 계산
  const totalScore = (
    npvScore * criteria.npv.weight +
    irrScore * criteria.irr.weight +
    dscrScore * criteria.dscr.weight +
    paybackScore * criteria.payback.weight
  ) / 100;
  
  // 리스크 프리미엄 적용
  const adjustedScore = totalScore * (1 - scaleInfo.riskPremium);
  
  // 등급 결정
  let grade: string;
  let recommendation: string;
  let color: string;
  let bgColor: string;
  let borderColor: string;
  let gradeDesc: string;
  
  if (adjustedScore >= 90) {
    grade = 'AA';
    recommendation = '매우 우수한 투자안 - 즉시 실행 강력 권장';
    color = 'text-green-700';
    bgColor = 'bg-green-50';
    borderColor = 'border-green-200';
    gradeDesc = '탁월한 투자안';
  } else if (adjustedScore >= 80) {
    grade = 'A';
    recommendation = '우수한 투자안 - 실행 권장';
    color = 'text-blue-700';
    bgColor = 'bg-blue-50';
    borderColor = 'border-blue-200';
    gradeDesc = '우수한 투자안';
  } else if (adjustedScore >= 60) {
    grade = 'B';
    recommendation = '양호한 투자안 - 조건부 실행 고려';
    color = 'text-yellow-700';
    bgColor = 'bg-yellow-50';
    borderColor = 'border-yellow-200';
    gradeDesc = '양호한 투자안';
  } else if (adjustedScore >= 40) {
    grade = 'C';
    recommendation = '보통 투자안 - 추가 검토 필요';
    color = 'text-orange-700';
    bgColor = 'bg-orange-50';
    borderColor = 'border-orange-200';
    gradeDesc = '보통 투자안';
  } else {
    grade = 'D';
    recommendation = '미흡한 투자안 - 재검토 필요';
    color = 'text-red-700';
    bgColor = 'bg-red-50';
    borderColor = 'border-red-200';
    gradeDesc = '미흡한 투자안';
  }
  
  return {
    grade,
    score: totalScore,
    recommendation,
    color,
    bgColor,
    borderColor,
    gradeDesc,
    details: {
      npvScore,
      irrScore,
      dscrScore,
      paybackScore
    },
    investmentScale: scaleInfo.scale,
    riskPremium: scaleInfo.riskPremium,
    adjustedScore
  };
} 