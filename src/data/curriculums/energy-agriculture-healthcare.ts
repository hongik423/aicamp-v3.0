'use client';

import { IndustryCurriculum } from '@/types/curriculum.types';

export const energyCurriculum: IndustryCurriculum = {
  industry: '에너지',
  industryKey: 'energy',
  description: '스마트 그리드와 신재생 에너지 최적화를 위한 AI 교육',
  levels: [
    {
      id: 'energy-basic',
      level: '기초',
      duration: '30시간 (12시간×2.5일)',
      targetAudience: '에너지 관리자, 운영팀, 설비 담당자',
      objectives: [
        '에너지 모니터링 자동화',
        '수요 예측 시스템 구축',
        '효율 최적화 기초'
      ],
      sessions: [
        { time: '1교시', topic: '스마트 에너지 개요', description: 'AI가 바꾸는 에너지 산업' },
        { time: '2교시', topic: '수요 예측 AI', description: '전력 수요 예측 모델링' },
        { time: '3교시', topic: '발전량 최적화', description: '신재생 에너지 발전 예측' },
        { time: '4교시', topic: 'n8n 에너지 자동화', description: '에너지 관리 프로세스 자동화' },
        { time: '5교시', topic: 'IoT 센서 연동', description: '스마트 미터 데이터 수집' },
        { time: '6교시', topic: '실시간 모니터링', description: '에너지 사용량 대시보드' },
        { time: '7교시', topic: '이상 감지 시스템', description: 'AI 기반 설비 이상 탐지' },
        { time: '8교시', topic: '에너지 거래', description: '전력 거래 자동화' },
        { time: '9교시', topic: 'ESG 리포팅', description: '탄소 배출 자동 보고' },
        { time: '10교시', topic: '비용 최적화', description: '에너지 비용 절감 분석' },
        { time: '11교시', topic: '실무 프로젝트', description: '에너지 관리 자동화 구현' },
        { time: '12교시', topic: '성과 측정', description: '에너지 효율 개선 분석' }
      ],
      outcomes: [
        '에너지 효율 35% 향상',
        '운영 비용 30% 절감',
        '탄소 배출 25% 감소'
      ]
    },
    {
      id: 'energy-advanced',
      level: '심화',
      duration: '40시간 (12시간×3.5일)',
      targetAudience: '에너지 엔지니어, 연구개발팀, 신사업팀',
      objectives: [
        '스마트 그리드 구축',
        'AI 기반 에너지 트레이딩',
        '마이크로그리드 관리'
      ],
      sessions: [
        { time: '1교시', topic: '스마트 그리드 AI', description: '지능형 전력망 구축' },
        { time: '2교시', topic: 'V2G 시스템', description: '전기차 연계 에너지 관리' },
        { time: '3교시', topic: '에너지 저장 최적화', description: 'ESS 운영 최적화' },
        { time: '4교시', topic: '분산 에너지 자원', description: 'DER 통합 관리' },
        { time: '5교시', topic: 'P2P 에너지 거래', description: '블록체인 기반 거래' },
        { time: '6교시', topic: '예측 정비', description: 'AI 기반 설비 유지보수' },
        { time: '7교시', topic: '기상 데이터 활용', description: '날씨 예측 연계 최적화' },
        { time: '8교시', topic: '수소 에너지 관리', description: '그린 수소 생산 최적화' },
        { time: '9교시', topic: '디지털 트윈', description: '발전소 디지털 트윈' },
        { time: '10교시', topic: '탄소 중립 전략', description: 'Net-Zero 달성 방안' },
        { time: '11교시', topic: '혁신 프로젝트', description: '차세대 에너지 서비스' },
        { time: '12교시', topic: '구현 로드맵', description: '단계별 실행 전략' }
      ],
      outcomes: [
        '에너지 자급률 50% 달성',
        '그리드 안정성 90% 향상',
        '신규 에너지 서비스 출시'
      ]
    },
    {
      id: 'energy-executive',
      level: '경영진',
      duration: '12시간 (6시간×2일)',
      targetAudience: '에너지 기업 임원, 사업본부장',
      objectives: [
        '에너지 전환 전략',
        '탄소중립 비즈니스 모델',
        '신재생 에너지 투자'
      ],
      sessions: [
        { time: '1교시', topic: '에너지 대전환', description: '글로벌 에너지 패러다임 변화' },
        { time: '2교시', topic: '탄소중립 2050', description: 'Net-Zero 달성 전략' },
        { time: '3교시', topic: '신재생 에너지', description: '재생에너지 투자 전략' },
        { time: '4교시', topic: '수소 경제', description: '수소 비즈니스 기회' },
        { time: '5교시', topic: '에너지 신사업', description: 'VPP, DR 사업 모델' },
        { time: '6교시', topic: 'ESG 경영', description: '지속가능 경영 전략' },
        { time: '7교시', topic: '정책과 규제', description: '에너지 정책 대응' },
        { time: '8교시', topic: '2030 비전', description: '미래 에너지 기업 청사진' }
      ],
      outcomes: [
        '에너지 전환 마스터플랜',
        '탄소중립 로드맵',
        '신규 비즈니스 모델 3개'
      ]
    }
  ]
};

