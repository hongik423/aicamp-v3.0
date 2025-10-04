'use client';

/**
 * 24개 업종별 AI & n8n 중심 커리큘럼 상세 내용
 * 성공사례 상세페이지용 - 기초/심화/경영진과정 완전 체계화
 */

export interface CurriculumModule {
  title: string;
  duration: string;
  description: string;
  objectives: string[];
  practicalExercises: string[];
  expectedOutcomes: string[];
  tools: string[];
}

export interface IndustryCurriculum {
  industryName: string;
  industryCode: string;
  basic: CurriculumModule[];
  advanced: CurriculumModule[];
  executive: CurriculumModule[];
  totalDuration: {
    basic: string;
    advanced: string;
    executive: string;
  };
  roi: {
    productivity: string;
    costSaving: string;
    timeReduction: string;
  };
}

export const COMPREHENSIVE_INDUSTRY_CURRICULUM: Record<string, IndustryCurriculum> = {
  // 1. 제조업 - 스마트팩토리
  manufacturing: {
    industryName: '제조업',
    industryCode: 'MFG',
    basic: [
      {
        title: '제조업 AI 기초 및 스마트팩토리 이해',
        duration: '12시간',
        description: '생산공정 최적화를 위한 AI 기초와 스마트팩토리 개념 학습',
        objectives: [
          'AI 기반 생산 최적화 원리 이해',
          '스마트팩토리 구성요소 파악',
          'IoT 센서 데이터 활용법 습득',
          '예측 정비 개념 이해'
        ],
        practicalExercises: [
          'ChatGPT로 생산계획 수립 실습',
          '설비 모니터링 데이터 분석',
          '품질관리 체크리스트 AI 생성',
          '생산성 지표 대시보드 구성'
        ],
        expectedOutcomes: [
          '생산 효율성 25% 향상',
          'AI 기술 이해도 90% 달성',
          '데이터 기반 의사결정 역량 확보',
          '스마트팩토리 전환 계획 수립'
        ],
        tools: ['ChatGPT', 'Claude', 'Google Sheets', 'Power BI']
      },
      {
        title: 'n8n 제조업 워크플로우 자동화',
        duration: '16시간',
        description: '생산관리, 재고관리, 품질관리 자동화 시스템 구축',
        objectives: [
          'n8n 기본 노드 활용법 습득',
          '생산 데이터 수집 자동화',
          '재고 알림 시스템 구축',
          'API 연동 기초 이해'
        ],
        practicalExercises: [
          '생산량 자동 집계 워크플로우',
          '재고 부족 알림 시스템',
          '품질 검사 결과 자동 보고',
          'ERP 시스템 연동 실습'
        ],
        expectedOutcomes: [
          '업무 자동화율 70% 달성',
          '데이터 수집 시간 80% 단축',
          '실시간 모니터링 체계 구축',
          '인적 오류 90% 감소'
        ],
        tools: ['n8n', 'Webhook', 'Google Sheets', 'Slack', 'Email']
      }
    ],
    advanced: [
      {
        title: '머신러닝 기반 품질예측 시스템',
        duration: '24시간',
        description: 'AI 비전 검사와 머신러닝을 활용한 품질 예측 모델 개발',
        objectives: [
          '컴퓨터 비전 품질검사 이해',
          '불량 예측 모델 구축',
          '실시간 품질 모니터링 시스템',
          'AI 품질관리 ROI 분석'
        ],
        practicalExercises: [
          'YOLO 기반 불량품 탐지',
          '품질 데이터 예측 모델링',
          '실시간 품질 대시보드',
          'A/B 테스트를 통한 모델 최적화'
        ],
        expectedOutcomes: [
          '품질 불량률 60% 감소',
          '검사 시간 75% 단축',
          '품질 예측 정확도 95% 달성',
          'AI 품질관리 체계 완성'
        ],
        tools: ['Python', 'OpenCV', 'YOLO', 'TensorFlow', 'n8n', 'Power BI']
      },
      {
        title: 'IoT 연동 스마트 생산관리 시스템',
        duration: '20시간',
        description: 'IoT 센서 데이터와 AI를 결합한 지능형 생산관리 시스템',
        objectives: [
          'IoT 센서 데이터 수집 및 분석',
          '예측 정비 시스템 구축',
          '생산 최적화 알고리즘 개발',
          '통합 모니터링 대시보드 구성'
        ],
        practicalExercises: [
          'IoT 센서 데이터 n8n 연동',
          '설비 이상 징후 탐지 모델',
          '생산 스케줄 최적화 시스템',
          '실시간 KPI 모니터링'
        ],
        expectedOutcomes: [
          '설비 가동률 95% 달성',
          '예측 정비로 다운타임 50% 감소',
          '생산 계획 정확도 92% 향상',
          '에너지 효율성 30% 개선'
        ],
        tools: ['IoT Platform', 'n8n', 'InfluxDB', 'Grafana', 'Python']
      }
    ],
    executive: [
      {
        title: '제조업 디지털 전환 전략과 AI ROI',
        duration: '8시간',
        description: '스마트팩토리 전환 전략 수립과 AI 투자 수익률 분석',
        objectives: [
          '디지털 전환 로드맵 수립',
          'AI 투자 ROI 산정 방법',
          '스마트팩토리 성공 사례 분석',
          '조직 변화관리 전략'
        ],
        practicalExercises: [
          '자사 디지털 성숙도 진단',
          'AI 도입 ROI 계산 실습',
          '3개년 디지털 전환 계획 수립',
          '임직원 교육 체계 설계'
        ],
        expectedOutcomes: [
          '명확한 디지털 전환 비전 확립',
          'AI 투자 우선순위 결정',
          '실행 가능한 로드맵 완성',
          '조직 역량 강화 방안 도출'
        ],
        tools: ['Business Model Canvas', 'ROI Calculator', 'Project Management']
      }
    ],
    totalDuration: {
      basic: '28시간 (4주)',
      advanced: '44시간 (6주)',
      executive: '8시간 (1주)'
    },
    roi: {
      productivity: '35% 향상',
      costSaving: '연간 2억원',
      timeReduction: '업무시간 40% 단축'
    }
  },

  // 2. IT서비스업 - 개발 자동화
  itServices: {
    industryName: 'IT서비스업',
    industryCode: 'ITS',
    basic: [
      {
        title: 'IT업계 AI 도구 활용 기초',
        duration: '10시간',
        description: '개발, 테스팅, 문서화를 위한 AI 도구 활용법',
        objectives: [
          'GitHub Copilot 활용법',
          'AI 기반 코드 리뷰',
          '자동 문서 생성',
          'AI 테스팅 도구 이해'
        ],
        practicalExercises: [
          'ChatGPT로 코드 최적화',
          'AI 기반 버그 탐지',
          'API 문서 자동 생성',
          '테스트 케이스 AI 생성'
        ],
        expectedOutcomes: [
          '개발 속도 50% 향상',
          '코드 품질 30% 개선',
          '문서화 시간 70% 단축',
          'AI 개발 도구 숙련도 확보'
        ],
        tools: ['ChatGPT', 'GitHub Copilot', 'Claude', 'Notion AI']
      },
      {
        title: 'n8n IT 업무 자동화 워크플로우',
        duration: '14시간',
        description: '프로젝트 관리, 배포, 모니터링 자동화 시스템',
        objectives: [
          'CI/CD 파이프라인 자동화',
          '이슈 트래킹 자동화',
          '서버 모니터링 알림',
          'API 테스트 자동화'
        ],
        practicalExercises: [
          'GitHub Actions + n8n 연동',
          'Jira 이슈 자동 생성',
          '서버 상태 모니터링',
          'Slack 알림 시스템 구축'
        ],
        expectedOutcomes: [
          '배포 시간 80% 단축',
          '이슈 대응 시간 60% 감소',
          '모니터링 자동화 100%',
          'DevOps 효율성 극대화'
        ],
        tools: ['n8n', 'GitHub', 'Jira', 'Slack', 'AWS', 'Docker']
      }
    ],
    advanced: [
      {
        title: 'AI 기반 코드 최적화 및 리팩토링',
        duration: '22시간',
        description: '머신러닝을 활용한 코드 품질 개선과 성능 최적화',
        objectives: [
          'AI 코드 분석 도구 활용',
          '성능 병목 지점 탐지',
          '자동 리팩토링 시스템',
          '코드 복잡도 관리'
        ],
        practicalExercises: [
          'SonarQube + AI 분석',
          '성능 프로파일링 자동화',
          '코드 스멜 탐지 시스템',
          'A/B 테스트 자동화'
        ],
        expectedOutcomes: [
          '코드 품질 점수 40% 향상',
          '성능 최적화 90% 자동화',
          '기술 부채 50% 감소',
          '코드 리뷰 효율성 3배 증가'
        ],
        tools: ['SonarQube', 'New Relic', 'Python', 'Jenkins', 'n8n']
      },
      {
        title: '지능형 프로젝트 관리 시스템',
        duration: '18시간',
        description: 'AI를 활용한 프로젝트 일정 예측과 리소스 최적화',
        objectives: [
          'AI 기반 일정 예측',
          '리소스 배분 최적화',
          '리스크 예측 모델',
          '자동 보고서 생성'
        ],
        practicalExercises: [
          '프로젝트 지연 예측 모델',
          '개발자 역량 매칭 시스템',
          '리스크 알림 자동화',
          'KPI 대시보드 구축'
        ],
        expectedOutcomes: [
          '프로젝트 성공률 85% 달성',
          '일정 예측 정확도 90%',
          '리소스 효율성 45% 향상',
          '관리 업무 60% 자동화'
        ],
        tools: ['Microsoft Project', 'Tableau', 'Python', 'n8n', 'Power BI']
      }
    ],
    executive: [
      {
        title: 'IT기업 AI 전환 전략과 조직혁신',
        duration: '6시간',
        description: 'AI 기반 IT서비스 혁신과 조직 경쟁력 강화 전략',
        objectives: [
          'AI 기반 서비스 모델 설계',
          '개발팀 AI 역량 강화 방안',
          'AI 기술 투자 우선순위',
          '고객 가치 창출 전략'
        ],
        practicalExercises: [
          'AI 서비스 포트폴리오 설계',
          '개발팀 스킬셋 분석',
          'AI 도입 ROI 시뮬레이션',
          '고객 만족도 향상 계획'
        ],
        expectedOutcomes: [
          'AI 기반 비즈니스 모델 완성',
          '개발 생산성 3배 향상 계획',
          '기술 경쟁력 확보 방안',
          '시장 차별화 전략 수립'
        ],
        tools: ['Business Canvas', 'OKR Framework', 'ROI Calculator']
      }
    ],
    totalDuration: {
      basic: '24시간 (3주)',
      advanced: '40시간 (5주)',
      executive: '6시간 (1주)'
    },
    roi: {
      productivity: '60% 향상',
      costSaving: '연간 3억원',
      timeReduction: '개발시간 45% 단축'
    }
  },

  // 3. 금융업 - 핀테크 & 리스크관리
  finance: {
    industryName: '금융업',
    industryCode: 'FIN',
    basic: [
      {
        title: '금융업 AI 기초 및 핀테크 트렌드',
        duration: '12시간',
        description: '금융 AI 활용 사례와 규제 환경 이해',
        objectives: [
          '금융 AI 적용 분야 이해',
          '규제 준수 사항 파악',
          '고객 데이터 보안 원칙',
          '핀테크 혁신 사례 분석'
        ],
        practicalExercises: [
          'ChatGPT로 금융상품 설명서 작성',
          '고객 상담 시나리오 AI 생성',
          '투자 리포트 자동 요약',
          '리스크 체크리스트 AI 작성'
        ],
        expectedOutcomes: [
          '금융 AI 이해도 95% 달성',
          '상품 설명 효율성 40% 향상',
          '고객 상담 품질 개선',
          '규제 준수 역량 강화'
        ],
        tools: ['ChatGPT', 'Claude', 'Microsoft 365', 'Compliance Tools']
      },
      {
        title: 'n8n 금융업무 자동화 시스템',
        duration: '16시간',
        description: '고객관리, 리포팅, 리스크 모니터링 자동화',
        objectives: [
          '고객 데이터 수집 자동화',
          '정기 보고서 자동 생성',
          '리스크 알림 시스템',
          'KYC 프로세스 자동화'
        ],
        practicalExercises: [
          '고객 포트폴리오 자동 업데이트',
          '일일 거래 내역 요약 보고',
          '이상 거래 탐지 알림',
          'CRM 시스템 데이터 연동'
        ],
        expectedOutcomes: [
          '보고서 작성 시간 70% 단축',
          '데이터 정확도 99% 달성',
          '리스크 모니터링 실시간화',
          '고객 관리 효율성 50% 향상'
        ],
        tools: ['n8n', 'Excel', 'CRM', 'Banking API', 'Slack']
      }
    ],
    advanced: [
      {
        title: 'AI 기반 신용평가 및 리스크 관리',
        duration: '26시간',
        description: '머신러닝을 활용한 신용평가 모델과 리스크 예측',
        objectives: [
          '신용평가 AI 모델 이해',
          '포트폴리오 리스크 분석',
          '사기 탐지 시스템 구축',
          '규제 리포팅 자동화'
        ],
        practicalExercises: [
          '신용점수 예측 모델 구축',
          '이상 거래 패턴 분석',
          '시장 리스크 시뮬레이션',
          'Basel III 보고서 자동화'
        ],
        expectedOutcomes: [
          '신용평가 정확도 92% 달성',
          '사기 탐지율 95% 향상',
          '리스크 예측 시간 80% 단축',
          '규제 준수 100% 자동화'
        ],
        tools: ['Python', 'R', 'TensorFlow', 'Tableau', 'n8n', 'SQL']
      },
      {
        title: '로보어드바이저 및 개인화 금융서비스',
        duration: '18시간',
        description: 'AI 기반 투자 자문과 맞춤형 금융상품 추천',
        objectives: [
          '로보어드바이저 알고리즘 이해',
          '고객 성향 분석 모델',
          '포트폴리오 최적화',
          '개인화 마케팅 자동화'
        ],
        practicalExercises: [
          '투자 성향 분석 모델',
          '자산 배분 최적화 시스템',
          '맞춤형 상품 추천 엔진',
          'A/B 테스트 마케팅 자동화'
        ],
        expectedOutcomes: [
          '고객 만족도 40% 향상',
          '상품 추천 정확도 88%',
          '포트폴리오 수익률 15% 개선',
          '마케팅 ROI 3배 증가'
        ],
        tools: ['Python', 'Pandas', 'Scikit-learn', 'AWS', 'n8n']
      }
    ],
    executive: [
      {
        title: '금융업 디지털 전환과 AI 거버넌스',
        duration: '8시간',
        description: '금융 AI 전략 수립과 리스크 거버넌스 체계',
        objectives: [
          'AI 금융서비스 전략 수립',
          'AI 윤리 및 거버넌스',
          '규제 대응 전략',
          '디지털 금융 생태계 구축'
        ],
        practicalExercises: [
          'AI 금융서비스 로드맵 수립',
          'AI 윤리 가이드라인 작성',
          '규제 대응 체크리스트',
          'DX 투자 계획 수립'
        ],
        expectedOutcomes: [
          '명확한 AI 전략 수립',
          '리스크 관리 체계 완성',
          '규제 준수 프레임워크',
          '경쟁력 있는 디지털 금융 모델'
        ],
        tools: ['Strategy Framework', 'Risk Matrix', 'Compliance Dashboard']
      }
    ],
    totalDuration: {
      basic: '28시간 (4주)',
      advanced: '44시간 (6주)',
      executive: '8시간 (1주)'
    },
    roi: {
      productivity: '45% 향상',
      costSaving: '연간 5억원',
      timeReduction: '업무처리 50% 단축'
    }
  },

  // 4. 유통/소매업 - 옴니채널 & 개인화
  retail: {
    industryName: '유통/소매업',
    industryCode: 'RTL',
    basic: [
      {
        title: '유통업 AI 기초 및 고객 분석',
        duration: '10시간',
        description: '고객 행동 분석과 AI 기반 마케팅 기초',
        objectives: [
          '고객 세분화 기법 이해',
          'AI 기반 상품 추천',
          '재고 관리 최적화',
          '옴니채널 전략 수립'
        ],
        practicalExercises: [
          'ChatGPT로 상품 설명 최적화',
          '고객 리뷰 감정 분석',
          '계절성 수요 예측',
          '마케팅 카피 AI 생성'
        ],
        expectedOutcomes: [
          '고객 이해도 80% 향상',
          '상품 설명 효율성 60% 개선',
          '마케팅 반응률 25% 증가',
          'AI 활용 자신감 확보'
        ],
        tools: ['ChatGPT', 'Google Analytics', 'Excel', 'Canva AI']
      },
      {
        title: 'n8n 유통업 운영 자동화',
        duration: '14시간',
        description: '재고관리, 주문처리, 고객서비스 자동화',
        objectives: [
          '주문 처리 자동화',
          '재고 알림 시스템',
          '고객 문의 자동 응답',
          'POS 시스템 연동'
        ],
        practicalExercises: [
          '주문-배송 연동 자동화',
          '재고 부족 알림 시스템',
          '고객 문의 분류 자동화',
          '매출 데이터 실시간 집계'
        ],
        expectedOutcomes: [
          '주문 처리 시간 70% 단축',
          '재고 관리 효율성 50% 향상',
          '고객 응답 시간 80% 단축',
          '운영 비용 30% 절감'
        ],
        tools: ['n8n', 'Shopify', 'WooCommerce', 'Slack', 'Google Sheets']
      }
    ],
    advanced: [
      {
        title: 'AI 기반 수요예측 및 재고최적화',
        duration: '24시간',
        description: '머신러닝을 활용한 수요 예측과 동적 가격 책정',
        objectives: [
          '수요 예측 모델 구축',
          '동적 가격 최적화',
          '재고 회전율 개선',
          '시즌성 패턴 분석'
        ],
        practicalExercises: [
          '시계열 수요 예측 모델',
          '가격 탄력성 분석',
          'ABC 재고 분류 자동화',
          '프로모션 효과 측정'
        ],
        expectedOutcomes: [
          '수요 예측 정확도 85%',
          '재고 비용 40% 절감',
          '매출 15% 증가',
          '품절률 90% 감소'
        ],
        tools: ['Python', 'Prophet', 'Pandas', 'Tableau', 'n8n']
      },
      {
        title: '개인화 추천시스템 및 고객여정 최적화',
        duration: '20시간',
        description: 'AI 기반 상품 추천과 고객 경험 개인화',
        objectives: [
          '협업 필터링 추천 시스템',
          '고객 여정 매핑',
          '개인화 마케팅 자동화',
          'LTV 예측 모델'
        ],
        practicalExercises: [
          '상품 추천 알고리즘 구현',
          '고객 행동 패턴 분석',
          '개인화 이메일 자동화',
          '고객 가치 세분화'
        ],
        expectedOutcomes: [
          '추천 클릭률 3배 증가',
          '고객 만족도 45% 향상',
          'LTV 25% 증가',
          '마케팅 효율성 200% 개선'
        ],
        tools: ['Scikit-learn', 'Surprise', 'Google Analytics', 'n8n']
      }
    ],
    executive: [
      {
        title: '유통업 옴니채널 전략과 AI 혁신',
        duration: '6시간',
        description: '디지털 트랜스포메이션과 고객 중심 비즈니스 모델',
        objectives: [
          '옴니채널 전략 수립',
          'AI 기반 고객 경험 설계',
          '데이터 드리븐 의사결정',
          '디지털 생태계 구축'
        ],
        practicalExercises: [
          '옴니채널 로드맵 수립',
          '고객 경험 여정 설계',
          'AI 투자 우선순위 결정',
          'KPI 대시보드 설계'
        ],
        expectedOutcomes: [
          '통합된 고객 경험 전략',
          '데이터 기반 의사결정 체계',
          'AI 투자 ROI 극대화',
          '시장 경쟁력 강화'
        ],
        tools: ['Customer Journey Map', 'Business Model Canvas', 'OKR']
      }
    ],
    totalDuration: {
      basic: '24시간 (3주)',
      advanced: '44시간 (6주)',
      executive: '6시간 (1주)'
    },
    roi: {
      productivity: '55% 향상',
      costSaving: '연간 4억원',
      timeReduction: '운영업무 45% 단축'
    }
  },

  // 5. 건설업 - 스마트 건설관리
  construction: {
    industryName: '건설업',
    industryCode: 'CON',
    basic: [
      {
        title: '건설업 AI 기초 및 디지털 건설',
        duration: '12시간',
        description: 'BIM, IoT, 드론을 활용한 스마트 건설 기술',
        objectives: [
          'BIM과 AI 연동 이해',
          '건설 현장 IoT 활용',
          '드론 측량 및 모니터링',
          '안전관리 AI 적용'
        ],
        practicalExercises: [
          'ChatGPT로 공사 계획서 작성',
          'AI 기반 안전 체크리스트',
          '진도 보고서 자동 생성',
          '자재 소요량 AI 계산'
        ],
        expectedOutcomes: [
          '건설 AI 이해도 85% 달성',
          '문서 작성 효율성 50% 향상',
          '안전 관리 체계 개선',
          '프로젝트 관리 역량 강화'
        ],
        tools: ['ChatGPT', 'BIM 360', 'Excel', 'AutoCAD']
      },
      {
        title: 'n8n 건설 프로젝트 관리 자동화',
        duration: '16시간',
        description: '공정관리, 자재관리, 안전관리 통합 자동화',
        objectives: [
          '공정 진행률 자동 추적',
          '자재 발주 알림 시스템',
          '안전사고 즉시 보고',
          '하도급업체 관리 자동화'
        ],
        practicalExercises: [
          '공정률 자동 업데이트',
          '자재 재고 알림 시스템',
          '현장 사진 자동 분류',
          '일일 작업 보고 자동화'
        ],
        expectedOutcomes: [
          '공정 관리 효율성 40% 향상',
          '자재 관리 비용 25% 절감',
          '안전사고 대응 시간 70% 단축',
          '문서 작업 60% 자동화'
        ],
        tools: ['n8n', 'Microsoft Project', 'Slack', 'Google Drive', 'Camera API']
      }
    ],
    advanced: [
      {
        title: 'AI 기반 건설 안전관리 및 품질관리',
        duration: '26시간',
        description: '컴퓨터 비전을 활용한 현장 안전 및 품질 모니터링',
        objectives: [
          'AI 비전 안전 모니터링',
          '품질 결함 자동 탐지',
          '공정별 리스크 예측',
          '실시간 현장 모니터링'
        ],
        practicalExercises: [
          'CCTV 기반 안전모 착용 탐지',
          '콘크리트 균열 AI 탐지',
          '공정 지연 예측 모델',
          '현장 상황 실시간 대시보드'
        ],
        expectedOutcomes: [
          '안전사고 80% 감소',
          '품질 불량 70% 조기 발견',
          '공정 지연 예측 정확도 90%',
          '현장 모니터링 실시간화'
        ],
        tools: ['OpenCV', 'YOLO', 'Python', 'IoT Sensors', 'n8n', 'Power BI']
      },
      {
        title: '스마트 건설 통합관리 시스템',
        duration: '18시간',
        description: 'IoT, AI, BIM을 통합한 지능형 건설관리 플랫폼',
        objectives: [
          'BIM-IoT-AI 통합 시스템',
          '예측 정비 시스템',
          '에너지 효율 최적화',
          '통합 대시보드 구축'
        ],
        practicalExercises: [
          'BIM 모델과 IoT 데이터 연동',
          '장비 예측 정비 모델',
          '건물 에너지 최적화',
          '프로젝트 KPI 통합 대시보드'
        ],
        expectedOutcomes: [
          '장비 가동률 95% 달성',
          '에너지 효율성 35% 향상',
          '통합 관리 효율성 50% 개선',
          '데이터 기반 의사결정 체계'
        ],
        tools: ['BIM 360', 'IoT Platform', 'Power BI', 'Azure', 'n8n']
      }
    ],
    executive: [
      {
        title: '건설업 디지털 전환과 스마트 건설 전략',
        duration: '8시간',
        description: '건설업 4.0 전환 전략과 미래 경쟁력 확보',
        objectives: [
          '스마트 건설 로드맵 수립',
          'AI 투자 우선순위 결정',
          '조직 역량 강화 방안',
          '건설업 4.0 생태계 구축'
        ],
        practicalExercises: [
          '디지털 성숙도 진단',
          'AI 도입 ROI 분석',
          '임직원 교육 계획 수립',
          '파트너십 전략 수립'
        ],
        expectedOutcomes: [
          '명확한 디지털 전환 비전',
          'AI 투자 로드맵 완성',
          '조직 변화관리 계획',
          '지속 가능한 성장 전략'
        ],
        tools: ['Digital Maturity Assessment', 'ROI Calculator', 'Change Management']
      }
    ],
    totalDuration: {
      basic: '28시간 (4주)',
      advanced: '44시간 (6주)',
      executive: '8시간 (1주)'
    },
    roi: {
      productivity: '40% 향상',
      costSaving: '연간 3억원',
      timeReduction: '관리업무 50% 단축'
    }
  },

  // 6. 의료업 - 디지털 헬스케어
  healthcare: {
    industryName: '의료업',
    industryCode: 'MED',
    basic: [
      {
        title: '의료업 AI 기초 및 디지털 헬스케어',
        duration: '14시간',
        description: '의료 AI 적용 분야와 규제 환경 이해',
        objectives: [
          '의료 AI 적용 사례 학습',
          '개인정보보호 규정 이해',
          '의료 데이터 보안 원칙',
          '원격의료 플랫폼 활용'
        ],
        practicalExercises: [
          'ChatGPT로 환자 설명서 작성',
          '의료진 교육 자료 AI 생성',
          '진료 기록 요약 자동화',
          '환자 상담 시나리오 작성'
        ],
        expectedOutcomes: [
          '의료 AI 이해도 90% 달성',
          '문서 작성 효율성 60% 향상',
          '환자 소통 품질 개선',
          '규제 준수 역량 강화'
        ],
        tools: ['ChatGPT', 'Claude', 'Medical AI Tools', 'HIPAA Compliance']
      },
      {
        title: 'n8n 의료업무 자동화 시스템',
        duration: '16시간',
        description: '환자관리, 진료예약, 의료기록 자동화',
        objectives: [
          '환자 예약 관리 자동화',
          '진료 기록 자동 분류',
          '의료진 스케줄 최적화',
          '환자 알림 시스템 구축'
        ],
        practicalExercises: [
          '예약 확인 자동 SMS',
          '진료 기록 자동 백업',
          '의료진 근무표 자동 생성',
          '환자 만족도 조사 자동화'
        ],
        expectedOutcomes: [
          '예약 관리 효율성 70% 향상',
          '의료기록 정확도 95% 달성',
          '스케줄 관리 시간 50% 단축',
          '환자 만족도 30% 개선'
        ],
        tools: ['n8n', 'EMR System', 'Calendar API', 'SMS API', 'Excel']
      }
    ],
    advanced: [
      {
        title: 'AI 기반 의료 진단 보조 시스템',
        duration: '28시간',
        description: '의료영상 분석과 진단 보조 AI 시스템',
        objectives: [
          '의료영상 AI 분석 이해',
          '진단 정확도 향상 방법',
          '임상 의사결정 지원',
          'AI 윤리 및 책임성'
        ],
        practicalExercises: [
          'X-ray 이상 소견 탐지',
          '환자 데이터 패턴 분석',
          '치료 효과 예측 모델',
          'AI 진단 결과 해석'
        ],
        expectedOutcomes: [
          '진단 정확도 15% 향상',
          '진단 시간 40% 단축',
          '의료 오류 50% 감소',
          'AI 보조 진단 체계 구축'
        ],
        tools: ['TensorFlow', 'OpenCV', 'DICOM', 'Python', 'n8n']
      },
      {
        title: '환자 맞춤형 치료 및 예측 시스템',
        duration: '16시간',
        description: '개인화 의료와 치료 결과 예측 시스템',
        objectives: [
          '개인화 치료 계획 수립',
          '치료 반응 예측 모델',
          '부작용 위험도 평가',
          '환자 모니터링 자동화'
        ],
        practicalExercises: [
          '환자별 치료 반응 예측',
          '약물 부작용 위험 분석',
          '재입원 위험도 모델',
          '건강 지표 모니터링'
        ],
        expectedOutcomes: [
          '치료 성공률 25% 향상',
          '부작용 예측 정확도 85%',
          '재입원율 30% 감소',
          '환자 모니터링 실시간화'
        ],
        tools: ['R', 'Scikit-learn', 'Tableau', 'IoT Health', 'n8n']
      }
    ],
    executive: [
      {
        title: '의료업 디지털 혁신과 AI 거버넌스',
        duration: '8시간',
        description: '디지털 헬스케어 전략과 의료 AI 윤리',
        objectives: [
          '디지털 헬스케어 전략 수립',
          '의료 AI 윤리 가이드라인',
          '규제 대응 전략',
          '환자 중심 의료 혁신'
        ],
        practicalExercises: [
          'DX 의료 서비스 설계',
          'AI 윤리 위원회 구성',
          '규제 준수 체크리스트',
          '환자 경험 개선 계획'
        ],
        expectedOutcomes: [
          '디지털 의료 비전 확립',
          'AI 윤리 거버넌스 체계',
          '규제 준수 프레임워크',
          '환자 중심 혁신 모델'
        ],
        tools: ['Healthcare Strategy', 'Ethics Framework', 'Compliance Dashboard']
      }
    ],
    totalDuration: {
      basic: '30시간 (4주)',
      advanced: '44시간 (6주)',
      executive: '8시간 (1주)'
    },
    roi: {
      productivity: '50% 향상',
      costSaving: '연간 6억원',
      timeReduction: '진료업무 35% 단축'
    }
  },

  // 7. 교육업 - 에듀테크 & 개인화 학습
  education: {
    industryName: '교육업',
    industryCode: 'EDU',
    basic: [
      {
        title: '교육업 AI 기초 및 에듀테크 활용',
        duration: '12시간',
        description: '개인화 학습과 AI 기반 교육 콘텐츠 제작',
        objectives: [
          'AI 기반 교육 방법론 이해',
          '개인화 학습 시스템',
          '교육 콘텐츠 AI 생성',
          '학습 분석 기초'
        ],
        practicalExercises: [
          'ChatGPT로 교안 작성',
          '개별 학습자 맞춤 문제 생성',
          'AI 기반 학습 계획 수립',
          '교육 영상 스크립트 AI 작성'
        ],
        expectedOutcomes: [
          '교육 AI 이해도 85% 달성',
          '교안 작성 시간 60% 단축',
          '개인화 교육 역량 확보',
          '콘텐츠 제작 효율성 3배 증가'
        ],
        tools: ['ChatGPT', 'Claude', 'Canva AI', 'Google Classroom']
      },
      {
        title: 'n8n 교육업무 자동화 워크플로우',
        duration: '14시간',
        description: '학습관리, 성적처리, 학부모 소통 자동화',
        objectives: [
          '학습 진도 자동 추적',
          '성적 처리 자동화',
          '학부모 알림 시스템',
          '출석 관리 자동화'
        ],
        practicalExercises: [
          '과제 제출 알림 자동화',
          '성적 통계 자동 생성',
          '학부모 상담 일정 관리',
          '학습 리포트 자동 발송'
        ],
        expectedOutcomes: [
          '행정업무 70% 자동화',
          '성적 처리 시간 80% 단축',
          '학부모 소통 효율성 50% 향상',
          '교사 업무 부담 40% 경감'
        ],
        tools: ['n8n', 'LMS', 'Google Sheets', 'Email', 'SMS API']
      }
    ],
    advanced: [
      {
        title: 'AI 기반 개인화 학습 시스템',
        duration: '24시간',
        description: '적응형 학습과 학습자 행동 분석 시스템',
        objectives: [
          '학습자 성향 분석 모델',
          '적응형 학습 경로 설계',
          '학습 효과 예측',
          '자동 피드백 시스템'
        ],
        practicalExercises: [
          '학습 스타일 분석 모델',
          '개인별 학습 경로 생성',
          '학습 성과 예측 시스템',
          'AI 튜터 챗봇 구축'
        ],
        expectedOutcomes: [
          '학습 효과 40% 향상',
          '개인화 정확도 90% 달성',
          '학습 완료율 35% 증가',
          '자동 피드백 시스템 구축'
        ],
        tools: ['Python', 'Scikit-learn', 'NLP', 'Chatbot', 'n8n']
      },
      {
        title: '교육 데이터 분석 및 인사이트 시스템',
        duration: '20시간',
        description: '학습 분석과 교육 성과 최적화 시스템',
        objectives: [
          '학습 데이터 분석 기법',
          '교육 효과 측정 방법',
          '학습자 이탈 예측',
          '교육 품질 개선 방안'
        ],
        practicalExercises: [
          '학습 패턴 분석 대시보드',
          '중도 탈락 예측 모델',
          '교육 효과 A/B 테스트',
          '학습 성과 시각화'
        ],
        expectedOutcomes: [
          '학습자 이탈률 50% 감소',
          '교육 품질 지표 30% 개선',
          '데이터 기반 교육 설계',
          '실시간 학습 모니터링'
        ],
        tools: ['Tableau', 'Power BI', 'Google Analytics', 'Python', 'n8n']
      }
    ],
    executive: [
      {
        title: '교육업 디지털 전환과 에듀테크 전략',
        duration: '6시간',
        description: '미래 교육 모델과 AI 기반 교육 혁신',
        objectives: [
          '에듀테크 트렌드 분석',
          'AI 교육 생태계 구축',
          '교육 혁신 전략 수립',
          '디지털 교육 ROI 관리'
        ],
        practicalExercises: [
          '교육 혁신 로드맵 수립',
          'AI 교육 서비스 설계',
          '에듀테크 투자 계획',
          '교육 성과 KPI 설정'
        ],
        expectedOutcomes: [
          '명확한 교육 혁신 비전',
          'AI 기반 교육 모델 완성',
          '지속 가능한 성장 전략',
          '경쟁력 있는 교육 서비스'
        ],
        tools: ['Education Strategy', 'Innovation Framework', 'ROI Dashboard']
      }
    ],
    totalDuration: {
      basic: '26시간 (4주)',
      advanced: '44시간 (6주)',
      executive: '6시간 (1주)'
    },
    roi: {
      productivity: '65% 향상',
      costSaving: '연간 2억원',
      timeReduction: '행정업무 70% 단축'
    }
  },

  // 8. 농업 - 스마트팜 & 정밀농업
  agriculture: {
    industryName: '농업',
    industryCode: 'AGR',
    basic: [
      {
        title: '농업 AI 기초 및 스마트팜 이해',
        duration: '12시간',
        description: 'IoT, AI를 활용한 정밀농업과 스마트팜 기술',
        objectives: [
          '스마트팜 구성요소 이해',
          'IoT 센서 활용법',
          '작물 생육 모니터링',
          '농업 데이터 분석 기초'
        ],
        practicalExercises: [
          'ChatGPT로 재배 계획 수립',
          '날씨 데이터 기반 농작업 일정',
          'AI 기반 병해충 진단',
          '농산물 가격 예측 분석'
        ],
        expectedOutcomes: [
          '스마트농업 이해도 80% 달성',
          '데이터 기반 농업 역량 확보',
          '생산성 향상 방안 도출',
          'AI 농업 도구 활용 능력'
        ],
        tools: ['ChatGPT', 'Google Earth', 'Weather API', 'Excel']
      },
      {
        title: 'n8n 농업 운영 자동화 시스템',
        duration: '16시간',
        description: '관수, 시설관리, 출하관리 자동화',
        objectives: [
          '자동 관수 시스템 구축',
          '환경 모니터링 자동화',
          '농산물 출하 관리',
          '농장 운영 데이터 통합'
        ],
        practicalExercises: [
          '토양 수분 기반 자동 관수',
          '온실 환경 알림 시스템',
          '출하량 자동 집계',
          '농장 일지 자동 작성'
        ],
        expectedOutcomes: [
          '물 사용량 30% 절약',
          '환경 관리 효율성 50% 향상',
          '출하 관리 시간 60% 단축',
          '농장 운영 데이터 통합 관리'
        ],
        tools: ['n8n', 'IoT Sensors', 'Arduino', 'Google Sheets', 'SMS']
      }
    ],
    advanced: [
      {
        title: 'AI 기반 작물 생육 예측 및 최적화',
        duration: '26시간',
        description: '컴퓨터 비전과 머신러닝을 활용한 정밀농업',
        objectives: [
          '작물 생육 상태 AI 진단',
          '수확량 예측 모델',
          '병해충 조기 탐지',
          '최적 수확 시기 예측'
        ],
        practicalExercises: [
          '드론 영상 작물 분석',
          '생육 단계별 수확량 예측',
          '병해충 이미지 분류 모델',
          '환경 데이터 기반 생육 최적화'
        ],
        expectedOutcomes: [
          '수확량 20% 증가',
          '병해충 피해 70% 감소',
          '최적 수확 시기 정확도 90%',
          '농약 사용량 50% 절감'
        ],
        tools: ['OpenCV', 'TensorFlow', 'Drone', 'Python', 'n8n', 'GIS']
      },
      {
        title: '스마트팜 통합관리 및 자동화 시스템',
        duration: '18시간',
        description: '전체 농장 운영의 지능형 자동화 시스템',
        objectives: [
          '통합 농장 관리 시스템',
          '자동화 제어 시스템',
          '에너지 효율 최적화',
          '농장 경영 분석'
        ],
        practicalExercises: [
          '전체 농장 모니터링 대시보드',
          '자동 환경 제어 시스템',
          '에너지 사용 최적화',
          '경영 성과 분석 리포트'
        ],
        expectedOutcomes: [
          '농장 운영 효율성 45% 향상',
          '에너지 비용 35% 절감',
          '인력 투입 40% 감소',
          '농장 수익성 25% 개선'
        ],
        tools: ['IoT Platform', 'SCADA', 'Power BI', 'Cloud', 'n8n']
      }
    ],
    executive: [
      {
        title: '농업 디지털 전환과 스마트농업 전략',
        duration: '8시간',
        description: '농업 4.0 전환과 지속가능한 농업 경영',
        objectives: [
          '스마트농업 전환 전략',
          'AI 농업 투자 계획',
          '지속가능한 농업 모델',
          '농업 생태계 혁신'
        ],
        practicalExercises: [
          '농장 디지털화 로드맵',
          'AI 투자 ROI 분석',
          '지속가능성 지표 설정',
          '농업 혁신 생태계 구축'
        ],
        expectedOutcomes: [
          '명확한 디지털 농업 비전',
          'AI 투자 우선순위 결정',
          '지속가능한 경영 모델',
          '농업 혁신 리더십 확보'
        ],
        tools: ['Farm Management', 'Sustainability Framework', 'ROI Calculator']
      }
    ],
    totalDuration: {
      basic: '28시간 (4주)',
      advanced: '44시간 (6주)',
      executive: '8시간 (1주)'
    },
    roi: {
      productivity: '50% 향상',
      costSaving: '연간 1.5억원',
      timeReduction: '농장관리 60% 자동화'
    }
  }
};

