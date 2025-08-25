'use client';

import { useEffect, useCallback, useRef } from 'react';

interface ScrollOptimizationOptions {
  enableSmoothScrolling?: boolean;
  enableMomentumScrolling?: boolean;
  enableScrollToTop?: boolean;
  throttleDelay?: number;
}

export function useScrollOptimization(options: ScrollOptimizationOptions = {}) {
  const {
    enableSmoothScrolling = true,
    enableMomentumScrolling = true,
    enableScrollToTop = true,
    throttleDelay = 16, // 60fps
  } = options;

  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const isScrollingRef = useRef(false);

  // 스크롤 성능 최적화
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // CSS 스크롤 최적화 적용
    const applyScrollOptimizations = () => {
      const style = document.createElement('style');
      style.textContent = `
        /* 모바일 스크롤 최적화 */
        * {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: ${enableSmoothScrolling ? 'smooth' : 'auto'};
        }
        
        /* 모바일에서 부드러운 스크롤 */
        @media (max-width: 768px) {
          body {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
          }
          
          /* 스크롤바 숨기기 (모바일) */
          ::-webkit-scrollbar {
            width: 0px;
            background: transparent;
          }
        }
        
        /* GPU 가속 활성화 */
        .scroll-optimized {
          transform: translateZ(0);
          will-change: scroll-position;
          contain: layout style paint;
        }
        
        /* 스크롤 중 애니메이션 최적화 */
        .scrolling * {
          pointer-events: none;
          animation-play-state: paused;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    };

    const cleanup = applyScrollOptimizations();

    // 스크롤 이벤트 최적화
    const handleScroll = () => {
      if (!isScrollingRef.current) {
        document.body.classList.add('scrolling');
        isScrollingRef.current = true;
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        document.body.classList.remove('scrolling');
        isScrollingRef.current = false;
      }, 150);
    };

    // 쓰로틀된 스크롤 이벤트 리스너
    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });

    return () => {
      cleanup();
      window.removeEventListener('scroll', throttledScrollHandler);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [enableSmoothScrolling, throttleDelay]);

  // 부드러운 스크롤 함수
  const scrollToElement = useCallback((element: HTMLElement | string, offset = 0) => {
    const target = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement
      : element;
    
    if (!target) return;

    const targetPosition = target.offsetTop - offset;
    
    if (enableSmoothScrolling) {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, targetPosition);
    }
  }, [enableSmoothScrolling]);

  // 맨 위로 스크롤
  const scrollToTop = useCallback(() => {
    if (enableSmoothScrolling) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [enableSmoothScrolling]);

  // 스크롤 위치 저장/복원
  const saveScrollPosition = useCallback((key: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`scroll-${key}`, window.scrollY.toString());
    }
  }, []);

  const restoreScrollPosition = useCallback((key: string) => {
    if (typeof window !== 'undefined') {
      const savedPosition = sessionStorage.getItem(`scroll-${key}`);
      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition, 10));
      }
    }
  }, []);

  return {
    scrollToElement,
    scrollToTop,
    saveScrollPosition,
    restoreScrollPosition,
  };
}
