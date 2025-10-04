/**
 * AICAMP 커리큘럼 상세 데이터베이스
 * 이교장의 28년 경험을 바탕으로 한 체계적인 AI 교육 과정
 */

export interface CurriculumCourse {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  price: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  targetAudience: string[];
  objectives: string[];
  curriculum: {
    module: string;
    topics: string[];
    duration: string;
  }[];
  outcomes: string[];
  roi: string;
  successCases: string[];
  prerequisites: string[];
  certification: string;
  instructor: string;
  format: string;
  schedule: string;
  materials: string[];
}

export const AICAMP_CURRICULUM_DATABASE: Record<string, CurriculumCourse> = {
  // 1. 기초 과정
  chatgpt_basics: {
    id: 'chatgpt_basics',
    title: 'ChatGPT & Claude 업무 활용 마스터',
    subtitle: '28년 현장 경험으로 검증된 실무 중심 AI 활용법',
    duration: '8시간 (2일 과정)',
    price: '50만원 (정부지원 시 무료)',
    level: 'beginner',
    targetAudience: [
      '사무직 직장인 (기획, 마케팅, 영업, 인사)',
      'AI 초보자 및 디지털 전환 담당자',
      '중소기업 경영진 및 팀장급',
      '프리랜서 및 1인 기업 대표'
    ],
    objectives: [
      '업무 생산성 300% 향상을 위한 프롬프트 엔지니어링 마스터',
      '일일 2-3시간 업무 시간 단축 실현',
      '문서 작성, 기획서, 보고서 자동화 구현',
      'ChatGPT와 Claude의 차이점 이해 및 상황별 활용법'
    ],
    curriculum: [
      {
        module: '1모듈: AI 도구 기초 이해',
        topics: [
          'ChatGPT vs Claude vs Gemini 비교 분석',
          '각 AI별 강점과 약점 파악',
          '업무별 최적 AI 도구 선택법',
          '프롬프트 엔지니어링 기초 원리'
        ],
        duration: '2시간'
      },
      {
        module: '2모듈: 실무 프롬프트 템플릿',
        topics: [
          '이메일 작성 자동화 (고객 응대, 제안서, 보고)',
          '기획서 및 제안서 구조화 프롬프트',
          '회의록 정리 및 액션 아이템 추출',
          '마케팅 콘텐츠 생성 (블로그, SNS, 광고 카피)'
        ],
        duration: '3시간'
      },
      {
        module: '3모듈: 고급 활용 기법',
        topics: [
          '롤플레이 프롬프트로 전문가 조언 받기',
          '체인 오브 쏘트(Chain of Thought) 기법',
          '퓨샷 러닝(Few-shot Learning) 활용법',
          'AI와의 대화 최적화 전략'
        ],
        duration: '2시간'
      },
      {
        module: '4모듈: 실전 프로젝트',
        topics: [
          '개인별 업무 프로세스 AI 적용 설계',
          '팀 단위 AI 도입 계획 수립',
          '성과 측정 지표 설정',
          '지속적 개선 방안 마련'
        ],
        duration: '1시간'
      }
    ],
    outcomes: [
      '일일 업무 시간 2-3시간 단축',
      '문서 작성 속도 500% 향상',
      '창의적 아이디어 생성 능력 300% 증대',
      '반복 업무 80% 자동화 달성'
    ],
    roi: '투자 대비 300% 수익률 (3개월 내 회수)',
    successCases: [
      '제조업 A사: 보고서 작성 시간 70% 단축',
      '마케팅 B팀: 콘텐츠 생산량 400% 증가',
      '영업 C부서: 제안서 품질 향상으로 수주율 25% 상승'
    ],
    prerequisites: ['컴퓨터 기본 사용법', '인터넷 브라우저 사용 가능'],
    certification: 'AICAMP 인증 수료증 발급',
    instructor: '이후경 교장 (28년 현장 경험)',
    format: '대면 교육 + 온라인 실습',
    schedule: '주 1회 4시간씩 2주 과정',
    materials: ['실습용 프롬프트 템플릿 100개', '업무별 체크리스트', '사후 지원 3개월']
  },

  // 2. 심화 과정
  n8n_automation: {
    id: 'n8n_automation',
    title: 'n8n & Make 업무 자동화 전문가',
    subtitle: '코딩 없이 구현하는 스마트 워크플로우',
    duration: '16시간 (4일 과정)',
    price: '120만원 (정부지원 시 20만원)',
    level: 'intermediate',
    targetAudience: [
      '업무 효율화 담당자',
      'IT 부서 및 시스템 관리자',
      '반복 업무가 많은 모든 직군',
      '스타트업 및 중소기업 경영진'
    ],
    objectives: [
      '업무 자동화율 90% 달성',
      '월 100시간 이상 업무 시간 절약',
      '500개 이상 서비스 연동 마스터',
      '무코드 자동화 시스템 구축 능력 확보'
    ],
    curriculum: [
      {
        module: '1모듈: 자동화 기초 설계',
        topics: [
          'n8n vs Make vs Zapier 비교 분석',
          '업무 프로세스 분석 및 자동화 포인트 발굴',
          '자동화 ROI 계산 및 우선순위 설정',
          '기본 워크플로우 설계 원칙'
        ],
        duration: '4시간'
      },
      {
        module: '2모듈: 핵심 연동 시스템',
        topics: [
          'Google Workspace 완전 자동화',
          'Slack, Teams 메신저 자동화',
          'CRM 시스템 (세일즈포스, HubSpot) 연동',
          '이메일 마케팅 자동화 (MailChimp, 스티비)'
        ],
        duration: '4시간'
      },
      {
        module: '3모듈: 고급 자동화 구현',
        topics: [
          'AI 기반 데이터 처리 자동화',
          '조건부 분기 및 복잡한 로직 구현',
          '오류 처리 및 예외 상황 대응',
          'API 연동 및 커스텀 웹훅 활용'
        ],
        duration: '4시간'
      },
      {
        module: '4모듈: 실전 프로젝트',
        topics: [
          '개인별 맞춤 자동화 시스템 구축',
          '팀 단위 워크플로우 설계 및 구현',
          '성과 모니터링 대시보드 구축',
          '유지보수 및 확장 계획 수립'
        ],
        duration: '4시간'
      }
    ],
    outcomes: [
      '월 100시간 이상 업무 시간 절약',
      '반복 업무 90% 자동화 달성',
      '데이터 처리 속도 1000% 향상',
      '인적 오류 95% 감소'
    ],
    roi: '투자 대비 500% 수익률 (6개월 내 회수)',
    successCases: [
      '물류업 D사: 주문 처리 자동화로 인력 50% 절감',
      '서비스업 E사: 고객 응대 자동화로 만족도 40% 상승',
      '제조업 F사: 재고 관리 자동화로 비용 30% 절감'
    ],
    prerequisites: ['ChatGPT 기초 과정 수료 또는 동등 수준'],
    certification: 'n8n 전문가 인증서 + AICAMP 수료증',
    instructor: '이후경 교장 + 자동화 전문가',
    format: '실습 중심 워크샵',
    schedule: '주 2회 4시간씩 2주 과정',
    materials: ['자동화 템플릿 50개', '연동 가이드북', '평생 기술 지원']
  },

  // 3. 경영진 과정
  ai_leadership: {
    id: 'ai_leadership',
    title: 'AI 리더십 & 디지털 전환 전략',
    subtitle: '경영진을 위한 AI 시대 생존 전략',
    duration: '12시간 (3일 과정)',
    price: '200만원 (1:1 맞춤 컨설팅 포함)',
    level: 'expert',
    targetAudience: [
      'CEO, 임원진',
      '부서장 및 팀장급 관리자',
      'AI 도입 의사결정권자',
      '디지털 전환 책임자'
    ],
    objectives: [
      'AI 시대 경영 전략 수립 능력 확보',
      '조직 전체 AI 도입 로드맵 설계',
      'AI 투자 ROI 극대화 방안 마스터',
      '변화 관리 및 조직 문화 혁신 리더십'
    ],
    curriculum: [
      {
        module: '1모듈: AI 경영 전략',
        topics: [
          'AI 시대 비즈니스 모델 혁신 사례',
          '업종별 AI 도입 성공/실패 분석',
          'AI 투자 우선순위 및 예산 배분 전략',
          '경쟁사 대비 AI 경쟁력 분석 프레임워크'
        ],
        duration: '4시간'
      },
      {
        module: '2모듈: 조직 변화 관리',
        topics: [
          'AI 도입 시 조직 저항 극복 방안',
          '직원 재교육 및 역량 개발 계획',
          'AI 윤리 및 리스크 관리 체계',
          '성과 측정 및 KPI 설정 방법론'
        ],
        duration: '4시간'
      },
      {
        module: '3모듈: 실행 계획 수립',
        topics: [
          '개별 기업 맞춤 AI 도입 로드맵',
          '단계별 실행 계획 및 마일스톤',
          '예산 계획 및 ROI 시뮬레이션',
          '리스크 관리 및 contingency plan'
        ],
        duration: '4시간'
      }
    ],
    outcomes: [
      '전사 AI 도입 전략 완성',
      '3년 로드맵 및 실행 계획 수립',
      'AI 투자 ROI 800% 달성 방안',
      '조직 문화 혁신 리더십 확보'
    ],
    roi: '투자 대비 800% 수익률 (1년 내 회수)',
    successCases: [
      '제조업 G사: AI 도입으로 매출 50% 증가',
      '서비스업 H사: 운영비 40% 절감 달성',
      '유통업 I사: 고객 만족도 60% 향상'
    ],
    prerequisites: ['경영진 또는 관리자급 이상'],
    certification: 'AI 리더십 전문가 인증 + 개별 컨설팅 리포트',
    instructor: '이후경 교장 (1:1 멘토링 포함)',
    format: '소규모 그룹 (최대 8명) + 개별 컨설팅',
    schedule: '집중 과정 (3일 연속) 또는 주 1회',
    materials: ['전략 수립 템플릿', '벤치마킹 리포트', '6개월 사후 컨설팅']
  },

  // 4. 업종별 특화 과정
  manufacturing_ai: {
    id: 'manufacturing_ai',
    title: '제조업 특화 AI 스마트팩토리',
    subtitle: '생산성 혁신을 위한 제조업 맞춤 AI 솔루션',
    duration: '20시간 (5일 과정)',
    price: '150만원 (정부지원 가능)',
    level: 'advanced',
    targetAudience: [
      '제조업 생산관리자',
      '품질관리 담당자',
      '공장장 및 현장 관리자',
      '제조업 IT 담당자'
    ],
    objectives: [
      '스마트팩토리 구축 로드맵 완성',
      '생산 효율성 40% 향상 달성',
      '품질 불량률 80% 감소 실현',
      'AI 기반 예측 정비 시스템 구축'
    ],
    curriculum: [
      {
        module: '1모듈: 제조업 AI 기초',
        topics: [
          '제조업 AI 도입 트렌드 및 사례',
          'IoT 센서 데이터 활용 방안',
          '생산 데이터 분석 및 시각화',
          'AI 기반 품질 관리 시스템'
        ],
        duration: '4시간'
      },
      {
        module: '2모듈: 예측 분석 시스템',
        topics: [
          '설비 고장 예측 모델 구축',
          '수요 예측 및 생산 계획 최적화',
          '재고 관리 AI 시스템',
          '에너지 효율 최적화 AI'
        ],
        duration: '4시간'
      },
      {
        module: '3모듈: 자동화 시스템',
        topics: [
          '생산 라인 자동화 설계',
          '로봇 프로세스 자동화 (RPA)',
          '품질 검사 자동화 시스템',
          '물류 및 창고 관리 자동화'
        ],
        duration: '4시간'
      },
      {
        module: '4모듈: 통합 관리 시스템',
        topics: [
          'MES/ERP 시스템 AI 연동',
          '실시간 모니터링 대시보드',
          '성과 측정 및 KPI 관리',
          '지속적 개선 체계 구축'
        ],
        duration: '4시간'
      },
      {
        module: '5모듈: 실전 프로젝트',
        topics: [
          '개별 공장 맞춤 AI 시스템 설계',
          'ROI 계산 및 투자 계획',
          '단계별 도입 로드맵',
          '리스크 관리 및 대응 방안'
        ],
        duration: '4시간'
      }
    ],
    outcomes: [
      '생산 효율성 40% 향상',
      '품질 불량률 80% 감소',
      '설비 가동률 95% 이상 달성',
      '운영비 30% 절감'
    ],
    roi: '투자 대비 400% 수익률 (1년 내 회수)',
    successCases: [
      '자동차 부품 J사: 불량률 90% 감소',
      '전자제품 K사: 생산성 60% 향상',
      '화학 L사: 에너지 비용 25% 절감'
    ],
    prerequisites: ['제조업 3년 이상 경험', '기본 IT 지식'],
    certification: '스마트팩토리 전문가 인증',
    instructor: '이후경 교장 + 제조업 AI 전문가',
    format: '현장 실습 + 이론 교육',
    schedule: '주 1회 4시간씩 5주 과정',
    materials: ['스마트팩토리 구축 가이드', '설비 연동 매뉴얼', '1년 기술 지원']
  }
};

