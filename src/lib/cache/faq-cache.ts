/**
 * 자주 묻는 질문 캐시 시스템
 * 즉시 응답으로 체감 속도 대폭 개선
 */

import { AICAMP_COMPREHENSIVE_SERVICES, ServiceRecommendationEngine } from '@/lib/data/aicamp-services-comprehensive';

interface CachedResponse {
  content: string;
  buttons: Array<{
    text: string;
    url: string;
    style: string;
    icon: string;
  }>;
  keywords: string[];
  priority: number; // 높을수록 우선 매칭
}

export const FAQ_CACHE: Record<string, CachedResponse> = {
  // 1. 인사말 (최고 우선순위)
  greeting: {
    content: `안녕하세요! 반갑습니다! 😊

저는 AICAMP 이교장 이후경입니다. 28년간 현장에서 쌓은 경험으로 기업들의 AI 도입과 디지털 전환을 도와드리고 있어요.

주요 서비스:
1) AI 역량진단 - 45개 지표로 정밀 분석
2) 맞춤형 AI 교육 - 업종별 실무 중심  
3) n8n 업무 자동화 - 코딩 없이도 가능
4) AI 도입 전략 컨설팅

궁금한 것 있으시면 편하게 물어보세요! 직접 상담은 010-9251-9743으로 연락주시면 됩니다.`,
    buttons: [
      { text: '🎯 AI 역량진단', url: '/ai-diagnosis', style: 'primary', icon: '🎯' },
      { text: '📞 상담 예약', url: '/consultation', style: 'secondary', icon: '📞' },
      { text: '📚 교육과정', url: '/services/ai-curriculum', style: 'outline', icon: '📚' }
    ],
    keywords: ['안녕', '처음', '반갑', '소개', 'hello', 'hi'],
    priority: 100
  },

  // 2. 상담 신청
  consultation: {
    content: `네, 물론이죠! 기꺼이 도와드리겠습니다! 👍

상담 프로세스:
1) 무료 AI 역량진단으로 현재 상태 파악
2) 맞춤형 솔루션 설계  
3) 단계별 실행 계획 수립
4) 지속적인 성과 모니터링

직접 상담: 010-9251-9743 (이후경 교장)
온라인 진단: 무료로 바로 시작 가능

28년 경험으로 정말 실무에 도움되는 조언 드릴게요. 걱정 마시고 바로 시작해보세요!`,
    buttons: [
      { text: '📞 즉시 상담신청', url: '/consultation', style: 'primary', icon: '📞' },
      { text: '🎯 무료 진단먼저', url: '/ai-diagnosis', style: 'secondary', icon: '🎯' }
    ],
    keywords: ['상담', '문의', '도움', '신청', '예약', '연락'],
    priority: 95
  },

  // 3. AI 교육 과정 (상세 정보)
  education: {
    content: `아, 교육 과정에 관심 있으시는군요! 정말 좋은 선택이에요! 🎓

AICAMP 28년 경험 검증 교육 과정:

📚 1. ChatGPT & Claude 업무 활용 마스터 (기초)
• 기간: 8시간 (2일)
• 비용: 50만원 (정부지원 시 무료)
• 대상: 사무직, AI 초보자, 중소기업 경영진
• 효과: 업무 생산성 300% 향상, 일일 2-3시간 절약
• 내용: 프롬프트 엔지니어링, 문서 자동화, 실무 템플릿 100개

🔄 2. n8n & Make 업무 자동화 전문가 (심화)
• 기간: 16시간 (4일)
• 비용: 120만원 (정부지원 시 20만원)
• 대상: 효율화 담당자, IT 관리자, 반복업무 직군
• 효과: 자동화율 90%, 월 100시간 절약
• 내용: 500개 서비스 연동, 워크플로우 설계, 실전 프로젝트

👔 3. AI 리더십 & 디지털 전환 전략 (경영진)
• 기간: 12시간 (3일)
• 비용: 200만원 (1:1 컨설팅 포함)
• 대상: CEO, 임원진, 부서장급
• 효과: ROI 800%, 전사 AI 도입 전략 완성
• 내용: 경영 전략, 조직 변화 관리, 맞춤 로드맵

🏭 4. 제조업 특화 AI 스마트팩토리 (업종별)
• 기간: 20시간 (5일)
• 비용: 150만원 (정부지원 가능)
• 대상: 생산관리자, 품질관리, 공장장
• 효과: 생산성 40% 향상, 불량률 80% 감소
• 내용: 예측 정비, 품질 자동화, IoT 연동

✨ 특별 혜택:
• 무료 체험 교육 제공
• 수료 후 3-12개월 사후 지원
• 정부지원 최대 100% (조건 충족 시)
• 개별 맞춤 컨설팅 포함

어떤 과정이 가장 관심 있으신가요?`,
    buttons: [
      { text: '📚 전체 과정보기', url: '/services/ai-curriculum', style: 'primary', icon: '📚' },
      { text: '🎓 무료 체험신청', url: '/consultation?type=education', style: 'secondary', icon: '🎓' },
      { text: '💰 정부지원 확인', url: '/consultation?type=funding', style: 'outline', icon: '💰' }
    ],
    keywords: ['교육', '과정', '커리큘럼', '배우', '학습', '수업', '강의', 'aicamp', '이교장'],
    priority: 90
  },

  // 4. AI 도입 전략
  ai_strategy: {
    content: `정말 좋은 질문이에요! AI 도입은 이제 선택이 아니라 필수죠. 😊

성공하는 기업들의 공통점:
1) 단계적 접근 - 한 번에 다 하려 하지 않음
2) 실무진 교육 - 사용자가 편해야 성공
3) 작은 성공 경험 - 자신감이 확산 효과
4) 지속적 개선 - 한 번 하고 끝이 아님

구체적인 로드맵:
즉시 실행: ChatGPT 업무 활용 (1주일)
단기 계획: n8n 자동화 구축 (1개월)
장기 전략: AI 조직 문화 정착 (3개월)

걱정 없어요, 충분히 가능해요!`,
    buttons: [
      { text: '🎯 AI 전략수립', url: '/consultation?type=strategy', style: 'primary', icon: '🎯' },
      { text: '📊 현재 수준진단', url: '/ai-diagnosis', style: 'secondary', icon: '📊' }
    ],
    keywords: ['ai', '인공지능', '도입', '전략', '계획', '로드맵', 'artificial'],
    priority: 85
  },

  // 5. n8n 자동화
  automation: {
    content: `n8n 자동화에 관심 있으시는군요! 정말 스마트한 선택이에요! 🔄

n8n의 장점:
1) 코딩 없이도 가능 - 드래그 앤 드롭으로 간단
2) 다양한 연동 - 500개 이상 서비스 지원
3) 비용 효율적 - 월 구독료 대비 ROI 500%
4) 실시간 자동화 - 24시간 무인 업무 처리

실제 적용 사례:
• 고객 문의 자동 분류 및 배정
• 재고 관리 자동화
• 마케팅 캠페인 자동 실행
• 보고서 자동 생성 및 배포

바로 시작해보세요! 첫 자동화 구축까지 1주일이면 충분해요.`,
    buttons: [
      { text: '🔄 n8n 컨설팅', url: '/consultation?type=automation', style: 'primary', icon: '🔄' },
      { text: '⚙️ 프로세스 분석', url: '/free-diagnosis?focus=automation', style: 'secondary', icon: '⚙️' }
    ],
    keywords: ['n8n', '자동화', '워크플로우', 'automation', 'workflow', '프로세스'],
    priority: 80
  },

  // 6. 세부 과정별 문의
  chatgpt_course: {
    content: `ChatGPT 과정에 관심 있으시는군요! 가장 인기 있는 기초 과정이에요! 😊

📚 ChatGPT & Claude 업무 활용 마스터 상세 정보:

🎯 과정 개요:
• 기간: 8시간 (2일 과정)
• 비용: 50만원 (정부지원 시 무료)
• 레벨: 초급자 대상
• 강사: 이후경 교장 (28년 현장 경험)

👥 대상자:
• 사무직 직장인 (기획, 마케팅, 영업, 인사)
• AI 초보자 및 디지털 전환 담당자
• 중소기업 경영진 및 팀장급
• 프리랜서 및 1인 기업 대표

📖 상세 커리큘럼:
1모듈 (2시간): AI 도구 기초 이해
• ChatGPT vs Claude vs Gemini 비교
• 업무별 최적 AI 선택법
• 프롬프트 엔지니어링 기초

2모듈 (3시간): 실무 프롬프트 템플릿
• 이메일 작성 자동화
• 기획서 및 제안서 구조화
• 회의록 정리 및 액션 아이템 추출
• 마케팅 콘텐츠 생성

3모듈 (2시간): 고급 활용 기법
• 롤플레이 프롬프트
• 체인 오브 쏘트 기법
• 퓨샷 러닝 활용법

4모듈 (1시간): 실전 프로젝트
• 개인별 업무 AI 적용 설계
• 성과 측정 지표 설정

🎁 제공 자료:
• 실습용 프롬프트 템플릿 100개
• 업무별 체크리스트
• 3개월 사후 지원

📈 기대 효과:
• 일일 업무 시간 2-3시간 단축
• 문서 작성 속도 500% 향상
• 창의적 아이디어 300% 증대
• ROI 300% (3개월 내 회수)

바로 시작하실 수 있어요!`,
    buttons: [
      { text: '🎓 ChatGPT 과정 신청', url: '/consultation?course=chatgpt', style: 'primary', icon: '🎓' },
      { text: '💰 정부지원 확인', url: '/consultation?type=funding', style: 'secondary', icon: '💰' },
      { text: '📞 상세 상담', url: '/consultation', style: 'outline', icon: '📞' }
    ],
    keywords: ['chatgpt', 'claude', '기초', '초급', '프롬프트', '문서작성', '업무활용'],
    priority: 88
  },

  n8n_course: {
    content: `n8n 자동화 과정 문의주셔서 감사해요! 정말 실무에 도움되는 과정이에요! 🔄

🔄 n8n & Make 업무 자동화 전문가 상세 정보:

🎯 과정 개요:
• 기간: 16시간 (4일 과정)
• 비용: 120만원 (정부지원 시 20만원)
• 레벨: 중급자 대상 (ChatGPT 기초 수료 권장)
• 강사: 이후경 교장 + 자동화 전문가

👥 대상자:
• 업무 효율화 담당자
• IT 부서 및 시스템 관리자
• 반복 업무가 많은 모든 직군
• 스타트업 및 중소기업 경영진

📖 상세 커리큘럼:
1모듈 (4시간): 자동화 기초 설계
• n8n vs Make vs Zapier 비교
• 업무 프로세스 분석 방법
• 자동화 ROI 계산법
• 기본 워크플로우 설계

2모듈 (4시간): 핵심 연동 시스템
• Google Workspace 완전 자동화
• Slack, Teams 메신저 자동화
• CRM 시스템 연동 (세일즈포스, HubSpot)
• 이메일 마케팅 자동화

3모듈 (4시간): 고급 자동화 구현
• AI 기반 데이터 처리
• 조건부 분기 및 복잡한 로직
• 오류 처리 및 예외 상황 대응
• API 연동 및 커스텀 웹훅

4모듈 (4시간): 실전 프로젝트
• 개인별 맞춤 자동화 시스템 구축
• 성과 모니터링 대시보드
• 유지보수 계획 수립

🎁 제공 자료:
• 자동화 템플릿 50개
• 연동 가이드북
• 평생 기술 지원

📈 기대 효과:
• 월 100시간 이상 업무 시간 절약
• 반복 업무 90% 자동화
• 데이터 처리 속도 1000% 향상
• ROI 500% (6개월 내 회수)

코딩 몰라도 전혀 문제없어요!`,
    buttons: [
      { text: '🔄 n8n 과정 신청', url: '/consultation?course=n8n', style: 'primary', icon: '🔄' },
      { text: '📊 자동화 진단', url: '/free-diagnosis?focus=automation', style: 'secondary', icon: '📊' },
      { text: '💡 무료 상담', url: '/consultation', style: 'outline', icon: '💡' }
    ],
    keywords: ['n8n', 'make', 'zapier', '자동화', 'automation', '워크플로우', '연동'],
    priority: 87
  },

  leadership_course: {
    content: `경영진 과정에 관심 있으시는군요! 정말 중요한 투자 결정이에요! 👔

👔 AI 리더십 & 디지털 전환 전략 상세 정보:

🎯 과정 개요:
• 기간: 12시간 (3일 과정)
• 비용: 200만원 (1:1 맞춤 컨설팅 포함)
• 레벨: 경영진 전용
• 강사: 이후경 교장 (1:1 멘토링 포함)

👥 대상자:
• CEO, 임원진
• 부서장 및 팀장급 관리자
• AI 도입 의사결정권자
• 디지털 전환 책임자

📖 상세 커리큘럼:
1모듈 (4시간): AI 경영 전략
• AI 시대 비즈니스 모델 혁신 사례
• 업종별 AI 도입 성공/실패 분석
• AI 투자 우선순위 및 예산 배분
• 경쟁사 대비 AI 경쟁력 분석

2모듈 (4시간): 조직 변화 관리
• AI 도입 시 조직 저항 극복 방안
• 직원 재교육 및 역량 개발 계획
• AI 윤리 및 리스크 관리 체계
• 성과 측정 및 KPI 설정

3모듈 (4시간): 실행 계획 수립
• 개별 기업 맞춤 AI 도입 로드맵
• 단계별 실행 계획 및 마일스톤
• 예산 계획 및 ROI 시뮬레이션
• 리스크 관리 및 contingency plan

🎁 제공 자료:
• 전략 수립 템플릿
• 벤치마킹 리포트
• 6개월 사후 컨설팅
• 개별 컨설팅 리포트

📈 기대 효과:
• 전사 AI 도입 전략 완성
• 3년 로드맵 및 실행 계획 수립
• AI 투자 ROI 800% 달성 방안
• 조직 문화 혁신 리더십 확보

28년 경험의 노하우를 모두 전수해드려요!`,
    buttons: [
      { text: '👔 경영진 과정 신청', url: '/consultation?course=leadership', style: 'primary', icon: '👔' },
      { text: '📊 현재 수준 진단', url: '/ai-diagnosis', style: 'secondary', icon: '📊' },
      { text: '🤝 1:1 상담', url: '/consultation?type=executive', style: 'outline', icon: '🤝' }
    ],
    keywords: ['경영진', '리더십', 'ceo', '임원', '전략', '디지털전환', '조직변화'],
    priority: 86
  },

  // 7. 경영컨설팅 서비스
  business_consulting: {
    content: `BM ZEN 사업분석에 관심 있으시는군요! 28년 경험의 핵심 서비스에요! 📊

📈 BM ZEN 사업분석 상세 정보:

🎯 서비스 개요:
• 28년 경험 전문 경영지도사의 맞춤형 컨설팅
• BM ZEN 독자적 분석 방법론 적용
• 기업 현황 정밀 분석 및 성장 전략 수립
• 실행 가능한 액션플랜 제공

👥 대상 기업:
• 중소기업 경영진
• 성장 정체기 기업
• 신사업 진출 기업
• 구조조정 필요 기업

📋 컨설팅 프로세스:
1단계: 현황 진단 (재무, 조직, 시장)
2단계: 문제점 및 기회 분석
3단계: 전략 방향 수립
4단계: 실행 계획 구체화
5단계: 모니터링 및 개선

💰 투자 및 효과:
• 기본 진단: 300만원
• 전략 수립: 500만원
• 통합 컨설팅: 800만원
• 정부지원 시 20-50% 할인

📈 기대 효과:
• 매출 20-50% 증대
• 운영비 15-30% 절감
• 조직 효율성 40% 향상
• ROI 200-400% (6-12개월 내)

🏆 성공 사례:
• 제조업 G사: 매출 45% 증가, 수익성 300% 개선
• 서비스업 H사: 운영비 25% 절감, 고객만족도 60% 향상

💡 정부지원:
• 경영혁신 바우처 (최대 200만원)
• 중소기업 컨설팅 지원 (70% 지원)

28년 노하우로 확실한 성과 보장해드려요!`,
    buttons: [
      { text: '📊 BM ZEN 신청', url: '/consultation?service=business', style: 'primary', icon: '📊' },
      { text: '💰 정부지원 확인', url: '/consultation?type=funding', style: 'secondary', icon: '💰' },
      { text: '📞 무료 상담', url: '/consultation', style: 'outline', icon: '📞' }
    ],
    keywords: ['경영컨설팅', 'bm zen', '사업분석', '전략수립', '성장전략', '경영진단'],
    priority: 84
  },

  // 8. 정책자금 컨설팅
  policy_funding: {
    content: `정책자금 컨설팅 문의 주셔서 감사해요! 25년 노하우의 핵심 서비스에요! 💰

💰 정책자금 컨설팅 상세 정보:

🎯 서비스 개요:
• 25년 정책자금 전문 경험
• 평균 5억원 지원금 확보
• 성공률 85% 이상
• 신청부터 정산까지 전 과정 지원

👥 대상 기업:
• 자금 조달 필요 기업
• R&D 투자 계획 기업
• 설비 투자 예정 기업
• 창업 초기 기업

📋 지원 프로세스:
1단계: 기업 현황 및 니즈 분석
2단계: 적합 사업 발굴 및 매칭
3단계: 사업계획서 작성 지원
4단계: 신청서 검토 및 제출
5단계: 심사 대응 및 사후관리

💰 투자 및 수수료:
• 기본 컨설팅: 200만원
• 사업계획서 포함: 400만원
• 전 과정 지원: 600만원
• 성공 시 지원금의 5-10%

🎁 주요 지원사업:
• R&D 과제 (중기부, 산업부, 과기부)
• 창업지원 (창진원, 중진공)
• 설비투자 (지자체별 프로그램)
• 수출지원 (KOTRA, 중기부)

📈 기대 효과:
• 평균 5억원 지원금 확보
• 자금 조달 비용 절감
• 사업 추진 동력 확보
• 기술개발 가속화

🏆 성공 사례:
• 제조업 J사: R&D 과제로 8억원 확보
• IT업 K사: 창업지원으로 3억원 + 후속 투자 유치
• 바이오업 L사: 연속 과제로 총 15억원 확보

25년 경험으로 확실한 지원금 확보해드려요!`,
    buttons: [
      { text: '💰 정책자금 신청', url: '/consultation?service=funding', style: 'primary', icon: '💰' },
      { text: '📋 사업 매칭', url: '/services/policy-funding', style: 'secondary', icon: '📋' },
      { text: '📞 전문가 상담', url: '/consultation', style: 'outline', icon: '📞' }
    ],
    keywords: ['정책자금', '정부지원', 'r&d', '창업지원', '설비투자', '지원금'],
    priority: 83
  },

  // 9. AI 생산성 향상
  ai_productivity: {
    content: `AI 생산성 향상 서비스 문의 감사해요! 정말 효과적인 서비스에요! 🚀

🚀 AI 생산성 향상 상세 정보:

🎯 서비스 개요:
• 맞춤형 AI 도구 분석 및 도입
• 업무 프로세스 최적화
• 자동화 시스템 구축
• 생산성 측정 및 모니터링

👥 대상 기업:
• 업무 효율화 필요 기업
• AI 도입 초기 기업
• 반복 업무 많은 조직
• 디지털 전환 추진 기업

📋 서비스 프로세스:
1단계: 현재 업무 프로세스 분석
2단계: AI 도구 적합성 평가
3단계: 맞춤형 솔루션 설계
4단계: 단계별 도입 및 교육
5단계: 성과 측정 및 최적화

💰 투자 및 효과:
• 기본 분석: 300만원
• 도구 도입: 600만원
• 통합 솔루션: 1,000만원
• 성과 기반 과금 가능

📈 기대 효과:
• 업무 효율성 40-70% 향상
• 반복 업무 80% 자동화
• 의사결정 속도 50% 개선
• 인적 오류 90% 감소
• ROI 300-500% (6개월 내)

🏆 성공 사례:
• 서비스업 P사: AI 도구로 고객응대 시간 60% 단축
• 제조업 Q사: 품질관리 자동화로 불량률 80% 감소
• 금융업 R사: 문서처리 자동화로 업무시간 50% 절약

🛠️ 주요 AI 도구:
• ChatGPT/Claude 업무 활용
• n8n/Make 자동화 시스템
• 데이터 분석 AI 도구
• 고객서비스 AI 챗봇

바로 생산성 혁신을 경험해보세요!`,
    buttons: [
      { text: '🚀 생산성 분석', url: '/consultation?service=productivity', style: 'primary', icon: '🚀' },
      { text: '📊 현재 수준 진단', url: '/ai-diagnosis', style: 'secondary', icon: '📊' },
      { text: '💡 무료 상담', url: '/consultation', style: 'outline', icon: '💡' }
    ],
    keywords: ['ai생산성', '업무자동화', '효율성', 'ai도구', '프로세스개선', '생산성향상'],
    priority: 82
  },

  // 10. 공장/부동산 경매
  factory_auction: {
    content: `공장/부동산 경매 컨설팅 문의 감사해요! 투자비 절약의 핵심 서비스에요! 🏭

🏭 공장/부동산 경매 상세 정보:

🎯 서비스 개요:
• 투자비 35-50% 절약 가능
• 전문가 경매 분석 및 리스크 관리
• 법적 검토 및 지원
• 사후 관리 서비스

👥 대상 고객:
• 공장 부지 필요 기업
• 부동산 투자자
• 사업 확장 계획 기업
• 자산 포트폴리오 다각화 희망자

📋 서비스 프로세스:
1단계: 투자 목적 및 예산 분석
2단계: 물건 발굴 및 실사
3단계: 리스크 분석 및 평가
4단계: 입찰 전략 수립
5단계: 낙찰 후 사후 처리

💰 투자 및 수수료:
• 기본 분석: 200만원
• 전 과정 지원: 500만원
• 포트폴리오 관리: 800만원
• 낙찰가의 1-3% 성공 수수료

📈 기대 효과:
• 투자비 35-50% 절약
• 안전한 투자 수익 확보
• 전문가 리스크 관리
• 법적 분쟁 예방
• 시세 대비 20-40% 할인 매입

🏆 성공 사례:
• 제조업 Y사: 공장 경매로 30억원 절약
• 투자자 Z씨: 상업용 부동산 경매로 연 15% 수익
• 건설업 AA사: 토지 경매로 개발 사업 성공

🔍 전문 분석:
• 권리관계 정밀 조사
• 시세 분석 및 적정가 산정
• 리스크 요소 사전 파악
• 자금 조달 방안 제시

안전하고 수익성 높은 경매 투자 도와드려요!`,
    buttons: [
      { text: '🏭 경매 컨설팅', url: '/consultation?service=auction', style: 'primary', icon: '🏭' },
      { text: '📊 물건 분석', url: '/services/factory-auction', style: 'secondary', icon: '📊' },
      { text: '💰 투자 상담', url: '/consultation', style: 'outline', icon: '💰' }
    ],
    keywords: ['경매', '공장경매', '부동산투자', '투자컨설팅', '자산관리', '경매투자'],
    priority: 81
  },

  // 11. 가격/비용 문의
  pricing: {
    content: `비용에 대해 궁금하시는군요! 투명하게 말씀드릴게요. 😊

AICAMP 서비스 특징:
1) 무료 진단부터 시작 - 부담 없이 체험
2) 맞춤형 견적 - 기업 규모와 필요에 따라
3) ROI 보장 - 투자 대비 최소 300% 효과
4) 단계별 결제 - 성과 확인 후 진행

대략적인 가이드:
• AI 역량진단: 무료
• 기초 교육 (8시간): 50만원 (ROI 300%)
• 심화 교육 (16시간): 120만원 (ROI 500%)
• 전략 컨설팅: 기업별 맞춤 견적

정확한 견적은 무료 상담에서 알려드려요!`,
    buttons: [
      { text: '💰 맞춤 견적받기', url: '/consultation?type=pricing', style: 'primary', icon: '💰' },
      { text: '🆓 무료진단 먼저', url: '/ai-diagnosis', style: 'secondary', icon: '🆓' }
    ],
    keywords: ['가격', '비용', '요금', '견적', '얼마', 'price', 'cost'],
    priority: 75
  }
};

