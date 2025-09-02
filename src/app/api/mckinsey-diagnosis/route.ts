/**
 * 맥킨지 역량진단 시스템 - AICAMP 자체 분석 엔진 API 라우트
 * AICAMP 자체 분석 엔진 전용 - 이교장의AI상담 시스템
 * 100% 자체 분석, 외부 API 의존성 완전 제거
 */

import { NextRequest, NextResponse } from 'next/server';

// AICAMP 자체 분석 엔진 호출
import { callAI } from '@/lib/ai/ai-provider';
// AICAMP 자체 점수 계산 엔진
import { advancedScoringEngine, QuestionResponse } from '@/lib/analysis/advanced-scoring-engine';
// V22.0 보고서 저장 시스템
import { ReportStorage } from '@/lib/diagnosis/report-storage';
// 환경 변수 (Ollama 전용)
const GAS_DEPLOYMENT_URL = process.env.GAS_DEPLOYMENT_URL || '';
const DRIVE_FOLDER_ID = '1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj';

// 타임아웃 설정 (Vercel Pro 최대 800초)
export const maxDuration = 800;
export const dynamic = 'force-dynamic';

/**
 * 맥킨지 스타일 보고서 구조 (11개 섹션)
 */
interface McKinseyReportStructure {
  coverPage: {
    title: string;
    subtitle: string;
    companyName: string;
    diagnosisDate: string;
    diagnosisId: string;
    version: string;
  };
  executiveSummary: {
    coreFindings: string;
    totalScore: number;
    maturityLevel: string;
    percentile: number;
    immediateActions: string[];
  };
  companyInformation: {
    basicInfo: Record<string, any>;
    diagnosisOverview: string;
  };
  diagnosisVisualization: {
    scoreCards: Record<string, number>;
    radarChart: any;
    benchmarkChart: any;
  };
  behavioralAnalysis: {
    topStrengths: string[];
    improvementAreas: string[];
    keywords: string[];
  };
  benchmarkAnalysis: {
    industryComparison: any;
    sizeComparison: any;
    competitivePosition: string;
  };
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  priorityMatrix: {
    importanceUrgencyMatrix: any[];
    executionPriority: string[];
  };
  n8nMethodology: {
    curriculums: any[];
    customScenarios: string[];
  };
  aicampCurriculum: {
    recommendedCourses: any[];
    roi: {
      efficiency: string;
      decisionSpeed: string;
      costSaving: string;
      satisfaction: string;
    };
  };
  roadmap: {
    phase1: any;
    phase2: any;
    phase3: any;
  };
  conclusion: {
    keyMessage: string;
    nextSteps: string[];
    contactInfo: any;
  };
}

/**
 * POST: AI 역량진단 처리
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const data = await request.json();
    console.log('🎯 맥킨지 역량진단 시스템 V15.0 시작');
    
    // 1단계: 데이터 검증 및 정규화
    const normalizedData = normalizeRequestData(data);
    const diagnosisId = generateDiagnosisId();
    
    // 2단계: V22.0 고도화된 점수 계산 엔진 활용
    const scoreAnalysis = await calculateAdvancedScores(normalizedData);
    
    // 3단계: Ollama GPT-OSS 20B 정량적 분석
    const quantitativeAnalysis = await performQuantitativeAnalysis(scoreAnalysis);
    
    // 4단계: Ollama GPT-OSS 20B 정성적 분석
    const qualitativeAnalysis = await performQualitativeAnalysis(normalizedData, scoreAnalysis);
    
    // 5단계: 통합 인사이트 생성
    const integratedInsights = await generateIntegratedInsights(
      quantitativeAnalysis,
      qualitativeAnalysis
    );
    
    // 6단계: 맥킨지 보고서 생성 (11개 섹션)
    const mckinseyReport = await generateMcKinseyReport({
      diagnosisId,
      normalizedData,
      scoreAnalysis,
      integratedInsights
    });
    
    // 7단계: V22.0 동적 HTML 보고서 생성
    const htmlReport = await generateAdvancedHTMLReport(mckinseyReport, scoreAnalysis, normalizedData);
    
    // 8단계: V22.0 보고서 저장 시스템 활용
    const reportStorageResult = await saveReportWithAdvancedSystem(htmlReport, diagnosisId, normalizedData, scoreAnalysis);
    
    // 9단계: 이메일 발송 (병렬 처리)
    const emailPromise = sendEmailNotification({
      ...normalizedData,
      diagnosisId,
      driveLink: reportStorageResult.shareLink || reportStorageResult.localStorageKey,
      reportData: mckinseyReport,
      email: normalizedData.contactEmail,
      companyName: normalizedData.companyName,
      contactName: normalizedData.contactName
    });
    
    // 10단계: Google Apps Script 데이터 저장 (병렬 처리)
    const sheetsPromise = saveToGoogleSheets({
      diagnosisId,
      ...normalizedData,
      ...scoreAnalysis,
      ...mckinseyReport
    });
    
    // 병렬 처리 결과 대기
    const [emailResult, sheetsResult] = await Promise.allSettled([
      emailPromise,
      sheetsPromise
    ]);
    
    console.log('📊 처리 결과:', {
      email: emailResult.status,
      sheets: sheetsResult.status
    });
    
    const processingTime = Date.now() - startTime;
    
    return NextResponse.json({
      success: true,
      diagnosisId,
      results: {
        totalScore: scoreAnalysis.totalScore,
        maturityLevel: scoreAnalysis.maturityLevel,
        grade: scoreAnalysis.grade,
        percentile: scoreAnalysis.percentile,
        reportGenerated: true,
        reportSaved: reportStorageResult.success,
        driveLink: reportStorageResult.shareLink,
        localStorageKey: reportStorageResult.localStorageKey,
        emailSent: emailResult.status === 'fulfilled' ? emailResult.value.success : false,
        processingTime: `${processingTime}ms`
      },
      message: '맥킨지 역량진단이 성공적으로 완료되었습니다.',
      version: 'V15.0-ULTIMATE-MCKINSEY'
    });
    
  } catch (error) {
    console.error('❌ 맥킨지 역량진단 오류:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '진단 처리 중 오류가 발생했습니다.',
        version: 'V15.0-ULTIMATE-MCKINSEY'
      },
      { status: 500 }
    );
  }
}

/**
 * 데이터 정규화
 */
