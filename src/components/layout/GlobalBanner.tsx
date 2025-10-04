'use client';

import React from 'react';
import { useBannerStore } from '@/lib/stores/bannerStore';
import { AlertCircle, CheckCircle2, Info, Loader2, Mail, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const variantStyles: Record<string, string> = {
  info: 'from-blue-600 to-indigo-600 border-blue-500',
  success: 'from-green-600 to-emerald-600 border-green-500',
  warning: 'from-yellow-600 to-orange-600 border-yellow-500',
  error: 'from-red-600 to-rose-600 border-red-500',
};

const variantIcon: Record<string, React.ReactNode> = {
  info: <Info className="w-5 h-5" />,
  success: <CheckCircle2 className="w-5 h-5" />,
  warning: <AlertCircle className="w-5 h-5" />,
  error: <AlertCircle className="w-5 h-5" />,
};

export default function GlobalBanner() {
  const { isVisible, message, subMessage, variant, progressPercent, stepLabel, hide } = useBannerStore();

  if (!isVisible) return null;

  const style = variantStyles[variant || 'info'];
  const Icon = variantIcon[variant || 'info'];

  const isInfo = (variant || 'info') === 'info';
  // 파랑 계열 배경(info)일 때는 보색(노랑/호박) 계열로 텍스트를 강제 적용
  const messageTextClass = isInfo ? 'text-yellow-200' : 'text-white';
  const subMessageTextClass = isInfo ? 'text-yellow-100' : 'opacity-90';

  const handleClose = () => {
    hide();
    // 세션 동안 배너 비활성화 (네비게이션 사용 가능하도록)
    sessionStorage.setItem('banners-disabled-for-session', 'true');
    console.log('🚫 사용자가 배너를 닫음 - 세션 동안 배너 비활성화');
  };

  return (
    <div className="fixed top-0 inset-x-0 z-[10003] pointer-events-none isolate" aria-live="polite">
      <div
        className={`mx-auto max-w-screen-2xl m-2 pointer-events-auto shadow-lg border rounded-xl overflow-hidden`}
      >
        <div className={`bg-gradient-to-r ${style} text-white p-2 sm:p-3 flex items-center gap-2`}>
          <div className="animate-pulse">
            {React.cloneElement(Icon as React.ReactElement, { className: "w-4 h-4" })}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`font-medium text-xs sm:text-sm ${messageTextClass} drop-shadow-[0_1px_1px_rgba(0,0,0,0.75)] truncate`}>{message}</p>
            {subMessage && (
              <p className={`text-[10px] sm:text-xs mt-0.5 ${subMessageTextClass} drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] truncate`}>{subMessage}</p>
            )}
            {typeof progressPercent === 'number' && (
              <div className="mt-1">
                <div className="flex items-center justify-between text-[9px] sm:text-[10px] opacity-90 mb-0.5">
                  <span className="truncate">{stepLabel || '진행 중'}</span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <Progress value={progressPercent} className="h-1" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs opacity-90 shrink-0">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span className="hidden sm:inline">{typeof progressPercent === 'number' ? `${Math.round(progressPercent)}%` : '진행 중'}</span>
            <Mail className="w-3 h-3" />
            <button
              onClick={handleClose}
              className="ml-1 p-0.5 hover:bg-white/20 rounded-full transition-colors duration-200 group"
              title="배너 닫기"
              aria-label="배너 닫기"
            >
              <X className="w-3 h-3 group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


