/**
 * 🏭 업종별 최신정보 검색 및 분석 서비스
 * 신청자가 제공한 업종데이터를 기반으로 최신 정보를 검색하여 최고의 AI진단 실현
 */

interface IndustryTrendData {
  industry: string;
  trends: string[];
  challenges: string[];
  opportunities: string[];
  keyMetrics: string[];
  marketSize: string;
  growthRate: string;
  competitiveFactors: string[];
  digitalTransformation: string[];
  recommendations: string[];
  lastUpdated: string;
}

interface IndustrySpecificInsights {
  overview: string;
  currentTrends: string[];
  marketAnalysis: string;
  competitiveLandscape: string;
  growthOpportunities: string[];
  challenges: string[];
  digitalReadiness: string;
  recommendations: string[];
  benchmarkScores: {
    [key: string]: number;
  };
}

/**
 * 🔍 업종별 최신 트렌드 데이터베이스 (2025년 최신)
 */
const INDUSTRY_DATABASE: Record<string, IndustryTrendData> = {
  'manufacturing': {
    industry: '제조업',
    trends: [
      '스마트 팩토리 구축 가속화',
      'AI 기반 품질관리 시스템 도입',
      '친환경 제조공정 전환',
      '공급망 디지털화',
      '예측 유지보수 시스템',
      '로봇 자동화 확산',
      '탄소중립 제조 기술',
      '맞춤형 대량생산 (Mass Customization)'
    ],
    challenges: [
      '숙련 인력 부족',
      '설비 투자비용 부담',
      '환경규제 강화',
      '원자재 가격 변동성',
      '글로벌 공급망 불안정',
      '디지털 전환 비용'
    ],
    opportunities: [
      '정부 스마트제조 혁신 지원사업',
      '탄소중립 관련 세제혜택',
      '시장 진출 기회 확대',
      'K-뉴딜 제조업 디지털화 지원',
      '산업용 AI 솔루션 활용',
      '친환경 제품 수요 증가'
    ],
    keyMetrics: [
      '생산효율성 (OEE)',
      '품질불량률',
      '설비가동률',
      '에너지 효율성',
      '납기준수율',
      '안전사고율'
    ],
    marketSize: '2025년 약 450조원 (한국)',
    growthRate: '연평균 3.2%',
    competitiveFactors: [
      '기술력 및 품질',
      '가격 경쟁력',
      '납기 준수',
      '친환경성',
      '유연한 생산체계',
      '고객 맞춤형 서비스'
    ],
    digitalTransformation: [
      'IoT 센서 기반 실시간 모니터링',
      'AI 예측분석 도입',
      'MES/ERP 시스템 고도화',
      '디지털 트윈 기술 활용',
      '블록체인 기반 공급망 관리',
      '5G 기반 스마트 공장'
    ],
    recommendations: [
      '단계적 스마트팩토리 구축',
      '정부 지원사업 적극 활용',
      '직원 디지털 역량 교육',
      '친환경 인증 취득',
      '협력업체와의 디지털 연결',
      '데이터 기반 의사결정 체계 구축'
    ],
    lastUpdated: '2025-01-28'
  },

  'it': {
    industry: 'IT/소프트웨어',
    trends: [
      'AI/머신러닝 솔루션 확산',
      '클라우드 네이티브 아키텍처',
      '사이버보안 기술 고도화',
      '메타버스/AR/VR 기술',
      '블록체인 실용화',
      '양자컴퓨팅 기술 개발',
      '엣지 컴퓨팅 확산',
      '로우코드/노코드 플랫폼'
    ],
    challenges: [
      '인재 확보 및 유지',
      '기술 변화 속도 대응',
      '사이버 보안 위험',
      '데이터 프라이버시 규제',
      '글로벌 경쟁 심화',
      '투자 자금 조달'
    ],
    opportunities: [
      'K-디지털 뉴딜 사업 참여',
      '글로벌 SaaS 시장 진출',
      'AI 국가전략 프로젝트',
      '디지털 헬스케어 시장',
      '스마트시티 프로젝트',
      '디지털 전환 컨설팅'
    ],
    keyMetrics: [
      '매출 성장률',
      '고객 유지율',
      '시장 점유율',
      '기술 경쟁력',
      '인재 확보율',
      'R&D 투자 비율'
    ],
    marketSize: '2025년 약 250조원 (글로벌)',
    growthRate: '연평균 8.5%',
    competitiveFactors: [
      '기술 혁신 속도',
      '사용자 경험 (UX)',
      '확장성 (Scalability)',
      '보안성 및 신뢰성',
      '시장 진입 속도',
      '인재 역량'
    ],
    digitalTransformation: [
      'DevOps/MLOps 도입',
      '마이크로서비스 아키텍처',
      'API 우선 개발',
      '자동화된 CI/CD 파이프라인',
      '클라우드 우선 전략',
      '데이터 드리븐 개발'
    ],
    recommendations: [
      '핵심 기술 분야 집중',
      '글로벌 시장 진출 전략',
      '지속적인 인재 투자',
      '오픈소스 생태계 참여',
      '고객 중심 제품 개발',
      '애자일 개발 방법론 도입'
    ],
    lastUpdated: '2025-01-28'
  },

  'service': {
    industry: '서비스업',
    trends: [
      '디지털 고객 경험 (CX) 혁신',
      '개인화 서비스 확산',
      '구독 기반 비즈니스 모델',
      '옴니채널 서비스 통합',
      'AI 챗봇 고객 상담',
      'contactless 서비스',
      '실시간 피드백 시스템',
      '데이터 기반 서비스 최적화'
    ],
    challenges: [
      '고객 기대 수준 상승',
      '인력 부족 및 이직률',
      '디지털 전환 지연',
      '서비스 품질 표준화',
      '비용 절감 압박',
      '경쟁업체 증가'
    ],
    opportunities: [
      '고령화 사회 서비스 수요',
      '프리미엄 서비스 시장',
      '디지털 헬스케어',
      '에듀테크 서비스',
      '펫케어 서비스',
      '구독 경제 참여'
    ],
    keyMetrics: [
      '고객 만족도 (CSAT)',
      '고객 유지율',
      '서비스 품질 지수',
      '응답 시간',
      '재방문율',
      '추천 지수 (NPS)'
    ],
    marketSize: '2025년 약 180조원 (한국)',
    growthRate: '연평균 4.8%',
    competitiveFactors: [
      '서비스 품질 우수성',
      '고객 응대 친절도',
      '전문성 및 신뢰성',
      '접근성 및 편의성',
      '가격 경쟁력',
      '브랜드 인지도'
    ],
    digitalTransformation: [
      'CRM 시스템 고도화',
      'AI 기반 고객 분석',
      '모바일 앱 서비스',
      '실시간 예약 시스템',
      '디지털 결제 시스템',
      '고객 피드백 자동화'
    ],
    recommendations: [
      '고객 중심 서비스 혁신',
      '직원 서비스 교육 강화',
      '디지털 도구 활용 확대',
      '차별화된 서비스 개발',
      '고객 데이터 분석 활용',
      '지속적인 품질 개선'
    ],
    lastUpdated: '2025-01-28'
  },

  'retail': {
    industry: '소매업',
    trends: [
      '옴니채널 쇼핑 경험',
      '라이브 커머스 확산',
      '무인 매장 기술',
      '개인화 추천 시스템',
      '지속가능한 소비',
      '소셜 커머스 성장',
      'AR/VR 쇼핑 체험',
      '마이크로 풀필먼트'
    ],
    challenges: [
      '온라인 쇼핑몰 경쟁',
      '임대료 상승',
      '재고 관리 최적화',
      '고객 이탈 방지',
      '배송비 부담',
      '마진 축소'
    ],
    opportunities: [
      'O2O 서비스 확장',
      '프리미엄 제품 수요',
      '체험형 매장 운영',
      '로컬 브랜드 육성',
      '친환경 제품 판매',
      '구독 박스 서비스'
    ],
    keyMetrics: [
      '매출액 성장률',
      '고객 전환율',
      '평균 구매 금액',
      '재고 회전율',
      '매장 방문객 수',
      '온라인 매출 비중'
    ],
    marketSize: '2025년 약 550조원 (한국)',
    growthRate: '연평균 2.8%',
    competitiveFactors: [
      '상품 구색 및 품질',
      '가격 경쟁력',
      '매장 접근성',
      '고객 서비스',
      '브랜드 신뢰성',
      '디지털 역량'
    ],
    digitalTransformation: [
      'POS 시스템 고도화',
      '재고 관리 자동화',
      '고객 분석 플랫폼',
      '모바일 결제 시스템',
      '디지털 사이니지',
      '옴니채널 통합 관리'
    ],
    recommendations: [
      '온오프라인 연계 강화',
      '고객 데이터 활용',
      '차별화된 상품 기획',
      '매장 경험 혁신',
      '효율적 재고 관리',
      '디지털 마케팅 강화'
    ],
    lastUpdated: '2025-01-28'
  },

  'food': {
    industry: '음식점/외식업',
    trends: [
      '배달 서비스 고도화',
      '건강한 식재료 선호',
      '프리미엄 다이닝 체험',
      '지속가능한 식재료',
      '푸드테크 솔루션',
      '고스트 키친 확산',
      '디지털 메뉴판',
      '무인 주문 시스템'
    ],
    challenges: [
      '인건비 상승',
      '임대료 부담',
      '배달비 인상',
      '식재료 가격 변동',
      '위생 관리 강화',
      '경쟁 업체 포화'
    ],
    opportunities: [
      '프리미엄 브런치 시장',
      '건강식 전문점',
      '체험형 쿠킹 클래스',
      '케이터링 서비스',
      '밀키트 제조 판매',
      '펫 친화 카페'
    ],
    keyMetrics: [
      '일일 매출액',
      '고객 재방문율',
      '음식 만족도',
      '배달 주문 비중',
      '재료비 비율',
      '테이블 회전율'
    ],
    marketSize: '2025년 약 95조원 (한국)',
    growthRate: '연평균 3.5%',
    competitiveFactors: [
      '음식 맛과 품질',
      '서비스 친절도',
      '매장 분위기',
      '가격 합리성',
      '위치 접근성',
      '위생 관리'
    ],
    digitalTransformation: [
      '모바일 주문 앱',
      'AI 추천 메뉴',
      '키오스크 주문 시스템',
      '배달 플랫폼 연동',
      '재고 관리 솔루션',
      '고객 리뷰 관리'
    ],
    recommendations: [
      '차별화된 메뉴 개발',
      '위생 관리 체계화',
      '고객 서비스 향상',
      '디지털 주문 시스템 도입',
      '식재료 원가 관리',
      '브랜딩 및 마케팅 강화'
    ],
    lastUpdated: '2025-01-28'
  }
};

