'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Trophy, 
  TrendingUp, 
  Star, 
  Award, 
  Target,
  FileText,
  Download,
  Mail,
  Phone,
  Loader2
} from 'lucide-react';

import { 
  VisualReportGenerator, 
  transformDiagnosisData, 
  downloadFile,
  prepareEmailData 
} from '@/lib/utils/reportGenerator';

interface SimpleDiagnosisResultsProps {
  data: {
    companyName: string;
    diagnosis: {
      totalScore: number;
      categoryResults: Array<{
        category: string;
        score: number;
        averageScore: number;
      }>;
      recommendations: string;
    };
    enhanced: boolean;
    analysisEngine: string;
    timestamp: string;
  };
}

export default function SimpleDiagnosisResults({ data }: SimpleDiagnosisResultsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();
  const reportRef = useRef<HTMLDivElement>(null);

  // 데이터 안전성 검증
  if (!data) {
    console.warn('⚠️ SimpleDiagnosisResults: data가 undefined입니다');
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

  console.log('🔍 SimpleDiagnosisResults 받은 데이터:', data);
  
  // 실제 API 응답 구조: {success: true, data: {diagnosis: {...}, summaryReport: "..."}}
  const diagnosis = data?.data?.diagnosis;
  const summaryReport = data?.data?.summaryReport;

  // diagnosis 객체 확인
  if (!diagnosis) {
    console.error('❌ diagnosis 객체를 찾을 수 없습니다:', {
      hasData: !!data,
      hasDataProperty: !!data?.data,
      hasDiagnosis: !!data?.data?.diagnosis,
      dataKeys: data ? Object.keys(data) : 'no data',
      dataDataKeys: data?.data ? Object.keys(data.data) : 'no data.data'
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
  const { 
    totalScore = 0, 
    categoryResults = [], 
    recommendations = '' 
  } = diagnosis;

  console.log('✅ SimpleDiagnosisResults 데이터 추출 완료:', {
    companyName,
    totalScore,
    categoryResultsLength: categoryResults.length,
    hasRecommendations: !!recommendations,
    diagnosisKeys: diagnosis ? Object.keys(diagnosis) : 'no diagnosis'
  });

  // 등급 정보 계산
  const getGradeInfo = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'bg-green-500', description: '최우수' };
    if (score >= 85) return { grade: 'A', color: 'bg-green-400', description: '우수' };
    if (score >= 80) return { grade: 'B+', color: 'bg-blue-500', description: '양호' };
    if (score >= 75) return { grade: 'B', color: 'bg-blue-400', description: '보통' };
    if (score >= 70) return { grade: 'C+', color: 'bg-yellow-500', description: '개선 필요' };
    if (score >= 65) return { grade: 'C', color: 'bg-yellow-400', description: '개선 권장' };
    if (score >= 60) return { grade: 'D+', color: 'bg-orange-500', description: '미흡' };
    if (score >= 55) return { grade: 'D', color: 'bg-orange-400', description: '부족' };
    return { grade: 'F', color: 'bg-red-500', description: '위험' };
  };

  const gradeInfo = getGradeInfo(totalScore);

  // 🎨 시각적 보고서 다운로드
  const handleDownloadReport = async () => {
    setIsDownloading(true);
    
    try {
      toast({
        title: "📄 보고서 생성 중...",
        description: "시각적 AI 진단 보고서를 생성하고 있습니다.",
        duration: 3000,
      });

      // 진단 데이터 변환
      const reportData = transformDiagnosisData({
        companyName: companyName,
        totalScore: totalScore,
        categoryScores: categoryResults.reduce((acc, category) => {
          acc[category.category] = category.averageScore;
          return acc;
        }, {} as { [key: string]: number }),
        recommendations: recommendations,
        timestamp: diagnosis.timestamp,
        industry: '기타', // 기본값
        contactName: '담당자',
        email: ''
      });

      const generator = new VisualReportGenerator();
      
      // HTML 보고서 생성
      const htmlContent = generator.generateHTMLReport(reportData);
      
      // 임시 iframe을 사용해서 HTML을 렌더링하고 PDF로 변환
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.left = '-9999px';
      iframe.style.width = '800px';
      iframe.style.height = '1200px';
      document.body.appendChild(iframe);
      
      iframe.contentDocument?.open();
      iframe.contentDocument?.write(htmlContent);
      iframe.contentDocument?.close();
      
      // iframe이 완전히 로드될 때까지 대기
      await new Promise(resolve => {
        iframe.onload = resolve;
        setTimeout(resolve, 2000); // 최대 2초 대기
      });

      const reportElement = iframe.contentDocument?.getElementById('diagnosis-report');
      
      if (reportElement) {
        // PDF로 변환
        const pdfBlob = await generator.convertToPDF(reportElement, `${companyName}_AI진단보고서.pdf`);
        
        // 다운로드 실행
        downloadFile(pdfBlob, `${companyName}_AI진단보고서_${new Date().toISOString().slice(0, 10)}.pdf`);
        
        toast({
          title: "✅ 다운로드 완료!",
          description: "AI 진단 보고서가 다운로드되었습니다.",
          duration: 4000,
        });
      } else {
        throw new Error('보고서 요소를 찾을 수 없습니다.');
      }
      
      // 임시 iframe 제거
      document.body.removeChild(iframe);
      
    } catch (error) {
      console.error('보고서 다운로드 실패:', error);
      toast({
        title: "❌ 다운로드 실패",
        description: "보고서 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        duration: 5000,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  // 🔄 기존 결과 제출 로직
  const handleResultSubmit = async () => {
    setIsLoading(true);
    
    try {
      toast({
        title: "📊 결과 제출 중...",
        description: "진단 결과를 처리하고 있습니다.",
        duration: 3000,
      });

      // 진단 데이터 변환 (이메일 전송용)
      const reportData = transformDiagnosisData({
        companyName: companyName,
        totalScore: totalScore,
        categoryScores: categoryResults.reduce((acc, category) => {
          acc[category.category] = category.averageScore;
          return acc;
        }, {} as { [key: string]: number }),
        recommendations: recommendations,
        timestamp: diagnosis.timestamp,
        industry: '기타',
        contactName: '담당자',
        email: ''
      });

      // 이메일 데이터 준비
      const emailData = prepareEmailData(reportData);
      
      // Google Apps Script로 데이터 전송 (기존 로직 유지)
      const response = await fetch('/api/simplified-diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data, // 전체 데이터 전송
          action: 'submitResults',
          emailTemplate: emailData.htmlContent,
          mobileEmailTemplate: emailData.mobileHtmlContent
        })
      });

      if (!response.ok) {
        throw new Error('결과 제출 실패');
      }

      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "🎉 제출 완료!",
          description: "진단 결과가 성공적으로 제출되었습니다. 전문가가 검토 후 연락드리겠습니다.",
          duration: 5000,
        });
      } else {
        throw new Error(result.error || '알 수 없는 오류');
      }

    } catch (error) {
      console.error('결과 제출 실패:', error);
      toast({
        title: "❌ 제출 실패",
        description: "결과 제출 중 오류가 발생했습니다. 전화 상담을 이용해주세요.",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* 헤더 */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-900">
            🎉 AI 진단 완료!
          </h1>
        </div>
        <p className="text-lg text-gray-600">
          <strong className="text-blue-600">{companyName}</strong>의 종합 진단 결과입니다
        </p>
      </div>

      {/* 종합 점수 카드 */}
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-8 h-8 text-yellow-500" />
            <CardTitle className="text-2xl">종합 진단 점수</CardTitle>
          </div>
          
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {totalScore}
              </div>
              <div className="text-lg text-gray-600">점 / 100점</div>
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
          
          <Progress value={totalScore} className="h-3 mt-4" />
        </CardHeader>
      </Card>

      {/* 카테고리별 결과 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            영역별 진단 결과
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryResults.map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold text-gray-900">{category.category}</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-gray-600">평균 점수</span>
                    <span className="text-lg font-bold text-blue-600">
                      {category.averageScore.toFixed(1)}점
                    </span>
                  </div>
                  <Progress value={(category.averageScore / 5) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 개선 권장사항 */}
      {recommendations && (
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <TrendingUp className="w-6 h-6" />
              💡 개선 권장사항
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none text-gray-700">
              {recommendations.split('\n').map((line, index) => (
                <p key={index} className="mb-2">{line}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 액션 버튼 */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button 
          onClick={handleResultSubmit}
          disabled={isLoading}
          className="flex-1"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              처리 중...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-5 w-5" />
              진단 결과 제출
            </>
          )}
        </Button>
        
        <Button 
          variant="outline"
          className="flex-1"
          size="lg"
          onClick={handleDownloadReport}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              생성 중...
            </>
          ) : (
            <>
              <Download className="mr-2 h-5 w-5" />
              📄 AI 진단보고서 다운로드
            </>
          )}
        </Button>
      </div>

      {/* 안내 메시지 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="text-center space-y-2">
          <p className="text-blue-800 font-medium">
            🎯 진단이 완료되었습니다!
          </p>
          <p className="text-blue-700 text-sm">
            <strong>전문가 상담</strong>을 원하시면 결과 제출을 클릭하거나 아래 연락처로 문의해주세요.
          </p>
          <div className="flex justify-center gap-4 mt-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.open('tel:010-9251-9743')}
              className="text-blue-600 hover:text-blue-700"
            >
              <Phone className="w-4 h-4 mr-1" />
              010-9251-9743
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.open('mailto:hongik423@gmail.com')}
              className="text-blue-600 hover:text-blue-700"
            >
              <Mail className="w-4 h-4 mr-1" />
              이메일 문의
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 