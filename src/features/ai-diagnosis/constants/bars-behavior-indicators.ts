/**
 * 🎯 BARS (Behaviorally Anchored Rating Scales) 행동지표 시스템
 * 45개 질문에 대한 구체적이고 측정 가능한 행동 기준 제공
 * 
 * @description 각 질문별로 1-5점 척도에 대응하는 구체적인 행동 사례와 기준을 제공
 * @version 1.0
 * @created 2024-12-15
 */

import { RealQuestion, REAL_45_QUESTIONS } from './real-45-questions';

export interface BARSIndicator {
  questionId: number;
  category: string;
  question: string;
  behaviorAnchors: {
    score: number;
    level: string;
    behaviorDescription: string;
    specificExamples: string[];
    measurableCriteria: string[];
    businessImpact: string;
  }[];
}

/**
 * BARS 행동지표 데이터
 * 각 질문별로 5점 척도에 대응하는 구체적인 행동 기준 제공
 */
export const BARS_BEHAVIOR_INDICATORS: BARSIndicator[] = [
  // Q1: 사업 모델 명확성
  {
    questionId: 1,
    category: 'businessFoundation',
    question: '우리 회사의 핵심 사업 모델과 수익 구조가 명확합니까?',
    behaviorAnchors: [
      {
        score: 5,
        level: '매우 우수',
        behaviorDescription: '비즈니스 모델이 완전히 체계화되어 있고 모든 구성원이 명확히 이해하고 있음',
        specificExamples: [
          '비즈니스 모델 캔버스가 완성되어 있고 정기적으로 업데이트됨',
          '가치 제안, 고객 세그먼트, 수익원이 명확히 정의됨',
          '전 직원이 회사의 사업 모델을 설명할 수 있음',
          '투자자나 파트너에게 명확한 사업 설명이 가능함'
        ],
        measurableCriteria: [
          '사업계획서 완성도 95% 이상',
          '직원 사업모델 이해도 설문 4.5점 이상',
          '수익원별 기여도 정확히 측정됨',
          '분기별 사업모델 리뷰 실시'
        ],
        businessImpact: '명확한 방향성으로 의사결정 속도 50% 향상, 투자 유치 성공률 증가'
      },
      {
        score: 4,
        level: '우수',
        behaviorDescription: '사업 모델의 핵심 요소들이 잘 정의되어 있고 대부분의 구성원이 이해하고 있음',
        specificExamples: [
          '주요 사업 영역과 수익원이 명확함',
          '고객 가치 제안이 구체적으로 정의됨',
          '경영진과 팀장급이 사업 모델을 명확히 설명 가능',
          '사업 전략과 실행 계획이 연계됨'
        ],
        measurableCriteria: [
          '사업계획서 완성도 80% 이상',
          '관리자급 사업모델 이해도 4.0점 이상',
          '주요 수익원 3개 이상 식별됨',
          '반기별 사업 리뷰 실시'
        ],
        businessImpact: '사업 효율성 30% 향상, 신규 사업 기회 발굴 증가'
      },
      {
        score: 3,
        level: '보통',
        behaviorDescription: '기본적인 사업 모델은 있으나 일부 요소가 불명확하거나 구성원 이해도가 제한적',
        specificExamples: [
          '주요 사업 영역은 정의되어 있으나 세부 전략이 모호함',
          '수익 구조가 단순하거나 다각화가 부족함',
          '일부 구성원만 사업 모델을 이해함',
          '사업 계획과 실행 간 괴리가 존재함'
        ],
        measurableCriteria: [
          '사업계획서 완성도 60% 수준',
          '전체 직원 사업모델 이해도 3.0점 수준',
          '주요 수익원 1-2개 정도',
          '연간 사업 리뷰 실시'
        ],
        businessImpact: '사업 모델 개선으로 수익성 20% 향상 가능'
      },
      {
        score: 2,
        level: '개선 필요',
        behaviorDescription: '사업 모델의 일부 요소만 정의되어 있고 전체적인 체계성과 명확성이 부족함',
        specificExamples: [
          '사업 영역이 모호하거나 너무 광범위함',
          '수익원이 불안정하거나 예측하기 어려움',
          '구성원들이 회사의 사업 방향을 잘 모름',
          '경쟁 우위나 차별화 요소가 불분명함'
        ],
        measurableCriteria: [
          '사업계획서 완성도 40% 미만',
          '직원 사업모델 이해도 2.5점 미만',
          '수익원 의존도가 특정 영역에 집중됨',
          '사업 리뷰가 비정기적이거나 부재'
        ],
        businessImpact: '체계적 사업 모델 수립으로 방향성 확립 필요'
      },
      {
        score: 1,
        level: '매우 부족',
        behaviorDescription: '사업 모델이 체계적으로 정의되지 않았고 구성원들의 이해도가 매우 낮음',
        specificExamples: [
          '사업 영역과 목표가 명확하지 않음',
          '수익 구조를 정확히 파악하기 어려움',
          '대부분의 구성원이 회사의 사업을 설명하지 못함',
          '즉흥적이고 일관성 없는 사업 운영'
        ],
        measurableCriteria: [
          '사업계획서가 없거나 매우 미흡함',
          '직원 사업모델 이해도 2.0점 미만',
          '수익원이 불분명하거나 불안정함',
          '사업 리뷰 체계가 전혀 없음'
        ],
        businessImpact: '사업 모델 전면 재구축을 통한 경쟁력 확보 시급'
      }
    ]
  },

  // Q2: 경쟁 우위 차별화
  {
    questionId: 2,
    category: 'businessFoundation',
    question: '경쟁 우위를 뒷받침하는 차별화 요소가 있습니까?',
    behaviorAnchors: [
      {
        score: 5,
        level: '매우 우수',
        behaviorDescription: '명확하고 지속 가능한 경쟁 우위를 보유하고 있으며 이를 체계적으로 관리하고 있음',
        specificExamples: [
          '독특한 기술, 특허, 또는 노하우를 보유함',
          '브랜드 파워나 고객 충성도가 매우 높음',
          '경쟁사가 쉽게 모방할 수 없는 핵심 역량 보유',
          '차별화 요소를 지속적으로 강화하는 투자와 노력'
        ],
        measurableCriteria: [
          '시장 점유율 상위 3위 이내',
          '고객 만족도 4.5점 이상',
          '특허나 독점 기술 3개 이상 보유',
          '브랜드 인지도 업계 평균 대비 150% 이상'
        ],
        businessImpact: '프리미엄 가격 책정 가능, 고객 유지율 90% 이상'
      },
      {
        score: 4,
        level: '우수',
        behaviorDescription: '여러 차별화 요소를 보유하고 있으며 경쟁사 대비 우위를 유지하고 있음',
        specificExamples: [
          '품질, 서비스, 가격 중 2개 이상 영역에서 우위',
          '고객이 인정하는 독특한 가치 제공',
          '경쟁사 대비 명확한 강점 영역 보유',
          '차별화 전략이 실행 계획에 반영됨'
        ],
        measurableCriteria: [
          '시장 점유율 상위 5위 이내',
          '고객 만족도 4.0점 이상',
          '핵심 역량 영역 2개 이상',
          '경쟁사 대비 우위 지표 3개 이상'
        ],
        businessImpact: '안정적 수익성 확보, 고객 유지율 80% 이상'
      },
      {
        score: 3,
        level: '보통',
        behaviorDescription: '일부 차별화 요소는 있으나 경쟁 우위가 명확하지 않거나 지속성이 의문시됨',
        specificExamples: [
          '특정 영역에서만 경쟁력을 보유함',
          '차별화 요소가 있으나 고객 인지도가 낮음',
          '경쟁사와 비슷한 수준의 제품/서비스 제공',
          '차별화 전략이 있으나 실행력이 부족함'
        ],
        measurableCriteria: [
          '시장 점유율 중위권 수준',
          '고객 만족도 3.5점 수준',
          '핵심 역량 영역 1개 정도',
          '경쟁사와 유사한 성과 지표'
        ],
        businessImpact: '차별화 강화로 시장 지위 향상 가능'
      },
      {
        score: 2,
        level: '개선 필요',
        behaviorDescription: '차별화 요소가 미약하거나 경쟁사 대비 뚜렷한 우위를 찾기 어려움',
        specificExamples: [
          '경쟁사와 유사한 제품/서비스만 제공',
          '가격 경쟁에만 의존하는 경향',
          '고객이 인식하는 차별점이 부족함',
          '모방하기 쉬운 수준의 차별화만 존재'
        ],
        measurableCriteria: [
          '시장 점유율 하위권',
          '고객 만족도 3.0점 미만',
          '명확한 핵심 역량 부재',
          '경쟁사 대비 열위 지표 다수'
        ],
        businessImpact: '차별화 전략 수립을 통한 경쟁력 강화 필요'
      },
      {
        score: 1,
        level: '매우 부족',
        behaviorDescription: '명확한 차별화 요소가 없고 경쟁사 대비 뚜렷한 우위를 찾을 수 없음',
        specificExamples: [
          '경쟁사와 거의 동일한 제품/서비스',
          '가격 할인에만 의존하는 영업 방식',
          '고객이 회사를 선택할 특별한 이유가 없음',
          '차별화에 대한 전략이나 계획이 전혀 없음'
        ],
        measurableCriteria: [
          '시장 점유율 최하위권',
          '고객 만족도 2.5점 미만',
          '핵심 역량이 전혀 없음',
          '모든 지표에서 경쟁사 대비 열위'
        ],
        businessImpact: '차별화 요소 발굴 및 개발을 통한 생존 전략 수립 시급'
      }
    ]
  },

  // Q3: 고객 니즈 반영
  {
    questionId: 3,
    category: 'businessFoundation',
    question: '고객 니즈와 시장 변화를 정기적으로 반영합니까?',
    behaviorAnchors: [
      {
        score: 5,
        level: '매우 우수',
        behaviorDescription: '체계적인 고객 니즈 파악 시스템을 운영하고 신속하게 제품/서비스에 반영하고 있음',
        specificExamples: [
          '정기적인 고객 설문, 인터뷰, 피드백 수집 시스템 운영',
          '시장 조사와 트렌드 분석을 통한 선제적 대응',
          '고객 니즈를 신제품 개발과 서비스 개선에 즉시 반영',
          'VOC(Voice of Customer) 시스템과 CRM 연동 운영'
        ],
        measurableCriteria: [
          '월 1회 이상 고객 피드백 수집',
          '고객 요구사항 반영률 80% 이상',
          '신제품/서비스 출시 주기 분기별',
          '고객 만족도 지속적 상승 추세'
        ],
        businessImpact: '고객 충성도 90% 이상, 신규 고객 확보율 지속 증가'
      },
      {
        score: 4,
        level: '우수',
        behaviorDescription: '고객 니즈 파악을 위한 체계가 있고 대부분의 요구사항을 적절히 반영하고 있음',
        specificExamples: [
          '분기별 고객 만족도 조사 실시',
          '주요 고객과의 정기적인 소통 채널 보유',
          '시장 변화에 대한 모니터링 체계 운영',
          '고객 피드백을 바탕으로 한 개선 활동 실시'
        ],
        measurableCriteria: [
          '분기 1회 이상 고객 조사 실시',
          '고객 요구사항 반영률 60% 이상',
          '반기별 제품/서비스 개선',
          '고객 만족도 평균 4.0점 이상'
        ],
        businessImpact: '고객 유지율 80% 이상, 안정적 매출 성장'
      },
      {
        score: 3,
        level: '보통',
        behaviorDescription: '고객 니즈 파악을 위한 노력은 있으나 체계성이나 반영 속도가 부족함',
        specificExamples: [
          '비정기적인 고객 의견 수렴',
          '일부 고객의 피드백만 수집하고 있음',
          '시장 변화 대응이 다소 늦음',
          '고객 요구사항 반영이 선택적으로 이루어짐'
        ],
        measurableCriteria: [
          '반기 1회 정도 고객 조사',
          '고객 요구사항 반영률 40% 수준',
          '연간 1-2회 제품/서비스 개선',
          '고객 만족도 3.5점 수준'
        ],
        businessImpact: '고객 니즈 반영 체계화로 만족도 향상 가능'
      },
      {
        score: 2,
        level: '개선 필요',
        behaviorDescription: '고객 니즈 파악이 제한적이고 시장 변화에 대한 대응이 미흡함',
        specificExamples: [
          '고객 의견 수집이 비체계적이고 간헐적',
          '내부 관점에서만 제품/서비스를 개발',
          '시장 변화를 뒤늦게 인지하고 대응',
          '고객 불만이 발생해야 개선 활동 시작'
        ],
        measurableCriteria: [
          '연간 1회 미만 고객 조사',
          '고객 요구사항 반영률 20% 미만',
          '제품/서비스 개선이 매우 드뭄',
          '고객 만족도 3.0점 미만'
        ],
        businessImpact: '고객 중심 사고 전환을 통한 경쟁력 강화 필요'
      },
      {
        score: 1,
        level: '매우 부족',
        behaviorDescription: '고객 니즈 파악 노력이 거의 없고 시장 변화에 대한 인식과 대응이 매우 부족함',
        specificExamples: [
          '고객 의견을 체계적으로 수집하지 않음',
          '공급자 중심의 일방적인 제품/서비스 제공',
          '시장 변화를 전혀 모니터링하지 않음',
          '고객 불만에 대한 대응도 소극적'
        ],
        measurableCriteria: [
          '고객 조사를 전혀 실시하지 않음',
          '고객 요구사항 반영률 10% 미만',
          '제품/서비스가 수년간 변화 없음',
          '고객 만족도 2.5점 미만'
        ],
        businessImpact: '고객 중심 경영 체계 구축을 통한 생존 전략 수립 시급'
      }
    ]
  },

  // Q9: ChatGPT 활용
  {
    questionId: 9,
    category: 'currentAI',
    question: 'ChatGPT 등 생성형 AI를 실무에 적극 활용하고 있습니까?',
    behaviorAnchors: [
      {
        score: 5,
        level: '매우 우수',
        behaviorDescription: '조직 전체가 생성형 AI를 일상 업무에 체계적으로 활용하고 있으며 높은 성과를 달성하고 있음',
        specificExamples: [
          '전 직원이 ChatGPT, Claude, Copilot 등을 업무에 활용',
          '부서별 맞춤형 AI 활용 가이드라인 보유',
          'AI 활용 성과를 정량적으로 측정하고 관리',
          'AI 도구를 활용한 업무 프로세스 혁신 사례 다수'
        ],
        measurableCriteria: [
          '직원 90% 이상이 주 3회 이상 AI 도구 사용',
          'AI 활용으로 업무 효율성 50% 이상 향상',
          '부서별 AI 활용 KPI 설정 및 달성',
          'AI 활용 우수 사례 월 5개 이상 발굴'
        ],
        businessImpact: '업무 생산성 혁신, 창의적 업무 시간 확보, 경쟁 우위 확보'
      },
      {
        score: 4,
        level: '우수',
        behaviorDescription: '대부분의 구성원이 생성형 AI를 업무에 활용하고 있으며 가시적인 성과를 보이고 있음',
        specificExamples: [
          '70% 이상 직원이 정기적으로 AI 도구 사용',
          '문서 작성, 아이디어 발굴, 분석 업무에 AI 활용',
          'AI 활용 교육과 가이드라인 제공',
          '업무 효율성 향상 사례가 지속적으로 발생'
        ],
        measurableCriteria: [
          '직원 70% 이상이 주 2회 이상 AI 도구 사용',
          'AI 활용으로 업무 효율성 30% 이상 향상',
          'AI 활용 교육 이수율 80% 이상',
          'AI 활용 성과 사례 월 3개 이상'
        ],
        businessImpact: '업무 효율성 대폭 향상, 혁신적 아이디어 창출 증가'
      },
      {
        score: 3,
        level: '보통',
        behaviorDescription: '일부 구성원이 생성형 AI를 사용하고 있으나 조직 차원의 체계적 활용은 부족함',
        specificExamples: [
          '30-50% 직원이 간헐적으로 AI 도구 사용',
          '개인적 관심에 따라 활용 수준이 다름',
          'AI 활용에 대한 기본적인 인식은 있음',
          '일부 업무 영역에서만 제한적으로 활용'
        ],
        measurableCriteria: [
          '직원 50% 정도가 주 1회 정도 AI 도구 사용',
          'AI 활용으로 업무 효율성 15% 정도 향상',
          'AI 관련 교육 참여율 50% 수준',
          'AI 활용 사례가 산발적으로 발생'
        ],
        businessImpact: '체계적 AI 도입으로 생산성 향상 잠재력 보유'
      },
      {
        score: 2,
        level: '개선 필요',
        behaviorDescription: '생성형 AI에 대한 인식은 있으나 실제 업무 활용은 매우 제한적임',
        specificExamples: [
          '소수의 직원만 AI 도구를 가끔 사용',
          'AI 활용에 대한 체계적인 접근 부족',
          '보안이나 정책적 우려로 사용을 제한',
          'AI 도구 사용법에 대한 지식 부족'
        ],
        measurableCriteria: [
          '직원 20% 미만이 월 1-2회 AI 도구 사용',
          'AI 활용 효과를 체감하지 못함',
          'AI 교육이나 가이드라인 부재',
          'AI 활용 성과 사례가 거의 없음'
        ],
        businessImpact: 'AI 활용 교육과 환경 조성을 통한 생산성 향상 기회'
      },
      {
        score: 1,
        level: '매우 부족',
        behaviorDescription: '생성형 AI를 전혀 활용하지 않거나 활용에 대한 인식 자체가 부족함',
        specificExamples: [
          '대부분의 직원이 AI 도구를 사용해본 적 없음',
          'AI 활용에 대한 관심이나 계획이 전혀 없음',
          '전통적인 업무 방식에만 의존',
          'AI 도구 접근이 차단되어 있거나 정책적으로 금지'
        ],
        measurableCriteria: [
          '직원 10% 미만이 AI 도구 사용 경험',
          'AI 활용에 대한 조직 차원의 논의 부재',
          'AI 관련 교육이나 정책이 전혀 없음',
          'AI 활용 성과나 사례가 전무함'
        ],
        businessImpact: 'AI 시대 적응을 위한 전면적인 디지털 전환 필요'
      }
    ]
  },

  // Q17: 디지털 전환 준비도
  {
    questionId: 17,
    category: 'organizationReadiness',
    question: '조직의 디지털 전환 준비도가 높습니까?',
    behaviorAnchors: [
      {
        score: 5,
        level: '매우 우수',
        behaviorDescription: '디지털 전환을 위한 전략, 조직, 기술, 문화가 모두 준비되어 있고 실행 중임',
        specificExamples: [
          '명확한 디지털 전환 전략과 로드맵 보유',
          '디지털 전환 전담 조직과 예산 확보',
          '클라우드, 데이터, AI 등 핵심 기술 인프라 구축',
          '전 직원의 디지털 역량과 변화 수용성이 높음'
        ],
        measurableCriteria: [
          '디지털 성숙도 평가 4.5점 이상',
          '디지털 전환 예산 전체 IT 예산의 50% 이상',
          '클라우드 도입률 80% 이상',
          '직원 디지털 역량 평가 4.0점 이상'
        ],
        businessImpact: '디지털 리더십 확보, 혁신적 비즈니스 모델 창출'
      },
      {
        score: 4,
        level: '우수',
        behaviorDescription: '디지털 전환의 주요 요소들이 준비되어 있고 체계적으로 추진하고 있음',
        specificExamples: [
          '디지털 전환 계획과 추진 체계 보유',
          '핵심 업무 프로세스의 디지털화 진행',
          '데이터 기반 의사결정 체계 구축 중',
          '직원들의 디지털 도구 활용 능력 향상'
        ],
        measurableCriteria: [
          '디지털 성숙도 평가 4.0점 이상',
          '디지털 전환 예산 전체 IT 예산의 30% 이상',
          '클라우드 도입률 60% 이상',
          '직원 디지털 역량 평가 3.5점 이상'
        ],
        businessImpact: '업무 효율성 대폭 향상, 고객 경험 개선'
      },
      {
        score: 3,
        level: '보통',
        behaviorDescription: '디지털 전환의 필요성을 인식하고 있으나 준비 수준이나 실행력이 부족함',
        specificExamples: [
          '디지털 전환에 대한 기본적인 계획 수립',
          '일부 업무 영역에서 디지털화 시도',
          '레거시 시스템과 신기술이 혼재',
          '직원들의 디지털 역량 편차가 큼'
        ],
        measurableCriteria: [
          '디지털 성숙도 평가 3.0점 수준',
          '디지털 전환 예산 전체 IT 예산의 20% 수준',
          '클라우드 도입률 40% 수준',
          '직원 디지털 역량 평가 3.0점 수준'
        ],
        businessImpact: '체계적 디지털 전환으로 경쟁력 강화 가능'
      },
      {
        score: 2,
        level: '개선 필요',
        behaviorDescription: '디지털 전환에 대한 인식은 있으나 구체적인 준비나 실행이 미흡함',
        specificExamples: [
          '디지털 전환 필요성은 인식하나 구체적 계획 부족',
          '기존 시스템과 프로세스에 주로 의존',
          '디지털 기술 도입이 산발적이고 비체계적',
          '직원들의 디지털 역량 개발 노력 부족'
        ],
        measurableCriteria: [
          '디지털 성숙도 평가 2.5점 미만',
          '디지털 전환 예산 전체 IT 예산의 10% 미만',
          '클라우드 도입률 20% 미만',
          '직원 디지털 역량 평가 2.5점 미만'
        ],
        businessImpact: '디지털 전환 전략 수립을 통한 혁신 기반 마련 필요'
      },
      {
        score: 1,
        level: '매우 부족',
        behaviorDescription: '디지털 전환에 대한 인식과 준비가 매우 부족하고 전통적 방식에만 의존함',
        specificExamples: [
          '디지털 전환에 대한 관심이나 계획이 전혀 없음',
          '수작업과 아날로그 방식에 주로 의존',
          'IT 시스템이 매우 낙후되어 있음',
          '직원들의 디지털 도구 사용 능력이 매우 낮음'
        ],
        measurableCriteria: [
          '디지털 성숙도 평가 2.0점 미만',
          '디지털 전환 관련 예산이나 계획 전무',
          '클라우드나 최신 기술 도입 전무',
          '직원 디지털 역량 평가 2.0점 미만'
        ],
        businessImpact: '디지털 시대 생존을 위한 전면적 혁신 필요'
      }
    ]
  },

  // Q25: 클라우드 인프라
  {
    questionId: 25,
    category: 'techInfrastructure',
    question: '클라우드/온프레미스 인프라가 안정적입니까?',
    behaviorAnchors: [
      {
        score: 5,
        level: '매우 우수',
        behaviorDescription: '최적화된 하이브리드 클라우드 환경을 구축하여 안정성과 확장성을 모두 확보함',
        specificExamples: [
          'AWS, Azure, GCP 등 멀티 클라우드 환경 운영',
          '99.9% 이상의 시스템 가동률 달성',
          '자동 확장/축소 및 로드 밸런싱 구현',
          '재해복구와 백업 시스템이 완벽하게 구축됨'
        ],
        measurableCriteria: [
          '시스템 가동률 99.9% 이상',
          '클라우드 도입률 80% 이상',
          '인프라 자동화 수준 90% 이상',
          '장애 복구 시간 1시간 이내'
        ],
        businessImpact: '비즈니스 연속성 보장, 글로벌 확장 기반 확보'
      },
      {
        score: 4,
        level: '우수',
        behaviorDescription: '안정적인 클라우드 인프라를 구축하고 있으며 대부분의 요구사항을 충족함',
        specificExamples: [
          '주요 클라우드 서비스 적극 활용',
          '시스템 모니터링과 알림 체계 구축',
          '정기적인 백업과 보안 패치 적용',
          '성능 최적화와 비용 관리 실시'
        ],
        measurableCriteria: [
          '시스템 가동률 99.5% 이상',
          '클라우드 도입률 60% 이상',
          '인프라 자동화 수준 70% 이상',
          '장애 복구 시간 4시간 이내'
        ],
        businessImpact: '안정적 서비스 제공, 운영 효율성 향상'
      },
      {
        score: 3,
        level: '보통',
        behaviorDescription: '기본적인 인프라는 구축되어 있으나 안정성이나 확장성에 일부 제약이 있음',
        specificExamples: [
          '클라우드와 온프레미스 혼재 운영',
          '간헐적인 시스템 장애나 성능 이슈 발생',
          '수동적인 인프라 관리에 주로 의존',
          '백업과 보안 체계가 기본 수준'
        ],
        measurableCriteria: [
          '시스템 가동률 99.0% 수준',
          '클라우드 도입률 40% 수준',
          '인프라 자동화 수준 50% 수준',
          '장애 복구 시간 8시간 이내'
        ],
        businessImpact: '인프라 현대화로 안정성과 효율성 향상 가능'
      },
      {
        score: 2,
        level: '개선 필요',
        behaviorDescription: '인프라의 안정성이 부족하고 현대적인 클라우드 기술 도입이 미흡함',
        specificExamples: [
          '레거시 시스템에 주로 의존',
          '시스템 장애가 자주 발생하고 복구가 오래 걸림',
          '확장성과 유연성이 매우 제한적',
          '보안과 백업 체계가 취약함'
        ],
        measurableCriteria: [
          '시스템 가동률 98.0% 미만',
          '클라우드 도입률 20% 미만',
          '인프라 자동화 수준 30% 미만',
          '장애 복구 시간 24시간 이상'
        ],
        businessImpact: '인프라 현대화를 통한 안정성 확보 필요'
      },
      {
        score: 1,
        level: '매우 부족',
        behaviorDescription: '인프라가 매우 불안정하고 현대적인 기술 도입이 전혀 이루어지지 않음',
        specificExamples: [
          '오래된 하드웨어와 소프트웨어에 의존',
          '시스템 장애가 빈번하고 복구 능력 부족',
          '확장이나 업그레이드가 거의 불가능',
          '보안 취약점이 다수 존재함'
        ],
        measurableCriteria: [
          '시스템 가동률 95% 미만',
          '클라우드 기술 도입 전무',
          '인프라 자동화 수준 10% 미만',
          '장애 복구 시간 예측 불가'
        ],
        businessImpact: '전면적 인프라 혁신을 통한 비즈니스 연속성 확보 시급'
      }
    ]
  },

  // Q33: AI 전략과 비전
  {
    questionId: 33,
    category: 'goalClarity',
    question: 'AI 전략과 비전이 명확히 수립되어 있습니까?',
    behaviorAnchors: [
      {
        score: 5,
        level: '매우 우수',
        behaviorDescription: '포괄적이고 실행 가능한 AI 전략과 비전이 수립되어 있고 전사적으로 공유되고 있음',
        specificExamples: [
          '3-5년 AI 로드맵과 구체적인 실행 계획 보유',
          'AI 거버넌스와 윤리 가이드라인 수립',
          '전 직원이 AI 비전과 목표를 명확히 이해',
          'AI 전략이 비즈니스 전략과 완벽하게 연계됨'
        ],
        measurableCriteria: [
          'AI 전략 문서 완성도 95% 이상',
          '직원 AI 비전 이해도 4.5점 이상',
          'AI 투자 계획 3년 이상 수립',
          'AI 성과 지표 10개 이상 정의'
        ],
        businessImpact: 'AI 리더십 확보, 혁신적 비즈니스 모델 창출'
      },
      {
        score: 4,
        level: '우수',
        behaviorDescription: 'AI 전략의 핵심 요소들이 잘 정의되어 있고 실행을 위한 기반이 마련되어 있음',
        specificExamples: [
          'AI 도입 목표와 우선순위가 명확함',
          '주요 AI 활용 영역과 기대 효과 정의',
          '경영진과 핵심 인력의 AI 전략 이해도 높음',
          'AI 투자와 인력 계획이 수립되어 있음'
        ],
        measurableCriteria: [
          'AI 전략 문서 완성도 80% 이상',
          '관리자급 AI 비전 이해도 4.0점 이상',
          'AI 투자 계획 2년 이상 수립',
          'AI 성과 지표 5개 이상 정의'
        ],
        businessImpact: '체계적 AI 도입으로 경쟁 우위 확보'
      },
      {
        score: 3,
        level: '보통',
        behaviorDescription: 'AI 전략에 대한 기본적인 방향은 있으나 구체성이나 실행력이 부족함',
        specificExamples: [
          'AI 도입 필요성과 기본 방향 인식',
          '일부 영역에서 AI 활용 계획 수립',
          'AI 전략이 추상적이고 구체적 실행 계획 부족',
          '조직 내 AI 전략 공유와 이해도가 제한적'
        ],
        measurableCriteria: [
          'AI 전략 문서 완성도 60% 수준',
          '전체 직원 AI 비전 이해도 3.0점 수준',
          'AI 투자 계획 1년 정도 수립',
          'AI 성과 지표 2-3개 정도 정의'
        ],
        businessImpact: 'AI 전략 구체화로 실행력 강화 가능'
      },
      {
        score: 2,
        level: '개선 필요',
        behaviorDescription: 'AI에 대한 관심은 있으나 체계적인 전략이나 비전이 부족함',
        specificExamples: [
          'AI 도입에 대한 막연한 관심만 존재',
          '단편적이고 임시적인 AI 활용만 시도',
          'AI 전략 수립을 위한 체계적 접근 부족',
          '조직 내 AI에 대한 공통된 이해 부족'
        ],
        measurableCriteria: [
          'AI 전략 문서가 없거나 매우 미흡',
          '직원 AI 비전 이해도 2.5점 미만',
          'AI 투자 계획이 단기적이거나 부재',
          'AI 성과 지표가 정의되지 않음'
        ],
        businessImpact: 'AI 전략 수립을 통한 체계적 접근 필요'
      },
      {
        score: 1,
        level: '매우 부족',
        behaviorDescription: 'AI 전략이나 비전에 대한 인식과 계획이 전혀 없음',
        specificExamples: [
          'AI에 대한 관심이나 이해가 매우 부족',
          'AI 도입에 대한 계획이나 논의가 전혀 없음',
          '전통적인 업무 방식에만 의존',
          'AI 시대 변화에 대한 인식 부족'
        ],
        measurableCriteria: [
          'AI 전략이나 계획이 전혀 없음',
          '직원 AI 인식도 2.0점 미만',
          'AI 관련 투자나 논의 전무',
          'AI 성과나 목표에 대한 개념 부재'
        ],
        businessImpact: 'AI 시대 적응을 위한 전략적 사고 전환 시급'
      }
    ]
  },

  // Q41: 프로젝트 관리 체계
  {
    questionId: 41,
    category: 'executionCapability',
    question: '프로젝트 관리 체계가 성숙합니까?',
    behaviorAnchors: [
      {
        score: 5,
        level: '매우 우수',
        behaviorDescription: '표준화된 프로젝트 관리 방법론을 적용하여 높은 성공률과 효율성을 달성하고 있음',
        specificExamples: [
          'PMI, Agile, Scrum 등 검증된 방법론 적용',
          '프로젝트 포트폴리오 관리(PPM) 시스템 운영',
          '전문 PM과 PMO 조직 보유',
          '프로젝트 성공률 90% 이상 달성'
        ],
        measurableCriteria: [
          '프로젝트 성공률 90% 이상',
          '일정 준수율 95% 이상',
          '예산 준수율 95% 이상',
          'PMO 성숙도 레벨 4-5 수준'
        ],
        businessImpact: '전략적 목표 달성률 극대화, 조직 실행력 최고 수준'
      },
      {
        score: 4,
        level: '우수',
        behaviorDescription: '체계적인 프로젝트 관리 프로세스를 운영하고 있으며 대부분의 프로젝트가 성공적으로 완료됨',
        specificExamples: [
          '표준 프로젝트 관리 프로세스와 템플릿 보유',
          '정기적인 프로젝트 리뷰와 통제 실시',
          '리스크 관리와 이슈 해결 체계 운영',
          '프로젝트 관리 도구와 시스템 활용'
        ],
        measurableCriteria: [
          '프로젝트 성공률 80% 이상',
          '일정 준수율 85% 이상',
          '예산 준수율 90% 이상',
          'PMO 성숙도 레벨 3 수준'
        ],
        businessImpact: '안정적 프로젝트 수행, 목표 달성률 향상'
      },
      {
        score: 3,
        level: '보통',
        behaviorDescription: '기본적인 프로젝트 관리는 이루어지고 있으나 체계성이나 일관성이 부족함',
        specificExamples: [
          '프로젝트별로 관리 방식이 상이함',
          '기본적인 일정과 예산 관리는 실시',
          '프로젝트 관리 역량이 개인에 의존적',
          '성공과 실패가 혼재하는 상황'
        ],
        measurableCriteria: [
          '프로젝트 성공률 60-70% 수준',
          '일정 준수율 70% 수준',
          '예산 준수율 75% 수준',
          'PMO 성숙도 레벨 2 수준'
        ],
        businessImpact: '프로젝트 관리 체계화로 성공률 향상 가능'
      },
      {
        score: 2,
        level: '개선 필요',
        behaviorDescription: '프로젝트 관리가 비체계적이고 성공률이나 효율성이 낮음',
        specificExamples: [
          '프로젝트 관리 방법론이나 표준 부재',
          '일정과 예산 관리가 형식적이거나 부실',
          '프로젝트 실패나 지연이 자주 발생',
          '사후 관리나 교훈 도출 활동 부족'
        ],
        measurableCriteria: [
          '프로젝트 성공률 50% 미만',
          '일정 준수율 60% 미만',
          '예산 초과가 빈번함',
          'PMO 성숙도 레벨 1 수준'
        ],
        businessImpact: '프로젝트 관리 역량 강화를 통한 실행력 개선 필요'
      },
      {
        score: 1,
        level: '매우 부족',
        behaviorDescription: '프로젝트 관리 개념이나 체계가 전혀 없고 임기응변식으로만 업무를 처리함',
        specificExamples: [
          '프로젝트와 일반 업무의 구분이 모호함',
          '계획 수립이나 진행 관리가 전혀 이루어지지 않음',
          '대부분의 프로젝트가 실패하거나 중단됨',
          '체계적인 업무 관리 문화 자체가 부재'
        ],
        measurableCriteria: [
          '프로젝트 성공률 30% 미만',
          '일정과 예산 관리 개념 부재',
          '프로젝트 관리 도구나 방법론 전무',
          'PMO나 관리 체계 전혀 없음'
        ],
        businessImpact: '기본적인 프로젝트 관리 체계 구축을 통한 조직 역량 확보 시급'
      }
    ]
  }
];

