import { Metadata } from 'next';
import Real45QuestionForm from '@/features/ai-diagnosis/components/Real45QuestionForm';

export const metadata: Metadata = {
  title: '이교장의AI역량진단 45문항 | AICAMP',
  description: '이교장의 45문항 정밀 진단으로 귀사의 AI 역량을 정확히 분석하고 맞춤형 전략을 수립합니다',
  keywords: '이교장의AI역량진단, 45문항 진단, 디지털 전환, AI 컨설팅, 기업 진단, AICAMP, GEMINI 2.5 Flash',
};

export default async function AIDiagnosisPage() {
  return (
    <main className="min-h-screen">
      <Real45QuestionForm />
    </main>
  );
}
