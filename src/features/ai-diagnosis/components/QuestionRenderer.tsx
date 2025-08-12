'use client'

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, GripVertical, X } from 'lucide-react';
import { Question } from '../types';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface QuestionRendererProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  value,
  onChange,
  error
}) => {
  const renderQuestion = () => {
    switch (question.type) {
      case 'text':
        return (
          <div>
            <Input
              id={question.id}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={question.placeholder}
              className={error ? 'border-red-500' : ''}
            />
          </div>
        );

      case 'textarea':
        return (
          <div>
            <Textarea
              id={question.id}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={question.placeholder}
              rows={4}
              className={error ? 'border-red-500' : ''}
            />
            {question.minLength && (
              <p className="text-xs text-gray-500 mt-1">
                최소 {question.minLength}자 이상 ({(value || '').length}자 입력됨)
              </p>
            )}
          </div>
        );

      case 'select':
        return (
          <Select value={value || ''} onValueChange={onChange}>
            <SelectTrigger className={error ? 'border-red-500' : ''}>
              <SelectValue placeholder="선택해주세요" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'multiselect':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {question.options?.map((option) => {
                const isChecked = (value || []).includes(option);
                return (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${question.id}-${option}`}
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        const currentValues = value || [];
                        if (checked) {
                          onChange([...currentValues, option]);
                        } else {
                          onChange(currentValues.filter((v: string) => v !== option));
                        }
                      }}
                    />
                    <Label
                      htmlFor={`${question.id}-${option}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                );
              })}
            </div>
            {value && value.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {value.map((item: string) => (
                  <Badge key={item} variant="secondary">
                    {item}
                    <button
                      onClick={() => onChange(value.filter((v: string) => v !== item))}
                      className="ml-1"
                      aria-label={`${item} 제거`}
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        );

      case 'scale':
        const scaleValue = value || question.scale?.min || 1;
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              {question.scale?.labels?.map((label, index) => (
                <span key={index} className="text-center flex-1">
                  {label}
                </span>
              ))}
            </div>
            <Slider
              value={[scaleValue]}
              onValueChange={([v]) => onChange(v)}
              min={question.scale?.min || 1}
              max={question.scale?.max || 5}
              step={1}
              className={error ? 'border-red-500' : ''}
            />
            <div className="text-center">
              <Badge variant="outline" className="text-lg">
                {scaleValue} / {question.scale?.max || 5}
              </Badge>
            </div>
          </div>
        );

      case 'matrix':
        const matrixValues = value || {};
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 border-b">항목</th>
                  {question.scale?.labels?.map((label, index) => (
                    <th key={index} className="text-center p-2 border-b text-sm">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {question.functions?.map((func) => (
                  <tr key={func} className="hover:bg-gray-50">
                    <td className="p-2 border-b font-medium">{func}</td>
                    {question.scale?.labels?.map((_, index) => {
                      const scaleValue = index + (question.scale?.min || 1);
                      return (
                        <td key={index} className="text-center p-2 border-b">
                          <RadioGroup
                            value={String(matrixValues[func] || '')}
                            onValueChange={(v) => {
                              onChange({
                                ...matrixValues,
                                [func]: parseInt(v)
                              });
                            }}
                          >
                            <RadioGroupItem
                              value={String(scaleValue)}
                              className="mx-auto"
                            />
                          </RadioGroup>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {question.areas?.map((area) => (
                  <tr key={area} className="hover:bg-gray-50">
                    <td className="p-2 border-b font-medium">{area}</td>
                    {question.scale?.labels?.map((_, index) => {
                      const scaleValue = index + (question.scale?.min || 1);
                      return (
                        <td key={index} className="text-center p-2 border-b">
                          <RadioGroup
                            value={String(matrixValues[area] || '')}
                            onValueChange={(v) => {
                              onChange({
                                ...matrixValues,
                                [area]: parseInt(v)
                              });
                            }}
                          >
                            <RadioGroupItem
                              value={String(scaleValue)}
                              className="mx-auto"
                            />
                          </RadioGroup>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'rank':
        const rankItems = value || [];
        const availableOptions = (question.options || []).filter(
          (opt) => !rankItems.includes(opt)
        );

        const handleDragEnd = (result: any) => {
          if (!result.destination) return;
          
          const items = Array.from(rankItems);
          const [reorderedItem] = items.splice(result.source.index, 1);
          items.splice(result.destination.index, 0, reorderedItem);
          
          onChange(items);
        };

        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                우선순위별로 선택해주세요 (최대 {question.maxSelections}개)
              </p>
              
              {/* 선택된 항목 */}
              {rankItems.length > 0 && (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="ranked-items">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2"
                      >
                        {rankItems.map((item: string, index: number) => (
                          <Draggable key={item} draggableId={item} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`flex items-center gap-2 p-3 bg-white border rounded-lg ${
                                  snapshot.isDragging ? 'shadow-lg' : ''
                                }`}
                              >
                                <div {...provided.dragHandleProps}>
                                  <GripVertical className="text-gray-400" size={20} />
                                </div>
                                <Badge variant="outline">{index + 1}순위</Badge>
                                <span className="flex-1">{item}</span>
                                <button
                                  onClick={() => {
                                    onChange(rankItems.filter((i: string) => i !== item));
                                  }}
                                  className="text-gray-400 hover:text-red-500"
                                  aria-label={`${item} 제거`}
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
              
              {/* 선택 가능한 항목 */}
              {rankItems.length < (question.maxSelections || 5) && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">선택 가능한 항목:</p>
                  <div className="flex flex-wrap gap-2">
                    {availableOptions.map((option) => (
                      <Badge
                        key={option}
                        variant="outline"
                        className="cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          if (rankItems.length < (question.maxSelections || 5)) {
                            onChange([...rankItems, option]);
                          }
                        }}
                      >
                        + {option}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'percentage':
        const percentages = value || {};
        const total = Object.values(percentages).reduce((sum: number, val: any) => sum + (val || 0), 0);
        
        return (
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              총 {question.totalPercentage}%가 되도록 배분해주세요 
              (현재: <span className={total === question.totalPercentage ? 'text-green-600' : 'text-red-600'}>
                {total}%
              </span>)
            </div>
            {question.categories?.map((category) => (
              <div key={category} className="flex items-center gap-4">
                <Label className="flex-1">{category}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={percentages[category] || 0}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value) || 0;
                      onChange({
                        ...percentages,
                        [category]: Math.min(100, Math.max(0, newValue))
                      });
                    }}
                    className="w-20"
                  />
                  <span>%</span>
                </div>
              </div>
            ))}
            {total !== question.totalPercentage && (
              <p className="text-sm text-red-500">
                합계가 {question.totalPercentage}%가 되어야 합니다
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={question.id} className="text-base font-medium">
        {question.question}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {renderQuestion()}
      
      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default QuestionRenderer;
