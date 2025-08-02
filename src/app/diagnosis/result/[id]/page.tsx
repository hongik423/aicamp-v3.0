'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/header';
import { DiagnosisResultView } from '@/features/free-diagnosis/components/DiagnosisResultView';
import { getDiagnosisResult } from '@/features/free-diagnosis/api';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

/**
 * AICAMP AI 역량진단 결과 페이지
 */
export default function DiagnosisResultPage() {
  const params = useParams();
  const diagnosisId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resultData, setResultData] = useState<any>(null);
  
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
              <a href="/services/diagnosis" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                새로운 진단 시작하기
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        const result = await getDiagnosisResult(diagnosisId);
        
        if (result.success) {
          setResultData(result.data);
        } else {
          setError(result.message || '결과를 불러올 수 없습니다');
        }
      } catch (err) {
        setError('결과를 불러오는 중 오류가 발생했습니다');
      } finally {
        setLoading(false);
      }
    };

    if (diagnosisId) {
      fetchResult();
    }
  }, [diagnosisId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />
      
      <main className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="py-20">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-gray-600 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    진단 결과를 불러오는 중입니다
                  </h2>
                  <p className="text-gray-600">
                    잠시만 기다려주세요...
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="py-20">
                <div className="text-center">
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
            <DiagnosisResultView data={resultData} />
          )}
        </div>
      </main>
    </div>
  );
}