'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Shield, FileText, Users, Clock, AlertTriangle, CheckCircle, 
  Lock, Eye, Download, Trash2, Edit, Phone, Mail, Building,
  Zap, ArrowRight, Info, Calendar, Database, UserCheck
} from 'lucide-react';

const privacyPrinciples = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: '최소 수집 원칙',
    description: '진단 목적에 꼭 필요한 최소한의 정보만 수집합니다',
    details: ['필수 정보: 기업명, 대표자명, 업종, 연락처', '선택 정보: 사업 내용, 고민사항만 추가 수집']
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: '안전한 보관',
    description: '수집된 정보는 암호화하여 안전하게 보관합니다',
    details: ['SSL/TLS 암호화 전송', 'Google Sheets 보안 저장소 활용', '접근 권한 엄격 제한']
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: '투명한 처리',
    description: '개인정보 처리 현황을 투명하게 공개합니다',
    details: ['수집 목적 명확 고지', '처리 과정 상세 안내', '이용 기간 명시']
  },
  {
    icon: <UserCheck className="w-6 h-6" />,
    title: '권리 보장',
    description: '정보주체의 권리를 적극적으로 보장합니다',
    details: ['열람권', '정정·삭제권', '처리정지권', '손해배상청구권']
  }
];

const dataTypes = [
  {
    category: '필수 수집 정보',
    purpose: '진단 서비스 제공',
    items: [
      { name: '기업명', reason: '진단 대상 기업 식별' },
      { name: '대표자명', reason: '신청자 신원 확인' },
      { name: '업종', reason: '업종별 맞춤 분석' },
      { name: '이메일 주소', reason: '진단 결과 발송' },
      { name: '연락처', reason: '필요시 연락 및 확인' }
    ],
    retention: '서비스 제공 완료 후 1년',
    legal: '개인정보보호법 제15조(개인정보의 수집·이용)'
  },
  {
    category: '선택 수집 정보',
    purpose: '진단 정확도 향상',
    items: [
      { name: '사업 내용', reason: '사업 모델 분석' },
      { name: '주요 고민사항', reason: '맞춤형 솔루션 제안' },
      { name: '기대 효과', reason: '진단 방향성 설정' },
      { name: '사업 지역', reason: '지역별 특성 반영' }
    ],
    retention: '동의 철회 시까지 또는 3년',
    legal: '개인정보보호법 제22조(동의를 받는 방법)'
  }
];

const userRights = [
  {
    right: '열람권',
    description: '본인의 개인정보 처리 현황을 확인할 권리',
    howTo: '이메일 또는 전화로 요청',
    response: '요청일로부터 10일 이내',
    fee: '무료 (단, 과도한 요청 시 수수료 부과 가능)'
  },
  {
    right: '정정·삭제권',
    description: '잘못된 정보의 수정이나 삭제를 요구할 권리',
    howTo: '서면, 이메일, 전화로 요청',
    response: '요청일로부터 10일 이내',
    fee: '무료'
  },
  {
    right: '처리정지권',
    description: '개인정보 처리 중단을 요구할 권리',
    howTo: '서면, 이메일로 요청',
    response: '요청일로부터 10일 이내',
    fee: '무료'
  },
  {
    right: '손해배상청구권',
    description: '개인정보 침해로 인한 피해 배상을 요구할 권리',
    howTo: '개인정보보호위원회 신고 또는 민사소송',
    response: '법정 절차에 따름',
    fee: '법정 수수료'
  }
];

const securityMeasures = [
  {
    category: '기술적 보호조치',
    measures: [
      'SSL/TLS 암호화 통신',
      '개인정보 암호화 저장', 
      '접근 통제 시스템',
      '침입 탐지 시스템'
    ]
  },
  {
    category: '관리적 보호조치',
    measures: [
      '개인정보 처리방침 수립',
      '개인정보보호 책임자 지정',
      '정기적 보안 교육',
      '접근 권한 관리'
    ]
  },
  {
    category: '물리적 보호조치',
    measures: [
      '서버실 출입 통제',
      'CCTV 설치 및 운영',
      '보안 카드 시스템',
      '문서 보관함 잠금'
    ]
  }
];

