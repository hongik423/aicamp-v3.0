'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
  className?: string;
}

export function ThemeToggle({ 
  size = 'md', 
  variant = 'ghost',
  className = ''
}: ThemeToggleProps) {
  const { theme, toggleTheme, isDark } = useTheme();

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9', 
    lg: 'h-10 w-10'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-[1.2rem] w-[1.2rem]',
    lg: 'h-5 w-5'
  };

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]}
        relative overflow-hidden
        transition-all duration-300 ease-in-out
        hover:scale-105 active:scale-95
        border border-aicamp-navy/10 dark:border-aicamp-purple/20
        bg-white/80 dark:bg-aicamp-navy-dark/80
        hover:bg-aicamp-navy/5 dark:hover:bg-aicamp-purple/10
        backdrop-blur-sm
        shadow-sm hover:shadow-aicamp-glow
        ${className}
      `}
      title={`${isDark ? 'Light' : 'Dark'} 모드로 전환`}
      aria-label={`${isDark ? 'Light' : 'Dark'} 모드로 전환`}
    >
      <div className="relative">
        {/* Sun Icon */}
        <Sun 
          className={`
            ${iconSizes[size]}
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            text-aicamp-orange
            transition-all duration-300 ease-in-out
            ${isDark 
              ? 'rotate-90 scale-0 opacity-0' 
              : 'rotate-0 scale-100 opacity-100'
            }
          `}
        />
        
        {/* Moon Icon */}
        <Moon 
          className={`
            ${iconSizes[size]}
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            text-aicamp-purple
            transition-all duration-300 ease-in-out
            ${isDark 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
            }
          `}
        />
      </div>
    </Button>
  );
}

// 더 간단한 토글 버튼 (텍스트 포함)
export function ThemeToggleWithText({ 
  size = 'md',
  className = ''
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={toggleTheme}
      className={`
        gap-2 transition-all duration-300
        border-aicamp-navy/20 dark:border-aicamp-purple/30
        bg-white/80 dark:bg-aicamp-navy-dark/80
        hover:bg-aicamp-navy/5 dark:hover:bg-aicamp-purple/10
        text-aicamp-navy dark:text-aicamp-purple
        backdrop-blur-sm
        ${className}
      `}
    >
      {isDark ? (
        <>
          <Sun className="h-4 w-4 text-aicamp-orange" />
          <span>라이트 모드</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 text-aicamp-purple" />
          <span>다크 모드</span>
        </>
      )}
    </Button>
  );
}

// 드롭다운 메뉴용 테마 선택기
export function ThemeSelector({ onClose }: { onClose?: () => void }) {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    onClose?.();
  };

  return (
    <div className="space-y-1">
      <button
        onClick={() => handleThemeChange('light')}
        className={`
          w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg
          transition-colors duration-200
          ${theme === 'light' 
            ? 'bg-aicamp-navy/10 text-aicamp-navy dark:bg-aicamp-purple/20 dark:text-aicamp-purple' 
            : 'hover:bg-gray-100 dark:hover:bg-aicamp-navy/10'
          }
        `}
      >
        <Sun className="h-4 w-4 text-aicamp-orange" />
        <span>라이트 모드</span>
        {theme === 'light' && (
          <div className="ml-auto h-2 w-2 bg-aicamp-orange rounded-full" />
        )}
      </button>
      
      <button
        onClick={() => handleThemeChange('dark')}
        className={`
          w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg
          transition-colors duration-200
          ${theme === 'dark' 
            ? 'bg-aicamp-navy/10 text-aicamp-navy dark:bg-aicamp-purple/20 dark:text-aicamp-purple' 
            : 'hover:bg-gray-100 dark:hover:bg-aicamp-navy/10'
          }
        `}
      >
        <Moon className="h-4 w-4 text-aicamp-purple" />
        <span>다크 모드</span>
        {theme === 'dark' && (
          <div className="ml-auto h-2 w-2 bg-aicamp-purple rounded-full" />
        )}
      </button>
    </div>
  );
} 