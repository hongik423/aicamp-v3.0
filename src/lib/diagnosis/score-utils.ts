/**
 * V27.0 Ultimate 점수 계산 유틸리티
 */

export interface ScoreResult {
  total: number;
  categoryScores: Record<string, number>;
  grade: string;
  maturityLevel: string;
}

export function calculate45QuestionScores(responses: Record<string, number>): ScoreResult {
  const categoryScores: Record<string, number> = {};
  let total = 0;
  
  // 6개 영역별 점수 계산
  const categories = [
    'AI_STRATEGY',
    'DATA_MANAGEMENT', 
    'AI_TECHNOLOGY',
    'HUMAN_RESOURCES',
    'GOVERNANCE',
    'PERFORMANCE'
  ];
  
  categories.forEach(category => {
    categoryScores[category] = 0;
  });
  
  // 응답 점수 집계
  Object.values(responses).forEach(score => {
    total += score;
  });
  
  // 카테고리별 평균 점수 (간단화)
  const avgScore = total / Object.keys(responses).length;
  categories.forEach(category => {
    categoryScores[category] = Math.round(avgScore * 7.5); // 카테고리당 최대 37.5점
  });
  
  const grade = determineGradeFromScore(total);
  const maturityLevel = determineMaturityLevelFromScore(total);
  
  return {
    total,
    categoryScores,
    grade,
    maturityLevel
  };
}

export function determineGradeFromScore(totalScore: number): string {
  if (totalScore >= 200) return 'A';
  if (totalScore >= 180) return 'B';
  if (totalScore >= 160) return 'C';
  if (totalScore >= 140) return 'D';
  return 'F';
}

export function determineMaturityLevelFromScore(totalScore: number): string {
  if (totalScore >= 200) return '최적화';
  if (totalScore >= 180) return '발전';
  if (totalScore >= 160) return '성장';
  if (totalScore >= 140) return '기초';
  return '도입';
}


