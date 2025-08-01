'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
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
  Loader2,
  ExternalLink,
  Eye,
  BarChart3,
  Brain,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface CompleteDiagnosisResultsProps {
  data: {
    success: boolean;
    message: string;
    data: {
      diagnosis: {
        resultId: string;
        companyName: string;
        contactManager: string;
        email: string;
        phone: string;
        industry: string;
        employeeCount: string;
        businessLocation: string;
        
        // 🎯 완벽한 점수 체계
        totalScore: number;
        overallGrade: string;
        reliabilityScore: number;
        
        // 📊 5개 카테고리별 상세 점수
        categoryResults: Array<{
          category: string;
          score: number;
          score100: number;
          targetScore: number;
          benchmarkScore: number;
          weight: number;
          gapScore: number;
          strengths: string[];
          weaknesses: string[];
          itemResults: Array<{
            itemId: string;
            itemName: string;
            currentScore: number | null;
            targetScore: number;
            gap: number;
            priority: 'HIGH' | 'MEDIUM' | 'LOW';
            recommendation: string;
          }>;
        }>;
        
        // 🎯 SWOT 분석 완전판
        swotAnalysis: {
          strengths: string[];
          weaknesses: string[];
          opportunities: string[];
          threats: string[];
          strategicMatrix: string;
          strategies?: { // Added for new strategy display
            SO: string[];
            WO: string[];
            ST: string[];
            WT: string[];
          };
          aiAnalysis?: { // Added for AI analysis
            currentAITrends: string[];
            futureChanges: string[];
            adaptationStrategies: string[];
            competitiveAdvantages: string[];
          };
        };
        
        // 💡 맞춤형 추천사항
        recommendedActions: Array<{
          title: string;
          description: string;
          category: string;
          priority: 'HIGH' | 'MEDIUM' | 'LOW';
          timeframe: string;
          expectedImpact: string;
          implementationCost: 'LOW' | 'MEDIUM' | 'HIGH';
        }>;
        
        // 📈 비교 지표
        comparisonMetrics: {
          industryPercentile: number;
          competitivePosition: string;
          growthPotential: number;
        };
        
        comprehensiveReport: string;
        submitDate: string;
        processingTime: string;
        emailSent: boolean;
        emailError?: string;
        
        // 🆕 접수 확인 메일 상태
        confirmationEmailSent?: boolean;
        confirmationEmailError?: string;
      };
      
      summaryReport: string;
      reportLength: number;
      resultId: string;
      resultUrl: string;
      submitDate: string;
      processingTime: string;
      emailSent: boolean;
      emailError?: string;
    };
  };
}

