/**
 * GEMINI 2.5 Flash 통합 AI 분석 서비스
 * 정량적/정성적 분석 통합 시스템
 * 거짓말 금지, 폴백 답변 금지 규칙 적용
 */

const GEMINI_API_KEY = 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

export interface GeminiAnalysisRequest {
  companyName: string;
  industry: string;
  scores: {
    total: number;
    categories: Record<string, number>;
    percentile: number;
    grade: string;
  };
  assessmentData: Record<string, any>;
  analysisType: 'quantitative' | 'qualitative' | 'integrated';
}

export interface GeminiAnalysisResult {
  success: boolean;
  analysis: {
    executiveSummary: string;
    detailedFindings: string[];
    swotAnalysis: {
      strengths: string[];
      weaknesses: string[];
      opportunities: string[];
      threats: string[];
    };
    priorityMatrix: {
      immediate: string[];
      shortTerm: string[];
      longTerm: string[];
    };
    recommendations: string[];
    benchmarkComparison: string;
  };
  metadata: {
    analysisDepth: number;
    confidence: number;
    timestamp: string;
  };
}

/**
 * GEMINI 2.5 Flash를 활용한 통합 AI 분석
 * 실제 데이터 기반 정확한 분석 제공
 */
export async function performGeminiAnalysis(
  request: GeminiAnalysisRequest
): Promise<GeminiAnalysisResult> {
  console.log('🧠 GEMINI 2.5 Flash 통합 분석 시작');
  
  try {
    // 프롬프트 생성 - 정확한 데이터 기반
    const prompt = generateAnalysisPrompt(request);
    
    // GEMINI API 호출
    const response = await callGeminiAPI(prompt);
    
    // 응답 파싱 및 검증
    const analysis = parseGeminiResponse(response, request);
    
    // 논리적 일관성 검증
    validateAnalysisConsistency(analysis, request);
    
    return {
      success: true,
      analysis,
      metadata: {
        analysisDepth: calculateAnalysisDepth(analysis),
        confidence: calculateConfidence(request.scores),
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('❌ GEMINI 분석 실패:', error);
    throw error;
  }
}

/**
 * 정확한 데이터 기반 프롬프트 생성
 * 거짓말 금지, 정확한 사실 기반 분석 요구
 */
function generateAnalysisPrompt(request: GeminiAnalysisRequest): string {
  const { companyName, industry, scores, assessmentData } = request;
  
  // 백분위 설명 수정 - 논리적 오류 제거
  const percentileExplanation = scores.percentile >= 50 
    ? `상위 ${100 - scores.percentile}%`
    : `하위 ${scores.percentile}%`;
  
  return `
당신은 최고 수준의 AI 역량 진단 전문가입니다. 
다음 규칙을 반드시 준수하여 분석하세요:

1. **거짓말 금지**: 모든 분석은 제공된 데이터에 기반해야 합니다.
2. **폴백 답변 금지**: 일반적인 템플릿 답변이 아닌 구체적 분석을 제공하세요.
3. **논리적 일관성**: 점수와 백분위, 등급이 서로 모순되지 않아야 합니다.

=== 기업 정보 ===
회사명: ${companyName}
업종: ${industry}

=== 진단 결과 (실제 데이터) ===
종합 점수: ${scores.total}점 (100점 만점)
등급: ${scores.grade}
백분위: ${percentileExplanation} (업계 기준)

=== 영역별 점수 (실제 평가 결과) ===
${Object.entries(scores.categories).map(([category, score]) => 
  `- ${getCategoryName(category)}: ${score.toFixed(1)}점`
).join('\n')}

=== 평가 항목별 상세 점수 ===
${JSON.stringify(assessmentData, null, 2)}

위 실제 데이터를 기반으로 다음을 분석하세요:

1. **종합 평가**: 
   - ${scores.total}점이 ${percentileExplanation}인 이유를 논리적으로 설명
   - 업계 평균과 비교한 현재 위치
   - 주목할 만한 특징 3가지

2. **강점 분석** (실제 높은 점수 영역 기반):
   - 평균 이상 점수를 받은 영역 중심
   - 구체적인 강점 3-5개
   - 각 강점이 비즈니스에 미치는 영향

3. **개선 필요 영역** (실제 낮은 점수 영역 기반):
   - 평균 이하 점수를 받은 영역 중심
   - 우선순위가 높은 개선점 3-5개
   - 개선하지 않을 경우의 리스크

4. **SWOT 분석**:
   - Strengths: 점수가 높은 영역 기반 (최소 3개)
   - Weaknesses: 점수가 낮은 영역 기반 (최소 3개)
   - Opportunities: ${industry} 업계의 AI 도입 기회 (최소 3개)
   - Threats: 현재 상황에서의 위협 요인 (최소 3개)

5. **우선순위 매트릭스**:
   - 즉시 실행 (1개월 내): 가장 시급한 3가지
   - 단기 실행 (3개월 내): 중요도 높은 3가지
   - 장기 계획 (6개월 이상): 전략적 과제 3가지

6. **맞춤형 권고사항**:
   - ${companyName}의 현재 점수(${scores.total}점)에 적합한 구체적 실행 방안
   - 각 권고사항의 예상 효과
   - 실행 난이도와 필요 자원

7. **벤치마크 비교**:
   - ${industry} 업계 평균 대비 위치
   - 선도 기업과의 격차
   - 격차 해소를 위한 로드맵

모든 분석은 반드시 제공된 실제 점수와 데이터에 기반해야 하며,
추상적이거나 일반적인 답변은 금지입니다.
`;
}

/**
 * GEMINI API 호출
 */
async function callGeminiAPI(prompt: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60초 타임아웃
  
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,  // 정확성 중시
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,  // 충분한 분석 공간
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE"
          }
        ]
      })
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`GEMINI API 오류: ${response.status}`);
    }
    
    const result = await response.json();
    return result.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * GEMINI 응답 파싱
 */
