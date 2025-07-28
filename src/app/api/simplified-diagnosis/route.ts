// Vercel 최적화 설정 - 안정성 강화
export const dynamic = 'force-dynamic';
export const revalidate = false;
export const runtime = 'nodejs';
export const maxDuration = 30; // 30초 타임아웃으로 Vercel 제한 해결

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { saveToGoogleSheets } from '@/lib/utils/googleSheetsService';
import { processDiagnosisSubmission, type DiagnosisFormData } from '@/lib/utils/emailService';
import { CONSULTANT_INFO, CONTACT_INFO, COMPANY_INFO } from '@/lib/config/branding';
import { getGeminiKey, isDevelopment, maskApiKey } from '@/lib/config/env';
import { EnhancedDiagnosisEngine, DiagnosisReportGenerator, validateDiagnosisData } from '@/lib/utils/enhancedDiagnosisEngine';

interface SimplifiedDiagnosisRequest {
  companyName: string;
  industry: string;
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
    console.log('🚀 고급 AI 진단보고서 생성 시작:', { 
      company: data.companyName, 
      industry: data.industry 
    });

    const apiKey = getGeminiKey();
    if (!apiKey) {
      console.warn('⚠️ AI 분석 키 없음, 기본 보고서 생성');
      return generateFallbackReport(data, diagnosisData);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const enhancedReportPrompt = `다음 기업의 레벨업 시트 진단 결과를 바탕으로 **AI 실무도입을 통한 일터혁신과 고몰입조직 구축** 중심의 GAP 분석 기반 경영진단보고서를 작성해주세요:

기업명: ${data.companyName}
업종: ${data.industry}
담당자: ${data.contactManager}
직원수: ${data.employeeCount}
성장단계: ${data.growthStage}
주요고민: ${data.mainConcerns}
기대효과: ${data.expectedBenefits}

종합점수: ${diagnosisData.totalScore || 0}점/100점
신뢰도: ${diagnosisData.reliabilityScore || 0}%

🎯 핵심 작성 방향:
이 보고서는 **AI 실무도입을 통한 일터혁신으로 고몰입조직을 구축**하여 조직의 전략적 목표 달성을 지원하는 것을 목표로 합니다.

⚠️ 중요 제약 조건:
1. 전체 보고서는 반드시 **3000자 이내**로 작성
2. GAP 분석 기반으로 AI 실무도입과 프로세스 효율화 방법론 중심 제안
3. 고몰입조직 구축을 위한 일터혁신 전략에 집중
4. 이후경 경영지도사 수준의 전문적이고 신뢰성 있는 톤앤매너 유지

보고서 구성:
1. 조직 현황 진단 및 AI 도입 준비도 평가
2. 강점 기반 AI 활용 전략 및 고몰입 요소 발굴
3. GAP 분석 기반 일터혁신 우선순위 및 AI 솔루션
4. AI 실무도입 액션플랜 및 성과 예측

마크다운 문법 사용 금지, 자연스러운 보고서 형식으로 작성해주세요.`;

    // 타임아웃 설정으로 안전성 확보
    const reportResponse = await Promise.race([
      model.generateContent(enhancedReportPrompt),
      new Promise((_, reject) => setTimeout(() => reject(new Error('AI 분석 타임아웃')), 25000))
    ]);

    let aiReport = '';
    if (reportResponse && typeof reportResponse === 'object' && 'response' in reportResponse) {
      aiReport = await reportResponse.response.text() || '';
    }

    // 글자수 제한으로 메모리 최적화
    if (aiReport.length > 3000) {
      console.log(`⚠️ 보고서 길이 초과 (${aiReport.length}자), 3000자로 압축`);
      aiReport = aiReport.substring(0, 2950) + '\n\n[AI 일터혁신 진단보고서 완료]';
    }

    console.log('✅ 고급 AI 진단보고서 생성 완료:', {
      length: aiReport.length,
      company: data.companyName
    });

    return aiReport || generateFallbackReport(data, diagnosisData);

  } catch (error) {
    console.error('❌ AI 진단보고서 생성 실패:', error);
    return generateFallbackReport(data, diagnosisData);
  }
}

