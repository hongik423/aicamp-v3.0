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
  RefreshCw,
  Mail,
  Clock,
  X
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
  
  // 접근 방법 선택
  const [accessMethod, setAccessMethod] = useState<'diagnosisId' | 'email'>('diagnosisId');
  
  // 진단ID 입력 관련 상태
  const [diagnosisId, setDiagnosisId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // 이메일 인증 관련 상태
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [authStep, setAuthStep] = useState<'input' | 'verify'>('input');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [countdown, setCountdown] = useState(0);
  
  // 조회된 보고서 정보
  const [reportInfo, setReportInfo] = useState<any>(null);
  const [hasReport, setHasReport] = useState(false);
  
  // 최근 조회 기록 제거 - 보안상 이유로 삭제

  // 🔐 이메일 인증번호 발송
  const sendAuthCode = async () => {
    if (!email.trim()) {
      setAuthError('이메일 주소를 입력해주세요.');
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAuthError('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    setAuthLoading(true);
    setAuthError('');

    try {
      const response = await fetch('/api/email-auth/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim()
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setAuthStep('verify');
        setCountdown(300); // 5분
        
        // 카운트다운 시작
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              setAuthStep('input');
              setAuthError('인증번호가 만료되었습니다. 다시 요청해주세요.');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        toast({
          title: "인증번호 발송 완료",
          description: "이메일로 6자리 인증번호를 발송했습니다.",
        });
        
      } else {
        throw new Error(result.error || '인증번호 발송에 실패했습니다.');
      }
      
    } catch (error: any) {
      console.error('❌ 인증번호 발송 실패:', error);
      setAuthError(error.message || '인증번호 발송 중 오류가 발생했습니다.');
    } finally {
      setAuthLoading(false);
    }
  };

  // 🔐 인증번호 검증
  const verifyAuthCode = async () => {
    if (!authCode.trim()) {
      setAuthError('인증번호를 입력해주세요.');
      return;
    }

    if (!/^\d{6}$/.test(authCode)) {
      setAuthError('인증번호는 6자리 숫자여야 합니다.');
      return;
    }

    setAuthLoading(true);
    setAuthError('');

    try {
      const response = await fetch('/api/email-auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          code: authCode.trim()
        }),
      });

      const result = await response.json();
      
      if (result.success && result.token) {
        console.log('✅ 이메일 인증 성공');
        
        // 인증 토큰과 함께 보고서 페이지로 이동
        // 이메일 인증 성공 후 진단 결과를 찾기 위해 이메일 기반으로 리디렉션
        router.push(`/my-diagnosis?auth=email&token=${result.token}&email=${encodeURIComponent(email)}`);
        
      } else {
        throw new Error(result.error || '인증번호 검증에 실패했습니다.');
      }
      
    } catch (error: any) {
      console.error('❌ 인증번호 검증 실패:', error);
      setAuthError(error.message || '인증번호 검증 중 오류가 발생했습니다.');
    } finally {
      setAuthLoading(false);
    }
  };

  // 남은 시간 포맷팅
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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

      // API로 진단 결과 조회 (올바른 엔드포인트 사용)
      const response = await fetch(`/api/diagnosis-results/${encodeURIComponent(cleanId)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(20000)
      });

      if (response.ok) {
        const result = await response.json();
        
        if (result.success && result.data) {
          console.log('✅ 진단 결과 조회 성공:', result);
          
          // 진단 결과 데이터를 보고서 정보 형식으로 변환
          const diagnosisData = result.data.diagnosis || result.data;
          setReportInfo({
            diagnosisId: cleanId,
            companyName: diagnosisData.companyName || 'N/A',
            contactName: diagnosisData.contactName || 'N/A',
            totalScore: diagnosisData.totalScore || 0,
            grade: diagnosisData.grade || 'N/A',
            maturityLevel: diagnosisData.maturityLevel || 'N/A',
            createdAt: diagnosisData.createdAt || diagnosisData.timestamp || new Date().toISOString(),
            reportUrl: `/diagnosis-results/${cleanId}`,
            status: 'completed'
          });
          
          setHasReport(true);
          // 보안상 최근 조회 기록 저장 제거
          
          toast({
            title: "✅ 진단보고서 조회 성공",
            description: `${diagnosisData.companyName || '회사'}의 AI 역량진단 보고서를 찾았습니다.`,
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
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🔒 내 AI 역량진단 보고서 조회
            </h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
              <div className="flex items-start space-x-2">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <div className="font-medium mb-1">본인 전용 보안 페이지</div>
                  <p className="text-xs">본인이 직접 제출한 평가표에 대한 보고서만 조회할 수 있습니다. 다른 사람의 보고서는 접근할 수 없습니다.</p>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              진단 완료 후 이메일로 받으신 <strong>개인 전용 진단ID</strong> 또는 <strong>이메일 인증</strong>을 통해 본인의 AI 역량진단 결과를 안전하게 확인하세요
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
              {/* 접근 방법 선택 */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 text-center">접근 방법을 선택해주세요</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setAccessMethod('diagnosisId');
                      setError('');
                      setAuthError('');
                    }}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      accessMethod === 'diagnosisId'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        accessMethod === 'diagnosisId' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <FileText className={`w-4 h-4 ${
                          accessMethod === 'diagnosisId' ? 'text-blue-600' : 'text-gray-500'
                        }`} />
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">진단ID 직접</div>
                        <div className="text-xs opacity-75">빠른 접근</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setAccessMethod('email');
                      setError('');
                      setAuthError('');
                      setAuthStep('input');
                    }}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      accessMethod === 'email'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        accessMethod === 'email' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <Mail className={`w-4 h-4 ${
                          accessMethod === 'email' ? 'text-blue-600' : 'text-gray-500'
                        }`} />
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">이메일 인증</div>
                        <div className="text-xs opacity-75">ID 분실시</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* 진단ID 직접 입력 */}
              {accessMethod === 'diagnosisId' && (
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    placeholder={diagnosisId ? "" : "DIAG_45Q_AI_1756528197552_xte4ept68"}
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
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-green-800">
                      <div className="font-medium mb-1">🔐 본인 전용 진단ID 입력</div>
                      <p className="text-xs">본인이 제출한 평가표의 고유 진단ID만 입력 가능합니다. 다른 사람의 ID는 접근이 차단됩니다.</p>
                    </div>
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
                        <Shield className="h-5 w-5 mr-3" />
                        🔒 본인 보고서 조회하기
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
              )}

              {/* 이메일 인증 접근 */}
              {accessMethod === 'email' && (
                <div className="space-y-4">
                  {authStep === 'input' ? (
                    // 이메일 입력 단계
                    <div className="space-y-4">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-start space-x-2">
                          <Shield className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-amber-800">
                            <div className="font-medium mb-1">🔐 간편 이메일 인증</div>
                            <p className="text-xs">진단 신청 시 사용한 이메일 주소만 입력하면 6자리 인증번호를 발송합니다. 본인의 이메일로만 접근 가능합니다.</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">이메일 주소</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={email ? "" : "your-email@company.com"}
                            className="pl-10 h-12"
                          />
                        </div>
                      </div>



                      {authError && (
                        <Alert className="border-red-200 bg-red-50">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <AlertDescription className="text-red-700">{authError}</AlertDescription>
                        </Alert>
                      )}

                      <Button 
                        onClick={sendAuthCode}
                        className="w-full h-12 bg-amber-600 hover:bg-amber-700"
                        disabled={authLoading || !email.trim()}
                      >
                        {authLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            발송 중...
                          </>
                        ) : (
                          <>
                            <Mail className="mr-2 h-4 w-4" />
                            인증번호 발송
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    // 인증번호 입력 단계
                    <div className="space-y-4">
                      <div className="text-center space-y-2">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{email}</span>로<br />
                          인증번호를 발송했습니다
                        </p>
                        {countdown > 0 && (
                          <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>남은 시간: {formatTime(countdown)}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">6자리 인증번호</label>
                        <Input
                          type="text"
                          value={authCode}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                            setAuthCode(value);
                          }}
                          placeholder={authCode ? "" : "123456"}
                          className="text-center text-2xl font-mono tracking-widest h-16"
                          maxLength={6}
                        />
                        {authCode.length === 6 && (
                          <div className="flex items-center justify-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            <span className="text-xs">입력 완료</span>
                          </div>
                        )}
                      </div>

                      {authError && (
                        <Alert className="border-red-200 bg-red-50">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <AlertDescription className="text-red-700">{authError}</AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-2">
                        <Button 
                          onClick={verifyAuthCode}
                          className="w-full h-12 bg-green-600 hover:bg-green-700"
                          disabled={authLoading || authCode.length !== 6}
                        >
                          {authLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              인증 중...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              인증번호 확인
                            </>
                          )}
                        </Button>

                        <Button 
                          variant="outline"
                          onClick={() => {
                            setAuthStep('input');
                            setAuthCode('');
                            setAuthError('');
                            setCountdown(0);
                          }}
                          className="w-full"
                          disabled={authLoading}
                        >
                          다시 발송
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 최근 조회 기록 제거 - 보안상 이유로 삭제됨 */}

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
                        <h3 className="text-xl font-bold text-gray-900">🔒 본인 보고서 조회 완료!</h3>
                        <p className="text-green-700">인증된 본인의 AI 역량진단 결과 - {reportInfo.companyName || '귀하의 기업'}</p>
                      </div>
                    </div>
                    
                    {/* 진단ID 정보 */}
                    <div className="bg-white/70 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-600">🔐 본인 인증 진단ID:</span>
                          <code className="ml-2 bg-green-100 px-3 py-1 rounded font-mono text-sm text-green-800">{diagnosisId}</code>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText(diagnosisId);
                            toast({
                              title: "✅ 본인 진단ID 복사 완료",
                              description: "개인 전용 진단ID가 안전하게 복사되었습니다.",
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

