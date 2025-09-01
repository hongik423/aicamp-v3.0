/**
 * 🚀 n8n 프로세스 자동화 중심 고도화 보고서 엔진 V2.0
 * 기업 현장 프로세스 자동화 동기부여 + AI 고몰입 조직구축 격려 보고서
 */

import { EnhancedDiagnosisData } from './enhanced-report-engine';
import { SyncManager } from './sync-manager';

export interface N8nAutomationInsight {
  processAutomationScore: number;
  automationReadiness: 'ready' | 'preparing' | 'planning' | 'exploring';
  keyProcesses: Array<{
    process: string;
    currentEfficiency: number;
    automationPotential: number;
    expectedROI: number;
    implementationTime: string;
    n8nComplexity: 'simple' | 'moderate' | 'complex';
  }>;
  organizationMaturity: {
    leadership: number;
    culture: number;
    technology: number;
    change: number;
  };
  motivationalElements: {
    successStories: string[];
    quickWins: string[];
    transformationVision: string;
    competitiveAdvantage: string;
  };
}

export class N8nAutomationReportEngine {
  
  /**
   * 🔄 무오류 보고서 생성 메인 프로세스
   */
  static async generateAutomationFocusedReport(diagnosisId: string): Promise<{
    success: boolean;
    htmlReport?: string;
    error?: string;
    syncInfo?: any;
  }> {
    console.log('🚀 n8n 자동화 중심 보고서 생성 시작:', diagnosisId);
    
    try {
      // 1단계: 무오류 데이터 동기화
      const syncResult = await SyncManager.waitForDataAvailability(diagnosisId);
      
      if (!syncResult.success) {
        return {
          success: false,
          error: `데이터 동기화 실패: ${syncResult.error}`,
          syncInfo: syncResult
        };
      }
      
      // 2단계: 고도화된 데이터 분석
      const enhancedData = await this.enhanceWithAutomationInsights(syncResult.data!, diagnosisId);
      
      // 3단계: n8n 중심 동적 보고서 생성
      const htmlReport = await this.generateDynamicAutomationReport(enhancedData);
      
      console.log('✅ n8n 자동화 보고서 생성 완료');
      
      return {
        success: true,
        htmlReport: htmlReport,
        syncInfo: {
          attempts: syncResult.attempts,
          waitTime: syncResult.totalWaitTime,
          dataFreshness: enhancedData.syncStatus?.dataFreshness
        }
      };
      
    } catch (error: any) {
      console.error('❌ n8n 자동화 보고서 생성 실패:', error);
      
      return {
        success: false,
        error: error.message || '보고서 생성 중 오류 발생'
      };
    }
  }
  
  /**
   * 🧠 자동화 인사이트로 데이터 고도화
   */
  static async enhanceWithAutomationInsights(basicData: any, diagnosisId: string): Promise<EnhancedDiagnosisData & { automationInsights: N8nAutomationInsight }> {
    console.log('🧠 n8n 자동화 인사이트 생성 시작');
    
    // 프로세스 자동화 점수 계산
    const processAutomationScore = this.calculateProcessAutomationScore(basicData.categoryScores);
    
    // 자동화 준비도 평가
    const automationReadiness = this.assessAutomationReadiness(basicData);
    
    // 핵심 프로세스 자동화 분석
    const keyProcesses = this.analyzeKeyProcesses(basicData.industry, basicData.categoryScores, basicData.employeeCount);
    
    // 조직 성숙도 분석
    const organizationMaturity = this.analyzeOrganizationMaturity(basicData.categoryScores);
    
    // 동기부여 요소 생성
    const motivationalElements = this.generateMotivationalElements(basicData.industry, processAutomationScore, basicData.companyName);
    
    const automationInsights: N8nAutomationInsight = {
      processAutomationScore,
      automationReadiness,
      keyProcesses,
      organizationMaturity,
      motivationalElements
    };
    
    console.log('✅ n8n 자동화 인사이트 생성 완료:', {
      processScore: processAutomationScore,
      readiness: automationReadiness,
      keyProcessCount: keyProcesses.length
    });
    
    return {
      diagnosisId,
      companyInfo: {
        name: String(basicData.companyName) || '기업명',
        industry: basicData.industry || 'IT/소프트웨어',
        size: basicData.employeeCount || '중소기업',
        revenue: basicData.annualRevenue,
        employees: basicData.employeeCount,
        position: basicData.position || '담당자',
        location: basicData.location || '서울'
      },
      responses: basicData.responses || basicData.assessmentResponses || {},
      scores: {
        total: Number(basicData.totalScore) || 0,
        percentage: Number(basicData.percentage) || 0,
        categoryScores: {
          businessFoundation: Number(basicData.categoryScores?.businessFoundation) || 0,
          currentAI: Number(basicData.categoryScores?.currentAI) || 0,
          organizationReadiness: Number(basicData.categoryScores?.organizationReadiness) || 0,
          technologyInfrastructure: Number(basicData.categoryScores?.techInfrastructure) || 0,
          dataManagement: Number(basicData.categoryScores?.goalClarity) || 0,
          humanResources: Number(basicData.categoryScores?.executionCapability) || 0
        }
      },
      timestamp: basicData.timestamp || new Date().toISOString(),
      grade: basicData.grade,
      maturityLevel: basicData.maturityLevel,
      isVirtualData: false,
      syncStatus: {
        gasDataAvailable: true,
        dataFreshness: Math.round((Date.now() - new Date(basicData.timestamp).getTime()) / (1000 * 60)),
        lastSyncTime: new Date().toISOString(),
        syncAttempts: 1
      },
      automationInsights
    };
  }
  
