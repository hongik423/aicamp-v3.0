import {
  InvestmentInput,
  InvestmentResult,
  CashFlow,
  DSCRDetailedData,
  DebtPayment,
  NPVDetailedCalculation
} from '@/types/investment.types';

// NPV (순현재가치) 계산
export function calculateNPV(cashFlows: number[], discountRate: number): number {
  const rate = discountRate / 100;
  
  return cashFlows.reduce((npv, cashFlow, year) => {
    if (year === 0) return npv + cashFlow;
    
    const discountFactor = Math.pow(1 + rate, year);
    const presentValue = cashFlow / discountFactor;
    return npv + presentValue;
  }, 0);
}

// IRR (내부수익률) 계산 - 이분법
function calculateIRRBisection(cashFlows: number[]): number {
  let low = -0.99;
  let high = 5.0;
  const tolerance = 0.0001;
  const maxIterations = 100;
  
  for (let i = 0; i < maxIterations; i++) {
    const mid = (low + high) / 2;
    const npvMid = calculateNPV(cashFlows, mid * 100);
    
    if (Math.abs(npvMid) < tolerance) {
      return mid * 100;
    }
    
    const npvLow = calculateNPV(cashFlows, low * 100);
    
    if (npvMid * npvLow < 0) {
      high = mid;
    } else {
      low = mid;
    }
  }
  
  return ((low + high) / 2) * 100;
}

// IRR (내부수익률) 계산 - Newton-Raphson
function calculateIRRNewtonRaphson(cashFlows: number[], guess: number): number {
  const tolerance = 0.0001;
  const maxIterations = 50;
  let rate = guess / 100;
  
  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let dnpv = 0;
    
    for (let j = 0; j < cashFlows.length; j++) {
      const factor = Math.pow(1 + rate, j);
      npv += cashFlows[j] / factor;
      if (j > 0) {
        dnpv -= j * cashFlows[j] / Math.pow(1 + rate, j + 1);
      }
    }
    
    if (Math.abs(npv) < tolerance) {
      return rate * 100;
    }
    
    if (dnpv === 0) break;
    
    const newRate = rate - npv / dnpv;
    if (Math.abs(newRate - rate) < tolerance / 100) {
      return newRate * 100;
    }
    
    rate = newRate;
  }
  
  return rate * 100;
}

// IRR 계산 (통합)
export function calculateIRR(cashFlows: number[], initialGuess: number = 10): number {
  // 이분법과 Newton-Raphson 방법 결합
  const bisectionResult = calculateIRRBisection(cashFlows);
  
  if (isFinite(bisectionResult) && Math.abs(bisectionResult) < 500) {
    const newtonResult = calculateIRRNewtonRaphson(cashFlows, bisectionResult);
    
    if (isFinite(newtonResult) && Math.abs(newtonResult - bisectionResult) < 100) {
      return Math.max(-95, Math.min(500, newtonResult));
    }
  }
  
  return Math.max(-95, Math.min(500, bisectionResult));
}

// 대출 상환액 계산
export function calculateDebtPayment(
  loanAmount: number,
  interestRate: number,
  year: number,
  gracePeriod: number,
  repaymentPeriod: number
): DebtPayment {
  const rate = interestRate / 100;
  let principal = 0;
  let interest = 0;
  let remainingBalance = loanAmount;
  
  if (year <= gracePeriod) {
    // 거치기간: 이자만 상환
    interest = loanAmount * rate;
    principal = 0;
  } else if (year <= gracePeriod + repaymentPeriod) {
    // 상환기간: 원금 균등 상환 + 이자
    const yearsSinceGrace = year - gracePeriod;
    const principalPayment = loanAmount / repaymentPeriod;
    
    remainingBalance = loanAmount - (principalPayment * (yearsSinceGrace - 1));
    principal = principalPayment;
    interest = remainingBalance * rate;
    
    remainingBalance -= principal;
  } else {
    // 상환 완료
    principal = 0;
    interest = 0;
    remainingBalance = 0;
  }
  
  return { principal, interest, remainingBalance };
}

