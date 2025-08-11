'use client';

import { IndustryCurriculum } from '@/types/curriculum.types';

export const constructionCurriculum: IndustryCurriculum = {
  industry: '건설업',
  industryKey: 'construction',
  description: '스마트 건설과 BIM 기반 프로젝트 관리를 위한 AI 교육',
  levels: [
    {
      id: 'construction-basic',
      level: '기초',
      duration: '32시간 (12시간×3일)',
      targetAudience: '현장 관리자, 공무팀, 안전관리자',
      objectives: [
        '건설 현장 디지털화 기초',
        '안전 관리 자동화 시스템',
        '프로젝트 문서 자동화'
      ],
      sessions: [
        { time: '1교시', topic: '스마트 건설 개요', description: 'AI와 IoT가 바꾸는 건설 현장' },
        { time: '2교시', topic: 'BIM 기초와 AI', description: '3D 모델링과 AI 활용법' },
        { time: '3교시', topic: '안전 관리 AI', description: 'Computer Vision 기반 안전 모니터링' },
        { time: '4교시', topic: 'n8n 건설 자동화', description: '건설 업무 프로세스 자동화' },
        { time: '5교시', topic: '공정 관리 자동화', description: '일정 관리 및 진도 보고 자동화' },
        { time: '6교시', topic: '품질 검사 자동화', description: 'AI 기반 품질 검수 시스템' },
        { time: '7교시', topic: '자재 관리 시스템', description: '재고 추적 및 발주 자동화' },
        { time: '8교시', topic: '도면 분석 AI', description: 'OCR과 AI로 도면 자동 분석' },
        { time: '9교시', topic: '현장 리포트 자동화', description: '일일/주간 보고서 자동 생성' },
        { time: '10교시', topic: '협력사 관리', description: '하도급 업체 관리 자동화' },
        { time: '11교시', topic: '실무 프로젝트', description: '현장 시나리오 자동화 구현' },
        { time: '12교시', topic: '성과 공유', description: '구현 결과 발표 및 피드백' }
      ],
      outcomes: [
        '현장 관리 효율 50% 향상',
        '안전사고 70% 감소',
        '문서 작업 시간 60% 단축'
      ]
    },
    {
      id: 'construction-advanced',
      level: '심화',
      duration: '48시간 (12시간×4일)',
      targetAudience: '프로젝트 매니저, 설계팀, 기술연구소',
      objectives: [
        'AI 기반 설계 최적화',
        '예측적 프로젝트 관리',
        '스마트 시티 기술 활용'
      ],
      sessions: [
        { time: '1교시', topic: 'AI 설계 최적화', description: '생성형 AI로 설계안 자동 생성' },
        { time: '2교시', topic: '구조 해석 자동화', description: 'ML 기반 구조 안전성 분석' },
        { time: '3교시', topic: '공사비 예측 AI', description: '빅데이터 기반 원가 예측' },
        { time: '4교시', topic: '드론 측량 자동화', description: '드론 데이터 자동 분석' },
        { time: '5교시', topic: '4D/5D BIM', description: '시간/비용 통합 관리' },
        { time: '6교시', topic: '프리팹 최적화', description: 'AI 기반 모듈러 설계' },
        { time: '7교시', topic: '에너지 효율 분석', description: '그린빌딩 설계 자동화' },
        { time: '8교시', topic: '리스크 예측 모델', description: '프로젝트 리스크 AI 분석' },
        { time: '9교시', topic: '디지털 트윈', description: '건물 디지털 트윈 구축' },
        { time: '10교시', topic: '스마트 시티 연동', description: 'IoT 인프라 통합' },
        { time: '11교시', topic: '혁신 프로젝트', description: '미래 건설 기술 적용' },
        { time: '12교시', topic: '실행 로드맵', description: '단계별 구현 전략' }
      ],
      outcomes: [
        '설계 시간 70% 단축',
        '공사비 예측 정확도 95%',
        '프로젝트 지연 50% 감소'
      ]
    },
    {
      id: 'construction-executive',
      level: '경영진',
      duration: '12시간 (6시간×2일)',
      targetAudience: '건설사 임원, 사업본부장',
      objectives: [
        '스마트 건설 비전 수립',
        '디지털 전환 전략',
        '신사업 모델 개발'
      ],
      sessions: [
        { time: '1교시', topic: '건설 4.0 트렌드', description: '글로벌 스마트 건설 동향' },
        { time: '2교시', topic: 'PropTech 혁신', description: '부동산 기술 융합' },
        { time: '3교시', topic: '탄소중립 건설', description: 'ESG 경영과 그린빌딩' },
        { time: '4교시', topic: '투자 전략', description: '스마트 건설 기술 투자' },
        { time: '5교시', topic: '인재 육성', description: '디지털 건설 인력 양성' },
        { time: '6교시', topic: '파트너십', description: '테크 기업과의 협업' },
        { time: '7교시', topic: '규제 대응', description: '스마트 건설 관련 규제' },
        { time: '8교시', topic: '미래 전략', description: '10년 후 건설 산업' }
      ],
      outcomes: [
        '스마트 건설 마스터플랜',
        '디지털 전환 로드맵',
        '신규 비즈니스 모델'
      ]
    }
  ]
};

