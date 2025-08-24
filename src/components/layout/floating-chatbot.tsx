'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Message, Button } from '@/types/chat';
import { X, Send, MessageCircle, Loader2, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingChatbotProps {
  className?: string;
}

export default function FloatingChatbot({ className = "" }: FloatingChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'error'>('connected');
  const [showQuickResponses, setShowQuickResponses] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [chatSession, setChatSession] = useState({
    id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    messageCount: 0,
    startTime: new Date()
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const tStartRef = useRef<number>(0);

  // 자동 스크롤
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // 음성 합성
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      speechSynthesis.speak(utterance);
    }
  };

  // 음성 중지
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  // 메시지 ID 생성
  const generateMessageId = () => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // 빠른 응답 버튼들 - 네비게이션 기능 포함
  const quickResponses = [
    { text: 'AI 역량진단이 궁금해요', icon: '🎯' },
    { text: 'n8n 자동화에 대해 알고 싶어요', icon: '🚀' },
    { text: '상담을 받고 싶어요', icon: '📞' },
    { text: '교육과정을 알아보고 싶어요', icon: '📚' },
    { text: 'AICAMP 서비스 전체보기', icon: '💼' },
    { text: 'AI 벤치마크 확인하기', icon: '📊' },
    { text: '세금계산기 사용하기', icon: '💰' },
    { text: '사업타당성 분석하기', icon: '📈' }
  ];

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    try {
      setConnectionStatus('connecting');
      setShowQuickResponses(false);
      
      const userMessage: Message = {
        id: generateMessageId(),
        content: message,
        sender: 'user',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);
      tStartRef.current = typeof performance !== 'undefined' ? performance.now() : Date.now();
      
      setChatSession(prev => ({
        ...prev,
        messageCount: prev.messageCount + 1
      }));

      // 🚀 완벽한 챗봇 답변 시스템 API 호출
      const response = await fetch('/api/chat-lee-hukyung', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          history: messages.slice(-10),
          sessionId: chatSession.id
        }),
      });

      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다.');
      }

      const data = await response.json();
      
      const totalEndTime = performance.now();
      const totalResponseTime = totalEndTime - tStartRef.current;
      
      // 품질 점수에 따른 소스 라벨
      const qualityScore = data.metadata?.qualityScore || 0;
      let sourceLabel = `— 이교장 완벽한 챗봇 시스템 [${totalResponseTime.toFixed(0)}ms]`;
      
      if (qualityScore >= 90) {
        sourceLabel = `🏆 이교장 최상급 AI 시스템 [${totalResponseTime.toFixed(0)}ms] (품질: ${qualityScore.toFixed(1)}점)`;
      } else if (qualityScore >= 80) {
        sourceLabel = `✅ 이교장 우수 AI 시스템 [${totalResponseTime.toFixed(0)}ms] (품질: ${qualityScore.toFixed(1)}점)`;
      } else if (data.metadata?.fallbackLevel > 0) {
        sourceLabel = `🔄 이교장 폴백 시스템 [${totalResponseTime.toFixed(0)}ms]`;
      }

      const botMessage: Message = {
        id: generateMessageId(),
        content: data.response,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        metadata: {
          confidence: data.metadata?.qualityScore || 95,
          services: data.buttons || [],
          intent: 'ai_consultation',
          sentiment: 'positive',
          sourceLabel,
          processingTime: totalResponseTime,
          fallbackLevel: data.metadata?.fallbackLevel || 0,
          emotionalAnalysis: data.metadata?.emotionalAnalysis,
          contextAnalysis: data.metadata?.contextAnalysis
        }
      };
      
      setMessages(prev => [...prev, botMessage]);
      setConnectionStatus('connected');
      
      // 자동 음성 읽기 (옵션)
      if (isSpeaking) {
        speakText(data.response);
      }

      // 메트릭 로깅
      console.log(`🚀 완벽한 챗봇 응답 완료:`, {
        responseTime: totalResponseTime.toFixed(2) + 'ms',
        qualityScore: qualityScore.toFixed(1) + '점',
        fallbackLevel: data.metadata?.fallbackLevel || 0,
        messageLength: data.response.length,
        sessionId: chatSession.id
      });
      
    } catch (error) {
      console.error('❌ 챗봇 응답 오류:', error);
      setConnectionStatus('error');
      
      const errorMessage: Message = {
        id: generateMessageId(),
        content: '죄송합니다. 일시적으로 응답을 생성하는데 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        metadata: {
          confidence: 0,
          services: [],
          intent: 'error',
          sentiment: 'neutral'
        }
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickResponse = (response: string) => {
    handleSendMessage(response);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      stopSpeaking();
    }
    setIsSpeaking(!isSpeaking);
  };

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)}>
      {/* 챗봇 토글 버튼 */}
      <button
        onClick={toggleChat}
        data-floating-chatbot
        className={cn(
          "w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center chatbot-button",
          isOpen && "scale-90"
        )}
        aria-label="챗봇 열기"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* 챗봇 패널 - 고도화된 디자인 */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col animate-slideUp chatbot-panel">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={16} />
              </div>
              <div>
                <h3 className="font-semibold">이교장의 AI 상담</h3>
                <p className="text-xs opacity-90">28년 경험의 AI 전문가</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleSpeaking}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label={isSpeaking ? "음성 끄기" : "음성 켜기"}
              >
                {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button
                onClick={toggleChat}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="챗봇 닫기"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-sm font-semibold">안녕하세요! 이교장의 AI 상담입니다.</p>
                <p className="text-xs mt-2">28년 경험을 바탕으로 AICAMP의 모든 서비스를 상세히 안내해드립니다!</p>
                <div className="mt-4 text-left bg-blue-50 rounded-lg p-3">
                  <p className="text-xs font-semibold text-blue-900 mb-2">💡 이런 것들을 물어보세요:</p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• AI 역량진단은 어떻게 받나요?</li>
                    <li>• ChatGPT 교육 커리큘럼이 궁금해요</li>
                    <li>• n8n으로 뭘 자동화할 수 있나요?</li>
                    <li>• 정부지원은 얼마나 받을 수 있나요?</li>
                    <li>• 세금계산기는 어디에 있나요?</li>
                  </ul>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "message-bubble text-sm",
                    message.sender === 'user'
                      ? "bg-blue-600 text-white user"
                      : "bg-gray-100 text-gray-800 bot"
                  )}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  
                  {/* 액션 버튼 표시 */}
                  {message.metadata?.services && message.metadata.services.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {message.metadata.services.map((service: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => window.location.href = service.url}
                          className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          {service.text}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* 메타데이터 표시 */}
                  {message.metadata?.sourceLabel && (
                    <div className="text-xs opacity-70 mt-1">
                      {message.metadata.sourceLabel}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* 타이핑 인디케이터 */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-3 py-2">
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 빠른 응답 버튼들 - 개선된 디자인 */}
          {showQuickResponses && messages.length === 0 && (
            <div className="p-4 border-t border-gray-200 bg-gradient-to-t from-gray-50 to-white">
              <p className="text-xs font-semibold text-gray-700 mb-3">🚀 빠른 메뉴 (클릭하세요)</p>
              <div className="quick-response-grid">
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickResponse(response.text)}
                    className="text-xs bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-300 rounded-lg px-3 py-2 transition-all duration-200 text-left shadow-sm hover:shadow-md transform hover:scale-105"
                  >
                    <span className="text-base mr-1">{response.icon}</span>
                    <span className="font-medium">{response.text.replace('이 궁금해요', '').replace('에 대해 알고 싶어요', '').replace('을 받고 싶어요', '').replace('을 알아보고 싶어요', '').replace('하기', '')}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 입력 영역 */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className={cn(
                  "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                  isTyping && "animate-pulse"
                )}
              >
                {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
            
            {/* 연결 상태 표시 */}
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  connectionStatus === 'connected' && "bg-green-500",
                  connectionStatus === 'connecting' && "bg-yellow-500",
                  connectionStatus === 'error' && "bg-red-500"
                )}></div>
                <span>
                  {connectionStatus === 'connected' && '연결됨'}
                  {connectionStatus === 'connecting' && '응답 생성 중...'}
                  {connectionStatus === 'error' && '연결 오류'}
                </span>
              </div>
              <span>메시지 {chatSession.messageCount}개</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 