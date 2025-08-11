'use client';

import { IndustryCurriculum } from '@/types/curriculum.types';

export const professionalCurriculum: IndustryCurriculum = {
  industry: '전문서비스',
  industryKey: 'professional',
  description: '컨설팅, 법무, 회계 등 전문서비스 분야의 AI 자동화 교육',
  levels: [
    {
      id: 'professional-basic',
      level: '기초',
      duration: '32시간 (12시간×3일)',
      targetAudience: '전문서비스 실무자, 주니어 컨설턴트, 연구원',
      objectives: [
        '전문 문서 작성 및 분석 자동화',
        '리서치 및 데이터 수집 자동화',
        '클라이언트 커뮤니케이션 효율화'
      ],
      sessions: [
        { time: '1교시', topic: 'AI 기반 리서치', description: 'ChatGPT로 시장조사 및 경쟁사 분석' },
        { time: '2교시', topic: '보고서 자동 생성', description: 'GPT를 활용한 전문 보고서 작성' },
        { time: '3교시', topic: '데이터 시각화', description: '차트와 그래프 자동 생성' },
        { time: '4교시', topic: 'n8n 업무 자동화', description: '반복 업무 프로세스 자동화' },
        { time: '5교시', topic: '클라이언트 관리', description: 'CRM 연동 및 이메일 자동화' },
        { time: '6교시', topic: '프로젝트 관리 자동화', description: '일정 관리, 태스크 배분 자동화' },
        { time: '7교시', topic: '법률 문서 분석', description: 'NLP 기반 계약서 검토' },
        { time: '8교시', topic: '재무 데이터 처리', description: '회계 자료 자동 분석 및 리포트' },
        { time: '9교시', topic: '제안서 자동 생성', description: 'RFP 대응 및 제안서 작성 자동화' },
        { time: '10교시', topic: '지식 관리 시스템', description: '내부 지식 DB 구축 및 검색' },
        { time: '11교시', topic: '실무 적용 워크숍', description: '각자 업무에 맞춘 자동화 설계' },
        { time: '12교시', topic: '성과 측정 및 개선', description: '자동화 ROI 측정 및 최적화' }
      ],
      outcomes: [
        '전문 문서 작성 시간 70% 단축',
        'AI 기반 인사이트 도출 능력',
        '클라이언트 대응 속도 2배 향상'
      ]
    },
    {
      id: 'professional-advanced',
      level: '심화',
      duration: '48시간 (12시간×4일)',
      targetAudience: '시니어 컨설턴트, 프로젝트 매니저, 팀 리더',
      objectives: [
        '복잡한 분석 모델 자동화',
        'AI 기반 의사결정 지원 시스템 구축',
        '팀 전체 업무 프로세스 혁신'
      ],
      sessions: [
        { time: '1교시', topic: '고급 데이터 분석', description: 'ML 모델을 활용한 예측 분석' },
        { time: '2교시', topic: '산업별 AI 솔루션', description: '업종별 특화 AI 활용법' },
        { time: '3교시', topic: '전략 시뮬레이션', description: 'AI 기반 시나리오 분석' },
        { time: '4교시', topic: '복잡한 워크플로우', description: 'n8n 고급 기능 활용' },
        { time: '5교시', topic: '팀 협업 자동화', description: '부서간 업무 프로세스 연결' },
        { time: '6교시', topic: '품질 관리 자동화', description: 'QA 프로세스 및 리뷰 자동화' },
        { time: '7교시', topic: '리스크 관리 AI', description: '프로젝트 리스크 예측 및 대응' },
        { time: '8교시', topic: '클라이언트 인사이트', description: '고객 데이터 분석 및 예측' },
        { time: '9교시', topic: '혁신 프로세스 설계', description: '전사적 디지털 전환 전략' },
        { time: '10교시', topic: '성과 최적화', description: 'KPI 모니터링 및 개선' },
        { time: '11교시', topic: '베스트 프랙티스', description: '글로벌 사례 연구' },
        { time: '12교시', topic: '액션 플랜', description: '조직 AI 도입 로드맵' }
      ],
      outcomes: [
        '복잡한 프로젝트 관리 자동화',
        'AI 기반 전략 수립 역량',
        '팀 생산성 150% 향상'
      ]
    },
    {
      id: 'professional-executive',
      level: '경영진',
      duration: '16시간 (8시간×2일)',
      targetAudience: '파트너, 임원, 사업부장',
      objectives: [
        '전문서비스 산업의 AI 전환 전략',
        '새로운 비즈니스 모델 개발',
        '조직 혁신 리더십'
      ],
      sessions: [
        { time: '1교시', topic: 'AI 시대의 전문서비스', description: '산업 패러다임 변화와 기회' },
        { time: '2교시', topic: '디지털 혁신 전략', description: '전문서비스 기업의 DX 로드맵' },
        { time: '3교시', topic: '새로운 수익 모델', description: 'AI 기반 서비스 상품화' },
        { time: '4교시', topic: '인재 전략', description: 'AI 시대 인재 확보 및 육성' },
        { time: '5교시', topic: '파트너십 전략', description: '기술 기업과의 협업 모델' },
        { time: '6교시', topic: '리스크 관리', description: 'AI 도입 리스크와 대응' },
        { time: '7교시', topic: '글로벌 트렌드', description: '해외 선진 사례 분석' },
        { time: '8교시', topic: '전략 수립 워크숍', description: '우리 조직 AI 비전 수립' }
      ],
      outcomes: [
        '전문서비스 AI 전환 전략',
        '새로운 비즈니스 모델 설계',
        '혁신 리더십 역량 강화'
      ]
    }
  ]
};