// 🔄 폴백 보고서 생성 (AI 실패시)
function generateFallbackReport(data: SimplifiedDiagnosisRequest, diagnosisData: any): string {
  const totalScore = diagnosisData.totalScore || 0;
  const grade = getGradeFromScore(totalScore);
  
  return `
📊 ${data.companyName} 레벨업 시트 진단 보고서

🏆 종합 평가: ${totalScore}점/100점 (${grade}급)

📈 현황 분석
${data.companyName}은 ${data.industry} 업종에서 ${data.employeeCount} 규모로 운영되고 있으며, 레벨업 시트 20개 항목 평가 결과 종합 ${totalScore}점을 기록했습니다.

🎯 핵심 개선 과제
• 주요 고민: ${data.mainConcerns.substring(0, 100)}...
• 기대 효과: ${data.expectedBenefits.substring(0, 100)}...

💡 우선 추천 방안
1. AI 도구 활용을 통한 업무 효율성 개선
2. 고객 응대 역량 강화를 통한 만족도 제고
3. 체계적인 마케팅 전략 수립 및 실행

📞 전문가 상담
더 자세한 분석과 맞춤형 솔루션을 원하시면 전문가 상담을 신청하세요.
연락처: 010-9251-9743 (이후경 경영지도사)

*본 보고서는 레벨업 시트 표준 평가 도구를 활용한 과학적 분석 결과입니다.*
  `.trim();
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
    console.log('🔄 완벽한 AI 진단보고서 시스템 시작 (안전 모드)');
    
    const data: SimplifiedDiagnosisRequest = await request.json();
    
    // 입력 데이터 검증
    if (!data.companyName || !data.industry || !data.contactManager || !data.phone || !data.email) {
      console.log('❌ 필수 필드 누락:', {
        companyName: !!data.companyName,
        industry: !!data.industry,
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

    // 3단계: 완벽한 진단보고서 생성 (안전 모드)
    let comprehensiveReport;
    try {
      comprehensiveReport = await generateAIEnhancedReport(data, enhancedResult);
      console.log('📋 완벽한 진단보고서 생성 완료:', {
        reportLength: comprehensiveReport.length
      });
    } catch (error) {
      console.error('❌ AI 보고서 생성 실패, 폴백 처리:', error);
      comprehensiveReport = generateFallbackReport(data, enhancedResult);
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
      
      // 🎯 SWOT 분석 완전판
      swotAnalysis: {
        strengths: swotAnalysis.strengths,
        weaknesses: swotAnalysis.weaknesses,
        opportunities: swotAnalysis.opportunities,
        threats: swotAnalysis.threats,
        strategicMatrix: swotAnalysis.strategicMatrix || '통합 전략 분석'
      },
      
      // 💡 맞춤형 추천사항
      recommendedActions: enhancedResult.recommendedActions || [],
      
      // 📈 비교 지혜
      comparisonMetrics: enhancedResult.comparisonMetrics || {},
      
      // 📋 완벽한 보고서
      comprehensiveReport,
      
      submitDate: new Date().toISOString(),
      processingTime: `${Date.now() - startTime}ms`
    };

    // 6단계: Google Sheets 저장 (비동기, 실패해도 무관)
    saveToGoogleSheets({
      폼타입: 'AI_완벽진단보고서_안전모드',
      제출일시: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      결과ID: resultId,
      회사명: data.companyName,
      담당자명: data.contactManager,
      이메일: data.email,
      연락처: data.phone,
      업종: data.industry,
      직원수: data.employeeCount,
      종합점수: enhancedResult.totalScore,
      종합등급: enhancedResult.overallGrade,
      신뢰도: enhancedResult.reliabilityScore,
      보고서길이: comprehensiveReport.length,
      처리시간: diagnosisResult.processingTime,
      timestamp: Date.now()
    }, 'AI_완벽진단보고서_안전모드').catch(error => {
      console.warn('⚠️ Google Sheets 저장 실패 (무시):', error.message);
    });

    // 7단계: 최종 응답 생성
    const finalResponse = {
      success: true,
      message: '완벽한 AI 진단보고서가 성공적으로 생성되었습니다. (안전모드)',
      data: {
        diagnosis: diagnosisResult,
        summaryReport: comprehensiveReport,
        reportLength: comprehensiveReport.length,
        resultId,
        resultUrl,
        submitDate: diagnosisResult.submitDate,
        processingTime: diagnosisResult.processingTime
      }
    };

    console.log('🎉 완벽한 AI 진단보고서 생성 완료 (안전모드):', {
      company: data.companyName,
      totalScore: enhancedResult.totalScore,
      grade: enhancedResult.overallGrade,
      categoriesAnalyzed: diagnosisResult.categoryResults.length,
      swotComplete: !!(swotAnalysis.strengths.length && swotAnalysis.weaknesses.length),
      reportGenerated: !!comprehensiveReport,
      processingTime: Date.now() - startTime + 'ms'
    });

    return NextResponse.json(finalResponse);
    
  } catch (error) {
    console.error('❌ 완벽한 진단보고서 생성 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: '진단보고서 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      details: isDevelopment() ? error.message : undefined
    }, { status: 500 });
  }
}

// 🎯 SWOT 분석 생성 함수 (안전 모드)
async function generateSWOTAnalysis(data: SimplifiedDiagnosisRequest, diagnosisResult: any) {
  try {
    const apiKey = getGeminiKey();
    if (!apiKey) {
      console.warn('⚠️ AI 키 없음, 기본 SWOT 생성');
      return generateBasicSWOT(data, diagnosisResult.totalScore);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
# 🎯 전문 경영진단 SWOT 분석 요청

## 기업 정보
- 회사명: ${data.companyName}
- 업종: ${data.industry}
- 직원수: ${data.employeeCount}
- 성장단계: ${data.growthStage}
- 주요고민: ${data.mainConcerns}

## 진단 결과
- 종합점수: ${diagnosisResult.totalScore}점 (${diagnosisResult.overallGrade}등급)

## 요청사항
이후경 경영지도사 관점에서 다음 SWOT 분석을 JSON 형태로 작성해주세요:

{
  "strengths": ["강점1", "강점2", "강점3", "강점4", "강점5"],
  "weaknesses": ["약점1", "약점2", "약점3", "약점4", "약점5"],
  "opportunities": ["기회1", "기회2", "기회3", "기회4", "기회5"],
  "threats": ["위협1", "위협2", "위협3", "위협4", "위협5"],
  "strategicMatrix": "SWOT 매트릭스 기반 종합 전략 분석"
}

각 항목은 구체적이고 실행 가능한 내용으로 작성해주세요.
`;

    const result = await Promise.race([
      model.generateContent(prompt),
      new Promise((_, reject) => setTimeout(() => reject(new Error('SWOT 분석 타임아웃')), 10000))
    ]);
    
    if (result && typeof result === 'object' && 'response' in result) {
      const response = await result.response;
      const analysisText = response.text();
      
      // JSON 추출
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const swotData = JSON.parse(jsonMatch[0]);
        console.log('✅ AI SWOT 분석 완료');
        return swotData;
      }
    }
    
    throw new Error('SWOT JSON 형식 파싱 실패');
    
  } catch (error) {
    console.error('❌ AI SWOT 분석 실패, 기본값 적용:', error);
    return generateBasicSWOT(data, diagnosisResult.totalScore);
  }
}

// 🎯 기본 SWOT 분석 생성 (폴백)
function generateBasicSWOT(data: SimplifiedDiagnosisRequest, totalScore: number) {
  const industryStrengths = {
    'manufacturing': ['제조 기술력', '품질 관리 체계', '생산 효율성'],
    'it': ['기술 혁신력', '빠른 적응력', '디지털 역량'],
    'service': ['고객 응대 경험', '서비스 전문성', '관계 관리'],
    'retail': ['고객 접점 다양성', '시장 이해도', '판매 경험'],
    'food': ['맛과 품질', '고객 충성도', '지역 밀착성']
  };

  const industryKey = data.industry?.toLowerCase() || 'service';
  const baseStrengths = industryStrengths[industryKey] || industryStrengths['service'];

  return {
    strengths: [
      ...baseStrengths,
      `${data.growthStage || '성장'} 단계의 추진력`,
      `${data.employeeCount || '적절한'} 규모의 조직력`
    ],
    weaknesses: [
      '디지털 마케팅 역량 강화 필요',
      '체계적인 고객관리 시스템 구축',
      '브랜드 인지도 한계',
      '자금 조달 능력 제한',
      '전문 인력 확보 어려움'
    ],
    opportunities: [
      '디지털 전환 가속화 트렌드',
      '정부 중소기업 지원 정책',
      '언택트 서비스 확산',
      '지역 경제 활성화 정책',
      'AI 기술 도입 기회'
    ],
    threats: [
      '대기업 시장 진입',
      '경쟁 업체 증가',
      '경기 침체 우려',
      '인건비 상승 압력',
      '기술 변화 속도'
    ],
    strategicMatrix: `${data.companyName}은 현재 ${totalScore}점의 진단 결과를 바탕으로 강점을 활용한 기회 확대 전략과 약점 보완을 통한 위협 대응 전략을 동시에 추진해야 합니다.`
  };
}

// 📊 기본 진단 생성 (Enhanced 진단 실패시 폴백)
function generateBasicDiagnosis(data: SimplifiedDiagnosisRequest) {
  const scoreFields = [
    'planning_level', 'differentiation_level', 'pricing_level', 'expertise_level', 'quality_level',
    'customer_greeting', 'customer_service', 'complaint_management', 'customer_retention',
    'customer_understanding', 'marketing_planning', 'offline_marketing', 'online_marketing', 'sales_strategy',
    'purchase_management', 'inventory_management',
    'exterior_management', 'interior_management', 'cleanliness', 'work_flow'
  ];
  
  const scores = scoreFields.map(field => data[field] || 0).filter(score => score > 0);
  const totalScore = scores.length > 0 ? Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 20) : 50;
  
  return {
    totalScore,
    overallGrade: getGradeFromScore(totalScore),
    reliabilityScore: Math.min(95, 75 + (scores.length * 2)),
    categoryResults: [
      {
        categoryName: '종합 평가',
        currentScore: totalScore / 20,
        score100: totalScore,
        targetScore: 4.0,
        benchmarkScore: 3.0,
        weight: 1.0,
        gapScore: Math.max(0, 4.0 - (totalScore / 20)),
        strengths: ['기본 역량 보유'],
        weaknesses: ['체계적 개선 필요'],
        itemResults: []
      }
    ],
    recommendedActions: [
      {
        title: 'AI 도구 활용 업무 효율화',
        description: '생산성 향상을 위한 AI 도구 도입',
        expectedImpact: '업무 효율성 30% 향상'
      }
    ],
    comparisonMetrics: {
      industryPercentile: 50,
      competitivePosition: '평균적인'
    }
  };
}