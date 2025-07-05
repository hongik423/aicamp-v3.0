'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building, 
  TrendingUp, 
  Target, 
  Award, 
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Users,
  Calendar,
  DollarSign,
  Zap,
  Brain,
  Factory,
  Plane,
  TreePine,
  Utensils,
  Palette,
  Camera,
  Shield,
  Heart,
  Home,
  Star,
  ChevronRight,
  Lightbulb,
  FileText,
  ArrowRight,
  Calculator,
  LineChart as LineChartIcon,
  BarChart3,
  PieChart,
  Percent,
  TrendingDown
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// 정책자금 성공사례 데이터
const successStories = {
  '관광시설자금': [
    {
      id: '1',
      title: '전남 해남 오시아노 관광단지 성공사례',
      company: '해남 오시아노 관광단지',
      location: '전라남도 해남군',
      industry: '관광/레저',
      fundingType: '관광시설자금',
      amount: '213억원',
      duration: '6년',
      successRate: '95%',
      description: '30년 숙원사업인 해남 오시아노 관광단지가 정책자금 지원으로 하수처리장 설치 및 관광호텔&리조트 건설을 완료하여 민간투자 유치에 성공',
      keyFeatures: [
        '507만㎡ 규모의 대규모 관광단지 조성',
        '1,500톤/일 규모 하수처리장 설치',
        '120실 규모 관광호텔&리조트 건설',
        '인피니티풀, 레스토랑, 연회장 등 부대시설 완비'
      ],
      challenges: [
        '30년간 미준공 상태로 방치된 관광단지',
        '하수처리시설 부재로 인한 민간투자 저조',
        '관광단지 활성화를 위한 앵커시설 부족',
        '지역 관광 인프라 부족'
      ],
      solutions: [
        '정부 국비 213억원 투입으로 기반시설 완비',
        '한국관광공사 주도 관광호텔&리조트 건설',
        '전남도-해남군-한국관광공사 3자 협력체계 구축',
        '체계적인 관광단지 마스터플랜 수립'
      ],
      impact: '지역 관광산업 활성화, 고용창출 300명, 연간 관광객 50만명 유치'
    },
    {
      id: '2',
      title: '전남 글램핑 관광시설 성공사례',
      company: '전남 프리미엄 글램핑 리조트',
      location: '전라남도 순천시',
      industry: '관광/레저',
      fundingType: '관광시설자금',
      amount: '15억원',
      duration: '3년',
      successRate: '88%',
      description: '전남 관광진흥기금 1% 저리융자를 활용하여 프리미엄 글램핑 리조트 조성으로 체류형 관광 활성화에 기여',
      keyFeatures: [
        '20동 규모의 프리미엄 글램핑 시설',
        '개별 바베큐장 및 화장실 완비',
        '순천만 연계 생태관광 프로그램 운영',
        '연간 95% 이상 높은 객실 가동률'
      ],
      challenges: [
        '기존 캠핑장 대비 높은 초기 투자비용',
        '프리미엄 글램핑 시설 운영 노하우 부족',
        '계절적 수요 변동에 따른 수익성 우려',
        '차별화된 체험 프로그램 개발 필요'
      ],
      solutions: [
        '관광진흥기금 1% 저리융자로 자금조달',
        '글램핑 전문 컨설팅 업체와 협력',
        '사계절 운영 가능한 시설 구축',
        '순천만 생태관광과 연계한 특화 프로그램 개발'
      ],
      impact: '연간 매출 12억원, 지역 고용창출 25명, 순천시 관광수입 증대'
    }
  ],
  '시설자금': [
    {
      id: '3',
      title: '중진공 스마트팩토리 구축 성공사례',
      company: '정밀부품 제조(주)',
      location: '경기도 안산시',
      industry: '제조업',
      fundingType: '시설자금',
      amount: '50억원',
      duration: '4년',
      successRate: '92%',
      description: '중소벤처기업진흥공단 시설자금 지원으로 스마트팩토리 구축 및 생산성 혁신을 통해 매출 300% 증가 달성',
      keyFeatures: [
        'AI 기반 생산관리 시스템 도입',
        '자동화 생산라인 구축',
        '품질관리 시스템 고도화',
        '생산성 250% 향상'
      ],
      challenges: [
        '노후화된 생산설비로 인한 품질 불안정',
        '수작업 중심의 비효율적 생산공정',
        '숙련 기술자 부족 문제',
        '글로벌 경쟁력 확보 필요'
      ],
      solutions: [
        '중진공 시설자금 50억원 지원으로 설비 현대화',
        '스마트팩토리 전문 컨설팅 진행',
        '직원 재교육 및 신기술 교육 실시',
        '단계별 설비 도입으로 리스크 최소화'
      ],
      impact: '매출 300% 증가, 불량률 90% 감소, 신규 고용 50명 창출'
    }
  ],
  '연구개발자금': [
    {
      id: '4',
      title: 'TIPS 프로그램 바이오 벤처 성공사례',
      company: '바이오헬스케어(주)',
      location: '대전광역시',
      industry: '바이오/의료',
      fundingType: 'TIPS',
      amount: '15억원',
      duration: '5년',
      successRate: '87%',
      description: 'TIPS 프로그램 지원으로 혁신적인 바이오 진단키트 개발에 성공하여 글로벌 시장 진출 달성',
      keyFeatures: [
        '차세대 바이오 진단키트 개발',
        '국내외 특허 12건 출원',
        '글로벌 시장 진출 성공',
        '연간 매출 100억원 달성'
      ],
      challenges: [
        '장기간의 연구개발 기간 및 높은 실패 위험',
        '임상시험 및 인허가 절차의 복잡성',
        '글로벌 시장 진출을 위한 자금 부족',
        '전문 인력 확보의 어려움'
      ],
      solutions: [
        'TIPS 프로그램으로 안정적 연구개발 자금 확보',
        '정부 R&D 지원사업과 연계 추진',
        '해외 파트너십 구축 및 기술이전',
        '우수 연구인력 스카우트 및 육성'
      ],
      impact: '매출 100억원, 해외 수출 30억원, 고급 일자리 80명 창출'
    },
    {
      id: '5',
      title: '디딤돌 프로그램 AI 스타트업 성공사례',
      company: 'AI솔루션(주)',
      location: '서울특별시',
      industry: 'IT/소프트웨어',
      fundingType: '디딤돌',
      amount: '8억원',
      duration: '3년',
      successRate: '93%',
      description: '디딤돌 프로그램 지원으로 AI 기반 솔루션 개발 및 Series A 투자 유치 성공',
      keyFeatures: [
        'AI 기반 업무자동화 솔루션 개발',
        '대기업 고객사 10개사 확보',
        'Series A 투자 50억원 유치',
        '연간 매출 25억원 달성'
      ],
      challenges: [
        '초기 스타트업의 자금 부족',
        'AI 기술 개발을 위한 전문인력 부족',
        '시장 검증 및 고객 확보의 어려움',
        '후속 투자 유치 필요'
      ],
      solutions: [
        '디딤돌 프로그램으로 초기 개발자금 지원',
        '우수 AI 개발자 채용 및 교육',
        '정부 실증사업 참여로 시장 검증',
        '성공적인 비즈니스 모델로 후속 투자 유치'
      ],
      impact: '매출 25억원, 투자 유치 50억원, 고급 일자리 40명 창출'
    }
  ],
  '사업전환자금': [
    {
      id: '6',
      title: '중진공 사업전환 성공사례',
      company: '전통제조(주)',
      location: '충청남도 천안시',
      industry: '제조업',
      fundingType: '사업전환자금',
      amount: '30억원',
      duration: '5년',
      successRate: '89%',
      description: '중진공 사업전환자금으로 전통 제조업에서 친환경 소재 제조업으로 성공적인 업종 전환',
      keyFeatures: [
        '친환경 소재 제조업으로 업종 전환',
        '신규 생산라인 구축 완료',
        '환경 인증 및 품질 인증 획득',
        '매출 200% 증가 달성'
      ],
      challenges: [
        '기존 사업 분야의 성장성 한계',
        '새로운 기술 분야 진출의 불확실성',
        '기존 설비 및 인력의 재활용 방안',
        '시장 진입 초기 매출 부족'
      ],
      solutions: [
        '중진공 사업전환자금 30억원 지원',
        '친환경 소재 전문 기술 도입',
        '기존 인력 재교육 및 신규 채용',
        '단계적 사업 전환으로 리스크 관리'
      ],
      impact: '매출 200% 증가, 친환경 인증 획득, 신규 고용 35명 창출'
    }
  ],
  '구조개선자금': [
    {
      id: '7',
      title: '구조개선자금 경영정상화 성공사례',
      company: '전통식품(주)',
      location: '전라북도 전주시',
      industry: '식품제조업',
      fundingType: '구조개선자금',
      amount: '20억원',
      duration: '4년',
      successRate: '85%',
      description: '구조개선자금 지원으로 경영정상화 및 신제품 개발을 통한 매출 회복 성공',
      keyFeatures: [
        '경영정상화 및 재무구조 개선',
        '신제품 개발 및 마케팅 강화',
        '유통채널 다각화 성공',
        '매출 150% 회복 달성'
      ],
      challenges: [
        '코로나19로 인한 급격한 매출 감소',
        '높은 부채비율 및 현금흐름 악화',
        '기존 제품의 경쟁력 저하',
        '유통업체 의존도 과다'
      ],
      solutions: [
        '구조개선자금으로 재무구조 개선',
        '신제품 개발 및 브랜드 리뉴얼',
        '온라인 판매채널 확대',
        '전문 경영컨설팅 진행'
      ],
      impact: '매출 150% 회복, 부채비율 40% 감소, 고용 유지 120명'
    }
  ]
};

