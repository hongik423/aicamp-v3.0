// 수정된 정책자금투자분석기 정확도 검증 테스트
const testCases = [
  {
    name: "수정된 테스트 케이스 1: 기본 시나리오",
    inputs: {
      initialInvestment: 5,      // 5억원
      annualRevenue: 12,         // 12억원
      operatingMargin: 30,       // 30% 영업이익률
      discountRate: 5,           // 5% 할인율
      analysisYears: 10,
      revenueGrowthRate: 0,
      costInflationRate: 0,
      debtRatio: 0,
      loanInterestRate: 0,
      workingCapitalRatio: 0,
      depreciationRate: 10,      // 10% 감가상각
      residualValueRate: 0
    },
    expectedResults: {
      npv: { min: 12, max: 18 },        // 수정된 예상 범위
      irr: { min: 50, max: 80 },        // 수정된 예상 범위
      paybackPeriod: { min: 1.5, max: 2.5 },
      testName: "기본 시나리오 (수정)"
    }
  },
  {
    name: "수정된 테스트 케이스 2: 보수적 시나리오",
    inputs: {
      initialInvestment: 5,
      annualRevenue: 8,
      operatingMargin: 20,       // 20% 영업이익률
      discountRate: 7,
      analysisYears: 10,
      revenueGrowthRate: 0,
      costInflationRate: 0,
      debtRatio: 0,
      loanInterestRate: 0,
      workingCapitalRatio: 0,
      depreciationRate: 10,
      residualValueRate: 0
    },
    expectedResults: {
      npv: { min: 1, max: 4 },          // 수정된 예상 범위
      irr: { min: 10, max: 25 },        // 수정된 예상 범위
      paybackPeriod: { min: 3, max: 6 },
      testName: "보수적 시나리오 (수정)"
    }
  },
  {
    name: "수정된 테스트 케이스 3: 성장 시나리오",
    inputs: {
      initialInvestment: 10,
      annualRevenue: 20,
      operatingMargin: 25,       // 25% 영업이익률
      discountRate: 8,
      analysisYears: 10,
      revenueGrowthRate: 5,      // 5% 성장률
      costInflationRate: 3,      // 3% 비용 상승
      debtRatio: 50,             // 50% 부채
      loanInterestRate: 4,       // 4% 대출금리
      workingCapitalRatio: 10,   // 10% 운전자본
      depreciationRate: 10,
      residualValueRate: 20      // 20% 잔존가치
    },
    expectedResults: {
      npv: { min: 15, max: 30 },        // 성장을 반영한 예상 범위
      irr: { min: 20, max: 40 },        // 성장을 반영한 예상 범위
      paybackPeriod: { min: 2, max: 4 },
      testName: "성장 시나리오"
    }
  }
];

// 실제 컴포넌트와 동일한 계산 로직 구현
const calculateAdvancedCashFlow = (inputs) => {
  const initial = inputs.initialInvestment;
  const revenue = inputs.annualRevenue;
  const costs = revenue * (1 - inputs.operatingMargin / 100);
  
  const cashFlows = [-initial];
  let cumulativeWorkingCapital = 0;
  
  for (let year = 1; year <= inputs.analysisYears; year++) {
    // 매출 성장률 적용
    const yearlyRevenue = revenue * Math.pow(1 + inputs.revenueGrowthRate / 100, year - 1);
    
    // 비용 상승률 적용
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
    
    cashFlows.push(freeCashFlow);
  }
  
  return cashFlows;
};

// NPV 계산
const calculateNPV = (cashFlows, discountRate) => {
  return cashFlows.reduce((npv, cashFlow, index) => {
    return npv + cashFlow / Math.pow(1 + discountRate / 100, index);
  }, 0);
};

// IRR 계산 (안정성 강화)
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
    
    // 비현실적인 값 방지
    if (newRate < -0.95) newRate = -0.95;
    if (newRate > 5) newRate = 5;
    
    if (Math.abs(newRate - rate) < tolerance) break;
    
    rate = newRate;
  }
  
  if (isNaN(rate) || !isFinite(rate)) return 0;
  
  return Math.max(-95, Math.min(500, rate * 100));
};

// 회수기간 계산
const calculatePaybackPeriod = (cashFlows) => {
  let cumulativeCashFlow = 0;
  for (let year = 1; year < cashFlows.length; year++) {
    cumulativeCashFlow += cashFlows[year];
    if (cumulativeCashFlow >= Math.abs(cashFlows[0])) {
      const remainingAmount = Math.abs(cashFlows[0]) - (cumulativeCashFlow - cashFlows[year]);
      return year - 1 + remainingAmount / cashFlows[year];
    }
  }
  return cashFlows.length;
};

