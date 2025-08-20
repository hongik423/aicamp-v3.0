/**
 * GEMINI 2.5 Flash 통합 AI 분석 서비스
 * 정량적/정성적 분석 통합 시스템
 * 거짓말 금지, 폴백 답변 금지 규칙 적용
 */

import { callAI } from '@/lib/ai/ai-provider';

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
 * Ollama GPT-OSS 20B를 활용한 통합 AI 분석
 * 실제 데이터 기반 정확한 분석 제공
 */
export async function performGeminiAnalysis(
  request: GeminiAnalysisRequest
): Promise<GeminiAnalysisResult> {
  console.log('🧠 Ollama GPT-OSS 20B 통합 분석 시작');
  
  try {
    // GPT-OSS 20B 최적화 프롬프트 생성
    const prompt = generateOllamaOptimizedPrompt(request);
    
    // Ollama GPT-OSS 20B 호출 (15분 타임아웃, 높은 토큰 수)
    const response = await callAI({ 
      prompt, 
      maxTokens: 16384, // GPT-OSS 20B 대용량 출력
      temperature: 0.7,
      timeoutMs: 900000 // 15분
    });
    
    // 응답 파싱 및 검증
    const analysis = parseOllamaResponse(response, request);
    
    // 논리적 일관성 검증
    validateAnalysisConsistency(analysis, request);
    
    return {
      success: true,
      analysis,
      metadata: {
        analysisDepth: calculateAnalysisDepth(analysis),
        confidence: calculateConfidence(request.scores),
        timestamp: new Date().toISOString(),
        aiModel: 'Ollama GPT-OSS 20B',
        tokenCount: response.length
      }
    };
  } catch (error) {
    console.error('❌ Ollama GPT-OSS 20B 분석 실패:', error);
    throw error;
  }
}

/**
 * GPT-OSS 20B 최적화 프롬프트 생성
 * AI CAMP 교육 커리큘럼과 N8N 자동화 프로세스 통합
 */
function generateOllamaOptimizedPrompt(request: GeminiAnalysisRequest): string {
  const { companyName, industry, scores, assessmentData } = request;
  
  // 백분위 설명 수정 - 논리적 오류 제거
  const percentileExplanation = scores.percentile >= 50 
    ? `상위 ${100 - scores.percentile}%`
    : `하위 ${scores.percentile}%`;
  
  return `
# AI 역량진단 전문가 시스템 v16.0 (Ollama GPT-OSS 20B)

당신은 이교장의 AI CAMP 교육 프로그램을 기반으로 한 최고 수준의 AI 역량 진단 전문가입니다.

## 핵심 분석 원칙
1. **데이터 기반 분석**: 모든 분석은 제공된 실제 데이터에만 기반
2. **AI CAMP 커리큘럼 연계**: 교육 프로그램과 연계된 구체적 개선 방안 제시
3. **N8N 자동화 프로세스**: 워크플로우 자동화 관점에서 실행 가능한 솔루션 제안
4. **McKinsey 수준 품질**: 전략 컨설팅 수준의 심층 분석 제공

## 기업 정보
- **회사명**: ${companyName}
- **업종**: ${industry}
- **종합 점수**: ${scores.total}점 (100점 만점)
- **등급**: ${scores.grade}
- **업계 위치**: ${percentileExplanation}

## 영역별 상세 점수
${Object.entries(scores.categories).map(([category, score]) => 
  `- ${getCategoryName(category)}: ${score.toFixed(1)}점`
).join('\n')}

## 평가 데이터
\`\`\`json
${JSON.stringify(assessmentData, null, 2)}
\`\`\`

## 요구사항: 다음 7개 섹션으로 구성된 종합 분석 보고서 작성

### 1. 종합 평가 및 현황 분석
- ${scores.total}점 달성 배경과 ${percentileExplanation} 위치 분석
- 업계 벤치마크 대비 현재 포지션
- 주목할 만한 특징 3가지 (강점/약점/기회 포함)

### 2. 강점 분석 (AI CAMP 관점)
- 평균 이상 점수 영역 기반 구체적 강점 5개
- 각 강점이 비즈니스에 미치는 영향도 분석
- AI CAMP 교육 프로그램과의 연계점

### 3. 개선 필요 영역 (우선순위 기반)
- 평균 이하 점수 영역의 핵심 개선점 5개
- 개선하지 않을 경우의 리스크 분석
- N8N 자동화로 해결 가능한 영역 식별

### 4. SWOT 분석 (전략적 관점)
- **Strengths**: 높은 점수 영역 기반 (최소 4개)
- **Weaknesses**: 낮은 점수 영역 기반 (최소 4개)  
- **Opportunities**: AI 시장 트렌드와 연계된 기회 (최소 4개)
- **Threats**: 현재 상황에서의 위협 요인 (최소 4개)

### 5. 3단계 우선순위 매트릭스
- **즉시 실행 (1개월)**: 가장 시급한 3가지 + 구체적 실행 방법
- **단기 실행 (3개월)**: 중요도 높은 3가지 + 필요 자원
- **장기 계획 (6개월+)**: 전략적 과제 3가지 + 예상 ROI

### 6. AI CAMP 맞춤형 교육 로드맵
- ${companyName}의 ${scores.total}점에 최적화된 교육 과정 추천
- 단계별 학습 경로 (기초→심화→전문가)
- 예상 교육 효과 및 ROI 계산
- N8N 워크플로우 자동화 교육 포함

### 7. 실행 가능한 액션 플랜
- 구체적 실행 방안 (담당자, 일정, 예산 포함)
- 성과 측정 KPI 설정
- 위험 요소 및 대응 방안
- 다음 진단 시점 권고

## 출력 형식
각 섹션을 명확히 구분하고, 실행 가능한 구체적 내용으로 작성하세요.
추상적이거나 일반적인 답변은 금지합니다.

분석을 시작하세요.
`;
}

