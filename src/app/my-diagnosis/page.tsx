'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Eye,
  Download,
  Copy,
  AlertCircle,
  CheckCircle,
  Loader2,
  Shield,
  ArrowRight,
  BarChart3,
  Award,
  Calendar,
  Building,
  Star,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function MyDiagnosisPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  // 진단ID 입력 관련 상태
  const [diagnosisId, setDiagnosisId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // 조회된 보고서 정보
  const [reportInfo, setReportInfo] = useState<any>(null);
  const [hasReport, setHasReport] = useState(false);
  
  // 최근 조회 기록
  const [recentIds, setRecentIds] = useState<string[]>([]);

  // 최근 조회한 진단ID 로드
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aicamp_recent_diagnosis_ids');
      if (saved) {
        try {
          const ids = JSON.parse(saved);
          setRecentIds(Array.isArray(ids) ? ids.slice(0, 3) : []);
        } catch (error) {
          console.error('최근 진단ID 로드 실패:', error);
        }
      }
    }
  }, []);

  // 최근 조회한 진단ID 저장
  const saveRecentId = (id: string) => {
    if (typeof window !== 'undefined') {
      const updated = [id, ...recentIds.filter(existingId => existingId !== id)].slice(0, 3);
      setRecentIds(updated);
      localStorage.setItem('aicamp_recent_diagnosis_ids', JSON.stringify(updated));
    }
  };

  // 진단ID로 보고서 조회
  const handleSearch = async () => {
    if (!diagnosisId.trim()) {
      setError('진단ID를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');
    setReportInfo(null);
    setHasReport(false);

    try {
      console.log('🔍 나의 AI 역량진단 보고서 조회 시작:', diagnosisId);
      
      const cleanId = diagnosisId.trim();
      
      // 진단ID 형식 검증
      if (cleanId.length < 10 || !cleanId.includes('DIAG_')) {
        throw new Error('올바른 진단ID 형식이 아닙니다. 이메일로 받은 정확한 진단ID를 입력해주세요.');
      }

      // API로 보고서 정보 조회
      const response = await fetch(`/api/diagnosis-reports/${encodeURIComponent(cleanId)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(20000)
      });

      if (response.ok) {
        const result = await response.json();
        
        if (result.success && result.data) {
          console.log('✅ 보고서 정보 조회 성공');
          
          setReportInfo(result.data);
          setHasReport(true);
          saveRecentId(cleanId);
          
          toast({
            title: "✅ 보고서 조회 성공",
            description: "AI 역량진단 보고서를 찾았습니다!",
            variant: "default"
          });
          
        } else {
          throw new Error(result.error || '해당 진단ID의 보고서를 찾을 수 없습니다.');
        }
      } else if (response.status === 404) {
        throw new Error('해당 진단ID의 보고서를 찾을 수 없습니다. 이메일로 받으신 정확한 진단ID를 확인해주세요.');
      } else {
        throw new Error(`조회 실패: ${response.status} ${response.statusText}`);
      }

    } catch (error: any) {
      console.error('❌ 보고서 조회 실패:', error);
      
      let errorMessage = '보고서 조회 중 오류가 발생했습니다.';
      
      if (error.name === 'AbortError') {
        errorMessage = '조회 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      
    } finally {
      setLoading(false);
    }
  };

  // 보고서 보기
  const handleViewReport = () => {
    if (reportInfo && diagnosisId) {
      window.open(`/diagnosis-results/${diagnosisId}`, '_blank');
    }
  };

  // 보고서 다운로드
  const handleDownloadReport = async () => {
    if (!reportInfo || !diagnosisId) return;

    try {
      const response = await fetch(`/api/diagnosis-reports/${encodeURIComponent(diagnosisId)}`);
      const result = await response.json();
      
      if (result.success && result.htmlReport) {
        const blob = new Blob([result.htmlReport], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `AI역량진단보고서_${reportInfo.companyName}_${diagnosisId}_V27.0.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast({
          title: "✅ 다운로드 완료",
          description: "V27.0 Ultimate 35페이지 보고서가 다운로드되었습니다.",
          variant: "default"
        });
      }
    } catch (error) {
      toast({
        title: "❌ 다운로드 실패",
        description: "보고서 다운로드 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              나의 AI 역량진단 보고서
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              이메일로 받으신 진단ID를 입력하여 개인화된 AI 역량진단 결과를 확인하세요
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 진단ID 입력 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-3">
                <Search className="h-6 w-6 text-blue-600" />
                진단ID로 내 보고서 찾기
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">
                AI 역량진단 완료 후 이메일로 받으신 고유 진단ID를 입력해주세요
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* 진단ID 입력 */}
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    placeholder="DIAG_45Q_AI_1756528197552_xte4ept68"
                    value={diagnosisId}
                                         onChange={(e) => {
                       // 사용자가 입력한 값을 그대로 유지 (대소문자 구분)
                       const value = e.target.value;
                       setDiagnosisId(value);
                       setError('');
                       setHasReport(false);
                     }}
                    className="text-center font-mono text-sm py-3 text-lg border-2 focus:border-blue-500"
                    disabled={loading}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch();
                      }
                    }}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="text-center">
                  <Button 
                    onClick={handleSearch}
                    disabled={!diagnosisId.trim() || loading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                        조회 중...
                      </>
                    ) : (
                      <>
                        <Search className="h-5 w-5 mr-3" />
                        내 보고서 조회하기
                      </>
                    )}
                  </Button>
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-5 w-5" />
                    <AlertDescription className="text-red-800 text-base">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* 최근 조회한 진단ID */}
              {recentIds.length > 0 && !hasReport && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    최근 조회한 보고서
                  </h4>
                  <div className="grid gap-2">
                    {recentIds.map((recentId, index) => (
                      <motion.button
                        key={recentId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        onClick={() => {
                          setDiagnosisId(recentId);
                          setError('');
                        }}
                        className="w-full text-left p-4 bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <code className="text-sm font-mono text-gray-700 block">
                              {recentId}
                            </code>
                            <span className="text-xs text-gray-500 mt-1">
                              {index === 0 ? '가장 최근 조회' : `${index + 1}번째 조회`}
                            </span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-blue-600" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* 조회된 보고서 정보 */}
              {hasReport && reportInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* 보고서 헤더 */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">보고서를 찾았습니다!</h3>
                        <p className="text-green-700">{reportInfo.companyName || '귀하의 기업'}의 AI 역량진단 결과</p>
                      </div>
                    </div>
                    
                    {/* 진단ID 정보 */}
                    <div className="bg-white/70 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-600">진단ID:</span>
                          <code className="ml-2 bg-gray-100 px-3 py-1 rounded font-mono text-sm">{diagnosisId}</code>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText(diagnosisId);
                            toast({
                              title: "✅ 복사 완료",
                              description: "진단ID가 클립보드에 복사되었습니다.",
                              variant: "default"
                            });
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* 핵심 지표 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="h-8 w-8 text-yellow-500" />
                        <div>
                          <div className="text-sm text-gray-600">AI 역량 등급</div>
                          <div className="text-2xl font-bold text-gray-900">
                            {reportInfo.grade || 'N/A'}등급
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                      <div className="flex items-center gap-3 mb-2">
                        <BarChart3 className="h-8 w-8 text-blue-500" />
                        <div>
                          <div className="text-sm text-gray-600">총 점수</div>
                          <div className="text-2xl font-bold text-gray-900">
                            {reportInfo.totalScore || 0}점
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                      <div className="flex items-center gap-3 mb-2">
                        <Star className="h-8 w-8 text-purple-500" />
                        <div>
                          <div className="text-sm text-gray-600">성숙도</div>
                          <div className="text-lg font-bold text-gray-900">
                            {reportInfo.maturityLevel || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 액션 버튼들 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      onClick={handleViewReport}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 text-lg font-semibold"
                      size="lg"
                    >
                      <Eye className="h-5 w-5 mr-3" />
                      35페이지 보고서 보기
                    </Button>
                    
                    <Button 
                      onClick={handleDownloadReport}
                      variant="outline"
                      className="border-2 border-green-500 text-green-700 hover:bg-green-50 py-4 text-lg font-semibold"
                      size="lg"
                    >
                      <Download className="h-5 w-5 mr-3" />
                      V27.0 보고서 다운로드
                    </Button>
                  </div>

                  {/* 추가 정보 */}
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      보고서 정보
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-blue-600" />
                        <span>기업명: {reportInfo.companyName || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span>진단일: {reportInfo.createdAt ? new Date(reportInfo.createdAt).toLocaleDateString('ko-KR') : 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 안내 정보 */}
              {!hasReport && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      보안 및 개인정보 보호
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-2">
                      <li>• 진단ID는 본인만 사용할 수 있는 고유 식별번호입니다</li>
                      <li>• 타인과 공유하지 마시고 안전하게 보관해주세요</li>
                      <li>• 보고서는 35페이지 V27.0 Ultimate 버전으로 제공됩니다</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      진단ID 확인 방법
                    </h4>
                    <ul className="text-sm text-green-700 space-y-2">
                      <li>• AI 역량진단 완료 후 자동 발송된 이메일을 확인하세요</li>
                      <li>• 스팸 메일함도 꼭 확인해주세요</li>
                      <li>• 진단ID 형식: DIAG_45Q_AI[숫자]_[코드]</li>
                      <li>• 이메일을 받지 못한 경우 고객센터로 연락주세요</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* 추가 액션 */}
        {!hasReport && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <div className="space-y-4">
              <p className="text-gray-600">아직 AI 역량진단을 받지 않으셨나요?</p>
              <Button 
                onClick={() => router.push('/ai-diagnosis')}
                variant="outline"
                className="border-2 border-blue-500 text-blue-700 hover:bg-blue-50 px-8 py-3"
                size="lg"
              >
                <BarChart3 className="h-5 w-5 mr-3" />
                AI 역량진단 시작하기
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

