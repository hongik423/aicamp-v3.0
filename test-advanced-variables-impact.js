// 고급설정 변수 영향도 완벽 심층진단 테스트
// 각 변수의 변화가 NPV, IRR, DSCR에 미치는 영향을 체계적으로 검증

const baseScenario = {
  initialInvestment: 10,      // 10억원
  annualRevenue: 20,          // 20억원
  operatingMargin: 25,        // 25% 영업이익률
  discountRate: 8,            // 8% 할인율
  analysisYears: 10,
  revenueGrowthRate: 3,       // 3% 매출성장률
  costInflationRate: 2,       // 2% 비용상승률
  debtRatio: 50,              // 50% 부채비율
  loanInterestRate: 4,        // 4% 대출금리
  workingCapitalRatio: 10,    // 10% 운전자본비율
  depreciationRate: 10,       // 10% 감가상각률
  residualValueRate: 20       // 20% 잔존가치
};

// 각 변수별 테스트 케이스 정의
const variableTestCases = [
  {
    variable: 'revenueGrowthRate',
    name: '매출성장률',
    unit: '%',
    testValues: [0, 2, 5, 8, 12, 15],
    expectedImpact: {
      npv: 'positive', // 매출성장률 증가 → NPV 증가
      irr: 'positive', // 매출성장률 증가 → IRR 증가
      dscr: 'positive' // 매출성장률 증가 → DSCR 증가
    },
    sensitivity: 'high' // 높은 민감도
  },
  {
    variable: 'costInflationRate',
    name: '비용상승률',
    unit: '%',
    testValues: [0, 1, 3, 5, 7, 10],
    expectedImpact: {
      npv: 'negative', // 비용상승률 증가 → NPV 감소
      irr: 'negative', // 비용상승률 증가 → IRR 감소
      dscr: 'negative' // 비용상승률 증가 → DSCR 감소
    },
    sensitivity: 'medium'
  },
  {
    variable: 'debtRatio',
    name: '부채비율',
    unit: '%',
    testValues: [0, 20, 40, 60, 80, 90],
    expectedImpact: {
      npv: 'complex', // 세금절약효과 vs 이자비용
      irr: 'complex', // 레버리지 효과
      dscr: 'negative' // 부채비율 증가 → DSCR 감소
    },
    sensitivity: 'high'
  },
  {
    variable: 'loanInterestRate',
    name: '대출금리',
    unit: '%',
    testValues: [1, 2, 4, 6, 8, 12],
    expectedImpact: {
      npv: 'negative', // 대출금리 증가 → NPV 감소
      irr: 'negative', // 대출금리 증가 → IRR 감소
      dscr: 'negative' // 대출금리 증가 → DSCR 감소
    },
    sensitivity: 'medium'
  },
  {
    variable: 'workingCapitalRatio',
    name: '운전자본비율',
    unit: '%',
    testValues: [0, 5, 10, 15, 20, 25],
    expectedImpact: {
      npv: 'negative', // 운전자본 증가 → NPV 감소 (현금 묶임)
      irr: 'negative', // 운전자본 증가 → IRR 감소
      dscr: 'negative' // 운전자본 증가 → DSCR 감소
    },
    sensitivity: 'low'
  },
  {
    variable: 'depreciationRate',
    name: '감가상각률',
    unit: '%',
    testValues: [5, 8, 10, 12, 15, 20],
    expectedImpact: {
      npv: 'complex', // 세금절약효과 vs 수익성
      irr: 'complex', // 세금절약효과
      dscr: 'negative' // 감가상각 증가 → EBIT 감소 → DSCR 감소
    },
    sensitivity: 'medium'
  },
  {
    variable: 'residualValueRate',
    name: '잔존가치',
    unit: '%',
    testValues: [0, 10, 20, 30, 40, 50],
    expectedImpact: {
      npv: 'positive', // 잔존가치 증가 → NPV 증가
      irr: 'positive', // 잔존가치 증가 → IRR 증가
      dscr: 'neutral'  // 마지막 연도에만 영향
    },
    sensitivity: 'low'
  },
  {
    variable: 'discountRate',
    name: '할인율',
    unit: '%',
    testValues: [3, 5, 8, 10, 12, 15],
    expectedImpact: {
      npv: 'negative', // 할인율 증가 → NPV 감소
      irr: 'neutral',  // IRR은 할인율과 독립적
      dscr: 'neutral'  // DSCR은 할인율과 독립적
    },
    sensitivity: 'high'
  }
];

