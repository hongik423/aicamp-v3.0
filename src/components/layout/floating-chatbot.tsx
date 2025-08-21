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

  // 빠른 응답 버튼들
  const quickResponses = [
    { text: 'AI 역량진단이 궁금해요', icon: '🎯' },
    { text: 'n8n 자동화에 대해 알고 싶어요', icon: '🚀' },
    { text: '상담을 받고 싶어요', icon: '📞' },
    { text: '교육과정을 알아보고 싶어요', icon: '📚' }
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
        className={cn(
          "w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center",
          isOpen && "scale-90"
        )}
        aria-label="챗봇 열기"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* 챗봇 패널 */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
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
                <p className="text-sm">안녕하세요! 이교장의 AI 상담입니다.</p>
                <p className="text-xs mt-2">궁금한 점이 있으시면 언제든 물어보세요!</p>
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
                    "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                    message.sender === 'user'
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  )}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  
                  {/* 메타데이터 표시 */}
                  {message.metadata?.sourceLabel && (
                    <div className="text-xs opacity-70 mt-1">
                      {message.metadata.sourceLabel}
                    </div>
                  )}
                  
                  {/* 품질 점수 표시 */}
                  {message.metadata?.confidence && message.sender === 'bot' && (
                    <div className="text-xs opacity-70 mt-1">
                      품질: {message.metadata.confidence.toFixed(1)}점
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* 타이핑 인디케이터 */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 빠른 응답 버튼들 */}
          {showQuickResponses && messages.length === 0 && (
            <div className="p-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">빠른 질문:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickResponse(response.text)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 rounded px-2 py-1 transition-colors text-left"
                  >
                    <span className="mr-1">{response.icon}</span>
                    {response.text}
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