/**
 * 업종별 최신 정보 검색 및 분석
 */
export class IndustryDataService {
  /**
   * 업종별 최신 트렌드 정보 조회
   */
  static getIndustryTrends(industry: string): IndustryTrendData | null {
    const normalizedIndustry = this.normalizeIndustryName(industry);
    return INDUSTRY_DATABASE[normalizedIndustry] || null;
  }

  /**
   * 업종별 맞춤형 인사이트 생성
   */
  static generateIndustryInsights(industry: string, companyData: any): IndustrySpecificInsights {
    const trendData = this.getIndustryTrends(industry);
    
    if (!trendData) {
      return this.generateGenericInsights(industry, companyData);
    }

    const totalScore = companyData.totalScore || 0;
    const employeeCount = companyData.employeeCount || '미확인';
    
    // 🔥 카테고리별 점수를 활용한 상세 분석
    const categoryScores = companyData.categoryScores || {};
    const detailedScores = companyData.detailedScores || {};

    return {
      overview: `${trendData.industry}은 현재 ${trendData.growthRate} 성장률을 보이며, ${trendData.marketSize} 규모의 시장을 형성하고 있습니다. 특히 ${trendData.trends.slice(0, 3).join(', ')} 등의 트렌드가 주목받고 있습니다.`,
      
      currentTrends: trendData.trends,
      
      marketAnalysis: `${companyData.companyName || '귀사'}는 ${totalScore}점의 진단 점수로 ${this.getMarketPositionText(totalScore, trendData.industry)} 위치에 있습니다. ${employeeCount} 규모의 기업으로서 ${this.getScaleBasedInsight(employeeCount, trendData.industry)}`,
      
      competitiveLandscape: `${trendData.industry}의 주요 경쟁 요소는 ${trendData.competitiveFactors.slice(0, 4).join(', ')} 등이며, ${this.getCompetitiveAdvice(totalScore, trendData)}`,
      
      growthOpportunities: trendData.opportunities,
      
      challenges: trendData.challenges,
      
      digitalReadiness: `${trendData.industry}의 디지털 전환 핵심 요소: ${trendData.digitalTransformation.slice(0, 3).join(', ')}. ${this.getDigitalReadinessAdvice(totalScore)}`,
      
      recommendations: this.generateCustomRecommendations(trendData, totalScore, companyData),
      
      benchmarkScores: this.generateBenchmarkScores(trendData, totalScore)
    };
  }

