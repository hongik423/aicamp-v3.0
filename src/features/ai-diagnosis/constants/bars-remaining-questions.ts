/**
 * 🎯 BARS 행동지표 - 나머지 질문들 (3-45번)
 * 메인 파일에 추가할 나머지 질문들의 BARS 지표
 */

import { QuestionBARSMapping } from './bars-behavior-indicators';

export const REMAINING_BARS_QUESTIONS: QuestionBARSMapping[] = [
  // ===== 사업기반 영역 나머지 질문들 (3-8번) =====
  {
    questionId: 3,
    question: "고객 데이터를 체계적으로 수집하고 관리하고 있나요?",
    category: "businessFoundation",
    indicators: [
      {
        score: 5,
        label: "매우 잘 관리",
        behaviorDescription: "CRM 시스템을 통해 모든 고객 데이터가 통합 관리되고, 개인정보보호법 준수하며 데이터 분석을 통한 인사이트 도출까지 활용",
        businessExample: "Salesforce/HubSpot 등 CRM 운영, 고객 여정 분석, 개인정보 암호화 저장, 데이터 기반 마케팅 실행",
        keywords: ["CRM통합관리", "개인정보준수", "데이터분석", "인사이트도출"],
        color: "text-green-700",
        bgColor: "bg-green-50 border-green-200"
      },
      {
        score: 4,
        label: "잘 관리",
        behaviorDescription: "대부분의 고객 데이터가 체계적으로 수집·관리되고 있으며, 마케팅이나 영업 활동에 활용하고 있음",
        businessExample: "고객 DB 구축, 구매 이력 관리, 고객 세분화, 타겟 마케팅 실행",
        keywords: ["고객DB구축", "구매이력관리", "고객세분화"],
        color: "text-blue-700",
        bgColor: "bg-blue-50 border-blue-200"
      },
      {
        score: 3,
        label: "보통",
        behaviorDescription: "기본적인 고객 정보는 수집하고 있으나 체계적인 관리나 분석 활용은 부족한 상태",
        businessExample: "엑셀로 고객 명단 관리, 기본 연락처 정보만 보유, 간헐적 활용",
        keywords: ["기본정보수집", "엑셀관리", "간헐적활용"],
        color: "text-yellow-700",
        bgColor: "bg-yellow-50 border-yellow-200"
      },
      {
        score: 2,
        label: "기초 수준",
        behaviorDescription: "고객 연락처 등 최소한의 정보만 수집하고 있으며, 체계적인 관리 시스템이나 활용 계획이 부족함",
        businessExample: "명함 정보나 주문서상 연락처만 보유, 체계적 정리 부족, 활용도 낮음",
        keywords: ["최소정보", "체계부족", "활용도낮음"],
        color: "text-orange-700",
        bgColor: "bg-orange-50 border-orange-200"
      },
      {
        score: 1,
        label: "전혀 안함",
        behaviorDescription: "고객 데이터 수집이나 관리에 대한 개념이 없고, 필요시마다 임시로 정보를 수집하는 수준",
        businessExample: "고객 정보 관리 시스템 없음, 필요시마다 재문의, 데이터 축적 개념 부재",
        keywords: ["관리시스템없음", "임시수집", "축적개념부재"],
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200"
      }
    ]
  },

  // ===== 현재 AI 활용 영역 나머지 질문들 (11-16번) =====
  {
    questionId: 13,
    question: "고객 서비스에 AI를 활용하고 있나요?",
    category: "currentAI",
    indicators: [
      {
        score: 5,
        label: "완전 통합",
        behaviorDescription: "모든 고객 접점에서 AI가 완전히 통합되어 운영되며, 개인화된 서비스와 24시간 대응이 가능한 시스템을 구축",
        businessExample: "AI 챗봇 24시간 운영, 개인화 추천 시스템, 감정 분석 기반 응대, 음성 AI 상담 서비스",
        keywords: ["완전통합", "24시간대응", "개인화서비스"],
        color: "text-green-700",
        bgColor: "bg-green-50 border-green-200"
      },
      {
        score: 4,
        label: "적극 활용",
        behaviorDescription: "다양한 고객 서비스 채널에서 AI를 적극적으로 활용하고 있으며, 고객 만족도 향상 효과를 체감하고 있음",
        businessExample: "웹사이트 챗봇 운영, 이메일 자동 분류 및 응답, 고객 문의 AI 분석, FAQ 자동 업데이트",
        keywords: ["다양한채널", "적극활용", "만족도향상"],
        color: "text-blue-700",
        bgColor: "bg-blue-50 border-blue-200"
      },
      {
        score: 3,
        label: "부분 활용",
        behaviorDescription: "일부 고객 서비스 영역에서 AI 도구를 활용하고 있으나 전면적인 도입은 아직 이루어지지 않음",
        businessExample: "간단한 FAQ 챗봇 운영, 고객 문의 키워드 분석, 일부 자동 응답 기능",
        keywords: ["일부영역", "FAQ챗봇", "부분도입"],
        color: "text-yellow-700",
        bgColor: "bg-yellow-50 border-yellow-200"
      },
      {
        score: 2,
        label: "기초 수준",
        behaviorDescription: "매우 기본적인 자동 응답이나 간단한 챗봇 정도만 운영하고 있으며, 복잡한 문의는 여전히 수동 처리",
        businessExample: "기본 자동 응답 메시지, 간단한 안내 챗봇, 복잡한 문의는 직원이 직접 처리",
        keywords: ["기본자동응답", "간단챗봇", "수동처리"],
        color: "text-orange-700",
        bgColor: "bg-orange-50 border-orange-200"
      },
      {
        score: 1,
        label: "전혀 없음",
        behaviorDescription: "고객 서비스에 AI를 전혀 활용하지 않고 있으며, 모든 고객 응대를 수동으로 처리하고 있음",
        businessExample: "전화, 이메일만으로 고객 응대, AI 도구 사용 경험 없음, 모든 응답 수작업",
        keywords: ["AI미활용", "수동응대", "수작업처리"],
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200"
      }
    ]
  },

  // ===== 조직 준비도 영역 나머지 질문들 (18-24번) =====
  {
    questionId: 18,
    question: "AI 전담 조직이나 담당자가 있나요?",
    category: "organizationReadiness",
    indicators: [
      {
        score: 5,
        label: "전담 조직",
        behaviorDescription: "AI 전담 부서나 조직이 체계적으로 운영되고 있으며, 전문 인력과 충분한 권한을 가지고 AI 전략을 추진하고 있음",
        businessExample: "AI 사업부 또는 디지털혁신팀 운영, AI 전문가 5명 이상, 독립적 예산 권한, 전사 AI 전략 수립",
        keywords: ["전담부서", "전문인력", "독립예산", "전사전략"],
        color: "text-green-700",
        bgColor: "bg-green-50 border-green-200"
      },
      {
        score: 4,
        label: "전담 팀",
        behaviorDescription: "AI 전담 팀이 구성되어 있으며, AI 도입과 관리를 체계적으로 담당하고 있음",
        businessExample: "AI TF팀 구성, 전담 인력 2-3명, AI 프로젝트 전담 관리, 부서간 협력 조율",
        keywords: ["전담팀", "TF구성", "프로젝트관리"],
        color: "text-blue-700",
        bgColor: "bg-blue-50 border-blue-200"
      },
      {
        score: 3,
        label: "전담 담당자",
        behaviorDescription: "AI 업무를 전담하는 담당자가 지정되어 있으며, AI 관련 업무를 총괄하고 있음",
        businessExample: "AI 전담 담당자 1명 지정, AI 도입 계획 수립, 관련 업무 총괄",
        keywords: ["전담담당자", "업무총괄", "계획수립"],
        color: "text-yellow-700",
        bgColor: "bg-yellow-50 border-yellow-200"
      },
      {
        score: 2,
        label: "겸임 담당자",
        behaviorDescription: "다른 업무와 겸임하면서 AI 관련 업무를 담당하는 직원이 있으나, 전문성이나 시간 투입이 부족함",
        businessExample: "IT 담당자가 AI 업무 겸임, 다른 업무와 병행으로 집중도 부족",
        keywords: ["겸임담당", "시간부족", "집중도부족"],
        color: "text-orange-700",
        bgColor: "bg-orange-50 border-orange-200"
      },
      {
        score: 1,
        label: "전혀 없음",
        behaviorDescription: "AI 관련 전담 인력이 전혀 없으며, 필요시 임시로 누군가가 담당하는 수준",
        businessExample: "AI 담당자 미지정, 필요시 대표나 관리자가 임시 대응, 체계적 관리 부재",
        keywords: ["담당자없음", "임시대응", "체계적관리부재"],
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200"
      }
    ]
  },

  // ===== 기술 인프라 영역 나머지 질문들 (26-32번) =====
  {
    questionId: 26,
    question: "클라우드 서비스를 활용하고 있나요?",
    category: "techInfrastructure",
    indicators: [
      {
        score: 5,
        label: "완전 클라우드",
        behaviorDescription: "모든 시스템이 클라우드 네이티브로 구축되어 있고, 멀티클라우드 전략을 통해 최적화된 AI 서비스를 활용하고 있음",
        businessExample: "AWS, Azure, GCP 멀티클라우드 운영, 서버리스 아키텍처, 클라우드 AI 서비스 적극 활용",
        keywords: ["멀티클라우드", "서버리스", "클라우드AI활용"],
        color: "text-green-700",
        bgColor: "bg-green-50 border-green-200"
      },
      {
        score: 4,
        label: "적극 활용",
        behaviorDescription: "대부분의 시스템이 클라우드 기반으로 운영되고 있으며, 클라우드 AI 서비스도 활용하고 있음",
        businessExample: "주요 시스템 클라우드 이전 완료, Office 365/Google Workspace 활용, 클라우드 스토리지 적극 사용",
        keywords: ["시스템이전완료", "클라우드오피스", "적극사용"],
        color: "text-blue-700",
        bgColor: "bg-blue-50 border-blue-200"
      },
      {
        score: 3,
        label: "부분 활용",
        behaviorDescription: "일부 업무 시스템을 클라우드로 이전했으며, 기본적인 클라우드 서비스를 활용하고 있음",
        businessExample: "이메일, 파일 공유는 클라우드, 핵심 시스템은 온프레미스, 단계적 이전 진행 중",
        keywords: ["일부이전", "기본서비스", "단계적진행"],
        color: "text-yellow-700",
        bgColor: "bg-yellow-50 border-yellow-200"
      },
      {
        score: 2,
        label: "기초 활용",
        behaviorDescription: "이메일, 파일 저장 등 기본적인 클라우드 서비스만 사용하고 있으며, 대부분 시스템은 온프레미스",
        businessExample: "Gmail, 드롭박스 정도만 사용, 주요 업무는 여전히 로컬 서버, 클라우드 전환 계획 없음",
        keywords: ["기본서비스만", "로컬서버위주", "전환계획없음"],
        color: "text-orange-700",
        bgColor: "bg-orange-50 border-orange-200"
      },
      {
        score: 1,
        label: "전혀 사용 안함",
        behaviorDescription: "모든 시스템이 온프레미스로 운영되고 있으며, 클라우드 서비스에 대한 이해나 활용 경험이 없음",
        businessExample: "모든 시스템 자체 서버 운영, 클라우드 서비스 사용 경험 없음, 보안 우려로 도입 거부",
        keywords: ["온프레미스만", "경험없음", "도입거부"],
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200"
      }
    ]
  },

  // ===== 목표 명확성 영역 나머지 질문들 (34-40번) =====
  {
    questionId: 34,
    question: "AI 도입 우선순위가 명확한가요?",
    category: "goalClarity",
    indicators: [
      {
        score: 5,
        label: "매우 명확",
        behaviorDescription: "세부적이고 체계적인 우선순위가 수립되어 있으며, 단계별 로드맵과 연계하여 체계적으로 추진하고 있음",
        businessExample: "1단계: 고객서비스 AI, 2단계: 마케팅 자동화, 3단계: 데이터 분석 AI 순으로 명확한 우선순위와 일정",
        keywords: ["세부적우선순위", "단계별로드맵", "체계적추진"],
        color: "text-green-700",
        bgColor: "bg-green-50 border-green-200"
      },
      {
        score: 4,
        label: "명확",
        behaviorDescription: "AI 도입 우선순위가 명확하게 정해져 있고, 중요도와 시급성을 고려한 합리적인 순서가 수립됨",
        businessExample: "업무 효율성 개선 → 고객 서비스 → 데이터 분석 순으로 우선순위 설정, 각 단계별 목표 명확",
        keywords: ["명확한우선순위", "합리적순서", "단계별목표"],
        color: "text-blue-700",
        bgColor: "bg-blue-50 border-blue-200"
      },
      {
        score: 3,
        label: "보통",
        behaviorDescription: "대략적인 우선순위는 있으나 구체적인 기준이나 일정이 부족하고, 상황에 따라 변경되는 경우가 있음",
        businessExample: "중요한 영역부터 도입하겠다는 방향성은 있으나, 구체적 기준이나 일정 미정",
        keywords: ["대략적우선순위", "기준부족", "상황별변경"],
        color: "text-yellow-700",
        bgColor: "bg-yellow-50 border-yellow-200"
      },
      {
        score: 2,
        label: "불명확",
        behaviorDescription: "우선순위가 모호하고 일관성이 없으며, 즉흥적으로 결정되는 경우가 많음",
        businessExample: "상황에 따라 우선순위 변경, 일관된 기준 없음, 즉흥적 의사결정",
        keywords: ["모호한우선순위", "일관성없음", "즉흥적결정"],
        color: "text-orange-700",
        bgColor: "bg-orange-50 border-orange-200"
      },
      {
        score: 1,
        label: "전혀 불명확",
        behaviorDescription: "AI 도입 우선순위가 전혀 정해지지 않았고, 어떤 영역부터 시작해야 할지 방향성이 없음",
        businessExample: "우선순위 미설정, 어디서부터 시작할지 모르는 상태, 계획 없는 도입 시도",
        keywords: ["우선순위미설정", "방향성없음", "무계획도입"],
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200"
      }
    ]
  },

  // ===== 실행 역량 영역 나머지 질문들 (42-45번) =====
  {
    questionId: 42,
    question: "외부 전문가나 파트너와의 협력 경험이 있나요?",
    category: "executionCapability",
    indicators: [
      {
        score: 5,
        label: "전문적 경험",
        behaviorDescription: "다양한 외부 전문가 및 기술 파트너와 전략적 파트너십을 구축하고 있으며, AI 프로젝트에서도 효과적인 협력 경험이 풍부함",
        businessExample: "AI 컨설팅 회사와 장기 파트너십, 대학 연구소와 공동 연구, 글로벌 AI 기업과 기술 제휴",
        keywords: ["전략적파트너십", "장기협력", "효과적경험"],
        color: "text-green-700",
        bgColor: "bg-green-50 border-green-200"
      },
      {
        score: 4,
        label: "풍부한 경험",
        behaviorDescription: "다양한 외부 협력 프로젝트 경험이 있으며, 전문가와의 협업을 통해 성공적인 결과를 도출한 경험이 있음",
        businessExample: "IT 컨설팅 업체와 프로젝트 수행, 외부 개발업체와 시스템 구축, 전문가 자문 활용",
        keywords: ["다양한협력", "성공적결과", "전문가자문"],
        color: "text-blue-700",
        bgColor: "bg-blue-50 border-blue-200"
      },
      {
        score: 3,
        label: "일반적 경험",
        behaviorDescription: "기본적인 외부 협력 경험은 있으나 AI 분야에서의 전문적인 협력은 제한적임",
        businessExample: "일반적인 외주 업체와 협력 경험, 간단한 컨설팅 서비스 이용, AI 전문 협력은 부족",
        keywords: ["기본협력", "일반적외주", "AI전문부족"],
        color: "text-yellow-700",
        bgColor: "bg-yellow-50 border-yellow-200"
      },
      {
        score: 2,
        label: "제한적 경험",
        behaviorDescription: "간단한 외부 협력 경험만 있고, 복잡한 기술 프로젝트에서의 협력 경험이 부족함",
        businessExample: "단순 용역 업체 이용 경험, 복잡한 프로젝트 협력 경험 부족, 전문성 있는 파트너 부재",
        keywords: ["단순용역", "복잡프로젝트부족", "전문파트너부재"],
        color: "text-orange-700",
        bgColor: "bg-orange-50 border-orange-200"
      },
      {
        score: 1,
        label: "경험 없음",
        behaviorDescription: "외부 전문가나 파트너와의 협력 경험이 전혀 없으며, 모든 것을 자체적으로 해결하려는 경향이 강함",
        businessExample: "외부 협력 경험 전무, 모든 업무 자체 처리, 외부 도움 받는 것에 대한 거부감",
        keywords: ["협력경험전무", "자체처리", "외부도움거부"],
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200"
      }
    ]
  },

  {
    questionId: 43,
    question: "신기술 도입 시 시행착오를 통한 학습 역량은?",
    category: "executionCapability",
    indicators: [
      {
        score: 5,
        label: "매우 우수",
        behaviorDescription: "실패를 통해 빠르게 학습하고 개선하는 조직 문화가 확립되어 있으며, 실험적 접근을 통한 혁신을 적극 추진함",
        businessExample: "실패 허용 문화, 빠른 프로토타이핑, A/B 테스트 적극 활용, 실패 경험 공유 및 학습",
        keywords: ["실패허용문화", "빠른학습", "실험적접근"],
        color: "text-green-700",
        bgColor: "bg-green-50 border-green-200"
      },
      {
        score: 4,
        label: "우수",
        behaviorDescription: "문제 발생 시 적극적으로 해결책을 찾고 학습하며, 경험을 바탕으로 지속적인 개선을 추진함",
        businessExample: "문제 해결 프로세스 체계화, 경험 기반 개선, 교훈 도출 및 적용",
        keywords: ["적극적해결", "경험기반개선", "교훈적용"],
        color: "text-blue-700",
        bgColor: "bg-blue-50 border-blue-200"
      },
      {
        score: 3,
        label: "보통",
        behaviorDescription: "일반적인 수준의 문제 해결 능력을 가지고 있으나, 학습 속도나 개선 의지가 보통 수준임",
        businessExample: "기본적인 문제 해결, 점진적 개선, 안전한 범위 내에서의 시도",
        keywords: ["기본문제해결", "점진적개선", "안전범위시도"],
        color: "text-yellow-700",
        bgColor: "bg-yellow-50 border-yellow-200"
      },
      {
        score: 2,
        label: "부족",
        behaviorDescription: "문제 해결 능력이 부족하고, 실패에 대한 두려움으로 새로운 시도를 꺼리는 경향이 있음",
        businessExample: "문제 해결 어려움, 실패 두려움, 새로운 시도 회피, 기존 방식 고수",
        keywords: ["해결능력부족", "실패두려움", "시도회피"],
        color: "text-orange-700",
        bgColor: "bg-orange-50 border-orange-200"
      },
      {
        score: 1,
        label: "매우 부족",
        behaviorDescription: "실패 시 포기하거나 회피하는 경향이 강하고, 시행착오를 통한 학습보다는 안전한 방법만 선택함",
        businessExample: "실패시 포기, 시행착오 회피, 안전한 방법만 선택, 혁신 시도 기피",
        keywords: ["실패시포기", "시행착오회피", "혁신기피"],
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200"
      }
    ]
  },

  {
    questionId: 44,
    question: "지속적인 투자와 개선에 대한 의지는?",
    category: "executionCapability",
    indicators: [
      {
        score: 5,
        label: "매우 적극적",
        behaviorDescription: "혁신을 위한 지속적 투자를 최우선으로 하며, 장기적 관점에서 체계적인 개선 계획을 수립하고 실행함",
        businessExample: "연간 매출의 10% 이상 R&D 투자, 장기 혁신 로드맵 수립, 지속적 교육 투자",
        keywords: ["지속적투자최우선", "장기관점", "체계적계획"],
        color: "text-green-700",
        bgColor: "bg-green-50 border-green-200"
      },
      {
        score: 4,
        label: "적극적",
        behaviorDescription: "지속적인 개선과 투자에 적극적이며, 성과가 입증되면 추가 투자를 확대하는 의지가 있음",
        businessExample: "정기적 시스템 업그레이드, 직원 교육 투자, 성과 기반 투자 확대",
        keywords: ["적극적개선", "성과기반투자", "투자확대의지"],
        color: "text-blue-700",
        bgColor: "bg-blue-50 border-blue-200"
      },
      {
        score: 3,
        label: "보통",
        behaviorDescription: "일반적인 수준의 지속 투자 의지는 있으나, 즉각적인 효과가 보이지 않으면 투자를 줄이는 경향이 있음",
        businessExample: "필요시 투자, 단기 성과 중심, 예산 범위 내에서 개선",
        keywords: ["필요시투자", "단기성과중심", "예산범위내"],
        color: "text-yellow-700",
        bgColor: "bg-yellow-50 border-yellow-200"
      },
      {
        score: 2,
        label: "소극적",
        behaviorDescription: "필요시에만 최소한의 투자를 하며, 지속적인 개선보다는 현상 유지를 선호함",
        businessExample: "최소한 투자, 현상 유지 선호, 추가 투자에 소극적",
        keywords: ["최소한투자", "현상유지선호", "추가투자소극적"],
        color: "text-orange-700",
        bgColor: "bg-orange-50 border-orange-200"
      },
      {
        score: 1,
        label: "의지 없음",
        behaviorDescription: "일회성 도입 후 방치할 가능성이 높고, 지속적인 투자나 개선에 대한 의지가 전혀 없음",
        businessExample: "일회성 도입 후 방치, 유지보수 투자 기피, 개선 의지 전무",
        keywords: ["일회성도입", "방치가능성", "개선의지전무"],
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200"
      }
    ]
  },

  {
    questionId: 45,
    question: "AI 도입을 통한 조직 혁신 의지는 어떤가요?",
    category: "executionCapability",
    indicators: [
      {
        score: 5,
        label: "전면적 혁신",
        behaviorDescription: "AI를 중심으로 한 완전한 조직 혁신을 추진하며, 기존 업무 방식과 조직 구조를 근본적으로 변화시키려는 강한 의지를 가짐",
        businessExample: "AI 기반 조직 재편, 업무 프로세스 전면 재설계, 디지털 트랜스포메이션 선언",
        keywords: ["완전한혁신", "근본적변화", "디지털트랜스포메이션"],
        color: "text-green-700",
        bgColor: "bg-green-50 border-green-200"
      },
      {
        score: 4,
        label: "적극적 혁신",
        behaviorDescription: "AI를 통한 적극적인 조직 혁신을 추구하며, 변화에 대한 강한 의지와 추진력을 보유하고 있음",
        businessExample: "AI 중심 업무 혁신, 조직 문화 변화 추진, 혁신 프로젝트 적극 지원",
        keywords: ["적극적혁신", "강한의지", "혁신프로젝트"],
        color: "text-blue-700",
        bgColor: "bg-blue-50 border-blue-200"
      },
      {
        score: 3,
        label: "일반적 변화",
        behaviorDescription: "필요한 수준의 변화는 수용하지만 급진적인 혁신보다는 점진적인 개선을 선호함",
        businessExample: "필요한 변화 수용, 점진적 개선 추구, 안정적 변화 관리",
        keywords: ["필요한변화", "점진적개선", "안정적관리"],
        color: "text-yellow-700",
        bgColor: "bg-yellow-50 border-yellow-200"
      },
      {
        score: 2,
        label: "소극적 변화",
        behaviorDescription: "부분적이고 점진적인 변화만 추구하며, 기존 시스템과의 조화를 중시함",
        businessExample: "부분적 변화만 추구, 기존 시스템 유지, 최소한의 변화로 효과 추구",
        keywords: ["부분적변화", "기존시스템유지", "최소한변화"],
        color: "text-orange-700",
        bgColor: "bg-orange-50 border-orange-200"
      },
      {
        score: 1,
        label: "혁신 의지 없음",
        behaviorDescription: "기존 방식 유지를 최우선으로 하며, 최소한의 변화만 수용하고 혁신에 대한 의지가 전혀 없음",
        businessExample: "기존 방식 고수, 변화 저항, 혁신 시도 기피, 현상 유지 최우선",
        keywords: ["기존방식고수", "변화저항", "혁신기피"],
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200"
      }
    ]
  }
];

console.log('📝 나머지 BARS 질문 로드 완료:', REMAINING_BARS_QUESTIONS.length, '개');
