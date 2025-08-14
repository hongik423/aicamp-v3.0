'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmailInputProps {
  value: string;
  onChange: (email: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
  error?: string;
  showEmailNotice?: boolean;
}

export function EmailInput({
  value,
  onChange,
  placeholder = "example@company.com",
  required = false,
  disabled = false,
  className,
  label = "이메일",
  error,
  showEmailNotice = true
}: EmailInputProps) {
  // 간단한 입력값 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <div className={cn('relative', className)}>
      {label && (
        <Label htmlFor="email-input" className="mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <div className="relative">
        <Input
          id="email-input"
          type="email"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="email"
          className={cn(
            'text-lg min-h-[48px] transition-all duration-200',
            'focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
            error && 'border-red-500'
          )}
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Mail className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* 에러 메시지 (외부에서 전달된 경우) */}
      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}

      {/* 이메일 안내 메시지 */}
      {showEmailNotice && (
        <Alert className="mt-3 border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 text-sm">
            <strong>📧 이메일 보고서 발송 안내:</strong> 유효한 이메일 주소를 입력해주세요. 
            잘못된 이메일 주소로는 진단 보고서가 발송되지 않습니다.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default EmailInput;