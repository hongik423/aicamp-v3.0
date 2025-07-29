'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, Calculator, TrendingUp, DollarSign, CheckCircle, 
  ArrowRight, Phone, Clock, Target, AlertCircle,
  Factory, CreditCard, Lightbulb, Beaker, Users, Globe,
  FileText, Calendar, ExternalLink, Rocket, Shield
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function PolicyFundingPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const benefits = [
    { icon: DollarSign, text: '시중은행 대비 저금리 (연 1.0~3.5%)' },
    { icon: Clock, text: '최장 10년 상환기간' },
    { icon: Shield, text: '정부 보증으로 담보 부담 완화' },
    { icon: Target, text: '기업 성장단계별 맞춤 지원' }
  ];

  const processSteps = [
    { step: '01', title: '무료 상담', description: 'AI 진단 및 전문가 상담' },
    { step: '02', title: '자금 분석', description: '맞춤형 정책자금 매칭' },
    { step: '03', title: '서류 준비', description: '신청서류 작성 지원' },
    { step: '04', title: '신청 대행', description: '온라인 신청 대행' },
    { step: '05', title: '사후 관리', description: '승인 후 지속 관리' }
  ];

  const fundingTypes = [
    {
      title: '시설자금',
      description: '생산설비, 사업장 구입',
      amount: '최대 45억원',
      rate: '연 2.0~3.0%',
      detailUrl: '/services/policy-funding/facility-funding',
      icon: Factory,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      specialty: '생산 최적화 + 품질관리'
    },
    {
      title: '운전자금',
      description: '원자재, 인건비 등',
      amount: '최대 10억원',
      rate: '연 2.5~3.5%',
      icon: CreditCard,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      specialty: '현금흐름 관리 + 운영 효율화',
      features: [
        '원재료 구입자금',
        '인건비 및 경상비',
        '마케팅 및 판촉비',
        '임차료 및 관리비'
      ],
      requirements: [
        '사업자 등록 후 1년 이상',
        '신용등급 B등급 이상',
        '매출액 증빙 가능',
        '세금 체납 없음'
      ]
    },
    {
      title: '창업자금',
      description: '창업 7년 이내 기업 대상',
      amount: '최대 10억원',
      rate: '연 1.5~2.5%',
      icon: Lightbulb,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      specialty: '비즈니스 모델 + 마케팅 전략',
      features: [
        '사업장 구입/임차',
        '시설 및 장비 구축',
        '초기 운영자금',
        '기술개발 자금'
      ],
      requirements: [
        '창업 7년 이내 기업',
        '혁신성장 분야 우대',
        '기술보증 가능 기업',
        '창업교육 이수자 우대'
      ]
    },
    {
      title: 'R&D자금',
      description: '기술개발 전용',
      amount: '최대 20억원',
      rate: '연 1.0~2.0%',
      icon: Beaker,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      specialty: '기술사업화 + 특허 전략',
      features: [
        '신기술 개발자금',
        '시제품 제작비',
        '특허 출원비용',
        '기술 상용화 자금'
      ],
      requirements: [
        '기술개발 계획서',
        '기업부설연구소 보유',
        '기술인력 30% 이상',
        'IP 보유 또는 출원'
      ]
    },
    {
      title: '투자분석기',
      description: 'AI 기반 재무타당성 분석',
      amount: '무료 제공',
      rate: '실시간 분석',
      detailUrl: '/services/policy-funding/investment-analysis',
      icon: Calculator,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      specialty: '5구간 평가 + 8개 지표 분석'
    }
  ];

  const fundingPrograms = {
    '운전자금': [
      {
        name: '중소벤처기업진흥공단',
        programs: [
          { title: '긴급경영안정자금', amount: '최대 10억원', rate: '2.5~3.0%', period: '5년' },
          { title: '수출기업 운전자금', amount: '최대 5억원', rate: '2.0~2.5%', period: '3년' },
          { title: '소상공인 운전자금', amount: '최대 7천만원', rate: '2.5~3.0%', period: '5년' }
        ]
      },
      {
        name: '신용보증기금',
        programs: [
          { title: '일반운전자금보증', amount: '최대 30억원', rate: '보증료 0.5~2.0%', period: '1년(연장가능)' },
          { title: '무역금융보증', amount: '최대 10억원', rate: '보증료 0.3~1.5%', period: '180일' }
        ]
      }
    ],
    '창업자금': [
      {
        name: '중소벤처기업진흥공단',
        programs: [
          { title: '청년전용 창업자금', amount: '최대 1억원', rate: '1.5~2.0%', period: '6년', note: '만 39세 이하' },
          { title: '혁신창업자금', amount: '최대 10억원', rate: '1.8~2.3%', period: '8년' },
          { title: '재창업자금', amount: '최대 5억원', rate: '2.0~2.5%', period: '6년' }
        ]
      },
      {
        name: '창업진흥원',
        programs: [
          { title: '초기창업패키지', amount: '최대 1억원', rate: '무이자', period: '-', note: '지원금' },
          { title: '예비창업패키지', amount: '최대 5천만원', rate: '무이자', period: '-', note: '지원금' }
        ]
      }
    ],
    'R&D자금': [
      {
        name: '중소벤처기업부',
        programs: [
          { title: '기술개발사업', amount: '최대 20억원', rate: '1.0~1.5%', period: '10년' },
          { title: 'R&D 바우처', amount: '최대 2억원', rate: '무이자', period: '-', note: '지원금' }
        ]
      },
      {
        name: '산업통상자원부',
        programs: [
          { title: '소재부품기술개발', amount: '최대 50억원', rate: '무이자', period: '-', note: '지원금' },
          { title: '산업기술혁신사업', amount: '최대 30억원', rate: '무이자', period: '-', note: '지원금' }
        ]
      }
    ]
  };

  const [selectedFunding, setSelectedFunding] = useState('운전자금');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              듀얼브레인 정책자금 통합 컨설팅
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-4">
            운전자금, 창업자금, R&D자금까지 모든 정책자금을 한 곳에서
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {benefits.map((benefit, index) => (
              <Badge key={index} variant="secondary" className="px-4 py-2">
                <benefit.icon className="h-4 w-4 mr-2" />
                {benefit.text}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Main Funding Types Tabs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">정책자금 종류별 상세 안내</CardTitle>
            <CardDescription>기업 상황에 맞는 최적의 정책자금을 선택하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="운전자금" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="운전자금" onClick={() => setSelectedFunding('운전자금')}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  운전자금
                </TabsTrigger>
                <TabsTrigger value="창업자금" onClick={() => setSelectedFunding('창업자금')}>
                  <Lightbulb className="h-4 w-4 mr-2" />
                  창업자금
                </TabsTrigger>
                <TabsTrigger value="R&D자금" onClick={() => setSelectedFunding('R&D자금')}>
                  <Beaker className="h-4 w-4 mr-2" />
                  R&D자금
                </TabsTrigger>
                <TabsTrigger value="시설자금" onClick={() => setSelectedFunding('시설자금')}>
                  <Factory className="h-4 w-4 mr-2" />
                  시설자금
                </TabsTrigger>
              </TabsList>

              {/* 운전자금 탭 */}
              <TabsContent value="운전자금" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-green-200">
                    <CardHeader className="bg-green-50">
                      <CardTitle className="flex items-center gap-2 text-green-700">
                        <CreditCard className="h-5 w-5" />
                        운전자금 특징
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-3">
                        {fundingTypes[1].features?.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader className="bg-green-50">
                      <CardTitle className="flex items-center gap-2 text-green-700">
                        <FileText className="h-5 w-5" />
                        지원 요건
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-3">
                        {fundingTypes[1].requirements?.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Shield className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">주요 운전자금 프로그램</h3>
                  <div className="space-y-4">
                    {fundingPrograms['운전자금'].map((org, idx) => (
                      <Card key={idx}>
                        <CardHeader>
                          <CardTitle className="text-lg">{org.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {org.programs.map((program, pidx) => (
                              <div key={pidx} className="border rounded-lg p-4 hover:bg-gray-50">
                                <h4 className="font-semibold mb-2">{program.title}</h4>
                                <div className="space-y-1 text-sm text-gray-600">
                                  <p>한도: {program.amount}</p>
                                  <p>금리: {program.rate}</p>
                                  <p>기간: {program.period}</p>
                                  {program.note && (
                                    <Badge variant="secondary" className="mt-2">{program.note}</Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* 창업자금 탭 */}
              <TabsContent value="창업자금" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-purple-200">
                    <CardHeader className="bg-purple-50">
                      <CardTitle className="flex items-center gap-2 text-purple-700">
                        <Lightbulb className="h-5 w-5" />
                        창업자금 특징
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-3">
                        {fundingTypes[2].features?.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200">
                    <CardHeader className="bg-purple-50">
                      <CardTitle className="flex items-center gap-2 text-purple-700">
                        <FileText className="h-5 w-5" />
                        지원 요건
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-3">
                        {fundingTypes[2].requirements?.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Shield className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">주요 창업자금 프로그램</h3>
                  <div className="space-y-4">
                    {fundingPrograms['창업자금'].map((org, idx) => (
                      <Card key={idx}>
                        <CardHeader>
                          <CardTitle className="text-lg">{org.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {org.programs.map((program, pidx) => (
                              <div key={pidx} className="border rounded-lg p-4 hover:bg-gray-50">
                                <h4 className="font-semibold mb-2">{program.title}</h4>
                                <div className="space-y-1 text-sm text-gray-600">
                                  <p>한도: {program.amount}</p>
                                  <p>금리: {program.rate}</p>
                                  <p>기간: {program.period}</p>
                                  {program.note && (
                                    <Badge variant="secondary" className="mt-2">{program.note}</Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* R&D자금 탭 */}
              <TabsContent value="R&D자금" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-orange-200">
                    <CardHeader className="bg-orange-50">
                      <CardTitle className="flex items-center gap-2 text-orange-700">
                        <Beaker className="h-5 w-5" />
                        R&D자금 특징
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-3">
                        {fundingTypes[3].features?.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200">
                    <CardHeader className="bg-orange-50">
                      <CardTitle className="flex items-center gap-2 text-orange-700">
                        <FileText className="h-5 w-5" />
                        지원 요건
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-3">
                        {fundingTypes[3].requirements?.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Shield className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">주요 R&D자금 프로그램</h3>
                  <div className="space-y-4">
                    {fundingPrograms['R&D자금'].map((org, idx) => (
                      <Card key={idx}>
                        <CardHeader>
                          <CardTitle className="text-lg">{org.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-4">
                            {org.programs.map((program, pidx) => (
                              <div key={pidx} className="border rounded-lg p-4 hover:bg-gray-50">
                                <h4 className="font-semibold mb-2">{program.title}</h4>
                                <div className="space-y-1 text-sm text-gray-600">
                                  <p>한도: {program.amount}</p>
                                  <p>금리: {program.rate}</p>
                                  <p>기간: {program.period}</p>
                                  {program.note && (
                                    <Badge variant="secondary" className="mt-2">{program.note}</Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* 시설자금 탭 */}
              <TabsContent value="시설자금" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="flex items-center gap-2 text-blue-700">
                        <Factory className="h-5 w-5" />
                        시설자금 특징
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>토지 및 건물 구입자금</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>생산설비 및 시설 구축</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>사업장 이전 및 확장</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>자동화 설비 도입</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="flex items-center gap-2 text-blue-700">
                        <FileText className="h-5 w-5" />
                        지원 요건
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>중소기업 또는 중견기업</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>사업계획서 및 투자계획서</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>환경영향평가 (필요시)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>담보 또는 보증 가능</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>시설자금 상세 정보</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">지원 한도</h4>
                        <p className="text-gray-700">최대 45억원 (소요자금의 80% 이내)</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">대출 기간</h4>
                        <p className="text-gray-700">10년 이내 (거치기간 3년 이내 포함)</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">금리</h4>
                        <p className="text-gray-700">연 2.0~3.0% (정책금리 연동)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* 듀얼브레인 강점 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">듀얼브레인 정책자금 컨설팅 강점</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                  <Users className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>통합 컨설팅</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">운전자금부터 R&D자금까지 모든 정책자금을 한 번에 컨설팅</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li>• 동시 다중 신청 가능</li>
                    <li>• 자금별 최적 조합 설계</li>
                    <li>• 통합 관리 시스템</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200">
                <CardHeader className="bg-green-50">
                  <Target className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle>맞춤형 전략</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">기업 상황에 맞는 최적의 정책자금 포트폴리오 구성</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li>• AI 기반 자금 매칭</li>
                    <li>• 승인율 극대화 전략</li>
                    <li>• 금리 최적화 방안</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200">
                <CardHeader className="bg-purple-50">
                  <Rocket className="h-8 w-8 text-purple-600 mb-2" />
                  <CardTitle>원스톱 서비스</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">상담부터 승인 후 관리까지 전 과정 지원</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li>• 서류 작성 대행</li>
                    <li>• 온라인 신청 지원</li>
                    <li>• 사후 관리 서비스</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* 신청 프로세스 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">정책자금 신청 프로세스</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-blue-600">{step.step}</span>
                  </div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 투자분석기 섹션 */}
        <div id="investment-analysis-section" className="mb-8">
          <Card className="border-2 border-indigo-200">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Calculator className="h-6 w-6 text-indigo-600" />
                    AI 투자 재무타당성 분석기
                  </CardTitle>
                  <CardDescription>전문가 상담을 통해 정확한 투자 타당성 분석을 제공합니다</CardDescription>
                </div>
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                  <Link href="/consultation" className="flex items-center gap-2">
                    상담 신청하기
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-blue-800 font-semibold mb-2">
                  <AlertCircle className="h-5 w-5" />
                  상담신청 후 이용 가능
                </div>
                <p className="text-gray-700">
                  투자재무타당성분석기는 전문가 상담을 통해 귀사의 상황에 맞는 정확한 분석을 제공하기 위해
                  상담신청 후 이용하실 수 있습니다.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">5구간</div>
                  <p className="text-gray-600">투자등급 평가</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">8개</div>
                  <p className="text-gray-600">핵심 재무지표 분석</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">실시간</div>
                  <p className="text-gray-600">AI 분석 리포트</p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Link href="/services/policy-funding/investment-analysis">
                  <Button variant="outline" className="text-indigo-600 border-indigo-600 hover:bg-indigo-50">
                    분석기 자세히 보기
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">지금 바로 정책자금 상담을 시작하세요</h2>
          <p className="text-xl text-gray-600 mb-8">
            운전자금, 창업자금, R&D자금 모든 상담이 무료입니다
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/consultation" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                무료 상담 신청
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              <Link href="/diagnosis" className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                AI 진단 받기
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 