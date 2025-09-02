'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, ArrowLeft, FileText, Eye, Printer, Share2, BarChart3, Shield, CheckCircle, AlertCircle, Loader2, Monitor, Smartphone, Copy, Search, RefreshCw, Info, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DiagnosisAccessController } from '@/lib/auth/diagnosis-access-controller';

interface DiagnosisResultPageProps {
  params: Promise<{ diagnosisId: string }>;
}

export default function DiagnosisResultPage({ params }: DiagnosisResultPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  // 상태 관리
  const [diagnosisId, setDiagnosisId] = useState<string>('');
  const [reportContent, setReportContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [reportInfo, setReportInfo] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  const [showRetryButton, setShowRetryButton] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  // URL 파라미터에서 진단 ID 추출
  useEffect(() => {
    const loadParams = async () => {
      try {
        const resolvedParams = await params;
        const id = resolvedParams.diagnosisId;
        if (id) {
          setDiagnosisId(id);
          console.log('📋 URL에서 받은 진단ID:', id);
        }
      } catch (error) {
        console.error('❌ 파라미터 로드 실패:', error);
        setError('URL 파라미터를 읽을 수 없습니다.');
      }
    };
    loadParams();
  }, [params]);

  // ✅ 단순 진단ID 확인 - 복잡한 인증 시스템 완전 제거
  useEffect(() => {
    if (!diagnosisId) return;

    console.log('✅ 단순 진단ID 확인:', diagnosisId);
    
    // 진단ID가 있으면 바로 접근 허용 - 단순하게!
    if (diagnosisId && diagnosisId.length >= 10 && diagnosisId.startsWith('DIAG_')) {
      setIsAuthorized(true);
      setAuthLoading(false);
      console.log('✅ 진단ID 확인 완료 - 바로 접근 허용:', diagnosisId);
      
      // 최근 조회 ID 저장
      try {
        const recent = JSON.parse(localStorage.getItem('aicamp_recent_diagnosis_ids') || '[]');
        const updated = [diagnosisId, ...recent.filter((id: string) => id !== diagnosisId)].slice(0, 5);
        localStorage.setItem('aicamp_recent_diagnosis_ids', JSON.stringify(updated));
      } catch (e) {
        console.log('최근 ID 저장 실패:', e);
      }
    } else {
      setIsAuthorized(false);
      setAuthLoading(false);
      setError('유효하지 않은 진단ID입니다.');
      console.log('❌ 유효하지 않은 진단ID:', diagnosisId);
    }
  }, [diagnosisId]);

  // ✅ 단순 보고서 로드 - 인증된 경우에만
  useEffect(() => {
    if (isAuthorized === true && diagnosisId) {
      console.log('✅ 진단ID 확인 완료, 보고서 로드 시작:', diagnosisId);
      
      const loadReport = async () => {
        try {
          setLoading(true);
          console.log('📄 사실기반 35페이지 보고서 로드 시작:', diagnosisId);
          
          // 🔥 강화된 보고서 조회 시스템 (스마트 재시도)
          let response;
          let retryCount = 0;
          const maxRetries = 5; // 재시도 횟수 최적화
          let lastError: any = null;
          
          setProcessingMessage('보고서 데이터를 조회하고 있습니다...');
          
          // 🚨 치명적인 오류 수정: 무한 재시도 완전 차단 - 1회만 시도
          try {
            console.log(`🔄 보고서 조회 1회 시도:`, diagnosisId);
            
            response = await fetch(`/api/diagnosis-reports/${encodeURIComponent(diagnosisId)}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              signal: AbortSignal.timeout(30000) // 30초로 단축
            });
            
            console.log(`📡 보고서 API 응답:`, response.status, response.statusText);
            
            if (response.ok) {
              const result = await response.json();
              if (result.success && result.htmlReport) {
                setReportContent(result.htmlReport);
                setLoading(false);
                return;
              }
            }
            
            // 성공하지 못한 경우 48시간 메시지 표시
            console.log('📋 보고서 로드 실패 - 48시간 답변 메시지 표시');
            setError('보고서 준비 중입니다');
            setProcessingMessage('이교장이 제출하신 진단평가표를 직접 분석하여 48시간 내에 답변드리겠습니다.');
            setLoading(false);
            return;
            
          } catch (fetchError: any) {
            // 네트워크 오류 시에도 48시간 메시지 표시
            console.log('📋 네트워크 오류 - 48시간 답변 메시지 표시');
            setError('보고서 준비 중입니다');
            setProcessingMessage('이교장이 제출하신 진단평가표를 직접 분석하여 48시간 내에 답변드리겠습니다.');
            setLoading(false);
            return;
          }
        } catch (err: any) {
          console.error('❌ 보고서 로드 오류:', err);
          setError('보고서 준비 중입니다');
          setProcessingMessage('이교장이 제출하신 진단평가표를 직접 분석하여 48시간 내에 답변드리겠습니다.');
        } finally {
          setLoading(false);
        }
      };
      
      loadReport();
    }
  }, [isAuthorized, diagnosisId, toast]);

  // ✅ 단순 리다이렉트 - 진단ID 없으면 접근 페이지로
  useEffect(() => {
    if (isAuthorized === false) {
      console.log('📋 진단ID 확인 필요 - 접근 페이지로 이동');
      router.push('/report-access');
    }
  }, [isAuthorized, router]);
  
  // 🎯 48시간 메시지 URL 파라미터 처리
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('message') === '48hours') {
      setError('보고서 준비 중입니다');
      setProcessingMessage('이교장이 제출하신 진단평가표를 직접 분석하여 48시간 내에 답변드리겠습니다.');
      setLoading(false);
    }
  }, []);

  // 기존 리디렉션 로직은 통합 접근 권한 컨트롤러로 대체됨

  // 보고서 다운로드 (보안 강화)
  const handleDownloadReport = async () => {
    if (!reportContent) {
      toast({
        title: "❌ 다운로드 불가",
        description: "실제 평가 데이터 기반 보고서가 없습니다.",
        variant: "destructive",
      });
      return;
    }

    // 🔒 보안 검증: 현재 세션에서 인증된 진단ID인지 확인
    if (!isAuthorized) {
      toast({
        title: "❌ 접근 권한 없음",
        description: "보고서 다운로드 권한이 없습니다. 다시 인증해주세요.",
        variant: "destructive",
      });
      router.push(`/report-access?diagnosisId=${diagnosisId}`);
      return;
    }

    // 세션 인증 상태 재확인
    const authKey = `diagnosis_auth_${diagnosisId}`;
    const authTime = `diagnosis_auth_time_${diagnosisId}`;
    const sessionAuth = typeof window !== 'undefined' ? sessionStorage.getItem(authKey) : null;
    const sessionAuthTime = typeof window !== 'undefined' ? sessionStorage.getItem(authTime) : null;
    
    if (sessionAuth !== 'authorized' || !sessionAuthTime) {
      toast({
        title: "⚠️ 세션 만료",
        description: "보안을 위해 다시 인증해주세요.",
        variant: "destructive",
      });
      router.push(`/report-access?diagnosisId=${diagnosisId}`);
      return;
    }
    
    // 인증 시간 확인 (30분)
    const authTime_ms = parseInt(sessionAuthTime);
    const isAuthValid = Date.now() - authTime_ms < 30 * 60 * 1000;
    
    if (!isAuthValid) {
      toast({
        title: "⚠️ 인증 만료",
        description: "보안을 위해 다시 인증해주세요.",
        variant: "destructive",
      });
      
      // 만료된 인증 정보 삭제
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(authKey);
        sessionStorage.removeItem(authTime);
      }
      
      router.push(`/report-access?diagnosisId=${diagnosisId}`);
      return;
    }

    try {
      setDownloadLoading(true);
      
      console.log('🔒 보안 검증 통과 - 보고서 다운로드 시작:', diagnosisId);
      
      const fileName = reportInfo?.fileName || `AI역량진단보고서_${diagnosisId}.html`;
      const blob = new Blob([reportContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "✅ 다운로드 완료",
        description: "AI 역량진단 보고서가 다운로드되었습니다.",
        variant: "default",
      });
      
    } catch (error) {
      console.error('❌ 다운로드 오류:', error);
      toast({
        title: "❌ 다운로드 실패",
        description: "파일 다운로드 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setDownloadLoading(false);
    }
  };

  // 수동 재시도 함수
  const handleManualRetry = async () => {
    if (!diagnosisId) return;
    
    setRetryCount(prev => prev + 1);
    setError('');
    setProcessingMessage('수동 재시도 중...');
    setLoading(true);
    
    console.log(`🔄 수동 재시도 ${retryCount + 1}회 시작:`, diagnosisId);
    
    // 잠시 대기 후 다시 로드
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // 진단ID 복사
  const copyDiagnosisId = () => {
    if (diagnosisId) {
      navigator.clipboard.writeText(diagnosisId);
      toast({
        title: "✅ 복사 완료",
        description: "진단ID가 클립보드에 복사되었습니다.",
        variant: "default",
      });
    }
  };

  // 인증 로딩 중
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>AI 역량진단 결과</span>
                <span className="text-sm font-normal text-gray-500">ID: {diagnosisId}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                  <p className="text-lg font-medium text-gray-700">접근 권한을 확인하고 있습니다...</p>
                  <p className="text-sm text-gray-500 mt-2">실제 평가 데이터를 조회 중입니다.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 인증 실패 시
  if (isAuthorized === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-100 to-red-200 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-800">진단 결과를 찾을 수 없습니다</CardTitle>
            <CardDescription className="text-red-600">
              진단ID: {diagnosisId}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                해당 진단ID의 결과를 찾을 수 없습니다. 이메일로 받은 정확한 진단ID를 확인해주세요.
              </AlertDescription>
            </Alert>
            
            {/* 🔐 접근 방법 안내 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
              <h4 className="font-medium text-blue-900 text-sm flex items-center space-x-2">
                <Info className="w-4 h-4" />
                <span>보고서 접근 방법</span>
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-800">진단ID 직접 입력</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-800">이메일 6자리 인증</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => router.push(`/report-access?diagnosisId=${diagnosisId}`)}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700"
              >
                <Shield className="mr-2 h-4 w-4" />
                권한 인증하기
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => router.push(`/report-access?diagnosisId=${diagnosisId}&method=diagnosisId`)}
                  className="text-xs"
                >
                  <FileText className="mr-1 h-3 w-3" />
                  진단ID 입력
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => router.push(`/report-access?diagnosisId=${diagnosisId}&method=email`)}
                  className="text-xs"
                >
                  <Mail className="mr-1 h-3 w-3" />
                  이메일 인증
                </Button>
              </div>
              
              <Button 
                onClick={() => router.push('/ai-diagnosis')}
                className="w-full"
                variant="outline"
              >
                <FileText className="h-4 w-4 mr-2" />
                새로운 진단 받기
              </Button>
              
              <Button 
                onClick={() => router.push('/')}
                className="w-full"
                variant="ghost"
              >
                홈으로 돌아가기
              </Button>
            </div>
            
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // 처리 중 상태
  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-600" />
            <h2 className="text-xl font-semibold mb-2">진단 결과 처리 중...</h2>
            <p className="text-gray-600 mb-4">{processingMessage}</p>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm text-orange-800">
                🕐 5초 후 자동으로 새로고침됩니다.
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-3"
                variant="outline"
                size="sm"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                지금 새로고침
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 보고서 로딩 중
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

  // 오류 발생 시
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-800">보고서 로드 실패</CardTitle>
            <CardDescription className="text-red-600">
              진단ID: {diagnosisId}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
            
            <div className="space-y-3">
              {showRetryButton && (
                <Button 
                  onClick={handleManualRetry}
                  className="w-full"
                  variant="default"
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? '재시도 중...' : `다시 시도 (${retryCount + 1}회)`}
                </Button>
              )}
              
              <Button 
                onClick={() => router.push('/my-diagnosis')}
                className="w-full"
                variant="outline"
              >
                <Search className="h-4 w-4 mr-2" />
                다른 진단ID로 조회하기
              </Button>
              
              <Button 
                onClick={() => router.push('/')}
                className="w-full"
                variant="ghost"
              >
                홈으로 돌아가기
              </Button>
            </div>
            
            {processingMessage && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 text-center">
                  {processingMessage}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // 메인 보고서 표시
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* 헤더 */}
        <div className="mb-6">
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <BarChart3 className="h-6 w-6 mr-2" />
                    AI 역량진단 보고서
                  </CardTitle>
                  <CardDescription className="text-blue-100 mt-1">
                    사실기반 35페이지 전문 분석 보고서
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-blue-100">진단ID:</span>
                    <code className="bg-blue-500 px-2 py-1 rounded text-xs font-mono">
                      {diagnosisId}
                    </code>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={copyDiagnosisId}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleDownloadReport}
                      disabled={downloadLoading}
                      className="text-xs"
                    >
                      {downloadLoading ? (
                        <Loader2 className="h-3 w-3 animate-spin mr-1" />
                      ) : (
                        <Download className="h-3 w-3 mr-1" />
                      )}
                      다운로드
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.push('/')}
                      className="text-xs bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <ArrowLeft className="h-3 w-3 mr-1" />
                      홈으로
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* 보고서 내용 */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-0">
            {reportContent ? (
              <div 
                className="w-full min-h-screen bg-white text-sm leading-relaxed font-sans"
                dangerouslySetInnerHTML={{ __html: reportContent }}
              />
            ) : (
              <div className="p-8 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">보고서를 불러오는 중입니다</h3>
                <p className="text-gray-500">잠시만 기다려주세요...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}