"use client";

import { useState } from 'react';
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
      
      if (!verifyResult.success) {
        throw new Error(verifyResult.error || '진단 결과를 확인할 수 없습니다.');
      }

      console.log('✅ 진단 데이터 존재 확인 완료');

      // 3단계: 진단 결과 페이지로 리다이렉트
      toast({
        title: "접근 권한 확인됨",
        description: "진단 결과 페이지로 이동합니다.",
      });

      // 실제 보고서 페이지로 리다이렉트
      router.push(`/diagnosis-results/${diagnosisId.trim()}`);

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
              src="https://aicamp.club/images/aicamp_logo_del_250726.png" 
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
              이메일로 받은 진단ID를 입력하여 결과를 확인하세요
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 입력 폼 */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="diagnosisId" className="text-sm font-medium text-gray-700">
                  진단ID
                </label>
                <Input
                  id="diagnosisId"
                  type="text"
                  placeholder="DIAG_45Q_xxxxxxxxx"
                  value={diagnosisId}
                  onChange={(e) => {
                    setDiagnosisId(e.target.value);
                    setError('');
                  }}
                  className="text-center font-mono"
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 text-center">
                  이메일로 받은 진단ID를 정확히 입력해주세요
                </p>
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