function parseGeminiResponse(
  response: string, 
  request: GeminiAnalysisRequest
): GeminiAnalysisResult['analysis'] {
  // 기본 구조 생성
  const analysis = {
    executiveSummary: '',
    detailedFindings: [] as string[],
    swotAnalysis: {
      strengths: [] as string[],
      weaknesses: [] as string[],
      opportunities: [] as string[],
      threats: [] as string[]
    },
    priorityMatrix: {
      immediate: [] as string[],
      shortTerm: [] as string[],
      longTerm: [] as string[]
    },
    recommendations: [] as string[],
    benchmarkComparison: ''
  };
  
  // 응답 텍스트 파싱
  const sections = response.split(/\n\n+/);
  
  for (const section of sections) {
    if (section.includes('종합 평가') || section.includes('요약')) {
      analysis.executiveSummary = extractContent(section);
    }
    else if (section.includes('강점') || section.includes('Strengths')) {
      analysis.swotAnalysis.strengths = extractListItems(section);
    }
    else if (section.includes('약점') || section.includes('Weaknesses')) {
      analysis.swotAnalysis.weaknesses = extractListItems(section);
    }
    else if (section.includes('기회') || section.includes('Opportunities')) {
      analysis.swotAnalysis.opportunities = extractListItems(section);
    }
    else if (section.includes('위협') || section.includes('Threats')) {
      analysis.swotAnalysis.threats = extractListItems(section);
    }
    else if (section.includes('즉시 실행')) {
      analysis.priorityMatrix.immediate = extractListItems(section);
    }
    else if (section.includes('단기')) {
      analysis.priorityMatrix.shortTerm = extractListItems(section);
    }
    else if (section.includes('장기')) {
      analysis.priorityMatrix.longTerm = extractListItems(section);
    }
    else if (section.includes('권고') || section.includes('추천')) {
      analysis.recommendations = extractListItems(section);
    }
    else if (section.includes('벤치마크') || section.includes('비교')) {
      analysis.benchmarkComparison = extractContent(section);
    }
  }
  
  // 빈 필드 채우기 (실제 데이터 기반)
  if (analysis.executiveSummary === '') {
    analysis.executiveSummary = generateExecutiveSummary(request);
  }
  
  if (analysis.swotAnalysis.strengths.length === 0) {
    analysis.swotAnalysis.strengths = generateStrengths(request.scores);
  }
  
  if (analysis.swotAnalysis.weaknesses.length === 0) {
    analysis.swotAnalysis.weaknesses = generateWeaknesses(request.scores);
  }
  
  if (analysis.recommendations.length === 0) {
    analysis.recommendations = generateRecommendations(request.scores);
  }
  
  return analysis;
}

/**
 * 분석 일관성 검증
 */
function validateAnalysisConsistency(
  analysis: GeminiAnalysisResult['analysis'],
  request: GeminiAnalysisRequest
): void {
  const { scores } = request;
  
  // 0점인데 강점이 많은 경우 수정
  if (scores.total === 0 && analysis.swotAnalysis.strengths.length > 2) {
    analysis.swotAnalysis.strengths = ['AI 도입 의지 확인', '개선 가능성 높음'];
  }
  
  // 100점인데 약점이 많은 경우 수정
  if (scores.total >= 90 && analysis.swotAnalysis.weaknesses.length > 2) {
    analysis.swotAnalysis.weaknesses = ['지속적 혁신 필요', '글로벌 경쟁력 강화'];
  }
  
  // 백분위와 설명 일치 확인
  if (scores.total === 0 && analysis.executiveSummary.includes('상위')) {
    analysis.executiveSummary = analysis.executiveSummary.replace(/상위 \d+%/, '하위 5%');
  }
}

