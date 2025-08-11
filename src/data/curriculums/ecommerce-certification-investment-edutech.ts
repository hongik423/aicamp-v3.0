'use client';

import { IndustryCurriculum } from '@/types/curriculum.types';

export const ecommerceCurriculum: IndustryCurriculum = {
  industry: '이커머스',
  industryKey: 'ecommerce',
  description: '온라인 쇼핑 최적화와 개인화 추천을 위한 이커머스 AI 교육',
  levels: [
    {
      id: 'ecommerce-basic',
      level: '기초',
      duration: '32시간 (12시간×3일)',
      targetAudience: '온라인 쇼핑몰 운영자, 마케터, CS팀',
      objectives: [
        '상품 관리 자동화',
        '고객 서비스 AI 활용',
        '마케팅 자동화 시스템'
      ],
      sessions: [
        { time: '1교시', topic: '이커머스 AI 개요', description: 'AI가 바꾸는 온라인 쇼핑' },
        { time: '2교시', topic: '상품 등록 자동화', description: '대량 상품 정보 자동 입력' },
        { time: '3교시', topic: '가격 최적화', description: '동적 가격 책정 시스템' },
        { time: '4교시', topic: 'n8n 이커머스', description: '쇼핑몰 운영 자동화' },
        { time: '5교시', topic: '재고 관리 자동화', description: '스마트 재고 예측 시스템' },
        { time: '6교시', topic: '주문 처리 자동화', description: '주문부터 배송까지 자동화' },
        { time: '7교시', topic: '고객 문의 자동화', description: 'CS 챗봇 구축 및 운영' },
        { time: '8교시', topic: '리뷰 관리', description: 'AI 기반 리뷰 분석 및 대응' },
        { time: '9교시', topic: '이메일 마케팅', description: '개인화 이메일 자동 발송' },
        { time: '10교시', topic: '소셜 커머스', description: 'SNS 판매 자동화' },
        { time: '11교시', topic: '실전 프로젝트', description: '쇼핑몰 자동화 구현' },
        { time: '12교시', topic: '성과 측정', description: '매출 향상 분석' }
      ],
      outcomes: [
        '운영 시간 60% 절감',
        '전환율 45% 향상',
        '고객 만족도 35% 증가'
      ]
    },
    {
      id: 'ecommerce-advanced',
      level: '심화',
      duration: '40시간 (12시간×3.5일)',
      targetAudience: '이커머스 전략팀, 데이터 분석가, 개발팀',
      objectives: [
        '개인화 추천 시스템',
        '옴니채널 통합 관리',
        'AI 기반 수요 예측'
      ],
      sessions: [
        { time: '1교시', topic: '추천 엔진 구축', description: '협업 필터링과 딥러닝' },
        { time: '2교시', topic: '고객 세그먼테이션', description: 'RFM 분석과 클러스터링' },
        { time: '3교시', topic: '크로스셀/업셀', description: 'AI 기반 상품 번들링' },
        { time: '4교시', topic: '검색 최적화', description: 'AI 검색 엔진 구축' },
        { time: '5교시', topic: '이미지 검색', description: 'Visual Search 구현' },
        { time: '6교시', topic: 'AR/VR 쇼핑', description: '가상 피팅룸 구축' },
        { time: '7교시', topic: '라이브 커머스', description: '실시간 쇼핑 방송 자동화' },
        { time: '8교시', topic: '마켓플레이스 통합', description: '멀티채널 판매 관리' },
        { time: '9교시', topic: '사기 탐지', description: '이상 거래 자동 감지' },
        { time: '10교시', topic: '수익 최적화', description: 'LTV 예측과 CAC 최적화' },
        { time: '11교시', topic: '혁신 프로젝트', description: '차세대 커머스 서비스' },
        { time: '12교시', topic: '글로벌 확장', description: '해외 진출 전략' }
      ],
      outcomes: [
        '개인화 정확도 85% 달성',
        'AOV 60% 증가',
        '재구매율 200% 향상'
      ]
    },
    {
      id: 'ecommerce-executive',
      level: '경영진',
      duration: '12시간 (6시간×2일)',
      targetAudience: '이커머스 대표, CMO, CTO',
      objectives: [
        '디지털 커머스 전략',
        '플랫폼 비즈니스 모델',
        '글로벌 이커머스 전망'
      ],
      sessions: [
        { time: '1교시', topic: '커머스 3.0', description: 'AI 시대의 쇼핑 혁명' },
        { time: '2교시', topic: '아마존 vs 쿠팡', description: '플랫폼 전략 분석' },
        { time: '3교시', topic: '소셜 커머스', description: '라이브 커머스와 메타버스' },
        { time: '4교시', topic: 'D2C 전략', description: '브랜드 직판 모델' },
        { time: '5교시', topic: '물류 혁신', description: '풀필먼트와 퀵커머스' },
        { time: '6교시', topic: '데이터 전략', description: '고객 데이터 플랫폼' },
        { time: '7교시', topic: '투자와 M&A', description: '이커머스 투자 트렌드' },
        { time: '8교시', topic: '2030 전망', description: '미래 커머스 청사진' }
      ],
      outcomes: [
        '이커머스 혁신 전략',
        '신규 비즈니스 모델',
        '글로벌 확장 로드맵'
      ]
    }
  ]
};