/**
 * 메시지에서 캐시된 응답 찾기
 */
export function findCachedResponse(message: string): CachedResponse | null {
  const normalizedMessage = message.toLowerCase().trim();
  
  // 길이가 너무 짧으면 인사말로 처리
  if (normalizedMessage.length < 3) {
    return FAQ_CACHE.greeting;
  }
  
  let bestMatch: { response: CachedResponse; score: number } | null = null;
  
  for (const [key, response] of Object.entries(FAQ_CACHE)) {
    let score = 0;
    
    // 키워드 매칭 점수 계산
    for (const keyword of response.keywords) {
      if (normalizedMessage.includes(keyword)) {
        score += response.priority;
        
        // 정확한 매칭에 보너스 점수
        if (normalizedMessage === keyword) {
          score += 50;
        }
      }
    }
    
    // 최고 점수 응답 선택
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { response, score };
    }
  }
  
  return bestMatch?.response || null;
}

/**
 * 캐시 히트율 추적
 */
export class CacheMetrics {
  private static hits = 0;
  private static misses = 0;
  
  static recordHit() {
    this.hits++;
  }
  
  static recordMiss() {
    this.misses++;
  }
  
  static getHitRate(): number {
    const total = this.hits + this.misses;
    return total > 0 ? (this.hits / total) * 100 : 0;
  }
  
  static getStats() {
    return {
      hits: this.hits,
      misses: this.misses,
      hitRate: this.getHitRate(),
      totalRequests: this.hits + this.misses
    };
  }
}
