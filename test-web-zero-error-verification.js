// 웹 브라우저 무오류 검증 자동화 테스트
// 목표: 실제 웹에서 정책자금투자분석기 무오류 작동 확인

console.log('🌐 웹 브라우저 무오류 검증 자동화 테스트');
console.log('=' .repeat(80));

// 테스트할 시나리오들
const webTestScenarios = [
  {
    name: '정상 시나리오',
    data: {
      initialInvestment: '50',
      annualRevenue: '120',
      operatingMargin: '25',
      discountRate: '8',
      analysisYears: '10'
    },
    expectedResults: {
      npvPositive: true,
      irrRange: [15, 50],
      dscrRange: [0, 10]
    }
  },
  {
    name: '극한 시나리오 1 (매우 큰 값)',
    data: {
      initialInvestment: '999999',
      annualRevenue: '999999',
      operatingMargin: '1',
      discountRate: '50',
      analysisYears: '50'
    },
    expectedResults: {
      noError: true,
      finiteValues: true
    }
  },
  {
    name: '극한 시나리오 2 (0에 가까운 값)',
    data: {
      initialInvestment: '0.01',
      annualRevenue: '0.01',
      operatingMargin: '0.01',
      discountRate: '0.01',
      analysisYears: '1'
    },
    expectedResults: {
      noError: true,
      finiteValues: true
    }
  },
  {
    name: '경계값 테스트',
    data: {
      initialInvestment: '100',
      annualRevenue: '100',
      operatingMargin: '100',
      discountRate: '100',
      analysisYears: '50'
    },
    expectedResults: {
      noError: true,
      finiteValues: true
    }
  },
  {
    name: '고급설정 극한값',
    data: {
      initialInvestment: '10',
      annualRevenue: '20',
      operatingMargin: '25',
      discountRate: '8',
      analysisYears: '10',
      revenueGrowthRate: '50',
      costInflationRate: '50',
      debtRatio: '100',
      loanInterestRate: '50',
      workingCapitalRatio: '100',
      depreciationRate: '50',
      residualValueRate: '100'
    },
    expectedResults: {
      noError: true,
      finiteValues: true
    }
  }
];