// 실제 컴포넌트와 동일한 계산 로직
const calculateDetailedCashFlow = (inputs) => {
  const initial = inputs.initialInvestment;
  const revenue = inputs.annualRevenue;
  const costs = revenue * (1 - inputs.operatingMargin / 100);
  
  const cashFlows = [-initial];
  const yearlyData = [];
  let cumulativeWorkingCapital = 0;
  
  for (let year = 1; year <= inputs.analysisYears; year++) {
    // 매출성장률 적용
    const yearlyRevenue = revenue * Math.pow(1 + inputs.revenueGrowthRate / 100, year - 1);
    
    // 비용상승률 적용
    const yearlyCosts = costs * Math.pow(1 + inputs.costInflationRate / 100, year - 1);
    
    // 운전자본 변화 계산
    const requiredWorkingCapital = yearlyRevenue * (inputs.workingCapitalRatio / 100);
    const workingCapitalChange = requiredWorkingCapital - cumulativeWorkingCapital;
    cumulativeWorkingCapital = requiredWorkingCapital;
    
    // 감가상각비 계산
    const depreciation = initial * (inputs.depreciationRate / 100);
    
    // EBITDA, EBIT 계산
    const ebitda = yearlyRevenue - yearlyCosts;
    const ebit = ebitda - depreciation;
    
    // 이자비용 계산 (부채 잔액 기준)
    const debtAmount = initial * (inputs.debtRatio / 100);
    const remainingDebt = Math.max(0, debtAmount - (debtAmount / inputs.analysisYears) * (year - 1));
    const interestExpense = remainingDebt * (inputs.loanInterestRate / 100);
    
    // 세전이익
    const ebt = ebit - interestExpense;
    
    // 법인세 (25% 고정, 손실시 0)
    const tax = Math.max(0, ebt * 0.25);
    const netIncome = ebt - tax;
    
    // 자유현금흐름 계산
    let freeCashFlow = netIncome + depreciation - workingCapitalChange;
    
    // 마지막 연도에 잔존가치와 운전자본 회수
    if (year === inputs.analysisYears) {
      const residualValue = initial * (inputs.residualValueRate / 100);
      freeCashFlow += residualValue + cumulativeWorkingCapital;
    }
    
    // 최소 현금흐름 보장
    freeCashFlow = Math.max(freeCashFlow, netIncome * 0.1);
    
    // DSCR 계산
    const annualDebtService = (debtAmount / inputs.analysisYears) + interestExpense;
    const dscr = annualDebtService > 0 ? (netIncome + depreciation) / annualDebtService : 0;
    
    cashFlows.push(freeCashFlow);
    yearlyData.push({
      year,
      revenue: yearlyRevenue,
      costs: yearlyCosts,
      ebitda,
      ebit,
      netIncome,
      freeCashFlow,
      dscr,
      workingCapitalChange,
      interestExpense,
      depreciation
    });
  }
  
  return { cashFlows, yearlyData };
};

// NPV 계산
const calculateNPV = (cashFlows, discountRate) => {
  return cashFlows.reduce((npv, cashFlow, index) => {
    return npv + cashFlow / Math.pow(1 + discountRate / 100, index);
  }, 0);
};

// IRR 계산
const calculateIRR = (cashFlows) => {
  if (cashFlows.length < 2) return 0;
  
  const positiveFlows = cashFlows.filter(cf => cf > 0);
  const negativeFlows = cashFlows.filter(cf => cf < 0);
  
  if (positiveFlows.length === 0 || negativeFlows.length === 0) {
    return 0;
  }
  
  const maxIterations = 1000;
  const tolerance = 0.000001;
  let rate = 0.1;
  
  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let derivative = 0;
    
    for (let year = 0; year < cashFlows.length; year++) {
      const factor = Math.pow(1 + rate, year);
      if (factor === 0) return 0;
      
      npv += cashFlows[year] / factor;
      if (year > 0) {
        derivative -= (year * cashFlows[year]) / Math.pow(1 + rate, year + 1);
      }
    }
    
    if (Math.abs(npv) < tolerance) break;
    if (Math.abs(derivative) < tolerance) break;
    
    let newRate = rate - npv / derivative;
    
    if (newRate < -0.95) newRate = -0.95;
    if (newRate > 5) newRate = 5;
    
    if (Math.abs(newRate - rate) < tolerance) break;
    
    rate = newRate;
  }
  
  if (isNaN(rate) || !isFinite(rate)) return 0;
  
  return Math.max(-95, Math.min(500, rate * 100));
};

