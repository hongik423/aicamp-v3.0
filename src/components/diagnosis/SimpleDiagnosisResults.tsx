'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';
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
  AlertTriangle,
  Clock,
  RefreshCw,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  X,
  MessageSquare
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

export default function SimpleDiagnosisResults({ data }: CompleteDiagnosisResultsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);
  const { toast } = useToast();

  // 실제 카테고리 점수/격차를 가독성 있게 변환
  const categoryView = useMemo(() => {
    const source = data?.data?.diagnosis?.categoryResults || [];
    return source.map((c: any) => ({
      name: c.category,
      score5: Number(c.score || 0),
      score100: Number(c.score100 || Math.round((c.score || 0) * 20)),
      target: Number(c.targetScore || 0),
      benchmark: Number(c.benchmarkScore || 0),
      gap: Number(c.gapScore || (Number(c.benchmarkScore || 0) - Number(c.score || 0))),
      strengths: c.strengths || [],
      weaknesses: c.weaknesses || [],
    }));
  }, [data]);

  // 내부 용어/목표 KPI 반영 (선택)
  const internalTerms: string[] = (data?.data?.diagnosis?.internalTerminology || []) as string[];
  const targetKpis: string[] = (data?.data?.diagnosis?.targetKpis || []) as string[];

  // 업종/점수대 맞춤 문구 - 실제 데이터 연결 강화
  const industry = data?.data?.diagnosis?.industry || '기타';
  const score = Number(data?.data?.diagnosis?.totalScore || 0);
  const companyName = data?.data?.diagnosis?.companyName || '귀사';
  const employees = data?.data?.diagnosis?.employeeCount || '1-10명';
  const challenges = data?.data?.diagnosis?.categoryResults?.[0]?.weaknesses?.[0] || '';
  const scoreBand: 'low' | 'mid' | 'high' = score < 40 ? 'low' : score < 70 ? 'mid' : 'high';
  
  // 🎯 실제 카테고리별 점수 데이터 정확한 연결
  const actualCategoryScores = useMemo(() => {
    if (!data?.data?.diagnosis?.categoryResults) return {};
    return data.data.diagnosis.categoryResults.reduce((acc: any, cat: any) => {
      acc[cat.category] = {
        score: cat.score || 0,
        score100: cat.score100 || 0,
        gap: cat.gapScore || 0,
        strengths: cat.strengths || [],
        weaknesses: cat.weaknesses || []
      };
      return acc;
    }, {});
  }, [data]);
  const pulseText = useMemo(() => {
    const byIndustry: Record<string, Record<typeof scoreBand, string>> = {
      '제조업': {
        low: `${companyName}의 생산 프로세스를 표준화하고 품질/설비 데이터를 체계화하세요. 예측정비·비전검사 Quick Win으로 초기 성과를 확보하는 것이 유리합니다.`,
        mid: `라인/설비 데이터를 통합하고 파일럿을 ${employees} 규모에 맞게 확산할 시점입니다. 수율·불량 분석 자동화로 눈에 보이는 ROI를 달성하세요.`,
        high: `전사 AI 플랫폼과 MLOps를 통한 최적화 단계입니다. 디지털 트윈/고급 최적화로 경쟁우위를 공고히 하세요.`
      },
      'IT/소프트웨어': {
        low: `${companyName}의 데이터 품질·기본 계측 체계를 정비하세요. 고객 지원/세일즈 자동화로 Quick Win을 확보하는 것이 적합합니다.`,
        mid: 'MLOps·A/B 실험·고객 세분화 자동화로 제품/그로스 성과를 가속하세요.',
        high: '제품 내 AI 기능 고도화와 생성형 AI 기반 신규 BM(플러그인/앱) 탐색 단계입니다.'
      },
      '유통/물류': {
        low: `${companyName}의 재고·입출고 가시성을 높이고 알림/라벨링 자동화를 도입하세요.`,
        mid: '수요예측 고도화+물류 라우팅 최적화로 재고·운영 비용을 낮추세요.',
        high: '멀티채널 통합·실시간 최적화로 운영 KPI를 업계 선도 수준으로 끌어올리세요.'
      },
      '금융': {
        low: '데이터 거버넌스·규제 대응 체계를 우선 정비하고 이상탐지 룰 기반 자동화를 구축하세요.',
        mid: '신용평가/이상거래 탐지를 ML로 고도화하고 MRM 체계를 정립하세요.',
        high: '모델 리니지/감사/리스크 대시보드로 선진 금융 AI 운영체계를 완성하세요.'
      },
      '의료/헬스케어': {
        low: '데이터 정합성·보안 체계를 선행 확보하고, 접수·예약 자동화로 Quick Win을 얻으세요.',
        mid: '의료영상 보조·환자 분류 예측 등 임상 보조 AI를 확산하세요.',
        high: '정밀의료/예후예측을 전 조직으로 확장하고 윤리·안전 체계를 고도화하세요.'
      },
      default: {
        low: `${companyName}의 핵심 업무 기준을 표준화하고 데이터 수집/정비를 시작하세요. 작은 자동화 성과를 빠르게 쌓아 조직 학습을 촉진하세요.`,
        mid: '핵심 프로세스 자동화와 데이터 기반 의사결정 체계를 내재화하세요.',
        high: '전사 AI 플랫폼과 지표 체계로 확장하며 신규 수익모델을 개척하세요.'
      }
    };
    const m = byIndustry[industry] || byIndustry.default;
    // 상황 문구에 대표적인 당면과제 1건을 자연스럽게 덧붙임
    const addendum = [
      challenges ? `현재 최우선 과제는 "${challenges}"입니다.` : '',
      internalTerms?.length ? ` 내부 용어: ${internalTerms.slice(0,3).join(', ')}` : '',
      targetKpis?.length ? ` 목표 KPI: ${targetKpis.slice(0,3).join(', ')}` : ''
    ].filter(Boolean).join(' ');
    return m[scoreBand] + (addendum ? ` ${addendum}` : '');
  }, [industry, scoreBand, challenges, internalTerms, targetKpis]);

  // 규칙기반(정규식/가중치) 매핑 함수
  function mapQuickWinToStrategy(qw: string, strategies: any) {
    const patterns = {
      SO: [/강점|우위|리더|파트너|확장|선점|혁신/i, /플랫폼|생태계|신사업/i],
      WO: [/보완|교육|채용|컨설팅|도입|구축|개선|정비/i, /역량|데이터|인프라/i],
      ST: [/위협|리스크|보안|규제|대응|차별|방어/i],
      WT: [/축소|중단|최소화|표준화|통제|관리/i]
    } as Record<string, RegExp[]>;
    const scoreBucket = { SO: 0, WO: 0, ST: 0, WT: 0 } as Record<string, number>;
    for (const key of Object.keys(patterns)) {
      for (const rex of patterns[key]) {
        if (rex.test(qw)) scoreBucket[key] += 2; // 매칭 가중치 2
      }
    }
    // 전략 문장 키워드도 가중치 반영 (간단)
    const addScore = (key: 'SO'|'WO'|'ST'|'WT') => {
      const list: string[] = strategies?.[key] || [];
      const top = list.slice(0,3).join(' ');
      for (const rex of patterns[key]) if (rex.test(top)) scoreBucket[key] += 1;
    };
    addScore('SO'); addScore('WO'); addScore('ST'); addScore('WT');
    const best = (Object.keys(scoreBucket) as Array<'SO'|'WO'|'ST'|'WT'>)
      .sort((a,b) => scoreBucket[b]-scoreBucket[a])[0];
    const picked = strategies?.[best]?.[0] || '-';
    return { bucket: best, strategy: picked };
  }

  // 타임아웃/백그라운드 처리 상황 체크
  if (data?.isTimeout || data?.data?.diagnosis?.backgroundProcessing) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="border-2 border-orange-200 shadow-lg bg-gradient-to-br from-orange-50 to-yellow-50">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-10 h-10 text-orange-600 animate-pulse" />
      </div>
            <CardTitle className="text-2xl text-orange-900">
              🤖 AI 분석이 진행 중입니다
            </CardTitle>
            <p className="text-orange-700 text-lg mt-2">
              {data.data?.diagnosis?.companyName || '귀하의 기업'}에 대한 고품질 분석을 위해<br />
              백그라운드에서 처리 중입니다
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-3">📊 AI 분석 진행 상황</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <span className="font-medium text-green-700">✅ 데이터 검증 완료</span>
                    <p className="text-green-600 text-xs mt-1">제출된 정보의 완성도와 유효성 검증 완료</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse flex-shrink-0"></div>
                  <div className="flex-1">
                    <span className="font-medium text-blue-700">🤖 GEMINI 2.5 Flash AI 분석 중...</span>
                    <p className="text-blue-600 text-xs mt-1">AI 역량 6분야 종합 평가 및 업종별 벤치마크 비교 (2-3분 소요)</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse flex-shrink-0"></div>
                  <div className="flex-1">
                    <span className="font-medium text-yellow-700">🎯 SWOT 전략 분석 대기 중</span>
                    <p className="text-yellow-600 text-xs mt-1">강점/약점/기회/위협 요인 분석 및 전략 도출 (1-2분 소요)</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-400 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-600">📄 맞춤형 보고서 생성 대기 중</span>
                    <p className="text-gray-500 text-xs mt-1">실행 로드맵 및 개선방안 포함 종합 보고서 작성 (2-3분 소요)</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-400 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-600">📧 이메일 전송 대기 중</span>
                    <p className="text-gray-500 text-xs mt-1">PDF 형태의 최종 진단보고서 이메일 발송 (30-60초 소요)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">📧 이메일 확인</h4>
              <p className="text-blue-700 text-sm">
                분석이 완료되면 <strong>{data.data?.diagnosis?.email || '등록하신 이메일'}</strong>로<br />
                상세한 진단 보고서가 자동 발송됩니다.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => window.location.reload()}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                결과 다시 확인
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/diagnosis'}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                새로운 진단 시작
              </Button>
                            </div>
          </CardContent>
        </Card>
                            </div>
    );
  }

  // 오류 상황 체크
  if (data?.error || !data?.data?.diagnosis) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="border-2 border-red-200 shadow-lg bg-gradient-to-br from-red-50 to-pink-50">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-red-600" />
                                    </div>
            <CardTitle className="text-2xl text-red-900">
              ❌ 진단 처리 중 오류가 발생했습니다
            </CardTitle>
            <p className="text-red-700 text-lg mt-2">
              잠시 후 다시 시도해주시거나<br />
              전문가 상담을 신청해주세요
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">🔧 문제 해결 방법</h4>
              <div className="space-y-2 text-sm text-red-700">
                <div>• 브라우저를 새로고침하고 다시 시도</div>
                <div>• 다른 브라우저로 접속 시도</div>
                <div>• 인터넷 연결 상태 확인</div>
                <div>• 전문가 상담 신청</div>
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => window.location.reload()}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                다시 시도
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/consultation'}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                전문가 상담 신청
              </Button>
                    </div>
          </CardContent>
        </Card>
                    </div>
    );
  }

  const diagnosis = data.data.diagnosis;
  const totalScore = diagnosis.totalScore || 0;
  const grade = diagnosis.overallGrade || 'C';
  const percentile = diagnosis.comparisonMetrics?.industryPercentile || 50;

        return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* 성공 메시지 */}
      <Card className="border-2 border-green-200 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
          <CardTitle className="text-2xl text-green-900">
            🎉 AI 역량진단이 완료되었습니다!
          </CardTitle>
          <p className="text-green-700 text-lg mt-2">
            {diagnosis.companyName || '귀하의 기업'}에 대한<br />
            전문가 수준의 AI 역량 분석이 완료되었습니다
          </p>
        </CardHeader>
            </Card>

      {/* 주요 결과 */}
      <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardTitle className="text-xl">📊 AI 역량 진단 결과</CardTitle>
              </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalScore}점</div>
              <div className="text-sm text-blue-700">종합 점수</div>
                    </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">{grade}등급</div>
              <div className="text-sm text-purple-700">AI 성숙도</div>
                  </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">상위 {percentile}%</div>
              <div className="text-sm text-green-700">업계 순위</div>
                  </div>
                </div>
              </CardContent>
            </Card>

      {/* 🎯 신청기업 AI 혁신의 脈 - 핵심 발견사항 */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <CardTitle className="text-xl flex items-center gap-2">
            <Brain className="w-6 h-6" />
            신청기업 AI 혁신의 脈
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              {companyName}의 AI 도입 현황 핵심 진단
            </h3>
            
            {/* 실제 데이터 기반 핵심 발견사항 */}
            <div className="space-y-3">
              <div className="p-4 bg-white rounded-lg border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-700 mb-2">📊 현재 AI 역량 수준</h4>
                <p className="text-gray-700">
                  {companyName}는 종합점수 <strong>{totalScore}점</strong>으로 <strong>{grade}등급</strong>에 해당하며, 
                  업계 상위 <strong>{percentile}%</strong>에 위치합니다. 
                  {Object.entries(actualCategoryScores).map(([cat, data]: [string, any]) => (
                    ` ${cat} ${data.score.toFixed(1)}점`
                  )).join(', ')} 으로 평가되었습니다.
                </p>
              </div>
              
              <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-700 mb-2">💪 핵심 강점 요인</h4>
                <p className="text-gray-700">
                  {diagnosis.swotAnalysis?.strengths?.slice(0, 2).join(', ') || '빠른 의사결정, 조직 민첩성'}을 
                  바탕으로 AI 도입의 기반을 갖추고 있습니다. 
                  특히 {employees} 규모의 조직 특성상 빠른 실행과 변화 적응이 가능합니다.
                </p>
              </div>
              
              <div className="p-4 bg-white rounded-lg border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-700 mb-2">⚠️ 주요 개선 영역</h4>
                <p className="text-gray-700">
                  {diagnosis.swotAnalysis?.weaknesses?.slice(0, 2).join(', ') || 'AI 전문 인력 부족, 예산 제약'}이 
                  주요 과제로 파악되었습니다. {industry} 업종 특성상 {challenges || '체계적인 데이터 관리'}가 
                  시급한 개선 과제입니다.
                </p>
              </div>
              
              <div className="p-4 bg-white rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-700 mb-2">🚀 성장 기회 요인</h4>
                <p className="text-gray-700">
                  {diagnosis.swotAnalysis?.opportunities?.slice(0, 2).join(', ') || '클라우드 AI 서비스 활용, 개발 생산성 향상 도구'}를 
                  통해 빠른 성장이 가능합니다. N8N 자동화를 도입하면 전문 인력 없이도 AI 역량을 내재화할 수 있습니다.
                </p>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
              <p className="text-sm font-medium text-purple-800">
                💡 <strong>종합 진단:</strong> {pulseText}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 상세 분석 - 카테고리별 진단결과 */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">📊 카테고리별 진단결과 (실제 평가데이터)</CardTitle>
                  </CardHeader>
        <CardContent className="space-y-4">
          {categoryView.map((category: any, index: number) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">{category.name}</h4>
                <span className="text-lg font-bold text-blue-600">{category.score5.toFixed(1)}점</span>
                      </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(category.score5 / 5) * 100}%` }}
                ></div>
                      </div>
              <p className="text-sm text-gray-600 mt-2">
                현재 점수: {category.score5.toFixed(1)}점 (5점 만점)
                <br />100점 환산: {category.score100}점
                <br />목표: {category.target}점 / 업계평균: {category.benchmark}점
                <br />격차(GAP): {category.gap.toFixed(2)}점
              </p>
              
              {category.strengths?.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            주요 강점
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                    {category.strengths.slice(0, 2).map((strength: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                <span>{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
              {category.weaknesses?.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-orange-700 mb-2 flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" />
                            개선 필요사항
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                    {category.weaknesses.slice(0, 2).map((weakness: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-orange-500 mt-1">•</span>
                                <span>{weakness}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
          ))}
                  </CardContent>
                </Card>

      {/* 🎯 SWOT 전략 매트릭스 - 실제 데이터 기반 */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <CardTitle className="text-xl">🎯 SWOT 전략 매트릭스</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* SO 전략 */}
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800 mb-2">SO 전략 (강점-기회)</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {diagnosis.swotAnalysis?.strategies?.SO?.slice(0, 3).map((strategy: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>{strategy}</span>
                  </li>
                )) || [
                  <li key={0}>• {diagnosis.swotAnalysis?.strengths?.[0]}를 활용한 {diagnosis.swotAnalysis?.opportunities?.[0]} 선점</li>,
                  <li key={1}>• 빠른 의사결정으로 클라우드 AI 서비스 즉시 도입</li>,
                  <li key={2}>• 조직 민첩성을 바탕으로 N8N 자동화 빠른 확산</li>
                ]}
              </ul>
            </div>
            
            {/* WO 전략 */}
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-800 mb-2">WO 전략 (약점-기회)</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {diagnosis.swotAnalysis?.strategies?.WO?.slice(0, 3).map((strategy: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>{strategy}</span>
                  </li>
                )) || [
                  <li key={0}>• {diagnosis.swotAnalysis?.weaknesses?.[0]} 극복을 위한 {diagnosis.swotAnalysis?.opportunities?.[0]} 활용</li>,
                  <li key={1}>• AI 전문 인력 부족을 N8N 노코드 자동화로 해결</li>,
                  <li key={2}>• 예산 제약을 정부지원사업 연계로 극복</li>
                ]}
              </ul>
            </div>
            
            {/* ST 전략 */}
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-semibold text-orange-800 mb-2">ST 전략 (강점-위협)</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {diagnosis.swotAnalysis?.strategies?.ST?.slice(0, 3).map((strategy: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span>{strategy}</span>
                  </li>
                )) || [
                  <li key={0}>• {diagnosis.swotAnalysis?.strengths?.[0]}로 {diagnosis.swotAnalysis?.threats?.[0]} 대응</li>,
                  <li key={1}>• 빠른 실행력으로 기술 변화 속도에 대응</li>,
                  <li key={2}>• 조직 유연성으로 AI 선도 기업과의 격차 축소</li>
                ]}
              </ul>
            </div>
            
            {/* WT 전략 */}
            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <h4 className="font-semibold text-red-800 mb-2">WT 전략 (약점-위협)</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {diagnosis.swotAnalysis?.strategies?.WT?.slice(0, 3).map((strategy: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>{strategy}</span>
                  </li>
                )) || [
                  <li key={0}>• {diagnosis.swotAnalysis?.weaknesses?.[0]}과 {diagnosis.swotAnalysis?.threats?.[0]} 최소화 전략</li>,
                  <li key={1}>• 단계적 AI 도입으로 리스크 관리</li>,
                  <li key={2}>• 외부 전문가 협력으로 역량 보완</li>
                ]}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ⚡ 중요성-긴급성-시행가능성 매트릭스 & N8N Quick Win 프로젝트 */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <CardTitle className="text-xl">⚡ N8N 자동화 Quick Win 프로젝트</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* 우선순위 매트릭스 */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3">📊 우선순위 매트릭스 (중요성 × 긴급성 × 시행가능성)</h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-center p-2 bg-red-100 rounded">
                <div className="font-bold text-red-700">높음</div>
                <div className="text-xs text-gray-600">즉시 실행</div>
              </div>
              <div className="text-center p-2 bg-yellow-100 rounded">
                <div className="font-bold text-yellow-700">중간</div>
                <div className="text-xs text-gray-600">단기 계획</div>
              </div>
              <div className="text-center p-2 bg-green-100 rounded">
                <div className="font-bold text-green-700">낮음</div>
                <div className="text-xs text-gray-600">장기 검토</div>
              </div>
            </div>
          </div>
          
          {/* Quick Win 프로젝트 목록 */}
          <div className="space-y-3">
            {diagnosis.recommendedActions?.slice(0, 3).map((action: any, i: number) => (
              <div key={i} className={`p-4 rounded-lg border-l-4 ${
                action.priority === 'HIGH' ? 'bg-red-50 border-red-500' :
                action.priority === 'MEDIUM' ? 'bg-yellow-50 border-yellow-500' :
                'bg-green-50 border-green-500'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-semibold text-gray-800">{action.title}</h5>
                  <Badge className={
                    action.priority === 'HIGH' ? 'bg-red-500' :
                    action.priority === 'MEDIUM' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }>
                    {action.priority === 'HIGH' ? '높음' :
                     action.priority === 'MEDIUM' ? '중간' : '낮음'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mb-2">{action.description}</p>
                <div className="flex gap-4 text-xs text-gray-600">
                  <span>⏱️ {action.timeframe}</span>
                  <span>💰 비용: {action.implementationCost === 'HIGH' ? '높음' :
                                   action.implementationCost === 'MEDIUM' ? '중간' : '낮음'}</span>
                  <span>📈 기대효과: {action.expectedImpact}</span>
                </div>
              </div>
            )) || [
              <div key={0} className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <h5 className="font-semibold text-gray-800">주간 보고서 데이터 취합 자동화</h5>
                <p className="text-sm text-gray-700">N8N으로 각 부서 데이터를 자동 수집하여 주간 보고서 생성</p>
                <div className="flex gap-4 text-xs text-gray-600 mt-2">
                  <span>⏱️ 1주일</span>
                  <span>💰 비용: 낮음</span>
                  <span>📈 주 5시간 절약</span>
                </div>
              </div>,
              <div key={1} className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <h5 className="font-semibold text-gray-800">고객 문의 자동 분류 및 알림</h5>
                <p className="text-sm text-gray-700">이메일/채팅 문의를 AI로 분류하고 담당자에게 자동 알림</p>
                <div className="flex gap-4 text-xs text-gray-600 mt-2">
                  <span>⏱️ 2주일</span>
                  <span>💰 비용: 중간</span>
                  <span>📈 응답시간 50% 단축</span>
                </div>
              </div>,
              <div key={2} className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h5 className="font-semibold text-gray-800">영업 기회 데이터 자동 업데이트</h5>
                <p className="text-sm text-gray-700">CRM과 연동하여 영업 파이프라인 자동 관리</p>
                <div className="flex gap-4 text-xs text-gray-600 mt-2">
                  <span>⏱️ 1개월</span>
                  <span>💰 비용: 중간</span>
                  <span>📈 영업 효율 30% 향상</span>
                </div>
              </div>
            ]}
          </div>
        </CardContent>
      </Card>

      {/* 🚀 3단계 실행 로드맵 - SWOT 기반 */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <CardTitle className="text-xl">🚀 3단계 실행 로드맵</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* 1단계 */}
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h4 className="font-semibold text-indigo-800 mb-2">
                1단계: N8N 기반 업무 자동화 기초 (1-3개월)
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• N8N 플랫폼 도입 및 기본 워크플로우 구축</li>
                <li>• {diagnosis.swotAnalysis?.strengths?.[0]}를 활용한 Quick Win 프로젝트 실행</li>
                <li>• {diagnosis.swotAnalysis?.weaknesses?.[0]} 개선을 위한 기초 교육</li>
                <li>• 반복 업무 자동화 파일럿 프로젝트 3개 완료</li>
              </ul>
            </div>
            
            {/* 2단계 */}
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">
                2단계: AI 통합 자동화 확산 (4-8개월)
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• N8N 기반 부서별 맞춤 자동화 확대</li>
                <li>• {diagnosis.swotAnalysis?.opportunities?.[0]} 활용한 AI 서비스 연동</li>
                <li>• AI 분석 결과 자동 리포팅 시스템 구축</li>
                <li>• 다중 시스템 연동 자동화로 업무 효율 40% 향상</li>
              </ul>
            </div>
            
            {/* 3단계 */}
            <div className="p-4 bg-pink-50 rounded-lg">
              <h4 className="font-semibold text-pink-800 mb-2">
                3단계: 지능형 자동화 생태계 완성 (9-12개월)
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• N8N 기반 완전 자동화 시스템 구축</li>
                <li>• {diagnosis.swotAnalysis?.threats?.[0]} 대응 위한 예측적 자동화</li>
                <li>• AI 기반 의사결정 지원 시스템 고도화</li>
                <li>• 외부 파트너 시스템과 자동 연동 생태계 구축</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 액션 버튼 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => setShowFullReport(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          <FileText className="w-4 h-4 mr-2" />
          상세 보고서 보기
        </Button>
        <Button 
          variant="outline"
          onClick={() => window.location.href = '/consultation'}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          전문가 상담 신청
        </Button>
        <Button 
          variant="outline"
          onClick={() => window.location.href = '/diagnosis'}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          새로운 진단 시작
        </Button>
            </div>

      {/* 상세 보고서 모달 */}
      {showFullReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">📋 AI 역량진단 상세 보고서</h2>
                <Button 
                  variant="outline"
                  onClick={() => setShowFullReport(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
          </div>

          <div className="space-y-6">
                {/* 신청기업 AI 혁신의 脈 */}
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h3 className="font-semibold text-indigo-900 mb-2">🏁 신청기업 AI 혁신의 脈</h3>
                  <div className="text-sm text-indigo-800 space-y-2">
                    <p>
                      업종: <strong>{industry}</strong>, 종합점수: <strong>{score}점</strong> ({scoreBand === 'low' ? '초기/도입' : scoreBand === 'mid' ? '확산' : '최적화/선도'}) 수준으로 평가되었습니다.
                    </p>
                    <p>{pulseText}</p>
                    <p>
                      강점은 기회와 연결하고, 약점은 위험을 회피하면서 실행가능성이 높은 영역부터 단계적으로 추진하도록 설계했습니다.
                    </p>
                  </div>
                </div>

                {/* 기업 정보 */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">🏢 기업 정보</h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><strong>기업명:</strong> {diagnosis.companyName}</div>
                    <div><strong>업종:</strong> {diagnosis.industry}</div>
                    <div><strong>직원수:</strong> {diagnosis.employeeCount}</div>
                    <div><strong>담당자:</strong> {diagnosis.contactManager}</div>
                    <div><strong>사업장 위치:</strong> {diagnosis.businessLocation}</div>
                    <div><strong>진단일시:</strong> {diagnosis.submitDate}</div>
                    <div><strong>처리시간:</strong> {diagnosis.processingTime}</div>
                    <div><strong>결과 ID:</strong> {diagnosis.resultId}</div>
                  </div>
                </div>

                {/* SWOT 분석 */}
                {diagnosis.swotAnalysis && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">📈 SWOT 분석 (실제 데이터 기반)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">강점 (Strengths)</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          {diagnosis.swotAnalysis.strengths?.map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                    ))}
                  </ul>
                      </div>
                      <div className="p-4 bg-red-50 rounded-lg">
                        <h4 className="font-semibold text-red-800 mb-2">약점 (Weaknesses)</h4>
                        <ul className="text-sm text-red-700 space-y-1">
                          {diagnosis.swotAnalysis.weaknesses?.map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                    ))}
                  </ul>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">기회 (Opportunities)</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          {diagnosis.swotAnalysis.opportunities?.map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                    ))}
                  </ul>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-2">위협 (Threats)</h4>
                        <ul className="text-sm text-orange-700 space-y-1">
                          {diagnosis.swotAnalysis.threats?.map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                    ))}
                  </ul>
            </div>
                    </div>
                  </div>
                )}

            {/* SWOT 전략 매트릭스 */}
                {diagnosis.swotAnalysis?.strategies && (
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">🔍 SWOT 전략 매트릭스</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white p-4 rounded-lg">
                        <strong className="text-green-600">SO 전략:</strong>
                        <ul className="mt-2 space-y-1 text-gray-700 list-disc list-inside">
                          {diagnosis.swotAnalysis.strategies.SO.map((s: string, i: number) => (
                            <li key={`so-${i}`}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <strong className="text-blue-600">WO 전략:</strong>
                        <ul className="mt-2 space-y-1 text-gray-700 list-disc list-inside">
                          {diagnosis.swotAnalysis.strategies.WO.map((s: string, i: number) => (
                            <li key={`wo-${i}`}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <strong className="text-purple-600">ST 전략:</strong>
                        <ul className="mt-2 space-y-1 text-gray-700 list-disc list-inside">
                          {diagnosis.swotAnalysis.strategies.ST.map((s: string, i: number) => (
                            <li key={`st-${i}`}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <strong className="text-orange-600">WT 전략:</strong>
                        <ul className="mt-2 space-y-1 text-gray-700 list-disc list-inside">
                          {diagnosis.swotAnalysis.strategies.WT.map((s: string, i: number) => (
                            <li key={`wt-${i}`}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
          </div>
                )}

                {/* AI 트렌드 분석 */}
                {diagnosis.swotAnalysis?.aiAnalysis && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">🤖 AI 트렌드 분석</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-700 mb-2">현재 주목받는 AI 기술</h4>
                        <ul className="text-sm text-blue-600 space-y-1">
                          {diagnosis.swotAnalysis.aiAnalysis.currentAITrends?.map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-700 mb-2">AI로 인한 미래 변화</h4>
                        <ul className="text-sm text-blue-600 space-y-1">
                          {diagnosis.swotAnalysis.aiAnalysis.futureChanges?.map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                    </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-700 mb-2">AI 적응 전략</h4>
                        <ul className="text-sm text-blue-600 space-y-1">
                          {diagnosis.swotAnalysis.aiAnalysis.adaptationStrategies?.map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-700 mb-2">AI 도입시 경쟁 우위</h4>
                        <ul className="text-sm text-blue-600 space-y-1">
                          {diagnosis.swotAnalysis.aiAnalysis.competitiveAdvantages?.map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      </div>
                    </div>
                )}

                {/* 개선 방안 */}
                {diagnosis.recommendedActions && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">💡 개선 방안</h3>
                    <ul className="text-sm text-blue-700 space-y-2">
                      {diagnosis.recommendedActions.map((action: any, index: number) => (
                        <li key={index}>
                          <strong>{action.title}:</strong> {action.description}
                          <br />
                          우선순위: {action.priority}, 기간: {action.timeframe}, 예상효과: {action.expectedImpact}, 투자비용: {action.implementationCost}
                        </li>
                      ))}
                    </ul>
            </div>
                )}

                {/* 중요성-긴급성-시행가능성 매트릭스 및 n8n Quick Win */}
                {diagnosis?.priorityMatrix && (
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <h3 className="font-semibold text-emerald-900 mb-2">⚡ 중요성-긴급성-시행가능성 매트릭스</h3>
                    {/* SWOT-Quick Wins 매핑표 */}
                    {diagnosis?.swotAnalysis?.strategies && (
                      <div className="mb-4 overflow-x-auto">
                        <table className="min-w-full text-xs bg-white rounded-lg">
                          <thead>
                            <tr className="text-left text-gray-600">
                              <th className="p-2">Quick Win</th>
                              <th className="p-2">연결된 전략</th>
                              <th className="p-2">분류</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(diagnosis.priorityMatrix.quadrants?.quickWins || []).map((qw: string, i: number) => {
                              const { bucket, strategy } = mapQuickWinToStrategy(qw, diagnosis.swotAnalysis.strategies);
                              return (
                                <tr key={`qw-map-${i}`} className="border-t">
                                  <td className="p-2 text-gray-900">{qw}</td>
                                  <td className="p-2 text-gray-700">{strategy}</td>
                                  <td className="p-2 font-semibold text-emerald-700">{bucket}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-white p-4 rounded-lg">
                        <strong className="text-emerald-700">Quick Wins</strong>
                        <ul className="mt-2 space-y-1 text-gray-700 list-disc list-inside">
                          {diagnosis.priorityMatrix.quadrants?.quickWins?.map((t: string, i: number) => (
                            <li key={`qw-${i}`}>{t}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <strong className="text-indigo-700">Strategic Projects</strong>
                        <ul className="mt-2 space-y-1 text-gray-700 list-disc list-inside">
                          {diagnosis.priorityMatrix.quadrants?.strategicProjects?.map((t: string, i: number) => (
                            <li key={`sp-${i}`}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-emerald-800 mb-1">🚀 n8n 자동화 Quick Win 프로젝트</h4>
                      <p className="text-sm text-gray-700 mb-2">
                        상단 매트릭스의 Quick Wins를 기반으로 즉시 실행 가능한 업무 자동화를 추천합니다.
                      </p>
                      <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                        <li>
                          CRM 리드 라우팅 템플릿: 
                          <a className="text-emerald-700 underline" href="/n8n/templates/quickwin_crm_lead_routing.json" target="_blank">JSON 템플릿 다운로드</a>
                        </li>
                        <li>
                          설문→구글시트 저장 템플릿: 
                          <a className="text-emerald-700 underline" href="/n8n/templates/quickwin_survey_to_sheets.json" target="_blank">JSON 템플릿 다운로드</a>
                        </li>
                      </ul>
                      <div className="mt-3 text-xs text-gray-500">
                        n8n에서 Import → JSON 파일 선택 후, 환경변수/크리덴셜만 연결하면 바로 실행할 수 있습니다.
                      </div>
                    </div>
                  </div>
                )}

                {/* 3단계 실행 로드맵 (SWOT/매트릭스 기반) - 간트 스타일 간단 시각화 */}
                {diagnosis?.executionRoadmap && (
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-semibold text-yellow-900 mb-2">🗺️ 3단계 실행 로드맵</h3>
                    <div className="space-y-3">
                      {['phase1','phase2','phase3'].map((p, idx) => {
                        const phase = (diagnosis.executionRoadmap as any)[p] || {};
                        // 기간 텍스트(예: "0-3개월", "3-6개월", "6-12개월")를 기반으로 상대 길이 계산
                        const periodText = String(phase.period || '');
                        const months = (() => {
                          const m = periodText.match(/(\d+)[^\d]*(\d+)?\s*개월/);
                          if (m) {
                            const a = parseInt(m[1], 10);
                            const b = m[2] ? parseInt(m[2], 10) : a;
                            return Math.max(1, b - a) || a;
                          }
                          const single = periodText.match(/(\d+)\s*개월/);
                          return single ? parseInt(single[1], 10) : 3;
                        })();
                        const width = Math.min(100, Math.max(20, months * 8));
                        return (
                          <div key={p} className="bg-white p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
                              <strong className="text-gray-900">{phase.name || `Phase ${idx+1}`}</strong>
                              <span>{phase.period || ''}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded h-3 overflow-hidden">
                              <div className="bg-yellow-500 h-3" style={{ width: `${width}%` }} />
                            </div>
                            <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm text-gray-700 list-disc list-inside">
                              {(phase.keyActivities || []).slice(0,4).map((t: string, i: number) => (
                                <li key={`${p}-${i}`}>{t}</li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 종합 경영진단보고서 */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">📋 종합 경영진단보고서</h3>
                <div className="prose max-w-none text-gray-700 leading-relaxed">
                  <div className="whitespace-pre-line text-base">
                    {diagnosis.comprehensiveReport}
                  </div>
                </div>
                <div className="mt-6 text-sm text-gray-500 text-right">
                    보고서 길이: {diagnosis.comprehensiveReport?.length || 0}자
                </div>
          </div>
          </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 