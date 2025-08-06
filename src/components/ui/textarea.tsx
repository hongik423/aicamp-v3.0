import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const combinedRef = ref || textareaRef;
  
  // 모바일 입력 중복 방지를 위한 상태 관리
  const [isFocused, setIsFocused] = React.useState(false);
  const [isComposing, setIsComposing] = React.useState(false);
  
  // 자동 높이 조절 함수
  const adjustHeight = React.useCallback(() => {
    const textarea = (combinedRef as React.RefObject<HTMLTextAreaElement>).current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [combinedRef]);

  // 모바일 키보드 대응
  const handleFocus = React.useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    
    // 모바일에서 스크롤 위치 조정
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        e.target.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest' 
        });
      }, 300);
    }
    
    // 사용자 정의 onFocus 호출
    props.onFocus?.(e);
  }, [props]);

  const handleBlur = React.useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  }, [props]);

  // 한글 입력 중복 방지
  const handleCompositionStart = React.useCallback(() => {
    setIsComposing(true);
  }, []);

  const handleCompositionEnd = React.useCallback((e: React.CompositionEvent<HTMLTextAreaElement>) => {
    setIsComposing(false);
    adjustHeight();
    props.onCompositionEnd?.(e);
  }, [adjustHeight, props]);

  // 입력 이벤트 처리
  const handleInput = React.useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
    if (!isComposing) {
      adjustHeight();
    }
    props.onInput?.(e);
  }, [isComposing, adjustHeight, props]);

  // 초기 높이 설정
  React.useEffect(() => {
    adjustHeight();
  }, [adjustHeight, props.value]);

  return (
    <textarea
      className={cn(
        // 기본 스타일
        'flex w-full rounded-xl border bg-background ring-offset-background',
        'placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        
        // 패딩 및 폰트 크기 - 모바일 최적화
        'px-3 py-3 text-base leading-relaxed',
        'sm:px-3 sm:py-2 sm:text-sm',
        
        // 최소 높이 - 모바일에서 더 크게
        'min-h-[100px] sm:min-h-[80px]',
        
        // 터치 타겟 최적화
        'touch-manipulation',
        
        // 포커스 스타일
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'focus:border-ring',
        
        // 호버 효과
        'hover:border-input/80',
        
        // 트랜지션
        'transition-all duration-200',
        
        // 모바일 최적화
        '-webkit-appearance: none',
        'appearance: none',
        
        // 자동 확대 방지
        'text-[16px] sm:text-base',
        
        // 스크롤바 스타일
        'scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent',
        
        // 포커스 시 배경색 변경 - 완전 불투명
        isFocused && 'bg-background border-ring',
        
        // 리사이즈 비활성화 및 오버플로우 숨김
        'resize-none overflow-hidden',
        
        // 사용자 정의 클래스
        className,
      )}
      ref={combinedRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      onInput={handleInput}
      autoComplete={props.autoComplete || 'on'}
      autoCapitalize={props.autoCapitalize || 'sentences'}
      autoCorrect={props.autoCorrect || 'off'}
      spellCheck={props.spellCheck ?? false}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export { Textarea };
