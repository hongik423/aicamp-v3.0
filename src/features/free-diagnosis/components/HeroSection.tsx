'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            AI가 분석하는<br />
            <span className="text-gray-600">최고수준 경영진단</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed">
            28년 전문가 경험과 최신 AI 기술의 만남<br />
            단 5분 신청으로 받는 맞춤형 경영진단 보고서
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 text-lg font-semibold"
              onClick={() => {
                const formSection = document.getElementById('diagnosis-form');
                formSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              무료 진단 시작하기
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white px-8 py-4 text-lg font-semibold"
              asChild
            >
              <Link href="/diagnosis/overview">서비스 살펴보기</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};