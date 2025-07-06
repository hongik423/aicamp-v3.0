// 정책자금투자분석기 계산 알고리즘 정확도 심층 진단 테스트
const testCases = [
  {
    name: "제조업 중소기업 - 스마트팩토리 도입",
    inputs: {
      initialInvestment: 50,      // 50억원
      annualRevenue: 80,          // 80억원
      operatingMargin: 25,        // 25% 영업이익률
      discountRate: 8.5,          // 8.5% 할인율
      analysisYears: 10,          // 10년 분석
      revenueGrowthRate: 5,       // 5% 매출성장률
      costInflationRate: 3,       // 3% 비용상승률
      debtRatio: 60,              // 60% 부채비율
      loanInterestRate: 4.5,      // 4.5% 대출금리
      workingCapitalRatio: 10,    // 10% 운전자본비율
      depreciationRate: 10,       // 10% 감가상각률
      residualValueRate: 20       // 20% 잔존가치율
    },
    expectedResults: {
      npv: { min: 15, max: 25 },          // 예상 NPV 범위 (억원)
      irr: { min: 15, max: 20 },          // 예상 IRR 범위 (%)
      paybackPeriod: { min: 4, max: 6 },  // 예상 회수기간 (년)
      dscr: { min: 1.8, max: 2.5 },       // 예상 DSCR 범위
      pi: { min: 1.3, max: 1.6 },         // 예상 PI 범위
      grade: ['A', 'AA', 'AAA']           // 예상 투자등급
    }
  },
  {
    name: "IT서비스업 - 디지털 플랫폼 구축",
    inputs: {
      initialInvestment: 30,      // 30억원
      annualRevenue: 60,          // 60억원
      operatingMargin: 35,        // 35% 영업이익률 (IT업종 특성)
      discountRate: 10,           // 10% 할인율 (높은 위험)
      analysisYears: 8,           // 8년 분석
      revenueGrowthRate: 15,      // 15% 매출성장률 (IT업종 특성)
      costInflationRate: 4,       // 4% 비용상승률
      debtRatio: 40,              // 40% 부채비율 (낮은 부채)
      loanInterestRate: 5,        // 5% 대출금리
      workingCapitalRatio: 5,     // 5% 운전자본비율
      depreciationRate: 20,       // 20% 감가상각률 (IT자산 특성)
      residualValueRate: 10       // 10% 잔존가치율
    },
    expectedResults: {
      npv: { min: 25, max: 40 },          // 예상 NPV 범위 (억원)
      irr: { min: 20, max: 30 },          // 예상 IRR 범위 (%)
      paybackPeriod: { min: 3, max: 5 },  // 예상 회수기간 (년)
      dscr: { min: 2.5, max: 4.0 },       // 예상 DSCR 범위
      pi: { min: 1.8, max: 2.5 },         // 예상 PI 범위
      grade: ['AA', 'AAA', 'S']           // 예상 투자등급
    }
  },
  {
    name: "음식료품업 - 자동화 생산라인 구축",
    inputs: {
      initialInvestment: 40,      // 40억원
      annualRevenue: 70,          // 70억원
      operatingMargin: 15,        // 15% 영업이익률 (낮은 마진)
      discountRate: 7,            // 7% 할인율 (안정적 업종)
      analysisYears: 12,          // 12년 분석
      revenueGrowthRate: 3,       // 3% 매출성장률 (안정적 성장)
      costInflationRate: 2.5,     // 2.5% 비용상승률
      debtRatio: 70,              // 70% 부채비율 (높은 부채)
      loanInterestRate: 4,        // 4% 대출금리
      workingCapitalRatio: 15,    // 15% 운전자본비율
      depreciationRate: 8,        // 8% 감가상각률
      residualValueRate: 25       // 25% 잔존가치율
    },
    expectedResults: {
      npv: { min: 5, max: 15 },           // 예상 NPV 범위 (억원)
      irr: { min: 10, max: 15 },          // 예상 IRR 범위 (%)
      paybackPeriod: { min: 6, max: 8 },  // 예상 회수기간 (년)
      dscr: { min: 1.2, max: 1.8 },       // 예상 DSCR 범위
      pi: { min: 1.1, max: 1.4 },         // 예상 PI 범위
      grade: ['BBB', 'A', 'AA']           // 예상 투자등급
    }
  },
  {
    name: "부실투자 시나리오 - 과도한 투자",
    inputs: {
      initialInvestment: 100,     // 100억원 (과도한 투자)
      annualRevenue: 60,          // 60억원 (낮은 매출)
      operatingMargin: 8,         // 8% 영업이익률 (매우 낮은 마진)
      discountRate: 12,           // 12% 할인율 (높은 위험)
      analysisYears: 10,          // 10년 분석
      revenueGrowthRate: 1,       // 1% 매출성장률 (저성장)
      costInflationRate: 5,       // 5% 비용상승률 (높은 인플레이션)
      debtRatio: 80,              // 80% 부채비율 (과도한 부채)
      loanInterestRate: 6,        // 6% 대출금리
      workingCapitalRatio: 20,    // 20% 운전자본비율
      depreciationRate: 10,       // 10% 감가상각률
      residualValueRate: 10       // 10% 잔존가치율
    },
    expectedResults: {
      npv: { min: -50, max: -10 },        // 예상 NPV 범위 (억원) - 음수
      irr: { min: 0, max: 5 },            // 예상 IRR 범위 (%) - 매우 낮음
      paybackPeriod: { min: 15, max: 20 }, // 예상 회수기간 (년) - 매우 길거나 불가능
      dscr: { min: 0.5, max: 1.0 },       // 예상 DSCR 범위 - 위험
      pi: { min: 0.7, max: 0.9 },         // 예상 PI 범위 - 1 미만
      grade: ['C', 'BB', 'BBB']           // 예상 투자등급 - 낮음
    }
  }
];

