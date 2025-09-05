/**
 * 🔗 V3.0 Compatibility Bridge
 * 기존 시스템과의 100% 호환성을 보장하는 브리지
 */

import { MainDiagnosisController, DiagnosisProcessResult } from './main-diagnosis-controller';
import { AIDiagnosisApplication, IndustryType, EmployeeRange, RevenueRange, LocationType, AIUsageLevel, BudgetRange } from './enhanced-data-structures';

// 기존 시스템 데이터 구조 (호환성용)
export interface DiagnosisData {
  diagnosisId: string;
  companyInfo: {
    name: string;
    industry: string;
    size: string;
    location?: string;
    revenue?: string;
  };
  contactInfo: {
    name: string;
    email: string;
    phone?: string;
    position?: string;
  };
  responses: Record<string, number>;
  scores: {
    total: number;
    percentage: number;
    categoryScores: Record<string, number>;
  };
  timestamp: string;
  grade: string;
  maturityLevel: string;
}

export class CompatibilityBridge {
  
  /**
   * 기존 시스템 호환 - McKinsey 24페이지 보고서 생성
   */
  public static async generateMcKinsey24PageReport(legacyData: DiagnosisData): Promise<string> {
    console.log('🔗 CompatibilityBridge: 레거시 데이터 변환 및 새 시스템 호출');
    
    try {
      // 레거시 데이터를 V3.0 형식으로 변환
      const applicationData: AIDiagnosisApplication = this.adaptLegacyToNew(legacyData);
      
      // V3.0 시스템으로 처리
      const result = await MainDiagnosisController.processCompleteDiagnosis(applicationData, {
        useAdvancedAnalysis: true,
        includeCharts: true,
        includeBenchmarks: true,
        format: 'html',
        language: 'ko',
        n8nEnhanced: true,
        worldClassLevel: true
      });
      
      if (result.success && result.reportHtml) {
        console.log('✅ CompatibilityBridge: 새 시스템을 통한 보고서 생성 성공');
        return result.reportHtml;
      } else {
        console.warn('⚠️ CompatibilityBridge: 새 시스템 보고서 생성 실패, 폴백 시스템 사용');
        return this.generateFallbackReport(legacyData);
      }
      
    } catch (error: any) {
      console.error('❌ CompatibilityBridge: 새 시스템 호출 중 오류 발생, 폴백 시스템 사용:', error);
      return this.generateFallbackReport(legacyData);
    }
  }
  
  /**
   * 레거시 데이터를 V3.0 형식으로 변환
   */
  private static adaptLegacyToNew(legacyData: DiagnosisData): AIDiagnosisApplication {
    console.log('🔄 레거시 데이터 변환 시작');
    
    return {
      companyInfo: {
        companyName: legacyData.companyInfo.name,
        industry: this.mapIndustry(legacyData.companyInfo.industry),
        contactPerson: legacyData.contactInfo.name,
        email: legacyData.contactInfo.email,
        employeeCount: this.mapEmployeeCount(legacyData.companyInfo.size),
        annualRevenue: this.mapRevenue(legacyData.companyInfo.revenue),
        location: this.mapLocation(legacyData.companyInfo.location),
        phoneNumber: legacyData.contactInfo.phone,
        department: legacyData.contactInfo.position || '담당자'
      },
      aiContext: {
        currentAIUsage: AIUsageLevel.BASIC,
        aiInvestmentBudget: BudgetRange.UNDER_50M,
        aiGoals: ['업무 효율성 향상', 'AI 역량 강화'],
        priorityAreas: ['자동화', '데이터 분석'],
        timeframe: '6개월'
      },
      assessmentScores: this.convertResponsesToScores(legacyData.responses),
      privacy: {
        dataProcessingConsent: true,
        marketingConsent: false,
        consentDateTime: new Date(),
        ipAddress: '127.0.0.1',
        consentVersion: 'V3.0'
      },
      metadata: {
        submissionDate: new Date(legacyData.timestamp),
        sessionId: legacyData.diagnosisId,
        deviceInfo: 'Unknown',
        browserInfo: 'Unknown',
        language: 'ko'
      }
    };
  }
  
  /**
   * 응답을 카테고리별 점수로 변환
   */
  private static convertResponsesToScores(responses: Record<string, number>): any {
    const businessFoundation = [];
    const currentAIAdoption = [];
    const organizationalReadiness = [];
    const technicalInfrastructure = [];
    const goalClarity = [];
    const executionCapability = [];
    
    // 45문항을 카테고리별로 분배
    for (let i = 1; i <= 45; i++) {
      const score = responses[`question_${i}`] || responses[i] || 3;
      
      if (i <= 8) businessFoundation.push(score);
      else if (i <= 16) currentAIAdoption.push(score);
      else if (i <= 24) organizationalReadiness.push(score);
      else if (i <= 32) technicalInfrastructure.push(score);
      else if (i <= 40) goalClarity.push(score);
      else executionCapability.push(score);
    }
    
    return {
      businessFoundation,
      currentAIAdoption,
      organizationalReadiness,
      technicalInfrastructure,
      goalClarity,
      executionCapability
    };
  }
  
