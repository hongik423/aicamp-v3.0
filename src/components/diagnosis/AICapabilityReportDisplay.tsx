'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, 
  Share2, 
  Mail, 
  FileText, 
  TrendingUp, 
  BarChart3,
  Target,
  Award,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Building,
  Users,
  Brain,
  Sparkles,
  Zap,
  Shield,
  RefreshCw,
  Clock,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { 
  DEPARTMENT_AI_TRACKS,
  INDUSTRY_AI_USECASES,
  AI_MATURITY_LEVELS 
} from '@/lib/utils/aiCampAnalysisEngine';

interface AICapabilityReportProps {
  reportData: any;
  companyInfo: {
    name: string;
    email: string;
    industry: string;
    employees?: string;
  };
  diagnosisId: string;
}

export default function AICapabilityReportDisplay({ 
  reportData, 
  companyInfo, 
  diagnosisId 
}: AICapabilityReportProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const [showBanner, setShowBanner] = useState(true);

  // HTML 보고서 다운로드 기능
  const downloadHTMLReport = async () => {
    if (!reportRef.current) return;
    
    setIsDownloading(true);
    try {
      const reportHTML = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI 역량진단 결과 보고서 - ${companyInfo.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.6;
      color: #333;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }
    .container { 
      max-width: 1200px; 
      margin: 0 auto; 
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: white;
      padding: 40px;
      text-align: center;
    }
    .header h1 { 
      font-size: 2.5em; 
      margin-bottom: 10px;
      font-weight: 700;
    }
    .header p { 
      font-size: 1.2em;
      opacity: 0.95;
    }
    .logo {
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
      background: white;
      border-radius: 20px;
      padding: 10px;
    }
    .content { 
      padding: 40px;
    }
    .section {
      margin-bottom: 40px;
      padding: 30px;
      background: #f9fafb;
      border-radius: 15px;
      border: 1px solid #e5e7eb;
    }
    .section-title {
      font-size: 1.8em;
      color: #1f2937;
      margin-bottom: 20px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .score-card {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .score-item {
      background: white;
      padding: 20px;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .score-value {
      font-size: 2.5em;
      font-weight: bold;
      color: #6366f1;
    }
    .score-label {
      color: #6b7280;
      margin-top: 10px;
    }
    .swot-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-top: 20px;
    }
    .swot-box {
      background: white;
      padding: 20px;
      border-radius: 12px;
      border: 2px solid;
    }
    .swot-strength { border-color: #10b981; }
    .swot-weakness { border-color: #f59e0b; }
    .swot-opportunity { border-color: #3b82f6; }
    .swot-threat { border-color: #ef4444; }
    .roadmap {
      background: white;
      padding: 30px;
      border-radius: 12px;
      margin-top: 20px;
    }
    .roadmap-step {
      display: flex;
      gap: 20px;
      margin-bottom: 25px;
      padding-bottom: 25px;
      border-bottom: 1px solid #e5e7eb;
    }
    .roadmap-step:last-child {
      border-bottom: none;
    }
    .step-number {
      width: 50px;
      height: 50px;
      background: #6366f1;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2em;
      flex-shrink: 0;
    }
    .step-content h3 {
      color: #1f2937;
      margin-bottom: 10px;
    }
    .step-content ul {
      color: #6b7280;
      margin-left: 20px;
    }
    .footer {
      background: #f3f4f6;
      padding: 30px;
      text-align: center;
      color: #6b7280;
    }
    .cta-section {
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      margin-top: 30px;
      color: white;
    }
    .cta-section h3 {
      font-size: 1.5em;
      margin-bottom: 15px;
    }
    .cta-button {
      display: inline-block;
      background: white;
      color: #f59e0b;
      padding: 12px 30px;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 600;
      margin-top: 15px;
    }
    @media print {
      body { background: white; padding: 0; }
      .container { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        <img src="/api/placeholder/80/80" alt="AICAMP Logo" style="width: 100%; height: 100%; object-fit: contain;">
      </div>
      <h1>AI 역량진단 결과 보고서</h1>
      <p>${companyInfo.name} | ${new Date().toLocaleDateString('ko-KR')}</p>
    </div>
    
    <div class="content">
      ${reportRef.current.innerHTML}
    </div>
    
    <div class="footer">
      <p>본 보고서는 AICAMP AI 역량진단 시스템을 통해 자동 생성되었습니다.</p>
              <p>문의: hongik423@gmail.com | 웹사이트: aicamp.club</p>
      <p>© 2024 AICAMP. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;

      // Blob 생성 및 다운로드
      const blob = new Blob([reportHTML], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `AI역량진단_${companyInfo.name}_${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // 다운로드 이벤트 추적
      console.log('📥 HTML 보고서 다운로드 완료:', {
        company: companyInfo.name,
        diagnosisId,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('다운로드 오류:', error);
      alert('보고서 다운로드 중 오류가 발생했습니다.');
    } finally {
      setIsDownloading(false);
    }
  };

  // 이메일 공유 기능
  const shareViaEmail = () => {
    const subject = `AI 역량진단 결과 보고서 - ${companyInfo.name}`;
    const body = `안녕하세요,\n\nAI 역량진단 결과를 공유합니다.\n\n진단 ID: ${diagnosisId}\n회사명: ${companyInfo.name}\n\n자세한 내용은 첨부된 보고서를 확인해주세요.\n\n감사합니다.\nAICAMP`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      {/* 상단 배너 광고 형식 알림 */}
      {showBanner && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-xl mb-6 relative animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Sparkles className="w-8 h-8" />
              <div>
                <h3 className="font-bold text-lg">🎉 AI 역량진단이 완료되었습니다!</h3>
                <p className="text-sm opacity-90">맞춤형 AI 도입 전략과 실행 로드맵을 확인하세요</p>
              </div>
            </div>
            <button 
              onClick={() => setShowBanner(false)}
              className="text-white/80 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 액션 버튼 그룹 */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button 
          onClick={downloadHTMLReport}
          disabled={isDownloading}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          {isDownloading ? '다운로드 중...' : 'HTML 보고서 다운로드'}
        </Button>
        
        <Button 
          onClick={shareViaEmail}
          variant="outline"
        >
          <Mail className="w-4 h-4 mr-2" />
          이메일로 공유
        </Button>

        <Button 
          variant="outline"
          onClick={() => window.print()}
        >
          <FileText className="w-4 h-4 mr-2" />
          인쇄하기
        </Button>
      </div>

      {/* 보고서 본문 */}
      <div ref={reportRef} className="space-y-8">
        {/* 종합 평가 섹션 */}
        <Card className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 border-0">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-8 h-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">종합 AI 역량 평가</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {reportData?.totalScore || 75}점
              </div>
              <div className="text-sm text-gray-600">종합 점수</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {reportData?.grade || 'B+'}
              </div>
              <div className="text-sm text-gray-600">AI 성숙도 등급</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                상위 {reportData?.percentile || 25}%
              </div>
              <div className="text-sm text-gray-600">업계 순위</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">
                {reportData?.potential || '높음'}
              </div>
              <div className="text-sm text-gray-600">성장 잠재력</div>
            </div>
          </div>
        </Card>

        {/* SWOT 분석 */}
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">SWOT 분석</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-green-200 rounded-xl p-6 bg-green-50">
              <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                강점 (Strengths)
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {reportData?.swot?.strengths?.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>{item}</span>
                  </li>
                )) || [
                  <li key="1" className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>디지털 전환 의지가 강함</span>
                  </li>,
                  <li key="2" className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>경영진의 AI 도입 지원</span>
                  </li>
                ]}
              </ul>
            </div>

            <div className="border-2 border-yellow-200 rounded-xl p-6 bg-yellow-50">
              <h3 className="font-bold text-yellow-800 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                약점 (Weaknesses)
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {reportData?.swot?.weaknesses?.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <span>{item}</span>
                  </li>
                )) || [
                  <li key="1" className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <span>AI 전문 인력 부족</span>
                  </li>,
                  <li key="2" className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <span>데이터 관리 체계 미흡</span>
                  </li>
                ]}
              </ul>
            </div>

            <div className="border-2 border-blue-200 rounded-xl p-6 bg-blue-50">
              <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                기회 (Opportunities)
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {reportData?.swot?.opportunities?.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span>{item}</span>
                  </li>
                )) || [
                  <li key="1" className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span>정부 지원 사업 활용 가능</span>
                  </li>,
                  <li key="2" className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span>AI 시장 급성장</span>
                  </li>
                ]}
              </ul>
            </div>

            <div className="border-2 border-red-200 rounded-xl p-6 bg-red-50">
              <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                위협 (Threats)
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {reportData?.swot?.threats?.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-red-600 mt-0.5" />
                    <span>{item}</span>
                  </li>
                )) || [
                  <li key="1" className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-red-600 mt-0.5" />
                    <span>경쟁사 AI 도입 가속화</span>
                  </li>,
                  <li key="2" className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-red-600 mt-0.5" />
                    <span>기술 변화 속도</span>
                  </li>
                                ]}
              </ul>
            </div>
          </div>
          
          {/* SWOT 전략 매트릭스 */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-bold text-lg mb-4">🎯 SWOT 기반 전략</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4">
                <h4 className="font-semibold text-green-800 mb-2">SO 전략 (강점-기회)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {reportData?.swotStrategies?.SO?.map((item: string, idx: number) => (
                    <li key={idx}>• {item}</li>
                  )) || [
                    <li key="1">• AI 선도 기업으로의 포지셔닝</li>,
                    <li key="2">• 정부 지원사업 적극 활용</li>
                  ]}
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">WO 전략 (약점-기회)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {reportData?.swotStrategies?.WO?.map((item: string, idx: number) => (
                    <li key={idx}>• {item}</li>
                  )) || [
                    <li key="1">• 약점 보완을 위한 교육 투자</li>,
                    <li key="2">• 외부 전문가 영입 및 협업</li>
                  ]}
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4">
                <h4 className="font-semibold text-blue-800 mb-2">ST 전략 (강점-위협)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {reportData?.swotStrategies?.ST?.map((item: string, idx: number) => (
                    <li key={idx}>• {item}</li>
                  )) || [
                    <li key="1">• 강점 기반 차별화 전략</li>,
                    <li key="2">• 선제적 기술 도입으로 경쟁 우위</li>
                  ]}
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4">
                <h4 className="font-semibold text-red-800 mb-2">WT 전략 (약점-위협)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {reportData?.swotStrategies?.WT?.map((item: string, idx: number) => (
                    <li key={idx}>• {item}</li>
                  )) || [
                    <li key="1">• 핵심 약점 우선 개선</li>,
                    <li key="2">• 리스크 최소화 접근</li>
                  ]}
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* 중요도-긴급성 매트릭스 */}
        <Card className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">중요도-긴급성 매트릭스</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-100 rounded-xl p-6">
              <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                1순위: 즉시 실행 (높은 중요도 + 높은 긴급성)
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {reportData?.priorityMatrix?.highImportanceHighUrgency?.map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                )) || [
                  <li>• AI 기초 교육 실시</li>,
                  <li>• 경영진 AI 이해도 향상</li>,
                  <li>• AI 전략 수립</li>
                ]}
              </ul>
            </div>
            
            <div className="bg-yellow-100 rounded-xl p-6">
              <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                2순위: 계획 수립 (높은 중요도 + 낮은 긴급성)
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {reportData?.priorityMatrix?.highImportanceLowUrgency?.map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                )) || [
                  <li>• 데이터 인프라 구축</li>,
                  <li>• AI 인재 채용</li>,
                  <li>• 예산 확보</li>
                ]}
              </ul>
            </div>
            
            <div className="bg-blue-100 rounded-xl p-6">
              <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                3순위: 위임/자동화 (낮은 중요도 + 높은 긴급성)
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {reportData?.priorityMatrix?.lowImportanceHighUrgency?.map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                )) || [
                  <li>• 벤치마킹 실시</li>,
                  <li>• 단기 성과 창출</li>,
                  <li>• 내부 홍보</li>
                ]}
              </ul>
            </div>
            
            <div className="bg-gray-100 rounded-xl p-6">
              <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                4순위: 제거/보류 (낮은 중요도 + 낮은 긴급성)
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {reportData?.priorityMatrix?.lowImportanceLowUrgency?.map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                )) || [
                  <li>• 고급 AI 기술 검토</li>,
                  <li>• 장기 로드맵 수립</li>
                ]}
              </ul>
            </div>
          </div>
        </Card>
        
        {/* 3단계 실행 로드맵 */}
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <RefreshCw className="w-8 h-8 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">AI 역량 강화 3단계 실행 로드맵</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  1단계: 기초 구축 (0-3개월)
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 ml-7">
                  <li>• AI 역량 진단 및 현황 분석</li>
                  <li>• 임직원 AI 기초 교육 실시</li>
                  <li>• 파일럿 프로젝트 선정</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  2단계: 확산 적용 (3-6개월)
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 ml-7">
                  <li>• 핵심 업무 AI 도입</li>
                  <li>• 데이터 관리 체계 구축</li>
                  <li>• 성과 측정 및 개선</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  3단계: 고도화 (6-12개월)
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 ml-7">
                  <li>• AI 기반 의사결정 체계 구축</li>
                  <li>• 전사적 AI 문화 정착</li>
                  <li>• 지속적 혁신 체계 운영</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* 투자 대비 효과 분석 */}
        <Card className="p-8 bg-gradient-to-br from-orange-50 to-yellow-50">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-8 h-8 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">투자 대비 효과 분석</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-3">예상 투자 비용</h3>
              <div className="text-3xl font-bold text-orange-600">
                {reportData?.roi?.investment || '5,000만원'}
              </div>
              <p className="text-sm text-gray-600 mt-2">초기 6개월 기준</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-3">예상 절감 효과</h3>
              <div className="text-3xl font-bold text-green-600">
                {reportData?.roi?.savings || '연 1.5억원'}
              </div>
              <p className="text-sm text-gray-600 mt-2">업무 효율화 기준</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-3">ROI</h3>
              <div className="text-3xl font-bold text-purple-600">
                {reportData?.roi?.percentage || '300%'}
              </div>
              <p className="text-sm text-gray-600 mt-2">1년 기준</p>
            </div>
          </div>
        </Card>

        {/* 부서별 AI 교육 트랙 추천 */}
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-8 h-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">부서별 맞춤 AI 교육 트랙</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(DEPARTMENT_AI_TRACKS).slice(0, 3).map(([key, track]) => (
              <div key={key} className="border rounded-xl p-4 hover:shadow-lg transition-shadow">
                <div className="text-2xl mb-2">{track.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{track.name}</h3>
                <div className="text-sm text-gray-600 mb-3">
                  <p className="font-semibold mb-1">핵심 스킬:</p>
                  <ul className="text-xs space-y-1">
                    {track.skills.slice(0, 3).map((skill, idx) => (
                      <li key={idx}>• {skill}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full text-center">
                  {track.expectedOutcome}
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* AICAMP 맞춤형 제안 */}
        <Card className="p-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">AICAMP 맞춤형 AI 교육 프로그램</h2>
            <p className="text-lg mb-8 opacity-95">
              {companyInfo.name}님을 위한 특별 제안
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-bold mb-2">임직원 AI 교육</h3>
                <p className="text-sm opacity-90">맞춤형 커리큘럼 제공</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Brain className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-bold mb-2">AI 컨설팅</h3>
                <p className="text-sm opacity-90">전문가 1:1 컨설팅</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Award className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-bold mb-2">정부지원 연계</h3>
                <p className="text-sm opacity-90">최대 80% 지원</p>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={() => window.location.href = '/consultation'}
            >
              무료 상담 신청하기
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}