export const agricultureCurriculum: IndustryCurriculum = {
  industry: '농업',
  industryKey: 'agriculture',
  description: '스마트팜과 정밀농업을 위한 AI 자동화 교육',
  levels: [
    {
      id: 'agriculture-basic',
      level: '기초',
      duration: '28시간 (12시간×2.5일)',
      targetAudience: '농장 관리자, 농업 기술자, 영농 조합',
      objectives: [
        '스마트팜 기초 이해',
        'IoT 센서 데이터 활용',
        '작물 관리 자동화'
      ],
      sessions: [
        { time: '1교시', topic: '스마트 농업 개요', description: 'AI와 IoT가 바꾸는 농업' },
        { time: '2교시', topic: '센서 데이터 수집', description: '온습도, 토양 데이터 모니터링' },
        { time: '3교시', topic: '작물 생육 예측', description: 'AI 기반 수확시기 예측' },
        { time: '4교시', topic: 'n8n 농업 자동화', description: '농장 관리 프로세스 자동화' },
        { time: '5교시', topic: '자동 관수 시스템', description: '스마트 물 관리' },
        { time: '6교시', topic: '병해충 진단 AI', description: '이미지 인식 기반 진단' },
        { time: '7교시', topic: '기상 데이터 활용', description: '날씨 예측 연계 농사' },
        { time: '8교시', topic: '비료/농약 최적화', description: '정밀 시비 관리' },
        { time: '9교시', topic: '수확량 예측', description: 'AI 기반 생산량 예측' },
        { time: '10교시', topic: '유통 관리', description: '농산물 유통 자동화' },
        { time: '11교시', topic: '실습 프로젝트', description: '스마트팜 시나리오 구현' },
        { time: '12교시', topic: '성과 분석', description: '생산성 향상 측정' }
      ],
      outcomes: [
        '생산량 40% 증가',
        '물 사용량 30% 절감',
        '병해충 피해 50% 감소'
      ]
    },
    {
      id: 'agriculture-advanced',
      level: '심화',
      duration: '36시간 (12시간×3일)',
      targetAudience: '농업 연구원, 스마트팜 개발자, 농업 컨설턴트',
      objectives: [
        '정밀 농업 시스템 구축',
        '드론/로봇 활용 자동화',
        '수직 농장 운영'
      ],
      sessions: [
        { time: '1교시', topic: '정밀 농업 AI', description: 'GPS와 AI 기반 정밀 농업' },
        { time: '2교시', topic: '드론 영상 분석', description: '드론 데이터 자동 분석' },
        { time: '3교시', topic: '농업 로봇', description: '수확/제초 로봇 운영' },
        { time: '4교시', topic: '수직 농장', description: '식물공장 자동화 시스템' },
        { time: '5교시', topic: '유전자 분석', description: 'AI 기반 품종 개량' },
        { time: '6교시', topic: '토양 미생물 분석', description: '토양 건강도 AI 진단' },
        { time: '7교시', topic: '탄소 농업', description: '탄소 저감 농법' },
        { time: '8교시', topic: '블록체인 이력', description: '농산물 이력 추적' },
        { time: '9교시', topic: '스마트 축산', description: 'AI 기반 가축 관리' },
        { time: '10교시', topic: '애그테크 플랫폼', description: '농업 데이터 플랫폼' },
        { time: '11교시', topic: '혁신 프로젝트', description: '미래 농업 기술 적용' },
        { time: '12교시', topic: '사업화 전략', description: '스마트팜 사업 모델' }
      ],
      outcomes: [
        '정밀농업 시스템 구축',
        '노동력 70% 절감',
        '수익성 200% 향상'
      ]
    },
    {
      id: 'agriculture-executive',
      level: '경영진',
      duration: '8시간 (4시간×2일)',
      targetAudience: '농업법인 대표, 조합장, 정책 결정자',
      objectives: [
        '농업 혁신 전략',
        '스마트팜 투자 전략',
        '농업 비즈니스 모델'
      ],
      sessions: [
        { time: '1교시', topic: '농업 4.0', description: '글로벌 농업 혁신 트렌드' },
        { time: '2교시', topic: '식량 안보', description: 'AI와 식량 자급률' },
        { time: '3교시', topic: '기후변화 대응', description: '지속가능한 농업' },
        { time: '4교시', topic: '투자 전략', description: '스마트팜 투자 ROI' },
        { time: '5교시', topic: '정책 활용', description: '정부 지원 사업 활용' },
        { time: '6교시', topic: '수출 전략', description: 'K-농업 글로벌화' },
        { time: '7교시', topic: '청년 농업', description: '차세대 농업인 육성' },
        { time: '8교시', topic: '미래 비전', description: '2030 농업 청사진' }
      ],
      outcomes: [
        '스마트 농업 전환 전략',
        '농업 혁신 로드맵',
        '신규 비즈니스 모델'
      ]
    }
  ]
};

