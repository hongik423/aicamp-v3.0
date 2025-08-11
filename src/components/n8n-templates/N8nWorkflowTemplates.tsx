'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  Play, 
  Settings, 
  Zap,
  Factory,
  Heart,
  GraduationCap,
  ShoppingCart,
  Briefcase,
  Building2,
  BarChart3,
  Package,
  Wifi,
  Video,
  Sun,
  Leaf
} from 'lucide-react';

interface N8nTemplate {
  id: string;
  name: string;
  category: string;
  industry: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  complexity: 'Basic' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  nodes: number;
  triggers: string[];
  actions: string[];
  integrations: string[];
  benefits: string[];
  downloadUrl: string;
  previewUrl: string;
}

const n8nTemplates: N8nTemplate[] = [
  // 제조업 템플릿
  {
    id: 'manufacturing-smart-factory',
    name: '스마트팩토리 생산관리 자동화',
    category: 'manufacturing',
    industry: '제조업',
    description: 'IoT 센서 데이터 수집, 품질 검사 결과 분석, 생산 계획 자동 조정 워크플로우',
    icon: Factory,
    color: 'blue',
    complexity: 'Advanced',
    estimatedTime: '2-3시간',
    nodes: 24,
    triggers: ['IoT 센서 데이터', '품질검사 완료', '생산목표 변경'],
    actions: ['ChatGPT 분석 요청', '생산계획 업데이트', '알림 발송', '대시보드 업데이트'],
    integrations: ['ChatGPT API', 'IoT Platform', 'ERP System', 'Slack', 'Google Sheets'],
    benefits: [
      '실시간 생산 모니터링 자동화',
      'AI 기반 품질 예측 및 조치',
      '생산 효율성 35% 향상',
      '품질 불량률 80% 감소'
    ],
    downloadUrl: '/n8n-templates/manufacturing-smart-factory.json',
    previewUrl: '/n8n-templates/preview/manufacturing-smart-factory'
  },
  {
    id: 'manufacturing-quality-control',
    name: 'AI 품질검사 자동화',
    category: 'manufacturing',
    industry: '제조업',
    description: 'Computer Vision 기반 품질검사 결과를 자동으로 분석하고 불량품 처리 프로세스 실행',
    icon: Factory,
    color: 'green',
    complexity: 'Intermediate',
    estimatedTime: '1-2시간',
    nodes: 18,
    triggers: ['품질검사 완료', '불량품 감지'],
    actions: ['ChatGPT 원인 분석', '불량품 분류', '재검사 요청', '보고서 생성'],
    integrations: ['ChatGPT API', 'Computer Vision API', 'Quality System', 'Email'],
    benefits: [
      '품질검사 자동화로 시간 75% 단축',
      'AI 분석으로 불량 원인 파악',
      '품질 데이터 실시간 수집',
      '품질 개선 제안 자동 생성'
    ],
    downloadUrl: '/n8n-templates/manufacturing-quality-control.json',
    previewUrl: '/n8n-templates/preview/manufacturing-quality-control'
  },

  // 서비스업 템플릿
  {
    id: 'service-customer-support',
    name: 'AI 고객서비스 자동화',
    category: 'service',
    industry: '서비스업',
    description: '고객 문의를 ChatGPT로 분석하여 자동 응답 생성 및 담당자 배정 워크플로우',
    icon: Heart,
    color: 'pink',
    complexity: 'Intermediate',
    estimatedTime: '1-2시간',
    nodes: 16,
    triggers: ['고객 문의 접수', '채팅 메시지', '이메일 수신'],
    actions: ['ChatGPT 문의 분석', '자동 응답 생성', '담당자 배정', '만족도 조사'],
    integrations: ['ChatGPT API', 'CRM System', 'Email', 'Slack', 'Survey Tool'],
    benefits: [
      '고객 응답 시간 90% 단축',
      '24시간 자동 고객 서비스',
      '고객 만족도 25% 향상',
      '상담원 업무 효율성 60% 개선'
    ],
    downloadUrl: '/n8n-templates/service-customer-support.json',
    previewUrl: '/n8n-templates/preview/service-customer-support'
  },

  // 스타트업 템플릿
  {
    id: 'startup-growth-automation',
    name: '스타트업 성장 지표 자동화',
    category: 'startup',
    industry: '스타트업',
    description: '사용자 데이터, 매출 지표, 마케팅 성과를 자동으로 수집하고 ChatGPT로 인사이트 생성',
    icon: GraduationCap,
    color: 'purple',
    complexity: 'Advanced',
    estimatedTime: '2-3시간',
    nodes: 22,
    triggers: ['일일 데이터 수집', '주간 리포트', '목표 달성 알림'],
    actions: ['ChatGPT 데이터 분석', '성장 인사이트 생성', '리포트 자동 생성', '투자자 업데이트'],
    integrations: ['ChatGPT API', 'Google Analytics', 'Stripe', 'Notion', 'Slack'],
    benefits: [
      '성장 지표 실시간 모니터링',
      'AI 기반 비즈니스 인사이트',
      '투자자 리포트 자동 생성',
      '데이터 기반 의사결정 지원'
    ],
    downloadUrl: '/n8n-templates/startup-growth-automation.json',
    previewUrl: '/n8n-templates/preview/startup-growth-automation'
  },

  // 전문서비스 템플릿
  {
    id: 'professional-consulting-automation',
    name: 'AI 컨설팅 보고서 자동화',
    category: 'professional',
    industry: '전문서비스',
    description: '고객 데이터를 ChatGPT로 분석하여 컨설팅 보고서와 개선 제안을 자동 생성',
    icon: Briefcase,
    color: 'blue',
    complexity: 'Advanced',
    estimatedTime: '2-4시간',
    nodes: 28,
    triggers: ['고객 데이터 업데이트', '분석 요청', '보고서 생성 요청'],
    actions: ['ChatGPT 데이터 분석', '인사이트 도출', '보고서 생성', '개선안 제시'],
    integrations: ['ChatGPT API', 'Google Sheets', 'PowerBI', 'Email', 'CRM'],
    benefits: [
      '보고서 작성 시간 70% 단축',
      'AI 기반 깊이 있는 분석',
      '일관된 품질의 컨설팅 서비스',
      '고객 맞춤형 개선 제안'
    ],
    downloadUrl: '/n8n-templates/professional-consulting-automation.json',
    previewUrl: '/n8n-templates/preview/professional-consulting-automation'
  },

  // 건설업 템플릿
  {
    id: 'construction-project-management',
    name: '건설 프로젝트 관리 자동화',
    category: 'construction',
    industry: '건설업',
    description: '공정 진행률, 안전 점검, 품질 관리를 자동으로 모니터링하고 ChatGPT로 분석',
    icon: Building2,
    color: 'orange',
    complexity: 'Advanced',
    estimatedTime: '2-3시간',
    nodes: 26,
    triggers: ['공정 업데이트', '안전 점검 완료', '품질 검사 결과'],
    actions: ['ChatGPT 진행률 분석', '지연 위험 예측', '안전 알림', '보고서 생성'],
    integrations: ['ChatGPT API', 'Project Management Tool', 'IoT Sensors', 'Email'],
    benefits: [
      '공정 관리 효율성 45% 향상',
      '안전사고 예방률 80% 개선',
      '품질 관리 자동화',
      '실시간 프로젝트 모니터링'
    ],
    downloadUrl: '/n8n-templates/construction-project-management.json',
    previewUrl: '/n8n-templates/preview/construction-project-management'
  },

  // 금융업 템플릿
  {
    id: 'finance-risk-analysis',
    name: '금융 리스크 분석 자동화',
    category: 'finance',
    industry: '금융업',
    description: '시장 데이터와 포트폴리오 정보를 ChatGPT로 분석하여 리스크 평가 및 투자 제안',
    icon: BarChart3,
    color: 'blue',
    complexity: 'Advanced',
    estimatedTime: '3-4시간',
    nodes: 32,
    triggers: ['시장 데이터 업데이트', '포트폴리오 변경', '리스크 임계값 초과'],
    actions: ['ChatGPT 시장 분석', '리스크 계산', '투자 제안', '클라이언트 알림'],
    integrations: ['ChatGPT API', 'Financial Data API', 'Portfolio System', 'Email'],
    benefits: [
      '리스크 분석 정확도 85% 향상',
      '투자 의사결정 속도 60% 개선',
      '자동화된 포트폴리오 모니터링',
      '개인화된 투자 제안'
    ],
    downloadUrl: '/n8n-templates/finance-risk-analysis.json',
    previewUrl: '/n8n-templates/preview/finance-risk-analysis'
  },

  // 물류업 템플릿
  {
    id: 'logistics-delivery-optimization',
    name: '배송 최적화 자동화',
    category: 'logistics',
    industry: '물류유통',
    description: '배송 데이터를 실시간 분석하여 최적 경로 제안 및 배송 상태 자동 업데이트',
    icon: Package,
    color: 'green',
    complexity: 'Intermediate',
    estimatedTime: '2-3시간',
    nodes: 20,
    triggers: ['배송 요청', 'GPS 위치 업데이트', '교통 정보 변경'],
    actions: ['ChatGPT 경로 분석', '최적 경로 계산', '배송 상태 업데이트', '고객 알림'],
    integrations: ['ChatGPT API', 'Google Maps API', 'GPS Tracking', 'SMS'],
    benefits: [
      '배송 시간 30% 단축',
      '연료비 25% 절감',
      '고객 만족도 40% 향상',
      '실시간 배송 추적'
    ],
    downloadUrl: '/n8n-templates/logistics-delivery-optimization.json',
    previewUrl: '/n8n-templates/preview/logistics-delivery-optimization'
  },

  // 통신업 템플릿
  {
    id: 'telecom-network-monitoring',
    name: '네트워크 모니터링 자동화',
    category: 'telecom',
    industry: '통신업',
    description: '네트워크 성능 데이터를 실시간 모니터링하고 ChatGPT로 장애 예측 및 대응',
    icon: Wifi,
    color: 'blue',
    complexity: 'Advanced',
    estimatedTime: '3-4시간',
    nodes: 30,
    triggers: ['네트워크 성능 데이터', '장애 감지', '사용량 급증'],
    actions: ['ChatGPT 성능 분석', '장애 예측', '자동 복구', '운영팀 알림'],
    integrations: ['ChatGPT API', 'Network Monitoring Tools', 'SNMP', 'Slack'],
    benefits: [
      '네트워크 장애 예방률 75% 향상',
      '복구 시간 85% 단축',
      '서비스 품질 지속적 개선',
      '운영 비용 40% 절감'
    ],
    downloadUrl: '/n8n-templates/telecom-network-monitoring.json',
    previewUrl: '/n8n-templates/preview/telecom-network-monitoring'
  },

  // 미디어 템플릿
  {
    id: 'media-content-automation',
    name: '콘텐츠 제작 자동화',
    category: 'media',
    industry: '미디어',
    description: 'ChatGPT를 활용한 콘텐츠 기획, 스크립트 생성, 소셜미디어 배포 자동화',
    icon: Video,
    color: 'red',
    complexity: 'Intermediate',
    estimatedTime: '2-3시간',
    nodes: 24,
    triggers: ['콘텐츠 요청', '트렌드 키워드 감지', '스케줄 시간'],
    actions: ['ChatGPT 아이디어 생성', '스크립트 작성', '썸네일 생성', 'SNS 배포'],
    integrations: ['ChatGPT API', 'DALL-E API', 'YouTube API', 'Social Media APIs'],
    benefits: [
      '콘텐츠 제작 시간 65% 단축',
      '아이디어 생성 자동화',
      '일관된 브랜드 톤앤매너',
      '멀티 플랫폼 동시 배포'
    ],
    downloadUrl: '/n8n-templates/media-content-automation.json',
    previewUrl: '/n8n-templates/preview/media-content-automation'
  },

  // 에너지 템플릿
  {
    id: 'energy-consumption-optimization',
    name: '에너지 소비 최적화',
    category: 'energy',
    industry: '에너지',
    description: '에너지 사용량 데이터를 ChatGPT로 분석하여 최적화 방안 제시 및 자동 제어',
    icon: Sun,
    color: 'yellow',
    complexity: 'Advanced',
    estimatedTime: '3-4시간',
    nodes: 28,
    triggers: ['에너지 사용량 데이터', '날씨 정보', '전력 요금 변동'],
    actions: ['ChatGPT 사용량 분석', '최적화 방안 도출', '자동 제어', '절약 리포트'],
    integrations: ['ChatGPT API', 'Smart Meter API', 'Weather API', 'IoT Control'],
    benefits: [
      '에너지 비용 35% 절감',
      '탄소 배출량 45% 감소',
      '에너지 효율성 50% 향상',
      '실시간 사용량 모니터링'
    ],
    downloadUrl: '/n8n-templates/energy-consumption-optimization.json',
    previewUrl: '/n8n-templates/preview/energy-consumption-optimization'
  },

  // 농업 템플릿
  {
    id: 'agriculture-smart-farming',
    name: '스마트팜 관리 자동화',
    category: 'agriculture',
    industry: '농업',
    description: '농장 센서 데이터를 ChatGPT로 분석하여 최적 재배 환경 조성 및 관리 자동화',
    icon: Leaf,
    color: 'green',
    complexity: 'Advanced',
    estimatedTime: '2-3시간',
    nodes: 26,
    triggers: ['센서 데이터 수집', '날씨 변화', '작물 성장 단계'],
    actions: ['ChatGPT 환경 분석', '관수 제어', '영양 공급', '병해충 예측'],
    integrations: ['ChatGPT API', 'IoT Sensors', 'Weather API', 'Control Systems'],
    benefits: [
      '작물 수확량 40% 증가',
      '물 사용량 30% 절약',
      '농약 사용 50% 감소',
      '노동시간 60% 단축'
    ],
    downloadUrl: '/n8n-templates/agriculture-smart-farming.json',
    previewUrl: '/n8n-templates/preview/agriculture-smart-farming'
  }
];

