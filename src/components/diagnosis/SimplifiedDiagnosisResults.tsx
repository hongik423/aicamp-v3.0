'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { 
  FileText, 
  Download, 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle,
  AlertCircle,
  Sparkles,
  Star,
  TrendingUp,
  Target,
  Award
} from 'lucide-react';

interface SimplifiedDiagnosisResultsProps {
  data: any;
}

export default function SimplifiedDiagnosisResults({ data }: SimplifiedDiagnosisResultsProps) {
  const [isLoading, setIsLoading] = useState(false);

  // 안전한 데이터 추출
  const diagnosis = data?.data?.diagnosis || {};
  const companyName = data?.data?.회사명 || data?.data?.companyName || 'Unknown Company';
  const contactName = data?.data?.담당자명 || data?.data?.contactName || '담당자';
  const contactEmail = data?.data?.이메일 || data?.data?.email || '';
  const contactPhone = data?.data?.연락처 || data?.data?.phone || '';
  const totalScore = diagnosis?.totalScore || 75;
  const overallGrade = diagnosis?.overallGrade || 'B';
  const industry = data?.data?.업종 || data?.data?.industry || '일반 업종';

  // 점수에 따른 등급 결정
  const getGradeInfo = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'bg-green-500', description: '최우수' };
    if (score >= 80) return { grade: 'A', color: 'bg-green-400', description: '우수' };
    if (score >= 70) return { grade: 'B+', color: 'bg-blue-500', description: '양호' };
    if (score >= 60) return { grade: 'B', color: 'bg-blue-400', description: '보통' };
    if (score >= 50) return { grade: 'C', color: 'bg-orange-400', description: '개선 필요' };
    return { grade: 'D', color: 'bg-red-400', description: '미흡' };
  };

  const gradeInfo = getGradeInfo(totalScore);

  // 간소화된 결과 처리
  const handleResultSubmit = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      console.log('📊 진단 결과 처리 시작');
      
      toast({
        title: "진단 결과 처리 중...",
        description: "결과를 전송하고 있습니다.",
        duration: 3000,
      });

      const diagnosisData = {
        회사명: companyName,
        업종: industry,
        담당자명: contactName,
        연락처: contactPhone,
        이메일: contactEmail,
        개인정보동의: true,
        종합점수: totalScore,
        진단등급: overallGrade,
        진단보고서요약: diagnosis?.summaryReport || '진단 완료',
        문항별점수: diagnosis?.categoryResults || {},
        제출일시: new Date().toLocaleString('ko-KR'),
        timestamp: Date.now()
      };

      const response = await fetch('https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(diagnosisData)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "✅ 진단 결과 처리 완료!",
          description: `관리자 확인 후 ${contactEmail}로 연락드리겠습니다.`,
          duration: 7000,
        });
      } else {
        throw new Error(result.error);
      }

    } catch (error) {
      console.error('❌ 오류:', error);
      
      toast({
        title: "처리 실패",
        description: "네트워크를 확인하고 다시 시도해주세요.",
        variant: "destructive",
        duration: 5000,
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  // 간소화된 PDF 다운로드
  const handlePDFDownload = () => {
    toast({
      title: "PDF 다운로드",
      description: "브라우저의 인쇄 기능을 사용해 PDF로 저장하세요.",
      duration: 5000,
    });
    
    window.print();
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
                {totalScore}
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
          
          <Progress value={totalScore} className="h-3 mt-4" />
        </CardHeader>
      </Card>

      {/* 진단 요약 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            진단 요약
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">회사명:</span>
                <span>{companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">업종:</span>
                <span>{industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">담당자:</span>
                <span>{contactName}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">연락처:</span>
                <span>{contactPhone || '미제공'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">이메일:</span>
                <span className="text-sm">{contactEmail || '미제공'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">진단일:</span>
                <span>{new Date().toLocaleDateString('ko-KR')}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 개선 권장사항 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            개선 권장사항
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-800">강점 유지</h4>
                <p className="text-green-700 text-sm">현재 잘하고 있는 부분을 지속적으로 발전시키세요.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-800">개선 필요</h4>
                <p className="text-orange-700 text-sm">점수가 낮은 영역에 대한 집중적인 개선이 필요합니다.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 액션 버튼들 */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button 
          onClick={handlePDFDownload}
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          PDF 다운로드
        </Button>
        
        <Button 
          onClick={handleResultSubmit}
          disabled={isLoading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              처리 중...
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" />
              결과 제출
            </>
          )}
        </Button>
        
        <Button 
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => window.open('tel:010-9251-9743')}
        >
          <Phone className="w-4 h-4" />
          전문가 상담
        </Button>
      </div>

      {/* 연락처 정보 */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-gray-900">전문가 상담 문의</h3>
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
              이후경 경영지도사 | AI캠프 대표
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 