import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [isComposing, setIsComposing] = React.useState(false);
    
    // 모바일 디바이스 감지
    const isMobile = React.useMemo(() => {
      if (typeof window === 'undefined') return false;
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }, []);
    
    // 입력 타입별 inputMode 결정
    const getInputMode = () => {
      switch (type) {
        case 'tel':
          return 'tel';
        case 'email':
          return 'email';
        case 'number':
          return 'numeric';
        case 'url':
          return 'url';
        default:
          return 'text';
      }
    };
    
    return (
      <input
        type={type}
        inputMode={getInputMode()}
        className={cn(
          // 기본 스타일
          "flex w-full rounded-md border bg-background ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          
          // 높이 및 패딩 - 모바일 최적화
          "h-12 sm:h-10",
          "px-4 py-3 sm:px-3 sm:py-2",
          
          // 폰트 크기 - 자동 확대 방지
          "text-[16px] sm:text-sm",
          
          // 터치 최적화
          "touch-manipulation",
          "-webkit-tap-highlight-color: transparent",
          
          // 외관 초기화
          "-webkit-appearance: none",
          "appearance: none",
          
          // 포커스 스타일
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "focus:border-ring",
          
          // 호버 효과 (데스크탑)
          "hover:border-input/80",
          
          // 트랜지션
          "transition-all duration-200",
          
          // 포커스 시 배경색
          isFocused && "bg-background/95 border-ring shadow-sm",
          
          // 모바일 특화 스타일
          isMobile && [
            "leading-relaxed",
            "rounded-lg", // 더 큰 라운드
          ],
          
          // 자동 확대 방지 및 iOS 최적화
          "text-[16px]",
          "shadow-none",
          isFocused && "shadow-sm",
          
          className
        )}
        ref={ref}
        autoComplete={props.autoComplete || "on"}
        autoCapitalize={props.autoCapitalize || "off"}
        autoCorrect={props.autoCorrect || "off"}
        spellCheck={props.spellCheck || false}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={(e) => {
          setIsComposing(false);
          props.onCompositionEnd?.(e);
        }}
        onChange={(e) => {
          // 한글 입력 중복 방지
          if (!isComposing) {
            props.onChange?.(e);
          }
        }}
        onTouchStart={(e) => {
          // 햅틱 피드백 (지원하는 디바이스)
          if (navigator.vibrate && typeof navigator.vibrate === 'function') {
            navigator.vibrate(10);
          }
          props.onTouchStart?.(e);
        }}
        onFocus={(e) => {
          setIsFocused(true);
          
          // 모바일에서 스크롤 위치 조정
          if (window.innerWidth <= 768) {
            // 키보드가 열리기를 기다림
            setTimeout(() => {
              e.target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'nearest'
              });
            }, 300);
          }
          
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
