'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Download, 
  Mail, 
  TrendingUp, 
  Target, 
  AlertCircle,
  CheckCircle,
  ChevronRight,
  BarChart3,
  Brain,
  Lightbulb,
  ArrowUpRight,
  Building2,
  Users,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { UltimateReportData, generateUltimateHTMLReport } from '@/lib/utils/ultimate-report-generator';
import { 
  getIndustrySpecificRecommendations,
  getRecommendedProgramsByScore,
  calculateProgramROI,
  getRelevantSuccessCases,
  generateLearningPath
} from '@/lib/utils/aicamp-program-integration';

interface DiagnosisResult {
  totalScore: number;
  grade: string;
  categoryScores: {
    businessFoundation: number;
    currentAI: number;
    organizationReadiness: number;
    techInfrastructure: number;
    goalClarity: number;
    executionCapability: number;
  };
  analysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  recommendations: string[];
  companyInfo: {
    companyName: string;
    industry: string;
    employeeCount: number;
    annualRevenue?: string;
    establishmentYear?: number;
    location?: string;
  };
  maturityLevel?: string;
  percentile?: number;
}

export default function DiagnosisResultPage() {
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ultimateReport, setUltimateReport] = useState<string>('');

  useEffect(() => {
    const storedResult = sessionStorage.getItem('diagnosisResult');
    
    if (storedResult) {
      const parsedResult = JSON.parse(storedResult);
      setResult(parsedResult);
      
      // Ultimate Report 생성
      generateUltimateReportData(parsedResult);
    } else {
      // 더미 데이터로 테스트
      const dummyResult: DiagnosisResult = {
        totalScore: 72,
        grade: 'B+',
        categoryScores: {
          businessFoundation: 78,
          currentAI: 65,
          organizationReadiness: 70,
          techInfrastructure: 68,
          goalClarity: 75,
          executionCapability: 76
        },
        analysis: {
          strengths: [
            "명확한 사업 목표와 전략적 방향성",
            "경영진의 AI 도입 의지와 리더십",
            "기본적인 디지털 인프라 보유"
          ],
          weaknesses: [
            "AI 기술 활용 경험 부족",
            "데이터 관리 체계 미흡",
            "AI 전문 인력 부족"
          ],
          opportunities: [
            "업계 AI 도입 초기 단계로 선점 효과 기대",
            "정부의 AI 지원 정책 활용 가능",
            "고객 요구사항 변화에 대응 필요성 증대"
          ],
          threats: [
            "경쟁사의 빠른 AI 도입",
            "AI 기술 변화 속도",
            "숙련된 AI 인력 확보 경쟁"
          ]
        },
        recommendations: [
          "AI 기초 교육을 통한 전사적 AI 리터러시 향상",
          "데이터 수집 및 관리 체계 구축",
          "파일럿 프로젝트를 통한 AI 도입 경험 축적"
        ],
        companyInfo: {
          companyName: "테스트 기업",
          industry: "제조업",
          employeeCount: 50,
          annualRevenue: "100억원",
          establishmentYear: 2010,
          location: "서울"
        },
        maturityLevel: "AI Adopter",
        percentile: 75
      };
      
      setResult(dummyResult);
      generateUltimateReportData(dummyResult);
    }
    
    setIsLoading(false);
  }, []);

  const generateUltimateReportData = async (diagnosisResult: DiagnosisResult) => {
    try {
      // AICAMP 프로그램 추천
      const recommendedPrograms = getRecommendedProgramsByScore(
        diagnosisResult.totalScore, 
        diagnosisResult.categoryScores
      );
      
      // 업종별 맞춤 분석
      const industryAnalysis = getIndustrySpecificRecommendations(
        diagnosisResult.companyInfo.industry,
        diagnosisResult.totalScore,
        diagnosisResult.analysis.weaknesses
      );
      
      // ROI 계산
      const roiAnalysis = calculateProgramROI(
        recommendedPrograms,
        diagnosisResult.companyInfo.employeeCount
      );
      
      // 성공 사례
      const successCases = getRelevantSuccessCases(
        diagnosisResult.companyInfo.industry,
        diagnosisResult.companyInfo.employeeCount > 100 ? '대기업' : 
        diagnosisResult.companyInfo.employeeCount > 50 ? '중소기업' : '스타트업'
      );
      
      // 학습 경로
      const learningPath = generateLearningPath(recommendedPrograms, 'medium');
      
      // Ultimate Report 데이터 구성
      const ultimateReportData: UltimateReportData = {
        companyInfo: diagnosisResult.companyInfo,
        diagnosis: {
          totalScore: diagnosisResult.totalScore,
          grade: diagnosisResult.grade,
          categoryScores: diagnosisResult.categoryScores,
          maturityLevel: diagnosisResult.maturityLevel || 'AI Adopter',
          percentile: diagnosisResult.percentile || 75
        },
        analysis: diagnosisResult.analysis,
        recommendations: diagnosisResult.recommendations,
        roadmap: {
          phases: learningPath.map(phase => ({
            phase: phase.phase,
            title: phase.phase === 1 ? 'Foundation' : phase.phase === 2 ? 'Acceleration' : 'Excellence',
            duration: phase.duration,
            objectives: phase.objectives,
            deliverables: phase.deliverables
          }))
        },
        aicampPrograms: {
          recommended: recommendedPrograms,
          learningPath: learningPath,
          roi: roiAnalysis,
          successCases: successCases
        },
        industryAnalysis: industryAnalysis,
        competitorAnalysis: {
          leaders: ['삼성전자', '네이버', 'LG전자'],
          position: diagnosisResult.totalScore > 80 ? 'Leader' : diagnosisResult.totalScore > 60 ? 'Challenger' : 'Follower',
          gap: Math.max(0, 85 - diagnosisResult.totalScore),
          catchUpStrategy: [
            'AI 기초 역량 강화',
            '데이터 인프라 구축',
            '전문 인력 확보'
          ]
        },
        maturityRoadmap: {
          currentStage: diagnosisResult.maturityLevel || 'AI Adopter',
          targetStage: 'AI Expert',
          milestones: learningPath.map((phase, index) => ({
            phase: phase.phase,
            title: phase.phase === 1 ? 'AI 기반 구축' : phase.phase === 2 ? 'AI 활용 확산' : 'AI 전문 조직',
            duration: phase.duration,
            completion: 0
          })),
          timeline: '6-12개월'
        },
        investmentAnalysis: {
          totalBudget: `${roiAnalysis.totalInvestment}만원`,
          phaseAllocation: learningPath.map(phase => ({
            phase: phase.phase,
            budget: Math.round(roiAnalysis.totalInvestment / learningPath.length),
            programs: phase.programs.length
          })),
          expectedROI: roiAnalysis.roi,
          breakEvenPoint: roiAnalysis.paybackPeriod
        }
      };
      
      // HTML 보고서 생성
      const htmlReport = generateUltimateHTMLReport(ultimateReportData);
      setUltimateReport(htmlReport);
      
    } catch (error) {
      console.error('Ultimate Report 생성 오류:', error);
    }
  };

  const handleDownloadReport = () => {
    if (!ultimateReport) {
      alert('보고서가 아직 생성되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const blob = new Blob([ultimateReport], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${result?.companyInfo.companyName || 'AI진단'}_Ultimate_Report.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleEmailReport = () => {
    if (!result) return;
    
    const subject = `${result.companyInfo.companyName} AI 역량진단 Ultimate Report`;
    const body = `안녕하세요,

${result.companyInfo.companyName}의 AI 역량진단이 완료되었습니다.

📊 진단 결과 요약:
- 총점: ${result.totalScore}점 (${result.grade})
- 성숙도: ${result.maturityLevel}
- 업계 순위: 상위 ${100 - (result.percentile || 50)}%

상세한 Ultimate Report와 AICAMP 맞춤 프로그램 제안서를 확인해보세요.

AICAMP 팀 드림`;

    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">보고서를 생성하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="text-center p-8">
            <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">진단 결과를 찾을 수 없습니다</h2>
            <p className="text-gray-600 mb-4">
              진단을 다시 실행하거나 관리자에게 문의해주세요.
            </p>
            <Button onClick={() => window.location.href = '/ai-diagnosis'}>
              새로운 진단 시작
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-50';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50';
    if (grade.startsWith('C')) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">
              AI 역량진단 Ultimate Report
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            {result.companyInfo.companyName}의 맞춤형 AI 전환 전략
          </p>
        </motion.div>

        {/* Executive Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{result.totalScore}</div>
                  <div className="text-blue-100">총점</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{result.grade}</div>
                  <div className="text-blue-100">등급</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">상위 {100 - (result.percentile || 50)}%</div>
                  <div className="text-blue-100">업계 순위</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{result.maturityLevel}</div>
                  <div className="text-blue-100">성숙도</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center mb-8"
        >
          <Button 
            onClick={handleDownloadReport}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Ultimate Report 다운로드
          </Button>
          <Button 
            onClick={handleEmailReport}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <Mail className="h-4 w-4 mr-2" />
            이메일로 공유
          </Button>
          <Button 
            onClick={() => window.open('tel:02-1234-5678')}
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-50"
          >
            <Users className="h-4 w-4 mr-2" />
            전문가 상담
          </Button>
        </motion.div>

        {/* Category Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
                카테고리별 상세 분석
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(result.categoryScores).map(([key, score], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">
                        {getCategoryLabel(key)}
                      </span>
                      <span className={`font-bold text-lg ${getScoreColor(score)}`}>
                        {score}점
                      </span>
                    </div>
                    <Progress value={score} className="h-3" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AICAMP Programs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-6 w-6 mr-2 text-purple-600" />
                맞춤형 AICAMP 프로그램 추천
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4 text-blue-800">
                    🎯 추천 프로그램
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>ChatGPT & Claude 업무 활용 마스터</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>n8n & Make 업무 자동화 전문가</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>AI 데이터 분석 & 예측 모델링</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4 text-green-800">
                    💰 투자 효과 분석
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>예상 투자:</span>
                      <span className="font-semibold">320만원</span>
                    </div>
                    <div className="flex justify-between">
                      <span>예상 수익:</span>
                      <span className="font-semibold text-green-600">1,280만원</span>
                    </div>
                    <div className="flex justify-between">
                      <span>투자 수익률:</span>
                      <span className="font-semibold text-green-600">400%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>투자 회수:</span>
                      <span className="font-semibold">8개월</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* SWOT Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-6 w-6 mr-2 text-orange-600" />
                SWOT 전략 분석
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                    <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      강점 (Strengths)
                    </h3>
                    <ul className="text-sm space-y-1">
                      {result.analysis.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-600 mr-1">•</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <Lightbulb className="h-4 w-4 mr-1" />
                      기회 (Opportunities)
                    </h3>
                    <ul className="text-sm space-y-1">
                      {result.analysis.opportunities.map((opportunity, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-1">•</span>
                          <span>{opportunity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                    <h3 className="font-semibold text-orange-800 mb-2 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      약점 (Weaknesses)
                    </h3>
                    <ul className="text-sm space-y-1">
                      {result.analysis.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-orange-600 mr-1">•</span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                    <h3 className="font-semibold text-red-800 mb-2 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      위협 (Threats)
                    </h3>
                    <ul className="text-sm space-y-1">
                      {result.analysis.threats.map((threat, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-600 mr-1">•</span>
                          <span>{threat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <CardContent className="text-center p-8">
              <h2 className="text-2xl font-bold mb-4">
                🚀 AI 혁신의 여정을 시작하세요!
              </h2>
              <p className="text-lg mb-6 text-purple-100">
                {result.companyInfo.companyName}의 AI 전환을 위한 맞춤형 로드맵이 준비되었습니다.
                지금 바로 AICAMP와 함께 미래를 만들어가세요.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  onClick={() => window.open('tel:02-1234-5678')}
                  className="bg-white text-purple-600 hover:bg-gray-100"
                >
                  📞 전문가 상담 신청
                </Button>
                <Button 
                  onClick={() => window.open('mailto:support@aicamp.club')}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                >
                  📧 상세 문의하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function getCategoryLabel(key: string): string {
  const labels: { [key: string]: string } = {
    businessFoundation: '사업 기반',
    currentAI: '현재 AI 활용',
    organizationReadiness: '조직 준비도',
    techInfrastructure: '기술 인프라',
    goalClarity: '목표 명확성',
    executionCapability: '실행 역량'
  };
  return labels[key] || key;
}