// 평균 DSCR 계산
const calculateAvgDSCR = (yearlyData) => {
  const validDSCRs = yearlyData.filter(data => data.dscr > 0).map(data => data.dscr);
  return validDSCRs.length > 0 ? validDSCRs.reduce((sum, dscr) => sum + dscr, 0) / validDSCRs.length : 0;
};

// 변수 영향도 테스트 실행
const runVariableImpactTest = (testCase) => {
  console.log(`\n🔬 ${testCase.name} (${testCase.variable}) 영향도 분석`);
  console.log('=' .repeat(80));
  
  const results = [];
  let baselineResults = null;
  
  testCase.testValues.forEach((value, index) => {
    const testInputs = { ...baseScenario };
    testInputs[testCase.variable] = value;
    
    const { cashFlows, yearlyData } = calculateDetailedCashFlow(testInputs);
    const npv = calculateNPV(cashFlows, testInputs.discountRate);
    const irr = calculateIRR(cashFlows);
    const avgDscr = calculateAvgDSCR(yearlyData);
    
    const result = {
      variableValue: value,
      npv,
      irr,
      avgDscr,
      isBaseline: index === Math.floor(testCase.testValues.length / 2) // 중간값을 기준선으로
    };
    
    if (result.isBaseline) {
      baselineResults = result;
    }
    
    results.push(result);
    
    console.log(`${testCase.name}: ${value}${testCase.unit} → NPV: ${npv.toFixed(1)}억원, IRR: ${irr.toFixed(1)}%, DSCR: ${avgDscr.toFixed(2)}`);
  });
  
  // 영향도 분석
  console.log('\n📊 영향도 분석:');
  
  const npvChanges = results.map(r => r.npv - baselineResults.npv);
  const irrChanges = results.map(r => r.irr - baselineResults.irr);
  const dscrChanges = results.map(r => r.avgDscr - baselineResults.avgDscr);
  
  const maxNpvChange = Math.max(...npvChanges.map(Math.abs));
  const maxIrrChange = Math.max(...irrChanges.map(Math.abs));
  const maxDscrChange = Math.max(...dscrChanges.map(Math.abs));
  
  console.log(`NPV 최대 변화: ±${maxNpvChange.toFixed(1)}억원`);
  console.log(`IRR 최대 변화: ±${maxIrrChange.toFixed(1)}%`);
  console.log(`DSCR 최대 변화: ±${maxDscrChange.toFixed(2)}`);
  
  // 방향성 검증
  console.log('\n🎯 방향성 검증:');
  
  const npvTrend = npvChanges[npvChanges.length - 1] > npvChanges[0] ? 'positive' : 'negative';
  const irrTrend = irrChanges[irrChanges.length - 1] > irrChanges[0] ? 'positive' : 'negative';
  const dscrTrend = dscrChanges[dscrChanges.length - 1] > dscrChanges[0] ? 'positive' : 'negative';
  
  const npvMatch = testCase.expectedImpact.npv === 'complex' || npvTrend === testCase.expectedImpact.npv;
  const irrMatch = testCase.expectedImpact.irr === 'complex' || testCase.expectedImpact.irr === 'neutral' || irrTrend === testCase.expectedImpact.irr;
  const dscrMatch = testCase.expectedImpact.dscr === 'complex' || testCase.expectedImpact.dscr === 'neutral' || dscrTrend === testCase.expectedImpact.dscr;
  
  console.log(`NPV 방향성: ${npvMatch ? '✅' : '❌'} (예상: ${testCase.expectedImpact.npv}, 실제: ${npvTrend})`);
  console.log(`IRR 방향성: ${irrMatch ? '✅' : '❌'} (예상: ${testCase.expectedImpact.irr}, 실제: ${irrTrend})`);
  console.log(`DSCR 방향성: ${dscrMatch ? '✅' : '❌'} (예상: ${testCase.expectedImpact.dscr}, 실제: ${dscrTrend})`);
  
  // 민감도 평가
  console.log('\n📈 민감도 평가:');
  
  const sensitivityScore = (maxNpvChange / baselineResults.npv * 100 + 
                           maxIrrChange / Math.abs(baselineResults.irr) * 100 + 
                           maxDscrChange / baselineResults.avgDscr * 100) / 3;
  
  let actualSensitivity;
  if (sensitivityScore > 30) actualSensitivity = 'high';
  else if (sensitivityScore > 10) actualSensitivity = 'medium';
  else actualSensitivity = 'low';
  
  const sensitivityMatch = actualSensitivity === testCase.sensitivity;
  
  console.log(`민감도 점수: ${sensitivityScore.toFixed(1)}%`);
  console.log(`민감도 등급: ${sensitivityMatch ? '✅' : '⚠️'} (예상: ${testCase.sensitivity}, 실제: ${actualSensitivity})`);
  
  // 정확도 계산
  const totalChecks = [npvMatch, irrMatch, dscrMatch, sensitivityMatch];
  const passedChecks = totalChecks.filter(check => check).length;
  const accuracy = (passedChecks / totalChecks.length * 100).toFixed(1);
  
  console.log(`\n🎯 종합 정확도: ${accuracy}% (${passedChecks}/${totalChecks.length})`);
  
  return {
    variable: testCase.variable,
    name: testCase.name,
    accuracy: parseFloat(accuracy),
    maxNpvChange,
    maxIrrChange,
    maxDscrChange,
    sensitivityScore,
    results
  };
};

