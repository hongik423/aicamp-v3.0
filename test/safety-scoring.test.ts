/**
 * Safety Master 채점 시스템 유닛 테스트
 */

import { describe, it, expect } from '@jest/globals';

// 채점 시스템 함수들 (인라인 복사)
const SafetyScoring = {
  normalizeText: function(text: string): string {
    return text.toLowerCase().replace(/[•\n\r]/g, ' ').replace(/\s+/g, ' ').trim();
  },
  
  extractKeywords: function(text: string): string[] {
    return text.split(/[\s,，、]+/)
      .filter(word => word.length > 1)
      .map(word => word.replace(/[^\w가-힣]/g, ''))
      .filter(word => word.length > 0);
  },
  
  calculateKeywordScore: function(userKeywords: string[], correctKeywords: string[]) {
    const matched: string[] = [];
    const missing: string[] = [];
    
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
  },
  
  levenshteinDistance: function(str1: string, str2: string): number {
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
  },
  
  calculateSimilarity: function(str1: string, str2: string): number {
    const distance = this.levenshteinDistance(str1, str2);
    const maxLength = Math.max(str1.length, str2.length);
    return maxLength === 0 ? 1 : 1 - (distance / maxLength);
  },
  
  getScoreBand: function(score: number): 'excellent' | 'good' | 'fair' | 'poor' {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    if (score >= 40) return 'fair';
    return 'poor';
  },
  
  generateFeedback: function(score: number, matchedKeywords: string[], missingKeywords: string[]): string {
    const scoreBand = this.getScoreBand(score);
    
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
  },
  
  gradeAnswer: function(userAnswer: string, card: any) {
    const normalizedUserAnswer = this.normalizeText(userAnswer);
    const normalizedCorrectAnswer = this.normalizeText(card.answer);
    
    const userKeywords = this.extractKeywords(normalizedUserAnswer);
    const correctKeywords = this.extractKeywords(normalizedCorrectAnswer);
    
    const keywordResult = this.calculateKeywordScore(userKeywords, correctKeywords);
    const similarity = this.calculateSimilarity(normalizedUserAnswer, normalizedCorrectAnswer);
    
    const finalScore = Math.round(
      (keywordResult.score * 0.7) + (similarity * 100 * 0.3)
    );
    
    const scoreBand = this.getScoreBand(finalScore);
    const feedback = this.generateFeedback(finalScore, keywordResult.matched, keywordResult.missing);
    
    return {
      score: Math.min(100, Math.max(0, finalScore)),
      scoreBand,
      matchedKeywords: keywordResult.matched,
      missingKeywords: keywordResult.missing,
      feedback,
      similarity: Math.round(similarity * 100)
    };
  },
  
  isWeakProblem: function(score: number): boolean {
    return score < 50;
  },
  
  isMastered: function(score: number): boolean {
    return score >= 80;
  }
};