export const healthcareCurriculum: IndustryCurriculum = {
  industry: '의료헬스케어',
  industryKey: 'healthcare',
  description: '디지털 헬스케어와 정밀의료를 위한 AI 교육',
  levels: [
    {
      id: 'healthcare-basic',
      level: '기초',
      duration: '36시간 (12시간×3일)',
      targetAudience: '의료진, 병원 행정팀, 헬스케어 스타트업',
      objectives: [
        '의료 AI 기초 이해',
        '진단 보조 시스템 활용',
        '환자 관리 자동화'
      ],
      sessions: [
        { time: '1교시', topic: '의료 AI 개요', description: 'AI가 바꾸는 의료 현장' },
        { time: '2교시', topic: '의료 영상 AI', description: 'X-ray, CT, MRI 판독 보조' },
        { time: '3교시', topic: '임상 의사결정 지원', description: 'CDSS 활용법' },
        { time: '4교시', topic: 'n8n 의료 자동화', description: '병원 업무 프로세스 자동화' },
        { time: '5교시', topic: '환자 예약 관리', description: '스마트 예약 시스템' },
        { time: '6교시', topic: 'EMR 데이터 활용', description: '전자의무기록 분석' },
        { time: '7교시', topic: '원격 모니터링', description: '웨어러블 데이터 관리' },
        { time: '8교시', topic: '약물 상호작용 체크', description: 'AI 기반 처방 검토' },
        { time: '9교시', topic: '의료 챗봇', description: '환자 상담 자동화' },
        { time: '10교시', topic: '보험 청구 자동화', description: '의료비 청구 프로세스' },
        { time: '11교시', topic: '실무 적용', description: '부서별 자동화 프로젝트' },
        { time: '12교시', topic: '의료 윤리와 규제', description: 'AI 의료 가이드라인' }
      ],
      outcomes: [
        '진단 정확도 30% 향상',
        '행정 업무 50% 감소',
        '환자 만족도 40% 증가'
      ]
    },
    {
      id: 'healthcare-advanced',
      level: '심화',
      duration: '48시간 (12시간×4일)',
      targetAudience: '의료 연구진, 의료 AI 개발자, 병원 IT팀',
      objectives: [
        '정밀의료 시스템 구축',
        '신약 개발 AI 활용',
        '디지털 치료제 개발'
      ],
      sessions: [
        { time: '1교시', topic: '정밀의료 AI', description: '유전체 분석과 맞춤 치료' },
        { time: '2교시', topic: '병리 AI', description: '디지털 병리 자동 분석' },
        { time: '3교시', topic: '신약 개발 AI', description: 'AI 기반 약물 발굴' },
        { time: '4교시', topic: '임상시험 최적화', description: '환자 모집 및 프로토콜' },
        { time: '5교시', topic: '수술 로봇', description: 'AI 지원 로봇 수술' },
        { time: '6교시', topic: '디지털 치료제', description: 'DTx 개발과 검증' },
        { time: '7교시', topic: '예측 의학', description: '질병 예측 모델링' },
        { time: '8교시', topic: '의료 빅데이터', description: 'RWD/RWE 활용' },
        { time: '9교시', topic: '연합학습', description: '의료 데이터 프라이버시' },
        { time: '10교시', topic: 'AI 병원', description: '스마트 병원 구축' },
        { time: '11교시', topic: '혁신 프로젝트', description: '차세대 의료 서비스' },
        { time: '12교시', topic: '규제 승인', description: 'AI 의료기기 인허가' }
      ],
      outcomes: [
        '치료 성공률 50% 향상',
        '신약 개발 기간 40% 단축',
        '의료 비용 35% 절감'
      ]
    },
    {
      id: 'healthcare-executive',
      level: '경영진',
      duration: '16시간 (8시간×2일)',
      targetAudience: '병원장, 의료기관 임원, 헬스케어 기업 대표',
      objectives: [
        '디지털 헬스케어 전략',
        'AI 병원 전환 계획',
        '의료 혁신 비즈니스'
      ],
      sessions: [
        { time: '1교시', topic: '헬스케어 대전환', description: '글로벌 디지털 헬스 트렌드' },
        { time: '2교시', topic: 'AI 병원 모델', description: '메이요 클리닉 사례' },
        { time: '3교시', topic: '원격의료 전략', description: '포스트 코로나 의료' },
        { time: '4교시', topic: '의료 데이터 전략', description: '데이터 거버넌스' },
        { time: '5교시', topic: '투자와 ROI', description: 'AI 의료 투자 전략' },
        { time: '6교시', topic: '파트너십', description: '빅테크와의 협업' },
        { time: '7교시', topic: '규제와 정책', description: '의료 AI 규제 동향' },
        { time: '8교시', topic: '2030 비전', description: '미래 의료 청사진' }
      ],
      outcomes: [
        '디지털 병원 전환 전략',
        'AI 헬스케어 사업 모델',
        '의료 혁신 로드맵'
      ]
    }
  ]
};