// 계산 함수들 (실제 컴포넌트에서 사용하는 것과 동일)
const calculateNPV = (cashFlows, discountRate) => {
  return cashFlows.reduce((npv, cashFlow, index) => {
    return npv + cashFlow / Math.pow(1 + discountRate / 100, index);
  }, 0);
};

const calculateIRR = (cashFlows) => {
  const maxIterations = 1000;
  const tolerance = 1e-6;
  let rate = 0.1; // 초기 추정값 10%
  
  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let derivative = 0;
    
    for (let j = 0; j < cashFlows.length; j++) {
      const factor = Math.pow(1 + rate, j);
      npv += cashFlows[j] / factor;
      derivative -= j * cashFlows[j] / (factor * (1 + rate));
    }
    
    if (Math.abs(npv) < tolerance) break;
    
    const newRate = rate - npv / derivative;
    if (Math.abs(newRate - rate) < tolerance) break;
    
    rate = newRate;
  }
  
  return rate * 100;
};

const calculatePaybackPeriod = (cashFlows) => {
  let cumulativeCashFlow = 0;
  
  for (let i = 1; i < cashFlows.length; i++) {
    cumulativeCashFlow += cashFlows[i];
    if (cumulativeCashFlow >= Math.abs(cashFlows[0])) {
      const previousCumulative = cumulativeCashFlow - cashFlows[i];
      const fraction = (Math.abs(cashFlows[0]) - previousCumulative) / cashFlows[i];
      return i - 1 + fraction;
    }
  }
  
  return cashFlows.length;
};

const calculateDSCR = (annualCashFlow, initialInvestment, debtRatio, loanInterestRate) => {
  const debtAmount = initialInvestment * (debtRatio / 100);
  const annualInterest = debtAmount * (loanInterestRate / 100);
  const annualPrincipal = debtAmount / 10; // 10년 원금균등상환 가정
  const annualDebtService = annualInterest + annualPrincipal;
  
  if (annualDebtService <= 0) return 0;
  return Math.max(0, annualCashFlow / annualDebtService);
};

const calculatePI = (presentValueOfCashFlows, initialInvestment) => {
  return presentValueOfCashFlows / initialInvestment;
};

