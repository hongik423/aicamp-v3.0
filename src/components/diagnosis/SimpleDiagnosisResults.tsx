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
  Star
} from 'lucide-react';

interface SimpleDiagnosisResultsProps {
  data: any;
}

export default function SimpleDiagnosisResults({ data }: SimpleDiagnosisResultsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const diagnosis = data.data.diagnosis;
  const companyName = data.data.회사명 || 'Unknown Company';
  const contactName = data.data.담당자명 || '담당자';
  const contactEmail = data.data.이메일 || '';
  const totalScore = diagnosis.totalScore || 75;
  const overallGrade = diagnosis.overallGrade || 'B';

  // 간소화된 진단 결과 처리
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
        업종: data.data.업종 || '일반 업종',
        담당자명: contactName,
        연락처: data.data.연락처 || '',
        이메일: contactEmail,
        개인정보동의: true,
        종합점수: totalScore,
        진단보고서요약: diagnosis.summaryReport || '진단 완료',
        문항별점수: diagnosis.categoryResults || {},
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

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-500';
      case 'B': return 'bg-blue-500';
      case 'C': return 'bg-yellow-500';
      case 'D': return 'bg-orange-500';
      case 'F': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <Sparkles className="h-6 w-6 text-yellow-500" />;
    if (score >= 80) return <Star className="h-6 w-6 text-blue-500" />;
    if (score >= 70) return <CheckCircle className="h-6 w-6 text-green-500" />;
    return <AlertCircle className="h-6 w-6 text-orange-500" />;
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <FileText className="h-4 w-4" />
          AI 진단 결과
        </div>
        <h1 className="text-3xl font-bold mb-2">
          {companyName}의 진단 결과
        </h1>
        <p className="text-muted-foreground">
          AI 기반 정밀 진단 완료
        </p>
      </div>

      {/* 종합 점수 */}
      <Card className="border-2 border-blue-200">
        <CardHeader className="text-center pb-2">
          <CardTitle className="flex items-center justify-center gap-2">
            {getScoreIcon(totalScore)}
            종합 점수
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-6xl font-bold mb-4 text-blue-600">
            {totalScore}
            <span className="text-2xl text-muted-foreground">점</span>
          </div>
          <Badge 
            className={`text-white px-4 py-2 text-lg ${getGradeColor(overallGrade)}`}
          >
            등급: {overallGrade}
          </Badge>
          <Progress value={totalScore} className="mt-4 h-3" />
        </CardContent>
      </Card>

      {/* 기업 정보 */}
      <Card>
        <CardHeader>
          <CardTitle>기업 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-medium">회사명:</span>
            <span>{companyName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">업종:</span>
            <span>{data.data.업종 || '일반 업종'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>{contactName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>{contactEmail}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString('ko-KR')}</span>
          </div>
        </CardContent>
      </Card>

      {/* 진단 요약 */}
      {diagnosis.summaryReport && (
        <Card>
          <CardHeader>
            <CardTitle>진단 요약</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {diagnosis.summaryReport}
            </p>
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
          <FileText className="mr-2 h-5 w-5" />
          {isLoading ? '처리 중...' : '진단 결과 제출'}
        </Button>
        
        <Button 
          variant="outline"
          className="flex-1"
          size="lg"
        >
          <Download className="mr-2 h-5 w-5" />
          결과 다운로드
        </Button>
      </div>

      {/* 안내 메시지 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
        <p className="text-blue-800">
          🎯 진단이 완료되었습니다! 
          <br />
          <strong>전문가 상담</strong>을 원하시면 결과 제출을 클릭해주세요.
        </p>
      </div>
    </div>
  );
} 