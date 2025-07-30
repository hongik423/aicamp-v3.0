'use client';

/**
 * 🎯 고급 SWOT 분석 엔진 - AI 시대 경영진단 시스템
 * - 업종별 AI 트렌드 반영
 * - SO/WO/ST/WT 매트릭스 전략 생성
 * - 신청자 점수 기반 맞춤형 분석
 */

export interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface SWOTStrategy {
  SO: string[]; // Strength-Opportunity 전략
  WO: string[]; // Weakness-Opportunity 전략  
  ST: string[]; // Strength-Threat 전략
  WT: string[]; // Weakness-Threat 전략
}

export interface AITrendAnalysis {
  currentAITrends: string[];
  futureChanges: string[];
  adaptationStrategies: string[];
  competitiveAdvantages: string[];
}

export interface IndustryAITrends {
  [industry: string]: {
    aiTrends: string[];
    futureImpact: string[];
    requiredCapabilities: string[];
    opportunities: string[];
    threats: string[];
  };
}

// 업종별 AI 트렌드 데이터베이스
const INDUSTRY_AI_TRENDS: IndustryAITrends = {
  'manufacturing': {
    aiTrends: [
      'AI 품질검사 시스템으로 불량률 90% 감소',
      '예측 유지보수로 설비 가동률 95% 달성',
      'AI 기반 수요예측으로 재고비용 30% 절감',
      '협업로봇(코봇) 도입으로 생산성 40% 향상',
      'AI 에너지 최적화로 전력비용 25% 절감'
    ],
    futureImpact: [
      '2027년까지 스마트팩토리 의무화 예상',
      'AI 엔지니어 수요 300% 증가 전망',
      '무인 공장 운영 본격화',
      '디지털 트윈 기반 가상 시뮬레이션 표준화',
      'AI 기반 맞춤형 대량생산 시대 도래'
    ],
    requiredCapabilities: [
      'AI/데이터 분석 인력 확보',
      'IoT 센서 인프라 구축',
      'ERP/MES 시스템 고도화',
      '클라우드 기반 운영체계',
      'AI 보안 시스템 구축'
    ],
    opportunities: [
      '정부 스마트공장 지원금 연 2조원',
      'AI 도입시 세액공제 최대 30%',
      '글로벌 스마트팩토리 시장 진출',
      'AI 기반 신제품 개발 가속화',
      '친환경 AI 제조 프리미엄 시장'
    ],
    threats: [
      'AI 도입 늦을 시 시장 퇴출 위험',
      '중국/동남아 AI 제조업 추격',
      'AI 인력 확보 경쟁 심화',
      '초기 투자비용 부담',
      'AI 오작동 리스크'
    ]
  },
  'it': {
    aiTrends: [
      'GPT 기반 코드 자동생성으로 개발속도 3배 향상',
      'AI 테스팅으로 버그 발견율 95% 달성',
      'AI 기반 사이버보안으로 침해사고 80% 감소',
      'AI 프로젝트 관리로 납기 준수율 90% 향상',
      'AI 고객지원으로 CS 비용 60% 절감'
    ],
    futureImpact: [
      '2026년까지 개발자의 80%가 AI 도구 필수 사용',
      'No-code/Low-code 플랫폼 주류화',
      'AI 기반 자동 아키텍처 설계 보편화',
      '초거대 AI 모델 기반 서비스 경쟁',
      'AI-Human 협업 개발 표준화'
    ],
    requiredCapabilities: [
      'AI/ML 엔지니어링 역량',
      'MLOps 인프라 구축',
      'AI 윤리 가이드라인',
      '대규모 데이터 처리 능력',
      'AI 모델 최적화 기술'
    ],
    opportunities: [
      'AI SaaS 시장 연 40% 성장',
      'AI 스타트업 투자 급증',
      '정부 AI 바우처 지원사업',
      'AI 기반 신규 비즈니스 모델',
      '글로벌 AI 서비스 수출'
    ],
    threats: [
      '빅테크 기업의 시장 독점',
      'AI 인재 이탈 리스크',
      'AI 규제 강화 대응',
      '기술 변화 속도 가속화',
      'AI 기반 경쟁사 출현'
    ]
  },
  'service': {
    aiTrends: [
      'AI 챗봇으로 24/7 고객응대 실현',
      'AI 개인화 추천으로 매출 35% 증가',
      'AI 수요예측으로 인력배치 최적화',
      'AI 감정분석으로 고객만족도 20% 향상',
      'AI 자동화로 운영비용 40% 절감'
    ],
    futureImpact: [
      '2025년까지 서비스업의 50% AI 도입',
      '무인 서비스 매장 확산',
      'AI 기반 초개인화 서비스 표준화',
      '음성 AI 기반 서비스 주류화',
      '메타버스 연계 서비스 본격화'
    ],
    requiredCapabilities: [
      'AI 서비스 기획 역량',
      '고객 데이터 분석 능력',
      'AI 도구 활용 교육',
      '디지털 채널 운영',
      'AI-Human 협업 체계'
    ],
    opportunities: [
      '서비스업 디지털 전환 지원금',
      'AI 기반 프랜차이즈 시장',
      '온-오프라인 융합 서비스',
      'AI 구독 서비스 모델',
      '데이터 기반 신규 수익원'
    ],
    threats: [
      '플랫폼 기업 시장 잠식',
      'AI 도입 격차 심화',
      '고객 데이터 보안 이슈',
      '기존 인력 구조조정',
      'AI 서비스 품질 편차'
    ]
  },
  'retail': {
    aiTrends: [
      'AI 수요예측으로 재고회전율 50% 개선',
      'AI 동적 가격책정으로 수익률 25% 향상',
      'AI 기반 매장 레이아웃 최적화',
      'AI 추천시스템으로 객단가 30% 증가',
      '무인 계산대로 인건비 35% 절감'
    ],
    futureImpact: [
      '2026년까지 무인매장 50% 확산',
      'AI 기반 실시간 가격 변동 일반화',
      '가상현실 쇼핑 체험 보편화',
      'AI 큐레이션 커머스 주류화',
      '완전 자동화 물류센터 표준화'
    ],
    requiredCapabilities: [
      'AI 기반 MD 역량',
      '옴니채널 운영 능력',
      '실시간 데이터 분석',
      'AI 마케팅 자동화',
      '디지털 결제 시스템'
    ],
    opportunities: [
      '리테일테크 시장 급성장',
      'AI 기반 신규 고객층 확보',
      '온라인-오프라인 시너지',
      'AI 프라이빗 브랜드 개발',
      '데이터 커머스 수익 창출'
    ],
    threats: [
      '이커머스 대기업 경쟁',
      'AI 투자 비용 부담',
      '기술 표준화 압력',
      '소비자 프라이버시 규제',
      'AI 의존도 심화 리스크'
    ]
  },
  'food': {
    aiTrends: [
      'AI 메뉴 최적화로 폐기율 70% 감소',
      'AI 주문 예측으로 대기시간 50% 단축',
      'AI 위생관리로 식품안전사고 제로화',
      'AI 기반 맛 프로파일링 도입',
      '로봇 조리 시스템으로 일관성 확보'
    ],
    futureImpact: [
      '2025년까지 키오스크 주문 80% 전환',
      'AI 셰프 로봇 대중화',
      '개인 맞춤형 영양 메뉴 제공',
      '완전 자동화 주방 시스템',
      'AI 기반 프랜차이즈 운영'
    ],
    requiredCapabilities: [
      'AI 주문 시스템 구축',
      '식품 데이터 관리',
      '자동화 설비 운영',
      'AI 마케팅 활용',
      '디지털 위생 관리'
    ],
    opportunities: [
      '푸드테크 투자 활성화',
      'AI 배달 최적화 시장',
      '건강식 AI 큐레이션',
      '무인 매장 프랜차이즈',
      'AI 레시피 특허 사업'
    ],
    threats: [
      '배달 플랫폼 수수료',
      'AI 도입 초기 비용',
      '전통적 조리 선호층',
      '식품 규제 강화',
      '기술 고장 리스크'
    ]
  }
};

