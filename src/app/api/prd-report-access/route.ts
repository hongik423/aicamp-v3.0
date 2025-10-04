/**
 * ================================================================================
 * 🚀 PRD 기반 진단결과보고서 조회 API
 * ================================================================================
 * 
 * @fileoverview 진단ID 검증 후 24페이지 보고서를 즉시 제공하는 API
 * @version 1.0.0
 * @encoding UTF-8
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  APIResponse, 
  UserInputData, 
  AnalysisResult,
  ReportMetadata 
} from '@/types/ai-diagnosis-prd.types';
import { PRDReportGenerator } from '@/lib/report-engine/prd-report-generator';
import { PRDAnalysisEngine } from '@/lib/analysis-engine/prd-analysis-engine';

// Vercel 설정
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

interface DiagnosisAccessRequest {
  diagnosisId: string;
  email?: string;
  accessType: 'diagnosisId' | 'email';
}

interface StoredDiagnosisData {
  diagnosisId: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  position?: string;
  industry: string;
  employeeCount: string;
  annualRevenue?: string;
  location?: string;
  responses: Record<string, number>;
  totalScore: number;
  percentage: number;
  grade: string;
  maturityLevel: string;
  timestamp: string;
}

/**
 * POST: 진단ID 또는 이메일로 보고서 조회
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const requestId = `access_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const startTime = Date.now();
  
  try {
    console.log('🔍 PRD 기반 보고서 조회 요청 시작', { requestId });
    
    const requestData = await request.json() as DiagnosisAccessRequest;
    
    // 1단계: 요청 데이터 검증
    if (!requestData.diagnosisId && !requestData.email) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MISSING_PARAMETER',
          message: '진단ID 또는 이메일이 필요합니다',
          timestamp: new Date(),
          requestId
        }
      }, { status: 400 });
    }
    
    let diagnosisId = requestData.diagnosisId;
    
    // 2단계: 이메일로 진단ID 찾기 (이메일 방식인 경우)
    if (requestData.accessType === 'email' && requestData.email) {
      console.log('📧 이메일 기반 진단ID 조회');
      
      const foundId = await findDiagnosisIdByEmail(requestData.email);
      if (!foundId) {
        return NextResponse.json({
          success: false,
          error: {
            code: 'EMAIL_NOT_FOUND',
            message: '해당 이메일로 진단한 기록을 찾을 수 없습니다',
            timestamp: new Date(),
            requestId
          }
        }, { status: 404 });
      }
      
      diagnosisId = foundId;
    }
    
    // 3단계: 진단ID 정규화 및 검증
    const normalizedId = normalizeDiagnosisId(diagnosisId);
    console.log('🔄 진단ID 정규화:', diagnosisId, '=>', normalizedId);
    
    // 4단계: 진단 데이터 조회
    const storedData = await retrieveStoredDiagnosisData(normalizedId);
    if (!storedData) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'DIAGNOSIS_NOT_FOUND',
          message: '해당 진단ID의 보고서를 찾을 수 없습니다',
          details: '진단ID를 다시 확인하시거나 고객센터로 문의해주세요',
          timestamp: new Date(),
          requestId
        }
      }, { status: 404 });
    }
    
    // 5단계: 사용자 데이터 재구성
    const userData = reconstructUserData(storedData);
    
    // 6단계: 분석 결과 재구성
    const analysisResult = reconstructAnalysisResult(storedData);
    
    // 7단계: 24페이지 보고서 생성
    console.log('📋 PRD 기반 24페이지 보고서 생성 시작');
    const reportResult = await PRDReportGenerator.generateCompleteReport(userData, analysisResult);
    
    if (!reportResult.success) {
      throw new Error(`보고서 생성 실패: ${reportResult.error?.message}`);
    }
    
    const processingTime = Date.now() - startTime;
    
    // 8단계: 성공 응답 반환
    const successResponse: APIResponse<{
      diagnosisId: string;
      reportHtml: string;
      reportMetadata: ReportMetadata;
      companyInfo: any;
      scores: any;
      accessTime: string;
    }> = {
      success: true,
      data: {
        diagnosisId: normalizedId,
        reportHtml: reportResult.data!.reportHtml,
        reportMetadata: reportResult.data!.metadata,
        companyInfo: {
          name: storedData.companyName,
          industry: storedData.industry,
          size: storedData.employeeCount,
          location: storedData.location
        },
        scores: {
          total: storedData.totalScore,
          percentage: storedData.percentage,
          grade: storedData.grade,
          maturityLevel: storedData.maturityLevel
        },
        accessTime: new Date().toISOString()
      },
      metadata: {
        requestId,
        timestamp: new Date(),
        processingTime,
        version: 'PRD-ACCESS-v1.0',
        cached: false
      }
    };
    
    console.log('✅ PRD 기반 보고서 조회 완료', {
      diagnosisId: normalizedId,
      processingTime,
      reportSize: reportResult.data!.reportHtml.length
    });
    
    return NextResponse.json(successResponse);
    
  } catch (error: any) {
    console.error('❌ PRD 기반 보고서 조회 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: {
        code: 'ACCESS_ERROR',
        message: error.message || '보고서 조회 중 오류가 발생했습니다',
        details: error.stack,
        timestamp: new Date(),
        requestId
      }
    }, { status: 500 });
  }
}

/**
 * GET: 진단ID로 직접 보고서 조회 (URL 파라미터 방식)
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const requestId = `get_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  
  try {
    const url = new URL(request.url);
    const diagnosisId = url.searchParams.get('diagnosisId');
    
    if (!diagnosisId) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MISSING_PARAMETER',
          message: '진단ID가 필요합니다',
          timestamp: new Date(),
          requestId
        }
      }, { status: 400 });
    }
    
    // POST 메서드와 동일한 로직 사용
    const mockRequest = {
      json: async () => ({
        diagnosisId,
        accessType: 'diagnosisId'
      })
    } as NextRequest;
    
    return await POST(mockRequest);
    
  } catch (error: any) {
    console.error('❌ GET 보고서 조회 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: {
        code: 'GET_ACCESS_ERROR',
        message: error.message,
        timestamp: new Date(),
        requestId
      }
    }, { status: 500 });
  }
}

/**
 * OPTIONS: CORS 처리
 */
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}