/**
 * 커리큘럼 검색 및 추천 시스템
 */
export class CurriculumRecommendationEngine {
  /**
   * 키워드로 관련 커리큘럼 찾기
   */
  static findByKeywords(keywords: string[]): CurriculumCourse[] {
    const results: { course: CurriculumCourse; score: number }[] = [];
    
    for (const course of Object.values(AICAMP_CURRICULUM_DATABASE)) {
      let score = 0;
      
      keywords.forEach(keyword => {
        const lowerKeyword = keyword.toLowerCase();
        
        // 제목 매칭 (높은 점수)
        if (course.title.toLowerCase().includes(lowerKeyword)) score += 10;
        if (course.subtitle.toLowerCase().includes(lowerKeyword)) score += 8;
        
        // 대상자 매칭
        course.targetAudience.forEach(audience => {
          if (audience.toLowerCase().includes(lowerKeyword)) score += 6;
        });
        
        // 목표 매칭
        course.objectives.forEach(objective => {
          if (objective.toLowerCase().includes(lowerKeyword)) score += 4;
        });
        
        // 커리큘럼 내용 매칭
        course.curriculum.forEach(module => {
          if (module.module.toLowerCase().includes(lowerKeyword)) score += 3;
          module.topics.forEach(topic => {
            if (topic.toLowerCase().includes(lowerKeyword)) score += 2;
          });
        });
      });
      
      if (score > 0) {
        results.push({ course, score });
      }
    }
    
    return results
      .sort((a, b) => b.score - a.score)
      .map(result => result.course);
  }
  
