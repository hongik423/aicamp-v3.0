'use client';

import React, { useState, useEffect } from 'react';
import BookPromotionBanner from '@/components/layout/BookPromotionBanner';
import { Smartphone, Tablet, Monitor, Check, X, RotateCcw } from 'lucide-react';

export default function TestMobileBannerPage() {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [testResults, setTestResults] = useState<{[key: string]: boolean}>({});
  const [currentTest, setCurrentTest] = useState(0);

  const tests = [
    {
      id: 'auto-appear',
      name: '3초 후 자동 등장',
      description: '페이지 로드 후 3초 뒤에 배너가 나타나는지 확인',
      category: '기본 기능'
    },
    {
      id: 'touch-close',
      name: '터치로 닫기',
      description: '배경을 터치하여 배너를 닫을 수 있는지 확인',
      category: '터치 이벤트'
    },
    {
      id: 'button-touch',
      name: '버튼 터치 반응',
      description: '터치 시 버튼이 적절히 반응하는지 확인 (44px 이상 터치 영역)',
      category: '터치 이벤트'
    },
    {
      id: 'responsive-layout',
      name: '반응형 레이아웃',
      description: '다양한 화면 크기에서 레이아웃이 적절히 조정되는지',
      category: '반응형'
    },
    {
      id: 'text-readability',
      name: '텍스트 가독성',
      description: '작은 화면에서도 텍스트가 읽기 쉬운지 확인',
      category: '반응형'
    },
    {
      id: 'image-scaling',
      name: '이미지 스케일링',
      description: '책 표지 이미지가 화면 크기에 맞게 조정되는지',
      category: '반응형'
    },
    {
      id: 'performance',
      name: '모바일 성능',
      description: '애니메이션이 부드럽고 성능 이슈가 없는지',
      category: '성능'
    },
    {
      id: 'reduced-motion',
      name: '모션 감소 지원',
      description: '접근성 설정에 따른 애니메이션 감소',
      category: '접근성'
    }
  ];

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) setDeviceType('mobile');
      else if (width < 1024) setDeviceType('tablet');
      else setDeviceType('desktop');
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  const handleTestResult = (testId: string, result: boolean) => {
    setTestResults(prev => ({ ...prev, [testId]: result }));
  };

  const resetTests = () => {
    setTestResults({});
    setCurrentTest(0);
  };

  const getDeviceIcon = () => {
    switch (deviceType) {
      case 'mobile': return <Smartphone className="w-5 h-5" />;
      case 'tablet': return <Tablet className="w-5 h-5" />;
      default: return <Monitor className="w-5 h-5" />;
    }
  };

  const completedTests = Object.keys(testResults).length;
  const passedTests = Object.values(testResults).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              📱 모바일 배너 테스트
            </h1>
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 rounded-lg">
              {getDeviceIcon()}
              <span className="text-sm font-medium text-blue-800 capitalize">
                {deviceType}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-600">{tests.length}</div>
              <div className="text-xs text-gray-600">총 테스트</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">{passedTests}</div>
              <div className="text-xs text-gray-600">통과</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-red-600">{completedTests - passedTests}</div>
              <div className="text-xs text-gray-600">실패</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-600">
                {completedTests > 0 ? Math.round((passedTests / completedTests) * 100) : 0}%
              </div>
              <div className="text-xs text-gray-600">성공률</div>
            </div>
          </div>
        </div>

        {/* 테스트 목록 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">테스트 체크리스트</h2>
            <button
              onClick={resetTests}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              초기화
            </button>
          </div>

          <div className="space-y-3">
            {tests.map((test, index) => {
              const isCompleted = testResults.hasOwnProperty(test.id);
              const isPassed = testResults[test.id];
              
              return (
                <div
                  key={test.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isCompleted
                      ? isPassed
                        ? 'border-green-200 bg-green-50'
                        : 'border-red-200 bg-red-50'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {test.category}
                        </span>
                        <h3 className="font-semibold text-gray-900">{test.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{test.description}</p>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleTestResult(test.id, true)}
                        className={`p-2 rounded-lg transition-colors ${
                          isPassed
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 hover:bg-green-100 text-gray-600'
                        }`}
                        title="테스트 통과"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleTestResult(test.id, false)}
                        className={`p-2 rounded-lg transition-colors ${
                          isCompleted && !isPassed
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 hover:bg-red-100 text-gray-600'
                        }`}
                        title="테스트 실패"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 테스트 가이드 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 테스트 가이드</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">모바일 특화 테스트</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 터치 영역이 44px 이상인지 확인</li>
                <li>• 스와이프 제스처 지원 여부</li>
                <li>• 화면 회전 시 레이아웃 유지</li>
                <li>• 키보드 표시 시 레이아웃 적응</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">성능 테스트</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 애니메이션 부드러움 (60fps)</li>
                <li>• 배터리 소모 최소화</li>
                <li>• 메모리 사용량 적정성</li>
                <li>• CPU 사용률 모니터링</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 디바이스 시뮬레이션 */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📱 디바이스 시뮬레이션</h2>
          
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={() => {
                document.documentElement.style.width = '375px';
                document.documentElement.style.height = '667px';
              }}
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-sm font-medium transition-colors"
            >
              iPhone SE (375×667)
            </button>
            <button
              onClick={() => {
                document.documentElement.style.width = '414px';
                document.documentElement.style.height = '896px';
              }}
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-sm font-medium transition-colors"
            >
              iPhone 11 Pro (414×896)
            </button>
            <button
              onClick={() => {
                document.documentElement.style.width = '768px';
                document.documentElement.style.height = '1024px';
              }}
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-sm font-medium transition-colors"
            >
              iPad (768×1024)
            </button>
            <button
              onClick={() => {
                document.documentElement.style.width = '';
                document.documentElement.style.height = '';
              }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
            >
              원래 크기로
            </button>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              💡 <strong>팁:</strong> 브라우저 개발자 도구의 Device Mode를 사용하면 더 정확한 모바일 환경을 시뮬레이션할 수 있습니다.
            </p>
          </div>
        </div>

        {/* 테스트 결과 요약 */}
        {completedTests > 0 && (
          <div className="mt-6 bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 테스트 결과</h2>
            
            <div className={`p-4 rounded-lg ${
              passedTests === completedTests
                ? 'bg-green-50 border border-green-200'
                : passedTests / completedTests >= 0.8
                ? 'bg-yellow-50 border border-yellow-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  {passedTests === completedTests
                    ? '🎉 모든 테스트 통과!'
                    : passedTests / completedTests >= 0.8
                    ? '✅ 대부분 테스트 통과'
                    : '❌ 개선 필요'}
                </span>
                <span className="text-sm font-medium">
                  {passedTests} / {completedTests} 통과
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BookPromotionBanner 컴포넌트 */}
      <BookPromotionBanner />
    </div>
  );
} 