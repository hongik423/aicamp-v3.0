'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  X, 
  CheckCircle2, 
  XCircle, 
  MapPin,
  Navigation,
  Building2,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddressHelpGuideProps {
  className?: string;
}

export function AddressHelpGuide({ className }: AddressHelpGuideProps) {
  const [isOpen, setIsOpen] = useState(false);

  const examples = [
    {
      type: 'correct',
      title: '올바른 주소 예시',
      addresses: [
        '서울특별시 강남구 역삼동',
        '부산광역시 해운대구 우동',
        '경기도 성남시 분당구 정자동',
        '인천광역시 남동구 구월동'
      ]
    },
    {
      type: 'incorrect',
      title: '잘못된 주소 예시',
      addresses: [
        '서울 강남', // 구 단위까지만
        '부산시', // 시 단위까지만
        '강남구 역삼동', // 시/도 누락
        '서울특별시 강남구' // 동 단위 누락
      ]
    }
  ];

  const addressStructure = [
    {
      level: '시/도',
      description: '특별시, 광역시, 도',
      examples: ['서울특별시', '부산광역시', '경기도'],
      icon: Building2,
      required: true
    },
    {
      level: '시/군/구',
      description: '시, 군, 구',
      examples: ['강남구', '해운대구', '성남시'],
      icon: Navigation,
      required: true
    },
    {
      level: '읍/면/동',
      description: '읍, 면, 동',
      examples: ['역삼동', '우동', '정자동'],
      icon: MapPin,
      required: true
    }
  ];

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className={cn('gap-2', className)}
      >
        <HelpCircle className="h-4 w-4" />
        주소 입력 도움말
      </Button>
    );
  }

  return (
    <Card className={cn('w-full max-w-2xl', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-600" />
          주소 입력 가이드
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* 주소 구조 설명 */}
        <div>
          <h3 className="font-medium text-sm text-gray-900 mb-3">
            📍 필수 입력 항목 (3단계)
          </h3>
          <div className="space-y-3">
            {addressStructure.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                    <IconComponent className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{item.level}</span>
                      <Badge variant="secondary" className="text-xs">
                        {item.required ? '필수' : '선택'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.examples.map((example, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 예시 주소들 */}
        <div className="grid md:grid-cols-2 gap-4">
          {examples.map((example, index) => (
            <div key={index}>
              <h3 className={cn(
                'font-medium text-sm mb-3 flex items-center gap-2',
                example.type === 'correct' ? 'text-green-700' : 'text-red-700'
              )}>
                {example.type === 'correct' ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                {example.title}
              </h3>
              <div className="space-y-2">
                {example.addresses.map((address, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'p-2 rounded text-sm border',
                      example.type === 'correct'
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : 'bg-red-50 border-red-200 text-red-800'
                    )}
                  >
                    {address}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 추가 팁 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-sm text-blue-900 mb-2">
            💡 입력 팁
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 정확한 행정구역명을 사용해주세요</li>
            <li>• 시/도 → 시/군/구 → 읍/면/동 순서로 입력하세요</li>
            <li>• 자동완성 기능을 활용해보세요</li>
            <li>• 검증 완료 표시를 확인한 후 다음 단계로 진행하세요</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default AddressHelpGuide;
