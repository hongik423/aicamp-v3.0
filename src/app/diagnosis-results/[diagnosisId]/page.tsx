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
          // 🚨 진단ID 공백 제거 (GAS 매칭을 위해)
          const cleanId = id.replace(/\s+/g, '');
          setDiagnosisId(cleanId);
          console.log('📋 URL에서 받은 진단ID (원본):', id);
          console.log('🧹 공백 제거된 진단ID:', cleanId);
        }
      } catch (error) {
        console.error('❌ 파라미터 로드 실패:', error);
        setError('URL 파라미터를 읽을 수 없습니다.');
      }
    };
    loadParams();
  }, [params]);

  // 🔓 권한 완화: 진단ID만 일치하면 즉시 접근 허용
  useEffect(() => {
    if (!diagnosisId) return;

    console.log('🔓 권한 완화된 접근 - 진단ID만 확인:', diagnosisId);
    
    // 🔓 권한 완화: 진단ID만 일치하면 즉시 접근 허용
    const checkAccess = async () => {
      try {
        // 진단ID 형식만 기본적으로 검증
        const accessResult = await DiagnosisAccessController.verifyAccess({
          diagnosisId,
          skipRedirect: true
        });
        
        if (accessResult.isAuthorized) {
          console.log('✅ 진단ID 검증 완료 - 접근 허용:', diagnosisId);
          // 접근 허용 - 추가 인증 불필요
        } else {
          console.warn('⚠️ 진단ID 형식 검증 실패:', accessResult.error);
          // 🔓 권한 완화: 형식 검증 실패해도 계속 진행
        }
      } catch (error) {
        console.warn('⚠️ 접근 권한 검증 실패 - 권한 완화로 인해 계속 진행:', error);
        // 🔓 권한 완화: 검증 실패해도 계속 진행
      }
    };
    
    checkAccess();
  }, [diagnosisId]);

  // ✅ 단순 보고서 로드 - 권한 검증 없이 바로 진행
  useEffect(() => {
    if (diagnosisId) {
      console.log('✅ 진단ID 확인 완료, 보고서 로드 시작:', diagnosisId);
      
      const loadReport = async () => {
        try {
          setLoading(true);
          setError('');
          
          console.log('📋 보고서 로드 시작:', diagnosisId);
          
          // 🔥 병렬식 즉시 조회: 로컬 캐시 우선 → GAS 조회 → 24페이지 보고서 생성
          let gasResult = null;
          
          // 1순위: 로컬 캐시에서 즉시 조회 (병렬 처리 결과, 공백 제거된 진단ID 사용)
          const cleanDiagnosisId = diagnosisId.replace(/\s+/g, '');
          const cacheKey = `aicamp_diagnosis_${cleanDiagnosisId}`;
          const cachedData = typeof window !== 'undefined' ? localStorage.getItem(cacheKey) : null;
          
          if (cachedData) {
            try {
              const parsedCache = JSON.parse(cachedData);
              console.log('⚡ 로컬 캐시에서 즉시 조회 성공:', diagnosisId);
              gasResult = { success: true, data: parsedCache };
            } catch (cacheError) {
              console.warn('⚠️ 캐시 파싱 오류, GAS 조회로 진행');
            }
          }
          
          // 2순위: GAS에서 실시간 조회 (공백 제거된 진단ID 사용)
          if (!gasResult) {
            const cleanDiagnosisId = diagnosisId.replace(/\s+/g, '');
            console.log('🔍 GAS 조회 시 사용할 진단ID (공백제거):', cleanDiagnosisId);
            
            const gasResponse = await fetch(`${process.env.NEXT_PUBLIC_GAS_URL}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                type: 'query_diagnosis',
                diagnosisId: cleanDiagnosisId
              }),
              signal: AbortSignal.timeout(60000) // 1분 타임아웃
            });
            
            if (gasResponse.ok) {
              gasResult = await gasResponse.json();
            } else {
              throw new Error(`GAS 데이터 조회 실패: ${gasResponse.status} ${gasResponse.statusText}`);
            }
          }
          
          if (gasResult && gasResult.success && gasResult.data) {
              console.log('✅ GAS에서 데이터 조회 성공:', diagnosisId);
              
              // 🔥 24페이지 보고서 직접 생성
              const { McKinsey24PageGenerator } = await import('../../../lib/diagnosis/mckinsey-24-page-generator');
              
              const diagnosisData = {
                diagnosisId: gasResult.data.diagnosisId,
                companyInfo: {
                  name: gasResult.data.companyName || '기업명',
                  industry: gasResult.data.industry || 'IT/소프트웨어',
                  size: gasResult.data.employeeCount || '중소기업',
                  position: gasResult.data.position || '담당자',
                  location: gasResult.data.location || '서울'
                },
                responses: gasResult.data.responses || gasResult.data.assessmentResponses || {},
                scores: {
                  total: gasResult.data.totalScore || 0,
                  percentage: gasResult.data.percentage || 0,
                  categoryScores: {
                    businessFoundation: gasResult.data.categoryScores?.businessFoundation || 0,
                    currentAI: gasResult.data.categoryScores?.currentAI || 0,
                    organizationReadiness: gasResult.data.categoryScores?.organizationReadiness || 0,
                    technologyInfrastructure: gasResult.data.categoryScores?.techInfrastructure || 0,
                    dataManagement: gasResult.data.categoryScores?.goalClarity || 0,
                    humanResources: gasResult.data.categoryScores?.executionCapability || 0
                  }
                },
                timestamp: gasResult.data.timestamp || new Date().toISOString(),
                grade: gasResult.data.grade || 'C',
                maturityLevel: gasResult.data.maturityLevel || 'AI 준비기업',
                isVirtualData: false
              };
              
              // 24페이지 보고서 생성
              const htmlReport = McKinsey24PageGenerator.generateMcKinsey24PageReport(diagnosisData);
              
              setReportContent(htmlReport);
              setReportInfo({
                diagnosisId: diagnosisId,
                pages: 24,
                reportType: '24페이지 맥킨지급 보고서',
                dataSource: 'GAS 직접 조회'
              });
              
              // 최근 조회한 진단ID 저장 (공백 제거된 버전)
              DiagnosisAccessController.saveRecentDiagnosisId(cleanDiagnosisId);
              
            } else {
              throw new Error(gasResult.error || 'GAS에서 진단 데이터를 찾을 수 없습니다.');
            }
          
        } catch (error: any) {
          console.error('❌ 보고서 로드 실패:', error);
          
          let errorMessage = '보고서 로드 중 오류가 발생했습니다.';
          
          if (error.name === 'AbortError') {
            errorMessage = '로드 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.';
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          setError(errorMessage);
          
        } finally {
          setLoading(false);
        }
      };
      
      loadReport();
    }
  }, [diagnosisId, toast]);

  // ✅ 단순 리다이렉트 - 진단ID 없으면 접근 페이지로
  useEffect(() => {
    if (!diagnosisId) {
      console.log('📋 진단ID 확인 필요 - 접근 페이지로 이동');
      router.push('/report-access');
    }
  }, [diagnosisId, router]);
  
  // 🎯 48시간 메시지 URL 파라미터 처리
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const hours48Message = urlParams.get('48hours');
      
      if (hours48Message === 'true') {
        toast({
          title: "⏰ 48시간 제한 안내",
          description: "보고서는 진단서 제출 후 48시간 이내에만 조회 가능합니다.",
          variant: "default"
        });
      }
    }
  }, [toast]);

  // 🔓 권한 완화: 보고서 다운로드 (진단ID만 확인)
  const handleDownloadReport = async () => {
    if (!reportContent) {
      toast({
        title: "❌ 다운로드 불가",
        description: "실제 평가 데이터 기반 보고서가 없습니다.",
        variant: "destructive",
      });
      return;
    }

    // 🔓 권한 완화: 진단ID만 확인하면 다운로드 허용
    if (!diagnosisId) {
      toast({
        title: "❌ 진단ID 없음",
        description: "진단ID가 필요합니다.",
        variant: "destructive",
      });
      return;
    }
    
    console.log('🔓 권한 완화 - 진단ID 확인 완료, 다운로드 시작:', diagnosisId);
    
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

  // 🔓 권한 완화: 진단ID만 있으면 로딩 상태로 진행
  if (!diagnosisId) {
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
              <div className="text-center py-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                  <p className="text-lg font-medium text-gray-700">진단ID를 확인하고 있습니다...</p>
                  <p className="text-sm text-gray-500 mt-2">잠시만 기다려주세요.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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
                    사실기반 24페이지 전문 분석 보고서
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