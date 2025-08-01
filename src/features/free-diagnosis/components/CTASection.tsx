'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          AICAMP와 함께 성장하세요
        </h2>
        <p className="text-gray-600 mb-6">
          진단 후 전문가 상담을 통해 구체적인 실행 계획을 수립하세요
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white"
            asChild
          >
            <Link href="/consultation" className="flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4" />
              전문가 상담 신청
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};