export const certificationCurriculum: IndustryCurriculum = {
  industry: '인증관리',
  industryKey: 'certification',
  description: '품질 인증과 컴플라이언스 자동화를 위한 AI 교육',
  levels: [
    {
      id: 'certification-basic',
      level: '기초',
      duration: '28시간 (12시간×2.5일)',
      targetAudience: '품질관리팀, 인증담당자, 컴플라이언스팀',
      objectives: [
        '인증 프로세스 자동화',
        '문서 관리 시스템 구축',
        '심사 준비 자동화'
      ],
      sessions: [
        { time: '1교시', topic: '인증 AI 개요', description: '인증 업무의 디지털 전환' },
        { time: '2교시', topic: '문서 OCR 처리', description: '인증 문서 자동 디지털화' },
        { time: '3교시', topic: '체크리스트 자동화', description: '인증 요구사항 자동 체크' },
        { time: '4교시', topic: 'n8n 인증 워크플로우', description: '인증 프로세스 자동화' },
        { time: '5교시', topic: '증빙 자료 관리', description: '자동 분류 및 저장' },
        { time: '6교시', topic: '심사 일정 관리', description: '심사 스케줄 자동화' },
        { time: '7교시', topic: '부적합 관리', description: 'CAR 프로세스 자동화' },
        { time: '8교시', topic: '내부 감사 자동화', description: '셀프 체크 시스템' },
        { time: '9교시', topic: '교육 관리', description: '인증 교육 이력 관리' },
        { time: '10교시', topic: '리포트 자동 생성', description: '인증 현황 대시보드' },
        { time: '11교시', topic: '실무 프로젝트', description: '인증 시나리오 자동화' },
        { time: '12교시', topic: '성과 분석', description: '인증 효율성 측정' }
      ],
      outcomes: [
        '인증 준비 시간 70% 단축',
        '문서 오류 90% 감소',
        '심사 통과율 95% 달성'
      ]
    },
    {
      id: 'certification-advanced',
      level: '심화',
      duration: '36시간 (12시간×3일)',
      targetAudience: '품질 매니저, 인증 전문가, 시스템 관리자',
      objectives: [
        '통합 인증 관리 시스템',
        'AI 기반 리스크 평가',
        '글로벌 인증 대응'
      ],
      sessions: [
        { time: '1교시', topic: '통합 인증 플랫폼', description: 'ISO, CE, FDA 통합 관리' },
        { time: '2교시', topic: '리스크 기반 접근', description: 'AI 리스크 평가 모델' },
        { time: '3교시', topic: '규제 모니터링', description: '규제 변경 자동 추적' },
        { time: '4교시', topic: '공급망 인증', description: '협력사 인증 관리' },
        { time: '5교시', topic: '디지털 심사', description: '원격 심사 시스템' },
        { time: '6교시', topic: '블록체인 인증', description: '인증서 위변조 방지' },
        { time: '7교시', topic: '예측 분석', description: '인증 갱신 예측' },
        { time: '8교시', topic: 'ESG 인증', description: '지속가능성 인증 관리' },
        { time: '9교시', topic: '글로벌 컴플라이언스', description: '다국가 규제 대응' },
        { time: '10교시', topic: 'AI 감사 보조', description: '지능형 감사 시스템' },
        { time: '11교시', topic: '혁신 프로젝트', description: '차세대 인증 서비스' },
        { time: '12교시', topic: '구현 전략', description: '단계별 적용 로드맵' }
      ],
      outcomes: [
        '인증 비용 50% 절감',
        '컴플라이언스 100% 달성',
        '글로벌 인증 체계 구축'
      ]
    },
    {
      id: 'certification-executive',
      level: '경영진',
      duration: '8시간 (4시간×2일)',
      targetAudience: '품질 임원, CQO, 컴플라이언스 책임자',
      objectives: [
        '품질 경영 전략',
        '인증 기반 경쟁력',
        '리스크 관리 체계'
      ],
      sessions: [
        { time: '1교시', topic: '품질 4.0', description: '디지털 품질 경영' },
        { time: '2교시', topic: '인증 경쟁력', description: '인증을 통한 차별화' },
        { time: '3교시', topic: 'ESG와 인증', description: '지속가능 경영 인증' },
        { time: '4교시', topic: '리스크 거버넌스', description: '전사 리스크 관리' },
        { time: '5교시', topic: '규제 전략', description: '글로벌 규제 대응' },
        { time: '6교시', topic: '품질 문화', description: '품질 중심 조직 문화' },
        { time: '7교시', topic: '투자 효과', description: '인증 ROI 분석' },
        { time: '8교시', topic: '미래 전망', description: '2030 품질 비전' }
      ],
      outcomes: [
        '품질 경영 마스터플랜',
        '인증 전략 로드맵',
        '리스크 관리 체계'
      ]
    }
  ]
};

