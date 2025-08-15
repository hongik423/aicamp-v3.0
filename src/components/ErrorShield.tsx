'use client';

import React, { useEffect, useState } from 'react';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';

interface ErrorShieldProps {
  showStatus?: boolean;
}

// 🛡️ 이교장의AI역량진단보고서 오류 차단 시스템 - 프론트엔드 컴포넌트
export default function ErrorShield({ showStatus = false }: ErrorShieldProps) {
  const [shieldStatus, setShieldStatus] = useState<'active' | 'inactive' | 'error'>('inactive');
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    // 🛡️ 전역 오류 핸들러 설치
    const handleError = (event: ErrorEvent) => {
      const error = event.error || event.message;
      const isBlocked = blockKnownErrors(error);
      
      if (isBlocked) {
        setErrorCount(prev => prev + 1);
        event.preventDefault(); // 오류 전파 차단
        return false;
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason;
      const isBlocked = blockKnownErrors(error);
      
      if (isBlocked) {
        setErrorCount(prev => prev + 1);
        event.preventDefault(); // 오류 전파 차단
      }
    };

    // 🛡️ 알려진 오류 패턴 차단
    const blockKnownErrors = (error: any): boolean => {
      const errorString = String(error);
      
      const blockedPatterns = [
        'The message port closed before a response was received',
        'Unchecked runtime.lastError',
        'chrome-extension://',
        'moz-extension://',
        'safari-extension://',
        'Failed to load resource: the server responded with a status of 401',
        'Manifest fetch',
        'Service Worker registration failed'
      ];

      return blockedPatterns.some(pattern => 
        errorString.includes(pattern)
      );
    };

    // 이벤트 리스너 등록
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    setShieldStatus('active');

    // 정리 함수
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // 🛡️ Chrome Extension 오류 차단
  useEffect(() => {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const errorString = args.join(' ');
      
      // Chrome Extension 관련 오류는 조용히 차단
      if (errorString.includes('chrome-extension://') || 
          errorString.includes('Unchecked runtime.lastError') ||
          errorString.includes('The message port closed')) {
        return; // 로그 출력 차단
      }
      
      originalConsoleError.apply(console, args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  if (!showStatus) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 shadow-lg">
        <div className="flex items-center gap-2 text-sm">
          {shieldStatus === 'active' ? (
            <>
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-green-700 font-medium">🛡️ 오류차단 활성</span>
              {errorCount > 0 && (
                <span className="text-gray-500">({errorCount}개 차단됨)</span>
              )}
            </>
          ) : shieldStatus === 'error' ? (
            <>
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-red-700 font-medium">오류차단 실패</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500">오류차단 대기</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