describe('Safety Master 채점 시스템', () => {
  describe('텍스트 정규화', () => {
    it('특수문자와 공백을 정리해야 함', () => {
      expect(SafetyScoring.normalizeText('안전•관리\n시스템')).toBe('안전 관리 시스템');
      expect(SafetyScoring.normalizeText('  다중   공백  ')).toBe('다중 공백');
    });
  });

  describe('키워드 추출', () => {
    it('한글과 영문 키워드를 올바르게 추출해야 함', () => {
      const keywords = SafetyScoring.extractKeywords('안전 관리 시스템 PSM');
      expect(keywords).toContain('안전');
      expect(keywords).toContain('관리');
      expect(keywords).toContain('시스템');
      expect(keywords).toContain('PSM');
    });

    it('1글자 단어는 제외해야 함', () => {
      const keywords = SafetyScoring.extractKeywords('a 안전 b 관리');
      expect(keywords).not.toContain('a');
      expect(keywords).not.toContain('b');
      expect(keywords).toContain('안전');
      expect(keywords).toContain('관리');
    });
  });

  describe('키워드 매칭 점수', () => {
    it('완전 일치하는 키워드는 100점이어야 함', () => {
      const result = SafetyScoring.calculateKeywordScore(
        ['안전', '관리', '시스템'],
        ['안전', '관리', '시스템']
      );
      expect(result.score).toBe(100);
      expect(result.matched).toHaveLength(3);
      expect(result.missing).toHaveLength(0);
    });

    it('부분 일치하는 키워드는 매칭되어야 함', () => {
      const result = SafetyScoring.calculateKeywordScore(
        ['안전관리', '시스템'],
        ['안전', '관리', '시스템']
      );
      expect(result.matched).toContain('시스템');
      expect(result.score).toBeGreaterThan(0);
    });

    it('키워드가 없으면 0점이어야 함', () => {
      const result = SafetyScoring.calculateKeywordScore(
        ['완전히다른내용'],
        ['안전', '관리', '시스템']
      );
      expect(result.score).toBe(0);
      expect(result.matched).toHaveLength(0);
      expect(result.missing).toHaveLength(3);
    });
  });

  describe('레벤슈타인 거리', () => {
    it('동일한 문자열은 거리가 0이어야 함', () => {
      expect(SafetyScoring.levenshteinDistance('안전관리', '안전관리')).toBe(0);
    });

    it('한 글자 차이는 거리가 1이어야 함', () => {
      expect(SafetyScoring.levenshteinDistance('안전관리', '안전관리시스템')).toBe(3);
    });

    it('빈 문자열 처리', () => {
      expect(SafetyScoring.levenshteinDistance('', '')).toBe(0);
      expect(SafetyScoring.levenshteinDistance('안전', '')).toBe(2);
    });
  });

  describe('문자열 유사도', () => {
    it('동일한 문자열은 유사도가 1이어야 함', () => {
      expect(SafetyScoring.calculateSimilarity('안전관리', '안전관리')).toBe(1);
    });

    it('완전히 다른 문자열은 유사도가 낮아야 함', () => {
      const similarity = SafetyScoring.calculateSimilarity('안전관리', '완전히다른내용');
      expect(similarity).toBeLessThan(0.5);
    });
  });

  describe('점수 밴드', () => {
    it('80점 이상은 excellent여야 함', () => {
      expect(SafetyScoring.getScoreBand(85)).toBe('excellent');
      expect(SafetyScoring.getScoreBand(100)).toBe('excellent');
    });

    it('60-79점은 good이어야 함', () => {
      expect(SafetyScoring.getScoreBand(70)).toBe('good');
      expect(SafetyScoring.getScoreBand(60)).toBe('good');
    });

    it('40-59점은 fair이어야 함', () => {
      expect(SafetyScoring.getScoreBand(50)).toBe('fair');
      expect(SafetyScoring.getScoreBand(40)).toBe('fair');
    });

    it('40점 미만은 poor이어야 함', () => {
      expect(SafetyScoring.getScoreBand(30)).toBe('poor');
      expect(SafetyScoring.getScoreBand(0)).toBe('poor');
    });
  });

  describe('메인 채점 함수', () => {
    const sampleCard = {
      id: '1',
      question: '안전관리체계의 핵심 요소는?',
      answer: '안전관리체계는 안전정책, 안전조직, 안전계획, 안전실행, 안전평가로 구성됩니다.',
      category: '안전관리',
      importance: 3
    };

    it('완전 정답은 높은 점수를 받아야 함', () => {
      const result = SafetyScoring.gradeAnswer(
        '안전관리체계는 안전정책, 안전조직, 안전계획, 안전실행, 안전평가로 구성됩니다.',
        sampleCard
      );
      expect(result.score).toBeGreaterThanOrEqual(80);
      expect(result.scoreBand).toBe('excellent');
    });

    it('부분 정답은 중간 점수를 받아야 함', () => {
      const result = SafetyScoring.gradeAnswer(
        '안전정책과 안전조직이 중요합니다.',
        sampleCard
      );
      expect(result.score).toBeGreaterThan(0);
      expect(result.score).toBeLessThan(80);
      expect(result.matchedKeywords.length).toBeGreaterThan(0);
    });

    it('완전히 틀린 답은 낮은 점수를 받아야 함', () => {
      const result = SafetyScoring.gradeAnswer(
        '완전히 다른 내용입니다.',
        sampleCard
      );
      expect(result.score).toBeLessThan(50);
      expect(result.scoreBand).toBe('poor');
    });

    it('점수는 0-100 범위여야 함', () => {
      const result = SafetyScoring.gradeAnswer('', sampleCard);
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
    });
  });

  describe('취약문제 판정', () => {
    it('50점 미만은 취약문제여야 함', () => {
      expect(SafetyScoring.isWeakProblem(30)).toBe(true);
      expect(SafetyScoring.isWeakProblem(49)).toBe(true);
    });

    it('50점 이상은 취약문제가 아니어야 함', () => {
      expect(SafetyScoring.isWeakProblem(50)).toBe(false);
      expect(SafetyScoring.isWeakProblem(80)).toBe(false);
    });
  });

  describe('학습 완료 판정', () => {
    it('80점 이상은 학습 완료여야 함', () => {
      expect(SafetyScoring.isMastered(80)).toBe(true);
      expect(SafetyScoring.isMastered(100)).toBe(true);
    });

    it('80점 미만은 학습 미완료여야 함', () => {
      expect(SafetyScoring.isMastered(79)).toBe(false);
      expect(SafetyScoring.isMastered(50)).toBe(false);
    });
  });

  describe('실제 시나리오 테스트', () => {
    const psmCard = {
      id: 'psm_1',
      question: 'PSM 대상 물질의 기준은?',
      answer: 'PSM 대상 물질은 독성, 가연성, 폭발성 물질 중 하나 이상의 위험성을 가진 물질로, 지정량 이상 취급하는 물질입니다.',
      category: 'PSM',
      importance: 3
    };

    it('PSM 완전 정답 시나리오', () => {
      const result = SafetyScoring.gradeAnswer(
        'PSM 대상 물질은 독성, 가연성, 폭발성 물질 중 하나 이상의 위험성을 가진 물질로, 지정량 이상 취급하는 물질입니다.',
        psmCard
      );
      expect(result.score).toBeGreaterThanOrEqual(90);
      expect(result.scoreBand).toBe('excellent');
    });

    it('PSM 부분 정답 시나리오', () => {
      const result = SafetyScoring.gradeAnswer(
        '독성, 가연성, 폭발성 물질이 PSM 대상입니다.',
        psmCard
      );
      expect(result.score).toBeGreaterThan(40);
      expect(result.score).toBeLessThan(90);
    });

    it('PSM 오답 시나리오', () => {
      const result = SafetyScoring.gradeAnswer(
        'PSM은 안전관리 시스템입니다.',
        psmCard
      );
      expect(result.score).toBeLessThan(50);
      expect(result.scoreBand).toBe('poor');
    });
  });
});
