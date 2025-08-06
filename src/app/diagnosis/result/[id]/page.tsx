'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AICapabilityReportDisplay from '@/components/diagnosis/AICapabilityReportDisplay';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Home,
  RefreshCw,
  Phone,
  Mail,
  Brain,
  Sparkles,
  FileText
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getImagePath } from '@/lib/utils';

export default function DiagnosisResultPage() {
  const params = useParams();
  const router = useRouter();
  const diagnosisId = params?.id as string;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reportData, setReportData] = useState<any>(null);
  const [companyInfo, setCompanyInfo] = useState<any>(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(true);

  useEffect(() => {
    if (!diagnosisId) {
      setError('진단 ID가 없습니다.');
      setLoading(false);
      return;
    }

    fetchDiagnosisResult();
  }, [diagnosisId]);

  const fetchDiagnosisResult = async () => {
    try {
      setLoading(true);
      setError(null);

      // 로컬 스토리지에서 먼저 확인
      const cachedResult = localStorage.getItem(`diagnosis_result_${diagnosisId}`);
      if (cachedResult) {
        const parsed = JSON.parse(cachedResult);
        setReportData(parsed.reportData);
        setCompanyInfo(parsed.companyInfo);
        setLoading(false);
        return;
      }

      // API에서 결과 가져오기
      const response = await fetch(`/api/diagnosis-results/${diagnosisId}`);
      
      if (!response.ok) {
        throw new Error('진단 결과를 불러올 수 없습니다.');
      }

      const data = await response.json();
      
      if (data.success) {
        setReportData(data.reportData);
        setCompanyInfo(data.companyInfo);
        
        // 로컬 스토리지에 캐싱
        localStorage.setItem(`diagnosis_result_${diagnosisId}`, JSON.stringify({
          reportData: data.reportData,
          companyInfo: data.companyInfo,
          timestamp: new Date().toISOString()
        }));
      } else {
        throw new Error(data.error || '진단 결과를 불러올 수 없습니다.');
      }
    } catch (err) {
      console.error('진단 결과 로드 오류:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      
      // 더미 데이터로 폴백 (개발/테스트용)
      if (process.env.NODE_ENV === 'development') {
        setReportData({
          totalScore: 78,
          grade: 'B+',
          percentile: 25,
          potential: '높음',
          swot: {
            strengths: ['디지털 전환 의지가 강함', '경영진의 AI 도입 지원'],
            weaknesses: ['AI 전문 인력 부족', '데이터 관리 체계 미흡'],
            opportunities: ['정부 지원 사업 활용 가능', 'AI 시장 급성장'],
            threats: ['경쟁사 AI 도입 가속화', '기술 변화 속도']
          },
          roi: {
            investment: '5,000만원',
            savings: '연 1.5억원',
            percentage: '300%'
          }
        });
        setCompanyInfo({
          name: '테스트 기업',
          email: 'test@example.com',
          industry: 'IT/소프트웨어',
          employees: '50-100명'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">진단 결과를 불러오는 중...</h2>
          <p className="text-gray-600">잠시만 기다려주세요</p>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-center mb-2">오류가 발생했습니다</h2>
          <Alert className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="flex gap-3 justify-center">
            <Button onClick={fetchDiagnosisResult} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              다시 시도
            </Button>
            <Button onClick={() => router.push('/diagnosis')}>
              새로운 진단 시작
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src={getImagePath('/images/aicamp_logo_del_250726.png')}
                alt="AICAMP" 
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="font-bold text-xl text-gray-900">AICAMP</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => router.push('/diagnosis')}>
                <Brain className="w-4 h-4 mr-2" />
                새 진단
              </Button>
              <Button variant="outline" size="sm" onClick={() => router.push('/')}>
                <Home className="w-4 h-4 mr-2" />
                홈으로
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 성공 배너 */}
      {showSuccessBanner && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6" />
                <div>
                  <p className="font-semibold">AI 역량진단이 성공적으로 완료되었습니다!</p>
                  <p className="text-sm opacity-90">관리자와 신청자에게 확인 이메일이 발송되었습니다.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSuccessBanner(false)}
                className="text-white/80 hover:text-white p-1"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 타이틀 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            진단 ID: {diagnosisId}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI 역량진단 결과 보고서
          </h1>
          <p className="text-lg text-gray-600">
            {companyInfo?.name || '귀사'}의 AI 도입 준비도와 맞춤형 실행 전략을 확인하세요
          </p>
        </div>

        {/* 보고서 컴포넌트 */}
        <AICapabilityReportDisplay 
          reportData={reportData}
          companyInfo={companyInfo || {
            name: '귀사',
            email: '',
            industry: '',
            employees: ''
          }}
          diagnosisId={diagnosisId}
        />

        {/* 추가 액션 섹션 */}
        <Card className="mt-8 p-8 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">다음 단계로 나아가세요</h3>
            <p className="text-gray-600 mb-6">
              AI 역량 강화를 위한 전문가 상담과 맞춤형 교육 프로그램을 제공합니다
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Phone className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">전화 상담</h4>
                <p className="text-sm text-gray-600 mb-4">02-123-4567</p>
                <Button variant="outline" size="sm" className="w-full">
                  전화 걸기
                </Button>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Mail className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">이메일 문의</h4>
                <p className="text-sm text-gray-600 mb-4">hongik423@gmail.com</p>
                <Button variant="outline" size="sm" className="w-full">
                  이메일 보내기
                </Button>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <FileText className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">상담 신청</h4>
                <p className="text-sm text-gray-600 mb-4">맞춤형 컨설팅</p>
                <Button 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  onClick={() => router.push('/consultation')}
                >
                  상담 신청하기
                </Button>
              </Card>
            </div>
          </div>
        </Card>

        {/* 푸터 정보 */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>본 진단 결과는 AICAMP AI 역량진단 시스템 v3.0을 통해 생성되었습니다.</p>
          <p className="mt-2">© 2024 AICAMP. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
}