'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

import { 
  Brain, 
  Settings, 
  Users, 
  Globe, 
  Cog, 
  Database,
  CheckCircle,
  BarChart3,
  Target,
  Zap,
  Clock,
  Save,
  RefreshCw,
  Keyboard,
  Star,
  StarHalf,
  HelpCircle,
  TrendingUp,
  Award,
  Lightbulb
} from 'lucide-react';
import { AI_CAPABILITY_QUESTIONS } from '../constants/questions';

interface AssessmentResponse {
  [questionId: string]: number;
}

interface UnifiedAssessmentMatrixProps {
  responses: AssessmentResponse;
  onChange: (responses: AssessmentResponse) => void;
  highlightUnanswered?: boolean;
}

// 카테고리별 설정
const categoryConfig = {
  leadership: {
    icon: Brain,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
    name: '리더십',
    shortName: '리더십'
  },
  infrastructure: {
    icon: Settings,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    name: '인프라',
    shortName: '인프라'
  },
  employeeCapability: {
    icon: Users,
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    name: '직원역량',
    shortName: '직원'
  },
  culture: {
    icon: Globe,
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700',
    name: '조직문화',
    shortName: '문화'
  },
  practicalApplication: {
    icon: Cog,
    color: 'bg-red-500',
    lightColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
    name: '실무적용',
    shortName: '실무'
  },
  dataCapability: {
    icon: Database,
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    textColor: 'text-indigo-700',
    name: '데이터',
    shortName: '데이터'
  }
};

const SCORE_LABELS = ['매우 부족', '부족', '보통', '우수', '매우 우수'];

// 별점 컴포넌트 (터치 지원 포함)
const StarRating: React.FC<{
  score: number;
  onScoreChange: (score: number) => void;
  questionId: string;
  isHighlighted?: boolean;
}> = ({ score, onScoreChange, questionId, isHighlighted = false }) => {
  const [hoverScore, setHoverScore] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  
  const handleTouchStart = (value: number) => {
    setIsTouching(true);
    setHoverScore(value);
  };
  
  const handleTouchEnd = (value: number) => {
    setIsTouching(false);
    setHoverScore(0);
    onScoreChange(value);
  };
  
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => {
        const isActive = (hoverScore || score) >= value;
        return (
          <button
            key={value}
            type="button"
            className={`transition-all duration-200 hover:scale-110 active:scale-125 touch-manipulation ${
              isHighlighted ? 'animate-pulse' : ''
            } ${isTouching ? 'scale-110' : ''}`}
            onMouseEnter={() => !isTouching && setHoverScore(value)}
            onMouseLeave={() => !isTouching && setHoverScore(0)}
            onTouchStart={() => handleTouchStart(value)}
            onTouchEnd={() => handleTouchEnd(value)}
            onClick={() => onScoreChange(value)}
            aria-label={`${value}점 - ${SCORE_LABELS[value - 1]}`}
          >
            <Star
              className={`w-6 h-6 md:w-5 md:h-5 transition-colors duration-200 ${
                isActive
                  ? 'text-yellow-400 fill-yellow-400 drop-shadow-sm'
                  : 'text-gray-300 hover:text-yellow-300'
              }`}
            />
          </button>
        );
      })}
      <div className="ml-2 flex flex-col sm:flex-row sm:items-center gap-1">
        <span className="text-sm font-medium text-gray-700">
          {score > 0 ? `${score}점` : '미평가'}
        </span>
        {score > 0 && (
          <span className="text-xs text-gray-500 hidden sm:inline">
            ({SCORE_LABELS[score - 1]})
          </span>
        )}
      </div>
    </div>
  );
};

