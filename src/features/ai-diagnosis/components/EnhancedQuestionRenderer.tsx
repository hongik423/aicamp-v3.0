'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  Check, 
  AlertCircle, 
  Info, 
  Star, 
  TrendingUp,
  Users,
  Building,
  Target,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Question } from '../types';

interface EnhancedQuestionRendererProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  sectionProgress?: number;
  questionIndex?: number;
  totalQuestions?: number;
}

const EnhancedQuestionRenderer: React.FC<EnhancedQuestionRendererProps> = ({
  question,
  value,
  onChange,
  error,
  sectionProgress = 0,
  questionIndex = 0,
  totalQuestions = 1
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // 질문 타입별 아이콘
  const getQuestionIcon = (type: string) => {
    switch (type) {
      case 'scale': return <TrendingUp className="w-5 h-5" />;
      case 'multiselect': return <Users className="w-5 h-5" />;
      case 'select': return <Building className="w-5 h-5" />;
      case 'rank': return <Star className="w-5 h-5" />;
      case 'matrix': return <Target className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  // 값 변경 시 애니메이션 트리거
  useEffect(() => {
    if (value !== undefined && value !== null) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [value]);

  // 필수 표시
  const renderRequiredIndicator = () => {
    if (!question.required) return null;
    return (
      <Badge variant="destructive" className="text-xs ml-2">
        필수
      </Badge>
    );
  };

  // 진행률 표시
  const renderProgress = () => {
    return (
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
        <span>{questionIndex + 1}/{totalQuestions}</span>
        <Progress value={sectionProgress} className="flex-1 h-1" />
        <span>{Math.round(sectionProgress)}%</span>
      </div>
    );
  };

  // 텍스트 입력
  const renderTextInput = () => {
    return (
      <div className="space-y-2">
        <Input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          className={`transition-all duration-200 ${
            error ? 'border-red-500 ring-red-500' : 
            value ? 'border-green-500 ring-green-500' : ''
          }`}
        />
        {question.validation && (
          <p className="text-xs text-gray-500">
            {question.validation.includes('minLength') && 
              `최소 ${question.minLength}자 이상 입력해주세요`}
          </p>
        )}
      </div>
    );
  };

  // 텍스트 영역
  const renderTextarea = () => {
    const charCount = (value || '').length;
    const minLength = question.minLength || 0;
    
    return (
      <div className="space-y-2">
        <Textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          rows={4}
          className={`transition-all duration-200 ${
            error ? 'border-red-500' : 
            charCount >= minLength ? 'border-green-500' : ''
          }`}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>
            {minLength > 0 && `최소 ${minLength}자 필요`}
          </span>
          <span className={charCount >= minLength ? 'text-green-600' : ''}>
            {charCount}자
          </span>
        </div>
      </div>
    );
  };

  // 선택 옵션
  const renderSelect = () => {
    return (
      <div className="space-y-2">
        <div className="relative">
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full p-3 border rounded-lg bg-white appearance-none cursor-pointer transition-all duration-200 ${
              error ? 'border-red-500' : 
              value ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <option value="">선택해주세요</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
    );
  };

  // 다중 선택
  const renderMultiselect = () => {
    const selectedValues = Array.isArray(value) ? value : [];
    
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {question.options?.map((option) => {
            const isSelected = selectedValues.includes(option);
            return (
              <motion.div
                key={option}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                  onClick={() => {
                    const newValue = isSelected
                      ? selectedValues.filter(v => v !== option)
                      : [...selectedValues, option];
                    onChange(newValue);
                  }}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-sm ${isSelected ? 'font-medium text-blue-700' : 'text-gray-700'}`}>
                        {option}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        <div className="text-xs text-gray-500">
          {selectedValues.length}개 선택됨 
          {question.maxSelections && ` (최대 ${question.maxSelections}개)`}
        </div>
      </div>
    );
  };

  // 스케일 (1-5점)
  const renderScale = () => {
    const scaleValue = value || question.scale?.min || 1;
    const min = question.scale?.min || 1;
    const max = question.scale?.max || 5;
    const labels = question.scale?.labels || [];
    
    return (
      <div className="space-y-4">
        {/* 슬라이더 */}
        <div className="px-4">
          <Slider
            value={[scaleValue]}
            onValueChange={([newValue]) => onChange(newValue)}
            min={min}
            max={max}
            step={1}
            className="w-full"
          />
        </div>
        
        {/* 점수 표시 */}
        <div className="text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-bold ${
            scaleValue >= 4 ? 'bg-green-100 text-green-800' :
            scaleValue >= 3 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {getQuestionIcon(question.type)}
            {scaleValue}점
          </div>
        </div>
        
        {/* 라벨 */}
        {labels.length > 0 && (
          <div className="flex justify-between text-xs text-gray-600">
            {labels.map((label, index) => (
              <span 
                key={index} 
                className={`text-center flex-1 ${
                  scaleValue === index + min ? 'font-bold text-blue-600' : ''
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  // 순위 선택
  const renderRank = () => {
    const selectedValues = Array.isArray(value) ? value : [];
    const maxSelections = question.maxSelections || 5;
    
    return (
      <div className="space-y-3">
        <div className="text-sm text-gray-600 mb-3">
          우선순위별로 최대 {maxSelections}개를 선택해주세요
        </div>
        
        <div className="space-y-2">
          {question.options?.map((option) => {
            const selectedIndex = selectedValues.indexOf(option);
            const isSelected = selectedIndex !== -1;
            const rank = selectedIndex + 1;
            
            return (
              <motion.div
                key={option}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    let newValue = [...selectedValues];
                    
                    if (isSelected) {
                      // 이미 선택된 경우 제거
                      newValue = newValue.filter(v => v !== option);
                    } else if (newValue.length < maxSelections) {
                      // 최대 선택 수에 도달하지 않은 경우 추가
                      newValue.push(option);
                    }
                    
                    onChange(newValue);
                  }}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      {isSelected ? (
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {rank}
                        </div>
                      ) : (
                        <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-400 text-sm">+</span>
                        </div>
                      )}
                      <span className={`${isSelected ? 'font-medium text-blue-700' : 'text-gray-700'}`}>
                        {option}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        
        <div className="text-xs text-gray-500">
          {selectedValues.length}/{maxSelections} 선택됨
        </div>
      </div>
    );
  };

  // 매트릭스 (여러 항목에 대한 점수)
  const renderMatrix = () => {
    const matrixValue = value || {};
    const functions = question.functions || question.areas || [];
    const scale = question.scale || { min: 1, max: 5, labels: [] };
    
    return (
      <div className="space-y-4">
        {functions.map((func) => (
          <div key={func} className="border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <Label className="text-sm font-medium">{func}</Label>
              <Badge variant="outline">
                {matrixValue[func] || scale.min}점
              </Badge>
            </div>
            
            <Slider
              value={[matrixValue[func] || scale.min]}
              onValueChange={([newValue]) => {
                onChange({
                  ...matrixValue,
                  [func]: newValue
                });
              }}
              min={scale.min}
              max={scale.max}
              step={1}
              className="w-full"
            />
            
            {scale.labels && (
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                {scale.labels.map((label, index) => (
                  <span key={index} className="text-center flex-1">
                    {label}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // 백분율 입력
  const renderPercentage = () => {
    const percentageValue = value || {};
    const categories = question.categories || [];
    const totalPercentage = question.totalPercentage || 100;
    
    const currentTotal: number = Object.values(percentageValue).reduce((sum: number, val: any) => sum + (Number(val) || 0), 0) as number;
    const remaining = totalPercentage - currentTotal;
    
    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-600 mb-3">
          총 {totalPercentage}%가 되도록 배분해주세요
        </div>
        
        {categories.map((category) => (
          <div key={category} className="flex items-center gap-3">
            <Label className="flex-1 text-sm">{category}</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min="0"
                max="100"
                value={percentageValue[category] || ''}
                onChange={(e) => {
                  const newValue = Math.min(100, Math.max(0, Number(e.target.value) || 0));
                  onChange({
                    ...percentageValue,
                    [category]: newValue
                  });
                }}
                className="w-20 text-center"
              />
              <span className="text-sm text-gray-500">%</span>
            </div>
          </div>
        ))}
        
        <div className={`text-sm p-2 rounded ${
          remaining === 0 ? 'bg-green-100 text-green-800' : 
          remaining < 0 ? 'bg-red-100 text-red-800' : 
          'bg-yellow-100 text-yellow-800'
        }`}>
          {remaining === 0 ? '✅ 완료!' : 
           remaining < 0 ? `❌ ${Math.abs(remaining)}% 초과` : 
           `⚠️ ${remaining}% 남음`}
        </div>
      </div>
    );
  };

  // 질문 렌더링
  const renderQuestion = () => {
    switch (question.type) {
      case 'text':
        return renderTextInput();
      case 'textarea':
        return renderTextarea();
      case 'select':
        return renderSelect();
      case 'multiselect':
        return renderMultiselect();
      case 'scale':
        return renderScale();
      case 'rank':
        return renderRank();
      case 'matrix':
        return renderMatrix();
      case 'percentage':
        return renderPercentage();
      default:
        return renderTextInput();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`space-y-4 ${isAnimating ? 'scale-105' : ''} transition-transform duration-300`}
    >
      {/* 진행률 */}
      {renderProgress()}
      
      {/* 질문 헤더 */}
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${
          value ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
        }`}>
          {getQuestionIcon(question.type)}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Label className="text-base font-medium text-gray-800">
              {question.question}
            </Label>
            {renderRequiredIndicator()}
            
            {/* 도움말 버튼 */}
            {(question as any).description && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowHint(!showHint)}
                className="h-6 w-6 p-0"
              >
                <Info className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* 도움말 */}
          <AnimatePresence>
            {showHint && (question as any).description && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3"
              >
                <p className="text-sm text-blue-700">
                  {(question as any).description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* 질문 내용 */}
      <div className="ml-11">
        {renderQuestion()}
      </div>
      
      {/* 오류 메시지 */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 text-red-600 text-sm ml-11"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EnhancedQuestionRenderer;
