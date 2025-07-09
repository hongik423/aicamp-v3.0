'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface EnhancedNumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: number;
  onChange: (value: number) => void;
  format?: 'billion' | 'percentage' | 'integer';
  suffix?: string;
  decimals?: number;
  min?: number;
  max?: number;
}

export function EnhancedNumberInput({
  value,
  onChange,
  format = 'integer',
  suffix,
  decimals = 2,
  min,
  max,
  className,
  ...props
}: EnhancedNumberInputProps) {
  const [displayValue, setDisplayValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const updateTimeoutRef = useRef<NodeJS.Timeout>();
  
  // 숫자를 표시 형식으로 변환
  const formatValue = useCallback((num: number, focused: boolean = false): string => {
    if (focused) {
      // 포커스 상태에서는 원본 값 표시
      if (num === 0) return '';
      
      switch (format) {
        case 'billion':
          return (num / 100000000).toString();
        case 'percentage':
        case 'integer':
          return num.toString();
        default:
          return num.toString();
      }
    }
    
    // 포커스되지 않은 상태에서는 포맷된 값 표시
    if (num === 0) return '';
    
    switch (format) {
      case 'billion': {
        const billion = num / 100000000;
        if (billion % 1 === 0) {
          return billion.toLocaleString('ko-KR') + (suffix || '');
        }
        return parseFloat(billion.toFixed(decimals)).toLocaleString('ko-KR') + (suffix || '');
      }
      case 'percentage':
        return num.toLocaleString('ko-KR') + (suffix || '%');
      case 'integer':
        return num.toLocaleString('ko-KR') + (suffix || '');
      default:
        return num.toString();
    }
  }, [format, suffix, decimals]);
  
  // 문자열을 숫자로 파싱
  const parseValue = useCallback((str: string): number => {
    if (!str || str.trim() === '') return 0;
    
    // 숫자만 추출 (소수점 포함)
    const cleanStr = str.replace(/[^\d.-]/g, '');
    const num = Number(cleanStr) || 0;
    
    switch (format) {
      case 'billion':
        return num * 100000000;
      case 'percentage':
      case 'integer':
        return num;
      default:
        return num;
    }
  }, [format]);
  
  // value prop이 변경될 때 displayValue 업데이트
  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatValue(value, false));
    }
  }, [value, isFocused, formatValue]);
  
  // 컴포넌트 언마운트 시 타임아웃 정리
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);
  
  // 포커스 핸들러
  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    setDisplayValue(formatValue(value, true));
    
    props.onFocus?.(e);
  }, [value, formatValue, props]);
  
  // 블러 핸들러
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    
    // 타임아웃 정리
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    
    // 최종 값 검증 및 적용
    const parsedValue = parseValue(displayValue);
    let finalValue = parsedValue;
    
    // min/max 제한 적용
    if (min !== undefined && finalValue < min) finalValue = min;
    if (max !== undefined && finalValue > max) finalValue = max;
    
    onChange(finalValue);
    setDisplayValue(formatValue(finalValue, false));
    
    props.onBlur?.(e);
  }, [displayValue, parseValue, onChange, formatValue, min, max, props]);
  
  // 입력 핸들러
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // 숫자와 관련된 문자만 허용
    if (!/^[0-9.-]*$/.test(inputValue.replace(/,/g, ''))) {
      return;
    }
    
    // 표시값 즉시 업데이트
    setDisplayValue(inputValue);
    
    // 이전 타임아웃 취소
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    
    // 디바운스를 사용하여 상위 컴포넌트 업데이트
    updateTimeoutRef.current = setTimeout(() => {
      const parsedValue = parseValue(inputValue);
      let finalValue = parsedValue;
      
      // min/max 제한 적용
      if (min !== undefined && finalValue < min) finalValue = min;
      if (max !== undefined && finalValue > max) finalValue = max;
      
      onChange(finalValue);
    }, 300); // 300ms 디바운스
  }, [parseValue, onChange, min, max]);
  
  // 키보드 이벤트 핸들러
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter 키로 블러 처리
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    }
    
    props.onKeyDown?.(e);
  }, [props]);
  
  return (
    <Input
      ref={inputRef}
      type="text"
      inputMode="decimal"
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={cn(
        'transition-all duration-200',
        isFocused && 'ring-2 ring-blue-500',
        className
      )}
      {...props}
    />
  );
} 