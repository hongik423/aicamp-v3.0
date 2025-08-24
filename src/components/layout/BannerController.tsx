'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import AICampContentGuide from './AICampContentGuide';
import BookPromotionBanner from './BookPromotionBanner';
import N8nCurriculumBanner from './N8nCurriculumBanner';

interface BannerState {
  id: string;
  component: React.ComponentType<any>;
  priority: number;
  delay: number;
  duration?: number;
  isActive: boolean;
  isVisible: boolean;
  autoHide?: boolean; // 자동 숨김 여부
  showOnce?: boolean; // 한 번만 표시 여부
}

// 배너 제어 함수들을 전역으로 export
let globalHideAllBanners: (() => void) | null = null;
let globalDisableAllBanners: (() => void) | null = null;
let globalHideBanner: ((id: string) => void) | null = null;

export const setGlobalHideAllBanners = (fn: () => void) => {
  globalHideAllBanners = fn;
};

export const setGlobalDisableAllBanners = (fn: () => void) => {
  globalDisableAllBanners = fn;
};

export const setGlobalHideBanner = (fn: (id: string) => void) => {
  globalHideBanner = fn;
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

export const hideBanner = (id: string) => {
  if (globalHideBanner) {
    globalHideBanner(id);
  }
};

const BannerController: React.FC = () => {
  const [banners, setBanners] = useState<BannerState[]>([
    {
      id: 'content-guide',
      component: AICampContentGuide,
      priority: 1,
      delay: 800, // 0.8초 - 서비스 소개 배너
      isActive: true,
      isVisible: false,
      autoHide: true, // 자동 숨김 활성화
      showOnce: true // 한 번만 표시
    },
    {
      id: 'book-promotion',
      component: BookPromotionBanner,
      priority: 2,
      delay: 2000, // 2초 - n8n 책자 소개 배너
      duration: 8000, // 8초간 표시
      isActive: true,
      isVisible: false,
      autoHide: true, // 자동 숨김 활성화
      showOnce: false // 반복 표시 가능
    },
    {
      id: 'n8n-curriculum',
      component: N8nCurriculumBanner,
      priority: 3,
      delay: 3500, // 3.5초 - n8n 커리큘럼 배너
      isActive: true,
      isVisible: false,
      autoHide: true, // 자동 숨김 활성화
      showOnce: true // 한 번만 표시
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

  // 순차적 배너 활성화 (초기화 시 한 번만 실행)
  useEffect(() => {
    if (!isSystemActive) return;

    // localStorage에서 이미 표시된 배너 확인
    const getShownBanners = () => {
      try {
        const shown = localStorage.getItem('shown-banners');
        return shown ? JSON.parse(shown) : [];
      } catch {
        return [];
      }
    };

    const shownBanners = getShownBanners();

    // 초기 배너 설정을 기반으로 정렬
    const initialBanners = [
      {
        id: 'content-guide',
        component: AICampContentGuide,
        priority: 1,
        delay: 800,
        isActive: true,
        isVisible: false,
        autoHide: true,
        showOnce: true
      },
      {
        id: 'book-promotion',
        component: BookPromotionBanner,
        priority: 2,
        delay: 2000,
        duration: 8000,
        isActive: true,
        isVisible: false,
        autoHide: true,
        showOnce: false
      },
      {
        id: 'n8n-curriculum',
        component: N8nCurriculumBanner,
        priority: 3,
        delay: 3500,
        isActive: true,
        isVisible: false,
        autoHide: true,
        showOnce: true
      }
    ].filter(banner => {
      // showOnce가 true인 배너는 이미 표시되었으면 제외
      if (banner.showOnce && shownBanners.includes(banner.id)) {
        console.log(`🚫 ${banner.id} 배너는 이미 표시되어 제외됨`);
        return false;
      }
      return true;
    });

    const sortedBanners = [...initialBanners].sort((a, b) => a.priority - b.priority);
    const timers: NodeJS.Timeout[] = [];
    
    sortedBanners.forEach((banner, index) => {
      const timer = setTimeout(() => {
        setBanners(prev => prev.map(b => 
          b.id === banner.id 
            ? { ...b, isActive: true, isVisible: true }
            : b
        ));
        
        console.log(`📢 ${banner.id} 배너 활성화 (우선순위: ${banner.priority})`);
        
        // showOnce 배너는 localStorage에 기록
        if (banner.showOnce) {
          const shownBanners = getShownBanners();
          if (!shownBanners.includes(banner.id)) {
            shownBanners.push(banner.id);
            localStorage.setItem('shown-banners', JSON.stringify(shownBanners));
            console.log(`💾 ${banner.id} 배너 표시 기록 저장`);
          }
        }
        
        // 지속 시간이 설정된 배너는 자동으로 비활성화
        if (banner.duration) {
          const durationTimer = setTimeout(() => {
            setBanners(prev => prev.map(b => 
              b.id === banner.id 
                ? { ...b, isVisible: false }
                : b
            ));
            console.log(`⏰ ${banner.id} 배너 자동 비활성화`);
          }, banner.duration);
          timers.push(durationTimer);
        }
      }, banner.delay);
      
      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [isSystemActive]); // banners 의존성 제거

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
    setGlobalHideBanner(hideBanner);
  }, []);

  // 배너 표시 기록 초기화 함수
  const resetBannerHistory = () => {
    localStorage.removeItem('shown-banners');
    console.log('🔄 배너 표시 기록 초기화 완료');
    // 페이지 새로고침으로 배너 시스템 재시작
    window.location.reload();
  };

  // 키보드 단축키 (개발용)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey) {
        switch (e.key) {
          case '1':
            showBanner('content-guide');
            break;
          case '2':
            showBanner('book-promotion');
            break;
          case '3':
            showBanner('n8n-curriculum');
            break;
          case '0':
            hideAllBanners();
            break;
          case 'r':
          case 'R':
            resetBannerHistory();
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
              <Component 
                forceVisible={banner.isVisible} 
                onHide={() => hideBanner(banner.id)}
              />
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
            Ctrl+Shift+1~3: 배너 표시, Ctrl+Shift+0: 모두 숨김<br/>
            Ctrl+Shift+R: 배너 기록 초기화
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerController;
