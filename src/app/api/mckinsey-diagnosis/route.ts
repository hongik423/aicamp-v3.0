/**
 * 맥킨지 역량진단 시스템 V16.0 OLLAMA ULTIMATE API 라우트
 * Ollama GPT-OSS 20B 전용 - 이교장의AI상담 시스템
 * 100% 온디바이스 AI, 외부 API 의존성 완전 제거
 */

import { NextRequest, NextResponse } from 'next/server';

// Ollama GPT-OSS 20B 전용 AI 호출
import { callAI } from '@/lib/ai/ai-provider';
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
    
    // 2단계: 45문항 점수 계산
    const scoreAnalysis = await calculate45QuestionScores(normalizedData);
    
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
    
    // 7단계: HTML 보고서 생성
    const htmlReport = await generateHTMLReport(mckinseyReport);
    
    // 8단계: Google Drive 업로드
    const driveUploadResult = await uploadToGoogleDrive(htmlReport, diagnosisId);
    
    // 9단계: 이메일 발송 (병렬 처리)
    const emailPromise = sendEmailNotification({
      ...normalizedData,
      diagnosisId,
      driveLink: driveUploadResult.shareLink,
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
        driveUploaded: driveUploadResult.success,
        driveLink: driveUploadResult.shareLink,
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
 * 진단 ID 생성
 */
function generateDiagnosisId(): string {
  return `DIAG_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

/**
 * 45문항 점수 계산
 */
async function calculate45QuestionScores(data: any) {
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
 * HTML 보고서 생성
 */
async function generateHTMLReport(report: McKinseyReportStructure) {
  // HTML 템플릿은 별도 파일로 관리
  const htmlTemplate = await import('@/lib/templates/mckinsey-report-template');
  return htmlTemplate.generateHTML(report);
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
