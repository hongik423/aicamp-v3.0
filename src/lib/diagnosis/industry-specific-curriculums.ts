/**
 * 🎓 업종별 맞춤 n8n 자동화 커리큘럼 시스템
 * AICAMP의 업종별 특화 교육 프로그램 매핑
 */

export interface IndustryCurriculum {
  industry: string;
  targetAudience: string[];
  coreObjectives: string[];
  curriculum: CurriculumSession[];
  advancedFeatures: string[];
  expectedOutcomes: {
    quantitative: string[];
    qualitative: string[];
  };
  practicalApplications: string[];
}

export interface CurriculumSession {
  session: number;
  title: string;
  content: string;
  practicalPoints: string;
  tools: string[];
  automationScenario: string;
}

/**
 * 업종별 맞춤 n8n 자동화 커리큘럼 매핑
 */
export const INDUSTRY_SPECIFIC_CURRICULUMS: Record<string, IndustryCurriculum> = {
  
  '건설업': {
    industry: '건설업',
    targetAudience: [
      '건설 프로젝트 관리자, 현장 소장, 안전 관리자',
      '설계팀, 시공팀, 품질관리팀',
      '협력업체 관리 담당자'
    ],
    coreObjectives: [
      '건설 프로젝트 일정 및 진행 관리 자동화',
      '현장 안전 모니터링 및 사고 예방 시스템',
      '자재 발주 및 재고 최적화 자동화',
      '협력업체 관리 및 소통 자동화'
    ],
    curriculum: [
      {
        session: 1,
        title: '건설업 AI 자동화 개요',
        content: '건설 4.0과 스마트 건설 기술 이해',
        practicalPoints: '건설업 디지털 트랜스포메이션 사례',
        tools: ['BIM', 'IoT', 'Drone', 'AI'],
        automationScenario: '스마트 건설 현장 구축'
      },
      {
        session: 2,
        title: '현장 진행 상황 자동 보고',
        content: '공정 진행률 → AI 분석 → 자동 리포트 생성',
        practicalPoints: '실시간 현장 모니터링 시스템',
        tools: ['IoT 센서', 'Drone 촬영', 'MS Project', 'Slack'],
        automationScenario: '공정 지연 자동 감지 및 대응'
      },
      {
        session: 3,
        title: '안전 관리 자동화',
        content: 'AI 기반 위험 감지 및 사고 예방 시스템',
        practicalPoints: '웨어러블 안전 장비 연동',
        tools: ['CCTV AI', 'Wearable Device', 'Emergency Alert'],
        automationScenario: '실시간 안전 위험 감지 및 알림'
      },
      {
        session: 4,
        title: 'n8n 기본 실습',
        content: '건설업 특화 워크플로 구성 연습',
        practicalPoints: '프로젝트 관리 자동화 실습',
        tools: ['n8n', 'Webhook', 'API 연동'],
        automationScenario: '건설 프로젝트 워크플로 구축'
      },
      {
        session: 5,
        title: '자재 발주 자동화',
        content: '재고 부족 감지 → 자동 발주 → 납기 관리',
        practicalPoints: '스마트 자재 관리 시스템',
        tools: ['ERP 연동', 'Inventory API', 'Supplier API'],
        automationScenario: '자재 최적화 및 비용 절감'
      },
      {
        session: 6,
        title: '품질 검사 자동화',
        content: 'AI 기반 품질 검사 및 보고서 생성',
        practicalPoints: '디지털 품질 관리 시스템',
        tools: ['AI Vision', 'Quality Scanner', 'Report Generator'],
        automationScenario: '품질 일관성 및 준공 관리'
      },
      {
        session: 7,
        title: '협력업체 관리 자동화',
        content: '업체 평가 → 계약 관리 → 성과 모니터링',
        practicalPoints: '통합 협력업체 관리 플랫폼',
        tools: ['Contract API', 'Performance Tracker', 'Communication Hub'],
        automationScenario: '협력업체 최적화 및 관계 관리'
      },
      {
        session: 8,
        title: '현장-사무실 정보 연동',
        content: '실시간 현장 데이터 → 사무실 대시보드 연동',
        practicalPoints: '통합 정보 관리 시스템',
        tools: ['Mobile App', 'Cloud Database', 'Dashboard'],
        automationScenario: '현장-본사 실시간 소통 체계'
      },
      {
        session: 9,
        title: '건설 일정 최적화',
        content: 'AI 기반 공정 계획 및 일정 자동 조정',
        practicalPoints: '스마트 스케줄링 시스템',
        tools: ['AI Scheduler', 'Resource Optimizer', 'Calendar API'],
        automationScenario: '최적 공정 계획 및 리소스 배분'
      },
      {
        session: 10,
        title: '건설업 워크플로 설계',
        content: '건설 프로젝트 전체 자동화 흐름 설계',
        practicalPoints: '맞춤형 건설 자동화 시나리오',
        tools: ['통합 플랫폼', 'API 연동', 'Dashboard'],
        automationScenario: '개별 프로젝트 특성 반영'
      },
      {
        session: 11,
        title: '실전 구현 실습',
        content: '실제 건설 프로젝트 자동화 구현',
        practicalPoints: '현장 적용 가능한 솔루션 구축',
        tools: ['실제 프로젝트 데이터', 'Live 시스템'],
        automationScenario: '실무 적용 및 검증'
      },
      {
        session: 12,
        title: '성과 측정 및 개선',
        content: '자동화 효과 측정 및 지속 개선 방안',
        practicalPoints: 'ROI 분석 및 최적화',
        tools: ['Analytics', 'Performance Monitor'],
        automationScenario: '지속적 개선 체계 구축'
      }
    ],
    advancedFeatures: [
      'BIM 연동 자동화: 3D 모델 기반 공정 관리',
      'AI 안전 예측: 사고 위험 사전 감지 시스템',
      '드론 진행률 측정: 자동 공정 진행률 측정',
      '디지털 트윈: 가상 건설 시뮬레이션'
    ],
    expectedOutcomes: {
      quantitative: [
        '프로젝트 관리 효율성 40% 향상',
        '안전사고 70% 감소',
        '공정 지연 50% 감소',
        '자재 관리 비용 25% 절감'
      ],
      qualitative: [
        '현장-사무실 소통 원활화',
        '프로젝트 품질 일관성 확보',
        '안전 문화 정착',
        '디지털 건설 역량 강화'
      ]
    },
    practicalApplications: [
      '대형 건설 프로젝트 통합 관리',
      '다중 현장 동시 모니터링',
      '협력업체 성과 자동 평가',
      '안전 교육 자동화 시스템'
    ]
  },

  '교육업': {
    industry: '교육업',
    targetAudience: [
      '교육기관 관리자, 교사, 교육 담당자',
      '학습 관리 시스템 운영자',
      '교육 콘텐츠 개발자'
    ],
    coreObjectives: [
      '개인화 학습 경로 자동 생성 시스템',
      '학습 성과 분석 및 리포트 자동화',
      '출결 및 학사 관리 자동화',
      '학부모 소통 및 상담 자동화'
    ],
    curriculum: [
      {
        session: 1,
        title: '에듀테크 AI 자동화 개요',
        content: '교육 분야 AI 활용 사례 및 자동화 포인트',
        practicalPoints: '개인화 학습의 미래',
        tools: ['LMS', 'AI Tutor', 'Analytics'],
        automationScenario: '스마트 교육 환경 구축'
      },
      {
        session: 2,
        title: '학습자 맞춤 콘텐츠 자동 생성',
        content: '학습 데이터 → AI 분석 → 맞춤 콘텐츠 추천',
        practicalPoints: 'AI 기반 개인화 학습',
        tools: ['ChatGPT API', 'Learning Analytics', 'Content API'],
        automationScenario: '개별 학습자 맞춤 교육'
      },
      {
        session: 3,
        title: '출결 및 성적 관리 자동화',
        content: 'QR 출결 → 자동 집계 → 성적 분석 → 리포트',
        practicalPoints: '디지털 학사 관리 시스템',
        tools: ['QR Code', 'Google Forms', 'Spreadsheet API'],
        automationScenario: '완전 자동화 학사 관리'
      },
      {
        session: 4,
        title: 'n8n 교육 특화 실습',
        content: '교육업 맞춤 워크플로 구성',
        practicalPoints: '학습 관리 자동화 실습',
        tools: ['n8n', 'LMS API', 'Email API'],
        automationScenario: '교육 프로세스 자동화'
      },
      {
        session: 5,
        title: '학부모 소통 자동화',
        content: '학습 진도 → 자동 알림 → 상담 예약 → 피드백',
        practicalPoints: '학부모 참여 극대화',
        tools: ['SMS API', 'Email API', 'Calendar API'],
        automationScenario: '학부모-학교 소통 최적화'
      },
      {
        session: 6,
        title: '학습 성과 분석 자동화',
        content: '평가 데이터 → AI 분석 → 학습 가이드 생성',
        practicalPoints: '데이터 기반 교육 개선',
        tools: ['Learning Analytics', 'AI Analysis', 'Report Generator'],
        automationScenario: '학습 효과 최적화'
      },
      {
        session: 7,
        title: '온라인 수업 관리 자동화',
        content: '수업 예약 → 자동 링크 발송 → 출석 체크 → 녹화',
        practicalPoints: '하이브리드 교육 관리',
        tools: ['Zoom API', 'Google Classroom', 'Recording API'],
        automationScenario: '온오프라인 통합 교육'
      },
      {
        session: 8,
        title: '교육 콘텐츠 자동 업데이트',
        content: '최신 정보 수집 → 콘텐츠 업데이트 → 배포',
        practicalPoints: '살아있는 교육 콘텐츠',
        tools: ['Content API', 'Web Scraping', 'CMS'],
        automationScenario: '실시간 교육 콘텐츠 관리'
      },
      {
        session: 9,
        title: '교육 품질 모니터링',
        content: '수업 만족도 → 자동 분석 → 개선 방안 도출',
        practicalPoints: '지속적 교육 품질 향상',
        tools: ['Survey API', 'Sentiment Analysis', 'Feedback System'],
        automationScenario: '교육 품질 관리 체계'
      },
      {
        session: 10,
        title: '교육기관 워크플로 설계',
        content: '기관별 특성 반영 자동화 설계',
        practicalPoints: '맞춤형 교육 자동화',
        tools: ['통합 플랫폼', 'Custom API'],
        automationScenario: '기관 특화 솔루션'
      },
      {
        session: 11,
        title: '실습 구현 및 테스트',
        content: '실제 교육 환경 자동화 구현',
        practicalPoints: '현장 적용 검증',
        tools: ['실제 LMS', 'Live 데이터'],
        automationScenario: '실무 적용 및 최적화'
      },
      {
        session: 12,
        title: '에듀테크 혁신 전략',
        content: '미래 교육 트렌드 및 지속적 혁신',
        practicalPoints: '교육 혁신 리더십',
        tools: ['Future Tech', 'Innovation Framework'],
        automationScenario: '교육 혁신 생태계 구축'
      }
    ],
    advancedFeatures: [
      'AI 튜터 시스템: 24/7 개인화 학습 지원',
      '예측 분석: 학습 성과 및 이탈 위험 예측',
      'VR/AR 교육: 몰입형 학습 경험 자동화',
      '블록체인 인증: 학습 이력 및 자격 관리'
    ],
    expectedOutcomes: {
      quantitative: [
        '학습 효과 40% 향상',
        '교사 업무 부담 50% 감소',
        '행정 업무 시간 60% 단축',
        '학부모 만족도 35% 증가'
      ],
      qualitative: [
        '개인화 교육 실현',
        '교육 품질 일관성 확보',
        '학습자 중심 교육 환경',
        '데이터 기반 교육 혁신'
      ]
    },
    practicalApplications: [
      '대학교 통합 학사 관리',
      '초중고 스마트 교육 시스템',
      '학원 맞춤형 학습 관리',
      '기업 교육 자동화 플랫폼'
    ]
  },

  '의료업': {
    industry: '의료업',
    targetAudience: [
      '병원 관리자, 의료진, 간호사',
      '의료 IT 담당자, 원무팀',
      '의료 품질 관리 담당자'
    ],
    coreObjectives: [
      '환자 진료 프로세스 자동화',
      '의료진 업무 효율성 극대화',
      '환자 안전 및 만족도 향상',
      '의료 품질 관리 자동화'
    ],
    curriculum: [
      {
        session: 1,
        title: '의료업 AI 자동화 개요',
        content: '스마트 헬스케어와 의료 자동화 트렌드',
        practicalPoints: '의료 4.0 혁신 사례',
        tools: ['EMR', 'AI Diagnosis', 'Telemedicine'],
        automationScenario: '스마트 병원 구축'
      },
      {
        session: 2,
        title: '환자 예약 관리 자동화',
        content: '예약 → 접수 → 대기 관리 → 알림 자동화',
        practicalPoints: '환자 중심 예약 시스템',
        tools: ['Appointment API', 'SMS API', 'Queue Management'],
        automationScenario: '대기 시간 최소화'
      },
      {
        session: 3,
        title: '진료 기록 자동화',
        content: '음성 인식 → 자동 기록 → EMR 연동',
        practicalPoints: '의료진 업무 부담 경감',
        tools: ['Speech-to-Text', 'EMR API', 'AI Summary'],
        automationScenario: '진료 효율성 극대화'
      },
      {
        session: 4,
        title: 'n8n 의료 특화 실습',
        content: '의료업 맞춤 워크플로 구성',
        practicalPoints: '환자 안전 중심 자동화',
        tools: ['n8n', 'Medical API', 'Alert System'],
        automationScenario: '의료 프로세스 자동화'
      },
      {
        session: 5,
        title: '환자 모니터링 자동화',
        content: '생체 신호 → AI 분석 → 위험 감지 → 알림',
        practicalPoints: '24/7 환자 안전 관리',
        tools: ['Patient Monitor', 'AI Analysis', 'Alert System'],
        automationScenario: '응급 상황 조기 감지'
      },
      {
        session: 6,
        title: '의료진 스케줄 최적화',
        content: '근무 일정 → 환자 배정 → 업무 분담 자동화',
        practicalPoints: '의료진 업무 최적화',
        tools: ['Schedule API', 'Resource Allocation', 'Workload Balancer'],
        automationScenario: '의료진 효율성 극대화'
      },
      {
        session: 7,
        title: '의료 재고 관리 자동화',
        content: '약품/장비 재고 → 자동 발주 → 유통기한 관리',
        practicalPoints: '의료 자원 최적화',
        tools: ['Inventory API', 'Supplier API', 'Expiry Tracker'],
        automationScenario: '의료 재고 최적화'
      },
      {
        session: 8,
        title: '환자 만족도 관리 자동화',
        content: '진료 후 → 자동 설문 → 분석 → 개선 방안',
        practicalPoints: '환자 중심 의료 서비스',
        tools: ['Survey API', 'Sentiment Analysis', 'Feedback System'],
        automationScenario: '환자 만족도 극대화'
      },
      {
        session: 9,
        title: '의료 품질 관리 자동화',
        content: '진료 품질 지표 → 자동 모니터링 → 개선',
        practicalPoints: '의료 품질 일관성 확보',
        tools: ['Quality Monitor', 'Performance Analytics', 'Improvement Tracker'],
        automationScenario: '의료 품질 관리 체계'
      },
      {
        session: 10,
        title: '의료기관 워크플로 설계',
        content: '병원 특성별 맞춤 자동화 설계',
        practicalPoints: '기관별 특화 솔루션',
        tools: ['Custom Platform', 'Integration Hub'],
        automationScenario: '병원별 최적화'
      },
      {
        session: 11,
        title: '실전 의료 자동화 구현',
        content: '실제 의료 환경 자동화 적용',
        practicalPoints: '현장 검증 및 최적화',
        tools: ['실제 EMR', 'Live System'],
        automationScenario: '실무 적용 및 안정화'
      },
      {
        session: 12,
        title: '스마트 헬스케어 비전',
        content: '미래 의료 자동화 및 혁신 전략',
        practicalPoints: '의료 혁신 리더십',
        tools: ['Future MedTech', 'Innovation Strategy'],
        automationScenario: '의료 혁신 생태계'
      }
    ],
    advancedFeatures: [
      'AI 진단 보조: 의료 영상 분석 및 진단 지원',
      '원격 진료 자동화: 텔레메디신 플랫폼 구축',
      '환자 데이터 예측 분석: 질병 예측 및 예방',
      '의료진 교육 자동화: 지속적 전문성 향상'
    ],
    expectedOutcomes: {
      quantitative: [
        '진료 효율성 35% 향상',
        '환자 대기 시간 40% 단축',
        '의료 오류 80% 감소',
        '행정 업무 60% 자동화'
      ],
      qualitative: [
        '환자 중심 의료 서비스',
        '의료진 업무 만족도 향상',
        '의료 품질 일관성 확보',
        '디지털 헬스케어 역량 강화'
      ]
    },
    practicalApplications: [
      '종합병원 통합 관리',
      '클리닉 맞춤형 자동화',
      '원격 진료 플랫폼',
      '의료진 교육 시스템'
    ]
  },

  '운송업': {
    industry: '운송업',
    targetAudience: [
      '물류 관리자, 배송 담당자, 운송 기사',
      '물류 IT 담당자, 고객 서비스팀',
      '운송 사업 경영진'
    ],
    coreObjectives: [
      '배송 경로 최적화 및 실시간 추적',
      '차량 관리 및 예측 정비 자동화',
      '고객 서비스 및 소통 자동화',
      '운송비 최적화 및 수익성 향상'
    ],
    curriculum: [
      {
        session: 1,
        title: '스마트 로지스틱스 개요',
        content: '운송업 디지털 혁신 및 자동화 사례',
        practicalPoints: '물류 4.0 트렌드',
        tools: ['GPS', 'IoT', 'AI Route', 'Tracking'],
        automationScenario: '스마트 물류 시스템'
      },
      {
        session: 2,
        title: '배송 경로 최적화 자동화',
        content: '주문 데이터 → AI 경로 분석 → 최적 배송 계획',
        practicalPoints: '연료비 및 시간 절약',
        tools: ['Route Optimizer', 'Google Maps API', 'Traffic API'],
        automationScenario: '최적 배송 경로 설계'
      },
      {
        session: 3,
        title: '실시간 배송 추적 시스템',
        content: 'GPS 데이터 → 실시간 위치 → 고객 알림',
        practicalPoints: '고객 서비스 품질 향상',
        tools: ['GPS Tracker', 'SMS API', 'Map API'],
        automationScenario: '투명한 배송 서비스'
      },
      {
        session: 4,
        title: 'n8n 물류 특화 실습',
        content: '운송업 맞춤 워크플로 구성',
        practicalPoints: '물류 프로세스 자동화',
        tools: ['n8n', 'Logistics API', 'Tracking API'],
        automationScenario: '운송 자동화 시스템'
      },
      {
        session: 5,
        title: '차량 상태 모니터링 자동화',
        content: '차량 센서 → 상태 분석 → 정비 예측 → 예약',
        practicalPoints: '예측 정비 시스템',
        tools: ['OBD Scanner', 'Maintenance API', 'Calendar API'],
        automationScenario: '차량 관리 최적화'
      },
      {
        session: 6,
        title: '고객 소통 자동화',
        content: '배송 상태 → 자동 알림 → 피드백 수집',
        practicalPoints: '고객 만족도 극대화',
        tools: ['SMS API', 'Email API', 'Feedback API'],
        automationScenario: '고객 경험 최적화'
      },
      {
        session: 7,
        title: '운송비 분석 자동화',
        content: '운행 데이터 → 비용 분석 → 최적화 방안',
        practicalPoints: '수익성 향상 전략',
        tools: ['Cost Tracker', 'Fuel API', 'Analytics'],
        automationScenario: '운송비 최적화'
      },
      {
        session: 8,
        title: '물류 창고 관리 자동화',
        content: '입출고 → 재고 관리 → 자동 발주 시스템',
        practicalPoints: '창고 운영 효율화',
        tools: ['WMS API', 'Barcode Scanner', 'Inventory API'],
        automationScenario: '스마트 창고 운영'
      },
      {
        session: 9,
        title: '배송 성과 분석 자동화',
        content: '배송 데이터 → 성과 분석 → 개선 방안',
        practicalPoints: '지속적 서비스 개선',
        tools: ['Performance Analytics', 'KPI Dashboard'],
        automationScenario: '배송 품질 관리'
      },
      {
        session: 10,
        title: '운송업 워크플로 설계',
        content: '운송업체별 맞춤 자동화 설계',
        practicalPoints: '업체 특화 솔루션',
        tools: ['Custom Platform', 'Integration API'],
        automationScenario: '운송업체별 최적화'
      },
      {
        session: 11,
        title: '실전 물류 자동화 구현',
        content: '실제 운송 환경 자동화 적용',
        practicalPoints: '현장 검증 및 안정화',
        tools: ['실제 TMS', 'Live Tracking'],
        automationScenario: '실무 적용 및 최적화'
      },
      {
        session: 12,
        title: '스마트 로지스틱스 미래',
        content: '자율 운송 및 물류 혁신 전략',
        practicalPoints: '물류 혁신 리더십',
        tools: ['Autonomous Vehicle', 'IoT Platform'],
        automationScenario: '미래 물류 생태계'
      }
    ],
    advancedFeatures: [
      '자율 주행 연동: 무인 배송 시스템 구축',
      'IoT 물류: 전 과정 실시간 모니터링',
      '블록체인 물류: 투명한 공급망 관리',
      'AI 수요 예측: 물류량 예측 및 최적화'
    ],
    expectedOutcomes: {
      quantitative: [
        '배송 시간 25% 단축',
        '연료비 20% 절감',
        '고객 만족도 40% 향상',
        '운송비 30% 절감'
      ],
      qualitative: [
        '고객 서비스 품질 향상',
        '운송 안전성 강화',
        '운영 효율성 극대화',
        '지속가능한 물류 실현'
      ]
    },
    practicalApplications: [
      '택배 업체 통합 관리',
      '물류 센터 자동화',
      '라스트마일 배송 최적화',
      '국제 물류 관리 시스템'
    ]
  },

  '농업': {
    industry: '농업',
    targetAudience: [
      '농장 경영자, 농업 기술자, 스마트팜 관리자',
      '농업 IT 담당자, 유통 관리자',
      '농업 혁신 담당자'
    ],
    coreObjectives: [
      '스마트팜 환경 제어 자동화',
      '작물 생육 모니터링 및 예측',
      '농산물 유통 및 판매 최적화',
      '지속가능한 농업 실현'
    ],
    curriculum: [
      {
        session: 1,
        title: '농업 4.0 자동화 개요',
        content: '스마트팜과 정밀 농업 기술 이해',
        practicalPoints: '농업 디지털 혁신 사례',
        tools: ['IoT 센서', 'AI Vision', 'Drone', 'Satellite'],
        automationScenario: '스마트팜 구축'
      },
      {
        session: 2,
        title: '환경 모니터링 자동화',
        content: '온습도/토양/날씨 → 자동 수집 → 분석',
        practicalPoints: '정밀 환경 관리',
        tools: ['환경 센서', 'Weather API', 'Soil Sensor'],
        automationScenario: '최적 생육 환경 유지'
      },
      {
        session: 3,
        title: '관수 및 시비 자동화',
        content: '토양 상태 → AI 분석 → 자동 관수/시비',
        practicalPoints: '자원 사용 최적화',
        tools: ['Irrigation Control', 'Fertilizer System', 'AI Controller'],
        automationScenario: '물과 비료 사용 최적화'
      },
      {
        session: 4,
        title: 'n8n 농업 특화 실습',
        content: '농업 맞춤 워크플로 구성',
        practicalPoints: '농장 자동화 실습',
        tools: ['n8n', 'Farm API', 'Sensor API'],
        automationScenario: '농업 프로세스 자동화'
      },
      {
        session: 5,
        title: '작물 생육 분석 자동화',
        content: 'AI 영상 분석 → 생육 상태 → 관리 가이드',
        practicalPoints: '데이터 기반 농업',
        tools: ['AI Vision', 'Growth Analysis', 'Recommendation Engine'],
        automationScenario: '정밀 작물 관리'
      },
      {
        session: 6,
        title: '병해충 예측 및 방제',
        content: '환경 데이터 → AI 예측 → 방제 시기 알림',
        practicalPoints: '예방 중심 농업',
        tools: ['Disease Prediction', 'Weather API', 'Alert System'],
        automationScenario: '병해충 사전 대응'
      },
      {
        session: 7,
        title: '수확 시기 예측 자동화',
        content: '생육 데이터 → AI 분석 → 최적 수확 시기',
        practicalPoints: '수확량 및 품질 최적화',
        tools: ['Maturity Sensor', 'AI Prediction', 'Harvest Planner'],
        automationScenario: '최적 수확 타이밍'
      },
      {
        session: 8,
        title: '농산물 품질 관리 자동화',
        content: '품질 검사 → 등급 분류 → 가격 책정',
        practicalPoints: '부가가치 극대화',
        tools: ['Quality Scanner', 'Grading System', 'Price API'],
        automationScenario: '농산물 가치 최적화'
      },
      {
        session: 9,
        title: '농산물 유통 자동화',
        content: '생산 계획 → 판매 채널 → 배송 최적화',
        practicalPoints: '직거래 및 유통 혁신',
        tools: ['E-commerce API', 'Logistics API', 'Payment API'],
        automationScenario: '농산물 유통 혁신'
      },
      {
        session: 10,
        title: '농장 워크플로 설계',
        content: '농장별 특성 반영 자동화 설계',
        practicalPoints: '농장 맞춤 솔루션',
        tools: ['Farm Management Platform', 'Custom API'],
        automationScenario: '농장별 최적화'
      },
      {
        session: 11,
        title: '실전 스마트팜 구현',
        content: '실제 농장 환경 자동화 적용',
        practicalPoints: '현장 적용 및 검증',
        tools: ['실제 스마트팜', 'Live Monitoring'],
        automationScenario: '실무 적용 및 최적화'
      },
      {
        session: 12,
        title: '농업 혁신 전략',
        content: '지속가능한 농업 및 미래 전략',
        practicalPoints: '농업 혁신 리더십',
        tools: ['Sustainable Tech', 'Innovation Framework'],
        automationScenario: '농업 혁신 생태계'
      }
    ],
    advancedFeatures: [
      '위성 영상 분석: 대규모 농지 모니터링',
      '기후 변화 대응: 적응형 농업 시스템',
      '친환경 농업: 탄소 중립 농업 자동화',
      '농업 금융: 데이터 기반 농업 투자 분석'
    ],
    expectedOutcomes: {
      quantitative: [
        '수확량 30% 증가',
        '물 사용량 40% 절감',
        '농약 사용 50% 감소',
        '농업 생산성 35% 향상'
      ],
      qualitative: [
        '지속가능한 농업 실현',
        '농업 경쟁력 강화',
        '농촌 혁신 선도',
        '친환경 농업 실천'
      ]
    },
    practicalApplications: [
      '대규모 농장 통합 관리',
      '스마트팜 운영 최적화',
      '농산물 직거래 플랫폼',
      '농업 협동조합 관리'
    ]
  }
};