// 업종별 카테고리
const industries = [
  { value: '제조업', label: '제조업', icon: Factory },
  { value: '관광/레저', label: '관광/레저', icon: Camera },
  { value: 'IT/소프트웨어', label: 'IT/소프트웨어', icon: Zap },
  { value: '바이오/의료', label: '바이오/의료', icon: Heart },
  { value: '식품제조업', label: '식품제조업', icon: Utensils },
  { value: '서비스업', label: '서비스업', icon: Users },
  { value: '건설업', label: '건설업', icon: Building },
  { value: '농업', label: '농업', icon: TreePine }
];

// 정책자금 종류
const fundingTypes = [
  { value: '관광시설자금', label: '관광시설자금', description: '관광숙박업, 관광펜션업 등 관광시설 개발' },
  { value: '시설자금', label: '시설자금', description: '생산시설, 연구시설 등 고정자산 투자' },
  { value: '연구개발자금', label: '연구개발자금', description: 'TIPS, 디딤돌 등 기술개발 지원' },
  { value: '사업전환자금', label: '사업전환자금', description: '업종전환, 사업다각화 지원' },
  { value: '구조개선자금', label: '구조개선자금', description: '경영정상화, 재무구조 개선' },
  { value: '운영자금', label: '운영자금', description: '원재료 구입, 인건비 등 운영비용' }
];

// 투자규모 구간
const investmentRanges = [
  { value: '1-5억', label: '1-5억원', description: '소규모 창업 및 개선사업' },
  { value: '5-10억', label: '5-10억원', description: '중소기업 시설투자' },
  { value: '10-30억', label: '10-30억원', description: '중견기업 확장사업' },
  { value: '30-50억', label: '30-50억원', description: '대규모 시설투자' },
  { value: '50-100억', label: '50-100억원', description: '대형 프로젝트' },
  { value: '100억+', label: '100억원 이상', description: '초대형 개발사업' }
];