export class AdvancedSWOTEngine {
  /**
   * 고급 SWOT 분석 생성
   */
  static generateAdvancedSWOT(
    industry: string,
    companyData: any,
    scores: any
  ): {
    swot: SWOTAnalysis;
    strategies: SWOTStrategy;
    aiAnalysis: AITrendAnalysis;
  } {
    // 업종 정규화
    const normalizedIndustry = this.normalizeIndustry(industry);
    const aiTrends = INDUSTRY_AI_TRENDS[normalizedIndustry] || INDUSTRY_AI_TRENDS['service'];
    
    // 점수 기반 SWOT 생성
    const swot = this.generateDynamicSWOT(normalizedIndustry, scores, companyData);
    
    // SO/WO/ST/WT 전략 생성
    const strategies = this.generateSWOTStrategies(swot, aiTrends, companyData);
    
    // AI 트렌드 분석
    const aiAnalysis = this.generateAIAnalysis(normalizedIndustry, scores, companyData);
    
    return {
      swot,
      strategies,
      aiAnalysis
    };
  }

  /**
   * 동적 SWOT 생성 (신청자 점수 반영)
   */
  private static generateDynamicSWOT(
    industry: string,
    scores: any,
    companyData: any
  ): SWOTAnalysis {
    const totalScore = scores.totalScore || 0;
    const categoryScores = scores.categoryScores || {};
    
    // 강점 분석 (높은 점수 항목 기반)
    const strengths: string[] = [];
    if (categoryScores.productService?.score > 3.5) {
      strengths.push('우수한 상품/서비스 경쟁력');
    }
    if (categoryScores.customerService?.score > 3.5) {
      strengths.push('탁월한 고객 서비스 역량');
    }
    if (categoryScores.marketing?.score > 3.5) {
      strengths.push('효과적인 마케팅 전략 실행');
    }
    if (categoryScores.procurement?.score > 3.5) {
      strengths.push('효율적인 구매/재고 관리');
    }
    if (categoryScores.storeManagement?.score > 3.5) {
      strengths.push('체계적인 매장 운영 관리');
    }
    
    // 업종별 추가 강점
    if (industry === 'manufacturing' && totalScore > 70) {
      strengths.push('제조 기술력 및 품질 우위');
    }
    if (industry === 'it' && totalScore > 70) {
      strengths.push('혁신적인 기술 개발 역량');
    }
    
    // 약점 분석 (낮은 점수 항목 기반)
    const weaknesses: string[] = [];
    if (categoryScores.productService?.score < 3) {
      weaknesses.push('상품/서비스 차별화 부족');
    }
    if (categoryScores.customerService?.score < 3) {
      weaknesses.push('고객 응대 체계 미흡');
    }
    if (categoryScores.marketing?.score < 3) {
      weaknesses.push('마케팅 전략 및 실행력 부족');
    }
    if (categoryScores.procurement?.score < 3) {
      weaknesses.push('비효율적인 재고/구매 관리');
    }
    if (categoryScores.storeManagement?.score < 3) {
      weaknesses.push('매장 관리 시스템 개선 필요');
    }
    
    // AI 준비도 관련 약점
    if (scores.digitalReadiness < 50) {
      weaknesses.push('AI/디지털 전환 준비 미흡');
    }
    
    // 기회 요인 (업종별 + 성장단계별)
    const opportunities = [...INDUSTRY_AI_TRENDS[industry]?.opportunities || []];
    if (companyData.growthStage === '창업기') {
      opportunities.push('정부 창업지원 프로그램 활용 가능');
    }
    if (companyData.employeeCount === '1-10명') {
      opportunities.push('민첩한 의사결정으로 빠른 AI 도입 가능');
    }
    
    // 위협 요인 (업종별 + 점수별)
    const threats = [...INDUSTRY_AI_TRENDS[industry]?.threats || []];
    if (totalScore < 50) {
      threats.push('경쟁력 약화로 시장 점유율 하락 위험');
    }
    
    return {
      strengths: strengths.length > 0 ? strengths : ['기본적인 사업 운영 역량 보유'],
      weaknesses: weaknesses.length > 0 ? weaknesses : ['전반적인 경쟁력 강화 필요'],
      opportunities: opportunities.slice(0, 5),
      threats: threats.slice(0, 5)
    };
  }

