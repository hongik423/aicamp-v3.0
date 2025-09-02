'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Loader2, 
  Search, 
  Shield, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Mail,
  Clock,
  X,
  Lightbulb,
  Info,
  HelpCircle,
  History,
  ArrowRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DiagnosisAccessController } from '@/lib/auth/diagnosis-access-controller';

export default function ReportAccessPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  // 접근 방법 상태
  const [accessMethod, setAccessMethod] = useState<'diagnosisId' | 'email'>('diagnosisId');
  
  // 진단ID 직접 접근 상태
  const [diagnosisId, setDiagnosisId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // 이메일 인증 상태 (진단ID 요구 제거)
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [authStep, setAuthStep] = useState<'input' | 'verify'>('input');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [foundDiagnosisId, setFoundDiagnosisId] = useState('');
  
  // 최근 조회 진단ID
  const [recentIds, setRecentIds] = useState<string[]>([]);

  // 컴포넌트 마운트 시 URL 파라미터 및 최근 ID 로드
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const targetId = urlParams.get('diagnosisId');
      const method = urlParams.get('method');
      
      if (targetId) {
        setDiagnosisId(targetId);
        setFoundDiagnosisId(targetId);
        console.log('🎯 URL에서 대상 진단ID 설정:', targetId);
      }
      
      // URL 파라미터로 접근 방법 자동 선택
      if (method === 'email') {
        setAccessMethod('email');
        console.log('📧 URL에서 이메일 인증 방법 자동 선택');
      } else if (method === 'diagnosisId') {
        setAccessMethod('diagnosisId');
        console.log('🆔 URL에서 진단ID 직접 방법 자동 선택');
      }
      
      const saved = localStorage.getItem('aicamp_recent_diagnosis_ids');
      if (saved) {
        try {
          const ids = JSON.parse(saved);
          setRecentIds(Array.isArray(ids) ? ids.slice(0, 5) : []);
        } catch (error) {
          console.error('최근 진단ID 로드 실패:', error);
        }
      }
    }
  }, []);

  // 최근 조회한 진단ID 저장
  const saveRecentId = (id: string) => {
    if (typeof window !== 'undefined') {
      const updated = [id, ...recentIds.filter(existingId => existingId !== id)].slice(0, 5);
      setRecentIds(updated);
      localStorage.setItem('aicamp_recent_diagnosis_ids', JSON.stringify(updated));
    }
  };

  // 🔐 이메일 인증번호 발송 (진단ID 요구 제거)
  const sendAuthCode = async () => {
    if (!email.trim()) {
      setAuthError('이메일을 입력해주세요.');
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
          // 진단ID 요구 제거
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setAuthStep('verify');
        setCountdown(300); // 5분
        
        // 발견된 진단ID 저장
        if (result.diagnosisId) {
          setFoundDiagnosisId(result.diagnosisId);
          console.log('✅ 이메일로 진단ID 발견:', result.diagnosisId);
        }
        
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
          code: authCode.trim(),
          diagnosisId: foundDiagnosisId || '' // 발견된 진단ID 사용
        }),
      });

      const result = await response.json();
      
      if (result.success && result.token) {
        console.log('✅ 이메일 인증 성공');
        const targetDiagnosisId = result.diagnosisId || foundDiagnosisId;
        
        if (targetDiagnosisId) {
          saveRecentId(targetDiagnosisId);
          
          // 인증 토큰과 함께 보고서 페이지로 이동
          router.push(`/diagnosis-results/${targetDiagnosisId}?auth=email&token=${result.token}`);
        } else {
          throw new Error('진단ID를 찾을 수 없습니다.');
        }
        
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

  // 진단ID 직접 접근
  const handleDiagnosisIdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!diagnosisId.trim()) {
      setError('진단ID를 입력해주세요.');
      return;
    }

    // 진단ID 형식 기본 검증
    if (diagnosisId.length < 10) {
      setError('유효하지 않은 진단ID 형식입니다.');
      return;
    }

    console.log('✅ 진단ID 확인 - 바로 이동:', diagnosisId.trim());
    
    // 바로 보고서 페이지로 이동 - 단순하게!
    router.push(`/diagnosis-results/${diagnosisId.trim()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* 로고 및 헤더 */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg">
            <img 
              src="/images/aicamp_logo_del_250726.png" 
              alt="AICAMP 로고" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI 역량진단 결과 조회</h1>
            <p className="text-gray-600 text-sm mt-2">진단ID 또는 이메일 인증으로 결과를 확인하세요</p>
          </div>
        </div>

        {/* 접근 방법 선택 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-center">접근 방법 선택</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
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
          </CardContent>
        </Card>

        {/* 진단ID 직접 접근 */}
        {accessMethod === 'diagnosisId' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>진단ID로 접근</span>
              </CardTitle>
              <CardDescription>이메일로 받은 진단ID를 입력하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleDiagnosisIdSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">진단ID</label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={diagnosisId}
                      onChange={(e) => setDiagnosisId(e.target.value)}
                      placeholder="DIAG_45Q_AI_1234567890_abc123"
                      className="h-12 text-base pr-10"
                      onPaste={(e) => {
                        setTimeout(() => {
                          toast({
                            title: "진단ID 붙여넣기 완료",
                            description: "진단ID가 입력되었습니다.",
                          });
                        }, 100);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleDiagnosisIdSubmit(e);
                        }
                      }}
                    />
                    {diagnosisId && (
                      <button
                        type="button"
                        onClick={() => setDiagnosisId('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                  disabled={loading || !diagnosisId.trim()}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      확인 중...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      결과 조회
                    </>
                  )}
                </Button>
              </form>

              {/* 진단ID 입력 안내 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <div className="font-medium mb-1">진단ID 입력 팁</div>
                    <ul className="space-y-1 text-xs">
                      <li>• 이메일에서 진단ID를 복사하여 붙여넣으세요</li>
                      <li>• 형식: DIAG_45Q_AI_숫자_영문</li>
                      <li>• 대소문자를 정확히 입력해주세요</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 이메일 인증 접근 */}
        {accessMethod === 'email' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-amber-600" />
                <span>이메일 인증으로 접근</span>
              </CardTitle>
              <CardDescription>진단ID를 분실한 경우 이메일 인증을 통해 접근하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 안내 메시지 */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-amber-800">
                    <div className="font-medium mb-1">이메일 인증 안내</div>
                    <p className="text-xs">진단 신청 시 사용한 이메일로 6자리 인증번호를 발송합니다.</p>
                  </div>
                </div>
              </div>

              {authStep === 'input' ? (
                // 이메일 입력 단계
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">이메일 주소</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your-email@company.com"
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>

                  {/* 진단ID 입력 필드 제거 - 이메일만으로 인증 */}

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
                      placeholder="123456"
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
                      }}
                      className="w-full"
                      disabled={authLoading}
                    >
                      다시 발송
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* 최근 조회한 진단ID (보안 강화) */}
        {recentIds.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base">
                <History className="w-4 h-4 text-gray-600" />
                <span>최근 조회한 진단ID</span>
                <Shield className="w-3 h-3 text-green-600" />
              </CardTitle>
              <CardDescription className="text-xs text-gray-500">
                인증된 진단ID만 표시됩니다 (30분 유효)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentIds.map((id, index) => {
                  // 세션 인증 상태 확인
                  const isAuthenticated = typeof window !== 'undefined' && 
                    sessionStorage.getItem(`diagnosis_auth_${id}`) === 'authorized';
                  const authTime = typeof window !== 'undefined' && 
                    sessionStorage.getItem(`diagnosis_auth_time_${id}`);
                  const isAuthValid = authTime && 
                    (Date.now() - parseInt(authTime) < 30 * 60 * 1000); // 30분
                  
                  return (
                    <button
                      key={id}
                      onClick={async () => {
                        // 🔒 보안 검증: 인증 상태 재확인
                        if (!isAuthenticated || !isAuthValid) {
                          toast({
                            title: "⚠️ 인증 만료",
                            description: "보안을 위해 다시 인증해주세요.",
                            variant: "destructive",
                          });
                          
                          // 만료된 ID 제거
                          const filteredIds = recentIds.filter(recentId => recentId !== id);
                          setRecentIds(filteredIds);
                          localStorage.setItem('aicamp_recent_diagnosis_ids', JSON.stringify(filteredIds));
                          
                          return;
                        }
                        
                        // 인증된 경우에만 접근 허용
                        setDiagnosisId(id);
                        setAccessMethod('diagnosisId');
                        
                        toast({
                          title: "✅ 인증 확인됨",
                          description: "보고서에 접근합니다.",
                        });
                      }}
                      className="w-full p-3 text-left rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-mono text-gray-700 group-hover:text-blue-700">
                          {id}
                        </span>
                        <div className="flex items-center space-x-2">
                          {isAuthenticated && isAuthValid ? (
                            <CheckCircle className="w-3 h-3 text-green-600" />
                          ) : (
                            <AlertCircle className="w-3 h-3 text-red-600" />
                          )}
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {isAuthenticated && isAuthValid ? (
                          '인증됨'
                        ) : (
                          '인증 만료 - 재인증 필요'
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 도움말 및 문의 */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <Shield className="w-6 h-6 text-green-600 mx-auto" />
                <h3 className="font-medium text-sm text-gray-900">보안 안내</h3>
                <p className="text-xs text-gray-600">
                  진단ID는 개인정보로 보호됩니다. 타인과 공유하지 마세요.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <HelpCircle className="w-6 h-6 text-blue-600 mx-auto" />
                <h3 className="font-medium text-sm text-gray-900">진단ID 확인법</h3>
                <p className="text-xs text-gray-600">
                  이메일 제목 또는 본문에서 DIAG_로 시작하는 ID를 찾으세요.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 하단 네비게이션 */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            onClick={() => router.push('/ai-diagnosis')}
            className="h-12"
          >
            새로운 진단 시작
          </Button>
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
            className="h-12"
          >
            홈으로 가기
          </Button>
        </div>

        {/* 푸터 */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>🔒 개인정보보호정책 준수</p>
          <p>📞 문의: 010-9251-9743</p>
          <p>🌐 aicamp.club</p>
        </div>
      </div>
    </div>
  );
}
