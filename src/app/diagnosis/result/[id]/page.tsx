'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, AlertCircle, Loader2, FileText } from 'lucide-react';
import { PremiumMcKinseyReport } from '@/components/diagnosis/PremiumMcKinseyReport';

type ParamsPromise = Promise<{ id: string }>; // 약속된 규칙: page.tsx params는 Promise 사용

export default function DiagnosisResultPage({ params }: { params: ParamsPromise }) {
  const [id, setId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [report, setReport] = useState<any>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.resolve(params).then(async (p) => {
      if (!mounted) return;
      setId(p.id);
      
      // 진단ID 기본 형식 검증
      if (p.id.length < 10 || !p.id.startsWith('DIAG_')) {
        console.warn('⚠️ 잘못된 진단ID 형식:', p.id);
        setIsAuthorized(false);
        setError('유효하지 않은 진단ID 형식입니다.');
        setAuthLoading(false);
        return;
      }
      
      // 세션에서 인증 상태 확인 (30분 유효)
      const sessionAuth = sessionStorage.getItem(`diagnosis_auth_${p.id}`);
      const authTime = sessionStorage.getItem(`diagnosis_auth_time_${p.id}`);
      
      if (sessionAuth === 'true' && authTime) {
        const authTimestamp = parseInt(authTime);
        const currentTime = Date.now();
        const authDuration = 30 * 60 * 1000; // 30분
        
        if (currentTime - authTimestamp < authDuration) {
          console.log('✅ 세션 인증 확인됨:', p.id);
          setIsAuthorized(true);
          setAuthLoading(false);
          loadReport(p.id);
          return;
        } else {
          // 인증 시간 만료
          console.log('⚠️ 세션 인증 시간 만료:', p.id);
          sessionStorage.removeItem(`diagnosis_auth_${p.id}`);
          sessionStorage.removeItem(`diagnosis_auth_time_${p.id}`);
        }
      }
      
      // 접근 권한 검증
      try {
        const authResponse = await fetch('/api/diagnosis-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            diagnosisId: p.id,
            accessType: 'user'
          })
        });

        if (!authResponse.ok) {
          throw new Error('접근 권한 검증에 실패했습니다.');
        }

        const authResult = await authResponse.json();
        
        if (!authResult.success) {
          throw new Error(authResult.error || '진단ID에 접근할 권한이 없습니다.');
        }

        console.log('✅ 접근 권한 확인됨');
        
        // 세션에 인증 상태 저장 (30분 유효)
        sessionStorage.setItem(`diagnosis_auth_${p.id}`, 'true');
        sessionStorage.setItem(`diagnosis_auth_time_${p.id}`, Date.now().toString());
        
        setIsAuthorized(true);
        loadReport(p.id);

      } catch (err) {
        console.error('❌ 접근 권한 검증 실패:', err);
        setIsAuthorized(false);
        setError(err instanceof Error ? err.message : '접근 권한 검증에 실패했습니다.');
        setAuthLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [params]);

  const loadReport = async (diagnosisId: string) => {
    try {
      // 1) 서버 API에서 결과 조회 시도
      const res = await fetch(`/api/diagnosis-results/${encodeURIComponent(diagnosisId)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        setReport(data);
        setLoading(false);
        return;
      }
    } catch {}

    // 2) 로컬 스토리지 폴백 (시뮬레이션/큐잉)
    try {
      const local = localStorage.getItem(`diagnosis_result_${diagnosisId}`);
      if (local) {
        setReport({ success: true, source: 'local', ...JSON.parse(local) });
        setLoading(false);
        return;
      }
    } catch {}

    // 3) 이메일 대기 안내
    setError('보고서가 아직 준비되지 않았습니다. 분석이 완료되면 이메일로 전송됩니다.');
    setLoading(false);
  };

  const header = useMemo(() => {
    if (error) return (
      <div className="flex items-center gap-2 text-red-700">
        <AlertCircle className="w-5 h-5" />
        <span>{error}</span>
      </div>
    );
    if (loading) return (
      <div className="flex items-center gap-2 text-blue-700">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>보고서를 불러오는 중입니다...</span>
      </div>
    );
    return (
      <div className="flex items-center gap-2 text-green-700">
        <CheckCircle2 className="w-5 h-5" />
        <span>보고서가 준비되었습니다</span>
      </div>
    );
  }, [loading, error]);

  // 인증 로딩 중
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>AI 역량진단 결과</span>
                <Badge variant="outline">ID: {id}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Progress value={45} className="h-3" />
                <p className="text-sm text-gray-600">접근 권한을 확인하고 있습니다...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 인증되지 않은 경우
  if (isAuthorized === false) {
    // 즉시 진단ID 입력 페이지로 리다이렉트
    if (typeof window !== 'undefined') {
      window.location.href = '/report-access';
      return null;
    }
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
              <h2 className="text-xl font-semibold mb-2 text-red-700">접근 권한 없음</h2>
              <p className="text-gray-600 mb-4">진단ID 입력 페이지로 이동합니다...</p>
              <Button onClick={() => window.location.href = '/report-access'}>
                진단ID 입력하기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 로딩 중일 때만 카드 레이아웃 사용
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>AI 역량진단 결과</span>
                <Badge variant="outline">ID: {id}</Badge>
              </CardTitle>
              <div className="mt-2">{header}</div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Progress value={45} className="h-3" />
                <p className="text-sm text-gray-600">분석 서버에서 결과를 수집하고 있습니다...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 에러 상황일 때만 카드 레이아웃 사용
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>AI 역량진단 결과</span>
                <Badge variant="outline">ID: {id}</Badge>
              </CardTitle>
              <div className="mt-2">{header}</div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-white border rounded-lg text-sm text-gray-700">
                  요청하신 결과 페이지를 찾지 못했습니다. 분석 완료 후 이메일로 보고서가 발송됩니다. 잠시 후 다시 확인해주세요.
                </div>
                <div className="flex gap-3">
                  <Link href="/ai-diagnosis">
                    <Button variant="outline">진단 다시 진행</Button>
                  </Link>
                  <Link href="/">
                    <Button>메인으로</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 정상 결과일 때는 PremiumMcKinseyReport 컴포넌트가 전체 레이아웃을 담당
  return report ? <PremiumMcKinseyReport data={report} /> : null;
}


