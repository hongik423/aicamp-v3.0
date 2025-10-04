'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { useEffect } from 'react';

interface MobileToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const MobileToast = ({
  type,
  message,
  isVisible,
  onClose,
  duration = 4000
}: MobileToastProps) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info
  };

  const colors = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: 'text-green-600'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: 'text-red-600'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'text-blue-600'
    }
  };

  const Icon = icons[type];
  const colorScheme = colors[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.95 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 300,
            duration: 0.3 
          }}
          className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-sm"
        >
          <div className={`
            ${colorScheme.bg} ${colorScheme.border} ${colorScheme.text}
            border rounded-lg shadow-lg p-4 
            backdrop-blur-sm bg-opacity-95
          `}>
            <div className="flex items-start space-x-3">
              <Icon className={`${colorScheme.icon} w-5 h-5 mt-0.5 flex-shrink-0`} />
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-relaxed">
                  {message}
                </p>
              </div>
              
              <button
                onClick={onClose}
                className={`
                  ${colorScheme.icon} hover:opacity-70 
                  flex-shrink-0 p-1 rounded-full 
                  transition-opacity duration-200
                  touch-manipulation
                `}
                aria-label="알림 닫기"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* 진행 바 */}
            {duration > 0 && (
              <motion.div
                className={`mt-3 h-1 ${colorScheme.bg} rounded-full overflow-hidden`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className={`h-full ${colorScheme.icon.replace('text-', 'bg-')}`}
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: duration / 1000, ease: "linear" }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 