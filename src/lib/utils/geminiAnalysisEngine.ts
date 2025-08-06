'use client';

// 🤖 GEMINI 2.5 Flash 기반 고도화 분석 엔진
export class GeminiAnalysisEngine {
  private apiKey: string;
  private baseUrl: string = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM';
  }

  // 🏢 기업 정보 기반 종합 분석
  async analyzeCompanyComprehensive(companyData: any): Promise<any> {
    const prompt = this.buildComprehensiveAnalysisPrompt(companyData);
    
    try {
      const response = await this.callGeminiAPI(prompt);
      return this.parseComprehensiveAnalysis(response);
    } catch (error) {
      console.error('❌ GEMINI 종합 분석 실패:', error);
      throw error;
    }
  }

  // 🎯 SWOT 분석 (실제 기업 정보 반영)
  async generateAdvancedSWOT(companyData: any, scoreData: any): Promise<any> {
    const prompt = this.buildSWOTPrompt(companyData, scoreData);
    
    try {
      const response = await this.callGeminiAPI(prompt);
      return this.parseSWOTAnalysis(response);
    } catch (error) {
      console.error('❌ GEMINI SWOT 분석 실패:', error);
      throw error;
    }
  }

  // 🗺️ 맞춤형 로드맵 생성
  async generateCustomRoadmap(companyData: any, swotData: any, scoreData: any): Promise<any> {
    const prompt = this.buildRoadmapPrompt(companyData, swotData, scoreData);
    
    try {
      const response = await this.callGeminiAPI(prompt);
      return this.parseRoadmapAnalysis(response);
    } catch (error) {
      console.error('❌ GEMINI 로드맵 생성 실패:', error);
      throw error;
    }
  }

  // 📊 종합 진단보고서 생성
  async generateComprehensiveReport(companyData: any, analysisResults: any): Promise<string> {
    const prompt = this.buildReportPrompt(companyData, analysisResults);
    
    try {
      const response = await this.callGeminiAPI(prompt);
      return this.parseReportContent(response);
    } catch (error) {
      console.error('❌ GEMINI 보고서 생성 실패:', error);
      throw error;
    }
  }

  // 🔧 종합 분석 프롬프트 구성
  private buildComprehensiveAnalysisPrompt(companyData: any): string {
    const industry = Array.isArray(companyData.industry) ? companyData.industry[0] : companyData.industry;
    
    return `
당신은 20년 경력의 경영 컨설턴트입니다. 다음 기업 정보를 바탕으로 종합적인 경영 분석을 수행해주세요.

=== 기업 정보 ===
• 회사명: ${companyData.companyName}
• 업종: ${industry}
• 소재지: ${companyData.businessLocation}
• 직원 수: ${companyData.employeeCount}
• 담당자: ${companyData.contactManager}
• 주요 관심사: ${companyData.mainConcerns || '경영 효율성 개선'}
• 기대 효과: ${companyData.expectedBenefits || 'AI 활용을 통한 경쟁력 강화'}
• 성장 단계: ${companyData.growthStage || '성장기'}

=== 평가 점수 (1-5점) ===
• 기획력: ${companyData.planning_level || 3}점
• 차별화: ${companyData.differentiation_level || 3}점
• 가격정책: ${companyData.pricing_level || 3}점
• 전문성: ${companyData.expertise_level || 3}점
• 품질관리: ${companyData.quality_level || 3}점
• 고객응대: ${companyData.customer_greeting || 3}점
• 고객서비스: ${companyData.customer_service || 3}점
• 불만관리: ${companyData.complaint_management || 3}점
• 고객유지: ${companyData.customer_retention || 3}점
• 고객이해: ${companyData.customer_understanding || 3}점
• 마케팅기획: ${companyData.marketing_planning || 3}점
• 오프라인마케팅: ${companyData.offline_marketing || 3}점
• 온라인마케팅: ${companyData.online_marketing || 3}점
• 영업전략: ${companyData.sales_strategy || 3}점
• 구매관리: ${companyData.purchase_management || 3}점
• 재고관리: ${companyData.inventory_management || 3}점
• 외관관리: ${companyData.exterior_management || 3}점
• 내부관리: ${companyData.interior_management || 3}점
• 청결도: ${companyData.cleanliness || 3}점
• 업무흐름: ${companyData.work_flow || 3}점

다음 형식으로 JSON 응답해주세요:
{
  "overallAssessment": "전반적 평가 (200자 이내)",
  "keyStrengths": ["강점1", "강점2", "강점3"],
  "criticalWeaknesses": ["약점1", "약점2", "약점3"],
  "industryPosition": "업계 내 위치 분석 (100자 이내)",
  "competitiveAdvantage": "경쟁 우위 요소 (150자 이내)",
  "urgentImprovements": ["개선1", "개선2", "개선3"],
  "growthPotential": "성장 잠재력 평가 (100자 이내)",
  "riskFactors": ["위험요소1", "위험요소2"],
  "recommendedFocus": "집중 추천 영역 (100자 이내)"
}
`;
  }

  // 🎯 SWOT 프롬프트 구성
  private buildSWOTPrompt(companyData: any, scoreData: any): string {
    const industry = Array.isArray(companyData.industry) ? companyData.industry[0] : companyData.industry;
    const totalScore = scoreData.totalScore || 60;
    
    return `
${companyData.companyName} (${industry}, ${companyData.employeeCount})의 SWOT 분석을 수행해주세요.

=== 기업 현황 ===
• 총점: ${totalScore}점/100점
• 등급: ${scoreData.overallGrade || 'B'}
• 소재지: ${companyData.businessLocation}
• 주요 관심사: ${companyData.mainConcerns || '경영 효율성'}

=== 카테고리별 점수 ===
${scoreData.categoryResults?.map((cat: any) => `• ${cat.categoryName}: ${cat.score100}점`).join('\n') || ''}

=== 업종별 특성 고려사항 ===
${this.getIndustryContext(industry)}

다음 형식으로 JSON 응답해주세요:
{
  "strengths": [
    {"factor": "강점요소", "description": "구체적 설명", "impact": "영향도(상/중/하)"},
    {"factor": "강점요소", "description": "구체적 설명", "impact": "영향도(상/중/하)"},
    {"factor": "강점요소", "description": "구체적 설명", "impact": "영향도(상/중/하)"}
  ],
  "weaknesses": [
    {"factor": "약점요소", "description": "구체적 설명", "urgency": "시급성(상/중/하)"},
    {"factor": "약점요소", "description": "구체적 설명", "urgency": "시급성(상/중/하)"},
    {"factor": "약점요소", "description": "구체적 설명", "urgency": "시급성(상/중/하)"}
  ],
  "opportunities": [
    {"factor": "기회요소", "description": "구체적 설명", "timeline": "시기(단기/중기/장기)"},
    {"factor": "기회요소", "description": "구체적 설명", "timeline": "시기(단기/중기/장기)"},
    {"factor": "기회요소", "description": "구체적 설명", "timeline": "시기(단기/중기/장기)"}
  ],
  "threats": [
    {"factor": "위협요소", "description": "구체적 설명", "probability": "발생가능성(상/중/하)"},
    {"factor": "위협요소", "description": "구체적 설명", "probability": "발생가능성(상/중/하)"}
  ],
  "strategies": {
    "SO": ["강점-기회 전략1", "강점-기회 전략2"],
    "WO": ["약점-기회 전략1", "약점-기회 전략2"],
    "ST": ["강점-위협 전략1", "강점-위협 전략2"],
    "WT": ["약점-위협 전략1", "약점-위협 전략2"]
  }
}
`;
  }

  // 🗺️ 로드맵 프롬프트 구성
  private buildRoadmapPrompt(companyData: any, swotData: any, scoreData: any): string {
    const industry = Array.isArray(companyData.industry) ? companyData.industry[0] : companyData.industry;
    
    return `
${companyData.companyName}를 위한 맞춤형 경영 개선 로드맵을 작성해주세요.

=== 기업 정보 ===
• 업종: ${industry}
• 규모: ${companyData.employeeCount}
• 현재 총점: ${scoreData.totalScore}점
• 목표: ${companyData.expectedBenefits || 'AI 기반 경쟁력 강화'}

=== SWOT 요약 ===
• 핵심 강점: ${swotData.strengths?.[0]?.factor || '기본 운영 역량'}
• 주요 약점: ${swotData.weaknesses?.[0]?.factor || '디지털화 부족'}
• 최대 기회: ${swotData.opportunities?.[0]?.factor || '기술 도입'}
• 주요 위협: ${swotData.threats?.[0]?.factor || '경쟁 심화'}

다음 형식으로 JSON 응답해주세요:
{
  "vision": "${companyData.companyName}의 3년 후 비전 (100자 이내)",
  "objectives": [
    {"period": "3개월", "goal": "단기 목표", "kpi": "측정지표"},
    {"period": "6개월", "goal": "중단기 목표", "kpi": "측정지표"},
    {"period": "1년", "goal": "연간 목표", "kpi": "측정지표"},
    {"period": "3년", "goal": "장기 목표", "kpi": "측정지표"}
  ],
  "actionPlans": {
    "immediate": [
      {"action": "즉시 실행 과제", "responsible": "담당자", "budget": "예산범위", "expected": "기대효과"}
    ],
    "shortTerm": [
      {"action": "단기 과제 (3-6개월)", "responsible": "담당자", "budget": "예산범위", "expected": "기대효과"}
    ],
    "mediumTerm": [
      {"action": "중기 과제 (6-12개월)", "responsible": "담당자", "budget": "예산범위", "expected": "기대효과"}
    ],
    "longTerm": [
      {"action": "장기 과제 (1-3년)", "responsible": "담당자", "budget": "예산범위", "expected": "기대효과"}
    ]
  },
  "milestones": [
    {"month": 3, "milestone": "3개월 마일스톤", "criteria": "달성 기준"},
    {"month": 6, "milestone": "6개월 마일스톤", "criteria": "달성 기준"},
    {"month": 12, "milestone": "12개월 마일스톤", "criteria": "달성 기준"}
  ],
  "successFactors": ["성공요인1", "성공요인2", "성공요인3"],
  "riskMitigation": [
    {"risk": "위험요소", "mitigation": "대응방안", "monitoring": "모니터링 방법"}
  ]
}
`;
  }

  // 📊 보고서 프롬프트 구성
  private buildReportPrompt(companyData: any, analysisResults: any): string {
    const industry = Array.isArray(companyData.industry) ? companyData.industry[0] : companyData.industry;
    
    return `
${companyData.companyName}의 종합 경영진단보고서를 작성해주세요.

=== 기업 개요 ===
• 회사명: ${companyData.companyName}
• 업종: ${industry}
• 규모: ${companyData.employeeCount}
• 소재지: ${companyData.businessLocation}
• 담당자: ${companyData.contactManager}

=== 분석 결과 요약 ===
• 종합 점수: ${analysisResults.totalScore}점
• 등급: ${analysisResults.overallGrade}
• 주요 강점: ${analysisResults.swotAnalysis?.strengths?.[0]?.factor}
• 주요 약점: ${analysisResults.swotAnalysis?.weaknesses?.[0]?.factor}

전문적이고 실용적인 경영진단보고서를 한국어로 작성해주세요. 
보고서는 다음 구조로 작성하되, 총 2000자 이내로 작성해주세요:

1. 경영진단 개요
2. 종합 평가 결과
3. 분야별 상세 분석
4. SWOT 분석
5. 개선 권고사항
6. 실행 로드맵
7. 결론 및 제언

각 섹션은 구체적이고 실행 가능한 내용으로 작성하며, ${companyData.companyName}의 실제 상황을 반영해주세요.
`;
  }

  // 🔧 업종별 컨텍스트 제공
  private getIndustryContext(industry: string): string {
    const contexts: Record<string, string> = {
      '제조업': '생산성, 품질관리, 공급망, 스마트팩토리, ESG 경영이 핵심 요소입니다.',
      '서비스업': '고객경험, 디지털전환, 서비스품질, 브랜딩이 경쟁력의 핵심입니다.',
      'IT': '기술혁신, 인재확보, 프로젝트관리, 시장대응속도가 중요합니다.',
      '소매업': '고객접점, 재고관리, 옴니채널, 매장운영이 핵심 경쟁요소입니다.',
      '외식업': '고객서비스, 위생관리, 메뉴차별화, 운영효율성이 중요합니다.',
      '건설업': '프로젝트관리, 안전관리, 기술력, 자금관리가 핵심입니다.'
    };
    
    return contexts[industry] || '업종별 특성을 고려한 맞춤형 분석이 필요합니다.';
  }

  // 🌐 GEMINI API 호출
  private async callGeminiAPI(prompt: string): Promise<string> {
    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    };

    const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`GEMINI API 오류: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('GEMINI API 응답 형식 오류');
    }

    return data.candidates[0].content.parts[0].text;
  }

  // 🔍 종합 분석 결과 파싱
  private parseComprehensiveAnalysis(response: string): any {
    try {
      // JSON 블록 추출
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('JSON 형식을 찾을 수 없음');
    } catch (error) {
      console.error('종합 분석 파싱 오류:', error);
      return {
        overallAssessment: '분석 결과를 파싱하는 중 오류가 발생했습니다.',
        keyStrengths: ['기본 운영 역량', '업계 경험'],
        criticalWeaknesses: ['디지털화 필요', '시스템 개선'],
        industryPosition: '업계 평균 수준',
        competitiveAdvantage: '고객 관계 및 서비스 경험',
        urgentImprovements: ['디지털 전환', '프로세스 개선'],
        growthPotential: '중간 수준의 성장 잠재력',
        riskFactors: ['기술 변화', '경쟁 심화'],
        recommendedFocus: 'AI 기술 도입 및 운영 효율성 개선'
      };
    }
  }

  // 🎯 SWOT 분석 결과 파싱
  private parseSWOTAnalysis(response: string): any {
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('JSON 형식을 찾을 수 없음');
    } catch (error) {
      console.error('SWOT 분석 파싱 오류:', error);
      return {
        strengths: [
          { factor: '기본 운영 역량', description: '안정적인 사업 운영', impact: '중' },
          { factor: '고객 관계', description: '기존 고객과의 신뢰 관계', impact: '상' }
        ],
        weaknesses: [
          { factor: '디지털화 부족', description: 'IT 시스템 활용 미흡', urgency: '상' },
          { factor: '마케팅 역량', description: '온라인 마케팅 경험 부족', urgency: '중' }
        ],
        opportunities: [
          { factor: 'AI 기술 도입', description: '업무 자동화 및 효율성 향상', timeline: '단기' },
          { factor: '정부 지원사업', description: '디지털 전환 지원 활용', timeline: '단기' }
        ],
        threats: [
          { factor: '경쟁 심화', description: '시장 내 경쟁업체 증가', probability: '상' },
          { factor: '기술 변화', description: '빠른 기술 발전에 따른 적응 압박', probability: '중' }
        ],
        strategies: {
          SO: ['강점을 활용한 AI 기술 도입', '고객 관계 기반 서비스 확장'],
          WO: ['디지털 마케팅 역량 강화', 'AI 도구를 통한 운영 개선'],
          ST: ['핵심 역량 유지를 통한 차별화', '고객 충성도 기반 경쟁력 확보'],
          WT: ['기본 시스템 구축', '단계적 디지털 전환']
        }
      };
    }
  }

  // 🗺️ 로드맵 결과 파싱
  private parseRoadmapAnalysis(response: string): any {
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('JSON 형식을 찾을 수 없음');
    } catch (error) {
      console.error('로드맵 파싱 오류:', error);
      return {
        vision: 'AI 기반 경쟁력을 갖춘 업계 선도 기업으로 성장',
        objectives: [
          { period: '3개월', goal: '기본 시스템 구축', kpi: '시스템 도입률 80%' },
          { period: '6개월', goal: '운영 효율성 개선', kpi: '업무 효율성 20% 향상' },
          { period: '1년', goal: 'AI 도구 활용 정착', kpi: 'AI 활용률 60%' },
          { period: '3년', goal: '업계 선도 기업 위치 확보', kpi: '시장점유율 상위 20%' }
        ],
        actionPlans: {
          immediate: [
            { action: '현재 프로세스 분석 및 개선점 도출', responsible: '경영진', budget: '100만원', expected: '문제점 명확화' }
          ],
          shortTerm: [
            { action: 'AI 도구 도입 및 직원 교육', responsible: 'IT담당자', budget: '500만원', expected: '업무 효율성 향상' }
          ],
          mediumTerm: [
            { action: '고객 관리 시스템 고도화', responsible: '마케팅팀', budget: '1000만원', expected: '고객 만족도 향상' }
          ],
          longTerm: [
            { action: '사업 확장 및 신규 시장 진출', responsible: '경영진', budget: '5000만원', expected: '매출 증대' }
          ]
        },
        milestones: [
          { month: 3, milestone: '기본 시스템 구축 완료', criteria: '핵심 프로세스 디지털화 80%' },
          { month: 6, milestone: 'AI 도구 활용 정착', criteria: '직원 AI 활용률 60%' },
          { month: 12, milestone: '운영 효율성 목표 달성', criteria: '업무 효율성 20% 향상' }
        ],
        successFactors: ['경영진 의지', '직원 교육', '단계적 접근'],
        riskMitigation: [
          { risk: '직원 저항', mitigation: '충분한 교육과 소통', monitoring: '월별 만족도 조사' }
        ]
      };
    }
  }

  // 📄 보고서 내용 파싱
  private parseReportContent(response: string): string {
    // GEMINI에서 반환된 텍스트를 그대로 사용 (마크다운 형식 정리)
    return response
      .replace(/```/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .trim();
  }
}

export default GeminiAnalysisEngine;