const getInvestmentGrade = (npv, irr, pi, dscr) => {
  let score = 0;
  
  // NPV 점수 (40점 만점)
  if (npv > 50) score += 40;
  else if (npv > 30) score += 35;
  else if (npv > 20) score += 30;
  else if (npv > 10) score += 25;
  else if (npv > 5) score += 20;
  else if (npv > 0) score += 15;
  else score += 0;
  
  // IRR 점수 (30점 만점)
  if (irr > 25) score += 30;
  else if (irr > 20) score += 25;
  else if (irr > 15) score += 20;
  else if (irr > 12) score += 15;
  else if (irr > 10) score += 10;
  else if (irr > 8) score += 5;
  else score += 0;
  
  // PI 점수 (15점 만점)
  if (pi > 2.0) score += 15;
  else if (pi > 1.5) score += 12;
  else if (pi > 1.3) score += 10;
  else if (pi > 1.2) score += 8;
  else if (pi > 1.1) score += 5;
  else if (pi > 1.0) score += 3;
  else score += 0;
  
  // DSCR 점수 (15점 만점)
  if (dscr > 3.0) score += 15;
  else if (dscr > 2.5) score += 12;
  else if (dscr > 2.0) score += 10;
  else if (dscr > 1.5) score += 8;
  else if (dscr > 1.2) score += 5;
  else if (dscr > 1.0) score += 3;
  else score += 0;
  
  // 등급 결정
  if (score >= 90) return 'S';
  else if (score >= 85) return 'AAA';
  else if (score >= 80) return 'AA';
  else if (score >= 75) return 'A';
  else if (score >= 70) return 'BBB';
  else if (score >= 65) return 'BB';
  else if (score >= 60) return 'B';
  else return 'C';
};

