'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getSessionLeaderImage, getChatbotLeaderImage } from '@/lib/utils';
import { 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  User, 
  Bot,
  Sparkles,
  MessageCircle,
  Clock,
  CheckCircle,
  Zap,
  Search,
  Brain,
  Download,
  Cpu,
  AlertTriangle
} from 'lucide-react';
import { 
  BrowserLLM, 
  getGlobalBrowserLLM, 
  LEE_KYOJANG_SYSTEM_PROMPT 
} from '@/lib/ai/browser-llm';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isTyping?: boolean;
  buttons?: Array<{
    text: string;
    url: string;
    style: string;
    icon: string;
  }>;
}

interface AICampChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
}

const AICampChatInterface: React.FC<AICampChatInterfaceProps> = ({
  isOpen,
  onClose,
  onMinimize
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '안녕하세요! AI CAMP 교장 이후경입니다.\n\n28년간 현대그룹과 삼성생명에서 실무를 쌓고, 500여 개 기업을 직접 도우면서 얻은 경험에 최첨단 AI 기술을 접목해서 기업들이 실무에서 전략까지 정말 폭발적인 성장을 할 수 있도록 도와드리고 있어요.\n\n🚀 2025년 업데이트된 AI CAMP 서비스:\n• BM ZEN 사업분석 (신규사업 성공률 95%)\n• AI 생산성향상 (업무효율 40-60% 향상)\n• 공장/부동산 경매 (투자비 35-50% 절약)\n• 기술창업 지원 (평균 5억원 자금 확보)\n• 인증지원 (연간 5천만원 세제혜택)\n• 웹사이트 구축 (매출 300-500% 증대)\n• AI 역량진단 (무료 온라인 진단)\n\n🎓 신규 교육 프로그램:\n• AI & n8n 자동화 교육\n• 부서별 맞춤형 교육 (기획관리, 영업/마케팅, 연구개발, 생산/제조, 고객서비스)\n• 경영진 특화 교육\n\n어떤 도움이 필요하신지 편하게 말씀해주세요!\n\n— 100% 브라우저 온디바이스 AI로 실행됩니다',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 브라우저 LLM 상태 관리
  const [browserLLM, setBrowserLLM] = useState<BrowserLLM | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [modelLoadProgress, setModelLoadProgress] = useState(0);
  const [modelLoadStatus, setModelLoadStatus] = useState('');
  const [browserSupport, setBrowserSupport] = useState<{ supported: boolean; issues: string[] } | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // 브라우저 호환성 체크 및 모델 초기화
  useEffect(() => {
    if (isOpen && !browserSupport) {
      const support = BrowserLLM.checkBrowserSupport();
      setBrowserSupport(support);
      
      if (support.supported) {
        initializeBrowserLLM();
      }
    }
  }, [isOpen]);

  // 브라우저 LLM 초기화
  const initializeBrowserLLM = async () => {
    if (browserLLM?.getStatus().isInitialized) return;
    
    try {
      setIsModelLoading(true);
      setModelLoadStatus('브라우저 AI 모델 준비 중...');
      
      const llm = await getGlobalBrowserLLM();
      
      await llm.initialize((progress) => {
        setModelLoadProgress(progress.progress);
        setModelLoadStatus(progress.text);
      });
      
      setBrowserLLM(llm);
      setModelLoadStatus('모델 로딩 완료!');
      
      console.log('✅ 브라우저 LLM 초기화 완료');
      
    } catch (error) {
      console.error('❌ 브라우저 LLM 초기화 실패:', error);
      setModelLoadStatus(`초기화 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    } finally {
      setIsModelLoading(false);
    }
  };

  // AICAMP 브라우저 직접 실행 AI 상담 시스템
  const callAICampBrowserLLM = async (userQuery: string): Promise<{ response: string; buttons?: Array<{ text: string; url: string; style: string; icon: string }>; badge?: string }> => {
    if (!browserLLM?.getStatus().isInitialized) {
      throw new Error('브라우저 AI 모델이 아직 준비되지 않았습니다. 잠시만 기다려주세요.');
    }

    try {
      console.log('🧠 브라우저 직접 실행 이교장 AI 호출 시작:', { 
        message: userQuery,
        messageLength: userQuery.length 
      });
      
      // 브라우저에서 직접 AI 응답 생성
      const aiResponse = await browserLLM.generateResponse(
        userQuery,
        LEE_KYOJANG_SYSTEM_PROMPT
      );
      
      console.log('✅ 브라우저 AI 응답 완료:', { 
        responseLength: aiResponse.length
      });
      
      // 기본 액션 버튼 생성
      const buttons = [
        { text: '🎯 AI 역량진단', url: '/ai-diagnosis', style: 'primary', icon: '🎯' },
        { text: '📞 상담 예약', url: '/consultation', style: 'secondary', icon: '📞' },
        { text: '📚 교육과정 보기', url: '/services/ai-curriculum', style: 'outline', icon: '📚' }
      ];
      
      return {
        response: `${aiResponse}\n\n— 100% 브라우저 온디바이스 AI`,
        buttons,
        badge: 'Browser On-Device AI'
      };
      
    } catch (error) {
      console.error('❌ 브라우저 AI 오류:', error);
      throw new Error(`브라우저 AI 실행 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
  };

  // 폴백 답변 완전 제거 - AI 분석 실패 시 오류 메시지만 표시

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      // 브라우저 호환성 체크
      if (!browserSupport?.supported) {
        throw new Error(`브라우저 호환성 문제: ${browserSupport?.issues.join(', ')}`);
      }

      // AICAMP 브라우저 직접 실행 AI 호출
      const aiResponseData = await callAICampBrowserLLM(currentInput);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseData.response,
        sender: 'ai',
        timestamp: new Date(),
        buttons: aiResponseData.buttons || []
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('브라우저 AI 응답 오류:', error);
      
      // 브라우저 미지원 시 폴백 메시지
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `브라우저 AI 실행 중 문제가 발생했습니다.\n\n${error instanceof Error ? error.message : '알 수 없는 오류'}\n\n해결 방법:\n• Chrome, Edge, Firefox 최신 버전 사용\n• HTTPS 환경에서 접속\n• 충분한 메모리 확보 (8GB 이상 권장)\n\n직접 상담: 010-9251-9743 (이후경 교장)`,
        sender: 'ai',
        timestamp: new Date(),
        buttons: [
          { text: '📞 직접 상담', url: '/consultation', style: 'primary', icon: '📞' },
          { text: '🔧 브라우저 업데이트', url: 'https://www.google.com/chrome/', style: 'secondary', icon: '🔧' }
        ]
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[85vh]'
      }`}>
        
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={getChatbotLeaderImage()}
                alt="AI교장 이후경"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">이후경 교장</h3>
              <div className="flex items-center space-x-1 text-sm text-blue-100">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>28년 경험 상담 중</span>
                <CheckCircle className="w-3 h-3 ml-1" />
              </div>
              <div className="mt-1 flex items-center gap-2">
                {isModelLoading ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-300/30 animate-pulse">
                    <Download className="w-2 h-2 inline mr-1" />
                    모델 로딩 중...
                  </span>
                ) : browserLLM?.getStatus().isInitialized ? (
                  <>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 border border-green-300/30">
                      <Cpu className="w-2 h-2 inline mr-1" />
                      Browser AI
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/20">100% On-Device</span>
                  </>
                ) : browserSupport?.supported === false ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 border border-red-300/30">
                    <AlertTriangle className="w-2 h-2 inline mr-1" />
                    브라우저 미지원
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-300/30">
                    <Brain className="w-2 h-2 inline mr-1" />
                    AI 준비 중
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {onMinimize && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* 메시지 영역 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(85vh-140px)]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    {/* 아바타 */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gradient-to-br from-purple-500 to-blue-600 text-white'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <img
                          src={getSessionLeaderImage()}
                          alt="AI교장"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    
                    {/* 메시지 버블 */}
                    <div className={`space-y-3 ${message.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-md'
                          : 'bg-gray-100 text-gray-900 rounded-bl-md'
                      }`}>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </p>
                        <p className={`text-xs mt-2 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      
                      {/* 상담신청 버튼들 렌더링 */}
                      {message.sender === 'ai' && message.buttons && message.buttons.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {message.buttons.map((button, index) => (
                            <a
                              key={index}
                              href={button.url}
                              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                                button.style === 'primary' 
                                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                                  : 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
                              }`}
                              onClick={(e) => {
                                // 진동 피드백 (모바일)
                                if (navigator.vibrate) {
                                  navigator.vibrate(50);
                                }
                              }}
                            >
                              <span className="text-base">{button.icon}</span>
                              <span>{button.text}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* 로딩 메시지 */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-white flex items-center justify-center overflow-hidden">
                      <img
                        src={getSessionLeaderImage()}
                        alt="AI교장"
                        className="w-full h-full object-cover animate-pulse"
                      />
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        </div>
                        <Cpu className="w-4 h-4 text-green-500 animate-pulse" />
                        <span className="text-sm text-gray-500">브라우저 AI 분석 중...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* 입력 영역 */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="이후경 교장에게 상담 문의하세요... (AI 프로세스 자동화 전문)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 text-white placeholder-gray-300 bg-blue-500"
                    disabled={isLoading}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      size="sm"
                      className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white p-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* 빠른 응답 버튼들 */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  'BM ZEN 사업분석',
                  'AI 생산성향상',
                  '공장경매 투자',
                  '5억원 기술창업',
                  'AI & n8n 교육',
                  '매출 500% 웹사이트'
                ].map((quickReply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputValue(quickReply)}
                    className="text-xs px-3 py-1 rounded-full border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                    disabled={isLoading}
                  >
                    {quickReply}
                  </Button>
                ))}
              </div>
              
              {/* 브라우저 AI 상태 표시 */}
              <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
                {isModelLoading ? (
                  <>
                    <Download className="w-3 h-3 mr-1 text-yellow-500 animate-bounce" />
                    <span>모델 로딩 중... {Math.round(modelLoadProgress * 100)}%</span>
                  </>
                ) : browserLLM?.getStatus().isInitialized ? (
                  <>
                    <Cpu className="w-3 h-3 mr-1 text-green-500 animate-pulse" />
                    <span>AICAMP 이교장 AI • 100% 브라우저 온디바이스</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-3 h-3 mr-1 text-blue-500 animate-pulse" />
                    <span>AICAMP 이교장 AI • 브라우저 AI 준비 중</span>
                  </>
                )}
              </div>
              
              {/* 모델 로딩 진행률 표시 */}
              {isModelLoading && (
                <div className="mt-2 px-4">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" 
                      style={{ width: `${modelLoadProgress * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-center text-xs text-gray-500 mt-1">
                    {modelLoadStatus}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AICampChatInterface; 