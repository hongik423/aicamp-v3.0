"use client";
import { useEffect } from 'react';
import Real45QuestionForm from '@/features/ai-diagnosis/components/Real45QuestionForm';
import { hideAllBanners } from '@/components/layout/BannerController';

export default function AIDiagnosisPage() {
  useEffect(() => {
    // AI역량진단 페이지에 접근할 때 모든 배너 숨기기
    hideAllBanners();
  }, []);

  return (
    <main className="min-h-screen relative z-[2147483649]">
      <Real45QuestionForm />
    </main>
  );
}
