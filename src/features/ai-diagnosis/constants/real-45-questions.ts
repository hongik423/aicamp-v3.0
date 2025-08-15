'use client';

export type RealQuestionCategory =
	| 'businessFoundation'
	| 'currentAI'
	| 'organizationReadiness'
	| 'techInfrastructure'
	| 'goalClarity'
	| 'executionCapability';

export interface RealQuestion {
	id: number;
	question: string;
	category: RealQuestionCategory;
	section: string;
	sectionTitle: string;
	weight: number;
}

const SECTION_INFO: Record<RealQuestionCategory, { section: string; sectionTitle: string; weight: number }> = {
	businessFoundation: { section: 'businessFoundation', sectionTitle: '사업 기반', weight: 1.0 },
	currentAI: { section: 'currentAI', sectionTitle: '현재 AI 활용', weight: 1.2 },
	organizationReadiness: { section: 'organizationReadiness', sectionTitle: '조직 준비도', weight: 1.3 },
	techInfrastructure: { section: 'techInfrastructure', sectionTitle: '기술 인프라', weight: 1.3 },
	goalClarity: { section: 'goalClarity', sectionTitle: '목표 명확성', weight: 1.4 },
	executionCapability: { section: 'executionCapability', sectionTitle: '실행 역량', weight: 1.5 }
};

function createQuestion(
	id: number,
	category: RealQuestionCategory,
	text: string
): RealQuestion {
	const info = SECTION_INFO[category];
	return {
		id,
		question: text,
		category,
		section: info.section,
		sectionTitle: info.sectionTitle,
		weight: info.weight
	};
}

export const REAL_45_QUESTIONS: RealQuestion[] = [
	// 1-8: 사업 기반
	createQuestion(1, 'businessFoundation', '우리 회사의 핵심 사업 모델과 수익 구조가 명확합니까?'),
	createQuestion(2, 'businessFoundation', '경쟁 우위를 뒷받침하는 차별화 요소가 있습니까?'),
	createQuestion(3, 'businessFoundation', '고객 니즈와 시장 변화를 정기적으로 반영합니까?'),
	createQuestion(4, 'businessFoundation', '성과(KPI) 측정·관리 체계가 구축되어 있습니까?'),
	createQuestion(5, 'businessFoundation', '재무 건전성과 자금 운용이 안정적입니까?'),
	createQuestion(6, 'businessFoundation', '기업의 전반적 안정성(재무/운영/리스크)이 높습니까?' ),
	createQuestion(7, 'businessFoundation', '향후 성장 잠재력과 확장 계획이 명확합니까?'),
	createQuestion(8, 'businessFoundation', '브랜드 인지도/신뢰도가 업계 평균 이상입니까?'),

	// 9-16: 현재 AI 활용
	createQuestion(9, 'currentAI', 'ChatGPT 등 생성형 AI를 실무에 적극 활용하고 있습니까?'),
	createQuestion(10, 'currentAI', '업무 전반에서 AI 도구를 체계적으로 활용하고 있습니까?'),
	createQuestion(11, 'currentAI', '생성형 AI 활용 가이드/정책이 마련되어 있습니까?'),
	createQuestion(12, 'currentAI', '정기적인 AI 교육/학습 프로그램이 운영됩니까?'),
	createQuestion(13, 'currentAI', 'AI/자동화 투자 계획과 우선순위가 수립되어 있습니까?'),
	createQuestion(14, 'currentAI', 'AI 도입 성과를 KPI로 측정/관리하고 있습니까?'),
	createQuestion(15, 'currentAI', 'AI 윤리/법규 준수 및 거버넌스 체계가 있습니까?'),
	createQuestion(16, 'currentAI', 'AI/데이터 품질 및 보안 관리가 체계적으로 이루어집니까?'),

	// 17-24: 조직 준비도
	createQuestion(17, 'organizationReadiness', '조직의 디지털 전환 준비도가 높습니까?'),
	createQuestion(18, 'organizationReadiness', '변화 관리 역량과 경험이 충분합니까?'),
	createQuestion(19, 'organizationReadiness', '조직문화가 혁신/학습/공유 중심입니까?'),
	createQuestion(20, 'organizationReadiness', '리더십이 AI 도입을 적극적으로 지원합니까?'),
	createQuestion(21, 'organizationReadiness', '직원들의 AI 역량(기초~심화)이 충분합니까?'),
	createQuestion(22, 'organizationReadiness', '교육/훈련 체계가 정기적으로 운영됩니까?'),
	createQuestion(23, 'organizationReadiness', '협업/지식공유 문화와 도구가 활성화되어 있습니까?'),
	createQuestion(24, 'organizationReadiness', '실험/파일럿을 장려하는 제도가 있습니까?'),

	// 25-32: 기술 인프라
	createQuestion(25, 'techInfrastructure', '클라우드/온프레미스 인프라가 안정적입니까?'),
	createQuestion(26, 'techInfrastructure', '데이터 수집/저장/처리 인프라가 구축되어 있습니까?'),
	createQuestion(27, 'techInfrastructure', '보안 시스템과 접근 통제가 적절합니까?'),
	createQuestion(28, 'techInfrastructure', '네트워크 성능/안정성이 충분합니까?'),
	createQuestion(29, 'techInfrastructure', '레거시 포함 IT 인프라의 현대화 수준이 높습니까?'),
	createQuestion(30, 'techInfrastructure', '핵심 시스템 간 통합/연동이 원활합니까?'),
	createQuestion(31, 'techInfrastructure', '모니터링/관측성(Observability) 체계가 있습니까?'),
	createQuestion(32, 'techInfrastructure', '백업/복구/재해복구 체계가 마련되어 있습니까?'),

	// 33-40: 목표 명확성
	createQuestion(33, 'goalClarity', 'AI 전략과 비전이 명확히 수립되어 있습니까?'),
	createQuestion(34, 'goalClarity', '성과 지표와 목표값이 구체적으로 정의되어 있습니까?'),
	createQuestion(35, 'goalClarity', '우선순위/로드맵이 합리적으로 설정되어 있습니까?'),
	createQuestion(36, 'goalClarity', '로드맵의 단계별 목표와 과제가 구체적입니까?'),
	createQuestion(37, 'goalClarity', '내/외부 이해관계자의 합의와 공감대가 형성되어 있습니까?'),
	createQuestion(38, 'goalClarity', '목표/전략이 조직 전체에 충분히 소통되고 있습니까?'),
	createQuestion(39, 'goalClarity', '목표 관리(SMART) 원칙이 적용되고 있습니까?'),
	createQuestion(40, 'goalClarity', '성과 추적/리뷰 체계가 정기적으로 운영됩니까?'),

	// 41-45: 실행 역량
	createQuestion(41, 'executionCapability', '프로젝트 관리 체계가 성숙합니까?'),
	createQuestion(42, 'executionCapability', '자원(인력/예산/시간) 배분이 효율적입니까?'),
	createQuestion(43, 'executionCapability', '목표 대비 성과 달성률이 높습니까?'),
	createQuestion(44, 'executionCapability', '문제 해결/의사결정 속도가 빠릅니까?'),
	createQuestion(45, 'executionCapability', '종합 실행력이 탁월하여 계획을 완수합니까?')
];