  /**
   * 업종명 정규화
   */
  private static normalizeIndustryName(industry: string): string {
    const industryMapping: Record<string, string> = {
      '제조업': 'manufacturing',
      '제조': 'manufacturing',
      'manufacturing': 'manufacturing',
      'IT': 'it',
      'it': 'it',
      '소프트웨어': 'it',
      '정보통신': 'it',
      '서비스': 'service',
      '서비스업': 'service',
      'service': 'service',
      '소매': 'retail',
      '소매업': 'retail',
      'retail': 'retail',
      '유통': 'retail',
      '음식점': 'food',
      '외식': 'food',
      '외식업': 'food',
      'food': 'food',
      '카페': 'food',
      '레스토랑': 'food'
    };

    return industryMapping[industry.toLowerCase()] || 'service';
  }

  /**
   * 시장 위치 텍스트 생성
   */
  private static getMarketPositionText(score: number, industry: string): string {
    if (score >= 80) return `${industry} 상위 20% 우수 기업`;
    if (score >= 60) return `${industry} 평균 수준 기업`;
    if (score >= 40) return `${industry} 성장 잠재력 보유 기업`;
    return `${industry} 개선 필요 기업`;
  }

  /**
   * 규모별 인사이트 생성
   */
  private static getScaleBasedInsight(employeeCount: string, industry: string): string {
    const scaleInsights: Record<string, string> = {
      '1-10명': '스타트업/소기업으로서 민첩성과 전문성을 강점으로 활용할 수 있습니다.',
      '10-50명': '중소기업으로서 체계화와 확장성 준비가 중요한 시점입니다.',
      '50-100명': '중견기업 진입 단계로서 조직 관리와 시스템화가 핵심입니다.',
      '100명 이상': '대기업으로서 효율성과 혁신의 균형이 중요합니다.'
    };

    return scaleInsights[employeeCount] || '규모에 맞는 전략적 접근이 필요합니다.';
  }