// 테스트 실행 함수
const runCorrectedTest = (testCase) => {
  const { inputs, expectedResults } = testCase;
  
  console.log(`\n🧪 ${testCase.name}`);
  console.log('=' .repeat(70));
  
  // 현금흐름 계산
  const cashFlows = calculateAdvancedCashFlow(inputs);
  
  // 주요 지표 계산
  const npv = calculateNPV(cashFlows, inputs.discountRate);
  const irr = calculateIRR(cashFlows);
  const paybackPeriod = calculatePaybackPeriod(cashFlows);
  
  // 결과 출력
  console.log('\n📊 계산 결과:');
  console.log(`NPV: ${npv.toFixed(2)}억원`);
  console.log(`IRR: ${irr.toFixed(2)}%`);
  console.log(`회수기간: ${paybackPeriod.toFixed(2)}년`);
  
  // 현금흐름 상세 정보
  console.log('\n💰 연도별 현금흐름:');
  cashFlows.forEach((cf, index) => {
    if (index === 0) {
      console.log(`초기투자: ${cf.toFixed(1)}억원`);
    } else {
      console.log(`${index}년차: ${cf.toFixed(1)}억원`);
    }
  });
  
  // 정확도 검증
  console.log('\n🎯 정확도 검증:');
  
  const npvCheck = npv >= expectedResults.npv.min && npv <= expectedResults.npv.max;
  const irrCheck = irr >= expectedResults.irr.min && irr <= expectedResults.irr.max;
  const paybackCheck = paybackPeriod >= expectedResults.paybackPeriod.min && paybackPeriod <= expectedResults.paybackPeriod.max;
  
  console.log(`NPV 정확도: ${npvCheck ? '✅' : '❌'} (예상: ${expectedResults.npv.min}~${expectedResults.npv.max}억원)`);
  console.log(`IRR 정확도: ${irrCheck ? '✅' : '❌'} (예상: ${expectedResults.irr.min}~${expectedResults.irr.max}%)`);
  console.log(`회수기간 정확도: ${paybackCheck ? '✅' : '❌'} (예상: ${expectedResults.paybackPeriod.min}~${expectedResults.paybackPeriod.max}년)`);
  
  const totalChecks = [npvCheck, irrCheck, paybackCheck];
  const passedChecks = totalChecks.filter(check => check).length;
  const accuracy = (passedChecks / totalChecks.length * 100).toFixed(1);
  
  console.log(`\n📈 종합 정확도: ${accuracy}% (${passedChecks}/${totalChecks.length})`);
  
  // 상세 분석
  console.log('\n🔍 상세 분석:');
  console.log(`초기 투자: ${inputs.initialInvestment}억원`);
  console.log(`연간 매출: ${inputs.annualRevenue}억원`);
  console.log(`영업이익률: ${inputs.operatingMargin}%`);
  console.log(`할인율: ${inputs.discountRate}%`);
  console.log(`매출성장률: ${inputs.revenueGrowthRate}%`);
  console.log(`부채비율: ${inputs.debtRatio}%`);
  
  return {
    testCase: testCase.name,
    results: { npv, irr, paybackPeriod },
    accuracy: parseFloat(accuracy),
    passed: passedChecks,
    total: totalChecks.length,
    cashFlows
  };
};

// 전체 테스트 실행
console.log('🚀 수정된 정책자금투자분석기 정확도 검증 테스트 시작');
console.log('=' .repeat(80));

const testResults = [];
let totalAccuracy = 0;

testCases.forEach(testCase => {
  const result = runCorrectedTest(testCase);
  testResults.push(result);
  totalAccuracy += result.accuracy;
});

// 전체 결과 요약
console.log('\n🎯 전체 테스트 결과 요약');
console.log('=' .repeat(80));

testResults.forEach(result => {
  console.log(`${result.testCase}: ${result.accuracy}% (${result.passed}/${result.total})`);
});

const overallAccuracy = (totalAccuracy / testCases.length).toFixed(1);
console.log(`\n📊 전체 알고리즘 정확도: ${overallAccuracy}%`);

// 개선도 평가
console.log('\n📈 개선도 평가:');
if (parseFloat(overallAccuracy) >= 80) {
  console.log('✅ 우수: 알고리즘이 정확하게 작동합니다.');
} else if (parseFloat(overallAccuracy) >= 60) {
  console.log('⚠️ 양호: 추가 미세 조정이 필요합니다.');
} else {
  console.log('❌ 개선 필요: 계산 로직을 재검토해야 합니다.');
}

// 실제 사용 권장사항
console.log('\n💡 실제 사용 권장사항:');
console.log('1. 기본 시나리오: 일반적인 투자 분석에 적합');
console.log('2. 보수적 시나리오: 위험 회피 성향의 투자자에게 적합');
console.log('3. 성장 시나리오: 성장 잠재력이 높은 사업에 적합');
console.log('4. 모든 계산 결과는 참고용이며, 전문가 검토 권장');

console.log('\n🎉 수정된 테스트 완료!'); 