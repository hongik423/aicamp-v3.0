// Vercel 최적화 설정 - 안정성 강화
export const dynamic = 'force-dynamic';
export const revalidate = false;
export const runtime = 'nodejs';
export const maxDuration = 60; // 🚀 1분 이내 완료 목표

import { NextRequest, NextResponse } from 'next/server';
import { EnhancedDiagnosisEngine, validateDiagnosisData } from '@/lib/utils/enhancedDiagnosisEngine';
import GeminiAnalysisEngine from '@/lib/utils/geminiAnalysisEngine';
import { getIndustryCharacteristics, getSupportPrograms, getSuccessFactors } from '@/constants/industries';

interface SimplifiedDiagnosisRequest {
  companyName: string;
  industry: string | string[];
  contactManager: string;
  phone: string;
  email: string;
  employeeCount: string;
  businessLocation: string;
  privacyConsent: boolean;
  
  // 5점 척도 평가표 문항별 점수 (20개 항목)
  planning_level?: number;
  differentiation_level?: number;
  pricing_level?: number;
  expertise_level?: number;
  quality_level?: number;
  customer_greeting?: number;
  customer_service?: number;
  complaint_management?: number;
  customer_retention?: number;
  customer_understanding?: number;
  marketing_planning?: number;
  offline_marketing?: number;
  online_marketing?: number;
  sales_strategy?: number;
  purchase_management?: number;
  inventory_management?: number;
  exterior_management?: number;
  interior_management?: number;
  cleanliness?: number;
  work_flow?: number;
  
  [key: string]: any;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    console.log('🚀 빠른 AI 진단 시스템 시작 (1분 이내 목표)');
    
    const data: SimplifiedDiagnosisRequest = await request.json();
    
    // 업종 배열을 문자열로 변환
    if (Array.isArray(data.industry)) {
      data.industry = data.industry.join(', ');
    }
    
    // 필수 필드 검증
    if (!data.companyName || !data.industry || !data.contactManager || !data.phone || !data.email) {
      return NextResponse.json({
        success: false,
        error: '필수 정보가 누락되었습니다. (회사명, 업종, 담당자명, 연락처, 이메일을 모두 입력해주세요)'
      }, { status: 400 });
    }

    // 개인정보 동의 확인
    if (!data.privacyConsent) {
      return NextResponse.json({
        success: false,
        error: '개인정보 수집 및 이용에 동의해주세요.'
      }, { status: 400 });
    }

    // 1단계: 빠른 진단 실행
    let enhancedResult: any;
    try {
      const diagnosisEngine = new EnhancedDiagnosisEngine();
      
      // 빠른 진단 실행 (5초 타임아웃)
      enhancedResult = await Promise.race([
        Promise.resolve(diagnosisEngine.evaluate(data)),
        new Promise((_, reject) => setTimeout(() => reject(new Error('진단 엔진 타임아웃')), 5000))
      ]);
      
      console.log('✅ 진단 완료:', enhancedResult.totalScore + '점');
      
    } catch (error) {
      console.error('❌ 진단 실패, 빠른 진단으로 전환:', error.message);
      // 빠른 폴백 진단 실행
      enhancedResult = await generateFastDiagnosis(data);
    }

    // 2단계: 빠른 SWOT 분석
    let swotAnalysis;
    try {
      swotAnalysis = await Promise.race([
        generateSWOTAnalysis(data, enhancedResult),
        new Promise((_, reject) => setTimeout(() => reject(new Error('SWOT 분석 타임아웃')), 3000))
      ]);
    } catch (error) {
      console.error('❌ SWOT 분석 실패, 빠른 SWOT으로 전환:', error.message);
      swotAnalysis = generateFastSWOT(data, enhancedResult);
    }
    
    // 3단계: 빠른 추천사항 생성
    const totalScore = enhancedResult.totalScore || 60;
    const industry = data.industry || '일반 업종';
    
    const recommendations = [
      `AI 자동화 도구 도입으로 업무 효율성 향상`,
      `${industry} 특화 디지털 마케팅 강화`,
      `고객 서비스 시스템 개선`,
      `데이터 기반 의사결정 체계 구축`,
      `직원 디지털 역량 교육 프로그램 실시`
    ];
    
    const actionPlan = {
      immediate: ['현재 업무 프로세스 분석', 'AI 도구 체험 교육'],
      shortTerm: ['핵심 업무 자동화 구축', '직원 교육 프로그램'],
      mediumTerm: ['시스템 통합 및 최적화', '성과 측정 체계 구축'],
      longTerm: ['AI 기반 혁신 문화 정착', '지속적 개선 체계 운영']
    };

