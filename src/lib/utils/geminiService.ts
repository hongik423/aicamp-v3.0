/**
 * GEMINI 2.5 Flash API 서비스
 * AI 역량진단 보고서 생성 전용
 */

const GEMINI_API_KEY = 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

export interface GeminiReportRequest {
  companyInfo: {
    name: string;
    industry: string;
    employees: string;
    businessContent: string;
    challenges: string;
  };
  assessmentScores: Record<string, number>;
  currentStatus: string;
}

export interface GeminiReportResponse {
  success: boolean;
  report?: {
    swotAnalysis: {
      strengths: string[];
      weaknesses: string[];
      opportunities: string[];
      threats: string[];
    };
    strategies: {
      SO: string[]; // 강점-기회 전략
      WO: string[]; // 약점-기회 전략
      ST: string[]; // 강점-위협 전략
      WT: string[]; // 약점-위협 전략
    };
    matrixAnalysis: {
      importance: {
        high: string[];
        medium: string[];
        low: string[];
      };
      urgency: {
        immediate: string[];
        shortTerm: string[];
        longTerm: string[];
      };
    };
    roadmap: Array<{
      phase: string;
      period: string;
      tasks: string[];
      expectedOutcome: string;
    }>;
    roi: {
      investment: string;
      expectedReturn: string;
      paybackPeriod: string;
      recommendations: string[];
    };
    customRecommendations: Array<{
      title: string;
      description: string;
      priority: 'high' | 'medium' | 'low';
      expectedImpact: string;
    }>;
  };
  error?: string;
}

/**
 * GEMINI API를 통한 AI 보고서 생성
 */
