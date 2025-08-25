'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
  // 배너 설정을 상수로 분리하여 중복 제거 (스마트 표시 모드)
  const BANNER_CONFIG = [
    {
      id: 'content-guide',
      component: AICampContentGuide,
      priority: 1,
      delay: 3000, // 3초 지연으로 더 증가
      isActive: true,
      isVisible: false,
      autoHide: true,
      showOnce: true // 한 번만 표시로 변경
    },
    {
      id: 'book-promotion',
      component: BookPromotionBanner,
      priority: 2,
      delay: 5000, // 5초 지연으로 증가
      duration: 10000, // 10초간 표시로 증가
      isActive: true,
      isVisible: false,
      autoHide: true,
      showOnce: true // 한 번만 표시
    },
    {
      id: 'n8n-curriculum',
      component: N8nCurriculumBanner,
      priority: 3,
      delay: 7000, // 7초 지연으로 증가
      isActive: true,
      isVisible: false,
      autoHide: true,
      showOnce: true // 한 번만 표시
    }
  ];

  const [banners, setBanners] = useState<BannerState[]>(BANNER_CONFIG);

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isSystemActive, setIsSystemActive] = useState(false);

  // 배너 시스템 초기화
  useEffect(() => {
    const initTimer = setTimeout(() => {
      setIsSystemActive(true);
      console.log('🚀 배너 시스템 활성화 - 스마트 제어 시스템 준비 완료');
    }, 100); // 빠른 초기화

    // 전역 배너 숨김 이벤트 리스너 강화
    const handleHideAllBanners = () => {
      setBanners(prev => prev.map(banner => ({ ...banner, isVisible: false })));
      // localStorage에 모든 배너 숨김 상태 저장
      localStorage.setItem('all-banners-hidden', 'true');
      localStorage.setItem('banner-hide-timestamp', Date.now().toString());
      console.log('🎯 전역 배너 숨김 이벤트 수신 - 모든 배너 숨김 처리 및 상태 저장');
    };

    // 즉시 닫힘 이벤트 리스너 추가
    const handleImmediateClose = () => {
      setBanners(prev => prev.map(banner => ({ ...banner, isVisible: false, isActive: false })));
      localStorage.setItem('banners-disabled-for-session', 'true');
      console.log('⚡ 즉시 닫힘 이벤트 수신 - 모든 배너 완전 비활성화');
    };

    window.addEventListener('hideAllBanners', handleHideAllBanners);
    window.addEventListener('immediateCloseBanners', handleImmediateClose);

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('hideAllBanners', handleHideAllBanners);
      window.removeEventListener('immediateCloseBanners', handleImmediateClose);
    };
  }, []);

  // 순차적 배너 활성화 (스마트 표시 모드)
  useEffect(() => {
    if (!isSystemActive) return;

    // 세션 기반 배너 비활성화 확인
    const bannersDisabled = localStorage.getItem('banners-disabled-for-session') === 'true';
    if (bannersDisabled) {
      console.log('🚫 세션 동안 배너 비활성화됨 - 모든 배너 건너뛰기');
      return;
    }

    // 최근 배너 숨김 시간 확인 (30분 내 숨김 시 재표시 안함)
    const hideTimestamp = localStorage.getItem('banner-hide-timestamp');
    if (hideTimestamp) {
      const timeDiff = Date.now() - parseInt(hideTimestamp);
      const thirtyMinutes = 30 * 60 * 1000;
      if (timeDiff < thirtyMinutes) {
        console.log('⏰ 최근 30분 내 배너 숨김 - 재표시 안함');
        return;
      }
    }

    // showOnce 로직을 적용한 배너 필터링
    const activeBanners = BANNER_CONFIG.filter(banner => {
      if (!banner.isActive) return false;
      
      // showOnce가 true인 배너는 localStorage에서 확인
      if (banner.showOnce) {
        const viewedKey = `banner-${banner.id}-viewed`;
        const hasViewed = localStorage.getItem(viewedKey) === 'true';
        if (hasViewed) {
          console.log(`⏭️ ${banner.id} 배너는 이미 표시됨 - 건너뛰기`);
          return false;
        }
      }
      
      return true;
    });

    console.log(`🎯 홍보 배너 ${activeBanners.length}개 활성화 - 스마트 표시 모드`);

    const sortedBanners = [...activeBanners].sort((a, b) => a.priority - b.priority);
    const timers: NodeJS.Timeout[] = [];
    
    // 순차적 배너 표시 (우선순위 기반)
    sortedBanners.forEach((banner, index) => {
      const sequentialDelay = banner.delay + (index * 1000); // 각 배너마다 1초씩 지연 (더욱 여유롭게)
      
      const timer = setTimeout(() => {
        setBanners(prev => prev.map(b => 
          b.id === banner.id 
            ? { ...b, isActive: true, isVisible: true }
            : b
        ));
        
        console.log(`📢 ${banner.id} 배너 활성화 (우선순위: ${banner.priority}, 순서: ${index + 1}) - 스마트 표시 모드`);
        
        // showOnce 배너는 표시 후 localStorage에 기록
        if (banner.showOnce) {
          const viewedKey = `banner-${banner.id}-viewed`;
          localStorage.setItem(viewedKey, 'true');
          console.log(`💾 ${banner.id} 배너 표시 기록 저장`);
        }
        
        // 지속 시간이 설정된 배너는 자동으로 비활성화
        if (banner.duration) {
          const durationTimer = setTimeout(() => {
            setBanners(prev => prev.map(b => 
              b.id === banner.id 
                ? { ...b, isVisible: false }
                : b
            ));
            console.log(`⏰ ${banner.id} 배너 자동 비활성화 (${banner.duration}ms 후)`);
          }, banner.duration);
          timers.push(durationTimer);
        }
      }, sequentialDelay);
      
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

  const hideBannerLocal = (id: string) => {
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
    setGlobalHideBanner(hideBannerLocal);
  }, []);

  // 배너 표시 기록 초기화 함수 (안전한 처리)
  const resetBannerHistory = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('shown-banners');
        console.log('🔄 배너 표시 기록 초기화 완료 - 매번 표시 모드');
        // 페이지 새로고침으로 배너 시스템 재시작
        window.location.reload();
      }
    } catch (error) {
      console.warn('배너 기록 초기화 실패:', error);
    }
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
      <AnimatePresence mode="wait">
        {banners.map(banner => {
          const Component = banner.component;
          return banner.isActive && banner.isVisible ? (
            <motion.div 
              key={banner.id} 
              className={`banner-${banner.id}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ 
                duration: 0.4, 
                ease: "easeOut",
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              <Component 
                forceVisible={banner.isVisible} 
                onHide={() => hideBannerLocal(banner.id)}
              />
            </motion.div>
          ) : null;
        })}
      </AnimatePresence>
      
      {/* 개발용 배너 상태 표시 (프로덕션에서는 숨김) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/90 text-white p-3 rounded-lg text-xs z-[99999] shadow-xl border border-gray-600">
          <div className="font-bold mb-2 text-blue-400">🎯 스마트 배너 제어 시스템</div>
          <div className="mb-2">시스템: <span className={isSystemActive ? 'text-green-400' : 'text-red-400'}>{isSystemActive ? '활성' : '비활성'}</span></div>
          <div className="space-y-1">
            {banners.map(banner => (
              <div key={banner.id} className={`flex justify-between ${banner.isVisible ? 'text-green-400' : 'text-gray-400'}`}>
                <span>{banner.priority}. {banner.id}</span>
                <span className="ml-2">
                  {banner.isVisible ? '🟢 표시' : '⚫ 숨김'}
                  {banner.showOnce ? ' 🔒' : ''}
                </span>
              </div>
            ))}
          </div>
          <div className="text-xs mt-2 pt-2 border-t border-gray-600 opacity-70">
            <div>⌨️ 단축키:</div>
            <div>Ctrl+Shift+1~3: 개별 표시</div>
            <div>Ctrl+Shift+0: 모두 숨김</div>
            <div>Ctrl+Shift+R: 기록 초기화</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerController;