  /**
   * SWOT 매트릭스 전략 생성
   */
  private static generateSWOTStrategies(
    swot: SWOTAnalysis,
    aiTrends: any,
    companyData: any
  ): SWOTStrategy {
    const companyName = companyData.companyName || '귀사';
    const industry = companyData.industry || '업종';
    const employeeCount = companyData.employeeCount || '미확인';
    const growthStage = companyData.growthStage || '성장기';
    
    // AI CAMP 교육 커리큘럼 연계
    const educationPrograms = this.getRecommendedEducationPrograms(industry, companyData);
    
    return {
      // SO 전략: 강점을 활용하여 기회를 극대화 (3개 이상)
      SO: [
        `${swot.strengths[0]}을 바탕으로 ${aiTrends.aiTrends[0]}를 선도적으로 도입하여 시장 리더십 확보`,
        `기존 핵심 역량에 AI 기술을 접목하여 ${aiTrends.opportunities[0]} 적극 활용`,
        `${companyName}의 강점을 AI로 증폭시켜 신규 비즈니스 모델 창출 및 수익원 다각화`,
        `현재의 우수한 운영 역량을 기반으로 ${educationPrograms.primary} 교육 도입하여 전사적 AI 역량 강화`,
        `업계 선도적 위치를 활용하여 AI 기반 파트너십 구축 및 생태계 리더십 확보`
      ],
      
      // WO 전략: 약점을 보완하면서 기회를 활용 (3개 이상)
      WO: [
        `${swot.weaknesses[0]} 문제를 AI 도입으로 근본적으로 해결하고 경쟁력 확보`,
        `정부 AI 지원사업을 활용하여 취약 부문 디지털 전환 가속화 (최대 30% 세액공제 활용)`,
        `AI 교육 프로그램으로 인력 역량을 강화하여 약점을 강점으로 전환`,
        `${educationPrograms.secondary} 교육을 통해 부서별 맞춤형 AI 활용 능력 배양`,
        `외부 AI 전문가 컨설팅과 내부 교육을 병행하여 단계적 역량 강화 추진`,
        `클라우드 기반 AI 솔루션 도입으로 초기 투자 부담 최소화하며 빠른 성과 창출`
      ],
      
      // ST 전략: 강점을 활용하여 위협을 방어 (3개 이상)
      ST: [
        `${swot.strengths[0]}을 AI로 더욱 강화하여 ${aiTrends.threats[0]}에 대응`,
        `핵심 경쟁력을 AI로 차별화하여 신규 진입자 위협 차단 및 진입장벽 구축`,
        `기존 고객 기반을 AI 서비스로 고도화하여 이탈 방지 및 충성도 강화`,
        `${industry} 특화 AI 솔루션 개발로 대기업과의 차별화된 포지셔닝 확보`,
        `AI 기반 품질 관리 시스템으로 규제 대응력 강화 및 리스크 최소화`,
        `핵심 인력의 AI 전문성 강화로 인재 유출 방지 및 조직 경쟁력 유지`
      ],
      
      // WT 전략: 약점을 최소화하고 위협을 회피 (3개 이상)
      WT: [
        `단계적 AI 도입으로 ${swot.weaknesses[0]}을 개선하며 리스크 최소화`,
        `AI 컨설팅을 통해 효율적인 디지털 전환 로드맵 수립 및 실행`,
        `핵심 분야부터 선택적 AI 도입으로 투자 대비 효과 극대화`,
        `${employeeCount} 규모에 맞는 맞춤형 AI 솔루션 도입으로 비용 효율성 확보`,
        `정부 지원사업 및 바우처 프로그램 활용하여 AI 도입 비용 부담 완화`,
        `AI CAMP의 ${educationPrograms.foundational} 교육으로 기초 역량부터 체계적 구축`,
        `파일럿 프로젝트를 통한 검증 후 확산으로 실패 리스크 최소화`
      ]
    };
  }