export const financeCurriculum: IndustryCurriculum = {
  industry: '금융업',
  industryKey: 'finance',
  description: '핀테크 혁신과 리스크 관리를 위한 금융 특화 AI 교육',
  levels: [
    {
      id: 'finance-basic',
      level: '기초',
      duration: '32시간 (12시간×3일)',
      targetAudience: '은행/증권/보험 실무자, 리스크 관리팀',
      objectives: [
        '금융 데이터 분석 자동화',
        '리스크 모니터링 시스템 구축',
        '고객 서비스 자동화'
      ],
      sessions: [
        { time: '1교시', topic: '금융 AI 개요', description: '핀테크와 AI 트렌드' },
        { time: '2교시', topic: '신용 평가 자동화', description: 'ML 기반 신용 스코어링' },
        { time: '3교시', topic: '사기 탐지 시스템', description: '이상거래 탐지 AI' },
        { time: '4교시', topic: 'n8n 금융 워크플로우', description: '금융 업무 프로세스 자동화' },
        { time: '5교시', topic: '투자 분석 자동화', description: '시장 데이터 수집 및 분석' },
        { time: '6교시', topic: '리포트 자동 생성', description: '일일/주간/월간 리포트 자동화' },
        { time: '7교시', topic: '컴플라이언스 자동화', description: '규제 준수 모니터링' },
        { time: '8교시', topic: '고객 온보딩', description: 'KYC 프로세스 자동화' },
        { time: '9교시', topic: '포트폴리오 관리', description: 'AI 기반 자산 배분' },
        { time: '10교시', topic: '챗봇 구축', description: '금융 상담 챗봇 개발' },
        { time: '11교시', topic: '실무 적용 실습', description: '부서별 자동화 프로젝트' },
        { time: '12교시', topic: '보안 및 규제', description: '금융 AI 보안 가이드라인' }
      ],
      outcomes: [
        '금융 업무 처리 속도 80% 향상',
        '리스크 탐지 정확도 95% 달성',
        '고객 응대 시간 60% 단축'
      ]
    },
    {
      id: 'finance-advanced',
      level: '심화',
      duration: '48시간 (12시간×4일)',
      targetAudience: '퀀트, 리스크 매니저, 상품 개발팀',
      objectives: [
        '고급 금융 모델링 자동화',
        'AI 트레이딩 시스템 구축',
        '차세대 금융 서비스 개발'
      ],
      sessions: [
        { time: '1교시', topic: '알고리즘 트레이딩', description: 'ML 기반 자동 매매 시스템' },
        { time: '2교시', topic: '리스크 모델링', description: 'VAR, 스트레스 테스트 자동화' },
        { time: '3교시', topic: '대체 데이터 분석', description: '위성사진, SNS 데이터 활용' },
        { time: '4교시', topic: '블록체인 연동', description: 'DeFi와 전통 금융 통합' },
        { time: '5교시', topic: '로보어드바이저', description: 'AI 자산관리 서비스 개발' },
        { time: '6교시', topic: '신용평가 고도화', description: '대안신용평가 모델' },
        { time: '7교시', topic: '보험 언더라이팅', description: 'AI 기반 보험 심사' },
        { time: '8교시', topic: '금융 사기 예방', description: '실시간 이상탐지 시스템' },
        { time: '9교시', topic: 'RegTech 솔루션', description: '규제 대응 자동화' },
        { time: '10교시', topic: '오픈뱅킹 API', description: 'API 연동 자동화' },
        { time: '11교시', topic: '혁신 서비스 기획', description: '신규 핀테크 서비스 설계' },
        { time: '12교시', topic: '구현 및 테스트', description: 'MVP 개발 및 검증' }
      ],
      outcomes: [
        '알고리즘 트레이딩 수익률 향상',
        '리스크 예측 정확도 90% 이상',
        '혁신 금융 서비스 출시'
      ]
    },
    {
      id: 'finance-executive',
      level: '경영진',
      duration: '16시간 (8시간×2일)',
      targetAudience: '금융기관 임원, CIO, CDO',
      objectives: [
        '디지털 금융 전략 수립',
        'AI 기반 비즈니스 혁신',
        '규제 대응 및 리스크 관리'
      ],
      sessions: [
        { time: '1교시', topic: '글로벌 핀테크 트렌드', description: '금융 산업 패러다임 변화' },
        { time: '2교시', topic: '빅테크와의 경쟁', description: '플랫폼 전략과 대응' },
        { time: '3교시', topic: 'AI 규제 동향', description: '국내외 AI 금융 규제' },
        { time: '4교시', topic: '디지털 전환 로드맵', description: '단계별 DX 전략' },
        { time: '5교시', topic: '오픈 이노베이션', description: '스타트업 협업 전략' },
        { time: '6교시', topic: '인재 및 조직', description: 'AI 조직 구축 방안' },
        { time: '7교시', topic: '사이버 보안', description: 'AI 시대 보안 전략' },
        { time: '8교시', topic: '미래 전략 수립', description: '5년 후 금융 비전' }
      ],
      outcomes: [
        '디지털 금융 전략 마스터플랜',
        'AI 거버넌스 체계 구축',
        '혁신 경영 리더십'
      ]
    }
  ]
};

