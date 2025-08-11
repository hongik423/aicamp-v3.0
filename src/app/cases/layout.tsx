import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI CAMP 성공사례벤치마크 - 24개 업종별 AI & n8n 교육 성과',
  description: '업종별 맞춤형 AI 교육으로 달성한 실제 성과 벤치마크. 평균 47% 생산성 향상, 38% 비용 절감을 기록한 2,487개 기업의 성공사례를 확인하세요.',
  keywords: '성공사례벤치마크, AI교육성과, 업종별AI도입, n8n자동화, 디지털전환성과, 생산성향상, 비용절감',
  openGraph: {
    title: 'AI CAMP 성공사례벤치마크 - 24개 업종별 성과 검증',
    description: '실제 기업들이 AI CAMP 교육으로 달성한 검증된 성과 벤치마크. 업종별 맞춤 커리큘럼으로 3개월 만에 놀라운 변화를 경험하세요.',
    type: 'website',
    url: 'https://aicamp.co.kr/cases',
    images: [
      {
        url: '/images/success-cases-og.jpg',
        width: 1200,
        height: 630,
        alt: 'AI CAMP 성공사례벤치마크',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI CAMP 성공사례벤치마크 - 업종별 AI 교육 성과',
    description: '2,487개 기업이 검증한 AI 교육 성과. 평균 47% 생산성 향상의 비밀을 확인하세요.',
    images: ['/images/success-cases-twitter.jpg'],
  },
  alternates: {
    canonical: 'https://aicamp.co.kr/cases',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
