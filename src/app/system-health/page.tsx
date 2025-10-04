'use client';

import React, { useEffect, useState } from 'react';

interface SystemHealth {
  success: boolean;
  timestamp: string;
  processingMs: number;
  environment: {
    nodeEnv: string;
    aiProvider: string;
  };
  ollama: {
    url: string;
    model: string;
    reachable: boolean;
    hasModel: boolean;
    installedModels: string[];
    statusText: string;
  };
}

export default function Page() {
  const [data, setData] = useState<SystemHealth | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('/api/system-health', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (e: any) {
        setError(e?.message || 'failed');
      }
    };
    run();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">시스템 상태</h1>
      <p className="text-gray-600 mb-6">Ollama GPT-OSS 20B 온디바이스 상태를 실시간 확인합니다.</p>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 mb-6">{error}</div>
      )}

      {!data && !error && (
        <div className="animate-pulse text-gray-500">불러오는 중...</div>
      )}

      {data && (
        <div className="space-y-6">
          <section className="rounded-xl border p-5">
            <h2 className="font-medium mb-3">환경</h2>
            <div className="text-sm text-gray-700 space-y-1">
              <div>Node Env: {data.environment.nodeEnv}</div>
              <div>AI Provider: {data.environment.aiProvider}</div>
              <div>처리시간: {data.processingMs}ms</div>
              <div>시각: {new Date(data.timestamp).toLocaleString('ko-KR')}</div>
            </div>
          </section>

          <section className="rounded-xl border p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium">Ollama</h2>
              <span className={`px-2 py-1 rounded text-xs ${data.ollama.reachable && data.ollama.hasModel ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {data.ollama.reachable && data.ollama.hasModel ? '정상' : '오류'}
              </span>
            </div>
            <div className="text-sm text-gray-700 space-y-1">
              <div>URL: {data.ollama.url}</div>
              <div>모델: {data.ollama.model}</div>
              <div>연결: {String(data.ollama.reachable)}</div>
              <div>모델 설치: {String(data.ollama.hasModel)}</div>
              <div>상태: {data.ollama.statusText}</div>
              <div className="mt-2">
                <div className="text-gray-500 mb-1">설치된 모델</div>
                <div className="flex flex-wrap gap-2">
                  {data.ollama.installedModels.map((m) => (
                    <span key={m} className="px-2 py-1 rounded border text-xs bg-gray-50">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}