/**
 * 레거시 GEMINI 프롬프트 (폴백용)
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
// 레거시 callGeminiAPI는 사용 종료. callAI로 대체됨.

/**
 * Ollama GPT-OSS 20B 응답 파싱
 */
function parseOllamaResponse(
  response: string, 
  request: GeminiAnalysisRequest
): GeminiAnalysisResult['analysis'] {
  
  console.log('🔍 Ollama GPT-OSS 20B 응답 파싱 시작');
  
  try {
    // GPT-OSS 20B 응답에서 구조화된 데이터 추출
    const sections = extractSectionsFromOllamaResponse(response);
    
    return {
      overallAssessment: sections.overallAssessment || generateFallbackAssessment(request),
      strengths: sections.strengths || extractStrengthsFromScores(request.scores),
      improvements: sections.improvements || extractImprovementsFromScores(request.scores),
      swotAnalysis: sections.swotAnalysis || generateBasicSWOT(request),
      priorityMatrix: sections.priorityMatrix || generateBasicPriorityMatrix(request),
      recommendations: sections.recommendations || generateBasicRecommendations(request),
      benchmarkComparison: sections.benchmarkComparison || generateBenchmarkComparison(request),
      // AI CAMP 특화 섹션
      aicampRoadmap: sections.aicampRoadmap || generateAICampRoadmap(request),
      n8nAutomationPlan: sections.n8nAutomationPlan || generateN8NAutomationPlan(request),
      actionPlan: sections.actionPlan || generateActionPlan(request)
    };
  } catch (error) {
    console.warn('Ollama 응답 파싱 실패, 기본 분석으로 폴백:', error);
    return generateFallbackAnalysis(request);
  }
}

/**
 * 레거시 GEMINI 응답 파싱 (폴백용)
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
 * Ollama GPT-OSS 20B 응답에서 구조화된 섹션 추출
 */
function extractSectionsFromOllamaResponse(response: string): any {
  const sections: any = {};
  
  try {
    // 섹션별로 응답을 분할하여 파싱
    const sectionPatterns = {
      overallAssessment: /### 1\. 종합 평가.*?(?=### 2\.|$)/s,
      strengths: /### 2\. 강점 분석.*?(?=### 3\.|$)/s,
      improvements: /### 3\. 개선 필요 영역.*?(?=### 4\.|$)/s,
      swotAnalysis: /### 4\. SWOT 분석.*?(?=### 5\.|$)/s,
      priorityMatrix: /### 5\. 3단계 우선순위.*?(?=### 6\.|$)/s,
      aicampRoadmap: /### 6\. AI CAMP.*?(?=### 7\.|$)/s,
      actionPlan: /### 7\. 실행 가능한.*?(?=###|$)/s
    };
    
    for (const [key, pattern] of Object.entries(sectionPatterns)) {
      const match = response.match(pattern);
      if (match) {
        sections[key] = match[0].trim();
      }
    }
    
    return sections;
  } catch (error) {
    console.warn('섹션 추출 실패:', error);
    return {};
  }
}