export const investmentCurriculum: IndustryCurriculum = {
  industry: '투자',
  industryKey: 'investment',
  description: '데이터 기반 투자 의사결정과 리스크 관리를 위한 AI 교육',
  levels: [
    {
      id: 'investment-basic',
      level: '기초',
      duration: '32시간 (12시간×3일)',
      targetAudience: '투자 분석가, 펀드 매니저, 리서치팀',
      objectives: [
        '투자 분석 자동화',
        '시장 데이터 수집 및 분석',
        '리포트 자동 생성'
      ],
      sessions: [
        { time: '1교시', topic: '투자 AI 개요', description: 'AI가 바꾸는 투자 환경' },
        { time: '2교시', topic: '데이터 수집 자동화', description: '시장 데이터 자동 수집' },
        { time: '3교시', topic: '기업 분석 AI', description: '재무제표 자동 분석' },
        { time: '4교시', topic: 'n8n 투자 자동화', description: '투자 업무 프로세스 자동화' },
        { time: '5교시', topic: '뉴스 감성 분석', description: 'NLP 기반 시장 심리 분석' },
        { time: '6교시', topic: '기술적 분석 자동화', description: '차트 패턴 자동 인식' },
        { time: '7교시', topic: '포트폴리오 모니터링', description: '실시간 리스크 추적' },
        { time: '8교시', topic: '투자 리포트 생성', description: 'GPT 기반 리포트 작성' },
        { time: '9교시', topic: '백테스팅 자동화', description: '전략 검증 시스템' },
        { time: '10교시', topic: '규제 보고', description: '공시 자료 자동 작성' },
        { time: '11교시', topic: '실무 프로젝트', description: '투자 시나리오 자동화' },
        { time: '12교시', topic: '성과 분석', description: '투자 수익률 분석' }
      ],
      outcomes: [
        '분석 시간 70% 단축',
        '투자 정확도 40% 향상',
        '리포트 작성 80% 자동화'
      ]
    },
    {
      id: 'investment-advanced',
      level: '심화',
      duration: '44시간 (12시간×4일)',
      targetAudience: '퀀트, 리스크 매니저, 투자 전략팀',
      objectives: [
        '알고리즘 트레이딩',
        'AI 기반 자산 배분',
        '대체 데이터 활용'
      ],
      sessions: [
        { time: '1교시', topic: '퀀트 투자 전략', description: 'ML 기반 팩터 모델' },
        { time: '2교시', topic: '고빈도 트레이딩', description: 'HFT 시스템 구축' },
        { time: '3교시', topic: '대체 데이터 분석', description: '위성사진, 신용카드 데이터' },
        { time: '4교시', topic: '딥러닝 가격 예측', description: 'LSTM, Transformer 모델' },
        { time: '5교시', topic: '강화학습 트레이딩', description: 'RL 기반 매매 전략' },
        { time: '6교시', topic: '리스크 모델링', description: 'VAR, CVaR 자동 계산' },
        { time: '7교시', topic: '옵션 가격 모델', description: 'AI 기반 옵션 평가' },
        { time: '8교시', topic: '암호화폐 투자', description: '디지털 자산 분석' },
        { time: '9교시', topic: 'ESG 투자', description: 'ESG 스코어링 자동화' },
        { time: '10교시', topic: '멀티 에셋 전략', description: '자산군 간 상관관계' },
        { time: '11교시', topic: '혁신 프로젝트', description: '차세대 투자 시스템' },
        { time: '12교시', topic: '실전 구현', description: '실제 투자 전략 적용' }
      ],
      outcomes: [
        '샤프비율 2.0 이상 달성',
        '최대낙폭 30% 감소',
        '알파 수익 연 15% 이상'
      ]
    },
    {
      id: 'investment-executive',
      level: '경영진',
      duration: '16시간 (8시간×2일)',
      targetAudience: '투자회사 대표, CIO, 펀드 운용 본부장',
      objectives: [
        '투자 철학과 AI',
        '디지털 자산 관리',
        '규제와 윤리'
      ],
      sessions: [
        { time: '1교시', topic: '투자의 미래', description: 'AI가 바꾸는 자산운용' },
        { time: '2교시', topic: '로보어드바이저', description: 'B2C 자산관리 혁신' },
        { time: '3교시', topic: '대체 투자', description: 'PE, VC의 AI 활용' },
        { time: '4교시', topic: '글로벌 트렌드', description: '해외 투자사 AI 전략' },
        { time: '5교시', topic: '규제 환경', description: 'AI 투자 규제 동향' },
        { time: '6교시', topic: '윤리적 AI', description: '책임투자와 AI' },
        { time: '7교시', topic: '조직 전략', description: 'AI 투자팀 구축' },
        { time: '8교시', topic: '2030 비전', description: '미래 자산운용 청사진' }
      ],
      outcomes: [
        '투자 AI 전략 수립',
        '신규 펀드 상품 개발',
        '디지털 전환 로드맵'
      ]
    }
  ]
};