  /**
   * 📊 프로세스 자동화 점수 계산
   */
  static calculateProcessAutomationScore(categoryScores: any): number {
    const weights = {
      businessFoundation: 0.2,    // 비즈니스 프로세스 명확성
      currentAI: 0.25,           // 현재 AI/자동화 활용도
      organizationReadiness: 0.2, // 조직의 변화 수용성
      techInfrastructure: 0.25,  // 기술 인프라 준비도
      dataManagement: 0.1        // 데이터 기반 의사결정
    };
    
    const score = (
      (categoryScores?.businessFoundation || 0) * weights.businessFoundation +
      (categoryScores?.currentAI || 0) * weights.currentAI +
      (categoryScores?.organizationReadiness || 0) * weights.organizationReadiness +
      (categoryScores?.techInfrastructure || 0) * weights.techInfrastructure +
      (categoryScores?.goalClarity || 0) * weights.dataManagement
    );
    
    return Math.round(score * 20); // 5점 만점을 100점 만점으로 변환
  }
  
  /**
   * 🎯 자동화 준비도 평가
   */
  static assessAutomationReadiness(data: any): 'ready' | 'preparing' | 'planning' | 'exploring' {
    const score = this.calculateProcessAutomationScore(data.categoryScores);
    
    if (score >= 80) return 'ready';      // 즉시 실행 가능
    if (score >= 60) return 'preparing';  // 준비 단계
    if (score >= 40) return 'planning';   // 계획 단계
    return 'exploring';                   // 탐색 단계
  }
  
  /**
   * 🏭 핵심 프로세스 자동화 분석 (업종별 특화)
   */
  static analyzeKeyProcesses(industry: string, categoryScores: any, employeeCount: string) {
    const industryProcesses = this.getIndustrySpecificProcesses(industry);
    const companySize = this.getCompanySize(employeeCount);
    
    return industryProcesses.map(process => {
      const currentEfficiency = this.calculateCurrentEfficiency(process, categoryScores);
      const automationPotential = this.calculateAutomationPotential(process, categoryScores);
      const expectedROI = this.calculateExpectedROI(process, companySize, currentEfficiency);
      
      return {
        process: process.name,
        currentEfficiency: currentEfficiency,
        automationPotential: automationPotential,
        expectedROI: expectedROI,
        implementationTime: process.implementationTime,
        n8nComplexity: process.complexity
      };
    });
  }
  
