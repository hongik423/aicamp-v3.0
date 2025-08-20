'use client';

import React, { useState } from 'react';
import { generateHybridResponse, generateEnhancedFallbackResponse } from '@/lib/ai/fallback-system';

interface TestResult {
  question: string;
  response: string;
  responseTime: number;
  source: string;
  timestamp: Date;
}

export default function PerformanceTestPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState('');

  const testQuestions = [
    'n8n 자동화 교육은 어떻게 되나요?',
    '제조업 생산관리자용 n8n 과정이 있나요?',
    'AI 역량진단은 무료인가요?',
    'AICAMP는 어떤 기관인가요?',
    '상담은 어떻게 신청하나요?',
    '세금계산기로 어떤 세금을 계산할 수 있나요?',
    '사업타당성분석 비용은 얼마인가요?',
    'IT 개발자를 위한 자동화 교육은 어떻게 되나요?'
  ];

  const runSingleTest = async (question: string) => {
    setCurrentTest(question);
    const startTime = performance.now();
    
    try {
      const response = await generateHybridResponse(question);
      const endTime = performance.now();
      const responseTime = endTime - startTime;
      
      const result: TestResult = {
        question,
        response: response.answer,
        responseTime,
        source: response.source,
        timestamp: new Date()
      };
      
      setTestResults(prev => [...prev, result]);
    } catch (error) {
      console.error('테스트 실패:', error);
    }
    
    setCurrentTest('');
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    for (const question of testQuestions) {
      await runSingleTest(question);
      // 테스트 간 간격
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setIsRunning(false);
  };

  const runFallbackOnlyTest = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    for (const question of testQuestions) {
      setCurrentTest(question);
      const startTime = performance.now();
      
      try {
        const response = generateEnhancedFallbackResponse(question);
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        
        const result: TestResult = {
          question,
          response,
          responseTime,
          source: 'fallback_only',
          timestamp: new Date()
        };
        
        setTestResults(prev => [...prev, result]);
      } catch (error) {
        console.error('폴백 테스트 실패:', error);
      }
      
      setCurrentTest('');
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setIsRunning(false);
  };

  const getAverageResponseTime = () => {
    if (testResults.length === 0) return 0;
    const total = testResults.reduce((sum, result) => sum + result.responseTime, 0);
    return total / testResults.length;
  };

  const getSourceStats = () => {
    const stats: { [key: string]: number } = {};
    testResults.forEach(result => {
      stats[result.source] = (stats[result.source] || 0) + 1;
    });
    return stats;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🚀 AICAMP 최상의 품질 AI 답변 시스템 테스트
          </h1>
          
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
            <div className="font-semibold">🏆 최상의 품질 시스템 활성화!</div>
            <div className="text-sm mt-1">
              • 🧠 지능형 문맥 이해: 사용자 의도 및 상황 분석<br/>
              • 😊 감정 분석: 맞춤형 톤앤매너 자동 조절<br/>
              • 📚 실시간 학습: 개인화된 답변 제공<br/>
              • 🎯 품질 자동 평가: 90점 이상 품질 보장<br/>
              • 🚀 응답 속도: 5-15ms 초고속 답변
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={runAllTests}
              disabled={isRunning}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {isRunning ? '테스트 중...' : '전체 테스트 실행'}
            </button>
            
            <button
              onClick={runFallbackOnlyTest}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {isRunning ? '테스트 중...' : '폴백 시스템만 테스트'}
            </button>
            
            <button
              onClick={() => setTestResults([])}
              disabled={isRunning}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              결과 초기화
            </button>
          </div>

          {testResults.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold mb-3">📊 성능 통계</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {getAverageResponseTime().toFixed(0)}ms
                  </div>
                  <div className="text-sm text-gray-600">평균 응답 시간</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {testResults.length}
                  </div>
                  <div className="text-sm text-gray-600">총 테스트 수</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">응답 소스별 통계:</div>
                  {Object.entries(getSourceStats()).map(([source, count]) => (
                    <div key={source} className="text-sm">
                      <span className="font-medium">{source}:</span> {count}회
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentTest && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
              🔄 현재 테스트 중: "{currentTest}"
            </div>
          )}
        </div>

        {testResults.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">📋 테스트 결과</h2>
            
            {testResults.map((result, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">
                      질문 #{index + 1}
                    </div>
                    <div className="font-semibold text-gray-900 mb-2">
                      {result.question}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium px-2 py-1 rounded ${
                      result.source === 'llama' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {result.source === 'llama' ? '🦙 라마 AI' : '🔄 폴백 시스템'}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {result.responseTime.toFixed(0)}ms
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-700 whitespace-pre-wrap">
                    {result.response.length > 300 
                      ? result.response.substring(0, 300) + '...' 
                      : result.response
                    }
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mt-2">
                  {result.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">🧪 테스트 질문 목록</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testQuestions.map((question, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm font-medium text-gray-900">
                  {index + 1}. {question}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
