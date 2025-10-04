// 고도화(ENHANCED) 행동지표 - 점수 공통 지표와 카테고리 특화 지표 제공
// 서버/클라이언트 양쪽에서 사용 가능

export interface EnhancedBehaviorIndicator {
	score: number;
	label: string;
	keyword: string;
	description: string;
	actionItems: string[];
	expectedOutcome: string;
	color: string;
	bgColor: string;
}

export type EnhancedCategories =
	| 'businessFoundation'
	| 'currentAI'
	| 'organizationReadiness'
	| 'techInfrastructure'
	| 'goalClarity'
	| 'executionCapability';

// 점수별(1~5) 공통 ENHANCED 행동지표
export const ENHANCED_BEHAVIOR_INDICATORS: EnhancedBehaviorIndicator[] = [
	{
		score: 5,
		label: '완전히 구현됨',
		keyword: '혁신적 선도',
		description:
			'업계 최고 수준의 AI 역량을 보유하고 혁신을 주도하고 있습니다',
		actionItems: [
			'AI 전담 조직 운영 중',
			'전사 AI 교육 프로그램 정기 실시',
			'AI 기반 신규 비즈니스 모델 운영',
			'데이터 기반 의사결정 체계 완비'
		],
		expectedOutcome: 'AI를 통한 매출 30% 이상 증대, 업무 효율성 50% 향상',
		color: 'text-green-700',
		bgColor: 'bg-green-50 border-green-200'
	},
	{
		score: 4,
		label: '대부분 구현됨',
		keyword: '전략적 실행',
		description:
			'체계적인 AI 도입 계획을 수립하고 적극적으로 실행하고 있습니다',
		actionItems: [
			'AI 도입 로드맵 수립 완료',
			'주요 부서 AI 툴 활용 중',
			'데이터 수집 및 관리 체계 구축',
			'AI 역량 강화 교육 진행 중'
		],
		expectedOutcome: '핵심 업무 자동화 달성, 생산성 20% 향상',
		color: 'text-blue-700',
		bgColor: 'bg-blue-50 border-blue-200'
	},
	{
		score: 3,
		label: '부분적 구현',
		keyword: '기초 운영',
		description:
			'일부 영역에서 AI를 활용하고 있으나 체계적인 접근이 필요합니다',
		actionItems: [
			'특정 업무에 AI 도구 시범 적용',
			'기본적인 데이터 수집 진행',
			'AI 관련 정보 수집 및 검토',
			'일부 직원 AI 활용 시작'
		],
		expectedOutcome: '단순 반복 업무 일부 자동화, 업무 시간 10% 절감',
		color: 'text-yellow-700',
		bgColor: 'bg-yellow-50 border-yellow-200'
	},
	{
		score: 2,
		label: '초기 단계',
		keyword: '준비 중',
		description:
			'AI 도입을 위한 기초 준비 단계이며 파일럿 적용이 필요합니다',
		actionItems: [
			'AI 도입 타당성 검토',
			'데이터 품질 점검 및 개선',
			'파일럿 PoC 수행',
			'기본 교육 및 가이드 제작'
		],
		expectedOutcome: '기초 체계 구축 및 초기 성과 도출',
		color: 'text-orange-700',
		bgColor: 'bg-orange-50 border-orange-200'
	},
	{
		score: 1,
		label: '미구현',
		keyword: '시작 전',
		description:
			'AI 도입이 이루어지지 않았으며 기초 인프라와 교육이 필요합니다',
		actionItems: [
			'도입 필요성/효과성 내부 공유',
			'경영진 공감대 형성',
			'기초 데이터 수집 체계 마련',
			'AI 입문 교육 프로그램 도입'
		],
		expectedOutcome: '도입 준비 완료 및 초기 로드맵 수립',
		color: 'text-red-700',
		bgColor: 'bg-red-50 border-red-200'
	}
];

// 카테고리별(섹션별) 특화 ENHANCED 행동지표
export const ENHANCED_CATEGORY_INDICATORS: Record<
	EnhancedCategories,
	Record<number, { indicator: EnhancedBehaviorIndicator }>