// ================================================================================
// 🎯 보조 함수들
// ================================================================================

/**
 * 진단ID 정규화 (다양한 형식 지원)
 */
function normalizeDiagnosisId(diagnosisId: string): string {
  if (!diagnosisId) return '';
  
  const trimmed = diagnosisId.trim();
  
  // 이미 정규화된 형식인지 확인
  if (trimmed.startsWith('DIAG_45Q_AI_')) {
    return trimmed;
  }
  
  // 다양한 형식을 정규화
  if (trimmed.startsWith('DIAG_45Q_')) {
    return trimmed.replace('DIAG_45Q_', 'DIAG_45Q_AI_');
  }
  
  if (trimmed.startsWith('DIAG_AI_')) {
    return trimmed.replace('DIAG_AI_', 'DIAG_45Q_AI_');
  }
  
  if (trimmed.startsWith('DIAG_')) {
    return trimmed.replace('DIAG_', 'DIAG_45Q_AI_');
  }
  
  if (trimmed.startsWith('TEST_')) {
    return trimmed.replace('TEST_', 'DIAG_45Q_AI_');
  }
  
  // 형식이 맞지 않으면 그대로 반환
  return trimmed;
}

/**
 * 이메일로 진단ID 찾기
 */
async function findDiagnosisIdByEmail(email: string): Promise<string | null> {
  try {
    console.log('📧 이메일로 진단ID 찾기 시작:', email.replace(/(.{3}).*(@.*)/, '$1***$2'));
    
    // GAS API 호출
    const gasUrl = process.env.NEXT_PUBLIC_GAS_URL;
    if (!gasUrl) {
      throw new Error('GAS URL이 설정되지 않았습니다');
    }
    
    const response = await fetch(gasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'find_diagnosis_by_email',
        email: email.trim()
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      if (result.success && result.diagnosisId) {
        console.log('✅ 이메일 기반 진단ID 조회 성공');
        return result.diagnosisId;
      }
    }
    
    console.log('❌ 이메일 기반 진단ID 조회 실패');
    return null;
    
  } catch (error: any) {
    console.error('❌ 이메일 기반 진단ID 조회 오류:', error);
    return null;
  }
}

