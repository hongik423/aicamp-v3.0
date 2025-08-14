/**
 * 🎯 BARS 행동지표 시스템 검증 도구
 * 질문-행동지표 연계성 검증 및 시스템 무결성 확인
 */

import { QUESTION_BARS_MAPPING, getBARSByQuestionId, getBARSIndicator } from '../constants/bars-behavior-indicators';
import { REAL_45_QUESTIONS } from '../constants/real-45-questions';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  summary: {
    totalQuestions: number;
    mappedQuestions: number;
    missingMappings: number;
    completeBarsQuestions: number;
  };
}

/**
 * BARS 시스템 전체 검증
 */
export function validateBARSSystem(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // 1. 45개 질문 모두 매핑되었는지 확인
  const allQuestionIds = REAL_45_QUESTIONS.map(q => q.id);
  const mappedQuestionIds = QUESTION_BARS_MAPPING.map(m => m.questionId);
  const missingQuestions = allQuestionIds.filter(id => !mappedQuestionIds.includes(id));
  
  if (missingQuestions.length > 0) {
    errors.push(`다음 질문들의 BARS 매핑이 누락됨: ${missingQuestions.join(', ')}`);
  }
  
  // 2. 각 질문별로 5개 점수 모두 매핑되었는지 확인
  let completeBarsQuestions = 0;
  for (const questionId of allQuestionIds) {
    const mapping = getBARSByQuestionId(questionId);
    if (!mapping) {
      continue;
    }
    
    const scores = [1, 2, 3, 4, 5];
    const missingScores = scores.filter(score => !getBARSIndicator(questionId, score));
    
    if (missingScores.length === 0) {
      completeBarsQuestions++;
    } else {
      warnings.push(`질문 ${questionId}번: ${missingScores.join(', ')}점 행동지표 누락`);
    }
  }
  
  // 3. BARS 지표 필수 필드 검증
  for (const mapping of QUESTION_BARS_MAPPING) {
    for (const indicator of mapping.indicators) {
      if (!indicator.behaviorDescription || !indicator.businessExample || !indicator.keywords?.length) {
        errors.push(`질문 ${mapping.questionId}번 ${indicator.score}점: BARS 필수 필드 누락`);
      }
    }
  }
  
  const summary = {
    totalQuestions: allQuestionIds.length,
    mappedQuestions: mappedQuestionIds.length,
    missingMappings: missingQuestions.length,
    completeBarsQuestions
  };
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    summary
  };
}

/**
 * 특정 질문의 BARS 지표 검증
 */
export function validateQuestionBars(questionId: number): {
  isValid: boolean;
  errors: string[];
  barsData?: any;
} {
  const errors: string[] = [];
  const mapping = getBARSByQuestionId(questionId);
  
  if (!mapping) {
    errors.push(`질문 ${questionId}번의 BARS 매핑을 찾을 수 없습니다`);
    return { isValid: false, errors };
  }
  
  // 5개 점수 모두 확인
  const scores = [1, 2, 3, 4, 5];
  const barsData: any = {};
  
  for (const score of scores) {
    const indicator = getBARSIndicator(questionId, score);
    if (!indicator) {
      errors.push(`${score}점 행동지표 누락`);
      continue;
    }
    
    // 필수 필드 검증
    if (!indicator.behaviorDescription) errors.push(`${score}점: 행동 기술 누락`);
    if (!indicator.businessExample) errors.push(`${score}점: 업무 사례 누락`);
    if (!indicator.keywords?.length) errors.push(`${score}점: 키워드 누락`);
    
    barsData[score] = indicator;
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    barsData: errors.length === 0 ? barsData : undefined
  };
}

/**
 * BARS 시스템 품질 점수 계산
 */
export function calculateBarsQualityScore(): {
  score: number;
  breakdown: {
    coverage: number;      // 커버리지 점수 (0-30)
    completeness: number;  // 완성도 점수 (0-40) 
    quality: number;       // 품질 점수 (0-30)
  };
} {
  const validation = validateBARSSystem();
  
  // 커버리지 점수 (30점 만점)
  const coverage = Math.round((validation.summary.mappedQuestions / validation.summary.totalQuestions) * 30);
  
  // 완성도 점수 (40점 만점)
  const completeness = Math.round((validation.summary.completeBarsQuestions / validation.summary.totalQuestions) * 40);
  
  // 품질 점수 (30점 만점) - 에러와 경고 기반
  const errorPenalty = Math.min(validation.errors.length * 5, 30);
  const warningPenalty = Math.min(validation.warnings.length * 2, 15);
  const quality = Math.max(0, 30 - errorPenalty - warningPenalty);
  
  return {
    score: coverage + completeness + quality,
    breakdown: { coverage, completeness, quality }
  };
}

/**
 * 콘솔에 검증 결과 출력
 */
export function printValidationReport(): void {
  console.log('🎯 BARS 행동지표 시스템 검증 보고서');
  console.log('=====================================');
  
  const validation = validateBARSSystem();
  const quality = calculateBarsQualityScore();
  
  console.log('\n📊 전체 현황:');
  console.log(`- 전체 질문: ${validation.summary.totalQuestions}개`);
  console.log(`- 매핑된 질문: ${validation.summary.mappedQuestions}개`);
  console.log(`- 완성된 BARS: ${validation.summary.completeBarsQuestions}개`);
  console.log(`- 누락된 매핑: ${validation.summary.missingMappings}개`);
  
  console.log('\n🎯 품질 점수:');
  console.log(`- 종합 점수: ${quality.score}/100점`);
  console.log(`- 커버리지: ${quality.breakdown.coverage}/30점`);
  console.log(`- 완성도: ${quality.breakdown.completeness}/40점`);
  console.log(`- 품질: ${quality.breakdown.quality}/30점`);
  
  if (validation.errors.length > 0) {
    console.log('\n❌ 오류:');
    validation.errors.forEach(error => console.log(`- ${error}`));
  }
  
  if (validation.warnings.length > 0) {
    console.log('\n⚠️ 경고:');
    validation.warnings.forEach(warning => console.log(`- ${warning}`));
  }
  
  console.log('\n✅ 검증 완료!');
  console.log(`시스템 상태: ${validation.isValid ? '정상' : '오류 있음'}`);
}

// 개발 환경에서 자동 검증 실행
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  printValidationReport();
}
