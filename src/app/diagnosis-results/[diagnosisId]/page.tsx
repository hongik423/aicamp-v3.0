'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, ArrowLeft, FileText, Eye, Printer, Share2, BarChart3, Shield, CheckCircle, AlertCircle, Loader2, Monitor, Smartphone, Copy, Search, RefreshCw } from 'lucide-react';
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

  // 진단 ID가 설정되면 통합 접근 권한 검증
  useEffect(() => {
    if (!diagnosisId) return;

    console.log('🔍 통합 접근 권한 검증 시작:', diagnosisId);
    
    const verifyAccess = async () => {
      try {
        setAuthLoading(true);
        
        // URL 파라미터에서 인증 정보 추출
        const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
        const authMethod = urlParams?.get('auth');
        const authToken = urlParams?.get('token');
        
        // 통합 접근 권한 컨트롤러 사용
        const accessResult = await DiagnosisAccessController.verifyAccess({
          diagnosisId,
          authToken: authToken || undefined,
          authMethod: authMethod || undefined
        });
        
        if (accessResult.isAuthorized) {
          console.log('✅ 통합 접근 권한 확인됨:', accessResult.authMethod);
          setIsAuthorized(true);
          
          // 최근 조회 ID 저장
          DiagnosisAccessController.saveRecentDiagnosisId(diagnosisId);
          
        } else {
          console.warn('❌ 접근 권한 없음:', accessResult.error);
          setIsAuthorized(false);
          setError(accessResult.error || '진단 결과에 접근할 권한이 없습니다.');
          
          // 리디렉션 URL이 있으면 이동
          if (accessResult.redirectUrl) {
            setTimeout(() => {
              if (typeof window !== 'undefined') {
                window.location.href = accessResult.redirectUrl!;
              }
            }, 100);
          }
        }
        
      } catch (error: any) {
        console.error('❌ 통합 권한 검증 오류:', error);
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
          
          // 🔥 강화된 보고서 조회 시스템 (스마트 재시도)
          let response;
          let retryCount = 0;
          const maxRetries = 5; // 재시도 횟수 최적화
          let lastError: any = null;
          
          setProcessingMessage('보고서 데이터를 조회하고 있습니다...');
          
          while (retryCount < maxRetries) {
            try {
              console.log(`🔄 보고서 조회 시도 ${retryCount + 1}/${maxRetries}:`, diagnosisId);
              
              response = await fetch(`/api/diagnosis-reports/${encodeURIComponent(diagnosisId)}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                signal: AbortSignal.timeout(60000) // 60초로 최적화
              });
              
              console.log(`📡 보고서 API 응답 ${retryCount + 1}/${maxRetries}:`, response.status, response.statusText);
              
              if (response.ok) {
                break; // 성공하면 루프 탈출
              } else if (response.status === 404) {
                // 404 응답 본문 확인
                const errorData = await response.json().catch(() => ({}));
                
                if (errorData.code === 'DIAGNOSIS_DATA_NOT_FOUND') {
                  // 데이터가 실제로 존재하지 않는 경우 - 재시도 중단
                  console.error('❌ 진단 데이터 부재 확인됨, 재시도 중단');
                  throw new Error(errorData.error || '진단 데이터를 찾을 수 없습니다.');
                } else if (retryCount < maxRetries - 1) {
                  // 일시적 404일 수 있으므로 재시도
                  throw new Error(`보고서 준비 중... (${retryCount + 1}/${maxRetries})`);
                } else {
                  // 최대 재시도 도달
                  throw new Error('보고서 생성이 지연되고 있습니다. 잠시 후 다시 시도해주세요.');
                }
              } else {
                // 404가 아닌 다른 오류는 즉시 처리
                const errorText = await response.text().catch(() => '알 수 없는 오류');
                throw new Error(`서버 오류 (${response.status}): ${errorText}`);
              }
              
            } catch (fetchError: any) {
              lastError = fetchError;
              retryCount++;
              console.warn(`⚠️ 보고서 로드 시도 ${retryCount}/${maxRetries} 실패:`, fetchError.message);
              
              if (retryCount >= maxRetries) {
                throw fetchError;
              }
              
              // 스마트 대기 시간 (지수 백오프)
              const baseWait = 3000; // 3초 기본
              const waitTime = Math.min(baseWait * Math.pow(1.5, retryCount - 1), 15000); // 최대 15초
              setProcessingMessage(`보고서 준비 중... (${retryCount}/${maxRetries}) ${Math.ceil(waitTime/1000)}초 후 재시도`);
              await new Promise(resolve => setTimeout(resolve, waitTime));
            }
          }

          console.log('📡 사실기반 보고서 API 응답 상태:', response.status, response.statusText);

          if (!response.ok) {
            if (response.status === 404) {
              // 404 오류 시 진단 ID 타임스탬프 확인
              const timestampMatch = diagnosisId.match(/\d{13}/);
              if (timestampMatch) {
                const diagnosisTimestamp = parseInt(timestampMatch[0]);
                const currentTime = Date.now();
                const timeDiff = currentTime - diagnosisTimestamp;
                const tenMinutes = 10 * 60 * 1000; // 10분
                
                if (timeDiff < tenMinutes) {
                  console.log('🕐 최근 생성된 진단ID, 처리 중 상태로 전환:', diagnosisId);
                  
                  setIsProcessing(true);
                  setProcessingMessage(`진단 결과를 처리하고 있습니다. (생성 후 ${Math.round(timeDiff / 1000)}초 경과)`);
                  
                  toast({
                    title: "⏳ 진단 처리 중",
                    description: "진단 결과를 처리하고 있습니다. 잠시 후 다시 시도해주세요.",
                    variant: "default",
                  });
                  
                  // 10초 후 자동 재시도
                  setTimeout(() => {
                    window.location.reload();
                  }, 10000);
                  
                  return;
                }
              }
              
              throw new Error('해당 진단ID의 보고서를 찾을 수 없습니다. 이메일로 받은 정확한 진단ID를 확인해주세요.');
            } else if (response.status === 503) {
              // 시스템 업데이트 중 상태 처리
              const errorResult = await response.json();
              console.log('🔧 시스템 업데이트 중:', errorResult);
              
              setIsProcessing(true);
              setProcessingMessage(errorResult.error || '시스템 업데이트 중입니다. 잠시 후 다시 시도해주세요.');
              
              toast({
                title: "🔧 시스템 업데이트 중",
                description: errorResult.error || "Google Apps Script 시스템을 업데이트하고 있습니다.",
                variant: "default",
              });
              
              // 30초 후 자동 재시도
              setTimeout(() => {
                window.location.reload();
              }, 30000);
              
              return;
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
          
          // 에러 타입별 맞춤 메시지 및 처리
          let errorMessage = '사실기반 보고서 로드 중 오류가 발생했습니다.';
          let showRetryButton = true;
          let autoRetry = false;
          
          if (error.name === 'AbortError') {
            errorMessage = 'GAS 데이터 조회 시간이 초과되었습니다. 네트워크 상태를 확인하고 잠시 후 다시 시도해주세요.';
            autoRetry = true;
          } else if (error.message?.includes('진단 데이터를 찾을 수 없습니다')) {
            errorMessage = '해당 진단 ID의 데이터를 찾을 수 없습니다. 진단서 제출이 완료되었는지 확인해주세요.';
            showRetryButton = false;
          } else if (error.message?.includes('404') || error.message?.includes('찾을 수 없습니다')) {
            errorMessage = '해당 진단ID의 실제 평가 데이터를 찾을 수 없습니다. 이메일로 받은 정확한 진단ID를 확인해주세요.';
            showRetryButton = false;
          } else if (error.message?.includes('500')) {
            errorMessage = 'GAS 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
            autoRetry = true;
          } else if (error.message?.includes('보고서 생성이 지연')) {
            errorMessage = '보고서 생성이 지연되고 있습니다. 잠시 후 다시 시도해주세요.';
            autoRetry = true;
          }
          
          setError(errorMessage);
          setShowRetryButton(showRetryButton);
          
          // 자동 재시도 로직 (특정 조건에서만)
          if (autoRetry && showRetryButton) {
            console.log('🔄 자동 재시도 예약됨 (30초 후)');
            setProcessingMessage('30초 후 자동으로 다시 시도됩니다...');
            
            setTimeout(() => {
              if (isAuthorized && diagnosisId) {
                console.log('🔄 자동 재시도 시작');
                setError('');
                setProcessingMessage('');
                setShowRetryButton(true);
                loadReport();
              }
            }, 30000);
          }
          
          // 사용자 친화적 토스트 메시지
          toast({
            title: "보고서 로드 실패",
            description: errorMessage,
            variant: "destructive",
          });
          
        } finally {
          setLoading(false);
        }
      };
      
      loadReport();
    }
  }, [isAuthorized, diagnosisId, toast]);

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