/**
 * 🏆 V22.6 통합 맥킨지급 24페이지 AI 역량진단 보고서 생성기
 * - 병렬 처리 시스템 완벽 통합
 * - 업종별 맞춤형 분석 (IndustryDataService 완벽 통합)
 * - n8n 기반 고몰입 조직구축 동기부여
 * - 사실기반 정확한 점수 반영
 * - 업종별 특화 벤치마크 및 솔루션
 */

// DiagnosisData 인터페이스 정의 (독립적)
export interface DiagnosisData {
  diagnosisId: string;
  companyInfo: {
    name: string;
    industry: string;
    size: string;
    revenue?: string;
    employees?: string;
    position?: string;
    location?: string;
  };
  responses: Record<string, number>;
  scores: {
    total: number;
    percentage: number;
    categoryScores: {
      businessFoundation: number;
      currentAI: number;
      organizationReadiness: number;
      technologyInfrastructure: number;
      dataManagement: number;
      humanResources: number;
    };
  };
  timestamp: string;
  grade: string;
  maturityLevel: string;
  isVirtualData?: boolean;
}

// 업종별 고급 분석 엔진 통합 import (안전한 방식)
let IndustryDataService: any = null;

// 동적 import를 위한 함수
async function loadIndustryDataService() {
  try {
    const serviceModule = await import('@/lib/utils/industryDataService');
    IndustryDataService = serviceModule.IndustryDataService;
    console.log('✅ IndustryDataService 로드 성공');
    return true;
  } catch (importError) {
    console.warn('⚠️ IndustryDataService 로드 실패, 기본 분석 사용:', importError);
    IndustryDataService = null;
    return false;
  }
}

// 초기 로드 시도
loadIndustryDataService().catch(() => {
  console.warn('⚠️ IndustryDataService 초기 로드 실패');
});

export class McKinsey24PageGenerator {
  // 업종별 특화 분석 데이터 (확장됨)
  private static readonly INDUSTRY_INSIGHTS = {
    'IT/소프트웨어': {
      characteristics: [
        '빠른 기술 변화 대응 필요',
        '개발 프로세스 자동화 중요',
        '데이터 기반 의사결정 문화',
        '애자일/DevOps 방법론 적용'
      ],
      n8nOpportunities: [
        'CI/CD 파이프라인 자동화',
        '코드 리뷰 및 테스트 자동화',
        '고객 피드백 실시간 수집',
        'API 모니터링 및 알림'
      ],
      benchmarks: {
        average: 75,
        top10: 90,
        growth: '+15% YoY'
      },
      aiFocus: 0.7,
      practicalFocus: 0.3
    },
    '제조업': {
      characteristics: [
        '생산 효율성 극대화 필요',
        '품질 관리 시스템 중요',
        '공급망 최적화 요구',
        '스마트 팩토리 전환'
      ],
      n8nOpportunities: [
        'IoT 센서 데이터 자동 수집',
        '품질 검사 자동화',
        '재고 관리 최적화',
        '설비 예지 보전'
      ],
      benchmarks: {
        average: 65,
        top10: 85,
        growth: '+12% YoY'
      },
      aiFocus: 0.5,
      practicalFocus: 0.5
    },
    '서비스업': {
      characteristics: [
        '고객 경험 최우선',
        '옴니채널 서비스 제공',
        '개인화 서비스 요구',
        '실시간 응대 중요'
      ],
      n8nOpportunities: [
        '고객 문의 자동 분류',
        '챗봇 시스템 구축',
        '예약 관리 자동화',
        '고객 만족도 실시간 분석'
      ],
      benchmarks: {
        average: 70,
        top10: 88,
        growth: '+18% YoY'
      },
      aiFocus: 0.6,
      practicalFocus: 0.4
    },
    '금융업': {
      characteristics: [
        '규제 준수 필수',
        '리스크 관리 중요',
        '보안 최우선',
        '디지털 전환 가속'
      ],
      n8nOpportunities: [
        'KYC/AML 자동화',
        '리스크 모니터링',
        '보고서 자동 생성',
        '거래 이상 탐지'
      ],
      benchmarks: {
        average: 80,
        top10: 95,
        growth: '+20% YoY'
      },
      aiFocus: 0.6,
      practicalFocus: 0.4
    },
    '유통/소매업': {
      characteristics: [
        '재고 최적화 필요',
        '옴니채널 통합',
        '고객 행동 분석',
        '가격 경쟁력'
      ],
      n8nOpportunities: [
        '재고 자동 발주',
        '가격 모니터링',
        '프로모션 자동화',
        '고객 세그먼트 분석'
      ],
      benchmarks: {
        average: 68,
        top10: 86,
        growth: '+14% YoY'
      },
      aiFocus: 0.5,
      practicalFocus: 0.5
    },
    '의료/헬스케어': {
      characteristics: [
        '환자 데이터 보안',
        '의료 품질 향상',
        '의료진 업무 효율성',
        '원격 의료 서비스'
      ],
      n8nOpportunities: [
        '환자 예약 자동화',
        '의료 기록 관리',
        '약물 상호작용 체크',
        '의료진 스케줄링'
      ],
      benchmarks: {
        average: 72,
        top10: 89,
        growth: '+16% YoY'
      },
      aiFocus: 0.6,
      practicalFocus: 0.4
    },
    '교육/에듀테크': {
      characteristics: [
        '개인화 학습 경험',
        '교육 효과 측정',
        '온라인 학습 플랫폼',
        '교사 업무 효율성'
      ],
      n8nOpportunities: [
        '학습 진도 추적',
        '과제 자동 채점',
        '학생 피드백 수집',
        '교육 콘텐츠 추천'
      ],
      benchmarks: {
        average: 66,
        top10: 84,
        growth: '+13% YoY'
      },
      aiFocus: 0.5,
      practicalFocus: 0.5
    }
  };

  // 6개 영역별 상세 평가 기준
  private static readonly CATEGORY_DETAILS = {
    businessFoundation: {
      name: '비즈니스 기반',
      icon: '🏢',
      questions: [
        'AI 비전 및 전략 수립 수준',
        '경영진 AI 리더십',
        'AI 투자 계획 및 예산',
        'AI 거버넌스 체계',
        '변화 관리 준비도',
        'AI 성과 측정 체계',
        'AI 리스크 관리'
      ],
      n8nSolutions: [
        'KPI 대시보드 자동화',
        '경영 보고서 자동 생성',
        '시장 동향 자동 수집',
        '경쟁사 분석 자동화'
      ]
    },
    currentAI: {
      name: '현재 AI 활용',
      icon: '🤖',
      questions: [
        'AI 도구 활용 현황',
        'AI 프로젝트 경험',
        'AI 성과 및 효과',
        'AI 활용 범위',
        'AI 시스템 통합 수준',
        'AI 모델 성능',
        'AI 운영 체계'
      ],
      n8nSolutions: [
        'ChatGPT API 통합',
        'AI 모델 파이프라인',
        '자동 학습 시스템',
        'AI 성과 모니터링'
      ]
    },
    organizationReadiness: {
      name: '조직 준비도',
      icon: '👥',
      questions: [
        '조직 문화 개방성',
        '변화 수용성',
        '협업 체계',
        'AI 인식 수준',
        '학습 문화',
        '혁신 지원 체계',
        '실패 허용 문화'
      ],
      n8nSolutions: [
        '직원 피드백 자동 수집',
        '교육 프로그램 관리',
        '협업 도구 자동화',
        '혁신 아이디어 관리'
      ]
    },
    technologyInfrastructure: {
      name: '기술 인프라',
      icon: '💻',
      questions: [
        '클라우드 인프라',
        '데이터 저장 체계',
        'API 아키텍처',
        '보안 시스템',
        '모니터링 체계',
        '개발 환경',
        '시스템 통합성'
      ],
      n8nSolutions: [
        '인프라 모니터링 자동화',
        '보안 알림 시스템',
        'API 상태 체크',
        '백업 자동화'
      ]
    },
    dataManagement: {
      name: '데이터 관리',
      icon: '📊',
      questions: [
        '데이터 품질',
        '데이터 거버넌스',
        '데이터 수집 체계',
        '데이터 분석 역량',
        '데이터 보안',
        '데이터 활용도',
        '데이터 통합성'
      ],
      n8nSolutions: [
        '데이터 파이프라인 자동화',
        '데이터 품질 체크',
        'ETL 프로세스 자동화',
        '데이터 리포트 생성'
      ]
    },
    humanResources: {
      name: '인적 자원',
      icon: '🎓',
      questions: [
        'AI 전문 인력',
        'AI 교육 수준',
        'AI 역량 개발',
        '외부 전문가 활용',
        'AI 팀 구성',
        '인재 확보 전략',
        '역량 평가 체계'
      ],
      n8nSolutions: [
        '교육 일정 자동화',
        '역량 평가 시스템',
        '인재 풀 관리',
        '멘토링 매칭 시스템'
      ]
    }
  };

