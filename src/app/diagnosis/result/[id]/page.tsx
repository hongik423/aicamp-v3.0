'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/header';
import { DiagnosisResultView } from '@/features/ai-capability-diagnosis/components/DiagnosisResultView';
import { getDiagnosisResult, checkDiagnosisStatus } from '@/features/ai-capability-diagnosis/api';
import { Loader2, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

/**
 * 이후경 교장의 AI 역량진단 결과 페이지
 */
export default function DiagnosisResultPage() {
  const params = useParams();
  const diagnosisId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resultData, setResultData] = useState<any>(null);
  const [status, setStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending');
  const [progress, setProgress] = useState(0);
  
  // undefined ID 체크
  if (!diagnosisId || diagnosisId === 'undefined') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md w-full">
            <CardContent className="text-center py-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">😕 진단 결과를 찾을 수 없습니다</h1>
              <p className="text-gray-600 mb-6">진단 ID가 올바르지 않습니다.</p>
              <a href="/diagnosis" className="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                새로운 진단 시작하기
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkAndFetchResult = async () => {
      try {
        // 먼저 상태 확인
        const statusResult = await checkDiagnosisStatus(diagnosisId);
        setStatus(statusResult.status);
        setProgress(statusResult.progress || 0);

        if (statusResult.status === 'completed') {
          // 완료되었으면 결과 가져오기
          const result = await getDiagnosisResult(diagnosisId);
          
          if (result) {
            setResultData(result);
            setLoading(false);
            if (intervalId) clearInterval(intervalId);
          } else {
            setError('진단 결과를 찾을 수 없습니다');
            setLoading(false);
            if (intervalId) clearInterval(intervalId);
          }
        } else if (statusResult.status === 'failed') {
          setError('진단 처리 중 오류가 발생했습니다');
          setLoading(false);
          if (intervalId) clearInterval(intervalId);
        }
      } catch (err) {
        console.error('Error fetching result:', err);
        setError('결과를 불러오는 중 오류가 발생했습니다');
        setLoading(false);
        if (intervalId) clearInterval(intervalId);
      }
    };

    // 초기 체크
    checkAndFetchResult();

    // 처리 중인 경우 주기적으로 상태 확인
    if (status === 'pending' || status === 'processing') {
      intervalId = setInterval(checkAndFetchResult, 5000); // 5초마다 확인
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [diagnosisId, status]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />
      
      <main className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="py-20">
                <div className="text-center">
                  {status === 'processing' ? (
                    <>
                      <div className="relative w-24 h-24 mx-auto mb-6">
                        <Loader2 className="w-24 h-24 animate-spin text-blue-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-semibold">{progress}%</span>
                        </div>
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        AI 역량 분석 중입니다
                      </h2>
                      <p className="text-gray-600 mb-4">
                        GEMINI AI가 귀사의 데이터를 정밀 분석하고 있습니다
                      </p>
                      <Progress value={progress} className="max-w-xs mx-auto mb-6" />
                      <div className="space-y-2 text-left max-w-xs mx-auto">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>데이터 수집 완료</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4 text-blue-500 animate-pulse" />
                          <span>AI 분석 진행 중...</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Loader2 className="w-12 h-12 animate-spin text-gray-600 mx-auto mb-4" />
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        진단을 준비하고 있습니다
                      </h2>
                      <p className="text-gray-600">
                        잠시만 기다려주세요...
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="py-20">
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-red-600 mb-2">
                    오류가 발생했습니다
                  </h2>
                  <p className="text-gray-600 mb-6">{error}</p>
                  <button
                    onClick={() => window.location.href = '/diagnosis'}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
                  >
                    진단 신청 페이지로 돌아가기
                  </button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="max-w-7xl mx-auto mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2">
                  이후경 교장의 AI 역량진단 결과
                </h1>
                <p className="text-gray-600">진단 ID: {diagnosisId}</p>
              </div>
              <DiagnosisResultView result={resultData} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}