export const telecomCurriculum: IndustryCurriculum = {
  industry: '통신업',
  industryKey: 'telecom',
  description: '5G/6G 시대 네트워크 최적화와 서비스 혁신을 위한 AI 교육',
  levels: [
    {
      id: 'telecom-basic',
      level: '기초',
      duration: '30시간 (12시간×2.5일)',
      targetAudience: '네트워크 엔지니어, 고객서비스팀, 기술지원팀',
      objectives: [
        '네트워크 운영 자동화',
        '고객 서비스 AI 활용',
        '장애 대응 자동화'
      ],
      sessions: [
        { time: '1교시', topic: 'AI in Telecom', description: '통신 산업의 AI 활용 사례' },
        { time: '2교시', topic: '네트워크 모니터링', description: 'AI 기반 실시간 모니터링' },
        { time: '3교시', topic: '장애 예측 AI', description: '예측적 유지보수 시스템' },
        { time: '4교시', topic: 'n8n 통신 자동화', description: '통신 업무 프로세스 자동화' },
        { time: '5교시', topic: '고객 응대 자동화', description: 'AI 챗봇 및 음성봇 구축' },
        { time: '6교시', topic: '요금 분석 자동화', description: '빌링 데이터 자동 분석' },
        { time: '7교시', topic: 'QoS 관리', description: '서비스 품질 자동 최적화' },
        { time: '8교시', topic: '용량 계획', description: 'AI 기반 네트워크 용량 예측' },
        { time: '9교시', topic: '보안 모니터링', description: 'AI 기반 보안 위협 탐지' },
        { time: '10교시', topic: '리포트 자동화', description: 'KPI 대시보드 자동 생성' },
        { time: '11교시', topic: '실무 적용', description: '부서별 자동화 프로젝트' },
        { time: '12교시', topic: '성과 측정', description: '자동화 ROI 분석' }
      ],
      outcomes: [
        '네트워크 장애 70% 감소',
        '고객 응대 시간 50% 단축',
        '운영 비용 40% 절감'
      ]
    },
    {
      id: 'telecom-advanced',
      level: '심화',
      duration: '42시간 (12시간×3.5일)',
      targetAudience: '네트워크 아키텍트, 서비스 기획팀, R&D',
      objectives: [
        '차세대 네트워크 설계',
        'AI 기반 서비스 개발',
        '네트워크 슬라이싱 자동화'
      ],
      sessions: [
        { time: '1교시', topic: '5G/6G AI 최적화', description: '차세대 네트워크 지능화' },
        { time: '2교시', topic: 'Edge AI', description: '엣지 컴퓨팅과 AI 융합' },
        { time: '3교시', topic: 'Network Slicing', description: 'AI 기반 네트워크 슬라이싱' },
        { time: '4교시', topic: 'SON 고도화', description: '자가 구성 네트워크 최적화' },
        { time: '5교시', topic: 'Traffic Engineering', description: 'ML 기반 트래픽 관리' },
        { time: '6교시', topic: 'IoT 플랫폼', description: 'IoT 디바이스 관리 자동화' },
        { time: '7교시', topic: 'CDN 최적화', description: 'AI 기반 콘텐츠 배포' },
        { time: '8교시', topic: '보안 오케스트레이션', description: '자동화된 보안 대응' },
        { time: '9교시', topic: 'API 관리', description: 'API 게이트웨이 자동화' },
        { time: '10교시', topic: '서비스 혁신', description: 'AI 기반 신규 서비스' },
        { time: '11교시', topic: '프로토타입 개발', description: '혁신 서비스 POC' },
        { time: '12교시', topic: '구현 전략', description: '단계별 적용 로드맵' }
      ],
      outcomes: [
        '네트워크 효율 80% 향상',
        '신규 AI 서비스 3개 출시',
        '운영 자동화율 90% 달성'
      ]
    },
    {
      id: 'telecom-executive',
      level: '경영진',
      duration: '12시간 (6시간×2일)',
      targetAudience: '통신사 임원, CTO, 사업부장',
      objectives: [
        '디지털 통신 전략',
        'AI 기반 사업 모델',
        '미래 통신 비전'
      ],
      sessions: [
        { time: '1교시', topic: '통신 산업 대전환', description: 'AI와 6G가 만드는 미래' },
        { time: '2교시', topic: '빅테크와의 경쟁', description: 'OTT와 통신사의 미래' },
        { time: '3교시', topic: 'B2B 신사업', description: '기업 AI 서비스 전략' },
        { time: '4교시', topic: '투자 우선순위', description: 'AI 인프라 투자 전략' },
        { time: '5교시', topic: '생태계 구축', description: '파트너십과 M&A 전략' },
        { time: '6교시', topic: '규제 환경', description: '통신 규제와 AI 정책' },
        { time: '7교시', topic: '조직 혁신', description: 'AI 네이티브 조직 전환' },
        { time: '8교시', topic: '2030 비전', description: '미래 통신사 청사진' }
      ],
      outcomes: [
        '통신 AI 전략 마스터플랜',
        '신규 비즈니스 모델 3개',
        '디지털 전환 로드맵'
      ]
    }
  ]
};

