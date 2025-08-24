"use client";
import { useEffect } from 'react';
import Real45QuestionForm from '@/features/ai-diagnosis/components/Real45QuestionForm';
import { hideAllBanners, disableAllBanners } from '@/components/layout/BannerController';

export default function AIDiagnosisPage() {
  useEffect(() => {
    // 페이지 스크롤 활성화
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
    document.body.style.height = 'auto';
    
    // 포커스 가능하도록 설정
    document.body.style.pointerEvents = 'auto';
    
    // 페이지 로드 시 상단으로 스크롤
    window.scrollTo(0, 0);
    
    // 🎯 사용자가 신청서 작성에 집중할 수 있도록 모든 배너 숨기기
    hideAllBanners();
    console.log('AI역량진단 페이지 로드 - 배너 숨김 처리 완료');
    
    console.log('AI역량진단 페이지 로드 - 스크롤 활성화');
    
    // 컴포넌트 언마운트 시 정리
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.height = '';
      document.body.style.pointerEvents = '';
    };
  }, []);

  return (
    <main className="min-h-screen relative z-10 overflow-auto">
      <Real45QuestionForm />
    </main>
  );
}
