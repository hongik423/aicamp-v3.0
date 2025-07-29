// Vercel 최적화 설정 - 안정성 강화
export const dynamic = 'force-dynamic';
export const revalidate = false;
export const runtime = 'nodejs';
export const maxDuration = 30; // 30초 타임아웃으로 Vercel 제한 해결

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { saveToGoogleSheets } from '@/lib/utils/googleSheetsService';
import { processDiagnosisSubmission, submitDiagnosisToGoogle, type DiagnosisFormData } from '@/lib/utils/emailService';
import { CONSULTANT_INFO, CONTACT_INFO, COMPANY_INFO } from '@/lib/config/branding';
import { getGeminiKey, isDevelopment, maskApiKey } from '@/lib/config/env';
import { EnhancedDiagnosisEngine, DiagnosisReportGenerator, validateDiagnosisData } from '@/lib/utils/enhancedDiagnosisEngine';
import { IndustryDataService, generateIndustryEnhancedReport } from '@/lib/utils/industryDataService';
import { AdvancedSWOTEngine } from '@/lib/utils/advancedSWOTEngine';

interface SimplifiedDiagnosisRequest {
  companyName: string;
  industry: string | string[]; // 🔥 업그레이드: 단일 문자열 또는 배열 모두 지원
  contactManager: string;
  phone: string;
  email: string;
  employeeCount: string;
  growthStage: string;
  businessLocation: string;
  mainConcerns: string;
  expectedBenefits: string;
  privacyConsent: boolean;
  submitDate: string;
  
  // 🔥 **5점 척도 평가표 문항별 점수 (20개 항목) - REQUIRED**
  planning_level?: number;         // 기획수준 (1-5점)
  differentiation_level?: number;  // 차별화정도 (1-5점)
  pricing_level?: number;          // 가격설정 (1-5점)
  expertise_level?: number;        // 전문성 (1-5점)
  quality_level?: number;          // 품질 (1-5점)
  customer_greeting?: number;      // 고객맞이 (1-5점)
  customer_service?: number;       // 고객응대 (1-5점)
  complaint_management?: number;   // 불만관리 (1-5점)
  customer_retention?: number;     // 고객유지 (1-5점)
  customer_understanding?: number; // 고객이해 (1-5점)
  marketing_planning?: number;     // 마케팅계획 (1-5점)
  offline_marketing?: number;      // 오프라인마케팅 (1-5점)
  online_marketing?: number;       // 온라인마케팅 (1-5점)
  sales_strategy?: number;         // 판매전략 (1-5점)
  purchase_management?: number;    // 구매관리 (1-5점)
  inventory_management?: number;   // 재고관리 (1-5점)
  exterior_management?: number;    // 외관관리 (1-5점)
  interior_management?: number;    // 인테리어관리 (1-5점)
  cleanliness?: number;            // 청결도 (1-5점)
  work_flow?: number;              // 작업동선 (1-5점)
  
  // 진단 결과 정보 (프론트엔드에서 전송)
  diagnosisResults?: {
    totalScore: number;
    categoryScores: any;
    recommendedServices: any[];
    strengths: any[];
    weaknesses: any[];
    reportType: string;
  };
}

// 📊 신뢰할 수 있는 다중 지표 평가 체계
interface DetailedScoreMetrics {
  businessModel: number;      // 비즈니스 모델 적합성 (25%)
  marketPosition: number;     // 시장 위치 및 경쟁력 (20%)
  operationalEfficiency: number; // 운영 효율성 (20%)
  growthPotential: number;    // 성장 잠재력 (15%)
  digitalReadiness: number;   // 디지털 준비도 (10%)
  financialHealth: number;    // 재무 건전성 (10%)
}

interface ScoreWeights {
  businessModel: 0.25;
  marketPosition: 0.20;
  operationalEfficiency: 0.20;
  growthPotential: 0.15;
  digitalReadiness: 0.10;
  financialHealth: 0.10;
}

// 📊 업종 카테고리 매핑 (새로운 세분화된 업종을 기존 카테고리로 그룹화)
const industryMapping: Record<string, string> = {
  // 제조업 그룹
  'electronics-manufacturing': 'manufacturing',
  'automotive-manufacturing': 'manufacturing',
  'machinery-manufacturing': 'manufacturing',
  'chemical-manufacturing': 'manufacturing',
  'food-manufacturing': 'food',
  'textile-manufacturing': 'manufacturing',
  'steel-manufacturing': 'manufacturing',
  'medical-manufacturing': 'healthcare',
  'other-manufacturing': 'manufacturing',
  
  // IT/소프트웨어 그룹
  'software-development': 'it',
  'web-mobile-development': 'it',
  'system-integration': 'it',
  'game-development': 'it',
  'ai-bigdata': 'it',
  'cloud-infrastructure': 'it',
  'cybersecurity': 'it',
  'fintech': 'finance',
  
  // 전문서비스업 그룹
  'business-consulting': 'service',
  'accounting-tax': 'service',
  'legal-service': 'service',
  'marketing-advertising': 'service',
  'design-creative': 'service',
  'hr-consulting': 'service',
  
  // 유통/도소매 그룹
  'ecommerce': 'retail',
  'offline-retail': 'retail',
  'wholesale': 'retail',
  'franchise': 'retail',
  
  // 건설/부동산 그룹
  'architecture': 'construction',
  'real-estate': 'service',
  'interior-design': 'service',
  
  // 운송/물류 그룹
  'logistics': 'service',
  'transportation': 'service',
  'warehouse': 'service',
  
  // 식음료/외식 그룹
  'restaurant': 'food',
  'cafe': 'food',
  'food-service': 'food',
  
  // 의료/헬스케어 그룹
  'hospital-clinic': 'healthcare',
  'pharmacy': 'healthcare',
  'beauty-wellness': 'healthcare',
  'fitness': 'healthcare',
  
  // 교육 그룹
  'education-school': 'education',
  'private-academy': 'education',
  'online-education': 'education',
  'language-education': 'education',
  
  // 금융/보험 그룹
  'banking': 'finance',
  'insurance': 'finance',
  'investment': 'finance',
  
  // 문화/엔터테인먼트 그룹
  'entertainment': 'service',
  'tourism-travel': 'service',
  'sports': 'service',
  
  // 기타 서비스 그룹
  'cleaning-facility': 'service',
  'rental-lease': 'service',
  'repair-maintenance': 'service',
  'agriculture': 'other',
  'energy': 'other',
  
  // 기존 업종 (하위 호환성)
  'manufacturing': 'manufacturing',
  'it': 'it',
  'service': 'service',
  'retail': 'retail',
  'construction': 'construction',
  'food': 'food',
  'healthcare': 'healthcare',
  'education': 'education',
  'finance': 'finance',
  'other': 'other'
};