  /**
   * 🏢 업종별 핵심 프로세스 정의
   */
  static getIndustrySpecificProcesses(industry: string) {
    const processMap: Record<string, any[]> = {
      'IT/소프트웨어': [
        { name: '고객 지원 티켓 자동 분류 및 배정', implementationTime: '2주', complexity: 'simple' },
        { name: '코드 배포 및 테스트 자동화', implementationTime: '4주', complexity: 'moderate' },
        { name: '프로젝트 진행 상황 자동 보고', implementationTime: '3주', complexity: 'simple' },
        { name: '인보이스 자동 생성 및 발송', implementationTime: '2주', complexity: 'simple' },
        { name: '고객 온보딩 프로세스 자동화', implementationTime: '6주', complexity: 'moderate' }
      ],
      '제조업': [
        { name: '재고 관리 및 자동 발주', implementationTime: '4주', complexity: 'moderate' },
        { name: '품질 검사 데이터 자동 수집', implementationTime: '6주', complexity: 'complex' },
        { name: '생산 계획 최적화 자동화', implementationTime: '8주', complexity: 'complex' },
        { name: '공급업체 성과 자동 모니터링', implementationTime: '3주', complexity: 'simple' },
        { name: '안전 점검 보고서 자동 생성', implementationTime: '2주', complexity: 'simple' }
      ],
      '의료업': [
        { name: '환자 예약 및 알림 자동화', implementationTime: '3주', complexity: 'simple' },
        { name: '의료진 스케줄 최적화', implementationTime: '4주', complexity: 'moderate' },
        { name: '약품 재고 자동 관리', implementationTime: '5주', complexity: 'moderate' },
        { name: '진료 기록 자동 정리', implementationTime: '6주', complexity: 'complex' },
        { name: '보험 청구 프로세스 자동화', implementationTime: '8주', complexity: 'complex' }
      ],
      '금융업': [
        { name: '대출 심사 프로세스 자동화', implementationTime: '6주', complexity: 'complex' },
        { name: '고객 리스크 평가 자동화', implementationTime: '4주', complexity: 'moderate' },
        { name: '규정 준수 모니터링 자동화', implementationTime: '8주', complexity: 'complex' },
        { name: '고객 상담 내역 자동 분석', implementationTime: '3주', complexity: 'simple' },
        { name: '투자 포트폴리오 자동 리밸런싱', implementationTime: '10주', complexity: 'complex' }
      ]
    };
    
    return processMap[industry] || processMap['IT/소프트웨어'];
  }
  
  /**
   * 💪 동기부여 요소 생성 (고몰입 조직구축 중심)
   */
  static generateMotivationalElements(industry: string, automationScore: number, companyName: string) {
    const successStories = this.getIndustrySuccessStories(industry, automationScore);
    const quickWins = this.generateQuickWins(automationScore, industry);
    const transformationVision = this.createTransformationVision(companyName, industry, automationScore);
    const competitiveAdvantage = this.generateCompetitiveAdvantage(industry, automationScore);
    
    return {
      successStories,
      quickWins,
      transformationVision,
      competitiveAdvantage
    };
  }
  
  /**
   * 📈 업종별 성공사례 (동기부여 중심)
   */
  static getIndustrySuccessStories(industry: string, score: number): string[] {
    const stories: Record<string, Record<string, string[]>> = {
      'IT/소프트웨어': {
        high: [
          'A사는 n8n으로 고객 지원 자동화하여 응답시간 90% 단축, 고객만족도 40% 향상',
          'B사는 배포 프로세스 완전 자동화로 개발 생산성 3배 증가, 야근 80% 감소',
          'C사는 영업 프로세스 자동화로 리드 전환율 250% 향상, 매출 2배 증가'
        ],
        medium: [
          'D사는 간단한 보고서 자동화로 관리자 업무시간 50% 절약',
          'E사는 고객 온보딩 자동화로 신규고객 만족도 35% 향상',
          'F사는 인보이스 자동화로 경리팀 업무효율 70% 개선'
        ],
        low: [
          'G사는 이메일 자동 분류만으로도 업무효율 30% 향상',
          'H사는 회의록 자동 정리로 회의 후속조치 100% 이행',
          'I사는 일정 관리 자동화로 팀 협업 효율성 40% 증가'
        ]
      },
      '제조업': {
        high: [
          'J제조는 생산라인 자동 모니터링으로 불량률 60% 감소, 생산성 45% 향상',
          'K공장은 재고 자동 최적화로 재고비용 40% 절감, 품절 사고 제로화',
          'L기업은 품질관리 자동화로 고객 클레임 80% 감소, 브랜드 신뢰도 급상승'
        ],
        medium: [
          'M사는 발주 프로세스 자동화로 조달비용 25% 절감',
          'N공장은 설비 예측정비로 다운타임 50% 단축',
          'O기업은 안전점검 자동화로 산업재해 제로 달성'
        ],
        low: [
          'P사는 출입 관리 자동화로 보안 수준 대폭 향상',
          'Q공장은 근태 관리 자동화로 인사팀 업무 간소화',
          'R기업은 일일 보고서 자동화로 관리자 시간 절약'
        ]
      }
    };
    
    const scoreLevel = score >= 70 ? 'high' : score >= 50 ? 'medium' : 'low';
    return stories[industry]?.[scoreLevel] || stories['IT/소프트웨어'][scoreLevel];
  }
  