// DSCR 연도별 계산
export function calculateYearlyDSCR(input: InvestmentInput): DSCRDetailedData[] {
  const yearlyData: DSCRDetailedData[] = [];
  
  for (let year = 1; year <= input.analysisYears; year++) {
    // 매출 계산 (성장률 적용)
    const yearlyRevenue = input.annualRevenue * 
      Math.pow(1 + input.revenueGrowthRate / 100, year - 1);
    
    // 영업이익 계산
    const yearlyOperatingProfit = yearlyRevenue * 
      (input.operatingProfitRate / 100);
    
    // 정책자금 상환액 계산
    const policyLoan = calculateDebtPayment(
      input.policyLoanAmount,
      input.policyLoanRate,
      year,
      input.gracePeriod,
      input.repaymentPeriod
    );
    
    // 기타채무 상환액 계산
    const otherDebt = calculateDebtPayment(
      input.otherDebtAmount,
      input.otherDebtRate,
      year,
      input.otherDebtGracePeriod,
      input.otherDebtRepaymentPeriod
    );
    
    // 총 부채상환액
    const totalDebtService = 
      policyLoan.principal + policyLoan.interest + 
      otherDebt.principal + otherDebt.interest;
    
    // DSCR 계산
    const yearlyDSCR = totalDebtService > 0 ? 
      yearlyOperatingProfit / totalDebtService : 0;
    
    // 시나리오 조정
    let scenarioAdjustment = 1;
    if (input.scenarioType === 'pessimistic') {
      scenarioAdjustment = 0.8;
    } else if (input.scenarioType === 'optimistic') {
      scenarioAdjustment = 1.2;
    }
    
    yearlyData.push({
      year,
      revenue: yearlyRevenue,
      operatingProfit: yearlyOperatingProfit,
      policyLoanPrincipal: policyLoan.principal,
      policyLoanInterest: policyLoan.interest,
      remainingPolicyLoan: policyLoan.remainingBalance,
      otherDebtPrincipal: otherDebt.principal,
      otherDebtInterest: otherDebt.interest,
      remainingOtherDebt: otherDebt.remainingBalance,
      totalDebtService,
      dscr: yearlyDSCR * scenarioAdjustment,
      isGracePeriod: year <= input.gracePeriod,
      isRepaymentPeriod: year > input.gracePeriod && year <= input.gracePeriod + input.repaymentPeriod,
      isPostRepayment: year > input.gracePeriod + input.repaymentPeriod,
      scenarioType: input.scenarioType,
      scenarioAdjustment
    });
  }
  
  return yearlyData;
}

// 현금흐름 계산
export function calculateCashFlows(input: InvestmentInput): CashFlow[] {
  const cashFlows: CashFlow[] = [];
  
  // Year 0: 초기 투자
  cashFlows.push({
    year: 0,
    revenue: 0,
    operatingCost: 0,
    ebit: 0,
    tax: 0,
    netIncome: 0,
    depreciation: 0,
    loanPrincipal: 0,
    loanInterest: 0,
    netCashFlow: -input.initialInvestment,
    cumulativeCashFlow: -input.initialInvestment,
    presentValue: -input.initialInvestment,
    cumulativePV: -input.initialInvestment,
    operatingProfitRate: 0,
    roic: 0,
    fcf: -input.initialInvestment,
    discountedFCF: -input.initialInvestment
  });
  
  let cumulativeCashFlow = -input.initialInvestment;
  let cumulativePV = -input.initialInvestment;
  
  for (let year = 1; year <= input.analysisYears; year++) {
    // 매출 및 비용 계산
    const revenue = input.annualRevenue * 
      Math.pow(1 + input.revenueGrowthRate / 100, year - 1);
    
    const operatingProfit = revenue * (input.operatingProfitRate / 100);
    const operatingCost = revenue - operatingProfit;
    
    // 대출 상환
    const policyLoan = calculateDebtPayment(
      input.policyLoanAmount,
      input.policyLoanRate,
      year,
      input.gracePeriod,
      input.repaymentPeriod
    );
    
    const otherDebt = calculateDebtPayment(
      input.otherDebtAmount,
      input.otherDebtRate,
      year,
      input.otherDebtGracePeriod,
      input.otherDebtRepaymentPeriod
    );
    
    // EBIT 계산
    const totalInterest = policyLoan.interest + otherDebt.interest;
    const ebit = operatingProfit - totalInterest;
    
    // 세금 계산
    const tax = Math.max(0, ebit * (input.taxRate / 100));
    const netIncome = ebit - tax;
    
    // 감가상각 (간단히 초기투자의 10%로 가정)
    const depreciation = input.initialInvestment * 0.1;
    
    // 순현금흐름
    const totalPrincipal = policyLoan.principal + otherDebt.principal;
    const netCashFlow = netIncome + depreciation - totalPrincipal;
    
    // 누적 현금흐름
    cumulativeCashFlow += netCashFlow;
    
    // 현재가치
    const discountFactor = Math.pow(1 + input.discountRate / 100, year);
    const presentValue = netCashFlow / discountFactor;
    cumulativePV += presentValue;
    
    // ROIC 계산
    const investedCapital = input.initialInvestment + 
      policyLoan.remainingBalance + otherDebt.remainingBalance;
    const roic = (netIncome / investedCapital) * 100;
    
    // FCF 계산
    const fcf = operatingProfit * (1 - input.taxRate / 100) + depreciation - totalPrincipal;
    const discountedFCF = fcf / discountFactor;
    
    cashFlows.push({
      year,
      revenue,
      operatingCost,
      ebit,
      tax,
      netIncome,
      depreciation,
      loanPrincipal: totalPrincipal,
      loanInterest: totalInterest,
      netCashFlow,
      cumulativeCashFlow,
      presentValue,
      cumulativePV,
      operatingProfitRate: input.operatingProfitRate,
      roic,
      fcf,
      discountedFCF
    });
  }
  
  return cashFlows;
}

