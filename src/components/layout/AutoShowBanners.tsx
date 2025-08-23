'use client';

import { useEffect } from 'react';
import { useBannerStore } from '@/lib/stores/bannerStore';

export default function AutoShowBanners() {
  const { show } = useBannerStore();

  useEffect(() => {
    // 1순위: AICAMP 서비스 소개 배너 즉시 표시 (지속 노출)
    const timer = setTimeout(() => {
      show(
        '🚀 AI CAMP - 기업 맞춤형 AI 자동화 솔루션',
        {
          subMessage: '무료 AI 역량진단부터 전문 컨설팅까지 원스톱 서비스 제공 | 닫기 버튼을 누르기 전까지 계속 표시됩니다',
          variant: 'info',
          persistent: true // 지속 노출 플래그
        }
      );
    }, 50); // 즉시 표시

    return () => clearTimeout(timer);
  }, [show]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
}
