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
  Loader2
} from 'lucide-react';

import { 
  VisualReportGenerator, 
  transformDiagnosisData, 
  downloadFile,
  prepareEmailData 
} from '@/lib/utils/reportGenerator';

interface SimplifiedDiagnosisResultsProps {
  data: any;
}

export default function SimplifiedDiagnosisResults({ data }: SimplifiedDiagnosisResultsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

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

  const companyName = data.companyName || data.회사명 || '고객사';
  const totalScore = data.totalScore || data.종합점수 || 0;
  const recommendations = data.summaryReport || data.추천사항 || '';

  // totalScore가 유효한 숫자인지 확인
  const validTotalScore = typeof totalScore === 'number' && !isNaN(totalScore) ? totalScore : 0;

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

  // 🎨 시각적 보고서 다운로드
  const handlePDFDownload = async () => {
    setIsDownloading(true);
    
    try {
      toast({
        title: "📄 AI 진단보고서 생성 중...",
        description: "고품질 PDF 보고서를 생성하고 있습니다.",
        duration: 4000,
      });

      // 진단 데이터 변환
      const reportData = transformDiagnosisData({
        companyName: companyName,
        totalScore: validTotalScore,
        categoryScores: data.categoryScores || data.카테고리점수 || {},
        recommendations: recommendations,
        timestamp: data.timestamp || new Date().toISOString(),
        industry: data.industry || data.업종 || '기타',
        contactName: data.contactName || data.담당자명 || '담당자',
        email: data.email || data.이메일 || ''
      });

      const generator = new VisualReportGenerator();
      
      // HTML 보고서 생성
      const htmlContent = generator.generateHTMLReport(reportData);
      
      // 임시 iframe으로 HTML 렌더링
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
        setTimeout(resolve, 2000);
      });

      const reportElement = iframe.contentDocument?.getElementById('diagnosis-report');
      
      if (reportElement) {
        // PDF로 변환
        const pdfBlob = await generator.convertToPDF(reportElement);
        
        // 다운로드 실행
        const filename = `${companyName}_AI진단보고서_${new Date().toISOString().slice(0, 10)}.pdf`;
        downloadFile(pdfBlob, filename);
        
        toast({
          title: "✅ 다운로드 완료!",
          description: "시각적 AI 진단보고서가 성공적으로 다운로드되었습니다.",
          duration: 5000,
        });
      } else {
        throw new Error('보고서 요소를 찾을 수 없습니다.');
      }
      
      // 임시 iframe 제거
      document.body.removeChild(iframe);
      
    } catch (error) {
      console.error('PDF 다운로드 실패:', error);
      toast({
        title: "❌ 다운로드 실패",
        description: "PDF 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        duration: 5000,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  // 🔄 결과 제출 (이메일 전송 포함)
  const handleResultSubmit = async () => {
    setIsLoading(true);
    
    try {
      toast({
        title: "📧 결과 제출 및 이메일 발송 중...",
        description: "진단 결과를 처리하고 시각적 이메일을 발송하고 있습니다.",
        duration: 4000,
      });

      // 진단 데이터 변환
      const reportData = transformDiagnosisData({
        companyName: companyName,
        totalScore: validTotalScore,
        categoryScores: data.categoryScores || data.카테고리점수 || {},
        recommendations: recommendations,
        timestamp: data.timestamp || new Date().toISOString(),
        industry: data.industry || data.업종 || '기타',
        contactName: data.contactName || data.담당자명 || '담당자',
        email: data.email || data.이메일 || ''
      });

      // 이메일 데이터 준비
      const emailData = prepareEmailData(reportData);
      
      // API로 데이터 전송 (개선된 이메일 템플릿 포함)
      const response = await fetch('/api/simplified-diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          action: 'submitWithVisualEmail',
          emailData: {
            subject: emailData.subject,
            htmlContent: emailData.htmlContent,
            mobileHtmlContent: emailData.mobileHtmlContent,
            reportData: reportData
          }
        })
      });

      if (!response.ok) {
        throw new Error('결과 제출 실패');
      }

      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "🎉 제출 완료!",
          description: "진단 결과가 제출되었으며, 시각적 보고서가 이메일로 발송되었습니다.",
          duration: 6000,
        });
      } else {
        throw new Error(result.error || '알 수 없는 오류');
      }

    } catch (error) {
      console.error('결과 제출 실패:', error);
      toast({
        title: "❌ 제출 실패",
        description: "결과 제출 중 오류가 발생했습니다. 아래 연락처로 직접 문의해주세요.",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🎉 AI 무료진단 결과
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
      {data.categoryScores && Object.keys(data.categoryScores).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              영역별 진단 결과
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(data.categoryScores).map(([category, score], index) => (
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

      {/* 액션 버튼 */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button 
          onClick={handlePDFDownload}
          variant="outline" 
          disabled={isDownloading}
          className="flex items-center gap-2 min-w-[200px]"
        >
          {isDownloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              PDF 생성 중...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              📄 시각적 보고서 다운로드
            </>
          )}
        </Button>
        
        <Button 
          onClick={handleResultSubmit}
          disabled={isLoading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 min-w-[200px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              처리 중...
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" />
              📧 결과 제출 및 이메일 발송
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
          시각적 보고서를 다운로드하시거나, 결과 제출 버튼을 클릭하여 
          <br />전문가 상담을 받아보세요. 더 자세한 분석과 맞춤형 솔루션을 제공해드립니다.
        </p>
      </div>
    </div>
  );
} 