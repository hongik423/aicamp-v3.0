/**
 * 실시간 품질 모니터링 시스템
 * AI 역량진단 결과의 정확도 및 품질을 실시간으로 모니터링
 */

export interface QualityMetrics {
  accuracy: number;        // 정확도 (0-100)
  consistency: number;     // 일관성 (0-100)
  completeness: number;    // 완전성 (0-100)
  reliability: number;     // 신뢰도 (0-100)
  userSatisfaction: number; // 사용자 만족도 (0-100)
}

export interface QualityAlert {
  id: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'accuracy' | 'performance' | 'data' | 'system';
  message: string;
  suggestedAction: string;
  affectedComponents: string[];
}

export interface QualityReport {
  timestamp: string;
  diagnosisId: string;
  companyName: string;
  metrics: QualityMetrics;
  alerts: QualityAlert[];
  recommendations: string[];
  overallScore: number;
}

export class QualityMonitoringSystem {
  private static instance: QualityMonitoringSystem;
  private qualityReports: QualityReport[] = [];
  private thresholds = {
    accuracy: { warning: 85, critical: 75 },
    consistency: { warning: 80, critical: 70 },
    completeness: { warning: 90, critical: 80 },
    reliability: { warning: 85, critical: 75 },
    userSatisfaction: { warning: 80, critical: 70 }
  };

  static getInstance(): QualityMonitoringSystem {
    if (!QualityMonitoringSystem.instance) {
      QualityMonitoringSystem.instance = new QualityMonitoringSystem();
    }
    return QualityMonitoringSystem.instance;
  }

  /**
   * 진단 결과 품질 평가
   */
  async evaluateDiagnosisQuality(
    diagnosisData: any,
    scores: any,
    gapAnalysis: any,
    swotAnalysis: any,
    priorityMatrix: any,
    programRecommendations: any
  ): Promise<QualityReport> {
    console.log('🔍 진단 품질 평가 시작...');
    
    const diagnosisId = diagnosisData.diagnosisId || this.generateDiagnosisId();
    const timestamp = new Date().toISOString();
    
    // 품질 지표 계산
    const metrics = await this.calculateQualityMetrics(
      diagnosisData, scores, gapAnalysis, swotAnalysis, priorityMatrix, programRecommendations
    );
    
    // 품질 알림 생성
    const alerts = this.generateQualityAlerts(metrics, diagnosisData);
    
    // 개선 권고사항 생성
    const recommendations = this.generateQualityRecommendations(metrics, alerts);
    
    // 전체 품질 점수 계산
    const overallScore = this.calculateOverallQualityScore(metrics);
    
    const qualityReport: QualityReport = {
      timestamp,
      diagnosisId,
      companyName: diagnosisData.companyName,
      metrics,
      alerts,
      recommendations,
      overallScore
    };
    
    // 품질 보고서 저장
    this.qualityReports.push(qualityReport);
    
    // 임계치 초과시 알림 발송
    if (overallScore < 75) {
      await this.sendQualityAlert(qualityReport);
    }
    
    console.log(`✅ 진단 품질 평가 완료: ${overallScore}점`);
    return qualityReport;
  }

  /**
   * 품질 지표 계산
   */
  private async calculateQualityMetrics(
    diagnosisData: any,
    scores: any,
    gapAnalysis: any,
    swotAnalysis: any,
    priorityMatrix: any,
    programRecommendations: any
  ): Promise<QualityMetrics> {
    
    // 1. 정확도 평가
    const accuracy = this.evaluateAccuracy(diagnosisData, scores, gapAnalysis);
    
    // 2. 일관성 평가
    const consistency = this.evaluateConsistency(scores, swotAnalysis, priorityMatrix);
    
    // 3. 완전성 평가
    const completeness = this.evaluateCompleteness(diagnosisData, scores, programRecommendations);
    
    // 4. 신뢰도 평가
    const reliability = this.evaluateReliability(scores, gapAnalysis, swotAnalysis);
    
    // 5. 사용자 만족도 예측 (기존 데이터 기반)
    const userSatisfaction = this.predictUserSatisfaction(scores, programRecommendations);
    
    return {
      accuracy,
      consistency,
      completeness,
      reliability,
      userSatisfaction
    };
  }

