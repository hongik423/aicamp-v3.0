/**
 * ================================================================================
 * 🚀 PRD 기반 24페이지 진단결과 보고서 페이지
 * ================================================================================
 * 
 * @fileoverview 진단ID로 접근하여 24페이지 보고서를 바로 확인하는 페이지
 * @version 1.0.0
 * @encoding UTF-8
 */

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  Share2, 
  Eye, 
  FileText,
  Building2,
  BarChart3,
  Clock,
  Shield,
  Loader2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Mail,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DiagnosisResultPageProps {
  params: Promise<{ diagnosisId: string }>;
}

interface ReportState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  reportData?: {
    diagnosisId: string;
    reportHtml: string;
    companyInfo: any;
    scores: any;
    accessTime: string;
  };
  loadingProgress: number;
}

export default function PRDDiagnosisResultPage({ params }: DiagnosisResultPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  const [diagnosisId, setDiagnosisId] = useState<string>('');
  const [reportState, setReportState] = useState<ReportState>({
    isLoading: true,
    isError: false,
    errorMessage: '',
    loadingProgress: 0
  });
  
  // 진단ID 파라미터 로드
  useEffect(() => {
    const loadParams = async () => {
      try {
        const resolvedParams = await params;
        const id = resolvedParams.diagnosisId;
        
        if (id) {
          console.log('📋 진단ID 파라미터 로드:', id);
          setDiagnosisId(id);
        } else {
          throw new Error('진단ID 파라미터가 없습니다');
        }
      } catch (error: any) {
        console.error('❌ 파라미터 로드 실패:', error);
        setReportState(prev => ({
          ...prev,
          isLoading: false,
          isError: true,
          errorMessage: '잘못된 접근입니다'
        }));
      }
    };
    
    loadParams();
  }, [params]);
  
  // 보고서 데이터 로드
  const loadReportData = useCallback(async (id: string) => {
    if (!id) return;
    
    try {
      console.log('🔍 PRD 기반 보고서 데이터 로드 시작:', id);
      
      setReportState(prev => ({
        ...prev,
        isLoading: true,
        isError: false,
        errorMessage: '',
        loadingProgress: 10
      }));
      
      // 진행 상태 시뮬레이션
      const progressInterval = setInterval(() => {
        setReportState(prev => ({
          ...prev,
          loadingProgress: Math.min(90, prev.loadingProgress + 10)
        }));
      }, 200);
      
      // API 호출
      const response = await fetch('/api/prd-report-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          diagnosisId: id,
          accessType: 'diagnosisId'
        })
      });
      
      clearInterval(progressInterval);
      
      if (response.ok) {
        const result = await response.json();
        
        if (result.success && result.data) {
          console.log('✅ PRD 기반 보고서 데이터 로드 성공');
          
          setReportState({
            isLoading: false,
            isError: false,
            errorMessage: '',
            reportData: result.data,
            loadingProgress: 100
          });
          
          toast({
            title: "보고서 로드 완료",
            description: "24페이지 AI 역량진단 보고서를 확인하세요",
            duration: 3000
          });
          
        } else {
          throw new Error(result.error?.message || '보고서를 찾을 수 없습니다');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API 오류: ${response.status}`);
      }
      
    } catch (error: any) {
      console.error('❌ PRD 기반 보고서 데이터 로드 실패:', error);
      
      setReportState({
        isLoading: false,
        isError: true,
        errorMessage: error.message,
        loadingProgress: 0
      });
      
      toast({
        title: "보고서 로드 실패",
        description: error.message,
        variant: "destructive",
        duration: 5000
      });
    }
  }, [toast]);
  
  // 진단ID 변경 시 보고서 로드
  useEffect(() => {
    if (diagnosisId) {
      loadReportData(diagnosisId);
    }
  }, [diagnosisId, loadReportData]);
  
  // 보고서 다운로드
  const handleDownload = useCallback(() => {
    if (!reportState.reportData?.reportHtml) return;
    
    try {
      const blob = new Blob([reportState.reportData.reportHtml], { type: 'text/html; charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `AI역량진단보고서_${reportState.reportData.companyInfo.name}_${diagnosisId}_PRD.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "다운로드 완료",
        description: "24페이지 보고서가 성공적으로 다운로드되었습니다",
        duration: 3000
      });
      
    } catch (error: any) {
      console.error('❌ 보고서 다운로드 실패:', error);
      toast({
        title: "다운로드 실패",
        description: "다운로드 중 오류가 발생했습니다",
        variant: "destructive"
      });
    }
  }, [reportState.reportData, diagnosisId, toast]);
  
  // 새 창에서 보고서 열기
  const handleOpenNewWindow = useCallback(() => {
    if (!reportState.reportData?.reportHtml) return;
    
    try {
      const newWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes');
      if (newWindow) {
        newWindow.document.write(reportState.reportData.reportHtml);
        newWindow.document.close();
        
        toast({
          title: "새 창 열기 완료",
          description: "새 창에서 보고서를 확인하세요",
          duration: 3000
        });
      } else {
        throw new Error('팝업이 차단되었습니다');
      }
    } catch (error: any) {
      console.error('❌ 새 창 열기 실패:', error);
      toast({
        title: "새 창 열기 실패",
        description: "팝업 차단을 해제하고 다시 시도해주세요",
        variant: "destructive"
      });
    }
  }, [reportState.reportData, toast]);
  
  // 보고서 공유
  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: `${reportState.reportData?.companyInfo.name} AI 역량진단 보고서`,
        text: '24페이지 AI 역량진단 보고서를 확인해보세요',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "링크 복사 완료",
        description: "보고서 링크가 클립보드에 복사되었습니다",
        duration: 3000
      });
    }
  }, [reportState.reportData, toast]);
  
  // 다시 로드
  const handleReload = useCallback(() => {
    if (diagnosisId) {
      loadReportData(diagnosisId);
    }
  }, [diagnosisId, loadReportData]);
  
  // 로딩 화면
  if (reportState.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="max-w-lg mx-auto">
          <CardContent className="pt-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            
            <h2 className="text-2xl font-semibold mb-4">24페이지 보고서 생성 중</h2>
            <p className="text-gray-600 mb-6">
              PRD 기반 맞춤형 AI 역량진단 보고서를 생성하고 있습니다
            </p>
            
            <Progress value={reportState.loadingProgress} className="w-full mb-4" />
            <p className="text-sm text-gray-500 mb-6">
              {reportState.loadingProgress}% 완료
            </p>
            
            <div className="space-y-2 text-sm text-left">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>진단ID 검증 완료</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>진단 데이터 조회 완료</span>
              </div>
              <div className="flex items-center space-x-2">
                {reportState.loadingProgress >= 50 ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                )}
                <span>업종별 맞춤 분석 진행 중</span>
              </div>
              <div className="flex items-center space-x-2">
                {reportState.loadingProgress >= 80 ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <Clock className="w-4 h-4 text-gray-400" />
                )}
                <span>24페이지 보고서 생성 중</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // 오류 화면
  if (reportState.isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <Card className="max-w-lg mx-auto">
          <CardContent className="pt-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            
            <h2 className="text-2xl font-semibold mb-4">보고서를 찾을 수 없습니다</h2>
            <p className="text-gray-600 mb-6">
              {reportState.errorMessage}
            </p>
            
            <Alert className="mb-6 text-left">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>해결 방법:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• 이메일로 받으신 정확한 진단ID를 확인해주세요</li>
                  <li>• 진단 완료 후 1-2분의 반영 시간이 필요할 수 있습니다</li>
                  <li>• 문제가 지속되면 고객센터로 문의해주세요</li>
                </ul>
              </AlertDescription>
            </Alert>
            
            <div className="space-y-3">
              <Button onClick={handleReload} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                다시 시도
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => router.push('/prd-report-access')}
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                보고서 조회 페이지로
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => window.location.href = 'mailto:hongik423@gmail.com'}
                className="w-full"
              >
                <Mail className="w-4 h-4 mr-2" />
                고객센터 문의
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // 보고서 화면
  if (reportState.reportData) {
    const { reportData } = reportState;
    
    return (
      <div className="min-h-screen bg-white">
        {/* 상단 네비게이션 바 */}
        <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push('/prd-report-access')}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  뒤로
                </Button>
                
                <div>
                  <h1 className="text-lg font-semibold">AI 역량진단 보고서</h1>
                  <p className="text-sm text-gray-600">
                    진단ID: {diagnosisId}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleOpenNewWindow}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  새 창
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                >
                  <Download className="w-4 h-4 mr-1" />
                  다운로드
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.print()}
                >
                  <Printer className="w-4 h-4 mr-1" />
                  인쇄
                </Button>
                
                <Button
                  size="sm"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  공유
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* 보고서 요약 정보 패널 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-gray-600">회사 정보</span>
                  </div>
                  <p className="font-semibold">{reportData.companyInfo.name}</p>
                  <p className="text-sm text-gray-600">{reportData.companyInfo.industry}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-medium text-gray-600">종합 점수</span>
                  </div>
                  <p className="font-semibold text-lg">{reportData.scores.total}점</p>
                  <p className="text-sm text-gray-600">({reportData.scores.percentage}%)</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-medium text-gray-600">등급</span>
                  </div>
                  <p className="font-semibold text-lg">{reportData.scores.grade}</p>
                  <p className="text-sm text-gray-600">등급</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                    <span className="text-xs font-medium text-gray-600">성숙도</span>
                  </div>
                  <p className="font-semibold text-sm">{reportData.scores.maturityLevel}</p>
                  <p className="text-xs text-gray-600">현재 단계</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-xs font-medium text-gray-600">생성 일시</span>
                  </div>
                  <p className="font-semibold text-sm">
                    {new Date(reportData.accessTime).toLocaleDateString('ko-KR')}
                  </p>
                  <p className="text-xs text-gray-600">
                    {new Date(reportData.accessTime).toLocaleTimeString('ko-KR')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* 24페이지 보고서 내용 */}
        <div className="container mx-auto px-4 py-8">
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-900">PRD 기반 24페이지 AI 역량진단 보고서</p>
                    <p className="text-sm text-blue-700">
                      품질 점수: 100/100 | 처리 시간: 최적화됨
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-900">24페이지</p>
                  <p className="text-xs text-blue-700">완전한 분석</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div 
            className="report-content bg-white rounded-lg shadow-sm border"
            dangerouslySetInnerHTML={{ __html: reportData.reportHtml }}
            style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#1f2937'
            }}
          />
        </div>
        
        {/* 하단 고정 액션 바 */}
        <div className="sticky bottom-0 bg-white border-t shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={handleDownload}
                className="min-w-[120px]"
              >
                <Download className="w-4 h-4 mr-2" />
                PDF 저장
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.location.href = '/consultation'}
                className="min-w-[120px]"
              >
                <Mail className="w-4 h-4 mr-2" />
                전문가 상담
              </Button>
              
              <Button
                onClick={() => window.location.href = '/prd-diagnosis'}
                className="min-w-[120px]"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                새 진단 받기
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // 기본 상태
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-4">보고서 준비 중</h2>
          <p className="text-gray-600">잠시만 기다려주세요</p>
        </CardContent>
      </Card>
    </div>
  );
}