export const mediaCurriculum: IndustryCurriculum = {
  industry: '미디어',
  industryKey: 'media',
  description: '콘텐츠 제작 자동화와 개인화 서비스를 위한 미디어 AI 교육',
  levels: [
    {
      id: 'media-basic',
      level: '기초',
      duration: '32시간 (12시간×3일)',
      targetAudience: '콘텐츠 크리에이터, 편집자, 마케터',
      objectives: [
        '콘텐츠 제작 자동화',
        'AI 편집 도구 활용',
        '배포 및 마케팅 자동화'
      ],
      sessions: [
        { time: '1교시', topic: 'AI 콘텐츠 제작', description: '생성형 AI로 콘텐츠 만들기' },
        { time: '2교시', topic: '영상 편집 자동화', description: 'AI 기반 영상 편집 도구' },
        { time: '3교시', topic: '썸네일 자동 생성', description: 'AI로 매력적인 썸네일 제작' },
        { time: '4교시', topic: 'n8n 미디어 워크플로우', description: '콘텐츠 제작 프로세스 자동화' },
        { time: '5교시', topic: '자막 생성 자동화', description: '음성인식 기반 자막 생성' },
        { time: '6교시', topic: '번역 자동화', description: '다국어 콘텐츠 자동 번역' },
        { time: '7교시', topic: 'SEO 최적화', description: 'AI 기반 검색 최적화' },
        { time: '8교시', topic: 'SNS 배포 자동화', description: '멀티채널 자동 배포' },
        { time: '9교시', topic: '분석 리포트', description: '조회수, 참여도 자동 분석' },
        { time: '10교시', topic: '광고 최적화', description: 'AI 기반 광고 타겟팅' },
        { time: '11교시', topic: '실전 프로젝트', description: '콘텐츠 제작 자동화 구현' },
        { time: '12교시', topic: '성과 공유', description: '프로젝트 발표 및 피드백' }
      ],
      outcomes: [
        '콘텐츠 제작 시간 70% 단축',
        '조회수 150% 증가',
        '제작 비용 50% 절감'
      ]
    },
    {
      id: 'media-advanced',
      level: '심화',
      duration: '44시간 (12시간×4일)',
      targetAudience: '프로듀서, 콘텐츠 전략가, 데이터 분석가',
      objectives: [
        '개인화 콘텐츠 전략',
        'AI 기반 스토리텔링',
        '실시간 콘텐츠 최적화'
      ],
      sessions: [
        { time: '1교시', topic: 'AI 스토리텔링', description: 'GPT 기반 대본 작성' },
        { time: '2교시', topic: '딥페이크 기술', description: '윤리적 딥페이크 활용' },
        { time: '3교시', topic: '가상 인플루언서', description: 'AI 아바타 제작 및 운영' },
        { time: '4교시', topic: '개인화 추천', description: 'ML 기반 콘텐츠 추천' },
        { time: '5교시', topic: '실시간 편집', description: '라이브 스트리밍 AI 편집' },
        { time: '6교시', topic: '인터랙티브 콘텐츠', description: 'AI 기반 인터랙티브 미디어' },
        { time: '7교시', topic: '음악/사운드 생성', description: 'AI 작곡 및 사운드 디자인' },
        { time: '8교시', topic: '메타버스 콘텐츠', description: '가상공간 콘텐츠 제작' },
        { time: '9교시', topic: 'IP 관리 자동화', description: '저작권 관리 시스템' },
        { time: '10교시', topic: '수익화 최적화', description: 'AI 기반 수익 모델' },
        { time: '11교시', topic: '혁신 프로젝트', description: '차세대 미디어 서비스' },
        { time: '12교시', topic: '실행 전략', description: '단계별 구현 로드맵' }
      ],
      outcomes: [
        '개인화 정확도 85% 달성',
        '콘텐츠 ROI 200% 향상',
        '신규 서비스 2개 출시'
      ]
    },
    {
      id: 'media-executive',
      level: '경영진',
      duration: '12시간 (6시간×2일)',
      targetAudience: '미디어 기업 임원, 콘텐츠 본부장',
      objectives: [
        '미디어 산업 전망',
        'AI 콘텐츠 전략',
        '플랫폼 비즈니스 모델'
      ],
      sessions: [
        { time: '1교시', topic: '미디어 대변혁', description: 'AI가 바꾸는 미디어 생태계' },
        { time: '2교시', topic: '글로벌 OTT 전략', description: '넷플릭스, 디즈니+ 대응' },
        { time: '3교시', topic: '생성형 AI 활용', description: '콘텐츠 제작 혁신' },
        { time: '4교시', topic: '플랫폼 전략', description: '자체 플랫폼 vs 제휴' },
        { time: '5교시', topic: 'IP 비즈니스', description: '콘텐츠 IP 확장 전략' },
        { time: '6교시', topic: '투자 전략', description: 'AI 기술 투자 우선순위' },
        { time: '7교시', topic: '인재 확보', description: 'AI 크리에이터 육성' },
        { time: '8교시', topic: '미래 비전', description: '2030 미디어 청사진' }
      ],
      outcomes: [
        '미디어 AI 전략 수립',
        '신규 플랫폼 비즈니스 모델',
        '콘텐츠 혁신 로드맵'
      ]
    }
  ]
};
