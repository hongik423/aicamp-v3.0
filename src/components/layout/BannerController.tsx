'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import AICampContentGuide from './AICampContentGuide';
import BookPromotionBanner from './BookPromotionBanner';
import N8nCurriculumBanner from './N8nCurriculumBanner';
import AutoShowBanners from './AutoShowBanners';

interface BannerState {
  id: string;
  component: React.ComponentType;
  priority: number;
  delay: number;
  duration?: number;
  isActive: boolean;
  isVisible: boolean;
}

// 배너 제어 함수들을 전역으로 export
let globalHideAllBanners: (() => void) | null = null;
let globalDisableAllBanners: (() => void) | null = null;

export const setGlobalHideAllBanners = (fn: () => void) => {
  globalHideAllBanners = fn;
};

export const setGlobalDisableAllBanners = (fn: () => void) => {
  globalDisableAllBanners = fn;
};

export const hideAllBanners = () => {
  if (globalHideAllBanners) {
    globalHideAllBanners();
  }
};

export const disableAllBanners = () => {
  if (globalDisableAllBanners) {
    globalDisableAllBanners();
  }
};

const BannerController: React.FC = () => {
  const [banners, setBanners] = useState<BannerState[]>([
    {
      id: 'auto-show',
      component: AutoShowBanners,
      priority: 1,
      delay: 100, // 0.1초
      isActive: true, // 상단 배너 활성화
      isVisible: true // 즉시 표시
    },
    {
      id: 'content-guide',
      component: AICampContentGuide,
      priority: 2,
      delay: 800, // 0.8초
      isActive: true,
      isVisible: false
    },
    {
      id: 'book-promotion',
      component: BookPromotionBanner,
      priority: 3,
      delay: 2000, // 2초
      duration: 8000, // 8초간 표시
      isActive: true,
      isVisible: false
    },
    {
      id: 'n8n-curriculum',
      component: N8nCurriculumBanner,
      priority: 4,
      delay: 3500, // 3.5초
      isActive: true,
      isVisible: false
    }
  ]);

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isSystemActive, setIsSystemActive] = useState(false);

  // 배너 시스템 초기화
  useEffect(() => {
    const initTimer = setTimeout(() => {
      setIsSystemActive(true);
      console.log('🚀 배너 시스템 활성화');
    }, 100); // 500ms에서 100ms로 단축

    return () => clearTimeout(initTimer);
  }, []);

  // 순차적 배너 활성화
  useEffect(() => {
    if (!isSystemActive) return;

    const sortedBanners = [...banners].sort((a, b) => a.priority - b.priority);
    
    sortedBanners.forEach((banner, index) => {
      const timer = setTimeout(() => {
        setBanners(prev => prev.map(b => 
          b.id === banner.id 
            ? { ...b, isActive: true, isVisible: true }
            : b
        ));
        
        console.log(`📢 ${banner.id} 배너 활성화 (우선순위: ${banner.priority})`);
        
        // 지속 시간이 설정된 배너는 자동으로 비활성화
        if (banner.duration) {
          setTimeout(() => {
            setBanners(prev => prev.map(b => 
              b.id === banner.id 
                ? { ...b, isVisible: false }
                : b
            ));
            console.log(`⏰ ${banner.id} 배너 자동 비활성화`);
          }, banner.duration);
        }
      }, banner.delay);

      return () => clearTimeout(timer);
    });
  }, [isSystemActive, banners]);

  // 배너 수동 제어 함수들
  const showBanner = (id: string) => {
    setBanners(prev => prev.map(b => 
      b.id === id ? { ...b, isVisible: true } : b
    ));
  };

  const hideBanner = (id: string) => {
    setBanners(prev => prev.map(b => 
      b.id === id ? { ...b, isVisible: false } : b
    ));
  };

  const hideAllBanners = () => {
    setBanners(prev => prev.map(b => ({ ...b, isVisible: false })));
    console.log('🎯 모든 배너 숨김 처리 완료');
  };

  const disableAllBanners = () => {
    setBanners(prev => prev.map(b => ({ ...b, isActive: false, isVisible: false })));
    console.log('🚫 모든 배너 비활성화 완료');
  };

  // 전역 함수 설정
  useEffect(() => {
    setGlobalHideAllBanners(hideAllBanners);
    setGlobalDisableAllBanners(disableAllBanners);
  }, []);

  // 키보드 단축키 (개발용)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey) {
        switch (e.key) {
          case '1':
            showBanner('auto-show');
            break;
          case '2':
            showBanner('content-guide');
            break;
          case '3':
            showBanner('book-promotion');
            break;
          case '4':
            showBanner('n8n-curriculum');
            break;
          case '0':
            hideAllBanners();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isSystemActive) {
    return null;
  }

  return (
    <div className="banner-controller">
      <AnimatePresence mode="sync">
        {banners.map(banner => {
          const Component = banner.component;
          return banner.isActive ? (
            <div key={banner.id} className={`banner-${banner.id}`}>
              <Component forceVisible={banner.isVisible} />
            </div>
          ) : null;
        })}
      </AnimatePresence>
      
      {/* 개발용 배너 상태 표시 (프로덕션에서는 숨김) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs z-[99999]">
          <div>배너 시스템: {isSystemActive ? '활성' : '비활성'}</div>
          {banners.map(banner => (
            <div key={banner.id} className={banner.isVisible ? 'text-green-400' : 'text-gray-400'}>
              {banner.priority}. {banner.id}: {banner.isVisible ? '표시' : '숨김'}
            </div>
          ))}
          <div className="text-xs mt-1 opacity-60">
            Ctrl+Shift+1~4: 배너 표시, Ctrl+Shift+0: 모두 숨김
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerController;
