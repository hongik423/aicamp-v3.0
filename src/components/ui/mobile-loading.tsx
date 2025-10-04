'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MobileLoadingProps {
  isLoading: boolean;
  type?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  progress?: number;
  className?: string;
}

export function MobileLoading({
  isLoading,
  type = 'spinner',
  size = 'md',
  message,
  progress,
  className
}: MobileLoadingProps) {
  if (!isLoading) return null;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const containerClasses = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6'
  };

  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return (
          <motion.div
            className={cn(
              'border-2 border-gray-200 border-t-blue-500 rounded-full',
              sizeClasses[size]
            )}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        );

      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={cn(
                  'bg-blue-500 rounded-full',
                  size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3'
                )}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <motion.div
            className={cn(
              'bg-blue-500 rounded-full',
              sizeClasses[size]
            )}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        );

      case 'skeleton':
        return (
          <div className="space-y-2 w-full">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="h-4 bg-gray-200 rounded"
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                style={{ width: `${100 - i * 10}%` }}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className={cn(
          'flex flex-col items-center justify-center',
          containerClasses[size],
          className
        )}
      >
        {renderLoader()}
        
        {message && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'text-gray-600 text-center mt-2',
              size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
            )}
          >
            {message}
          </motion.p>
        )}

        {typeof progress === 'number' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mt-3"
          >
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-blue-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs text-gray-500 text-center mt-1">
              {Math.round(progress)}%
            </p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// 네트워크 상태 감지 컴포넌트
export function NetworkStatus() {
  const [isOnline, setIsOnline] = React.useState(true);
  const [showOfflineMessage, setShowOfflineMessage] = React.useState(false);

  React.useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 초기 상태 확인
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showOfflineMessage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white p-2 text-center text-sm"
      >
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span>인터넷 연결이 끊어졌습니다</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// 터치 리플 효과 컴포넌트
interface TouchRippleProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export function TouchRipple({ children, className, disabled, onClick }: TouchRippleProps) {
  const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    };

    setRipples(prev => [...prev, newRipple]);

    // 햅틱 피드백
    if (navigator.vibrate && typeof navigator.vibrate === 'function') {
      navigator.vibrate(50);
    }

    // 리플 제거
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    onClick?.(e);
  };

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onClick={handleClick}
    >
      {children}
      
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="absolute bg-white/30 rounded-full pointer-events-none"
            style={{
              left: ripple.x - 20,
              top: ripple.y - 20,
              width: 40,
              height: 40
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}