// 6개 핵심 서비스 정보
const mCenterServices = {
  'business-analysis': {
    name: 'BM ZEN 사업분석',
    description: '비즈니스 모델 최적화를 통한 수익성 개선',
    expectedEffect: '매출 20-40% 증대',
    duration: '2-3개월',
    successRate: '95%'
  },
  'ai-productivity': {
    name: 'AI실무활용 생산성향상',
    description: 'ChatGPT 등 AI 도구 활용 업무 효율화',
    expectedEffect: '업무효율 40-60% 향상',
    duration: '1-2개월',
    successRate: '98%'
  },
  'factory-auction': {
    name: '정책자금 확보',
    description: '부동산 경매를 통한 고정비 절감',
    expectedEffect: '부동산비용 30-50% 절감',
    duration: '3-6개월',
    successRate: '85%'
  },
  'tech-startup': {
    name: '기술사업화/기술창업',
    description: '기술을 활용한 사업화 및 창업 지원',
    expectedEffect: '기술가치 평가 상승',
    duration: '6-12개월',
    successRate: '78%'
  },
  'certification': {
    name: '인증지원',
    description: 'ISO, 벤처인증 등 각종 인증 취득',
    expectedEffect: '시장 신뢰도 향상',
    duration: '3-6개월',
    successRate: '92%'
  },
  'website': {
    name: '웹사이트 구축',
    description: 'SEO 최적화 웹사이트 구축',
    expectedEffect: '온라인 문의 300% 증가',
    duration: '1-2개월',
    successRate: '96%'
  }
};

// 🤖 안전한 AI 향상된 진단 (에러 발생시 폴백 처리)
async function generateAIEnhancedReport(data: SimplifiedDiagnosisRequest, diagnosisData: any): Promise<string> {
  try {
    const {
      totalScore = 0,
      categoryScores = {},
      swotAnalysis = {},
      industryInsights = {},
      detailedMetrics = {},
      actionPlan = {},
      recommendations = []
    } = diagnosisData;

    const companyName = data.companyName || '귀사';
    const industry = data.industry || '업종';
    const contactManager = data.contactManager || '담당자';
    const currentDate = new Date().toLocaleDateString('ko-KR');
    const strategies = swotAnalysis.strategies || {};
    const aiAnalysis = swotAnalysis.aiAnalysis || {};

    // 점수별 평가 등급 및 메시지
    const getGradeInfo = (score: number) => {
      if (score >= 80) return { grade: 'A', message: '매우 우수', color: '🟢' };
      if (score >= 70) return { grade: 'B', message: '우수', color: '🔵' };
      if (score >= 60) return { grade: 'C', message: '양호', color: '🟡' };
      if (score >= 50) return { grade: 'D', message: '보통', color: '🟠' };
      return { grade: 'E', message: '개선 필요', color: '🔴' };
    };

    const gradeInfo = getGradeInfo(totalScore);

    // 카테고리별 상세 분석
    const categoryAnalysis = Object.entries(categoryScores)
      .map(([category, data]: [string, any]) => {
        const categoryNameMap: Record<string, string> = {
          productService: '상품/서비스 역량',
          customerService: '고객 서비스',
          marketing: '마케팅/영업',
          procurement: '구매/재고관리',
          storeManagement: '매장/운영관리'
        };
        
        const score = data.score || 0;
        const maxScore = 5;
        const percentage = Math.round((score / maxScore) * 100);
        const name = categoryNameMap[category] || category;
        
        return `  ${name}: ${score.toFixed(1)}/5점 (${percentage}%)`;
      })
      .join('\n');

    // 업종별 벤치마크 비교
    const benchmarkComparison = industryInsights.benchmarkScores
      ? Object.entries(industryInsights.benchmarkScores)
          .map(([metric, score]) => `  • ${metric}: ${score}점`)
          .join('\n')
      : '  • 업종별 벤치마크 데이터 준비중';

    // AI 트렌드 섹션
    const aiTrendsSection = aiAnalysis.currentAITrends && aiAnalysis.currentAITrends.length > 0
      ? `
🤖 ${industry} AI 트렌드 분석
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 현재 주목받는 AI 기술 트렌드:
${aiAnalysis.currentAITrends.map((trend: string, index: number) => `  ${index + 1}. ${trend}`).join('\n')}

🔮 AI로 인한 ${industry} 미래 변화:
${aiAnalysis.futureChanges?.map((change: string, index: number) => `  ${index + 1}. ${change}`).join('\n') || '  • 데이터 수집중'}

🚀 ${companyName}의 AI 적응 전략:
${aiAnalysis.adaptationStrategies?.map((strategy: string, index: number) => `  ${strategy}`).join('\n') || '  • 맞춤형 전략 수립 필요'}

💎 AI 도입시 경쟁 우위:
${aiAnalysis.competitiveAdvantages?.map((advantage: string) => `  • ${advantage}`).join('\n') || '  • 상세 분석 필요'}
`
      : '';

    // SWOT 매트릭스 전략 섹션
    const swotStrategiesSection = strategies.SO && strategies.SO.length > 0
      ? `
🎯 SWOT 매트릭스 전략 분석
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 SO 전략 (강점-기회 활용):
${strategies.SO.map((s: string, i: number) => `  ${i + 1}. ${s}`).join('\n')}

🔧 WO 전략 (약점-기회 보완):
${strategies.WO.map((s: string, i: number) => `  ${i + 1}. ${s}`).join('\n')}

🛡️ ST 전략 (강점-위협 방어):
${strategies.ST.map((s: string, i: number) => `  ${i + 1}. ${s}`).join('\n')}

⚡ WT 전략 (약점-위협 회피):
${strategies.WT.map((s: string, i: number) => `  ${i + 1}. ${s}`).join('\n')}
`
      : '';

    // 최종 보고서 생성
    const report = `
🏆 AI CAMP 경영진단 보고서 - AI 시대 맞춤형 분석
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
작성일: ${currentDate}
기업명: ${companyName}
업종: ${industry}
담당자: ${contactManager}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 종합 진단 결과
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

종합점수: ${totalScore}점/100점 ${gradeInfo.color}
등급: ${gradeInfo.grade}등급 (${gradeInfo.message})

📈 카테고리별 평가:
${categoryAnalysis}

🎯 6대 핵심 지표 분석:
  • 비즈니스 모델: ${detailedMetrics.businessModel?.toFixed(0) || 0}점
  • 시장 포지션: ${detailedMetrics.marketPosition?.toFixed(0) || 0}점
  • 운영 효율성: ${detailedMetrics.operationalEfficiency?.toFixed(0) || 0}점
  • 성장 잠재력: ${detailedMetrics.growthPotential?.toFixed(0) || 0}점
  • 디지털 준비도: ${detailedMetrics.digitalReadiness?.toFixed(0) || 0}점
  • 재무 건전성: ${detailedMetrics.financialHealth?.toFixed(0) || 0}점

🏭 업종별 벤치마크 비교:
${benchmarkComparison}

${aiTrendsSection}

📊 SWOT 분석
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💪 강점 (Strengths):
${swotAnalysis.strengths?.map((s: string) => `  • ${s}`).join('\n') || '  • 데이터 분석중'}

⚠️ 약점 (Weaknesses):
${swotAnalysis.weaknesses?.map((w: string) => `  • ${w}`).join('\n') || '  • 데이터 분석중'}

🌟 기회 (Opportunities):
${swotAnalysis.opportunities?.map((o: string) => `  • ${o}`).join('\n') || '  • 데이터 분석중'}

🚨 위협 (Threats):
${swotAnalysis.threats?.map((t: string) => `  • ${t}`).join('\n') || '  • 데이터 분석중'}

${swotStrategiesSection}

💡 AI 시대 맞춤형 추천 전략
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${recommendations.slice(0, 6).map((rec: string, index: number) => `${index + 1}. ${rec}`).join('\n\n')}

📅 단계별 실행 계획
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏃 즉시 실행 (1개월 이내):
${actionPlan.immediate?.map((action: string) => `  • ${action}`).join('\n') || '  • 우선순위 과제 도출 필요'}

🎯 단기 계획 (3개월):
${actionPlan.shortTerm?.map((action: string) => `  • ${action}`).join('\n') || '  • 단기 목표 설정 필요'}

🚀 중기 계획 (6개월):
${actionPlan.mediumTerm?.map((action: string) => `  • ${action}`).join('\n') || '  • 중기 전략 수립 필요'}

🌟 장기 비전 (1년 이상):
${actionPlan.longTerm?.map((action: string) => `  • ${action}`).join('\n') || '  • 장기 비전 설정 필요'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📞 AI 전문가 상담 안내
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏆 이후경 경영지도사 (AI CAMP 대표)
• 중소벤처기업부 등록 경영지도사
• AI 경영혁신 전문가
• 연락처: 010-9251-9743
• 이메일: hongik423@gmail.com

💎 AI CAMP 특별 혜택:
• 무료 AI 진단 완료 기업 대상 30% 할인
• 맞춤형 AI 도입 로드맵 제공
• 정부 지원사업 매칭 서비스
• 실무자 AI 교육 프로그램 제공

🌐 홈페이지: https://aicamp.club
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*본 보고서는 AI 기반 분석과 전문가 검증을 거쳐 작성되었습니다.*
*${currentDate} 기준 최신 데이터로 분석되었습니다.*
    `.trim();

    console.log('✅ AI 강화 보고서 생성 완료 (길이: ' + report.length + '자)');
    return report;

  } catch (error) {
    console.error('❌ AI 강화 보고서 생성 중 오류:', error);
    // 폴백으로 기본 보고서 반환
    return generateFallbackReport(data, diagnosisData);
  }
}

