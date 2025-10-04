'use client';

import { IndustryCurriculum } from '@/types/curriculum.types';

export const manufacturingCurriculum: IndustryCurriculum = {
  industry: '제조업',
  industryKey: 'manufacturing',
  description: '생산성 향상과 품질 혁신을 위한 제조업 특화 AI 자동화 교육',
  levels: [
    {
      id: 'manufacturing-basic',
      level: '기초',
      duration: '36시간 (12시간×3일)',
      targetAudience: 'HR, 총무팀, 교육·복무 담당자',
      objectives: [
        '제조/서내 관리/문서 정리를 자동화하는 기초 역량 습득',
        'AI를 활용한 이력서 요약, 문서 자동 작성 등 실습',
        'n8n을 활용해 일상 안내, 복무 요청 말림 등을 자동화'
      ],
      sessions: [
        { time: '1교시', topic: '생성형 AI 개요', description: '인사/총무 업무에서의 GPT 활용 프린트 이해' },
        { time: '2교시', topic: '이력서 요약 프롬프트 작성', description: '지원서 이력서 + 요약 + 평가 포맷 구성' },
        { time: '3교시', topic: '자동공고 자동 생성 실습', description: '직무 키워드 입력 → GPT로 공고 초안 작성' },
        { time: '4교시', topic: 'n8n 구조 및 기본 사용 실습', description: '노드 연결 및 간단한 플로우 만들기' },
        { time: '5교시', topic: '일사처 응답단위 안내 자동화', description: '구글폼 제출 → 안내 메일 자동 발송' },
        { time: '6교시', topic: '휴가신청 처리 자동화', description: '휴가 신청 → 승인 요청 전송 자동화' },
        { time: '7교시', topic: '인증도 설문 자동화', description: '조사 응답 → GPT 요약 → 시트/슬랙 공유' },
        { time: '8교시', topic: '교육 일정 알림 자동화', description: '교육 일정 등록 시 슬랙/메일 자동 알림' },
        { time: '9교시', topic: '문서작성 보조 자동화', description: '인사 공지/규정안 초안 자동화 실습' },
        { time: '10교시', topic: '자동화 플로우 그리기', description: '나의 반복 업무 자동화 설계 준비' },
        { time: '11교시', topic: '실습: 나만의 n8n 만들기', description: '개인 업무에 맞춘 실습 자동화 구현' },
        { time: '12교시', topic: '공유 및 피드백', description: '구성 경과 발표 및 실무 적용 코칭' }
      ],
      outcomes: [
        'GPT를 활용한 문서 작성 및 요약 능력 습득',
        'n8n 기반 업무 자동화 플로우 구축 능력',
        '반복 업무 자동화로 업무 효율 30% 이상 향상'
      ]
    },
    {
      id: 'manufacturing-advanced',
      level: '심화',
      duration: '60시간 (12시간×5일)',
      targetAudience: '생산관리, 품질관리, 품질관리, SCM, 품질관리 실무자',
      objectives: [
        '제고/일정/작업 리포트 자동화 역량 확보',
        '발목적인 수기업무 흡름 자동화',
        '품질 이슈 대응 및 알림 자동화 구성'
      ],
      sessions: [
        { time: '1교시', topic: '생성형 AI 개요', description: '생산/품류 업무에 적용되는 자동화 사례' },
        { time: '2교시', topic: '작업일지 요약 자동화', description: '텍스트 입력 → 요약 → 리포트 전송' },
        { time: '3교시', topic: '제고 수량 모니터링', description: '부족 수량 감지 → 알림 자동 발송' },
        { time: '4교시', topic: 'n8n 기본 실습', description: '구조 이해 및 노드 연습' },
        { time: '5교시', topic: '일정 관리/알트 자동화', description: '생산일정 → 슬랙/메일 일원' },
        { time: '6교시', topic: '품질이슈 요약 자동화', description: '점검기록 요약 및 보고서화' },
        { time: '7교시', topic: '입출고 보고 자동화', description: '입출고 시트 → 생성원 시 요약 → 보고 공유' },
        { time: '8교시', topic: '클레임 처리 요약 자동화', description: '클레임 → 분류 → 담당자 자동 전달' },
        { time: '9교시', topic: '알림 기반 대응 흐름 구성', description: '일정/문제 발생 시 자동 트리거 설계' },
        { time: '10교시', topic: '개인 워크플로 설계', description: '업무 흐름 자동화 설계' },
        { time: '11교시', topic: '구현 실습', description: '자동화 구현 및 실행 테인' },
        { time: '12교시', topic: '발표 및 코칭', description: '워크플로 발표 및 피드백 공유' }
      ],
      outcomes: [
        '생산 관리 전반의 자동화 시스템 구축',
        '품질 이슈 실시간 모니터링 및 대응 체계',
        '업무 효율성 60% 이상 향상'
      ]
    },
    {
      id: 'manufacturing-executive',
      level: '경영진',
      duration: '12시간 (4시간×3일)',
      targetAudience: '기획팀, 전략기획팀, 사업기획팀',
      objectives: [
        '생성형 AI의 기본 개념 이해',
        '부서별 AI 자동화 적용 사례 및 ROI 인사이트 확보',
        '조직 내 AI 전환을 위한 전략적 역량 인식'
      ],
      sessions: [
        { time: '1교시 (60분)', topic: 'AI & n8n 개요 및 글로벌 트렌드', description: '생성형 AI 흐름, n8n 소개, 글로벌 자동화 트렌드' },
        { time: '2교시 (60분)', topic: '부서별 자동화 사례와 생산성 효과', description: '마케팅, 영업, 인사 등 부서별 구체적 적용 사례' },
        { time: '3교시 (60분)', topic: '경영진의 역할과 조직 도입 전략', description: '조직 내 AI 확산 전략, 인력 재배치, 성공 조건 정리' }
      ],
      outcomes: [
        'AI 기술 트렌드 및 비즈니스 임팩트 이해',
        '조직 AI 전환 전략 수립 능력',
        'ROI 기반 AI 도입 의사결정 역량'
      ]
    }
  ]
};

