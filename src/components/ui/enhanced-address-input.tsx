'use client'

import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EnhancedAddressInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const REGIONS = [
  { value: '서울특별시', label: '서울특별시' },
  { value: '부산광역시', label: '부산광역시' },
  { value: '대구광역시', label: '대구광역시' },
  { value: '인천광역시', label: '인천광역시' },
  { value: '광주광역시', label: '광주광역시' },
  { value: '대전광역시', label: '대전광역시' },
  { value: '울산광역시', label: '울산광역시' },
  { value: '세종특별자치시', label: '세종특별자치시' },
  { value: '경기도', label: '경기도' },
  { value: '강원도', label: '강원도' },
  { value: '충청북도', label: '충청북도' },
  { value: '충청남도', label: '충청남도' },
  { value: '전라북도', label: '전라북도' },
  { value: '전라남도', label: '전라남도' },
  { value: '경상북도', label: '경상북도' },
  { value: '경상남도', label: '경상남도' },
  { value: '제주특별자치도', label: '제주특별자치도' },
];

const EnhancedAddressInput: React.FC<EnhancedAddressInputProps> = ({
  value,
  onChange,
  placeholder = '지역을 선택하세요',
  className = ''
}) => {
  const [isDirectInput, setIsDirectInput] = useState(false);

  const handleSelectChange = (selectedValue: string) => {
    if (selectedValue === 'direct') {
      setIsDirectInput(true);
      onChange('');
    } else {
      setIsDirectInput(false);
      onChange(selectedValue);
    }
  };

  const handleDirectInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  if (isDirectInput) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input
            value={value}
            onChange={handleDirectInputChange}
            placeholder="지역을 직접 입력하세요"
            className={`flex-1 ${className}`}
          />
          <button
            type="button"
            onClick={() => {
              setIsDirectInput(false);
              onChange('');
            }}
            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border rounded-md hover:bg-gray-50"
          >
            선택으로
          </button>
        </div>
      </div>
    );
  }

  return (
    <Select value={value} onValueChange={handleSelectChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {REGIONS.map((region) => (
          <SelectItem key={region.value} value={region.value}>
            {region.label}
          </SelectItem>
        ))}
        <SelectItem value="direct">직접 입력</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default EnhancedAddressInput;