  /**
   * 정확도 평가
   */
  private evaluateAccuracy(diagnosisData: any, scores: any, gapAnalysis: any): number {
    let accuracy = 100;
    
    // 점수 범위 검증
    if (scores.totalScore < 0 || scores.totalScore > 100) accuracy -= 20;
    
    // 카테고리 점수 일관성 검증
    const categoryScores = Object.values(scores.categoryScores) as number[];
    const scoreVariance = this.calculateVariance(categoryScores);
    if (scoreVariance > 1000) accuracy -= 10; // 점수 편차가 너무 큰 경우
    
    // 업종 벤치마크 일관성 검증
    if (gapAnalysis.competitivePosition && scores.totalScore) {
      if (gapAnalysis.competitivePosition === 'Leading' && scores.totalScore < 70) accuracy -= 15;
      if (gapAnalysis.competitivePosition === 'Lagging' && scores.totalScore > 80) accuracy -= 15;
    }
    
    // 필수 데이터 완전성 검증
    const requiredFields = ['contactName', 'contactEmail', 'companyName', 'industry'];
    const missingFields = requiredFields.filter(field => !diagnosisData[field]);
    accuracy -= missingFields.length * 5;
    
    return Math.max(0, Math.min(100, accuracy));
  }

  /**
   * 일관성 평가
   */
  private evaluateConsistency(scores: any, swotAnalysis: any, priorityMatrix: any): number {
    let consistency = 100;
    
    // SWOT와 점수 일관성 검증
    if (scores.totalScore >= 70) {
      // 높은 점수인데 약점이 너무 많은 경우
      const totalWeaknesses = swotAnalysis.weaknesses.operational.length + 
                             swotAnalysis.weaknesses.technical.length + 
                             swotAnalysis.weaknesses.organizational.length;
      if (totalWeaknesses > 6) consistency -= 15;
    }
    
    if (scores.totalScore < 50) {
      // 낮은 점수인데 강점이 너무 많은 경우
      const totalStrengths = swotAnalysis.strengths.internal.length + 
                            swotAnalysis.strengths.competitive.length + 
                            swotAnalysis.strengths.strategic.length;
      if (totalStrengths > 6) consistency -= 15;
    }
    
    // 우선순위 매트릭스 일관성 검증
    if (priorityMatrix.actionItems && priorityMatrix.actionItems.length > 0) {
      const highPriorityItems = priorityMatrix.actionItems.filter((item: any) => item.priorityScore >= 80);
      const lowScoreHighPriority = highPriorityItems.filter((item: any) => 
        scores.totalScore >= 80 && item.source === 'weakness'
      );
      if (lowScoreHighPriority.length > 3) consistency -= 10;
    }
    
    return Math.max(0, Math.min(100, consistency));
  }

  /**
   * 완전성 평가
   */
  private evaluateCompleteness(diagnosisData: any, scores: any, programRecommendations: any): number {
    let completeness = 100;
    
    // 45문항 응답 완전성 검증
    const totalQuestions = 45;
    const answeredQuestions = Object.keys(diagnosisData).filter(key => 
      diagnosisData[key] !== null && diagnosisData[key] !== undefined && diagnosisData[key] !== ''
    ).length;
    const responseRate = (answeredQuestions / totalQuestions) * 100;
    if (responseRate < 95) completeness -= (95 - responseRate);
    
    // 카테고리별 점수 완전성
    const requiredCategories = ['currentAI', 'organizationReadiness', 'techInfrastructure', 'goalClarity', 'executionCapability'];
    const missingCategories = requiredCategories.filter(cat => !scores.categoryScores[cat]);
    completeness -= missingCategories.length * 10;
    
    // 프로그램 추천 완전성
    if (!programRecommendations || !programRecommendations.immediate || programRecommendations.immediate.length === 0) {
      completeness -= 15;
    }
    
    return Math.max(0, Math.min(100, completeness));
  }

