'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, Circle, Brain, Settings, Users, Globe, Cog, Database, AlertTriangle, Check, Star, HelpCircle, Lightbulb, TrendingUp, Award, Keyboard } from 'lucide-react';
import { AI_CAPABILITY_QUESTIONS } from '../constants/questions';

interface AssessmentResponse {
  [questionId: string]: number;
}

interface EnhancedAssessmentFormProps {
  responses: AssessmentResponse;
  onChange: (responses: AssessmentResponse) => void;
  highlightUnanswered?: boolean; // 미답변 질문 하이라이트 여부
}

// 카테고리별 아이콘과 색상 매핑
const categoryConfig = {
  leadership: {
    icon: Brain,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
    name: '리더십'
  },
  infrastructure: {
    icon: Settings,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    name: '인프라'
  },
  employeeCapability: {
    icon: Users,
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    name: '직원역량'
  },
  culture: {
    icon: Globe,
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700',
    name: '조직문화'
  },
  practicalApplication: {
    icon: Cog,
    color: 'bg-red-500',
    lightColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
    name: '실무적용'
  },
  dataCapability: {
    icon: Database,
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    textColor: 'text-indigo-700',
    name: '데이터'
  }
};

const SCORE_LABELS = {
  1: '전혀 그렇지 않다',
  2: '그렇지 않다', 
  3: '보통이다',
  4: '그렇다',
  5: '매우 그렇다'
};

// 별점 컴포넌트 (Enhanced 버전 - 터치 지원)
const EnhancedStarRating: React.FC<{
  score: number;
  onScoreChange: (score: number) => void;
  questionId: string;
  isHighlighted?: boolean;
  disabled?: boolean;
}> = ({ score, onScoreChange, questionId, isHighlighted = false, disabled = false }) => {
  const [hoverScore, setHoverScore] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  
  const handleTouchStart = (value: number) => {
    if (!disabled) {
      setIsTouching(true);
      setHoverScore(value);
    }
  };
  
  const handleTouchEnd = (value: number) => {
    if (!disabled) {
      setIsTouching(false);
      setHoverScore(0);
      onScoreChange(value);
      
      // 햅틱 피드백 (지원되는 경우)
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent, value: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disabled) {
        onScoreChange(value);
      }
    }
  };
  
  return (
    <div className="space-y-2">
      {/* 별점 버튼들 */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((value) => {
          const isActive = (hoverScore || score) >= value;
          return (
            <button
              key={value}
              type="button"
              disabled={disabled}
              className={`p-1 transition-all duration-200 hover:scale-110 active:scale-125 touch-manipulation disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 rounded ${
                isHighlighted ? 'animate-pulse' : ''
              } ${isTouching ? 'scale-110' : ''}`}
              onMouseEnter={() => !disabled && !isTouching && setHoverScore(value)}
              onMouseLeave={() => !disabled && !isTouching && setHoverScore(0)}
              onTouchStart={() => handleTouchStart(value)}
              onTouchEnd={() => handleTouchEnd(value)}
              onTouchCancel={() => {
                setIsTouching(false);
                setHoverScore(0);
              }}
              onClick={() => !disabled && onScoreChange(value)}
              onKeyDown={(e) => handleKeyDown(e, value)}
              aria-label={`${value}점 - ${SCORE_LABELS[value as keyof typeof SCORE_LABELS]}`}
              tabIndex={0}
            >
              <Star
                className={`w-7 h-7 sm:w-6 sm:h-6 transition-all duration-200 ${
                  disabled 
                    ? 'text-gray-200' 
                    : isActive
                    ? 'text-yellow-400 fill-yellow-400 drop-shadow-sm filter brightness-110'
                    : 'text-gray-300 hover:text-yellow-300'
                }`}
              />
            </button>
          );
        })}
      </div>
      
      {/* 점수 및 설명 */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
        <span className="text-sm font-medium text-gray-700">
          {score > 0 ? `${score}점` : '미평가'}
        </span>
        {score > 0 && (
          <span className="text-xs text-gray-500">
            - {SCORE_LABELS[score as keyof typeof SCORE_LABELS]}
          </span>
        )}
      </div>
      
      {/* 모바일에서만 표시되는 스와이프 힌트 */}
      {score === 0 && (
        <div className="sm:hidden text-xs text-gray-400 flex items-center gap-1">
          <span>별을 터치하여 평가해주세요</span>
        </div>
      )}
    </div>
  );
};