/**
 * 업종별 커리큘럼 조회 함수
 */
export function getIndustryCurriculum(industry: string): IndustryCurriculum | null {
  // 직접 매칭
  if (INDUSTRY_SPECIFIC_CURRICULUMS[industry]) {
    return INDUSTRY_SPECIFIC_CURRICULUMS[industry];
  }
  
  // 키워드 기반 매칭
  if (industry.includes('건설') || industry.includes('시공') || industry.includes('토목')) {
    return INDUSTRY_SPECIFIC_CURRICULUMS['건설업'];
  } else if (industry.includes('교육') || industry.includes('학교') || industry.includes('학원')) {
    return INDUSTRY_SPECIFIC_CURRICULUMS['교육업'];
  } else if (industry.includes('의료') || industry.includes('병원') || industry.includes('클리닉')) {
    return INDUSTRY_SPECIFIC_CURRICULUMS['의료업'];
  } else if (industry.includes('운송') || industry.includes('물류') || industry.includes('배송')) {
    return INDUSTRY_SPECIFIC_CURRICULUMS['운송업'];
  } else if (industry.includes('농업') || industry.includes('농장') || industry.includes('축산')) {
    return INDUSTRY_SPECIFIC_CURRICULUMS['농업'];
  }
  
  return null; // 매칭되지 않는 경우
}

/**
 * 업종별 교육 추천 함수
 */
export function generateIndustryEducationRecommendation(industry: string, aiReadinessScore: number): string {
  const curriculum = getIndustryCurriculum(industry);
  
  if (!curriculum) {
    return `${industry} 업종을 위한 맞춤형 AI 자동화 교육 프로그램을 개발하여 제공해드리겠습니다.`;
  }
  
  const urgencyLevel = aiReadinessScore < 50 ? '긴급' : aiReadinessScore < 70 ? '우선' : '고도화';
  
  return `
🎓 **${curriculum.industry} 맞춤 n8n 자동화 교육 추천**

**교육 필요도**: ${urgencyLevel} (AI 준비도 ${aiReadinessScore}% 기준)

**핵심 교육 목표**:
${curriculum.coreObjectives.map(obj => `• ${obj}`).join('\n')}

**우선 수강 세션**:
${curriculum.curriculum.slice(0, 4).map(session => 
  `${session.session}교시: ${session.title} - ${session.practicalPoints}`
).join('\n')}

**기대 효과**:
${curriculum.expectedOutcomes.quantitative.slice(0, 2).map(outcome => `• ${outcome}`).join('\n')}

**문의**: education@aicamp.co.kr | 010-9251-9743
  `;
}
