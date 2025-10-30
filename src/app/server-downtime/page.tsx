'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, Mail, RefreshCw, Home, MessageCircle } from 'lucide-react';

interface DowntimeStatus {
  isOnline: boolean;
  message: string;
  showEmailRequest: boolean;
  estimatedRecoveryTime?: string;
  downtimeDuration?: string;
}

export default function ServerDowntimePage() {
  const [status, setStatus] = useState<DowntimeStatus>({
    isOnline: false,
    message: '호스트 컴퓨터 서버 상태 확인 중...',
    showEmailRequest: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [emailSent, setEmailSent] = useState(false);

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
        setEmailSent(true);
      } else {
        throw new Error('이메일 전송 실패');
      }
    } catch (error) {
      console.error('이메일 신청 실패:', error);
      alert('이메일 신청에 실패했습니다. 직접 hongik423@gmail.com으로 연락해주세요.');
    }
  };

  const handleRetry = () => {
    setIsLoading(true);
    checkServerStatus();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">서버 상태 확인 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AICAMP 서버 상태</h1>
                <p className="text-sm text-gray-500">호스트 컴퓨터 모니터링</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRetry}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                새로고침
              </button>
              <a
                href="/"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <Home className="w-4 h-4 mr-2" />
                홈으로
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* 상태 표시 */}
          <div className={`px-6 py-8 ${status.isOnline ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex items-center justify-center mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                status.isOnline ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {status.isOnline ? (
                  <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                ) : (
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                )}
              </div>
            </div>
            
            <h2 className={`text-2xl font-bold text-center mb-4 ${
              status.isOnline ? 'text-green-800' : 'text-red-800'
            }`}>
              {status.isOnline ? '서버 정상 작동 중' : '서버 일시 중단'}
            </h2>
            
            <p className="text-center text-gray-600 mb-6">
              {status.message}
            </p>

            {!status.isOnline && (
              <div className="bg-white rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {status.downtimeDuration && (
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-red-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        중단 시간: <span className="font-semibold">{status.downtimeDuration}</span>
                      </span>
                    </div>
                  )}
                  {status.estimatedRecoveryTime && (
                    <div className="flex items-center">
                      <RefreshCw className="w-5 h-5 text-orange-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        예상 복구: <span className="font-semibold">{status.estimatedRecoveryTime}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 서비스 안내 */}
          <div className="px-6 py-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {status.isOnline ? '서비스 이용 안내' : '서비스 복구 안내'}
            </h3>
            
            {status.isOnline ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800">
                    ✅ 호스트 컴퓨터가 정상적으로 작동하고 있습니다. 
                    AI 역량진단과 AI 챗봇 상담 서비스를 이용하실 수 있습니다.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <a
                    href="/ai-diagnosis"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    AI 역량진단 시작
                  </a>
                  <a
                    href="/chat"
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    AI 챗봇 상담
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">
                    ⚠️ 호스트 컴퓨터 서버가 일시적으로 중단되었습니다. 
                    서버가 복구되면 정상적인 AI 서비스를 이용하실 수 있습니다.
                  </p>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">서버 중단 중에도 이용 가능한 서비스</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• 기본 AI 챗봇 상담 (제한적 기능)</li>
                    <li>• 웹사이트 정보 조회</li>
                    <li>• 서비스 문의 및 신청</li>
                  </ul>
                </div>

                {status.showEmailRequest && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">서버 사용 신청</h4>
                    <p className="text-sm text-blue-700 mb-4">
                      호스트 컴퓨터 서버가 장시간 중단된 경우, 서버 관리자에게 사용 신청을 할 수 있습니다.
                    </p>
                    {emailSent ? (
                      <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                        <p className="text-green-800 text-sm">
                          ✅ 이메일 신청이 완료되었습니다. 서버 관리자가 확인 후 연락드리겠습니다.
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={handleEmailRequest}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        서버 사용 신청하기
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 연락처 정보 */}
          <div className="px-6 py-4 bg-gray-50 border-t">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-gray-600">
                <p>서버 관리자: hongik423@gmail.com</p>
                <p>문의사항이 있으시면 언제든 연락해주세요.</p>
              </div>
              <div className="mt-2 sm:mt-0">
                <a
                  href="mailto:hongik423@gmail.com"
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <Mail className="w-4 h-4 mr-1" />
                  이메일로 문의하기
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
