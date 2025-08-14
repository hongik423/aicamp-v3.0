'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle, Circle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CATEGORY_BEHAVIOR_INDICATORS } from '../constants/behavior-indicators';

interface CategoryProgressIndicatorProps {
  answers: Record<number, number>;
  questions: Array<{
    id: number;
    category: keyof typeof CATEGORY_BEHAVIOR_INDICATORS;
  }>;
}

const CategoryProgressIndicator: React.FC<CategoryProgressIndicatorProps> = ({
  answers,
  questions
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center mb-6">
        <Target className="w-6 h-6 text-blue-600 mr-3" />
        <h3 className="text-lg font-bold text-gray-900">카테고리별 진행 상황</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(CATEGORY_BEHAVIOR_INDICATORS).map(([key, category]) => {
          const categoryQuestions = questions.filter(q => q.category === key);
          const answeredInCategory = categoryQuestions.filter(q => answers[q.id]).length;
          const categoryProgress = categoryQuestions.length > 0 
            ? (answeredInCategory / categoryQuestions.length) * 100 
            : 0;
          
          // 평균 점수 계산
          const categoryAnswers = categoryQuestions
            .filter(q => answers[q.id])
            .map(q => answers[q.id]);
          const averageScore = categoryAnswers.length > 0 
            ? categoryAnswers.reduce((sum, score) => sum + score, 0) / categoryAnswers.length
            : 0;

          const isCompleted = answeredInCategory === categoryQuestions.length;
          
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Object.keys(CATEGORY_BEHAVIOR_INDICATORS).indexOf(key) * 0.1 }}
              className={`
                p-4 rounded-lg border-2 transition-all duration-300
                ${isCompleted 
                  ? 'bg-green-50 border-green-200 shadow-sm' 
                  : 'bg-gray-50 border-gray-200'
                }
              `}
            >
              {/* 카테고리 헤더 */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{category.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">
                      {category.title}
                    </h4>
                  </div>
                </div>
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {/* 진행률 표시 */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">
                    진행률: {answeredInCategory}/{categoryQuestions.length}
                  </span>
                  <span className="text-xs font-medium text-gray-700">
                    {Math.round(categoryProgress)}%
                  </span>
                </div>
                <Progress 
                  value={categoryProgress} 
                  className="h-2"
                />
              </div>

              {/* 평균 점수 표시 */}
              {averageScore > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">평균 점수</span>
                  <Badge 
                    variant="secondary" 
                    className={`
                      text-xs
                      ${averageScore >= 4.5 ? 'bg-green-100 text-green-800' :
                        averageScore >= 3.5 ? 'bg-blue-100 text-blue-800' :
                        averageScore >= 2.5 ? 'bg-yellow-100 text-yellow-800' :
                        averageScore >= 1.5 ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }
                    `}
                  >
                    {averageScore.toFixed(1)}점
                  </Badge>
                </div>
              )}

              {/* 행동지표 키워드 */}
              {averageScore > 0 && (
                <div className="mt-2">
                  <div className="text-xs text-gray-500 mb-1">현재 수준</div>
                  <div className="text-xs font-medium text-gray-700">
                    {averageScore >= 4.5 ? '혁신적 리더십' :
                     averageScore >= 3.5 ? '전략적 실행력' :
                     averageScore >= 2.5 ? '기본적 운영' :
                     averageScore >= 1.5 ? '초기 준비단계' :
                     '도입 검토 필요'
                    }
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* 전체 진행률 요약 */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-gray-700">전체 진행률</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {Object.keys(answers).length}/{questions.length} 문항 완료
            </span>
            <Badge variant="outline" className="text-sm">
              {Math.round((Object.keys(answers).length / questions.length) * 100)}%
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProgressIndicator;