  /**
   * 업종별 추천 교육 프로그램 매칭
   */
  private static getRecommendedEducationPrograms(industry: string, companyData: any): any {
    const industryPrograms: Record<string, any> = {
      'manufacturing': {
        primary: '생산/물류 트랙 AI & n8n 자동화 교육',
        secondary: '품질관리 AI 시스템 구축 과정',
        foundational: '스마트팩토리 기초 과정',
        advanced: 'AI 기반 예측 유지보수 심화 과정'
      },
      'it': {
        primary: '기획/전략 트랙 AI 자동화 교육',
        secondary: 'GPT 기반 개발 자동화 과정',
        foundational: 'AI/ML 엔지니어링 기초',
        advanced: 'MLOps 구축 및 운영 심화'
      },
      'service': {
        primary: '고객지원(CS) 트랙 AI 자동화 교육',
        secondary: '마케팅 트랙 디지털 전환 과정',
        foundational: 'AI 챗봇 구축 기초',
        advanced: '고객 데이터 분석 AI 활용 심화'
      },
      'retail': {
        primary: '영업 트랙 AI & n8n 자동화 교육',
        secondary: '재고관리 AI 최적화 과정',
        foundational: 'AI 기반 수요예측 기초',
        advanced: '옴니채널 AI 전략 심화'
      },
      'food': {
        primary: '고객지원(CS) 트랙 AI 자동화 교육',
        secondary: '마케팅 트랙 SNS 분석 과정',
        foundational: 'AI 메뉴 최적화 기초',
        advanced: '무인 매장 운영 시스템 구축'
      }
    };

    const normalizedIndustry = this.normalizeIndustry(industry);
    return industryPrograms[normalizedIndustry] || industryPrograms['service'];
  }

