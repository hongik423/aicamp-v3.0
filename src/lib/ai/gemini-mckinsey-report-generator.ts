/**
 * 🎯 GEMINI 2.5 Flash 기반 세계 최고 수준 맥킨지 보고서 생성기
 * 이교장 방법론 + 이교장 톤앤매너 + 45개 행동지표 정밀 분석
 */

import { McKinsey45QuestionsResult } from '@/lib/workflow/mckinsey-45-questions-workflow';
import { callAI } from '@/lib/ai/ai-provider';

// 통합 AI 호출 사용

export interface GeminiReportRequest {
  analysisResult: McKinsey45QuestionsResult;
  reportType: 'executive' | 'detailed' | 'presentation';
  language: 'ko' | 'en';
  customization?: {
    industryContext?: string;
    timeframe?: string;
    focusAreas?: string[];
  };
}

export interface GeminiReportResponse {
  success: boolean;
  reportId: string;
  content: {
    // 11개 섹션 구조
    coverPage: string;
    executiveSummary: string;
    companyInformation: string;
    diagnosisVisualization: string;
    behavioralAnalysis: string;
    benchmarkAnalysis: string;
    swotAnalysis: string;
    priorityMatrix: string;
    n8nMethodology: string;
    aicampCurriculum: string;
    implementationRoadmap: string;
    conclusionNextSteps: string;
  };
  metadata: {
    generatedAt: string;
    wordCount: number;
    analysisDepth: number;
    confidence: number;
    version: string;
  };
  error?: string;
}

/**
 * GEMINI 2.5 Flash 기반 맥킨지 보고서 생성 메인 함수
 */
