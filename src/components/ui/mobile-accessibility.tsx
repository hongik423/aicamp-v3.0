'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Type, Contrast, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AccessibilityControls({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const savedFontSize = localStorage.getItem('accessibility-font-size');
    const savedHighContrast = localStorage.getItem('accessibility-high-contrast');

    if (savedFontSize) setFontSize(parseInt(savedFontSize));
    if (savedHighContrast) setHighContrast(savedHighContrast === 'true');
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem('accessibility-font-size', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('accessibility-high-contrast', highContrast.toString());
  }, [highContrast]);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'fixed bottom-4 left-4 z-50 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          className
        )}
        aria-label="접근성 설정 열기"
      >
        <Eye className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              className="fixed left-0 top-0 bottom-0 w-80 max-w-[90vw] bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">접근성 설정</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-lg"
                  >
                    <EyeOff className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                      <Type className="w-4 h-4 mr-2" />
                      글자 크기
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setFontSize(Math.max(80, fontSize - 10))}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
                      >
                        A-
                      </button>
                      <span className="text-sm text-gray-600 min-w-[60px] text-center">
                        {fontSize}%
                      </span>
                      <button
                        onClick={() => setFontSize(Math.min(150, fontSize + 10))}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
                      >
                        A+
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center justify-between">
                      <span className="flex items-center text-sm font-medium text-gray-700">
                        <Contrast className="w-4 h-4 mr-2" />
                        고대비 모드
                      </span>
                      <button
                        onClick={() => setHighContrast(!highContrast)}
                        className={cn(
                          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                          highContrast ? 'bg-blue-600' : 'bg-gray-200'
                        )}
                      >
                        <span
                          className={cn(
                            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                            highContrast ? 'translate-x-6' : 'translate-x-1'
                          )}
                        />
                      </button>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
    >
      본문으로 바로가기
    </a>
  );
}