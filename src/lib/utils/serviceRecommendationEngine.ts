'use client';

export interface MCenterService {
  id: string;
  name: string;
  description: string;
  targetScore: {
    min: number;
    max: number;
  };
  businessStage: string[];
  category: string;
  duration: string;
  benefits: string[];
  curriculum?: string[];
  price?: string;
  priority: number;
}

export interface ServiceRecommendation {
  service: MCenterService;
  reason: string;
  urgency: 'high' | 'medium' | 'low';
  expectedImpact: string;
}

/**
 * AI CAMP 교육 커리큘럼 기반 서비스 데이터베이스
 */
const MCENTER_SERVICES: MCenterService[] = [
  // 기획/전략 트랙
  {
    id: 'ai-planning-basic',
    name: '기획/전략 트랙 AI & n8n 자동화 교육 - 입문',
    description: '생성형 AI를 활용한 기획 보고서, 회의록, KPI 리포트 자동화 교육',
    targetScore: { min: 0, max: 70 },
    businessStage: ['창업기', '성장기', '성숙기'],
    category: 'AI교육',
    duration: '12시간',
    benefits: [
      '시장동향 분석 자동화 구축',
      '보고서 생성 자동화',
      'KPI 요약 자동화',
      '회의록 요약 공유 시스템'
    ],
    curriculum: [
      '생성형AI 개요 및 프롬프트 작성법',
      'n8n 기본 이해 및 실습',
      '뉴스 요약/회의록 자동화',
      'KPI 리포트 자동화'
    ],
    price: '12시간 과정',
    priority: 10
  },
  {
    id: 'ai-planning-advanced',
    name: '기획/전략 트랙 AI & n8n 자동화 교육 - 심화',
    description: '외부 데이터/API 연동 및 고급 자동화 구현',
    targetScore: { min: 70, max: 100 },
    businessStage: ['성장기', '성숙기', '재도약기'],
    category: 'AI교육',
    duration: '12시간',
    benefits: [
      'ChatGPT API 고급 활용',
      '외부 데이터 수집 자동화',
      '전략분석 리포트 자동화',
      'Notion + GPT 전략문서 자동화'
    ],
    curriculum: [
      'n8n 고급 노드 이해',
      'API 연동 및 데이터 수집',
      '조건분기 및 오류처리',
      '실전 프로젝트 구현'
    ],
    price: '12시간 과정',
    priority: 9
  },
  
  // 영업 트랙
  {
    id: 'ai-sales-basic',
    name: '영업 트랙 AI & n8n 자동화 교육 - 입문',
    description: '영업 현장의 반복 업무를 자동화할 수 있는 기반 역량 확보',
    targetScore: { min: 0, max: 70 },
    businessStage: ['창업기', '성장기', '성숙기'],
    category: 'AI교육',
    duration: '12시간',
    benefits: [
      '영업활동 리포트 자동화',
      '고객사별 맞춤 제안서 작성',
      '방문일정 리마인드 자동화',
      '미팅 후 이메일 자동작성'
    ],
    curriculum: [
      '영업 프롬프트 작성 실습',
      '방문일정 자동 리마인드',
      '영업활동 리포트 요약',
      '제안서 문구 자동화'
    ],
    price: '12시간 과정',
    priority: 10
  },
  {
    id: 'ai-sales-advanced',
    name: '영업 트랙 AI & n8n 자동화 교육 - 심화',
    description: '고객응대, 제안, 리포트 등 전반적인 영업업무 자동화 설계',
    targetScore: { min: 70, max: 100 },
    businessStage: ['성장기', '성숙기', '재도약기'],
    category: 'AI교육',
    duration: '12시간',
    benefits: [
      '고객사 정보 자동수집',
      '제안서 자동 초안 생성',
      '영업 KPI 리포트 자동화',
      'CRM 연동 기본'
    ],
    curriculum: [
      'n8n 고급 노드 심화',
      'API/RSS 데이터 수집',
      'GPT 기반 제안서 생성',
      '실무 자동화 설계'
    ],
    price: '12시간 과정',
    priority: 9
  },
  
  // 마케팅 트랙
  {
    id: 'ai-marketing-basic',
    name: '마케팅 트랙 AI & n8n 자동화 교육 - 입문',
    description: '마케팅 콘텐츠와 광고 데이터를 자동으로 처리할 수 있는 기초 역량',
    targetScore: { min: 0, max: 70 },
    businessStage: ['창업기', '성장기', '성숙기'],
    category: 'AI교육',
    duration: '12시간',
    benefits: [
      '광고성과 분석 자동화',
      '캠페인 리포트 요약',
      'SNS 댓글 분석 및 대응 자동화',
      '콘텐츠 요약 및 변환'
    ],
    curriculum: [
      '광고문구 자동생성',
      'Meta/Google Ads 리포트 자동화',
      'SNS 댓글 수집 및 요약',
      '캠페인 리마인드 자동화'
    ],
    price: '12시간 과정',
    priority: 10
  },
  {
    id: 'ai-marketing-advanced',
    name: '마케팅 트랙 AI & n8n 자동화 교육 - 심화',
    description: '광고/콘텐츠 성과리포트, 고객반응 자동분석 고급 워크플로 설계',
    targetScore: { min: 70, max: 100 },
    businessStage: ['성장기', '성숙기', '재도약기'],
    category: 'AI교육',
    duration: '12시간',
    benefits: [
      'Google/Meta Ads API 연동',
      'GPT 활용 카피 A/B 테스트',
      '댓글 및 피드백 감성분석',
      '마케팅 대시보드 자동연동'
    ],
    curriculum: [
      '광고 API 연동 실습',
      '감성분석 자동화',
      '캠페인 성과 추적',
      '실전 설계 프로젝트'
    ],
    price: '12시간 과정',
    priority: 9
  },
  
  // 생산/물류 트랙
  {
    id: 'ai-production-basic',
    name: '생산/물류 트랙 AI & n8n 자동화 교육 - 입문',
    description: '반복적인 생산/물류 관리 업무를 자동화하는 기초 역량 확보',
    targetScore: { min: 0, max: 70 },
    businessStage: ['창업기', '성장기', '성숙기'],
    category: 'AI교육',
    duration: '12시간',
    benefits: [
      '생산일정 리마인드',
      '재고 모니터링 자동화',
      '배송지연 자동 알림',
      '작업일지 자동정리'
    ],
    curriculum: [
      '업무 요약용 프롬프트 실습',
      '재고수량 체크 자동화',
      '생산일정 리마인드',
      '출고/입고 보고서 요약'
    ],
    price: '12시간 과정',
    priority: 10
  },
  {
    id: 'ai-production-advanced',
    name: '생산/물류 트랙 AI & n8n 자동화 교육 - 심화',
    description: '센서/데이터/API 연동 및 품질이상감지, 재고예측 자동화',
    targetScore: { min: 70, max: 100 },
    businessStage: ['성장기', '성숙기', '재도약기'],
    category: 'AI교육',
    duration: '12시간',
    benefits: [
      '재고 이상감지 자동화',
      '품질점검 보고서 자동생성',
      '센서/IoT 데이터 연동',
      '공급망 관리 알림 흐름'
    ],
    curriculum: [
      'n8n 고급 노드 실습',
      'IoT 데이터 연동 설계',
      '품질 이상감지 시스템',
      '현장 기반 자동화 설계'
    ],
    price: '12시간 과정',
    priority: 9
  },
  
  // 고객지원(CS) 트랙
  {
    id: 'ai-cs-basic',
    name: '고객지원(CS) 트랙 AI & n8n 자동화 교육 - 입문',
    description: '반복응대, 민원처리, 보고업무를 자동화할 수 있는 기초능력',
    targetScore: { min: 0, max: 70 },
    businessStage: ['창업기', '성장기', '성숙기'],
    category: 'AI교육',
    duration: '12시간',
    benefits: [
      '고객문의 자동 분류/요약',
      'FAQ 자동응답',
      '응대품질 분석 자동화',
      'VOC 수집 및 정리'
    ],
    curriculum: [
      '응대 메시지 자동생성',
      '민원 텍스트 요약',
      'FAQ 자동화 실습',
      'VOC 유형 분류'
    ],
    price: '12시간 과정',
    priority: 10
  },
  {
    id: 'ai-cs-advanced',
    name: '고객지원(CS) 트랙 AI & n8n 자동화 교육 - 심화',
    description: '고객응대 데이터분석, 응답품질평가, 피드백시스템 자동화',
    targetScore: { min: 70, max: 100 },
    businessStage: ['성장기', '성숙기', '재도약기'],
    category: 'AI교육',
    duration: '12시간',
    benefits: [
      '다채널 고객문의 통합 자동화',
      '고객발언 감정분석 자동화',
      '응대품질 평가시스템 설계',
      '리포트 자동요약 시스템'
    ],
    curriculum: [
      '멀티채널 통합 대응',
      'GPT + 감성분석 API',
      '응대품질 자동평가',
      'VOC 패턴분석'
    ],
    price: '12시간 과정',
    priority: 9
  },
  
  // 인사/총무 트랙
  {
    id: 'ai-hr-basic',
    name: '인사/총무 트랙 AI & n8n 자동화 교육 - 입문',
    description: '채용/사내관리/문서정리를 자동화하는 기초 역량 습득',
    targetScore: { min: 0, max: 70 },
    businessStage: ['창업기', '성장기', '성숙기'],
    category: 'AI교육',
    duration: '12시간',
    benefits: [
      '직원만족도 조사 요약',
      '채용공고 자동 생성',
      '입사자 온보딩 안내 자동화',
      '휴가신청서 정리 자동화'
    ],
    curriculum: [
      '이력서 요약 프롬프트',
      '채용공고 자동생성',
      '온보딩 안내 자동화',
      '만족도 설문 자동화'
    ],
    price: '12시간 과정',
    priority: 10
  },
  {
    id: 'ai-hr-advanced',
    name: '인사/총무 트랙 AI & n8n 자동화 교육 - 심화',
    description: '평가, 만족도, 복무데이터 처리 자동화 설계',
    targetScore: { min: 70, max: 100 },
    businessStage: ['성장기', '성숙기', '재도약기'],
    category: 'AI교육',
    duration: '12시간',
    benefits: [
      '사내알림 자동화 시스템',
      '피드백 수집 및 요약 자동화',
      '사내문서 검색/요약 시스템',
      'HR 지표 자동 리포트'
    ],
    curriculum: [
      'GPT API 커스터마이징',
      '사내 챗봇 설계',
      '입퇴사 프로세스 자동화',
      'HR 대시보드 구축'
    ],
    price: '12시간 과정',
    priority: 9
  },
  
  // 재무/회계 트랙
  {
    id: 'ai-finance-basic',
    name: '재무/회계 트랙 AI & n8n 자동화 교육 - 입문',
    description: '전표·보고·비용정리 업무를 AI와 자동화 툴로 간소화',
    targetScore: { min: 0, max: 70 },
    businessStage: ['창업기', '성장기', '성숙기'],
    category: 'AI교육',
    duration: '12시간',
    benefits: [
      '비용정산 자동화',
      '세금계산서 요약',
      '월별 지출분석 자동 보고서화',
      '부서별 예산 자동리포트'
    ],
    curriculum: [
      '숫자기반 요약 프롬프트',
      '세금계산서 요약 자동화',
      '월간지출 정리 자동화',
      '예산 경고알림 설정'
    ],
    price: '12시간 과정',
    priority: 10
  },
  {
    id: 'ai-finance-advanced',
    name: '재무/회계 트랙 AI & n8n 자동화 교육 - 심화',
    description: '실적/예산 관련 보고서 자동화 및 재무지표 기반 경고시스템',
    targetScore: { min: 70, max: 100 },
    businessStage: ['성장기', '성숙기', '재도약기'],
    category: 'AI교육',
    duration: '12시간',
    benefits: [
      '실적요약 자동 보고서 작성',
      '부서별 예산 실시간 비교',
      'GPT 기반 지표해석 문구생성',
      '비용흐름 이상감지'
    ],
    curriculum: [
      '고급 n8n 구성 실습',
      '승인기반 보고 흐름',
      '회계감사 대응 자동화',
      '재무 대시보드 구축'
    ],
    price: '12시간 과정',
    priority: 9
  },
  
  // 기존 서비스들도 유지
  {
    id: 'diagnosis',
    name: '정밀 경영진단',
    description: 'AI 기반 경영 전반 정밀 진단 및 개선방안 도출',
    targetScore: { min: 0, max: 60 },
    businessStage: ['창업기', '성장기', '성숙기', '재도약기'],
    category: '경영진단',
    duration: '4주',
    benefits: [
      '경영 전 영역 정밀 분석',
      'AI 기반 문제점 진단',
      '맞춤형 개선방안 제시',
      '실행 로드맵 수립'
    ],
    priority: 8
  },
  {
    id: 'policy-funding',
    name: '정책자금 컨설팅',
    description: '정부지원사업 매칭 및 신청 전략 수립',
    targetScore: { min: 40, max: 80 },
    businessStage: ['성장기', '성숙기'],
    category: '자금지원',
    duration: '2-3개월',
    benefits: [
      '맞춤형 정책자금 매칭',
      '신청서 작성 지원',
      '사업계획서 고도화',
      '심사 대응 전략'
    ],
    priority: 7
  }
];

