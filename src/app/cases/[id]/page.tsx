'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users,
  CheckCircle,
  Target,
  BarChart3,
  Quote,
  Calendar,
  Building2,
  Award,
  ChevronRight,
  Factory,
  Palette,
  Rocket,
  Shield,
  Globe,
  Package,
  Heart,
  GraduationCap,
  ShoppingCart,
  Briefcase
} from 'lucide-react';

type ParamsPromise = Promise<{ id: string }>;

// 성공사례 상세 데이터 타입
interface CaseDetail {
  id: string;
  category: string;
  industry: string;
  companyName: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  color: string;
  companyInfo: {
    industry: string;
    employees: string;
    revenue: string;
    location: string;
    specialty?: string;
    services?: string;
  };
  challenges: Array<{
    title: string;
    description: string;
    impact: string;
  }>;
  process: Array<{
    phase: string;
    duration: string;
    activities: string[];
    results: string[];
  }>;
  results: {
    quantitative: Array<{
      metric: string;
      before: string;
      after: string;
      improvement: string;
    }>;
    financial: Array<{
      item: string;
      amount: string;
    }>;
    qualitative: string[];
  };
  curriculum?: {
    basic: string[];
    advanced: string[];
    executive: string[];
  };
  appliedModules?: string;
  testimonial: {
    quote: string;
    author: string;
    position: string;
    company: string;
    additionalQuote?: string;
  };
  followUpResults: Array<{
    metric: string;
    achievement: string;
  }>;
  applicability: {
    similarIndustries: string[];
    successFactors: string[];
  };
  tags: string[];
}

export default function CaseDetailPage({ params }: { params: ParamsPromise }) {
  const [caseId, setCaseId] = React.useState<string>('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Promise.resolve(params).then((p) => {
      setCaseId(p.id);
      setLoading(false);
    });
  }, [params]);

  // 26개 성공사례 상세 데이터
  const caseDetails: { [key: string]: CaseDetail } = {
    // 제조업 3개
    'manufacturing-aicamp-digital-transformation': {
      id: 'manufacturing-aicamp-digital-transformation',
      category: 'manufacturing',
      industry: '제조업',
      companyName: '(주)스마트매뉴팩처링',
      title: 'AI 프로세스 자동화로 스마트팩토리 구축 및 고몰입조직 실현',
      subtitle: 'ChatGPT API + n8n 워크플로우로 생산계획 자동화, 품질예측 AI 도입',
      description: 'ChatGPT API + n8n 워크플로우로 생산계획 자동화, 품질예측 AI 도입, 전직원 AI 활용 교육으로 생산성 245% 향상과 조직몰입도 94% 달성',
      icon: Factory,
      color: 'blue',
      
      companyInfo: {
        industry: '자동차 부품 제조·정밀가공',
        employees: '156명',
        revenue: '연매출 320억원',
        location: '경기도 안산',
        specialty: '자동차 부품'
      },
      
      challenges: [
        { title: '생산 효율성 저하', description: '수작업 의존으로 인한 생산성 한계', impact: '목표 대비 78% 달성' },
        { title: '품질 관리 어려움', description: '불량률 증가와 검사 시간 과다', impact: '불량률 5.2%' },
        { title: '직원 AI 역량 부족', description: 'AI 기술 도입에 대한 두려움과 저항', impact: '변화 수용도 낮음' }
      ],
      
      process: [
        {
          phase: '1단계: AICAMP 기초 교육',
          duration: '2주 (36시간)',
          activities: [
            'AI 기초 이해(8h) - AI/ML 개념 및 제조업 적용 사례',
            'ChatGPT 활용법(16h) - 프롬프트 엔지니어링, API 활용',
            'n8n 워크플로우 기초(12h) - 자동화 시나리오 설계'
          ],
          results: ['AI 이해도 85% 향상', '참여율 94%', '기초 역량 확보']
        },
        {
          phase: '2단계: 심화 실무 적용',
          duration: '4주 (60시간)',
          activities: [
            'Python 데이터분석(24h) - 생산 데이터 분석 실습',
            'Computer Vision 실습(20h) - 품질검사 AI 구축',
            'ML 예측모델 구축(16h) - 수요예측, 재고최적화'
          ],
          results: ['자동화율 67% 달성', '품질 정확도 95%', '예측 정확도 89%']
        },
        {
          phase: '3단계: 경영진 전략 수립',
          duration: '3일 (12시간)',
          activities: [
            'AI 전략 수립(4h) - 스마트팩토리 로드맵',
            'ROI 분석 워크숍(4h) - 투자 효과 분석',
            '변화관리 리더십(4h) - 조직문화 혁신 전략'
          ],
          results: ['투자 승인', '전사 확산 계획 수립', '리더십 확보']
        }
      ],
      
      curriculum: {
        basic: ['AI 기초 이해(8h)', 'ChatGPT 활용법(16h)', 'n8n 워크플로우 기초(12h)'],
        advanced: ['Python 데이터분석(24h)', 'Computer Vision 실습(20h)', 'ML 예측모델 구축(16h)'],
        executive: ['AI 전략 수립(4h)', 'ROI 분석 워크숍(4h)', '변화관리 리더십(4h)']
      },
      
      appliedModules: '총 108시간 교육 - 기초 36h, 심화 60h, 경영진 12h',
      
      results: {
        quantitative: [
          { metric: '생산성 향상', before: '100%', after: '245%', improvement: '145% 향상' },
          { metric: '작업시간 단축', before: '8시간', after: '3.2시간', improvement: '60% 단축' },
          { metric: '불량률 감소', before: '5.2%', after: '0.8%', improvement: '85% 감소' },
          { metric: '직원몰입도', before: '62%', after: '94%', improvement: '32%p 향상' }
        ],
        financial: [
          { item: '생산성 향상 효과', amount: '연간 45억원' },
          { item: '품질 개선 효과', amount: '연간 12억원' },
          { item: '인력 효율화', amount: '연간 8억원' },
          { item: 'ROI', amount: '680%' }
        ],
        qualitative: [
          '전사적 AI 역량 강화로 혁신 마인드셋 구축',
          'n8n 기반 자동화로 업무 만족도 크게 향상',
          '부서 간 협업 증진으로 조직 시너지 창출',
          '지속적 학습 문화 정착으로 변화 적응력 강화'
        ]
      },
      
      testimonial: {
        quote: "AICAMP 교육을 통해 직원들이 AI를 두려워하지 않고 적극적으로 활용하게 되었습니다. 특히 n8n을 활용한 자동화로 생산성이 크게 향상되었어요.",
        author: "김제조",
        position: "생산관리팀장",
        company: "(주)스마트매뉴팩처링"
      },
      
      followUpResults: [
        { metric: '스마트팩토리 확장', achievement: '전체 생산라인 70% 자동화 달성' },
        { metric: 'AI 전문인력 양성', achievement: '사내 AI 전문가 15명 육성' },
        { metric: '혁신문화 정착', achievement: '월평균 개선 제안 250% 증가' }
      ],
      
      applicability: {
        similarIndustries: ['정밀기계', '전자부품', '화학'],
        successFactors: ['AICAMP 교육', '조직워크숍', 'n8n 자동화', '변화관리']
      },
      
      tags: ['제조업', 'AICAMP교육', '조직워크숍', 'n8n자동화', '스마트팩토리']
    },