    // 4단계: 빠른 보고서 생성
    const comprehensiveReport = `
=== AI CAMP 진단 보고서 ===
기업명: ${data.companyName}
업종: ${industry}
총점: ${totalScore}점

=== 주요 결과 ===
• 종합 등급: ${enhancedResult.overallGrade}
• 추천사항: ${recommendations.slice(0, 3).join(', ')}

=== SWOT 요약 ===
강점: ${swotAnalysis.strengths.slice(0, 2).join(', ')}
약점: ${swotAnalysis.weaknesses.slice(0, 2).join(', ')}

=== 다음 단계 ===
${actionPlan.immediate.join(', ')}

상세 분석은 이메일로 발송됩니다.
    `.trim();

    // 5단계: 빠른 결과 생성 및 반환
    const resultId = `FAST_${Date.now()}`;
    const processingTime = Date.now() - startTime;
    
    console.log(`🎉 빠른 진단 완료! 총 소요시간: ${processingTime}ms`);
    
    const diagnosisResult = {
      resultId,
      companyName: data.companyName,
      totalScore: enhancedResult.totalScore,
      overallGrade: enhancedResult.overallGrade,
      categoryResults: enhancedResult.categoryResults || [],
      swotAnalysis,
      recommendations,
      actionPlan,
      report: comprehensiveReport,
      processingTime: `${processingTime}ms`
    };

    // 🚀 하이브리드 처리: 즉시 응답 + 백그라운드 정밀 분석
    const response = {
      success: true,
      message: `빠른 진단 완료! (${processingTime}ms)`,
      data: {
        ...diagnosisResult,
        analysisType: 'smart-fallback',
        enhancementStatus: 'processing', // 백그라운드에서 정밀 분석 진행 중
        enhancementETA: '2-3분 후 완성'
      },
      resultUrl: `/diagnosis/results/${resultId}`,
      timestamp: new Date().toISOString()
    };

    // 백그라운드에서 정밀 분석 시작 (응답 후 비동기 실행)
    setImmediate(() => {
      enhanceAnalysisInBackground(resultId, data, diagnosisResult)
        .catch(error => console.error('❌ 백그라운드 정밀 분석 실패:', error));
    });