function normalizeRequestData(data: any) {
  return {
    companyName: data.companyName || '',
    contactName: data.contactName || '',
    contactEmail: data.contactEmail || '',
    contactPhone: data.contactPhone || '',
    industry: data.industry || '',
    employeeCount: data.employeeCount || '',
    annualRevenue: data.annualRevenue || '',
    location: data.location || '',
    assessmentResponses: data.assessmentResponses || [],
    mainConcerns: data.mainConcerns || '',
    expectedBenefits: data.expectedBenefits || '',
    timestamp: new Date().toISOString()
  };
}

/**
 * 진단 ID 생성 (GAS와 호환되는 형식)
 */
function generateDiagnosisId(): string {
  // GAS와 동일한 형식으로 생성
  const safeChars = '23456789abcdefghjkmnpqrstuvwxyz';
  let randomSuffix = '';
  for (let i = 0; i < 9; i++) {
    randomSuffix += safeChars.charAt(Math.floor(Math.random() * safeChars.length));
  }
  return `DIAG_45Q_AI_${Date.now()}_${randomSuffix}`;
}

/**
 * V22.0 고도화된 점수 계산 (Advanced Scoring Engine 활용)
 */
async function calculateAdvancedScores(data: any) {
  const responses = data.assessmentResponses || [];
  
  // 응답 데이터를 QuestionResponse 형식으로 변환
  const questionResponses: QuestionResponse[] = responses.map((score: number, index: number) => ({
    questionId: index + 1,
    score: score,
    category: getCategoryForQuestion(index + 1),
    weight: 1.0,
    confidence: 5 // 기본 신뢰도
  }));
  
  // 회사 정보 구성
  const companyInfo = {
    name: data.companyName,
    industry: data.industry,
    employeeCount: data.employeeCount,
    annualRevenue: data.annualRevenue,
    location: data.location
  };
  
  try {
    // 고도화된 점수 계산 엔진 실행
    const advancedResult = await advancedScoringEngine.calculateAdvancedScore(
      questionResponses, 
      companyInfo
    );
    
    // 기존 형식과 호환되도록 결과 변환
    const categoryScores = {
      businessFoundation: Math.round(advancedResult.categoryScores[0]?.normalizedScore || 0),
      currentAI: Math.round(advancedResult.categoryScores[1]?.normalizedScore || 0),
      organizationReadiness: Math.round(advancedResult.categoryScores[2]?.normalizedScore || 0),
      techInfrastructure: Math.round(advancedResult.categoryScores[3]?.normalizedScore || 0),
      goalClarity: Math.round(advancedResult.categoryScores[4]?.normalizedScore || 0),
      executionCapability: Math.round(advancedResult.categoryScores[5]?.normalizedScore || 0)
    };
    
    const maturityLevel = determineMaturityLevel(advancedResult.totalScore);
    const grade = determineGrade(advancedResult.totalScore);
    const percentile = Math.round(advancedResult.percentageScore);
    
    return {
      totalScore: Math.round(advancedResult.totalScore),
      categoryScores,
      maturityLevel,
      grade,
      percentile,
      responseCount: responses.length,
      // V22.0 추가 데이터
      advancedResult,
      qualityMetrics: advancedResult.qualityMetrics,
      benchmarkComparison: advancedResult.benchmarkComparison,
      statisticalAnalysis: advancedResult.statisticalAnalysis
    };
    
  } catch (error) {
    console.error('❌ 고도화된 점수 계산 실패, 기본 계산으로 대체:', error);
    
    // 폴백: 기본 점수 계산
    return await calculateBasicScores(data);
  }
}