export const edutechCurriculum: IndustryCurriculum = {
  industry: '교육에듀테크',
  industryKey: 'edutech',
  description: '개인 맞춤형 학습과 교육 혁신을 위한 에듀테크 AI 교육',
  levels: [
    {
      id: 'edutech-basic',
      level: '기초',
      duration: '30시간 (12시간×2.5일)',
      targetAudience: '교육자, 교육 콘텐츠 개발자, 에듀테크 스타트업',
      objectives: [
        '교육 콘텐츠 자동 생성',
        '학습 관리 시스템 활용',
        '평가 및 피드백 자동화'
      ],
      sessions: [
        { time: '1교시', topic: '에듀테크 AI 개요', description: 'AI가 바꾸는 교육의 미래' },
        { time: '2교시', topic: '콘텐츠 자동 생성', description: 'GPT로 교육 자료 만들기' },
        { time: '3교시', topic: '퀴즈 자동 생성', description: '문제 은행 자동 구축' },
        { time: '4교시', topic: 'n8n 교육 자동화', description: '교육 업무 프로세스 자동화' },
        { time: '5교시', topic: 'LMS 자동화', description: '학습관리시스템 최적화' },
        { time: '6교시', topic: '출석 관리 자동화', description: '자동 출결 및 참여도 추적' },
        { time: '7교시', topic: '과제 평가 자동화', description: 'AI 기반 자동 채점' },
        { time: '8교시', topic: '학습 분석', description: '학습 데이터 대시보드' },
        { time: '9교시', topic: '개인화 피드백', description: 'AI 튜터 시스템' },
        { time: '10교시', topic: '학부모 소통', description: '자동 리포트 생성' },
        { time: '11교시', topic: '실습 프로젝트', description: '교육 시나리오 자동화' },
        { time: '12교시', topic: '성과 공유', description: '프로젝트 발표 및 피드백' }
      ],
      outcomes: [
        '수업 준비 시간 60% 단축',
        '학습 효과 40% 향상',
        '학생 만족도 50% 증가'
      ]
    },
    {
      id: 'edutech-advanced',
      level: '심화',
      duration: '40시간 (12시간×3.5일)',
      targetAudience: '교육 기획자, 에듀테크 개발자, 교육 연구원',
      objectives: [
        '적응형 학습 시스템',
        'VR/AR 교육 콘텐츠',
        '학습 예측 모델링'
      ],
      sessions: [
        { time: '1교시', topic: '적응형 학습 AI', description: '개인별 학습 경로 설계' },
        { time: '2교시', topic: '지식 추적', description: 'Knowledge Tracing 모델' },
        { time: '3교시', topic: 'ITS 시스템', description: '지능형 튜터링 시스템' },
        { time: '4교시', topic: 'VR/AR 교육', description: '실감형 교육 콘텐츠' },
        { time: '5교시', topic: '게이미피케이션', description: 'AI 기반 학습 게임' },
        { time: '6교시', topic: '음성 인식 교육', description: '언어 학습 AI' },
        { time: '7교시', topic: '감정 인식', description: '학습자 감정 분석' },
        { time: '8교시', topic: '협업 학습', description: 'AI 기반 그룹 학습' },
        { time: '9교시', topic: '학습 예측', description: '중도 이탈 예측 모델' },
        { time: '10교시', topic: '마이크로러닝', description: '짧은 학습 콘텐츠 최적화' },
        { time: '11교시', topic: '혁신 프로젝트', description: '미래 교육 서비스' },
        { time: '12교시', topic: '구현 전략', description: '단계별 적용 로드맵' }
      ],
      outcomes: [
        '학습 완주율 80% 달성',
        '개인화 정확도 90% 이상',
        '학습 성과 2배 향상'
      ]
    },
    {
      id: 'edutech-executive',
      level: '경영진',
      duration: '12시간 (6시간×2일)',
      targetAudience: '교육기관장, 에듀테크 대표, 교육 정책 결정자',
      objectives: [
        '교육 혁신 전략',
        '에듀테크 비즈니스 모델',
        '미래 교육 비전'
      ],
      sessions: [
        { time: '1교시', topic: '교육 4.0', description: 'AI 시대의 교육 패러다임' },
        { time: '2교시', topic: '글로벌 에듀테크', description: '해외 교육 혁신 사례' },
        { time: '3교시', topic: '평생교육 플랫폼', description: '리스킬링/업스킬링' },
        { time: '4교시', topic: 'B2B 교육 시장', description: '기업 교육 솔루션' },
        { time: '5교시', topic: '교육 데이터', description: '학습 분석과 프라이버시' },
        { time: '6교시', topic: '투자와 성장', description: '에듀테크 투자 전략' },
        { time: '7교시', topic: '정책과 규제', description: '교육 AI 가이드라인' },
        { time: '8교시', topic: '2030 교육', description: '미래 교육 청사진' }
      ],
      outcomes: [
        '교육 혁신 마스터플랜',
        '에듀테크 사업 전략',
        '미래 교육 로드맵'
      ]
    }
  ]
};