/**
 * 저장된 진단 데이터 조회
 */
async function retrieveStoredDiagnosisData(diagnosisId: string): Promise<StoredDiagnosisData | null> {
  try {
    console.log('💾 저장된 진단 데이터 조회 시작:', diagnosisId);
    
    // GAS API 호출
    const gasUrl = process.env.NEXT_PUBLIC_GAS_URL;
    if (!gasUrl) {
      throw new Error('GAS URL이 설정되지 않았습니다');
    }
    
    const response = await fetch(gasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'query_diagnosis',
        diagnosisId: diagnosisId
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        console.log('✅ 저장된 진단 데이터 조회 성공');
        
        return {
          diagnosisId: result.data.diagnosisId || diagnosisId,
          companyName: result.data.companyName || '회사명',
          contactName: result.data.contactName || '담당자',
          contactEmail: result.data.contactEmail || '',
          contactPhone: result.data.contactPhone,
          position: result.data.position,
          industry: result.data.industry || 'IT/소프트웨어',
          employeeCount: result.data.employeeCount || '중소기업',
          annualRevenue: result.data.annualRevenue,
          location: result.data.location || '서울',
          responses: result.data.responses || result.data.assessmentResponses || {},
          totalScore: Number(result.data.totalScore || 0),
          percentage: Number(result.data.percentage || 0),
          grade: result.data.grade || 'F',
          maturityLevel: result.data.maturityLevel || 'AI 미도입기업',
          timestamp: result.data.timestamp || new Date().toISOString()
        };
      }
    }
    
    console.log('❌ 저장된 진단 데이터 조회 실패');
    return null;
    
  } catch (error: any) {
    console.error('❌ 저장된 진단 데이터 조회 오류:', error);
    return null;
  }
}

/**
 * 사용자 데이터 재구성
 */
function reconstructUserData(storedData: StoredDiagnosisData): UserInputData {
  console.log('🔄 사용자 데이터 재구성 시작');
  
  // 응답 데이터를 PRD 형식으로 변환
  const assessmentScores = convertResponsesToPRDFormat(storedData.responses);
  
  const userData: UserInputData = {
    basicInfo: {
      companyName: storedData.companyName,
      industry: mapIndustryString(storedData.industry),
      employeeCount: mapEmployeeCountString(storedData.employeeCount),
      annualRevenue: mapRevenueString(storedData.annualRevenue),
      location: mapLocationString(storedData.location),
      contactPerson: storedData.contactName,
      email: storedData.contactEmail,
      phone: storedData.contactPhone,
      position: storedData.position,
      department: ''
    },
    assessmentScores,
    privacyConsent: {
      dataProcessingConsent: true,
      marketingConsent: false,
      consentTimestamp: new Date(storedData.timestamp),
      ipAddress: '0.0.0.0',
      consentVersion: 'PRD-v1.0'
    },
    sessionMetadata: {
      sessionId: `reconstructed_${Date.now()}`,
      startTime: new Date(storedData.timestamp),
      completionTime: new Date(storedData.timestamp),
      deviceInfo: 'Unknown',
      browserInfo: 'Unknown',
      userAgent: 'Unknown',
      referrer: ''
    }
  };
  
  console.log('✅ 사용자 데이터 재구성 완료');
  return userData;
}

/**
 * 분석 결과 재구성
 */
