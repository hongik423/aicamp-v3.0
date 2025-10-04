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
  
  // 정책자금 특성을 반영한 리스크 프리미엄 재설계
  if (investmentInBillion >= 100) {
    return {
      scale: 'mega',
      riskPremium: 0.12, // 15% → 12% (메가투자)
      description: '메가 투자 (100억원 이상)',
      minIRR: 18,
      minDSCR: 2.5,
      maxPayback: 4
    };
  } else if (investmentInBillion >= 75) {
    return {
      scale: 'large',
      riskPremium: 0.08, // 8% (대규모투자)
      description: '대규모 투자 (75-100억원)',
      minIRR: 15,
      minDSCR: 2.0,
      maxPayback: 5
    };
  } else if (investmentInBillion >= 50) {
    return {
      scale: 'medium',
      riskPremium: 0.05, // 5% (중규모투자)
      description: '중규모 투자 (50-75억원)',
      minIRR: 12,
      minDSCR: 1.5,
      maxPayback: 6
    };
  } else if (investmentInBillion >= 25) {
    return {
      scale: 'small',
      riskPremium: 0.03, // 3% (소규모투자)
      description: '소규모 투자 (25-50억원)',
      minIRR: 10,
      minDSCR: 1.3,
      maxPayback: 7
    };
  } else {
    return {
      scale: 'micro',
      riskPremium: 0.02, // 2% (마이크로투자)
      description: '마이크로 투자 (25억원 미만)',
      minIRR: 8,
      minDSCR: 1.2,
      maxPayback: 10
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

// IRR 점수 계산 - 할인율 대비 상대적 평가
function getRelativeIRRScore(irr: number, discountRate: number): number {
  const spread = irr - discountRate; // IRR과 할인율의 차이
  
  if (spread >= 15) return 100; // 할인율 대비 15%p 이상
  if (spread >= 10) return 85;  // 할인율 대비 10%p 이상
  if (spread >= 7) return 70;   // 할인율 대비 7%p 이상
  if (spread >= 5) return 60;   // 할인율 대비 5%p 이상
  if (spread >= 3) return 50;   // 할인율 대비 3%p 이상
  if (spread >= 0) return 40;   // 할인율 이상
  if (spread >= -3) return 30;  // 할인율 대비 -3%p
  return 20; // 할인율 대비 -3%p 미만
}

// DSCR 점수 계산 - 1.25를 중간점으로
function getDSCRScore(dscr: number): number {
  if (dscr >= 2.0) return 100;  // 매우 안정적
  if (dscr >= 1.75) return 90;  // 안정적
  if (dscr >= 1.5) return 80;   // 양호
  if (dscr >= 1.35) return 70;  // 적정
  if (dscr >= 1.25) return 60;  // 금융권 안정선 (중간점)
  if (dscr >= 1.15) return 50;  // 주의 필요
  if (dscr >= 1.0) return 40;   // 위험
  if (dscr >= 0.9) return 30;   // 매우 위험
  return 20; // 상환 불가
}

// 회수기간 점수 계산 - 7-8년을 보통으로
function getPaybackScore(payback: number): number {
  if (payback <= 3) return 100;   // 매우 우수
  if (payback <= 4) return 90;    // 우수
  if (payback <= 5) return 80;    // 양호
  if (payback <= 6) return 70;    // 적정
  if (payback <= 7) return 60;    // 보통 상한
  if (payback <= 8) return 50;    // 보통 하한
  if (payback <= 10) return 40;   // 미흡
  if (payback <= 12) return 30;   // 부진
  return 20; // 매우 부진
}

// 동적 점수 구간 생성
export function getDynamicGradingCriteria(scale: string): GradingCriteria {
  // IRR과 DSCR는 리스크 프리미엄 대상에서 제외
  const baseWeight = { npv: 35, irr: 30, dscr: 20, payback: 15 };
  
  return {
    npv: {
      weight: baseWeight.npv,
      ranges: getScaleSpecificNPVRanges(scale)
    },
    irr: {
      weight: baseWeight.irr,
      ranges: [] // IRR은 상대적 평가로 ranges 사용 안함
    },
    dscr: {
      weight: baseWeight.dscr,
      ranges: [] // DSCR은 별도 함수로 평가
    },
    payback: {
      weight: baseWeight.payback,
      ranges: [] // 회수기간은 별도 함수로 평가
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
  initialInvestment: number,
  discountRate: number = 5 // 기본 할인율
): InvestmentGrade {
  const scaleInfo = getInvestmentScaleInfo(initialInvestment);
  const criteria = getDynamicGradingCriteria(scaleInfo.scale);
  
  // NPV 점수 (억원 단위) - 리스크 프리미엄 적용
  const npvInBillion = result.npv / 100000000;
  const npvScore = calculateMetricScore(npvInBillion, criteria.npv.ranges);
  const adjustedNpvScore = npvScore * (1 - scaleInfo.riskPremium);
  
  // IRR 점수 - 할인율 대비 상대적 평가 (리스크 프리미엄 미적용)
  const irrScore = getRelativeIRRScore(result.irr, discountRate);
  
  // DSCR 점수 - 1.25 중간점 기준 (리스크 프리미엄 미적용)
  const avgDSCR = calculateAverageDSCR(result);
  const dscrScore = getDSCRScore(avgDSCR);
  
  // 회수기간 점수 - 7-8년 보통 기준 (리스크 프리미엄 적용)
  const paybackScore = getPaybackScore(result.paybackPeriod);
  const adjustedPaybackScore = paybackScore * (1 - scaleInfo.riskPremium);
  
  // 가중 평균 점수 계산
  const totalScore = (
    adjustedNpvScore * criteria.npv.weight +
    irrScore * criteria.irr.weight +
    dscrScore * criteria.dscr.weight +
    adjustedPaybackScore * criteria.payback.weight
  ) / 100;
  
  // 등급 결정
  let grade: string;
  let recommendation: string;
  let color: string;
  let bgColor: string;
  let borderColor: string;
  let gradeDesc: string;
  
  if (totalScore >= 85) {
    grade = 'AA';
    recommendation = '매우 우수한 투자안 - 즉시 실행 강력 권장';
    color = 'text-green-700';
    bgColor = 'bg-green-50';
    borderColor = 'border-green-200';
    gradeDesc = '탁월한 투자안';
  } else if (totalScore >= 70) {
    grade = 'A';
    recommendation = '우수한 투자안 - 실행 권장';
    color = 'text-blue-700';
    bgColor = 'bg-blue-50';
    borderColor = 'border-blue-200';
    gradeDesc = '우수한 투자안';
  } else if (totalScore >= 55) {
    grade = 'B';
    recommendation = '양호한 투자안 - 조건부 실행 고려';
    color = 'text-yellow-700';
    bgColor = 'bg-yellow-50';
    borderColor = 'border-yellow-200';
    gradeDesc = '양호한 투자안';
  } else if (totalScore >= 40) {
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
      npvScore: adjustedNpvScore,
      irrScore,
      dscrScore,
      paybackScore: adjustedPaybackScore
    },
    investmentScale: scaleInfo.scale,
    riskPremium: scaleInfo.riskPremium,
    adjustedScore: totalScore
  };
} 