export async function generateAIReport(request: GeminiReportRequest): Promise<GeminiReportResponse> {
  try {
    const prompt = createDetailedPrompt(request);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
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

    if (!response.ok) {
      throw new Error(`GEMINI API 오류: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error('GEMINI API 응답이 비어있습니다');
    }

    // JSON 파싱 시도
    try {
      const report = JSON.parse(generatedText);
      return {
        success: true,
        report
      };
    } catch (parseError) {
      // JSON 파싱 실패시 텍스트 분석
      const report = parseTextResponse(generatedText);
      return {
        success: true,
        report
      };
    }

  } catch (error) {
    console.error('GEMINI API 오류:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    };
  }
}

/**
 * 상세한 프롬프트 생성
 */
function createDetailedPrompt(request: GeminiReportRequest): string {
  const { companyInfo, assessmentScores, currentStatus } = request;
  
  // 점수 평균 계산
  const scores = Object.values(assessmentScores);
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  const level = avgScore >= 4 ? '높음' : avgScore >= 3 ? '보통' : avgScore >= 2 ? '낮음' : '매우 낮음';

  return `
당신은 AI 역량진단 전문가입니다. 다음 기업의 AI 역량진단 결과를 분석하여 상세한 보고서를 JSON 형식으로 작성해주세요.

[기업 정보]
- 기업명: ${companyInfo.name}
- 업종: ${companyInfo.industry}
- 직원수: ${companyInfo.employees}
- 사업내용: ${companyInfo.businessContent}
- 주요 과제: ${companyInfo.challenges}

[AI 역량 평가 결과]
- 평균 점수: ${avgScore.toFixed(1)}/5.0
- 전체 수준: ${level}
- 현재 상황: ${currentStatus}

[세부 평가 항목]
${Object.entries(assessmentScores).map(([key, value]) => `- ${key}: ${value}/5`).join('\n')}

다음 형식으로 정확한 JSON을 생성해주세요:

{
  "swotAnalysis": {
    "strengths": ["강점1", "강점2", "강점3", "강점4"],
    "weaknesses": ["약점1", "약점2", "약점3", "약점4"],
    "opportunities": ["기회1", "기회2", "기회3", "기회4"],
    "threats": ["위협1", "위협2", "위협3", "위협4"]
  },
  "strategies": {
    "SO": ["SO전략1", "SO전략2"],
    "WO": ["WO전략1", "WO전략2"],
    "ST": ["ST전략1", "ST전략2"],
    "WT": ["WT전략1", "WT전략2"]
  },
  "matrixAnalysis": {
    "importance": {
      "high": ["중요도 높은 과제들"],
      "medium": ["중요도 중간 과제들"],
      "low": ["중요도 낮은 과제들"]
    },
    "urgency": {
      "immediate": ["즉시 실행 과제들"],
      "shortTerm": ["단기 실행 과제들"],
      "longTerm": ["장기 실행 과제들"]
    }
  },
  "roadmap": [
    {
      "phase": "1단계: 기초 구축",
      "period": "0-3개월",
      "tasks": ["과제1", "과제2", "과제3"],
      "expectedOutcome": "기대 성과"
    },
    {
      "phase": "2단계: 확산 적용",
      "period": "3-6개월",
      "tasks": ["과제1", "과제2", "과제3"],
      "expectedOutcome": "기대 성과"
    },
    {
      "phase": "3단계: 고도화",
      "period": "6-12개월",
      "tasks": ["과제1", "과제2", "과제3"],
      "expectedOutcome": "기대 성과"
    }
  ],
  "roi": {
    "investment": "예상 투자 비용",
    "expectedReturn": "예상 수익/절감액",
    "paybackPeriod": "투자 회수 기간",
    "recommendations": ["추천사항1", "추천사항2", "추천사항3"]
  },
  "customRecommendations": [
    {
      "title": "맞춤 추천 1",
      "description": "상세 설명",
      "priority": "high",
      "expectedImpact": "예상 효과"
    },
    {
      "title": "맞춤 추천 2",
      "description": "상세 설명",
      "priority": "medium",
      "expectedImpact": "예상 효과"
    }
  ]
}

업종별 특성과 기업 규모를 고려하여 실용적이고 구체적인 내용으로 작성해주세요.
반드시 유효한 JSON 형식으로만 응답하고, 추가 설명은 포함하지 마세요.
`;
}

/**
 * 텍스트 응답 파싱 (폴백)
 */
function parseTextResponse(text: string): any {
  // 기본 구조 생성
  const report = {
    swotAnalysis: {
      strengths: [],
      weaknesses: [],
      opportunities: [],
      threats: []
    },
    strategies: {
      SO: [],
      WO: [],
      ST: [],
      WT: []
    },
    matrixAnalysis: {
      importance: {
        high: [],
        medium: [],
        low: []
      },
      urgency: {
        immediate: [],
        shortTerm: [],
        longTerm: []
      }
    },
    roadmap: [],
    roi: {
      investment: '',
      expectedReturn: '',
      paybackPeriod: '',
      recommendations: []
    },
    customRecommendations: []
  };

  // 텍스트에서 패턴 매칭으로 데이터 추출
  try {
    // SWOT 분석 추출
    const swotPatterns = {
      strengths: /강점[:\s]*([\s\S]*?)(?=약점|기회|위협|전략|$)/i,
      weaknesses: /약점[:\s]*([\s\S]*?)(?=강점|기회|위협|전략|$)/i,
      opportunities: /기회[:\s]*([\s\S]*?)(?=강점|약점|위협|전략|$)/i,
      threats: /위협[:\s]*([\s\S]*?)(?=강점|약점|기회|전략|$)/i
    };

    for (const [key, pattern] of Object.entries(swotPatterns)) {
      const match = text.match(pattern);
      if (match) {
        const items = match[1].split(/[-•·*\n]/).filter(item => item.trim().length > 0);
        report.swotAnalysis[key as keyof typeof report.swotAnalysis] = items.slice(0, 4).map(item => item.trim());
      }
    }

    // 로드맵 추출
    const roadmapPattern = /(\d단계[:\s]*[^\n]*)\n([\s\S]*?)(?=\d단계|$)/gi;
    let roadmapMatch;
    while ((roadmapMatch = roadmapPattern.exec(text)) !== null) {
      const phase = roadmapMatch[1].trim();
      const content = roadmapMatch[2];
      const tasks = content.split(/[-•·*\n]/).filter(item => item.trim().length > 0).slice(0, 4);
      
      report.roadmap.push({
        phase,
        period: '3개월',
        tasks: tasks.map(t => t.trim()),
        expectedOutcome: '단계별 목표 달성'
      });
    }

    // ROI 정보 추출
    const investmentMatch = text.match(/투자[:\s]*([^\n]*)/i);
    const returnMatch = text.match(/수익|절감[:\s]*([^\n]*)/i);
    
    if (investmentMatch) report.roi.investment = investmentMatch[1].trim();
    if (returnMatch) report.roi.expectedReturn = returnMatch[1].trim();
    report.roi.paybackPeriod = '12개월';
    report.roi.recommendations = ['AI 교육 실시', '단계적 도입', '성과 측정'];

  } catch (error) {
    console.error('텍스트 파싱 오류:', error);
  }

  // 기본값 채우기
  if (report.swotAnalysis.strengths.length === 0) {
    report.swotAnalysis.strengths = [
      'AI 도입 의지가 강함',
      '경영진의 적극적 지원',
      '기존 IT 인프라 양호',
      '직원들의 학습 의욕'
    ];
  }

  if (report.roadmap.length === 0) {
    report.roadmap = [
      {
        phase: '1단계: 기초 구축',
        period: '0-3개월',
        tasks: ['AI 교육 실시', '현황 분석', '목표 설정'],
        expectedOutcome: 'AI 기초 역량 확보'
      },
      {
        phase: '2단계: 파일럿 프로젝트',
        period: '3-6개월',
        tasks: ['시범 프로젝트 선정', 'AI 도구 도입', '성과 측정'],
        expectedOutcome: '초기 성과 창출'
      },
      {
        phase: '3단계: 전사 확산',
        period: '6-12개월',
        tasks: ['전사 확대 적용', 'AI 문화 정착', '지속 개선'],
        expectedOutcome: 'AI 기반 혁신 체계 구축'
      }
    ];
  }

  return report;
}

/**
 * 업종별 맞춤 인사이트 생성
 */
export function generateIndustryInsights(industry: string): string[] {
  const insights: Record<string, string[]> = {
    '제조업': [
      '스마트 팩토리 구축을 통한 생산성 향상',
      '예측 정비를 통한 설비 가동률 최적화',
      '품질 검사 자동화로 불량률 감소',
      'AI 기반 수요 예측으로 재고 최적화'
    ],
    'IT/소프트웨어': [
      'AI 기반 코드 리뷰 및 버그 예측',
      '자동화된 테스트 및 배포 파이프라인',
      'AI 챗봇을 통한 고객 지원 자동화',
      '머신러닝 기반 보안 위협 탐지'
    ],
    '유통/물류': [
      'AI 수요 예측을 통한 재고 최적화',
      '물류 경로 최적화로 배송 효율 향상',
      '고객 행동 분석을 통한 맞춤 마케팅',
      '자동화 창고 관리 시스템 구축'
    ],
    '금융': [
      'AI 기반 신용 평가 모델 고도화',
      '이상 거래 탐지 시스템 강화',
      'RPA를 통한 백오피스 업무 자동화',
      '챗봇 기반 24/7 고객 상담 서비스'
    ],
    '의료/헬스케어': [
      'AI 진단 보조 시스템 도입',
      '환자 데이터 분석을 통한 맞춤 치료',
      '의료 영상 AI 분석 활용',
      '신약 개발 프로세스 가속화'
    ]
  };

  return insights[industry] || insights['IT/소프트웨어'];
}

/**
 * 규모별 추천 전략
 */
export function getScaleStrategy(employees: string): {
  focus: string;
  budget: string;
  timeline: string;
  approach: string;
} {
  const strategies: Record<string, any> = {
    '1-10명': {
      focus: 'AI 도구 활용',
      budget: '500-1000만원',
      timeline: '3-6개월',
      approach: 'SaaS 기반 AI 서비스 도입'
    },
    '11-50명': {
      focus: '핵심 업무 자동화',
      budget: '2000-5000만원',
      timeline: '6-9개월',
      approach: '부서별 단계적 AI 도입'
    },
    '51-100명': {
      focus: '전사적 AI 전환',
      budget: '5000만원-1억원',
      timeline: '9-12개월',
      approach: 'AI 센터 구축 및 전문팀 운영'
    },
    '101-300명': {
      focus: 'AI 기반 혁신',
      budget: '1-3억원',
      timeline: '12-18개월',
      approach: '전사 AI 플랫폼 구축'
    },
    '300명 이상': {
      focus: 'AI 경영 체계',
      budget: '3억원 이상',
      timeline: '18-24개월',
      approach: 'AI CoE 설립 및 생태계 구축'
    }
  };

  return strategies[employees] || strategies['51-100명'];
}