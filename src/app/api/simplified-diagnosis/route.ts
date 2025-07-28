// Vercel 최적화 설정 - 타임아웃 증가
export const dynamic = 'force-dynamic';
export const revalidate = false;
export const runtime = 'nodejs';
export const maxDuration = 30; // 30초 타임아웃

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { saveToGoogleSheets } from '@/lib/utils/googleSheetsService';
import { CONSULTANT_INFO, CONTACT_INFO, COMPANY_INFO } from '@/lib/config/branding';
import { getGeminiKey, isDevelopment, maskApiKey } from '@/lib/config/env';

// 🔧 간소화된 진단 요청 인터페이스
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
  
  // 🔥 5점 척도 평가표 문항별 점수 (20개 항목)
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
}

// 📊 기본 진단 결과 생성 함수 (AI 없이도 동작)
function generateBasicDiagnosis(data: SimplifiedDiagnosisRequest) {
  const startTime = Date.now();
  
  try {
    // 5점 척도 점수들 수집
    const scoreFields = [
      'planning_level', 'differentiation_level', 'pricing_level', 'expertise_level', 'quality_level',
      'customer_greeting', 'customer_service', 'complaint_management', 'customer_retention',
      'customer_understanding', 'marketing_planning', 'offline_marketing', 'online_marketing', 'sales_strategy',
      'purchase_management', 'inventory_management',
      'exterior_management', 'interior_management', 'cleanliness', 'work_flow'
    ];
    
    const scores = scoreFields.map(field => data[field] || 0).filter(score => score > 0);
    const totalScore = scores.length > 0 ? Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 20) : 50;
    
    // 카테고리별 점수 계산
    const categoryScores = {
      '상품/서비스 관리': calculateCategoryScore(data, ['planning_level', 'differentiation_level', 'pricing_level', 'expertise_level', 'quality_level']),
      '고객응대 역량': calculateCategoryScore(data, ['customer_greeting', 'customer_service', 'complaint_management', 'customer_retention', 'customer_understanding']),
      '마케팅 역량': calculateCategoryScore(data, ['marketing_planning', 'offline_marketing', 'online_marketing', 'sales_strategy']),
      '구매 및 재고관리': calculateCategoryScore(data, ['purchase_management', 'inventory_management']),
      '매장관리 역량': calculateCategoryScore(data, ['exterior_management', 'interior_management', 'cleanliness', 'work_flow'])
    };
    
    const grade = getGradeFromScore(totalScore);
    const resultId = `BASIC_DIAG_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    
    // 기본 추천 서비스
    const recommendedServices = generateBasicRecommendations(data, totalScore);
    
    // 기본 SWOT 분석
    const basicSWOT = generateBasicSWOT(data, totalScore);
    
    const result = {
      success: true,
      resultId,
      diagnosis: {
        companyName: data.companyName,
        industry: data.industry,
        contactManager: data.contactManager,
        email: data.email,
        phone: data.phone,
        totalScore,
        grade,
        categoryScores,
        recommendedServices,
        swotAnalysis: basicSWOT,
        processingTime: Date.now() - startTime,
        reliability: Math.min(95, 75 + (scores.length * 2)),
        generatedAt: new Date().toISOString()
      }
    };
    
    console.log('✅ 기본 진단 완료:', {
      company: data.companyName,
      totalScore,
      grade,
      processingTime: `${Date.now() - startTime}ms`
    });
    
    return result;
    
  } catch (error) {
    console.error('❌ 기본 진단 실패:', error);
    throw error;
  }
}

// 📊 카테고리별 점수 계산
function calculateCategoryScore(data: SimplifiedDiagnosisRequest, fields: string[]): number {
  const scores = fields.map(field => data[field] || 0).filter(score => score > 0);
  return scores.length > 0 ? Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 20) : 50;
}

// 🏆 등급 판정
function getGradeFromScore(score: number): string {
  if (score >= 90) return 'S급 (최우수)';
  if (score >= 80) return 'A급 (우수)';
  if (score >= 70) return 'B급 (양호)';
  if (score >= 60) return 'C급 (보통)';
  return 'D급 (개선필요)';
}

// 💡 기본 추천 서비스
function generateBasicRecommendations(data: SimplifiedDiagnosisRequest, totalScore: number) {
  const services = [
    { id: 'business-analysis', name: 'BM ZEN 사업분석', priority: 1 },
    { id: 'ai-productivity', name: 'AI실무활용 생산성향상', priority: 2 },
    { id: 'website', name: '웹사이트 구축', priority: 3 }
  ];
  
  // 점수에 따른 우선순위 조정
  if (totalScore < 60) {
    return [services[0], services[1]]; // 기본 개선에 집중
  } else if (totalScore < 80) {
    return [services[1], services[2]]; // 효율성과 디지털화
  } else {
    return [services[2], services[0]]; // 성장과 최적화
  }
}

// 🎯 기본 SWOT 분석
function generateBasicSWOT(data: SimplifiedDiagnosisRequest, totalScore: number) {
  return {
    strengths: [
      `${data.industry} 분야 전문 경험`,
      `${data.employeeCount} 규모 최적화된 조직`,
      '시장 기회 포착 의지',
      '지속적 개선 의욕'
    ],
    weaknesses: [
      '디지털 마케팅 역량 강화 필요',
      '체계적 고객관리 시스템 구축',
      '업무 프로세스 표준화',
      '데이터 기반 의사결정 체계'
    ],
    opportunities: [
      '디지털 전환 가속화 트렌드',
      '정부 중소기업 지원 정책',
      'AI 기술 활용 기회',
      '지역 시장 특화 전략'
    ],
    threats: [
      '업계 경쟁 심화',
      '기술 변화 속도',
      '인력 확보 어려움',
      '경기 변동 리스크'
    ]
  };
}

// 🤖 AI 향상된 진단 (옵셔널, 실패해도 기본 진단 제공)
async function enhanceWithAI(basicResult: any, data: SimplifiedDiagnosisRequest) {
  try {
    const apiKey = getGeminiKey();
    if (!apiKey) {
      console.log('ℹ️ AI 향상 기능 스킵 (API 키 없음)');
      return basicResult;
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
다음 기업의 간단한 진단 결과를 바탕으로 전문적인 분석을 추가해주세요:

기업명: ${data.companyName}
업종: ${data.industry}
총점: ${basicResult.diagnosis.totalScore}점
주요 고민: ${data.mainConcerns}
기대 효과: ${data.expectedBenefits}

300자 이내로 전문가 의견을 작성해주세요.
`;
    
    const result = await Promise.race([
      model.generateContent(prompt),
      new Promise((_, reject) => setTimeout(() => reject(new Error('AI 분석 타임아웃')), 8000))
    ]);
    
    if (result && typeof result === 'object' && 'response' in result) {
      const aiInsight = await result.response.text();
      basicResult.diagnosis.aiInsight = aiInsight.substring(0, 300);
      console.log('✅ AI 향상 완료');
    }
    
    return basicResult;
    
  } catch (error) {
    console.warn('⚠️ AI 향상 실패, 기본 결과 반환:', error.message);
    return basicResult;
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  console.log('🚀 간소화된 진단 시스템 시작');
  
  try {
    // 1단계: 요청 데이터 파싱
    const data: SimplifiedDiagnosisRequest = await request.json();
    
    // 2단계: 기본 유효성 검사
    if (!data.companyName || !data.industry || !data.contactManager || !data.phone || !data.email) {
      return NextResponse.json({
        success: false,
        error: '필수 정보가 누락되었습니다.',
        details: {
          companyName: !!data.companyName,
          industry: !!data.industry,
          contactManager: !!data.contactManager,
          phone: !!data.phone,
          email: !!data.email
        }
      }, { status: 400 });
    }
    
    // 3단계: 개인정보 동의 확인
    if (!data.privacyConsent) {
      return NextResponse.json({
        success: false,
        error: '개인정보 수집 및 이용에 동의해주세요.'
      }, { status: 400 });
    }
    
    console.log('✅ 데이터 검증 완료:', data.companyName);
    
    // 4단계: 기본 진단 실행 (항상 성공)
    let result = generateBasicDiagnosis(data);
    
    // 5단계: AI 향상 시도 (실패해도 무관)
    result = await enhanceWithAI(result, data);
    
    // 6단계: Google Sheets 저장 (비동기, 실패해도 무관)
    saveToGoogleSheets({
      폼타입: '간소화_진단',
      제출일시: new Date().toLocaleString('ko-KR'),
      회사명: data.companyName,
      담당자명: data.contactManager,
      이메일: data.email,
      연락처: data.phone,
      업종: data.industry,
      직원수: data.employeeCount,
      종합점수: result.diagnosis.totalScore,
      종합등급: result.diagnosis.grade,
      처리시간: result.diagnosis.processingTime + 'ms',
      timestamp: Date.now()
    }, '간소화_진단').catch(error => {
      console.warn('⚠️ Google Sheets 저장 실패:', error.message);
    });
    
    // 7단계: 응답 반환
    const finalResult = {
      ...result,
      message: '진단이 성공적으로 완료되었습니다.',
      processingTime: Date.now() - startTime
    };
    
    console.log('🎉 진단 완료:', {
      company: data.companyName,
      totalScore: result.diagnosis.totalScore,
      totalTime: Date.now() - startTime + 'ms'
    });
    
    return NextResponse.json(finalResult);
    
  } catch (error) {
    console.error('❌ 진단 처리 실패:', error);
    
    // 최소한의 폴백 응답
    return NextResponse.json({
      success: false,
      error: '진단 처리 중 오류가 발생했습니다.',
      message: '잠시 후 다시 시도해주세요.',
      details: isDevelopment() ? {
        error: error.message,
        stack: error.stack?.split('\n').slice(0, 5).join('\n')
      } : undefined,
      processingTime: Date.now() - startTime
    }, { status: 500 });
  }
}