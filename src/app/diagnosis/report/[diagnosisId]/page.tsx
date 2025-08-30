'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, FileText, Loader2, AlertCircle } from 'lucide-react';

interface DiagnosisReport {
  diagnosisId: string;
  companyName: string;
  contactEmail: string;
  createdAt: string;
  htmlContent: string;
  scoreAnalysis: {
    totalScore: number;
    grade: string;
    maturityLevel: string;
    categoryScores: Record<string, number>;
  };
}

export default function DiagnosisReportPage() {
  const params = useParams();
  const diagnosisId = params.diagnosisId as string;
  
  const [report, setReport] = useState<DiagnosisReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (diagnosisId) {
      verifyAccess();
    }
  }, [diagnosisId]);

  const verifyAccess = async () => {
    try {
      setAuthLoading(true);
      
      // 진단ID 기본 형식 검증
      if (diagnosisId.length < 10 || !diagnosisId.startsWith('DIAG_')) {
        console.warn('⚠️ 잘못된 진단ID 형식:', diagnosisId);
        setIsAuthorized(false);
        setError('유효하지 않은 진단ID 형식입니다.');
        setAuthLoading(false);
        return;
      }
      
      // 세션에서 인증 상태 확인 (30분 유효)
      const sessionAuth = sessionStorage.getItem(`diagnosis_auth_${diagnosisId}`);
      const authTime = sessionStorage.getItem(`diagnosis_auth_time_${diagnosisId}`);
      
      if (sessionAuth === 'true' && authTime) {
        const authTimestamp = parseInt(authTime);
        const currentTime = Date.now();
        const authDuration = 30 * 60 * 1000; // 30분
        
        if (currentTime - authTimestamp < authDuration) {
          console.log('✅ 세션 인증 확인됨:', diagnosisId);
          setIsAuthorized(true);
          setAuthLoading(false);
          fetchReport();
          return;
        } else {
          // 인증 시간 만료
          console.log('⚠️ 세션 인증 시간 만료:', diagnosisId);
          sessionStorage.removeItem(`diagnosis_auth_${diagnosisId}`);
          sessionStorage.removeItem(`diagnosis_auth_time_${diagnosisId}`);
        }
      }
      
      // 접근 권한 검증
      const authResponse = await fetch('/api/diagnosis-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diagnosisId: diagnosisId,
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
      sessionStorage.setItem(`diagnosis_auth_${diagnosisId}`, 'true');
      sessionStorage.setItem(`diagnosis_auth_time_${diagnosisId}`, Date.now().toString());
      
      setIsAuthorized(true);
      fetchReport();

    } catch (err) {
      console.error('❌ 접근 권한 검증 실패:', err);
      setIsAuthorized(false);
      setError(err instanceof Error ? err.message : '접근 권한 검증에 실패했습니다.');
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchReport = async () => {
    try {
      setLoading(true);
      console.log('📄 사실기반 보고서 조회 시작:', diagnosisId);
      
      // 사실기반 시스템: GAS에서만 실제 데이터 조회
      const response = await fetch(`/api/diagnosis-results/${encodeURIComponent(diagnosisId)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();

      if (response.ok && result?.success && (result?.data?.report || result?.data?.htmlContent)) {
        const data = result.data;
        setReport({
          diagnosisId,
          companyName: data.companyInfo?.name || data.companyName || '',
          contactEmail: data.companyInfo?.contact?.email || data.contactEmail || '',
          createdAt: data.createdAt || new Date().toISOString(),
          htmlContent: data.report?.html || data.htmlContent || '',
          scoreAnalysis: data.scoreAnalysis || {
            totalScore: data.totalScore || 0,
            grade: data.grade || '',
            maturityLevel: data.maturityLevel || '',
            categoryScores: data.categoryScores || {}
          }
        });
        console.log('✅ 사실기반 보고서 로드 성공');
      } else {
        throw new Error('해당 진단ID의 실제 평가 데이터를 찾을 수 없습니다');
      }

    } catch (err) {
      console.error('❌ 사실기반 보고서 로딩 실패:', err);
      setError('해당 진단ID의 실제 평가 데이터를 찾을 수 없습니다. 사실기반 보고서 작성을 위해 정확한 진단ID가 필요합니다.');
    } finally {
      setLoading(false);
    }
  };

  const downloadHTML = () => {
    if (!report) return;
    
    const blob = new Blob([report.htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI역량진단보고서_${report.companyName}_${diagnosisId}_사실기반.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openInNewWindow = () => {
    if (!report) return;
    
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(report.htmlContent);
      newWindow.document.close();
    }
  };

  // 인증 로딩 중
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <h2 className="text-xl font-semibold mb-2">접근 권한 확인 중...</h2>
            <p className="text-gray-600">진단ID를 검증하고 있습니다.</p>
          </CardContent>
        </Card>
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
        <Card className="w-full max-w-md">
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
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <h2 className="text-xl font-semibold mb-2">사실기반 보고서 로딩 중...</h2>
            <p className="text-gray-600">실제 평가 데이터를 조회하고 있습니다.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-semibold mb-2 text-red-700">사실기반 보고서 로드 실패</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-4">
              <h4 className="font-semibold text-red-800 mb-2">🛡️ 사실기반 시스템 안내</h4>
              <ul className="text-sm text-red-700 space-y-1 text-left">
                <li>• 실제 평가 데이터만 사용하여 보고서 생성</li>
                <li>• 추정값이나 가짜 데이터 사용 금지</li>
                <li>• 정확한 진단ID 필수</li>
              </ul>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={() => window.location.href = '/report-access'} className="flex-1">
                진단ID 다시 입력
              </Button>
              <Button onClick={() => window.location.href = '/ai-diagnosis'} variant="outline" className="flex-1">
                새 진단 시작
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">사실기반 보고서를 찾을 수 없습니다</h2>
            <p className="text-gray-600">해당 진단ID의 실제 평가 데이터가 존재하지 않습니다.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI 역량진단 보고서 (사실기반)</h1>
              <p className="text-sm text-gray-600">진단 ID: {report.diagnosisId}</p>
              <p className="text-xs text-green-600">✅ 실제 평가 데이터 기반</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={downloadHTML} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                HTML 다운로드
              </Button>
              <Button onClick={openInNewWindow} size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                새 창에서 보기
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 보고서 미리보기 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              사실기반 보고서 미리보기
            </CardTitle>
            <CardDescription>
              실제 평가 데이터를 기반으로 생성된 정확한 AI 역량진단 보고서입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="bg-white border rounded-lg overflow-hidden">
              <iframe
                srcDoc={report.htmlContent}
                className="w-full h-[800px] border-0"
                title="사실기반 AI 역량진단 보고서"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}