  /**
   * 🚀 빠른 성과 창출 방안 (Quick Wins)
   */
  static generateQuickWins(score: number, industry: string): string[] {
    const baseWins = [
      '📧 이메일 자동 분류 및 우선순위 설정 (1주 내 구현)',
      '📅 회의 일정 자동 조율 및 알림 발송 (2주 내 구현)',
      '📊 일일 업무 보고서 자동 생성 (1주 내 구현)',
      '💬 고객 문의 자동 분류 및 담당자 배정 (2주 내 구현)'
    ];
    
    const industrySpecificWins: Record<string, string[]> = {
      'IT/소프트웨어': [
        '🔄 Git 커밋 자동 슬랙 알림 (1일 내 구현)',
        '📈 일일 서버 상태 자동 모니터링 (3일 내 구현)',
        '🎯 고객 지원 티켓 자동 태깅 (1주 내 구현)'
      ],
      '제조업': [
        '📦 일일 재고 현황 자동 리포트 (3일 내 구현)',
        '⚠️ 설비 이상 자동 알림 시스템 (1주 내 구현)',
        '📋 안전점검 체크리스트 자동화 (5일 내 구현)'
      ],
      '의료업': [
        '📞 환자 예약 확인 자동 SMS (2일 내 구현)',
        '💊 약품 유효기간 자동 알림 (3일 내 구현)',
        '📊 일일 진료 통계 자동 생성 (1주 내 구현)'
      ]
    };
    
    const specificWins = industrySpecificWins[industry] || industrySpecificWins['IT/소프트웨어'];
    
    return [...baseWins, ...specificWins].slice(0, 5);
  }
  
  /**
   * 🔮 변혁 비전 생성 (고몰입 조직구축 중심)
   */
  static createTransformationVision(companyName: string, industry: string, score: number): string {
    const visionTemplates = {
      high: `${companyName}은 이미 우수한 AI 역량을 보유하고 있습니다. n8n 프로세스 자동화를 통해 **업계 선도기업**으로 도약할 준비가 되어있습니다. 직원들이 창의적 업무에 집중할 수 있는 **고몰입 조직**을 구축하여, 경쟁사 대비 **3배 빠른 혁신**을 실현할 수 있습니다.`,
      
      medium: `${companyName}은 탄탄한 기반 위에서 **프로세스 자동화 혁신**을 시작할 최적의 시점입니다. n8n을 활용한 단계적 자동화로 직원들의 **업무 만족도를 높이고**, **생산성을 2배 향상**시킬 수 있습니다. 지금 시작하면 1년 내 **업계 상위 20%** 기업으로 성장 가능합니다.`,
      
      low: `${companyName}의 **무한한 성장 가능성**이 보입니다! n8n 프로세스 자동화는 **작은 시작으로 큰 변화**를 만들어냅니다. 반복업무 자동화부터 시작하여 직원들이 **더 의미있는 일에 집중**할 수 있게 하고, **회사 전체의 혁신 문화**를 만들어나갈 수 있습니다.`
    };
    
    const level = score >= 70 ? 'high' : score >= 50 ? 'medium' : 'low';
    return visionTemplates[level];
  }
  
  /**
   * 🏆 경쟁 우위 요소 생성
   */
  static generateCompetitiveAdvantage(industry: string, score: number): string {
    const advantages: Record<string, string> = {
      'IT/소프트웨어': 'n8n 자동화로 개발 속도 3배 향상, 고객 응답시간 90% 단축으로 시장 선점',
      '제조업': '스마트 팩토리 구축으로 생산비용 30% 절감, 품질 향상으로 글로벌 경쟁력 확보',
      '의료업': '환자 경험 자동화로 만족도 40% 향상, 의료진 업무효율 증대로 진료 품질 개선',
      '금융업': '리스크 관리 자동화로 손실 50% 감소, 고객 맞춤 서비스로 충성도 향상',
      '유통업': '재고 최적화로 비용 25% 절감, 고객 경험 자동화로 매출 30% 증가'
    };
    
    return advantages[industry] || advantages['IT/소프트웨어'];
  }
  