// 툴팁 컴포넌트
const QuestionTooltip: React.FC<{ children: React.ReactNode; content: string }> = ({ children, content }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="cursor-help"
      >
        {children}
      </div>
      {showTooltip && (
        <div className="absolute z-10 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-12 left-0 min-w-[200px] whitespace-normal">
          {content}
          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

// 실시간 피드백 컴포넌트
const RealTimeFeedback: React.FC<{ score: number; categoryKey: string }> = ({ score, categoryKey }) => {
  const getFeedbackMessage = (score: number, category: string) => {
    if (score === 0) return null;
    
    const categoryNames: Record<string, string> = {
      leadership: '리더십',
      infrastructure: '인프라',
      employeeCapability: '직원역량',
      culture: '조직문화',
      practicalApplication: '실무적용',
      dataCapability: '데이터'
    };
    
    const categoryName = categoryNames[category] || '해당 분야';
    
    if (score <= 2) {
      return `${categoryName} 분야의 개선이 시급합니다. 전문 교육과 컨설팅을 추천드립니다.`;
    } else if (score === 3) {
      return `${categoryName} 분야는 평균 수준입니다. 추가 역량 개발로 더 성장할 수 있습니다.`;
    } else if (score === 4) {
      return `${categoryName} 분야가 우수합니다! 이 강점을 활용한 전략을 수립해보세요.`;
    } else {
      return `${categoryName} 분야에서 최고 수준입니다! 다른 기업에게 벤치마킹 대상이 될 수 있습니다.`;
    }
  };
  
  const message = getFeedbackMessage(score, categoryKey);
  if (!message) return null;
  
  return (
    <div className={`mt-2 p-2 rounded-lg text-xs ${
      score <= 2 ? 'bg-red-50 text-red-700 border border-red-200' :
      score === 3 ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
      score === 4 ? 'bg-blue-50 text-blue-700 border border-blue-200' :
      'bg-green-50 text-green-700 border border-green-200'
    }`}>
      <div className="flex items-center gap-1">
        <Lightbulb className="w-3 h-3" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export const UnifiedAssessmentMatrix: React.FC<UnifiedAssessmentMatrixProps> = ({
  responses,
  onChange,
  highlightUnanswered = false
}) => {
  const [overallProgress, setOverallProgress] = useState(0);
  const [categoryScores, setCategoryScores] = useState<Record<string, number>>({});
  const [quickMode, setQuickMode] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  // 진행률 및 점수 계산
  useEffect(() => {
    const totalQuestions = Object.values(AI_CAPABILITY_QUESTIONS).reduce(
      (sum, category) => sum + category.questions.length, 0
    );
    const answeredQuestions = Object.keys(responses).length;
    setOverallProgress((answeredQuestions / totalQuestions) * 100);

    // 카테고리별 점수 계산
    const scores: Record<string, number> = {};
    Object.entries(AI_CAPABILITY_QUESTIONS).forEach(([categoryKey, category]) => {
      const categoryResponses = category.questions.filter(q => responses[q.id] !== undefined);
      if (categoryResponses.length > 0) {
        const totalScore = categoryResponses.reduce((sum, q) => sum + (responses[q.id] * q.weight), 0);
        const maxScore = categoryResponses.reduce((sum, q) => sum + (5 * q.weight), 0);
        scores[categoryKey] = Math.round((totalScore / maxScore) * 100);
      } else {
        scores[categoryKey] = 0;
      }
    });
    setCategoryScores(scores);
  }, [responses]);

  // 자동 저장 기능
  const autoSave = useCallback(async () => {
    setIsAutoSaving(true);
    // 실제 자동 저장 로직은 여기에 구현
    await new Promise(resolve => setTimeout(resolve, 500)); // 시뮬레이션
    setLastSaved(new Date());
    setIsAutoSaving(false);
  }, []);

  const handleResponseChange = (questionId: string, score: number) => {
    const newResponses = {
      ...responses,
      [questionId]: score
    };
    onChange(newResponses);
    
    // 자동 저장 트리거
    setTimeout(() => {
      autoSave();
    }, 1000);
    
    toast({
      title: "답변 저장됨",
      description: `질문 ${questionId}에 ${score}점으로 답변했습니다.`,
      duration: 2000,
    });
  };

  // 빠른 평가 모드 - 모든 질문에 동일한 점수 적용
  const handleQuickEvaluation = (score: number) => {
    const allQuestions = Object.values(AI_CAPABILITY_QUESTIONS).flatMap(category => 
      category.questions.map(q => q.id)
    );
    
    const newResponses: AssessmentResponse = {};
    allQuestions.forEach(questionId => {
      newResponses[questionId] = score;
    });
    
    onChange(newResponses);
    toast({
      title: "빠른 평가 완료",
      description: `모든 질문에 ${score}점으로 일괄 적용했습니다.`,
      duration: 3000,
    });
  };

  // 키보드 단축키 처리
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            autoSave();
            break;
          case 'r':
            e.preventDefault();
            onChange({});
            toast({
              title: "초기화 완료",
              description: "모든 답변이 초기화되었습니다.",
            });
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onChange, autoSave]);

  const getOverallScore = () => {
    const scores = Object.values(responses);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length * 20);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 대시보드 - 향상된 UI */}
      <Card className="border-2 border-gray-100 shadow-lg bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl shadow-lg">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  AI 역량진단 통합 평가표
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    Smart Assessment
                  </Badge>
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  6개 분야 24개 문항을 별점으로 직관적으로 평가하세요
                </p>
              </div>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {Math.round(overallProgress)}%
                </div>
                <TrendingUp className={`h-5 w-5 ${overallProgress > 50 ? 'text-green-500' : 'text-orange-500'}`} />
              </div>
              <div className="text-sm text-gray-600 font-medium">완료율</div>
              
              {/* 자동 저장 상태 */}
              <div className="flex items-center gap-1 text-xs text-gray-500">
                {isAutoSaving ? (
                  <>
                    <RefreshCw className="h-3 w-3 animate-spin text-blue-500" />
                    <span className="text-blue-600">저장 중...</span>
                  </>
                ) : lastSaved ? (
                  <>
                    <Save className="h-3 w-3 text-green-500" />
                    <span className="text-green-600">{lastSaved.toLocaleTimeString()} 저장됨</span>
                  </>
                ) : (
                  <>
                    <Clock className="h-3 w-3 text-orange-500" />
                    <span className="text-orange-600">자동 저장 대기</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            {/* 진행률 바 */}
            <div className="space-y-2">
              <Progress value={overallProgress} className="h-4 bg-gray-200" />
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-700 font-medium">
                    {Object.keys(responses).length}/24 문항 완료
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-700 font-medium">
                    예상 총점: {getOverallScore()}/100점
                  </span>
                </div>
                
                {/* 전체 평가 상태 */}
                {Object.keys(responses).length > 0 && (
                  <div className="flex items-center gap-2">
                    <Award className={`h-4 w-4 ${
                      getOverallScore() >= 80 ? 'text-green-500' :
                      getOverallScore() >= 60 ? 'text-blue-500' :
                      getOverallScore() >= 40 ? 'text-yellow-500' :
                      'text-red-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      getOverallScore() >= 80 ? 'text-green-600' :
                      getOverallScore() >= 60 ? 'text-blue-600' :
                      getOverallScore() >= 40 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {getOverallScore() >= 80 ? '최고 수준' :
                       getOverallScore() >= 60 ? '우수한 수준' :
                       getOverallScore() >= 40 ? '보통 수준' :
                       '개선 필요'}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* 전체 별점 표시 */}
            {Object.keys(responses).length > 0 && (
              <div className="flex items-center justify-center gap-1 pt-2 border-t border-gray-200">
                <span className="text-sm text-gray-600 mr-2">전체 평가:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 transition-colors ${
                      star <= Math.round(getOverallScore() / 20)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  ({Math.round(getOverallScore() / 20)}/5점)
                </span>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* 분야별 점수 요약 - 향상된 시각화 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.entries(AI_CAPABILITY_QUESTIONS).map(([categoryKey, category]) => {
          const config = categoryConfig[categoryKey as keyof typeof categoryConfig];
          const IconComponent = config.icon;
          const score = categoryScores[categoryKey] || 0;
          const answeredCount = category.questions.filter(q => responses[q.id] !== undefined).length;
          const totalCount = category.questions.length;
          const completionRate = (answeredCount / totalCount) * 100;
          
          // 점수에 따른 상태 결정
          const getScoreStatus = (score: number) => {
            if (score === 0) return { label: '미평가', color: 'text-gray-500' };
            if (score <= 2) return { label: '개선 필요', color: 'text-red-600' };
            if (score === 3) return { label: '보통', color: 'text-yellow-600' };
            if (score === 4) return { label: '우수', color: 'text-blue-600' };
            return { label: '최고', color: 'text-green-600' };
          };
          
          const status = getScoreStatus(score);
          
          return (
            <Card key={categoryKey} className={`${config.borderColor} transition-all hover:shadow-lg hover:scale-105 cursor-pointer group`}>
              <CardContent className="p-3 text-center">
                <div className={`p-2 rounded-lg ${config.color} text-white mb-2 mx-auto w-fit relative group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-4 w-4" />
                  {completionRate === 100 && (
                    <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 animate-pulse">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-1">{config.shortName}</div>
                <div className="text-xs text-gray-600 mb-2">{answeredCount}/{totalCount} 완료</div>
                <Progress value={completionRate} className="h-2 mb-2" />
                
                {/* 점수와 상태 표시 */}
                <div className="space-y-1">
                  <div className={`text-lg font-bold ${config.textColor}`}>
                    {score > 0 ? `${score}점` : '-'}
                  </div>
                  <div className={`text-xs font-medium ${status.color}`}>
                    {status.label}
                  </div>
                </div>
                
                {/* 별점 표시 */}
                {score > 0 && (
                  <div className="flex justify-center mt-1 space-x-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 transition-colors ${
                          star <= score
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 통합 매트릭스 테이블 */}
      <Card className="border-2 border-gray-100">
        <CardHeader className="bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                평가 매트릭스
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                각 질문에 대해 1-5점으로 평가해주세요. 점수가 높을수록 해당 역량이 우수함을 의미합니다.
              </p>
            </div>
            
            {/* 편의 기능 버튼들 */}
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuickMode(!quickMode)}
                className="text-xs"
              >
                <Zap className="h-3 w-3 mr-1" />
                {quickMode ? '일반 모드' : '빠른 평가'}
              </Button>
              
              <Button
                variant="outline"  
                size="sm"
                onClick={() => onChange({})}
                className="text-xs text-red-600 hover:text-red-700"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                초기화
              </Button>
              
              <Badge variant="outline" className="text-xs">
                <Keyboard className="h-3 w-3 mr-1" />
                Ctrl+S: 저장, Ctrl+R: 초기화
              </Badge>
            </div>
          </div>
          
          {/* 빠른 평가 모드 */}
          {quickMode && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-medium text-yellow-800 mb-2">
                빠른 평가 모드: 모든 질문에 동일한 점수를 일괄 적용합니다
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(score => (
                  <Button
                    key={score}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickEvaluation(score)}
                    className="flex-1"
                  >
                    {score}점 일괄 적용
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="p-0">
          {/* 데스크톱 테이블 뷰 */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              {/* 테이블 헤더 */}
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 w-2/5">
                    질문 항목
                  </th>
                  {[1, 2, 3, 4, 5].map(score => (
                    <th key={score} className="text-center py-3 px-2 font-semibold text-gray-900 w-12">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold text-gray-800">{score}</span>
                        <span className="text-xs text-gray-600 leading-tight">
                          {SCORE_LABELS[score - 1]}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              
              {/* 테이블 바디 */}
              <tbody>
                {Object.entries(AI_CAPABILITY_QUESTIONS).map(([categoryKey, category]) => {
                  const config = categoryConfig[categoryKey as keyof typeof categoryConfig];
                  const IconComponent = config.icon;
                  
                  return (
                    <React.Fragment key={categoryKey}>
                      {/* 카테고리 헤더 */}
                      <tr className={`${config.lightColor} border-b-2`}>
                        <td colSpan={6} className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${config.color} text-white`}>
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="font-bold text-gray-900">
                                {config.name} ({category.questions.length}문항)
                              </span>
                              <p className="text-sm text-gray-600 mt-1">
                                {category.description}
                              </p>
                            </div>
                            {categoryScores[categoryKey] > 0 && (
                              <Badge className={`ml-auto ${config.color} text-white`}>
                                {categoryScores[categoryKey]}점
                              </Badge>
                            )}
                          </div>
                        </td>
                      </tr>
                      
                      {/* 카테고리 질문들 */}
                      {category.questions.map((question, index) => {
                        const isUnanswered = responses[question.id] === undefined;
                        const shouldHighlight = highlightUnanswered && isUnanswered;
                        
                        return (
                          <tr 
                            key={question.id}
                            className={`border-b hover:bg-gray-50 transition-colors ${
                              shouldHighlight ? 'bg-red-50 border-red-200' : ''
                            }`}
                          >
                            {/* 질문 */}
                            <td className="py-4 px-4" colSpan={6}>
                              <div className="flex items-start gap-3">
                                <Badge variant="outline" className="mt-0.5 text-xs">
                                  {index + 1}
                                </Badge>
                                <div className="flex-1">
                                  <div className="flex items-start gap-2">
                                    <p className={`font-medium leading-relaxed flex-1 ${
                                      shouldHighlight ? 'text-red-700' : 'text-gray-900'
                                    }`}>
                                      {question.question}
                                    </p>
                                    <QuestionTooltip content={`이 질문은 ${config.name} 분야의 역량을 평가합니다. 1점(매우 부족)부터 5점(매우 우수)까지 현재 상황에 맞게 평가해주세요.`}>
                                      <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                                    </QuestionTooltip>
                                  </div>
                                  {question.weight !== 1.0 && (
                                    <p className="text-xs text-gray-500 mt-1">
                                      가중치: {question.weight}
                                    </p>
                                  )}
                                  
                                  {/* 별점 평가 시스템 */}
                                  <div className="mt-3">
                                    <StarRating
                                      score={responses[question.id] || 0}
                                      onScoreChange={(score) => handleResponseChange(question.id, score)}
                                      questionId={question.id}
                                      isHighlighted={shouldHighlight}
                                    />
                                  </div>
                                  
                                  {/* 실시간 피드백 */}
                                  {responses[question.id] && (
                                    <RealTimeFeedback 
                                      score={responses[question.id]} 
                                      categoryKey={categoryKey} 
                                    />
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 모바일 카드 뷰 */}
          <div className="lg:hidden space-y-4 p-4">
            {Object.entries(AI_CAPABILITY_QUESTIONS).map(([categoryKey, category]) => {
              const config = categoryConfig[categoryKey as keyof typeof categoryConfig];
              const IconComponent = config.icon;
              
              return (
                <div key={categoryKey} className="space-y-3">
                  {/* 모바일 카테고리 헤더 */}
                  <div className={`${config.lightColor} rounded-lg p-3 border-l-4 ${config.borderColor.replace('border-', 'border-l-')}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${config.color} text-white`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900">{config.name}</div>
                        <div className="text-sm text-gray-600">{category.description}</div>
                      </div>
                      {categoryScores[categoryKey] > 0 && (
                        <Badge className={`${config.color} text-white`}>
                          {categoryScores[categoryKey]}점
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* 모바일 질문 카드들 */}
                  {category.questions.map((question, index) => {
                    const isUnanswered = responses[question.id] === undefined;
                    const shouldHighlight = highlightUnanswered && isUnanswered;
                    
                    return (
                      <Card 
                        key={question.id}
                        className={`${shouldHighlight ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            {/* 질문 */}
                            <div className="flex items-start gap-3">
                              <Badge variant="outline" className="mt-0.5 text-xs">
                                {index + 1}
                              </Badge>
                              <div className="flex-1">
                                <div className="flex items-start gap-2">
                                  <p className={`font-medium leading-relaxed flex-1 ${
                                    shouldHighlight ? 'text-red-700' : 'text-gray-900'
                                  }`}>
                                    {question.question}
                                  </p>
                                  <QuestionTooltip content={`이 질문은 ${config.name} 분야의 역량을 평가합니다. 1점(매우 부족)부터 5점(매우 우수)까지 현재 상황에 맞게 평가해주세요.`}>
                                    <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                                  </QuestionTooltip>
                                </div>
                                {question.weight !== 1.0 && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    가중치: {question.weight}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* 모바일용 별점 평가 시스템 */}
                            <div className="space-y-3">
                              <StarRating
                                score={responses[question.id] || 0}
                                onScoreChange={(score) => handleResponseChange(question.id, score)}
                                questionId={question.id}
                                isHighlighted={shouldHighlight}
                              />
                              
                              {/* 실시간 피드백 */}
                              {responses[question.id] && (
                                <RealTimeFeedback 
                                  score={responses[question.id]} 
                                  categoryKey={categoryKey} 
                                />
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 하단 요약 */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-semibold text-gray-900">평가 현황</div>
                <div className="text-sm text-gray-600">
                  {Object.keys(responses).length}/24 문항 완료 ({Math.round(overallProgress)}%)
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-600">
                예상 총점: {getOverallScore()}/100점
              </div>
              <div className="text-sm text-gray-600">
                {overallProgress === 100 ? '평가 완료!' : `${24 - Object.keys(responses).length}문항 남음`}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};