/**
 * 서비스 추천 엔진
 */
export class ServiceRecommendationEngine {
  /**
   * 진단 결과 기반 맞춤 서비스 추천
   */
  static getRecommendations(
    totalScore: number,
    businessStage: string,
    weaknesses: string[],
    industry: string
  ): ServiceRecommendation[] {
    const recommendations: ServiceRecommendation[] = [];
    
    // 업종별 우선 추천 트랙 매핑
    const industryTrackMapping: Record<string, string[]> = {
      '제조업': ['ai-production-', 'ai-planning-'],
      'IT': ['ai-planning-', 'ai-sales-'],
      '서비스업': ['ai-cs-', 'ai-marketing-'],
      '소매업': ['ai-sales-', 'ai-marketing-'],
      '외식업': ['ai-cs-', 'ai-marketing-'],
      '금융': ['ai-finance-', 'ai-cs-'],
      '의료': ['ai-cs-', 'ai-hr-'],
      '교육': ['ai-hr-', 'ai-marketing-']
    };
    
    // 점수에 따른 과정 레벨 결정
    const courseLevel = totalScore >= 70 ? 'advanced' : 'basic';
    
    // 업종별 우선 추천 트랙 찾기
    const priorityTracks = industryTrackMapping[industry] || ['ai-planning-', 'ai-sales-'];
    
    // 서비스 필터링 및 추천
    MCENTER_SERVICES.forEach(service => {
      // 점수 범위 확인
      if (totalScore >= service.targetScore.min && totalScore <= service.targetScore.max) {
        // 사업 단계 확인
        if (service.businessStage.includes(businessStage)) {
          let urgency: 'high' | 'medium' | 'low' = 'medium';
          let reason = '';
          let expectedImpact = '';
          
          // 업종별 우선 트랙인지 확인
          const isPriorityTrack = priorityTracks.some(track => 
            service.id.includes(track) && service.id.includes(courseLevel)
          );
          
          if (isPriorityTrack) {
            urgency = 'high';
            reason = `${industry} 업종에 최적화된 AI 자동화 교육으로 즉시 실무 적용 가능`;
            expectedImpact = '3개월 내 업무 효율 70% 향상, ROI 300% 달성 예상';
          } else if (service.category === 'AI교육') {
            // 약점 기반 추천
            if (weaknesses.includes('디지털화') && service.id.includes('basic')) {
              urgency = 'high';
              reason = 'AI/디지털 전환 기초 역량 구축이 시급함';
              expectedImpact = '디지털 역량 강화로 경쟁력 확보';
            } else if (weaknesses.includes('마케팅') && service.id.includes('marketing')) {
              urgency = 'high';
              reason = '마케팅 자동화를 통한 고객 확보 전략 필요';
              expectedImpact = '마케팅 ROI 200% 향상';
            } else if (weaknesses.includes('운영') && service.id.includes('production')) {
              urgency = 'high';
              reason = '운영 효율화를 위한 자동화 시스템 구축 필요';
              expectedImpact = '운영 비용 30% 절감';
            } else {
              reason = `${service.name.split(' ')[0]} 부서의 AI 역량 강화 필요`;
              expectedImpact = '업무 자동화로 생산성 향상';
            }
          } else {
            // 기존 서비스 추천 로직
            if (totalScore < 50 && service.id === 'diagnosis') {
              urgency = 'high';
              reason = '낮은 경영 점수로 정밀 진단이 시급함';
              expectedImpact = '문제점 파악 및 개선 방향 설정';
            } else if (service.id === 'policy-funding') {
              urgency = 'medium';
              reason = '성장을 위한 자금 확보 전략 필요';
              expectedImpact = '정부 지원금으로 투자 부담 완화';
            }
          }
          
          if (reason) {
            recommendations.push({
              service,
              reason,
              urgency,
              expectedImpact
            });
          }
        }
      }
    });
    
    // 우선순위 및 긴급도로 정렬
    return recommendations.sort((a, b) => {
      const urgencyOrder = { high: 0, medium: 1, low: 2 };
      if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
        return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
      }
      return b.service.priority - a.service.priority;
    });
  }
  
  /**
   * 서비스별 실행 계획 생성
   */
  static generateActionPlan(recommendation: ServiceRecommendation): string[] {
    const { service } = recommendation;
    
    if (service.category === 'AI교육') {
      const trackType = service.id.includes('basic') ? '입문' : '심화';
      return [
        `1. 부서별 교육 대상자 선정 (${service.target || '해당 부서 전원'})`,
        `2. ${trackType} 과정 일정 조율 및 확정`,
        `3. 사전 과제 및 준비사항 안내`,
        `4. ${service.duration} 집중 교육 진행`,
        `5. 실습 프로젝트 수행 및 피드백`,
        `6. 현업 적용 및 성과 모니터링`
      ];
    } else if (service.id === 'diagnosis') {
      return [
        '1. 경영진단 킥오프 미팅',
        '2. 데이터 수집 및 현황 분석',
        '3. AI 기반 진단 및 인사이트 도출',
        '4. 개선방안 수립 및 검토',
        '5. 최종 보고서 작성 및 발표'
      ];
    } else if (service.id === 'policy-funding') {
      return [
        '1. 기업 현황 및 자금 수요 분석',
        '2. 적합한 정책자금 탐색 및 매칭',
        '3. 신청 전략 수립',
        '4. 사업계획서 작성 지원',
        '5. 신청 및 심사 대응'
      ];
    }
    
    return ['1. 상세 상담 진행', '2. 맞춤형 계획 수립', '3. 단계별 실행'];
  }
}

