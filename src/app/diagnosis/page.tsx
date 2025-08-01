'use client';

import React from 'react';
import Header from '@/components/layout/header';
import { FreeDiagnosisForm } from '@/features/free-diagnosis/components/FreeDiagnosisForm';
import { HeroSection } from '@/features/free-diagnosis/components/HeroSection';
import { ValueProposition } from '@/features/free-diagnosis/components/ValueProposition';
import { CTASection } from '@/features/free-diagnosis/components/CTASection';

/**
 * AICAMP 무료 AI 경영진단 메인 페이지
 * PRD 기반 완전 재구축 버전
 */
export default function DiagnosisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />
      
      {/* 히어로 섹션 */}
      <HeroSection />

      {/* 핵심 가치 제안 */}
      <ValueProposition />

      {/* 메인 진단 신청 폼 */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <FreeDiagnosisForm />
        </div>
      </section>

      {/* CTA 섹션 */}
      <CTASection />
    </div>
  );
} 