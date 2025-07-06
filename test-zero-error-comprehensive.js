// 정책자금투자분석기 무오류(Zero Error) 달성을 위한 포괄적 검증 테스트
// 목표: 모든 가능한 오류 상황을 찾아내고 검증

console.log('🎯 정책자금투자분석기 무오류(Zero Error) 포괄적 검증 테스트 시작');
console.log('=' .repeat(80));

// 기본 계산 함수들 (실제 컴포넌트와 동일)
const calculateDetailedCashFlow = (inputs) => {
  const initial = parseFloat(inputs.initialInvestment) || 0;
  const revenue = parseFloat(inputs.annualRevenue) || 0;
  const costs = inputs.isAutoCalculationMode ? 
    revenue * (1 - (parseFloat(inputs.operatingMargin) || 0) / 100) : 
    parseFloat(inputs.annualCosts) || 0;
  
  const cashFlows = [-initial];
  const yearlyData = [];
  let cumulativeWorkingCapital = 0;
  
  for (let year = 1; year <= (inputs.analysisYears || 10); year++) {
    // 매출성장률 적용
    const yearlyRevenue = revenue * Math.pow(1 + (inputs.revenueGrowthRate || 0) / 100, year - 1);
    
    // 비용상승률 적용
    const yearlyCosts = costs * Math.pow(1 + (inputs.costInflationRate || 0) / 100, year - 1);
    
    // 운전자본 변화 계산
    const requiredWorkingCapital = yearlyRevenue * ((inputs.workingCapitalRatio || 0) / 100);
    const workingCapitalChange = requiredWorkingCapital - cumulativeWorkingCapital;
    cumulativeWorkingCapital = requiredWorkingCapital;
    
    // 감가상각비 계산
    const depreciation = initial * ((inputs.depreciationRate || 0) / 100);
    
    // EBITDA, EBIT 계산
    const ebitda = yearlyRevenue - yearlyCosts;
    const ebit = ebitda - depreciation;
    
    // 이자비용 계산
    const debtAmount = initial * ((inputs.debtRatio || 0) / 100);
    const remainingDebt = Math.max(0, debtAmount - (debtAmount / (inputs.analysisYears || 10)) * (year - 1));
    const interestExpense = remainingDebt * ((inputs.loanInterestRate || 0) / 100);
    
    // 세전이익
    const ebt = ebit - interestExpense;
    
    // 법인세
    const tax = Math.max(0, ebt * 0.25);
    const netIncome = ebt - tax;
    
    // 자유현금흐름 계산
    let freeCashFlow = netIncome + depreciation - workingCapitalChange;
    
    // 마지막 연도에 잔존가치와 운전자본 회수
    if (year === (inputs.analysisYears || 10)) {
      const residualValue = initial * ((inputs.residualValueRate || 0) / 100);
      freeCashFlow += residualValue + cumulativeWorkingCapital;
    }
    
    // 최소 현금흐름 보장
    freeCashFlow = Math.max(freeCashFlow, netIncome * 0.1);
    
    // DSCR 계산
    const annualDebtService = (debtAmount / (inputs.analysisYears || 10)) + interestExpense;
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

const calculateNPV = (cashFlows, discountRate) => {
  try {
    return cashFlows.reduce((npv, cashFlow, index) => {
      const factor = Math.pow(1 + (discountRate || 0) / 100, index);
      if (!isFinite(factor) || factor === 0) return npv;
      return npv + (cashFlow || 0) / factor;
    }, 0);
  } catch (error) {
    console.error('NPV 계산 오류:', error);
    return 0;
  }
};

const calculateIRR = (cashFlows) => {
  try {
    if (!Array.isArray(cashFlows) || cashFlows.length < 2) return 0;
    
    const positiveFlows = cashFlows.filter(cf => cf > 0);
    const negativeFlows = cashFlows.filter(cf => cf < 0);
    
    if (positiveFlows.length === 0 || negativeFlows.length === 0) return 0;
    
    const maxIterations = 1000;
    const tolerance = 0.000001;
    let rate = 0.1;
    
    for (let i = 0; i < maxIterations; i++) {
      let npv = 0;
      let derivative = 0;
      
      for (let year = 0; year < cashFlows.length; year++) {
        const factor = Math.pow(1 + rate, year);
        if (!isFinite(factor) || factor === 0) return 0;
        
        npv += (cashFlows[year] || 0) / factor;
        if (year > 0) {
          derivative -= (year * (cashFlows[year] || 0)) / Math.pow(1 + rate, year + 1);
        }
      }
      
      if (Math.abs(npv) < tolerance) break;
      if (Math.abs(derivative) < tolerance) break;
      
      let newRate = rate - npv / derivative;
      
      if (!isFinite(newRate) || isNaN(newRate)) break;
      if (newRate < -0.95) newRate = -0.95;
      if (newRate > 5) newRate = 5;
      
      if (Math.abs(newRate - rate) < tolerance) break;
      
      rate = newRate;
    }
    
    if (isNaN(rate) || !isFinite(rate)) return 0;
    
    return Math.max(-95, Math.min(500, rate * 100));
  } catch (error) {
    console.error('IRR 계산 오류:', error);
    return 0;
  }
};

const calculateAvgDSCR = (yearlyData) => {
  try {
    if (!Array.isArray(yearlyData) || yearlyData.length === 0) return 0;
    
    const validDSCRs = yearlyData
      .filter(data => data && typeof data.dscr === 'number' && isFinite(data.dscr) && data.dscr > 0)
      .map(data => data.dscr);
    
    return validDSCRs.length > 0 ? 
      validDSCRs.reduce((sum, dscr) => sum + dscr, 0) / validDSCRs.length : 0;
  } catch (error) {
    console.error('DSCR 계산 오류:', error);
    return 0;
  }
};

// 포괄적 오류 테스트 케이스들
const errorTestCases = [
  {
    category: '1. 입력 검증 오류',
    tests: [
      {
        name: '빈 값 입력',
        inputs: {
          initialInvestment: '',
          annualRevenue: '',
          operatingMargin: '',
          discountRate: '',
          analysisYears: ''
        },
        expectedError: false,
        description: '모든 필드가 빈 값일 때 기본값 처리'
      },
      {
        name: '음수 값 입력',
        inputs: {
          initialInvestment: -10,
          annualRevenue: -20,
          operatingMargin: -15,
          discountRate: -5,
          analysisYears: -3
        },
        expectedError: false,
        description: '음수 입력값에 대한 처리'
      },
      {
        name: '극대값 입력',
        inputs: {
          initialInvestment: 999999,
          annualRevenue: 999999,
          operatingMargin: 100,
          discountRate: 100,
          analysisYears: 50
        },
        expectedError: false,
        description: '극대값 입력에 대한 처리'
      },
      {
        name: '0 값 입력',
        inputs: {
          initialInvestment: 0,
          annualRevenue: 0,
          operatingMargin: 0,
          discountRate: 0,
          analysisYears: 0
        },
        expectedError: false,
        description: '0 값 입력에 대한 처리'
      },
      {
        name: '문자열 입력',
        inputs: {
          initialInvestment: 'abc',
          annualRevenue: 'def',
          operatingMargin: 'ghi',
          discountRate: 'jkl',
          analysisYears: 'mno'
        },
        expectedError: false,
        description: '숫자가 아닌 값 입력에 대한 처리'
      }
    ]
  },
  {
    category: '2. 계산 로직 오류',
    tests: [
      {
        name: '매출보다 큰 비용',
        inputs: {
          initialInvestment: 10,
          annualRevenue: 10,
          operatingMargin: -50, // 음수 마진으로 비용이 매출보다 큼
          discountRate: 8,
          analysisYears: 10
        },
        expectedError: false,
        description: '비용이 매출을 초과하는 경우'
      },
      {
        name: '100% 부채비율',
        inputs: {
          initialInvestment: 10,
          annualRevenue: 20,
          operatingMargin: 25,
          discountRate: 8,
          analysisYears: 10,
          debtRatio: 100,
          loanInterestRate: 5
        },
        expectedError: false,
        description: '100% 부채 투자'
      },
      {
        name: '매우 높은 할인율',
        inputs: {
          initialInvestment: 10,
          annualRevenue: 20,
          operatingMargin: 25,
          discountRate: 50,
          analysisYears: 10
        },
        expectedError: false,
        description: '50% 할인율'
      },
      {
        name: '매우 긴 분석기간',
        inputs: {
          initialInvestment: 10,
          annualRevenue: 20,
          operatingMargin: 25,
          discountRate: 8,
          analysisYears: 100
        },
        expectedError: false,
        description: '100년 분석기간'
      }
    ]
  },
  {
    category: '3. 극한 시나리오 오류',
    tests: [
      {
        name: '하이퍼인플레이션',
        inputs: {
          initialInvestment: 10,
          annualRevenue: 20,
          operatingMargin: 25,
          discountRate: 8,
          analysisYears: 10,
          revenueGrowthRate: 50,
          costInflationRate: 100
        },
        expectedError: false,
        description: '매출 50% 성장, 비용 100% 상승'
      },
      {
        name: '디플레이션',
        inputs: {
          initialInvestment: 10,
          annualRevenue: 20,
          operatingMargin: 25,
          discountRate: 8,
          analysisYears: 10,
          revenueGrowthRate: -20,
          costInflationRate: -10
        },
        expectedError: false,
        description: '매출 20% 감소, 비용 10% 감소'
      },
      {
        name: '극한 운전자본',
        inputs: {
          initialInvestment: 10,
          annualRevenue: 20,
          operatingMargin: 25,
          discountRate: 8,
          analysisYears: 10,
          workingCapitalRatio: 200
        },
        expectedError: false,
        description: '매출액의 200% 운전자본'
      },
      {
        name: '극한 감가상각',
        inputs: {
          initialInvestment: 10,
          annualRevenue: 20,
          operatingMargin: 25,
          discountRate: 8,
          analysisYears: 10,
          depreciationRate: 50
        },
        expectedError: false,
        description: '연간 50% 감가상각'
      }
    ]
  },
  {
    category: '4. 수학적 오류',
    tests: [
      {
        name: '0으로 나누기 위험',
        inputs: {
          initialInvestment: 10,
          annualRevenue: 20,
          operatingMargin: 25,
          discountRate: 0,
          analysisYears: 10,
          debtRatio: 0,
          loanInterestRate: 0
        },
        expectedError: false,
        description: '할인율 0%, 부채비율 0%'
      },
      {
        name: 'IRR 수렴 실패',
        inputs: {
          initialInvestment: 1000,
          annualRevenue: 1,
          operatingMargin: 1,
          discountRate: 8,
          analysisYears: 10
        },
        expectedError: false,
        description: '매우 낮은 수익률로 IRR 수렴 어려움'
      },
      {
        name: 'NPV 오버플로우',
        inputs: {
          initialInvestment: 1,
          annualRevenue: 999999,
          operatingMargin: 99,
          discountRate: 0.1,
          analysisYears: 50
        },
        expectedError: false,
        description: 'NPV 값이 매우 클 때'
      }
    ]
  },
  {
    category: '5. 데이터 타입 오류',
    tests: [
      {
        name: 'undefined 입력',
        inputs: {
          initialInvestment: undefined,
          annualRevenue: undefined,
          operatingMargin: undefined,
          discountRate: undefined,
          analysisYears: undefined
        },
        expectedError: false,
        description: 'undefined 값 처리'
      },
      {
        name: 'null 입력',
        inputs: {
          initialInvestment: null,
          annualRevenue: null,
          operatingMargin: null,
          discountRate: null,
          analysisYears: null
        },
        expectedError: false,
        description: 'null 값 처리'
      },
      {
        name: 'NaN 입력',
        inputs: {
          initialInvestment: NaN,
          annualRevenue: NaN,
          operatingMargin: NaN,
          discountRate: NaN,
          analysisYears: NaN
        },
        expectedError: false,
        description: 'NaN 값 처리'
      },
      {
        name: 'Infinity 입력',
        inputs: {
          initialInvestment: Infinity,
          annualRevenue: Infinity,
          operatingMargin: Infinity,
          discountRate: Infinity,
          analysisYears: Infinity
        },
        expectedError: false,
        description: 'Infinity 값 처리'
      }
    ]
  }
];

// 테스트 실행 함수
const runErrorTest = (testCase) => {
  try {
    console.log(`\n🔍 테스트: ${testCase.name}`);
    console.log(`설명: ${testCase.description}`);
    
    // 기본값 설정
    const testInputs = {
      isAutoCalculationMode: true,
      revenueGrowthRate: 0,
      costInflationRate: 0,
      debtRatio: 0,
      loanInterestRate: 0,
      workingCapitalRatio: 0,
      depreciationRate: 10,
      residualValueRate: 0,
      ...testCase.inputs
    };
    
    // 계산 실행
    const { cashFlows, yearlyData } = calculateDetailedCashFlow(testInputs);
    const npv = calculateNPV(cashFlows, testInputs.discountRate);
    const irr = calculateIRR(cashFlows);
    const avgDscr = calculateAvgDSCR(yearlyData);
    
    // 결과 검증
    const hasNaN = isNaN(npv) || isNaN(irr) || isNaN(avgDscr);
    const hasInfinity = !isFinite(npv) || !isFinite(irr) || !isFinite(avgDscr);
    const hasError = hasNaN || hasInfinity;
    
    console.log(`결과: NPV=${npv.toFixed(2)}, IRR=${irr.toFixed(2)}%, DSCR=${avgDscr.toFixed(2)}`);
    console.log(`오류 검사: ${hasError ? '❌ 오류 발생' : '✅ 정상'}`);
    
    if (hasError) {
      console.log(`오류 상세: NaN=${hasNaN}, Infinity=${hasInfinity}`);
    }
    
    return {
      testName: testCase.name,
      hasError,
      npv,
      irr,
      avgDscr,
      details: { hasNaN, hasInfinity }
    };
    
  } catch (error) {
    console.log(`❌ 예외 발생: ${error.message}`);
    return {
      testName: testCase.name,
      hasError: true,
      error: error.message,
      npv: 0,
      irr: 0,
      avgDscr: 0
    };
  }
};

// 전체 테스트 실행
let totalTests = 0;
let passedTests = 0;
let failedTests = [];

errorTestCases.forEach(category => {
  console.log(`\n🔬 ${category.category}`);
  console.log('=' .repeat(60));
  
  category.tests.forEach(test => {
    totalTests++;
    const result = runErrorTest(test);
    
    if (!result.hasError) {
      passedTests++;
    } else {
      failedTests.push({
        category: category.category,
        test: result.testName,
        error: result.error || result.details
      });
    }
  });
});

// 최종 결과 요약
console.log('\n🎯 무오류 검증 결과 요약');
console.log('=' .repeat(80));

const errorRate = ((totalTests - passedTests) / totalTests * 100).toFixed(1);
const successRate = (passedTests / totalTests * 100).toFixed(1);

console.log(`총 테스트: ${totalTests}개`);
console.log(`성공: ${passedTests}개`);
console.log(`실패: ${totalTests - passedTests}개`);
console.log(`성공률: ${successRate}%`);
console.log(`오류율: ${errorRate}%`);

if (failedTests.length > 0) {
  console.log('\n❌ 발견된 오류들:');
  failedTests.forEach((fail, index) => {
    console.log(`${index + 1}. [${fail.category}] ${fail.test}`);
    if (fail.error) {
      console.log(`   오류: ${fail.error}`);
    }
  });
}

// 무오류 달성 평가
console.log('\n🏆 무오류 달성 평가:');
if (passedTests === totalTests) {
  console.log('🎉 축하합니다! 무오류(Zero Error) 목표 달성!');
  console.log('✅ 모든 테스트 케이스를 통과했습니다.');
  console.log('✅ 정책자금투자분석기가 안정적으로 작동합니다.');
} else if (successRate >= 95) {
  console.log('🥇 거의 달성! 95% 이상 성공률');
  console.log('⚠️ 일부 극한 상황에서 오류 발생');
  console.log('🔧 미세 조정으로 무오류 달성 가능');
} else if (successRate >= 90) {
  console.log('🥈 양호한 수준! 90% 이상 성공률');
  console.log('⚠️ 몇 가지 오류 패턴 발견');
  console.log('🔧 추가 개선 작업 필요');
} else {
  console.log('🥉 개선 필요! 90% 미만 성공률');
  console.log('❌ 다수의 오류 발견');
  console.log('🔧 대폭적인 개선 작업 필요');
}

// 개선 권장사항
console.log('\n💡 개선 권장사항:');
if (failedTests.length > 0) {
  const errorCategories = [...new Set(failedTests.map(f => f.category))];
  errorCategories.forEach(category => {
    const categoryErrors = failedTests.filter(f => f.category === category);
    console.log(`🔧 ${category}: ${categoryErrors.length}개 오류 수정 필요`);
  });
} else {
  console.log('✅ 현재 상태에서 추가 개선사항 없음');
  console.log('✅ 정기적인 회귀 테스트 권장');
  console.log('✅ 새로운 기능 추가 시 테스트 확장 권장');
}

console.log('\n🎯 무오류 포괄적 검증 테스트 완료!'); 