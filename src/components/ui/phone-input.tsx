'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
}

export function PhoneInput({
  value,
  onChange,
  placeholder = "010-0000-0000",
  required = false,
  disabled = false,
  className,
  label = "전화번호",
  error
}: PhoneInputProps) {
  // 간단한 입력값 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <div className={cn('relative', className)}>
      <Input
        id="phone-input"
        type="tel"
        value={value}
        onChange={handleInputChange}
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