export default function EnhancedPrivacyPolicyPage() {
  const [selectedSection, setSelectedSection] = useState('overview');
  const [consentStates, setConsentStates] = useState({
    essential: false,
    optional: false,
    marketing: false,
    analytics: false
  });

  const handleConsentChange = (type: string, checked: boolean) => {
    setConsentStates(prev => ({
      ...prev,
      [type]: checked
    }));
  };

  const sections = [
    { id: 'overview', title: '개요', icon: <Info className="w-4 h-4" /> },
    { id: 'collection', title: '수집·이용', icon: <Database className="w-4 h-4" /> },
    { id: 'rights', title: '정보주체 권리', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'security', title: '보안조치', icon: <Shield className="w-4 h-4" /> },
    { id: 'consent', title: '동의 관리', icon: <CheckCircle className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">개인정보 처리방침</h1>
              <p className="text-gray-600 mt-2">개인정보보호법 완전 준수형</p>
            </div>
            <Badge className="bg-green-100 text-green-800">
              <Shield className="w-4 h-4 mr-1" />
              법정 기준 완전 준수
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 사이드바 네비게이션 */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">목차</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setSelectedSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                        selectedSection === section.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {section.icon}
                      <span className="font-medium">{section.title}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-3">
            {selectedSection === 'overview' && (
              <div className="space-y-8">
                {/* 개요 섹션 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-600" />
                      개인정보 처리방침 개요
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="font-bold text-blue-900 mb-3">📋 처리방침 정보</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>시행일자:</strong> 2025년 8월 1일
                        </div>
                        <div>
                          <strong>개정일자:</strong> -
                        </div>
                        <div>
                          <strong>적용범위:</strong> AICAMP 무료 AI 진단 서비스
                        </div>
                        <div>
                          <strong>처리목적:</strong> 경영진단 서비스 제공
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900 mb-4">🛡️ 개인정보보호 원칙</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {privacyPrinciples.map((principle, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="text-blue-600">{principle.icon}</div>
                              <h4 className="font-semibold">{principle.title}</h4>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{principle.description}</p>
                            <ul className="text-xs text-gray-500 space-y-1">
                              {principle.details.map((detail, idx) => (
                                <li key={idx} className="flex items-center gap-1">
                                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedSection === 'collection' && (
              <div className="space-y-8">
                {/* 수집·이용 섹션 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-blue-600" />
                      개인정보 수집 및 이용
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {dataTypes.map((dataType, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-lg text-gray-900">{dataType.category}</h3>
                          <Badge variant={index === 0 ? "destructive" : "secondary"}>
                            {index === 0 ? "필수" : "선택"}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3">수집 항목</h4>
                            <div className="space-y-2">
                              {dataType.items.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                  <div>
                                    <div className="font-medium text-sm">{item.name}</div>
                                    <div className="text-xs text-gray-600">{item.reason}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-2">처리 목적</h4>
                              <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                                {dataType.purpose}
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-2">보관 기간</h4>
                              <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-yellow-600" />
                                {dataType.retention}
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-2">법적 근거</h4>
                              <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                                {dataType.legal}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedSection === 'rights' && (
              <div className="space-y-8">
                {/* 정보주체 권리 섹션 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-blue-600" />
                      정보주체의 권리와 행사 방법
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        개인정보보호법이 보장하는 귀하의 권리
                      </h3>
                      <p className="text-green-800 text-sm">
                        개인정보보호법 제35조~제37조에 따라 정보주체는 다음과 같은 권리를 가지며, 
                        이를 행사하기 위해 언제든지 연락하실 수 있습니다.
                      </p>
                    </div>

                    <div className="grid gap-6">
                      {userRights.map((right, index) => (
                        <Card key={index} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="font-bold text-lg text-gray-900 mb-2">
                                  {right.right}
                                </h3>
                                <p className="text-gray-600 mb-4">{right.description}</p>
                                
                                <div className="space-y-3">
                                  <div>
                                    <strong className="text-sm text-gray-700">신청 방법:</strong>
                                    <p className="text-sm text-gray-600">{right.howTo}</p>
                                  </div>
                                  
                                  <div>
                                    <strong className="text-sm text-gray-700">처리 기간:</strong>
                                    <p className="text-sm text-gray-600">{right.response}</p>
                                  </div>
                                  
                                  <div>
                                    <strong className="text-sm text-gray-700">수수료:</strong>
                                    <p className="text-sm text-gray-600">{right.fee}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-3">연락처 정보</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-blue-600" />
                                    <span>010-9251-9743</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-blue-600" />
                                    <span>hongik423@gmail.com</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Building className="w-4 h-4 text-blue-600" />
                                    <span>AICAMP AI 교육센터</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedSection === 'security' && (
              <div className="space-y-8">
                {/* 보안조치 섹션 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      개인정보 보호를 위한 기술적·관리적·물리적 조치
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-red-50 p-6 rounded-lg">
                      <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        보안 침해 대응
                      </h3>
                      <p className="text-red-800 text-sm mb-4">
                        개인정보 침해사고 발생 시 72시간 내 개인정보보호위원회 신고 및 
                        정보주체에게 지체 없이 통지합니다.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white p-3 rounded">
                          <strong>1. 즉시 대응</strong><br />
                          침해 확인 및 차단
                        </div>
                        <div className="bg-white p-3 rounded">
                          <strong>2. 신속 신고</strong><br />
                          관련 기관 신고
                        </div>
                        <div className="bg-white p-3 rounded">
                          <strong>3. 피해 보상</strong><br />
                          손해배상 및 복구
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {securityMeasures.map((measure, index) => (
                        <Card key={index} className="border-0 shadow-md">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg text-center">
                              {measure.category}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-3">
                              {measure.measures.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedSection === 'consent' && (
              <div className="space-y-8">
                {/* 동의 관리 섹션 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      개인정보 처리 동의 관리
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="font-bold text-blue-900 mb-3">동의 관리 원칙</h3>
                      <p className="text-blue-800 text-sm mb-4">
                        개인정보보호법 제22조에 따라 동의는 구체적이고 명확해야 하며, 
                        정보주체가 쉽게 이해할 수 있도록 설명되어야 합니다.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-white p-3 rounded">
                          <strong>✅ 명확한 동의</strong><br />
                          목적별 개별 동의 받기
                        </div>
                        <div className="bg-white p-3 rounded">
                          <strong>🔄 철회 가능</strong><br />
                          언제든지 동의 철회 가능
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="border border-gray-200 rounded-lg p-6">
                        <h3 className="font-bold text-lg mb-4">필수 동의 항목</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Checkbox 
                              id="essential" 
                              checked={consentStates.essential}
                              onCheckedChange={(checked) => handleConsentChange('essential', checked as boolean)}
                            />
                            <div className="flex-1">
                              <label htmlFor="essential" className="font-medium text-gray-900 cursor-pointer">
                                개인정보 수집 및 이용 동의 (필수)
                              </label>
                              <p className="text-sm text-gray-600 mt-1">
                                진단 서비스 제공을 위한 필수 정보 수집에 동의합니다.
                              </p>
                              <div className="mt-2">
                                <Button variant="outline" size="sm">
                                  <FileText className="w-4 h-4 mr-1" />
                                  상세 내용 보기
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-6">
                        <h3 className="font-bold text-lg mb-4">선택 동의 항목</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Checkbox 
                              id="optional" 
                              checked={consentStates.optional}
                              onCheckedChange={(checked) => handleConsentChange('optional', checked as boolean)}
                            />
                            <div className="flex-1">
                              <label htmlFor="optional" className="font-medium text-gray-900 cursor-pointer">
                                맞춤형 서비스 제공을 위한 추가 정보 수집 (선택)
                              </label>
                              <p className="text-sm text-gray-600 mt-1">
                                더 정확한 진단을 위한 추가 정보 수집에 동의합니다.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Checkbox 
                              id="marketing" 
                              checked={consentStates.marketing}
                              onCheckedChange={(checked) => handleConsentChange('marketing', checked as boolean)}
                            />
                            <div className="flex-1">
                              <label htmlFor="marketing" className="font-medium text-gray-900 cursor-pointer">
                                마케팅 정보 수신 동의 (선택)
                              </label>
                              <p className="text-sm text-gray-600 mt-1">
                                AICAMP 교육 프로그램 및 서비스 안내를 받겠습니다.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Checkbox 
                              id="analytics" 
                              checked={consentStates.analytics}
                              onCheckedChange={(checked) => handleConsentChange('analytics', checked as boolean)}
                            />
                            <div className="flex-1">
                              <label htmlFor="analytics" className="font-medium text-gray-900 cursor-pointer">
                                서비스 개선을 위한 통계 분석 동의 (선택)
                              </label>
                              <p className="text-sm text-gray-600 mt-1">
                                개인식별정보를 제외한 통계 분석에 동의합니다.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-6 rounded-lg">
                        <h3 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5" />
                          동의 철회 방법
                        </h3>
                        <p className="text-yellow-800 text-sm mb-4">
                          동의하신 내용에 대해 언제든지 철회하실 수 있습니다. 
                          단, 필수 동의 철회 시 서비스 이용이 제한될 수 있습니다.
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <Button variant="outline" size="sm">
                            <Phone className="w-4 h-4 mr-1" />
                            전화: 010-9251-9743
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="w-4 h-4 mr-1" />
                            이메일: hongik423@gmail.com
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 하단 액션 영역 */}
      <div className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-sm text-gray-600">
                개인정보보호 관련 문의사항이 있으시면 언제든지 연락주세요.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                개인정보보호책임자: 이후경 교장 | 연락처: 010-9251-9743
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/diagnosis">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Zap className="w-4 h-4 mr-2" />
                  무료 진단 시작하기
                </Button>
              </Link>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                PDF 다운로드
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}