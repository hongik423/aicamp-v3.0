'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  fill = false,
  style,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // 50px 전에 미리 로딩
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // WebP 지원 감지
  const [supportsWebP, setSupportsWebP] = useState(false);
  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    setSupportsWebP(checkWebPSupport());
  }, []);

  // 이미지 URL 최적화
  const getOptimizedSrc = (originalSrc: string) => {
    // picsum.photos인 경우 WebP 지원
    if (originalSrc.includes('picsum.photos') && supportsWebP) {
      return originalSrc.includes('?') 
        ? `${originalSrc}&format=webp`
        : `${originalSrc}?format=webp`;
    }
    return originalSrc;
  };

  // 반응형 크기 계산
  const getResponsiveSizes = () => {
    if (sizes) return sizes;
    
    // 모바일 우선 반응형 크기
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  };

  // 기본 블러 데이터 URL 생성
  const getBlurDataURL = () => {
    if (blurDataURL) return blurDataURL;
    
    // 간단한 그라데이션 블러 플레이스홀더
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmM2Y0ZjYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlNWU3ZWIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==';
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  // 에러 상태
  if (hasError) {
    return (
      <div
        ref={imgRef}
        className={cn(
          'flex items-center justify-center bg-gray-100 text-gray-400',
          fill ? 'w-full h-full' : '',
          className
        )}
        style={fill ? style : { width, height, ...style }}
      >
        <div className="text-center p-4">
          <div className="text-2xl mb-2">📷</div>
          <div className="text-sm">이미지를 불러올 수 없습니다</div>
        </div>
      </div>
    );
  }

  // 로딩 중이거나 뷰포트에 없는 경우
  if (!isInView) {
    return (
      <div
        ref={imgRef}
        className={cn('bg-gray-100 animate-pulse', fill ? 'w-full h-full' : '', className)}
        style={fill ? style : { width, height, ...style }}
      />
    );
  }

  return (
    <div 
      ref={imgRef} 
      className={cn('relative overflow-hidden', fill ? 'w-full h-full' : '', className)} 
      style={fill ? style : { width, height, ...style }}
    >
      {/* 로딩 오버레이 */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full"
          />
        </motion.div>
      )}

      {/* 실제 이미지 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={getOptimizedSrc(src)}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          quality={quality}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={placeholder === 'blur' ? getBlurDataURL() : undefined}
          sizes={getResponsiveSizes()}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-300',
            fill ? 'object-cover' : ''
          )}
        />
      </motion.div>
    </div>
  );
}

// 프로그레시브 이미지 로딩 컴포넌트
interface ProgressiveImageProps extends OptimizedImageProps {
  lowQualitySrc?: string;
}

export function ProgressiveImage({
  src,
  lowQualitySrc,
  alt,
  className,
  ...props
}: ProgressiveImageProps) {
  const [highQualityLoaded, setHighQualityLoaded] = useState(false);
  const [showLowQuality, setShowLowQuality] = useState(!!lowQualitySrc);

  // 모바일에서만 프로그레시브 로딩 사용
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleHighQualityLoad = () => {
    setHighQualityLoaded(true);
    setTimeout(() => setShowLowQuality(false), 300);
  };

  if (!isMobile || !lowQualitySrc) {
    return <OptimizedImage src={src} alt={alt} className={className} {...props} />;
  }

  return (
    <div className={cn('relative', className)}>
      {/* 저화질 이미지 */}
      {showLowQuality && (
        <OptimizedImage
          src={lowQualitySrc}
          alt={alt}
          className="absolute inset-0 filter blur-sm"
          quality={30}
          {...props}
        />
      )}
      
      {/* 고화질 이미지 */}
      <OptimizedImage
        src={src}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          highQualityLoaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={handleHighQualityLoad}
        {...props}
      />
    </div>
  );
}
