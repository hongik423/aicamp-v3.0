'use client';

import { useEffect } from 'react';
import { useBannerStore } from '@/lib/stores/bannerStore';

interface AutoShowBannersProps {
  forceVisible?: boolean;
}

export default function AutoShowBanners({ forceVisible = false }: AutoShowBannersProps) {
  const { show } = useBannerStore();

  useEffect(() => {
    // 상단 배너 비활성화 - 네비바를 가리는 문제 해결
    // if (forceVisible) {
    //   show(
    //     '🚀 AI CAMP - 기업 맞춤형 AI 자동화 솔루션',
    //     {
    //       subMessage: '무료 AI 역량진단부터 전문 컨설팅까지 원스톱 서비스 제공 | 닫기 버튼을 누르기 전까지 계속 표시됩니다',
    //       variant: 'info',
    //       persistent: true
    //     }
    //   );
    // }
  }, [forceVisible, show]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
}