// NPV/IRR 분석 도구 컴포넌트
const NPVAnalysisTool = () => {
  const [inputs, setInputs] = useState({
    // 기본 재무 변수
    initialInvestment: '',
    annualRevenue: '',
    annualCosts: '',
    operatingMargin: '25', // 기본값 설정
    
    // 성장률 및 시장 변수
    revenueGrowthRate: 5, // 매출성장률 (%)
    costInflationRate: 3,  // 비용상승률 (%)
    
    // 자본구조 및 자금조달
    debtRatio: 70,        // 부채비율 (%)
    loanInterestRate: 4.5, // 대출금리 (%)
    
    // 운전자본 및 감가상각
    workingCapitalRatio: 15, // 운전자본비율 (매출액의 %)
    depreciationRate: 10,    // 감가상각률 (%)
    residualValueRate: 20,   // 잔존가치비율 (초기투자의 %)
    
    // 분석 조건
    discountRate: 8.5,
    analysisYears: 10,
    inflationRate: 2.5,
    corporateTaxRate: 25,
    
    // UI 설정
    isAutoCalculationMode: false,
    showAdvancedInputs: false
  });

  const [results, setResults] = useState({
    // 핵심 투자지표
    npv: 0,
    irr: 0,
    paybackPeriod: 0,
    dscr: 0,
    
    // 추가 투자지표
    roi: 0,              // 투자수익률
    pi: 0,               // 현재가치지수 (Profitability Index)
    mirr: 0,             // 수정내부수익률
    breakEvenYear: 0,    // 손익분기점
    
    // 위험도 분석
    riskLevel: '',       // 위험도 등급
    volatility: 0,       // 변동성
    
    // 시나리오 분석
    scenarios: {
      optimistic: { npv: 0, irr: 0 },
      base: { npv: 0, irr: 0 },
      pessimistic: { npv: 0, irr: 0 }
    },
    
    // 민감도 분석
    sensitivity: {
      revenueChange: { npv: 0, irr: 0 },
      costChange: { npv: 0, irr: 0 },
      discountRateChange: { npv: 0, irr: 0 }
    },
    
    // 연도별 상세 데이터
    yearlyData: [] as any[]
  });

  const [showResults, setShowResults] = useState(false);

  // 계산 함수들
  const calculateNPV = (cashFlows: number[], discountRate: number) => {
    return cashFlows.reduce((npv, cashFlow, year) => {
      return npv + cashFlow / Math.pow(1 + discountRate / 100, year);
    }, 0);
  };

  const calculateIRR = (cashFlows: number[]) => {
    const maxIterations = 1000;
    const tolerance = 0.000001;
    let rate = 0.1;

    for (let i = 0; i < maxIterations; i++) {
      const npv = cashFlows.reduce((sum, cashFlow, year) => {
        return sum + cashFlow / Math.pow(1 + rate, year);
      }, 0);

      const derivative = cashFlows.reduce((sum, cashFlow, year) => {
        return sum - (year * cashFlow) / Math.pow(1 + rate, year + 1);
      }, 0);

      const newRate = rate - npv / derivative;
      if (Math.abs(newRate - rate) < tolerance) {
        return newRate * 100;
      }
      rate = newRate;
    }
    return rate * 100;
  };

  const calculatePaybackPeriod = (cashFlows: number[]) => {
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

  const calculateDSCR = (annualCashFlow: number, initialInvestment: number, debtRatio: number, loanInterestRate: number) => {
    const debtAmount = initialInvestment * (debtRatio / 100);
    const annualInterest = debtAmount * (loanInterestRate / 100);
    const annualPrincipal = debtAmount / inputs.analysisYears; // 원금균등상환 가정
    const annualDebtService = annualInterest + annualPrincipal;
    return annualCashFlow / annualDebtService;
  };

  // 추가 투자지표 계산 함수들
  const calculateROI = (totalCashFlows: number, initialInvestment: number) => {
    return ((totalCashFlows - initialInvestment) / initialInvestment) * 100;
  };

  const calculatePI = (presentValueOfCashFlows: number, initialInvestment: number) => {
    return presentValueOfCashFlows / initialInvestment;
  };

  const calculateMIRR = (cashFlows: number[], financeRate: number, reinvestRate: number) => {
    const n = cashFlows.length - 1;
    let negativeCashFlows = 0;
    let positiveCashFlows = 0;

    // 음의 현금흐름을 현재가치로 할인
    for (let i = 0; i < cashFlows.length; i++) {
      if (cashFlows[i] < 0) {
        negativeCashFlows += cashFlows[i] / Math.pow(1 + financeRate / 100, i);
      } else {
        positiveCashFlows += cashFlows[i] * Math.pow(1 + reinvestRate / 100, n - i);
      }
    }

    if (negativeCashFlows === 0 || positiveCashFlows === 0) return 0;
    
    return (Math.pow(positiveCashFlows / Math.abs(negativeCashFlows), 1/n) - 1) * 100;
  };

  const calculateBreakEven = (yearlyData: any[]) => {
    let cumulativeFlow = 0;
    for (let i = 0; i < yearlyData.length; i++) {
      cumulativeFlow += yearlyData[i].cashFlow;
      if (cumulativeFlow >= Math.abs(yearlyData[0]?.initialInvestment || 0)) {
        return i + 1;
      }
    }
    return yearlyData.length + 1;
  };

  const performSensitivityAnalysis = (baseInputs: any, baseNPV: number, baseIRR: number) => {
    const sensitivity = {
      revenueChange: { npv: 0, irr: 0 },
      costChange: { npv: 0, irr: 0 },
      discountRateChange: { npv: 0, irr: 0 }
    };

    // 매출 10% 증가 시나리오
    const revenueScenario = { ...baseInputs, annualRevenue: baseInputs.annualRevenue * 1.1 };
    const revenueResult = calculateScenarioResults(revenueScenario);
    sensitivity.revenueChange = { 
      npv: ((revenueResult.npv - baseNPV) / baseNPV) * 100,
      irr: revenueResult.irr - baseIRR 
    };

    // 비용 10% 증가 시나리오
    const costScenario = { ...baseInputs, annualCosts: baseInputs.annualCosts * 1.1 };
    const costResult = calculateScenarioResults(costScenario);
    sensitivity.costChange = { 
      npv: ((costResult.npv - baseNPV) / baseNPV) * 100,
      irr: costResult.irr - baseIRR 
    };

    // 할인율 1% 증가 시나리오
    const discountScenario = { ...baseInputs, discountRate: baseInputs.discountRate + 1 };
    const discountResult = calculateScenarioResults(discountScenario);
    sensitivity.discountRateChange = { 
      npv: ((discountResult.npv - baseNPV) / baseNPV) * 100,
      irr: discountResult.irr - baseIRR 
    };

    return sensitivity;
  };

  const performScenarioAnalysis = (baseInputs: any) => {
    // 낙관적 시나리오 (매출 +20%, 비용 -10%)
    const optimistic = {
      ...baseInputs,
      annualRevenue: baseInputs.annualRevenue * 1.2,
      annualCosts: baseInputs.annualCosts * 0.9,
      revenueGrowthRate: baseInputs.revenueGrowthRate + 3
    };

    // 비관적 시나리오 (매출 -15%, 비용 +15%)
    const pessimistic = {
      ...baseInputs,
      annualRevenue: baseInputs.annualRevenue * 0.85,
      annualCosts: baseInputs.annualCosts * 1.15,
      revenueGrowthRate: Math.max(0, baseInputs.revenueGrowthRate - 3)
    };

    return {
      optimistic: calculateScenarioResults(optimistic),
      base: calculateScenarioResults(baseInputs),
      pessimistic: calculateScenarioResults(pessimistic)
    };
  };

  const calculateScenarioResults = (scenarioInputs: any) => {
    const initial = parseFloat(scenarioInputs.initialInvestment);
    const revenue = parseFloat(scenarioInputs.annualRevenue);
    const costs = parseFloat(scenarioInputs.annualCosts);
    
    const operatingIncome = revenue - costs;
    const taxAmount = operatingIncome * (scenarioInputs.corporateTaxRate / 100);
    const afterTaxCashFlow = operatingIncome - taxAmount;

    const cashFlows = [-initial];
    for (let year = 1; year <= scenarioInputs.analysisYears; year++) {
      const growthAdjustedRevenue = revenue * Math.pow(1 + scenarioInputs.revenueGrowthRate / 100, year - 1);
      const inflationAdjustedCosts = costs * Math.pow(1 + scenarioInputs.costInflationRate / 100, year - 1);
      const yearlyOperatingIncome = growthAdjustedRevenue - inflationAdjustedCosts;
      const yearlyTax = yearlyOperatingIncome * (scenarioInputs.corporateTaxRate / 100);
      const yearlyAfterTaxCashFlow = yearlyOperatingIncome - yearlyTax;
      
      cashFlows.push(yearlyAfterTaxCashFlow);
    }

    // 잔존가치 추가
    const residualValue = initial * (scenarioInputs.residualValueRate / 100);
    cashFlows[cashFlows.length - 1] += residualValue;

    const npv = calculateNPV(cashFlows, scenarioInputs.discountRate);
    const irr = calculateIRR(cashFlows);

    return { npv, irr };
  };

  const calculateRiskLevel = (npv: number, irr: number, scenarios: any) => {
    const npvVolatility = Math.abs(scenarios.optimistic.npv - scenarios.pessimistic.npv) / scenarios.base.npv;
    const irrVolatility = Math.abs(scenarios.optimistic.irr - scenarios.pessimistic.irr);
    
    let riskLevel = '';
    let volatility = (npvVolatility + irrVolatility / 100) / 2;

    if (volatility < 0.2) riskLevel = '낮음';
    else if (volatility < 0.5) riskLevel = '보통';
    else if (volatility < 1.0) riskLevel = '높음';
    else riskLevel = '매우 높음';

    return { riskLevel, volatility: volatility * 100 };
  };

  const handleCalculate = () => {
    // 입력값 검증
    const initial = parseFloat(inputs.initialInvestment);
    const revenue = parseFloat(inputs.annualRevenue);
    const costs = parseFloat(inputs.annualCosts);
    
    if (!initial || initial <= 0) {
      alert('초기 투자금액을 올바르게 입력해주세요.');
      return;
    }
    
    if (!revenue || revenue <= 0) {
      alert('연간 매출액을 올바르게 입력해주세요.');
      return;
    }
    
    if (!costs || costs < 0) {
      alert('연간 비용을 올바르게 입력해주세요.');
      return;
    }
    
    if (costs >= revenue) {
      alert('연간 비용이 매출액보다 클 수 없습니다.');
      return;
    }
    
    // 완전한 투자분석 계산
    const operatingIncome = revenue - costs;
    const taxAmount = operatingIncome * (inputs.corporateTaxRate / 100);
    const firstYearAfterTaxCashFlow = operatingIncome - taxAmount;

    const cashFlows = [-initial];
    const yearlyData = [];
    let cumulativeNPV = -initial;
    let totalCashFlows = -initial;
    let presentValueOfCashFlows = 0;

    // 연도별 상세 계산
    for (let year = 1; year <= inputs.analysisYears; year++) {
      // 매출 성장률 적용
      const growthAdjustedRevenue = revenue * Math.pow(1 + inputs.revenueGrowthRate / 100, year - 1);
      
      // 비용 상승률 적용
      const inflationAdjustedCosts = costs * Math.pow(1 + inputs.costInflationRate / 100, year - 1);
      
      // 운전자본 변화 계산
      const workingCapitalChange = year === 1 ? 
        growthAdjustedRevenue * (inputs.workingCapitalRatio / 100) : 
        (growthAdjustedRevenue - (revenue * Math.pow(1 + inputs.revenueGrowthRate / 100, year - 2))) * (inputs.workingCapitalRatio / 100);
      
      // 감가상각비 계산
      const depreciation = initial * (inputs.depreciationRate / 100);
      
      // 연간 운영수익 계산
      const yearlyOperatingIncome = growthAdjustedRevenue - inflationAdjustedCosts - depreciation;
      
      // 이자비용 계산
      const debtAmount = initial * (inputs.debtRatio / 100);
      const interestExpense = debtAmount * (inputs.loanInterestRate / 100);
      
      // 세전이익
      const ebit = yearlyOperatingIncome;
      const ebt = ebit - interestExpense;
      
      // 세후이익
      const yearlyTax = Math.max(0, ebt * (inputs.corporateTaxRate / 100));
      const netIncome = ebt - yearlyTax;
      
      // 현금흐름 계산 (순이익 + 감가상각 - 운전자본 변화)
      let yearlyAfterTaxCashFlow = netIncome + depreciation - workingCapitalChange;
      
      // 마지막 연도에 잔존가치와 운전자본 회수 추가
      if (year === inputs.analysisYears) {
        const residualValue = initial * (inputs.residualValueRate / 100);
        const workingCapitalRecovery = revenue * Math.pow(1 + inputs.revenueGrowthRate / 100, year - 1) * (inputs.workingCapitalRatio / 100);
        yearlyAfterTaxCashFlow += residualValue + workingCapitalRecovery;
      }
      
      const discountedCashFlow = yearlyAfterTaxCashFlow / Math.pow(1 + inputs.discountRate / 100, year);
      
      cashFlows.push(yearlyAfterTaxCashFlow);
      cumulativeNPV += discountedCashFlow;
      totalCashFlows += yearlyAfterTaxCashFlow;
      presentValueOfCashFlows += discountedCashFlow;
      
      yearlyData.push({
        year,
        revenue: growthAdjustedRevenue,
        costs: inflationAdjustedCosts,
        depreciation,
        ebit,
        interestExpense,
        ebt,
        tax: yearlyTax,
        netIncome,
        workingCapitalChange,
        cashFlow: yearlyAfterTaxCashFlow,
        discountedCashFlow,
        cumulativeCashFlow: cashFlows.slice(1, year + 1).reduce((sum, cf) => sum + cf, 0),
        cumulativeNPV: cumulativeNPV
      });
    }

    // 핵심 투자지표 계산
    const npv = calculateNPV(cashFlows, inputs.discountRate);
    const irr = calculateIRR(cashFlows);
    const paybackPeriod = calculatePaybackPeriod(cashFlows);
    const dscr = calculateDSCR(firstYearAfterTaxCashFlow, initial, inputs.debtRatio, inputs.loanInterestRate);
    
    // 추가 투자지표 계산
    const roi = calculateROI(totalCashFlows, initial);
    const pi = calculatePI(presentValueOfCashFlows, initial);
    const mirr = calculateMIRR(cashFlows, inputs.loanInterestRate, inputs.discountRate);
    const breakEvenYear = calculateBreakEven(yearlyData);
    
    // 시나리오 분석
    const numericInputs = {
      ...inputs,
      initialInvestment: initial,
      annualRevenue: revenue,
      annualCosts: costs
    };
    const scenarios = performScenarioAnalysis(numericInputs);
    
    // 민감도 분석
    const sensitivity = performSensitivityAnalysis(numericInputs, npv, irr);
    
    // 위험도 분석
    const riskAnalysis = calculateRiskLevel(npv, irr, scenarios);

    setResults({
      // 핵심 투자지표
      npv,
      irr,
      paybackPeriod,
      dscr,
      
      // 추가 투자지표
      roi,
      pi,
      mirr,
      breakEvenYear,
      
      // 위험도 분석
      riskLevel: riskAnalysis.riskLevel,
      volatility: riskAnalysis.volatility,
      
      // 시나리오 분석
      scenarios,
      
      // 민감도 분석
      sensitivity,
      
      // 연도별 상세 데이터
      yearlyData
    });
    setShowResults(true);
  };

  const handleAutoCalculation = () => {
    console.log('자동계산 실행:', { 
      isAutoMode: inputs.isAutoCalculationMode, 
      revenue: inputs.annualRevenue, 
      margin: inputs.operatingMargin 
    });
    
    if (inputs.isAutoCalculationMode && inputs.annualRevenue && inputs.operatingMargin) {
      const revenue = parseFloat(inputs.annualRevenue);
      const margin = parseFloat(inputs.operatingMargin);
      console.log('파싱된 값:', { revenue, margin });
      
      if (!isNaN(revenue) && !isNaN(margin) && revenue > 0 && margin >= 0 && margin <= 100) {
        const calculatedCosts = revenue * (1 - margin / 100);
        console.log('계산된 비용:', calculatedCosts);
        setInputs(prev => ({ ...prev, annualCosts: calculatedCosts.toFixed(2) }));
      }
    }
  };

  useEffect(() => {
    handleAutoCalculation();
  }, [inputs.annualRevenue, inputs.operatingMargin, inputs.isAutoCalculationMode]);

  const getInvestmentGrade = () => {
    // 고도화된 투자등급 시스템 (6개 지표 종합 평가)
    let score = 0;
    let maxScore = 60; // 각 지표당 10점 × 6개
    
    // NPV 점수 (10점 만점)
    if (results.npv > 100) score += 10;
    else if (results.npv > 50) score += 8;
    else if (results.npv > 20) score += 6;
    else if (results.npv > 0) score += 4;
    else if (results.npv > -20) score += 2;
    
    // IRR 점수 (10점 만점)
    if (results.irr > 25) score += 10;
    else if (results.irr > 20) score += 8;
    else if (results.irr > 15) score += 6;
    else if (results.irr > 10) score += 4;
    else if (results.irr > 5) score += 2;
    
    // DSCR 점수 (10점 만점)
    if (results.dscr > 3.0) score += 10;
    else if (results.dscr > 2.5) score += 8;
    else if (results.dscr > 2.0) score += 6;
    else if (results.dscr > 1.5) score += 4;
    else if (results.dscr > 1.2) score += 2;
    
    // PI (현재가치지수) 점수 (10점 만점)
    if (results.pi > 2.0) score += 10;
    else if (results.pi > 1.5) score += 8;
    else if (results.pi > 1.2) score += 6;
    else if (results.pi > 1.0) score += 4;
    else if (results.pi > 0.8) score += 2;
    
    // 회수기간 점수 (10점 만점)
    if (results.paybackPeriod < 3) score += 10;
    else if (results.paybackPeriod < 4) score += 8;
    else if (results.paybackPeriod < 5) score += 6;
    else if (results.paybackPeriod < 7) score += 4;
    else if (results.paybackPeriod < 10) score += 2;
    
    // 위험도 점수 (10점 만점)
    if (results.riskLevel === '낮음') score += 10;
    else if (results.riskLevel === '보통') score += 6;
    else if (results.riskLevel === '높음') score += 3;
    else score += 1;
    
    const percentage = (score / maxScore) * 100;
    
    // 등급 결정
    if (percentage >= 85) return { 
      grade: 'S', 
      color: 'text-purple-700', 
      bg: 'bg-purple-50', 
      border: 'border-purple-300',
      description: '최우수 투자안',
      recommendation: '즉시 투자 실행 권장'
    };
    else if (percentage >= 75) return { 
      grade: 'AAA', 
      color: 'text-green-700', 
      bg: 'bg-green-50',
      border: 'border-green-300', 
      description: '우수 투자안',
      recommendation: '적극 투자 권장'
    };
    else if (percentage >= 65) return { 
      grade: 'AA', 
      color: 'text-green-600', 
      bg: 'bg-green-50',
      border: 'border-green-200', 
      description: '양호한 투자안',
      recommendation: '투자 권장'
    };
    else if (percentage >= 55) return { 
      grade: 'A', 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      border: 'border-blue-200', 
      description: '보통 투자안',
      recommendation: '조건부 투자 검토'
    };
    else if (percentage >= 45) return { 
      grade: 'BBB', 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-50',
      border: 'border-yellow-200', 
      description: '위험 투자안',
      recommendation: '신중한 검토 필요'
    };
    else if (percentage >= 35) return { 
      grade: 'BB', 
      color: 'text-orange-600', 
      bg: 'bg-orange-50',
      border: 'border-orange-200', 
      description: '고위험 투자안',
      recommendation: '투자 재고 권장'
    };
    else return { 
      grade: 'C', 
      color: 'text-red-600', 
      bg: 'bg-red-50',
      border: 'border-red-200', 
      description: '부적합 투자안',
      recommendation: '투자 불가'
    };
  };

  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <Badge className="bg-gradient-to-r from-green-100 to-blue-100 text-green-700 mb-4">
          <Calculator className="w-4 h-4 mr-2" />
          NPV/IRR 투자 타당성 분석
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          정책자금 투자 분석 도구
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          10년간 정밀한 NPV/IRR 분석으로 투자 타당성을 검증하고 최적의 정책자금을 확인하세요
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 입력 패널 */}
        <Card className="lg:col-span-1 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle className="flex items-center">
              <Calculator className="w-6 h-6 mr-3" />
              투자 정보 입력
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                초기 투자금액 <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                placeholder="예: 50 (50억원)"
                value={inputs.initialInvestment}
                onChange={(e) => setInputs(prev => ({ ...prev, initialInvestment: e.target.value }))}
                className="w-full"
              />
              <div className="text-xs text-gray-500 mt-1">단위: 억원</div>
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                연간 매출액 <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                placeholder="예: 80 (80억원)"
                value={inputs.annualRevenue}
                onChange={(e) => setInputs(prev => ({ ...prev, annualRevenue: e.target.value }))}
                className="w-full"
              />
              <div className="text-xs text-gray-500 mt-1">단위: 억원</div>
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                비용 계산 방식
              </Label>
              
              {/* 개선된 토글 스위치 */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1 mb-4">
                <button
                  onClick={() => {
                    console.log('자동계산 모드 선택');
                    setInputs(prev => ({ ...prev, isAutoCalculationMode: true }));
                  }}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    inputs.isAutoCalculationMode
                      ? 'bg-blue-600 text-white shadow-sm transform scale-105'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  🤖 자동계산
                </button>
                <button
                  onClick={() => {
                    console.log('수동입력 모드 선택');
                    setInputs(prev => ({ ...prev, isAutoCalculationMode: false }));
                  }}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    !inputs.isAutoCalculationMode
                      ? 'bg-gray-600 text-white shadow-sm transform scale-105'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  ✏️ 수동입력
                </button>
              </div>
              
              {/* 모드 설명 */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-xs text-blue-700">
                  {inputs.isAutoCalculationMode ? (
                    <>
                      <strong>🤖 자동계산:</strong> 영업이익률을 입력하면 연간 비용이 자동으로 계산됩니다<br />
                      <span className="text-blue-600">공식: 연간비용 = 매출액 × (1 - 영업이익률)</span>
                    </>
                  ) : (
                    <>
                      <strong>✏️ 수동입력:</strong> 연간 비용을 직접 입력할 수 있습니다<br />
                      <span className="text-blue-600">정확한 비용 데이터가 있을 때 사용하세요</span>
                    </>
                  )}
                </div>
              </div>
              
              {inputs.isAutoCalculationMode ? (
                <div className="mb-4">
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                    영업이익률 (%) <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="예: 25 (25%)"
                      value={inputs.operatingMargin}
                      onChange={(e) => {
                        console.log('영업이익률 입력:', e.target.value);
                        setInputs(prev => ({ ...prev, operatingMargin: e.target.value }));
                      }}
                      className="w-full pr-10"
                      min="0"
                      max="100"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-sm">%</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    일반적으로 10-30% 범위
                  </div>
                </div>
              ) : null}

              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                연간 비용 <span className="text-red-500">*</span>
                {inputs.isAutoCalculationMode && (
                  <Badge className="ml-2 bg-green-100 text-green-700">🤖 자동계산됨</Badge>
                )}
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder={inputs.isAutoCalculationMode ? "영업이익률 입력 시 자동계산" : "예: 60 (60억원)"}
                  value={inputs.annualCosts}
                  onChange={(e) => setInputs(prev => ({ ...prev, annualCosts: e.target.value }))}
                  className={`w-full ${inputs.isAutoCalculationMode ? 'bg-green-50 border-green-200' : ''}`}
                  disabled={inputs.isAutoCalculationMode}
                  min="0"
                />
                {inputs.isAutoCalculationMode && (
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <span className="text-green-600 text-sm">🤖</span>
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {inputs.isAutoCalculationMode ? 
                  "자동계산: 매출액 × (1 - 영업이익률/100)" : 
                  "단위: 억원"
                }
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                  할인율 (%)
                </Label>
                <Input
                  type="number"
                  value={inputs.discountRate}
                  onChange={(e) => setInputs(prev => ({ ...prev, discountRate: parseFloat(e.target.value) }))}
                  className="w-full"
                  step="0.1"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                  분석기간 (년)
                </Label>
                <Input
                  type="number"
                  value={inputs.analysisYears}
                  onChange={(e) => setInputs(prev => ({ ...prev, analysisYears: parseInt(e.target.value) }))}
                  className="w-full"
                  min="3"
                  max="20"
                />
              </div>
            </div>

            {/* 고급 설정 토글 */}
            <div className="border-t pt-4">
              <button
                onClick={() => setInputs(prev => ({ ...prev, showAdvancedInputs: !prev.showAdvancedInputs }))}
                className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-sm font-semibold text-gray-700">
                  🔧 고급 설정 {inputs.showAdvancedInputs ? '숨기기' : '보기'}
                </span>
                <span className={`transform transition-transform ${inputs.showAdvancedInputs ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              {inputs.showAdvancedInputs && (
                <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                  {/* 성장률 설정 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                        매출성장률 (%)
                      </Label>
                      <Input
                        type="number"
                        value={inputs.revenueGrowthRate}
                        onChange={(e) => setInputs(prev => ({ ...prev, revenueGrowthRate: parseFloat(e.target.value) }))}
                        className="w-full"
                        step="0.1"
                      />
                      <div className="text-xs text-gray-500 mt-1">연간 매출 증가율</div>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                        비용상승률 (%)
                      </Label>
                      <Input
                        type="number"
                        value={inputs.costInflationRate}
                        onChange={(e) => setInputs(prev => ({ ...prev, costInflationRate: parseFloat(e.target.value) }))}
                        className="w-full"
                        step="0.1"
                      />
                      <div className="text-xs text-gray-500 mt-1">연간 비용 상승률</div>
                    </div>
                  </div>

                  {/* 자본구조 설정 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                        부채비율 (%)
                      </Label>
                      <Input
                        type="number"
                        value={inputs.debtRatio}
                        onChange={(e) => setInputs(prev => ({ ...prev, debtRatio: parseFloat(e.target.value) }))}
                        className="w-full"
                        min="0"
                        max="100"
                      />
                      <div className="text-xs text-gray-500 mt-1">총 투자 중 차입 비율</div>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                        대출금리 (%)
                      </Label>
                      <Input
                        type="number"
                        value={inputs.loanInterestRate}
                        onChange={(e) => setInputs(prev => ({ ...prev, loanInterestRate: parseFloat(e.target.value) }))}
                        className="w-full"
                        step="0.1"
                      />
                      <div className="text-xs text-gray-500 mt-1">연간 대출 이자율</div>
                    </div>
                  </div>

                  {/* 운전자본 및 기타 */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                        운전자본비율 (%)
                      </Label>
                      <Input
                        type="number"
                        value={inputs.workingCapitalRatio}
                        onChange={(e) => setInputs(prev => ({ ...prev, workingCapitalRatio: parseFloat(e.target.value) }))}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-500 mt-1">매출액 대비</div>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                        감가상각률 (%)
                      </Label>
                      <Input
                        type="number"
                        value={inputs.depreciationRate}
                        onChange={(e) => setInputs(prev => ({ ...prev, depreciationRate: parseFloat(e.target.value) }))}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-500 mt-1">연간 감가상각</div>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                        잔존가치 (%)
                      </Label>
                      <Input
                        type="number"
                        value={inputs.residualValueRate}
                        onChange={(e) => setInputs(prev => ({ ...prev, residualValueRate: parseFloat(e.target.value) }))}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-500 mt-1">초기투자 대비</div>
                    </div>
                  </div>

                  <div className="text-xs text-blue-600 bg-blue-50 p-3 rounded-lg">
                    💡 <strong>고급 설정 안내:</strong> 이 값들은 업종과 기업 특성에 따라 조정하세요. 
                    기본값은 일반적인 중소기업 기준으로 설정되어 있습니다.
                  </div>
                </div>
              )}
            </div>

            <Button 
              onClick={handleCalculate} 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Calculator className="w-4 h-4 mr-2" />
              투자 분석 실행
            </Button>
          </CardContent>
        </Card>

        {/* 결과 표시 */}
        {showResults ? (
          <>
            {/* NPV 추이 차트 */}
            <Card className="lg:col-span-1 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                <CardTitle className="flex items-center">
                  <LineChartIcon className="w-6 h-6 mr-3" />
                  NPV 추이 분석 ({inputs.analysisYears}년)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results.yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                      <XAxis 
                        dataKey="year" 
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        tickFormatter={(value) => `${value}년`}
                      />
                      <YAxis 
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        tickFormatter={(value) => `${value.toFixed(0)}억`}
                      />
                      <Tooltip 
                        formatter={(value: number) => [`${value.toFixed(1)}억원`, 'NPV']}
                        labelFormatter={(label) => `${label}년차`}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="cumulativeNPV" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#1d4ed8' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                {/* NPV 분석 결과 */}
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        NPV: {results.npv.toFixed(1)}억원
                      </div>
                      <div className="text-sm text-blue-700 mt-1">
                        {results.npv > 0 ? '✅ 투자 가치 있음' : '❌ 투자 부적합'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">분석기간</div>
                      <div className="text-lg font-semibold text-gray-800">{inputs.analysisYears}년</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 현금흐름 차트 */}
            <Card className="lg:col-span-1 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-6 h-6 mr-3" />
                  현금흐름 분석 ({inputs.analysisYears}년)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results.yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                      <XAxis 
                        dataKey="year" 
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        tickFormatter={(value) => `${value}년`}
                      />
                      <YAxis 
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        tickFormatter={(value) => `${value.toFixed(0)}억`}
                      />
                      <Tooltip 
                        formatter={(value: number, name: string) => [
                          `${value.toFixed(1)}억원`, 
                          name === 'cashFlow' ? '현금흐름' : '할인된 현금흐름'
                        ]}
                        labelFormatter={(label) => `${label}년차`}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="cashFlow" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#059669' }}
                        name="현금흐름"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="discountedCashFlow" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
                        activeDot={{ r: 5, fill: '#7c3aed' }}
                        name="할인된 현금흐름"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                {/* 현금흐름 분석 결과 */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">
                      IRR: {results.irr.toFixed(1)}%
                    </div>
                    <div className="text-sm text-green-700 mt-1">
                      {results.irr > 15 ? '✅ 높은 수익률' : results.irr > 10 ? '✅ 안정적 수익률' : '⚠️ 수익률 개선 필요'}
                    </div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">
                      회수기간: {results.paybackPeriod.toFixed(1)}년
                    </div>
                    <div className="text-sm text-purple-700 mt-1">
                      {results.paybackPeriod < 5 ? '✅ 빠른 회수' : '⚠️ 장기 회수'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 고도화된 투자분석 리포트 */}
            <Card className="lg:col-span-3 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                <CardTitle className="flex items-center">
                  <Award className="w-6 h-6 mr-3" />
                  🤖 AI 완전 투자분석 리포트
                </CardTitle>
                <CardDescription className="text-indigo-100">
                  6개 핵심지표 기반 종합 평가 • 시나리오 분석 • 민감도 분석 • 위험도 평가
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                {/* 투자등급 및 핵심지표 */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
                  {/* 종합 투자등급 */}
                  <div className={`text-center p-6 rounded-xl ${getInvestmentGrade().bg} border-2 ${getInvestmentGrade().border} col-span-2`}>
                    <div className={`text-4xl font-bold ${getInvestmentGrade().color} mb-2`}>
                      {getInvestmentGrade().grade}급
                    </div>
                    <div className="text-sm font-semibold text-gray-700 mb-1">
                      {getInvestmentGrade().description}
                    </div>
                    <div className="text-xs text-gray-600">
                      {getInvestmentGrade().recommendation}
                    </div>
                  </div>

                  {/* 핵심 지표들 */}
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-xl font-bold text-blue-600 mb-1">
                      {results.npv.toFixed(1)}억
                    </div>
                    <div className="text-xs text-gray-600">NPV</div>
                  </div>

                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-xl font-bold text-green-600 mb-1">
                      {results.irr.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-600">IRR</div>
                  </div>

                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-xl font-bold text-purple-600 mb-1">
                      {results.dscr.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-600">DSCR</div>
                  </div>

                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <div className="text-xl font-bold text-orange-600 mb-1">
                      {results.paybackPeriod.toFixed(1)}년
                    </div>
                    <div className="text-xs text-gray-600">회수기간</div>
                  </div>
                </div>

                {/* 추가 투자지표 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-cyan-50 rounded-xl">
                    <div className="text-lg font-bold text-cyan-600 mb-1">
                      {results.roi.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-600">ROI (투자수익률)</div>
                  </div>

                  <div className="text-center p-4 bg-teal-50 rounded-xl">
                    <div className="text-lg font-bold text-teal-600 mb-1">
                      {results.pi.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-600">PI (현재가치지수)</div>
                  </div>

                  <div className="text-center p-4 bg-indigo-50 rounded-xl">
                    <div className="text-lg font-bold text-indigo-600 mb-1">
                      {results.mirr.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-600">MIRR (수정IRR)</div>
                  </div>

                  <div className="text-center p-4 bg-pink-50 rounded-xl">
                    <div className="text-lg font-bold text-pink-600 mb-1">
                      {results.riskLevel}
                    </div>
                    <div className="text-xs text-gray-600">위험도 ({results.volatility.toFixed(1)}%)</div>
                  </div>
                </div>

                {/* 시나리오 분석 */}
                <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    📊 시나리오 분석 (3가지 시나리오)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-100 rounded-lg">
                      <div className="text-sm font-semibold text-green-800 mb-2">낙관적 시나리오</div>
                      <div className="text-lg font-bold text-green-700">
                        NPV: {results.scenarios.optimistic.npv.toFixed(1)}억
                      </div>
                      <div className="text-sm text-green-600">
                        IRR: {results.scenarios.optimistic.irr.toFixed(1)}%
                      </div>
                      <div className="text-xs text-green-500 mt-1">매출+20%, 비용-10%</div>
                    </div>

                    <div className="text-center p-4 bg-blue-100 rounded-lg">
                      <div className="text-sm font-semibold text-blue-800 mb-2">기본 시나리오</div>
                      <div className="text-lg font-bold text-blue-700">
                        NPV: {results.scenarios.base.npv.toFixed(1)}억
                      </div>
                      <div className="text-sm text-blue-600">
                        IRR: {results.scenarios.base.irr.toFixed(1)}%
                      </div>
                      <div className="text-xs text-blue-500 mt-1">현재 입력 기준</div>
                    </div>

                    <div className="text-center p-4 bg-red-100 rounded-lg">
                      <div className="text-sm font-semibold text-red-800 mb-2">비관적 시나리오</div>
                      <div className="text-lg font-bold text-red-700">
                        NPV: {results.scenarios.pessimistic.npv.toFixed(1)}억
                      </div>
                      <div className="text-sm text-red-600">
                        IRR: {results.scenarios.pessimistic.irr.toFixed(1)}%
                      </div>
                      <div className="text-xs text-red-500 mt-1">매출-15%, 비용+15%</div>
                    </div>
                  </div>
                </div>

                {/* 민감도 분석 */}
                <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    ⚡ 민감도 분석 (변수별 영향도)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-lg border">
                      <div className="text-sm font-semibold text-gray-800 mb-2">매출액 10% 증가 시</div>
                      <div className="text-lg font-bold text-blue-600">
                        NPV: {results.sensitivity.revenueChange.npv > 0 ? '+' : ''}{results.sensitivity.revenueChange.npv.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">
                        IRR: {results.sensitivity.revenueChange.irr > 0 ? '+' : ''}{results.sensitivity.revenueChange.irr.toFixed(1)}%p
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-lg border">
                      <div className="text-sm font-semibold text-gray-800 mb-2">비용 10% 증가 시</div>
                      <div className="text-lg font-bold text-red-600">
                        NPV: {results.sensitivity.costChange.npv > 0 ? '+' : ''}{results.sensitivity.costChange.npv.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">
                        IRR: {results.sensitivity.costChange.irr > 0 ? '+' : ''}{results.sensitivity.costChange.irr.toFixed(1)}%p
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-lg border">
                      <div className="text-sm font-semibold text-gray-800 mb-2">할인율 1% 증가 시</div>
                      <div className="text-lg font-bold text-purple-600">
                        NPV: {results.sensitivity.discountRateChange.npv > 0 ? '+' : ''}{results.sensitivity.discountRateChange.npv.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">
                        IRR: {results.sensitivity.discountRateChange.irr > 0 ? '+' : ''}{results.sensitivity.discountRateChange.irr.toFixed(1)}%p
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI 종합 평가 및 추천 */}
                <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    🚀 AI 종합 평가 및 투자 추천
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 투자 수익성 분석 */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        📈 투자 수익성 분석
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          NPV {results.npv.toFixed(1)}억원으로 {results.npv > 50 ? '매우 우수한' : results.npv > 20 ? '우수한' : results.npv > 0 ? '양호한' : '부정적인'} 투자가치 평가
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          IRR {results.irr.toFixed(1)}%로 {results.irr > 20 ? '매우 높은' : results.irr > 15 ? '높은' : results.irr > 10 ? '안정적인' : '낮은'} 수익률 기대
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          회수기간 {results.paybackPeriod.toFixed(1)}년으로 {results.paybackPeriod < 4 ? '빠른' : results.paybackPeriod < 7 ? '적정한' : '긴'} 투자회수 예상
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          PI {results.pi.toFixed(2)}로 {results.pi > 1.5 ? '매우 유리한' : results.pi > 1.2 ? '유리한' : results.pi > 1.0 ? '수익성 있는' : '수익성 부족한'} 투자안 평가
                        </li>
                      </ul>
                    </div>

                    {/* 맞춤 정책자금 추천 */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        🎯 맞춤 정책자금 추천
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          투자등급 {getInvestmentGrade().grade}급으로 {
                            getInvestmentGrade().grade === 'S' || getInvestmentGrade().grade === 'AAA' ? 
                            '최우선 지원 대상, 모든 정책자금 신청 가능' :
                            getInvestmentGrade().grade === 'AA' || getInvestmentGrade().grade === 'A' ?
                            '우선 지원 대상, 시설자금·연구개발자금 적합' :
                            '조건부 지원, 운영자금·구조개선자금 검토'
                          }
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          DSCR {results.dscr.toFixed(2)}로 {results.dscr > 2.0 ? '우수한 대출 조건' : results.dscr > 1.5 ? '양호한 대출 조건' : '자기자본 비율 증대 필요'}
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          위험도 {results.riskLevel}으로 {
                            results.riskLevel === '낮음' ? '안정적 투자, 장기 대출 가능' :
                            results.riskLevel === '보통' ? '표준적 투자, 일반 금융 조건' :
                            '위험 관리 필요, 담보·보증 강화 권장'
                          }
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          {results.scenarios.pessimistic.npv > 0 ? 
                            '비관적 시나리오에서도 수익성 확보로 안정적 투자' :
                            '시장 변화에 민감하므로 리스크 관리 계획 필수'
                          }
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 최종 투자 결론 */}
                  <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-indigo-500">
                    <div className="flex items-start">
                      <div className="text-2xl mr-3">🎯</div>
                      <div>
                        <div className="font-bold text-gray-900 mb-2">최종 투자 결론</div>
                        <div className="text-gray-700 leading-relaxed">
                          <strong className={getInvestmentGrade().color}>
                            {getInvestmentGrade().recommendation}
                          </strong>
                          {getInvestmentGrade().grade === 'S' || getInvestmentGrade().grade === 'AAA' ? 
                            ' 모든 재무지표가 우수하여 즉시 투자 실행을 권장하며, 정책자금 신청 시 높은 선정 확률이 예상됩니다.' :
                            getInvestmentGrade().grade === 'AA' || getInvestmentGrade().grade === 'A' ?
                            ' 대부분의 재무지표가 양호하여 투자를 권장하며, 적절한 정책자금 지원으로 수익성을 극대화할 수 있습니다.' :
                            getInvestmentGrade().grade === 'BBB' || getInvestmentGrade().grade === 'BB' ?
                            ' 일부 지표에서 개선이 필요하므로 투자 조건을 재검토하고 리스크 완화 방안을 마련한 후 진행하시기 바랍니다.' :
                            ' 현재 조건으로는 투자 수익성이 부족하므로 사업계획 전면 재검토가 필요합니다.'
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* NPV 추이 분석 안내 */}
            <Card className="lg:col-span-1 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                                 <CardTitle className="flex items-center">
                   <LineChartIcon className="w-6 h-6 mr-3" />
                   NPV 추이 분석
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">NPV 추이 차트</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      투자 정보를 입력하고 분석을 실행하면<br />
                      연도별 NPV 추이 차트가 표시됩니다
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                      <span>📊 선형 차트</span>
                      <span>•</span>
                      <span>📈 누적 NPV</span>
                      <span>•</span>
                      <span>📅 {inputs.analysisYears}년간</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 현금흐름 분석 안내 */}
            <Card className="lg:col-span-1 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-6 h-6 mr-3" />
                  현금흐름 분석
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">현금흐름 차트</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      투자 정보를 입력하고 분석을 실행하면<br />
                      연도별 현금흐름 차트가 표시됩니다
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                      <span>💰 현금흐름</span>
                      <span>•</span>
                      <span>💎 할인 현금흐름</span>
                      <span>•</span>
                      <span>📅 {inputs.analysisYears}년간</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 투자분석 리포트 안내 */}
            <Card className="lg:col-span-3 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
                <CardTitle className="flex items-center">
                  <Award className="w-6 h-6 mr-3" />
                  AI 투자분석 리포트
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full mb-6">
                    <Calculator className="w-12 h-12 text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    투자 분석을 시작하세요
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    초기 투자금액, 연간 매출액, 비용 등 기본 정보를 입력하고 <strong>"투자 분석 실행"</strong> 버튼을 클릭하면<br />
                    AI가 10년간 정밀한 NPV/IRR 분석을 수행하여 투자 타당성을 평가해드립니다.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-blue-600 font-semibold">NPV</div>
                      <div className="text-sm text-blue-700">순현재가치</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-green-600 font-semibold">IRR</div>
                      <div className="text-sm text-green-700">내부수익률</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="text-purple-600 font-semibold">회수기간</div>
                      <div className="text-sm text-purple-700">투자 회수 기간</div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="text-orange-600 font-semibold">투자등급</div>
                      <div className="text-sm text-orange-700">AAA ~ C급</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span>🚀 실시간 분석</span>
                    <span>•</span>
                    <span>🎯 맞춤 추천</span>
                    <span>•</span>
                    <span>📊 선형 차트</span>
                    <span>•</span>
                    <span>🤖 AI 리포트</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

const PolicyFundingAnalysis = () => {
  // 모든 성공사례를 통합하여 표시
  const allStories = Object.values(successStories).flat();

  const DualBrainSolution = ({ story }: { story: any }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      {/* 왼쪽: 도전과제 분석 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-red-50 border border-red-200 rounded-xl p-6"
      >
        <div className="flex items-center mb-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <Target className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-red-800 ml-3">주요 도전과제</h3>
        </div>
        <ul className="space-y-3">
          {story.challenges.map((challenge: string, index: number) => (
            <li key={index} className="flex items-start">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-red-700 text-sm leading-relaxed">{challenge}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* 오른쪽: 솔루션 전략 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
      >
        <div className="flex items-center mb-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-blue-800 ml-3">듀얼브레인 솔루션</h3>
        </div>
        <ul className="space-y-3">
          {story.solutions.map((solution: string, index: number) => (
            <li key={index} className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-blue-700 text-sm leading-relaxed">{solution}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );

  return (
    <div>
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <Badge className="bg-purple-100 text-purple-700 mb-4">
          <Award className="w-4 h-4 mr-2" />
          정책자금 성공사례 분석
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          맞춤형 정책자금 성공사례
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          업종별 정책자금 성공사례를 확인하고, 경영지도사의 전문적인 도움을 받아보세요
        </p>
      </motion.div>

      {/* 성공사례 목록 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          정책자금 성공사례 {allStories.length}건
        </h2>
        
        <div className="space-y-8">
          {allStories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="p-3 bg-white/20 rounded-lg mr-4">
                              <Building className="w-8 h-8" />
                            </div>
                            <div>
                              <CardTitle className="text-2xl font-bold">{story.title}</CardTitle>
                              <CardDescription className="text-blue-100 text-lg">
                                {story.company}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge className="bg-white/20 text-white border-white/30">
                            성공률 {story.successRate}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-8">
                        {/* 기본 정보 */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                            <div className="text-sm font-semibold text-gray-700">위치</div>
                            <div className="text-sm text-gray-600">{story.location}</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                            <div className="text-sm font-semibold text-gray-700">지원금액</div>
                            <div className="text-sm text-gray-600">{story.amount}</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                            <div className="text-sm font-semibold text-gray-700">기간</div>
                            <div className="text-sm text-gray-600">{story.duration}</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <Award className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                            <div className="text-sm font-semibold text-gray-700">업종</div>
                            <div className="text-sm text-gray-600">{story.industry}</div>
                          </div>
                        </div>

                        {/* 프로젝트 개요 */}
                        <div className="mb-8">
                          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <FileText className="w-6 h-6 mr-2 text-blue-600" />
                            프로젝트 개요
                          </h3>
                          <p className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg">
                            {story.description}
                          </p>
                        </div>

                        {/* 주요 성과 */}
                        <div className="mb-8">
                          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                            주요 성과 및 특징
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {story.keyFeatures.map((feature: string, idx: number) => (
                              <div key={idx} className="flex items-start p-3 bg-green-50 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                                <span className="text-green-800 text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 듀얼브레인 솔루션 */}
                        <DualBrainSolution story={story} />

                        {/* 경제적 효과 */}
                        <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                          <h3 className="text-xl font-bold text-orange-800 mb-3 flex items-center">
                            <TrendingUp className="w-6 h-6 mr-2" />
                            경제적 효과
                          </h3>
                          <p className="text-orange-700 font-semibold">{story.impact}</p>
                        </div>

                        {/* 경영지도사 상담 안내 */}
                        <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
                          <h3 className="text-xl font-bold text-purple-800 mb-3 flex items-center">
                            <Users className="w-6 h-6 mr-2" />
                            경영지도사 상담 안내
                          </h3>
                          <p className="text-purple-700 mb-4">
                            이와 유사한 프로젝트를 계획하고 계신가요? 전문 경영지도사가 맞춤형 정책자금 컨설팅을 제공해드립니다.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center p-3 bg-white rounded-lg">
                              <Phone className="w-5 h-5 text-purple-600 mr-3" />
                              <div>
                                <div className="font-semibold text-purple-800">전화 상담</div>
                                <div className="text-sm text-purple-600">1588-1234</div>
                              </div>
                            </div>
                            <div className="flex items-center p-3 bg-white rounded-lg">
                              <Mail className="w-5 h-5 text-purple-600 mr-3" />
                              <div>
                                <div className="font-semibold text-purple-800">이메일 상담</div>
                                <div className="text-sm text-purple-600">consult@policy.go.kr</div>
                              </div>
                            </div>
                          </div>
                          <Button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">
                            <Users className="w-4 h-4 mr-2" />
                            상담 신청하기
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
          </div>
            </motion.div>

      {/* 추가 안내 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center"
      >
        <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2">
              더 많은 정책자금 정보가 필요하신가요?
            </CardTitle>
            <CardDescription className="text-blue-100">
              정책자금 전문가가 직접 상담해드립니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                <Phone className="w-4 h-4 mr-2" />
                전화 상담 (1588-1234)
              </Button>
              <Button className="bg-white/20 text-white hover:bg-white/30 border border-white/30">
                <Mail className="w-4 h-4 mr-2" />
                온라인 상담 신청
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

// 메인 컴포넌트 - NPV/IRR 분석기 + 정책자금 성공사례
const InteractiveFinancialCharts = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* NPV/IRR 투자 타당성 분석기 */}
        <NPVAnalysisTool />
        
        {/* 구분선 */}
        <div className="my-16 border-t border-gray-200"></div>
        
        {/* 정책자금 성공사례 */}
        <PolicyFundingAnalysis />
      </div>
    </div>
  );
};

export default InteractiveFinancialCharts; 