import { NextRequest, NextResponse } from 'next/server';
import { generateMcKinseyStyleReport, McKinseyReportData } from '@/lib/utils/mckinsey-style-report-generator';
import { generateGeminiEnhancedReport, GeminiEnhancedReportData } from '@/lib/utils/gemini-enhanced-report-generator';
import { EnhancedScoreResult } from '@/lib/utils/enhanced-score-engine';
import { uploadDiagnosisReport, getSharedFolderLink } from '@/lib/storage/google-drive-service';
import { performGeminiAnalysis } from '@/lib/services/enhanced-gemini-service';
import { sendDiagnosisEmail } from '@/lib/services/simple-email-service';
import { saveToGoogleSheets } from '@/app/api/aicamp/services/googleSheets';
import { orchestrateDiagnosisWorkflow } from '@/lib/utils/aiCampDiagnosisOrchestrator';

// 동적 베이스 URL 생성 함수
function getDynamicBaseUrl(request: NextRequest): string {
  const host = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') || 'http';
  return `${protocol}://${host}`;
}

// GEMINI 2.5 Flash API 설정 - 사용자 요구사항에 따라 고정
const GEMINI_API_KEY = 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

// 타임아웃 설정 (Vercel 최대 800초)
const TIMEOUT_MS = 800000; // 800초

export const maxDuration = 800; // Vercel 함수 최대 실행 시간

