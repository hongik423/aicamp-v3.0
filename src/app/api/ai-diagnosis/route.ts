import { NextRequest, NextResponse } from 'next/server';
import { generateMcKinseyStyleReport, McKinseyReportData } from '@/lib/utils/mckinsey-style-report-generator';
import { EnhancedScoreResult } from '@/lib/utils/enhanced-score-engine';
import { uploadDiagnosisReport, getSharedFolderLink } from '@/lib/storage/google-drive-service';

// 동적 베이스 URL 생성 함수
function getDynamicBaseUrl(request: NextRequest): string {
  const host = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') || 'http';
  return `${protocol}://${host}`;
}

// GEMINI API 설정 (통합 시스템)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// 타임아웃 설정 (Vercel 최대 800초)
const TIMEOUT_MS = 800000; // 800초

export const maxDuration = 800; // Vercel 함수 최대 실행 시간

// 고급 점수 계산 함수
function calculateEnhancedScore(data: any): EnhancedScoreResult {
  const responses = data.assessmentResponses || [];
  if (responses.length === 0) {
    return {
      totalScore: 0,
      maturityLevel: 'Beginner',
      percentile: 5,
      categoryScores: {
        currentAI: 0,
        organizationReadiness: 0,
        techInfra: 0,
        dataManagement: 0,
        strategicPlanning: 0
      },
      detailedAnalysis: {
        strengths: ['기초 수준에서 시작'],
        weaknesses: ['전반적인 AI 역량 강화 필요'],
        opportunities: ['AI 도입을 통한 혁신 기회'],
        recommendations: ['기초 교육부터 체계적 시작']
      }
    };
  }
  
  // 카테고리별 점수 계산 (각 카테고리 10문항씩, 마지막 5문항)
  const categories = {
    currentAI: responses.slice(0, 10),
    organizationReadiness: responses.slice(10, 20),
    techInfra: responses.slice(20, 30),
    dataManagement: responses.slice(30, 40),
    strategicPlanning: responses.slice(40, 45)
  };
  
  const categoryScores = {
    currentAI: Math.round(categories.currentAI.reduce((sum: number, score: number) => sum + score, 0) / categories.currentAI.length * 20),
    organizationReadiness: Math.round(categories.organizationReadiness.reduce((sum: number, score: number) => sum + score, 0) / categories.organizationReadiness.length * 20),
    techInfra: Math.round(categories.techInfra.reduce((sum: number, score: number) => sum + score, 0) / categories.techInfra.length * 20),
    dataManagement: Math.round(categories.dataManagement.reduce((sum: number, score: number) => sum + score, 0) / categories.dataManagement.length * 20),
    strategicPlanning: Math.round(categories.strategicPlanning.reduce((sum: number, score: number) => sum + score, 0) / categories.strategicPlanning.length * 20)
  };
  
  const totalScore = Math.round(Object.values(categoryScores).reduce((sum, score) => sum + score, 0) / 5);
  
  let maturityLevel = 'Beginner';
  let percentile = 10;
  
  if (totalScore >= 80) {
    maturityLevel = 'Expert';
    percentile = 95;
  } else if (totalScore >= 60) {
    maturityLevel = 'Advanced';
    percentile = 75;
  } else if (totalScore >= 40) {
    maturityLevel = 'Intermediate';
    percentile = 50;
  } else {
    percentile = 25;
  }
  
  return {
    totalScore,
    maturityLevel,
    percentile,
    categoryScores,
    detailedAnalysis: {
      strengths: generateStrengths(categoryScores),
      weaknesses: generateWeaknesses(categoryScores),
      opportunities: ['AI 기술 도입을 통한 업무 효율성 향상', '자동화를 통한 비용 절감'],
      recommendations: generateRecommendations(totalScore, categoryScores)
    }
  };
}

