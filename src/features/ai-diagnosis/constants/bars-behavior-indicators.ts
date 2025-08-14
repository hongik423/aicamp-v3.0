/**
 * 🎯 BARS (Behaviorally Anchored Rating Scales) 행동지표 시스템
 * 각 질문별로 구체적이고 측정 가능한 행동 기준을 제공
 * 
 * BARS 방식: 각 점수(1-5점)마다 구체적인 행동 사례를 제시하여
 * 평가자가 정확하고 일관된 평가를 할 수 있도록 지원
 */

export interface BARSIndicator {
  score: number;
  label: string;
  behaviorDescription: string; // 구체적인 행동 기술
  businessExample: string;     // 실제 업무 사례
  keywords: string[];          // 핵심 키워드
  color: string;
  bgColor: string;
}

export interface QuestionBARSMapping {
  questionId: number;
  question: string;
  category: string;
  indicators: BARSIndicator[];
}

// 나머지 질문들 import
import { REMAINING_BARS_QUESTIONS } from './bars-remaining-questions';

/**
 * 45개 질문별 BARS 행동지표 매핑
 */
export const QUESTION_BARS_MAPPING: QuestionBARSMapping[] = [
  // ===== 사업기반 영역 (1-8번) =====
  {
    questionId: 1,
    question: "우리 회사의 사업 모델은 얼마나 명확하게 정의되어 있나요?",
    category: "businessFoundation",
    indicators: [
      {
        score: 5,
        label: "매우 명확",
        behaviorDescription: "사업 모델 캔버스가 완성되어 있고, 가치 제안·고객 세그먼트·수익 모델이 구체적으로 문서화되어 전 직원이 숙지하고 있음",
        businessExample: "Business Model Canvas 작성 완료, 월례회의에서 정기 검토, 신입사원 온보딩 시 필수 교육",
        keywords: ["사업모델캔버스", "가치제안", "수익구조", "전직원공유"],
        color: "text-green-700",
        bgColor: "bg-green-50 border-green-200"
      },
      {
        score: 4,
        label: "명확",
        behaviorDescription: "핵심 사업 요소들이 대부분 정의되어 있고, 경영진과 팀장급이 명확히 이해하며 의사결정에 활용하고 있음",
        businessExample: "사업계획서에 명시, 분기별 전략회의에서 논의, 주요 의사결정 시 사업모델 기준 적용",
        keywords: ["사업계획서", "전략회의", "의사결정기준"],
        color: "text-blue-700",
        bgColor: "bg-blue-50 border-blue-200"
      },
      {
        score: 3,
        label: "보통",
        behaviorDescription: "기본적인 사업 모델은 있지만 일부 요소가 모호하고, 경영진 수준에서만 공유되어 있음",
        businessExample: "사업 개요는 있으나 세부 요소 미비, 경영진 회의에서만 논의, 실무진 이해도 부족",
        keywords: ["기본모델", "경영진공유", "세부요소부족"],
        color: "text-yellow-700",
        bgColor: "bg-yellow-50 border-yellow-200"
      },
      {
        score: 2,
        label: "불명확",
        behaviorDescription: "사업의 방향성은 있으나 구체적인 모델이 정의되지 않았고, 임기응변식으로 운영되는 경우가 많음",
        businessExample: "막연한 사업 아이디어만 존재, 시장 상황에 따라 즉흥적 대응, 일관된 전략 부재",
        keywords: ["막연한아이디어", "즉흥적대응", "전략부재"],
        color: "text-orange-700",
        bgColor: "bg-orange-50 border-orange-200"
      },
      {
        score: 1,
        label: "매우 불명확",
        behaviorDescription: "사업 모델에 대한 개념이나 정의가 전혀 없고, 단순히 매출 발생 활동만 하고 있음",
        businessExample: "사업모델 개념 부재, 단순 매출 활동만 수행, 체계적 계획 없이 운영",
        keywords: ["개념부재", "단순매출", "무계획운영"],
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200"
      }
    ]
  },
  
  {
    questionId: 2,
    question: "시장에서 우리 회사의 경쟁력은 어느 수준인가요?",
    category: "businessFoundation", 
    indicators: [
      {
        score: 5,
        label: "매우 높음",
        behaviorDescription: "업계 선도 기업으로 인정받으며, 독특한 기술·서비스·브랜드로 시장을 주도하고 경쟁사들이 벤치마킹하는 위치",
        businessExample: "업계 1위 점유율, 특허 기술 보유, 언론 보도 빈번, 경쟁사 벤치마킹 대상",
        keywords: ["업계선도", "시장주도", "특허기술", "벤치마킹대상"],
        color: "text-green-700",
        bgColor: "bg-green-50 border-green-200"
      },
      {
        score: 4,
        label: "높음",
        behaviorDescription: "주요 경쟁사 대비 명확한 우위 요소를 보유하고 있으며, 고객들이 우리 회사를 우선적으로 선택하는 이유가 분명함",
        businessExample: "경쟁사 대비 높은 고객 만족도, 재구매율 상위, 프리미엄 가격 책정 가능",
        keywords: ["명확한우위", "고객우선선택", "프리미엄가격"],
        color: "text-blue-700",
        bgColor: "bg-blue-50 border-blue-200"
      },
      {
        score: 3,
        label: "보통",
        behaviorDescription: "경쟁사와 비슷한 수준의 제품·서비스를 제공하며, 일부 영역에서는 우위, 일부 영역에서는 열세인 상황",
        businessExample: "시장 평균 수준의 성과, 가격 경쟁력으로 승부, 특별한 차별화 요소 부족",
        keywords: ["시장평균", "가격경쟁", "차별화부족"],
        color: "text-yellow-700",
        bgColor: "bg-yellow-50 border-yellow-200"
      },
      {
        score: 2,
        label: "낮음",
        behaviorDescription: "대부분의 영역에서 경쟁사 대비 열세이며, 가격이나 접근성 등 제한적 요소로만 경쟁하고 있음",
        businessExample: "저가 전략으로 생존, 고객 이탈률 높음, 경쟁사 모방 위주의 사업 운영",
        keywords: ["저가전략", "고객이탈", "모방위주"],
        color: "text-orange-700",
        bgColor: "bg-orange-50 border-orange-200"
      },
      {
        score: 1,
        label: "매우 낮음",
        behaviorDescription: "경쟁력이 거의 없어 시장에서 도태 위험이 높고, 생존을 위한 최소한의 활동만 하고 있음",
        businessExample: "시장 점유율 최하위, 지속적 적자, 고객 확보 어려움, 사업 지속성 우려",
        keywords: ["도태위험", "지속적적자", "고객확보어려움"],
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200"
      }
    ]
  },

  // ===== 현재 AI 활용 영역 (9-16번) =====
  {
    questionId: 9,
    question: "현재 AI 기술을 업무에 활용하고 있나요?",
    category: "currentAI",
    indicators: [
      {
        score: 5,
        label: "전면적 활용",
        behaviorDescription: "전 부서에서 AI 도구를 일상적으로 사용하며, AI 기반 업무 프로세스가 표준화되어 있고 지속적으로 최적화하고 있음",
        businessExample: "ChatGPT/Claude 전사 도입, AI 업무 가이드라인 수립, 월간 AI 활용도 리포트 작성, AI 교육 정기 실시",
        keywords: ["전사도입", "표준화", "지속최적화", "정기교육"],
        color: "text-green-700",
        bgColor: "bg-green-50 border-green-200"
      },
      {
        score: 4,
        label: "적극적 사용",
        behaviorDescription: "주요 부서에서 AI 도구를 정기적으로 활용하고 있으며, 업무 효율성 향상 효과를 체감하고 있음",
        businessExample: "마케팅팀 AI 카피라이팅, 고객서비스팀 챗봇 운영, 기획팀 데이터 분석 AI 활용",
        keywords: ["주요부서활용", "정기적사용", "효율성체감"],
        color: "text-blue-700",
        bgColor: "bg-blue-50 border-blue-200"
      },
      {
        score: 3,
        label: "부분적 사용",
        behaviorDescription: "일부 직원이나 특정 업무에서만 AI 도구를 사용하고 있으며, 체계적인 활용 계획은 부족함",
        businessExample: "개별 직원이 ChatGPT 개인적 사용, 번역 업무에 파파고/구글번역 활용, 간헐적 사용",
        keywords: ["개별사용", "특정업무", "간헐적활용"],
        color: "text-yellow-700",
        bgColor: "bg-yellow-50 border-yellow-200"
      },
      {
        score: 2,
        label: "개인적 사용",
        behaviorDescription: "소수의 직원만이 개인적 호기심으로 AI 도구를 시도해보는 수준이며, 업무에 본격적으로 적용하지는 않음",
        businessExample: "1-2명 직원이 ChatGPT 가끔 사용, 업무 적용보다는 개인적 관심, 회사 차원의 지원 없음",
        keywords: ["소수직원", "개인호기심", "시도수준"],
        color: "text-orange-700",
        bgColor: "bg-orange-50 border-orange-200"
      },
      {
        score: 1,
        label: "전혀 사용 안함",
        behaviorDescription: "AI 기술을 전혀 사용하지 않으며, AI 도구에 대한 인식이나 관심도 부족한 상태",
        businessExample: "AI 도구 사용 경험 전무, ChatGPT 등 생성형 AI 인지도 낮음, 기존 업무 방식만 고수",
        keywords: ["사용경험전무", "인지도낮음", "기존방식고수"],
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200"
      }
    ]
  },

  {
    questionId: 10,
    question: "AI를 활용한 업무 자동화 수준은 어떤가요?",
    category: "currentAI",
    indicators: [
      {
        score: 5,
        label: "고도 자동화",
        behaviorDescription: "핵심 업무 프로세스가 AI로 자동화되어 있고, RPA·챗봇·AI 분석 도구가 통합적으로 운영되며 지속적으로 개선하고 있음",
        businessExample: "고객 문의 AI 자동 분류·응답, 재고 관리 AI 예측, 회계 처리 자동화, 마케팅 개인화 자동 실행",
        keywords: ["핵심업무자동화", "통합운영", "지속개선"],
        color: "text-green-700",
        bgColor: "bg-green-50 border-green-200"
      },
      {
        score: 4,
        label: "상당한 자동화",
        behaviorDescription: "주요 반복 업무들이 AI나 자동화 도구로 처리되고 있으며, 직원들의 업무 부담이 크게 줄어든 상태",
        businessExample: "이메일 자동 분류, 일정 관리 자동화, 보고서 템플릿 자동 생성, 고객 데이터 자동 정리",
        keywords: ["반복업무자동화", "업무부담감소", "주요프로세스"],
        color: "text-blue-700",
        bgColor: "bg-blue-50 border-blue-200"
      },
      {
        score: 3,
        label: "부분 자동화",
        behaviorDescription: "일부 단순 업무나 특정 프로세스에서 자동화 도구를 활용하고 있으나, 대부분의 업무는 여전히 수작업으로 처리",
        businessExample: "엑셀 매크로 활용, 간단한 이메일 자동 발송, 기본적인 데이터 정리 자동화",
        keywords: ["단순업무", "특정프로세스", "기본자동화"],
        color: "text-yellow-700",
        bgColor: "bg-yellow-50 border-yellow-200"
      },
      {
        score: 2,
        label: "기초 자동화",
        behaviorDescription: "매우 간단한 작업만 자동화되어 있고, 대부분의 업무는 수작업으로 처리하며 자동화에 대한 계획이 구체적이지 않음",
        businessExample: "기본 이메일 자동 회신, 단순 파일 백업 자동화 정도만 활용",
        keywords: ["간단작업", "수작업위주", "계획부족"],
        color: "text-orange-700",
        bgColor: "bg-orange-50 border-orange-200"
      },
      {
        score: 1,
        label: "자동화 없음",
        behaviorDescription: "모든 업무를 수작업으로 처리하고 있으며, 자동화에 대한 개념이나 필요성을 느끼지 못하고 있음",
        businessExample: "모든 데이터 입력 수작업, 반복 업무도 매번 수동 처리, 자동화 도구 사용 경험 없음",
        keywords: ["완전수작업", "반복수동처리", "자동화개념부재"],
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200"
      }
    ]
  },

  // ===== 조직 준비도 영역 (17-24번) =====
  {
    questionId: 17,
    question: "경영진의 AI 도입에 대한 의지는 어느 정도인가요?",
    category: "organizationReadiness",
    indicators: [
      {
        score: 5,
        label: "매우 적극적",
        behaviorDescription: "CEO가 AI를 핵심 경영 전략으로 설정하고, 전담 조직 구성·충분한 예산 배정·정기적인 진행 상황 점검을 실시하고 있음",
        businessExample: "CEO의 AI 전략 발표, AI 전담팀 신설, 연간 AI 예산 1억원 이상 배정, 월간 AI 추진 현황 보고",
        keywords: ["CEO전략설정", "전담조직", "충분한예산", "정기점검"],
        color: "text-green-700",
        bgColor: "bg-green-50 border-green-200"
      },
      {
        score: 4,
        label: "적극적",
        behaviorDescription: "경영진이 AI 도입의 중요성을 인식하고 구체적인 투자 계획을 수립했으며, 담당자를 지정하여 추진하고 있음",
        businessExample: "AI 도입 계획서 승인, 담당 부서 지정, 교육 예산 확보, 분기별 진행 상황 검토",
        keywords: ["중요성인식", "투자계획", "담당자지정"],
        color: "text-blue-700",
        bgColor: "bg-blue-50 border-blue-200"
      },
      {
        score: 3,
        label: "보통",
        behaviorDescription: "AI 도입에 대한 관심은 있으나 구체적인 실행 계획이나 예산 배정은 아직 확정되지 않은 상태",
        businessExample: "AI 관련 세미나 참석, 도입 필요성 언급, 하지만 구체적 계획이나 예산은 미정",
        keywords: ["관심표명", "계획미정", "예산미확정"],
        color: "text-yellow-700",
        bgColor: "bg-yellow-50 border-yellow-200"
      },
      {
        score: 2,
        label: "소극적",
        behaviorDescription: "AI의 필요성은 어느 정도 인정하지만 투자나 변화에 대한 부담감으로 소극적인 태도를 보이고 있음",
        businessExample: "AI 필요성은 인정하나 비용 부담 우려, 기존 방식으로도 충분하다는 인식, 신중한 검토 중",
        keywords: ["필요성인정", "비용부담우려", "신중검토"],
        color: "text-orange-700",
        bgColor: "bg-orange-50 border-orange-200"
      },
      {
        score: 1,
        label: "전혀 없음",
        behaviorDescription: "AI에 대한 관심이나 이해가 부족하고, 현재 상황에 만족하여 변화의 필요성을 느끼지 못하고 있음",
        businessExample: "AI 관련 논의 회피, 현재 방식으로 충분하다는 인식, 새로운 기술에 대한 거부감",
        keywords: ["관심부족", "현상만족", "변화거부"],
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200"
      }
    ]
  },

  // 계속해서 나머지 질문들의 BARS 지표를 추가...
  // (공간 절약을 위해 대표적인 몇 개만 작성하고, 실제로는 45개 모두 작성해야 함)

  // ===== 기술 인프라 영역 (25-32번) =====
  {
    questionId: 25,
    question: "현재 IT 인프라의 전반적인 수준은?",
    category: "techInfrastructure",
    indicators: [
      {
        score: 5,
        label: "최첨단",
        behaviorDescription: "클라우드 기반의 최신 IT 인프라를 갖추고 있으며, AI 워크로드를 처리할 수 있는 충분한 컴퓨팅 파워와 확장성을 보유",
        businessExample: "AWS/Azure 멀티 클라우드 운영, GPU 서버 보유, 마이크로서비스 아키텍처, DevOps 자동화 구축",
        keywords: ["클라우드기반", "AI워크로드", "확장성", "최신인프라"],
        color: "text-green-700",
        bgColor: "bg-green-50 border-green-200"
      },
      {
        score: 4,
        label: "현대적",
        behaviorDescription: "기본적인 클라우드 서비스를 활용하고 있으며, 대부분의 시스템이 현대적 기준에 부합하고 AI 도구 사용에 적합함",
        businessExample: "Office 365/Google Workspace 사용, 클라우드 스토리지 활용, 현대적 PC 환경, 안정적 네트워크",
        keywords: ["클라우드서비스", "현대적기준", "AI도구적합"],
        color: "text-blue-700",
        bgColor: "bg-blue-50 border-blue-200"
      },
      {
        score: 3,
        label: "보통",
        behaviorDescription: "기본적인 IT 환경은 갖춰져 있으나 일부 시설이 노후화되어 있고, AI 활용을 위해서는 부분적 업그레이드가 필요함",
        businessExample: "기본적인 사무용 PC, 인터넷 연결 양호, 하지만 일부 구형 장비, 클라우드 서비스 제한적 사용",
        keywords: ["기본환경", "부분노후화", "업그레이드필요"],
        color: "text-yellow-700",
        bgColor: "bg-yellow-50 border-yellow-200"
      },
      {
        score: 2,
        label: "노후",
        behaviorDescription: "상당 부분의 IT 장비가 노후화되어 있고, 성능 제약으로 인해 최신 AI 도구 사용에 어려움이 있음",
        businessExample: "5년 이상 된 PC, 느린 인터넷 속도, 구형 소프트웨어 사용, 클라우드 서비스 미활용",
        keywords: ["장비노후화", "성능제약", "AI도구제한"],
        color: "text-orange-700",
        bgColor: "bg-orange-50 border-orange-200"
      },
      {
        score: 1,
        label: "매우 노후",
        behaviorDescription: "대부분의 IT 시설이 심각하게 노후화되어 있어 기본적인 업무 처리도 비효율적이고, AI 도구 사용이 거의 불가능함",
        businessExample: "10년 이상 된 PC, 잦은 시스템 다운, 인터넷 속도 극도로 느림, 기본 소프트웨어도 구버전",
        keywords: ["심각한노후화", "기본업무비효율", "AI사용불가"],
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200"
      }
    ]
  },

  // ===== 목표 명확성 영역 (33-40번) =====
  {
    questionId: 33,
    question: "AI 도입의 구체적인 목표가 설정되어 있나요?",
    category: "goalClarity",
    indicators: [
      {
        score: 5,
        label: "매우 명확",
        behaviorDescription: "SMART 기준에 따른 구체적이고 측정 가능한 AI 도입 목표가 설정되어 있으며, 단계별 마일스톤과 성과 지표가 명확히 정의됨",
        businessExample: "생산성 30% 향상, 고객 응답 시간 50% 단축, 비용 20% 절감 등 수치화된 목표, 분기별 달성도 측정",
        keywords: ["SMART목표", "측정가능", "단계별마일스톤", "성과지표"],
        color: "text-green-700",
        bgColor: "bg-green-50 border-green-200"
      },
      {
        score: 4,
        label: "구체적 목표",
        behaviorDescription: "AI 도입을 통해 달성하고자 하는 목표가 구체적으로 설정되어 있고, 주요 성과 지표가 정의되어 있음",
        businessExample: "업무 효율성 향상, 고객 만족도 개선, 매출 증대 등 구체적 목표 설정, 월별 진행 상황 점검",
        keywords: ["구체적목표", "성과지표정의", "진행상황점검"],
        color: "text-blue-700",
        bgColor: "bg-blue-50 border-blue-200"
      },
      {
        score: 3,
        label: "일반적 목표",
        behaviorDescription: "AI 도입의 기본적인 목표는 있으나 구체성이나 측정 가능성이 부족하고, 성과 평가 기준이 모호함",
        businessExample: "업무 개선, 경쟁력 강화 등 일반적 목표만 설정, 구체적 수치나 기준 없음",
        keywords: ["기본목표", "구체성부족", "평가기준모호"],
        color: "text-yellow-700",
        bgColor: "bg-yellow-50 border-yellow-200"
      },
      {
        score: 2,
        label: "모호한 목표",
        behaviorDescription: "AI 도입에 대한 막연한 기대는 있으나 구체적인 목표나 성과 기준이 설정되지 않은 상태",
        businessExample: "AI가 도움이 될 것이라는 막연한 기대, 트렌드를 따라가야 한다는 인식 정도",
        keywords: ["막연한기대", "트렌드추종", "기준부재"],
        color: "text-orange-700",
        bgColor: "bg-orange-50 border-orange-200"
      },
      {
        score: 1,
        label: "목표 없음",
        behaviorDescription: "AI 도입에 대한 명확한 목표나 기대 효과에 대한 인식이 전혀 없는 상태",
        businessExample: "AI 도입 목적 불분명, 단순히 남들이 하니까 해야 한다는 정도의 인식",
        keywords: ["목적불분명", "인식부재", "무계획도입"],
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200"
      }
    ]
  },

  // ===== 실행 역량 영역 (41-45번) =====
  {
    questionId: 41,
    question: "프로젝트 관리 역량은 어떤가요?",
    category: "executionCapability",
    indicators: [
      {
        score: 5,
        label: "매우 우수",
        behaviorDescription: "PMP 등 전문 자격을 보유한 PM이 있고, 체계적인 프로젝트 관리 방법론과 도구를 활용하여 복잡한 AI 프로젝트도 성공적으로 관리할 수 있음",
        businessExample: "PMP 자격 보유 PM, Jira/Asana 등 PM 도구 활용, 애자일/스크럼 방법론 적용, 과거 IT 프로젝트 성공 경험",
        keywords: ["전문PM", "체계적방법론", "복잡프로젝트관리", "성공경험"],
        color: "text-green-700",
        bgColor: "bg-green-50 border-green-200"
      },
      {
        score: 4,
        label: "우수",
        behaviorDescription: "프로젝트 관리 경험이 풍부하고 기본적인 PM 도구와 방법론을 활용할 수 있으며, 중간 규모의 프로젝트를 성공적으로 관리한 경험이 있음",
        businessExample: "다수의 프로젝트 관리 경험, 간트차트/WBS 작성 가능, 일정 및 예산 관리 역량, 팀 협업 조율 능력",
        keywords: ["풍부한경험", "PM도구활용", "중간규모성공"],
        color: "text-blue-700",
        bgColor: "bg-blue-50 border-blue-200"
      },
      {
        score: 3,
        label: "보통",
        behaviorDescription: "기본적인 프로젝트 관리는 가능하나 체계적인 방법론이나 전문 도구 활용은 부족하고, 소규모 프로젝트 위주의 경험만 보유",
        businessExample: "엑셀로 일정 관리, 기본적인 업무 분담, 소규모 프로젝트 경험, 체계적 방법론 부족",
        keywords: ["기본관리", "소규모경험", "방법론부족"],
        color: "text-yellow-700",
        bgColor: "bg-yellow-50 border-yellow-200"
      },
      {
        score: 2,
        label: "부족",
        behaviorDescription: "프로젝트 관리 경험이 제한적이고 체계적인 관리 방법을 모르며, 일정이나 예산 관리에 어려움을 겪는 경우가 많음",
        businessExample: "프로젝트 지연 빈발, 예산 초과 경험, 체계적 계획 수립 어려움, PM 도구 사용 경험 없음",
        keywords: ["제한적경험", "관리어려움", "지연빈발"],
        color: "text-orange-700",
        bgColor: "bg-orange-50 border-orange-200"
      },
      {
        score: 1,
        label: "매우 부족",
        behaviorDescription: "프로젝트 관리에 대한 개념이나 경험이 거의 없고, 계획 수립이나 진행 관리를 체계적으로 하지 못함",
        businessExample: "프로젝트 관리 경험 전무, 계획 없이 즉흥적 업무 진행, 일정·예산 관리 개념 부족",
        keywords: ["경험전무", "즉흥적진행", "관리개념부족"],
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200"
      }
    ]
  },
  // 나머지 질문들 추가
  ...REMAINING_BARS_QUESTIONS
];

