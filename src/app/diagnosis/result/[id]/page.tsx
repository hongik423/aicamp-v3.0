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

  useEffect(() => {
    let mounted = true;
    Promise.resolve(params).then(async (p) => {
      if (!mounted) return;
      setId(p.id);
      try {
        // 1) 서버 API에서 결과 조회 시도
        const res = await fetch(`/api/diagnosis-results/${encodeURIComponent(p.id)}`, {
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
        const local = localStorage.getItem(`diagnosis_result_${p.id}`);
        if (local) {
          setReport({ success: true, source: 'local', ...JSON.parse(local) });
          setLoading(false);
          return;
        }
      } catch {}

      // 3) 이메일 대기 안내
      setError('보고서가 아직 준비되지 않았습니다. 분석이 완료되면 이메일로 전송됩니다.');
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [params]);

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


