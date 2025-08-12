import { Metadata } from 'next';
import AIDiagnosisForm from '@/features/ai-diagnosis/components/AIDiagnosisForm';

export const metadata: Metadata = {
  title: 'AI 역량진단 | AICAMP',
  description: '귀사의 AI 도입 준비도를 종합적으로 진단하고 맞춤형 전략을 수립합니다',
  keywords: 'AI 역량진단, 디지털 전환, AI 컨설팅, 기업 진단, AICAMP',
};

export default async function AIDiagnosisPage() {
  return (
    <main className="min-h-screen">
      <AIDiagnosisForm />
    </main>
  );
}
