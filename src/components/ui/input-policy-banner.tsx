'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Info, 
  CheckCircle2, 
  Shield,
  Eye,
  X,
  ChevronDown,
  ChevronUp,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputPolicyBannerProps {
  className?: string;
}

export function InputPolicyBanner({ className }: InputPolicyBannerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <Card className={cn('border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50', className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 bg-blue-100 rounded-full">
              <Info className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-sm text-gray-900">
                  📋 정확한 정보 입력 가이드
                </h3>
                <Badge variant="secondary" className="text-xs">
                  필수 확인
                </Badge>
              </div>
              
              <p className="text-sm text-gray-700 mb-3">
                정확한 진단을 위해 <strong>실제 정보</strong>를 입력해주세요. 
                모든 입력 항목은 <strong>실시간 검증</strong>되며, 올바른 형식으로 입력해야 다음 단계로 진행할 수 있습니다.
              </p>

              {/* 핵심 정책 요약 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <div className="flex items-center gap-2 p-2 bg-white rounded border">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-xs font-medium text-gray-900">실시간 검증</p>
                    <p className="text-xs text-gray-600">입력 즉시 정합성 확인</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-2 bg-white rounded border">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-xs font-medium text-gray-900">보안 검증</p>
                    <p className="text-xs text-gray-600">임시/가짜 정보 차단</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-2 bg-white rounded border">
                  <Eye className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-xs font-medium text-gray-900">진행 차단</p>
                    <p className="text-xs text-gray-600">검증 실패시 진행 불가</p>
                  </div>
                </div>
              </div>

              {/* 상세 정책 (확장 가능) */}
              {isExpanded && (
                <div className="border-t pt-3 mt-3">
                  <h4 className="font-medium text-sm text-gray-900 mb-2">📝 상세 입력 정책</h4>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded border">
                      <h5 className="font-medium text-xs text-gray-900 mb-2 flex items-center gap-2">
                        📞 전화번호 정책
                        <Badge variant="outline" className="text-xs">필수</Badge>
                      </h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• <strong>휴대폰 번호 권장</strong>: 010-****-**** 형식</li>
                        <li>• <strong>일반전화 허용</strong>: 지역번호 포함 (02-***-****)</li>
                        <li>• <strong>자동 포맷팅</strong>: 숫자만 입력하면 하이픈 자동 삽입</li>
                        <li>• <strong>실시간 검증</strong>: 올바른 번호 형식 확인</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-white rounded border">
                      <h5 className="font-medium text-xs text-gray-900 mb-2 flex items-center gap-2">
                        📧 이메일 정책
                        <Badge variant="outline" className="text-xs">필수</Badge>
                      </h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• <strong>비즈니스 이메일 권장</strong>: company.co.kr, startup.com</li>
                        <li>• <strong>개인 이메일 허용</strong>: gmail.com, naver.com 등</li>
                        <li>• <strong>임시 이메일 차단</strong>: 10minutemail, tempmail 등</li>
                        <li>• <strong>보안 등급 평가</strong>: 높음/보통/낮음으로 분류</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-white rounded border">
                      <h5 className="font-medium text-xs text-gray-900 mb-2 flex items-center gap-2">
                        📍 주소 정책
                        <Badge variant="outline" className="text-xs">필수</Badge>
                      </h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• <strong>3단계 필수</strong>: 시/도 + 시/군/구 + 읍/면/동</li>
                        <li>• <strong>정확한 행정구역</strong>: 서울특별시 강남구 역삼동</li>
                        <li>• <strong>자동완성 지원</strong>: 입력 중 추천 주소 제공</li>
                        <li>• <strong>실시간 검증</strong>: 존재하는 주소인지 확인</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-yellow-800">⚠️ 중요 안내</p>
                        <p className="text-xs text-yellow-700 mt-1">
                          가짜 정보나 임시 정보 입력 시 진단이 진행되지 않습니다. 
                          정확한 정보를 입력해야 신뢰할 수 있는 진단 결과를 받을 수 있습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 확장/축소 버튼 */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 h-auto p-2 text-xs"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-3 w-3 mr-1" />
                    간단히 보기
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" />
                    상세 정책 보기
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* 닫기 버튼 */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDismissed(true)}
            className="h-auto p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default InputPolicyBanner;