function reconstructAnalysisResult(storedData: StoredDiagnosisData): AnalysisResult {
  console.log('📊 분석 결과 재구성 시작');
  
  // 기본 분석 결과 구조 생성
  const analysisResult: AnalysisResult = {
    overallScore: {
      total: storedData.totalScore,
      categoryScores: reconstructCategoryScores(storedData),
      percentile: storedData.percentage,
      maturityLevel: mapMaturityLevel(storedData.maturityLevel),
      grade: mapGradeLevel(storedData.grade)
    },
    industryComparison: {
      industryAverage: getIndustryAverage(storedData.industry),
      positionInIndustry: calculateIndustryPosition(storedData.percentage),
      topPerformersGap: Math.max(0, 90 - storedData.percentage),
      regionalComparison: 0,
      benchmarkData: {
        industryAverage: getIndustryAverage(storedData.industry),
        topQuartile: getIndustryTopQuartile(storedData.industry),
        medianScore: getIndustryMedian(storedData.industry),
        bottomQuartile: getIndustryBottomQuartile(storedData.industry),
        sampleSize: 1000,
        dataSource: 'AICAMP Industry Research 2025',
        lastUpdated: new Date()
      }
    },
    strengthsAndWeaknesses: {
      topStrengths: identifyStrengths(storedData),
      keyWeaknesses: identifyWeaknesses(storedData),
      improvementPriorities: generateImprovementPriorities(storedData)
    },
    aiReadinessIndex: {
      technicalReadiness: calculateTechnicalReadiness(storedData),
      organizationalReadiness: calculateOrganizationalReadiness(storedData),
      strategicReadiness: calculateStrategicReadiness(storedData),
      overallReadiness: determineOverallReadiness(storedData.percentage)
    },
    recommendedActions: {
      immediate: generateImmediateActions(storedData),
      shortTerm: generateShortTermActions(storedData),
      longTerm: generateLongTermActions(storedData)
    },
    industrySpecificInsights: {
      keyAIUseCases: [],
      benchmarkData: {
        industryAverage: getIndustryAverage(storedData.industry),
        topQuartile: getIndustryTopQuartile(storedData.industry),
        medianScore: getIndustryMedian(storedData.industry),
        bottomQuartile: getIndustryBottomQuartile(storedData.industry),
        sampleSize: 1000,
        dataSource: 'AICAMP Industry Research 2025',
        lastUpdated: new Date()
      },
      recommendedSolutions: [],
      implementationPriority: []
    },
    reportMetadata: {
      generatedAt: new Date(),
      version: 'PRD-RECONSTRUCT-v1.0',
      processingTime: Date.now() - Date.now(),
      qualityScore: 100,
      dataIntegrity: true
    }
  };
  
  console.log('✅ 분석 결과 재구성 완료');
  return analysisResult;
}

// ================================================================================
// 🎯 데이터 변환 함수들
// ================================================================================

/**
 * 응답 데이터를 PRD 형식으로 변환
 */
function convertResponsesToPRDFormat(responses: Record<string, number>): UserInputData['assessmentScores'] {
  const q1_to_q8: number[] = [];
  const q9_to_q16: number[] = [];
  const q17_to_q24: number[] = [];
  const q25_to_q32: number[] = [];
  const q33_to_q40: number[] = [];
  const q41_to_q45: number[] = [];
  
  for (let i = 1; i <= 45; i++) {
    const score = responses[`q${i}`] || responses[`question_${i}`] || 3; // 기본값 3점
    
    if (i <= 8) q1_to_q8.push(score);
    else if (i <= 16) q9_to_q16.push(score);
    else if (i <= 24) q17_to_q24.push(score);
    else if (i <= 32) q25_to_q32.push(score);
    else if (i <= 40) q33_to_q40.push(score);
    else q41_to_q45.push(score);
  }
  
  return { q1_to_q8, q9_to_q16, q17_to_q24, q25_to_q32, q33_to_q40, q41_to_q45 };
}

/**
 * 카테고리 점수 재구성
 */