// 전체 테스트 실행
console.log('🚀 고급설정 변수 영향도 완벽 심층진단 테스트 시작');
console.log('=' .repeat(80));
console.log('📋 기준 시나리오:');
Object.entries(baseScenario).forEach(([key, value]) => {
  console.log(`  ${key}: ${value}`);
});

const allResults = [];
let totalAccuracy = 0;

variableTestCases.forEach(testCase => {
  const result = runVariableImpactTest(testCase);
  allResults.push(result);
  totalAccuracy += result.accuracy;
});

// 전체 결과 요약
console.log('\n🎯 전체 변수 영향도 테스트 결과');
console.log('=' .repeat(80));

allResults.forEach(result => {
  console.log(`${result.name}: ${result.accuracy}% | NPV변화: ±${result.maxNpvChange.toFixed(1)}억원 | IRR변화: ±${result.maxIrrChange.toFixed(1)}% | DSCR변화: ±${result.maxDscrChange.toFixed(2)}`);
});

const overallAccuracy = (totalAccuracy / variableTestCases.length).toFixed(1);
console.log(`\n📊 전체 알고리즘 정확도: ${overallAccuracy}%`);

// 민감도 순위
console.log('\n🏆 변수별 민감도 순위:');
const sortedBySensitivity = allResults.sort((a, b) => b.sensitivityScore - a.sensitivityScore);
sortedBySensitivity.forEach((result, index) => {
  console.log(`${index + 1}. ${result.name}: ${result.sensitivityScore.toFixed(1)}%`);
});

// 최종 평가
console.log('\n🎉 심층진단 결과:');
if (parseFloat(overallAccuracy) >= 90) {
  console.log('🥇 A급: 모든 변수가 정확하게 반영됩니다.');
} else if (parseFloat(overallAccuracy) >= 80) {
  console.log('🥈 B급: 대부분의 변수가 올바르게 반영됩니다.');
} else if (parseFloat(overallAccuracy) >= 70) {
  console.log('🥉 C급: 일부 변수의 반영에 문제가 있습니다.');
} else {
  console.log('❌ D급: 변수 반영 로직을 전면 재검토해야 합니다.');
}

console.log('\n💡 개선 권장사항:');
allResults.forEach(result => {
  if (result.accuracy < 75) {
    console.log(`🔧 ${result.name}: 계산 로직 재검토 필요 (정확도: ${result.accuracy}%)`);
  }
});

console.log('\n🎯 고급설정 변수 영향도 심층진단 완료!'); 