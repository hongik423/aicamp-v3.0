'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { 
  Shield, 
  Download, 
  Share2, 
  Lock,
  CheckCircle,
  TrendingUp,
  Target,
  Users,
  Brain,
  Zap
} from 'lucide-react';
import ReportPasswordModal from '@/components/diagnosis/ReportPasswordModal';

interface DiagnosisReport {
  diagnosisId: string;
  companyName: string;
  timestamp: string;
  executiveSummary: {
    overallScore: number;
    grade: string;
    percentile: number;
    maturityLevel: string;
    keyFindings: string[];
    ceoMessage?: string;
  };
  categoryAnalysis: Record<string, number>;
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
    strategicMatrix?: {
      SO: string[];
      WO: string[];
      ST: string[];
      WT: string[];
    };
  };
  roadmap: {
    phase1: any;
    phase2: any;
    phase3: any;
  };
  recommendations?: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  aicampProposal?: any;
}

export default function DiagnosisReportPage() {
  const params = useParams();
  const router = useRouter();
  const diagnosisId = params?.id as string;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [report, setReport] = useState<DiagnosisReport | null>(null);
  const [error, setError] = useState('');

  // 패스워드 인증 성공 처리
  const handlePasswordSuccess = async (password: string) => {
    setIsLoading(true);
    setError('');

    try {
      // 실제로는 서버에서 패스워드 검증 후 보고서 데이터를 가져와야 함
      // TODO: API 연동
      
      // 임시 데이터 (실제로는 서버에서 가져와야 함)
      const mockReport: DiagnosisReport = {
        diagnosisId,
        companyName: '테스트 기업',
        timestamp: new Date().toISOString(),
        executiveSummary: {
          overallScore: 75,
          grade: 'B',
          percentile: 85,
          maturityLevel: 'AI 도입기',
          keyFindings: [
            'AI 기초 인프라는 구축되어 있으나 활용도가 낮음',
            '직원들의 AI 역량 강화가 시급함',
            '데이터 관리 체계 개선이 필요함'
          ],
          ceoMessage: '귀사의 AI 역량은 업계 평균 이상이며, 체계적인 교육과 인프라 보강을 통해 단기간 내 선도 기업 수준으로 도약할 수 있습니다.'
        },
        categoryAnalysis: {
          '리더십': 3.8,
          '인프라': 3.5,
          '직원역량': 3.2,
          '조직문화': 4.0,
          '실무적용': 3.6,
          '데이터': 3.4
        },
        swotAnalysis: {
          strengths: ['경영진의 AI 도입 의지', '기본 인프라 구축'],
          weaknesses: ['AI 전문 인력 부족', '데이터 활용 미흡'],
          opportunities: ['업계 AI 도입 초기', '정부 지원 사업 활용 가능'],
          threats: ['경쟁사 AI 투자 확대', '기술 변화 속도'],
          strategicMatrix: {
            SO: ['AI 파일럿 프로젝트 추진', '정부 지원사업 적극 활용'],
            WO: ['AI 교육 프로그램 도입', '외부 전문가 영입'],
            ST: ['빠른 실행을 통한 선점', 'AI 거버넌스 구축'],
            WT: ['단계적 역량 강화', '핵심 영역 집중']
          }
        },
        roadmap: {
          phase1: {
            title: '기초 역량 구축',
            period: '1-3개월',
            keyActions: ['AI 교육', '파일럿 프로젝트', 'TF 구성']
          },
          phase2: {
            title: 'AI 활용 확산',
            period: '4-8개월',
            keyActions: ['부서별 적용', '성과 측정', '문화 정착']
          },
          phase3: {
            title: '고도화 및 최적화',
            period: '9-12개월',
            keyActions: ['AI 플랫폼 구축', '자동화 확대', '혁신 창출']
          }
        },
        recommendations: {
          immediate: ['AI 교육 프로그램 시작', 'TF 구성'],
          shortTerm: ['파일럿 프로젝트 3개 선정', '데이터 정비'],
          longTerm: ['AI 거버넌스 구축', '전사 확산']
        },
        aicampProposal: {
          recommendedProgram: {
            title: 'AI 트랜스포메이션 마스터 과정',
            duration: '12주',
            description: '실무 중심의 AI 역량 강화 프로그램'
          }
        }
      };

      setReport(mockReport);
      setIsAuthenticated(true);
      
      // 세션 스토리지에 인증 정보 저장 (임시)
      sessionStorage.setItem(`report_auth_${diagnosisId}`, password);
      
    } catch (error) {
      setError('보고서를 불러오는데 실패했습니다.');
      console.error('Report loading error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 보고서 다운로드
  const handleDownload = () => {
    toast({
      title: '📥 다운로드 준비중',
      description: 'PDF 보고서를 생성하고 있습니다...',
    });
    // TODO: PDF 생성 및 다운로드 구현
  };

  // 보고서 공유
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AI 역량진단 보고서',
        text: `${report?.companyName}의 AI 역량진단 결과`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: '📋 링크 복사 완료',
        description: '보고서 링크가 클립보드에 복사되었습니다.',
      });
    }
  };

  // 세션 확인
  useEffect(() => {
    const savedAuth = sessionStorage.getItem(`report_auth_${diagnosisId}`);
    if (savedAuth) {
      handlePasswordSuccess(savedAuth);
      setShowPasswordModal(false);
    }
  }, [diagnosisId]);

  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 text-center">
            <div className="mb-6">
              <Lock className="w-16 h-16 mx-auto text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">보고서 인증 필요</h1>
            <p className="text-gray-600 mb-6">
              AI 역량진단 보고서를 확인하시려면<br />
              이메일로 받으신 패스워드를 입력해주세요.
            </p>
            <Button 
              onClick={() => setShowPasswordModal(true)}
              size="lg"
              className="w-full"
            >
              패스워드 입력
            </Button>
          </Card>
        </div>

        <ReportPasswordModal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          onSuccess={handlePasswordSuccess}
          diagnosisId={diagnosisId}
        />
      </>
    );
  }

  if (isLoading || !report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">보고서를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-sm opacity-80 mb-2">진단번호: {report.diagnosisId}</div>
              <h1 className="text-3xl font-bold mb-2">AI 역량진단 결과 보고서</h1>
              <p className="text-xl opacity-90">{report.companyName}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleShare}
                className="bg-white/20 hover:bg-white/30 text-white border-0"
              >
                <Share2 className="w-4 h-4 mr-1" />
                공유
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDownload}
                className="bg-white/20 hover:bg-white/30 text-white border-0"
              >
                <Download className="w-4 h-4 mr-1" />
                다운로드
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CEO 메시지 */}
      {report.executiveSummary.ceoMessage && (
        <div className="container mx-auto px-4 -mt-6">
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">CEO Message</h3>
                <p className="text-gray-700 italic">
                  "{report.executiveSummary.ceoMessage}"
                </p>
                <p className="text-sm text-gray-500 mt-2">- 이후경 AICAMP 교장</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* 종합 점수 카드 */}
        <Card className="p-8 mb-8 text-center bg-gradient-to-b from-white to-gray-50">
          <div className="mb-4">
            <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {report.executiveSummary.overallScore}
            </div>
            <div className="text-2xl font-semibold text-gray-700 mt-2">
              {report.executiveSummary.grade}등급
            </div>
            <div className="text-lg text-gray-600 mt-1">
              업계 상위 {report.executiveSummary.percentile}%
            </div>
            <div className="text-md text-gray-500 mt-1">
              {report.executiveSummary.maturityLevel}
            </div>
          </div>
        </Card>

        {/* 카테고리별 분석 */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            카테고리별 진단 결과
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(report.categoryAnalysis).map(([category, score]) => (
              <div key={category} className="bg-gray-50 p-4 rounded-lg">
                <div className="font-medium text-gray-700">{category}</div>
                <div className="text-2xl font-bold text-blue-600 mt-1">
                  {score.toFixed(1)}
                </div>
                <div className="text-sm text-gray-500">/ 5.0</div>
              </div>
            ))}
          </div>
        </Card>

        {/* 핵심 발견사항 */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5" />
            핵심 발견사항
          </h2>
          <ul className="space-y-2">
            {report.executiveSummary.keyFindings.map((finding, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{finding}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* SWOT 분석 */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            SWOT 분석
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-700 mb-2">강점 (Strengths)</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {report.swotAnalysis.strengths.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-700 mb-2">약점 (Weaknesses)</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {report.swotAnalysis.weaknesses.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-700 mb-2">기회 (Opportunities)</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {report.swotAnalysis.opportunities.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-700 mb-2">위협 (Threats)</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {report.swotAnalysis.threats.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* 실행 로드맵 */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            3단계 실행 로드맵
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">{report.roadmap.phase1.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{report.roadmap.phase1.period}</p>
              <ul className="text-sm text-gray-700 space-y-1">
                {report.roadmap.phase1.keyActions.map((action: string, i: number) => (
                  <li key={i}>• {action}</li>
                ))}
              </ul>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold">{report.roadmap.phase2.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{report.roadmap.phase2.period}</p>
              <ul className="text-sm text-gray-700 space-y-1">
                {report.roadmap.phase2.keyActions.map((action: string, i: number) => (
                  <li key={i}>• {action}</li>
                ))}
              </ul>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold">{report.roadmap.phase3.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{report.roadmap.phase3.period}</p>
              <ul className="text-sm text-gray-700 space-y-1">
                {report.roadmap.phase3.keyActions.map((action: string, i: number) => (
                  <li key={i}>• {action}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* 하단 CTA */}
        <Card className="p-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h2 className="text-2xl font-bold mb-4">
            AI 역량 강화를 위한 다음 단계
          </h2>
          <p className="mb-6 opacity-90">
            전문가와 함께 구체적인 실행 계획을 수립하세요
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => router.push('/consultation')}
            >
              <Users className="w-5 h-5 mr-2" />
              무료 상담 신청
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/20"
              onClick={() => router.push('/programs')}
            >
              교육 프로그램 보기
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
