/**
 * ================================================================================
 * 🚀 PRD V3.0 진단결과 상세 조회 페이지 (완전 교체)
 * ================================================================================
 * 
 * @fileoverview 진단ID로 PRD V3.0 보고서를 웹 화면에서 HTML로 즉시 확인
 * @version 3.0.0
 * @encoding UTF-8
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
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
  TrendingUp,
  Award,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DiagnosisResultPageProps {
  params: Promise<{ diagnosisId: string }>;
}

interface ReportState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  loadingProgress: number;
  reportData?: {
    diagnosisId: string;
    companyName: string;
    contactName: string;
    reportHtml: string;
    metadata: any;
    analysisResult: any;
    scores: any;
    accessTime: string;
  };
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [retrySeconds, setRetrySeconds] = useState(10);
  
  // 진단ID 파라미터 로드
  useEffect(() => {
    const loadParams = async () => {
      try {
        const resolvedParams = await params;
        const id = resolvedParams.diagnosisId;
        
        if (id) {
          console.log('📋 PRD V3.0 진단ID 파라미터 로드:', id);
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
          errorMessage: 'PRD V3.0: 잘못된 접근입니다'
        }));
      }
    };
    
    loadParams();
  }, [params]);
  
  // PRD V3.0 보고서 데이터 로드
  useEffect(() => {
    if (!diagnosisId) return;
    
    const loadPRDReport = async () => {
      try {
        setReportState(prev => ({ ...prev, isLoading: true, loadingProgress: 10 }));
        console.log('🚀 PRD V3.0 보고서 로드 시작:', diagnosisId);
        
        // 1순위: PRD V3.0 전용 API로 조회
        setReportState(prev => ({ ...prev, loadingProgress: 30 }));
        
        const response = await fetch(`/api/diagnosis-reports/${diagnosisId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-PRD-Version': 'V3.0'
          },
          signal: AbortSignal.timeout(30000)
        });
        
        setReportState(prev => ({ ...prev, loadingProgress: 60 }));
        
        if (response.ok) {
          const result = await response.json();
          
          if (result.success && result.data) {
            console.log('✅ PRD V3.0 보고서 조회 성공:', result);
            
            setReportState(prev => ({ ...prev, loadingProgress: 90 }));
            
            const reportData = {
              diagnosisId: result.data.diagnosisId || diagnosisId,
              companyName: result.data.companyName || result.data.diagnosis?.companyName || 'N/A',
              contactName: result.data.contactName || result.data.diagnosis?.contactName || 'N/A',
              reportHtml: result.data.reportHtml || result.data.htmlReport || '',
              metadata: result.data.metadata || {},
              analysisResult: result.data.analysisResult || {},
              scores: result.data.scores || result.data.scoreData || {},
              accessTime: new Date().toLocaleString('ko-KR')
            };
            
            setReportState({
              isLoading: false,
              isError: false,
              errorMessage: '',
              loadingProgress: 100,
              reportData
            });
            
            toast({
              title: "✅ PRD V3.0 보고서 로드 완료",
              description: `${reportData.companyName}의 24페이지 AI 역량진단 보고서`,
              variant: "default"
            });
            
          } else {
            throw new Error(result.error || 'PRD V3.0 보고서를 찾을 수 없습니다');
          }
        } else if (response.status === 404) {
          // 보고서 미생성 상태: 폴링으로 재시도
          setIsProcessing(true);
          setReportState(prev => ({ ...prev, isLoading: false }));
          let attempts = 0;
          const maxAttempts = 90; // 15분 (10초 간격)
          const interval = setInterval(async () => {
            attempts++;
            try {
              const r = await fetch(`/api/diagnosis-reports/${diagnosisId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'X-PRD-Version': 'V3.0' },
                signal: AbortSignal.timeout(25000)
              });
              if (r.ok) {
                clearInterval(interval);
                setIsProcessing(false);
                const result = await r.json();
                if (result.success && result.data) {
                  const reportData = {
                    diagnosisId: result.data.diagnosisId || diagnosisId,
                    companyName: result.data.companyName || result.data.diagnosis?.companyName || 'N/A',
                    contactName: result.data.contactName || result.data.diagnosis?.contactName || 'N/A',
                    reportHtml: result.data.reportHtml || result.data.htmlReport || '',
                    metadata: result.data.metadata || {},
                    analysisResult: result.data.analysisResult || {},
                    scores: result.data.scores || result.data.scoreData || {},
                    accessTime: new Date().toLocaleString('ko-KR')
                  };
                  setReportState({ isLoading: false, isError: false, errorMessage: '', loadingProgress: 100, reportData });
                  toast({ title: '보고서 생성 완료', description: '자동으로 결과 페이지를 표시합니다.' });
                }
              } else if (attempts >= maxAttempts) {
                clearInterval(interval);
                setIsProcessing(false);
                setReportState({ isLoading: false, isError: true, errorMessage: '보고서 생성이 지연되고 있습니다. 잠시 후 다시 시도해주세요.', loadingProgress: 0 });
              } else {
                setRetrySeconds((prev) => (prev <= 1 ? 10 : prev - 1));
              }
            } catch {
              // 네트워크 일시 오류는 다음 시도
            }
          }, 10000);
          return;
        } else {
          throw new Error(`PRD V3.0 API 오류: ${response.status}`);
        }
        
      } catch (error: any) {
        console.error('❌ PRD V3.0 보고서 로드 실패:', error);
        setReportState({
          isLoading: false,
          isError: true,
          errorMessage: error.message || 'PRD V3.0 보고서 로드 중 오류가 발생했습니다',
          loadingProgress: 0
        });
        
        toast({
          title: "❌ PRD V3.0 보고서 로드 실패",
          description: error.message || '보고서를 불러올 수 없습니다',
          variant: "destructive"
        });
      }
    };
    
    loadPRDReport();
  }, [diagnosisId, toast]);
  
  // 로딩 화면
  if (reportState.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-6">
          <Card>
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <CardTitle className="text-xl">PRD V3.0 보고서 로드 중</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={reportState.loadingProgress} className="w-full" />
                <p className="text-center text-sm text-gray-600">
                  {reportState.loadingProgress < 30 && "PRD V3.0 캐시에서 보고서 검색 중..."}
                  {reportState.loadingProgress >= 30 && reportState.loadingProgress < 60 && "PRD V3.0 API에서 데이터 조회 중..."}
                  {reportState.loadingProgress >= 60 && reportState.loadingProgress < 90 && "PRD V3.0 보고서 데이터 처리 중..."}
                  {reportState.loadingProgress >= 90 && "PRD V3.0 보고서 렌더링 중..."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 생성 대기 화면 (폴링 중)
  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-6">
          <Card>
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-yellow-600 animate-spin" />
              </div>
              <CardTitle className="text-xl">보고서 생성 중입니다</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-sm text-gray-700 mb-4">
                제출하신 데이터를 바탕으로 고품질 PRD V3.0 보고서를 생성하고 있어요. 최대 10~15분이 걸릴 수 있습니다.
              </p>
              <div className="text-center text-xs text-gray-500">자동으로 새로고침됩니다…</div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  // 오류 화면
  if (reportState.isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-6">
          <Card className="border-red-200">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-xl text-red-800">PRD V3.0 보고서 로드 실패</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {reportState.errorMessage}
                </AlertDescription>
              </Alert>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => window.location.reload()} 
                  className="w-full"
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  다시 시도
                </Button>
                
                <Button 
                  onClick={() => router.push('/my-diagnosis')} 
                  className="w-full"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  진단ID 다시 입력
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  // PRD V3.0 보고서 표시
  if (reportState.reportData) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* 상단 컨트롤 바 */}
        <div className="bg-white border-b sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  onClick={() => router.push('/my-diagnosis')} 
                  variant="outline"
                  size="sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  뒤로가기
                </Button>
                
                <div>
                  <h1 className="font-semibold text-lg">PRD V3.0 AI 역량진단 보고서</h1>
                  <p className="text-sm text-gray-600">
                    {reportState.reportData.companyName} | {reportState.reportData.diagnosisId}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-600">
                  <Sparkles className="w-3 h-3 mr-1" />
                  PRD V3.0
                </Badge>
                
                <Button 
                  onClick={() => window.print()} 
                  variant="outline" 
                  size="sm"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  인쇄
                </Button>
                
                <Button 
                  onClick={() => {
                    const blob = new Blob([reportState.reportData!.reportHtml], { type: 'text/html' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `PRD_V3_AI역량진단보고서_${reportState.reportData!.companyName}_${reportState.reportData!.diagnosisId}.html`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  variant="outline" 
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  다운로드
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* PRD V3.0 보고서 내용 */}
        <div className="container mx-auto px-4 py-8">
          {/* 보고서 정보 카드 */}
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600 mb-1">PRD V3.0</div>
                  <div className="text-sm text-green-700">시스템 버전</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">24</div>
                  <div className="text-sm text-blue-700">페이지 보고서</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {reportState.reportData.scores?.grade || 'A'}
                  </div>
                  <div className="text-sm text-purple-700">종합 등급</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {reportState.reportData.scores?.percentage || 85}%
                  </div>
                  <div className="text-sm text-orange-700">AI 역량 점수</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* HTML 보고서 즉시 표시 */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>PRD V3.0 기반 24페이지 AI 역량진단 보고서</span>
                <Badge variant="outline" className="ml-auto">
                  HTML 즉시 확인
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* PRD V3.0 HTML 보고서 즉시 렌더링 */}
              <div 
                className="w-full min-h-screen"
                dangerouslySetInnerHTML={{ 
                  __html: reportState.reportData.reportHtml || '<p>PRD V3.0 보고서 로드 중...</p>' 
                }}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '20px',
                  fontFamily: 'Malgun Gothic, Apple SD Gothic Neo, sans-serif',
                  lineHeight: '1.6'
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  // 기본 로딩 상태
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
        <p>PRD V3.0 시스템 초기화 중...</p>
      </div>
    </div>
  );
}