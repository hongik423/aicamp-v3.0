/**
 * Safety Master 채점 시스템
 * 순수 함수로 구현된 채점 로직
 */

export interface ScoringResult {
  score: number;
  scoreBand: 'excellent' | 'good' | 'fair' | 'poor';
  matchedKeywords: string[];
  missingKeywords: string[];
  feedback: string;
  similarity: number;
}

export interface Card {
  id: string;
  question: string;
  answer: string;
  hint?: string;
  category: string;
  importance: number;
}

/**
 * 텍스트 정규화 - 공백, 특수문자 정리
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[•\n\r]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * 키워드 추출 - 간단한 토큰화
 */
export function extractKeywords(text: string): string[] {
  return text
    .split(/[\s,，、]+/)
    .filter(word => word.length > 1)
    .map(word => word.replace(/[^\w가-힣]/g, ''))
    .filter(word => word.length > 0);
}

/**
 * 키워드 매칭 점수 계산
 */
export function calculateKeywordScore(userKeywords: string[], correctKeywords: string[]): {
  matched: string[];
  missing: string[];
  score: number;
} {
  const matched: string[] = [];
  const missing: string[] = [];
  
  // 사용자 답안에서 매칭된 키워드 찾기
  for (const correctKeyword of correctKeywords) {
    const isMatched = userKeywords.some(userKeyword => 
      userKeyword.includes(correctKeyword) || correctKeyword.includes(userKeyword)
    );
    
    if (isMatched) {
      matched.push(correctKeyword);
    } else {
      missing.push(correctKeyword);
    }
  }
  
  const score = correctKeywords.length > 0 
    ? Math.round((matched.length / correctKeywords.length) * 100)
    : 0;
    
  return { matched, missing, score };
}

/**
 * 레벤슈타인 거리 계산
 */
export function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) {
    matrix[0][i] = i;
  }
  
  for (let j = 0; j <= str2.length; j++) {
    matrix[j][0] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * 문자열 유사도 계산 (0-1)
 */
export function calculateSimilarity(str1: string, str2: string): number {
  const distance = levenshteinDistance(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);
  return maxLength === 0 ? 1 : 1 - (distance / maxLength);
}

/**
 * 점수 밴드 결정
 */
export function getScoreBand(score: number): 'excellent' | 'good' | 'fair' | 'poor' {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  if (score >= 40) return 'fair';
  return 'poor';
}

/**
 * 피드백 메시지 생성
 */
export function generateFeedback(score: number, matchedKeywords: string[], missingKeywords: string[]): string {
  const scoreBand = getScoreBand(score);
  
  switch (scoreBand) {
    case 'excellent':
      return '완벽합니다! 모든 핵심 내용을 정확히 파악하셨습니다.';
    case 'good':
      return '잘했습니다! 대부분의 내용을 이해하고 계십니다.';
    case 'fair':
      return '좋은 시작입니다. 몇 가지 핵심 내용을 더 학습해보세요.';
    case 'poor':
      return '다시 한번 학습해보세요. 핵심 키워드를 중심으로 정리해보시면 도움이 될 것입니다.';
  }
}

/**
 * 메인 채점 함수
 */
export function gradeAnswer(userAnswer: string, card: Card): ScoringResult {
  const normalizedUserAnswer = normalizeText(userAnswer);
  const normalizedCorrectAnswer = normalizeText(card.answer);
  
  // 키워드 추출
  const userKeywords = extractKeywords(normalizedUserAnswer);
  const correctKeywords = extractKeywords(normalizedCorrectAnswer);
  
  // 키워드 매칭 점수
  const keywordResult = calculateKeywordScore(userKeywords, correctKeywords);
  
  // 문자열 유사도
  const similarity = calculateSimilarity(normalizedUserAnswer, normalizedCorrectAnswer);
  
  // 최종 점수 계산 (키워드 70% + 유사도 30%)
  const finalScore = Math.round(
    (keywordResult.score * 0.7) + (similarity * 100 * 0.3)
  );
  
  const scoreBand = getScoreBand(finalScore);
  const feedback = generateFeedback(finalScore, keywordResult.matched, keywordResult.missing);
  
  return {
    score: Math.min(100, Math.max(0, finalScore)),
    scoreBand,
    matchedKeywords: keywordResult.matched,
    missingKeywords: keywordResult.missing,
    feedback,
    similarity: Math.round(similarity * 100)
  };
}

/**
 * 취약문제 판정 (50% 미만)
 */
export function isWeakProblem(score: number): boolean {
  return score < 50;
}

/**
 * 학습 완료 판정 (80% 이상)
 */
export function isMastered(score: number): boolean {
  return score >= 80;
}
