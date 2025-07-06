// 정책자금투자분석기 추가 심층 테스트
const testCases = [
  {
    name: "테스트 케이스 1: 기본 시나리오 검증",
    inputs: {
      initialInvestment: 5,      // 5억원
      annualRevenue: 12,         // 12억원
      operatingMargin: 30,       // 30% (운영비율 70%의 역산)
      discountRate: 5,           // 5% 이자율
      analysisYears: 10,
      revenueGrowthRate: 0,
      costInflationRate: 0,
      debtRatio: 0,              // 부채 없음
      loanInterestRate: 0,
      workingCapitalRatio: 0,
      depreciationRate: 10,
      residualValueRate: 0
    },
    expectedResults: {
      npv: { min: 16.2, max: 18.0 },    // 약 17.1억원 ±5%
      irr: { min: 68.2, max: 75.2 },    // 약 71.7% ±2%
      paybackPeriod: { min: 1.3, max: 1.5 }, // 약 1.4년
      testName: "기본 시나리오"
    }
  },
  {
    name: "테스트 케이스 2: 보수적 시나리오",
    inputs: {
      initialInvestment: 5,      // 5억원
      annualRevenue: 8,          // 8억원
      operatingMargin: 20,       // 20% (운영비율 80%의 역산)
      discountRate: 7,           // 7% 이자율
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
      npv: { min: 2.7, max: 2.9 },      // 약 2.8억원 ±5%
      irr: { min: 14.2, max: 18.2 },    // 약 16.2% ±2%
      paybackPeriod: { min: 4.8, max: 5.2 }, // 약 5.0년
      testName: "보수적 시나리오"
    }
  },
  {
    name: "테스트 케이스 3: 낙관적 시나리오",
    inputs: {
      initialInvestment: 5,      // 5억원
      annualRevenue: 15,         // 15억원
      operatingMargin: 40,       // 40% (운영비율 60%의 역산)
      discountRate: 3,           // 3% 이자율
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
      npv: { min: 30.3, max: 33.5 },    // 약 31.9억원 ±5%
      irr: { min: 117.0, max: 121.0 },  // 약 119.0% ±2%
      paybackPeriod: { min: 0.76, max: 0.84 }, // 약 0.8년
      testName: "낙관적 시나리오"
    }
  },
  {
    name: "테스트 케이스 4: 손익분기점 테스트",
    inputs: {
      initialInvestment: 10,     // 10억원
      annualRevenue: 10,         // 10억원
      operatingMargin: 10,       // 10% (운영비율 90%의 역산)
      discountRate: 8,           // 8% 이자율
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
      npv: { min: -4.0, max: -3.0 },    // 약 -3.5억원 (음수)
      irr: { min: 0, max: 4.0 },        // 약 2.0% (낮음)
      paybackPeriod: { min: 8, max: 12 }, // 긴 회수기간
      testName: "손익분기점 시나리오"
    }
  },
  {
    name: "극한값 테스트 1: 매우 큰 투자금액",
    inputs: {
      initialInvestment: 100,    // 100억원
      annualRevenue: 1,          // 1억원 (매우 작은 매출)
      operatingMargin: 5,        // 5% (운영비율 95%)
      discountRate: 10,
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
      npv: { min: -120, max: -80 },     // 큰 손실
      irr: { min: -50, max: 0 },        // 음수 또는 0
      paybackPeriod: { min: 15, max: 20 }, // 매우 긴 회수기간
      testName: "극한값 - 과대투자"
    }
  },
  {
    name: "경계값 테스트 1: 최저 이자율",
    inputs: {
      initialInvestment: 10,
      annualRevenue: 15,
      operatingMargin: 20,
      discountRate: 0.1,         // 0.1% 최저 이자율
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
      npv: { min: 15, max: 25 },        // 높은 NPV
      irr: { min: 15, max: 25 },        // 안정적 IRR
      paybackPeriod: { min: 3, max: 5 }, // 적정 회수기간
      testName: "경계값 - 최저 이자율"
    }
  },
  {
    name: "경계값 테스트 2: 최고 이자율",
    inputs: {
      initialInvestment: 10,
      annualRevenue: 15,
      operatingMargin: 20,
      discountRate: 15,          // 15% 최고 이자율
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
      npv: { min: -5, max: 5 },         // 낮은 NPV
      irr: { min: 15, max: 25 },        // IRR은 유지
      paybackPeriod: { min: 3, max: 5 }, // 회수기간 유지
      testName: "경계값 - 최고 이자율"
    }
  }
];

// 계산 함수들 (수정된 버전)
const calculateNPV = (cashFlows, discountRate) => {
  return cashFlows.reduce((npv, cashFlow, index) => {
    return npv + cashFlow / Math.pow(1 + discountRate / 100, index);
  }, 0);
};