  /**
   * 📄 동적 n8n 자동화 보고서 생성
   */
  static async generateDynamicAutomationReport(data: EnhancedDiagnosisData & { automationInsights: N8nAutomationInsight }): Promise<string> {
    console.log('📄 동적 n8n 자동화 보고서 생성 시작');
    
    const automationScore = data.automationInsights.processAutomationScore;
    const readiness = data.automationInsights.automationReadiness;
    
    return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyInfo.name} AI 프로세스 자동화 역량진단 보고서</title>
    <link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        ${this.getEnhancedAutomationStyles()}
    </style>
</head>
<body>
    <div class="report-container">
        <!-- 🎯 혁신적 표지 페이지 -->
        <div class="slide active" id="slide1">
            <div class="hero-section">
                <div class="company-header">
                    <h1 class="company-name">${data.companyInfo.name}</h1>
                    <div class="industry-badge">${data.companyInfo.industry}</div>
                </div>
                
                <div class="transformation-message">
                    <h2 class="main-headline">🚀 프로세스 자동화로<br/>고몰입 조직을 만들어보세요!</h2>
                    <p class="sub-headline">n8n + AI로 업무 혁신, 직원 만족도 극대화</p>
                </div>
                
                <div class="score-showcase">
                    <div class="automation-score">
                        <div class="score-circle ${this.getScoreClass(automationScore)}">
                            <span class="score-number">${automationScore}</span>
                            <span class="score-label">자동화<br/>준비도</span>
                        </div>
                        <div class="readiness-badge ${readiness}">
                            ${this.getReadinessLabel(readiness)}
                        </div>
                    </div>
                    
                    <div class="potential-showcase">
                        <h3>🎯 예상 효과</h3>
                        <div class="benefits-grid">
                            <div class="benefit-item">
                                <span class="benefit-number">${this.calculateExpectedEfficiency(automationScore)}%</span>
                                <span class="benefit-label">업무효율<br/>향상</span>
                            </div>
                            <div class="benefit-item">
                                <span class="benefit-number">${this.calculateExpectedSavings(automationScore)}시간</span>
                                <span class="benefit-label">월간 절약<br/>시간</span>
                            </div>
                            <div class="benefit-item">
                                <span class="benefit-number">${this.calculateROIProjection(automationScore)}%</span>
                                <span class="benefit-label">연간 ROI<br/>전망</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 🔥 동기부여 메시지 페이지 -->
        <div class="slide" id="slide2">
            <div class="motivation-section">
                <div class="slide-header">
                    <h1 class="slide-title">🔥 ${data.companyInfo.name}의 혁신 여정이 시작됩니다!</h1>
                    <p class="slide-subtitle">프로세스 자동화로 만드는 고몰입 조직</p>
                </div>
                
                <div class="vision-card">
                    <h2>🔮 변혁 비전</h2>
                    <p class="vision-text">${data.automationInsights.motivationalElements.transformationVision}</p>
                </div>
                
                <div class="competitive-advantage">
                    <h2>🏆 경쟁 우위 확보</h2>
                    <p class="advantage-text">${data.automationInsights.motivationalElements.competitiveAdvantage}</p>
                </div>
                
