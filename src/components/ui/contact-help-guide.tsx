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
  Phone,
  Mail,
  Smartphone,
  Building2,
  User,
  Shield,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactHelpGuideProps {
  className?: string;
}

export function ContactHelpGuide({ className }: ContactHelpGuideProps) {
  const [isOpen, setIsOpen] = useState(false);

  const phoneExamples = [
    {
      type: 'correct',
      title: '올바른 전화번호 예시',
      items: [
        { value: '010-1234-5678', label: '휴대폰 (권장)' },
        { value: '02-123-4567', label: '서울 일반전화' },
        { value: '031-123-4567', label: '경기 일반전화' },
        { value: '1588-1234', label: '무료전화' }
      ]
    },
    {
      type: 'incorrect',
      title: '잘못된 전화번호 예시',
      items: [
        { value: '010-123-456', label: '자릿수 부족' },
        { value: '010-12345-6789', label: '자릿수 초과' },
        { value: '011-1234-5678', label: '사용 중단된 번호' },
        { value: '010 1234 5678', label: '잘못된 구분자' }
      ]
    }
  ];

  const emailExamples = [
    {
      type: 'correct',
      title: '올바른 이메일 예시',
      items: [
        { value: 'hong@company.co.kr', label: '비즈니스 (권장)', security: 'high' },
        { value: 'user@gmail.com', label: '개인 이메일', security: 'medium' },
        { value: 'manager@startup.com', label: '스타트업', security: 'high' },
        { value: 'ceo@business.net', label: '기업 이메일', security: 'high' }
      ]
    },
    {
      type: 'incorrect',
      title: '주의가 필요한 이메일',
      items: [
        { value: 'test@10minutemail.com', label: '임시 이메일', security: 'low' },
        { value: 'user@tempmail.org', label: '일회용 이메일', security: 'low' },
        { value: 'invalid-email', label: '형식 오류', security: 'low' },
        { value: 'user@.com', label: '도메인 누락', security: 'low' }
      ]
    }
  ];

  const securityLevels = [
    {
      level: 'high',
      label: '높음',
      description: '비즈니스 이메일, 신뢰할 수 있는 도메인',
      color: 'text-green-700 bg-green-50 border-green-200',
      icon: Shield
    },
    {
      level: 'medium',
      label: '보통',
      description: '개인 이메일, 일반적인 도메인',
      color: 'text-yellow-700 bg-yellow-50 border-yellow-200',
      icon: User
    },
    {
      level: 'low',
      label: '낮음',
      description: '임시/의심스러운 이메일',
      color: 'text-red-700 bg-red-50 border-red-200',
      icon: XCircle
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
        연락처 입력 도움말
      </Button>
    );
  }

  return (
    <Card className={cn('w-full max-w-4xl', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-600" />
          연락처 입력 가이드
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
        {/* 전화번호 가이드 */}
        <div>
          <h3 className="font-medium text-sm text-gray-900 mb-4 flex items-center gap-2">
            <Phone className="h-4 w-4 text-blue-600" />
            전화번호 입력 가이드
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {phoneExamples.map((example, index) => (
              <div key={index}>
                <h4 className={cn(
                  'font-medium text-sm mb-3 flex items-center gap-2',
                  example.type === 'correct' ? 'text-green-700' : 'text-red-700'
                )}>
                  {example.type === 'correct' ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  {example.title}
                </h4>
                <div className="space-y-2">
                  {example.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        'p-3 rounded border text-sm',
                        example.type === 'correct'
                          ? 'bg-green-50 border-green-200 text-green-800'
                          : 'bg-red-50 border-red-200 text-red-800'
                      )}
                    >
                      <div className="font-mono font-medium">{item.value}</div>
                      <div className="text-xs opacity-75 mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-sm text-blue-900 mb-2 flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              전화번호 입력 팁
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 휴대폰 번호를 권장합니다 (010-****-****)</li>
              <li>• 하이픈(-)은 자동으로 입력됩니다</li>
              <li>• 숫자만 입력하면 자동 포맷팅됩니다</li>
              <li>• 일반전화는 지역번호를 포함해주세요</li>
            </ul>
          </div>
        </div>

        {/* 이메일 가이드 */}
        <div>
          <h3 className="font-medium text-sm text-gray-900 mb-4 flex items-center gap-2">
            <Mail className="h-4 w-4 text-blue-600" />
            이메일 입력 가이드
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {emailExamples.map((example, index) => (
              <div key={index}>
                <h4 className={cn(
                  'font-medium text-sm mb-3 flex items-center gap-2',
                  example.type === 'correct' ? 'text-green-700' : 'text-red-700'
                )}>
                  {example.type === 'correct' ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  {example.title}
                </h4>
                <div className="space-y-2">
                  {example.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        'p-3 rounded border text-sm',
                        example.type === 'correct'
                          ? 'bg-green-50 border-green-200 text-green-800'
                          : 'bg-red-50 border-red-200 text-red-800'
                      )}
                    >
                      <div className="font-mono font-medium mb-1">{item.value}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs opacity-75">{item.label}</span>
                        {'security' in item && (
                          <Badge 
                            variant="outline" 
                            className={cn(
                              'text-xs',
                              item.security === 'high' ? 'border-green-300 text-green-700' :
                              item.security === 'medium' ? 'border-yellow-300 text-yellow-700' :
                              'border-red-300 text-red-700'
                            )}
                          >
                            보안: {item.security === 'high' ? '높음' : 
                                  item.security === 'medium' ? '보통' : '낮음'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 보안 등급 설명 */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-sm text-gray-900 mb-3">
              📊 이메일 보안 등급
            </h4>
            <div className="space-y-2">
              {securityLevels.map((level, idx) => {
                const IconComponent = level.icon;
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={cn('p-2 rounded border', level.color)}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{level.label}</div>
                      <div className="text-xs text-gray-600">{level.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-sm text-blue-900 mb-2 flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              이메일 입력 팁
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 비즈니스 이메일을 권장합니다 (.co.kr, .com 등)</li>
              <li>• 임시 이메일은 사용을 피해주세요</li>
              <li>• 대소문자는 자동으로 소문자로 변환됩니다</li>
              <li>• 실제 사용 가능한 이메일을 입력해주세요</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ContactHelpGuide;