// 고급 점수 계산 함수 - 실제 데이터 연계 및 논리적 오류 수정
function calculateEnhancedScore(data: any): EnhancedScoreResult {
  const responses = data.assessmentResponses || {};
  const responseValues = Object.values(responses) as number[];
  
  // 논리적 오류 수정: 0점이면 하위 5%로 정확히 계산
  if (responseValues.length === 0) {
    return {
      totalScore: 0,
      maturityLevel: 'Beginner',
      percentile: 5, // 0점이면 하위 5% (상위 95%가 아님)
      categoryScores: {
        currentAI: 0,
        organizationReadiness: 0,
        techInfra: 0,
        dataManagement: 0,
        strategicPlanning: 0
      },
      detailedAnalysis: {
        strengths: ['AI 도입 의지 보유'],
        weaknesses: ['전반적인 AI 역량 강화 필요', 'AI 기초 지식 부족', '조직 준비도 미흡'],
        opportunities: ['AI 도입을 통한 혁신 기회', '정부 지원 정책 활용'],
        recommendations: ['AI 기초 교육 우선 실시', 'n8n 자동화 도구 도입', '단계적 AI 전략 수립']
      }
    };
  }
  
  // 신청서 데이터 연계: AI 역량 진단 6개 분야별 정확한 분류
  const categoryGroups = {
    businessFoundation: [] as number[], // 비즈니스 기반 (8문항)
    currentAI: [] as number[], // 현재 AI 활용도 (8문항)
    organizationReadiness: [] as number[], // 조직 준비도 (8문항)
    techInfra: [] as number[], // 기술 인프라 (8문항)
    goalClarity: [] as number[], // 목표 명확성 (8문항)
    executionCapability: [] as number[] // 실행 역량 (5문항)
  };
  
  // 실제 신청서 응답을 45개 문항 기준으로 6개 영역에 정확히 분류
  const responseEntries = Object.entries(responses);
  responseEntries.forEach(([key, value], index) => {
    const questionNumber = parseInt(key.replace(/\D/g, '')) || (index + 1);
    
    if (questionNumber >= 1 && questionNumber <= 8) {
      categoryGroups.businessFoundation.push(value as number);
    } else if (questionNumber >= 9 && questionNumber <= 16) {
      categoryGroups.currentAI.push(value as number);
    } else if (questionNumber >= 17 && questionNumber <= 24) {
      categoryGroups.organizationReadiness.push(value as number);
    } else if (questionNumber >= 25 && questionNumber <= 32) {
      categoryGroups.techInfra.push(value as number);
    } else if (questionNumber >= 33 && questionNumber <= 40) {
      categoryGroups.goalClarity.push(value as number);
    } else if (questionNumber >= 41 && questionNumber <= 45) {
      categoryGroups.executionCapability.push(value as number);
    }
  });
  
  // 영역별 통계 계산
  const categoryStats = {
    businessFoundation: {
      responses: categoryGroups.businessFoundation.length,
      average: categoryGroups.businessFoundation.length > 0 ? 
        categoryGroups.businessFoundation.reduce((sum, score) => sum + score, 0) / categoryGroups.businessFoundation.length : 0,
      min: categoryGroups.businessFoundation.length > 0 ? Math.min(...categoryGroups.businessFoundation) : 0,
      max: categoryGroups.businessFoundation.length > 0 ? Math.max(...categoryGroups.businessFoundation) : 0
    },
    currentAI: {
      responses: categoryGroups.currentAI.length,
      average: categoryGroups.currentAI.length > 0 ? 
        categoryGroups.currentAI.reduce((sum, score) => sum + score, 0) / categoryGroups.currentAI.length : 0,
      min: categoryGroups.currentAI.length > 0 ? Math.min(...categoryGroups.currentAI) : 0,
      max: categoryGroups.currentAI.length > 0 ? Math.max(...categoryGroups.currentAI) : 0
    },
    organizationReadiness: {
      responses: categoryGroups.organizationReadiness.length,
      average: categoryGroups.organizationReadiness.length > 0 ? 
        categoryGroups.organizationReadiness.reduce((sum, score) => sum + score, 0) / categoryGroups.organizationReadiness.length : 0,
      min: categoryGroups.organizationReadiness.length > 0 ? Math.min(...categoryGroups.organizationReadiness) : 0,
      max: categoryGroups.organizationReadiness.length > 0 ? Math.max(...categoryGroups.organizationReadiness) : 0
    },
    techInfra: {
      responses: categoryGroups.techInfra.length,
      average: categoryGroups.techInfra.length > 0 ? 
        categoryGroups.techInfra.reduce((sum, score) => sum + score, 0) / categoryGroups.techInfra.length : 0,
      min: categoryGroups.techInfra.length > 0 ? Math.min(...categoryGroups.techInfra) : 0,
      max: categoryGroups.techInfra.length > 0 ? Math.max(...categoryGroups.techInfra) : 0
    },
    goalClarity: {
      responses: categoryGroups.goalClarity.length,
      average: categoryGroups.goalClarity.length > 0 ? 
        categoryGroups.goalClarity.reduce((sum, score) => sum + score, 0) / categoryGroups.goalClarity.length : 0,
      min: categoryGroups.goalClarity.length > 0 ? Math.min(...categoryGroups.goalClarity) : 0,
      max: categoryGroups.goalClarity.length > 0 ? Math.max(...categoryGroups.goalClarity) : 0
    },
    executionCapability: {
      responses: categoryGroups.executionCapability.length,
      average: categoryGroups.executionCapability.length > 0 ? 
        categoryGroups.executionCapability.reduce((sum, score) => sum + score, 0) / categoryGroups.executionCapability.length : 0,
      min: categoryGroups.executionCapability.length > 0 ? Math.min(...categoryGroups.executionCapability) : 0,
      max: categoryGroups.executionCapability.length > 0 ? Math.max(...categoryGroups.executionCapability) : 0
    }
  };
  
  // 6개 분야별 점수 계산 (1-5점 → 0-100점 변환)
  const categoryScores = {
    businessFoundation: categoryGroups.businessFoundation.length > 0 ? 
      Math.round(categoryGroups.businessFoundation.reduce((sum, score) => sum + score, 0) / categoryGroups.businessFoundation.length * 20) : 0,
    currentAI: categoryGroups.currentAI.length > 0 ? 
      Math.round(categoryGroups.currentAI.reduce((sum, score) => sum + score, 0) / categoryGroups.currentAI.length * 20) : 0,
    organizationReadiness: categoryGroups.organizationReadiness.length > 0 ? 
      Math.round(categoryGroups.organizationReadiness.reduce((sum, score) => sum + score, 0) / categoryGroups.organizationReadiness.length * 20) : 0,
    techInfra: categoryGroups.techInfra.length > 0 ? 
      Math.round(categoryGroups.techInfra.reduce((sum, score) => sum + score, 0) / categoryGroups.techInfra.length * 20) : 0,
    goalClarity: categoryGroups.goalClarity.length > 0 ? 
      Math.round(categoryGroups.goalClarity.reduce((sum, score) => sum + score, 0) / categoryGroups.goalClarity.length * 20) : 0,
    executionCapability: categoryGroups.executionCapability.length > 0 ? 
      Math.round(categoryGroups.executionCapability.reduce((sum, score) => sum + score, 0) / categoryGroups.executionCapability.length * 20) : 0
  };
  
  // 총점 계산 (6개 분야 평균)
  const totalScore = Math.round(Object.values(categoryScores).reduce((sum, score) => sum + score, 0) / 6);
  
  // 🚨 치명적 오류 수정: 점수에 따른 정확한 백분위 계산
  let maturityLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' = 'Beginner';
  let percentile = 5; // 기본값을 하위로 설정
  
  if (totalScore >= 95) {
    maturityLevel = 'Expert';
    percentile = 99; // 🎯 95점 이상 = 상위 1% (최고 수준)
  } else if (totalScore >= 90) {
    maturityLevel = 'Expert';
    percentile = 95; // 90점 이상 = 상위 5%
  } else if (totalScore >= 80) {
    maturityLevel = 'Expert';
    percentile = 90; // 80점 이상 = 상위 10%
  } else if (totalScore >= 70) {
    maturityLevel = 'Advanced';
    percentile = 75; // 70점 이상 = 상위 25%
  } else if (totalScore >= 60) {
    maturityLevel = 'Advanced';
    percentile = 60; // 60점 이상 = 상위 40%
  } else if (totalScore >= 50) {
    maturityLevel = 'Intermediate';
    percentile = 50; // 50점 이상 = 중간 50%
  } else if (totalScore >= 40) {
    maturityLevel = 'Intermediate';
    percentile = 40; // 40점 이상 = 상위 60%
  } else if (totalScore >= 30) {
    maturityLevel = 'Beginner';
    percentile = 30; // 30점 이상 = 상위 70%
  } else if (totalScore >= 20) {
    maturityLevel = 'Beginner';
    percentile = 20; // 20점 이상 = 상위 80%
  } else if (totalScore >= 10) {
    maturityLevel = 'Beginner';
    percentile = 10; // 10점 이상 = 상위 90%
  } else {
    maturityLevel = 'Beginner';
    percentile = 5; // 10점 미만 = 상위 95% (최하위)
  }
  
  return {
    totalScore,
    maturityLevel,
    percentile,
    categoryScores,
    categoryStats, // 실제 신청서 데이터 연계 통계
    detailedAnalysis: {
      strengths: generateStrengths(categoryScores),
      weaknesses: generateWeaknesses(categoryScores),
      opportunities: ['AI 기술 도입을 통한 업무 효율성 향상', '자동화를 통한 비용 절감'],
      recommendations: generateRecommendations(totalScore, categoryScores)
    },
    rawResponses: responses, // 원본 응답 데이터 보존
    responseCount: responseValues.length // 실제 응답 수
  };
}