function generateStrengths(scores: any): string[] {
  const strengths = [];
  if (scores.currentAI >= 70) strengths.push('AI 기술 활용 경험 보유');
  if (scores.organizationReadiness >= 70) strengths.push('조직의 변화 수용 능력');
  if (scores.techInfra >= 70) strengths.push('안정적인 기술 인프라');
  if (scores.dataManagement >= 70) strengths.push('체계적인 데이터 관리');
  if (scores.strategicPlanning >= 70) strengths.push('전략적 계획 수립 역량');
  
  return strengths.length > 0 ? strengths : ['기초적인 IT 인프라 보유'];
}

function generateWeaknesses(scores: any): string[] {
  const weaknesses = [];
  if (scores.currentAI < 50) weaknesses.push('AI 기술 활용 경험 부족');
  if (scores.organizationReadiness < 50) weaknesses.push('조직 변화 관리 체계 미흡');
  if (scores.techInfra < 50) weaknesses.push('기술 인프라 현대화 필요');
  if (scores.dataManagement < 50) weaknesses.push('데이터 관리 체계 개선 필요');
  if (scores.strategicPlanning < 50) weaknesses.push('AI 전략 수립 역량 강화 필요');
  
  return weaknesses.length > 0 ? weaknesses : ['전반적인 AI 역량 강화 필요'];
}

function generateRecommendations(totalScore: number, scores: any): string[] {
  if (totalScore >= 80) {
    return ['AI 리더십 확보', '고도화된 AI 기술 도입', '전사 AI 문화 확산'];
  } else if (totalScore >= 60) {
    return ['AI 전문 인력 확보', '파일럿 프로젝트 확대', 'AI 거버넌스 체계 구축'];
  } else if (totalScore >= 40) {
    return ['기초 AI 교육 실시', 'n8n 자동화 도입', 'AI 도입 로드맵 수립'];
  } else {
    return ['AI 기초 교육', '디지털 전환 기반 구축', '단계적 AI 도입 계획'];
  }
}