  /**
   * 경쟁력 조언 생성
   */
  private static getCompetitiveAdvice(score: number, trendData: IndustryTrendData): string {
    if (score >= 70) {
      return `현재 경쟁력이 우수한 상태로, ${trendData.trends[0]}와 같은 최신 트렌드 적용을 통해 선도 기업으로 발전할 수 있습니다.`;
    } else if (score >= 50) {
      return `기본적인 경쟁력을 갖추고 있으나, ${trendData.competitiveFactors.slice(0, 2).join('과 ')} 강화가 필요합니다.`;
    } else {
      return `경쟁력 향상이 시급하며, ${trendData.recommendations.slice(0, 2).join('과 ')} 우선 실행을 권장합니다.`;
    }
  }

  /**
   * 디지털 준비도 조언 생성
   */
  private static getDigitalReadinessAdvice(score: number): string {
    if (score >= 70) {
      return '디지털 전환에 적극적으로 대응하고 있으며, 고도화 단계로 진입할 준비가 되어 있습니다.';
    } else if (score >= 50) {
      return '기본적인 디지털 도구는 활용하고 있으나, 더 체계적인 디지털 전환 전략이 필요합니다.';
    } else {
      return '디지털 전환이 시급하며, 기본적인 디지털 도구 도입부터 단계적으로 접근해야 합니다.';
    }
  }