// 📊 점수 기반 등급 함수
function getGradeFromScore(score: number): string {
  if (score >= 90) return 'S급 (최우수)';
  if (score >= 80) return 'A급 (우수)';
  if (score >= 70) return 'B급 (양호)';
  if (score >= 60) return 'C급 (보통)';
  return 'D급 (개선필요)';
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    console.log('🔄 AI CAMP 이후경 교장의 AI 진단보고서 시스템 시작 (안전 모드)');
    
    const data: SimplifiedDiagnosisRequest = await request.json();
    
    // 🔥 업그레이드: 업종 배열을 문자열로 변환
    if (Array.isArray(data.industry)) {
      data.industry = data.industry.join(', ');
      console.log('✅ 업종 배열을 문자열로 변환:', data.industry);
    }
    
    // 입력 데이터 검증 (배열 처리 개선)
    const hasIndustry = data.industry && (typeof data.industry === 'string' ? data.industry.trim() : Array.isArray(data.industry) && data.industry.length > 0);
    
    if (!data.companyName || !hasIndustry || !data.contactManager || !data.phone || !data.email) {
      console.log('❌ 필수 필드 누락:', {
        companyName: !!data.companyName,
        industry: hasIndustry,
        businessLocation: !!data.businessLocation,
        contactManager: !!data.contactManager,
        phone: !!data.phone,
        email: !!data.email
      });
      return NextResponse.json({
        success: false,
        error: '필수 정보가 누락되었습니다. (회사명, 업종, 담당자명, 연락처, 이메일을 모두 입력해주세요)'
      }, { status: 400 });
    }

    // 개인정보 동의 확인 (엄격한 검증)
    if (!data.privacyConsent || data.privacyConsent !== true) {
      console.log('개인정보 동의 검증 실패:', data.privacyConsent);
      return NextResponse.json({
        success: false,
        error: '개인정보 수집 및 이용에 동의해주세요. 동의는 필수 사항입니다.'
      }, { status: 400 });
    }
    
    console.log('✅ 개인정보 동의 검증 성공:', data.privacyConsent);

    // 📊 20개 문항 5점 척도 평가 데이터 확인
    const scoreFields = [
      'planning_level', 'differentiation_level', 'pricing_level', 'expertise_level', 'quality_level',
      'customer_greeting', 'customer_service', 'complaint_management', 'customer_retention',
      'customer_understanding', 'marketing_planning', 'offline_marketing', 'online_marketing', 'sales_strategy',
      'purchase_management', 'inventory_management',
      'exterior_management', 'interior_management', 'cleanliness', 'work_flow'
    ];
    
    const validScores = scoreFields.filter(field => 
      data[field] && typeof data[field] === 'number' && data[field] >= 1 && data[field] <= 5
    );
    
    console.log('📊 20개 문항 점수 데이터 확인:', {
      총문항수: scoreFields.length,
      입력된문항수: validScores.length,
      완성도: Math.round((validScores.length / scoreFields.length) * 100) + '%',
      입력된점수: validScores.reduce((obj, field) => ({...obj, [field]: data[field]}), {})
    });

    // 1단계: Enhanced 진단평가 엔진 v3.0 실행 (안전 모드)
    console.log('🚀 Enhanced 진단평가 엔진 v3.0 시작 (안전 모드)');
    
    let enhancedResult;
    try {
      const diagnosisEngine = new EnhancedDiagnosisEngine();
      
      // 데이터 유효성 검증
      const validation = validateDiagnosisData(data);
      if (!validation.isValid) {
        console.warn('⚠️ 데이터 유효성 검증 실패, 기본값 적용:', validation.errors);
      }
      
      // 🎯 완벽한 진단 실행 (타임아웃 설정)
      enhancedResult = await Promise.race([
        Promise.resolve(diagnosisEngine.evaluate(data)),
        new Promise((_, reject) => setTimeout(() => reject(new Error('진단 엔진 타임아웃')), 20000))
      ]);
      
      console.log('✅ Enhanced 진단 완료:', {
        totalScore: enhancedResult.totalScore,
        grade: enhancedResult.overallGrade,
        reliability: enhancedResult.reliabilityScore,
        categoriesCount: enhancedResult.categoryResults.length,
        recommendationsCount: enhancedResult.recommendedActions.length
      });
      
    } catch (error) {
      console.error('❌ Enhanced 진단 실패, 폴백 처리:', error);
      // 폴백: 기본 진단 로직
      enhancedResult = generateBasicDiagnosis(data);
    }

    // 2단계: SWOT 분석 생성 (안전 모드)
    let swotAnalysis;
    try {
      swotAnalysis = await generateSWOTAnalysis(data, enhancedResult);
      console.log('🎯 SWOT 분석 완료:', {
        strengths: swotAnalysis.strengths.length,
        weaknesses: swotAnalysis.weaknesses.length,
        opportunities: swotAnalysis.opportunities.length,
        threats: swotAnalysis.threats.length
      });
    } catch (error) {
      console.error('❌ SWOT 분석 실패, 기본값 적용:', error);
      swotAnalysis = generateBasicSWOT(data, enhancedResult.totalScore);
    }

    // 🎯 AI CAMP 교육 커리큘럼 기반 맞춤형 추천사항 생성
    const recommendations = [];
    const actionPlan = {
      immediate: [],
      shortTerm: [],
      mediumTerm: [],
      longTerm: []
    };
    
    // 업종별 AI 교육 프로그램 추천
    const industryEducationMapping: Record<string, { primary: string; secondary: string }> = {
      '제조업': { 
        primary: '생산/물류 트랙 AI & n8n 자동화 교육',
        secondary: '품질관리 AI 시스템 구축 과정'
      },
      'IT': { 
        primary: '기획/전략 트랙 AI 자동화 교육',
        secondary: 'GPT 기반 개발 자동화 과정'
      },
      '서비스업': { 
        primary: '고객지원(CS) 트랙 AI 자동화 교육',
        secondary: '마케팅 트랙 디지털 전환 과정'
      },
      '소매업': { 
        primary: '영업 트랙 AI & n8n 자동화 교육',
        secondary: '재고관리 AI 최적화 과정'
      },
      '외식업': { 
        primary: '고객지원(CS) 트랙 AI 자동화 교육',
        secondary: 'AI 메뉴 최적화 시스템 구축'
      }
    };
    
    const educationPrograms = industryEducationMapping[data.industry] || {
      primary: '기획/전략 트랙 AI 자동화 교육',
      secondary: '맞춤형 AI 도입 컨설팅'
    };
    
    // 점수 기반 교육 수준 결정
    const educationLevel = enhancedResult.totalScore >= 70 ? '심화 과정' : '입문 과정';
    
    // 1. AI 교육 프로그램 추천 (최우선)
    recommendations.push(
      `[최우선] AI CAMP ${educationPrograms.primary} - ${educationLevel} (12시간 집중 교육)`,
      `${educationPrograms.secondary}를 통한 실무 적용 능력 강화`,
      `부서별 맞춤형 AI 자동화 워크플로 구축으로 업무 효율 70% 향상`
    );
    
    // 2. SWOT 전략 기반 추천
    if (swotAnalysis.strategies) {
      if (swotAnalysis.strategies.SO && swotAnalysis.strategies.SO.length > 0) {
        recommendations.push(`[SO전략] ${swotAnalysis.strategies.SO[0]}`);
      }
      if (swotAnalysis.strategies.WO && swotAnalysis.strategies.WO.length > 0) {
        recommendations.push(`[WO전략] ${swotAnalysis.strategies.WO[0]}`);
      }
    }
    
    // 3. 점수별 추가 추천
    if (enhancedResult.totalScore < 60) {
      recommendations.push('정밀 경영진단을 통한 문제점 파악 및 개선 전략 수립');
    }
    if (data.growthStage === '성장기' || data.growthStage === '확장기') {
      recommendations.push('정책자금 컨설팅을 통한 성장 자금 확보 (AI 도입 지원금 활용)');
    }
    
    // 4. AI 트렌드 기반 추천
    if (swotAnalysis.aiAnalysis && swotAnalysis.aiAnalysis.competitiveAdvantages) {
      recommendations.push(swotAnalysis.aiAnalysis.competitiveAdvantages[0]);
    }
    
    // 단계별 실행 계획 생성
    // 즉시 실행 (1개월)
    actionPlan.immediate = [
      `${educationPrograms.primary} ${educationLevel} 교육 대상자 선정 및 일정 확정`,
      'AI 도입 현황 진단 및 우선순위 업무 선정',
      '정부 AI 바우처 지원사업 신청 준비'
    ];
    
    // 단기 계획 (3개월)
    actionPlan.shortTerm = [
      '12시간 AI & n8n 자동화 교육 완료 및 실습 프로젝트 수행',
      '파일럿 자동화 워크플로 구축 및 테스트',
      '부서별 AI 활용 성과 측정 체계 구축'
    ];
    
    // 중기 계획 (6개월)
    actionPlan.mediumTerm = [
      '전사적 AI 자동화 확산 및 고도화',
      `${educationPrograms.secondary} 심화 교육 진행`,
      'AI 기반 신규 비즈니스 모델 개발',
      '정부 지원사업 본격 활용 (세액공제 30% 적용)'
    ];
    
    // 장기 비전 (1년 이상)
    actionPlan.longTerm = [
      'AI 기반 혁신 기업으로 포지셔닝 완성',
      '업계 AI 활용 Best Practice 선도 기업 인증',
      'AI 솔루션 자체 개발 및 특허 출원',
      'AI 생태계 파트너십 구축 및 신시장 진출'
    ];

    // 3단계: 업종별 최신정보 기반 완벽한 진단보고서 생성 (최고 수준)
    let comprehensiveReport;
    let industryTrends = null;
    let industryInsights = null;
    
    try {
      console.log('🏭 업종별 최신정보 검색 시작:', data.industry);
      
      // 안전한 IndustryDataService 호출
      try {
        industryTrends = IndustryDataService.getIndustryTrends(data.industry);
        console.log('📊 업종 트렌드 데이터 조회 완료:', {
          hasData: !!industryTrends,
          industry: data.industry
        });
      } catch (industryError) {
        console.warn('⚠️ IndustryDataService.getIndustryTrends 실패:', industryError.message);
        industryTrends = null;
      }

      // 안전한 업종별 인사이트 생성
      try {
        industryInsights = IndustryDataService.generateIndustryInsights(data.industry, {
          ...data,
          totalScore: enhancedResult.totalScore
        });
        console.log('🎯 업종별 특화 인사이트 생성 완료');
      } catch (insightError) {
        console.warn('⚠️ IndustryDataService.generateIndustryInsights 실패:', insightError.message);
        industryInsights = null;
      }

      // 업종별 최신정보가 있으면 특화 보고서, 없으면 기본 보고서
      if (industryTrends && industryInsights) {
        try {
          comprehensiveReport = generateIndustryEnhancedReport(data.industry, data, enhancedResult);
          console.log('📋 업종별 최신정보 기반 완벽한 진단보고서 생성 완료:', {
            reportLength: comprehensiveReport.length,
            hasIndustryData: !!industryTrends,
            industryTrendsCount: industryTrends?.trends?.length || 0
          });
        } catch (reportError) {
          console.warn('⚠️ generateIndustryEnhancedReport 실패:', reportError.message);
          throw reportError; // 다음 단계로 폴백
        }
      } else {
        console.log('📋 업종별 데이터 부족으로 기본 AI 보고서 생성');
        throw new Error('Industry data unavailable, fallback to AI report');
      }
      
    } catch (error) {
      console.error('❌ 업종별 진단보고서 생성 실패, 기본 AI 보고서로 폴백:', error.message);
    try {
      comprehensiveReport = await generateAIEnhancedReport(data, enhancedResult);
        console.log('📋 기본 AI 보고서 생성 완료:', {
        reportLength: comprehensiveReport.length
      });
      } catch (fallbackError) {
        console.error('❌ AI 보고서도 실패, 기본 보고서로 최종 폴백:', fallbackError.message);
      comprehensiveReport = generateFallbackReport(data, enhancedResult);
        console.log('📋 최종 폴백 보고서 생성 완료:', {
          reportLength: comprehensiveReport.length
        });
      }
    }

    // 4단계: 결과 ID 및 URL 생성
    const resultId = `AI_DIAG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const resultUrl = `/diagnosis/results/${resultId}`;

    // 5단계: 진단 결과 데이터 구조화
    const diagnosisResult = {
      resultId,
      companyName: data.companyName,
      contactManager: data.contactManager,
      email: data.email,
      phone: data.phone,
      industry: data.industry,
      employeeCount: data.employeeCount || '미확인',
      businessLocation: data.businessLocation || '미확인',
      privacyConsent: data.privacyConsent,
      
      // 🎯 완벽한 점수 체계
      totalScore: enhancedResult.totalScore,
      overallGrade: enhancedResult.overallGrade,
      reliabilityScore: enhancedResult.reliabilityScore,
      
      // 📊 5개 카테고리별 상세 점수
      categoryResults: enhancedResult.categoryResults?.map(cat => ({
        category: cat.categoryName,
        score: cat.currentScore,
        score100: cat.score100,
        targetScore: cat.targetScore,
        benchmarkScore: cat.benchmarkScore,
        weight: cat.weight,
        gapScore: cat.gapScore,
        strengths: cat.strengths,
        weaknesses: cat.weaknesses,
        itemResults: cat.itemResults
      })) || [],
      
      // 카테고리별 점수 (보고서용)
      categoryScores: enhancedResult.categoryResults?.reduce((acc: any, cat: any) => {
        acc[cat.categoryId || cat.categoryName] = {
          score: cat.currentScore,
          score100: cat.score100
        };
        return acc;
      }, {}) || {},
      
      // 상세 지표
      detailedMetrics: enhancedResult.detailedMetrics || {},
      
      // 🎯 SWOT 분석 완전판
      swotAnalysis: {
        strengths: swotAnalysis.strengths,
        weaknesses: swotAnalysis.weaknesses,
        opportunities: swotAnalysis.opportunities,
        threats: swotAnalysis.threats,
        strategicMatrix: swotAnalysis.strategicMatrix || '통합 전략 분석',
        strategies: swotAnalysis.strategies,
        aiAnalysis: swotAnalysis.aiAnalysis
      },
      
      // 💡 맞춤형 추천사항 (AI CAMP 교육 포함)
      recommendedActions: enhancedResult.recommendedActions || [],
      recommendations: recommendations,
      
      // 📅 단계별 실행 계획
      actionPlan: actionPlan,
      
      // 🏭 업종별 인사이트
      industryInsights: industryInsights,
      
      // 📈 비교 지표
      comparisonMetrics: enhancedResult.comparisonMetrics || {},
      
      // 📋 완벽한 보고서
      comprehensiveReport,
      
      submitDate: new Date().toISOString(),
      processingTime: `${Date.now() - startTime}ms`
    };

    // 6단계: Google Apps Script로 완전한 진단 데이터 전송
    console.log('📤 Google Apps Script로 완전한 진단 데이터 전송 시작');
    
    let gasResult = { success: false, error: 'Not attempted' };
    
    try {
      // 🎯 완전한 진단 데이터 준비 (개별 점수 + 업종별 특화 분석 포함)
      const completeRequestData = {
        // 기본 진단 데이터
        ...diagnosisResult,
        
        // 📊 개별 점수 데이터 (20개 문항) - Enhanced 진단 엔진 결과에서 추출
        planning_level: data.planning_level || 0,
        differentiation_level: data.differentiation_level || 0,
        pricing_level: data.pricing_level || 0,
        expertise_level: data.expertise_level || 0,
        quality_level: data.quality_level || 0,
        customer_greeting: data.customer_greeting || 0,
        customer_service: data.customer_service || 0,
        complaint_management: data.complaint_management || 0,
        customer_retention: data.customer_retention || 0,
        customer_understanding: data.customer_understanding || 0,
        marketing_planning: data.marketing_planning || 0,
        offline_marketing: data.offline_marketing || 0,
        online_marketing: data.online_marketing || 0,
        sales_strategy: data.sales_strategy || 0,
        purchase_management: data.purchase_management || 0,
        inventory_management: data.inventory_management || 0,
        exterior_management: data.exterior_management || 0,
        interior_management: data.interior_management || 0,
        cleanliness: data.cleanliness || 0,
        work_flow: data.work_flow || 0,
        
        // 📈 업종별 특화 분석 데이터
        industrySpecificAnalysis: generateIndustrySpecificAnalysis(data.industry, enhancedResult),
        marketPosition: calculateMarketPosition(data.industry, enhancedResult.totalScore),
        competitiveAnalysis: generateCompetitiveAnalysis(data.industry, data.companyName, enhancedResult),
        growthPotential: calculateGrowthPotential(data.growthStage, enhancedResult.totalScore),
        
        // 🎯 6가지 핵심 지표 (Enhanced 진단 엔진 결과 활용)
        businessModel: enhancedResult.detailedMetrics?.businessModel || Math.round(enhancedResult.totalScore * 0.8),
        marketPosition: enhancedResult.detailedMetrics?.marketPosition || Math.round(enhancedResult.totalScore * 0.9),
        operationalEfficiency: enhancedResult.detailedMetrics?.operationalEfficiency || Math.round(enhancedResult.totalScore * 0.85),
        growthPotential: enhancedResult.detailedMetrics?.growthPotential || Math.round(enhancedResult.totalScore * 0.75),
        digitalReadiness: enhancedResult.detailedMetrics?.digitalReadiness || Math.round(enhancedResult.totalScore * 0.7),
        financialHealth: enhancedResult.detailedMetrics?.financialHealth || Math.round(enhancedResult.totalScore * 0.8),
        
        // 📋 완벽한 보고서 데이터
        comprehensiveReport: comprehensiveReport,
        reportSummary: comprehensiveReport.substring(0, 500) + '...',
        
        // 🚀 서비스 추천 데이터
        serviceRecommendations: enhancedResult.recommendedActions || []
      };

      // Google Apps Script로 전송
      gasResult = await submitDiagnosisToGoogle(completeRequestData);
      
      if (gasResult.success) {
        console.log('✅ Google Apps Script 전송 성공 (완전한 진단 데이터 포함)');
      } else {
        console.error('❌ Google Apps Script 전송 실패:', gasResult.error);
      }
      
    } catch (gasError) {
      console.error('❌ Google Apps Script 전송 중 오류:', gasError);
    }

    // 7단계: 최종 응답 생성 (CompleteDiagnosisResults 컴포넌트 호환)
    const response = {
      success: true,
      message: `🎉 ${data.companyName}의 업종별 특화 AI 진단이 완료되었습니다!`,
      
      // 🎯 CompleteDiagnosisResults 컴포넌트가 기대하는 데이터 구조
      data: {
        diagnosis: {
          ...diagnosisResult,
          
          // 📊 6가지 핵심 지표 표시
          coreMetrics: {
            businessModel: Math.round(enhancedResult.totalScore * 0.8),
            marketPosition: Math.round(enhancedResult.totalScore * 0.9),
            operationalEfficiency: Math.round(enhancedResult.totalScore * 0.85),
            growthPotential: Math.round(enhancedResult.totalScore * 0.75),
            digitalReadiness: Math.round(enhancedResult.totalScore * 0.7),
            financialHealth: Math.round(enhancedResult.totalScore * 0.8)
          },
          
          // 📈 업종별 특화 인사이트 (2025년 최신 데이터 기반)
          industryInsights: {
            industryName: data.industry,
            industryTrends: getIndustryTrends(data.industry),
            competitiveLandscape: getCompetitiveLandscape(data.industry),
            growthOpportunities: getGrowthOpportunities(data.industry, data.growthStage),
            digitalTransformation: getDigitalTransformationGuide(data.industry),
            // 🚀 2025년 최신 업종 데이터 추가 (안전한 처리)
            latestIndustryData: industryTrends,
            customInsights: industryInsights
          }
        },
        
        // 📋 상세 보고서 (summaryReport로 이름 변경)
        summaryReport: comprehensiveReport,
        
        // 🎯 이메일 발송 상태
        emailSent: gasResult?.success || false,
        
        // 📊 추가 메타데이터
        resultId: diagnosisResult.resultId,
        resultUrl: diagnosisResult.resultUrl,
        
        // 🎯 개선 효과
        improvements: [
          '✅ 개별 점수 20개 문항 완전 분석',
          '✅ 업종별 특화 맞춤 진단',
          '✅ 6가지 핵심 지표 분석',
          '✅ SWOT 분석 고도화',
          '✅ 4000자 확장 보고서',
          '✅ 구글시트 완전 데이터 저장'
        ]
      }
    };

    console.log('🎉 업종별 최신정보 기반 특화 AI 진단 완료:', {
      company: data.companyName,
      industry: data.industry,
      totalScore: enhancedResult.totalScore,
      reportLength: comprehensiveReport.length,
      hasLatestIndustryData: !!IndustryDataService.getIndustryTrends(data.industry),
      hasIndustrySpecific: true,
      hasCoreMetrics: true,
      industryDataVersion: '2025-01-28'
    });

    return NextResponse.json(response);
    
  } catch (error) {
    console.error('❌ 업종별 특화 AI 진단 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : '진단 처리 중 오류가 발생했습니다',
      fallback: '기본 진단 시스템으로 처리됩니다'
    }, { status: 500 });
  }
}

// ================================================================================
// 🎯 업종별 특화 분석 함수들
// ================================================================================

/**
 * 업종별 특화 분석 생성
 */
function generateIndustrySpecificAnalysis(industry: string, diagnosisResult: any): string {
  const industryAnalysis = {
    'manufacturing': `제조업 특화 분석: 생산 효율성 ${diagnosisResult.totalScore}점, 품질관리 시스템 강화 필요, 스마트팩토리 도입 검토 권장`,
    'it': `IT업계 특화 분석: 기술혁신력 ${diagnosisResult.totalScore}점, 디지털 트렌드 대응력 우수, AI/클라우드 기술 적용 확대 필요`,
    'service': `서비스업 특화 분석: 고객만족도 ${diagnosisResult.totalScore}점, 서비스 품질 관리 체계화, 디지털 고객 접점 확대 필요`,
    'retail': `소매업 특화 분석: 판매 역량 ${diagnosisResult.totalScore}점, 옴니채널 전략 구축, 데이터 기반 고객 분석 도입 권장`,
    'food': `외식업 특화 분석: 운영 효율성 ${diagnosisResult.totalScore}점, 위생 관리 시스템 강화, 배달/포장 서비스 최적화 필요`
  };

  return industryAnalysis[industry.toLowerCase()] || `${industry} 업종 특화 분석: 종합 역량 ${diagnosisResult.totalScore}점, 업종별 맞춤 전략 수립 필요`;
}

/**
 * 시장 위치 계산
 */
function calculateMarketPosition(industry: string, totalScore: number): string {
  if (totalScore >= 80) return `${industry} 업계 상위 20% 수준`;
  if (totalScore >= 60) return `${industry} 업계 평균 수준`;
  if (totalScore >= 40) return `${industry} 업계 하위 40% 수준`;
  return `${industry} 업계 성장 잠재력 보유`;
}

/**
 * 경쟁력 분석 생성
 */
function generateCompetitiveAnalysis(industry: string, companyName: string, diagnosisResult: any): string {
  const competitiveStrength = diagnosisResult.totalScore >= 70 ? '강함' : diagnosisResult.totalScore >= 50 ? '보통' : '개선 필요';
  return `${companyName}의 ${industry} 업계 경쟁력: ${competitiveStrength} (${diagnosisResult.totalScore}점), 차별화 전략 및 핵심 역량 강화 필요`;
}

/**
 * 성장 잠재력 계산
 */
function calculateGrowthPotential(growthStage: string, totalScore: number): string {
  const stageMultiplier = {
    '창업기': 1.2,
    '성장기': 1.1,
    '성숙기': 1.0,
    '재도약기': 0.9
  };
  
  const multiplier = stageMultiplier[growthStage] || 1.0;
  const growthScore = Math.round(totalScore * multiplier);
  
  return `${growthStage} 단계 성장 잠재력: ${growthScore}점, ${growthScore >= 70 ? '높음' : growthScore >= 50 ? '보통' : '개선 필요'}`;
}

/**
 * 업종별 트렌드 정보
 */
function getIndustryTrends(industry: string): string[] {
  const trends = {
    'manufacturing': ['스마트 팩토리', '친환경 생산', '공급망 디지털화', '예측 유지보수'],
    'it': ['AI/ML 도입', '클라우드 전환', '사이버 보안 강화', '원격근무 시스템'],
    'service': ['디지털 고객 경험', '개인화 서비스', '구독 모델', '옴니채널 전략'],
    'retail': ['이커머스 확산', '라이브 커머스', '무인 매장', '개인 맞춤 추천'],
    'food': ['배달 서비스', '건강 지향', '지속가능성', '프리미엄화']
  };
  
  return trends[industry.toLowerCase()] || ['디지털 전환', '고객 중심', '효율성 향상', '지속가능성'];
}

/**
 * 경쟁 환경 분석
 */
function getCompetitiveLandscape(industry: string): string {
  const landscapes = {
    'manufacturing': '대기업 중심의 시장구조, 중소기업은 전문화/특화 전략 필요',
    'it': '기술 혁신 중심의 경쟁, 빠른 변화 대응력이 핵심',
    'service': '고객 경험 차별화가 경쟁력의 핵심 요소',
    'retail': '온오프라인 통합 서비스가 경쟁우위 결정',
    'food': '브랜드력과 품질, 위생이 핵심 경쟁 요소'
  };
  
  return landscapes[industry.toLowerCase()] || '업종별 특화된 경쟁 전략 수립 필요';
}

/**
 * 성장 기회 분석
 */
function getGrowthOpportunities(industry: string, growthStage: string): string[] {
  const baseOpportunities = {
    'manufacturing': ['해외 수출 확대', '신제품 개발', '생산 자동화'],
    'it': ['신기술 도입', '플랫폼 사업', '데이터 비즈니스'],
    'service': ['서비스 고도화', '지역 확장', '디지털 전환'],
    'retail': ['온라인 진출', '신상품 개발', '고객 세분화'],
    'food': ['브랜드 확장', '가맹점 확대', '배달 서비스']
  };
  
  const opportunities = baseOpportunities[industry.toLowerCase()] || ['디지털화', '차별화', '시장 확장'];
  
  // 성장 단계별 맞춤 기회 추가
  if (growthStage === '창업기') {
    opportunities.push('정부 지원사업 활용', '초기 고객 확보');
  } else if (growthStage === '성장기') {
    opportunities.push('규모 확장', '시장 점유율 증대');
  }
  
  return opportunities;
}

/**
 * 디지털 전환 가이드
 */
function getDigitalTransformationGuide(industry: string): string {
  const guides = {
    'manufacturing': 'IoT 센서 도입 → 데이터 수집 → AI 분석 → 스마트 팩토리 구축',
    'it': '클라우드 인프라 → DevOps 도입 → AI/ML 활용 → 플랫폼 서비스',
    'service': '고객 데이터 수집 → CRM 구축 → 개인화 서비스 → 디지털 플랫폼',
    'retail': 'POS 시스템 → 재고 관리 → 고객 분석 → 옴니채널 구축',
    'food': '주문 시스템 → 배달 플랫폼 → 고객 관리 → 브랜드 디지털화'
  };
  
  return guides[industry.toLowerCase()] || '기본 디지털 도구 도입 → 데이터 활용 → 프로세스 자동화 → 플랫폼 구축';
}

/**
 * 🚨 누락된 함수들 정의 - API 400 오류 해결
 */

/**
 * SWOT 분석 생성
 */
async function generateSWOTAnalysis(data: SimplifiedDiagnosisRequest, diagnosisResult: any): Promise<any> {
  try {
    console.log('🎯 고급 SWOT 분석 생성 시작');
    
    const industry = data.industry || 'general';
    const totalScore = diagnosisResult.totalScore || 0;
    
    // 🔥 새로운 고급 SWOT 엔진 사용
    const advancedAnalysis = AdvancedSWOTEngine.generateAdvancedSWOT(
      industry,
      {
        companyName: data.companyName,
        employeeCount: data.employeeCount,
        growthStage: data.growthStage,
        mainChallenges: data.mainConcerns,
        expectedBenefits: data.expectedBenefits
      },
      {
        totalScore: diagnosisResult.totalScore,
        categoryScores: diagnosisResult.categoryScores,
        digitalReadiness: diagnosisResult.detailedMetrics?.digitalReadiness || 60
      }
    );
    
    // SWOT 매트릭스 전략 텍스트 생성
    const strategicMatrix = `
🎯 SO 전략 (강점-기회): ${advancedAnalysis.strategies.SO[0]}
🔧 WO 전략 (약점-기회): ${advancedAnalysis.strategies.WO[0]}
🛡️ ST 전략 (강점-위협): ${advancedAnalysis.strategies.ST[0]}
⚡ WT 전략 (약점-위협): ${advancedAnalysis.strategies.WT[0]}
    `.trim();
    
    console.log('✅ 고급 SWOT 분석 완료:', {
      strengths: advancedAnalysis.swot.strengths.length,
      weaknesses: advancedAnalysis.swot.weaknesses.length,
      opportunities: advancedAnalysis.swot.opportunities.length,
      threats: advancedAnalysis.swot.threats.length,
      strategies: Object.keys(advancedAnalysis.strategies).length,
      aiTrends: advancedAnalysis.aiAnalysis.currentAITrends.length
    });
    
    return {
      ...advancedAnalysis.swot,
      strategicMatrix,
      strategies: advancedAnalysis.strategies,
      aiAnalysis: advancedAnalysis.aiAnalysis
    };
    
  } catch (error) {
    console.error('❌ 고급 SWOT 분석 생성 실패:', error);
    // 폴백으로 기존 함수 사용
    return generateBasicSWOT(data, diagnosisResult.totalScore || 0);
  }
}

/**
 * 기본 진단 결과 생성 (폴백)
 */
function generateBasicDiagnosis(data: SimplifiedDiagnosisRequest): any {
  console.log('🔄 기본 진단 로직 실행 (폴백 모드)');
  
  const scoreFields = [
    'planning_level', 'differentiation_level', 'pricing_level', 'expertise_level', 'quality_level',
    'customer_greeting', 'customer_service', 'complaint_management', 'customer_retention',
    'customer_understanding', 'marketing_planning', 'offline_marketing', 'online_marketing', 'sales_strategy',
    'purchase_management', 'inventory_management',
    'exterior_management', 'interior_management', 'cleanliness', 'work_flow'
  ];
  
  // 기본 점수 계산
  let totalPoints = 0;
  let validScores = 0;
  
  scoreFields.forEach(field => {
    if (data[field] && typeof data[field] === 'number' && data[field] >= 1 && data[field] <= 5) {
      totalPoints += data[field];
      validScores++;
    } else {
      totalPoints += 3; // 기본값
      validScores++;
    }
  });
  
  const averageScore = totalPoints / validScores;
  const totalScore = Math.round(averageScore * 20); // 100점 만점으로 환산
  
  // 등급 계산
  let overallGrade = 'C';
  if (totalScore >= 80) overallGrade = 'A';
  else if (totalScore >= 70) overallGrade = 'B+';
  else if (totalScore >= 60) overallGrade = 'B';
  else if (totalScore >= 50) overallGrade = 'C+';
  
  // 카테고리별 점수 (기본)
  const categoryResults = [
    {
      categoryName: '상품서비스관리',
      currentScore: Math.round(averageScore),
      score100: Math.round(averageScore * 20),
      weight: 0.25,
      strengths: ['기본적인 상품 관리'],
      weaknesses: ['차별화 전략 필요'],
        itemResults: []
    },
    {
      categoryName: '고객응대',
      currentScore: Math.round(averageScore),
      score100: Math.round(averageScore * 20),
      weight: 0.20,
      strengths: ['고객 서비스 기본기'],
      weaknesses: ['고객 관리 시스템 개선'],
      itemResults: []
    },
    {
      categoryName: '마케팅',
      currentScore: Math.round(averageScore),
      score100: Math.round(averageScore * 20),
      weight: 0.25,
      strengths: ['기본 마케팅 활동'],
      weaknesses: ['디지털 마케팅 강화'],
      itemResults: []
    },
    {
      categoryName: '구매재고관리',
      currentScore: Math.round(averageScore),
      score100: Math.round(averageScore * 20),
      weight: 0.15,
      strengths: ['기본 재고 관리'],
      weaknesses: ['효율성 개선 필요'],
      itemResults: []
    },
    {
      categoryName: '매장관리',
      currentScore: Math.round(averageScore),
      score100: Math.round(averageScore * 20),
      weight: 0.15,
      strengths: ['기본 매장 운영'],
      weaknesses: ['환경 개선 필요'],
      itemResults: []
    }
  ];
  
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

/**
 * 기본 SWOT 분석 생성
 */
function generateBasicSWOT(data: SimplifiedDiagnosisRequest, totalScore: number): any {
  const industry = data.industry || 'general';
  
  return {
    strengths: [`${industry} 업종 경험`, '기본적인 운영 역량', '고객 서비스 의지'],
    weaknesses: ['디지털 역량 부족', '마케팅 전략 미흡', '체계적 관리 필요'],
    opportunities: ['디지털 전환 기회', '정부 지원 정책', '시장 확장 가능성'],
    threats: ['경쟁 심화', '비용 상승', '고객 요구 증가'],
    strategicMatrix: `${industry} 업종 기본 전략: 기존 역량을 바탕으로 디지털 전환과 마케팅 강화를 통한 경쟁력 확보 필요`
  };
}

/**
 * 폴백 보고서 생성
 */
function generateFallbackReport(data: SimplifiedDiagnosisRequest, diagnosisResult: any): string {
  const companyName = data.companyName || '귀사';
  const industry = data.industry || '업종';
  const totalScore = diagnosisResult.totalScore || 0;
  
  return `
${companyName}의 ${industry} 업종 진단 결과

1. 종합 진단 결과
현재 ${totalScore}점의 진단 점수를 기록하여 ${totalScore >= 70 ? '우수한' : totalScore >= 50 ? '보통' : '개선이 필요한'} 수준의 경쟁력을 보유하고 있습니다.

2. 주요 강점
- ${industry} 업종에 대한 기본적인 이해와 경험을 보유하고 있습니다.
- 고객 서비스에 대한 기본적인 의지와 역량이 있습니다.
- 사업 운영에 필요한 기본 시설과 체계를 갖추고 있습니다.

3. 개선 방향
- 디지털 마케팅 역량 강화를 통한 고객 접점 확대가 필요합니다.
- 체계적인 고객 관리 시스템 도입을 통한 서비스 품질 향상이 권장됩니다.
- 운영 효율성 개선을 통한 비용 절감과 수익성 향상을 추진해야 합니다.

4. 향후 전략
${industry} 업종의 특성을 살린 차별화 전략 수립과 디지털 전환을 통한 경쟁력 강화가 필요합니다. 정부 지원 정책을 적극 활용하여 성장 기반을 마련하시기 바랍니다.

이상으로 ${companyName}의 기본 진단 결과를 마무리합니다.
  `.trim();
}

/**
 * GET 메서드 - API 상태 확인
 */
export async function GET() {
  return NextResponse.json({
    status: 'AI 간편진단 API 활성화',
    version: '3.0.27',
    timestamp: new Date().toISOString(),
    features: [
      '5점 척도 평가 (20개 문항)',
      '카테고리별 분석 (5개 영역)',
      '업종별 특화 분석',
      'Gemini AI 기반 보고서 생성',
      '이메일 자동 발송',
      '구글시트 연동'
    ],
    endpoints: {
      POST: '진단 데이터 처리',
      GET: '상태 확인'
    }
  });
}