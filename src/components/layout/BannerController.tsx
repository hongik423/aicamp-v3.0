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
  
  // 🎯 세션 동안 배너 완전 비활성화 (네비게이션 클릭 시에도 적용)
  sessionStorage.setItem('banners-hidden-for-focus', 'true');
  sessionStorage.setItem('banners-disabled-for-session', 'true');
  sessionStorage.setItem('banner-hide-timestamp', Date.now().toString());
  
  console.log('🎯 사용자 집중 모드 활성화 - 모든 배너 숨김 (세션 동안 유지)');
};

export const disableAllBanners = () => {
  if (globalDisableAllBanners) {
    globalDisableAllBanners();
  }
  
  // 🎯 세션 동안 배너 완전 비활성화 (네비게이션 클릭 포함)
  sessionStorage.setItem('banners-disabled-for-session', 'true');
  sessionStorage.setItem('banners-hidden-for-focus', 'true');
  sessionStorage.setItem('banner-hide-timestamp', Date.now().toString());
  
  console.log('🚫 배너 시스템 완전 비활성화 - 사용자 집중 모드 (네비게이션 클릭 포함)');
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
      showOnce: false // 🎯 재접속 시 다시 표시되도록 변경
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
      showOnce: false // 🎯 재접속 시 다시 표시되도록 변경
    },
    {
      id: 'n8n-curriculum',
      component: N8nCurriculumBanner,
      priority: 3,
      delay: 7000, // 7초 지연으로 증가
      isActive: true,
      isVisible: false,
      autoHide: true,
      showOnce: false // 🎯 재접속 시 다시 표시되도록 변경
    }
  ];

  const [banners, setBanners] = useState<BannerState[]>(BANNER_CONFIG);

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isSystemActive, setIsSystemActive] = useState(false);

  // 배너 시스템 초기화
  useEffect(() => {
    const initTimer = setTimeout(() => {
      setIsSystemActive(true);
      
      // 🎯 도메인 재접속 감지 및 배너 복구 시스템
      const isNewSession = !sessionStorage.getItem('aicamp-session-started');
      if (isNewSession) {
        // 🌟 새 세션 시작 - 모든 집중 모드 상태 초기화
        sessionStorage.removeItem('banners-hidden-for-focus');
        sessionStorage.removeItem('banners-disabled-for-session');
        sessionStorage.removeItem('banner-hide-timestamp');
        
        // localStorage의 배너 관련 기록도 초기화 (재접속 시 배너 복구)
        localStorage.removeItem('banner-content-guide-viewed');
        localStorage.removeItem('banner-book-promotion-viewed');
        localStorage.removeItem('banner-n8n-curriculum-viewed');
        localStorage.removeItem('banners-disabled-for-session');
        localStorage.removeItem('banner-hide-timestamp');
        localStorage.removeItem('all-banners-hidden');
        
        sessionStorage.setItem('aicamp-session-started', 'true');
        console.log('🌟 새 세션 시작 - 배너 시스템 완전 복구 (네비게이션 클릭 기록 초기화 포함)');
      }
      
      console.log('🚀 배너 시스템 활성화 - 스마트 제어 시스템 준비 완료');
    }, 100); // 빠른 초기화

    // 🎯 전역 배너 숨김 이벤트 리스너 강화 - 네비게이션 클릭 포함
    const handleHideAllBanners = () => {
      setBanners(prev => prev.map(banner => ({ ...banner, isVisible: false })));
      
      // 🎯 세션 기반 완전 비활성화 (네비게이션 클릭 시에도 적용)
      sessionStorage.setItem('banners-hidden-for-focus', 'true');
      sessionStorage.setItem('banners-disabled-for-session', 'true');
      sessionStorage.setItem('banner-hide-timestamp', Date.now().toString());
      
      // 레거시 호환성을 위해 localStorage도 설정
      localStorage.setItem('all-banners-hidden', 'true');
      localStorage.setItem('banner-hide-timestamp', Date.now().toString());
      
      console.log('🎯 전역 배너 숨김 이벤트 수신 - 세션 동안 완전 비활성화 (네비게이션 클릭 포함)');
    };

    // 🎯 즉시 닫힘 이벤트 리스너 - 네비게이션 클릭 포함
    const handleImmediateClose = () => {
      setBanners(prev => prev.map(banner => ({ ...banner, isVisible: false, isActive: false })));
      
      // 🎯 세션 기반 완전 비활성화
      sessionStorage.setItem('banners-disabled-for-session', 'true');
      sessionStorage.setItem('banners-hidden-for-focus', 'true');
      sessionStorage.setItem('banner-hide-timestamp', Date.now().toString());
      
      // 레거시 호환성
      localStorage.setItem('banners-disabled-for-session', 'true');
      
      console.log('⚡ 즉시 닫힘 이벤트 수신 - 세션 동안 완전 비활성화 (네비게이션 클릭 포함)');
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

    // 🎯 세션 기반 사용자 집중 모드 확인 (신청서 작성 중)
    const bannersHiddenForFocus = sessionStorage.getItem('banners-hidden-for-focus') === 'true';
    if (bannersHiddenForFocus) {
      console.log('🎯 사용자 집중 모드 활성 - 신청서 작성 중이므로 모든 배너 숨김');
      return;
    }

    // 🎯 세션 기반 배너 비활성화 확인 (네비게이션 클릭 포함)
    const bannersDisabledSession = sessionStorage.getItem('banners-disabled-for-session') === 'true';
    if (bannersDisabledSession) {
      console.log('🚫 세션 동안 배너 비활성화됨 - 네비게이션 클릭으로 인한 사용자 집중 모드');
      return;
    }

    // 🎯 추가 세션 체크 - 배너 숨김 타임스탬프 확인
    const sessionHideTimestamp = sessionStorage.getItem('banner-hide-timestamp');
    if (sessionHideTimestamp) {
      console.log('🚫 세션 내 배너 숨김 기록 존재 - 재접속까지 배너 비활성화 유지');
      return;
    }

    // 🎯 새 세션 감지는 초기화에서 이미 처리됨

    // 🎯 모든 배너를 활성 상태로 설정 (showOnce 로직 제거)
    const activeBanners = BANNER_CONFIG.filter(banner => {
      if (!banner.isActive) return false;
      
      // 🎯 showOnce 로직 완전 제거 - 재접속 시마다 배너 표시
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
        
        console.log(`🎬 ${banner.id} 배너 애니메이션 활성화 (우선순위: ${banner.priority}, 순서: ${index + 1}) - 도메인 재접속 복구 모드`);
        
        // 🎯 showOnce 로직 제거 - 재접속 시마다 배너 표시되도록 개선
        console.log(`✨ ${banner.id} 배너 표시 완료 - 재접속 시 다시 표시 가능`);
        
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
