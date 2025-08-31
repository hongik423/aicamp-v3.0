'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, ArrowLeft, FileText, Eye, Printer, Share2, BarChart3, Shield, CheckCircle, AlertCircle, Loader2, Monitor, Smartphone, Copy, Search, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  // 진단 ID가 설정되면 인증 확인
  useEffect(() => {
    if (!diagnosisId) return;

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
        return;
      } else {
        // 인증 시간 만료
        console.log('⚠️ 세션 인증 시간 만료:', diagnosisId);
        sessionStorage.removeItem(`diagnosis_auth_${diagnosisId}`);
        sessionStorage.removeItem(`diagnosis_auth_time_${diagnosisId}`);
      }
    }
    
    // 세션 인증이 없으면 접근 권한 검증
    const verifyAccess = async () => {
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
    };
    
    verifyAccess();
  }, [diagnosisId]);

  // 인증 성공 시 보고서 로드
  useEffect(() => {
    if (isAuthorized === true && diagnosisId) {
      console.log('🔄 인증 성공, 보고서 로드 시작:', diagnosisId);
      
      const loadReport = async () => {
        try {
          setLoading(true);
          console.log('📄 사실기반 35페이지 보고서 로드 시작:', diagnosisId);
          
          // HTML 보고서 조회
          const response = await fetch(`/api/diagnosis-reports/${encodeURIComponent(diagnosisId)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            signal: AbortSignal.timeout(30000)
          });

          console.log('📡 사실기반 보고서 API 응답 상태:', response.status, response.statusText);

          if (!response.ok) {
            if (response.status === 404) {
              throw new Error('해당 진단ID의 보고서를 생성할 수 없습니다.');
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
            console.error('❌ JSON 파싱 오류:', parseError);
            throw new Error('서버 응답 형식이 올바르지 않습니다.');
          }
          
          if (result.success && result.htmlReport) {
            console.log('✅ 사실기반 35페이지 보고서 로드 성공');
            setReportContent(result.htmlReport);
            setReportInfo(result.reportInfo || {
              diagnosisId: diagnosisId,
              fileName: `AI역량진단보고서_${diagnosisId}.html`,
              version: 'V27.0-FACT-BASED',
              createdAt: new Date().toISOString()
            });
            setError('');
          } else if (result.success && result.status === 'processing') {
            // 처리 중 상태 처리
            console.log('⏳ 진단 결과 처리 중:', result.message);
            setError('');
            setLoading(false);
            
            // 처리 중 상태 설정
            setIsProcessing(true);
            setProcessingMessage(result.message || "진단 결과를 처리하고 있습니다. 잠시 후 다시 시도해주세요.");
            
            // 처리 중 메시지 표시
            toast({
              title: "⏳ 처리 중",
              description: result.message || "진단 결과를 처리하고 있습니다.",
              variant: "default",
            });
            
            // 5초 후 자동 재시도
            setTimeout(() => {
              window.location.reload();
            }, 5000);
            
            return; // 오류로 처리하지 않음
          } else {
            throw new Error(result.error || '보고서를 생성할 수 없습니다.');
          }
          
        } catch (error: any) {
          console.error('❌ 사실기반 35페이지 보고서 로드 오류:', error);
          
          let errorMessage = '사실기반 보고서 로드 중 오류가 발생했습니다.';
          
          if (error.name === 'AbortError') {
            errorMessage = 'GAS 데이터 조회 시간이 초과되었습니다. 네트워크 상태를 확인하고 잠시 후 다시 시도해주세요.';
          } else if (error.message.includes('404') || error.message.includes('찾을 수 없습니다')) {
            errorMessage = '해당 진단ID의 실제 평가 데이터를 찾을 수 없습니다. 이메일로 받은 정확한 진단ID를 확인해주세요.';
          } else if (error.message.includes('500')) {
            errorMessage = 'GAS 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
          }
          
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      };
      
      loadReport();
    }
  }, [isAuthorized, diagnosisId]);

  // 리디렉션 처리
  useEffect(() => {
    if (isAuthorized === false && !authLoading && !error) {
      const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
      const fromRedirect = urlParams?.get('from') === 'report-access' || urlParams?.get('from') === 'diagnosis-reports';
      
      if (typeof window !== 'undefined' && !fromRedirect) {
        console.log('🔄 진단ID 입력 페이지로 리디렉션:', diagnosisId);
        setTimeout(() => {
          window.location.href = `/report-access?target=${encodeURIComponent(diagnosisId)}`;
        }, 100);
      }
    }
  }, [isAuthorized, authLoading, error, diagnosisId]);

  // 보고서 다운로드
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
            
            <div className="space-y-3">
              <Button 
                onClick={() => router.push('/my-diagnosis')}
                className="w-full"
                variant="default"
              >
                <Search className="h-4 w-4 mr-2" />
                다른 진단ID로 조회하기
              </Button>
              
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
              <Button 
                onClick={() => window.location.reload()}
                className="w-full"
                variant="default"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                다시 시도
              </Button>
              
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