// 추가 16개 업종 (간략 버전)
export const ADDITIONAL_INDUSTRIES: Record<string, Partial<IndustryCurriculum>> = {
  // 9. 생산/물류 트랙 - AI CAMP 프로그램 기반
  logistics: {
    industryName: '생산/물류업',
    industryCode: 'LOG',
    basic: [
      {
        title: '생산/물류 트랙 - 입문과정 (12시간)',
        duration: '12시간',
        description: '"재고, 제고, 품질관리... 자동화로 실수 없는 운영!"',
        objectives: [
          '재고/일정/작업 리포트 자동화 역량 학보',
          '반복적인 수기업무 등을 자동화',
          '품질 이슈 대응 및 알림 자동화 구성'
        ],
        practicalExercises: [
          'AI 자동화 개요 - 생산/물류 업무에서 작업되는 자동화 사례',
          '작업일정 요약 자동화 - 텍스트 일정 → 요약 → 리포트 전송',
          '재고 수급 보고서 자동 생성 - 양/물/물류 분류 → 요약 → PDF 전송',
          '센서/IoT 데이터 연동 설계 - Webhook/Google Sheet → n8n 자동화',
          '출고/배송 시간 모니터링 - 시간 조건 → 고객/관리자 알림 자동 전송',
          '공급망 관리 일정 종합 - 공급 요청 노속/시간 자동 대응 종합 구성',
          '생산 스케줄 자동 생성 - 수요 기반 생산계획표 자동 업데이트',
          '공정 이슈 정보 자동화 - 공정 지연 이슈 요약 정리 → 리포트 생성',
          '현장 기반 자동화 설계 실습 - 각자의 업무 상황 기반 올룸 설계 실습',
          '발표 및 피드백 - 설계 적용 기능성 검토 + 피드백 교정'
        ],
        expectedOutcomes: [
          '생산/물류 자동화 기초 역량 확보',
          '재고 및 일정 관리 자동화',
          '품질 관리 시스템 구축',
          '실무 적용 가능한 자동화 설계'
        ],
        tools: ['ChatGPT', 'n8n', 'Google Sheets', 'Webhook', 'IoT Sensors']
      }
    ],
    advanced: [
      {
        title: '생산/물류 트랙 - 심화과정 (12시간)',
        duration: '12시간',
        description: '"제고, 일정, 일일... 생산 현장의 반복 업무를 자동화하세요!"',
        objectives: [
          '반복적인 생산/물류 관리 업무를 자동화하는 기본 역량 습득',
          '재고 일일, 일정 체크, 품질 데이터 요약 등의 자동화 체험',
          'n8n을 통해 실제 공정과 연결된 자동화 흐름을 이해하고 실습'
        ],
        practicalExercises: [
          '생성형 AI 개요 - 현장 출력에서 작용되는 AI 효과 이해',
          '업무요약 프롬프트 실습 - 음질 이슈 요약, 공정 내용 정리 업무 실습',
          '작업일정 자동 정리 - 작업 코드 → GPT 요약 → 이메일 업무 전송',
          'n8n 기본 이해 - n8n 노드 구조, 클라우드 요약 이해',
          'n8n 기본 노드 자동화 - 트리거/액션 구조 이해와 실물 피크업볼 설계',
          '재고 정보 요약 자동화 - Google Sheet → 조건 → GPT 종합 요약 구성',
          '생산 일일 리포트 자동화 - 일일 입고 감지 → 요약 보고서 자동 생성',
          '출고/배송 정보 자동화 - 출고 지연 이슈 요약 정리 → 리포트 생성',
          '단순 글쓰기 대응 흐름 구성 - 각자의 업무 상황 기반 올룸 설계 실습',
          '나만의 자동화 만들기 - 각자의 시례 기반 미니 자동화 구성',
          '실습 구성 실행 - 나만의 n8n 워크플로우 직접 구성',
          '발표 및 피드백 - 워크플로우 발표 및 개선 피드백'
        ],
        expectedOutcomes: [
          '고급 생산 관리 자동화 시스템',
          '실시간 품질 모니터링',
          '공급망 최적화 능력',
          '데이터 기반 의사결정 지원'
        ],
        tools: ['n8n Advanced', 'ERP Systems', 'IoT Platform', 'Quality Management Systems', 'Supply Chain APIs']
      }
    ],
    executive: [
      {
        title: '경영진/임원 맞춤형 AI 교육 (3시간)',
        duration: '3시간',
        description: '"AI 강좌를 통해 최신 트렌드와 혁신 효과을 얻어보세요!"',
        objectives: [
          '생성형 AI 및 n8n 기반 자동화의 개념과 원리 이해',
          '부서별 AI 자동화 적용 사례 및 ROI 인사이트 학보',
          '조직 내 AI 전환을 위한 전략적 역할 인식'
        ],
        practicalExercises: [
          'AI & n8n 개요 및 글로벌 트렌드 - 생성형 AI 효과, n8n 소개, 글로벌 자동화 트렌드',
          '부서별 자동화 사례와 생산성 효과 - 마케팅, 영업, 인사 등 부서별 구체적 적용 사례',
          '경영진의 역할과 조직 도입 전략 - 조직 내 AI 활성 전략, 인력 재배치, 성공 조건 정리'
        ],
        expectedOutcomes: [
          'AI 자동화 전략적 이해',
          '부서별 적용 방안 수립',
          '조직 변화 리더십 확보'
        ],
        tools: ['AI Strategy Framework', 'ROI Calculator', 'Change Management Tools']
      }
    ],
    totalDuration: { basic: '12시간', advanced: '12시간', executive: '3시간' },
    roi: { productivity: '45% 향상', costSaving: '연간 3억원', timeReduction: '운영업무 50% 단축' }
  },

  // 10. 호텔/숙박업
  hospitality: {
    industryName: '호텔/숙박업',
    industryCode: 'HTL',
    basic: [
      {
        title: '호텔업 AI 기초 및 고객 서비스',
        duration: '12시간',
        description: '개인화 서비스와 AI 기반 고객 관리',
        objectives: ['고객 개인화 서비스', 'AI 컨시어지', '수익 관리', '리뷰 분석'],
        practicalExercises: ['개인화 추천 서비스', 'AI 챗봇 구축', '동적 가격 책정', '고객 피드백 분석'],
        expectedOutcomes: ['고객 만족도 35% 향상', '매출 20% 증가', '운영 효율성 40% 개선', 'AI 서비스 역량 확보'],
        tools: ['ChatGPT', 'PMS', 'Google Analytics', 'Review APIs']
      }
    ],
    totalDuration: { basic: '26시간', advanced: '42시간', executive: '6시간' },
    roi: { productivity: '40% 향상', costSaving: '연간 2.5억원', timeReduction: '고객서비스 45% 효율화' }
  },

  // 11. 법무/법률 서비스
  legal: {
    industryName: '법무/법률서비스',
    industryCode: 'LAW',
    basic: [
      {
        title: '법무업 AI 기초 및 문서 자동화',
        duration: '14시간',
        description: 'AI 기반 법률 문서 작성과 판례 분석',
        objectives: ['법률 AI 이해', '문서 자동화', '판례 분석', '컴플라이언스'],
        practicalExercises: ['계약서 초안 작성', '판례 검색 자동화', '법률 자문 템플릿', '규제 모니터링'],
        expectedOutcomes: ['문서 작성 60% 단축', '판례 분석 효율성 3배', '법률 서비스 품질 향상', 'AI 법무 역량 확보'],
        tools: ['ChatGPT', 'Legal AI', 'Document Management', 'Case Law DB']
      }
    ],
    totalDuration: { basic: '28시간', advanced: '44시간', executive: '8시간' },
    roi: { productivity: '55% 향상', costSaving: '연간 4억원', timeReduction: '문서업무 65% 단축' }
  },

  // 12. 광고/마케팅 - AI CAMP 프로그램 기반
  advertising: {
    industryName: '광고/마케팅',
    industryCode: 'ADV',
    basic: [
      {
        title: '마케팅 트랙 - 입문과정 (12시간)',
        duration: '12시간',
        description: '"광고, 성과, 분석, 콘텐츠 생성 등 마케터의 숨을 달어드립니다"',
        objectives: [
          '마케팅 콘텐츠와 광고 데이터를 자동으로 처리할 수 있는 기초 역량 학보',
          '생성형 AI로 광고 문구/카피/요약을 자동 생성',
          'n8n을 활용한 성과 리포트 및 SNS 모니터링 자동화 경험'
        ],
        practicalExercises: [
          '성성형 AI 개요 - 마케팅 업무에서 GPT의 활용 성공 사례',
          '광고 문구 자동 생성 - 타겟/목표에 따른 광고 카피 자동 작성',
          '콘텐츠 요약 및 분석 - 긴 콘텐츠 → 짧은 카드 요약, 해시태그 생성',
          'n8n 기본 구조 및 실습 - n8n의 구조, 설정 준비 실습',
          '광고 성과 리포트 자동화 ① - Meta/Google Ads CSV → 요약 보고서 생성',
          '광고 성과 리포트 자동화 ② - 주요 지표 변화 감지 → 알림 발송 자동화',
          'SNS 댓글 수 집 분석 - 인스타/블로그 댓글 수집 → 요약 분석',
          '해시태그 마이닝 자동화 - 고객 리뷰/댓글 → GPT로 감성 감지',
          '콘텐츠 추천 자동 자동화 - 내 업무 품목에 맞춤 자동화 아이디어 창작',
          '실무 프로젝트 설계 - 설계 추천 + 네트워킹 자동화 구성',
          '실전 워크플로우 실습 - 콘텐츠/광고 자동화 솔루션 개발',
          '발표 및 피드백 - 구상한 발표 + 피드백 및 개선 논의'
        ],
        expectedOutcomes: [
          '마케팅 자동화 기초 역량 확보',
          'AI 기반 콘텐츠 생성 능력',
          'SNS 성과 분석 자동화',
          '실무 적용 가능한 워크플로우 구축'
        ],
        tools: ['ChatGPT', 'n8n', 'Meta Ads', 'Google Ads', 'Instagram API']
      }
    ],
    advanced: [
      {
        title: '마케팅 트랙 - 심화과정 (12시간)',
        duration: '12시간',
        description: '"성과, 분석, 광고 최적화, 고객 발굴, 콘솔까지 자동으로 됩니다"',
        objectives: [
          '광고/콘텐츠 성과 리포트, 고객 발굴 자동화를 위한 설계',
          '다양한 플랫폼과의 연동 실습',
          '팀 단위 마케팅 업무 자동화를 위한 설계 능력 강화'
        ],
        practicalExercises: [
          'n8n 고급 노드 및 연동 구조 - 반복 처리, 조건 분기, 복잡 연결 실습',
          'Google Ads API 연동 - 캠페인 데이터 자동 올리고 리',
          'Facebook/Meta Ads 성과 분석 - 일치 지표 → 요약 → 팀 공유 메시지 구성',
          'GPT를 활용한 카피 A/B 테스트 자동화 - 변형 카피 자동 생성 → 성과 추적',
          '댓글 및 피드백 감성 분석 - SNS/설문 텍스트 수집 → 감성 분류 자동',
          '주요 지표 기반 캠페인 알림 - 전환율/클릭률 급락 시 알림 전송',
          '콘텐츠 트렌드 리서치 자동화 - GPT를 이용한 키워드 및 해시태그 제안',
          '마케팅 대시보드 자동 연동 - 시각화 (GDS 등)과 연결해 성과 요약',
          '실전 실습 실제 실습 - 설계 추천 + 네트워킹 대시 자동화 구성',
          '프로젝트 발표 및 리뷰 - 업무 연결 자동화 발표 + 고정 피드백'
        ],
        expectedOutcomes: [
          '고급 마케팅 자동화 시스템 구축',
          '멀티플랫폼 연동 능력',
          '데이터 기반 의사결정 지원',
          '팀 단위 업무 효율성 극대화'
        ],
        tools: ['n8n Advanced', 'Google Ads API', 'Meta API', 'GPT-4', 'Google Data Studio']
      }
    ],
    executive: [
      {
        title: '경영진/임원 맞춤형 AI 교육 (3시간)',
        duration: '3시간',
        description: '"AI 강좌를 통해 최신 트렌드와 혁신 효과을 얻어보세요!"',
        objectives: [
          '생성형 AI 및 n8n 기반 자동화의 개념과 원리 이해',
          '부서별 AI 자동화 적용 사례 및 ROI 인사이트 학보',
          '조직 내 AI 전환을 위한 전략적 역할 인식'
        ],
        practicalExercises: [
          'AI & n8n 개요 및 글로벌 트렌드 - 생성형 AI 효과, n8n 소개, 글로벌 자동화 트렌드',
          '부서별 자동화 사례와 생산성 효과 - 마케팅, 영업, 인사 등 부서별 구체적 적용 사례',
          '경영진의 역할과 조직 도입 전략 - 조직 내 AI 활성 전략, 인력 재배치, 성공 조건 정리'
        ],
        expectedOutcomes: [
          'AI 자동화 전략적 이해',
          '부서별 적용 방안 수립',
          '조직 변화 리더십 확보'
        ],
        tools: ['AI Strategy Framework', 'ROI Calculator', 'Change Management Tools']
      }
    ],
    totalDuration: { basic: '12시간', advanced: '12시간', executive: '3시간' },
    roi: { productivity: '60% 향상', costSaving: '연간 3.5억원', timeReduction: '제작업무 65% 단축' }
  },

  // 13. 부동산
  realEstate: {
    industryName: '부동산',
    industryCode: 'RE',
    basic: [
      {
        title: '부동산업 AI 기초 및 시장 분석',
        duration: '10시간',
        description: 'AI 기반 부동산 가격 예측과 고객 매칭',
        objectives: ['가격 예측 모델', '고객 매칭', '시장 분석', '투자 분석'],
        practicalExercises: ['매물 가격 예측', '고객-매물 매칭', '시장 트렌드 분석', '투자 수익률 계산'],
        expectedOutcomes: ['가격 예측 정확도 85%', '매칭 성공률 60% 향상', '시장 분석 자동화', 'AI 부동산 역량 확보'],
        tools: ['ChatGPT', 'Real Estate APIs', 'Google Maps', 'Excel', 'Power BI']
      }
    ],
    totalDuration: { basic: '22시간', advanced: '38시간', executive: '6시간' },
    roi: { productivity: '35% 향상', costSaving: '연간 2억원', timeReduction: '시장분석 50% 단축' }
  },

  // 14. 미디어/콘텐츠
  media: {
    industryName: '미디어/콘텐츠',
    industryCode: 'MED',
    basic: [
      {
        title: '미디어업 AI 기초 및 콘텐츠 자동화',
        duration: '14시간',
        description: 'AI 기반 콘텐츠 제작과 편집 자동화',
        objectives: ['AI 콘텐츠 생성', '편집 자동화', '트렌드 분석', '개인화 추천'],
        practicalExercises: ['AI 기사 작성', '영상 자동 편집', '썸네일 생성', '콘텐츠 추천 시스템'],
        expectedOutcomes: ['제작 시간 60% 단축', '콘텐츠 품질 일관성 확보', '조회수 30% 증가', 'AI 미디어 역량 확보'],
        tools: ['ChatGPT', 'AI Video Tools', 'Canva', 'YouTube Analytics', 'Social Media APIs']
      }
    ],
    totalDuration: { basic: '26시간', advanced: '42시간', executive: '6시간' },
    roi: { productivity: '65% 향상', costSaving: '연간 2.5억원', timeReduction: '제작업무 60% 단축' }
  },

  // 15. 컨설팅
  consulting: {
    industryName: '컨설팅',
    industryCode: 'CON',
    basic: [
      {
        title: '컨설팅업 AI 기초 및 분석 자동화',
        duration: '16시간',
        description: 'AI 기반 데이터 분석과 인사이트 도출',
        objectives: ['데이터 분석 자동화', '인사이트 도출', '보고서 생성', '예측 모델링'],
        practicalExercises: ['시장 분석 자동화', 'AI 인사이트 도출', '보고서 템플릿 생성', '트렌드 예측 모델'],
        expectedOutcomes: ['분석 시간 70% 단축', '인사이트 품질 향상', '보고서 일관성 확보', 'AI 컨설팅 역량 확보'],
        tools: ['ChatGPT', 'Python', 'Tableau', 'Power BI', 'Statistical Tools']
      }
    ],
    totalDuration: { basic: '28시간', advanced: '44시간', executive: '8시간' },
    roi: { productivity: '75% 향상', costSaving: '연간 5억원', timeReduction: '분석업무 70% 단축' }
  },

  // 16. 화학업
  chemical: {
    industryName: '화학업',
    industryCode: 'CHM',
    basic: [
      {
        title: '화학업 AI 기초 및 공정 최적화',
        duration: '12시간',
        description: 'AI 기반 화학 공정 최적화와 품질 관리',
        objectives: ['공정 최적화', '품질 예측', '안전 관리', '환경 모니터링'],
        practicalExercises: ['반응 조건 최적화', '품질 예측 모델', '안전 위험 평가', '배출량 모니터링'],
        expectedOutcomes: ['공정 효율성 25% 향상', '품질 일관성 확보', '안전사고 80% 감소', 'AI 화학 역량 확보'],
        tools: ['ChatGPT', 'Process Simulation', 'SCADA', 'Environmental APIs']
      }
    ],
    totalDuration: { basic: '26시간', advanced: '42시간', executive: '8시간' },
    roi: { productivity: '40% 향상', costSaving: '연간 6억원', timeReduction: '공정관리 45% 효율화' }
  },

  // 17. 통신업
  telecom: {
    industryName: '통신업',
    industryCode: 'TEL',
    basic: [
      {
        title: '통신업 AI 기초 및 네트워크 최적화',
        duration: '14시간',
        description: 'AI 기반 네트워크 관리와 고객 서비스',
        objectives: ['네트워크 최적화', '장애 예측', '고객 이탈 방지', '서비스 개인화'],
        practicalExercises: ['트래픽 패턴 분석', '장애 예측 모델', '고객 세분화', '맞춤 서비스 추천'],
        expectedOutcomes: ['네트워크 효율성 30% 향상', '장애 예방률 90%', '고객 이탈률 40% 감소', 'AI 통신 역량 확보'],
        tools: ['ChatGPT', 'Network Monitoring', 'Customer Analytics', 'Predictive Models']
      }
    ],
    totalDuration: { basic: '26시간', advanced: '44시간', executive: '8시간' },
    roi: { productivity: '50% 향상', costSaving: '연간 8억원', timeReduction: '운영업무 55% 효율화' }
  },

  // 18. 자동차업
  automotive: {
    industryName: '자동차업',
    industryCode: 'AUTO',
    basic: [
      {
        title: '자동차업 AI 기초 및 스마트 제조',
        duration: '12시간',
        description: 'AI 기반 자동차 제조와 품질 관리',
        objectives: ['스마트 제조', '품질 검사', '공급망 관리', '예측 정비'],
        practicalExercises: ['생산 라인 최적화', 'AI 품질 검사', '부품 수급 예측', '설비 예측 정비'],
        expectedOutcomes: ['생산 효율성 35% 향상', '품질 불량률 60% 감소', '공급망 안정성 확보', 'AI 제조 역량 확보'],
        tools: ['ChatGPT', 'Computer Vision', 'IoT', 'Supply Chain Analytics']
      }
    ],
    totalDuration: { basic: '28시간', advanced: '44시간', executive: '8시간' },
    roi: { productivity: '45% 향상', costSaving: '연간 10억원', timeReduction: '품질검사 70% 자동화' }
  },

  // 19. 항공업
  aviation: {
    industryName: '항공업',
    industryCode: 'AVI',
    basic: [
      {
        title: '항공업 AI 기초 및 운항 최적화',
        duration: '16시간',
        description: 'AI 기반 항공 운항 관리와 승객 서비스',
        objectives: ['운항 최적화', '연료 효율성', '승객 서비스', '안전 관리'],
        practicalExercises: ['항로 최적화', '연료 소모 예측', '승객 만족도 분석', '안전 위험 평가'],
        expectedOutcomes: ['운항 효율성 20% 향상', '연료비 15% 절감', '승객 만족도 30% 증가', 'AI 항공 역량 확보'],
        tools: ['ChatGPT', 'Flight Planning', 'Weather APIs', 'Customer Analytics']
      }
    ],
    totalDuration: { basic: '30시간', advanced: '46시간', executive: '8시간' },
    roi: { productivity: '35% 향상', costSaving: '연간 15억원', timeReduction: '운항관리 40% 효율화' }
  },

  // 20. 에너지업
  energy: {
    industryName: '에너지업',
    industryCode: 'ENR',
    basic: [
      {
        title: '에너지업 AI 기초 및 스마트그리드',
        duration: '14시간',
        description: 'AI 기반 에너지 관리와 신재생 에너지',
        objectives: ['스마트그리드', '수요 예측', '에너지 효율', '탄소 관리'],
        practicalExercises: ['에너지 수요 예측', '발전량 최적화', '에너지 효율 분석', '탄소 배출 모니터링'],
        expectedOutcomes: ['에너지 효율성 40% 향상', '수요 예측 정확도 90%', '탄소 배출 30% 감소', 'AI 에너지 역량 확보'],
        tools: ['ChatGPT', 'Smart Grid', 'IoT Sensors', 'Environmental APIs']
      }
    ],
    totalDuration: { basic: '28시간', advanced: '44시간', executive: '8시간' },
    roi: { productivity: '50% 향상', costSaving: '연간 12억원', timeReduction: '에너지관리 60% 자동화' }
  },

  // 21. 보험업
  insurance: {
    industryName: '보험업',
    industryCode: 'INS',
    basic: [
      {
        title: '보험업 AI 기초 및 리스크 평가',
        duration: '14시간',
        description: 'AI 기반 보험 상품 개발과 리스크 관리',
        objectives: ['리스크 평가', '사기 탐지', '상품 개발', '고객 분석'],
        practicalExercises: ['리스크 모델링', '사기 패턴 분석', '맞춤 상품 설계', '고객 세분화'],
        expectedOutcomes: ['리스크 평가 정확도 85%', '사기 탐지율 95%', '상품 개발 시간 50% 단축', 'AI 보험 역량 확보'],
        tools: ['ChatGPT', 'Actuarial Software', 'Fraud Detection', 'Customer Analytics']
      }
    ],
    totalDuration: { basic: '26시간', advanced: '42시간', executive: '8시간' },
    roi: { productivity: '45% 향상', costSaving: '연간 7억원', timeReduction: '심사업무 60% 단축' }
  },

  // 22. 바이오/제약
  biotech: {
    industryName: '바이오/제약',
    industryCode: 'BIO',
    basic: [
      {
        title: '바이오업 AI 기초 및 신약 개발',
        duration: '16시간',
        description: 'AI 기반 신약 개발과 임상시험 최적화',
        objectives: ['신약 발견', '임상시험 설계', '품질 관리', '규제 준수'],
        practicalExercises: ['분자 설계 AI', '임상 데이터 분석', '품질 예측 모델', '규제 문서 자동화'],
        expectedOutcomes: ['신약 개발 시간 30% 단축', '임상시험 성공률 25% 향상', '품질 일관성 확보', 'AI 바이오 역량 확보'],
        tools: ['ChatGPT', 'Drug Discovery AI', 'Clinical Analytics', 'Regulatory Tools']
      }
    ],
    totalDuration: { basic: '30시간', advanced: '46시간', executive: '8시간' },
    roi: { productivity: '40% 향상', costSaving: '연간 20억원', timeReduction: '연구개발 35% 효율화' }
  },

  // 23. 게임업
  gaming: {
    industryName: '게임업',
    industryCode: 'GAM',
    basic: [
      {
        title: '게임업 AI 기초 및 콘텐츠 생성',
        duration: '12시간',
        description: 'AI 기반 게임 콘텐츠 생성과 플레이어 분석',
        objectives: ['콘텐츠 생성', '플레이어 분석', '게임 밸런싱', '개인화'],
        practicalExercises: ['AI 캐릭터 생성', '플레이어 행동 분석', '게임 난이도 조절', '맞춤 콘텐츠 추천'],
        expectedOutcomes: ['콘텐츠 제작 70% 단축', '플레이어 유지율 40% 향상', '게임 밸런스 최적화', 'AI 게임 역량 확보'],
        tools: ['ChatGPT', 'Game Analytics', 'Procedural Generation', 'Player Behavior']
      }
    ],
    totalDuration: { basic: '24시간', advanced: '40시간', executive: '6시간' },
    roi: { productivity: '80% 향상', costSaving: '연간 3억원', timeReduction: '개발시간 50% 단축' }
  },

  // 24. 패션업
  fashion: {
    industryName: '패션업',
    industryCode: 'FSH',
    basic: [
      {
        title: '패션업 AI 기초 및 트렌드 예측',
        duration: '10시간',
        description: 'AI 기반 패션 트렌드 예측과 개인화 추천',
        objectives: ['트렌드 예측', '개인화 추천', '재고 최적화', '디자인 생성'],
        practicalExercises: ['트렌드 분석 AI', '스타일 추천 시스템', '수요 예측 모델', 'AI 디자인 생성'],
        expectedOutcomes: ['트렌드 예측 정확도 80%', '판매율 25% 향상', '재고 회전율 50% 개선', 'AI 패션 역량 확보'],
        tools: ['ChatGPT', 'Fashion AI', 'Trend Analytics', 'Design Tools']
      }
    ],
    totalDuration: { basic: '22시간', advanced: '38시간', executive: '6시간' },
    roi: { productivity: '60% 향상', costSaving: '연간 2억원', timeReduction: '기획업무 55% 단축' }
  },

  // 25. 전문서비스
  professional: {
    industryName: '전문서비스',
    industryCode: 'PRO',
    basic: [
      {
        title: '전문서비스 AI 기초 및 업무 자동화',
        duration: '12시간',
        description: '전문서비스 업무 효율화를 위한 AI 도구 활용',
        objectives: ['AI 도구 활용법', '문서 자동화', '고객 관리', '업무 프로세스 최적화'],
        practicalExercises: ['제안서 AI 작성', '계약서 검토 자동화', '고객 상담 챗봇', '프로젝트 관리 시스템'],
        expectedOutcomes: ['업무 효율성 40% 향상', '문서 작성 시간 60% 단축', '고객 만족도 30% 증가', 'AI 전문서비스 역량 확보'],
        tools: ['ChatGPT', 'Claude', 'Google Workspace', 'Notion']
      },
      {
        title: 'n8n 전문서비스 워크플로우 자동화',
        duration: '16시간',
        description: '고객 관리, 프로젝트 관리, 청구 시스템 자동화',
        objectives: ['고객 관리 자동화', '프로젝트 진행 추적', '청구서 자동 발송', '성과 보고 자동화'],
        practicalExercises: ['CRM 자동화', '프로젝트 상태 업데이트', '자동 청구 시스템', '성과 대시보드'],
        expectedOutcomes: ['고객 관리 효율성 50% 향상', '프로젝트 지연 80% 감소', '청구 오류 90% 감소', '보고 시간 70% 단축'],
        tools: ['n8n', 'CRM API', 'Slack', 'Email', 'Google Calendar']
      }
    ],
    advanced: [
      {
        title: '고급 AI 컨설팅 도구 활용',
        duration: '20시간',
        description: '전문 컨설팅을 위한 고급 AI 분석 도구',
        objectives: ['데이터 분석 AI', '예측 모델링', '전략 수립 AI', '리포트 자동 생성'],
        practicalExercises: ['시장 분석 AI', '경쟁사 분석 자동화', '전략 시뮬레이션', '자동 리포트 생성'],
        expectedOutcomes: ['분석 정확도 85% 향상', '컨설팅 품질 40% 개선', '리포트 작성 시간 75% 단축', '고급 AI 컨설팅 역량'],
        tools: ['Advanced Analytics', 'Machine Learning', 'Business Intelligence', 'Automation Tools']
      }
    ],
    executive: [
      {
        title: '전문서비스 AI 전략 수립',
        duration: '8시간',
        description: '전문서비스 기업의 AI 도입 전략과 디지털 전환',
        objectives: ['AI 전략 수립', '디지털 전환 로드맵', 'ROI 분석', '조직 변화 관리'],
        practicalExercises: ['AI 도입 계획', '투자 수익률 계산', '조직 개편 방안', '경쟁 우위 전략'],
        expectedOutcomes: ['전략적 AI 활용', '경쟁 우위 확보', '조직 효율성 극대화', '미래 성장 동력 확보'],
        tools: ['Strategic Planning', 'ROI Calculator', 'Change Management', 'Leadership Tools']
      }
    ],
    totalDuration: { basic: '28시간', advanced: '20시간', executive: '8시간' },
    roi: { productivity: '45% 향상', costSaving: '연간 1.8억원', timeReduction: '업무시간 50% 단축' }
  },

  // 26. 이커머스
  ecommerce: {
    industryName: '이커머스',
    industryCode: 'ECM',
    basic: [
      {
        title: '이커머스 AI 기초 및 개인화 추천',
        duration: '14시간',
        description: 'AI 기반 상품 추천과 고객 개인화 서비스',
        objectives: ['추천 시스템 이해', '개인화 마케팅', '고객 행동 분석', 'AI 챗봇 활용'],
        practicalExercises: ['상품 추천 AI', '개인화 이메일', '고객 세분화', '쇼핑 챗봇 구축'],
        expectedOutcomes: ['매출 전환율 35% 향상', '고객 만족도 40% 증가', 'AI 이커머스 역량 확보', '개인화 서비스 구현'],
        tools: ['ChatGPT', 'Google Analytics', 'Recommendation Engine', 'Customer Data Platform']
      },
      {
        title: 'n8n 이커머스 운영 자동화',
        duration: '18시간',
        description: '주문처리, 재고관리, 고객서비스 자동화 시스템',
        objectives: ['주문 처리 자동화', '재고 관리 시스템', '고객 서비스 자동화', '마케팅 자동화'],
        practicalExercises: ['주문-배송 연동', '재고 알림 시스템', '고객 문의 자동 응답', '이메일 마케팅 자동화'],
        expectedOutcomes: ['운영 효율성 60% 향상', '고객 응답 시간 80% 단축', '재고 최적화 달성', '마케팅 ROI 50% 증가'],
        tools: ['n8n', 'E-commerce API', 'Email Marketing', 'Customer Service Tools', 'Inventory Management']
      }
    ],
    advanced: [
      {
        title: '고급 이커머스 AI 분석',
        duration: '24시간',
        description: '고급 데이터 분석과 예측 모델링을 통한 비즈니스 최적화',
        objectives: ['고급 데이터 분석', '수요 예측', '가격 최적화', '고객 생애가치 분석'],
        practicalExercises: ['매출 예측 모델', '동적 가격 책정', 'CLV 분석', 'A/B 테스트 자동화'],
        expectedOutcomes: ['예측 정확도 90% 달성', '수익성 30% 개선', '고객 유지율 25% 향상', '데이터 기반 의사결정'],
        tools: ['Advanced Analytics', 'Machine Learning', 'A/B Testing', 'Predictive Modeling']
      }
    ],
    executive: [
      {
        title: '이커머스 AI 전략 및 디지털 전환',
        duration: '6시간',
        description: '이커머스 기업의 AI 전략과 옴니채널 구축',
        objectives: ['AI 전략 수립', '옴니채널 구축', '디지털 마케팅', '글로벌 확장'],
        practicalExercises: ['AI 로드맵 작성', '채널 통합 전략', '마케팅 전략 수립', '확장 계획'],
        expectedOutcomes: ['전략적 AI 도입', '통합 고객 경험', '시장 점유율 확대', '글로벌 경쟁력 확보'],
        tools: ['Strategic Planning', 'Omnichannel Platform', 'Marketing Automation', 'Global Expansion Tools']
      }
    ],
    totalDuration: { basic: '32시간', advanced: '24시간', executive: '6시간' },
    roi: { productivity: '55% 향상', costSaving: '연간 2.5억원', timeReduction: '운영업무 65% 자동화' }
  },

  // 27. 인증관리
  certification: {
    industryName: '인증관리',
    industryCode: 'CRT',
    basic: [
      {
        title: '인증관리 AI 기초 및 품질 시스템',
        duration: '12시간',
        description: 'AI 기반 품질 관리와 인증 프로세스 최적화',
        objectives: ['품질 관리 AI', '인증 프로세스 이해', '문서 관리 자동화', '컴플라이언스 관리'],
        practicalExercises: ['품질 체크리스트 AI', '인증 문서 자동 생성', '컴플라이언스 모니터링', '감사 준비 자동화'],
        expectedOutcomes: ['품질 관리 효율성 45% 향상', '인증 준비 시간 50% 단축', '문서 오류 90% 감소', 'AI 품질관리 역량'],
        tools: ['ChatGPT', 'Quality Management System', 'Document Management', 'Compliance Tools']
      },
      {
        title: 'n8n 인증 워크플로우 자동화',
        duration: '16시간',
        description: '인증 신청, 심사, 발급 프로세스 자동화',
        objectives: ['인증 신청 자동화', '심사 일정 관리', '문서 승인 프로세스', '인증서 발급 자동화'],
        practicalExercises: ['신청서 자동 처리', '심사 일정 조율', '승인 워크플로우', '인증서 자동 발급'],
        expectedOutcomes: ['처리 시간 60% 단축', '프로세스 표준화 달성', '고객 만족도 35% 향상', '운영 효율성 극대화'],
        tools: ['n8n', 'Workflow Management', 'Document Approval', 'Certificate Generation', 'CRM Integration']
      }
    ],
    advanced: [
      {
        title: '고급 품질 예측 및 리스크 관리',
        duration: '20시간',
        description: 'AI 기반 품질 예측과 리스크 사전 관리 시스템',
        objectives: ['품질 예측 모델', '리스크 분석', '예방 관리', '지속적 개선'],
        practicalExercises: ['품질 예측 AI', '리스크 매트릭스', '예방조치 시스템', '개선 제안 자동화'],
        expectedOutcomes: ['품질 사고 80% 예방', '리스크 관리 체계 구축', '지속적 개선 문화', '예측 정확도 85%'],
        tools: ['Predictive Analytics', 'Risk Management', 'Quality Prediction', 'Continuous Improvement']
      }
    ],
    executive: [
      {
        title: '인증관리 디지털 전환 전략',
        duration: '8시간',
        description: '인증 기관의 디지털 전환과 AI 도입 전략',
        objectives: ['디지털 전환 전략', 'AI 도입 로드맵', '경쟁 우위 확보', '미래 인증 서비스'],
        practicalExercises: ['전환 계획 수립', 'AI 투자 계획', '서비스 혁신 방안', '시장 확장 전략'],
        expectedOutcomes: ['디지털 리더십 확보', '서비스 혁신 달성', '시장 경쟁력 강화', '미래 성장 기반 구축'],
        tools: ['Digital Strategy', 'AI Planning', 'Innovation Management', 'Market Analysis']
      }
    ],
    totalDuration: { basic: '28시간', advanced: '20시간', executive: '8시간' },
    roi: { productivity: '50% 향상', costSaving: '연간 1.5억원', timeReduction: '인증업무 55% 자동화' }
  },

  // 28. 투자
  investment: {
    industryName: '투자',
    industryCode: 'INV',
    basic: [
      {
        title: '투자 AI 기초 및 포트폴리오 관리',
        duration: '16시간',
        description: 'AI 기반 투자 분석과 포트폴리오 최적화',
        objectives: ['투자 AI 이해', '시장 분석', '포트폴리오 최적화', '리스크 관리'],
        practicalExercises: ['시장 분석 AI', '투자 전략 수립', '포트폴리오 구성', '리스크 측정'],
        expectedOutcomes: ['투자 수익률 25% 향상', '리스크 관리 체계 구축', 'AI 투자 역량 확보', '의사결정 정확도 향상'],
        tools: ['ChatGPT', 'Financial Analysis', 'Portfolio Management', 'Risk Assessment']
      },
      {
        title: 'n8n 투자 운영 자동화',
        duration: '18시간',
        description: '투자 모니터링, 리포팅, 고객 관리 자동화',
        objectives: ['투자 모니터링 자동화', '자동 리포팅', '고객 소통 자동화', '컴플라이언스 관리'],
        practicalExercises: ['실시간 모니터링', '자동 투자 리포트', '고객 알림 시스템', '규제 준수 체크'],
        expectedOutcomes: ['모니터링 효율성 70% 향상', '리포팅 시간 80% 단축', '고객 만족도 40% 증가', '컴플라이언스 100% 준수'],
        tools: ['n8n', 'Market Data API', 'Reporting Tools', 'Customer Communication', 'Compliance Systems']
      }
    ],
    advanced: [
      {
        title: '고급 투자 AI 및 알고리즘 트레이딩',
        duration: '28시간',
        description: '머신러닝 기반 투자 전략과 자동화 트레이딩 시스템',
        objectives: ['머신러닝 투자 모델', '알고리즘 트레이딩', '대체투자 분석', '고급 리스크 관리'],
        practicalExercises: ['예측 모델 구축', '트레이딩 봇 개발', 'ESG 투자 분석', '포트폴리오 최적화'],
        expectedOutcomes: ['투자 성과 35% 향상', '거래 효율성 극대화', '신규 투자 기회 발굴', '고급 AI 투자 전문성'],
        tools: ['Machine Learning', 'Algorithmic Trading', 'Alternative Data', 'Advanced Analytics']
      }
    ],
    executive: [
      {
        title: '투자 AI 전략 및 디지털 자산관리',
        duration: '10시간',
        description: '투자 회사의 AI 전략과 디지털 자산관리 체계 구축',
        objectives: ['AI 투자 전략', '디지털 자산관리', '핀테크 혁신', '글로벌 투자'],
        practicalExercises: ['AI 전략 수립', '디지털 플랫폼 구축', '혁신 서비스 기획', '글로벌 확장 계획'],
        expectedOutcomes: ['전략적 AI 도입', '디지털 혁신 달성', '시장 리더십 확보', '글로벌 경쟁력 강화'],
        tools: ['Investment Strategy', 'Digital Platform', 'Fintech Innovation', 'Global Investment']
      }
    ],
    totalDuration: { basic: '34시간', advanced: '28시간', executive: '10시간' },
    roi: { productivity: '60% 향상', costSaving: '연간 3억원', timeReduction: '투자분석 70% 자동화' }
  },

  // 29. 교육에듀테크
  edutech: {
    industryName: '교육에듀테크',
    industryCode: 'EDU',
    basic: [
      {
        title: '에듀테크 AI 기초 및 개인화 학습',
        duration: '14시간',
        description: 'AI 기반 개인화 학습과 교육 콘텐츠 최적화',
        objectives: ['개인화 학습 이해', 'AI 콘텐츠 생성', '학습 분석', '적응형 교육'],
        practicalExercises: ['개인화 커리큘럼', 'AI 교육 콘텐츠', '학습 진도 분석', '맞춤형 피드백'],
        expectedOutcomes: ['학습 효과 40% 향상', '교육 만족도 35% 증가', 'AI 교육 역량 확보', '개인화 교육 구현'],
        tools: ['ChatGPT', 'Learning Management System', 'Content Generation', 'Learning Analytics']
      },
      {
        title: 'n8n 교육 운영 자동화',
        duration: '16시간',
        description: '학생 관리, 수업 운영, 평가 시스템 자동화',
        objectives: ['학생 관리 자동화', '수업 일정 관리', '자동 평가 시스템', '학부모 소통 자동화'],
        practicalExercises: ['출석 관리 시스템', '과제 자동 배포', '성적 처리 자동화', '알림 시스템 구축'],
        expectedOutcomes: ['행정 업무 60% 감소', '교육 품질 30% 향상', '학부모 만족도 증가', '운영 효율성 극대화'],
        tools: ['n8n', 'LMS Integration', 'Student Information System', 'Communication Tools', 'Assessment Automation']
      }
    ],
    advanced: [
      {
        title: '고급 AI 교육 분석 및 예측',
        duration: '22시간',
        description: '학습 데이터 분석과 교육 성과 예측 시스템',
        objectives: ['학습 데이터 분석', '성과 예측 모델', '교육 효과 측정', '지능형 튜터링'],
        practicalExercises: ['학습 패턴 분석', '성과 예측 AI', '교육 효과 분석', 'AI 튜터 개발'],
        expectedOutcomes: ['예측 정확도 85% 달성', '교육 효과 50% 향상', '개인화 정도 극대화', '지능형 교육 시스템'],
        tools: ['Advanced Analytics', 'Predictive Modeling', 'Educational Data Mining', 'AI Tutoring']
      }
    ],
    executive: [
      {
        title: '에듀테크 AI 전략 및 교육 혁신',
        duration: '8시간',
        description: '교육 기관의 AI 전략과 디지털 교육 혁신',
        objectives: ['교육 AI 전략', '디지털 전환', '교육 혁신', '미래 교육 모델'],
        practicalExercises: ['AI 교육 전략', '디지털 캠퍼스', '혁신 교육 모델', '글로벌 교육 확장'],
        expectedOutcomes: ['교육 혁신 달성', '디지털 리더십', '경쟁 우위 확보', '미래 교육 선도'],
        tools: ['Education Strategy', 'Digital Transformation', 'Innovation Management', 'Future Education']
      }
    ],
    totalDuration: { basic: '30시간', advanced: '22시간', executive: '8시간' },
    roi: { productivity: '50% 향상', costSaving: '연간 2억원', timeReduction: '교육운영 55% 자동화' }
  },

  // 영업 트랙 - AI CAMP 프로그램 기반
  sales: {
    industryName: '영업',
    industryCode: 'SALES',
    basic: [
      {
        title: '영업 트랙 - 입문과정 (12시간)',
        duration: '12시간',
        description: '"고객 응대, 제안서, 리포트... 어떤 AI가 도와드립니다!"',
        objectives: [
          '영업 현장의 반복 업무를 자동화할 수 있는 기본 역량 학보',
          '제안서 작성, 고객 응대 메시지 생성 등 GPT 활용 의하기',
          'n8n을 이용한 일정/리포트 자동화 실습'
        ],
        practicalExercises: [
          '생성형 AI 이해 - GPT를 영업 업무에서 적용하는 방법',
          '영업 프로포즈 작성 실습 - 고객 유형별 제안서 제작 실습',
          '응대 메시지 자동화 - 텍스트를 GPT로 종류별 자동 생성',
          'n8n 구조와 기본 노드 실습 - Trigger-Action 구조 이해와 실물 미크업볼 설계',
          '영업 성과 리포트 자동화 - Google Sheet → 조건 → GPT 종합 요약 구성',
          '미팅 일정 자동화 - 일정 조건 → 고객/관리자 알림 자동 전송',
          '비용 제안서 리포트 자동화 - 웹훅을 통한 자동 리포트 생성',
          '지출 정산 문서 자동화 - 제품/서비스별 영업비 정산 문서 자동 생성',
          '자동화 설계 실습 - 각자의 업무 상황 기반 올룸 설계 실습',
          '실전 자동화 실행 - 실제 분야 기반 자동화 솔루션 구성',
          '실습 구성 실행 - 나만의 n8n 워크플로우 직접 구성',
          '발표 및 피드백 - 실습 결과 공유 및 개선 방향 논의'
        ],
        expectedOutcomes: [
          '영업 자동화 기초 역량 확보',
          'AI 기반 제안서 작성 능력',
          '고객 응대 효율성 향상',
          '영업 성과 리포트 자동화'
        ],
        tools: ['ChatGPT', 'n8n', 'Google Sheets', 'CRM Systems', 'Email Automation']
      }
    ],
    advanced: [
      {
        title: '영업 트랙 - 심화과정 (12시간)',
        duration: '12시간',
        description: '"밝은형 제안, 다어형 참가, 설득 리포트까지... 자동화됩니다."',
        objectives: [
          '고객 응대, 제안, 리포트 등 전반적인 영업 업무 자동화 설계',
          '외부 고객정보/실적 연동 자동화 구현',
          'GPT를 이용한 맞춤형 메시지, 제안서 자동 생성 실무화'
        ],
        practicalExercises: [
          'n8n 고급 노드 실화 - 분기 조건, 반복 처리, 다중 데이터 처리',
          '고객 정보 자동 수집 - Open API/RSS → 요약 → 전송',
          '제안서 자동 생성 - 고객 정보 입력 → GPT → PDF 출력',
          '영업 KPI 리포트 자동화 - 실적 Sheet → 요약 → 공유보고서 생성',
          'CRM 연동 기본 (에서 기반) - CRM 데이터 → 리포트/알림 연동',
          '슬랙/카카오톡 맞춤 일림 자동화 - 고객 반응 기반 맞춤 알림 전송',
          'Notion + GPT 전략 문서 자동화 - 정책 조건 자동 → 저장 시스템 설계',
          '전략 워크플로우 텔플릿 구성 - 학습 가능한 자동화 구조 설계',
          '종합 실습 실제 실습 - 각자의 업무 기반 자동화 설계 실습',
          '프로젝트 발표 및 코칭 - 시스템 발표 + 개선 피드백 제공'
        ],
        expectedOutcomes: [
          '고급 영업 자동화 시스템 구축',
          'CRM 통합 자동화 능력',
          '데이터 기반 영업 전략 수립',
          '맞춤형 고객 관리 시스템'
        ],
        tools: ['n8n Advanced', 'CRM APIs', 'GPT-4', 'Notion', 'Slack/KakaoTalk APIs']
      }
    ],
    executive: [
      {
        title: '경영진/임원 맞춤형 AI 교육 (3시간)',
        duration: '3시간',
        description: '"AI 강좌를 통해 최신 트렌드와 혁신 효과을 얻어보세요!"',
        objectives: [
          '생성형 AI 및 n8n 기반 자동화의 개념과 원리 이해',
          '부서별 AI 자동화 적용 사례 및 ROI 인사이트 학보',
          '조직 내 AI 전환을 위한 전략적 역할 인식'
        ],
        practicalExercises: [
          'AI & n8n 개요 및 글로벌 트렌드 - 생성형 AI 효과, n8n 소개, 글로벌 자동화 트렌드',
          '부서별 자동화 사례와 생산성 효과 - 마케팅, 영업, 인사 등 부서별 구체적 적용 사례',
          '경영진의 역할과 조직 도입 전략 - 조직 내 AI 활성 전략, 인력 재배치, 성공 조건 정리'
        ],
        expectedOutcomes: [
          'AI 자동화 전략적 이해',
          '부서별 적용 방안 수립',
          '조직 변화 리더십 확보'
        ],
        tools: ['AI Strategy Framework', 'ROI Calculator', 'Change Management Tools']
      }
    ],
    totalDuration: { basic: '12시간', advanced: '12시간', executive: '3시간' },
    roi: { productivity: '65% 향상', costSaving: '연간 4억원', timeReduction: '영업업무 70% 자동화' }
  },

  // 고객지원(CS) 트랙 - AI CAMP 프로그램 기반
  customerService: {
    industryName: '고객지원(CS)',
    industryCode: 'CS',
    basic: [
      {
        title: '고객지원(CS) 트랙 (12시간)',
        duration: '12시간',
        description: '"FAQ 응답, 민원 요약, 반복 응답까지 자동으로 해결됩니다!"',
        objectives: [
          '반복 응대, 민원 처리, 보고 업무를 자동화할 수 있는 기초 능력 습득',
          'ChatGPT를 활용한 응답 메시지 작성법 이해',
          'n8n을 통한 자동화 흐름을 실습 경험 확보'
        ],
        practicalExercises: [
          '생성형 AI 기초 이해 - 고객 응대에서 특화된 GPT 활용 사례 이해',
          '응답 메시지 자동 실습 - 고객 질문 → GPT 답변 → 팀 공유 실습',
          '민원 요약 자동화 - 긴 텍스트 → 요약 → 정리 자동 실습',
          'n8n 기본 실습 - n8n의 노드, 설정 준비 이해',
          '다채널 고객문의 통합 자동화 - 이메일/카카오톡 등 멀티 채널 대응',
          '반복 민원 유형 피드백 분석 - 카테고리 분석 → 클러스터링 자동화',
          '리포트 자동 요약 시스템 - VOC 데이터 → GPT 요약 → PDF 보고서 생성',
          'Slack/메일 자동 보고 - 주간 VOC 요약 → 보고서 자동 전송',
          '실전 설계 실제 실습 - 각자의 응답 기반 자동화 설계 실습',
          '발표 및 피드백 - 업무 연결 자동화 발표 + 개선 피드백 제공'
        ],
        expectedOutcomes: [
          '고객 응대 자동화 기초 역량',
          'AI 기반 응답 생성 능력',
          'VOC 분석 및 보고서 자동화',
          '멀티채널 고객 관리 시스템'
        ],
        tools: ['ChatGPT', 'n8n', 'KakaoTalk API', 'Slack', 'Google Sheets']
      }
    ],
    advanced: [
      {
        title: '고객지원(CS) 트랙 - 심화과정 (12시간)',
        duration: '12시간',
        description: '"응대 품질 모니터링부터 보고서까지 자동으로 처리됩니다"',
        objectives: [
          '고객 응대 데이터 분석, 응답 품질 평가, 피드백 시스템 자동화 역량 학보',
          '다중 채널 통합 응대 및 텍스트 분석 고도화',
          'VOC 데이터부터 리포트까지 전체 설계 역량 기능'
        ],
        practicalExercises: [
          'n8n 고급 노드 실화 - 조건 분기, Loop, 형태, 오류 처리 등 실습',
          '다채널 고객문의 통합 자동화 - 이메일/카카오톡 등 멀티 채널 대응',
          '고객별 감성 분석 자동화 - GPT + 감성분석 API 연계 실습',
          '응답 품질 평가 시스템 설계 - GPT를 통한 응답 품질 자동 체크 구성',
          '고객 응대 측정 메시지 - 서울 피드백 수집 및 통계 요약 자동화',
          '반복 민원 유형 피드백 분석 - 카테고리 분석 → 클러스터링 자동화',
          '리포트 자동 요약 시스템 - VOC 데이터 → GPT 요약 → PDF 보고서 생성',
          'Slack/메일 자동 보고 - 주간 VOC 요약 → 보고서 자동 전송',
          '실전 설계 실제 실습 - 각자의 응답 기반 자동화 설계 실습',
          '발표 및 피드백 - 업무 연결 자동화 발표 + 개선 피드백 제공'
        ],
        expectedOutcomes: [
          '고급 고객 서비스 자동화 시스템',
          '감성 분석 기반 응대 품질 관리',
          'VOC 데이터 종합 분석 능력',
          '전체 CS 프로세스 자동화'
        ],
        tools: ['n8n Advanced', 'Sentiment Analysis API', 'Multi-channel Integration', 'Advanced Analytics', 'Report Generation']
      }
    ],
    executive: [
      {
        title: '경영진/임원 맞춤형 AI 교육 (3시간)',
        duration: '3시간',
        description: '"AI 강좌를 통해 최신 트렌드와 혁신 효과을 얻어보세요!"',
        objectives: [
          '생성형 AI 및 n8n 기반 자동화의 개념과 원리 이해',
          '부서별 AI 자동화 적용 사례 및 ROI 인사이트 학보',
          '조직 내 AI 전환을 위한 전략적 역할 인식'
        ],
        practicalExercises: [
          'AI & n8n 개요 및 글로벌 트렌드 - 생성형 AI 효과, n8n 소개, 글로벌 자동화 트렌드',
          '부서별 자동화 사례와 생산성 효과 - 마케팅, 영업, 인사 등 부서별 구체적 적용 사례',
          '경영진의 역할과 조직 도입 전략 - 조직 내 AI 활성 전략, 인력 재배치, 성공 조건 정리'
        ],
        expectedOutcomes: [
          'AI 자동화 전략적 이해',
          '부서별 적용 방안 수립',
          '조직 변화 리더십 확보'
        ],
        tools: ['AI Strategy Framework', 'ROI Calculator', 'Change Management Tools']
      }
    ],
    totalDuration: { basic: '12시간', advanced: '12시간', executive: '3시간' },
    roi: { productivity: '70% 향상', costSaving: '연간 3억원', timeReduction: 'CS업무 75% 자동화' }
  },

  // 인사/총무 트랙 - AI CAMP 프로그램 기반
  hr: {
    industryName: '인사/총무',
    industryCode: 'HR',
    basic: [
      {
        title: '인사/총무 트랙 (12시간)',
        duration: '12시간',
        description: '"채용, 온보딩, 비무 지치까지 모두 자동으로 합니다"',
        objectives: [
          '채용/임사 관리 문서 요약 및 자동화',
          '온보딩, 휴가-사내 공지 등 일반 자동화 설계',
          '피드백 수집 및 내부 문서 작성 자동화 실습'
        ],
        practicalExercises: [
          'AI 개요 및 적용 포인트 - 생성형 AI를 HR에 활용하는 종류 이해',
          '이력서 요약 자동화 실습 - 텍스트 이력서 → 요약 → 평가 요약 정리',
          '채용 공고 자동 작성 - 업무 정보 → 생성형 AI 공고 조건 작성',
          'n8n 실습 - 기본 노드 이해 및 트리거 구성',
          '임사자 온보딩 자동화 - 구글 시트 → 연락 → 안내 메일 전송',
          '입퇴사 프로세스 통합 자동화 - 인사 안내 → 장비 요청 → 라이브 전송 자동화',
          '내부 댓글 세분 조율 - FAQ 기반 Q&A 자동화 / 조직 문화 구축',
          'HR 지표 자동 리포트 - 절말 입사 지표 → 시각화 → 보고서 구성',
          '실전 업무 자동화 설계 - 각자의 업무 상황 기반 자동화 설계 실습',
          '발표 및 코칭 - 자동화 구성 발표 및 실무 적용 피드백'
        ],
        expectedOutcomes: [
          '채용 프로세스 자동화 역량',
          'AI 기반 문서 작성 능력',
          '온보딩 시스템 구축',
          'HR 데이터 분석 및 리포팅'
        ],
        tools: ['ChatGPT', 'n8n', 'Google Sheets', 'HR Systems', 'Document Automation']
      }
    ],
    advanced: [
      {
        title: '인사/총무 트랙 - 심화과정 (12시간)',
        duration: '12시간',
        description: '"저절히 정리, 온보딩 안내, 직원 만족도 조사... 모두 자동으로!"',
        objectives: [
          '채용/사내 관리/문서 정리를 자동화하는 기본 역량 습득',
          '서울 활용한 이력서 요약, 문서 자동 작성 등 실습',
          'n8n을 활용해 인사 안내, 북무 요청 일련 등을 자동화'
        ],
        practicalExercises: [
          '생성형 AI 개요 - 인사/총무 업무에서 GPT 활용 프론트 이해',
          '이력서 요약 프롬프트 작성 - 지원자 이력서 → 요약 → 평가 포인트 구성',
          '채용 공고 자동 작성 - 직무 키워드 → GPT로 공고 조건 작성',
          'n8n 구조 및 기본 사용법 실습 - 노드 요결 간단 자동 간단 구성',
          '임사자 온보딩 자동화 - 구글 시트 → 연락 → 안내 메일 전송',
          '입퇴사 프로세스 통합 자동화 - 인사 안내 → 장비 요청 → 라이브 전송 자동화',
          'HR 지표 자동 리포트 - 절말 입사 지표 → 시각화 → 보고서 구성',
          '교육 일정 알림 자동화 - 교육 일정 등록 → 슬림/메일 자동 알림',
          '문서작성 보조 자동화 - 인사 공지/규정 → 조직 전파 자동 전송',
          '자동화 흐름 그리기 - 나의 반복 업무 자동화 설계 조례',
          '실습: 나만의 n8n 만들기 - 개인 업무에 맞춤 자동화 구성',
          '공유 및 피드백 - 구성 결과 발표 및 적용 적용 코칭'
        ],
        expectedOutcomes: [
          '고급 HR 자동화 시스템 구축',
          '데이터 기반 인사 관리',
          '직원 만족도 관리 자동화',
          '조직 내 커뮤니케이션 효율화'
        ],
        tools: ['n8n Advanced', 'HR Analytics', 'Employee Survey Tools', 'Performance Management Systems', 'Communication Platforms']
      }
    ],
    executive: [
      {
        title: '경영진/임원 맞춤형 AI 교육 (3시간)',
        duration: '3시간',
        description: '"AI 강좌를 통해 최신 트렌드와 혁신 효과을 얻어보세요!"',
        objectives: [
          '생성형 AI 및 n8n 기반 자동화의 개념과 원리 이해',
          '부서별 AI 자동화 적용 사례 및 ROI 인사이트 학보',
          '조직 내 AI 전환을 위한 전략적 역할 인식'
        ],
        practicalExercises: [
          'AI & n8n 개요 및 글로벌 트렌드 - 생성형 AI 효과, n8n 소개, 글로벌 자동화 트렌드',
          '부서별 자동화 사례와 생산성 효과 - 마케팅, 영업, 인사 등 부서별 구체적 적용 사례',
          '경영진의 역할과 조직 도입 전략 - 조직 내 AI 활성 전략, 인력 재배치, 성공 조건 정리'
        ],
        expectedOutcomes: [
          'AI 자동화 전략적 이해',
          '부서별 적용 방안 수립',
          '조직 변화 리더십 확보'
        ],
        tools: ['AI Strategy Framework', 'ROI Calculator', 'Change Management Tools']
      }
    ],
    totalDuration: { basic: '12시간', advanced: '12시간', executive: '3시간' },
    roi: { productivity: '60% 향상', costSaving: '연간 2.5억원', timeReduction: 'HR업무 65% 자동화' }
  }
};