  /**
   * 레벨별 커리큘럼 추천
   */
  static getByLevel(level: 'beginner' | 'intermediate' | 'advanced' | 'expert'): CurriculumCourse[] {
    return Object.values(AICAMP_CURRICULUM_DATABASE)
      .filter(course => course.level === level);
  }
  
  /**
   * 가격대별 커리큘럼 추천
   */
  static getByPriceRange(maxPrice: number): CurriculumCourse[] {
    return Object.values(AICAMP_CURRICULUM_DATABASE)
      .filter(course => {
        const price = parseInt(course.price.replace(/[^0-9]/g, ''));
        return price <= maxPrice;
      });
  }
  
  /**
   * 맞춤형 커리큘럼 추천
   */
  static getRecommendations(userProfile: {
    role?: string;
    industry?: string;
    experience?: string;
    budget?: number;
    goals?: string[];
  }): CurriculumCourse[] {
    const keywords: string[] = [];
    
    if (userProfile.role) keywords.push(userProfile.role);
    if (userProfile.industry) keywords.push(userProfile.industry);
    if (userProfile.goals) keywords.push(...userProfile.goals);
    
    let recommendations = this.findByKeywords(keywords);
    
    // 예산 필터링
    if (userProfile.budget) {
      recommendations = recommendations.filter(course => {
        const price = parseInt(course.price.replace(/[^0-9]/g, ''));
        return price <= userProfile.budget!;
      });
    }
    
    return recommendations.slice(0, 3); // 상위 3개 추천
  }
}
