'use client'

import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface EnhancedIndustryInputProps {
  value: string;
  onChange: (value: string) => void;
  customIndustry?: string;
  onCustomIndustryChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const INDUSTRIES = [
  { value: '제조업', label: '제조업' },
  { value: '서비스업', label: '서비스업' },
  { value: 'IT/소프트웨어', label: 'IT/소프트웨어' },
  { value: '유통/도소매', label: '유통/도소매' },
  { value: '건설업', label: '건설업' },
  { value: '금융업', label: '금융업' },
  { value: '교육업', label: '교육업' },
  { value: '의료/헬스케어', label: '의료/헬스케어' },
  { value: '숙박/음식업', label: '숙박/음식업' },
  { value: '운수/물류업', label: '운수/물류업' },
  { value: '부동산업', label: '부동산업' },
  { value: '전문/과학/기술서비스', label: '전문/과학/기술서비스' },
  { value: '예술/스포츠/여가', label: '예술/스포츠/여가' },
  { value: '농업/임업/어업', label: '농업/임업/어업' },
  { value: '광업', label: '광업' },
  { value: '전기/가스/수도', label: '전기/가스/수도' },
  { value: '공공행정/국방', label: '공공행정/국방' },
];

const EnhancedIndustryInput: React.FC<EnhancedIndustryInputProps> = ({
  value,
  onChange,
  customIndustry = '',
  onCustomIndustryChange,
  placeholder = '업종을 선택하세요',
  className = ''
}) => {
  const [isDirectInput, setIsDirectInput] = useState(value === '직접입력');

  const handleSelectChange = (selectedValue: string) => {
    if (selectedValue === '직접입력') {
      setIsDirectInput(true);
      onChange('직접입력');
    } else {
      setIsDirectInput(false);
      onChange(selectedValue);
      if (onCustomIndustryChange) {
        onCustomIndustryChange('');
      }
    }
  };

  const handleDirectInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onCustomIndustryChange) {
      onCustomIndustryChange(e.target.value);
    }
  };

  return (
    <div className="space-y-2">
      <Select value={isDirectInput ? '직접입력' : value} onValueChange={handleSelectChange}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {INDUSTRIES.map((industry) => (
            <SelectItem key={industry.value} value={industry.value}>
              {industry.label}
            </SelectItem>
          ))}
          <SelectItem value="직접입력">직접 입력</SelectItem>
        </SelectContent>
      </Select>
      
      {isDirectInput && (
        <Input
          value={customIndustry}
          onChange={handleDirectInputChange}
          placeholder="업종을 직접 입력하세요 (예: 바이오테크, 핀테크 등)"
          className="mt-2 animate-in fade-in slide-in-from-top-2"
        />
      )}
    </div>
  );
};

export default EnhancedIndustryInput;