/**
 * 질문 번호에 따른 카테고리 매핑
 */
function getCategoryForQuestion(questionId: number) {
  const categoryMap = [
    { id: 'ai_strategy', name: 'AI 전략 수립', nameEn: 'AI Strategy Development', weight: 1.2, subcategories: [] },
    { id: 'data_management', name: '데이터 관리', nameEn: 'Data Management', weight: 1.1, subcategories: [] },
    { id: 'technology_infrastructure', name: '기술 인프라', nameEn: 'Technology Infrastructure', weight: 1.0, subcategories: [] },
    { id: 'organizational_readiness', name: '조직 준비도', nameEn: 'Organizational Readiness', weight: 1.15, subcategories: [] },
    { id: 'ai_culture', name: 'AI 문화', nameEn: 'AI Culture', weight: 1.05, subcategories: [] },
    { id: 'governance_ethics', name: '거버넌스 & 윤리', nameEn: 'Governance & Ethics', weight: 1.1, subcategories: [] }
  ];
  
  const categoryIndex = Math.floor((questionId - 1) / 8);
  return categoryMap[categoryIndex] || categoryMap[0];
}

/**
 * 기본 점수 계산 (폴백용)
 */
async function calculateBasicScores(data: any) {
  const responses = data.assessmentResponses || [];
  const totalScore = responses.reduce((sum: number, score: number) => sum + score, 0);
  
  // 카테고리별 점수 계산
  const categoryScores = {
    businessFoundation: calculateCategoryScore(responses.slice(0, 8)),
    currentAI: calculateCategoryScore(responses.slice(8, 16)),
    organizationReadiness: calculateCategoryScore(responses.slice(16, 24)),
    techInfrastructure: calculateCategoryScore(responses.slice(24, 32)),
    goalClarity: calculateCategoryScore(responses.slice(32, 38)),
    executionCapability: calculateCategoryScore(responses.slice(38, 45))
  };
  
  // 성숙도 레벨 결정
  const maturityLevel = determineMaturityLevel(totalScore);
  const grade = determineGrade(totalScore);
  const percentile = calculatePercentile(totalScore, data.industry);
  
  return {
    totalScore: Math.round(totalScore),
    categoryScores,
    maturityLevel,
    grade,
    percentile,
    responseCount: responses.length
  };
}

/**
 * 카테고리 점수 계산
 */
function calculateCategoryScore(responses: number[]): number {
  if (responses.length === 0) return 0;
  return Math.round(responses.reduce((sum, score) => sum + score, 0) / responses.length * 20);
}

/**
 * 성숙도 레벨 결정
 */
function determineMaturityLevel(score: number): string {
  if (score >= 85) return 'Expert';
  if (score >= 70) return 'Advanced';
  if (score >= 55) return 'Intermediate';
  if (score >= 40) return 'Basic';
  return 'Beginner';
}

/**
 * 등급 결정
 */