// 회수기간 계산
export function calculatePaybackPeriod(cashFlows: CashFlow[]): number {
  for (let i = 1; i < cashFlows.length; i++) {
    if (cashFlows[i].cumulativeCashFlow >= 0) {
      // 선형 보간
      const prevCumulative = cashFlows[i - 1].cumulativeCashFlow;
      const currentCumulative = cashFlows[i].cumulativeCashFlow;
      const yearFraction = -prevCumulative / (currentCumulative - prevCumulative);
      return (i - 1) + yearFraction;
    }
  }
  return cashFlows.length; // 회수 불가
}

// 할인 회수기간 계산
export function calculateDiscountedPaybackPeriod(cashFlows: CashFlow[]): number {
  for (let i = 1; i < cashFlows.length; i++) {
    if (cashFlows[i].cumulativePV >= 0) {
      // 선형 보간
      const prevCumulative = cashFlows[i - 1].cumulativePV;
      const currentCumulative = cashFlows[i].cumulativePV;
      const yearFraction = -prevCumulative / (currentCumulative - prevCumulative);
      return (i - 1) + yearFraction;
    }
  }
  return cashFlows.length; // 회수 불가
}

// NPV 상세 계산
export function calculateNPVDetails(
  cashFlows: CashFlow[],
  discountRate: number
): NPVDetailedCalculation {
  const yearlyPresentValues: number[] = [];
  const discountFactors: number[] = [];
  let totalPresentValue = 0;
  let totalCashInflows = 0;
  const totalInvestment = Math.abs(cashFlows[0].netCashFlow);
  
  cashFlows.forEach((cf, year) => {
    const discountFactor = Math.pow(1 + discountRate / 100, year);
    discountFactors.push(discountFactor);
    
    const pv = cf.netCashFlow / discountFactor;
    yearlyPresentValues.push(pv);
    totalPresentValue += pv;
    
    if (year > 0) {
      totalCashInflows += cf.netCashFlow;
    }
  });
  
  return {
    totalInvestment,
    totalCashInflows,
    totalPresentValue,
    netPresentValue: totalPresentValue,
    yearlyPresentValues,
    discountFactors
  };
}

// 평균 DSCR 계산
export function calculateAverageDSCR(result: InvestmentResult): number {
  if (!result.dscrData || result.dscrData.length === 0) return 0;
  
  const validDSCRs = result.dscrData.filter(d => d.totalDebtService > 0);
  if (validDSCRs.length === 0) return 0;
  
  const sum = validDSCRs.reduce((acc, d) => acc + d.dscr, 0);
  return sum / validDSCRs.length;
}

// 메인 투자 분석 함수
export async function performInvestmentAnalysis(
  input: InvestmentInput
): Promise<InvestmentResult> {
  // 현금흐름 계산
  const cashFlows = calculateCashFlows(input);
  
  // NPV 계산
  const npvCashFlows = cashFlows.map(cf => cf.netCashFlow);
  const npv = calculateNPV(npvCashFlows, input.discountRate);
  const npvDetails = calculateNPVDetails(cashFlows, input.discountRate);
  
  // IRR 계산
  const irr = calculateIRR(npvCashFlows);
  
  // 회수기간 계산
  const simplePaybackPeriod = calculatePaybackPeriod(cashFlows);
  const paybackPeriod = calculateDiscountedPaybackPeriod(cashFlows);
  
  // DSCR 계산
  const dscrData = calculateYearlyDSCR(input);
  const dscr = dscrData.map(d => d.dscr);
  
  // ROI 계산
  const totalReturn = cashFlows[cashFlows.length - 1].cumulativeCashFlow + input.initialInvestment;
  const roi = (totalReturn / input.initialInvestment) * 100;
  
  // 수익성 지수
  const profitabilityIndex = (npv + input.initialInvestment) / input.initialInvestment;
  
  // 평균 ROI
  const yearlyROIs = cashFlows.slice(1).map(cf => 
    (cf.netIncome / input.initialInvestment) * 100
  );
  const averageROI = yearlyROIs.reduce((a, b) => a + b, 0) / yearlyROIs.length;
  
  // 누적 ROI
  const cumulativeROI = roi;
  
  // 위험조정수익률
  const riskFreeRate = 3; // 무위험수익률 가정
  const riskAdjustedReturn = irr - riskFreeRate;
  
  // MVA (시장부가가치)
  const marketValueAdded = npv;
  
  // EVA (경제적부가가치)
  const wacc = input.discountRate; // WACC를 할인율로 가정
  const totalCapital = input.initialInvestment + input.policyLoanAmount + input.otherDebtAmount;
  const economicValueAdded = cashFlows.slice(1).reduce((sum, cf) => {
    const eva = cf.netIncome - (totalCapital * wacc / 100);
    return sum + eva;
  }, 0);
  
  // 손익분기점
  let breakEvenPoint = 0;
  for (let i = 1; i < cashFlows.length; i++) {
    if (cashFlows[i].netIncome > 0) {
      breakEvenPoint = i;
      break;
    }
  }
  
  return {
    npv,
    irr,
    paybackPeriod,
    simplePaybackPeriod,
    breakEvenPoint,
    dscr,
    roi,
    profitabilityIndex,
    cashFlows,
    averageROI,
    cumulativeROI,
    riskAdjustedReturn,
    marketValueAdded,
    economicValueAdded,
    npvDetails,
    dscrData
  };
} 