  /**
   * 맞춤형 추천사항 생성
   */
  private static generateCustomRecommendations(trendData: IndustryTrendData, score: number, companyData: any): string[] {
    const baseRecommendations = [...trendData.recommendations];
    
    // 점수 기반 맞춤 추천
    if (score < 50) {
      baseRecommendations.unshift('기본 역량 강화를 위한 체계적 개선 계획 수립');
    } else if (score >= 70) {
      baseRecommendations.push('혁신 기술 도입을 통한 업계 선도 기업 도약');
    }

    // 성장 단계별 맞춤 추천
    const growthStage = companyData.growthStage;
    if (growthStage === '창업기') {
      baseRecommendations.push('정부 창업 지원사업 적극 활용');
    } else if (growthStage === '성장기') {
      baseRecommendations.push('확장을 위한 시스템 구축 및 인력 확충');
    }

    return baseRecommendations.slice(0, 6); // 상위 6개만 반환
  }

  /**
   * 업종별 벤치마크 점수 생성
   */
  private static generateBenchmarkScores(trendData: IndustryTrendData, currentScore: number): { [key: string]: number } {
    const industryBenchmarks: Record<string, { [key: string]: number }> = {
      'manufacturing': {
        생산효율성: 75,
        품질관리: 80,
        안전관리: 85,
        디지털화: 60,
        환경친화성: 70
      },
      'it': {
        기술혁신: 85,
        시장대응: 80,
        인재확보: 70,
        보안성: 75,
        확장성: 80
      },
      'service': {
        고객만족: 80,
        서비스품질: 75,
        응답속도: 85,
        전문성: 70,
        디지털화: 65
      },
      'retail': {
        고객경험: 80,
        재고관리: 75,
        가격경쟁력: 70,
        접근성: 85,
        디지털전환: 60
      },
      'food': {
        음식품질: 85,
        위생관리: 90,
        서비스: 80,
        분위기: 75,
        가격합리성: 70
      }
    };

    const industryKey = this.normalizeIndustryName(trendData.industry);
    const baseScores = industryBenchmarks[industryKey] || industryBenchmarks['service'];
    
    // 🔥 신청자 점수와 연동하여 동적으로 벤치마크 생성
    const adjustedBenchmarks: { [key: string]: number } = {};
    const scoreAdjustment = (currentScore - 70) / 30; // -1 ~ +1 범위로 정규화
    
    Object.entries(baseScores).forEach(([key, baseValue]) => {
      // 신청자 점수가 높으면 벤치마크도 상향 조정
      // 신청자 점수가 낮으면 벤치마크도 현실적으로 조정
      let adjustedValue = baseValue;
      
      if (currentScore >= 80) {
        // 우수 기업: 업계 상위 수준 벤치마크
        adjustedValue = Math.min(95, baseValue + 10);
      } else if (currentScore >= 60) {
        // 평균 기업: 업계 평균 수준 벤치마크
        adjustedValue = baseValue;
      } else if (currentScore >= 40) {
        // 성장 필요 기업: 달성 가능한 수준의 벤치마크
        adjustedValue = Math.max(50, baseValue - 10);
      } else {
        // 개선 시급 기업: 기초 수준 벤치마크
        adjustedValue = Math.max(40, baseValue - 20);
      }
      
      // 소수점 반올림
      adjustedBenchmarks[key] = Math.round(adjustedValue);
    });
    
    // 신청자의 현재 수준 추가
    adjustedBenchmarks['현재종합점수'] = Math.round(currentScore);
    
    return adjustedBenchmarks;
  }

