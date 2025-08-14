'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface AddressInputProps {
  value: string;
  onChange: (address: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
  error?: string;
}

export function AddressInput({
  value,
  onChange,
  placeholder = "예: 서울특별시 강남구 역삼동",
  required = false,
  disabled = false,
  className,
  label = "주소",
  error
}: AddressInputProps) {
  // 간단한 입력값 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <div className={cn('relative', className)}>
      {label && (
        <Label htmlFor="address-input" className="mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <div className="relative">
        <Input
          id="address-input"
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="address-line1"
          className={cn(
            'text-lg min-h-[48px] transition-all duration-200',
            'focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
            error && 'border-red-500'
          )}
        />
      </div>

      {/* 에러 메시지 (외부에서 전달된 경우) */}
      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}

export default AddressInput;