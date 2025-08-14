import { NextRequest, NextResponse } from 'next/server';
import { 
  getIndustrySpecificRecommendations,
  getRecommendedProgramsByScore,
  calculateProgramROI,
  getRelevantSuccessCases,
  generateLearningPath
} from '@/lib/utils/aicamp-program-integration';

// 간단한 점수 계산 함수
function calculateSimpleScores(responses: any[]) {
  const categories = {
    businessFoundation: [],
    currentAI: [],
    organizationReadiness: [],
    techInfrastructure: [],
    goalClarity: [],
    executionCapability: []
  } as any;
  
  // 섹션별로 점수 분류 (간단한 매핑)
  responses.forEach((response, index) => {
    const sectionId = response.sectionId || Math.floor(index / 7.5) + 1;
    const score = response.value || response.score || 3;
    
    if (sectionId === 1) categories.businessFoundation.push(score);
    else if (sectionId === 2) categories.currentAI.push(score);
    else if (sectionId === 3) categories.organizationReadiness.push(score);
    else if (sectionId === 4) categories.techInfrastructure.push(score);
    else if (sectionId === 5) categories.goalClarity.push(score);
    else if (sectionId === 6) categories.executionCapability.push(score);
  });
  
  // 카테고리별 평균 계산 (100점 만점으로 변환)
  const categoryScores = {} as any;
  let totalScore = 0;
  
  Object.entries(categories).forEach(([category, scores]: [string, number[]]) => {
    if (scores.length > 0) {
      const average = scores.reduce((a, b) => a + b, 0) / scores.length;
      const categoryScore = Math.round(average * 20); // 5점 만점을 100점 만점으로 변환
      categoryScores[category] = categoryScore;
      totalScore += categoryScore;
    } else {
      categoryScores[category] = 60; // 기본값
      totalScore += 60;
    }
  });
  
  totalScore = Math.round(totalScore / 6); // 6개 카테고리 평균
  
  // 등급 계산
  let grade = 'D';
  if (totalScore >= 90) grade = 'A+';
  else if (totalScore >= 85) grade = 'A';
  else if (totalScore >= 80) grade = 'A-';
  else if (totalScore >= 75) grade = 'B+';
  else if (totalScore >= 70) grade = 'B';
  else if (totalScore >= 65) grade = 'B-';
  else if (totalScore >= 60) grade = 'C+';
  else if (totalScore >= 55) grade = 'C';
  else if (totalScore >= 50) grade = 'C-';
  
  // 성숙도 계산
  let maturityLevel = 'AI Beginner';
  if (totalScore >= 80) maturityLevel = 'AI Expert';
  else if (totalScore >= 60) maturityLevel = 'AI User';
  else if (totalScore >= 40) maturityLevel = 'AI Adopter';
  
  return {
    totalScore,
    grade,
    maturityLevel,
    categoryScores,
    percentile: Math.min(95, Math.max(5, totalScore + 10)) // 간단한 백분위 계산
  };
}

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 간단한 AI 진단 테스트 시작');
    
    const data = await request.json();
    
    // 필수 필드 검증
    if (!data.companyName || !data.contactName || !data.contactEmail) {
      return NextResponse.json({
        success: false,
        error: '필수 정보가 누락되었습니다 (companyName, contactName, contactEmail)'
      }, { status: 400 });
    }
    
    console.log(`📊 진단 시작: ${data.companyName} (${data.contactName})`);
    
    // 1. 간단한 점수 계산
    const scores = calculateSimpleScores(data.assessmentResponses || []);
    console.log(`✅ 점수 계산 완료: ${scores.totalScore}점 (${scores.grade})`);
    
    // 2. AICAMP 프로그램 추천
    const recommendedPrograms = getRecommendedProgramsByScore(
      scores.totalScore,
      scores.categoryScores
    );
    console.log(`✅ 추천 프로그램: ${recommendedPrograms.length}개`);
    
    // 3. 업종별 분석
    const industryAnalysis = getIndustrySpecificRecommendations(
      data.industry || '일반',
      scores.totalScore,
      ['AI 활용 경험 부족', '데이터 관리 체계 미흡']
    );
    console.log(`✅ 업종별 분석: ${industryAnalysis.industry}`);
    
    // 4. ROI 계산
    const roiAnalysis = calculateProgramROI(
      recommendedPrograms,
      data.employeeCount || 50
    );
    console.log(`✅ ROI 분석: ${roiAnalysis.roi}%`);
    
    // 5. 성공 사례
    const successCases = getRelevantSuccessCases(
      data.industry || '일반',
      data.employeeCount > 100 ? '대기업' : '중소기업'
    );
    console.log(`✅ 성공 사례: ${successCases.length}개`);
    
    // 6. 학습 경로
    const learningPath = generateLearningPath(recommendedPrograms, 'medium');
    console.log(`✅ 학습 경로: ${learningPath.length}단계`);
    
    // 간단한 분석 결과 생성
    const analysis = {
      strengths: [
        '명확한 사업 목표 설정',
        '경영진의 AI 도입 의지',
        '기본적인 조직 체계'
      ],
      weaknesses: [
        'AI 기술 활용 경험 부족',
        '데이터 관리 체계 미흡',
        'AI 전문 인력 부족'
      ],
      opportunities: [
        '업계 AI 도입 초기 단계',
        '정부 AI 지원 정책 활용',
        '고객 요구사항 변화 대응'
      ],
      threats: [
        '경쟁사의 빠른 AI 도입',
        'AI 기술 변화 속도',
        '전문 인력 확보 경쟁'
      ]
    };
    
    const result = {
      success: true,
      message: 'AI 진단이 성공적으로 완료되었습니다',
      diagnosis: scores,
      analysis: analysis,
      recommendations: [
        'AI 기초 교육 실시',
        '데이터 관리 체계 구축',
        '파일럿 프로젝트 진행'
      ],
      aicampPrograms: {
        recommended: recommendedPrograms,
        roi: roiAnalysis,
        learningPath: learningPath,
        successCases: successCases
      },
      industryAnalysis: industryAnalysis,
      timestamp: new Date().toISOString(),
      processingTime: Date.now() - Date.now()
    };
    
    console.log('✅ 간단한 AI 진단 테스트 완료');
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('❌ 간단한 AI 진단 테스트 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Simple AI Diagnosis Test API',
    requiredFields: ['companyName', 'contactName', 'contactEmail'],
    optionalFields: ['industry', 'employeeCount', 'assessmentResponses'],
    timestamp: new Date().toISOString()
  });
}
