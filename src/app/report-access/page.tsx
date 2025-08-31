"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Search, Shield, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ReportAccessPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [diagnosisId, setDiagnosisId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentIds, setRecentIds] = useState<string[]>([]);
  
  // 🔐 이메일 인증 관련 상태
  const [accessMethod, setAccessMethod] = useState<'diagnosisId' | 'email'>('diagnosisId');
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [authStep, setAuthStep] = useState<'input' | 'code' | 'verified'>('input');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [codeExpiresAt, setCodeExpiresAt] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);

  // URL 매개변수에서 target 진단ID 확인 및 최근 조회한 진단ID 로드
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // URL 매개변수에서 target 진단ID 확인
      const urlParams = new URLSearchParams(window.location.search);
      const targetId = urlParams.get('target');
      if (targetId) {
        setDiagnosisId(targetId);
        console.log('🎯 URL에서 대상 진단ID 설정:', targetId);
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

  // 🔐 이메일 인증번호 발송
  const handleSendAuthCode = async () => {
    if (!email.trim() || !diagnosisId.trim()) {
      setAuthError('이메일과 진단ID를 모두 입력해주세요.');
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
      console.log('📧 이메일 인증번호 발송 요청:', {
        email: email.replace(/(.{3}).*(@.*)/, '$1***$2'),
        diagnosisId: diagnosisId
      });

      const response = await fetch('/api/email-auth/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          diagnosisId: diagnosisId.trim()
        })
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ 인증번호 발송 성공');
        
        setAuthStep('code');
        setCodeExpiresAt(Date.now() + (result.expiresIn * 1000));
        setRemainingTime(result.expiresIn);
        
        toast({
          title: "인증번호 발송 완료",
          description: "이메일로 6자리 인증번호를 발송했습니다.",
          variant: "default"
        });
        
        // 남은 시간 카운트다운 시작
        const countdown = setInterval(() => {
          setRemainingTime(prev => {
            if (prev <= 1) {
              clearInterval(countdown);
              setAuthStep('input');
              setAuthError('인증번호가 만료되었습니다. 다시 요청해주세요.');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
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
  const handleVerifyAuthCode = async () => {
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
      console.log('🔐 인증번호 검증 요청');

      const response = await fetch('/api/email-auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          diagnosisId: diagnosisId.trim(),
          authCode: authCode.trim()
        })
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ 인증번호 검증 성공');
        
        setAuthStep('verified');
        
        toast({
          title: "인증 완료",
          description: "보고서에 접근합니다.",
          variant: "default"
        });
        
        // 보고서 페이지로 리다이렉트
        setTimeout(() => {
          window.location.href = result.redirectUrl;
        }, 1500);
        
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
  const formatRemainingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    setLoading(true);
    setError('');

    try {
      console.log('🔐 진단ID 접근 권한 검증 시작:', diagnosisId);

      // 1단계: 진단ID 접근 권한 검증
      const authResponse = await fetch('/api/diagnosis-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diagnosisId: diagnosisId.trim(),
          accessType: 'user'
        })
      });

      if (!authResponse.ok) {
        const authError = await authResponse.json();
        throw new Error(authError.error || '접근 권한 검증에 실패했습니다.');
      }

      const authResult = await authResponse.json();
      
      if (!authResult.success) {
        throw new Error(authResult.error || '진단ID에 접근할 권한이 없습니다.');
      }

      console.log('✅ 접근 권한 확인 완료');

      // 2단계: 실제 진단 데이터 존재 여부 확인 (GAS 연동)
      const verifyResponse = await fetch('/api/diagnosis-results/' + encodeURIComponent(diagnosisId.trim()), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!verifyResponse.ok) {
        if (verifyResponse.status === 404) {
          throw new Error('해당 진단ID의 결과를 찾을 수 없습니다. 이메일로 받은 정확한 진단ID를 확인해주세요.');
        }
        throw new Error('진단 결과 확인 중 오류가 발생했습니다.');
      }

      const verifyResult = await verifyResponse.json();
      
      console.log('📊 API 응답 확인:', {
        success: verifyResult.success,
        hasData: !!verifyResult.data,
        source: verifyResult.data?.source,
        message: verifyResult.message
      });
      
      // 강화된 폴백 시스템으로 인해 항상 성공 응답이 옴
      if (verifyResult.success && verifyResult.data) {
        console.log('✅ 진단 데이터 존재 확인 완료 (폴백 시스템 포함)');
      } else {
        throw new Error(verifyResult.error || '진단 결과를 확인할 수 없습니다.');
      }

      // 최근 조회한 진단ID 저장
      saveRecentId(diagnosisId.trim());

      // 세션에 인증 상태 저장 (순환 리디렉션 방지)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(`diagnosis_auth_${diagnosisId.trim()}`, 'true');
        sessionStorage.setItem(`diagnosis_auth_time_${diagnosisId.trim()}`, Date.now().toString());
      }

      // 3단계: 진단 결과 페이지로 리다이렉트
      toast({
        title: "접근 권한 확인됨",
        description: "진단 결과 페이지로 이동합니다.",
      });

      // 실제 보고서 페이지로 리다이렉트 (순환 방지 매개변수 추가)
      router.push(`/diagnosis-results/${diagnosisId.trim()}?from=report-access`);

    } catch (err: any) {
      console.error('❌ 진단ID 검증 실패:', err);
      setError(err.message || '진단 결과에 접근할 수 없습니다.');
      
      toast({
        title: "접근 실패",
        description: err.message || "진단ID를 다시 확인해주세요.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
              className="w-16 h-16 object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AICAMP</h1>
            <p className="text-lg text-gray-600">AI 역량진단 결과 조회</p>
          </div>
        </div>

        {/* 메인 카드 */}
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">
              진단 결과 조회
            </CardTitle>
            <CardDescription className="text-gray-600">
              진단ID 또는 이메일 인증으로 결과를 확인하세요
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 🔐 접근 방법 선택 탭 */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => {
                  setAccessMethod('diagnosisId');
                  setError('');
                  setAuthError('');
                }}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  accessMethod === 'diagnosisId'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                진단ID로 접근
              </button>
              <button
                type="button"
                onClick={() => {
                  setAccessMethod('email');
                  setError('');
                  setAuthError('');
                  setAuthStep('input');
                }}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  accessMethod === 'email'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                이메일 인증으로 접근
              </button>
            </div>

            {/* 진단ID 접근 방식 */}
            {accessMethod === 'diagnosisId' && (
              <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="diagnosisId" className="text-sm font-medium text-gray-700">
                  진단ID
                </label>
                <Input
                  id="diagnosisId"
                  type="text"
                  placeholder="DIAG_45Q_AI_1756528197552_xte4ept68"
                  value={diagnosisId}
                  onChange={(e) => {
                    // 사용자가 입력한 값을 그대로 유지 (대소문자 구분)
                    const value = e.target.value;
                    setDiagnosisId(value);
                    setError('');
                  }}
                  onPaste={(e) => {
                    // 붙여넣기 시 안전한 처리
                    e.preventDefault();
                    const pastedText = e.clipboardData.getData('text');
                    console.log('붙여넣기된 텍스트:', pastedText, '길이:', pastedText.length);
                    
                    // 붙여넣기된 텍스트를 그대로 사용 (대소문자 구분)
                    const value = pastedText.trim();
                    setDiagnosisId(value);
                    setError('');
                  }}
                  className="text-center font-mono text-sm"
                  disabled={loading}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(e);
                    }
                  }}
                />
                <div className="text-xs text-gray-500 text-center space-y-1">
                  <p>이메일로 받은 진단ID를 정확히 입력해주세요</p>
                  <p className="text-blue-600">💡 팁: Ctrl+V로 복사한 진단ID를 붙여넣기 하세요</p>
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || !diagnosisId.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    검증 중...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    결과 조회
                  </>
                )}
              </Button>
            </form>
            )}

            {/* 🔐 이메일 인증 접근 방식 */}
            {accessMethod === 'email' && (
              <div className="space-y-4">
                {authStep === 'input' && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">이메일 인증 접근</span>
                      </div>
                      <p className="text-xs text-blue-700">
                        진단ID를 분실하셨나요? 진단 신청 시 사용한 이메일로 인증번호를 받아 보고서에 접근하세요.
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        진단 신청 이메일
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setAuthError('');
                        }}
                        placeholder="example@company.com"
                        className="w-full"
                        disabled={authLoading}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        AI 역량진단 신청 시 사용한 이메일을 입력해주세요
                      </p>
                    </div>

                    <div>
                      <label htmlFor="diagnosisIdForEmail" className="block text-sm font-medium text-gray-700 mb-2">
                        진단 ID
                      </label>
                      <Input
                        id="diagnosisIdForEmail"
                        type="text"
                        value={diagnosisId}
                        onChange={(e) => {
                          setDiagnosisId(e.target.value);
                          setAuthError('');
                        }}
                        placeholder="DIAG_45Q_AI_1234567890_abc123"
                        className="w-full font-mono text-sm"
                        disabled={authLoading}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        이메일로 받은 진단ID를 입력해주세요
                      </p>
                    </div>

                    {authError && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-red-800">
                          {authError}
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button 
                      onClick={handleSendAuthCode}
                      className="w-full" 
                      disabled={authLoading || !email.trim() || !diagnosisId.trim()}
                    >
                      {authLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          인증번호 발송 중...
                        </>
                      ) : (
                        '📧 인증번호 발송'
                      )}
                    </Button>
                  </div>
                )}

                {authStep === 'code' && (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">인증번호 발송 완료</span>
                      </div>
                      <p className="text-xs text-green-700">
                        <strong>{email}</strong>로 6자리 인증번호를 발송했습니다.
                      </p>
                      {remainingTime > 0 && (
                        <p className="text-xs text-green-600 mt-1">
                          ⏰ 남은 시간: <strong>{formatRemainingTime(remainingTime)}</strong>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="authCode" className="block text-sm font-medium text-gray-700 mb-2">
                        인증번호 (6자리)
                      </label>
                      <Input
                        id="authCode"
                        type="text"
                        value={authCode}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                          setAuthCode(value);
                          setAuthError('');
                        }}
                        placeholder="123456"
                        className="w-full text-center font-mono text-lg tracking-widest"
                        disabled={authLoading}
                        maxLength={6}
                      />
                      <p className="text-xs text-gray-500 mt-1 text-center">
                        이메일로 받은 6자리 숫자를 입력해주세요
                      </p>
                    </div>

                    {authError && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-red-800">
                          {authError}
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setAuthStep('input');
                          setAuthCode('');
                          setAuthError('');
                        }}
                        className="flex-1"
                        disabled={authLoading}
                      >
                        다시 발송
                      </Button>
                      <Button 
                        onClick={handleVerifyAuthCode}
                        className="flex-1" 
                        disabled={authLoading || authCode.length !== 6}
                      >
                        {authLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            인증 중...
                          </>
                        ) : (
                          '🔐 인증 확인'
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {authStep === 'verified' && (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h3 className="text-sm font-medium text-green-800 mb-1">인증 완료!</h3>
                      <p className="text-xs text-green-700">
                        보고서 페이지로 이동 중입니다...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 최근 조회한 진단ID */}
            {accessMethod === 'diagnosisId' && recentIds.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  최근 조회한 진단ID
                </h4>
                <div className="space-y-2">
                  {recentIds.map((recentId, index) => (
                    <button
                      key={recentId}
                      onClick={() => {
                        setDiagnosisId(recentId);
                        setError('');
                      }}
                      className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <code className="text-xs font-mono text-gray-700">
                          {recentId.length > 25 ? `${recentId.substring(0, 25)}...` : recentId}
                        </code>
                        <span className="text-xs text-gray-500">
                          {index === 0 ? '최근' : `${index + 1}번째`}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 안내 정보 */}
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  보안 안내
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 진단ID는 본인만 사용할 수 있는 고유 번호입니다</li>
                  <li>• 타인과 공유하지 마시고 안전하게 보관해주세요</li>
                  <li>• 진단 완료 후 이메일로 발송된 ID를 사용하세요</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  진단ID 확인 방법
                </h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• AI 역량진단 완료 후 이메일을 확인하세요</li>
                  <li>• 스팸 메일함도 꼭 확인해주세요</li>
                  <li>• 진단ID 형식: DIAG_45Q_xxxxxxxxx</li>
                  <li>• 이메일을 받지 못한 경우 고객센터로 연락주세요</li>
                </ul>
              </div>
            </div>

            {/* 추가 링크 */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/ai-diagnosis')}
                  className="w-full"
                >
                  새로운 진단 시작
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => router.push('/support/contact')}
                  className="w-full text-sm"
                >
                  고객센터 문의
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 하단 정보 */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">
            문의사항이 있으시면 언제든 연락주세요
          </p>
          <div className="text-xs text-gray-400 space-y-1">
            <p>📧 hongik423@gmail.com</p>
            <p>📱 010-9251-9743</p>
            <p>🌐 aicamp.club</p>
          </div>
        </div>
      </div>
    </div>
  );
}


