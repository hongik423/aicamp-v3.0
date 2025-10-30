'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Clock, RefreshCw, Mail, X } from 'lucide-react';

interface ServerStatus {
  isOnline: boolean;
  message: string;
  showEmailRequest: boolean;
  estimatedRecoveryTime?: string;
  downtimeDuration?: string;
}

export default function ServerStatusBanner() {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    checkServerStatus();
    // 30초마다 상태 확인
    const interval = setInterval(checkServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkServerStatus = async () => {
    try {
      const response = await fetch('/api/host-status');
      if (response.ok) {
        const data = await response.json();
        setStatus(data);
        // 서버가 온라인이면 배너 숨기기
        if (data.isOnline) {
          setIsVisible(false);
        }
      } else {
        // API가 응답하지 않으면 서버 다운타임으로 간주
        setStatus({
          isOnline: false,
          message: '호스트 컴퓨터 서버가 응답하지 않습니다.',
          showEmailRequest: true,
          downtimeDuration: '알 수 없음'
        });
      }
    } catch (error) {
      console.error('서버 상태 확인 실패:', error);
      setStatus({
        isOnline: false,
        message: '호스트 컴퓨터 서버 연결에 실패했습니다.',
        showEmailRequest: true,
        downtimeDuration: '알 수 없음'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  const handleEmailRequest = async () => {
    try {
      const response = await fetch('/api/request-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'host_server_request',
          message: '호스트 컴퓨터 서버 사용 신청',
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        alert('서버 사용 신청이 완료되었습니다. 서버 관리자가 확인 후 연락드리겠습니다.');
      } else {
        throw new Error('이메일 전송 실패');
      }
    } catch (error) {
      console.error('이메일 신청 실패:', error);
      alert('이메일 신청에 실패했습니다. 직접 hongik423@gmail.com으로 연락해주세요.');
    }
  };

  // 로딩 중이거나 서버가 온라인이거나 사용자가 닫은 경우 표시하지 않음
  if (isLoading || !status || status.isOnline || isDismissed || !isVisible) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">
                {status.message}
              </p>
              {status.downtimeDuration && (
                <p className="text-xs opacity-90 mt-1">
                  중단 시간: {status.downtimeDuration}
                  {status.estimatedRecoveryTime && (
                    <span className="ml-2">
                      • 예상 복구: {status.estimatedRecoveryTime}
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {status.showEmailRequest && (
              <button
                onClick={handleEmailRequest}
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-white/20 hover:bg-white/30 rounded-md transition-colors"
              >
                <Mail className="w-3 h-3 mr-1" />
                서버 신청
              </button>
            )}
            
            <a
              href="/server-downtime"
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-white/20 hover:bg-white/30 rounded-md transition-colors"
            >
              <Clock className="w-3 h-3 mr-1" />
              상태 확인
            </a>
            
            <button
              onClick={checkServerStatus}
              className="inline-flex items-center px-2 py-1.5 text-xs font-medium bg-white/20 hover:bg-white/30 rounded-md transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
            
            <button
              onClick={handleDismiss}
              className="inline-flex items-center px-2 py-1.5 text-xs font-medium bg-white/20 hover:bg-white/30 rounded-md transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