// 키보드 단축키 도움말
const KeyboardShortcuts: React.FC = () => {
  const [showShortcuts, setShowShortcuts] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setShowShortcuts(!showShortcuts)}
        className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
      >
        <Keyboard className="w-3 h-3" />
        단축키
      </button>
      
      {showShortcuts && (
        <div className="absolute top-full right-0 mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
          <div className="text-xs space-y-1">
            <div className="font-semibold text-gray-700 mb-2">키보드 단축키</div>
            <div className="flex justify-between">
              <span>1~5 숫자키:</span>
              <span>점수 선택</span>
            </div>
            <div className="flex justify-between">
              <span>Tab/Shift+Tab:</span>
              <span>질문 이동</span>
            </div>
            <div className="flex justify-between">
              <span>Enter:</span>
              <span>확인</span>
            </div>
            <div className="flex justify-between">
              <span>Esc:</span>
              <span>도움말 닫기</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const EnhancedAssessmentForm: React.FC<EnhancedAssessmentFormProps> = ({
  responses,
  onChange,
  highlightUnanswered = false
}) => {
  const [completedCategories, setCompletedCategories] = useState<Set<string>>(new Set());
  const [overallProgress, setOverallProgress] = useState(0);

  // 진행률 계산
  useEffect(() => {
    const totalQuestions = Object.values(AI_CAPABILITY_QUESTIONS).reduce(
      (sum, category) => sum + category.questions.length, 0
    );
    const answeredQuestions = Object.keys(responses).length;
    const progress = (answeredQuestions / totalQuestions) * 100;
    setOverallProgress(progress);

    // 완료된 카테고리 확인
    const completed = new Set<string>();
    Object.entries(AI_CAPABILITY_QUESTIONS).forEach(([categoryKey, category]) => {
      const categoryAnswered = category.questions.every(q => responses[q.id] !== undefined);
      if (categoryAnswered) {
        completed.add(categoryKey);
      }
    });
    setCompletedCategories(completed);
  }, [responses]);

  const handleResponseChange = (questionId: string, value: string) => {
    const newResponses = {
      ...responses,
      [questionId]: parseInt(value, 10)
    };
    onChange(newResponses);
  };

  const getCategoryProgress = (category: any) => {
    const totalQuestions = category.questions.length;
    const answeredQuestions = category.questions.filter((q: any) => responses[q.id] !== undefined).length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  const getCategoryScore = (category: any) => {
    const answeredQuestions = category.questions.filter((q: any) => responses[q.id] !== undefined);
    if (answeredQuestions.length === 0) return 0;
    
    const totalScore = answeredQuestions.reduce((sum: number, q: any) => sum + (responses[q.id] * q.weight), 0);
    const maxScore = answeredQuestions.reduce((sum: number, q: any) => sum + (5 * q.weight), 0);
    return Math.round((totalScore / maxScore) * 100);
  };

  const getCategorySelectedScores = (category: any) => {
    return category.questions.map((q: any) => responses[q.id]).filter((score: number) => score !== undefined);
  };

  return (
    <div className="space-y-6">
      {/* 전체 진행률 헤더 - 향상된 디자인 */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 pb-4 mb-6 rounded-t-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            AI 역량진단 평가
            <Award className="w-5 h-5 text-blue-600" />
          </h3>
          <div className="flex items-center gap-3">
            <KeyboardShortcuts />
            <Badge variant="outline" className="text-sm bg-blue-50 text-blue-700 border-blue-200">
              {Math.round(overallProgress)}% 완료
            </Badge>
            {Object.keys(responses).length > 0 && (
              <Badge variant="default" className="bg-gradient-to-r from-green-600 to-green-500 text-white text-sm shadow-lg">
                평균 {Math.round(Object.values(responses).reduce((sum, score) => sum + score, 0) / Object.values(responses).length)}점
              </Badge>
            )}
          </div>
        </div>
        <Progress value={overallProgress} className="h-2" />
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-gray-600">
            각 분야별로 질문에 답변해주세요. 모든 질문에 답변하시면 정확한 진단 결과를 받을 수 있습니다.
          </p>
          
          {/* 선택 점수 요약 */}
          {Object.keys(responses).length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">선택한 점수들:</span>
              <div className="flex gap-1">
                {Object.values(responses).slice(0, 8).map((score, index) => (
                  <Badge key={index} variant="secondary" className="text-xs px-1.5 py-0.5">
                    {score}
                  </Badge>
                ))}
                {Object.values(responses).length > 8 && (
                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                    +{Object.values(responses).length - 8}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 카테고리별 질문 카드 */}
      <div className="grid gap-6">
        {Object.entries(AI_CAPABILITY_QUESTIONS).map(([categoryKey, category]) => {
          const config = categoryConfig[categoryKey as keyof typeof categoryConfig];
          const IconComponent = config.icon;
          const progress = getCategoryProgress(category);
          const score = getCategoryScore(category);
          const isCompleted = completedCategories.has(categoryKey);
          const selectedScores = getCategorySelectedScores(category);

          return (
            <Card 
              key={categoryKey} 
              className={`transition-all duration-200 ${config.borderColor} ${
                isCompleted ? 'ring-2 ring-green-200 shadow-md' : 'hover:shadow-sm'
              }`}
            >
              <CardHeader className={`${config.lightColor} rounded-t-lg`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${config.color} text-white`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        {config.name} ({category.questions.length}문항)
                      </CardTitle>
                      <CardDescription className="text-sm mt-1">
                        {category.description}
                      </CardDescription>
                      
                      {/* 선택된 점수들 미리보기 */}
                      {selectedScores.length > 0 && (
                        <div className="flex items-center gap-1 mt-2">
                          <span className="text-xs text-gray-600 mr-2">선택한 점수:</span>
                          {selectedScores.map((score, index) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className="text-xs px-1.5 py-0.5 bg-white border-gray-300"
                            >
                              {score}
                            </Badge>
                          ))}
                          {selectedScores.length < category.questions.length && (
                            <span className="text-xs text-gray-400 ml-1">
                              ({category.questions.length - selectedScores.length}개 남음)
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-300" />
                    )}
                    {score > 0 && (
                      <Badge variant="secondary" className={config.textColor}>
                        {score}점
                      </Badge>
                    )}
                  </div>
                </div>
                <Progress value={progress} className="h-1 mt-3" />
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {category.questions.map((question, index) => {
                  const isUnanswered = responses[question.id] === undefined;
                  const shouldHighlight = highlightUnanswered && isUnanswered;
                  
                  return (
                  <div 
                    key={question.id} 
                    data-question-id={question.id}
                    className={`border-b border-gray-100 pb-6 last:border-b-0 last:pb-0 transition-all duration-300 ${
                      shouldHighlight ? 'bg-red-50 border-red-200 rounded-lg p-4 -m-2' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3 mb-4">
                      <Badge variant="outline" className="mt-1 text-xs">
                        {index + 1}
                      </Badge>
                      <div className="flex-1">
                        <div className="flex items-start gap-2 mb-3">
                          <h4 className={`font-medium leading-relaxed flex-1 ${
                            shouldHighlight ? 'text-red-700' : 'text-gray-900'
                          }`}>
                            {question.question}
                          </h4>
                          <div className="flex items-center gap-2">
                            <HelpCircle 
                              className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" 
                              title={`이 질문은 ${config.name} 분야의 역량을 평가합니다. 1~5점 중 현재 상황에 맞는 점수를 선택해주세요.`}
                            />
                            {shouldHighlight && (
                              <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" />
                            )}
                          </div>
                        </div>
                        
                        {question.weight !== 1.0 && (
                          <p className="text-xs text-gray-500 mb-2">
                            가중치: {question.weight}
                          </p>
                        )}
                        {shouldHighlight && (
                          <p className="text-xs text-red-600 mb-3 font-medium flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            이 질문에 답변해주세요
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 별점 평가 시스템 */}
                    <div className="pl-8">
                      <EnhancedStarRating
                        score={responses[question.id] || 0}
                        onScoreChange={(score) => handleResponseChange(question.id, score.toString())}
                        questionId={question.id}
                        isHighlighted={shouldHighlight}
                      />
                      
                      {/* 실시간 피드백 */}
                      {responses[question.id] && (
                        <div className={`mt-3 p-3 rounded-lg text-sm ${
                          responses[question.id] <= 2 ? 'bg-red-50 text-red-700 border border-red-200' :
                          responses[question.id] === 3 ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                          responses[question.id] === 4 ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          'bg-green-50 text-green-700 border border-green-200'
                        }`}>
                          <div className="flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium mb-1">
                                {responses[question.id] <= 2 ? '개선 기회' :
                                 responses[question.id] === 3 ? '발전 가능성' :
                                 responses[question.id] === 4 ? '우수한 역량' :
                                 '탁월한 수준'}
                              </div>
                              <div className="text-xs">
                                {responses[question.id] <= 2 ? 
                                  '이 분야의 집중적인 개선이 필요합니다. 전문 교육이나 컨설팅을 고려해보세요.' :
                                 responses[question.id] === 3 ? 
                                  '평균적인 수준입니다. 추가적인 역량 개발로 더 성장할 수 있습니다.' :
                                 responses[question.id] === 4 ? 
                                  '우수한 역량을 보유하고 있습니다. 이 강점을 더욱 활용해보세요.' :
                                  '최고 수준의 역량입니다! 다른 분야에도 이 노하우를 적용해보세요.'}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 하단 요약 정보 */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 pt-4 mt-8">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>총 24문항 중 {Object.keys(responses).length}문항 완료</span>
          <span>{completedCategories.size}/6개 분야 완료</span>
        </div>
      </div>
    </div>
  );
};