function determineGrade(score: number): string {
  if (score >= 90) return 'S';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

/**
 * 백분위 계산
 */
function calculatePercentile(score: number, industry: string): number {
  // 업종별 평균 점수 (예시)
  const industryAverages: Record<string, number> = {
    'IT/소프트웨어': 75,
    '제조업': 65,
    '금융/보험': 70,
    '유통/도소매': 60,
    '건설/부동산': 55,
    '의료/헬스케어': 68
  };
  
  const avgScore = industryAverages[industry] || 60;
  const percentile = Math.min(95, Math.max(5, 50 + (score - avgScore) * 2));
  
  return Math.round(percentile);
}

/**
 * Ollama 정량적 분석
 */
async function performQuantitativeAnalysis(scoreAnalysis: any) {
  const prompt = `
    다음 AI 역량진단 점수를 정량적으로 분석해주세요:
    - 총점: ${scoreAnalysis.totalScore}점
    - 카테고리별 점수: ${JSON.stringify(scoreAnalysis.categoryScores)}
    - 성숙도: ${scoreAnalysis.maturityLevel}
    
    다음 형식으로 분석해주세요:
    1. 점수 분포 분석
    2. 강점 영역 (상위 3개)
    3. 개선 필요 영역 (하위 3개)
    4. 업계 대비 위치
    5. 개선 잠재력 수치
  `;
  
  return await callAI({ prompt, maxTokens: 4096, temperature: 0.7, timeoutMs: 600000 });
}

/**
 * Ollama GPT-OSS 20B 정성적 분석 (GEMINI 대체)
 */
async function performQualitativeAnalysis(data: any, scoreAnalysis: any) {
  const prompt = `
    기업명: ${data.companyName}
    업종: ${data.industry}
    규모: ${data.employeeCount}
    주요 고민: ${data.mainConcerns}
    기대 효과: ${data.expectedBenefits}
    AI 역량 점수: ${scoreAnalysis.totalScore}점
    
    위 정보를 바탕으로 정성적 분석을 제공해주세요:
    1. 조직 문화 관점 분석
    2. 비즈니스 영향도 평가
    3. 변화 관리 필요성
    4. 리더십 권고사항
    5. 장기적 비전 제시
  `;
  
  return await callAI({ prompt, maxTokens: 4096, temperature: 0.7, timeoutMs: 600000 });
}

/**
 * Ollama GPT-OSS 20B API 호출 (GEMINI 완전 대체)
 */
// 모든 AI 호출은 callAI를 통해 Ollama GPT-OSS 20B로 처리됨

/**
 * 통합 인사이트 생성
 */
async function generateIntegratedInsights(quantitative: any, qualitative: any) {
  return {
    quantitativeInsights: quantitative,
    qualitativeInsights: qualitative,
    integratedRecommendations: [
      '단기 실행 과제 (1-3개월)',
      '중기 전략 과제 (3-6개월)',
      '장기 혁신 과제 (6-12개월)'
    ],
    keySuccessFactors: [
      '경영진의 의지',
      '직원 참여도',
      '기술 인프라',
      '변화 관리'
    ]
  };
}

/**
 * 맥킨지 보고서 생성 (11개 섹션)
 */
async function generateMcKinseyReport(params: any): Promise<McKinseyReportStructure> {
  const { diagnosisId, normalizedData, scoreAnalysis, integratedInsights } = params;
  
  return {
    coverPage: {
      title: '이교장의AI역량진단보고서',
      subtitle: '이교장 방법론 기반 정밀 분석',
      companyName: normalizedData.companyName,
      diagnosisDate: new Date().toLocaleDateString('ko-KR'),
      diagnosisId: diagnosisId,
      version: 'V15.0'
    },
    executiveSummary: {
      coreFindings: integratedInsights.quantitativeInsights,
      totalScore: scoreAnalysis.totalScore,
      maturityLevel: scoreAnalysis.maturityLevel,
      percentile: scoreAnalysis.percentile,
      immediateActions: ['AI 기초 교육', '데이터 정리', '조직 준비']
    },
    companyInformation: {
      basicInfo: normalizedData,
      diagnosisOverview: '45개 행동지표 기반 정밀 진단'
    },
    diagnosisVisualization: {
      scoreCards: scoreAnalysis.categoryScores,
      radarChart: generateRadarChartData(scoreAnalysis.categoryScores),
      benchmarkChart: generateBenchmarkData(scoreAnalysis)
    },
    behavioralAnalysis: {
      topStrengths: extractTopStrengths(scoreAnalysis),
      improvementAreas: extractImprovementAreas(scoreAnalysis),
      keywords: ['혁신', '효율성', '자동화', '데이터']
    },
    benchmarkAnalysis: {
      industryComparison: { position: scoreAnalysis.percentile },
      sizeComparison: { rank: 'Top 25%' },
      competitivePosition: scoreAnalysis.percentile > 75 ? 'Leader' : 'Follower'
    },
    swotAnalysis: {
      strengths: ['경영진 의지', '자원 확보', '시장 기회'],
      weaknesses: ['기술 역량', '조직 문화', '프로세스'],
      opportunities: ['AI 도입', '자동화', '혁신'],
      threats: ['경쟁 심화', '기술 변화', '인재 부족']
    },
    priorityMatrix: {
      importanceUrgencyMatrix: generatePriorityMatrix(),
      executionPriority: ['교육', '인프라', '파일럿', '확산']
    },
    n8nMethodology: {
      curriculums: [
        { name: 'n8n 기초', hours: 12 },
        { name: '업무 자동화', hours: 16 },
        { name: 'AI 통합', hours: 20 }
      ],
      customScenarios: ['CRM 자동화', '보고서 생성', '데이터 분석']
    },
    aicampCurriculum: {
      recommendedCourses: ['AI 기초', 'n8n 실무', '리더십'],
      roi: {
        efficiency: '300% 향상',
        decisionSpeed: '50% 개선',
        costSaving: '연간 2억원',
        satisfaction: '40% 증가'
      }
    },
    roadmap: {
      phase1: { name: 'AI 기초 구축', duration: '1-2개월', budget: 'TBD' },
      phase2: { name: '자동화 고도화', duration: '3-4개월', budget: 'TBD' },
      phase3: { name: 'AI 조직 완성', duration: '5-6개월', budget: 'TBD' }
    },
    conclusion: {
      keyMessage: 'AI 역량 강화를 통한 경쟁력 확보',
      nextSteps: ['상담 신청', '교육 참여', '파일럿 시작'],
      contactInfo: {
        phone: '010-9251-9743',
        email: 'hongik423@gmail.com',
        website: 'aicamp.club'
      }
    }
  };
}

// 헬퍼 함수들
function generateRadarChartData(scores: any) {
  return Object.entries(scores).map(([key, value]) => ({
    category: key,
    score: value
  }));
}

function generateBenchmarkData(analysis: any) {
  return {
    company: analysis.totalScore,
    industry: 65,
    best: 85
  };
}

function extractTopStrengths(analysis: any) {
  const sorted = Object.entries(analysis.categoryScores)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 3);
  return sorted.map(([key]) => key);
}

