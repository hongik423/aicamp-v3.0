'use client';

import { useEffect } from 'react';
import { useBannerStore } from '@/lib/stores/bannerStore';

interface AutoShowBannersProps {
  forceVisible?: boolean;
}

export default function AutoShowBanners({ forceVisible = false }: AutoShowBannersProps) {
  const { show } = useBannerStore();

  useEffect(() => {
    // 상단 배너 활성화
    if (forceVisible) {
      show(
        '🎓 AI CAMP - 기업 맞춤형 AI 역량진단 시스템',
        {
          subMessage: '무료 AI 역량진단부터 전문 컨설팅까지 원스톱 서비스 제공 | 지금 바로 진단을 시작하세요!',
          variant: 'info',
          persistent: true
        }
      );
    }
  }, [forceVisible, show]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
}