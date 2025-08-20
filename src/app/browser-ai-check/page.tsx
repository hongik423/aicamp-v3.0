'use client';

import React, { useEffect, useState } from 'react';
import { BrowserLLM } from '@/lib/ai/browser-llm';
import { CheckCircle, AlertTriangle, Info, Cpu, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BrowserCheckResult {
  supported: boolean;
  issues: string[];
  deviceMemory: number;
  hasWebGL: boolean;
  hasWebAssembly: boolean;
  hasSharedArrayBuffer: boolean;
  recommendedModel: string;
}

export default function BrowserAICheckPage() {
  const [checkResult, setCheckResult] = useState<BrowserCheckResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    performBrowserCheck();
  }, []);

  const performBrowserCheck = () => {
    setIsChecking(true);
    
    setTimeout(() => {
      const support = BrowserLLM.checkBrowserSupport();
      const deviceMemory = (navigator as any).deviceMemory || 4;
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      const hasWebGL = !!gl;
      const hasWebAssembly = typeof WebAssembly !== 'undefined';
      const hasSharedArrayBuffer = typeof SharedArrayBuffer !== 'undefined';
      const recommendedModel = BrowserLLM.selectOptimalModel();

      setCheckResult({
        supported: support.supported,
        issues: support.issues,
        deviceMemory,
        hasWebGL,
        hasWebAssembly,
        hasSharedArrayBuffer,
        recommendedModel
      });
      
      setIsChecking(false);
    }, 1000);
  };

  const getModelInfo = (modelName: string) => {
    const models = BrowserLLM.AVAILABLE_MODELS;
    return Object.values(models).find(m => m.model === modelName) || models.small;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">브라우저 AI 호환성 체크</h1>
        <p className="text-gray-600">
          aicamp.club의 온디바이스 AI 챗봇이 현재 브라우저에서 실행 가능한지 확인합니다.
        </p>
      </div>

      {isChecking && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Cpu className="w-12 h-12 text-blue-500 animate-pulse mx-auto mb-4" />
            <p className="text-lg font-medium">브라우저 환경 분석 중...</p>
          </div>
        </div>
      )}

      {checkResult && (
        <div className="space-y-6">
          {/* 전체 결과 */}
          <div className={`rounded-xl border-2 p-6 ${
            checkResult.supported 
              ? 'border-green-200 bg-green-50' 
              : 'border-red-200 bg-red-50'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              {checkResult.supported ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-red-600" />
              )}
              <div>
                <h2 className="text-xl font-bold">
                  {checkResult.supported ? '✅ 브라우저 AI 지원됨' : '❌ 브라우저 AI 미지원'}
                </h2>
                <p className="text-gray-600">
                  {checkResult.supported 
                    ? 'aicamp.club의 온디바이스 AI 챗봇을 사용할 수 있습니다!' 
                    : '현재 브라우저에서는 온디바이스 AI를 실행할 수 없습니다.'}
                </p>
              </div>
            </div>

            {!checkResult.supported && checkResult.issues.length > 0 && (
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <h3 className="font-medium text-red-800 mb-2">해결 필요한 문제:</h3>
                <ul className="space-y-1">
                  {checkResult.issues.map((issue, index) => (
                    <li key={index} className="text-red-700 text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 상세 정보 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* 시스템 정보 */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" />
                시스템 정보
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">디바이스 메모리</span>
                  <span className="font-medium">{checkResult.deviceMemory}GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">WebGL 지원</span>
                  <span className={`font-medium ${checkResult.hasWebGL ? 'text-green-600' : 'text-red-600'}`}>
                    {checkResult.hasWebGL ? '✅ 지원됨' : '❌ 미지원'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">WebAssembly</span>
                  <span className={`font-medium ${checkResult.hasWebAssembly ? 'text-green-600' : 'text-red-600'}`}>
                    {checkResult.hasWebAssembly ? '✅ 지원됨' : '❌ 미지원'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SharedArrayBuffer</span>
                  <span className={`font-medium ${checkResult.hasSharedArrayBuffer ? 'text-green-600' : 'text-red-600'}`}>
                    {checkResult.hasSharedArrayBuffer ? '✅ 지원됨' : '❌ 미지원'}
                  </span>
                </div>
              </div>
            </div>

            {/* 권장 모델 */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-green-500" />
                권장 AI 모델
              </h3>
              {(() => {
                const modelInfo = getModelInfo(checkResult.recommendedModel);
                return (
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium text-lg">{modelInfo.displayName}</div>
                      <div className="text-sm text-gray-600">{modelInfo.description}</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      필요 메모리: {modelInfo.ramRequired}GB 이상
                    </div>
                    <div className={`px-3 py-2 rounded-lg text-sm ${
                      checkResult.deviceMemory >= modelInfo.ramRequired
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {checkResult.deviceMemory >= modelInfo.ramRequired
                        ? '✅ 현재 시스템에서 실행 가능'
                        : '⚠️ 메모리 부족으로 성능 저하 가능'}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex gap-4 justify-center">
            {checkResult.supported ? (
              <Button 
                onClick={() => window.location.href = '/'}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                AI 챗봇 사용하기
              </Button>
            ) : (
              <Button 
                onClick={() => window.open('https://www.google.com/chrome/', '_blank')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Chrome 최신 버전 다운로드
              </Button>
            )}
            
            <Button 
              variant="outline"
              onClick={performBrowserCheck}
            >
              다시 체크
            </Button>
          </div>

          {/* 도움말 */}
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">브라우저 AI 사용 팁</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <h4 className="font-medium mb-2">권장 브라우저:</h4>
                <ul className="space-y-1">
                  <li>• Chrome 120 이상</li>
                  <li>• Edge 120 이상</li>
                  <li>• Firefox 120 이상</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">최적 환경:</h4>
                <ul className="space-y-1">
                  <li>• HTTPS 연결 필수</li>
                  <li>• 8GB 이상 RAM</li>
                  <li>• GPU 가속 활성화</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
