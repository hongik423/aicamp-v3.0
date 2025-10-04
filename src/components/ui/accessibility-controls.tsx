'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Type, 
  Eye, 
  Volume2, 
  VolumeX, 
  Minus, 
  Plus,
  Contrast,
  Zap,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  reduceMotion: boolean;
  screenReader: boolean;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  reduceMotion: false,
  screenReader: false,
};

export function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  // 설정 로드/저장
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Speech Synthesis 초기화
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);

  // 설정 적용
  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // 폰트 크기 조정
    root.style.fontSize = `${newSettings.fontSize}%`;
    
    // 고대비 모드
    if (newSettings.highContrast) {
      root.style.filter = 'contrast(150%) brightness(1.2)';
      root.classList.add('high-contrast');
    } else {
      root.style.filter = '';
      root.classList.remove('high-contrast');
    }
    
    // 모션 감소
    if (newSettings.reduceMotion) {
      root.style.setProperty('--animation-duration', '0.01s');
      root.classList.add('reduce-motion');
    } else {
      root.style.removeProperty('--animation-duration');
      root.classList.remove('reduce-motion');
    }
  };

  // 텍스트 읽기
  const speakText = (text: string) => {
    if (speechSynthesis && settings.screenReader) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  // 설정 업데이트
  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // 햅틱 피드백
    if (navigator.vibrate && typeof navigator.vibrate === 'function') {
      navigator.vibrate(30);
    }
  };

  // 폰트 크기 조정
  const adjustFontSize = (delta: number) => {
    const newSize = Math.max(80, Math.min(150, settings.fontSize + delta));
    updateSetting('fontSize', newSize);
    speakText(`글자 크기 ${newSize}퍼센트`);
  };

  return (
    <>
      {/* 접근성 컨트롤 버튼 */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          speakText(isOpen ? '접근성 설정 닫기' : '접근성 설정 열기');
        }}
        className="fixed bottom-4 left-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="접근성 설정"
      >
        <Settings className="w-6 h-6" />
      </motion.button>

      {/* 접근성 설정 패널 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed bottom-20 left-4 z-50 bg-white rounded-lg shadow-xl border p-4 w-80 max-w-[calc(100vw-2rem)]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">접근성 설정</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
                aria-label="설정 닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* 폰트 크기 조정 */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Type className="w-4 h-4 mr-2" />
                  글자 크기: {settings.fontSize}%
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => adjustFontSize(-10)}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    aria-label="글자 크기 줄이기"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${Math.max(0, Math.min(100, ((settings.fontSize - 80) / 70) * 100))}%` }}
            />
                  </div>
                  <button
                    onClick={() => adjustFontSize(10)}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    aria-label="글자 크기 키우기"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 고대비 모드 */}
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Contrast className="w-4 h-4 mr-2" />
                  고대비 모드
                </label>
                <button
                  onClick={() => {
                    updateSetting('highContrast', !settings.highContrast);
                    speakText(settings.highContrast ? '고대비 모드 끄기' : '고대비 모드 켜기');
                  }}
                  className={cn(
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    settings.highContrast ? 'bg-blue-600' : 'bg-gray-200'
                  )}
                  aria-pressed={settings.highContrast ? 'true' : 'false'}
                  title="고대비 모드 토글"
                >
                  <span
                    className={cn(
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </button>
              </div>

              {/* 모션 감소 */}
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Zap className="w-4 h-4 mr-2" />
                  애니메이션 감소
                </label>
                <button
                  onClick={() => {
                    updateSetting('reduceMotion', !settings.reduceMotion);
                    speakText(settings.reduceMotion ? '애니메이션 켜기' : '애니메이션 끄기');
                  }}
                  className={cn(
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    settings.reduceMotion ? 'bg-blue-600' : 'bg-gray-200'
                  )}
                  aria-pressed={settings.reduceMotion ? 'true' : 'false'}
                  title="애니메이션 감소 토글"
                >
                  <span
                    className={cn(
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      settings.reduceMotion ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </button>
              </div>

              {/* 스크린 리더 */}
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  {settings.screenReader ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
                  음성 안내
                </label>
                <button
                  onClick={() => {
                    const newValue = !settings.screenReader;
                    updateSetting('screenReader', newValue);
                    if (newValue) {
                      speakText('음성 안내가 켜졌습니다');
                    }
                  }}
                  className={cn(
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    settings.screenReader ? 'bg-blue-600' : 'bg-gray-200'
                  )}
                  aria-pressed={settings.screenReader ? 'true' : 'false'}
                  title="음성 안내 토글"
                >
                  <span
                    className={cn(
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      settings.screenReader ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </button>
              </div>

              {/* 초기화 버튼 */}
              <button
                onClick={() => {
                  setSettings(DEFAULT_SETTINGS);
                  speakText('접근성 설정이 초기화되었습니다');
                }}
                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
              >
                설정 초기화
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip to Content 링크 */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
        onClick={() => speakText('메인 콘텐츠로 이동')}
      >
        메인 콘텐츠로 바로가기
      </a>

      {/* 접근성 CSS */}
      <style jsx global>{`
        .high-contrast {
          --tw-text-opacity: 1;
          --tw-bg-opacity: 1;
        }
        
        .high-contrast * {
          text-shadow: 0 0 1px rgba(0,0,0,0.5);
        }
        
        .reduce-motion * {
          animation-duration: 0.01s !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01s !important;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01s !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01s !important;
          }
        }
        
        @media (prefers-contrast: high) {
          * {
            filter: contrast(150%);
          }
        }
      `}</style>
    </>
  );
}
