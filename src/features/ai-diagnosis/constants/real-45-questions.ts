/**
 * 🚀 AICAMP V13.0 ULTIMATE - 진짜 45문항 AI역량진단
 * 
 * 사용자 친화적인 개별 질문 시스템
 * - 한 번에 하나씩 질문 표시
 * - 직관적인 점수 선택 (1-5점)
 * - 모던한 UI/UX
 * - 모바일 반응형
 */

export interface RealQuestion {
  id: number;
  section: string;
  sectionTitle: string;
  question: string;
  description?: string;
  category: 'businessFoundation' | 'currentAI' | 'organizationReadiness' | 'techInfrastructure' | 'goalClarity' | 'executionCapability';
  weight: number;
  options: {
    value: number;
    label: string;
    description: string;
    emoji: string;
  }[];
}

export const REAL_45_QUESTIONS: RealQuestion[] = [
  // ================================================================================
  // 섹션 1: 사업 기반 (8문항) - businessFoundation
  // ================================================================================
  {
    id: 1,
    section: "사업기반",
    sectionTitle: "사업 기반 및 현황",
    category: "businessFoundation",
    weight: 1.0,
    question: "우리 회사의 사업 모델은 얼마나 명확하게 정의되어 있나요?",
    description: "사업의 핵심 가치 제안, 고객, 수익 구조가 명확한지 평가해주세요.",
    options: [
      { value: 1, label: "매우 불명확", description: "사업 모델이 전혀 정의되지 않음", emoji: "😕" },
      { value: 2, label: "불명확", description: "일부 요소만 정의되어 있음", emoji: "😐" },
      { value: 3, label: "보통", description: "기본적인 사업 모델은 있음", emoji: "🙂" },
      { value: 4, label: "명확", description: "대부분의 요소가 잘 정의됨", emoji: "😊" },
      { value: 5, label: "매우 명확", description: "모든 요소가 체계적으로 정의됨", emoji: "🤩" }
    ]
  },
  {
    id: 2,
    section: "사업기반",
    sectionTitle: "사업 기반 및 현황",
    category: "businessFoundation",
    weight: 1.1,
    question: "시장에서 우리 회사의 경쟁력은 어느 수준인가요?",
    description: "동종 업계 대비 우리 회사의 경쟁 우위와 시장 포지션을 평가해주세요.",
    options: [
      { value: 1, label: "매우 낮음", description: "경쟁력이 거의 없음", emoji: "😰" },
      { value: 2, label: "낮음", description: "경쟁사 대비 열세", emoji: "😟" },
      { value: 3, label: "보통", description: "평균적인 경쟁력", emoji: "😐" },
      { value: 4, label: "높음", description: "경쟁사 대비 우위", emoji: "😄" },
      { value: 5, label: "매우 높음", description: "시장 선도적 경쟁력", emoji: "🏆" }
    ]
  },
  {
    id: 3,
    section: "사업기반",
    sectionTitle: "사업 기반 및 현황",
    category: "businessFoundation",
    weight: 1.2,
    question: "고객 데이터를 체계적으로 수집하고 관리하고 있나요?",
    description: "고객 정보, 구매 패턴, 만족도 등의 데이터 관리 수준을 평가해주세요.",
    options: [
      { value: 1, label: "전혀 안함", description: "고객 데이터 관리 시스템 없음", emoji: "❌" },
      { value: 2, label: "기초 수준", description: "기본적인 고객 정보만 관리", emoji: "📝" },
      { value: 3, label: "보통", description: "일부 고객 데이터를 체계적으로 관리", emoji: "📊" },
      { value: 4, label: "잘 관리", description: "대부분의 고객 데이터를 체계적으로 관리", emoji: "📈" },
      { value: 5, label: "매우 잘 관리", description: "모든 고객 데이터를 통합적으로 관리", emoji: "🎯" }
    ]
  },
  {
    id: 4,
    section: "사업기반",
    sectionTitle: "사업 기반 및 현황",
    category: "businessFoundation",
    weight: 1.0,
    question: "매출과 수익성이 안정적으로 성장하고 있나요?",
    description: "최근 2-3년간의 매출 성장률과 수익성 개선 정도를 평가해주세요.",
    options: [
      { value: 1, label: "매우 불안정", description: "매출 감소 또는 적자 지속", emoji: "📉" },
      { value: 2, label: "불안정", description: "매출 변동이 크고 수익성 낮음", emoji: "📊" },
      { value: 3, label: "보통", description: "매출은 유지되나 성장률 낮음", emoji: "➡️" },
      { value: 4, label: "안정적 성장", description: "꾸준한 매출 성장과 수익성 개선", emoji: "📈" },
      { value: 5, label: "높은 성장", description: "지속적인 고성장과 높은 수익성", emoji: "🚀" }
    ]
  },
  {
    id: 5,
    section: "사업기반",
    sectionTitle: "사업 기반 및 현황",
    category: "businessFoundation",
    weight: 1.1,
    question: "주요 사업 프로세스가 문서화되어 있나요?",
    description: "핵심 업무 절차, 워크플로우, 매뉴얼 등의 문서화 수준을 평가해주세요.",
    options: [
      { value: 1, label: "전혀 없음", description: "문서화된 프로세스가 없음", emoji: "❌" },
      { value: 2, label: "일부만", description: "중요한 프로세스 일부만 문서화", emoji: "📄" },
      { value: 3, label: "보통", description: "주요 프로세스의 절반 정도 문서화", emoji: "📚" },
      { value: 4, label: "대부분", description: "대부분의 핵심 프로세스가 문서화", emoji: "📋" },
      { value: 5, label: "완벽", description: "모든 프로세스가 체계적으로 문서화", emoji: "📖" }
    ]
  },
  {
    id: 6,
    section: "사업기반",
    sectionTitle: "사업 기반 및 현황",
    category: "businessFoundation",
    weight: 1.0,
    question: "품질 관리 시스템이 체계적으로 운영되고 있나요?",
    description: "제품/서비스의 품질 관리, 검증, 개선 시스템의 운영 수준을 평가해주세요.",
    options: [
      { value: 1, label: "시스템 없음", description: "체계적인 품질 관리 시스템 없음", emoji: "⚠️" },
      { value: 2, label: "기초 수준", description: "기본적인 품질 검사만 실시", emoji: "🔍" },
      { value: 3, label: "보통", description: "일부 품질 관리 시스템 운영", emoji: "✅" },
      { value: 4, label: "체계적", description: "대부분의 영역에서 체계적 품질 관리", emoji: "🎯" },
      { value: 5, label: "최고 수준", description: "모든 영역에서 최고 수준의 품질 관리", emoji: "🏆" }
    ]
  },
  {
    id: 7,
    section: "사업기반",
    sectionTitle: "사업 기반 및 현황",
    category: "businessFoundation",
    weight: 1.1,
    question: "리스크 관리 체계가 구축되어 있나요?",
    description: "사업 운영상의 위험 요소 식별, 평가, 대응 체계의 구축 수준을 평가해주세요.",
    options: [
      { value: 1, label: "전혀 없음", description: "리스크 관리 체계 없음", emoji: "🚨" },
      { value: 2, label: "기초 수준", description: "주요 리스크만 인식하고 있음", emoji: "⚡" },
      { value: 3, label: "보통", description: "일부 리스크에 대한 대응책 마련", emoji: "🛡️" },
      { value: 4, label: "체계적", description: "대부분의 리스크를 체계적으로 관리", emoji: "🔒" },
      { value: 5, label: "완벽", description: "모든 리스크를 예방적으로 관리", emoji: "🏰" }
    ]
  },
  {
    id: 8,
    section: "사업기반",
    sectionTitle: "사업 기반 및 현황",
    category: "businessFoundation",
    weight: 1.2,
    question: "혁신과 변화에 대한 조직의 수용성은 어떤가요?",
    description: "새로운 기술, 프로세스, 사업 방식에 대한 조직의 개방성과 적응력을 평가해주세요.",
    options: [
      { value: 1, label: "매우 보수적", description: "변화를 극도로 기피함", emoji: "🐌" },
      { value: 2, label: "보수적", description: "변화에 소극적이고 저항적", emoji: "😤" },
      { value: 3, label: "보통", description: "필요시에만 변화를 수용", emoji: "🤔" },
      { value: 4, label: "개방적", description: "변화를 적극적으로 수용", emoji: "🌟" },
      { value: 5, label: "매우 혁신적", description: "변화를 선도하고 혁신을 추구", emoji: "🚀" }
    ]
  },

  // ================================================================================
  // 섹션 2: 현재 AI 활용 (8문항) - currentAI
  // ================================================================================
  {
    id: 9,
    section: "현재AI활용",
    sectionTitle: "현재 AI 기술 활용 현황",
    category: "currentAI",
    weight: 1.3,
    question: "현재 AI 기술을 업무에 활용하고 있나요?",
    description: "ChatGPT, 자동화 도구, AI 소프트웨어 등의 실제 업무 활용 수준을 평가해주세요.",
    options: [
      { value: 1, label: "전혀 사용 안함", description: "AI 기술을 전혀 사용하지 않음", emoji: "❌" },
      { value: 2, label: "개인적 사용", description: "일부 직원이 개인적으로만 사용", emoji: "👤" },
      { value: 3, label: "부분적 사용", description: "특정 업무에서 가끔 활용", emoji: "🔧" },
      { value: 4, label: "적극적 사용", description: "여러 업무 영역에서 정기적으로 활용", emoji: "⚡" },
      { value: 5, label: "전면적 활용", description: "대부분의 업무에서 체계적으로 활용", emoji: "🤖" }
    ]
  },
  {
    id: 10,
    section: "현재AI활용",
    sectionTitle: "현재 AI 기술 활용 현황",
    category: "currentAI",
    weight: 1.4,
    question: "AI를 활용한 업무 자동화 수준은 어떤가요?",
    description: "반복적인 업무, 데이터 처리, 고객 응대 등의 자동화 구현 정도를 평가해주세요.",
    options: [
      { value: 1, label: "자동화 없음", description: "모든 업무를 수작업으로 처리", emoji: "✋" },
      { value: 2, label: "기초 자동화", description: "단순한 작업만 일부 자동화", emoji: "🔄" },
      { value: 3, label: "부분 자동화", description: "주요 업무의 일부가 자동화됨", emoji: "⚙️" },
      { value: 4, label: "상당한 자동화", description: "많은 업무가 자동화되어 운영", emoji: "🎯" },
      { value: 5, label: "고도 자동화", description: "대부분의 업무가 AI로 자동화", emoji: "🚀" }
    ]
  },
  {
    id: 11,
    section: "현재AI활용",
    sectionTitle: "현재 AI 기술 활용 현황",
    category: "currentAI",
    weight: 1.5,
    question: "AI 도구 사용에 대한 직원들의 숙련도는?",
    description: "직원들의 AI 도구 활용 능력과 이해도 수준을 평가해주세요.",
    options: [
      { value: 1, label: "매우 낮음", description: "대부분의 직원이 AI 도구를 사용할 수 없음", emoji: "😰" },
      { value: 2, label: "낮음", description: "소수의 직원만 기본적 사용 가능", emoji: "🤷" },
      { value: 3, label: "보통", description: "절반 정도의 직원이 기본 활용 가능", emoji: "👥" },
      { value: 4, label: "높음", description: "대부분의 직원이 능숙하게 활용", emoji: "👍" },
      { value: 5, label: "매우 높음", description: "모든 직원이 고급 AI 도구까지 활용", emoji: "🎓" }
    ]
  },
  {
    id: 12,
    section: "현재AI활용",
    sectionTitle: "현재 AI 기술 활용 현황",
    category: "currentAI",
    weight: 1.3,
    question: "AI 활용으로 인한 생산성 향상 효과를 체감하고 있나요?",
    description: "AI 도구 사용으로 인한 업무 효율성, 시간 단축, 품질 개선 등의 효과를 평가해주세요.",
    options: [
      { value: 1, label: "효과 없음", description: "생산성 향상 효과를 전혀 느끼지 못함", emoji: "😑" },
      { value: 2, label: "미미한 효과", description: "약간의 효과는 있지만 미미함", emoji: "🤏" },
      { value: 3, label: "보통 효과", description: "일부 업무에서 눈에 띄는 개선", emoji: "📈" },
      { value: 4, label: "상당한 효과", description: "여러 업무에서 뚜렷한 생산성 향상", emoji: "⚡" },
      { value: 5, label: "혁신적 효과", description: "업무 방식이 혁신적으로 개선됨", emoji: "🚀" }
    ]
  },
  {
    id: 13,
    section: "현재AI활용",
    sectionTitle: "현재 AI 기술 활용 현황",
    category: "currentAI",
    weight: 1.4,
    question: "고객 서비스에 AI를 활용하고 있나요?",
    description: "챗봇, 자동 응답, 개인화 추천 등 고객 대면 서비스에서의 AI 활용도를 평가해주세요.",
    options: [
      { value: 1, label: "전혀 없음", description: "고객 서비스에 AI를 전혀 사용하지 않음", emoji: "❌" },
      { value: 2, label: "기초 수준", description: "간단한 FAQ 자동 응답 정도만 사용", emoji: "💬" },
      { value: 3, label: "부분 활용", description: "일부 고객 서비스에 AI 도구 활용", emoji: "🤖" },
      { value: 4, label: "적극 활용", description: "다양한 고객 접점에서 AI 적극 활용", emoji: "🎯" },
      { value: 5, label: "완전 통합", description: "모든 고객 서비스가 AI와 완전히 통합", emoji: "🌟" }
    ]
  },
  {
    id: 14,
    section: "현재AI활용",
    sectionTitle: "현재 AI 기술 활용 현황",
    category: "currentAI",
    weight: 1.3,
    question: "데이터 분석에 AI를 활용하고 있나요?",
    description: "매출 분석, 고객 분석, 시장 분석 등에서 AI 기반 데이터 분석 도구의 활용 수준을 평가해주세요.",
    options: [
      { value: 1, label: "전혀 없음", description: "수작업으로만 데이터 분석", emoji: "📊" },
      { value: 2, label: "기초 도구", description: "엑셀 등 기본 도구로만 분석", emoji: "📈" },
      { value: 3, label: "일부 활용", description: "간단한 AI 분석 도구를 가끔 사용", emoji: "🔍" },
      { value: 4, label: "적극 활용", description: "다양한 AI 분석 도구를 정기적으로 활용", emoji: "📉" },
      { value: 5, label: "고도 활용", description: "고급 AI 분석으로 인사이트 도출", emoji: "🧠" }
    ]
  },
  {
    id: 15,
    section: "현재AI활용",
    sectionTitle: "현재 AI 기술 활용 현황",
    category: "currentAI",
    weight: 1.4,
    question: "마케팅과 영업에 AI를 활용하고 있나요?",
    description: "개인화 마케팅, 고객 세분화, 영업 예측 등에서 AI 활용 수준을 평가해주세요.",
    options: [
      { value: 1, label: "전혀 없음", description: "전통적인 마케팅/영업 방식만 사용", emoji: "📢" },
      { value: 2, label: "기초 활용", description: "이메일 자동화 등 기본적인 도구만 사용", emoji: "📧" },
      { value: 3, label: "부분 활용", description: "일부 마케팅/영업 활동에 AI 도구 활용", emoji: "🎯" },
      { value: 4, label: "적극 활용", description: "대부분의 마케팅/영업에 AI 적극 활용", emoji: "🚀" },
      { value: 5, label: "완전 통합", description: "AI 기반 마케팅/영업 시스템 완전 구축", emoji: "🌟" }
    ]
  },
  {
    id: 16,
    section: "현재AI활용",
    sectionTitle: "현재 AI 기술 활용 현황",
    category: "currentAI",
    weight: 1.5,
    question: "AI 도입으로 인한 비용 절감 효과를 측정하고 있나요?",
    description: "AI 활용으로 인한 인건비, 운영비, 시간 절약 등의 정량적 효과 측정 여부를 평가해주세요.",
    options: [
      { value: 1, label: "측정 안함", description: "비용 절감 효과를 전혀 측정하지 않음", emoji: "❓" },
      { value: 2, label: "대략적 파악", description: "대략적으로만 효과를 체감", emoji: "🤔" },
      { value: 3, label: "부분적 측정", description: "일부 영역에서만 효과를 정량적으로 측정", emoji: "📊" },
      { value: 4, label: "체계적 측정", description: "대부분의 AI 활용 효과를 체계적으로 측정", emoji: "📈" },
      { value: 5, label: "완벽한 측정", description: "모든 AI 투자의 ROI를 정확히 측정", emoji: "💎" }
    ]
  },

  // ================================================================================
  // 섹션 3: 조직 준비도 (8문항) - organizationReadiness
  // ================================================================================
  {
    id: 17,
    section: "조직준비도",
    sectionTitle: "AI 도입을 위한 조직 준비도",
    category: "organizationReadiness",
    weight: 1.2,
    question: "경영진의 AI 도입에 대한 의지는 어느 정도인가요?",
    description: "CEO, 임원진의 AI 기술 도입에 대한 관심도와 투자 의지를 평가해주세요.",
    options: [
      { value: 1, label: "전혀 없음", description: "경영진이 AI에 관심이 전혀 없음", emoji: "😴" },
      { value: 2, label: "소극적", description: "필요성은 인정하지만 소극적", emoji: "🤷" },
      { value: 3, label: "보통", description: "관심은 있지만 구체적 계획은 없음", emoji: "🤔" },
      { value: 4, label: "적극적", description: "AI 도입에 적극적이고 투자 의지 있음", emoji: "💪" },
      { value: 5, label: "매우 적극적", description: "AI를 핵심 전략으로 추진 중", emoji: "🚀" }
    ]
  },
  {
    id: 18,
    section: "조직준비도",
    sectionTitle: "AI 도입을 위한 조직 준비도",
    category: "organizationReadiness",
    weight: 1.3,
    question: "AI 전담 조직이나 담당자가 있나요?",
    description: "AI 기술 도입과 관리를 전담하는 조직, 팀, 또는 담당자의 존재 여부를 평가해주세요.",
    options: [
      { value: 1, label: "전혀 없음", description: "AI 관련 전담 인력이 전혀 없음", emoji: "❌" },
      { value: 2, label: "겸임 담당자", description: "다른 업무와 겸임하는 담당자만 있음", emoji: "👤" },
      { value: 3, label: "전담 담당자", description: "AI 업무를 전담하는 담당자가 있음", emoji: "👨‍💼" },
      { value: 4, label: "전담 팀", description: "AI 전담 팀이 구성되어 있음", emoji: "👥" },
      { value: 5, label: "전담 조직", description: "AI 전담 부서나 조직이 체계적으로 운영", emoji: "🏢" }
    ]
  },
  {
    id: 19,
    section: "조직준비도",
    sectionTitle: "AI 도입을 위한 조직 준비도",
    category: "organizationReadiness",
    weight: 1.1,
    question: "직원들의 새로운 기술 학습에 대한 의지는?",
    description: "직원들이 AI 등 새로운 기술을 배우고 활용하려는 의지와 적극성을 평가해주세요.",
    options: [
      { value: 1, label: "매우 소극적", description: "대부분의 직원이 새 기술 학습을 기피", emoji: "😰" },
      { value: 2, label: "소극적", description: "일부 직원만 새 기술에 관심", emoji: "😐" },
      { value: 3, label: "보통", description: "절반 정도의 직원이 학습 의지 있음", emoji: "🙂" },
      { value: 4, label: "적극적", description: "대부분의 직원이 새 기술 학습에 적극적", emoji: "😊" },
      { value: 5, label: "매우 적극적", description: "모든 직원이 새 기술 습득에 열정적", emoji: "🤩" }
    ]
  },
  {
    id: 20,
    section: "조직준비도",
    sectionTitle: "AI 도입을 위한 조직 준비도",
    category: "organizationReadiness",
    weight: 1.2,
    question: "변화 관리(Change Management) 역량은 어떤가요?",
    description: "조직 내 새로운 시스템이나 프로세스 도입 시 변화를 관리하고 적응시키는 역량을 평가해주세요.",
    options: [
      { value: 1, label: "매우 부족", description: "변화 관리 경험과 역량이 전혀 없음", emoji: "🌪️" },
      { value: 2, label: "부족", description: "변화 관리가 어렵고 저항이 큼", emoji: "😤" },
      { value: 3, label: "보통", description: "기본적인 변화 관리는 가능", emoji: "⚖️" },
      { value: 4, label: "우수", description: "체계적인 변화 관리 프로세스 보유", emoji: "🎯" },
      { value: 5, label: "매우 우수", description: "변화를 선도하고 혁신을 주도", emoji: "🌟" }
    ]
  },
  {
    id: 21,
    section: "조직준비도",
    sectionTitle: "AI 도입을 위한 조직 준비도",
    category: "organizationReadiness",
    weight: 1.3,
    question: "교육 및 훈련 시스템이 체계적으로 구축되어 있나요?",
    description: "직원 교육, 스킬 개발, 지식 공유를 위한 체계적인 시스템의 구축 수준을 평가해주세요.",
    options: [
      { value: 1, label: "시스템 없음", description: "체계적인 교육 시스템이 전혀 없음", emoji: "❌" },
      { value: 2, label: "기초 수준", description: "필요시에만 임시적으로 교육 실시", emoji: "📚" },
      { value: 3, label: "부분적", description: "일부 영역에서 정기적인 교육 실시", emoji: "🎓" },
      { value: 4, label: "체계적", description: "대부분의 영역에서 체계적인 교육 운영", emoji: "🏫" },
      { value: 5, label: "최고 수준", description: "모든 영역에서 최고 수준의 교육 시스템", emoji: "🎯" }
    ]
  },
  {
    id: 22,
    section: "조직준비도",
    sectionTitle: "AI 도입을 위한 조직 준비도",
    category: "organizationReadiness",
    weight: 1.1,
    question: "부서 간 협업과 소통은 원활한가요?",
    description: "AI 도입 시 필요한 부서 간 협력, 정보 공유, 의사소통의 원활함을 평가해주세요.",
    options: [
      { value: 1, label: "매우 어려움", description: "부서 간 소통이 거의 불가능", emoji: "🚧" },
      { value: 2, label: "어려움", description: "부서 간 협업이 어렵고 소통 부족", emoji: "😕" },
      { value: 3, label: "보통", description: "필요시 부서 간 협업 가능", emoji: "🤝" },
      { value: 4, label: "원활함", description: "부서 간 협업과 소통이 원활", emoji: "💬" },
      { value: 5, label: "매우 원활함", description: "모든 부서가 유기적으로 협력", emoji: "🌐" }
    ]
  },
  {
    id: 23,
    section: "조직준비도",
    sectionTitle: "AI 도입을 위한 조직 준비도",
    category: "organizationReadiness",
    weight: 1.2,
    question: "성과 측정 및 평가 체계가 구축되어 있나요?",
    description: "AI 도입 효과를 측정하고 평가할 수 있는 체계적인 시스템의 구축 여부를 평가해주세요.",
    options: [
      { value: 1, label: "전혀 없음", description: "성과 측정 체계가 전혀 없음", emoji: "❓" },
      { value: 2, label: "기초 수준", description: "기본적인 성과 지표만 관리", emoji: "📊" },
      { value: 3, label: "부분적", description: "일부 영역에서 체계적인 성과 측정", emoji: "📈" },
      { value: 4, label: "체계적", description: "대부분의 영역에서 체계적인 성과 관리", emoji: "🎯" },
      { value: 5, label: "완벽함", description: "모든 영역에서 완벽한 성과 측정 시스템", emoji: "💎" }
    ]
  },
  {
    id: 24,
    section: "조직준비도",
    sectionTitle: "AI 도입을 위한 조직 준비도",
    category: "organizationReadiness",
    weight: 1.3,
    question: "의사결정 프로세스가 신속하고 효율적인가요?",
    description: "AI 도입과 관련된 의사결정이 신속하게 이루어질 수 있는 조직 체계를 평가해주세요.",
    options: [
      { value: 1, label: "매우 느림", description: "의사결정이 매우 느리고 복잡함", emoji: "🐌" },
      { value: 2, label: "느림", description: "의사결정에 시간이 오래 걸림", emoji: "⏰" },
      { value: 3, label: "보통", description: "일반적인 속도로 의사결정", emoji: "⚖️" },
      { value: 4, label: "신속함", description: "대부분의 의사결정이 신속하게 이루어짐", emoji: "⚡" },
      { value: 5, label: "매우 신속함", description: "모든 의사결정이 매우 신속하고 효율적", emoji: "🚀" }
    ]
  },

  // ================================================================================
  // 섹션 4: 기술 인프라 (8문항) - techInfrastructure
  // ================================================================================
  {
    id: 25,
    section: "기술인프라",
    sectionTitle: "기술 인프라 및 IT 역량",
    category: "techInfrastructure",
    weight: 1.4,
    question: "현재 IT 인프라의 전반적인 수준은?",
    description: "서버, 네트워크, 보안 등 전반적인 IT 인프라의 현대화 수준을 평가해주세요.",
    options: [
      { value: 1, label: "매우 노후", description: "대부분의 IT 시설이 노후화됨", emoji: "🏚️" },
      { value: 2, label: "노후", description: "일부 시설이 노후화되어 교체 필요", emoji: "🔧" },
      { value: 3, label: "보통", description: "기본적인 IT 인프라는 갖춰져 있음", emoji: "🏢" },
      { value: 4, label: "현대적", description: "대부분의 IT 인프라가 현대적", emoji: "💻" },
      { value: 5, label: "최첨단", description: "최신 기술의 첨단 IT 인프라 보유", emoji: "🚀" }
    ]
  },
  {
    id: 26,
    section: "기술인프라",
    sectionTitle: "기술 인프라 및 IT 역량",
    category: "techInfrastructure",
    weight: 1.5,
    question: "클라우드 서비스를 활용하고 있나요?",
    description: "AWS, Azure, Google Cloud 등 클라우드 서비스의 활용 수준을 평가해주세요.",
    options: [
      { value: 1, label: "전혀 사용 안함", description: "모든 시스템이 온프레미스", emoji: "🏠" },
      { value: 2, label: "기초 활용", description: "이메일, 파일 저장 등 기본 서비스만 사용", emoji: "📧" },
      { value: 3, label: "부분 활용", description: "일부 업무 시스템을 클라우드로 이전", emoji: "☁️" },
      { value: 4, label: "적극 활용", description: "대부분의 시스템이 클라우드 기반", emoji: "🌐" },
      { value: 5, label: "완전 클라우드", description: "모든 시스템이 클라우드 네이티브", emoji: "☁️⚡" }
    ]
  },
  {
    id: 27,
    section: "기술인프라",
    sectionTitle: "기술 인프라 및 IT 역량",
    category: "techInfrastructure",
    weight: 1.3,
    question: "데이터 관리 시스템이 체계적으로 구축되어 있나요?",
    description: "데이터베이스, 데이터 웨어하우스, 데이터 거버넌스 등의 구축 수준을 평가해주세요.",
    options: [
      { value: 1, label: "시스템 없음", description: "체계적인 데이터 관리 시스템 없음", emoji: "📁" },
      { value: 2, label: "기초 수준", description: "기본적인 데이터베이스만 운영", emoji: "🗃️" },
      { value: 3, label: "부분적", description: "일부 영역에서 체계적인 데이터 관리", emoji: "📊" },
      { value: 4, label: "체계적", description: "대부분의 데이터가 체계적으로 관리", emoji: "🏗️" },
      { value: 5, label: "최고 수준", description: "모든 데이터가 통합적으로 관리", emoji: "🏛️" }
    ]
  },
  {
    id: 28,
    section: "기술인프라",
    sectionTitle: "기술 인프라 및 IT 역량",
    category: "techInfrastructure",
    weight: 1.4,
    question: "사이버 보안 체계가 잘 구축되어 있나요?",
    description: "해킹 방지, 데이터 보호, 보안 정책 등의 사이버 보안 수준을 평가해주세요.",
    options: [
      { value: 1, label: "매우 취약", description: "보안 시스템이 거의 없어 매우 취약", emoji: "🚨" },
      { value: 2, label: "취약", description: "기본적인 보안만 있어 취약함", emoji: "⚠️" },
      { value: 3, label: "보통", description: "일반적인 수준의 보안 체계", emoji: "🔒" },
      { value: 4, label: "강화됨", description: "체계적이고 강화된 보안 시스템", emoji: "🛡️" },
      { value: 5, label: "최고 수준", description: "최고 수준의 사이버 보안 체계", emoji: "🏰" }
    ]
  },
  {
    id: 29,
    section: "기술인프라",
    sectionTitle: "기술 인프라 및 IT 역량",
    category: "techInfrastructure",
    weight: 1.5,
    question: "시스템 통합 수준은 어떤가요?",
    description: "각종 업무 시스템 간의 연동과 통합 수준을 평가해주세요.",
    options: [
      { value: 1, label: "완전 분리", description: "모든 시스템이 독립적으로 운영", emoji: "🏝️" },
      { value: 2, label: "부분 연동", description: "일부 시스템만 연동되어 있음", emoji: "🔗" },
      { value: 3, label: "기본 통합", description: "주요 시스템 간 기본적인 통합", emoji: "🌉" },
      { value: 4, label: "높은 통합", description: "대부분의 시스템이 잘 통합됨", emoji: "🌐" },
      { value: 5, label: "완전 통합", description: "모든 시스템이 완전히 통합된 플랫폼", emoji: "🎯" }
    ]
  },
  {
    id: 30,
    section: "기술인프라",
    sectionTitle: "기술 인프라 및 IT 역량",
    category: "techInfrastructure",
    weight: 1.3,
    question: "IT 전문 인력이 충분한가요?",
    description: "시스템 개발, 운영, 보안 등을 담당할 IT 전문 인력의 보유 수준을 평가해주세요.",
    options: [
      { value: 1, label: "매우 부족", description: "IT 전문 인력이 거의 없음", emoji: "❌" },
      { value: 2, label: "부족", description: "기본적인 IT 업무만 처리 가능한 수준", emoji: "👤" },
      { value: 3, label: "보통", description: "일반적인 IT 업무 처리는 가능", emoji: "👥" },
      { value: 4, label: "충분", description: "대부분의 IT 업무를 자체적으로 처리", emoji: "👨‍💻" },
      { value: 5, label: "매우 충분", description: "고급 IT 업무까지 모두 자체 처리", emoji: "🎓" }
    ]
  },
  {
    id: 31,
    section: "기술인프라",
    sectionTitle: "기술 인프라 및 IT 역량",
    category: "techInfrastructure",
    weight: 1.4,
    question: "모바일 및 원격 근무 환경이 구축되어 있나요?",
    description: "모바일 앱, 원격 접속, 협업 도구 등의 구축 수준을 평가해주세요.",
    options: [
      { value: 1, label: "전혀 없음", description: "모바일/원격 근무 환경이 전혀 없음", emoji: "🏢" },
      { value: 2, label: "기초 수준", description: "기본적인 이메일, 메신저만 가능", emoji: "📧" },
      { value: 3, label: "부분적", description: "일부 업무만 모바일/원격으로 가능", emoji: "📱" },
      { value: 4, label: "잘 구축", description: "대부분의 업무가 모바일/원격으로 가능", emoji: "💻" },
      { value: 5, label: "완벽 구축", description: "모든 업무가 언제 어디서나 가능", emoji: "🌐" }
    ]
  },
  {
    id: 32,
    section: "기술인프라",
    sectionTitle: "기술 인프라 및 IT 역량",
    category: "techInfrastructure",
    weight: 1.5,
    question: "API 및 시스템 확장성은 어떤가요?",
    description: "새로운 시스템 도입 시 기존 시스템과의 연동 가능성과 확장성을 평가해주세요.",
    options: [
      { value: 1, label: "매우 어려움", description: "시스템 확장이나 연동이 거의 불가능", emoji: "🚧" },
      { value: 2, label: "어려움", description: "시스템 확장에 많은 시간과 비용 필요", emoji: "⚠️" },
      { value: 3, label: "보통", description: "일반적인 수준의 확장성", emoji: "🔧" },
      { value: 4, label: "우수", description: "새로운 시스템 연동이 비교적 용이", emoji: "🔗" },
      { value: 5, label: "매우 우수", description: "모든 시스템이 쉽게 확장 및 연동 가능", emoji: "🚀" }
    ]
  },

  // ================================================================================
  // 섹션 5: 목표 명확성 (8문항) - goalClarity
  // ================================================================================
  {
    id: 33,
    section: "목표명확성",
    sectionTitle: "AI 도입 목표 및 전략",
    category: "goalClarity",
    weight: 1.1,
    question: "AI 도입의 구체적인 목표가 설정되어 있나요?",
    description: "AI 기술 도입을 통해 달성하고자 하는 구체적이고 측정 가능한 목표의 명확성을 평가해주세요.",
    options: [
      { value: 1, label: "목표 없음", description: "AI 도입 목표가 전혀 설정되지 않음", emoji: "❓" },
      { value: 2, label: "모호한 목표", description: "막연하고 추상적인 목표만 있음", emoji: "🌫️" },
      { value: 3, label: "일반적 목표", description: "일반적인 수준의 목표는 설정됨", emoji: "🎯" },
      { value: 4, label: "구체적 목표", description: "구체적이고 측정 가능한 목표 설정", emoji: "📊" },
      { value: 5, label: "매우 명확", description: "매우 구체적이고 달성 가능한 목표", emoji: "🏆" }
    ]
  },
  {
    id: 34,
    section: "목표명확성",
    sectionTitle: "AI 도입 목표 및 전략",
    category: "goalClarity",
    weight: 1.2,
    question: "AI 도입 우선순위가 명확한가요?",
    description: "어떤 업무나 영역에 AI를 우선적으로 도입할지에 대한 우선순위가 명확한지 평가해주세요.",
    options: [
      { value: 1, label: "전혀 불명확", description: "우선순위가 전혀 정해지지 않음", emoji: "🤷" },
      { value: 2, label: "불명확", description: "우선순위가 모호하고 일관성 없음", emoji: "🌪️" },
      { value: 3, label: "보통", description: "대략적인 우선순위는 있음", emoji: "📋" },
      { value: 4, label: "명확", description: "우선순위가 명확하게 정해져 있음", emoji: "📈" },
      { value: 5, label: "매우 명확", description: "세부적이고 체계적인 우선순위 수립", emoji: "🎯" }
    ]
  },
  {
    id: 35,
    section: "목표명확성",
    sectionTitle: "AI 도입 목표 및 전략",
    category: "goalClarity",
    weight: 1.3,
    question: "AI 도입 예산이 구체적으로 계획되어 있나요?",
    description: "AI 기술 도입에 필요한 예산이 구체적으로 계획되고 승인되어 있는지 평가해주세요.",
    options: [
      { value: 1, label: "예산 없음", description: "AI 도입 예산이 전혀 계획되지 않음", emoji: "💸" },
      { value: 2, label: "막연한 계획", description: "대략적인 예산 규모만 생각하고 있음", emoji: "🤔" },
      { value: 3, label: "기본 계획", description: "기본적인 예산 계획은 수립됨", emoji: "💰" },
      { value: 4, label: "구체적 계획", description: "구체적인 예산이 계획되고 승인됨", emoji: "💎" },
      { value: 5, label: "완벽한 계획", description: "단계별 상세 예산이 완벽하게 계획됨", emoji: "📊" }
    ]
  },
  {
    id: 36,
    section: "목표명확성",
    sectionTitle: "AI 도입 목표 및 전략",
    category: "goalClarity",
    weight: 1.1,
    question: "AI 도입 일정과 로드맵이 수립되어 있나요?",
    description: "AI 기술 도입의 단계별 일정과 구체적인 실행 로드맵의 수립 여부를 평가해주세요.",
    options: [
      { value: 1, label: "계획 없음", description: "일정이나 로드맵이 전혀 없음", emoji: "❌" },
      { value: 2, label: "막연한 계획", description: "대략적인 일정만 생각하고 있음", emoji: "📅" },
      { value: 3, label: "기본 계획", description: "기본적인 로드맵은 수립됨", emoji: "🗺️" },
      { value: 4, label: "구체적 계획", description: "구체적인 단계별 일정이 수립됨", emoji: "📈" },
      { value: 5, label: "완벽한 계획", description: "매우 상세하고 현실적인 로드맵 완성", emoji: "🎯" }
    ]
  },
  {
    id: 37,
    section: "목표명확성",
    sectionTitle: "AI 도입 목표 및 전략",
    category: "goalClarity",
    weight: 1.2,
    question: "AI 도입 성공 기준이 명확한가요?",
    description: "AI 도입이 성공했다고 판단할 수 있는 구체적인 기준과 지표가 설정되어 있는지 평가해주세요.",
    options: [
      { value: 1, label: "기준 없음", description: "성공 기준이 전혀 설정되지 않음", emoji: "❓" },
      { value: 2, label: "모호한 기준", description: "막연하고 주관적인 기준만 있음", emoji: "🌫️" },
      { value: 3, label: "일반적 기준", description: "일반적인 수준의 성공 기준 설정", emoji: "📏" },
      { value: 4, label: "명확한 기준", description: "구체적이고 측정 가능한 성공 기준", emoji: "📊" },
      { value: 5, label: "완벽한 기준", description: "매우 구체적이고 체계적인 성공 지표", emoji: "🎯" }
    ]
  },
  {
    id: 38,
    section: "목표명확성",
    sectionTitle: "AI 도입 목표 및 전략",
    category: "goalClarity",
    weight: 1.1,
    question: "경쟁사 분석을 통한 AI 전략이 수립되어 있나요?",
    description: "경쟁사의 AI 활용 현황을 분석하고 이를 바탕으로 한 차별화 전략이 있는지 평가해주세요.",
    options: [
      { value: 1, label: "분석 없음", description: "경쟁사 AI 현황을 전혀 파악하지 못함", emoji: "👁️‍🗨️" },
      { value: 2, label: "기초 파악", description: "경쟁사 현황을 대략적으로만 파악", emoji: "🔍" },
      { value: 3, label: "부분 분석", description: "일부 경쟁사에 대한 분석은 있음", emoji: "📊" },
      { value: 4, label: "체계적 분석", description: "주요 경쟁사에 대한 체계적 분석", emoji: "📈" },
      { value: 5, label: "완벽한 분석", description: "모든 경쟁사 분석 및 차별화 전략 수립", emoji: "🎯" }
    ]
  },
  {
    id: 39,
    section: "목표명확성",
    sectionTitle: "AI 도입 목표 및 전략",
    category: "goalClarity",
    weight: 1.2,
    question: "AI 도입에 따른 리스크 관리 계획이 있나요?",
    description: "AI 도입 과정에서 발생할 수 있는 위험 요소들에 대한 사전 분석과 대응 계획이 있는지 평가해주세요.",
    options: [
      { value: 1, label: "계획 없음", description: "리스크에 대한 고려가 전혀 없음", emoji: "🚨" },
      { value: 2, label: "기초 인식", description: "주요 리스크는 인식하고 있음", emoji: "⚠️" },
      { value: 3, label: "부분 계획", description: "일부 리스크에 대한 대응 계획", emoji: "🛡️" },
      { value: 4, label: "체계적 계획", description: "대부분의 리스크에 대한 체계적 계획", emoji: "🔒" },
      { value: 5, label: "완벽한 계획", description: "모든 리스크에 대한 완벽한 대응 체계", emoji: "🏰" }
    ]
  },
  {
    id: 40,
    section: "목표명확성",
    sectionTitle: "AI 도입 목표 및 전략",
    category: "goalClarity",
    weight: 1.3,
    question: "AI 도입 후 지속적인 개선 계획이 있나요?",
    description: "AI 시스템 도입 후 지속적인 모니터링, 개선, 업그레이드에 대한 계획이 있는지 평가해주세요.",
    options: [
      { value: 1, label: "계획 없음", description: "도입 후 개선 계획이 전혀 없음", emoji: "🛑" },
      { value: 2, label: "기초 계획", description: "필요시 개선하겠다는 막연한 계획", emoji: "🤔" },
      { value: 3, label: "일반 계획", description: "정기적인 점검 및 개선 계획", emoji: "🔧" },
      { value: 4, label: "체계적 계획", description: "체계적인 모니터링 및 개선 체계", emoji: "📈" },
      { value: 5, label: "완벽한 계획", description: "지속적 혁신을 위한 완벽한 개선 체계", emoji: "🚀" }
    ]
  },

  // ================================================================================
  // 섹션 6: 실행 역량 (5문항) - executionCapability
  // ================================================================================
  {
    id: 41,
    section: "실행역량",
    sectionTitle: "AI 도입 실행 역량",
    category: "executionCapability",
    weight: 1.5,
    question: "프로젝트 관리 역량은 어떤가요?",
    description: "AI 도입 프로젝트를 체계적으로 계획하고 실행할 수 있는 프로젝트 관리 역량을 평가해주세요.",
    options: [
      { value: 1, label: "매우 부족", description: "프로젝트 관리 경험과 역량이 전혀 없음", emoji: "❌" },
      { value: 2, label: "부족", description: "기본적인 프로젝트 관리만 가능", emoji: "📝" },
      { value: 3, label: "보통", description: "일반적인 수준의 프로젝트 관리 가능", emoji: "📊" },
      { value: 4, label: "우수", description: "체계적인 프로젝트 관리 역량 보유", emoji: "🎯" },
      { value: 5, label: "매우 우수", description: "최고 수준의 프로젝트 관리 전문성", emoji: "🏆" }
    ]
  },
  {
    id: 42,
    section: "실행역량",
    sectionTitle: "AI 도입 실행 역량",
    category: "executionCapability",
    weight: 1.6,
    question: "외부 전문가나 파트너와의 협력 경험이 있나요?",
    description: "AI 도입을 위해 외부 컨설팅, 기술 파트너와 협력한 경험과 역량을 평가해주세요.",
    options: [
      { value: 1, label: "경험 없음", description: "외부 협력 경험이 전혀 없음", emoji: "🏝️" },
      { value: 2, label: "제한적 경험", description: "간단한 외부 협력 경험만 있음", emoji: "🤝" },
      { value: 3, label: "일반적 경험", description: "일반적인 수준의 외부 협력 경험", emoji: "👥" },
      { value: 4, label: "풍부한 경험", description: "다양한 외부 협력 프로젝트 경험", emoji: "🌐" },
      { value: 5, label: "전문적 경험", description: "전문적이고 전략적인 파트너십 구축", emoji: "🏢" }
    ]
  },
  {
    id: 43,
    section: "실행역량",
    sectionTitle: "AI 도입 실행 역량",
    category: "executionCapability",
    weight: 1.5,
    question: "신기술 도입 시 시행착오를 통한 학습 역량은?",
    description: "새로운 기술 도입 과정에서 발생하는 문제들을 해결하고 학습하는 조직의 역량을 평가해주세요.",
    options: [
      { value: 1, label: "매우 부족", description: "실패 시 포기하거나 회피하는 경향", emoji: "😰" },
      { value: 2, label: "부족", description: "문제 해결 능력이 부족함", emoji: "😕" },
      { value: 3, label: "보통", description: "일반적인 문제 해결 능력", emoji: "🤔" },
      { value: 4, label: "우수", description: "문제를 적극적으로 해결하고 학습", emoji: "💡" },
      { value: 5, label: "매우 우수", description: "실패를 통해 빠르게 학습하고 개선", emoji: "🚀" }
    ]
  },
  {
    id: 44,
    section: "실행역량",
    sectionTitle: "AI 도입 실행 역량",
    category: "executionCapability",
    weight: 1.6,
    question: "지속적인 투자와 개선에 대한 의지는?",
    description: "AI 도입 후에도 지속적으로 투자하고 개선해 나갈 조직의 의지와 역량을 평가해주세요.",
    options: [
      { value: 1, label: "의지 없음", description: "일회성 도입 후 방치할 가능성 높음", emoji: "🛑" },
      { value: 2, label: "소극적", description: "필요시에만 최소한의 투자", emoji: "🤷" },
      { value: 3, label: "보통", description: "일반적인 수준의 지속 투자 의지", emoji: "💰" },
      { value: 4, label: "적극적", description: "지속적인 개선과 투자에 적극적", emoji: "📈" },
      { value: 5, label: "매우 적극적", description: "혁신을 위한 지속적 투자에 최우선", emoji: "🚀" }
    ]
  },
  {
    id: 45,
    section: "실행역량",
    sectionTitle: "AI 도입 실행 역량",
    category: "executionCapability",
    weight: 1.7,
    question: "AI 도입을 통한 조직 혁신 의지는 어떤가요?",
    description: "단순한 도구 도입을 넘어 AI를 통한 근본적인 조직 혁신과 변화에 대한 의지를 평가해주세요.",
    options: [
      { value: 1, label: "혁신 의지 없음", description: "기존 방식 유지, 최소한의 변화만", emoji: "🐌" },
      { value: 2, label: "소극적 변화", description: "부분적이고 점진적인 변화만 추구", emoji: "🚶" },
      { value: 3, label: "일반적 변화", description: "필요한 수준의 변화는 수용", emoji: "🚴" },
      { value: 4, label: "적극적 혁신", description: "AI를 통한 적극적인 조직 혁신 추구", emoji: "🏃" },
      { value: 5, label: "전면적 혁신", description: "AI 중심의 완전한 조직 혁신 추진", emoji: "🚀" }
    ]
  }
];

// 섹션별 질문 수 검증
export const SECTION_QUESTION_COUNT = {
  businessFoundation: 8,
  currentAI: 8, 
  organizationReadiness: 8,
  techInfrastructure: 8,
  goalClarity: 8,
  executionCapability: 5
};

// 총 45문항 검증
export const TOTAL_QUESTIONS = 45;

console.log('✅ 45문항 AI역량진단 시스템 로드 완료');
console.log('📊 총 문항 수:', REAL_45_QUESTIONS.length);
console.log('🎯 섹션별 문항 수:', SECTION_QUESTION_COUNT);
