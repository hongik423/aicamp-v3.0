'use client';

import React from 'react';
import { Cpu, Download, AlertTriangle, Brain, CheckCircle, Zap } from 'lucide-react';

interface BrowserAIStatusProps {
  isModelLoading: boolean;
  modelLoadProgress: number;
  modelLoadStatus: string;
  isInitialized: boolean;
  browserSupported: boolean;
  className?: string;
}

export const BrowserAIStatus: React.FC<BrowserAIStatusProps> = ({
  isModelLoading,
  modelLoadProgress,
  modelLoadStatus,
  isInitialized,
  browserSupported,
  className = ''
}) => {
  if (isModelLoading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Download className="w-4 h-4 text-yellow-500 animate-bounce" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">AI 모델 로딩 중...</span>
          <div className="w-32 bg-gray-200 rounded-full h-1.5 mt-1">
            <div 
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" 
              style={{ width: `${modelLoadProgress * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 mt-1">{Math.round(modelLoadProgress * 100)}% - {modelLoadStatus}</span>
        </div>
      </div>
    );
  }

  if (isInitialized) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <CheckCircle className="w-4 h-4 text-green-500" />
        <div className="flex items-center gap-2">
          <Cpu className="w-3 h-3 text-green-600" />
          <span className="text-sm font-medium text-green-700">브라우저 AI 준비완료</span>
          <Zap className="w-3 h-3 text-yellow-500 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!browserSupported) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <AlertTriangle className="w-4 h-4 text-red-500" />
        <span className="text-sm font-medium text-red-700">브라우저 미지원</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Brain className="w-4 h-4 text-blue-500 animate-pulse" />
      <span className="text-sm font-medium text-blue-700">AI 초기화 중...</span>
    </div>
  );
};

export default BrowserAIStatus;