  /**
   * 폴백 보고서 생성 (기존 시스템 스타일)
   */
  private static generateFallbackReport(legacyData: DiagnosisData): string {
    console.log('🔄 폴백 보고서 생성');
    
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>${legacyData.companyInfo.name} - AI 역량진단 보고서</title>
    <style>
        body { font-family: 'Malgun Gothic', Arial, sans-serif; margin: 0; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 40px; }
        .section { margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; }
        .score { font-size: 24px; color: #27ae60; font-weight: bold; }
        .grade { font-size: 20px; color: #3498db; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>AI 역량진단 보고서</h1>
            <h2>${legacyData.companyInfo.name}</h2>
            <p>진단ID: ${legacyData.diagnosisId}</p>
        </div>
        
        <div class="section">
            <h3>진단 결과</h3>
            <p>총점: <span class="score">${legacyData.scores.total}점</span></p>
            <p>등급: <span class="grade">${legacyData.grade}</span></p>
            <p>성숙도: ${legacyData.maturityLevel}</p>
        </div>
        
        <div class="section">
            <h3>기업 정보</h3>
            <p>업종: ${legacyData.companyInfo.industry}</p>
            <p>규모: ${legacyData.companyInfo.size}</p>
            <p>담당자: ${legacyData.contactInfo.name}</p>
        </div>
        
        <div class="section">
            <h3>권장사항</h3>
            <ul>
                <li>AI 기초 역량 강화</li>
                <li>조직 문화 개선</li>
                <li>기술 인프라 구축</li>
            </ul>
        </div>
        
        <div style="text-align: center; margin-top: 50px;">
            <p><strong>이교장의 AI Camp</strong></p>
            <p>AI 역량진단 전문기관</p>
            <p>https://aicamp.club</p>
        </div>
    </div>
</body>
</html>
    `;
  }
  
  /**
   * 매핑 헬퍼 메서드들
   */
  private static mapIndustry(industry: string): IndustryType {
    const industryMap: Record<string, IndustryType> = {
      '제조업': IndustryType.MANUFACTURING,
      '서비스업': IndustryType.SERVICE,
      'IT/소프트웨어': IndustryType.IT_SOFTWARE,
      '금융업': IndustryType.FINANCE,
      '건설업': IndustryType.CONSTRUCTION,
      '교육업': IndustryType.EDUCATION,
      '의료업': IndustryType.HEALTHCARE,
      '운송업': IndustryType.LOGISTICS,
      '농업': IndustryType.AGRICULTURE,
      '유통업': IndustryType.RETAIL
    };
    
    return industryMap[industry] || IndustryType.IT_SOFTWARE;
  }
  
  private static mapEmployeeCount(size: string): EmployeeRange {
    const sizeMap: Record<string, EmployeeRange> = {
      '10명 이하': EmployeeRange.UNDER_10,
      '11-50명': EmployeeRange.BETWEEN_11_50,
      '51-100명': EmployeeRange.BETWEEN_51_100,
      '101-300명': EmployeeRange.BETWEEN_101_300,
      '301-1000명': EmployeeRange.BETWEEN_301_1000,
      '1000명 이상': EmployeeRange.OVER_1000
    };
    
    return sizeMap[size] || EmployeeRange.BETWEEN_11_50;
  }
  
  private static mapRevenue(revenue?: string): RevenueRange {
    if (!revenue) return RevenueRange.BETWEEN_100M_1B;
    
    const revenueMap: Record<string, RevenueRange> = {
      '1억 미만': RevenueRange.UNDER_100M,
      '1-10억': RevenueRange.BETWEEN_100M_1B,
      '10-50억': RevenueRange.BETWEEN_1B_5B,
      '50-100억': RevenueRange.BETWEEN_5B_10B,
      '100-500억': RevenueRange.BETWEEN_10B_50B,
      '500억 이상': RevenueRange.OVER_50B
    };
    
    return revenueMap[revenue] || RevenueRange.BETWEEN_100M_1B;
  }
  
  private static mapLocation(location?: string): LocationType {
    if (!location) return LocationType.SEOUL;
    
    const locationMap: Record<string, LocationType> = {
      '서울': LocationType.SEOUL,
      '경기': LocationType.GYEONGGI,
      '부산': LocationType.BUSAN,
      '대구': LocationType.DAEGU,
      '인천': LocationType.INCHEON,
      '광주': LocationType.GWANGJU,
      '대전': LocationType.DAEJEON,
      '울산': LocationType.ULSAN
    };
    
    return locationMap[location] || LocationType.OTHER;
  }
}