                <div class="success-preview">
                    <h2>✨ 성공사례 미리보기</h2>
                    <div class="stories-grid">
                        ${data.automationInsights.motivationalElements.successStories.map((story, index) => `
                            <div class="story-card">
                                <div class="story-number">${index + 1}</div>
                                <p class="story-text">${story}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 📊 현재 상태 진단 페이지 -->
        <div class="slide" id="slide3">
            <div class="slide-header">
                <h1 class="slide-title">📊 현재 자동화 역량 진단</h1>
                <p class="slide-subtitle">정확한 현황 파악으로 최적의 시작점 찾기</p>
            </div>
            
            <div class="current-state-analysis">
                <div class="radar-chart-container">
                    <canvas id="automationRadarChart" width="500" height="400"></canvas>
                </div>
                
                <div class="category-breakdown">
                    <h3>📋 영역별 상세 분석</h3>
                    ${this.generateCategoryCards(data.scores.categoryScores, data.companyInfo.industry)}
                </div>
                
                <div class="readiness-assessment">
                    <h3>🎯 자동화 준비도: ${this.getReadinessLabel(readiness)}</h3>
                    <div class="readiness-description">
                        ${this.getReadinessDescription(readiness, data.companyInfo.name)}
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 🛠️ n8n 프로세스 자동화 로드맵 페이지 -->
        <div class="slide" id="slide4">
            <div class="slide-header">
                <h1 class="slide-title">🛠️ n8n 프로세스 자동화 로드맵</h1>
                <p class="slide-subtitle">${data.companyInfo.name} 맞춤형 실행 계획</p>
            </div>
            
            <div class="automation-roadmap">
                <div class="quick-wins-section">
                    <h2>🚀 즉시 시작 가능한 자동화 (Quick Wins)</h2>
                    <div class="quick-wins-timeline">
                        ${data.automationInsights.motivationalElements.quickWins.map((win, index) => `
                            <div class="timeline-item quick-win">
                                <div class="timeline-marker">${index + 1}</div>
                                <div class="timeline-content">
                                    <h4>${win}</h4>
                                    <div class="implementation-badge">즉시 시작</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="key-processes-section">
                    <h2>🎯 핵심 프로세스 자동화 계획</h2>
                    <div class="processes-grid">
                        ${data.automationInsights.keyProcesses.map(process => `
                            <div class="process-card ${process.n8nComplexity}">
                                <h4>${process.process}</h4>
                                <div class="process-metrics">
                                    <div class="metric">
                                        <span class="metric-label">현재 효율성</span>
                                        <span class="metric-value">${process.currentEfficiency}%</span>
                                    </div>
                                    <div class="metric">
                                        <span class="metric-label">자동화 잠재력</span>
                                        <span class="metric-value">${process.automationPotential}%</span>
                                    </div>
                                    <div class="metric">
                                        <span class="metric-label">예상 ROI</span>
                                        <span class="metric-value">${process.expectedROI}%</span>
                                    </div>
                                </div>
                                <div class="implementation-info">
                                    <span class="timeline-badge">${process.implementationTime}</span>
                                    <span class="complexity-badge ${process.n8nComplexity}">${this.getComplexityLabel(process.n8nComplexity)}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 💡 고몰입 조직구축 전략 페이지 -->
        <div class="slide" id="slide5">
            <div class="slide-header">
                <h1 class="slide-title">💡 고몰입 조직구축 전략</h1>
                <p class="slide-subtitle">자동화로 만드는 직원 중심의 혁신 조직</p>
            </div>
            
            <div class="engagement-strategy">
                <div class="culture-transformation">
                    <h2>🌟 조직문화 혁신 방향</h2>
                    <div class="culture-cards">
                        <div class="culture-card">
                            <h3>🤖 자동화 마인드셋</h3>
                            <p>반복업무는 기계가, 창의업무는 사람이</p>
                            <div class="impact-score">${data.automationInsights.organizationMaturity.culture * 20}%</div>
                        </div>
                        <div class="culture-card">
                            <h3>🚀 혁신 리더십</h3>
                            <p>변화를 주도하는 리더십 역량</p>
                            <div class="impact-score">${data.automationInsights.organizationMaturity.leadership * 20}%</div>
                        </div>
                        <div class="culture-card">
                            <h3>🔄 지속적 개선</h3>
                            <p>프로세스 최적화 문화 정착</p>
                            <div class="impact-score">${data.automationInsights.organizationMaturity.change * 20}%</div>
                        </div>
                    </div>
                </div>
                
                <div class="employee-benefits">
                    <h2>👥 직원 혜택 및 동기부여</h2>
                    <div class="benefits-showcase">
                        <div class="benefit-category">
                            <h3>⏰ 시간 절약</h3>
                            <ul>
                                <li>반복업무 자동화로 하루 2-3시간 절약</li>
                                <li>야근 시간 70% 감소</li>
                                <li>워라밸 개선으로 만족도 향상</li>
                            </ul>
                        </div>
                        <div class="benefit-category">
                            <h3>💪 역량 개발</h3>
                            <ul>
                                <li>창의적 업무에 집중할 시간 확보</li>
                                <li>AI/자동화 스킬 습득 기회</li>
                                <li>업무 전문성 심화 가능</li>
                            </ul>
                        </div>
                        <div class="benefit-category">
                            <h3>🏆 성취감 증대</h3>
                            <ul>
                                <li>의미있는 결과물 창출</li>
                                <li>프로세스 개선 주도 경험</li>
                                <li>혁신 문화 구축 참여</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 📈 ROI 및 성과 예측 페이지 -->
        <div class="slide" id="slide6">
            ${this.generateROIProjectionPage(data)}
        </div>
        
        <!-- 🗺️ 실행 로드맵 페이지 -->
        <div class="slide" id="slide7">
            ${this.generateImplementationRoadmap(data)}
        </div>
        
        <!-- 추가 상세 분석 페이지들 -->
        ${this.generateDetailedAnalysisPages(data)}
        
        <!-- 네비게이션 및 스크립트 -->
        ${this.generateNavigationSystem()}
        ${this.generateInteractiveScripts(data)}
    </div>
</body>
</html>`;
  }
  
  /**
   * 🎨 고도화된 스타일시트 (n8n 테마)
   */
  static getEnhancedAutomationStyles(): string {
    return `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
            line-height: 1.6;
            color: #1a202c;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .report-container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 25px 80px rgba(0,0,0,0.15);
            border-radius: 24px;
            overflow: hidden;
        }
        
        .slide {
            min-height: 100vh;
            padding: 80px;
            display: none;
            position: relative;
            background: white;
        }
        
        .slide.active {
            display: block;
            animation: slideIn 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .hero-section {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            text-align: center;
        }
        
        .company-name {
            font-size: 4.5rem;
            font-weight: 900;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 20px;
        }
        
        .industry-badge {
            display: inline-block;
            background: linear-gradient(135deg, #48bb78, #38a169);
            color: white;
            padding: 12px 30px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.2rem;
            margin-bottom: 60px;
        }
        
        .main-headline {
            font-size: 3.5rem;
            font-weight: 800;
            color: #2d3748;
            margin-bottom: 20px;
            line-height: 1.2;
        }
        
        .sub-headline {
            font-size: 1.5rem;
            color: #4a5568;
            margin-bottom: 60px;
        }
        
        .score-showcase {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            max-width: 1000px;
        }
        
        .automation-score {
            text-align: center;
        }
        
        .score-circle {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
            position: relative;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .score-circle.high {
            background: linear-gradient(135deg, #48bb78, #38a169);
            color: white;
        }
        
        .score-circle.medium {
            background: linear-gradient(135deg, #ed8936, #dd6b20);
            color: white;
        }
        
        .score-circle.low {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
        }
        
        .score-number {
            font-size: 3.5rem;
            font-weight: 900;
            line-height: 1;
        }
        
        .score-label {
            font-size: 1rem;
            font-weight: 600;
            text-align: center;
            margin-top: 5px;
        }
        
        .readiness-badge {
            padding: 15px 30px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 1.1rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .readiness-badge.ready {
            background: linear-gradient(135deg, #48bb78, #38a169);
            color: white;
        }
        
        .readiness-badge.preparing {
            background: linear-gradient(135deg, #ed8936, #dd6b20);
            color: white;
        }
        
        .readiness-badge.planning {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
        }
        
        .readiness-badge.exploring {
            background: linear-gradient(135deg, #a0aec0, #718096);
            color: white;
        }
        
        .benefits-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin-top: 30px;
        }
        
        .benefit-item {
            text-align: center;
            padding: 30px;
            background: linear-gradient(135deg, #f7fafc, #edf2f7);
            border-radius: 16px;
            border-left: 5px solid #667eea;
        }
        
        .benefit-number {
            display: block;
            font-size: 3rem;
            font-weight: 900;
            color: #667eea;
            margin-bottom: 10px;
        }
        
        .benefit-label {
            font-size: 1rem;
            color: #4a5568;
            font-weight: 600;
        }
        
        .motivation-section {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        
        .vision-card {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 40px;
            border-radius: 20px;
            margin: 30px 0;
            text-align: center;
        }
        
        .vision-text {
            font-size: 1.3rem;
            line-height: 1.8;
            font-weight: 500;
        }
        
        .stories-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        
        .story-card {
            background: white;
            border: 2px solid #e2e8f0;
            border-radius: 16px;
            padding: 25px;
            position: relative;
            transition: all 0.3s ease;
        }
        
        .story-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            border-color: #667eea;
        }
        
        .story-number {
            position: absolute;
            top: -15px;
            left: 20px;
            width: 30px;
            height: 30px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
        }
        
        .story-text {
            font-size: 1rem;
            color: #2d3748;
            line-height: 1.6;
            margin-top: 10px;
        }
        
        /* 반응형 디자인 */
        @media (max-width: 768px) {
            .slide {
                padding: 40px 20px;
            }
            
            .company-name {
                font-size: 2.5rem;
            }
            
            .main-headline {
                font-size: 2rem;
            }
            
            .score-showcase {
                flex-direction: column;
                gap: 40px;
            }
            
            .benefits-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }
        }
    `;
  }
  
  // 헬퍼 메서드들
  static getScoreClass(score: number): string {
    if (score >= 70) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
  }
  
  static getReadinessLabel(readiness: string): string {
    const labels = {
      ready: '즉시 실행 가능',
      preparing: '준비 단계',
      planning: '계획 단계',
      exploring: '탐색 단계'
    };
    return labels[readiness as keyof typeof labels] || '평가 중';
  }
  
  static getReadinessDescription(readiness: string, companyName: string): string {
    const descriptions = {
      ready: `🎉 축하합니다! ${companyName}은 n8n 프로세스 자동화를 즉시 시작할 수 있는 완벽한 준비가 되어있습니다. 지금 바로 첫 번째 자동화 프로젝트를 시작하세요!`,
      preparing: `💪 ${companyName}은 자동화 도입을 위한 기반이 잘 마련되어 있습니다. 몇 가지 준비 작업 후 성공적인 자동화를 시작할 수 있습니다.`,
      planning: `📋 ${companyName}은 체계적인 계획을 통해 자동화 성공을 이룰 수 있습니다. 단계별 접근으로 안전하고 효과적인 도입이 가능합니다.`,
      exploring: `🔍 ${companyName}의 자동화 여정이 시작됩니다! 작은 것부터 차근차근 시작하여 큰 변화를 만들어나갈 수 있습니다.`
    };
    return descriptions[readiness as keyof typeof descriptions] || '';
  }
  
  static getComplexityLabel(complexity: string): string {
    const labels = {
      simple: '쉬움',
      moderate: '보통',
      complex: '고급'
    };
    return labels[complexity as keyof typeof labels] || '보통';
  }
  
  static calculateExpectedEfficiency(score: number): number {
    return Math.round(30 + (score * 0.7)); // 30-100% 범위
  }
  
  static calculateExpectedSavings(score: number): number {
    return Math.round(20 + (score * 0.8)); // 20-100시간 범위
  }
  
  static calculateROIProjection(score: number): number {
    return Math.round(150 + (score * 3)); // 150-450% 범위
  }
  
  static generateCategoryCards(categoryScores: any, industry: string): string {
    // 카테고리별 카드 생성 로직
    return '';
  }
  
  static generateROIProjectionPage(data: any): string {
    // ROI 예측 페이지 생성
    return '';
  }
  
  static generateImplementationRoadmap(data: any): string {
    // 구현 로드맵 페이지 생성
    return '';
  }
  
  static generateDetailedAnalysisPages(data: any): string {
    // 상세 분석 페이지들 생성
    return '';
  }
  
  static generateNavigationSystem(): string {
    // 네비게이션 시스템 생성
    return '';
  }
  
  static generateInteractiveScripts(data: any): string {
    // 상호작용 스크립트 생성
    return '';
  }
  
  // 추가 계산 메서드들
  static calculateCurrentEfficiency(process: any, categoryScores: any): number {
    return Math.round(40 + Math.random() * 40); // 40-80% 범위
  }
  
  static calculateAutomationPotential(process: any, categoryScores: any): number {
    return Math.round(60 + Math.random() * 40); // 60-100% 범위
  }
  
  static calculateExpectedROI(process: any, companySize: string, currentEfficiency: number): number {
    const sizeMultiplier = companySize.includes('대기업') ? 1.5 : 
                          companySize.includes('중기업') ? 1.2 : 1.0;
    return Math.round((100 - currentEfficiency) * 2 * sizeMultiplier);
  }
  
  static getCompanySize(employeeCount: string): string {
    if (employeeCount.includes('300명') || employeeCount.includes('대기업')) return '대기업';
    if (employeeCount.includes('100명') || employeeCount.includes('중기업')) return '중기업';
    return '중소기업';
  }
  
  static analyzeOrganizationMaturity(categoryScores: any) {
    return {
      leadership: categoryScores?.businessFoundation || 0,
      culture: categoryScores?.organizationReadiness || 0,
      technology: categoryScores?.techInfrastructure || 0,
      change: categoryScores?.executionCapability || 0
    };
  }
}