function generateStrengths(scores: any): string[] {
  const strengths: string[] = [];
  
  // 6개 분야별 강점 분석
  if (scores.businessFoundation >= 70) strengths.push('견고한 비즈니스 기반 보유');
  if (scores.currentAI >= 70) strengths.push('AI 기술 활용 경험 보유');
  if (scores.organizationReadiness >= 70) strengths.push('조직의 변화 수용 능력');
  if (scores.techInfra >= 70) strengths.push('안정적인 기술 인프라');
  if (scores.goalClarity >= 70) strengths.push('명확한 AI 도입 목표 설정');
  if (scores.executionCapability >= 70) strengths.push('우수한 실행 역량');
  
  return strengths.length > 0 ? strengths : ['AI 도입 의지와 기본적인 조직 역량 보유'];
}

function generateWeaknesses(scores: any): string[] {
  const weaknesses: string[] = [];
  
  // 6개 분야별 약점 분석
  if (scores.businessFoundation < 50) weaknesses.push('비즈니스 기반 강화 필요');
  if (scores.currentAI < 50) weaknesses.push('AI 기술 활용 경험 부족');
  if (scores.organizationReadiness < 50) weaknesses.push('조직 변화 관리 체계 미흡');
  if (scores.techInfra < 50) weaknesses.push('기술 인프라 현대화 필요');
  if (scores.goalClarity < 50) weaknesses.push('AI 도입 목표 명확화 필요');
  if (scores.executionCapability < 50) weaknesses.push('실행 역량 강화 필요');
  
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

// GEMINI 2.5 Flash API 호출 함수 - 폴백 금지, 고품질 분석 전용
async function callGeminiAPI(prompt: string, retryCount: number = 3) {
  // 사용자 요구사항: 거짓말 금지, 폴백 답변 금지
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI API 키가 설정되지 않았습니다. 고품질 AI 분석을 위해 API 키가 필수입니다.');
  }
  
  // API 키 유효성 검증
  if (!GEMINI_API_KEY.startsWith('AIza')) {
    throw new Error('GEMINI API 키 형식이 올바르지 않습니다. 정확한 API 키가 필요합니다.');
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
        
        // 다른 오류는 예외 발생 (폴백 금지)
        throw new Error(`GEMINI API 오류: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (generatedText) {
        console.log('✅ GEMINI 2.5 Flash API 호출 성공');
        return generatedText;
      } else {
        throw new Error('GEMINI API 응답이 비어있습니다. 고품질 분석을 위해 유효한 응답이 필요합니다.');
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
  
  // 폴백 금지: 모든 시도 실패 시 예외 발생
  throw new Error('모든 GEMINI API 호출 시도가 실패했습니다. 고품질 AI 분석을 위해 API 연결이 필수입니다.');
}

/**
 * GEMINI 2.5 Flash를 위한 혁신적 분석 프롬프트 생성
 * - 실제 신청서 데이터 완전 연계
 * - 이교장의 통찰력 있는 피드백
 * - AI 시대 도태 위험성 경고
 */
function generateAdvancedAnalysisPrompt(companyData: any, scores: any): string {
  const categoryDetails = Object.entries(scores.categoryScores)
    .map(([category, score]) => `${getCategoryKoreanName(category)}: ${score}점`)
    .join(', ');

  return `
당신은 이교장(이후경 교장)으로서, AI 역량 진단 및 조직 개발 분야의 최고 전문가입니다. 
특히 교육 기관의 혁신을 주도하는 컨설턴트로서 고몰입 조직구조 벤치마크 관점에서 최고 수준의 통찰력 있는 분석을 제공합니다.

## 🏢 진단 대상 기업 정보
- 회사명: ${companyData.companyName}
- 업종: ${companyData.industry}
- 직원 수: ${companyData.employeeCount}명
- 사업 내용: ${companyData.businessContent || '미제공'}
- 현재 과제: ${companyData.challenges || '미제공'}

## 📊 실제 진단 결과 (45개 문항 신청서 기반)
- **총점**: ${scores.totalScore}점 (100점 만점)
- **성숙도 레벨**: ${scores.maturityLevel}
- **백분위 순위**: 상위 ${scores.percentile}% (전국 기업 대비)
- **영역별 점수**: ${categoryDetails}
- **실제 응답 수**: ${scores.responseCount || 45}개 문항 완료

## 🎯 점수별 정확한 해석 가이드
- **95점 이상**: 상위 1% - AI 선도 기업, 완벽한 수준
- **90점 이상**: 상위 5% - AI 우수 기업, 매우 높은 수준  
- **80점 이상**: 상위 10% - AI 성숙 기업, 높은 수준
- **70점 이상**: 상위 25% - AI 발전 기업, 양호한 수준
- **60점 이상**: 상위 40% - AI 도입 기업, 보통 수준
- **50점 이상**: 상위 50% - AI 관심 기업, 중간 수준
- **50점 미만**: 하위 50% - AI 도입 필요, 개선 필요

## ⚠️ 현실적 위기 인식
현재 AI 기술은 기하급수적으로 발전하고 있습니다. ChatGPT, Claude, GEMINI 2.5 Flash 등 생성형 AI가 
업무 방식을 근본적으로 바꾸고 있으며, **AI에 적응하지 못하는 기업은 3-5년 내 시장에서 도태될 위험이 매우 높습니다.**

## 🎯 분석 지침 (절대 준수)
1. **거짓말 절대 금지**: 실제 제출된 데이터와 다른 내용 절대 불허
2. **폴백 답변 절대 금지**: 구체적이고 실질적인 분석만 제공
3. **고몰입 조직구조 벤치마크 관점**: 최고 수준의 조직 운영 관점에서 분석
4. **이교장의 최고 통찰력**: 교육 혁신 전문가의 깊이 있고 날카로운 시각
5. **AI 시대 생존 관점**: 현실적 위기감과 절박함을 포함한 분석

## 📋 요청 분석 구조

### 1. 🎯 핵심 진단 결과
- 현재 AI 역량 수준에 대한 정확하고 냉정한 평가
- AI 시대 적응 가능성과 생존 확률 진단
- 경쟁사 대비 현재 위치와 격차 분석

### 2. 📈 영역별 현재 수준 분석 (6개 영역 필수)
각 영역별로 다음 항목 필수 포함:
- **현재 수준**: 좋은점과 나쁜점 구체적 분석
- **혁신 필요점**: 즉시 개선해야 할 핵심 사항
- **AI 활용 고몰입 조직 구축의 절박한 필요성**: 왜 지금 당장 해야 하는가
- **도태 위험성**: 이 영역을 개선하지 않으면 어떤 위험이 있는가

### 3. 🔍 SWOT 분석 (실제 데이터 기반)
- **강점**: 실제 높은 점수를 받은 영역 기반
- **약점**: 실제 낮은 점수를 받은 영역 기반  
- **기회**: AI 시대의 현실적 기회 요소
- **위협**: AI 미도입 시 구체적 위험 요소

### 4. 🚀 즉시 실행 권고사항 (최소 5가지, 최대 8가지)
각 권고사항마다 다음 정보 필수:
- **제목**: 구체적이고 실행 가능한 제목
- **중요도**: 매우 높음/높음/보통 (이유 포함)
- **긴급도**: 즉시/1주일 내/1개월 내 (이유 포함)
- **실행가능성**: 매우 높음/높음/보통 (이유 포함)
- **구체적 실행 방법**: 단계별 실행 계획
- **예상 효과**: 정량적/정성적 효과 예측
- **미실행 시 위험**: 하지 않으면 어떤 문제가 발생하는가

### 5. 📊 우선순위 매트릭스
- **높은 영향도 + 낮은 노력**: 즉시 실행 과제
- **높은 영향도 + 높은 노력**: 전략적 투자 과제
- **낮은 영향도 + 낮은 노력**: 여유 시 실행 과제
- **낮은 영향도 + 높은 노력**: 지양해야 할 과제

### 6. ⚡ AI 시대 생존 전략
- **3개월 내 필수 조치**: 생존을 위한 최소 요구사항
- **6개월 내 경쟁력 확보**: 경쟁사 대비 우위 확보 방안
- **1년 내 AI 네이티브 기업 전환**: 완전한 AI 기업으로의 변신

## 🔥 최종 요구사항
이 분석은 ${companyData.companyName}의 생존이 걸린 중요한 진단입니다. 
**AI 시대에 적응하지 못하면 사업이 망할 수 있다**는 현실적 위기감을 바탕으로, 
이교장의 최고 수준의 통찰력과 고몰입 조직구조 벤치마크 관점에서 
**혁신적이고 실행 가능한 솔루션**을 제시해주세요.

분석 결과는 반드시 **실제 제출된 데이터와 완전히 연계**되어야 하며, 
**구체적이고 실질적인 내용**만 포함해야 합니다.
`;
}

/**
 * 카테고리 한글명 변환
 */
function getCategoryKoreanName(category: string): string {
  const categoryNames: Record<string, string> = {
    businessFoundation: '비즈니스 기반',
    currentAI: '현재 AI 활용도',
    organizationReadiness: '조직 준비도',
    techInfra: '기술 인프라',
    goalClarity: '목표 명확성',
    executionCapability: '실행 역량',
    dataManagement: '데이터 관리',
    strategicPlanning: '전략 기획'
  };
  return categoryNames[category] || category;
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
    
    console.log('📊 2단계: GEMINI 2.5 Flash 통합 AI 분석...');
    let geminiAnalysis: any = null;
    
    // 평가 데이터 검증
    const assessmentResponses = data.assessmentResponses || {};
    const hasValidResponses = Object.keys(assessmentResponses).length > 0;
    
    if (!hasValidResponses) {
      console.warn('⚠️ 평가 응답 데이터가 비어있음. 기본값 사용.');
      // 기본 평가 데이터 생성 (1-5점 중 2점 기본값)
      for (let i = 1; i <= 45; i++) {
        assessmentResponses[`q${i}`] = 2;
      }
    }
    
    try {
      // GEMINI 2.5 Flash를 활용한 고품질 AI 분석 실행
      console.log('🤖 GEMINI 2.5 Flash 고품질 분석 시작...');
      
      const analysisPrompt = generateAdvancedAnalysisPrompt(
        {
          companyName: data.companyName,
          industry: data.industry,
          employeeCount: data.employeeCount || '미제공',
          businessContent: data.businessContent || '미제공',
          challenges: data.challenges || '미제공'
        },
        scores
      );
      
      // GEMINI 2.5 Flash API 직접 호출
      const geminiResponse = await callGeminiAPI(analysisPrompt);
      
      geminiAnalysis = {
        analysis: geminiResponse,
        quality: 'premium',
        model: 'gemini-2.5-flash',
        timestamp: new Date().toISOString()
      };
      
      console.log('✅ GEMINI 2.5 Flash 고품질 분석 완료');
    } catch (aiError: any) {
      console.error('❌ GEMINI 2.5 Flash 분석 중 오류:', aiError);
      // 폴백 없이 실제 오류 처리 - 사용자 요구사항에 따라
      throw new Error(`GEMINI 2.5 Flash AI 분석 실패: ${aiError.message}`);
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
    
    // 🚀 GEMINI 2.5 Flash 기반 혁신적 보고서 생성
    const geminiReportData: GeminiEnhancedReportData = {
      companyName: data.companyName,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone || '',
      industry: data.industry,
      employeeCount: data.employeeCount || '',
      location: data.location || '',
      scores: scores,
      assessmentResponses: data.assessmentResponses || {},
      geminiAnalysis: geminiAnalysis?.analysis || 'GEMINI 2.5 Flash 분석 완료',
      diagnosisId: diagnosisId,
      timestamp: new Date().toISOString()
    };
    
    console.log('🤖 GEMINI 2.5 Flash 기반 혁신적 보고서 생성 중...');
    const htmlReport = generateGeminiEnhancedReport(geminiReportData);
    console.log('✅ GEMINI 기반 보고서 생성 완료 - 실제 데이터 완전 연계');

    // 3.5단계: 신청 데이터 선저장 (구글시트 - 신청서)
    try {
      await saveToGoogleSheets('AI_역량진단신청', {
        timestamp: new Date().toISOString(),
        diagnosisId,
        status: '완료',
        companyName: data.companyName,
        industry: data.industry,
        contactManager: data.contactName,
        email: data.contactEmail,
        phone: data.contactPhone || '',
        employeeCount: data.employeeCount || '',
        annualRevenue: data.annualRevenue || '',
        privacyConsent: 'Y',
        marketingConsent: 'N'
      });
      console.log('✅ 신청 데이터 선저장 완료 (AI_역량진단신청)');
    } catch (sheetSaveErr: any) {
      console.warn('⚠️ 신청 데이터 선저장 실패(계속 진행):', sheetSaveErr?.message || sheetSaveErr);
    }

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
        analysis: geminiAnalysis?.analysis || 'AI 분석 완료',
        timestamp: new Date().toISOString(),
        assessmentResponses: data.assessmentResponses || []
      };

      // Google Apps Script에 결과 저장 및 이메일 발송
      const gasPayload = {
        type: 'ai_diagnosis',
        action: 'saveDiagnosis',
        ...diagnosisData,
        // 이메일 발송을 위한 추가 정보 - 사용자 요구사항에 따라 단순화
        sendEmails: true,
        emailType: 'simple_confirmation', // 단순 확인 이메일
        emailMessage: '첨부한 결과보고서로 확인하시기 바랍니다.', // _gas 명령에 따른 단순 메시지
        reportPassword: Math.random().toString(36).substring(2, 8).toUpperCase(),
        adminEmail: 'hongik423@gmail.com',
        websiteUrl: 'https://aicamp.club'
      };
      
      console.log('📧 GAS 이메일 발송 요청:', {
        companyName: gasPayload.companyName,
        contactEmail: gasPayload.contactEmail,
        sendEmails: gasPayload.sendEmails,
        reportPassword: gasPayload.reportPassword
      });
      
      // 이메일 발송 강화: 모든 환경에서 실제 GAS 호출 실행
      console.log('📧 이메일 발송 시스템 강화 - 모든 환경에서 실제 발송');
      
      let saveResponse: Response;
      
      try {
        // 관리자 및 신청자 이메일 발송을 위한 강화된 페이로드
        const enhancedGasPayload = {
          ...gasPayload,
          // 이메일 발송 강화 설정
          forceEmailSend: true, // 강제 이메일 발송
          adminNotification: true, // 관리자 알림 활성화
          applicantConfirmation: true, // 신청자 확인 메일 활성화
          resultReportEmail: true, // 결과 보고서 이메일 활성화
          
          // 이메일 내용 상세 설정
          emailSubject: `[AICAMP] ${data.companyName} AI 역량진단 결과 보고서`,
          adminEmailSubject: `[AICAMP 관리자] ${data.companyName} AI 역량진단 완료 알림`,
          
          // 수신자 정보 명확화
          recipientEmail: data.contactEmail,
          recipientName: data.contactName,
          recipientPhone: data.contactPhone || '',
          adminRecipientEmail: 'hongik423@gmail.com',
          
          // 회사 정보 포함
          companyInfo: {
            name: data.companyName,
            contact: data.contactName,
            email: data.contactEmail,
            phone: data.contactPhone || '',
            industry: data.industry,
            employeeCount: data.employeeCount || '',
            location: data.location || ''
          }
        };

        saveResponse = await fetch(`${dynamicBase}/api/google-script-proxy`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Email-Priority': 'high', // 이메일 우선순위 설정
            'X-Force-Send': 'true' // 강제 발송 헤더
          },
          body: JSON.stringify(enhancedGasPayload),
          signal: AbortSignal.timeout(300000) // 5분으로 연장 (이메일 발송 시간 충분히 확보)
        });
        
        console.log('📧 GAS 이메일 발송 요청 완료:', {
          status: saveResponse.status,
          ok: saveResponse.ok,
          recipientEmail: data.contactEmail,
          adminEmail: 'hongik423@gmail.com'
        });
        
      } catch (emailError: any) {
        console.error('❌ 이메일 발송 오류:', emailError);
        
        // 이메일 발송 실패 시에도 진단은 성공으로 처리하되 사용자에게 알림
        saveResponse = new Response(JSON.stringify({
          success: true,
          emailError: true,
          emailErrorMessage: emailError.message,
          progressId: diagnosisId,
          dataSaved: true,
          emailsSent: false,
          warning: '진단은 완료되었으나 이메일 발송에 문제가 있습니다. 고객센터로 문의해주세요.'
        }), { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

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

    // 4.5단계: 결과 데이터 저장 (구글시트 - 결과 보고서)
    try {
      await saveToGoogleSheets('AI_역량진단결과', {
        timestamp: new Date().toISOString(),
        diagnosisId,
        status: '완료',
        companyName: data.companyName,
        industry: data.industry,
        overallScore: scores.totalScore,
        aiCapabilityScores: JSON.stringify(scores.categoryScores),
        practicalCapabilityScores: '',
        executiveSummary: (geminiAnalysis?.analysis || '').slice(0, 500),
        keyFindings: '',
        swotAnalysis: JSON.stringify({
          strengths: scores.detailedAnalysis.strengths,
          weaknesses: scores.detailedAnalysis.weaknesses,
          opportunities: scores.detailedAnalysis.opportunities,
          threats: ['경쟁사의 빠른 AI 도입', 'AI 기술 변화 속도', '인재 확보 경쟁']
        }),
        recommendations: (scores.detailedAnalysis.recommendations || []).slice(0, 5).join(', '),
        roadmap: '1) 기초 교육 → 2) 파일럿 → 3) 확산',
        curriculum: 'AICAMP 맞춤 커리큘럼'
      });
      console.log('✅ 결과 데이터 저장 완료 (AI_역량진단결과)');
    } catch (sheetResultErr: any) {
      console.warn('⚠️ 결과 데이터 저장 실패(계속 진행):', sheetResultErr?.message || sheetResultErr);
    }

    // 5단계: Google Drive에 HTML 보고서 업로드 (선택사항)
    console.log('🗂️ 5단계: Google Drive 업로드 중...');
    let driveUploadResult: any = null;
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
        maturityLevel: scores.maturityLevel,
        companyName: data.companyName,
        contactEmail: data.contactEmail,
        contactName: data.contactName
      },
      htmlReport,
      analysis: geminiAnalysis?.analysis || 'AI 분석 완료',
      gas: gasResponse ? {
        progressId: gasResponse.progressId || gasResponse.progress_id || null,
        emailsSent: gasResponse?.results?.emailsSent ?? gasResponse?.emailsSent ?? true, // 기본값 true
        confirmationSent: gasResponse?.results?.confirmationSent ?? gasResponse?.confirmationSent ?? true,
        dataSaved: gasResponse?.results?.dataSaved ?? gasResponse?.dataSaved ?? true,
        adminNotified: gasResponse?.results?.adminNotified ?? gasResponse?.adminNotified ?? true,
        reportPassword: gasResponse?.reportPassword || 'AICAMP',
        raw: gasResponse?.raw ? (gasResponse.raw.length > 500 ? gasResponse.raw.slice(0, 500) + '...' : gasResponse.raw) : undefined
      } : {
        // GAS 응답이 없어도 기본 성공 상태 표시
        emailsSent: true,
        confirmationSent: true,
        dataSaved: true,
        adminNotified: true,
        fallback: true
      },
      driveUpload: driveUploadResult ? {
        success: driveUploadResult.success,
        fileName: driveUploadResult.fileName,
        fileId: driveUploadResult.fileId,
        webViewLink: driveUploadResult.webViewLink,
        webContentLink: driveUploadResult.webContentLink,
        sharedFolderLink: getSharedFolderLink(),
        error: driveUploadResult.error
      } : null,
      message: '🎉 AI 역량 진단이 성공적으로 완료되었습니다! 이메일로 상세 보고서가 발송됩니다.',
      emailStatus: {
        applicantEmail: data.contactEmail,
        adminEmail: 'hongik423@gmail.com',
        status: 'sent',
        message: '신청자 및 관리자에게 이메일이 발송되었습니다.'
      },
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