// 테스트 실행 함수
const runCalculationTest = (testCase) => {
  const { inputs, expectedResults } = testCase;
  
  console.log(`\n🧪 테스트 케이스: ${testCase.name}`);
  console.log('=' .repeat(60));
  
  // 연도별 데이터 계산
  const yearlyData = [];
  const cashFlows = [-inputs.initialInvestment]; // 초기 투자 (음수)
  
  // 실제 매출과 비용 계산
  const annualRevenue = inputs.annualRevenue;
  const annualCosts = inputs.annualRevenue * (1 - inputs.operatingMargin / 100);
  
  let totalWorkingCapital = 0;
  
  for (let year = 1; year <= inputs.analysisYears; year++) {
    // 매출 계산 (성장률 적용)
    const revenue = annualRevenue * Math.pow(1 + inputs.revenueGrowthRate / 100, year - 1);
    
    // 비용 계산 (상승률 적용)
    const cost = annualCosts * Math.pow(1 + inputs.costInflationRate / 100, year - 1);
    
    // 운전자본 계산 (간소화)
    const currentWorkingCapital = revenue * (inputs.workingCapitalRatio / 100);
    const workingCapitalChange = year === 1 ? 
      currentWorkingCapital : 
      currentWorkingCapital - totalWorkingCapital;
    totalWorkingCapital = currentWorkingCapital;
    
    // 감가상각비
    const depreciation = inputs.initialInvestment * (inputs.depreciationRate / 100);
    
    // EBITDA, EBIT 계산
    const ebitda = revenue - cost;
    const ebit = ebitda - depreciation;
    
    // 이자비용 계산
    const debtAmount = inputs.initialInvestment * (inputs.debtRatio / 100);
    const interestExpense = debtAmount * (inputs.loanInterestRate / 100);
    
    // 세전이익
    const ebt = ebit - interestExpense;
    
    // 세후이익 (법인세 25% 가정)
    const tax = Math.max(0, ebt * 0.25);
    const netIncome = ebt - tax;
    
    // 현금흐름 계산 (순이익 + 감가상각 - 운전자본 변화)
    let cashFlow = netIncome + depreciation - workingCapitalChange;
    
    // 잔존가치 (마지막 년도에 추가)
    if (year === inputs.analysisYears) {
      const residualValue = inputs.initialInvestment * (inputs.residualValueRate / 100);
      cashFlow += residualValue + totalWorkingCapital; // 운전자본 전액 회수
    }
    
    cashFlows.push(cashFlow);
    
    // DSCR 계산
    const dscr = calculateDSCR(cashFlow + depreciation, inputs.initialInvestment, inputs.debtRatio, inputs.loanInterestRate);
    
    yearlyData.push({
      year,
      revenue: revenue.toFixed(1),
      cost: cost.toFixed(1),
      netIncome: netIncome.toFixed(1),
      cashFlow: cashFlow.toFixed(1),
      dscr: dscr.toFixed(2)
    });
  }
  
  // 주요 지표 계산
  const npv = calculateNPV(cashFlows, inputs.discountRate);
  const irr = calculateIRR(cashFlows);
  const paybackPeriod = calculatePaybackPeriod(cashFlows);
  const dscr = calculateDSCR(cashFlows[1], inputs.initialInvestment, inputs.debtRatio, inputs.loanInterestRate);
  const presentValueOfCashFlows = calculateNPV(cashFlows.slice(1), inputs.discountRate);
  const pi = calculatePI(presentValueOfCashFlows, inputs.initialInvestment);
  const grade = getInvestmentGrade(npv, irr, pi, dscr);
  
  // 결과 출력
  console.log('\n📊 계산 결과:');
  console.log(`NPV: ${npv.toFixed(2)}억원`);
  console.log(`IRR: ${irr.toFixed(2)}%`);
  console.log(`회수기간: ${paybackPeriod.toFixed(2)}년`);
  console.log(`DSCR: ${dscr.toFixed(2)}`);
  console.log(`PI: ${pi.toFixed(2)}`);
  console.log(`투자등급: ${grade}`);
  
  // 정확도 검증
  console.log('\n🎯 정확도 검증:');
  
  const npvCheck = npv >= expectedResults.npv.min && npv <= expectedResults.npv.max;
  const irrCheck = irr >= expectedResults.irr.min && irr <= expectedResults.irr.max;
  const paybackCheck = paybackPeriod >= expectedResults.paybackPeriod.min && paybackPeriod <= expectedResults.paybackPeriod.max;
  const dscrCheck = dscr >= expectedResults.dscr.min && dscr <= expectedResults.dscr.max;
  const piCheck = pi >= expectedResults.pi.min && pi <= expectedResults.pi.max;
  const gradeCheck = expectedResults.grade.includes(grade);
  
  console.log(`NPV 정확도: ${npvCheck ? '✅' : '❌'} (예상: ${expectedResults.npv.min}~${expectedResults.npv.max}억원)`);
  console.log(`IRR 정확도: ${irrCheck ? '✅' : '❌'} (예상: ${expectedResults.irr.min}~${expectedResults.irr.max}%)`);
  console.log(`회수기간 정확도: ${paybackCheck ? '✅' : '❌'} (예상: ${expectedResults.paybackPeriod.min}~${expectedResults.paybackPeriod.max}년)`);
  console.log(`DSCR 정확도: ${dscrCheck ? '✅' : '❌'} (예상: ${expectedResults.dscr.min}~${expectedResults.dscr.max})`);
  console.log(`PI 정확도: ${piCheck ? '✅' : '❌'} (예상: ${expectedResults.pi.min}~${expectedResults.pi.max})`);
  console.log(`투자등급 정확도: ${gradeCheck ? '✅' : '❌'} (예상: ${expectedResults.grade.join(', ')})`);
  
  const totalChecks = [npvCheck, irrCheck, paybackCheck, dscrCheck, piCheck, gradeCheck];
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
  console.log(`대출금리: ${inputs.loanInterestRate}%`);
  
  return {
    testCase: testCase.name,
    results: { npv, irr, paybackPeriod, dscr, pi, grade },
    accuracy: parseFloat(accuracy),
    passed: passedChecks,
    total: totalChecks.length
  };
};

// 전체 테스트 실행
console.log('🚀 정책자금투자분석기 계산 알고리즘 정확도 심층 진단 시작');
console.log('=' .repeat(80));

const testResults = [];
let totalAccuracy = 0;

testCases.forEach(testCase => {
  const result = runCalculationTest(testCase);
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

// 권장사항
console.log('\n💡 개선 권장사항:');
if (parseFloat(overallAccuracy) >= 90) {
  console.log('✅ 알고리즘이 매우 정확합니다. 현재 상태를 유지하세요.');
} else if (parseFloat(overallAccuracy) >= 80) {
  console.log('⚠️ 알고리즘이 대체로 정확하지만 일부 개선이 필요합니다.');
  console.log('   - 극단적인 시나리오에서의 계산 정확도 개선');
  console.log('   - 업종별 특성을 반영한 계수 조정');
} else {
  console.log('❌ 알고리즘 정확도가 낮습니다. 즉시 개선이 필요합니다.');
  console.log('   - 기본 계산 로직 재검토');
  console.log('   - 테스트 케이스 확대 및 검증 강화');
  console.log('   - 전문가 검토 필요');
}

console.log('\n🎉 테스트 완료!'); 