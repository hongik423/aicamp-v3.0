'use client';

import { useEffect, useState, useCallback } from 'react';

interface MobileOptimizationOptions {
  enableVirtualKeyboardFix?: boolean;
  enableScrollOptimization?: boolean;
  enableTouchFeedback?: boolean;
  enableSafeArea?: boolean;
}

export function useMobileOptimization(options: MobileOptimizationOptions = {}) {
  const {
    enableVirtualKeyboardFix = true,
    enableScrollOptimization = true,
    enableTouchFeedback = true,
    enableSafeArea = true,
  } = options;

  const [isMobile, setIsMobile] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);

  // 모바일 디바이스 감지
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isMobileDevice || isTouchDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 가상 키보드 감지 및 처리 (개선된 버전)
  useEffect(() => {
    if (!enableVirtualKeyboardFix || !isMobile) return;

    const initialViewportHeight = window.visualViewport?.height || window.innerHeight;
    setViewportHeight(initialViewportHeight);

    const handleViewportChange = () => {
      const currentHeight = window.visualViewport?.height || window.innerHeight;
      const heightDifference = initialViewportHeight - currentHeight;
      
      const isKeyboardVisible = heightDifference > 150;
      setIsKeyboardOpen(isKeyboardVisible);
      setViewportHeight(currentHeight);

      // CSS 변수 업데이트
      document.documentElement.style.setProperty(
        '--viewport-height',
        `${currentHeight}px`
      );
      
      document.documentElement.style.setProperty(
        '--keyboard-height',
        `${heightDifference}px`
      );

      // 키보드 상태에 따른 클래스 추가/제거
      if (isKeyboardVisible) {
        document.body.classList.add('keyboard-open');
        // 활성 입력 필드를 뷰포트 중앙으로 스크롤
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
          setTimeout(() => {
            activeElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            });
          }, 300);
        }
      } else {
        document.body.classList.remove('keyboard-open');
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
      return () => window.visualViewport?.removeEventListener('resize', handleViewportChange);
    }
  }, [enableVirtualKeyboardFix, isMobile]);

  return {
    isMobile,
    isKeyboardOpen,
    viewportHeight,
  };
}