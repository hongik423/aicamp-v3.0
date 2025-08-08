'use client';

import React from 'react';
import { useBannerStore } from '@/lib/stores/bannerStore';
import { AlertCircle, CheckCircle2, Info, Loader2, Mail } from 'lucide-react';

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
  const { isVisible, message, subMessage, variant } = useBannerStore();

  if (!isVisible) return null;

  const style = variantStyles[variant || 'info'];
  const Icon = variantIcon[variant || 'info'];

  const isInfo = (variant || 'info') === 'info';
  const messageTextClass = isInfo ? 'text-orange-200' : 'text-white';
  const subMessageTextClass = isInfo ? 'text-orange-100' : 'opacity-90';

  return (
    <div className="fixed top-0 inset-x-0 z-[100] pointer-events-none">
      <div
        className={`mx-auto max-w-screen-2xl m-2 pointer-events-auto shadow-lg border rounded-xl overflow-hidden`}
      >
        <div className={`bg-gradient-to-r ${style} text-white p-3 sm:p-4 flex items-start gap-3`}>
          <div className="mt-0.5 animate-pulse">
            {Icon}
          </div>
          <div className="flex-1">
            <p className={`font-bold text-sm sm:text-base ${messageTextClass}`}>{message}</p>
            {subMessage && (
              <p className={`text-xs sm:text-sm mt-0.5 ${subMessageTextClass}`}>{subMessage}</p>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm opacity-90">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>진행 중</span>
            <Mail className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}


