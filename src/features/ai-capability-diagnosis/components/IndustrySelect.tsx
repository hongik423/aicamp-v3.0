'use client';

import React, { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { industryCategories } from '../constants/options';

interface IndustrySelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const IndustrySelect: React.FC<IndustrySelectProps> = ({ value, onValueChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // 검색어에 따른 필터링
  const filteredCategories = industryCategories.map(category => ({
    ...category,
    options: category.options.filter(option => 
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.options.length > 0);

  const selectedOption = industryCategories
    .flatMap(cat => cat.options)
    .find(option => option.value === value);

  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="업종을 선택하세요">
            {selectedOption ? selectedOption.label : 
             value === 'other' ? '기타 (직접 입력)' : ''}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[400px] overflow-y-auto">
          {/* 검색창 */}
          <div className="sticky top-0 bg-white p-2 border-b">
            <input
              type="text"
              placeholder="업종 검색..."
              className="w-full px-3 py-2 text-sm border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* 카테고리별 업종 목록 */}
          {filteredCategories.map((category) => (
            <SelectGroup key={category.category}>
              <SelectLabel className="px-2 py-1.5 text-sm font-semibold text-gray-900 bg-gray-50">
                {category.category} ({category.options.length}개)
              </SelectLabel>
              {category.options.map((option) => (
                <SelectItem key={option.value} value={option.value} className="pl-6">
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}

          {/* 기타 옵션 */}
          <SelectGroup>
            <SelectLabel className="px-2 py-1.5 text-sm font-semibold text-gray-900 bg-gray-50">
              기타
            </SelectLabel>
            <SelectItem value="other" className="pl-6">
              기타 (직접 입력)
            </SelectItem>
          </SelectGroup>

          {/* 검색 결과 없음 */}
          {searchTerm && filteredCategories.length === 0 && (
            <div className="p-4 text-center text-sm text-gray-500">
              '{searchTerm}'에 대한 검색 결과가 없습니다.
              <br />
              <span className="text-blue-600 cursor-pointer hover:underline"
                    onClick={() => onValueChange('other')}>
                기타 업종으로 직접 입력하기
              </span>
            </div>
          )}
        </SelectContent>
      </Select>

      {/* 업종 통계 정보 */}
      <div className="text-xs text-gray-500 flex items-center justify-between">
        <span>총 {industryCategories.reduce((sum, cat) => sum + cat.options.length, 0)}개 업종</span>
        <span>14개 카테고리</span>
      </div>
    </div>
  );
};