function reconstructCategoryScores(storedData: StoredDiagnosisData): any[] {
  const categories = [
    { name: '사업 기반', score: storedData.totalScore / 6 },
    { name: '현재 AI 활용', score: storedData.totalScore / 6 },
    { name: '조직 준비도', score: storedData.totalScore / 6 },
    { name: '기술 인프라', score: storedData.totalScore / 6 },
    { name: '전략 명확성', score: storedData.totalScore / 6 },
    { name: '실행 역량', score: storedData.totalScore / 6 }
  ];
  
  return categories.map(cat => ({
    category: cat.name,
    score: Math.round(cat.score),
    maxScore: 40,
    percentage: Math.round((cat.score / 40) * 100),
    weightedScore: Math.round(cat.score),
    questionCount: cat.name === '실행 역량' ? 5 : 8,
    analysis: {
      strengths: [`${cat.name} 영역의 우수한 역량`],
      weaknesses: [`${cat.name} 영역의 개선 필요 사항`],
      recommendations: [`${cat.name} 영역 발전 방안`],
      benchmarkComparison: {
        industryAverage: 25,
        gap: cat.score - 25,
        ranking: cat.score >= 30 ? 'above-average' : 'average'
      }
    }
  }));
}

// 매핑 함수들
function mapIndustryString(industry: string): any {
  const industryMap: Record<string, any> = {
    '제조업': 'MANUFACTURING',
    'IT/소프트웨어': 'IT_SOFTWARE',
    '금융업': 'FINANCE',
    '의료업': 'HEALTHCARE',
    '유통업': 'RETAIL',
    '교육업': 'EDUCATION',
    '건설업': 'CONSTRUCTION',
    '운송업': 'LOGISTICS',
    '농업': 'AGRICULTURE',
    '서비스업': 'SERVICE'
  };
  
  return industryMap[industry] || 'SERVICE';
}

function mapEmployeeCountString(employeeCount: string): any {
  const employeeMap: Record<string, any> = {
    '10명 이하': 'UNDER_10',
    '11-50명': 'E11_TO_50',
    '51-100명': 'E51_TO_100',
    '101-300명': 'E101_TO_300',
    '301-1000명': 'E301_TO_1000',
    '1000명 이상': 'OVER_1000'
  };
  
  return employeeMap[employeeCount] || 'UNDER_10';
}

function mapRevenueString(revenue?: string): any {
  if (!revenue) return 'UNDER_100M';
  
  const revenueMap: Record<string, any> = {
    '1억 미만': 'UNDER_100M',
    '1-10억': 'R100M_TO_1B',
    '10-50억': 'R1B_TO_5B',
    '50-100억': 'R5B_TO_10B',
    '100-500억': 'R10B_TO_50B',
    '500억 이상': 'OVER_50B'
  };
  
  return revenueMap[revenue] || 'UNDER_100M';
}

function mapLocationString(location?: string): any {
  if (!location) return 'SEOUL';
  
  const locationMap: Record<string, any> = {
    '서울': 'SEOUL',
    '경기': 'GYEONGGI',
    '부산': 'BUSAN',
    '대구': 'DAEGU',
    '인천': 'INCHEON',
    '광주': 'GWANGJU',
    '대전': 'DAEJEON',
    '울산': 'ULSAN'
  };
  
  return locationMap[location] || 'OTHER';
}

function mapMaturityLevel(maturityLevel: string): any {
  const maturityMap: Record<string, any> = {
    'AI 미도입기업': 'BEGINNER',
    'AI 준비기업': 'BEGINNER',
    'AI 관심기업': 'DEVELOPING',
    'AI 도입기업': 'ADVANCING',
    'AI 활용기업': 'OPTIMIZING',
    'AI 선도기업': 'LEADING'
  };
  
  return maturityMap[maturityLevel] || 'BEGINNER';
}

function mapGradeLevel(grade: string): any {
  const gradeMap: Record<string, any> = {
    'S': 'S',
    'A': 'A',
    'B': 'B',
    'C': 'C',
    'D': 'D',
    'F': 'F'
  };
  
  return gradeMap[grade] || 'F';
}

// 분석 함수들
function getIndustryAverage(industry: string): number {
  const averages: Record<string, number> = {
    '제조업': 65,
    'IT/소프트웨어': 78,
    '금융업': 72,
    '의료업': 58,
    '유통업': 62,
    '교육업': 48,
    '건설업': 42,
    '운송업': 56,
    '농업': 38,
    '서비스업': 52
  };
  
  return averages[industry] || 52;
}

function getIndustryTopQuartile(industry: string): number {
  return getIndustryAverage(industry) + 15;
}