export const logisticsCurriculum: IndustryCurriculum = {
  industry: '물류유통',
  industryKey: 'logistics',
  description: '스마트 물류와 공급망 최적화를 위한 AI 자동화 교육',
  levels: [
    {
      id: 'logistics-basic',
      level: '기초',
      duration: '28시간 (12시간×2.5일)',
      targetAudience: '물류 관리자, SCM 담당자, 창고 운영팀',
      objectives: [
        '물류 프로세스 자동화 기초',
        '재고 관리 및 예측 시스템',
        '배송 경로 최적화'
      ],
      sessions: [
        { time: '1교시', topic: '스마트 물류 개요', description: 'AI가 바꾸는 물류 산업' },
        { time: '2교시', topic: '재고 예측 AI', description: '수요 예측 및 재고 최적화' },
        { time: '3교시', topic: '경로 최적화', description: 'AI 기반 배송 경로 설계' },
        { time: '4교시', topic: 'n8n 물류 자동화', description: '물류 업무 프로세스 자동화' },
        { time: '5교시', topic: 'WMS 연동', description: '창고관리시스템 자동화' },
        { time: '6교시', topic: '실시간 추적', description: 'IoT 센서 데이터 활용' },
        { time: '7교시', topic: '피킹 최적화', description: '창고 내 동선 최적화' },
        { time: '8교시', topic: '운송 관리', description: 'TMS 자동화 및 최적화' },
        { time: '9교시', topic: '고객 알림 자동화', description: '배송 상태 자동 알림' },
        { time: '10교시', topic: '리포트 자동화', description: 'KPI 대시보드 구축' },
        { time: '11교시', topic: '실무 프로젝트', description: '물류 시나리오 자동화' },
        { time: '12교시', topic: '성과 분석', description: '자동화 효과 측정' }
      ],
      outcomes: [
        '물류 처리 시간 50% 단축',
        '재고 정확도 98% 달성',
        '배송 효율성 40% 향상'
      ]
    },
    {
      id: 'logistics-advanced',
      level: '심화',
      duration: '40시간 (12시간×3.5일)',
      targetAudience: '물류 전략팀, SCM 매니저, 운영 총괄',
      objectives: [
        '공급망 전체 최적화',
        '예측 물류 시스템 구축',
        '자율 물류 운영 체계'
      ],
      sessions: [
        { time: '1교시', topic: '공급망 디지털 트윈', description: '가상 시뮬레이션 구축' },
        { time: '2교시', topic: '수요 예측 고도화', description: 'ML 기반 정밀 예측' },
        { time: '3교시', topic: '동적 가격 최적화', description: 'AI 기반 운임 책정' },
        { time: '4교시', topic: '멀티모달 최적화', description: '복합 운송 경로 설계' },
        { time: '5교시', topic: '로봇 프로세스 자동화', description: 'RPA 도입 및 운영' },
        { time: '6교시', topic: '드론/자율주행 배송', description: '미래 배송 기술 활용' },
        { time: '7교시', topic: '블록체인 물류', description: '투명한 공급망 구축' },
        { time: '8교시', topic: '지속가능 물류', description: '탄소중립 물류 전략' },
        { time: '9교시', topic: '리스크 관리', description: '공급망 리스크 예측' },
        { time: '10교시', topic: '글로벌 물류 네트워크', description: '국제 물류 최적화' },
        { time: '11교시', topic: '혁신 프로젝트', description: '차세대 물류 서비스' },
        { time: '12교시', topic: '실행 전략', description: '단계별 구현 로드맵' }
      ],
      outcomes: [
        '공급망 비용 30% 절감',
        '완전 자동화 물류 센터 구축',
        '고객 만족도 95% 달성'
      ]
    },
    {
      id: 'logistics-executive',
      level: '경영진',
      duration: '12시간 (6시간×2일)',
      targetAudience: '물류기업 임원, COO, CTO',
      objectives: [
        '스마트 물류 전략 수립',
        '디지털 공급망 혁신',
        '미래 물류 비즈니스 모델'
      ],
      sessions: [
        { time: '1교시', topic: '물류 4.0 트렌드', description: '글로벌 물류 혁신 동향' },
        { time: '2교시', topic: '플랫폼 경제', description: '물류 플랫폼 비즈니스' },
        { time: '3교시', topic: 'ESG와 물류', description: '지속가능 물류 전략' },
        { time: '4교시', topic: '기술 투자 전략', description: 'AI/로봇/자동화 투자' },
        { time: '5교시', topic: '파트너십 전략', description: '생태계 구축 방안' },
        { time: '6교시', topic: '조직 혁신', description: '디지털 인재 육성' },
        { time: '7교시', topic: '글로벌 경쟁력', description: '국제 물류 허브 전략' },
        { time: '8교시', topic: '미래 비전', description: '10년 후 물류 산업' }
      ],
      outcomes: [
        '스마트 물류 마스터플랜',
        '디지털 전환 로드맵',
        '혁신 비즈니스 모델'
      ]
    }
  ]
};