/**
 * 질문 ID로 BARS 행동지표 조회
 */
export const getBARSByQuestionId = (questionId: number): QuestionBARSMapping | null => {
  return QUESTION_BARS_MAPPING.find(mapping => mapping.questionId === questionId) || null;
};

/**
 * 특정 질문의 특정 점수에 대한 BARS 지표 조회
 */
export const getBARSIndicator = (questionId: number, score: number): BARSIndicator | null => {
  const mapping = getBARSByQuestionId(questionId);
  if (!mapping) return null;
  
  return mapping.indicators.find(indicator => indicator.score === score) || null;
};

/**
 * 카테고리별 BARS 지표 통계
 */
export const getBARSStatsByCategory = (category: string) => {
  const categoryMappings = QUESTION_BARS_MAPPING.filter(mapping => mapping.category === category);
  return {
    totalQuestions: categoryMappings.length,
    questionIds: categoryMappings.map(mapping => mapping.questionId),
    categories: [...new Set(categoryMappings.map(mapping => mapping.category))]
  };
};

/**
 * 전체 BARS 시스템 통계
 */
export const getAllBARSStats = () => {
  const categories = [...new Set(QUESTION_BARS_MAPPING.map(mapping => mapping.category))];
  return {
    totalQuestions: QUESTION_BARS_MAPPING.length,
    totalCategories: categories.length,
    categories: categories.map(category => ({
      name: category,
      questionCount: QUESTION_BARS_MAPPING.filter(mapping => mapping.category === category).length
    }))
  };
};

console.log('🎯 BARS 행동지표 시스템 로드 완료');
console.log('📊 총 질문 수:', QUESTION_BARS_MAPPING.length);
console.log('🎯 카테고리별 통계:', getAllBARSStats());