  /**
   * AI 트렌드 분석 생성
   */
  private static generateAIAnalysis(
    industry: string,
    scores: any,
    companyData: any
  ): AITrendAnalysis {
    const aiTrends = INDUSTRY_AI_TRENDS[industry] || INDUSTRY_AI_TRENDS['service'];
    const totalScore = scores.totalScore || 0;
    
    return {
      currentAITrends: aiTrends.aiTrends.slice(0, 3),
      
      futureChanges: aiTrends.futureImpact.slice(0, 3),
      
      adaptationStrategies: [
        `1단계: AI 기초 인프라 구축 (${aiTrends.requiredCapabilities[0]})`,
        `2단계: 핵심 업무 AI 도입 (${aiTrends.aiTrends[0]})`,
        `3단계: 전사적 AI 확산 및 고도화`,
        `4단계: AI 기반 신사업 모델 개발`
      ],
      
      competitiveAdvantages: totalScore >= 70 ? [
        'AI 조기 도입자(Early Adopter) 이점 확보 가능',
        '업계 최초 AI 혁신 사례 창출 기회',
        'AI 기반 프리미엄 서비스로 고부가가치 실현',
        '데이터 자산화를 통한 신규 수익원 창출'
      ] : [
        'AI 도입으로 현재 격차 빠르게 극복 가능',
        '검증된 AI 솔루션 도입으로 리스크 최소화',
        '정부 지원사업 활용한 비용 효율적 전환',
        'AI 활용한 운영 효율화로 수익성 개선'
      ]
    };
  }

  /**
   * 업종명 정규화
   */
  private static normalizeIndustry(industry: string): string {
    const mapping: Record<string, string> = {
      '제조업': 'manufacturing',
      '제조': 'manufacturing',
      'IT': 'it',
      '소프트웨어': 'it',
      '서비스업': 'service',
      '서비스': 'service',
      '소매업': 'retail',
      '소매': 'retail',
      '유통': 'retail',
      '외식업': 'food',
      '음식점': 'food',
      '카페': 'food'
    };
    
    return mapping[industry] || 'service';
  }
} 