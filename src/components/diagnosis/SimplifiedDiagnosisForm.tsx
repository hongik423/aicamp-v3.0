'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DiagnosisProgressModal from '@/components/diagnosis/DiagnosisProgressModal';

type SimplifiedDiagnosisFormProps = {
  onComplete: (results: any) => void;
  onBack: () => void;
};

const questionIds = [
  'leadership_1',
  'leadership_2',
  'infra_1',
  'talent_3',
  'culture_2',
  'app_3',
];

export default function SimplifiedDiagnosisForm({ onComplete, onBack }: SimplifiedDiagnosisFormProps) {
  const [companyName, setCompanyName] = useState('테스트주식회사');
  const [applicantName, setApplicantName] = useState('홍길동');
  const [email, setEmail] = useState('you@example.com');
  const [phone, setPhone] = useState('010-0000-0000');
  const [industry, setIndustry] = useState('IT/소프트웨어');
  const [companySize, setCompanySize] = useState('11-50');
  const [privacyConsent, setPrivacyConsent] = useState(true);
  const [scores, setScores] = useState<Record<string, number>>({
    leadership_1: 5,
    leadership_2: 4,
    infra_1: 4,
    talent_3: 3,
    culture_2: 4,
    app_3: 5,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [diagnosisId, setDiagnosisId] = useState<string | undefined>(undefined);

  const handleScoreChange = (id: string, value: number) => {
    setScores(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setIsProgressOpen(true);
    try {
      const res = await fetch('/api/ai-capability-diagnosis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          applicantName,
          email,
          phone,
          industry,
          companySize,
          privacyConsent,
          assessmentResponses: scores,
        }),
      });
      const data = await res.json();
      if (!res.ok || data?.success === false) {
        throw new Error(data?.error || '요청 처리 중 오류가 발생했습니다');
      }
      if (data?.diagnosisId) setDiagnosisId(String(data.diagnosisId));
      onComplete(data);
    } catch (err: any) {
      setError(err?.message || '요청 처리 중 오류가 발생했습니다');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>간소화된 AI 역량진단 신청</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-yellow-800 text-sm font-bold">!</span>
            </div>
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">⏰ 분석 시간 안내</p>
              <p className="mb-2">
                <strong>고품질 AI 분석을 위해 약 10분 이상 소요됩니다.</strong><br />
                제출 후 잠시 다른 업무를 보시거나 창을 닫으셔도 됩니다.
              </p>
              <p className="text-xs text-yellow-700">
                📧 분석 완료 시 등록하신 이메일로 상세한 보고서를 발송해드립니다.
              </p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">회사명</Label>
              <Input id="companyName" value={companyName} onChange={e => setCompanyName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="applicantName">담당자</Label>
              <Input id="applicantName" value={applicantName} onChange={e => setApplicantName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="phone">연락처</Label>
              <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="industry">업종</Label>
              <Input id="industry" value={industry} onChange={e => setIndustry(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="companySize">직원수</Label>
              <Input id="companySize" value={companySize} onChange={e => setCompanySize(e.target.value)} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="font-semibold text-lg text-gray-900">핵심 문항 평가 (6개 문항)</div>
            <div className="text-sm text-gray-600 mb-4">
              각 문항에 대해 1점(매우 낮음)부터 5점(매우 높음)까지 평가해주세요. 라인을 클릭하면 쉽게 선택할 수 있습니다.
            </div>
            {questionIds.map((id, index) => (
              <div key={id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900">문항 {index + 1}: {id}</div>
                    <div className="text-sm text-gray-500">현재 선택: {scores[id]}점</div>
                  </div>
                  
                  {/* 클릭 가능한 라인 영역 */}
                  <div 
                    className="relative cursor-pointer py-4"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const width = rect.width;
                      const value = Math.max(1, Math.min(5, Math.round((x / width) * 5)));
                      handleScoreChange(id, value);
                    }}
                  >
                    {/* 배경 라인 */}
                    <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full transform -translate-y-1/2"></div>
                    
                    {/* 선택된 영역 표시 */}
                    <div 
                      className="absolute top-1/2 left-0 h-2 bg-blue-500 rounded-full transform -translate-y-1/2 transition-all duration-200"
                      data-width={`${(scores[id] / 5) * 100}%`}
                      style={{ width: `${(scores[id] / 5) * 100}%` }}
                    ></div>
                    
                    {/* 점수 표시점들 */}
                    {[1, 2, 3, 4, 5].map(v => (
                      <div
                        key={v}
                        className={`absolute top-1/2 w-4 h-4 rounded-full border-2 transform -translate-y-1/2 transition-all duration-200 ${
                          scores[id] >= v 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'bg-white border-gray-300 hover:border-blue-400'
                        }`}
                        data-position={`${((v - 1) / 4) * 100}%`}
                        style={{ left: `${((v - 1) / 4) * 100}%`, marginLeft: '-8px' }}
                      ></div>
                    ))}
                  </div>
                  
                  {/* 점수 레이블 */}
                  <div className="flex justify-between text-xs text-gray-500 px-2">
                    <span>1점 (매우 낮음)</span>
                    <span>2점</span>
                    <span>3점</span>
                    <span>4점</span>
                    <span>5점 (매우 높음)</span>
                  </div>
                  
                  {/* 기존 버튼 방식도 유지 (모바일 편의성) */}
                  <div className="flex gap-2 justify-center mt-3">
                    {[1,2,3,4,5].map(v => (
                      <Button
                        key={v}
                        type="button"
                        variant={scores[id] === v ? 'default' : 'outline'}
                        onClick={() => handleScoreChange(id, v)}
                        className="w-12 h-12 text-lg font-semibold hover:scale-105 transition-transform"
                      >{v}</Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input id="consent" type="checkbox" aria-label="개인정보 수집 및 이용 동의" title="개인정보 수집 및 이용 동의" checked={privacyConsent} onChange={e => setPrivacyConsent(e.target.checked)} />
            <Label htmlFor="consent">개인정보 수집 및 이용에 동의합니다 (필수)</Label>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onBack}>뒤로</Button>
            <Button 
              type="submit" 
              disabled={submitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 text-lg"
            >
              {submitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  진단이 시작되었습니다...
                </div>
              ) : (
                '🚀 AI 역량진단 신청'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      <DiagnosisProgressModal
        isOpen={isProgressOpen}
        onClose={() => setIsProgressOpen(false)}
        diagnosisId={diagnosisId}
        companyName={companyName}
        email={email}
      />
    </Card>
  );
}


