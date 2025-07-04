'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = 'dark' }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // 클라이언트 사이드에서만 실행
  useEffect(() => {
    setMounted(true);
    
    // 로컬 스토리지에서 저장된 테마 가져오기
    const savedTheme = localStorage.getItem('aicamp-theme') as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setThemeState(savedTheme);
    } else {
      // 시스템 설정 확인
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setThemeState(systemTheme);
    }
  }, []);

  // 테마 변경 시 DOM과 로컬 스토리지 업데이트
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    
    // 이전 테마 클래스 제거
    root.classList.remove('light', 'dark');
    
    // 새 테마 클래스 추가
    root.classList.add(theme);
    
    // 로컬 스토리지에 저장
    localStorage.setItem('aicamp-theme', theme);
    
    // 메타 테마 색상 업데이트
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#001c40' : '#ffffff');
    }
  }, [theme, mounted]);

  // 시스템 테마 변경 감지
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // 사용자가 수동으로 설정하지 않은 경우에만 시스템 테마 따라가기
      const savedTheme = localStorage.getItem('aicamp-theme');
      if (!savedTheme) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
  };

  // 마운트되기 전에는 기본 테마로 렌더링
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ 
        theme: defaultTheme, 
        setTheme, 
        toggleTheme, 
        isDark: defaultTheme === 'dark' 
      }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
} 