  /**
   * 일반적인 인사이트 생성 (업종 정보가 없는 경우)
   */
  private static generateGenericInsights(industry: string, companyData: any): IndustrySpecificInsights {
    return {
      overview: `${industry} 업종의 일반적인 시장 동향을 바탕으로 분석했습니다.`,
      currentTrends: ['디지털 전환', '고객 중심 서비스', '지속가능성', '데이터 활용'],
      marketAnalysis: `현재 ${companyData.totalScore || 0}점의 진단 결과를 바탕으로 개선 방향을 제시합니다.`,
      competitiveLandscape: '업종별 특성을 고려한 경쟁력 강화가 필요합니다.',
      growthOpportunities: ['디지털 마케팅 강화', '고객 서비스 개선', '운영 효율성 향상'],
      challenges: ['경쟁 심화', '비용 상승', '인력 부족', '기술 변화 대응'],
      digitalReadiness: '기본적인 디지털 도구 활용부터 체계적으로 접근이 필요합니다.',
      recommendations: ['핵심 역량 강화', '고객 중심 사고', '지속적 학습', '네트워킹 확대'],
      benchmarkScores: {
        일반역량: 70,
        고객서비스: 75,
        운영효율: 70,
        혁신성: 65,
        지속가능성: 68
      }
    };
  }
}

/**
 * 🎯 이교장 스타일 보고서 전용 - V16.0 OLLAMA ULTIMATE 시스템
 * 모든 보고서 생성은 로컬 Ollama GPT-OSS 20B 또는 GAS 연동으로 처리
 */
export function generateLeeKyoJangStyleReport(
  industry: string, 
  companyData: any, 
  diagnosisResult: any
): string {
  // 🚀 신규 이교장 보고서 시스템으로 리다이렉트
  console.log('🔄 이교장 보고서 시스템으로 리다이렉트:', {
    industry,
    companyName: companyData.companyName,
    totalScore: diagnosisResult.totalScore
  });
  
  // Google Apps Script V14.2 ULTIMATE에서 처리하도록 안내
  return `
🎯 이교장의AI역량진단보고서 V14.2 ULTIMATE

${companyData.companyName || '귀사'}의 이교장의 AI역량진단보고서가 생성 중입니다.

📊 진단 점수: ${diagnosisResult.totalScore}점
🏭 업종: ${industry}
📧 이메일 발송: 진행 중

상세한 이교장 스타일 보고서는 V16.0 OLLAMA ULTIMATE 시스템에서 
Ollama GPT-OSS 20B 온디바이스 AI를 통해 생성되어 이메일로 발송됩니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 이메일 발송 완료 후 다음 내용을 받으실 수 있습니다:
• 이교장 스타일 전문 보고서 (HTML 형식)
• SWOT 전략 매트릭스 분석
• 3단계 실행 로드맵
• n8n 기반 자동화 솔루션
• 업종별 벤치마크 분석

📞 문의: 010-9251-9743 (이후경 교장)
🌐 웹사이트: aicamp.club
  `.trim();
}

export default IndustryDataService; 