    return NextResponse.json(response);

  } catch (error) {
    console.error('❌ 진단 처리 중 오류:', error);
    return NextResponse.json({
      success: false,
      error: '진단 처리 중 오류가 발생했습니다.',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// 🧠 스마트 폴백 진단 - 개별 기업 특성 반영
async function generateFastDiagnosis(data: SimplifiedDiagnosisRequest): Promise<any> {
  console.log('🧠 스마트 폴백 진단 실행 - 개별 기업 특성 분석');
  
  // 1단계: 기업 프로필 분석
  const companyProfile = analyzeCompanyProfile(data);
  console.log('📊 기업 프로필:', companyProfile);
  
  const scoreFields = [
    'planning_level', 'differentiation_level', 'pricing_level', 'expertise_level', 'quality_level',
    'customer_greeting', 'customer_service', 'complaint_management', 'customer_retention',
    'customer_understanding', 'marketing_planning', 'offline_marketing', 'online_marketing', 'sales_strategy',
    'purchase_management', 'inventory_management',
    'exterior_management', 'interior_management', 'cleanliness', 'work_flow'
  ];
  
  // 2단계: 업종별 가중치 적용 점수 계산
  const industryWeights = getIndustryWeights(companyProfile.industry);
  let weightedTotal = 0;
  let totalWeight = 0;
  let validScores = 0;
  
  scoreFields.forEach((field, index) => {
    const score = data[field];
    const weight = industryWeights[field] || 1.0;
    
    if (score && typeof score === 'number' && score >= 1 && score <= 5) {
      weightedTotal += score * weight;
      totalWeight += weight;
      validScores++;
    } else {
      // 기업 규모에 따른 스마트 기본값
      const smartDefault = getSmartDefault(field, companyProfile);
      weightedTotal += smartDefault * weight;
      totalWeight += weight;
      validScores++;
    }
  });
  
  const averageScore = weightedTotal / totalWeight;
  const totalScore = Math.round(averageScore * 20);
  
  let overallGrade = 'C';
  if (totalScore >= 80) overallGrade = 'A';
  else if (totalScore >= 70) overallGrade = 'B+';
  else if (totalScore >= 60) overallGrade = 'B';
  else if (totalScore >= 50) overallGrade = 'C+';
  
  // 3단계: 기업 특성 기반 맞춤형 카테고리 결과 생성
  const categoryResults = generateSmartCategoryResults(companyProfile, averageScore, data);
  
  return {
    totalScore,
    overallGrade,
    reliabilityScore: Math.min(95, 60 + validScores),
    categoryResults,
    recommendedActions: [
      { action: '마케팅 역량 강화', priority: 'high' },
      { action: '고객 서비스 개선', priority: 'medium' },
      { action: '운영 효율성 향상', priority: 'medium' }
    ],
    detailedMetrics: {
      businessModel: totalScore * 0.8,
      marketPosition: totalScore * 0.9,
      operationalEfficiency: totalScore * 0.85,
      growthPotential: totalScore * 0.75,
      digitalReadiness: totalScore * 0.7,
      financialHealth: totalScore * 0.8
    }
  };
}

// 🎯 스마트 SWOT 분석 - 개별 기업 특성 반영
function generateFastSWOT(data: SimplifiedDiagnosisRequest, diagnosisResult: any): any {
  const totalScore = diagnosisResult.totalScore || 60;
  const companyProfile = analyzeCompanyProfile(data);
  const { industry, size, characteristics, marketType } = companyProfile;
  
  // 업종별 SWOT 템플릿
  const swotTemplates: Record<string, any> = {
    '제조업': {
      strengths: ['생산 기술력', '품질 관리 시스템', '공급망 안정성', '기술 노하우'],
      weaknesses: ['디지털화 지연', '마케팅 역량 부족', '고객 접점 한계', '데이터 활용 미흡'],
      opportunities: ['스마트팩토리 도입', 'IoT 기술 활용', '정부 제조업 지원', '해외 시장 진출'],
      threats: ['해외 저가 경쟁', '원자재 가격 상승', '환경 규제 강화', '숙련 인력 부족']
    },
    '서비스업': {
      strengths: ['고객 관계 관리', '서비스 경험', '시장 이해도', '유연한 대응'],
      weaknesses: ['표준화 부족', '시스템화 미흡', '데이터 분석 역량', '브랜딩'],
      opportunities: ['디지털 서비스 확장', '구독 모델 도입', '개인화 서비스', 'O2O 융합'],
      threats: ['플랫폼 기업 진입', '고객 기대 상승', '인건비 상승', '서비스 동질화']
    },
    'IT': {
      strengths: ['기술 전문성', '혁신 역량', '빠른 적응력', '프로젝트 경험'],
      weaknesses: ['영업 역량', '마케팅 전문성', '고객 유지', '사업 다각화'],
      opportunities: ['AI/빅데이터 수요', '디지털 전환 가속화', '클라우드 확산', '원격근무 확대'],
      threats: ['기술 변화 속도', '인력 경쟁 심화', '대기업 진입', '해외 기업 경쟁']
    }
  };
  
  const template = swotTemplates[industry] || {
    strengths: ['기본 운영 역량', '업계 경험', '고객 관계'],
    weaknesses: ['디지털화', '마케팅', '시스템화'],
    opportunities: ['기술 도입', '시장 확장', '정부 지원'],
    threats: ['경쟁 심화', '비용 상승', '규제 변화']
  };
  
  // 기업 규모별 특성 반영
  const sizeModifiers = {
    'micro': {
      strengths: ['신속한 의사결정', '유연성', '전문성'],
      weaknesses: ['자원 부족', '시스템 미비', '마케팅 한계'],
      opportunities: ['틈새시장 진입', '정부 지원사업', '협업 기회'],
      threats: ['자금 조달', '인력 확보', '시장 변화']
    },
    'small': {
      strengths: ['고객 밀착', '전문 서비스', '빠른 적응'],
      weaknesses: ['규모의 경제', '인력 부족', '브랜드 인지도'],
      opportunities: ['디지털 전환', '파트너십', '시장 확장'],
      threats: ['대기업 경쟁', '비용 압박', '인재 유출']
    },
    'medium': {
      strengths: ['안정적 운영', '체계적 관리', '시장 지위'],
      weaknesses: ['혁신 속도', '유연성', '의사결정 속도'],
      opportunities: ['사업 다각화', '해외 진출', '기술 혁신'],
      threats: ['시장 포화', '신기술 위협', '규제 강화']
    }
  };
  
  const sizeModifier = sizeModifiers[size] || sizeModifiers['small'];
  
  // 지역별 특성 반영
  const locationBonus = marketType === 'metropolitan' ? 
    { opportunities: ['인프라 활용', '네트워킹'], threats: ['임대료 상승', '경쟁 심화'] } :
    { opportunities: ['지역 특화', '정부 지원'], threats: ['인력 부족', '접근성'] };
  
  // 최종 SWOT 조합
  const finalStrengths = [
    ...template.strengths.slice(0, 2),
    ...sizeModifier.strengths.slice(0, 1),
    ...(totalScore >= 70 ? ['우수한 운영 성과'] : [])
  ].slice(0, 3);
  
  const finalWeaknesses = [
    ...template.weaknesses.slice(0, 2),
    ...sizeModifier.weaknesses.slice(0, 1),
    ...(totalScore < 60 ? ['전반적 역량 개선 필요'] : [])
  ].slice(0, 3);
  
  const finalOpportunities = [
    ...template.opportunities.slice(0, 2),
    ...sizeModifier.opportunities.slice(0, 1),
    ...locationBonus.opportunities
  ].slice(0, 4);
  
  const finalThreats = [
    ...template.threats.slice(0, 2),
    ...sizeModifier.threats.slice(0, 1),
    ...locationBonus.threats
  ].slice(0, 4);

  return {
    strengths: finalStrengths,
    weaknesses: finalWeaknesses,
    opportunities: finalOpportunities,
    threats: finalThreats,
    strategies: {
      SO: [`${companyProfile.companyName}의 ${finalStrengths[0]}을 활용한 ${finalOpportunities[0]} 추진`],
      WO: [`${finalWeaknesses[0]} 개선을 통한 ${finalOpportunities[0]} 활용`],
      ST: [`${finalStrengths[0]}으로 ${finalThreats[0]} 위험 최소화`],
      WT: [`${finalWeaknesses[0]} 보완으로 ${finalThreats[0]} 대응력 강화`]
    }
  };
}

// 간단한 SWOT 분석 생성
async function generateSWOTAnalysis(data: SimplifiedDiagnosisRequest, diagnosisResult: any): Promise<any> {
  // 빠른 SWOT 분석으로 위임
  return generateFastSWOT(data, diagnosisResult);
}

// 🧠 기업 프로필 분석 함수
function analyzeCompanyProfile(data: SimplifiedDiagnosisRequest): any {
  const industry = Array.isArray(data.industry) ? data.industry[0] : data.industry;
  
  // 직원 수 기반 기업 규모 분석
  const getCompanySize = (employeeCount: string) => {
    if (employeeCount.includes('1-9')) return 'micro';
    if (employeeCount.includes('10-49')) return 'small';
    if (employeeCount.includes('50-99')) return 'medium';
    if (employeeCount.includes('100-299')) return 'large';
    return 'enterprise';
  };
  
  // 지역 기반 시장 특성 분석
  const getMarketType = (location: string) => {
    const metropolitanAreas = ['서울', '부산', '대구', '인천', '광주', '대전', '울산'];
    return metropolitanAreas.some(city => location?.includes(city)) ? 'metropolitan' : 'regional';
  };
  
  // 업종별 특성 분석
  const getIndustryCharacteristics = (industry: string) => {
    const characteristics = {
      '제조업': { digitalMaturity: 'medium', customerInteraction: 'low', competitionLevel: 'high' },
      '서비스업': { digitalMaturity: 'high', customerInteraction: 'high', competitionLevel: 'medium' },
      'IT': { digitalMaturity: 'high', customerInteraction: 'medium', competitionLevel: 'high' },
      '소매업': { digitalMaturity: 'medium', customerInteraction: 'high', competitionLevel: 'high' },
      '외식업': { digitalMaturity: 'low', customerInteraction: 'high', competitionLevel: 'high' },
      '건설업': { digitalMaturity: 'low', customerInteraction: 'medium', competitionLevel: 'medium' }
    };
    return characteristics[industry] || { digitalMaturity: 'medium', customerInteraction: 'medium', competitionLevel: 'medium' };
  };
  
  return {
    companyName: data.companyName,
    industry: industry,
    size: getCompanySize(data.employeeCount || ''),
    location: data.businessLocation || '',
    marketType: getMarketType(data.businessLocation || ''),
    characteristics: getIndustryCharacteristics(industry),
    employeeCount: data.employeeCount
  };
}

// 🎯 업종별 가중치 설정
function getIndustryWeights(industry: string): Record<string, number> {
  const weights: Record<string, Record<string, number>> = {
    '제조업': {
      planning_level: 1.3, differentiation_level: 1.2, pricing_level: 1.1, expertise_level: 1.4,
      quality_level: 1.5, purchase_management: 1.3, inventory_management: 1.4,
      exterior_management: 1.1, work_flow: 1.3
    },
    '서비스업': {
      customer_greeting: 1.4, customer_service: 1.5, complaint_management: 1.3,
      customer_retention: 1.4, customer_understanding: 1.3, marketing_planning: 1.2,
      online_marketing: 1.3
    },
    'IT': {
      planning_level: 1.4, differentiation_level: 1.5, expertise_level: 1.4,
      online_marketing: 1.3, sales_strategy: 1.2
    },
    '소매업': {
      customer_greeting: 1.3, customer_service: 1.2, marketing_planning: 1.3,
      offline_marketing: 1.2, online_marketing: 1.4, inventory_management: 1.3,
      exterior_management: 1.2, interior_management: 1.3, cleanliness: 1.4
    },
    '외식업': {
      customer_greeting: 1.5, customer_service: 1.4, quality_level: 1.3,
      cleanliness: 1.5, interior_management: 1.2, work_flow: 1.2
    }
  };
  
  return weights[industry] || {};
}

// 🎲 스마트 기본값 생성 (기업 특성 기반)
function getSmartDefault(field: string, profile: any): number {
  const { size, characteristics, marketType } = profile;
  
  // 기업 규모별 기본 점수 조정
  const sizeMultiplier = {
    'micro': 0.8,      // 영세기업: 낮은 기본값
    'small': 0.9,      // 소기업: 약간 낮은 기본값
    'medium': 1.0,     // 중기업: 표준 기본값
    'large': 1.1,      // 대기업: 약간 높은 기본값
    'enterprise': 1.2  // 대기업: 높은 기본값
  };
  
  // 시장 유형별 조정
  const marketMultiplier = marketType === 'metropolitan' ? 1.1 : 0.95;
  
  // 필드별 특성 조정
  let fieldScore = 3.0; // 기본값
  
  if (field.includes('online') || field.includes('digital')) {
    const digitalMap = { 'high': 3.5, 'medium': 3.0, 'low': 2.5 };
    fieldScore = digitalMap[characteristics.digitalMaturity] || 3.0;
  }
  
  if (field.includes('customer')) {
    const customerMap = { 'high': 3.5, 'medium': 3.0, 'low': 2.5 };
    fieldScore = customerMap[characteristics.customerInteraction] || 3.0;
  }
  
  const finalScore = fieldScore * sizeMultiplier[size] * marketMultiplier;
  return Math.max(1, Math.min(5, Math.round(finalScore * 10) / 10));
}

// 🎨 스마트 카테고리 결과 생성
function generateSmartCategoryResults(profile: any, averageScore: number, data: any): any[] {
  const { industry, size, characteristics } = profile;
  
  // 업종별 맞춤형 카테고리 설정
  const categoryTemplates: Record<string, any> = {
    '제조업': {
      categories: ['생산관리', '품질관리', '공급망관리', '기술혁신', '안전관리'],
      strengths: ['생산 노하우', '기술력', '품질 시스템'],
      weaknesses: ['디지털화 부족', '마케팅 역량', '고객 접점']
    },
    '서비스업': {
      categories: ['고객서비스', '서비스품질', '디지털마케팅', '운영효율성', '인력관리'],
      strengths: ['고객 관계', '서비스 경험', '시장 이해'],
      weaknesses: ['표준화 부족', '기술 활용', '데이터 분석']
    },
    'IT': {
      categories: ['기술역량', '프로젝트관리', '고객관리', '혁신', '품질보증'],
      strengths: ['기술 전문성', '혁신 역량', '프로젝트 경험'],
      weaknesses: ['영업 역량', '시장 확장', '고객 유지']
    }
  };
  
  const template = categoryTemplates[industry] || {
    categories: ['상품서비스관리', '고객응대', '마케팅', '구매재고관리', '매장관리'],
    strengths: ['기본 운영', '업계 경험', '고객 관계'],
    weaknesses: ['디지털화', '마케팅', '효율성']
  };
  
  // 기업 규모별 강점/약점 조정
  const sizeAdjustments = {
    'micro': { strengths: ['유연성', '신속한 의사결정'], weaknesses: ['자원 부족', '시스템 미비'] },
    'small': { strengths: ['전문성', '고객 밀착'], weaknesses: ['규모의 경제', '인력 부족'] },
    'medium': { strengths: ['안정성', '체계적 운영'], weaknesses: ['혁신 속도', '시장 대응'] },
    'large': { strengths: ['시스템', '브랜드력'], weaknesses: ['유연성', '혁신 문화'] }
  };
  
  const adjustment = sizeAdjustments[size] || sizeAdjustments['small'];
  
  return template.categories.map((categoryName: string, index: number) => ({
    categoryName,
    currentScore: Math.round(averageScore * (0.9 + Math.random() * 0.2)), // 약간의 변동성
    score100: Math.round(averageScore * 20 * (0.9 + Math.random() * 0.2)),
    weight: 0.2,
    strengths: [...template.strengths, ...adjustment.strengths].slice(0, 2),
    weaknesses: [...template.weaknesses, ...adjustment.weaknesses].slice(0, 2),
    itemResults: []
  }));
}

// 🔍 GEMINI 2.5 Flash 기반 백그라운드 정밀 분석 함수
async function enhanceAnalysisInBackground(resultId: string, data: SimplifiedDiagnosisRequest, initialResult: any): Promise<void> {
  console.log(`🤖 GEMINI 2.5 Flash 백그라운드 정밀 분석 시작: ${resultId}`);
  
  try {
    const geminiEngine = new GeminiAnalysisEngine();
    const industry = Array.isArray(data.industry) ? data.industry[0] : data.industry;
    
    // 1단계: GEMINI 기반 종합 분석
    let geminiComprehensive = null;
    try {
      geminiComprehensive = await Promise.race([
        geminiEngine.analyzeCompanyComprehensive(data),
        new Promise((_, reject) => setTimeout(() => reject(new Error('GEMINI 종합 분석 타임아웃')), 45000)) // 45초
      ]);
      console.log(`✅ GEMINI 종합 분석 완료: ${resultId}`);
    } catch (error) {
      console.log(`⚠️ GEMINI 종합 분석 실패, 기본 분석 유지: ${resultId}`, error);
      geminiComprehensive = {
        overallAssessment: `${data.companyName}은 ${industry} 분야에서 안정적인 운영을 보이고 있습니다.`,
        keyStrengths: ['기본 운영 역량', '업계 경험', '고객 관계'],
        criticalWeaknesses: ['디지털화 필요', '시스템 개선', '마케팅 강화'],
        industryPosition: '업계 평균 수준',
        competitiveAdvantage: '고객 서비스 및 운영 경험',
        urgentImprovements: ['AI 도구 도입', '프로세스 디지털화', '데이터 활용'],
        growthPotential: '중간 수준의 성장 잠재력',
        riskFactors: ['기술 변화', '경쟁 심화'],
        recommendedFocus: 'AI 기술 도입 및 운영 효율성 개선'
      };
    }

    // 2단계: GEMINI 기반 고급 SWOT 분석
    let geminiSWOT = null;
    try {
      geminiSWOT = await Promise.race([
        geminiEngine.generateAdvancedSWOT(data, initialResult),
        new Promise((_, reject) => setTimeout(() => reject(new Error('GEMINI SWOT 분석 타임아웃')), 40000)) // 40초
      ]);
      console.log(`✅ GEMINI SWOT 분석 완료: ${resultId}`);
    } catch (error) {
      console.log(`⚠️ GEMINI SWOT 실패, 기본 SWOT 유지: ${resultId}`, error);
      geminiSWOT = initialResult.swotAnalysis;
    }

    // 3단계: GEMINI 기반 맞춤형 로드맵 생성
    let geminiRoadmap = null;
    try {
      geminiRoadmap = await Promise.race([
        geminiEngine.generateCustomRoadmap(data, geminiSWOT, initialResult),
        new Promise((_, reject) => setTimeout(() => reject(new Error('GEMINI 로드맵 생성 타임아웃')), 35000)) // 35초
      ]);
      console.log(`✅ GEMINI 로드맵 생성 완료: ${resultId}`);
    } catch (error) {
      console.log(`⚠️ GEMINI 로드맵 실패, 기본 로드맵 생성: ${resultId}`, error);
      geminiRoadmap = generateFallbackRoadmap(data, initialResult);
    }

    // 4단계: 업종별 특화 인사이트 (80개 업종 지원)
    const industryInsights = generateAdvancedIndustryInsights(industry, data);
    
    // 5단계: GEMINI 기반 종합 보고서 생성
    let comprehensiveReport = null;
    try {
      const analysisResults = {
        ...initialResult,
        geminiComprehensive,
        swotAnalysis: geminiSWOT,
        roadmap: geminiRoadmap,
        industryInsights
      };
      
      comprehensiveReport = await Promise.race([
        geminiEngine.generateComprehensiveReport(data, analysisResults),
        new Promise((_, reject) => setTimeout(() => reject(new Error('GEMINI 보고서 생성 타임아웃')), 30000)) // 30초
      ]);
      console.log(`✅ GEMINI 종합 보고서 생성 완료: ${resultId}`);
    } catch (error) {
      console.log(`⚠️ GEMINI 보고서 실패, 기본 보고서 생성: ${resultId}`, error);
      comprehensiveReport = generateFallbackReport(data, initialResult, geminiSWOT);
    }
    
    // 6단계: 최종 정밀 분석 결과 구성
    const enhancedAnalysis = {
      ...initialResult,
      analysisType: 'gemini-enhanced',
      enhancementStatus: 'completed',
      enhancedAt: new Date().toISOString(),
      geminiComprehensive,
      geminiSWOT,
      geminiRoadmap,
      industryInsights,
      comprehensiveReport,
      confidenceScore: calculateGeminiConfidenceScore(geminiComprehensive, geminiSWOT),
      processingTime: `${Date.now() - parseInt(resultId.split('_')[1])}ms`,
      aiProvider: 'GEMINI 2.5 Flash'
    };
    
    console.log(`🎉 GEMINI 2.5 Flash 백그라운드 정밀 분석 완료: ${resultId}`);
    
    // Google Apps Script로 완전한 보고서 전송 (이메일 발송)
    try {
      await submitEnhancedDiagnosisToGoogle({
        ...data,
        enhancedAnalysis,
        reportContent: comprehensiveReport
      });
      console.log(`📧 GEMINI 기반 완전한 보고서 이메일 전송 완료: ${resultId}`);
    } catch (emailError) {
      console.error(`❌ 이메일 전송 실패: ${resultId}`, emailError);
    }
    
  } catch (error) {
    console.error(`❌ GEMINI 백그라운드 정밀 분석 전체 실패: ${resultId}`, error);
  }
}

// 🧠 고급 SWOT 분석 (더 정교한 분석)
async function generateAdvancedSWOTAnalysis(data: SimplifiedDiagnosisRequest, diagnosisResult: any): Promise<any> {
  // 기본 SWOT에 더 정교한 분석 추가
  const basicSWOT = generateFastSWOT(data, diagnosisResult);
  const companyProfile = analyzeCompanyProfile(data);
  
  // 경쟁사 분석 시뮬레이션
  const competitorAnalysis = {
    marketPosition: companyProfile.size === 'large' ? 'leader' : 'challenger',
    competitiveAdvantages: basicSWOT.strengths.slice(0, 2),
    competitiveThreats: basicSWOT.threats.slice(0, 2)
  };
  
  // 트렌드 분석 추가
  const trendAnalysis = {
    emergingOpportunities: ['AI 자동화', '디지털 전환', '지속가능성'],
    emergingThreats: ['기술 변화', '규제 강화', '시장 변동성']
  };
  
  return {
    ...basicSWOT,
    competitorAnalysis,
    trendAnalysis,
    strategicPriority: determineStrategicPriority(basicSWOT, companyProfile),
    actionPlan: generateDetailedActionPlan(basicSWOT, companyProfile)
  };
}

// 🏭 업종별 특화 인사이트 생성
async function generateIndustrySpecificInsights(data: SimplifiedDiagnosisRequest, diagnosisResult: any): Promise<any> {
  const companyProfile = analyzeCompanyProfile(data);
  const industry = companyProfile.industry;
  
  const industryInsights: Record<string, any> = {
    '제조업': {
      keyTrends: ['스마트팩토리', 'ESG 경영', '공급망 리질리언스'],
      benchmarkMetrics: ['생산성 지수', '품질 수준', '자동화 정도'],
      governmentSupport: ['스마트제조혁신 바우처', '제조업 디지털 전환', '탄소중립 지원'],
      recommendedTools: ['MES 시스템', 'IoT 센서', 'AI 품질검사']
    },
    '서비스업': {
      keyTrends: ['디지털 고객경험', '구독 경제', '옴니채널'],
      benchmarkMetrics: ['고객만족도', 'NPS 점수', '디지털 전환율'],
      governmentSupport: ['서비스업 디지털 전환', '고객경험 혁신', 'K-뉴딜 서비스업'],
      recommendedTools: ['CRM 시스템', '챗봇', '데이터 분석 플랫폼']
    }
  };
  
  return industryInsights[industry] || {
    keyTrends: ['디지털 전환', '지속가능성', '고객 중심'],
    benchmarkMetrics: ['운영 효율성', '고객 만족도', '수익성'],
    governmentSupport: ['중소기업 디지털 전환', 'AI 바우처', '혁신 지원'],
    recommendedTools: ['업무 자동화 도구', '데이터 분석', '클라우드 서비스']
  };
}

// 🎯 고급 추천사항 생성
function generateAdvancedRecommendations(data: SimplifiedDiagnosisRequest, diagnosisResult: any, swotAnalysis: any): string[] {
  const companyProfile = analyzeCompanyProfile(data);
  const totalScore = diagnosisResult.totalScore || 60;
  
  const recommendations = [];
  
  // 점수 기반 우선순위 추천
  if (totalScore < 60) {
    recommendations.push(`${companyProfile.companyName}의 기본 운영 체계 강화가 최우선 과제입니다`);
    recommendations.push(`${swotAnalysis.weaknesses[0]} 개선을 위한 단계적 접근 필요`);
  } else if (totalScore >= 80) {
    recommendations.push(`${companyProfile.companyName}의 우수한 역량을 활용한 사업 확장 검토`);
    recommendations.push(`${swotAnalysis.opportunities[0]} 기회 적극 활용 전략 수립`);
  }
  
  // 규모별 맞춤 추천
  const sizeRecommendations = {
    'small': [`소기업 특화 정부 지원사업 적극 활용`, `핵심 역량 집중을 통한 차별화 전략`],
    'medium': [`체계적 성장 관리를 위한 시스템 구축`, `시장 확장을 위한 파트너십 전략`],
    'large': [`조직 혁신을 통한 경쟁력 강화`, `신사업 진출을 위한 전략적 투자`]
  };
  
  recommendations.push(...(sizeRecommendations[companyProfile.size] || sizeRecommendations['small']));
  
  return recommendations.slice(0, 5);
}

// 📊 신뢰도 점수 계산
function calculateConfidenceScore(diagnosisResult: any, swotAnalysis: any): number {
  let confidence = 70; // 기본 신뢰도
  
  // 데이터 완성도에 따른 조정
  if (diagnosisResult.reliabilityScore > 90) confidence += 15;
  else if (diagnosisResult.reliabilityScore > 80) confidence += 10;
  else if (diagnosisResult.reliabilityScore < 70) confidence -= 10;
  
  // SWOT 분석 품질에 따른 조정
  const swotQuality = (swotAnalysis.strengths.length + swotAnalysis.weaknesses.length) * 2.5;
  confidence += Math.min(10, swotQuality);
  
  return Math.min(95, Math.max(60, confidence));
}

// 🎯 전략적 우선순위 결정
function determineStrategicPriority(swotAnalysis: any, companyProfile: any): string {
  const strengths = swotAnalysis.strengths.length;
  const weaknesses = swotAnalysis.weaknesses.length;
  const opportunities = swotAnalysis.opportunities.length;
  
  if (strengths >= weaknesses && opportunities > 2) {
    return 'growth'; // 성장 전략
  } else if (weaknesses > strengths) {
    return 'improvement'; // 개선 전략
  } else {
    return 'stability'; // 안정화 전략
  }
}

// 📋 상세 액션 플랜 생성
function generateDetailedActionPlan(swotAnalysis: any, companyProfile: any): any {
  const priority = determineStrategicPriority(swotAnalysis, companyProfile);
  
  const actionPlans = {
    'growth': {
      immediate: ['시장 기회 분석', '성장 자원 확보'],
      shortTerm: ['핵심 역량 확장', '새로운 시장 진입'],
      longTerm: ['사업 다각화', '시장 리더십 확보']
    },
    'improvement': {
      immediate: ['약점 영역 진단', '개선 계획 수립'],
      shortTerm: ['핵심 프로세스 개선', '역량 강화 교육'],
      longTerm: ['경쟁력 확보', '시장 포지션 강화']
    },
    'stability': {
      immediate: ['현재 강점 유지', '안정성 확보'],
      shortTerm: ['효율성 최적화', '리스크 관리'],
      longTerm: ['지속가능 성장', '혁신 역량 구축']
    }
  };
  
  return actionPlans[priority] || actionPlans['stability'];
}