  // 동기부여 메시지 템플릿
  private static readonly MOTIVATION_MESSAGES = {
    excellent: {
      title: '🏆 AI 혁신 리더십 발휘 단계',
      message: '축하합니다! 귀하의 조직은 이미 AI 혁신의 최전선에 서 있습니다.',
      action: '이제 업계 선도기업으로서 AI 생태계를 주도할 시점입니다.',
      nextLevel: 'AI 기반 완전 자동화 조직으로의 진화'
    },
    good: {
      title: '🚀 AI 도약 준비 완료 단계',
      message: '훌륭합니다! 귀하의 조직은 AI 도입을 위한 견고한 기반을 갖추고 있습니다.',
      action: '이제 구체적인 AI 자동화 프로젝트를 시작하여 가시적인 성과를 창출할 시점입니다.',
      nextLevel: 'AI 활용 선도기업으로의 도약'
    },
    average: {
      title: '⚡ AI 성장 가속화 단계',
      message: '좋은 시작입니다! AI 도입의 기초는 마련되었으나 더 큰 도약이 필요합니다.',
      action: 'n8n 자동화부터 시작하여 단계적으로 AI 역량을 확대해 나가세요.',
      nextLevel: 'AI 성장기업으로의 전환'
    },
    needImprovement: {
      title: '🌱 AI 기초 역량 구축 단계',
      message: 'AI 여정의 시작점에 계십니다. 체계적인 접근으로 빠른 성장이 가능합니다.',
      action: '기초 교육과 간단한 자동화부터 시작하여 점진적으로 역량을 키워가세요.',
      nextLevel: 'AI 준비기업으로의 성장'
    }
  };