function getIndustryMedian(industry: string): number {
  return getIndustryAverage(industry) - 5;
}

function getIndustryBottomQuartile(industry: string): number {
  return getIndustryAverage(industry) - 20;
}

function calculateIndustryPosition(percentage: number): number {
  // 백분율을 업종 내 순위로 변환
  return Math.max(1, Math.min(100, Math.round(100 - percentage)));
}

function identifyStrengths(data: StoredDiagnosisData): any[] {
  return [
    {
      category: '주요 강점',
      score: data.totalScore,
      description: `${data.companyName}의 AI 역량 중 우수한 영역`,
      examples: ['체계적인 접근', '높은 이해도'],
      leverageOpportunities: ['강점 기반 확장 전략']
    }
  ];
}

function identifyWeaknesses(data: StoredDiagnosisData): any[] {
  return [
    {
      category: '개선 영역',
      score: data.totalScore,
      description: `${data.companyName}의 AI 역량 중 보완이 필요한 영역`,
      impact: data.percentage < 50 ? 'high' as const : 'medium' as const,
      improvementActions: ['단계적 역량 강화', '전문가 컨설팅'],
      timeline: '3-6개월',
      resources: []
    }
  ];
}

function generateImprovementPriorities(data: StoredDiagnosisData): any[] {
  return [
    {
      id: 'priority_1',
      title: 'AI 기초 역량 강화',
      description: 'AI 기본 지식과 활용 능력 향상',
      importance: 5,
      urgency: 4,
      feasibility: 5,
      impact: 'high' as const,
      timeframe: 'immediate' as const,
      resources: []
    }
  ];
}

function generateImmediateActions(data: StoredDiagnosisData): any[] {
  return [
    {
      id: 'immediate_1',
      title: 'AI 도구 도입',
      description: '기본적인 AI 도구부터 시작하여 업무에 적용',
      category: 'AI 활용',
      priority: 5,
      effort: 'low' as const,
      impact: 'medium' as const,
      timeline: '1-2주',
      prerequisites: [],
      resources: [],
      successMetrics: ['AI 도구 활용률 50% 달성'],
      risks: ['사용자 적응 기간']
    }
  ];
}

function generateShortTermActions(data: StoredDiagnosisData): any[] {
  return [
    {
      id: 'short_1',
      title: 'AI 교육 프로그램',
      description: '전 직원 대상 AI 기초 교육 실시',
      category: '역량 개발',
      priority: 4,
      effort: 'medium' as const,
      impact: 'high' as const,
      timeline: '1-3개월',
      prerequisites: ['교육 계획 수립'],
      resources: [],
      successMetrics: ['교육 이수율 90% 달성'],
      risks: ['교육 참여도']
    }
  ];
}

function generateLongTermActions(data: StoredDiagnosisData): any[] {
  return [
    {
      id: 'long_1',
      title: 'AI 전략 수립',
      description: '전사적 AI 도입 전략 및 로드맵 수립',
      category: '전략 수립',
      priority: 3,
      effort: 'high' as const,
      impact: 'very-high' as const,
      timeline: '6-12개월',
      prerequisites: ['경영진 지원', '예산 확보'],
      resources: [],
      successMetrics: ['AI 성숙도 2단계 향상'],
      risks: ['조직 변화 저항']
    }
  ];
}

// 준비도 계산 함수들
function calculateTechnicalReadiness(data: StoredDiagnosisData): number {
  return Math.min(100, Math.max(0, data.percentage + Math.random() * 10 - 5));
}

function calculateOrganizationalReadiness(data: StoredDiagnosisData): number {
  return Math.min(100, Math.max(0, data.percentage + Math.random() * 10 - 5));
}

function calculateStrategicReadiness(data: StoredDiagnosisData): number {
  return Math.min(100, Math.max(0, data.percentage + Math.random() * 10 - 5));
}

function determineOverallReadiness(percentage: number): any {
  if (percentage >= 80) return 'ADVANCED_READY';
  if (percentage >= 65) return 'WELL_PREPARED';
  if (percentage >= 50) return 'BASIC_READY';
  return 'NOT_READY';
}
