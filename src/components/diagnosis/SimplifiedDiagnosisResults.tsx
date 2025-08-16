'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Award, 
  Download, 
  Mail, 
  Phone, 
  Target,
  Star,
  TrendingUp,
  Loader2,
  Clock
} from 'lucide-react';

// PDF 및 복잡한 보고서 생성 기능 제거됨
// import { 
//   VisualReportGenerator, 
//   transformDiagnosisData, 
//   downloadFile,
//   prepareEmailData 
// } from '@/lib/utils/reportGenerator';

import { submitDiagnosisToGoogle } from '@/lib/utils/emailService';

interface SimplifiedDiagnosisResultsProps {
  data: any;
}

export default function SimplifiedDiagnosisResults({ data }: SimplifiedDiagnosisResultsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [persistentNoticeOpen, setPersistentNoticeOpen] = useState(false);

  // 타임아웃/백그라운드 처리 상황 체크
  if (data?.isTimeout || data?.data?.diagnosis?.backgroundProcessing) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="border-2 border-orange-200 shadow-lg bg-gradient-to-br from-orange-50 to-yellow-50">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-10 h-10 text-orange-600 animate-pulse" />
            </div>
            <CardTitle className="text-2xl text-orange-900">
              🤖 AI 분석이 진행 중입니다
            </CardTitle>
            <p className="text-orange-700 text-lg mt-2">
              {data.data?.diagnosis?.companyName || '귀하의 기업'}에 대한 고품질 분석을 위해<br />
              백그라운드에서 처리 중입니다
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📋 처리 현황</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-blue-900">예상 완료 시간</span>
                  <span className="text-blue-700 font-bold">
                    {data.data?.diagnosis?.estimatedTime || '5-15분'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-900">진단 ID</span>
                  <span className="text-green-700 font-mono text-sm">
                    {data.data?.diagnosis?.diagnosisId || 'PROCESSING'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-yellow-900 mb-3">⏰ 다음 단계</h3>
              <div className="space-y-2 text-sm text-yellow-800">
                <p>✅ 신청이 정상적으로 접수되었습니다</p>
                <p>🤖 AI가 고품질 보고서를 생성하고 있습니다</p>
                <p>📧 완료 시 이메일로 결과를 발송해드립니다</p>
                <p>📞 필요시 전문가가 직접 연락드립니다</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.location.href = '/consultation'}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                전문가 상담 신청
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="border-gray-300 hover:bg-gray-50"
              >
                홈으로 돌아가기
              </Button>
            </div>
            
            <div className="text-xs text-gray-500 mt-6">
              💡 고품질 AI 분석을 위해 추가 시간이 소요되고 있습니다.<br />
              결과는 이메일로 안전하게 전달됩니다.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 데이터 안전성 검증
  if (!data) {
    console.warn('⚠️ SimplifiedDiagnosisResults: data가 undefined입니다');
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-2 border-red-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-red-600">진단 결과 오류</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-gray-600 mb-4">진단 결과 데이터를 불러올 수 없습니다.</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              새로고침
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  console.log('🔍 SimplifiedDiagnosisResults 받은 데이터:', data);

  // API 응답 구조 유연하게 처리
  let diagnosis, summaryReport;
  
  // 1. 새로운 API 응답 구조: {success: true, results: {...}, htmlReport: "..."}
  if (data?.results) {
    diagnosis = {
      companyName: data.results.companyName || '고객사',
      totalScore: data.results.totalScore || 0,
      maturityLevel: data.results.maturityLevel || 'Beginner',
      contactName: data.results.contactName || '',
      contactEmail: data.results.contactEmail || ''
    };
    summaryReport = data.analysis || data.htmlReport || '';
  }
  // 2. 기존 API 응답 구조: {success: true, data: {diagnosis: {...}, summaryReport: "..."}}
  else if (data?.data?.diagnosis) {
    diagnosis = data.data.diagnosis;
    summaryReport = data.data.summaryReport;
  }
  // 3. 직접 데이터 구조
  else if (data?.totalScore !== undefined) {
    diagnosis = data;
    summaryReport = data.analysis || data.summaryReport || '';
  }
  
  // diagnosis 객체 확인
  if (!diagnosis) {
    console.error('❌ diagnosis 객체를 찾을 수 없습니다:', {
      hasData: !!data,
      hasResults: !!data?.results,
      hasDataProperty: !!data?.data,
      hasDiagnosis: !!data?.data?.diagnosis,
      dataKeys: data ? Object.keys(data) : 'no data',
      sampleData: data ? JSON.stringify(data).substring(0, 200) : 'no data'
    });
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-2 border-red-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-red-600">진단 결과 처리 오류</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-gray-600 mb-4">진단 데이터 구조에 문제가 있습니다.</p>
            <p className="text-sm text-gray-500 mb-4">
              디버깅 정보: {JSON.stringify({
                hasData: !!data,
                hasDataProperty: !!data?.data,
                dataKeys: data ? Object.keys(data) : 'none'
              })}
            </p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              새로고침
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // 안전한 데이터 추출
  const companyName = diagnosis.companyName || '고객사';
  const totalScore = diagnosis.totalScore || 0;
  const recommendations = summaryReport || diagnosis.recommendations || '';

  // totalScore가 유효한 숫자인지 확인
  const validTotalScore = typeof totalScore === 'number' && !isNaN(totalScore) ? totalScore : 0;
  
  // 이메일 발송 상태 확인
  const emailSent = data?.gas?.emailsSent || data?.emailStatus?.status === 'sent' || false;
  const adminNotified = data?.gas?.adminNotified || false;
  
  console.log('✅ SimplifiedDiagnosisResults 데이터 추출 완료:', {
    companyName,
    totalScore: validTotalScore,
    emailSent,
    adminNotified,
    hasGasData: !!data?.gas,
    hasEmailStatus: !!data?.emailStatus
  });

  console.log('✅ SimplifiedDiagnosisResults 데이터 추출 완료:', {
    companyName,
    totalScore,
    validTotalScore,
    hasRecommendations: !!recommendations,
    diagnosisKeys: diagnosis ? Object.keys(diagnosis) : 'no diagnosis'
  });

  // 등급 정보 계산
  const getGradeInfo = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'bg-green-500', description: '최우수 - 탁월한 경영 역량' };
    if (score >= 85) return { grade: 'A', color: 'bg-green-400', description: '우수 - 뛰어난 경영 역량' };
    if (score >= 80) return { grade: 'B+', color: 'bg-blue-500', description: '양호 - 좋은 경영 역량' };
    if (score >= 75) return { grade: 'B', color: 'bg-blue-400', description: '보통 - 평균적 경영 역량' };
    if (score >= 70) return { grade: 'C+', color: 'bg-yellow-500', description: '개선 필요 - 노력이 필요함' };
    if (score >= 65) return { grade: 'C', color: 'bg-yellow-400', description: '개선 권장 - 체계적 개선 필요' };
    if (score >= 60) return { grade: 'D+', color: 'bg-orange-500', description: '미흡 - 적극적 개선 필요' };
    if (score >= 55) return { grade: 'D', color: 'bg-orange-400', description: '부족 - 전면적 개선 필요' };
    return { grade: 'F', color: 'bg-red-500', description: '위험 - 즉시 전문가 상담 필요' };
  };

  const gradeInfo = getGradeInfo(validTotalScore);

  // 🎯 등급 정보 헬퍼 함수
  const getGradeFromScore = (score: number): string => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B+';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C+';
    if (score >= 40) return 'C';
    return 'D';
  };

  // 🎯 맥킨지 스타일 보고서 시스템 - V14.2 ULTIMATE INTEGRATED
  const handleMcKinseyReportRequest = async () => {
    setIsSubmitting(true);
    setPersistentNoticeOpen(true);
    
    try {
      toast({
        title: "🎯 맥킨지 스타일 보고서 생성 중...",
        description: "GEMINI 2.5 Flash AI가 전문적인 분석 보고서를 생성하고 있습니다.",
        duration: 5000,
      });

      // 맥킨지 보고서 데이터 준비
      const mckinseyReportData = {
        companyName: companyName,
        contactName: diagnosis?.contactName || diagnosis?.담당자명 || '담당자',
        contactEmail: diagnosis?.email || diagnosis?.이메일 || '',
        contactPhone: diagnosis?.phone || diagnosis?.연락처 || '',
        industry: diagnosis?.industry || diagnosis?.업종 || '기타',
        totalScore: validTotalScore,
        maturityLevel: validTotalScore >= 80 ? 'Expert' : validTotalScore >= 60 ? 'Advanced' : validTotalScore >= 40 ? 'Intermediate' : 'Beginner',
        reportType: 'mckinsey_style',
        systemVersion: 'V14.2_ULTIMATE_INTEGRATED',
        timestamp: new Date().toISOString(),
        // 맥킨지 보고서 전용 필드
        requestMcKinseyReport: true,
        includeSwotAnalysis: true,
        includeRoadmap: true,
        includeN8nWorkflow: true,
        includeBenchmark: true
      };

      console.log('🎯 맥킨지 보고서 요청 데이터:', mckinseyReportData);

      // Google Apps Script V14.2 ULTIMATE로 맥킨지 보고서 요청
      const result = await submitDiagnosisToGoogle(mckinseyReportData);
      const background = (result as any)?.isTimeout || (result as any)?.backgroundProcessing;
      
      if (result.success) {
        toast({
          title: "🎉 맥킨지 보고서 생성 완료!",
          description: background 
            ? "GEMINI 2.5 Flash AI가 맥킨지 스타일 보고서를 생성 중입니다. 완료 시 이메일로 전달됩니다." 
            : "맥킨지 스타일 AI 역량진단 보고서가 생성되었습니다. 이메일을 확인해주세요.",
          duration: 8000,
        });
      } else {
        throw new Error(result.error || '맥킨지 보고서 생성 실패');
      }

    } catch (error) {
      console.error('진단 접수 실패:', error);
      toast({
        title: "❌ 접수 실패",
        description: "진단 접수 중 오류가 발생했습니다. 아래 연락처로 직접 문의해주세요.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      🎉 AI 역량진단 결과
        </h1>
        <p className="text-gray-600">
          <strong>{companyName}</strong>의 종합 진단 결과입니다
        </p>
      </div>

      {/* 종합 점수 카드 */}
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-8 h-8 text-yellow-500" />
            <CardTitle className="text-2xl">종합 진단 점수</CardTitle>
          </div>
          
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {validTotalScore}
              </div>
              <div className="text-lg text-gray-600">점</div>
            </div>
            
            <div className="text-center">
              <Badge className={`text-white text-xl px-4 py-2 ${gradeInfo.color}`}>
                {gradeInfo.grade}등급
              </Badge>
              <div className="text-sm text-gray-600 mt-2">
                {gradeInfo.description}
              </div>
            </div>
          </div>
          
          <Progress value={validTotalScore} className="h-3 mt-4" />
        </CardHeader>
      </Card>

      {/* 카테고리별 결과 */}
      {diagnosis?.categoryScores && Object.keys(diagnosis?.categoryScores).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              영역별 진단 결과
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(diagnosis?.categoryScores).map(([category, score], index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <h3 className="font-semibold text-gray-900 text-sm">{category}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-gray-600">점수</span>
                      <span className="text-lg font-bold text-blue-600">
                        {typeof score === 'number' ? score.toFixed(1) : score}점
                      </span>
                    </div>
                    <Progress 
                      value={typeof score === 'number' ? (score / 5) * 100 : 0} 
                      className="h-2" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 진단 요약 */}
      {recommendations && (
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <TrendingUp className="w-6 h-6" />
              💡 AI 분석 결과 및 개선 권장사항
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none text-gray-700">
              {recommendations.split('\n').map((line, index) => (
                <p key={index} className="mb-2 leading-relaxed">{line}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 진단 접수 버튼 */}
      <div className="flex justify-center">
        <Button 
          onClick={handleMcKinseyReportRequest}
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 min-w-[300px] py-3 text-lg shadow-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              맥킨지 보고서 생성 중...
            </>
          ) : (
            <>
              <Award className="w-5 h-5" />
              🎯 맥킨지 스타일 보고서 요청
            </>
          )}
        </Button>
        
        <Button 
          variant="outline"
          className="flex items-center gap-2 min-w-[200px]"
          onClick={() => window.open('tel:010-9251-9743')}
        >
          <Phone className="w-4 h-4" />
          📞 전문가 상담
        </Button>
      </div>

      {/* 연락처 정보 */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-gray-900">🤝 전문가 상담 문의</h3>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                010-9251-9743
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                hongik423@gmail.com
              </div>
            </div>
            <p className="text-xs text-gray-500">
              이후경 경영지도사 | AICAMP AI교육센터 대표
            </p>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                💡 <strong>무료 서비스:</strong> 첫 상담(30분), 현황 진단, 정부 지원 프로그램 안내
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 안내 메시지 */}
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-lg p-4 text-center">
        <p className="text-blue-800 mb-2">
          🎯 <strong>AI 진단이 완료되었습니다!</strong>
        </p>
        <p className="text-blue-700 text-sm">
          위의 접수 신청 버튼을 클릭하시면 진단 결과가 저장되고,
          <br />접수 확인 메일을 발송해드립니다. 전문가 상담도 함께 받아보세요!
        </p>
      </div>

      {/* 진행 고정 오버레이 (결과보고서 발송까지 유지) */}
      {persistentNoticeOpen && (
        <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-4">
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="font-semibold">AI 보고서 생성 및 이메일 발송 대기</span>
              </div>
              <p className="text-white/80 text-sm mt-1">완성된 결과보고서가 신청자 이메일로 전송될 때까지 이 안내는 유지됩니다.</p>
            </div>
            <div className="p-4 space-y-3 text-sm text-gray-700">
              <div className="flex items-center justify-between">
                <span>진단 ID</span>
                <span className="font-mono text-xs">{diagnosis?.diagnosisId || '생성 중'}</span>
              </div>
              <div className="rounded-lg border bg-blue-50 border-blue-200 p-3">
                <p className="text-blue-900 font-medium">예상 소요 시간: 5~15분</p>
                <p className="text-blue-800/80 mt-1">GEMINI 2.5 Flash가 고품질 분석을 수행 중입니다.</p>
              </div>
              <div className="rounded-lg border bg-green-50 border-green-200 p-3">
                <p className="text-green-900 font-medium">이메일 전송 단계</p>
                <ul className="list-disc list-inside text-green-800/90 mt-1 space-y-1">
                  <li>접수 확인 메일</li>
                  <li>결과보고서 메일(HTML 첨부)</li>
                </ul>
              </div>
              <p className="text-xs text-gray-500">창을 닫지 않고 대기해도 되며, 창을 닫아도 결과는 이메일로 전달됩니다.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 