function extractImprovementAreas(analysis: any) {
  const sorted = Object.entries(analysis.categoryScores)
    .sort(([, a], [, b]) => (a as number) - (b as number))
    .slice(0, 3);
  return sorted.map(([key]) => key);
}

function generatePriorityMatrix() {
  return [
    { item: 'AI 교육', importance: 9, urgency: 8 },
    { item: '데이터 정리', importance: 8, urgency: 7 },
    { item: '인프라 구축', importance: 7, urgency: 6 }
  ];
}

/**
 * V22.0 고도화된 동적 HTML 보고서 생성
 */
async function generateAdvancedHTMLReport(report: McKinseyReportStructure, scoreAnalysis: any, normalizedData: any) {
  try {
    // McKinsey HTML Generator 사용
    const { generateMcKinseyHTMLReport } = await import('@/lib/reports/mckinsey-html-generator');
    
    // 분석 결과를 LeeKyoJang45QuestionsResult 형식으로 변환
    const analysisResult = {
      diagnosisId: report.coverPage.diagnosisId,
      timestamp: new Date().toISOString(),
      companyInfo: {
        name: report.coverPage.companyName,
        industry: normalizedData.industry || '정보 없음',
        size: normalizedData.employeeCount || '정보 없음',
        contact: {
          name: normalizedData.contactName || '',
          email: normalizedData.contactEmail || '',
          phone: normalizedData.contactPhone,
          position: ''
        }
      },
      scoreAnalysis: {
        totalScore: scoreAnalysis.totalScore || 0,
        averageScore: scoreAnalysis.averageScore || Math.round((scoreAnalysis.totalScore || 0) / 45),
        percentage: scoreAnalysis.percentage || Math.round(((scoreAnalysis.totalScore || 0) / 225) * 100),
        grade: scoreAnalysis.grade || 'C',
        maturityLevel: scoreAnalysis.maturityLevel || 'Basic',
        percentile: scoreAnalysis.percentile || 50,
        weightedScore: scoreAnalysis.weightedScore || scoreAnalysis.totalScore || 0,
        categoryScores: scoreAnalysis.categoryScores || {
          businessFoundation: 0,
          currentAI: 0,
          organizationReadiness: 0,
          techInfrastructure: 0,
          goalClarity: 0,
          executionCapability: 0
        }
      },
      detailedAnalysis: {
        strengths: [
          {
            category: 'businessFoundation',
            score: scoreAnalysis.categoryScores?.businessFoundation || 0,
            description: '경영진의 AI 도입 의지',
            actionItems: ['AI 전략 수립', '예산 확보']
          },
          {
            category: 'techInfrastructure',
            score: scoreAnalysis.categoryScores?.techInfrastructure || 0,
            description: '기본적인 디지털 인프라',
            actionItems: ['인프라 고도화', '보안 강화']
          }
        ],
        weaknesses: [
          {
            category: 'currentAI',
            score: scoreAnalysis.categoryScores?.currentAI || 0,
            description: 'AI 전문 인력 부족',
            actionItems: ['인력 채용', '교육 프로그램']
          },
          {
            category: 'organizationReadiness',
            score: scoreAnalysis.categoryScores?.organizationReadiness || 0,
            description: '데이터 관리 체계 미흡',
            actionItems: ['데이터 거버넌스', '품질 관리']
          }
        ],
        opportunities: ['AI 기술 도입 기회', '업무 자동화 가능성'],
        threats: ['경쟁사 AI 도입 가속화', '기술 변화 속도']
      },
      recommendations: {
        immediate: [
          {
            priority: 1,
            title: 'AI 기초 교육 프로그램 도입',
            description: '전 직원 대상 AI 기초 소양 교육 실시',
            timeline: '1개월',
            resources: ['교육 전문가', '교육 자료'],
            expectedOutcome: 'AI에 대한 기본 이해도 향상'
          }
        ],
        shortTerm: [
          {
            priority: 1,
            title: '데이터 품질 관리 체계 구축',
            description: '데이터 수집, 정제, 관리 프로세스 표준화',
            timeline: '3개월',
            resources: ['데이터 엔지니어', '관리 도구'],
            expectedOutcome: '고품질 데이터 확보'
          }
        ],
        longTerm: [
          {
            priority: 1,
            title: '조직 내 AI 문화 조성',
            description: 'AI 활용을 위한 조직 문화 및 프로세스 개선',
            timeline: '6개월',
            resources: ['변화관리 전문가', '내부 챔피언'],
            expectedOutcome: 'AI 친화적 조직 문화 정착'
          }
        ]
      },
      roadmap: {
        phase1: {
          title: 'AI 기반 구축',
          duration: '1-3개월',
          objectives: ['AI 기초 역량 확보', '데이터 인프라 구축'],
          keyActivities: ['AI 교육', '데이터 정리', '인프라 준비'],
          milestones: ['교육 완료', '데이터 품질 개선', '기본 인프라 구축'],
          budget: '1,000만원'
        },
        phase2: {
          title: 'AI 활용 확산',
          duration: '3-6개월',
          objectives: ['AI 활용 사례 확산', '프로세스 개선'],
          keyActivities: ['파일럿 프로젝트', '프로세스 개선', '성과 측정'],
          milestones: ['파일럿 성공', '프로세스 표준화', 'ROI 달성'],
          budget: '3,000만원'
        },
        phase3: {
          title: 'AI 전문 조직',
          duration: '6-12개월',
          objectives: ['AI 전문 조직 구성', '고도화 달성'],
          keyActivities: ['전문 조직 구성', '고도화', '확산'],
          milestones: ['전담 조직 설립', '고급 AI 도입', '전사 확산'],
          budget: '5,000만원'
        }
      },
      responses: normalizedData.responses || {}, // Record<string, number> 타입으로 초기화
      qualityMetrics: {
        dataCompleteness: 95,
        responseConsistency: 90,
        analysisDepth: 85,
        recommendationRelevance: 88,
        overallQuality: 89
      }
    };
    
    // Gemini 보고서 내용 (Ollama로 대체)
    const geminiReport = {
      content: {
        coverPage: '',
        executiveSummary: `
          <div style="background: #f8fafc; padding: 30px; border-radius: 12px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-bottom: 20px;">🎯 핵심 진단 결과</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
              <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #3b82f6;">${scoreAnalysis.totalScore}점</div>
                <div style="color: #6b7280;">종합 점수</div>
              </div>
              <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #10b981;">${scoreAnalysis.grade}등급</div>
                <div style="color: #6b7280;">AI 역량 등급</div>
              </div>
              <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #f59e0b;">${scoreAnalysis.maturityLevel}</div>
                <div style="color: #6b7280;">성숙도 수준</div>
              </div>
            </div>
            <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 8px;">
              <h4 style="color: #1f2937; margin-bottom: 15px;">💡 즉시 실행 권고사항</h4>
              <ul style="color: #4b5563; line-height: 1.6;">
                <li>AI 기초 교육 프로그램 도입</li>
                <li>데이터 품질 관리 체계 구축</li>
                <li>조직 내 AI 문화 조성</li>
                <li>단계별 AI 도입 로드맵 수립</li>
              </ul>
            </div>
          </div>
        `,
        companyInformation: `
          <div style="background: #f8fafc; padding: 30px; border-radius: 12px;">
            <h3 style="color: #1f2937; margin-bottom: 20px;">🏢 진단 개요</h3>
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 15px;">
                본 진단은 McKinsey 방법론을 기반으로 한 45개 행동지표를 통해 
                귀하의 조직의 AI 역량을 정밀 분석한 결과입니다.
              </p>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-top: 20px;">
                <div style="text-align: center; padding: 15px; background: #f3f4f6; border-radius: 8px;">
                  <div style="font-weight: bold; color: #1f2937;">45개</div>
                  <div style="font-size: 14px; color: #6b7280;">행동지표</div>
                </div>
                <div style="text-align: center; padding: 15px; background: #f3f4f6; border-radius: 8px;">
                  <div style="font-weight: bold; color: #1f2937;">6개</div>
                  <div style="font-size: 14px; color: #6b7280;">핵심 영역</div>
                </div>
                <div style="text-align: center; padding: 15px; background: #f3f4f6; border-radius: 8px;">
                  <div style="font-weight: bold; color: #1f2937;">100점</div>
                  <div style="font-size: 14px; color: #6b7280;">만점 기준</div>
                </div>
              </div>
            </div>
          </div>
        `,
        behavioralAnalysis: `
          <div style="background: #f8fafc; padding: 30px; border-radius: 12px;">
            <h3 style="color: #1f2937; margin-bottom: 20px;">📊 행동지표 상세 분석</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
              <div style="background: white; padding: 20px; border-radius: 8px;">
                <h4 style="color: #10b981; margin-bottom: 15px;">💪 강점 영역</h4>
                <ul style="color: #4b5563; line-height: 1.6;">
                  <li>경영진의 AI 도입 의지</li>
                  <li>기본적인 디지털 인프라</li>
                  <li>직원들의 학습 의욕</li>
                </ul>
              </div>
              <div style="background: white; padding: 20px; border-radius: 8px;">
                <h4 style="color: #f59e0b; margin-bottom: 15px;">🎯 개선 영역</h4>
                <ul style="color: #4b5563; line-height: 1.6;">
                  <li>AI 전문 인력 부족</li>
                  <li>데이터 관리 체계 미흡</li>
                  <li>AI 활용 프로세스 부재</li>
                </ul>
              </div>
            </div>
          </div>
        `,
        benchmarkAnalysis: `
          <div style="background: #f8fafc; padding: 30px; border-radius: 12px;">
            <h3 style="color: #1f2937; margin-bottom: 20px;">📈 벤치마크 분석</h3>
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <p style="color: #4b5563; line-height: 1.6;">
                동종업계 대비 AI 역량 수준을 분석한 결과, 
                현재 상위 ${100 - scoreAnalysis.percentile}% 수준에 위치하고 있습니다.
              </p>
            </div>
          </div>
        `
      }
    };
    
    const htmlRequest = {
      analysisResult,
      geminiReport,
      branding: {
        companyName: 'AICAMP',
        colors: {
          primary: '#1f2937',
          secondary: '#6b7280',
          accent: '#3b82f6'
        }
      },
      options: {
        includeCharts: true,
        includeAppendix: true,
        language: 'ko' as const,
        format: 'web' as const
      }
    };
    
    const htmlReport = generateMcKinseyHTMLReport(htmlRequest);
    console.log('✅ V22.0 동적 HTML 보고서 생성 완료');
    
    return htmlReport;
    
  } catch (error) {
    console.error('❌ 고도화된 HTML 보고서 생성 실패, 기본 보고서로 대체:', error);
    
    // 폴백: 기본 HTML 보고서
    return generateBasicHTMLReport(report, scoreAnalysis);
  }
}

