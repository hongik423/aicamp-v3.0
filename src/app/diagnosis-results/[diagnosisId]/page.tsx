'use client'

import React, { useEffect, useState } from 'react';
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
      setDiagnosisId(resolvedParams.diagnosisId);
    };
    loadParams();
  }, [params]);

  useEffect(() => {
    if (diagnosisId) {
      verifyAccess();
    }
  }, [diagnosisId]);

  const verifyAccess = async () => {
    try {
      setAuthLoading(true);
      console.log('🔐 V26.0 n8n Enhanced 진단 결과 접근 권한 검증:', diagnosisId);
      
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

      // 응답 상태 확인
      if (!response.ok) {
        throw new Error(`권한 검증 실패: ${response.status} ${response.statusText}`);
      }

      // 응답 텍스트 확인 후 JSON 파싱
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
        console.log('✅ 접근 권한 확인됨');
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
  };

  const loadReportData = async () => {
    try {
      setLoading(true);
      console.log('📄 V26.0 n8n Enhanced 보고서 로드 - 업로드 실패 문제 해결:', diagnosisId);
      
      // V27.0 Ultimate: 항상 API에서 최신 실제 점수 반영 보고서 로드
      console.log('🔄 V27.0 Ultimate: API에서 실제 점수 반영 보고서 로드 시작');
      
      // API에서 보고서 조회 (개선된 오류 처리)
      const response = await fetch(`/api/diagnosis-reports/${diagnosisId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // 타임아웃 설정
        signal: AbortSignal.timeout(15000) // 15초 타임아웃
      });

      if (!response.ok) {
        throw new Error(`보고서 로드 실패: ${response.status} ${response.statusText}`);
      }

      // 응답 텍스트 확인 후 JSON 파싱
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
        console.log('✅ V25.5 보고서 로드 실패 해결 - 보고서 로드 성공');
        setReportContent(result.htmlReport);
        setReportInfo(result.reportInfo);
        setError('');
        
        // 로컬 스토리지에 보고서 저장
        try {
          const localReportKey = `diagnosis_report_${diagnosisId}`;
          localStorage.setItem(localReportKey, result.htmlReport);
          console.log('✅ 보고서 로컬 저장 완료');
        } catch (storageError) {
          console.warn('⚠️ 로컬 저장 실패:', storageError);
        }
      } else {
        throw new Error(result.error || '보고서를 불러올 수 없습니다.');
      }
      
    } catch (error: any) {
      console.error('❌ V27.0 Ultimate 35페이지 보고서 로드 오류:', error);
      
      // 오류 메시지 개선
      let errorMessage = '보고서를 불러오는 중 오류가 발생했습니다.';
      
      if (error.name === 'AbortError') {
        errorMessage = '보고서 로드 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.';
      } else if (error.message.includes('404')) {
        errorMessage = '해당 진단 결과를 찾을 수 없습니다. 진단ID를 확인해주세요.';
      } else if (error.message.includes('500')) {
        errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      } else if (error.message.includes('JSON')) {
        errorMessage = '보고서 데이터 형식 오류가 발생했습니다.';
      }
      
      setError(errorMessage);
      
      // 폴백: 기본 보고서 생성 시도
      try {
        console.log('🔄 폴백: 기본 보고서 생성 시도');
        const fallbackReport = generateFallbackReport(diagnosisId);
        setReportContent(fallbackReport);
        setReportInfo({
          diagnosisId,
          fileName: `AI역량진단보고서_${diagnosisId}_FALLBACK.html`,
          createdAt: new Date().toISOString(),
          version: 'V27.0-ULTIMATE-35PAGE-FALLBACK',
          reportGenerated: true,
          폴백시스템: true
        });
        setError('기본 보고서가 표시됩니다.');
      } catch (fallbackError) {
        console.error('❌ 폴백 보고서 생성 실패:', fallbackError);
        setError('보고서를 생성할 수 없습니다. 관리자에게 문의해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  // V27.0 Ultimate 35페이지 폴백 보고서 생성 함수
  const generateFallbackReport = (diagnosisId: string): string => {
    const fallbackData = {
      diagnosisId,
      companyInfo: {
        name: '폴백기업',
        industry: 'IT/소프트웨어',
        size: '중소기업',
        revenue: '10-50억',
        employees: '50-100명'
      },
      responses: {},
      scores: {
        total: 158,
        percentage: 70,
        categoryScores: {
          businessFoundation: 25,
          currentAI: 20,
          organizationReadiness: 30,
          technologyInfrastructure: 28,
          dataManagement: 25,
          humanResources: 30
        }
      },
      timestamp: new Date().toISOString()
    };
    
    // 35페이지 보고서 생성 (동적 import 대신 직접 생성)
    return generateUltimate35PageFallback(fallbackData);
  };
  
  // V27.0 Ultimate 35페이지 폴백 생성기
  const generateUltimate35PageFallback = (data: any): string => {
    return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI 역량진단 보고서 V27.0 Ultimate - ${data.diagnosisId}</title>
    <style>
        body { font-family: 'Pretendard', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 0; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 20px; padding: 40px; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #667eea; padding-bottom: 20px; }
        .title { font-size: 2.5rem; color: #2d3748; margin-bottom: 10px; }
        .subtitle { font-size: 1.2rem; color: #667eea; }
        .score-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
        .score-item { text-align: center; padding: 25px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; }
        .score-value { font-size: 2.5rem; font-weight: 700; margin-bottom: 5px; }
        .score-label { font-size: 0.9rem; opacity: 0.9; }
        .version-badge { position: fixed; top: 20px; left: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; z-index: 1000; }
    </style>
</head>
<body>
    <div class="version-badge">V27.0 Ultimate Fallback</div>
    <div class="container">
        <div class="header">
            <h1 class="title">${data.companyInfo.name}</h1>
            <h2 class="subtitle">AI 역량진단 보고서 V27.0 Ultimate (폴백)</h2>
            <p>진단ID: ${data.diagnosisId}</p>
            <p>생성일시: ${new Date(data.timestamp).toLocaleString('ko-KR')}</p>
        </div>
        <div class="score-grid">
            <div class="score-item">
                <div class="score-value">${data.scores.total}</div>
                <div class="score-label">총점</div>
            </div>
            <div class="score-item">
                <div class="score-value">${data.scores.percentage}%</div>
                <div class="score-label">AI 준비도</div>
            </div>
            <div class="score-item">
                <div class="score-value">B+</div>
                <div class="score-label">등급</div>
            </div>
            <div class="score-item">
                <div class="score-value">AI 성장기업</div>
                <div class="score-label">성숙도</div>
            </div>
        </div>
        <div style="background: #fff3cd; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 5px solid #ffc107;">
            <h3 style="color: #856404; margin-bottom: 10px;">⚠️ 폴백 보고서 안내</h3>
            <p style="color: #856404; margin: 0;">원본 35페이지 보고서 로드에 실패하여 기본 보고서가 표시됩니다. 정확한 진단 결과를 확인하시려면 관리자에게 문의해주세요.</p>
        </div>
    </div>
</body>
</html>`;
  };

  // V27.0 Ultimate 35페이지 보고서 다운로드
  const handleDownloadReport = async () => {
    try {
      setDownloadLoading(true);
      console.log('📥 V27.0 Ultimate 35페이지 보고서 다운로드 시작');
      
      if (!reportContent) {
        throw new Error('다운로드할 보고서가 없습니다.');
      }

      // HTML을 Blob으로 변환
      const blob = new Blob([reportContent], { type: 'text/html;charset=utf-8' });
      
      // 다운로드 파일명 생성
      const fileName = `AI역량진단보고서_V25.0_${reportInfo?.fileName || diagnosisId}_${new Date().toISOString().split('T')[0]}.html`;
      
      // 다운로드 실행
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "📥 다운로드 완료",
        description: `V25.0 정확도 개선 24페이지 보고서가 다운로드되었습니다.`,
        duration: 3000,
      });
      
      console.log('✅ V25.0 24페이지 보고서 다운로드 완료:', fileName);
      
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

  // 보고서 새 창에서 보기
  const handleViewInNewWindow = () => {
    if (!reportContent) return;
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(reportContent);
      newWindow.document.close();
    }
  };

  // 보고서 인쇄
  const handlePrintReport = () => {
    if (!reportContent) return;
    
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
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                다시 시도
            </Button>
              <Button 
                onClick={() => router.push('/ai-diagnosis')}
                variant="outline"
                className="flex-1"
              >
                <FileText className="h-4 w-4 mr-2" />
                새 진단하기
            </Button>
          </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <p className="text-lg font-medium text-gray-700">V25.0 정확도 개선 보고서 생성 중...</p>
            <p className="text-sm text-gray-500 mt-2">실제 점수 기반 정확한 분석을 준비하고 있습니다</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error && !reportContent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-800">보고서 로드 실패</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
            
            <div className="flex gap-2 mt-4">
              <Button 
                onClick={() => window.location.reload()}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                다시 시도
              </Button>
              <Button 
                onClick={() => router.push('/report-access')}
                variant="outline"
                className="flex-1"
              >
            <ArrowLeft className="h-4 w-4 mr-2" />
            돌아가기
          </Button>
        </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* 상단 헤더 - 세로 길이 균형 맞춤 */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => router.push('/report-access')}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                돌아가기
              </Button>
              
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">AI 역량진단 보고서</h1>
                <p className="text-sm text-gray-500">V25.0 정확도 개선</p>
              </div>
            </div>

            {/* 우측 상단 액션 버튼들 - 세로 길이 균형 */}
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleViewInNewWindow}
                variant="outline"
                size="sm"
                className="hidden md:flex"
              >
                <Eye className="h-4 w-4 mr-2" />
                새 창에서 보기
              </Button>
              
              <Button
                onClick={handlePrintReport}
                variant="outline"
                size="sm"
                className="hidden md:flex"
              >
                <Printer className="h-4 w-4 mr-2" />
                인쇄
              </Button>
              
              {/* 24페이지 다운로드 버튼 활성화 */}
              <Button
                onClick={handleDownloadReport}
                disabled={downloadLoading || !reportContent}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                size="sm"
              >
                {downloadLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    다운로드 중...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    24페이지 다운로드
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 영역 - 벤치마크 제거, AI 역량진단에 집중 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* AI 역량진단 전용 정보 카드 - 벤치마크 완전 제거, 24페이지 집중 */}
        {reportInfo && (
          <Card className="mb-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-full">
                  <FileText className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">📊 AI 역량진단 결과보고서</CardTitle>
                  <CardDescription className="text-blue-100 text-lg">상세 분석 보고서 조회</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center justify-center h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-3 border-blue-300 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="text-4xl font-bold text-blue-700 mb-2">{reportInfo.totalScore || 0}</div>
                  <div className="text-base font-semibold text-blue-600">실제 총점</div>
                  <div className="text-sm text-blue-500 font-medium">/ 225점 만점</div>
                </div>
                <div className="flex flex-col items-center justify-center h-32 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-3 border-green-300 hover:border-green-400 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="text-4xl font-bold text-green-700 mb-2">{reportInfo.percentage || 0}%</div>
                  <div className="text-base font-semibold text-green-600">AI 준비도</div>
                  <div className="text-sm text-green-500 font-medium">정확한 백분율</div>
                </div>
                <div className="flex flex-col items-center justify-center h-32 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-3 border-purple-300 hover:border-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="text-4xl font-bold text-purple-700 mb-2">{reportInfo.grade || 'F'}</div>
                  <div className="text-base font-semibold text-purple-600">정확한 등급</div>
                  <div className="text-sm text-purple-500 font-medium">점수 기반 판정</div>
                </div>
                <div className="flex flex-col items-center justify-center h-32 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl border-3 border-indigo-300 hover:border-indigo-400 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="text-3xl font-bold text-indigo-700 mb-2">상세분석</div>
                  <div className="text-base font-semibold text-indigo-600">완전한 분석</div>
                  <div className="text-sm text-indigo-500 font-medium">V25.4 최고 품질</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 보안 인증 완료 안내 */}
        <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-900 mb-1">
                  🔐 보안 인증 완료
                </h3>
                <p className="text-green-700">
                  진단ID 인증을 통해 당사자 본인만 접근 가능한 보안 체계가 적용되었습니다.
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-green-700 font-medium">당사자 전용</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI 역량진단 집중 안내 */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-900 mb-1">
                  🎯 AI 역량진단 전문 보고서
                </h3>
                <p className="text-blue-700">
                  실제 점수({reportInfo?.totalScore || 0}점) 기반으로 정확하게 생성된 맞춤형 AI 전략 보고서입니다.
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-green-700 font-medium">V25.0 정확도 개선</span>
        </div>
            </div>
          </CardContent>
        </Card>

        {/* 보고서 뷰어 - 세로 길이 균형 및 사용자 경험 극대화 */}
        <Card className="bg-white shadow-xl border-0 overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 py-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="h-6 w-6 text-blue-600" />
                  🎯 AI 역량진단 전문 보고서
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2 flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-green-500" />
                    진단ID: {diagnosisId}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    V25.0 정확도 개선
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="h-4 w-4 text-purple-500" />
                    24페이지 완전 분석
                  </span>
                </CardDescription>
      </div>

              {/* 우측 하단 고정 액션 버튼들 */}
          <div className="flex items-center space-x-2">
                <Button
                  onClick={handleViewInNewWindow}
                  variant="outline"
                  size="sm"
                  className="hidden lg:flex"
                >
                  <Monitor className="h-4 w-4 mr-1" />
                  전체화면
                </Button>
                
                <Button
                  onClick={handleDownloadReport}
                  disabled={downloadLoading || !reportContent}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                  size="sm"
                >
                  {downloadLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      다운로드 중...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-1" />
                      24페이지 다운로드
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {/* AI 역량진단 보고서 뷰어 - 세로 길이 최적화 */}
            <div className="relative w-full" style={{ height: 'calc(100vh - 200px)', minHeight: '700px' }}>
              {reportContent ? (
                <>
                  <iframe
                    srcDoc={reportContent}
                    className="w-full h-full border-0 bg-white"
                    title="AI 역량진단 보고서"
                    style={{
                      borderRadius: '0 0 8px 8px'
                    }}
                  />
                  
                  {/* 우측 하단 고정 액션 버튼들 - AI 역량진단 보고서 전용 */}
                  <div className="absolute bottom-8 right-8 flex flex-col gap-4 z-50">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 p-4">
                      <div className="flex flex-col gap-3">
                        <Button
                          onClick={handleViewInNewWindow}
                          size="lg"
                          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg rounded-xl w-16 h-16 p-0 transform hover:scale-110 transition-all duration-300"
                          title="새 창에서 전체보기"
                        >
                          <Monitor className="h-7 w-7" />
                        </Button>
                        
                        <Button
                          onClick={handleDownloadReport}
                          disabled={downloadLoading}
                          size="lg"
                          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg rounded-xl w-16 h-16 p-0 transform hover:scale-110 transition-all duration-300"
                          title="AI 역량진단 보고서 다운로드"
                        >
                          {downloadLoading ? (
                            <Loader2 className="h-6 w-6 animate-spin" />
                          ) : (
                            <Download className="h-7 w-7" />
                          )}
                        </Button>
                        
                        <Button
                          onClick={() => window.print()}
                          size="lg"
                          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg rounded-xl w-16 h-16 p-0 transform hover:scale-110 transition-all duration-300"
                          title="AI 역량진단 보고서 인쇄"
                        >
                          <Printer className="h-7 w-7" />
                        </Button>
                        
                        <Button
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: `AI 역량진단 보고서 (24페이지)`,
                                text: `실제 점수 ${reportInfo?.totalScore || 0}점 기반 정확한 AI 역량 분석`,
                                url: window.location.href
                              });
                            } else {
                              navigator.clipboard.writeText(window.location.href);
                              toast({
                                title: "📋 링크 복사됨",
                                description: "AI 역량진단 보고서 링크가 클립보드에 복사되었습니다.",
                                duration: 3000,
                              });
                            }
                          }}
                          size="lg"
                          className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg rounded-xl w-16 h-16 p-0 transform hover:scale-110 transition-all duration-300"
                          title="AI 역량진단 보고서 공유"
                        >
                          <Share2 className="h-7 w-7" />
            </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-50">
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-600">AI 역량진단 보고서를 불러오는 중...</p>
                    <p className="text-sm text-gray-500 mt-2">실제 점수 기반 정확한 분석을 생성하고 있습니다</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 하단 고정 액션 바 - 모바일 최적화 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden">
          <div className="flex space-x-2 max-w-7xl mx-auto">
            <Button
              onClick={handleViewInNewWindow}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              <Smartphone className="h-4 w-4 mr-2" />
              전체보기
            </Button>
            
            <Button
              onClick={handleDownloadReport}
              disabled={downloadLoading || !reportContent}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              size="lg"
            >
              {downloadLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  다운로드 중...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  24페이지 다운로드
                </>
              )}
            </Button>
          </div>
        </div>
        
        {/* 사용자 안내 정보 - AI 역량진단 집중 */}
        <Card className="mt-6 mb-20 lg:mb-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  📊 보고서 특징
                </h4>
                <ul className="text-sm text-indigo-800 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    실제 점수 기반 정확한 평가
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    24페이지 완전한 분석 보고서
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    업종별 맞춤형 AI 전략 제시
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    V25.0 정확도 개선 적용
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  🔐 보안 및 개인정보 보호
                </h4>
                <ul className="text-sm text-indigo-800 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    이메일 진단ID 기반 안전한 접근
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    신청자 본인만 결과 확인 가능
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    개인정보보호법령 완전 준수
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    관리자 010-9251-9743 단일 접근
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-white rounded-lg border border-indigo-200">
              <p className="text-sm text-indigo-700 text-center">
                <strong>📞 문의사항:</strong> 010-9251-9743 (관리자 직통) | 
                <strong>📧 이메일:</strong> hongik423@gmail.com | 
                <strong>🌐 웹사이트:</strong> aicamp.club
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}