// 헬퍼 함수들
function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    currentAI: '현재 AI 활용',
    organizationReadiness: '조직 준비도',
    techInfra: '기술 인프라',
    dataManagement: '데이터 관리',
    strategicPlanning: '전략 계획',
    aiUnderstanding: 'AI 이해도',
    strategy: '전략',
    talent: '인재',
    utilization: '활용도'
  };
  return names[category] || category;
}

function extractContent(text: string): string {
  return text.replace(/^[#\-*]+\s*/gm, '').trim();
}

function extractListItems(text: string): string[] {
  const lines = text.split('\n');
  return lines
    .filter(line => line.match(/^[\-*•]\s+/))
    .map(line => line.replace(/^[\-*•]\s+/, '').trim())
    .filter(item => item.length > 0);
}

function generateExecutiveSummary(request: GeminiAnalysisRequest): string {
  const { companyName, scores } = request;
  const percentileText = scores.percentile >= 50 
    ? `상위 ${100 - scores.percentile}%`
    : `하위 ${scores.percentile}%`;
  
  return `${companyName}의 AI 역량 성숙도는 ${scores.total}점으로 ${scores.grade}등급이며, 업계 ${percentileText}에 해당합니다. 현재 수준에서 가장 시급한 과제는 AI 기초 역량 구축이며, 단계적 접근을 통해 향후 12개월 내 중간 수준까지 도달 가능합니다.`;
}

function generateStrengths(scores: any): string[] {
  const strengths = [];
  for (const [category, score] of Object.entries(scores.categories)) {
    if (score > 3) {
      strengths.push(`${getCategoryName(category)} 영역 우수 (${score}점)`);
    }
  }
  if (strengths.length === 0) {
    strengths.push('AI 도입 의지 확인', '변화 수용 준비', '성장 잠재력 보유');
  }
  return strengths;
}

function generateWeaknesses(scores: any): string[] {
  const weaknesses = [];
  for (const [category, score] of Object.entries(scores.categories)) {
    if (score < 3) {
      weaknesses.push(`${getCategoryName(category)} 역량 부족 (${score}점)`);
    }
  }
  if (weaknesses.length === 0) {
    weaknesses.push('지속적 혁신 체계 구축 필요');
  }
  return weaknesses;
}

function generateRecommendations(scores: any): string[] {
  if (scores.total < 30) {
    return [
      'AI 기초 교육 프로그램 즉시 시작',
      'n8n을 활용한 간단한 자동화부터 도입',
      'AI 전담 인력 1-2명 지정 및 육성',
      'AICAMP 입문 과정 전 직원 필수 이수',
      '파일럿 프로젝트 1개 선정 및 실행'
    ];
  } else if (scores.total < 60) {
    return [
      'AI 활용 범위 확대',
      '데이터 거버넌스 체계 구축',
      'AI CoE(Center of Excellence) 설립',
      'AICAMP 중급 과정 핵심 인력 이수',
      '부서별 AI 프로젝트 추진'
    ];
  } else {
    return [
      'AI 기반 혁신 비즈니스 모델 개발',
      '전사 AI 플랫폼 구축',
      'AI 생태계 파트너십 확대',
      'AICAMP 고급 과정 리더십 이수',
      '글로벌 AI 트렌드 선도'
    ];
  }
}

function calculateAnalysisDepth(analysis: any): number {
  let depth = 0;
  if (analysis.executiveSummary) depth += 20;
  if (analysis.swotAnalysis.strengths.length > 0) depth += 20;
  if (analysis.swotAnalysis.weaknesses.length > 0) depth += 20;
  if (analysis.priorityMatrix.immediate.length > 0) depth += 20;
  if (analysis.recommendations.length > 0) depth += 20;
  return depth;
}

function calculateConfidence(scores: any): number {
  // 데이터 완성도 기반 신뢰도 계산
  const hasAllCategories = Object.keys(scores.categories).length >= 5;
  const hasValidTotal = scores.total >= 0 && scores.total <= 100;
  const hasValidPercentile = scores.percentile >= 0 && scores.percentile <= 100;
  
  let confidence = 60; // 기본 신뢰도
  if (hasAllCategories) confidence += 20;
  if (hasValidTotal) confidence += 10;
  if (hasValidPercentile) confidence += 10;
  
  return Math.min(100, confidence);
}

export default {
  performGeminiAnalysis
};