  /**
   * 신뢰도 평가
   */
  private evaluateReliability(scores: any, gapAnalysis: any, swotAnalysis: any): number {
    let reliability = 100;
    
    // 점수 안정성 검증
    if (scores.maturityLevel) {
      const levelScore = this.maturityLevelToScore(scores.maturityLevel);
      const scoreDiff = Math.abs(scores.totalScore - levelScore);
      if (scoreDiff > 15) reliability -= 10;
    }
    
    // 벤치마크 신뢰도 검증
    if (gapAnalysis.industryGap && Math.abs(gapAnalysis.industryGap.total) > 50) {
      reliability -= 10; // 업종 평균과 너무 큰 차이
    }
    
    // SWOT 균형성 검증
    const swotBalance = this.calculateSWOTBalance(swotAnalysis);
    if (swotBalance < 0.3) reliability -= 15; // 너무 편향된 SWOT
    
    return Math.max(0, Math.min(100, reliability));
  }

  /**
   * 사용자 만족도 예측
   */
  private predictUserSatisfaction(scores: any, programRecommendations: any): number {
    let satisfaction = 80; // 기본값
    
    // 점수 범위별 만족도 예측
    if (scores.totalScore >= 80) satisfaction += 15;
    else if (scores.totalScore >= 60) satisfaction += 10;
    else if (scores.totalScore < 30) satisfaction -= 10;
    
    // 프로그램 추천 품질
    const totalPrograms = Object.values(programRecommendations).flat().length;
    if (totalPrograms >= 4) satisfaction += 10;
    else if (totalPrograms < 2) satisfaction -= 15;
    
    // ROI 기대치
    if (programRecommendations.expectedROI && programRecommendations.expectedROI.includes('300%')) {
      satisfaction += 10;
    }
    
    return Math.max(0, Math.min(100, satisfaction));
  }

  /**
   * 품질 알림 생성
   */
  private generateQualityAlerts(metrics: QualityMetrics, diagnosisData: any): QualityAlert[] {
    const alerts: QualityAlert[] = [];
    
    // 정확도 알림
    if (metrics.accuracy < this.thresholds.accuracy.critical) {
      alerts.push({
        id: this.generateAlertId(),
        timestamp: new Date().toISOString(),
        severity: 'critical',
        category: 'accuracy',
        message: `진단 정확도가 임계치 이하입니다 (${metrics.accuracy}%)`,
        suggestedAction: '데이터 검증 및 알고리즘 점검 필요',
        affectedComponents: ['점수 계산 엔진', '벤치마크 시스템']
      });
    }
    
    // 일관성 알림
    if (metrics.consistency < this.thresholds.consistency.warning) {
      alerts.push({
        id: this.generateAlertId(),
        timestamp: new Date().toISOString(),
        severity: metrics.consistency < this.thresholds.consistency.critical ? 'critical' : 'medium',
        category: 'data',
        message: `분석 결과 일관성이 부족합니다 (${metrics.consistency}%)`,
        suggestedAction: 'SWOT-점수 간 논리적 연계성 검토',
        affectedComponents: ['SWOT 분석', '우선순위 매트릭스']
      });
    }
    
    // 완전성 알림
    if (metrics.completeness < this.thresholds.completeness.warning) {
      alerts.push({
        id: this.generateAlertId(),
        timestamp: new Date().toISOString(),
        severity: 'medium',
        category: 'data',
        message: `데이터 완전성이 부족합니다 (${metrics.completeness}%)`,
        suggestedAction: '누락된 데이터 항목 확인 및 보완',
        affectedComponents: ['데이터 수집', '응답 검증']
      });
    }
    
    return alerts;
  }