  /**
   * V22.6 통합 24페이지 맥킨지급 보고서 생성 (업종별 고급 분석 포함)
   */
  public static generateMcKinsey24PageReport(data: DiagnosisData): string {
    console.log('🚀 V22.6 통합 24페이지 보고서 생성 시작 (업종별 맞춤형)');
    
    const industry = data.companyInfo.industry || 'IT/소프트웨어';
    const industryData = this.INDUSTRY_INSIGHTS[industry] || this.INDUSTRY_INSIGHTS['IT/소프트웨어'];
    
    // 점수 계산
    const totalScore = data.scores.total;
    const percentage = data.scores.percentage;
    const grade = data.grade;
    
    // 🔥 업종별 고급 분석 통합
    const industryInsights = this.getAdvancedIndustryAnalysis(industry, data);
    const industryWeights = this.getIndustryWeights(industry);
    
    console.log('📊 업종별 분석 완료:', {
      업종: industry,
      가중치: industryWeights,
      맞춤분석: '완료'
    });
    
    // 동기부여 레벨 결정
    let motivationLevel: 'excellent' | 'good' | 'average' | 'needImprovement';
    if (percentage >= 85) motivationLevel = 'excellent';
    else if (percentage >= 70) motivationLevel = 'good';
    else if (percentage >= 50) motivationLevel = 'average';
    else motivationLevel = 'needImprovement';
    
    const motivation = this.MOTIVATION_MESSAGES[motivationLevel];

    // HTML 생성 시작
    let html = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyInfo.name} - AI 역량진단 보고서 (McKinsey 24-Page)</title>
    <style>
        ${this.getStyles()}
    </style>
</head>
<body>
    <div class="mckinsey-report">
`;

    // 페이지 1: 표지
    html += this.generateCoverPage(data);
    
    // 페이지 2: 경영진 요약
    html += this.generateExecutiveSummary(data, motivation);
    
    // 페이지 3: 종합 점수 대시보드
    html += this.generateScoreDashboard(data, industryData);
    
    // 페이지 4: 업종별 벤치마크 분석 (고급 분석 통합)
    html += this.generateAdvancedBenchmarkAnalysis(data, industryData, industryInsights);
    
    // 페이지 5-10: 6개 영역별 상세 분석 (각 1페이지)
    html += this.generateCategoryAnalysis(data, 'businessFoundation');
    html += this.generateCategoryAnalysis(data, 'currentAI');
    html += this.generateCategoryAnalysis(data, 'organizationReadiness');
    html += this.generateCategoryAnalysis(data, 'technologyInfrastructure');
    html += this.generateCategoryAnalysis(data, 'dataManagement');
    html += this.generateCategoryAnalysis(data, 'humanResources');
    
    // 페이지 11: SWOT 분석
    html += this.generateSWOTAnalysis(data);
    
    // 페이지 12: 우선순위 매트릭스
    html += this.generatePriorityMatrix(data);
    
    // 페이지 13-14: n8n 자동화 솔루션 (2페이지)
    html += this.generateN8nSolutions(data, industryData, 1);
    html += this.generateN8nSolutions(data, industryData, 2);
    
    // 페이지 15-16: 실행 로드맵 (2페이지)
    html += this.generateRoadmap(data, 1);
    html += this.generateRoadmap(data, 2);
    
    // 페이지 17: ROI 분석
    html += this.generateROIAnalysis(data);
    
    // 페이지 18: 리스크 분석
    html += this.generateRiskAnalysis(data);
    
    // 페이지 19: 정부 지원 프로그램
    html += this.generateGovernmentSupport(data);
    
    // 페이지 20: AI 트렌드 분석
    html += this.generateTrendAnalysis(data);
    
    // 페이지 21: 성공 사례
    html += this.generateSuccessStories(data, industry);
    
    // 페이지 22: AICAMP 커리큘럼
    html += this.generateAICampCurriculum(data);
    
    // 페이지 23: 고몰입 조직 구축 전략
    html += this.generateHighEngagementStrategy(data, motivation);
    
    // 페이지 24: 결론 및 다음 단계
    html += this.generateConclusion(data, motivation);

    html += `
    </div>
</body>
</html>`;

    return html;
  }

  /**
   * 스타일 정의
   */
  private static getStyles(): string {
    return `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Helvetica Neue', Arial, 'Malgun Gothic', sans-serif;
            line-height: 1.6;
            color: #2c3e50;
            background: #fff;
        }
        
        .mckinsey-report {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
        }
        
        .page {
            min-height: 100vh;
            padding: 60px 40px;
            page-break-after: always;
            position: relative;
        }
        
        .page-number {
            position: absolute;
            bottom: 30px;
            right: 40px;
            color: #6b7280;
            font-size: 12px;
        }
        
        .page-header {
            border-bottom: 3px solid #1e3a8a;
            padding-bottom: 20px;
            margin-bottom: 40px;
        }
        
        .page-title {
            font-size: 32px;
            font-weight: 300;
            color: #1e3a8a;
            margin-bottom: 8px;
        }
        
        .page-subtitle {
            font-size: 18px;
            color: #64748b;
            font-weight: 400;
        }
        
        .cover-page {
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
            color: white;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .cover-title {
            font-size: 48px;
            font-weight: 300;
            margin-bottom: 20px;
            letter-spacing: -1px;
        }
        
        .insight-box {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-left: 4px solid #0ea5e9;
            border-radius: 8px;
            padding: 25px;
            margin: 25px 0;
        }
        
        .motivation-box {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-left: 4px solid #f59e0b;
            border-radius: 8px;
            padding: 25px;
            margin: 25px 0;
        }
        
        .score-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        
        .score-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border: 2px solid #e5e7eb;
        }
        
        .score-value {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        
        .score-excellent { color: #059669; border-color: #10b981; }
        .score-good { color: #0284c7; border-color: #0ea5e9; }
        .score-average { color: #d97706; border-color: #f59e0b; }
        .score-poor { color: #dc2626; border-color: #ef4444; }
        
        .chart-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin: 30px 0;
        }
        
        .action-list {
            list-style: none;
            padding: 0;
        }
        
        .action-item {
            background: white;
            border-radius: 8px;
            padding: 15px 20px;
            margin: 10px 0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            border-left: 4px solid #3b82f6;
        }
        
        .roadmap-phase {
            background: white;
            border-radius: 12px;
            padding: 30px;
            margin: 25px 0;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border-left: 6px solid #3b82f6;
        }
        
        .n8n-solution {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
            border: 2px solid #22c55e;
        }
        
        @media print {
            .page { page-break-after: always; }
        }
    `;
  }

  /**
   * 페이지 생성 메서드들
   */
  private static generateCoverPage(data: DiagnosisData): string {
    return `
        <div class="page cover-page">
            <div class="cover-title">AI 역량진단 보고서</div>
            <div style="font-size: 24px; margin: 20px 0;">McKinsey 방법론 기반 24페이지 정밀 분석</div>
            <div style="font-size: 36px; font-weight: 600; margin: 40px 0; padding: 20px 40px; border: 2px solid white; border-radius: 8px;">
                ${data.companyInfo.name}
            </div>
            <div style="margin-top: 40px;">
                <div>업종: ${data.companyInfo.industry}</div>
                <div>규모: ${data.companyInfo.size}</div>
                <div>진단일: ${new Date().toLocaleDateString('ko-KR')}</div>
                <div>진단ID: ${data.diagnosisId}</div>
            </div>
            <div style="position: absolute; bottom: 40px; font-size: 14px; opacity: 0.8;">
                Powered by AICAMP n8n Automation System V27.0
            </div>
        </div>
    `;
  }

  private static generateExecutiveSummary(data: DiagnosisData, motivation: any): string {
    return `
        <div class="page">
            <div class="page-header">
                <div class="page-title">경영진 요약</div>
                <div class="page-subtitle">Executive Summary</div>
            </div>
            
            <div class="insight-box">
                <h3>🎯 핵심 진단 결과</h3>
                <p style="font-size: 18px; margin-top: 15px;">
                    ${data.companyInfo.name}의 AI 역량 성숙도는 <strong>${data.maturityLevel}</strong> 수준으로,
                    총 <strong>${data.scores.total}점(${data.scores.percentage}%)</strong>을 기록했습니다.
                </p>
            </div>
            
            <div class="motivation-box">
                <h3>${motivation.title}</h3>
                <p style="margin-top: 15px;">${motivation.message}</p>
                <p style="margin-top: 10px; font-weight: 600;">${motivation.action}</p>
            </div>
            
            <div class="score-grid">
                <div class="score-card score-${this.getScoreClass(data.scores.percentage)}">
                    <div class="score-value">${data.scores.total}</div>
                    <div>총점</div>
                </div>
                <div class="score-card score-${this.getScoreClass(data.scores.percentage)}">
                    <div class="score-value">${data.scores.percentage}%</div>
                    <div>달성률</div>
                </div>
                <div class="score-card">
                    <div class="score-value">${data.grade}</div>
                    <div>등급</div>
                </div>
                <div class="score-card">
                    <div class="score-value" style="font-size: 24px;">${data.maturityLevel}</div>
                    <div>AI 성숙도</div>
                </div>
            </div>
            
            <div class="insight-box">
                <h3>⚡ 즉시 실행 권고사항</h3>
                <ul class="action-list">
                    <li class="action-item">n8n 자동화 플랫폼 도입으로 즉시 업무 효율성 30% 향상</li>
                    <li class="action-item">AI 전담팀 구성 및 전사 AI 교육 프로그램 시작</li>
                    <li class="action-item">파일럿 프로젝트 선정 및 Quick Win 창출</li>
                </ul>
            </div>
            
            <div class="page-number">2 / 24</div>
        </div>
    `;
  }

  private static generateScoreDashboard(data: DiagnosisData, industryData: any): string {
    const categories = ['businessFoundation', 'currentAI', 'organizationReadiness', 'technologyInfrastructure', 'dataManagement', 'humanResources'];
    
    return `
        <div class="page">
            <div class="page-header">
                <div class="page-title">종합 점수 대시보드</div>
                <div class="page-subtitle">Comprehensive Score Dashboard</div>
            </div>
            
            <div class="chart-grid">
                ${categories.map(cat => {
                    const detail = this.CATEGORY_DETAILS[cat];
                    const averageScore = data.scores.categoryScores[cat] || 0;
                    
                    // 🔥 카테고리별 문항 수에 따른 총점 계산
                    const questionCount = cat === 'humanResources' ? 5 : 8; // 실행역량만 5문항, 나머지는 8문항
                    const maxScore = questionCount * 5; // 문항수 × 5점
                    const totalScore = Math.round(averageScore * questionCount); // 평균점수 × 문항수 = 총점
                    const percentage = Math.round((averageScore / 5) * 100);
                    
                    return `
                        <div class="score-card score-${this.getScoreClass(percentage)}">
                            <div style="font-size: 48px;">${detail.icon}</div>
                            <div class="score-value">${totalScore}/${maxScore}</div>
                            <div style="font-weight: 600;">${detail.name}</div>
                            <div style="color: #6b7280;">${percentage}%</div>
                        </div>
                    `;
                }).join('')}
            </div>
            
            <div class="insight-box">
                <h3>📊 강점 영역 분석</h3>
                <p>가장 높은 점수를 받은 영역은 <strong>${this.getTopCategory(data)}</strong>입니다.</p>
                <p>이 영역을 기반으로 AI 도입을 시작하면 빠른 성과를 얻을 수 있습니다.</p>
            </div>
            
            <div class="insight-box" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-color: #f59e0b;">
                <h3>⚠️ 개선 필요 영역</h3>
                <p>가장 낮은 점수를 받은 영역은 <strong>${this.getBottomCategory(data)}</strong>입니다.</p>
                <p>이 영역에 대한 집중적인 개선이 필요합니다.</p>
            </div>
            
            <div class="page-number">3 / 24</div>
        </div>
    `;
  }

  private static generateBenchmarkAnalysis(data: DiagnosisData, industryData: any): string {
    const gap = data.scores.percentage - industryData.benchmarks.average;
    
    return `
        <div class="page">
            <div class="page-header">
                <div class="page-title">업종별 벤치마크 분석</div>
                <div class="page-subtitle">Industry Benchmark Analysis</div>
            </div>
            
            <div class="score-grid">
                <div class="score-card">
                    <div class="score-value">${data.scores.percentage}%</div>
                    <div>귀사 점수</div>
                </div>
                <div class="score-card">
                    <div class="score-value">${industryData.benchmarks.average}%</div>
                    <div>업종 평균</div>
                </div>
                <div class="score-card">
                    <div class="score-value">${industryData.benchmarks.top10}%</div>
                    <div>상위 10%</div>
                </div>
                <div class="score-card score-${gap > 0 ? 'good' : 'poor'}">
                    <div class="score-value">${gap > 0 ? '+' : ''}${gap}%</div>
                    <div>평균 대비</div>
                </div>
            </div>
            
            <div class="insight-box">
                <h3>🏆 업종 특성 분석</h3>
                <h4>${data.companyInfo.industry} 업종 특징:</h4>
                <ul>
                    ${industryData.characteristics.map(c => `<li>${c}</li>`).join('')}
                </ul>
            </div>
            
            <div class="n8n-solution">
                <h3>🔧 업종별 n8n 자동화 기회</h3>
                <ul>
                    ${industryData.n8nOpportunities.map(o => `<li>⚡ ${o}</li>`).join('')}
                </ul>
            </div>
            
            <div class="page-number">4 / 24</div>
        </div>
    `;
  }

  private static generateCategoryAnalysis(data: DiagnosisData, category: string): string {
    const detail = this.CATEGORY_DETAILS[category];
    const averageScore = data.scores.categoryScores[category] || 0;
    
    // 🔥 카테고리별 문항 수에 따른 총점 계산
    const questionCount = category === 'humanResources' ? 5 : 8; // 실행역량만 5문항, 나머지는 8문항
    const maxScore = questionCount * 5; // 문항수 × 5점
    const totalScore = Math.round(averageScore * questionCount); // 평균점수 × 문항수 = 총점
    const percentage = Math.round((averageScore / 5) * 100);
    const pageNum = Object.keys(this.CATEGORY_DETAILS).indexOf(category) + 5;
    
    return `
        <div class="page">
            <div class="page-header">
                <div class="page-title">${detail.icon} ${detail.name} 상세 분석</div>
                <div class="page-subtitle">${category} Analysis</div>
            </div>
            
            <div class="score-card score-${this.getScoreClass(percentage)}" style="max-width: 300px; margin: 0 auto;">
                <div style="font-size: 64px;">${detail.icon}</div>
                <div class="score-value">${totalScore}/${maxScore}점</div>
                <div style="font-size: 24px; color: #6b7280;">${percentage}% (평균 ${averageScore.toFixed(1)}점)</div>
            </div>
            
            <div class="insight-box">
                <h3>📋 평가 항목 분석</h3>
                <ul>
                    ${detail.questions.map(q => `<li>${q}</li>`).join('')}
                </ul>
            </div>
            
            <div class="n8n-solution">
                <h3>🚀 n8n 자동화 솔루션</h3>
                <ul>
                    ${detail.n8nSolutions.map(s => `<li>⚡ ${s}</li>`).join('')}
                </ul>
            </div>
            
            <div class="motivation-box">
                <h3>💡 개선 방향</h3>
                <p>${this.getCategoryImprovement(category, percentage)}</p>
            </div>
            
            <div class="page-number">${pageNum} / 24</div>
        </div>
    `;
  }

  private static generateSWOTAnalysis(data: DiagnosisData): string {
    return `
        <div class="page">
            <div class="page-header">
                <div class="page-title">SWOT 분석</div>
                <div class="page-subtitle">Strengths, Weaknesses, Opportunities, Threats</div>
            </div>
            
            <div class="chart-grid">
                <div style="background: #dcfce7; padding: 25px; border-radius: 12px; border-left: 4px solid #22c55e;">
                    <h3 style="color: #16a34a;">💪 강점 (Strengths)</h3>
                    <ul style="margin-top: 15px;">
                        ${this.getStrengths(data).map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
                
                <div style="background: #fef3c7; padding: 25px; border-radius: 12px; border-left: 4px solid #f59e0b;">
                    <h3 style="color: #d97706;">⚠️ 약점 (Weaknesses)</h3>
                    <ul style="margin-top: 15px;">
                        ${this.getWeaknesses(data).map(w => `<li>${w}</li>`).join('')}
                    </ul>
                </div>
                
                <div style="background: #dbeafe; padding: 25px; border-radius: 12px; border-left: 4px solid #3b82f6;">
                    <h3 style="color: #1d4ed8;">🚀 기회 (Opportunities)</h3>
                    <ul style="margin-top: 15px;">
                        <li>n8n 자동화를 통한 즉각적인 효율성 향상</li>
                        <li>AI 기술 도입으로 경쟁 우위 확보</li>
                        <li>정부 지원 프로그램 활용 가능</li>
                    </ul>
                </div>
                
                <div style="background: #fee2e2; padding: 25px; border-radius: 12px; border-left: 4px solid #ef4444;">
                    <h3 style="color: #dc2626;">⚡ 위협 (Threats)</h3>
                    <ul style="margin-top: 15px;">
                        <li>경쟁사의 빠른 AI 도입</li>
                        <li>AI 기술 변화 속도</li>
                        <li>전문 인력 확보 경쟁</li>
                    </ul>
                </div>
            </div>
            
            <div class="page-number">11 / 24</div>
        </div>
    `;
  }

  private static generatePriorityMatrix(data: DiagnosisData): string {
    return `
        <div class="page">
            <div class="page-header">
                <div class="page-title">우선순위 매트릭스</div>
                <div class="page-subtitle">Priority Matrix - Impact vs Effort</div>
            </div>
            
            <div class="chart-grid">
                <div style="background: #fee2e2; padding: 25px; border-radius: 12px; border: 2px solid #ef4444;">
                    <h3 style="color: #dc2626;">🔥 Quick Wins (높은 영향, 낮은 노력)</h3>
                    <ul style="margin-top: 15px;">
                        <li>n8n 기본 워크플로우 구축</li>
                        <li>ChatGPT API 연동</li>
                        <li>이메일 자동화</li>
                    </ul>
                </div>
                
                <div style="background: #fef3c7; padding: 25px; border-radius: 12px; border: 2px solid #f59e0b;">
                    <h3 style="color: #d97706;">📅 Major Projects (높은 영향, 높은 노력)</h3>
                    <ul style="margin-top: 15px;">
                        <li>전사 AI 플랫폼 구축</li>
                        <li>데이터 레이크 구축</li>
                        <li>AI 전문팀 구성</li>
                    </ul>
                </div>
                
                <div style="background: #dbeafe; padding: 25px; border-radius: 12px; border: 2px solid #3b82f6;">
                    <h3 style="color: #1d4ed8;">👥 Fill-ins (낮은 영향, 낮은 노력)</h3>
                    <ul style="margin-top: 15px;">
                        <li>AI 뉴스레터 구독</li>
                        <li>기초 교육 자료 배포</li>
                        <li>AI 커뮤니티 참여</li>
                    </ul>
                </div>
                
                <div style="background: #f3f4f6; padding: 25px; border-radius: 12px; border: 2px solid #6b7280;">
                    <h3 style="color: #4b5563;">🗑️ Nice to Have (낮은 영향, 높은 노력)</h3>
                    <ul style="margin-top: 15px;">
                        <li>전체 시스템 교체</li>
                        <li>자체 AI 모델 개발</li>
                        <li>대규모 인프라 투자</li>
                    </ul>
                </div>
            </div>
            
            <div class="page-number">12 / 24</div>
        </div>
    `;
  }

  private static generateN8nSolutions(data: DiagnosisData, industryData: any, page: number): string {
    const pageNum = 12 + page;
    
    if (page === 1) {
      return `
        <div class="page">
            <div class="page-header">
                <div class="page-title">n8n 자동화 솔루션 (Part 1)</div>
                <div class="page-subtitle">Automation Solutions with n8n</div>
            </div>
            
            <div class="n8n-solution">
                <h3>🎯 즉시 적용 가능한 n8n 워크플로우</h3>
                
                <div style="margin: 20px 0; padding: 20px; background: white; border-radius: 8px;">
                    <h4>1. 일일 보고서 자동화</h4>
                    <p>매일 아침 9시에 자동으로 데이터를 수집하고 보고서를 생성하여 이메일로 발송</p>
                    <ul>
                        <li>구글 시트 → 데이터 수집</li>
                        <li>ChatGPT → 인사이트 생성</li>
                        <li>이메일 → 자동 발송</li>
                    </ul>
                    <p><strong>예상 효과:</strong> 일일 2시간 업무 시간 절약</p>
                </div>
                
                <div style="margin: 20px 0; padding: 20px; background: white; border-radius: 8px;">
                    <h4>2. 고객 문의 자동 분류</h4>
                    <p>들어오는 고객 문의를 AI가 자동으로 분류하고 담당자에게 할당</p>
                    <ul>
                        <li>이메일/폼 → 문의 수집</li>
                        <li>AI 분류 → 카테고리 지정</li>
                        <li>슬랙/팀즈 → 담당자 알림</li>
                    </ul>
                    <p><strong>예상 효과:</strong> 응답 시간 70% 단축</p>
                </div>
            </div>
            
            <div class="page-number">${pageNum} / 24</div>
        </div>
      `;
    } else {
      return `
        <div class="page">
            <div class="page-header">
                <div class="page-title">n8n 자동화 솔루션 (Part 2)</div>
                <div class="page-subtitle">Advanced Automation Scenarios</div>
            </div>
            
            <div class="n8n-solution">
                <h3>🚀 고급 n8n 통합 시나리오</h3>
                
                <div style="margin: 20px 0; padding: 20px; background: white; border-radius: 8px;">
                    <h4>3. AI 기반 콘텐츠 생성 파이프라인</h4>
                    <p>마케팅 콘텐츠를 자동으로 생성하고 다채널로 배포</p>
                    <ul>
                        <li>트렌드 분석 → 주제 선정</li>
                        <li>ChatGPT → 콘텐츠 생성</li>
                        <li>이미지 AI → 비주얼 생성</li>
                        <li>SNS API → 자동 게시</li>
                    </ul>
                    <p><strong>예상 효과:</strong> 콘텐츠 생산성 300% 향상</p>
                </div>
                
                <div style="margin: 20px 0; padding: 20px; background: white; border-radius: 8px;">
                    <h4>4. 실시간 비즈니스 인텔리전스</h4>
                    <p>핵심 지표를 실시간으로 모니터링하고 이상 징후 감지</p>
                    <ul>
                        <li>데이터베이스 → 실시간 수집</li>
                        <li>AI 분석 → 이상 감지</li>
                        <li>대시보드 → 시각화</li>
                        <li>알림 → 즉각 대응</li>
                    </ul>
                    <p><strong>예상 효과:</strong> 의사결정 속도 50% 개선</p>
                </div>
            </div>
            
            <div class="page-number">${pageNum} / 24</div>
        </div>
      `;
    }
  }

  private static generateRoadmap(data: DiagnosisData, page: number): string {
    const pageNum = 14 + page;
    
    if (page === 1) {
      return `
        <div class="page">
            <div class="page-header">
                <div class="page-title">실행 로드맵 (Phase 1-2)</div>
                <div class="page-subtitle">Implementation Roadmap</div>
            </div>
            
            <div class="roadmap-phase">
                <h3>🚀 Phase 1: 기초 구축 (1-2개월)</h3>
                <div style="margin: 20px 0;">
                    <h4>목표: AI 기초 역량 확보 및 Quick Win 창출</h4>
                    <ul style="margin-top: 15px;">
                        <li>✅ n8n 플랫폼 설치 및 환경 구성</li>
                        <li>✅ 전 직원 AI 기초 교육 (8시간)</li>
                        <li>✅ 첫 번째 자동화 워크플로우 구축</li>
                        <li>✅ ChatGPT 업무 활용 가이드 배포</li>
                        <li>✅ AI 전담팀 구성 (3-5명)</li>
                    </ul>
                    <p><strong>예산:</strong> 월 500만원</p>
                    <p><strong>성과 지표:</strong> 자동화 프로세스 3개, 업무 시간 20% 절감</p>
                </div>
            </div>
            
            <div class="roadmap-phase">
                <h3>⚡ Phase 2: 확산 (3-4개월)</h3>
                <div style="margin: 20px 0;">
                    <h4>목표: 부서별 AI 활용 확산 및 성과 창출</h4>
                    <ul style="margin-top: 15px;">
                        <li>✅ 부서별 맞춤 자동화 구축 (각 3개)</li>
                        <li>✅ AI 활용 사례 공유회 개최</li>
                        <li>✅ 데이터 통합 파이프라인 구축</li>
                        <li>✅ 중급 n8n 교육 (16시간)</li>
                        <li>✅ 외부 API 연동 확대</li>
                    </ul>
                    <p><strong>예산:</strong> 월 800만원</p>
                    <p><strong>성과 지표:</strong> 자동화 프로세스 15개, ROI 150%</p>
                </div>
            </div>
            
            <div class="page-number">${pageNum} / 24</div>
        </div>
      `;
    } else {
      return `
        <div class="page">
            <div class="page-header">
                <div class="page-title">실행 로드맵 (Phase 3-4)</div>
                <div class="page-subtitle">Advanced Implementation Phases</div>
            </div>
            
            <div class="roadmap-phase">
                <h3>🎯 Phase 3: 고도화 (5-6개월)</h3>
                <div style="margin: 20px 0;">
                    <h4>목표: AI 기반 의사결정 체계 구축</h4>
                    <ul style="margin-top: 15px;">
                        <li>✅ AI 예측 모델 도입</li>
                        <li>✅ 실시간 대시보드 구축</li>
                        <li>✅ 고객 서비스 AI 챗봇 런칭</li>
                        <li>✅ 전사 데이터 레이크 구축</li>
                        <li>✅ AI 거버넌스 체계 수립</li>
                    </ul>
                    <p><strong>예산:</strong> 월 1,200만원</p>
                    <p><strong>성과 지표:</strong> AI 활용률 80%, 고객 만족도 30% 향상</p>
                </div>
            </div>
            
            <div class="roadmap-phase">
                <h3>🏆 Phase 4: 혁신 (7-12개월)</h3>
                <div style="margin: 20px 0;">
                    <h4>목표: AI 선도 기업으로 도약</h4>
                    <ul style="margin-top: 15px;">
                        <li>✅ AI 기반 신규 비즈니스 모델 개발</li>
                        <li>✅ 산업별 AI 솔루션 개발</li>
                        <li>✅ AI 생태계 파트너십 구축</li>
                        <li>✅ 지속적 혁신 체계 구축</li>
                        <li>✅ AI 성과 공유 및 확산</li>
                    </ul>
                    <p><strong>예산:</strong> 월 1,500만원</p>
                    <p><strong>성과 지표:</strong> 신규 수익 20% 창출, 업계 리더십 확보</p>
                </div>
            </div>
            
            <div class="page-number">${pageNum} / 24</div>
        </div>
      `;
    }
  }

  private static generateROIAnalysis(data: DiagnosisData): string {
    return `
        <div class="page">
            <div class="page-header">
                <div class="page-title">ROI 분석</div>
                <div class="page-subtitle">Return on Investment Analysis</div>
            </div>
            
            <div class="insight-box">
                <h3>💰 투자 대비 수익 예측</h3>
                <div class="score-grid">
                    <div class="score-card">
                        <div class="score-value">6개월</div>
                        <div>투자 회수 기간</div>
                    </div>
                    <div class="score-card">
                        <div class="score-value">280%</div>
                        <div>3년 누적 ROI</div>
                    </div>
                    <div class="score-card">
                        <div class="score-value">2.5억</div>
                        <div>연간 비용 절감</div>
                    </div>
                    <div class="score-card">
                        <div class="score-value">40%</div>
                        <div>생산성 향상</div>
                    </div>
                </div>
            </div>
            
            <div class="n8n-solution">
                <h3>📊 부문별 기대 효과</h3>
                <ul>
                    <li><strong>운영 효율성:</strong> 반복 업무 90% 자동화로 인건비 30% 절감</li>
                    <li><strong>의사결정:</strong> 실시간 데이터 분석으로 의사결정 속도 50% 향상</li>
                    <li><strong>고객 만족:</strong> AI 챗봇 도입으로 응답 시간 80% 단축</li>
                    <li><strong>매출 증대:</strong> AI 기반 개인화로 전환율 25% 향상</li>
                    <li><strong>품질 개선:</strong> AI 품질 관리로 불량률 60% 감소</li>
                </ul>
            </div>
            
            <div class="page-number">17 / 24</div>
        </div>
    `;
  }

  private static generateRiskAnalysis(data: DiagnosisData): string {
    return `
        <div class="page">
            <div class="page-header">
                <div class="page-title">리스크 분석 및 대응</div>
                <div class="page-subtitle">Risk Analysis & Mitigation</div>
            </div>
            
            <div class="chart-grid">
                <div style="background: #fee2e2; padding: 20px; border-radius: 8px;">
                    <h4 style="color: #dc2626;">🚨 고위험 요소</h4>
                    <ul style="margin-top: 10px;">
                        <li>데이터 보안 및 개인정보 유출</li>
                        <li>AI 모델 편향성 및 오류</li>
                        <li>시스템 통합 실패</li>
                    </ul>
                    <p style="margin-top: 15px;"><strong>대응:</strong> 보안 전문가 참여, 단계별 검증</p>
                </div>
                
                <div style="background: #fef3c7; padding: 20px; border-radius: 8px;">
                    <h4 style="color: #d97706;">⚠️ 중위험 요소</h4>
                    <ul style="margin-top: 10px;">
                        <li>직원 저항 및 변화 관리</li>
                        <li>예산 초과 및 일정 지연</li>
                        <li>기술 선택 오류</li>
                    </ul>
                    <p style="margin-top: 15px;"><strong>대응:</strong> 충분한 교육, 파일럿 프로젝트</p>
                </div>
                
                <div style="background: #dcfce7; padding: 20px; border-radius: 8px;">
                    <h4 style="color: #16a34a;">✅ 저위험 요소</h4>
                    <ul style="margin-top: 10px;">
                        <li>일시적 생산성 저하</li>
                        <li>초기 사용자 혼란</li>
                        <li>문서화 부족</li>
                    </ul>
                    <p style="margin-top: 15px;"><strong>대응:</strong> 지속적 지원, 문서화 강화</p>
                </div>
            </div>
            
            <div class="insight-box">
                <h3>🛡️ 리스크 완화 전략</h3>
                <ol>
                    <li>단계별 도입으로 리스크 분산</li>
                    <li>파일럿 프로젝트로 사전 검증</li>
                    <li>전문가 자문 및 외부 지원 활용</li>
                    <li>지속적 모니터링 및 피드백 체계</li>
                    <li>비상 계획 및 롤백 전략 수립</li>
                </ol>
            </div>
            
            <div class="page-number">18 / 24</div>
        </div>
    `;
  }

  private static generateGovernmentSupport(data: DiagnosisData): string {
    return `
        <div class="page">
            <div class="page-header">
                <div class="page-title">정부 지원 프로그램</div>
                <div class="page-subtitle">Government Support Programs</div>
            </div>
            
            <div class="n8n-solution">
                <h3>💰 활용 가능한 정부 지원 사업</h3>
                
                <div style="margin: 20px 0; padding: 20px; background: white; border-radius: 8px; border-left: 4px solid #3b82f6;">
                    <h4>1. 디지털 뉴딜 2.0</h4>
                    <p><strong>지원 내용:</strong> AI 도입 비용 최대 70% 지원 (최대 2억원)</p>
                    <p><strong>대상:</strong> 중소·중견기업</p>
                    <p><strong>신청 시기:</strong> 연 2회 (3월, 9월)</p>
                </div>
                
                <div style="margin: 20px 0; padding: 20px; background: white; border-radius: 8px; border-left: 4px solid #22c55e;">
                    <h4>2. K-Digital Training</h4>
                    <p><strong>지원 내용:</strong> 직원 AI 교육 비용 100% 지원</p>
                    <p><strong>대상:</strong> 재직자</p>
                    <p><strong>신청 시기:</strong> 상시</p>
                </div>
                
                <div style="margin: 20px 0; padding: 20px; background: white; border-radius: 8px; border-left: 4px solid #f59e0b;">
                    <h4>3. AI 바우처 사업</h4>
                    <p><strong>지원 내용:</strong> AI 솔루션 도입 비용 최대 3억원</p>
                    <p><strong>대상:</strong> AI 도입 희망 기업</p>
                    <p><strong>신청 시기:</strong> 연 1회 (5월)</p>
                </div>
                
                <div style="margin: 20px 0; padding: 20px; background: white; border-radius: 8px; border-left: 4px solid #8b5cf6;">
                    <h4>4. 데이터 바우처 사업</h4>
                    <p><strong>지원 내용:</strong> 데이터 구매·가공 비용 최대 7천만원</p>
                    <p><strong>대상:</strong> 데이터 활용 기업</p>
                    <p><strong>신청 시기:</strong> 연 1회 (4월)</p>
                </div>
            </div>
            
            <div class="insight-box">
                <h3>📋 신청 전략</h3>
                <p>AICAMP가 정부 지원 사업 신청을 전액 지원합니다. 평균 선정률 85% 이상!</p>
            </div>
            
            <div class="page-number">19 / 24</div>
        </div>
    `;
  }

  private static generateTrendAnalysis(data: DiagnosisData): string {
    return `
        <div class="page">
            <div class="page-header">
                <div class="page-title">2025 AI 트렌드 분석</div>
                <div class="page-subtitle">AI Technology Trends</div>
            </div>
            
            <div class="insight-box">
                <h3>🔮 2025년 핵심 AI 트렌드</h3>
                <ol>
                    <li><strong>생성형 AI 대중화:</strong> GPT-4, Claude 3 등 대화형 AI의 업무 통합</li>
                    <li><strong>멀티모달 AI:</strong> 텍스트, 이미지, 음성, 영상 통합 처리</li>
                    <li><strong>Edge AI:</strong> 디바이스 기반 실시간 AI 처리</li>
                    <li><strong>AutoML 확산:</strong> 코딩 없이 AI 모델 개발</li>
                    <li><strong>AI 에이전트:</strong> 자율적으로 작업을 수행하는 AI</li>
                </ol>
            </div>
            
            <div class="n8n-solution">
                <h3>🚀 n8n과 AI 트렌드 결합</h3>
                <ul>
                    <li><strong>생성형 AI + n8n:</strong> ChatGPT/Claude API를 n8n으로 연결하여 콘텐츠 자동 생성</li>
                    <li><strong>멀티모달 처리:</strong> 이미지 인식 + 텍스트 분석을 하나의 워크플로우로</li>
                    <li><strong>실시간 자동화:</strong> 웹훅과 Edge AI 결합으로 즉각 대응</li>
                    <li><strong>노코드 AI:</strong> n8n으로 복잡한 AI 파이프라인을 드래그앤드롭으로 구축</li>
                </ul>
            </div>
            
            <div class="motivation-box">
                <h3>💡 시장 전망</h3>
                <p><strong>국내 AI 시장:</strong> 2025년 15조원 규모, 연평균 25% 성장</p>
                <p><strong>기업 AI 도입률:</strong> 2024년 35% → 2027년 80% 예상</p>
                <p><strong>n8n 사용 기업:</strong> 전 세계 50만개 기업, 매년 200% 성장</p>
            </div>
            
            <div class="page-number">20 / 24</div>
        </div>
    `;
  }

  private static generateSuccessStories(data: DiagnosisData, industry: string): string {
    return `
        <div class="page">
            <div class="page-header">
                <div class="page-title">성공 사례</div>
                <div class="page-subtitle">Success Stories in ${industry}</div>
            </div>
            
            <div class="insight-box">
                <h3>🏆 ${industry} 업계 AI 성공 사례</h3>
                ${this.getIndustrySuccessStories(industry)}
            </div>
            
            <div class="n8n-solution">
                <h3>🌟 n8n 자동화 성공 사례</h3>
                <div style="margin: 20px 0;">
                    <h4>사례 1: A사 (제조업, 직원 200명)</h4>
                    <p><strong>도입 내용:</strong> n8n으로 생산 데이터 자동 수집 및 품질 예측</p>
                    <p><strong>성과:</strong> 불량률 65% 감소, 연간 5억원 절감</p>
                </div>
                
                <div style="margin: 20px 0;">
                    <h4>사례 2: B사 (서비스업, 직원 50명)</h4>
                    <p><strong>도입 내용:</strong> 고객 문의 자동 분류 및 응답 시스템</p>
                    <p><strong>성과:</strong> 응답 시간 80% 단축, 고객 만족도 45% 향상</p>
                </div>
                
                <div style="margin: 20px 0;">
                    <h4>사례 3: C사 (IT기업, 직원 100명)</h4>
                    <p><strong>도입 내용:</strong> 개발 파이프라인 자동화 및 모니터링</p>
                    <p><strong>성과:</strong> 배포 시간 90% 단축, 장애 발생률 75% 감소</p>
                </div>
            </div>
            
            <div class="motivation-box">
                <h3>💡 성공 요인 분석</h3>
                <ul>
                    <li>경영진의 강력한 의지와 지원</li>
                    <li>단계별 접근과 Quick Win 창출</li>
                    <li>전 직원 참여와 교육</li>
                    <li>n8n을 통한 빠른 프로토타이핑</li>
                    <li>지속적인 개선과 확산</li>
                </ul>
            </div>
            
            <div class="page-number">21 / 24</div>
        </div>
    `;
  }

  private static generateAICampCurriculum(data: DiagnosisData): string {
    const score = data.scores.percentage;
    let recommendedCourses = [];
    
    if (score < 50) {
      recommendedCourses = [
        { title: 'AI 기초 이해', duration: '8시간', level: '입문' },
        { title: 'n8n 기초 워크플로우', duration: '12시간', level: '초급' },
        { title: 'ChatGPT 업무 활용', duration: '8시간', level: '초급' }
      ];
    } else if (score < 70) {
      recommendedCourses = [
        { title: 'n8n 고급 자동화', duration: '16시간', level: '중급' },
        { title: 'AI API 통합 실무', duration: '20시간', level: '중급' },
        { title: 'AI 프로젝트 관리', duration: '12시간', level: '중급' }
      ];
    } else {
      recommendedCourses = [
        { title: 'AI 전략 수립', duration: '16시간', level: '고급' },
        { title: 'MLOps 구축 실무', duration: '24시간', level: '고급' },
        { title: 'AI 거버넌스', duration: '12시간', level: '고급' }
      ];
    }
    
    return `
        <div class="page">
            <div class="page-header">
                <div class="page-title">AICAMP 맞춤 커리큘럼</div>
                <div class="page-subtitle">Customized Education Program</div>
            </div>
            
            <div class="motivation-box">
                <h3>🎓 ${data.companyInfo.name} 맞춤 교육 과정</h3>
                <p>진단 결과 ${score}%에 최적화된 교육 프로그램을 추천합니다.</p>
            </div>
            
            <div class="chart-grid">
                ${recommendedCourses.map(course => `
                    <div style="background: white; padding: 20px; border-radius: 8px; border: 2px solid #3b82f6;">
                        <h4>${course.title}</h4>
                        <p><strong>교육 시간:</strong> ${course.duration}</p>
                        <p><strong>난이도:</strong> ${course.level}</p>
                        <p style="margin-top: 10px;">실습 중심의 실무 교육으로 즉시 적용 가능한 스킬 습득</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="n8n-solution">
                <h3>🚀 n8n 전문 과정 (필수 추천)</h3>
                <ol>
                    <li><strong>n8n 마스터 과정 (40시간):</strong> 기초부터 고급까지 완벽 마스터</li>
                    <li><strong>n8n + AI 통합 (24시간):</strong> ChatGPT, Claude API 연동 실무</li>
                    <li><strong>n8n 아키텍처 설계 (16시간):</strong> 전사 자동화 시스템 설계</li>
                </ol>
            </div>
            
            <div class="insight-box">
                <h3>💰 교육 투자 효과</h3>
                <p><strong>투자:</strong> 인당 200만원 (정부 지원 시 60만원)</p>
                <p><strong>효과:</strong> 교육 후 3개월 내 생산성 40% 향상</p>
                <p><strong>ROI:</strong> 6개월 내 300% 투자 회수</p>
            </div>
            
            <div class="page-number">22 / 24</div>
        </div>
    `;
  }

  private static generateHighEngagementStrategy(data: DiagnosisData, motivation: any): string {
    return `
        <div class="page">
            <div class="page-header">
                <div class="page-title">고몰입 조직 구축 전략</div>
                <div class="page-subtitle">High-Engagement Organization Strategy</div>
            </div>
            
            <div class="motivation-box">
                <h3>${motivation.title}</h3>
                <p style="font-size: 18px; margin-top: 15px;">${motivation.message}</p>
                <p style="font-size: 16px; margin-top: 10px; font-weight: 600;">${motivation.action}</p>
                <p style="font-size: 20px; margin-top: 20px; color: #1e3a8a;">
                    <strong>다음 목표: ${motivation.nextLevel}</strong>
                </p>
            </div>
            
            <div class="n8n-solution">
                <h3>🎯 고몰입 조직 구축 5단계 전략</h3>
                
                <div style="margin: 15px 0; padding: 15px; background: white; border-radius: 8px;">
                    <h4>1단계: 비전 공유와 동기부여</h4>
                    <p>AI가 가져올 변화와 기회를 전 직원과 공유하고 참여 유도</p>
                </div>
                
                <div style="margin: 15px 0; padding: 15px; background: white; border-radius: 8px;">
                    <h4>2단계: Quick Win 창출</h4>
                    <p>n8n으로 즉시 체감할 수 있는 성과를 만들어 신뢰 구축</p>
                </div>
                
                <div style="margin: 15px 0; padding: 15px; background: white; border-radius: 8px;">
                    <h4>3단계: 전사 참여 확대</h4>
                    <p>부서별 AI 챔피언 양성, 성공 사례 공유회 정기 개최</p>
                </div>
                
                <div style="margin: 15px 0; padding: 15px; background: white; border-radius: 8px;">
                    <h4>4단계: 문화 정착</h4>
                    <p>AI 활용을 일상화하고 지속적 혁신 문화 구축</p>
                </div>
                
                <div style="margin: 15px 0; padding: 15px; background: white; border-radius: 8px;">
                    <h4>5단계: 리더십 확보</h4>
                    <p>업계 AI 선도기업으로서 생태계 주도</p>
                </div>
            </div>
            
            <div class="insight-box">
                <h3>💪 동기부여 핵심 메시지</h3>
                <p style="font-size: 18px; text-align: center; margin: 20px 0;">
                    "AI는 일자리를 빼앗는 것이 아니라,<br>
                    더 가치 있는 일에 집중할 수 있게 해주는 도구입니다.<br>
                    n8n과 함께라면 누구나 AI 전문가가 될 수 있습니다!"
                </p>
            </div>
            
            <div class="page-number">23 / 24</div>
        </div>
    `;
  }

  private static generateConclusion(data: DiagnosisData, motivation: any): string {
    return `
        <div class="page">
            <div class="page-header">
                <div class="page-title">결론 및 다음 단계</div>
                <div class="page-subtitle">Conclusion & Next Steps</div>
            </div>
            
            <div class="insight-box" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                <h3 style="color: white;">🎯 핵심 메시지</h3>
                <p style="font-size: 20px; margin-top: 20px;">
                    ${data.companyInfo.name}은 AI 역량 개발의 <strong>황금 시기</strong>에 있습니다.
                </p>
                <p style="font-size: 18px; margin-top: 15px;">
                    지금 시작하면 6개월 내에 <strong>업계 선도기업</strong>으로 도약할 수 있습니다.
                </p>
            </div>
            
            <div class="n8n-solution">
                <h3>⚡ 즉시 실행 액션 (Next 48 Hours)</h3>
                <ol>
                    <li><strong>무료 컨설팅 신청:</strong> AICAMP 전문가와 1:1 상담 (2시간)</li>
                    <li><strong>n8n 데모 체험:</strong> 실제 업무에 적용 가능한 시나리오 시연</li>
                    <li><strong>파일럿 프로젝트 선정:</strong> Quick Win 창출 가능한 프로세스 선택</li>
                    <li><strong>교육 일정 확정:</strong> 핵심 인력 대상 n8n 기초 교육 (8시간)</li>
                    <li><strong>정부 지원 사업 신청:</strong> AI 바우처 사업 신청서 작성</li>
                </ol>
            </div>
            
            <div class="motivation-box">
                <h3>💡 이교장의 마지막 한마디</h3>
                <p style="font-size: 16px; font-style: italic;">
                    "AI 도입은 선택이 아닌 필수입니다. 
                    하지만 두려워하지 마세요. 
                    n8n과 AICAMP가 함께 하겠습니다. 
                    작은 한 걸음이 큰 도약의 시작입니다. 
                    지금 바로 시작하세요!"
                </p>
            </div>
            
            <div style="background: #f3f4f6; padding: 30px; border-radius: 12px; text-align: center; margin-top: 40px;">
                <h3>📞 문의 및 상담</h3>
                <p style="font-size: 18px; margin: 15px 0;">
                    <strong>AICAMP AI 역량진단 센터</strong>
                </p>
                <p>📧 이메일: hongik423@gmail.com</p>
                <p>🌐 웹사이트: aicamp.club</p>
                <p>📱 전화: 010-9251-9743</p>
                <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">
                    본 보고서는 McKinsey 방법론과 n8n 자동화 전문성을 결합한<br>
                    AICAMP만의 독자적인 AI 역량진단 시스템으로 작성되었습니다.
                </p>
            </div>
            
            <div class="page-number">24 / 24</div>
        </div>
    `;
  }

  private static getScoreClass(percentage: number): string {
    if (percentage >= 85) return 'excellent';
    if (percentage >= 70) return 'good';
    if (percentage >= 50) return 'average';
    return 'poor';
  }

  // 헬퍼 메서드들
  private static getTopCategory(data: DiagnosisData): string {
    const categories = Object.entries(data.scores.categoryScores);
    const top = categories.reduce((a, b) => a[1] > b[1] ? a : b);
    return this.CATEGORY_DETAILS[top[0]]?.name || '인적 자원';
  }

  private static getBottomCategory(data: DiagnosisData): string {
    const categories = Object.entries(data.scores.categoryScores);
    const bottom = categories.reduce((a, b) => a[1] < b[1] ? a : b);
    return this.CATEGORY_DETAILS[bottom[0]]?.name || '데이터 관리';
  }

  private static getCategoryImprovement(category: string, percentage: number): string {
    if (percentage >= 80) {
      return '이미 우수한 수준입니다. 현재 강점을 유지하면서 다른 영역과의 시너지를 창출하세요.';
    } else if (percentage >= 60) {
      return '양호한 수준이지만 개선 여지가 있습니다. n8n 자동화를 통해 빠른 향상이 가능합니다.';
    } else if (percentage >= 40) {
      return '개선이 필요한 영역입니다. 체계적인 교육과 단계별 접근으로 역량을 강화하세요.';
    } else {
      return '시급한 개선이 필요합니다. 기초부터 차근차근 구축하여 견고한 기반을 만드세요.';
    }
  }

  private static getStrengths(data: DiagnosisData): string[] {
    const strengths = [];
    const scores = data.scores.categoryScores;
    
    if (scores.businessFoundation > 30) strengths.push('경영진의 AI 인식 수준 양호');
    if (scores.currentAI > 30) strengths.push('AI 도구 활용 경험 보유');
    if (scores.organizationReadiness > 30) strengths.push('조직의 변화 수용성 높음');
    if (scores.technologyInfrastructure > 30) strengths.push('기본 IT 인프라 구축');
    if (scores.dataManagement > 30) strengths.push('데이터 활용 인식 존재');
    if (scores.humanResources > 30) strengths.push('학습 의지가 높은 인재 보유');
    
    return strengths.length > 0 ? strengths : ['AI 도입 의지와 관심'];
  }

  private static getWeaknesses(data: DiagnosisData): string[] {
    const weaknesses = [];
    const scores = data.scores.categoryScores;
    
    if (scores.businessFoundation <= 30) weaknesses.push('AI 전략 및 비전 부재');
    if (scores.currentAI <= 30) weaknesses.push('AI 활용 경험 부족');
    if (scores.organizationReadiness <= 30) weaknesses.push('변화 관리 체계 미흡');
    if (scores.technologyInfrastructure <= 30) weaknesses.push('기술 인프라 현대화 필요');
    if (scores.dataManagement <= 30) weaknesses.push('데이터 관리 체계 미흡');
    if (scores.humanResources <= 30) weaknesses.push('AI 전문 인력 부족');
    
    return weaknesses.length > 0 ? weaknesses : ['체계적인 AI 도입 계획 필요'];
  }

  private static getIndustrySuccessStories(industry: string): string {
    const stories = {
      'IT/소프트웨어': `
        <ul>
          <li><strong>네이버:</strong> 하이퍼클로바X 개발로 AI 플랫폼 리더십 확보</li>
          <li><strong>카카오:</strong> AI 기반 추천 시스템으로 사용자 체류 시간 40% 증가</li>
          <li><strong>토스:</strong> AI 신용평가로 대출 승인율 30% 향상</li>
        </ul>
      `,
      '제조업': `
        <ul>
          <li><strong>삼성전자:</strong> AI 품질 검사로 불량률 50% 감소</li>
          <li><strong>LG화학:</strong> AI 수요 예측으로 재고 비용 25% 절감</li>
          <li><strong>포스코:</strong> AI 기반 설비 예지보전으로 가동률 15% 향상</li>
        </ul>
      `,
      '서비스업': `
        <ul>
          <li><strong>배달의민족:</strong> AI 추천으로 주문 전환율 35% 증가</li>
          <li><strong>야놀자:</strong> AI 가격 최적화로 매출 20% 성장</li>
          <li><strong>당근마켓:</strong> AI 이미지 인식으로 사기 거래 80% 차단</li>
        </ul>
      `,
      '금융업': `
        <ul>
          <li><strong>KB국민은행:</strong> AI 상담사로 상담 처리 시간 60% 단축</li>
          <li><strong>신한카드:</strong> AI 이상거래 탐지로 사기 손실 70% 감소</li>
          <li><strong>카카오뱅크:</strong> AI 신용평가로 연체율 40% 개선</li>
        </ul>
      `,
      '유통/소매업': `
        <ul>
          <li><strong>쿠팡:</strong> AI 물류 최적화로 배송 시간 50% 단축</li>
          <li><strong>SSG닷컴:</strong> AI 수요 예측으로 폐기율 35% 감소</li>
          <li><strong>무신사:</strong> AI 추천으로 구매 전환율 45% 향상</li>
        </ul>
      `
    };
    
    return stories[industry] || stories['IT/소프트웨어'];
  }

  /**
   * 🔥 V22.6 업종별 고급 분석 (IndustryDataService 완벽 통합)
   */
  private static getAdvancedIndustryAnalysis(industry: string, data: DiagnosisData) {
    try {
      console.log('🔍 업종별 고급 분석 시작:', industry);
      
      // 기본 업종 데이터
      const industryData = this.INDUSTRY_INSIGHTS[industry] || this.INDUSTRY_INSIGHTS['IT/소프트웨어'];
      
      // IndustryDataService 고급 분석 시도
      let industryInsights = null;
      try {
        // IndustryDataService 고급 분석 시도 (안전한 방식)
        if (IndustryDataService && typeof IndustryDataService.generateIndustryInsights === 'function') {
          industryInsights = IndustryDataService.generateIndustryInsights(industry, {
            companyName: data.companyInfo.name,
            totalScore: data.scores.total,
            categoryScores: data.scores.categoryScores,
            employeeCount: data.companyInfo.size,
            industry: industry,
            revenue: data.companyInfo.revenue
          });
          
          console.log('✅ IndustryDataService 고급 분석 완료:', industryInsights);
        } else {
          console.log('ℹ️ IndustryDataService 사용 불가, 기본 분석 사용');
        }
      } catch (serviceError) {
        console.warn('⚠️ IndustryDataService 실행 오류, 기본 분석 사용:', serviceError);
      }

      // 기본 분석과 고급 분석 결합
      const combinedAnalysis = {
        ...industryData,
        advancedInsights: industryInsights,
        hasAdvancedAnalysis: !!industryInsights,
        industry: industry,
        analysisLevel: industryInsights ? 'premium' : 'standard'
      };

      console.log('🔍 업종별 통합 분석 완료:', {
        업종: industry,
        분석레벨: combinedAnalysis.analysisLevel,
        고급분석: !!industryInsights
      });

      return combinedAnalysis;
    } catch (error) {
      console.warn('⚠️ 업종별 고급 분석 실패, 기본 분석 사용:', error);
      return {
        ...this.INDUSTRY_INSIGHTS[industry] || this.INDUSTRY_INSIGHTS['IT/소프트웨어'],
        insights: null,
        hasAdvancedAnalysis: false,
        industry: industry,
        analysisLevel: 'basic'
      };
    }
  }

  /**
   * 업종별 가중치 조회 (IndustryDataService 연동)
   */
  private static getIndustryWeights(industry: string) {
    try {
      // IndustryDataService에서 가중치 조회 시도
      let weights = null;
      try {
        // IndustryDataService에서 가중치 조회 시도 (안전한 방식)
        if (IndustryDataService && typeof IndustryDataService.getIndustryWeights === 'function') {
          weights = IndustryDataService.getIndustryWeights(industry);
          console.log('✅ IndustryDataService 가중치 조회 완료:', weights);
        } else {
          console.log('ℹ️ IndustryDataService 가중치 조회 불가, 기본값 사용');
        }
      } catch (serviceError) {
        console.warn('⚠️ IndustryDataService 가중치 조회 실패, 기본값 사용:', serviceError);
      }

      // 기본 가중치 (IndustryDataService 실패 시)
      if (!weights) {
        const defaultWeights: Record<string, { ai: number; practical: number }> = {
          'IT/소프트웨어': { ai: 0.7, practical: 0.3 },
          '제조업': { ai: 0.5, practical: 0.5 },
          '금융/보험': { ai: 0.6, practical: 0.4 },
          '유통/물류': { ai: 0.5, practical: 0.5 },
          '의료/헬스케어': { ai: 0.6, practical: 0.4 },
          '교육/에듀테크': { ai: 0.5, practical: 0.5 },
          '부동산/건설': { ai: 0.4, practical: 0.6 },
          '미디어/엔터테인먼트': { ai: 0.6, practical: 0.4 },
          '전문서비스': { ai: 0.5, practical: 0.5 },
          '공공/정부': { ai: 0.4, practical: 0.6 }
        };
        
        weights = defaultWeights[industry] || { ai: 0.5, practical: 0.5 };
      }
      
      return weights;
    } catch (error) {
      console.warn('⚠️ 업종별 가중치 조회 실패, 기본값 사용:', error);
      return { ai: 0.5, practical: 0.5 };
    }
  }

  /**
   * 고급 벤치마크 분석 (업종별 맞춤형 + IndustryDataService)
   */
  private static generateAdvancedBenchmarkAnalysis(data: DiagnosisData, industryData: any, industryInsights: any): string {
    const industry = data.companyInfo.industry || 'IT/소프트웨어';
    const basicBenchmark = industryData.benchmarks;
    const advancedAnalysis = industryInsights.hasAdvancedAnalysis ? industryInsights.advancedInsights : null;
    const weights = this.getIndustryWeights(industry);

    return `
    <div class="slide" id="slide4">
        <div class="slide-header">
            <h1 class="slide-title">업종별 벤치마크 분석</h1>
            <p class="slide-subtitle">${industry} 특화 성과 비교 (V22.6 고급 분석)</p>
        </div>
        
        <div class="premium-card">
            <h3 style="color: #2d3748; margin-bottom: 20px;">🏆 ${industry} 업종 벤치마크</h3>
            
            <div class="score-grid">
                <div class="score-item">
                    <div class="score-value">${data.scores.percentage}%</div>
                    <div class="score-label">귀사 점수</div>
                </div>
                <div class="score-item" style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);">
                    <div class="score-value">${basicBenchmark.average}%</div>
                    <div class="score-label">업종 평균</div>
                </div>
                <div class="score-item" style="background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);">
                    <div class="score-value">${basicBenchmark.top10}%</div>
                    <div class="score-label">상위 10%</div>
                </div>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 12px;">
                <h4 style="color: #2d3748; margin-bottom: 15px;">⚖️ 업종별 AI vs 실무 가중치</h4>
                <div style="display: flex; gap: 20px; margin-top: 15px;">
                    <div style="flex: 1; text-align: center;">
                        <div style="font-size: 24px; font-weight: bold; color: #667eea;">${Math.round(weights.ai * 100)}%</div>
                        <div style="color: #4a5568;">AI 기술 역량</div>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <div style="font-size: 24px; font-weight: bold; color: #48bb78;">${Math.round(weights.practical * 100)}%</div>
                        <div style="color: #4a5568;">실무 적용 역량</div>
                    </div>
                </div>
            </div>
            
            ${advancedAnalysis ? `
            <div style="margin-top: 30px;">
                <h4 style="color: #2d3748; margin-bottom: 15px;">📊 IndustryDataService 고급 분석</h4>
                <p style="line-height: 1.8; color: #4a5568;">${advancedAnalysis.overview || ''}</p>
                
                <div style="margin-top: 20px;">
                    <h5 style="color: #667eea; margin-bottom: 10px;">🔍 시장 분석</h5>
                    <p style="line-height: 1.8; color: #4a5568;">${advancedAnalysis.marketAnalysis || ''}</p>
                </div>
                
                <div style="margin-top: 20px;">
                    <h5 style="color: #667eea; margin-bottom: 10px;">🚀 성장 기회</h5>
                    <ul style="color: #4a5568; line-height: 1.8;">
                        ${(advancedAnalysis.growthOpportunities || []).slice(0, 3).map(opp => `<li>${opp}</li>`).join('')}
                    </ul>
                </div>
            </div>
            ` : ''}
            
            <div style="margin-top: 30px;">
                <h4 style="color: #2d3748; margin-bottom: 15px;">📈 성과 분석</h4>
                <p style="line-height: 1.8; color: #4a5568;">
                    ${data.scores.percentage >= basicBenchmark.average ? 
                      `🎉 축하합니다! 귀사는 ${industry} 업종 평균(${basicBenchmark.average}%)을 ${data.scores.percentage - basicBenchmark.average}%p 상회하는 우수한 성과를 보이고 있습니다.` :
                      `📈 귀사는 ${industry} 업종 평균(${basicBenchmark.average}%)보다 ${basicBenchmark.average - data.scores.percentage}%p 낮은 수준으로, 체계적인 개선이 필요합니다.`
                    }
                </p>
                
                <p style="line-height: 1.8; color: #4a5568; margin-top: 15px;">
                    ${industry} 업종은 연평균 ${basicBenchmark.growth} 성장률을 보이며, 
                    AI 역량 강화가 경쟁 우위 확보의 핵심 요소로 부상하고 있습니다.
                </p>
            </div>
        </div>
    </div>`;
  }
}