const calculateIRR = (cashFlows) => {
  // 입력 검증
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
const runAdvancedTest = (testCase) => {
  const { inputs, expectedResults } = testCase;
  
  console.log(`\n🧪 ${testCase.name}`);
  console.log('=' .repeat(70));
  
  // 현금흐름 계산 (단순화된 버전)
  const initial = inputs.initialInvestment;
  const revenue = inputs.annualRevenue;
  const costs = revenue * (1 - inputs.operatingMargin / 100);
  
  const cashFlows = [-initial];
  
  for (let year = 1; year <= inputs.analysisYears; year++) {
    // 기본 현금흐름: 매출 - 비용 - 감가상각 - 세금
    const yearlyRevenue = revenue * Math.pow(1 + inputs.revenueGrowthRate / 100, year - 1);
    const yearlyCosts = costs * Math.pow(1 + inputs.costInflationRate / 100, year - 1);
    const depreciation = initial * (inputs.depreciationRate / 100);
    
    const ebitda = yearlyRevenue - yearlyCosts;
    const ebit = ebitda - depreciation;
    
    // 세후이익 (법인세 25%)
    const tax = Math.max(0, ebit * 0.25);
    const netIncome = ebit - tax;
    
    // 자유현금흐름
    const freeCashFlow = netIncome + depreciation;
    
    cashFlows.push(freeCashFlow);
  }
  
  // 주요 지표 계산
  const npv = calculateNPV(cashFlows, inputs.discountRate);
  const irr = calculateIRR(cashFlows);
  const paybackPeriod = calculatePaybackPeriod(cashFlows);
  
  // 결과 출력
  console.log('\n📊 계산 결과:');
  console.log(`NPV: ${npv.toFixed(2)}억원`);
  console.log(`IRR: ${irr.toFixed(2)}%`);
  console.log(`회수기간: ${paybackPeriod.toFixed(2)}년`);
  
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
  
  // 성능 테스트
  const startTime = Date.now();
  for (let i = 0; i < 100; i++) {
    calculateNPV(cashFlows, inputs.discountRate);
    calculateIRR(cashFlows);
    calculatePaybackPeriod(cashFlows);
  }
  const endTime = Date.now();
  const avgTime = (endTime - startTime) / 100;
  
  console.log(`⏱️ 계산 속도: ${avgTime.toFixed(2)}ms (평균 100회)`);
  console.log(`🚀 속도 테스트: ${avgTime < 10 ? '✅ 통과 (1초 내)' : '❌ 실패 (1초 초과)'}`);
  
  return {
    testCase: testCase.name,
    results: { npv, irr, paybackPeriod },
    accuracy: parseFloat(accuracy),
    avgTime,
    passed: passedChecks,
    total: totalChecks.length
  };
};

// 전체 테스트 실행
console.log('🚀 정책자금투자분석기 추가 심층 테스트 시작');
console.log('=' .repeat(80));

const testResults = [];
let totalAccuracy = 0;
let totalTime = 0;

testCases.forEach(testCase => {
  const result = runAdvancedTest(testCase);
  testResults.push(result);
  totalAccuracy += result.accuracy;
  totalTime += result.avgTime;
});

// 전체 결과 요약
console.log('\n🎯 전체 테스트 결과 요약');
console.log('=' .repeat(80));

testResults.forEach(result => {
  console.log(`${result.testCase}: ${result.accuracy}% (${result.passed}/${result.total}) - ${result.avgTime.toFixed(2)}ms`);
});

const overallAccuracy = (totalAccuracy / testCases.length).toFixed(1);
const avgTime = (totalTime / testCases.length).toFixed(2);

console.log(`\n📊 전체 알고리즘 정확도: ${overallAccuracy}%`);
console.log(`⏱️ 평균 계산 속도: ${avgTime}ms`);

// 성능 등급 평가
console.log('\n🏆 성능 등급 평가:');
if (parseFloat(overallAccuracy) >= 90 && parseFloat(avgTime) < 10) {
  console.log('🥇 A급: 높은 정확도와 빠른 속도');
} else if (parseFloat(overallAccuracy) >= 80 && parseFloat(avgTime) < 50) {
  console.log('🥈 B급: 양호한 정확도와 적절한 속도');
} else if (parseFloat(overallAccuracy) >= 70) {
  console.log('🥉 C급: 보통 정확도, 속도 개선 필요');
} else {
  console.log('❌ D급: 정확도와 속도 모두 개선 필요');
}

// 개선 권장사항
console.log('\n💡 개선 권장사항:');
if (parseFloat(overallAccuracy) < 80) {
  console.log('🔧 정확도 개선 필요:');
  console.log('   - 현금흐름 계산 로직 재검토');
  console.log('   - 업종별 특성 반영 계수 조정');
  console.log('   - 극한값 처리 로직 강화');
}

if (parseFloat(avgTime) > 50) {
  console.log('⚡ 성능 개선 필요:');
  console.log('   - 계산 알고리즘 최적화');
  console.log('   - 불필요한 반복 계산 제거');
  console.log('   - 캐싱 메커니즘 도입');
}

console.log('\n�� 추가 심층 테스트 완료!'); 