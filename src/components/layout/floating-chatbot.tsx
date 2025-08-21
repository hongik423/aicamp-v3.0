'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, MessageCircle, X, Bot, User, Cpu, Download, AlertTriangle, Brain } from 'lucide-react';
import { getImagePath, getSessionLeaderImage, getChatbotLeaderImage } from '@/lib/utils';
import { 
  BrowserLLM, 
  getGlobalBrowserLLM, 
  LEE_KYOJANG_SYSTEM_PROMPT 
} from '@/lib/ai/browser-llm';
import { generateHybridResponse, generateEnhancedFallbackResponse } from '@/lib/ai/fallback-system';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  buttons?: Array<{
    text: string;
    url: string;
    style: string;
    icon: string;
  }>;
}

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 브라우저 LLM 상태 관리
  const [browserLLM, setBrowserLLM] = useState<BrowserLLM | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [modelLoadProgress, setModelLoadProgress] = useState(0);
  const [modelLoadStatus, setModelLoadStatus] = useState('');
  const [browserSupport, setBrowserSupport] = useState<{ supported: boolean; issues: string[] } | null>(null);
  const [useServerAI, setUseServerAI] = useState(false);
  
  // 🔥 단순화된 드래그 시스템
  const [position, setPosition] = useState({ x: 20, y: 120 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 20, y: 120 });
  
  // SSR 안전한 화면 크기 상태 관리
  const [screenSize, setScreenSize] = useState({ width: 1024, height: 768 });
  const [isMobile, setIsMobile] = useState(false);

  // 환영 메시지 추가 (Hydration 안전)
  const [isClient, setIsClient] = useState(false);
  const [pagePinned, setPagePinned] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 페이지 전용 떠있는 버튼(핀) 상태 복원
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = window.sessionStorage.getItem('aicamp_chatbot_pinned');
      setPagePinned(saved === 'true');
    }
  }, []);

  useEffect(() => {
    if (isClient && isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome-message-001',
        content: `안녕하세요! AICAMP AI교장 이후경입니다!

28년간 500개 이상 기업의 성장을 함께해온 경험을 바탕으로 상담해드리겠습니다.

저희 AICAMP에서 전문적으로 상담해드리는 분야들이에요.

BM ZEN 사업분석으로는 생산성을 42% 향상시키고 ROI를 290% 달성한 케이스들이 많아요. AI 생산성향상은 20-99인 기업이라면 정부에서 100% 지원해주니까 완전 무료로 받으실 수 있어요.

정책자금 확보는 25년 노하우로 평균 5억원 정도 정부지원을 확보해드리고, 기술사업화나 창업 지원으로는 체계적인 전략으로 성공률을 높여드리고 있어요.

인증지원 쪽은 ISO, 벤처, 연구소 등을 통해 연간 5천만원 세제혜택을 받을 수 있게 도와드리고, 웹사이트 구축으로는 온라인 매출을 300-500% 증대시켜드려요.

세금계산기도 11종류나 준비해서 2024년 최신 세법을 완벽하게 반영했어요.

특히 n8n 자동화 교육은 업종별, 직군별로 맞춤형 커리큘럼을 제공합니다. 제조업, IT, 금융, 유통 등 다양한 업종의 프로세스 자동화를 학습할 수 있어요.

궁금한 것 있으시면 자유롭게 물어보세요! 직접 상담받으시려면 010-9251-9743으로 전화주셔도 돼요.

예를 들어 "n8n 자동화 교육은 어떻게 되나요?", "제조업 생산관리자용 n8n 과정이 있나요?", "AI 역량진단은 무료인가요?" 이런 질문들 언제든 환영해요.

🚀 최상의 품질 AI 시스템 (지능형 문맥 이해 + 감정 분석 + 실시간 학습 + 품질 자동 평가)`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isClient, isOpen, messages.length]);

  // 브라우저 호환성 체크 및 모델 사전 로딩
  useEffect(() => {
    // 페이지 로드 시 즉시 호환성 체크 (챗봇 열기 전에)
    const support = BrowserLLM.checkBrowserSupport();
    setBrowserSupport(support);
    
    // Ollama 기반이므로 HTTPS 제한 완화
    const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';
    const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';
    
    if (support.supported && (isHttps || isLocalhost)) {
      // 백그라운드에서 사전 로딩 시작 (사용자가 기다리지 않음)
      console.log('🚀 브라우저 AI 백그라운드 사전 로딩 시작');
      initializeBrowserLLM();
    } else {
      console.log('🔄 서버 AI 모드로 전환:', { isHttps, isLocalhost, supported: support.supported });
      setUseServerAI(true);
    }
  }, []); // 페이지 로드 시 한 번만 실행

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
      
      console.log('✅ 플로팅 챗봇 브라우저 LLM 초기화 완료');
      
    } catch (error) {
      console.error('❌ 플로팅 챗봇 브라우저 LLM 초기화 실패:', error);
      setModelLoadStatus(`브라우저 AI 초기화 실패 - 서버 AI로 전환`);
      
      // 브라우저 AI 실패 시 서버 AI로 자동 전환
      console.log('🔄 서버 AI 모드로 자동 전환');
      setUseServerAI(true);
      
      // 사용자에게 친화적인 메시지 표시
      setTimeout(() => {
        setModelLoadStatus('서버 AI 모드로 전환 완료 - 상담 가능');
      }, 1000);
    } finally {
      setIsModelLoading(false);
    }
  };

  // 메시지 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ESC 키로 챗봇 창 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        // 모바일 진동 피드백
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // 🔥 개선된 드래그 이벤트 핸들러들
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 모바일 진동 피드백
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialPosition({ x: position.x, y: position.y });
  }, [position.x, position.y]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    
    // 모바일 진동 피드백
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setInitialPosition({ x: position.x, y: position.y });
  }, [position.x, position.y]);

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    let clientX, clientY;
    if (e instanceof MouseEvent) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    
    // 드래그 거리 계산
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    
    // 새 위치 계산 (right 기준이므로 X는 반대로)
    const newX = initialPosition.x - deltaX;
    const newY = initialPosition.y - deltaY;
    
    // 화면 경계 제한
    const buttonSize = isMobile ? 60 : 70;
    const minX = 10;
    const maxX = screenSize.width - buttonSize - 10;
    const minY = 10;
    const maxY = screenSize.height - buttonSize - 10;
    
    // 경계 내에서만 이동
    const finalX = Math.max(minX, Math.min(maxX, newX));
    const finalY = Math.max(minY, Math.min(maxY, newY));
    
    // 오류신고 버튼과의 충돌 방지 (우하단 100x100 영역)
    const errorButtonArea = {
      left: screenSize.width - 110,
      right: screenSize.width - 10,
      top: screenSize.height - 110,
      bottom: screenSize.height - 10
    };
    
    const chatbotArea = {
      left: screenSize.width - finalX - buttonSize,
      right: screenSize.width - finalX,
      top: screenSize.height - finalY - buttonSize,
      bottom: screenSize.height - finalY
    };
    
    // 충돌 감지 및 회피
    const isColliding = (
      chatbotArea.left < errorButtonArea.right &&
      chatbotArea.right > errorButtonArea.left &&
      chatbotArea.top < errorButtonArea.bottom &&
      chatbotArea.bottom > errorButtonArea.top
    );
    
    let adjustedX = finalX;
    let adjustedY = finalY;
    
    if (isColliding) {
      // 충돌 시 위쪽 또는 왼쪽으로 이동
      if (finalY > screenSize.height / 2) {
        adjustedY = Math.min(finalY, screenSize.height - 160);
      } else {
        adjustedX = Math.max(finalX, 120);
      }
    }
    
    setPosition({ x: adjustedX, y: adjustedY });
  }, [isDragging, dragStart, initialPosition, isMobile, screenSize]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // 모바일 진동 피드백
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
    
    // 경계 재조정
    const buttonSize = isMobile ? 60 : 70;
    const minX = 10;
    const maxX = screenSize.width - buttonSize - 10;
    const minY = 10;
    const maxY = screenSize.height - buttonSize - 10;
    
    setPosition(prev => ({
      x: Math.max(minX, Math.min(maxX, prev.x)),
      y: Math.max(minY, Math.min(maxY, prev.y))
    }));
  }, [isDragging, isMobile, screenSize]);

  // 🔥 전역 마우스 및 터치 이벤트 리스너
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMouseMove, { passive: false });
      document.addEventListener('touchend', handleMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
      document.body.style.touchAction = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
      document.body.style.touchAction = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // 화면 크기 감지 (SSR 안전)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateScreenSize = () => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
        setIsMobile(window.innerWidth < 768);
      };

      // 초기 설정
      updateScreenSize();

      // 리사이즈 이벤트 리스너
      window.addEventListener('resize', updateScreenSize);
      return () => window.removeEventListener('resize', updateScreenSize);
    }
  }, []);

  // 🚀 최상의 품질 AI 상담 시스템 (지능형 문맥 이해 + 감정 분석 + 실시간 학습)
  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content: message.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const totalStartTime = performance.now();
    const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    try {
      // 🚀 최상의 품질 시스템: 지능형 문맥 이해 + 감정 분석 + 실시간 학습
      
      // 1차: 최상의 품질 AI 답변 (지능형 분석)
      console.log('🚀 최상의 품질 AI 시스템 즉시 응답');
      const analysisStartTime = performance.now();
      
      const enhancedResponse = await generateHybridResponse(message.trim(), undefined, sessionId);
      
      const analysisEndTime = performance.now();
      const analysisResponseTime = analysisEndTime - analysisStartTime;
      
      console.log(`🚀 최상의 품질 응답 완료: ${analysisResponseTime.toFixed(2)}ms (품질: ${enhancedResponse.qualityMetrics?.overallScore || 0}점)`);

      // 응답 메시지 생성 (즉시 표시)
      const buttons = [
        { text: '🎯 AI 역량진단', url: '/ai-diagnosis', style: 'primary', icon: '🎯' },
        { text: '📞 상담 예약', url: '/consultation', style: 'secondary', icon: '📞' },
        { text: '📚 교육과정 보기', url: '/services/ai-curriculum', style: 'outline', icon: '📚' }
      ];

      const totalEndTime = performance.now();
      const totalResponseTime = totalEndTime - totalStartTime;
      
      // 품질 점수에 따른 소스 라벨
      const qualityScore = enhancedResponse.qualityMetrics?.overallScore || 0;
      let sourceLabel = `— 이교장 최상의 품질 AI 시스템 [${analysisResponseTime.toFixed(0)}ms]`;
      
      if (qualityScore >= 90) {
        sourceLabel = `🏆 이교장 최상급 AI 시스템 [${analysisResponseTime.toFixed(0)}ms] (품질: ${qualityScore}점)`;
      } else if (qualityScore >= 80) {
        sourceLabel = `✅ 이교장 우수 AI 시스템 [${analysisResponseTime.toFixed(0)}ms] (품질: ${qualityScore}점)`;
      }

      const botMessage: Message = {
        id: `bot-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        content: `${enhancedResponse.answer}\n\n${sourceLabel}\n🚀 총 응답 시간: ${totalResponseTime.toFixed(0)}ms`,
        sender: 'bot',
        timestamp: new Date(),
        buttons
      };
      
      setMessages(prev => [...prev, botMessage]);

      // 2차: 백그라운드에서 라마 AI 시도 (선택적)
      // 사용자는 이미 최상의 품질 답변을 받았으므로 백그라운드에서 실행
      setTimeout(async () => {
        try {
          // 라마 AI 상태 확인 (빠른 체크)
          const healthCheck = await fetch('/api/ollama/health', { 
            method: 'GET',
            signal: AbortSignal.timeout(1000) // 1초 타임아웃
          });
          
          if (healthCheck.ok) {
            console.log('🦙 백그라운드 라마 AI 시도');
            
            const response = await fetch('/api/chat-lee-hukyung', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                message: message.trim(),
                history: [] 
              }),
              signal: AbortSignal.timeout(3000) // 3초 타임아웃
            });

            if (response.ok) {
              const data = await response.json();
              console.log('🦙 백그라운드 라마 AI 응답 완료 (사용자는 이미 최상의 품질 답변 받음)');
              
              // 선택적: 더 나은 답변이 있다면 업데이트 (사용자 설정에 따라)
              // 현재는 로그만 남김 (사용자 경험 방해 안함)
            }
          }
        } catch (error) {
          console.log('🔄 백그라운드 라마 AI 실패 (문제없음, 사용자는 이미 최상의 품질 답변 받음)');
        }
      }, 100); // 100ms 후 백그라운드 실행

    } catch (error) {
      console.error('❌ 최상의 품질 시스템 실패:', error);
      
      // 최종 폴백: 기본 답변
      console.log('🔄 최종 폴백: 기본 답변');
      const fallbackStartTime = performance.now();
      
      const fallbackResponse = generateEnhancedFallbackResponse(message.trim());
      
      const fallbackEndTime = performance.now();
      const fallbackResponseTime = fallbackEndTime - fallbackStartTime;
      const totalEndTime = performance.now();
      const totalResponseTime = totalEndTime - totalStartTime;
      
      const fallbackMessage: Message = {
        id: `fallback-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        content: `${fallbackResponse}\n\n— 이교장 기본 답변 시스템 [${fallbackResponseTime.toFixed(0)}ms]\n🚀 총 응답 시간: ${totalResponseTime.toFixed(0)}ms`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // 폴백 답변 완전 제거 - AI 분석 실패 시 오류 메시지만 표시

  return (
    <>
      {/* 페이지 전용 떠있는(핀) 토글 버튼 */}
      <button
        onClick={() => {
          const next = !pagePinned;
          setPagePinned(next);
          if (typeof window !== 'undefined') {
            window.sessionStorage.setItem('aicamp_chatbot_pinned', String(next));
          }
        }}
        title={pagePinned ? '페이지 전용 버튼 해제' : '페이지 전용 버튼 고정'}
        style={{
          position: 'fixed',
          bottom: '16px',
          left: '16px',
          zIndex: 999997,
          borderRadius: '9999px',
          padding: '10px 14px',
          background: pagePinned ? '#2563EB' : '#E5E7EB',
          color: pagePinned ? '#fff' : '#111827',
          boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
        }}
      >
{pagePinned ? '고정됨' : '고정'}
      </button>
      {/* 🔥 드래그 가능한 플로팅 챗봇 버튼 */}
      <div
        id="floating-chatbot-button"
        className={`${isOpen ? 'hidden' : 'block'} ${isDragging ? 'scale-110' : ''} touch-target mobile-optimized`}
        style={{
          position: 'fixed',
          bottom: pagePinned ? '90px' : `${position.y}px`,
          right: pagePinned ? '16px' : `${position.x}px`,
          width: isMobile ? '64px' : '70px',
          height: isMobile ? '64px' : '70px',
          backgroundColor: isDragging ? '#7B1FA2' : '#1976D2',
          borderRadius: '50%',
          cursor: isDragging ? 'grabbing' : 'grab',
          zIndex: 999999,
          display: isOpen ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isDragging 
            ? '0 8px 32px rgba(123, 31, 162, 0.6), 0 0 0 4px rgba(123, 31, 162, 0.2)' 
            : '0 4px 20px rgba(25, 118, 210, 0.4)',
          border: '3px solid white',
          transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          userSelect: 'none',
          transform: isDragging ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
          filter: isDragging ? 'brightness(1.1)' : 'brightness(1)',
          minWidth: '44px',
          minHeight: '44px',
          touchAction: 'manipulation',
        }}
        onClick={(e) => {
          if (!isDragging) {
            setIsOpen(true);
            // 모바일 진동 피드백
            if (navigator.vibrate) {
              navigator.vibrate(100);
            }
          }
        }}
        onMouseDown={pagePinned ? undefined : handleMouseDown}
        onTouchStart={pagePinned ? undefined : handleTouchStart}
        onMouseEnter={(e) => {
          if (!isDragging && !isMobile) {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.backgroundColor = '#7B1FA2';
          }
        }}
        onMouseLeave={(e) => {
          if (!isDragging && !isMobile) {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = '#1976D2';
          }
        }}
        data-floating-chatbot="true"
      >
        {/* AI교장 사진 */}
        <img
          src={getSessionLeaderImage()}
          alt="AI교장 이후경"
          style={{
            width: isMobile ? '50px' : '60px',
            height: isMobile ? '50px' : '60px',
            borderRadius: '50%',
            objectFit: 'cover',
            pointerEvents: 'none',
            transition: 'all 0.3s ease',
            filter: isDragging ? 'brightness(1.2)' : 'brightness(1)'
          }}
        />
        
        {/* 드래그 인디케이터 */}
        {isDragging && (
          <div
            style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '50%',
              border: '2px dashed rgba(255, 255, 255, 0.8)',
              animation: 'spin 2s linear infinite',
              pointerEvents: 'none'
            }}
          />
        )}
        
        {/* 펄스 애니메이션 */}
        {!isDragging && (
          <div
            style={{
              position: 'absolute',
              inset: '-8px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(25, 118, 210, 0.3) 0%, transparent 70%)',
              animation: 'pulse 3s infinite',
              pointerEvents: 'none'
            }}
          />
        )}
        
        {/* 모바일 터치 가이드 */}
        {isDragging && isMobile && (
          <div
            style={{
              position: 'absolute',
              bottom: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 1000000
            }}
          >
드래그 중...
          </div>
        )}
        
        {/* 데스크탑 툴팁 */}
        {!isMobile && (
          <div
            style={{
              position: 'absolute',
              bottom: '80px',
              right: '0',
              backgroundColor: '#333',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none'
            }}
            className="tooltip"
          >
{isDragging ? '드래그 중...' : '드래그로 이동'}
          </div>
        )}
      </div>

      {/* 채팅창 */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: isMobile ? '10px' : `${Math.min(position.y, screenSize.height - 520)}px`,
            right: isMobile ? '10px' : `${Math.min(position.x, screenSize.width - 400)}px`,
            left: isMobile ? '10px' : 'auto',
            width: isMobile ? 'calc(100vw - 20px)' : '380px',
            height: isMobile ? 'calc(100vh - 100px)' : '500px',
            maxHeight: isMobile ? '600px' : '500px',
            backgroundColor: 'white',
            borderRadius: isMobile ? '16px' : '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            zIndex: 999998,
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #e2e8f0'
          }}
        >
          {/* 헤더 - 시인성 개선 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1976D2 0%, #7B1FA2 100%)',
              color: 'white',
              padding: isMobile ? '20px 16px' : '16px',
              borderRadius: isMobile ? '16px 16px 0 0' : '12px 12px 0 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minHeight: isMobile ? '70px' : '60px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={getChatbotLeaderImage()}
                alt="AI교장"
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  AI교장
                </div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>
                  이후경 • 28년 경험
                </div>
              </div>
            </div>
            
            {/* 개선된 X 버튼 - 모바일 친화적 */}
            <button
              onClick={() => {
                setIsOpen(false);
                // 모바일 진동 피드백
                if (navigator.vibrate) {
                  navigator.vibrate(50);
                }
              }}
              style={{
                width: isMobile ? '36px' : '32px',
                height: isMobile ? '36px' : '32px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: isMobile ? '20px' : '18px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
              title="채팅창 닫기"
            >
              ✕
            </button>
          </div>

          {/* 메시지 영역 - 시인성 개선 */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              backgroundColor: '#ffffff',
              backgroundImage: 'linear-gradient(to bottom, #f8f9ff 0%, #ffffff 100%)'
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '14px 16px',
                    borderRadius: '16px',
                    backgroundColor: message.sender === 'user' 
                      ? 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)' 
                      : '#ffffff',
                    background: message.sender === 'user' 
                      ? 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)' 
                      : '#ffffff',
                    color: message.sender === 'user' ? '#ffffff' : '#1a1a1a',
                    fontSize: '14px',
                    fontWeight: message.sender === 'user' ? '500' : '400',
                    lineHeight: '1.5',
                    boxShadow: message.sender === 'user' 
                      ? '0 4px 12px rgba(25, 118, 210, 0.3)' 
                      : '0 2px 12px rgba(0, 0, 0, 0.08)',
                    border: message.sender === 'bot' ? '2px solid #f0f0f0' : 'none'
                  }}
                >
                  <div style={{ whiteSpace: 'pre-line' }}>
                    {message.content}
                  </div>
                  
                  {/* 🔥 상담신청/무료진단 버튼 렌더링 */}
                  {message.sender === 'bot' && message.buttons && message.buttons.length > 0 && (
                    <div style={{ 
                      marginTop: '16px', 
                      display: 'flex', 
                      gap: isMobile ? '8px' : '12px',
                      flexWrap: 'wrap',
                      alignItems: 'center'
                    }}>
                      {message.buttons.map((button, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            // 모바일 진동 피드백
                            if (navigator.vibrate) {
                              navigator.vibrate(100);
                            }
                            // 페이지 이동
                            window.open(button.url, '_self');
                          }}
                          style={{
                            padding: isMobile ? '12px 16px' : '10px 14px',
                            backgroundColor: button.style === 'primary' ? '#1976D2' : '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            fontSize: isMobile ? '14px' : '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease',
                            boxShadow: button.style === 'primary' 
                              ? '0 3px 12px rgba(25, 118, 210, 0.4)' 
                              : '0 3px 12px rgba(40, 167, 69, 0.4)',
                            minHeight: isMobile ? '40px' : '36px',
                            whiteSpace: 'nowrap'
                          }}
                          onMouseEnter={(e) => {
                            if (!isMobile) {
                              e.currentTarget.style.transform = 'scale(1.05)';
                              e.currentTarget.style.backgroundColor = button.style === 'primary' ? '#1565C0' : '#218838';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isMobile) {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.backgroundColor = button.style === 'primary' ? '#1976D2' : '#28a745';
                            }
                          }}
                          onTouchStart={(e) => {
                            e.currentTarget.style.transform = 'scale(0.95)';
                            // 모바일 진동 피드백
                            if (navigator.vibrate) {
                              navigator.vibrate(50);
                            }
                          }}
                          onTouchEnd={(e) => {
                            setTimeout(() => {
                              e.currentTarget.style.transform = 'scale(1)';
                            }, 150);
                          }}
                        >
                          <span style={{ fontSize: isMobile ? '16px' : '14px' }}>
                            {button.icon}
                          </span>
                          <span>{button.text}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <div
                    style={{
                      fontSize: '11px',
                      marginTop: '8px',
                      opacity: message.sender === 'user' ? 0.8 : 0.6,
                      fontWeight: '400'
                    }}
                  >
                    {message.timestamp.toLocaleTimeString('ko-KR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                    border: '2px solid #f0f0f0'
                  }}
                >
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <div style={{ 
                      width: '10px', 
                      height: '10px', 
                      backgroundColor: '#1976D2', 
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite'
                    }}></div>
                    <div style={{ 
                      width: '10px', 
                      height: '10px', 
                      backgroundColor: '#1976D2', 
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite 0.2s'
                    }}></div>
                    <div style={{ 
                      width: '10px', 
                      height: '10px', 
                      backgroundColor: '#1976D2', 
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite 0.4s'
                    }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 입력 영역 - 시인성 개선 */}
          <div
            style={{
              padding: isMobile ? '20px 16px' : '16px',
              borderTop: '2px solid #f0f0f0',
              backgroundColor: '#fafafa',
              borderRadius: isMobile ? '0 0 16px 16px' : '0 0 12px 12px',
              minHeight: isMobile ? '80px' : '60px'
            }}
          >
            <div style={{ display: 'flex', gap: isMobile ? '12px' : '8px' }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isMobile ? "메시지 입력..." : "메시지를 입력하세요..."}
                style={{
                  flex: 1,
                  padding: isMobile ? '16px 20px' : '14px 18px',
                  border: '2px solid #e8e8e8',
                  borderRadius: '25px',
                  fontSize: isMobile ? '16px' : '14px',
                  outline: 'none',
                  minHeight: isMobile ? '48px' : '44px',
                  backgroundColor: '#ffffff',
                  color: '#1a1a1a',
                  fontWeight: '400',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (inputValue.trim()) {
                      handleSendMessage(inputValue);
                    }
                  }
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#1976D2';
                  e.target.style.boxShadow = '0 2px 12px rgba(25, 118, 210, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e8e8e8';
                  e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                }}
                disabled={isTyping}
              />
              <button
                onClick={() => {
                  if (inputValue.trim()) {
                    handleSendMessage(inputValue);
                  }
                }}
                disabled={!inputValue.trim() || isTyping}
                style={{
                  width: isMobile ? '52px' : '48px',
                  height: isMobile ? '52px' : '48px',
                  backgroundColor: inputValue.trim() && !isTyping ? '#1976D2' : '#d0d0d0',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: inputValue.trim() && !isTyping ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isMobile ? '20px' : '18px',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease',
                  boxShadow: inputValue.trim() && !isTyping 
                    ? '0 4px 12px rgba(25, 118, 210, 0.3)' 
                    : '0 2px 6px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  if (inputValue.trim() && !isTyping) {
                    e.currentTarget.style.backgroundColor = '#1565C0';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (inputValue.trim() && !isTyping) {
                    e.currentTarget.style.backgroundColor = '#1976D2';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
                title="메시지 전송"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS 애니메이션 */}
      <style jsx global>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        
        #floating-chatbot-button:hover .tooltip {
          opacity: 1 !important;
        }
      `}</style>
    </>
  );
} 