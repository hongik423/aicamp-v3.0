'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/header';
import { 
  Brain, 
  Download, 
  ArrowLeft, 
  Trophy,
  TrendingUp,
  Star,
  Award,
  Target,
  FileText,
  Mail,
  Phone,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface DiagnosisResult {
  companyName: string;
  contactManager: string;
  email: string;
  industry: string;
  employeeCount: string;
  totalScore: number;
  categoryResults: Array<{
    category: string;
    score: number;
    averageScore: number;
  }>;
  recommendations: string;
  summaryReport: string;
  detailedScores?: any;
  timestamp: string;
  resultId: string;
}

export default function DiagnosisResultPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const reportRef = useRef<HTMLDivElement>(null);
  
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);

  const resultId = params?.resultId as string;

  useEffect(() => {
    if (resultId) {
      loadDiagnosisResult(resultId);
    }
  }, [resultId]);

  const loadDiagnosisResult = async (id: string) => {
    try {
      setLoading(true);
      setError('');

      // 결과 ID에서 정보 추출 시도
      const response = await fetch(`/api/diagnosis-results/${id}`);
      
      if (!response.ok) {
        throw new Error('진단 결과를 찾을 수 없습니다.');
      }
      
      const data = await response.json();
      
      if (data.success && data.result) {
        setResult(data.result);
      } else {
        throw new Error(data.message || '진단 결과를 불러올 수 없습니다.');
      }
    } catch (err) {
      console.error('진단 결과 로딩 오류:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadHTML = async () => {
    if (!result || !reportRef.current) return;

    try {
      setIsDownloading(true);

      // HTML 콘텐츠 생성
      const htmlContent = generateHTMLReport(result);
      
      // HTML 파일 다운로드
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `AI진단결과보고서_${result.companyName}_${new Date().toISOString().slice(0, 10)}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "📄 보고서 다운로드 완료",
        description: "HTML 형식의 진단 결과 보고서가 다운로드되었습니다.",
      });
    } catch (error) {
      console.error('HTML 다운로드 오류:', error);
      toast({
        title: "❌ 다운로드 실패",
        description: "보고서 다운로드 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const generateHTMLReport = (result: DiagnosisResult): string => {
    const currentDate = new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI 진단 결과보고서 - ${result.companyName}</title>
    <style>
        body {
            font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
            line-height: 1.8;
            margin: 0;
            padding: 40px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            color: #333;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 60px 40px;
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
        }
        .header-content {
            position: relative;
            z-index: 1;
        }
        .logo {
            width: 80px;
            height: 80px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            margin: 0 auto 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            backdrop-filter: blur(10px);
        }
        .header h1 {
            font-size: 2.8rem;
            margin: 0 0 15px 0;
            font-weight: 700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .header p {
            font-size: 1.3rem;
            margin: 0;
            opacity: 0.9;
        }
        .content {
            padding: 50px 40px;
        }
        .company-info {
            background: linear-gradient(135deg, #f8faff 0%, #e8f4f8 100%);
            padding: 40px;
            border-radius: 20px;
            margin-bottom: 40px;
            border: 1px solid #e1e8ed;
        }
        .company-info h2 {
            color: #2c5aa0;
            margin: 0 0 25px 0;
            font-size: 1.8rem;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 25px;
        }
        .info-item {
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            border-left: 4px solid #4285f4;
        }
        .info-label {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 600;
        }
        .info-value {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
        }
        .score-section {
            background: linear-gradient(135deg, #4285f4 0%, #34a853 100%);
            color: white;
            padding: 50px 40px;
            border-radius: 20px;
            text-align: center;
            margin: 40px 0;
            box-shadow: 0 10px 30px rgba(66, 133, 244, 0.3);
        }
        .score-big {
            font-size: 4.5rem;
            font-weight: 800;
            margin: 20px 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .score-label {
            font-size: 1.4rem;
            opacity: 0.9;
            margin-bottom: 20px;
        }
        .grade-badge {
            display: inline-block;
            background: rgba(255,255,255,0.2);
            padding: 12px 30px;
            border-radius: 50px;
            font-size: 1.2rem;
            font-weight: 700;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255,255,255,0.3);
        }
        .categories-section {
            margin: 50px 0;
        }
        .categories-section h2 {
            color: #2c5aa0;
            font-size: 2rem;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .category-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
        }
        .category-card {
            background: white;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.08);
            border: 1px solid #f0f0f0;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .category-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.12);
        }
        .category-title {
            font-size: 1.3rem;
            font-weight: 700;
            color: #333;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .category-score {
            font-size: 2.2rem;
            font-weight: 800;
            color: #4285f4;
            margin-bottom: 15px;
        }
        .progress-bar {
            width: 100%;
            height: 8px;
            background: #f0f0f0;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 10px;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #4285f4, #34a853);
            border-radius: 4px;
            transition: width 0.3s ease;
        }
        .recommendations-section {
            background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
            padding: 40px;
            border-radius: 20px;
            margin: 40px 0;
            border: 1px solid #ffc107;
        }
        .recommendations-section h2 {
            color: #e65100;
            font-size: 2rem;
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .recommendations-content {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #5d4037;
            white-space: pre-line;
        }
        .report-section {
            background: #f8f9fa;
            padding: 40px;
            border-radius: 20px;
            margin: 40px 0;
            border-left: 8px solid #17a2b8;
        }
        .report-section h2 {
            color: #0c5460;
            font-size: 2rem;
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .report-content {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #495057;
            white-space: pre-line;
        }
        .footer {
            background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
            color: white;
            padding: 50px 40px;
            text-align: center;
        }
        .footer h3 {
            font-size: 1.8rem;
            margin-bottom: 20px;
        }
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-top: 30px;
            flex-wrap: wrap;
        }
        .contact-item {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.1rem;
        }
        .print-only {
            display: none;
        }
        @media print {
            body { padding: 0; background: white; }
            .container { box-shadow: none; }
            .print-only { display: block; }
        }
        @media (max-width: 768px) {
            body { padding: 20px; }
            .content { padding: 30px 20px; }
            .header { padding: 40px 20px; }
            .header h1 { font-size: 2.2rem; }
            .score-big { font-size: 3.5rem; }
            .contact-info { flex-direction: column; gap: 15px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-content">
                <div class="logo">🎯</div>
                <h1>AI 진단 결과보고서</h1>
                <p>AICAMP - 비즈니스 성장 솔루션</p>
            </div>
        </div>
        
        <div class="content">
            <div class="company-info">
                <h2>📋 기업 정보</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">회사명</div>
                        <div class="info-value">${result.companyName}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">담당자</div>
                        <div class="info-value">${result.contactManager}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">업종</div>
                        <div class="info-value">${result.industry}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">직원수</div>
                        <div class="info-value">${result.employeeCount}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">진단일시</div>
                        <div class="info-value">${currentDate}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">결과 ID</div>
                        <div class="info-value">${result.resultId}</div>
                    </div>
                </div>
            </div>
            
            <div class="score-section">
                <div class="score-label">종합 진단 점수</div>
                <div class="score-big">${result.totalScore}</div>
                <div class="score-label">100점 만점</div>
                <div class="grade-badge">${getGradeFromScore(result.totalScore)} 등급</div>
            </div>
            
            <div class="categories-section">
                <h2>🎯 영역별 진단 결과</h2>
                <div class="category-grid">
                    ${result.categoryResults.map(category => `
                        <div class="category-card">
                            <div class="category-title">
                                ⭐ ${category.category}
                            </div>
                            <div class="category-score">${category.averageScore.toFixed(1)}점</div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${(category.averageScore / 5) * 100}%"></div>
                            </div>
                            <div style="text-align: right; font-size: 0.9rem; color: #666; margin-top: 8px;">
                                5점 만점
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="recommendations-section">
                <h2>💡 개선 권장사항</h2>
                <div class="recommendations-content">${result.recommendations}</div>
            </div>
            
            <div class="report-section">
                <h2>📊 상세 분석 보고서</h2>
                <div class="report-content">${result.summaryReport}</div>
            </div>
        </div>
        
        <div class="footer">
            <h3>AICAMP AI교육센터</h3>
            <p>AI기반 비즈니스 성장 솔루션</p>
            <div class="contact-info">
                <div class="contact-item">
                    📞 010-9251-9743
                </div>
                <div class="contact-item">
                    📧 hongik423@gmail.com
                </div>
                <div class="contact-item">
                    🌐 https://ai-camp-landingpage.vercel.app
                </div>
            </div>
            <div style="margin-top: 30px; font-size: 0.9rem; opacity: 0.8;">
                본 보고서는 AI 기반 진단 시스템을 통해 생성되었습니다.<br>
                추가 상담이나 문의사항은 언제든 연락해주세요.
            </div>
        </div>
    </div>
</body>
</html>`;
  };

  const getGradeFromScore = (score: number): string => {
    if (score >= 90) return 'A+';
    if (score >= 85) return 'A';
    if (score >= 80) return 'B+';
    if (score >= 75) return 'B';
    if (score >= 70) return 'C+';
    if (score >= 65) return 'C';
    if (score >= 60) return 'D+';
    if (score >= 55) return 'D';
    return 'F';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                진단 결과 로딩 중...
              </h3>
              <p className="text-sm text-gray-600 text-center">
                잠시만 기다려주세요
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <Card className="w-full max-w-md border-red-200">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                결과를 찾을 수 없습니다
              </h3>
              <p className="text-sm text-gray-600 text-center mb-6">
                {error || '진단 결과를 불러올 수 없습니다.'}
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => router.push('/diagnosis')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  새 진단 시작
                </Button>
                <Button
                  onClick={() => router.back()}
                  variant="outline"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  뒤로가기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      
      <main className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* 상단 네비게이션 */}
          <div className="flex items-center justify-between mb-8">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              뒤로가기
            </Button>
            
            <Button
              onClick={handleDownloadHTML}
              disabled={isDownloading}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              HTML 보고서 다운로드
            </Button>
          </div>

          {/* 결과 헤더 */}
          <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Brain className="w-12 h-12" />
                <h1 className="text-3xl md:text-4xl font-bold">
                  AI 진단 결과보고서
                </h1>
              </div>
              <p className="text-xl opacity-90">
                {result.companyName}의 비즈니스 성장 진단 결과
              </p>
              <div className="mt-4 text-sm opacity-80">
                진단 ID: {result.resultId}
              </div>
            </CardContent>
          </Card>

          {/* 기업 정보 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="w-6 h-6 text-blue-600" />
                기업 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium mb-1">회사명</div>
                  <div className="text-lg font-semibold">{result.companyName}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-green-600 font-medium mb-1">담당자</div>
                  <div className="text-lg font-semibold">{result.contactManager}</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-sm text-purple-600 font-medium mb-1">업종</div>
                  <div className="text-lg font-semibold">{result.industry}</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-sm text-orange-600 font-medium mb-1">직원수</div>
                  <div className="text-lg font-semibold">{result.employeeCount}</div>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <div className="text-sm text-teal-600 font-medium mb-1">진단일시</div>
                  <div className="text-lg font-semibold">{result.timestamp}</div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="text-sm text-indigo-600 font-medium mb-1">등급</div>
                  <div className="text-lg font-semibold">
                    <Badge variant="default" className="text-lg py-1 px-3">
                      {getGradeFromScore(result.totalScore)}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 종합 점수 */}
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <h2 className="text-2xl font-bold text-gray-900">종합 진단 점수</h2>
              </div>
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {result.totalScore}
              </div>
              <div className="text-xl text-gray-600 mb-4">100점 만점</div>
              <Badge 
                variant="default" 
                className="text-xl py-2 px-6 bg-blue-600 hover:bg-blue-700"
              >
                {getGradeFromScore(result.totalScore)} 등급
              </Badge>
            </CardContent>
          </Card>

          {/* 영역별 결과 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Target className="w-6 h-6 text-blue-600" />
                영역별 진단 결과
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.categoryResults.map((category, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg border">
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <h3 className="font-semibold text-gray-900">{category.category}</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm text-gray-600">평균 점수</span>
                        <span className="text-2xl font-bold text-blue-600">
                          {category.averageScore.toFixed(1)}점
                        </span>
                      </div>
                      <Progress value={(category.averageScore / 5) * 100} className="h-3" />
                      <div className="text-right text-xs text-gray-500">5점 만점</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 개선 권장사항 */}
          <Card className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="w-6 h-6 text-orange-600" />
                개선 권장사항
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                <div className="whitespace-pre-line text-base">
                  {result.recommendations}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 상세 분석 보고서 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Award className="w-6 h-6 text-purple-600" />
                상세 분석 보고서
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                <div className="whitespace-pre-line text-base">
                  {result.summaryReport}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 연락처 정보 */}
          <Card className="bg-gradient-to-r from-slate-50 to-gray-100">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                추가 상담이 필요하시나요?
              </h3>
              <p className="text-gray-600 mb-6">
                진단 결과를 바탕으로 맞춤형 컨설팅을 제공해드립니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2 text-blue-600">
                  <Phone className="w-5 h-5" />
                  <span className="font-semibold">010-9251-9743</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <Mail className="w-5 h-5" />
                  <span className="font-semibold">hongik423@gmail.com</span>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  onClick={() => router.push('/consultation')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  전문가 상담 신청하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 