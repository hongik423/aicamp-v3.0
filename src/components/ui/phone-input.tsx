'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface PhoneInputProps {
  value: string;
  onChange: (phone: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
  error?: string;
  clearOnFocus?: boolean;
}

export function PhoneInput({
  value,
  onChange,
  placeholder = "숫자만 입력하세요 (예: 01012345678)",
  disabled = false,
  className,
  error,
  clearOnFocus = false
}: PhoneInputProps) {
  // 숫자만 입력되도록 처리하고 자동 하이픈 추가
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    // 숫자만 추출
    const numbersOnly = newValue.replace(/[^\d]/g, '');
    
    // 자동 하이픈 추가 (010-1234-5678 형식)
    if (numbersOnly.length <= 3) {
      newValue = numbersOnly;
    } else if (numbersOnly.length <= 7) {
      newValue = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
    } else {
      newValue = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
    }
    
    onChange(newValue);
  };

  return (
    <div className={cn('relative', className)}>
      <Input
        id="phone-input"
        type="tel"
        value={value}
        onChange={handleInputChange}
        onFocus={() => { if (clearOnFocus && value) { onChange(''); } }}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="tel"
        inputMode="tel"
        className={cn(
          'text-lg min-h-[48px] transition-all duration-200',
          'focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
          error && 'border-red-500',
          className
        )}
      />

      {/* 에러 메시지 (외부에서 전달된 경우) */}
      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}

export default PhoneInput;