  /**
   * 품질 개선 권고사항 생성
   */
  private generateQualityRecommendations(metrics: QualityMetrics, alerts: QualityAlert[]): string[] {
    const recommendations: string[] = [];
    
    if (metrics.accuracy < 85) {
      recommendations.push('점수 계산 알고리즘의 가중치 재조정 검토');
      recommendations.push('업종별 벤치마크 데이터 업데이트');
    }
    
    if (metrics.consistency < 80) {
      recommendations.push('SWOT 분석과 점수 간 논리적 연계성 강화');
      recommendations.push('우선순위 매트릭스 평가 기준 정교화');
    }
    
    if (metrics.completeness < 90) {
      recommendations.push('필수 응답 항목에 대한 유효성 검사 강화');
      recommendations.push('사용자 인터페이스 개선으로 응답률 향상');
    }
    
    if (alerts.some(alert => alert.severity === 'critical')) {
      recommendations.push('시스템 긴급 점검 및 품질 관리 프로세스 재검토');
    }
    
    return recommendations;
  }

  /**
   * 전체 품질 점수 계산
   */
  private calculateOverallQualityScore(metrics: QualityMetrics): number {
    const weights = {
      accuracy: 0.3,
      consistency: 0.25,
      completeness: 0.2,
      reliability: 0.15,
      userSatisfaction: 0.1
    };
    
    return Math.round(
      metrics.accuracy * weights.accuracy +
      metrics.consistency * weights.consistency +
      metrics.completeness * weights.completeness +
      metrics.reliability * weights.reliability +
      metrics.userSatisfaction * weights.userSatisfaction
    );
  }

  /**
   * 품질 알림 발송
   */
  private async sendQualityAlert(qualityReport: QualityReport): Promise<void> {
    console.warn(`🚨 품질 알림: ${qualityReport.companyName} - 품질 점수 ${qualityReport.overallScore}점`);
    
    // 실제 구현시에는 이메일, 슬랙 등으로 알림 발송
    // await emailService.sendQualityAlert(qualityReport);
    // await slackService.sendQualityAlert(qualityReport);
  }

  /**
   * 품질 통계 조회
   */
  getQualityStatistics(days: number = 7): {
    averageQuality: number;
    totalDiagnoses: number;
    qualityTrend: string;
    criticalAlerts: number;
  } {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const recentReports = this.qualityReports.filter(
      report => new Date(report.timestamp) >= cutoffDate
    );
    
    const averageQuality = recentReports.length > 0 
      ? recentReports.reduce((sum, report) => sum + report.overallScore, 0) / recentReports.length
      : 0;
    
    const criticalAlerts = recentReports.reduce(
      (count, report) => count + report.alerts.filter(alert => alert.severity === 'critical').length,
      0
    );
    
    // 품질 트렌드 계산 (간단한 버전)
    const qualityTrend = recentReports.length >= 2 
      ? (recentReports[recentReports.length - 1].overallScore > recentReports[0].overallScore ? '상승' : '하락')
      : '데이터 부족';
    
    return {
      averageQuality: Math.round(averageQuality),
      totalDiagnoses: recentReports.length,
      qualityTrend,
      criticalAlerts
    };
  }

  // 유틸리티 메서드들
  private generateDiagnosisId(): string {
    return `DIAG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateAlertId(): string {
    return `ALERT-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  }

  private calculateVariance(numbers: number[]): number {
    const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    const squaredDiffs = numbers.map(num => Math.pow(num - mean, 2));
    return squaredDiffs.reduce((sum, diff) => sum + diff, 0) / numbers.length;
  }

  private maturityLevelToScore(level: string): number {
    const levelMap: { [key: string]: number } = {
      'Expert': 90,
      'Advanced': 75,
      'Intermediate': 60,
      'Basic': 40,
      'Beginner': 25
    };
    return levelMap[level] || 50;
  }

  private calculateSWOTBalance(swotAnalysis: any): number {
    const totalStrengths = swotAnalysis.strengths.internal.length + 
                          swotAnalysis.strengths.competitive.length + 
                          swotAnalysis.strengths.strategic.length;
    
    const totalWeaknesses = swotAnalysis.weaknesses.operational.length + 
                           swotAnalysis.weaknesses.technical.length + 
                           swotAnalysis.weaknesses.organizational.length;
    
    const total = totalStrengths + totalWeaknesses;
    if (total === 0) return 0;
    
    const balance = Math.min(totalStrengths, totalWeaknesses) / Math.max(totalStrengths, totalWeaknesses);
    return balance;
  }
}
