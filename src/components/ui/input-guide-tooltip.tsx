'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Info, 
  CheckCircle2, 
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputGuideTooltipProps {
  type: 'phone' | 'email' | 'address';
  isVisible: boolean;
  currentValue?: string;
  className?: string;
}

export function InputGuideTooltip({ 
  type, 
  isVisible, 
  currentValue = '', 
  className 
}: InputGuideTooltipProps) {
  if (!isVisible) return null;

  const getGuideContent = () => {
    switch (type) {
      case 'phone':
        return {
          icon: Phone,
          title: '전화번호 입력 가이드',
          color: 'border-blue-200 bg-blue-50',
          tips: [
            { text: '휴대폰 번호 권장: 010-****-****', example: '010-1234-5678' },
            { text: '일반전화: 지역번호 포함', example: '02-123-4567' },
            { text: '하이픈(-)은 자동으로 입력됩니다', example: '01012345678 → 010-1234-5678' },
            { text: '숫자만 입력하면 자동 포맷팅', example: '' }
          ],
          realTimeHint: getRealTimePhoneHint(currentValue)
        };
      
      case 'email':
        return {
          icon: Mail,
          title: '이메일 입력 가이드',
          color: 'border-green-200 bg-green-50',
          tips: [
            { text: '비즈니스 이메일 권장', example: 'hong@company.co.kr' },
            { text: '@와 도메인 필수', example: 'user@domain.com' },
            { text: '임시 이메일은 사용 불가', example: '❌ test@10minutemail.com' },
            { text: '실제 사용 가능한 이메일', example: '✅ ceo@startup.com' }
          ],
          realTimeHint: getRealTimeEmailHint(currentValue)
        };
      
      case 'address':
        return {
          icon: MapPin,
          title: '주소 입력 가이드',
          color: 'border-purple-200 bg-purple-50',
          tips: [
            { text: '시/도 + 시/군/구 + 읍/면/동', example: '서울특별시 강남구 역삼동' },
            { text: '정확한 행정구역명 사용', example: '부산광역시 해운대구 우동' },
            { text: '3단계 모두 입력 필수', example: '경기도 성남시 분당구 정자동' },
            { text: '자동완성 기능 활용', example: '' }
          ],
          realTimeHint: getRealTimeAddressHint(currentValue)
        };
      
      default:
        return null;
    }
  };

  const guide = getGuideContent();
  if (!guide) return null;

  const IconComponent = guide.icon;

  return (
    <Card className={cn('absolute z-50 w-80 mt-1 shadow-lg', guide.color, className)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <IconComponent className="h-4 w-4 text-blue-600" />
          <h4 className="font-medium text-sm text-gray-900">{guide.title}</h4>
        </div>

        {/* 실시간 힌트 */}
        {guide.realTimeHint && (
          <div className="mb-3 p-2 bg-white rounded border">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-700 mb-1">실시간 가이드</p>
                <p className="text-xs text-gray-600">{guide.realTimeHint}</p>
              </div>
            </div>
          </div>
        )}

        {/* 입력 팁 */}
        <div className="space-y-2">
          {guide.tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1 h-1 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-xs text-gray-700">{tip.text}</p>
                {tip.example && (
                  <p className="text-xs font-mono text-blue-600 mt-1">{tip.example}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 다음 단계 안내 */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <CheckCircle2 className="h-3 w-3" />
            <span>검증 완료 후 다음 단계 진행</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 실시간 전화번호 힌트
function getRealTimePhoneHint(value: string): string {
  if (!value) return '전화번호를 입력해주세요 (숫자만 입력)';
  
  const cleanValue = value.replace(/[^\d]/g, '');
  
  if (cleanValue.length < 3) return '지역번호 또는 010을 입력해주세요';
  if (cleanValue.startsWith('010')) {
    if (cleanValue.length < 7) return '010 다음 4자리를 입력해주세요';
    if (cleanValue.length < 11) return '마지막 4자리를 입력해주세요';
    if (cleanValue.length === 11) return '✅ 올바른 휴대폰 번호입니다!';
  }
  if (cleanValue.startsWith('02')) {
    if (cleanValue.length < 6) return '02 다음 3-4자리를 입력해주세요';
    if (cleanValue.length < 10) return '마지막 4자리를 입력해주세요';
    if (cleanValue.length === 10) return '✅ 올바른 서울 전화번호입니다!';
  }
  
  return '올바른 전화번호 형식으로 입력해주세요';
}

// 실시간 이메일 힌트
function getRealTimeEmailHint(value: string): string {
  if (!value) return '이메일 주소를 입력해주세요';
  
  if (!value.includes('@')) return '@ 기호를 입력해주세요';
  
  const [localPart, domain] = value.split('@');
  
  if (!localPart) return '@ 앞에 사용자명을 입력해주세요';
  if (!domain) return '@ 뒤에 도메인을 입력해주세요';
  if (!domain.includes('.')) return '도메인에 .을 포함해주세요 (예: .com, .co.kr)';
  
  // 비즈니스 도메인 추천
  if (domain.endsWith('.co.kr') || domain.endsWith('.com')) {
    return '✅ 비즈니스 이메일 형식입니다! (권장)';
  }
  if (domain.includes('gmail') || domain.includes('naver')) {
    return '개인 이메일입니다. 비즈니스 이메일을 권장합니다.';
  }
  
  return '도메인을 완성해주세요 (예: company.co.kr)';
}

// 실시간 주소 힌트
function getRealTimeAddressHint(value: string): string {
  if (!value) return '주소를 입력해주세요 (시/도부터 시작)';
  
  const hasCity = /^(서울|부산|대구|인천|광주|대전|울산|세종|경기|강원|충청|전라|전북|경상|제주)/.test(value);
  const hasDistrict = /(구|시|군)/.test(value);
  const hasDong = /(동|읍|면)/.test(value);
  
  if (!hasCity) return '시/도를 입력해주세요 (예: 서울특별시, 경기도)';
  if (!hasDistrict) return '시/군/구를 입력해주세요 (예: 강남구, 성남시)';
  if (!hasDong) return '읍/면/동을 입력해주세요 (예: 역삼동, 정자동)';
  
  return '✅ 완전한 주소 형식입니다!';
}

export default InputGuideTooltip;
