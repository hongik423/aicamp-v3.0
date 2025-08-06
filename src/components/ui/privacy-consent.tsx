'use client';

import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Eye, Shield, Lock, FileText, Clock } from 'lucide-react';

interface PrivacyConsentProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  required?: boolean;
  className?: string;
}

export default function PrivacyConsent({ 
  checked = false, 
  onCheckedChange = () => {}, 
  required = true,
  className = ""
}: PrivacyConsentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConsentChange = (newChecked: boolean) => {
    console.log('개인정보 동의 상태 변경:', newChecked);
    if (onCheckedChange && typeof onCheckedChange === 'function') {
      onCheckedChange(newChecked);
    }
  };

  const privacyPolicy = {
    title: "개인정보 수집 및 이용 동의서 (개인정보보호법 제15조, 제22조)",
    sections: [
      {
        title: "1. 개인정보 수집 목적 (개인정보보호법 제15조)",
        content: [
          "• 상담 서비스 제공 및 문의사항 응답",
          "• AI 역량진단 결과 제공 및 분석",
          "• 서비스 관련 정보 제공 및 안내",
          "• 본인 확인 및 연락처 확인",
          "• 개인정보보호법 제15조에 따른 명시적 목적"
        ]
      },
      {
        title: "2. 수집하는 개인정보 항목 (개인정보보호법 제15조)",
        content: [
          "• 필수항목: 성명, 연락처, 이메일, 회사명",
          "• 선택항목: 직책/부서, 문의내용, 희망상담시간",
          "• AI 역량진단 관련: 평가 응답, 업종 정보"
        ]
      },
      {
        title: "3. 개인정보 보유 및 이용기간 (개인정보보호법 제16조)",
        content: [
          "• 수집일로부터 3년간 보관",
          "• 상담 완료 후 고객 요청 시 즉시 삭제",
          "• 관련 법령에 따른 보존 의무가 있는 경우 해당 기간까지 보관",
          "• 개인정보보호법 제16조에 따른 보유기간 준수"
        ]
      },
      {
        title: "4. 개인정보 제3자 제공 (개인정보보호법 제17조)",
        content: [
          "• 원칙적으로 개인정보를 제3자에게 제공하지 않음",
          "• 법령에 의하거나 정보주체의 별도 동의가 있는 경우에만 제공",
          "• 개인정보보호법 제17조에 따른 제한적 제공"
        ]
      },
      {
        title: "5. 개인정보 처리 위탁 (개인정보보호법 제26조)",
        content: [
          "• Google Workspace (이메일 발송 및 데이터 보관)",
          "• 위탁업체와 개인정보보호 관련 계약 체결",
          "• 개인정보보호법 제26조에 따른 위탁 제한"
        ]
      },
      {
        title: "6. 정보주체의 권리 (개인정보보호법 제4조)",
        content: [
          "• 개인정보 열람, 정정·삭제, 처리정지 요구권",
          "• 개인정보보호법에 따른 권리 행사 가능",
          "• 권리 행사 문의: hongik423@gmail.com",
          "• 개인정보보호법 제4조에 따른 정보주체 권리 보장"
        ]
      },
      {
        title: "7. 개인정보 처리방침 (개인정보보호법 제30조)",
        content: [
          "• 개인정보 처리방침 공개 및 변경 시 사전 고지",
          "• 개인정보보호법 제30조에 따른 처리방침 수립",
          "• 정보주체의 권리보호를 위한 내부 관리계획 수립"
        ]
      }
    ],
    footer: [
      "※ 개인정보 수집·이용에 동의하지 않을 권리가 있으나, 동의를 거부할 경우 상담 서비스 이용이 제한될 수 있습니다. (개인정보보호법 제15조)",
      "※ 만 14세 미만 아동의 경우 법정대리인의 동의가 필요합니다. (개인정보보호법 제22조)",
      "※ 본 동의는 개인정보보호법에 따라 자유롭게 철회할 수 있습니다. (개인정보보호법 제4조)"
    ]
  };

  return (
    <div className={`relative z-50 bg-white border-3 border-blue-500 rounded-2xl p-8 shadow-lg ${className}`}>
      <div className="flex items-start gap-6">
        <div className="flex items-center">
          <Checkbox
            id="privacy-consent-checkbox"
            checked={checked}
            onCheckedChange={handleConsentChange}
            className="w-8 h-8 border-4 border-black shadow-lg ring-2 ring-blue-500 ring-offset-2 data-[state=checked]:bg-blue-600 data-[state=checked]:border-black data-[state=checked]:ring-green-500 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:ring-4 focus:ring-blue-300"
            required={required}
          />
        </div>
        <div className="flex-1">
          <label 
            htmlFor="privacy-consent-checkbox" 
            className="text-lg text-gray-900 cursor-pointer leading-relaxed block font-medium"
          >
            {required && <span className="text-red-600 font-bold text-xl">* </span>}
            <div className="flex items-start gap-3">
              <span className="font-bold text-gray-900 text-lg">개인정보 수집 및 이용에 동의합니다.</span>
            </div>
            <span className="text-gray-700 text-base font-medium mt-2 block">
              (필수) 서비스 이용을 위해 개인정보 수집에 동의해주세요.
            </span>
          </label>
          
          <div className="mt-6 flex items-center gap-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-sm px-4 py-2 h-10 border-2 border-blue-500 text-blue-700 hover:bg-blue-50 hover:border-blue-600 rounded-lg font-semibold shadow-sm transition-all duration-200"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  상세 내용 보기
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[85vh] p-0 z-[100]">
                <DialogHeader className="px-8 py-6 border-b bg-white">
                  <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    {privacyPolicy.title}
                  </DialogTitle>
                </DialogHeader>
                <ScrollArea className="px-8 py-6 h-96 bg-white">
                  <div className="space-y-8">
                    {privacyPolicy.sections.map((section, index) => (
                      <div key={index} className="space-y-4">
                        <h3 className="font-bold text-gray-900 text-xl flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-600" />
                          {section.title}
                        </h3>
                        <div className="space-y-3">
                          {section.content.map((item, itemIndex) => (
                            <p key={itemIndex} className="text-gray-800 text-base leading-relaxed pl-6 font-medium">
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-10 p-6 bg-amber-50 border-2 border-amber-300 rounded-xl">
                      <div className="flex items-start gap-4">
                        <Lock className="w-6 h-6 text-amber-700 mt-1 flex-shrink-0" />
                        <div className="space-y-3">
                          {privacyPolicy.footer.map((item, index) => (
                            <p key={index} className="text-amber-900 text-base leading-relaxed font-medium">
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                <div className="px-8 py-6 border-t bg-gray-50 flex justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="px-8 py-3 text-base font-semibold border-2 border-gray-300 hover:border-gray-400"
                  >
                    닫기
                  </Button>
                  <Button
                    onClick={() => {
                      if (onCheckedChange && typeof onCheckedChange === 'function') {
                        onCheckedChange(true);
                      }
                      setIsDialogOpen(false);
                    }}
                    className="px-8 py-3 text-base font-semibold bg-blue-600 hover:bg-blue-700 shadow-md"
                  >
                    동의하고 닫기
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <div className="text-sm text-gray-700 flex items-center gap-2 font-medium">
              <Shield className="w-4 h-4 text-blue-600" />
              개인정보보호법 준수
            </div>
          </div>
        </div>
      </div>
      
      {/* 동의 상태 표시 */}
      {checked && (
        <div className="mt-6 p-4 bg-green-50 border-2 border-green-300 rounded-xl flex items-center gap-4">
          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-green-800 text-base font-semibold">
            개인정보 수집 및 이용에 동의하셨습니다.
          </span>
        </div>
      )}
    </div>
  );
} 