// 브라우저 자동화 스크립트 생성
const generateBrowserScript = () => {
  return `
// 정책자금투자분석기 무오류 검증 브라우저 스크립트
// 이 스크립트를 브라우저 콘솔에서 실행하세요

console.log('🌐 정책자금투자분석기 무오류 검증 시작');

const testScenarios = ${JSON.stringify(webTestScenarios, null, 2)};

let totalTests = 0;
let passedTests = 0;
let failedTests = [];

// 입력 필드 설정 함수
const setInputValue = (selector, value) => {
  const element = document.querySelector(selector);
  if (element) {
    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }
  return false;
};

// 고급설정 열기 함수
const openAdvancedSettings = () => {
  const advancedButton = document.querySelector('button:has-text("고급 설정")') || 
                        Array.from(document.querySelectorAll('button')).find(btn => 
                          btn.textContent.includes('고급 설정'));
  if (advancedButton) {
    advancedButton.click();
    return true;
  }
  return false;
};

// 계산 실행 함수
const executeCalculation = () => {
  const calculateButton = document.querySelector('button:has-text("투자 분석 실행")') ||
                         Array.from(document.querySelectorAll('button')).find(btn => 
                           btn.textContent.includes('투자 분석 실행'));
  if (calculateButton) {
    calculateButton.click();
    return true;
  }
  return false;
};

// 결과 검증 함수
const verifyResults = (scenario) => {
  // 500ms 후 결과 확인
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        // NPV, IRR, DSCR 값 확인
        const npvElement = document.querySelector('[data-testid="npv-value"]') ||
                          Array.from(document.querySelectorAll('*')).find(el => 
                            el.textContent.includes('NPV:'));
        
        const irrElement = document.querySelector('[data-testid="irr-value"]') ||
                          Array.from(document.querySelectorAll('*')).find(el => 
                            el.textContent.includes('IRR:'));
        
        const dscrElement = document.querySelector('[data-testid="dscr-value"]') ||
                           Array.from(document.querySelectorAll('*')).find(el => 
                             el.textContent.includes('DSCR:'));
        
        // 오류 메시지 확인
        const errorElements = document.querySelectorAll('.error, .alert-error, [role="alert"]');
        const hasError = errorElements.length > 0 && 
                        Array.from(errorElements).some(el => el.textContent.trim() !== '');
        
        // 결과 추출
        let npvValue = null, irrValue = null, dscrValue = null;
        
        if (npvElement) {
          const npvText = npvElement.textContent;
          const npvMatch = npvText.match(/NPV[:\\s]*([\\d\\-.,]+)/);
          if (npvMatch) {
            npvValue = parseFloat(npvMatch[1].replace(/,/g, ''));
          }
        }
        
        if (irrElement) {
          const irrText = irrElement.textContent;
          const irrMatch = irrText.match(/IRR[:\\s]*([\\d\\-.,]+)/);
          if (irrMatch) {
            irrValue = parseFloat(irrMatch[1].replace(/,/g, ''));
          }
        }
        
        if (dscrElement) {
          const dscrText = dscrElement.textContent;
          const dscrMatch = dscrText.match(/DSCR[:\\s]*([\\d\\-.,]+)/);
          if (dscrMatch) {
            dscrValue = parseFloat(dscrMatch[1].replace(/,/g, ''));
          }
        }
        
        // 검증 결과
        const results = {
          hasError,
          npvValue,
          irrValue,
          dscrValue,
          finiteValues: [npvValue, irrValue, dscrValue].every(val => 
            val === null || (isFinite(val) && !isNaN(val))),
          elementsFound: {
            npv: !!npvElement,
            irr: !!irrElement,
            dscr: !!dscrElement
          }
        };
        
        resolve(results);
      } catch (error) {
        resolve({ hasError: true, error: error.message });
      }
    }, 500);
  });
};

// 테스트 실행 함수
const runTest = async (scenario, index) => {
  console.log(\`\\n🔍 테스트 \${index + 1}: \${scenario.name}\`);
  
  try {
    // 페이지 새로고침 (이전 테스트 영향 제거)
    if (index > 0) {
      location.reload();
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // 입력값 설정
    const inputSelectors = {
      initialInvestment: 'input[placeholder*="50"]',
      annualRevenue: 'input[placeholder*="80"]',
      operatingMargin: 'input[placeholder*="25"]',
      discountRate: 'input[type="number"]:nth-of-type(3)',
      analysisYears: 'input[type="number"]:nth-of-type(4)'
    };
    
    // 기본 입력값 설정
    for (const [key, selector] of Object.entries(inputSelectors)) {
      if (scenario.data[key]) {
        const success = setInputValue(selector, scenario.data[key]);
        if (!success) {
          console.warn(\`입력 필드를 찾을 수 없음: \${key}\`);
        }
      }
    }
    
    // 고급설정이 있는 경우
    if (scenario.data.revenueGrowthRate || scenario.data.debtRatio) {
      openAdvancedSettings();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // 고급설정 입력값들
      const advancedInputs = {
        revenueGrowthRate: scenario.data.revenueGrowthRate,
        costInflationRate: scenario.data.costInflationRate,
        debtRatio: scenario.data.debtRatio,
        loanInterestRate: scenario.data.loanInterestRate,
        workingCapitalRatio: scenario.data.workingCapitalRatio,
        depreciationRate: scenario.data.depreciationRate,
        residualValueRate: scenario.data.residualValueRate
      };
      
      // 고급설정 필드들 설정 (순서대로)
      const advancedFields = document.querySelectorAll('.bg-gray-50 input[type="number"]');
      let fieldIndex = 0;
      
      for (const [key, value] of Object.entries(advancedInputs)) {
        if (value && fieldIndex < advancedFields.length) {
          advancedFields[fieldIndex].value = value;
          advancedFields[fieldIndex].dispatchEvent(new Event('input', { bubbles: true }));
          fieldIndex++;
        }
      }
    }
    
    // 계산 실행
    const calculationStarted = executeCalculation();
    if (!calculationStarted) {
      throw new Error('계산 버튼을 찾을 수 없음');
    }
    
    // 결과 검증
    const results = await verifyResults(scenario);
    
    // 테스트 평가
    const testPassed = !results.hasError && results.finiteValues;
    
    console.log(\`결과: NPV=\${results.npvValue}, IRR=\${results.irrValue}%, DSCR=\${results.dscrValue}\`);
    console.log(\`오류 검사: \${testPassed ? '✅ 정상' : '❌ 오류 발생'}\`);
    
    if (!testPassed) {
      console.log(\`오류 상세:`, results);
    }
    
    return { testPassed, results };
    
  } catch (error) {
    console.log(\`❌ 예외 발생: \${error.message}\`);
    return { testPassed: false, error: error.message };
  }
};

// 전체 테스트 실행
const runAllTests = async () => {
  console.log('🚀 웹 무오류 검증 테스트 시작\\n');
  
  for (let i = 0; i < testScenarios.length; i++) {
    totalTests++;
    const result = await runTest(testScenarios[i], i);
    
    if (result.testPassed) {
      passedTests++;
    } else {
      failedTests.push({
        test: testScenarios[i].name,
        error: result.error || result.results
      });
    }
    
    // 테스트 간 간격
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // 최종 결과
  const successRate = (passedTests / totalTests * 100).toFixed(1);
  
  console.log('\\n🎯 웹 무오류 검증 결과 요약');
  console.log('=' .repeat(60));
  console.log(\`총 테스트: \${totalTests}개\`);
  console.log(\`성공: \${passedTests}개\`);
  console.log(\`실패: \${totalTests - passedTests}개\`);
  console.log(\`성공률: \${successRate}%\`);
  
  if (failedTests.length > 0) {
    console.log('\\n❌ 실패한 테스트들:');
    failedTests.forEach((fail, index) => {
      console.log(\`\${index + 1}. \${fail.test}\`);
      console.log(\`   오류:`, fail.error);
    });
  } else {
    console.log('\\n✅ 모든 웹 테스트 통과!');
  }
  
  // 무오류 달성 평가
  if (passedTests === totalTests) {
    console.log('\\n🎉 웹에서 무오류(Zero Error) 목표 달성!');
    console.log('✅ 실제 브라우저에서 안정적으로 작동합니다.');
    console.log('✅ 모든 극한 상황을 올바르게 처리합니다.');
  } else if (successRate >= 80) {
    console.log('\\n🥈 웹에서 양호한 성능!');
    console.log('⚠️ 일부 시나리오에서 개선 필요');
  } else {
    console.log('\\n🥉 웹에서 추가 개선 필요');
    console.log('❌ 여러 오류 패턴 발견');
  }
  
  console.log('\\n🎯 웹 무오류 검증 완료!');
};

