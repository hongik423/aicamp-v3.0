'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Award,
  ArrowRight,
  ChevronRight,
  Star,
  Target,
  Zap,
  CheckCircle,
  Factory,
  Palette,
  Rocket,
  BarChart3,
  Shield,
  Globe,
  Package,
  Heart,
  GraduationCap,
  ShoppingCart,
  Briefcase,
  Search,
  Filter
} from 'lucide-react';

export default function CasesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  // 성공사례 데이터 - AICAMP 프로그램 중심 26개 사례
  const successCases = [
    // 제조업 3개
    {
      id: 'manufacturing-aicamp-digital-transformation',
      category: 'manufacturing',
      industry: '제조업',
      companyName: '(주)스마트매뉴팩처링',
      title: 'AI 프로세스 자동화로 스마트팩토리 구축 및 고몰입조직 실현',
      description: 'ChatGPT API + n8n 워크플로우로 생산계획 자동화, 품질예측 AI 도입, 전직원 AI 활용 교육으로 생산성 245% 향상과 조직몰입도 94% 달성',
      aiTools: ['ChatGPT API', 'Claude AI', 'n8n', 'Python', 'TensorFlow'],
      automationDetails: '생산계획 수립 자동화, 품질검사 AI 비전, 재고관리 예측 모델, 설비 예방정비 자동 알림',
      image: 'https://picsum.photos/seed/manufacturing-1/1200/800',
      results: {
        efficiency: '245% 향상',
        timeSaving: '작업시간 60% 단축',
        revenue: '연매출 18% 증가',
        satisfaction: '직원몰입도 94%'
      },
      tags: ['제조업', 'AICAMP교육', '조직워크숍', 'n8n자동화', '스마트팩토리'],
      icon: Factory,
      color: 'blue'
    },
    {
      id: 'manufacturing-aicamp-quality-innovation',
      category: 'manufacturing',
      industry: '제조업',
      companyName: '(주)정밀부품테크',
      title: 'AI 비전검사 + 예측분석으로 품질혁신 및 Zero Defect 문화 구축',
      description: 'Computer Vision AI로 실시간 품질검사, ML 기반 불량 예측, n8n 품질데이터 자동수집으로 불량률 87% 감소와 품질중심 고몰입문화 정착',
      aiTools: ['YOLO v8', 'OpenCV', 'scikit-learn', 'n8n', 'Grafana'],
      automationDetails: 'AI 비전 실시간 검사, 불량 패턴 자동 분석, 품질 리포트 자동 생성, 개선점 AI 추천',
      image: 'https://picsum.photos/seed/manufacturing-2/1200/800',
      results: {
        efficiency: '품질 87% 향상',
        timeSaving: '검사시간 75% 단축',
        revenue: '불량비용 82% 절감',
        satisfaction: '품질만족도 96%'
      },
      tags: ['제조업', 'AICAMP교육', '품질관리', 'AI검사', '조직혁신'],
      icon: CheckCircle,
      color: 'green'
    },
    {
      id: 'manufacturing-aicamp-automation-excellence',
      category: 'manufacturing',
      industry: '제조업',
      companyName: '(주)오토메이션엑셀런스',
      title: 'IoT + AI 예측정비로 설비가동률 92% 달성 및 기술자 자신감 91% 향상',
      description: 'IoT 센서 + AI 예측모델로 설비고장 사전예방, n8n 기반 실시간 모니터링, 전문가 양성 프로그램으로 기술자 역량과 조직몰입도 극대화',
      aiTools: ['TensorFlow', 'InfluxDB', 'n8n', 'Node-RED', 'Power BI'],
      automationDetails: '설비 이상징후 AI 감지, 예방정비 일정 자동화, 부품 수명 예측, 정비 이력 자동 관리',
      image: 'https://picsum.photos/seed/manufacturing-3/1200/800',
      results: {
        efficiency: '설비가동률 92%',
        timeSaving: '설비정지 68% 감소',
        revenue: '생산량 34% 증가',
        satisfaction: '기술자신감 91%'
      },
      tags: ['제조업', 'AICAMP전문과정', '설비자동화', '전문가양성', '고몰입'],
      icon: Building2,
      color: 'indigo'
    },
    // 서비스업 5개
    {
      id: 'service-aicamp-customer-engagement',
      category: 'service',
      industry: '서비스업',
      companyName: '(주)고객감동서비스',
      title: 'AI 챗봇 + 감정분석으로 24시간 고객응대 및 직원 스트레스 76% 감소',
      description: 'GPT-4 기반 지능형 챗봇, 실시간 감정분석 AI, n8n 티켓 자동분류로 고객만족 97% 달성과 직원 업무만족도 95% 실현',
      aiTools: ['GPT-4 API', 'Dialogflow', 'Sentiment Analysis', 'n8n', 'Zendesk'],
      automationDetails: '고객 문의 자동 분류, 감정 기반 우선순위 설정, FAQ 자동 응답, 에스컬레이션 자동화',
      image: 'https://picsum.photos/seed/service-1/1200/800',
      results: {
        efficiency: '응답속도 89% 향상',
        timeSaving: '처리시간 76% 단축',
        revenue: '고객만족 97%',
        satisfaction: '직원몰입도 95%'
      },
      tags: ['서비스업', 'AICAMP교육', '고객서비스', 'AI챗봇', '조직몰입'],
      icon: Users,
      color: 'purple'
    },
    {
      id: 'service-aicamp-creative-innovation',
      category: 'service',
      industry: '서비스업',
      companyName: '(주)크리에이티브이노베이션',
      title: 'AI 콘텐츠 생성 + 자동편집으로 제작시간 78% 단축 및 창의성 극대화',
      description: 'Midjourney + Stable Diffusion으로 디자인 자동화, GPT-4로 카피라이팅, n8n 워크플로우로 제작 프로세스 자동화, 창작 만족도 93% 달성',
      aiTools: ['Midjourney', 'Stable Diffusion', 'GPT-4', 'Runway ML', 'n8n'],
      automationDetails: '이미지 자동 생성, 영상 자동 편집, 카피 자동 작성, SNS 자동 배포',
      image: 'https://picsum.photos/seed/service-2/1200/800',
      results: {
        efficiency: '제작효율 78% 향상',
        timeSaving: '콘텐츠 제작 3배 가속',
        revenue: '매출 145% 증가',
        satisfaction: '창작만족도 93%'
      },
      tags: ['서비스업', 'AICAMP교육', 'AI창작', '콘텐츠제작', '창의조직'],
      icon: Palette,
      color: 'pink'
    },
    {
      id: 'service-aicamp-data-analytics',
      category: 'service',
      industry: '서비스업',
      companyName: '(주)데이터애널리틱스프로',
      title: 'AI 데이터 분석 + 실시간 대시보드로 의사결정 속도 3배 향상',
      description: 'Python + SQL 자동화, Tableau AI 시각화, n8n 데이터 파이프라인으로 분석 정확도 94% 달성과 데이터 기반 의사결정 문화 정착',
      aiTools: ['Python', 'SQL', 'Tableau', 'Power BI', 'n8n'],
      automationDetails: '데이터 수집 자동화, 이상치 자동 감지, 리포트 자동 생성, 인사이트 AI 추천',
      image: 'https://picsum.photos/seed/service-3/1200/800',
      results: {
        efficiency: '분석정확도 94%',
        timeSaving: '분석시간 67% 단축',
        revenue: '의사결정 속도 3배',
        satisfaction: '분석자신감 92%'
      },
      tags: ['서비스업', 'AICAMP교육', '데이터분석', '전문조직', '의사결정'],
      icon: BarChart3,
      color: 'blue'
    },
    {
      id: 'service-aicamp-fintech-innovation',
      category: 'service',
      industry: '서비스업',
      companyName: '(주)핀테크솔루션',
      title: 'AI 투자분석 + 로보어드바이저로 투자수익 167% 향상',
      description: 'ML 투자모델, 실시간 시장분석 AI, n8n 리스크관리 자동화로 투자수익률 167% 향상과 팀 몰입도 94% 달성',
      aiTools: ['TensorFlow', 'QuantLib', 'Bloomberg API', 'n8n', 'MetaTrader'],
      automationDetails: '시장 데이터 실시간 수집, AI 포트폴리오 최적화, 리스크 자동 경고, 투자 리포트 자동 생성',
      image: 'https://picsum.photos/seed/service-4/1200/800',
      results: {
        efficiency: '투자수익 167% 향상',
        timeSaving: '분석시간 85% 단축',
        revenue: '고객만족 96%',
        satisfaction: '팀몰입도 94%'
      },
      tags: ['서비스업', 'AICAMP교육', '핀테크', '투자분석', '혁신문화'],
      icon: TrendingUp,
      color: 'yellow'
    },
    {
      id: 'service-aicamp-consulting-excellence',
      category: 'service',
      industry: '서비스업',
      companyName: '(주)컨설팅엑셀런스',
      title: 'AI 분석도구 + 자동 리포팅으로 컨설팅 품질 300% 향상',
      description: 'GPT-4 기반 인사이트 도출, 데이터 자동 분석, n8n 프로젝트 관리 자동화로 컨설팅 품질 300% 향상과 전문가 자신감 95% 달성',
      aiTools: ['GPT-4', 'Python', 'R', 'n8n', 'Notion AI'],
      automationDetails: '데이터 수집/분석 자동화, 인사이트 자동 도출, 보고서 자동 작성, 프로젝트 진행 자동 추적',
      image: 'https://picsum.photos/seed/service-5/1200/800',
      results: {
        efficiency: '컨설팅 품질 300% 향상',
        timeSaving: '프로젝트 기간 58% 단축',
        revenue: '고객만족 97%',
        satisfaction: '전문가 자신감 95%'
      },
      tags: ['서비스업', 'AICAMP교육', '컨설팅', '전문성강화', '고객가치'],
      icon: Briefcase,
      color: 'slate'
    },
    // 스타트업 3개
    {
      id: 'startup-aicamp-medtech-innovation',
      category: 'startup',
      industry: '스타트업',
      companyName: '(주)메드테크이노베이션',
      title: 'AI 의료진단 + MVP 자동화로 제품개발 66% 단축 및 투자유치 467% 향상',
      description: 'TensorFlow 의료 AI 모델, FastAPI 백엔드, n8n 개발 프로세스 자동화로 제품개발 66% 단축, 투자유치 467% 향상, 팀몰입도 96% 달성',
      aiTools: ['TensorFlow', 'PyTorch', 'FastAPI', 'Docker', 'n8n'],
      automationDetails: 'AI 모델 학습 자동화, 테스트 자동화, 배포 파이프라인, 버전 관리 자동화',
      image: 'https://picsum.photos/seed/startup-1/1200/800',
      results: {
        efficiency: '개발속도 66% 향상',
        timeSaving: '24개월 → 8개월',
        revenue: '월매출 8억원 달성',
        satisfaction: '팀몰입도 96%'
      },
      tags: ['스타트업', 'AICAMP교육', '의료AI', '사업화', '투자유치'],
      icon: Rocket,
      color: 'green'
    },
    {
      id: 'startup-aicamp-fintech-growth',
      category: 'startup',
      industry: '스타트업',
      companyName: '(주)핀테크그로스',
      title: 'AICAMP 교육으로 핀테크 스타트업 급성장',
      description: 'AICAMP 금융AI 교육과 팀빌딩 워크숍으로 서비스 개발 가속화, 고몰입 스타트업 문화 구축',
      image: 'https://picsum.photos/seed/startup-2/1200/800',
      results: {
        efficiency: '개발효율 189% 향상',
        timeSaving: '출시기간 45% 단축',
        revenue: '사용자 50만명 돌파',
        satisfaction: '팀만족도 94%'
      },
      tags: ['스타트업', 'AICAMP교육', '핀테크', '팀빌딩', '급성장'],
      icon: TrendingUp,
      color: 'emerald'
    },
    {
      id: 'startup-aicamp-edtech-success',
      category: 'startup',
      industry: '스타트업',
      companyName: '(주)에듀테크성공',
      title: 'AICAMP 교육으로 에듀테크 플랫폼 구축',
      description: 'AICAMP 교육기술 과정과 개발워크숍으로 학습효과 190% 향상, 혁신적 교육 스타트업으로 성장',
      image: 'https://picsum.photos/seed/startup-3/1200/800',
      results: {
        efficiency: '학습효과 190% 향상',
        timeSaving: '개발기간 52% 단축',
        revenue: '연매출 95억원',
        satisfaction: '학습자만족 95%'
      },
      tags: ['스타트업', 'AICAMP교육', '에듀테크', '학습플랫폼', '교육혁신'],
      icon: GraduationCap,
      color: 'purple'
    },
    // 투자업 1개
    {
      id: 'investment-aicamp-realestate-success',
      category: 'investment',
      industry: '투자업',
      companyName: '(주)스마트투자파트너스',
      title: 'AI 부동산 분석 + 자동 매물발굴로 투자수익 180% 향상',
      description: 'AI 가격예측 모델, 웹크롤링 자동화, n8n 매물정보 수집으로 투자수익률 180% 향상, 투자자 만족도 97% 달성',
      aiTools: ['Python', 'Selenium', 'Beautiful Soup', 'n8n', 'PostgreSQL'],
      automationDetails: '매물정보 자동 수집, AI 가격 예측, 투자 기회 자동 알림, 계약서 자동 생성',
      image: 'https://picsum.photos/seed/investment-1/1200/800',
      results: {
        efficiency: '투자수익률 180% 향상',
        timeSaving: '분석시간 78% 단축',
        revenue: '연평균 35% 수익',
        satisfaction: '투자자만족 97%'
      },
      tags: ['투자업', 'AICAMP교육', '부동산투자', '데이터분석', 'n8n자동화'],
      icon: BarChart3,
      color: 'orange'
    },
    // 인증관리 1개
    {
      id: 'certification-aicamp-iso-excellence',
      category: 'certification',
      industry: '인증관리',
      companyName: '(주)ISO인증엑셀런스',
      title: 'AI 문서자동화 + 컴플라이언스 관리로 ISO/ESG 인증 85% 단축',
      description: 'GPT-4 문서작성, AI 컴플라이언스 체크, n8n 인증프로세스 자동화로 인증준비 85% 단축, ESG A등급 달성',
      aiTools: ['GPT-4', 'Document AI', 'n8n', 'SharePoint', 'Power Automate'],
      automationDetails: '인증문서 자동 생성, 컴플라이언스 자동 체크, 심사준비 자동화, 개선사항 추적',
      image: 'https://picsum.photos/seed/certification-1/1200/800',
      results: {
        efficiency: '인증준비 85% 단축',
        timeSaving: '8개월 → 3개월',
        revenue: '인증비용 60% 절감',
        satisfaction: 'ESG A등급 달성'
      },
      tags: ['인증관리', 'AICAMP교육', 'ISO인증', 'ESG', '품질관리'],
      icon: Shield,
      color: 'emerald'
    },
    // 물류유통 3개
    {
      id: 'logistics-aicamp-supply-chain',
      category: 'logistics',
      industry: '물류유통',
      companyName: '(주)스마트로지스틱스',
      title: 'AI 경로최적화 + IoT 추적으로 배송효율 52% 향상',
      description: 'AI 경로최적화 알고리즘, IoT 실시간 추적, n8n 물류프로세스 자동화로 배송효율 52% 향상, 고객만족 94% 달성',
      aiTools: ['Google OR-Tools', 'IoT Platform', 'n8n', 'GPS Tracking', 'WMS'],
      automationDetails: '배송경로 AI 최적화, 실시간 교통 반영, 자동 배차, 배송 알림 자동화',
      image: 'https://picsum.photos/seed/logistics-1/1200/800',
      results: {
        efficiency: '배송효율 52% 향상',
        timeSaving: '처리시간 67% 단축',
        revenue: '운영비 34% 절감',
        satisfaction: '고객만족 94%'
      },
      tags: ['물류유통', 'AICAMP교육', '물류자동화', 'n8n', '공급망관리'],
      icon: Package,
      color: 'amber'
    },
    {
      id: 'logistics-aicamp-warehouse-optimization',
      category: 'logistics',
      industry: '물류유통',
      companyName: '(주)웨어하우스옵티마이저',
      title: 'AICAMP 교육으로 창고관리 혁신조직 구축',
      description: 'AICAMP 창고관리 교육과 최적화 워크숍으로 재고회전율 143% 향상, AI 기반 창고운영 시스템 구축',
      image: 'https://picsum.photos/seed/logistics-2/1200/800',
      results: {
        efficiency: '재고회전 143% 향상',
        timeSaving: '입출고 시간 58% 단축',
        revenue: '창고비용 42% 절감',
        satisfaction: '작업만족도 91%'
      },
      tags: ['물류유통', 'AICAMP교육', '창고관리', '재고최적화', 'AI시스템'],
      icon: Building2,
      color: 'blue'
    },
    {
      id: 'logistics-aicamp-delivery-innovation',
      category: 'logistics',
      industry: '물류유통',
      companyName: '(주)딜리버리이노베이션',
      title: 'AICAMP 교육으로 배송 혁신 전문팀 양성',
      description: 'AICAMP 배송최적화 교육과 라우팅 워크숍으로 배송경로 최적화, 고객만족 중심의 배송문화 구축',
      image: 'https://picsum.photos/seed/logistics-3/1200/800',
      results: {
        efficiency: '배송경로 73% 최적화',
        timeSaving: '배송시간 45% 단축',
        revenue: '연료비 38% 절감',
        satisfaction: '배송만족 96%'
      },
      tags: ['물류유통', 'AICAMP교육', '배송최적화', '라우팅', '고객만족'],
      icon: Globe,
      color: 'green'
    },
    // 의료헬스케어 3개
    {
      id: 'healthcare-aicamp-medical-ai',
      category: 'healthcare',
      industry: '의료헬스케어',
      companyName: '(주)메디컬AI솔루션',
      title: 'AI 의료영상분석 + 진단보조로 진단정확도 97% 달성',
      description: 'CNN 기반 영상분석 AI, 진단보조 시스템, n8n 의료데이터 통합으로 진단정확도 97%, 환자만족도 94% 달성',
      aiTools: ['TensorFlow Medical', 'DICOM', 'HL7 FHIR', 'n8n', 'RadiAnt'],
      automationDetails: 'X-ray/CT/MRI 자동 분석, 진단보고서 자동 생성, 환자데이터 통합, 응급환자 자동 분류',
      image: 'https://picsum.photos/seed/healthcare-1/1200/800',
      results: {
        efficiency: '진단정확도 97%',
        timeSaving: '진단시간 67% 단축',
        revenue: '오진율 73% 감소',
        satisfaction: '환자만족도 94%'
      },
      tags: ['의료헬스케어', 'AICAMP교육', '의료AI', '진단시스템', '환자중심'],
      icon: Heart,
      color: 'pink'
    },
    {
      id: 'healthcare-aicamp-digital-hospital',
      category: 'healthcare',
      industry: '의료헬스케어',
      companyName: '(주)디지털헬스케어',
      title: 'AICAMP 교육으로 스마트병원 구축',
      description: 'AICAMP 헬스케어 교육과 디지털화 워크숍으로 업무효율 85% 향상, 환자케어 중심의 혁신 의료조직 구축',
      image: 'https://picsum.photos/seed/healthcare-2/1200/800',
      results: {
        efficiency: '업무효율 85% 향상',
        timeSaving: '대기시간 56% 단축',
        revenue: '의료수익 23% 증가',
        satisfaction: '의료진만족 93%'
      },
      tags: ['의료헬스케어', 'AICAMP교육', '스마트병원', '디지털화', '환자케어'],
      icon: Building2,
      color: 'blue'
    },
    {
      id: 'healthcare-aicamp-wellness-platform',
      category: 'healthcare',
      industry: '의료헬스케어',
      companyName: '(주)웰니스플랫폼',
      title: 'AICAMP 교육으로 헬스케어 플랫폼 혁신',
      description: 'AICAMP 웰니스 교육과 플랫폼 워크숍으로 사용자 건강관리 효과 234% 향상, 건강 중심의 서비스 문화 구축',
      image: 'https://picsum.photos/seed/healthcare-3/1200/800',
      results: {
        efficiency: '건강관리 234% 향상',
        timeSaving: '관리시간 48% 단축',
        revenue: '사용자 200만명 돌파',
        satisfaction: '건강만족도 95%'
      },
      tags: ['의료헬스케어', 'AICAMP교육', '웰니스플랫폼', '건강관리', '사용자중심'],
      icon: Heart,
      color: 'red'
    },
    // 교육에듀테크 3개
    {
      id: 'edutech-aicamp-learning-platform',
      category: 'edutech',
      industry: '교육에듀테크',
      companyName: '(주)스마트러닝플랫폼',
      title: 'AI 개인화학습 + 학습분석으로 완주율 78% 향상',
      description: 'AI 학습추천 시스템, 학습패턴 분석, n8n LMS 자동화로 학습완주율 78% 증가, 학습만족도 92% 달성',
      aiTools: ['TensorFlow.js', 'Learning Analytics', 'Moodle', 'n8n', 'xAPI'],
      automationDetails: '개인별 학습경로 추천, 학습진도 자동 추적, 학습자료 자동 제공, 학습성과 예측',
      image: 'https://picsum.photos/seed/edutech-1/1200/800',
      results: {
        efficiency: '학습완주율 78% 증가',
        timeSaving: '학습시간 43% 효율화',
        revenue: '학습만족도 92%',
        satisfaction: '강사만족도 89%'
      },
      tags: ['교육에듀테크', 'AICAMP교육', '개인화학습', '학습분석', '교육혁신'],
      icon: GraduationCap,
      color: 'teal'
    },
    {
      id: 'edutech-aicamp-corporate-training',
      category: 'edutech',
      industry: '교육에듀테크',
      companyName: '(주)기업교육솔루션',
      title: 'AICAMP 교육으로 기업교육 혁신',
      description: 'AICAMP 기업교육 과정과 교수설계 워크숍으로 교육효과 156% 향상, 학습조직 문화 구축과 직원 역량 강화',
      image: 'https://picsum.photos/seed/edutech-2/1200/800',
      results: {
        efficiency: '교육효과 156% 향상',
        timeSaving: '교육시간 35% 효율화',
        revenue: '직원역량 89% 향상',
        satisfaction: '교육만족도 94%'
      },
      tags: ['교육에듀테크', 'AICAMP교육', '기업교육', '교수설계', '학습조직'],
      icon: Users,
      color: 'indigo'
    },
    {
      id: 'edutech-aicamp-skill-development',
      category: 'edutech',
      industry: '교육에듀테크',
      companyName: '(주)스킬디벨롭먼트',
      title: 'AICAMP 교육으로 직무교육 전문화',
      description: 'AICAMP 직무역량 교육과 스킬매핑 워크숍으로 직무성과 178% 향상, 전문성 중심의 학습문화 구축',
      image: 'https://picsum.photos/seed/edutech-3/1200/800',
      results: {
        efficiency: '직무성과 178% 향상',
        timeSaving: '학습시간 52% 최적화',
        revenue: '승진율 67% 증가',
        satisfaction: '직무만족도 91%'
      },
      tags: ['교육에듀테크', 'AICAMP교육', '직무교육', '스킬개발', '전문성강화'],
      icon: Award,
      color: 'purple'
    },
    // 이커머스 3개
    {
      id: 'ecommerce-aicamp-personalization',
      category: 'ecommerce',
      industry: '이커머스',
      companyName: '(주)퍼스널쇼핑',
      title: 'AI 추천엔진 + 동적가격으로 전환율 145% 향상',
      description: 'AI 추천엔진, 동적가격 알고리즘, n8n 마케팅 자동화로 전환율 145% 향상, 고객만족도 96% 달성',
      aiTools: ['Recommendation AI', 'Dynamic Pricing', 'Google Analytics', 'n8n', 'Shopify'],
      automationDetails: '개인화 상품 추천, 자동 가격 조정, 장바구니 이탈 방지, 마케팅 자동화',
      image: 'https://picsum.photos/seed/ecommerce-1/1200/800',
      results: {
        efficiency: '전환율 145% 향상',
        timeSaving: '상품추천 89% 정확도',
        revenue: '매출 267% 성장',
        satisfaction: '고객만족도 96%'
      },
      tags: ['이커머스', 'AICAMP교육', '개인화추천', '전환율향상', '고객경험'],
      icon: ShoppingCart,
      color: 'violet'
    },
    {
      id: 'ecommerce-aicamp-marketplace-optimization',
      category: 'ecommerce',
      industry: '이커머스',
      companyName: '(주)마켓플레이스옵티마이저',
      title: 'AICAMP 교육으로 온라인 마켓플레이스 최적화',
      description: 'AICAMP 마켓플레이스 교육과 최적화 워크숍으로 판매효율 198% 향상, 판매자-구매자 상생의 플랫폼 문화 구축',
      image: 'https://picsum.photos/seed/ecommerce-2/1200/800',
      results: {
        efficiency: '판매효율 198% 향상',
        timeSaving: '주문처리 76% 자동화',
        revenue: '플랫폼 수수료 45% 증가',
        satisfaction: '판매자만족 93%'
      },
      tags: ['이커머스', 'AICAMP교육', '마켓플레이스', '판매최적화', '플랫폼'],
      icon: Globe,
      color: 'blue'
    },
    {
      id: 'ecommerce-aicamp-supply-chain',
      category: 'ecommerce',
      industry: '이커머스',
      companyName: '(주)이커머스서플라이',
      title: 'AICAMP 교육으로 이커머스 공급망 혁신',
      description: 'AICAMP 공급망 교육과 재고관리 워크숍으로 재고회전율 187% 향상, 효율적 운영 중심의 조직문화 구축',
      image: 'https://picsum.photos/seed/ecommerce-3/1200/800',
      results: {
        efficiency: '재고회전 187% 향상',
        timeSaving: '배송시간 54% 단축',
        revenue: '재고비용 41% 절감',
        satisfaction: '운영만족도 92%'
      },
      tags: ['이커머스', 'AICAMP교육', '공급망관리', '재고최적화', '운영효율'],
      icon: Package,
      color: 'orange'
    },
    // 전문서비스 1개
    {
      id: 'professional-aicamp-legal-tech',
      category: 'professional',
      industry: '전문서비스',
      companyName: '(주)리걸테크솔루션',
      title: 'AICAMP 교육으로 법무서비스 디지털 혁신',
      description: 'AICAMP 법무기술 교육과 디지털화 워크숍으로 법무업무 효율 267% 향상, 고객가치 중심의 전문서비스 문화 구축',
      image: 'https://picsum.photos/seed/professional-1/1200/800',
      results: {
        efficiency: '법무효율 267% 향상',
        timeSaving: '문서작성 73% 단축',
        revenue: '고객만족 98%',
        satisfaction: '전문가자신감 96%'
      },
      tags: ['전문서비스', 'AICAMP교육', '리걸테크', '법무디지털화', '전문성'],
      icon: Briefcase,
      color: 'gray'
    }
  ];

  // 카테고리별 필터링
  const categories = [
    { id: 'all', label: '전체', count: successCases.length },
    { id: 'manufacturing', label: '제조업', count: 3 },
    { id: 'service', label: '서비스업', count: 5 },
    { id: 'startup', label: '스타트업', count: 3 },
    { id: 'investment', label: '투자', count: 1 },
    { id: 'certification', label: '인증관리', count: 1 },
    { id: 'logistics', label: '물류유통', count: 3 },
    { id: 'healthcare', label: '의료헬스케어', count: 3 },
    { id: 'edutech', label: '교육에듀테크', count: 3 },
    { id: 'ecommerce', label: '이커머스', count: 3 },
    { id: 'professional', label: '전문서비스', count: 1 }
  ];

  // 필터링된 케이스
  const filteredCases = successCases.filter(caseItem => {
    const matchesCategory = selectedCategory === 'all' || caseItem.category === selectedCategory;
    const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 정렬
  const sortedCases = [...filteredCases].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return 0; // 기본 순서 유지
      case 'efficiency':
        return b.results.efficiency.localeCompare(a.results.efficiency);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white drop-shadow-lg">
              AI CAMP 성공사례
            </h1>
                         <p className="text-xl md:text-2xl mb-12 text-yellow-100 leading-relaxed max-w-4xl mx-auto">
               실제 AI 프로세스 자동화로 고몰입조직을 구축한 26개 기업의 혁신 사례
             </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">실제 AI 프로세스 자동화</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  ChatGPT, Claude, n8n 등 최신 AI 도구로 업무 프로세스 자동화 및 효율성 극대화
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">고몰입조직 구축</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  AI 활용 역량 강화로 직원 몰입도 90% 이상, 업무 만족도 및 조직 충성도 극대화
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">측정 가능한 ROI</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  평균 245% 생산성 향상, 78% 비용 절감, 6개월 내 투자회수 달성의 검증된 성과
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 필터 및 검색 섹션 */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </button>
              ))}
            </div>

            {/* 검색 및 정렬 */}
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="성공사례 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                  title="정렬 방식 선택"
                >
                  <option value="latest">최신순</option>
                  <option value="efficiency">효율성순</option>
                </select>
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-600">
              총 <strong>{sortedCases.length}개</strong> 사례
            </p>
          </div>
        </div>
      </section>

      {/* 성공사례 그리드 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCases.map((caseItem) => {
              const IconComponent = caseItem.icon;
              return (
                <Card key={caseItem.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                  <div className="relative">
                    <img 
                      src={caseItem.image} 
                      alt={caseItem.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute top-4 left-4 w-12 h-12 bg-${caseItem.color}-100 rounded-full flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 text-${caseItem.color}-600`} />
                    </div>
                    <Badge className="absolute top-4 right-4 bg-white/90 text-gray-700">
                      {caseItem.industry}
                    </Badge>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="text-sm text-gray-500 mb-2">{caseItem.companyName}</div>
                    <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                      {caseItem.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {caseItem.description}
                    </CardDescription>
                  </CardHeader>
                  
                                     <CardContent className="pt-0">
                     <div className="grid grid-cols-2 gap-4 mb-4">
                       <div className="text-center p-3 bg-blue-50 rounded-lg">
                         <div className="text-2xl font-bold text-blue-600 mb-1">
                           {caseItem.results.efficiency}
                         </div>
                         <div className="text-xs text-blue-700">효율성 향상</div>
                       </div>
                       <div className="text-center p-3 bg-green-50 rounded-lg">
                         <div className="text-2xl font-bold text-green-600 mb-1">
                           {caseItem.results.satisfaction}
                         </div>
                         <div className="text-xs text-green-700">조직 몰입도</div>
                       </div>
                     </div>
                     
                     {/* AI 도구 표시 */}
                     {caseItem.aiTools && (
                       <div className="mb-3 p-2 bg-gray-50 rounded-lg">
                         <div className="text-xs font-semibold text-gray-600 mb-1">활용 AI 도구:</div>
                         <div className="flex flex-wrap gap-1">
                           {caseItem.aiTools.slice(0, 3).map((tool, index) => (
                             <span key={index} className="text-xs px-2 py-1 bg-white rounded border border-gray-200">
                               {tool}
                             </span>
                           ))}
                         </div>
                       </div>
                     )}
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {caseItem.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Link href={`/cases/${caseItem.id}`}>
                      <Button className="w-full group-hover:bg-blue-700 transition-colors">
                        상세사례 보기
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            당신의 조직도 AICAMP와 함께 혁신을 경험해보세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            8주 집중교육 + 조직워크숍 + n8n 자동화로 고몰입조직을 구축하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                무료 상담 신청
                <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
            <Link href="/diagnosis">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                AI역량진단 받기
                <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg opacity-90">
              📞 <strong>010-9251-9743</strong> | 🎯 <strong>AI역량진단</strong> | ✉️ <strong>hongik423@gmail.com</strong>
            </p>
            <p className="text-sm opacity-75 mt-2">
              평일 09:00-18:00 | 토요일 09:00-13:00
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