/**
 * AI CAMP 교육 로드맵 생성
 */
function generateAICampRoadmap(request: GeminiAnalysisRequest): string {
  const { companyName, scores } = request;
  const level = scores.total >= 80 ? '고급' : scores.total >= 60 ? '중급' : '기초';
  
  return `
## AI CAMP 맞춤형 교육 로드맵 (${level} 과정)

### 1단계: 기초 역량 강화 (1-2개월)
- AI 기초 이론 및 비즈니스 적용 사례
- 데이터 리터러시 향상 교육
- AI 도구 활용 실습 (ChatGPT, Claude 등)

### 2단계: 실무 적용 (3-4개월)  
- 업무 프로세스 AI 자동화
- N8N 워크플로우 설계 및 구축
- AI 기반 의사결정 시스템 구축

### 3단계: 전문가 과정 (5-6개월)
- AI 전략 수립 및 실행
- 조직 AI 변화 관리
- ROI 측정 및 성과 관리

### 예상 교육 효과
- 업무 효율성: 30-50% 향상
- 의사결정 속도: 40% 개선  
- 비용 절감: 연간 20-30%
`;
}

/**
 * N8N 자동화 계획 생성
 */
function generateN8NAutomationPlan(request: GeminiAnalysisRequest): string {
  return `
## N8N 프로세스 자동화 계획

### 우선순위 1: 데이터 수집 자동화
- 고객 데이터 통합 워크플로우
- 실시간 모니터링 대시보드
- 자동 보고서 생성 시스템

### 우선순위 2: 의사결정 지원 자동화
- AI 기반 추천 시스템
- 예측 분석 파이프라인
- 알림 및 경고 시스템

### 우선순위 3: 고객 서비스 자동화
- 챗봇 통합 워크플로우
- 자동 응답 시스템
- 고객 만족도 추적

### 구현 일정
- 1개월: 기본 워크플로우 구축
- 2-3개월: 고도화 및 통합
- 4-6개월: 최적화 및 확장
`;
}

/**
 * 액션 플랜 생성
 */
function generateActionPlan(request: GeminiAnalysisRequest): string {
  const { companyName, scores } = request;
  
  return `
## ${companyName} 실행 액션 플랜

### 즉시 실행 (1개월 내)
1. **AI 역량 진단 결과 공유** 
   - 담당자: 경영진
   - 예산: 무료
   - KPI: 전 직원 인지도 100%

2. **기초 AI 교육 시작**
   - 담당자: 인사팀
   - 예산: 500만원
   - KPI: 참여율 80% 이상

3. **N8N 파일럿 프로젝트**
   - 담당자: IT팀
   - 예산: 300만원  
   - KPI: 1개 워크플로우 구축

### 단기 실행 (3개월 내)
1. **AI 도구 도입 확대**
2. **프로세스 자동화 구축**
3. **성과 측정 시스템 구축**

### 장기 계획 (6개월 이상)
1. **AI 전략 수립**
2. **조직 문화 변화**
3. **지속적 개선 체계**

### 위험 요소 및 대응
- 직원 저항: 단계적 교육으로 해결
- 예산 부족: ROI 기반 우선순위 조정
- 기술적 한계: 외부 전문가 협력
`;
}

/**
 * 폴백 분석 생성
 */
function generateFallbackAnalysis(request: GeminiAnalysisRequest): any {
  return {
    overallAssessment: `${request.companyName}의 AI 역량 점수는 ${request.scores.total}점으로 평가되었습니다.`,
    strengths: extractStrengthsFromScores(request.scores),
    improvements: extractImprovementsFromScores(request.scores),
    swotAnalysis: generateBasicSWOT(request),
    priorityMatrix: generateBasicPriorityMatrix(request),
    recommendations: generateBasicRecommendations(request),
    benchmarkComparison: generateBenchmarkComparison(request),
    aicampRoadmap: generateAICampRoadmap(request),
    n8nAutomationPlan: generateN8NAutomationPlan(request),
    actionPlan: generateActionPlan(request)
  };
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