// MCENTER_SERVICES export 추가
export { MCENTER_SERVICES };

// GovernmentSupportReportGenerator 클래스 추가
export class GovernmentSupportReportGenerator {
  static generateReport(data: any): any {
    const recommendations = ServiceRecommendationEngine.recommend(data);
    
    return {
      companyName: data.companyName,
      industry: data.industry,
      recommendations: recommendations.map(rec => ({
        primaryService: rec.service,
        reason: rec.reason,
        urgency: rec.urgency,
        expectedImpact: rec.expectedImpact,
        reasons: [rec.reason], // reasons 배열로 제공
        secondaryServices: [], // 빈 배열로 초기화
        actionPlan: {
          phase1: {
            period: '1-3개월',
            tasks: ['기초 진단', '계획 수립'],
            milestone: '기반 구축 완료'
          },
          phase2: {
            period: '4-6개월',
            tasks: ['본격 실행', '중간 점검'],
            milestone: '핵심 성과 달성'
          },
          phase3: {
            period: '7-12개월',
            tasks: ['고도화', '확산'],
            milestone: '전사 정착 완료'
          }
        }
      })),
      totalScore: 85,
      grade: 'B+',
      summary: '정부지원 프로그램을 통한 AI 도입으로 경쟁력 강화 가능'
    };
  }

  static recommendForGovernmentSupport(data: any): any {
    return this.generateReport(data);
  }
} 