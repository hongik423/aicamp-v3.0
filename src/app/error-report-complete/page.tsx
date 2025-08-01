'use client';

import React from 'react';
import Header from '@/components/layout/header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, Home } from 'lucide-react';
import Link from 'next/link';

/**
 * 오류 신고 완료 페이지
 */
export default function ErrorReportCompletePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />
      
      <main className="min-h-screen flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-auto px-4">
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-blue-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                오류 신고가 접수되었습니다
              </h1>
              
              <p className="text-gray-600 mb-6">
                소중한 의견 감사드립니다.<br />
                신속하게 확인하여 개선하겠습니다.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-gray-700 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">예상 처리 시간</span>
                </div>
                <p className="text-sm text-gray-600">
                  영업일 기준 1-3일 이내
                </p>
              </div>
              
              <div className="border-t pt-6">
                <p className="text-sm text-gray-500 mb-2">
                  처리 결과는 입력하신 이메일로 안내드립니다
                </p>
                <p className="text-sm text-gray-500">
                  추가 문의사항은 contact@aicamp.club로 보내주세요
                </p>
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