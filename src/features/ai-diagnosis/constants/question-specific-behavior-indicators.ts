/**
 * 🎯 45문항 개별 행동지표 시스템 - 완전판
 * 각 질문마다 맞춤형 구체적 행동지표 제공 (문항 텍스트 기반 전문 콘텐츠 자동 생성)
 */
import { REAL_45_QUESTIONS, RealQuestion } from './real-45-questions';

export interface QuestionBehaviorIndicator {
  questionId: number;
  indicators: {
    score: number;
    label: string;
    keyword: string;
    description: string;
    actionItems: string[];
    expectedOutcome: string;
    color: string;
    bgColor: string;
  }[];
}

// 공통 스타일
const STYLE = {
  s5: { color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
  s4: { color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  s3: { color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200' },
  s2: { color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200' },
  s1: { color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
};

type TopicId =
  | 'customerNeeds' | 'kpi' | 'finance' | 'stability' | 'growth' | 'brand'
  | 'chatgpt' | 'aiTools' | 'genAIPolicy' | 'aiTraining' | 'aiInvestment' | 'aiPerformance' | 'aiEthics' | 'aiData'
  | 'dx' | 'change' | 'culture' | 'leadership' | 'skills' | 'eduSystem' | 'collab' | 'experimentation'
  | 'cloud' | 'dataInfra' | 'security' | 'network' | 'itModern' | 'integration' | 'observability' | 'backup'
  | 'aiStrategy' | 'kpiDesign' | 'prioritization' | 'roadmap' | 'stakeholders' | 'communication' | 'smart' | 'tracking'
  | 'projectMgmt' | 'resource' | 'achievement' | 'problemSolving' | 'execution';

function detectTopic(q: RealQuestion): TopicId {
  const t = q.question;
  // 사업 기반
  if (q.id === 3 || t.includes('고객')) return 'customerNeeds';
  if (q.id === 4 || t.includes('KPI') || t.includes('성과')) return 'kpi';
  if (q.id === 5 || t.includes('재무')) return 'finance';
  if (q.id === 6 || t.includes('안정성')) return 'stability';
  if (q.id === 7 || t.includes('성장')) return 'growth';
  if (q.id === 8 || t.includes('브랜드')) return 'brand';
  // 현재 AI 활용
  if (q.id === 9 || t.includes('ChatGPT')) return 'chatgpt';
  if (q.id === 10 || t.includes('도구')) return 'aiTools';
  if (q.id === 11 || t.includes('가이드') || t.includes('정책')) return 'genAIPolicy';
  if (q.id === 12 || t.includes('교육')) return 'aiTraining';
  if (q.id === 13 || t.includes('투자')) return 'aiInvestment';
  if (q.id === 14 || (t.includes('성과') && !t.includes('KPI'))) return 'aiPerformance';
  if (q.id === 15 || t.includes('윤리') || t.includes('법')) return 'aiEthics';
  if (q.id === 16 || t.includes('데이터')) return 'aiData';
  // 조직 준비도
  if (q.id === 17 || t.includes('디지털 전환')) return 'dx';
  if (q.id === 18 || t.includes('변화')) return 'change';
  if (q.id === 19 || t.includes('문화')) return 'culture';
  if (q.id === 20 || t.includes('리더')) return 'leadership';
  if (q.id === 21 || t.includes('역량')) return 'skills';
  if (q.id === 22 || t.includes('훈련') || t.includes('체계')) return 'eduSystem';
  if (q.id === 23 || t.includes('협업')) return 'collab';
  if (q.id === 24 || t.includes('실험') || t.includes('파일럿')) return 'experimentation';
  // 기술 인프라
  if (q.id === 25 || t.includes('클라우드')) return 'cloud';
  if (q.id === 26 || t.includes('저장') || t.includes('처리')) return 'dataInfra';
  if (q.id === 27 || t.includes('보안') || t.includes('접근')) return 'security';
  if (q.id === 28 || t.includes('네트워크')) return 'network';
  if (q.id === 29 || t.includes('레거시') || t.includes('현대화')) return 'itModern';
  if (q.id === 30 || t.includes('통합') || t.includes('연동')) return 'integration';
  if (q.id === 31 || t.includes('모니터링') || t.includes('관측')) return 'observability';
  if (q.id === 32 || t.includes('백업') || t.includes('복구')) return 'backup';
  // 목표 명확성
  if (q.id === 33 || (t.includes('전략') && t.includes('비전'))) return 'aiStrategy';
  if (q.id === 34 || (t.includes('성과') && t.includes('지표'))) return 'kpiDesign';
  if (q.id === 35 || t.includes('우선순위')) return 'prioritization';
  if (q.id === 36 || t.includes('로드맵')) return 'roadmap';
  if (q.id === 37 || t.includes('이해관계자')) return 'stakeholders';
  if (q.id === 38 || t.includes('소통')) return 'communication';
  if (q.id === 39 || t.includes('SMART')) return 'smart';
  if (q.id === 40 || t.includes('추적') || t.includes('리뷰')) return 'tracking';
  // 실행 역량
  if (q.id === 41 || t.includes('프로젝트')) return 'projectMgmt';
  if (q.id === 42 || t.includes('자원')) return 'resource';
  if (q.id === 43 || t.includes('달성')) return 'achievement';
  if (q.id === 44 || t.includes('문제') || t.includes('의사결정')) return 'problemSolving';
  return 'execution';
}

function buildIndicatorsByTopic(q: RealQuestion) {
  const title = q.question;
  const topic = detectTopic(q);
  const s5 = STYLE.s5, s4 = STYLE.s4, s3 = STYLE.s3, s2 = STYLE.s2, s1 = STYLE.s1;

  // 각 토픽별 전문 액션 세트
  const T: Record<TopicId, {kw: string, desc5: string, desc4: string, desc3: string, desc2: string, desc1: string, actions: string[]} > = {
    customerNeeds: {
      kw: '정교한 고객 인사이트',
      desc5: `${title}를 데이터/정성조사로 정교하게 수행하여 제품/서비스에 즉시 반영합니다`,
      desc4: `${title} 프로세스가 운영되며 분기 단위 개선에 반영됩니다`,
      desc3: `${title}가 간헐적으로 수행되며 일부에만 반영됩니다`,
      desc2: `${title} 체계가 미흡하여 반영 주기와 품질이 불규칙합니다`,
      desc1: `${title} 활동이 거의 없어 시장 부적합 리스크가 큽니다`,
      actions: ['정기 VOC/설문/인터뷰 체계화', '고객 여정 기반 문제정의', '인사이트-개선 Backlog 운영', 'A/B 테스트 내재화']
    },
    kpi: {
      kw: 'KPI 체계화',
      desc5: `${title}가 경영/현업에 일원화되어 실시간 대시보드로 운영됩니다`,
      desc4: `${title}가 분기 운영되며 의사결정에 적극 활용됩니다`,
      desc3: `${title}가 있으나 일부 지표의 타당성이 낮습니다`,
      desc2: `${title} 미흡으로 목표-실행-측정의 연결이 약합니다`,
      desc1: `${title} 부재로 성과관리 공백이 존재합니다`,
      actions: ['North Star Metric 정의', 'KPI-OKR 정렬', '대시보드 구축', '정기 성과 리포트/리뷰']
    },
    finance: {
      kw: '재무 건전성', desc5: `${title}가 우수하여 투자여력과 현금흐름이 안정적입니다`, desc4: `${title}가 양호하며 주요 리스크가 통제됩니다`, desc3: `${title}가 평균 수준으로 개선 여지가 있습니다`, desc2: `${title} 저하로 운영 리스크가 존재합니다`, desc1: `${title} 심각으로 구조개선이 필요합니다`, actions: ['현금흐름 관리체계 강화', '원가구조 점검', '투자 우선순위 조정', '리스크 시나리오 플래닝']
    },
    stability: {
      kw: '운영 안정성', desc5: `${title}가 높아 외부충격에도 견고합니다`, desc4: `${title}가 양호해 주요 프로세스가 안정적입니다`, desc3: `${title}가 평균으로 일부 취약점이 있습니다`, desc2: `${title} 미흡으로 운영변동성이 큽니다`, desc1: `${title} 매우 낮아 비상대응 필요`, actions: ['BCP/DR 점검', '리스크 레지스터 관리', '표준운영절차(SOP) 정비', '모니터링/알림 체계']
    },
    growth: {
      kw: '성장 전략', desc5: `${title}이 명확하고 실행되고 있습니다`, desc4: `중기 성장 시나리오와 KPI가 정리되어 있습니다`, desc3: `성장 계획이 있으나 우선순위/지표가 불명확합니다`, desc2: `성장 로드맵과 투자계획이 미흡합니다`, desc1: `성장 전략 부재`, actions: ['TAM/SAM/SOM 재정의', '신규세그먼트 PoC', '제품 포트폴리오 최적화', '성장 KPI 설정']
    },
    brand: {
      kw: '브랜드 경쟁력', desc5: `${title}가 업계 상위이며 신뢰도가 높습니다`, desc4: `${title}가 평균 이상으로 안정적입니다`, desc3: `${title}가 평균이며 개선 여지가 있습니다`, desc2: `${title}가 낮아 인지 제고가 필요합니다`, desc1: `${title} 매우 낮음`, actions: ['브랜드 포지셔닝 재정의', '콘텐츠 마케팅 강화', 'PR/미디어 전략', '고객 리뷰/평판 관리']
    },
    chatgpt: { kw:'생성형 AI 실전 활용', desc5:`${title}를 표준 프로세스로 내재화`, desc4:`주요 부서에서 ${title}가 정기 활용`, desc3:`일부 팀에서 ${title} 시범 활용`, desc2:`개별/산발적 ${title}`, desc1:`${title} 미활용`, actions:['유스케이스 카탈로그','프롬프트 가이드','보안/윤리 가이드','성과 측정 체계'] },
    aiTools: { kw:'AI 도구 체계화', desc5:`${title}가 표준화·중앙관리됩니다`, desc4:`핵심 도구 선정/배포 완료`, desc3:`부서별 상이한 도구 사용`, desc2:`도구 도입/관리 미흡`, desc1:`도구 부재`, actions:['표준 스택 정의','라이선스 관리','가이드/교육','TCO/ROI 점검'] },
    genAIPolicy: { kw:'생성형 AI 정책', desc5:`${title}가 전사 공표·준수`, desc4:`${title} 문서화/교육 진행`, desc3:`가이드 초안만 존재`, desc2:`정책 부재로 리스크 존재`, desc1:`무규범 사용`, actions:['데이터/보안/윤리 원칙','검토위원회','위반 대응','정기 점검'] },
    aiTraining: { kw:'AI 교육', desc5:`${title}가 역할기반 커리큘럼으로 운영`, desc4:`분기별 ${title}`, desc3:`연 1회 ${title}`, desc2:`임시/선택적 ${title}`, desc1:`교육 없음`, actions:['직무별 교육맵','실습 중심 랩','사내 강사 육성','수료/평가 체계'] },
    aiInvestment: { kw:'AI 투자전략', desc5:`${title}가 포트폴리오로 최적화`, desc4:`${title} 우선순위/ROI 관리`, desc3:`단발성 ${title}`, desc2:`계획 없는 ${title}`, desc1:`투자 미실행`, actions:['포트폴리오/ROI 기준','우선순위 프레임','예산 게이팅','성과 리뷰'] },
    aiPerformance: { kw:'AI 성과관리', desc5:`${title}가 KPI에 통합`, desc4:`성과 측정·보고 체계`, desc3:`부분적 측정`, desc2:`측정 불일관`, desc1:`미측정`, actions:['성과정의/KPI','대시보드','실험-학습 루프','성과 인센티브 연계'] },
    aiEthics: { kw:'AI 윤리/컴플라이언스', desc5:`${title}를 준수하는 거버넌스 확립`, desc4:`윤리 가이드/심의 운영`, desc3:`가이드 초안 보유`, desc2:`준수체계 미흡`, desc1:`리스크 상시 노출`, actions:['윤리원칙 수립','심의 프로세스','감사/로그','교육/캠페인'] },
    aiData: { kw:'데이터 거버넌스', desc5:`${title}가 체계화되어 신뢰 데이터 확보`, desc4:`메타데이터/품질 관리`, desc3:`부서별 상이`, desc2:`정의/소유 불분명`, desc1:`데이터 무관리`, actions:['메타데이터/카탈로그','품질·정합성 규칙','접근권한 관리','데이터 수명주기'] },
    dx: { kw:'디지털 전환', desc5:`${title} 전략·조직·문화 정렬 완료`, desc4:`핵심영역 DX 진행`, desc3:`PoC 중심 단계`, desc2:`단위자동화 수준`, desc1:`미착수`, actions:['DX 비전 수립','로드맵/거버넌스','파일럿→확산','성과관리'] },
    change: { kw:'변화관리', desc5:`${title} 역량이 내재화`, desc4:`체계적 변화관리 운영`, desc3:`프로젝트별 상이`, desc2:`저항/커뮤니케이션 미흡`, desc1:`계획 부재`, actions:['스폰서십/챔피언','커뮤니케이션 플랜','저항관리','성과/인정'] },
    culture: { kw:'혁신문화', desc5:`${title}가 조직 핵심가치`, desc4:`실험/학습 장려`, desc3:`문화 불균등`, desc2:`실패기피/사일로`, desc1:`보수문화`, actions:['심리적 안정감','지식공유 장려','실험 예산','사내 커뮤니티'] },
    leadership: { kw:'리더십 지원', desc5:`${title}가 강력히 수행`, desc4:`스폰서십/성과책임`, desc3:`부서별 편차`, desc2:`우선순위 낮음`, desc1:`무관심`, actions:['경영진 위원회','정례 리뷰','리더 교육','목표/보상 연계'] },
    skills: { kw:'직원 AI 역량', desc5:`${title}가 충분`, desc4:`역할별 역량 정의/육성`, desc3:`기초 역량 수준`, desc2:`학습기회 제한`, desc1:`역량 부족`, actions:['역량맵/스킬 매트릭스','러닝패스','멘토링','자격/평가'] },
    eduSystem: { kw:'교육/훈련 체계', desc5:`${title}가 연중 운영`, desc4:`분기별 커리큘럼`, desc3:`연 1회/선택적`, desc2:`임시적 교육`, desc1:`체계 부재`, actions:['커리큘럼/캘린더','실습/캡스톤','성과측정','사내강사'] },
    collab: { kw:'협업문화/도구', desc5:`${title}가 고도화`, desc4:`표준 협업도구/규범`, desc3:`팀별 상이`, desc2:`사일로 심함`, desc1:`협업 부재`, actions:['표준툴/워크플로우','지식베이스','OKR/공유보드','회고/리뷰'] },
    experimentation: { kw:'실험/파일럿', desc5:`${title} 정례화`, desc4:`분기 파일럿 운영`, desc3:`간헐적 PoC`, desc2:`실험문화 약함`, desc1:`실험 없음`, actions:['아이디어 파이프라인','실험 템플릿','실험-리뷰-확산','예산/보상체계'] },
    cloud: { kw:'클라우드 성숙도', desc5:`${title} 네이티브`, desc4:`대부분 클라우드화`, desc3:`하이브리드/부분`, desc2:`제한적 도입`, desc1:`미도입`, actions:['클라우드 전략','마이그레이션 계획','보안/비용 최적화','IaC/자동화'] },
    dataInfra: { kw:'데이터 인프라', desc5:`${title} 완비`, desc4:`데이터 파이프라인/웨어하우스`, desc3:`부분 구축`, desc2:`수동/엑셀 의존`, desc1:`부재`, actions:['데이터 레이크/웨어하우스','ETL/ELT 표준화','카탈로그/품질','실시간 파이프라인'] },
    security: { kw:'보안/접근통제', desc5:`${title} 우수`, desc4:`정책/감사로그 운영`, desc3:`기본 통제`, desc2:`취약점 다수`, desc1:`무방비`, actions:['IAM/Zero Trust','암호화/키관리','감사/모니터링','보안 훈련'] },
    network: { kw:'네트워크 안정성', desc5:`${title} 고가용성`, desc4:`모니터링/자동치유`, desc3:`기본 가용성`, desc2:`빈번한 장애`, desc1:`불안정`, actions:['대역폭/지연 개선','SD-WAN','모니터링/알림','DR 경로'] },
    itModern: { kw:'IT 현대화', desc5:`${title} 완료`, desc4:`주요 시스템 현대화 진행`, desc3:`일부 레거시`, desc2:`레거시 비중 큼`, desc1:`현대화 계획 부재`, actions:['애플리케이션 리프트&시프트','리팩토링 계획','API 퍼스트','마이크로서비스'] },
    integration: { kw:'시스템 통합', desc5:`${title} 원활`, desc4:`중앙 ESB/API 게이트웨이`, desc3:`점대점 통합`, desc2:`단절/중복데이터`, desc1:`통합 부재`, actions:['API 게이트웨이','이벤트 기반 통합','데이터 동기화','표준 스키마'] },
    observability: { kw:'모니터링/관측성', desc5:`${title} 우수(Logs/Metrics/Traces)`, desc4:`핵심 서비스 관측`, desc3:`기본 모니터링`, desc2:`사후 대응 위주`, desc1:`모니터링 부재`, actions:['통합 Observability','SLO/SLA 정의','알림 룰','근본원인분석(RCA)'] },
    backup: { kw:'백업/DR', desc5:`${title} 주기/복구 목표 달성`, desc4:`정기 복구훈련`, desc3:`백업만 수행`, desc2:`복구 미검증`, desc1:`백업 부재`, actions:['RPO/RTO 수립','오프사이트/버전관리','복구훈련', '자동화 스크립트'] },
    aiStrategy: { kw:'AI 전략/비전', desc5:`${title}가 전사 합의/문서화`, desc4:`전략 문서/연간계획`, desc3:`방향성만 존재`, desc2:`전략 산발적`, desc1:`부재`, actions:['비전정의/원칙','전략테마/과제','거버넌스','성과지표 연계'] },
    kpiDesign: { kw:'성과 지표 설계', desc5:`${title}가 정량/정성 균형`, desc4:`지표-데이터 매핑`, desc3:`측정 곤란 지표 존재`, desc2:`지표 난립/불일치`, desc1:`지표 부재`, actions:['KPI 트리','데이터 소스 매핑','정의서 관리','리뷰/정비'] },
    prioritization: { kw:'우선순위', desc5:`${title}가 가치/노력 기반`, desc4:`WSJF/ICE 등 적용`, desc3:`관행적 결정`, desc2:`이해관계자 압력 영향`, desc1:`무계획`, actions:['가치-노력 매트릭스','WSJF/ICE', '의사결정 기준', '분기 계획'] },
    roadmap: { kw:'로드맵', desc5:`${title}가 단계/마일스톤/예산 명확`, desc4:`분기 계획 수립`, desc3:`고수준 로드맵만`, desc2:`산발적 계획`, desc1:`부재`, actions:['분기/연간 로드맵','마일스톤/KPI','리스크/의존성', '리뷰 사이클'] },
    stakeholders: { kw:'이해관계자 정렬', desc5:`${title}가 폭넓게 확보`, desc4:`주요 Stakeholder 정례 협의`, desc3:`부서 일부 합의`, desc2:`갈등/불일치`, desc1:`정렬 없음`, actions:['RACI/커뮤니케이션 계획','이해관계자 맵','정례 회의','의견수렴/피드백'] },
    communication: { kw:'내부 소통', desc5:`${title}가 다채널/투명 운영`, desc4:`정기 타운홀/브리핑`, desc3:`공지 위주 소통`, desc2:`단방향/지연`, desc1:`소통 부재`, actions:['커뮤니케이션 캘린더','FAQ/위키','성과/교훈 공유','피드백 루프'] },
    smart: { kw:'SMART 목표', desc5:`${title}가 SMART로 정립`, desc4:`대부분 SMART`, desc3:`일부 정성목표`, desc2:`모호/포괄적`, desc1:`정의 없음`, actions:['SMART 템플릿','정의/측정치 확정','검증/정렬', '정기 점검'] },
    tracking: { kw:'성과 추적', desc5:`${title}가 상시 추적/리뷰`, desc4:`월간 리뷰`, desc3:`분기 리뷰`, desc2:`비정기 리뷰`, desc1:`리뷰 없음`, actions:['성과대시보드','리뷰 의식','교훈 데이터화', '개선 백로그'] },
    projectMgmt: { kw:'프로젝트 관리', desc5:`${title}가 성숙(포트폴리오/리스크)`, desc4:`표준 PMO/방법론`, desc3:`팀별 상이`, desc2:`일정/품질 변동 큼`, desc1:`관리 부재`, actions:['PMO/방법론','리스크/이슈 관리','간트/칸반', '회고/통합'] },
    resource: { kw:'자원 배분', desc5:`${title}가 전략정렬/동태적`, desc4:`분기 재조정`, desc3:`연간 고정 중심`, desc2:`임기응변`, desc1:`비효율`, actions:['Capacity 계획','우선순위 연계','버짓 게이팅', '가용성 대시보드'] },
    achievement: { kw:'성과 달성', desc5:`${title}가 목표 초과`, desc4:`목표 달성 안정적`, desc3:`편차 존재`, desc2:`미달 빈번`, desc1:`상시 미달`, actions:['성과분석/교훈','병목 제거','지원/코칭','인센티브 정렬'] },
    problemSolving: { kw:'문제해결/의사결정', desc5:`${title}가 데이터 기반 즉시`, desc4:`체계적 의사결정`, desc3:`경험/직관 혼용`, desc2:`의사결정 지연`, desc1:`비체계/감정적`, actions:['의사결정 프레임', '데이터 룰', '에스컬레이션', '회고'] },
    execution: { kw:'실행력', desc5:`${title}가 탁월`, desc4:`실행 지연 적음`, desc3:`일부 지연`, desc2:`지연 다수`, desc1:`실행 실패`, actions:['책임/권한 명확화','체크리스트/표준','데일리/위클리 리듬','장애물 제거 루프'] }
  };

  const tt = T[topic];
  return [
    { score: 5, label: '매우 우수', keyword: tt.kw, description: tt.desc5, actionItems: tt.actions, expectedOutcome: `${q.sectionTitle} 성숙도 도약 및 ROI 극대화`, color: s5.color, bgColor: s5.bg },
    { score: 4, label: '우수', keyword: tt.kw, description: tt.desc4, actionItems: tt.actions, expectedOutcome: `${q.sectionTitle} 역량 고도화`, color: s4.color, bgColor: s4.bg },
    { score: 3, label: '보통', keyword: tt.kw, description: tt.desc3, actionItems: tt.actions, expectedOutcome: `${q.sectionTitle} 평균 수준 유지`, color: s3.color, bgColor: s3.bg },
    { score: 2, label: '개선 필요', keyword: tt.kw, description: tt.desc2, actionItems: tt.actions, expectedOutcome: `${q.sectionTitle} 기본 체계 확보`, color: s2.color, bgColor: s2.bg },
    { score: 1, label: '매우 부족', keyword: tt.kw, description: tt.desc1, actionItems: tt.actions, expectedOutcome: `${q.sectionTitle} 최소 기준 달성`, color: s1.color, bgColor: s1.bg },
  ];
}

export const QUESTION_SPECIFIC_BEHAVIOR_INDICATORS: QuestionBehaviorIndicator[] = [
  // Q1: 사업 모델 명확성
  {
    questionId: 1,
    indicators: [
      { score: 5, label: "매우 명확", keyword: "체계적 사업모델", description: "모든 사업 요소가 체계적으로 정의되고 문서화되어 있습니다", actionItems: ["비즈니스 모델 캔버스 완성", "가치 제안 명확히 정의", "수익 구조 체계화", "고객 세분화 완료"], expectedOutcome: "명확한 사업 방향성으로 의사결정 속도 50% 향상", color: "text-green-700", bgColor: "bg-green-50 border-green-200" },
      { score: 4, label: "명확", keyword: "잘 정의된 모델", description: "대부분의 사업 요소가 잘 정의되어 있습니다", actionItems: ["핵심 가치 제안 정리", "주요 고객군 식별", "수익원 다각화 검토", "경쟁 우위 요소 강화"], expectedOutcome: "사업 효율성 30% 향상", color: "text-blue-700", bgColor: "bg-blue-50 border-blue-200" },
      { score: 3, label: "보통", keyword: "기본 모델 보유", description: "기본적인 사업 모델은 있으나 구체화 필요합니다", actionItems: ["사업 모델 재검토", "고객 니즈 분석 강화", "수익성 개선 방안 수립", "차별화 전략 개발"], expectedOutcome: "사업 모델 개선으로 수익성 20% 향상", color: "text-yellow-700", bgColor: "bg-yellow-50 border-yellow-200" },
      { score: 2, label: "불명확", keyword: "부분적 정의", description: "일부 요소만 정의되어 전체적인 체계성이 부족합니다", actionItems: ["사업 모델 워크숍 실시", "시장 조사 및 분석", "고객 인터뷰 진행", "경쟁사 벤치마킹"], expectedOutcome: "체계적 사업 모델 수립으로 방향성 확립", color: "text-orange-700", bgColor: "bg-orange-50 border-orange-200" },
      { score: 1, label: "매우 불명확", keyword: "모델 부재", description: "사업 모델이 전혀 정의되지 않아 체계적 접근이 필요합니다", actionItems: ["사업 모델 기초 교육", "외부 컨설팅 지원", "단계별 모델 구축", "팀 역량 강화"], expectedOutcome: "기본적 사업 모델 수립으로 경영 안정성 확보", color: "text-red-700", bgColor: "bg-red-50 border-red-200" }
    ]
  },

  // Q2: 경쟁 우위
  {
    questionId: 2,
    indicators: [
      { score: 5, label: "매우 높음", keyword: "시장 리더십", description: "시장을 선도하는 압도적 경쟁력을 보유하고 있습니다", actionItems: ["시장 점유율 확대", "혁신 기술 개발", "브랜드 가치 제고", "글로벌 진출 추진"], expectedOutcome: "시장 지배력 강화로 매출 40% 성장", color: "text-green-700", bgColor: "bg-green-50 border-green-200" },
      { score: 4, label: "높음", keyword: "경쟁 우위", description: "경쟁사 대비 명확한 우위를 가지고 있습니다", actionItems: ["핵심 역량 강화", "차별화 요소 확대", "고객 만족도 제고", "파트너십 구축"], expectedOutcome: "경쟁 우위 유지로 안정적 성장 달성", color: "text-blue-700", bgColor: "bg-blue-50 border-blue-200" },
      { score: 3, label: "보통", keyword: "평균 수준", description: "업계 평균 수준의 경쟁력을 보유하고 있습니다", actionItems: ["경쟁력 분석 실시", "강점 영역 발굴", "약점 보완 계획", "혁신 아이템 개발"], expectedOutcome: "경쟁력 강화로 시장 포지션 개선", color: "text-yellow-700", bgColor: "bg-yellow-50 border-yellow-200" },
      { score: 2, label: "낮음", keyword: "경쟁 열세", description: "경쟁사 대비 열세한 상황으로 개선이 시급합니다", actionItems: ["경쟁사 벤치마킹", "핵심 역량 재정의", "비용 효율성 제고", "고객 가치 재창출"], expectedOutcome: "경쟁력 회복으로 시장 생존력 확보", color: "text-orange-700", bgColor: "bg-orange-50 border-orange-200" },
      { score: 1, label: "매우 낮음", keyword: "위기 상황", description: "경쟁력이 매우 낮아 근본적 변화가 필요합니다", actionItems: ["사업 재구조화", "핵심 역량 집중", "비즈니스 모델 혁신", "전문가 지원 확보"], expectedOutcome: "기본 경쟁력 확보로 사업 안정성 회복", color: "text-red-700", bgColor: "bg-red-50 border-red-200" }
    ]
  },

  // Q3~Q45: 문항 텍스트와 카테고리 기반 전문 템플릿으로 생성
  ...REAL_45_QUESTIONS.filter(q => q.id >= 3 && q.id <= 45).map((q) => ({
    questionId: q.id,
    indicators: buildIndicatorsByTopic(q)
  }))
];

// 특정 질문의 행동지표를 가져오는 헬퍼 함수
export function getQuestionBehaviorIndicators(questionId: number) {
  const questionIndicators = QUESTION_SPECIFIC_BEHAVIOR_INDICATORS.find(
    q => q.questionId === questionId
  );
  
  if (!questionIndicators) {
    // 기본 행동지표 반환 (fallback)
    return [
      { score: 5, label: "매우 우수", keyword: "최고 수준", description: "해당 영역에서 최고 수준의 역량을 보유하고 있습니다", actionItems: ["현재 수준 유지", "지속적 개선", "벤치마킹 대상"], expectedOutcome: "업계 리더십 확보", color: "text-green-700", bgColor: "bg-green-50 border-green-200" },
      { score: 4, label: "우수", keyword: "높은 수준", description: "해당 영역에서 높은 수준의 역량을 보유하고 있습니다", actionItems: ["강점 유지", "추가 개선", "우수 사례 공유"], expectedOutcome: "경쟁 우위 확보", color: "text-blue-700", bgColor: "bg-blue-50 border-blue-200" },
      { score: 3, label: "보통", keyword: "평균 수준", description: "해당 영역에서 평균적인 수준의 역량을 보유하고 있습니다", actionItems: ["개선 계획 수립", "역량 강화", "벤치마킹"], expectedOutcome: "평균 이상 달성", color: "text-yellow-700", bgColor: "bg-yellow-50 border-yellow-200" },
      { score: 2, label: "개선 필요", keyword: "부족한 수준", description: "해당 영역에서 개선이 필요한 수준입니다", actionItems: ["즉시 개선", "역량 개발", "전문가 지원"], expectedOutcome: "기본 수준 달성", color: "text-orange-700", bgColor: "bg-orange-50 border-orange-200" },
      { score: 1, label: "매우 부족", keyword: "심각한 수준", description: "해당 영역에서 심각한 개선이 필요합니다", actionItems: ["긴급 조치", "기초 구축", "외부 지원"], expectedOutcome: "기본 체계 확립", color: "text-red-700", bgColor: "bg-red-50 border-red-200" }
    ];
  }
  
  return questionIndicators.indicators;
}

// 점수별 행동지표를 가져오는 헬퍼 함수
export function getScoreBehaviorIndicator(questionId: number, score: number) {
  const indicators = getQuestionBehaviorIndicators(questionId);
  return indicators.find(indicator => indicator.score === score);
}