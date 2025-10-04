'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  MapPin,
  Navigation,
  Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';
// import type { AddressValidationResult } from '@/lib/utils/addressValidator';

type AddressValidationResult = {
  isValid: boolean;
  confidence: number;
  type: string;
  level: string;
  message?: string;
  suggestions?: string[];
  normalizedAddress?: {
    sido?: string;
    sigungu?: string;
    dong?: string;
    ri?: string;
    eupmyeondong?: string;
    roadName?: string;
    buildingNumber?: string;
    buildingName?: string;
    zipCode?: string;
  };
};

interface AddressStatusIndicatorProps {
  validationResult: AddressValidationResult | null;
  className?: string;
}

export function AddressStatusIndicator({ validationResult, className }: AddressStatusIndicatorProps) {
  if (!validationResult) return null;

  const getStatusConfig = () => {
    switch (validationResult.level) {
      case 'complete':
        return {
          icon: CheckCircle2,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          title: '주소 검증 완료',
          description: '정확한 주소가 입력되었습니다.',
          badgeVariant: 'default' as const,
          badgeText: '검증완료'
        };
      case 'sigungu':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          title: '추가 정보 필요',
          description: '읍/면/동 정보를 추가로 입력해주세요.',
          badgeVariant: 'secondary' as const,
          badgeText: '부분완료'
        };
      case 'sido':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          title: '추가 정보 필요',
          description: '시/군/구와 읍/면/동 정보를 추가로 입력해주세요.',
          badgeVariant: 'secondary' as const,
          badgeText: '부분완료'
        };
      case 'invalid':
      default:
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          title: '주소 확인 필요',
          description: '올바른 주소 형식으로 입력해주세요.',
          badgeVariant: 'destructive' as const,
          badgeText: '검증실패'
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <Card className={cn('mt-3', config.borderColor, className)}>
      <CardContent className={cn('p-4', config.bgColor)}>
        <div className="flex items-start gap-3">
          <IconComponent className={cn('h-5 w-5 mt-0.5', config.color)} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className={cn('font-medium text-sm', config.color)}>
                {config.title}
              </h4>
              <Badge variant={config.badgeVariant} className="text-xs">
                {config.badgeText}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {config.description}
            </p>
            
            {/* 주소 구성 요소 표시 */}
            {validationResult.normalizedAddress && (
              <div className="flex flex-wrap gap-2">
                {validationResult.normalizedAddress.sido && (
                  <Badge variant="outline" className="text-xs">
                    <Building2 className="h-3 w-3 mr-1" />
                    {validationResult.normalizedAddress.sido}
                  </Badge>
                )}
                {validationResult.normalizedAddress.sigungu && (
                  <Badge variant="outline" className="text-xs">
                    <Navigation className="h-3 w-3 mr-1" />
                    {validationResult.normalizedAddress.sigungu}
                  </Badge>
                )}
                {validationResult.normalizedAddress.eupmyeondong && (
                  <Badge variant="outline" className="text-xs">
                    <MapPin className="h-3 w-3 mr-1" />
                    {validationResult.normalizedAddress.eupmyeondong}
                  </Badge>
                )}
              </div>
            )}

            {/* 제안사항 표시 */}
            {validationResult.suggestions && validationResult.suggestions.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">💡 입력 가이드:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {validationResult.suggestions.slice(0, 3).map((suggestion, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AddressStatusIndicator;
