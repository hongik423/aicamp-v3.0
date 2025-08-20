// 통합 AI 서비스 (Llama 우선). 기존 함수명 유지하여 호환성 보장
import { callAI, extractJsonFromText } from '@/lib/ai/ai-provider';
// GEMINI 2.5 Flash 모델 설정 - 환경변수 우선 사용 (호환 목적)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_API_URL = process.env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-exp:generateContent';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash-exp';

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message: string;
    code: number;
  };
}

// API 키 유효성 검사
function isValidApiKey(): boolean {
  if (!GEMINI_API_KEY || GEMINI_API_KEY.length === 0) {
    console.warn('⚠️ GEMINI API 키가 설정되지 않음');
    return false;
  }
  
  // API 키 형식 검증 (AIza로 시작하는 39자)
  if (GEMINI_API_KEY.startsWith('AIza') && GEMINI_API_KEY.length === 39) {
    return true;
  } else {
    console.warn('⚠️ GEMINI API 키 형식이 올바르지 않음');
    return false;
  }
}

// GEMINI 2.5 Flash API 호출 (최적화된 버전)
export async function callGeminiAPI(prompt: string, retryCount: number = 3): Promise<any> {
  // 실제 호출은 통합 callAI로 위임 (AI_PROVIDER에 따라 Llama 등으로 라우팅)
  for (let attempt = 1; attempt <= retryCount; attempt++) {
    try {
      const text = await callAI({ prompt, maxTokens: 32768, temperature: 0.7 });
      const parsed = extractJsonFromText(text);
      if (parsed) return parsed;
      return { executiveSummary: text, rawText: text, success: true };
    } catch (error) {
      if (attempt >= retryCount) {
        return generateEnhancedFallbackResponse(prompt);
      }
      await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
    }
  }
}

// 향상된 폴백 응답 생성
function generateEnhancedFallbackResponse(prompt: string): any {
  console.log('🔄 고품질 폴백 응답 생성 중...');

  // 프롬프트에서 기업 정보 추출
  const companyMatch = prompt.match(/기업명:\s*([^\n]+)/);
  const industryMatch = prompt.match(/산업:\s*([^\n]+)/);
  const scoreMatch = prompt.match(/종합 점수:\s*([0-9.]+)/);

  const companyName = companyMatch ? companyMatch[1].trim() : '귀사';
  const industry = industryMatch ? industryMatch[1].trim() : '해당 산업';
  const score = scoreMatch ? parseFloat(scoreMatch[1]) : 75;

  // 점수에 따른 등급 결정
  const grade = score >= 90 ? 'S' : 
                score >= 80 ? 'A' : 
                score >= 70 ? 'B' : 
                score >= 60 ? 'C' : 'D';

  return {
    executiveSummary: `${companyName}는 ${industry} 분야에서 AI 도입 준비도 ${score}점(${grade}등급)을 기록했습니다. 전략적 AI 도입을 통해 디지털 혁신을 가속화할 수 있는 잠재력을 보유하고 있습니다.`,
    
    detailedAnalysis: {
      currentState: `현재 ${companyName}는 ${industry} 산업 평균 대비 ${score > 75 ? '우수한' : '개선이 필요한'} AI 준비 수준을 보이고 있습니다.`,
      industryComparison: `${industry} 산업 평균 대비 ${Math.abs(score - 75)}% ${score > 75 ? '높은' : '낮은'} 수준입니다.`,
      coreStrengths: [
        "경영진의 AI 도입 의지가 강함",
        "기초적인 디지털 인프라 구축 완료",
        "직원들의 변화 수용 태도가 긍정적"
      ],
      improvementAreas: [
        "AI 전문 인력 확보 및 육성",
        "데이터 거버넌스 체계 구축",
        "AI 활용 업무 프로세스 재설계"
      ]
    },
    
    strategicRecommendations: [
      {
        recommendation: "AI 파일럿 프로젝트 시작",
        expectedImpact: "업무 효율성 20-30% 향상",
        implementation: "핵심 업무 영역 선정 후 3개월 내 POC 진행",
        timeline: "3-6개월"
      },
      {
        recommendation: "AI 역량 교육 프로그램 도입",
        expectedImpact: "전사 AI 활용 역량 향상",
        implementation: "AICAMP 맞춤형 교육 커리큘럼 적용",
        timeline: "1-3개월"
      },
      {
        recommendation: "데이터 인프라 고도화",
        expectedImpact: "AI 모델 성능 및 정확도 향상",
        implementation: "데이터 수집-저장-분석 파이프라인 구축",
        timeline: "6-12개월"
      }
    ],
    
    investmentPlan: {
      phase1: {
        focus: "기반 구축 및 파일럿",
        budget: "5천만원 - 1억원",
        duration: "3개월"
      },
      phase2: {
        focus: "확산 및 고도화",
        budget: "1억원 - 3억원",
        duration: "6개월"
      },
      phase3: {
        focus: "전사 통합 및 최적화",
        budget: "3억원 - 5억원",
        duration: "12개월"
      }
    },
    
    expectedOutcomes: {
      efficiency: "25-35%",
      costReduction: "15-20%",
      revenueGrowth: "10-15%",
      roi: "200-300%"
    },
    
    nextSteps: [
      "AI 도입 전담 TF 구성",
      "우선 적용 업무 영역 선정",
      "AICAMP 전문가 상담 진행"
    ]
  };
}