// 전체 커리큘럼 통합
// AI 기초이해 등 일반적인 AI 교육 과정
const AI_BASIC_CURRICULUM: IndustryCurriculum = {
  industryName: 'AI 기초이해',
  industryCode: 'AI_BASIC',
  basic: [
    {
      title: 'AI 기초 개념과 활용법',
      duration: '8시간',
      description: 'AI의 기본 개념을 이해하고 일상 업무에 적용하는 방법을 학습합니다.',
      objectives: [
        'AI 기본 개념과 원리 이해',
        'ChatGPT 등 AI 도구 활용법 습득',
        '업무 자동화 기초 개념 학습',
        'AI 윤리와 한계 인식'
      ],
      practicalExercises: [
        'ChatGPT를 활용한 문서 작성',
        'AI 도구로 업무 효율성 개선',
        '프롬프트 엔지니어링 실습',
        '업무 자동화 시나리오 설계'
      ],
      expectedOutcomes: [
        'AI 도구 활용 능력 향상',
        '업무 생산성 30% 증대',
        '반복 업무 자동화 구현',
        'AI 기반 문제해결 역량 확보'
      ],
      tools: ['ChatGPT', 'Claude', 'Google Bard', 'Notion AI']
    },
    {
      title: 'n8n 워크플로우 자동화 기초',
      duration: '12시간',
      description: 'n8n을 활용한 업무 자동화 워크플로우 구축 방법을 학습합니다.',
      objectives: [
        'n8n 기본 사용법 습득',
        '워크플로우 설계 원리 이해',
        'API 연동 기초 학습',
        '자동화 시나리오 구현'
      ],
      practicalExercises: [
        'n8n 설치 및 환경 설정',
        '간단한 워크플로우 생성',
        '이메일 자동화 구현',
        '데이터 처리 자동화'
      ],
      expectedOutcomes: [
        '기본 자동화 워크플로우 구축',
        '업무 시간 40% 단축',
        'API 연동 기초 역량',
        '자동화 사고방식 습득'
      ],
      tools: ['n8n', 'Webhook', 'Gmail API', 'Google Sheets']
    }
  ],
  advanced: [
    {
      title: 'AI 고급 활용과 맞춤형 솔루션',
      duration: '16시간',
      description: '고급 AI 기술을 활용한 맞춤형 솔루션 개발',
      objectives: [
        'AI 모델 파인튜닝 기초',
        '맞춤형 AI 솔루션 설계',
        'AI API 고급 활용',
        '성과 측정 및 최적화'
      ],
      practicalExercises: [
        'GPT 모델 파인튜닝',
        '업무별 AI 어시스턴트 구축',
        '데이터 분석 자동화',
        'AI 성과 대시보드 구성'
      ],
      expectedOutcomes: [
        '맞춤형 AI 솔루션 구축',
        '고급 자동화 구현',
        '데이터 기반 의사결정',
        'AI 전문가 수준 역량'
      ],
      tools: ['OpenAI API', 'LangChain', 'Python', 'Streamlit']
    }
  ],
  executive: [
    {
      title: 'AI 전략과 디지털 전환 리더십',
      duration: '6시간',
      description: 'AI 기반 디지털 전환 전략과 조직 리더십',
      objectives: [
        'AI 전환 전략 수립',
        '조직 AI 역량 강화',
        'AI 투자 ROI 계획',
        'AI 윤리 및 거버넌스'
      ],
      practicalExercises: [
        'AI 전환 로드맵 작성',
        'AI 투자 계획 수립',
        '조직 역량 진단',
        'AI 거버넌스 체계 구축'
      ],
      expectedOutcomes: [
        '명확한 AI 전략 수립',
        '조직 AI 역량 강화',
        'AI 투자 우선순위 결정',
        'AI 리더십 역량 확보'
      ],
      tools: ['AI Strategy Framework', 'ROI Calculator', 'Governance Tools']
    }
  ],
  totalDuration: {
    basic: '20시간 (3주)',
    advanced: '16시간 (2주)',
    executive: '6시간 (1주)'
  },
  roi: {
    productivity: '40% 향상',
    costSaving: '월 300만원 절감',
    timeReduction: '업무시간 50% 단축'
  }
};