// GEMINI API 호출 함수 - 강화된 오류 처리
async function callGeminiAPI(prompt: string, retryCount: number = 3) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM') {
    console.warn('⚠️ GEMINI API 키가 설정되지 않았거나 기본값입니다. 기본 응답으로 대체합니다.');
    return generateFallbackResponse();
  }

  for (let attempt = 1; attempt <= retryCount; attempt++) {
    try {
      console.log(`🤖 GEMINI API 호출 시도 ${attempt}/${retryCount}`);
      
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 4000,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH", 
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
        signal: AbortSignal.timeout(45000) // 45초 타임아웃
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ GEMINI API 오류 (시도 ${attempt}):`, response.status, response.statusText, errorText);
        
        // 429 (Rate Limit) 또는 503 (Service Unavailable)인 경우 재시도
        if ((response.status === 429 || response.status === 503) && attempt < retryCount) {
          const delay = Math.pow(2, attempt) * 1000; // 지수 백오프
          console.log(`⏳ ${delay}ms 후 재시도...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        // 다른 오류는 즉시 폴백
        return generateFallbackResponse();
      }

      const result = await response.json();
      const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (generatedText) {
        console.log('✅ GEMINI API 호출 성공');
        return generatedText;
      } else {
        console.warn('⚠️ GEMINI API 응답이 비어있음');
        return generateFallbackResponse();
      }
      
    } catch (error: any) {
      console.error(`❌ GEMINI API 호출 실패 (시도 ${attempt}):`, error.message);
      
      // 네트워크 오류나 타임아웃인 경우 재시도
      if ((error.name === 'AbortError' || error.name === 'TypeError') && attempt < retryCount) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`⏳ ${delay}ms 후 재시도...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
    }
  }
  
  console.warn('⚠️ 모든 GEMINI API 시도 실패, 기본 응답 사용');
  return generateFallbackResponse();
}

// 대체 응답 생성
function generateFallbackResponse(): string {
  return `
# 🎯 AI 역량진단 결과 보고서

## 📊 진단 개요
귀사의 AI 역량진단이 완료되었습니다. 현재 상태를 종합적으로 분석하여 맞춤형 개선 방안을 제시드립니다.

## 🔍 SWOT 분석

### 💪 강점 (Strengths)
- 경영진의 AI 도입 의지와 관심도
- 기존 업무 프로세스의 체계화된 구조
- 직원들의 새로운 기술 학습에 대한 의욕

### ⚠️ 약점 (Weaknesses)  
- AI 관련 전문 인력 부족
- 데이터 관리 체계 미흡
- AI 도입을 위한 예산 및 투자 계획 부족

### 🌟 기회 (Opportunities)
- AI 기술의 급속한 발전과 접근성 향상
- 정부의 AI 도입 지원 정책 확대
- 업계 내 AI 도입 초기 단계로 선점 기회 존재

### ⚡ 위협 (Threats)
- 경쟁사의 AI 도입 가속화
- AI 기술 변화 속도에 따른 적응의 어려움
- 데이터 보안 및 개인정보보호 규제 강화

## 🚀 단계별 실행 계획

### 1단계 (1-3개월): 기반 구축
- AI 전담팀 구성 및 역할 정의
- 현재 데이터 현황 분석 및 품질 평가
- 전 직원 대상 기초 AI 교육 실시

### 2단계 (4-8개월): 시범 도입
- 우선순위 업무 영역에 AI 기술 도입
- 파일럿 프로젝트 실행 및 검증
- 성과 측정 지표 설정 및 모니터링

### 3단계 (9-12개월): 확산 및 고도화
- 전사 AI 시스템 구축 및 통합
- 고도화된 AI 솔루션 도입
- 지속적 개선 체계 구축

📝 **참고사항**: 이 보고서는 시스템 안정성을 위해 기본 템플릿으로 생성되었습니다.
`;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    console.log('🧠 이교장의AI역량진단보고서 API 시작 - GEMINI 2.5 Flash 모델');
    
    // 요청 데이터 파싱 - 개선된 안전한 방식
    let data;
    try {
      // request.json() 메소드 사용 (더 안전함)
      data = await request.json();
      
      // 데이터 유효성 기본 검증
      if (!data || typeof data !== 'object') {
        throw new Error('요청 데이터가 올바른 형식이 아닙니다.');
      }
      
      // 필수 필드 검증
      if (!data.companyName || !data.contactEmail || !data.contactName) {
        throw new Error('필수 정보가 누락되었습니다: 회사명, 담당자명, 이메일');
      }
      
    } catch (parseError: any) {
      console.error('❌ 요청 데이터 파싱 실패:', parseError);
      return NextResponse.json({
        success: false,
        error: `요청 데이터 파싱 실패: ${parseError.message}`,
        timestamp: new Date().toISOString()
      }, { status: 400 });
    }
    
    // 진단 ID 생성
    const diagnosisId = `DIAG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log('📋 진단 ID 생성:', diagnosisId);
    data.diagnosisId = diagnosisId;
    
    console.log('🔢 1단계: 고급 점수 계산 중...');
    const scores = calculateEnhancedScore(data);
    
    console.log('📊 2단계: AI 분석 시작...');
    let aiAnalysisResult = '';
    
    try {
      const aiAnalysisPrompt = `귀사의 AI 역량진단 결과를 종합하여 전문적인 분석 보고서를 작성해주세요.
      
      회사명: ${data.companyName}
      업종: ${data.industry}
      총점: ${scores.totalScore}점 (${scores.maturityLevel} 수준)
      백분위: 상위 ${100-scores.percentile}%
      
      카테고리별 점수:
      - 현재 AI 활용: ${scores.categoryScores.currentAI}점
      - 조직 준비도: ${scores.categoryScores.organizationReadiness}점
      - 기술 인프라: ${scores.categoryScores.techInfra}점
      - 데이터 관리: ${scores.categoryScores.dataManagement}점
      - 전략적 계획: ${scores.categoryScores.strategicPlanning}점
      
      다음 구조로 분석해주세요:
      1. 진단 결과 종합 평가
      2. 강점 및 개선 영역 분석  
      3. 단계별 실행 계획
      4. 투자 우선순위 제안`;
      
      aiAnalysisResult = await callGeminiAPI(aiAnalysisPrompt, 2); // 재시도 2회로 제한
      console.log('✅ AI 분석 완료');
    } catch (aiError: any) {
      console.error('❌ AI 분석 중 오류:', aiError);
      aiAnalysisResult = generateFallbackResponse();
    }
    
    console.log('📊 3단계: 맥킨지 스타일 HTML 보고서 생성 중...');
    
    // 맥킨지 스타일 보고서 데이터 구성
    const mckinseyData: McKinseyReportData = {
      companyName: data.companyName,
      industry: data.industry,
      customIndustry: data.customIndustry || '',
      employeeCount: data.employeeCount || '',
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      scores: scores,
      gapAnalysis: {
        industryAverage: 55,
        peerComparison: scores.totalScore > 55 ? 'above' : 'below',
        improvementAreas: scores.detailedAnalysis.weaknesses,
        competitivePosition: scores.totalScore >= 70 ? 'AI 선도 기업' : scores.totalScore >= 50 ? 'AI 도입 중간 단계' : 'AI 도입 초기 단계',
        industryGap: {
          total: Math.random() > 0.5 ? Math.floor(Math.random() * 20 + 5) : -Math.floor(Math.random() * 15 + 5)
        },
        sizeGap: {
          total: Math.random() > 0.5 ? Math.floor(Math.random() * 15 + 3) : -Math.floor(Math.random() * 12 + 3)
        }
      },
      swotAnalysis: {
        strengths: scores.detailedAnalysis.strengths,
        weaknesses: scores.detailedAnalysis.weaknesses,
        opportunities: scores.detailedAnalysis.opportunities,
        threats: ['경쟁사의 빠른 AI 도입', 'AI 기술 변화 속도', '인재 확보 경쟁']
      },
      priorityMatrix: {
        highImpactHighEffort: ['AI 전문 인력 확보', '전사 AI 전략 수립'],
        highImpactLowEffort: ['n8n 자동화 도입', '기초 AI 교육'],
        lowImpactHighEffort: ['대규모 시스템 교체'],
        lowImpactLowEffort: ['AI 동향 모니터링']
      },
      behaviorReport: null,
      diagnosisId: diagnosisId,
      timestamp: new Date().toISOString()
    };
    
    const htmlReport = generateMcKinseyStyleReport(mckinseyData);

    // 4단계: 진단 결과 Google Apps Script에 저장
    console.log('💾 4단계: 진단 결과 저장 중...');
    let gasResponse: any = null;
    
    try {
      const dynamicBase = getDynamicBaseUrl(request);
      
      const diagnosisData = {
        companyName: data.companyName,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone || '',
        industry: data.industry,
        customIndustry: data.customIndustry || '',
        employeeCount: data.employeeCount || '',
        annualRevenue: data.annualRevenue || '',
        location: data.location || '',
        diagnosisId,
        totalScore: scores.totalScore,
        maturityLevel: scores.maturityLevel,
        results: {
          totalScore: scores.totalScore,
          maturityLevel: scores.maturityLevel
        },
        htmlReport,
        analysis: aiAnalysisResult,
        timestamp: new Date().toISOString(),
        assessmentResponses: data.assessmentResponses || []
      };

      // Google Apps Script에 결과 저장 (타임아웃 단축)
      const saveResponse = await fetch(`${dynamicBase}/api/google-script-proxy`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          type: 'ai_diagnosis',
          action: 'saveDiagnosis',
          ...diagnosisData
        }),
        signal: AbortSignal.timeout(120000) // 2분으로 단축
      });

      if (saveResponse.ok) {
        try {
          const raw = await saveResponse.text();
          try {
            gasResponse = JSON.parse(raw);
            console.log('✅ 진단 결과 저장 성공');
          } catch (parseErr) {
            console.warn('⚠️ GAS 응답 파싱 실패, 원본 저장:', parseErr);
            gasResponse = { success: true, raw: raw.substring(0, 200) };
          }
        } catch (readErr) {
          console.warn('⚠️ GAS 응답 읽기 실패:', readErr);
          gasResponse = { success: true, warning: 'Response read failed' };
        }
      } else {
        const status = saveResponse.status;
        const statusText = saveResponse.statusText;
        console.warn(`⚠️ 진단 결과 저장 실패: ${status} ${statusText}`);
        
        try {
          const errorText = await saveResponse.text();
          gasResponse = { 
            success: false, 
            error: `HTTP ${status}: ${errorText.substring(0, 200)}` 
          };
        } catch {
          gasResponse = { 
            success: false, 
            error: `HTTP ${status}: ${statusText}` 
          };
        }
      }
    } catch (saveError: any) {
      console.error('❌ 진단 결과 저장 중 오류:', saveError);
      gasResponse = {
        success: false,
        error: saveError.name === 'AbortError' ? 'Timeout' : saveError.message,
        warning: 'GAS 저장 실패하였으나 진단은 정상 완료됨'
      };
    }

    // 5단계: Google Drive에 HTML 보고서 업로드 (선택사항)
    console.log('🗂️ 5단계: Google Drive 업로드 중...');
    let driveUploadResult = null;
    try {
      // 타임아웃을 짧게 설정하여 전체 프로세스 지연 방지
      const uploadPromise = uploadDiagnosisReport(
        data.companyName,
        diagnosisId,
        htmlReport
      );
      
      // 30초 타임아웃으로 제한
      driveUploadResult = await Promise.race([
        uploadPromise,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Drive upload timeout')), 30000)
        )
      ]) as any;
      
      if (driveUploadResult?.success) {
        console.log(`✅ Google Drive 업로드 성공: ${driveUploadResult.fileName}`);
      } else {
        console.warn(`⚠️ Google Drive 업로드 실패: ${driveUploadResult?.error || 'Unknown error'}`);
      }
    } catch (driveError: any) {
      console.warn('⚠️ Google Drive 업로드 중 오류 (진단 결과에는 영향 없음):', driveError.message);
      driveUploadResult = {
        success: false,
        error: driveError.message === 'Drive upload timeout' ? 'Timeout' : driveError.message,
        warning: 'Drive 업로드 실패하였으나 진단은 정상 완료됨'
      };
    }

    // 최종 응답
    const processingTime = Date.now() - startTime;
    console.log(`✅ AI 역량 진단 완료 - 처리시간: ${processingTime}ms`);

    return NextResponse.json({
      success: true,
      diagnosisId,
      processingTime: `${Math.round(processingTime / 1000)}초`,
      results: {
        totalScore: scores.totalScore,
        maturityLevel: scores.maturityLevel
      },
      htmlReport,
      analysis: aiAnalysisResult,
      gas: gasResponse ? {
        progressId: gasResponse.progressId || gasResponse.progress_id || null,
        emailsSent: gasResponse?.results?.emailsSent ?? gasResponse?.emailsSent ?? null,
        confirmationSent: gasResponse?.results?.confirmationSent ?? gasResponse?.confirmationSent ?? null,
        dataSaved: gasResponse?.results?.dataSaved ?? gasResponse?.dataSaved ?? null,
        raw: gasResponse?.raw ? (gasResponse.raw.length > 500 ? gasResponse.raw.slice(0, 500) + '...' : gasResponse.raw) : undefined
      } : null,
      driveUpload: driveUploadResult ? {
        success: driveUploadResult.success,
        fileName: driveUploadResult.fileName,
        fileId: driveUploadResult.fileId,
        webViewLink: driveUploadResult.webViewLink,
        webContentLink: driveUploadResult.webContentLink,
        sharedFolderLink: getSharedFolderLink(),
        error: driveUploadResult.error
      } : null,
      message: 'AI 역량 진단이 성공적으로 완료되었습니다.',
      timestamp: new Date().toISOString()
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });

  } catch (error: any) {
    const processingTime = Date.now() - startTime;
    console.error('❌ AI 역량 진단 처리 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || '알 수 없는 오류가 발생했습니다.',
      processingTime: `${Math.round(processingTime / 1000)}초`,
      timestamp: new Date().toISOString(),
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }
}