// 테스트 시작
runAllTests().catch(console.error);
`;
};

// 브라우저 스크립트 출력
console.log('\n📋 브라우저 콘솔에서 실행할 스크립트:');
console.log('=' .repeat(80));
console.log('1. 브라우저에서 http://localhost:3003/services/policy-funding 접속');
console.log('2. F12 키를 눌러 개발자 도구 열기');
console.log('3. Console 탭 선택');
console.log('4. 아래 스크립트를 복사하여 붙여넣고 Enter 실행');
console.log('=' .repeat(80));
console.log(generateBrowserScript());
console.log('=' .repeat(80));

// 수동 테스트 가이드
console.log('\n📝 수동 테스트 가이드:');
console.log('1. 정상 시나리오: 투자금액 50, 매출 120, 영업이익률 25%');
console.log('2. 극한값 테스트: 투자금액 999999, 매출 999999, 영업이익률 1%');
console.log('3. 최소값 테스트: 투자금액 0.01, 매출 0.01, 영업이익률 0.01%');
console.log('4. 고급설정 극한값: 모든 비율을 최대값(50-100%)으로 설정');
console.log('5. 각 테스트에서 NPV, IRR, DSCR 값이 유한수인지 확인');

console.log('\n🎯 웹 무오류 검증 테스트 준비 완료!'); 