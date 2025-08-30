'use client'

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, ArrowLeft, FileText, Eye, Printer, Share2, BarChart3, Shield, CheckCircle, AlertCircle, Loader2, Monitor, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DiagnosisResultPageProps {
  params: Promise<{ diagnosisId: string }>;
}

export default function DiagnosisResultPage({ params }: DiagnosisResultPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [diagnosisId, setDiagnosisId] = useState<string>('');
  const [reportContent, setReportContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [reportInfo, setReportInfo] = useState<any>(null);

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      const id = resolvedParams.diagnosisId;
      
      // URL에서 받은 진단ID 디코딩 및 정리
      const cleanId = decodeURIComponent(id).trim();
      setDiagnosisId(cleanId);
      
      console.log('📋 URL에서 받은 진단ID:', cleanId);
    };
    loadParams();
  }, [params]);

  const loadReportData = useCallback(async () => {
    try {
      setLoading(true);
      console.log('📄 사실기반 35페이지 보고서 로드 시작:', diagnosisId);
      
      // 진단ID 유효성 재확인
      if (!diagnosisId || diagnosisId.length < 10) {
        throw new Error('유효하지 않은 진단ID입니다.');
      }
      
      console.log('🔄 GAS 연동 실제 데이터 기반 35페이지 보고서 로드 시작');
      
      // API에서 보고서 조회 (사실기반 시스템)
      const response = await fetch(`/api/diagnosis-reports/${encodeURIComponent(diagnosisId)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(30000) // 30초 타임아웃 (GAS 처리 시간 고려)
      });

      console.log('📡 사실기반 보고서 API 응답 상태:', response.status, response.statusText);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('해당 진단ID의 실제 평가 데이터를 찾을 수 없습니다. 이메일로 받은 정확한 진단ID를 확인해주세요.');
        }
        throw new Error(`보고서 로드 실패: ${response.status} ${response.statusText}`);
      }

      const responseText = await response.text();
      if (!responseText) {
        throw new Error('빈 응답을 받았습니다.');
      }

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ JSON 파싱 오류:', parseError, '응답 텍스트:', responseText);
        throw new Error('서버 응답 형식이 올바르지 않습니다.');
      }
      
      if (result.success && result.htmlReport) {
        console.log('✅ 사실기반 35페이지 보고서 로드 성공');
        console.log('📊 실제 데이터 기반 보고서 정보:', {
          진단ID: result.diagnosisId,
          크기: `${Math.round(result.htmlReport.length / 1024)}KB`,
          버전: result.reportInfo?.version
        });
        
        setReportContent(result.htmlReport);
        setReportInfo(result.reportInfo || {
          diagnosisId: diagnosisId,
          fileName: `AI역량진단보고서_${diagnosisId}.html`,
          version: 'V27.0-FACT-BASED',
          createdAt: new Date().toISOString()
        });
        setError('');
        
        // 로컬 스토리지에 보고서 저장 (백업용)
        try {
          const localReportKey = `diagnosis_report_${diagnosisId}`;
          localStorage.setItem(localReportKey, result.htmlReport);
          console.log('✅ 실제 데이터 기반 보고서 로컬 저장 완료');
        } catch (storageError) {
          console.warn('⚠️ 로컬 저장 실패:', storageError);
        }
      } else {
        console.error('❌ 사실기반 보고서 로드 실패:', result.error);
        throw new Error(result.error || '해당 진단ID의 실제 평가 데이터를 찾을 수 없습니다. 사실기반 보고서 작성을 위해 정확한 진단ID가 필요합니다.');
      }
      
    } catch (error: any) {
      console.error('❌ 사실기반 35페이지 보고서 로드 오류:', error);
      
      // 사실기반 시스템 오류 메시지 (폴백 시도 완전 금지)
      let errorMessage = '사실기반 보고서 로드 중 오류가 발생했습니다.';
      
      if (error.name === 'AbortError') {
        errorMessage = 'GAS 데이터 조회 시간이 초과되었습니다. 네트워크 상태를 확인하고 잠시 후 다시 시도해주세요.';
      } else if (error.message.includes('404') || error.message.includes('찾을 수 없습니다')) {
        errorMessage = '해당 진단ID의 실제 평가 데이터를 찾을 수 없습니다. 이메일로 받은 정확한 진단ID를 확인하거나 진단을 다시 실행해주세요.';
      } else if (error.message.includes('500')) {
        errorMessage = 'GAS 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      } else if (error.message.includes('JSON')) {
        errorMessage = 'GAS 응답 데이터 형식 오류가 발생했습니다.';
      } else if (error.message.includes('권한')) {
        errorMessage = '진단 결과에 접근할 권한이 없습니다. report-access 페이지에서 진단ID를 다시 확인해주세요.';
      }
      
      setError(errorMessage);
      
      // 사실기반 시스템: 폴백 보고서 생성 완전 금지
      console.log('❌ 사실기반 시스템: 실제 데이터 없이는 보고서 생성 불가');
      // 오류 상태 유지 (폴백 로직 완전 제거)
    } finally {
      setLoading(false);
    }
  }, [diagnosisId]);

  const verifyAccess = useCallback(async () => {
    try {
      setAuthLoading(true);
      console.log('🔐 사실기반 시스템: 진단 결과 접근 권한 검증:', diagnosisId);
      
      const response = await fetch('/api/diagnosis-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diagnosisId: diagnosisId,
          accessType: 'user'
        })
      });

      if (!response.ok) {
        throw new Error(`권한 검증 실패: ${response.status} ${response.statusText}`);
      }

      const responseText = await response.text();
      if (!responseText) {
        throw new Error('빈 응답을 받았습니다.');
      }

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ JSON 파싱 오류:', parseError, '응답 텍스트:', responseText);
        throw new Error('서버 응답 형식이 올바르지 않습니다.');
      }
      
      if (result.success) {
        console.log('✅ 접근 권한 확인됨 - 사실기반 데이터 조회 시작');
        
        // 세션에 인증 상태 저장 (30분 유효)
        sessionStorage.setItem(`diagnosis_auth_${diagnosisId}`, 'true');
        sessionStorage.setItem(`diagnosis_auth_time_${diagnosisId}`, Date.now().toString());
        
        setIsAuthorized(true);
        loadReportData();
      } else {
        console.warn('❌ 접근 권한 없음:', result.error);
        setIsAuthorized(false);
        setError(result.error || '진단 결과에 접근할 권한이 없습니다.');
      }
      
    } catch (error: any) {
      console.error('❌ 권한 검증 오류:', error);
      setIsAuthorized(false);
      setError(error.message || '권한 검증 중 오류가 발생했습니다.');
    } finally {
      setAuthLoading(false);
    }
  }, [diagnosisId, loadReportData]);

  useEffect(() => {
    if (diagnosisId) {
      console.log('🔍 사실기반 진단 결과 페이지 로드:', diagnosisId);
      
      // 진단ID 기본 형식 검증
      if (diagnosisId.length < 10 || !diagnosisId.startsWith('DIAG_')) {
        console.warn('⚠️ 잘못된 진단ID 형식:', diagnosisId);
        setIsAuthorized(false);
        setError('유효하지 않은 진단ID 형식입니다. 이메일로 받은 정확한 진단ID를 확인해주세요.');
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
          loadReportData();
          return;
        } else {
          // 인증 시간 만료
          console.log('⚠️ 세션 인증 시간 만료:', diagnosisId);
          sessionStorage.removeItem(`diagnosis_auth_${diagnosisId}`);
          sessionStorage.removeItem(`diagnosis_auth_time_${diagnosisId}`);
        }
      }
      
      // 세션 인증이 없으면 접근 권한 검증
      verifyAccess();
    } else {
      // 진단ID가 없는 경우
      console.warn('⚠️ 진단ID가 제공되지 않음');
      setIsAuthorized(false);
      setError('진단ID가 필요합니다. 올바른 링크를 사용하거나 진단ID를 직접 입력해주세요.');
      setAuthLoading(false);
    }
  }, [diagnosisId, verifyAccess]);

  // 사실기반 보고서 다운로드 (실제 데이터만)
  const handleDownloadReport = async () => {
    if (!reportContent) {
      toast({
        title: "❌ 다운로드 불가",
        description: "실제 평가 데이터 기반 보고서가 없습니다.",
        variant: "destructive",
      });
      return;
    }

    try {
      setDownloadLoading(true);
      
      const blob = new Blob([reportContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      const fileName = reportInfo?.fileName || `AI역량진단보고서_${diagnosisId}_사실기반.html`;
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "📥 다운로드 완료",
        description: `사실기반 35페이지 보고서가 다운로드되었습니다.`,
        duration: 3000,
      });
      
      console.log('✅ 사실기반 보고서 다운로드 완료:', fileName);
      
    } catch (error: any) {
      console.error('❌ 다운로드 오류:', error);
      toast({
        title: "❌ 다운로드 실패",
        description: error.message,
        duration: 5000,
      });
    } finally {
      setDownloadLoading(false);
    }
  };

  // 보고서 새 창에서 보기 (실제 데이터만)
  const handleViewInNewWindow = () => {
    if (!reportContent) {
      toast({
        title: "❌ 새 창 열기 불가",
        description: "실제 평가 데이터 기반 보고서가 없습니다.",
        variant: "destructive",
      });
      return;
    }
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(reportContent);
      newWindow.document.close();
    }
  };

  // 보고서 인쇄 (실제 데이터만)
  const handlePrintReport = () => {
    if (!reportContent) {
      toast({
        title: "❌ 인쇄 불가",
        description: "실제 평가 데이터 기반 보고서가 없습니다.",
        variant: "destructive",
      });
      return;
    }
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(reportContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <p className="text-lg font-medium text-gray-700">진단ID 권한 확인 중...</p>
            <p className="text-sm text-gray-500 mt-2">이메일로 받은 진단ID를 확인하고 있습니다</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isAuthorized === false) {
    // 즉시 진단ID 입력 페이지로 리다이렉트
    if (typeof window !== 'undefined') {
      window.location.href = '/report-access';
      return null;
    }
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-800">접근 권한 없음</CardTitle>
            <CardDescription className="text-red-600">
              이메일로 받은 정확한 진단ID가 필요합니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">📧 진단ID 확인 방법</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• AI 역량진단 완료 후 이메일을 확인하세요</li>
                <li>• 스팸 메일함도 확인해주세요</li>
                <li>• 진단ID 형식: DIAG_xxxxxxxxx</li>
              </ul>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => router.push('/report-access')}
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                진단ID 다시 입력
              </Button>
              <Button 
                onClick={() => router.push('/ai-diagnosis')}
                variant="outline"
                className="flex-1"
              >
                새 진단 시작
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-blue-800">사실기반 보고서 생성 중</CardTitle>
            <CardDescription className="text-blue-600">
              실제 평가 데이터를 기반으로 35페이지 보고서를 생성하고 있습니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <span className="text-blue-700 font-medium">GAS에서 실제 데이터 조회 중...</span>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">🔍 진행 상황</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 진단ID: {diagnosisId}</li>
                <li>• 실제 45문항 데이터 조회 중</li>
                <li>• 사실기반 35페이지 보고서 생성 중</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-800">사실기반 보고서 로드 실패</CardTitle>
            <CardDescription className="text-red-600">
              실제 평가 데이터를 찾을 수 없습니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">🛡️ 사실기반 시스템 안내</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• 실제 평가 데이터만 사용하여 보고서 생성</li>
                <li>• 추정값이나 가짜 데이터 사용 금지</li>
                <li>• 정확한 진단ID 필수</li>
              </ul>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => router.push('/report-access')}
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                진단ID 다시 입력
              </Button>
              <Button 
                onClick={() => router.push('/ai-diagnosis')}
                variant="outline"
                className="flex-1"
              >
                새 진단 시작
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 사실기반 보고서 표시 (실제 데이터만)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI 역량진단 보고서 (사실기반)</h1>
              <p className="text-sm text-gray-600">진단 ID: {diagnosisId}</p>
              <p className="text-xs text-green-600">✅ 실제 평가 데이터 기반 35페이지 보고서</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleDownloadReport} variant="outline" size="sm" disabled={downloadLoading}>
                {downloadLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                HTML 다운로드
              </Button>
              <Button onClick={handleViewInNewWindow} size="sm">
                <Eye className="h-4 w-4 mr-2" />
                새 창에서 보기
              </Button>
              <Button onClick={handlePrintReport} variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                인쇄
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
              사실기반 35페이지 보고서 미리보기
            </CardTitle>
            <CardDescription>
              실제 평가 데이터를 기반으로 생성된 정확한 AI 역량진단 보고서입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="bg-white border rounded-lg overflow-hidden">
              <iframe
                srcDoc={reportContent}
                className="w-full h-[800px] border-0"
                title="사실기반 AI 역량진단 보고서"
              />
            </div>
          </CardContent>
        </Card>
        
        {/* 보고서 정보 */}
        {reportInfo && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                보고서 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-green-600 font-medium">총점</div>
                <div className="text-2xl font-bold text-green-700">{reportInfo.totalScore || 'N/A'}점</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600 font-medium">백분율</div>
                <div className="text-2xl font-bold text-blue-700">{reportInfo.percentage || 'N/A'}%</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-purple-600 font-medium">등급</div>
                <div className="text-2xl font-bold text-purple-700">{reportInfo.grade || 'N/A'}</div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="text-sm text-indigo-600 font-medium">버전</div>
                <div className="text-lg font-bold text-indigo-700">{reportInfo.version || 'V27.0-FACT-BASED'}</div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}