/**
 * 특정 질문 ID에 대한 BARS 행동지표 조회
 */
export function getBARSIndicators(questionId: number): BARSIndicator | undefined {
  return BARS_BEHAVIOR_INDICATORS.find(indicator => indicator.questionId === questionId);
}

/**
 * 특정 점수에 대한 행동 기준 조회
 */
export function getBehaviorAnchor(questionId: number, score: number) {
  const indicator = getBARSIndicators(questionId);
  return indicator?.behaviorAnchors.find(anchor => anchor.score === score);
}

/**
 * 카테고리별 BARS 지표 조회
 */
export function getBARSByCategory(category: string): BARSIndicator[] {
  return BARS_BEHAVIOR_INDICATORS.filter(indicator => indicator.category === category);
}

/**
 * 모든 BARS 지표 요약 정보 조회
 */
export function getBARSSummary() {
  return {
    totalQuestions: BARS_BEHAVIOR_INDICATORS.length,
    categories: [...new Set(BARS_BEHAVIOR_INDICATORS.map(indicator => indicator.category))],
    scoreRange: { min: 1, max: 5 },
    totalBehaviorAnchors: BARS_BEHAVIOR_INDICATORS.reduce(
      (sum, indicator) => sum + indicator.behaviorAnchors.length, 
      0
    )
  };
}