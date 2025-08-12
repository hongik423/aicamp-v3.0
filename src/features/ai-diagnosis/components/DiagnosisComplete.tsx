'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Mail, Calendar, ArrowRight, FileText, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

interface DiagnosisCompleteProps {
  result: {
    success: boolean;
    diagnosisId?: string;
    reportUrl?: string;
    message?: string;
  };
}

const DiagnosisComplete: React.FC<DiagnosisCompleteProps> = ({ result }) => {
  const router = useRouter();

  React.useEffect(() => {
    // 완료 축하 애니메이션
    if (result.success) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [result.success]);

  const nextSteps = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "이메일 확인",
      description: "입력하신 이메일로 상세 보고서가 발송되었습니다",
      action: "받은편지함 확인"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "보고서 검토",
      description: "AI가 분석한 맞춤형 전략을 확인하세요",
      action: "보고서 보기",
      onClick: () => result.reportUrl && window.open(result.reportUrl, '_blank')
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "전문가 상담",
      description: "1:1 맞춤 컨설팅으로 구체적인 실행 방안을 수립하세요",
      action: "상담 신청",
      onClick: () => router.push('/consultation')
    }
  ];

  if (!result.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-red-600">진단 처리 중 오류 발생</CardTitle>
            <CardDescription>
              {result.message || '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => window.location.reload()} 
              className="w-full"
            >
              다시 시도
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI 역량진단이 완료되었습니다!
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            귀사의 AI 도입 준비도를 분석하여 맞춤형 전략을 수립했습니다
          </p>
          
          {result.diagnosisId && (
            <Badge variant="secondary" className="text-lg px-4 py-2">
              진단번호: {result.diagnosisId}
            </Badge>
          )}
        </motion.div>

        {/* 주요 결과 요약 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="mb-8 border-2 border-blue-200 bg-blue-50/30">
            <CardHeader>
              <CardTitle className="text-blue-900">
                ✨ 보고서가 생성되었습니다
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-gray-700">
                  GEMINI AI가 귀사의 상황을 분석하여 다음 내용을 포함한 맞춤형 보고서를 생성했습니다:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>현재 AI 성숙도 평가 및 업종 대비 벤치마크</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>SWOT 분석 및 전략적 제언</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>3단계 실행 로드맵 및 우선순위 매트릭스</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>투자 대비 효과(ROI) 분석</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>맞춤형 교육 커리큘럼 및 컨설팅 제안</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 다음 단계 안내 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            다음 단계
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {nextSteps.map((step, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={step.onClick}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                    {step.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {step.description}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      step.onClick?.();
                    }}
                  >
                    {step.action}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                AI 혁신 여정을 시작할 준비가 되셨나요?
              </h3>
              <p className="mb-6 text-blue-100">
                전문가와 함께 구체적인 실행 계획을 수립하고 성공적인 AI 도입을 시작하세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => router.push('/consultation')}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  무료 상담 신청
                </Button>
                {result.reportUrl && (
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="bg-white text-blue-600 hover:bg-blue-50"
                    onClick={() => window.open(result.reportUrl, '_blank')}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    보고서 다운로드
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 추가 정보 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center text-gray-600"
        >
          <p className="mb-2">
            보고서를 받지 못하셨나요? 스팸 메일함을 확인하시거나
          </p>
          <p>
            <a href="/support/contact" className="text-blue-600 hover:underline">
              고객지원팀에 문의
            </a>
            해주세요.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DiagnosisComplete;
