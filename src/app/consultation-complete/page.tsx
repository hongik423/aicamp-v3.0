'use client';

import React from 'react';
import Header from '@/components/layout/header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Mail, Phone, Home } from 'lucide-react';
import Link from 'next/link';

/**
 * 상담 신청 완료 페이지
 */
export default function ConsultationCompletePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />
      
      <main className="min-h-screen flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-auto px-4">
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                상담 신청이 완료되었습니다
              </h1>
              
              <p className="text-gray-600 mb-6">
                접수 확인 이메일을 발송했습니다.<br />
                24시간 내에 담당자가 연락드리겠습니다.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-800 mb-3">다음 단계</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>이메일 확인: 접수 확인 메일을 확인해주세요</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>전화 상담: 영업일 기준 24시간 내 연락드립니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>상담 준비: 구체적인 질문사항을 준비해주세요</span>
                  </li>
                </ul>
              </div>
              
              <div className="border-t pt-6">
                <p className="text-sm text-gray-500 mb-4">
                  문의사항이 있으시면 언제든지 연락주세요
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    contact@aicamp.club
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    1588-0000
                  </span>
                </div>
              </div>
              
              <Button 
                asChild
                className="w-full mt-6 bg-gray-600 hover:bg-gray-700"
              >
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  홈으로 돌아가기
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}