export default function CompleteDiagnosisResults({ data }: CompleteDiagnosisResultsProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  const router = useRouter();
  const reportRef = useRef<HTMLDivElement>(null);

  // 데이터 안전성 검증
  if (!data || !data.success || !data.data || !data.data.diagnosis) {
    console.warn('⚠️ CompleteDiagnosisResults: 잘못된 데이터 구조입니다');
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-2 border-red-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-red-600">진단 결과 오류</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-gray-600 mb-4">완벽한 진단 결과 데이터를 불러올 수 없습니다.</p>
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

  const { diagnosis } = data.data;
  
  console.log('✅ 완벽한 진단결과 데이터 로드:', {
    companyName: diagnosis.companyName,
    totalScore: diagnosis.totalScore,
    grade: diagnosis.overallGrade,
    categoriesCount: diagnosis.categoryResults?.length || 0,
    swotComplete: !!(diagnosis.swotAnalysis?.strengths?.length && diagnosis.swotAnalysis?.weaknesses?.length),
    reportLength: diagnosis.comprehensiveReport?.length || 0,
    emailSent: data.emailSent || false
  });

  // 등급 정보 계산
  const getGradeInfo = (score: number) => {
    if (score >= 90) return { grade: 'S', color: 'bg-gradient-to-r from-yellow-400 to-yellow-600', description: '최우수', textColor: 'text-white' };
    if (score >= 80) return { grade: 'A', color: 'bg-gradient-to-r from-green-400 to-green-600', description: '우수', textColor: 'text-white' };
    if (score >= 70) return { grade: 'B', color: 'bg-gradient-to-r from-blue-400 to-blue-600', description: '양호', textColor: 'text-white' };
    if (score >= 60) return { grade: 'C', color: 'bg-gradient-to-r from-orange-400 to-orange-600', description: '보통', textColor: 'text-white' };
    return { grade: 'D', color: 'bg-gradient-to-r from-red-400 to-red-600', description: '개선필요', textColor: 'text-white' };
  };

  const gradeInfo = getGradeInfo(diagnosis.totalScore);

  // 완벽한 HTML 보고서 생성
  const generatePerfectHTMLReport = (): string => {
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
    <title>완벽한 AI 진단결과보고서 - ${diagnosis.companyName}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
            line-height: 1.8;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
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
            width: 100px;
            height: 100px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            margin: 0 auto 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255,255,255,0.3);
        }
        .header h1 {
            font-size: 3.2rem;
            margin: 0 0 15px 0;
            font-weight: 800;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            letter-spacing: -1px;
        }
        .header .subtitle {
            font-size: 1.4rem;
            opacity: 0.9;
            font-weight: 300;
        }
        .content {
            padding: 60px 40px;
        }
        
        /* 회사 정보 섹션 */
        .company-info {
            background: linear-gradient(135deg, #f8faff 0%, #e8f4f8 100%);
            padding: 50px;
            border-radius: 20px;
            margin-bottom: 50px;
            border: 1px solid #e1e8ed;
            position: relative;
            overflow: hidden;
        }
        .company-info::before {
            content: '🏢';
            position: absolute;
            top: 20px;
            right: 30px;
            font-size: 4rem;
            opacity: 0.1;
        }
        .company-info h2 {
            color: #2c5aa0;
            margin: 0 0 30px 0;
            font-size: 2.2rem;
            display: flex;
            align-items: center;
            gap: 15px;
            font-weight: 700;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
            margin-top: 30px;
        }
        .info-item {
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.08);
            border-left: 5px solid #4285f4;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .info-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 25px rgba(0,0,0,0.12);
        }
        .info-label {
            font-size: 1rem;
            color: #666;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
        }
        .info-value {
            font-size: 1.3rem;
            font-weight: 700;
            color: #333;
        }
        
        /* 종합 점수 섹션 */
        .score-hero {
            background: linear-gradient(135deg, #4285f4 0%, #34a853 100%);
            color: white;
            padding: 80px 60px;
            border-radius: 25px;
            text-align: center;
            margin: 50px 0;
            box-shadow: 0 15px 40px rgba(66, 133, 244, 0.4);
            position: relative;
            overflow: hidden;
        }
        .score-hero::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
        }
        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .score-content {
            position: relative;
            z-index: 1;
        }
        .score-big {
            font-size: 6rem;
            font-weight: 900;
            margin: 30px 0;
            text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
            line-height: 1;
        }
        .score-label {
            font-size: 1.6rem;
            opacity: 0.95;
            margin-bottom: 25px;
            font-weight: 300;
        }
        .grade-badge {
            display: inline-block;
            background: rgba(255,255,255,0.25);
            padding: 15px 40px;
            border-radius: 50px;
            font-size: 1.4rem;
            font-weight: 800;
            backdrop-filter: blur(15px);
            border: 2px solid rgba(255,255,255,0.3);
            margin-top: 20px;
        }
        .reliability-score {
            margin-top: 20px;
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        /* 카테고리 분석 섹션 */
        .categories-section {
            margin: 60px 0;
        }
        .categories-section h2 {
            color: #2c5aa0;
            font-size: 2.4rem;
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            gap: 15px;
            font-weight: 700;
        }
        .category-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 30px;
        }
        .category-card {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            border: 1px solid #f0f0f0;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        .category-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .category-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, #4285f4, #34a853);
        }
        .category-title {
            font-size: 1.5rem;
            font-weight: 800;
            color: #333;
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .category-score {
            font-size: 2.8rem;
            font-weight: 900;
            color: #4285f4;
            margin-bottom: 20px;
            line-height: 1;
        }
        .score-details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            font-size: 0.95rem;
            color: #666;
        }
        .progress-bar {
            width: 100%;
            height: 12px;
            background: #f0f0f0;
            border-radius: 6px;
            overflow: hidden;
            margin-bottom: 15px;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #4285f4, #34a853);
            border-radius: 6px;
            transition: width 0.8s ease;
        }
        .category-insights {
            margin-top: 25px;
        }
        .insight-section {
            margin-bottom: 20px;
        }
        .insight-title {
            font-size: 1rem;
            font-weight: 700;
            margin-bottom: 8px;
            color: #2c5aa0;
        }
        .insight-list {
            list-style: none;
            padding: 0;
        }
        .insight-list li {
            padding: 5px 0;
            font-size: 0.95rem;
            color: #555;
            position: relative;
            padding-left: 20px;
        }
        .insight-list li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: #4285f4;
            font-weight: bold;
        }
        
        /* SWOT 분석 섹션 */
        .swot-section {
            background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
            padding: 60px;
            border-radius: 25px;
            margin: 60px 0;
            border: 2px solid #ffc107;
        }
        .swot-section h2 {
            color: #e65100;
            font-size: 2.4rem;
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            gap: 15px;
            font-weight: 700;
        }
        .swot-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
        }
        .swot-card {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        .swot-card h3 {
            font-size: 1.4rem;
            font-weight: 800;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .swot-card.strengths h3 { color: #2e7d32; }
        .swot-card.weaknesses h3 { color: #d32f2f; }
        .swot-card.opportunities h3 { color: #1976d2; }
        .swot-card.threats h3 { color: #f57c00; }
        .swot-list {
            list-style: none;
            padding: 0;
        }
        .swot-list li {
            padding: 8px 0;
            font-size: 1rem;
            line-height: 1.6;
            position: relative;
            padding-left: 25px;
        }
        .swot-card.strengths li::before { content: '💪'; position: absolute; left: 0; }
        .swot-card.weaknesses li::before { content: '⚠️'; position: absolute; left: 0; }
        .swot-card.opportunities li::before { content: '🔆'; position: absolute; left: 0; }
        .swot-card.threats li::before { content: '⚡'; position: absolute; left: 0; }
        
        /* 추천사항 섹션 */
        .recommendations-section {
            background: #f8f9fa;
            padding: 60px;
            border-radius: 25px;
            margin: 60px 0;
            border-left: 10px solid #17a2b8;
        }
        .recommendations-section h2 {
            color: #0c5460;
            font-size: 2.4rem;
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            gap: 15px;
            font-weight: 700;
        }
        .recommendation-grid {
            display: grid;
            gap: 25px;
        }
        .recommendation-card {
            background: white;
            padding: 35px;
            border-radius: 15px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.08);
            border-left: 5px solid #17a2b8;
        }
        .rec-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15px;
        }
        .rec-title {
            font-size: 1.3rem;
            font-weight: 700;
            color: #333;
            margin-bottom: 5px;
        }
        .rec-priority {
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
        }
        .priority-high { background: #ffebee; color: #c62828; }
        .priority-medium { background: #fff3e0; color: #ef6c00; }
        .priority-low { background: #e8f5e8; color: #2e7d32; }
        .rec-description {
            color: #555;
            line-height: 1.6;
            margin-bottom: 15px;
        }
        .rec-details {
            display: flex;
            gap: 20px;
            font-size: 0.9rem;
            color: #666;
        }
        
        /* 완벽한 보고서 섹션 */
        .report-section {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            padding: 60px;
            border-radius: 25px;
            margin: 60px 0;
            border-left: 10px solid #2196f3;
        }
        .report-section h2 {
            color: #0d47a1;
            font-size: 2.4rem;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            gap: 15px;
            font-weight: 700;
        }
        .report-content {
            background: white;
            padding: 40px;
            border-radius: 15px;
            font-size: 1.1rem;
            line-height: 1.8;
            color: #333;
            white-space: pre-line;
            box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }
        
        /* 푸터 */
        .footer {
            background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
            color: white;
            padding: 80px 60px;
            text-align: center;
        }
        .footer h3 {
            font-size: 2.2rem;
            margin-bottom: 20px;
            font-weight: 700;
        }
        .footer p {
            font-size: 1.2rem;
            margin-bottom: 40px;
            opacity: 0.9;
        }
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 50px;
            margin-top: 40px;
            flex-wrap: wrap;
        }
        .contact-item {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 1.2rem;
            font-weight: 500;
        }
        .footer-note {
            margin-top: 50px;
            font-size: 1rem;
            opacity: 0.8;
            line-height: 1.6;
        }
        
        /* 반응형 */
        @media print {
            body { padding: 0; background: white; }
            .container { box-shadow: none; }
        }
        @media (max-width: 768px) {
            body { padding: 10px; }
            .content, .header { padding: 30px 20px; }
            .header h1 { font-size: 2.4rem; }
            .score-big { font-size: 4rem; }
            .contact-info { flex-direction: column; gap: 20px; }
            .info-grid, .category-grid, .swot-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- 헤더 -->
        <div class="header">
            <div class="header-content">
                <div class="logo">🎯</div>
                <h1>완벽한 AI 진단결과보고서</h1>
                <p class="subtitle">AICAMP - 전문 경영진단 시스템</p>
            </div>
        </div>
        
        <div class="content">
            <!-- 회사 정보 -->
            <div class="company-info">
                <h2>📋 기업 정보</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">회사명</div>
                        <div class="info-value">${diagnosis.companyName}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">담당자</div>
                        <div class="info-value">${diagnosis.contactManager}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">업종</div>
                        <div class="info-value">${diagnosis.industry}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">직원수</div>
                        <div class="info-value">${diagnosis.employeeCount}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">사업장 위치</div>
                        <div class="info-value">${diagnosis.businessLocation}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">진단일시</div>
                        <div class="info-value">${currentDate}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">결과 ID</div>
                        <div class="info-value">${diagnosis.resultId}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">처리시간</div>
                        <div class="info-value">${diagnosis.processingTime}</div>
                    </div>
                </div>
            </div>
            
            <!-- 종합 점수 -->
            <div class="score-hero">
                <div class="score-content">
                    <div class="score-label">종합 진단 점수</div>
                    <div class="score-big">${diagnosis.totalScore}</div>
                    <div class="score-label">100점 만점</div>
                    <div class="grade-badge">${diagnosis.overallGrade} 등급 (${gradeInfo.description})</div>
                    <div class="reliability-score">진단 신뢰도: ${diagnosis.reliabilityScore}%</div>
                </div>
            </div>
            
            <!-- 5개 카테고리별 상세 분석 -->
            <div class="categories-section">
                <h2>🎯 5개 영역별 상세 진단 결과</h2>
                <div class="category-grid">
                    ${diagnosis.categoryResults.map((category, index) => `
                        <div class="category-card">
                            <div class="category-title">
                                ⭐ ${category.category}
                            </div>
                            <div class="category-score">${category.score.toFixed(1)}</div>
                            <div class="score-details">
                                <span>5점 만점</span>
                                <span>100점 환산: ${category.score100}점</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${(category.score / 5) * 100}%"></div>
                            </div>
                            <div class="score-details">
                                <span>목표: ${category.targetScore}점</span>
                                <span>격차: ${category.gapScore}점</span>
                                <span>가중치: ${Math.round(category.weight * 100)}%</span>
                            </div>
                            
                            <div class="category-insights">
                                ${category.strengths.length > 0 ? `
                                    <div class="insight-section">
                                        <div class="insight-title">💪 주요 강점</div>
                                        <ul class="insight-list">
                                            ${category.strengths.map(strength => `<li>${strength}</li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                                
                                ${category.weaknesses.length > 0 ? `
                                    <div class="insight-section">
                                        <div class="insight-title">⚠️ 개선 필요사항</div>
                                        <ul class="insight-list">
                                            ${category.weaknesses.map(weakness => `<li>${weakness}</li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- SWOT 분석 -->
            <div class="swot-section">
                <h2>🎯 SWOT 전략 분석</h2>
                <div class="swot-grid">
                    <div class="swot-card strengths">
                        <h3>💪 강점 (Strengths)</h3>
                        <ul class="swot-list">
                            ${diagnosis.swotAnalysis.strengths.map(strength => `<li>${strength}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="swot-card weaknesses">
                        <h3>⚠️ 약점 (Weaknesses)</h3>
                        <ul class="swot-list">
                            ${diagnosis.swotAnalysis.weaknesses.map(weakness => `<li>${weakness}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="swot-card opportunities">
                        <h3>🌟 기회 (Opportunities)</h3>
                        <ul class="swot-list">
                            ${diagnosis.swotAnalysis.opportunities.map(opportunity => `<li>${opportunity}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="swot-card threats">
                        <h3>⚡ 위협 (Threats)</h3>
                        <ul class="swot-list">
                            ${diagnosis.swotAnalysis.threats.map(threat => `<li>${threat}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <!-- SWOT 매트릭스 전략 -->
                ${diagnosis.swotAnalysis.strategies ? `
                <div style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); padding: 40px; border-radius: 20px; margin-top: 40px;">
                    <h3 style="color: #1e293b; margin-bottom: 30px; font-size: 1.5rem; text-align: center;">🎯 SWOT 매트릭스 전략</h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px;">
                        <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            <h4 style="color: #059669; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #10b981; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">SO</span>
                                강점-기회 활용 전략
                            </h4>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                ${diagnosis.swotAnalysis.strategies.SO.map(strategy => `
                                    <li style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; line-height: 1.6;">
                                        <span style="color: #10b981; margin-right: 8px;">▶</span> ${strategy}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            <h4 style="color: #0891b2; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #06b6d4; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">WO</span>
                                약점-기회 보완 전략
                            </h4>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                ${diagnosis.swotAnalysis.strategies.WO.map(strategy => `
                                    <li style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; line-height: 1.6;">
                                        <span style="color: #06b6d4; margin-right: 8px;">▶</span> ${strategy}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            <h4 style="color: #7c3aed; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #8b5cf6; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">ST</span>
                                강점-위협 방어 전략
                            </h4>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                ${diagnosis.swotAnalysis.strategies.ST.map(strategy => `
                                    <li style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; line-height: 1.6;">
                                        <span style="color: #8b5cf6; margin-right: 8px;">▶</span> ${strategy}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            <h4 style="color: #dc2626; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #ef4444; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">WT</span>
                                약점-위협 회피 전략
                            </h4>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                ${diagnosis.swotAnalysis.strategies.WT.map(strategy => `
                                    <li style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; line-height: 1.6;">
                                        <span style="color: #ef4444; margin-right: 8px;">▶</span> ${strategy}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
                ` : ''}
                
                <div style="background: white; padding: 30px; border-radius: 15px; margin-top: 30px;">
                    <h3 style="color: #e65100; margin-bottom: 15px; font-size: 1.3rem;">🔍 SWOT 전략 매트릭스</h3>
                    <p style="line-height: 1.8; color: #333;">${diagnosis.swotAnalysis.strategicMatrix}</p>
                </div>
            </div>
            
            <!-- AI 트렌드 분석 섹션 -->
            ${diagnosis.swotAnalysis.aiAnalysis ? `
            <div class="ai-trends-section" style="margin-top: 40px; background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 40px; border-radius: 25px;">
                <h2 style="text-align: center; color: #1e40af; margin-bottom: 40px;">🤖 ${diagnosis.industry} AI 트렌드 분석</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px;">
                    <!-- 현재 AI 트렌드 -->
                    <div style="background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
                        <h3 style="color: #2563eb; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 1.5rem;">📊</span> 현재 주목받는 AI 기술
                        </h3>
                        <ul style="list-style: none; padding: 0;">
                            ${diagnosis.swotAnalysis.aiAnalysis.currentAITrends.map((trend, index) => `
                                <li style="padding: 15px; margin-bottom: 10px; background: #f0f9ff; border-left: 4px solid #3b82f6; border-radius: 8px;">
                                    <strong style="color: #1e40af;">${index + 1}.</strong> ${trend}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <!-- AI로 인한 미래 변화 -->
                    <div style="background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
                        <h3 style="color: #7c3aed; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 1.5rem;">🔮</span> AI로 인한 ${diagnosis.industry} 미래
                        </h3>
                        <ul style="list-style: none; padding: 0;">
                            ${diagnosis.swotAnalysis.aiAnalysis.futureChanges.map((change, index) => `
                                <li style="padding: 15px; margin-bottom: 10px; background: #f5f3ff; border-left: 4px solid #8b5cf6; border-radius: 8px;">
                                    <strong style="color: #6d28d9;">${index + 1}.</strong> ${change}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <!-- AI 적응 전략 -->
                    <div style="background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
                        <h3 style="color: #059669; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 1.5rem;">🚀</span> ${diagnosis.companyName}의 AI 적응 전략
                        </h3>
                        <ul style="list-style: none; padding: 0;">
                            ${diagnosis.swotAnalysis.aiAnalysis.adaptationStrategies.map(strategy => `
                                <li style="padding: 15px; margin-bottom: 10px; background: #f0fdf4; border-left: 4px solid #10b981; border-radius: 8px;">
                                    ${strategy}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <!-- AI 도입 경쟁 우위 -->
                    <div style="background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
                        <h3 style="color: #dc2626; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 1.5rem;">💎</span> AI 도입시 경쟁 우위
                        </h3>
                        <ul style="list-style: none; padding: 0;">
                            ${diagnosis.swotAnalysis.aiAnalysis.competitiveAdvantages.map(advantage => `
                                <li style="padding: 15px; margin-bottom: 10px; background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 8px;">
                                    ${advantage}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            ` : ''}

            <!-- 맞춤형 추천사항 -->
            <div class="recommendations-section">
                <h2>💡 맞춤형 개선 추천사항</h2>
                <div class="recommendation-grid">
                    ${diagnosis.recommendedActions.map(action => `
                        <div class="recommendation-card">
                            <div class="rec-header">
                                <div>
                                    <div class="rec-title">${action.title}</div>
                                    <div style="color: #666; font-size: 0.9rem;">${action.category}</div>
                                </div>
                                <div class="rec-priority priority-${action.priority.toLowerCase()}">${action.priority}</div>
                            </div>
                            <div class="rec-description">${action.description}</div>
                            <div class="rec-details">
                                <span><strong>기간:</strong> ${action.timeframe}</span>
                                <span><strong>예상효과:</strong> ${action.expectedImpact}</span>
                                <span><strong>투자비용:</strong> ${action.implementationCost}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- 상세 진단보고서 -->
            <div class="report-section">
                <h2>📊 종합 경영진단보고서</h2>
                <div class="report-content">${diagnosis.comprehensiveReport}</div>
            </div>
        </div>
        
        <!-- 푸터 -->
        <div class="footer">
            <h3>AICAMP AI교육센터</h3>
            <p>전문 경영진단 및 AI 기반 비즈니스 성장 솔루션</p>
            <div class="contact-info">
                <div class="contact-item">
                    <span>📞</span> 010-9251-9743
                </div>
                <div class="contact-item">
                    <span>📧</span> hongik423@gmail.com
                </div>
                <div class="contact-item">
                    <span>🌐</span> https://aicamp-v3-0.vercel.app
                </div>
            </div>
            <div class="footer-note">
                본 보고서는 이후경 경영지도사의 28년 전문 노하우와 AI 기반 진단시스템이 결합된<br>
                완벽한 경영진단 결과입니다. 추가 상담이나 문의사항은 언제든 연락해주세요.<br><br>
                <strong>진단 완료:</strong> ${currentDate} | <strong>진단 ID:</strong> ${diagnosis.resultId}
            </div>
        </div>
    </div>
</body>
</html>`;
  };

  // HTML 다운로드 핸들러
  const handleDownloadPerfectHTML = async () => {
    try {
      setIsDownloading(true);

      const htmlContent = generatePerfectHTMLReport();
      
      // HTML 파일 다운로드
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `완벽한AI진단결과보고서_${diagnosis.companyName}_${new Date().toISOString().slice(0, 10)}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "📄 완벽한 보고서 다운로드 완료",
        description: "완벽한 AI 진단결과보고서가 HTML 형식으로 다운로드되었습니다.",
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

  // 상세 보기 페이지로 이동
  const handleViewDetails = () => {
    if (data.data.resultUrl) {
      router.push(data.data.resultUrl);
    } else {
      toast({
        title: "⚠️ 상세 보기 불가",
        description: "결과 URL이 생성되지 않았습니다.",
        variant: "destructive"
      });
    }
  };

  // 탭별 콘텐츠 렌더링
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* 종합 점수 카드 */}
            <Card className={`${gradeInfo.color} ${gradeInfo.textColor}`}>
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">종합 진단 점수</h2>
                <div className="text-6xl font-bold mb-4">{diagnosis.totalScore}</div>
                <div className="text-xl mb-4">100점 만점</div>
                <Badge className="bg-white/20 text-current text-xl py-2 px-6 hover:bg-white/30">
                  {diagnosis.overallGrade} 등급 ({gradeInfo.description})
                </Badge>
                <div className="mt-4 text-sm opacity-90">
                  진단 신뢰도: {diagnosis.reliabilityScore}%
                </div>
              </CardContent>
            </Card>

            {/* 비교 지표 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  경쟁력 분석
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {diagnosis.comparisonMetrics.industryPercentile}%
                    </div>
                    <div className="text-sm text-gray-600">업계 상위</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600 mb-2">
                      {diagnosis.comparisonMetrics.competitivePosition}
                    </div>
                    <div className="text-sm text-gray-600">경쟁 포지션</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {diagnosis.comparisonMetrics.growthPotential}점
                    </div>
                    <div className="text-sm text-gray-600">성장 잠재력</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'categories':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              5개 영역별 상세 진단 결과
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {diagnosis.categoryResults.map((category, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Star className="w-5 h-5 text-yellow-500" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* 점수 표시 */}
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm text-gray-600">현재 점수</span>
                        <span className="text-3xl font-bold text-blue-600">
                          {category.score.toFixed(1)}
                        </span>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        5점 만점 (100점 환산: {category.score100}점)
                      </div>
                      
                      {/* 진행 바 */}
                      <Progress value={(category.score / 5) * 100} className="h-4" />
                      
                      {/* 상세 정보 */}
                      <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                        <div>목표: {category.targetScore}점</div>
                        <div>격차: {category.gapScore}점</div>
                        <div>가중치: {Math.round(category.weight * 100)}%</div>
                      </div>
                      
                      {/* 강점/약점 */}
                      {category.strengths.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            주요 강점
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {category.strengths.slice(0, 2).map((strength, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                <span>{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {category.weaknesses.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-orange-700 mb-2 flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" />
                            개선 필요사항
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {category.weaknesses.slice(0, 2).map((weakness, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-orange-500 mt-1">•</span>
                                <span>{weakness}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'swot':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-600" />
              SWOT 전략 분석
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 강점 */}
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-700 flex items-center gap-2">
                    💪 강점 (Strengths)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {diagnosis.swotAnalysis.strengths.map((strength, i) => (
                      <li key={i} className="flex items-start gap-2 text-green-800">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* 약점 */}
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-700 flex items-center gap-2">
                    ⚠️ 약점 (Weaknesses)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {diagnosis.swotAnalysis.weaknesses.map((weakness, i) => (
                      <li key={i} className="flex items-start gap-2 text-red-800">
                        <span className="text-red-500 mt-1">•</span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* 기회 */}
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-700 flex items-center gap-2">
                    🌟 기회 (Opportunities)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {diagnosis.swotAnalysis.opportunities.map((opportunity, i) => (
                      <li key={i} className="flex items-start gap-2 text-blue-800">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{opportunity}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* 위협 */}
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-orange-700 flex items-center gap-2">
                    ⚡ 위협 (Threats)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {diagnosis.swotAnalysis.threats.map((threat, i) => (
                      <li key={i} className="flex items-start gap-2 text-orange-800">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>{threat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* SWOT 전략 매트릭스 */}
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-purple-700">🔍 SWOT 전략 매트릭스</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {diagnosis.swotAnalysis.strategicMatrix}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                  <div className="bg-white p-4 rounded-lg">
                    <strong className="text-green-600">SO 전략:</strong> 강점을 활용하여 기회를 극대화
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <strong className="text-blue-600">WO 전략:</strong> 약점을 보완하여 기회를 선점
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <strong className="text-purple-600">ST 전략:</strong> 강점으로 위협을 방어
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <strong className="text-orange-600">WT 전략:</strong> 약점 개선으로 위협을 최소화
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'recommendations':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              맞춤형 개선 추천사항
            </h2>
            
            <div className="space-y-4">
              {diagnosis.recommendedActions.map((action, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {action.title}
                        </h3>
                        <div className="text-sm text-gray-500">{action.category}</div>
                      </div>
                      <Badge 
                        variant={action.priority === 'HIGH' ? 'destructive' : 
                                action.priority === 'MEDIUM' ? 'default' : 'secondary'}
                      >
                        {action.priority} 우선순위
                      </Badge>
                    </div>
                    
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {action.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <strong>기간:</strong> {action.timeframe}
                      </div>
                      <div className="flex items-center gap-2">
                        <strong>예상효과:</strong> {action.expectedImpact}
                      </div>
                      <div className="flex items-center gap-2">
                        <strong>투자비용:</strong> {action.implementationCost}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'report':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Award className="w-6 h-6 text-purple-600" />
              종합 경영진단보고서
            </h2>
            
            <Card>
              <CardContent className="p-8">
                <div className="prose max-w-none text-gray-700 leading-relaxed">
                  <div className="whitespace-pre-line text-base">
                    {diagnosis.comprehensiveReport}
                  </div>
                </div>
                <div className="mt-6 text-sm text-gray-500 text-right">
                  보고서 길이: {diagnosis.comprehensiveReport.length}자
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8" ref={reportRef}>
      {/* 🎉 성공 헤더 */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-yellow-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              🎯 AI CAMP 이후경 교장의 AI 진단 완료 !
            </h1>
          </div>
          <p className="text-xl text-gray-700 mb-6">
            <strong>{diagnosis.companyName}</strong>의 전문 경영진단 결과입니다
          </p>
          
          {/* 접수 확인 안내 */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">📬 AI 진단이 완료되었습니다. 관리자가 1-2일 내에 연락드리겠습니다.</span>
            </div>
          </div>
          
          {/* 액션 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleViewDetails}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 text-lg py-3 px-6"
            >
              <Eye className="w-5 h-5" />
              상세 결과 보기
            </Button>
            <Button
              onClick={handleDownloadPerfectHTML}
              disabled={isDownloading}
              variant="outline"
              className="flex items-center gap-2 text-lg py-3 px-6"
            >
              {isDownloading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              완벽한 HTML 보고서 다운로드
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 탭 네비게이션 */}
      <Card>
        <CardContent className="p-0">
          <div className="flex flex-wrap border-b border-gray-200">
            {[
              { id: 'overview', label: '📊 종합개요', icon: BarChart3 },
              { id: 'categories', label: '🎯 영역별분석', icon: Target },
              { id: 'swot', label: '🧠 SWOT분석', icon: Brain },
              { id: 'recommendations', label: '💡 추천사항', icon: TrendingUp },
              { id: 'report', label: '📋 완벽한보고서', icon: Award }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 탭 콘텐츠 */}
      <div className="min-h-[600px]">
        {renderTabContent()}
      </div>

      {/* 📞 연락처 및 상담 안내 */}
      <Card className="bg-gradient-to-r from-slate-50 to-gray-100">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            🤝 전문가 상담이 필요하시나요?
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            완벽한 진단 결과를 바탕으로 <strong>맞춤형 성장전략 컨설팅</strong>을 제공해드립니다
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-6">
            <div className="flex items-center gap-2 text-blue-600">
              <Phone className="w-5 h-5" />
              <span className="font-semibold text-lg">010-9251-9743</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <Mail className="w-5 h-5" />
              <span className="font-semibold text-lg">hongik423@gmail.com</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push('/consultation')}
              className="bg-green-600 hover:bg-green-700 text-lg py-3 px-6"
            >
              💬 전문가 상담 신청
            </Button>
            <Button
              onClick={handleViewDetails}
              variant="outline"
              className="text-lg py-3 px-6 flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              결과 상세 보기
            </Button>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <strong>특별 혜택:</strong> 초회 상담 1시간 무료 · 기업 맞춤형 성장전략 · 정부지원 사업 연계
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 