> = {
	businessFoundation: {
		5: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[0], keyword: '사업 전략 선도', description: '사업 전략과 수익 모델이 업계 선도 수준으로 정교합니다' } },
		4: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[1], keyword: '사업 운영 고도화', description: '핵심 KPI 중심의 체계적 사업 운영이 정착되어 있습니다' } },
		3: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[2], keyword: '사업 기반 운영', description: '기본 사업 운영 체계는 있으나 전략 정밀도가 부족합니다' } },
		2: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[3], keyword: '사업 기반 정비 필요', description: '사업 모델과 KPI 체계의 정비가 시급합니다' } },
		1: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[4], keyword: '사업 기초 구축 필요', description: '사업 기초 체계와 KPI 도입이 필요합니다' } }
	},
	currentAI: {
		5: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[0], keyword: 'AI 전면 도입', description: '전사적으로 AI가 내재화되어 혁신을 주도합니다' } },
		4: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[1], keyword: 'AI 전략적 활용', description: '핵심 업무에서 AI 도구를 전략적으로 활용합니다' } },
		3: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[2], keyword: '부분적 AI 활용', description: '일부 업무에서 AI를 시범 적용하고 있습니다' } },
		2: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[3], keyword: 'AI 준비 단계', description: 'AI 도입 파일럿과 기초 교육이 필요합니다' } },
		1: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[4], keyword: 'AI 미도입', description: 'AI 도입을 위한 인식 제고와 기초 체계가 필요합니다' } }
	},
	organizationReadiness: {
		5: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[0], keyword: '고몰입 문화 정착', description: '자율/신뢰/책임의 고몰입 조직문화가 정착되어 있습니다' } },
		4: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[1], keyword: '변화 주도 조직', description: '변화/개선을 주도하는 문화와 제도가 있습니다' } },
		3: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[2], keyword: '변화 수용 조직', description: '변화를 수용하나 체계와 일관성이 부족합니다' } },
		2: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[3], keyword: '변화 저항 조직', description: '변화 저항 해소와 리더십 강화가 필요합니다' } },
		1: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[4], keyword: '보수적/수동적 조직', description: '기본적인 변화 수용 문화가 필요합니다' } }
	},
	techInfrastructure: {
		5: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[0], keyword: '최신 인프라', description: '클라우드/데이터/보안이 최신 수준으로 최적화되어 있습니다' } },
		4: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[1], keyword: '안정적 인프라', description: '확장성과 안정성을 갖춘 표준 인프라를 보유합니다' } },
		3: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[2], keyword: '기본 인프라', description: '기본 인프라는 있으나 통합/품질이 부족합니다' } },
		2: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[3], keyword: '노후/파편화', description: '인프라 노후 및 파편화 개선이 필요합니다' } },
		1: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[4], keyword: '인프라 부재', description: '기초 인프라부터 단계적으로 구축해야 합니다' } }
	},
	goalClarity: {
		5: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[0], keyword: '전략-목표 완전 정렬', description: '전략-목표-KPI가 완벽히 정렬되어 실행됩니다' } },
		4: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[1], keyword: '명확한 목표/지표', description: '명확한 목표와 KPI로 관리됩니다' } },
		3: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[2], keyword: '기본 목표/지표', description: '기본 목표와 지표는 있으나 정밀도가 부족합니다' } },
		2: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[3], keyword: '목표/지표 모호', description: 'SMART 원칙에 따른 재정의가 필요합니다' } },
		1: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[4], keyword: '목표 체계 부재', description: '목표/지표 기본 체계부터 마련해야 합니다' } }
	},
	executionCapability: {
		5: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[0], keyword: '탁월한 실행', description: '전략을 빠르게 실행해 확실한 성과를 창출합니다' } },
		4: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[1], keyword: '체계적 실행', description: '프로젝트 관리/성과 관리가 체계적입니다' } },
		3: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[2], keyword: '기본 실행', description: '기본 실행은 가능하나 일관성이 부족합니다' } },
		2: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[3], keyword: '실행 지연', description: '실행 지연/장애요인 해소가 필요합니다' } },
		1: { indicator: { ...ENHANCED_BEHAVIOR_INDICATORS[4], keyword: '실행 실패', description: '실행 체계 기초부터 구축해야 합니다' } }
	}
};

export function getEnhancedBehaviorIndicator(score: number): EnhancedBehaviorIndicator | undefined {
	return ENHANCED_BEHAVIOR_INDICATORS.find((i) => i.score === score);
}

export function getEnhancedCategoryIndicator(
	category: EnhancedCategories,
	score: number
): { indicator: EnhancedBehaviorIndicator } | undefined {
	const byCategory = ENHANCED_CATEGORY_INDICATORS[category];
	return byCategory?.[score];
}

export function getScoreBgColor(score: number): string {
	const map: Record<number, string> = {
		5: 'bg-green-50 border-green-200',
		4: 'bg-blue-50 border-blue-200',
		3: 'bg-yellow-50 border-yellow-200',
		2: 'bg-orange-50 border-orange-200',
		1: 'bg-red-50 border-red-200'
	};
	return map[score] || 'bg-gray-50 border-gray-200';
}