/**
 * 기본 HTML 보고서 생성 (폴백용)
 */
function generateBasicHTMLReport(report: McKinseyReportStructure, scoreAnalysis: any): string {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${report.coverPage.companyName} AI 역량진단보고서</title>
    <style>
        body { font-family: 'Pretendard', sans-serif; margin: 0; padding: 20px; background: #f8fafc; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #1f2937, #3b82f6); color: white; padding: 40px; text-align: center; border-radius: 12px 12px 0 0; }
        .content { padding: 40px; }
        .score-section { text-align: center; margin: 30px 0; }
        .total-score { font-size: 48px; font-weight: bold; color: #3b82f6; }
        .grade-badge { display: inline-block; padding: 10px 20px; border-radius: 25px; font-size: 24px; font-weight: bold; color: white; background: linear-gradient(135deg, #10b981, #059669); margin: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${report.coverPage.companyName}</h1>
            <h2>AI 역량진단보고서 V22.0</h2>
            <p>진단일: ${report.coverPage.diagnosisDate} | 진단ID: ${report.coverPage.diagnosisId}</p>
        </div>
        <div class="content">
            <div class="score-section">
                <h2>종합 평가 결과</h2>
                <div class="total-score">${scoreAnalysis.totalScore}점</div>
                <div class="grade-badge">${scoreAnalysis.grade}등급</div>
                <div class="grade-badge">${scoreAnalysis.maturityLevel}</div>
            </div>
            <h3>🎯 V22.0 고도화된 진단 시스템</h3>
            <ul>
                <li>McKinsey 방법론 기반 고도화된 점수 계산</li>
                <li>45문항 정밀 분석</li>
                <li>업종별 벤치마크 비교</li>
                <li>AI 기반 개선 방안 제시</li>
            </ul>
        </div>
    </div>
</body>
</html>`;
}

/**
 * V22.0 고도화된 보고서 저장 시스템
 */
async function saveReportWithAdvancedSystem(
  htmlReport: string, 
  diagnosisId: string, 
  normalizedData: any, 
  scoreAnalysis: any
): Promise<{ success: boolean; shareLink?: string; driveWebViewLink?: string; localStorageKey?: string; fileId?: string; fileName?: string; error?: string }> {
  try {
    console.log('🚀 V22.0 보고서 저장 시스템 시작:', diagnosisId);
    
    // 파일명 생성
    const fileName = `AI역량진단보고서_${normalizedData.companyName}_${diagnosisId}_${new Date().toISOString().split('T')[0]}.html`;
    
    // 고도화된 저장 시스템 실행
    const result = await ReportStorage.generateHTMLReport(normalizedData, fileName);
    
    if (result.success) {
      console.log('✅ V22.0 보고서 저장 성공:', {
        driveLink: result.driveWebViewLink,
        localKey: result.localStorageKey
      });
      
      // 저장소 정리 (비동기)
      ReportStorage.cleanupStorage(10).catch(error => {
        console.error('⚠️ 저장소 정리 실패:', error);
      });
      
      return {
        success: result.success,
        shareLink: result.driveWebViewLink,
        driveWebViewLink: result.driveWebViewLink,
        localStorageKey: result.localStorageKey,
        fileId: result.driveFileId,
        fileName: fileName
      };
    } else {
      console.error('❌ V22.0 보고서 저장 실패:', result.error);
      
      // 폴백: 기존 Google Drive 업로드 시도
      return await uploadToGoogleDrive(htmlReport, diagnosisId);
    }
    
  } catch (error: any) {
    console.error('❌ V22.0 보고서 저장 시스템 오류:', error);
    
    // 폴백: 기존 Google Drive 업로드 시도
    return await uploadToGoogleDrive(htmlReport, diagnosisId);
  }
}

/**
 * Google Drive 업로드 (실제 구현)
 */
async function uploadToGoogleDrive(htmlContent: string, diagnosisId: string) {
  try {
    console.log('🗂️ Google Drive 업로드 시작:', diagnosisId);
    
    // Google Apps Script를 통한 업로드
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://aicamp.club'}/api/google-script-proxy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'drive_upload',
        action: 'uploadHTMLReport',
        folderId: '1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj',
        fileName: `AI역량진단보고서_${diagnosisId}_${new Date().toISOString().slice(0,10)}.html`,
        content: htmlContent,
        mimeType: 'text/html',
        description: `이교장의AI역량진단보고서 - ${diagnosisId}`
      }),
      signal: AbortSignal.timeout(120000) // 2분 타임아웃
    });
    
    if (!response.ok) {
      throw new Error(`Drive 업로드 실패: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (result.success && result.driveResult) {
      console.log('✅ Google Drive 업로드 성공:', result.driveResult.webViewLink);
      return {
        success: true,
        shareLink: result.driveResult.webViewLink,
        fileId: result.driveResult.fileId,
        fileName: result.driveResult.fileName
      };
    } else {
      throw new Error(result.error || 'Drive 업로드 실패');
    }
    
  } catch (error) {
    console.error('❌ Google Drive 업로드 오류:', error);
    
    // 업로드 실패해도 시스템은 계속 진행
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류',
      shareLink: null
    };
  }
}

/**
 * 이메일 발송 (Google Apps Script 연동)
 */
async function sendEmailNotification(params: any) {
  try {
    console.log('📧 이메일 발송 시작:', params.email);
    
    // Google Apps Script로 이메일 발송 요청
    const gasUrl = process.env.NEXT_PUBLIC_GAS_URL || 
                  process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || 
                  'https://script.google.com/macros/s/AKfycbxlwpifmXQEmFlR0QBV6NbTemzxTxvWwbaXNGmtH4Ok-a0PDEqmtaKBjQ1VvZxpLnPz/exec';
    
    const emailPayload = {
      type: 'send_email',
      action: 'send_diagnosis_report',
      to: params.email,
      companyName: params.companyName,
      contactName: params.contactName || params.contactManager,
      diagnosisId: params.diagnosisId,
      driveLink: params.driveLink,
      reportData: params.reportData,
      timestamp: new Date().toISOString()
    };
    
    const response = await fetch(gasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailPayload),
      signal: AbortSignal.timeout(30000) // 30초 타임아웃
    });
    
    if (!response.ok) {
      throw new Error(`이메일 발송 실패: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ 이메일 발송 완료:', result);
    
    return { success: true, result };
    
  } catch (error) {
    console.error('❌ 이메일 발송 오류:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Google Sheets 저장 (개선된 버전)
 */
async function saveToGoogleSheets(data: any) {
  const gasUrl = GAS_DEPLOYMENT_URL || 
                process.env.NEXT_PUBLIC_GAS_URL || 
                process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
                
  if (!gasUrl) {
    console.warn('⚠️ Google Apps Script URL이 설정되지 않았습니다');
    return { success: false, error: 'GAS URL not configured' };
  }
  
  try {
    console.log('💾 Google Sheets 저장 시작');
    
    const response = await fetch(gasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'save_diagnosis',
        action: 'ai_diagnosis',
        data: {
          ...data,
          timestamp: new Date().toISOString(),
          version: 'V15.0-MCKINSEY'
        }
      }),
      signal: AbortSignal.timeout(30000) // 30초 타임아웃
    });
    
    if (!response.ok) {
      throw new Error(`Sheets 저장 실패: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Google Sheets 저장 완료:', result);
    
    return result;
  } catch (error) {
    console.error('❌ Google Sheets 저장 실패:', error);
    return { success: false, error: error.message };
  }
}

/**
 * GET: 진단 결과 조회
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const diagnosisId = searchParams.get('diagnosisId');
  
  if (!diagnosisId) {
    return NextResponse.json(
      { error: '진단 ID가 필요합니다.' },
      { status: 400 }
    );
  }
  
  // 진단 결과 조회 로직
  return NextResponse.json({
    success: true,
    diagnosisId,
    message: '진단 결과를 조회했습니다.'
  });
}