export const serviceCurriculum: IndustryCurriculum = {
  industry: '서비스업',
  industryKey: 'service',
  description: '고객 경험 혁신과 서비스 품질 향상을 위한 AI 자동화 교육',
  levels: [
    {
      id: 'service-basic',
      level: '기초',
      duration: '36시간 (12시간×3일)',
      targetAudience: 'HR/총무 관리자, 인사 기획 실무자, 조직문화/운영 책임자',
      objectives: [
        '평가, 만족도, 복무 데이터 처리 자동화 역량',
        '내부 일림, 문서 작성, 피드백 수집 등 고급 업무 자동화 실현',
        '조직 내 서내 챗봇 및 AI 문서 서비스 기획/설계'
      ],
      sessions: [
        { time: '1교시', topic: '고급 n8n 노드 실습', description: '조건 분기, 반복, 시간 지연, 에러 대응 등' },
        { time: '2교시', topic: 'GPT API 커스터마이징', description: '인사/조직 데이터를 기반으로 GPT 활용 심화' },
        { time: '3교시', topic: '서내 월림 자동화 시스템', description: '연차 마감, 휴가일정, 교육 일정 일원 심름' },
        { time: '4교시', topic: '피드백 수집 → 요약 자동화', description: '정성 의견 → GPT 요약 → 보고서 자동 생성' },
        { time: '5교시', topic: '서내 문서 검색/요약 시스템', description: '서내 규정 → 요약 → 검색 응답 워크플로' },
        { time: '6교시', topic: '입퇴사 프로세스 통합 자동화', description: '입사 일대 → 정비 요청 → 안내자 전송 자동화' },
        { time: '7교시', topic: '내부 챗봇 발계 프로그램', description: 'FAQ 기반 Q&A 자동화 / 조직 문화솟 구성' },
        { time: '8교시', topic: 'HR 지표 자동 리포트', description: '월별 인사 지표 → 시각화 → 요약 보고' },
        { time: '9~10교시', topic: '실전 업무 자동화 설계 실습', description: '각자의 업무 혹출 분석 → 자동화 설계 실습' },
        { time: '11~12교시', topic: '발표 및 코칭', description: '자동화 구성 공유 → 실무 반영 피드백' }
      ],
      outcomes: [
        'GPT API를 활용한 고급 문서 처리 능력',
        '서비스 프로세스 전반의 자동화 구축',
        '고객 응대 시간 50% 단축'
      ]
    },
    {
      id: 'service-advanced',
      level: '심화',
      duration: '48시간 (12시간×4일)',
      targetAudience: '영업팀(B2B/B2C), 기술영업, 영업관리 담당자',
      objectives: [
        '영업 현장의 반목 업무를 자동화할 수 있는 기반 역량 확보',
        '제안서 작성, 고객 응대 메시지 생성 등 GPT 활용 익히기',
        'n8n을 이용한 일정/리포트 자동화 실습'
      ],
      sessions: [
        { time: '1교시', topic: '생성형 AI 이해', description: 'GPT를 영업 업무에 적용하는 방법' },
        { time: '2교시', topic: '영업 프롬프트 작품 잡업', description: '고객 유형별 프롬프트 영계 및 실습' },
        { time: '3교시', topic: '영대 메시지 자동화', description: '템플릿 기반 ChatGPT 응답 자동 생성' },
        { time: '4교시', topic: 'n8n 구조와 기초 노드 실습', description: 'Trigger+Action 구조 이해와 응용 워크플로우' },
        { time: '5교시', topic: '반목일정 자동 리마인드', description: 'Google Sheet + 조건 확인 + 자동 응용' },
        { time: '6교시', topic: '영업활동 리포트 응약 자동화', description: '주간 리포트 → GPT 요약 → 매일 발송' },
        { time: '7교시', topic: '미팅 후 이메일 자동 작성', description: '회의 메모 → 응대 이메일 초안 자동 생성' },
        { time: '8교시', topic: '고객사 정보 수집 자동화', description: '키워드 기반 뉴스 수집 → 요약 공유' },
        { time: '9교시', topic: '반목 제안서 문구 자동화', description: '제품/서비스별 제안서 문구 생성 실습' },
        { time: '10교시', topic: '자동화 흐름 구성하기', description: '실제 별인 업무 기반 흐름 그리기' },
        { time: '11교시', topic: '실전 실습', description: '영업 시나리오 기반 자동화 구성' },
        { time: '12교시', topic: '발표 및 피드백', description: '실습 결과 공유 및 워크플로우 개선 워크숍 피드백' }
      ],
      outcomes: [
        '영업 프로세스 자동화로 생산성 45% 향상',
        'AI 기반 고객 인사이트 도출 능력',
        '제안서 작성 시간 60% 단축'
      ]
    },
    {
      id: 'service-executive',
      level: '경영진',
      duration: '12시간 (4시간×3일)',
      targetAudience: '영업팀(B2B/B2C), 기술영업, 영업지원 실무자 및 관리자',
      objectives: [
        '고객 맞춤형 메시지/제안서 자동 생성 역량 확보',
        '일정 관리 및 후속 응대 자동화 오름 구성',
        '영업 실적 리포트 및 고객정보 수집 자동화'
      ],
      sessions: [
        { time: '1교시', topic: '생성형 AI 활용 개요', description: '영업 빠스트 생성 수준 이해' },
        { time: '2교시', topic: '고객 응대 문구 자동화', description: '고객유형별 프롬프트 영계 및 실습' },
        { time: '3교시', topic: '제안서 자동 초안 작성', description: '제품 정보 → 생성형 AI → 제안서 자동화' },
        { time: '4교시', topic: 'n8n 기본 실습', description: '트리거/조건/간투 후용 실흑' },
        { time: '5교시', topic: '일정 리마인더 자동화', description: '반목 일정 일측 자동 발송' },
        { time: '6교시', topic: '리프트 요약 자동화', description: '시트 입력구 → 생성형 AI 요약 후 메일 방송' },
        { time: '7교시', topic: '고객사 뉴스 모니터링', description: '키워드 기반 뉴스 수집 및 요약' },
        { time: '8교시', topic: '후속 조치 자동화', description: '미종담 고객 탐지 및 리마인드 발송' },
        { time: '9교시', topic: '술록/레일 알림 자동화', description: '주요 응대 타이밍 자동 관리' },
        { time: '10교시', topic: '영업 흐름 구성', description: '나의 업무 업무 자동화 설계' },
        { time: '11교시', topic: '실습 구성 실행', description: '나만의 n8n 워크플로우 작성 구현' },
        { time: '12교시', topic: '발표 및 코칭', description: '자동화 구성 리뷰 및 개선 피드백' }
      ],
      outcomes: [
        '서비스 혁신 전략 수립 능력',
        'AI 기반 고객 경험 설계 역량',
        'ROI 중심의 서비스 자동화 의사결정'
      ]
    }
  ]
};

