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
  Brain
} from 'lucide-react';

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

interface MCenterChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
}

const MCenterChatInterface: React.FC<MCenterChatInterfaceProps> = ({
  isOpen,
  onClose,
  onMinimize
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '안녕하세요! AI CAMP 교장 이후경입니다.\n\n28년간 현대그룹과 삼성생명에서 실무를 쌓고, 500여 개 기업을 직접 도우면서 얻은 경험에 최첨단 AI 기술을 접목해서 기업들이 실무에서 전략까지 정말 폭발적인 성장을 할 수 있도록 도와드리고 있어요.\n\n🚀 2025년 업데이트된 AI CAMP 서비스:\n• BM ZEN 사업분석 (신규사업 성공률 95%)\n• AI 생산성향상 (업무효율 40-60% 향상)\n• 공장/부동산 경매 (투자비 35-50% 절약)\n• 기술창업 지원 (평균 5억원 자금 확보)\n• 인증지원 (연간 5천만원 세제혜택)\n• 웹사이트 구축 (매출 300-500% 증대)\n• AI 역량진단 (무료 온라인 진단)\n\n🎓 신규 교육 프로그램:\n• AI & n8n 자동화 교육\n• 부서별 맞춤형 교육 (기획관리, 영업/마케팅, 연구개발, 생산/제조, 고객서비스)\n• 경영진 특화 교육\n\n어떤 도움이 필요하신지 편하게 말씀해주세요!',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

      // 세계최고 이후경경영지도사 AI 상담 시스템 API 호출 함수
  const callMCenterAPI = async (userQuery: string): Promise<{ response: string; buttons?: Array<{ text: string; url: string; style: string; icon: string }> }> => {
    try {
      console.log('🧠 세계최고 이후경경영지도사 AI 호출 시작:', { 
        message: userQuery,
        messageLength: userQuery.length 
      });
      
      // 새로운 고도화된 이후경경영지도사 AI API 호출
      const response = await fetch('/api/chat-lee-hukyung', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userQuery,
          history: messages.map(msg => ({
            id: msg.id,
            content: msg.content,
            sender: msg.sender === 'user' ? 'user' : 'bot',
            timestamp: msg.timestamp
          }))
        })
      });

      console.log('📡 이후경경영지도사 AI 응답 상태:', { status: response.status, ok: response.ok });

      if (!response.ok) {
        throw new Error(`이후경경영지도사 AI Error: ${response.status}`);
      }

      const data = await response.json();
      
      console.log('이후경경영지도사 AI 응답 성공:', { 
        complexity: data.complexity,
        responseLength: data.responseLength || data.response?.length || 0,
        hasButtons: !!data.buttons,
        buttonsCount: data.buttons?.length || 0
      });
      
      if (data.response) {
        return {
          response: data.response,
          buttons: data.buttons || []
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('❌ 이후경경영지도사 AI 오류:', error);
      throw new Error('AI 분석 서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
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
      // 이후경 경영지도사 직접 응답 API 호출
      const aiResponseData = await callMCenterAPI(currentInput);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseData.response,
        sender: 'ai',
        timestamp: new Date(),
        buttons: aiResponseData.buttons || []
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI CAMP Response Error:', error);
      // 폴백 답변 제거 - 명확한 오류 메시지 표시
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'AI 분석 서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.\n\n직접 상담을 원하시면 010-9251-9743으로 연락주세요.',
        sender: 'ai',
        timestamp: new Date(),
        buttons: []
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
                        <Search className="w-4 h-4 text-blue-500 animate-spin" />
                        <span className="text-sm text-gray-500">이후경 경영지도사 분석 중...</span>
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
              
              {/* 세계최고 이후경경영지도사 AI 상태 표시 */}
              <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
                <Brain className="w-3 h-3 mr-1 text-purple-500 animate-pulse" />
                <span>AICAMP 이후경 AI • 28년 경험 + 고도화 분석 시스템</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MCenterChatInterface; 