export const ALL_INDUSTRY_CURRICULUM = {
  ...COMPREHENSIVE_INDUSTRY_CURRICULUM,
  ...ADDITIONAL_INDUSTRIES,
  // AI 기초 과정 추가
  ai_basic: AI_BASIC_CURRICULUM,
  automation: AI_BASIC_CURRICULUM,
  professional: ADDITIONAL_INDUSTRIES.professional || AI_BASIC_CURRICULUM,
  fintech: ADDITIONAL_INDUSTRIES.fintech || AI_BASIC_CURRICULUM,
  it_service: ADDITIONAL_INDUSTRIES.it_service || AI_BASIC_CURRICULUM
};

// 업종별 커리큘럼 조회 함수
export function getIndustryCurriculum(industryCode: string): IndustryCurriculum | null {
  return ALL_INDUSTRY_CURRICULUM[industryCode] || null;
}

// 전체 업종 목록 조회
export function getAllIndustries(): string[] {
  return Object.keys(ALL_INDUSTRY_CURRICULUM);
}

// 커리큘럼 검색 함수
export function searchCurriculum(query: string): IndustryCurriculum[] {
  const searchTerm = query.toLowerCase();
  return Object.values(ALL_INDUSTRY_CURRICULUM).filter(curriculum => 
    curriculum?.industryName?.toLowerCase().includes(searchTerm) ||
    curriculum?.basic?.some(module => 
      module.title.toLowerCase().includes(searchTerm) ||
      module.description.toLowerCase().includes(searchTerm)
    )
  ).filter(Boolean) as IndustryCurriculum[];
}