export default function N8nWorkflowTemplates() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedComplexity, setSelectedComplexity] = useState('all');

  const categories = [
    { id: 'all', label: '전체', count: n8nTemplates.length },
    { id: 'manufacturing', label: '제조업', count: n8nTemplates.filter(t => t.category === 'manufacturing').length },
    { id: 'service', label: '서비스업', count: n8nTemplates.filter(t => t.category === 'service').length },
    { id: 'startup', label: '스타트업', count: n8nTemplates.filter(t => t.category === 'startup').length },
    { id: 'professional', label: '전문서비스', count: n8nTemplates.filter(t => t.category === 'professional').length },
    { id: 'finance', label: '금융업', count: n8nTemplates.filter(t => t.category === 'finance').length },
    { id: 'logistics', label: '물류유통', count: n8nTemplates.filter(t => t.category === 'logistics').length }
  ];

  const complexityLevels = [
    { id: 'all', label: '모든 난이도' },
    { id: 'Basic', label: '기초' },
    { id: 'Intermediate', label: '중급' },
    { id: 'Advanced', label: '고급' }
  ];

  const filteredTemplates = n8nTemplates.filter(template => {
    const categoryMatch = selectedCategory === 'all' || template.category === selectedCategory;
    const complexityMatch = selectedComplexity === 'all' || template.complexity === selectedComplexity;
    return categoryMatch && complexityMatch;
  });

  const handleDownload = (template: N8nTemplate) => {
    // 실제 구현에서는 템플릿 파일을 다운로드
    console.log(`Downloading template: ${template.name}`);
  };

  const handlePreview = (template: N8nTemplate) => {
    // 실제 구현에서는 템플릿 미리보기 페이지로 이동
    console.log(`Previewing template: ${template.name}`);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Basic': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            n8n 워크플로우 템플릿
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            업종별 맞춤형 AI 자동화 워크플로우 템플릿으로 빠르게 시작하세요
          </p>
        </div>

        {/* 필터 */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {complexityLevels.map(level => (
              <button
                key={level.id}
                onClick={() => setSelectedComplexity(level.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedComplexity === level.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* 템플릿 그리드 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => {
            const IconComponent = template.icon;
            return (
              <Card key={template.id} className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg bg-${template.color}-100 flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 text-${template.color}-600`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold">
                          {template.name}
                        </CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {template.industry}
                        </Badge>
                      </div>
                    </div>
                    <Badge className={getComplexityColor(template.complexity)}>
                      {template.complexity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-600 mb-4">
                    {template.description}
                  </CardDescription>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">구축 시간:</span>
                      <span className="font-medium">{template.estimatedTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">노드 수:</span>
                      <span className="font-medium">{template.nodes}개</span>
                    </div>
                  </div>

                  <Tabs defaultValue="triggers" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="triggers">트리거</TabsTrigger>
                      <TabsTrigger value="integrations">연동</TabsTrigger>
                      <TabsTrigger value="benefits">효과</TabsTrigger>
                    </TabsList>
                    <TabsContent value="triggers" className="mt-3">
                      <div className="space-y-1">
                        {template.triggers.slice(0, 3).map((trigger, index) => (
                          <div key={index} className="text-xs text-gray-600 flex items-center">
                            <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                            {trigger}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="integrations" className="mt-3">
                      <div className="flex flex-wrap gap-1">
                        {template.integrations.slice(0, 4).map((integration, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {integration}
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="benefits" className="mt-3">
                      <div className="space-y-1">
                        {template.benefits.slice(0, 2).map((benefit, index) => (
                          <div key={index} className="text-xs text-gray-600 flex items-center">
                            <div className="w-1 h-1 bg-green-400 rounded-full mr-2"></div>
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex space-x-2 mt-6">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handlePreview(template)}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      미리보기
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleDownload(template)}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      다운로드
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Settings className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              해당 조건의 템플릿이 없습니다
            </h3>
            <p className="text-gray-600">
              다른 필터를 선택해보세요
            </p>
          </div>
        )}

        {/* 사용법 안내 */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            템플릿 사용법
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">1. 템플릿 다운로드</h3>
              <p className="text-sm text-gray-600">
                업종에 맞는 워크플로우 템플릿을 선택하여 다운로드하세요
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">2. n8n에서 설정</h3>
              <p className="text-sm text-gray-600">
                n8n 플랫폼에서 템플릿을 import하고 API 키 등을 설정하세요
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">3. 워크플로우 실행</h3>
              <p className="text-sm text-gray-600">
                테스트 후 실제 업무에 적용하여 자동화의 효과를 경험하세요
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