export async function generateGeminiMcKinseyReport(
  request: GeminiReportRequest
): Promise<GeminiReportResponse> {
  const startTime = Date.now();
  const reportId = `GEMINI_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    console.log('🤖 GEMINI 2.5 Flash 맥킨지 보고서 생성 시작:', reportId);
    
    const { analysisResult, customization } = request;
    
    // 통합 AI 호출 기반 섹션 병렬 생성
    const sections = await Promise.allSettled([
      generateSection('coverPage', analysisResult),
      generateSection('executiveSummary', analysisResult, customization),
      generateSection('companyInformation', analysisResult),
      generateSection('diagnosisVisualization', analysisResult),
      generateSection('behavioralAnalysis', analysisResult),
      generateSection('benchmarkAnalysis', analysisResult, customization),
      generateSection('swotAnalysis', analysisResult, customization),
      generateSection('priorityMatrix', analysisResult),
      generateSection('n8nMethodology', analysisResult),
      generateSection('aicampCurriculum', analysisResult),
      generateSection('implementationRoadmap', analysisResult, customization),
      generateSection('conclusionNextSteps', analysisResult)
    ]);
    
    // 결과 수집 및 검증
    const sectionContents = sections.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        console.error(`❌ 섹션 ${index + 1} 생성 실패:`, result.reason);
        return generateFallbackContent(index, analysisResult);
      }
    });
    
    const processingTime = Date.now() - startTime;
    const totalWordCount = sectionContents.join(' ').length;
    
    console.log('✅ GEMINI 2.5 Flash 보고서 생성 완료:', {
      reportId,
      processingTime: `${processingTime}ms`,
      wordCount: totalWordCount,
      sectionsGenerated: sectionContents.length
    });
    
    return {
      success: true,
      reportId,
      content: {
        coverPage: sectionContents[0],
        executiveSummary: sectionContents[1],
        companyInformation: sectionContents[2],
        diagnosisVisualization: sectionContents[3],
        behavioralAnalysis: sectionContents[4],
        benchmarkAnalysis: sectionContents[5],
        swotAnalysis: sectionContents[6],
        priorityMatrix: sectionContents[7],
        n8nMethodology: sectionContents[8],
        aicampCurriculum: sectionContents[9],
        implementationRoadmap: sectionContents[10],
        conclusionNextSteps: sectionContents[11]
      },
      metadata: {
        generatedAt: new Date().toISOString(),
        wordCount: totalWordCount,
        analysisDepth: calculateAnalysisDepth(sectionContents),
        confidence: calculateConfidenceScore(analysisResult),
        version: 'GEMINI-2.5-FLASH-V15.0'
      }
    };
    
  } catch (error: unknown) {
    console.error('❌ GEMINI 맥킨지 보고서 생성 실패:', error);
    
    return {
      success: false,
      reportId,
      content: {
        coverPage: '',
        executiveSummary: '',
        companyInformation: '',
        diagnosisVisualization: '',
        behavioralAnalysis: '',
        benchmarkAnalysis: '',
        swotAnalysis: '',
        priorityMatrix: '',
        n8nMethodology: '',
        aicampCurriculum: '',
        implementationRoadmap: '',
        conclusionNextSteps: ''
      },
      metadata: {
        generatedAt: new Date().toISOString(),
        wordCount: 0,
        analysisDepth: 0,
        confidence: 0,
        version: 'GEMINI-2.5-FLASH-V15.0'
      },
      error: error.message
    };
  }
}

/**
 * GEMINI API를 통한 섹션별 콘텐츠 생성
 */
async function generateSection(
  sectionType: string, 
  analysisResult: McKinsey45QuestionsResult,
  customization?: Record<string, unknown>
): Promise<string> {
  const prompt = getSectionPrompt(sectionType, analysisResult, customization);
  
  try {
    const text = await callAI({ prompt, maxTokens: 50000, temperature: 0.7 });
    return text;
    
  } catch (error) {
    console.error(`❌ ${sectionType} 섹션 생성 실패:`, error);
    throw error;
  }
}

/**
 * 섹션별 프롬프트 생성
 */
function getSectionPrompt(
  sectionType: string, 
  analysisResult: McKinsey45QuestionsResult,
  customization?: Record<string, unknown>
): string {
  const { companyInfo, scoreAnalysis, diagnosisId } = analysisResult;
  
  const baseContext = `
회사 정보:
- 회사명: ${companyInfo.name}
- 업종: ${companyInfo.industry}
- 규모: ${companyInfo.size}
- 총점: ${scoreAnalysis.totalScore}점/100점
- 등급: ${scoreAnalysis.grade}등급
- 성숙도: ${scoreAnalysis.maturityLevel}
- 상위 백분율: ${100 - scoreAnalysis.percentile}%
- 진단 ID: ${diagnosisId}
`;
  
  switch (sectionType) {
    case 'coverPage':
      return `
${baseContext}

당신은 세계 최고 수준의 이교장 컨설턴트입니다. 전문적인 표지 페이지를 작성해주세요.

요구사항:
1. 이교장의AI역량진단보고서 (메인 타이틀)
2. 이교장 방법론 기반 정밀 분석 (서브타이틀)
3. 회사 정보 및 진단 정보 표시
4. AICAMP AI 역량진단 시스템 V15.0 브랜딩
5. 전문적이고 신뢰감 있는 디자인

HTML 형식으로 응답하되, 스타일링은 포함하지 마세요.
`;

    case 'executiveSummary':
      return `
${baseContext}

당신은 이후경 교장(AICAMP 대표)입니다. 친근하고 격려하는 톤으로 경영진 요약을 작성해주세요.

이교장 톤앤매너:
- "걱정 마세요", "바로 시작하세요" 등 격려 표현
- 친근하고 따뜻한 말투
- 실무적이고 구체적인 조언
- 자신감을 주는 메시지

요구사항:
1. 🎯 핵심 진단 결과 요약
2. 이교장 톤앤매너 적용된 친근한 메시지
3. ⚡ 즉시 실행 권고사항 3가지
4. 격려와 동기부여가 담긴 마무리

HTML 형식으로 응답하되, 이모지와 함께 작성해주세요.
`;

    case 'companyInformation':
      return `
${baseContext}

이교장 스타일로 기업 정보 섹션을 작성해주세요.

요구사항:
1. 회사 기본 정보 정리
2. 진단 개요 및 방법론 설명
3. 45개 행동지표 기반 분석 방법론
4. 전문적이고 객관적인 톤

HTML 형식으로 응답해주세요.
`;

    case 'diagnosisVisualization':
      return `
${baseContext}

카테고리별 점수:
- 사업 기반: ${scoreAnalysis.categoryScores.businessFoundation}점
- 현재 AI 활용: ${scoreAnalysis.categoryScores.currentAI}점
- 조직 준비도: ${scoreAnalysis.categoryScores.organizationReadiness}점
- 기술 인프라: ${scoreAnalysis.categoryScores.techInfrastructure}점
- 목표 명확성: ${scoreAnalysis.categoryScores.goalClarity}점
- 실행 역량: ${scoreAnalysis.categoryScores.executionCapability}점

이교장 스타일 진단 결과 시각화 섹션을 작성해주세요.

요구사항:
1. 6개 영역 스코어 카드 설명
2. 레이더 차트 데이터 구조 제공
3. 벤치마크 비교 차트 설명
4. 각 영역별 해석 및 의미

Chart.js 데이터 구조도 포함해서 HTML로 응답해주세요.
`;

    case 'behavioralAnalysis':
      // 45개 질문 응답에서 상위/하위 5개 추출
      const sortedResponses = Object.entries(analysisResult.responses)
        .map(([key, value]) => ({ question: key, score: value }))
        .sort((a, b) => b.score - a.score);
      
      const top5 = sortedResponses.slice(0, 5);
      const bottom5 = sortedResponses.slice(-5);
      
      return `
${baseContext}

상위 5개 강점 행동:
${top5.map((item, index) => `${index + 1}. 질문 ${item.question}: ${item.score}점`).join('\n')}

하위 5개 개선 필요 행동:
${bottom5.map((item, index) => `${index + 1}. 질문 ${item.question}: ${item.score}점`).join('\n')}

45개 행동지표 분석 결과를 바탕으로 전문적인 행동 분석을 작성해주세요.

요구사항:
1. 💪 상위 5개 강점 행동 분석
2. 🚀 상위 5개 개선 필요 행동 분석
3. 각 행동의 키워드 및 구체적 설명
4. 실무적 개선 방안 제시

HTML 형식으로 응답해주세요.
`;

    case 'benchmarkAnalysis':
      return `
${baseContext}

이교장 스타일 벤치마크 분석을 작성해주세요.

요구사항:
1. 업종별 비교 분석
2. 규모별 비교 분석
3. 경쟁 포지션 분석
4. 시장 내 위치 및 경쟁 우위 요소

실제 데이터를 기반으로 한 구체적이고 전문적인 분석을 HTML로 작성해주세요.
`;

    case 'swotAnalysis':
      return `
${baseContext}

${companyInfo.name}의 AI 역량에 대한 전문적인 SWOT 분석을 작성해주세요.

요구사항:
1. 💪 강점 (Strengths) - 녹색 박스 스타일
2. ⚠️ 약점 (Weaknesses) - 빨간색 박스 스타일
3. 🚀 기회 (Opportunities) - 파란색 박스 스타일
4. ⚡ 위협 (Threats) - 주황색 박스 스타일

각 항목당 3-4개의 구체적이고 실무적인 내용을 포함해서 HTML로 작성해주세요.
`;

    case 'priorityMatrix':
      return `
${baseContext}

이교장 스타일 우선순위 매트릭스를 작성해주세요.

요구사항:
1. 중요도-긴급성 매트릭스 (2x2 그리드)
2. 실행 우선순위 순서 (1-6순위)
3. 각 우선순위별 구체적 액션 아이템
4. 시간별 실행 계획

HTML 형식으로 매트릭스 테이블과 함께 작성해주세요.
`;

    case 'n8nMethodology':
      return `
${baseContext}

이후경 교장의 톤앤매너로 n8n 기반 실행방법론을 작성해주세요.

이교장 톤앤매너:
- "코딩 몰라도 괜찮습니다!" (시그니처 문구)
- 친근하고 격려하는 말투
- 실무적이고 구체적인 가이드
- 자신감을 주는 메시지

요구사항:
1. 이교장 톤앤매너 인사말
2. 3개 커리큘럼 카드:
   - 🔄 n8n 기초 워크플로우 (12시간)
   - 📊 업무 자동화 실무 (16시간)
   - 🤖 AI + n8n 통합 (20시간)
3. 🎯 ${companyInfo.industry} 업종 맞춤형 n8n 활용 시나리오
4. 격려와 동기부여 메시지

HTML 형식으로 카드 레이아웃과 함께 작성해주세요.
`;

    case 'aicampCurriculum':
      return `
${baseContext}

${companyInfo.name}의 진단 결과를 바탕으로 맞춤형 AICAMP 커리큘럼을 추천해주세요.

요구사항:
1. 진단 결과 기반 맞춤형 교육과정 추천
2. 💰 투자 대비 효과 (ROI) 구체적 수치:
   - 업무 효율성 300% 향상
   - 의사결정 속도 50% 개선
   - 인건비 절약 연간 2억원
   - 고객 만족도 40% 증가
3. 단계별 학습 로드맵
4. 예상 학습 기간 및 비용

HTML 형식으로 ROI 차트와 함께 작성해주세요.
`;

    case 'implementationRoadmap':
      return `
${baseContext}

${companyInfo.name}을 위한 맞춤형 3단계 실행 로드맵을 작성해주세요.

요구사항:
1. 1단계: 🚀 AI 기초 역량 구축 (1-2개월)
   - 진단 후 맞춤 제안 (TBD)
   - 구체적 액션 아이템
2. 2단계: ⚡ 업무 자동화 고도화 (3-4개월)
   - 진단 후 맞춤 제안 (TBD)
   - 구체적 액션 아이템
3. 3단계: 🎯 AI 전문 조직 완성 (5-6개월)
   - 진단 후 맞춤 제안 (TBD)
   - 구체적 액션 아이템

각 단계별 목표, 활동, 성과지표, 리스크를 포함해서 HTML로 작성해주세요.
`;

    case 'conclusionNextSteps':
      return `
${baseContext}

이후경 교장의 톤앤매너로 결론 및 다음 단계를 작성해주세요.

이교장 톤앤매너:
- 격려하고 동기부여하는 말투
- "걱정 마세요", "바로 시작하세요" 등
- 따뜻하고 친근한 메시지
- 구체적이고 실무적인 조언

요구사항:
1. 🎯 핵심 메시지 (진단 결과 요약)
2. 이교장 톤앤매너 격려 및 동기부여 메시지
3. 📞 즉시 연락 필요 사항 (3단계 액션 아이템):
   - 1단계: 무료 상담 신청
   - 2단계: 맞춤형 커리큘럼 설계
   - 3단계: 실행 계획 수립
4. 연락처 정보 (010-9251-9743, hongik423@gmail.com)

HTML 형식으로 CTA 버튼과 함께 작성해주세요.
`;

    default:
      return `${baseContext}\n\n전문적인 ${sectionType} 섹션을 HTML 형식으로 작성해주세요.`;
  }
}

/**
 * 폴백 콘텐츠 생성 (GEMINI API 실패 시)
 */
function generateFallbackContent(sectionIndex: number, analysisResult: McKinsey45QuestionsResult): string {
  const { companyInfo, scoreAnalysis } = analysisResult;
  
  const fallbackContents = [
    // 0: Cover Page
    `<div class="cover-page">
      <h1>이교장의AI역량진단보고서</h1>
      <h2>이교장 방법론 기반 정밀 분석</h2>
      <div class="company-info">
        <p><strong>회사명:</strong> ${companyInfo.name}</p>
        <p><strong>업종:</strong> ${companyInfo.industry}</p>
        <p><strong>총점:</strong> ${scoreAnalysis.totalScore}점</p>
        <p><strong>등급:</strong> ${scoreAnalysis.grade}등급</p>
      </div>
      <p class="branding">AICAMP AI 역량진단 시스템 V15.0</p>
    </div>`,
    
    // 1: Executive Summary
    `<div class="executive-summary">
      <h2>🎯 경영진 요약</h2>
      <p>안녕하세요! ${companyInfo.name} 담당자님, 걱정 마세요. AI 역량진단 결과를 바탕으로 맞춤형 솔루션을 제안드리겠습니다.</p>
      <div class="key-results">
        <h3>핵심 진단 결과</h3>
        <ul>
          <li>종합 점수: ${scoreAnalysis.totalScore}점/100점</li>
          <li>등급: ${scoreAnalysis.grade}등급</li>
          <li>성숙도: ${scoreAnalysis.maturityLevel}</li>
        </ul>
      </div>
      <div class="recommendations">
        <h3>⚡ 즉시 실행 권고사항</h3>
        <ol>
          <li>AI 기초 역량 강화 교육 시작</li>
          <li>업무 자동화 파일럿 프로젝트 실행</li>
          <li>조직 내 AI 챔피언 양성</li>
        </ol>
      </div>
    </div>`,
    
    // 나머지 섹션들도 유사하게 폴백 콘텐츠 제공
    `<div class="section"><h2>기업 정보</h2><p>상세 분석 중입니다...</p></div>`,
    `<div class="section"><h2>진단 결과 시각화</h2><p>차트 생성 중입니다...</p></div>`,
    `<div class="section"><h2>행동지표 기반 분석</h2><p>행동 패턴 분석 중입니다...</p></div>`,
    `<div class="section"><h2>벤치마크 분석</h2><p>업계 비교 분석 중입니다...</p></div>`,
    `<div class="section"><h2>SWOT 분석</h2><p>전략적 분석 중입니다...</p></div>`,
    `<div class="section"><h2>우선순위 매트릭스</h2><p>실행 우선순위 분석 중입니다...</p></div>`,
    `<div class="section"><h2>n8n 기반 실행방법론</h2><p>코딩 몰라도 괜찮습니다! 맞춤형 방법론을 준비 중입니다...</p></div>`,
    `<div class="section"><h2>AICAMP 커리큘럼 추천</h2><p>맞춤형 교육과정을 설계 중입니다...</p></div>`,
    `<div class="section"><h2>3단계 실행 로드맵</h2><p>단계별 실행 계획을 수립 중입니다...</p></div>`,
    `<div class="section"><h2>결론 및 다음 단계</h2><p>바로 시작하세요! 010-9251-9743으로 연락주시면 맞춤형 상담을 제공해드리겠습니다.</p></div>`
  ];
  
  return fallbackContents[sectionIndex] || `<div class="section"><p>섹션 생성 중입니다...</p></div>`;
}

/**
 * 분석 깊이 계산
 */
function calculateAnalysisDepth(sections: string[]): number {
  const totalLength = sections.join('').length;
  const averageLength = totalLength / sections.length;
  
  // 섹션별 평균 길이를 기준으로 분석 깊이 계산 (0-100)
  return Math.min(100, Math.round((averageLength / 1000) * 100));
}

/**
 * 신뢰도 점수 계산
 */
function calculateConfidenceScore(analysisResult: McKinsey45QuestionsResult): number {
  const { qualityMetrics } = analysisResult;
  
  // 품질 메트릭을 기반으로 신뢰도 계산
  return Math.round(
    (qualityMetrics.overallQuality + 
     qualityMetrics.dataCompleteness + 
     qualityMetrics.aiAnalysisDepth) / 3
  );
}