export const startupCurriculum: IndustryCurriculum = {
  industry: '스타트업',
  industryKey: 'startup',
  description: '빠른 성장과 혁신을 위한 스타트업 특화 AI 교육',
  levels: [
    {
      id: 'startup-basic',
      level: '기초',
      duration: '24시간 (12시간×2일)',
      targetAudience: '스타트업 초기 팀원, 개발자, 기획자',
      objectives: [
        'MVP 개발을 위한 AI 활용법 습득',
        '빠른 프로토타이핑과 자동화',
        '리소스 효율화를 위한 도구 활용'
      ],
      sessions: [
        { time: '1교시', topic: 'AI 기반 MVP 전략', description: 'ChatGPT로 빠른 아이디어 검증' },
        { time: '2교시', topic: '코드 생성 AI 활용', description: 'GitHub Copilot, ChatGPT 코딩' },
        { time: '3교시', topic: '디자인 자동화', description: 'AI 디자인 툴 활용법' },
        { time: '4교시', topic: 'n8n 기초', description: '스타트업 업무 자동화 기초' },
        { time: '5교시', topic: '고객 피드백 자동 수집', description: '폼 → 분석 → 리포트 자동화' },
        { time: '6교시', topic: '마케팅 자동화', description: 'SNS 포스팅, 이메일 자동화' },
        { time: '7교시', topic: '데이터 수집 자동화', description: '경쟁사 분석, 시장 조사 자동화' },
        { time: '8교시', topic: '투자자 리포트 자동화', description: 'KPI 대시보드 자동 생성' },
        { time: '9교시', topic: '고객 온보딩 자동화', description: '가입 → 튜토리얼 → 피드백 자동화' },
        { time: '10교시', topic: '팀 협업 자동화', description: 'Slack, Notion 연동 자동화' },
        { time: '11교시', topic: '실습 프로젝트', description: '스타트업 시나리오 자동화 구현' },
        { time: '12교시', topic: '발표 및 피드백', description: '구현 결과 공유 및 개선점 논의' }
      ],
      outcomes: [
        'MVP 개발 속도 3배 향상',
        'AI 도구 활용한 린 스타트업 운영',
        '자동화를 통한 인력 효율 극대화'
      ]
    },
    {
      id: 'startup-advanced',
      level: '심화',
      duration: '36시간 (12시간×3일)',
      targetAudience: '스타트업 리더, 프로덕트 매니저, 그로스 해커',
      objectives: [
        '스케일업을 위한 AI 전략 수립',
        '데이터 기반 의사결정 자동화',
        '그로스 해킹 자동화 시스템 구축'
      ],
      sessions: [
        { time: '1교시', topic: 'AI 기반 그로스 전략', description: '데이터 드리븐 성장 전략' },
        { time: '2교시', topic: 'A/B 테스트 자동화', description: '실험 설계 → 분석 → 리포트 자동화' },
        { time: '3교시', topic: '유저 행동 분석 AI', description: 'ML 기반 유저 세그먼테이션' },
        { time: '4교시', topic: '펀딩 프로세스 자동화', description: 'IR 자료 생성, 투자자 관리' },
        { time: '5교시', topic: '제품 로드맵 AI 지원', description: 'GPT 기반 기능 우선순위 결정' },
        { time: '6교시', topic: '고객 성공 자동화', description: 'CS 자동화, 이탈 예측' },
        { time: '7교시', topic: '마켓 인텔리전스', description: '시장 동향 자동 분석' },
        { time: '8교시', topic: '팀 스케일링 자동화', description: '채용, 온보딩 프로세스 자동화' },
        { time: '9교시', topic: '파트너십 관리', description: 'B2B 세일즈 자동화' },
        { time: '10교시', topic: '투자 유치 전략', description: 'AI 기반 밸류에이션 분석' },
        { time: '11교시', topic: '실전 케이스 스터디', description: '유니콘 스타트업 AI 활용 사례' },
        { time: '12교시', topic: '액션 플랜 수립', description: '우리 스타트업 AI 로드맵' }
      ],
      outcomes: [
        '그로스 지표 200% 개선',
        'AI 기반 제품 혁신 역량',
        '자동화를 통한 스케일업 가속화'
      ]
    },
    {
      id: 'startup-executive',
      level: '경영진',
      duration: '8시간 (4시간×2일)',
      targetAudience: '스타트업 창업자, C-레벨, 투자자',
      objectives: [
        'AI 시대 스타트업 전략 이해',
        '투자 유치를 위한 AI 스토리텔링',
        '조직 문화와 AI 융합 방안'
      ],
      sessions: [
        { time: '1교시', topic: 'AI 네이티브 스타트업', description: 'AI-First 비즈니스 모델' },
        { time: '2교시', topic: '글로벌 AI 트렌드', description: '실리콘밸리 AI 스타트업 동향' },
        { time: '3교시', topic: 'AI 인재 전략', description: 'AI 팀 빌딩과 문화' },
        { time: '4교시', topic: '투자자 관점의 AI', description: 'AI 스타트업 밸류에이션' },
        { time: '5교시', topic: '규제와 윤리', description: 'AI 거버넌스와 컴플라이언스' },
        { time: '6교시', topic: '엑싯 전략', description: 'AI 기업 M&A 트렌드' },
        { time: '7교시', topic: '케이스 스터디', description: '성공/실패 AI 스타트업 분석' },
        { time: '8교시', topic: '전략 워크숍', description: '우리 회사 AI 비전 수립' }
      ],
      outcomes: [
        'AI 중심 비즈니스 전략 수립',
        '투자 유치 성공률 향상',
        'AI 네이티브 조직 문화 구축'
      ]
    }
  ]
};
