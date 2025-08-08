'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

  const handleScoreChange = (id: string, value: number) => {
    setScores(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
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

          <div className="space-y-4">
            <div className="font-semibold">핵심 문항(6)</div>
            {questionIds.map((id) => (
              <div key={id} className="grid grid-cols-1 md:grid-cols-6 items-center gap-3">
                <div className="md:col-span-2 text-sm text-gray-700">{id}</div>
                <div className="md:col-span-4 flex gap-2">
                  {[1,2,3,4,5].map(v => (
                    <Button
                      key={v}
                      type="button"
                      variant={scores[id] === v ? 'default' : 'outline'}
                      onClick={() => handleScoreChange(id, v)}
                      className="w-10"
                    >{v}</Button>
                  ))}
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
            <Button type="submit" disabled={submitting}>{submitting ? '제출 중...' : '진단 신청 제출'}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}


