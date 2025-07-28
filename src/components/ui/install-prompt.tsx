'use client';

import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    setIsClient(true);
    
    if (typeof window !== 'undefined') {
      // iOS 감지
      const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
      setIsIOS(ios);

      // Standalone 모드 감지 (이미 설치된 상태)
      const standalone = window.matchMedia('(display-mode: standalone)').matches ||
                       (window.navigator as any).standalone ||
                       document.referrer.includes('android-app://');
      setIsStandalone(standalone);

      // localStorage에서 dismiss 상태 확인 (클라이언트 사이드에서만)
      try {
        const dismissed = localStorage.getItem('aicamp-install-dismissed');
        setIsDismissed(dismissed === 'true');
      } catch (error) {
        console.warn('localStorage access failed:', error);
        setIsDismissed(false);
      }
    }

    // PWA 설치 프롬프트 이벤트 리스너
    const handleBeforeInstallPrompt = (e: Event) => {
      // 조건부로만 preventDefault 호출
      const shouldShowPrompt = !isDismissed && !isStandalone;
      
      if (shouldShowPrompt) {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        
        // 사용자가 이전에 닫았는지 확인
        if (typeof window !== 'undefined') {
          const currentStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                                   (window.navigator as any).standalone ||
                                   document.referrer.includes('android-app://');
          
          if (!currentStandalone) {
            setShowInstallPrompt(true);
          }
        }
      } else {
        // 배너를 표시하지 않을 경우 기본 동작 허용
        console.log('PWA 설치 배너: 조건에 맞지 않아 기본 동작 허용');
      }
    };

    // App installed 이벤트 리스너
    const handleAppInstalled = () => {
      console.log('AICAMP PWA was installed');
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      setIsDismissed(false);
      
      // localStorage 정리 (클라이언트 사이드에서만)
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('aicamp-install-dismissed');
        } catch (error) {
          console.warn('localStorage cleanup failed:', error);
        }
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isDismissed]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } catch (error) {
      console.error('Error during PWA installation:', error);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    setIsDismissed(true);
    
    // localStorage에 저장 (클라이언트 사이드에서만)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('aicamp-install-dismissed', 'true');
      } catch (error) {
        console.warn('localStorage save failed:', error);
      }
    }
  };

  // 클라이언트 사이드가 아니거나 이미 설치되었거나 standalone 모드라면 표시하지 않음
  if (!isClient || isStandalone || isDismissed || (!showInstallPrompt && !isIOS)) {
    return null;
  }

  // iOS용 설치 안내
  if (isIOS && !isStandalone) {
    return (
      <Card className="fixed bottom-4 left-4 right-4 z-50 p-4 bg-white dark:bg-aicamp-navy-dark border border-aicamp-navy/20 dark:border-aicamp-purple/30 shadow-aicamp-card dark:shadow-aicamp-card-dark">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-aicamp-navy/10 dark:bg-aicamp-purple/20 rounded-full flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-aicamp-navy dark:text-aicamp-purple" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
              AICAMP을 홈 화면에 추가하세요
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
              Safari 하단의 <strong>공유</strong> 버튼을 누른 후 <strong>"홈 화면에 추가"</strong>를 선택하세요.
            </p>
            <div className="flex items-center gap-2 text-xs text-aicamp-navy dark:text-aicamp-purple">
              <Download className="w-3 h-3" />
              <span>빠른 접근, 오프라인 사용 가능</span>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
            aria-label="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </Card>
    );
  }

  // Android/Desktop용 설치 프롬프트
  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 p-4 bg-white dark:bg-aicamp-navy-dark border border-aicamp-navy/20 dark:border-aicamp-purple/30 shadow-aicamp-card dark:shadow-aicamp-card-dark">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-aicamp-navy to-aicamp-purple rounded-full flex items-center justify-center">
          <Monitor className="w-5 h-5 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
            앱 설치 가능
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
            홈화면에 추가하여 빠르게 접근하세요
          </p>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleInstallClick}
              size="sm"
              className="h-8 px-3 text-xs bg-gradient-to-r from-aicamp-navy to-aicamp-purple hover:from-aicamp-navy-dark hover:to-aicamp-purple text-white"
            >
              <Download className="w-3 h-3 mr-1" />
              설치하기
            </Button>
            <Button
              onClick={handleDismiss}
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              나중에
            </Button>
          </div>
        </div>
        
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          aria-label="닫기"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
}

// 서비스 워커 등록 훅
export function useServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('AICAMP Service Worker registered:', registration.scope);
          
          // 업데이트 확인
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // 새 버전 사용 가능 알림
                  console.log('New AICAMP version available');
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('AICAMP Service Worker registration failed:', error);
        });
    }
  }, []);
} 